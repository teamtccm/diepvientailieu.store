// Điệp Viên Study — Hybrid Native/PWA Cloud Shim (Windows & macOS Zero-Warning Desktop App)
(function () {
  const params = new URLSearchParams(window.location.search);
  const currentLabel = params.get("window") || "main";
  const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxMOdsNkhY8-5xQtZ_86STf781VdFJbRsLkK6n8qRF4ENqreMsl4CdELYn-85wHcqvx/exec";

  let deferredInstallPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    window.__DVS_PWA_PROMPT__ = e;
    showInstallBanner();
  });

  function showInstallBanner() {
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (document.getElementById("dvsPwaInstallFloatingBar")) return;
    const bar = document.createElement("div");
    bar.id = "dvsPwaInstallFloatingBar";
    bar.style.cssText = "position:fixed;bottom:18px;right:18px;z-index:99999;background:linear-gradient(135deg,#0D1677,#1E40AF);color:#fff;padding:10px 16px;border-radius:14px;box-shadow:0 12px 32px rgba(13,22,119,0.35);display:flex;align-items:center;gap:12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;border:1px solid rgba(255,255,255,0.2);";
    bar.innerHTML = '<span>⚡ Cài <b>Điệp Viên Study</b> ra Màn hình chính (Mở như App độc lập)</span><button id="dvsBtnInstallNow" style="background:#FFA000;color:#0f172a;border:none;padding:6px 14px;border-radius:9px;font-weight:800;cursor:pointer;font-size:12px;">Cài Đặt Ngay</button><button id="dvsBtnCloseBar" style="background:transparent;color:#cbd5e1;border:none;font-size:16px;cursor:pointer;padding:0 4px;">×</button>';
    document.body.appendChild(bar);
    document.getElementById("dvsBtnCloseBar").onclick = () => bar.remove();
    document.getElementById("dvsBtnInstallNow").onclick = async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice.outcome === "accepted") bar.remove();
      } else {
        alert("Trên trình duyệt hiện tại: Bấm biểu tượng [Cài đặt ứng dụng / Chia sẻ -> Thêm vào Dock/Màn hình chính] ở góc phải thanh địa chỉ để ghim App ra máy tính!");
      }
    };
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
      if (params.get("install") === "1" && !window.matchMedia("(display-mode: standalone)").matches) {
        setTimeout(showInstallBanner, 800);
      }
    });
  }

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
    try { entry.fn(payload); } catch (e) {}
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
      const l = eventListeners.get(event);
      if (l) l.delete(eventId);
    }
  };

  function getDeviceId() {
    let id = localStorage.getItem("dvs_pwa_device_id");
    if (!id) {
      id = "DVS-HW-PWA" + Math.random().toString(36).substring(2, 10).toUpperCase();
      localStorage.setItem("dvs_pwa_device_id", id);
    }
    return id;
  }

  // Web Speech API Live Recognition for Recording & Shadowing
  let speechRec = null;
  function startBrowserSpeech(onTranscript) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return false;
    stopBrowserSpeech();
    speechRec = new SR();
    speechRec.continuous = true;
    speechRec.interimResults = true;
    speechRec.lang = "vi-VN";
    speechRec.onresult = (ev) => {
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const txt = ev.results[i][0].transcript.trim();
        if (ev.results[i].isFinal && txt) onTranscript(txt);
      }
    };
    try { speechRec.start(); return true; } catch (_) { return false; }
  }
  function stopBrowserSpeech() {
    if (speechRec) { try { speechRec.stop(); } catch (_) {} speechRec = null; }
  }

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
        try { return JSON.parse(localStorage.getItem("dvs_pwa_notes") || "[]"); } catch { return []; }
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
      if (cmd === "dvtl_get_ota_status") return { version: "2026.11.26.12", upToDate: true };
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
      if (cmd === "start_capture") {
        startBrowserSpeech((txt) => {
          dispatchLocalEvent("transcript-segment", {
            id: "seg_" + Date.now(),
            timestamp: new Date().toISOString(),
            sourceText: txt,
            rawText: txt,
            audioSource: "microphone"
          });
        });
        return { ok: true };
      }
      if (cmd === "stop_capture") {
        stopBrowserSpeech();
        return { ok: true };
      }
      if (cmd === "shadowing_speak_tts") {
        if ("speechSynthesis" in window && args.text) {
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(args.text);
          u.lang = args.lang || "en-US";
          u.rate = Number(args.rate) || 1.0;
          window.speechSynthesis.speak(u);
        }
        return { ok: true };
      }
      return null;
    }
  };
})();
