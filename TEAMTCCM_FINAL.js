// =========================================================================
// 👑 TRẠM ĐIỀU KHIỂN TỔNG — TÀI KHOẢN CHÍNH: teamtccm@gmail.com (BỘ NÃO v6.1)
// Hệ thống tự động hoàn toàn 100%:
// 1. Quản lý Sheet trung tâm DVTL_MASTER_DATABASE (KhoTaiLieu, Kho_BTL, TaiKhoanNganHang, Lich_Su_GD, Don_De_Cuong, Don_BTL_DichVu, TaiKhoan_KhachHang)
// 2. Nhận mọi đơn hàng từ Web (diepvientailieu.store) & App (Điệp Viên Study) qua cả GET & POST
// 3. Tự động quét Gmail biến động số dư ngân hàng ACB (mailalert@acb.com.vn -> teamtccm@gmail.com) mỗi 1 phút:
//    - Nhận diện MỌI email biến động số dư ACB về STK 27820961 (TRINH DUC THINH)
//    - Ghi vào bảng Lich_Su_GD & bắn thông báo Telegram ngay lập tức về nhóm -5515040883
//    - Nếu khớp Mã Đơn (Khóa Học / Đề Cương / BTL): Tự động đổi trạng thái PAID_SUCCESS / ĐÃ CỌC,
//      đồng bộ mở khóa vào TaiKhoan_KhachHang (Web + App) và ra lệnh cho Kho Phát File
//      (diepvientailieu@gmail.com) cấp quyền Google Drive + gửi Email cho khách hàng!
// =========================================================================

var MASTER_SHEET_ID = "1z8D-Q9yVUl62OWWArelFYX1xciX19rWIlyblrjgasIQ";

// ─── THÔNG TIN CẤU HÌNH TELEGRAM ───────────────────────────────────────────
var TELEGRAM_BOT_TOKEN = "8783402263:AAHBLBGamMK4IRaYpW3tRrc719T4FREMRYg";
var TELEGRAM_GROUP_ID  = "-5515040883"; // Nhóm: Thông Báo Biến Động Số Dư
var ADMIN_CHAT_ID      = "6064805152";

// ─── LINK WEBHOOK CỦA TÀI KHOẢN KHO PHÁT FILE (diepvientailieu@gmail.com) ────
var KHO_PHAT_FILE_WEBHOOK_URL = ""; // Tích hợp trực tiếp ngay trên diepvientailieu@gmail.com (0-hop)
var KHO_SECRET_KEY = "DVTL_SECRET_2026_TCCM_TO_DIEPVIEN";

// ─── ID 5 THƯ MỤC KHO GOOGLE DRIVE CHÍNH THỨC (diepvientailieu@gmail.com) ────
var FOLDER_DE_CUONG_ID  = "1zPRnfdMbaaYWSKK8PZdZIuooOanjWynp"; // 01_Danh_Sach_De_Cuong_Luu_Tru
var FOLDER_BTL_FULL_ID  = "13wHeLedN8McA8AycvznNoj4CXzDQg98j"; // 02_Danh_Sach_Bai_Tap_Lon_Luu_Tru
var FOLDER_BTL_CHECK_ID = "1J5GxIOQocD0FeISMyaS980pRrs_Qu0qr"; // 03_Cho_Khach_Check_Truoc
var FOLDER_KIEM_TRA_ID  = "1B6yVI8KsQj_t8HB7sTJ-M99TCZqI7oee"; // 04_File_Kiem_Tra_De_Cuong_Va_BTL
var FOLDER_LUU_TRU_KHACH_ID = "1p3YzZFVteETJMP5bDEhiqlpjqkOkUbeK"; // 06_Luu_Tru_Thong_Tin_Khach_Hang
var FOLDER_KHOA_HOC_ID  = "13CEmorojtCBFPxlqS3C3PSEhLKbsDMnC"; // 09_Khoa_Hoc
var BANG_LUU_TRU_ID     = "1XJe6Ar6Vlm_quITuTAGiaLfnf3ZULlMFcAhI3ULm6RM"; // BẢNG LƯU TRỮ TỔNG HỢP

// ─── BẢNG ÁNH XẠ KHÓA HỌC -> FOLDER GOOGLE DRIVE (diepvientailieu@gmail.com) ─
var COURSE_DRIVE_MAP = {
  "ALL-COURSES-399K": {
    "name": "FULL TẤT CẢ KHÓA HỌC 2K9 - 2K10 - ĐGNL (HSA, TSA, V-ACT, BCA, QDA, VSAT)",
    "folderId": "1_1RwRFjIYJO0BmmJEEqVV-4-GNOkLcNQ",
    "extraFolderIds": [
      "13CEmorojtCBFPxlqS3C3PSEhLKbsDMnC"
    ],
    "price": 399000,
    "tier": "full_399k",
    "parentCourseId": "ALL-COURSES-399K",
    "parentSubjectId": "ALL-COURSES-399K"
  },
  "COURSE-K9-LOP12": {
    "name": "COMBO KHÓA HỌC THPT LỚP 12 CHO 2K9 (TOÁN · LÝ · HÓA · ANH · TOPUNI NỀN TẢNG)",
    "folderId": "1wiDE8QNTQMU2UgsxpC6skyeFz7uu6U5p",
    "extraFolderIds": [
      "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
    ],
    "price": 199000,
    "tier": "course_199k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
  },
  "COURSE-K10-LOP11": {
    "name": "COMBO KHÓA HỌC THPT LỚP 11 CHO 2K10 (TOÁN · LÝ · HÓA · TIN HỌC LẬP TRÌNH)",
    "folderId": "13BwuOTEm_amRfX-6NXGQGy0yf2DN5SL-",
    "extraFolderIds": [],
    "price": 199000,
    "tier": "course_199k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-TOAN11-2K10"
  },
  "COURSE-DGNL-HSA": {
    "name": "COMBO LUYỆN THI ĐGNL HSA — ĐHQG HÀ NỘI 2027 (EMPIRE · MAPSTUDY · HOCMAI · HSA EDU · TOPUNI)",
    "folderId": "1CvbLsIY32pyWJw-dxDRn-sNOeKLQvQD3",
    "extraFolderIds": [
      "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
    ],
    "price": 199000,
    "tier": "course_199k",
    "parentCourseId": "COURSE-DGNL-HSA",
    "parentSubjectId": "ITEM-HSA-EMPIRE"
  },
  "COURSE-DGTD-TSA": {
    "name": "COMBO LUYỆN THI ĐGTD TSA — ĐH BÁCH KHOA HÀ NỘI 2027 (EMPIRE · BMC · HOCMAI · TUYENSINH247 · TDMU)",
    "folderId": "1RhHC9PuPYfdIqrqhjsy-hN5XJvsjVRTv",
    "extraFolderIds": [],
    "price": 199000,
    "tier": "course_199k",
    "parentCourseId": "COURSE-DGTD-TSA",
    "parentSubjectId": "ITEM-TSA-EMPIRE"
  },
  "COURSE-DGNL-VACT": {
    "name": "COMBO LUYỆN THI ĐGNL V-ACT — ĐHQG TP.HCM 2027 (EMPIRE TEAM · MAPSTUDY · HOCMAI)",
    "folderId": "1VRgzIGt3u8c7mC9dMLLXd6QjsBInraXm",
    "extraFolderIds": [
      "1bz7JkVDWOOk5bKKrRFwyZvwUH2Mb9zj2",
      "12c6aQKTlU3hiJcQD2ThFKbgWIkCzpqv6",
      "1UQFg7cF1zuru0VMWqk4bn8XYd7gQnfIM"
    ],
    "price": 199000,
    "tier": "course_199k",
    "parentCourseId": "COURSE-DGNL-VACT",
    "parentSubjectId": "ITEM-VACT-EMPIRE"
  },
  "COURSE-BCA-QDA-VSAT": {
    "name": "COMBO LUYỆN THI ĐGNL BỘ CÔNG AN (BCA) · QUÂN ĐỘI (QDA) · VSAT EMPIRE 2027",
    "folderId": "1VRgzIGt3u8c7mC9dMLLXd6QjsBInraXm",
    "extraFolderIds": [
      "1AhTkg3k1908Md2VmTeIWsrg2dZSJeLAK",
      "1jNymOlAbD1sdzjKk6ijFzW6ZkB-IgvhI",
      "1KhQ_bJA5IEjeWjS5fjrn8ZlA7u1p-xbc"
    ],
    "price": 199000,
    "tier": "course_199k",
    "parentCourseId": "COURSE-BCA-QDA-VSAT",
    "parentSubjectId": "ITEM-BCA-CONGAN"
  },
  "COURSE-SUBJ-TOAN12-2K9": {
    "name": "MÔN TOÁN 12 (2K9) — TRỌN BỘ 7 KHÓA THẦY ĐỖ VĂN ĐỨC, MAPSTUDY, NGUYỄN PHAN TIẾN, ANH SHIPPER, HOCMAI",
    "folderId": "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
  },
  "COURSE-SUBJ-LY12-2K9": {
    "name": "MÔN VẬT LÝ 12 (2K9) — TRỌN BỘ 5 KHÓA THẦY VŨ NGỌC ANH, IPCLASS, LÊ TÙNG ƯNG, VŨ TUẤN ANH, HOCMAI",
    "folderId": "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-LY12-2K9"
  },
  "COURSE-SUBJ-HOA12-2K9": {
    "name": "MÔN HÓA HỌC 12 (2K9) — TRỌN BỘ 4 KHÓA THẦY PHẠM VĂN TRỌNG, NGUYỄN ANH PHONG, PHẠM VĂN THUẬN, PHẠM THANH TÙNG",
    "folderId": "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-HOA12-2K9"
  },
  "COURSE-SUBJ-ANH12-2K9": {
    "name": "MÔN TIẾNG ANH 12 (2K9) — CÔ MAI PHƯƠNG TRỌN BỘ LỘ TRÌNH PRO3M · PRO3MPLUS · VIP90 2027",
    "folderId": "1WlZvKRBm4CYRH7yohELZf0G1vcvSOwqe",
    "extraFolderIds": [
      "1W80wIVEKFn8KMxTzTkfWf-IktCwAtjfL"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-ANH12-2K9"
  },
  "COURSE-SUBJ-TOPUNI12-2K9": {
    "name": "TOPUNI NỀN TẢNG 12 HOCMAI — TRỌN BỘ 7 KHÓA CÁC MÔN (TOÁN · VĂN · ANH · LÝ · HÓA · SINH)",
    "folderId": "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOPUNI12-2K9"
  },
  "COURSE-SUBJ-TOAN11-2K10": {
    "name": "MÔN TOÁN 11 (2K10) — TRỌN BỘ THẦY ĐỖ VĂN ĐỨC TENSCHOOL & THẦY QUÂN TUYENSINH247",
    "folderId": "1CbMUKPhYMX12UmVAfsQAkpe8KnciWSlP",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-TOAN11-2K10"
  },
  "COURSE-SUBJ-LY11-2K10": {
    "name": "MÔN VẬT LÝ 11 (2K10) — TRỌN BỘ THẦY VŨ HOÀNG QUÂN & THẦY LONG TUYENSINH247",
    "folderId": "134iDRuiFnuSlRFGC07o0qI8YC-1gMrIL",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-LY11-2K10"
  },
  "COURSE-SUBJ-HOA11-2K10": {
    "name": "MÔN HÓA HỌC 11 (2K10) — TRỌN BỘ CÔ DƯƠNG, CÔ HUỆ HOCMAI & THẦY TÙNG TUYENSINH247",
    "folderId": "1CL2S35nzQS7qkXKck9c_efHX-aS87v-a",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-HOA11-2K10"
  },
  "COURSE-SUBJ-TIN11-2K10": {
    "name": "MÔN TIN HỌC 11 (2K10) — TRỌN BỘ TIN HỌC ỨNG DỤNG · KHOA HỌC MÁY TÍNH · TIN VĂN PHÒNG",
    "folderId": "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-TIN11-2K10"
  },
  "COURSE-ITEM-01": {
    "name": "TOÁN THẦY ĐỖ VĂN ĐỨC TENS 2K9",
    "folderId": "1S4DkHAPvliK9ea222q9x3sDbVM2TX3bm",
    "extraFolderIds": [
      "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
  },
  "COURSE-ITEM-02": {
    "name": "TOÁN TỔ TOÁN MAPSTUDY 2K9 THPTQG 2027",
    "folderId": "1a78wwvHogORJpW2qKWsveK4yMeorJEDg",
    "extraFolderIds": [
      "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
  },
  "COURSE-ITEM-03": {
    "name": "TOÁN THẦY NGUYỄN PHAN TIẾN 2K9 - XPS Toán 12 Khoá SMART 2027",
    "folderId": "13NIwvnmeb37PpkHI7dmxdZh3of9ewPuF",
    "extraFolderIds": [
      "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
  },
  "COURSE-ITEM-04": {
    "name": "TOÁN ANH SHIPPER TOÁN 2K9 - XPS Khoá Trùm 12A3 2027",
    "folderId": "1DkG2NQLQ5egWATE7s_HxWheA7twDMCzE",
    "extraFolderIds": [
      "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
  },
  "COURSE-ITEM-05": {
    "name": "NỀN TẢNG 12 MÔN TOÁN 2027 HOCMAI",
    "folderId": "14Vsk6-lsb-Nary5wbDpdWvyKc5pne3Ke",
    "extraFolderIds": [
      "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
  },
  "COURSE-ITEM-06": {
    "name": "GIÁO VIÊN HUY HƯỚNG NỘI - 2K8 - TMT2026 - KHÓA CHUYÊN ĐỀ",
    "folderId": "104Fz0TA9cLZJy4NAAxPwGCP29IKTlR0g",
    "extraFolderIds": [
      "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
  },
  "COURSE-ITEM-07": {
    "name": "TOÁN LXO - 2K8 - CÁC BUỔI HỌC VỀ TOÁN THỰC TẾ",
    "folderId": "14Ab28ONGVYGeJuoT5Ga5Q-R5LyiSCsyB",
    "extraFolderIds": [
      "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
  },
  "COURSE-ITEM-08": {
    "name": "LÝ THẦY VŨ NGỌC ANH 2K9 - Trọn Bộ Lộ Trình IOME 2027",
    "folderId": "1hXQ_ro2zg7CwHF3Qi3d9KBkoaHn6XxoE",
    "extraFolderIds": [
      "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-LY12-2K9"
  },
  "COURSE-ITEM-09": {
    "name": "LÝ THẦY THẮNG, THẦY TIẾN IPCLASS 2K9 - XPS Chinh phục 9+ Vật lý 12",
    "folderId": "1AT0VRyByh3si-wZPqPbpToyn4I21FOzJ",
    "extraFolderIds": [
      "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-LY12-2K9"
  },
  "COURSE-ITEM-10": {
    "name": "LÝ THẦY LÊ TÙNG ƯNG TENS 2K9 - Full lộ trình XPS Vật lý 12 2027",
    "folderId": "1oVB8UTCvVOTGrMFKp4HdIt1k8MwolyTq",
    "extraFolderIds": [
      "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-LY12-2K9"
  },
  "COURSE-ITEM-11": {
    "name": "LÝ THẦY VŨ TUẤN ANH SANGSANG 2K9 - XPS Vật lý 12 2027",
    "folderId": "1ckMsAluzK_gHMHb-z6VjYZS22MEmKFwg",
    "extraFolderIds": [
      "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-LY12-2K9"
  },
  "COURSE-ITEM-12": {
    "name": "Z. NỀN TẢNG 12 MÔN VẬT LÝ 2027 HOCMAI",
    "folderId": "1pXv3a7zgk2H-Jrm1HtgzRKTF1F8Pl_yc",
    "extraFolderIds": [
      "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-LY12-2K9"
  },
  "COURSE-ITEM-13": {
    "name": "HÓA THẦY PHẠM VĂN TRỌNG 2K9 THPTQG 2027",
    "folderId": "1JkWVgk6FWNROK433fzc2Bbs8DXB5X5OM",
    "extraFolderIds": [
      "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-HOA12-2K9"
  },
  "COURSE-ITEM-14": {
    "name": "HÓA THẦY NGUYỄN ANH PHONG 2K9 - Trọn Bộ Lộ Trình IOME 2027",
    "folderId": "17YG-JmPDC6B_0xJtkDNiRiYPZh7oxdNu",
    "extraFolderIds": [
      "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-HOA12-2K9"
  },
  "COURSE-ITEM-15": {
    "name": "HOÁ THẦY PHẠM VĂN THUẬN SANGSANG - Trọn Bộ Lộ Trình CTG 2K9",
    "folderId": "1nT5OCuM2fsZ99XVkLzEuRoonpPrBxUU1",
    "extraFolderIds": [
      "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-HOA12-2K9"
  },
  "COURSE-ITEM-16": {
    "name": "HÓA THẦY PHẠM THANH TÙNG 2K8",
    "folderId": "1rvjxRmI_pSmvflpJfl3lUMS_QeOaTFfV",
    "extraFolderIds": [
      "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-HOA12-2K9"
  },
  "COURSE-ITEM-17": {
    "name": "TIẾNG ANH CÔ MAI PHƯƠNG 2K9 - Trọn Bộ Lộ Trình Pro3m, Pro3mplus, Vip90 2027",
    "folderId": "1W80wIVEKFn8KMxTzTkfWf-IktCwAtjfL",
    "extraFolderIds": [
      "1WlZvKRBm4CYRH7yohELZf0G1vcvSOwqe"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-ANH12-2K9"
  },
  "COURSE-ITEM-18": {
    "name": "NỀN TẢNG 12 MÔN TOÁN 2027 HOCMAI",
    "folderId": "1sKwBrvFNSAF95XUHmAIRuGUaFYb9fFSu",
    "extraFolderIds": [
      "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOPUNI12-2K9"
  },
  "COURSE-ITEM-19": {
    "name": "NỀN TẢNG 12 MÔN TOÁN 2026 HOCMAI",
    "folderId": "1SQ-uZI5-tEh6vAzbcECq3lMBnv-WHoIj",
    "extraFolderIds": [
      "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOPUNI12-2K9"
  },
  "COURSE-ITEM-20": {
    "name": "NỀN TẢNG 12 MÔN NGỮ VĂN HOCMAI",
    "folderId": "1DnhTPq6VL79T2nDyqtL13G5dyi_K0Yx3",
    "extraFolderIds": [
      "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOPUNI12-2K9"
  },
  "COURSE-ITEM-21": {
    "name": "NỀN TẢNG 12 MÔN TIẾNG ANH 2026 HOCMAI",
    "folderId": "1N9Ge80PeZiLBts5Udb8h0g0X8-Rtx9mE",
    "extraFolderIds": [
      "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOPUNI12-2K9"
  },
  "COURSE-ITEM-22": {
    "name": "NỀN TẢNG 12 MÔN VẬT LÝ 2026 HOCMAI",
    "folderId": "1rvyHSojdbe__C26Jj4xB5toinNJRZTEc",
    "extraFolderIds": [
      "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOPUNI12-2K9"
  },
  "COURSE-ITEM-23": {
    "name": "NỀN TẢNG 12 MÔN HÓA HỌC 2026 HOCMAI",
    "folderId": "1IgDvAyUK1UN6W5jqXWgPVML1cUS_vA0N",
    "extraFolderIds": [
      "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOPUNI12-2K9"
  },
  "COURSE-ITEM-24": {
    "name": "NỀN TẢNG 12 MÔN SINH HỌC 2026 HOCMAI",
    "folderId": "1OOZzym1p9C-MrlY43ugcWxoMu2ej1sOi",
    "extraFolderIds": [
      "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOPUNI12-2K9"
  },
  "COURSE-ITEM-25": {
    "name": "TOÁN 11 2027 THẦY ĐỖ VĂN ĐỨC TENSCHOOL 2K10",
    "folderId": "1LkFNHipHxp2R3aUVVoC4uGMFxGsBXh1u",
    "extraFolderIds": [
      "1CbMUKPhYMX12UmVAfsQAkpe8KnciWSlP"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-TOAN11-2K10"
  },
  "COURSE-ITEM-26": {
    "name": "[S1+] Thầy Quân - Định hướng ôn thi TN THPT, ĐGNL, ĐGTD môn Toán cho học sinh lớp 11 - 2027 Tuyensinh247",
    "folderId": "1a1MHroAuK48kOyp_jhfqHc_yJc8pcFdU",
    "extraFolderIds": [
      "1CbMUKPhYMX12UmVAfsQAkpe8KnciWSlP"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-TOAN11-2K10"
  },
  "COURSE-ITEM-27": {
    "name": "LÝ 11 2027 THẦY VŨ HOÀNG QUÂN 2K10",
    "folderId": "1fYdD_xs_0PF63h0KBo384V0iqQ9cCs00",
    "extraFolderIds": [
      "134iDRuiFnuSlRFGC07o0qI8YC-1gMrIL"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-LY11-2K10"
  },
  "COURSE-ITEM-28": {
    "name": "Thầy Long - Cơ bản & Nâng cao Vật Lí 11 - 2027 Tuyensinh247",
    "folderId": "1pMs32OQ3J9N7R9MJ-cT9fI_CNwu2crzC",
    "extraFolderIds": [
      "134iDRuiFnuSlRFGC07o0qI8YC-1gMrIL"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-LY11-2K10"
  },
  "COURSE-ITEM-29": {
    "name": "[S+] Đề thi học kì Vật Lí 11 (Có lời giải chi tiết) - 2027 Tuyensinh247",
    "folderId": "1Xqa29h4pGAHp4RNs_i-YpRT_NkEuYzyO",
    "extraFolderIds": [
      "134iDRuiFnuSlRFGC07o0qI8YC-1gMrIL"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-LY11-2K10"
  },
  "COURSE-ITEM-30": {
    "name": "HOÁ 11 2027 LỚP TƯƠNG TÁC CÔ DƯƠNG, CÔ HUỆ HOCMAI 2K10",
    "folderId": "1IMhlEE-CyVyEd9nAn9bgkJMJpih1GZR3",
    "extraFolderIds": [
      "1CL2S35nzQS7qkXKck9c_efHX-aS87v-a"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-HOA11-2K10"
  },
  "COURSE-ITEM-31": {
    "name": "Thầy Tùng - Hóa 11 - Cơ bản và nâng cao - 2027 Tuyensinh247",
    "folderId": "1yqY8yEuScOXifRPqjuTvAC8yfvPa1XTP",
    "extraFolderIds": [
      "1CL2S35nzQS7qkXKck9c_efHX-aS87v-a"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-HOA11-2K10"
  },
  "COURSE-ITEM-32": {
    "name": "[S1] Thầy Phương, Cô Dung - Tin 11 - Tin học ứng dụng - 2027 Tuyensinh247",
    "folderId": "1dddCKyGFIG3o6NQokc8wMgS8fXArvvrt",
    "extraFolderIds": [
      "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-TIN11-2K10"
  },
  "COURSE-ITEM-33": {
    "name": "[S1] Thầy Phương, cô Dung - Tin 11 - Khoa học máy tính - 2027 Tuyensinh247",
    "folderId": "1niGfuKDA1xbAGI2lQpfDxic4s2H8fFip",
    "extraFolderIds": [
      "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-TIN11-2K10"
  },
  "COURSE-ITEM-34": {
    "name": "TIN HỌC VĂN PHÒNG",
    "folderId": "1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm",
    "extraFolderIds": [
      "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-TIN11-2K10"
  },
  "COURSE-ITEM-35": {
    "name": "HSA EMPIRE 2K9 LUYỆN THI ĐGNL HÀ NỘI 2027 - Khoá XPS",
    "folderId": "1oRf9iIynqglvPJhq0Jyf3ILL2lUVKEQy",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-DGNL-HSA",
    "parentSubjectId": "COURSE-ITEM-35"
  },
  "COURSE-ITEM-36": {
    "name": "HSA MAPSTUDY 2K9 LUYỆN THI ĐGNL HÀ NỘI 2027 - XPS 2K9 HSA 2027",
    "folderId": "1kNFMqYTAjNJNW3wl654OGvBdPzmgI_4R",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-DGNL-HSA",
    "parentSubjectId": "COURSE-ITEM-36"
  },
  "COURSE-ITEM-37": {
    "name": "HSA HOCMAI 2K9 LUYỆN THI ĐGNL HÀ NỘI 2027 - Giải pháp toàn diện HSA, Phòng luyện 2027",
    "folderId": "1OSx2MVNua6QDZhJpV4XXyOhdgdYU4hjY",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-DGNL-HSA",
    "parentSubjectId": "COURSE-ITEM-37"
  },
  "COURSE-ITEM-38": {
    "name": "HSA 2K9 HSA EDU 2027 - Khoá Tinh hoa HSA TH01",
    "folderId": "1iHYQQznkt6nt0IvvANe_tMzHUQ5pX9y-",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-DGNL-HSA",
    "parentSubjectId": "COURSE-ITEM-38"
  },
  "COURSE-ITEM-39": {
    "name": "TOPUNI NỀN TẢNG HOCMAI CÁC MÔN",
    "folderId": "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-DGNL-HSA",
    "parentSubjectId": "COURSE-ITEM-39"
  },
  "COURSE-ITEM-40": {
    "name": "TSA - LUYỆN THI ĐÁNH GIÁ TƯ DUY ĐH BÁCH KHOA HN EMPIRE 2K9 2027",
    "folderId": "1RPRK-NLUAudeC-65FF_nXbaOKG2aP_CJ",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-DGTD-TSA",
    "parentSubjectId": "COURSE-ITEM-40"
  },
  "COURSE-ITEM-41": {
    "name": "TSA BMC 2K9 LUYỆN THI ĐÁNH GIÁ TƯ DUY ĐHBK HÀ NỘI 2027 - XPS 2K9 TSA 2027",
    "folderId": "1H7u21HeGVXEajKcPM6jr1IHPtNYBIudN",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-DGTD-TSA",
    "parentSubjectId": "COURSE-ITEM-41"
  },
  "COURSE-ITEM-42": {
    "name": "TSA HOCMAI 2K9 LUYỆN THI ĐÁNH GIÁ TƯ DUY ĐHBK HÀ NỘI 2027 - Giải pháp toàn diện TSA, Phòng luyện 2027",
    "folderId": "1OURnZBMt6QGB4AXIaXu23QGQPrqb_5F3",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-DGTD-TSA",
    "parentSubjectId": "COURSE-ITEM-42"
  },
  "COURSE-ITEM-43": {
    "name": "TSA TUYENSINH247 2027 FULL LỘ TRÌNH SUN",
    "folderId": "1i9cK48wmHQFTPrLjnFheoHZ2Nto3tV2d",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-DGTD-TSA",
    "parentSubjectId": "COURSE-ITEM-43"
  },
  "COURSE-ITEM-44": {
    "name": "TSA BỔ TRỢ TSA - HSA - VACT TDMU 2027",
    "folderId": "10n24IGM9Xylx3TvSJycc9X1ax5BVx-KX",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-DGTD-TSA",
    "parentSubjectId": "COURSE-ITEM-44"
  },
  "COURSE-ITEM-45": {
    "name": "V-ACT 2K9 EMPIRE TEAM LUYỆN THI ĐGNL TP.HCM 2027 - XPS 2K9 V-ACT 2027",
    "folderId": "1bz7JkVDWOOk5bKKrRFwyZvwUH2Mb9zj2",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-DGNL-VACT",
    "parentSubjectId": "COURSE-ITEM-45"
  },
  "COURSE-ITEM-46": {
    "name": "V-ACT MAPSTUDY 2K9 LUYỆN THI ĐÁNH GIÁ NĂNG LỰC TP.HCM 2027 - XPS 2K9 V-ACT 2027",
    "folderId": "12c6aQKTlU3hiJcQD2ThFKbgWIkCzpqv6",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-DGNL-VACT",
    "parentSubjectId": "COURSE-ITEM-46"
  },
  "COURSE-ITEM-47": {
    "name": "V-ACT HOCMAI 2K9 LUYỆN THI ĐGNL TP.HCM 2027 - Giải pháp toàn diện V-ACT, Phòng luyện",
    "folderId": "1UQFg7cF1zuru0VMWqk4bn8XYd7gQnfIM",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-DGNL-VACT",
    "parentSubjectId": "COURSE-ITEM-47"
  },
  "COURSE-ITEM-48": {
    "name": "BCA - LUYỆN THI ĐÁNH GIÁ NĂNG LỰC BỘ CÔNG AN",
    "folderId": "1AhTkg3k1908Md2VmTeIWsrg2dZSJeLAK",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-BCA-QDA-VSAT",
    "parentSubjectId": "COURSE-ITEM-48"
  },
  "COURSE-ITEM-49": {
    "name": "QDA - LUYỆN THI ĐÁNH GIÁ NĂNG LỰC EMPIRE (QUÂN ĐỘI)",
    "folderId": "1jNymOlAbD1sdzjKk6ijFzW6ZkB-IgvhI",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-BCA-QDA-VSAT",
    "parentSubjectId": "COURSE-ITEM-49"
  },
  "COURSE-ITEM-50": {
    "name": "VSAT - LUYỆN THI ĐÁNH GIÁ NĂNG LỰC EMPIRE",
    "folderId": "1KhQ_bJA5IEjeWjS5fjrn8ZlA7u1p-xbc",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-BCA-QDA-VSAT",
    "parentSubjectId": "COURSE-ITEM-50"
  },
  "FULL-COMBO-399K": {
    "name": "FULL TẤT CẢ KHÓA HỌC 2K9 - 2K10 - ĐGNL (HSA, TSA, V-ACT, BCA, QDA, VSAT)",
    "folderId": "1_1RwRFjIYJO0BmmJEEqVV-4-GNOkLcNQ",
    "extraFolderIds": [
      "13CEmorojtCBFPxlqS3C3PSEhLKbsDMnC"
    ],
    "price": 399000,
    "tier": "full_399k",
    "parentCourseId": "ALL-COURSES-399K",
    "parentSubjectId": "ALL-COURSES-399K"
  },
  "HSA-01": {
    "name": "COMBO LUYỆN THI ĐGNL HSA — ĐHQG HÀ NỘI 2027 (EMPIRE · MAPSTUDY · HOCMAI · HSA EDU · TOPUNI)",
    "folderId": "1CvbLsIY32pyWJw-dxDRn-sNOeKLQvQD3",
    "extraFolderIds": [
      "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
    ],
    "price": 199000,
    "tier": "course_199k",
    "parentCourseId": "COURSE-DGNL-HSA",
    "parentSubjectId": "ITEM-HSA-EMPIRE"
  },
  "TSA-01": {
    "name": "COMBO LUYỆN THI ĐGTD TSA — ĐH BÁCH KHOA HÀ NỘI 2027 (EMPIRE · BMC · HOCMAI · TUYENSINH247 · TDMU)",
    "folderId": "1RhHC9PuPYfdIqrqhjsy-hN5XJvsjVRTv",
    "extraFolderIds": [],
    "price": 199000,
    "tier": "course_199k",
    "parentCourseId": "COURSE-DGTD-TSA",
    "parentSubjectId": "ITEM-TSA-EMPIRE"
  },
  "VACT-01": {
    "name": "COMBO LUYỆN THI ĐGNL V-ACT — ĐHQG TP.HCM 2027 (EMPIRE TEAM · MAPSTUDY · HOCMAI)",
    "folderId": "1VRgzIGt3u8c7mC9dMLLXd6QjsBInraXm",
    "extraFolderIds": [
      "1bz7JkVDWOOk5bKKrRFwyZvwUH2Mb9zj2",
      "12c6aQKTlU3hiJcQD2ThFKbgWIkCzpqv6",
      "1UQFg7cF1zuru0VMWqk4bn8XYd7gQnfIM"
    ],
    "price": 199000,
    "tier": "course_199k",
    "parentCourseId": "COURSE-DGNL-VACT",
    "parentSubjectId": "ITEM-VACT-EMPIRE"
  },
  "MAC-01": {
    "name": "TOPUNI NỀN TẢNG 12 HOCMAI — TRỌN BỘ 7 KHÓA CÁC MÔN (TOÁN · VĂN · ANH · LÝ · HÓA · SINH)",
    "folderId": "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOPUNI12-2K9"
  },
  "KT-01": {
    "name": "MÔN TOÁN 12 (2K9) — TRỌN BỘ 7 KHÓA THẦY ĐỖ VĂN ĐỨC, MAPSTUDY, NGUYỄN PHAN TIẾN, ANH SHIPPER, HOCMAI",
    "folderId": "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
  },
  "TCC-01": {
    "name": "MÔN TOÁN 12 (2K9) — TRỌN BỘ 7 KHÓA THẦY ĐỖ VĂN ĐỨC, MAPSTUDY, NGUYỄN PHAN TIẾN, ANH SHIPPER, HOCMAI",
    "folderId": "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
  },
  "LAW-01": {
    "name": "COMBO LUYỆN THI ĐGNL BỘ CÔNG AN (BCA) · QUÂN ĐỘI (QDA) · VSAT EMPIRE 2027",
    "folderId": "1VRgzIGt3u8c7mC9dMLLXd6QjsBInraXm",
    "extraFolderIds": [
      "1AhTkg3k1908Md2VmTeIWsrg2dZSJeLAK",
      "1jNymOlAbD1sdzjKk6ijFzW6ZkB-IgvhI",
      "1KhQ_bJA5IEjeWjS5fjrn8ZlA7u1p-xbc"
    ],
    "price": 199000,
    "tier": "course_199k",
    "parentCourseId": "COURSE-BCA-QDA-VSAT",
    "parentSubjectId": "ITEM-BCA-CONGAN"
  },
  "RES-01": {
    "name": "MÔN TIN HỌC 11 (2K10) — TRỌN BỘ TIN HỌC ỨNG DỤNG · KHOA HỌC MÁY TÍNH · TIN VĂN PHÒNG",
    "folderId": "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq",
    "extraFolderIds": [],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K10-LOP11",
    "parentSubjectId": "COURSE-SUBJ-TIN11-2K10"
  },
  "ENG-01": {
    "name": "MÔN TIẾNG ANH 12 (2K9) — CÔ MAI PHƯƠNG TRỌN BỘ LỘ TRÌNH PRO3M · PRO3MPLUS · VIP90 2027",
    "folderId": "1WlZvKRBm4CYRH7yohELZf0G1vcvSOwqe",
    "extraFolderIds": [
      "1W80wIVEKFn8KMxTzTkfWf-IktCwAtjfL"
    ],
    "price": 69000,
    "tier": "subject_69k",
    "parentCourseId": "COURSE-K9-LOP12",
    "parentSubjectId": "COURSE-SUBJ-ANH12-2K9"
  }
};

function expandUnlockedCourses(rawList) {
  var setMap = {};
  for (var i = 0; i < rawList.length; i++) {
    var s = String(rawList[i] || "").trim().toUpperCase();
    if (s) setMap[s] = true;
  }
  if (setMap["ALL-COURSES-399K"] || setMap["FULL-COMBO-399K"] || setMap["__ALL_COURSES_399K__"]) {
    setMap["ALL-COURSES-399K"] = true;
    setMap["__ALL_COURSES_399K__"] = true;
    for (var kAll in COURSE_DRIVE_MAP) {
      setMap[kAll] = true;
    }
    return Object.keys(setMap);
  }
  var currentKeys = Object.keys(setMap);
  for (var j = 0; j < currentKeys.length; j++) {
    var key = currentKeys[j];
    for (var cKey in COURSE_DRIVE_MAP) {
      var cMeta = COURSE_DRIVE_MAP[cKey];
      if (cMeta.parentCourseId === key || cMeta.parentSubjectId === key) {
        setMap[cKey] = true;
      }
    }
  }
  return Object.keys(setMap);
}

var _MEM_MASTER_SS = null;
function getMasterSpreadsheet() {
  if (_MEM_MASTER_SS) return _MEM_MASTER_SS;
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active && active.getId() === MASTER_SHEET_ID) {
      _MEM_MASTER_SS = active;
      return active;
    }
  } catch (e) {}
  _MEM_MASTER_SS = SpreadsheetApp.openById(MASTER_SHEET_ID);
  return _MEM_MASTER_SS;
}

function getScriptCacheSafe() {
  try { return CacheService.getScriptCache(); } catch (e) { return null; }
}

function escTgHtml(raw) {
  return String(raw === undefined || raw === null ? "" : raw)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function setOrderStatusCache(orderCode, payloadObj, ttlSec) {
  if (!orderCode || !payloadObj) return;
  var cache = getScriptCacheSafe();
  if (!cache) return;
  var cleanKey = "ORD_V7_" + String(orderCode).trim().toUpperCase();
  try {
    cache.put(cleanKey, JSON.stringify(payloadObj), ttlSec || 21600);
  } catch (e) {}
}

function getOrderStatusCache(orderCode) {
  if (!orderCode) return null;
  var cache = getScriptCacheSafe();
  if (!cache) return null;
  var cleanKey = "ORD_V7_" + String(orderCode).trim().toUpperCase();
  try {
    var raw = cache.get(cleanKey);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function invalidateProductsCache() {
  var cache = getScriptCacheSafe();
  if (!cache) return;
  try {
    cache.remove("PRODUCTS_META_V7");
    for (var c = 0; c < 6; c++) {
      cache.remove("PRODUCTS_CHUNK_V7_" + c);
    }
  } catch (e) {}
}

function putProductsCache(productsArr) {
  var cache = getScriptCacheSafe();
  if (!cache) return;
  try {
    var fullStr = JSON.stringify(productsArr || []);
    var chunkSize = 85000;
    var numChunks = Math.ceil(fullStr.length / chunkSize) || 1;
    if (numChunks > 6) return;
    for (var i = 0; i < numChunks; i++) {
      cache.put("PRODUCTS_CHUNK_V7_" + i, fullStr.substring(i * chunkSize, (i + 1) * chunkSize), 600);
    }
    cache.put("PRODUCTS_META_V7", String(numChunks), 600);
  } catch (e) {}
}

function getProductsCache() {
  var cache = getScriptCacheSafe();
  if (!cache) return null;
  try {
    var meta = cache.get("PRODUCTS_META_V7");
    if (!meta) return null;
    var n = parseInt(meta, 10) || 0;
    if (n <= 0) return null;
    var parts = [];
    for (var i = 0; i < n; i++) {
      var p = cache.get("PRODUCTS_CHUNK_V7_" + i);
      if (p === null) return null;
      parts.push(p);
    }
    return parts.join("");
  } catch (e) {
    return null;
  }
}

// Hàng đợi đồng bộ ngầm Hồ Sơ Khách Hàng sang 2 Sheet dự phòng (BANG_LUU_TRU & FOLDER_06) để phản hồi Web/App < 0.2s
function enqueueCustomerBackupMirror(cleanEmail, rowRecord) {
  if (!cleanEmail || !rowRecord) return;
  try {
    var props = PropertiesService.getScriptProperties();
    var rawQ = props.getProperty("PENDING_CUST_MIRROR_QUEUE_V7") || "{}";
    var qMap = {};
    try { qMap = JSON.parse(rawQ) || {}; } catch (eJ) { qMap = {}; }
    qMap[cleanEmail] = rowRecord;
    // Giữ tối đa 60 bản ghi trong hàng đợi mỗi phút
    var keys = Object.keys(qMap);
    if (keys.length > 60) {
      delete qMap[keys[0]];
    }
    props.setProperty("PENDING_CUST_MIRROR_QUEUE_V7", JSON.stringify(qMap));
  } catch (eQ) {}
}

function flushPendingCustomerMirrors() {
  var qMap = {};
  var props = null;
  try {
    props = PropertiesService.getScriptProperties();
    var rawQ = props.getProperty("PENDING_CUST_MIRROR_QUEUE_V7") || "";
    if (!rawQ || rawQ === "{}") return { flushed: 0 };
    qMap = JSON.parse(rawQ) || {};
  } catch (eReadQ) {
    return { flushed: 0 };
  }

  var emails = Object.keys(qMap);
  if (emails.length === 0) return { flushed: 0 };

  // Xóa hàng đợi ngay trước khi ghi để không nghẽn các giao dịch mới
  try { props.setProperty("PENDING_CUST_MIRROR_QUEUE_V7", "{}"); } catch (eClr) {}

  var syncToSecondarySheet = function(targetSheet) {
    if (!targetSheet) return;
    var data = targetSheet.getDataRange().getValues();
    var idxByEmail = {};
    for (var i = 1; i < data.length; i++) {
      var em = String(data[i][0] || "").trim().toLowerCase();
      if (em) idxByEmail[em] = i + 1;
    }
    for (var k = 0; k < emails.length; k++) {
      var eKey = emails[k];
      var rec = qMap[eKey];
      if (!rec || !rec.length) continue;
      if (idxByEmail[eKey]) {
        targetSheet.getRange(idxByEmail[eKey], 1, 1, rec.length).setValues([rec]);
      } else {
        targetSheet.appendRow(rec);
        idxByEmail[eKey] = targetSheet.getLastRow();
      }
    }
  };

  // 1. Ghi lô sang BANG_LUU_TRU
  if (BANG_LUU_TRU_ID) {
    try {
      var luuTruSs = SpreadsheetApp.openById(BANG_LUU_TRU_ID);
      var ltSheet = luuTruSs.getSheetByName("TaiKhoan_KhachHang");
      syncToSecondarySheet(ltSheet);
    } catch (eLt) {}
  }

  // 2. Ghi lô sang Sheet Khách Hàng trong Folder 06
  if (FOLDER_LUU_TRU_KHACH_ID) {
    try {
      var custDbId = props.getProperty("FOLDER_06_CUSTOMER_SHEET_ID") || "";
      var custSs = null;
      if (custDbId) {
        try { custSs = SpreadsheetApp.openById(custDbId); } catch (eOpen06) { custSs = null; }
      }
      if (!custSs) {
        var fld06 = DriveApp.getFolderById(FOLDER_LUU_TRU_KHACH_ID);
        var files06 = fld06.getFilesByType(MimeType.GOOGLE_SHEETS);
        if (files06.hasNext()) {
          var f06 = files06.next();
          custDbId = f06.getId();
          custSs = SpreadsheetApp.openById(custDbId);
          props.setProperty("FOLDER_06_CUSTOMER_SHEET_ID", custDbId);
        }
      }
      if (custSs) {
        var cSheet06 = custSs.getSheetByName("TaiKhoan_KhachHang") || custSs.getSheets()[0];
        syncToSecondarySheet(cSheet06);
      }
    } catch (e06) {}
  }

  return { flushed: emails.length };
}

// =========================================================================
// 1. HÀM KHỞI ĐỘNG HỆ THỐNG TỰ ĐỘNG (CHẠY 1 LẦN ĐỂ KÍCH HOẠT TRIGGER 1 PHÚT)
// =========================================================================
function setupHeThongTuDong() {
  var ss = getMasterSpreadsheet();

  var sheetConfig = [
    ["KhoTaiLieu",        ["Mã Tài Liệu (SKU)", "Tên Tài Liệu / Môn Học", "Giá Bán (VNĐ)", "ID File / Folder Google Drive", "Link Xem Nhanh (Click)", "Trạng Thái"]],
    ["Kho_BTL",           ["Mã BTL", "Tên Đề Tài Bài Tập Lớn", "Môn / Ngành", "Số Trang", "Giá Bán (VNĐ)", "Link File Xem Trước (3 Trang)", "ID File Full", "Trạng Thái"]],
    ["TaiKhoanNganHang",  ["Ngân Hàng", "Mã NH", "Số Tài Khoản", "Chủ Tài Khoản", "Cổng Tự Động", "Email Nhận Biến Động", "Người Duyệt", "SDT Zalo", "Trạng Thái"]],
    ["Lich_Su_GD",        ["Thời Gian", "Ngân Hàng", "Số Tài Khoản", "Loại GD", "Biến Động Số Tiền", "Nội Dung Chuyển Khoản"]],
    ["Don_De_Cuong",      ["Thời Gian", "Mã Đơn", "Loại Đơn", "Họ Tên", "Email Nhận Tài Liệu", "SĐT", "Mã SKU", "Tên Môn", "Số Tiền", "Ngân Hàng", "Trạng Thái", "Giao Mail", "STK Nhận"]],
    ["Don_BTL_DichVu",    ["Mã Đơn", "Họ Tên", "SĐT Zalo", "Email", "Trường / Khoa", "Đề Tài & Yêu Cầu", "Hạn Nộp (Deadline)", "Tổng Tiền", "Tiền Cọc", "TIỀN CÒN THIẾU", "ID File Drive", "Trạng Thái", "Giao Mail", "STK Nhận", "CTV Đảm Nhận"]],
    ["TaiKhoan_KhachHang",["Email", "Họ và Tên", "Số Điện Thoại", "Mật Khẩu (SHA256)", "Trạng Thái Xác Thực", "Khóa Học Đã Mở", "Tài Liệu Đã Mua", "Nguồn Đăng Ký", "Cập Nhật Cuối", "Device_ID_Lock (1 Máy)", "Thiết Bị Kích Hoạt"]]
  ];

  sheetConfig.forEach(function(cfg) {
    var s = ss.getSheetByName(cfg[0]);
    if (!s) {
      s = ss.insertSheet(cfg[0]);
      s.appendRow(cfg[1]);
      s.getRange(1, 1, 1, cfg[1].length).setFontWeight("bold").setBackground("#1e293b").setFontColor("#ffffff");
      s.setFrozenRows(1);
    }
  });

  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  ScriptApp.newTrigger("scanTatCa").timeBased().everyMinutes(1).create();

  try { scanBankEmailsAndDeliver(ss, false); } catch (eInitScan) {}
  try { kiemTraDonHoanThanh(ss); } catch (eInitBtl) {}
  try { flushPendingCustomerMirrors(); } catch (eFlushInit) {}
}

// =========================================================================
// 2. HÀM CHẠY TỰ ĐỘNG MỖI 1 PHÚT (QUÉT ACB + BÀN GIAO BTL + FLUSH KHÁCH HÀNG NGẦM)
// =========================================================================
function scanTatCa() {
  var ss = getMasterSpreadsheet();
  try { scanBankEmailsAndDeliver(ss, false); } catch (e) {}
  try { kiemTraDonHoanThanh(ss); } catch (e) {}
  try { flushPendingCustomerMirrors(); } catch (eFlush) {}
  try { pollTelegramUpdatesIfNeeded_(ss); } catch (eTgPoll) {}
  try {
    var props = PropertiesService.getScriptProperties();
    var lastSync = Number(props.getProperty("LAST_WAREHOUSE_SYNC_MS") || "0");
    var nowMs = new Date().getTime();
    if (nowMs - lastSync > 30 * 60 * 1000) {
      props.setProperty("LAST_WAREHOUSE_SYNC_MS", String(nowMs));
      dongBoKhoTaiLieu(ss);
      invalidateProductsCache();
    }
  } catch (eSync) {}
}

function checkBankEmailsAndNotify() {
  scanTatCa();
}

// =========================================================================
// 3. ĐỒNG BỘ TỰ ĐỘNG KHO ĐỀ CƯƠNG, KHO BTL & 6 KHÓA HỌC LÊN SHEET + WEB
// =========================================================================
var BRAND_SHEET_DVTL_ID = "15L_XgjCALBrBfhAs02YgAgoy6qP2BFi79_ZjaSSYagY";
var AUTO_SKU_SHEET_ID   = "1o4v2MyZolp5m9SLXARl-P3expi9o0Zgh6_vmhBEgUR8";

function boDau(str) {
  return String(str || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}

function chuanHoaTen(ten) {
  return String(ten || "")
    .replace(/\.(docx?|pdf|xlsx?|pptx?|txt|json)$/i, "")
    .replace(/^(bộ\s+)?đề\s+cương(\s+ôn\s+tập)?(\s+chi\s+tiết)?(\s+học\s+phần)?(\s+môn)?\s*[-–:]?\s*/i, "")
    .replace(/\s*[—\-–]\s*[A-Z0-9]{2,10}$/i, "")
    .replace(/\([A-Z0-9]{2,10}\)$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function taoSKU(tenFile, usedMap) {
  var ten = String(tenFile || "").replace(/\.(docx?|pdf|xlsx?|pptx?|txt)$/i, "");
  ten = ten.replace(/^(Bộ\s+)?(Đề Cương Ôn Tập|Đề Cương Chi Tiết|Đề Cương|Bài Tập Lớn|Khóa Học|Khoá Học)\s*[-–:]?\s*/i, "").trim();
  var words = ten.split(/[\s\-_]+/);
  var sku = "";
  for (var i = 0; i < words.length; i++) {
    if (words[i].length > 0) {
      var ch = boDau(words[i].charAt(0)).toUpperCase();
      if (/^\d/.test(words[i])) {
        sku += words[i];
      } else if (/[A-Z0-9]/.test(ch)) {
        sku += ch;
      }
    }
  }
  if (!sku) sku = "DC";
  var finalSku = sku;
  var counter = 2;
  while (usedMap && usedMap[finalSku]) {
    finalSku = sku + counter;
    counter++;
  }
  return finalSku;
}

function extractDriveId(rawStr) {
  var s = String(rawStr || "").trim();
  if (!s) return "";
  var m1 = s.match(/\/(?:file\/d|document\/d|spreadsheets\/d|presentation\/d|folders)\/([a-zA-Z0-9_-]{15,})/);
  if (m1 && m1[1]) return m1[1];
  var m2 = s.match(/[?&]id=([a-zA-Z0-9_-]{15,})/);
  if (m2 && m2[1]) return m2[1];
  if (/^[a-zA-Z0-9_-]{15,}$/.test(s)) return s;
  return s;
}

function phanNhomNganh(tenFile) {
  var t = String(tenFile || "").toLowerCase();
  var hotCores = ["triết học", "kinh tế chính trị", "chủ nghĩa xã hội", "tư tưởng hồ chí minh", "lịch sử đảng", "pháp luật đại cương", "toán cao cấp", "xác suất thống kê", "kinh tế vi mô", "kinh tế vĩ mô", "kinh tế lượng", "quản trị học", "marketing căn bản", "nguyên lý kế toán"];
  for (var h = 0; h < hotCores.length; h++) {
    if (t.indexOf(hotCores[h]) !== -1) return "Đại Cương & Cơ Sở Ngành Trọng Tâm";
  }
  if (/kế toán|kiểm toán|tài chính|ngân hàng|chứng khoán|bảo hiểm|tín dụng|thuế|thẩm định/.test(t)) {
    return "Tài Chính - Ngân Hàng - Kế Toán - Kiểm Toán";
  }
  if (/quản trị|kinh doanh|kinh tế|marketing|thương mại|thương hiệu|nhân lực|chất lượng|dự án|chuỗi cung ứng/.test(t)) {
    return "Kinh Tế - Quản Trị Kinh Doanh - Marketing";
  }
  if (/logistic|vận tải|ngoại thương|giao nhận|quốc tế|hàng hóa|hội nhập|châu á/.test(t)) {
    return "Logistics - Vận Tải - Kinh Tế Quốc Tế";
  }
  if (/web|sql|mạng máy tính|hệ thống thông tin|trí tuệ nhân tạo|đồ họa|tín hiệu số|công nghệ số|kỹ năng số|bảo trì hệ thống|tin học|lập trình/.test(t)) {
    return "Công Nghệ Thông Tin - Hệ Thống - Thiết Kế Web";
  }
  return "Luật - Tâm Lý Học - Sư Phạm - Khoa Học Xã Hội";
}

function isIgnoredSystemFile(fname) {
  var n = String(fname || "").trim();
  if (!n) return true;
  if (/\.(txt|json)$/i.test(n)) return true;
  if (n.indexOf("Danh Sách Đề Cương Kiểm Tra") !== -1 || n.indexOf("Danh_Sach_De_Cuong") !== -1) return true;
  if (n.indexOf("Danh Sách Bài Tập Lớn") !== -1 || n.indexOf("Danh_Sach_Bai_Tap_Lon") !== -1) return true;
  if (n.indexOf("BẢNG DANH SÁCH") !== -1 || n.indexOf("Lịch Sử File Kiểm Tra") !== -1) return true;
  return false;
}

function dongBoKhoTaiLieu(ss) {
  if (!ss || typeof ss.getSheetByName !== "function") {
    ss = getMasterSpreadsheet();
  }
  var newAddedList = [];
  var totalOutlines = 0;

  // --- A. ĐỒNG BỘ TAB KhoTaiLieu (Gồm Đề Cương + 6 Khóa Học) ---
  var kSheet = ss.getSheetByName("KhoTaiLieu");
  if (kSheet) {
    var kData = kSheet.getDataRange().getValues();
    var existingSkus = {};
    var existingIds = {};
    var existingNorms = {};

    // Xóa các dòng file hệ thống bị lẫn (VD: Danh Sách Đề Cương Kiểm Tra / DC_2684)
    for (var rDel = kData.length - 1; rDel >= 1; rDel--) {
      var rSkuDel = String(kData[rDel][0] || "").trim();
      var rNameDel = String(kData[rDel][1] || "").trim();
      if (isIgnoredSystemFile(rNameDel) || /^DC_\d{4}$/.test(rSkuDel)) {
        try { kSheet.deleteRow(rDel + 1); } catch (eDel) {}
      }
    }

    kData = kSheet.getDataRange().getValues();
    for (var i = 1; i < kData.length; i++) {
      var sku = String(kData[i][0] || "").trim().toUpperCase();
      var rawNameRow = String(kData[i][1] || "").trim();
      var fid = extractDriveId(kData[i][3] || kData[i][4]);
      if (sku) existingSkus[sku] = i + 1;
      if (fid) existingIds[fid] = i + 1;
      var normR = chuanHoaTen(rawNameRow);
      if (normR) existingNorms[normR] = i + 1;
      if (sku && sku.indexOf("COURSE-") !== 0 && sku !== "ALL-COURSES-399K") {
        totalOutlines++;
      }
    }

    // Quét cả File lẻ VÀ Thư mục con trong Folder 01_Danh_Sach_De_Cuong_Luu_Tru
    try {
      var folderDC = DriveApp.getFolderById(FOLDER_DE_CUONG_ID);
      var candidates = [];

      var filesDC = folderDC.getFiles();
      while (filesDC.hasNext()) {
        var f = filesDC.next();
        if (f.isTrashed() || isIgnoredSystemFile(f.getName())) continue;
        candidates.push({ id: f.getId(), name: f.getName(), url: f.getUrl(), isFolder: false });
      }

      var subFoldersDC = folderDC.getFolders();
      while (subFoldersDC.hasNext()) {
        var sf = subFoldersDC.next();
        if (sf.isTrashed() || isIgnoredSystemFile(sf.getName())) continue;
        candidates.push({ id: sf.getId(), name: sf.getName(), url: sf.getUrl(), isFolder: true });
      }

      for (var cIdx = 0; cIdx < candidates.length; cIdx++) {
        var item = candidates[cIdx];
        var fId = item.id;
        var fName = item.name;
        var fUrl = item.url;
        var normItem = chuanHoaTen(fName);

        if (!existingIds[fId] && !existingNorms[normItem]) {
          var cleanName = fName.replace(/\.(docx?|pdf|xlsx?|pptx?)$/i, "").trim();
          if (!/^(bộ\s+)?đề\s+cương/i.test(cleanName)) {
            cleanName = "Đề Cương " + cleanName;
          }
          var autoSku = taoSKU(cleanName, existingSkus);
          var groupName = phanNhomNganh(cleanName);
          var dispShort = cleanName.replace(/^(Bộ\s+)?Đề\s+Cương\s+/i, "").trim();
          if (item.isFolder && dispShort.indexOf("Bộ") === -1) dispShort += " (Full Bộ)";

          kSheet.appendRow([
            autoSku,
            fName,
            50000,
            fId,
            '=HYPERLINK("' + fUrl + '", "🔗 Click Mở: ' + dispShort.replace(/"/g, "") + '")',
            groupName + " • Ủy quyền: teamtccm@gmail.com"
          ]);

          existingSkus[autoSku] = true;
          existingIds[fId] = true;
          if (normItem) existingNorms[normItem] = true;
          totalOutlines++;

          // Gọi sang Kho Phụ (diepviengroup) để khóa tải/sao chép & ủy quyền tự động
          try {
            if (KHO_PHAT_FILE_WEBHOOK_URL && KHO_PHAT_FILE_WEBHOOK_URL.indexOf("https://") === 0) {
              UrlFetchApp.fetch(KHO_PHAT_FILE_WEBHOOK_URL, {
                method: "post",
                contentType: "application/json",
                payload: JSON.stringify({
                  secret: KHO_SECRET_KEY,
                  action: "lockAndDelegate",
                  fileId: fId
                }),
                muteHttpExceptions: true
              });
            }
          } catch (eLock) {}

          // Đồng bộ sang Bảng Điệp Viên Tài Liệu (Tab 📄 Đề Cương) & KHO_TAI_LIEU_AUTO_SKU
          try {
            var brandSs = SpreadsheetApp.openById(BRAND_SHEET_DVTL_ID);
            var dcTab = brandSs.getSheetByName("📄 Đề Cương");
            if (dcTab) {
              var nextStt = Math.max(1, dcTab.getLastRow() - 7);
              dcTab.appendRow([
                nextStt,
                '=HYPERLINK("' + fUrl + '", "' + dispShort.replace(/"/g, "") + '")',
                groupName,
                item.isFolder ? "📂 Thư mục Full Bộ" : "📄 File Đề Cương"
              ]);
            }
          } catch (eBrand) {}

          try {
            var autoSs = SpreadsheetApp.openById(AUTO_SKU_SHEET_ID);
            var autoTab = autoSs.getSheetByName("KhoTaiLieu") || autoSs.getSheets()[0];
            if (autoTab) {
              autoTab.appendRow([
                autoSku,
                fName,
                50000,
                fId,
                '=HYPERLINK("' + fUrl + '", "🔗 Click Mở: ' + dispShort.replace(/"/g, "") + '")',
                groupName + " • Ủy quyền: teamtccm@gmail.com"
              ]);
            }
          } catch (eAuto) {}

          newAddedList.push({
            sku: autoSku,
            name: cleanName,
            fileId: fId,
            url: fUrl,
            group: groupName
          });
        }
      }
    } catch (e) {}

    // Đảm bảo 6 Khóa Học + Gói ALL-COURSES-399K luôn có mặt trong KhoTaiLieu
    for (var cSku in COURSE_DRIVE_MAP) {
      if (!existingSkus[cSku]) {
        var cObj = COURSE_DRIVE_MAP[cSku];
        var fUrlCourse = "https://drive.google.com/drive/folders/" + cObj.folderId;
        kSheet.appendRow([
          cSku,
          cObj.name,
          cObj.price,
          cObj.folderId,
          '=HYPERLINK("' + fUrlCourse + '", "📂 Mở Folder Khóa Học (' + cSku + ')")',
          "CÓ SẴN (Khóa Học Drive)"
        ]);
        existingSkus[cSku] = true;
      }
    }
  }

  // --- B. ĐỒNG BỘ TAB Kho_BTL ---
  var bSheet = ss.getSheetByName("Kho_BTL");
  if (bSheet) {
    try {
      var folderFull = DriveApp.getFolderById(FOLDER_BTL_FULL_ID);
      var folderCheck = DriveApp.getFolderById(FOLDER_BTL_CHECK_ID);
      var checkMap = {};
      var fChecks = folderCheck.getFiles();
      while (fChecks.hasNext()) {
        var fc = fChecks.next();
        if (fc.isTrashed() || isIgnoredSystemFile(fc.getName())) continue;
        checkMap[chuanHoaTen(fc.getName())] = { id: fc.getId(), url: fc.getUrl() };
      }
      var bData = bSheet.getDataRange().getValues();
      var existBtlIds = {};
      for (var j = 1; j < bData.length; j++) {
        var bExistId = extractDriveId(bData[j][2] || bData[j][6]);
        if (bExistId) existBtlIds[bExistId] = true;
      }
      var fFulls = folderFull.getFiles();
      var btlIdx = bData.length;
      while (fFulls.hasNext()) {
        var ff = fFulls.next();
        if (ff.isTrashed() || isIgnoredSystemFile(ff.getName())) continue;
        var ffId = ff.getId();
        if (!existBtlIds[ffId]) {
          var cleanBtl = ff.getName().replace(/\.[^/.]+$/, "");
          var bSku = "BTL_" + String(btlIdx).padStart(3, "0");
          btlIdx++;
          var pv = checkMap[chuanHoaTen(cleanBtl)] || { id: "", url: "" };
          var linkFull = '=HYPERLINK("' + ff.getUrl() + '", "🔗 Click Mở BTL: ' + cleanBtl.substring(0, 40).replace(/"/g, "") + '")';
          var linkPreview = pv.url ? '=HYPERLINK("' + pv.url + '", "👁️ Xem Bản Check Trước")' : "";
          bSheet.appendRow([bSku, ff.getName(), ffId, linkFull, pv.id, linkPreview, "diepvientailieu@gmail.com • Ủy quyền: teamtccm@gmail.com"]);
          existBtlIds[ffId] = true;
        }
      }
    } catch (e) {}
  }

  // Không bắn thông báo đồng bộ kho vào Telegram (chỉ thông báo khi hoàn thành giao dịch và đã bàn giao cho khách)

  return {
    totalOutlines: totalOutlines,
    newAddedCount: newAddedList.length,
    newAdded: newAddedList
  };
}

// =========================================================================
// 4. QUÉT GMAIL BIẾN ĐỘNG SỐ DƯ NGÂN HÀNG ACB (teamtccm@gmail.com)
//    - Ghi nhận MỌI biến động số dư ACB vào Lich_Su_GD và báo Telegram -5515040883
//    - Khớp đơn PENDING tức thì (kể cả khi email ngân hàng về trước lúc tạo đơn)
//    - Tự động mở khóa Web + App, bàn giao Đề Cương ngay lập tức & tự động giao BTL đúng hạn
// =========================================================================
function scanBienDongSoDuEmail(ss) {
  return scanBankEmailsAndDeliver(ss, true);
}

function sanitizeCustomerPhone(rawPhone) {
  var s = String(rawPhone || "").replace(/^'/, "");
  s = s.replace(/\[(?:HW|WB):[^\]]*\]/gi, "").trim();
  if (s === "0000000000" || s === "0900000000") return "";
  return s;
}

function extractDeviceIdFromInputs(rawDeviceId, rawPhone) {
  var combined = String(rawDeviceId || "").trim() + " " + String(rawPhone || "").trim();
  var mWb = combined.match(/DVS-WB-[A-Za-z0-9_-]+/);
  if (mWb && mWb[0]) return mWb[0].trim();
  var mHwTag = combined.match(/\[HW:([^\[\]]+)\]/i);
  if (mHwTag && mHwTag[1]) return mHwTag[1].trim();
  var mWbTag = combined.match(/\[WB:([^\[\]]+)\]/i);
  if (mWbTag && mWbTag[1]) return mWbTag[1].trim();
  var cleanDev = String(rawDeviceId || "").replace(/\[(?:HW|WB):/gi, "").replace(/\]/g, "").trim();
  if (cleanDev && cleanDev.indexOf(" ") === -1) return cleanDev;
  return "";
}

function isOrderMatchedInText(orderCode, normCode, custName, orderAmt, parsedAmount, upperText, normText) {
  if (!orderCode) return false;
  if (upperText.indexOf(orderCode) !== -1) return true;
  if (normCode && normCode.length >= 5 && normText.indexOf(normCode) !== -1) return true;
  var coreCode = normCode.replace(/^(DC|DV|COC|BTL)/, "");
  if (coreCode.length >= 5 && normText.indexOf(coreCode) !== -1) return true;
  // Dự phòng khách chuyển khoản đúng số tiền qua QR nhưng ngân hàng cắt bớt mã đơn và giữ họ tên
  if (parsedAmount > 0 && orderAmt > 0 && parsedAmount === orderAmt && custName) {
    var cleanCust = boDau(custName).replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (cleanCust.length >= 6 && cleanCust !== "KHACHHANG" && cleanCust !== "SINHVIEN" && normText.indexOf(cleanCust) !== -1) {
      return true;
    }
  }
  return false;
}

function getSheetByAliases_(ss, aliases) {
  for (var i = 0; i < aliases.length; i++) {
    var sh = ss.getSheetByName(aliases[i]);
    if (sh) return sh;
  }
  return null;
}

function buildBtlRemainCode_(orderCode) {
  var c = String(orderCode || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!c) return "";
  if (c.indexOf("COC") === 0) return "TT" + c.substring(3);
  if (c.indexOf("TT") === 0) return c;
  return "TT" + c;
}

function buildBtlRemainQrUrl_(bankNo, remainAmt, remainCode) {
  var amt = Number(remainAmt || 0) || 0;
  if (amt <= 0 || !remainCode) return "";
  var acct = String(bankNo || "27820961").trim() || "27820961";
  // qr.sepay.vn trả về ảnh PNG thực thụ (image/png), tương thích 100% với cả =IMAGE() Google Sheet và Telegram sendPhoto
  return "https://qr.sepay.vn/img?acc=" + encodeURIComponent(acct) + "&bank=ACB&amount=" + amt + "&des=" + encodeURIComponent(remainCode) + "&template=compact";
}

var BTL_REQ_FOLDER_ID = "1ikdPiPJN22LSnOEVHzFulmf6Stm7gq_A"; // 06. File Yêu Cầu BTL Khách Gửi

function getOrCreateBtlReqFolder_() {
  try { return DriveApp.getFolderById(BTL_REQ_FOLDER_ID); } catch (e) {}
  var props = PropertiesService.getScriptProperties();
  var cachedId = props.getProperty("BTL_REQ_FOLDER_ID");
  if (cachedId) {
    try { return DriveApp.getFolderById(cachedId); } catch (e2) {}
  }
  var it = DriveApp.getFoldersByName("06. File Yêu Cầu BTL Khách Gửi");
  if (it.hasNext()) return it.next();
  var itOld = DriveApp.getFoldersByName("05. File Yêu Cầu BTL Khách Gửi");
  var folder = itOld.hasNext() ? itOld.next() : DriveApp.createFolder("06. File Yêu Cầu BTL Khách Gửi");
  try { props.setProperty("BTL_REQ_FOLDER_ID", folder.getId()); } catch (eP) {}
  return folder;
}

function saveBtlRequirementFilesToDrive_(orderCode, custName, attachments) {
  if (!attachments || !attachments.length) return "";
  try {
    var rootFolder = getOrCreateBtlReqFolder_();
    var cleanCust = String(custName || "Khach").replace(/[\\/:*?"<>|]/g, " ").trim().slice(0, 35);
    var savedLinks = [];
    var targetFolder = rootFolder;
    if (attachments.length > 1) {
      targetFolder = rootFolder.createFolder(orderCode + " - " + cleanCust);
    }
    for (var i = 0; i < attachments.length; i++) {
      var att = attachments[i];
      if (!att || !att.base64) continue;
      var rawB64 = String(att.base64);
      var commaIdx = rawB64.indexOf(",");
      if (commaIdx !== -1) rawB64 = rawB64.substring(commaIdx + 1);
      var bytes = Utilities.base64Decode(rawB64);
      var fname = orderCode + "_" + String(att.name || ("yeu_cau_" + (i + 1))).replace(/[\\/:*?"<>|]/g, "_");
      var blob = Utilities.newBlob(bytes, att.mimeType || "application/octet-stream", fname);
      var file = targetFolder.createFile(blob);
      try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (eSh) {}
      savedLinks.push(file.getUrl());
    }
    if (attachments.length > 1 && savedLinks.length > 0) {
      try { targetFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (eSh2) {}
      return targetFolder.getUrl();
    }
    return savedLinks[0] || "";
  } catch (eSave) {
    return "";
  }
}

function scanBankEmailsAndDeliver(ss, fastMode) {
  if (!ss || typeof ss.getSheetByName !== "function") {
    ss = getMasterSpreadsheet();
    fastMode = false;
  }
  var oSheet = getSheetByAliases_(ss, ["Don_De_Cuong", "Đơn Hàng Đề Cương"]);
  var btlSheet = getSheetByAliases_(ss, ["Don_BTL_DichVu", "Đơn Hàng Bài Tập Lớn"]);
  var gdSheet = getSheetByAliases_(ss, ["Lich_Su_GD", "Lịch Sử Giao Dịch ACB"]);
  if (!gdSheet) return;

  // 1. Lấy danh sách các mã Message ID đã xử lý trong Lich_Su_GD
  //    Lưu ý quan trọng: Nếu dòng trong Lich_Su_GD mới chỉ là "BIẾN ĐỘNG SỐ DƯ (+)" (chưa gắn đơn),
  //    ta giữ lại trong unmatchedGdRows để đối soát lại với các đơn vừa tạo trễ vài giây!
  var gdData = gdSheet.getDataRange().getValues();
  var processedMsgIds = {};
  var unmatchedGdRows = [];
  for (var g = 1; g < gdData.length; g++) {
    var gdType = String(gdData[g][3] || "").trim().toUpperCase();
    var gdAmt = Number(String(gdData[g][4] || "0").replace(/[^0-9]/g, "")) || 0;
    var memoStr = String(gdData[g][5] || "");
    var mMatch = memoStr.match(/\[MSG:([a-zA-Z0-9]+)\]/);
    var msgIdVal = (mMatch && mMatch[1]) ? mMatch[1] : "";
    if (gdType.indexOf("BIẾN ĐỘNG SỐ DƯ") !== -1 && memoStr.indexOf("[Đơn:") === -1 && memoStr.indexOf("[Cọc BTL:") === -1) {
      unmatchedGdRows.push({
        row: g + 1,
        timeStr: String(gdData[g][0] || ""),
        amount: gdAmt,
        memo: memoStr,
        upperMemo: memoStr.toUpperCase(),
        normMemo: memoStr.toUpperCase().replace(/[^A-Z0-9]/g, ""),
        msgId: msgIdVal
      });
    } else if (msgIdVal) {
      processedMsgIds[msgIdVal] = true;
    }
  }

  // 2. Lấy danh sách đơn đang PENDING trong Don_De_Cuong (Hỗ trợ cả dòng 13-14 cột và 12 cột)
  var pendingOrders = [];
  if (oSheet) {
    var oData = oSheet.getDataRange().getValues();
    for (var i = 1; i < oData.length; i++) {
      var r = oData[i];
      var code = String(r[1] || "").trim().toUpperCase();
      if (!code) continue;
      var is13Col = (r.length >= 11 && (String(r[4] || "").indexOf("@") !== -1 || ["Mua File", "Mua Đề Cương", "Khóa Học"].indexOf(String(r[2] || "")) !== -1));
      var status = String(is13Col ? r[10] : r[8] || "").trim().toUpperCase();
      if (status === "PENDING") {
        var rawPh = String(is13Col ? r[5] : r[4] || "");
        pendingOrders.push({
          row: i + 1,
          is13Col: is13Col,
          code: code,
          normCode: code.replace(/[^A-Z0-9]/g, ""),
          type: is13Col ? String(r[2] || "Mua Đề Cương") : "Mua Đề Cương",
          name: String(is13Col ? r[3] : r[2] || "Khách Hàng").trim(),
          email: String(is13Col ? r[4] : r[3] || "").trim().toLowerCase(),
          phone: sanitizeCustomerPhone(rawPh),
          deviceId: extractDeviceIdFromInputs("", rawPh),
          sku: String(is13Col ? r[6] : r[5] || "").trim(),
          itemName: String(is13Col ? r[7] : r[6] || "").trim(),
          amount: Number(String(is13Col ? r[8] : r[7] || "0").replace(/[^0-9]/g, "")) || 50000,
          driveId: is13Col && r.length >= 14 ? String(r[13] || "").trim() : ""
        });
      }
    }
  }

  // 3. Lấy danh sách đơn BTL đang CHỜ CỌC và ĐÃ CỌC (chờ thu phần còn lại)
  var pendingBtl = [];
  var awaitingFinalBtl = [];
  if (btlSheet) {
    var btlData = btlSheet.getDataRange().getValues();
    for (var b = 1; b < btlData.length; b++) {
      var br = btlData[b];
      var bCode = String(br[0] || "").trim().toUpperCase();
      var bStatus = String(br[11] || "").trim().toUpperCase();
      if (!bCode) continue;
      var cocCode = bCode.indexOf("COC") === 0 ? bCode : ("COC" + bCode.replace(/^DAT_/, ""));
      var remainCode = (br.length >= 17 && String(br[16] || "").trim())
        ? String(br[16] || "").trim().toUpperCase()
        : buildBtlRemainCode_(bCode);
      var rawBtlPhone = String(br[2] || "");
      var bTotalEst = Number(String(br[7] || "500000").replace(/[^0-9]/g, "")) || 500000;
      var bDeposit = Number(String(br[8] || "50000").replace(/[^0-9]/g, "")) || 50000;
      var bRemainAmt = Number(String(br[9] || "0").replace(/[^0-9]/g, "")) || Math.max(0, bTotalEst - bDeposit);
      var bObj = {
        row: b + 1,
        code: bCode,
        normCode: bCode.replace(/[^A-Z0-9]/g, ""),
        cocCode: cocCode,
        normCocCode: cocCode.replace(/[^A-Z0-9]/g, ""),
        remainCode: remainCode,
        normRemainCode: remainCode.replace(/[^A-Z0-9]/g, ""),
        name: String(br[1] || "Khách Hàng").trim(),
        phone: sanitizeCustomerPhone(rawBtlPhone),
        deviceId: extractDeviceIdFromInputs("", rawBtlPhone),
        email: String(br[3] || "").trim().toLowerCase(),
        school: String(br[4] || "").trim(),
        topic: String(br[5] || "").trim(),
        deadline: br[6],
        totalEst: bTotalEst,
        deposit: bDeposit,
        remainAmt: bRemainAmt,
        fileId: String(br[10] || "").trim(),
        reqFileUrl: br.length >= 16 ? String(br[15] || "").trim() : ""
      };
      if (bStatus.indexOf("CHỜ CỌC") !== -1 || bStatus.indexOf("CHỜ ĐẶT CỌC") !== -1 || bStatus === "PENDING" || bStatus.indexOf("CHỜ BÁO GIÁ") !== -1) {
        pendingBtl.push(bObj);
      } else if ((bStatus === "ĐÃ CỌC" || bStatus === "ĐANG LÀM" || bStatus.indexOf("CHỜ THANH TOÁN") !== -1) && bRemainAmt > 0) {
        awaitingFinalBtl.push(bObj);
      }
    }
  }

  // 3B. ĐỐI SOÁT NGƯỢC CÁC DÒNG "BIẾN ĐỘNG SỐ DƯ (+)" TRONG Lich_Su_GD (Cứu các đơn tạo trễ vài giây sau khi ngân hàng báo tiền về)
  for (var u = 0; u < unmatchedGdRows.length; u++) {
    var uRow = unmatchedGdRows[u];
    var uMatched = false;

    for (var po = 0; po < pendingOrders.length; po++) {
      var ord = pendingOrders[po];
      if (ord.matched) continue;
      if (isOrderMatchedInText(ord.code, ord.normCode, ord.name, ord.amount, uRow.amount, uRow.upperMemo, uRow.normMemo)) {
        var uAmtOk = (uRow.amount === 0) || (uRow.amount >= ord.amount);
        if (uAmtOk) {
          ord.matched = true;
          uMatched = true;
          var actAmt = uRow.amount > 0 ? uRow.amount : ord.amount;
          hoanTatDonDeCuongHoacKhoaHoc(ss, oSheet, ord, actAmt, uRow.memo, uRow.msgId, gdSheet, uRow.row);
          if (uRow.msgId) processedMsgIds[uRow.msgId] = true;
          break;
        }
      }
    }

    if (!uMatched) {
      for (var pb = 0; pb < pendingBtl.length; pb++) {
        var bOrd = pendingBtl[pb];
        if (bOrd.matched) continue;
        var bMatch = (
          uRow.upperMemo.indexOf(bOrd.code) !== -1 ||
          uRow.upperMemo.indexOf(bOrd.cocCode) !== -1 ||
          (bOrd.normCode.length >= 5 && uRow.normMemo.indexOf(bOrd.normCode) !== -1) ||
          (bOrd.normCocCode.length >= 5 && uRow.normMemo.indexOf(bOrd.normCocCode) !== -1)
        );
        if (bMatch) {
          bOrd.matched = true;
          uMatched = true;
          var bActAmt = uRow.amount > 0 ? uRow.amount : bOrd.deposit;
          hoanTatDonCocBtl(ss, btlSheet, bOrd, bActAmt, uRow.memo, uRow.msgId, gdSheet, uRow.row);
          if (uRow.msgId) processedMsgIds[uRow.msgId] = true;
          break;
        }
      }
    }
  }

  // 4. Tìm kiếm email biến động số dư từ Ngân hàng ACB (mailalert@acb.com.vn), SePay, Casso
  var query = fastMode
    ? '(from:mailalert@acb.com.vn OR from:acb.com.vn OR "27820961" OR "TRINH DUC THINH" OR "27820961" OR "TRINH DUC THINH" OR "27820961" OR "TRINH DUC THINH" OR "27384751" OR from:sepay.vn OR from:casso.vn) newer_than:2d'
    : '(from:mailalert@acb.com.vn OR from:acb.com.vn OR "27820961" OR "TRINH DUC THINH" OR "27820961" OR "TRINH DUC THINH" OR "27820961" OR "TRINH DUC THINH" OR "27384751" OR from:sepay.vn OR from:casso.vn) newer_than:14d';
  var maxThreads = fastMode ? 6 : 25;
  var threads = GmailApp.search(query, 0, maxThreads);

  for (var t = threads.length - 1; t >= 0; t--) {
    var msgs = threads[t].getMessages();
    for (var m = 0; m < msgs.length; m++) {
      var msg = msgs[m];
      var msgId = msg.getId();
      if (processedMsgIds[msgId]) continue;

      var subject = msg.getSubject() || "";
      var plainBody = msg.getPlainBody() || "";
      var htmlBody = msg.getBody() || "";
      var cleanHtmlText = htmlBody.replace(/<style[\s\S]*?<\/style>/gi, " ")
                                  .replace(/<script[\s\S]*?<\/script>/gi, " ")
                                  .replace(/<[^>]+>/g, " ")
                                  .replace(/&nbsp;/gi, " ")
                                  .replace(/\s+/g, " ")
                                  .trim();
      var fullText = (subject + " " + plainBody + " " + cleanHtmlText);
      var upperBody = fullText.toUpperCase();
      var normUpperBody = upperBody.replace(/[^A-Z0-9]/g, "");

      var isAcbAlert = (upperBody.indexOf("27820961") !== -1 ||
                        upperBody.indexOf("ACB") !== -1 ||
                        upperBody.indexOf("GHI CO") !== -1 ||
                        upperBody.indexOf("GHI CÓ") !== -1 ||
                        upperBody.indexOf("GD:") !== -1 ||
                        upperBody.indexOf("+") !== -1);
      if (!isAcbAlert) continue;

      var parsedAmount = extractAcbAmount(fullText);
      var parsedMemo = extractAcbMemo(fullText, subject);
      var msgTimeStr = Utilities.formatDate(msg.getDate(), "GMT+7", "yyyy-MM-dd HH:mm:ss");

      var existingUnmatchedRowNum = 0;
      for (var eu = 0; eu < unmatchedGdRows.length; eu++) {
        if (unmatchedGdRows[eu].msgId === msgId) {
          existingUnmatchedRowNum = unmatchedGdRows[eu].row;
          break;
        }
      }

      var matchedAnyOrder = false;

      // 4A. Kiểm tra khớp với đơn Đề Cương / Khóa Học đang PENDING
      for (var p = 0; p < pendingOrders.length; p++) {
        var order = pendingOrders[p];
        if (order.matched) continue;

        if (isOrderMatchedInText(order.code, order.normCode, order.name, order.amount, parsedAmount, upperBody, normUpperBody)) {
          var amountOk = (parsedAmount === 0) || (parsedAmount >= order.amount);
          if (amountOk) {
            order.matched = true;
            matchedAnyOrder = true;
            var actualAmt = parsedAmount > 0 ? parsedAmount : order.amount;
            hoanTatDonDeCuongHoacKhoaHoc(ss, oSheet, order, actualAmt, parsedMemo, msgId, gdSheet, existingUnmatchedRowNum, msgTimeStr);
            processedMsgIds[msgId] = true;
          }
        }
      }

      // 4B. Kiểm tra khớp với đơn Đặt Cọc BTL đang CHỜ CỌC
      if (!matchedAnyOrder) {
        for (var bIdx = 0; bIdx < pendingBtl.length; bIdx++) {
          var bOrder = pendingBtl[bIdx];
          if (bOrder.matched) continue;
          var isBtlMatch = (
            isOrderMatchedInText(bOrder.code, bOrder.normCode, bOrder.name, bOrder.deposit, parsedAmount, upperBody, normUpperBody) ||
            isOrderMatchedInText(bOrder.cocCode, bOrder.normCocCode, bOrder.name, bOrder.deposit, parsedAmount, upperBody, normUpperBody)
          );
          if (isBtlMatch) {
            bOrder.matched = true;
            matchedAnyOrder = true;
            var bActualAmt = parsedAmount > 0 ? parsedAmount : bOrder.deposit;
            hoanTatDonCocBtl(ss, btlSheet, bOrder, bActualAmt, parsedMemo, msgId, gdSheet, existingUnmatchedRowNum, msgTimeStr);
            processedMsgIds[msgId] = true;
          }
        }
      }

      // 4B-2. Kiểm tra khớp với đơn BTL ĐÃ CỌC đang chờ thu PHẦN CÒN LẠI (TTBTL...)
      if (!matchedAnyOrder) {
        for (var fbIdx = 0; fbIdx < awaitingFinalBtl.length; fbIdx++) {
          var fOrder = awaitingFinalBtl[fbIdx];
          if (fOrder.matched) continue;
          var isFinalMatch = isOrderMatchedInText(fOrder.remainCode, fOrder.normRemainCode, fOrder.name, fOrder.remainAmt, parsedAmount, upperBody, normUpperBody);
          if (isFinalMatch && (parsedAmount === 0 || parsedAmount >= fOrder.remainAmt)) {
            fOrder.matched = true;
            matchedAnyOrder = true;
            var fActualAmt = parsedAmount > 0 ? parsedAmount : fOrder.remainAmt;
            hoanTatThanhToanDuBtl(ss, btlSheet, fOrder, fActualAmt, parsedMemo, msgId, gdSheet, existingUnmatchedRowNum, msgTimeStr);
            processedMsgIds[msgId] = true;
          }
        }
      }

      // 4C. Nếu tiền về STK 27820961 nhưng khách quên ghi mã đơn / sai cú pháp -> Lưu Lịch Sử Giao Dịch ACB VÀ BÁO NGAY TELEGRAM!
      if (!matchedAnyOrder && !existingUnmatchedRowNum) {
        var gdSheetName = gdSheet.getName();
        if (gdSheetName === "Lịch Sử Giao Dịch ACB") {
          gdSheet.appendRow([
            msgTimeStr,
            "ACB",
            "27820961",
            "BIẾN ĐỘNG SỐ DƯ (+)",
            parsedAmount > 0 ? parsedAmount : "Biến động ACB",
            parsedMemo + " [MSG:" + msgId + "]",
            "",
            "Chưa khớp mã đơn",
            "Email ACB (27820961)"
          ]);
        } else {
          gdSheet.appendRow([
            msgTimeStr,
            "ACB",
            "27820961",
            "BIẾN ĐỘNG SỐ DƯ (+)",
            parsedAmount > 0 ? parsedAmount : "Biến động ACB",
            parsedMemo + " [MSG:" + msgId + "]"
          ]);
          try {
            var mAcbUnm = ss.getSheetByName("Lịch Sử Giao Dịch ACB");
            if (mAcbUnm) mAcbUnm.appendRow([msgTimeStr, "ACB", "27820961", "BIẾN ĐỘNG SỐ DƯ (+)", parsedAmount > 0 ? parsedAmount : "Biến động ACB", parsedMemo + " [MSG:" + msgId + "]", "", "Chưa khớp mã đơn", "Email ACB (27820961)"]);
          } catch (eMuAcb) {}
        }
        processedMsgIds[msgId] = true;

        if (parsedAmount > 0) {
          try {
            var propsUnm = PropertiesService.getScriptProperties();
            var unmKey = "TG_ACB_UNM_" + msgId;
            if (!propsUnm.getProperty(unmKey)) {
              propsUnm.setProperty(unmKey, String(new Date().getTime()));
              banTelegram(
                "💰 <b>[BIẾN ĐỘNG SỐ DƯ ACB — CẦN ĐỐI SOÁT]</b>\n" +
                "━━━━━━━━━━━━━━━━━━\n" +
                "🏦 Tài khoản: <code>27820961</code> (ACB)\n" +
                "💵 Số tiền nhận: <b>+" + parsedAmount.toLocaleString("vi-VN") + " VNĐ</b>\n" +
                "🕒 Thời gian: <code>" + escTgHtml(msgTimeStr) + "</code>\n" +
                "📝 Nội dung CK: <code>" + escTgHtml(String(parsedMemo || "").slice(0, 180)) + "</code>\n" +
                "⚠️ <i>Chưa khớp mã đơn tự động trên Sheet (khách có thể chuyển khoản trực tiếp hoặc ghi thiếu mã đơn).</i>",
                {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        { text: "✍️ Xem BTL Chờ Cọc", callback_data: "tg_tab:btl_pending:0" },
                        { text: "🔨 BTL Đã Cọc & Thu Nốt", callback_data: "tg_tab:btl_active:0" }
                      ],
                      [{ text: "🎛️ Mở Trạm Điều Khiển", callback_data: "tg_tab:menu:0" }]
                    ]
                  }
                }
              );
            }
          } catch (eTgUnm) {}
        }
      }
    }
  }

  // Ghi dấu thời điểm vừa quét Gmail xong để các lượt poll liên tiếp trong 6 giây phản hồi tức thì (< 0.06s)
  var scanCache = getScriptCacheSafe();
  if (scanCache) {
    try { scanCache.put("LAST_GMAIL_SCAN_TS_V7", String(new Date().getTime()), 60); } catch (eTs) {}
  }

  if (!fastMode) {
    try { kiemTraDonHoanThanh(ss); } catch (eBtlAfter) {}
    try { kiemTraVaGuiBaoCaoCuoiThang(ss); } catch (eMonthlyRev) {}
  }
}

function hoanTatDonDeCuongHoacKhoaHoc(ss, oSheet, order, actualAmt, parsedMemo, msgId, gdSheet, existingGdRow, msgTimeStr) {
  if (order.is13Col) {
    oSheet.getRange(order.row, 11).setValue("PAID_SUCCESS");
  } else {
    oSheet.getRange(order.row, 9).setValue("PAID_SUCCESS");
  }

  var product = timSanPham(ss, order.sku, order.itemName, actualAmt, order.driveId);
  var deliveredOk = giaoTaiLieuTuKhoPhu(order.email, order.name, order.code, product, actualAmt, order.type);
  var deliveryNote = deliveredOk ? "diepvientailieu@gmail.com ĐÃ GIAO" : "Đã mở khóa (Chờ cấp Drive)";
  if (order.is13Col) {
    oSheet.getRange(order.row, 12).setValue(deliveryNote);
    if (product && product.fileId) {
      try { oSheet.getRange(order.row, 14).setValue(product.fileId); } catch (eCol14) {}
    }
  } else {
    oSheet.getRange(order.row, 10).setValue(deliveryNote);
  }

  capNhatTaiKhoanKhachHang(ss, order.email, order.name, order.phone, product.sku || order.sku, actualAmt, order.deviceId || "", "");

  var checkSkuDone = String((product && product.sku) ? product.sku : order.sku).toUpperCase();
  if (actualAmt >= 399000) checkSkuDone = "ALL-COURSES-399K";
  var unlockedDone = [];
  if (checkSkuDone.indexOf("COURSE-") === 0 || checkSkuDone.indexOf("SUBJ-") === 0 || checkSkuDone === "ALL-COURSES-399K" || COURSE_DRIVE_MAP[checkSkuDone]) {
    unlockedDone = expandUnlockedCourses([checkSkuDone]);
  }

  // Lưu ngay kết quả PAID_SUCCESS vào RAM Cache để Web/App poll phát hiện trong 0.05s!
  setOrderStatusCache(order.code, {
    ok: true,
    orderCode: order.code,
    status: "PAID_SUCCESS",
    paid: true,
    verified: true,
    email: order.email,
    sku: (product && product.sku) ? product.sku : order.sku,
    itemName: (product && product.name) ? product.name : order.itemName,
    driveUrl: product ? product.link : "",
    unlockedCourses: unlockedDone
  }, 21600);

  var cleanMemo = String(parsedMemo || "").replace(/\s*\[MSG:[^\]]+\]/g, "").trim();
  var fullMemoLog = cleanMemo + " [Đơn: " + order.code + " | " + order.email + "]" + (msgId ? (" [MSG:" + msgId + "]") : "");
  if (existingGdRow && existingGdRow > 1) {
    gdSheet.getRange(existingGdRow, 4, 1, 3).setValues([["NHẬN TIỀN ĐƠN " + order.code, actualAmt, fullMemoLog]]);
  } else {
    gdSheet.appendRow([
      msgTimeStr || Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss"),
      "ACB",
      "27820961",
      "NHẬN TIỀN ĐƠN " + order.code,
      actualAmt,
      fullMemoLog
    ]);
  }
  // Đồng bộ trực tiếp lên Tab Tiếng Việt trên Sheet Tổng
  try {
    var tTime = msgTimeStr || Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");
    var mAcbTab = ss.getSheetByName("Lịch Sử Giao Dịch ACB");
    if (mAcbTab) mAcbTab.appendRow([tTime, "ACB", "27820961", "Nhận tiền đơn " + order.code, actualAmt, fullMemoLog, "", "Đã khớp đơn & bàn giao", "Thông báo ACB (27820961)"]);
    ["Đơn Hàng Đề Cương", "Đơn Hàng Khóa Học"].forEach(function(tName) {
      var mOrdTab = ss.getSheetByName(tName);
      if (!mOrdTab) return;
      var mRows = mOrdTab.getDataRange().getValues();
      for (var rIdx = mRows.length - 1; rIdx >= 1; rIdx--) {
        if (String(mRows[rIdx][1] || "").trim().toUpperCase() === order.code) {
          mOrdTab.getRange(rIdx + 1, 12, 1, 2).setValues([["Đã thanh toán", deliveryNote]]);
          break;
        }
      }
    });
  } catch (eMirrorPaid) {}

  try {
    var propsTg = PropertiesService.getScriptProperties();
    var tgKey = "TG_DONE_" + order.code;
    if (!propsTg.getProperty(tgKey)) {
      propsTg.setProperty(tgKey, String(new Date().getTime()));
      banTelegram(
        "✅ <b>[HOÀN THÀNH GIAO DỊCH &amp; ĐÃ BÀN GIAO TỰ ĐỘNG]</b>\n" +
        "━━━━━━━━━━━━━━━━━━\n" +
        "🆔 Mã đơn: <code>" + escTgHtml(order.code) + "</code> (" + escTgHtml(order.type || "Mua File") + ")\n" +
        "👤 Khách hàng: <b>" + escTgHtml(order.name) + "</b>" + (order.phone ? (" · 📞 <code>" + escTgHtml(order.phone) + "</code>") : "") + "\n" +
        "📧 Email nhận file: <code>" + escTgHtml(order.email || "Chưa nhập") + "</code>\n" +
        "📚 Sản phẩm: <b>" + escTgHtml(product.name) + "</b> (<code>" + escTgHtml(product.sku || order.sku) + "</code>)\n" +
        "🔗 Link Google Drive: " + escTgHtml(product.link || "") + "\n" +
        "💰 Số tiền nhận: <b>+" + actualAmt.toLocaleString("vi-VN") + " VNĐ</b>\n" +
        "📝 Nội dung CK: <code>" + escTgHtml(cleanMemo) + "</code>\n" +
        "🚀 <b>Trạng thái: Đã cấp quyền Google Drive &amp; Gửi Email bàn giao thành công!</b>",
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "👤 Xem Hồ Sơ Khách", callback_data: "tg_cust:" + String(order.email || order.phone || "").slice(0, 52) },
                { text: "📊 Tổng Quan Hệ Thống", callback_data: "tg_tab:overview:0" }
              ]
            ]
          }
        }
      );
    }
  } catch (eTgDone) {}
}

function hoanTatDonCocBtl(ss, btlSheet, bOrder, bActualAmt, parsedMemo, msgId, gdSheet, existingGdRow, msgTimeStr) {
  var btlMatch = timFileBtlTheoDeTai(ss, bOrder.fileId || bOrder.code, bOrder.topic, "");
  if (btlMatch && btlMatch.fileId && !bOrder.fileId) {
    bOrder.fileId = btlMatch.fileId;
    try { btlSheet.getRange(bOrder.row, 11).setValue(btlMatch.fileId); } catch (eSetFid) {}
  }

  btlSheet.getRange(bOrder.row, 12, 1, 2).setValues([["ĐÃ CỌC", "Đã xác thực cọc qua Email ACB"]]);

  capNhatTaiKhoanKhachHang(ss, bOrder.email, bOrder.name, bOrder.phone, bOrder.code, bActualAmt, bOrder.deviceId || "", "");

  var previewId = (btlMatch && btlMatch.previewId) ? btlMatch.previewId : FOLDER_BTL_CHECK_ID;
  var previewUrl = (btlMatch && btlMatch.previewLink) ? btlMatch.previewLink : ("https://drive.google.com/drive/folders/" + FOLDER_BTL_CHECK_ID);
  if (bOrder.email && bOrder.email.indexOf("@") !== -1) {
    try { capQuyenNhieuIdDriveSongSong([previewId], bOrder.email, bOrder.code, "Bản xem trước BTL: " + bOrder.topic); } catch (ePrevPerm) {}
    try {
      guiEmailXacNhanCocBtl(bOrder.email, bOrder.name, bOrder.code, bOrder.topic, bActualAmt, bOrder.deadline, previewUrl);
    } catch (eCocMail) {}
    try { guiEmailMoiDungAppMienPhiTccm(bOrder.email, bOrder.name, bOrder.code, "Đặt làm BTL: " + bOrder.topic); } catch (eBtlInv) {}
  }

  setOrderStatusCache(bOrder.code, {
    ok: true,
    orderCode: bOrder.code,
    orderType: "BTL",
    status: "ĐÃ CỌC",
    paid: true,
    verified: true,
    btlDelivered: false,
    topic: bOrder.topic,
    deadline: String(bOrder.deadline || ""),
    driveUrl: previewUrl,
    fullDriveUrl: "",
    previewDriveUrl: previewUrl
  }, 21600);

  var cleanMemo = String(parsedMemo || "").replace(/\s*\[MSG:[^\]]+\]/g, "").trim();
  var fullMemoLog = cleanMemo + " [Cọc BTL: " + bOrder.code + " | " + bOrder.email + "]" + (msgId ? (" [MSG:" + msgId + "]") : "");
  var btlTime = msgTimeStr || Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");
  if (existingGdRow && existingGdRow > 1) {
    gdSheet.getRange(existingGdRow, 4, 1, 3).setValues([["NHẬN CỌC BTL " + bOrder.code, bActualAmt, fullMemoLog]]);
  } else if (gdSheet.getName() === "Lịch Sử Giao Dịch ACB") {
    gdSheet.appendRow([btlTime, "ACB", "27820961", "NHẬN CỌC BTL " + bOrder.code, bActualAmt, fullMemoLog, "", "Đã xác thực cọc BTL", "Email ACB (27820961)"]);
  } else {
    gdSheet.appendRow([btlTime, "ACB", "27820961", "NHẬN CỌC BTL " + bOrder.code, bActualAmt, fullMemoLog]);
    try {
      var mAcbBtl = ss.getSheetByName("Lịch Sử Giao Dịch ACB");
      if (mAcbBtl) mAcbBtl.appendRow([btlTime, "ACB", "27820961", "NHẬN CỌC BTL " + bOrder.code, bActualAmt, fullMemoLog, "", "Đã xác thực cọc BTL", "Email ACB (27820961)"]);
    } catch (eMirBtlAcb) {}
  }

  // Đồng bộ trạng thái ĐÃ CỌC lên tab Tiếng Việt 'Đơn Hàng Bài Tập Lớn' trên Sheet Tổng
  try {
    var mBtlTab = ss.getSheetByName("Đơn Hàng Bài Tập Lớn");
    if (mBtlTab && mBtlTab.getName() !== btlSheet.getName()) {
      var mBtlRows = mBtlTab.getDataRange().getValues();
      for (var mb = mBtlRows.length - 1; mb >= 1; mb--) {
        var mbCode = String(mBtlRows[mb][0] || "").trim().toUpperCase();
        if (mbCode === bOrder.code || mbCode === bOrder.cocCode) {
          mBtlTab.getRange(mb + 1, 12, 1, 2).setValues([["ĐÃ CỌC", "Đã xác thực cọc qua Email ACB"]]);
          break;
        }
      }
    }
  } catch (eMirBtlTab) {}

  var tgBtlRemCode = bOrder.remainCode || buildBtlRemainCode_(bOrder.code);
  banTelegram(
    "✅ <b>[TIỀN CỌC BTL VỀ ACB — ĐÃ XÁC THỰC &amp; GỬI BẢN XEM TRƯỚC]</b>\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "🆔 Mã đơn BTL: <code>" + escTgHtml(bOrder.code) + "</code>\n" +
    "👤 Sinh viên: <b>" + escTgHtml(bOrder.name) + "</b>" + (bOrder.phone ? (" · 📞 <code>" + escTgHtml(bOrder.phone) + "</code>") : "") + "\n" +
    "📧 Email: <code>" + escTgHtml(bOrder.email || "Chưa có") + "</code>\n" +
    "🏫 Trường/Khoa: " + escTgHtml(bOrder.school || "Chưa ghi") + "\n" +
    "📝 Đề tài: <b>" + escTgHtml(bOrder.topic) + "</b>\n" +
    "📅 Hạn nộp (Deadline): <b>" + escTgHtml(String(bOrder.deadline || "Theo yêu cầu")) + "</b>\n" +
    "💰 Tiền cọc nhận: <b>+" + bActualAmt.toLocaleString("vi-VN") + " VNĐ</b>" +
    (bOrder.remainAmt > 0 ? (" · Còn lại: <b>" + bOrder.remainAmt.toLocaleString("vi-VN") + " VNĐ</b> (CK: <code>" + escTgHtml(tgBtlRemCode) + "</code>)") : "") + "\n" +
    (bOrder.reqFileUrl ? ("📎 File yêu cầu (Kho 06): " + escTgHtml(bOrder.reqFileUrl) + "\n") : "") +
    "📝 Nội dung CK: <code>" + escTgHtml(cleanMemo) + "</code>",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "💳 Ảnh QR Thu Nốt", callback_data: "tg_qr:" + bOrder.code },
            { text: "✏️ Nhập/Sửa Giá & Mail", callback_data: "tg_askprice:" + bOrder.code }
          ],
          [
            { text: "🚀 Bàn Giao Full Drive", callback_data: "tg_deliver:" + bOrder.code },
            { text: "🎛️ Menu Tổng", callback_data: "tg_tab:menu:0" }
          ]
        ]
      }
    }
  );
}

function hoanTatThanhToanDuBtl(ss, btlSheet, fOrder, fActualAmt, parsedMemo, msgId, gdSheet, existingGdRow, msgTimeStr) {
  btlSheet.getRange(fOrder.row, 12, 1, 2).setValues([["ĐÃ THANH TOÁN ĐỦ", "Đã nhận đủ phần còn lại qua Email ACB"]]);

  var cleanMemo = String(parsedMemo || "").replace(/\s*\[MSG:[^\]]+\]/g, "").trim();
  var fullMemoLog = cleanMemo + " [Thu đủ BTL: " + fOrder.code + " / " + fOrder.remainCode + " | " + fOrder.email + "]" + (msgId ? (" [MSG:" + msgId + "]") : "");
  var fTime = msgTimeStr || Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");
  if (existingGdRow && existingGdRow > 1) {
    gdSheet.getRange(existingGdRow, 4, 1, 3).setValues([["NHẬN PHẦN CÒN LẠI BTL " + fOrder.code, fActualAmt, fullMemoLog]]);
  } else if (gdSheet.getName() === "Lịch Sử Giao Dịch ACB") {
    gdSheet.appendRow([fTime, "ACB", "27820961", "NHẬN PHẦN CÒN LẠI BTL " + fOrder.code, fActualAmt, fullMemoLog, "", "Đã thu đủ & bàn giao BTL", "Email ACB (27820961)"]);
  } else {
    gdSheet.appendRow([fTime, "ACB", "27820961", "NHẬN PHẦN CÒN LẠI BTL " + fOrder.code, fActualAmt, fullMemoLog]);
    try {
      var mAcbF = ss.getSheetByName("Lịch Sử Giao Dịch ACB");
      if (mAcbF) mAcbF.appendRow([fTime, "ACB", "27820961", "NHẬN PHẦN CÒN LẠI BTL " + fOrder.code, fActualAmt, fullMemoLog, "", "Đã thu đủ & bàn giao BTL", "Email ACB (27820961)"]);
    } catch (eMirF) {}
  }

  try { kiemTraDonHoanThanh(ss); } catch (eDeliv) {}

  try {
    var propsF = PropertiesService.getScriptProperties();
    var tgKeyF = "TG_BTL_FULL_" + fOrder.code;
    if (!propsF.getProperty(tgKeyF)) {
      propsF.setProperty(tgKeyF, String(new Date().getTime()));
      banTelegram(
        "🎉 <b>[THU ĐỦ PHẦN CÒN LẠI BTL — ĐÃ BÀN GIAO FULL]</b>\n" +
        "━━━━━━━━━━━━━━━━━━\n" +
        "🆔 Mã đơn BTL: <code>" + escTgHtml(fOrder.code) + "</code> (CK: <code>" + escTgHtml(fOrder.remainCode) + "</code>)\n" +
        "👤 Sinh viên: <b>" + escTgHtml(fOrder.name) + "</b>" + (fOrder.phone ? (" · 📞 <code>" + escTgHtml(fOrder.phone) + "</code>") : "") + "\n" +
        "📧 Email nhận bản Full: <code>" + escTgHtml(fOrder.email) + "</code>\n" +
        "💰 Số tiền phần còn lại: <b>+" + fActualAmt.toLocaleString("vi-VN") + " VNĐ</b>\n" +
        "🚀 <b>Trạng thái: Đã tự động mở quyền Drive &amp; gửi Email bàn giao bản Full!</b>",
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "👤 Xem Hồ Sơ Khách", callback_data: "tg_cust:" + String(fOrder.email || fOrder.phone || "").slice(0, 52) },
                { text: "📊 Tổng Quan Doanh Thu", callback_data: "tg_tab:overview:0" }
              ]
            ]
          }
        }
      );
    }
  } catch (eTgF) {}
}

function guiEmailXacNhanCocBtl(email, name, orderCode, topic, depositAmt, deadlineStr, previewUrl) {
  if (!email || email.indexOf("@") === -1) return;
  var htmlBody =
    '<div style="max-width:580px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:16px;">' +
      '<div style="background:linear-gradient(135deg,#0D1677 0%,#1e3a8a 100%);padding:28px 24px;text-align:center;border-radius:14px 14px 0 0;">' +
        '<div style="display:inline-block;background:rgba(255,255,255,0.15);color:#fde047;padding:4px 14px;border-radius:999px;font-size:11px;font-weight:bold;letter-spacing:1px;margin-bottom:10px;">ĐIỆP VIÊN TÀI LIỆU • DỊCH VỤ HỌC THUẬT</div>' +
        '<h1 style="color:#ffffff;margin:0;font-size:20px;">XÁC NHẬN ĐẶT CỌC BTL &amp; BẢN XEM TRƯỚC 🎓</h1>' +
      '</div>' +
      '<div style="padding:26px 24px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 14px 14px;">' +
        '<p style="color:#1e293b;font-size:15px;margin-top:0;">Xin chào <b>' + (name || "Bạn") + '</b>,</p>' +
        '<p style="color:#334155;font-size:14px;line-height:1.6;">Hệ thống đã xác nhận thành công khoản đặt cọc <b>' + Number(depositAmt || 50000).toLocaleString("vi-VN") + ' VNĐ</b> cho đơn đặt làm Bài Tập Lớn / Tiểu Luận <b>#' + orderCode + '</b>:</p>' +
        '<div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:14px 16px;margin:16px 0;font-size:13px;color:#1e293b;line-height:1.7;">' +
          '• <b>Mã đơn:</b> #' + orderCode + '<br>' +
          '• <b>Đề tài:</b> ' + (topic || "Bài Tập Lớn / Tiểu Luận") + '<br>' +
          '• <b>Hạn bàn giao tự động (Deadline):</b> <b>' + (deadlineStr || "Đúng hạn cam kết") + '</b>' +
        '</div>' +
        (previewUrl ? (
          '<div style="border-left:4px solid #2563eb;padding:16px 20px;margin:20px 0;background:#eff6ff;border-radius:10px;">' +
            '<div style="font-size:13px;color:#1e40af;font-weight:bold;margin-bottom:8px;">👁️ BẢN XEM TRƯỚC / ĐỀ CƯƠNG KHUNG TRÊN GOOGLE DRIVE:</div>' +
            '<a href="' + previewUrl + '" style="display:inline-block;background:#2563eb;color:#ffffff;font-weight:bold;padding:11px 22px;border-radius:8px;text-decoration:none;font-size:14px;">📂 MỞ BẢN XEM TRƯỚC TRÊN GOOGLE DRIVE</a>' +
            '<p style="font-size:12px;color:#475569;margin:10px 0 0;">📌 Khi đến đúng hạn nộp (Deadline), hệ thống sẽ <b>tự động mở quyền File Full hoàn chỉnh</b> và gửi thẳng vào Gmail <b>' + email + '</b> của bạn!</p>' +
          '</div>'
        ) : '') +
        '<div style="margin-top:22px;padding-top:14px;border-top:1px dashed #e2e8f0;font-size:12px;color:#64748b;text-align:center;">' +
          '🌐 Website: <a href="https://diepvientailieu.store" style="color:#2563eb;font-weight:bold;">diepvientailieu.store</a> &nbsp;|&nbsp; 💬 Zalo Học Thuật 24/7: <b>0792 453 169</b>' +
        '</div>' +
      '</div>' +
    '</div>';
  MailApp.sendEmail({
    to: email,
    name: "Điệp Viên Tài Liệu",
    replyTo: "diepvientailieu@gmail.com",
    subject: "[ĐIỆP VIÊN TÀI LIỆU] Đã nhận cọc BTL #" + orderCode + " — Hẹn bàn giao tự động đúng hạn",
    htmlBody: htmlBody
  });
}

function extractAcbAmount(text) {
  if (!text) return 0;
  var patterns = [
    /\+\s*([0-9]{1,3}(?:[.,][0-9]{3})+)\s*(?:VND|VNĐ|Đ)/i,
    /ghi\s*c[oó]\s*:?\s*\+?\s*([0-9]{1,3}(?:[.,][0-9]{3})+)/i,
    /s[oố]\s*ti[eề]n\s*(?:giao\s*d[iị]ch|ghi\s*c[oó]|bi[eế]n\s*đ[oộ]ng)?\s*:?\s*\+?\s*([0-9]{1,3}(?:[.,][0-9]{3})+)/i,
    /GD\s*:?\s*\+\s*([0-9]{1,3}(?:[.,][0-9]{3})+)/i,
    /\+\s*([0-9]{4,9})\s*(?:VND|VNĐ)/i
  ];
  for (var i = 0; i < patterns.length; i++) {
    var m = text.match(patterns[i]);
    if (m && m[1]) {
      var raw = m[1].replace(/[.,]00$/, "");
      var digits = raw.replace(/[^0-9]/g, "");
      var val = parseInt(digits, 10);
      if (val >= 1000) return val;
    }
  }
  return 0;
}

function extractAcbMemo(text, subject) {
  if (!text) return subject || "Biến động số dư ACB";
  var patterns = [
    /N[oộ]i\s*dung\s*(?:giao\s*d[iị]ch|chuy[eể]n\s*kho[aả]n|CK)?\s*:?\s*([^\n\r.]{3,140})/i,
    /ND\s*:?\s*([^\n\r]{3,140})/i,
    /Di[eễ]n\s*gi[aả]i\s*:?\s*([^\n\r]{3,140})/i,
    /Mo\s*ta\s*:?\s*([^\n\r]{3,140})/i
  ];
  for (var i = 0; i < patterns.length; i++) {
    var m = text.match(patterns[i]);
    if (m && m[1]) {
      return m[1].trim().substring(0, 120);
    }
  }
  var dvMatch = text.match(/((?:DV|DC|COC|BTL)[A-Z0-9_]{3,20}[^\n\r]{0,60})/i);
  if (dvMatch && dvMatch[1]) return dvMatch[1].trim();
  return (subject || "Thông báo biến động số dư ACB").trim();
}

// =========================================================================
// 5. LƯU TRỮ DỮ LIỆU KHÁCH HÀNG SIÊU TỐC (BATCH 1-CALL + HÀNG ĐỢI NGẦM 3 BẢNG)
// =========================================================================
function capNhatTaiKhoanKhachHang(ss, email, name, phone, sku, amount, deviceId, deviceName) {
  if (!email || email.indexOf("@") === -1) return;
  var normSku = String(sku || "").trim().toUpperCase();
  if (Number(amount || 0) >= 399000) normSku = "ALL-COURSES-399K";
  var isCourse = (
    normSku.indexOf("COURSE-") === 0 ||
    normSku.indexOf("SUBJ-") === 0 ||
    normSku === "ALL-COURSES-399K" ||
    Boolean(COURSE_DRIVE_MAP[normSku])
  );
  dongBoHoSoKhachHangChuan(ss, {
    email: email,
    name: name,
    phone: phone,
    deviceId: deviceId,
    deviceName: deviceName,
    status: "PAID_VERIFIED_BANK_EMAIL",
    addCourseSku: isCourse ? normSku : "",
    addDocSku: (!isCourse && normSku) ? normSku : "",
    source: "PAID_VERIFIED_ACB"
  });
}

function dongBoHoSoKhachHangChuan(ss, info) {
  if (!info || !info.email || String(info.email).indexOf("@") === -1) return;
  ss = ss || getMasterSpreadsheet();
  var cleanEmail = String(info.email || "").trim().toLowerCase();
  if (cleanEmail === "sinhvien@gmail.com" || cleanEmail === "pro.unlimited@diepvienstudy.ai") return;

  var cleanName = String(info.name || "").trim();
  if (cleanName === "Khách Hàng" || cleanName === "Sinh Viên") cleanName = "";
  var cleanPhone = sanitizeCustomerPhone(info.phone || "");
  var extractedDev = extractDeviceIdFromInputs(info.deviceId || info.deviceLock || "", info.phone || "");
  var nowStr = info.updatedAt || Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");
  var sourceStr = String(info.source || "WEB_APP_SYNC").trim();
  var devNameStr = String(info.deviceName || "Thiết bị kích hoạt").trim();

  var tkSheet = ss.getSheetByName("TaiKhoan_KhachHang");
  var rowRecord = null;

  if (tkSheet) {
    var tkData = tkSheet.getDataRange().getValues();
    var foundIdx = -1;
    for (var i = 1; i < tkData.length; i++) {
      if (String(tkData[i][0] || "").trim().toLowerCase() === cleanEmail) {
        foundIdx = i + 1;
        var exName = cleanName || String(tkData[i][1] || "").trim() || "Học Viên Điệp Viên";
        var exPhone = cleanPhone || sanitizeCustomerPhone(tkData[i][2]);
        var exPass = String(info.password || tkData[i][3] || "").trim();
        var exStatus = String(tkData[i][4] || "").trim();
        if (info.status === "PAID_VERIFIED_BANK_EMAIL" || exStatus === "PAID_VERIFIED_BANK_EMAIL") {
          exStatus = "PAID_VERIFIED_BANK_EMAIL";
        } else {
          exStatus = info.status || exStatus || "REGISTERED";
        }

        var curCourses = String(info.unlockedCourses !== undefined ? info.unlockedCourses : (tkData[i][5] || ""))
          .split(",").map(function(s) { return s.trim(); }).filter(Boolean);
        if (info.addCourseSku) {
          if (curCourses.indexOf(info.addCourseSku) === -1) curCourses.push(info.addCourseSku);
        }
        if (curCourses.length > 0) curCourses = expandUnlockedCourses(curCourses);

        var curDocs = String(info.purchasedDocs !== undefined ? info.purchasedDocs : (tkData[i][6] || ""))
          .split(",").map(function(s) { return s.trim(); }).filter(Boolean);
        if (info.addDocSku && curDocs.indexOf(info.addDocSku) === -1) {
          curDocs.push(info.addDocSku);
        }

        var exSource = String(tkData[i][7] || sourceStr);
        var exLock = String(tkData[i][9] || "").trim() || extractDeviceIdFromInputs("", tkData[i][2]);
        if (extractedDev) {
          var pref = (extractedDev.indexOf("DVS-WB-") === 0) ? "WB" : "HW";
          exLock = upsertSlotTag(exLock, pref, extractedDev);
        }
        var exDevLabel = String(tkData[i][10] || "").trim() || (extractedDev ? (devNameStr + " (" + nowStr + ")") : "");

        rowRecord = [
          cleanEmail,
          exName,
          exPhone ? "'" + exPhone : "",
          exPass,
          exStatus,
          curCourses.join(", "),
          curDocs.join(", "),
          exSource,
          nowStr,
          exLock,
          exDevLabel
        ];
        // Ghi 1 LẦN DUY NHẤT cả hàng (11 cột) thay vì 9 lệnh setValue rời rạc (Nhanh gấp 9 lần!)
        tkSheet.getRange(foundIdx, 1, 1, 11).setValues([rowRecord]);
        break;
      }
    }

    if (foundIdx === -1) {
      var newLock = "";
      if (extractedDev) {
        var nPref = (extractedDev.indexOf("DVS-WB-") === 0) ? "WB" : "HW";
        newLock = upsertSlotTag("", nPref, extractedDev);
      }
      var initC = info.unlockedCourses ? String(info.unlockedCourses).split(",").map(function(s){return s.trim();}).filter(Boolean) : [];
      if (info.addCourseSku && initC.indexOf(info.addCourseSku) === -1) initC.push(info.addCourseSku);
      if (initC.length > 0) initC = expandUnlockedCourses(initC);
      var initD = info.purchasedDocs ? String(info.purchasedDocs) : (info.addDocSku || "");

      rowRecord = [
        cleanEmail,
        cleanName || "Học Viên Điệp Viên",
        cleanPhone ? "'" + cleanPhone : "",
        String(info.password || ""),
        info.status || "REGISTERED",
        initC.join(", "),
        initD,
        sourceStr,
        nowStr,
        newLock,
        newLock ? (devNameStr + " (" + nowStr + ")") : ""
      ];
      tkSheet.appendRow(rowRecord);
    }
  } else {
    var initC2 = info.unlockedCourses ? String(info.unlockedCourses).split(",").map(function(s){return s.trim();}).filter(Boolean) : [];
    if (info.addCourseSku && initC2.indexOf(info.addCourseSku) === -1) initC2.push(info.addCourseSku);
    if (initC2.length > 0) initC2 = expandUnlockedCourses(initC2);
    rowRecord = [
      cleanEmail,
      cleanName || "Học Viên Điệp Viên",
      cleanPhone ? "'" + cleanPhone : "",
      String(info.password || ""),
      info.status || "REGISTERED",
      initC2.join(", "),
      info.purchasedDocs ? String(info.purchasedDocs) : (info.addDocSku || ""),
      sourceStr,
      nowStr,
      extractedDev ? upsertSlotTag("", (extractedDev.indexOf("DVS-WB-") === 0 ? "WB" : "HW"), extractedDev) : "",
      extractedDev ? (devNameStr + " (" + nowStr + ")") : ""
    ];
  }

  // Xóa cache sync cũ của khách hàng này để lần đọc tiếp theo nhận ngay dữ liệu mới
  var cache = getScriptCacheSafe();
  if (cache) {
    try { cache.remove("CUST_SYNC_V7_" + cleanEmail); } catch (eRm) {}
  }

  // Đồng bộ trực tiếp sang Tab Tiếng Việt 'Thông Tin Khách Hàng' trên Sheet Tổng & đẩy Card Hồ Sơ lên Telegram
  if (rowRecord) {
    try {
      var mSs = getMasterSpreadsheet();
      var mcTab = mSs ? mSs.getSheetByName("Thông Tin Khách Hàng") : null;
      if (mcTab) {
        var mcData = mcTab.getDataRange().getValues();
        var mcIdx = -1;
        for (var j = 1; j < mcData.length; j++) {
          if (String(mcData[j][0] || "").trim().toLowerCase() === cleanEmail) {
            mcIdx = j + 1;
            break;
          }
        }
        var finalNameMc = rowRecord[1] || (mcIdx > 0 ? String(mcData[mcIdx - 1][1] || "") : "Học Viên Điệp Viên");
        var finalPhoneMc = rowRecord[2] || (mcIdx > 0 ? String(mcData[mcIdx - 1][2] || "") : "");
        var prods = [rowRecord[5], rowRecord[6]].filter(Boolean).join(", ");
        if (!prods && mcIdx > 0) prods = String(mcData[mcIdx - 1][6] || "");
        var vnSt = (rowRecord[4] === "PAID_VERIFIED_BANK_EMAIL") ? "Đã thanh toán (Xác thực ACB)" : (rowRecord[4] || "Đã đăng ký");
        if (mcIdx > 0) {
          mcTab.getRange(mcIdx, 2, 1, 10).setValues([[
            finalNameMc, finalPhoneMc, mcData[mcIdx - 1][3] || "1", mcData[mcIdx - 1][4] || "0 đ",
            vnSt, prods, rowRecord[7], rowRecord[8], rowRecord[9], rowRecord[10]
          ]]);
        } else {
          mcTab.appendRow([
            cleanEmail, finalNameMc, finalPhoneMc, "1", "0 đ",
            vnSt, prods, rowRecord[7], rowRecord[8], rowRecord[9], rowRecord[10], "Đồng bộ tự động (Web/App)"
          ]);
        }

        // Lưu & cập nhật hồ sơ khách lên Telegram (chỉ bắn khi khách mới hoặc có thông tin mới khác trước)
        try {
          var cleanPhDisp = String(finalPhoneMc || "").replace(/^'/, "");
          var sig = [finalNameMc, cleanPhDisp, vnSt, prods].join("|");
          var pProps = PropertiesService.getScriptProperties();
          var sigKey = "TG_CUST_SIG_" + Utilities.base64EncodeWebSafe(cleanEmail).slice(0, 40);
          if (pProps.getProperty(sigKey) !== sig) {
            pProps.setProperty(sigKey, sig);
            banTelegram(
              "👤 <b>[HỒ SƠ KHÁCH HÀNG — LƯU TRÊN TELEGRAM]</b>\n" +
              "━━━━━━━━━━━━━━━━━━\n" +
              "🪪 Họ tên: <b>" + escTgHtml(finalNameMc) + "</b>\n" +
              (cleanPhDisp ? ("📞 SĐT/Zalo: <code>" + escTgHtml(cleanPhDisp) + "</code>\n") : "") +
              "📧 Email: <code>" + escTgHtml(cleanEmail) + "</code>\n" +
              "📌 Trạng thái: <b>" + escTgHtml(vnSt) + "</b>\n" +
              (prods ? ("📚 Đã mở / quan tâm: <code>" + escTgHtml(prods.slice(0, 140)) + "</code>\n") : "") +
              "🌐 Nguồn: <i>" + escTgHtml(rowRecord[7] || "Web/App") + "</i> · 🕒 " + escTgHtml(nowStr),
              {
                reply_markup: {
                  inline_keyboard: [
                    [
                      { text: "🔍 Chi Tiết & Đơn Hàng", callback_data: "tg_cust:" + cleanEmail.slice(0, 52) },
                      { text: "🎛️ Menu Tổng", callback_data: "tg_tab:menu:0" }
                    ]
                  ]
                }
              }
            );
          }
        } catch (eTgCust) {}
      }
    } catch (eMc) {}
    enqueueCustomerBackupMirror(cleanEmail, rowRecord);
  }
}

function extractSlotTag(rawLockStr, prefix) {
  var s = String(rawLockStr || "");
  var re = new RegExp("\\[" + prefix + ":([^\\]]+)\\]");
  var m = s.match(re);
  if (m && m[1]) return m[1].trim();
  if (prefix === "HW" && s.indexOf("DVS-HW-") === 0 && s.indexOf("[") === -1) return s.trim();
  if (prefix === "WB" && s.indexOf("DVS-WB-") === 0 && s.indexOf("[") === -1) return s.trim();
  return "";
}

function upsertSlotTag(rawLockStr, prefix, devId) {
  var hw = extractSlotTag(rawLockStr, "HW");
  var wb = extractSlotTag(rawLockStr, "WB");
  if (prefix === "HW") hw = devId;
  if (prefix === "WB") wb = devId;
  var parts = [];
  if (hw) parts.push("[HW:" + hw + "]");
  if (wb) parts.push("[WB:" + wb + "]");
  return parts.join(" ");
}

function kiemTraVaKhoaThietBiApp(ss, rawEmail, rawDeviceId, rawDeviceName) {
  var targetEmail = String(rawEmail || "").trim().toLowerCase();
  var deviceId = String(rawDeviceId || "").trim();
  var deviceName = String(rawDeviceName || "App Điệp Viên Study").trim();
  var nowStr = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");
  var slotPrefix = (deviceId.indexOf("DVS-WB-") === 0) ? "WB" : "HW";

  var custObj = {
    email: targetEmail,
    name: "",
    phone: "",
    unlockedCourses: [],
    purchasedDocs: [],
    btlOrders: [],
    boundDeviceId: ""
  };

  if (!targetEmail || targetEmail.indexOf("@") === -1) {
    return { ok: false, errorCode: "INVALID_EMAIL", message: "Vui lòng nhập đúng địa chỉ Email đã đăng ký khóa học." };
  }

  var tkSheet = ss.getSheetByName("TaiKhoan_KhachHang");
  var tkData = tkSheet ? tkSheet.getDataRange().getValues() : [];
  var targetRowIdx = -1;
  var rawBoundLock = "";

  // 1. Kiểm tra xem thiết bị (deviceId) này đã bị khóa cứng vào một tài khoản Email khác chưa (Chống dùng 2 tài khoản trên 1 máy)
  if (deviceId && tkData.length > 1) {
    for (var k = 1; k < tkData.length; k++) {
      var rEmail = String(tkData[k][0] || "").trim().toLowerCase();
      var rDevLock = String(tkData[k][9] || "").trim() || extractDeviceIdFromInputs("", tkData[k][2]);
      var rSlotDev = extractSlotTag(rDevLock, slotPrefix);
      if (rEmail && rEmail !== targetEmail && rSlotDev && rSlotDev === deviceId) {
        return {
          ok: false,
          deviceLocked: true,
          errorCode: "MACHINE_BOUND_TO_OTHER_EMAIL",
          email: targetEmail,
          boundEmail: rEmail,
          boundDeviceId: deviceId,
          customer: { email: targetEmail, name: "", unlockedCourses: [], purchasedDocs: [] },
          message: "⛔ BẢO MẬT 1 THIẾT BỊ: Thiết bị này (" + deviceId + ") đã được gắn cố định với tài khoản [" + rEmail + "]. Không thể dùng chung 2 tài khoản trên cùng 1 máy!"
        };
      }
      if (rEmail === targetEmail) {
        targetRowIdx = k + 1;
        custObj.name = String(tkData[k][1] || "");
        custObj.phone = sanitizeCustomerPhone(tkData[k][2]);
        var cList = String(tkData[k][5] || "").split(",").map(function(s) { return s.trim(); }).filter(Boolean);
        custObj.unlockedCourses = cList;
        rawBoundLock = rDevLock;
      }
    }
  } else if (tkData.length > 1) {
    for (var t = 1; t < tkData.length; t++) {
      if (String(tkData[t][0] || "").trim().toLowerCase() === targetEmail) {
        targetRowIdx = t + 1;
        custObj.name = String(tkData[t][1] || "");
        custObj.phone = sanitizeCustomerPhone(tkData[t][2]);
        var cList2 = String(tkData[t][5] || "").split(",").map(function(s) { return s.trim(); }).filter(Boolean);
        custObj.unlockedCourses = cList2;
        rawBoundLock = String(tkData[t][9] || "").trim() || extractDeviceIdFromInputs("", tkData[t][2]);
        break;
      }
    }
  }

  // 2. Quét thêm bảng Don_De_Cuong để đảm bảo mọi đơn PAID_SUCCESS đều được đồng bộ
  var dcSheet = getSheetByAliases_(ss, ["Don_De_Cuong", "Đơn Hàng Đề Cương"]);
  if (dcSheet) {
    var dcData = dcSheet.getDataRange().getValues();
    for (var d = 1; d < dcData.length; d++) {
      var r = dcData[d];
      var is13 = (r.length >= 11 && (String(r[4] || "").indexOf("@") !== -1 || ["Mua File", "Mua Đề Cương", "Khóa Học"].indexOf(String(r[2] || "")) !== -1));
      var dEmail = String(is13 ? r[4] : r[3] || "").trim().toLowerCase();
      var dSt = String(is13 ? r[10] : r[8] || "").trim().toUpperCase();
      if (dEmail === targetEmail && (dSt === "PAID_SUCCESS" || dSt === "DONE" || dSt === "ĐÃ THANH TOÁN")) {
        var dSku = String(is13 ? r[6] : r[5] || "").trim().toUpperCase();
        var dTitle = String(is13 ? r[7] : r[6] || "").trim();
        var dCode = String(r[1] || "").trim();
        var dAmt = Number(String(is13 ? r[8] : r[7] || "50000").replace(/[^0-9]/g, "")) || 50000;
        var dDriveId = is13 && r.length >= 14 ? String(r[13] || "").trim() : "";
        if (!custObj.name) custObj.name = String(is13 ? r[3] : r[2] || "");
        if (!custObj.phone) custObj.phone = sanitizeCustomerPhone(is13 ? r[5] : r[4]);
        if (dAmt >= 399000) dSku = "ALL-COURSES-399K";
        if (dSku.indexOf("COURSE-") === 0 || dSku.indexOf("SUBJ-") === 0 || dSku === "ALL-COURSES-399K" || COURSE_DRIVE_MAP[dSku]) {
          if (custObj.unlockedCourses.indexOf(dSku) === -1) custObj.unlockedCourses.push(dSku);
        }
        var prod = timSanPham(ss, dSku, dTitle, dAmt, dDriveId);
        custObj.purchasedDocs.push({
          orderCode: dCode,
          sku: dSku,
          title: dTitle,
          driveUrl: prod ? prod.link : ""
        });
      }
    }
  }

  // 2B. Quét thêm bảng Don_BTL_DichVu để trả về danh sách đơn BTL của khách
  var btlSheet = getSheetByAliases_(ss, ["Don_BTL_DichVu", "Đơn Hàng Bài Tập Lớn"]);
  if (btlSheet) {
    var btlData = btlSheet.getDataRange().getValues();
    for (var b = 1; b < btlData.length; b++) {
      var br = btlData[b];
      var bEmail = String(br[3] || "").trim().toLowerCase();
      if (bEmail === targetEmail) {
        var bCodeSync = String(br[0] || "").trim();
        var bFileId = String(br[10] || "").trim();
        var bStatus = String(br[11] || "").trim();
        var bRemAmt = Number(String(br[9] || "0").replace(/[^0-9]/g, "")) || 0;
        var bRemCode = (br.length >= 17 && String(br[16] || "").trim()) ? String(br[16] || "").trim() : buildBtlRemainCode_(bCodeSync);
        var bRemQr = (br.length >= 18 && String(br[17] || "").trim()) ? String(br[17] || "").trim() : buildBtlRemainQrUrl_("27820961", bRemAmt, bRemCode);
        var bReqUrl = br.length >= 16 ? String(br[15] || "").trim() : "";
        custObj.btlOrders.push({
          orderCode: bCodeSync,
          topic: String(br[5] || "").trim(),
          deadline: String(br[6] || "").trim(),
          status: bStatus,
          remainAmt: bRemAmt,
          remainCode: bRemCode,
          remainQrUrl: bRemQr,
          reqFileUrl: bReqUrl,
          driveUrl: bFileId ? ("https://drive.google.com/file/d/" + bFileId + "/view") : ""
        });
      }
    }
  }

  custObj.unlockedCourses = expandUnlockedCourses(custObj.unlockedCourses);

  // 3. KIỂM TRA KHÓA CỨNG 1 THIẾT BỊ (1-DEVICE LOCK THEO SLOT HW / WB)
  var boundSlotDev = extractSlotTag(rawBoundLock, slotPrefix);
  if (deviceId) {
    if (boundSlotDev && boundSlotDev !== deviceId) {
      return {
        ok: false,
        deviceLocked: true,
        errorCode: "DEVICE_LOCKED_MISMATCH",
        email: targetEmail,
        boundDeviceId: boundSlotDev,
        customer: {
          email: targetEmail,
          name: custObj.name,
          unlockedCourses: [],
          purchasedDocs: []
        },
        message: "⛔ BẢO MẬT 1 THIẾT BỊ: Tài khoản Email [" + targetEmail + "] đã được kích hoạt cố định trên 01 máy duy nhất (" + boundSlotDev + "). Không thể đăng nhập hoặc chia sẻ sang máy thứ 2!"
      };
    }

    // Nếu tài khoản đã có khóa học mở khóa và chưa gắn thiết bị ở slot này -> Khóa cứng ngay vào thiết bị đầu tiên này!
    if (!boundSlotDev && (custObj.unlockedCourses.length > 0 || targetRowIdx > 0) && tkSheet) {
      boundSlotDev = deviceId;
      var updatedLockStr = upsertSlotTag(rawBoundLock, slotPrefix, deviceId);
      if (targetRowIdx > 0) {
        tkSheet.getRange(targetRowIdx, 6).setValue(custObj.unlockedCourses.join(", "));
        tkSheet.getRange(targetRowIdx, 10).setValue(updatedLockStr);
        tkSheet.getRange(targetRowIdx, 11).setValue(deviceName + " (" + nowStr + ")");
      } else {
        tkSheet.appendRow([
          targetEmail,
          custObj.name || "Học Viên Điệp Viên",
          custObj.phone ? "'" + custObj.phone : "",
          "",
          "PAID_VERIFIED_BANK_EMAIL",
          custObj.unlockedCourses.join(", "),
          "",
          "Kích hoạt App 1 Máy Duy Nhất",
          nowStr,
          updatedLockStr,
          deviceName + " (" + nowStr + ")"
        ]);
      }
    }
  }

  custObj.boundDeviceId = boundSlotDev || deviceId;
  return {
    ok: true,
    deviceLocked: false,
    deviceBound: Boolean(custObj.boundDeviceId),
    boundDeviceId: custObj.boundDeviceId,
    customer: custObj
  };
}


function guiMaOtpXacThucApp(ss, rawEmail, rawName, rawPhone) {
  var cleanEmail = String(rawEmail || "").trim().toLowerCase();
  var cleanName = String(rawName || "Học Viên Điệp Viên").trim();
  var cleanPhone = sanitizeCustomerPhone(rawPhone);
  if (!cleanEmail || cleanEmail.indexOf("@") === -1) {
    return { ok: false, status: "INVALID_EMAIL", message: "Vui lòng nhập đúng địa chỉ Email (Gmail) để nhận mã OTP!" };
  }

  var otpCode = String(Math.floor(100000 + Math.random() * 900000));
  var propPayload = JSON.stringify({
    otp: otpCode,
    email: cleanEmail,
    name: cleanName,
    phone: cleanPhone,
    ts: new Date().getTime()
  });
  PropertiesService.getScriptProperties().setProperty("APP_OTP_" + cleanEmail, propPayload);

  var sentOk = false;
  if (KHO_PHAT_FILE_WEBHOOK_URL && KHO_PHAT_FILE_WEBHOOK_URL.indexOf("https://") === 0) {
    try {
      var res = UrlFetchApp.fetch(KHO_PHAT_FILE_WEBHOOK_URL, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify({
          secret: KHO_SECRET_KEY,
          action: "send_app_otp",
          email: cleanEmail,
          name: cleanName,
          otp: otpCode
        }),
        muteHttpExceptions: true
      });
      var j = JSON.parse(res.getContentText());
      if (j && (j.ok || j.status === "SUCCESS")) sentOk = true;
    } catch (eKho) {}
  }

  if (!sentOk) {
    try {
      var htmlOtp =
        '<div style="max-width:560px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:16px;">' +
          '<div style="background:linear-gradient(135deg,#0D1677 0%,#1e3a8a 100%);padding:26px 24px;text-align:center;border-radius:14px 14px 0 0;">' +
            '<h1 style="color:#ffffff;margin:0;font-size:20px;">MÃ XÁC NHẬN OTP TẢI & KÍCH HOẠT APP 💻</h1>' +
          '</div>' +
          '<div style="padding:26px 24px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 14px 14px;">' +
            '<p style="color:#1e293b;font-size:15px;">Xin chào <b>' + cleanName + '</b>,</p>' +
            '<p style="color:#334155;font-size:14px;">Mã xác thực OTP để kích hoạt tài khoản <b>' + cleanEmail + '</b> và tải <b>App Điệp Viên Study</b> của bạn là:</p>' +
            '<div style="background:#eff6ff;border:2px dashed #2563eb;border-radius:12px;padding:18px;text-align:center;margin:20px 0;">' +
              '<div style="font-size:32px;font-weight:900;letter-spacing:8px;color:#0D1677;font-family:monospace;">' + otpCode + '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      MailApp.sendEmail({
        to: cleanEmail,
        name: "Điệp Viên Study",
        replyTo: "diepvientailieu@gmail.com",
        subject: "[ĐIỆP VIÊN STUDY] Mã OTP Xác Thực & Kích Hoạt Tài Khoản App: " + otpCode,
        htmlBody: htmlOtp
      });
      sentOk = true;
    } catch (eFallback) {}
  }

  return {
    ok: true,
    status: "OTP_SENT",
    email: cleanEmail,
    message: "Đã gửi mã xác nhận OTP 6 số về Email " + cleanEmail + ". Vui lòng kiểm tra Hộp thư đến (hoặc Quảng cáo/Spam)!"
  };
}

function xacThucMaOtpApp(ss, rawEmail, rawOtp, rawName, rawPhone, rawDeviceId) {
  var cleanEmail = String(rawEmail || "").trim().toLowerCase();
  var cleanOtp = String(rawOtp || "").replace(/[^0-9]/g, "").trim();
  var cleanName = String(rawName || "Học Viên Điệp Viên").trim();
  var cleanPhone = sanitizeCustomerPhone(rawPhone);
  var deviceId = extractDeviceIdFromInputs(rawDeviceId, rawPhone);

  if (!cleanEmail || cleanEmail.indexOf("@") === -1 || !cleanOtp) {
    return { ok: false, verified: false, errorCode: "MISSING_INPUT", message: "Vui lòng nhập đầy đủ Email và mã OTP 6 chữ số!" };
  }

  var rawStored = PropertiesService.getScriptProperties().getProperty("APP_OTP_" + cleanEmail);
  if (!rawStored) {
    return { ok: false, verified: false, errorCode: "OTP_NOT_FOUND", message: "Chưa tìm thấy mã OTP hoặc mã đã hết hạn. Vui lòng bấm Gửi lại mã OTP!" };
  }

  var stored = {};
  try { stored = JSON.parse(rawStored); } catch (eP) {}
  var nowMs = new Date().getTime();
  if (!stored.otp || (nowMs - Number(stored.ts || 0) > 15 * 60 * 1000)) {
    PropertiesService.getScriptProperties().deleteProperty("APP_OTP_" + cleanEmail);
    return { ok: false, verified: false, errorCode: "OTP_EXPIRED", message: "Mã OTP đã hết hạn (quá 15 phút). Vui lòng bấm Gửi lại mã OTP mới!" };
  }

  if (String(stored.otp).trim() !== cleanOtp) {
    return { ok: false, verified: false, errorCode: "OTP_MISMATCH", message: "Mã xác nhận OTP chưa chính xác. Vui lòng kiểm tra lại mã 6 số trong Email của bạn!" };
  }

  // Xóa OTP một lần sau khi khớp thành công
  PropertiesService.getScriptProperties().deleteProperty("APP_OTP_" + cleanEmail);

  var finalName = cleanName || stored.name || "Học Viên Điệp Viên";
  var finalPhone = cleanPhone || stored.phone || "";
  var nowStr = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");

  dongBoHoSoKhachHangChuan(ss, {
    email: cleanEmail,
    name: finalName,
    phone: finalPhone,
    status: "OTP_VERIFIED_APP_ACTIVE",
    source: "Xác Thực OTP & Kích Hoạt App Trên Web",
    updatedAt: nowStr,
    deviceId: deviceId
  });

  // Gửi email xác nhận tài khoản App đã kích hoạt thành công
  if (KHO_PHAT_FILE_WEBHOOK_URL && KHO_PHAT_FILE_WEBHOOK_URL.indexOf("https://") === 0) {
    try {
      UrlFetchApp.fetch(KHO_PHAT_FILE_WEBHOOK_URL, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify({
          secret: KHO_SECRET_KEY,
          action: "send_app_activated",
          email: cleanEmail,
          name: finalName
        }),
        muteHttpExceptions: true
      });
    } catch (eAct) {}
  }

  // Không gửi thông báo OTP vào Telegram (chỉ gửi thông báo khi hoàn thành giao dịch và đã bàn giao)

  var syncRes = kiemTraVaKhoaThietBiApp(ss, cleanEmail, deviceId, "Web OTP Verified");
  return {
    ok: true,
    verified: true,
    appActivated: true,
    email: cleanEmail,
    customer: syncRes.customer || { email: cleanEmail, name: finalName, phone: finalPhone, unlockedCourses: [], purchasedDocs: [] },
    message: "Xác thực OTP thành công! Tài khoản App Điệp Viên Study của bạn đã được kích hoạt."
  };
}

// =========================================================================
// 6. TỰ ĐỘNG BÀN GIAO BÀI TẬP LỚN (BTL) KHI ĐẾN HẠN (DEADLINE) HOẶC HOÀN THÀNH
// =========================================================================
function parseDeadlineMs(rawDeadline) {
  if (!rawDeadline) return 0;
  if (Object.prototype.toString.call(rawDeadline) === "[object Date]") {
    var tDate = rawDeadline.getTime();
    return isNaN(tDate) ? 0 : tDate;
  }
  var s = String(rawDeadline || "").trim();
  if (!s || s.toLowerCase() === "theo yêu cầu") return 0;

  // Format YYYY-MM-DD hoặc YYYY-MM-DDTHH:mm
  var isoMatch = s.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[T\s]+(\d{1,2}):(\d{1,2}))?/);
  if (isoMatch) {
    var y = parseInt(isoMatch[1], 10);
    var m = parseInt(isoMatch[2], 10) - 1;
    var d = parseInt(isoMatch[3], 10);
    var hh = isoMatch[4] !== undefined ? parseInt(isoMatch[4], 10) : 8;
    var mm = isoMatch[5] !== undefined ? parseInt(isoMatch[5], 10) : 0;
    return new Date(y, m, d, hh, mm, 0).getTime();
  }

  // Format DD/MM/YYYY hoặc DD-MM-YYYY [HH:mm]
  var vnMatch = s.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(?:[T\s]+(\d{1,2}):(\d{1,2}))?/);
  if (vnMatch) {
    var d2 = parseInt(vnMatch[1], 10);
    var m2 = parseInt(vnMatch[2], 10) - 1;
    var y2 = parseInt(vnMatch[3], 10);
    var hh2 = vnMatch[4] !== undefined ? parseInt(vnMatch[4], 10) : 8;
    var mm2 = vnMatch[5] !== undefined ? parseInt(vnMatch[5], 10) : 0;
    return new Date(y2, m2, d2, hh2, mm2, 0).getTime();
  }

  var parsed = Date.parse(s);
  return isNaN(parsed) ? 0 : parsed;
}

function timFileBtlTheoDeTai(ss, explicitIdOrSku, topicStr, subjectStr) {
  ss = ss || getMasterSpreadsheet();
  var bSheet = ss.getSheetByName("Kho_BTL");
  var rawKey = String(explicitIdOrSku || "").trim();
  var normTopic = chuanHoaTen((topicStr || "") + " " + (subjectStr || ""));
  var fallbackFirst = null;

  if (bSheet) {
    var bData = bSheet.getDataRange().getValues();
    for (var i = 1; i < bData.length; i++) {
      var rSku = String(bData[i][0] || "").trim();
      var rName = String(bData[i][1] || "").trim();
      var fullId = extractDriveId(bData[i][2] || bData[i][6]);
      var prevId = extractDriveId(bData[i][4] || bData[i][5]);
      if (!fullId) continue;

      var item = {
        sku: rSku || "BTL",
        name: rName || topicStr || "Bài Tập Lớn / Tiểu Luận",
        fileId: fullId,
        previewId: prevId || FOLDER_BTL_CHECK_ID,
        link: "https://drive.google.com/file/d/" + fullId + "/view",
        previewLink: prevId ? ("https://drive.google.com/file/d/" + prevId + "/view") : ("https://drive.google.com/drive/folders/" + FOLDER_BTL_CHECK_ID)
      };
      if (!fallbackFirst) fallbackFirst = item;

      if (rawKey && (rSku.toUpperCase() === rawKey.toUpperCase() || fullId === rawKey)) {
        return item;
      }
      var normRow = chuanHoaTen(rName);
      if (normTopic && normRow && (normTopic.indexOf(normRow) !== -1 || normRow.indexOf(normTopic) !== -1)) {
        return item;
      }
    }
  }

  if (rawKey && /^[a-zA-Z0-9_-]{20,}$/.test(rawKey)) {
    return {
      sku: "BTL",
      name: topicStr || "Bài Tập Lớn / Tiểu Luận",
      fileId: rawKey,
      previewId: FOLDER_BTL_CHECK_ID,
      link: "https://drive.google.com/file/d/" + rawKey + "/view",
      previewLink: "https://drive.google.com/drive/folders/" + FOLDER_BTL_CHECK_ID
    };
  }

  if (fallbackFirst) {
    return {
      sku: fallbackFirst.sku,
      name: topicStr || fallbackFirst.name,
      fileId: FOLDER_BTL_FULL_ID,
      previewId: fallbackFirst.previewId || FOLDER_BTL_CHECK_ID,
      link: "https://drive.google.com/drive/folders/" + FOLDER_BTL_FULL_ID,
      previewLink: fallbackFirst.previewLink
    };
  }

  return {
    sku: "BTL",
    name: topicStr || "Bài Tập Lớn / Tiểu Luận",
    fileId: FOLDER_BTL_FULL_ID,
    previewId: FOLDER_BTL_CHECK_ID,
    link: "https://drive.google.com/drive/folders/" + FOLDER_BTL_FULL_ID,
    previewLink: "https://drive.google.com/drive/folders/" + FOLDER_BTL_CHECK_ID
  };
}

function kiemTraDonHoanThanh(ss) {
  if (!ss || typeof ss.getSheetByName !== "function") {
    ss = getMasterSpreadsheet();
  }
  var btlSheet = getSheetByAliases_(ss, ["Don_BTL_DichVu", "Đơn Hàng Bài Tập Lớn"]);
  if (!btlSheet) return;

  var nowMs = new Date().getTime();
  var data = btlSheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var orderCode = String(data[i][0] || "").trim();
    var name      = String(data[i][1] || "Khách Hàng").trim();
    var phone     = sanitizeCustomerPhone(data[i][2]);
    var email     = String(data[i][3] || "").trim().toLowerCase();
    var topic     = String(data[i][5] || "").trim();
    var deadline  = data[i][6];
    var totalAmt  = Number(String(data[i][7] || "500000").replace(/[^0-9]/g, "")) || 500000;
    var fileId    = extractDriveId(data[i][10]);
    var status    = String(data[i][11] || "").trim().toUpperCase();
    var delivered = String(data[i][12] || "").trim();

    if (!orderCode || !email || email.indexOf("@") === -1) continue;
    if (delivered.indexOf("ĐÃ GIAO") !== -1) continue;

    var deadlineMs = parseDeadlineMs(deadline);
    var isCompletedManual = (status === "HOÀN THÀNH" || status === "ĐÃ THANH TOÁN ĐỦ" || status === "PAID_SUCCESS");
    var isDeadlineDue = ((status === "ĐÃ CỌC" || status === "ĐANG LÀM") && deadlineMs > 0 && nowMs >= deadlineMs);

    if (isCompletedManual || isDeadlineDue) {
      var btlMatched = timFileBtlTheoDeTai(ss, fileId || orderCode, topic, "");
      var resolvedFileId = fileId || btlMatched.fileId || FOLDER_BTL_FULL_ID;
      var isFolderLink = (resolvedFileId === FOLDER_BTL_FULL_ID || resolvedFileId === FOLDER_BTL_CHECK_ID);
      var resolvedLink = isFolderLink
        ? ("https://drive.google.com/drive/folders/" + resolvedFileId)
        : ("https://drive.google.com/file/d/" + resolvedFileId + "/view");

      var product = {
        sku: orderCode,
        name: "Bài Tập Lớn / Tiểu Luận: " + topic,
        fileId: resolvedFileId,
        isCourse: false,
        link: resolvedLink
      };
      var ok = giaoTaiLieuTuKhoPhu(email, name, orderCode, product, totalAmt, "BTL");
      if (ok) {
        if (!fileId && resolvedFileId) {
          try { btlSheet.getRange(i + 1, 11).setValue(resolvedFileId); } catch (eSetK) {}
        }
        btlSheet.getRange(i + 1, 12).setValue("ĐÃ GIAO BÀI");
        btlSheet.getRange(i + 1, 13).setValue(
          isDeadlineDue
            ? "diepvientailieu@gmail.com ĐÃ GIAO (Tự động đúng hạn Deadline)"
            : "diepvientailieu@gmail.com ĐÃ GIAO"
        );
        capNhatTaiKhoanKhachHang(ss, email, name, phone, orderCode, totalAmt, "", "");
        setOrderStatusCache(orderCode, {
          ok: true,
          orderCode: orderCode,
          orderType: "BTL",
          status: "ĐÃ GIAO BÀI",
          paid: true,
          verified: true,
          btlDelivered: true,
          topic: topic,
          deadline: String(deadline || ""),
          driveUrl: resolvedLink,
          fullDriveUrl: resolvedLink,
          previewDriveUrl: btlMatched ? btlMatched.previewLink : ""
        }, 21600);
        banTelegram(
          "🎉 <b>[ĐÃ TỰ ĐỘNG BÀN GIAO BÀI TẬP LỚN ĐÚNG HẠN]</b>\n" +
          "━━━━━━━━━━━━━━━━━━\n" +
          "🆔 Mã đơn: <code>" + escTgHtml(orderCode) + "</code>\n" +
          "👤 Sinh viên: <b>" + escTgHtml(name) + "</b>" + (phone ? (" · 📞 <code>" + escTgHtml(phone) + "</code>") : "") + " (<code>" + escTgHtml(email) + "</code>)\n" +
          "📚 Đề tài: <b>" + escTgHtml(topic) + "</b>\n" +
          "📅 Hạn nộp: <b>" + escTgHtml(String(deadline || "Hoàn thành")) + "</b>\n" +
          "🔗 Link Google Drive: " + escTgHtml(resolvedLink)
        );
      }
    }
  }
}

// =========================================================================
// 7. TÌM SẢN PHẨM TRONG KhoTaiLieu, Kho_BTL HOẶC COURSE_DRIVE_MAP (KHỚP THÔNG MINH)
// =========================================================================
function timSanPham(ss, sku, fallbackName, amount, explicitDriveId) {
  var rawSku = String(sku || "").trim().toUpperCase();
  var strippedSku = rawSku.replace(/^DC/, "").replace(/\d+$/, "");
  var titleU = String(fallbackName || "").trim().toUpperCase();
  var normFallback = chuanHoaTen(fallbackName || "");
  var cleanExplicitId = extractDriveId(explicitDriveId || "");

  if (rawSku === "ALL-COURSES-399K" || rawSku === "FULL-COMBO-399K" || Number(amount || 0) >= 399000 || titleU.indexOf("TẤT CẢ KHÓA") !== -1) {
    var allCourse = COURSE_DRIVE_MAP["ALL-COURSES-399K"];
    return {
      sku: "ALL-COURSES-399K",
      name: allCourse.name,
      fileId: allCourse.folderId,
      extraFolderIds: allCourse.extraFolderIds || [],
      isCourse: true,
      link: "https://drive.google.com/drive/folders/" + allCourse.folderId
    };
  }
  if (COURSE_DRIVE_MAP[rawSku]) {
    var c = COURSE_DRIVE_MAP[rawSku];
    return {
      sku: rawSku,
      name: fallbackName || c.name,
      fileId: c.folderId,
      extraFolderIds: c.extraFolderIds || [],
      isCourse: true,
      link: "https://drive.google.com/drive/folders/" + c.folderId
    };
  }

  var kSheet = ss.getSheetByName("KhoTaiLieu");
  if (kSheet) {
    var data = kSheet.getDataRange().getValues();
    var byStripped = null;
    var byName = null;
    var byDriveId = null;

    for (var i = 1; i < data.length; i++) {
      var rowSku = String(data[i][0] || "").trim().toUpperCase();
      var rowName = String(data[i][1] || "").trim();
      var fid = extractDriveId(data[i][3] || data[i][4]);
      if (!rowSku || !fid) continue;

      var col4 = String(data[i][4] || "");
      var col5 = String(data[i][5] || "").toLowerCase();
      var isFolder = (
        rowSku.indexOf("COURSE-") === 0 ||
        rowSku.indexOf("SUBJ-") === 0 ||
        rowSku === "ALL-COURSES-399K" ||
        col4.indexOf("/folders/") !== -1 ||
        col5.indexOf("folder") !== -1 ||
        col5.indexOf("thư mục") !== -1
      );
      var itemObj = {
        sku: data[i][0],
        name: rowName || fallbackName,
        fileId: fid,
        extraFolderIds: [],
        isCourse: (rowSku.indexOf("COURSE-") === 0 || rowSku.indexOf("SUBJ-") === 0 || rowSku === "ALL-COURSES-399K"),
        link: isFolder ? ("https://drive.google.com/drive/folders/" + fid) : ("https://drive.google.com/file/d/" + fid + "/view")
      };

      if (cleanExplicitId && fid === cleanExplicitId) byDriveId = itemObj;
      if (rowSku === rawSku) return itemObj;
      if (!byStripped && strippedSku && rowSku === strippedSku) byStripped = itemObj;
      var normRow = chuanHoaTen(rowName);
      if (!byName && normFallback && normRow && (normRow === normFallback || normFallback.indexOf(normRow) !== -1 || normRow.indexOf(normFallback) !== -1)) {
        byName = itemObj;
      }
    }

    if (byDriveId) return byDriveId;
    if (byStripped) return byStripped;
    if (byName) return byName;
  }

  var bSheet = ss.getSheetByName("Kho_BTL");
  if (bSheet) {
    var bData = bSheet.getDataRange().getValues();
    for (var j = 1; j < bData.length; j++) {
      var bRowSku = String(bData[j][0] || "").trim().toUpperCase();
      var bFid = extractDriveId(bData[j][2] || bData[j][6]);
      if ((bRowSku && bRowSku === rawSku) || (cleanExplicitId && bFid === cleanExplicitId)) {
        return {
          sku: bData[j][0],
          name: bData[j][1] || fallbackName,
          fileId: bFid,
          extraFolderIds: [],
          isCourse: false,
          link: "https://drive.google.com/file/d/" + bFid + "/view"
        };
      }
    }
  }

  if (cleanExplicitId && cleanExplicitId !== FOLDER_DE_CUONG_ID) {
    return {
      sku: rawSku || "DC",
      name: fallbackName || rawSku,
      fileId: cleanExplicitId,
      extraFolderIds: [],
      isCourse: false,
      link: "https://drive.google.com/file/d/" + cleanExplicitId + "/view"
    };
  }

  return {
    sku: rawSku,
    name: fallbackName || rawSku,
    fileId: FOLDER_DE_CUONG_ID,
    extraFolderIds: [],
    isCourse: false,
    link: "https://drive.google.com/drive/folders/" + FOLDER_DE_CUONG_ID
  };
}

// =========================================================================
// 8. CẤP QUYỀN DRIVE SONG SONG (< 0.4s) & GỌI WEBHOOK PHÁT EMAIL THƯƠNG HIỆU
// =========================================================================
function capQuyenNhieuIdDriveSongSong(fids, email, orderCode, itemName) {
  if (!fids || !fids.length || !email || email.indexOf("@") === -1) return;
  var cleanIds = [];
  for (var i = 0; i < fids.length; i++) {
    var id = String(fids[i] || "").trim();
    if (id && id !== "undefined" && cleanIds.indexOf(id) === -1) cleanIds.push(id);
  }
  if (cleanIds.length === 0) return;

  try {
    var oauthToken = ScriptApp.getOAuthToken();
    var headers = { Authorization: "Bearer " + oauthToken };
    var reqs = [];
    for (var j = 0; j < cleanIds.length; j++) {
      var notifyQuery = (j === 0)
        ? ("sendNotificationEmail=true&emailMessage=" + encodeURIComponent("🎓 [ĐIỆP VIÊN TÀI LIỆU] Bàn giao đơn hàng #" + (orderCode || "DVTL") + " (" + (itemName || "Tài liệu học tập") + "). Bấm nút Mở (Open) để vào học ngay!"))
        : "sendNotificationEmail=false";
      reqs.push({
        url: "https://www.googleapis.com/drive/v3/files/" + cleanIds[j] + "/permissions?" + notifyQuery,
        method: "post",
        contentType: "application/json",
        headers: headers,
        payload: JSON.stringify({ role: "reader", type: "user", emailAddress: email }),
        muteHttpExceptions: true
      });
    }
    UrlFetchApp.fetchAll(reqs);
  } catch (eBatchPerm) {}
}

function capQuyenMotIdDrive(fid, email, orderCode, itemName) {
  capQuyenNhieuIdDriveSongSong([fid], email, orderCode, itemName);
}

function giaoTaiLieuTuKhoPhu(email, name, orderCode, product, amount, orderType) {
  if (!email || email.indexOf("@") === -1) return false;
  var cleanEmail = String(email).trim().toLowerCase();
  var isCourseOrder = Boolean(product.isCourse) || String(orderType || "").toUpperCase().indexOf("KHÓA") !== -1 || Boolean(COURSE_DRIVE_MAP[product.sku]);
  var finalOrderType = isCourseOrder ? "Khóa Học Bản Quyền (Tặng App 1 Máy)" : (orderType || "Mua Đề Cương");
  var cleanLink = product.link || (product.fileId ? (isCourseOrder ? ("https://drive.google.com/drive/folders/" + product.fileId + "?usp=sharing") : ("https://drive.google.com/file/d/" + product.fileId + "/view?usp=sharing")) : "");

  var extras = product.extraFolderIds || (COURSE_DRIVE_MAP[product.sku] ? COURSE_DRIVE_MAP[product.sku].extraFolderIds : []) || [];
  var allIds = [];
  if (product.fileId) allIds.push(product.fileId);
  for (var exIdx = 0; exIdx < extras.length; exIdx++) {
    if (extras[exIdx] && allIds.indexOf(extras[exIdx]) === -1) allIds.push(extras[exIdx]);
  }

  // 1. Cấp quyền song song ngay lập tức từ teamtccm@gmail.com (~0.35s)
  if (allIds.length > 0) {
    capQuyenNhieuIdDriveSongSong(allIds, cleanEmail, orderCode, product.name);
  }

  // 2. Gọi 1 lần duy nhất sang Kho Phụ (diepvientailieu@gmail.com) để cấp quyền chủ sở hữu & gửi Email thương hiệu + App Invite
  var mailSentByKho = false;
  if (KHO_PHAT_FILE_WEBHOOK_URL && KHO_PHAT_FILE_WEBHOOK_URL.indexOf("https://") === 0) {
    try {
      var payload = {
        secret: KHO_SECRET_KEY,
        email: cleanEmail,
        name: name,
        orderCode: orderCode,
        itemName: product.name,
        productName: product.name,
        orderType: finalOrderType,
        isCourse: isCourseOrder,
        fileId: product.fileId,
        extraFolderIds: extras,
        fileLink: cleanLink,
        amount: amount
      };
      var res = UrlFetchApp.fetch(KHO_PHAT_FILE_WEBHOOK_URL, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      });
      var json = JSON.parse(res.getContentText() || "{}");
      if (json && (json.ok || json.status === "SUCCESS")) {
        mailSentByKho = true;
        if (json.accessUrl) cleanLink = json.accessUrl;
      }
    } catch (e) {}
  }

  // 3. Chỉ gửi Email dự phòng từ teamtccm nếu Kho Phụ gặp sự cố (Chống gửi trùng lặp nhiều mail!)
  if (!mailSentByKho) {
    try {
      var propsMail = PropertiesService.getScriptProperties();
      var mailKey = "DELIVERY_MAIL_CLEAN_" + String(orderCode || cleanEmail).replace(/[^A-Za-z0-9_-]/g, "");
      if (!propsMail.getProperty(mailKey)) {
        propsMail.setProperty(mailKey, String(new Date().getTime()));
        guiEmailBanGiaoDuPhong(cleanEmail, name, orderCode, product.name, cleanLink, finalOrderType, isCourseOrder);
        mailSentByKho = true;
      }
    } catch (eMail) {
      try {
        guiEmailBanGiaoDuPhong(cleanEmail, name, orderCode, product.name, cleanLink, finalOrderType, isCourseOrder);
        mailSentByKho = true;
      } catch (eMail2) {}
    }
  }
  return mailSentByKho;
}

function guiEmailBanGiaoDuPhong(email, name, orderCode, itemName, accessUrl, orderType, isCourse) {
  var isBTL = String(orderType || "").toUpperCase().indexOf("BTL") !== -1;
  var isCourseOrder = Boolean(isCourse) || String(orderType || "").toUpperCase().indexOf("KHÓA") !== -1;
  var badgeTitle = isCourseOrder
    ? "BÀN GIAO KHÓA HỌC &amp; TẶNG APP ĐIỆP VIÊN STUDY 🎓"
    : (isBTL ? "BÀN GIAO BÀI TẬP LỚN / TIỂU LUẬN 🎓" : "BÀN GIAO ĐỀ CƯƠNG &amp; TÀI LIỆU 🎓");
  var btnLabel = isCourseOrder
    ? "🚀 MỞ KHO KHÓA HỌC TRÊN GOOGLE DRIVE"
    : (isBTL ? "📂 MỞ BÀI TẬP LỚN TRÊN GOOGLE DRIVE" : "📂 MỞ ĐỀ CƯƠNG TRÊN GOOGLE DRIVE NGAY");
  var linkHtml = accessUrl
    ? '<div style="border-left:4px solid #2563eb;padding:16px 20px;margin:20px 0;background:#eff6ff;border-radius:10px;">' +
        '<div style="font-size:13px;color:#1e40af;font-weight:bold;margin-bottom:8px;">🔐 1. QUYỀN TRUY CẬP GOOGLE DRIVE ĐÃ MỞ CHO EMAIL CỦA BẠN:</div>' +
        '<a href="' + accessUrl + '" style="display:inline-block;background:#2563eb;color:#ffffff;font-weight:bold;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:15px;">' + btnLabel + '</a>' +
        '<p style="font-size:12px;color:#475569;margin:10px 0 0;">📌 Quyền truy cập được cấp riêng cho <b>' + email + '</b> (Đã khóa chia sẻ sang tài khoản thứ 2).</p>' +
      '</div>'
    : '';
  var bonusAppHtml = isCourseOrder
    ? '<div style="border-left:4px solid #10b981;padding:16px 20px;margin:20px 0;background:#ecfdf5;border-radius:10px;">' +
        '<div style="font-size:13px;color:#065f46;font-weight:bold;margin-bottom:8px;">🎁 2. TẶNG KÈM APP ĐIỆP VIÊN STUDY (TÀI KHOẢN LÀ EMAIL CỦA BẠN):</div>' +
        '<p style="font-size:13px;color:#1e293b;margin:6px 0;line-height:1.5;">' +
          '• <b>Tài khoản đăng nhập App:</b> <b>' + email + '</b> (Đã kích hoạt sẵn khóa học!)<br>' +
          '• <b>Bảo mật 1 thiết bị:</b> Tài khoản chỉ được phép đăng nhập và sử dụng trên <b>01 máy duy nhất</b>, không thể chia sẻ sang máy thứ 2 hoặc tài khoản thứ 2.' +
        '</p>' +
      '</div>'
    : '';
  var htmlBody =
    '<div style="max-width:580px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:16px;">' +
      '<div style="background:linear-gradient(135deg,#0D1677 0%,#1e3a8a 100%);padding:28px 24px;text-align:center;border-radius:14px 14px 0 0;">' +
        '<div style="display:inline-block;background:rgba(255,255,255,0.15);color:#93c5fd;padding:4px 14px;border-radius:999px;font-size:11px;font-weight:bold;letter-spacing:1px;margin-bottom:10px;">OFFICIAL WAREHOUSE • DIEPVIENTAILIEU</div>' +
        '<h1 style="color:#ffffff;margin:0;font-size:21px;">' + badgeTitle + '</h1>' +
      '</div>' +
      '<div style="padding:28px 24px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 14px 14px;">' +
        '<p style="color:#1e293b;font-size:15px;margin-top:0;">Xin chào <b>' + (name || "Bạn") + '</b>,</p>' +
        '<p style="color:#334155;font-size:14px;line-height:1.6;">Cảm ơn bạn đã tin tưởng sử dụng dịch vụ tại <b>Điệp Viên Tài Liệu</b>. Đơn hàng <b>#' + orderCode + '</b> (<b>' + itemName + '</b>) của bạn đã được xác nhận hoàn tất:</p>' +
        linkHtml +
        bonusAppHtml +
        '<div style="margin-top:24px;padding-top:16px;border-top:1px dashed #e2e8f0;font-size:12px;color:#64748b;text-align:center;">' +
          '🌐 Website: <a href="https://diepvientailieu.store" style="color:#2563eb;font-weight:bold;">diepvientailieu.store</a> &nbsp;|&nbsp; 💬 Zalo Hỗ Trợ: <b>0792 453 169</b>' +
        '</div>' +
      '</div>' +
    '</div>';
  MailApp.sendEmail({
    to: email,
    name: "Điệp Viên Tài Liệu",
    replyTo: "diepvientailieu@gmail.com",
    subject: "[ĐIỆP VIÊN TÀI LIỆU] Bàn giao #" + orderCode + " — " + itemName,
    htmlBody: htmlBody
  });
  try {
    guiEmailMoiDungAppMienPhiTccm(email, name, orderCode, itemName);
  } catch (eInv) {}
}

function guiEmailMoiDungAppMienPhiTccm(email, name, orderCode, itemName) {
  var cleanEmail = String(email || "").trim().toLowerCase();
  if (!cleanEmail || cleanEmail.indexOf("@") === -1) return false;
  var dedupKey = "APP_INVITE_SENT_" + String(orderCode || cleanEmail).replace(/[^A-Za-z0-9_@-]/g, "");
  try {
    var props = PropertiesService.getScriptProperties();
    if (orderCode && props.getProperty(dedupKey)) return true;
    if (orderCode) props.setProperty(dedupKey, String(new Date().getTime()));
  } catch (eProp) {}

  if (KHO_PHAT_FILE_WEBHOOK_URL && KHO_PHAT_FILE_WEBHOOK_URL.indexOf("https://") === 0) {
    try {
      var res = UrlFetchApp.fetch(KHO_PHAT_FILE_WEBHOOK_URL, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify({
          secret: KHO_SECRET_KEY,
          action: "send_app_invite",
          email: cleanEmail,
          name: name || "Bạn",
          orderCode: orderCode || "DVTL",
          itemName: itemName || "Khóa học & Tài liệu Điệp Viên"
        }),
        muteHttpExceptions: true
      });
      var j = JSON.parse(res.getContentText() || "{}");
      if (j && (j.ok || j.status === "SUCCESS")) return true;
    } catch (eKhoInv) {}
  }

  try {
    var displayName = String(name || "Bạn").trim() || "Bạn";
    var winUrl = "https://drive.usercontent.google.com/download?id=15IeJcRng3aF15EAue5qDmo-C5Xbnc6ny&export=download&confirm=t";
    var macUrl = "https://drive.usercontent.google.com/download?id=1PoEK3LzLr6isibG5oZe2APalg4GWI0W_&export=download&confirm=t";
    var pdfGuideUrl = "https://diepvientailieu.store/Huong_Dan_Cai_Dat.pdf";
    var htmlBody =
      '<div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:16px;">' +
        '<div style="background:linear-gradient(135deg,#0D1677 0%,#1e3a8a 100%);padding:28px 24px;text-align:center;border-radius:14px 14px 0 0;">' +
          '<div style="display:inline-block;background:rgba(255,255,255,0.16);color:#fde047;padding:4px 14px;border-radius:999px;font-size:11px;font-weight:bold;letter-spacing:1px;margin-bottom:10px;">QUÀ TẶNG ĐẶC QUYỀN • APP DIEP VIEN STUDY</div>' +
          '<h1 style="color:#ffffff;margin:0;font-size:20px;">MỜI BẠN DÙNG MIỄN PHÍ BỘ CÔNG CỤ AI TRÊN APP DIEP VIEN STUDY</h1>' +
        '</div>' +
        '<div style="padding:26px 24px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 14px 14px;">' +
          '<p style="color:#1e293b;font-size:15px;margin-top:0;">Xin chào <b>' + displayName + '</b>,</p>' +
          '<p style="color:#334155;font-size:14px;line-height:1.6;">Cảm ơn bạn vừa giao dịch đơn hàng <b>#' + (orderCode || "DVTL") + '</b> (' + (itemName || "Khóa học & Tài liệu") + '). Hệ thống đã <b>lưu trữ thông tin tài khoản (' + cleanEmail + ')</b> của bạn để từ lần sau khi mua bất kỳ khóa học hay đề cương nào trên Web &amp; App, mã QR giao dịch sẽ tự động điền sẵn tên và email của bạn mà không cần nhập lại lần 2.</p>' +
          '<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 18px;margin:18px 0;font-size:13.5px;color:#1e293b;line-height:1.7;">' +
            '<div style="font-weight:bold;color:#065f46;margin-bottom:8px;">4 TÍNH NĂNG HỌC TẬP AI MIỄN PHÍ 100% TRONG APP DIEP VIEN STUDY:</div>' +
            '<b>1. Ghi Âm Bài Giảng &amp; Tóm Tắt AI Tự Động</b><br>' +
            '<b>2. Phiên Dịch Cabin Đa Ngôn Ngữ 0.2 Giây</b><br>' +
            '<b>3. Chuyển Đổi PDF Sang Word (.docx) Giữ Nguyên Công Thức</b><br>' +
            '<b>4. Sơ Đồ Tư Duy Mindmap AI &amp; Luyện Gõ Thuật Ngữ</b>' +
          '</div>' +
          '<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:18px;margin:18px 0;text-align:center;">' +
            '<a href="' + winUrl + '" style="display:inline-block;background:#0D1677;color:#ffffff;font-weight:bold;padding:11px 18px;border-radius:8px;text-decoration:none;font-size:13px;margin:4px;">TẢI CHO WINDOWS (.EXE 1-CLICK)</a>' +
            '<a href="' + macUrl + '" style="display:inline-block;background:#1e293b;color:#ffffff;font-weight:bold;padding:11px 18px;border-radius:8px;text-decoration:none;font-size:13px;margin:4px;">TẢI CHO MACOS (.ZIP)</a><br>' +
            '<a href="' + pdfGuideUrl + '" style="display:inline-block;background:#ffffff;color:#2563eb;border:1px solid #2563eb;font-weight:bold;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:12.5px;margin-top:8px;">HƯỚNG DẪN CÀI ĐẶT PDF</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    MailApp.sendEmail({
      to: cleanEmail,
      name: "APP Diep Vien study",
      replyTo: "diepvientailieu@gmail.com",
      subject: "[APP DIEP VIEN STUDY] Mời bạn dùng miễn phí Bộ Công Cụ Học Tập AI (TK: " + cleanEmail + ")",
      htmlBody: htmlBody
    });
    return true;
  } catch (eFallbackInv) {}
  return false;
}

// =========================================================================
// 9. API ĐÓN ĐƠN HÀNG SIÊU TỐC + BÁO TELEGRAM TỨC THÌ KHI CÓ KHÁCH ĐẶT ĐƠN
// =========================================================================
function sendNewOrderTelegramOnce(orderCode, orderType, custName, custEmail, cleanPhone, itemSku, itemName, orderAmt, schoolStr) {
  // Đã tắt thông báo khi mới tạo đơn nháp (chưa trả tiền) theo yêu cầu:
  // Telegram chỉ nhận thông báo khi Khách Mua Hàng Thành Công, Bàn Giao Thành Công và Tổng Kết Doanh Thu Cuối Tháng.
  return;
}

function upsertDonDeCuong(ss, bankInfo, orderInput) {
  var oSheet = getSheetByAliases_(ss, ["Don_De_Cuong", "Đơn Hàng Đề Cương"]);
  var nowStr = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");
  var orderCode = String(orderInput.orderCode || ("DV" + Math.floor(100000 + Math.random() * 900000))).trim().toUpperCase();
  var orderType = String(orderInput.orderType || "Mua Đề Cương").trim();
  var custName = String(orderInput.name || "Khách Hàng").trim();
  var custEmail = String(orderInput.email || "").trim().toLowerCase();
  var cleanPhone = sanitizeCustomerPhone(orderInput.phone);
  var deviceId = extractDeviceIdFromInputs(orderInput.deviceId, orderInput.phone);
  var itemSku = String(orderInput.sku || "").trim();
  var itemName = String(orderInput.itemName || itemSku || "Tài liệu Điệp Viên").trim();
  var orderAmt = Number(String(orderInput.amount || 50000).replace(/[^0-9]/g, "")) || 50000;
  var driveId = extractDriveId(orderInput.driveId || "");
  var schoolStr = String(orderInput.school || "").trim();

  if (custEmail && custEmail.indexOf("@") !== -1) {
    try {
      dongBoHoSoKhachHangChuan(ss, {
        email: custEmail,
        name: custName,
        phone: cleanPhone,
        deviceId: deviceId,
        source: "ORDER_" + orderType
      });
    } catch (eSync) {}
  }

  var oData = oSheet.getDataRange().getValues();
  var existingRow = -1;
  var existingStatus = "";
  var existingMailNote = "";
  var prevRowArr = null;
  for (var i = oData.length - 1; i >= 1; i--) {
    if (String(oData[i][1] || "").trim().toUpperCase() === orderCode) {
      existingRow = i + 1;
      prevRowArr = oData[i];
      existingStatus = String(oData[i][10] || "").trim().toUpperCase();
      existingMailNote = String(oData[i][11] || "").trim();
      break;
    }
  }

  if (existingRow > 0 && prevRowArr) {
    var updatedRow = [
      prevRowArr[0] || nowStr,
      orderCode,
      orderType || prevRowArr[2] || "Mua Đề Cương",
      custName || prevRowArr[3] || "Khách Hàng",
      custEmail || prevRowArr[4] || "",
      cleanPhone ? ("'" + cleanPhone) : (prevRowArr[5] || ""),
      itemSku || prevRowArr[6] || "",
      itemName || prevRowArr[7] || "",
      orderAmt || prevRowArr[8] || 50000,
      prevRowArr[9] || bankInfo.bankName,
      prevRowArr[10] || "PENDING",
      prevRowArr[11] || "Chờ xác thực Email biến động số dư ACB",
      prevRowArr[12] || bankInfo.accountNo,
      driveId || prevRowArr[13] || ""
    ];
    oSheet.getRange(existingRow, 1, 1, 14).setValues([updatedRow]);

    // Nếu lúc mới mở modal chưa có email/SĐT, giờ khách điền xong -> bắn thông báo đơn mới 1 lần duy nhất
    if (existingStatus !== "PAID_SUCCESS" && existingStatus !== "DONE") {
      sendNewOrderTelegramOnce(orderCode, orderType, custName, custEmail, cleanPhone, itemSku, itemName, orderAmt, schoolStr);
    }

    if ((existingStatus === "PAID_SUCCESS" || existingStatus === "DONE") && custEmail && existingMailNote.indexOf("ĐÃ GIAO") === -1) {
      var prodNow = timSanPham(ss, itemSku, itemName, orderAmt, driveId);
      var okNow = giaoTaiLieuTuKhoPhu(custEmail, custName, orderCode, prodNow, orderAmt, orderType);
      if (okNow) {
        oSheet.getRange(existingRow, 12).setValue("diepvientailieu@gmail.com ĐÃ GIAO");
      }
    }
    return { orderCode: orderCode, isNew: false, status: existingStatus || "PENDING" };
  }

  var newDcRow = [
    nowStr,
    orderCode,
    orderType,
    custName,
    custEmail,
    cleanPhone ? "'" + cleanPhone : "",
    itemSku,
    itemName,
    orderAmt,
    bankInfo.bankName,
    "PENDING",
    "Chờ xác thực Email biến động số dư ACB",
    bankInfo.accountNo,
    driveId
  ];
  oSheet.appendRow(newDcRow);

  // Đồng bộ trực tiếp vào tab Tiếng Việt trên Sheet Tổng
  try {
    var isKhoaHoc = (String(orderType).toUpperCase().indexOf("KHÓA") !== -1 || orderCode.indexOf("KH") === 0 || String(itemSku).indexOf("COURSE") === 0 || String(itemSku).indexOf("ALL-") === 0);
    var mTabName = isKhoaHoc ? "Đơn Hàng Khóa Học" : "Đơn Hàng Đề Cương";
    var mTab = ss.getSheetByName(mTabName);
    if (mTab) {
      mTab.appendRow([
        nowStr, orderCode, orderType, custName, custEmail, cleanPhone ? "'" + cleanPhone : "",
        itemSku, itemName, orderAmt, bankInfo.bankName, bankInfo.accountNo,
        "Chờ thanh toán", "Chờ xác thực ACB", driveId
      ]);
    }
  } catch (eMirrorDc) {}

  setOrderStatusCache(orderCode, {
    ok: true,
    orderCode: orderCode,
    status: "PENDING",
    paid: false,
    verified: false,
    email: custEmail,
    sku: itemSku,
    itemName: itemName
  }, 1800);

  // Báo ngay về Telegram cho Admin nắm được khách vừa lên đơn mới!
  sendNewOrderTelegramOnce(orderCode, orderType, custName, custEmail, cleanPhone, itemSku, itemName, orderAmt, schoolStr);

  return { orderCode: orderCode, isNew: true, status: "PENDING" };
}

function upsertDonBtlDichVu(ss, bankInfo, body) {
  var btlSheet = getSheetByAliases_(ss, ["Don_BTL_DichVu", "Đơn Hàng Bài Tập Lớn"]);
  var cust = body.customer || {};
  var assign = body.assignment || {};

  var sCode = String(body.orderCode || body.orderId || ("COCBTL" + Math.floor(1000 + Math.random() * 9000))).trim().toUpperCase();
  var sName = String(body.name || cust.name || "Khách Hàng").trim();
  var rawPhone = String(body.phone || body.zalo || cust.phone || "");
  var sPhone = sanitizeCustomerPhone(rawPhone);
  var sDeviceId = extractDeviceIdFromInputs(body.deviceId, rawPhone);
  var sEmail = String(body.email || cust.email || "").trim().toLowerCase();
  var sSchool = String(body.school || cust.school || "").trim();
  var sFaculty = String(body.faculty || cust.faculty || "").trim();
  var schoolFull = sFaculty ? (sSchool + " - " + sFaculty) : sSchool;

  var sType = String(body.serviceType || assign.type || "BTL").toUpperCase();
  var sSubject = String(body.subject || assign.subject || "").trim();
  var sTopic = String(body.topic || assign.topic || "").trim();
  var sPages = String(body.pages || assign.pages || "15").trim();
  var sReq = String(body.requirements || "").trim();
  var fullTopic = sTopic.indexOf("[") === 0
    ? sTopic
    : ("[" + sType + "] " + (sSubject ? sSubject + ": " : "") + sTopic + " (" + sPages + " trang)" + (sReq ? " — YC: " + sReq : ""));

  var sDeadline = String(body.deadline || assign.deadline || "").trim();
  var rawTotal = body.totalEstimate || body.totalPrice || assign.totalEst || "500000";
  var rawDep = body.depositAmount || body.deposit || assign.depositAmount || "50000";
  var totalEst = Number(String(rawTotal).replace(/[^0-9]/g, "")) || 500000;
  var depositAmt = Number(String(rawDep).replace(/[^0-9]/g, "")) || 50000;
  var remainAmt = Math.max(0, totalEst - depositAmt);

  var matchedBtl = timFileBtlTheoDeTai(ss, body.fileId || body.driveId || body.sku || sCode, fullTopic, sSubject);
  var resolvedFileId = extractDriveId(body.fileId || body.driveId || (matchedBtl ? matchedBtl.fileId : ""));
  var attachments = Array.isArray(body.attachments) ? body.attachments : (Array.isArray(body.files) ? body.files : []);
  var reqFileUrl = saveBtlRequirementFilesToDrive_(sCode, sName, attachments) || String(body.reqFileUrl || "").trim();
  var remainCode = buildBtlRemainCode_(sCode);
  var remainQrUrl = buildBtlRemainQrUrl_(bankInfo.accountNo, remainAmt, remainCode);

  if (sEmail && sEmail.indexOf("@") !== -1) {
    try {
      dongBoHoSoKhachHangChuan(ss, {
        email: sEmail,
        name: sName,
        phone: sPhone,
        deviceId: sDeviceId,
        source: "ORDER_BTL_DICHVU"
      });
    } catch (eSyncBtl) {}
  }

  var bData = btlSheet.getDataRange().getValues();
  for (var i = bData.length - 1; i >= 1; i--) {
    var rCode = String(bData[i][0] || "").trim().toUpperCase();
    var rCoc = "COC" + rCode.replace(/^DAT_/, "");
    if (rCode === sCode || rCoc === sCode) {
      var rowNum = i + 1;
      var prevB = bData[i];
      var finalReqUrl = reqFileUrl || (prevB.length >= 16 ? String(prevB[15] || "") : "");
      var finalRemCode = buildBtlRemainCode_(rCode);
      var finalRemAmt = remainAmt || Number(String(prevB[9] || "0").replace(/[^0-9]/g, "")) || 0;
      var finalRemQrUrl = buildBtlRemainQrUrl_(bankInfo.accountNo, finalRemAmt, finalRemCode);
      var finalRemQrCell = finalRemQrUrl ? ('=IMAGE("' + finalRemQrUrl + '", 1)') : "";
      btlSheet.getRange(rowNum, 1, 1, 11).setValues([[
        rCode,
        sName || prevB[1],
        sPhone ? ("'" + sPhone) : prevB[2],
        sEmail || prevB[3],
        schoolFull || prevB[4],
        fullTopic || prevB[5],
        sDeadline || prevB[6],
        totalEst || prevB[7],
        depositAmt || prevB[8],
        finalRemAmt,
        resolvedFileId || prevB[10] || ""
      ]]);
      btlSheet.getRange(rowNum, 16, 1, 3).setValues([[finalReqUrl, finalRemCode, finalRemQrCell]]);
      return { orderCode: rCode, isNew: false, reqFileUrl: finalReqUrl, remainCode: finalRemCode, remainQrUrl: finalRemQrUrl };
    }
  }

  var remainQrCell = remainQrUrl ? ('=IMAGE("' + remainQrUrl + '", 1)') : "";
  var newBtlRow = [
    sCode,
    sName,
    sPhone ? "'" + sPhone : "",
    sEmail,
    schoolFull,
    fullTopic,
    sDeadline,
    totalEst,
    depositAmt,
    remainAmt,
    resolvedFileId,
    "CHỜ CỌC 10%",
    "Chờ xác thực Email biến động số dư ACB",
    bankInfo.accountNo,
    "Hệ thống Tự động & CTV Học Thuật",
    reqFileUrl,
    remainCode,
    remainQrCell
  ];
  btlSheet.appendRow(newBtlRow);
  try { btlSheet.setRowHeight(btlSheet.getLastRow(), 140); } catch (eRh) {}

  // Đồng bộ trực tiếp vào tab Tiếng Việt 'Đơn Hàng Bài Tập Lớn' trên Sheet Tổng (nếu khác tab hiện tại)
  try {
    var mBtlTab = ss.getSheetByName("Đơn Hàng Bài Tập Lớn");
    if (mBtlTab && mBtlTab.getName() !== btlSheet.getName()) {
      mBtlTab.appendRow(newBtlRow);
    }
  } catch (eMirrorBtl) {}

  setOrderStatusCache(sCode, {
    ok: true,
    orderCode: sCode,
    orderType: "BTL",
    status: "CHỜ CỌC 10%",
    paid: false,
    verified: false,
    topic: fullTopic,
    deadline: sDeadline,
    remainAmt: remainAmt,
    remainCode: remainCode,
    remainQrUrl: remainQrUrl,
    reqFileUrl: reqFileUrl
  }, 1800);

  // Gửi ngay thẻ Đơn BTL Mới lên Telegram kèm link file yêu cầu (Kho 06) + nút QR Cọc & QR Thu Nốt
  try {
    var tgBtlProps = PropertiesService.getScriptProperties();
    var tgNewBtlKey = "TG_NEW_BTL_" + sCode;
    if (!tgBtlProps.getProperty(tgNewBtlKey) || reqFileUrl) {
      tgBtlProps.setProperty(tgNewBtlKey, String(new Date().getTime()));
      banTelegram(
        "📝 <b>[ĐƠN BTL MỚI LÊN WEB — CHỜ ĐẶT CỌC]</b>\n" +
        "━━━━━━━━━━━━━━━━━━\n" +
        "🆔 Mã đơn: <code>" + escTgHtml(sCode) + "</code>\n" +
        "👤 Khách hàng: <b>" + escTgHtml(sName) + "</b>" + (sPhone ? (" · 📞 <code>" + escTgHtml(sPhone) + "</code>") : "") + "\n" +
        "📧 Email: <code>" + escTgHtml(sEmail || "Chưa nhập") + "</code>\n" +
        (schoolFull ? ("🏫 Trường/Khoa: " + escTgHtml(schoolFull) + "\n") : "") +
        "📚 Đề tài: <b>" + escTgHtml(fullTopic) + "</b>\n" +
        "📅 Hạn nộp: <b>" + escTgHtml(sDeadline || "Theo yêu cầu") + "</b>\n" +
        "💵 Tổng dự kiến: <b>" + totalEst.toLocaleString("vi-VN") + " đ</b> · Cọc: <b>" + depositAmt.toLocaleString("vi-VN") + " đ</b> · Còn lại: <b>" + remainAmt.toLocaleString("vi-VN") + " đ</b>\n" +
        (reqFileUrl ? ("📎 File yêu cầu (Kho 06): " + escTgHtml(reqFileUrl) + "\n") : "") +
        "💡 <i>Khách chuyển khoản đúng mã là tự động xác thực cọc!</i>",
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "💳 QR Cọc 10%", callback_data: "tg_depqr:" + sCode },
                { text: "💳 QR Thu Nốt", callback_data: "tg_qr:" + sCode }
              ],
              [
                { text: "🔄 Quét Email ACB Ngay", callback_data: "tg_scan" },
                { text: "🎛️ Menu Tổng", callback_data: "tg_tab:menu:0" }
              ]
            ]
          }
        }
      );
    }
  } catch (eTgNewBtl) {}

  try {
    if (sEmail && sEmail.indexOf("@") !== -1) {
      guiEmailMoiDungAppMienPhiTccm(sEmail, sName, sCode, fullTopic);
    }
  } catch (eBtlCreateInv) {}

  return { orderCode: sCode, isNew: true, reqFileUrl: reqFileUrl, remainCode: remainCode, remainQrUrl: remainQrUrl };
}

function doPost(e) {
  var body = {};
  try {
    body = JSON.parse(e.postData.contents);
  } catch (eJson) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, status: "ERROR", error: "Invalid JSON payload" })).setMimeType(ContentService.MimeType.JSON);
  }

  // ── LUỒNG 0: NHẬN WEBHOOK 2 CHIỀU TỪ TELEGRAM BOT (@diepvien_pay_bot) ──
  if (body && typeof body.update_id !== "undefined") {
    try {
      var cacheTg = getScriptCacheSafe();
      var dedupKey = "TG_UPD_" + String(body.update_id);
      if (cacheTg && cacheTg.get(dedupKey)) {
        return HtmlService.createHtmlOutput("OK");
      }
      if (cacheTg) {
        try { cacheTg.put(dedupKey, "1", 21600); } catch (ePutTg) {}
      }
      handleTelegramWebhookUpdate_(body);
    } catch (eTgHook) {}
    return HtmlService.createHtmlOutput("OK");
  }

  // Các API không cần khóa toàn cục (gửi mail mời dùng App) xử lý ngay không chờ Lock
  if (body.action === "send_app_invite" || body.action === "sendAppInvite") {
    var invOk = guiEmailMoiDungAppMienPhiTccm(body.email, body.name, body.orderCode || "INVITE", body.itemName || "Khóa học & Tài liệu Điệp Viên");
    return jsonOut({ ok: true, status: "INVITE_SENT", sent: invOk });
  }

  var lock = LockService.getScriptLock();
  lock.tryLock(8000);
  try {
    var ss = getMasterSpreadsheet();
    var bankInfo = layTaiKhoanNganHangActive(ss);

    if (body.action === "syncWarehouse") {
      var syncResult = dongBoKhoTaiLieu(ss);
      invalidateProductsCache();
      return jsonOut({ ok: true, status: "SYNCED", result: syncResult });
    }

    if (body.action === "flushCustomerMirrors") {
      return jsonOut({ ok: true, result: flushPendingCustomerMirrors() });
    }

    if (body.action === "addOutline") {
      var kSheetAdd = ss.getSheetByName("KhoTaiLieu");
      var rawAddName = String(body.name || "").trim();
      var rawAddId = extractDriveId(body.fileId || body.driveUrl || "");
      var rawAddPrice = Number(body.price) || 50000;
      var rawIsFolder = Boolean(body.isFolder);
      if (!rawAddName || !rawAddId) {
        return jsonOut({ ok: false, status: "ERROR", error: "Missing name or fileId" });
      }
      var kDataAdd = kSheetAdd.getDataRange().getValues();
      var usedAddSkus = {};
      var matchedRowIdx = -1;
      for (var a = 1; a < kDataAdd.length; a++) {
        var sCode = String(kDataAdd[a][0] || "").trim().toUpperCase();
        var sFid = extractDriveId(kDataAdd[a][3] || kDataAdd[a][4]);
        if (sCode) usedAddSkus[sCode] = true;
        if (sFid === rawAddId) matchedRowIdx = a + 1;
      }
      var finalAddSku = String(body.sku || "").trim().toUpperCase() || taoSKU(rawAddName, usedAddSkus);
      var addUrl = rawIsFolder
        ? ("https://drive.google.com/drive/folders/" + rawAddId)
        : ("https://drive.google.com/file/d/" + rawAddId + "/view");
      var addGroup = phanNhomNganh(rawAddName);
      var dispAdd = rawAddName.replace(/\.(docx?|pdf|xlsx?|pptx?)$/i, "").replace(/^(Bộ\s+)?Đề\s+Cương\s+/i, "").trim();

      if (matchedRowIdx > 0) {
        kSheetAdd.getRange(matchedRowIdx, 1, 1, 6).setValues([[
          finalAddSku,
          rawAddName,
          rawAddPrice,
          rawAddId,
          '=HYPERLINK("' + addUrl + '", "🔗 Click Mở: ' + dispAdd.replace(/"/g, "") + '")',
          addGroup + " • Ủy quyền: teamtccm@gmail.com"
        ]]);
      } else {
        kSheetAdd.appendRow([
          finalAddSku,
          rawAddName,
          rawAddPrice,
          rawAddId,
          '=HYPERLINK("' + addUrl + '", "🔗 Click Mở: ' + dispAdd.replace(/"/g, "") + '")',
          addGroup + " • Ủy quyền: teamtccm@gmail.com"
        ]);
      }
      invalidateProductsCache();
      return jsonOut({
        ok: true,
        status: "ADDED",
        sku: finalAddSku,
        name: rawAddName,
        driveId: rawAddId,
        driveUrl: addUrl,
        group: addGroup
      });
    }

    if (body.action === "sendAppOtp") {
      return jsonOut(guiMaOtpXacThucApp(ss, body.email, body.name, body.phone));
    }

    if (body.action === "verifyAppOtp") {
      return jsonOut(xacThucMaOtpApp(ss, body.email, body.otp, body.name, body.phone, body.deviceId));
    }

    if (body.action === "verifyAppDeviceLogin" || body.action === "verifyAccountDevice" || body.action === "getCustomerSync") {
      var syncResPost = kiemTraVaKhoaThietBiApp(ss, body.email, body.deviceId, body.deviceName);
      return jsonOut(syncResPost);
    }

    if (body.action === "registerOrLoginCustomer") {
      var cEmail = String(body.email || "").trim().toLowerCase();
      var cName = String(body.name || "Học Viên Điệp Viên").trim();
      var cPhone = sanitizeCustomerPhone(body.phone);
      var cDevId = extractDeviceIdFromInputs(body.deviceId, body.phone);
      var cPass = String(body.password || "").trim();
      var cSource = String(body.source || "WEB_DIEPVIEN_STORE").trim();
      if (cEmail && cEmail.indexOf("@") !== -1) {
        dongBoHoSoKhachHangChuan(ss, {
          email: cEmail,
          name: cName,
          phone: cPhone,
          password: cPass,
          deviceId: cDevId,
          source: cSource
        });
      }
      return jsonOut({ ok: true, status: "OK", email: cEmail });
    }

    if (body.action === "service_order" || body.type === "SERVICE_ORDER" || body.action === "createBTLOrder") {
      var btlRes = upsertDonBtlDichVu(ss, bankInfo, body);
      return jsonOut({
        ok: true,
        status: "OK",
        orderCode: btlRes.orderCode,
        reqFileUrl: btlRes.reqFileUrl || "",
        remainCode: btlRes.remainCode || "",
        remainQrUrl: btlRes.remainQrUrl || "",
        bank: bankInfo
      });
    }

    var ordRes = upsertDonDeCuong(ss, bankInfo, {
      orderCode: body.orderCode || body.orderId,
      orderType: body.orderType || (body.type === "COURSE_REGISTRATION" ? "Khóa Học" : "Mua Đề Cương"),
      name: body.name,
      email: body.email,
      phone: body.phone,
      deviceId: body.deviceId,
      sku: body.sku,
      itemName: body.itemName || body.sku,
      amount: body.amount || body.price || 50000,
      driveId: body.driveId || "",
      school: body.school || ""
    });

    return jsonOut({ ok: true, status: "OK", orderCode: ordRes.orderCode, bank: bankInfo });
  } catch (err) {
    return jsonOut({ ok: false, status: "ERROR", error: err.toString() });
  } finally {
    try { lock.releaseLock(); } catch (eUnlock) {}
  }
}

function doGet(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  var action = String(p.action || "").trim();
  var cache = getScriptCacheSafe();

  // ── FAST PATH 1: getActiveAccount từ RAM Cache (< 0.05s, KHÔNG mở SpreadsheetApp!) ──
  if (action === "getActiveAccount") {
    var bankFast = layTaiKhoanNganHangActive(null);
    return jsonOut({
      ok: true,
      bankName: bankFast.bankName,
      bankCode: bankFast.bankCode,
      accountNumber: bankFast.accountNo,
      accountNo: bankFast.accountNo,
      accountName: bankFast.accountName,
      bank: bankFast
    });
  }

  // ── FAST PATH 2: getProducts từ RAM Cache (< 0.08s, KHÔNG mở SpreadsheetApp!) ──
  if (action === "getProducts" && p.nocache !== "1") {
    var cachedProdStr = getProductsCache();
    if (cachedProdStr) {
      return ContentService.createTextOutput(cachedProdStr).setMimeType(ContentService.MimeType.JSON);
    }
  }

  // ── FAST PATH 3: verify / check_status từ RAM Cache (< 0.05s khi đã PAID hoặc vừa quét Gmail < 6s) ──
  var checkCode = String(p.orderCode || p.orderId || "").trim().toUpperCase();
  var isVerifyAction = (action === "check_status" || action === "verify" || action === "checkPayment" || action === "checkStatus");
  if (isVerifyAction && checkCode && p.manual !== "1") {
    var cachedOrd = getOrderStatusCache(checkCode);
    if (cachedOrd && cachedOrd.paid === true) {
      return jsonOut(cachedOrd);
    }
    if (cachedOrd && cachedOrd.status === "PENDING" && cache) {
      var lastScanTs = Number(cache.get("LAST_GMAIL_SCAN_TS_V7") || "0");
      var reqHasNewEmail = (p.email && String(p.email).indexOf("@") !== -1 && !cachedOrd.email);
      if (!reqHasNewEmail && lastScanTs > 0 && (new Date().getTime() - lastScanTs < 6000)) {
        return jsonOut({
          ok: true,
          orderCode: checkCode,
          status: "PENDING",
          paid: false,
          verified: false,
          cachedFast: true
        });
      }
    }
  }

  var ss = getMasterSpreadsheet();
  var bankInfo = layTaiKhoanNganHangActive(ss);

  // 2. Lấy danh sách Đề Cương thực tế từ KhoTaiLieu (có lưu Cache 10 phút)
  if (action === "getProducts") {
    var kSheet = ss.getSheetByName("KhoTaiLieu");
    if (!kSheet) return jsonOut([]);
    var kData = kSheet.getDataRange().getValues();
    var products = [];
    for (var i = 1; i < kData.length; i++) {
      var sku = String(kData[i][0] || "").trim();
      var rawName = String(kData[i][1] || "").trim();
      if (!sku || !rawName) continue;
      var skuU = sku.toUpperCase();
      if (skuU.indexOf("COURSE-") === 0 || skuU.indexOf("SUBJ-") === 0 || skuU === "ALL-COURSES-399K" || COURSE_DRIVE_MAP[skuU]) continue;
      if (isIgnoredSystemFile(rawName) || /^DC_\d{4}$/.test(skuU)) continue;
      var fid = extractDriveId(kData[i][3] || kData[i][4]);
      if (!fid) continue;
      var col4 = String(kData[i][4] || "");
      var col5 = String(kData[i][5] || "");
      var isFld = (col4.indexOf("/folders/") !== -1 || col5.toLowerCase().indexOf("folder") !== -1 || col5.toLowerCase().indexOf("thư mục") !== -1);
      products.push({
        sku: sku,
        name: rawName,
        price: Number(kData[i][2]) || 50000,
        driveId: fid,
        driveType: isFld ? "folder" : "file",
        group: col5.split("•")[0].trim()
      });
    }
    putProductsCache(products);
    return jsonOut(products);
  }

  if (action === "syncWarehouse") {
    var syncResGet = dongBoKhoTaiLieu(ss);
    invalidateProductsCache();
    return jsonOut({ ok: true, status: "SYNCED", result: syncResGet });
  }

  if (action === "flushCustomerMirrors") {
    return jsonOut({ ok: true, result: flushPendingCustomerMirrors() });
  }

  if (action === "ensureTriggers" || action === "setupTriggers") {
    setupHeThongTuDong();
    var activeTrigs = ScriptApp.getProjectTriggers().map(function(t) { return t.getHandlerFunction(); });
    return jsonOut({ ok: true, status: "TRIGGERS_ACTIVE", triggers: activeTrigs });
  }

  if (action === "registerOrLoginCustomer" && p.email) {
    dongBoHoSoKhachHangChuan(ss, {
      email: p.email,
      name: p.name || "Học Viên Điệp Viên",
      phone: p.phone || "",
      deviceId: p.deviceId || "",
      source: p.source || "WEB_GET_SYNC"
    });
    return jsonOut({ ok: true, status: "OK", email: String(p.email).trim().toLowerCase() });
  }

  if (action === "createOrder") {
    var gRes = upsertDonDeCuong(ss, bankInfo, {
      orderCode: p.orderCode || p.orderId,
      orderType: p.orderType || "Mua File",
      name: p.name || "Khách Hàng",
      email: p.email || "",
      phone: p.phone || "",
      deviceId: p.deviceId || "",
      sku: p.sku || "",
      itemName: p.itemName || p.sku || "",
      amount: p.price || p.amount || 50000,
      driveId: p.driveId || "",
      school: p.school || ""
    });
    return jsonOut({ ok: true, status: "OK", orderCode: gRes.orderCode });
  }

  if (action === "createBTLOrder" || action === "service_order") {
    var gBtl = upsertDonBtlDichVu(ss, bankInfo, p);
    return jsonOut({ ok: true, status: "OK", orderCode: gBtl.orderCode });
  }

  if ((action === "getCustomerSync" || action === "verifyAppDeviceLogin" || action === "verifyAccountDevice") && p.email) {
    var cleanSyncEmail = String(p.email).trim().toLowerCase();
    var syncCacheKey = "CUST_SYNC_V7_" + cleanSyncEmail + "_" + String(p.deviceId || "");
    if (!p.name && !p.phone && cache) {
      var cachedSync = cache.get(syncCacheKey);
      if (cachedSync) {
        return ContentService.createTextOutput(cachedSync).setMimeType(ContentService.MimeType.JSON);
      }
    }
    if (p.name || p.phone) {
      try {
        dongBoHoSoKhachHangChuan(ss, {
          email: p.email,
          name: p.name || "",
          phone: p.phone || "",
          deviceId: p.deviceId || "",
          source: "APP_DEVICE_VERIFY"
        });
      } catch (ePreSync) {}
    }
    var syncRes = kiemTraVaKhoaThietBiApp(ss, p.email, p.deviceId || "", p.deviceName || "");
    if (cache && syncRes && syncRes.ok) {
      try { cache.put(syncCacheKey, JSON.stringify(syncRes), 180); } catch (ePutSync) {}
    }
    return jsonOut(syncRes);
  }

  // 5. Kiểm tra trạng thái thanh toán đơn hàng SIÊU TỐC (verify / check_status)
  if (isVerifyAction && checkCode) {
    var oSheet = getSheetByAliases_(ss, ["Don_De_Cuong", "Đơn Hàng Đề Cương"]);
    var bSheet = getSheetByAliases_(ss, ["Don_BTL_DichVu", "Đơn Hàng Bài Tập Lớn"]);
    var isBtlCheck = (String(p.orderType || "").toLowerCase() === "btl" || checkCode.indexOf("COC") === 0 || checkCode.indexOf("BTL") === 0);

    var findDocOrderRow = function() {
      if (!oSheet) return null;
      var data = oSheet.getDataRange().getValues();
      var matchedRow = -1;
      var matchedData = null;
      for (var i = data.length - 1; i >= 1; i--) {
        if (String(data[i][1] || "").trim().toUpperCase() === checkCode) {
          var is13Row = (data[i].length >= 11 && (String(data[i][4] || "").indexOf("@") !== -1 || ["Mua File", "Mua Đề Cương", "Khóa Học"].indexOf(String(data[i][2] || "")) !== -1));
          var stRow = String(is13Row ? data[i][10] : data[i][8] || "").trim().toUpperCase();
          if (matchedRow === -1 || stRow === "PAID_SUCCESS" || stRow === "DONE" || stRow === "ĐÃ THANH TOÁN") {
            matchedRow = i + 1;
            matchedData = data[i];
            if (stRow === "PAID_SUCCESS" || stRow === "DONE" || stRow === "ĐÃ THANH TOÁN") break;
          }
        }
      }
      if (!matchedData) return null;
      var is13 = (matchedData.length >= 11 && (String(matchedData[4] || "").indexOf("@") !== -1 || ["Mua File", "Mua Đề Cương", "Khóa Học"].indexOf(String(matchedData[2] || "")) !== -1));
      var st = String(is13 ? matchedData[10] : matchedData[8] || "").trim().toUpperCase();
      return {
        row: matchedRow,
        data: matchedData,
        is13: is13,
        st: st,
        isPaid: (st === "PAID_SUCCESS" || st === "DONE" || st === "ĐÃ THANH TOÁN")
      };
    };

    var docFound = !isBtlCheck ? findDocOrderRow() : null;

    if (!docFound && !isBtlCheck && (p.email || p.sku || p.itemName || p.amount || checkCode.indexOf("DC") === 0 || checkCode.indexOf("DV") === 0)) {
      try {
        upsertDonDeCuong(ss, bankInfo, {
          orderCode: checkCode,
          orderType: p.orderType || (checkCode.indexOf("DV") === 0 ? "Khóa Học" : "Mua File"),
          name: p.name || "Khách Hàng",
          email: p.email || "",
          phone: p.phone || "",
          deviceId: p.deviceId || "",
          sku: p.sku || "",
          itemName: p.itemName || p.sku || checkCode,
          amount: p.amount || p.price || 50000,
          driveId: p.driveId || ""
        });
        docFound = findDocOrderRow();
      } catch (eAutoUpsert) {}
    } else if (docFound && !docFound.isPaid && p.email && String(p.email).indexOf("@") !== -1) {
      var curRowEmail = String(docFound.is13 ? docFound.data[4] : docFound.data[3] || "").trim();
      var curRowDrive = (docFound.is13 && docFound.data.length >= 14) ? String(docFound.data[13] || "").trim() : "";
      if (!curRowEmail || (p.driveId && !curRowDrive)) {
        try {
          upsertDonDeCuong(ss, bankInfo, {
            orderCode: checkCode,
            orderType: p.orderType || (docFound.is13 ? docFound.data[2] : "Mua File"),
            name: p.name || (docFound.is13 ? docFound.data[3] : docFound.data[2]),
            email: p.email,
            phone: p.phone || (docFound.is13 ? docFound.data[5] : docFound.data[4]),
            deviceId: p.deviceId || "",
            sku: p.sku || (docFound.is13 ? docFound.data[6] : docFound.data[5]),
            itemName: p.itemName || (docFound.is13 ? docFound.data[7] : docFound.data[6]),
            amount: p.amount || (docFound.is13 ? docFound.data[8] : docFound.data[7]),
            driveId: p.driveId || curRowDrive
          });
          docFound = findDocOrderRow();
        } catch (eUpdPending) {}
      }
    }

    // Chỉ quét Gmail nếu đơn CHƯA thanh toán VÀ lần quét gần nhất cách đây >= 6 giây (hoặc khách bấm Kiểm tra thủ công manual=1)
    if (!docFound || !docFound.isPaid) {
      var lastTs = cache ? Number(cache.get("LAST_GMAIL_SCAN_TS_V7") || "0") : 0;
      var shouldScanNow = (p.manual === "1") || (new Date().getTime() - lastTs >= 6000);
      if (shouldScanNow) {
        var scanLock = LockService.getScriptLock();
        if (scanLock.tryLock(400)) {
          try {
            if (cache) cache.put("LAST_GMAIL_SCAN_TS_V7", String(new Date().getTime()), 60);
            scanBankEmailsAndDeliver(ss, true);
            if (isBtlCheck) kiemTraDonHoanThanh(ss);
          } catch (errScan) {} finally {
            try { scanLock.releaseLock(); } catch (eRel) {}
          }
        }
        if (!isBtlCheck) {
          docFound = findDocOrderRow();
        }
      }
    }

    if (docFound && docFound.data) {
      var matchedData = docFound.data;
      var matchedRow = docFound.row;
      var is13 = docFound.is13;
      var st = docFound.st;
      var isPaidDoc = docFound.isPaid;
      var vType = is13 ? String(matchedData[2] || "Mua Đề Cương") : "Mua Đề Cương";
      var vSku = String(is13 ? matchedData[6] : matchedData[5] || p.sku || "").trim();
      var vTitle = String(is13 ? matchedData[7] : matchedData[6] || p.itemName || "").trim();
      var vAmt = Number(String(is13 ? matchedData[8] : matchedData[7] || p.amount || "50000").replace(/[^0-9]/g, "")) || 50000;
      var vEmail = String(is13 ? matchedData[4] : matchedData[3] || p.email || "").trim().toLowerCase();
      var vName = String(is13 ? matchedData[3] : matchedData[2] || p.name || "Khách Hàng").trim();
      var vPhone = sanitizeCustomerPhone(is13 ? matchedData[5] : matchedData[4]);
      var vDriveId = (is13 && matchedData.length >= 14 ? String(matchedData[13] || "").trim() : "") || String(p.driveId || "").trim();
      var vMailCol = String(is13 ? matchedData[11] : matchedData[9] || "").trim();

      var vProd = null;
      var unlockedList = [];
      if (isPaidDoc) {
        vProd = timSanPham(ss, vSku, vTitle, vAmt, vDriveId);
        if (vEmail && vEmail.indexOf("@") !== -1 && vMailCol.indexOf("ĐÃ GIAO") === -1) {
          var deliveredNow = giaoTaiLieuTuKhoPhu(vEmail, vName, checkCode, vProd, vAmt, vType);
          if (deliveredNow) {
            try { oSheet.getRange(matchedRow, is13 ? 12 : 10).setValue("diepvientailieu@gmail.com ĐÃ GIAO"); } catch (eSetM) {}
          }
          try { capNhatTaiKhoanKhachHang(ss, vEmail, vName, vPhone, vProd ? vProd.sku : vSku, vAmt, p.deviceId || "", p.deviceName || ""); } catch (eCapTk) {}
        }
        var checkSku = String((vProd && vProd.sku) ? vProd.sku : vSku).toUpperCase();
        if (vAmt >= 399000) checkSku = "ALL-COURSES-399K";
        if (checkSku.indexOf("COURSE-") === 0 || checkSku.indexOf("SUBJ-") === 0 || checkSku === "ALL-COURSES-399K" || COURSE_DRIVE_MAP[checkSku]) {
          unlockedList = expandUnlockedCourses([checkSku]);
        }
      }

      var respObj = {
        ok: true,
        orderCode: checkCode,
        status: st,
        paid: isPaidDoc,
        verified: isPaidDoc,
        email: vEmail,
        sku: (vProd && vProd.sku) ? vProd.sku : vSku,
        itemName: (vProd && vProd.name) ? vProd.name : vTitle,
        driveUrl: (isPaidDoc && vProd) ? vProd.link : "",
        unlockedCourses: unlockedList,
        boundDeviceId: extractDeviceIdFromInputs(p.deviceId || "", "")
      };
      setOrderStatusCache(checkCode, respObj, isPaidDoc ? 21600 : 1800);
      return jsonOut(respObj);
    }

    if (bSheet) {
      var bData = bSheet.getDataRange().getValues();
      for (var j = bData.length - 1; j >= 1; j--) {
        var bCode = String(bData[j][0] || "").trim().toUpperCase();
        var cocCode = bCode.indexOf("COC") === 0 ? bCode : ("COC" + bCode.replace(/^DAT_/, ""));
        if (bCode === checkCode || cocCode === checkCode) {
          var bSt = String(bData[j][11] || "").trim().toUpperCase();
          var isPaidBtl = (bSt === "ĐÃ CỌC" || bSt === "ĐANG LÀM" || bSt === "HOÀN THÀNH" || bSt === "ĐÃ THANH TOÁN ĐỦ" || bSt === "ĐÃ GIAO BÀI" || bSt === "ĐÃ GIAO" || bSt === "PAID_SUCCESS");
          var isDeliveredBtl = (bSt === "ĐÃ GIAO BÀI" || bSt === "ĐÃ GIAO" || String(bData[j][12] || "").indexOf("ĐÃ GIAO") !== -1);
          var bTopic = String(bData[j][5] || "").trim();
          var bDeadline = String(bData[j][6] || "").trim();
          var bFileId = extractDriveId(bData[j][10]);
          var btlMatchInfo = isPaidBtl ? timFileBtlTheoDeTai(ss, bFileId || bCode, bTopic, "") : { link: "", previewLink: "" };
          var fullDriveUrl = isDeliveredBtl
            ? (bFileId ? ("https://drive.google.com/file/d/" + bFileId + "/view?usp=sharing") : btlMatchInfo.link)
            : "";
          var previewDriveUrl = isPaidBtl ? btlMatchInfo.previewLink : "";

          var bRemAmtV = Number(String(bData[j][9] || "0").replace(/[^0-9]/g, "")) || 0;
          var bRemCodeV = (bData[j].length >= 17 && String(bData[j][16] || "").trim()) ? String(bData[j][16] || "").trim() : buildBtlRemainCode_(bCode);
          var bRemQrV = (bData[j].length >= 18 && String(bData[j][17] || "").trim()) ? String(bData[j][17] || "").trim() : buildBtlRemainQrUrl_("27820961", bRemAmtV, bRemCodeV);
          var bRespObj = {
            ok: true,
            orderCode: checkCode,
            orderType: "BTL",
            status: bSt,
            paid: isPaidBtl,
            verified: isPaidBtl,
            btlDelivered: isDeliveredBtl,
            topic: bTopic,
            deadline: bDeadline,
            remainAmt: bRemAmtV,
            remainCode: bRemCodeV,
            remainQrUrl: bRemQrV,
            driveUrl: fullDriveUrl || previewDriveUrl,
            fullDriveUrl: fullDriveUrl,
            previewDriveUrl: previewDriveUrl
          };
          setOrderStatusCache(checkCode, bRespObj, isPaidBtl ? 21600 : 1800);
          return jsonOut(bRespObj);
        }
      }
    }

    return jsonOut({ ok: true, orderCode: checkCode, status: "NOT_FOUND", paid: false, verified: false });
  }

  return jsonOut({
    ok: true,
    system: "TRẠM ĐIỀU KHIỂN TỔNG & KHO CHÍNH CHỦ diepvientailieu@gmail.com (v8.0 UNIFIED TURBO)",
    bank: bankInfo,
    bankName: bankInfo.bankName,
    bankCode: bankInfo.bankCode,
    accountNumber: bankInfo.accountNo,
    accountName: bankInfo.accountName
  });
}

function layTaiKhoanNganHangActive(ss) {
  var cache = getScriptCacheSafe();
  if (cache) {
    try {
      var cachedBank = cache.get("ACTIVE_BANK_V8");
      if (cachedBank) return JSON.parse(cachedBank);
    } catch (eCb) {}
  }

  var fallbackBank = {
    bankName: "ACB",
    bankCode: "ACB",
    accountNo: "27820961",
    accountNumber: "27820961",
    accountName: "TRINH DUC THINH"
  };

  try {
    var activeSs = ss || getMasterSpreadsheet();
    var nhSheet = activeSs.getSheetByName("TaiKhoanNganHang");
    if (nhSheet) {
      var data = nhSheet.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        if (String(data[i][8] || "").toUpperCase() === "ACTIVE") {
          var stk = String(data[i][2] || "27820961").trim();
          fallbackBank = {
            bankName: String(data[i][0] || "ACB").trim(),
            bankCode: String(data[i][1] || "ACB").trim(),
            accountNo: stk,
            accountNumber: stk,
            accountName: String(data[i][3] || "TRINH DUC THINH").trim()
          };
          break;
        }
      }
    }
  } catch (eSheetBank) {}

  if (cache) {
    try { cache.put("ACTIVE_BANK_V8", JSON.stringify(fallbackBank), 1800); } catch (ePutB) {}
  }
  return fallbackBank;
}

function tgApiCall_(method, payload) {
  if (!TELEGRAM_BOT_TOKEN || !method) return null;
  var apiUrl = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/" + method;
  try {
    var res = UrlFetchApp.fetch(apiUrl, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload || {}),
      muteHttpExceptions: true
    });
    if (!res) return null;
    try { return JSON.parse(res.getContentText() || "{}"); } catch (eJ) { return null; }
  } catch (e) {
    return null;
  }
}

function banTelegram(text, opts) {
  if (!text || !TELEGRAM_BOT_TOKEN) return false;
  var o = opts || {};
  var targetChat = o.chat_id || TELEGRAM_GROUP_ID;
  var basePayload = {
    chat_id: targetChat,
    text: text,
    parse_mode: "HTML",
    disable_web_page_preview: o.disable_web_page_preview !== false
  };
  if (o.reply_markup) basePayload.reply_markup = o.reply_markup;
  if (o.reply_to_message_id) basePayload.reply_to_message_id = o.reply_to_message_id;
  if (o.message_thread_id) basePayload.message_thread_id = o.message_thread_id;

  var r1 = tgApiCall_("sendMessage", basePayload);
  if (r1 && r1.ok) return r1;

  // Fallback gỡ thẻ HTML nếu chứa ký tự đặc biệt
  var plainFallback = String(text)
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  var p2 = {
    chat_id: targetChat,
    text: plainFallback,
    disable_web_page_preview: true
  };
  if (o.reply_markup) p2.reply_markup = o.reply_markup;
  if (o.message_thread_id) p2.message_thread_id = o.message_thread_id;
  var r2 = tgApiCall_("sendMessage", p2);
  return (r2 && r2.ok) ? r2 : false;
}

function fetchVietQrPngBlob_(acct, amt, addInfo) {
  if (!TELEGRAM_BOT_TOKEN || !acct || amt <= 0 || !addInfo) return null;
  try {
    var res = UrlFetchApp.fetch("https://api.vietqr.io/v2/generate", {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        accountNo: String(acct),
        accountName: "TRINH DUC THINH",
        acqId: 970416,
        amount: Number(amt),
        addInfo: String(addInfo),
        format: "text",
        template: "compact2"
      }),
      muteHttpExceptions: true
    });
    if (!res || res.getResponseCode() !== 200) return null;
    var parsed = JSON.parse(res.getContentText() || "{}");
    var dataUrl = parsed && parsed.data ? String(parsed.data.qrDataURL || "") : "";
    var commaIdx = dataUrl.indexOf("base64,");
    if (commaIdx === -1) return null;
    var bytes = Utilities.base64Decode(dataUrl.substring(commaIdx + 7));
    return Utilities.newBlob(bytes, "image/png", "vietqr_" + String(addInfo).replace(/[^A-Za-z0-9_-]/g, "") + ".png");
  } catch (eVq) {
    return null;
  }
}

function sendTelegramPhoto_(chatId, photoUrl, captionHtml, replyMarkup, threadId) {
  if (!photoUrl || !TELEGRAM_BOT_TOKEN) return null;
  var targetChat = String(chatId || TELEGRAM_GROUP_ID);
  var safeCap = String(captionHtml || "").slice(0, 1000);

  // Nếu là link QR ACB (qr.sepay.vn hoặc img.vietqr.io), ưu tiên xuất PNG chính hãng từ VietQR API v2 gửi multipart trực tiếp
  var mAcct = photoUrl.match(/(?:acc=|ACB-)(\d{6,16})/i);
  var mAmt = photoUrl.match(/[?&]amount=(\d+)/i);
  var mMemo = photoUrl.match(/[?&](?:des|addInfo)=([^&]+)/i);
  if (mAcct && mAmt && mMemo) {
    var vqAcct = mAcct[1];
    var vqAmt = Number(mAmt[1] || 0);
    var vqMemo = decodeURIComponent(mMemo[1] || "");
    var pngBlob = fetchVietQrPngBlob_(vqAcct, vqAmt, vqMemo);
    if (pngBlob) {
      try {
        var mpPayload = {
          chat_id: targetChat,
          photo: pngBlob,
          caption: safeCap,
          parse_mode: "HTML"
        };
        if (replyMarkup) mpPayload.reply_markup = JSON.stringify(replyMarkup);
        if (threadId) mpPayload.message_thread_id = String(threadId);
        var mpRes = UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendPhoto", {
          method: "post",
          payload: mpPayload,
          muteHttpExceptions: true
        });
        if (mpRes) {
          var mpJson = JSON.parse(mpRes.getContentText() || "{}");
          if (mpJson && mpJson.ok) return mpJson;
        }
      } catch (eMp) {}
    }
    // Dự phòng PNG URL trực tiếp qua SePay QR nếu VietQR v2 API bận
    photoUrl = buildBtlRemainQrUrl_(vqAcct, vqAmt, vqMemo);
  }

  var payload = {
    chat_id: targetChat,
    photo: photoUrl,
    caption: safeCap,
    parse_mode: "HTML"
  };
  if (replyMarkup) payload.reply_markup = replyMarkup;
  if (threadId) payload.message_thread_id = threadId;
  var r = tgApiCall_("sendPhoto", payload);
  if (r && r.ok) return r;
  // Nếu Telegram không tự tải URL được, gửi fallback link ảnh
  return banTelegram((captionHtml || "") + "\n\n🖼️ <a href=\"" + escTgHtml(photoUrl) + "\">Mở Ảnh QR VietQR</a>", {
    chat_id: targetChat,
    reply_markup: replyMarkup,
    disable_web_page_preview: false,
    message_thread_id: threadId
  });
}

function editTelegramMsg_(chatId, msgId, textHtml, replyMarkup) {
  if (!chatId || !msgId) return banTelegram(textHtml, { chat_id: chatId, reply_markup: replyMarkup });
  var payload = {
    chat_id: chatId,
    message_id: msgId,
    text: textHtml,
    parse_mode: "HTML",
    disable_web_page_preview: true
  };
  if (replyMarkup) payload.reply_markup = replyMarkup;
  var r = tgApiCall_("editMessageText", payload);
  if (r && r.ok) return r;
  return banTelegram(textHtml, { chat_id: chatId, reply_markup: replyMarkup });
}

function kiemTraVaGuiBaoCaoCuoiThang(ss) {
  try {
    var now = new Date();
    var tomorrow = new Date(now.getTime() + 86400000);
    // Chỉ tự động gửi vào ngày cuối cùng của tháng, từ 21:00 trở đi
    if (tomorrow.getDate() === 1 && now.getHours() >= 21) {
      var monthStr = Utilities.formatDate(now, "GMT+7", "MM/yyyy");
      var props = PropertiesService.getScriptProperties();
      var sentKey = "TG_MONTHLY_REV_" + monthStr;
      if (!props.getProperty(sentKey)) {
        guiBaoCaoDoanhThuCuoiThangTelegram(ss, monthStr);
        props.setProperty(sentKey, String(now.getTime()));
      }
    }
  } catch (e) {}
}

function guiBaoCaoDoanhThuCuoiThangTelegram(ss, targetMonthStr, chatIdOverride, msgIdOverride) {
  ss = ss || getMasterSpreadsheet();
  var now = new Date();
  var monthStr = targetMonthStr || Utilities.formatDate(now, "GMT+7", "MM/yyyy");
  var parts = monthStr.split("/");
  var targetM = parts[0];
  var targetY = parts[1];

  var totalRev = 0;
  var dcCount = 0, dcRev = 0;
  var khCount = 0, khRev = 0;
  var btlCount = 0, btlRev = 0;

  var isInTargetMonth = function(dVal) {
    if (!dVal) return false;
    var s = String(dVal);
    return (s.indexOf(targetY + "-" + targetM) !== -1 || s.indexOf("/" + targetM + "/" + targetY) !== -1 || s.indexOf(targetM + "/" + targetY) !== -1);
  };

  var parseMoney = function(v) {
    return Number(String(v || "0").replace(/[^0-9]/g, "")) || 0;
  };

  var dcTab = ss.getSheetByName("Đơn Hàng Đề Cương");
  if (dcTab) {
    var dcRows = dcTab.getDataRange().getValues();
    for (var i = 1; i < dcRows.length; i++) {
      var st = String(dcRows[i][11] || "").toUpperCase();
      if ((st.indexOf("ĐÃ THANH TOÁN") !== -1 || st.indexOf("PAID") !== -1) && isInTargetMonth(dcRows[i][0])) {
        var amt = parseMoney(dcRows[i][8]);
        dcCount++; dcRev += amt; totalRev += amt;
      }
    }
  }

  var khTab = ss.getSheetByName("Đơn Hàng Khóa Học");
  if (khTab) {
    var khRows = khTab.getDataRange().getValues();
    for (var j = 1; j < khRows.length; j++) {
      var stK = String(khRows[j][11] || "").toUpperCase();
      if ((stK.indexOf("ĐÃ THANH TOÁN") !== -1 || stK.indexOf("PAID") !== -1) && isInTargetMonth(khRows[j][0])) {
        var amtK = parseMoney(khRows[j][8]);
        khCount++; khRev += amtK; totalRev += amtK;
      }
    }
  }

  var btlTab = ss.getSheetByName("Đơn Hàng Bài Tập Lớn");
  if (btlTab) {
    var btlRows = btlTab.getDataRange().getValues();
    for (var k = 1; k < btlRows.length; k++) {
      var stB = String(btlRows[k][11] || "").toUpperCase();
      if (stB.indexOf("ĐÃ") !== -1 || stB.indexOf("GIAO") !== -1 || stB.indexOf("HOÀN") !== -1) {
        var amtB = (stB.indexOf("CỌC") !== -1 && stB.indexOf("ĐỦ") === -1 && stB.indexOf("GIAO") === -1)
          ? parseMoney(btlRows[k][8]) : parseMoney(btlRows[k][7]);
        btlCount++; btlRev += amtB; totalRev += amtB;
      }
    }
  }

  var msg =
    "📊 <b>BÁO CÁO TỔNG KẾT DOANH THU THÁNG " + escTgHtml(monthStr) + "</b>\n" +
    "━━━━━━━━━━━━━━━━━━━━━━\n" +
    "📄 <b>Đề Cương Ôn Tập:</b> " + dcCount + " đơn — <b>" + dcRev.toLocaleString("vi-VN") + " VNĐ</b>\n" +
    "🎓 <b>Khóa Học Drive:</b> " + khCount + " đơn — <b>" + khRev.toLocaleString("vi-VN") + " VNĐ</b>\n" +
    "✍️ <b>Dịch Vụ Học Thuật (BTL):</b> " + btlCount + " đơn — <b>" + btlRev.toLocaleString("vi-VN") + " VNĐ</b>\n" +
    "━━━━━━━━━━━━━━━━━━━━━━\n" +
    "💰 <b>TỔNG DOANH THU THÁNG " + escTgHtml(monthStr) + ": " + totalRev.toLocaleString("vi-VN") + " VNĐ</b>\n" +
    "🏦 <i>Nguồn đối soát: Sheet Tổng DVTL (ACB 27820961)</i>";

  if (msgIdOverride) {
    return editTelegramMsg_(chatIdOverride || TELEGRAM_GROUP_ID, msgIdOverride, msg, {
      inline_keyboard: [[{ text: "⬅️ Quay Lại Tổng Quan", callback_data: "tg_tab:overview:0" }, { text: "🎛️ Menu Tổng", callback_data: "tg_tab:menu:0" }]]
    });
  }
  return banTelegram(msg, { chat_id: chatIdOverride || TELEGRAM_GROUP_ID });
}

// =========================================================================
// 11. TRẠM ĐIỀU KHIỂN VẬN HÀNH 2 CHIỀU TRÊN TELEGRAM (@diepvien_pay_bot)
//     (Drive chỉ lưu & phát file · Mọi kiểm tra, khách hàng & QR BTL chạy ngay trên Telegram)
// =========================================================================
function isAuthorizedTelegramSender_(chatId, fromUserId) {
  var cStr = String(chatId || "").trim();
  var uStr = String(fromUserId || "").trim();
  if (cStr === String(TELEGRAM_GROUP_ID) || cStr === String(ADMIN_CHAT_ID) || uStr === String(ADMIN_CHAT_ID)) {
    return true;
  }
  // Cho phép mọi Admin / Thành viên đã có mặt trong nhóm -5515040883 nhắn riêng cho bot
  if (uStr) {
    var cache = getScriptCacheSafe();
    var ck = "TG_AUTH_" + uStr;
    if (cache) {
      var cached = cache.get(ck);
      if (cached === "1") return true;
      if (cached === "0") return false;
    }
    var mRes = tgApiCall_("getChatMember", { chat_id: TELEGRAM_GROUP_ID, user_id: Number(uStr) });
    var st = mRes && mRes.ok && mRes.result ? String(mRes.result.status || "") : "";
    var allowed = (st === "creator" || st === "administrator" || st === "member");
    if (cache) {
      try { cache.put(ck, allowed ? "1" : "0", 1800); } catch (eC) {}
    }
    if (allowed) return true;
  }
  return false;
}

function getTgPersistentKeyboard_() {
  return {
    keyboard: [
      [{ text: "🎛️ Menu Tổng" }, { text: "💰 Biến Động ACB" }, { text: "📊 Tổng Quan" }],
      [{ text: "✍️ BTL Chờ Cọc" }, { text: "🔨 BTL Thu Nốt & QR" }, { text: "👤 Tra Khách Hàng" }],
      [{ text: "📄 Đề Cương" }, { text: "🎓 Khóa Học" }, { text: "🔄 Quét ACB Ngay" }]
    ],
    resize_keyboard: true,
    is_persistent: true
  };
}

function renderTgMenu_(chatId, msgId) {
  var text =
    "🎛️ <b>TRẠM ĐIỀU KHIỂN VẬN HÀNH — ĐIỆP VIÊN TÀI LIỆU</b>\n" +
    "━━━━━━━━━━━━━━━━━━━━━━\n" +
    "🏦 <b>Ngân hàng ACB:</b> <code>27820961</code> — <b>TRỊNH ĐỨC THỊNH</b>\n" +
    "📂 <b>Google Drive:</b> Lưu trữ &amp; Phân phối file tự động\n" +
    "⚡ <i>Chọn nhanh danh mục bên dưới để kiểm tra số liệu, hồ sơ khách &amp; xuất ảnh QR thu tiền tức thì:</i>";
  var kb = {
    inline_keyboard: [
      [
        { text: "📊 Tổng Quan & Doanh Thu", callback_data: "tg_tab:overview:0" },
        { text: "💰 Biến Động ACB", callback_data: "tg_tab:acb:0" }
      ],
      [
        { text: "✍️ BTL Chờ Cọc", callback_data: "tg_tab:btl_pending:0" },
        { text: "🔨 BTL Đã Cọc & QR Thu Nốt", callback_data: "tg_tab:btl_active:0" }
      ],
      [
        { text: "📄 Đơn Đề Cương", callback_data: "tg_tab:decuong:0" },
        { text: "🎓 Đơn Khóa Học", callback_data: "tg_tab:khoahoc:0" }
      ],
      [
        { text: "👤 Danh Sách Khách Hàng", callback_data: "tg_tab:customers:0" },
        { text: "🔍 Tìm Khách (SĐT/Email)", callback_data: "tg_findcust" }
      ],
      [
        { text: "📁 Kho Google Drive (01–06)", callback_data: "tg_tab:drive:0" },
        { text: "🔄 Quét Email ACB Ngay", callback_data: "tg_scan" }
      ]
    ]
  };
  if (msgId) return editTelegramMsg_(chatId, msgId, text, kb);
  banTelegram(text, { chat_id: chatId, reply_markup: kb });
  return tgApiCall_("sendMessage", {
    chat_id: chatId,
    text: "⌨️ <i>Đã ghim thanh phím tắt Trạm Điều Khiển phía dưới khung chat.</i>",
    parse_mode: "HTML",
    reply_markup: getTgPersistentKeyboard_()
  });
}

function parseMoneyVal_(v) {
  return Number(String(v || "0").replace(/[^0-9]/g, "")) || 0;
}

function renderTgOverview_(ss, chatId, msgId) {
  ss = ss || getMasterSpreadsheet();
  var khTab = ss.getSheetByName("Thông Tin Khách Hàng");
  var dcTab = getSheetByAliases_(ss, ["Đơn Hàng Đề Cương", "Don_De_Cuong"]);
  var kTab  = ss.getSheetByName("Đơn Hàng Khóa Học");
  var bTab  = getSheetByAliases_(ss, ["Đơn Hàng Bài Tập Lớn", "Don_BTL_DichVu"]);
  var gTab  = getSheetByAliases_(ss, ["Lịch Sử Giao Dịch ACB", "Lich_Su_GD"]);

  var custRows = khTab ? khTab.getDataRange().getValues() : [];
  var dcRows   = dcTab ? dcTab.getDataRange().getValues() : [];
  var kRows    = kTab ? kTab.getDataRange().getValues() : [];
  var bRows    = bTab ? bTab.getDataRange().getValues() : [];
  var gRows    = gTab ? gTab.getDataRange().getValues() : [];

  var totalCust = Math.max(0, custRows.length - 1);
  var paidCust = 0;
  for (var c = 1; c < custRows.length; c++) {
    var stC = String(custRows[c][5] || "").toUpperCase();
    if (stC.indexOf("ĐÃ THANH TOÁN") !== -1 || stC.indexOf("PAID") !== -1) paidCust++;
  }

  var dcPaid = 0, dcRev = 0, dcPend = 0;
  for (var d = 1; d < dcRows.length; d++) {
    var stD = String(dcRows[d][11] || dcRows[d][10] || "").toUpperCase();
    var aD = parseMoneyVal_(dcRows[d][8]);
    if (stD.indexOf("ĐÃ THANH TOÁN") !== -1 || stD.indexOf("PAID") !== -1) { dcPaid++; dcRev += aD; }
    else if (String(dcRows[d][1] || "").trim()) dcPend++;
  }

  var khPaid = 0, khRev = 0, khPend = 0;
  for (var k = 1; k < kRows.length; k++) {
    var stK = String(kRows[k][11] || "").toUpperCase();
    var aK = parseMoneyVal_(kRows[k][8]);
    if (stK.indexOf("ĐÃ THANH TOÁN") !== -1 || stK.indexOf("PAID") !== -1) { khPaid++; khRev += aK; }
    else if (String(kRows[k][1] || "").trim()) khPend++;
  }

  var bPend = 0, bActive = 0, bDone = 0, bRev = 0, bRemainTotal = 0;
  for (var b = 1; b < bRows.length; b++) {
    var bCode = String(bRows[b][0] || "").trim();
    if (!bCode) continue;
    var stB = String(bRows[b][11] || "").toUpperCase();
    var tB = parseMoneyVal_(bRows[b][7]);
    var depB = parseMoneyVal_(bRows[b][8]);
    var remB = parseMoneyVal_(bRows[b][9]) || Math.max(0, tB - depB);
    if (stB.indexOf("CHỜ") !== -1 || stB === "PENDING") {
      bPend++;
    } else if (stB === "ĐÃ CỌC" || stB === "ĐANG LÀM") {
      bActive++; bRev += depB; bRemainTotal += remB;
    } else if (stB.indexOf("ĐỦ") !== -1 || stB.indexOf("GIAO") !== -1 || stB.indexOf("HOÀN") !== -1) {
      bDone++; bRev += (tB || depB);
    }
  }

  var acbTotal = 0;
  for (var g = 1; g < gRows.length; g++) {
    var tG = String(gRows[g][3] || "").toUpperCase();
    if (tG.indexOf("GHI NỢ") === -1) acbTotal += parseMoneyVal_(gRows[g][4]);
  }

  var totalRev = dcRev + khRev + bRev;
  var nowStr = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm");
  var msg =
    "📊 <b>TỔNG QUAN HỆ THỐNG (LIVE · " + nowStr + ")</b>\n" +
    "━━━━━━━━━━━━━━━━━━━━━━\n" +
    "💰 <b>TỔNG DOANH THU GHI NHẬN:</b> <b>" + totalRev.toLocaleString("vi-VN") + " VNĐ</b>\n" +
    "🏦 <b>Tổng biến động có ACB (27820961):</b> " + acbTotal.toLocaleString("vi-VN") + " đ\n\n" +
    "📄 <b>Đề Cương 50K:</b> <b>" + dcPaid + "</b> đã TT (" + dcRev.toLocaleString("vi-VN") + " đ) · " + dcPend + " chờ\n" +
    "🎓 <b>Khóa Học Drive:</b> <b>" + khPaid + "</b> đã TT (" + khRev.toLocaleString("vi-VN") + " đ) · " + khPend + " chờ\n" +
    "✍️ <b>Bài Tập Lớn (BTL):</b> <b>" + bActive + "</b> đang làm · <b>" + bPend + "</b> chờ cọc · <b>" + bDone + "</b> đã giao (" + bRev.toLocaleString("vi-VN") + " đ)\n" +
    "⏳ <b>BTL chờ thu nốt:</b> <b>" + bRemainTotal.toLocaleString("vi-VN") + " VNĐ</b>\n\n" +
    "👤 <b>Hồ sơ khách hàng:</b> <b>" + totalCust + "</b> khách (" + paidCust + " khách đã mua)";

  var kb = {
    inline_keyboard: [
      [
        { text: "📊 Xuất Báo Cáo Tháng Này", callback_data: "tg_revmonth" },
        { text: "🔄 Quét ACB Ngay", callback_data: "tg_scan" }
      ],
      [
        { text: "🔨 BTL Cần Thu Nốt (" + bActive + ")", callback_data: "tg_tab:btl_active:0" },
        { text: "✍️ BTL Chờ Cọc (" + bPend + ")", callback_data: "tg_tab:btl_pending:0" }
      ],
      [{ text: "🎛️ Quay Lại Menu Tổng", callback_data: "tg_tab:menu:0" }]
    ]
  };
  return msgId ? editTelegramMsg_(chatId, msgId, msg, kb) : banTelegram(msg, { chat_id: chatId, reply_markup: kb });
}

function renderTgAcbList_(ss, chatId, page, msgId) {
  ss = ss || getMasterSpreadsheet();
  page = Math.max(0, Number(page || 0));
  var perPage = 6;
  var gTab = getSheetByAliases_(ss, ["Lịch Sử Giao Dịch ACB", "Lich_Su_GD"]);
  var rows = gTab ? gTab.getDataRange().getValues().slice(1).filter(function(r) { return String(r[0] || r[5] || "").trim(); }) : [];
  rows.reverse();
  var totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  if (page >= totalPages) page = totalPages - 1;
  var slice = rows.slice(page * perPage, (page + 1) * perPage);

  var lines = ["💰 <b>BIẾN ĐỘNG SỐ DƯ ACB (STK 27820961)</b> — Trang " + (page + 1) + "/" + totalPages, "━━━━━━━━━━━━━━━━━━━━━━"];
  if (!slice.length) {
    lines.push("<i>Chưa có dữ liệu giao dịch.</i>");
  } else {
    slice.forEach(function(r, idx) {
      var amtN = parseMoneyVal_(r[4]);
      var amtStr = amtN > 0 ? ("+" + amtN.toLocaleString("vi-VN") + " đ") : String(r[4] || "Biến động");
      var memo = String(r[5] || "").replace(/\s*\[MSG:[^\]]+\]/g, "").trim().slice(0, 75);
      lines.push(
        "<b>" + (page * perPage + idx + 1) + ".</b> <code>" + escTgHtml(String(r[0] || "")) + "</code> · <b>" + escTgHtml(amtStr) + "</b>\n" +
        "   • " + escTgHtml(String(r[3] || "")) + " (" + escTgHtml(String(r[7] || "Đã ghi nhận")) + ")\n" +
        "   • <code>" + escTgHtml(memo) + "</code>"
      );
    });
  }
  var navRow = [];
  if (page > 0) navRow.push({ text: "⬅️ Mới Hơn", callback_data: "tg_tab:acb:" + (page - 1) });
  if (page + 1 < totalPages) navRow.push({ text: "Cũ Hơn ➡️", callback_data: "tg_tab:acb:" + (page + 1) });
  var kbRows = [];
  if (navRow.length) kbRows.push(navRow);
  kbRows.push([{ text: "🔄 Quét Email ACB Ngay", callback_data: "tg_scan" }, { text: "🎛️ Menu Tổng", callback_data: "tg_tab:menu:0" }]);
  return msgId ? editTelegramMsg_(chatId, msgId, lines.join("\n"), { inline_keyboard: kbRows }) : banTelegram(lines.join("\n"), { chat_id: chatId, reply_markup: { inline_keyboard: kbRows } });
}

function renderTgBtlList_(ss, chatId, mode, page, msgId) {
  ss = ss || getMasterSpreadsheet();
  page = Math.max(0, Number(page || 0));
  var perPage = 4;
  var bTab = getSheetByAliases_(ss, ["Đơn Hàng Bài Tập Lớn", "Don_BTL_DichVu"]);
  var allRows = bTab ? bTab.getDataRange().getValues().slice(1) : [];
  var filtered = [];
  allRows.forEach(function(r) {
    var code = String(r[0] || "").trim().toUpperCase();
    if (!code) return;
    var st = String(r[11] || "").trim().toUpperCase();
    var isPend = (st.indexOf("CHỜ") !== -1 || st === "PENDING");
    if (mode === "btl_pending" && isPend) filtered.push(r);
    else if (mode === "btl_active" && !isPend) filtered.push(r);
  });
  filtered.reverse();
  var totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  if (page >= totalPages) page = totalPages - 1;
  var slice = filtered.slice(page * perPage, (page + 1) * perPage);

  var title = (mode === "btl_pending")
    ? "✍️ <b>ĐƠN BTL CHỜ ĐẶT CỌC</b>"
    : "🔨 <b>ĐƠN BTL ĐÃ CỌC · THU PHẦN CÒN LẠI · ĐÃ GIAO</b>";
  var lines = [title + " (" + filtered.length + " đơn · Trang " + (page + 1) + "/" + totalPages + ")", "━━━━━━━━━━━━━━━━━━━━━━"];
  var kbRows = [];

  if (!slice.length) {
    lines.push("<i>Không có đơn nào trong mục này.</i>");
  } else {
    slice.forEach(function(r) {
      var code = String(r[0] || "").trim().toUpperCase();
      var name = String(r[1] || "Khách").trim();
      var phone = sanitizeCustomerPhone(r[2]);
      var email = String(r[3] || "").trim();
      var topic = String(r[5] || "").trim().slice(0, 75);
      var dl = String(r[6] || "Theo YC").slice(0, 20);
      var tot = parseMoneyVal_(r[7]);
      var dep = parseMoneyVal_(r[8]);
      var rem = parseMoneyVal_(r[9]) || (tot > 0 ? Math.max(0, tot - dep) : 0);
      var st = String(r[11] || "").trim();
      var reqUrl = (r.length >= 16 && r[15]) ? String(r[15]).trim() : "";
      var remCode = (r.length >= 17 && String(r[16] || "").trim()) ? String(r[16]).trim() : buildBtlRemainCode_(code);

      lines.push(
        "🆔 <b><code>" + escTgHtml(code) + "</code></b> — <b>" + escTgHtml(st) + "</b>\n" +
        "👤 " + escTgHtml(name) + (phone ? (" · 📞 <code>" + escTgHtml(phone) + "</code>") : "") + (email ? (" · <code>" + escTgHtml(email) + "</code>") : "") + "\n" +
        "📝 " + escTgHtml(topic) + " · ⏰ " + escTgHtml(dl) + "\n" +
        "💵 Tổng: <b>" + (tot ? tot.toLocaleString("vi-VN") + "đ" : "Chưa nhập") + "</b> · Cọc: <b>" + dep.toLocaleString("vi-VN") + "đ</b> · Còn lại: <b>" + (rem > 0 ? rem.toLocaleString("vi-VN") + "đ" : "0đ") + "</b> (CK: <code>" + escTgHtml(remCode) + "</code>)" +
        (reqUrl ? ("\n📎 <a href=\"" + escTgHtml(reqUrl) + "\">Mở File YC (Kho 06)</a>") : "")
      );

      if (mode === "btl_pending") {
        kbRows.push([
          { text: "💳 QR Cọc " + code, callback_data: "tg_depqr:" + code },
          { text: "✏️ Sửa Giá " + code, callback_data: "tg_askprice:" + code }
        ]);
      } else {
        kbRows.push([
          { text: "💳 QR Thu Nốt " + code, callback_data: "tg_qr:" + code },
          { text: "✏️ Giá/Mail " + code, callback_data: "tg_askprice:" + code },
          { text: "🚀 Giao Full", callback_data: "tg_deliver:" + code }
        ]);
      }
    });
  }

  var nav = [];
  if (page > 0) nav.push({ text: "⬅️ Trang Trước", callback_data: "tg_tab:" + mode + ":" + (page - 1) });
  if (page + 1 < totalPages) nav.push({ text: "Trang Sau ➡️", callback_data: "tg_tab:" + mode + ":" + (page + 1) });
  if (nav.length) kbRows.push(nav);
  kbRows.push([
    { text: mode === "btl_pending" ? "🔨 BTL Thu Nốt" : "✍️ BTL Chờ Cọc", callback_data: "tg_tab:" + (mode === "btl_pending" ? "btl_active" : "btl_pending") + ":0" },
    { text: "🎛️ Menu Tổng", callback_data: "tg_tab:menu:0" }
  ]);
  return msgId ? editTelegramMsg_(chatId, msgId, lines.join("\n"), { inline_keyboard: kbRows }) : banTelegram(lines.join("\n"), { chat_id: chatId, reply_markup: { inline_keyboard: kbRows } });
}

function renderTgSimpleOrders_(ss, chatId, mode, page, msgId) {
  ss = ss || getMasterSpreadsheet();
  page = Math.max(0, Number(page || 0));
  var perPage = 6;
  var tabName = (mode === "khoahoc") ? "Đơn Hàng Khóa Học" : "Đơn Hàng Đề Cương";
  var tab = ss.getSheetByName(tabName) || getSheetByAliases_(ss, ["Đơn Hàng Đề Cương", "Don_De_Cuong"]);
  var rows = tab ? tab.getDataRange().getValues().slice(1).filter(function(r) { return String(r[1] || "").trim(); }) : [];
  rows.reverse();
  var totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  if (page >= totalPages) page = totalPages - 1;
  var slice = rows.slice(page * perPage, (page + 1) * perPage);

  var title = (mode === "khoahoc") ? "🎓 <b>ĐƠN HÀNG KHÓA HỌC DRIVE</b>" : "📄 <b>ĐƠN HÀNG ĐỀ CƯƠNG ÔN TẬP</b>";
  var lines = [title + " (" + rows.length + " đơn · Trang " + (page + 1) + "/" + totalPages + ")", "━━━━━━━━━━━━━━━━━━━━━━"];
  if (!slice.length) {
    lines.push("<i>Chưa có đơn hàng nào trong bảng này.</i>");
  } else {
    slice.forEach(function(r) {
      var st = String(r[11] || r[10] || "").trim();
      var amt = parseMoneyVal_(r[8]);
      lines.push(
        "• <code>" + escTgHtml(String(r[1] || "")) + "</code> — <b>" + escTgHtml(st) + "</b> (" + amt.toLocaleString("vi-VN") + "đ)\n" +
        "  👤 " + escTgHtml(String(r[3] || "")) + " · <code>" + escTgHtml(String(r[4] || "")) + "</code>\n" +
        "  📚 " + escTgHtml(String(r[7] || r[6] || "").slice(0, 65))
      );
    });
  }
  var nav = [];
  if (page > 0) nav.push({ text: "⬅️ Trang Trước", callback_data: "tg_tab:" + mode + ":" + (page - 1) });
  if (page + 1 < totalPages) nav.push({ text: "Trang Sau ➡️", callback_data: "tg_tab:" + mode + ":" + (page + 1) });
  var kbRows = [];
  if (nav.length) kbRows.push(nav);
  kbRows.push([{ text: "🎛️ Quay Lại Menu Tổng", callback_data: "tg_tab:menu:0" }]);
  return msgId ? editTelegramMsg_(chatId, msgId, lines.join("\n"), { inline_keyboard: kbRows }) : banTelegram(lines.join("\n"), { chat_id: chatId, reply_markup: { inline_keyboard: kbRows } });
}

function renderTgCustomers_(ss, chatId, page, msgId) {
  ss = ss || getMasterSpreadsheet();
  page = Math.max(0, Number(page || 0));
  var perPage = 6;
  var cTab = ss.getSheetByName("Thông Tin Khách Hàng");
  var rows = cTab ? cTab.getDataRange().getValues().slice(1).filter(function(r) { return String(r[0] || "").trim(); }) : [];
  rows.reverse();
  var totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  if (page >= totalPages) page = totalPages - 1;
  var slice = rows.slice(page * perPage, (page + 1) * perPage);

  var lines = ["👤 <b>HỒ SƠ KHÁCH HÀNG</b> (" + rows.length + " hồ sơ · Trang " + (page + 1) + "/" + totalPages + ")", "━━━━━━━━━━━━━━━━━━━━━━"];
  var kbRows = [];
  slice.forEach(function(r, idx) {
    var em = String(r[0] || "").trim();
    var nm = String(r[1] || "Khách").trim();
    var ph = sanitizeCustomerPhone(r[2]);
    var st = String(r[5] || "").trim();
    var pr = String(r[6] || "").trim().slice(0, 50);
    lines.push(
      "<b>" + (page * perPage + idx + 1) + ". " + escTgHtml(nm) + "</b>" + (ph ? (" · 📞 <code>" + escTgHtml(ph) + "</code>") : "") + "\n" +
      "   📧 <code>" + escTgHtml(em) + "</code> · <b>" + escTgHtml(st) + "</b>" +
      (pr ? ("\n   📚 " + escTgHtml(pr)) : "")
    );
    kbRows.push([{ text: "🔍 Xem " + nm.slice(0, 18) + (ph ? (" (" + ph + ")") : ""), callback_data: "tg_cust:" + em.slice(0, 52) }]);
  });
  var nav = [];
  if (page > 0) nav.push({ text: "⬅️ Mới Hơn", callback_data: "tg_tab:customers:" + (page - 1) });
  if (page + 1 < totalPages) nav.push({ text: "Cũ Hơn ➡️", callback_data: "tg_tab:customers:" + (page + 1) });
  if (nav.length) kbRows.push(nav);
  kbRows.push([{ text: "🔍 Tìm Theo SĐT / Email / Tên", callback_data: "tg_findcust" }, { text: "🎛️ Menu Tổng", callback_data: "tg_tab:menu:0" }]);
  return msgId ? editTelegramMsg_(chatId, msgId, lines.join("\n"), { inline_keyboard: kbRows }) : banTelegram(lines.join("\n"), { chat_id: chatId, reply_markup: { inline_keyboard: kbRows } });
}

function renderTgCustomerDetail_(ss, chatId, queryRaw, msgId) {
  ss = ss || getMasterSpreadsheet();
  var q = String(queryRaw || "").trim().toLowerCase();
  if (!q) return banTelegram("⚠️ Bạn hãy nhập SĐT, Email hoặc Tên khách (VD: <code>/khach 0862592720</code>).", { chat_id: chatId });
  var qNorm = boDau(q);

  var lines = ["🔍 <b>TRA CỨU HỒ SƠ KHÁCH HÀNG:</b> <code>" + escTgHtml(queryRaw) + "</code>", "━━━━━━━━━━━━━━━━━━━━━━"];
  var foundAny = false;
  var kbRows = [];

  var khTab = ss.getSheetByName("Thông Tin Khách Hàng");
  if (khTab) {
    var khRows = khTab.getDataRange().getValues();
    for (var c = 1; c < khRows.length; c++) {
      var hayC = boDau(khRows[c].slice(0, 7).join(" ")).toLowerCase();
      if (hayC.indexOf(qNorm) !== -1) {
        foundAny = true;
        lines.push(
          "👤 <b>" + escTgHtml(String(khRows[c][1] || "")) + "</b> · 📞 <code>" + escTgHtml(sanitizeCustomerPhone(khRows[c][2]) || "Chưa có") + "</code>\n" +
          "📧 <code>" + escTgHtml(String(khRows[c][0] || "")) + "</code> · <b>" + escTgHtml(String(khRows[c][5] || "")) + "</b>\n" +
          "📚 Đã mở: " + escTgHtml(String(khRows[c][6] || "Chưa có"))
        );
        break;
      }
    }
  }

  var bTab = getSheetByAliases_(ss, ["Đơn Hàng Bài Tập Lớn", "Don_BTL_DichVu"]);
  if (bTab) {
    var bRows = bTab.getDataRange().getValues();
    for (var b = 1; b < bRows.length; b++) {
      var hayB = boDau(bRows[b].slice(0, 6).join(" ")).toLowerCase();
      if (hayB.indexOf(qNorm) !== -1) {
        foundAny = true;
        var bCode = String(bRows[b][0] || "").trim().toUpperCase();
        var tot = parseMoneyVal_(bRows[b][7]);
        var dep = parseMoneyVal_(bRows[b][8]);
        var rem = parseMoneyVal_(bRows[b][9]) || (tot > 0 ? Math.max(0, tot - dep) : 0);
        var remCode = (bRows[b].length >= 17 && String(bRows[b][16] || "").trim()) ? String(bRows[b][16]).trim() : buildBtlRemainCode_(bCode);
        var reqUrl = (bRows[b].length >= 16 && bRows[b][15]) ? String(bRows[b][15]).trim() : "";
        lines.push(
          "\n✍️ <b>Đơn BTL <code>" + escTgHtml(bCode) + "</code></b> — <b>" + escTgHtml(String(bRows[b][11] || "")) + "</b>\n" +
          "📝 " + escTgHtml(String(bRows[b][5] || "").slice(0, 90)) + "\n" +
          "💵 Tổng: " + (tot ? tot.toLocaleString("vi-VN") + "đ" : "Chưa nhập") + " · Cọc: " + dep.toLocaleString("vi-VN") + "đ · Còn: <b>" + rem.toLocaleString("vi-VN") + "đ</b> (CK: <code>" + escTgHtml(remCode) + "</code>)" +
          (reqUrl ? ("\n📎 <a href=\"" + escTgHtml(reqUrl) + "\">Mở File YC (Kho 06)</a>") : "")
        );
        kbRows.push([
          { text: "💳 QR Thu Nốt " + bCode, callback_data: "tg_qr:" + bCode },
          { text: "✏️ Sửa Giá " + bCode, callback_data: "tg_askprice:" + bCode },
          { text: "🚀 Giao Full", callback_data: "tg_deliver:" + bCode }
        ]);
      }
    }
  }

  ["Đơn Hàng Đề Cương", "Đơn Hàng Khóa Học"].forEach(function(tName) {
    var oTab = ss.getSheetByName(tName);
    if (!oTab) return;
    var oRows = oTab.getDataRange().getValues();
    for (var i = 1; i < oRows.length; i++) {
      var hayO = boDau(oRows[i].slice(1, 8).join(" ")).toLowerCase();
      if (hayO.indexOf(qNorm) !== -1) {
        foundAny = true;
        lines.push("\n" + (tName.indexOf("Khóa") !== -1 ? "🎓" : "📄") + " <code>" + escTgHtml(String(oRows[i][1] || "")) + "</code> — " + escTgHtml(String(oRows[i][7] || "")) + " — <b>" + escTgHtml(String(oRows[i][11] || "")) + "</b>");
      }
    }
  });

  if (!foundAny) lines.push("<i>Không tìm thấy hồ sơ hoặc đơn hàng nào khớp từ khóa này.</i>");
  kbRows.push([{ text: "🔍 Tìm Khách Khác", callback_data: "tg_findcust" }, { text: "🎛️ Menu Tổng", callback_data: "tg_tab:menu:0" }]);
  return msgId ? editTelegramMsg_(chatId, msgId, lines.join("\n"), { inline_keyboard: kbRows }) : banTelegram(lines.join("\n"), { chat_id: chatId, reply_markup: { inline_keyboard: kbRows } });
}

function renderTgDriveHub_(chatId, msgId) {
  var text =
    "📁 <b>KHO LƯU TRỮ &amp; PHÂN PHỐI GOOGLE DRIVE (diepvientailieu@gmail.com)</b>\n" +
    "━━━━━━━━━━━━━━━━━━━━━━\n" +
    "Từ nay Google Drive chỉ đảm nhận <b>Lưu trữ &amp; Cấp quyền phát file</b> — bấm chọn kho cần mở nhanh bên dưới:";
  var kb = {
    inline_keyboard: [
      [
        { text: "📂 01. Kho Đề Cương (50K)", url: "https://drive.google.com/drive/folders/" + FOLDER_DE_CUONG_ID },
        { text: "📂 02. Kho Phôi/Full BTL", url: "https://drive.google.com/drive/folders/" + FOLDER_BTL_FULL_ID }
      ],
      [
        { text: "📂 03. Bản Check Trước", url: "https://drive.google.com/drive/folders/" + FOLDER_BTL_CHECK_ID },
        { text: "📂 05. Kho Khóa Học", url: "https://drive.google.com/drive/folders/" + FOLDER_KHOA_HOC_ID }
      ],
      [
        { text: "📎 06. File Yêu Cầu BTL Khách Gửi", url: "https://drive.google.com/drive/folders/" + BTL_REQ_FOLDER_ID },
        { text: "📊 Mở Sheet Tổng (Lưu Trữ)", url: "https://docs.google.com/spreadsheets/d/" + MASTER_SHEET_ID + "/edit" }
      ],
      [{ text: "🎛️ Quay Lại Menu Tổng", callback_data: "tg_tab:menu:0" }]
    ]
  };
  return msgId ? editTelegramMsg_(chatId, msgId, text, kb) : banTelegram(text, { chat_id: chatId, reply_markup: kb });
}

function sendBtlQrPhotoToTg_(ss, chatId, rawCode, overrideAmount, isDepositQr) {
  ss = ss || getMasterSpreadsheet();
  var code = String(rawCode || "").trim().toUpperCase();
  var bTab = getSheetByAliases_(ss, ["Đơn Hàng Bài Tập Lớn", "Don_BTL_DichVu"]);
  var matchedRow = null;
  var rowNum = -1;
  if (bTab && code) {
    var rows = bTab.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      var rCode = String(rows[i][0] || "").trim().toUpperCase();
      var rCoc = rCode.indexOf("COC") === 0 ? rCode : ("COC" + rCode.replace(/^DAT_/, ""));
      if (rCode === code || rCoc === code || buildBtlRemainCode_(rCode) === code) {
        matchedRow = rows[i];
        rowNum = i + 1;
        code = rCode;
        break;
      }
    }
  }

  var tot = matchedRow ? parseMoneyVal_(matchedRow[7]) : 0;
  var dep = matchedRow ? parseMoneyVal_(matchedRow[8]) : 50000;
  var rem = matchedRow ? (parseMoneyVal_(matchedRow[9]) || (tot > 0 ? Math.max(0, tot - dep) : 0)) : 0;
  var amt = Number(overrideAmount || 0) || (isDepositQr ? (dep || 50000) : rem);

  if (!isDepositQr && amt <= 0) {
    return tgApiCall_("sendMessage", {
      chat_id: chatId,
      text: "✏️ <b>ĐƠN <code>" + escTgHtml(code) + "</code> CHƯA CÓ SỐ TIỀN CÒN LẠI</b>\n\nReply (trả lời) tin nhắn này với định dạng:\n<code>TổngTiền Email(nếu có)</code>\nVí dụ: <code>480000 nguyena@gmail.com</code> (hoặc chỉ gõ <code>480000</code>)\n→ Hệ thống sẽ tự trừ tiền cọc <b>" + dep.toLocaleString("vi-VN") + "đ</b>, cập nhật Sheet và bắn ngay <b>ảnh QR VietQR thu nốt</b>!",
      parse_mode: "HTML",
      reply_markup: { force_reply: true, selective: true }
    });
  }

  var memoCode = isDepositQr ? code : buildBtlRemainCode_(code);
  var qrUrl = buildBtlRemainQrUrl_("27820961", amt, memoCode);
  var custName = matchedRow ? String(matchedRow[1] || "Khách hàng") : "Khách hàng";
  var custPhone = matchedRow ? sanitizeCustomerPhone(matchedRow[2]) : "";
  var topic = matchedRow ? String(matchedRow[5] || "").slice(0, 90) : "Dịch vụ BTL / Tiểu luận";

  // Cập nhật lại Sheet nếu người dùng truyền kèm số tiền mới cho /qr
  if (matchedRow && overrideAmount > 0 && !isDepositQr && rowNum > 0) {
    try {
      var newTotal = dep + amt;
      bTab.getRange(rowNum, 8, 1, 3).setValues([[newTotal, dep, amt]]);
      bTab.getRange(rowNum, 17, 1, 2).setValues([[memoCode, '=IMAGE("' + qrUrl + '", 1)']]);
    } catch (eUpdQr) {}
  }

  var caption =
    (isDepositQr ? "💳 <b>MÃ QR ĐẶT CỌC BTL</b>" : "💳 <b>MÃ QR THU PHẦN CÒN LẠI BTL</b>") + "\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "🆔 Mã đơn: <code>" + escTgHtml(code) + "</code>\n" +
    "👤 Khách: <b>" + escTgHtml(custName) + "</b>" + (custPhone ? (" · 📞 <code>" + escTgHtml(custPhone) + "</code>") : "") + "\n" +
    (topic ? ("📝 Đề tài: " + escTgHtml(topic) + "\n") : "") +
    "🏦 Ngân hàng: <b>ACB — STK <code>27820961</code> — TRINH DUC THINH</b>\n" +
    "💵 Số tiền chuyển: <b>" + amt.toLocaleString("vi-VN") + " VNĐ</b>\n" +
    "✍️ Nội dung CK: <code>" + escTgHtml(memoCode) + "</code>\n\n" +
    "📤 <i>Chuyển tiếp (Forward) ảnh QR này gửi thẳng cho khách — tiền về ACB là bot tự mở khóa Drive + gửi Email bản Full!</i>";

  return sendTelegramPhoto_(chatId, qrUrl, caption, {
    inline_keyboard: [
      [
        { text: "🚀 Bàn Giao Full Drive", callback_data: "tg_deliver:" + code },
        { text: "🔄 Quét ACB Ngay", callback_data: "tg_scan" }
      ],
      [{ text: "🎛️ Mở Menu Tổng", callback_data: "tg_tab:menu:0" }]
    ]
  });
}

function updateBtlPriceFromTg_(ss, chatId, code, totalOrRemainAmt, emailOpt, isTotalAmount) {
  ss = ss || getMasterSpreadsheet();
  var cleanCode = String(code || "").trim().toUpperCase();
  var bTab = getSheetByAliases_(ss, ["Đơn Hàng Bài Tập Lớn", "Don_BTL_DichVu"]);
  if (!bTab) return banTelegram("❌ Không tìm thấy tab Đơn Hàng Bài Tập Lớn.", { chat_id: chatId });

  var rows = bTab.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    var rCode = String(rows[i][0] || "").trim().toUpperCase();
    if (rCode === cleanCode) {
      var rowNum = i + 1;
      var dep = parseMoneyVal_(rows[i][8]) || 50000;
      var newTotal = isTotalAmount ? totalOrRemainAmt : (dep + totalOrRemainAmt);
      var newRemain = Math.max(0, newTotal - dep);
      var remCode = buildBtlRemainCode_(rCode);
      var qrUrl = buildBtlRemainQrUrl_("27820961", newRemain, remCode);
      var qrCell = qrUrl ? ('=IMAGE("' + qrUrl + '", 1)') : "";
      if (emailOpt && emailOpt.indexOf("@") !== -1) {
        bTab.getRange(rowNum, 4).setValue(emailOpt.trim().toLowerCase());
      }
      bTab.getRange(rowNum, 8, 1, 3).setValues([[newTotal, dep, newRemain]]);
      bTab.getRange(rowNum, 17, 1, 2).setValues([[remCode, qrCell]]);
      try { bTab.setRowHeight(rowNum, 155); } catch (eRh2) {}
      return sendBtlQrPhotoToTg_(ss, chatId, rCode, newRemain, false);
    }
  }
  return banTelegram("❌ Không tìm thấy mã đơn <code>" + escTgHtml(cleanCode) + "</code>.", { chat_id: chatId });
}

function deliverBtlFromTg_(ss, chatId, code, customFileUrl) {
  ss = ss || getMasterSpreadsheet();
  var cleanCode = String(code || "").trim().toUpperCase();
  var bTab = getSheetByAliases_(ss, ["Đơn Hàng Bài Tập Lớn", "Don_BTL_DichVu"]);
  if (!bTab) return banTelegram("❌ Không tìm thấy tab Đơn Hàng Bài Tập Lớn.", { chat_id: chatId });

  var rows = bTab.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    var rCode = String(rows[i][0] || "").trim().toUpperCase();
    if (rCode === cleanCode) {
      var rowNum = i + 1;
      var email = String(rows[i][3] || "").trim().toLowerCase();
      if (!email || email.indexOf("@") === -1) {
        return banTelegram("⚠️ Đơn <code>" + escTgHtml(rCode) + "</code> chưa có Email nhận bài! Hãy dùng <code>/giabtl " + escTgHtml(rCode) + " TổngTiền EmailKhách</code> trước.", { chat_id: chatId });
      }
      if (customFileUrl) {
        var fid = extractDriveId(customFileUrl);
        if (fid) bTab.getRange(rowNum, 11).setValue(fid);
      }
      bTab.getRange(rowNum, 12).setValue("ĐÃ THANH TOÁN ĐỦ");
      kiemTraDonHoanThanh(ss);
      return banTelegram("🚀 <b>ĐÃ BÀN GIAO BẢN FULL BTL THÀNH CÔNG!</b>\n🆔 Mã đơn: <code>" + escTgHtml(rCode) + "</code>\n📧 Đã mở quyền Google Drive &amp; gửi Email về <code>" + escTgHtml(email) + "</code>.", {
        chat_id: chatId,
        reply_markup: { inline_keyboard: [[{ text: "🎛️ Quay Lại Menu Tổng", callback_data: "tg_tab:menu:0" }]] }
      });
    }
  }
  return banTelegram("❌ Không tìm thấy đơn <code>" + escTgHtml(cleanCode) + "</code>.", { chat_id: chatId });
}

function handleTelegramWebhookUpdate_(update) {
  if (!update) return;
  var ss = getMasterSpreadsheet();

  // 1. Xử lý bấm nút Inline Keyboard
  if (update.callback_query) {
    var cq = update.callback_query;
    var cqChatId = cq.message && cq.message.chat ? cq.message.chat.id : TELEGRAM_GROUP_ID;
    var cqMsgId = cq.message ? cq.message.message_id : null;
    var cqUserId = cq.from ? cq.from.id : "";
    var data = String(cq.data || "").trim();

    if (!isAuthorizedTelegramSender_(cqChatId, cqUserId)) {
      tgApiCall_("answerCallbackQuery", { callback_query_id: cq.id, text: "⛔ Bạn không có quyền điều khiển bot này.", show_alert: true });
      return;
    }
    tgApiCall_("answerCallbackQuery", { callback_query_id: cq.id });

    if (data.indexOf("tg_tab:") === 0) {
      var parts = data.split(":");
      var tabMode = parts[1] || "menu";
      var pg = Number(parts[2] || 0) || 0;
      if (tabMode === "menu") return renderTgMenu_(cqChatId, cqMsgId);
      if (tabMode === "overview") return renderTgOverview_(ss, cqChatId, cqMsgId);
      if (tabMode === "acb") return renderTgAcbList_(ss, cqChatId, pg, cqMsgId);
      if (tabMode === "btl_pending" || tabMode === "btl_active") return renderTgBtlList_(ss, cqChatId, tabMode, pg, cqMsgId);
      if (tabMode === "decuong" || tabMode === "khoahoc") return renderTgSimpleOrders_(ss, cqChatId, tabMode, pg, cqMsgId);
      if (tabMode === "customers") return renderTgCustomers_(ss, cqChatId, pg, cqMsgId);
      if (tabMode === "drive") return renderTgDriveHub_(cqChatId, cqMsgId);
      return;
    }
    if (data.indexOf("tg_qr:") === 0) {
      return sendBtlQrPhotoToTg_(ss, cqChatId, data.substring(6), 0, false);
    }
    if (data.indexOf("tg_depqr:") === 0) {
      return sendBtlQrPhotoToTg_(ss, cqChatId, data.substring(9), 0, true);
    }
    if (data.indexOf("tg_askprice:") === 0) {
      var pCode = data.substring(12);
      return tgApiCall_("sendMessage", {
        chat_id: cqChatId,
        text: "✏️ <b>CẬP NHẬT GIÁ &amp; EMAIL CHO ĐƠN <code>" + escTgHtml(pCode) + "</code></b>\n\nReply (trả lời) tin nhắn này theo mẫu:\n<code>TổngTiền Email(nếu có)</code>\nVí dụ: <code>480000 nguyena@gmail.com</code> (hoặc chỉ gõ <code>480000</code>)",
        parse_mode: "HTML",
        reply_markup: { force_reply: true, selective: true }
      });
    }
    if (data.indexOf("tg_deliver:") === 0) {
      return deliverBtlFromTg_(ss, cqChatId, data.substring(11), "");
    }
    if (data.indexOf("tg_cust:") === 0) {
      return renderTgCustomerDetail_(ss, cqChatId, data.substring(8), null);
    }
    if (data === "tg_findcust") {
      return tgApiCall_("sendMessage", {
        chat_id: cqChatId,
        text: "🔍 <b>TRA CỨU HỒ SƠ KHÁCH HÀNG</b>\n\nReply (trả lời) tin nhắn này bằng <b>SĐT Zalo, Email hoặc Tên khách hàng</b> (VD: <code>0862592720</code>):",
        parse_mode: "HTML",
        reply_markup: { force_reply: true, selective: true }
      });
    }
    if (data === "tg_scan") {
      scanBankEmailsAndDeliver(ss, false);
      kiemTraDonHoanThanh(ss);
      return banTelegram("✅ <b>Đã quét xong hộp thư Gmail ACB &amp; đối soát toàn bộ đơn hàng!</b>", {
        chat_id: cqChatId,
        reply_markup: { inline_keyboard: [[{ text: "💰 Xem Biến Động ACB", callback_data: "tg_tab:acb:0" }, { text: "🎛️ Menu Tổng", callback_data: "tg_tab:menu:0" }]] }
      });
    }
    if (data === "tg_revmonth") {
      return guiBaoCaoDoanhThuCuoiThangTelegram(ss, "", cqChatId, cqMsgId);
    }
    return;
  }

  // 2. Xử lý Tin nhắn / Lệnh / Phím tắt / ForceReply
  var msg = update.message;
  if (!msg || !msg.text) return;
  var chatId = msg.chat.id;
  var fromId = msg.from ? msg.from.id : "";
  if (!isAuthorizedTelegramSender_(chatId, fromId)) return;

  var txt = String(msg.text || "").trim();
  var replyText = msg.reply_to_message && msg.reply_to_message.text ? String(msg.reply_to_message.text) : "";

  // Xử lý ForceReply (Tìm khách hoặc Cập nhật giá đơn BTL)
  if (replyText) {
    if (replyText.indexOf("TRA CỨU HỒ SƠ KHÁCH HÀNG") !== -1) {
      return renderTgCustomerDetail_(ss, chatId, txt, null);
    }
    var mCodePrompt = replyText.match(/(?:ĐƠN|CHƯA CÓ SỐ TIỀN CÒN LẠI)\s+([A-Z0-9_]{4,24})/i) || replyText.match(/\b((?:COC|TT)[A-Z0-9]{4,20})\b/i);
    if (mCodePrompt && mCodePrompt[1] && (replyText.indexOf("CẬP NHẬT GIÁ") !== -1 || replyText.indexOf("CHƯA CÓ SỐ TIỀN CÒN LẠI") !== -1)) {
      var targetCode = mCodePrompt[1].toUpperCase();
      var toks = txt.split(/\s+/);
      var amtParsed = parseMoneyVal_(toks[0]);
      var emailParsed = (toks[1] && toks[1].indexOf("@") !== -1) ? toks[1] : "";
      if (amtParsed >= 1000) {
        return updateBtlPriceFromTg_(ss, chatId, targetCode, amtParsed, emailParsed, true);
      }
      return banTelegram("⚠️ Số tiền không hợp lệ. Hãy nhập lại dạng <code>480000</code> hoặc <code>480000 mail@gmail.com</code>.", { chat_id: chatId });
    }
  }

  // Phím tắt Reply Keyboard
  if (txt === "🎛️ Menu Tổng") return renderTgMenu_(chatId, null);
  if (txt === "💰 Biến Động ACB") return renderTgAcbList_(ss, chatId, 0, null);
  if (txt === "📊 Tổng Quan") return renderTgOverview_(ss, chatId, null);
  if (txt === "✍️ BTL Chờ Cọc") return renderTgBtlList_(ss, chatId, "btl_pending", 0, null);
  if (txt === "🔨 BTL Thu Nốt & QR") return renderTgBtlList_(ss, chatId, "btl_active", 0, null);
  if (txt === "👤 Tra Khách Hàng") return renderTgCustomers_(ss, chatId, 0, null);
  if (txt === "📄 Đề Cương") return renderTgSimpleOrders_(ss, chatId, "decuong", 0, null);
  if (txt === "🎓 Khóa Học") return renderTgSimpleOrders_(ss, chatId, "khoahoc", 0, null);
  if (txt === "🔄 Quét ACB Ngay") {
    scanBankEmailsAndDeliver(ss, false);
    kiemTraDonHoanThanh(ss);
    return renderTgAcbList_(ss, chatId, 0, null);
  }

  // Slash Commands
  var cleanCmd = txt.replace(/@diepvien_pay_bot/gi, "").trim();
  var partsCmd = cleanCmd.split(/\s+/);
  var cmd = partsCmd[0].toLowerCase();

  if (cmd === "/menu" || cmd === "/start" || cmd === "/help") return renderTgMenu_(chatId, null);
  if (cmd === "/doanhthu" || cmd === "/tongquan") return renderTgOverview_(ss, chatId, null);
  if (cmd === "/acb") return renderTgAcbList_(ss, chatId, 0, null);
  if (cmd === "/btl") return renderTgBtlList_(ss, chatId, "btl_active", 0, null);
  if (cmd === "/decuong") return renderTgSimpleOrders_(ss, chatId, "decuong", 0, null);
  if (cmd === "/khoahoc") return renderTgSimpleOrders_(ss, chatId, "khoahoc", 0, null);
  if (cmd === "/drive") return renderTgDriveHub_(chatId, null);
  if (cmd === "/khach") return renderTgCustomerDetail_(ss, chatId, partsCmd.slice(1).join(" "), null);

  if (cmd === "/qr") {
    if (!partsCmd[1]) {
      return banTelegram("💡 Cú pháp: <code>/qr MãĐơn [SốTiềnCònLại]</code>\nVí dụ:\n• <code>/qr COCBTL8473 430000</code> (tạo ảnh QR thu 430.000đ mã CK <code>TTBTL8473</code>)\n• <code>/qr COCTIEULUAN5625</code> (tự lấy số tiền còn lại trên hệ thống)", { chat_id: chatId });
    }
    var qrAmt = partsCmd[2] ? parseMoneyVal_(partsCmd[2]) : 0;
    return sendBtlQrPhotoToTg_(ss, chatId, partsCmd[1], qrAmt, false);
  }

  if (cmd === "/giabtl") {
    if (!partsCmd[1] || !partsCmd[2]) {
      return banTelegram("💡 Cú pháp: <code>/giabtl MãĐơn TổngTiền [Email]</code>\nVí dụ: <code>/giabtl COCBTL8473 480000 khach@gmail.com</code>", { chat_id: chatId });
    }
    var totAmt = parseMoneyVal_(partsCmd[2]);
    var emArg = (partsCmd[3] && partsCmd[3].indexOf("@") !== -1) ? partsCmd[3] : "";
    return updateBtlPriceFromTg_(ss, chatId, partsCmd[1], totAmt, emArg, true);
  }

  if (cmd === "/giaobtl") {
    if (!partsCmd[1]) return banTelegram("💡 Cú pháp: <code>/giaobtl MãĐơn [LinkDriveFull]</code>", { chat_id: chatId });
    return deliverBtlFromTg_(ss, chatId, partsCmd[1], partsCmd[2] || "");
  }
}

function pollTelegramUpdatesIfNeeded_(ss) {
  var cache = getScriptCacheSafe();
  if (cache && cache.get("TG_WEBHOOK_OK_V14") === "1") return;
  // Nếu Webhook chưa hoạt động hoặc chưa cài, tự động quét getUpdates 1 lần/phút làm dự phòng
  var info = tgApiCall_("getWebhookInfo", {});
  if (info && info.ok && info.result && info.result.url && !info.result.last_error_message) {
    if (cache) try { cache.put("TG_WEBHOOK_OK_V14", "1", 600); } catch (eP) {}
    return;
  }
  var props = PropertiesService.getScriptProperties();
  var offset = Number(props.getProperty("TG_POLL_OFFSET") || "0");
  var upd = tgApiCall_("getUpdates", { offset: offset, limit: 20, timeout: 0 });
  if (upd && upd.ok && Array.isArray(upd.result) && upd.result.length > 0) {
    for (var i = 0; i < upd.result.length; i++) {
      var u = upd.result[i];
      if (u.update_id >= offset) offset = u.update_id + 1;
      try { handleTelegramWebhookUpdate_(u); } catch (eH) {}
    }
    props.setProperty("TG_POLL_OFFSET", String(offset));
  }
}

function setupTelegramBotCommandCenter_(webAppUrl) {
  tgApiCall_("setMyCommands", {
    commands: [
      { command: "menu", description: "Mở Trạm Điều Khiển Tổng (Nút bấm 1 chạm)" },
      { command: "btl", description: "Xem & thu tiền nốt các đơn BTL" },
      { command: "qr", description: "Sinh ảnh QR thu nốt BTL (VD: /qr COCBTL8473 430000)" },
      { command: "acb", description: "Xem biến động số dư ACB gần nhất" },
      { command: "khach", description: "Tra hồ sơ khách hàng theo SĐT/Email" },
      { command: "decuong", description: "Xem danh sách đơn Đề Cương 50K" },
      { command: "khoahoc", description: "Xem danh sách đơn Khóa Học Drive" },
      { command: "doanhthu", description: "Xem Tổng Quan & Doanh Thu hệ thống" },
      { command: "giabtl", description: "Cập nhật Tổng tiền & Email BTL" },
      { command: "giaobtl", description: "Mở Drive & gửi Email bàn giao Full BTL" },
      { command: "drive", description: "Mở nhanh 6 kho lưu trữ Google Drive" }
    ]
  });
  if (webAppUrl) {
    return tgApiCall_("setWebhook", { url: webAppUrl, drop_pending_updates: true });
  }
  return true;
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
