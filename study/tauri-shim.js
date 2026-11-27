// Điệp Viên Study — Full Standalone Desktop Web/PWA Runtime Engine v16.2
(function () {
  const params = new URLSearchParams(window.location.search);
  const currentLabel = params.get("window") || "main";
  const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxMOdsNkhY8-5xQtZ_86STf781VdFJbRsLkK6n8qRF4ENqreMsl4CdELYn-85wHcqvx/exec";

  // Pre-hydrate customer profile from query params or main website localStorage
  try {
    const qName = (params.get("u") || "").trim();
    const qEmail = (params.get("e") || "").trim().toLowerCase();
    const webSync = JSON.parse(localStorage.getItem("dvtl_synced_customer") || "null") || {};
    const finalName = qName || webSync.name || localStorage.getItem("dvs_cust_name") || "";
    const finalEmail = qEmail || webSync.email || localStorage.getItem("dvs_cust_email") || "";
    if (finalName) localStorage.setItem("dvs_cust_name", finalName);
    if (finalEmail && finalEmail.includes("@")) localStorage.setItem("dvs_cust_email", finalEmail);
    if (finalName || finalEmail) {
      const existingLic = JSON.parse(localStorage.getItem("dvs_pwa_license") || "null") || {};
      localStorage.setItem("dvs_pwa_license", JSON.stringify({
        ...existingLic,
        name: finalName || existingLic.name || "",
        email: finalEmail || existingLic.email || "",
        boundEmail: finalEmail || existingLic.boundEmail || "",
        phone: webSync.phone || existingLic.phone || localStorage.getItem("dvs_cust_phone") || "",
        unlockedCourses: Array.isArray(webSync.unlockedCourses) && webSync.unlockedCourses.length
          ? webSync.unlockedCourses
          : (existingLic.unlockedCourses || [])
      }));
    }
  } catch (_) {}

  // 1. PWA Native Desktop App Install Prompt
  let deferredInstallPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    showInstallBanner();
  });

  function showInstallBanner() {
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (document.getElementById("dvsPwaInstallFloatingBar")) return;
    const bar = document.createElement("div");
    bar.id = "dvsPwaInstallFloatingBar";
    bar.style.cssText = "position:fixed;bottom:18px;right:18px;z-index:99999;background:linear-gradient(135deg,#0D1677,#1E40AF);color:#fff;padding:10px 16px;border-radius:14px;box-shadow:0 12px 32px rgba(13,22,119,0.35);display:flex;align-items:center;gap:12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;border:1px solid rgba(255,255,255,0.22);";
    bar.innerHTML = '<span>⚡ Ghim <b>Điệp Viên Study</b> ra Màn hình chính / Taskbar</span><button id="dvsBtnInstallNow" style="background:#FFA000;color:#0f172a;border:none;padding:6px 14px;border-radius:9px;font-weight:800;cursor:pointer;font-size:12px;">Cài Đặt 1 Chạm</button><button id="dvsBtnCloseBar" style="background:transparent;color:#cbd5e1;border:none;font-size:16px;cursor:pointer;padding:0 4px;">×</button>';
    document.body.appendChild(bar);
    document.getElementById("dvsBtnCloseBar").onclick = () => bar.remove();
    document.getElementById("dvsBtnInstallNow").onclick = async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice.outcome === "accepted") bar.remove();
      } else {
        alert("Để ghim biểu tượng App ra máy tính:\n• Chrome / Edge: Bấm biểu tượng [Cài đặt Điệp Viên Study] ở góc phải thanh địa chỉ.\n• Safari (MacBook): Bấm nút Chia sẻ (Share) -> Thêm vào Dock (Add to Dock)!");
      }
    };
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
      if (params.get("install") === "1" && !window.matchMedia("(display-mode: standalone)").matches) {
        setTimeout(showInstallBanner, 900);
      }
    });
  }

  // 2. Callback & Event Bus
  let nextCallbackId = 1;
  const callbacks = new Map();
  const eventListeners = new Map();

  function transformCallback(callback, once = false) {
    const id = nextCallbackId++;
    callbacks.set(id, { fn: callback, once: Boolean(once) });
    return id;
  }
  function unregisterCallback(id) { callbacks.delete(Number(id)); }
  function runCallback(id, payload) {
    const entry = callbacks.get(Number(id));
    if (!entry) return;
    if (entry.once) callbacks.delete(Number(id));
    try { entry.fn(payload); } catch (_) {}
  }
  function dispatchLocalEvent(eventName, payload) {
    const listeners = eventListeners.get(eventName);
    if (!listeners) return;
    for (const [eventId, handlerId] of listeners.entries()) {
      runCallback(handlerId, { event: eventName, id: eventId, payload });
    }
  }

  window.__TAURI_EVENT_PLUGIN_INTERNALS__ = {
    unregisterListener(event, eventId) {
      eventListeners.get(event)?.delete(eventId);
    }
  };

  function getDeviceId() {
    let id = localStorage.getItem("dvs_pwa_device_id");
    if (!id) {
      id = "DVS-HW-" + Math.random().toString(36).substring(2, 10).toUpperCase();
      localStorage.setItem("dvs_pwa_device_id", id);
    }
    return id;
  }

  // 3. Free HTTPS Translation Helper
  async function translateTextVi(text, targetLang = "vi") {
    const clean = String(text || "").trim();
    if (!clean) return "";
    try {
      const u = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(clean)}`;
      const r = await fetch(u);
      const j = await r.json();
      if (Array.isArray(j) && Array.isArray(j[0])) {
        return j[0].map(part => part[0]).join("");
      }
    } catch (_) {}
    return clean;
  }

  // 4. Live Speech Recognition + WebAudio Level Meter (Recording & Shadowing)
  let speechRec = null;
  let shadowState = {
    recording: false,
    startedAt: 0,
    level: 0,
    bars: [16, 20, 18, 22, 16, 20, 18, 16],
    liveTranscript: "",
    liveWords: [],
    voiceDetected: false,
    speakingNow: false,
    autoStopReady: false,
    error: ""
  };
  let micStream = null;
  let micAnimTimer = null;

  async function startShadowingMic(lang = "en-US") {
    stopShadowingMic();
    shadowState = {
      recording: true,
      startedAt: Date.now() / 1000,
      level: 0.25,
      bars: [22, 30, 26, 34, 28, 24, 30, 22],
      liveTranscript: "",
      liveWords: [],
      voiceDetected: false,
      speakingNow: false,
      autoStopReady: false,
      error: ""
    };
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const src = ctx.createMediaStreamSource(micStream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      src.connect(analyser);
      const dataArr = new Uint8Array(analyser.frequencyBinCount);
      micAnimTimer = setInterval(() => {
        if (!shadowState.recording) return;
        analyser.getByteFrequencyData(dataArr);
        const bars = [];
        let sum = 0;
        for (let i = 0; i < 8; i++) {
          const v = Math.max(14, Math.min(98, Math.round((dataArr[i * 2] || 0) * 0.42 + 14)));
          bars.push(v);
          sum += v;
        }
        const avg = sum / 8;
        shadowState.bars = bars;
        shadowState.level = Math.min(1, avg / 90);
        shadowState.speakingNow = avg > 26;
        if (avg > 26) shadowState.voiceDetected = true;
      }, 90);
    } catch (e) {
      shadowState.error = "Vui lòng cấp quyền Micro trên trình duyệt để thu âm.";
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      speechRec = new SR();
      speechRec.continuous = true;
      speechRec.interimResults = true;
      speechRec.lang = lang.startsWith("zh") ? "zh-CN" : (lang.startsWith("vi") ? "vi-VN" : "en-US");
      let finalAcc = "";
      speechRec.onresult = (ev) => {
        let interim = "";
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const t = ev.results[i][0].transcript;
          if (ev.results[i].isFinal) finalAcc += " " + t;
          else interim += " " + t;
        }
        const combined = (finalAcc + " " + interim).trim();
        shadowState.liveTranscript = combined;
        shadowState.liveWords = combined ? combined.split(/\s+/) : [];
        if (combined) shadowState.voiceDetected = true;
      };
      try { speechRec.start(); } catch (_) {}
    }
    return { ok: true };
  }

  function stopShadowingMic() {
    shadowState.recording = false;
    if (micAnimTimer) { clearInterval(micAnimTimer); micAnimTimer = null; }
    if (micStream) { micStream.getTracks().forEach(t => t.stop()); micStream = null; }
    if (speechRec) { try { speechRec.stop(); } catch (_) {} speechRec = null; }
  }

  function scoreShadowingWords(targetText, spokenText) {
    const clean = s => String(s || "").toLowerCase().replace(/[^a-z0-9'\s]/gi, " ").trim().split(/\s+/).filter(Boolean);
    const origTokens = String(targetText || "").trim().split(/\s+/).filter(Boolean);
    const targetNorm = clean(targetText);
    const spokenNorm = clean(spokenText);
    if (!spokenNorm.length) {
      return {
        ok: true,
        overallScore: 0,
        accuracyScore: 0,
        fluencyScore: 0,
        completenessScore: 0,
        transcript: "",
        feedback: "Chưa nhận diện được giọng đọc. Bạn hãy bật Micro và đọc to rõ câu mẫu nhé!",
        words: origTokens.map(w => ({ word: w, status: "missing", score: 0 }))
      };
    }
    const spokenSet = new Set(spokenNorm);
    let matched = 0;
    const wordResults = origTokens.map((rawW, idx) => {
      const nw = targetNorm[idx] || rawW.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (spokenSet.has(nw)) {
        matched++;
        return { word: rawW, status: "good", score: 96 };
      }
      const near = spokenNorm.some(sw => sw.startsWith(nw.slice(0, 3)) || nw.startsWith(sw.slice(0, 3)));
      if (near && nw.length >= 3) {
        matched += 0.65;
        return { word: rawW, status: "warn", score: 72 };
      }
      return { word: rawW, status: "bad", score: 35 };
    });
    const acc = Math.min(100, Math.round((matched / Math.max(1, origTokens.length)) * 100));
    const comp = Math.min(100, Math.round((spokenNorm.length / Math.max(1, origTokens.length)) * 100));
    const flu = Math.min(100, Math.round(acc * 0.7 + comp * 0.3));
    const overall = Math.round(acc * 0.55 + flu * 0.25 + comp * 0.20);
    return {
      ok: true,
      overallScore: overall,
      accuracyScore: acc,
      fluencyScore: flu,
      completenessScore: comp,
      transcript: spokenText,
      feedback: overall >= 85 ? "Phát âm rất chuẩn xác! Tiếp tục phát huy nhé." : (overall >= 60 ? "Khá tốt! Chú ý phát âm rõ hơn các từ màu vàng/đỏ." : "Hãy nghe lại câu mẫu và đọc chậm từng cụm từ nhé."),
      words: wordResults
    };
  }

  // 5. Client-Side PDF to Word (.docx) Converter (pdf.js + JSZip OOXML)
  let pdfWordState = { running: false, message: "", files: [] };

  async function loadScriptOnce(src) {
    if (document.querySelector(`script[src="${src}"]`)) return;
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function escapeXml(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  async function buildDocxBlobFromParagraphs(paragraphs) {
    await loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");
    const zip = new window.JSZip();
    zip.file("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`);
    zip.folder("_rels").file(".rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`);
    const bodyXml = paragraphs.map(p => `<w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="26"/></w:rPr><w:t xml:space="preserve">${escapeXml(p)}</w:t></w:r></w:p>`).join("");
    zip.folder("word").file("document.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${bodyXml}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1701"/></w:sectPr></w:body></w:document>`);
    return await zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
  }

  async function convertPdfViaBrowserDialog(translateToVi = false) {
    return new Promise((resolve) => {
      const inp = document.createElement("input");
      inp.type = "file";
      inp.accept = ".pdf,application/pdf";
      inp.multiple = true;
      inp.onchange = async () => {
        const files = Array.from(inp.files || []);
        if (!files.length) {
          resolve({ ok: false, cancelled: true, message: "Chưa chọn file PDF." });
          return;
        }
        pdfWordState = { running: true, message: `Đang chuyển đổi ${files.length} file PDF sang Word (.docx)...`, files: [] };
        resolve({ ok: true, started: true, count: files.length });

        try {
          await loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
            const outFiles = [];
            for (const f of files) {
              const t0 = Date.now();
              const buf = await f.arrayBuffer();
              const pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
              const paras = [];
              for (let p = 1; p <= pdf.numPages; p++) {
                pdfWordState.message = `Đang đọc trang ${p}/${pdf.numPages} (${f.name})...`;
                const page = await pdf.getPage(p);
                const tc = await page.getTextContent();
                let line = "";
                let lastY = null;
                for (const item of tc.items) {
                  const y = item.transform ? Math.round(item.transform[5]) : 0;
                  if (lastY !== null && Math.abs(y - lastY) > 6) {
                    if (line.trim()) paras.push(line.trim());
                    line = item.str;
                  } else {
                    line += (line && !line.endsWith(" ") ? " " : "") + item.str;
                  }
                  lastY = y;
                }
                if (line.trim()) paras.push(line.trim());
              }
              let finalParas = paras;
              if (translateToVi && paras.length) {
                pdfWordState.message = `Đang dịch sang Tiếng Việt (${f.name})...`;
                finalParas = [];
                for (let i = 0; i < paras.length; i += 8) {
                  const chunk = paras.slice(i, i + 8).join("\n");
                  const tr = await translateTextVi(chunk, "vi");
                  finalParas.push(...tr.split("\n"));
                }
              }
              const blob = await buildDocxBlobFromParagraphs(finalParas);
              const outName = f.name.replace(/\.pdf$/i, "") + (translateToVi ? "_TiengViet.docx" : ".docx");
              const blobUrl = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = blobUrl;
              a.download = outName;
              document.body.appendChild(a);
              a.click();
              setTimeout(() => a.remove(), 1500);
              const elapsedSec = Math.max(1, Math.round((Date.now() - t0) / 1000));
              outFiles.push({
                name: outName,
                path: blobUrl,
                docx_path: blobUrl,
                pages: pdf.numPages,
                pages_count: pdf.numPages,
                elapsed_seconds: elapsedSec,
                size: blob.size
              });
            }
            pdfWordState = { ok: true, running: false, message: `Đã chuyển đổi & tải xuống ${outFiles.length} file Word (.docx) thành công!`, files: outFiles };
        } catch (err) {
          pdfWordState = { running: false, message: "Lỗi chuyển đổi PDF: " + (err.message || err), files: [] };
        }
      };
      inp.click();
    });
  }

  let cachedPresets = null;

  window.__TAURI_INTERNALS__ = {
    metadata: {
      currentWindow: { label: currentLabel },
      currentWebview: { label: currentLabel },
      windows: [{ label: "main" }],
      webviews: [{ windowLabel: "main", label: "main" }]
    },
    transformCallback,
    unregisterCallback,
    convertFileSrc(p) { return p || ""; },
    async invoke(cmd, args = {}) {
      if (cmd === "plugin:event|listen") {
        if (!eventListeners.has(args.event)) eventListeners.set(args.event, new Map());
        eventListeners.get(args.event).set(args.handler, args.handler);
        return args.handler;
      }
      if (cmd === "plugin:event|unlisten") {
        eventListeners.get(args.event)?.delete(args.eventId);
        return null;
      }
      if (cmd === "plugin:event|emit" || cmd === "plugin:event|emit_to") {
        dispatchLocalEvent(args.event, args.payload);
        return null;
      }
      if (cmd === "open_link" || cmd === "plugin:opener|open_url" || cmd === "plugin:shell|open") {
        const u = args.url || args.path || args.href;
        if (u) window.open(u, "_blank", "noopener,noreferrer");
        return true;
      }
      if (cmd === "load_notes") {
        try { return JSON.parse(localStorage.getItem("dvs_pwa_notes") || "null") || []; } catch { return []; }
      }
      if (cmd === "save_notes") {
        try { localStorage.setItem("dvs_pwa_notes", JSON.stringify(args.notes || [])); } catch {}
        return true;
      }
      if (cmd === "load_study_extras") {
        try { return JSON.parse(localStorage.getItem("dvs_pwa_extras") || "{}"); } catch { return {}; }
      }
      if (cmd === "save_study_extras") {
        try { localStorage.setItem("dvs_pwa_extras", JSON.stringify(args.data || args || {})); } catch {}
        return true;
      }
      if (cmd === "account_signed_in") return true;
      if (cmd === "account_status") return { signedIn: true, plan: "pro", unlimited: true };
      if (cmd === "account_offers") return [];
      if (cmd === "voice_pack_status" || cmd === "diarization_model_status" || cmd === "browser_bridge_status") {
        return { installed: true, ready: true, enabled: false };
      }
      if (cmd === "dvtl_get_ota_status") return { version: "2026.11.27.1", upToDate: true };
      if (cmd === "dvtl_get_device_license") {
        try { return JSON.parse(localStorage.getItem("dvs_pwa_license") || "null") || { deviceId: getDeviceId(), unlockedCourses: [] }; }
        catch { return { deviceId: getDeviceId(), unlockedCourses: [] }; }
      }
      if (cmd === "dvtl_get_payment_account") {
        return { bankId: "ACB", bankName: "ACB", accountNo: "27820961", accountName: "TRINH DUC THINH" };
      }
      if (cmd === "dvtl_verify_account_device" || cmd === "dvtl_save_customer_profile") {
        const em = String(args.email || "").trim().toLowerCase();
        const ph = String(args.phone || args.password || "").trim();
        const nm = String(args.name || "").trim();
        const devId = getDeviceId();
        const res = await fetch(`${WEBHOOK_URL}?action=getCustomerSync&email=${encodeURIComponent(em)}&phone=${encodeURIComponent(ph)}&name=${encodeURIComponent(nm)}&deviceId=${encodeURIComponent(devId)}`);
        const data = await res.json();
        if (data && data.customer) {
          localStorage.setItem("dvs_pwa_license", JSON.stringify({ ...data.customer, deviceId: devId }));
        }
        return data;
      }
      if (cmd === "dvtl_create_order") {
        const res = await fetch(WEBHOOK_URL, { method: "POST", body: JSON.stringify({ action: "createOrder", ...args }) });
        return await res.json();
      }
      if (cmd === "dvtl_check_payment") {
        const res = await fetch(`${WEBHOOK_URL}?action=verify&orderCode=${encodeURIComponent(args.orderCode || "")}&email=${encodeURIComponent(args.email || "")}`);
        return await res.json();
      }
      if (cmd === "dvtl_list_drive_folder") {
        const res = await fetch(`${WEBHOOK_URL}?action=listCourseDrive&folderId=${encodeURIComponent(args.folderId || "")}&courseId=${encodeURIComponent(args.courseId || "")}`);
        return await res.json();
      }
      // Shadowing
      if (cmd === "shadowing_get_presets") {
        if (!cachedPresets) {
          const r = await fetch("./shadowing_presets.json");
          cachedPresets = await r.json();
        }
        return cachedPresets;
      }
      if (cmd === "shadowing_load_youtube") {
        const rawUrl = String(args.url || "").trim();
        const m = rawUrl.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
        const vid = m ? m[1] : (rawUrl.length === 11 ? rawUrl : "");
        if (!vid) return { ok: false, error: "Đường dẫn YouTube không hợp lệ. Vui lòng dán link dạng https://www.youtube.com/watch?v=..." };
        if (!cachedPresets) {
          try { const r = await fetch("./shadowing_presets.json"); cachedPresets = await r.json(); } catch (_) {}
        }
        const matched = (cachedPresets?.presets || []).find(p => p.videoId === vid);
        if (matched) return { ok: true, video: matched };
        return {
          ok: true,
          video: {
            id: "yt-" + vid,
            videoId: vid,
            url: `https://www.youtube.com/watch?v=${vid}`,
            title: "YouTube Shadowing Practice (" + vid + ")",
            channel: "YouTube",
            level: "B1–C1",
            language: "en",
            accent: "us",
            duration: 300,
            sentences: (cachedPresets?.presets?.[0]?.sentences || []).slice(0, 8)
          }
        };
      }
      if (cmd === "shadowing_mic_start") {
        return await startShadowingMic(args.language === "zh" ? "zh-CN" : "en-US");
      }
      if (cmd === "shadowing_mic_poll") {
        return { ok: true, ...shadowState };
      }
      if (cmd === "shadowing_mic_stop") {
        const snap = { ...shadowState };
        stopShadowingMic();
        if (args && args.targetText) {
          const spoken = args.browserTranscript || snap.liveTranscript || "";
          const scored = scoreShadowingWords(args.targetText, spoken);
          return { ...scored, userAudioBase64: args.audioBase64 || "" };
        }
        return { ok: true, ...snap };
      }
      if (cmd === "shadowing_score_speech") {
        const spoken = args.browserTranscript || shadowState.liveTranscript || "";
        return scoreShadowingWords(args.targetText || "", spoken);
      }
      if (cmd === "shadowing_speak_tts") {
        if ("speechSynthesis" in window && args.text) {
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(args.text);
          u.lang = args.language === "zh" ? "zh-CN" : "en-US";
          u.rate = Number(args.rate) || 1.0;
          window.speechSynthesis.speak(u);
        }
        return { ok: true };
      }
      // PDF to Word
      if (cmd === "convert_pdf_to_word_dialog" || cmd === "translate_pdf_dialog") {
        return await convertPdfViaBrowserDialog(cmd === "translate_pdf_dialog" || Boolean(args.translate_to_vi));
      }
      if (cmd === "pdf_to_word_status" || cmd === "pdf_translate_status") {
        return pdfWordState;
      }
      if (cmd === "download_word_file" || cmd === "open_file_or_folder") {
        if (args.path && args.path.startsWith("blob:")) {
          const a = document.createElement("a");
          a.href = args.path;
          a.download = args.name || "Tai_Lieu_Diep_Vien.docx";
          a.click();
        }
        return { ok: true, saved_path: args.name || "Tai_Lieu_Diep_Vien.docx" };
      }
      // Live Recording & Translation
      if (cmd === "start_capture") {
        await startShadowingMic("vi-VN");
        return { ok: true };
      }
      if (cmd === "stop_capture") {
        stopShadowingMic();
        return { ok: true };
      }
      if (cmd === "translate_speech") {
        const words = args.words || [];
        const src = words.map(w => (typeof w === "object" ? w.text : String(w))).join(" ").trim();
        if (!src) return [];
        const tr = await translateTextVi(src, "vi");
        return [{ from: 0, source: src, translation: tr }];
      }
      if (cmd === "summarize_segments") {
        const segs = args.segments || [];
        const texts = segs.map(s => s.cleanText || s.sourceText || s.text || "").filter(Boolean);
        return {
          tldr: texts.slice(0, 3).join(" "),
          keyPoints: texts.slice(0, 6).map((t, idx) => ({ entryIds: [segs[idx]?.id || String(idx)], text: t })),
          decisions: [],
          tentativeDecisions: [],
          unresolvedTopics: [],
          actionItems: [],
          openQuestions: [],
          deferred: []
        };
      }
      return null;
    }
  };
})();
