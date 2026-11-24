/**
* DATA & CONFIGURATION FOR ĐIỆP VIÊN TÀI LIỆU
*/
const STANDARD_FACULTIES = [
"Tất Cả Các Khoa / Khối Ngành",
"Khoa / Khối Kinh Tế & Quản Trị",
"Khoa / Khối Sư Phạm & Giáo Dục",
"Khoa / Khối Du Lịch & Khách Sạn",
"Khoa / Khối Công Nghệ & Kỹ Thuật",
"Khoa / Khối Tâm Lý & Xã Hội",
"Khoa / Khối Luật & Pháp Lý",
"Khoa / Khối Ngoại Ngữ & Ngôn Ngữ Học",
"Khoa / Khối Tài Chính - Ngân Hàng - Kế Toán"
];
const HOT_SEARCH_KEYWORDS = [
"Toán Cao Cấp (TCC)",
"Kinh Tế Lượng (KTL)",
"Triết Học Mác - Lênin",
"Pháp Luật Đại Cương (PLDC)",
"Tài Chính Doanh Nghiệp (TCDN)",
"Kinh Tế Vi Mô (KTVM)",
"Kinh Tế Vĩ Mô (KTVM)",
"Quản Trị Học (QTH)",
"Marketing Căn Bản (MCB)",
"Xác Suất Thống Kê (XXTK)",
"Tư Tưởng Hồ Chí Minh (TTHCM)",
"Kinh Tế Số",
"Thương Mại Điện Tử (TMDT)"
];
function getDocDiscipline(doc) {
if (!doc) return "DAI_CUONG";
const text = ((doc.baseName || "") + " " + (doc.rawName || "") + " " + (doc.category || "")).toLowerCase();
if (
text.includes("triết học") || text.includes("kinh tế chính trị") || text.includes("chủ nghĩa xã hội") ||
text.includes("lịch sử đảng") || text.includes("tư tưởng hồ chí minh") || text.includes("tư tưởng hcm") ||
text.includes("pháp luật đại cương") || text.includes("pldc") || text.includes("toán cao cấp") ||
text.includes("giải tích") || text.includes("đại số tuyến tính") || text.includes("xác suất thống kê") ||
text.includes("logic học") || text.includes("kỹ năng mềm") || text.includes("các môn đại cương") ||
(text.includes("đại cương") && !text.includes("tin học") && !text.includes("công nghệ"))
) {
return "DAI_CUONG";
}
if (
text.includes("lập trình") || text.includes("cơ sở dữ liệu") || text.includes("sql") ||
text.includes("python") || text.includes("c/c++") || text.includes("java") ||
text.includes("an toàn thông tin") || text.includes("mạng máy tính") || text.includes("công nghệ thông tin") ||
text.includes("cntt") || text.includes("hệ điều hành") || text.includes("cấu trúc dữ liệu") ||
text.includes("trí tuệ nhân tạo") || text.includes("tin học") || text.includes("công nghệ & kỹ thuật") ||
text.includes("công nghệ")
) {
return "CONG_NGHE";
}
if (
text.includes("tiếng anh") || text.includes("tiếng trung") || text.includes("tiếng hàn") ||
text.includes("tiếng nhật") || text.includes("hsk") || text.includes("ielts") ||
text.includes("toeic") || text.includes("topik") || text.includes("jlpt") ||
text.includes("ngôn ngữ") || text.includes("ngoại ngữ") || text.includes("dịch thuật") ||
text.includes("ngữ âm") || text.includes("ngữ pháp")
) {
return "NGOAI_NGU";
}
if (
text.includes("luật") || text.includes("pháp lý") || text.includes("tố tụng") ||
text.includes("pháp luật") || text.includes("tư pháp") || text.includes("hiến pháp")
) {
return "LUAT";
}
if (
text.includes("du lịch") || text.includes("khách sạn") || text.includes("nhà hàng") ||
text.includes("hướng dẫn") || text.includes("lễ tân") || text.includes("buồng phòng") ||
text.includes("tuyến điểm")
) {
return "DU_LICH";
}
if (
text.includes("sư phạm") || text.includes("giáo dục học") || text.includes("dạy học") ||
text.includes("quản lý giáo dục") || text.includes("tâm lý học sư phạm")
) {
return "SU_PHAM";
}
if (
text.includes("tài chính") || text.includes("ngân hàng") || text.includes("kế toán") ||
text.includes("kiểm toán") || text.includes("thuế") || text.includes("chứng khoán") ||
text.includes("kinh tế lượng") || text.includes("tiền tệ") || text.includes("định giá") ||
text.includes("tài chính - ngân hàng")
) {
return "TAI_CHINH";
}
if (
text.includes("quản trị") || text.includes("marketing") || text.includes("logistics") ||
text.includes("thương mại điện tử") || text.includes("hành vi người tiêu dùng") ||
text.includes("chuỗi cung ứng") || text.includes("kinh doanh") || text.includes("kinh tế vi mô") ||
text.includes("kinh tế vĩ mô") || text.includes("kinh tế quốc tế") || text.includes("kinh tế phát triển") ||
text.includes("kinh tế & thống kê") || text.includes("kinh tế")
) {
return "QUAN_TRI";
}
if (
text.includes("tâm lý") || text.includes("xã hội") || text.includes("báo chí") ||
text.includes("truyền thông") || text.includes("quan hệ công chứng") || text.includes("quan hệ công chúng") || text.includes("pr")
) {
return "XA_HOI";
}
return "DAI_CUONG";
}
function getUniAllowedDisciplines(uniId, uniName) {
const id = (uniId || "").toLowerCase();
const name = (uniName || "").toLowerCase();
const set = new Set(["DAI_CUONG"]);
if (id === "ulis" || id === "hufl") {
set.add("NGOAI_NGU");
set.add("SU_PHAM");
return set;
}
if (id === "huflit") {
set.add("NGOAI_NGU");
set.add("CONG_NGHE");
set.add("QUAN_TRI");
set.add("DU_LICH");
return set;
}
if (id === "hlu" || id === "hul") {
set.add("LUAT");
return set;
}
const isTechPure = ["bkhn", "uet", "ptit", "dut", "hcmut", "haui", "iuh", "utt", "humg", "huce", "tlu", "phenikaa", "eaut", "hcmus", "hus"].includes(id);
if (isTechPure) {
set.add("CONG_NGHE");
set.add("QUAN_TRI"); // Có Viện Quản lý/Kinh tế công nghiệp
return set;
}
if (["hnue", "hnue2", "hcmue", "ued", "dhsphue", "niem"].includes(id)) {
set.add("SU_PHAM");
set.add("NGOAI_NGU");
set.add("XA_HOI");
return set;
}
if (id === "ussh") {
set.add("XA_HOI");
set.add("NGOAI_NGU");
set.add("DU_LICH");
return set;
}
if (id === "ajc") {
set.add("XA_HOI");
set.add("QUAN_TRI");
set.add("NGOAI_NGU");
return set;
}
if (id === "dav") {
set.add("XA_HOI");
set.add("NGOAI_NGU");
set.add("LUAT");
set.add("QUAN_TRI");
return set;
}
if (["hvtc", "ueb", "hce", "apd"].includes(id)) {
set.add("TAI_CHINH");
set.add("QUAN_TRI");
return set;
}
if (["ba", "hub", "tcnh_hn"].includes(id)) {
set.add("TAI_CHINH");
set.add("QUAN_TRI");
set.add("LUAT");
set.add("CONG_NGHE");
return set;
}
if (["neu", "ueh", "ftu", "tmu", "ufm", "uel", "due"].includes(id)) {
set.add("TAI_CHINH");
set.add("QUAN_TRI");
set.add("LUAT");
set.add("NGOAI_NGU");
if (["neu", "ueh"].includes(id)) set.add("CONG_NGHE");
if (["neu", "tmu", "ufm"].includes(id)) set.add("DU_LICH");
return set;
}
if (name.includes("y dược") || name.includes("y hà nội") || name.includes("mỹ thuật") || name.includes("nhạc viện") || name.includes("kiến trúc")) {
set.add("XA_HOI");
return set;
}
set.add("CONG_NGHE");
set.add("NGOAI_NGU");
set.add("LUAT");
set.add("TAI_CHINH");
set.add("QUAN_TRI");
set.add("DU_LICH");
set.add("SU_PHAM");
set.add("XA_HOI");
return set;
}
const UNIVERSITIES = [
{
id: "neu",
code: "NEU",
name: "ĐH Kinh Tế Quốc Dân",
fullName: "Trường Đại học Kinh Tế Quốc Dân (NEU)",
aliases: ["KTQD"],
color: "#D32F2F",
faculties: STANDARD_FACULTIES
},
{
id: "bkhn",
code: "BKHN",
name: "ĐH Bách Khoa Hà Nội",
fullName: "Đại học Bách Khoa Hà Nội (HUST)",
aliases: ["HUST","BK"],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "ftu",
code: "FTU",
name: "ĐH Ngoại Thương",
fullName: "Trường Đại học Ngoại Thương (FTU)",
aliases: ["Ngoại Thương"],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "tmu",
code: "TMU",
name: "ĐH Thương Mại",
fullName: "Trường Đại học Thương Mại (TMU)",
aliases: ["Thương Mại","VCU"],
color: "#E65100",
faculties: STANDARD_FACULTIES
},
{
id: "hvtc",
code: "AOF",
name: "Học Viện Tài Chính",
fullName: "Học Viện Tài Chính (AOF)",
aliases: ["HVTC","HTC","Academy of Finance"],
color: "#1B5E20",
faculties: STANDARD_FACULTIES
},
{
id: "ueh",
code: "UEH",
name: "ĐH Kinh Tế TP.HCM",
fullName: "Đại học Kinh Tế TP. Hồ Chí Minh (UEH)",
aliases: ["Kinh Tế TPHCM"],
color: "#0277BD",
faculties: STANDARD_FACULTIES
},
{
id: "ba",
code: "BAV",
name: "Học Viện Ngân Hàng",
fullName: "Học Viện Ngân Hàng (BAV)",
aliases: ["HVNH","Ngân Hàng","BA","BAV"],
color: "#B71C1C",
faculties: STANDARD_FACULTIES
},
{
id: "dav",
code: "DAV",
name: "Học Viện Ngoại Giao",
fullName: "Học Viện Ngoại Giao (DAV)",
aliases: ["HVNG","Ngoại Giao"],
color: "#4A148C",
faculties: STANDARD_FACULTIES
},
{
id: "uet",
code: "UET",
name: "ĐH Công Nghệ - ĐHQGHN",
fullName: "Trường Đại học Công Nghệ - ĐHQGHN",
aliases: ["Công Nghệ ĐHQGHN"],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "ueb",
code: "UEB",
name: "ĐH Kinh Tế - ĐHQGHN",
fullName: "Trường Đại học Kinh Tế - ĐHQGHN",
aliases: ["Kinh Tế ĐHQGHN"],
color: "#880E4F",
faculties: STANDARD_FACULTIES
},
{
id: "ulis",
code: "ULIS",
name: "ĐH Ngoại Ngữ - ĐHQGHN",
fullName: "Trường Đại học Ngoại Ngữ - ĐHQGHN",
aliases: ["Ngoại Ngữ ĐHQGHN"],
color: "#00695C",
faculties: STANDARD_FACULTIES
},
{
id: "ussh",
code: "USSH",
name: "ĐH KHXH&NV - ĐHQGHN",
fullName: "Trường Đại học Khoa Học Xã Hội & Nhân Văn - ĐHQGHN",
aliases: ["Nhân Văn","KHXHNV"],
color: "#880E4F",
faculties: STANDARD_FACULTIES
},
{
id: "ptit",
code: "PTIT",
name: "HV Công Nghệ Bưu Chính Viễn Thông",
fullName: "Học Viện Công Nghệ Bưu Chính Viễn Thông (PTIT)",
aliases: ["Bưu Chính","BCVT"],
color: "#E53935",
faculties: STANDARD_FACULTIES
},
{
id: "hlu",
code: "HLU",
name: "ĐH Luật Hà Nội",
fullName: "Trường Đại học Luật Hà Nội (HLU)",
aliases: ["Luật Hà Nội"],
color: "#6A1B9A",
faculties: STANDARD_FACULTIES
},
{
id: "hutech",
code: "HUTECH",
name: "ĐH Công Nghệ TP.HCM (HUTECH)",
fullName: "Trường Đại học Công Nghệ TP.HCM (HUTECH)",
aliases: [],
color: "#D32F2F",
faculties: STANDARD_FACULTIES
},
{
id: "vanlang",
code: "VLU",
name: "ĐH Văn Lang",
fullName: "Trường Đại học Văn Lang (VLU)",
aliases: ["Văn Lang"],
color: "#C2185B",
faculties: STANDARD_FACULTIES
},
{
id: "hoasen",
code: "HSU",
name: "ĐH Hoa Sen",
fullName: "Trường Đại học Hoa Sen (HSU)",
aliases: ["Hoa Sen"],
color: "#0277BD",
faculties: STANDARD_FACULTIES
},
{
id: "dhhp",
code: "DHHP",
name: "ĐH Hải Phòng",
fullName: "Trường Đại học Hải Phòng (DHHP)",
aliases: ["HPU","ĐH Hải Phòng"],
color: "#0288D1",
faculties: STANDARD_FACULTIES
},
{
id: "duytan",
code: "DTU",
name: "ĐH Duy Tân",
fullName: "Trường Đại học Duy Tân Đà Nẵng (DTU)",
aliases: ["Duy Tân"],
color: "#C62828",
faculties: STANDARD_FACULTIES
},
{
id: "thanglong",
code: "TLU",
name: "ĐH Thăng Long",
fullName: "Trường Đại học Thăng Long (TLU)",
aliases: ["TLU_HN","Thăng Long"],
color: "#C2185B",
faculties: STANDARD_FACULTIES
},
{
id: "agu",
code: "AGU",
name: "ĐH An Giang",
fullName: "Trường Đại học An Giang - ĐHQG TP.HCM",
aliases: [],
color: "#2E7D32",
faculties: STANDARD_FACULTIES
},
{
id: "apd",
code: "APD",
name: "Học Viện Chính Sách & Phát Triển",
fullName: "Học Viện Chính Sách và Phát Triển (APD)",
aliases: [],
color: "#283593",
faculties: STANDARD_FACULTIES
},
{
id: "dlu",
code: "DLU",
name: "ĐH Đà Lạt",
fullName: "Trường Đại học Đà Lạt (DLU)",
aliases: [],
color: "#388E3C",
faculties: STANDARD_FACULTIES
},
{
id: "dnpu",
code: "DNPU",
name: "ĐH Đồng Nai",
fullName: "Trường Đại học Đồng Nai (DNPU)",
aliases: ["DNPU","DNU_DN","Đồng Nai"],
color: "#00838F",
faculties: STANDARD_FACULTIES
},
{
id: "due",
code: "DUE",
name: "ĐH Kinh Tế - ĐH Đà Nẵng",
fullName: "Trường Đại học Kinh Tế - Đại học Đà Nẵng (DUE)",
aliases: [],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "eaut",
code: "EAUT",
name: "ĐH Công Nghệ Đông Á",
fullName: "Trường Đại học Công Nghệ Đông Á (EAUT)",
aliases: [],
color: "#1A237E",
faculties: STANDARD_FACULTIES
},
{
id: "hce",
code: "HCE",
name: "ĐH Kinh Tế Huế",
fullName: "Trường Đại học Kinh Tế - Đại học Huế (HCE)",
aliases: [],
color: "#00838F",
faculties: STANDARD_FACULTIES
},
{
id: "hcmuc",
code: "HCMUC",
name: "ĐH Văn Hóa TP.HCM",
fullName: "Trường Đại học Văn Hóa TP. Hồ Chí Minh (HCMUC)",
aliases: [],
color: "#E65100",
faculties: STANDARD_FACULTIES
},
{
id: "hcmue",
code: "HCMUE",
name: "ĐH Sư Phạm TP.HCM",
fullName: "Trường Đại học Sư Phạm TP.HCM (HCMUE)",
aliases: [],
color: "#4A148C",
faculties: STANDARD_FACULTIES
},
{
id: "hongduc",
code: "HDU",
name: "ĐH Hồng Đức",
fullName: "Trường Đại học Hồng Đức - Thanh Hóa (HDU)",
aliases: ["Hồng Đức"],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "hou",
code: "HOU",
name: "ĐH Mở Hà Nội",
fullName: "Trường Đại học Mở Hà Nội (HOU)",
aliases: ["Mở Hà Nội"],
color: "#E65100",
faculties: STANDARD_FACULTIES
},
{
id: "huflit",
code: "HUFLIT",
name: "ĐH Ngoại Ngữ - Tin Học TP.HCM",
fullName: "Trường Đại học Ngoại Ngữ - Tin Học TP.HCM (HUFLIT)",
aliases: [],
color: "#00897B",
faculties: STANDARD_FACULTIES
},
{
id: "humg",
code: "HUMG",
name: "ĐH Mỏ - Địa Chất",
fullName: "Trường Đại học Mỏ - Địa Chất (HUMG)",
aliases: ["Mỏ Địa Chất"],
color: "#455A64",
faculties: STANDARD_FACULTIES
},
{
id: "hunre",
code: "HUNRE",
name: "ĐH Tài Nguyên & Môi Trường HN",
fullName: "Trường Đại học Tài Nguyên và Môi Trường Hà Nội",
aliases: [],
color: "#00897B",
faculties: STANDARD_FACULTIES
},
{
id: "iuh",
code: "IUH",
name: "ĐH Công Nghiệp TP.HCM",
fullName: "Trường Đại học Công Nghiệp TP. Hồ Chí Minh (IUH)",
aliases: [],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "kinhbac",
code: "KBU",
name: "ĐH Kinh Bắc",
fullName: "Trường Đại học Kinh Bắc (KBU)",
aliases: [],
color: "#37474F",
faculties: STANDARD_FACULTIES
},
{
id: "mku",
code: "MKU",
name: "ĐH Cửu Long",
fullName: "Trường Đại học Cửu Long (MKU)",
aliases: [],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "ncu",
code: "DNC",
name: "ĐH Nam Cần Thơ",
fullName: "Trường Đại học Nam Cần Thơ (DNC)",
aliases: [],
color: "#C62828",
faculties: STANDARD_FACULTIES
},
{
id: "niem",
code: "NIEM",
name: "Học Viện Quản Lý Giáo Dục",
fullName: "Học Viện Quản Lý Giáo Dục (NIEM)",
aliases: [],
color: "#00695C",
faculties: STANDARD_FACULTIES
},
{
id: "ntt",
code: "NTTU",
name: "ĐH Nguyễn Tất Thành",
fullName: "Trường Đại học Nguyễn Tất Thành (NTTU)",
aliases: [],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "ntu",
code: "NTU",
name: "ĐH Nha Trang",
fullName: "Trường Đại học Nha Trang (NTU)",
aliases: ["Nha Trang"],
color: "#0288D1",
faculties: STANDARD_FACULTIES
},
{
id: "ou",
code: "OU",
name: "ĐH Mở TP.HCM",
fullName: "Trường Đại học Mở TP. Hồ Chí Minh (OU)",
aliases: ["Mở TPHCM"],
color: "#00838F",
faculties: STANDARD_FACULTIES
},
{
id: "pdu",
code: "PDU",
name: "ĐH Phạm Văn Đồng",
fullName: "Trường Đại học Phạm Văn Đồng - Quảng Ngãi",
aliases: [],
color: "#0288D1",
faculties: STANDARD_FACULTIES
},
{
id: "phenikaa",
code: "PKA",
name: "ĐH Phenikaa",
fullName: "Trường Đại học Phenikaa (PKA)",
aliases: ["PHENIKAA"],
color: "#FF6F00",
faculties: STANDARD_FACULTIES
},
{
id: "qnu",
code: "QNU",
name: "ĐH Quy Nhơn",
fullName: "Trường Đại học Quy Nhơn (QNU)",
aliases: [],
color: "#00897B",
faculties: STANDARD_FACULTIES
},
{
id: "sgu",
code: "SGU",
name: "ĐH Sài Gòn",
fullName: "Trường Đại học Sài Gòn (SGU)",
aliases: [],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "siu",
code: "SIU",
name: "ĐH Quốc Tế Sài Gòn",
fullName: "Trường Đại học Quốc Tế Sài Gòn (SIU)",
aliases: [],
color: "#7B1FA2",
faculties: STANDARD_FACULTIES
},
{
id: "tcnh_hn",
code: "FBU",
name: "ĐH Tài Chính - Ngân Hàng HN",
fullName: "Trường Đại học Tài Chính - Ngân Hàng Hà Nội (FBU)",
aliases: ["TUF","TCNH","FBU"],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "tdmu",
code: "TDMU",
name: "ĐH Thủ Dầu Một",
fullName: "Trường Đại học Thủ Dầu Một - Bình Dương",
aliases: [],
color: "#388E3C",
faculties: STANDARD_FACULTIES
},
{
id: "tdu",
code: "TDU",
name: "ĐH Tây Đô",
fullName: "Trường Đại học Tây Đô (TDU)",
aliases: ["TDU_CT","Tây Đô"],
color: "#E65100",
faculties: STANDARD_FACULTIES
},
{
id: "thanhdong",
code: "TDU",
name: "ĐH Thành Đông",
fullName: "Trường Đại học Thành Đông (TDU)",
aliases: [],
color: "#00838F",
faculties: STANDARD_FACULTIES
},
{
id: "tlu",
code: "TLU",
name: "ĐH Thủy Lợi",
fullName: "Trường Đại học Thủy Lợi (TLU)",
aliases: [],
color: "#0277BD",
faculties: STANDARD_FACULTIES
},
{
id: "tnu",
code: "TNU",
name: "Đại Học Thái Nguyên",
fullName: "Đại Học Thái Nguyên (TNU)",
aliases: [],
color: "#2E7D32",
faculties: STANDARD_FACULTIES
},
{
id: "tvu",
code: "TVU",
name: "ĐH Trà Vinh",
fullName: "Trường Đại học Trà Vinh (TVU)",
aliases: [],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "ued",
code: "UED",
name: "ĐH Sư Phạm - ĐH Đà Nẵng",
fullName: "Trường Đại học Sư Phạm - Đại học Đà Nẵng (UED)",
aliases: [],
color: "#00695C",
faculties: STANDARD_FACULTIES
},
{
id: "uel",
code: "UEL",
name: "ĐH Kinh Tế - Luật TP.HCM",
fullName: "Trường Đại học Kinh Tế - Luật - ĐHQG TP.HCM",
aliases: [],
color: "#1B5E20",
faculties: STANDARD_FACULTIES
},
{
id: "ufm",
code: "UFM",
name: "ĐH Tài Chính - Marketing",
fullName: "Trường Đại học Tài Chính - Marketing (UFM)",
aliases: [],
color: "#F57F17",
faculties: STANDARD_FACULTIES
},
{
id: "ukh",
code: "UKH",
name: "ĐH Khánh Hòa",
fullName: "Trường Đại học Khánh Hòa (UKH)",
aliases: [],
color: "#1976D2",
faculties: STANDARD_FACULTIES
},
{
id: "ulsa",
code: "ULSA",
name: "ĐH Lao Động - Xã Hội",
fullName: "Trường Đại học Lao Động - Xã Hội (ULSA)",
aliases: [],
color: "#D32F2F",
faculties: STANDARD_FACULTIES
},
{
id: "ulsa2",
code: "ULSA",
name: "ĐH Lao Động - Xã Hội CS2",
fullName: "Đại Học Lao Động Xã Hội Cơ Sở 2 TPHCM",
aliases: ["ULSA2","ULSA CS2"],
color: "#D32F2F",
faculties: STANDARD_FACULTIES
},
{
id: "utt",
code: "UTT",
name: "ĐH Công Nghệ GTVT",
fullName: "Trường Đại học Công Nghệ Giao Thông Vận Tải (UTT)",
aliases: [],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "vhu",
code: "VHU",
name: "ĐH Văn Hiến",
fullName: "Trường Đại học Văn Hiến (VHU)",
aliases: [],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "vinhuni",
code: "VINHUNI",
name: "Đại Học Vinh",
fullName: "Trường Đại học Vinh (Vinh University)",
aliases: ["ĐH Vinh"],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "vnua",
code: "VNUA",
name: "Học Viện Nông Nghiệp VN",
fullName: "Học Viện Nông Nghiệp Việt Nam (VNUA)",
aliases: ["HVNN","Nông Nghiệp"],
color: "#2E7D32",
faculties: STANDARD_FACULTIES
},
{
id: "ajc",
code: "AJC",
name: "Học Viện Báo Chí & Tuyên Truyền",
fullName: "Học Viện Báo Chí & Tuyên Truyền (AJC)",
aliases: ["HVBCTT","Báo Chí"],
color: "#C62828",
faculties: STANDARD_FACULTIES
},
{
id: "bdu",
code: "BDU",
name: "ĐH Bình Dương",
fullName: "Trường Đại học Bình Dương",
aliases: [],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "betu",
code: "BETU",
name: "ĐH Kinh Tế Kỹ Thuật Bình Dương",
fullName: "Trường Đại học Kinh Tế - Kỹ Thuật Bình Dương",
aliases: [],
color: "#0288D1",
faculties: STANDARD_FACULTIES
},
{
id: "blu",
code: "BLU",
name: "ĐH Bạc Liêu",
fullName: "Trường Đại học Bạc Liêu",
aliases: [],
color: "#0288D1",
faculties: STANDARD_FACULTIES
},
{
id: "bvu",
code: "BVU",
name: "ĐH Bà Rịa - Vũng Tàu",
fullName: "Trường Đại học Bà Rịa - Vũng Tàu",
aliases: [],
color: "#00838F",
faculties: STANDARD_FACULTIES
},
{
id: "ctu",
code: "CTU",
name: "ĐH Cần Thơ",
fullName: "Trường Đại học Cần Thơ (CTU)",
aliases: [],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "ctump",
code: "CTUMP",
name: "ĐH Y Dược Cần Thơ",
fullName: "Trường Đại học Y Dược Cần Thơ",
aliases: [],
color: "#00838F",
faculties: STANDARD_FACULTIES
},
{
id: "dhcd",
code: "TUU",
name: "ĐH Công Đoàn",
fullName: "Trường Đại học Công Đoàn (TUU / DHCD)",
aliases: ["DHCD","Công Đoàn"],
color: "#C62828",
faculties: STANDARD_FACULTIES
},
{
id: "dhsphue",
code: "DHS",
name: "ĐH Sư Phạm Huế",
fullName: "Trường Đại học Sư Phạm - Đại học Huế (DHS)",
aliases: ["DHSPHUE","Sư Phạm Huế"],
color: "#6A1B9A",
faculties: STANDARD_FACULTIES
},
{
id: "dnu",
code: "DNU",
name: "ĐH Đại Nam",
fullName: "Trường Đại học Đại Nam (Hà Nội)",
aliases: ["Đại Nam"],
color: "#E65100",
faculties: STANDARD_FACULTIES
},
{
id: "dpu",
code: "DPU",
name: "ĐH Dân Lập Phương Đông",
fullName: "Trường Đại học Phương Đông (Hà Nội)",
aliases: ["Phương Đông"],
color: "#0277BD",
faculties: STANDARD_FACULTIES
},
{
id: "dthu",
code: "DTHU",
name: "ĐH Đồng Tháp",
fullName: "Trường Đại học Đồng Tháp",
aliases: [],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "dut",
code: "DUT",
name: "ĐH Bách Khoa - ĐH Đà Nẵng",
fullName: "Trường Đại học Bách Khoa - Đại học Đà Nẵng",
aliases: [],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "gdu",
code: "GDU",
name: "ĐH Gia Định",
fullName: "Trường Đại học Gia Định (GDU)",
aliases: [],
color: "#F57C00",
faculties: STANDARD_FACULTIES
},
{
id: "hau",
code: "HAU",
name: "ĐH Kiến Trúc Hà Nội",
fullName: "Trường Đại học Kiến Trúc Hà Nội (HAU)",
aliases: [],
color: "#AD1457",
faculties: STANDARD_FACULTIES
},
{
id: "haui",
code: "HAUI",
name: "ĐH Công Nghiệp Hà Nội",
fullName: "Trường Đại học Công Nghiệp Hà Nội (HaUI)",
aliases: [],
color: "#C62828",
faculties: STANDARD_FACULTIES
},
{
id: "hcmcons",
code: "HCMCONS",
name: "Nhạc Viện TP. Hồ Chí Minh",
fullName: "Nhạc Viện TP. Hồ Chí Minh",
aliases: [],
color: "#1A237E",
faculties: STANDARD_FACULTIES
},
{
id: "hcmufa",
code: "HCMUFA",
name: "ĐH Mỹ Thuật TP.HCM",
fullName: "Trường Đại học Mỹ Thuật TP. Hồ Chí Minh",
aliases: [],
color: "#6A1B9A",
faculties: STANDARD_FACULTIES
},
{
id: "hcmunre",
code: "HCMUNRE",
name: "ĐH Tài Nguyên & Môi Trường TP.HCM",
fullName: "Trường Đại học Tài Nguyên và Môi Trường TP.HCM",
aliases: [],
color: "#00897B",
faculties: STANDARD_FACULTIES
},
{
id: "hcmus",
code: "HCMUS",
name: "ĐH Khoa Học Tự Nhiên TP.HCM",
fullName: "Trường Đại học Khoa Học Tự Nhiên - ĐHQG TP.HCM",
aliases: [],
color: "#0288D1",
faculties: STANDARD_FACULTIES
},
{
id: "hcmut",
code: "HCMUT",
name: "ĐH Bách Khoa TP.HCM",
fullName: "Trường Đại học Bách Khoa - ĐHQG TP.HCM",
aliases: [],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "hiu",
code: "HIU",
name: "ĐH Quốc Tế Hồng Bàng",
fullName: "Trường Đại học Quốc Tế Hồng Bàng (HIU)",
aliases: [],
color: "#C62828",
faculties: STANDARD_FACULTIES
},
{
id: "hmu",
code: "HMU",
name: "ĐH Y Hà Nội",
fullName: "Trường Đại học Y Hà Nội (HMU)",
aliases: ["Y Hà Nội"],
color: "#00838F",
faculties: STANDARD_FACULTIES
},
{
id: "hnue",
code: "HNUE",
name: "ĐH Sư Phạm Hà Nội",
fullName: "Trường Đại học Sư Phạm Hà Nội (HNUE)",
aliases: ["Sư Phạm HN"],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "hnue2",
code: "SPH2",
name: "ĐH Sư Phạm Hà Nội 2",
fullName: "Trường Đại học Sư Phạm Hà Nội 2 (SPH2)",
aliases: ["HNUE2","HPU2","Sư Phạm 2"],
color: "#0288D1",
faculties: STANDARD_FACULTIES
},
{
id: "hpumu",
code: "HPMU",
name: "ĐH Y Dược Hải Phòng",
fullName: "Trường Đại học Y Dược Hải Phòng (HPMU)",
aliases: ["HPUMU","Y Hải Phòng"],
color: "#0288D1",
faculties: STANDARD_FACULTIES
},
{
id: "hua",
code: "HUA",
name: "ĐH Mỹ Thuật Việt Nam",
fullName: "Trường Đại học Mỹ Thuật Việt Nam",
aliases: [],
color: "#455A64",
faculties: STANDARD_FACULTIES
},
{
id: "huaf",
code: "HUAF",
name: "ĐH Nông Lâm - ĐH Huế",
fullName: "Trường Đại học Nông Lâm - Đại học Huế",
aliases: [],
color: "#2E7D32",
faculties: STANDARD_FACULTIES
},
{
id: "hub",
code: "HUB",
name: "ĐH Ngân Hàng TP.HCM",
fullName: "Trường Đại học Ngân Hàng TP. Hồ Chí Minh (HUB)",
aliases: ["Ngân Hàng TPHCM"],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "huc",
code: "HUC",
name: "ĐH Văn Hóa Hà Nội",
fullName: "Trường Đại học Văn Hóa Hà Nội (HUC)",
aliases: [],
color: "#E65100",
faculties: STANDARD_FACULTIES
},
{
id: "huce",
code: "HUCE",
name: "ĐH Xây Dựng Hà Nội",
fullName: "Trường Đại học Xây Dựng Hà Nội (HUCE)",
aliases: ["NUCE","Xây Dựng"],
color: "#00695C",
faculties: STANDARD_FACULTIES
},
{
id: "hufl",
code: "HUFL",
name: "ĐH Ngoại Ngữ - ĐH Huế",
fullName: "Trường Đại học Ngoại Ngữ - Đại học Huế",
aliases: [],
color: "#00695C",
faculties: STANDARD_FACULTIES
},
{
id: "huit",
code: "HUIT",
name: "ĐH Công Thương TP.HCM",
fullName: "Trường Đại học Công Thương TP. Hồ Chí Minh (HUIT)",
aliases: [],
color: "#E65100",
faculties: STANDARD_FACULTIES
},
{
id: "hul",
code: "HUL",
name: "ĐH Luật - ĐH Huế",
fullName: "Trường Đại học Luật - Đại học Huế",
aliases: [],
color: "#6A1B9A",
faculties: STANDARD_FACULTIES
},
{
id: "hump",
code: "HUMP",
name: "ĐH Y Dược - ĐH Huế",
fullName: "Trường Đại học Y Dược - Đại học Huế",
aliases: [],
color: "#00695C",
faculties: STANDARD_FACULTIES
},
{
id: "hup",
code: "HUP",
name: "ĐH Dược Hà Nội",
fullName: "Trường Đại học Dược Hà Nội (HUP)",
aliases: ["Dược Hà Nội"],
color: "#00695C",
faculties: STANDARD_FACULTIES
},
{
id: "hus",
code: "HUS",
name: "ĐH Khoa Học Tự Nhiên - ĐHQGHN",
fullName: "Trường Đại học Khoa Học Tự Nhiên - ĐHQGHN",
aliases: ["Tự Nhiên ĐHQGHN"],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "husc",
code: "HUSC",
name: "ĐH Khoa Học - ĐH Huế",
fullName: "Trường Đại học Khoa Học - Đại học Huế",
aliases: [],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "hvu",
code: "HVU",
name: "ĐH Hùng Vương",
fullName: "Trường Đại học Hùng Vương - Phú Thọ",
aliases: [],
color: "#00695C",
faculties: STANDARD_FACULTIES
},
{
id: "ictu",
code: "ICTU",
name: "ĐH Công Nghệ Thông Tin - ĐHTN",
fullName: "Trường Đại học Công Nghệ Thông Tin & Truyền Thông - ĐHTN",
aliases: [],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "is_vnu",
code: "VNU-IS",
name: "Trường Quốc Tế - ĐHQGHN",
fullName: "Trường Quốc Tế - Đại học Quốc Gia Hà Nội (VNU-IS)",
aliases: ["IS_VNU","Quốc Tế ĐHQGHN"],
color: "#0277BD",
faculties: STANDARD_FACULTIES
},
{
id: "iu",
code: "IU",
name: "ĐH Quốc Tế - ĐHQG TP.HCM",
fullName: "Trường Đại học Quốc Tế - ĐHQG TP.HCM",
aliases: [],
color: "#00695C",
faculties: STANDARD_FACULTIES
},
{
id: "lhu",
code: "LHU",
name: "ĐH Lạc Hồng",
fullName: "Trường Đại học Lạc Hồng (LHU)",
aliases: [],
color: "#D32F2F",
faculties: STANDARD_FACULTIES
},
{
id: "nlu",
code: "NLU",
name: "ĐH Nông Lâm TP.HCM",
fullName: "Trường Đại học Nông Lâm TP. Hồ Chí Minh",
aliases: [],
color: "#2E7D32",
faculties: STANDARD_FACULTIES
},
{
id: "pnt_pt",
code: "UPT",
name: "ĐH Phan Thiết",
fullName: "Trường Đại học Phan Thiết",
aliases: [],
color: "#0097A7",
faculties: STANDARD_FACULTIES
},
{
id: "pntu",
code: "PNTU",
name: "ĐH Y Khoa Phạm Ngọc Thạch",
fullName: "Trường Đại học Y Khoa Phạm Ngọc Thạch",
aliases: [],
color: "#00897B",
faculties: STANDARD_FACULTIES
},
{
id: "pvu",
code: "PVU",
name: "ĐH Dầu Khí Việt Nam",
fullName: "Trường Đại học Dầu Khí Việt Nam (PVU)",
aliases: [],
color: "#0288D1",
faculties: STANDARD_FACULTIES
},
{
id: "pyu",
code: "PYU",
name: "ĐH Phú Yên",
fullName: "Trường Đại học Phú Yên",
aliases: [],
color: "#00838F",
faculties: STANDARD_FACULTIES
},
{
id: "qnu_qt",
code: "QTU",
name: "ĐH Quang Trung",
fullName: "Trường Đại học Quang Trung - Quy Nhơn",
aliases: [],
color: "#00695C",
faculties: STANDARD_FACULTIES
},
{
id: "sis_vnu",
code: "VNU-SIS",
name: "Trường Khoa Học Liên Ngành - ĐHQGHN",
fullName: "Trường Khoa Học Liên Ngành & Nghệ Thuật - ĐHQGHN (VNU-SIS)",
aliases: ["SIS_VNU"],
color: "#F57F17",
faculties: STANDARD_FACULTIES
},
{
id: "skda",
code: "SKDA",
name: "ĐH Sân Khấu - Điện Ảnh Hà Nội",
fullName: "Trường Đại học Sân Khấu - Điện Ảnh Hà Nội",
aliases: [],
color: "#B71C1C",
faculties: STANDARD_FACULTIES
},
{
id: "skda_hcm",
code: "SKDA_HCM",
name: "ĐH Sân Khấu - Điện Ảnh TP.HCM",
fullName: "Trường Đại học Sân Khấu - Điện Ảnh TP. Hồ Chí Minh",
aliases: [],
color: "#B71C1C",
faculties: STANDARD_FACULTIES
},
{
id: "slaw",
code: "VNU-UL",
name: "Trường Luật - ĐHQGHN",
fullName: "Trường Đại học Luật - Đại học Quốc Gia Hà Nội (VNU-UL)",
aliases: ["SLAW","Luật ĐHQGHN"],
color: "#6A1B9A",
faculties: STANDARD_FACULTIES
},
{
id: "tbd",
code: "TBD",
name: "ĐH Thái Bình Dương",
fullName: "Trường Đại học Thái Bình Dương - Nha Trang",
aliases: [],
color: "#0097A7",
faculties: STANDARD_FACULTIES
},
{
id: "tbump",
code: "TBMU",
name: "ĐH Y Dược Thái Bình",
fullName: "Trường Đại học Y Dược Thái Bình (TBMU)",
aliases: ["TBUMP","Y Thái Bình"],
color: "#1B5E20",
faculties: STANDARD_FACULTIES
},
{
id: "tdtt",
code: "UPES1",
name: "ĐH Thể Dục Thể Thao Bắc Ninh",
fullName: "Trường Đại học Thể Dục Thể Thao Bắc Ninh (UPES1)",
aliases: ["TDTT"],
color: "#2E7D32",
faculties: STANDARD_FACULTIES
},
{
id: "tdtt_dn",
code: "UPES3",
name: "ĐH Thể Dục Thể Thao Đà Nẵng",
fullName: "Trường Đại học Thể Dục Thể Thao Đà Nẵng (UPES3)",
aliases: ["TDTT_DN"],
color: "#E65100",
faculties: STANDARD_FACULTIES
},
{
id: "tdtt_hcm",
code: "UPES2",
name: "ĐH Thể Dục Thể Thao TP.HCM",
fullName: "Trường Đại học Thể Dục Thể Thao TP. Hồ Chí Minh (UPES2)",
aliases: ["TDTT_HCM"],
color: "#0288D1",
faculties: STANDARD_FACULTIES
},
{
id: "tgu",
code: "TGU",
name: "ĐH Tiền Giang",
fullName: "Trường Đại học Tiền Giang (TGU)",
aliases: [],
color: "#0097A7",
faculties: STANDARD_FACULTIES
},
{
id: "tnue",
code: "TNUE",
name: "ĐH Sư Phạm - ĐH Thái Nguyên",
fullName: "Trường Đại học Sư Phạm - Đại học Thái Nguyên",
aliases: [],
color: "#1B5E20",
faculties: STANDARD_FACULTIES
},
{
id: "tnump",
code: "TUMP",
name: "ĐH Y Dược - ĐH Thái Nguyên",
fullName: "Trường Đại học Y Dược - Đại học Thái Nguyên (TUMP)",
aliases: ["TNUMP"],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "ttn",
code: "TTN",
name: "ĐH Tây Nguyên",
fullName: "Trường Đại học Tây Nguyên - Đắk Lắk",
aliases: [],
color: "#1B5E20",
faculties: STANDARD_FACULTIES
},
{
id: "ttu",
code: "TTU",
name: "ĐH Tân Tạo",
fullName: "Trường Đại học Tân Tạo - Long An",
aliases: [],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "tuaf",
code: "TUAF",
name: "ĐH Nông Lâm - ĐH Thái Nguyên",
fullName: "Trường Đại học Nông Lâm - Đại học Thái Nguyên",
aliases: [],
color: "#1B5E20",
faculties: STANDARD_FACULTIES
},
{
id: "uah",
code: "UAH",
name: "ĐH Kiến Trúc TP.HCM",
fullName: "Trường Đại học Kiến Trúc TP. Hồ Chí Minh (UAH)",
aliases: [],
color: "#D32F2F",
faculties: STANDARD_FACULTIES
},
{
id: "uef",
code: "UEF",
name: "ĐH Kinh Tế - Tài Chính TP.HCM",
fullName: "Trường Đại học Kinh Tế - Tài Chính TP.HCM (UEF)",
aliases: [],
color: "#D32F2F",
faculties: STANDARD_FACULTIES
},
{
id: "ufl",
code: "UFL",
name: "ĐH Ngoại Ngữ - ĐH Đà Nẵng",
fullName: "Trường Đại học Ngoại Ngữ - Đại học Đà Nẵng",
aliases: [],
color: "#00838F",
faculties: STANDARD_FACULTIES
},
{
id: "uhl",
code: "UL",
name: "ĐH Luật TP.HCM",
fullName: "Trường Đại học Luật TP. Hồ Chí Minh (UL / ULS)",
aliases: ["UHL","ULS","Luật TPHCM"],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "uit",
code: "UIT",
name: "ĐH Công Nghệ Thông Tin TP.HCM",
fullName: "Trường Đại học Công Nghệ Thông Tin - ĐHQG TP.HCM",
aliases: [],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "ump",
code: "UMP",
name: "ĐH Y Dược TP.HCM",
fullName: "Đại học Y Dược TP. Hồ Chí Minh (UMP)",
aliases: [],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "ump_vnu",
code: "VNU-UMP",
name: "ĐH Y Dược - ĐHQGHN",
fullName: "Trường Đại học Y Dược - ĐHQGHN (VNU-UMP)",
aliases: ["UMP_VNU","Y Dược ĐHQGHN"],
color: "#00838F",
faculties: STANDARD_FACULTIES
},
{
id: "uneti",
code: "UNETI",
name: "ĐH Kinh Tế - Kỹ Thuật Công Nghiệp",
fullName: "Trường Đại học Kinh Tế - Kỹ Thuật Công Nghiệp",
aliases: [],
color: "#0288D1",
faculties: STANDARD_FACULTIES
},
{
id: "ussh_hcm",
code: "USSH",
name: "ĐH KHXH&NV TP.HCM",
fullName: "Trường Đại học Khoa Học Xã Hội & Nhân Văn - ĐHQG TP.HCM",
aliases: ["USSH_HCM","Nhân Văn TPHCM"],
color: "#880E4F",
faculties: STANDARD_FACULTIES
},
{
id: "utb",
code: "UTB",
name: "ĐH Tây Bắc",
fullName: "Trường Đại học Tây Bắc - Sơn La",
aliases: [],
color: "#2E7D32",
faculties: STANDARD_FACULTIES
},
{
id: "utc",
code: "UTC",
name: "ĐH Giao Thông Vận Tải",
fullName: "Trường Đại học Giao Thông Vận Tải (UTC)",
aliases: ["GTVT"],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "utc2",
code: "UTC",
name: "ĐH Giao Thông Vận Tải Phân Hiệu TP.HCM",
fullName: "Phân hiệu Trường Đại học Giao Thông Vận Tải tại TP.HCM",
aliases: ["UTC2","UTC CS2"],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "ute",
code: "HCMUTE",
name: "ĐH Sư Phạm Kỹ Thuật TP.HCM",
fullName: "Trường Đại học Sư Phạm Kỹ Thuật TP.HCM (HCMUTE)",
aliases: ["SPKT","UTE"],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "ute_dn",
code: "UTE",
name: "ĐH Sư Phạm Kỹ Thuật - ĐH Đà Nẵng",
fullName: "Trường Đại học Sư Phạm Kỹ Thuật - ĐH Đà Nẵng",
aliases: ["UTE_DN","SPKT Đà Nẵng"],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "ute_vl",
code: "VLUTE",
name: "ĐH Sư Phạm Kỹ Thuật Vĩnh Long",
fullName: "Trường Đại học Sư Phạm Kỹ Thuật Vĩnh Long (VLUTE)",
aliases: ["UTE_VL","SPKT Vĩnh Long"],
color: "#00838F",
faculties: STANDARD_FACULTIES
},
{
id: "utehy",
code: "UTEHY",
name: "ĐH Sư Phạm Kỹ Thuật Hưng Yên",
fullName: "Trường Đại học Sư Phạm Kỹ Thuật Hưng Yên",
aliases: [],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "vju",
code: "VJU",
name: "ĐH Việt Nhật - ĐHQGHN",
fullName: "Trường Đại học Việt Nhật - ĐHQGHN",
aliases: [],
color: "#C62828",
faculties: STANDARD_FACULTIES
},
{
id: "vku",
code: "VKU",
name: "ĐH CNTT & TT Việt - Hàn (ĐHĐN)",
fullName: "Trường Đại học Công Nghệ Thông Tin và Truyền Thông Việt - Hàn",
aliases: [],
color: "#1565C0",
faculties: STANDARD_FACULTIES
},
{
id: "vmu",
code: "VMU",
name: "ĐH Hàng Hải Việt Nam",
fullName: "Trường Đại học Hàng Hải Việt Nam (VMU)",
aliases: ["Hàng Hải"],
color: "#0D47A1",
faculties: STANDARD_FACULTIES
},
{
id: "vnam",
code: "VNAM",
name: "Học Viện Âm Nhạc Quốc Gia VN",
fullName: "Học Viện Âm Nhạc Quốc Gia Việt Nam",
aliases: [],
color: "#C62828",
faculties: STANDARD_FACULTIES
},
{
id: "vnuf",
code: "VNUF",
name: "ĐH Lâm Nghiệp",
fullName: "Trường Đại học Lâm Nghiệp Việt Nam",
aliases: [],
color: "#1B5E20",
faculties: STANDARD_FACULTIES
},
{
id: "vnukg",
code: "VNUKG",
name: "ĐH Kiên Giang",
fullName: "Trường Đại học Kiên Giang",
aliases: [],
color: "#00838F",
faculties: STANDARD_FACULTIES
},
{
id: "vohun",
code: "HUPH",
name: "ĐH Y Tế Công Cộng",
fullName: "Trường Đại học Y Tế Công Cộng (HUPH)",
aliases: ["VOHUN","Y Tế Công Cộng"],
color: "#0288D1",
faculties: STANDARD_FACULTIES
},
{
id: "vpu_vt",
code: "VXU",
name: "ĐH Công Nghệ Vạn Xuân",
fullName: "Trường Đại học Công Nghệ Vạn Xuân (VXU)",
aliases: ["VPU_VT","VPU","Vạn Xuân"],
color: "#00838F",
faculties: STANDARD_FACULTIES
},
{
id: "yersin",
code: "YERSIN",
name: "ĐH Yersin Đà Lạt",
fullName: "Trường Đại học Yersin Đà Lạt",
aliases: [],
color: "#2E7D32",
faculties: STANDARD_FACULTIES
}
];
const REAL_DOCUMENTS_DATABASE = [{"id": "REAL-DOC-078", "code": "THML", "baseName": "Đề Cương Triết Học Mác - Lênin", "rawName": "Đề Cương Triết Học Mác - Lênin.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.8, "reviewsCount": 89, "downloads": "1.4k+", "price": 50000, "originalPrice": 135000, "badge": "Chuẩn Đề Thi", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1dHGlZZ1jesJPbjOa3rBrGVp8ccfOZp8X", "isReal": true, "university": "ueb", "driveType": "file"}, {"id": "REAL-DOC-069", "code": "KTCT", "baseName": "Đề Cương Kinh Tế Chính Trị", "rawName": "Đề Cương Kinh Tế Chính Trị.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 4.8, "reviewsCount": 39, "downloads": "3.0k+", "price": 50000, "originalPrice": 150000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "19posAEi4qrVT1UyRoH_9yR6y7kF6MIdb", "isReal": true, "university": "dav", "driveType": "file"}, {"id": "REAL-DOC-009", "code": "CNXH", "baseName": "Đề Cương Chủ Nghĩa Xã Hội", "rawName": "Đề Cương Chủ Nghĩa Xã Hội", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 36, "rating": 5.0, "reviewsCount": 173, "downloads": "2.0k+", "price": 50000, "originalPrice": 130000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1OARZPJsgHadFojlmw8e-RuQoXHLI-1Pj", "isReal": true, "university": "ussh", "driveType": "file"}, {"id": "REAL-DOC-079", "code": "TTHCM2", "baseName": "Đề Cương Tư Tưởng Hồ Chí Minh", "rawName": "Đề Cương Tư Tưởng Hồ Chí Minh", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 52, "rating": 4.9, "reviewsCount": 153, "downloads": "1.5k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1usfA8IZvGJCs8RTbkhCkRELBoyAho3RQtKwuHfDQQgU", "isReal": true, "university": "ulis", "driveType": "file"}, {"id": "REAL-DOC-079", "code": "TTHCM", "baseName": "Đề Cương Tư Tưởng Hồ Chí Minh", "rawName": "Đề Cương Tư Tưởng Hồ Chí Minh", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 34, "rating": 4.6, "reviewsCount": 124, "downloads": "1.5k+", "price": 50000, "originalPrice": 150000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1im7zbw5-l88tJRmaUclKNTWd2JWMToib", "isReal": true, "university": "ulis", "driveType": "file"}, {"id": "REAL-DOC-135", "code": "LSNN2", "baseName": "Đề Cương Lịch Sử Nhà Nước", "rawName": "Đề Cương Lịch Sử Nhà Nước.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 4.9, "reviewsCount": 87, "downloads": "2.1k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 98%", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1rQ9Bl7i6a7FaftyjS4O4jFetVBLE_NmF", "isReal": true, "university": "uet", "driveType": "file"}, {"id": "REAL-DOC-135", "code": "LSNN", "baseName": "Đề Cương Lịch Sử Nhà Nước", "rawName": "Đề Cương Lịch Sử Nhà Nước", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 46, "rating": 4.9, "reviewsCount": 34, "downloads": "2.1k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1thaj0dm0iKvlJGC8xA2hAtsK9dIeMwH8Q7323XlvPW4", "isReal": true, "university": "uet", "driveType": "file"}, {"id": "REAL-DOC-030", "code": "LSVMTG", "baseName": "Đề Cương Lịch Sử Văn Minh Thế Giới", "rawName": "Đề Cương Lịch Sử Văn Minh Thế Giới.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.9, "reviewsCount": 116, "downloads": "1.6k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Đề Thi", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Gcr3tt4p43x61kabwqJctaAp9mBCrofC", "isReal": true, "university": "dnu", "driveType": "file"}, {"id": "REAL-DOC-032", "code": "PLDC", "baseName": "Đề Cương Pháp Luật Đại Cương", "rawName": "Đề Cương Pháp Luật Đại Cương.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 32, "rating": 4.9, "reviewsCount": 176, "downloads": "1.8k+", "price": 50000, "originalPrice": 140000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1bF4eofCqWCb5M5jaTJVqA8U5-NUOiBEJ", "isReal": true, "university": "tcnh_hn", "driveType": "file"}, {"id": "REAL-DOC-145", "code": "TCC2", "baseName": "Đề Cương Toán Cao Cấp", "rawName": "Đề Cương Toán Cao Cấp.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.6, "reviewsCount": 45, "downloads": "3.1k+", "price": 50000, "originalPrice": 130000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Utu_KAygyrSu09pbKtLyhggtSdo6JJ_i", "isReal": true, "university": "ulis", "driveType": "file"}, {"id": "REAL-DOC-086", "code": "GT", "baseName": "Đề Cương Giải Tích", "rawName": "Đề Cương Giải Tích.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.9, "reviewsCount": 113, "downloads": "2.2k+", "price": 50000, "originalPrice": 95000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1kq0fnha1OxYjJkvY0i44vuCI1NsHz5Y0", "isReal": true, "university": "vanlang", "driveType": "file"}, {"id": "REAL-DOC-013", "code": "TKT", "baseName": "Đề Cương Toán Kinh Tế", "rawName": "Đề Cương Toán Kinh Tế", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.8, "reviewsCount": 171, "downloads": "2.4k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1U677ypyCALOEwFMhYP0AFGPADLucgZ2quKU01Q89QjY", "isReal": true, "university": "neu", "driveType": "file"}, {"id": "REAL-DOC-153", "code": "XSTK", "baseName": "Đề Cương Xác Suất Thống Kê", "rawName": "Đề Cương Xác Suất Thống Kê", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.8, "reviewsCount": 136, "downloads": "1.4k+", "price": 50000, "originalPrice": 100000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1ldTmDrCv_Hr65zGIiDkxDI3LU_cSor4k", "isReal": true, "university": "ueh", "driveType": "folder"}, {"id": "REAL-DOC-006", "code": "NLTK", "baseName": "Đề Cương Nguyên Lý Thống Kê", "rawName": "Đề Cương Nguyên Lý Thống Kê", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.7, "reviewsCount": 114, "downloads": "1.7k+", "price": 50000, "originalPrice": 100000, "badge": "Chuẩn Đề Thi", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1nzsjg2FB8z7RIaUqftf0pyuIklHVnL9h7jmRwfXhq4U", "isReal": true, "university": "bkhn", "driveType": "file"}, {"id": "REAL-DOC-021", "code": "TKH", "baseName": "Đề Cương Thống Kê Học", "rawName": "Đề Cương Thống Kê Học", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 4.9, "reviewsCount": 48, "downloads": "3.2k+", "price": 50000, "originalPrice": 110000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1MJlOlYUW8CUvEOBjrJ8eWqvNaEOOLGo1_0AupjNR8Ms", "isReal": true, "university": "ueh", "driveType": "file"}, {"id": "REAL-DOC-143", "code": "KTVM", "baseName": "Đề Cương Kinh Tế Vi Mô", "rawName": "Đề Cương Kinh Tế Vi Mô.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.7, "reviewsCount": 47, "downloads": "2.9k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 98%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1A5iYx9C4u4fKwRXRMBF3GB3uOcdETZ6b", "isReal": true, "university": "neu", "driveType": "file"}, {"id": "REAL-DOC-056", "code": "KTVM2", "baseName": "Đề Cương Kinh Tế Vĩ Mô", "rawName": "Đề Cương Kinh Tế Vĩ Mô.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.6, "reviewsCount": 153, "downloads": "1.7k+", "price": 50000, "originalPrice": 115000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1f0dtM5XLrXQr-V5aeBFGPWcJAGrAN6ED", "isReal": true, "university": "ufm", "driveType": "file"}, {"id": "REAL-DOC-007", "code": "KTL", "baseName": "Đề Cương Kinh Tế Lượng", "rawName": "Đề Cương Kinh Tế Lượng.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 22, "rating": 4.9, "reviewsCount": 45, "downloads": "1.8k+", "price": 50000, "originalPrice": 130000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Bv-lVYqizOH2kUzV1qJJSRnuQBaLoUlb", "isReal": true, "university": "ftu", "driveType": "file"}, {"id": "REAL-DOC-125", "code": "KTHDC", "baseName": "Đề Cương Kinh Tế Học Đại Cương", "rawName": "Đề Cương Kinh Tế Học Đại Cương.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 34, "rating": 4.8, "reviewsCount": 152, "downloads": "3.6k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 98%", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1MpwXeU5Y-BDOdlZNihXabbqmnqpOzGjT", "isReal": true, "university": "hvtc", "driveType": "file"}, {"id": "REAL-DOC-087", "code": "QTH", "baseName": "Đề Cương Quản Trị Học", "rawName": "Đề Cương Quản Trị Học.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 4.8, "reviewsCount": 124, "downloads": "2.3k+", "price": 50000, "originalPrice": 150000, "badge": "Trúng Tủ 98%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1uem4jmzTcFDpPRVzswN7nIbLA4_K6EhX", "isReal": true, "university": "ueh", "driveType": "file"}, {"id": "REAL-DOC-141", "code": "MCB", "baseName": "Đề Cương Marketing Cơ Bản", "rawName": "Đề Cương Marketing Cơ Bản.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 4.8, "reviewsCount": 137, "downloads": "2.7k+", "price": 50000, "originalPrice": 135000, "badge": "Trúng Tủ 98%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1ankCEa0Sc99p1X5CMh_xuBbcTMdfNnev", "isReal": true, "university": "vnua", "driveType": "file"}, {"id": "REAL-DOC-147", "code": "MDV", "baseName": "Đề Cương Marketing Dịch Vụ", "rawName": "Đề Cương Marketing Dịch Vụ.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 40, "rating": 4.7, "reviewsCount": 75, "downloads": "3.3k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1XdImBHdXt5-1dEo2UcZVADN3qQlEEuLS", "isReal": true, "university": "tmu", "driveType": "file"}, {"id": "REAL-DOC-047", "code": "ATBMTMDT", "baseName": "Đề Cương An Toàn Bảo Mật Thương Mại Điện Tử", "rawName": "Đề Cương An Toàn Bảo Mật Thương Mại Điện Tử.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 36, "rating": 4.7, "reviewsCount": 105, "downloads": "3.3k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 98%", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1NwVyXGtsNHgD_JTPSaFl-sRlK9sHItxA", "isReal": true, "university": "bkhn", "driveType": "file"}, {"id": "REAL-DOC-054", "code": "TMDT", "baseName": "Đề Cương Thương Mại Điện Tử", "rawName": "Đề Cương Thương Mại Điện Tử.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.7, "reviewsCount": 174, "downloads": "1.5k+", "price": 50000, "originalPrice": 150000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1sd-Ub_cp0zrKwNWXM5E_zVqtTUWZ_gpS", "isReal": true, "university": "ueh", "driveType": "file"}, {"id": "REAL-DOC-082", "code": "NLKT", "baseName": "Đề Cương Nguyên Lý Kế Toán", "rawName": "Đề Cương Nguyên Lý Kế Toán.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 46, "rating": 4.6, "reviewsCount": 178, "downloads": "1.8k+", "price": 50000, "originalPrice": 150000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1xzez826oeUPFSh7KaEE2hJVYVw1p3mt_", "isReal": true, "university": "hvtc", "driveType": "file"}, {"id": "REAL-DOC-062", "code": "TCTT", "baseName": "Đề Cương Tài Chính Tiền Tệ", "rawName": "Đề Cương Tài Chính Tiền Tệ.docx", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.9, "reviewsCount": 116, "downloads": "2.3k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Aksy3nV47lftpkDhLJ4I_TtKcR7azkq-", "isReal": true, "university": "hce", "driveType": "file"}, {"id": "REAL-DOC-149", "code": "THCS", "baseName": "Đề Cương Tin Học Cơ Sở", "rawName": "Đề Cương Tin Học Cơ Sở.doc", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 52, "rating": 4.9, "reviewsCount": 55, "downloads": "3.5k+", "price": 50000, "originalPrice": 110000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1DYsWGO9Vp90U2ONqyCL6G-9fNZzY9c0p", "isReal": true, "university": "vanlang", "driveType": "file"}, {"id": "REAL-DOC-151", "code": "TACS1", "baseName": "Đề Cương Tiếng Anh Cơ Sở 1", "rawName": "Đề Cương Tiếng Anh Cơ Sở 1", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.9, "reviewsCount": 75, "downloads": "1.2k+", "price": 50000, "originalPrice": 135000, "badge": "Trúng Tủ 98%", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1qAdvYojVqlX0KrbSU20vswwRIJICCxt8", "isReal": true, "university": "thanglong", "driveType": "folder"}, {"id": "REAL-DOC-152", "code": "TACS2", "baseName": "Đề Cương Tiếng Anh Cơ Sở 2", "rawName": "Đề Cương Tiếng Anh Cơ Sở 2", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 22, "rating": 4.9, "reviewsCount": 140, "downloads": "1.3k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "11mh5d1VNDEU7cBh_3BzXhaHGNxHvxFd7", "isReal": true, "university": "dnu", "driveType": "folder"}, {"id": "REAL-DOC-003", "code": "BHTG", "baseName": "Đề Cương Bảo Hiểm Tiền Gửi", "rawName": "Đề Cương Bảo Hiểm Tiền Gửi", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 4.6, "reviewsCount": 76, "downloads": "1.4k+", "price": 50000, "originalPrice": 100000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1FqstJRdW-g5gPGo_xgukgVc9CuX78jWFLuqTZ2_8xqU", "isReal": true, "university": "neu", "driveType": "file"}, {"id": "REAL-DOC-093", "code": "HTTTKT", "baseName": "Đề Cương Hệ Thống Thông Tin Kế Toán", "rawName": "Đề Cương Hệ Thống Thông Tin Kế Toán", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 4.6, "reviewsCount": 77, "downloads": "2.9k+", "price": 50000, "originalPrice": 100000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1OjPNJPc4aBf10z4IPueM9uH9_9lLBwnH4lsDLc58TZk", "isReal": true, "university": "ueb", "driveType": "file"}, {"id": "REAL-DOC-138", "code": "KTHC", "baseName": "Đề Cương Kế Toán Hành Chính", "rawName": "Đề Cương Kế Toán Hành Chính.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.6, "reviewsCount": 170, "downloads": "2.4k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1y75IzFC83ri8vb6Lkz7r_L8YSnpGX8-P", "isReal": true, "university": "ufm", "driveType": "file"}, {"id": "REAL-DOC-033", "code": "DCKTNH", "baseName": "Đề Cương Đề Cương Kế Toán Ngân Hàng", "rawName": "Đề Cương Kế Toán Ngân Hàng.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 32, "rating": 4.7, "reviewsCount": 86, "downloads": "1.0k+", "price": 50000, "originalPrice": 125000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1mu9LiYyxqXvk9tNkT1wj15a-r31qH4kg", "driveType": "file", "isReal": true, "university": "hvtc"}, {"id": "REAL-DOC-073", "code": "KTQT", "baseName": "Đề Cương Kế Toán Quản Trị", "rawName": "Đề Cương Kế Toán Quản Trị.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.8, "reviewsCount": 144, "downloads": "3.4k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1MXU8-FkU8acqGw6t4_bEz8xtWyF_nPZQ", "isReal": true, "university": "neu", "driveType": "file"}, {"id": "REAL-DOC-115", "code": "KTQT2", "baseName": "Đề Cương Kế Toán Quốc Tế", "rawName": "Đề Cương Kế Toán Quốc Tế.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.6, "reviewsCount": 109, "downloads": "2.6k+", "price": 50000, "originalPrice": 150000, "badge": "Trúng Tủ 98%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1uRS7pIABsKWJ4VWzXKKoDxmoVmvSXaJ8", "isReal": true, "university": "hce", "driveType": "file"}, {"id": "REAL-DOC-110", "code": "KTT", "baseName": "Đề Cương Kế Toán Thuế", "rawName": "Đề Cương Kế Toán Thuế.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 24, "rating": 4.6, "reviewsCount": 166, "downloads": "2.1k+", "price": 50000, "originalPrice": 115000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1GPb4aLgVQ0znH67hmwnUlT-zuh08nfwh", "isReal": true, "university": "neu", "driveType": "file"}, {"id": "REAL-DOC-131", "code": "KTBCTC", "baseName": "Đề Cương Kiểm Toán Báo Cáo Tài Chính", "rawName": "Đề Cương Kiểm Toán Báo Cáo Tài Chính.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 4.7, "reviewsCount": 105, "downloads": "1.7k+", "price": 50000, "originalPrice": 150000, "badge": "Trúng Tủ 98%", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Bs1Y-dwspvAROjqFGFNcaQrIEfOLqqUA", "isReal": true, "university": "ba", "driveType": "file"}, {"id": "REAL-DOC-046", "code": "KTCB", "baseName": "Đề Cương Kiểm Toán Căn Bản", "rawName": "Đề Cương Kiểm Toán Căn Bản.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 40, "rating": 4.8, "reviewsCount": 180, "downloads": "3.2k+", "price": 50000, "originalPrice": 140000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1qkAHTn3JD0XNRifTRNt02IqLx15zGbYd", "isReal": true, "university": "tcnh_hn", "driveType": "file"}, {"id": "REAL-DOC-134", "code": "KTQT3", "baseName": "Đề Cương Kiểm Toán Quốc Tế", "rawName": "Đề Cương Kiểm Toán Quốc Tế.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 4.9, "reviewsCount": 100, "downloads": "2.0k+", "price": 50000, "originalPrice": 120000, "badge": "Chuẩn Đề Thi", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "149zvlaOPc9nOEMS5xc5peSAXUoG_bouw", "isReal": true, "university": "ueh", "driveType": "file"}, {"id": "REAL-DOC-122", "code": "NHTM", "baseName": "Đề Cương Ngân Hàng Thương Mại", "rawName": "Đề Cương Ngân Hàng Thương Mại.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 4.9, "reviewsCount": 98, "downloads": "3.3k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Đề Thi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1T008y7zSaSRHZKTd2FO240vzX9WNTH0F", "isReal": true, "university": "neu", "driveType": "file"}, {"id": "REAL-DOC-044", "code": "NVNH", "baseName": "Đề Cương Nghiệp Vụ Ngân Hàng", "rawName": "Đề Cương Nghiệp Vụ Ngân Hàng.doc", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.7, "reviewsCount": 80, "downloads": "3.0k+", "price": 50000, "originalPrice": 95000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "11IgQTnm46d2z34WoRM-Y0lg9cjaAbQji", "isReal": true, "university": "ufm", "driveType": "file"}, {"id": "REAL-DOC-039", "code": "PTDTCK", "baseName": "Đề Cương Phân Tích Đầu Tư Chứng Khoán", "rawName": "Đề Cương Phân Tích Đầu Tư Chứng Khoán.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 30, "rating": 4.8, "reviewsCount": 99, "downloads": "2.5k+", "price": 50000, "originalPrice": 110000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1yht5YP3FtrQz0Ovs6mTjTiIgsEZDYGqr", "isReal": true, "university": "ueh", "driveType": "file"}, {"id": "REAL-DOC-128", "code": "PLBH", "baseName": "Đề Cương Pháp Luật Bảo Hiểm", "rawName": "Đề Cương Pháp Luật Bảo Hiểm.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 52, "rating": 5.0, "reviewsCount": 72, "downloads": "1.4k+", "price": 50000, "originalPrice": 150000, "badge": "Chuẩn Đề Thi", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1R7avrYc_b7Z9N0_Nx_wYtyhba-tzz9Xx", "isReal": true, "university": "ueh", "driveType": "file"}, {"id": "REAL-DOC-109", "code": "QTKDBH2", "baseName": "Đề Cương Quản Trị Kinh Doanh Bảo Hiểm 2", "rawName": "Đề Cương Quản Trị Kinh Doanh Bảo Hiểm 2.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.6, "reviewsCount": 90, "downloads": "2.0k+", "price": 50000, "originalPrice": 100000, "badge": "Trúng Tủ 98%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1ppz4GF0qHpKDK7oEXgMHu_0QoKwijRvP", "isReal": true, "university": "thanglong", "driveType": "file"}, {"id": "REAL-DOC-031", "code": "QTNHTM", "baseName": "Đề Cương Quản Trị Ngân Hàng Thương Mại", "rawName": "Đề Cương Quản Trị Ngân Hàng Thương Mại", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 4.9, "reviewsCount": 164, "downloads": "1.7k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 98%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Ww6GjL676jLJicLjIA5vLL-N_GDrWeceIiCBodmASu4", "isReal": true, "university": "ba", "driveType": "file"}, {"id": "REAL-DOC-127", "code": "QTRRTC", "baseName": "Đề Cương Quản Trị Rủi Ro Tài Chính", "rawName": "Đề Cương Quản Trị Rủi Ro Tài Chính", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 22, "rating": 5.0, "reviewsCount": 185, "downloads": "1.3k+", "price": 50000, "originalPrice": 100000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1QYtPDJ5klhDkU2ZUpWrQkLoY4AOTaG-NQPzkB7YMnMg", "isReal": true, "university": "tmu", "driveType": "file"}, {"id": "REAL-DOC-090", "code": "QTTC", "baseName": "Đề Cương Quản Trị Tài Chính", "rawName": "Đề Cương Quản Trị Tài Chính.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 5.0, "reviewsCount": 139, "downloads": "2.6k+", "price": 50000, "originalPrice": 135000, "badge": "Chuẩn Đề Thi", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1ghiSo2OFFe3v6aIIEVLaboEZnc52gQg-", "isReal": true, "university": "ba", "driveType": "file"}, {"id": "REAL-DOC-071", "code": "QTTC1", "baseName": "Đề Cương Quản Trị Tài Chính 1", "rawName": "Đề Cương Quản Trị Tài Chính 1", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 4.7, "reviewsCount": 107, "downloads": "3.2k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1to8EKZQ2j3mkDbEoUWRwUGPbGnaIII_R59WYIDAbYKI", "isReal": true, "university": "apd", "driveType": "file"}, {"id": "REAL-DOC-123", "code": "QTTCDN", "baseName": "Đề Cương Quản Trị Tài Chính Doanh Nghiệp", "rawName": "Đề Cương Quản Trị Tài Chính Doanh Nghiệp.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 4.7, "reviewsCount": 127, "downloads": "3.4k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1nAcukDd5MzK2dupEXktcVxW55XVegvdU", "isReal": true, "university": "ftu", "driveType": "file"}, {"id": "REAL-DOC-042", "code": "QTTCDNCS", "baseName": "Đề Cương Quản Trị Tài Chính Doanh Nghiệp Chuyên Sâu", "rawName": "Đề Cương Quản Trị Tài Chính Doanh Nghiệp Chuyên Sâu", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 40, "rating": 4.8, "reviewsCount": 115, "downloads": "2.8k+", "price": 50000, "originalPrice": 125000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1HjwG2fjppWYBMcvTqHSzP_X1nIbvVBYOUr_w8soq9Qk", "isReal": true, "university": "ueb", "driveType": "file"}, {"id": "REAL-DOC-113", "code": "QTTCDNVD", "baseName": "Đề Cương Quản Trị Tài Chính Doanh Nghiệp Vận Dụng", "rawName": "Đề Cương Quản Trị Tài Chính Doanh Nghiệp Vận Dụng.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 22, "rating": 4.8, "reviewsCount": 83, "downloads": "2.4k+", "price": 50000, "originalPrice": 150000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1KhlI_9lOhEln1ALO7BP7NgaoZBOPFMAq", "isReal": true, "university": "due", "driveType": "file"}, {"id": "REAL-DOC-121", "code": "QTTCDVHCSN", "baseName": "Đề Cương Quản Trị Tài Chính Đơn Vị Hành Chính Sự Nghiệp", "rawName": "Đề Cương Quản Trị Tài Chính Đơn Vị Hành Chính Sự Nghiệp.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 4.8, "reviewsCount": 124, "downloads": "3.2k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1hBQabN0TiDyRJxa09NG8LtNAUIykRdFA", "isReal": true, "university": "apd", "driveType": "file"}, {"id": "REAL-DOC-106", "code": "TBH", "baseName": "Đề Cương Tái Bảo Hiểm", "rawName": "Đề Cương Tái Bảo Hiểm.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 24, "rating": 4.6, "reviewsCount": 73, "downloads": "1.7k+", "price": 50000, "originalPrice": 140000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1kj43bpfzTnRTk9VywbKxl_xG_aN0nFoV", "isReal": true, "university": "tcnh_hn", "driveType": "file"}, {"id": "REAL-DOC-136", "code": "TCBH", "baseName": "Đề Cương Tài Chính Bảo Hiểm", "rawName": "Đề Cương Tài Chính Bảo Hiểm.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 4.7, "reviewsCount": 178, "downloads": "2.2k+", "price": 50000, "originalPrice": 115000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Ui2Y0argiYn5MFGfYRONaxoSn7E1M1Nq", "isReal": true, "university": "ueb", "driveType": "file"}, {"id": "REAL-DOC-076", "code": "TCC", "baseName": "Đề Cương Tài Chính Công", "rawName": "Đề Cương Tài Chính Công", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 46, "rating": 4.8, "reviewsCount": 75, "downloads": "1.2k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1EgsXiixXKUKO4jHVPv_C4TEEkGcbr6mVt3CMGa7R6xo", "isReal": true, "university": "ftu", "driveType": "file"}, {"id": "REAL-DOC-092", "code": "TCDN", "baseName": "Đề Cương Tài Chính Doanh Nghiệp", "rawName": "Đề Cương Tài Chính Doanh Nghiệp.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 40, "rating": 4.9, "reviewsCount": 104, "downloads": "2.8k+", "price": 50000, "originalPrice": 125000, "badge": "Chuẩn Đề Thi", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1vfH6FydZn-ag0ychSsCC3mHH0lpfxPwa", "isReal": true, "university": "ueh", "driveType": "file"}, {"id": "REAL-DOC-011", "code": "TCDN2", "baseName": "Đề Cương Tài Chính Doanh Nghiệp 2", "rawName": "Đề Cương Tài Chính Doanh Nghiệp 2", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.8, "reviewsCount": 149, "downloads": "2.2k+", "price": 50000, "originalPrice": 150000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1kcXpQIJCGp0KOfMuzvGhwkxfo-qX5Zsb-L6x9Nr0tyY", "isReal": true, "university": "hvtc", "driveType": "file"}, {"id": "REAL-DOC-010", "code": "TCQT", "baseName": "Đề Cương Tài Chính Quốc Tế", "rawName": "Đề Cương Tài Chính Quốc Tế", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 4.7, "reviewsCount": 138, "downloads": "2.1k+", "price": 50000, "originalPrice": 100000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1nQv0aa-gekpSeqlBLUCfJyogU2hCyFzpo2M_TwK7kBw", "isReal": true, "university": "tmu", "driveType": "file"}, {"id": "REAL-DOC-040", "code": "TDDADT", "baseName": "Đề Cương Thẩm Định Dự Án Đầu Tư", "rawName": "Đề Cương Thẩm Định Dự Án Đầu Tư", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 46, "rating": 4.7, "reviewsCount": 44, "downloads": "2.6k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1tA35g-RvJdg18haZQg37IY9F7_zLBsTuQylB0NYn1eo", "isReal": true, "university": "ntu", "driveType": "file"}, {"id": "REAL-DOC-061", "code": "TDTCDADT2", "baseName": "Đề Cương Thẩm Định Tài Chính Dự Án Đầu Tư", "rawName": "Đề Cương Thẩm Định Tài Chính Dự Án Đầu Tư", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.6, "reviewsCount": 36, "downloads": "2.2k+", "price": 50000, "originalPrice": 135000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1uyCzZf64Re7fsUzBGVuredaHdjgzfQqkCyc7Bn0-eC4", "isReal": true, "university": "due", "driveType": "file"}, {"id": "REAL-DOC-096", "code": "TDTCDADT", "baseName": "Đề Cương Thẩm Định Tài Chính Dự Án Đầu Tư", "rawName": "Đề Cương Thẩm Định Tài Chính Dự Án Đầu Tư", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.9, "reviewsCount": 169, "downloads": "3.2k+", "price": 50000, "originalPrice": 120000, "badge": "Chuẩn Đề Thi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1iNCxp9MUQlZcsGCWPshA94PcwG8FhD7aciIBQDQIpJ0", "isReal": true, "university": "ufm", "driveType": "file"}, {"id": "REAL-DOC-064", "code": "TTTDQT", "baseName": "Đề Cương Thanh Toán Tín Dụng Quốc Tế", "rawName": "Đề Cương Thanh Toán Tín Dụng Quốc Tế.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 46, "rating": 4.7, "reviewsCount": 88, "downloads": "2.5k+", "price": 50000, "originalPrice": 150000, "badge": "Chuẩn Đề Thi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1-rF7ilboMmXnOvNihtyaNBzJjBUTfPLO", "isReal": true, "university": "hou", "driveType": "file"}, {"id": "REAL-DOC-077", "code": "TTCK", "baseName": "Đề Cương Thị Trường Chứng Khoán", "rawName": "Đề Cương Thị Trường Chứng Khoán", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 46, "rating": 4.7, "reviewsCount": 112, "downloads": "1.3k+", "price": 50000, "originalPrice": 95000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1f4PfXfQtmxVTq_8WOHGXz0K9-HhApXQgO-Uuz9FxSZY", "isReal": true, "university": "tmu", "driveType": "file"}, {"id": "REAL-DOC-064", "code": "DCTTCKPS", "baseName": "Đề Cương Đề Cương Thị Trường Chứng Khoán Phái Sinh", "rawName": "Đề Cương Thị Trường Chứng Khoán Phái Sinh.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 40, "rating": 4.9, "reviewsCount": 140, "downloads": "2.3k+", "price": 50000, "originalPrice": 125000, "badge": "Chuẩn Đề Thi", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1KUUNY5zWfRYxyxEroyUdBYULgRhCTT9s", "driveType": "file", "isReal": true, "university": "ueh"}, {"id": "REAL-DOC-129", "code": "TTTCVCDCTC", "baseName": "Đề Cương Thị Trường Tài Chính Và Các Định Chế Tài Chính", "rawName": "Đề Cương Thị Trường Tài Chính Và Các Định Chế Tài Chính", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 4.8, "reviewsCount": 155, "downloads": "1.5k+", "price": 50000, "originalPrice": 120000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1-K0m6xZoSRVM1iBV1OfuZquEnqJXr87h5wQE7G_n_VQ", "isReal": true, "university": "hvtc", "driveType": "file"}, {"id": "REAL-DOC-066", "code": "DCTDNH", "baseName": "Đề Cương Đề Cương Tín Dụng Ngân Hàng", "rawName": "Đề Cương Tín Dụng Ngân Hàng.docx", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 36, "rating": 4.6, "reviewsCount": 60, "downloads": "1.0k+", "price": 50000, "originalPrice": 100000, "badge": "Chuẩn Đề Thi", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1OEN8c0jDKgpW2UVyJsB8M6cI7XSwjjYm", "driveType": "file", "isReal": true, "university": "uet"}, {"id": "REAL-DOC-049", "code": "TTC", "baseName": "Đề Cương Toán Tài Chính", "rawName": "Đề Cương Toán Tài Chính", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 4.9, "reviewsCount": 178, "downloads": "3.5k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 98%", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1pSeXEHd5xmNNSjF78VAdY2hmwsd3yT7_rkzRDH73Qy4", "isReal": true, "university": "thanglong", "driveType": "file"}, {"id": "REAL-DOC-050", "code": "VTVBH", "baseName": "Đề Cương Vận Tải Và Bảo Hiểm", "rawName": "Đề Cương Vận Tải Và Bảo Hiểm", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 24, "rating": 4.8, "reviewsCount": 148, "downloads": "3.6k+", "price": 50000, "originalPrice": 135000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1DzLQgrl8n6HPHXJc6HDsGDNRjUcYzzvOcMGjCRXW45g", "isReal": true, "university": "iuh", "driveType": "file"}, {"id": "REAL-DOC-137", "code": "CLNNL", "baseName": "Đề Cương Chiến Lược Nguồn Nhân Lực", "rawName": "Đề Cương Chiến Lược Nguồn Nhân Lực.docx", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.8, "reviewsCount": 100, "downloads": "2.3k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1vxbGSGCNk8C17HCAXGz-FlGgIjCS8Xce", "isReal": true, "university": "hutech", "driveType": "file"}, {"id": "REAL-DOC-052", "code": "DTDCKTS", "baseName": "Đề Thi & Đề Cương KINH TẾ SỐ", "rawName": "Đề Thi & Đề Cương KINH TẾ SỐ", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.8, "reviewsCount": 97, "downloads": "1.3k+", "price": 50000, "originalPrice": 125000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1uEGYhDVHFHiVbXc_LyAZGCZW8Q7W9BRsUy5y3IUSOb0", "isReal": true, "university": "ftu", "driveType": "file"}, {"id": "REAL-DOC-074", "code": "HPKTSCHVDA", "baseName": "Đề Cương Học Phần Kinh Tế Số - Câu Hỏi Và Đáp Án", "rawName": "Đề Cương Học Phần Kinh Tế Số - Câu Hỏi Và Đáp Án", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.7, "reviewsCount": 120, "downloads": "3.5k+", "price": 50000, "originalPrice": 115000, "badge": "Chuẩn Đề Thi", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1tvIIqSCV0xIzStP1WweKr7MIs3_oaPt7hTCczMv8Uu4", "isReal": true, "university": "ftu", "driveType": "file"}, {"id": "REAL-DOC-107", "code": "KDQT", "baseName": "Đề Cương Kinh Doanh Quốc Tế", "rawName": "Đề Cương Kinh Doanh Quốc Tế", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 4.6, "reviewsCount": 39, "downloads": "1.8k+", "price": 50000, "originalPrice": 110000, "badge": "Trúng Tủ 98%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "16_BWj5m3zBmvCiU9OLteBA6hhbzfW9trqE2qFMF3GpI", "isReal": true, "university": "thanglong", "driveType": "file"}, {"id": "REAL-DOC-094", "code": "KDS", "baseName": "Đề Cương Kinh Doanh Số", "rawName": "Đề Cương Kinh Doanh Số", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.6, "reviewsCount": 109, "downloads": "3.0k+", "price": 50000, "originalPrice": 125000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1hm3FWA7tlwMywjTMjrHArNHOEYhiP39b13exAV60Ugs", "isReal": true, "university": "ufm", "driveType": "file"}, {"id": "REAL-DOC-024", "code": "KTC", "baseName": "Đề Cương Kinh Tế Công", "rawName": "Đề Cương Kinh Tế Công", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 30, "rating": 4.7, "reviewsCount": 94, "downloads": "3.5k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1MPh6mw--vZQTNTwqgBO7mpbVRbe_RDc84GNaYk82pAQ", "isReal": true, "university": "hoasen", "driveType": "file"}, {"id": "REAL-DOC-014", "code": "KTCC", "baseName": "Đề Cương Kinh Tế Công Cộng", "rawName": "Đề Cương Kinh Tế Công Cộng", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 36, "rating": 4.7, "reviewsCount": 58, "downloads": "2.5k+", "price": 50000, "originalPrice": 115000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1F4n4gEItTUEbuXQGvoSb7bBbH0m1C8e_E8K7osD2OsE", "isReal": true, "university": "ptit", "driveType": "file"}, {"id": "REAL-DOC-120", "code": "KTDT", "baseName": "Đề Cương Kinh Tế Đầu Tư", "rawName": "Đề Cương Kinh Tế Đầu Tư.docx", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 34, "rating": 4.7, "reviewsCount": 126, "downloads": "3.1k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Đề Thi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Ek9DGyWwOxMJu2ngVypQv2CPdL1_qkZ1", "isReal": true, "university": "ftu", "driveType": "file"}, {"id": "REAL-DOC-097", "code": "KTDL", "baseName": "Đề Cương Kinh Tế Du Lịch", "rawName": "Đề Cương Kinh Tế Du Lịch", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.8, "reviewsCount": 42, "downloads": "3.3k+", "price": 50000, "originalPrice": 135000, "badge": "Trúng Tủ 98%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1ZOxIbjFHUAh75l8rOoYXr7srR5SFmyzO52CnhOVxQpQ", "isReal": true, "university": "dnu", "driveType": "file"}, {"id": "REAL-DOC-055", "code": "KTNT", "baseName": "Đề Cương Kinh Tế Ngoại Thương", "rawName": "Đề Cương Kinh Tế Ngoại Thương.docx", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 30, "rating": 4.7, "reviewsCount": 38, "downloads": "1.6k+", "price": 50000, "originalPrice": 120000, "badge": "Trúng Tủ 98%", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1axlmD5s_wB5VzRPmpnQfYdtH7dKTVKkQ", "isReal": true, "university": "ftu", "driveType": "file"}, {"id": "REAL-DOC-065", "code": "KTPT", "baseName": "Đề Cương Kinh Tế Phát Triển", "rawName": "Đề Cương Kinh Tế Phát Triển.docx", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.6, "reviewsCount": 37, "downloads": "2.6k+", "price": 50000, "originalPrice": 130000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1bt-EbzFE6dMjXgcRczt3YJXMR8Gb_kXy", "isReal": true, "university": "hvtc", "driveType": "file"}, {"id": "REAL-DOC-020", "code": "KTVT2", "baseName": "Đề Cương Kinh Tế Vận Tải", "rawName": "Đề Cương Kinh Tế Vận Tải", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 24, "rating": 4.6, "reviewsCount": 129, "downloads": "3.1k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Đề Thi", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1lMYKSoqU2qp9Oihditr2kTS9YQMGrrFqUwKSxFZGMJk", "isReal": true, "university": "tmu", "driveType": "file"}, {"id": "REAL-DOC-020", "code": "KTVT", "baseName": "Đề Cương Kinh Tế Vận Tải", "rawName": "Đề Cương Kinh Tế Vận Tải", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.6, "reviewsCount": 58, "downloads": "3.1k+", "price": 50000, "originalPrice": 115000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1mxGRwF3rB5K3zGCapizzkyuCih6at-CoxoD2Vl3wbtU", "isReal": true, "university": "tmu", "driveType": "file"}, {"id": "REAL-DOC-070", "code": "DCPTHDKD", "baseName": "Đề Cương Đề Cương Phân Tích Hoạt Động Kinh Doanh", "rawName": "Đề Cương Phân Tích Hoạt Động Kinh Doanh.docx", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 40, "rating": 4.9, "reviewsCount": 105, "downloads": "3.1k+", "price": 50000, "originalPrice": 140000, "badge": "Chuẩn Đề Thi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1_MmX_rfnBl9-tN0PB5ITHW-LVrexbnMe", "isReal": true, "university": "dnu", "driveType": "file"}, {"id": "REAL-DOC-070", "code": "PTHDKD", "baseName": "Đề Cương Phân tích hoạt động kinh doanh", "rawName": "Đề Cương Phân tích hoạt động kinh doanh", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 52, "rating": 4.8, "reviewsCount": 177, "downloads": "3.1k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Đề Thi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1GG_-nwq9YxhpDpdtK9nPQUNEruVsXMrQE4xNwZGIMq8", "isReal": true, "university": "dpu", "driveType": "file"}, {"id": "REAL-DOC-099", "code": "PLKT", "baseName": "Đề Cương Pháp Luật Kinh Tế", "rawName": "Đề Cương Pháp Luật Kinh Tế", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.8, "reviewsCount": 43, "downloads": "3.5k+", "price": 50000, "originalPrice": 130000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1sOVzn90Mtl3nuGYgpNo4jxbqjn_Pqe4gX9dzTVFCEao", "isReal": true, "university": "dnu", "driveType": "file"}, {"id": "REAL-DOC-098", "code": "QLNNVKT", "baseName": "Đề Cương Quản Lý Nhà Nước Về Kinh Tế", "rawName": "Đề Cương Quản Lý Nhà Nước Về Kinh Tế", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 5.0, "reviewsCount": 58, "downloads": "3.4k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Đề Thi", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1oD8b_E816i1ncdk4EoV49lc_WWHUDzVMvCKzTiRne8A", "isReal": true, "university": "thanglong", "driveType": "file"}, {"id": "REAL-DOC-140", "code": "QTCL", "baseName": "Đề Cương Quản Trị Chất Lượng", "rawName": "Đề Cương Quản Trị Chất Lượng.docx", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.9, "reviewsCount": 74, "downloads": "2.6k+", "price": 50000, "originalPrice": 95000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "13JASULA2HQB4L6nZms_12nn0CUPg5H1G", "isReal": true, "university": "bkhn", "driveType": "file"}, {"id": "REAL-DOC-012", "code": "QTCCU", "baseName": "Đề Cương Quản Trị Chuỗi Cung Ứng", "rawName": "Đề Cương Quản Trị Chuỗi Cung Ứng", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 52, "rating": 4.8, "reviewsCount": 159, "downloads": "2.3k+", "price": 50000, "originalPrice": 135000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1YPmsqEfJGa7tubOQ-mFDaQE5djJ4bG5yvZroEBpRMCo", "isReal": true, "university": "ussh", "driveType": "file"}, {"id": "REAL-DOC-015", "code": "QTDN", "baseName": "Đề Cương Quản trị Doanh nghiệp", "rawName": "Đề Cương Quản trị Doanh nghiệp", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 32, "rating": 4.8, "reviewsCount": 107, "downloads": "2.6k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Jb-X6UczP0YR46D7cAlfvMXtbB6fFYz1wc2cCVp-PGY", "isReal": true, "university": "ftu", "driveType": "file"}, {"id": "REAL-DOC-100", "code": "QTDACNTT", "baseName": "Đề Cương Quản Trị Dự Án Công Nghệ Thông Tin", "rawName": "Đề Cương Quản Trị Dự Án Công Nghệ Thông Tin.docx", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 32, "rating": 4.9, "reviewsCount": 83, "downloads": "3.6k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Đề Thi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "183uGkSc4t2NGSG2SGFR1MbC0i5HXF5gv", "isReal": true, "university": "dpu", "driveType": "file"}, {"id": "REAL-DOC-060", "code": "QTDADT", "baseName": "Đề Cương Quản Trị Dự Án Đầu Tư", "rawName": "Đề Cương Quản Trị Dự Án Đầu Tư", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.8, "reviewsCount": 162, "downloads": "2.1k+", "price": 50000, "originalPrice": 115000, "badge": "Chuẩn Đề Thi", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "19FCKJmn8m6hqdQkEWH1N-Y3MSGqTIETyeFGGGiK15Yk", "isReal": true, "university": "hutech", "driveType": "file"}, {"id": "REAL-DOC-126", "code": "QTKD1", "baseName": "Đề Cương Quản Trị Kinh Doanh 1", "rawName": "Đề Cương Quản Trị Kinh Doanh 1.docx", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.7, "reviewsCount": 79, "downloads": "1.2k+", "price": 50000, "originalPrice": 140000, "badge": "Chuẩn Đề Thi", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1cjJ-_pHgUsJOZuSpLkqSQ9KRikojJYWC", "isReal": true, "university": "dnu", "driveType": "file"}, {"id": "REAL-DOC-066", "code": "QTNL", "baseName": "Đề Cương Quản Trị Nhân Lực", "rawName": "Đề Cương Quản Trị Nhân Lực.docx", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 4.7, "reviewsCount": 139, "downloads": "2.7k+", "price": 50000, "originalPrice": 100000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1SgHTMjTJfXHA6LHepO1vbHm3g6yP9_JS", "isReal": true, "university": "bkhn", "driveType": "file"}, {"id": "REAL-DOC-033", "code": "QTRR", "baseName": "Đề Cương Quản Trị Rủi Ro", "rawName": "Đề Cương Quản Trị Rủi Ro", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.9, "reviewsCount": 111, "downloads": "1.9k+", "price": 50000, "originalPrice": 120000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1a1UM4Og4mOh4dp6k-am4wklpn9xYGlgL_ZWo-DiLVZ4", "isReal": true, "university": "thanglong", "driveType": "file"}, {"id": "REAL-DOC-035", "code": "QTSTD", "baseName": "Đề Cương Quản Trị Sự Thay Đổi", "rawName": "Đề Cương Quản Trị Sự Thay Đổi", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 5.0, "reviewsCount": 95, "downloads": "2.1k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "14ziJ94P4rkGZX6MHczCktngXYPOGY4tjsvFC7gkrv2E", "isReal": true, "university": "dnu", "driveType": "file"}, {"id": "REAL-DOC-048", "code": "QTTN", "baseName": "Đề Cương Quản Trị Tác Nghiệp", "rawName": "Đề Cương Quản Trị Tác Nghiệp", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 32, "rating": 4.8, "reviewsCount": 110, "downloads": "3.4k+", "price": 50000, "originalPrice": 140000, "badge": "Chuẩn Đề Thi", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1BEQBtWUXCiCeeRTc48oXfkjnqCrqQ-TBQUNIEizJ2og", "isReal": true, "university": "vanlang", "driveType": "file"}, {"id": "REAL-DOC-045", "code": "QTTH", "baseName": "Đề Cương Quản Trị Thương Hiệu", "rawName": "Đề Cương Quản Trị Thương Hiệu", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 32, "rating": 4.7, "reviewsCount": 129, "downloads": "3.1k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1_OTRuha1RmCs-puAYHYIc-PGvSaEkIIaemvmKmowfa8", "isReal": true, "university": "hou", "driveType": "file"}, {"id": "REAL-DOC-057", "code": "BTMVT", "baseName": "Đề Cương bài tập môn Vận tải", "rawName": "Đề Cương bài tập môn Vận tải", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 34, "rating": 4.9, "reviewsCount": 92, "downloads": "1.8k+", "price": 50000, "originalPrice": 120000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1gHoNIOBCUpf6P3tD4PRVdBgptK9ppy7F4Zcy2Tp1MDo", "isReal": true, "university": "thanglong", "driveType": "file"}, {"id": "REAL-DOC-075", "code": "GNTNT", "baseName": "Đề Cương Giao Nhận Trong Ngoại Thương", "rawName": "Đề Cương Giao Nhận Trong Ngoại Thương", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 24, "rating": 4.7, "reviewsCount": 123, "downloads": "3.6k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Xa8pFaq13APJnlbkLJEKEUTr-T6ccyXGLIs68WEzR1s", "isReal": true, "university": "uet", "driveType": "file"}, {"id": "REAL-DOC-051", "code": "HHTVT", "baseName": "Đề Cương Hàng Hoá Trong Vận Tải", "rawName": "Đề Cương Hàng Hoá Trong Vận Tải", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 4.6, "reviewsCount": 139, "downloads": "1.2k+", "price": 50000, "originalPrice": 135000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1g6zzfudEl2nXBKO7S4DCIEfPkVeRBaccIkBSEbvbgHI", "isReal": true, "university": "neu", "driveType": "file"}, {"id": "REAL-DOC-037", "code": "HHVT", "baseName": "Đề Cương Hàng Hóa Vận Tải", "rawName": "Đề Cương Hàng Hóa Vận Tải.docx", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 4.7, "reviewsCount": 92, "downloads": "2.3k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 98%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1x7HHKNNHQuGDPPa-7Y2d7w3h-_HiNQGH", "isReal": true, "university": "hutech", "driveType": "file"}, {"id": "REAL-DOC-027", "code": "HNCATBD", "baseName": "Đề Cương Hội Nhập Châu Á-Thái Bình Dương", "rawName": "Đề Cương Hội Nhập Châu Á-Thái Bình Dương", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 52, "rating": 4.6, "reviewsCount": 74, "downloads": "1.3k+", "price": 50000, "originalPrice": 95000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1iHI0AgIbn-N02RJ1k79b54YubpLLc0pMOflc30FZ_HA", "isReal": true, "university": "dhhp", "driveType": "file"}, {"id": "REAL-DOC-058", "code": "LVQT", "baseName": "Đề Cương Logistic Và Quốc Tế", "rawName": "Đề Cương Logistic Và Quốc Tế", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.9, "reviewsCount": 177, "downloads": "1.9k+", "price": 50000, "originalPrice": 115000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Ud-bmG5sqxGcj45ILtjRwYF4_7paFnxIAVHoPAxDtAU", "isReal": true, "university": "dnu", "driveType": "file"}, {"id": "REAL-DOC-081", "code": "LVTDPT", "baseName": "Đề Cương Logistic vận tải Đa Phương Thức", "rawName": "Đề Cương Logistic vận tải Đa Phương Thức", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 52, "rating": 4.9, "reviewsCount": 77, "downloads": "1.7k+", "price": 50000, "originalPrice": 100000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1JtcX5zLe6-LJkYUXecFOvoGgUrdYOIK_dbLqril5jYo", "isReal": true, "university": "tmu", "driveType": "file"}, {"id": "REAL-DOC-022", "code": "NVNT", "baseName": "Đề Cương Nghiệp Vụ Ngoại Thương", "rawName": "Đề Cương Nghiệp Vụ Ngoại Thương", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 40, "rating": 5.0, "reviewsCount": 126, "downloads": "3.3k+", "price": 50000, "originalPrice": 120000, "badge": "Chuẩn Đề Thi", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1rfEYMbmWsHSk4JnEbkOsKuEs0EfdgXAh", "isReal": true, "university": "hutech", "driveType": "file"}, {"id": "REAL-DOC-029", "code": "QHCATBD", "baseName": "Đề Cương Quan Hệ Châu Á Thái Bình Dương", "rawName": "Đề Cương Quan Hệ Châu Á Thái Bình Dương", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 32, "rating": 4.9, "reviewsCount": 91, "downloads": "1.5k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1ePaCy5xsFd1ewbEpbO3yxNkbWjL9gPqMl_jLUS5LWmg", "isReal": true, "university": "thanglong", "driveType": "file"}, {"id": "REAL-DOC-005", "code": "QHQT", "baseName": "Đề Cương Quan Hệ Quốc Tế", "rawName": "Đề Cương Quan Hệ Quốc Tế", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 32, "rating": 4.7, "reviewsCount": 159, "downloads": "1.6k+", "price": 50000, "originalPrice": 95000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1nG5LoNfte8VqK0YnzaaH2xk1X_DxDgqi5z70IwXdOO0", "isReal": true, "university": "ueb", "driveType": "file"}, {"id": "REAL-DOC-053", "code": "TTQT", "baseName": "Đề Cương Thanh Toán Quốc Tế", "rawName": "Đề Cương Thanh Toán Quốc Tế", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 32, "rating": 4.6, "reviewsCount": 155, "downloads": "1.4k+", "price": 50000, "originalPrice": 150000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1KYNVBUO9zvzBaxW60o8HPLBHFRErpaIf2fnaImqQZqo", "isReal": true, "university": "tmu", "driveType": "file"}, {"id": "REAL-DOC-139", "code": "VTGN", "baseName": "Đề Cương Vận Tải Giao Nhận", "rawName": "Đề Cương Vận Tải Giao Nhận.docx", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 4.6, "reviewsCount": 36, "downloads": "2.5k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Jdli-zsTHK58NTYtOkqVcLlj0BHWWFMS", "isReal": true, "university": "hou", "driveType": "file"}, {"id": "REAL-DOC-023", "code": "BTHT", "baseName": "Đề Cương Bảo Trì Hệ Thống", "rawName": "Đề Cương Bảo Trì Hệ Thống.docx", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 5.0, "reviewsCount": 104, "downloads": "3.4k+", "price": 50000, "originalPrice": 95000, "badge": "Trúng Tủ 98%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1cvveq59EP6vHy-98KqlWdRrBGZGMgTJ3", "isReal": true, "university": "vanlang", "driveType": "file"}, {"id": "REAL-DOC-019", "code": "CNS", "baseName": "Đề Cương Công Nghệ Số", "rawName": "Đề Cương Công Nghệ Số", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 46, "rating": 4.9, "reviewsCount": 139, "downloads": "3.0k+", "price": 50000, "originalPrice": 150000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1sxp6GMor8S5I0eqHp7kLHeKlzjfVIhtSufSSLlUD3O4", "isReal": true, "university": "duytan", "driveType": "file"}, {"id": "REAL-DOC-105", "code": "DHUD", "baseName": "Đề Cương Đồ Họa Ứng Dụng", "rawName": "Đề Cương Đồ Họa Ứng Dụng.docx", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.8, "reviewsCount": 103, "downloads": "1.6k+", "price": 50000, "originalPrice": 95000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "11C_lGEaDOo1jGWEkUZGoLeDiknMbOwy1", "isReal": true, "university": "ptit", "driveType": "file"}, {"id": "REAL-DOC-150", "code": "HTTTQL2", "baseName": "Đề Cương Hệ Thống Thông Tin Quản Lý", "rawName": "Đề Cương Hệ Thống Thông Tin Quản Lý.docx", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 30, "rating": 5.0, "reviewsCount": 122, "downloads": "3.6k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "11VeXlicW4chJtiCbxoytnux7IPvdjBcg", "isReal": true, "university": "eaut", "driveType": "file"}, {"id": "REAL-DOC-150", "code": "HTTTQL", "baseName": "Đề Cương Hệ Thống Thông Tin Quản Lý", "rawName": "Đề Cương Hệ Thống Thông Tin Quản Lý", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.7, "reviewsCount": 57, "downloads": "3.6k+", "price": 50000, "originalPrice": 150000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1G0M_LN-xPFY8rnd_UuQg58-WbObF_icA", "isReal": true, "university": "eaut", "driveType": "folder"}, {"id": "REAL-DOC-111", "code": "KNS", "baseName": "Đề Cương Kỹ Năng Số", "rawName": "Đề Cương Kỹ Năng Số.docx", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 5.0, "reviewsCount": 183, "downloads": "2.2k+", "price": 50000, "originalPrice": 130000, "badge": "Trúng Tủ 98%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "14mLx7U0Gl4eAJ9eY2MfhtaKl3x_fqchK9baXSf2WWCI", "isReal": true, "university": "tcnh_hn", "driveType": "file"}, {"id": "REAL-DOC-112", "code": "KNS2", "baseName": "Đề Cương Kỹ Năng Sống", "rawName": "Đề Cương Kỹ Năng Sống", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.9, "reviewsCount": 172, "downloads": "2.3k+", "price": 50000, "originalPrice": 135000, "badge": "Chuẩn Đề Thi", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1xNi8qceYj0yA8ZSVAFfOjv4vxpOY75P_T45wtPnO45U", "isReal": true, "university": "hongduc", "driveType": "file"}, {"id": "REAL-DOC-130", "code": "MMT", "baseName": "Đề Cương Mạng Máy Tính", "rawName": "Đề Cương Mạng Máy Tính.docx", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 24, "rating": 4.6, "reviewsCount": 94, "downloads": "1.6k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1hu4YMzx4DJZHTsKSSMNr7Po3dOcz7B-S", "isReal": true, "university": "hutech", "driveType": "file"}, {"id": "REAL-DOC-102", "code": "NNS", "baseName": "Đề Cương Ngôn Ngữ SQL", "rawName": "Đề Cương Ngôn Ngữ SQL.docx", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 4.7, "reviewsCount": 126, "downloads": "1.3k+", "price": 50000, "originalPrice": 120000, "badge": "Chuẩn Đề Thi", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1eqHzihTBbdJ2HIW5Ji23KBxY2b3rplgo", "isReal": true, "university": "dnu", "driveType": "file"}, {"id": "REAL-DOC-101", "code": "PTUDTNW", "baseName": "Đề Cương Phát Triển Ứng Dụng Trên Nền Web", "rawName": "Đề Cương Phát Triển Ứng Dụng Trên Nền Web.docx", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 22, "rating": 4.8, "reviewsCount": 38, "downloads": "1.2k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1ZyJHIY6G6-FyveY8KWGS2iO-GUT48fLW", "isReal": true, "university": "dpu", "driveType": "file"}, {"id": "REAL-DOC-063", "code": "SW", "baseName": "Đề Cương SEO Website", "rawName": "Đề Cương SEO Website.docx", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 46, "rating": 4.8, "reviewsCount": 140, "downloads": "2.4k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Iu9HM7KigysLp8CgxNB2wWufDwetY3Fq", "isReal": true, "university": "dnu", "driveType": "file"}, {"id": "REAL-DOC-025", "code": "TKW", "baseName": "Đề Cương Thiết Kế Web", "rawName": "Đề Cương Thiết Kế Web.docx", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 4.7, "reviewsCount": 77, "downloads": "3.6k+", "price": 50000, "originalPrice": 135000, "badge": "Trúng Tủ 98%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1mssHktpiIeS3LH5dP75HC__SCuYK-Ij9", "isReal": true, "university": "hou", "driveType": "file"}, {"id": "REAL-DOC-108", "code": "THCB", "baseName": "Đề Cương Tin Học Cơ Bản", "rawName": "Đề Cương Tin Học Cơ Bản", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 4.6, "reviewsCount": 178, "downloads": "1.9k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "16Kng0FJmbmLpcMtvXbiafQf_kBK1aF3Cpgf93wVciTw", "isReal": true, "university": "thanglong", "driveType": "file"}, {"id": "REAL-DOC-103", "code": "TTNT", "baseName": "Đề Cương Trí Tuệ Nhân Tạo", "rawName": "Đề Cương Trí Tuệ Nhân Tạo.docx", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.7, "reviewsCount": 74, "downloads": "1.4k+", "price": 50000, "originalPrice": 135000, "badge": "Trúng Tủ 98%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1yPf1czEyaZM4YkTI-JFJHGRpWIZ8yxwJ", "isReal": true, "university": "bkhn", "driveType": "file"}, {"id": "REAL-DOC-104", "code": "XLTHS", "baseName": "Đề Cương Xử Lý Tín Hiệu số", "rawName": "Đề Cương Xử Lý Tín Hiệu số.docx", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 4.7, "reviewsCount": 126, "downloads": "1.5k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1qXIuHQ3Y0-mX_5uhepud0udywq6rVdr9", "isReal": true, "university": "uet", "driveType": "file"}, {"id": "REAL-DOC-124", "code": "CTTTVGPGDHNTKTDVTL", "baseName": "Đề Cương Chi Tiết - Thực Trạng và Giải Pháp Giáo Dục Hòa Nhập Trẻ Khuyết Tật (Điệp Viên Tài Liệu)", "rawName": "Đề Cương Chi Tiết - Thực Trạng và Giải Pháp Giáo Dục Hòa Nhập Trẻ Khuyết Tật (Điệp Viên Tài Liệu)", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 4.6, "reviewsCount": 158, "downloads": "2.3k+", "price": 50000, "originalPrice": 140000, "badge": "Chuẩn Đề Thi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1sS0EHCiT7Sp6tF0QX56432eHP0iWZE4kbyIPIk_suW0", "driveType": "file", "isReal": true, "university": "ueh"}, {"id": "REAL-DOC-038", "code": "CTH", "baseName": "Đề Cương Chính Trị Học", "rawName": "Đề Cương Chính Trị Học", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 36, "rating": 4.9, "reviewsCount": 136, "downloads": "2.4k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Đề Thi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1bysFMCLrH_LIW1cInuEw-nlNjjj_lgivP1GG2KsQQ_Q", "isReal": true, "university": "hongduc", "driveType": "file"}, {"id": "REAL-DOC-142", "code": "CSVH", "baseName": "Đề Cương Cơ Sở Văn Hóa", "rawName": "Đề Cương Cơ Sở Văn Hóa.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 32, "rating": 4.6, "reviewsCount": 53, "downloads": "2.8k+", "price": 50000, "originalPrice": 100000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Ccrwlb_0J8pn9roSwRrF1_WrLhb0Hl3J", "isReal": true, "university": "ueb", "driveType": "file"}, {"id": "REAL-DOC-080", "code": "CSVHVN", "baseName": "Đề Cương Cơ Sở Văn Hóa Việt Nam", "rawName": "Đề Cương Cơ Sở Văn Hóa Việt Nam", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 5.0, "reviewsCount": 104, "downloads": "1.6k+", "price": 50000, "originalPrice": 95000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1wCtxaAvNw0pPLWTFcsYnRptGlUOQ80YFgW4JuQ5uJPQ", "isReal": true, "university": "ussh", "driveType": "file"}, {"id": "REAL-DOC-017", "code": "DLNN", "baseName": "Đề Cương Dẫn Luận Ngôn Ngữ", "rawName": "Đề Cương Dẫn Luận Ngôn Ngữ", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.6, "reviewsCount": 161, "downloads": "2.8k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "124GOB_Fp_FKnhwerGKvgLsR-EICXhdExV4nAgN0WhLI", "isReal": true, "university": "vanlang", "driveType": "file"}, {"id": "REAL-DOC-129", "code": "GDHNTKT3", "baseName": "Đề Cương Giáo Dục Hòa Nhập Trẻ Khuyết Tật", "rawName": "Đề Cương Giáo Dục Hòa Nhập Trẻ Khuyết Tật", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 4.9, "reviewsCount": 129, "downloads": "1.0k+", "price": 50000, "originalPrice": 140000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1WNa-wHOMifX6b-sEnToyW4gXoGakYs_-ZzjCX-j55FQ", "driveType": "file", "isReal": true, "university": "apd"}, {"id": "REAL-DOC-128", "code": "GDHNTKT2", "baseName": "Đề Cương Giáo Dục Hòa Nhập Trẻ Khuyết Tật", "rawName": "Đề Cương Giáo Dục Hòa Nhập Trẻ Khuyết Tật.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 4.7, "reviewsCount": 160, "downloads": "3.6k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1xRC3DC028BIA2aBTazBiXNGIp_HPZR2y", "driveType": "file", "isReal": true, "university": "ulsa"}, {"id": "REAL-DOC-129", "code": "GDHNTKT", "baseName": "Đề Cương Giáo Dục Hòa Nhập Trẻ Khuyết Tật", "rawName": "Đề Cương Giáo Dục Hòa Nhập Trẻ Khuyết Tật.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.7, "reviewsCount": 43, "downloads": "1.0k+", "price": 50000, "originalPrice": 100000, "badge": "Chuẩn Đề Thi", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1cBpH2LKeKNk5tN96mW3eL0p1fxZzXw-s", "driveType": "file", "isReal": true, "university": "apd"}, {"id": "REAL-DOC-148", "code": "GTCN", "baseName": "Đề Cương Giới Thiệu Chuyên Ngành", "rawName": "Đề Cương Giới Thiệu Chuyên Ngành.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 22, "rating": 4.9, "reviewsCount": 102, "downloads": "3.4k+", "price": 50000, "originalPrice": 135000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1kq_hHmahEcDYMqKTC22aSzSOnMlry3zo", "isReal": true, "university": "ussh", "driveType": "file"}, {"id": "REAL-DOC-083", "code": "KNSTVBHVB", "baseName": "Đề Cương Kỹ Năng Soạn Thảo Và Ban Hành Văn Bản", "rawName": "Đề Cương Kỹ Năng Soạn Thảo Và Ban Hành Văn Bản", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 40, "rating": 4.6, "reviewsCount": 187, "downloads": "1.9k+", "price": 50000, "originalPrice": 130000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1U5b7Dsnhf1ds7LI84Lp4ckxa-CV5kBgt-F5hCwf7bPE", "isReal": true, "university": "ptit", "driveType": "file"}, {"id": "REAL-DOC-088", "code": "LSHTCTPL", "baseName": "Đề Cương Lịch Sử Học Thuyết Chính Trị Pháp Lý", "rawName": "Đề Cương Lịch Sử Học Thuyết Chính Trị Pháp Lý", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 24, "rating": 4.7, "reviewsCount": 53, "downloads": "2.4k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1eI3zXoaehEbkaOUu9q37p4SY0RHmUiKoZE_MAiENQ9Y", "isReal": true, "university": "hoasen", "driveType": "file"}, {"id": "REAL-DOC-067", "code": "LSHTCTVPL", "baseName": "Đề Cương Lịch Sử Học Thuyết Chính Trị Và Pháp Luật", "rawName": "Đề Cương Lịch Sử Học Thuyết Chính Trị Và Pháp Luật", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 32, "rating": 4.8, "reviewsCount": 111, "downloads": "2.8k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "11N01Z5JJ_4jqJFj1ThG1l8abHH93uuXKVVjf6NciutM", "isReal": true, "university": "ueh", "driveType": "file"}, {"id": "REAL-DOC-114", "code": "LSLTCT", "baseName": "Đề Cương Lịch Sử Lý Thuyết Chính Trị", "rawName": "Đề Cương Lịch Sử Lý Thuyết Chính Trị.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 22, "rating": 4.7, "reviewsCount": 34, "downloads": "2.5k+", "price": 50000, "originalPrice": 125000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1dBULuWZfvCdd2wh11TlX-HBrYvqrYdPE", "isReal": true, "university": "ntu", "driveType": "file"}, {"id": "REAL-DOC-041", "code": "LSTLH", "baseName": "Đề Cương Lịch Sử Tâm Lý Học", "rawName": "Đề Cương Lịch Sử Tâm Lý Học", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 30, "rating": 4.7, "reviewsCount": 138, "downloads": "2.7k+", "price": 50000, "originalPrice": 95000, "badge": "Trúng Tủ 98%", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1fm1qH8oepRUrgkpGn_5Z_COwwdEVczsagFFZgsTXhq8", "isReal": true, "university": "neu", "driveType": "file"}, {"id": "REAL-DOC-119", "code": "LSVN", "baseName": "Đề Cương Lịch Sử Việt Nam", "rawName": "Đề Cương Lịch Sử Việt Nam", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 4.8, "reviewsCount": 144, "downloads": "3.0k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1HLQksWFSOqRX4W3QsvuUJoKRma4HmaWrG062FqZBFeA", "isReal": true, "university": "bkhn", "driveType": "file"}, {"id": "REAL-DOC-034", "code": "LDN", "baseName": "Đề Cương Luật Doanh Nghiệp", "rawName": "Đề Cương Luật Doanh Nghiệp", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 32, "rating": 4.8, "reviewsCount": 175, "downloads": "2.0k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1baWJbTskyf7JEdl30YsBv4yEWN4sP7YoRoWDctv46II", "isReal": true, "university": "dhhp", "driveType": "file"}, {"id": "REAL-DOC-043", "code": "LLNNVPL", "baseName": "Đề Cương Lý Luận Nhà Nước Và Pháp Luật", "rawName": "Đề Cương Lý Luận Nhà Nước Và Pháp Luật.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 24, "rating": 4.8, "reviewsCount": 42, "downloads": "2.9k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1rce4lciH2dtRJ5e7eeMfpSVPmdKb0azO", "isReal": true, "university": "bkhn", "driveType": "file"}, {"id": "REAL-DOC-117", "code": "LTPTTL", "baseName": "Đề Cương Lý Thuyết Phát Triển Tâm Lý", "rawName": "Đề Cương Lý Thuyết Phát Triển Tâm Lý.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 24, "rating": 4.9, "reviewsCount": 79, "downloads": "2.8k+", "price": 50000, "originalPrice": 130000, "badge": "Trúng Tủ 98%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1HmpOek9ju5qDjcS6OjGgNxXFsrPu45HS", "isReal": true, "university": "hcmuc", "driveType": "file"}, {"id": "REAL-DOC-118", "code": "LTTLH", "baseName": "Đề Cương Lý Thuyết Tâm Lý Học", "rawName": "Đề Cương Lý Thuyết Tâm Lý Học.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 52, "rating": 4.7, "reviewsCount": 67, "downloads": "2.9k+", "price": 50000, "originalPrice": 135000, "badge": "Chuẩn Đề Thi", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1ljtv1KZ3SD0AZ37GW4jc4dbJrkObQpm8", "isReal": true, "university": "dhhp", "driveType": "file"}, {"id": "REAL-DOC-085", "code": "MTVCN", "baseName": "Đề Cương Môi Trường Và Con Người", "rawName": "Đề Cương Môi Trường Và Con Người", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 36, "rating": 4.8, "reviewsCount": 113, "downloads": "2.1k+", "price": 50000, "originalPrice": 120000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1P6bmocSyyv3_OMcjJ1tXvkOfouKCfyRATaSNrbmD29U", "isReal": true, "university": "hutech", "driveType": "file"}, {"id": "REAL-DOC-095", "code": "NCKH", "baseName": "Đề Cương Nghiên Cứu Khoa Học", "rawName": "Đề Cương Nghiên Cứu Khoa Học", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.8, "reviewsCount": 87, "downloads": "3.1k+", "price": 50000, "originalPrice": 95000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1ztDUFVSfCG4whBU4YJjemnXBBU38gygrr1uZVW40nTE", "isReal": true, "university": "duytan", "driveType": "file"}, {"id": "REAL-DOC-016", "code": "PPNCKH", "baseName": "Đề Cương Phương Pháp Nghiên Cứu Khoa Học", "rawName": "Đề Cương Phương Pháp Nghiên Cứu Khoa Học", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 30, "rating": 4.7, "reviewsCount": 129, "downloads": "2.7k+", "price": 50000, "originalPrice": 125000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "16kJ1kuOLL_Z1SGe6RXNvT_7NLaSG2ranIQhPWBCZgZs", "isReal": true, "university": "hlu", "driveType": "file"}, {"id": "REAL-DOC-028", "code": "QHCCBTTNDA", "baseName": "Đề Cương QUAN HỆ CÔNG CHÚNG - Bài Tập Trắc Nghiệm & Đáp Án", "rawName": "Đề Cương QUAN HỆ CÔNG CHÚNG - Bài Tập Trắc Nghiệm & Đáp Án", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 4.6, "reviewsCount": 174, "downloads": "1.4k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1TUoKo1xdHG156NMiVjszH8Y7S4OuNddPBcRRzCNWZAs", "isReal": true, "university": "duytan", "driveType": "file"}, {"id": "REAL-DOC-132", "code": "QLTD", "baseName": "Đề Cương Quản Lý Thay Đổi", "rawName": "Đề Cương Quản Lý Thay Đổi.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.8, "reviewsCount": 103, "downloads": "1.8k+", "price": 50000, "originalPrice": 95000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1UJo1m5AVOQkP82V0YMujIEYi-yfAnfxH", "isReal": true, "university": "ba", "driveType": "file"}, {"id": "REAL-DOC-089", "code": "QPAN", "baseName": "Đề Cương Quốc Phòng An Ninh", "rawName": "Đề Cương Quốc Phòng An Ninh", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 52, "rating": 4.9, "reviewsCount": 150, "downloads": "2.5k+", "price": 50000, "originalPrice": 150000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "17eyOTFi_IY2UNtJOQPmnIy_yQG77NIx0Io6MXQcpdx8", "isReal": true, "university": "dhhp", "driveType": "file"}, {"id": "REAL-DOC-036", "code": "SLHLTMN", "baseName": "Đề Cương Sinh lý học lứa tuổi mầm non", "rawName": "Đề Cương Sinh lý học lứa tuổi mầm non", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 36, "rating": 4.8, "reviewsCount": 141, "downloads": "2.2k+", "price": 50000, "originalPrice": 115000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1QvNnowFAiFr-c7hw_M0Vs0iyYRtMUXVggNAhYjaWZxo", "isReal": true, "university": "ulis", "driveType": "file"}, {"id": "REAL-DOC-068", "code": "SLHVGPHTE", "baseName": "Đề Cương Sinh Lý Học Và Giải Phẫu Học Trẻ Em", "rawName": "Đề Cương Sinh Lý Học Và Giải Phẫu Học Trẻ Em", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.9, "reviewsCount": 91, "downloads": "2.9k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Đề Thi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Il7_rt7HIRmpEuIbGILhlAVVn6LOtvNfN-J_CQNmnDY", "isReal": true, "university": "ba", "driveType": "file"}, {"id": "REAL-DOC-084", "code": "SLHVVSHTEMN", "baseName": "Đề Cương Sinh Lý Học Và Vệ Sinh Học Trẻ Em Mầm Non", "rawName": "Đề Cương Sinh Lý Học Và Vệ Sinh Học Trẻ Em Mầm Non", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 36, "rating": 4.7, "reviewsCount": 137, "downloads": "2.0k+", "price": 50000, "originalPrice": 115000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1daOlqUkkmrjE9hxko9e6y4iBZUjl5fsFEDUVsbXxa8Y", "isReal": true, "university": "hlu", "driveType": "file"}, {"id": "REAL-DOC-091", "code": "TLHNT", "baseName": "Đề Cương Tâm Lý Học Nhận Thức", "rawName": "Đề Cương Tâm Lý Học Nhận Thức", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 44, "rating": 4.6, "reviewsCount": 168, "downloads": "2.7k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Z_PnPdJiiwbOe-MCLGbtJCAqxe9ou29EEzS54htZMkc", "isReal": true, "university": "dav", "driveType": "file"}, {"id": "REAL-DOC-151", "code": "TLHTHVTVHD", "baseName": "Đề Cương Tâm Lý Học Trường Học Và Tham Vấn Học Đường", "rawName": "Đề Cương Tâm Lý Học Trường Học Và Tham Vấn Học Đường.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 46, "rating": 4.7, "reviewsCount": 74, "downloads": "2.3k+", "price": 50000, "originalPrice": 150000, "badge": "Chuẩn Đề Thi", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1hwQ42AdrCfe8CC0S12YhWwEFK3oUpcYH", "driveType": "file", "isReal": true, "university": "ftu"}, {"id": "REAL-DOC-144", "code": "TLHUD", "baseName": "Đề Cương Tâm Lý Học Ứng Dụng", "rawName": "Đề Cương Tâm Lý Học Ứng Dụng.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 22, "rating": 4.8, "reviewsCount": 180, "downloads": "3.0k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1CZXCz9nOd0WuaP3n8wZ-UOs1WK4WAkaC", "isReal": true, "university": "ntu", "driveType": "file"}, {"id": "REAL-DOC-133", "code": "TV", "baseName": "Đề Cương Tham Vấn", "rawName": "Đề Cương Tham Vấn.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 4.6, "reviewsCount": 131, "downloads": "1.9k+", "price": 50000, "originalPrice": 100000, "badge": "Trúng Tủ 98%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1Uw2XSd4XqI10B349BL_KYjO7b7OmImTC", "isReal": true, "university": "dav", "driveType": "file"}, {"id": "REAL-DOC-146", "code": "TTDT", "baseName": "Đề Cương Thanh Toán Điện Tử", "rawName": "Đề Cương Thanh Toán Điện Tử.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 52, "rating": 4.7, "reviewsCount": 127, "downloads": "3.2k+", "price": 50000, "originalPrice": 120000, "badge": "Chuẩn Đề Thi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1ysxRZe05fqjXv-pHRHJAb1egXdV-k90W", "isReal": true, "university": "ftu", "driveType": "file"}, {"id": "REAL-DOC-072", "code": "TKDN", "baseName": "Đề Cương Thống Kê Doanh Nghiệp", "rawName": "Đề Cương Thống Kê Doanh Nghiệp", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 4.7, "reviewsCount": 174, "downloads": "3.3k+", "price": 50000, "originalPrice": 135000, "badge": "Chuẩn Đề Thi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1nFjIXg2DCeewkeXkUzrSTBg0VkSHy1hJFy-YAmxFpyc", "isReal": true, "university": "neu", "driveType": "file"}, {"id": "REAL-DOC-124", "code": "TVTVHNNH", "baseName": "Đề Cương TIẾNG VIỆT - Từ vựng học & Ngữ nghĩa học", "rawName": "Đề Cương TIẾNG VIỆT - Từ vựng học & Ngữ nghĩa học", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 40, "rating": 4.9, "reviewsCount": 76, "downloads": "3.5k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Đề Thi", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1TFUfoKief1JNNVRfDOtMZWrHJrPO3ay4sd7m9Xk2Tww", "isReal": true, "university": "tmu", "driveType": "file"}, {"id": "REAL-DOC-059", "code": "TVTH", "baseName": "Đề Cương Tiếng Việt Thực Hành", "rawName": "Đề Cương Tiếng Việt Thực Hành.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.8, "reviewsCount": 55, "downloads": "2.0k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 98%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1enKNptkBXaUHvOQBNGXtKtFSMl1U7tOE", "isReal": true, "university": "tmu", "driveType": "file"}, {"id": "REAL-DOC-160", "code": "VHDG", "baseName": "Đề Cương Văn Học Dân Gian", "rawName": "Đề Cương Văn Học Dân Gian.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.7, "reviewsCount": 68, "downloads": "2.3k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Đề Thi", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "17B7iC4LEegLSuM3Dsw_03uKljIrJNDcI", "driveType": "file", "isReal": true, "university": "neu"}, {"id": "REAL-DOC-116", "code": "VHPT", "baseName": "Đề Cương Văn Học Phương Tây", "rawName": "Đề Cương Văn Học Phương Tây.docx", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 20, "rating": 4.6, "reviewsCount": 167, "downloads": "2.7k+", "price": 50000, "originalPrice": 115000, "badge": "Chuẩn Đề Thi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "17tOE7ub_97PDMjX3U42fH8LqLeH3qQA-", "isReal": true, "university": "neu", "driveType": "file"}, {"id": "REAL-DOC-018", "code": "XDMTGDTTMN", "baseName": "Đề Cương Xây Dựng Môi Trường Giáo Dục Trong trường mầm non", "rawName": "Đề Cương Xây Dựng Môi Trường Giáo Dục Trong trường mầm non", "category": "Luật & Xã Hội", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.7, "reviewsCount": 168, "downloads": "2.9k+", "price": 50000, "originalPrice": 140000, "badge": "Chuẩn Đề Thi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.", "driveId": "1nFJwmjm0Tup_6v-yVvOpw0-mDZ7ZCAf3niUj31wwFUQ", "isReal": true, "university": "ussh", "driveType": "file"}];
const DOCUMENTS_DATABASE = [{"id": "DOC-KTL-01", "code": "KTL301", "baseName": "Kinh Tế Lượng Ứng Dụng (Full EViews & Stata)", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]", "accentColor": "text-sky-300", "pages": 48, "rating": 4.7, "reviewsCount": 168, "downloads": "2.8k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đầy đủ các dạng bài tập hồi quy tuyến tính, kiểm định giả thuyết F, t-test, hiện tượng đa cộng tuyến, phương sai sai số thay đổi, tự tương quan.", "university": "neu"}, {"id": "DOC-MLN-02", "code": "MLN101", "baseName": "Triết Học Mác - Lênin (Sơ Đồ Tư Duy & Mẹo Nhớ)", "category": "Các Môn Đại Cương", "icon": "", "gradient": "from-rose-950 via-slate-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 46, "rating": 4.9, "reviewsCount": 38, "downloads": "4.5k+", "price": 50000, "originalPrice": 110000, "badge": "Best Seller", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Hệ thống hóa toàn bộ kiến thức Triết học từ CNDV biện chứng đến CNDV lịch sử. Dàn bài phân tích liên hệ thực tiễn bản thân & kinh tế.", "university": "neu"}, {"id": "DOC-MKT-03", "code": "MKT201", "baseName": "Marketing Căn Bản (Frameworks 4P/7P & Case Study ĐMX)", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-emerald-950 via-teal-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 36, "rating": 4.7, "reviewsCount": 112, "downloads": "1.9k+", "price": 50000, "originalPrice": 100000, "badge": "Đề Mới 2026", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Đề cương chuẩn kiến thức Kotler, hành vi người tiêu dùng, định vị STP, chiến lược sản phẩm, giá, kênh và truyền thông IMC.", "university": "neu"}, {"id": "DOC-TCDN-04", "code": "TCD302", "baseName": "Tài Chính Doanh Nghiệp (Báo Cáo Tài Chính & NPV/IRR)", "category": "Tài Chính - Ngân Hàng", "icon": "", "gradient": "from-amber-950 via-slate-950 to-[#0A143D]", "accentColor": "text-yellow-300", "pages": 48, "rating": 4.7, "reviewsCount": 39, "downloads": "3.1k+", "price": 50000, "originalPrice": 130000, "badge": "Trúng Tủ 99%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Dòng tiền dự án, định giá chứng khoán, chi phí vốn WACC, cơ cấu vốn tối ưu, đòn bẩy kinh doanh và tài chính.", "university": "ftu"}, {"id": "DOC-VIMO-05", "code": "ECO102", "baseName": "Kinh Tế Vi Mô 1 & 2 (Đồ Thị Co Giãn & Tối Ưu Hóa)", "category": "Kinh Tế & Thống Kê", "icon": "", "gradient": "from-cyan-950 via-blue-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 44, "rating": 4.7, "reviewsCount": 70, "downloads": "2.4k+", "price": 50000, "originalPrice": 120000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Hệ thống toàn bộ cung cầu, độ co giãn, thặng dư tiêu dùng, tối ưu hóa chi phí ngắn/dài hạn, các cấu trúc thị trường.", "university": "ftu"}, {"id": "DOC-LUAT-06", "code": "LAW202", "baseName": "Pháp Luật Đại Cương & Luật Kinh Tế (Tình Huống & Án Lệ)", "category": "Pháp Luật", "icon": "", "gradient": "from-purple-950 via-slate-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 34, "rating": 4.7, "reviewsCount": 105, "downloads": "1.7k+", "price": 50000, "originalPrice": 120000, "badge": "Có Đáp Án Case", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Lý luận nhà nước và pháp luật, Luật Doanh nghiệp, Luật Thương mại, giải quyết tranh chấp kinh doanh và hợp đồng.", "university": "bkhn"}, {"id": "DOC-QTH-07", "code": "MAN101", "baseName": "Quản Trị Học Căn Bản (4 Chức Năng POLC & SWOT)", "category": "Marketing & Quản Trị", "icon": "", "gradient": "from-blue-950 via-slate-950 to-[#0A143D]", "accentColor": "text-sky-300", "pages": 40, "rating": 4.9, "reviewsCount": 172, "downloads": "1.5k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Giáo Trình", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Bao quát 4 chức năng cốt lõi: Hoạch định chiến lược, Thiết kế cơ cấu tổ chức, Phong cách lãnh đạo, Hệ thống kiểm soát.", "university": "tmu"}, {"id": "DOC-IT-08", "code": "IT205", "baseName": "Cơ Sở Dữ Liệu & SQL Chuẩn (Thực Hành Truy Vấn + ERD)", "category": "Công Nghệ & Kỹ Thuật", "icon": "", "gradient": "from-emerald-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 28, "rating": 4.6, "reviewsCount": 152, "downloads": "2.1k+", "price": 50000, "originalPrice": 95000, "badge": "Code & Lời Giải", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "university": "bkhn"}, {"id": "DOC-1001", "code": "SUB923", "baseName": "Phương Pháp Giảng Dạy (Sơ Đồ Tư Duy)", "category": "Sư phạm", "icon": "", "gradient": "from-blue-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 28, "rating": 4.7, "reviewsCount": 38, "downloads": "1.5k+", "price": 50000, "originalPrice": 150000, "badge": "Trúng Tủ 99%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hcmue"}, {"id": "DOC-1002", "code": "SUB425", "baseName": "Quản Trị Nhà Hàng (Full Đáp Án)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-teal-950 via-purple-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 38, "rating": 4.8, "reviewsCount": 83, "downloads": "4.2k+", "price": 50000, "originalPrice": 150000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Quản Trị Nhà Hàng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tmu"}, {"id": "DOC-1003", "code": "SUB211", "baseName": "Tiếng Anh Chuyên Ngành (Full Đáp Án)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-teal-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 32, "rating": 4.9, "reviewsCount": 128, "downloads": "2.2k+", "price": 50000, "originalPrice": 120000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Tiếng Anh Chuyên Ngành cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ulis"}, {"id": "DOC-1004", "code": "SUB431", "baseName": "Phương Pháp Giảng Dạy (Sơ Đồ Tư Duy)", "category": "Sư phạm", "icon": "", "gradient": "from-purple-950 via-teal-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 44, "rating": 4.7, "reviewsCount": 188, "downloads": "4.2k+", "price": 50000, "originalPrice": 130000, "badge": "Trúng Tủ 99%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ued"}, {"id": "DOC-1005", "code": "SUB154", "baseName": "Logic Học (Full Đáp Án)", "category": "Đại cương", "icon": "", "gradient": "from-amber-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 52, "rating": 4.6, "reviewsCount": 109, "downloads": "2.4k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 99%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Logic Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ftu"}, {"id": "DOC-1006", "code": "SUB171", "baseName": "Kinh Tế Lượng (Đề Thi Cuối Kỳ)", "category": "Kinh tế", "icon": "", "gradient": "from-indigo-950 via-teal-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 38, "rating": 4.6, "reviewsCount": 51, "downloads": "3.6k+", "price": 50000, "originalPrice": 135000, "badge": "Đề Mới 2026", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Kinh Tế Lượng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tmu"}, {"id": "DOC-1007", "code": "SUB241", "baseName": "Tiếng Hàn TOPIK (Tóm Tắt Ngắn Gọn)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-cyan-950 via-slate-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 40, "rating": 4.6, "reviewsCount": 74, "downloads": "3.5k+", "price": 50000, "originalPrice": 140000, "badge": "Đề Mới 2026", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Tiếng Hàn TOPIK cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ftu"}, {"id": "DOC-1008", "code": "SUB378", "baseName": "Quản Trị Nhà Hàng (Đề Thi Cuối Kỳ)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-purple-950 via-teal-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 22, "rating": 4.7, "reviewsCount": 146, "downloads": "4.5k+", "price": 50000, "originalPrice": 120000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Quản Trị Nhà Hàng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ussh"}, {"id": "DOC-1009", "code": "SUB272", "baseName": "Tiếng Nhật N3/N4 (Đề Thi Cuối Kỳ)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-indigo-950 via-amber-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 22, "rating": 4.7, "reviewsCount": 65, "downloads": "4.4k+", "price": 50000, "originalPrice": 100000, "badge": "Trúng Tủ 99%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dav"}, {"id": "DOC-1010", "code": "SUB446", "baseName": "Luật Thương Mại Quốc Tế (Sơ Đồ Tư Duy)", "category": "Luật", "icon": "", "gradient": "from-purple-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 20, "rating": 4.9, "reviewsCount": 67, "downloads": "3.4k+", "price": 50000, "originalPrice": 125000, "badge": "Có Đáp Án Case", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hlu"}, {"id": "DOC-1011", "code": "SUB570", "baseName": "Địa Lý Du Lịch (Trắc Nghiệm & Tự Luận)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-amber-950 via-rose-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 34, "rating": 4.7, "reviewsCount": 145, "downloads": "3.4k+", "price": 50000, "originalPrice": 110000, "badge": "Có Đáp Án Case", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ntu"}, {"id": "DOC-1012", "code": "SUB202", "baseName": "Tiếng Trung HSK4 (Chi Tiết Phụ)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-indigo-950 via-purple-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 24, "rating": 4.8, "reviewsCount": 50, "downloads": "3.7k+", "price": 50000, "originalPrice": 110000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Tiếng Trung HSK4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ussh"}, {"id": "DOC-1013", "code": "SUB331", "baseName": "Triết Học Mác - Lênin (Chi Tiết Phụ)", "category": "Đại cương", "icon": "", "gradient": "from-cyan-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 46, "rating": 4.8, "reviewsCount": 70, "downloads": "3.9k+", "price": 50000, "originalPrice": 100000, "badge": "Code & Lời Giải", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Triết Học Mác - Lênin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tmu"}, {"id": "DOC-1014", "code": "SUB130", "baseName": "Quản Trị Nhân Lực (Đề Thi Cuối Kỳ)", "category": "Quản trị", "icon": "", "gradient": "from-slate-950 via-teal-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 38, "rating": 4.6, "reviewsCount": 48, "downloads": "4.8k+", "price": 50000, "originalPrice": 120000, "badge": "Code & Lời Giải", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Quản Trị Nhân Lực cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ueh"}, {"id": "DOC-1015", "code": "SUB786", "baseName": "Luật Thương Mại Quốc Tế (Trắc Nghiệm & Tự Luận)", "category": "Luật", "icon": "", "gradient": "from-blue-950 via-teal-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 26, "rating": 4.9, "reviewsCount": 61, "downloads": "2.8k+", "price": 50000, "originalPrice": 150000, "badge": "Code & Lời Giải", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "uel"}, {"id": "DOC-1016", "code": "SUB801", "baseName": "Tài Chính Tiền Tệ (Đề Thi Cuối Kỳ)", "category": "Kinh tế", "icon": "", "gradient": "from-blue-950 via-blue-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 32, "rating": 4.6, "reviewsCount": 84, "downloads": "2.4k+", "price": 50000, "originalPrice": 110000, "badge": "Đề Mới 2026", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Tài Chính Tiền Tệ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hvtc"}, {"id": "DOC-1017", "code": "SUB501", "baseName": "Tiếng Hàn TOPIK (Tóm Tắt Ngắn Gọn)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-rose-950 via-rose-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 30, "rating": 4.7, "reviewsCount": 184, "downloads": "4.1k+", "price": 50000, "originalPrice": 150000, "badge": "Best Seller", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Tiếng Hàn TOPIK cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hcmue"}, {"id": "DOC-1018", "code": "SUB880", "baseName": "Địa Lý Du Lịch (Sơ Đồ Tư Duy)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-purple-950 via-purple-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 36, "rating": 5.0, "reviewsCount": 159, "downloads": "3.8k+", "price": 50000, "originalPrice": 120000, "badge": "Trúng Tủ 99%", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "vanlang"}, {"id": "DOC-1019", "code": "SUB662", "baseName": "Phương Pháp Giảng Dạy (Tóm Tắt Ngắn Gọn)", "category": "Sư phạm", "icon": "", "gradient": "from-cyan-950 via-blue-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 46, "rating": 4.9, "reviewsCount": 126, "downloads": "1.1k+", "price": 50000, "originalPrice": 100000, "badge": "Chuẩn Giáo Trình", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dhhp"}, {"id": "DOC-1020", "code": "SUB245", "baseName": "Chủ Nghĩa Xã Hội Khoa Học (Full Đáp Án)", "category": "Đại cương", "icon": "", "gradient": "from-indigo-950 via-amber-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 22, "rating": 4.8, "reviewsCount": 166, "downloads": "2.3k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Giáo Trình", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Chủ Nghĩa Xã Hội Khoa Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hvtc"}, {"id": "DOC-1021", "code": "SUB973", "baseName": "Thương Mại Điện Tử (Chi Tiết Phụ)", "category": "Quản trị", "icon": "", "gradient": "from-amber-950 via-blue-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 36, "rating": 5.0, "reviewsCount": 162, "downloads": "3.4k+", "price": 50000, "originalPrice": 140000, "badge": "Code & Lời Giải", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Thương Mại Điện Tử cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ufm"}, {"id": "DOC-1022", "code": "SUB343", "baseName": "Đánh Giá Trong Giáo Dục (Trắc Nghiệm & Tự Luận)", "category": "Sư phạm", "icon": "", "gradient": "from-slate-950 via-blue-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 40, "rating": 5.0, "reviewsCount": 85, "downloads": "3.5k+", "price": 50000, "originalPrice": 135000, "badge": "Chuẩn Giáo Trình", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Đánh Giá Trong Giáo Dục cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hongduc"}, {"id": "DOC-1023", "code": "SUB889", "baseName": "Chủ Nghĩa Xã Hội Khoa Học (Trắc Nghiệm & Tự Luận)", "category": "Đại cương", "icon": "", "gradient": "from-blue-950 via-teal-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 32, "rating": 4.6, "reviewsCount": 111, "downloads": "2.7k+", "price": 50000, "originalPrice": 110000, "badge": "Best Seller", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Chủ Nghĩa Xã Hội Khoa Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ueh"}, {"id": "DOC-1024", "code": "SUB270", "baseName": "Xác Suất Thống Kê (Sơ Đồ Tư Duy)", "category": "Đại cương", "icon": "", "gradient": "from-purple-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 30, "rating": 4.6, "reviewsCount": 45, "downloads": "3.0k+", "price": 50000, "originalPrice": 120000, "badge": "Có Đáp Án Case", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Xác Suất Thống Kê cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ba"}, {"id": "DOC-1025", "code": "SUB441", "baseName": "Lập Trình C/C++ (Đề Thi Cuối Kỳ)", "category": "Công nghệ", "icon": "", "gradient": "from-blue-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 44, "rating": 4.9, "reviewsCount": 125, "downloads": "3.6k+", "price": 50000, "originalPrice": 125000, "badge": "Đề Mới 2026", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Lập Trình C/C++ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "uet"}, {"id": "DOC-1026", "code": "SUB303", "baseName": "Lịch Sử Đảng Cộng Sản Việt Nam (Sơ Đồ Tư Duy)", "category": "Đại cương", "icon": "", "gradient": "from-blue-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 26, "rating": 4.9, "reviewsCount": 77, "downloads": "1.8k+", "price": 50000, "originalPrice": 95000, "badge": "Best Seller", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Lịch Sử Đảng Cộng Sản Việt Nam cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dav"}, {"id": "DOC-1027", "code": "SUB470", "baseName": "Thương Mại Điện Tử (Tóm Tắt Ngắn Gọn)", "category": "Quản trị", "icon": "", "gradient": "from-purple-950 via-teal-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 48, "rating": 5.0, "reviewsCount": 110, "downloads": "4.7k+", "price": 50000, "originalPrice": 125000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Thương Mại Điện Tử cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "thanglong"}, {"id": "DOC-1028", "code": "SUB169", "baseName": "Luật Thương Mại Quốc Tế (Sơ Đồ Tư Duy)", "category": "Luật", "icon": "", "gradient": "from-slate-950 via-purple-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 24, "rating": 4.7, "reviewsCount": 134, "downloads": "4.1k+", "price": 50000, "originalPrice": 110000, "badge": "Trúng Tủ 98%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "neu"}, {"id": "DOC-1029", "code": "SUB190", "baseName": "Kinh Tế Quốc Tế (Full Đáp Án)", "category": "Kinh tế", "icon": "", "gradient": "from-cyan-950 via-amber-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 52, "rating": 4.9, "reviewsCount": 131, "downloads": "1.4k+", "price": 50000, "originalPrice": 135000, "badge": "Trúng Tủ 98%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Kinh Tế Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dnu"}, {"id": "DOC-1030", "code": "SUB709", "baseName": "An Toàn Thông Tin (Trắc Nghiệm & Tự Luận)", "category": "Công nghệ", "icon": "", "gradient": "from-teal-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 20, "rating": 5.0, "reviewsCount": 65, "downloads": "4.6k+", "price": 50000, "originalPrice": 95000, "badge": "Trúng Tủ 99%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu An Toàn Thông Tin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ptit"}, {"id": "DOC-1031", "code": "SUB758", "baseName": "Lập Trình Python (Đề Thi Cuối Kỳ)", "category": "Công nghệ", "icon": "", "gradient": "from-cyan-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 24, "rating": 4.8, "reviewsCount": 55, "downloads": "2.3k+", "price": 50000, "originalPrice": 125000, "badge": "Chuẩn Giáo Trình", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Lập Trình Python cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "thanglong"}, {"id": "DOC-1032", "code": "SUB809", "baseName": "Lập Trình C/C++ (Trắc Nghiệm & Tự Luận)", "category": "Công nghệ", "icon": "", "gradient": "from-emerald-950 via-amber-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 46, "rating": 4.8, "reviewsCount": 117, "downloads": "1.3k+", "price": 50000, "originalPrice": 130000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Lập Trình C/C++ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hutech"}, {"id": "DOC-1033", "code": "SUB221", "baseName": "Logic Học (Trắc Nghiệm & Tự Luận)", "category": "Đại cương", "icon": "", "gradient": "from-blue-950 via-slate-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 36, "rating": 4.6, "reviewsCount": 176, "downloads": "1.4k+", "price": 50000, "originalPrice": 95000, "badge": "Đề Mới 2026", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Logic Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "uet"}, {"id": "DOC-1034", "code": "SUB369", "baseName": "Tiếng Anh Thương Mại (Chi Tiết Phụ)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-emerald-950 via-teal-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 44, "rating": 4.8, "reviewsCount": 38, "downloads": "4.9k+", "price": 50000, "originalPrice": 110000, "badge": "Best Seller", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Tiếng Anh Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "huflit"}, {"id": "DOC-1035", "code": "SUB642", "baseName": "Luật Hình Sự (Chi Tiết Phụ)", "category": "Luật", "icon": "", "gradient": "from-slate-950 via-purple-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 28, "rating": 4.6, "reviewsCount": 105, "downloads": "4.9k+", "price": 50000, "originalPrice": 130000, "badge": "Trúng Tủ 98%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Luật Hình Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ftu"}, {"id": "DOC-1036", "code": "SUB525", "baseName": "Bảo Hiểm (Đề Thi Cuối Kỳ)", "category": "Kinh tế", "icon": "", "gradient": "from-purple-950 via-blue-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 30, "rating": 4.6, "reviewsCount": 152, "downloads": "2.1k+", "price": 50000, "originalPrice": 150000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Bảo Hiểm cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hutech"}, {"id": "DOC-1037", "code": "SUB859", "baseName": "Marketing Quốc Tế (Đề Thi Cuối Kỳ)", "category": "Quản trị", "icon": "", "gradient": "from-indigo-950 via-amber-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 28, "rating": 4.9, "reviewsCount": 131, "downloads": "4.3k+", "price": 50000, "originalPrice": 135000, "badge": "Chuẩn Giáo Trình", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Marketing Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hou"}, {"id": "DOC-1038", "code": "SUB961", "baseName": "Marketing Quốc Tế (Chi Tiết Phụ)", "category": "Quản trị", "icon": "", "gradient": "from-emerald-950 via-amber-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 38, "rating": 4.7, "reviewsCount": 68, "downloads": "2.8k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 99%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Marketing Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "bkhn"}, {"id": "DOC-1039", "code": "SUB584", "baseName": "Lập Trình C/C++ (Đề Thi Cuối Kỳ)", "category": "Công nghệ", "icon": "", "gradient": "from-purple-950 via-amber-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 36, "rating": 4.8, "reviewsCount": 175, "downloads": "1.6k+", "price": 50000, "originalPrice": 95000, "badge": "Trúng Tủ 99%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Lập Trình C/C++ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "vanlang"}, {"id": "DOC-1040", "code": "SUB554", "baseName": "Lịch Sử Đảng Cộng Sản Việt Nam (Sơ Đồ Tư Duy)", "category": "Đại cương", "icon": "", "gradient": "from-cyan-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 52, "rating": 4.9, "reviewsCount": 90, "downloads": "4.4k+", "price": 50000, "originalPrice": 150000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Lịch Sử Đảng Cộng Sản Việt Nam cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ueb"}, {"id": "DOC-1041", "code": "SUB290", "baseName": "Luật Kinh Tế (Đề Thi Cuối Kỳ)", "category": "Luật", "icon": "", "gradient": "from-slate-950 via-blue-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 38, "rating": 4.7, "reviewsCount": 172, "downloads": "3.8k+", "price": 50000, "originalPrice": 150000, "badge": "Best Seller", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tmu"}, {"id": "DOC-1042", "code": "SUB608", "baseName": "Nghiệp Vụ Hướng Dẫn (Full Đáp Án)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-blue-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 20, "rating": 4.7, "reviewsCount": 94, "downloads": "3.2k+", "price": 50000, "originalPrice": 100000, "badge": "Có Đáp Án Case", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Nghiệp Vụ Hướng Dẫn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hutech"}, {"id": "DOC-1043", "code": "SUB400", "baseName": "An Toàn Thông Tin (Sơ Đồ Tư Duy)", "category": "Công nghệ", "icon": "", "gradient": "from-emerald-950 via-amber-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 22, "rating": 4.8, "reviewsCount": 99, "downloads": "2.2k+", "price": 50000, "originalPrice": 100000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu An Toàn Thông Tin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "eaut"}, {"id": "DOC-1044", "code": "SUB569", "baseName": "Tiếng Nhật N3/N4 (Tóm Tắt Ngắn Gọn)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-emerald-950 via-rose-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 26, "rating": 5.0, "reviewsCount": 152, "downloads": "3.2k+", "price": 50000, "originalPrice": 95000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "vanlang"}, {"id": "DOC-1045", "code": "SUB264", "baseName": "Quản Trị Khách Sạn (Trắc Nghiệm & Tự Luận)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-blue-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 52, "rating": 4.6, "reviewsCount": 105, "downloads": "2.4k+", "price": 50000, "originalPrice": 125000, "badge": "Best Seller", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Quản Trị Khách Sạn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hou"}, {"id": "DOC-1046", "code": "SUB599", "baseName": "Luật Thương Mại Quốc Tế (Chi Tiết Phụ)", "category": "Luật", "icon": "", "gradient": "from-amber-950 via-teal-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 38, "rating": 4.6, "reviewsCount": 91, "downloads": "3.2k+", "price": 50000, "originalPrice": 100000, "badge": "Trúng Tủ 99%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hou"}, {"id": "DOC-1047", "code": "SUB777", "baseName": "An Toàn Thông Tin (Trắc Nghiệm & Tự Luận)", "category": "Công nghệ", "icon": "", "gradient": "from-rose-950 via-blue-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 34, "rating": 4.7, "reviewsCount": 116, "downloads": "2.8k+", "price": 50000, "originalPrice": 130000, "badge": "Code & Lời Giải", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu An Toàn Thông Tin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "phenikaa"}, {"id": "DOC-1048", "code": "SUB843", "baseName": "Giáo Dục Học (Full Đáp Án)", "category": "Sư phạm", "icon": "", "gradient": "from-rose-950 via-rose-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 32, "rating": 4.6, "reviewsCount": 137, "downloads": "4.6k+", "price": 50000, "originalPrice": 140000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Giáo Dục Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "vinhuni"}, {"id": "DOC-1049", "code": "SUB228", "baseName": "Tư Tưởng Hồ Chí Minh (Tóm Tắt Ngắn Gọn)", "category": "Đại cương", "icon": "", "gradient": "from-purple-950 via-amber-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 44, "rating": 4.6, "reviewsCount": 113, "downloads": "2.7k+", "price": 50000, "originalPrice": 115000, "badge": "Đề Mới 2026", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Tư Tưởng Hồ Chí Minh cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ulis"}, {"id": "DOC-1050", "code": "SUB963", "baseName": "Lịch Sử Đảng Cộng Sản Việt Nam (Chi Tiết Phụ)", "category": "Đại cương", "icon": "", "gradient": "from-slate-950 via-blue-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 24, "rating": 4.8, "reviewsCount": 43, "downloads": "3.3k+", "price": 50000, "originalPrice": 120000, "badge": "Đề Mới 2026", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Lịch Sử Đảng Cộng Sản Việt Nam cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ussh"}, {"id": "DOC-1051", "code": "SUB944", "baseName": "Quản Trị Nhà Hàng (Tóm Tắt Ngắn Gọn)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-slate-950 via-rose-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 40, "rating": 4.6, "reviewsCount": 82, "downloads": "4.5k+", "price": 50000, "originalPrice": 115000, "badge": "Code & Lời Giải", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Quản Trị Nhà Hàng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dnu"}, {"id": "DOC-1052", "code": "SUB841", "baseName": "Tâm Lý Học Sư Phạm (Trắc Nghiệm & Tự Luận)", "category": "Sư phạm", "icon": "", "gradient": "from-cyan-950 via-blue-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 30, "rating": 4.8, "reviewsCount": 164, "downloads": "1.5k+", "price": 50000, "originalPrice": 130000, "badge": "Code & Lời Giải", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Tâm Lý Học Sư Phạm cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "vanlang"}, {"id": "DOC-1053", "code": "SUB895", "baseName": "Luật Kinh Tế (Đề Thi Cuối Kỳ)", "category": "Luật", "icon": "", "gradient": "from-slate-950 via-slate-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 52, "rating": 4.7, "reviewsCount": 41, "downloads": "4.2k+", "price": 50000, "originalPrice": 95000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dnu"}, {"id": "DOC-1054", "code": "SUB626", "baseName": "Thuế (Tóm Tắt Ngắn Gọn)", "category": "Kinh tế", "icon": "", "gradient": "from-blue-950 via-blue-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 20, "rating": 4.9, "reviewsCount": 115, "downloads": "3.2k+", "price": 50000, "originalPrice": 135000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Thuế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ba"}, {"id": "DOC-1055", "code": "SUB268", "baseName": "Đánh Giá Trong Giáo Dục (Trắc Nghiệm & Tự Luận)", "category": "Sư phạm", "icon": "", "gradient": "from-cyan-950 via-blue-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 48, "rating": 4.9, "reviewsCount": 151, "downloads": "4.4k+", "price": 50000, "originalPrice": 150000, "badge": "Có Đáp Án Case", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Đánh Giá Trong Giáo Dục cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hongduc"}, {"id": "DOC-1056", "code": "SUB671", "baseName": "Cơ Sở Dữ Liệu (Trắc Nghiệm & Tự Luận)", "category": "Công nghệ", "icon": "", "gradient": "from-rose-950 via-blue-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 28, "rating": 4.8, "reviewsCount": 69, "downloads": "1.9k+", "price": 50000, "originalPrice": 95000, "badge": "Code & Lời Giải", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Cơ Sở Dữ Liệu cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "duytan"}, {"id": "DOC-1057", "code": "SUB926", "baseName": "Triết Học Mác - Lênin (Trắc Nghiệm & Tự Luận)", "category": "Đại cương", "icon": "", "gradient": "from-indigo-950 via-amber-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 30, "rating": 4.8, "reviewsCount": 135, "downloads": "3.7k+", "price": 50000, "originalPrice": 125000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Triết Học Mác - Lênin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ptit"}, {"id": "DOC-1058", "code": "SUB926", "baseName": "Tâm Lý Học Sư Phạm (Sơ Đồ Tư Duy)", "category": "Sư phạm", "icon": "", "gradient": "from-cyan-950 via-rose-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 20, "rating": 4.6, "reviewsCount": 94, "downloads": "1.6k+", "price": 50000, "originalPrice": 115000, "badge": "Đề Mới 2026", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Tâm Lý Học Sư Phạm cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tlu"}, {"id": "DOC-1059", "code": "SUB691", "baseName": "Kinh Tế Phát Triển (Đề Thi Cuối Kỳ)", "category": "Kinh tế", "icon": "", "gradient": "from-purple-950 via-teal-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 52, "rating": 4.9, "reviewsCount": 69, "downloads": "3.8k+", "price": 50000, "originalPrice": 150000, "badge": "Có Đáp Án Case", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Kinh Tế Phát Triển cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "humg"}, {"id": "DOC-1060", "code": "SUB580", "baseName": "Phương Pháp Giảng Dạy (Đề Thi Cuối Kỳ)", "category": "Sư phạm", "icon": "", "gradient": "from-slate-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 40, "rating": 4.7, "reviewsCount": 128, "downloads": "2.5k+", "price": 50000, "originalPrice": 120000, "badge": "Có Đáp Án Case", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hcmue"}, {"id": "DOC-1061", "code": "SUB307", "baseName": "Đánh Giá Trong Giáo Dục (Tóm Tắt Ngắn Gọn)", "category": "Sư phạm", "icon": "", "gradient": "from-cyan-950 via-blue-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 40, "rating": 4.6, "reviewsCount": 161, "downloads": "3.7k+", "price": 50000, "originalPrice": 140000, "badge": "Code & Lời Giải", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Đánh Giá Trong Giáo Dục cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ued"}, {"id": "DOC-1062", "code": "SUB469", "baseName": "Luật Kinh Tế (Tóm Tắt Ngắn Gọn)", "category": "Luật", "icon": "", "gradient": "from-amber-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 4.6, "reviewsCount": 153, "downloads": "3.5k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 98%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ulsa"}, {"id": "DOC-1063", "code": "SUB729", "baseName": "Tiếng Nhật N3/N4 (Full Đáp Án)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-cyan-950 via-blue-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 22, "rating": 4.7, "reviewsCount": 55, "downloads": "2.0k+", "price": 50000, "originalPrice": 125000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "thanglong"}, {"id": "DOC-1064", "code": "SUB633", "baseName": "Cơ Sở Dữ Liệu (Chi Tiết Phụ)", "category": "Công nghệ", "icon": "", "gradient": "from-rose-950 via-rose-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 20, "rating": 4.9, "reviewsCount": 134, "downloads": "1.0k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 99%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Cơ Sở Dữ Liệu cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hou"}, {"id": "DOC-1065", "code": "SUB878", "baseName": "Luật Lao Động (Sơ Đồ Tư Duy)", "category": "Luật", "icon": "", "gradient": "from-indigo-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 44, "rating": 4.7, "reviewsCount": 134, "downloads": "4.8k+", "price": 50000, "originalPrice": 120000, "badge": "Best Seller", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Luật Lao Động cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ba"}, {"id": "DOC-1066", "code": "SUB242", "baseName": "Quản Trị Khách Sạn (Tóm Tắt Ngắn Gọn)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-rose-950 via-slate-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 26, "rating": 4.8, "reviewsCount": 175, "downloads": "3.3k+", "price": 50000, "originalPrice": 95000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Quản Trị Khách Sạn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hoasen"}, {"id": "DOC-1067", "code": "SUB275", "baseName": "Phương Pháp Giảng Dạy (Tóm Tắt Ngắn Gọn)", "category": "Sư phạm", "icon": "", "gradient": "from-purple-950 via-teal-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 40, "rating": 4.7, "reviewsCount": 151, "downloads": "1.0k+", "price": 50000, "originalPrice": 110000, "badge": "Có Đáp Án Case", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dhhp"}, {"id": "DOC-1068", "code": "SUB436", "baseName": "Logic Học (Đề Thi Cuối Kỳ)", "category": "Đại cương", "icon": "", "gradient": "from-rose-950 via-blue-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 34, "rating": 4.8, "reviewsCount": 62, "downloads": "4.8k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Logic Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hlu"}, {"id": "DOC-1069", "code": "SUB608", "baseName": "Cơ Sở Dữ Liệu (Đề Thi Cuối Kỳ)", "category": "Công nghệ", "icon": "", "gradient": "from-cyan-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 24, "rating": 4.8, "reviewsCount": 56, "downloads": "4.5k+", "price": 50000, "originalPrice": 110000, "badge": "Best Seller", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Cơ Sở Dữ Liệu cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dnu"}, {"id": "DOC-1070", "code": "SUB621", "baseName": "Tâm Lý Học Sư Phạm (Trắc Nghiệm & Tự Luận)", "category": "Sư phạm", "icon": "", "gradient": "from-purple-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 28, "rating": 4.9, "reviewsCount": 129, "downloads": "2.4k+", "price": 50000, "originalPrice": 125000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Tâm Lý Học Sư Phạm cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hongduc"}, {"id": "DOC-1071", "code": "SUB116", "baseName": "Tài Chính Tiền Tệ (Tóm Tắt Ngắn Gọn)", "category": "Kinh tế", "icon": "", "gradient": "from-cyan-950 via-teal-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 32, "rating": 4.9, "reviewsCount": 84, "downloads": "1.2k+", "price": 50000, "originalPrice": 130000, "badge": "Best Seller", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Tài Chính Tiền Tệ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ueh"}, {"id": "DOC-1072", "code": "SUB406", "baseName": "Marketing Quốc Tế (Trắc Nghiệm & Tự Luận)", "category": "Quản trị", "icon": "", "gradient": "from-rose-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 52, "rating": 4.6, "reviewsCount": 165, "downloads": "1.4k+", "price": 50000, "originalPrice": 120000, "badge": "Trúng Tủ 98%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Marketing Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "neu"}, {"id": "DOC-1073", "code": "SUB114", "baseName": "Lịch Sử Đảng Cộng Sản Việt Nam (Tóm Tắt Ngắn Gọn)", "category": "Đại cương", "icon": "", "gradient": "from-teal-950 via-purple-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 30, "rating": 4.6, "reviewsCount": 149, "downloads": "4.7k+", "price": 50000, "originalPrice": 135000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Lịch Sử Đảng Cộng Sản Việt Nam cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hutech"}, {"id": "DOC-1074", "code": "SUB106", "baseName": "Tư Tưởng Hồ Chí Minh (Tóm Tắt Ngắn Gọn)", "category": "Đại cương", "icon": "", "gradient": "from-teal-950 via-rose-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 26, "rating": 4.6, "reviewsCount": 87, "downloads": "4.0k+", "price": 50000, "originalPrice": 150000, "badge": "Trúng Tủ 98%", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Tư Tưởng Hồ Chí Minh cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "vanlang"}, {"id": "DOC-1075", "code": "SUB118", "baseName": "Địa Lý Du Lịch (Full Đáp Án)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-indigo-950 via-slate-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 22, "rating": 4.8, "reviewsCount": 39, "downloads": "4.8k+", "price": 50000, "originalPrice": 130000, "badge": "Best Seller", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "neu"}, {"id": "DOC-1076", "code": "SUB190", "baseName": "Logic Học (Tóm Tắt Ngắn Gọn)", "category": "Đại cương", "icon": "", "gradient": "from-purple-950 via-amber-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 46, "rating": 4.8, "reviewsCount": 180, "downloads": "4.8k+", "price": 50000, "originalPrice": 115000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Logic Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hoasen"}, {"id": "DOC-1077", "code": "SUB793", "baseName": "Xác Suất Thống Kê (Tóm Tắt Ngắn Gọn)", "category": "Đại cương", "icon": "", "gradient": "from-cyan-950 via-amber-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 34, "rating": 4.7, "reviewsCount": 100, "downloads": "2.8k+", "price": 50000, "originalPrice": 120000, "badge": "Code & Lời Giải", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Xác Suất Thống Kê cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dhhp"}, {"id": "DOC-1078", "code": "SUB713", "baseName": "Luật Thương Mại Quốc Tế (Full Đáp Án)", "category": "Luật", "icon": "", "gradient": "from-blue-950 via-rose-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 20, "rating": 4.8, "reviewsCount": 121, "downloads": "4.9k+", "price": 50000, "originalPrice": 140000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tcnh_hn"}, {"id": "DOC-1079", "code": "SUB824", "baseName": "Tiếng Nhật N3/N4 (Tóm Tắt Ngắn Gọn)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-emerald-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 48, "rating": 4.8, "reviewsCount": 62, "downloads": "4.0k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dnu"}, {"id": "DOC-1080", "code": "SUB426", "baseName": "Tiếng Trung HSK4 (Tóm Tắt Ngắn Gọn)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-slate-950 via-teal-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 28, "rating": 4.9, "reviewsCount": 128, "downloads": "4.2k+", "price": 50000, "originalPrice": 110000, "badge": "Code & Lời Giải", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Tiếng Trung HSK4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "neu"}, {"id": "DOC-1081", "code": "SUB262", "baseName": "Thị Trường Chứng Khoán (Full Đáp Án)", "category": "Kinh tế", "icon": "", "gradient": "from-blue-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 44, "rating": 4.8, "reviewsCount": 113, "downloads": "1.2k+", "price": 50000, "originalPrice": 120000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Thị Trường Chứng Khoán cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ueb"}, {"id": "DOC-1082", "code": "SUB710", "baseName": "Quản Trị Học (Full Đáp Án)", "category": "Quản trị", "icon": "", "gradient": "from-rose-950 via-rose-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 20, "rating": 4.8, "reviewsCount": 45, "downloads": "1.4k+", "price": 50000, "originalPrice": 110000, "badge": "Chuẩn Giáo Trình", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Quản Trị Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ftu"}, {"id": "DOC-1083", "code": "SUB949", "baseName": "Nguyên Lý Kế Toán (Tóm Tắt Ngắn Gọn)", "category": "Kinh tế", "icon": "", "gradient": "from-teal-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 48, "rating": 4.8, "reviewsCount": 104, "downloads": "1.7k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 99%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Nguyên Lý Kế Toán cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ufm"}, {"id": "DOC-1084", "code": "SUB999", "baseName": "Xác Suất Thống Kê (Sơ Đồ Tư Duy)", "category": "Đại cương", "icon": "", "gradient": "from-blue-950 via-teal-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 44, "rating": 4.9, "reviewsCount": 103, "downloads": "1.5k+", "price": 50000, "originalPrice": 130000, "badge": "Code & Lời Giải", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Xác Suất Thống Kê cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "duytan"}, {"id": "DOC-1085", "code": "SUB389", "baseName": "Luật Lao Động (Chi Tiết Phụ)", "category": "Luật", "icon": "", "gradient": "from-emerald-950 via-teal-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 30, "rating": 4.8, "reviewsCount": 176, "downloads": "5.0k+", "price": 50000, "originalPrice": 135000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Luật Lao Động cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hlu"}, {"id": "DOC-1086", "code": "SUB201", "baseName": "Quản Trị Học (Full Đáp Án)", "category": "Quản trị", "icon": "", "gradient": "from-purple-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 22, "rating": 4.8, "reviewsCount": 186, "downloads": "3.4k+", "price": 50000, "originalPrice": 110000, "badge": "Trúng Tủ 99%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Quản Trị Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tmu"}, {"id": "DOC-1087", "code": "SUB299", "baseName": "Tiếng Anh Thương Mại (Đề Thi Cuối Kỳ)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-slate-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 20, "rating": 4.7, "reviewsCount": 40, "downloads": "3.8k+", "price": 50000, "originalPrice": 110000, "badge": "Có Đáp Án Case", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Tiếng Anh Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "vanlang"}, {"id": "DOC-1088", "code": "SUB735", "baseName": "Xã Hội Học Đại Cương (Tóm Tắt Ngắn Gọn)", "category": "Đại cương", "icon": "", "gradient": "from-blue-950 via-blue-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 30, "rating": 4.9, "reviewsCount": 119, "downloads": "2.9k+", "price": 50000, "originalPrice": 150000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Xã Hội Học Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "thanglong"}, {"id": "DOC-1089", "code": "SUB657", "baseName": "Lập Trình Python (Sơ Đồ Tư Duy)", "category": "Công nghệ", "icon": "", "gradient": "from-teal-950 via-teal-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 38, "rating": 4.6, "reviewsCount": 159, "downloads": "4.9k+", "price": 50000, "originalPrice": 110000, "badge": "Đề Mới 2026", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Lập Trình Python cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dpu"}, {"id": "DOC-1090", "code": "SUB603", "baseName": "Kinh Tế Vĩ Mô 1 & 2 (Tóm Tắt Ngắn Gọn)", "category": "Kinh tế", "icon": "", "gradient": "from-rose-950 via-teal-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 40, "rating": 4.8, "reviewsCount": 170, "downloads": "1.9k+", "price": 50000, "originalPrice": 150000, "badge": "Chuẩn Giáo Trình", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Kinh Tế Vĩ Mô 1 & 2 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ueh"}, {"id": "DOC-1091", "code": "SUB626", "baseName": "Tâm Lý Học Đại Cương (Chi Tiết Phụ)", "category": "Đại cương", "icon": "", "gradient": "from-slate-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 36, "rating": 4.9, "reviewsCount": 104, "downloads": "4.9k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 99%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Tâm Lý Học Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dnu"}, {"id": "DOC-1092", "code": "SUB434", "baseName": "Nghiệp Vụ Hướng Dẫn (Đề Thi Cuối Kỳ)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-cyan-950 via-purple-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 22, "rating": 4.8, "reviewsCount": 122, "downloads": "1.4k+", "price": 50000, "originalPrice": 125000, "badge": "Code & Lời Giải", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Nghiệp Vụ Hướng Dẫn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ufm"}, {"id": "DOC-1093", "code": "SUB479", "baseName": "Luật Thương Mại Quốc Tế (Tóm Tắt Ngắn Gọn)", "category": "Luật", "icon": "", "gradient": "from-slate-950 via-amber-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 44, "rating": 4.9, "reviewsCount": 167, "downloads": "4.2k+", "price": 50000, "originalPrice": 95000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "uel"}, {"id": "DOC-1094", "code": "SUB651", "baseName": "Chủ Nghĩa Xã Hội Khoa Học (Tóm Tắt Ngắn Gọn)", "category": "Đại cương", "icon": "", "gradient": "from-amber-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 52, "rating": 4.8, "reviewsCount": 72, "downloads": "1.8k+", "price": 50000, "originalPrice": 110000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Chủ Nghĩa Xã Hội Khoa Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tcnh_hn"}, {"id": "DOC-1095", "code": "SUB658", "baseName": "Tiếng Trung HSK4 (Đề Thi Cuối Kỳ)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-cyan-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 30, "rating": 4.8, "reviewsCount": 138, "downloads": "4.0k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 99%", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Tiếng Trung HSK4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ulis"}, {"id": "DOC-1096", "code": "SUB705", "baseName": "Luật Hình Sự (Tóm Tắt Ngắn Gọn)", "category": "Luật", "icon": "", "gradient": "from-emerald-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 44, "rating": 4.6, "reviewsCount": 145, "downloads": "1.6k+", "price": 50000, "originalPrice": 100000, "badge": "Code & Lời Giải", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Luật Hình Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "neu"}, {"id": "DOC-1097", "code": "SUB128", "baseName": "Luật Hình Sự (Chi Tiết Phụ)", "category": "Luật", "icon": "", "gradient": "from-slate-950 via-amber-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 36, "rating": 4.9, "reviewsCount": 80, "downloads": "4.1k+", "price": 50000, "originalPrice": 120000, "badge": "Chuẩn Giáo Trình", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Luật Hình Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ftu"}, {"id": "DOC-1098", "code": "SUB436", "baseName": "Kế Toán Quản Trị (Tóm Tắt Ngắn Gọn)", "category": "Kinh tế", "icon": "", "gradient": "from-cyan-950 via-slate-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 46, "rating": 4.9, "reviewsCount": 157, "downloads": "3.9k+", "price": 50000, "originalPrice": 110000, "badge": "Đề Mới 2026", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Kế Toán Quản Trị cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tcnh_hn"}, {"id": "DOC-1099", "code": "SUB888", "baseName": "Tiếng Hàn TOPIK (Full Đáp Án)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-teal-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 36, "rating": 4.8, "reviewsCount": 168, "downloads": "2.1k+", "price": 50000, "originalPrice": 130000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Tiếng Hàn TOPIK cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ftu"}, {"id": "DOC-1100", "code": "SUB385", "baseName": "Đánh Giá Trong Giáo Dục (Sơ Đồ Tư Duy)", "category": "Sư phạm", "icon": "", "gradient": "from-teal-950 via-slate-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 44, "rating": 4.6, "reviewsCount": 40, "downloads": "4.2k+", "price": 50000, "originalPrice": 140000, "badge": "Chuẩn Giáo Trình", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Đánh Giá Trong Giáo Dục cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "vinhuni"}, {"id": "DOC-1101", "code": "SUB239", "baseName": "Triết Học Mác - Lênin (Sơ Đồ Tư Duy)", "category": "Đại cương", "icon": "", "gradient": "from-indigo-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 32, "rating": 4.7, "reviewsCount": 161, "downloads": "1.7k+", "price": 50000, "originalPrice": 100000, "badge": "Đề Mới 2026", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Triết Học Mác - Lênin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hongduc"}, {"id": "DOC-1102", "code": "SUB353", "baseName": "Kinh Tế Phát Triển (Chi Tiết Phụ)", "category": "Kinh tế", "icon": "", "gradient": "from-rose-950 via-rose-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 22, "rating": 4.9, "reviewsCount": 165, "downloads": "1.5k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 99%", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Kinh Tế Phát Triển cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ufm"}, {"id": "DOC-1103", "code": "SUB441", "baseName": "Luật Kinh Tế (Sơ Đồ Tư Duy)", "category": "Luật", "icon": "", "gradient": "from-emerald-950 via-blue-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 46, "rating": 4.7, "reviewsCount": 113, "downloads": "2.8k+", "price": 50000, "originalPrice": 125000, "badge": "Code & Lời Giải", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tmu"}, {"id": "DOC-1104", "code": "SUB320", "baseName": "Quản Trị Nhà Hàng (Full Đáp Án)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-emerald-950 via-purple-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 20, "rating": 5.0, "reviewsCount": 91, "downloads": "2.8k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 99%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Quản Trị Nhà Hàng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tmu"}, {"id": "DOC-1105", "code": "SUB985", "baseName": "Pháp Luật Đại Cương (Tóm Tắt Ngắn Gọn)", "category": "Đại cương", "icon": "", "gradient": "from-purple-950 via-rose-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 44, "rating": 4.8, "reviewsCount": 133, "downloads": "3.6k+", "price": 50000, "originalPrice": 150000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Pháp Luật Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ntu"}, {"id": "DOC-1106", "code": "SUB398", "baseName": "Mạng Máy Tính (Đề Thi Cuối Kỳ)", "category": "Công nghệ", "icon": "", "gradient": "from-blue-950 via-teal-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 22, "rating": 4.8, "reviewsCount": 141, "downloads": "2.0k+", "price": 50000, "originalPrice": 100000, "badge": "Trúng Tủ 99%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Mạng Máy Tính cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ulis"}, {"id": "DOC-1107", "code": "SUB942", "baseName": "Quản Trị Nhà Hàng (Chi Tiết Phụ)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-amber-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 30, "rating": 4.6, "reviewsCount": 146, "downloads": "4.9k+", "price": 50000, "originalPrice": 120000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Quản Trị Nhà Hàng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ussh"}, {"id": "DOC-1108", "code": "SUB785", "baseName": "Nghiệp Vụ Hướng Dẫn (Chi Tiết Phụ)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-purple-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 30, "rating": 4.7, "reviewsCount": 56, "downloads": "2.4k+", "price": 50000, "originalPrice": 125000, "badge": "Có Đáp Án Case", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Nghiệp Vụ Hướng Dẫn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ntu"}, {"id": "DOC-1109", "code": "SUB171", "baseName": "Quản Trị Nhà Hàng (Chi Tiết Phụ)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-rose-950 via-rose-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 36, "rating": 4.7, "reviewsCount": 63, "downloads": "3.6k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Giáo Trình", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Quản Trị Nhà Hàng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "vanlang"}, {"id": "DOC-1110", "code": "SUB906", "baseName": "Tâm Lý Học Sư Phạm (Trắc Nghiệm & Tự Luận)", "category": "Sư phạm", "icon": "", "gradient": "from-slate-950 via-slate-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 30, "rating": 4.7, "reviewsCount": 146, "downloads": "1.2k+", "price": 50000, "originalPrice": 110000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Tâm Lý Học Sư Phạm cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dpu"}, {"id": "DOC-1111", "code": "SUB658", "baseName": "Tổng Quan Du Lịch (Tóm Tắt Ngắn Gọn)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-slate-950 via-blue-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 44, "rating": 4.9, "reviewsCount": 49, "downloads": "2.5k+", "price": 50000, "originalPrice": 125000, "badge": "Chuẩn Giáo Trình", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Tổng Quan Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hutech"}, {"id": "DOC-1112", "code": "SUB400", "baseName": "Ngân Hàng Thương Mại (Full Đáp Án)", "category": "Kinh tế", "icon": "", "gradient": "from-indigo-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 38, "rating": 4.7, "reviewsCount": 41, "downloads": "4.3k+", "price": 50000, "originalPrice": 120000, "badge": "Có Đáp Án Case", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Ngân Hàng Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "thanglong"}, {"id": "DOC-1113", "code": "SUB761", "baseName": "Luật Kinh Tế (Chi Tiết Phụ)", "category": "Luật", "icon": "", "gradient": "from-purple-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 36, "rating": 4.6, "reviewsCount": 156, "downloads": "3.6k+", "price": 50000, "originalPrice": 100000, "badge": "Trúng Tủ 99%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hou"}, {"id": "DOC-1114", "code": "SUB724", "baseName": "Ngân Hàng Thương Mại (Tóm Tắt Ngắn Gọn)", "category": "Kinh tế", "icon": "", "gradient": "from-teal-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 32, "rating": 4.7, "reviewsCount": 182, "downloads": "2.9k+", "price": 50000, "originalPrice": 150000, "badge": "Trúng Tủ 99%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Ngân Hàng Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ussh"}, {"id": "DOC-1115", "code": "SUB145", "baseName": "Tổng Quan Du Lịch (Đề Thi Cuối Kỳ)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-amber-950 via-blue-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 28, "rating": 4.9, "reviewsCount": 85, "downloads": "3.1k+", "price": 50000, "originalPrice": 115000, "badge": "Đề Mới 2026", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Tổng Quan Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hou"}, {"id": "DOC-1116", "code": "SUB972", "baseName": "Quản Trị Nhân Lực (Chi Tiết Phụ)", "category": "Quản trị", "icon": "", "gradient": "from-cyan-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 46, "rating": 4.9, "reviewsCount": 179, "downloads": "1.6k+", "price": 50000, "originalPrice": 120000, "badge": "Code & Lời Giải", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Quản Trị Nhân Lực cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "thanglong"}, {"id": "DOC-1117", "code": "SUB511", "baseName": "Hệ Thống Thông Tin Quản Lý (Đề Thi Cuối Kỳ)", "category": "Công nghệ", "icon": "", "gradient": "from-indigo-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 22, "rating": 4.8, "reviewsCount": 156, "downloads": "2.7k+", "price": 50000, "originalPrice": 135000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Hệ Thống Thông Tin Quản Lý cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ptit"}, {"id": "DOC-1118", "code": "SUB449", "baseName": "Tiếng Trung HSK4 (Chi Tiết Phụ)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-slate-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 30, "rating": 4.8, "reviewsCount": 127, "downloads": "1.1k+", "price": 50000, "originalPrice": 120000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Tiếng Trung HSK4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dav"}, {"id": "DOC-1119", "code": "SUB929", "baseName": "Đánh Giá Trong Giáo Dục (Sơ Đồ Tư Duy)", "category": "Sư phạm", "icon": "", "gradient": "from-emerald-950 via-blue-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 46, "rating": 4.8, "reviewsCount": 79, "downloads": "3.2k+", "price": 50000, "originalPrice": 130000, "badge": "Best Seller", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Đánh Giá Trong Giáo Dục cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hlu"}, {"id": "DOC-1120", "code": "SUB202", "baseName": "Tiếng Hàn TOPIK (Sơ Đồ Tư Duy)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-amber-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 48, "rating": 4.8, "reviewsCount": 135, "downloads": "1.1k+", "price": 50000, "originalPrice": 125000, "badge": "Chuẩn Giáo Trình", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Tiếng Hàn TOPIK cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ussh"}, {"id": "DOC-1121", "code": "SUB420", "baseName": "Tiếng Hàn TOPIK (Tóm Tắt Ngắn Gọn)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-rose-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 52, "rating": 4.7, "reviewsCount": 143, "downloads": "1.4k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 99%", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Tiếng Hàn TOPIK cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hcmue"}, {"id": "DOC-1122", "code": "SUB473", "baseName": "Tiếng Trung HSK4 (Full Đáp Án)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-slate-950 via-purple-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 52, "rating": 4.6, "reviewsCount": 80, "downloads": "4.0k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 99%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Tiếng Trung HSK4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "huflit"}, {"id": "DOC-1123", "code": "SUB170", "baseName": "Địa Lý Du Lịch (Tóm Tắt Ngắn Gọn)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-teal-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 24, "rating": 4.7, "reviewsCount": 161, "downloads": "2.2k+", "price": 50000, "originalPrice": 140000, "badge": "Trúng Tủ 99%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dnu"}, {"id": "DOC-1124", "code": "SUB762", "baseName": "Quản Trị Học (Tóm Tắt Ngắn Gọn)", "category": "Quản trị", "icon": "", "gradient": "from-emerald-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 52, "rating": 4.6, "reviewsCount": 65, "downloads": "2.2k+", "price": 50000, "originalPrice": 135000, "badge": "Có Đáp Án Case", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Quản Trị Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dnu"}, {"id": "DOC-1125", "code": "SUB876", "baseName": "Quản Trị Marketing (Chi Tiết Phụ)", "category": "Quản trị", "icon": "", "gradient": "from-cyan-950 via-slate-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 26, "rating": 4.8, "reviewsCount": 62, "downloads": "2.7k+", "price": 50000, "originalPrice": 150000, "badge": "Có Đáp Án Case", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Quản Trị Marketing cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hutech"}, {"id": "DOC-1126", "code": "SUB375", "baseName": "Luật Dân Sự (Đề Thi Cuối Kỳ)", "category": "Luật", "icon": "", "gradient": "from-slate-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 36, "rating": 4.9, "reviewsCount": 77, "downloads": "3.6k+", "price": 50000, "originalPrice": 95000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Luật Dân Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dnu"}, {"id": "DOC-1127", "code": "SUB826", "baseName": "Tiếng Anh Chuyên Ngành (Sơ Đồ Tư Duy)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-rose-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 30, "rating": 4.8, "reviewsCount": 171, "downloads": "3.2k+", "price": 50000, "originalPrice": 135000, "badge": "Trúng Tủ 99%", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Tiếng Anh Chuyên Ngành cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "vanlang"}, {"id": "DOC-1128", "code": "SUB208", "baseName": "Quản Trị Chiến Lược (Đề Thi Cuối Kỳ)", "category": "Quản trị", "icon": "", "gradient": "from-slate-950 via-teal-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 38, "rating": 4.8, "reviewsCount": 55, "downloads": "3.4k+", "price": 50000, "originalPrice": 125000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Quản Trị Chiến Lược cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hou"}, {"id": "DOC-1129", "code": "SUB631", "baseName": "Mạng Máy Tính (Tóm Tắt Ngắn Gọn)", "category": "Công nghệ", "icon": "", "gradient": "from-slate-950 via-slate-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 28, "rating": 4.9, "reviewsCount": 145, "downloads": "2.2k+", "price": 50000, "originalPrice": 110000, "badge": "Code & Lời Giải", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Mạng Máy Tính cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "bkhn"}, {"id": "DOC-1130", "code": "SUB432", "baseName": "An Toàn Thông Tin (Trắc Nghiệm & Tự Luận)", "category": "Công nghệ", "icon": "", "gradient": "from-rose-950 via-slate-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 44, "rating": 4.8, "reviewsCount": 149, "downloads": "3.6k+", "price": 50000, "originalPrice": 95000, "badge": "Code & Lời Giải", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu An Toàn Thông Tin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "uet"}, {"id": "DOC-1131", "code": "SUB376", "baseName": "Kinh Tế Chính Trị Mác - Lênin (Chi Tiết Phụ)", "category": "Đại cương", "icon": "", "gradient": "from-rose-950 via-slate-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 28, "rating": 4.6, "reviewsCount": 38, "downloads": "2.9k+", "price": 50000, "originalPrice": 115000, "badge": "Code & Lời Giải", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Kinh Tế Chính Trị Mác - Lênin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "neu"}, {"id": "DOC-1132", "code": "SUB177", "baseName": "Tin Học Đại Cương (Chi Tiết Phụ)", "category": "Công nghệ", "icon": "", "gradient": "from-purple-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 28, "rating": 4.7, "reviewsCount": 126, "downloads": "3.3k+", "price": 50000, "originalPrice": 135000, "badge": "Có Đáp Án Case", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Tin Học Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ptit"}, {"id": "DOC-1133", "code": "SUB701", "baseName": "Giáo Dục Học (Tóm Tắt Ngắn Gọn)", "category": "Sư phạm", "icon": "", "gradient": "from-blue-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 48, "rating": 4.9, "reviewsCount": 52, "downloads": "2.4k+", "price": 50000, "originalPrice": 115000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Giáo Dục Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "neu"}, {"id": "DOC-1134", "code": "SUB841", "baseName": "Luật Dân Sự (Sơ Đồ Tư Duy)", "category": "Luật", "icon": "", "gradient": "from-rose-950 via-blue-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 20, "rating": 4.8, "reviewsCount": 150, "downloads": "1.0k+", "price": 50000, "originalPrice": 150000, "badge": "Có Đáp Án Case", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Luật Dân Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ftu"}, {"id": "DOC-1135", "code": "SUB555", "baseName": "Tiếng Anh Chuyên Ngành (Full Đáp Án)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-teal-950 via-slate-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 38, "rating": 4.6, "reviewsCount": 85, "downloads": "2.9k+", "price": 50000, "originalPrice": 120000, "badge": "Có Đáp Án Case", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Tiếng Anh Chuyên Ngành cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "thanglong"}, {"id": "DOC-1136", "code": "SUB775", "baseName": "Luật Dân Sự (Full Đáp Án)", "category": "Luật", "icon": "", "gradient": "from-amber-950 via-slate-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 26, "rating": 4.8, "reviewsCount": 46, "downloads": "3.9k+", "price": 50000, "originalPrice": 115000, "badge": "Code & Lời Giải", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Luật Dân Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ba"}, {"id": "DOC-1137", "code": "SUB703", "baseName": "Quản Trị Nhân Lực (Tóm Tắt Ngắn Gọn)", "category": "Quản trị", "icon": "", "gradient": "from-rose-950 via-slate-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 24, "rating": 4.8, "reviewsCount": 89, "downloads": "2.1k+", "price": 50000, "originalPrice": 95000, "badge": "Đề Mới 2026", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Quản Trị Nhân Lực cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "bkhn"}, {"id": "DOC-1138", "code": "SUB504", "baseName": "Tiếng Nhật N3/N4 (Đề Thi Cuối Kỳ)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-indigo-950 via-teal-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 32, "rating": 4.9, "reviewsCount": 98, "downloads": "2.5k+", "price": 50000, "originalPrice": 140000, "badge": "Chuẩn Giáo Trình", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dnu"}, {"id": "DOC-1139", "code": "SUB596", "baseName": "Tiếng Nhật N3/N4 (Tóm Tắt Ngắn Gọn)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-amber-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 34, "rating": 4.9, "reviewsCount": 176, "downloads": "4.7k+", "price": 50000, "originalPrice": 130000, "badge": "Đề Mới 2026", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "neu"}, {"id": "DOC-1140", "code": "SUB284", "baseName": "Địa Lý Du Lịch (Sơ Đồ Tư Duy)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-cyan-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 38, "rating": 4.9, "reviewsCount": 178, "downloads": "2.6k+", "price": 50000, "originalPrice": 95000, "badge": "Code & Lời Giải", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hoasen"}, {"id": "DOC-1141", "code": "SUB440", "baseName": "Địa Lý Du Lịch (Full Đáp Án)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-teal-950 via-amber-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 22, "rating": 4.7, "reviewsCount": 51, "downloads": "4.5k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Giáo Trình", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "neu"}, {"id": "DOC-1142", "code": "SUB356", "baseName": "Tiếng Trung HSK4 (Đề Thi Cuối Kỳ)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-blue-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 48, "rating": 4.7, "reviewsCount": 59, "downloads": "1.2k+", "price": 50000, "originalPrice": 130000, "badge": "Best Seller", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Tiếng Trung HSK4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ufm"}, {"id": "DOC-1143", "code": "SUB757", "baseName": "Kế Toán Tài Chính (Sơ Đồ Tư Duy)", "category": "Kinh tế", "icon": "", "gradient": "from-slate-950 via-teal-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 24, "rating": 4.9, "reviewsCount": 70, "downloads": "4.3k+", "price": 50000, "originalPrice": 130000, "badge": "Chuẩn Giáo Trình", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Kế Toán Tài Chính cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "due"}, {"id": "DOC-1144", "code": "SUB441", "baseName": "Giáo Dục Học (Trắc Nghiệm & Tự Luận)", "category": "Sư phạm", "icon": "", "gradient": "from-cyan-950 via-purple-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 36, "rating": 4.8, "reviewsCount": 50, "downloads": "2.3k+", "price": 50000, "originalPrice": 110000, "badge": "Đề Mới 2026", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Giáo Dục Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hcmue"}, {"id": "DOC-1145", "code": "SUB309", "baseName": "Tổng Quan Du Lịch (Sơ Đồ Tư Duy)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-rose-950 via-amber-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 38, "rating": 4.8, "reviewsCount": 79, "downloads": "4.0k+", "price": 50000, "originalPrice": 115000, "badge": "Code & Lời Giải", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Tổng Quan Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ufm"}, {"id": "DOC-1146", "code": "SUB222", "baseName": "Luật Thương Mại Quốc Tế (Tóm Tắt Ngắn Gọn)", "category": "Luật", "icon": "", "gradient": "from-purple-950 via-blue-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 34, "rating": 4.9, "reviewsCount": 179, "downloads": "2.7k+", "price": 50000, "originalPrice": 125000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tcnh_hn"}, {"id": "DOC-1147", "code": "SUB213", "baseName": "Luật Hình Sự (Đề Thi Cuối Kỳ)", "category": "Luật", "icon": "", "gradient": "from-purple-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 36, "rating": 4.8, "reviewsCount": 96, "downloads": "5.0k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 99%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Luật Hình Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hlu"}, {"id": "DOC-1148", "code": "SUB436", "baseName": "Luật Dân Sự (Đề Thi Cuối Kỳ)", "category": "Luật", "icon": "", "gradient": "from-slate-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 34, "rating": 4.7, "reviewsCount": 181, "downloads": "2.2k+", "price": 50000, "originalPrice": 130000, "badge": "Có Đáp Án Case", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Luật Dân Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "uel"}, {"id": "DOC-1149", "code": "SUB165", "baseName": "Kinh Tế Chính Trị Mác - Lênin (Trắc Nghiệm & Tự Luận)", "category": "Đại cương", "icon": "", "gradient": "from-rose-950 via-slate-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 20, "rating": 4.6, "reviewsCount": 145, "downloads": "3.2k+", "price": 50000, "originalPrice": 95000, "badge": "Trúng Tủ 98%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Kinh Tế Chính Trị Mác - Lênin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "bkhn"}, {"id": "DOC-1150", "code": "SUB868", "baseName": "Nghiệp Vụ Hướng Dẫn (Tóm Tắt Ngắn Gọn)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-blue-950 via-teal-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 32, "rating": 4.9, "reviewsCount": 128, "downloads": "3.5k+", "price": 50000, "originalPrice": 125000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Nghiệp Vụ Hướng Dẫn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tmu"}, {"id": "DOC-1151", "code": "SUB807", "baseName": "Tin Học Đại Cương (Đề Thi Cuối Kỳ)", "category": "Công nghệ", "icon": "", "gradient": "from-emerald-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 38, "rating": 4.7, "reviewsCount": 46, "downloads": "4.6k+", "price": 50000, "originalPrice": 140000, "badge": "Code & Lời Giải", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Tin Học Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "thanglong"}, {"id": "DOC-1152", "code": "SUB281", "baseName": "Địa Lý Du Lịch (Tóm Tắt Ngắn Gọn)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-purple-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 46, "rating": 4.9, "reviewsCount": 125, "downloads": "4.9k+", "price": 50000, "originalPrice": 140000, "badge": "Có Đáp Án Case", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ussh"}, {"id": "DOC-1153", "code": "SUB849", "baseName": "Tiếng Anh Thương Mại (Full Đáp Án)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-indigo-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 20, "rating": 5.0, "reviewsCount": 131, "downloads": "1.5k+", "price": 50000, "originalPrice": 100000, "badge": "Best Seller", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Tiếng Anh Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ulis"}, {"id": "DOC-1154", "code": "SUB397", "baseName": "Tài Chính Tiền Tệ (Sơ Đồ Tư Duy)", "category": "Kinh tế", "icon": "", "gradient": "from-blue-950 via-slate-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 28, "rating": 4.6, "reviewsCount": 177, "downloads": "1.2k+", "price": 50000, "originalPrice": 110000, "badge": "Có Đáp Án Case", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Tài Chính Tiền Tệ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hce"}, {"id": "DOC-1155", "code": "SUB337", "baseName": "Luật Kinh Tế (Trắc Nghiệm & Tự Luận)", "category": "Luật", "icon": "", "gradient": "from-cyan-950 via-rose-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 46, "rating": 4.6, "reviewsCount": 41, "downloads": "1.9k+", "price": 50000, "originalPrice": 115000, "badge": "Best Seller", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "neu"}, {"id": "DOC-1156", "code": "SUB721", "baseName": "Marketing Quốc Tế (Đề Thi Cuối Kỳ)", "category": "Quản trị", "icon": "", "gradient": "from-teal-950 via-slate-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 24, "rating": 4.7, "reviewsCount": 87, "downloads": "4.1k+", "price": 50000, "originalPrice": 135000, "badge": "Có Đáp Án Case", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Marketing Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "eaut"}, {"id": "DOC-1157", "code": "SUB320", "baseName": "Kinh Tế Vi Mô 1 & 2 (Sơ Đồ Tư Duy)", "category": "Kinh tế", "icon": "", "gradient": "from-amber-950 via-slate-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 24, "rating": 4.7, "reviewsCount": 129, "downloads": "4.7k+", "price": 50000, "originalPrice": 135000, "badge": "Code & Lời Giải", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Kinh Tế Vi Mô 1 & 2 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "neu"}, {"id": "DOC-1158", "code": "SUB911", "baseName": "Nghiệp Vụ Hướng Dẫn (Trắc Nghiệm & Tự Luận)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-purple-950 via-blue-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 20, "rating": 4.6, "reviewsCount": 83, "downloads": "2.4k+", "price": 50000, "originalPrice": 120000, "badge": "Có Đáp Án Case", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Nghiệp Vụ Hướng Dẫn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ntu"}, {"id": "DOC-1159", "code": "SUB771", "baseName": "Cơ Sở Dữ Liệu (Chi Tiết Phụ)", "category": "Công nghệ", "icon": "", "gradient": "from-purple-950 via-slate-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 52, "rating": 4.8, "reviewsCount": 111, "downloads": "4.6k+", "price": 50000, "originalPrice": 125000, "badge": "Code & Lời Giải", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Cơ Sở Dữ Liệu cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hutech"}, {"id": "DOC-1160", "code": "SUB380", "baseName": "Toán Cao Cấp 1 & 2 (Tóm Tắt Ngắn Gọn)", "category": "Đại cương", "icon": "", "gradient": "from-cyan-950 via-teal-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 48, "rating": 4.8, "reviewsCount": 75, "downloads": "3.0k+", "price": 50000, "originalPrice": 95000, "badge": "Code & Lời Giải", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Toán Cao Cấp 1 & 2 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ftu"}, {"id": "DOC-1161", "code": "SUB123", "baseName": "Kinh Tế Phát Triển (Sơ Đồ Tư Duy)", "category": "Kinh tế", "icon": "", "gradient": "from-purple-950 via-blue-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 26, "rating": 4.9, "reviewsCount": 35, "downloads": "3.8k+", "price": 50000, "originalPrice": 150000, "badge": "Code & Lời Giải", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Kinh Tế Phát Triển cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ftu"}, {"id": "DOC-1162", "code": "SUB813", "baseName": "An Toàn Thông Tin (Tóm Tắt Ngắn Gọn)", "category": "Công nghệ", "icon": "", "gradient": "from-teal-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 38, "rating": 4.9, "reviewsCount": 173, "downloads": "1.3k+", "price": 50000, "originalPrice": 95000, "badge": "Có Đáp Án Case", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu An Toàn Thông Tin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "vanlang"}, {"id": "DOC-1163", "code": "SUB210", "baseName": "Giáo Dục Học (Đề Thi Cuối Kỳ)", "category": "Sư phạm", "icon": "", "gradient": "from-purple-950 via-purple-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 46, "rating": 4.9, "reviewsCount": 151, "downloads": "1.3k+", "price": 50000, "originalPrice": 110000, "badge": "Đề Mới 2026", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Giáo Dục Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ued"}, {"id": "DOC-1164", "code": "SUB326", "baseName": "Phương Pháp Giảng Dạy (Chi Tiết Phụ)", "category": "Sư phạm", "icon": "", "gradient": "from-blue-950 via-emerald-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 52, "rating": 4.7, "reviewsCount": 84, "downloads": "3.8k+", "price": 50000, "originalPrice": 125000, "badge": "Trúng Tủ 99%", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dhhp"}, {"id": "DOC-1165", "code": "SUB308", "baseName": "Tâm Lý Học Đại Cương (Tóm Tắt Ngắn Gọn)", "category": "Đại cương", "icon": "", "gradient": "from-blue-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 38, "rating": 5.0, "reviewsCount": 154, "downloads": "3.1k+", "price": 50000, "originalPrice": 125000, "badge": "Best Seller", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Tâm Lý Học Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tmu"}, {"id": "DOC-1166", "code": "SUB867", "baseName": "Tiếng Anh Chuyên Ngành (Full Đáp Án)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-indigo-950 via-purple-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 44, "rating": 4.9, "reviewsCount": 74, "downloads": "3.8k+", "price": 50000, "originalPrice": 100000, "badge": "Trúng Tủ 98%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Tiếng Anh Chuyên Ngành cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ftu"}, {"id": "DOC-1167", "code": "SUB577", "baseName": "Luật Kinh Tế (Full Đáp Án)", "category": "Luật", "icon": "", "gradient": "from-slate-950 via-teal-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 34, "rating": 5.0, "reviewsCount": 94, "downloads": "1.7k+", "price": 50000, "originalPrice": 100000, "badge": "Code & Lời Giải", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ftu"}, {"id": "DOC-1168", "code": "SUB639", "baseName": "Phương Pháp Giảng Dạy (Trắc Nghiệm & Tự Luận)", "category": "Sư phạm", "icon": "", "gradient": "from-slate-950 via-rose-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 40, "rating": 4.7, "reviewsCount": 93, "downloads": "4.9k+", "price": 50000, "originalPrice": 95000, "badge": "Best Seller", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hongduc"}, {"id": "DOC-1169", "code": "SUB411", "baseName": "Giáo Dục Học (Full Đáp Án)", "category": "Sư phạm", "icon": "", "gradient": "from-emerald-950 via-slate-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 22, "rating": 4.8, "reviewsCount": 179, "downloads": "4.2k+", "price": 50000, "originalPrice": 130000, "badge": "Có Đáp Án Case", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Giáo Dục Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "vinhuni"}, {"id": "DOC-1170", "code": "SUB408", "baseName": "Quản Trị Khách Sạn (Sơ Đồ Tư Duy)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-indigo-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 30, "rating": 4.8, "reviewsCount": 55, "downloads": "3.3k+", "price": 50000, "originalPrice": 120000, "badge": "Có Đáp Án Case", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Quản Trị Khách Sạn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "vanlang"}, {"id": "DOC-1171", "code": "SUB789", "baseName": "Thương Mại Điện Tử (Full Đáp Án)", "category": "Quản trị", "icon": "", "gradient": "from-slate-950 via-blue-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 34, "rating": 5.0, "reviewsCount": 75, "downloads": "2.1k+", "price": 50000, "originalPrice": 140000, "badge": "Best Seller", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Thương Mại Điện Tử cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tmu"}, {"id": "DOC-1172", "code": "SUB261", "baseName": "Địa Lý Du Lịch (Tóm Tắt Ngắn Gọn)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-emerald-950 via-slate-950 to-[#0A143D]", "accentColor": "text-emerald-300", "pages": 44, "rating": 4.8, "reviewsCount": 153, "downloads": "2.7k+", "price": 50000, "originalPrice": 125000, "badge": "Chuẩn Giáo Trình", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hutech"}, {"id": "DOC-1173", "code": "SUB889", "baseName": "Quản Trị Chuỗi Cung Ứng (Tóm Tắt Ngắn Gọn)", "category": "Quản trị", "icon": "", "gradient": "from-blue-950 via-indigo-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 44, "rating": 4.9, "reviewsCount": 167, "downloads": "2.9k+", "price": 50000, "originalPrice": 100000, "badge": "Code & Lời Giải", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Quản Trị Chuỗi Cung Ứng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ueh"}, {"id": "DOC-1174", "code": "SUB982", "baseName": "Marketing Quốc Tế (Full Đáp Án)", "category": "Quản trị", "icon": "", "gradient": "from-indigo-950 via-amber-950 to-[#0A143D]", "accentColor": "text-indigo-300", "pages": 38, "rating": 5.0, "reviewsCount": 115, "downloads": "2.6k+", "price": 50000, "originalPrice": 110000, "badge": "Best Seller", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Marketing Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ufm"}, {"id": "DOC-1175", "code": "SUB790", "baseName": "Quản Trị Chuỗi Cung Ứng (Tóm Tắt Ngắn Gọn)", "category": "Quản trị", "icon": "", "gradient": "from-slate-950 via-amber-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 24, "rating": 4.6, "reviewsCount": 56, "downloads": "2.9k+", "price": 50000, "originalPrice": 125000, "badge": "Đề Mới 2026", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Quản Trị Chuỗi Cung Ứng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "thanglong"}, {"id": "DOC-1176", "code": "SUB164", "baseName": "Tiếng Anh Thương Mại (Tóm Tắt Ngắn Gọn)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-amber-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 22, "rating": 4.7, "reviewsCount": 72, "downloads": "2.2k+", "price": 50000, "originalPrice": 115000, "badge": "Chuẩn Giáo Trình", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Tiếng Anh Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dav"}, {"id": "DOC-1177", "code": "SUB295", "baseName": "Tiếng Nhật N3/N4 (Tóm Tắt Ngắn Gọn)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-rose-950 via-amber-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 22, "rating": 4.8, "reviewsCount": 75, "downloads": "4.6k+", "price": 50000, "originalPrice": 140000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ussh"}, {"id": "DOC-1178", "code": "SUB569", "baseName": "Quản Trị Chiến Lược (Đề Thi Cuối Kỳ)", "category": "Quản trị", "icon": "", "gradient": "from-blue-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 28, "rating": 4.8, "reviewsCount": 46, "downloads": "2.1k+", "price": 50000, "originalPrice": 100000, "badge": "Trúng Tủ 99%", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Quản Trị Chiến Lược cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dnu"}, {"id": "DOC-1179", "code": "SUB228", "baseName": "Pháp Luật Đại Cương (Full Đáp Án)", "category": "Đại cương", "icon": "", "gradient": "from-amber-950 via-amber-950 to-[#0A143D]", "accentColor": "text-amber-300", "pages": 22, "rating": 4.7, "reviewsCount": 90, "downloads": "2.1k+", "price": 50000, "originalPrice": 140000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Pháp Luật Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hvtc"}, {"id": "DOC-1180", "code": "SUB296", "baseName": "Toán Cao Cấp 1 & 2 (Đề Thi Cuối Kỳ)", "category": "Đại cương", "icon": "", "gradient": "from-cyan-950 via-slate-950 to-[#0A143D]", "accentColor": "text-cyan-300", "pages": 38, "rating": 4.9, "reviewsCount": 157, "downloads": "3.8k+", "price": 50000, "originalPrice": 150000, "badge": "Best Seller", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Toán Cao Cấp 1 & 2 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ueh"}, {"id": "DOC-1181", "code": "SUB610", "baseName": "Lập Trình Python (Trắc Nghiệm & Tự Luận)", "category": "Công nghệ", "icon": "", "gradient": "from-blue-950 via-amber-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 40, "rating": 4.8, "reviewsCount": 95, "downloads": "4.2k+", "price": 50000, "originalPrice": 125000, "badge": "Code & Lời Giải", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Lập Trình Python cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "eaut"}, {"id": "DOC-1182", "code": "SUB559", "baseName": "Tổng Quan Du Lịch (Trắc Nghiệm & Tự Luận)", "category": "Du lịch & Khách sạn", "icon": "", "gradient": "from-rose-950 via-cyan-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 34, "rating": 4.7, "reviewsCount": 34, "downloads": "1.5k+", "price": 50000, "originalPrice": 110000, "badge": "Code & Lời Giải", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Tổng Quan Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hou"}, {"id": "DOC-1183", "code": "SUB877", "baseName": "Luật Hình Sự (Đề Thi Cuối Kỳ)", "category": "Luật", "icon": "", "gradient": "from-purple-950 via-amber-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 22, "rating": 4.6, "reviewsCount": 159, "downloads": "4.5k+", "price": 50000, "originalPrice": 110000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Ngân Hàng Câu Hỏi Ôn Thi", "Đáp Án Chuẩn Giáo Trình"], "description": "Tài liệu Luật Hình Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "tmu"}, {"id": "DOC-1184", "code": "SUB235", "baseName": "Tiếng Hàn TOPIK (Chi Tiết Phụ)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-teal-950 via-purple-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 36, "rating": 4.7, "reviewsCount": 90, "downloads": "3.3k+", "price": 50000, "originalPrice": 140000, "badge": "Học 1 Lần Nhớ Mãi", "tags": ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án Chi Tiết"], "description": "Tài liệu Tiếng Hàn TOPIK cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hcmue"}, {"id": "DOC-1185", "code": "SUB563", "baseName": "Giáo Dục Học (Chi Tiết Phụ)", "category": "Sư phạm", "icon": "", "gradient": "from-teal-950 via-amber-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 20, "rating": 4.8, "reviewsCount": 46, "downloads": "3.3k+", "price": 50000, "originalPrice": 130000, "badge": "Code & Lời Giải", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Giáo Dục Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "uel"}, {"id": "DOC-1186", "code": "SUB109", "baseName": "Bảo Hiểm (Đề Thi Cuối Kỳ)", "category": "Kinh tế", "icon": "", "gradient": "from-purple-950 via-rose-950 to-[#0A143D]", "accentColor": "text-purple-300", "pages": 22, "rating": 4.8, "reviewsCount": 137, "downloads": "4.9k+", "price": 50000, "originalPrice": 120000, "badge": "Best Seller", "tags": ["Trắc Nghiệm Có Giải Thích", "Đề Thi Thật Các Năm"], "description": "Tài liệu Bảo Hiểm cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hutech"}, {"id": "DOC-1187", "code": "SUB785", "baseName": "Kinh Tế Chính Trị Mác - Lênin (Chi Tiết Phụ)", "category": "Đại cương", "icon": "", "gradient": "from-blue-950 via-blue-950 to-[#0A143D]", "accentColor": "text-blue-300", "pages": 22, "rating": 4.8, "reviewsCount": 82, "downloads": "3.8k+", "price": 50000, "originalPrice": 130000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Kinh Tế Chính Trị Mác - Lênin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "ba"}, {"id": "DOC-1188", "code": "SUB423", "baseName": "Chủ Nghĩa Xã Hội Khoa Học (Full Đáp Án)", "category": "Đại cương", "icon": "", "gradient": "from-teal-950 via-rose-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 20, "rating": 4.9, "reviewsCount": 175, "downloads": "2.1k+", "price": 50000, "originalPrice": 150000, "badge": "Đề Mới 2026", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Chủ Nghĩa Xã Hội Khoa Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dav"}, {"id": "DOC-1189", "code": "SUB931", "baseName": "Tiếng Anh Thương Mại (Đề Thi Cuối Kỳ)", "category": "Ngoại ngữ", "icon": "", "gradient": "from-slate-950 via-purple-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 24, "rating": 4.6, "reviewsCount": 76, "downloads": "2.4k+", "price": 50000, "originalPrice": 100000, "badge": "Chuẩn Giáo Trình", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Tiếng Anh Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "huflit"}, {"id": "DOC-1190", "code": "SUB261", "baseName": "Luật Hình Sự (Tóm Tắt Ngắn Gọn)", "category": "Luật", "icon": "", "gradient": "from-teal-950 via-teal-950 to-[#0A143D]", "accentColor": "text-teal-300", "pages": 28, "rating": 4.6, "reviewsCount": 164, "downloads": "1.9k+", "price": 50000, "originalPrice": 130000, "badge": "Đầy Đủ Đồ Thị", "tags": ["Công Thức & Dạng Bài Tập", "Hướng Dẫn Giải Nhanh"], "description": "Tài liệu Luật Hình Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "hou"}, {"id": "DOC-1191", "code": "SUB867", "baseName": "Lập Trình C/C++ (Full Đáp Án)", "category": "Công nghệ", "icon": "", "gradient": "from-slate-950 via-purple-950 to-[#0A143D]", "accentColor": "text-slate-300", "pages": 28, "rating": 4.7, "reviewsCount": 158, "downloads": "1.2k+", "price": 50000, "originalPrice": 110000, "badge": "Có Đáp Án Case", "tags": ["Hệ Thống Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"], "description": "Tài liệu Lập Trình C/C++ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "phenikaa"}, {"id": "DOC-1192", "code": "SUB482", "baseName": "Luật Kinh Tế (Chi Tiết Phụ)", "category": "Luật", "icon": "", "gradient": "from-rose-950 via-slate-950 to-[#0A143D]", "accentColor": "text-rose-300", "pages": 32, "rating": 4.9, "reviewsCount": 80, "downloads": "1.4k+", "price": 50000, "originalPrice": 115000, "badge": "Trúng Tủ 99%", "tags": ["Câu Hỏi Tự Luận & Vấn Đáp", "Bám Sát Đề Thi Cuối Kỳ"], "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.", "university": "dnu"}];
const COURSE_CATEGORIES = [
{
"id": "all",
"name": "Tất cả",
"label": "Tất cả"
},
{
"id": "ngoai_ngu_khxh",
"name": "Văn · Sử · Địa · Anh · Trung",
"label": "Văn · Sử · Địa · Anh · Trung"
},
{
"id": "khtn_toan_ly_hoa_sinh",
"name": "Toán · Lý · Hóa · Sinh",
"label": "Toán · Lý · Hóa · Sinh"
},
{
"id": "tinhoc_daihoc",
"name": "Tin Học · MOS · Đại Học",
"label": "Tin Học · MOS · Đại Học"
},
{
"id": "nghe_thuat",
"name": "Nghệ Thuật & Âm Nhạc",
"label": "Nghệ Thuật & Âm Nhạc"
},
{
"id": "lop12_2k9",
"name": "Lớp 12 (2K9)",
"label": "Lớp 12 (2K9)"
},
{
"id": "lop11_2k10",
"name": "Lớp 11 (2K10)",
"label": "Lớp 11 (2K10)"
},
{
"id": "dgnl_hsa",
"name": "ĐGNL HSA",
"label": "ĐGNL HSA"
},
{
"id": "dgtd_tsa",
"name": "ĐGTD TSA",
"label": "ĐGTD TSA"
},
{
"id": "dgnl_vact_bca",
"name": "V-ACT · BCA · QDA · VSAT",
"label": "V-ACT · BCA · QDA · VSAT"
}
];
const COURSES_DATABASE = [{"id": "ALL-COURSES-399K", "sku": "DVFULL399", "code": "DVFULL399", "category": "all", "categories": ["all", "khtn_toan_ly_hoa_sinh", "ngoai_ngu_khxh", "lop12_2k9", "dgnl_hsa", "dgtd_tsa", "dgnl_vact_bca"], "subCategory": "lop12_2k9", "categoryLabel": "VIP Full Trọn Bộ 399K", "title": "Gói VIP Full Trọn Bộ 37 Khóa Học & Luyện Đề 2027 (69K + 199K)", "instructor": "TOÀN BỘ HỆ THỐNG KHÓA HỌC ĐIỆP VIÊN STUDY", "duration": "Mở khóa 100% + tự động hưởng mọi cập nhật về sau", "lessons": 1500, "level": "Full Toàn Hệ Thống 2027", "groupName": "VIP Full 399K · Mở Khóa Tất Cả", "rating": 5.0, "students": "4.9k+", "price": 399000, "originalPrice": 2500000, "singlePrice": 69000, "coursePrice": 399000, "tier": "full_399k", "tierType": "full_399k", "subTier": "full_399k", "isPackageOnly": true, "tierShortBadge": "FULL TRỌN BỘ 399K", "tierLabel": "Full Trọn Bộ + Update (399K)", "badge": "VIP Full 399K", "parentCourseId": "ALL-COURSES-399K", "parentSubjectId": "ALL-COURSES-399K", "childCourseIds": ["C199-KHTN1", "C199-KHTN2", "C199-KHXH1", "C199-KHXH2", "C199-HSA", "C199-TSA", "C199-VACT", "K69-TOAN-DUC", "K69-TOAN-TIEN", "K69-TOAN-SHIPPER", "K69-TOAN-MAP", "K69-TOAN-NT", "K69-LY-BIEN", "K69-LY-TIEN", "K69-LY-UNG", "K69-HOA-TRONG", "K69-HOA-NGOC", "K69-VAN-SM", "K69-VAN-NT", "K69-ANH-MP", "K69-ANH-LIEU", "K69-ANH-NT", "K69-SINH-NGHE", "K69-SINH-DUONG", "K69-SU-HUONG", "K69-SU-SEN", "K69-DIA-TUNG", "K69-DIA-TAI", "K69-HSA-HOCMAI", "K69-HSA-MAP", "K69-HSA-EMPIRE", "K69-HSA-EDU", "K69-TSA-BMC", "K69-TSA-HOCMAI", "K69-VACT-HOCMAI", "K69-VACT-EMPIRE", "K69-VACT-MAP"], "extraFolderIds": ["1ZlYt4iot-K6d0fZTb7hGwwnRgUV6Pdwh"], "bannerId": "", "defaultCover": "", "cover": "", "fallbackCover": "", "driveFolderId": "1xEi1TWFZKLTBBp4tJVXoOv9XB9qNUo_a", "driveFolderName": "Full Kho 69K + Kho 199K (Tự Động Update)", "driveFolderUrl": "https://drive.google.com/drive/folders/1xEi1TWFZKLTBBp4tJVXoOv9XB9qNUo_a", "driveUrl": "https://drive.google.com/drive/folders/1xEi1TWFZKLTBBp4tJVXoOv9XB9qNUo_a", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa toàn bộ 100% khóa học lẻ 69K, 7 Combo 199K (KHTN 1, KHTN 2, KHXH 1, KHXH 2, HSA, TSA, V-ACT) + tự động cập nhật về sau.", "description": "Mở khóa toàn bộ 2 kho gốc + mọi cập nhật mới về sau + Tặng kèm App Điệp Viên Study (Email + SĐT).", "highlights": ["Mở khóa 100% toàn bộ khóa 69K & Combo 199K", "Tự động nhận toàn bộ cập nhật mới về sau", "Đồng bộ học trực tiếp trên Web, App & Google Drive"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Full Hệ Thống", "lessons": [{"id": "ALL-COURSES-399K-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Full Hệ Thống", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: Điệp Viên Study", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Full Trọn Bộ 399K."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "ALL-COURSES-399K-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "C199-KHTN1", "sku": "DV199KHTN1", "code": "DV199KHTN1", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Ban KHTN 1 (Toán · Vật Lý · Sinh)", "title": "Combo Ban KHTN 1 — Toán, Vật Lý, Sinh", "instructor": "THẦY ĐỖ VĂN ĐỨC · THẦY CHU VĂN BIÊN · THẦY PHAN KHẮC NGHỆ", "duration": "Combo 3 khóa tuyển chọn (1 thầy/môn) · Video HD + PDF", "lessons": 360, "level": "COMBO BAN 199K · Combo Ban KHTN 1 — Toán, Vật Lý, Sinh", "groupName": "COMBO BAN 199K · Combo Ban KHTN 1 — Toán, Vật Lý, Sinh", "rating": 5.0, "students": "1.9k+", "price": 199000, "originalPrice": 399000, "singlePrice": 69000, "coursePrice": 199000, "tier": "course_199k", "tierType": "course_199k", "subTier": "combo_199k", "isPackageOnly": false, "tierShortBadge": "COMBO 199K", "tierLabel": "COMBO BAN 199K", "badge": "199K · Ban KHTN 1 (Toán · Vật Lý · Sinh)", "parentCourseId": "C199-KHTN1", "parentSubjectId": "K69-TOAN-DUC", "childCourseIds": ["K69-TOAN-DUC", "K69-LY-BIEN", "K69-SINH-NGHE"], "extraFolderIds": ["1UxEYANVp1iw9Us0mSNJR8w9_VFhsx3MP", "1m__F2exCz50iNJXhf0JR4TramO29K244"], "bannerId": "1SbkCdDoJ-EiGDXSq5WFpC8V8rdiKPGmW", "defaultCover": "https://lh3.googleusercontent.com/d/1SbkCdDoJ-EiGDXSq5WFpC8V8rdiKPGmW=w960", "cover": "https://lh3.googleusercontent.com/d/1SbkCdDoJ-EiGDXSq5WFpC8V8rdiKPGmW=w960", "fallbackCover": "", "driveFolderId": "1wH_RQNefQrFk0dTnVQroFsLCzTFZi4J7", "driveFolderName": "Combo 199K: KHTN 1 — Toán, Vật Lý, Sinh", "driveFolderUrl": "https://drive.google.com/drive/folders/1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo", "driveUrl": "https://drive.google.com/drive/folders/1wH_RQNefQrFk0dTnVQroFsLCzTFZi4J7", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Combo Ban Khoa Học Tự Nhiên 1 gồm đúng 3 thư mục thầy cô chọn lọc: Toán Thầy Đỗ Văn Đức + Vật Lý Thầy Chu Văn Biên + Sinh Học Thầy Phan Khắc Nghệ.", "description": "Combo Ban Khoa Học Tự Nhiên 1 gồm đúng 3 thư mục thầy cô chọn lọc: Toán Thầy Đỗ Văn Đức + Vật Lý Thầy Chu Văn Biên + Sinh Học Thầy Phan Khắc Nghệ.", "highlights": ["Gồm đúng 3 thư mục khóa học chọn lọc xếp chung trong 1 Thư Mục Combo 199K (Lối Tắt)", "Cấp quyền Google Drive riêng cho đúng Email mua hàng · Truy cập trực tiếp trên Google Drive & Hệ thống học tập"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Ban KHTN 1 (Toán · Vật Lý · Sinh)", "lessons": [{"id": "C199-KHTN1-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Ban KHTN 1 (Toán · Vật Lý · Sinh)", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY ĐỖ VĂN ĐỨC · THẦY CHU VĂN BIÊN · THẦY PHAN KHẮC NGHỆ", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Combo 199K: KHTN 1 — Toán, Vật Lý, Sinh."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "C199-KHTN1-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "C199-KHTN2", "sku": "DV199KHTN2", "code": "DV199KHTN2", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Ban KHTN 2 (Toán · Vật Lý · Anh)", "title": "Combo Ban KHTN 2 — Toán, Vật Lý, Tiếng Anh", "instructor": "THẦY ĐỖ VĂN ĐỨC · THẦY THẮNG TIẾN IPCLASS · CÔ VŨ MAI PHƯƠNG", "duration": "Combo 3 khóa tuyển chọn (1 thầy/môn) · Video HD + PDF", "lessons": 360, "level": "COMBO BAN 199K · Combo Ban KHTN 2 — Toán, Vật Lý, Tiếng Anh", "groupName": "COMBO BAN 199K · Combo Ban KHTN 2 — Toán, Vật Lý, Tiếng Anh", "rating": 5.0, "students": "1.9k+", "price": 199000, "originalPrice": 399000, "singlePrice": 69000, "coursePrice": 199000, "tier": "course_199k", "tierType": "course_199k", "subTier": "combo_199k", "isPackageOnly": false, "tierShortBadge": "COMBO 199K", "tierLabel": "COMBO BAN 199K", "badge": "199K · Ban KHTN 2 (Toán · Vật Lý · Anh)", "parentCourseId": "C199-KHTN2", "parentSubjectId": "K69-TOAN-DUC", "childCourseIds": ["K69-TOAN-DUC", "K69-LY-TIEN", "K69-ANH-MP"], "extraFolderIds": ["1Mz6IblP1vwlLKj9XKBAq4BFnKJBcwqSP", "1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1"], "bannerId": "1MoGqdKZUOHr6MtVgcQbJ-Ma3ykVQDppw", "defaultCover": "https://lh3.googleusercontent.com/d/1MoGqdKZUOHr6MtVgcQbJ-Ma3ykVQDppw=w960", "cover": "https://lh3.googleusercontent.com/d/1MoGqdKZUOHr6MtVgcQbJ-Ma3ykVQDppw=w960", "fallbackCover": "", "driveFolderId": "13E4qvYJg_AnJsmqDRceRvxqT7MdPPCe9", "driveFolderName": "Combo 199K: KHTN 2 — Toán, Vật Lý, Anh", "driveFolderUrl": "https://drive.google.com/drive/folders/1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo", "driveUrl": "https://drive.google.com/drive/folders/13E4qvYJg_AnJsmqDRceRvxqT7MdPPCe9", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Combo Ban Khoa Học Tự Nhiên 2 (Khối A01) gồm đúng 3 thư mục chọn lọc: Toán Thầy Đỗ Văn Đức + Vật Lý IPClass + Tiếng Anh Cô Vũ Mai Phương.", "description": "Combo Ban Khoa Học Tự Nhiên 2 (Khối A01) gồm đúng 3 thư mục chọn lọc: Toán Thầy Đỗ Văn Đức + Vật Lý IPClass + Tiếng Anh Cô Vũ Mai Phương.", "highlights": ["Gồm đúng 3 thư mục khóa học chọn lọc xếp chung trong 1 Thư Mục Combo 199K (Lối Tắt)", "Cấp quyền Google Drive riêng cho đúng Email mua hàng · Truy cập trực tiếp trên Google Drive & Hệ thống học tập"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Ban KHTN 2 (Toán · Vật Lý · Anh)", "lessons": [{"id": "C199-KHTN2-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Ban KHTN 2 (Toán · Vật Lý · Anh)", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY ĐỖ VĂN ĐỨC · THẦY THẮNG TIẾN IPCLASS · CÔ VŨ MAI PHƯƠNG", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Combo 199K: KHTN 2 — Toán, Vật Lý, Anh."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "C199-KHTN2-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "C199-KHXH1", "sku": "DV199KHXH1", "code": "DV199KHXH1", "category": "ngoai_ngu_khxh", "categories": ["all", "ngoai_ngu_khxh", "lop12_2k9"], "subCategory": "ngoai_ngu_khxh", "categoryLabel": "Ban KHXH 1 (Ngữ Văn · Lịch Sử · Địa Lý)", "title": "Combo Ban KHXH 1 — Ngữ Văn, Lịch Sử, Địa Lý", "instructor": "CÔ SƯƠNG MAI · CÔ NGÔ THỊ LAN HƯƠNG · THẦY ĐÀM THANH TÙNG", "duration": "Combo 3 khóa tuyển chọn (1 thầy/môn) · Video HD + PDF", "lessons": 360, "level": "COMBO BAN 199K · Combo Ban KHXH 1 — Ngữ Văn, Lịch Sử, Địa Lý", "groupName": "COMBO BAN 199K · Combo Ban KHXH 1 — Ngữ Văn, Lịch Sử, Địa Lý", "rating": 5.0, "students": "1.9k+", "price": 199000, "originalPrice": 399000, "singlePrice": 69000, "coursePrice": 199000, "tier": "course_199k", "tierType": "course_199k", "subTier": "combo_199k", "isPackageOnly": false, "tierShortBadge": "COMBO 199K", "tierLabel": "COMBO BAN 199K", "badge": "199K · Ban KHXH 1 (Ngữ Văn · Lịch Sử · Địa Lý)", "parentCourseId": "C199-KHXH1", "parentSubjectId": "K69-VAN-SM", "childCourseIds": ["K69-VAN-SM", "K69-SU-HUONG", "K69-DIA-TUNG"], "extraFolderIds": ["1klZMAdkSnSXXSb72fTiKOZnL11EPYswu", "16WO3g17nelhGfCzNNaptvgKp0iYzAlvm"], "bannerId": "1Qq9CO0m5D8GEQWbT1fcaMAClo_6snzXe", "defaultCover": "https://lh3.googleusercontent.com/d/1Qq9CO0m5D8GEQWbT1fcaMAClo_6snzXe=w960", "cover": "https://lh3.googleusercontent.com/d/1Qq9CO0m5D8GEQWbT1fcaMAClo_6snzXe=w960", "fallbackCover": "", "driveFolderId": "1POi_V92dNB9IjyVa15Q7TTe5EgtNf85k", "driveFolderName": "Combo 199K: KHXH 1 — Ngữ Văn, Lịch Sử, Địa Lý", "driveFolderUrl": "https://drive.google.com/drive/folders/1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT", "driveUrl": "https://drive.google.com/drive/folders/1POi_V92dNB9IjyVa15Q7TTe5EgtNf85k", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Combo Ban Khoa Học Xã Hội 1 (Khối C00) gồm đúng 3 thư mục chọn lọc: Ngữ Văn Cô Sương Mai + Lịch Sử Cô Lan Hương + Địa Lý Thầy Đàm Thanh Tùng.", "description": "Combo Ban Khoa Học Xã Hội 1 (Khối C00) gồm đúng 3 thư mục chọn lọc: Ngữ Văn Cô Sương Mai + Lịch Sử Cô Lan Hương + Địa Lý Thầy Đàm Thanh Tùng.", "highlights": ["Gồm đúng 3 thư mục khóa học chọn lọc xếp chung trong 1 Thư Mục Combo 199K (Lối Tắt)", "Cấp quyền Google Drive riêng cho đúng Email mua hàng · Truy cập trực tiếp trên Google Drive & Hệ thống học tập"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Ban KHXH 1 (Ngữ Văn · Lịch Sử · Địa Lý)", "lessons": [{"id": "C199-KHXH1-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Ban KHXH 1 (Ngữ Văn · Lịch Sử · Địa Lý)", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: CÔ SƯƠNG MAI · CÔ NGÔ THỊ LAN HƯƠNG · THẦY ĐÀM THANH TÙNG", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Combo 199K: KHXH 1 — Ngữ Văn, Lịch Sử, Địa Lý."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "C199-KHXH1-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "C199-KHXH2", "sku": "DV199KHXH2", "code": "DV199KHXH2", "category": "ngoai_ngu_khxh", "categories": ["all", "ngoai_ngu_khxh", "lop12_2k9"], "subCategory": "ngoai_ngu_khxh", "categoryLabel": "Ban KHXH 2 (Toán · Văn · Anh)", "title": "Combo Ban KHXH 2 — Toán, Ngữ Văn, Tiếng Anh", "instructor": "THẦY ĐỖ VĂN ĐỨC · CÔ SƯƠNG MAI · CÔ VŨ MAI PHƯƠNG", "duration": "Combo 3 khóa tuyển chọn (1 thầy/môn) · Video HD + PDF", "lessons": 360, "level": "COMBO BAN 199K · Combo Ban KHXH 2 — Toán, Ngữ Văn, Tiếng Anh", "groupName": "COMBO BAN 199K · Combo Ban KHXH 2 — Toán, Ngữ Văn, Tiếng Anh", "rating": 5.0, "students": "1.9k+", "price": 199000, "originalPrice": 399000, "singlePrice": 69000, "coursePrice": 199000, "tier": "course_199k", "tierType": "course_199k", "subTier": "combo_199k", "isPackageOnly": false, "tierShortBadge": "COMBO 199K", "tierLabel": "COMBO BAN 199K", "badge": "199K · Ban KHXH 2 (Toán · Văn · Anh)", "parentCourseId": "C199-KHXH2", "parentSubjectId": "K69-TOAN-DUC", "childCourseIds": ["K69-TOAN-DUC", "K69-VAN-SM", "K69-ANH-MP"], "extraFolderIds": ["1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT", "1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1"], "bannerId": "13D6zA1O05AOk0pvoOj6cZL3BrnAzrMlR", "defaultCover": "https://lh3.googleusercontent.com/d/13D6zA1O05AOk0pvoOj6cZL3BrnAzrMlR=w960", "cover": "https://lh3.googleusercontent.com/d/13D6zA1O05AOk0pvoOj6cZL3BrnAzrMlR=w960", "fallbackCover": "", "driveFolderId": "1USiYayriUVvjhV9uNUsb9KwkUBmvY9Qr", "driveFolderName": "Combo 199K: KHXH 2 — Toán, Văn, Anh", "driveFolderUrl": "https://drive.google.com/drive/folders/1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo", "driveUrl": "https://drive.google.com/drive/folders/1USiYayriUVvjhV9uNUsb9KwkUBmvY9Qr", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Combo Ban Khoa Học Xã Hội 2 (Khối D01) gồm đúng 3 thư mục chọn lọc: Toán Thầy Đỗ Văn Đức + Ngữ Văn Cô Sương Mai + Tiếng Anh Cô Vũ Mai Phương.", "description": "Combo Ban Khoa Học Xã Hội 2 (Khối D01) gồm đúng 3 thư mục chọn lọc: Toán Thầy Đỗ Văn Đức + Ngữ Văn Cô Sương Mai + Tiếng Anh Cô Vũ Mai Phương.", "highlights": ["Gồm đúng 3 thư mục khóa học chọn lọc xếp chung trong 1 Thư Mục Combo 199K (Lối Tắt)", "Cấp quyền Google Drive riêng cho đúng Email mua hàng · Truy cập trực tiếp trên Google Drive & Hệ thống học tập"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Ban KHXH 2 (Toán · Văn · Anh)", "lessons": [{"id": "C199-KHXH2-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Ban KHXH 2 (Toán · Văn · Anh)", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY ĐỖ VĂN ĐỨC · CÔ SƯƠNG MAI · CÔ VŨ MAI PHƯƠNG", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Combo 199K: KHXH 2 — Toán, Văn, Anh."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "C199-KHXH2-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "C199-HSA", "sku": "DV199HSA", "code": "DV199HSA", "category": "dgnl_hsa", "categories": ["all", "dgnl_hsa", "lop12_2k9"], "subCategory": "dgnl_hsa", "categoryLabel": "ĐGNL HSA ĐHQG Hà Nội", "title": "Khóa ĐGNL HSA (ĐHQG Hà Nội)", "instructor": "HOCMAI · MAPSTUDY · EMPIRE TEAM · HSA EDU", "duration": "Combo 4 khóa tuyển chọn (1 thầy/môn) · Video HD + PDF", "lessons": 480, "level": "KHÓA ĐGNL 199K · Khóa ĐGNL HSA (ĐHQG Hà Nội)", "groupName": "KHÓA ĐGNL 199K · Khóa ĐGNL HSA (ĐHQG Hà Nội)", "rating": 5.0, "students": "1.9k+", "price": 199000, "originalPrice": 399000, "singlePrice": 69000, "coursePrice": 199000, "tier": "course_199k", "tierType": "course_199k", "subTier": "combo_199k", "isPackageOnly": false, "tierShortBadge": "COMBO 199K", "tierLabel": "KHÓA ĐGNL 199K", "badge": "199K · ĐGNL HSA ĐHQG Hà Nội", "parentCourseId": "C199-HSA", "parentSubjectId": "K69-HSA-HOCMAI", "childCourseIds": ["K69-HSA-HOCMAI", "K69-HSA-MAP", "K69-HSA-EMPIRE", "K69-HSA-EDU"], "extraFolderIds": ["11RHLlw-99okBQTqk6Dp4DxlucorjoW6p", "1yNPB1d_GzfvPDp6dIpGQtBKp1-L6HkrN", "1n8MDD0giM4kVxjU7bV75vqptkKzb_zjg"], "bannerId": "1lJAFhSnTLFhRjO_npIAg2rK_sLJutC_C", "defaultCover": "https://lh3.googleusercontent.com/d/1lJAFhSnTLFhRjO_npIAg2rK_sLJutC_C=w960", "cover": "https://lh3.googleusercontent.com/d/1lJAFhSnTLFhRjO_npIAg2rK_sLJutC_C=w960", "fallbackCover": "", "driveFolderId": "1srqe9me4XOr-Bg30BSx-mQrFdcaRxgKD", "driveFolderName": "Combo 199K: Khóa Đánh Giá Năng Lực HSA (ĐHQG Hà Nội)", "driveFolderUrl": "https://drive.google.com/drive/folders/1XZj-uhExqqkupmmRbxmX08AB-NhgCcxi", "driveUrl": "https://drive.google.com/drive/folders/1srqe9me4XOr-Bg30BSx-mQrFdcaRxgKD", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Trọn bộ 4 đơn vị luyện thi ĐGNL HSA ĐHQG Hà Nội 2027 (HocMai · MapStudy · Empire Team · HSA Edu) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "description": "Trọn bộ 4 đơn vị luyện thi ĐGNL HSA ĐHQG Hà Nội 2027 (HocMai · MapStudy · Empire Team · HSA Edu) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Gồm đúng 4 thư mục khóa học chọn lọc xếp chung trong 1 Thư Mục Combo 199K (Lối Tắt)", "Cấp quyền Google Drive riêng cho đúng Email mua hàng · Truy cập trực tiếp trên Google Drive & Hệ thống học tập"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — ĐGNL HSA ĐHQG Hà Nội", "lessons": [{"id": "C199-HSA-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi ĐGNL HSA ĐHQG Hà Nội", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: HOCMAI · MAPSTUDY · EMPIRE TEAM · HSA EDU", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Combo 199K: Khóa Đánh Giá Năng Lực HSA (ĐHQG Hà Nội)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "C199-HSA-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "C199-TSA", "sku": "DV199TSA", "code": "DV199TSA", "category": "dgtd_tsa", "categories": ["all", "dgtd_tsa", "lop12_2k9"], "subCategory": "dgtd_tsa", "categoryLabel": "ĐGTD TSA ĐH Bách Khoa HN", "title": "Khóa ĐGTD TSA (ĐH Bách Khoa HN)", "instructor": "BMC · HOCMAI — TƯ DUY TOÁN · ĐỌC HIỂU · KHOA HỌC", "duration": "Combo 2 khóa tuyển chọn (1 thầy/môn) · Video HD + PDF", "lessons": 240, "level": "KHÓA ĐGTD 199K · Khóa ĐGTD TSA (ĐH Bách Khoa HN)", "groupName": "KHÓA ĐGTD 199K · Khóa ĐGTD TSA (ĐH Bách Khoa HN)", "rating": 5.0, "students": "1.9k+", "price": 199000, "originalPrice": 399000, "singlePrice": 69000, "coursePrice": 199000, "tier": "course_199k", "tierType": "course_199k", "subTier": "combo_199k", "isPackageOnly": false, "tierShortBadge": "COMBO 199K", "tierLabel": "KHÓA ĐGTD 199K", "badge": "199K · ĐGTD TSA ĐH Bách Khoa HN", "parentCourseId": "C199-TSA", "parentSubjectId": "K69-TSA-BMC", "childCourseIds": ["K69-TSA-BMC", "K69-TSA-HOCMAI"], "extraFolderIds": ["1Z71HzRYKoQSv5i-qEWq1iP_icICaB3Lu"], "bannerId": "1JtFtLXmTGByHdNVUlWbiGgbFyhV0o_03", "defaultCover": "https://lh3.googleusercontent.com/d/1JtFtLXmTGByHdNVUlWbiGgbFyhV0o_03=w960", "cover": "https://lh3.googleusercontent.com/d/1JtFtLXmTGByHdNVUlWbiGgbFyhV0o_03=w960", "fallbackCover": "", "driveFolderId": "17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe", "driveFolderName": "Combo 199K: Khóa Đánh Giá Tư Duy TSA (ĐH Bách Khoa HN)", "driveFolderUrl": "https://drive.google.com/drive/folders/17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe", "driveUrl": "https://drive.google.com/drive/folders/17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Trọn bộ 2 đơn vị luyện thi ĐGTD TSA ĐH Bách Khoa Hà Nội 2027 (BMC · HocMai) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "description": "Trọn bộ 2 đơn vị luyện thi ĐGTD TSA ĐH Bách Khoa Hà Nội 2027 (BMC · HocMai) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Gồm đúng 2 thư mục khóa học chọn lọc xếp chung trong 1 Thư Mục Combo 199K (Lối Tắt)", "Cấp quyền Google Drive riêng cho đúng Email mua hàng · Truy cập trực tiếp trên Google Drive & Hệ thống học tập"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — ĐGTD TSA ĐH Bách Khoa HN", "lessons": [{"id": "C199-TSA-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi ĐGTD TSA ĐH Bách Khoa HN", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: BMC · HOCMAI — TƯ DUY TOÁN · ĐỌC HIỂU · KHOA HỌC", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Combo 199K: Khóa Đánh Giá Tư Duy TSA (ĐH Bách Khoa HN)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "C199-TSA-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "C199-VACT", "sku": "DV199VACT", "code": "DV199VACT", "category": "dgnl_vact_bca", "categories": ["all", "dgnl_vact_bca", "lop12_2k9"], "subCategory": "dgnl_vact_bca", "categoryLabel": "ĐGNL V-ACT ĐHQG TP.HCM", "title": "Khóa ĐGNL V-ACT (ĐHQG TP.HCM)", "instructor": "HOCMAI · EMPIRE TEAM · MAPSTUDY", "duration": "Combo 3 khóa tuyển chọn (1 thầy/môn) · Video HD + PDF", "lessons": 360, "level": "KHÓA ĐGNL 199K · Khóa ĐGNL V-ACT (ĐHQG TP.HCM)", "groupName": "KHÓA ĐGNL 199K · Khóa ĐGNL V-ACT (ĐHQG TP.HCM)", "rating": 5.0, "students": "1.9k+", "price": 199000, "originalPrice": 399000, "singlePrice": 69000, "coursePrice": 199000, "tier": "course_199k", "tierType": "course_199k", "subTier": "combo_199k", "isPackageOnly": false, "tierShortBadge": "COMBO 199K", "tierLabel": "KHÓA ĐGNL 199K", "badge": "199K · ĐGNL V-ACT ĐHQG TP.HCM", "parentCourseId": "C199-VACT", "parentSubjectId": "K69-VACT-HOCMAI", "childCourseIds": ["K69-VACT-HOCMAI", "K69-VACT-EMPIRE", "K69-VACT-MAP"], "extraFolderIds": ["1ic4g3roCpg7_gkj5JNz9Gre52x_BhyW6", "1dqiwh_ADEBetnPMC0S-YH8M6SLysaEQB"], "bannerId": "15Bzsd08qpjo8L3SlaxLsq3RHr6oOIt10", "defaultCover": "https://lh3.googleusercontent.com/d/15Bzsd08qpjo8L3SlaxLsq3RHr6oOIt10=w960", "cover": "https://lh3.googleusercontent.com/d/15Bzsd08qpjo8L3SlaxLsq3RHr6oOIt10=w960", "fallbackCover": "", "driveFolderId": "1bPhV9fqeesm4SISXeIjL9ZgVWwnHxW6o", "driveFolderName": "Combo 199K: Khóa Đánh Giá Năng Lực V-ACT (ĐHQG TP.HCM)", "driveFolderUrl": "https://drive.google.com/drive/folders/1YK2IS2Hzwe4-MqFlJ2kMIJLwDsSPSKuu", "driveUrl": "https://drive.google.com/drive/folders/1bPhV9fqeesm4SISXeIjL9ZgVWwnHxW6o", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Trọn bộ 3 đơn vị luyện thi ĐGNL V-ACT ĐHQG TP.HCM 2027 (HocMai · Empire Team · MapStudy) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "description": "Trọn bộ 3 đơn vị luyện thi ĐGNL V-ACT ĐHQG TP.HCM 2027 (HocMai · Empire Team · MapStudy) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Gồm đúng 3 thư mục khóa học chọn lọc xếp chung trong 1 Thư Mục Combo 199K (Lối Tắt)", "Cấp quyền Google Drive riêng cho đúng Email mua hàng · Truy cập trực tiếp trên Google Drive & Hệ thống học tập"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — ĐGNL V-ACT ĐHQG TP.HCM", "lessons": [{"id": "C199-VACT-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi ĐGNL V-ACT ĐHQG TP.HCM", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: HOCMAI · EMPIRE TEAM · MAPSTUDY", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Combo 199K: Khóa Đánh Giá Năng Lực V-ACT (ĐHQG TP.HCM)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "C199-VACT-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-TOAN-DUC", "sku": "DV69TOANDUC", "code": "DV69TOANDUC", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Môn Toán", "title": "Toán Thầy Đỗ Văn Đức (TenSchool 2K9)", "instructor": "THẦY ĐỖ VĂN ĐỨC — TENSCHOOL", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Toán", "groupName": "Khóa Lẻ 69K · Môn Toán", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Toán", "parentCourseId": "K69-TOAN-DUC", "parentSubjectId": "K69-TOAN-DUC", "childCourseIds": [], "extraFolderIds": [], "bannerId": "19dsgaplgZ8jGd3QuFmOFSP8R1wIa4h9u", "defaultCover": "https://lh3.googleusercontent.com/d/19dsgaplgZ8jGd3QuFmOFSP8R1wIa4h9u=w960", "cover": "https://lh3.googleusercontent.com/d/19dsgaplgZ8jGd3QuFmOFSP8R1wIa4h9u=w960", "fallbackCover": "", "driveFolderId": "1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo", "driveFolderName": "Toán Thầy Đỗ Văn Đức (TenSchool 2K9)", "driveFolderUrl": "https://drive.google.com/drive/folders/1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo", "driveUrl": "https://drive.google.com/drive/folders/1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Toán Thầy Đỗ Văn Đức (TenSchool 2K9) (THẦY ĐỖ VĂN ĐỨC — TENSCHOOL) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Toán Thầy Đỗ Văn Đức (TenSchool 2K9) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Toán Thầy Đỗ Văn Đức (TenSchool 2K9) (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Toán", "lessons": [{"id": "K69-TOAN-DUC-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Toán", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY ĐỖ VĂN ĐỨC — TENSCHOOL", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Toán Thầy Đỗ Văn Đức (TenSchool 2K9)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-TOAN-DUC-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-TOAN-TIEN", "sku": "DV69TOANTIEN", "code": "DV69TOANTIEN", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Môn Toán", "title": "Toán Thầy Nguyễn Phan Tiến 2K9", "instructor": "THẦY NGUYỄN PHAN TIẾN", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Toán", "groupName": "Khóa Lẻ 69K · Môn Toán", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Toán", "parentCourseId": "K69-TOAN-TIEN", "parentSubjectId": "K69-TOAN-TIEN", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1T9k1aHqUdKGfzzCeePudB3408I2f86Ek", "defaultCover": "https://lh3.googleusercontent.com/d/1T9k1aHqUdKGfzzCeePudB3408I2f86Ek=w960", "cover": "https://lh3.googleusercontent.com/d/1T9k1aHqUdKGfzzCeePudB3408I2f86Ek=w960", "fallbackCover": "", "driveFolderId": "1b73Z89zxCGINyuOVm4pImxwkj2UTidC1", "driveFolderName": "Toán Thầy Nguyễn Phan Tiến 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/1b73Z89zxCGINyuOVm4pImxwkj2UTidC1", "driveUrl": "https://drive.google.com/drive/folders/1b73Z89zxCGINyuOVm4pImxwkj2UTidC1", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Toán Thầy Nguyễn Phan Tiến 2K9 (THẦY NGUYỄN PHAN TIẾN) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Toán Thầy Nguyễn Phan Tiến 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Toán Thầy Nguyễn Phan Tiến 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Toán", "lessons": [{"id": "K69-TOAN-TIEN-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Toán", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY NGUYỄN PHAN TIẾN", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Toán Thầy Nguyễn Phan Tiến 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-TOAN-TIEN-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-TOAN-SHIPPER", "sku": "DV69TOANSHIP", "code": "DV69TOANSHIP", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Môn Toán", "title": "Toán Anh Shiper 2K9", "instructor": "ANH SHIPER TOÁN", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Toán", "groupName": "Khóa Lẻ 69K · Môn Toán", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Toán", "parentCourseId": "K69-TOAN-SHIPPER", "parentSubjectId": "K69-TOAN-SHIPPER", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1CNcGxedxoB0rVxxBJvah1dP-2x23Hf8l", "defaultCover": "https://lh3.googleusercontent.com/d/1CNcGxedxoB0rVxxBJvah1dP-2x23Hf8l=w960", "cover": "https://lh3.googleusercontent.com/d/1CNcGxedxoB0rVxxBJvah1dP-2x23Hf8l=w960", "fallbackCover": "", "driveFolderId": "1npBDPOm0un8fpiwhXqnTElSyJCxHEq1n", "driveFolderName": "Toán Anh Shiper 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/1npBDPOm0un8fpiwhXqnTElSyJCxHEq1n", "driveUrl": "https://drive.google.com/drive/folders/1npBDPOm0un8fpiwhXqnTElSyJCxHEq1n", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Toán Anh Shiper 2K9 (ANH SHIPER TOÁN) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Toán Anh Shiper 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Toán Anh Shiper 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Toán", "lessons": [{"id": "K69-TOAN-SHIPPER-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Toán", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: ANH SHIPER TOÁN", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Toán Anh Shiper 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-TOAN-SHIPPER-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-TOAN-MAP", "sku": "DV69TOANMAP", "code": "DV69TOANMAP", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Môn Toán", "title": "Toán — Tổ Toán Học MapStudy 2K9", "instructor": "TỔ TOÁN HỌC MAPSTUDY", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Toán", "groupName": "Khóa Lẻ 69K · Môn Toán", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Toán", "parentCourseId": "K69-TOAN-MAP", "parentSubjectId": "K69-TOAN-MAP", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1UzEyvawDLZyQaqLjLTRAzLZBLXAzLtGd", "defaultCover": "https://lh3.googleusercontent.com/d/1UzEyvawDLZyQaqLjLTRAzLZBLXAzLtGd=w960", "cover": "https://lh3.googleusercontent.com/d/1UzEyvawDLZyQaqLjLTRAzLZBLXAzLtGd=w960", "fallbackCover": "", "driveFolderId": "1Lvx2x6Gz66gNzgHWOn4DjF6m0a8MhuPA", "driveFolderName": "Toán — Tổ Toán Học MapStudy 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/1Lvx2x6Gz66gNzgHWOn4DjF6m0a8MhuPA", "driveUrl": "https://drive.google.com/drive/folders/1Lvx2x6Gz66gNzgHWOn4DjF6m0a8MhuPA", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Toán — Tổ Toán Học MapStudy 2K9 (TỔ TOÁN HỌC MAPSTUDY) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Toán — Tổ Toán Học MapStudy 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Toán — Tổ Toán Học MapStudy 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Toán", "lessons": [{"id": "K69-TOAN-MAP-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Toán", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: TỔ TOÁN HỌC MAPSTUDY", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Toán — Tổ Toán Học MapStudy 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-TOAN-MAP-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-TOAN-NT", "sku": "DV69TOANNT", "code": "DV69TOANNT", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Môn Toán", "title": "Nền Tảng Toán Thầy Lưu Huy Thưởng", "instructor": "THẦY LƯU HUY THƯỞNG — HOCMAI", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Toán", "groupName": "Khóa Lẻ 69K · Môn Toán", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Toán", "parentCourseId": "K69-TOAN-NT", "parentSubjectId": "K69-TOAN-NT", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1kbpgW03rnk3_Scg31efEyZGhjFgSBtPV", "defaultCover": "https://lh3.googleusercontent.com/d/1kbpgW03rnk3_Scg31efEyZGhjFgSBtPV=w960", "cover": "https://lh3.googleusercontent.com/d/1kbpgW03rnk3_Scg31efEyZGhjFgSBtPV=w960", "fallbackCover": "", "driveFolderId": "1kme7eKb-PLV_suK3UVLJYEQKMB5BuP6A", "driveFolderName": "Nền Tảng Toán Thầy Lưu Huy Thưởng", "driveFolderUrl": "https://drive.google.com/drive/folders/1kme7eKb-PLV_suK3UVLJYEQKMB5BuP6A", "driveUrl": "https://drive.google.com/drive/folders/1kme7eKb-PLV_suK3UVLJYEQKMB5BuP6A", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Nền Tảng Toán Thầy Lưu Huy Thưởng (THẦY LƯU HUY THƯỞNG — HOCMAI) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Nền Tảng Toán Thầy Lưu Huy Thưởng · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Nền Tảng Toán Thầy Lưu Huy Thưởng (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Toán", "lessons": [{"id": "K69-TOAN-NT-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Toán", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY LƯU HUY THƯỞNG — HOCMAI", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Nền Tảng Toán Thầy Lưu Huy Thưởng."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-TOAN-NT-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-LY-BIEN", "sku": "DV69LYBIEN", "code": "DV69LYBIEN", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Môn Vật Lý", "title": "Vật Lý Thầy Chu Văn Biên 2K9", "instructor": "THẦY CHU VĂN BIÊN", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Vật Lý", "groupName": "Khóa Lẻ 69K · Môn Vật Lý", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Vật Lý", "parentCourseId": "K69-LY-BIEN", "parentSubjectId": "K69-LY-BIEN", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1Qk1eh8MSussintaXSMK2G1iy9zCKehkw", "defaultCover": "https://lh3.googleusercontent.com/d/1Qk1eh8MSussintaXSMK2G1iy9zCKehkw=w960", "cover": "https://lh3.googleusercontent.com/d/1Qk1eh8MSussintaXSMK2G1iy9zCKehkw=w960", "fallbackCover": "", "driveFolderId": "1UxEYANVp1iw9Us0mSNJR8w9_VFhsx3MP", "driveFolderName": "Vật Lý Thầy Chu Văn Biên 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/1UxEYANVp1iw9Us0mSNJR8w9_VFhsx3MP", "driveUrl": "https://drive.google.com/drive/folders/1UxEYANVp1iw9Us0mSNJR8w9_VFhsx3MP", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Vật Lý Thầy Chu Văn Biên 2K9 (THẦY CHU VĂN BIÊN) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Vật Lý Thầy Chu Văn Biên 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Vật Lý Thầy Chu Văn Biên 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Vật Lý", "lessons": [{"id": "K69-LY-BIEN-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Vật Lý", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY CHU VĂN BIÊN", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Vật Lý Thầy Chu Văn Biên 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-LY-BIEN-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-LY-TIEN", "sku": "DV69LYTIEN", "code": "DV69LYTIEN", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Môn Vật Lý", "title": "Vật Lý Thầy Thắng · Thầy Tiến IPClass 2K9", "instructor": "THẦY THẮNG & THẦY TIẾN — IPCLASS", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Vật Lý", "groupName": "Khóa Lẻ 69K · Môn Vật Lý", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Vật Lý", "parentCourseId": "K69-LY-TIEN", "parentSubjectId": "K69-LY-TIEN", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1BQdHHWXd9iBGH09xq2LjhBbG9WVgo4ih", "defaultCover": "https://lh3.googleusercontent.com/d/1BQdHHWXd9iBGH09xq2LjhBbG9WVgo4ih=w960", "cover": "https://lh3.googleusercontent.com/d/1BQdHHWXd9iBGH09xq2LjhBbG9WVgo4ih=w960", "fallbackCover": "", "driveFolderId": "1Mz6IblP1vwlLKj9XKBAq4BFnKJBcwqSP", "driveFolderName": "Vật Lý Thầy Thắng · Thầy Tiến IPClass 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/1Mz6IblP1vwlLKj9XKBAq4BFnKJBcwqSP", "driveUrl": "https://drive.google.com/drive/folders/1Mz6IblP1vwlLKj9XKBAq4BFnKJBcwqSP", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Vật Lý Thầy Thắng · Thầy Tiến IPClass 2K9 (THẦY THẮNG & THẦY TIẾN — IPCLASS) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Vật Lý Thầy Thắng · Thầy Tiến IPClass 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Vật Lý Thầy Thắng · Thầy Tiến IPClass 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Vật Lý", "lessons": [{"id": "K69-LY-TIEN-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Vật Lý", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY THẮNG & THẦY TIẾN — IPCLASS", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Vật Lý Thầy Thắng · Thầy Tiến IPClass 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-LY-TIEN-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-LY-UNG", "sku": "DV69LYUNG", "code": "DV69LYUNG", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Môn Vật Lý", "title": "Vật Lý Thầy Lê Tùng Ưng (TenS 2K9)", "instructor": "THẦY LÊ TÙNG ƯNG — TENSCHOOL", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Vật Lý", "groupName": "Khóa Lẻ 69K · Môn Vật Lý", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Vật Lý", "parentCourseId": "K69-LY-UNG", "parentSubjectId": "K69-LY-UNG", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1wvE4YqVQ8QvPPwN6DrdpT1Kw7HequIiw", "defaultCover": "https://lh3.googleusercontent.com/d/1wvE4YqVQ8QvPPwN6DrdpT1Kw7HequIiw=w960", "cover": "https://lh3.googleusercontent.com/d/1wvE4YqVQ8QvPPwN6DrdpT1Kw7HequIiw=w960", "fallbackCover": "", "driveFolderId": "11QpRWPh7KFv6z3ehH9PyF2rSZBJkvjIU", "driveFolderName": "Vật Lý Thầy Lê Tùng Ưng (TenS 2K9)", "driveFolderUrl": "https://drive.google.com/drive/folders/11QpRWPh7KFv6z3ehH9PyF2rSZBJkvjIU", "driveUrl": "https://drive.google.com/drive/folders/11QpRWPh7KFv6z3ehH9PyF2rSZBJkvjIU", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Vật Lý Thầy Lê Tùng Ưng (TenS 2K9) (THẦY LÊ TÙNG ƯNG — TENSCHOOL) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Vật Lý Thầy Lê Tùng Ưng (TenS 2K9) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Vật Lý Thầy Lê Tùng Ưng (TenS 2K9) (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Vật Lý", "lessons": [{"id": "K69-LY-UNG-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Vật Lý", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY LÊ TÙNG ƯNG — TENSCHOOL", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Vật Lý Thầy Lê Tùng Ưng (TenS 2K9)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-LY-UNG-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-HOA-TRONG", "sku": "DV69HOATRONG", "code": "DV69HOATRONG", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Môn Hóa Học", "title": "Hóa Học Thầy Phạm Văn Trọng 2K9", "instructor": "THẦY PHẠM VĂN TRỌNG", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Hóa Học", "groupName": "Khóa Lẻ 69K · Môn Hóa Học", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Hóa Học", "parentCourseId": "K69-HOA-TRONG", "parentSubjectId": "K69-HOA-TRONG", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1FJN2iWnh8OO7Mb2SqiA9gmsxeWNRUsk1", "defaultCover": "https://lh3.googleusercontent.com/d/1FJN2iWnh8OO7Mb2SqiA9gmsxeWNRUsk1=w960", "cover": "https://lh3.googleusercontent.com/d/1FJN2iWnh8OO7Mb2SqiA9gmsxeWNRUsk1=w960", "fallbackCover": "", "driveFolderId": "1GG-0AuynJUnQZZKXcrlQpRuTFsye6aQk", "driveFolderName": "Hóa Học Thầy Phạm Văn Trọng 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/1GG-0AuynJUnQZZKXcrlQpRuTFsye6aQk", "driveUrl": "https://drive.google.com/drive/folders/1GG-0AuynJUnQZZKXcrlQpRuTFsye6aQk", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Hóa Học Thầy Phạm Văn Trọng 2K9 (THẦY PHẠM VĂN TRỌNG) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Hóa Học Thầy Phạm Văn Trọng 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Hóa Học Thầy Phạm Văn Trọng 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Hóa Học", "lessons": [{"id": "K69-HOA-TRONG-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Hóa Học", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY PHẠM VĂN TRỌNG", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Hóa Học Thầy Phạm Văn Trọng 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-HOA-TRONG-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-HOA-NGOC", "sku": "DV69HOANGOC", "code": "DV69HOANGOC", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Môn Hóa Học", "title": "Nền Tảng Hóa Thầy Vũ Khắc Ngọc & Cô Tống Thị Son", "instructor": "THẦY VŨ KHẮC NGỌC & CÔ TỐNG THỊ SON", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Hóa Học", "groupName": "Khóa Lẻ 69K · Môn Hóa Học", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Hóa Học", "parentCourseId": "K69-HOA-NGOC", "parentSubjectId": "K69-HOA-NGOC", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1DmSD53JWqo4mPMqvkg8HW4SgbirM69zq", "defaultCover": "https://lh3.googleusercontent.com/d/1DmSD53JWqo4mPMqvkg8HW4SgbirM69zq=w960", "cover": "https://lh3.googleusercontent.com/d/1DmSD53JWqo4mPMqvkg8HW4SgbirM69zq=w960", "fallbackCover": "", "driveFolderId": "1vMyBdrXbe_YdZwMOgw9OfTZMrY-9vHXe", "driveFolderName": "Nền Tảng Hóa Thầy Vũ Khắc Ngọc & Cô Tống Thị Son", "driveFolderUrl": "https://drive.google.com/drive/folders/1vMyBdrXbe_YdZwMOgw9OfTZMrY-9vHXe", "driveUrl": "https://drive.google.com/drive/folders/1vMyBdrXbe_YdZwMOgw9OfTZMrY-9vHXe", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Nền Tảng Hóa Thầy Vũ Khắc Ngọc & Cô Tống Thị Son (THẦY VŨ KHẮC NGỌC & CÔ TỐNG THỊ SON) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Nền Tảng Hóa Thầy Vũ Khắc Ngọc & Cô Tống Thị Son · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Nền Tảng Hóa Thầy Vũ Khắc Ngọc & Cô Tống Thị Son (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Hóa Học", "lessons": [{"id": "K69-HOA-NGOC-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Hóa Học", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY VŨ KHẮC NGỌC & CÔ TỐNG THỊ SON", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Nền Tảng Hóa Thầy Vũ Khắc Ngọc & Cô Tống Thị Son."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-HOA-NGOC-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-VAN-SM", "sku": "DV69VANSM", "code": "DV69VANSM", "category": "ngoai_ngu_khxh", "categories": ["all", "ngoai_ngu_khxh", "lop12_2k9"], "subCategory": "ngoai_ngu_khxh", "categoryLabel": "Môn Ngữ Văn", "title": "Học Văn Cô Sương Mai 2K9", "instructor": "CÔ SƯƠNG MAI", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Ngữ Văn", "groupName": "Khóa Lẻ 69K · Môn Ngữ Văn", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Ngữ Văn", "parentCourseId": "K69-VAN-SM", "parentSubjectId": "K69-VAN-SM", "childCourseIds": [], "extraFolderIds": [], "bannerId": "168PvC5P4T3pnHuCQteIB6MwyAseMHgCP", "defaultCover": "https://lh3.googleusercontent.com/d/168PvC5P4T3pnHuCQteIB6MwyAseMHgCP=w960", "cover": "https://lh3.googleusercontent.com/d/168PvC5P4T3pnHuCQteIB6MwyAseMHgCP=w960", "fallbackCover": "", "driveFolderId": "1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT", "driveFolderName": "Học Văn Cô Sương Mai 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT", "driveUrl": "https://drive.google.com/drive/folders/1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Học Văn Cô Sương Mai 2K9 (CÔ SƯƠNG MAI) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Học Văn Cô Sương Mai 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Học Văn Cô Sương Mai 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Ngữ Văn", "lessons": [{"id": "K69-VAN-SM-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Ngữ Văn", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: CÔ SƯƠNG MAI", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Học Văn Cô Sương Mai 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-VAN-SM-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-VAN-NT", "sku": "DV69VANNT", "code": "DV69VANNT", "category": "ngoai_ngu_khxh", "categories": ["all", "ngoai_ngu_khxh", "lop12_2k9"], "subCategory": "ngoai_ngu_khxh", "categoryLabel": "Môn Ngữ Văn", "title": "Nền Tảng 12 Môn Ngữ Văn (HocMai)", "instructor": "HOCMAI — NỀN TẢNG NGỮ VĂN", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Ngữ Văn", "groupName": "Khóa Lẻ 69K · Môn Ngữ Văn", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Ngữ Văn", "parentCourseId": "K69-VAN-NT", "parentSubjectId": "K69-VAN-NT", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1k6hnaIY3HWrymuoZclECCa6lGgtbjyND", "defaultCover": "https://lh3.googleusercontent.com/d/1k6hnaIY3HWrymuoZclECCa6lGgtbjyND=w960", "cover": "https://lh3.googleusercontent.com/d/1k6hnaIY3HWrymuoZclECCa6lGgtbjyND=w960", "fallbackCover": "", "driveFolderId": "1D9xa1GYZZEDVhxfvQq-i1xlWim66zikF", "driveFolderName": "Nền Tảng 12 Môn Ngữ Văn (HocMai)", "driveFolderUrl": "https://drive.google.com/drive/folders/1D9xa1GYZZEDVhxfvQq-i1xlWim66zikF", "driveUrl": "https://drive.google.com/drive/folders/1D9xa1GYZZEDVhxfvQq-i1xlWim66zikF", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Nền Tảng 12 Môn Ngữ Văn (HocMai) (HOCMAI — NỀN TẢNG NGỮ VĂN) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Nền Tảng 12 Môn Ngữ Văn (HocMai) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Nền Tảng 12 Môn Ngữ Văn (HocMai) (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Ngữ Văn", "lessons": [{"id": "K69-VAN-NT-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Ngữ Văn", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: HOCMAI — NỀN TẢNG NGỮ VĂN", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Nền Tảng 12 Môn Ngữ Văn (HocMai)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-VAN-NT-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-ANH-MP", "sku": "DV69ANHMP", "code": "DV69ANHMP", "category": "ngoai_ngu_khxh", "categories": ["all", "ngoai_ngu_khxh", "lop12_2k9"], "subCategory": "ngoai_ngu_khxh", "categoryLabel": "Môn Tiếng Anh", "title": "Tiếng Anh Cô Vũ Mai Phương 2K9", "instructor": "CÔ VŨ MAI PHƯƠNG", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Tiếng Anh", "groupName": "Khóa Lẻ 69K · Môn Tiếng Anh", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Tiếng Anh", "parentCourseId": "K69-ANH-MP", "parentSubjectId": "K69-ANH-MP", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1jSW8AIaIx_1bAgb0SfzzeQbyzIXQldd5", "defaultCover": "https://lh3.googleusercontent.com/d/1jSW8AIaIx_1bAgb0SfzzeQbyzIXQldd5=w960", "cover": "https://lh3.googleusercontent.com/d/1jSW8AIaIx_1bAgb0SfzzeQbyzIXQldd5=w960", "fallbackCover": "", "driveFolderId": "1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1", "driveFolderName": "Tiếng Anh Cô Vũ Mai Phương 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1", "driveUrl": "https://drive.google.com/drive/folders/1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Tiếng Anh Cô Vũ Mai Phương 2K9 (CÔ VŨ MAI PHƯƠNG) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Tiếng Anh Cô Vũ Mai Phương 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Tiếng Anh Cô Vũ Mai Phương 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Tiếng Anh", "lessons": [{"id": "K69-ANH-MP-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Tiếng Anh", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: CÔ VŨ MAI PHƯƠNG", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Tiếng Anh Cô Vũ Mai Phương 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-ANH-MP-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-ANH-LIEU", "sku": "DV69ANHLIEU", "code": "DV69ANHLIEU", "category": "ngoai_ngu_khxh", "categories": ["all", "ngoai_ngu_khxh", "lop12_2k9"], "subCategory": "ngoai_ngu_khxh", "categoryLabel": "Môn Tiếng Anh", "title": "Tiếng Anh Cô Phạm Liễu 2K9", "instructor": "CÔ PHẠM LIỄU", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Tiếng Anh", "groupName": "Khóa Lẻ 69K · Môn Tiếng Anh", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Tiếng Anh", "parentCourseId": "K69-ANH-LIEU", "parentSubjectId": "K69-ANH-LIEU", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1WrZj1RIOVrXcAJAaMoQm585xqyK4lAwa", "defaultCover": "https://lh3.googleusercontent.com/d/1WrZj1RIOVrXcAJAaMoQm585xqyK4lAwa=w960", "cover": "https://lh3.googleusercontent.com/d/1WrZj1RIOVrXcAJAaMoQm585xqyK4lAwa=w960", "fallbackCover": "", "driveFolderId": "1Antqpjjo7hKQI_RqlDT3FW8kSTJGHGMw", "driveFolderName": "Tiếng Anh Cô Phạm Liễu 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/1Antqpjjo7hKQI_RqlDT3FW8kSTJGHGMw", "driveUrl": "https://drive.google.com/drive/folders/1Antqpjjo7hKQI_RqlDT3FW8kSTJGHGMw", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Tiếng Anh Cô Phạm Liễu 2K9 (CÔ PHẠM LIỄU) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Tiếng Anh Cô Phạm Liễu 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Tiếng Anh Cô Phạm Liễu 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Tiếng Anh", "lessons": [{"id": "K69-ANH-LIEU-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Tiếng Anh", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: CÔ PHẠM LIỄU", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Tiếng Anh Cô Phạm Liễu 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-ANH-LIEU-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-ANH-NT", "sku": "DV69ANHNT", "code": "DV69ANHNT", "category": "ngoai_ngu_khxh", "categories": ["all", "ngoai_ngu_khxh", "lop12_2k9"], "subCategory": "ngoai_ngu_khxh", "categoryLabel": "Môn Tiếng Anh", "title": "Nền Tảng 12 Môn Tiếng Anh (HocMai)", "instructor": "HOCMAI — NỀN TẢNG TIẾNG ANH", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Tiếng Anh", "groupName": "Khóa Lẻ 69K · Môn Tiếng Anh", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Tiếng Anh", "parentCourseId": "K69-ANH-NT", "parentSubjectId": "K69-ANH-NT", "childCourseIds": [], "extraFolderIds": [], "bannerId": "19jS05grnW40e4meXVPn7a7RvtUEAl19x", "defaultCover": "https://lh3.googleusercontent.com/d/19jS05grnW40e4meXVPn7a7RvtUEAl19x=w960", "cover": "https://lh3.googleusercontent.com/d/19jS05grnW40e4meXVPn7a7RvtUEAl19x=w960", "fallbackCover": "", "driveFolderId": "1-sSo3zBXFRoXfQHkSdIOxmH2MkAvEqKM", "driveFolderName": "Nền Tảng 12 Môn Tiếng Anh (HocMai)", "driveFolderUrl": "https://drive.google.com/drive/folders/1-sSo3zBXFRoXfQHkSdIOxmH2MkAvEqKM", "driveUrl": "https://drive.google.com/drive/folders/1-sSo3zBXFRoXfQHkSdIOxmH2MkAvEqKM", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Nền Tảng 12 Môn Tiếng Anh (HocMai) (HOCMAI — NỀN TẢNG TIẾNG ANH) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Nền Tảng 12 Môn Tiếng Anh (HocMai) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Nền Tảng 12 Môn Tiếng Anh (HocMai) (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Tiếng Anh", "lessons": [{"id": "K69-ANH-NT-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Tiếng Anh", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: HOCMAI — NỀN TẢNG TIẾNG ANH", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Nền Tảng 12 Môn Tiếng Anh (HocMai)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-ANH-NT-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-SINH-NGHE", "sku": "DV69SINHNGHE", "code": "DV69SINHNGHE", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Môn Sinh Học", "title": "Sinh Học Thầy Phan Khắc Nghệ 2K9", "instructor": "THẦY PHAN KHẮC NGHỆ", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Sinh Học", "groupName": "Khóa Lẻ 69K · Môn Sinh Học", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Sinh Học", "parentCourseId": "K69-SINH-NGHE", "parentSubjectId": "K69-SINH-NGHE", "childCourseIds": [], "extraFolderIds": [], "bannerId": "12O7FO6DnKouHOcvAh9LayMHGCbqWsKmn", "defaultCover": "https://lh3.googleusercontent.com/d/12O7FO6DnKouHOcvAh9LayMHGCbqWsKmn=w960", "cover": "https://lh3.googleusercontent.com/d/12O7FO6DnKouHOcvAh9LayMHGCbqWsKmn=w960", "fallbackCover": "", "driveFolderId": "1m__F2exCz50iNJXhf0JR4TramO29K244", "driveFolderName": "Sinh Học Thầy Phan Khắc Nghệ 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/1m__F2exCz50iNJXhf0JR4TramO29K244", "driveUrl": "https://drive.google.com/drive/folders/1m__F2exCz50iNJXhf0JR4TramO29K244", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Sinh Học Thầy Phan Khắc Nghệ 2K9 (THẦY PHAN KHẮC NGHỆ) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Sinh Học Thầy Phan Khắc Nghệ 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Sinh Học Thầy Phan Khắc Nghệ 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Sinh Học", "lessons": [{"id": "K69-SINH-NGHE-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Sinh Học", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY PHAN KHẮC NGHỆ", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Sinh Học Thầy Phan Khắc Nghệ 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-SINH-NGHE-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-SINH-DUONG", "sku": "DV69SINHDUONG", "code": "DV69SINHDUONG", "category": "khtn_toan_ly_hoa_sinh", "categories": ["all", "khtn_toan_ly_hoa_sinh", "lop12_2k9"], "subCategory": "khtn_toan_ly_hoa_sinh", "categoryLabel": "Môn Sinh Học", "title": "Nền Tảng Sinh Học Cô Ánh Dương", "instructor": "CÔ ÁNH DƯƠNG", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Sinh Học", "groupName": "Khóa Lẻ 69K · Môn Sinh Học", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Sinh Học", "parentCourseId": "K69-SINH-DUONG", "parentSubjectId": "K69-SINH-DUONG", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1HfwO2IBd44nJtu3b1rfETYWnpY_jR786", "defaultCover": "https://lh3.googleusercontent.com/d/1HfwO2IBd44nJtu3b1rfETYWnpY_jR786=w960", "cover": "https://lh3.googleusercontent.com/d/1HfwO2IBd44nJtu3b1rfETYWnpY_jR786=w960", "fallbackCover": "", "driveFolderId": "13F0pQtUG-1yix2XrSQo9TkSw8-_UAAio", "driveFolderName": "Nền Tảng Sinh Học Cô Ánh Dương", "driveFolderUrl": "https://drive.google.com/drive/folders/13F0pQtUG-1yix2XrSQo9TkSw8-_UAAio", "driveUrl": "https://drive.google.com/drive/folders/13F0pQtUG-1yix2XrSQo9TkSw8-_UAAio", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Nền Tảng Sinh Học Cô Ánh Dương (CÔ ÁNH DƯƠNG) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Nền Tảng Sinh Học Cô Ánh Dương · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Nền Tảng Sinh Học Cô Ánh Dương (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Sinh Học", "lessons": [{"id": "K69-SINH-DUONG-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Sinh Học", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: CÔ ÁNH DƯƠNG", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Nền Tảng Sinh Học Cô Ánh Dương."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-SINH-DUONG-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-SU-HUONG", "sku": "DV69SUHUONG", "code": "DV69SUHUONG", "category": "ngoai_ngu_khxh", "categories": ["all", "ngoai_ngu_khxh", "lop12_2k9"], "subCategory": "ngoai_ngu_khxh", "categoryLabel": "Môn Lịch Sử", "title": "Lịch Sử Cô Ngô Thị Lan Hương 2K9", "instructor": "CÔ NGÔ THỊ LAN HƯƠNG", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Lịch Sử", "groupName": "Khóa Lẻ 69K · Môn Lịch Sử", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Lịch Sử", "parentCourseId": "K69-SU-HUONG", "parentSubjectId": "K69-SU-HUONG", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1J3zG22zlrTo9otUpc5qATJ4n9TL_k4aK", "defaultCover": "https://lh3.googleusercontent.com/d/1J3zG22zlrTo9otUpc5qATJ4n9TL_k4aK=w960", "cover": "https://lh3.googleusercontent.com/d/1J3zG22zlrTo9otUpc5qATJ4n9TL_k4aK=w960", "fallbackCover": "", "driveFolderId": "1klZMAdkSnSXXSb72fTiKOZnL11EPYswu", "driveFolderName": "Lịch Sử Cô Ngô Thị Lan Hương 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/1klZMAdkSnSXXSb72fTiKOZnL11EPYswu", "driveUrl": "https://drive.google.com/drive/folders/1klZMAdkSnSXXSb72fTiKOZnL11EPYswu", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Lịch Sử Cô Ngô Thị Lan Hương 2K9 (CÔ NGÔ THỊ LAN HƯƠNG) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Lịch Sử Cô Ngô Thị Lan Hương 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Lịch Sử Cô Ngô Thị Lan Hương 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Lịch Sử", "lessons": [{"id": "K69-SU-HUONG-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Lịch Sử", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: CÔ NGÔ THỊ LAN HƯƠNG", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Lịch Sử Cô Ngô Thị Lan Hương 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-SU-HUONG-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-SU-SEN", "sku": "DV69SUSEN", "code": "DV69SUSEN", "category": "ngoai_ngu_khxh", "categories": ["all", "ngoai_ngu_khxh", "lop12_2k9"], "subCategory": "ngoai_ngu_khxh", "categoryLabel": "Môn Lịch Sử", "title": "Lịch Sử Cô Nguyễn Hương Sen 2K9", "instructor": "CÔ NGUYỄN HƯƠNG SEN", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Lịch Sử", "groupName": "Khóa Lẻ 69K · Môn Lịch Sử", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Lịch Sử", "parentCourseId": "K69-SU-SEN", "parentSubjectId": "K69-SU-SEN", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1vEP_SFENSGRnYXCAHwdEOxD-LWUCI-0e", "defaultCover": "https://lh3.googleusercontent.com/d/1vEP_SFENSGRnYXCAHwdEOxD-LWUCI-0e=w960", "cover": "https://lh3.googleusercontent.com/d/1vEP_SFENSGRnYXCAHwdEOxD-LWUCI-0e=w960", "fallbackCover": "", "driveFolderId": "1B_IXBTxhmhZtW5fzln4-uxv-QTq39p6t", "driveFolderName": "Lịch Sử Cô Nguyễn Hương Sen 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/1B_IXBTxhmhZtW5fzln4-uxv-QTq39p6t", "driveUrl": "https://drive.google.com/drive/folders/1B_IXBTxhmhZtW5fzln4-uxv-QTq39p6t", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Lịch Sử Cô Nguyễn Hương Sen 2K9 (CÔ NGUYỄN HƯƠNG SEN) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Lịch Sử Cô Nguyễn Hương Sen 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Lịch Sử Cô Nguyễn Hương Sen 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Lịch Sử", "lessons": [{"id": "K69-SU-SEN-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Lịch Sử", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: CÔ NGUYỄN HƯƠNG SEN", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Lịch Sử Cô Nguyễn Hương Sen 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-SU-SEN-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-DIA-TUNG", "sku": "DV69DIATUNG", "code": "DV69DIATUNG", "category": "ngoai_ngu_khxh", "categories": ["all", "ngoai_ngu_khxh", "lop12_2k9"], "subCategory": "ngoai_ngu_khxh", "categoryLabel": "Môn Địa Lý", "title": "Địa Lý Thầy Đàm Thanh Tùng 2K9", "instructor": "THẦY ĐÀM THANH TÙNG", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Địa Lý", "groupName": "Khóa Lẻ 69K · Môn Địa Lý", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Địa Lý", "parentCourseId": "K69-DIA-TUNG", "parentSubjectId": "K69-DIA-TUNG", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1U3AfsKTzFWPz-vFY2nd9eu2kw7eSWKNo", "defaultCover": "https://lh3.googleusercontent.com/d/1U3AfsKTzFWPz-vFY2nd9eu2kw7eSWKNo=w960", "cover": "https://lh3.googleusercontent.com/d/1U3AfsKTzFWPz-vFY2nd9eu2kw7eSWKNo=w960", "fallbackCover": "", "driveFolderId": "16WO3g17nelhGfCzNNaptvgKp0iYzAlvm", "driveFolderName": "Địa Lý Thầy Đàm Thanh Tùng 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/16WO3g17nelhGfCzNNaptvgKp0iYzAlvm", "driveUrl": "https://drive.google.com/drive/folders/16WO3g17nelhGfCzNNaptvgKp0iYzAlvm", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Địa Lý Thầy Đàm Thanh Tùng 2K9 (THẦY ĐÀM THANH TÙNG) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Địa Lý Thầy Đàm Thanh Tùng 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Địa Lý Thầy Đàm Thanh Tùng 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Địa Lý", "lessons": [{"id": "K69-DIA-TUNG-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Địa Lý", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY ĐÀM THANH TÙNG", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Địa Lý Thầy Đàm Thanh Tùng 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-DIA-TUNG-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-DIA-TAI", "sku": "DV69DIATAI", "code": "DV69DIATAI", "category": "ngoai_ngu_khxh", "categories": ["all", "ngoai_ngu_khxh", "lop12_2k9"], "subCategory": "ngoai_ngu_khxh", "categoryLabel": "Môn Địa Lý", "title": "Địa Lý Thầy Tài 2K9", "instructor": "THẦY TÀI ĐỊA LÝ", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · Địa Lý", "groupName": "Khóa Lẻ 69K · Môn Địa Lý", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · Địa Lý", "parentCourseId": "K69-DIA-TAI", "parentSubjectId": "K69-DIA-TAI", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1-GNWHI3J3DUR_W4GGEcJx8G4ZWKIt-Iq", "defaultCover": "https://lh3.googleusercontent.com/d/1-GNWHI3J3DUR_W4GGEcJx8G4ZWKIt-Iq=w960", "cover": "https://lh3.googleusercontent.com/d/1-GNWHI3J3DUR_W4GGEcJx8G4ZWKIt-Iq=w960", "fallbackCover": "", "driveFolderId": "1DasmiM670vDu3CekdeXCoQeQoeLvKYyq", "driveFolderName": "Địa Lý Thầy Tài 2K9", "driveFolderUrl": "https://drive.google.com/drive/folders/1DasmiM670vDu3CekdeXCoQeQoeLvKYyq", "driveUrl": "https://drive.google.com/drive/folders/1DasmiM670vDu3CekdeXCoQeQoeLvKYyq", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học Địa Lý Thầy Tài 2K9 (THẦY TÀI ĐỊA LÝ) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô Địa Lý Thầy Tài 2K9 · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục Địa Lý Thầy Tài 2K9 (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — Địa Lý", "lessons": [{"id": "K69-DIA-TAI-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi Địa Lý", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: THẦY TÀI ĐỊA LÝ", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với Địa Lý Thầy Tài 2K9."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-DIA-TAI-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-HSA-HOCMAI", "sku": "DV69HSAHM", "code": "DV69HSAHM", "category": "dgnl_hsa", "categories": ["all", "dgnl_hsa", "lop12_2k9"], "subCategory": "dgnl_hsa", "categoryLabel": "Môn HSA", "title": "ĐGNL HSA / QDA — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị)", "instructor": "HOCMAI — ĐGNL HSA", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · HSA", "groupName": "Khóa Lẻ 69K · Môn HSA", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · HSA", "parentCourseId": "K69-HSA-HOCMAI", "parentSubjectId": "K69-HSA-HOCMAI", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu", "defaultCover": "https://lh3.googleusercontent.com/d/1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu=w960", "cover": "https://lh3.googleusercontent.com/d/1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu=w960", "fallbackCover": "", "driveFolderId": "1XZj-uhExqqkupmmRbxmX08AB-NhgCcxi", "driveFolderName": "ĐGNL HSA / QDA — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị)", "driveFolderUrl": "https://drive.google.com/drive/folders/1XZj-uhExqqkupmmRbxmX08AB-NhgCcxi", "driveUrl": "https://drive.google.com/drive/folders/1XZj-uhExqqkupmmRbxmX08AB-NhgCcxi", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học ĐGNL HSA / QDA — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị) (HOCMAI — ĐGNL HSA) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô ĐGNL HSA / QDA — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục ĐGNL HSA / QDA — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị) (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — HSA", "lessons": [{"id": "K69-HSA-HOCMAI-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi HSA", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: HOCMAI — ĐGNL HSA", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với ĐGNL HSA / QDA — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-HSA-HOCMAI-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-HSA-MAP", "sku": "DV69HSAMAP", "code": "DV69HSAMAP", "category": "dgnl_hsa", "categories": ["all", "dgnl_hsa", "lop12_2k9"], "subCategory": "dgnl_hsa", "categoryLabel": "Môn HSA", "title": "ĐGNL HSA — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị)", "instructor": "MAPSTUDY — ĐGNL HSA", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · HSA", "groupName": "Khóa Lẻ 69K · Môn HSA", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · HSA", "parentCourseId": "K69-HSA-MAP", "parentSubjectId": "K69-HSA-MAP", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu", "defaultCover": "https://lh3.googleusercontent.com/d/1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu=w960", "cover": "https://lh3.googleusercontent.com/d/1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu=w960", "fallbackCover": "", "driveFolderId": "11RHLlw-99okBQTqk6Dp4DxlucorjoW6p", "driveFolderName": "ĐGNL HSA — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị)", "driveFolderUrl": "https://drive.google.com/drive/folders/11RHLlw-99okBQTqk6Dp4DxlucorjoW6p", "driveUrl": "https://drive.google.com/drive/folders/11RHLlw-99okBQTqk6Dp4DxlucorjoW6p", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học ĐGNL HSA — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị) (MAPSTUDY — ĐGNL HSA) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô ĐGNL HSA — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục ĐGNL HSA — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị) (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — HSA", "lessons": [{"id": "K69-HSA-MAP-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi HSA", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: MAPSTUDY — ĐGNL HSA", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với ĐGNL HSA — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-HSA-MAP-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-HSA-EMPIRE", "sku": "DV69HSAEMP", "code": "DV69HSAEMP", "category": "dgnl_hsa", "categories": ["all", "dgnl_hsa", "lop12_2k9"], "subCategory": "dgnl_hsa", "categoryLabel": "Môn HSA", "title": "ĐGNL HSA — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị)", "instructor": "EMPIRE TEAM — ĐGNL HSA", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · HSA", "groupName": "Khóa Lẻ 69K · Môn HSA", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · HSA", "parentCourseId": "K69-HSA-EMPIRE", "parentSubjectId": "K69-HSA-EMPIRE", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu", "defaultCover": "https://lh3.googleusercontent.com/d/1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu=w960", "cover": "https://lh3.googleusercontent.com/d/1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu=w960", "fallbackCover": "", "driveFolderId": "1yNPB1d_GzfvPDp6dIpGQtBKp1-L6HkrN", "driveFolderName": "ĐGNL HSA — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị)", "driveFolderUrl": "https://drive.google.com/drive/folders/1yNPB1d_GzfvPDp6dIpGQtBKp1-L6HkrN", "driveUrl": "https://drive.google.com/drive/folders/1yNPB1d_GzfvPDp6dIpGQtBKp1-L6HkrN", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học ĐGNL HSA — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị) (EMPIRE TEAM — ĐGNL HSA) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô ĐGNL HSA — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục ĐGNL HSA — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị) (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — HSA", "lessons": [{"id": "K69-HSA-EMPIRE-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi HSA", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: EMPIRE TEAM — ĐGNL HSA", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với ĐGNL HSA — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-HSA-EMPIRE-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-HSA-EDU", "sku": "DV69HSAEDU", "code": "DV69HSAEDU", "category": "dgnl_hsa", "categories": ["all", "dgnl_hsa", "lop12_2k9"], "subCategory": "dgnl_hsa", "categoryLabel": "Môn HSA", "title": "ĐGNL HSA — HSA Edu 2K9 (Khóa Lẻ 1 Đơn Vị)", "instructor": "HSA EDU — ĐGNL HSA", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · HSA", "groupName": "Khóa Lẻ 69K · Môn HSA", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · HSA", "parentCourseId": "K69-HSA-EDU", "parentSubjectId": "K69-HSA-EDU", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu", "defaultCover": "https://lh3.googleusercontent.com/d/1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu=w960", "cover": "https://lh3.googleusercontent.com/d/1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu=w960", "fallbackCover": "", "driveFolderId": "1n8MDD0giM4kVxjU7bV75vqptkKzb_zjg", "driveFolderName": "ĐGNL HSA — HSA Edu 2K9 (Khóa Lẻ 1 Đơn Vị)", "driveFolderUrl": "https://drive.google.com/drive/folders/1n8MDD0giM4kVxjU7bV75vqptkKzb_zjg", "driveUrl": "https://drive.google.com/drive/folders/1n8MDD0giM4kVxjU7bV75vqptkKzb_zjg", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học ĐGNL HSA — HSA Edu 2K9 (Khóa Lẻ 1 Đơn Vị) (HSA EDU — ĐGNL HSA) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô ĐGNL HSA — HSA Edu 2K9 (Khóa Lẻ 1 Đơn Vị) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục ĐGNL HSA — HSA Edu 2K9 (Khóa Lẻ 1 Đơn Vị) (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — HSA", "lessons": [{"id": "K69-HSA-EDU-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi HSA", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: HSA EDU — ĐGNL HSA", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với ĐGNL HSA — HSA Edu 2K9 (Khóa Lẻ 1 Đơn Vị)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-HSA-EDU-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-TSA-BMC", "sku": "DV69TSABMC", "code": "DV69TSABMC", "category": "dgtd_tsa", "categories": ["all", "dgtd_tsa", "lop12_2k9"], "subCategory": "dgtd_tsa", "categoryLabel": "Môn TSA", "title": "ĐGTD TSA — BMC ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị)", "instructor": "BMC — ĐGTD TSA", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · TSA", "groupName": "Khóa Lẻ 69K · Môn TSA", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · TSA", "parentCourseId": "K69-TSA-BMC", "parentSubjectId": "K69-TSA-BMC", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1NWGCb8Aq-fkHTMCX-CrTfB5Yn_uSOQCS", "defaultCover": "https://lh3.googleusercontent.com/d/1NWGCb8Aq-fkHTMCX-CrTfB5Yn_uSOQCS=w960", "cover": "https://lh3.googleusercontent.com/d/1NWGCb8Aq-fkHTMCX-CrTfB5Yn_uSOQCS=w960", "fallbackCover": "", "driveFolderId": "17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe", "driveFolderName": "ĐGTD TSA — BMC ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị)", "driveFolderUrl": "https://drive.google.com/drive/folders/17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe", "driveUrl": "https://drive.google.com/drive/folders/17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học ĐGTD TSA — BMC ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị) (BMC — ĐGTD TSA) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô ĐGTD TSA — BMC ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục ĐGTD TSA — BMC ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị) (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — TSA", "lessons": [{"id": "K69-TSA-BMC-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi TSA", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: BMC — ĐGTD TSA", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với ĐGTD TSA — BMC ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-TSA-BMC-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-TSA-HOCMAI", "sku": "DV69TSAHM", "code": "DV69TSAHM", "category": "dgtd_tsa", "categories": ["all", "dgtd_tsa", "lop12_2k9"], "subCategory": "dgtd_tsa", "categoryLabel": "Môn TSA", "title": "ĐGTD TSA — HocMai ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị)", "instructor": "HOCMAI — ĐGTD TSA", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · TSA", "groupName": "Khóa Lẻ 69K · Môn TSA", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · TSA", "parentCourseId": "K69-TSA-HOCMAI", "parentSubjectId": "K69-TSA-HOCMAI", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1NWGCb8Aq-fkHTMCX-CrTfB5Yn_uSOQCS", "defaultCover": "https://lh3.googleusercontent.com/d/1NWGCb8Aq-fkHTMCX-CrTfB5Yn_uSOQCS=w960", "cover": "https://lh3.googleusercontent.com/d/1NWGCb8Aq-fkHTMCX-CrTfB5Yn_uSOQCS=w960", "fallbackCover": "", "driveFolderId": "1Z71HzRYKoQSv5i-qEWq1iP_icICaB3Lu", "driveFolderName": "ĐGTD TSA — HocMai ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị)", "driveFolderUrl": "https://drive.google.com/drive/folders/1Z71HzRYKoQSv5i-qEWq1iP_icICaB3Lu", "driveUrl": "https://drive.google.com/drive/folders/1Z71HzRYKoQSv5i-qEWq1iP_icICaB3Lu", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học ĐGTD TSA — HocMai ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị) (HOCMAI — ĐGTD TSA) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô ĐGTD TSA — HocMai ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục ĐGTD TSA — HocMai ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị) (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — TSA", "lessons": [{"id": "K69-TSA-HOCMAI-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi TSA", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: HOCMAI — ĐGTD TSA", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với ĐGTD TSA — HocMai ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-TSA-HOCMAI-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-VACT-HOCMAI", "sku": "DV69VACTHM", "code": "DV69VACTHM", "category": "dgnl_vact_bca", "categories": ["all", "dgnl_vact_bca", "lop12_2k9"], "subCategory": "dgnl_vact_bca", "categoryLabel": "Môn V-ACT", "title": "ĐGNL V-ACT — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị)", "instructor": "HOCMAI — ĐGNL V-ACT", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · V-ACT", "groupName": "Khóa Lẻ 69K · Môn V-ACT", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · V-ACT", "parentCourseId": "K69-VACT-HOCMAI", "parentSubjectId": "K69-VACT-HOCMAI", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV", "defaultCover": "https://lh3.googleusercontent.com/d/1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV=w960", "cover": "https://lh3.googleusercontent.com/d/1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV=w960", "fallbackCover": "", "driveFolderId": "1YK2IS2Hzwe4-MqFlJ2kMIJLwDsSPSKuu", "driveFolderName": "ĐGNL V-ACT — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị)", "driveFolderUrl": "https://drive.google.com/drive/folders/1YK2IS2Hzwe4-MqFlJ2kMIJLwDsSPSKuu", "driveUrl": "https://drive.google.com/drive/folders/1YK2IS2Hzwe4-MqFlJ2kMIJLwDsSPSKuu", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học ĐGNL V-ACT — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị) (HOCMAI — ĐGNL V-ACT) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô ĐGNL V-ACT — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục ĐGNL V-ACT — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị) (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — V-ACT", "lessons": [{"id": "K69-VACT-HOCMAI-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi V-ACT", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: HOCMAI — ĐGNL V-ACT", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với ĐGNL V-ACT — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-VACT-HOCMAI-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-VACT-EMPIRE", "sku": "DV69VACTEMP", "code": "DV69VACTEMP", "category": "dgnl_vact_bca", "categories": ["all", "dgnl_vact_bca", "lop12_2k9"], "subCategory": "dgnl_vact_bca", "categoryLabel": "Môn V-ACT", "title": "ĐGNL V-ACT — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị)", "instructor": "EMPIRE TEAM — ĐGNL V-ACT", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · V-ACT", "groupName": "Khóa Lẻ 69K · Môn V-ACT", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · V-ACT", "parentCourseId": "K69-VACT-EMPIRE", "parentSubjectId": "K69-VACT-EMPIRE", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV", "defaultCover": "https://lh3.googleusercontent.com/d/1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV=w960", "cover": "https://lh3.googleusercontent.com/d/1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV=w960", "fallbackCover": "", "driveFolderId": "1ic4g3roCpg7_gkj5JNz9Gre52x_BhyW6", "driveFolderName": "ĐGNL V-ACT — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị)", "driveFolderUrl": "https://drive.google.com/drive/folders/1ic4g3roCpg7_gkj5JNz9Gre52x_BhyW6", "driveUrl": "https://drive.google.com/drive/folders/1ic4g3roCpg7_gkj5JNz9Gre52x_BhyW6", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học ĐGNL V-ACT — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị) (EMPIRE TEAM — ĐGNL V-ACT) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô ĐGNL V-ACT — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục ĐGNL V-ACT — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị) (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — V-ACT", "lessons": [{"id": "K69-VACT-EMPIRE-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi V-ACT", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: EMPIRE TEAM — ĐGNL V-ACT", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với ĐGNL V-ACT — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-VACT-EMPIRE-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}, {"id": "K69-VACT-MAP", "sku": "DV69VACTMAP", "code": "DV69VACTMAP", "category": "dgnl_vact_bca", "categories": ["all", "dgnl_vact_bca", "lop12_2k9"], "subCategory": "dgnl_vact_bca", "categoryLabel": "Môn V-ACT", "title": "ĐGNL V-ACT — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị)", "instructor": "MAPSTUDY — ĐGNL V-ACT", "duration": "Đúng 01 thư mục thầy cô · Video HD + PDF", "lessons": 95, "level": "Khóa Lẻ 69K · V-ACT", "groupName": "Khóa Lẻ 69K · Môn V-ACT", "rating": 5.0, "students": "1.2k+", "price": 69000, "originalPrice": 299000, "singlePrice": 69000, "coursePrice": 69000, "tier": "subject_69k", "tierType": "subject_69k", "subTier": "teacher_69k", "isPackageOnly": false, "tierShortBadge": "KHÓA LẺ 69K", "tierLabel": "Khóa Lẻ 1 Thầy Cô (69K)", "badge": "69K · V-ACT", "parentCourseId": "K69-VACT-MAP", "parentSubjectId": "K69-VACT-MAP", "childCourseIds": [], "extraFolderIds": [], "bannerId": "1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV", "defaultCover": "https://lh3.googleusercontent.com/d/1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV=w960", "cover": "https://lh3.googleusercontent.com/d/1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV=w960", "fallbackCover": "", "driveFolderId": "1dqiwh_ADEBetnPMC0S-YH8M6SLysaEQB", "driveFolderName": "ĐGNL V-ACT — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị)", "driveFolderUrl": "https://drive.google.com/drive/folders/1dqiwh_ADEBetnPMC0S-YH8M6SLysaEQB", "driveUrl": "https://drive.google.com/drive/folders/1dqiwh_ADEBetnPMC0S-YH8M6SLysaEQB", "driveFileId": "", "driveFileName": "", "driveFileUrl": "", "summary": "Mở khóa chính xác 01 thư mục khóa học ĐGNL V-ACT — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị) (MAPSTUDY — ĐGNL V-ACT) trên Google Drive & App Điệp Viên Study.", "description": "Khóa lẻ 69K mở đúng 01 thư mục thầy cô ĐGNL V-ACT — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị) · Đồng bộ học trực tiếp trên Google Drive & Hệ thống học tập.", "highlights": ["Chỉ mở đúng 01 thư mục ĐGNL V-ACT — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị) (không gồm cả môn)", "Tặng kèm App Điệp Viên Study (Email + SĐT)"], "modules": [{"moduleTitle": "Phần 1: Nền Tảng & Trọng Tâm — V-ACT", "lessons": [{"id": "K69-VACT-MAP-L1", "title": "Bài 1: Tổng quan lộ trình & bài giảng cốt lõi V-ACT", "duration": "45:00", "videoUrl": "", "keyFormulas": ["Giảng viên / Đơn vị: MAPSTUDY — ĐGNL V-ACT", "Học kèm ghi chú & tóm tắt AI trực tiếp trên App Điệp Viên Study", "Mở thư mục Google Drive bài giảng HD + PDF tài liệu đính kèm"], "lectureScript": [{"time": "00:00", "text": "Chào mừng bạn đến với ĐGNL V-ACT — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị)."}]}]}, {"moduleTitle": "Phần 2: Kho Video HD & Tài Liệu PDF Trên Google Drive", "lessons": [{"id": "K69-VACT-MAP-L2", "title": "Bài 2: Luyện đề thực chiến & mở toàn bộ thư mục Google Drive", "duration": "60:00", "videoUrl": "", "keyFormulas": ["Mở đúng thư mục khóa học được cấp quyền riêng cho Email của bạn"], "lectureScript": [{"time": "00:00", "text": "Bấm Mở Thư Mục Google Drive để học toàn bộ video bài giảng."}]}]}]}];
const COURSE_DRIVE_MAP = {
  "ALL-COURSES-399K": {
    "name": "Gói VIP Full Trọn Bộ 37 Khóa Học & Luyện Đề 2027 (69K + 199K)",
    "sku": "DVFULL399",
    "tier": "full_399k",
    "price": 399000,
    "folderId": "1xEi1TWFZKLTBBp4tJVXoOv9XB9qNUo_a",
    "extraFolderIds": [
      "1ZlYt4iot-K6d0fZTb7hGwwnRgUV6Pdwh"
    ],
    "folderUrl": "https://drive.google.com/drive/folders/1xEi1TWFZKLTBBp4tJVXoOv9XB9qNUo_a",
    "bannerId": "",
    "bannerUrl": ""
  },
  "C199-KHTN1": {
    "name": "Combo 199K: KHTN 1 — Toán, Vật Lý, Sinh",
    "sku": "DV199KHTN1",
    "tier": "course_199k",
    "price": 199000,
    "folderId": "1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo",
    "extraFolderIds": [
      "1UxEYANVp1iw9Us0mSNJR8w9_VFhsx3MP",
      "1m__F2exCz50iNJXhf0JR4TramO29K244"
    ],
    "folderUrl": "https://drive.google.com/drive/folders/1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo",
    "bannerId": "1SbkCdDoJ-EiGDXSq5WFpC8V8rdiKPGmW",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1SbkCdDoJ-EiGDXSq5WFpC8V8rdiKPGmW=w960"
  },
  "C199-KHTN2": {
    "name": "Combo 199K: KHTN 2 — Toán, Vật Lý, Anh",
    "sku": "DV199KHTN2",
    "tier": "course_199k",
    "price": 199000,
    "folderId": "1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo",
    "extraFolderIds": [
      "1Mz6IblP1vwlLKj9XKBAq4BFnKJBcwqSP",
      "1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1"
    ],
    "folderUrl": "https://drive.google.com/drive/folders/1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo",
    "bannerId": "1MoGqdKZUOHr6MtVgcQbJ-Ma3ykVQDppw",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1MoGqdKZUOHr6MtVgcQbJ-Ma3ykVQDppw=w960"
  },
  "C199-KHXH1": {
    "name": "Combo 199K: KHXH 1 — Ngữ Văn, Lịch Sử, Địa Lý",
    "sku": "DV199KHXH1",
    "tier": "course_199k",
    "price": 199000,
    "folderId": "1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT",
    "extraFolderIds": [
      "1klZMAdkSnSXXSb72fTiKOZnL11EPYswu",
      "16WO3g17nelhGfCzNNaptvgKp0iYzAlvm"
    ],
    "folderUrl": "https://drive.google.com/drive/folders/1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT",
    "bannerId": "1Qq9CO0m5D8GEQWbT1fcaMAClo_6snzXe",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1Qq9CO0m5D8GEQWbT1fcaMAClo_6snzXe=w960"
  },
  "C199-KHXH2": {
    "name": "Combo 199K: KHXH 2 — Toán, Văn, Anh",
    "sku": "DV199KHXH2",
    "tier": "course_199k",
    "price": 199000,
    "folderId": "1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo",
    "extraFolderIds": [
      "1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT",
      "1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1"
    ],
    "folderUrl": "https://drive.google.com/drive/folders/1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo",
    "bannerId": "13D6zA1O05AOk0pvoOj6cZL3BrnAzrMlR",
    "bannerUrl": "https://lh3.googleusercontent.com/d/13D6zA1O05AOk0pvoOj6cZL3BrnAzrMlR=w960"
  },
  "C199-HSA": {
    "name": "Combo 199K: Khóa Đánh Giá Năng Lực HSA (ĐHQG Hà Nội)",
    "sku": "DV199HSA",
    "tier": "course_199k",
    "price": 199000,
    "folderId": "1XZj-uhExqqkupmmRbxmX08AB-NhgCcxi",
    "extraFolderIds": [
      "11RHLlw-99okBQTqk6Dp4DxlucorjoW6p",
      "1yNPB1d_GzfvPDp6dIpGQtBKp1-L6HkrN",
      "1n8MDD0giM4kVxjU7bV75vqptkKzb_zjg"
    ],
    "folderUrl": "https://drive.google.com/drive/folders/1XZj-uhExqqkupmmRbxmX08AB-NhgCcxi",
    "bannerId": "1lJAFhSnTLFhRjO_npIAg2rK_sLJutC_C",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1lJAFhSnTLFhRjO_npIAg2rK_sLJutC_C=w960"
  },
  "C199-TSA": {
    "name": "Combo 199K: Khóa Đánh Giá Tư Duy TSA (ĐH Bách Khoa HN)",
    "sku": "DV199TSA",
    "tier": "course_199k",
    "price": 199000,
    "folderId": "17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe",
    "extraFolderIds": [
      "1Z71HzRYKoQSv5i-qEWq1iP_icICaB3Lu"
    ],
    "folderUrl": "https://drive.google.com/drive/folders/17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe",
    "bannerId": "1JtFtLXmTGByHdNVUlWbiGgbFyhV0o_03",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1JtFtLXmTGByHdNVUlWbiGgbFyhV0o_03=w960"
  },
  "C199-VACT": {
    "name": "Combo 199K: Khóa Đánh Giá Năng Lực V-ACT (ĐHQG TP.HCM)",
    "sku": "DV199VACT",
    "tier": "course_199k",
    "price": 199000,
    "folderId": "1YK2IS2Hzwe4-MqFlJ2kMIJLwDsSPSKuu",
    "extraFolderIds": [
      "1ic4g3roCpg7_gkj5JNz9Gre52x_BhyW6",
      "1dqiwh_ADEBetnPMC0S-YH8M6SLysaEQB"
    ],
    "folderUrl": "https://drive.google.com/drive/folders/1YK2IS2Hzwe4-MqFlJ2kMIJLwDsSPSKuu",
    "bannerId": "15Bzsd08qpjo8L3SlaxLsq3RHr6oOIt10",
    "bannerUrl": "https://lh3.googleusercontent.com/d/15Bzsd08qpjo8L3SlaxLsq3RHr6oOIt10=w960"
  },
  "K69-TOAN-DUC": {
    "name": "Toán Thầy Đỗ Văn Đức (TenSchool 2K9)",
    "sku": "DV69TOANDUC",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1i4RBCS2J7QAixPOgmZCpWvV7X3MBM3fo",
    "bannerId": "19dsgaplgZ8jGd3QuFmOFSP8R1wIa4h9u",
    "bannerUrl": "https://lh3.googleusercontent.com/d/19dsgaplgZ8jGd3QuFmOFSP8R1wIa4h9u=w960"
  },
  "K69-TOAN-TIEN": {
    "name": "Toán Thầy Nguyễn Phan Tiến 2K9",
    "sku": "DV69TOANTIEN",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1b73Z89zxCGINyuOVm4pImxwkj2UTidC1",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1b73Z89zxCGINyuOVm4pImxwkj2UTidC1",
    "bannerId": "1T9k1aHqUdKGfzzCeePudB3408I2f86Ek",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1T9k1aHqUdKGfzzCeePudB3408I2f86Ek=w960"
  },
  "K69-TOAN-SHIPPER": {
    "name": "Toán Anh Shiper 2K9",
    "sku": "DV69TOANSHIP",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1npBDPOm0un8fpiwhXqnTElSyJCxHEq1n",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1npBDPOm0un8fpiwhXqnTElSyJCxHEq1n",
    "bannerId": "1CNcGxedxoB0rVxxBJvah1dP-2x23Hf8l",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1CNcGxedxoB0rVxxBJvah1dP-2x23Hf8l=w960"
  },
  "K69-TOAN-MAP": {
    "name": "Toán — Tổ Toán Học MapStudy 2K9",
    "sku": "DV69TOANMAP",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1Lvx2x6Gz66gNzgHWOn4DjF6m0a8MhuPA",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1Lvx2x6Gz66gNzgHWOn4DjF6m0a8MhuPA",
    "bannerId": "1UzEyvawDLZyQaqLjLTRAzLZBLXAzLtGd",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1UzEyvawDLZyQaqLjLTRAzLZBLXAzLtGd=w960"
  },
  "K69-TOAN-NT": {
    "name": "Nền Tảng Toán Thầy Lưu Huy Thưởng",
    "sku": "DV69TOANNT",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1kme7eKb-PLV_suK3UVLJYEQKMB5BuP6A",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1kme7eKb-PLV_suK3UVLJYEQKMB5BuP6A",
    "bannerId": "1kbpgW03rnk3_Scg31efEyZGhjFgSBtPV",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1kbpgW03rnk3_Scg31efEyZGhjFgSBtPV=w960"
  },
  "K69-LY-BIEN": {
    "name": "Vật Lý Thầy Chu Văn Biên 2K9",
    "sku": "DV69LYBIEN",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1UxEYANVp1iw9Us0mSNJR8w9_VFhsx3MP",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1UxEYANVp1iw9Us0mSNJR8w9_VFhsx3MP",
    "bannerId": "1Qk1eh8MSussintaXSMK2G1iy9zCKehkw",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1Qk1eh8MSussintaXSMK2G1iy9zCKehkw=w960"
  },
  "K69-LY-TIEN": {
    "name": "Vật Lý Thầy Thắng · Thầy Tiến IPClass 2K9",
    "sku": "DV69LYTIEN",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1Mz6IblP1vwlLKj9XKBAq4BFnKJBcwqSP",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1Mz6IblP1vwlLKj9XKBAq4BFnKJBcwqSP",
    "bannerId": "1BQdHHWXd9iBGH09xq2LjhBbG9WVgo4ih",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1BQdHHWXd9iBGH09xq2LjhBbG9WVgo4ih=w960"
  },
  "K69-LY-UNG": {
    "name": "Vật Lý Thầy Lê Tùng Ưng (TenS 2K9)",
    "sku": "DV69LYUNG",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "11QpRWPh7KFv6z3ehH9PyF2rSZBJkvjIU",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/11QpRWPh7KFv6z3ehH9PyF2rSZBJkvjIU",
    "bannerId": "1wvE4YqVQ8QvPPwN6DrdpT1Kw7HequIiw",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1wvE4YqVQ8QvPPwN6DrdpT1Kw7HequIiw=w960"
  },
  "K69-HOA-TRONG": {
    "name": "Hóa Học Thầy Phạm Văn Trọng 2K9",
    "sku": "DV69HOATRONG",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1GG-0AuynJUnQZZKXcrlQpRuTFsye6aQk",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1GG-0AuynJUnQZZKXcrlQpRuTFsye6aQk",
    "bannerId": "1FJN2iWnh8OO7Mb2SqiA9gmsxeWNRUsk1",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1FJN2iWnh8OO7Mb2SqiA9gmsxeWNRUsk1=w960"
  },
  "K69-HOA-NGOC": {
    "name": "Nền Tảng Hóa Thầy Vũ Khắc Ngọc & Cô Tống Thị Son",
    "sku": "DV69HOANGOC",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1vMyBdrXbe_YdZwMOgw9OfTZMrY-9vHXe",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1vMyBdrXbe_YdZwMOgw9OfTZMrY-9vHXe",
    "bannerId": "1DmSD53JWqo4mPMqvkg8HW4SgbirM69zq",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1DmSD53JWqo4mPMqvkg8HW4SgbirM69zq=w960"
  },
  "K69-VAN-SM": {
    "name": "Học Văn Cô Sương Mai 2K9",
    "sku": "DV69VANSM",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1BCgSdV1PUChvoy5P85m8QxklO1ApXdTT",
    "bannerId": "168PvC5P4T3pnHuCQteIB6MwyAseMHgCP",
    "bannerUrl": "https://lh3.googleusercontent.com/d/168PvC5P4T3pnHuCQteIB6MwyAseMHgCP=w960"
  },
  "K69-VAN-NT": {
    "name": "Nền Tảng 12 Môn Ngữ Văn (HocMai)",
    "sku": "DV69VANNT",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1D9xa1GYZZEDVhxfvQq-i1xlWim66zikF",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1D9xa1GYZZEDVhxfvQq-i1xlWim66zikF",
    "bannerId": "1k6hnaIY3HWrymuoZclECCa6lGgtbjyND",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1k6hnaIY3HWrymuoZclECCa6lGgtbjyND=w960"
  },
  "K69-ANH-MP": {
    "name": "Tiếng Anh Cô Vũ Mai Phương 2K9",
    "sku": "DV69ANHMP",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1wS0ZGPRPrv52DodhIDIUTgfzumu-3jW1",
    "bannerId": "1jSW8AIaIx_1bAgb0SfzzeQbyzIXQldd5",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1jSW8AIaIx_1bAgb0SfzzeQbyzIXQldd5=w960"
  },
  "K69-ANH-LIEU": {
    "name": "Tiếng Anh Cô Phạm Liễu 2K9",
    "sku": "DV69ANHLIEU",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1Antqpjjo7hKQI_RqlDT3FW8kSTJGHGMw",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1Antqpjjo7hKQI_RqlDT3FW8kSTJGHGMw",
    "bannerId": "1WrZj1RIOVrXcAJAaMoQm585xqyK4lAwa",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1WrZj1RIOVrXcAJAaMoQm585xqyK4lAwa=w960"
  },
  "K69-ANH-NT": {
    "name": "Nền Tảng 12 Môn Tiếng Anh (HocMai)",
    "sku": "DV69ANHNT",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1-sSo3zBXFRoXfQHkSdIOxmH2MkAvEqKM",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1-sSo3zBXFRoXfQHkSdIOxmH2MkAvEqKM",
    "bannerId": "19jS05grnW40e4meXVPn7a7RvtUEAl19x",
    "bannerUrl": "https://lh3.googleusercontent.com/d/19jS05grnW40e4meXVPn7a7RvtUEAl19x=w960"
  },
  "K69-SINH-NGHE": {
    "name": "Sinh Học Thầy Phan Khắc Nghệ 2K9",
    "sku": "DV69SINHNGHE",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1m__F2exCz50iNJXhf0JR4TramO29K244",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1m__F2exCz50iNJXhf0JR4TramO29K244",
    "bannerId": "12O7FO6DnKouHOcvAh9LayMHGCbqWsKmn",
    "bannerUrl": "https://lh3.googleusercontent.com/d/12O7FO6DnKouHOcvAh9LayMHGCbqWsKmn=w960"
  },
  "K69-SINH-DUONG": {
    "name": "Nền Tảng Sinh Học Cô Ánh Dương",
    "sku": "DV69SINHDUONG",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "13F0pQtUG-1yix2XrSQo9TkSw8-_UAAio",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/13F0pQtUG-1yix2XrSQo9TkSw8-_UAAio",
    "bannerId": "1HfwO2IBd44nJtu3b1rfETYWnpY_jR786",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1HfwO2IBd44nJtu3b1rfETYWnpY_jR786=w960"
  },
  "K69-SU-HUONG": {
    "name": "Lịch Sử Cô Ngô Thị Lan Hương 2K9",
    "sku": "DV69SUHUONG",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1klZMAdkSnSXXSb72fTiKOZnL11EPYswu",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1klZMAdkSnSXXSb72fTiKOZnL11EPYswu",
    "bannerId": "1J3zG22zlrTo9otUpc5qATJ4n9TL_k4aK",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1J3zG22zlrTo9otUpc5qATJ4n9TL_k4aK=w960"
  },
  "K69-SU-SEN": {
    "name": "Lịch Sử Cô Nguyễn Hương Sen 2K9",
    "sku": "DV69SUSEN",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1B_IXBTxhmhZtW5fzln4-uxv-QTq39p6t",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1B_IXBTxhmhZtW5fzln4-uxv-QTq39p6t",
    "bannerId": "1vEP_SFENSGRnYXCAHwdEOxD-LWUCI-0e",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1vEP_SFENSGRnYXCAHwdEOxD-LWUCI-0e=w960"
  },
  "K69-DIA-TUNG": {
    "name": "Địa Lý Thầy Đàm Thanh Tùng 2K9",
    "sku": "DV69DIATUNG",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "16WO3g17nelhGfCzNNaptvgKp0iYzAlvm",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/16WO3g17nelhGfCzNNaptvgKp0iYzAlvm",
    "bannerId": "1U3AfsKTzFWPz-vFY2nd9eu2kw7eSWKNo",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1U3AfsKTzFWPz-vFY2nd9eu2kw7eSWKNo=w960"
  },
  "K69-DIA-TAI": {
    "name": "Địa Lý Thầy Tài 2K9",
    "sku": "DV69DIATAI",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1DasmiM670vDu3CekdeXCoQeQoeLvKYyq",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1DasmiM670vDu3CekdeXCoQeQoeLvKYyq",
    "bannerId": "1-GNWHI3J3DUR_W4GGEcJx8G4ZWKIt-Iq",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1-GNWHI3J3DUR_W4GGEcJx8G4ZWKIt-Iq=w960"
  },
  "K69-HSA-HOCMAI": {
    "name": "ĐGNL HSA / QDA — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị)",
    "sku": "DV69HSAHM",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1XZj-uhExqqkupmmRbxmX08AB-NhgCcxi",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1XZj-uhExqqkupmmRbxmX08AB-NhgCcxi",
    "bannerId": "1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu=w960"
  },
  "K69-HSA-MAP": {
    "name": "ĐGNL HSA — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị)",
    "sku": "DV69HSAMAP",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "11RHLlw-99okBQTqk6Dp4DxlucorjoW6p",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/11RHLlw-99okBQTqk6Dp4DxlucorjoW6p",
    "bannerId": "1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu=w960"
  },
  "K69-HSA-EMPIRE": {
    "name": "ĐGNL HSA — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị)",
    "sku": "DV69HSAEMP",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1yNPB1d_GzfvPDp6dIpGQtBKp1-L6HkrN",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1yNPB1d_GzfvPDp6dIpGQtBKp1-L6HkrN",
    "bannerId": "1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu=w960"
  },
  "K69-HSA-EDU": {
    "name": "ĐGNL HSA — HSA Edu 2K9 (Khóa Lẻ 1 Đơn Vị)",
    "sku": "DV69HSAEDU",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1n8MDD0giM4kVxjU7bV75vqptkKzb_zjg",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1n8MDD0giM4kVxjU7bV75vqptkKzb_zjg",
    "bannerId": "1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1K_Mgvt-b_rbvzrm2tsAgXU8losWOmtxu=w960"
  },
  "K69-TSA-BMC": {
    "name": "ĐGTD TSA — BMC ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị)",
    "sku": "DV69TSABMC",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/17LjoTYOyxgVo2MYk6MpWfK681vqWwgbe",
    "bannerId": "1NWGCb8Aq-fkHTMCX-CrTfB5Yn_uSOQCS",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1NWGCb8Aq-fkHTMCX-CrTfB5Yn_uSOQCS=w960"
  },
  "K69-TSA-HOCMAI": {
    "name": "ĐGTD TSA — HocMai ĐHBK Hà Nội 2027 (Khóa Lẻ 1 Đơn Vị)",
    "sku": "DV69TSAHM",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1Z71HzRYKoQSv5i-qEWq1iP_icICaB3Lu",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1Z71HzRYKoQSv5i-qEWq1iP_icICaB3Lu",
    "bannerId": "1NWGCb8Aq-fkHTMCX-CrTfB5Yn_uSOQCS",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1NWGCb8Aq-fkHTMCX-CrTfB5Yn_uSOQCS=w960"
  },
  "K69-VACT-HOCMAI": {
    "name": "ĐGNL V-ACT — HocMai 2K9 (Khóa Lẻ 1 Đơn Vị)",
    "sku": "DV69VACTHM",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1YK2IS2Hzwe4-MqFlJ2kMIJLwDsSPSKuu",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1YK2IS2Hzwe4-MqFlJ2kMIJLwDsSPSKuu",
    "bannerId": "1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV=w960"
  },
  "K69-VACT-EMPIRE": {
    "name": "ĐGNL V-ACT — Empire Team 2K9 (Khóa Lẻ 1 Đơn Vị)",
    "sku": "DV69VACTEMP",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1ic4g3roCpg7_gkj5JNz9Gre52x_BhyW6",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1ic4g3roCpg7_gkj5JNz9Gre52x_BhyW6",
    "bannerId": "1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV=w960"
  },
  "K69-VACT-MAP": {
    "name": "ĐGNL V-ACT — MapStudy 2K9 (Khóa Lẻ 1 Đơn Vị)",
    "sku": "DV69VACTMAP",
    "tier": "subject_69k",
    "price": 69000,
    "folderId": "1dqiwh_ADEBetnPMC0S-YH8M6SLysaEQB",
    "extraFolderIds": [],
    "folderUrl": "https://drive.google.com/drive/folders/1dqiwh_ADEBetnPMC0S-YH8M6SLysaEQB",
    "bannerId": "1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV",
    "bannerUrl": "https://lh3.googleusercontent.com/d/1xzfMyWWiWa8jR5iK6GVykEtEfdZmCaoV=w960"
  }
};
const APP_DOWNLOAD_LINKS = {
"windows_zip_drive_id": "1hh3zp7-X3leDex77Rf76W9BeiJzEUZkf",
"windows_zip_direct_url": "https://drive.google.com/uc?export=download&id=1hh3zp7-X3leDex77Rf76W9BeiJzEUZkf",
"windows_exe_relative_url": "DiepVienStudy_Setup.exe",
"macos_zip_drive_id": "1WMGpwANae4qOCM9hQ8FTI5poZwVfP2lf",
"macos_zip_direct_url": "https://drive.google.com/uc?export=download&id=1WMGpwANae4qOCM9hQ8FTI5poZwVfP2lf",
"windowsZipDriveId": "1hh3zp7-X3leDex77Rf76W9BeiJzEUZkf",
"windowsZipDirectUrl": "https://drive.google.com/uc?export=download&id=1hh3zp7-X3leDex77Rf76W9BeiJzEUZkf",
"windowsZipViewUrl": "https://drive.google.com/file/d/1hh3zp7-X3leDex77Rf76W9BeiJzEUZkf/view?usp=sharing",
"windowsExeDirectUrl": "downloads/DiepVienStudy_Setup.exe",
"macosZipDriveId": "1WMGpwANae4qOCM9hQ8FTI5poZwVfP2lf",
"macosZipDirectUrl": "https://drive.google.com/uc?export=download&id=1WMGpwANae4qOCM9hQ8FTI5poZwVfP2lf",
"macosZipViewUrl": "https://drive.google.com/file/d/1WMGpwANae4qOCM9hQ8FTI5poZwVfP2lf/view?usp=sharing"
};
const PAYMENT_INFO = {
bankName: "ACB",
bankCode: "ACB",
accountName: "TRINH DUC THINH",
accountNumber: "27820961",
provider: "Ngân hàng ACB - Chuyển khoản 24/7",
qrBaseUrl: "https://img.vietqr.io/image/ACB-27820961-compact2.png"
};
const RECENT_PURCHASES_STREAM = [
{ name: "Nguyễn Minh H***", school: "NEU", item: "Mở Khóa Trọn Bộ Full Cả App Điệp Viên Study (399K)", time: "Vừa xong" },
{ name: "Trần Thu H***", school: "FTU", item: "Đề Cương Kinh Tế Lượng — FTU (50K)", time: "1 phút trước" },
{ name: "Lê Hoàng B***", school: "BKHN", item: "Khóa Đánh Giá Tư Duy TSA Bách Khoa (199K)", time: "2 phút trước" },
{ name: "Phạm Quốc T***", school: "VNU", item: "Khóa ĐGNL HSA ĐHQG Hà Nội — Phần Định Lượng (199K)", time: "3 phút trước" },
{ name: "Vũ Ngọc A***", school: "2K9", item: "Khóa Vật Lý 12 (2K9) — Thầy Vũ Ngọc Anh (199K)", time: "4 phút trước" },
{ name: "Hoàng Gia K***", school: "TMU", item: "Đặt Làm Tiểu Luận Quản Trị Học (Cọc 50K)", time: "5 phút trước" }
];
const FAQ_DATABASE = [
{
question: "Sau khi chuyển khoản bao lâu thì tôi nhận được Khóa học / Đề cương?",
answer: "Hệ thống AutoPay 24/7 quét biến động số dư ngân hàng ACB tự động chỉ sau 10 - 30 giây. Ngay khi khớp lệnh, hệ thống tự động cấp quyền Google Drive vào đúng địa chỉ Gmail của bạn và kích hoạt tài khoản App Điệp Viên Study."
},
{
question: "Làm sao để tải APP Diep Vien study về máy tính?",
answer: "Bạn bấm nút 'APP Diep Vien study' ngay trên thanh menu Website, điền Tên đăng nhập và Email của bạn để mở khóa nút Tải App, hoặc đăng nhập tài khoản để hệ thống tự động tải bộ cài về máy."
}
];
const APP_CONFIG = {
brandName: "Điệp Viên Tài Liệu",
slogan: "Bản Quyền Đề Cương & Dịch Vụ Học Thuật Số 1 Sinh Viên",
zaloUrl: "https://zalo.me/0792453169",
phone: "0792 453 169",
emailSupport: "support@diepvientailieu.vn",
defaultWebhookUrl: "https://script.google.com/macros/s/AKfycbxMOdsNkhY8-5xQtZ_86STf781VdFJbRsLkK6n8qRF4ENqreMsl4CdELYn-85wHcqvx/exec"
};
