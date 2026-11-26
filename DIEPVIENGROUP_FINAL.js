/**
 * 🚀 BẤM NÚT "▷ CHẠY" (RUN) Ở THANH CÔNG CỤ PHÍA TRÊN ĐỂ:
 *   1. Tự động LIÊN KẾT cả 6 Google Forms (bên diepvientailieu@gmail.com) vào đúng 6 Trang tính
 *      "📊 Data Khách Hàng — ... (Câu trả lời)" (bên teamtccm@gmail.com).
 *   2. Tự động XUẤT BẢN (Publish) & bật nhận câu trả lời cho cả 6 Google Forms.
 *   3. Tự động cài bộ đồng bộ Ảnh Chuyển Khoản từ 05. Form Mua Bán -> 06. Lưu Trữ Thông Tin Khách Hàng (teamtccm).
 */
var FORM_TO_TCCM_MAP = [
  {
    name: "Mua Đề Cương📝",
    keyword: "đề cương",
    formId: "1nBVD8_VpmHxcd7u5JPl-UN4NX5MZ2T6y4o9F6bBzQJo",
    tccmSheetId: "1AQskR71cucoteogczKmxavYbExUlOxDTVc8kRVZmV1s",
    tccmScreenshotFolderId: "1JRw3PQiWu5TVlXTLHZGs84bLAr2VYHIA"
  },
  {
    name: "Bài Tập Lớn 🎓",
    keyword: "bài tập lớn",
    formId: "16jVNcEpMlxOmZ0yopF_D_uPryl-WuHr_zbI6C7xPVUY",
    tccmSheetId: "1SX8kUMVZeXZ852qS6s9LCAKDzPRJne6uNAj2Lz97H6E",
    tccmScreenshotFolderId: "1aNsF77btC2BDCR5tA7gFnSynSL-IrdzJ"
  },
  {
    name: "Mua Giáo Trình📄",
    keyword: "giáo trình",
    formId: "1uC3JPjv0kIjEBmpAPPmmW0YUdV-E7PUEGwPxZDqcVZc",
    tccmSheetId: "1gxTkSVM-_r_ZQ98ukFFt3n1At4GK1bfaP0CAwyg5SDs",
    tccmScreenshotFolderId: "1qKtRO5NT0vjPsLcwLYZqeCYejaIQZlX5"
  },
  {
    name: "Mua Đồng Phục👔",
    keyword: "đồng phục",
    formId: "1SngIheGcoT26edoPboDPgrA0Vb4I-4vPBsomYdBtEE8",
    tccmSheetId: "1jidO02UieM44nNQo8VleFCjGBApBKsP7QOkzPlducIo",
    tccmScreenshotFolderId: "1isvhTKMAjYVnP-n_zMn86LQyt3Ce9iiC"
  },
  {
    name: "Thuê Làm Powerpoint📊",
    keyword: "powerpoint",
    formId: "13UxC2syEAKhm4gHx-_YGxgqPxsr8CPgLAjZNy6gAwAQ",
    tccmSheetId: "1C9nNVyf9CRx0RcgH6_HGBvpRZR6_KspJOP060VZoQ80",
    tccmScreenshotFolderId: "1W3B5BCt7FA-h0MvGALdnD29ffo5chsKW"
  },
  {
    name: "Hỗ Trợ Tân Sinh Viên🆕",
    keyword: "tân sinh viên",
    formId: "19Qsvy1eVC-XK6cB2YQxlAVAcEfIEtNiZtqTlAhXJdfA",
    tccmSheetId: "1gGuTWBpSJjArJN44SrByh8pAJPa9nW7bfbKSflS_2QA",
    tccmScreenshotFolderId: ""
  }
];

function ketNoi6FormVaoKhoDataTCCM() {
  for (var i = 0; i < FORM_TO_TCCM_MAP.length; i++) {
    var cfg = FORM_TO_TCCM_MAP[i];
    try {
      var form = FormApp.openById(cfg.formId);
      try { form.setPublished(true); } catch (e1) {}
      try { form.setAcceptingResponses(true); } catch (e2) {}
      form.setDestination(FormApp.DestinationType.SPREADSHEET, cfg.tccmSheetId);
      Logger.log("✅ Đã liên kết & xuất bản Form [" + cfg.name + "] -> Trang tính TCCM (" + cfg.tccmSheetId + ")");
    } catch (e) {
      Logger.log("⚠️ Form [" + cfg.name + "] cần mở 1 lần trên trình duyệt để khôi phục thư mục tải tệp trước: " + e.toString());
    }
  }
  try {
    dongBoAnhChuyenKhoanVeTCCM();
    var triggers = ScriptApp.getProjectTriggers();
    var hasTrig = false;
    for (var t = 0; t < triggers.length; t++) {
      if (triggers[t].getHandlerFunction() === "dongBoAnhChuyenKhoanVeTCCM") hasTrig = true;
    }
    if (!hasTrig) {
      ScriptApp.newTrigger("dongBoAnhChuyenKhoanVeTCCM").timeBased().everyMinutes(5).create();
      Logger.log("✅ Đã bật tự động đồng bộ Ảnh Chuyển Khoản sang 06. Lưu Trữ Thông Tin Khách Hàng (teamtccm) mỗi 5 phút!");
    }
  } catch (e) {}
}

function dongBoAnhChuyenKhoanVeTCCM() {
  var formFolder = DriveApp.getFolderById("1Npaw9gG19gxiw82fuZWSqF3vWMORC846");
  var subFolders = formFolder.getFolders();
  while (subFolders.hasNext()) {
    var sf = subFolders.next();
    var sfLower = sf.getName().toLowerCase();
    try { sf.addEditor("teamtccm@gmail.com"); } catch (e) {}
    for (var i = 0; i < FORM_TO_TCCM_MAP.length; i++) {
      var cfg = FORM_TO_TCCM_MAP[i];
      if (cfg.tccmScreenshotFolderId && sfLower.indexOf(cfg.keyword) >= 0) {
        var targetFolder = DriveApp.getFolderById(cfg.tccmScreenshotFolderId);
        var files = sf.getFiles();
        while (files.hasNext()) {
          var f = files.next();
          if (!targetFolder.getFilesByName(f.getName()).hasNext()) {
            f.makeCopy(f.getName(), targetFolder);
          }
        }
      }
    }
  }
}


/**
 * ════════════════════════════════════════════════════════════════════════════
 * 📦 KHO LƯU TRỮ & PHÁT FILE CÓ NHÃN HIỆU — diepvientailieu@gmail.com
 * Dán vào: Apps Script trên tài khoản diepvientailieu@gmail.com (project KHO_PHAT_FILE)
 *
 * Kiến trúc:
 *  - teamtccm@gmail.com      : Trạm Điều Khiển Trung Tâm (Quét Bank, Telegram, Điều Phối)
 *  - diepvientailieu@gmail.com : Kho Lưu Trữ Đề Cương & BTL + Email Bàn Giao Thương Hiệu
 *
 * Chức năng:
 *  1. Nhận lệnh Webhook từ Trạm Điều Khiển (teamtccm@gmail.com)
 *  2. Tự động cấp quyền Xem (Viewer) + Khóa tải/sao chép cho cả Đề Cương & BTL
 *  3. Gửi Email bàn giao có nhãn hiệu "Điệp Viên Tài Liệu <diepvientailieu@gmail.com>"
 *  4. Tự động quét kho Đề Cương + Kho BTL và đồng bộ thẳng Mã SKU sang DVTL_MASTER_DATABASE
 * ════════════════════════════════════════════════════════════════════════════
 */

var KHO_CONFIG = {
  BRAND_NAME: "Điệp Viên Tài Liệu",
  WAREHOUSE_EMAIL: "diepvientailieu@gmail.com",
  SUPPORT_ZALO: "0792 453 169",
  WEBSITE_URL: "https://diepvientailieu.store",

  // ID Bảng Điều Khiển Trung Tâm (DVTL_MASTER_DATABASE bên teamtccm@gmail.com)
  MASTER_DB_ID: "1z8D-Q9yVUl62OWWArelFYX1xciX19rWIlyblrjgasIQ",

  // ID Các Thư Mục Kho Lưu Trữ Chính Thức
  FOLDER_ROOT_DVTL: "121NmBHMxuyBKPL2eANhmiDsDd8QaCjDG",
  FOLDER_DE_CUONG: "1zPRnfdMbaaYWSKK8PZdZIuooOanjWynp",     // 01_Danh_Sach_De_Cuong_Luu_Tru
  FOLDER_BTL_FULL: "13wHeLedN8McA8AycvznNoj4CXzDQg98j",     // 02_Danh_Sach_Bai_Tap_Lon_Luu_Tru
  FOLDER_BTL_PREVIEW: "1J5GxIOQocD0FeISMyaS980pRrs_Qu0qr",  // 03_Cho_Khach_Check_Truoc
  FOLDER_KHOA_HOC: "13CEmorojtCBFPxlqS3C3PSEhLKbsDMnC"      // 09_Khoa_Hoc
};

/* ══════════════════════════════════════════════════════════════════════════
   1. WEBHOOK — Nhận lệnh giao Đề Cương / BTL từ Trạm Điều Khiển (teamtccm)
   ══════════════════════════════════════════════════════════════════════════ */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.action === "lockAndDelegate" && data.fileId) {
      try {
        khoaTaiFileNhanh(data.fileId, true);
        try { DriveApp.getFileById(data.fileId).addEditor("teamtccm@gmail.com"); } catch (e1) {
          try { DriveApp.getFolderById(data.fileId).addEditor("teamtccm@gmail.com"); } catch (e2) {}
        }
      } catch (eLock) {}
      return ContentService.createTextOutput(JSON.stringify({ ok: true, status: "SUCCESS", action: "lockAndDelegate" })).setMimeType(ContentService.MimeType.JSON);
    }
    if (data.action === "syncWarehouse") {
      dongBoTatCaDeCuongVaBTL();
      return ContentService.createTextOutput(JSON.stringify({ ok: true, status: "SUCCESS", action: "syncWarehouse" })).setMimeType(ContentService.MimeType.JSON);
    }
    var customerEmail = String(data.email || "").trim().toLowerCase();
    var customerName = String(data.name || "Bạn").trim();
    if (data.action === "send_app_otp") {
      guiEmailOtpApp(customerEmail, customerName, String(data.otp || "").trim());
      return ContentService.createTextOutput(JSON.stringify({
        ok: true,
        status: "SUCCESS",
        sender: KHO_CONFIG.WAREHOUSE_EMAIL
      })).setMimeType(ContentService.MimeType.JSON);
    }
    if (data.action === "send_app_activated") {
      guiEmailKichHoatApp(customerEmail, customerName);
      return ContentService.createTextOutput(JSON.stringify({
        ok: true,
        status: "SUCCESS",
        sender: KHO_CONFIG.WAREHOUSE_EMAIL
      })).setMimeType(ContentService.MimeType.JSON);
    }
    if (data.action === "send_app_invite") {
      var invOrderCode = String(data.orderCode || "INVITE").trim();
      var invItemName = String(data.itemName || data.productName || "Khóa học & Tài liệu Điệp Viên").trim();
      guiEmailMoiDungAppMienPhi(customerEmail, customerName, invOrderCode, invItemName);
      return ContentService.createTextOutput(JSON.stringify({
        ok: true,
        status: "SUCCESS",
        action: "send_app_invite",
        sender: KHO_CONFIG.WAREHOUSE_EMAIL
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (!customerEmail || customerEmail.indexOf("@") === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        ok: false,
        status: "INVALID_EMAIL",
        message: "Missing valid customer email"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var orderCode = String(data.orderCode || "").trim();
    var itemName = String(data.itemName || data.productName || "Tài liệu học tập").trim();
    var fileOrFolderId = String(data.fileId || "").trim();
    var extraFolderIds = Array.isArray(data.extraFolderIds) ? data.extraFolderIds : [];
    var orderType = String(data.orderType || "Mua Đề Cương").trim();
    var isCourse = Boolean(data.isCourse) || String(orderType).toUpperCase().indexOf("KHÓA") >= 0 || String(orderType).toUpperCase().indexOf("COURSE") >= 0;
    var accessUrl = String(data.fileLink || "").trim();

    // 1. Cấp quyền Drive SONG SONG SIÊU TỐC (< 0.6s cho cả bộ folder + file lẻ)
    var allDriveIds = [];
    if (fileOrFolderId && fileOrFolderId !== "undefined") allDriveIds.push(fileOrFolderId);
    for (var ex = 0; ex < extraFolderIds.length; ex++) {
      var exId = String(extraFolderIds[ex] || "").trim();
      if (exId && exId !== "undefined" && allDriveIds.indexOf(exId) === -1) {
        allDriveIds.push(exId);
      }
    }

    var extraAccessUrls = [];
    if (allDriveIds.length > 0) {
      var batchRes = capQuyenDriveSongSong(allDriveIds, customerEmail, orderCode, itemName);
      if (batchRes.primaryUrl) accessUrl = batchRes.primaryUrl;
      extraAccessUrls = batchRes.extraUrls || [];
    }

    // 2. Chống gửi trùng lặp Email bàn giao khi Web/App gọi xác nhận nhiều lần
    var dedupMailKey = "DVG_DELIVERED_" + String(orderCode || "NOORD").replace(/[^A-Za-z0-9_-]/g, "") + "_" + customerEmail;
    var alreadyMailed = false;
    try {
      var cache = CacheService.getScriptCache();
      var props = PropertiesService.getScriptProperties();
      if (!data.forceResend && (cache.get(dedupMailKey) || (orderCode && props.getProperty(dedupMailKey)))) {
        alreadyMailed = true;
      } else {
        cache.put(dedupMailKey, "1", 21600);
        if (orderCode) props.setProperty(dedupMailKey, String(new Date().getTime()));
      }
    } catch (eDedup) {}

    if (!alreadyMailed) {
      guiEmailBanGiao(customerEmail, customerName, orderCode, itemName, accessUrl, orderType, isCourse);
    }

    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      status: "SUCCESS",
      sender: KHO_CONFIG.WAREHOUSE_EMAIL,
      accessUrl: accessUrl,
      extraUrls: extraAccessUrls,
      mailAlreadySent: alreadyMailed
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      status: "ERROR",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    "📦 KHO LƯU TRỮ & PHÁT FILE ĐIỆP VIÊN TÀI LIỆU (" + KHO_CONFIG.WAREHOUSE_EMAIL + ") v7.0 TURBO ĐANG HOẠT ĐỘNG!"
  ).setMimeType(ContentService.MimeType.TEXT);
}

/* ══════════════════════════════════════════════════════════════════════════
   2. CẤP QUYỀN DRIVE SONG SONG (PARALLEL BATCH < 0.6s) + KHÓA TẢI THÔNG MINH
   ══════════════════════════════════════════════════════════════════════════ */

function capQuyenDriveSongSong(ids, email, orderCode, itemName) {
  var oauthToken = ScriptApp.getOAuthToken();
  var headers = { Authorization: "Bearer " + oauthToken };
  var cache = null;
  try { cache = CacheService.getScriptCache(); } catch (eC) {}

  // Bước A: Đọc metadata song song cho toàn bộ ID
  var metaReqs = [];
  for (var i = 0; i < ids.length; i++) {
    metaReqs.push({
      url: "https://www.googleapis.com/drive/v3/files/" + ids[i] + "?fields=id,name,mimeType,viewersCanCopyContent",
      method: "get",
      headers: headers,
      muteHttpExceptions: true
    });
  }

  var metaResponses = UrlFetchApp.fetchAll(metaReqs);
  var writeReqs = [];
  var primaryUrl = "";
  var extraUrls = [];

  for (var j = 0; j < ids.length; j++) {
    var fid = ids[j];
    var isFolder = false;
    var alreadyLocked = false;
    try {
      var mJson = JSON.parse(metaResponses[j].getContentText() || "{}");
      isFolder = (mJson.mimeType === "application/vnd.google-apps.folder");
      alreadyLocked = (mJson.viewersCanCopyContent === false);
    } catch (eMeta) {}

    var cleanUrl = isFolder
      ? ("https://drive.google.com/drive/folders/" + fid + "?usp=sharing")
      : ("https://drive.google.com/file/d/" + fid + "/view?usp=sharing");
    if (j === 0) primaryUrl = cleanUrl;
    else extraUrls.push(cleanUrl);

    // Gửi thông báo Google Drive Share cho file/folder chính, tắt mail lẻ ở các folder phụ để không spam hộp thư khách
    var notifyParam = (j === 0)
      ? ("sendNotificationEmail=true&emailMessage=" + encodeURIComponent("🎓 [ĐIỆP VIÊN TÀI LIỆU] Đã mở quyền truy cập đơn #" + (orderCode || "DVTL") + " (" + (itemName || "Tài liệu học tập") + "). Bấm Mở (Open) để vào học ngay!"))
      : "sendNotificationEmail=false";

    writeReqs.push({
      url: "https://www.googleapis.com/drive/v3/files/" + fid + "/permissions?" + notifyParam,
      method: "post",
      contentType: "application/json",
      headers: headers,
      payload: JSON.stringify({ role: "reader", type: "user", emailAddress: email }),
      muteHttpExceptions: true
    });

    var lockKey = "LOCKED_V7_" + fid;
    var cachedLock = cache ? cache.get(lockKey) : null;
    if (!alreadyLocked && !cachedLock) {
      writeReqs.push({
        url: "https://www.googleapis.com/drive/v3/files/" + fid,
        method: "patch",
        contentType: "application/json",
        headers: headers,
        payload: JSON.stringify({
          copyRequiresWriterPermission: true,
          viewersCanCopyContent: false,
          writersCanShare: false
        }),
        muteHttpExceptions: true
      });
      if (cache) {
        try { cache.put(lockKey, "1", 21600); } catch (ePut) {}
      }
    }
  }

  if (writeReqs.length > 0) {
    try { UrlFetchApp.fetchAll(writeReqs); } catch (eBatch) {}
  }

  return { primaryUrl: primaryUrl, extraUrls: extraUrls };
}

function capQuyenDrive(id, email) {
  var r = capQuyenDriveSongSong([id], email, "", "");
  return r.primaryUrl;
}

function khoaTaiFileNhanh(fileId, force) {
  var cache = null;
  try { cache = CacheService.getScriptCache(); } catch (eC) {}
  var lockKey = "LOCKED_V7_" + fileId;
  if (!force && cache && cache.get(lockKey)) return;
  UrlFetchApp.fetch("https://www.googleapis.com/drive/v3/files/" + fileId, {
    method: "patch",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
    payload: JSON.stringify({
      copyRequiresWriterPermission: true,
      viewersCanCopyContent: false,
      writersCanShare: false
    }),
    muteHttpExceptions: true
  });
  if (cache) {
    try { cache.put(lockKey, "1", 21600); } catch (eP) {}
  }
}

function khoaTaiFile(fileId) {
  khoaTaiFileNhanh(fileId, false);
}

/* ══════════════════════════════════════════════════════════════════════════
   3. GỬI EMAIL BÀN GIAO THƯƠNG HIỆU — Điệp Viên Tài Liệu <diepvientailieu@gmail.com>
   ══════════════════════════════════════════════════════════════════════════ */

function guiEmailBanGiao(email, name, orderCode, itemName, accessUrl, orderType, isCourse) {
  var isBTL = String(orderType).toUpperCase().indexOf("BTL") >= 0;
  var isCourseOrder = Boolean(isCourse) || String(orderType).toUpperCase().indexOf("KHÓA") >= 0;
  var badgeTitle = isCourseOrder
    ? "BÀN GIAO KHÓA HỌC & TẶNG APP ĐIỆP VIÊN STUDY 🎓"
    : (isBTL ? "BÀN GIAO BÀI TẬP LỚN / TIỂU LUẬN 🎓" : "BÀN GIAO ĐỀ CƯƠNG & TÀI LIỆU 🎓");

  var linkHtml = "";
  if (accessUrl && accessUrl !== "") {
    linkHtml =
      '<div style="border-left:4px solid #2563eb;padding:16px 20px;margin:20px 0;background:#eff6ff;border-radius:10px;">' +
        '<div style="font-size:13px;color:#1e40af;font-weight:bold;margin-bottom:8px;">🔐 1. LINK KHO KHÓA HỌC / TÀI LIỆU ĐÃ MỞ CHO EMAIL CỦA BẠN:</div>' +
        '<a href="' + accessUrl + '" style="display:inline-block;background:#2563eb;color:#ffffff;font-weight:bold;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:15px;">🚀 MỞ KHO HỌC TẬP TRÊN GOOGLE DRIVE</a>' +
        '<p style="font-size:12px;color:#475569;margin:10px 0 0;">📌 Quyền truy cập được khóa bảo mật riêng cho duy nhất tài khoản Google <b>' + email + '</b> (Không thể chia sẻ sang tài khoản thứ 2).</p>' +
      '</div>';
  }

  var bonusAppHtml = "";
  if (isCourseOrder) {
    bonusAppHtml =
      '<div style="border-left:4px solid #10b981;padding:16px 20px;margin:20px 0;background:#ecfdf5;border-radius:10px;">' +
        '<div style="font-size:13px;color:#065f46;font-weight:bold;margin-bottom:8px;">🎁 2. QUÀ TẶNG ĐỘC QUYỀN: APP ĐIỆP VIÊN STUDY (TÍCH HỢP AI TRỢ GIẢNG):</div>' +
        '<p style="font-size:13px;color:#1e293b;margin:6px 0;line-height:1.5;">' +
          '• <b>Tài khoản đăng nhập App:</b> <code style="background:#d1fae5;padding:2px 6px;border-radius:4px;font-weight:bold;color:#047857;">' + email + '</code> (Đã được kích hoạt sẵn gói khóa học của bạn!)<br>' +
          '• <b>Cách sử dụng:</b> Mở App <b>Điệp Viên Study</b> (hoặc truy cập <a href="https://diepvientailieu.store" style="color:#059669;font-weight:bold;">diepvientailieu.store</a>), nhập đúng Email <b>' + email + '</b> để vào học ngay kèm AI tóm tắt & giải bài tập.' +
        '</p>' +
        '<div style="background:#fff1f2;border:1px solid #fecdd3;padding:10px 12px;border-radius:8px;margin-top:10px;font-size:12px;color:#be123c;">' +
          '🔒 <b>BẢO MẬT KHÓA CỨNG 1 THIẾT BỊ DUY NHẤT:</b> Tài khoản Email <b>' + email + '</b> chỉ được phép đăng nhập và sử dụng trên <b>01 máy tính/thiết bị duy nhất</b>. Hệ thống tự động khóa định danh phần cứng (Hardware ID) ở lần đăng nhập đầu tiên — không thể đăng nhập hoặc chia sẻ chung sang máy thứ 2 hay tài khoản thứ 2!' +
        '</div>' +
      '</div>';
  }

  var htmlBody =
    '<div style="max-width:580px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:16px;">' +
      '<div style="background:linear-gradient(135deg,#0D1677 0%,#1e3a8a 100%);padding:28px 24px;text-align:center;border-radius:14px 14px 0 0;">' +
        '<div style="display:inline-block;background:rgba(255,255,255,0.15);color:#93c5fd;padding:4px 14px;border-radius:999px;font-size:11px;font-weight:bold;letter-spacing:1px;margin-bottom:10px;">OFFICIAL WAREHOUSE • DIEPVIENTAILIEU</div>' +
        '<h1 style="color:#ffffff;margin:0;font-size:21px;letter-spacing:0.5px;">' + badgeTitle + '</h1>' +
        '<p style="color:#cbd5e1;margin:8px 0 0;font-size:13px;">Hệ thống tự động Điệp Viên Tài Liệu xác nhận & bàn giao</p>' +
      '</div>' +
      '<div style="padding:28px 24px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 14px 14px;">' +
        '<p style="color:#1e293b;font-size:15px;margin-top:0;">Xin chào <b>' + name + '</b>,</p>' +
        '<p style="color:#334155;font-size:14px;line-height:1.6;">Cảm ơn bạn đã tin tưởng đăng ký tại <b>Điệp Viên Tài Liệu</b>. Đơn hàng của bạn đã được xác nhận hoàn tất:</p>' +
        '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;margin:16px 0;font-size:14px;color:#334155;">' +
          '<div style="margin:4px 0;">📋 <b>Mã đơn hàng:</b> <span style="color:#2563eb;font-weight:bold;">#' + orderCode + '</span></div>' +
          '<div style="margin:4px 0;">📚 <b>Sản phẩm:</b> <b>' + itemName + '</b></div>' +
          '<div style="margin:4px 0;">📦 <b>Phân loại:</b> ' + orderType + '</div>' +
          '<div style="margin:4px 0;">👤 <b>Tài khoản kích hoạt (1 máy):</b> <b>' + email + '</b></div>' +
        '</div>' +
        linkHtml +
        bonusAppHtml +
        '<div style="margin-top:24px;padding-top:16px;border-top:1px dashed #e2e8f0;font-size:12px;color:#64748b;text-align:center;line-height:1.6;">' +
          '🌐 Website: <a href="' + KHO_CONFIG.WEBSITE_URL + '" style="color:#2563eb;text-decoration:none;font-weight:bold;">diepvientailieu.store</a> &nbsp;|&nbsp; ' +
          '💬 Zalo Hỗ Trợ: <b>' + KHO_CONFIG.SUPPORT_ZALO + '</b><br>' +
          '📧 Email Kho Lưu Trữ Chính Thức: <a href="mailto:' + KHO_CONFIG.WAREHOUSE_EMAIL + '" style="color:#2563eb;text-decoration:none;">' + KHO_CONFIG.WAREHOUSE_EMAIL + '</a>' +
        '</div>' +
      '</div>' +
    '</div>';

  MailApp.sendEmail({
    to: email,
    name: KHO_CONFIG.BRAND_NAME,
    replyTo: KHO_CONFIG.WAREHOUSE_EMAIL,
    subject: "[ĐIỆP VIÊN TÀI LIỆU] Bàn giao #" + orderCode + " — " + itemName,
    htmlBody: htmlBody
  });

  // Gửi thêm 1 Email riêng biệt mời khách hàng sử dụng các tính năng AI miễn phí trên APP Diep Vien study
  try {
    guiEmailMoiDungAppMienPhi(email, name, orderCode, itemName);
  } catch (eInvite) {
    Logger.log("Lỗi gửi email mời dùng App miễn phí: " + eInvite.toString());
  }
}

function guiEmailMoiDungAppMienPhi(email, name, orderCode, itemName) {
  var cleanEmail = String(email || "").trim().toLowerCase();
  if (!cleanEmail || cleanEmail.indexOf("@") === -1) return;
  var dedupKey = "APP_INVITE_SENT_" + String(orderCode || cleanEmail).replace(/[^A-Za-z0-9_@-]/g, "");
  try {
    var props = PropertiesService.getScriptProperties();
    if (orderCode && props.getProperty(dedupKey)) return;
    if (orderCode) props.setProperty(dedupKey, String(new Date().getTime()));
  } catch (eProp) {}

  var displayName = String(name || "Bạn").trim() || "Bạn";
  var winUrl = "https://diepvientailieu.store/downloads/Diep%20Vien%20Study.exe";
  var macUrl = "https://diepvientailieu.store/downloads/Diep%20Vien%20Study.zip";
  var pdfGuideUrl = "https://diepvientailieu.store/Huong_Dan_Cai_Dat.pdf";

  var htmlBody =
    '<div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:16px;">' +
      '<div style="background:linear-gradient(135deg,#0D1677 0%,#1e3a8a 100%);padding:28px 24px;text-align:center;border-radius:14px 14px 0 0;">' +
        '<div style="display:inline-block;background:rgba(255,255,255,0.16);color:#fde047;padding:4px 14px;border-radius:999px;font-size:11px;font-weight:bold;letter-spacing:1px;margin-bottom:10px;">QUÀ TẶNG ĐẶC QUYỀN • APP DIEP VIEN STUDY</div>' +
        '<h1 style="color:#ffffff;margin:0;font-size:20px;letter-spacing:0.4px;">MỜI BẠN DÙNG MIỄN PHÍ BỘ CÔNG CỤ AI TRÊN APP DIEP VIEN STUDY</h1>' +
        '<p style="color:#cbd5e1;margin:8px 0 0;font-size:13px;">Tài khoản của bạn đã được lưu tự động trên hệ thống (Không cần nhập lại thông tin ở lần mua sau)</p>' +
      '</div>' +
      '<div style="padding:26px 24px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 14px 14px;">' +
        '<p style="color:#1e293b;font-size:15px;margin-top:0;">Xin chào <b>' + displayName + '</b>,</p>' +
        '<p style="color:#334155;font-size:14px;line-height:1.6;">Cảm ơn bạn vừa giao dịch đơn hàng <b>#' + (orderCode || "DVTL") + '</b> (' + (itemName || "Khóa học & Tài liệu") + '). Hệ thống đã <b>lưu trữ thông tin tài khoản (' + cleanEmail + ')</b> của bạn để từ lần sau khi mua bất kỳ khóa học hay đề cương nào trên Web & App, mã QR giao dịch sẽ tự động điền sẵn tên và email của bạn mà không cần nhập lại lần 2.</p>' +
        '<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 18px;margin:18px 0;">' +
          '<div style="font-size:13px;font-weight:bold;color:#065f46;text-transform:uppercase;margin-bottom:10px;">4 TÍNH NĂNG HỌC TẬP AI MIỄN PHÍ 100% TRONG APP DIEP VIEN STUDY:</div>' +
          '<div style="font-size:13.5px;color:#1e293b;line-height:1.7;">' +
            '<b>1. Ghi Âm Bài Giảng & Tóm Tắt AI Tự Động:</b> Thu âm trực tiếp buổi học trên lớp hoặc video bài giảng, AI tự động trích xuất công thức trọng tâm và tạo bản tóm tắt chuẩn học thuật.<br>' +
            '<b>2. Phiên Dịch Cabin Đa Ngôn Ngữ 0.2 Giây:</b> Dịch song ngữ thời gian thực cho video, tài liệu và giáo trình chuyên ngành (Anh · Trung · Nhật · Hàn · Việt).<br>' +
            '<b>3. Chuyển Đổi PDF Sang Word (.docx) Giữ Nguyên Công Thức:</b> Chuyển nhanh đề cương, sách giáo trình PDF sang file Word chỉnh sửa được ngay, giữ nguyên bảng biểu và công thức Toán/Lý/Hóa.<br>' +
            '<b>4. Sơ Đồ Tư Duy Mindmap AI & Luyện Gõ Thuật Ngữ:</b> Tự động hệ thống hóa kiến thức môn học thành sơ đồ tư duy và rèn phản xạ từ vựng chuyên ngành.' +
          '</div>' +
        '</div>' +
        '<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:18px;margin:18px 0;text-align:center;">' +
          '<div style="font-size:13px;font-weight:bold;color:#1e3a8a;margin-bottom:12px;">TẢI & CÀI ĐẶT APP DIEP VIEN STUDY CHỈ VỚI 1 CLICK (TỰ ĐỘNG UPDATE KHI CÓ BẢN MỚI):</div>' +
          '<div style="margin-bottom:12px;">' +
            '<a href="' + winUrl + '" style="display:inline-block;background:#0D1677;color:#ffffff;font-weight:bold;padding:11px 18px;border-radius:8px;text-decoration:none;font-size:13px;margin:4px;">TẢI CHO WINDOWS (.EXE 1-CLICK)</a>' +
            '<a href="' + macUrl + '" style="display:inline-block;background:#1e293b;color:#ffffff;font-weight:bold;padding:11px 18px;border-radius:8px;text-decoration:none;font-size:13px;margin:4px;">TẢI CHO MACOS (.ZIP)</a>' +
          '</div>' +
          '<div style="margin-top:8px;">' +
            '<a href="' + pdfGuideUrl + '" style="display:inline-block;background:#ffffff;color:#2563eb;border:1px solid #2563eb;font-weight:bold;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:12.5px;">HƯỚNG DẪN CÀI ĐẶT PDF</a>' +
          '</div>' +
          '<p style="font-size:12px;color:#475569;margin:10px 0 0;line-height:1.5;">Tài khoản đăng nhập App của bạn: <b>' + cleanEmail + '</b> · Khi Admin cập nhật thêm khóa học hoặc tính năng mới, App trên máy bạn sẽ <b>tự động cập nhật (Auto-Update)</b> ngay khi mở mà không cần tải lại.</p>' +
        '</div>' +
        '<div style="margin-top:20px;padding-top:14px;border-top:1px dashed #e2e8f0;font-size:12px;color:#64748b;text-align:center;line-height:1.6;">' +
          'Website: <a href="' + KHO_CONFIG.WEBSITE_URL + '" style="color:#2563eb;text-decoration:none;font-weight:bold;">diepvientailieu.store</a> &nbsp;|&nbsp; ' +
          'Zalo Hỗ Trợ: <b>' + KHO_CONFIG.SUPPORT_ZALO + '</b>' +
        '</div>' +
      '</div>' +
    '</div>';

  MailApp.sendEmail({
    to: cleanEmail,
    name: "APP Diep Vien study",
    replyTo: KHO_CONFIG.WAREHOUSE_EMAIL,
    subject: "[APP DIEP VIEN STUDY] Mời bạn dùng miễn phí Bộ Công Cụ Học Tập AI (TK: " + cleanEmail + ")",
    htmlBody: htmlBody
  });
}


function guiEmailOtpApp(email, name, otpCode) {
  var htmlBody =
    '<div style="max-width:560px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:16px;">' +
      '<div style="background:linear-gradient(135deg,#0D1677 0%,#1e3a8a 100%);padding:26px 24px;text-align:center;border-radius:14px 14px 0 0;">' +
        '<div style="display:inline-block;background:rgba(255,255,255,0.15);color:#fde047;padding:4px 14px;border-radius:999px;font-size:11px;font-weight:bold;letter-spacing:1px;margin-bottom:10px;">ĐIỆP VIÊN STUDY • XÁC THỰC TÀI KHOẢN APP</div>' +
        '<h1 style="color:#ffffff;margin:0;font-size:20px;letter-spacing:0.5px;">MÃ XÁC NHẬN OTP TẢI & KÍCH HOẠT APP 💻</h1>' +
      '</div>' +
      '<div style="padding:26px 24px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 14px 14px;">' +
        '<p style="color:#1e293b;font-size:15px;margin-top:0;">Xin chào <b>' + (name || "Bạn") + '</b>,</p>' +
        '<p style="color:#334155;font-size:14px;line-height:1.6;">Bạn vừa yêu cầu xác nhận tài khoản Email <b>' + email + '</b> để kích hoạt bản quyền và tải ứng dụng <b>Điệp Viên Study (Học Cùng AI)</b> trên Website <b>diepvientailieu.store</b>.</p>' +
        '<div style="background:#eff6ff;border:2px dashed #2563eb;border-radius:12px;padding:18px;text-align:center;margin:20px 0;">' +
          '<div style="font-size:12px;color:#1e40af;font-weight:bold;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">MÃ XÁC THỰC OTP CỦA BẠN (6 CHỮ SỐ):</div>' +
          '<div style="font-size:32px;font-weight:900;letter-spacing:8px;color:#0D1677;font-family:monospace;">' + otpCode + '</div>' +
          '<div style="font-size:11px;color:#64748b;margin-top:6px;">⏳ Mã có hiệu lực trong vòng 15 phút</div>' +
        '</div>' +
        '<p style="color:#334155;font-size:13px;line-height:1.6;">👉 Vui lòng nhập mã OTP này vào cửa sổ xác thực trên Website để <b>kích hoạt tài khoản App</b> và <b>mở khóa nút tải App trực tiếp (Windows & macOS)</b>.</p>' +
        '<div style="background:#ecfdf5;border:1px solid #a7f3d0;padding:10px 14px;border-radius:8px;font-size:12px;color:#065f46;margin-top:14px;">' +
          '🔒 <b>Bảo mật 1 thiết bị:</b> Sau khi kích hoạt, Email <b>' + email + '</b> chính là tài khoản đăng nhập App Điệp Viên Study của bạn (cố định trên 01 máy duy nhất).' +
        '</div>' +
      '</div>' +
    '</div>';

  MailApp.sendEmail({
    to: email,
    name: "Điệp Viên Study",
    replyTo: KHO_CONFIG.WAREHOUSE_EMAIL,
    subject: "[ĐIỆP VIÊN STUDY] Mã OTP Xác Thực & Kích Hoạt Tài Khoản App: " + otpCode,
    htmlBody: htmlBody
  });
}

function guiEmailKichHoatApp(email, name) {
  var htmlBody =
    '<div style="max-width:560px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:16px;">' +
      '<div style="background:linear-gradient(135deg,#059669 0%,#0D1677 100%);padding:26px 24px;text-align:center;border-radius:14px 14px 0 0;">' +
        '<div style="display:inline-block;background:rgba(255,255,255,0.18);color:#fde047;padding:4px 14px;border-radius:999px;font-size:11px;font-weight:bold;letter-spacing:1px;margin-bottom:10px;">ĐIỆP VIÊN STUDY • ĐÃ KÍCH HOẠT BẢN QUYỀN</div>' +
        '<h1 style="color:#ffffff;margin:0;font-size:20px;">TÀI KHOẢN APP ĐÃ ĐƯỢC XÁC THỰC & KÍCH HOẠT ✅</h1>' +
      '</div>' +
      '<div style="padding:26px 24px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 14px 14px;">' +
        '<p style="color:#1e293b;font-size:15px;margin-top:0;">Xin chào <b>' + (name || "Bạn") + '</b>,</p>' +
        '<p style="color:#334155;font-size:14px;line-height:1.6;">Chúc mừng bạn! Tài khoản Email <b>' + email + '</b> của bạn đã được xác thực OTP và kích hoạt thành công trên hệ thống <b>App Điệp Viên Study</b>.</p>' +
        '<div style="background:#f0fdf4;border-left:4px solid #10b981;padding:14px 16px;border-radius:8px;margin:16px 0;font-size:13px;color:#1e293b;line-height:1.6;">' +
          '• <b>Tài khoản đăng nhập App:</b> <code style="background:#d1fae5;padding:2px 6px;border-radius:4px;font-weight:bold;color:#065f46;">' + email + '</code><br>' +
          '• <b>Trạng thái bản quyền:</b> Đã xác thực OTP & Kích hoạt (Khóa bảo mật 1 máy tính duy nhất)<br>' +
          '• <b>Tải App bất cứ lúc nào tại:</b> <a href="https://diepvientailieu.store" style="color:#2563eb;font-weight:bold;">https://diepvientailieu.store</a>' +
        '</div>' +
      '</div>' +
    '</div>';

  MailApp.sendEmail({
    to: email,
    name: "Điệp Viên Study",
    replyTo: KHO_CONFIG.WAREHOUSE_EMAIL,
    subject: "[ĐIỆP VIÊN STUDY] ✅ Tài Khoản App (" + email + ") Đã Được Kích Hoạt Thành Công!",
    htmlBody: htmlBody
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   4. CÀI ĐẶT & ĐỒNG BỘ KHO LƯU TRỮ (ĐỀ CƯƠNG + BTL) SANG DVTL_MASTER_DATABASE
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Chạy 1 lần trên diepvientailieu@gmail.com để ghim Kho Lưu Trữ vào "Drive của tôi"
 * và đồng bộ toàn bộ Đề Cương + BTL vào DVTL_MASTER_DATABASE
 */
function caiDatKhoTrenDriveDiepVienGroup() {
  var root = DriveApp.getRootFolder();
  var warehouseName = "📦 KHO LƯU TRỮ - ĐIỆP VIÊN TÀI LIỆU";
  var iter = root.getFoldersByName(warehouseName);
  var warehouseFolder = iter.hasNext() ? iter.next() : root.createFolder(warehouseName);

  // Tạo lối tắt (Shortcut) 4 kho chính vào trong thư mục Kho Lưu Trữ của diepvientailieu@gmail.com
  var targets = [
    { name: "01_Kho_De_Cuong_Chinh_Thuc", id: KHO_CONFIG.FOLDER_DE_CUONG },
    { name: "02_Kho_Bai_Tap_Lon_BTL_Chinh_Thuc", id: KHO_CONFIG.FOLDER_BTL_FULL },
    { name: "03_Kho_BTL_Cho_Khach_Check_Truoc", id: KHO_CONFIG.FOLDER_BTL_PREVIEW },
    { name: "04_Kho_Khoa_Hoc_Zoom", id: KHO_CONFIG.FOLDER_KHOA_HOC }
  ];

  var existingNames = {};
  var children = warehouseFolder.getFiles();
  while (children.hasNext()) {
    existingNames[children.next().getName()] = true;
  }

  for (var i = 0; i < targets.length; i++) {
    if (!existingNames[targets[i].name]) {
      UrlFetchApp.fetch("https://www.googleapis.com/drive/v3/files", {
        method: "post",
        contentType: "application/json",
        headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
        payload: JSON.stringify({
          name: targets[i].name,
          mimeType: "application/vnd.google-apps.shortcut",
          parents: [warehouseFolder.getId()],
          shortcutDetails: { targetId: targets[i].id }
        }),
        muteHttpExceptions: true
      });
    }
  }

  // Đồng bộ toàn bộ Đề Cương & BTL vào DVTL_MASTER_DATABASE
  dongBoTatCaDeCuongVaBTL();
  Logger.log("✅ Đã cài đặt Kho Lưu Trữ trên diepvientailieu@gmail.com: " + warehouseFolder.getUrl());
}

/**
 * Quét cả Kho Đề Cương (01) và Kho BTL (02, 03), khóa tải file và cập nhật thẳng vào DVTL_MASTER_DATABASE
 */
function dongBoTatCaDeCuongVaBTL() {
  autoTaoKhoTaiLieu();
  autoTaoKhoBTL();
}

/** Quét thư mục ĐỀ CƯƠNG (01_Danh_Sach_De_Cuong_Luu_Tru) & cập nhật Tab KhoTaiLieu */
function autoTaoKhoTaiLieu() {
  var folder = DriveApp.getFolderById(KHO_CONFIG.FOLDER_DE_CUONG);
  var ss = SpreadsheetApp.openById(KHO_CONFIG.MASTER_DB_ID);
  var sheet = ss.getSheetByName("KhoTaiLieu") || ss.insertSheet("KhoTaiLieu");

  // Đọc giá bán và SKU hiện có để giữ nguyên mã SKU cũ của 153 môn trên Web
  var existingMap = {};
  if (sheet.getLastRow() > 1) {
    var oldData = sheet.getDataRange().getValues();
    for (var i = 1; i < oldData.length; i++) {
      var oldName = chuanHoaTen(String(oldData[i][1]));
      if (oldName) {
        existingMap[oldName] = {
          sku: String(oldData[i][0]).trim(),
          price: Number(oldData[i][2]) || 50000
        };
      }
    }
  }

  var rows = [];
  var usedSkus = {};

  // 1. Quét file lẻ trong 01_Danh_Sach_De_Cuong_Luu_Tru
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    var fname = file.getName();
    if (fname === "Danh_Sach_De_Cuong_Kiem_Tra.txt") continue;

    khoaTaiFile(file.getId());
    var norm = chuanHoaTen(fname);
    var matched = existingMap[norm];
    var sku = matched ? matched.sku : taoSKU(fname, usedSkus);
    var price = matched ? matched.price : 50000;
    usedSkus[sku] = true;

    try { file.addEditor("teamtccm@gmail.com"); } catch(e) {}
    rows.push([sku, fname, price, file.getId(), '=HYPERLINK("' + file.getUrl() + '", "🔗 Click Mở: ' + fname.replace(/"/g, "") + '")', "File (diepviengroup • Ủy quyền TCCM)"]);
  }

  // 2. Quét thư mục môn học con (TACS1, TACS2, XXTK, HTTTQL)
  var subFolders = folder.getFolders();
  while (subFolders.hasNext()) {
    var sub = subFolders.next();
    var sname = sub.getName();
    var normSub = chuanHoaTen(sname);
    var matchedSub = existingMap[normSub];
    var skuSub = matchedSub ? matchedSub.sku : taoSKU(sname, usedSkus);
    var priceSub = matchedSub ? matchedSub.price : 50000;
    usedSkus[skuSub] = true;

    try { sub.addEditor("teamtccm@gmail.com"); } catch(e) {}
    rows.push([skuSub, sname, priceSub, sub.getId(), '=HYPERLINK("' + sub.getUrl() + '", "📂 Click Mở: ' + sname.replace(/"/g, "") + '")', "Folder (diepviengroup • Ủy quyền TCCM)"]);
  }

  sheet.clearContents();
  sheet.getRange(1, 1, 1, 6).setValues([[
    "Mã File (SKU)", "Tên Tài Liệu / Môn Học", "Giá Bán (VNĐ)", "ID File Drive (diepviengroup)", "Link Gốc Drive", "Phân Loại Kho"
  ]]).setFontWeight("bold").setBackground("#1e1b4b").setFontColor("#a5b4fc");

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, 6).setValues(rows);
  }
  Logger.log("✅ Đã đồng bộ " + rows.length + " Đề Cương vào Tab KhoTaiLieu (DVTL_MASTER_DATABASE)!");
}

/** Quét thư mục BÀI TẬP LỚN (02_Danh_Sach_Bai_Tap_Lon_Luu_Tru & 03_Cho_Khach_Check_Truoc) & cập nhật Tab Kho_BTL */
function autoTaoKhoBTL() {
  var fullFolder = DriveApp.getFolderById(KHO_CONFIG.FOLDER_BTL_FULL);
  var previewFolder = DriveApp.getFolderById(KHO_CONFIG.FOLDER_BTL_PREVIEW);
  var ss = SpreadsheetApp.openById(KHO_CONFIG.MASTER_DB_ID);
  var sheet = ss.getSheetByName("Kho_BTL") || ss.insertSheet("Kho_BTL");

  // Map file Xem Trước (03_Cho_Khach_Check_Truoc)
  var previewMap = {};
  var pFiles = previewFolder.getFiles();
  while (pFiles.hasNext()) {
    var pf = pFiles.next();
    previewMap[chuanHoaTen(pf.getName())] = { id: pf.getId(), url: pf.getUrl() };
  }

  var rows = [];
  var usedSkus = {};
  var fFiles = fullFolder.getFiles();
  while (fFiles.hasNext()) {
    var f = fFiles.next();
    khoaTaiFile(f.getId());
    var norm = chuanHoaTen(f.getName());
    var prev = previewMap[norm] || { id: "", url: "" };
    var sku = "BTL_" + taoSKU(f.getName(), usedSkus);
    usedSkus[sku] = true;
    rows.push([
      sku,
      f.getName(),
      f.getId(),
      f.getUrl(),
      prev.id,
      prev.url,
      "Sẵn sàng giao (diepviengroup)"
    ]);
  }

  sheet.clearContents();
  sheet.getRange(1, 1, 1, 7).setValues([[
    "Mã BTL", "Tên Đề Tài Bài Tập Lớn (BTL)", "ID File Bản Full (02)", "Link Bản Full", "ID File Check Trước (03)", "Link Check Trước", "Trạng Thái Kho"
  ]]).setFontWeight("bold").setBackground("#14532d").setFontColor("#86efac");

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, 7).setValues(rows);
  }
  Logger.log("✅ Đã đồng bộ " + rows.length + " Bài Tập Lớn vào Tab Kho_BTL (DVTL_MASTER_DATABASE)!");
}

/** Quét thư mục KHOÁ HỌC (09_Khoa_Hoc) */
function autoTaoKhoKhoaHoc() {
  var folder = DriveApp.getFolderById(KHO_CONFIG.FOLDER_KHOA_HOC);
  var files = folder.getFiles();
  var count = 0;
  while (files.hasNext()) {
    var f = files.next();
    khoaTaiFile(f.getId());
    count++;
  }
  Logger.log("✅ Đã khóa tải và kiểm tra " + count + " file trong 09_Khoa_Hoc!");
}

function chuanHoaTen(ten) {
  return ten
    .replace(/\.(docx?|pdf|xlsx?|pptx?|txt)$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function taoSKU(tenFile, usedMap) {
  var ten = tenFile.replace(/\.(docx?|pdf|xlsx?|pptx?|txt)$/i, "");
  ten = ten.replace(/^(Đề Cương Ôn Tập|Đề Cương|Bài Tập Lớn|Khóa Học|Khoá Học)\s*[-–:]?\s*/i, "").trim();
  var words = ten.split(/[\s\-_]+/);
  var sku = "";
  for (var i = 0; i < words.length; i++) {
    if (words[i].length > 0) {
      var ch = boDau(words[i].charAt(0)).toUpperCase();
      if (/^\d/.test(words[i])) { sku += words[i]; } else if (/[A-Z0-9]/.test(ch)) { sku += ch; }
    }
  }
  if (!sku) sku = "DOC";
  var finalSku = sku;
  var counter = 2;
  while (usedMap && usedMap[finalSku]) {
    finalSku = sku + counter;
    counter++;
  }
  return finalSku;
}

function boDau(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}

/* ══════════════════════════════════════════════════════════════════════════
   5. TEST NHANH
   ══════════════════════════════════════════════════════════════════════════ */

function testGuiMailDiepVienGroup() {
  guiEmailBanGiao(
    "tanbanhda@gmail.com",
    "Khách Hàng Test",
    "DVTL888",
    "Đề Cương Kinh Tế Lượng",
    "https://drive.google.com/file/d/1Bv-lVYqizOH2kUzV1qJJSRnuQBaLoUlb/view",
    "Mua Đề Cương"
  );
  Logger.log("✅ Đã gửi email test từ Điệp Viên Tài Liệu (" + KHO_CONFIG.WAREHOUSE_EMAIL + ")!");
}

function guiNgayChoKhachAnhKhoa() {
  var email = "nganhkhoa97@gmail.com";
  var name = "Nguyễn Anh Khoa";
  var url1 = capQuyenDrive("1nQv0aa-gekpSeqlBLUCfJyogU2hCyFzpo2M_TwK7kBw", email);
  guiEmailBanGiao(
    email,
    name,
    "DCTCQT598",
    "Đề Cương Tài Chính Quốc Tế — ULSA",
    url1 || "https://docs.google.com/document/d/1nQv0aa-gekpSeqlBLUCfJyogU2hCyFzpo2M_TwK7kBw/view",
    "Mua Đề Cương"
  );
  var url2 = capQuyenDrive("1-K0m6xZoSRVM1iBV1OfuZquEnqJXr87h5wQE7G_n_VQ", email);
  guiEmailBanGiao(
    email,
    name,
    "DCTTTCVCDCTC635",
    "Đề Cương Thị Trường Tài Chính Và Các Định Chế Tài Chính — ULSA",
    url2 || "https://docs.google.com/document/d/1-K0m6xZoSRVM1iBV1OfuZquEnqJXr87h5wQE7G_n_VQ/view",
    "Mua Đề Cương"
  );
  Logger.log("✅ Đã gửi 2 email bàn giao chính thức từ diepvientailieu@gmail.com tới nganhkhoa97@gmail.com!");
}
