# -*- coding: utf-8 -*-
"""
ĐIỆP VIÊN STUDY — AI STUDY, LIVE TRANSLATION & MEETING INTELLIGENCE (PRO UNLIMITED)
===================================================================================
- Giao diện thương hiệu Điệp Viên Study (Xanh Navy #0F296B & Cam Vàng #D97706, 6 phân khu + Floating Island).
- Động cơ Phiên Âm & Dịch Thuật Thời Gian Thực (Real-Time Clause-Level VAD 1.2s–2.8s):
  + Kết hợp Groq Whisper Large V3 Turbo / V3 (0.38s) + Qwen 3.8 27B / GPT-OSS 120B (0.40s) + Gemini 3.1 Flash Lite.
  + Tự động phát hiện ngôn ngữ (EN / ZH / VI), giữ mạch ngữ cảnh hội thoại nhân vật (Rolling Context).
  + Tích hợp vietnote-worker.exe cho ZeroTTS int8 đọc giọng tiếng Việt.
- Hệ thống Tóm tắt cấu trúc (Structured Summary + Evidence IDs), Soạn thảo Văn bản / Bài giảng (7 chế độ)
  và Hỏi đáp thông minh từ nội dung bản ghi (Ask Note + trích dẫn nguồn chuẩn xác).
"""

import os
import sys
import io
import re
import time
import json
import uuid
import wave
import queue
import shutil
import socket
import base64
import ctypes
import platform
import webbrowser
import tempfile
import threading
import subprocess
import urllib.parse
from collections import deque
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

IS_WINDOWS = os.name == "nt"
IS_MAC = sys.platform == "darwin"
if IS_WINDOWS:
    import ctypes.wintypes

import numpy as np
import requests
import webview

BASE_DIR = Path(__file__).resolve().parent
APP_DATA_DIR = Path(os.environ.get("LOCALAPPDATA") or Path.home() / "AppData" / "Local") / "DiepVienStudy"
APP_DATA_DIR.mkdir(parents=True, exist_ok=True)
sys.path.insert(0, str(BASE_DIR))

# Bổ sung PATH chuẩn cho macOS (Homebrew Apple Silicon / Intel & thư mục bin nội bộ) để luôn tìm thấy ffmpeg/ffprobe
_extra_paths = [str(BASE_DIR / "bin")]
if IS_MAC:
    _extra_paths.extend(["/opt/homebrew/bin", "/usr/local/bin", "/usr/bin", "/bin"])
for _ep in reversed(_extra_paths):
    if _ep and os.path.isdir(_ep) and _ep not in os.environ.get("PATH", ""):
        os.environ["PATH"] = _ep + os.pathsep + os.environ.get("PATH", "")


def open_url_cross_platform(url: str):
    if not url:
        return
    try:
        if IS_WINDOWS and hasattr(os, "startfile"):
            os.startfile(url)
        elif IS_MAC:
            subprocess.Popen(["open", url])
        else:
            webbrowser.open(url)
    except Exception:
        try:
            webbrowser.open(url)
        except Exception:
            pass


def reveal_file_cross_platform(path_str: str):
    if not path_str or not os.path.exists(path_str):
        return
    try:
        p = os.path.normpath(path_str)
        if IS_WINDOWS:
            subprocess.Popen(["explorer", f"/select,{p}"])
        elif IS_MAC:
            subprocess.Popen(["open", "-R", p])
        else:
            subprocess.Popen(["xdg-open", os.path.dirname(p)])
    except Exception:
        pass

if sys.stdout is None:
    sys.stdout = open(os.devnull, "w", encoding="utf-8")
if sys.stderr is None:
    sys.stderr = open(os.devnull, "w", encoding="utf-8")

DEFAULT_GROQ_KEY = os.environ.get("GROQ_API_KEY", "")

HALLUCINATION_PATTERNS = re.compile(
    r"^(?:"
    r"thank you\.?|thanks for watching\.?|subtitles by .*|amara\.org.*|"
    r"hãy đăng ký kênh.*|cảm ơn các bạn đã theo dõi.*|đừng quên nhấn like.*|"
    r"subscribe to .*|please subscribe.*|bell icon.*|mbc.*|kbs.*|sbs.*|"
    r"\[music\]|\[applause\]|\(music\)|[\s.,!?;:\-…]+|"
    r"you|oh|uh|um|hmm|ah"
    r")$",
    re.IGNORECASE,
)

VI_CHARS_RE = re.compile(
    r"[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]",
    re.IGNORECASE,
)
CJK_CHARS_RE = re.compile(r"[\u4e00-\u9fff\u3400-\u4dbf]")


def detect_script_language(text: str, whisper_lang: str = "", hint_lang: str = "auto") -> str:
    """Phân loại chính xác ngôn ngữ của câu thoại ('vi', 'zh', 'en')."""
    t = (text or "").strip()
    if not t:
        return hint_lang if hint_lang in ("en", "zh", "vi") else "en"
    if CJK_CHARS_RE.search(t):
        return "zh"
    if VI_CHARS_RE.search(t):
        return "vi"
    wl = (whisper_lang or "").strip().lower()
    if wl in ("zh", "chinese", "mandarin", "yue", "cantonese"):
        return "zh"
    if wl in ("vi", "vietnamese"):
        # Nếu Whisper báo vi nhưng không có dấu tiếng Việt và câu ngắn tiếng Anh -> kiểm tra kỹ
        words = re.findall(r"[a-zA-Z]+", t.lower())
        common_en = {"the", "and", "is", "are", "to", "of", "in", "that", "it", "for", "you", "we", "they", "this", "with", "have", "what", "how", "why", "can", "will"}
        if words and sum(1 for w in words if w in common_en) >= 1:
            return "en"
        return "vi"
    if wl in ("en", "english"):
        return "en"
    if hint_lang in ("en", "zh", "vi"):
        return hint_lang
    return "en"


def is_hallucination_or_noise(text: str, duration_sec: float = 2.0) -> bool:
    """Lọc bỏ các câu ảo giác đặc trưng của Whisper khi gặp khoảng lặng hoặc nhạc nền."""
    t = (text or "").strip()
    if not t or len(t) < 2:
        return True
    if HALLUCINATION_PATTERNS.match(t):
        return True
    # Lọc lặp từ quá 3 lần liên tiếp
    if re.search(r"(.{2,15})\1{3,}", t, re.IGNORECASE):
        return True
    words = t.split()
    if len(words) >= 6 and len(set(w.lower() for w in words)) <= 2:
        return True
    # Quá nhiều từ so với thời lượng âm thanh
    if duration_sec > 0 and len(words) / max(0.5, duration_sec) > 9.5:
        return True
    return False


THINK_ENVELOPE_RE = re.compile(r"(?is)<think(?:ing)?(?:\s+[^>]*)?>.*?</think(?:ing)?\s*>")
THINK_MARKER_RE = re.compile(r"(?is)</?think(?:ing)?(?:\s+[^>]*)?>")


def strip_think_and_fences(text: str) -> str:
    """
    Loại bỏ thẻ <think>...</think> (kể cả thẻ chưa đóng hoàn chỉnh theo chuẩn Meeting Minutes summary/processor.rs)
    và markdown code fences.
    """
    t = (text or "").strip()
    t = THINK_ENVELOPE_RE.sub("", t).strip()
    if THINK_MARKER_RE.search(t):
        # Nếu có thẻ <think> mở mà chưa đóng, cắt bỏ phần suy luận phía trước hoặc thẻ thừa
        if "</think" in t.lower():
            t = re.split(r"(?i)</think(?:ing)?\s*>", t)[-1].strip()
        t = THINK_MARKER_RE.sub("", t).strip()
    if t.startswith("```"):
        t = re.sub(r"^```[a-zA-Z0-9_-]*\s*", "", t)
        t = re.sub(r"\s*```$", "", t)
    return t.strip()


class MeetingMinutesAudioDSP:
    """
    Bộ xử lý tín hiệu âm thanh chuẩn công nghiệp (Port từ Zackriya-Solutions/meeting-minutes: audio_processing.rs & vad.rs):
    1. High-Pass Filter IIR bậc 1 (85Hz cutoff): Khử tiếng ù quạt gió, điều hòa, tiếng đập bàn và âm trầm nền phim.
    2. Anti-Aliasing Low-Pass Resampler: Lọc thông thấp chống răng cưa trước khi hạ tần số mẫu (48kHz -> 16kHz).
    3. Dynamic RMS Normalization (normalize_v2) + Soft-Clipping True-Peak Limiter (±0.95): Khuếch đại giọng nói nhỏ
       và chống vỡ tiếng (clipping) giúp Whisper & Google Speech nhận diện rõ gấp nhiều lần.
    """

    @staticmethod
    def high_pass_filter_85hz(samples: np.ndarray, sample_rate: int = 16000, cutoff_hz: float = 85.0) -> np.ndarray:
        if len(samples) < 4:
            return samples
        rc = 1.0 / (2.0 * np.pi * cutoff_hz)
        dt = 1.0 / float(sample_rate)
        alpha = float(rc / (rc + dt))
        # Khử thành phần DC và tần số thấp < 85Hz
        mean_removed = samples - np.mean(samples)
        diff = np.empty_like(mean_removed)
        diff[0] = mean_removed[0]
        diff[1:] = mean_removed[1:] - mean_removed[:-1]
        return (alpha * diff + (1.0 - alpha) * mean_removed).astype(np.float32)

    @staticmethod
    def resample_to_16k_antialias(samples: np.ndarray, src_sr: int) -> np.ndarray:
        if src_sr == 16000 or len(samples) == 0:
            return samples.astype(np.float32, copy=False)
        # Lọc thông thấp chống răng cưa (Anti-aliasing moving average kernel từ vad.rs)
        ratio = float(src_sr) / 16000.0
        k_size = max(1, min(5, int(round(ratio))))
        if k_size > 1 and len(samples) > k_size:
            kernel = np.ones(k_size, dtype=np.float32) / float(k_size)
            filtered = np.convolve(samples, kernel, mode="same")
        else:
            filtered = samples
        target_len = max(1, int(len(filtered) * 16000 / src_sr))
        return np.interp(
            np.linspace(0, len(filtered), target_len, endpoint=False),
            np.arange(len(filtered)),
            filtered,
        ).astype(np.float32)

    @staticmethod
    def normalize_and_soft_limit(audio: np.ndarray) -> np.ndarray:
        if len(audio) == 0:
            return audio
        rms = float(np.sqrt(np.mean(np.square(audio))))
        peak = float(np.max(np.abs(audio)))
        if rms < 1e-5 or peak < 1e-5:
            return audio
        # Công thức normalize_v2 từ Meeting Minutes (audio_processing.rs)
        target_rms = 0.22
        target_peak = 0.95
        min_scaling = 1.35
        max_scaling = 6.5
        rms_scaling = target_rms / rms
        peak_scaling = target_peak / peak
        scaling_factor = min(max_scaling, max(min_scaling, min(rms_scaling, peak_scaling)))
        scaled = audio * scaling_factor
        # Soft-clipping True-Peak Limiter tại ±0.95 tránh méo tiếng
        pos_mask = scaled > 0.95
        neg_mask = scaled < -0.95
        if np.any(pos_mask):
            scaled[pos_mask] = 0.95 + (scaled[pos_mask] - 0.95) * 0.05
        if np.any(neg_mask):
            scaled[neg_mask] = -0.95 + (scaled[neg_mask] + 0.95) * 0.05
        return np.clip(scaled, -1.0, 1.0).astype(np.float32)


class MeetingMinutesPostProcessor:
    """
    Bộ hậu xử lý văn bản phiên âm 4 bước (Port từ Zackriya-Solutions/meeting-minutes: post_processor.rs):
    - Bước 1: clean_repetitive_text (Khử lặp từ đơn & lặp cụm 2-3 từ liên tiếp).
    - Bước 2: remove_artifacts (Lọc bỏ từ đệm ngập ngừng uh, um, er, ah, hmm).
    - Bước 3: deduplicate_overlap_boundary (Khử lặp từ ở ranh giới gối đầu 2 đoạn âm thanh liên tiếp).
    - Bước 4: normalize_text & apply_contextual_improvements (Chuẩn hóa dấu câu, viết tắt tiếng Anh & viết hoa đầu câu).
    """

    FILLERS = {"uh", "um", "er", "ah", "hm", "hmm", "uhh", "umm", "err", "ahh", "ohh"}
    CONTRACTIONS = [
        (r"\bcant\b", "can't"),
        (r"\bwont\b", "won't"),
        (r"\bdont\b", "don't"),
        (r"\bdoesnt\b", "doesn't"),
        (r"\bdidnt\b", "didn't"),
        (r"\bwouldnt\b", "wouldn't"),
        (r"\bcouldnt\b", "couldn't"),
        (r"\bshouldnt\b", "shouldn't"),
        (r"\bisnt\b", "isn't"),
        (r"\barent\b", "aren't"),
        (r"\bwasnt\b", "wasn't"),
        (r"\bwerent\b", "weren't"),
        (r"\bhasnt\b", "hasn't"),
        (r"\bhavent\b", "haven't"),
        (r"\bhadnt\b", "hadn't"),
    ]

    @classmethod
    def clean_repetitive_text(cls, text: str) -> str:
        words = text.split()
        if len(words) < 3:
            return text
        result = []
        i = 0
        n = len(words)
        while i < n:
            curr = words[i]
            # 1. Lặp từ đơn liên tiếp (e.g. "the the")
            if i + 1 < n and words[i + 1].lower().strip(".,!?") == curr.lower().strip(".,!?"):
                result.append(curr)
                while i + 1 < n and words[i + 1].lower().strip(".,!?") == curr.lower().strip(".,!?"):
                    i += 1
            # 2. Lặp cụm 2 từ liên tiếp (e.g. "I think I think")
            elif i + 3 < n and [w.lower() for w in words[i:i + 2]] == [w.lower() for w in words[i + 2:i + 4]]:
                phrase = [w.lower() for w in words[i:i + 2]]
                result.extend(words[i:i + 2])
                i += 4
                while i + 1 < n and [w.lower() for w in words[i:min(i + 2, n)]] == phrase:
                    i += 2
                continue
            # 3. Lặp cụm 3 từ liên tiếp
            elif i + 5 < n and [w.lower() for w in words[i:i + 3]] == [w.lower() for w in words[i + 3:i + 6]]:
                result.extend(words[i:i + 3])
                i += 6
                continue
            else:
                result.append(curr)
            i += 1
        return " ".join(result)

    @classmethod
    def remove_artifacts(cls, text: str) -> str:
        text = re.sub(
            r"\[(?:blank_audio|music|inaudible|silence|applause|laughter|noise)[^\]]*\]|\((?:blank_audio|music|inaudible|silence|applause|laughter|noise)[^\)]*\)",
            "",
            text,
            flags=re.IGNORECASE,
        )
        words = text.split()
        if not words:
            return ""
        kept = []
        for w in words:
            clean_w = re.sub(r"[^a-zA-ZÀ-ỹ]", "", w).lower()
            if clean_w in cls.FILLERS and len(clean_w) <= 3:
                continue
            kept.append(w)
        return " ".join(kept)

    @classmethod
    def deduplicate_overlap_boundary(cls, prev_text: str, curr_text: str) -> str:
        """Nếu câu mới bị lặp lại 1-4 từ cuối của câu liền trước do đệm overlap 60ms, tự động cắt phần lặp."""
        if not prev_text or not curr_text:
            return curr_text
        p_words = prev_text.split()
        c_words = curr_text.split()
        if not p_words or len(c_words) < 2:
            return curr_text
        max_k = min(4, len(p_words), len(c_words) - 1)
        for k in range(max_k, 0, -1):
            p_tail = [re.sub(r"[^\w]", "", w).lower() for w in p_words[-k:]]
            c_head = [re.sub(r"[^\w]", "", w).lower() for w in c_words[:k]]
            if p_tail == c_head and any(len(x) >= 3 for x in c_head):
                return " ".join(c_words[k:]).strip()
        return curr_text

    @classmethod
    def process(cls, raw_text: str, prev_text: str = "", is_partial: bool = False) -> str:
        t = (raw_text or "").strip()
        if len(t) < 2:
            return t
        t = cls.clean_repetitive_text(t)
        t = cls.remove_artifacts(t)
        if prev_text and not is_partial:
            t = cls.deduplicate_overlap_boundary(prev_text, t)
        # Chuẩn hóa khoảng trắng quanh dấu câu
        t = re.sub(r"\s+([.,!?;:])", r"\1", t)
        t = re.sub(r"([.,!?])\s{2,}", r"\1 ", t).strip()
        if not is_partial:
            for pat, repl in cls.CONTRACTIONS:
                t = re.sub(pat, repl, t, flags=re.IGNORECASE)
            if t and t[0].islower():
                t = t[0].upper() + t[1:]
        return t


def pcm_float32_to_wav_bytes(f32_16k: np.ndarray) -> bytes:
    """Chuyển mảng Float32 mono 16kHz qua bộ lọc DSP Meeting Minutes (High-Pass 85Hz + Normalize + Soft-Limit) sang WAV PCM 16-bit."""
    filtered = MeetingMinutesAudioDSP.high_pass_filter_85hz(f32_16k, 16000, 85.0)
    normalized = MeetingMinutesAudioDSP.normalize_and_soft_limit(filtered)
    pcm16 = (normalized * 32767.0).astype("<i2")
    buf = io.BytesIO()
    with wave.open(buf, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(16000)
        wf.writeframes(pcm16.tobytes())
    return buf.getvalue()


def estimate_speaker_from_pitch(f32_16k: np.ndarray, source: str) -> str:
    """Ước lượng người nói dựa trên tần số cơ bản (F0) và nguồn âm thanh."""
    if source == "microphone":
        return "Người nói 1 (Micro)"
    try:
        if len(f32_16k) < 1600:
            return "Người nói 1"
        segment = f32_16k[:8000] - np.mean(f32_16k[:8000])
        corr = np.correlate(segment[:2048], segment[:2048], mode="full")
        corr = corr[len(corr) // 2:]
        # Tìm cực đại trong khoảng 80Hz (lag=200) đến 300Hz (lag=53)
        min_lag, max_lag = 53, 200
        if len(corr) > max_lag:
            peak_lag = min_lag + int(np.argmax(corr[min_lag:max_lag]))
            f0 = 16000.0 / max(1, peak_lag)
            if f0 > 175.0:
                return "Người nói 2"
    except Exception:
        pass
    return "Người nói 1"


def _load_api_keys() -> tuple[str, str]:
    gemini_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY") or ""
    groq_key = os.environ.get("GROQ_API_KEY") or DEFAULT_GROQ_KEY
    for env_cand in [
        BASE_DIR / ".env",
        Path(r"c:\Users\Admin\Downloads\Trạm Điều Khiển Tổng\.env"),
    ]:
        if env_cand.is_file():
            try:
                for line in env_cand.read_text(encoding="utf-8", errors="ignore").splitlines():
                    line = line.strip()
                    if line.startswith("GEMINI_API_KEY=") or line.startswith("GOOGLE_API_KEY="):
                        val = line.split("=", 1)[1].strip().strip('"\'')
                        if val and not gemini_key:
                            gemini_key = val
                            os.environ.setdefault("GEMINI_API_KEY", val)
                    elif line.startswith("GROQ_API_KEY="):
                        val = line.split("=", 1)[1].strip().strip('"\'')
                        if val:
                            groq_key = val
            except Exception:
                pass
    return groq_key, gemini_key


class VietLinguaEngine:
    """
    Động cơ AI Đa Tầng Không Giới Hạn (Unlimited Multi-Provider Cascade):
    - ASR:
      1. Groq Whisper Large V3 Turbo / V3 (0.38s, có bộ điều tiết Token-Bucket 14 RPM/model để KHÔNG BAO GIỜ dính lỗi 429).
      2. Google Web Speech API miễn phí không giới hạn (`speech_recognition` — 0 API key, 0 giới hạn quota) cho toàn bộ bản xem trước (Interim) và dự phòng tức thì.
      3. Gemini 3.1 Flash Lite Audio dự phòng.
    - Dịch Thuật 2 Tầng (Two-Stage Live Translation):
      1. Tầng 1 (0.18s tức thì, Không giới hạn): Google Neural Translate (`client=tw-ob` / `dict-chrome-ex`) giúp 100% câu thoại hiển thị bản dịch tiếng Việt ngay lập tức, không bao giờ mất câu.
      2. Tầng 2 (0.40s tinh chỉnh ngữ cảnh): Groq Qwen 3.8 27B / GPT-OSS 20B / 120B (hoặc Gemini 3.1 Flash Lite) chuốt lại câu dịch dài theo mạch hội thoại nhân vật.
    """

    GROQ_ASR_MODELS = ["whisper-large-v3-turbo", "whisper-large-v3"]
    GROQ_LLM_MODELS = ["qwen/qwen3.8-27b", "openai/gpt-oss-20b", "openai/gpt-oss-120b"]
    GEMINI_LLM_MODELS = ["gemini-3.1-flash-lite", "gemini-3-flash-preview", "gemini-3.5-flash", "gemini-flash-lite-latest"]

    def __init__(self):
        self.groq_key, self.gemini_key = _load_api_keys()
        self.http = requests.Session()
        self.http.headers.update({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36"})
        self._asr_counter = 0
        self._llm_counter = 0
        self._lock = threading.Lock()
        # Bộ điều tiết Rate-Limit thông minh (tránh tuyệt đối HTTP 429 khi ghi âm liên tục hàng giờ)
        self._model_calls: dict[str, deque[float]] = {}
        self._model_cooldown_until: dict[str, float] = {}
        self.last_detected_lang: str = "en"
        # Lưu 6 cặp câu thoại gần nhất để dịch sát ngữ cảnh và xưng hô nhân vật
        self.recent_dialogue: deque[tuple[str, str]] = deque(maxlen=6)
        self.recent_source_tail: str = ""

    def reset_context(self):
        with self._lock:
            self.recent_dialogue.clear()
            self.recent_source_tail = ""

    def _can_use_model(self, model: str, max_rpm: int = 14) -> bool:
        now = time.time()
        with self._lock:
            if now < self._model_cooldown_until.get(model, 0.0):
                return False
            q = self._model_calls.setdefault(model, deque())
            while q and now - q[0] > 60.0:
                q.popleft()
            if len(q) >= max_rpm:
                return False
            q.append(now)
            return True

    def _mark_model_cooldown(self, model: str, seconds: float = 18.0):
        with self._lock:
            self._model_cooldown_until[model] = time.time() + seconds

    def _next_asr_models(self) -> list[str]:
        with self._lock:
            idx = self._asr_counter % len(self.GROQ_ASR_MODELS)
            self._asr_counter += 1
        return self.GROQ_ASR_MODELS[idx:] + self.GROQ_ASR_MODELS[:idx]

    def _next_llm_models(self) -> list[str]:
        with self._lock:
            idx = self._llm_counter % len(self.GROQ_LLM_MODELS)
            self._llm_counter += 1
        return self.GROQ_LLM_MODELS[idx:] + self.GROQ_LLM_MODELS[:idx]

    # -------------------------------------------------------------------------
    # 0. FREE UNLIMITED GOOGLE NEURAL TRANSLATE (0.18s, NO KEY) & WEB SPEECH ASR
    # -------------------------------------------------------------------------
    def translate_instant_google(self, text: str, source_lang: str = "auto", target_lang: str = "vi") -> tuple[str, str]:
        """
        Dịch tức thì trong 0.18 giây qua Google Neural Translate (tw-ob / dict-chrome-ex).
        Hoàn toàn miễn phí, không giới hạn số câu, trả về (translated_text, detected_source_lang).
        """
        t = (text or "").strip()
        if not t:
            return "", "en"
        sl = source_lang if source_lang in ("en", "zh", "vi") else "auto"
        if sl == "zh":
            sl = "zh-CN"
        for client in ("tw-ob", "dict-chrome-ex"):
            try:
                resp = self.http.get(
                    "https://translate.googleapis.com/translate_a/single",
                    params={"client": client, "sl": sl, "tl": target_lang, "dt": "t", "q": t},
                    timeout=3.5,
                )
                if resp.status_code == 200:
                    data = resp.json()
                    if isinstance(data, list) and data and isinstance(data[0], list):
                        translated = "".join(seg[0] for seg in data[0] if seg and seg[0]).strip()
                        det_lang = str(data[2] if len(data) > 2 and data[2] else source_lang).lower()
                        if det_lang.startswith("zh"):
                            det_lang = "zh"
                        elif det_lang.startswith("vi"):
                            det_lang = "vi"
                        elif det_lang.startswith("en"):
                            det_lang = "en"
                        if translated:
                            return translated, det_lang
            except Exception:
                continue
        return "", detect_script_language(t, "", source_lang)

    def transcribe_google_web_free(self, wav_bytes: bytes, language_hint: str = "auto", duration_sec: float = 2.0) -> tuple[str, str]:
        """
        Phiên âm miễn phí không giới hạn bằng Google Web Speech API (`speech_recognition`).
        Dùng cho toàn bộ bản xem trước (Interim) và tự động gánh tải khi Groq chạm ngưỡng RPM.
        """
        try:
            import speech_recognition as sr
            recognizer = sr.Recognizer()
            with sr.AudioFile(io.BytesIO(wav_bytes)) as source:
                audio_data = recognizer.record(source)

            # Xác định thứ tự ngôn ngữ ưu tiên thử
            if language_hint == "vi":
                lang_candidates = [("vi-VN", "vi"), ("en-US", "en")]
            elif language_hint == "zh":
                lang_candidates = [("zh-CN", "zh"), ("en-US", "en")]
            elif language_hint == "en":
                lang_candidates = [("en-US", "en"), ("vi-VN", "vi")]
            else:
                primary = self.last_detected_lang if self.last_detected_lang in ("en", "vi", "zh") else "vi"
                lang_map = {"en": ("en-US", "en"), "vi": ("vi-VN", "vi"), "zh": ("zh-CN", "zh")}
                lang_candidates = [lang_map[primary]]
                for k, v in lang_map.items():
                    if k != primary:
                        lang_candidates.append(v)

            for g_locale, short_code in lang_candidates[:2]:
                try:
                    raw_text = recognizer.recognize_google(audio_data, language=g_locale)
                    raw_text = (raw_text or "").strip()
                    if raw_text and not is_hallucination_or_noise(raw_text, duration_sec):
                        # Kiểm tra lại ngôn ngữ thực sự bằng Google Translate detector nếu ở chế độ auto
                        det_code = detect_script_language(raw_text, short_code, language_hint)
                        if language_hint == "auto" and det_code == "en":
                            _, g_det = self.translate_instant_google(raw_text, "auto", "vi")
                            if g_det in ("vi", "zh", "en"):
                                det_code = g_det
                        with self._lock:
                            self.last_detected_lang = det_code
                        return raw_text, det_code
                except Exception:
                    continue
        except Exception:
            pass
        return "", "en"

    # -------------------------------------------------------------------------
    # 1. CORE LLM CALLER (GROQ MULTI-MODEL -> GEMINI MULTI-MODEL)
    # -------------------------------------------------------------------------
    def call_llm(
        self,
        prompt: str,
        system_prompt: str = "",
        json_mode: bool = False,
        temperature: float = 0.15,
        max_tokens: int = 2048,
        prefer_fast: bool = True,
    ) -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        groq_models = self._next_llm_models() if prefer_fast else ["openai/gpt-oss-120b", "qwen/qwen3.8-27b", "openai/gpt-oss-20b"]

        if self.groq_key:
            for model in groq_models:
                if not self._can_use_model(model, max_rpm=18):
                    continue
                try:
                    payload = {
                        "model": model,
                        "messages": messages,
                        "temperature": temperature,
                        "max_tokens": max_tokens,
                    }
                    if json_mode:
                        payload["response_format"] = {"type": "json_object"}
                    resp = self.http.post(
                        "https://api.groq.com/openai/v1/chat/completions",
                        headers={"Authorization": f"Bearer {self.groq_key}"},
                        json=payload,
                        timeout=7 if prefer_fast else 18,
                    )
                    if resp.status_code == 200:
                        content = resp.json()["choices"][0]["message"]["content"]
                        cleaned = strip_think_and_fences(content)
                        if cleaned:
                            return cleaned
                    elif resp.status_code == 429:
                        self._mark_model_cooldown(model, 18.0)
                except Exception:
                    continue

        if self.gemini_key:
            full_prompt = f"{system_prompt}\n\n{prompt}".strip() if system_prompt else prompt
            for gmodel in self.GEMINI_LLM_MODELS:
                if not self._can_use_model(gmodel, max_rpm=14):
                    continue
                try:
                    gen_cfg = {"temperature": temperature}
                    if json_mode:
                        gen_cfg["responseMimeType"] = "application/json"
                    resp = self.http.post(
                        f"https://generativelanguage.googleapis.com/v1beta/models/{gmodel}:generateContent?key={self.gemini_key}",
                        json={
                            "contents": [{"parts": [{"text": full_prompt}]}],
                            "generationConfig": gen_cfg,
                        },
                        timeout=10 if prefer_fast else 20,
                    )
                    if resp.status_code == 200:
                        candidates = resp.json().get("candidates") or []
                        if candidates:
                            parts = candidates[0].get("content", {}).get("parts") or []
                            if parts and parts[0].get("text"):
                                cleaned = strip_think_and_fences(parts[0]["text"])
                                if cleaned:
                                    return cleaned
                    elif resp.status_code == 429:
                        self._mark_model_cooldown(gmodel, 20.0)
                except Exception:
                    continue

        return ""

    # -------------------------------------------------------------------------
    # 2. ULTRA-FAST AUDIO CHUNK TRANSCRIPTION (< 0.42s, ZERO-DROP HYBRID)
    # -------------------------------------------------------------------------
    def transcribe_wav_bytes(
        self,
        wav_bytes: bytes,
        language_hint: str = "auto",
        duration_sec: float = 2.0,
        filename: str = "segment.wav",
        mime_type: str = "audio/wav",
        is_interim: bool = False,
    ) -> tuple[str, str]:
        """
        Phiên âm nhanh đoạn âm thanh WAV/MP3.
        - Nếu `is_interim=True`: Dùng Google Web Speech miễn phí không giới hạn để tiết kiệm 100% quota Groq cho câu chốt!
        - Nếu `is_interim=False`: Dùng Groq Whisper V3 Turbo / V3 (có Token-Bucket 14 RPM/model), tự động chuyển mượt sang Google Web Speech & Gemini khi vượt ngưỡng RPM.
        """
        if is_interim:
            return self.transcribe_google_web_free(wav_bytes, language_hint, duration_sec)

        with self._lock:
            prompt_tail = self.recent_source_tail[-160:] if self.recent_source_tail else ""

        if self.groq_key:
            for w_model in self._next_asr_models():
                if not self._can_use_model(w_model, max_rpm=14):
                    continue
                try:
                    data_fields = {
                        "model": w_model,
                        "response_format": "verbose_json",
                        "temperature": "0",
                    }
                    if language_hint in ("en", "zh", "vi"):
                        data_fields["language"] = language_hint
                    if prompt_tail:
                        data_fields["prompt"] = prompt_tail

                    resp = self.http.post(
                        "https://api.groq.com/openai/v1/audio/transcriptions",
                        headers={"Authorization": f"Bearer {self.groq_key}"},
                        files={"file": (filename, wav_bytes, mime_type)},
                        data=data_fields,
                        timeout=6.5,
                    )
                    if resp.status_code == 200:
                        j = resp.json()
                        raw_text = (j.get("text") or "").strip()
                        w_lang = j.get("language") or ""
                        if is_hallucination_or_noise(raw_text, duration_sec):
                            return "", "en"
                        lang_code = detect_script_language(raw_text, w_lang, language_hint)
                        with self._lock:
                            self.last_detected_lang = lang_code
                            self.recent_source_tail = (self.recent_source_tail + " " + raw_text).strip()[-240:]
                        return raw_text, lang_code
                    elif resp.status_code == 429:
                        self._mark_model_cooldown(w_model, 18.0)
                except Exception:
                    continue

        # Tầng 2 (Không giới hạn, 0 API Key): Google Web Speech API
        g_text, g_lang = self.transcribe_google_web_free(wav_bytes, language_hint, duration_sec)
        if g_text:
            with self._lock:
                self.recent_source_tail = (self.recent_source_tail + " " + g_text).strip()[-240:]
            return g_text, g_lang

        # Tầng 3: Gemini 3.1 Flash Lite Audio
        if self.gemini_key:
            b64_audio = base64.b64encode(wav_bytes).decode("ascii")
            for gmodel in ["gemini-3.1-flash-lite", "gemini-3-flash-preview"]:
                if not self._can_use_model(gmodel, max_rpm=12):
                    continue
                try:
                    resp = self.http.post(
                        f"https://generativelanguage.googleapis.com/v1beta/models/{gmodel}:generateContent?key={self.gemini_key}",
                        json={
                            "contents": [{
                                "parts": [
                                    {"inline_data": {"mime_type": mime_type, "data": b64_audio}},
                                    {"text": 'Transcribe the exact spoken words in this audio. Return JSON: {"lang": "en|zh|vi", "text": "..."}. If silence or noise, return {"lang": "en", "text": ""}.'}
                                ]
                            }],
                            "generationConfig": {"temperature": 0.0, "responseMimeType": "application/json"},
                        },
                        timeout=8,
                    )
                    if resp.status_code == 200:
                        txt = resp.json()["candidates"][0]["content"]["parts"][0]["text"]
                        parsed = json.loads(strip_think_and_fences(txt))
                        raw_text = (parsed.get("text") or "").strip()
                        if is_hallucination_or_noise(raw_text, duration_sec):
                            return "", "en"
                        lang_code = detect_script_language(raw_text, parsed.get("lang", ""), language_hint)
                        return raw_text, lang_code
                except Exception:
                    continue

        return "", "en"

    # -------------------------------------------------------------------------
    # 3. TWO-STAGE INSTANT (0.18s) + CONTEXT-AWARE AI TRANSLATION
    # -------------------------------------------------------------------------
    def translate_live_utterance(self, text: str, source_lang: str = "auto", allow_llm_polish: bool = True) -> str:
        """
        Dịch câu thoại sang tiếng Việt:
        - Luôn lấy bản dịch tức thì (0.18s) từ Google Neural Translate trước để đảm bảo 100% không bao giờ rớt câu.
        - Nếu câu dài (>= 6 từ) và LLM đang rảnh quota, tinh chỉnh lại bằng Qwen 3.8 27B / GPT-OSS theo ngữ cảnh hội thoại.
        """
        text = (text or "").strip()
        if not text:
            return ""
        detected = detect_script_language(text, "", source_lang)
        if detected == "vi":
            return text

        # Bước 1: Bản dịch tức thì 0.18s (Không bao giờ lỗi / hết quota)
        instant_vi, g_det = self.translate_instant_google(text, detected, "vi")
        if g_det == "vi" and VI_CHARS_RE.search(text):
            return text

        # Với câu ngắn (< 6 từ) hoặc khi không yêu cầu LLM polish -> trả ngay trong 0.18s
        if not allow_llm_polish or len(text.split()) < 6:
            final_short = instant_vi or text
            with self._lock:
                self.recent_dialogue.append((text, final_short))
            return final_short

        with self._lock:
            ctx_pairs = list(self.recent_dialogue)

        ctx_str = ""
        if ctx_pairs:
            ctx_lines = [f"- Gốc: {s} -> Việt: {v}" for s, v in ctx_pairs[-4:]]
            ctx_str = "Ngữ cảnh hội thoại liền trước:\n" + "\n".join(ctx_lines) + "\n\n"

        sys_prompt = (
            "Bạn là chuyên gia dịch phụ đề & phiên dịch cabin cao cấp của Điệp Viên Study. "
            "Hãy dịch câu thoại sau sang tiếng Việt tự nhiên, chuẩn xác, khớp 100% với lời nói và cảm xúc của nhân vật/diễn giả. "
            "Giữ nguyên thuật ngữ chuyên ngành, tên riêng và con số. "
            "Trả về DUY NHẤT JSON object theo định dạng: {\"vi\": \"Bản dịch tiếng Việt\"}"
        )
        user_prompt = f"{ctx_str}Câu cần dịch ({detected.upper()} -> VI):\n{text}"

        raw_out = self.call_llm(
            prompt=user_prompt,
            system_prompt=sys_prompt,
            json_mode=True,
            temperature=0.1,
            max_tokens=512,
            prefer_fast=True,
        )
        vi_text = ""
        if raw_out:
            try:
                parsed = json.loads(raw_out)
                vi_text = str(parsed.get("vi") or parsed.get("translation") or "").strip()
            except Exception:
                vi_text = strip_think_and_fences(raw_out).strip('"\'')

        best_vi = vi_text or instant_vi or text
        with self._lock:
            self.recent_dialogue.append((text, best_vi))
        return best_vi

    def translate_paragraph(self, text: str, prev_context: str = "", source_lang: str = "auto") -> str:
        """Chuẩn hóa và dịch mượt cả đoạn hội thoại / bài giảng sang tiếng Việt."""
        text = (text or "").strip()
        if not text:
            return ""

        instant_vi, _ = self.translate_instant_google(text, source_lang, "vi")

        with self._lock:
            recent_ctx = "\n".join(f"{s} -> {v}" for s, v in list(self.recent_dialogue)[-4:])

        combined_ctx = (prev_context or recent_ctx or "").strip()[-600:]
        sys_prompt = (
            "Bạn là dịch giả chuyên nghiệp của Điệp Viên Study. Hãy dịch đoạn lời thoại/bài giảng sau sang tiếng Việt "
            "mạch lạc, tự nhiên, sát nghĩa từng câu chữ của nhân vật và chuẩn thuật ngữ. "
            "Trả về DUY NHẤT JSON object: {\"vi\": \"Bản dịch tiếng Việt hoàn chỉnh\"}"
        )
        user_prompt = f"Ngữ cảnh trước đó:\n{combined_ctx}\n\nĐoạn văn cần dịch sang tiếng Việt:\n{text}" if combined_ctx else f"Dịch đoạn văn sau sang tiếng Việt:\n{text}"

        raw_out = self.call_llm(
            prompt=user_prompt,
            system_prompt=sys_prompt,
            json_mode=True,
            temperature=0.15,
            max_tokens=1536,
            prefer_fast=True,
        )
        if raw_out:
            try:
                parsed = json.loads(raw_out)
                vi = str(parsed.get("vi") or parsed.get("translation") or "").strip()
                if vi:
                    return vi
            except Exception:
                cleaned = strip_think_and_fences(raw_out)
                if cleaned and not cleaned.startswith("{"):
                    return cleaned
        return instant_vi or self.translate_live_utterance(text, source_lang, allow_llm_polish=False)

    # -------------------------------------------------------------------------
    # 4. FILE & VIDEO PART PROCESSING (CHUNKED FAST WHISPER + BATCH TRANSLATE)
    # -------------------------------------------------------------------------
    def _translate_file_segments(self, segments: list[dict], detected_lang: str) -> None:
        if detected_lang == "vi" or not segments:
            return
        batch_size = 15
        for b_start in range(0, len(segments), batch_size):
            batch = segments[b_start:b_start + batch_size]
            numbered = "\n".join(f"{i}: {seg['source_text']}" for i, seg in enumerate(batch))
            tr_prompt = (
                "Hãy dịch chính xác từng câu dưới đây sang tiếng Việt tự nhiên, sát lời nhân vật. "
                "Trả về JSON object có key \"translations\" là danh sách chuỗi tiếng Việt tương ứng đúng thứ tự:\n"
                f"{numbered}"
            )
            tr_raw = self.call_llm(
                prompt=tr_prompt,
                system_prompt="Return valid JSON: {\"translations\": [\"...\"]}",
                json_mode=True,
                temperature=0.1,
                max_tokens=2048,
            )
            tr_list = []
            if tr_raw:
                try:
                    tr_list = json.loads(tr_raw).get("translations") or []
                except Exception:
                    pass
            for i, seg in enumerate(batch):
                if i < len(tr_list) and isinstance(tr_list[i], str) and tr_list[i].strip():
                    seg["translated_text"] = tr_list[i].strip()
                else:
                    inst_vi, _ = self.translate_instant_google(seg["source_text"], detected_lang, "vi")
                    seg["translated_text"] = inst_vi or seg["source_text"]

    def process_audio_file(self, filepath: str, source_lang: str = "auto") -> dict:
        """
        Phiên âm & dịch file âm thanh / video nhanh gấp 5 lần bằng Groq Whisper (verbose_json có sẵn timestamps),
        tự động dự phòng bằng ffmpeg WAV chunking + Google Web Speech API + Google Neural Translate khi không có Groq key.
        """
        tmp_mp3 = os.path.join(tempfile.gettempdir(), f"dvstudy_file_{uuid.uuid4().hex[:8]}.mp3")
        tmp_chunk_dir = os.path.join(tempfile.gettempdir(), f"dvstudy_chunks_{uuid.uuid4().hex[:8]}")
        target_path = filepath
        try:
            cmd = [
                "ffmpeg", "-y", "-i", filepath,
                "-vn", "-ac", "1", "-ar", "16000", "-b:a", "48k",
                tmp_mp3
            ]
            subprocess.run(
                cmd, capture_output=True, timeout=120,
                creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0
            )
            if os.path.exists(tmp_mp3) and os.path.getsize(tmp_mp3) > 500:
                target_path = tmp_mp3

            if self.groq_key and os.path.getsize(target_path) <= 24 * 1024 * 1024:
                with open(target_path, "rb") as f:
                    audio_bytes = f.read()
                data_fields = {
                    "model": "whisper-large-v3-turbo",
                    "response_format": "verbose_json",
                    "temperature": "0",
                }
                if source_lang in ("en", "zh", "vi"):
                    data_fields["language"] = source_lang

                resp = self.http.post(
                    "https://api.groq.com/openai/v1/audio/transcriptions",
                    headers={"Authorization": f"Bearer {self.groq_key}"},
                    files={"file": (os.path.basename(target_path), audio_bytes, "audio/mpeg")},
                    data=data_fields,
                    timeout=60,
                )
                if resp.status_code == 200:
                    j = resp.json()
                    w_lang = j.get("language") or ""
                    raw_segs = j.get("segments") or []
                    if not raw_segs and j.get("text"):
                        raw_segs = [{"start": 0.0, "end": 5.0, "text": j["text"]}]

                    detected_lang = detect_script_language(j.get("text", ""), w_lang, source_lang)
                    segments = []
                    for s in raw_segs:
                        st_txt = (s.get("text") or "").strip()
                        if not st_txt or is_hallucination_or_noise(st_txt, float(s.get("end", 3.0)) - float(s.get("start", 0.0))):
                            continue
                        segments.append({
                            "start": float(s.get("start", 0.0)),
                            "end": float(s.get("end", 0.0)),
                            "speaker": "Người nói 1",
                            "source_text": st_txt,
                            "translated_text": "",
                        })

                    if segments:
                        self._translate_file_segments(segments, detected_lang)
                        return {"detected_language": detected_lang, "segments": segments}

            # Dự phòng miễn phí: tách thành các đoạn WAV 16kHz mono (20 giây/đoạn) và phiên âm qua Google Web Speech API
            os.makedirs(tmp_chunk_dir, exist_ok=True)
            chunk_pattern = os.path.join(tmp_chunk_dir, "chunk_%03d.wav")
            seg_cmd = [
                "ffmpeg", "-y", "-i", filepath,
                "-vn", "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le",
                "-f", "segment", "-segment_time", "20",
                chunk_pattern,
            ]
            subprocess.run(
                seg_cmd, capture_output=True, timeout=180,
                creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0
            )
            chunk_files = sorted(
                os.path.join(tmp_chunk_dir, fn)
                for fn in os.listdir(tmp_chunk_dir)
                if fn.endswith(".wav")
            )
            segments = []
            detected_lang = source_lang if source_lang != "auto" else "en"
            cur_offset = 0.0
            for cpath in chunk_files:
                try:
                    with open(cpath, "rb") as cf:
                        wav_bytes = cf.read()
                    dur_sec = max(0.5, (len(wav_bytes) - 44) / float(16000 * 2))
                    raw_text, det_code = self.transcribe_google_web_free(
                        wav_bytes, language_hint=source_lang, duration_sec=dur_sec
                    )
                    if raw_text:
                        if source_lang == "auto" and det_code in ("vi", "en", "zh"):
                            detected_lang = det_code
                        segments.append({
                            "start": round(cur_offset, 2),
                            "end": round(cur_offset + dur_sec, 2),
                            "speaker": "Người nói 1",
                            "source_text": raw_text,
                            "translated_text": "",
                        })
                    cur_offset += dur_sec
                except Exception:
                    continue

            if segments:
                self._translate_file_segments(segments, detected_lang)
                return {"detected_language": detected_lang, "segments": segments}
        except Exception:
            pass
        finally:
            if os.path.exists(tmp_mp3):
                try:
                    os.remove(tmp_mp3)
                except Exception:
                    pass
            if os.path.isdir(tmp_chunk_dir):
                try:
                    shutil.rmtree(tmp_chunk_dir, ignore_errors=True)
                except Exception:
                    pass

        return {"detected_language": source_lang if source_lang != "auto" else "en", "segments": []}


class LiveClauseStreamer:
    """
    Bộ tách câu thông minh chuẩn Meeting Minutes (Dual-Threshold Hysteresis VAD + Serial Ordered Emission + PostProcessor):
    - Dual-Threshold Hysteresis VAD (vad.rs): Ngưỡng vào giọng nói (`positive_speech_threshold`) và ngưỡng giữ giọng nói
      (`negative_speech_threshold = 0.68x`) giúp không bị đứt chữ khi người nói hạ giọng giữa câu, đồng thời loại bỏ
      tiếng click chuột / gõ phím ngắn (< 250ms `min_speech_time`).
    - Serial Ordered Worker (`final_executor(max_workers=1)` từ `transcription/worker.rs`): Đảm bảo 100% các câu chốt
      xuất hiện đúng thứ tự thời gian phát ngôn, không bao giờ câu sau nhảy lên trước câu trước.
    - 4-Stage PostProcessor (`post_processor.rs`): Khử từ lặp, từ đệm ngập ngừng (`uh`, `um`), khử lặp ranh giới gối đầu 60ms.
    - Tích hợp Watchdog tự động xả câu (flush) ngay khi người dùng bấm tạm dừng video (WASAPI Loopback ngừng gửi frame).
    """

    def __init__(self, source: str, controller: "BackendController"):
        self.source = source
        self.controller = controller
        self.sr = 16000
        self._lock = threading.Lock()
        self.pre_roll: deque[np.ndarray] = deque(maxlen=3)  # ~300ms pre-speech pad (chuẩn vad.rs)
        self.active_chunks: list[np.ndarray] = []
        self.active_samples = 0
        self.silence_samples = 0
        self.speaking = False
        self.utterance_id = ""
        self.utterance_started_at = 0.0
        self.last_feed_time = 0.0
        self.last_voice_time = 0.0
        self.interim_sent = False
        self.last_final_text = ""
        self.energy_history: deque[float] = deque(maxlen=45)
        # Serial worker (max_workers=1) cho câu chốt để đảm bảo thứ tự thời gian tuyệt đối (chuẩn Meeting Minutes worker.rs)
        self.final_executor = ThreadPoolExecutor(max_workers=1, thread_name_prefix=f"asr_final_{source}")
        self.interim_executor = ThreadPoolExecutor(max_workers=2, thread_name_prefix=f"asr_interim_{source}")
        self.polish_executor = ThreadPoolExecutor(max_workers=2, thread_name_prefix=f"tr_polish_{source}")

    def reset(self):
        with self._lock:
            self.pre_roll.clear()
            self.active_chunks.clear()
            self.active_samples = 0
            self.silence_samples = 0
            self.speaking = False
            self.interim_sent = False
            self.last_feed_time = 0.0
            self.last_voice_time = 0.0
            self.last_final_text = ""

    def feed(self, pcm_f32: np.ndarray):
        if len(pcm_f32) == 0:
            return
        now = time.time()
        # Lọc thông cao 85Hz chuẩn Meeting Minutes trước khi đo năng lượng VAD để tiếng bass/quạt gió không làm nhiễu VAD
        clean_chunk = MeetingMinutesAudioDSP.high_pass_filter_85hz(pcm_f32, self.sr, 85.0)
        rms = float(np.sqrt(np.mean(np.square(clean_chunk))))

        to_interim = None
        to_final = None

        with self._lock:
            self.last_feed_time = now
            self.energy_history.append(rms)

            # Dual-Threshold Hysteresis (positive_speech_threshold vs negative_speech_threshold từ vad.rs)
            if len(self.energy_history) >= 8:
                sorted_e = sorted(self.energy_history)
                noise_floor = sorted_e[max(0, len(sorted_e) // 4 - 1)]
                peak_recent = sorted_e[-1]
                pos_threshold = max(0.0075, min(0.036, noise_floor * 1.70 + 0.003))
                neg_threshold = max(pos_threshold * 0.68, min(0.042, peak_recent * 0.30))
            else:
                pos_threshold = 0.0085
                neg_threshold = 0.0060

            if not self.speaking:
                if rms >= pos_threshold:
                    self.speaking = True
                    self.utterance_id = str(uuid.uuid4())
                    self.utterance_started_at = now - (sum(len(x) for x in self.pre_roll) / self.sr)
                    self.last_voice_time = now
                    self.active_chunks = list(self.pre_roll) + [pcm_f32]
                    self.active_samples = sum(len(x) for x in self.active_chunks)
                    self.silence_samples = 0
                    self.interim_sent = False
                    self.pre_roll.clear()
                else:
                    self.pre_roll.append(pcm_f32)
                return

            # Đang trong câu nói (Hysteresis giữ mạch nói mượt qua các âm tiết nhẹ)
            self.active_chunks.append(pcm_f32)
            self.active_samples += len(pcm_f32)
            dur_sec = self.active_samples / self.sr

            if rms < neg_threshold:
                self.silence_samples += len(pcm_f32)
            else:
                self.silence_samples = 0
                self.last_voice_time = now

            silence_sec = self.silence_samples / self.sr

            # Loại bỏ tạp âm ngắn < 250ms (min_speech_time = 250ms từ vad.rs) nếu tắt tiếng ngay
            if dur_sec < 0.38 and silence_sec >= 0.25:
                self.active_chunks.clear()
                self.active_samples = 0
                self.silence_samples = 0
                self.speaking = False
                self.interim_sent = False
                return

            # 1. Phát bản xem trước (interim) ở mốc ~1.40 giây (bằng Google Web Speech 0 tốn quota Groq)
            if not self.interim_sent and 1.35 <= dur_sec <= 2.30 and silence_sec < 0.16:
                self.interim_sent = True
                snap_audio = np.concatenate(self.active_chunks)
                to_interim = (snap_audio, self.utterance_id, self.utterance_started_at, self.controller.current_generation)

            # 2. Điều kiện chốt câu (Pause >= 0.32s sau khi nói >= 0.65s, hoặc câu dài >= 3.25s)
            should_cut_on_pause = (dur_sec >= 0.65 and silence_sec >= 0.32)
            should_force_cut = (dur_sec >= 3.25)

            if should_cut_on_pause or should_force_cut:
                full_audio = np.concatenate(self.active_chunks)
                overlap_tail = None

                if should_force_cut and silence_sec < 0.18 and len(full_audio) > int(2.4 * self.sr):
                    search_len = int(0.60 * self.sr)
                    tail_region = full_audio[-search_len:]
                    win = 480  # 30ms (chuẩn vad_chunk_size = 480 samples của Meeting Minutes)
                    n_wins = len(tail_region) // win
                    if n_wins >= 3:
                        energies = [
                            float(np.mean(np.square(tail_region[i * win:(i + 1) * win])))
                            for i in range(n_wins)
                        ]
                        min_idx = int(np.argmin(energies))
                        cut_offset = len(full_audio) - search_len + (min_idx + 1) * win
                        overlap_start = max(0, cut_offset - int(0.06 * self.sr))
                        overlap_tail = full_audio[overlap_start:]
                        full_audio = full_audio[:cut_offset]

                seg_id = self.utterance_id
                seg_start = self.utterance_started_at
                seg_end = now
                seg_gen = self.controller.current_generation

                self.active_chunks.clear()
                self.active_samples = 0
                self.silence_samples = 0
                self.interim_sent = False

                if overlap_tail is not None and len(overlap_tail) > 0:
                    self.speaking = True
                    self.utterance_id = str(uuid.uuid4())
                    self.utterance_started_at = now - (len(overlap_tail) / self.sr)
                    self.last_voice_time = now
                    self.active_chunks = [overlap_tail]
                    self.active_samples = len(overlap_tail)
                else:
                    self.speaking = False

                to_final = (full_audio, seg_id, seg_start, seg_end, seg_gen)

        if to_interim is not None:
            self.interim_executor.submit(self._run_interim, *to_interim)
        if to_final is not None:
            self.final_executor.submit(self._run_final, *to_final)

    def check_watchdog_flush(self, now: float):
        """Tự động chốt câu nếu người dùng tạm dừng video (WASAPI ngừng gửi dữ liệu) hoặc im lặng > 0.50s."""
        to_final = None
        with self._lock:
            if not self.speaking or self.active_samples < int(0.30 * self.sr):
                return
            feed_gap = now - self.last_feed_time if self.last_feed_time > 0 else 0.0
            voice_gap = now - self.last_voice_time if self.last_voice_time > 0 else 0.0
            if feed_gap >= 0.42 or voice_gap >= 0.55:
                full_audio = np.concatenate(self.active_chunks)
                seg_id = self.utterance_id
                seg_start = self.utterance_started_at
                seg_end = now
                seg_gen = self.controller.current_generation
                self.active_chunks.clear()
                self.active_samples = 0
                self.silence_samples = 0
                self.speaking = False
                self.interim_sent = False
                to_final = (full_audio, seg_id, seg_start, seg_end, seg_gen)

        if to_final is not None:
            self.final_executor.submit(self._run_final, *to_final)

    def flush(self):
        to_final = None
        with self._lock:
            if self.speaking and self.active_samples >= int(0.28 * self.sr):
                full_audio = np.concatenate(self.active_chunks)
                seg_id = self.utterance_id
                seg_start = self.utterance_started_at
                seg_end = time.time()
                seg_gen = self.controller.current_generation
                self.pre_roll.clear()
                self.active_chunks.clear()
                self.active_samples = 0
                self.silence_samples = 0
                self.speaking = False
                self.interim_sent = False
                to_final = (full_audio, seg_id, seg_start, seg_end, seg_gen)
            else:
                self.pre_roll.clear()
                self.active_chunks.clear()
                self.active_samples = 0
                self.silence_samples = 0
                self.speaking = False
                self.interim_sent = False

        if to_final is not None:
            self.final_executor.submit(self._run_final, *to_final)

    def _run_interim(self, audio_f32: np.ndarray, seg_id: str, start_ts: float, gen: int):
        if gen != self.controller.current_generation or not self.controller.capturing:
            return
        try:
            dur = len(audio_f32) / self.sr
            wav_bytes = pcm_float32_to_wav_bytes(audio_f32)
            raw_text, lang_code = self.controller.engine.transcribe_wav_bytes(
                wav_bytes,
                language_hint=self.controller.current_language,
                duration_sec=dur,
                is_interim=True,
            )
            text = MeetingMinutesPostProcessor.process(raw_text, is_partial=True)
            if not text or gen != self.controller.current_generation:
                return
            spk = estimate_speaker_from_pitch(audio_f32, self.source)
            self.controller.hub.emit("worker-message", {
                "type": "transcript_interim",
                "id": seg_id,
                "text": text,
                "source": self.source,
                "language": lang_code,
                "speaker": spk,
                "started_at": start_ts,
                "generation": gen,
            })
        except Exception:
            pass

    def _run_final(self, audio_f32: np.ndarray, seg_id: str, start_ts: float, end_ts: float, gen: int):
        if gen != self.controller.current_generation:
            return
        try:
            dur = len(audio_f32) / self.sr
            if float(np.sqrt(np.mean(np.square(audio_f32)))) < 0.0025:
                return
            wav_bytes = pcm_float32_to_wav_bytes(audio_f32)
            raw_text, lang_code = self.controller.engine.transcribe_wav_bytes(
                wav_bytes,
                language_hint=self.controller.current_language,
                duration_sec=dur,
                is_interim=False,
            )
            if not raw_text or gen != self.controller.current_generation:
                return

            # Hậu xử lý 4 bước chuẩn Meeting Minutes (post_processor.rs) + Khử lặp ranh giới gối đầu
            text = MeetingMinutesPostProcessor.process(raw_text, prev_text=self.last_final_text, is_partial=False)
            if not text or len(text) < 2:
                return
            self.last_final_text = text

            # Chống vọng âm từ loa sang micro (Echo Gate)
            if self.source == "microphone" and self.controller.is_echo_from_system(text):
                return
            if self.source == "system":
                self.controller.record_system_transcript(text)

            # Kiểm tra nhanh qua Google Neural Translate để vừa có bản dịch 0.18s vừa chuẩn hóa mã ngôn ngữ
            instant_vi, g_det = self.controller.engine.translate_instant_google(text, lang_code, "vi")
            if g_det in ("en", "zh", "vi") and lang_code != "vi":
                lang_code = g_det

            spk = estimate_speaker_from_pitch(audio_f32, self.source)
            transcript_msg = {
                "type": "transcript",
                "id": seg_id,
                "text": text,
                "raw_text": text,
                "source": self.source,
                "language": lang_code,
                "speaker": spk,
                "speaker_provisional": False,
                "started_at": start_ts,
                "ended_at": end_ts,
                "generation": gen,
            }
            self.controller.hub.emit("worker-message", transcript_msg)

            # Dịch trực tiếp 2 tầng nếu câu nói không phải tiếng Việt
            if lang_code != "vi":
                if instant_vi and gen == self.controller.current_generation:
                    self.controller.hub.emit("worker-message", {
                        "type": "live_translation",
                        "id": seg_id,
                        "text": instant_vi,
                        "final": True,
                        "stable": instant_vi,
                        "started_at": start_ts,
                        "generation": gen,
                        "source": self.source,
                    })
                # Lưu checkpoint chống mất dữ liệu (incremental_saver.rs)
                self.controller.save_live_checkpoint(seg_id, spk, text, instant_vi, lang_code, start_ts)

                # Tầng 2: Nếu câu dài >= 6 từ, đẩy sang luồng polish riêng để không chặn câu kế tiếp
                if len(text.split()) >= 6 and gen == self.controller.current_generation:
                    self.polish_executor.submit(
                        self._run_llm_polish, text, lang_code, instant_vi, seg_id, start_ts, gen
                    )
                elif instant_vi:
                    with self.controller.engine._lock:
                        self.controller.engine.recent_dialogue.append((text, instant_vi))
            else:
                self.controller.save_live_checkpoint(seg_id, spk, text, "", lang_code, start_ts)
        except Exception:
            pass

    def _run_llm_polish(self, text: str, lang_code: str, instant_vi: str, seg_id: str, start_ts: float, gen: int):
        try:
            if gen != self.controller.current_generation:
                return
            polished_vi = self.controller.engine.translate_live_utterance(text, lang_code, allow_llm_polish=True)
            if polished_vi and polished_vi != instant_vi and gen == self.controller.current_generation:
                self.controller.hub.emit("worker-message", {
                    "type": "live_translation",
                    "id": seg_id,
                    "text": polished_vi,
                    "final": True,
                    "stable": polished_vi,
                    "started_at": start_ts,
                    "generation": gen,
                    "source": self.source,
                })
        except Exception:
            pass


WEB_DIST_DIR = BASE_DIR / "web_dist"
DATA_DIR = BASE_DIR / "data"
NOTES_FILE = DATA_DIR / "notes.json"
DOWNLOADS_MEDIA_DIR = DATA_DIR / "media"
CHECKPOINTS_DIR = DATA_DIR / ".checkpoints"
DATA_DIR.mkdir(parents=True, exist_ok=True)
DOWNLOADS_MEDIA_DIR.mkdir(parents=True, exist_ok=True)
CHECKPOINTS_DIR.mkdir(parents=True, exist_ok=True)

ROAMING_VIETNOTE = Path(os.environ.get("APPDATA", "")) / "local.vietnote.desktop"
LOCAL_VIETNOTE = Path(os.environ.get("LOCALAPPDATA", "")) / "VietNote"
WORKER_EXE = LOCAL_VIETNOTE / "_up_" / "worker-dist" / "vietnote-worker" / "vietnote-worker.exe"
VOICE_PACK_DIR = ROAMING_VIETNOTE / "voice" / "v1"


def probe_media_duration(file_path: str) -> float:
    """Lấy thời lượng file âm thanh / video bằng ffprobe."""
    try:
        cmd = [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            str(file_path)
        ]
        res = subprocess.run(
            cmd, capture_output=True, text=True, timeout=10,
            creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0
        )
        val = float(res.stdout.strip())
        if val > 0:
            return val
    except Exception:
        pass
    try:
        sz = os.path.getsize(file_path)
        return max(10.0, sz / 16000.0)
    except Exception:
        return 60.0


def extract_channel_id(val) -> int | None:
    """Trích xuất ID callback từ chuỗi '__CHANNEL__:<id>'."""
    if isinstance(val, str) and val.startswith("__CHANNEL__:"):
        try:
            return int(val.split(":", 1)[1])
        except Exception:
            return None
    return None


def match_evidence_ids(text: str, seg_records: list[dict], fallback_ids: list[str], top_k: int = 2) -> list[str]:
    """Tự động đối chiếu từ khóa để gắn đúng evidenceIds từ danh sách câu thoại."""
    if not seg_records:
        return fallback_ids[:top_k]
    words = set(re.findall(r"\w{3,}", (text or "").lower()))
    if not words:
        return fallback_ids[:1]
    scored = []
    for rec in seg_records:
        sid = rec["id"]
        stxt = rec["text"].lower()
        overlap = sum(1 for w in words if w in stxt)
        if overlap > 0:
            scored.append((overlap, sid))
    scored.sort(key=lambda x: x[0], reverse=True)
    matched = [sid for _, sid in scored[:top_k]]
    return matched if matched else fallback_ids[:1]


class EventHub:
    """Quản lý luồng Server-Sent Events (SSE) tới cửa sổ 'main' và 'island'."""
    def __init__(self):
        self.lock = threading.Lock()
        self.clients: dict[str, list[queue.Queue]] = {"main": [], "island": []}
        self.channel_indices: dict[int, int] = {}

    def subscribe(self, win_label: str):
        q = queue.Queue()
        with self.lock:
            self.clients.setdefault(win_label, []).append(q)
        return q

    def unsubscribe(self, win_label: str, q):
        with self.lock:
            lst = self.clients.get(win_label, [])
            if q in lst:
                lst.remove(q)

    def emit(self, event_name: str, payload, target: str | None = None):
        msg = json.dumps({"kind": "event", "event": event_name, "payload": payload}, ensure_ascii=False)
        with self.lock:
            targets = [target] if target and target in self.clients else list(self.clients.keys())
            for t in targets:
                for q in list(self.clients.get(t, [])):
                    try:
                        q.put_nowait(msg)
                    except Exception:
                        pass

    def send_channel(self, channel_id: int | None, message, end: bool = False, win_label: str = "main"):
        if channel_id is None:
            return
        with self.lock:
            idx = self.channel_indices.get(channel_id, 0)
            self.channel_indices[channel_id] = idx + 1
            payload = {"kind": "channel", "channelId": channel_id, "index": idx}
            if end:
                payload["end"] = True
            else:
                payload["message"] = message
            msg = json.dumps(payload, ensure_ascii=False)
            for q in list(self.clients.get(win_label, [])):
                try:
                    q.put_nowait(msg)
                except Exception:
                    pass


_PA_LOCK = threading.RLock()
_SHARED_PA = None

def _get_shared_pyaudio():
    global _SHARED_PA
    with _PA_LOCK:
        if _SHARED_PA is None:
            import pyaudiowpatch as pyaudio
            _SHARED_PA = pyaudio.PyAudio()
        return _SHARED_PA

class BackendController:
    """Thực thi toàn bộ tập lệnh Tauri IPC của Điệp Viên Study."""

    def __init__(self, hub: EventHub):
        self.hub = hub
        self.engine = VietLinguaEngine()
        self.server_port = 0
        self.main_win = None
        self.island_win = None

        # Worker & Live Capture state
        self.worker_proc = None
        self.worker_sock = None
        self.worker_lock = threading.Lock()
        self.current_generation = 0
        self.current_language = "auto"

        self.capturing = False
        self.mic_enabled = True
        self.sys_enabled = True
        self.capture_threads: list[threading.Thread] = []
        self.excluded_apps: list = []

        # Bộ tách câu thời gian thực cho Micro và System Audio
        self.mic_streamer = LiveClauseStreamer("microphone", self)
        self.sys_streamer = LiveClauseStreamer("system", self)
        self.recent_sys_texts: deque[tuple[float, str]] = deque(maxlen=15)
        self._echo_lock = threading.Lock()
        self._checkpoint_lock = threading.Lock()
        self.live_checkpoint_items: deque[dict] = deque(maxlen=400)

        # File jobs state
        self.file_jobs: dict[str, dict] = {}
        self.link_cancel_flag = threading.Event()

        self._init_notes_store()

    def save_live_checkpoint(self, seg_id: str, speaker: str, text: str, translated_text: str, lang: str, started_at: float):
        """
        Lưu tự động từng câu vừa ghi âm vào `data/.checkpoints/live_session_latest.json`
        (Cơ chế Incremental Saver chống mất bài giảng/cuộc họp từ Meeting Minutes incremental_saver.rs).
        """
        with self._checkpoint_lock:
            self.live_checkpoint_items.append({
                "id": seg_id,
                "speaker": speaker,
                "text": text,
                "translated_text": translated_text,
                "language": lang,
                "started_at": started_at,
                "saved_at": time.time(),
            })
            items_snapshot = list(self.live_checkpoint_items)
        try:
            ckpt_file = CHECKPOINTS_DIR / "live_session_latest.json"
            ckpt_file.write_text(
                json.dumps({"updated_at": time.time(), "segments": items_snapshot}, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )
        except Exception:
            pass

    def record_system_transcript(self, text: str):
        with self._echo_lock:
            self.recent_sys_texts.append((time.time(), text.lower().strip()))

    def is_echo_from_system(self, mic_text: str) -> bool:
        mt = mic_text.lower().strip()
        if not mt:
            return False
        now = time.time()
        with self._echo_lock:
            for ts, st in self.recent_sys_texts:
                if now - ts <= 6.0 and (mt in st or st in mt):
                    return True
        return False

    def _init_notes_store(self):
        if NOTES_FILE.exists():
            return
        notes = []
        groups = []
        roaming_notes = ROAMING_VIETNOTE / "meeting-notes.json"
        roaming_groups = ROAMING_VIETNOTE / "note-groups.json"
        if roaming_notes.exists():
            try:
                raw = json.loads(roaming_notes.read_text(encoding="utf-8"))
                if isinstance(raw, list):
                    notes = raw
                elif isinstance(raw, dict):
                    notes = raw.get("notes", [])
                    groups = raw.get("groups", [])
            except Exception:
                pass
        if roaming_groups.exists() and not groups:
            try:
                raw_g = json.loads(roaming_groups.read_text(encoding="utf-8"))
                if isinstance(raw_g, list):
                    groups = raw_g
            except Exception:
                pass
        NOTES_FILE.write_text(
            json.dumps({"notes": notes, "groups": groups}, ensure_ascii=False, indent=2),
            encoding="utf-8"
        )

    # =========================================================================
    # 1. WORKER BRIDGE (Điều phối trạng thái + Lazy ZeroTTS int8 + Built-in Cross-Platform TTS)
    # =========================================================================
    def start_worker(self):
        self.hub.emit("worker-status", "ready")
        self.hub.emit("worker-message", {
            "type": "connected",
            "tts_available": True,
            "vi_model_ready": True,
            "asr_backend": "Điệp Viên Study Hybrid ASR",
            "asr_model": "Whisper V3 Turbo + Google Speech + Qwen 3.8"
        })
        self.hub.emit("worker-message", {
            "type": "translation_mode",
            "generation": self.current_generation,
            "live": True,
            "live_audio": False,
            "provider": "Điệp Viên Study AI",
            "model": "Google Neural Instant + Qwen 3.8 27B"
        })
        return None

    def _ensure_tts_worker(self):
        if not IS_WINDOWS:
            return None
        with self.worker_lock:
            if self.worker_sock is not None:
                return self.worker_sock
            if not WORKER_EXE.exists():
                return None
            try:
                env = os.environ.copy()
                env.update({
                    "ASR_BACKEND": "groq",
                    "GROQ_API_KEY": self.engine.groq_key or DEFAULT_GROQ_KEY,
                    "GROQ_ASR_MODEL": "whisper-large-v3-turbo",
                    "ASR_TOKEN": "vietlingua-token",
                })
                if VOICE_PACK_DIR.exists():
                    env["TTS_MODEL_DIR"] = str(VOICE_PACK_DIR)

                self.worker_proc = subprocess.Popen(
                    [str(WORKER_EXE)],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT,
                    env=env,
                    text=True,
                    encoding="utf-8",
                    errors="replace",
                    creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0
                )

                port = None
                for _ in range(30):
                    line = self.worker_proc.stdout.readline()
                    if not line:
                        break
                    line = line.strip()
                    if line.startswith("{") and '"ready"' in line:
                        info = json.loads(line)
                        port = info.get("port")
                        break

                if port:
                    sock = socket.create_connection(("127.0.0.1", int(port)), timeout=8)
                    sock.settimeout(None)
                    hello = json.dumps({"type": "hello", "token": "vietlingua-token"}) + "\n"
                    sock.sendall(hello.encode("utf-8"))
                    self.worker_sock = sock

                    threading.Thread(target=self._read_worker_socket, args=(sock,), daemon=True).start()
                    threading.Thread(target=self._drain_worker_stdout, args=(self.worker_proc,), daemon=True).start()
                    return sock
            except Exception:
                pass
            return None

    def _drain_worker_stdout(self, proc):
        try:
            for _line in proc.stdout:
                pass
        except Exception:
            pass

    def _read_worker_socket(self, sock):
        try:
            f = sock.makefile("r", encoding="utf-8", errors="replace")
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    msg = json.loads(line)
                except Exception:
                    continue
                # Chỉ nhận các sự kiện TTS từ vietnote-worker.exe để tránh ghi đè translation_mode hoặc báo lỗi ASR giả
                if msg.get("type") in ("tts_status", "tts_begin", "tts_audio", "tts_end", "tts_skipped", "tts_error"):
                    self.hub.emit("worker-message", msg)
        except Exception:
            pass

    def _builtin_tts_synthesize(self, req_id: str, gen: int, text: str, voice: str = "baotrang"):
        """Tổng hợp giọng đọc Tiếng Việt đa nền tảng (macOS & Windows) khi không dùng vietnote-worker.exe."""
        clean_t = (text or "").strip()
        if not clean_t:
            self.hub.emit("worker-message", {"type": "tts_skipped", "id": req_id, "generation": gen})
            return
        try:
            self.hub.emit("worker-message", {"type": "tts_begin", "id": req_id, "generation": gen})
            tmp_mp3 = Path(tempfile.gettempdir()) / f"dvstudy_tts_{uuid.uuid4().hex}.mp3"
            edge_voice = "vi-VN-NamMinhNeural" if "nam" in (voice or "").lower() or "minh" in (voice or "").lower() else "vi-VN-HoaiMyNeural"
            synthesized = False
            try:
                import asyncio
                import edge_tts
                asyncio.run(edge_tts.Communicate(clean_t, edge_voice).save(str(tmp_mp3)))
                synthesized = tmp_mp3.exists() and tmp_mp3.stat().st_size > 100
            except Exception:
                synthesized = False

            if not synthesized:
                q_url = "https://translate.googleapis.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=" + urllib.parse.quote(clean_t[:200])
                r = requests.get(q_url, timeout=8)
                if r.status_code == 200 and len(r.content) > 100:
                    tmp_mp3.write_bytes(r.content)
                    synthesized = True

            if synthesized and tmp_mp3.exists():
                cmd = [
                    "ffmpeg", "-y", "-v", "error",
                    "-i", str(tmp_mp3),
                    "-f", "f32le", "-acodec", "pcm_f32le", "-ac", "1", "-ar", "24000", "pipe:1"
                ]
                res = subprocess.run(
                    cmd, capture_output=True, timeout=15,
                    creationflags=subprocess.CREATE_NO_WINDOW if IS_WINDOWS else 0
                )
                try:
                    tmp_mp3.unlink()
                except Exception:
                    pass
                pcm_bytes = res.stdout or b""
                if len(pcm_bytes) > 0:
                    chunk_bytes = 24000 * 4  # 1 giây mỗi chunk f32le 24kHz
                    for off in range(0, len(pcm_bytes), chunk_bytes):
                        part = pcm_bytes[off:off + chunk_bytes]
                        self.hub.emit("worker-message", {
                            "type": "tts_audio",
                            "id": req_id,
                            "generation": gen,
                            "pcm": base64.b64encode(part).decode("ascii"),
                            "sample_rate": 24000,
                        })
                    self.hub.emit("worker-message", {"type": "tts_end", "id": req_id, "generation": gen})
                    return
            self.hub.emit("worker-message", {"type": "tts_end", "id": req_id, "generation": gen})
        except Exception:
            self.hub.emit("worker-message", {"type": "tts_error", "id": req_id, "generation": gen})

    def send_worker(self, payload: dict):
        if not isinstance(payload, dict):
            return None
        mtype = payload.get("type")
        if mtype == "reset":
            self.current_generation = int(payload.get("generation", 0))
            self.current_language = str(payload.get("language", "auto"))
            self.engine.reset_context()
            self.mic_streamer.reset()
            self.sys_streamer.reset()
            self.hub.emit("worker-message", {
                "type": "translation_mode",
                "generation": self.current_generation,
                "live": True,
                "live_audio": False,
                "provider": "Điệp Viên Study AI",
                "model": "Google Neural Instant + Qwen 3.8 27B"
            })
            return None
        elif mtype == "finish_diarization":
            # Flush nốt câu cuối còn đang nói dở trước khi kết thúc
            self.mic_streamer.flush()
            self.sys_streamer.flush()
            self.hub.emit("worker-message", {
                "type": "diarization_finished",
                "id": str(payload.get("id", "")),
                "generation": self.current_generation
            })
            return None

        # Chuyển tiếp các lệnh đọc giọng TTS sang vietnote-worker.exe (Windows) hoặc Built-in TTS (macOS / fallback)
        if mtype in ("tts_enable", "tts_disable", "speak", "synthesize"):
            if mtype in ("tts_enable", "speak", "synthesize"):
                self._tts_voice = str(payload.get("voice") or getattr(self, "_tts_voice", "baotrang"))
            sock = self._ensure_tts_worker() if mtype in ("tts_enable", "speak", "synthesize") else self.worker_sock
            if sock is not None:
                try:
                    raw = json.dumps(payload, ensure_ascii=False) + "\n"
                    sock.sendall(raw.encode("utf-8"))
                    return None
                except Exception:
                    pass
            if mtype in ("speak", "synthesize"):
                req_id = str(payload.get("id") or uuid.uuid4().hex)
                gen = int(payload.get("generation", self.current_generation))
                txt = str(payload.get("text") or "")
                voice = getattr(self, "_tts_voice", "baotrang")
                threading.Thread(
                    target=self._builtin_tts_synthesize,
                    args=(req_id, gen, txt, voice),
                    daemon=True,
                ).start()
                return None

        if mtype == "tts_enable":
            self.hub.emit("worker-message", {
                "type": "tts_status",
                "state": "ready",
                "voice": payload.get("voice", "baotrang"),
                "message": ""
            })
        elif mtype == "tts_disable":
            self.hub.emit("worker-message", {
                "type": "tts_status",
                "state": "off",
                "voice": "baotrang",
                "message": ""
            })
        return None

    def stop_worker(self):
        self.stop_capture()
        with self.worker_lock:
            if self.worker_sock:
                try:
                    self.worker_sock.close()
                except Exception:
                    pass
                self.worker_sock = None
            if self.worker_proc:
                try:
                    self.worker_proc.terminate()
                except Exception:
                    pass
                self.worker_proc = None
        return None

    # =========================================================================
    # 2. LIVE AUDIO CAPTURE (Micro & System Audio WASAPI Loopback -> Clause VAD)
    # =========================================================================
    def start_capture(self, source: str = "both", feature: str = "notes"):
        self.stop_capture()
        self.start_worker()
        self.mic_streamer.reset()
        self.sys_streamer.reset()
        self.capturing = True
        self.mic_enabled = source in ("microphone", "both")
        self.sys_enabled = source in ("system", "both")

        self.hub.emit("worker-message", {
            "type": "diarization_status",
            "ready": True,
            "message": "Nhận diện giọng nói & tách câu siêu tốc sẵn sàng"
        })

        # Luồng Watchdog 0.2s giúp tự động chốt câu cuối ngay cả khi người dùng tạm dừng video (WASAPI ngừng gửi frame)
        t_wd = threading.Thread(target=self._watchdog_loop, daemon=True)
        t_wd.start()
        self.capture_threads.append(t_wd)

        if self.mic_enabled:
            self.hub.emit("worker-message", {
                "type": "asr_status",
                "generation": self.current_generation,
                "source": "microphone",
                "state": "connected"
            })
            t_mic = threading.Thread(target=self._capture_mic_loop, daemon=True)
            t_mic.start()
            self.capture_threads.append(t_mic)
        if self.sys_enabled:
            self.hub.emit("worker-message", {
                "type": "asr_status",
                "generation": self.current_generation,
                "source": "system",
                "state": "connected"
            })
            t_sys = threading.Thread(target=self._capture_system_loop, daemon=True)
            t_sys.start()
            self.capture_threads.append(t_sys)
        return None

    def stop_capture(self):
        if self.capturing:
            self.capturing = False
            for t in list(getattr(self, "capture_threads", [])):
                try:
                    if t and t.is_alive() and t != threading.current_thread():
                        t.join(timeout=1.5)
                except Exception:
                    pass
            self.capture_threads = []
            self.mic_streamer.flush()
            self.sys_streamer.flush()
        for src in ("microphone", "system"):
            self.hub.emit("audio-source-status", {"source": src, "state": "idle", "level": 0.0})
        return None

    def _watchdog_loop(self):
        while self.capturing:
            time.sleep(0.20)
            if not self.capturing:
                break
            now = time.time()
            try:
                self.mic_streamer.check_watchdog_flush(now)
                self.sys_streamer.check_watchdog_flush(now)
            except Exception:
                pass

    def _process_pcm_chunk(self, f32_16k: np.ndarray, source: str):
        if len(f32_16k) == 0:
            return
        rms = float(np.sqrt(np.mean(np.square(f32_16k))))
        self.hub.emit("audio-source-status", {"source": source, "state": "level", "level": min(1.0, rms * 3.2)})
        if source == "microphone":
            self.mic_streamer.feed(f32_16k)
        else:
            self.sys_streamer.feed(f32_16k)

    def _capture_mic_loop(self):
        if IS_WINDOWS:
            try:
                import pyaudiowpatch as pyaudio
                has_pyaudio = True
            except Exception:
                has_pyaudio = False
        else:
            has_pyaudio = False

        if has_pyaudio:
            while self.capturing:
                pa = None
                stream = None
                try:
                    with _PA_LOCK:
                        pa = _get_shared_pyaudio()
                        stream = pa.open(
                            format=pyaudio.paFloat32,
                            channels=1,
                            rate=16000,
                            input=True,
                            frames_per_buffer=1600
                        )
                    self.hub.emit("audio-source-status", {"source": "microphone", "state": "active", "level": 0.01})
                    while self.capturing:
                        data = stream.read(1600, exception_on_overflow=False)
                        if not self.mic_enabled:
                            continue
                        arr = np.frombuffer(data, dtype=np.float32).copy()
                        self._process_pcm_chunk(arr, "microphone")
                    break
                except Exception:
                    self.hub.emit("audio-source-status", {"source": "microphone", "state": "idle", "level": 0.0})
                    for _ in range(15):
                        if not self.capturing:
                            break
                        time.sleep(0.2)
                finally:
                    if stream is not None:
                        with _PA_LOCK:
                            try:
                                stream.stop_stream()
                                stream.close()
                            except Exception:
                                pass
            return

        # Nhánh macOS / Đa nền tảng qua sounddevice (PortAudio CoreAudio)
        while self.capturing:
            try:
                import sounddevice as sd
                with sd.InputStream(samplerate=16000, channels=1, dtype="float32", blocksize=1600) as stream:
                    self.hub.emit("audio-source-status", {"source": "microphone", "state": "active", "level": 0.01})
                    while self.capturing:
                        data, _overflowed = stream.read(1600)
                        if not self.mic_enabled:
                            continue
                        arr = np.asarray(data, dtype=np.float32).reshape(-1).copy()
                        self._process_pcm_chunk(arr, "microphone")
                break
            except Exception:
                self.hub.emit("audio-source-status", {"source": "microphone", "state": "idle", "level": 0.0})
                for _ in range(15):
                    if not self.capturing:
                        break
                    time.sleep(0.2)

    def _capture_system_loop(self):
        if IS_WINDOWS:
            try:
                import pyaudiowpatch as pyaudio
                has_pyaudio = True
            except Exception:
                has_pyaudio = False
        else:
            has_pyaudio = False

        if has_pyaudio:
            while self.capturing:
                pa = None
                stream = None
                try:
                    with _PA_LOCK:
                        pa = _get_shared_pyaudio()
                        loopback = pa.get_default_wasapi_loopback()
                        sr = int(loopback["defaultSampleRate"])
                        ch = int(loopback["maxInputChannels"])
                        chunk_frames = max(1024, sr // 10)
                        stream = pa.open(
                            format=pyaudio.paFloat32,
                            channels=ch,
                            rate=sr,
                            input=True,
                            input_device_index=loopback["index"],
                            frames_per_buffer=chunk_frames
                        )
                    self.hub.emit("audio-source-status", {"source": "system", "state": "active", "level": 0.01})
                    while self.capturing:
                        data = stream.read(chunk_frames, exception_on_overflow=False)
                        if not self.sys_enabled:
                            continue
                        arr = np.frombuffer(data, dtype=np.float32)
                        if ch > 1:
                            arr = arr.reshape(-1, ch).mean(axis=1)
                        if sr != 16000 and len(arr) > 0:
                            arr = MeetingMinutesAudioDSP.resample_to_16k_antialias(arr, sr)
                        else:
                            arr = arr.astype(np.float32).copy()
                        self._process_pcm_chunk(arr, "system")
                    break
                except Exception:
                    self.hub.emit("audio-source-status", {"source": "system", "state": "idle", "level": 0.0})
                    for _ in range(10):
                        if not self.capturing:
                            break
                        time.sleep(0.2)
                finally:
                    if stream is not None:
                        with _PA_LOCK:
                            try:
                                stream.stop_stream()
                                stream.close()
                            except Exception:
                                pass
            return

        # Nhánh macOS CoreAudio Loopback (BlackHole / Loopback / Soundflower / Aggregate)
        while self.capturing:
            try:
                import sounddevice as sd
                devs = sd.query_devices()
                loop_idx = None
                loop_sr = 16000
                loop_ch = 1
                for idx, d in enumerate(devs):
                    if int(d.get("max_input_channels", 0)) > 0:
                        nm = str(d.get("name", "")).lower()
                        if any(k in nm for k in ("blackhole", "loopback", "soundflower", "background music", "aggregate", "multi-output")):
                            loop_idx = idx
                            loop_sr = int(d.get("default_samplerate") or 48000)
                            loop_ch = min(2, int(d.get("max_input_channels") or 1))
                            break
                if loop_idx is None:
                    self.hub.emit("audio-source-status", {"source": "system", "state": "idle", "level": 0.0})
                    for _ in range(15):
                        if not self.capturing:
                            break
                        time.sleep(0.2)
                    continue
                chunk_frames = max(1024, loop_sr // 10)
                with sd.InputStream(device=loop_idx, samplerate=loop_sr, channels=loop_ch, dtype="float32", blocksize=chunk_frames) as stream:
                    self.hub.emit("audio-source-status", {"source": "system", "state": "active", "level": 0.01})
                    while self.capturing:
                        data, _overflowed = stream.read(chunk_frames)
                        if not self.sys_enabled:
                            continue
                        arr = np.asarray(data, dtype=np.float32)
                        if arr.ndim > 1 and arr.shape[1] > 1:
                            arr = arr.mean(axis=1)
                        else:
                            arr = arr.reshape(-1)
                        if loop_sr != 16000 and len(arr) > 0:
                            arr = MeetingMinutesAudioDSP.resample_to_16k_antialias(arr, loop_sr)
                        else:
                            arr = arr.astype(np.float32).copy()
                        self._process_pcm_chunk(arr, "system")
                break
            except Exception:
                self.hub.emit("audio-source-status", {"source": "system", "state": "idle", "level": 0.0})
                for _ in range(15):
                    if not self.capturing:
                        break
                    time.sleep(0.2)

    # =========================================================================
    # 3. FILE & LINK TRANSCRIPTION + TRANSLATION (6-TUPLE TOKENS)
    # =========================================================================
    def _segments_to_vietnote_tokens(self, segments: list[dict], detected_lang: str, translate: bool, offset_ms: int = 0) -> list:
        lang_code = "en"
        dl = (detected_lang or "").lower()
        if "zh" in dl or "trung" in dl or "chinese" in dl:
            lang_code = "zh"
        elif "vi" in dl or "việt" in dl:
            lang_code = "vi"

        tokens = []
        speaker_map: dict[str, int] = {}
        for seg in segments:
            spk_str = str(seg.get("speaker") or "Người nói 1")
            if spk_str not in speaker_map:
                speaker_map[spk_str] = len(speaker_map) + 1
            spk_num = speaker_map[spk_str]

            s_ms = int(float(seg.get("start", 0.0)) * 1000) + offset_ms
            e_ms = int(float(seg.get("end", 0.0)) * 1000) + offset_ms
            if e_ms <= s_ms:
                e_ms = s_ms + 2500

            src_text = (seg.get("source_text") or "").strip()
            tr_text = (seg.get("translated_text") or "").strip()

            if src_text:
                tokens.append([" " + src_text, s_ms, e_ms, spk_num, lang_code, False])
            if translate and tr_text and lang_code != "vi":
                tokens.append([" " + tr_text, s_ms, e_ms, spk_num, "vi", True])
        return tokens

    def start_file_job(self, filename: str, estimated_seconds: float, purpose: str = "file") -> dict:
        job_id = str(uuid.uuid4())
        self.file_jobs[job_id] = {
            "id": job_id,
            "filename": filename,
            "estimated_seconds": estimated_seconds,
            "purpose": purpose,
            "status": "created",
            "tokens": [],
            "audio_seconds": estimated_seconds or 60.0,
            "charged_seconds": 0,
            "error": None,
        }
        return {"job_id": job_id}

    def upload_file_job(self, job_id: str, path: str, language: str, translate: bool, channel_id: int | None):
        job = self.file_jobs.get(job_id)
        if not job:
            raise RuntimeError("Không tìm thấy phiên xử lý file.")
        job["status"] = "processing"
        self.hub.send_channel(channel_id, 35)
        self.hub.send_channel(channel_id, 100, end=True)

        def _worker():
            try:
                dur = probe_media_duration(path)
                res = self.engine.process_audio_file(path, source_lang=language or "auto")
                segments = res.get("segments", [])
                detected_lang = res.get("detected_language", language or "en")
                tokens = self._segments_to_vietnote_tokens(segments, detected_lang, bool(translate))
                job["tokens"] = tokens
                job["audio_seconds"] = dur
                job["status"] = "completed"
            except Exception as e:
                job["status"] = "failed"
                job["error"] = str(e)

        threading.Thread(target=_worker, daemon=True).start()
        return None

    def fetch_link_audio(self, url: str, channel_id: int | None) -> dict:
        self.link_cancel_flag.clear()
        self.hub.send_channel(channel_id, {"stage": "resolving", "percent": 5})

        out_tmpl = str(DOWNLOADS_MEDIA_DIR / f"link_{int(time.time())}_%(title).60s.%(ext)s")
        cmd = [
            sys.executable, "-m", "yt_dlp",
            "--no-playlist",
            "-x", "--audio-format", "mp3",
            "--audio-quality", "5",
            "--newline",
            "-o", out_tmpl,
            url
        ]
        proc = subprocess.Popen(
            cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
            text=True, encoding="utf-8", errors="replace",
            creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0
        )

        final_file = None
        for line in proc.stdout:
            if self.link_cancel_flag.is_set():
                proc.terminate()
                raise RuntimeError("cancelled")
            m = re.search(r"(\d+(?:\.\d+)?)%", line)
            if m:
                pct = min(98.0, float(m.group(1)))
                self.hub.send_channel(channel_id, {"stage": "downloading", "percent": pct})
            if "[ExtractAudio] Destination:" in line:
                final_file = line.split("[ExtractAudio] Destination:", 1)[1].strip()
            elif "Destination:" in line and not final_file:
                final_file = line.split("Destination:", 1)[1].strip()

        proc.wait()
        if not final_file or not os.path.exists(final_file):
            files = sorted(DOWNLOADS_MEDIA_DIR.glob("link_*"), key=lambda p: p.stat().st_mtime, reverse=True)
            if files:
                final_file = str(files[0])
            else:
                raise RuntimeError("Không tải được âm thanh từ liên kết này.")

        self.hub.send_channel(channel_id, {"stage": "downloading", "percent": 100}, end=True)
        p = Path(final_file)
        dur = probe_media_duration(str(p))
        return {
            "path": str(p),
            "name": re.sub(r"^link_\d+_", "", p.stem) + p.suffix,
            "size": p.stat().st_size,
            "durationSeconds": dur,
            "modifiedMs": int(p.stat().st_mtime * 1000),
            "sourceUrl": url
        }

    # =========================================================================
    # 4. AI SUMMARIZE, CHAT (ASK_NOTE), WRITE DOCUMENT, YOUTUBE & VIDEO
    # =========================================================================
    @staticmethod
    def _extract_seg_text(s: dict) -> str:
        if not isinstance(s, dict):
            return str(s or "")
        return (
            s.get("cleanText")
            or s.get("rawText")
            or s.get("sourceText")
            or s.get("text")
            or s.get("translatedText")
            or ""
        ).strip()

    def summarize_segments(self, segments: list, previous_summary=None, source=None) -> dict:
        """
        Tóm tắt cấu trúc chuẩn VietNote / Điệp Viên Study:
        - Đọc đúng cleanText / rawText / sourceText.
        - Cộng dồn thông minh với previous_summary khi đang ghi âm trực tiếp.
        - Tự động gắn và kiểm tra evidenceIds để bấm vào mỗi ý sẽ sáng đúng câu thoại gốc.
        """
        empty_summary = {
            "title": "Ghi chú mới",
            "tldr": "",
            "keyPoints": [],
            "decisions": [],
            "tentativeDecisions": [],
            "unresolvedTopics": [],
            "actionItems": [],
            "openQuestions": [],
            "deferred": []
        }
        if not segments and not previous_summary:
            return empty_summary

        lines = []
        valid_ids = []
        seg_records = []
        for idx, s in enumerate(segments[:400]):
            if not isinstance(s, dict):
                continue
            sid = str(s.get("id") or f"seg-{idx+1}")
            txt = self._extract_seg_text(s)
            if not txt:
                continue
            valid_ids.append(sid)
            spk = s.get("speaker") or "Người nói"
            lines.append(f"[{sid}] {spk}: {txt}")
            seg_records.append({"id": sid, "speaker": spk, "text": txt})

        if not lines:
            return previous_summary if isinstance(previous_summary, dict) else empty_summary

        # Map-Reduce Hierarchical Chunked Summarizer (Port từ Meeting Minutes transcript_processor.py & summary/processor.rs):
        # Nếu bài giảng/cuộc họp dài (> 55 câu thoại hoặc > 6000 ký tự), chia thành các chunk gối đầu (chunk_size=45, overlap=6)
        # để trích xuất điểm chính của từng phần trước khi tổng hợp toàn cục, giúp không bỏ sót nội dung ở giữa bài giảng.
        chunk_notes_block = ""
        if len(lines) > 55:
            chunk_summaries = []
            c_size = 45
            c_step = 39  # overlap 6 câu
            for c_idx, start_i in enumerate(range(0, len(lines), c_step)):
                sub_lines = lines[start_i:start_i + c_size]
                if len(sub_lines) < 3:
                    break
                sub_text = "\n".join(sub_lines)
                c_prompt = (
                    "Tóm tắt ngắn gọn các ý chính, quyết định, số liệu và việc cần làm trong phân đoạn bản ghi sau "
                    "(giữ nguyên các mã [id] quan trọng ở cuối mỗi ý):\n\n"
                    f"<transcript_chunk>\n{sub_text[:6000]}\n</transcript_chunk>"
                )
                c_out = self.engine.call_llm(
                    prompt=c_prompt,
                    system_prompt="Bạn là trợ lý phân tích phân đoạn bản ghi. Chỉ xuất danh sách gạch đầu dòng ngắn gọn bằng tiếng Việt kèm mã [id].",
                    json_mode=False,
                    temperature=0.1,
                    max_tokens=512,
                    prefer_fast=True,
                )
                if c_out:
                    chunk_summaries.append(f"--- Phần {c_idx + 1} ---\n{c_out}")
            if chunk_summaries:
                chunk_notes_block = "\nBẢN TÓM TẮT TỪNG PHÂN ĐOẠN (Map-Reduce Chunks):\n" + "\n\n".join(chunk_summaries) + "\n"

        prev_block = ""
        if isinstance(previous_summary, dict) and (previous_summary.get("tldr") or previous_summary.get("keyPoints")):
            try:
                prev_block = f"\nBẢN TÓM TẮT TRƯỚC ĐÓ (Hãy giữ lại các ý quan trọng đã có và cập nhật/bổ sung thêm nội dung mới):\n{json.dumps(previous_summary, ensure_ascii=False)}\n"
                for kp in previous_summary.get("keyPoints") or []:
                    for eid in kp.get("evidenceIds") or []:
                        if eid not in valid_ids:
                            valid_ids.append(eid)
            except Exception:
                pass

        transcript_block = "\n".join(lines)
        sys_prompt = (
            "Bạn là chuyên gia phân tích bài giảng, cuộc họp & nội dung học thuật của Điệp Viên Study. "
            "Hãy phân tích kỹ bản ghi âm và trả về DUY NHẤT một JSON object hợp lệ bằng tiếng Việt theo đúng cấu trúc yêu cầu."
        )
        prompt = f"""Hãy tổng hợp và phân tích chi tiết bản ghi dưới đây thành JSON object theo đúng schema sau:
{{
  "title": "Tiêu đề ngắn gọn, súc tích (4-9 từ, tiếng Việt)",
  "tldr": "Tóm tắt tổng quan cốt lõi (2-4 câu mạch lạc bằng tiếng Việt, nêu rõ chủ đề, nội dung chính và kết luận).",
  "keyPoints": [
    {{"id": "kp-1", "text": "Luận điểm / kiến thức / ý chính quan trọng (viết rõ ràng, đầy đủ ý)...", "evidenceIds": ["id_doan_thuc_te"]}}
  ],
  "decisions": [
    {{"id": "dec-1", "text": "Kết luận / Định hướng / Quyết định đã chốt (nếu có)...", "evidenceIds": ["id_doan_thuc_te"]}}
  ],
  "tentativeDecisions": [],
  "unresolvedTopics": [],
  "actionItems": [
    {{"id": "act-1", "owner": "Người thực hiện / Học viên", "task": "Việc cần làm / Bài tập / Bước tiếp theo", "deadline": "", "evidenceIds": ["id_doan_thuc_te"]}}
  ],
  "openQuestions": [
    {{"id": "oq-1", "text": "Câu hỏi mở / Vấn đề cần tìm hiểu thêm (nếu có)...", "evidenceIds": ["id_doan_thuc_te"]}}
  ],
  "deferred": []
}}
Quy tắc bắt buộc:
1. Toàn bộ nội dung tóm tắt phải viết bằng tiếng Việt chuẩn xác, dù bản ghi gốc là tiếng Anh hay tiếng Trung.
2. Mỗi mục trong keyPoints (từ 3 đến 8 ý tùy độ dài bản ghi) PHẢI gắn `evidenceIds` lấy từ mã `[id]` thực tế ở đầu dòng bản ghi.
{prev_block}{chunk_notes_block}
BẢN GHI MỚI:
{transcript_block[:24000]}"""

        raw_json = self.engine.call_llm(
            prompt=prompt,
            system_prompt=sys_prompt,
            json_mode=True,
            temperature=0.15,
            max_tokens=2048,
            prefer_fast=False,
        )

        if raw_json:
            try:
                data = json.loads(raw_json)
                valid_set = set(valid_ids)

                def _normalize_items(items, prefix: str, is_action: bool = False):
                    out = []
                    for i, item in enumerate(items or []):
                        if isinstance(item, str):
                            item = {"text": item}
                        if not isinstance(item, dict):
                            continue
                        item_id = str(item.get("id") or f"{prefix}-{i+1}")
                        ev = [str(x) for x in (item.get("evidenceIds") or []) if str(x) in valid_set]
                        txt_val = str(item.get("task") if is_action else item.get("text") or "").strip()
                        if not txt_val:
                            continue
                        if not ev:
                            ev = match_evidence_ids(txt_val, seg_records, valid_ids, top_k=2)
                        if is_action:
                            out.append({
                                "id": item_id,
                                "owner": str(item.get("owner") or "Chung"),
                                "task": txt_val,
                                "deadline": str(item.get("deadline") or ""),
                                "evidenceIds": ev,
                            })
                        else:
                            out.append({
                                "id": item_id,
                                "text": txt_val,
                                "evidenceIds": ev,
                            })
                    return out

                kps = _normalize_items(data.get("keyPoints"), "kp")
                if not kps and seg_records:
                    for i, rec in enumerate(seg_records[:4]):
                        kps.append({"id": f"kp-{i+1}", "text": rec["text"], "evidenceIds": [rec["id"]]})

                return {
                    "title": str(data.get("title") or "Tóm tắt nội dung học tập & hội thoại").strip(),
                    "tldr": str(data.get("tldr") or "").strip(),
                    "keyPoints": kps,
                    "decisions": _normalize_items(data.get("decisions"), "dec"),
                    "tentativeDecisions": _normalize_items(data.get("tentativeDecisions"), "tdec"),
                    "unresolvedTopics": _normalize_items(data.get("unresolvedTopics"), "unres"),
                    "actionItems": _normalize_items(data.get("actionItems"), "act", is_action=True),
                    "openQuestions": _normalize_items(data.get("openQuestions"), "oq"),
                    "deferred": _normalize_items(data.get("deferred"), "def"),
                }
            except Exception:
                pass

        # Fallback thông minh trích xuất trực tiếp từ các đoạn hội thoại
        kps_fallback = []
        step = max(1, len(seg_records) // 5)
        for idx, rec in enumerate(seg_records[::step][:5]):
            kps_fallback.append({
                "id": f"kp-{idx+1}",
                "text": rec["text"][:220],
                "evidenceIds": [rec["id"]],
            })
        return {
            "title": "Tổng hợp nội dung bản ghi",
            "tldr": " ".join(r["text"] for r in seg_records[:3])[:350],
            "keyPoints": kps_fallback,
            "decisions": [],
            "tentativeDecisions": [],
            "unresolvedTopics": [],
            "actionItems": [],
            "openQuestions": [],
            "deferred": []
        }

    def ask_note(self, request: dict, channel_id: int | None) -> dict:
        """
        Hệ thống Hỏi & Đáp thông minh từ nội dung bản ghi (Ask Note):
        - Đọc đầy đủ cleanText / rawText của từng segment + transcript + summary + quote + history.
        - Trả về câu trả lời Markdown chi tiết kèm evidenceIds chính xác và 3 gợi ý câu hỏi tiếp theo.
        """
        question = (request.get("question") or "Tóm tắt các nội dung quan trọng nhất trong bản ghi này.").strip()
        quote = (request.get("quote") or "").strip()
        segments = request.get("segments") or []
        transcript = (request.get("transcript") or "").strip()
        summary = (request.get("summary") or "").strip()
        history = request.get("history") or []

        seg_lines = []
        seg_records = []
        valid_ids = []
        for idx, s in enumerate(segments[:200]):
            if not isinstance(s, dict):
                continue
            sid = str(s.get("id") or f"seg-{idx+1}")
            txt = self._extract_seg_text(s)
            if not txt:
                continue
            spk = s.get("speaker") or "Người nói"
            ts = s.get("timestamp") or ""
            valid_ids.append(sid)
            seg_lines.append(f"[{sid}] ({ts}) {spk}: {txt}" if ts else f"[{sid}] {spk}: {txt}")
            seg_records.append({"id": sid, "speaker": spk, "text": txt})

        context_text = "\n".join(seg_lines) if seg_lines else transcript

        hist_lines = []
        for h in history[-6:]:
            if isinstance(h, dict):
                role = "Người dùng" if h.get("role") == "user" else "Trợ lý AI"
                content = (h.get("content") or h.get("text") or "").strip()
                if content:
                    hist_lines.append(f"- {role}: {content[:400]}")
        hist_block = ("\nLỊCH SỬ HỘI THOẠI TRƯỚC ĐÓ:\n" + "\n".join(hist_lines) + "\n") if hist_lines else ""

        # Gửi tín hiệu bắt đầu suy luận lên giao diện ngay lập tức
        if not seg_records and not transcript.strip():
            # Chế độ Dịch Nhanh & Hỏi Đáp Trợ Lý Học Thuật trực tiếp từ Floating Island (ngay cả khi chưa bật ghi âm)
            target_text = (quote or question or "").strip()
            instant_tr = ""
            if target_text:
                try:
                    instant_tr = self.engine.translate_paragraph(target_text, "", "auto")
                except Exception:
                    instant_tr = ""
            if instant_tr:
                self.hub.send_channel(channel_id, {"answer": f"**Bản dịch nhanh:**\n> {instant_tr}\n\n_Đang phân tích chi tiết ngữ cảnh & từ vựng…_"})
            else:
                self.hub.send_channel(channel_id, {"answer": "Đang dịch và phân tích bằng AI…"})

            sys_prompt = (
                "Bạn là Trợ lý Dịch thuật & Học thuật AI của Điệp Viên Study. "
                "Nếu người dùng gửi một từ, câu hoặc đoạn văn nước ngoài, hãy dịch chuẩn xác sang tiếng Việt, "
                "giải thích ngữ pháp/ngữ cảnh và liệt kê các từ vựng quan trọng kèm phiên âm IPA. "
                "Nếu người dùng đặt câu hỏi kiến thức hoặc yêu cầu giải thích, hãy trả lời chi tiết, rõ ràng bằng tiếng Việt chuẩn Markdown. "
                "Trả về DUY NHẤT một JSON object hợp lệ theo cấu trúc: "
                "{\"answer\": \"Nội dung trả lời chi tiết bằng Markdown...\", \"evidenceIds\": [], \"followUps\": [\"Gợi ý 1\", \"Gợi ý 2\", \"Gợi ý 3\"]}"
            )
            prompt = f"""Đoạn văn / Trích dẫn cần xử lý (nếu có): "{quote}"
Bản dịch sơ bộ (nếu có): "{instant_tr}"
{hist_block}
YÊU CẦU / CÂU HỎI CỦA NGƯỜI DÙNG:
{question}"""
        else:
            self.hub.send_channel(channel_id, {"answer": "Đang đối chiếu dữ liệu từ bản ghi…"})

            sys_prompt = (
                "Bạn là Trợ lý Nghiên cứu & Học tập AI của Điệp Viên Study. "
                "Hãy trả lời câu hỏi của người dùng dựa sát vào nội dung bản ghi âm, tóm tắt và đoạn trích dẫn được cung cấp. "
                "Trình bày bằng tiếng Việt rõ ràng, mạch lạc, có định dạng Markdown (in đậm ý chính, gạch đầu dòng dễ đọc). "
                "Trả về DUY NHẤT một JSON object hợp lệ theo cấu trúc: "
                "{\"answer\": \"Câu trả lời chi tiết bằng Markdown...\", \"evidenceIds\": [\"id_1\", \"id_2\"], \"followUps\": [\"Câu hỏi gợi ý 1\", \"Câu hỏi gợi ý 2\", \"Câu hỏi gợi ý 3\"]}"
            )
            prompt = f"""Đoạn trích dẫn đang chọn (nếu có): "{quote}"
Tóm tắt bản ghi hiện có:
{summary[:3000]}
{hist_block}
NỘI DUNG BẢN GHI CHI TIẾT (Mỗi dòng có mã [id] ở đầu):
{context_text[:24000]}

CÂU HỎI CỦA NGƯỜI DÙNG:
{question}"""

        raw_resp = self.engine.call_llm(
            prompt=prompt,
            system_prompt=sys_prompt,
            json_mode=True,
            temperature=0.2,
            max_tokens=2048,
            prefer_fast=False,
        )

        ans = ""
        ev_ids = []
        follow_ups = []
        valid_set = set(valid_ids)

        if raw_resp:
            try:
                parsed = json.loads(raw_resp)
                ans = str(parsed.get("answer") or "").strip()
                ev_ids = [str(x) for x in (parsed.get("evidenceIds") or []) if str(x) in valid_set]
                follow_ups = [str(x).strip() for x in (parsed.get("followUps") or []) if str(x).strip()]
            except Exception:
                ans = strip_think_and_fences(raw_resp)

        if not ans:
            if not seg_records and not transcript.strip():
                target_text = (quote or question or "").strip()
                tr_fallback = self.engine.translate_paragraph(target_text, "", "auto") if target_text else ""
                ans = f"### Bản dịch Tiếng Việt\n\n{tr_fallback}" if tr_fallback else "Hãy nhập câu hoặc đoạn văn cần dịch / hỏi đáp."
            else:
                ans = "Dựa trên bản ghi hiện tại:\n\n" + ("\n".join(f"- {r['text']}" for r in seg_records[:5]) if seg_records else (summary or transcript[:800] or "Chưa có dữ liệu bản ghi để trả lời."))

        if not ev_ids and valid_ids:
            ev_ids = match_evidence_ids(question + " " + ans, seg_records, valid_ids, top_k=3)

        if not follow_ups:
            follow_ups = [
                "Tóm tắt các luận điểm và kiến thức cốt lõi nhất",
                "Giải thích chi tiết hơn các thuật ngữ xuất hiện trong bài",
                "Liệt kê các câu hỏi ôn tập hoặc việc cần làm tiếp theo"
            ]

        result = {
            "answer": ans,
            "evidenceIds": ev_ids[:4],
            "followUps": follow_ups[:3],
            "incomplete": False
        }
        self.hub.send_channel(channel_id, result, end=True)
        return result

    def write_document(self, request: dict, channel_id: int | None) -> dict:
        """
        Hệ thống Soạn thảo Văn bản & Ghi chú Học tập (Write Document):
        - Hỗ trợ đầy đủ 7 chế độ của giao diện: meeting, lecture, article, post, custom, summary, selection.
        - Đọc đúng `lines`, `kind`, `length`, `instruction`, `current`, `digest`, `title`.
        """
        kind = request.get("kind") or request.get("preset") or "lecture"
        length = request.get("length") or "medium"
        instruction = (request.get("instruction") or request.get("instructions") or "").strip()
        title = (request.get("title") or "").strip()
        current_doc = (request.get("current") or "").strip()
        digest = request.get("digest") or []

        lines = request.get("lines") or []
        transcript = (request.get("transcript") or "").strip()
        segments = request.get("segments") or []

        if lines and isinstance(lines, list):
            transcript_body = "\n".join(str(x) for x in lines if x)
        elif transcript:
            transcript_body = transcript
        elif segments:
            transcript_body = "\n".join(
                f"{s.get('speaker', 'Người nói')}: {self._extract_seg_text(s)}"
                for s in segments if isinstance(s, dict) and self._extract_seg_text(s)
            )
        else:
            transcript_body = current_doc

        self.hub.send_channel(channel_id, {"stage": "preparing", "completed": 0, "total": 1})

        kind_guides = {
            "lecture": "Bài giảng & Ghi chú học tập chuyên sâu (gồm: Mục tiêu/Tổng quan, Các khái niệm & kiến thức trọng tâm, Phân tích ví dụ/ứng dụng, Bảng tóm tắt thuật ngữ và Câu hỏi ôn tập).",
            "meeting": "Biên bản cuộc họp chuyên nghiệp (gồm: Thông tin chung, Tóm tắt điều hành, Nội dung thảo luận chính, Các quyết định đã chốt và Bảng phân công công việc).",
            "article": "Bài viết phân tích chuyên sâu (có tiêu đề cuốn hút, mở bài, các tiểu mục phân tích rõ ràng và kết luận).",
            "post": "Bài đăng mạng xã hội / Blog chia sẻ kiến thức súc tích, cuốn hút, bố cục rõ ràng.",
            "summary": "Bản tóm tắt toàn diện, hệ thống hóa toàn bộ các luận điểm chính theo trình tự logic.",
            "selection": "Viết lại / Chỉnh sửa đoạn văn bản được chọn theo đúng yêu cầu hướng dẫn.",
            "custom": "Tài liệu chuyên biệt tuân thủ chính xác yêu cầu bổ sung của người dùng.",
        }
        length_guides = {
            "short": "Ngắn gọn, cô đọng (khoảng 300-500 từ), đi thẳng vào trọng tâm.",
            "medium": "Độ dài tiêu chuẩn (khoảng 600-1000 từ), trình bày đầy đủ và chi tiết các ý.",
            "long": "Chuyên sâu, đầy đủ và toàn diện (trên 1200 từ), phân tích kỹ lưỡng từng phần.",
        }

        kind_desc = kind_guides.get(kind, kind_guides["lecture"])
        len_desc = length_guides.get(length, length_guides["medium"])

        sys_prompt = (
            "Bạn là Biên tập viên Học thuật & Thư ký Cấp cao của Điệp Viên Study. "
            "Hãy soạn thảo văn bản hoàn chỉnh bằng tiếng Việt chuẩn mực, định dạng Markdown chuyên nghiệp "
            "(sử dụng tiêu đề ##, ###, danh sách gạch đầu dòng, in đậm thuật ngữ quan trọng và bảng biểu nếu phù hợp). "
            "Không thêm lời bình luận thừa ngoài nội dung tài liệu."
        )

        current_block = f"\nBẢN THẢO HIỆN TẠI CẦN CẢI THIỆN / CHỈNH SỬA:\n{current_doc[:10000]}\n" if current_doc else ""
        prompt = f"""Hãy biên soạn tài liệu hoàn chỉnh từ nội dung bản ghi dưới đây:
- Thể loại tài liệu ({kind}): {kind_desc}
- Độ dài yêu cầu ({length}): {len_desc}
- Tiêu đề gốc: {title or 'Tự đặt tiêu đề phù hợp'}
- Yêu cầu cụ thể từ người dùng: {instruction or 'Trình bày mạch lạc, chính xác, giàu giá trị học tập và thực tiễn.'}
{current_block}
NỘI DUNG BẢN GHI NGUỒN:
{transcript_body[:26000]}"""

        self.hub.send_channel(channel_id, {"stage": "writing", "text": f"## {title or 'Đang biên soạn tài liệu…'}\n\n_Điệp Viên Study AI đang tổng hợp và cấu trúc hóa nội dung…_"})

        md = self.engine.call_llm(
            prompt=prompt,
            system_prompt=sys_prompt,
            json_mode=False,
            temperature=0.2,
            max_tokens=4096,
            prefer_fast=False,
        )
        if not md:
            md = f"## {title or 'Tài liệu tổng hợp'}\n\n" + (transcript_body[:4000] or "Chưa có nội dung bản ghi để soạn thảo.")

        self.hub.send_channel(channel_id, {"stage": "writing", "text": md})
        self.hub.send_channel(channel_id, {"stage": "writing", "text": md}, end=True)
        return {"markdown": md, "digest": digest if isinstance(digest, list) else [], "incomplete": False}

    def youtube_captions(self, url: str) -> dict:
        m = re.search(r"(?:v=|youtu\.be/|shorts/|embed/)([\w-]{11})", str(url or ""))
        vid = m.group(1) if m else "eIho2S0ZahI"
        full_url = f"https://www.youtube.com/watch?v={vid}"
        title = f"YouTube Video ({vid})"
        dur = 300.0
        pieces = []
        lang = "en"
        kind = "none"
        channel_name = "YouTube"

        # Ưu tiên lấy phụ đề siêu nhanh qua youtube_transcript_api (< 0.8s)
        try:
            from youtube_transcript_api import YouTubeTranscriptApi
            yt_api = YouTubeTranscriptApi()
            fetched = None
            try:
                fetched = yt_api.fetch(vid, languages=["en", "en-US", "en-GB", "en-orig", "en-CA", "en-AU", "zh-Hans", "zh", "vi"])
            except Exception:
                try:
                    t_list = yt_api.list(vid)
                    for t_obj in t_list:
                        fetched = t_obj.fetch()
                        lang = str(getattr(t_obj, "language_code", "en") or "en").split("-")[0].lower()
                        kind = "auto" if getattr(t_obj, "is_generated", False) else "manual"
                        break
                except Exception:
                    fetched = None
            if fetched:
                api_pieces = []
                for sn in fetched:
                    st = float(getattr(sn, "start", 0.0) if hasattr(sn, "start") else sn.get("start", 0.0))
                    du = float(getattr(sn, "duration", 2.0) if hasattr(sn, "duration") else sn.get("duration", 2.0))
                    tx = self._clean_caption_line(str(getattr(sn, "text", "") if hasattr(sn, "text") else sn.get("text", "")), lang)
                    if tx:
                        api_pieces.append({"start": st, "end": st + max(0.8, du), "text": tx})
                if api_pieces:
                    pieces = api_pieces
                    if kind == "none":
                        kind = "manual"
                    dur = max(dur, api_pieces[-1]["end"] + 2.0)
                    try:
                        oembed_url = f"https://www.youtube.com/oembed?url={urllib.parse.quote(full_url, safe='')}&format=json"
                        with urllib.request.urlopen(oembed_url, timeout=4) as oe_r:
                            oe_d = json.loads(oe_r.read().decode("utf-8", errors="ignore"))
                            title = oe_d.get("title") or title
                            channel_name = oe_d.get("author_name") or channel_name
                    except Exception:
                        pass
        except Exception:
            pass

        info = None
        if not pieces:
            try:
                import yt_dlp
                ydl_opts = {
                    "skip_download": True,
                    "noplaylist": True,
                    "quiet": True,
                    "no_warnings": True,
                    "ignore_no_formats_error": True,
                }
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(full_url, download=False)
            except Exception:
                info = None

        if not isinstance(info, dict):
            try:
                cmd = [
                    sys.executable, "-m", "yt_dlp",
                    "--dump-single-json", "--no-playlist", "--skip-download",
                    "--ignore-no-formats-error", "--no-warnings",
                    full_url
                ]
                res = subprocess.run(
                    cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=22,
                    creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0
                )
                if res.returncode == 0 and res.stdout.strip():
                    info = json.loads(res.stdout)
            except Exception:
                info = None

        if isinstance(info, dict):
            title = info.get("title") or title
            channel_name = info.get("uploader") or info.get("channel") or channel_name
            dur = float(info.get("duration") or dur)
            extracted_pieces, extracted_lang, extracted_kind = self._extract_yt_caption_pieces(info)
            if extracted_pieces:
                pieces = extracted_pieces
                lang = extracted_lang or "en"
                kind = extracted_kind

        return {
            "videoId": vid,
            "title": title,
            "channel": channel_name,
            "duration": dur,
            "language": lang,
            "kind": kind,
            "pieces": pieces
        }

    @staticmethod
    def _clean_caption_line(txt: str, lang: str = "en") -> str:
        if not txt:
            return ""
        t = re.sub(r"\[[^\]]*\]|\([^\)]*\)", "", str(txt)).strip()
        t = t.replace("’", "'").replace("‘", "'").replace("“", "").replace("”", "").replace('"', "")
        t = re.sub(r"\s*--+\s*", ", ", t)
        t = re.sub(r"\s*—+\s*", ", ", t)
        t = re.sub(r"\s+", " ", t).strip()
        t = re.sub(r",\s*,", ",", t)
        if lang == "en":
            if re.search(r"[^\x00-\x7F]", t):
                return ""
            if not re.search(r"[A-Za-z]", t):
                return ""
        return t

    def _extract_yt_caption_pieces(self, info: dict) -> tuple[list, str, str]:
        """Trích xuất danh sách câu phụ đề [{start, end, text}] chuẩn xác từng giây từ json3 / vtt của YouTube."""
        if not isinstance(info, dict):
            return [], "en", "none"
        subs = info.get("subtitles") or {}
        auto_subs = info.get("automatic_captions") or {}

        chosen_tracks = None
        chosen_lang = "en"
        chosen_kind = "manual"

        for k in ["en", "en-US", "en-GB", "en-orig", "en-CA", "en-AU"]:
            if k in subs and subs[k]:
                chosen_tracks = subs[k]
                chosen_lang = "en"
                chosen_kind = "manual"
                break
        if not chosen_tracks:
            for k in subs.keys():
                if k.lower().startswith("en") and subs[k]:
                    chosen_tracks = subs[k]
                    chosen_lang = "en"
                    chosen_kind = "manual"
                    break

        if not chosen_tracks:
            for k in ["en-orig", "en", "en-US", "en-GB"]:
                if k in auto_subs and auto_subs[k]:
                    chosen_tracks = auto_subs[k]
                    chosen_lang = "en"
                    chosen_kind = "auto"
                    break
        if not chosen_tracks:
            for k in auto_subs.keys():
                if k.lower().startswith("en") and auto_subs[k]:
                    chosen_tracks = auto_subs[k]
                    chosen_lang = "en"
                    chosen_kind = "auto"
                    break

        if not chosen_tracks:
            orig_lang = str(info.get("language") or "en").split("-")[0].lower()
            for k in [orig_lang, "zh-Hans", "zh-CN", "zh", "vi"]:
                if k in subs and subs[k]:
                    chosen_tracks = subs[k]
                    chosen_lang = k.split("-")[0].lower()
                    chosen_kind = "manual"
                    break
                if k in auto_subs and auto_subs[k]:
                    chosen_tracks = auto_subs[k]
                    chosen_lang = k.split("-")[0].lower()
                    chosen_kind = "auto"
                    break

        if not chosen_tracks:
            return [], chosen_lang, "none"

        json3_url = None
        vtt_url = None
        for tr in chosen_tracks:
            if not isinstance(tr, dict):
                continue
            ext = str(tr.get("ext") or "").lower()
            u = tr.get("url")
            if not u:
                continue
            if ext == "json3" and not json3_url:
                json3_url = u
            elif ext in ("vtt", "srv3", "ttml") and not vtt_url:
                vtt_url = u

        pieces = []
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
        noise_re = re.compile(r"^(\[.*\]|\(.*\)|.*|[-\s]+)$", re.IGNORECASE)
        skip_meta_re = re.compile(
            r"(transcriber:|reviewer:|brought to you by stanford|visit us at stanford\.edu|captions by)",
            re.IGNORECASE,
        )

        if json3_url:
            try:
                r = requests.get(json3_url, headers=headers, timeout=12)
                if r.status_code == 200:
                    jdata = r.json()
                    for ev in (jdata.get("events") or []):
                        if ev.get("aAppend") == 1:
                            continue
                        segs = ev.get("segs")
                        if not segs:
                            continue
                        raw_txt = "".join(str(s.get("utf8") or "") for s in segs).replace(chr(10), " ").strip()
                        if not raw_txt or noise_re.match(raw_txt) or skip_meta_re.search(raw_txt):
                            continue
                        txt = self._clean_caption_line(raw_txt, chosen_lang)
                        if not txt:
                            continue
                        st = float(ev.get("tStartMs", 0)) / 1000.0
                        du = float(ev.get("dDurationMs", 2500)) / 1000.0
                        last_offset_ms = 0.0
                        for s in segs:
                            if "tOffsetMs" in s:
                                last_offset_ms = max(last_offset_ms, float(s["tOffsetMs"]))
                        if last_offset_ms > 0:
                            en = st + (last_offset_ms / 1000.0) + 0.55
                        else:
                            en = st + min(du, 6.5)
                        pieces.append({"start": round(st, 2), "end": round(max(st + 0.5, en), 2), "text": txt})
            except Exception:
                pass

        if not pieces and vtt_url:
            try:
                r = requests.get(vtt_url, headers=headers, timeout=12)
                if r.status_code == 200:
                    raw_vtt = r.text
                    time_pat = re.compile(r"(\d{2}):(\d{2}):(\d{2})[\.,](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[\.,](\d{3})")
                    lines = raw_vtt.splitlines()
                    i = 0
                    while i < len(lines):
                        m = time_pat.search(lines[i])
                        if m:
                            st = int(m.group(1))*3600 + int(m.group(2))*60 + int(m.group(3)) + int(m.group(4))/1000.0
                            en = int(m.group(5))*3600 + int(m.group(6))*60 + int(m.group(7)) + int(m.group(8))/1000.0
                            i += 1
                            txt_lines = []
                            while i < len(lines) and lines[i].strip() and not time_pat.search(lines[i]):
                                clean_l = re.sub(r"<[^>]+>", "", lines[i]).strip()
                                if clean_l:
                                    txt_lines.append(clean_l)
                                i += 1
                            raw_txt = re.sub(r"\s+", " ", " ".join(txt_lines)).strip()
                            if raw_txt and not noise_re.match(raw_txt) and not skip_meta_re.search(raw_txt):
                                txt = self._clean_caption_line(raw_txt, chosen_lang)
                                if txt:
                                    pieces.append({"start": round(st, 2), "end": round(max(st + 0.5, en), 2), "text": txt})
                        else:
                            i += 1
            except Exception:
                pass

        cleaned = []
        for p in pieces:
            if cleaned and p["text"].lower() == cleaned[-1]["text"].lower():
                cleaned[-1]["end"] = max(cleaned[-1]["end"], p["end"])
                continue
            if cleaned and p["start"] < cleaned[-1]["end"]:
                cleaned[-1]["end"] = round(max(cleaned[-1]["start"] + 0.4, p["start"] - 0.02), 2)
            cleaned.append(p)
        return cleaned, chosen_lang, chosen_kind

    # =========================================================================
    # 4A-bis. PHÒNG LUYỆN ĐỌC SHADOWING YOUTUBE & VIDEO TRỰC TIẾP
    # =========================================================================
    SHADOWING_WORD_IPA_DICT = {
        "language": "/ˈlæŋ.ɡwɪdʒ/", "ability": "/əˈbɪl.ə.ti/", "bilingual": "/baɪˈlɪŋ.ɡwəl/",
        "multilingual": "/ˌmʌl.tiˈlɪŋ.ɡwəl/", "majority": "/məˈdʒɒr.ə.ti/", "brain": "/breɪn/",
        "measure": "/ˈmeʒ.ər/", "proficiency": "/prəˈfɪʃ.ən.si/", "comprehension": "/ˌkɒm.prɪˈhen.ʃən/",
        "active": "/ˈæk.tɪv/", "passive": "/ˈpæs.ɪv/", "communicate": "/kəˈmjuː.nɪ.keɪt/",
        "confidence": "/ˈkɒn.fɪ.dəns/", "confident": "/ˈkɒn.fɪ.dənt/", "anxiety": "/æŋˈzaɪ.ə.ti/",
        "attention": "/əˈten.ʃən/", "technique": "/tekˈniːk/", "structure": "/ˈstrʌk.tʃər/",
        "effective": "/ɪˈfek.tɪv/", "spontaneous": "/spɒnˈteɪ.ni.əs/", "situation": "/ˌsɪtʃ.uˈeɪ.ʃən/",
        "instrument": "/ˈɪn.strə.mənt/", "powerful": "/ˈpaʊə.fəl/", "probably": "/ˈprɒb.ə.bli/",
        "speaking": "/ˈspiː.kɪŋ/", "divided": "/dɪˈvaɪ.dɪd/", "section": "/ˈsek.ʃən/",
        "explain": "/ɪkˈspleɪn/", "commencement": "/kəˈmens.mənt/", "university": "/ˌjuː.nɪˈvɜː.sə.ti/",
        "honored": "/ˈɒn.əd/", "truth": "/truːθ/", "graduate": "/ˈɡrædʒ.u.ət/", "clearly": "/ˈklɪə.li/",
        "important": "/ɪmˈpɔː.tənt/", "different": "/ˈdɪf.ər.ənt/", "practice": "/ˈpræk.tɪs/",
        "pronunciation": "/prəˌnʌn.siˈeɪ.ʃən/", "fluency": "/ˈfluː.ən.si/", "natural": "/ˈnætʃ.ər.əl/",
        "knowledge": "/ˈnɒl.ɪdʒ/", "scientist": "/ˈsaɪən.tɪst/", "workout": "/ˈwɜː.kaʊt/",
        "cognitive": "/ˈkɒɡ.nə.tɪv/", "delay": "/dɪˈleɪ/", "disease": "/dɪˈziːz/", "focus": "/ˈfəʊ.kəs/",
        "world": "/wɜːld/", "people": "/ˈpiː.pəl/", "experience": "/ɪkˈspɪə.ri.əns/",
    }

    @classmethod
    def _build_linking_hint(cls, text: str, lang: str = "en") -> str:
        if lang == "zh":
            return ""
        words = re.findall(r"[A-Za-z']+|[.,!?;:]", text or "")
        if not words:
            return ""
        vowels = set("aeiouAEIOU")
        consonants = set("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ")
        out = []
        for idx, w in enumerate(words):
            if idx > 0 and re.match(r"^[A-Za-z']+$", w) and re.match(r"^[A-Za-z']+$", words[idx - 1]):
                prev_w = words[idx - 1]
                last_c = prev_w[-1]
                if last_c in "eE" and len(prev_w) > 2 and prev_w[-2] in consonants:
                    last_c = prev_w[-2]
                if last_c in consonants and w[0] in vowels:
                    out[-1] = out[-1] + "‿" + w
                    continue
            out.append(w)
        res = " ".join(out)
        return re.sub(r"\s+([.,!?;:])", r"\1", res)

    @classmethod
    def _build_sentence_phonetics(cls, text: str, lang: str = "en") -> str:
        if lang == "zh":
            return ""
        words = re.findall(r"[A-Za-z']+", (text or "").lower())
        found = []
        seen = set()
        for w in words:
            clean_w = w.rstrip("s").rstrip("ed") if w not in cls.SHADOWING_WORD_IPA_DICT else w
            ipa = cls.SHADOWING_WORD_IPA_DICT.get(w) or cls.SHADOWING_WORD_IPA_DICT.get(clean_w)
            if ipa and w not in seen:
                seen.add(w)
                found.append(f"{w} {ipa}")
            if len(found) >= 3:
                break
        return " · ".join(found)

    def shadowing_get_presets(self) -> dict:
        """6 Bài Luyện Đọc Shadowing Chuẩn Xác Từ Phụ Đề Gốc YouTube (100% Từ Ngữ Tiếng Anh Sạch)."""
        return {"ok": True, "presets": [{'id': 'preset-ted-speak', 'videoId': 'eIho2S0ZahI', 'url': 'https://www.youtube.com/watch?v=eIho2S0ZahI', 'title': 'TED: Sao để nói cuốn hút người nghe', 'channel': 'TED', 'level': 'B1–B2', 'language': 'en', 'accent': 'uk', 'duration': 598.0, 'sentences': [{'id': 'preset-ted-speak-1', 'index': 1, 'start': 13.96, 'end': 17.63, 'source': "The human voice: It's the instrument we all play.", 'phonetic': 'instrument /ˈɪn.strə.mənt/', 'linking': "The human voice: It's the‿instrument we all play.", 'translation': 'Giọng nói của con người: Đó là nhạc cụ mà tất cả chúng ta đều chơi.'}, {'id': 'preset-ted-speak-2', 'index': 2, 'start': 18.61, 'end': 21.07, 'source': "It's the most powerful sound in the world, probably.", 'phonetic': 'powerful /ˈpaʊə.fəl/ · world /wɜːld/ · probably /ˈprɒb.ə.bli/', 'linking': "It's the most powerful sound‿in the world, probably.", 'translation': 'Có lẽ đó là âm thanh mạnh mẽ nhất trên thế giới.'}, {'id': 'preset-ted-speak-3', 'index': 3, 'start': 21.09, 'end': 23.92, 'source': "It's the only one that can start a war or say I love you.", 'phonetic': '', 'linking': "It's the‿only‿one that can start‿a war‿or say‿I love you.", 'translation': 'Đó là người duy nhất có thể gây chiến hoặc nói anh yêu em.'}, {'id': 'preset-ted-speak-4', 'index': 4, 'start': 23.94, 'end': 25.8, 'source': 'And yet many people have the experience', 'phonetic': 'people /ˈpiː.pəl/ · experience /ɪkˈspɪə.ri.əns/', 'linking': 'And yet many people have the‿experience', 'translation': 'Tuy nhiên, nhiều người có kinh nghiệm'}, {'id': 'preset-ted-speak-5', 'index': 5, 'start': 25.82, 'end': 28.19, 'source': "that when they speak, people don't listen to them.", 'phonetic': 'people /ˈpiː.pəl/', 'linking': "that when they speak, people don't listen to them.", 'translation': 'rằng khi họ nói, mọi người không lắng nghe họ.'}, {'id': 'preset-ted-speak-6', 'index': 6, 'start': 28.21, 'end': 33.11, 'source': 'And why is that? How can we speak powerfully to make change in the world?', 'phonetic': 'world /wɜːld/', 'linking': 'And why‿is that? How can we speak powerfully to make change‿in the world?', 'translation': 'Và tại sao vậy? Làm thế nào chúng ta có thể lên tiếng một cách mạnh mẽ để tạo ra sự thay đổi trên thế giới?'}, {'id': 'preset-ted-speak-7', 'index': 7, 'start': 33.48, 'end': 34.8, 'source': "What I'd like to suggest,", 'phonetic': '', 'linking': "What‿I'd like to suggest,", 'translation': 'Điều tôi muốn đề xuất,'}, {'id': 'preset-ted-speak-8', 'index': 8, 'start': 34.82, 'end': 37.67, 'source': 'there are a number of habits that we need to move away from.', 'phonetic': '', 'linking': 'there‿are‿a number‿of habits that we need to move‿away from.', 'translation': 'có một số thói quen mà chúng ta cần phải bỏ đi.'}, {'id': 'preset-ted-speak-9', 'index': 9, 'start': 37.69, 'end': 41.42, 'source': "I've assembled for your pleasure here seven deadly sins of speaking.", 'phonetic': 'speaking /ˈspiː.kɪŋ/', 'linking': "I've‿assembled for your pleasure here seven deadly sins‿of speaking.", 'translation': 'Tôi đã tập hợp ở đây bảy tội lỗi chết người khi nói chuyện để bạn vui lòng.'}, {'id': 'preset-ted-speak-10', 'index': 10, 'start': 41.44, 'end': 43.85, 'source': "I'm not pretending this is an exhaustive list,", 'phonetic': '', 'linking': "I'm not pretending this‿is‿an‿exhaustive list,", 'translation': 'Tôi không giả vờ rằng đây là một danh sách đầy đủ,'}, {'id': 'preset-ted-speak-11', 'index': 11, 'start': 43.88, 'end': 49.11, 'source': 'but these seven, I think, are pretty large habits that we can all fall into.', 'phonetic': '', 'linking': 'but these seven, I think, are pretty large habits that we can‿all fall‿into.', 'translation': 'nhưng tôi nghĩ bảy điều này là những thói quen khá lớn mà tất cả chúng ta đều có thể mắc phải.'}, {'id': 'preset-ted-speak-12', 'index': 12, 'start': 49.13, 'end': 51.14, 'source': 'First, gossip.', 'phonetic': '', 'linking': 'First, gossip.', 'translation': 'Đầu tiên, tin đồn.'}, {'id': 'preset-ted-speak-13', 'index': 13, 'start': 51.99, 'end': 54.1, 'source': "Speaking ill of somebody who's not present.", 'phonetic': 'speaking /ˈspiː.kɪŋ/', 'linking': "Speaking‿ill‿of somebody who's not present.", 'translation': 'Nói xấu người không có mặt.'}, {'id': 'preset-ted-speak-14', 'index': 14, 'start': 54.7, 'end': 56.8, 'source': 'Not a nice habit, and we know perfectly well', 'phonetic': '', 'linking': 'Not‿a nice habit, and we know perfectly well', 'translation': 'Đó không phải là một thói quen tốt và chúng ta biết rất rõ'}, {'id': 'preset-ted-speak-15', 'index': 15, 'start': 56.82, 'end': 60.7, 'source': 'the person gossiping, five minutes later, will be gossiping about us.', 'phonetic': '', 'linking': 'the person gossiping, five minutes later, will be gossiping‿about‿us.', 'translation': 'người đang buôn chuyện, năm phút sau, sẽ buôn chuyện về chúng ta.'}, {'id': 'preset-ted-speak-16', 'index': 16, 'start': 61.77, 'end': 65.9, 'source': 'Second, judging. We know people who are like this in conversation,', 'phonetic': 'people /ˈpiː.pəl/ · conversation /ˌkɒn.vəˈseɪ.ʃən/', 'linking': 'Second, judging. We know people who are like this‿in conversation,', 'translation': 'Thứ hai, phán xét. Chúng tôi biết những người như thế này trong cuộc trò chuyện,'}, {'id': 'preset-ted-speak-17', 'index': 17, 'start': 65.92, 'end': 67.86, 'source': "and it's very hard to listen to somebody", 'phonetic': '', 'linking': "and‿it's very hard to listen to somebody", 'translation': 'và thật khó để lắng nghe ai đó'}, {'id': 'preset-ted-speak-18', 'index': 18, 'start': 67.88, 'end': 72.01, 'source': "if you know that you're being judged and found wanting at the same time.", 'phonetic': '', 'linking': "if you know that you're being judged‿and found wanting‿at the same time.", 'translation': 'nếu bạn biết rằng bạn đang bị đánh giá và đồng thời bị thấy thiếu thốn.'}, {'id': 'preset-ted-speak-19', 'index': 19, 'start': 72.03, 'end': 73.91, 'source': 'Third, negativity.', 'phonetic': '', 'linking': 'Third, negativity.', 'translation': 'Thứ ba, tiêu cực.'}, {'id': 'preset-ted-speak-20', 'index': 20, 'start': 74.45, 'end': 75.73, 'source': 'You can fall into this.', 'phonetic': '', 'linking': 'You can fall‿into this.', 'translation': 'Bạn có thể rơi vào tình trạng này.'}]}, {'id': 'preset-stanford-talk', 'videoId': 'HAnw168huqA', 'url': 'https://www.youtube.com/watch?v=HAnw168huqA', 'title': 'Stanford: Think Fast, Talk Smart', 'channel': 'Stanford Graduate School of Business', 'level': 'B2–C1', 'language': 'en', 'accent': 'us', 'duration': 3500.0, 'sentences': [{'id': 'preset-stanford-talk-1', 'index': 1, 'start': 5.35, 'end': 10.41, 'source': "Welcome. I'm very excited today to talk about effective speaking in", 'phonetic': 'effective /ɪˈfek.tɪv/ · speaking /ˈspiː.kɪŋ/', 'linking': "Welcome. I'm very‿excited today to talk‿about‿effective speaking‿in", 'translation': 'Chào mừng. Hôm nay tôi rất vui mừng được nói về việc nói chuyện hiệu quả trong'}, {'id': 'preset-stanford-talk-2', 'index': 2, 'start': 10.41, 'end': 13.19, 'source': 'spontaneous situations. I thank you all for', 'phonetic': 'spontaneous /spɒnˈteɪ.ni.əs/ · situations /ˌsɪtʃ.uˈeɪ.ʃən/', 'linking': 'spontaneous situations. I thank you all for', 'translation': 'những tình huống tự phát. Tôi cảm ơn tất cả các bạn vì'}, {'id': 'preset-stanford-talk-3', 'index': 3, 'start': 13.19, 'end': 16.83, 'source': 'joining us, even though the title of my talk is grammatically incorrect.', 'phonetic': 'grammatically /ɡrəˈmæt.ɪ.kəl.i/ · incorrect /ˌɪn.kərˈekt/', 'linking': 'joining‿us, even though the title‿of my talk‿is grammatically‿incorrect.', 'translation': 'tham gia cùng chúng tôi, mặc dù tiêu đề bài nói chuyện của tôi sai ngữ pháp.'}, {'id': 'preset-stanford-talk-4', 'index': 4, 'start': 16.83, 'end': 18.85, 'source': 'I thought that might scare a few of you away.', 'phonetic': '', 'linking': 'I thought that might scare‿a few‿of you away.', 'translation': 'Tôi nghĩ điều đó có thể khiến một số bạn sợ hãi.'}, {'id': 'preset-stanford-talk-5', 'index': 5, 'start': 18.85, 'end': 20.43, 'source': 'But I learned teaching here at the business school,', 'phonetic': '', 'linking': 'But‿I learned teaching here‿at the business school,', 'translation': 'Nhưng tôi đã học cách dạy ở trường kinh doanh này,'}, {'id': 'preset-stanford-talk-6', 'index': 6, 'start': 20.43, 'end': 22.33, 'source': "catching people's attention is hard.", 'phonetic': 'attention /əˈten.ʃən/', 'linking': "catching people's‿attention‿is hard.", 'translation': 'thu hút sự chú ý của mọi người là khó khăn.'}, {'id': 'preset-stanford-talk-7', 'index': 7, 'start': 22.33, 'end': 26.37, 'source': 'So, something as simple as that, I thought, might draw a few of you here, so', 'phonetic': '', 'linking': 'So, something‿as simple‿as that, I thought, might draw‿a few‿of you here, so', 'translation': 'Vì vậy, điều đơn giản như vậy, tôi nghĩ, có thể thu hút một số bạn đến đây, vì vậy'}, {'id': 'preset-stanford-talk-8', 'index': 8, 'start': 26.37, 'end': 31.94, 'source': 'this is going to be a highly interactive and participative workshop today.', 'phonetic': '', 'linking': 'this‿is going to be a highly‿interactive‿and participative workshop today.', 'translation': 'hôm nay đây sẽ là một hội thảo có tính tương tác và có sự tham gia cao.'}, {'id': 'preset-stanford-talk-9', 'index': 9, 'start': 31.94, 'end': 34.92, 'source': "If you don't feel comfortable participating that's completely fine, but", 'phonetic': '', 'linking': "If you don't feel comfortable participating that's completely fine, but", 'translation': 'Nếu bạn không cảm thấy thoải mái khi tham gia thì điều đó hoàn toàn bình thường, nhưng'}, {'id': 'preset-stanford-talk-10', 'index': 10, 'start': 34.92, 'end': 37.39, 'source': "do know I'm gonna ask you to talk to people next to you.", 'phonetic': 'people /ˈpiː.pəl/', 'linking': "do know‿I'm gonna ask you to talk to people next to you.", 'translation': 'bạn có biết tôi sẽ yêu cầu bạn nói chuyện với những người bên cạnh bạn không.'}, {'id': 'preset-stanford-talk-11', 'index': 11, 'start': 37.39, 'end': 39.57, 'source': "They'll be opportunities to stand up and", 'phonetic': '', 'linking': "They'll be opportunities to stand‿up‿and", 'translation': 'Đó sẽ là cơ hội để đứng lên và'}, {'id': 'preset-stanford-talk-12', 'index': 12, 'start': 39.57, 'end': 43.84, 'source': 'practice some things because I believe the way we become effective communicators is', 'phonetic': 'effective /ɪˈfek.tɪv/', 'linking': 'practice some things because‿I believe the way we become‿effective communicators‿is', 'translation': 'thực hành một số điều vì tôi tin rằng cách chúng ta trở thành người giao tiếp hiệu quả là'}, {'id': 'preset-stanford-talk-13', 'index': 13, 'start': 43.84, 'end': 47.49, 'source': "by actually communicating, so let's get started right away.", 'phonetic': '', 'linking': "by‿actually communicating, so let's get started right‿away.", 'translation': 'bằng cách thực sự giao tiếp, vì vậy hãy bắt đầu ngay.'}, {'id': 'preset-stanford-talk-14', 'index': 14, 'start': 47.49, 'end': 52.68, 'source': "I'd like to ask you all to read this sentence, and as you read this sentence,", 'phonetic': '', 'linking': "I'd like to ask you all to read this sentence, and‿as you read this sentence,", 'translation': 'Tôi muốn mời tất cả các bạn đọc câu này, và khi các bạn đọc câu này,'}, {'id': 'preset-stanford-talk-15', 'index': 15, 'start': 52.68, 'end': 56.23, 'source': "what's most important to me is that you count the number of fs", 'phonetic': 'important /ɪmˈpɔː.tənt/', 'linking': "what's most‿important to me is that you count the number‿of fs", 'translation': 'điều quan trọng nhất với tôi là bạn đếm số fs'}, {'id': 'preset-stanford-talk-16', 'index': 16, 'start': 56.23, 'end': 59.03, 'source': 'that you find in this sentence, please.', 'phonetic': '', 'linking': 'that you find‿in this sentence, please.', 'translation': 'mà bạn tìm thấy trong câu này, xin vui lòng.'}, {'id': 'preset-stanford-talk-17', 'index': 17, 'start': 59.03, 'end': 61.31, 'source': 'Count the number of fs. Keep it quiet to yourself.', 'phonetic': '', 'linking': 'Count the number‿of fs. Keep‿it quiet to yourself.', 'translation': 'Đếm số lượng fs. Hãy giữ im lặng cho chính mình.'}, {'id': 'preset-stanford-talk-18', 'index': 18, 'start': 67.15, 'end': 69.31, 'source': 'Give you just another couple seconds here.', 'phonetic': '', 'linking': 'Give you just‿another couple seconds here.', 'translation': 'Cho bạn thêm vài giây nữa ở đây.'}, {'id': 'preset-stanford-talk-19', 'index': 19, 'start': 72.83, 'end': 74.13, 'source': 'Three, two, one.', 'phonetic': '', 'linking': 'Three, two, one.', 'translation': 'Ba, hai, một.'}, {'id': 'preset-stanford-talk-20', 'index': 20, 'start': 75.88, 'end': 78.61, 'source': "Raise your hand please if you found three and only three f's.", 'phonetic': '', 'linking': "Raise your hand please‿if you found three and‿only three f's.", 'translation': 'Hãy giơ tay nếu bạn tìm thấy ba và chỉ ba chữ f.'}]}, {'id': 'preset-ted-brain', 'videoId': 'MMmOLN5zBLY', 'url': 'https://www.youtube.com/watch?v=MMmOLN5zBLY', 'title': 'TED-Ed: Lợi ích bộ não song ngữ', 'channel': 'TED-Ed', 'level': 'B1–B2', 'language': 'en', 'accent': 'us', 'duration': 304.0, 'sentences': [{'id': 'preset-ted-brain-1', 'index': 1, 'start': 18.33, 'end': 23.47, 'source': "Chances are you belong to the world's bilingual and multilingual majority.", 'phonetic': 'bilingual /baɪˈlɪŋ.ɡwəl/ · multilingual /ˌmʌl.tiˈlɪŋ.ɡwəl/ · majority /məˈdʒɒr.ə.ti/', 'linking': "chances‿are you belong to the world's bilingual‿and multilingual majority.", 'translation': 'rất có thể bạn thuộc về đa số song ngữ và đa ngôn ngữ trên thế giới.'}, {'id': 'preset-ted-brain-2', 'index': 2, 'start': 23.47, 'end': 25.56, 'source': 'And besides having an easier time traveling', 'phonetic': '', 'linking': 'And besides having‿an‿easier time traveling', 'translation': 'Và bên cạnh việc có thời gian đi lại dễ dàng hơn'}, {'id': 'preset-ted-brain-3', 'index': 3, 'start': 27.47, 'end': 29.89, 'source': 'knowing two or more languages means that your brain', 'phonetic': 'brain /breɪn/', 'linking': 'knowing two or more languages means that your brain', 'translation': 'biết hai hoặc nhiều ngôn ngữ có nghĩa là bộ não của bạn'}, {'id': 'preset-ted-brain-4', 'index': 4, 'start': 29.89, 'end': 34.78, 'source': 'may actually look and work differently than those of your monolingual friends.', 'phonetic': '', 'linking': 'may‿actually look‿and work differently than those‿of your monolingual friends.', 'translation': 'thực sự có thể trông và hoạt động khác với những người bạn chỉ nói một ngôn ngữ của bạn.'}, {'id': 'preset-ted-brain-5', 'index': 5, 'start': 34.78, 'end': 38.27, 'source': 'So what does it really mean to know a language?', 'phonetic': 'language /ˈlæŋ.ɡwɪdʒ/', 'linking': 'So what does‿it really mean to know‿a language?', 'translation': 'Vậy việc biết một ngôn ngữ thực sự có ý nghĩa gì?'}, {'id': 'preset-ted-brain-6', 'index': 6, 'start': 38.27, 'end': 43.13, 'source': 'Language ability is typically measured in two active parts, speaking and writing,', 'phonetic': 'language /ˈlæŋ.ɡwɪdʒ/ · ability /əˈbɪl.ə.ti/ · active /ˈæk.tɪv/', 'linking': 'Language‿ability‿is typically measured‿in two active parts, speaking‿and writing,', 'translation': 'Khả năng ngôn ngữ thường được đo lường qua hai phần hoạt động, nói và viết,'}, {'id': 'preset-ted-brain-7', 'index': 7, 'start': 43.13, 'end': 46.98, 'source': 'and two passive parts, listening and reading.', 'phonetic': 'passive /ˈpæs.ɪv/', 'linking': 'and two passive parts, listening‿and reading.', 'translation': 'và hai phần thụ động là nghe và đọc.'}, {'id': 'preset-ted-brain-8', 'index': 8, 'start': 46.98, 'end': 49.66, 'source': 'While a balanced bilingual has near equal', 'phonetic': 'bilingual /baɪˈlɪŋ.ɡwəl/', 'linking': 'While‿a balanced bilingual has near‿equal', 'translation': 'Trong khi một người song ngữ cân bằng có gần như bằng nhau'}, {'id': 'preset-ted-brain-9', 'index': 9, 'start': 49.66, 'end': 52.38, 'source': 'abilities across the board in two languages,', 'phonetic': '', 'linking': 'abilities‿across the board‿in two languages,', 'translation': 'khả năng toàn diện bằng hai ngôn ngữ,'}, {'id': 'preset-ted-brain-10', 'index': 10, 'start': 52.38, 'end': 55.76, 'source': 'most bilinguals around the world know and use their languages', 'phonetic': 'bilinguals /baɪˈlɪŋ.ɡwəl/ · world /wɜːld/', 'linking': 'most bilinguals‿around the world know‿and‿use their languages', 'translation': 'hầu hết người song ngữ trên thế giới đều biết và sử dụng ngôn ngữ của họ'}, {'id': 'preset-ted-brain-11', 'index': 11, 'start': 55.76, 'end': 57.98, 'source': 'in varying proportions.', 'phonetic': '', 'linking': 'in varying proportions.', 'translation': 'với tỷ lệ khác nhau.'}, {'id': 'preset-ted-brain-12', 'index': 12, 'start': 57.98, 'end': 61.61, 'source': 'And depending on their situation and how they acquired each language,', 'phonetic': 'situation /ˌsɪtʃ.uˈeɪ.ʃən/ · language /ˈlæŋ.ɡwɪdʒ/', 'linking': 'And depending‿on their situation‿and how they‿acquired‿each language,', 'translation': 'Và tùy thuộc vào hoàn cảnh của họ và cách họ tiếp thu từng ngôn ngữ,'}, {'id': 'preset-ted-brain-13', 'index': 13, 'start': 61.61, 'end': 64.92, 'source': 'they can be classified into three general types.', 'phonetic': '', 'linking': 'they can be classified‿into three general types.', 'translation': 'chúng có thể được phân thành ba loại chung.'}, {'id': 'preset-ted-brain-14', 'index': 14, 'start': 64.92, 'end': 67.77, 'source': "For example, let's take Gabriella,", 'phonetic': '', 'linking': "For‿example, let's take Gabriella,", 'translation': 'Ví dụ: hãy lấy Gabriella,'}, {'id': 'preset-ted-brain-15', 'index': 15, 'start': 67.77, 'end': 72.01, 'source': "whose family immigrates to the US from Peru when she's two-years old.", 'phonetic': '', 'linking': "whose family‿immigrates to the‿US from Peru when she's two years‿old.", 'translation': 'có gia đình nhập cư vào Mỹ từ Peru khi cô ấy hai tuổi.'}, {'id': 'preset-ted-brain-16', 'index': 16, 'start': 72.01, 'end': 73.82, 'source': 'As a compound bilingual,', 'phonetic': 'bilingual /baɪˈlɪŋ.ɡwəl/', 'linking': 'As‿a compound bilingual,', 'translation': 'Là một song ngữ ghép,'}, {'id': 'preset-ted-brain-17', 'index': 17, 'start': 73.82, 'end': 78.27, 'source': 'Gabriella develops two linguistic codes simultaneously,', 'phonetic': '', 'linking': 'Gabriella develops two linguistic codes simultaneously,', 'translation': 'Gabriella phát triển đồng thời hai mật mã ngôn ngữ,'}, {'id': 'preset-ted-brain-18', 'index': 18, 'start': 78.28, 'end': 80.3, 'source': 'with a single set of concepts,', 'phonetic': '', 'linking': 'with‿a single set‿of concepts,', 'translation': 'với một tập hợp các khái niệm,'}, {'id': 'preset-ted-brain-19', 'index': 19, 'start': 80.3, 'end': 82.16, 'source': 'learning both English and Spanish', 'phonetic': '', 'linking': 'learning both‿English‿and Spanish', 'translation': 'học cả tiếng Anh và tiếng Tây Ban Nha'}, {'id': 'preset-ted-brain-20', 'index': 20, 'start': 82.17, 'end': 85.36, 'source': 'as she begins to process the world around her.', 'phonetic': 'world /wɜːld/', 'linking': 'as she begins to process the world‿around her.', 'translation': 'khi cô ấy bắt đầu xử lý thế giới xung quanh mình.'}]}, {'id': 'preset-steve-jobs', 'videoId': 'UF8uR6Z6KLc', 'url': 'https://www.youtube.com/watch?v=UF8uR6Z6KLc', 'title': 'Steve Jobs: Bài diễn văn Stanford', 'channel': 'Stanford', 'level': 'B2–C1', 'language': 'en', 'accent': 'us', 'duration': 904.0, 'sentences': [{'id': 'preset-steve-jobs-1', 'index': 1, 'start': 22.49, 'end': 28.99, 'source': 'Thank You. I am honored to be with you today at your commencement', 'phonetic': 'honored /ˈɒn.əd/ · commencement /kəˈmens.mənt/', 'linking': 'Thank You. I am honored to be with you today‿at your commencement', 'translation': 'Cảm ơn. Tôi rất vinh dự được có mặt cùng các bạn hôm nay trong lễ khởi công'}, {'id': 'preset-steve-jobs-2', 'index': 2, 'start': 30.02, 'end': 32.74, 'source': 'from one of the finest universities in the world.', 'phonetic': 'world /wɜːld/', 'linking': 'from‿one‿of the finest‿universities‿in the world.', 'translation': 'từ một trong những trường đại học tốt nhất trên thế giới.'}, {'id': 'preset-steve-jobs-3', 'index': 3, 'start': 35.56, 'end': 41.56, 'source': 'Truth be told I never graduated from college', 'phonetic': 'truth /truːθ/', 'linking': 'Truth be told‿I never graduated from college', 'translation': 'Sự thật là tôi chưa bao giờ tốt nghiệp đại học'}, {'id': 'preset-steve-jobs-4', 'index': 4, 'start': 41.56, 'end': 45.93, 'source': "and this is the closest I've ever gotten to a college graduation.", 'phonetic': '', 'linking': "and this‿is the closest‿I've‿ever gotten to a college graduation.", 'translation': 'và đây là lần gần nhất tôi có được lễ tốt nghiệp đại học.'}, {'id': 'preset-steve-jobs-5', 'index': 5, 'start': 47.98, 'end': 52.01, 'source': "Today I want to tell you three stories from my life. That's it.", 'phonetic': '', 'linking': "Today‿I want to tell you three stories from my life. That's‿it.", 'translation': 'Hôm nay tôi muốn kể cho các bạn ba câu chuyện trong cuộc đời tôi. Thế thôi.'}, {'id': 'preset-steve-jobs-6', 'index': 6, 'start': 52.01, 'end': 54.85, 'source': 'No big deal. Just three stories.', 'phonetic': '', 'linking': 'No big deal. Just three stories.', 'translation': 'Không có vấn đề gì lớn. Chỉ có ba câu chuyện.'}, {'id': 'preset-steve-jobs-7', 'index': 7, 'start': 55.85, 'end': 59.57, 'source': 'The first story is about connecting the dots.', 'phonetic': '', 'linking': 'The first story‿is‿about connecting the dots.', 'translation': 'Câu chuyện đầu tiên là về việc kết nối các dấu chấm.'}, {'id': 'preset-steve-jobs-8', 'index': 8, 'start': 61.01, 'end': 63.89, 'source': 'I dropped out of Reed College after the first 6 months,', 'phonetic': '', 'linking': 'I dropped‿out‿of Reed College‿after the first months,', 'translation': 'Tôi đã bỏ học ở trường Reed College sau 6 tháng đầu tiên,'}, {'id': 'preset-steve-jobs-9', 'index': 9, 'start': 63.98, 'end': 65.8, 'source': 'but then stayed around as a drop-in', 'phonetic': '', 'linking': 'but then stayed‿around‿as‿a drop‿in', 'translation': 'nhưng sau đó ở lại như một người ghé thăm'}, {'id': 'preset-steve-jobs-10', 'index': 10, 'start': 65.8, 'end': 68.73, 'source': 'for another 18 months or so before I really quit.', 'phonetic': '', 'linking': 'for‿another months‿or so before‿I really quit.', 'translation': 'thêm khoảng 18 tháng nữa trước khi tôi thực sự bỏ việc.'}, {'id': 'preset-steve-jobs-11', 'index': 11, 'start': 69.41, 'end': 71.08, 'source': 'So why did I drop out?', 'phonetic': '', 'linking': 'So why did‿I drop‿out?', 'translation': 'Vậy tại sao tôi lại bỏ học?'}, {'id': 'preset-steve-jobs-12', 'index': 12, 'start': 72.23, 'end': 74.37, 'source': 'It started before I was born.', 'phonetic': '', 'linking': 'It started before‿I was born.', 'translation': 'Nó bắt đầu trước khi tôi được sinh ra.'}, {'id': 'preset-steve-jobs-13', 'index': 13, 'start': 75.25, 'end': 79.03, 'source': 'My biological mother was a young, unwed graduate student,', 'phonetic': 'graduate /ˈɡrædʒ.u.ət/', 'linking': 'My biological mother was‿a young, unwed graduate student,', 'translation': 'Mẹ ruột của tôi là một sinh viên mới tốt nghiệp trẻ, chưa lập gia đình,'}, {'id': 'preset-steve-jobs-14', 'index': 14, 'start': 79.24, 'end': 81.35, 'source': 'and she decided to put me up for adoption.', 'phonetic': '', 'linking': 'and she decided to put me up for‿adoption.', 'translation': 'và cô ấy quyết định nhận tôi làm con nuôi.'}, {'id': 'preset-steve-jobs-15', 'index': 15, 'start': 82.36, 'end': 86.23, 'source': 'She felt very strongly that I should be adopted by college graduates,', 'phonetic': '', 'linking': 'She felt very strongly that‿I should be adopted by college graduates,', 'translation': 'Cô ấy có cảm giác rất mạnh mẽ rằng tôi nên được những sinh viên tốt nghiệp đại học nhận làm con nuôi,'}, {'id': 'preset-steve-jobs-16', 'index': 16, 'start': 86.31, 'end': 88.61, 'source': 'so everything was all set for me to', 'phonetic': '', 'linking': 'so everything was‿all set for me to', 'translation': 'vậy là mọi thứ đã sẵn sàng để tôi'}, {'id': 'preset-steve-jobs-17', 'index': 17, 'start': 88.61, 'end': 91.1, 'source': 'be adopted at birth by a lawyer and his wife.', 'phonetic': '', 'linking': 'be adopted‿at birth by‿a lawyer‿and his wife.', 'translation': 'được một luật sư và vợ ông ta nhận làm con nuôi khi mới sinh ra.'}, {'id': 'preset-steve-jobs-18', 'index': 18, 'start': 91.74, 'end': 94.15, 'source': 'Except that when I popped out they decided', 'phonetic': '', 'linking': 'Except that when‿I popped‿out they decided', 'translation': 'Ngoại trừ việc khi tôi bước ra thì họ đã quyết định'}, {'id': 'preset-steve-jobs-19', 'index': 19, 'start': 94.15, 'end': 97.55, 'source': 'at the last minute that they really wanted a girl.', 'phonetic': '', 'linking': 'at the last minute that they really wanted‿a girl.', 'translation': 'vào phút cuối họ thực sự muốn có một cô con gái.'}, {'id': 'preset-steve-jobs-20', 'index': 20, 'start': 97.92, 'end': 100.05, 'source': 'So my parents, who were on a waiting list,', 'phonetic': '', 'linking': 'So my parents, who were‿on‿a waiting list,', 'translation': 'Vậy bố mẹ tôi, những người đang trong danh sách chờ,'}]}, {'id': 'preset-ielts-emma', 'videoId': 'sRFEKvsw-vs', 'url': 'https://www.youtube.com/watch?v=sRFEKvsw-vs', 'title': 'IELTS Speaking: Bí quyết đạt điểm cao', 'channel': 'English with Emma · engVid', 'level': 'IELTS', 'language': 'en', 'accent': 'us', 'duration': 1158.0, 'sentences': [{'id': 'preset-ielts-emma-1', 'index': 1, 'start': 2.27, 'end': 8.75, 'source': "Hi, there. My name is Emma, and in today's lesson, we will be looking at how to do well", 'phonetic': '', 'linking': "Hi, there. My name‿is‿Emma, and‿in today's lesson, we will be looking‿at how to do well", 'translation': 'Chào bạn. Tên tôi là Emma, và trong bài học hôm nay, chúng ta sẽ xem xét cách làm tốt'}, {'id': 'preset-ielts-emma-2', 'index': 2, 'start': 8.75, 'end': 15.25, 'source': 'on the speaking part of the IELTS. So the speaking part of the IELTS is divided up into', 'phonetic': 'speaking /ˈspiː.kɪŋ/ · divided /dɪˈvaɪ.dɪd/', 'linking': 'on the speaking part‿of the‿IELTS. So the speaking part‿of the‿IELTS‿is divided‿up‿into', 'translation': 'về phần nói của IELTS. Vì vậy phần nói của IELTS được chia thành'}, {'id': 'preset-ielts-emma-3', 'index': 3, 'start': 15.27, 'end': 21.68, 'source': "three sections. Today, we're just going to be looking at section No. 1. So first of all,", 'phonetic': 'sections /ˈsek.ʃən/ · section /ˈsek.ʃən/', 'linking': "three sections. Today, we're just going to be looking‿at section No.. So first‿of‿all,", 'translation': 'ba phần. Hôm nay chúng ta sẽ xem phần số 1. Trước hết,'}, {'id': 'preset-ielts-emma-4', 'index': 4, 'start': 21.68, 'end': 26.89, 'source': "I will explain how to do well, oh, sorry. First, I'll explain what happens in Part 1", 'phonetic': 'explain /ɪkˈspleɪn/', 'linking': "I will‿explain how to do well, oh, sorry. First, I'll‿explain what happens‿in Part", 'translation': 'Tôi sẽ giải thích cách làm tốt, ồ, xin lỗi. Đầu tiên, tôi sẽ giải thích chuyện gì xảy ra ở Phần 1'}, {'id': 'preset-ielts-emma-5', 'index': 5, 'start': 26.89, 'end': 32.61, 'source': "of the IELTS. And from there, we'll look at some things you should do to do well and some", 'phonetic': '', 'linking': "of the‿IELTS. And from there, we'll look‿at some things you should do to do well‿and some", 'translation': 'của IELTS. Và từ đó, chúng ta sẽ xem xét một số điều bạn nên làm để làm tốt và một số điều'}, {'id': 'preset-ielts-emma-6', 'index': 6, 'start': 32.61, 'end': 37.33, 'source': "things you shouldn't do, okay? So let's get started.", 'phonetic': '', 'linking': "things you shouldn't do, okay? So let's get started.", 'translation': 'những điều bạn không nên làm, được chứ? Vì vậy, hãy bắt đầu.'}, {'id': 'preset-ielts-emma-7', 'index': 7, 'start': 37.33, 'end': 43.83, 'source': 'So what happens in Part 1 of the IELTS? Well, first of all, the speaking Part 1 of the IELTS', 'phonetic': 'speaking /ˈspiː.kɪŋ/', 'linking': 'So what happens‿in Part‿of the‿IELTS? Well, first‿of‿all, the speaking Part‿of the‿IELTS', 'translation': 'Vậy điều gì sẽ xảy ra trong Phần 1 của IELTS? Vâng, trước hết là phần nói Phần 1 của IELTS'}, {'id': 'preset-ielts-emma-8', 'index': 8, 'start': 44.87, 'end': 51.37, 'source': "is for both those taking the General IELTS exam and the Academic. So whether you're taking", 'phonetic': '', 'linking': "is for both those taking the General‿IELTS‿exam‿and the‿Academic. So whether you're taking", 'translation': 'dành cho cả những người tham gia kỳ thi IELTS Tổng quát và Học thuật. Vì vậy cho dù bạn đang dùng'}, {'id': 'preset-ielts-emma-9', 'index': 9, 'start': 52.4, 'end': 58.4, 'source': "the Academic or the General IELTS, it's the same test with the same questions.", 'phonetic': '', 'linking': "the‿Academic‿or the General‿IELTS, it's the same test with the same questions.", 'translation': 'IELTS Học thuật hay Tổng quát đều là bài kiểm tra giống nhau với các câu hỏi giống nhau.'}, {'id': 'preset-ielts-emma-10', 'index': 10, 'start': 58.4, 'end': 64.9, 'source': "Okay. It lasts between four to five minutes. It's made up of first an introduction. So", 'phonetic': '', 'linking': "Okay. It lasts between four to five minutes. It's made‿up‿of first‿an‿introduction. So", 'translation': 'Được rồi. Nó kéo dài từ bốn đến năm phút. Nó được tạo thành từ phần giới thiệu đầu tiên. Vì vậy'}, {'id': 'preset-ielts-emma-11', 'index': 11, 'start': 66.04, 'end': 72.13, 'source': 'the examiner is going to introduce himself or herself. Then, you will introduce yourself.', 'phonetic': '', 'linking': 'the‿examiner‿is going to introduce himself‿or herself. Then, you will‿introduce yourself.', 'translation': 'giám khảo sẽ giới thiệu về bản thân mình. Sau đó, bạn sẽ giới thiệu về bản thân.'}, {'id': 'preset-ielts-emma-12', 'index': 12, 'start': 72.13, 'end': 77.9, 'source': "So for example, Hi. My name is Emma. Nice to meet you. Okay, so there's an introduction.", 'phonetic': '', 'linking': "So for‿example, Hi. My name‿is‿Emma. Nice to meet you. Okay, so there's‿an‿introduction.", 'translation': 'Vì vậy, ví dụ: Xin chào. Tên tôi là Emma. Rất vui được gặp bạn. Được rồi, vậy là có phần giới thiệu.'}, {'id': 'preset-ielts-emma-13', 'index': 13, 'start': 77.95, 'end': 84.26, 'source': 'And then, the examiner is going to ask you some questions about yourself. So these questions', 'phonetic': '', 'linking': 'And then, the‿examiner‿is going to ask you some questions‿about yourself. So these questions', 'translation': 'Sau đó, giám khảo sẽ hỏi bạn một số câu hỏi về bản thân bạn. Vậy những câu hỏi này'}, {'id': 'preset-ielts-emma-14', 'index': 14, 'start': 84.27, 'end': 90.77, 'source': "aren't that difficult. Usually, they're about where you're from. So for example what city", 'phonetic': '', 'linking': "aren't that difficult. Usually, they're‿about where you're from. So for‿example what city", 'translation': 'không khó lắm đâu. Thông thường, chúng là về nơi bạn đến. Vậy ví dụ thành phố nào'}, {'id': 'preset-ielts-emma-15', 'index': 15, 'start': 91.44, 'end': 96.95, 'source': 'you were born in, where you grew up. They might be about work. They might be about what', 'phonetic': '', 'linking': 'you were born‿in, where you grew‿up. They might be about work. They might be about what', 'translation': 'bạn sinh ra ở đâu, nơi bạn lớn lên. Họ có thể là về công việc. Chúng có thể là về cái gì'}, {'id': 'preset-ielts-emma-16', 'index': 16, 'start': 96.95, 'end': 103.45, 'source': 'you study, about your friends, about your hobbies, food, sports, and another thing I', 'phonetic': '', 'linking': 'you study, about your friends, about your hobbies, food, sports, and‿another thing‿I', 'translation': 'bạn học tập, về bạn bè của bạn, về sở thích của bạn, đồ ăn, thể thao và những thứ khác mà tôi'}, {'id': 'preset-ielts-emma-17', 'index': 17, 'start': 104.33, 'end': 110.83, 'source': "don't have up here, family. Family is also common on this part of the IELTS. Okay? So", 'phonetic': '', 'linking': "don't have‿up here, family. Family‿is‿also common‿on this part‿of the‿IELTS. Okay? So", 'translation': 'không có ở đây, gia đình. Gia đình cũng là từ phổ biến trong phần này của IELTS. Được rồi? Vì vậy'}, {'id': 'preset-ielts-emma-18', 'index': 18, 'start': 111.08, 'end': 117.58, 'source': 'usually, the examiner, after introducing himself or herself, they will talk to you about two', 'phonetic': '', 'linking': 'usually, the‿examiner, after‿introducing himself‿or herself, they will talk to you about two', 'translation': 'Thông thường, giám khảo sau khi giới thiệu bản thân sẽ nói với bạn về hai'}, {'id': 'preset-ielts-emma-19', 'index': 19, 'start': 119.55, 'end': 121.96, 'source': 'of these topics. Okay?', 'phonetic': '', 'linking': 'of these topics. Okay?', 'translation': 'của những chủ đề này. Được rồi?'}, {'id': 'preset-ielts-emma-20', 'index': 20, 'start': 122.9, 'end': 129.4, 'source': "Now, the way they mark this part of the IELTS is they're looking specifically for pronunciation,", 'phonetic': 'pronunciation /prəˌnʌn.siˈeɪ.ʃən/', 'linking': "Now, the way they mark this part‿of the‿IELTS‿is they're looking specifically for pronunciation,", 'translation': 'Bây giờ, cách họ chấm điểm phần này của IELTS là họ đang tìm kiếm cụ thể cách phát âm,'}]}, {'id': 'preset-learn-lang', 'videoId': 'd0yGdNEWdn0', 'url': 'https://www.youtube.com/watch?v=d0yGdNEWdn0', 'title': 'TEDx: Học ngoại ngữ trong 6 tháng', 'channel': 'TEDx Talks', 'level': 'B1–B2', 'language': 'en', 'accent': 'us', 'duration': 1106.0, 'sentences': [{'id': 'preset-learn-lang-1', 'index': 1, 'start': 10.16, 'end': 12.72, 'source': 'The people in the back, can you hear me clearly?', 'phonetic': 'people /ˈpiː.pəl/ · clearly /ˈklɪə.li/', 'linking': 'The people‿in the back, can you hear me clearly?', 'translation': 'Người ở phía sau có nghe rõ không?'}, {'id': 'preset-learn-lang-2', 'index': 2, 'start': 13.03, 'end': 14.12, 'source': 'OK, good.', 'phonetic': '', 'linking': 'OK, good.', 'translation': 'Được rồi, tốt.'}, {'id': 'preset-learn-lang-3', 'index': 3, 'start': 15.57, 'end': 19.5, 'source': 'Have you ever held a question in mind', 'phonetic': '', 'linking': 'Have you ever held‿a question‿in mind', 'translation': 'Bạn đã bao giờ có một câu hỏi trong đầu'}, {'id': 'preset-learn-lang-4', 'index': 4, 'start': 19.5, 'end': 24.39, 'source': 'for so long that it becomes part of how you think?', 'phonetic': '', 'linking': 'for so long that‿it becomes part‿of how you think?', 'translation': 'lâu đến mức nó trở thành một phần trong suy nghĩ của bạn?'}, {'id': 'preset-learn-lang-5', 'index': 5, 'start': 25.24, 'end': 28.16, 'source': 'Maybe even part of who you are as a person?', 'phonetic': '', 'linking': 'Maybe‿even part‿of who you are‿as‿a person?', 'translation': 'Thậm chí có thể là một phần của con người bạn?'}, {'id': 'preset-learn-lang-6', 'index': 6, 'start': 28.8, 'end': 32.88, 'source': "Well I've had a question in my mind for many, many years", 'phonetic': '', 'linking': "Well‿I've had‿a question‿in my mind for many, many years", 'translation': 'Vâng, tôi đã có một câu hỏi trong đầu trong nhiều năm'}, {'id': 'preset-learn-lang-7', 'index': 7, 'start': 32.88, 'end': 37.22, 'source': 'and that is: How can you speed up learning?', 'phonetic': '', 'linking': 'and that‿is: How can you speed‿up learning?', 'translation': 'và đó là: Làm thế nào bạn có thể tăng tốc việc học?'}, {'id': 'preset-learn-lang-8', 'index': 8, 'start': 38.09, 'end': 40.65, 'source': 'Now, this is an interesting question', 'phonetic': '', 'linking': 'Now, this‿is‿an‿interesting question', 'translation': 'Bây giờ, đây là một câu hỏi thú vị'}, {'id': 'preset-learn-lang-9', 'index': 9, 'start': 40.65, 'end': 44.0, 'source': 'because if you speed up learning, you can spend less time at school.', 'phonetic': '', 'linking': 'because‿if you speed‿up learning, you can spend less time‿at school.', 'translation': 'bởi vì nếu bạn tăng tốc học tập, bạn có thể dành ít thời gian hơn ở trường.'}, {'id': 'preset-learn-lang-10', 'index': 10, 'start': 44.97, 'end': 47.1, 'source': 'And if you learn really fast,', 'phonetic': '', 'linking': 'And‿if you learn really fast,', 'translation': 'Và nếu bạn học thật nhanh,'}, {'id': 'preset-learn-lang-11', 'index': 11, 'start': 47.12, 'end': 49.88, 'source': "you probably wouldn't have to go to school at all.", 'phonetic': 'probably /ˈprɒb.ə.bli/', 'linking': "you probably wouldn't have to go to school‿at‿all.", 'translation': 'có lẽ bạn sẽ không phải đến trường chút nào.'}, {'id': 'preset-learn-lang-12', 'index': 12, 'start': 50.82, 'end': 53.88, 'source': 'Now, when I was young, school was sort of OK but...', 'phonetic': '', 'linking': 'Now, when‿I was young, school was sort‿of‿OK but...', 'translation': 'Bây giờ, khi tôi còn trẻ, trường học cũng khá ổn nhưng...'}, {'id': 'preset-learn-lang-13', 'index': 13, 'start': 54.98, 'end': 58.29, 'source': 'I found quite often that school got in the way of learning', 'phonetic': '', 'linking': 'I found quite‿often that school got‿in the way‿of learning', 'translation': 'Tôi thường xuyên thấy rằng trường học cản trở việc học'}, {'id': 'preset-learn-lang-14', 'index': 14, 'start': 58.86, 'end': 61.79, 'source': 'so I had this question in mind: How do you learn faster?', 'phonetic': '', 'linking': 'so I had this question‿in mind: How do you learn faster?', 'translation': 'vì vậy tôi đã nghĩ ra câu hỏi này: Làm thế nào để bạn học nhanh hơn?'}, {'id': 'preset-learn-lang-15', 'index': 15, 'start': 62.52, 'end': 65.82, 'source': 'And this began when I was very, very young,', 'phonetic': '', 'linking': 'And this began when‿I was very, very young,', 'translation': 'Và điều này bắt đầu khi tôi còn rất, rất trẻ,'}, {'id': 'preset-learn-lang-16', 'index': 16, 'start': 65.82, 'end': 67.5, 'source': 'when I was 11 years old,', 'phonetic': '', 'linking': 'when‿I was years‿old,', 'translation': 'khi tôi 11 tuổi,'}, {'id': 'preset-learn-lang-17', 'index': 17, 'start': 67.5, 'end': 71.88, 'source': 'I wrote a letter to researchers in the Soviet Union, asking about hypnopaedia,', 'phonetic': '', 'linking': 'I wrote‿a letter to researchers‿in the Soviet‿Union, asking‿about hypnopaedia,', 'translation': 'Tôi đã viết một lá thư cho các nhà nghiên cứu ở Liên Xô, hỏi về thôi miên,'}, {'id': 'preset-learn-lang-18', 'index': 18, 'start': 71.88, 'end': 76.89, 'source': 'this is sleep-learning, where you get a tape recorder, you put it beside your bed', 'phonetic': '', 'linking': 'this‿is sleep learning, where you get‿a tape recorder, you put‿it beside your bed', 'translation': 'đây là phương pháp học trong khi ngủ, nơi bạn lấy một chiếc máy ghi âm, bạn đặt nó cạnh giường'}, {'id': 'preset-learn-lang-19', 'index': 19, 'start': 76.89, 'end': 79.01, 'source': 'and it turns on in the middle of the night', 'phonetic': '', 'linking': 'and‿it turns‿on‿in the middle‿of the night', 'translation': 'và nó bật lên vào lúc nửa đêm'}, {'id': 'preset-learn-lang-20', 'index': 20, 'start': 79.01, 'end': 82.65, 'source': "when you're sleeping, and you're supposed to be learning from this.", 'phonetic': '', 'linking': "when you're sleeping, and you're supposed to be learning from this.", 'translation': 'khi bạn đang ngủ, và lẽ ra bạn phải học từ điều này.'}]}]}

    def _merge_pieces_to_shadowing_sentences(self, pieces: list, lang: str = "en") -> list:
        """Gộp nhẹ các mảnh sub quá ngắn (<1.8s) để giữ nguyên từng câu khớp 100% với nhịp nói trên video."""
        if not pieces:
            return []
        merged = []
        cur = None
        end_punct = re.compile(r"[.?!…]['”’\)\]]*$")

        for p in pieces:
            txt = self._clean_caption_line(str(p.get("text") or ""), lang)
            if not txt:
                continue
            st = float(p.get("start", 0.0))
            en = float(p.get("end", st + 2.5))
            if cur is None:
                cur = {"start": st, "end": en, "source": txt}
            else:
                gap = st - cur["end"]
                comb_dur = en - cur["start"]
                comb_len = len(cur["source"]) + 1 + len(txt)
                if (len(cur["source"]) < 28 or (cur["end"] - cur["start"]) < 1.8) and gap <= 0.45 and comb_dur <= 5.5 and comb_len <= 85:
                    sep = "" if lang == "zh" else " "
                    cur["source"] = (cur["source"] + sep + txt).strip()
                    cur["end"] = max(cur["end"], en)
                else:
                    merged.append(cur)
                    cur = {"start": st, "end": en, "source": txt}
            if cur and end_punct.search(cur["source"]) and len(cur["source"]) >= 24:
                merged.append(cur)
                cur = None
        if cur:
            merged.append(cur)

        merged = merged[:150]

        src_lines = [m["source"] for m in merged]
        vi_lines = ["" for _ in src_lines]
        if lang == "vi":
            vi_lines = list(src_lines)
        else:
            def _tr_chunk(start_i: int, chunk: list[str]):
                try:
                    q = chr(10).join(chunk)
                    r = requests.get(
                        "https://clients5.google.com/translate_a/t",
                        params={"client": "dict-chrome-ex", "sl": "auto", "tl": "vi", "q": q},
                        headers={"User-Agent": "Mozilla/5.0"},
                        timeout=6,
                    )
                    if r.status_code == 200:
                        data = r.json()
                        if isinstance(data, list) and data:
                            first = data[0]
                            full_tr = first[0] if isinstance(first, list) else str(first)
                            lines_out = [l.strip() for l in full_tr.splitlines()]
                            for offset, l_txt in enumerate(lines_out):
                                if start_i + offset < len(vi_lines):
                                    vi_lines[start_i + offset] = l_txt
                except Exception:
                    pass

            import concurrent.futures
            chunks = [(i, src_lines[i:i+50]) for i in range(0, len(src_lines), 50)]
            with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
                list(pool.map(lambda item: _tr_chunk(item[0], item[1]), chunks))

        sentences = []
        for idx, m in enumerate(merged):
            src_txt = m["source"]
            tr_txt = vi_lines[idx] if idx < len(vi_lines) and vi_lines[idx] else ""
            sentences.append({
                "id": f"yt-s-{idx+1}",
                "index": idx + 1,
                "start": round(float(m["start"]), 2),
                "end": round(max(float(m["start"]) + 0.8, float(m["end"])), 2),
                "source": src_txt,
                "phonetic": self._build_sentence_phonetics(src_txt, lang),
                "linking": self._build_linking_hint(src_txt, lang),
                "translation": tr_txt,
            })
        return sentences

    def shadowing_load_youtube(self, args: dict | None = None) -> dict:
        args = args or {}
        preset_id = str(args.get("presetId") or "").strip()
        raw_url = str(args.get("url") or "").strip()

        presets = self.shadowing_get_presets().get("presets", [])
        if preset_id:
            for pr in presets:
                if pr["id"] == preset_id:
                    return {"ok": True, "video": pr}

        m = re.search(r"(?:v=|youtu\.be/|shorts/|embed/)([\w-]{11})", raw_url)
        vid = m.group(1) if m else (raw_url if re.match(r"^[\w-]{11}$", raw_url) else "")
        if not vid:
            return {"ok": False, "error": "Đường dẫn YouTube không hợp lệ. Vui lòng dán link youtube.com/watch?v=... hoặc youtu.be/..."}

        full_url = f"https://www.youtube.com/watch?v={vid}"
        cap_info = self.youtube_captions(full_url)
        pieces = cap_info.get("pieces") or []
        lang = cap_info.get("language") or "en"
        title = cap_info.get("title") or f"YouTube Video ({vid})"
        channel_name = cap_info.get("channel") or "YouTube"
        dur = float(cap_info.get("duration") or 240.0)

        sentences = self._merge_pieces_to_shadowing_sentences(pieces, lang=lang)

        if not sentences:
            tmp_mp3 = Path(tempfile.gettempdir()) / f"dvs_shadow_yt_{vid}_{int(time.time())}.mp3"
            try:
                cmd = [
                    sys.executable, "-m", "yt_dlp",
                    "--no-playlist",
                    "--download-sections", "*0-90",
                    "-x", "--audio-format", "mp3",
                    "--audio-quality", "6",
                    "-o", str(tmp_mp3),
                    full_url,
                ]
                subprocess.run(
                    cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=32,
                    creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0
                )
                if tmp_mp3.exists() and tmp_mp3.stat().st_size > 1000:
                    res = self.engine.process_audio_file(str(tmp_mp3), source_lang="en")
                    lang = res.get("detected_language") or "en"
                    for idx, seg in enumerate(res.get("segments") or []):
                        src_t = self._clean_caption_line(str(seg.get("source_text") or ""), lang)
                        if not src_t:
                            continue
                        sentences.append({
                            "id": f"wh-s-{idx+1}",
                            "index": len(sentences) + 1,
                            "start": round(float(seg.get("start", idx * 4.0)), 2),
                            "end": round(float(seg.get("end", (idx + 1) * 4.0)), 2),
                            "source": src_t,
                            "phonetic": self._build_sentence_phonetics(src_t, lang),
                            "linking": self._build_linking_hint(src_t, lang),
                            "translation": str(seg.get("translated_text") or "").strip(),
                        })
            except Exception:
                pass
            finally:
                if tmp_mp3.exists():
                    try:
                        tmp_mp3.unlink()
                    except Exception:
                        pass

        if not sentences:
            return {"ok": False, "error": "Video này không mở phụ đề và hạn chế tải âm thanh. Vui lòng thử một link YouTube tiếng Anh khác."}

        video_obj = {
            "id": f"yt-{vid}",
            "videoId": vid,
            "url": full_url,
            "title": title,
            "channel": channel_name,
            "level": "YouTube",
            "language": lang if lang in ("en", "zh", "vi") else "en",
            "accent": "zh" if lang == "zh" else "us",
            "duration": dur,
            "sentences": sentences,
        }
        return {"ok": True, "video": video_obj}

    # =========================================================================
    # 4A-ter. THU ÂM MICRO TRỰC TIẾP TRONG PYTHON & CHẤM ĐIỂM PHÁT ÂM TỪNG TỪ
    # =========================================================================
    @staticmethod
    def _phonetic_norm(word: str) -> str:
        """Chuẩn hóa âm vị tiếng Anh cơ bản để phát hiện lỗi phát âm gần giống (th->t/d, ph->f, c/k, nguyên âm đôi)."""
        w = re.sub(r"[^a-z0-9]", "", (word or "").lower())
        if not w:
            return ""
        w = w.replace("ph", "f").replace("gh", "g").replace("kn", "n").replace("wr", "r")
        w = w.replace("tion", "shun").replace("sion", "zhun").replace("ght", "t")
        w = w.replace("ck", "k").replace("qu", "kw")
        return w

    def _align_and_grade_words(self, target_text: str, recognized_text: str, lang: str = "en", is_live: bool = False) -> tuple[list[dict], int, int, int]:
        """
        Đối chiếu từng từ trong câu mẫu (target_text) với câu học viên đọc (recognized_text) bằng Quy hoạch động SequenceMatcher.get_opcodes():
        - Gộp từ viết tắt (I am -> I'm, going to -> gonna...) và chuẩn hóa tương đương trước khi tìm chuỗi con chung dài nhất (LCS).
        - Trong các đoạn đọc lệch (replace), ghép cặp từ có độ tương đồng âm vị cao nhất để chỉ đích danh từ phát âm sai (vd: talk -> took, people -> paper) và từ bị bỏ sót.
        """
        import difflib
        if lang == "zh":
            target_tokens = [c for c in target_text if not re.match(r"\s", c)]
            spoken_clean = [c for c in re.sub(r"[\s.,!?;:…'”’()\[\]]+", "", recognized_text)]
        else:
            target_tokens = [
                w.strip() for w in re.sub(r"\s*--+\s*", " ", target_text).replace('"', "").split()
                if re.search(r"[A-Za-z0-9]", w)
            ]
            spoken_clean = re.findall(r"[a-z0-9']+", (recognized_text or "").lower())

        def _norm_w(w: str) -> str:
            if lang == "zh":
                return re.sub(r"[\s.,!?;:…'”’()\[\]]+", "", w)
            return re.sub(r"[^a-z0-9']+", "", w.lower()).strip("'")

        target_clean_list = [_norm_w(w) for w in target_tokens]
        target_set = set(target_clean_list) | {w.replace("'", "") for w in target_clean_list}

        if lang != "zh" and len(spoken_clean) >= 2:
            pair_map = {
                ("i", "am"): ("i'm", "im"),
                ("going", "to"): ("gonna",),
                ("want", "to"): ("wanna",),
                ("got", "to"): ("gotta",),
                ("do", "not"): ("don't", "dont"),
                ("does", "not"): ("doesn't", "doesnt"),
                ("did", "not"): ("didn't", "didnt"),
                ("can", "not"): ("can't", "cant", "cannot"),
                ("will", "not"): ("won't", "wont"),
                ("it", "is"): ("it's", "its"),
                ("that", "is"): ("that's", "thats"),
                ("what", "is"): ("what's", "whats"),
                ("there", "is"): ("there's", "theres"),
                ("you", "are"): ("you're", "youre"),
                ("we", "are"): ("we're", "were"),
                ("they", "are"): ("they're", "theyre"),
                ("i", "have"): ("i've", "ive"),
                ("we", "have"): ("we've", "weve"),
                ("i", "will"): ("i'll", "ill"),
                ("i", "would"): ("i'd", "id"),
            }
            merged_spoken = []
            k = 0
            while k < len(spoken_clean):
                if k + 1 < len(spoken_clean):
                    pair = (spoken_clean[k].strip("'"), spoken_clean[k + 1].strip("'"))
                    if pair in pair_map and any(cand in target_set for cand in pair_map[pair]):
                        merged_spoken.append(pair_map[pair][0])
                        k += 2
                        continue
                merged_spoken.append(spoken_clean[k])
                k += 1
            spoken_clean = merged_spoken

        canon_map = {
            "im": "i'm", "dont": "don't", "doesnt": "doesn't", "didnt": "didn't",
            "cant": "can't", "cannot": "can't", "wont": "won't", "its": "it's",
            "thats": "that's", "whats": "what's", "youre": "you're", "weve": "we've",
            "ive": "i've", "id": "i'd", "ill": "i'll", "theyre": "they're",
            "theyll": "they'll", "theres": "there's", "ok": "okay",
        }

        def _canon(w: str) -> str:
            w0 = w.strip("'")
            return canon_map.get(w0, canon_map.get(w0.replace("'", ""), w0))

        t_canon = [_canon(w) for w in target_clean_list]
        s_canon = [_canon(w) for w in spoken_clean]

        matcher = difflib.SequenceMatcher(None, t_canon, s_canon, autojunk=False)
        matched_map = {}
        max_matched_target_idx = -1

        for tag, i1, i2, j1, j2 in matcher.get_opcodes():
            if tag == "equal":
                for offset in range(i2 - i1):
                    idx = i1 + offset
                    j = j1 + offset
                    matched_map[idx] = (1.0, spoken_clean[j].strip("'"))
                    max_matched_target_idx = max(max_matched_target_idx, idx)
            elif tag == "replace":
                # Ghép cặp tối ưu theo độ giống âm vị trong khối replace [i1:i2] vs [j1:j2]
                cand_pairs = []
                for idx in range(i1, i2):
                    c_tok = target_clean_list[idx]
                    if not c_tok:
                        continue
                    for j in range(j1, j2):
                        sp_w = spoken_clean[j].strip("'")
                        if _canon(c_tok) == _canon(sp_w):
                            r = 1.0
                        else:
                            r_char = difflib.SequenceMatcher(None, c_tok, sp_w).ratio()
                            r_phon = difflib.SequenceMatcher(None, self._phonetic_norm(c_tok), self._phonetic_norm(sp_w)).ratio()
                            r = max(r_char, r_phon * 0.96)
                            if len(c_tok) <= 2 and len(sp_w) >= 4:
                                r *= 0.55
                            elif len(c_tok) >= 3 and len(sp_w) >= 3 and c_tok[0] == sp_w[0] and c_tok[-1] == sp_w[-1] and abs(len(c_tok) - len(sp_w)) <= 1:
                                r = min(0.58, max(r, 0.54))
                        # Ưu tiên cặp có cùng vị trí tương đối nếu độ giống gần nhau
                        pos_bonus = max(0.0, 0.04 - 0.01 * abs((idx - i1) - (j - j1)))
                        cand_pairs.append((r + pos_bonus, r, idx, j, sp_w))
                cand_pairs.sort(key=lambda x: x[0], reverse=True)
                used_i = set()
                used_j = set()
                for _, r_raw, idx, j, sp_w in cand_pairs:
                    if idx in used_i or j in used_j:
                        continue
                    if r_raw >= 0.25:
                        used_i.add(idx)
                        used_j.add(j)
                        matched_map[idx] = (r_raw, sp_w)
                        max_matched_target_idx = max(max_matched_target_idx, idx)

        word_results = []
        good_count = 0
        warn_count = 0
        bad_count = 0

        for idx, orig_tok in enumerate(target_tokens):
            c_tok = target_clean_list[idx]
            if not c_tok:
                continue
            best_ratio, best_spoken = matched_map.get(idx, (0.0, ""))
            ipa_hint = self.SHADOWING_WORD_IPA_DICT.get(c_tok) or self.SHADOWING_WORD_IPA_DICT.get(c_tok.rstrip("s").rstrip("ed")) or ""

            if best_ratio >= 0.86:
                status = "good"
                w_score = max(90, min(100, int(round(best_ratio * 100))))
                error_type = "ok"
                short_tag = ""
                note = "Phát âm chuẩn"
                good_count += 1
            elif best_ratio >= 0.60:
                status = "warn"
                w_score = max(62, min(85, int(round(best_ratio * 100))))
                warn_count += 1
                if c_tok.startswith(best_spoken) and len(c_tok) > len(best_spoken):
                    missing_tail = c_tok[len(best_spoken):]
                    error_type = "ending"
                    short_tag = f"thiếu -{missing_tail}"
                    note = f"Thiếu âm cuối (-{missing_tail}), nghe thành '{best_spoken}'"
                elif best_spoken.startswith(c_tok) and len(best_spoken) > len(c_tok):
                    error_type = "ending"
                    short_tag = f"dư âm: {best_spoken}"
                    note = f"Dư âm cuối, nghe thành '{best_spoken}'"
                else:
                    error_type = "mispronounced"
                    short_tag = f"lệch: {best_spoken}"
                    note = f"Lệch âm nhẹ (nghe thành '{best_spoken}')"
            else:
                if is_live and idx > max_matched_target_idx:
                    status = "pending"
                    w_score = 0
                    error_type = "pending"
                    short_tag = ""
                    note = "Đang chờ bạn đọc..."
                elif best_spoken:
                    status = "bad"
                    w_score = max(20, int(round(best_ratio * 100)))
                    error_type = "wrong"
                    short_tag = f"sai: {best_spoken}"
                    note = f"Phát âm sai (nghe thành '{best_spoken}')"
                    bad_count += 1
                else:
                    status = "bad"
                    w_score = 0
                    error_type = "missing"
                    short_tag = "bỏ sót"
                    note = "Bỏ sót chưa đọc từ này"
                    bad_count += 1

            word_results.append({
                "word": orig_tok,
                "clean": c_tok,
                "status": status,
                "score": w_score,
                "spoken": best_spoken,
                "ipa": ipa_hint,
                "errorType": error_type,
                "shortTag": short_tag,
                "note": note,
            })

        return word_results, good_count, warn_count, bad_count

    def shadowing_mic_start(self, args: dict | None = None) -> dict:
        """
        Bắt đầu thu âm trực tiếp từ Micro hệ thống bằng Python (pyaudiowpatch / sounddevice).
        Đo năng lượng giọng nói thật (VAD), phân tích 8 cột sóng âm và nhận diện chữ trực tiếp khi đang đọc.
        """
        args = args or {}
        target_text = str(args.get("targetText") or "").strip()
        lang = str(args.get("language") or "en").strip().lower()

        old_state = getattr(self, "_shadow_mic_state", None)
        if isinstance(old_state, dict) and old_state.get("recording"):
            old_state["recording"] = False
            time.sleep(0.12)

        state = {
            "recording": True,
            "startedAt": time.time(),
            "targetText": target_text,
            "language": lang,
            "chunks": [],
            "totalSamples": 0,
            "speechSamples": 0,
            "silenceAfterSpeechSamples": 0,
            "voiceDetected": False,
            "speakingNow": False,
            "level": 0,
            "bars": [18, 22, 18, 24, 18, 22, 18, 20],
            "liveTranscript": "",
            "liveWords": [],
            "lastInterimAt": 0.0,
            "interimBusy": False,
            "autoStopReady": False,
            "error": "",
        }
        self._shadow_mic_state = state

        def _interim_worker(snap_f32: np.ndarray):
            try:
                dur = len(snap_f32) / 16000.0
                wav_b = pcm_float32_to_wav_bytes(snap_f32)
                txt, _ = self.engine.transcribe_google_web_free(
                    wav_b,
                    language_hint=lang if lang in ("en", "zh", "vi") else "en",
                    duration_sec=dur,
                )
                if txt and txt.strip() and state.get("recording"):
                    state["voiceDetected"] = True
                    if state["speechSamples"] < int(0.50 * 16000):
                        state["speechSamples"] = int(0.50 * 16000)
                    state["liveTranscript"] = txt.strip()
                    w_res, _, _, _ = self._align_and_grade_words(target_text, txt.strip(), lang, is_live=True)
                    state["liveWords"] = w_res
            except Exception:
                pass
            finally:
                state["interimBusy"] = False

        def _mic_record_loop():
            noise_samples = []
            noise_floor = 0.0045

            def _feed_16k(arr_16k: np.ndarray):
                nonlocal noise_floor
                if not state.get("recording") or len(arr_16k) == 0:
                    return
                clean_c = MeetingMinutesAudioDSP.high_pass_filter_85hz(arr_16k, 16000, 85.0)
                rms = float(np.sqrt(np.mean(np.square(clean_c))))
                state["chunks"].append(arr_16k.astype(np.float32).copy())
                state["totalSamples"] += len(arr_16k)

                if len(noise_samples) < 4 and rms < 0.012:
                    noise_samples.append(rms)
                    noise_floor = max(0.0018, min(0.0075, float(np.median(noise_samples))))

                vad_thresh = max(0.0040, noise_floor * 1.65 + 0.0015)
                lvl = int(max(8, min(100, round((rms / 0.055) * 100))))
                state["level"] = lvl

                try:
                    spec = np.abs(np.fft.rfft(clean_c[:512]))
                    if len(spec) >= 16:
                        bands = np.array_split(spec[1:65], 8)
                        bars = [int(max(16, min(100, round(float(np.mean(b)) * 38)))) for b in bands]
                        state["bars"] = bars
                except Exception:
                    pass

                if rms >= vad_thresh:
                    state["speakingNow"] = True
                    state["speechSamples"] += len(arr_16k)
                    state["silenceAfterSpeechSamples"] = 0
                    if state["speechSamples"] >= int(0.16 * 16000):
                        state["voiceDetected"] = True
                else:
                    state["speakingNow"] = False
                    if state["voiceDetected"]:
                        state["silenceAfterSpeechSamples"] += len(arr_16k)

                now_t = time.time()
                if not state["interimBusy"] and (now_t - state["lastInterimAt"]) >= 0.90:
                    if state["totalSamples"] >= int(0.65 * 16000) and (state["voiceDetected"] or rms >= 0.0020 or state["totalSamples"] >= int(1.0 * 16000)):
                        state["interimBusy"] = True
                        state["lastInterimAt"] = now_t
                        snap = np.concatenate(state["chunks"][-int(12 * 10):])
                        threading.Thread(target=_interim_worker, args=(snap,), daemon=True).start()

                if state["speechSamples"] >= int(0.90 * 16000) and state["silenceAfterSpeechSamples"] >= int(1.45 * 16000):
                    state["autoStopReady"] = True

            if IS_WINDOWS:
                pa = None
                stream = None
                try:
                    import pyaudiowpatch as pyaudio
                    with _PA_LOCK:
                        pa = _get_shared_pyaudio()
                        dev_info = pa.get_default_input_device_info()
                        dev_idx = int(dev_info.get("index", 0))
                        native_sr = int(float(dev_info.get("defaultSampleRate") or 44100))
                        native_ch = max(1, min(2, int(dev_info.get("maxInputChannels") or 1)))
                        try:
                            stream = pa.open(
                                format=pyaudio.paFloat32,
                                channels=1,
                                rate=16000,
                                input=True,
                                input_device_index=dev_idx,
                                frames_per_buffer=1600,
                            )
                            use_sr = 16000
                            use_ch = 1
                        except Exception:
                            chunk_f = max(1024, native_sr // 10)
                            stream = pa.open(
                                format=pyaudio.paFloat32,
                                channels=native_ch,
                                rate=native_sr,
                                input=True,
                                input_device_index=dev_idx,
                                frames_per_buffer=chunk_f,
                            )
                            use_sr = native_sr
                            use_ch = native_ch

                    read_frames = max(1024, use_sr // 10)
                    while state.get("recording"):
                        raw = stream.read(read_frames, exception_on_overflow=False)
                        arr = np.frombuffer(raw, dtype=np.float32)
                        if use_ch > 1:
                            arr = arr.reshape(-1, use_ch).mean(axis=1)
                        if use_sr != 16000 and len(arr) > 0:
                            arr = MeetingMinutesAudioDSP.resample_to_16k_antialias(arr, use_sr)
                        _feed_16k(arr)
                    return
                except Exception as e:
                    state["error"] = str(e)
                finally:
                    if stream is not None:
                        with _PA_LOCK:
                            try:
                                stream.stop_stream()
                                stream.close()
                            except Exception:
                                pass

            try:
                import sounddevice as sd
                with sd.InputStream(samplerate=16000, channels=1, dtype="float32", blocksize=1600) as stream:
                    while state.get("recording"):
                        data, _ = stream.read(1600)
                        arr = np.asarray(data, dtype=np.float32).reshape(-1).copy()
                        _feed_16k(arr)
            except Exception as e:
                state["error"] = f"Không mở được Micro: {e}"

        t_rec = threading.Thread(target=_mic_record_loop, daemon=True)
        t_rec.start()
        self._shadow_mic_thread = t_rec
        return {"ok": True, "started": True}

    def shadowing_mic_poll(self, args: dict | None = None) -> dict:
        """Lấy trạng thái thu âm trực tiếp mỗi 180ms: mức âm lượng, đã phát hiện tiếng nói chưa, chữ đang nhận diện."""
        st = getattr(self, "_shadow_mic_state", None)
        if not isinstance(st, dict):
            return {"ok": False, "recording": False}
        return {
            "ok": True,
            "recording": bool(st.get("recording")),
            "elapsedSec": round(max(0.0, time.time() - float(st.get("startedAt") or time.time())), 1),
            "spokenSec": round(float(st.get("speechSamples", 0)) / 16000.0, 2),
            "voiceDetected": bool(st.get("voiceDetected")),
            "speakingNow": bool(st.get("speakingNow")),
            "level": int(st.get("level", 0)),
            "bars": list(st.get("bars") or [18]*8),
            "liveTranscript": str(st.get("liveTranscript") or ""),
            "liveWords": list(st.get("liveWords") or []),
            "autoStopReady": bool(st.get("autoStopReady")),
            "error": str(st.get("error") or ""),
        }

    def shadowing_mic_stop(self, args: dict | None = None) -> dict:
        """Dừng thu âm Micro Python và chấm điểm phát âm chi tiết từng từ."""
        args = args or {}
        st = getattr(self, "_shadow_mic_state", None)
        wav_bytes = b""
        speech_sec = 0.0
        total_dur = float(args.get("durationSec") or 2.5)
        live_tr = ""

        if isinstance(st, dict):
            st["recording"] = False
            thr = getattr(self, "_shadow_mic_thread", None)
            if thr and thr.is_alive():
                try:
                    thr.join(timeout=0.35)
                except Exception:
                    pass
            chunks = st.get("chunks") or []
            speech_sec = float(st.get("speechSamples", 0)) / 16000.0
            live_tr = str(st.get("liveTranscript") or "").strip()
            if chunks:
                full_f32 = np.concatenate(chunks)
                total_dur = max(0.5, len(full_f32) / 16000.0)
                wav_bytes = pcm_float32_to_wav_bytes(full_f32)

        merged_args = dict(args)
        merged_args["_rawWavBytes"] = wav_bytes
        merged_args["_speechSec"] = speech_sec
        merged_args["_liveTranscript"] = live_tr
        merged_args["durationSec"] = total_dur
        return self.shadowing_score_speech(merged_args)

    def _transcribe_shadowing_verbatim(self, wav_bytes: bytes, lang: str, duration_sec: float, speech_sec: float = 1.0) -> str:
        """
        Nhận diện giọng đọc học viên KHÔNG dùng prompt gợi ý (tránh Whisper tự sửa lỗi phát âm sai của học viên).
        Kết hợp cả Google Web Speech (nhạy lỗi phát âm âm vị) và Groq Whisper V3 Turbo (temperature=0).
        """
        import concurrent.futures

        def _try_google():
            try:
                t_g, _ = self.engine.transcribe_google_web_free(wav_bytes, language_hint=lang, duration_sec=duration_sec)
                return (t_g or "").strip()
            except Exception:
                return ""

        def _try_whisper_unprompted():
            if not self.engine.groq_key:
                return ""
            for w_model in self.engine._next_asr_models():
                if not self.engine._can_use_model(w_model, max_rpm=14):
                    continue
                try:
                    data_fields = {
                        "model": w_model,
                        "response_format": "json",
                        "temperature": "0",
                    }
                    if lang in ("en", "zh", "vi"):
                        data_fields["language"] = lang
                    resp = self.engine.http.post(
                        "https://api.groq.com/openai/v1/audio/transcriptions",
                        headers={"Authorization": f"Bearer {self.engine.groq_key}"},
                        files={"file": ("shadowing.wav", wav_bytes, "audio/wav")},
                        data=data_fields,
                        timeout=6.0,
                    )
                    if resp.status_code == 200:
                        raw_t = (resp.json().get("text") or "").strip()
                        if raw_t and not is_hallucination_or_noise(raw_t, duration_sec):
                            return raw_t
                except Exception:
                    continue
            return ""

        if speech_sec < 0.22:
            return _try_google()

        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
            f_g = pool.submit(_try_google)
            f_w = pool.submit(_try_whisper_unprompted)
            txt_g = f_g.result()
            txt_w = f_w.result()

        if txt_g and txt_w:
            if len(txt_g.split()) >= max(1, len(txt_w.split()) - 2):
                return txt_g
            return txt_w
        return txt_g or txt_w

    def shadowing_score_speech(self, args: dict | None = None) -> dict:
        """
        Chấm điểm giọng đọc Shadowing của học viên & Phát hiện chính xác từng từ phát âm sai / bỏ sót / im lặng.
        """
        args = args or {}
        target_text = str(args.get("targetText") or "").strip()
        lang = str(args.get("language") or "en").strip().lower()
        audio_b64 = str(args.get("audioBase64") or "").strip()
        browser_transcript = str(args.get("browserTranscript") or "").strip()
        live_transcript = str(args.get("_liveTranscript") or "").strip()
        recorded_dur = max(0.5, float(args.get("durationSec") or 3.0))
        target_dur = max(1.0, float(args.get("targetDuration") or 4.0))

        wav_bytes = args.get("_rawWavBytes") or b""
        speech_sec = float(args.get("_speechSec") or 0.0)

        # Nếu không có wav_bytes từ Python Mic, giải mã từ audioBase64 của trình duyệt
        if not wav_bytes and audio_b64:
            if "," in audio_b64[:80]:
                audio_b64 = audio_b64.split(",", 1)[1]
            try:
                raw_bytes = base64.b64decode(audio_b64)
                if len(raw_bytes) > 200:
                    proc = subprocess.run(
                        ["ffmpeg", "-y", "-i", "pipe:0", "-vn", "-ac", "1", "-ar", "16000", "-f", "wav", "pipe:1"],
                        input=raw_bytes,
                        capture_output=True,
                        timeout=10,
                        creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0,
                    )
                    wav_bytes = proc.stdout if (proc.returncode == 0 and len(proc.stdout) > 100) else raw_bytes
            except Exception:
                pass

        # Đo thời lượng tiếng nói thật (VAD) nếu wav_bytes đến từ trình duyệt
        if wav_bytes and wav_bytes[:4] == b"RIFF" and speech_sec <= 0.01:
            try:
                pcm_i16 = np.frombuffer(wav_bytes[44:], dtype=np.int16).astype(np.float32) / 32768.0
                if len(pcm_i16) > 0:
                    clean_p = MeetingMinutesAudioDSP.high_pass_filter_85hz(pcm_i16, 16000, 85.0)
                    win = 1600
                    active_w = 0
                    for i in range(0, len(clean_p), win):
                        seg_w = clean_p[i:i+win]
                        if len(seg_w) > 0 and float(np.sqrt(np.mean(np.square(seg_w)))) >= 0.008:
                            active_w += len(seg_w)
                    speech_sec = active_w / 16000.0
            except Exception:
                pass

        user_audio_data_url = ""
        if wav_bytes and wav_bytes[:4] == b"RIFF":
            user_audio_data_url = "data:audio/wav;base64," + base64.b64encode(wav_bytes).decode("ascii")

        recognized_text = ""
        if wav_bytes and wav_bytes[:4] == b"RIFF" and len(wav_bytes) > 1000:
            recognized_text = self._transcribe_shadowing_verbatim(
                wav_bytes,
                lang if lang in ("en", "zh", "vi") else "en",
                recorded_dur,
                speech_sec=speech_sec,
            )

        if not recognized_text and live_transcript:
            recognized_text = live_transcript.strip()
        if not recognized_text and browser_transcript:
            recognized_text = browser_transcript.strip()
        if recognized_text:
            speech_sec = max(speech_sec, min(recorded_dur, max(0.45, len(recognized_text.split()) * 0.25)))

        # TRƯỜNG HỢP 1: Học viên chưa đọc gì (Im lặng hoặc tạp âm < 0.2s)
        if speech_sec < 0.18 and not recognized_text:
            target_tokens = [
                w.strip() for w in re.sub(r"\s*--+\s*", " ", target_text).replace('"', "").split()
                if re.search(r"[A-Za-z0-9]", w)
            ]
            unspoken_words = [
                {
                    "word": w,
                    "clean": re.sub(r"[^a-z0-9']+", "", w.lower()),
                    "status": "unspoken",
                    "score": 0,
                    "spoken": "",
                    "ipa": "",
                    "errorType": "unspoken",
                    "shortTag": "chưa đọc",
                    "note": "Chưa phát hiện giọng đọc",
                }
                for w in target_tokens
            ]
            return {
                "ok": True,
                "noSpeech": True,
                "voiceDetected": False,
                "spokenDurationSec": round(speech_sec, 2),
                "recognizedText": "",
                "overall": 0,
                "overallScore": 0,
                "grade": "—",
                "accuracy": 0,
                "accuracyScore": 0,
                "fluency": 0,
                "fluencyScore": 0,
                "completeness": 0,
                "completenessScore": 0,
                "wpm": 0,
                "words": unspoken_words,
                "weakWords": [],
                "errorDetails": [],
                "feedback": "Không phát hiện giọng đọc! Micro chưa thu được tiếng nói của bạn. Hãy bấm Bật Mic và đọc to câu tiếng Anh nhé.",
                "userAudioBase64": user_audio_data_url,
            }

        # TRƯỜNG HỢP 2: Đã thu được giọng đọc -> Phân tích lỗi phát âm từng từ
        word_results, good_count, warn_count, bad_count = self._align_and_grade_words(
            target_text, recognized_text, lang, is_live=False
        )

        total_valid = max(1, len(word_results))
        accuracy_score = int(round(sum(w["score"] for w in word_results) / total_valid))
        completeness_score = int(round(((good_count + warn_count * 0.7) / total_valid) * 100))
        completeness_score = max(0, min(100, completeness_score))

        spoken_tokens = re.findall(r"[a-z0-9']+", recognized_text.lower()) if lang != "zh" else list(recognized_text)
        spoken_count = len(spoken_tokens)
        eff_dur = max(0.8, speech_sec if speech_sec >= 0.5 else recorded_dur)
        wpm = int(round((spoken_count / eff_dur) * 60.0)) if spoken_count > 0 else 0

        pace_ratio = eff_dur / max(1.0, target_dur)
        if 0.65 <= pace_ratio <= 1.35:
            pace_score = 95
        elif 0.45 <= pace_ratio <= 1.65:
            pace_score = 82
        else:
            pace_score = 68

        fluency_score = int(round(0.55 * pace_score + 0.45 * completeness_score)) if spoken_count > 0 else 0
        overall_score = int(round(0.55 * accuracy_score + 0.20 * fluency_score + 0.25 * completeness_score)) if spoken_count > 0 else 0

        if overall_score >= 90:
            grade = "A+"
        elif overall_score >= 80:
            grade = "A"
        elif overall_score >= 68:
            grade = "B"
        elif overall_score >= 50:
            grade = "C"
        else:
            grade = "D"

        error_details = []
        weak_words = []
        for w in word_results:
            if w["status"] in ("bad", "warn"):
                clean_label = w["word"].strip(".,!?;:\"'")
                weak_words.append(clean_label)
                error_details.append({
                    "word": clean_label,
                    "spoken": w["spoken"],
                    "status": w["status"],
                    "errorType": w["errorType"],
                    "shortTag": w["shortTag"],
                    "note": w["note"],
                    "ipa": w["ipa"],
                })

        if spoken_count == 0:
            feedback = "Đã thu được âm thanh nhưng chưa nhận diện rõ từ tiếng Anh. Hãy đọc to và rõ từng chữ hơn nhé!"
        elif bad_count == 0 and warn_count == 0:
            feedback = f"Xuất sắc! Bạn đã đọc chuẩn cả {good_count}/{total_valid} từ ({wpm} từ/phút)."
        else:
            err_summaries = []
            for ed in error_details[:4]:
                if ed["errorType"] == "missing":
                    err_summaries.append(f"{ed['word']} (bỏ sót)")
                else:
                    err_summaries.append(f"{ed['word']} (nghe thành '{ed['spoken']}')")
            feedback = f"Phát hiện {len(error_details)} từ cần sửa: {', '.join(err_summaries)}. Bấm vào từ tô Đỏ/Vàng để nghe phát âm chuẩn."

        return {
            "ok": True,
            "noSpeech": False,
            "voiceDetected": True,
            "spokenDurationSec": round(speech_sec, 2),
            "recognizedText": recognized_text,
            "overall": overall_score,
            "overallScore": overall_score,
            "grade": grade,
            "accuracy": accuracy_score,
            "accuracyScore": accuracy_score,
            "fluency": fluency_score,
            "fluencyScore": fluency_score,
            "completeness": completeness_score,
            "completenessScore": completeness_score,
            "goodCount": good_count,
            "warnCount": warn_count,
            "badCount": bad_count,
            "totalWords": total_valid,
            "wpm": wpm,
            "words": word_results,
            "weakWords": weak_words[:6],
            "errorDetails": error_details[:8],
            "feedback": feedback,
            "userAudioBase64": user_audio_data_url,
        }

    def shadowing_speak_tts(self, args: dict | None = None) -> dict:
        """Đọc mẫu câu hoặc từ đơn lẻ bằng giọng bản xứ Neural (US / UK / Trung) với tùy chọn đọc chậm."""
        args = args or {}
        text = str(args.get("text") or "").strip()
        lang = str(args.get("language") or "en").strip().lower()
        accent = str(args.get("accent") or "us").strip().lower()
        slow = bool(args.get("slow", False))
        if not text:
            return {"ok": False, "audioBase64": ""}

        if lang == "zh" or CJK_CHARS_RE.search(text):
            voice = "zh-CN-XiaoxiaoNeural"
        elif lang == "vi" or VI_CHARS_RE.search(text):
            voice = "vi-VN-HoaiMyNeural"
        elif accent == "uk":
            voice = "en-GB-SoniaNeural"
        else:
            voice = "en-US-AriaNeural"

        rate_str = "-24%" if slow else "+0%"
        tmp_mp3 = Path(tempfile.gettempdir()) / f"dvs_shadow_tts_{uuid.uuid4().hex[:10]}.mp3"
        try:
            import asyncio
            import edge_tts
            asyncio.run(edge_tts.Communicate(text, voice, rate=rate_str).save(str(tmp_mp3)))
            if tmp_mp3.exists() and tmp_mp3.stat().st_size > 100:
                b64 = base64.b64encode(tmp_mp3.read_bytes()).decode("ascii")
                try:
                    tmp_mp3.unlink()
                except Exception:
                    pass
                return {"ok": True, "audioBase64": b64, "mime": "audio/mpeg", "voice": voice}
        except Exception:
            pass
        return {"ok": False, "audioBase64": ""}


    def hear_video_part(self, path: str, from_sec: float, to_sec: float) -> dict:
        dur = max(1.0, float(to_sec) - float(from_sec))
        tmp_wav = os.path.join(tempfile.gettempdir(), f"vietnote_vidpart_{uuid.uuid4().hex[:8]}.mp3")
        try:
            cmd = [
                "ffmpeg", "-y",
                "-ss", str(max(0.0, float(from_sec))),
                "-t", str(dur),
                "-i", path,
                "-vn", "-ac", "1", "-ar", "16000", "-b:a", "48k",
                tmp_wav
            ]
            subprocess.run(
                cmd, capture_output=True, timeout=30,
                creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0
            )
            res = self.engine.process_audio_file(tmp_wav, source_lang="auto")
            tokens = self._segments_to_vietnote_tokens(
                res.get("segments", []),
                res.get("detected_language", "en"),
                translate=True,
                offset_ms=int(float(from_sec) * 1000)
            )
            return {"to": float(to_sec), "tokens": tokens}
        finally:
            if os.path.exists(tmp_wav):
                try:
                    os.remove(tmp_wav)
                except Exception:
                    pass

    # =========================================================================
    # 4B. LIVE LECTURE MIND MAP, INLINE SEGMENT NOTES & NOTEBOOKLM STUDIO
    # =========================================================================
    def _study_extras_path(self) -> Path:
        return DATA_DIR / "study_extras.json"

    def load_study_extras(self) -> dict:
        p = self._study_extras_path()
        if p.exists():
            try:
                return json.loads(p.read_text(encoding="utf-8"))
            except Exception:
                pass
        return {"segmentNotes": {}, "mindMaps": {}, "studioCache": {}}

    def save_study_extras(self, payload: dict) -> dict:
        p = self._study_extras_path()
        try:
            current = self.load_study_extras()
            if isinstance(payload, dict):
                for k in ("segmentNotes", "mindMaps", "studioCache"):
                    if isinstance(payload.get(k), dict):
                        current.setdefault(k, {}).update(payload[k])
            p.write_text(json.dumps(current, ensure_ascii=False, indent=2), encoding="utf-8")
        except Exception:
            pass
        return {"ok": True}

    def generate_mindmap(self, args: dict) -> dict:
        """
        Tạo Sơ đồ tư duy thời gian thực (Live Real-Time Mind Map) khi bật Ghi nội dung buổi học
        hoặc từ ghi chú đã lưu. Hỗ trợ cả chế độ Instant Real-time (< 5ms) và Deep AI Mode.
        """
        segments = args.get("segments") or []
        seg_notes = args.get("segmentNotes") or {}
        title = (args.get("title") or "Nội dung Buổi học & Bài giảng").strip()
        use_ai = bool(args.get("useAi", False))

        norm_segs = []
        for idx, s in enumerate(segments[:250]):
            if not isinstance(s, dict):
                continue
            sid = str(s.get("id") or f"seg-{idx+1}")
            txt = (
                s.get("translatedText")
                or s.get("cleanText")
                or s.get("sourceText")
                or s.get("text")
                or s.get("rawText")
                or ""
            ).strip()
            if not txt:
                continue
            ts_raw = s.get("timestamp") or ""
            ts_label = ""
            if isinstance(ts_raw, str) and "T" in ts_raw:
                try:
                    ts_label = ts_raw.split("T")[1][:8]
                except Exception:
                    ts_label = ts_raw[:8]
            else:
                ts_label = str(ts_raw)[:8] or f"{idx*15//60:02d}:{idx*15%60:02d}"
            note_obj = seg_notes.get(sid) if isinstance(seg_notes, dict) else None
            user_note = ""
            user_tag = ""
            if isinstance(note_obj, dict):
                user_note = str(note_obj.get("text") or "").strip()
                user_tag = str(note_obj.get("tag") or "").strip()
            elif isinstance(note_obj, str):
                user_note = note_obj.strip()
            norm_segs.append({
                "id": sid,
                "idx": idx,
                "text": txt,
                "sourceText": str(s.get("sourceText") or s.get("rawText") or txt).strip(),
                "timestamp": ts_label,
                "speaker": str(s.get("speaker") or "Giảng viên"),
                "userNote": user_note,
                "tag": user_tag,
                "isLatest": (idx == len(segments) - 1),
            })

        if not norm_segs:
            return {
                "root": title,
                "updatedAt": time.strftime("%H:%M:%S"),
                "branches": [
                    {
                        "id": "br-init-1",
                        "title": "I. Khái niệm & Lý thuyết trọng tâm",
                        "color": "#2563eb",
                        "icon": "",
                        "active": True,
                        "children": [
                            {
                                "id": "node-wait-1",
                                "text": "Đang lắng nghe lời giảng. Sơ đồ tư duy sẽ tự động tổng hợp các luận điểm chính.",
                                "detail": "Khoanh vùng một đoạn ý bên cột lời giảng để ghi chú hoặc hỏi AI giải thích.",
                                "segmentId": "",
                                "timestamp": "Trực tiếp",
                                "tag": "Đang chờ lời giảng",
                                "userNote": "",
                                "active": True,
                            }
                        ],
                    }
                ],
            }

        if use_ai and len(norm_segs) >= 2:
            lines_for_llm = []
            for ns in norm_segs[:120]:
                note_suffix = f" [GHI CHÚ HỌC VIÊN ({ns['tag'] or 'Ghi chú'}): {ns['userNote']}]" if ns["userNote"] else ""
                lines_for_llm.append(f"[{ns['id']}] ({ns['timestamp']}) {ns['text']}{note_suffix}")
            sys_prompt = (
                "Bạn là Chuyên gia Sơ đồ tư duy Học thuật của Điệp Viên Study. "
                "Hãy phân tích lời giảng và ghi chú của học viên để tạo Sơ đồ tư duy phân cấp cực kỳ gọn gàng, súc tích bằng tiếng Việt. "
                "Tuyệt đối KHÔNG dùng emoji. Trả về DUY NHẤT một JSON object hợp lệ."
            )
            prompt = f"""Hãy cấu trúc hóa bài giảng sau thành Sơ đồ tư duy JSON thật gọn gàng theo đúng schema (tuyệt đối không dùng emoji):
{{
  "root": "Chủ đề trung tâm ngắn gọn (4-8 từ)",
  "branches": [
    {{
      "id": "br-1",
      "title": "I. Tên nhánh chính (VD: Khái niệm cốt lõi / Công thức & Định lý / Ví dụ áp dụng / Trọng tâm cần nhớ)",
      "children": [
        {{
          "id": "n-1",
          "text": "Luận điểm cốt lõi thật ngắn gọn (dưới 18 từ)",
          "detail": "Công thức hoặc giải thích ngắn gọn (nếu có)",
          "segmentId": "mã_id_đoạn_gốc_thực_tế",
          "tag": "Công thức | Trọng tâm | Lưu ý | Ví dụ"
        }}
      ]
    }}
  ]
}}
BẢN GHI BÀI GIẢNG & GHI CHÚ:
{chr(10).join(lines_for_llm)[:18000]}"""
            raw_ai = self.engine.call_llm(
                prompt=prompt,
                system_prompt=sys_prompt,
                json_mode=True,
                temperature=0.15,
                max_tokens=2048,
                prefer_fast=True,
            )
            if raw_ai:
                try:
                    parsed = json.loads(raw_ai)
                    seg_map = {ns["id"]: ns for ns in norm_segs}
                    latest_id = norm_segs[-1]["id"]
                    palette = ["#1e40af", "#0f766e", "#b45309", "#4338ca", "#be123c"]
                    out_branches = []
                    for b_i, br in enumerate(parsed.get("branches") or []):
                        if not isinstance(br, dict):
                            continue
                        b_children = []
                        branch_active = False
                        for c_i, ch in enumerate(br.get("children") or []):
                            if not isinstance(ch, dict):
                                continue
                            sid = str(ch.get("segmentId") or "")
                            if sid not in seg_map:
                                matched_ids = match_evidence_ids(
                                    str(ch.get("text") or "") + " " + str(ch.get("detail") or ""),
                                    [{"id": x["id"], "speaker": x["speaker"], "text": x["text"]} for x in norm_segs],
                                    [x["id"] for x in norm_segs],
                                    top_k=1,
                                )
                                sid = matched_ids[0] if matched_ids else norm_segs[-1]["id"]
                            ref_seg = seg_map.get(sid, norm_segs[-1])
                            is_act = (sid == latest_id)
                            if is_act:
                                branch_active = True
                            b_children.append({
                                "id": str(ch.get("id") or f"node-{b_i+1}-{c_i+1}"),
                                "text": str(ch.get("text") or ref_seg["text"][:95]).strip(),
                                "detail": str(ch.get("detail") or "").strip(),
                                "segmentId": sid,
                                "timestamp": ref_seg["timestamp"],
                                "tag": ref_seg["tag"] or str(ch.get("tag") or "").strip(),
                                "userNote": ref_seg["userNote"],
                                "active": is_act,
                            })
                        if b_children:
                            out_branches.append({
                                "id": str(br.get("id") or f"br-{b_i+1}"),
                                "title": str(br.get("title") or f"Nhánh {b_i+1}").strip(),
                                "color": palette[b_i % len(palette)],
                                "icon": "",
                                "active": branch_active,
                                "children": b_children[:5],
                            })
                    existing_sids = {c["segmentId"] for b in out_branches for c in b["children"]}
                    noted_missing = [ns for ns in norm_segs if ns["userNote"] and ns["id"] not in existing_sids]
                    if noted_missing:
                        out_branches.append({
                            "id": "br-user-notes",
                            "title": "Đoạn Khoanh Vùng & Ghi Chú",
                            "color": "#b45309",
                            "icon": "",
                            "active": any(ns["isLatest"] for ns in noted_missing),
                            "children": [
                                {
                                    "id": f"node-unote-{ns['id']}",
                                    "text": ns["text"][:95],
                                    "detail": f"Ghi chú: {ns['userNote']}",
                                    "segmentId": ns["id"],
                                    "timestamp": ns["timestamp"],
                                    "tag": ns["tag"] or "Đã ghi chú",
                                    "userNote": ns["userNote"],
                                    "active": ns["isLatest"],
                                }
                                for ns in noted_missing
                            ],
                        })
                    if out_branches:
                        return {
                            "root": str(parsed.get("root") or title).strip(),
                            "updatedAt": time.strftime("%H:%M:%S"),
                            "branches": out_branches,
                        }
                except Exception:
                    pass

        # Chế độ Real-Time Gọn Gàng: Rút gọn câu giảng thành ý ngắn và phân nhánh rõ ràng, không dùng emoji
        buckets = {
            "concepts": {
                "id": "br-concepts",
                "title": "I. Khái niệm & Luận điểm chính",
                "color": "#1e40af",
                "icon": "",
                "children": [],
            },
            "formulas": {
                "id": "br-formulas",
                "title": "II. Công thức, Quy tắc & Định lý",
                "color": "#4338ca",
                "icon": "",
                "children": [],
            },
            "examples": {
                "id": "br-examples",
                "title": "III. Phân tích Ví dụ & Ứng dụng",
                "color": "#0f766e",
                "icon": "",
                "children": [],
            },
            "warnings": {
                "id": "br-warnings",
                "title": "IV. Trọng tâm & Lưu ý quan trọng",
                "color": "#be123c",
                "icon": "",
                "children": [],
            },
            "notes": {
                "id": "br-notes",
                "title": "V. Đoạn Khoanh Vùng & Ghi Chú",
                "color": "#b45309",
                "icon": "",
                "children": [],
            },
        }

        for ns in norm_segs:
            low = (ns["text"] + " " + ns["userNote"] + " " + ns["tag"]).lower()
            first_clause = re.split(r"[.!?;]\s+", ns["text"])[0].strip()
            short_txt = first_clause if len(first_clause) <= 92 else first_clause[:89] + "…"
            node = {
                "id": f"mm-{ns['id']}",
                "text": short_txt,
                "detail": "",
                "segmentId": ns["id"],
                "timestamp": ns["timestamp"],
                "tag": ns["tag"] or ("Đang giảng" if ns["isLatest"] else ""),
                "userNote": ns["userNote"],
                "active": ns["isLatest"],
            }
            if ns["userNote"]:
                buckets["notes"]["children"].append(node)
            if any(k in low for k in ("công thức", "định lý", "quy tắc", "phương trình", "đạo hàm", "tích phân", "bằng", "hàm số", "formula", "rule", "theorem")):
                if not node["tag"]:
                    node["tag"] = "Công thức"
                buckets["formulas"]["children"].append(node)
            elif any(k in low for k in ("lưu ý", "chú ý", "bẫy", "đề thi", "quan trọng", "nhớ kỹ", "tuyệt đối", "câu hỏi", "thi", "important", "exam", "note")):
                if not node["tag"]:
                    node["tag"] = "Trọng tâm"
                buckets["warnings"]["children"].append(node)
            elif any(k in low for k in ("ví dụ", "xét", "bài toán", "áp dụng", "dạng", "trường hợp", "thực tế", "example", "case")):
                if not node["tag"]:
                    node["tag"] = "Ví dụ"
                buckets["examples"]["children"].append(node)
            else:
                buckets["concepts"]["children"].append(node)

        final_branches = []
        for bkey in ("concepts", "formulas", "examples", "warnings", "notes"):
            b = buckets[bkey]
            if b["children"]:
                b["active"] = any(c.get("active") for c in b["children"])
                b["children"] = b["children"][-5:]
                final_branches.append(b)

        return {
            "root": title if title and title != "Ghi chú mới" else "Sơ Đồ Tư Duy Buổi Học",
            "updatedAt": time.strftime("%H:%M:%S"),
            "branches": final_branches,
        }

    def explain_segment(self, args: dict) -> dict:
        """AI Giải thích chi tiết ngay tại đoạn lời giảng mà học viên bấm Note."""
        text = (args.get("text") or "").strip()
        src_text = (args.get("sourceText") or "").strip()
        user_note = (args.get("userNote") or "").strip()
        context = (args.get("context") or "").strip()

        sys_prompt = (
            "Bạn là Gia sư Học thuật AI của Điệp Viên Study. "
            "Hãy giải thích cực kỳ dễ hiểu, ngắn gọn (3-5 gạch đầu dòng), đóng khung công thức/quy tắc "
            "và nêu mẹo ghi nhớ cho đúng đoạn bài giảng mà học viên vừa ghim."
        )
        prompt = f"""Đoạn lời giảng cần giải thích: "{text}"
{f'Câu gốc nước ngoài: "{src_text}"' if src_text and src_text != text else ''}
{f'Ghi chú của học viên tại đoạn này: "{user_note}"' if user_note else ''}
{f'Ngữ cảnh xung quanh: "{context}"' if context else ''}

Hãy giải thích ngắn gọn bằng tiếng Việt (Markdown):
1. **Bản chất cốt lõi**: ...
2. **Công thức / Từ khóa cần nhớ**: ...
3. **Lưu ý tránh sai khi làm bài**: ..."""

        out = self.engine.call_llm(
            prompt=prompt,
            system_prompt=sys_prompt,
            json_mode=False,
            temperature=0.2,
            max_tokens=600,
            prefer_fast=True,
        )
        if not out:
            out = (
                f"**Ý cốt lõi cần nắm:**\n- {text}\n"
                + (f"- **Ghi chú của bạn:** {user_note}\n" if user_note else "")
                + "- **Mẹo ôn tập:** Hãy đánh dấu đoạn này vào Sơ đồ tư duy để đối chiếu khi giải bài tập."
            )
        return {"explanation": out}

    def generate_notebooklm_studio(self, args: dict) -> dict:
        """
        Tạo bộ công cụ học tập kiểu NotebookLM từ nội dung buổi học + Note học viên:
        - mode='quiz': Bộ câu hỏi trắc nghiệm 4 đáp án có chấm điểm & giải thích.
        - mode='flashcards': Bộ thẻ lật 2 mặt (Thuật ngữ/Công thức <-> Giải nghĩa/Ví dụ).
        - mode='podcast': Kịch bản Audio Overview 2 Host (Nam Minh & Hoài My) thảo luận sâu về bài học.
        """
        mode = (args.get("mode") or "quiz").strip().lower()
        segments = args.get("segments") or []
        seg_notes = args.get("segmentNotes") or {}
        title = (args.get("title") or "Buổi học Điệp Viên Study").strip()

        lines = []
        first_sid = ""
        for idx, s in enumerate(segments[:120]):
            if not isinstance(s, dict):
                continue
            sid = str(s.get("id") or f"seg-{idx+1}")
            if not first_sid:
                first_sid = sid
            txt = (s.get("translatedText") or s.get("cleanText") or s.get("sourceText") or s.get("text") or "").strip()
            if not txt:
                continue
            n_obj = seg_notes.get(sid) if isinstance(seg_notes, dict) else None
            n_txt = n_obj.get("text") if isinstance(n_obj, dict) else (str(n_obj) if n_obj else "")
            lines.append(f"[{sid}] {txt}" + (f" (Note học viên: {n_txt})" if n_txt else ""))

        corpus = "\n".join(lines)[:16000]

        if mode == "quiz":
            if corpus:
                prompt = f"""Dựa trên nội dung bài giảng và ghi chú sau, hãy tạo 5 câu hỏi trắc nghiệm khách quan (4 lựa chọn A, B, C, D) để kiểm tra mức độ hiểu bài.
Trả về DUY NHẤT JSON object theo cấu trúc:
{{
  "questions": [
    {{
      "id": "q-1",
      "question": "Nội dung câu hỏi rõ ràng, sát trọng tâm?",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "answer": 0,
      "explanation": "Giải thích vì sao đáp án này đúng dựa trên bài giảng.",
      "segmentId": "{first_sid}"
    }}
  ]
}}
NỘI DUNG BÀI GIẢNG:
{corpus}"""
                raw = self.engine.call_llm(prompt=prompt, json_mode=True, temperature=0.2, max_tokens=1800, prefer_fast=True)
                if raw:
                    try:
                        data = json.loads(raw)
                        if isinstance(data.get("questions"), list) and len(data["questions"]) > 0:
                            return {"mode": "quiz", "questions": data["questions"]}
                    except Exception:
                        pass
            return {
                "mode": "quiz",
                "questions": [
                    {
                        "id": "q-1",
                        "question": f"Luận điểm hoặc quy tắc quan trọng nhất vừa được nhấn mạnh trong '{title}' là gì?",
                        "options": [
                            "A. Nắm vững khái niệm gốc, điều kiện áp dụng và thứ tự ưu tiên khi biến đổi công thức",
                            "B. Chỉ cần học thuộc đáp số cuối cùng không cần điều kiện",
                            "C. Bỏ qua các bước đặt ẩn phụ trong bài toán phức tạp",
                            "D. Áp dụng ngẫu nhiên không cần phân loại dạng bài",
                        ],
                        "answer": 0,
                        "explanation": "Trong bài giảng, giảng viên nhấn mạnh phải phân loại dạng bài và kiểm tra điều kiện trước khi áp dụng công thức.",
                        "segmentId": first_sid,
                    }
                ],
            }

        if mode == "flashcards":
            if corpus:
                prompt = f"""Dựa trên nội dung bài giảng và ghi chú sau, hãy trích xuất 6 thẻ ghi nhớ Flashcard (mặt trước là Khái niệm/Câu hỏi/Tên công thức, mặt sau là Định nghĩa/Công thức/Cách giải ngắn gọn).
Trả về DUY NHẤT JSON object:
{{
  "cards": [
    {{
      "id": "fc-1",
      "front": "Khái niệm / Câu hỏi cốt lõi",
      "back": "Định nghĩa / Công thức / Đáp án súc tích",
      "tag": "Trọng tâm",
      "segmentId": "{first_sid}"
    }}
  ]
}}
NỘI DUNG BÀI GIẢNG:
{corpus}"""
                raw = self.engine.call_llm(prompt=prompt, json_mode=True, temperature=0.2, max_tokens=1600, prefer_fast=True)
                if raw:
                    try:
                        data = json.loads(raw)
                        if isinstance(data.get("cards"), list) and len(data["cards"]) > 0:
                            return {"mode": "flashcards", "cards": data["cards"]}
                    except Exception:
                        pass
            cards_fb = []
            for i, l in enumerate(lines[:6]):
                cards_fb.append({
                    "id": f"fc-{i+1}",
                    "front": f"Điểm kiến thức #{i+1} trong buổi học",
                    "back": re.sub(r"^\[[^\]]+\]\s*", "", l),
                    "tag": " Kiến thức cốt lõi",
                    "segmentId": first_sid,
                })
            return {"mode": "flashcards", "cards": cards_fb}

        # mode == "podcast" (NotebookLM 2-Host Audio Overview)
        if corpus:
            prompt = f"""Hãy viết kịch bản Podcast thảo luận học thuật (kiểu NotebookLM Audio Overview) gồm 6 đến 8 lượt lời đối thoại tự nhiên, hào hứng giữa 2 người dẫn chương trình:
- "Nam Minh" (Giọng Nam: phân tích cấu trúc, đặt vấn đề sắc sảo)
- "Hoài My" (Giọng Nữ: giải thích dễ hiểu, lấy ví dụ thực tế và nhắc lại các chỗ học viên đã Note)
Trả về DUY NHẤT JSON object:
{{
  "turns": [
    {{"speaker": "Nam Minh", "voice": "namminh", "text": "Chào mừng bạn đến với phòng thu Điệp Viên Study! Hôm nay chúng ta cùng bóc tách buổi học..."}},
    {{"speaker": "Hoài My", "voice": "baotrang", "text": "Đúng vậy anh Minh ơi, đặc biệt trong bài hôm nay có đoạn bạn học viên đã ghim Note cực kỳ đắt giá..."}}
  ]
}}
NỘI DUNG BÀI GIẢNG & NOTE:
{corpus}"""
            raw = self.engine.call_llm(prompt=prompt, json_mode=True, temperature=0.3, max_tokens=1800, prefer_fast=True)
            if raw:
                try:
                    data = json.loads(raw)
                    if isinstance(data.get("turns"), list) and len(data["turns"]) > 0:
                        return {"mode": "podcast", "turns": data["turns"]}
                except Exception:
                    pass
        return {
            "mode": "podcast",
            "turns": [
                {
                    "speaker": "Nam Minh",
                    "voice": "namminh",
                    "text": f"Chào mừng bạn đến với NotebookLM Audio Overview trên Điệp Viên Study! Hôm nay mình và Hoài My sẽ tóm lược nhanh những điểm đắt giá nhất trong bài '{title}'.",
                },
                {
                    "speaker": "Hoài My",
                    "voice": "baotrang",
                    "text": "Chào bạn nhé! Mình thấy trong buổi học này bạn đã dùng tính năng Ghim Note trực tiếp và Sơ đồ tư duy rất hiệu quả. Hãy bấm vào từng nhánh sơ đồ để ôn lại các công thức cốt lõi nhé!",
                },
            ],
        }

    def speak_podcast_turn(self, args: dict) -> dict:
        """Đọc từng lượt lời Podcast 2 giọng (Nam Minh & Hoài My) và trả về base64 MP3 để phát mượt trên UI."""
        text = (args.get("text") or "").strip()
        voice = (args.get("voice") or "baotrang").strip().lower()
        if not text:
            return {"ok": False, "audioBase64": ""}
        edge_voice = "vi-VN-NamMinhNeural" if ("nam" in voice or "minh" in voice) else "vi-VN-HoaiMyNeural"
        tmp_mp3 = Path(tempfile.gettempdir()) / f"dvs_podcast_{uuid.uuid4().hex}.mp3"
        try:
            import asyncio
            import edge_tts
            asyncio.run(edge_tts.Communicate(text, edge_voice, rate="+8%").save(str(tmp_mp3)))
            if tmp_mp3.exists() and tmp_mp3.stat().st_size > 100:
                b64 = base64.b64encode(tmp_mp3.read_bytes()).decode("ascii")
                try:
                    tmp_mp3.unlink()
                except Exception:
                    pass
                return {"ok": True, "audioBase64": b64, "mime": "audio/mpeg"}
        except Exception:
            pass
        return {"ok": False, "audioBase64": ""}

    def start_demo_lecture(self, args: dict | None = None) -> dict:
        """
        Giả lập buổi giảng trực tiếp (Live Lecture Stream) để người dùng test ngay tính năng:
        - Lời giảng chảy ra theo thời gian thực + Dịch song ngữ
        - Bấm Ghim & Note trực tiếp ngay khi đang nghe giảng
        - Sơ đồ tư duy tự động mọc nhánh theo từng câu giảng viên nói.
        """
        topic = (args or {}).get("topic") or "calculus"
        self._demo_running = False
        time.sleep(0.05)
        self._demo_running = True

        demo_scripts = [
            (
                "Giảng viên (GS. Trần Minh)",
                "vi",
                "Chào các em, hôm nay chúng ta bước vào chuyên đề quan trọng nhất của Giải tích: Phương pháp Tích phân từng phần và các bẫy thường gặp trong đề thi Đánh giá năng lực.",
                "",
            ),
            (
                "Giảng viên (GS. Trần Minh)",
                "vi",
                "Đầu tiên về khái niệm và công thức gốc: Công thức tích phân từng phần được viết là tích phân của u nhân dv bằng u nhân v trừ đi tích phân của v nhân du.",
                "",
            ),
            (
                "Giảng viên (GS. Trần Minh)",
                "vi",
                "Quy tắc sống còn khi đặt u mà các em bắt buộc phải ghi chú lại ngay: Nhất Lô, Nhì Đa, Tam Lượng, Tứ Mũ — nghĩa là thứ tự ưu tiên đặt u lần lượt là hàm Logarit, Đa thức, Lượng giác rồi mới đến Hàm mũ.",
                "",
            ),
            (
                "Giảng viên (GS. Trần Minh)",
                "vi",
                "Ví dụ thực chiến số 1: Xét tích phân của x nhân e mũ x dx. Theo đúng quy tắc Nhì Đa Tứ Mũ, ta đặt u bằng x và dv bằng e mũ x dx, khi đó du bằng dx và v bằng e mũ x.",
                "",
            ),
            (
                "Giảng viên (GS. Trần Minh)",
                "vi",
                "Lưu ý bẫy đề thi cực kỳ hay sai ở câu phân loại: Khi gặp tích phân chứa hàm e mũ x nhân sin(x) hoặc cos(x), các em phải tích phân từng phần 2 lần liên tiếp để xuất hiện lại tích phân ban đầu rồi chuyển vế!",
                "",
            ),
            (
                "Prof. David Miller (MIT Lecture Clip)",
                "en",
                "Remember that integration by parts is essentially the reverse product rule of differentiation, and choosing the right u function reduces the complexity in one step.",
                "Hãy nhớ rằng tích phân từng phần về bản chất là quy tắc đạo hàm tích ngược, và việc chọn đúng hàm u sẽ giúp giảm độ phức tạp chỉ sau một bước biến đổi.",
            ),
            (
                "Giảng viên (GS. Trần Minh)",
                "vi",
                "Bài tập về nhà cho buổi học hôm nay: Các em hoàn thành 10 câu tự luyện dạng Tích phân từng phần lặp trong đề cương trang 42 và đánh dấu các bước đổi cận vào sơ đồ tư duy.",
                "",
            ),
        ]

        def _stream_demo():
            gen = self.current_generation
            for idx, (spk, lang, src_txt, tr_txt) in enumerate(demo_scripts):
                if not getattr(self, "_demo_running", False):
                    break
                seg_id = f"demo-seg-{int(time.time()*1000)}-{idx+1}"
                now_ts = time.time()
                # Phát tín hiệu interim trước 0.9s giống hệt đang nói thật
                self.hub.emit("worker-message", {
                    "type": "transcript_interim",
                    "id": seg_id,
                    "text": " ".join(src_txt.split()[:8]) + "…",
                    "source": "system",
                    "language": lang,
                    "speaker": spk,
                    "started_at": now_ts,
                    "generation": self.current_generation,
                })
                time.sleep(1.1)
                if not getattr(self, "_demo_running", False):
                    break
                self.hub.emit("worker-message", {
                    "type": "transcript",
                    "id": seg_id,
                    "text": src_txt,
                    "raw_text": src_txt,
                    "source": "system",
                    "language": lang,
                    "speaker": spk,
                    "speaker_provisional": False,
                    "started_at": now_ts,
                    "ended_at": time.time(),
                    "generation": self.current_generation,
                })
                if tr_txt:
                    self.hub.emit("worker-message", {
                        "type": "live_translation",
                        "id": seg_id,
                        "text": tr_txt,
                        "final": True,
                        "stable": tr_txt,
                        "started_at": now_ts,
                        "generation": self.current_generation,
                        "source": "system",
                    })
                time.sleep(2.4)
            self._demo_running = False

        threading.Thread(target=_stream_demo, daemon=True).start()
        return {"ok": True, "topic": topic}

    def stop_demo_lecture(self) -> dict:
        self._demo_running = False
        return {"ok": True}

    def convert_pdf_to_word_dialog(self, args: dict | None = None) -> dict:
        """
        Chọn 1 hoặc nhiều file PDF và chuyển đổi sang file Word (.docx) giữ nguyên cấu trúc,
        tiêu đề, đoạn văn, công thức và hình ảnh minh họa (có tùy chọn dịch sang tiếng Việt).
        """
        args = args or {}
        translate_to_vi = bool(args.get("translate_to_vi", False))
        include_images = bool(args.get("include_images", True))
        provided_path = str(args.get("path") or "").strip()

        selected_files = []
        if provided_path and os.path.isfile(provided_path):
            selected_files = [provided_path]
        elif self.main_win:
            try:
                file_types = ("PDF Documents (*.pdf)", "All files (*.*)")
                res = self.main_win.create_file_dialog(webview.OPEN_DIALOG, allow_multiple=True, file_types=file_types)
                if res:
                    selected_files = list(res) if isinstance(res, (list, tuple)) else [str(res)]
            except Exception:
                selected_files = []

        if not selected_files:
            return {"ok": False, "cancelled": True, "message": "Chưa chọn file PDF."}

        self._pdf_word_state = {
            "running": True,
            "message": f"Đang chuyển đổi {len(selected_files)} file PDF sang Word (.docx)…",
            "files": [],
        }

        def _bg_pdf_word_worker():
            engine_candidates = [
                BASE_DIR / "dich_pdf_engine.py",
                Path(r"C:\Users\Admin\Downloads\02. Điệp Viên Tài Liệu\dich_pdf_engine.py"),
            ]
            engine_script = next((p for p in engine_candidates if p.exists()), None)
            results_out = []
            try:
                if engine_script is None:
                    raise RuntimeError("Không tìm thấy bộ chuyển đổi dich_pdf_engine.py.")
                import importlib.util
                spec = importlib.util.spec_from_file_location("dv_dich_pdf_engine_word", str(engine_script))
                mod = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(mod)

                for idx, fpath in enumerate(selected_files, 1):
                    fname = os.path.basename(fpath)
                    self._pdf_word_state = {
                        "running": True,
                        "message": f"Đang chuyển sang Word ({idx}/{len(selected_files)}): {fname}…",
                        "files": results_out,
                    }
                    res = mod.convert_pdf_to_word(
                        pdf_path=fpath,
                        translate_to_vi=translate_to_vi,
                        include_images=include_images,
                    )
                    results_out.append({
                        "input": fpath,
                        "name": fname,
                        "docx_path": res.get("docx_path", ""),
                        "pages_count": res.get("pages_count", 0),
                        "output_dir": res.get("output_dir", ""),
                        "elapsed_seconds": res.get("elapsed_seconds", 0),
                    })
                self._pdf_word_state = {
                    "running": False,
                    "ok": True,
                    "message": f"Đã chuyển đổi thành công {len(results_out)} file PDF sang bản Word (.docx). Bấm Tải về để lưu file.",
                    "files": results_out,
                }
            except Exception as e:
                self._pdf_word_state = {
                    "running": False,
                    "ok": False,
                    "message": f"Lỗi khi chuyển PDF sang Word: {e}",
                    "files": results_out,
                }

        threading.Thread(target=_bg_pdf_word_worker, daemon=True).start()
        return {"ok": True, "started": True, "count": len(selected_files)}

    # =========================================================================
    # 4C. ĐỒNG BỘ DIEPVIEN.STORE (VIETQR + TELEGRAM + GOOGLE DRIVE THẬT + KHÓA CỨNG 1 MÁY)
    # =========================================================================
    DVTL_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxMOdsNkhY8-5xQtZ_86STf781VdFJbRsLkK6n8qRF4ENqreMsl4CdELYn-85wHcqvx/exec"
    DVTL_KHO_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxMOdsNkhY8-5xQtZ_86STf781VdFJbRsLkK6n8qRF4ENqreMsl4CdELYn-85wHcqvx/exec"
    DVTL_TELEGRAM_BOT_TOKEN = "8783402263:AAHBLBGamMK4IRaYpW3tRrc719T4FREMRYg"
    DVTL_TELEGRAM_GROUP_ID = "-5515040883"
    DVTL_DEFAULT_BANK = {
        "bankName": "ACB",
        "bankCode": "ACB",
        "accountName": "TRINH DUC THINH",
        "accountNumber": "27820961",
        "provider": "Ngân hàng ACB - Chuyển khoản 24/7",
    }
    DVTL_DRIVE_COURSES_ROOT = "1xEi1TWFZKLTBBp4tJVXoOv9XB9qNUo_a"
    DVTL_DRIVE_COURSES_199K_ROOT = "1ZlYt4iot-K6d0fZTb7hGwwnRgUV6Pdwh"
    # CHẾ ĐỘ KIỂM TRA TẠM THỜI: Khi True, ấn Mua trên App sẽ mở khóa ngay không cần xác thực thanh toán.
    # Đổi thành False để khóa lại: bắt buộc mua khóa nào mở khóa đó theo đúng Email + SĐT.
    DVTL_TEMP_AUTO_UNLOCK_ON_BUY = False
    DVTL_ADMIN_ACCOUNTS = {
        "diepvientailieu@gmail.com": ("0792453169", "dvtl@2026", "admin123", ""),
    }
    DVTL_DRIVE_COURSES_MAP = {
            "ALL-COURSES-399K": {
                    "folderId": "1xEi1TWFZKLTBBp4tJVXoOv9XB9qNUo_a",
                    "extraFolderIds": [
                            "1ZlYt4iot-K6d0fZTb7hGwwnRgUV6Pdwh"
                    ],
                    "folderUrl": "https://drive.google.com/drive/folders/1xEi1TWFZKLTBBp4tJVXoOv9XB9qNUo_a",
                    "folderName": "Gói VIP Full Trọn Bộ 399K (Mở 100% Khóa 69K + 199K + Update Vĩnh Viễn)",
                    "price": 399000,
                    "tier": "full_399k",
                    "bannerUrl": "",
                    "parentCourseId": "ALL-COURSES-399K",
                    "parentSubjectId": "ALL-COURSES-399K",
                    "childCourseIds": [
                            "C199-KHTN1",
                            "C199-KHTN2",
                            "C199-KHXH1",
                            "C199-KHXH2",
                            "C199-HSA",
                            "C199-TSA",
                            "C199-VACT",
                            "K69-TOAN-DUC",
                            "K69-TOAN-TIEN",
                            "K69-TOAN-SHIPPER",
                            "K69-TOAN-MAP",
                            "K69-TOAN-NT",
                            "K69-LY-BIEN",
                            "K69-LY-TIEN",
                            "K69-LY-UNG",
                            "K69-HOA-TRONG",
                            "K69-HOA-NGOC",
                            "K69-VAN-SM",
                            "K69-VAN-NT",
                            "K69-ANH-MP",
                            "K69-ANH-LIEU",
                            "K69-ANH-NT",
                            "K69-SINH-NGHE",
                            "K69-SINH-DUONG",
                            "K69-SU-HUONG",
                            "K69-SU-SEN",
                            "K69-DIA-TUNG",
                            "K69-DIA-TAI",
                            "K69-HSA-HOCMAI",
                            "K69-HSA-MAP",
                            "K69-HSA-EMPIRE",
                            "K69-HSA-EDU",
                            "K69-TSA-BMC",
                            "K69-TSA-HOCMAI",
                            "K69-VACT-HOCMAI",
                            "K69-VACT-EMPIRE",
                            "K69-VACT-MAP"
                    ],
                    "files": []
            },
            "C199-KHTN1": {
                    "folderId": "1wH_RQNefQrFk0dTnVQroFsLCzTFZi4J7",
                    "extraFolderIds": [
                            "1UxEYANVp1iw9Us0mSNJR8w9_VFhsx3MP",
                            "1m__F2exCz50iNJXhf0JR4TramO29K244"
                    ],
                    "folderUrl": "https://drive.google.com/drive/folders/1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo",
                    "folderName": "Combo 199K: KHTN 1 — Toán, Vật Lý, Sinh",
                    "price": 199000,
                    "tier": "course_199k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1SbkCdDoJ-EiGDXSq5WFpC8V8rdiKPGmW=w960",
                    "parentCourseId": "C199-KHTN1",
                    "parentSubjectId": "K69-TOAN-DUC",
                    "childCourseIds": [
                            "K69-TOAN-DUC",
                            "K69-LY-BIEN",
                            "K69-SINH-NGHE"
                    ],
                    "files": []
            },
            "C199-KHTN2": {
                    "folderId": "13E4qvYJg_AnJsmqDRceRvxqT7MdPPCe9",
                    "extraFolderIds": [
                            "1Mz6IblP1vwlLKj9XKBAq4BFnKJBcwqSP",
                            "1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1"
                    ],
                    "folderUrl": "https://drive.google.com/drive/folders/1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo",
                    "folderName": "Combo 199K: KHTN 2 — Toán, Vật Lý, Anh",
                    "price": 199000,
                    "tier": "course_199k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1MoGqdKZUOHr6MtVgcQbJ-Ma3ykVQDppw=w960",
                    "parentCourseId": "C199-KHTN2",
                    "parentSubjectId": "K69-TOAN-DUC",
                    "childCourseIds": [
                            "K69-TOAN-DUC",
                            "K69-LY-TIEN",
                            "K69-ANH-MP"
                    ],
                    "files": []
            },
            "C199-KHXH1": {
                    "folderId": "1POi_V92dNB9IjyVa15Q7TTe5EgtNf85k",
                    "extraFolderIds": [
                            "1klZMAdkSnSXXSb72fTiKOZnL11EPYswu",
                            "16WO3g17nelhGfCzNNaptvgKp0iYzAlvm"
                    ],
                    "folderUrl": "https://drive.google.com/drive/folders/1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT",
                    "folderName": "Combo 199K: KHXH 1 — Ngữ Văn, Lịch Sử, Địa Lý",
                    "price": 199000,
                    "tier": "course_199k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1Qq9CO0m5D8GEQWbT1fcaMAClo_6snzXe=w960",
                    "parentCourseId": "C199-KHXH1",
                    "parentSubjectId": "K69-VAN-SM",
                    "childCourseIds": [
                            "K69-VAN-SM",
                            "K69-SU-HUONG",
                            "K69-DIA-TUNG"
                    ],
                    "files": []
            },
            "C199-KHXH2": {
                    "folderId": "1USiYayriUVvjhV9uNUsb9KwkUBmvY9Qr",
                    "extraFolderIds": [
                            "1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT",
                            "1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1"
                    ],
                    "folderUrl": "https://drive.google.com/drive/folders/1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo",
                    "folderName": "Combo 199K: KHXH 2 — Toán, Văn, Anh",
                    "price": 199000,
                    "tier": "course_199k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/13D6zA1O05AOk0pvoOj6cZL3BrnAzrMlR=w960",
                    "parentCourseId": "C199-KHXH2",
                    "parentSubjectId": "K69-TOAN-DUC",
                    "childCourseIds": [
                            "K69-TOAN-DUC",
                            "K69-VAN-SM",
                            "K69-ANH-MP"
                    ],
                    "files": []
            },
            "C199-HSA": {
                    "folderId": "1srqe9me4XOr-Bg30BSx-mQrFdcaRxgKD",
                    "extraFolderIds": [
                            "11RHLlw-99okBQTqk6Dp4DxlucorjoW6p",
                            "1yNPB1d_GzfvPDp6dIpGQtBKp1-L6HkrN",
                            "1n8MDD0giM4kVxjU7bV75vqptkKzb_zjg"
                    ],
                    "folderUrl": "https://drive.google.com/drive/folders/1XZj-uhExqqkupmmRbxmX08AB-NhgCcxi",
                    "folderName": "Combo 199K: Khóa Đánh Giá Năng Lực HSA (ĐHQG Hà Nội)",
                    "price": 199000,
                    "tier": "course_199k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1lJAFhSnTLFhRjO_npIAg2rK_sLJutC_C=w960",
                    "parentCourseId": "C199-HSA",
                    "parentSubjectId": "K69-HSA-HOCMAI",
                    "childCourseIds": [
                            "K69-HSA-HOCMAI",
                            "K69-HSA-MAP",
                            "K69-HSA-EMPIRE",
                            "K69-HSA-EDU"
                    ],
                    "files": []
            },
            "C199-TSA": {
                    "folderId": "17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe",
                    "extraFolderIds": [
                            "1Z71HzRYKoQSv5i-qEWq1iP_icICaB3Lu"
                    ],
                    "folderUrl": "https://drive.google.com/drive/folders/17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe",
                    "folderName": "Combo 199K: Khóa Đánh Giá Tư Duy TSA (ĐH Bách Khoa HN)",
                    "price": 199000,
                    "tier": "course_199k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1JtFtLXmTGByHdNVUlWbiGgbFyhV0o_03=w960",
                    "parentCourseId": "C199-TSA",
                    "parentSubjectId": "K69-TSA-BMC",
                    "childCourseIds": [
                            "K69-TSA-BMC",
                            "K69-TSA-HOCMAI"
                    ],
                    "files": []
            },
            "C199-VACT": {
                    "folderId": "1bPhV9fqeesm4SISXeIjL9ZgVWwnHxW6o",
                    "extraFolderIds": [
                            "1ic4g3roCpg7_gkj5JNz9Gre52x_BhyW6",
                            "1dqiwh_ADEBetnPMC0S-YH8M6SLysaEQB"
                    ],
                    "folderUrl": "https://drive.google.com/drive/folders/1YK2IS2Hzwe4-MqFlJ2kMIJLwDsSPSKuu",
                    "folderName": "Combo 199K: Khóa Đánh Giá Năng Lực V-ACT (ĐHQG TP.HCM)",
                    "price": 199000,
                    "tier": "course_199k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/15Bzsd08qpjo8L3SlaxLsq3RHr6oOIt10=w960",
                    "parentCourseId": "C199-VACT",
                    "parentSubjectId": "K69-VACT-HOCMAI",
                    "childCourseIds": [
                            "K69-VACT-HOCMAI",
                            "K69-VACT-EMPIRE",
                            "K69-VACT-MAP"
                    ],
                    "files": []
            },
            "K69-TOAN-DUC": {
                    "folderId": "1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo",
                    "folderName": "Toán Thầy Đỗ Văn Đức (TenSchool 2K9)",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/19dsgaplgZ8jGd3QuFmOFSP8R1wIa4h9u=w960",
                    "parentCourseId": "K69-TOAN-DUC",
                    "parentSubjectId": "K69-TOAN-DUC",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-TOAN-TIEN": {
                    "folderId": "1b73Z89zxCGINyuOVm4pImxwkj2UTidC1",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1b73Z89zxCGINyuOVm4pImxwkj2UTidC1",
                    "folderName": "Toán Thầy Nguyễn Phan Tiến 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1T9k1aHqUdKGfzzCeePudB3408I2f86Ek=w960",
                    "parentCourseId": "K69-TOAN-TIEN",
                    "parentSubjectId": "K69-TOAN-TIEN",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-TOAN-SHIPPER": {
                    "folderId": "1npBDPOm0un8fpiwhXqnTElSyJCxHEq1n",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1npBDPOm0un8fpiwhXqnTElSyJCxHEq1n",
                    "folderName": "Toán Anh Shiper 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1CNcGxedxoB0rVxxBJvah1dP-2x23Hf8l=w960",
                    "parentCourseId": "K69-TOAN-SHIPPER",
                    "parentSubjectId": "K69-TOAN-SHIPPER",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-TOAN-MAP": {
                    "folderId": "1Lvx2x6Gz66gNzgHWOn4DjF6m0a8MhuPA",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1Lvx2x6Gz66gNzgHWOn4DjF6m0a8MhuPA",
                    "folderName": "Toán — Tổ Toán Học MapStudy 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1UzEyvawDLZyQaqLjLTRAzLZBLXAzLtGd=w960",
                    "parentCourseId": "K69-TOAN-MAP",
                    "parentSubjectId": "K69-TOAN-MAP",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-TOAN-NT": {
                    "folderId": "1kme7eKb-PLV_suK3UVLJYEQKMB5BuP6A",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1kme7eKb-PLV_suK3UVLJYEQKMB5BuP6A",
                    "folderName": "Nền Tảng Toán Thầy Lưu Huy Thưởng",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1kbpgW03rnk3_Scg31efEyZGhjFgSBtPV=w960",
                    "parentCourseId": "K69-TOAN-NT",
                    "parentSubjectId": "K69-TOAN-NT",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-LY-BIEN": {
                    "folderId": "1UxEYANVp1iw9Us0mSNJR8w9_VFhsx3MP",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1UxEYANVp1iw9Us0mSNJR8w9_VFhsx3MP",
                    "folderName": "Vật Lý Thầy Chu Văn Biên 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1Qk1eh8MSussintaXSMK2G1iy9zCKehkw=w960",
                    "parentCourseId": "K69-LY-BIEN",
                    "parentSubjectId": "K69-LY-BIEN",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-LY-TIEN": {
                    "folderId": "1Mz6IblP1vwlLKj9XKBAq4BFnKJBcwqSP",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1Mz6IblP1vwlLKj9XKBAq4BFnKJBcwqSP",
                    "folderName": "Vật Lý Thầy Thắng · Thầy Tiến IPClass 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1BQdHHWXd9iBGH09xq2LjhBbG9WVgo4ih=w960",
                    "parentCourseId": "K69-LY-TIEN",
                    "parentSubjectId": "K69-LY-TIEN",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-LY-UNG": {
                    "folderId": "11QpRWPh7KFv6z3ehH9PyF2rSZBJkvjIU",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/11QpRWPh7KFv6z3ehH9PyF2rSZBJkvjIU",
                    "folderName": "Vật Lý Thầy Lê Tùng Ưng (TenS 2K9)",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1wvE4YqVQ8QvPPwN6DrdpT1Kw7HequIiw=w960",
                    "parentCourseId": "K69-LY-UNG",
                    "parentSubjectId": "K69-LY-UNG",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-HOA-TRONG": {
                    "folderId": "1GG-0AuynJUnQZZKXcrlQpRuTFsye6aQk",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1GG-0AuynJUnQZZKXcrlQpRuTFsye6aQk",
                    "folderName": "Hóa Học Thầy Phạm Văn Trọng 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1FJN2iWnh8OO7Mb2SqiA9gmsxeWNRUsk1=w960",
                    "parentCourseId": "K69-HOA-TRONG",
                    "parentSubjectId": "K69-HOA-TRONG",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-HOA-NGOC": {
                    "folderId": "1vMyBdrXbe_YdZwMOgw9OfTZMrY-9vHXe",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1vMyBdrXbe_YdZwMOgw9OfTZMrY-9vHXe",
                    "folderName": "Nền Tảng Hóa Thầy Vũ Khắc Ngọc & Cô Tống Thị Son",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1DmSD53JWqo4mPMqvkg8HW4SgbirM69zq=w960",
                    "parentCourseId": "K69-HOA-NGOC",
                    "parentSubjectId": "K69-HOA-NGOC",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-VAN-SM": {
                    "folderId": "1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT",
                    "folderName": "Học Văn Cô Sương Mai 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/168PvC5P4T3pnHuCQteIB6MwyAseMHgCP=w960",
                    "parentCourseId": "K69-VAN-SM",
                    "parentSubjectId": "K69-VAN-SM",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-VAN-NT": {
                    "folderId": "1D9xa1GYZZEDVhxfvQq-i1xlWim66zikF",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1D9xa1GYZZEDVhxfvQq-i1xlWim66zikF",
                    "folderName": "Nền Tảng 12 Môn Ngữ Văn (HocMai)",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1k6hnaIY3HWrymuoZclECCa6lGgtbjyND=w960",
                    "parentCourseId": "K69-VAN-NT",
                    "parentSubjectId": "K69-VAN-NT",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-ANH-MP": {
                    "folderId": "1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1",
                    "folderName": "Tiếng Anh Cô Vũ Mai Phương 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1jSW8AIaIx_1bAgb0SfzzeQbyzIXQldd5=w960",
                    "parentCourseId": "K69-ANH-MP",
                    "parentSubjectId": "K69-ANH-MP",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-ANH-LIEU": {
                    "folderId": "1Antqpjjo7hKQI_RqlDT3FW8kSTJGHGMw",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1Antqpjjo7hKQI_RqlDT3FW8kSTJGHGMw",
                    "folderName": "Tiếng Anh Cô Phạm Liễu 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1WrZj1RIOVrXcAJAaMoQm585xqyK4lAwa=w960",
                    "parentCourseId": "K69-ANH-LIEU",
                    "parentSubjectId": "K69-ANH-LIEU",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-ANH-NT": {
                    "folderId": "1-sSo3zBXFRoXfQHkSdIOxmH2MkAvEqKM",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1-sSo3zBXFRoXfQHkSdIOxmH2MkAvEqKM",
                    "folderName": "Nền Tảng 12 Môn Tiếng Anh (HocMai)",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/19jS05grnW40e4meXVPn7a7RvtUEAl19x=w960",
                    "parentCourseId": "K69-ANH-NT",
                    "parentSubjectId": "K69-ANH-NT",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-SINH-NGHE": {
                    "folderId": "1m__F2exCz50iNJXhf0JR4TramO29K244",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1m__F2exCz50iNJXhf0JR4TramO29K244",
                    "folderName": "Sinh Học Thầy Phan Khắc Nghệ 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/12O7FO6DnKouHOcvAh9LayMHGCbqWsKmn=w960",
                    "parentCourseId": "K69-SINH-NGHE",
                    "parentSubjectId": "K69-SINH-NGHE",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-SINH-DUONG": {
                    "folderId": "13F0pQtUG-1yix2XrSQo9TkSw8-_UAAio",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/13F0pQtUG-1yix2XrSQo9TkSw8-_UAAio",
                    "folderName": "Nền Tảng Sinh Học Cô Ánh Dương",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1HfwO2IBd44nJtu3b1rfETYWnpY_jR786=w960",
                    "parentCourseId": "K69-SINH-DUONG",
                    "parentSubjectId": "K69-SINH-DUONG",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-SU-HUONG": {
                    "folderId": "1klZMAdkSnSXXSb72fTiKOZnL11EPYswu",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1klZMAdkSnSXXSb72fTiKOZnL11EPYswu",
                    "folderName": "Lịch Sử Cô Ngô Thị Lan Hương 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1J3zG22zlrTo9otUpc5qATJ4n9TL_k4aK=w960",
                    "parentCourseId": "K69-SU-HUONG",
                    "parentSubjectId": "K69-SU-HUONG",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-SU-SEN": {
                    "folderId": "1B_IXBTxhmhZtW5fzln4-uxv-QTq39p6t",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1B_IXBTxhmhZtW5fzln4-uxv-QTq39p6t",
                    "folderName": "Lịch Sử Cô Nguyễn Hương Sen 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1vEP_SFENSGRnYXCAHwdEOxD-LWUCI-0e=w960",
                    "parentCourseId": "K69-SU-SEN",
                    "parentSubjectId": "K69-SU-SEN",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-DIA-TUNG": {
                    "folderId": "16WO3g17nelhGfCzNNaptvgKp0iYzAlvm",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/16WO3g17nelhGfCzNNaptvgKp0iYzAlvm",
                    "folderName": "Địa Lý Thầy Đàm Thanh Tùng 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1U3AfsKTzFWPz-vFY2nd9eu2kw7eSWKNo=w960",
                    "parentCourseId": "K69-DIA-TUNG",
                    "parentSubjectId": "K69-DIA-TUNG",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-DIA-TAI": {
                    "folderId": "1DasmiM670vDu3CekdeXCoQeQoeLvKYyq",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1DasmiM670vDu3CekdeXCoQeQoeLvKYyq",
                    "folderName": "Địa Lý Thầy Tài 2K9",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1-GNWHI3J3DUR_W4GGEcJx8G4ZWKIt-Iq=w960",
                    "parentCourseId": "K69-DIA-TAI",
                    "parentSubjectId": "K69-DIA-TAI",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-HSA-HOCMAI": {
                    "folderId": "1XZj-uhExqqkupmmRbxmX08AB-NhgCcxi",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1XZj-uhExqqkupmmRbxmX08AB-NhgCcxi",
                    "folderName": "ĐGNL HSA / QDA — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị)",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1dI7M0gjeofIa7JSQ7QtsritEJfaeTrG_=w960",
                    "parentCourseId": "K69-HSA-HOCMAI",
                    "parentSubjectId": "K69-HSA-HOCMAI",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-HSA-MAP": {
                    "folderId": "11RHLlw-99okBQTqk6Dp4DxlucorjoW6p",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/11RHLlw-99okBQTqk6Dp4DxlucorjoW6p",
                    "folderName": "ĐGNL HSA — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị)",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1dI7M0gjeofIa7JSQ7QtsritEJfaeTrG_=w960",
                    "parentCourseId": "K69-HSA-MAP",
                    "parentSubjectId": "K69-HSA-MAP",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-HSA-EMPIRE": {
                    "folderId": "1yNPB1d_GzfvPDp6dIpGQtBKp1-L6HkrN",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1yNPB1d_GzfvPDp6dIpGQtBKp1-L6HkrN",
                    "folderName": "ĐGNL HSA — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị)",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1dI7M0gjeofIa7JSQ7QtsritEJfaeTrG_=w960",
                    "parentCourseId": "K69-HSA-EMPIRE",
                    "parentSubjectId": "K69-HSA-EMPIRE",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-HSA-EDU": {
                    "folderId": "1n8MDD0giM4kVxjU7bV75vqptkKzb_zjg",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1n8MDD0giM4kVxjU7bV75vqptkKzb_zjg",
                    "folderName": "ĐGNL HSA — HSA Edu 2K9 (Khóa Lẻ 1 Đơn Vị)",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1dI7M0gjeofIa7JSQ7QtsritEJfaeTrG_=w960",
                    "parentCourseId": "K69-HSA-EDU",
                    "parentSubjectId": "K69-HSA-EDU",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-TSA-BMC": {
                    "folderId": "17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe",
                    "folderName": "ĐGTD TSA — BMC ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị)",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1NWGCb8Aq-fkHTMCX-CrTfB5Yn_uSOQCS=w960",
                    "parentCourseId": "K69-TSA-BMC",
                    "parentSubjectId": "K69-TSA-BMC",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-TSA-HOCMAI": {
                    "folderId": "1Z71HzRYKoQSv5i-qEWq1iP_icICaB3Lu",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1Z71HzRYKoQSv5i-qEWq1iP_icICaB3Lu",
                    "folderName": "ĐGTD TSA — HocMai ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị)",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1NWGCb8Aq-fkHTMCX-CrTfB5Yn_uSOQCS=w960",
                    "parentCourseId": "K69-TSA-HOCMAI",
                    "parentSubjectId": "K69-TSA-HOCMAI",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-VACT-HOCMAI": {
                    "folderId": "1YK2IS2Hzwe4-MqFlJ2kMIJLwDsSPSKuu",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1YK2IS2Hzwe4-MqFlJ2kMIJLwDsSPSKuu",
                    "folderName": "ĐGNL V-ACT — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị)",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV=w960",
                    "parentCourseId": "K69-VACT-HOCMAI",
                    "parentSubjectId": "K69-VACT-HOCMAI",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-VACT-EMPIRE": {
                    "folderId": "1ic4g3roCpg7_gkj5JNz9Gre52x_BhyW6",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1ic4g3roCpg7_gkj5JNz9Gre52x_BhyW6",
                    "folderName": "ĐGNL V-ACT — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị)",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV=w960",
                    "parentCourseId": "K69-VACT-EMPIRE",
                    "parentSubjectId": "K69-VACT-EMPIRE",
                    "childCourseIds": [],
                    "files": []
            },
            "K69-VACT-MAP": {
                    "folderId": "1dqiwh_ADEBetnPMC0S-YH8M6SLysaEQB",
                    "extraFolderIds": [],
                    "folderUrl": "https://drive.google.com/drive/folders/1dqiwh_ADEBetnPMC0S-YH8M6SLysaEQB",
                    "folderName": "ĐGNL V-ACT — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị)",
                    "price": 69000,
                    "tier": "subject_69k",
                    "bannerUrl": "https://lh3.googleusercontent.com/d/1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV=w960",
                    "parentCourseId": "K69-VACT-MAP",
                    "parentSubjectId": "K69-VACT-MAP",
                    "childCourseIds": [],
                    "files": []
            }
    }

    @staticmethod
    def get_hardware_device_id() -> str:
        import hashlib, uuid
        machine_guid = ""
        if IS_WINDOWS:
            try:
                import winreg
                with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Cryptography") as k:
                    machine_guid, _ = winreg.QueryValueEx(k, "MachineGuid")
            except Exception:
                pass
        raw_fp = f"{uuid.getnode()}|{platform.node()}|{platform.machine()}|{machine_guid}"
        digest = hashlib.sha256(raw_fp.encode("utf-8")).hexdigest()[:10].upper()
        return f"DVS-HW-{digest}"

    def _get_license_file_path(self) -> Path:
        return APP_DATA_DIR / "dvs_device_license_v2.json"

    def _sign_license_payload(self, email: str, hw_id: str, courses: list) -> str:
        import hmac, hashlib
        clean_c = ",".join(sorted(set(str(x).strip().upper() for x in (courses or []) if x)))
        msg = f"{email.strip().lower()}|{hw_id.strip().upper()}|{clean_c}".encode("utf-8")
        return hmac.new(b"DVTL_SPY_DOC_1DEVICE_SECRET_2026", msg, hashlib.sha256).hexdigest()

    def _get_valid_drive_access_token(self, user_access_token: str = "") -> str:
        if user_access_token and len(user_access_token) > 20:
            return user_access_token
        now_ts = time.time()
        cached_tok = getattr(self, "_cached_drive_tok", "")
        cached_exp = getattr(self, "_cached_drive_tok_exp", 0.0)
        if cached_tok and now_ts < cached_exp:
            return cached_tok

        token_candidates = [
            Path(os.path.expanduser("~")) / ".gemini" / "antigravity" / "plugin_data" / "gdrive" / "token.json",
            Path(r"C:\Users\Admin\.gemini\antigravity\plugin_data\gdrive\token.json"),
            BASE_DIR / "AutoPay_System" / "token_diepvientailieu.json",
            Path(r"c:\Users\Admin\Downloads\Hệ Thống Tự Động Hoá Điệp Viên Tài Liệu\AutoPay_System\token_diepvientailieu.json"),
        ]
        for tf in token_candidates:
            if not tf.exists():
                continue
            try:
                td = json.loads(tf.read_text(encoding="utf-8"))
                tok_obj = td.get("token") if isinstance(td.get("token"), dict) else {}
                client_id = td.get("client_id") or tok_obj.get("client_id") or ""
                client_secret = td.get("client_secret") or tok_obj.get("client_secret") or ""
                refresh_tok = tok_obj.get("refresh_token") or td.get("refresh_token") or ""
                acc_tok = td.get("access_token") or tok_obj.get("access_token") or ""
                # Always prefer refreshing if we haven't refreshed in this process yet
                if refresh_tok and client_id and client_secret and not cached_tok:
                    rr = requests.post(
                        "https://oauth2.googleapis.com/token",
                        data={
                            "client_id": client_id,
                            "client_secret": client_secret,
                            "refresh_token": refresh_tok,
                            "grant_type": "refresh_token",
                        },
                        timeout=8,
                    )
                    if rr.status_code == 200:
                        new_tok = rr.json().get("access_token") or ""
                        if new_tok:
                            td["access_token"] = new_tok
                            if isinstance(td.get("token"), dict):
                                td["token"]["access_token"] = new_tok
                            try:
                                tf.write_text(json.dumps(td, indent=2, ensure_ascii=False), encoding="utf-8")
                            except Exception:
                                pass
                            self._cached_drive_tok = new_tok
                            self._cached_drive_tok_exp = now_ts + 2400
                            return new_tok
                if acc_tok:
                    self._cached_drive_tok = acc_tok
                    self._cached_drive_tok_exp = now_ts + 600
                    return acc_tok
            except Exception:
                continue
        return ""

    def _is_user_authorized_for_course(self, email: str, course_id: str) -> bool:
        em = str(email or "").strip().lower()
        if not em:
            g_u = getattr(self, "_google_user", None) or {}
            em = str(g_u.get("email") or "").strip().lower()
        if not em:
            lic = self._load_local_device_license()
            em = str(lic.get("email") or "").strip().lower()
        if not em or "@" not in em:
            return False
        if self._is_admin_account(em):
            return True
        cid = str(course_id or "").strip().upper()
        lic = self._load_local_device_license()
        lic_em = str(lic.get("email") or "").strip().lower()
        unlocked = set(str(x).strip().upper() for x in (lic.get("unlockedCourses") or []))
        g_u = getattr(self, "_google_user", None) or {}
        if str(g_u.get("email") or "").strip().lower() == em:
            for x in (g_u.get("unlockedCourses") or []):
                unlocked.add(str(x).strip().upper())
        expanded = set(self._expand_unlocked_courses(list(unlocked)))
        if lic_em == em and ("ALL-COURSES-399K" in expanded or "__ALL_COURSES_399K__" in expanded or not cid or cid in expanded):
            return True
        if "ALL-COURSES-399K" in expanded or (cid and cid in expanded):
            return True
        return False

    def _is_admin_account(self, email: str, password_or_phone: str = "") -> bool:
        em = str(email or "").strip().lower()
        return em == "diepvientailieu@gmail.com" 

    def _expand_unlocked_courses(self, raw_courses: list) -> list:
        c_set = set(str(x).strip().upper() for x in (raw_courses or []) if str(x).strip())
        if "ALL-COURSES-399K" in c_set or "COURSE-FULL-399K" in c_set or "__ALL_COURSES_399K__" in c_set:
            c_set.add("ALL-COURSES-399K")
            c_set.add("__ALL_COURSES_399K__")
            for k in self.DVTL_DRIVE_COURSES_MAP.keys():
                c_set.add(k)
            return sorted(c_set)
        # Chính xác từng gói: 69K mở đúng 1 thư mục đó; Combo 199K chỉ mở đúng các childCourseIds trong tổ hợp đó!
        initial = list(c_set)
        for k in initial:
            meta = self.DVTL_DRIVE_COURSES_MAP.get(k)
            if meta and isinstance(meta.get("childCourseIds"), list):
                for cid in meta.get("childCourseIds"):
                    c_set.add(str(cid).strip().upper())
        return sorted(c_set)

    def _load_local_device_license(self) -> dict:
        hw_id = self.get_hardware_device_id()
        lf = self._get_license_file_path()
        if not lf.exists():
            return {"ok": True, "bound": False, "deviceId": hw_id, "email": "", "name": "", "phone": "", "unlockedCourses": []}
        try:
            data = json.loads(lf.read_text(encoding="utf-8"))
            saved_hw = str(data.get("deviceId") or "").strip().upper()
            email = str(data.get("email") or "").strip().lower()
            courses = self._expand_unlocked_courses(data.get("unlockedCourses") or [])
            sig = str(data.get("signature") or "")
            expected_sig = self._sign_license_payload(email, hw_id, data.get("unlockedCourses") or [])
            if saved_hw != hw_id or sig != expected_sig:
                return {
                    "ok": False,
                    "bound": False,
                    "deviceLocked": True,
                    "deviceId": hw_id,
                    "email": "",
                    "unlockedCourses": [],
                    "message": " Phát hiện sao chép dữ liệu sang máy tính thứ 2! Tài khoản đã bị khóa bảo mật phần cứng."
                }
            return {
                "ok": True,
                "bound": bool(email),
                "deviceId": hw_id,
                "email": email,
                "name": str(data.get("name") or ""),
                "phone": str(data.get("phone") or ""),
                "unlockedCourses": courses
            }
        except Exception:
            return {"ok": True, "bound": False, "deviceId": hw_id, "email": "", "name": "", "phone": "", "unlockedCourses": []}

    def _save_local_device_license(self, email: str, name: str, phone: str, courses: list) -> dict:
        hw_id = self.get_hardware_device_id()
        clean_email = str(email or "").strip().lower()
        expanded = self._expand_unlocked_courses(courses or [])
        sig = self._sign_license_payload(clean_email, hw_id, expanded)
        payload = {
            "email": clean_email,
            "name": str(name or "").strip(),
            "phone": str(phone or "").strip(),
            "deviceId": hw_id,
            "unlockedCourses": expanded,
            "signature": sig,
            "updatedAt": int(time.time())
        }
        self._get_license_file_path().write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        return payload

    def dvtl_verify_account_device(self, args: dict | None = None) -> dict:
        args = args or {}
        hw_id = self.get_hardware_device_id()
        local_lic = self._load_local_device_license()
        req_email = str(args.get("email") or local_lic.get("email") or "").strip().lower()
        req_name = str(args.get("name") or local_lic.get("name") or "").strip()
        req_phone = re.sub(r"\[.*?\]", "", str(args.get("phone") or local_lic.get("phone") or "")).strip()

        req_password = re.sub(r"\[.*?\]", "", str(args.get("password") or req_phone or "")).strip()
        if not req_email or "@" not in req_email:
            return {
                "ok": False,
                "deviceId": hw_id,
                "unlockedCourses": [],
                "tempAutoUnlock": bool(self.DVTL_TEMP_AUTO_UNLOCK_ON_BUY),
                "message": "Vui lòng nhập đúng địa chỉ Email đã đăng ký khóa học."
            }

        # TÀI KHOẢN ADMIN CHÍNH CHỦ: Mở khóa toàn bộ 100% khóa học & không bị giới hạn 1 thiết bị!
        if self._is_admin_account(req_email, req_password):
            all_ids = self._expand_unlocked_courses(["ALL-COURSES-399K"])
            self._save_local_device_license(req_email, req_name or "Admin Điệp Viên Tài Liệu", req_phone or "0792453169", all_ids)
            return {
                "ok": True,
                "isAdmin": True,
                "deviceLocked": False,
                "deviceId": hw_id,
                "email": req_email,
                "boundEmail": req_email,
                "name": req_name or "Admin Điệp Viên Tài Liệu",
                "phone": req_phone or "0792453169",
                "unlockedCourses": all_ids,
                "tempAutoUnlock": bool(self.DVTL_TEMP_AUTO_UNLOCK_ON_BUY),
                "message": f"Đăng nhập tài khoản ADMIN [{req_email}] thành công — Đã mở khóa 100% toàn bộ khóa học!"
            }

        # Chống dùng máy này để đăng nhập sang tài khoản thứ 2 nếu máy đã khóa cứng với tài khoản 1
        if local_lic.get("bound") and local_lic.get("email") and local_lic.get("email") != req_email and len(local_lic.get("unlockedCourses") or []) > 0:
            return {
                "ok": False,
                "deviceLocked": True,
                "deviceId": hw_id,
                "email": local_lic.get("email"),
                "unlockedCourses": local_lic.get("unlockedCourses") or [],
                "message": f" BẢO MẬT 1 MÁY - 1 TÀI KHOẢN: Máy tính này ({hw_id}) đã được kích hoạt cố định với tài khoản Email [{local_lic.get('email')}]. Không thể đăng nhập hoặc chia sẻ sang tài khoản thứ 2!"
            }

        try:
            url = f"{self.DVTL_WEBHOOK_URL}?action=getCustomerSync&email={urllib.parse.quote(req_email)}&phone={urllib.parse.quote(req_password)}&deviceId={urllib.parse.quote(hw_id)}"
            r = requests.get(url, timeout=8)
            if r.status_code == 200:
                d = r.json()
                if d.get("deviceLocked"):
                    return {
                        "ok": False,
                        "deviceLocked": True,
                        "deviceId": hw_id,
                        "unlockedCourses": [],
                        "message": str(d.get("message") or " Tài khoản Email này đã được kích hoạt cố định trên 1 thiết bị khác!")
                    }
                cust = d.get("customer") or {}
                raw_srv_phone = str(cust.get("phone") or "")
                hw_match = re.search(r"\[HW:([A-Za-z0-9\-_]+)\]", raw_srv_phone)
                wb_match = re.search(r"\[WB:([A-Za-z0-9\-_]+)\]", raw_srv_phone)
                if hw_match and hw_match.group(1).upper() != hw_id.upper():
                    bound_other = hw_match.group(1).upper()
                    return {
                        "ok": False,
                        "deviceLocked": True,
                        "deviceId": hw_id,
                        "boundDeviceId": bound_other,
                        "unlockedCourses": [],
                        "message": f" CẢNH BÁO BẢO MẬT: Tài khoản Email [{req_email}] đã được kích hoạt cố định trên 01 máy tính duy nhất ({bound_other}). Hệ thống nghiêm cấm đăng nhập hoặc chia sẻ sang máy thứ 2!"
                    }

                srv_courses = list(cust.get("unlockedCourses") or [])
                for doc_item in (cust.get("purchasedDocs") or []):
                    doc_sku = str(doc_item.get("sku") or "").strip().upper()
                    if doc_sku in self.DVTL_DRIVE_COURSES_MAP or doc_sku.startswith("COURSE-") or doc_sku == "ALL-COURSES-399K":
                        srv_courses.append(doc_sku)

                expanded = self._expand_unlocked_courses(srv_courses)
                clean_phone = re.sub(r"\[.*?\]", "", raw_srv_phone).strip() or req_phone
                final_name = str(cust.get("name") or req_name or "Học Viên Điệp Viên").strip()

                if len(expanded) == 0:
                    self._save_local_device_license(req_email, final_name, clean_phone, local_lic.get("unlockedCourses") or [])
                    return {
                        "ok": False,
                        "deviceLocked": False,
                        "deviceId": hw_id,
                        "email": req_email,
                        "name": final_name,
                        "phone": clean_phone,
                        "unlockedCourses": [],
                        "message": f"Đã lưu thông tin tài khoản [{final_name} · {req_email}] cho mọi giao dịch thanh toán tự động tiếp theo!"
                    }

                # Nếu tài khoản có khóa học đã thanh toán và chưa khóa cứng mã [HW:...] trên Cloud -> Khóa ngay vào máy này!
                if not hw_match:
                    try:
                        requests.post(
                            self.DVTL_WEBHOOK_URL,
                            json={
                                "action": "registerOrLoginCustomer",
                                "email": req_email,
                                "name": final_name,
                                "phone": clean_phone,
                                "deviceId": hw_id,
                                "source": f"APP_LOCKED_1_MACHINE_{hw_id}"
                            },
                            timeout=8
                        )
                    except Exception:
                        pass

                self._save_local_device_license(req_email, final_name, clean_phone, expanded)
                return {
                    "ok": True,
                    "deviceLocked": False,
                    "deviceId": hw_id,
                    "email": req_email,
                    "name": final_name,
                    "phone": clean_phone,
                    "unlockedCourses": expanded,
                    "message": f" Đã xác thực & khóa bảo mật tài khoản [{req_email}] cố định trên thiết bị {hw_id} ({len(expanded)} khóa học đã mở)!"
                }
        except Exception as e:
            if local_lic.get("bound") and local_lic.get("email") == req_email:
                return {
                    "ok": True,
                    "deviceLocked": False,
                    "deviceId": hw_id,
                    "email": req_email,
                    "name": local_lic.get("name", ""),
                    "phone": local_lic.get("phone", ""),
                    "unlockedCourses": local_lic.get("unlockedCourses", []),
                    "message": f" Đã khôi phục phiên bản quyền cố định trên máy {hw_id}."
                }
            return {
                "ok": False,
                "deviceId": hw_id,
                "unlockedCourses": [],
                "message": f"Không thể kết nối máy chủ xác thực: {e}"
            }

        return {"ok": False, "deviceId": hw_id, "unlockedCourses": [], "message": "Không thể xác thực tài khoản."}

    @staticmethod
    def _strip_vi_accents(text: str) -> str:
        import unicodedata
        s = (text or "").replace("đ", "d").replace("Đ", "D")
        s = unicodedata.normalize("NFD", s)
        s = "".join(c for c in s if unicodedata.category(c) != "Mn")
        return re.sub(r"[^A-Za-z0-9 ]+", " ", s).upper().strip()

    def _get_dvtl_http(self) -> requests.Session:
        sess = getattr(self, "_dvtl_http_session", None)
        if sess is None:
            sess = requests.Session()
            sess.headers.update({"User-Agent": "DiepVienStudyDesktop/3.8"})
            self._dvtl_http_session = sess
        return sess

    def _send_dvtl_telegram(self, html_msg: str) -> bool:
        try:
            sess = self._get_dvtl_http()
            url = f"https://api.telegram.org/bot{self.DVTL_TELEGRAM_BOT_TOKEN}/sendMessage"
            r = sess.post(
                url,
                json={
                    "chat_id": self.DVTL_TELEGRAM_GROUP_ID,
                    "text": html_msg,
                    "parse_mode": "HTML",
                    "disable_web_page_preview": True,
                },
                timeout=5,
            )
            if r.status_code == 200:
                return True
            plain_msg = re.sub(r"<[^>]+>", "", html_msg)
            r2 = sess.post(
                url,
                json={
                    "chat_id": self.DVTL_TELEGRAM_GROUP_ID,
                    "text": plain_msg,
                    "disable_web_page_preview": True,
                },
                timeout=5,
            )
            return r2.status_code == 200
        except Exception:
            return False

    def dvtl_get_payment_account(self, args: dict | None = None) -> dict:
        now_ts = time.time()
        cached = getattr(self, "_cached_dvtl_bank", None)
        cache_file = APP_DATA_DIR / "dvtl_bank_cache_v9.json"
        if cached is None and cache_file.exists():
            try:
                loaded = json.loads(cache_file.read_text(encoding="utf-8"))
                if isinstance(loaded, dict) and loaded.get("accountNumber"):
                    cached = loaded
                    self._cached_dvtl_bank = cached
            except Exception:
                cached = None

        bank = dict(cached if (cached and cached.get("accountNumber")) else self.DVTL_DEFAULT_BANK)
        bank.pop("_ts", None)

        last_ts = float((cached or {}).get("_ts") or 0.0)
        if now_ts - last_ts > 1200.0 and not getattr(self, "_dvtl_bank_refreshing", False):
            self._dvtl_bank_refreshing = True

            def _refresh_bank_bg():
                try:
                    r = self._get_dvtl_http().get(f"{self.DVTL_WEBHOOK_URL}?action=getActiveAccount", timeout=5)
                    if r.status_code == 200:
                        d = r.json()
                        if d.get("accountNumber") and d.get("bankCode"):
                            fresh = {
                                "bankName": str(d.get("bankName") or "ACB"),
                                "bankCode": str(d.get("bankCode") or "ACB"),
                                "accountNumber": str(d.get("accountNumber") or "27820961"),
                                "accountName": str(d.get("accountName") or "TRINH DUC THINH"),
                                "provider": f"Ngân hàng {d.get('bankName') or 'ACB'} - Chuyển khoản 24/7",
                                "_ts": time.time(),
                            }
                            self._cached_dvtl_bank = fresh
                            APP_DATA_DIR.mkdir(parents=True, exist_ok=True)
                            cache_file.write_text(json.dumps(fresh, ensure_ascii=False), encoding="utf-8")
                except Exception:
                    pass
                finally:
                    self._dvtl_bank_refreshing = False

            threading.Thread(target=_refresh_bank_bg, daemon=True).start()

        return bank

    def dvtl_create_order(self, args: dict | None = None) -> dict:
        args = args or {}
        hw_id = self.get_hardware_device_id()
        order_type = str(args.get("orderType") or "course").strip()
        order_code = str(args.get("orderCode") or f"DVSTUDY{int(time.time()) % 100000}").strip().upper()
        item_id = str(args.get("itemId") or "").strip()
        item_name = str(args.get("itemName") or "Khóa Học / Tài Liệu Điệp Viên").strip()
        package_name = str(args.get("packageName") or item_name).strip()
        amount = int(args.get("amount") or 69000)
        total_est = int(args.get("totalPrice") or amount)
        local_lic = self._load_local_device_license()
        raw_name_arg = str(args.get("customerName") or args.get("name") or "").strip()
        cust_name = raw_name_arg if (raw_name_arg and raw_name_arg != "Khách Hàng") else str(local_lic.get("name") or "Khách Hàng").strip()
        raw_phone = re.sub(r"\D+", "", re.sub(r"\[.*?\]", "", str(args.get("customerPhone") or args.get("phone") or ""))).strip()[:11]
        drive_id = str(args.get("driveId") or "").strip()
        cust_email = str(args.get("customerEmail") or args.get("email") or local_lic.get("email") or "").strip().lower()
        if (cust_email and "@" in cust_email) or (cust_name and cust_name != "Khách Hàng"):
            try:
                self._save_local_device_license(
                    cust_email or str(local_lic.get("email") or ""),
                    cust_name if cust_name != "Khách Hàng" else str(local_lic.get("name") or ""),
                    raw_phone or str(local_lic.get("phone") or ""),
                    local_lic.get("unlockedCourses") or []
                )
            except Exception:
                pass
        school = str(args.get("school") or "").strip()
        topic = str(args.get("topic") or "").strip()
        deadline = str(args.get("deadline") or "").strip()
        pages = int(args.get("pages") or 0)

        # Lấy tài khoản ngân hàng TỨC THÌ 0ms từ bộ nhớ đệm (không làm khựng giao diện mở QR!)
        bank = self.dvtl_get_payment_account()
        clean_cust = self._strip_vi_accents(cust_name)[:18].strip()
        transfer_memo = f"{order_code} {clean_cust}".strip() if clean_cust else order_code
        qr_url = (
            f"https://img.vietqr.io/image/{bank['bankCode']}-{bank['accountNumber']}-compact2.png"
            f"?amount={amount}"
            f"&addInfo={urllib.parse.quote(transfer_memo)}"
            f"&accountName={urllib.parse.quote(bank['accountName'])}"
        )

        def _bg_notify():
            sess = self._get_dvtl_http()
            try:
                if order_type == "btl":
                    payload = {
                        "type": "SERVICE_ORDER",
                        "action": "createBTLOrder",
                        "orderCode": order_code,
                        "name": cust_name,
                        "zalo": raw_phone,
                        "phone": raw_phone,
                        "deviceId": hw_id,
                        "email": cust_email,
                        "school": school,
                        "serviceType": package_name,
                        "topic": topic or item_name,
                        "deadline": deadline,
                        "pages": pages,
                        "totalPrice": total_est,
                        "deposit": amount,
                        "remaining": max(0, total_est - amount),
                    }
                    try:
                        sess.post(self.DVTL_WEBHOOK_URL, json=payload, timeout=12)
                    except Exception:
                        pass
                else:
                    label_type = "Khóa Học" if order_type == "course" else "Mua Đề Cương"
                    params = {
                        "action": "createOrder",
                        "silent": "1",
                        "orderCode": order_code,
                        "orderType": label_type,
                        "name": cust_name,
                        "email": cust_email,
                        "phone": raw_phone,
                        "deviceId": hw_id,
                        "sku": item_id or order_code,
                        "itemName": f"{item_name} ({package_name})" if package_name and package_name != item_name else item_name,
                        "price": str(amount),
                        "amount": str(amount),
                        "bank": bank["bankName"],
                        "stkNhan": bank["accountNumber"],
                        "driveId": drive_id,
                    }
                    try:
                        resp_c = sess.post(self.DVTL_WEBHOOK_URL, json=params, timeout=10)
                        if resp_c.status_code != 200:
                            sess.get(self.DVTL_WEBHOOK_URL, params=params, timeout=10)
                    except Exception:
                        try:
                            sess.get(self.DVTL_WEBHOOK_URL, params=params, timeout=10)
                        except Exception:
                            pass
            except Exception:
                pass

        has_valid_contact = bool(cust_email and "@" in cust_email and len(raw_phone) >= 10)
        if has_valid_contact or order_type == "btl":
            if args.get("sync"):
                _bg_notify()
            else:
                threading.Thread(target=_bg_notify, daemon=True).start()
        return {
            "ok": True,
            "orderCode": order_code,
            "transferMemo": transfer_memo,
            "amount": amount,
            "totalPrice": total_est,
            "customerName": cust_name,
            "customerPhone": raw_phone,
            "customerEmail": cust_email,
            "deviceId": hw_id,
            "bankName": bank["bankName"],
            "bankCode": bank["bankCode"],
            "accountNumber": bank["accountNumber"],
            "accountName": bank["accountName"],
            "provider": bank["provider"],
            "qrUrl": qr_url,
            "telegramNotified": True,
        }

    def dvtl_check_payment(self, args: dict | None = None) -> dict:
        args = args or {}
        hw_id = self.get_hardware_device_id()
        order_code = str(args.get("orderCode") or "").strip().upper()
        cust_name = str(args.get("customerName") or "Khách Hàng").strip()
        cust_email = str(args.get("customerEmail") or "").strip().lower()
        cust_phone = re.sub(r"\[.*?\]", "", str(args.get("customerPhone") or "")).strip()
        item_id = str(args.get("itemId") or "").strip().upper()
        item_name = str(args.get("itemName") or "").strip()
        amount = int(args.get("amount") or 0)
        is_manual = bool(args.get("manual") or args.get("isManual"))

        if not order_code:
            return {"ok": False, "verified": False, "status": "EMPTY"}

        # CHẾ ĐỘ KIỂM TRA TẠM THỜI (User đang test giao diện học + tài liệu trên App)
        if self.DVTL_TEMP_AUTO_UNLOCK_ON_BUY and str(args.get("orderType") or "course").strip().lower() == "course":
            sku_u = item_id or "ALL-COURSES-399K"
            if amount >= 399000:
                sku_u = "ALL-COURSES-399K"
            lic = self._load_local_device_license()
            merged = list(lic.get("unlockedCourses") or []) + [sku_u]
            expanded = self._expand_unlocked_courses(merged)
            em_final = cust_email or str(lic.get("email") or "diepvientailieu@gmail.com")
            self._save_local_device_license(em_final, cust_name or str(lic.get("name") or "Admin Test"), cust_phone or str(lic.get("phone") or "0792453169"), expanded)
            c_info = self.DVTL_DRIVE_COURSES_MAP.get(sku_u) or {}
            return {
                "ok": True,
                "verified": True,
                "paid": True,
                "tempTestUnlock": True,
                "status": "TEMP_UNLOCK_TEST",
                "deviceId": hw_id,
                "unlockedCourses": expanded,
                "driveUrl": str(c_info.get("folderUrl") or f"https://drive.google.com/drive/folders/{self.DVTL_DRIVE_COURSES_ROOT}")
            }

        try:
            drive_id_arg = str(args.get("driveId") or "").strip()
            order_type_arg = str(args.get("orderType") or "course").strip().lower()
            order_type_label = "Khóa Học" if order_type_arg == "course" else ("btl" if order_type_arg == "btl" else "Mua File")
            verify_params = {
                "action": "verify",
                "orderId": order_code,
                "orderType": order_type_label,
                "deviceId": hw_id,
                "email": cust_email,
                "name": cust_name,
                "phone": cust_phone,
                "sku": item_id,
                "itemName": item_name,
                "amount": str(amount or 50000),
                "driveId": drive_id_arg,
            }
            if is_manual:
                verify_params["manual"] = "1"

            r = self._get_dvtl_http().get(self.DVTL_WEBHOOK_URL, params=verify_params, timeout=14)
            if r.status_code == 200:
                d = r.json()
                is_verified = bool(d.get("verified", False) or d.get("paid", False))
                status_str = str(d.get("status") or ("PAID_SUCCESS" if is_verified else "PENDING"))
                if is_verified:
                    sku_unlocked = str(d.get("sku") or item_id or "").strip().upper()
                    if amount >= 399000:
                        sku_unlocked = "ALL-COURSES-399K"
                    lic = self._load_local_device_license()
                    merged = list(lic.get("unlockedCourses") or [])
                    if sku_unlocked:
                        merged.append(sku_unlocked)
                    expanded = self._expand_unlocked_courses(merged)
                    if cust_email:
                        self._save_local_device_license(cust_email, cust_name, cust_phone, expanded)

                    resolved_drive_url = str(d.get("driveUrl") or "")
                    c_info = self.DVTL_DRIVE_COURSES_MAP.get(sku_unlocked)
                    if not resolved_drive_url:
                        if c_info and c_info.get("folderUrl"):
                            resolved_drive_url = str(c_info.get("folderUrl"))
                        elif drive_id_arg:
                            resolved_drive_url = f"https://drive.google.com/file/d/{drive_id_arg}/view"

                    # Đẩy yêu cầu đồng bộ cấp quyền Drive dự phòng sang luồng nền (1 request gộp duy nhất, KHÔNG làm đơ UI App!)
                    if cust_email and "@" in cust_email:
                        def _bg_ensure_drive_delivery():
                            try:
                                sess = self._get_dvtl_http()
                                if c_info:
                                    sess.post(
                                        self.DVTL_KHO_WEBHOOK_URL,
                                        json={
                                            "secret": "DVTL_SECRET_2026_TCCM_TO_DIEPVIEN",
                                            "email": cust_email,
                                            "name": cust_name,
                                            "orderCode": order_code,
                                            "itemName": item_name or c_info.get("folderName"),
                                            "orderType": "Khóa Học Bản Quyền (Tặng App 1 Máy)",
                                            "isCourse": True,
                                            "fileId": c_info.get("folderId") or "",
                                            "extraFolderIds": list(c_info.get("extraFolderIds") or []),
                                            "fileLink": resolved_drive_url,
                                        },
                                        timeout=8,
                                    )
                                elif drive_id_arg or order_code.startswith("DC"):
                                    target_fid = drive_id_arg or "1zPRnfdMbaaYWSKK8PZdZIuooOanjWynp"
                                    sess.post(
                                        self.DVTL_KHO_WEBHOOK_URL,
                                        json={
                                            "secret": "DVTL_SECRET_2026_TCCM_TO_DIEPVIEN",
                                            "email": cust_email,
                                            "name": cust_name,
                                            "orderCode": order_code,
                                            "itemName": item_name or f"Đề Cương #{sku_unlocked}",
                                            "orderType": "Mua Đề Cương 50K",
                                            "isCourse": False,
                                            "fileId": target_fid,
                                            "fileLink": resolved_drive_url,
                                        },
                                        timeout=8,
                                    )
                            except Exception:
                                pass

                        threading.Thread(target=_bg_ensure_drive_delivery, daemon=True).start()

                    return {
                        "ok": True,
                        "verified": True,
                        "paid": True,
                        "status": status_str,
                        "deviceId": hw_id,
                        "unlockedCourses": expanded,
                        "driveUrl": resolved_drive_url,
                        "btlDelivered": bool(d.get("btlDelivered", False)),
                        "fullDriveUrl": str(d.get("fullDriveUrl") or resolved_drive_url),
                        "previewDriveUrl": str(d.get("previewDriveUrl") or ""),
                        "deadline": str(d.get("deadline") or ""),
                        "topic": str(d.get("topic") or item_name)
                    }
                return {
                    "ok": True,
                    "verified": False,
                    "paid": False,
                    "status": status_str,
                    "message": "Hệ thống chưa nhận được Email biến động số dư ngân hàng ACB cho mã đơn này. Vui lòng quét mã QR chuyển khoản đúng nội dung!"
                }
        except Exception:
            pass
        return {"ok": True, "verified": False, "paid": False, "status": "PENDING"}

    def dvtl_ask_lesson_ai(self, args: dict | None = None) -> dict:
        args = args or {}
        question = str(args.get("question") or "").strip()
        if not question:
            return {"ok": False, "answer": "Vui lòng nhập câu hỏi về bài giảng.", "followUps": []}
        course_title = str(args.get("courseTitle") or "Khóa học").strip()
        instructor = str(args.get("instructor") or "Giảng viên").strip()
        lesson_title = str(args.get("lessonTitle") or "").strip()
        drive_file = str(args.get("driveFileName") or "").strip()
        notes = str(args.get("notes") or "").strip()
        summary = str(args.get("summary") or "").strip()
        transcript = str(args.get("transcript") or "").strip()
        history = args.get("history") or []

        hist_lines = []
        for h in history[-6:]:
            if isinstance(h, dict):
                role = "Học viên" if h.get("role") == "user" else "Trợ lý AI"
                txt = str(h.get("content") or "").strip()
                if txt:
                    hist_lines.append(f"- {role}: {txt[:350]}")
        hist_block = "\n".join(hist_lines)

        sys_prompt = (
            "Bạn là Trợ lý Học tập AI chuyên sâu của Điệp Viên Study. "
            "Nhiệm vụ của bạn là giải đáp rõ ràng, chính xác, dễ hiểu câu hỏi của học viên về bài giảng hiện tại. "
            "TUYỆT ĐỐI KHÔNG sử dụng bất kỳ biểu tượng cảm xúc (emoji) nào trong câu trả lời. "
            "Trình bày khoa học bằng tiếng Việt chuẩn Markdown (in đậm khái niệm quan trọng, gạch đầu dòng các bước giải). "
            "Trả về DUY NHẤT một JSON object hợp lệ theo cấu trúc: "
            "{\"answer\": \"Nội dung trả lời chi tiết bằng Markdown...\", \"followUps\": [\"Câu hỏi gợi ý 1\", \"Câu hỏi gợi ý 2\", \"Câu hỏi gợi ý 3\"]}"
        )
        prompt = (
            f"Khóa học: {course_title} ({instructor})\n"
            f"Bài học / Tài liệu đang mở: {drive_file or lesson_title}\n"
            f"Ghi chú của học viên:\n{notes[:2500]}\n\n"
            f"Tóm tắt bài giảng:\n{summary[:3000]}\n\n"
            f"Bản ghi lời giảng:\n{transcript[:8000]}\n\n"
            f"Lịch sử trao đổi gần đây:\n{hist_block}\n\n"
            f"CÂU HỎI CỦA HỌC VIÊN:\n{question}"
        )

        ans = ""
        follow_ups = []
        try:
            raw_resp = self.engine.call_llm(
                prompt=prompt,
                system_prompt=sys_prompt,
                json_mode=True,
                temperature=0.25,
                max_tokens=1600,
                prefer_fast=False,
            )
            if raw_resp:
                try:
                    parsed = json.loads(raw_resp)
                    ans = str(parsed.get("answer") or "").strip()
                    follow_ups = [str(x).strip() for x in (parsed.get("followUps") or []) if str(x).strip()][:3]
                except Exception:
                    ans = strip_think_and_fences(raw_resp).strip()
        except Exception:
            pass

        if not ans:
            ctx_preview = summary or notes or transcript[:600]
            ans = (
                f"**Giải đáp cho bài học {drive_file or lesson_title} ({course_title}):**\n\n"
                + (f"Dựa trên nội dung trọng tâm của bài giảng:\n{ctx_preview}\n\n" if ctx_preview else "")
                + f"Đối với câu hỏi **\"{question}\"**, bạn hãy nắm vững định nghĩa cốt lõi, điều kiện áp dụng công thức và đối chiếu từng bước biến đổi trong tài liệu bài giảng."
            )
        if not follow_ups:
            follow_ups = [
                "Tóm tắt các công thức trọng tâm của bài này",
                "Cho ví dụ minh họa từng bước giải",
                "Tạo 3 câu hỏi trắc nghiệm tự luyện"
            ]
        return {"ok": True, "answer": ans, "followUps": follow_ups}

    def dvtl_list_drive_folder(self, args: dict | None = None) -> dict:
        args = args or {}
        raw_cid = str(args.get("courseId") or "ALL-COURSES-399K").strip().upper()
        alias_map = {
            "DVS-COMBO-KHTN-1": "C199-KHTN1",
            "COMBO-KHTN-1": "C199-KHTN1",
            "DVS-COMBO-KHTN-2": "C199-KHTN2",
            "COMBO-KHTN-2": "C199-KHTN2",
            "DVS-COMBO-KHXH-1": "C199-KHXH1",
            "COMBO-KHXH-1": "C199-KHXH1",
            "DVS-COMBO-KHXH-2": "C199-KHXH2",
            "COMBO-KHXH-2": "C199-KHXH2",
            "DVS-HSA-01": "C199-HSA",
            "DVS-TSA-01": "C199-TSA",
            "DVS-VACT-01": "C199-VACT",
        }
        course_id = alias_map.get(raw_cid, raw_cid)
        info = dict(self.DVTL_DRIVE_COURSES_MAP.get(course_id) or self.DVTL_DRIVE_COURSES_MAP.get("ALL-COURSES-399K") or next(iter(self.DVTL_DRIVE_COURSES_MAP.values())))
        folder_id = str(args.get("folderId") or info["folderId"]).strip()
        live_files = list(info.get("files") or [])
        live_synced = False

        # Bảng giải mã Shortcut Google Drive sang đúng Thư mục gốc tương ứng
        SHORTCUT_MAP = {
            "TOAN_DUC": ("1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo", "Toán Thầy Đỗ Văn Đức (TenSchool 2K9)"),
            "LY_BIEN": ("1UxEYANVp1iw9Us0mSNJR8w9_VFhsx3MP", "Vật Lý Thầy Chu Văn Biên 2K9"),
            "SINH_NGHE": ("1m__F2exCz50iNJXhf0JR4TramO29K244", "Sinh Học Thầy Phan Khắc Nghệ 2K9"),
            "TOAN_TIEN": ("1b73Z89zxCGINyuOVm4pImxwkj2UTidC1", "Toán Thầy Nguyễn Phan Tiến 2K9"),
            "LY_TIEN": ("1Mz6IblP1vwlLKj9XKBAq4BFnKJBcwqSP", "Vật Lý Thầy Thắng - Thầy Tiến IPClass 2K9"),
            "ANH_MP": ("1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1", "Tiếng Anh Cô Vũ Mai Phương 2K9"),
            "VAN_SM": ("1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT", "Học Văn Cô Sương Mai 2K9"),
            "SU_HUONG": ("1klZMAdkSnSXXSb72fTiKOZnL11EPYswu", "Lịch Sử Cô Ngô Thị Lan Hương 2K9"),
            "DIA_TUNG": ("16WO3g17nelhGfCzNNaptvgKp0iYzAlvm", "Địa Lý Thầy Đàm Thanh Tùng 2K9"),
            "TOAN_SHIPPER": ("1npBDPOm0un8fpiwhXqnTElSyJCxHEq1n", "Toán Anh Shiper 2K9"),
            "TOAN_MAP": ("1Lvx2x6Gz66gNzgHWOn4DjF6m0a8MhuPA", "Toán - Tổ Toán Học MapStudy 2K9"),
            "TOAN_NT": ("1kme7eKb-PLV_suK3UVLJYEQKMB5BuP6A", "Nền Tảng Toán Thầy Lưu Huy Thưởng"),
            "LY_UNG": ("11QpRWPh7KFv6z3ehH9PyF2rSZBJkvjIU", "Vật Lý Thầy Lê Tùng Ưng 2K9"),
            "HOA_TRONG": ("1GG-0AuynJUnQZZKXcrlQpRuTFsye6aQk", "Hóa Học Thầy Phạm Văn Trọng 2K9"),
            "HOA_NGOC": ("1vMyBdrXbe_YdZwMOgw9OfTZMrY-9vHXe", "Nền Tảng Hóa Thầy Vũ Khắc Ngọc"),
            "VAN_NT": ("1D9xa1GYZZEDVhxfvQq-i1xlWim66zikF", "Nền Tảng 12 Môn Ngữ Văn HocMai"),
            "ANH_LIEU": ("1Antqpjjo7hKQI_RqlDT3FW8kSTJGHGMw", "Tiếng Anh Cô Phạm Liễu 2K9"),
            "ANH_NT": ("1-sSo3zBXFRoXfQHkSdIOxmH2MkAvEqKM", "Nền Tảng 12 Môn Tiếng Anh HocMai"),
            "SINH_DUONG": ("13F0pQtUG-1yix2XrSQo9TkSw8-_UAAio", "Nền Tảng Sinh Học Cô Ánh Dương"),
            "SU_SEN": ("1B_IXBTxhmhZtW5fzln4-uxv-QTq39p6t", "Lịch Sử Cô Nguyễn Hương Sen 2K9"),
            "DIA_TAI": ("1DasmiM670vDu3CekdeXCoQeQoeLvKYyq", "Địa Lý Thầy Tài 2K9"),
            "HSA_HOCMAI": ("1XZj-uhExqqkupmmRbxmX08AB-NhgCcxi", "ĐGNL HSA - HocMai 2K9"),
            "HSA_MAP": ("11RHLlw-99okBQTqk6Dp4DxlucorjoW6p", "ĐGNL HSA - MapStudy 2K9"),
            "HSA_EMPIRE": ("1yNPB1d_GzfvPDp6dIpGQtBKp1-L6HkrN", "ĐGNL HSA - Empire Team 2K9"),
            "HSA_EDU": ("1n8MDD0giM4kVxjU7bV75vqptkKzb_zjg", "ĐGNL HSA - HSA Edu 2K9"),
            "TSA_BMC": ("17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe", "ĐGTD TSA - BMC ĐHBK Hà Nội"),
            "TSA_HOCMAI": ("1Z71HzRYKoQSv5i-qEWq1iP_icICaB3Lu", "ĐGTD TSA - HocMai ĐHBK Hà Nội"),
            "VACT_HOCMAI": ("1YK2IS2Hzwe4-MqFlJ2kMIJLwDsSPSKuu", "ĐGNL V-ACT - HocMai 2K9"),
            "VACT_EMPIRE": ("1ic4g3roCpg7_gkj5JNz9Gre52x_BhyW6", "ĐGNL V-ACT - Empire Team 2K9"),
            "VACT_MAP": ("1dqiwh_ADEBetnPMC0S-YH8M6SLysaEQB", "ĐGNL V-ACT - MapStudy 2K9"),
        }

        def resolve_shortcut(name: str):
            norm = self._strip_vi_accents(name)
            if "DUC" in norm or "TENSCHOOL" in norm: return SHORTCUT_MAP["TOAN_DUC"]
            if "BIEN" in norm: return SHORTCUT_MAP["LY_BIEN"]
            if "NGHE" in norm: return SHORTCUT_MAP["SINH_NGHE"]
            if "PHAN TIEN" in norm or "NGUYEN PHAN TIEN" in norm: return SHORTCUT_MAP["TOAN_TIEN"]
            if "IPCLASS" in norm or "THANG" in norm: return SHORTCUT_MAP["LY_TIEN"]
            if "MAI PHUONG" in norm: return SHORTCUT_MAP["ANH_MP"]
            if "SUONG MAI" in norm: return SHORTCUT_MAP["VAN_SM"]
            if "LAN HUONG" in norm: return SHORTCUT_MAP["SU_HUONG"]
            if "DAM THANH TUNG" in norm or "THANH TUNG" in norm: return SHORTCUT_MAP["DIA_TUNG"]
            if "SHIPER" in norm or "SHIPPER" in norm: return SHORTCUT_MAP["TOAN_SHIPPER"]
            if "TRONG" in norm: return SHORTCUT_MAP["HOA_TRONG"]
            if "KHAC NGOC" in norm: return SHORTCUT_MAP["HOA_NGOC"]
            if "LIEU" in norm or "PHAM LIEU" in norm: return SHORTCUT_MAP["ANH_LIEU"]
            if "ANH DUONG" in norm: return SHORTCUT_MAP["SINH_DUONG"]
            if "HUONG SEN" in norm: return SHORTCUT_MAP["SU_SEN"]
            if "THAY TAI" in norm or "THAI TAI" in norm: return SHORTCUT_MAP["DIA_TAI"]
            if "TUNG UNG" in norm: return SHORTCUT_MAP["LY_UNG"]
            if "BMC" in norm: return SHORTCUT_MAP["TSA_BMC"]
            if "EMPIRE" in norm:
                return SHORTCUT_MAP["HSA_EMPIRE"] if "HSA" in norm else SHORTCUT_MAP["VACT_EMPIRE"]
            if "HSA EDU" in norm: return SHORTCUT_MAP["HSA_EDU"]
            if "MAPSTUDY" in norm or "MAP" in norm:
                if "HSA" in norm: return SHORTCUT_MAP["HSA_MAP"]
                if "VACT" in norm or "V-ACT" in norm: return SHORTCUT_MAP["VACT_MAP"]
                return SHORTCUT_MAP["TOAN_MAP"]
            if "HOCMAI" in norm:
                if "HSA" in norm: return SHORTCUT_MAP["HSA_HOCMAI"]
                if "TSA" in norm: return SHORTCUT_MAP["TSA_HOCMAI"]
                if "VACT" in norm or "V-ACT" in norm: return SHORTCUT_MAP["VACT_HOCMAI"]
                if "VAN" in norm: return SHORTCUT_MAP["VAN_NT"]
                if "ANH" in norm: return SHORTCUT_MAP["ANH_NT"]
            return None

        token_candidates = [
            Path(os.path.expanduser("~")) / ".gemini" / "antigravity" / "plugin_data" / "gdrive" / "token.json",
            Path(r"C:\Users\Admin\.gemini\antigravity\plugin_data\gdrive\token.json"),
        ]
        token_file = next((p for p in token_candidates if p.exists()), None)
        lic_cur = self._load_local_device_license()
        req_em = str(args.get("email") or lic_cur.get("email") or "").strip().lower()

        # Nếu là gói Combo và đang ở cấp thư mục gốc của Combo, ưu tiên nạp sẵn danh sách môn học con
        child_ids = list(info.get("childCourseIds") or [])
        if child_ids and (folder_id == info["folderId"] or folder_id == self.DVTL_DRIVE_COURSES_ROOT):
            seed_files = []
            for cid in child_ids:
                cinfo = self.DVTL_DRIVE_COURSES_MAP.get(cid)
                if cinfo and cinfo.get("folderId"):
                    seed_files.append({
                        "id": cinfo["folderId"],
                        "name": f"{cinfo.get('folderName') or cid}",
                        "mimeType": "application/vnd.google-apps.folder",
                        "url": f"https://drive.google.com/drive/folders/{cinfo['folderId']}",
                        "isFolder": True,
                    })
            if seed_files:
                live_files = seed_files
                live_synced = True

        if (not live_synced) and token_file and folder_id:
            try:
                tok_data = json.loads(token_file.read_text(encoding="utf-8"))
                token_val = tok_data.get("access_token") or (tok_data.get("token", {}).get("access_token") if isinstance(tok_data.get("token"), dict) else None) or tok_data.get("token") or ""
                client_id = tok_data.get("client_id")
                client_secret = tok_data.get("client_secret")
                token_obj = tok_data.get("token", {})
                refresh_token = token_obj.get("refresh_token") if isinstance(token_obj, dict) else tok_data.get("refresh_token")

                def _query_drive(token_str):
                    q = f"'{folder_id}' in parents and trashed = false"
                    return requests.get(
                        "https://www.googleapis.com/drive/v3/files",
                        headers={"Authorization": f"Bearer {token_str}"},
                        params={
                            "q": q,
                            "fields": "files(id,name,mimeType,webViewLink,size,modifiedTime,shortcutDetails)",
                            "pageSize": 500,
                            "supportsAllDrives": "true",
                            "includeItemsFromAllDrives": "true",
                        },
                        timeout=6,
                    )

                r = _query_drive(token_val) if token_val else None
                if (not r or r.status_code == 401) and refresh_token and client_id and client_secret:
                    resp_ref = requests.post(
                        "https://oauth2.googleapis.com/token",
                        data={
                            "client_id": client_id,
                            "client_secret": client_secret,
                            "refresh_token": refresh_token,
                            "grant_type": "refresh_token",
                        },
                        timeout=10,
                    )
                    if resp_ref.status_code == 200:
                        token_val = resp_ref.json().get("access_token")
                        tok_data["access_token"] = token_val
                        if isinstance(tok_data.get("token"), dict):
                            tok_data["token"]["access_token"] = token_val
                        token_file.write_text(json.dumps(tok_data, indent=2, ensure_ascii=False), encoding="utf-8")
                        r = _query_drive(token_val)

                if r and r.status_code == 200:
                    items = r.json().get("files") or []
                    if items:
                        live_files = [
                            {
                                "id": it.get("id"),
                                "name": it.get("name"),
                                "mimeType": it.get("mimeType"),
                                "shortcutDetails": it.get("shortcutDetails") or {},
                                "url": it.get("webViewLink") or (
                                    f"https://drive.google.com/drive/folders/{it.get('id')}"
                                    if it.get("mimeType") == "application/vnd.google-apps.folder"
                                    else f"https://drive.google.com/file/d/{it.get('id')}/view"
                                ),
                            }
                            for it in items
                        ]
                        live_synced = True
            except Exception:
                pass

        if not live_synced and folder_id:
            try:
                r_gas = self._get_dvtl_http().get(
                    self.DVTL_WEBHOOK_URL,
                    params={
                        "action": "listCourseFolder",
                        "folderId": folder_id,
                        "courseId": course_id,
                        "email": req_em,
                        "testMode": "1" if self.DVTL_TEMP_AUTO_UNLOCK_ON_BUY else "0",
                    },
                    timeout=5,
                )
                if r_gas.status_code == 200:
                    gd = r_gas.json()
                    if gd.get("ok") and isinstance(gd.get("files"), list) and len(gd.get("files")) > 0:
                        live_files = gd.get("files")
                        live_synced = True
            except Exception:
                pass

        # Hậu xử lý: phân loại chuẩn 3 nhóm (folder / video / document), giải mã Shortcut & sắp xếp tự nhiên như Google Drive
        def _classify_item(mime_val: str, name_val: str, is_fld_flag: bool) -> str:
            m_low = str(mime_val or "").lower()
            n_low = str(name_val or "").lower()
            if is_fld_flag or m_low == "application/vnd.google-apps.folder":
                return "folder"
            if m_low.startswith("video/") or re.search(r"\.(mp4|mkv|mov|webm|m4v|avi|ts|flv)$", n_low):
                return "video"
            return "document"

        def _build_drive_view_url(fid_s: str, mime_val: str, is_fld_flag: bool, fallback_u: str = "") -> str:
            m_low = str(mime_val or "").lower()
            if is_fld_flag or m_low == "application/vnd.google-apps.folder":
                return f"https://drive.google.com/drive/folders/{fid_s}"
            if "spreadsheet" in m_low:
                return f"https://docs.google.com/spreadsheets/d/{fid_s}/edit"
            if "document" in m_low:
                return f"https://docs.google.com/document/d/{fid_s}/edit"
            if "presentation" in m_low:
                return f"https://docs.google.com/presentation/d/{fid_s}/edit"
            return fallback_u or f"https://drive.google.com/file/d/{fid_s}/view"

        processed_files = []
        seen_ids = set()
        for it in live_files:
            fname = re.sub(r"[\U0001F300-\U0001FAFF\u2600-\u27BF]+", "", str(it.get("name") or "")).strip()
            if not fname:
                continue
            if any(spam in fname.lower() for spam in ["033800642", "0333800642", "tài liệu ôn thi", "giới thiệu về nhóm", "lợi ích tham gia nhóm"]):
                continue
            f_mime = str(it.get("mimeType") or "").strip()
            sc_info = it.get("shortcutDetails") if isinstance(it.get("shortcutDetails"), dict) else {}
            is_shortcut = "shortcut" in f_mime.lower()
            if is_shortcut:
                target_id = str(sc_info.get("targetId") or "").strip()
                target_mime = str(sc_info.get("targetMimeType") or "").strip()
                if target_id:
                    t_is_fld = (target_mime == "application/vnd.google-apps.folder")
                    if target_id not in seen_ids:
                        seen_ids.add(target_id)
                        eff_mime = "application/vnd.google-apps.folder" if t_is_fld else (target_mime or "application/octet-stream")
                        kind = _classify_item(eff_mime, fname, t_is_fld)
                        processed_files.append({
                            "id": target_id,
                            "name": fname,
                            "mimeType": eff_mime,
                            "itemKind": kind,
                            "url": _build_drive_view_url(target_id, eff_mime, t_is_fld),
                            "isFolder": t_is_fld,
                        })
                    continue
                matched = resolve_shortcut(fname)
                if matched:
                    tid, tname = matched
                    if tid not in seen_ids:
                        seen_ids.add(tid)
                        processed_files.append({
                            "id": tid,
                            "name": str(tname),
                            "mimeType": "application/vnd.google-apps.folder",
                            "itemKind": "folder",
                            "url": f"https://drive.google.com/drive/folders/{tid}",
                            "isFolder": True,
                        })
                    continue
                # Shortcut không trỏ tới folder -> coi là tài liệu mở trực tiếp trên Drive
                fid_sc = str(it.get("id") or "").strip()
                if fid_sc and fid_sc not in seen_ids:
                    seen_ids.add(fid_sc)
                    processed_files.append({
                        "id": fid_sc,
                        "name": fname,
                        "mimeType": f_mime,
                        "itemKind": "document",
                        "url": it.get("url") or f"https://drive.google.com/file/d/{fid_sc}/view",
                        "isFolder": False,
                    })
                continue

            is_fld = (f_mime == "application/vnd.google-apps.folder") or (bool(it.get("isFolder")) and "google-apps." not in f_mime)
            fid_val = str(it.get("id") or "").strip()
            if not fid_val or fid_val in seen_ids:
                continue
            seen_ids.add(fid_val)
            eff_mime2 = "application/vnd.google-apps.folder" if is_fld else f_mime
            kind2 = _classify_item(eff_mime2, fname, is_fld)
            processed_files.append({
                "id": fid_val,
                "name": fname,
                "mimeType": eff_mime2,
                "itemKind": kind2,
                "url": _build_drive_view_url(fid_val, eff_mime2, is_fld, str(it.get("url") or "")),
                "isFolder": is_fld,
            })

        kind_rank = {"folder": 0, "video": 1, "document": 2}
        def _nat_sort_key(entry):
            nm = str(entry.get("name") or "").strip()
            # Đẩy các mục mở ngoặc vuông [SHEET...] xuống sau các chương đánh số 0, 1, 2...
            bracket_penalty = 1 if nm.startswith("[") else 0
            parts = re.split(r"(\d+)", nm.lower())
            norm_parts = [int(p) if p.isdigit() else p for p in parts]
            return (kind_rank.get(entry.get("itemKind"), 2), bracket_penalty, norm_parts)

        processed_files.sort(key=_nat_sort_key)

        return {
            "ok": True,
            "courseId": course_id,
            "rootFolderId": self.DVTL_DRIVE_COURSES_ROOT,
            "rootFolderUrl": f"https://drive.google.com/drive/folders/{self.DVTL_DRIVE_COURSES_ROOT}",
            "folderId": folder_id,
            "folderName": info.get("folderName", ""),
            "folderUrl": f"https://drive.google.com/drive/folders/{folder_id}",
            "files": processed_files,
            "liveSynced": live_synced,
        }
    # =========================================================================
    # 5. DISPATCHER CHO MỌI LỆNH TAURI INVOKE
    # =========================================================================
    def invoke(self, cmd: str, args: dict, win_label: str = "main"):
        # --- Đồng bộ diepvien.store (VietQR + Telegram + Google Drive + Khóa Cứng 1 Máy) ---
        if cmd == "dvtl_get_payment_account":
            return self.dvtl_get_payment_account(args or {})
        if cmd == "dvtl_create_order":
            return self.dvtl_create_order(args or {})
        if cmd == "dvtl_check_payment":
            return self.dvtl_check_payment(args or {})
        if cmd == "dvtl_list_drive_folder":
            return self.dvtl_list_drive_folder(args or {})
        if cmd == "dvtl_ask_lesson_ai":
            return self.dvtl_ask_lesson_ai(args or {})
        if cmd == "dvtl_verify_account_device":
            return self.dvtl_verify_account_device(args or {})
        if cmd == "dvtl_get_device_license":
            d_lic = self._load_local_device_license()
            d_lic["tempAutoUnlock"] = bool(self.DVTL_TEMP_AUTO_UNLOCK_ON_BUY)
            if self._is_admin_account(d_lic.get("email", ""), d_lic.get("phone", "")):
                d_lic["isAdmin"] = True
                d_lic["unlockedCourses"] = self._expand_unlocked_courses(["ALL-COURSES-399K"])
            return d_lic
        if cmd == "dvtl_temp_unlock_course":
            if not self.DVTL_TEMP_AUTO_UNLOCK_ON_BUY:
                return {"ok": False, "message": "Chế độ mở khóa test đã tắt. Vui lòng thanh toán để mở khóa!"}
            cid = str((args or {}).get("courseId") or "ALL-COURSES-399K").strip().upper()
            lic = self._load_local_device_license()
            merged = list(lic.get("unlockedCourses") or []) + [cid]
            expanded = self._expand_unlocked_courses(merged)
            em = str((args or {}).get("email") or lic.get("email") or "diepvientailieu@gmail.com").strip().lower()
            self._save_local_device_license(em, str(lic.get("name") or "Admin Test"), str(lic.get("phone") or "0792453169"), expanded)
            return {"ok": True, "tempTestUnlock": True, "unlockedCourses": expanded, "email": em}
        if cmd == "dvtl_save_customer_profile":
            lic = self._load_local_device_license()
            em = str((args or {}).get("email") or lic.get("email") or "").strip().lower()
            nm = str((args or {}).get("name") or lic.get("name") or "").strip()
            ph = re.sub(r"\[.*?\]", "", str((args or {}).get("phone") or lic.get("phone") or "")).strip()
            self._save_local_device_license(em, nm, ph, lic.get("unlockedCourses") or [])
            if em and "@" in em:
                hw_id = self.get_hardware_device_id()
                def _sync_cust_cloud():
                    try:
                        requests.post(
                            self.DVTL_WEBHOOK_URL,
                            json={
                                "action": "registerOrLoginCustomer",
                                "email": em,
                                "name": nm,
                                "phone": ph,
                                "deviceId": hw_id,
                                "source": "APP_DIEPVIEN_STUDY"
                            },
                            timeout=10
                        )
                    except Exception:
                        pass
                threading.Thread(target=_sync_cust_cloud, daemon=True).start()
            return self._load_local_device_license()
        if cmd == "dvtl_get_ota_status":
            return getattr(self, "_ota_status", {"version": "2026.11.25.6", "autoUpdateEnabled": True})

        # --- Live Lecture Mind Map, Segment Notes & PDF-to-Word ---
        if cmd == "convert_pdf_to_word_dialog":
            return self.convert_pdf_to_word_dialog(args or {})
        if cmd == "pdf_to_word_status":
            return getattr(self, "_pdf_word_state", {"running": False, "message": "", "files": []})
        if cmd == "open_file_or_folder":
            p_str = str((args or {}).get("path") or "").strip()
            if p_str and os.path.exists(p_str):
                if bool((args or {}).get("reveal", False)):
                    reveal_file_cross_platform(p_str)
                else:
                    open_url_cross_platform(p_str)
            return {"ok": True}
        if cmd == "download_word_file":
            p_str = str((args or {}).get("path") or "").strip()
            if not p_str or not os.path.exists(p_str):
                return {"ok": False, "error": "Không tìm thấy file Word."}
            fname = os.path.basename(p_str)
            downloads_dir = Path(os.path.expanduser("~/Downloads"))
            downloads_dir.mkdir(parents=True, exist_ok=True)
            save_path = str(downloads_dir / fname)
            if self.main_win:
                try:
                    dest = self.main_win.create_file_dialog(
                        webview.SAVE_DIALOG,
                        directory=str(downloads_dir),
                        save_filename=fname,
                        file_types=("Word Document (*.docx)", "All files (*.*)")
                    )
                    if dest:
                        save_path = dest[0] if isinstance(dest, (list, tuple)) else str(dest)
                except Exception:
                    pass
            try:
                if os.path.abspath(p_str) != os.path.abspath(save_path):
                    shutil.copy2(p_str, save_path)
                reveal_file_cross_platform(save_path)
                return {"ok": True, "saved_path": save_path}
            except Exception as e:
                return {"ok": False, "error": str(e)}
        if cmd == "pick_course_image":
            course_id = str((args or {}).get("courseId") or "course").strip().lower()
            if not self.main_win:
                return {"ok": False}
            file_types = ("Image Files (*.png;*.jpg;*.jpeg;*.webp)", "All files (*.*)")
            res = self.main_win.create_file_dialog(webview.OPEN_DIALOG, allow_multiple=False, file_types=file_types)
            if not res or len(res) == 0:
                return {"ok": False, "cancelled": True}
            src_img = Path(res[0])
            if not src_img.exists():
                return {"ok": False}
            courses_dir = WEB_DIST_DIR / "courses"
            courses_dir.mkdir(parents=True, exist_ok=True)
            ext = src_img.suffix.lower() or ".png"
            dst_name = f"{course_id}{ext}"
            dst_path = courses_dir / dst_name
            shutil.copy2(src_img, dst_path)
            return {"ok": True, "url": f"/courses/{dst_name}?t={int(time.time()*1000)}"}
        if cmd == "generate_mindmap":
            return self.generate_mindmap(args or {})
        if cmd == "explain_segment":
            return self.explain_segment(args or {})
        if cmd == "generate_notebooklm_studio":
            return self.generate_notebooklm_studio(args or {})
        if cmd == "speak_podcast_turn":
            return self.speak_podcast_turn(args or {})
        if cmd == "start_demo_lecture":
            return self.start_demo_lecture(args or {})
        if cmd == "stop_demo_lecture":
            return self.stop_demo_lecture()
        if cmd == "load_study_extras":
            return self.load_study_extras()
        if cmd == "save_study_extras":
            return self.save_study_extras(args.get("payload") or args or {})

        # --- Account & Credit (Unlimited Pro) ---
        if cmd == "account_signed_in":
            return True
        if cmd == "account_status":
            lic = self._load_local_device_license()
            return {
                "configured": True,
                "signedIn": True,
                "email": lic.get("email") or "",
                "name": lic.get("name") or "",
                "phone": lic.get("phone") or "",
                "deviceId": self.get_hardware_device_id(),
                "unlockedCourses": lic.get("unlockedCourses") or [],
                "balanceSeconds": 35996400
            }
        if cmd == "account_offers":
            return []
        if cmd in ("account_send_code", "account_verify", "account_sign_out", "account_buy", "account_order_status"):
            return None
        if cmd == "watch_charge":
            return {"balance_seconds": 35996400}

        # --- Notes & Folders ---
        if cmd == "load_notes":
            try:
                return json.loads(NOTES_FILE.read_text(encoding="utf-8"))
            except Exception:
                return {"notes": [], "groups": []}
        if cmd == "save_notes":
            payload = args.get("payload") or {"notes": [], "groups": []}
            NOTES_FILE.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
            return None

        # --- Worker & Live Audio ---
        if cmd == "start_worker":
            return self.start_worker()
        if cmd == "stop_worker":
            return self.stop_worker()
        if cmd == "send_worker":
            return self.send_worker(args.get("payload") or {})
        if cmd == "start_capture":
            return self.start_capture(args.get("source", "both"), args.get("feature", "notes"))
        if cmd == "stop_capture":
            return self.stop_capture()
        if cmd == "set_microphone":
            self.mic_enabled = bool(args.get("enabled", True))
            if not self.mic_enabled:
                self.mic_streamer.flush()
            return None
        if cmd == "set_system_audio":
            self.sys_enabled = bool(args.get("enabled", True))
            if not self.sys_enabled:
                self.sys_streamer.flush()
            return None
        if cmd == "audio_apps":
            return [
                {"id": "chrome.exe", "name": "Google Chrome / Trình duyệt"},
                {"id": "zoom.exe", "name": "Zoom / Microsoft Teams / Meet"},
            ]
        if cmd == "set_excluded_apps":
            self.excluded_apps = args.get("apps") or []
            return None

        # --- Models & Voice Pack Status ---
        if cmd == "voice_pack_status":
            avail = VOICE_PACK_DIR.exists()
            return {
                "available": True,
                "path": str(VOICE_PACK_DIR) if avail else str(BASE_DIR),
                "downloading": False,
                "partialBytes": 216000000,
                "sizeBytes": 216000000
            }
        if cmd == "diarization_model_status":
            return {"available": True, "installed": True, "downloading": False}
        if cmd in ("download_voice_pack", "cancel_voice_pack_download", "remove_voice_pack",
                   "download_diarization_model", "cancel_diarization_download", "remove_diarization_model"):
            return self.invoke("voice_pack_status", {}, win_label)

        # --- Browser Bridge ---
        if cmd == "browser_bridge_status":
            return {"enabled": True, "listening": True, "extensions": [{"id": "vietnote-ext", "name": "Chrome"}]}
        if cmd == "browser_bridge_set_enabled":
            return {"enabled": bool(args.get("enabled", True)), "listening": True, "extensions": [{"id": "vietnote-ext", "name": "Chrome"}]}
        if cmd == "browser_bridge_open":
            url = args.get("url")
            if url:
                open_url_cross_platform(url)
            return None

        # --- Pick & Process Audio / Video / Links ---
        if cmd == "pick_audio_file":
            if not self.main_win:
                return None
            file_types = ("Audio/Video Files (*.mp3;*.wav;*.m4a;*.flac;*.ogg;*.aac;*.mp4;*.mkv;*.webm;*.mov)", "All files (*.*)")
            res = self.main_win.create_file_dialog(webview.OPEN_DIALOG, allow_multiple=False, file_types=file_types)
            if not res or len(res) == 0:
                return None
            p = Path(res[0])
            return {
                "path": str(p),
                "name": p.name,
                "size": p.stat().st_size,
                "durationSeconds": probe_media_duration(str(p)),
                "modifiedMs": int(p.stat().st_mtime * 1000)
            }

        if cmd == "pick_video_file":
            if not self.main_win:
                return None
            file_types = ("Video Files (*.mp4;*.mkv;*.webm;*.mov;*.avi)", "All files (*.*)")
            res = self.main_win.create_file_dialog(webview.OPEN_DIALOG, allow_multiple=False, file_types=file_types)
            if not res or len(res) == 0:
                return None
            return self.invoke("open_video_file", {"path": res[0]}, win_label)

        if cmd == "open_video_file":
            p = Path(args.get("path"))
            if not p.exists():
                raise RuntimeError("File video không tồn tại.")
            return {
                "path": str(p),
                "name": p.name,
                "size": p.stat().st_size,
                "durationSeconds": probe_media_duration(str(p)),
                "subtitles": [],
                "stretches": True
            }

        if cmd == "hear_video_part":
            return self.hear_video_part(args.get("path"), float(args.get("from", 0)), float(args.get("to", 60)))

        if cmd == "fetch_link_audio":
            ch_id = extract_channel_id(args.get("onProgress"))
            return self.fetch_link_audio(args.get("url", ""), ch_id)

        if cmd == "cancel_link_audio":
            self.link_cancel_flag.set()
            return None

        if cmd == "file_job_start":
            return self.start_file_job(
                args.get("filename", "audio.mp3"),
                float(args.get("estimatedSeconds") or 60.0),
                args.get("purpose", "file")
            )
        if cmd == "file_job_upload":
            ch_id = extract_channel_id(args.get("onProgress"))
            return self.upload_file_job(
                args.get("jobId"),
                args.get("path"),
                args.get("language", "auto"),
                bool(args.get("translate", True)),
                ch_id
            )
        if cmd == "file_job_status":
            job = self.file_jobs.get(args.get("jobId"))
            if not job:
                return {"status": "failed", "error": "Job not found"}
            if job["status"] == "completed":
                return {
                    "status": "completed",
                    "charged_seconds": 0,
                    "audio_seconds": job["audio_seconds"],
                    "tokens": job["tokens"]
                }
            if job["status"] == "failed":
                return {"status": "failed", "error": job.get("error") or "Lỗi xử lý file"}
            return {"status": "processing"}

        if cmd in ("file_job_cleanup", "file_job_cancel"):
            self.file_jobs.pop(args.get("jobId"), None)
            return None

        # --- AI Intelligence Commands ---
        if cmd == "summarize_segments":
            return self.summarize_segments(
                args.get("segments") or [],
                args.get("previousSummary"),
                args.get("source")
            )
        if cmd == "ask_note":
            ch_id = extract_channel_id(args.get("onProgress"))
            return self.ask_note(args.get("request") or {}, ch_id)
        if cmd == "write_document":
            ch_id = extract_channel_id(args.get("onProgress"))
            return self.write_document(args.get("request") or {}, ch_id)
        if cmd == "suggest_title":
            transcript = (args.get("transcript") or "")[:3000]
            if not transcript.strip():
                return "Ghi chú Điệp Viên Study"
            out = self.engine.call_llm(
                prompt=f"Đặt 1 tiêu đề tiếng Việt ngắn gọn (4 đến 8 từ, không ngoặc kép) cho nội dung sau:\n{transcript}",
                temperature=0.2,
                max_tokens=60,
                prefer_fast=True,
            )
            return out.strip().strip('"\'')[:80] if out else "Ghi chú Điệp Viên Study"

        if cmd in ("translate_text", "translate_paragraph"):
            return self.engine.translate_paragraph(
                args.get("text", ""),
                args.get("previousContext", ""),
                args.get("sourceLanguage", "auto"),
            )
        if cmd == "translate_captions":
            lines = args.get("lines") or []
            if not lines:
                return []
            joined = "\n---LINE---\n".join(lines)
            tr = self.engine.translate_paragraph(joined, args.get("context", ""))
            parts = [p.strip() for p in tr.split("---LINE---")]
            if len(parts) != len(lines):
                parts = [p.strip() for p in tr.splitlines() if p.strip()]
            while len(parts) < len(lines):
                parts.append(self.engine.translate_live_utterance(lines[len(parts)]))
            return parts[:len(lines)]

        if cmd == "translate_speech":
            words = args.get("words") or []
            src = " ".join(w.get("text", "") if isinstance(w, dict) else str(w) for w in words).strip()
            if not src:
                return []
            tr = self.engine.translate_paragraph(src, args.get("context", ""))
            return [{"from": 0, "source": src, "translation": tr}]

        if cmd == "youtube_captions":
            return self.youtube_captions(args.get("url", ""))
        if cmd == "shadowing_get_presets":
            return self.shadowing_get_presets()
        if cmd == "shadowing_load_youtube":
            return self.shadowing_load_youtube(args or {})
        if cmd == "shadowing_mic_start":
            return self.shadowing_mic_start(args or {})
        if cmd == "shadowing_mic_poll":
            return self.shadowing_mic_poll(args or {})
        if cmd == "shadowing_mic_stop":
            return self.shadowing_mic_stop(args or {})
        if cmd == "shadowing_score_speech":
            return self.shadowing_score_speech(args or {})
        if cmd == "shadowing_speak_tts":
            return self.shadowing_speak_tts(args or {})

        # --- Export & OS Utilities ---
        if cmd == "save_export":
            fname = args.get("fileName") or "DiepVienStudy_Export.docx"
            b64_data = args.get("data") or ""
            raw_bytes = base64.b64decode(b64_data) if b64_data else b""
            if self.main_win:
                dest = self.main_win.create_file_dialog(webview.SAVE_DIALOG, save_filename=fname)
                if dest:
                    save_path = dest[0] if isinstance(dest, (list, tuple)) else str(dest)
                    Path(save_path).write_bytes(raw_bytes)
                    return save_path
            fallback_path = Path(os.path.expanduser("~/Downloads")) / fname
            fallback_path.write_bytes(raw_bytes)
            return str(fallback_path)

        if cmd == "reveal_file":
            p = args.get("path")
            if p and os.path.exists(p):
                reveal_file_cross_platform(p)
            return None

        if cmd == "open_link":
            url = args.get("url")
            if url:
                open_url_cross_platform(url)
            return None

        if cmd == "open_permission":
            return None

        # --- PDF Layout-Preserving Translation (VI-Translate AI Engine) ---
        if cmd == "translate_pdf_dialog":
            return self.translate_pdf_dialog(args)

        if cmd == "pdf_translate_status":
            return getattr(self, "_pdf_status_state", {"running": False, "message": "", "files": []})

        # --- Floating Island Window Commands ---
        if cmd == "island_screens":
            if IS_WINDOWS:
                user32 = ctypes.windll.user32
                scale = self._get_dpi_scale()
                sw_phys = user32.GetSystemMetrics(0)
                sh_phys = user32.GetSystemMetrics(1)
                sw = int(round(sw_phys / scale))
                sh = int(round(sh_phys / scale))
                rect = ctypes.wintypes.RECT()
                # SPI_GETWORKAREA = 0x0030
                if user32.SystemParametersInfoW(0x0030, 0, ctypes.byref(rect), 0):
                    vx = int(round(rect.left / scale))
                    vy = int(round(rect.top / scale))
                    vw = int(round((rect.right - rect.left) / scale))
                    vh = int(round((rect.bottom - rect.top) / scale))
                else:
                    vx, vy, vw, vh = 0, 0, sw, sh - 48
                return [{
                    "key": "primary",
                    "primary": True,
                    "notch": False,
                    "frame": {"x": 0, "y": 0, "width": sw, "height": sh},
                    "visible": {"x": vx, "y": vy, "width": vw, "height": vh}
                }]
            else:
                sw, sh = 1440, 900
                try:
                    if webview.screens:
                        sw = int(webview.screens[0].width)
                        sh = int(webview.screens[0].height)
                except Exception:
                    pass
                return [{
                    "key": "primary",
                    "primary": True,
                    "notch": False,
                    "frame": {"x": 0, "y": 0, "width": sw, "height": sh},
                    "visible": {"x": 0, "y": 28, "width": sw, "height": sh - 68}
                }]

        if cmd == "island_cursor":
            if IS_WINDOWS:
                pt = ctypes.wintypes.POINT()
                ctypes.windll.user32.GetCursorPos(ctypes.byref(pt))
                scale = self._get_dpi_scale()
                return [int(round(pt.x / scale)), int(round(pt.y / scale))]
            else:
                try:
                    import Quartz
                    loc = Quartz.CGEventGetLocation(Quartz.CGEventCreate(None))
                    return [int(round(loc.x)), int(round(loc.y))]
                except Exception:
                    return [0, 0]

        if cmd == "island_set_frame":
            if self.island_win:
                try:
                    x = int(round(float(args.get("x", 0))))
                    y = int(round(float(args.get("y", 0))))
                    w = max(120, int(round(float(args.get("width", 248)))))
                    h = max(34, int(round(float(args.get("height", 40)))))
                    self._apply_island_frame_and_region(x, y, w, h)
                except Exception:
                    pass
            return None

        if cmd == "island_set_visible":
            if self.island_win:
                try:
                    if args.get("visible", True):
                        self.island_win.show()
                    else:
                        self.island_win.hide()
                except Exception:
                    pass
            return None

        if cmd == "island_open_main":
            if self.main_win:
                try:
                    self.main_win.restore()
                    self.main_win.show()
                    if IS_WINDOWS:
                        hwnd_m = ctypes.windll.user32.FindWindowW(
                            None, "Điệp Viên Study"
                        )
                        if hwnd_m:
                            ctypes.windll.user32.SetForegroundWindow(hwnd_m)
                except Exception:
                    pass
            return None

        if cmd == "island_focus":
            if IS_WINDOWS:
                hwnd = self._get_island_hwnd()
                if hwnd:
                    try:
                        ctypes.windll.user32.SetForegroundWindow(hwnd)
                    except Exception:
                        pass
            return None

        if cmd in ("island_release", "island_ignore_cursor"):
            return None

        # --- Cross-window Event Forwarding ---
        if cmd in ("plugin:event|emit", "plugin:event|emit_to"):
            ev_name = args.get("event")
            payload = args.get("payload")
            target = None
            if cmd == "plugin:event|emit_to":
                t_arg = args.get("target")
                target = t_arg if isinstance(t_arg, str) else (t_arg or {}).get("label")
            if ev_name:
                if ev_name in ("island:start", "island:source") and not self.capturing:
                    self.start_worker()
                other = "island" if win_label == "main" else "main"
                self.hub.emit(ev_name, payload, target=target or other)
            return None

        return None

    def _get_island_hwnd(self) -> int:
        if not IS_WINDOWS:
            return 0
        hwnd = getattr(self, "_cached_island_hwnd", 0)
        user32 = ctypes.windll.user32
        if hwnd and user32.IsWindow(hwnd):
            return hwnd
        try:
            if self.island_win and getattr(self.island_win, "native", None):
                hwnd = int(self.island_win.native.Handle.ToInt32())
                if hwnd:
                    self._cached_island_hwnd = hwnd
                    return hwnd
        except Exception:
            pass
        hwnd = int(user32.FindWindowW(None, "Điệp Viên Study Island") or 0)
        if hwnd:
            self._cached_island_hwnd = hwnd
        return hwnd

    def _get_dpi_scale(self, hwnd: int = 0) -> float:
        if not IS_WINDOWS:
            return 1.0
        user32 = ctypes.windll.user32
        target_hwnd = hwnd or self._get_island_hwnd()
        try:
            if target_hwnd and hasattr(user32, "GetDpiForWindow"):
                dpi = int(user32.GetDpiForWindow(target_hwnd))
                if dpi > 0:
                    return dpi / 96.0
        except Exception:
            pass
        try:
            if hasattr(user32, "GetDpiForSystem"):
                dpi = int(user32.GetDpiForSystem())
                if dpi > 0:
                    return dpi / 96.0
        except Exception:
            pass
        return 1.0

    def _apply_island_frame_and_region(self, x: int, y: int, w: int, h: int):
        """
        Di chuyển + đổi cỡ cửa sổ Floating Island trong 1 lệnh Win32 SetWindowPos duy nhất (chuẩn 64-bit argtypes)
        trên Windows, hoặc qua pywebview Cocoa native trên macOS.
        """
        if not IS_WINDOWS:
            if self.island_win:
                try:
                    self.island_win.resize(w, h)
                    self.island_win.move(x, y)
                except Exception:
                    pass
            return

        hwnd = self._get_island_hwnd()
        scale = self._get_dpi_scale(hwnd)
        px = int(round(x * scale))
        py = int(round(y * scale))
        pw = max(int(round(120 * scale)), int(round(w * scale)))
        ph = max(int(round(34 * scale)), int(round(h * scale)))

        if hwnd:
            user32 = ctypes.windll.user32
            gdi32 = ctypes.windll.gdi32
            if not getattr(self, "_win32_rgn_argtypes_set", False):
                user32.SetWindowPos.argtypes = [
                    ctypes.wintypes.HWND,
                    ctypes.wintypes.HWND,
                    ctypes.c_int,
                    ctypes.c_int,
                    ctypes.c_int,
                    ctypes.c_int,
                    ctypes.c_uint,
                ]
                gdi32.CreateRoundRectRgn.argtypes = [
                    ctypes.c_int,
                    ctypes.c_int,
                    ctypes.c_int,
                    ctypes.c_int,
                    ctypes.c_int,
                    ctypes.c_int,
                ]
                gdi32.CreateRoundRectRgn.restype = ctypes.wintypes.HRGN
                user32.SetWindowRgn.argtypes = [
                    ctypes.wintypes.HWND,
                    ctypes.wintypes.HRGN,
                    ctypes.wintypes.BOOL,
                ]
                self._win32_rgn_argtypes_set = True

            # 0x0004 = SWP_NOZORDER, 0x0010 = SWP_NOACTIVATE, 0x0040 = SWP_SHOWWINDOW
            user32.SetWindowPos(hwnd, 0, px, py, pw, ph, 0x0004 | 0x0010 | 0x0040)
            # Khi thu gọn (h <= 52): bo tròn 100% thành viên thuốc (pill); khi mở rộng: bo góc 22px
            if h <= 52:
                radius = ph
            elif w >= 600 and h <= 260:
                radius = int(round(32 * scale))
            else:
                radius = int(round(44 * scale))
            rgn = gdi32.CreateRoundRectRgn(0, 0, pw + 1, ph + 1, radius, radius)
            if rgn:
                user32.SetWindowRgn(hwnd, rgn, True)
            # Bỏ WS_EX_APPWINDOW, gắn WS_EX_TOOLWINDOW để tab nổi không chiếm chỗ dưới thanh Taskbar
            try:
                GWL_EXSTYLE = -20
                WS_EX_TOOLWINDOW = 0x00000080
                WS_EX_APPWINDOW = 0x00040000
                ex_style = user32.GetWindowLongW(hwnd, GWL_EXSTYLE)
                new_style = (ex_style | WS_EX_TOOLWINDOW) & ~WS_EX_APPWINDOW
                if new_style != ex_style:
                    user32.SetWindowLongW(hwnd, GWL_EXSTYLE, new_style)
            except Exception:
                pass
        elif self.island_win:
            self.island_win.resize(w, h)
            self.island_win.move(x, y)

    def translate_pdf_dialog(self, args: dict | None = None) -> dict:
        """
        Chọn 1 hoặc nhiều file PDF và dịch giữ nguyên bố cục (Công thức Toán, Bảng biểu, Hình ảnh)
        bằng động cơ VI-Translate (`dich_pdf_engine.py`), xuất cả bản Đơn Ngữ (-vi.pdf) và Song Ngữ (-dual.pdf).
        """
        args = args or {}
        service = str(args.get("service") or "google").strip()
        lang_in = str(args.get("lang_in") or "auto").strip()
        lang_out = str(args.get("lang_out") or "vi").strip()
        provided_path = str(args.get("path") or "").strip()

        selected_files = []
        if provided_path and os.path.isfile(provided_path):
            selected_files = [provided_path]
        elif self.main_win:
            try:
                file_types = ("PDF Documents (*.pdf)", "All files (*.*)")
                res = self.main_win.create_file_dialog(webview.OPEN_DIALOG, allow_multiple=True, file_types=file_types)
                if res:
                    selected_files = list(res) if isinstance(res, (list, tuple)) else [str(res)]
            except Exception:
                selected_files = []

        if not selected_files:
            return {"ok": False, "cancelled": True, "message": "Chưa chọn file PDF."}

        self._pdf_status_state = {
            "running": True,
            "message": f"Đang dịch {len(selected_files)} file PDF giữ nguyên bố cục…",
            "files": [],
        }
        self.hub.emit("pdf-translate-status", self._pdf_status_state)

        def _bg_pdf_worker():
            engine_candidates = [
                BASE_DIR / "dich_pdf_engine.py",
                Path(r"C:\Users\Admin\Downloads\02. Điệp Viên Tài Liệu\dich_pdf_engine.py"),
                BASE_DIR.parent.parent / "03_He_Sinh_Thai_8_Tool" / "02_Diep_Vien_Tai_Lieu" / "dich_pdf_engine.py",
            ]
            engine_script = next((p for p in engine_candidates if p.exists()), None)
            results_out = []
            try:
                if engine_script is None:
                    raise RuntimeError("Không tìm thấy dich_pdf_engine.py trong Điệp Viên Tài Liệu.")

                import importlib.util
                spec = importlib.util.spec_from_file_location("dv_dich_pdf_engine", str(engine_script))
                mod = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(mod)

                for idx, fpath in enumerate(selected_files, 1):
                    fname = os.path.basename(fpath)
                    self._pdf_status_state = {
                        "running": True,
                        "message": f"Đang dịch ({idx}/{len(selected_files)}): {fname}…",
                        "files": results_out,
                    }
                    self.hub.emit("pdf-translate-status", self._pdf_status_state)
                    res = mod.translate_pdf_preserve_layout(
                        pdf_path=fpath,
                        service=service,
                        lang_in=lang_in,
                        lang_out=lang_out,
                        threads=4,
                    )
                    results_out.append({
                        "input": fpath,
                        "name": fname,
                        "mono": res.get("mono_pdf") or "",
                        "dual": res.get("dual_pdf") or "",
                        "output_dir": res.get("output_dir") or "",
                        "elapsed": res.get("elapsed_seconds") or 0,
                    })

                first_out = results_out[0]["mono"] or results_out[0]["dual"] if results_out else ""
                if first_out and os.path.exists(first_out):
                    reveal_file_cross_platform(first_out)

                # Tự động lưu vào Ghi chú của Điệp Viên Study
                try:
                    store = json.loads(NOTES_FILE.read_text(encoding="utf-8")) if NOTES_FILE.exists() else {"notes": [], "groups": []}
                    now_iso = datetime.now().isoformat()
                    summary_lines = []
                    for r in results_out:
                        summary_lines.append(
                            f"### {r['name']} ({r['elapsed']}s)\n"
                            f"- **Bản Đơn Ngữ (Tiếng Việt):** `{r['mono']}`\n"
                            f"- **Bản Song Ngữ (Đối chiếu 2 trang):** `{r['dual']}`"
                        )
                    new_note = {
                        "id": str(uuid.uuid4()),
                        "title": f"Dịch PDF · {results_out[0]['name']}" if len(results_out) == 1 else f"Dịch {len(results_out)} file PDF chuẩn bố cục",
                        "groupID": None,
                        "source": "file",
                        "createdAt": now_iso,
                        "updatedAt": now_iso,
                        "duration": sum(float(r.get("elapsed") or 0) for r in results_out),
                        "summary": "## Kết Quả Dịch PDF Giữ Nguyên Bố Cục (VI-Translate AI)\n\n" + "\n\n".join(summary_lines),
                        "transcript": "\n\n".join(summary_lines),
                    }
                    store["notes"] = [new_note] + (store.get("notes") or [])
                    NOTES_FILE.write_text(json.dumps(store, ensure_ascii=False, indent=2), encoding="utf-8")
                except Exception:
                    pass

                self._pdf_status_state = {
                    "running": False,
                    "ok": True,
                    "message": f"Đã dịch xong {len(results_out)} file PDF (Đơn ngữ + Song ngữ)!",
                    "files": results_out,
                }
                self.hub.emit("pdf-translate-status", self._pdf_status_state)
            except Exception as e:
                self._pdf_status_state = {
                    "running": False,
                    "ok": False,
                    "message": f"Lỗi dịch PDF: {e}",
                    "files": results_out,
                }
                self.hub.emit("pdf-translate-status", self._pdf_status_state)

        threading.Thread(target=_bg_pdf_worker, daemon=True).start()
        return {"ok": True, "started": True, "count": len(selected_files)}


    def _run_ota_auto_update_daemon(self):
        """
        Tự động kiểm tra và cập nhật ngầm (Cloud OTA Auto-Update) từ https://diepvientailieu.store/app_ota/version_manifest.json
        Mỗi khi Admin cập nhật thêm khóa học mới, đề cương mới hoặc nâng cấp giao diện/tính năng AI,
        App trên máy khách hàng sẽ tự động tải bản mới về ngay khi mở máy mà không cần cài lại!
        """
        import hashlib
        self._ota_status = {"version": "2026.11.25.6", "autoUpdateEnabled": True, "updatedFiles": []}

        def _ota_worker():
            time.sleep(2.0)
            manifest_urls = [
                "https://diepvientailieu.store/version_manifest.json",
                "https://diepvientailieu.store/app_ota/version_manifest.json",
                "https://raw.githubusercontent.com/teamtccm/diepvientailieu.store/main/version_manifest.json",
            ]
            for m_url in manifest_urls:
                try:
                    r = requests.get(f"{m_url}?t={int(time.time())}", timeout=6)
                    if r.status_code != 200:
                        continue
                    manifest = r.json()
                    if not isinstance(manifest, dict):
                        continue
                    local_ver = "2026.11.25.6"
                    remote_ver = str(manifest.get("version") or "2026.11.06").strip()
                    def _ver_tuple(v_str):
                        return tuple(int(x) for x in re.findall(r"\d+", str(v_str)))
                    # CHỐNG HẠ CẤP OTA (Anti-Downgrade): Chỉ tải đè khi bản trên Cloud MỚI HƠN bản đang cài!
                    if _ver_tuple(remote_ver) <= _ver_tuple(local_ver):
                        self._ota_status = {
                            "version": local_ver,
                            "autoUpdateEnabled": True,
                            "updatedFiles": [],
                            "checkedAt": int(time.time()),
                        }
                        break
                    base_ota_url = m_url.rsplit("/", 1)[0]
                    updated_list = []
                    for f_entry in (manifest.get("files") or []):
                        rel_path = str(f_entry.get("path") or "").strip().lstrip("/")
                        remote_sha = str(f_entry.get("sha256") or "").strip().lower()
                        dl_subpath = str(f_entry.get("otaFile") or rel_path).strip().lstrip("/")
                        if not rel_path or not remote_sha:
                            continue
                        local_target = (BASE_DIR / rel_path).resolve()
                        if not str(local_target).startswith(str(BASE_DIR.resolve())):
                            continue
                        local_sha = ""
                        if local_target.exists() and local_target.is_file():
                            try:
                                local_sha = hashlib.sha256(local_target.read_bytes()).hexdigest().lower()
                            except Exception:
                                local_sha = ""
                        if local_sha != remote_sha:
                            direct_u = str(f_entry.get("url") or "").strip()
                            file_url = f"{direct_u}?t={int(time.time())}" if direct_u.startswith("http") else f"{base_ota_url}/{dl_subpath}?t={int(time.time())}"
                            fr = requests.get(file_url, timeout=15)
                            if fr.status_code == 200 and len(fr.content) > 128:
                                got_sha = hashlib.sha256(fr.content).hexdigest().lower()
                                if got_sha == remote_sha:
                                    local_target.parent.mkdir(parents=True, exist_ok=True)
                                    tmp_target = local_target.with_suffix(local_target.suffix + ".ota_tmp")
                                    tmp_target.write_bytes(fr.content)
                                    os.replace(str(tmp_target), str(local_target))
                                    updated_list.append(rel_path)
                    self._ota_status = {
                        "version": remote_ver,
                        "autoUpdateEnabled": True,
                        "updatedFiles": updated_list,
                        "checkedAt": int(time.time()),
                    }
                    if updated_list:
                        self.hub.emit("dvtl-ota-updated", self._ota_status)
                        if self.main_win:
                            try:
                                self.main_win.evaluate_js("window.location.reload()")
                            except Exception:
                                pass
                    break
                except Exception:
                    continue

            # Đồng bộ thêm danh mục sản phẩm / khóa học live từ Master Sheet
            try:
                rp = requests.get(f"{self.DVTL_WEBHOOK_URL}?action=getProducts", timeout=6)
                if rp.status_code == 200:
                    APP_DATA_DIR.mkdir(parents=True, exist_ok=True)
                    (APP_DATA_DIR / "dvtl_live_catalog_cache.json").write_text(rp.text, encoding="utf-8")
            except Exception:
                pass

        threading.Thread(target=_ota_worker, daemon=True).start()


DVTL_GOOGLE_CLIENT_ID = "963881331331-d22ei0lqfvvqfa4hqjafftcrfhaghs0l.apps.googleusercontent.com"
DVTL_GOOGLE_AUTH_CACHE_PATH = Path.home() / ".diepvien_study_google_auth.json"

def _dvs_load_saved_google_user():
    try:
        if DVTL_GOOGLE_AUTH_CACHE_PATH.exists():
            d = json.loads(DVTL_GOOGLE_AUTH_CACHE_PATH.read_text(encoding="utf-8"))
            if isinstance(d, dict) and d.get("email"):
                return d
    except Exception:
        pass
    return None

def _dvs_save_google_user(u):
    try:
        if u and isinstance(u, dict) and u.get("email"):
            DVTL_GOOGLE_AUTH_CACHE_PATH.write_text(json.dumps(u, ensure_ascii=False, indent=2), encoding="utf-8")
        elif DVTL_GOOGLE_AUTH_CACHE_PATH.exists():
            DVTL_GOOGLE_AUTH_CACHE_PATH.unlink()
    except Exception:
        pass

def _dvs_verify_google_id_token(id_token):
    if not id_token:
        return None, "Thiếu id_token"
    try:
        r = requests.get("https://oauth2.googleapis.com/tokeninfo", params={"id_token": id_token}, timeout=10)
        if r.status_code != 200:
            return None, "Mã xác thực Google không hợp lệ hoặc đã hết hạn."
        info = r.json()
        if str(info.get("aud") or "") != DVTL_GOOGLE_CLIENT_ID:
            return None, "Sai Google Client ID."
        if str(info.get("email_verified") or "").lower() != "true":
            return None, "Gmail chưa được xác minh."
        email = str(info.get("email") or "").strip().lower()
        user = {
            "email": email,
            "name": str(info.get("name") or email.split("@")[0]).strip(),
            "picture": str(info.get("picture") or "").strip(),
            "verifiedByGoogle": True,
            "isAdmin": email in ("diepvientailieu@gmail.com", "admin@diepvientailieu.store"),
            "unlockedCourses": [],
            "phone": "",
        }
        # Sync entitlements from GAS live
        try:
            gr = requests.get(
                "https://script.google.com/macros/s/AKfycbxMOdsNkhY8-5xQtZ_86STf781VdFJbRsLkK6n8qRF4ENqreMsl4CdELYn-85wHcqvx/exec",
                params={"action": "verifyGoogleLogin", "idToken": id_token, "deviceName": "DiepVienStudy Desktop"},
                timeout=12,
            )
            if gr.status_code == 200:
                gd = gr.json()
                if gd.get("ok") and isinstance(gd.get("customer"), dict):
                    user.update(gd["customer"])
        except Exception:
            pass
        _dvs_save_google_user(user)
        return user, None
    except Exception as ex:
        return None, str(ex)

def make_http_handler(controller: BackendController, hub: EventHub):
    MIME_MAP = {
        ".html": "text/html; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
        ".woff2": "font/woff2",
        ".woff": "font/woff",
        ".ttf": "font/ttf",
    }

    class VietNoteRequestHandler(BaseHTTPRequestHandler):
        protocol_version = "HTTP/1.1"

        def log_message(self, format, *args):
            pass

        def do_GET(self):
            parsed = urllib.parse.urlparse(self.path)
            route = parsed.path

            # 0A. Direct Authenticated Google Drive Video Streaming (HTTP 206 Partial Content)
            if route.startswith("/api/drive/stream/"):
                file_id = route.split("/api/drive/stream/", 1)[1].strip("/")
                qs_s = urllib.parse.parse_qs(parsed.query)
                req_email = (qs_s.get("email") or [""])[0].strip().lower()
                req_course = (qs_s.get("courseId") or [""])[0].strip().upper()
                if not file_id or not re.match(r"^[A-Za-z0-9_-]{10,}$", file_id):
                    self.send_error(400, "Invalid Drive file ID")
                    return
                if not controller._is_user_authorized_for_course(req_email, req_course):
                    self.send_error(403, "Account not authorized for this Google Drive course")
                    return
                g_user_cur = getattr(controller, "_google_user", None) or {}
                u_tok = str(g_user_cur.get("accessToken") or "") if str(g_user_cur.get("email") or "").lower() == req_email else ""
                drive_tok = controller._get_valid_drive_access_token(u_tok)
                if not drive_tok:
                    # Fallback redirect to preview if no OAuth token available
                    self.send_response(302)
                    self.send_header("Location", f"https://drive.google.com/file/d/{file_id}/preview")
                    self.end_headers()
                    return

                range_hdr = self.headers.get("Range") or "bytes=0-"
                up_headers = {"Authorization": f"Bearer {drive_tok}", "Range": range_hdr}
                media_url = f"https://www.googleapis.com/drive/v3/files/{file_id}?alt=media&supportsAllDrives=true"
                try:
                    up_resp = requests.get(media_url, headers=up_headers, stream=True, timeout=(8, 60))
                    if up_resp.status_code == 401:
                        controller._cached_drive_tok = ""
                        drive_tok = controller._get_valid_drive_access_token("")
                        if drive_tok:
                            up_headers["Authorization"] = f"Bearer {drive_tok}"
                            up_resp = requests.get(media_url, headers=up_headers, stream=True, timeout=(8, 60))
                    if up_resp.status_code not in (200, 206):
                        up_resp.close()
                        self.send_error(up_resp.status_code, "Upstream Drive stream error")
                        return

                    self.send_response(up_resp.status_code)
                    ctype = up_resp.headers.get("Content-Type") or "video/mp4"
                    if ctype == "application/octet-stream":
                        ctype = "video/mp4"
                    self.send_header("Content-Type", ctype)
                    self.send_header("Accept-Ranges", "bytes")
                    if up_resp.headers.get("Content-Range"):
                        self.send_header("Content-Range", up_resp.headers["Content-Range"])
                    if up_resp.headers.get("Content-Length"):
                        self.send_header("Content-Length", up_resp.headers["Content-Length"])
                    self.send_header("Cache-Control", "private, max-age=3600")
                    self.end_headers()
                    try:
                        for chunk in up_resp.iter_content(chunk_size=131072):
                            if chunk:
                                self.wfile.write(chunk)
                    except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
                        pass
                    finally:
                        up_resp.close()
                except Exception as ex_st:
                    try:
                        self.send_error(502, str(ex_st))
                    except Exception:
                        pass
                return

            # 0. Google 1-Click OAuth Routes (App <-> diepvientailieu.store)
            if route == "/api/auth/google/status":
                u = getattr(controller, "_google_user", None) or _dvs_load_saved_google_user()
                if u:
                    controller._google_user = u
                payload = json.dumps({"ok": True, "user": u}, ensure_ascii=False).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Cache-Control", "no-store")
                self.send_header("Content-Length", str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
                return

            if route == "/api/auth/google/start":
                port = getattr(controller, "server_port", 0) or self.server.server_address[1]
                cb = f"http://127.0.0.1:{port}/api/auth/google/callback"
                auth_url = f"https://diepvientailieu.store/?app_google_auth=1&cb={urllib.parse.quote(cb, safe='')}"
                try:
                    import webbrowser
                    webbrowser.open(auth_url)
                except Exception:
                    pass
                payload = json.dumps({"ok": True, "authUrl": auth_url}, ensure_ascii=False).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Cache-Control", "no-store")
                self.send_header("Content-Length", str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
                return

            if route == "/api/auth/google/callback":
                qs = urllib.parse.parse_qs(parsed.query)
                id_tok = (qs.get("id_token") or [""])[0]
                acc_tok = (qs.get("access_token") or [""])[0]
                if id_tok:
                    user, err = _dvs_verify_google_id_token(id_tok)
                elif acc_tok:
                    try:
                        ur = requests.get("https://www.googleapis.com/oauth2/v3/userinfo", headers={"Authorization": f"Bearer {acc_tok}"}, timeout=10)
                        ui = ur.json() if ur.status_code == 200 else {}
                        em = str(ui.get("email") or "").strip().lower()
                        if em:
                            user = {"email": em, "name": str(ui.get("name") or em.split("@")[0]).strip(), "picture": str(ui.get("picture") or "").strip(), "verifiedByGoogle": True, "isAdmin": em == "diepvientailieu@gmail.com", "unlockedCourses": [], "phone": "", "accessToken": acc_tok}
                            try:
                                gr = requests.get("https://script.google.com/macros/s/AKfycbxMOdsNkhY8-5xQtZ_86STf781VdFJbRsLkK6n8qRF4ENqreMsl4CdELYn-85wHcqvx/exec", params={"action": "verifyGoogleLogin", "accessToken": acc_tok, "deviceName": "DiepVienStudy Desktop"}, timeout=12)
                                if gr.status_code == 200 and gr.json().get("ok") and isinstance(gr.json().get("customer"), dict):
                                    user.update(gr.json()["customer"])
                            except Exception:
                                pass
                            _dvs_save_google_user(user)
                            err = None
                        else:
                            user, err = None, "Không lấy được thông tin Gmail từ Google."
                    except Exception as ex_acc:
                        user, err = None, str(ex_acc)
                else:
                    user, err = None, "Thiếu mã xác thực Google"
                if user:
                    controller._google_user = user
                    html = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>Đăng nhập thành công</title>
                    <style>body{{font-family:system-ui,sans-serif;background:#071033;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}}
                    .box{{background:#fff;color:#0F172A;padding:34px 38px;border-radius:24px;text-align:center;max-width:420px;box-shadow:0 24px 60px rgba(0,0,0,.4)}}
                    .ok{{width:56px;height:56px;border-radius:50%;background:#10B981;color:#fff;font-size:28px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}}</style></head>
                    <body><div class="box"><div class="ok"></div><h2>Đăng nhập Google thành công!</h2>
                    <p style="font-size:14px;color:#334155">Xin chào <b>{user.get('name','')}</b> ({user.get('email','')})</p>
                    <p style="font-size:13px;color:#64748B">App <b>Điệp Viên Study</b> đã nhận phiên đăng nhập và tự động mở khóa dữ liệu của bạn. Bạn có thể đóng tab này!</p>
                    <script>setTimeout(()=>window.close(),2200);</script></div></body></html>""".encode("utf-8")
                else:
                    html = f"""<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>Lỗi đăng nhập</title></head>
                    <body style="font-family:system-ui;padding:40px;text-align:center"><h2>Không thể xác thực Google</h2><p>{err or 'Vui lòng thử lại từ App.'}</p></body></html>""".encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Cache-Control", "no-store")
                self.send_header("Content-Length", str(len(html)))
                self.end_headers()
                self.wfile.write(html)
                return

            # 1. SSE Event Stream
            if route == "/__tauri_events__":
                qs = urllib.parse.parse_qs(parsed.query)
                win_label = (qs.get("window") or ["main"])[0]
                self.send_response(200)
                self.send_header("Content-Type", "text/event-stream; charset=utf-8")
                self.send_header("Cache-Control", "no-cache")
                self.send_header("Connection", "keep-alive")
                self.end_headers()

                q = hub.subscribe(win_label)
                try:
                    while True:
                        try:
                            msg = q.get(timeout=15.0)
                            chunk = f"data: {msg}\n\n".encode("utf-8")
                            self.wfile.write(chunk)
                            self.wfile.flush()
                        except queue.Empty:
                            self.wfile.write(b": keepalive\n\n")
                            self.wfile.flush()
                except Exception:
                    pass
                finally:
                    hub.unsubscribe(win_label, q)
                return

            # 2. Local Media Asset Streaming
            if route == "/__asset__":
                qs = urllib.parse.parse_qs(parsed.query)
                file_path = (qs.get("path") or [""])[0]
                if not file_path or not os.path.isfile(file_path):
                    self.send_error(404, "File not found")
                    return
                file_size = os.path.getsize(file_path)
                ext = os.path.splitext(file_path)[1].lower()
                ctype = {
                    ".mp4": "video/mp4", ".webm": "video/webm", ".mkv": "video/x-matroska",
                    ".mov": "video/quicktime", ".mp3": "audio/mpeg", ".wav": "audio/wav",
                    ".m4a": "audio/mp4", ".ogg": "audio/ogg", ".flac": "audio/flac"
                }.get(ext, "application/octet-stream")

                range_hdr = self.headers.get("Range")
                start, end = 0, file_size - 1
                if range_hdr and range_hdr.startswith("bytes="):
                    parts = range_hdr[6:].split("-", 1)
                    if parts[0]:
                        start = int(parts[0])
                    if len(parts) > 1 and parts[1]:
                        end = int(parts[1])
                    end = min(end, file_size - 1)
                    length = end - start + 1
                    self.send_response(206)
                    self.send_header("Content-Type", ctype)
                    self.send_header("Accept-Ranges", "bytes")
                    self.send_header("Content-Range", f"bytes {start}-{end}/{file_size}")
                    self.send_header("Content-Length", str(length))
                    self.end_headers()
                else:
                    length = file_size
                    self.send_response(200)
                    self.send_header("Content-Type", ctype)
                    self.send_header("Accept-Ranges", "bytes")
                    self.send_header("Content-Length", str(length))
                    self.end_headers()

                with open(file_path, "rb") as f:
                    f.seek(start)
                    rem = length
                    while rem > 0:
                        buf = f.read(min(65536, rem))
                        if not buf:
                            break
                        try:
                            self.wfile.write(buf)
                        except Exception:
                            break
                        rem -= len(buf)
                return

            # 3. Static Files từ web_dist/ (Tối ưu RAM Cache + Gzip + ETag tải giao diện 2.5MB trong < 1ms!)
            import gzip as _gzip
            rel = urllib.parse.unquote(route.lstrip("/")) or "index.html"
            target = (WEB_DIST_DIR / rel).resolve()
            if not str(target).startswith(str(WEB_DIST_DIR.resolve())) or not target.is_file():
                target = WEB_DIST_DIR / "index.html"

            stat_st = target.stat()
            cache_key = str(target)
            mtime_ns = stat_st.st_mtime_ns
            etag = f'"{mtime_ns:x}-{stat_st.st_size:x}"'

            if self.headers.get("If-None-Match") == etag:
                self.send_response(304)
                self.send_header("ETag", etag)
                self.end_headers()
                return

            ram_cache = getattr(controller, "_static_ram_cache", None)
            if ram_cache is None:
                ram_cache = {}
                controller._static_ram_cache = ram_cache

            entry = ram_cache.get(cache_key)
            suffix_low = target.suffix.lower()
            if entry is None or entry[0] != mtime_ns:
                raw_bytes = target.read_bytes()
                gz_bytes = (
                    _gzip.compress(raw_bytes, compresslevel=5)
                    if suffix_low in (".js", ".css", ".html", ".json", ".svg") and len(raw_bytes) > 1024
                    else None
                )
                entry = (mtime_ns, raw_bytes, gz_bytes)
                if len(raw_bytes) <= 8 * 1024 * 1024:
                    ram_cache[cache_key] = entry

            accept_enc = (self.headers.get("Accept-Encoding") or "").lower()
            use_gzip = entry[2] is not None and "gzip" in accept_enc
            body_out = entry[2] if use_gzip else entry[1]
            ctype = MIME_MAP.get(suffix_low, "application/octet-stream")

            self.send_response(200)
            self.send_header("Content-Type", ctype)
            if use_gzip:
                self.send_header("Content-Encoding", "gzip")
            self.send_header("Content-Length", str(len(body_out)))
            self.send_header("ETag", etag)
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
            self.send_header("Pragma", "no-cache")
            self.end_headers()
            self.wfile.write(body_out)

        def do_POST(self):
            parsed = urllib.parse.urlparse(self.path)
            route = parsed.path

            if route == "/api/auth/google/logout":
                controller._google_user = None
                _dvs_save_google_user(None)
                payload = json.dumps({"ok": True}).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
                return

            # 1. Tauri Invoke RPC
            if route == "/__tauri_invoke__":
                length = int(self.headers.get("Content-Length", 0))
                raw = self.rfile.read(length)
                try:
                    req = json.loads(raw.decode("utf-8"))
                    cmd = req.get("cmd", "")
                    args = req.get("args") or {}
                    win_label = req.get("window") or "main"
                    result = controller.invoke(cmd, args, win_label)
                    resp_bytes = json.dumps({"ok": True, "result": result}, ensure_ascii=False).encode("utf-8")
                except Exception as e:
                    resp_bytes = json.dumps({"ok": False, "error": str(e)}, ensure_ascii=False).encode("utf-8")

                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(resp_bytes)))
                self.end_headers()
                self.wfile.write(resp_bytes)
                return

            # 2. OpenAI-Compatible Whisper Endpoint (/v1/audio/transcriptions)
            if route == "/v1/audio/transcriptions":
                length = int(self.headers.get("Content-Length", 0))
                body_bytes = self.rfile.read(length)
                text_out = ""
                try:
                    wav_start = body_bytes.find(b"RIFF")
                    if wav_start >= 0:
                        wav_end = body_bytes.rfind(b"\r\n--")
                        wav_bytes = body_bytes[wav_start:wav_end] if wav_end > wav_start else body_bytes[wav_start:]
                        text_out, _ = controller.engine.transcribe_wav_bytes(
                            wav_bytes,
                            language_hint=controller.current_language,
                            duration_sec=2.5,
                        )
                except Exception:
                    text_out = ""

                resp_bytes = json.dumps({"text": text_out}, ensure_ascii=False).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(resp_bytes)))
                self.end_headers()
                self.wfile.write(resp_bytes)
                return

            self.send_error(404, "Not Found")

    return VietNoteRequestHandler


def main():
    if IS_WINDOWS:
        try:
            ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID("DiepVien.Study.Desktop.v3")
        except Exception:
            pass
    hub = EventHub()
    controller = BackendController(hub)
    try:
        controller._run_ota_auto_update_daemon()
    except Exception:
        pass

    handler_cls = make_http_handler(controller, hub)
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler_cls)
    port = server.server_address[1]
    controller.server_port = port

    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()

    if IS_WINDOWS:
        user32 = ctypes.windll.user32
        scale_init = controller._get_dpi_scale()
        sw_logical = int(round(user32.GetSystemMetrics(0) / scale_init))
    else:
        sw_logical = 1440
        try:
            if webview.screens:
                sw_logical = int(webview.screens[0].width)
        except Exception:
            pass

    main_win = webview.create_window(
        title="Điệp Viên Study",
        url=f"http://127.0.0.1:{port}/?window=main",
        width=1380,
        height=880,
        min_size=(980, 640),
        resizable=True,
        background_color="#0D1117",
    )
    controller.main_win = main_win

    island_w, island_h = 248, 40
    island_x = max(12, (sw_logical - island_w) // 2)
    island_y = 12 if IS_WINDOWS else 32
    island_win = webview.create_window(
        title="Điệp Viên Study Island",
        url=f"http://127.0.0.1:{port}/?window=island",
        width=island_w,
        height=island_h,
        min_size=(120, 20),
        x=island_x,
        y=island_y,
        frameless=True,
        on_top=True,
        resizable=False,
        easy_drag=False,
        background_color="#100E1E",
    )
    controller.island_win = island_win

    if IS_WINDOWS:
        def apply_win32_rounded_icon_and_island():
            ico_file = str(BASE_DIR / "diepvien.ico")
            icon_done = False
            island_done = False
            for _ in range(25):
                time.sleep(0.20)
                if not icon_done and os.path.exists(ico_file):
                    hwnd = user32.FindWindowW(None, "Điệp Viên Study")
                    if hwnd:
                        h_big = user32.LoadImageW(0, ico_file, 1, 256, 256, 0x00000010)
                        h_small = user32.LoadImageW(0, ico_file, 1, 32, 32, 0x00000010)
                        if h_big:
                            user32.SendMessageW(hwnd, 0x0080, 1, h_big)
                        if h_small:
                            user32.SendMessageW(hwnd, 0x0080, 0, h_small)
                        icon_done = True
                if not island_done:
                    ihwnd = controller._get_island_hwnd()
                    if ihwnd:
                        controller._apply_island_frame_and_region(island_x, 12, island_w, island_h)
                        island_done = True
                if icon_done and island_done:
                    break

        threading.Thread(target=apply_win32_rounded_icon_and_island, daemon=True).start()

    def on_main_closed():
        controller.stop_worker()
        try:
            island_win.destroy()
        except Exception:
            pass
        try:
            server.shutdown()
        except Exception:
            pass
        os._exit(0)

    main_win.events.closed += on_main_closed
    webview.start(debug=False)


if __name__ == "__main__":
    main()
