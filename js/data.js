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





// ==========================================================================

// ACADEMIC DISCIPLINE & UNIVERSITY SPECIALTY CLASSIFIER

// ==========================================================================

function getDocDiscipline(doc) {

    if (!doc) return "DAI_CUONG";

    const text = ((doc.baseName || "") + " " + (doc.rawName || "") + " " + (doc.category || "")).toLowerCase();

    

    // 1. General Education (Triết, Mác, Lịch sử Đảng, Tư tưởng HCM, PLDC, Toán cao cấp, Giải tích, ĐSTT, XXTK, GDTC, GDQP, Logic)

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



    // 2. Technology & IT (Lập trình, CSDL, SQL, Python, C++, Java, Mạng, An toàn thông tin, CNTT...)

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



    // 3. Foreign Languages & Linguistics (Tiếng Anh, Tiếng Trung, Tiếng Hàn, Tiếng Nhật, Ngôn ngữ học, Dịch thuật...)

    if (

        text.includes("tiếng anh") || text.includes("tiếng trung") || text.includes("tiếng hàn") ||

        text.includes("tiếng nhật") || text.includes("hsk") || text.includes("ielts") ||

        text.includes("toeic") || text.includes("topik") || text.includes("jlpt") ||

        text.includes("ngôn ngữ") || text.includes("ngoại ngữ") || text.includes("dịch thuật") ||

        text.includes("ngữ âm") || text.includes("ngữ pháp")

    ) {

        return "NGOAI_NGU";

    }



    // 4. Law (Luật dân sự, hình sự, kinh tế, thương mại, tố tụng...)

    if (

        text.includes("luật") || text.includes("pháp lý") || text.includes("tố tụng") ||

        text.includes("pháp luật") || text.includes("tư pháp") || text.includes("hiến pháp")

    ) {

        return "LUAT";

    }



    // 5. Tourism & Hospitality (Du lịch, Khách sạn, Nhà hàng, Hướng dẫn viên, Lễ tân, Buồng phòng...)

    if (

        text.includes("du lịch") || text.includes("khách sạn") || text.includes("nhà hàng") ||

        text.includes("hướng dẫn") || text.includes("lễ tân") || text.includes("buồng phòng") ||

        text.includes("tuyến điểm")

    ) {

        return "DU_LICH";

    }



    // 6. Pedagogy & Education (Sư phạm, Giáo dục học, Dạy học...)

    if (

        text.includes("sư phạm") || text.includes("giáo dục học") || text.includes("dạy học") ||

        text.includes("quản lý giáo dục") || text.includes("tâm lý học sư phạm")

    ) {

        return "SU_PHAM";

    }



    // 7. Finance, Banking, Accounting (Tài chính, Ngân hàng, Kế toán, Kiểm toán, Thuế, Chứng khoán...)

    if (

        text.includes("tài chính") || text.includes("ngân hàng") || text.includes("kế toán") ||

        text.includes("kiểm toán") || text.includes("thuế") || text.includes("chứng khoán") ||

        text.includes("kinh tế lượng") || text.includes("tiền tệ") || text.includes("định giá") ||

        text.includes("tài chính - ngân hàng")

    ) {

        return "TAI_CHINH";

    }



    // 8. Management, Business, Marketing (Quản trị, Marketing, Logistics, Thương mại...)

    if (

        text.includes("quản trị") || text.includes("marketing") || text.includes("logistics") ||

        text.includes("thương mại điện tử") || text.includes("hành vi người tiêu dùng") ||

        text.includes("chuỗi cung ứng") || text.includes("kinh doanh") || text.includes("kinh tế vi mô") ||

        text.includes("kinh tế vĩ mô") || text.includes("kinh tế quốc tế") || text.includes("kinh tế phát triển") ||

        text.includes("kinh tế & thống kê") || text.includes("kinh tế")

    ) {

        return "QUAN_TRI";

    }



    // 9. Social Sciences, Media, Journalism (Tâm lý, Xã hội, Báo chí, Truyền thông...)

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



    // 1. Ngoại ngữ chuyên biệt: ULIS, HUFL (Huế)

    if (id === "ulis" || id === "hufl") {

        set.add("NGOAI_NGU");

        set.add("SU_PHAM");

        return set;

    }

    // Ngoại ngữ - Tin học

    if (id === "huflit") {

        set.add("NGOAI_NGU");

        set.add("CONG_NGHE");

        set.add("QUAN_TRI");

        set.add("DU_LICH");

        return set;

    }



    // 2. Chuyên Luật: HLU (ĐH Luật Hà Nội), HUL (ĐH Luật Huế)

    if (id === "hlu" || id === "hul") {

        set.add("LUAT");

        return set;

    }



    // 3. Kỹ thuật & Công nghệ thuần túy: BKHN, UET, PTIT, Bách Khoa ĐN, Bách Khoa HCM...

    const isTechPure = ["bkhn", "uet", "ptit", "dut", "hcmut", "haui", "iuh", "utt", "humg", "huce", "tlu", "phenikaa", "eaut", "hcmus", "hus"].includes(id);

    if (isTechPure) {

        set.add("CONG_NGHE");

        set.add("QUAN_TRI"); // Có Viện Quản lý/Kinh tế công nghiệp

        return set;

    }



    // 4. Chuyên Sư phạm

    if (["hnue", "hnue2", "hcmue", "ued", "dhsphue", "niem"].includes(id)) {

        set.add("SU_PHAM");

        set.add("NGOAI_NGU");

        set.add("XA_HOI");

        return set;

    }



    // 5. Xã hội & Nhân văn, Báo chí, Ngoại giao

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



    // 6. Chuyên Kinh tế & Tài chính - Ngân hàng

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



    // 7. Y dược, Nghệ thuật

    if (name.includes("y dược") || name.includes("y hà nội") || name.includes("mỹ thuật") || name.includes("nhạc viện") || name.includes("kiến trúc")) {

        set.add("XA_HOI");

        return set;

    }



    // 8. Đa ngành tổng hợp (Đại Nam, Thăng Long, Văn Lang, HUTECH, Duy Tân, Mở, Cần Thơ, Hải Phòng, Hồng Đức...)

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



const REAL_DOCUMENTS_DATABASE = [

    {

        "id": "REAL-DOC-078",

        "code": "THML",

        "baseName": "Đề Cương Triết Học Mác - Lênin",

        "rawName": "Đề Cương Triết Học Mác - Lênin.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 24,

        "rating": 5,

        "reviewsCount": 209,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1VVoxbJb10Q7nN56hGrHn8JhKWBfkHyo-",

        "isReal": true,

        "university": "ueb",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-069",

        "code": "KTCT",

        "baseName": "Đề Cương Kinh Tế Chính Trị",

        "rawName": "Đề Cương Kinh Tế Chính Trị.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 24,

        "rating": 5,

        "reviewsCount": 376,

        "downloads": "3.0k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1mP93QcDEF_UMnQPIt1xamsJ2dJe-DmCC",

        "isReal": true,

        "university": "dav",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-009",

        "code": "CNXH",

        "baseName": "Đề Cương Chủ Nghĩa Xã Hội",

        "rawName": "Đề Cương Chủ Nghĩa Xã Hội",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 26,

        "rating": 5,

        "reviewsCount": 316,

        "downloads": "2.0k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1vgXjQyFA33kFTFhTqSyHPqPLioJTZVBC",

        "isReal": true,

        "university": "ussh",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-079",

        "code": "TTHCM2",

        "baseName": "Đề Cương Tư Tưởng Hồ Chí Minh",

        "rawName": "Đề Cương Tư Tưởng Hồ Chí Minh",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 25,

        "rating": 4.8,

        "reviewsCount": 226,

        "downloads": "1.5k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1LZTzKzwXIQ5RL5p8yf6nUbXqS-BCNVd9OvncudDW15U",

        "isReal": true,

        "university": "ulis",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-079",

        "code": "TTHCM",

        "baseName": "Đề Cương Tư Tưởng Hồ Chí Minh",

        "rawName": "Đề Cương Tư Tưởng Hồ Chí Minh",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 25,

        "rating": 4.8,

        "reviewsCount": 226,

        "downloads": "1.5k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "11Igl74fSTCtgvXlz55oJyil7fMbSeyaf",

        "isReal": true,

        "university": "ulis",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-135",

        "code": "LSNN2",

        "baseName": "Đề Cương Lịch Sử Nhà Nước",

        "rawName": "Đề Cương Lịch Sử Nhà Nước.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 26,

        "rating": 5,

        "reviewsCount": 218,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1uYOG--aNQ_sB8E-AOX_Ippo5-4l0VwNG",

        "isReal": true,

        "university": "uet",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-135",

        "code": "LSNN",

        "baseName": "Đề Cương Lịch Sử Nhà Nước",

        "rawName": "Đề Cương Lịch Sử Nhà Nước",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 26,

        "rating": 5,

        "reviewsCount": 218,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1GmcJwFxdoxMeQ6cZukGairpPpdboVK6f63B95lXSpaQ",

        "isReal": true,

        "university": "uet",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-030",

        "code": "LSVMTG",

        "baseName": "Đề Cương Lịch Sử Văn Minh Thế Giới",

        "rawName": "Đề Cương Lịch Sử Văn Minh Thế Giới.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 353,

        "downloads": "1.6k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1Mosqqe1FamteGhHdIiHkISOUK5jCubqi",

        "isReal": true,

        "university": "dnu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-032",

        "code": "PLDC",

        "baseName": "Đề Cương Pháp Luật Đại Cương",

        "rawName": "Đề Cương Pháp Luật Đại Cương.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 22,

        "rating": 4.9,

        "reviewsCount": 387,

        "downloads": "1.8k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1EGZD1RaNRHnmEST3Gn4V2ZhwmMxtBDsf",

        "isReal": true,

        "university": "tcnh_hn",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-145",

        "code": "TCC2",

        "baseName": "Đề Cương Toán Cao Cấp",

        "rawName": "Đề Cương Toán Cao Cấp.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 388,

        "downloads": "3.1k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1sblmGWvZ-Yb_xH4_cPU0AiIlDNbhQzVv",

        "isReal": true,

        "university": "ulis",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-086",

        "code": "GT",

        "baseName": "Đề Cương Giải Tích",

        "rawName": "Đề Cương Giải Tích.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 345,

        "downloads": "2.2k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1r2mpHD25vTR-FjamQAoqoQzL6o1uXKMj",

        "isReal": true,

        "university": "vanlang",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-013",

        "code": "TKT",

        "baseName": "Đề Cương Toán Kinh Tế",

        "rawName": "Đề Cương Toán Kinh Tế",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 384,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1qzOMRPRBnZbOPfNqF62vTDaP_PFFocj3Kupmg5eNXmA",

        "isReal": true,

        "university": "neu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-153",

        "code": "XSTK",

        "baseName": "Đề Cương Xác Suất Thống Kê",

        "rawName": "Đề Cương Xác Suất Thống Kê",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 204,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1mCRw9fpnI9o7BCwLdwyYtTng4cI4yE_5",

        "isReal": true,

        "university": "ueh",

        "driveType": "folder"

    },

    {

        "id": "REAL-DOC-006",

        "code": "NLTK",

        "baseName": "Đề Cương Nguyên Lý Thống Kê",

        "rawName": "Đề Cương Nguyên Lý Thống Kê",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 265,

        "downloads": "1.7k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1fzfIfpR9Bt3TPBbSbJQSd-5Fci2P2gFks70A2ykKHbw",

        "isReal": true,

        "university": "bkhn",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-021",

        "code": "TKH",

        "baseName": "Đề Cương Thống Kê Học",

        "rawName": "Đề Cương Thống Kê Học",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 200,

        "downloads": "3.2k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "124Zy8xWKp4LEA7uSgNpw5-Og3oW26hIk1PMaBKlCsR8",

        "isReal": true,

        "university": "ueh",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-143",

        "code": "KTVM",

        "baseName": "Đề Cương Kinh Tế Vi Mô",

        "rawName": "Đề Cương Kinh Tế Vi Mô.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 354,

        "downloads": "2.9k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1hp6XONj2DhVkDp1aVwLy1JcXDztUnjq3",

        "isReal": true,

        "university": "neu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-056",

        "code": "KTVM2",

        "baseName": "Đề Cương Kinh Tế Vĩ Mô",

        "rawName": "Đề Cương Kinh Tế Vĩ Mô.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 475,

        "downloads": "1.7k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1-XYFxIpUfHljXL68wHvcOKe8etP_f4th",

        "isReal": true,

        "university": "ufm",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-007",

        "code": "KTL",

        "baseName": "Đề Cương Kinh Tế Lượng",

        "rawName": "Đề Cương Kinh Tế Lượng.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 282,

        "downloads": "1.8k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1-gcIeAD5yO0s0vNi8nT8kududUoCo6oW",

        "isReal": true,

        "university": "ftu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-125",

        "code": "KTHDC",

        "baseName": "Đề Cương Kinh Tế Học Đại Cương",

        "rawName": "Đề Cương Kinh Tế Học Đại Cương.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 368,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1c8t5jWMBohC8pirrWfI2_DYY9qPLHVyv",

        "isReal": true,

        "university": "hvtc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-087",

        "code": "QTH",

        "baseName": "Đề Cương Quản Trị Học",

        "rawName": "Đề Cương Quản Trị Học.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 362,

        "downloads": "2.3k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1sHKq2mAlcJCoeld9ZTSG_3s3m7ZQtP_2",

        "isReal": true,

        "university": "ueh",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-141",

        "code": "MCB",

        "baseName": "Đề Cương Marketing Cơ Bản",

        "rawName": "Đề Cương Marketing Cơ Bản.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 320,

        "downloads": "2.7k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1FkEfRUP2NN2CLwK6ZovWLqQDl77rvrcp",

        "isReal": true,

        "university": "ajc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-147",

        "code": "MDV",

        "baseName": "Đề Cương Marketing Dịch Vụ",

        "rawName": "Đề Cương Marketing Dịch Vụ.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 422,

        "downloads": "3.3k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1_EVfm67vtmVJEhIQh4sXvEJK2WzMm7Oq",

        "isReal": true,

        "university": "tmu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-047",

        "code": "ATBMTMDT",

        "baseName": "Đề Cương An Toàn Bảo Mật Thương Mại Điện Tử",

        "rawName": "Đề Cương An Toàn Bảo Mật Thương Mại Điện Tử.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 322,

        "downloads": "3.3k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1BjmBQM3SsOqKAfvgV1lxSwjbR3C8XApR",

        "isReal": true,

        "university": "bkhn",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-054",

        "code": "TMDT",

        "baseName": "Đề Cương Thương Mại Điện Tử",

        "rawName": "Đề Cương Thương Mại Điện Tử.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 441,

        "downloads": "1.5k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1IsZSuUBZ61hyhi8Ju_qJ0JzbLImHF9LX",

        "isReal": true,

        "university": "ueh",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-082",

        "code": "NLKT",

        "baseName": "Đề Cương Nguyên Lý Kế Toán",

        "rawName": "Đề Cương Nguyên Lý Kế Toán.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 277,

        "downloads": "1.8k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1iMudRU2O2Lsu1sP4_N4atDqFFX9Vc0rZ",

        "isReal": true,

        "university": "hvtc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-062",

        "code": "TCTT",

        "baseName": "Đề Cương Tài Chính Tiền Tệ",

        "rawName": "Đề Cương Tài Chính Tiền Tệ.docx",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 257,

        "downloads": "2.3k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1UCYaqRkReqsHTqxcOe262mMhmT-SWo6d",

        "isReal": true,

        "university": "hce",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-149",

        "code": "THCS",

        "baseName": "Đề Cương Tin Học Cơ Sở",

        "rawName": "Đề Cương Tin Học Cơ Sở.doc",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 18,

        "rating": 4.9,

        "reviewsCount": 456,

        "downloads": "3.5k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1YvvRQC8UsaTh6nzU3tp2Kuqt8kaLNJYq",

        "isReal": true,

        "university": "vanlang",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-151",

        "code": "TACS1",

        "baseName": "Đề Cương Tiếng Anh Cơ Sở 1",

        "rawName": "Đề Cương Tiếng Anh Cơ Sở 1",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 490,

        "downloads": "1.2k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1Nt4i18RxYoMDzLWCK1d0afXYmHRNBY0y",

        "isReal": true,

        "university": "thanglong",

        "driveType": "folder"

    },

    {

        "id": "REAL-DOC-152",

        "code": "TACS2",

        "baseName": "Đề Cương Tiếng Anh Cơ Sở 2",

        "rawName": "Đề Cương Tiếng Anh Cơ Sở 2",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 187,

        "downloads": "1.3k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1tCGTRA_XdOtDw9GCFF33f1XFfSEpbFS3",

        "isReal": true,

        "university": "dnu",

        "driveType": "folder"

    },

    {

        "id": "REAL-DOC-003",

        "code": "BHTG",

        "baseName": "Đề Cương Bảo Hiểm Tiền Gửi",

        "rawName": "Đề Cương Bảo Hiểm Tiền Gửi",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 214,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1kE5NoS5GGz7hmDn8YTFuwa8CVYpIkWSYlGFS2vBoNLY",

        "isReal": true,

        "university": "neu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-093",

        "code": "HTTTKT",

        "baseName": "Đề Cương Hệ Thống Thông Tin Kế Toán",

        "rawName": "Đề Cương Hệ Thống Thông Tin Kế Toán",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 16,

        "rating": 5,

        "reviewsCount": 464,

        "downloads": "2.9k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "15ojnhy4ofjn8WSFOgYXM0vev4RRIP2gkExQa7_baAng",

        "isReal": true,

        "university": "ueb",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-138",

        "code": "KTHC",

        "baseName": "Đề Cương Kế Toán Hành Chính",

        "rawName": "Đề Cương Kế Toán Hành Chính.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 269,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1I-ISdXgxMTjH-aNlul3ffOLxZNd9jBC5",

        "isReal": true,

        "university": "ufm",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-033",

        "code": "DCKTNH",

        "baseName": "Đề Cương Đề Cương Kế Toán Ngân Hàng",

        "rawName": "Đề Cương Kế Toán Ngân Hàng.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 40,

        "rating": 4.9,

        "reviewsCount": 171,

        "downloads": "1.0k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1UDejXvcrSqHiHfMeLfAMOuBGRR3RBrVK",

        "driveType": "file",

        "isReal": true,

        "university": "hvtc"

    },

    {

        "id": "REAL-DOC-073",

        "code": "KTQT",

        "baseName": "Đề Cương Kế Toán Quản Trị",

        "rawName": "Đề Cương Kế Toán Quản Trị.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 444,

        "downloads": "3.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1chVNFA_siSAr6ExS9kZ1Jr16kvodXShT",

        "isReal": true,

        "university": "neu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-115",

        "code": "KTQT2",

        "baseName": "Đề Cương Kế Toán Quốc Tế",

        "rawName": "Đề Cương Kế Toán Quốc Tế.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 198,

        "downloads": "2.6k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1UYMnmYLIDg7oAKOygPeVUVUZDahD7pTt",

        "isReal": true,

        "university": "hce",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-110",

        "code": "KTT",

        "baseName": "Đề Cương Kế Toán Thuế",

        "rawName": "Đề Cương Kế Toán Thuế.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 433,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1tSy4Oyvhomhf5aYFhewIcx6NbH2g-KbI",

        "isReal": true,

        "university": "hub",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-131",

        "code": "KTBCTC",

        "baseName": "Đề Cương Kiểm Toán Báo Cáo Tài Chính",

        "rawName": "Đề Cương Kiểm Toán Báo Cáo Tài Chính.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 470,

        "downloads": "1.7k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1D3_xVY5sYTFIqgN-M7AM614DceozCH8u",

        "isReal": true,

        "university": "ba",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-046",

        "code": "KTCB",

        "baseName": "Đề Cương Kiểm Toán Căn Bản",

        "rawName": "Đề Cương Kiểm Toán Căn Bản.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 305,

        "downloads": "3.2k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1oUkQCHIe_WQmYaKxab0g7iuy3FDYuYLU",

        "isReal": true,

        "university": "tcnh_hn",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-134",

        "code": "KTQT3",

        "baseName": "Đề Cương Kiểm Toán Quốc Tế",

        "rawName": "Đề Cương Kiểm Toán Quốc Tế.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 201,

        "downloads": "2.0k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1f3bZLjaYqEEM_3YSwlIiFMfn-77TTv5l",

        "isReal": true,

        "university": "ueh",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-122",

        "code": "NHTM",

        "baseName": "Đề Cương Ngân Hàng Thương Mại",

        "rawName": "Đề Cương Ngân Hàng Thương Mại.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 317,

        "downloads": "3.3k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1SuWDeeVCC-9Djd5OZD4oXwxaCSI9PpBP",

        "isReal": true,

        "university": "neu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-044",

        "code": "NVNH",

        "baseName": "Đề Cương Nghiệp Vụ Ngân Hàng",

        "rawName": "Đề Cương Nghiệp Vụ Ngân Hàng.doc",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 271,

        "downloads": "3.0k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1SDVQ_ivB4I9gIAnDamRBO0IzWldyD-2v",

        "isReal": true,

        "university": "ufm",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-039",

        "code": "PTDTCK",

        "baseName": "Đề Cương Phân Tích Đầu Tư Chứng Khoán",

        "rawName": "Đề Cương Phân Tích Đầu Tư Chứng Khoán.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 186,

        "downloads": "2.5k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "12waHZmCQPNoRxrCboYrIrME9pgEJDNxb",

        "isReal": true,

        "university": "ueh",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-128",

        "code": "PLBH",

        "baseName": "Đề Cương Pháp Luật Bảo Hiểm",

        "rawName": "Đề Cương Pháp Luật Bảo Hiểm.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 419,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1HtFXaK-s68QPeoElZAtcV5PsGBlhU473",

        "isReal": true,

        "university": "ueh",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-109",

        "code": "QTKDBH2",

        "baseName": "Đề Cương Quản Trị Kinh Doanh Bảo Hiểm 2",

        "rawName": "Đề Cương Quản Trị Kinh Doanh Bảo Hiểm 2.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 416,

        "downloads": "2.0k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1jKj1FMI-3RdPNNjdTSn9NpxapaaaQxSO",

        "isReal": true,

        "university": "thanglong",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-031",

        "code": "QTNHTM",

        "baseName": "Đề Cương Quản Trị Ngân Hàng Thương Mại",

        "rawName": "Đề Cương Quản Trị Ngân Hàng Thương Mại",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 370,

        "downloads": "1.7k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "18ZJXmEuQr853bfp17o4Ng44uU5xsK3IxHKjbJqkBwNM",

        "isReal": true,

        "university": "ba",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-127",

        "code": "QTRRTC",

        "baseName": "Đề Cương Quản Trị Rủi Ro Tài Chính",

        "rawName": "Đề Cương Quản Trị Rủi Ro Tài Chính",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 402,

        "downloads": "1.3k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1U3mVBP5rJ5EZjr91x7f5xj6FIpCATAkF1gl4n3NQEcs",

        "isReal": true,

        "university": "tmu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-090",

        "code": "QTTC",

        "baseName": "Đề Cương Quản Trị Tài Chính",

        "rawName": "Đề Cương Quản Trị Tài Chính.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 413,

        "downloads": "2.6k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1vchM_QnSwIoD3pVkLNeasxaLZIlMI74W",

        "isReal": true,

        "university": "ba",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-071",

        "code": "QTTC1",

        "baseName": "Đề Cương Quản Trị Tài Chính 1",

        "rawName": "Đề Cương Quản Trị Tài Chính 1",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 410,

        "downloads": "3.2k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1P5Z61C6joHtfnusH-n-Geyo9cy-hyD0WjUkOmJa5188",

        "isReal": true,

        "university": "apd",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-123",

        "code": "QTTCDN",

        "baseName": "Đề Cương Quản Trị Tài Chính Doanh Nghiệp",

        "rawName": "Đề Cương Quản Trị Tài Chính Doanh Nghiệp.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 334,

        "downloads": "3.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1q29WU4ycr1aH2itTIpx6ybaujJgYZqOB",

        "isReal": true,

        "university": "ftu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-042",

        "code": "QTTCDNCS",

        "baseName": "Đề Cương Quản Trị Tài Chính Doanh Nghiệp Chuyên Sâu",

        "rawName": "Đề Cương Quản Trị Tài Chính Doanh Nghiệp Chuyên Sâu",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 237,

        "downloads": "2.8k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1-qLNDbwYAqxs69Pa6wV_zewh7F5W_iKTmolBr65Cous",

        "isReal": true,

        "university": "ueb",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-113",

        "code": "QTTCDNVD",

        "baseName": "Đề Cương Quản Trị Tài Chính Doanh Nghiệp Vận Dụng",

        "rawName": "Đề Cương Quản Trị Tài Chính Doanh Nghiệp Vận Dụng.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 484,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1hWM0rE_23RyurzwP_EP-eBxnJ8Xx_Ock",

        "isReal": true,

        "university": "due",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-121",

        "code": "QTTCDVHCSN",

        "baseName": "Đề Cương Quản Trị Tài Chính Đơn Vị Hành Chính Sự Nghiệp",

        "rawName": "Đề Cương Quản Trị Tài Chính Đơn Vị Hành Chính Sự Nghiệp.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 300,

        "downloads": "3.2k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1hz7jUn09glsNeQSMk8lAsXVPcmx6VD83",

        "isReal": true,

        "university": "apd",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-106",

        "code": "TBH",

        "baseName": "Đề Cương Tái Bảo Hiểm",

        "rawName": "Đề Cương Tái Bảo Hiểm.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 365,

        "downloads": "1.7k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1MhAmR7rdEaJchnQ5ru_5EOgJzdd3Sqpv",

        "isReal": true,

        "university": "tcnh_hn",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-136",

        "code": "TCBH",

        "baseName": "Đề Cương Tài Chính Bảo Hiểm",

        "rawName": "Đề Cương Tài Chính Bảo Hiểm.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 235,

        "downloads": "2.2k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1L9D4eyN3sNTHtj_VzjR7XTqrEukHBz5H",

        "isReal": true,

        "university": "ueb",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-076",

        "code": "TCC",

        "baseName": "Đề Cương Tài Chính Công",

        "rawName": "Đề Cương Tài Chính Công",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 495,

        "downloads": "1.2k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1Ec0CehYScGt0IiGlv0GJHtTvAgi4fkLssJ5OtZr_wXI",

        "isReal": true,

        "university": "ftu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-092",

        "code": "TCDN",

        "baseName": "Đề Cương Tài Chính Doanh Nghiệp",

        "rawName": "Đề Cương Tài Chính Doanh Nghiệp.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 447,

        "downloads": "2.8k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1N59RnPiuLniUBSeL6LGsAHzB6DpSsbvf",

        "isReal": true,

        "university": "ueh",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-011",

        "code": "TCDN2",

        "baseName": "Đề Cương Tài Chính Doanh Nghiệp 2",

        "rawName": "Đề Cương Tài Chính Doanh Nghiệp 2",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 350,

        "downloads": "2.2k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1sNUAfv5YMnIXtmCC3I7o_t9TaqYdRmN-ZObHatS-ya4",

        "isReal": true,

        "university": "hvtc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-010",

        "code": "TCQT",

        "baseName": "Đề Cương Tài Chính Quốc Tế",

        "rawName": "Đề Cương Tài Chính Quốc Tế",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 333,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1JAjl6DLTMufxN060eccaG-hGD52_Lg2RfZBULIKxd_0",

        "isReal": true,

        "university": "tmu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-040",

        "code": "TDDADT",

        "baseName": "Đề Cương Thẩm Định Dự Án Đầu Tư",

        "rawName": "Đề Cương Thẩm Định Dự Án Đầu Tư",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 203,

        "downloads": "2.6k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1Q3hy93-ee_Xl0U8-ps9DM5j0rXzhWFnoS_sVeEgtlK8",

        "isReal": true,

        "university": "ntu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-061",

        "code": "TDTCDADT2",

        "baseName": "Đề Cương Thẩm Định Tài Chính Dự Án Đầu Tư",

        "rawName": "Đề Cương Thẩm Định Tài Chính Dự Án Đầu Tư",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 240,

        "downloads": "2.2k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1S9gZTTJkTqFlkk3OB4yPoj6X67c7IDljGSiv71Az1wY",

        "isReal": true,

        "university": "due",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-096",

        "code": "TDTCDADT",

        "baseName": "Đề Cương Thẩm Định Tài Chính Dự Án Đầu Tư",

        "rawName": "Đề Cương Thẩm Định Tài Chính Dự Án Đầu Tư",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 195,

        "downloads": "3.2k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1pnkhUYm3MZFtb0M9IfAYysi8833THEtmNJHdNPgHe3M",

        "isReal": true,

        "university": "ufm",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-064",

        "code": "TTTDQT",

        "baseName": "Đề Cương Thanh Toán Tín Dụng Quốc Tế",

        "rawName": "Đề Cương Thanh Toán Tín Dụng Quốc Tế.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 291,

        "downloads": "2.5k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1dADgZNq2hs34ATO6moaGuWVt_WsUAnuy",

        "isReal": true,

        "university": "hou",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-077",

        "code": "TTCK",

        "baseName": "Đề Cương Thị Trường Chứng Khoán",

        "rawName": "Đề Cương Thị Trường Chứng Khoán",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 192,

        "downloads": "1.3k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1ECK_ze3uLnTpdNEqDWcuGOobzawt4M5EZyxOs8xEgec",

        "isReal": true,

        "university": "tmu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-064",

        "code": "DCTTCKPS",

        "baseName": "Đề Cương Đề Cương Thị Trường Chứng Khoán Phái Sinh",

        "rawName": "Đề Cương Thị Trường Chứng Khoán Phái Sinh.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 46,

        "rating": 4.9,

        "reviewsCount": 208,

        "downloads": "2.3k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1lu0J87ztvAlNxIWBtSXVsPGcKujI329T",

        "driveType": "file",

        "isReal": true,

        "university": "ueh"

    },

    {

        "id": "REAL-DOC-129",

        "code": "TTTCVCDCTC",

        "baseName": "Đề Cương Thị Trường Tài Chính Và Các Định Chế Tài Chính",

        "rawName": "Đề Cương Thị Trường Tài Chính Và Các Định Chế Tài Chính",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 436,

        "downloads": "1.5k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1UbLWRu0NrZNqs1djVyR5eEd5JIZKjB9fmE1dzYnqk6k",

        "isReal": true,

        "university": "hvtc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-066",

        "code": "DCTDNH",

        "baseName": "Đề Cương Đề Cương Tín Dụng Ngân Hàng",

        "rawName": "Đề Cương Tín Dụng Ngân Hàng.docx",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 48,

        "rating": 4.9,

        "reviewsCount": 222,

        "downloads": "1.0k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1gFof2WP_q3dZ5HRsuM2uoretLbWNiAgo",

        "driveType": "file",

        "isReal": true,

        "university": "uet"

    },

    {

        "id": "REAL-DOC-049",

        "code": "TTC",

        "baseName": "Đề Cương Toán Tài Chính",

        "rawName": "Đề Cương Toán Tài Chính",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 356,

        "downloads": "3.5k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1R0hOSnXLTCzWzuYjGrqPstG7K0L_ni1MxrJC30Ln8Hw",

        "isReal": true,

        "university": "thanglong",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-050",

        "code": "VTVBH",

        "baseName": "Đề Cương Vận Tải Và Bảo Hiểm",

        "rawName": "Đề Cương Vận Tải Và Bảo Hiểm",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 373,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1-X20DpiYh1uPmS0yObQUq1TXCJhJLubmCfqwG7uq49E",

        "isReal": true,

        "university": "hub",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-137",

        "code": "CLNNL",

        "baseName": "Đề Cương Chiến Lược Nguồn Nhân Lực",

        "rawName": "Đề Cương Chiến Lược Nguồn Nhân Lực.docx",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 252,

        "downloads": "2.3k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1IBuN6WLJang1GmzmQ66Ib1qpRVkVvCwJ",

        "isReal": true,

        "university": "hutech",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-052",

        "code": "DTDCKTS",

        "baseName": "Đề Thi & Đề Cương KINH TẾ SỐ",

        "rawName": "Đề Thi & Đề Cương KINH TẾ SỐ",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 407,

        "downloads": "1.3k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1JvopD9Da6Cr8mpeV5Tqe92A9pr1PMILReZCslxjE7a4",

        "isReal": true,

        "university": "ftu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-074",

        "code": "HPKTSCHVDA",

        "baseName": "Đề Cương Học Phần Kinh Tế Số - Câu Hỏi Và Đáp Án",

        "rawName": "Đề Cương Học Phần Kinh Tế Số - Câu Hỏi Và Đáp Án",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 461,

        "downloads": "3.5k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1KxqXMqe5piAkxNQi2hCJveyyrBeFWum52q6N7KWAsrU",

        "isReal": true,

        "university": "ftu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-107",

        "code": "KDQT",

        "baseName": "Đề Cương Kinh Doanh Quốc Tế",

        "rawName": "Đề Cương Kinh Doanh Quốc Tế",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 382,

        "downloads": "1.8k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1Ya9U4g8Q6lIJMBdt2aRvlkoBgkAsDtXqRHBlA4a4Stg",

        "isReal": true,

        "university": "thanglong",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-094",

        "code": "KDS",

        "baseName": "Đề Cương Kinh Doanh Số",

        "rawName": "Đề Cương Kinh Doanh Số",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 481,

        "downloads": "3.0k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1yF5H4040G83iaMM6F9FrTjKVdXRqKztRpe2KTODuTT4",

        "isReal": true,

        "university": "ufm",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-024",

        "code": "KTC",

        "baseName": "Đề Cương Kinh Tế Công",

        "rawName": "Đề Cương Kinh Tế Công",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 251,

        "downloads": "3.5k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1TrXrxtYuQiQqnWcsYYCyXl5z6fLQq6fYbDVpDvpvn98",

        "isReal": true,

        "university": "hoasen",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-014",

        "code": "KTCC",

        "baseName": "Đề Cương Kinh Tế Công Cộng",

        "rawName": "Đề Cương Kinh Tế Công Cộng",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 401,

        "downloads": "2.5k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1AZRdPvsNbQxHBG_JrZRgyHNyeXLo3nQ9aqeuev7y7Ng",

        "isReal": true,

        "university": "ptit",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-120",

        "code": "KTDT",

        "baseName": "Đề Cương Kinh Tế Đầu Tư",

        "rawName": "Đề Cương Kinh Tế Đầu Tư.docx",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 283,

        "downloads": "3.1k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1NICD2daWl95W4DWk-pxCSPil40NhcEZ3",

        "isReal": true,

        "university": "ftu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-097",

        "code": "KTDL",

        "baseName": "Đề Cương Kinh Tế Du Lịch",

        "rawName": "Đề Cương Kinh Tế Du Lịch",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 212,

        "downloads": "3.3k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1HAiQE-_Z7doeDuz2hhX3chtF-V3nN0YvaOwzojolhng",

        "isReal": true,

        "university": "dnu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-055",

        "code": "KTNT",

        "baseName": "Đề Cương Kinh Tế Ngoại Thương",

        "rawName": "Đề Cương Kinh Tế Ngoại Thương.docx",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 458,

        "downloads": "1.6k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1tH1ES4p880G2xVIgjea4_1tYfmZsWu7B",

        "isReal": true,

        "university": "ftu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-065",

        "code": "KTPT",

        "baseName": "Đề Cương Kinh Tế Phát Triển",

        "rawName": "Đề Cương Kinh Tế Phát Triển.docx",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 308,

        "downloads": "2.6k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1APygT-uGirjJe1gEfshv14jqv-iimCw5",

        "isReal": true,

        "university": "hvtc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-020",

        "code": "KTVT2",

        "baseName": "Đề Cương Kinh Tế Vận Tải",

        "rawName": "Đề Cương Kinh Tế Vận Tải",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 183,

        "downloads": "3.1k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1yVLlMP_ATSr2-s5kEofSQEI6DHRJojof8BQBf3TvQs0",

        "isReal": true,

        "university": "tmu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-020",

        "code": "KTVT",

        "baseName": "Đề Cương Kinh Tế Vận Tải",

        "rawName": "Đề Cương Kinh Tế Vận Tải",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 183,

        "downloads": "3.1k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1mJOdcpoLNa9BvaMWU_Kqw4pdiRzohsUu5s6Awia8XTA",

        "isReal": true,

        "university": "tmu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-070",

        "code": "DCPTHDKD",

        "baseName": "Đề Cương Đề Cương Phân Tích Hoạt Động Kinh Doanh",

        "rawName": "Đề Cương Phân Tích Hoạt Động Kinh Doanh.docx",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 393,

        "downloads": "3.1k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1KgqfoN_x2Xi2VsNDcLJResJyEbWk6BZP",

        "isReal": true,

        "university": "ajc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-070",

        "code": "PTHDKD",

        "baseName": "Đề Cương Phân tích hoạt động kinh doanh",

        "rawName": "Đề Cương Phân tích hoạt động kinh doanh",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 393,

        "downloads": "3.1k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1htDrc_j5hqPEgfT331kGqxEOJu8cJCwZtHrOHIk2hHQ",

        "isReal": true,

        "university": "ajc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-099",

        "code": "PLKT",

        "baseName": "Đề Cương Pháp Luật Kinh Tế",

        "rawName": "Đề Cương Pháp Luật Kinh Tế",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 246,

        "downloads": "3.5k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1sbun9QcYdmejeNcHPfnd0zyveBW1Uy34FCKT11ybfTM",

        "isReal": true,

        "university": "dnu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-098",

        "code": "QLNNVKT",

        "baseName": "Đề Cương Quản Lý Nhà Nước Về Kinh Tế",

        "rawName": "Đề Cương Quản Lý Nhà Nước Về Kinh Tế",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 229,

        "downloads": "3.4k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1ac_roGLzqQ1j4N48DdBVrtVZHwuwPa6W6JI-K22U-8U",

        "isReal": true,

        "university": "thanglong",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-140",

        "code": "QTCL",

        "baseName": "Đề Cương Quản Trị Chất Lượng",

        "rawName": "Đề Cương Quản Trị Chất Lượng.docx",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 303,

        "downloads": "2.6k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1cqdQtcYvflngeztMypPdoRZcmL_OoJCZ",

        "isReal": true,

        "university": "bkhn",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-012",

        "code": "QTCCU",

        "baseName": "Đề Cương Quản Trị Chuỗi Cung Ứng",

        "rawName": "Đề Cương Quản Trị Chuỗi Cung Ứng",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 367,

        "downloads": "2.3k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1CgCgMpEfQLBdHFlS2nztn1a2Ql49KqOX_3P3NPXa3ZE",

        "isReal": true,

        "university": "ajc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-015",

        "code": "QTDN",

        "baseName": "Đề Cương Quản trị Doanh nghiệp",

        "rawName": "Đề Cương Quản trị Doanh nghiệp",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 418,

        "downloads": "2.6k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "19OWk923BOSgQuehLHirk8XG90D4TcD9uWme9fif_TmA",

        "isReal": true,

        "university": "ftu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-100",

        "code": "QTDACNTT",

        "baseName": "Đề Cương Quản Trị Dự Án Công Nghệ Thông Tin",

        "rawName": "Đề Cương Quản Trị Dự Án Công Nghệ Thông Tin.docx",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 263,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1UodPiqx5G7yY7Y1l9T_dsijPPvewCka4",

        "isReal": true,

        "university": "dpu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-060",

        "code": "QTDADT",

        "baseName": "Đề Cương Quản Trị Dự Án Đầu Tư",

        "rawName": "Đề Cương Quản Trị Dự Án Đầu Tư",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 223,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1_8nCuK91NNeVa4wKVdET4cJ8AnmxnuTWOIYUZX4HL6Q",

        "isReal": true,

        "university": "hutech",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-126",

        "code": "QTKD1",

        "baseName": "Đề Cương Quản Trị Kinh Doanh 1",

        "rawName": "Đề Cương Quản Trị Kinh Doanh 1.docx",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 385,

        "downloads": "1.2k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1EKjOqZbVK9hOf-7m6Umi-LGPDl2XIdlw",

        "isReal": true,

        "university": "dnu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-066",

        "code": "QTNL",

        "baseName": "Đề Cương Quản Trị Nhân Lực",

        "rawName": "Đề Cương Quản Trị Nhân Lực.docx",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 325,

        "downloads": "2.7k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1jOmwc7Q1VgNGiQIkRa9RLJmPVJcdjitK",

        "isReal": true,

        "university": "bkhn",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-033",

        "code": "QTRR",

        "baseName": "Đề Cương Quản Trị Rủi Ro",

        "rawName": "Đề Cương Quản Trị Rủi Ro",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 404,

        "downloads": "1.9k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1SgGW6ZWZFlkDeROamaCDTT-uGCcFwRE7oMeMcchoi5I",

        "isReal": true,

        "university": "thanglong",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-035",

        "code": "QTSTD",

        "baseName": "Đề Cương Quản Trị Sự Thay Đổi",

        "rawName": "Đề Cương Quản Trị Sự Thay Đổi",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 438,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "108PzYyA7aN4aq42k888qpsSOF2sEb52FHzfLsxgDqpY",

        "isReal": true,

        "university": "dnu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-048",

        "code": "QTTN",

        "baseName": "Đề Cương Quản Trị Tác Nghiệp",

        "rawName": "Đề Cương Quản Trị Tác Nghiệp",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 339,

        "downloads": "3.4k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1NejAZEpR5GaE2BeII6GvXxYeem4hMcf2qz3EnwYCfZg",

        "isReal": true,

        "university": "ajc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-045",

        "code": "QTTH",

        "baseName": "Đề Cương Quản Trị Thương Hiệu",

        "rawName": "Đề Cương Quản Trị Thương Hiệu",

        "category": "Marketing & Quản Trị",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 288,

        "downloads": "3.1k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "17i5Vb2wmcsTQiacjw77MoSgXj9tc8tGX_sep1tUv_yY",

        "isReal": true,

        "university": "hou",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-057",

        "code": "BTMVT",

        "baseName": "Đề Cương bài tập môn Vận tải",

        "rawName": "Đề Cương bài tập môn Vận tải",

        "category": "Kinh Tế & Thống Kê",

        "icon": "🚢",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 492,

        "downloads": "1.8k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1v3paa0pv4D2xgBU6EKH04ARyWZT9NdL4W6qxx9FN5cc",

        "isReal": true,

        "university": "thanglong",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-075",

        "code": "GNTNT",

        "baseName": "Đề Cương Giao Nhận Trong Ngoại Thương",

        "rawName": "Đề Cương Giao Nhận Trong Ngoại Thương",

        "category": "Kinh Tế & Thống Kê",

        "icon": "🚢",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 478,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "14gxIhTVQu96ahjxK6xjgwJ0aLY1fTqLlePpo1twVznM",

        "isReal": true,

        "university": "uet",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-051",

        "code": "HHTVT",

        "baseName": "Đề Cương Hàng Hoá Trong Vận Tải",

        "rawName": "Đề Cương Hàng Hoá Trong Vận Tải",

        "category": "Kinh Tế & Thống Kê",

        "icon": "🚢",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 390,

        "downloads": "1.2k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1lSBiJxcjVDg71qvb0HRHC7warA8RcA4X-q5ZBQjDGa4",

        "isReal": true,

        "university": "neu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-037",

        "code": "HHVT",

        "baseName": "Đề Cương Hàng Hóa Vận Tải",

        "rawName": "Đề Cương Hàng Hóa Vận Tải.docx",

        "category": "Kinh Tế & Thống Kê",

        "icon": "🚢",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 472,

        "downloads": "2.3k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1MuYCqVnOW8rclhmYGRi5CT-juZKufEob",

        "isReal": true,

        "university": "hutech",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-027",

        "code": "HNCATBD",

        "baseName": "Đề Cương Hội Nhập Châu Á-Thái Bình Dương",

        "rawName": "Đề Cương Hội Nhập Châu Á-Thái Bình Dương",

        "category": "Kinh Tế & Thống Kê",

        "icon": "🚢",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 302,

        "downloads": "1.3k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "11lZFlndYyMiqnELIm86490sxRgXiBQtamXuFUPL5lgk",

        "isReal": true,

        "university": "dhhp",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-058",

        "code": "LVQT",

        "baseName": "Đề Cương Logistic Và Quốc Tế",

        "rawName": "Đề Cương Logistic Và Quốc Tế",

        "category": "Kinh Tế & Thống Kê",

        "icon": "🚢",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 189,

        "downloads": "1.9k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1o9lFpg1kKdLABC6NWFA3VKlZz-Xjp0kfnlIEM5ZdsCA",

        "isReal": true,

        "university": "dnu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-081",

        "code": "LVTDPT",

        "baseName": "Đề Cương Logistic vận tải Đa Phương Thức",

        "rawName": "Đề Cương Logistic vận tải Đa Phương Thức",

        "category": "Kinh Tế & Thống Kê",

        "icon": "🚢",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 260,

        "downloads": "1.7k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "160oP1DemOUnpRCM3lCvOiylXMoO5A1rtWH0YsUoBfVo",

        "isReal": true,

        "university": "tmu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-022",

        "code": "NVNT",

        "baseName": "Đề Cương Nghiệp Vụ Ngoại Thương",

        "rawName": "Đề Cương Nghiệp Vụ Ngoại Thương",

        "category": "Kinh Tế & Thống Kê",

        "icon": "🚢",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 217,

        "downloads": "3.3k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1WG3cLV9b6rQz1mlvRjwG-V8GZOJdTjRD",

        "isReal": true,

        "university": "hutech",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-029",

        "code": "QHCATBD",

        "baseName": "Đề Cương Quan Hệ Châu Á Thái Bình Dương",

        "rawName": "Đề Cương Quan Hệ Châu Á Thái Bình Dương",

        "category": "Kinh Tế & Thống Kê",

        "icon": "🚢",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 336,

        "downloads": "1.5k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1hgXLK_i1ICkDfy0u2-qRH7qhN9nBmBBIXAowP1TrNzY",

        "isReal": true,

        "university": "thanglong",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-005",

        "code": "QHQT",

        "baseName": "Đề Cương Quan Hệ Quốc Tế",

        "rawName": "Đề Cương Quan Hệ Quốc Tế",

        "category": "Kinh Tế & Thống Kê",

        "icon": "🚢",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 248,

        "downloads": "1.6k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1XNUZOeLxGGowviiXn9W2ik-oxDCH4WFpjdYmDuNUggM",

        "isReal": true,

        "university": "ueb",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-053",

        "code": "TTQT",

        "baseName": "Đề Cương Thanh Toán Quốc Tế",

        "rawName": "Đề Cương Thanh Toán Quốc Tế",

        "category": "Kinh Tế & Thống Kê",

        "icon": "🚢",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 424,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1aiZmw-nwI761oJ-4PYma9EB_VIzBpF8ScfRMK8DB_zY",

        "isReal": true,

        "university": "tmu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-139",

        "code": "VTGN",

        "baseName": "Đề Cương Vận Tải Giao Nhận",

        "rawName": "Đề Cương Vận Tải Giao Nhận.docx",

        "category": "Kinh Tế & Thống Kê",

        "icon": "🚢",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 286,

        "downloads": "2.5k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "17NehGa-nQS6KeBAoFZCJQxJoacg4Hn1Y",

        "isReal": true,

        "university": "hou",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-023",

        "code": "BTHT",

        "baseName": "Đề Cương Bảo Trì Hệ Thống",

        "rawName": "Đề Cương Bảo Trì Hệ Thống.docx",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 234,

        "downloads": "3.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1WnmVRejfg-nzkOUVq0g93wv5w-G8w_AU",

        "isReal": true,

        "university": "vanlang",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-019",

        "code": "CNS",

        "baseName": "Đề Cương Công Nghệ Số",

        "rawName": "Đề Cương Công Nghệ Số",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 14,

        "rating": 4.8,

        "reviewsCount": 486,

        "downloads": "3.0k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "10l8OQU4mi896g4KRuewgwmYFqKNV6T8CvoTEWkbd8w0",

        "isReal": true,

        "university": "duytan",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-105",

        "code": "DHUD",

        "baseName": "Đề Cương Đồ Họa Ứng Dụng",

        "rawName": "Đề Cương Đồ Họa Ứng Dụng.docx",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 16,

        "rating": 5,

        "reviewsCount": 348,

        "downloads": "1.6k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1MUY__awERzlneH8FkD6uM3cAmmpeoqhc",

        "isReal": true,

        "university": "ptit",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-150",

        "code": "HTTTQL2",

        "baseName": "Đề Cương Hệ Thống Thông Tin Quản Lý",

        "rawName": "Đề Cương Hệ Thống Thông Tin Quản Lý.docx",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 16,

        "rating": 5,

        "reviewsCount": 473,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1a70zYj4R5STACuZxA0FuiovZaE7coM4G",

        "isReal": true,

        "university": "eaut",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-150",

        "code": "HTTTQL",

        "baseName": "Đề Cương Hệ Thống Thông Tin Quản Lý",

        "rawName": "Đề Cương Hệ Thống Thông Tin Quản Lý",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 16,

        "rating": 5,

        "reviewsCount": 473,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1e8PzaRzszkqfbaQ7U8p6cIO1KGb7BQml",

        "isReal": true,

        "university": "eaut",

        "driveType": "folder"

    },

    {

        "id": "REAL-DOC-111",

        "code": "KNS",

        "baseName": "Đề Cương Kỹ Năng Số",

        "rawName": "Đề Cương Kỹ Năng Số.docx",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 450,

        "downloads": "2.2k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1Kz6STknoOlArS58WPIjj0tWNFDjhZXIRFQwZ-PngBTE",

        "isReal": true,

        "university": "tcnh_hn",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-112",

        "code": "KNS2",

        "baseName": "Đề Cương Kỹ Năng Sống",

        "rawName": "Đề Cương Kỹ Năng Sống",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 467,

        "downloads": "2.3k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "15LNfKZZBD-y3U-AZcJN1P4XYWtRZA5me8-lXMQrDkts",

        "isReal": true,

        "university": "hongduc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-130",

        "code": "MMT",

        "baseName": "Đề Cương Mạng Máy Tính",

        "rawName": "Đề Cương Mạng Máy Tính.docx",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 14,

        "rating": 4.8,

        "reviewsCount": 453,

        "downloads": "1.6k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1BAVK1KG3zbbyF2Qc9GvLjjMG8OuudFBp",

        "isReal": true,

        "university": "hutech",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-102",

        "code": "NNS",

        "baseName": "Đề Cương Ngôn Ngữ SQL",

        "rawName": "Đề Cương Ngôn Ngữ SQL.docx",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 19,

        "rating": 5,

        "reviewsCount": 297,

        "downloads": "1.3k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1EOfuGdYKd2Iqfu0PL548Zm7EnxyaG4Gx",

        "isReal": true,

        "university": "haui",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-101",

        "code": "PTUDTNW",

        "baseName": "Đề Cương Phát Triển Ứng Dụng Trên Nền Web",

        "rawName": "Đề Cương Phát Triển Ứng Dụng Trên Nền Web.docx",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 18,

        "rating": 4.9,

        "reviewsCount": 280,

        "downloads": "1.2k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "196pZGRLR0Au6-HFZnvFWTBnOTfcRRy-H",

        "isReal": true,

        "university": "dut",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-063",

        "code": "SW",

        "baseName": "Đề Cương SEO Website",

        "rawName": "Đề Cương SEO Website.docx",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 19,

        "rating": 5,

        "reviewsCount": 274,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "11fml_QysKNtn1z6IEz48-jAu9ZsUgAaF",

        "isReal": true,

        "university": "dnu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-025",

        "code": "TKW",

        "baseName": "Đề Cương Thiết Kế Web",

        "rawName": "Đề Cương Thiết Kế Web.docx",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 17,

        "rating": 4.8,

        "reviewsCount": 268,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1Skewbvod8vZvb92K1e6IZ5Yeklr0GZ0r",

        "isReal": true,

        "university": "hou",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-108",

        "code": "THCB",

        "baseName": "Đề Cương Tin Học Cơ Bản",

        "rawName": "Đề Cương Tin Học Cơ Bản",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 19,

        "rating": 5,

        "reviewsCount": 399,

        "downloads": "1.9k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1mhnVhgwfVynDwdb93JJgNOIxvX5aXSp9LDlEkmHDhWI",

        "isReal": true,

        "university": "thanglong",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-103",

        "code": "TTNT",

        "baseName": "Đề Cương Trí Tuệ Nhân Tạo",

        "rawName": "Đề Cương Trí Tuệ Nhân Tạo.docx",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 14,

        "rating": 4.8,

        "reviewsCount": 314,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1kFOey5txfVbPguhkvUQYKQDFBMo2ioqq",

        "isReal": true,

        "university": "bkhn",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-104",

        "code": "XLTHS",

        "baseName": "Đề Cương Xử Lý Tín Hiệu số",

        "rawName": "Đề Cương Xử Lý Tín Hiệu số.docx",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 15,

        "rating": 4.9,

        "reviewsCount": 331,

        "downloads": "1.5k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1iqJX9GKSG6mZtC54RmD1eHB4r_adMhni",

        "isReal": true,

        "university": "uet",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-124",

        "code": "CTTTVGPGDHNTKTDVTL",

        "baseName": "Đề Cương Chi Tiết - Thực Trạng và Giải Pháp Giáo Dục Hòa Nhập Trẻ Khuyết Tật (Điệp Viên Tài Liệu)",

        "rawName": "Đề Cương Chi Tiết - Thực Trạng và Giải Pháp Giáo Dục Hòa Nhập Trẻ Khuyết Tật (Điệp Viên Tài Liệu)",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 56,

        "rating": 4.9,

        "reviewsCount": 268,

        "downloads": "2.3k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1TYKSUyPM1heBY7SE8x94hLFfh1H9cx3StkuVKI1buOo",

        "driveType": "file",

        "isReal": true,

        "university": "ueh"

    },

    {

        "id": "REAL-DOC-038",

        "code": "CTH",

        "baseName": "Đề Cương Chính Trị Học",

        "rawName": "Đề Cương Chính Trị Học",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 28,

        "rating": 4.9,

        "reviewsCount": 489,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "16WcEG26SgDPgydYnS9UM4Pa-iWlfb4IuNR-sc6LoEQU",

        "isReal": true,

        "university": "hongduc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-142",

        "code": "CSVH",

        "baseName": "Đề Cương Cơ Sở Văn Hóa",

        "rawName": "Đề Cương Cơ Sở Văn Hóa.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 337,

        "downloads": "2.8k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1UKTSahq-QzW0XDVgkZF4rfjyWJd3R4BF",

        "isReal": true,

        "university": "ueb",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-080",

        "code": "CSVHVN",

        "baseName": "Đề Cương Cơ Sở Văn Hóa Việt Nam",

        "rawName": "Đề Cương Cơ Sở Văn Hóa Việt Nam",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 243,

        "downloads": "1.6k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1RxBs0diZ6QC87FAQHBSqYd7H5ds_eNWuiRqUcjjvC5U",

        "isReal": true,

        "university": "ussh",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-017",

        "code": "DLNN",

        "baseName": "Đề Cương Dẫn Luận Ngôn Ngữ",

        "rawName": "Đề Cương Dẫn Luận Ngôn Ngữ",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 452,

        "downloads": "2.8k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "12RpY4tT8Gk1R_HRAleScmzdchcOWGsrbTsZRDntiAAM",

        "isReal": true,

        "university": "vanlang",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-129",

        "code": "GDHNTKT3",

        "baseName": "Đề Cương Giáo Dục Hòa Nhập Trẻ Khuyết Tật",

        "rawName": "Đề Cương Giáo Dục Hòa Nhập Trẻ Khuyết Tật",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 36,

        "rating": 4.9,

        "reviewsCount": 123,

        "downloads": "1.0k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1h5AYxPQTfKxV-fiL7mWvvfvBl1AWmUGlMdybHpTgyvY",

        "driveType": "file",

        "isReal": true,

        "university": "apd"

    },

    {

        "id": "REAL-DOC-128",

        "code": "GDHNTKT2",

        "baseName": "Đề Cương Giáo Dục Hòa Nhập Trẻ Khuyết Tật",

        "rawName": "Đề Cương Giáo Dục Hòa Nhập Trẻ Khuyết Tật.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 35,

        "rating": 4.9,

        "reviewsCount": 296,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1DUPK6tFHbQFkimEMFkYmbGAdy4fYpQyN",

        "driveType": "file",

        "isReal": true,

        "university": "ulsa"

    },

    {

        "id": "REAL-DOC-129",

        "code": "GDHNTKT",

        "baseName": "Đề Cương Giáo Dục Hòa Nhập Trẻ Khuyết Tật",

        "rawName": "Đề Cương Giáo Dục Hòa Nhập Trẻ Khuyết Tật.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 36,

        "rating": 4.9,

        "reviewsCount": 123,

        "downloads": "1.0k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1mspH30vrH5KZ7EnUHZI8Tn99RZN6KFU3",

        "driveType": "file",

        "isReal": true,

        "university": "apd"

    },

    {

        "id": "REAL-DOC-148",

        "code": "GTCN",

        "baseName": "Đề Cương Giới Thiệu Chuyên Ngành",

        "rawName": "Đề Cương Giới Thiệu Chuyên Ngành.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 439,

        "downloads": "3.4k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1Y7eAa5UE6V_HdE4qqkBzZhJLKvbc7Pof",

        "isReal": true,

        "university": "ussh",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-083",

        "code": "KNSTVBHVB",

        "baseName": "Đề Cương Kỹ Năng Soạn Thảo Và Ban Hành Văn Bản",

        "rawName": "Đề Cương Kỹ Năng Soạn Thảo Và Ban Hành Văn Bản",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 294,

        "downloads": "1.9k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "11ocKhs37Zr1vz6_4Trd3kD0qCejLIXnY7Y6aKelAiGY",

        "isReal": true,

        "university": "ptit",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-088",

        "code": "LSHTCTPL",

        "baseName": "Đề Cương Lịch Sử Học Thuyết Chính Trị Pháp Lý",

        "rawName": "Đề Cương Lịch Sử Học Thuyết Chính Trị Pháp Lý",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 25,

        "rating": 4.8,

        "reviewsCount": 379,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1E1sehR0z_UbuZh4f3Z36xYszMv3R19wKC_-APYOQoRc",

        "isReal": true,

        "university": "hoasen",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-067",

        "code": "LSHTCTVPL",

        "baseName": "Đề Cương Lịch Sử Học Thuyết Chính Trị Và Pháp Luật",

        "rawName": "Đề Cương Lịch Sử Học Thuyết Chính Trị Và Pháp Luật",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 22,

        "rating": 4.8,

        "reviewsCount": 342,

        "downloads": "2.8k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1gZYsfcpgu0bQL01fEFn5zNtlihSRA8S2Roq-B87I4FQ",

        "isReal": true,

        "university": "ueh",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-114",

        "code": "LSLTCT",

        "baseName": "Đề Cương Lịch Sử Lý Thuyết Chính Trị",

        "rawName": "Đề Cương Lịch Sử Lý Thuyết Chính Trị.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 23,

        "rating": 5,

        "reviewsCount": 181,

        "downloads": "2.5k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1zd1TtetnL8qGrqGZeFAfCA0NX0BVJko5",

        "isReal": true,

        "university": "ntu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-041",

        "code": "LSTLH",

        "baseName": "Đề Cương Lịch Sử Tâm Lý Học",

        "rawName": "Đề Cương Lịch Sử Tâm Lý Học",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 220,

        "downloads": "2.7k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1lnZ7guJIkGBPzpzpMvNn8xJuREvcj8qahfs5jLOxI44",

        "isReal": true,

        "university": "neu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-119",

        "code": "LSVN",

        "baseName": "Đề Cương Lịch Sử Việt Nam",

        "rawName": "Đề Cương Lịch Sử Việt Nam",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 266,

        "downloads": "3.0k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1NliuFYynPHqhCYF2x2iaTeHU6Ak4qtMYUhum-nyb_10",

        "isReal": true,

        "university": "bkhn",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-034",

        "code": "LDN",

        "baseName": "Đề Cương Luật Doanh Nghiệp",

        "rawName": "Đề Cương Luật Doanh Nghiệp",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 421,

        "downloads": "2.0k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1PZuU5vOQ9xbJg6-46DRvbkPb_6U0zyHjNa9g6L2aQq8",

        "isReal": true,

        "university": "hul",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-043",

        "code": "LLNNVPL",

        "baseName": "Đề Cương Lý Luận Nhà Nước Và Pháp Luật",

        "rawName": "Đề Cương Lý Luận Nhà Nước Và Pháp Luật.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 24,

        "rating": 4.8,

        "reviewsCount": 254,

        "downloads": "2.9k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1lwKYcHhC2siEnkWqtY3RS1UT7aos4iP1",

        "isReal": true,

        "university": "bkhn",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-117",

        "code": "LTPTTL",

        "baseName": "Đề Cương Lý Thuyết Phát Triển Tâm Lý",

        "rawName": "Đề Cương Lý Thuyết Phát Triển Tâm Lý.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 232,

        "downloads": "2.8k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "18FerNLmxMS2iZWCp7O4s5lNg3p331Dbx",

        "isReal": true,

        "university": "hcmuc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-118",

        "code": "LTTLH",

        "baseName": "Đề Cương Lý Thuyết Tâm Lý Học",

        "rawName": "Đề Cương Lý Thuyết Tâm Lý Học.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 249,

        "downloads": "2.9k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1o4yJ__BzZh1iGNUeNH1wJRx89RLwbsZd",

        "isReal": true,

        "university": "dhhp",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-085",

        "code": "MTVCN",

        "baseName": "Đề Cương Môi Trường Và Con Người",

        "rawName": "Đề Cương Môi Trường Và Con Người",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 328,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1XUpB3uKjiU0016r5LFgSly0TKqHea8P4rk7IGGvYs7c",

        "isReal": true,

        "university": "hutech",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-095",

        "code": "NCKH",

        "baseName": "Đề Cương Nghiên Cứu Khoa Học",

        "rawName": "Đề Cương Nghiên Cứu Khoa Học",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 498,

        "downloads": "3.1k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1JM0sn_T96aGYtW1JAKIJJihU_EYyJS7gB1caWB3hibs",

        "isReal": true,

        "university": "duytan",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-016",

        "code": "PPNCKH",

        "baseName": "Đề Cương Phương Pháp Nghiên Cứu Khoa Học",

        "rawName": "Đề Cương Phương Pháp Nghiên Cứu Khoa Học",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 435,

        "downloads": "2.7k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1oDpHgJdQyEW7Yz7X80Cz4e-5MPJN2CT1AHw-ugp8-w4",

        "isReal": true,

        "university": "hlu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-028",

        "code": "QHCCBTTNDA",

        "baseName": "Đề Cương QUAN HỆ CÔNG CHÚNG - Bài Tập Trắc Nghiệm & Đáp Án",

        "rawName": "Đề Cương QUAN HỆ CÔNG CHÚNG - Bài Tập Trắc Nghiệm & Đáp Án",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 319,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1aXxh31MDmYT5Gq_WsfkBRFvYoa77XUTa6CjtAMya4LI",

        "isReal": true,

        "university": "duytan",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-132",

        "code": "QLTD",

        "baseName": "Đề Cương Quản Lý Thay Đổi",

        "rawName": "Đề Cương Quản Lý Thay Đổi.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 487,

        "downloads": "1.8k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1em2P10gFn99axG2RDXSd4sRnatOnLPGa",

        "isReal": true,

        "university": "ba",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-089",

        "code": "QPAN",

        "baseName": "Đề Cương Quốc Phòng An Ninh",

        "rawName": "Đề Cương Quốc Phòng An Ninh",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 396,

        "downloads": "2.5k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1yojSdTxQz06XxI7lJluLMTL89TQVDYpxBiuorLL4bXU",

        "isReal": true,

        "university": "dhhp",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-036",

        "code": "SLHLTMN",

        "baseName": "Đề Cương Sinh lý học lứa tuổi mầm non",

        "rawName": "Đề Cương Sinh lý học lứa tuổi mầm non",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 455,

        "downloads": "2.2k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1drKzmzXIl4wysNxlcSmDvzK0YqYk21q-GdL_q7DU30c",

        "isReal": true,

        "university": "ajc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-068",

        "code": "SLHVGPHTE",

        "baseName": "Đề Cương Sinh Lý Học Và Giải Phẫu Học Trẻ Em",

        "rawName": "Đề Cương Sinh Lý Học Và Giải Phẫu Học Trẻ Em",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 359,

        "downloads": "2.9k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "138r7XgH_1O4LckOc0PSU8UR_NXR9E0JIcXDWtdL8EJc",

        "isReal": true,

        "university": "ba",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-084",

        "code": "SLHVVSHTEMN",

        "baseName": "Đề Cương Sinh Lý Học Và Vệ Sinh Học Trẻ Em Mầm Non",

        "rawName": "Đề Cương Sinh Lý Học Và Vệ Sinh Học Trẻ Em Mầm Non",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 311,

        "downloads": "2.0k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1yVvph1QLjtqlJqdfRvJzFM_QJZLlmWbvFd-bWSfXTVU",

        "isReal": true,

        "university": "hlu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-091",

        "code": "TLHNT",

        "baseName": "Đề Cương Tâm Lý Học Nhận Thức",

        "rawName": "Đề Cương Tâm Lý Học Nhận Thức",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 430,

        "downloads": "2.7k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1bhnlMYQYwmXC6ULxMgUlcZKGATj1z8QQA_HDcwT6jV8",

        "isReal": true,

        "university": "dav",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-151",

        "code": "TLHTHVTVHD",

        "baseName": "Đề Cương Tâm Lý Học Trường Học Và Tham Vấn Học Đường",

        "rawName": "Đề Cương Tâm Lý Học Trường Học Và Tham Vấn Học Đường.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 33,

        "rating": 4.9,

        "reviewsCount": 277,

        "downloads": "2.3k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1txXoPiSBS_KEtOd7ee3-ExwLnMkVWV5q",

        "driveType": "file",

        "isReal": true,

        "university": "ftu"

    },

    {

        "id": "REAL-DOC-144",

        "code": "TLHUD",

        "baseName": "Đề Cương Tâm Lý Học Ứng Dụng",

        "rawName": "Đề Cương Tâm Lý Học Ứng Dụng.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 371,

        "downloads": "3.0k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "10DB3xofjaREmD8d6FoHL0W0Zp0xO_jKC",

        "isReal": true,

        "university": "huc",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-133",

        "code": "TV",

        "baseName": "Đề Cương Tham Vấn",

        "rawName": "Đề Cương Tham Vấn.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 184,

        "downloads": "1.9k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1aCw4gz7zWEvMnupNzmlL4KlrvYHXu9eR",

        "isReal": true,

        "university": "dav",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-146",

        "code": "TTDT",

        "baseName": "Đề Cương Thanh Toán Điện Tử",

        "rawName": "Đề Cương Thanh Toán Điện Tử.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 405,

        "downloads": "3.2k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1VtGfxHQ4AZNPPg0y1jCfMgKGZzKDrCBR",

        "isReal": true,

        "university": "ftu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-072",

        "code": "TKDN",

        "baseName": "Đề Cương Thống Kê Doanh Nghiệp",

        "rawName": "Đề Cương Thống Kê Doanh Nghiệp",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 427,

        "downloads": "3.3k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "178iP_w6WjIJEgymiHNBk9u9NEGeue3chcn9T5qcbyLI",

        "isReal": true,

        "university": "neu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-124",

        "code": "TVTVHNNH",

        "baseName": "Đề Cương TIẾNG VIỆT - Từ vựng học & Ngữ nghĩa học",

        "rawName": "Đề Cương TIẾNG VIỆT - Từ vựng học & Ngữ nghĩa học",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 351,

        "downloads": "3.5k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1M5lAfOBhWWu2RLdnNOMyM4w5A369Dd9-XDONl1KkpRI",

        "isReal": true,

        "university": "tmu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-059",

        "code": "TVTH",

        "baseName": "Đề Cương Tiếng Việt Thực Hành",

        "rawName": "Đề Cương Tiếng Việt Thực Hành.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 206,

        "downloads": "2.0k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1wCxpDxThg2er-SF9iS4N-a1QfEdrImnB",

        "isReal": true,

        "university": "tmu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-160",

        "code": "VHDG",

        "baseName": "Đề Cương Văn Học Dân Gian",

        "rawName": "Đề Cương Văn Học Dân Gian.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 42,

        "rating": 4.9,

        "reviewsCount": 160,

        "downloads": "2.3k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1meSF-lSFYXnLIjxM7HsxLHwlo1wvNgbu",

        "driveType": "file",

        "isReal": true,

        "university": "neu"

    },

    {

        "id": "REAL-DOC-116",

        "code": "VHPT",

        "baseName": "Đề Cương Văn Học Phương Tây",

        "rawName": "Đề Cương Văn Học Phương Tây.docx",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 215,

        "downloads": "2.7k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "17EEP23smOowL9UK65hhY5LyjKTkkBbZ2",

        "isReal": true,

        "university": "neu",

        "driveType": "file"

    },

    {

        "id": "REAL-DOC-018",

        "code": "XDMTGDTTMN",

        "baseName": "Đề Cương Xây Dựng Môi Trường Giáo Dục Trong trường mầm non",

        "rawName": "Đề Cương Xây Dựng Môi Trường Giáo Dục Trong trường mầm non",

        "category": "Luật & Xã Hội",

        "icon": "⚖️",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 469,

        "downloads": "2.9k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Đề Thi",

        "tags": [

            "Trọng Tâm Ôn Thi",

            "Bài Tập & Lời Giải",

            "Chuẩn Bản Quyền"

        ],

        "description": "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",

        "driveId": "1G8f-OozyDFB6sp7fhqG0yCJCtj57fwVTg8jr_ETEcBo",

        "isReal": true,

        "university": "ussh",

        "driveType": "file"

    }

];







// ==========================================================================

// KHO ĐỀ CƯƠNG TRƯNG BÀY (200 MẪU ĐA TRƯỜNG)

// ==========================================================================

const DOCUMENTS_DATABASE = [

    {

        "id": "DOC-KTL-01",

        "code": "KTL301",

        "baseName": "Kinh Tế Lượng Ứng Dụng (Full EViews & Stata)",

        "category": "Kinh Tế & Thống Kê",

        "icon": "📊",

        "gradient": "from-blue-900 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-sky-300",

        "pages": 5,

        "rating": 5,

        "reviewsCount": 384,

        "downloads": "2.8k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Giải Chi Tiết 10 Đề Thi",

            "Mẹo Đọc Bảng EViews",

            "Công Thức Tóm Tắt"

        ],

        "description": "Đầy đủ các dạng bài tập hồi quy tuyến tính, kiểm định giả thuyết F, t-test, hiện tượng đa cộng tuyến, phương sai sai số thay đổi, tự tương quan.",

        "university": "neu"

    },

    {

        "id": "DOC-MLN-02",

        "code": "MLN101",

        "baseName": "Triết Học Mác - Lênin (Sơ Đồ Tư Duy & Mẹo Nhớ)",

        "category": "Các Môn Đại Cương",

        "icon": "🧠",

        "gradient": "from-rose-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 22,

        "rating": 4.9,

        "reviewsCount": 520,

        "downloads": "4.5k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Best Seller",

        "tags": [

            "Sơ Đồ Mindmap",

            "2 Cặp Phạm Trù 3 Quy Luật",

            "50 Câu Tự Luận Điểm A+"

        ],

        "description": "Hệ thống hóa toàn bộ kiến thức Triết học từ CNDV biện chứng đến CNDV lịch sử. Dàn bài phân tích liên hệ thực tiễn bản thân & kinh tế.",

        "university": "neu"

    },

    {

        "id": "DOC-MKT-03",

        "code": "MKT201",

        "baseName": "Marketing Căn Bản (Frameworks 4P/7P & Case Study ĐMX)",

        "category": "Marketing & Quản Trị",

        "icon": "🎯",

        "gradient": "from-emerald-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 8,

        "rating": 5,

        "reviewsCount": 290,

        "downloads": "1.9k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Phân Tích 4P - STP",

            "Inbound vs Outbound Case",

            "Ngân Hàng 200 Câu Trắc Nghiệm"

        ],

        "description": "Đề cương chuẩn kiến thức Kotler, hành vi người tiêu dùng, định vị STP, chiến lược sản phẩm, giá, kênh và truyền thông IMC.",

        "university": "neu"

    },

    {

        "id": "DOC-TCDN-04",

        "code": "TCD302",

        "baseName": "Tài Chính Doanh Nghiệp (Báo Cáo Tài Chính & NPV/IRR)",

        "category": "Tài Chính - Ngân Hàng",

        "icon": "💰",

        "gradient": "from-amber-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-yellow-300",

        "pages": 10,

        "rating": 4.9,

        "reviewsCount": 415,

        "downloads": "3.1k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Công Thức Tính NPV/IRR",

            "Phân Tích Dupont",

            "Bộ Bài Tập Bảng Tính Excel"

        ],

        "description": "Dòng tiền dự án, định giá chứng khoán, chi phí vốn WACC, cơ cấu vốn tối ưu, đòn bẩy kinh doanh và tài chính.",

        "university": "ftu"

    },

    {

        "id": "DOC-VIMO-05",

        "code": "ECO102",

        "baseName": "Kinh Tế Vi Mô 1 & 2 (Đồ Thị Co Giãn & Tối Ưu Hóa)",

        "category": "Kinh Tế & Thống Kê",

        "icon": "📈",

        "gradient": "from-cyan-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 310,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Hàm Lợi Ích U(X,Y)",

            "Thị Trường Cạnh Tranh & Độc Quyền",

            "Mẹo Vẽ Đồ Thị Nhanh"

        ],

        "description": "Hệ thống toàn bộ cung cầu, độ co giãn, thặng dư tiêu dùng, tối ưu hóa chi phí ngắn/dài hạn, các cấu trúc thị trường.",

        "university": "ftu"

    },

    {

        "id": "DOC-LUAT-06",

        "code": "LAW202",

        "baseName": "Pháp Luật Đại Cương & Luật Kinh Tế (Tình Huống & Án Lệ)",

        "category": "Pháp Luật",

        "icon": "⚖️",

        "gradient": "from-purple-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 25,

        "rating": 5,

        "reviewsCount": 265,

        "downloads": "1.7k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Xử Lý Tình Huống Hợp Đồng",

            "Luật Doanh Nghiệp 2020",

            "Giải Thích Điều Luật Dễ Hiểu"

        ],

        "description": "Lý luận nhà nước và pháp luật, Luật Doanh nghiệp, Luật Thương mại, giải quyết tranh chấp kinh doanh và hợp đồng.",

        "university": "bkhn"

    },

    {

        "id": "DOC-QTH-07",

        "code": "MAN101",

        "baseName": "Quản Trị Học Căn Bản (4 Chức Năng POLC & SWOT)",

        "category": "Marketing & Quản Trị",

        "icon": "📋",

        "gradient": "from-blue-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-sky-300",

        "pages": 7,

        "rating": 4.9,

        "reviewsCount": 220,

        "downloads": "1.5k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Hoạch Định - Tổ Chức - Lãnh Đạo - Kiểm Tra",

            "Ma Trận SWOT & BCG",

            "Dàn Ý Tự Luận"

        ],

        "description": "Bao quát 4 chức năng cốt lõi: Hoạch định chiến lược, Thiết kế cơ cấu tổ chức, Phong cách lãnh đạo, Hệ thống kiểm soát.",

        "university": "tmu"

    },

    {

        "id": "DOC-IT-08",

        "code": "IT205",

        "baseName": "Cơ Sở Dữ Liệu & SQL Chuẩn (Thực Hành Truy Vấn + ERD)",

        "category": "Công Nghệ & Kỹ Thuật",

        "icon": "💻",

        "gradient": "from-emerald-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 15,

        "rating": 5,

        "reviewsCount": 340,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Vẽ Mô Hình ERD",

            "Chuẩn Hóa 1NF-3NF-BCNF",

            "50 Câu Lệnh SQL Nâng Cao"

        ],

        "university": "bkhn"

    },

    {

        "id": "DOC-1001",

        "code": "SUB923",

        "baseName": "Phương Pháp Giảng Dạy (Sơ Đồ Tư Duy)",

        "category": "Sư phạm",

        "icon": "📐",

        "gradient": "from-blue-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 8,

        "rating": 5,

        "reviewsCount": 170,

        "downloads": "1.5k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 2",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hcmue"

    },

    {

        "id": "DOC-1002",

        "code": "SUB425",

        "baseName": "Quản Trị Nhà Hàng (Full Đáp Án)",

        "category": "Du lịch & Khách sạn",

        "icon": "📐",

        "gradient": "from-teal-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 9,

        "rating": 4.8,

        "reviewsCount": 538,

        "downloads": "4.2k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 56",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Nhà Hàng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tmu"

    },

    {

        "id": "DOC-1003",

        "code": "SUB211",

        "baseName": "Tiếng Anh Chuyên Ngành (Full Đáp Án)",

        "category": "Ngoại ngữ",

        "icon": "🔬",

        "gradient": "from-teal-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 10,

        "rating": 4.9,

        "reviewsCount": 505,

        "downloads": "2.2k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 61",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Anh Chuyên Ngành cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ulis"

    },

    {

        "id": "DOC-1004",

        "code": "SUB431",

        "baseName": "Phương Pháp Giảng Dạy (Sơ Đồ Tư Duy)",

        "category": "Sư phạm",

        "icon": "🎓",

        "gradient": "from-purple-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 504,

        "downloads": "4.2k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 40",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ued"

    },

    {

        "id": "DOC-1005",

        "code": "SUB154",

        "baseName": "Logic Học (Full Đáp Án)",

        "category": "Đại cương",

        "icon": "📋",

        "gradient": "from-amber-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 375,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 19",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Logic Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ftu"

    },

    {

        "id": "DOC-1006",

        "code": "SUB171",

        "baseName": "Kinh Tế Lượng (Đề Thi Cuối Kỳ)",

        "category": "Kinh tế",

        "icon": "📐",

        "gradient": "from-indigo-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 7,

        "rating": 4.8,

        "reviewsCount": 495,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 2",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Kinh Tế Lượng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tmu"

    },

    {

        "id": "DOC-1007",

        "code": "SUB241",

        "baseName": "Tiếng Hàn TOPIK (Tóm Tắt Ngắn Gọn)",

        "category": "Ngoại ngữ",

        "icon": "🔬",

        "gradient": "from-cyan-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 8,

        "rating": 4.9,

        "reviewsCount": 426,

        "downloads": "3.5k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 38",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Hàn TOPIK cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ftu"

    },

    {

        "id": "DOC-1008",

        "code": "SUB378",

        "baseName": "Quản Trị Nhà Hàng (Đề Thi Cuối Kỳ)",

        "category": "Du lịch & Khách sạn",

        "icon": "🔬",

        "gradient": "from-purple-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 9,

        "rating": 5,

        "reviewsCount": 490,

        "downloads": "4.5k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 11",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Nhà Hàng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ussh"

    },

    {

        "id": "DOC-1009",

        "code": "SUB272",

        "baseName": "Tiếng Nhật N3/N4 (Đề Thi Cuối Kỳ)",

        "category": "Ngoại ngữ",

        "icon": "🏛️",

        "gradient": "from-indigo-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 10,

        "rating": 4.8,

        "reviewsCount": 188,

        "downloads": "4.4k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 53",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dav"

    },

    {

        "id": "DOC-1010",

        "code": "SUB446",

        "baseName": "Luật Thương Mại Quốc Tế (Sơ Đồ Tư Duy)",

        "category": "Luật",

        "icon": "🎯",

        "gradient": "from-purple-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 8,

        "rating": 5,

        "reviewsCount": 342,

        "downloads": "3.4k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 68",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hlu"

    },

    {

        "id": "DOC-1011",

        "code": "SUB570",

        "baseName": "Địa Lý Du Lịch (Trắc Nghiệm & Tự Luận)",

        "category": "Du lịch & Khách sạn",

        "icon": "📝",

        "gradient": "from-amber-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 5,

        "reviewsCount": 224,

        "downloads": "3.4k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 85",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ntu"

    },

    {

        "id": "DOC-1012",

        "code": "SUB202",

        "baseName": "Tiếng Trung HSK4 (Chi Tiết Phụ)",

        "category": "Ngoại ngữ",

        "icon": "📚",

        "gradient": "from-indigo-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 10,

        "rating": 4.9,

        "reviewsCount": 424,

        "downloads": "3.7k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Tag 14",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Trung HSK4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ussh"

    },

    {

        "id": "DOC-1013",

        "code": "SUB331",

        "baseName": "Triết Học Mác - Lênin (Chi Tiết Phụ)",

        "category": "Đại cương",

        "icon": "📋",

        "gradient": "from-cyan-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 21,

        "rating": 5,

        "reviewsCount": 423,

        "downloads": "3.9k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 87",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Triết Học Mác - Lênin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tmu"

    },

    {

        "id": "DOC-1014",

        "code": "SUB130",

        "baseName": "Quản Trị Nhân Lực (Đề Thi Cuối Kỳ)",

        "category": "Quản trị",

        "icon": "📈",

        "gradient": "from-slate-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 548,

        "downloads": "4.8k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 15",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Nhân Lực cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ueh"

    },

    {

        "id": "DOC-1015",

        "code": "SUB786",

        "baseName": "Luật Thương Mại Quốc Tế (Trắc Nghiệm & Tự Luận)",

        "category": "Luật",

        "icon": "📐",

        "gradient": "from-blue-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 7,

        "rating": 4.8,

        "reviewsCount": 243,

        "downloads": "2.8k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 15",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "uel"

    },

    {

        "id": "DOC-1016",

        "code": "SUB801",

        "baseName": "Tài Chính Tiền Tệ (Đề Thi Cuối Kỳ)",

        "category": "Kinh tế",

        "icon": "📝",

        "gradient": "from-blue-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 8,

        "rating": 4.9,

        "reviewsCount": 475,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 40",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tài Chính Tiền Tệ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hvtc"

    },

    {

        "id": "DOC-1017",

        "code": "SUB501",

        "baseName": "Tiếng Hàn TOPIK (Tóm Tắt Ngắn Gọn)",

        "category": "Ngoại ngữ",

        "icon": "⚖️",

        "gradient": "from-rose-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 9,

        "rating": 4.8,

        "reviewsCount": 128,

        "downloads": "4.1k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Best Seller",

        "tags": [

            "Tag 50",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Hàn TOPIK cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hcmue"

    },

    {

        "id": "DOC-1018",

        "code": "SUB880",

        "baseName": "Địa Lý Du Lịch (Sơ Đồ Tư Duy)",

        "category": "Du lịch & Khách sạn",

        "icon": "🧠",

        "gradient": "from-purple-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 10,

        "rating": 4.9,

        "reviewsCount": 478,

        "downloads": "3.8k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 62",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "vanlang"

    },

    {

        "id": "DOC-1019",

        "code": "SUB662",

        "baseName": "Phương Pháp Giảng Dạy (Tóm Tắt Ngắn Gọn)",

        "category": "Sư phạm",

        "icon": "💻",

        "gradient": "from-cyan-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 445,

        "downloads": "1.1k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 20",

            "Chủ đề 3",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dhhp"

    },

    {

        "id": "DOC-1020",

        "code": "SUB245",

        "baseName": "Chủ Nghĩa Xã Hội Khoa Học (Full Đáp Án)",

        "category": "Đại cương",

        "icon": "💡",

        "gradient": "from-indigo-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 27,

        "rating": 4.9,

        "reviewsCount": 532,

        "downloads": "2.3k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 58",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Chủ Nghĩa Xã Hội Khoa Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hvtc"

    },

    {

        "id": "DOC-1021",

        "code": "SUB973",

        "baseName": "Thương Mại Điện Tử (Chi Tiết Phụ)",

        "category": "Quản trị",

        "icon": "🔬",

        "gradient": "from-amber-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 4.8,

        "reviewsCount": 318,

        "downloads": "3.4k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 23",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Thương Mại Điện Tử cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ufm"

    },

    {

        "id": "DOC-1022",

        "code": "SUB343",

        "baseName": "Đánh Giá Trong Giáo Dục (Trắc Nghiệm & Tự Luận)",

        "category": "Sư phạm",

        "icon": "🔢",

        "gradient": "from-slate-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 543,

        "downloads": "3.5k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 77",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Đánh Giá Trong Giáo Dục cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hongduc"

    },

    {

        "id": "DOC-1023",

        "code": "SUB889",

        "baseName": "Chủ Nghĩa Xã Hội Khoa Học (Trắc Nghiệm & Tự Luận)",

        "category": "Đại cương",

        "icon": "🌍",

        "gradient": "from-blue-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 22,

        "rating": 5,

        "reviewsCount": 359,

        "downloads": "2.7k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Best Seller",

        "tags": [

            "Tag 79",

            "Chủ đề 3",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Chủ Nghĩa Xã Hội Khoa Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ueh"

    },

    {

        "id": "DOC-1024",

        "code": "SUB270",

        "baseName": "Xác Suất Thống Kê (Sơ Đồ Tư Duy)",

        "category": "Đại cương",

        "icon": "📐",

        "gradient": "from-purple-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 7,

        "rating": 4.9,

        "reviewsCount": 204,

        "downloads": "3.0k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 100",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Xác Suất Thống Kê cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ba"

    },

    {

        "id": "DOC-1025",

        "code": "SUB441",

        "baseName": "Lập Trình C/C++ (Đề Thi Cuối Kỳ)",

        "category": "Công nghệ",

        "icon": "📊",

        "gradient": "from-blue-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 17,

        "rating": 4.8,

        "reviewsCount": 573,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 38",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Lập Trình C/C++ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "uet"

    },

    {

        "id": "DOC-1026",

        "code": "SUB303",

        "baseName": "Lịch Sử Đảng Cộng Sản Việt Nam (Sơ Đồ Tư Duy)",

        "category": "Đại cương",

        "icon": "📊",

        "gradient": "from-blue-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 25,

        "rating": 4.9,

        "reviewsCount": 589,

        "downloads": "1.8k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Best Seller",

        "tags": [

            "Tag 1",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Lịch Sử Đảng Cộng Sản Việt Nam cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dav"

    },

    {

        "id": "DOC-1027",

        "code": "SUB470",

        "baseName": "Thương Mại Điện Tử (Tóm Tắt Ngắn Gọn)",

        "category": "Quản trị",

        "icon": "🧪",

        "gradient": "from-purple-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 10,

        "rating": 4.9,

        "reviewsCount": 522,

        "downloads": "4.7k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 77",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Thương Mại Điện Tử cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "thanglong"

    },

    {

        "id": "DOC-1028",

        "code": "SUB169",

        "baseName": "Luật Thương Mại Quốc Tế (Sơ Đồ Tư Duy)",

        "category": "Luật",

        "icon": "📝",

        "gradient": "from-slate-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 282,

        "downloads": "4.1k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Tag 13",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "neu"

    },

    {

        "id": "DOC-1029",

        "code": "SUB190",

        "baseName": "Kinh Tế Quốc Tế (Full Đáp Án)",

        "category": "Kinh tế",

        "icon": "🎯",

        "gradient": "from-cyan-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 6,

        "rating": 4.8,

        "reviewsCount": 428,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Tag 59",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Kinh Tế Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dnu"

    },

    {

        "id": "DOC-1030",

        "code": "SUB709",

        "baseName": "An Toàn Thông Tin (Trắc Nghiệm & Tự Luận)",

        "category": "Công nghệ",

        "icon": "📝",

        "gradient": "from-teal-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 19,

        "rating": 4.9,

        "reviewsCount": 399,

        "downloads": "4.6k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 2",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu An Toàn Thông Tin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ptit"

    },

    {

        "id": "DOC-1031",

        "code": "SUB758",

        "baseName": "Lập Trình Python (Đề Thi Cuối Kỳ)",

        "category": "Công nghệ",

        "icon": "🔬",

        "gradient": "from-cyan-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 14,

        "rating": 5,

        "reviewsCount": 490,

        "downloads": "2.3k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 27",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Lập Trình Python cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "thanglong"

    },

    {

        "id": "DOC-1032",

        "code": "SUB809",

        "baseName": "Lập Trình C/C++ (Trắc Nghiệm & Tự Luận)",

        "category": "Công nghệ",

        "icon": "🔢",

        "gradient": "from-emerald-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 15,

        "rating": 5,

        "reviewsCount": 481,

        "downloads": "1.3k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 45",

            "Chủ đề 3",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Lập Trình C/C++ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hutech"

    },

    {

        "id": "DOC-1033",

        "code": "SUB221",

        "baseName": "Logic Học (Trắc Nghiệm & Tự Luận)",

        "category": "Đại cương",

        "icon": "🌍",

        "gradient": "from-blue-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 471,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 58",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Logic Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "uet"

    },

    {

        "id": "DOC-1034",

        "code": "SUB369",

        "baseName": "Tiếng Anh Thương Mại (Chi Tiết Phụ)",

        "category": "Ngoại ngữ",

        "icon": "📊",

        "gradient": "from-emerald-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 583,

        "downloads": "4.9k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Best Seller",

        "tags": [

            "Tag 67",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Anh Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "huflit"

    },

    {

        "id": "DOC-1035",

        "code": "SUB642",

        "baseName": "Luật Hình Sự (Chi Tiết Phụ)",

        "category": "Luật",

        "icon": "🔢",

        "gradient": "from-slate-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 346,

        "downloads": "4.9k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Tag 24",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Hình Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ftu"

    },

    {

        "id": "DOC-1036",

        "code": "SUB525",

        "baseName": "Bảo Hiểm (Đề Thi Cuối Kỳ)",

        "category": "Kinh tế",

        "icon": "⚖️",

        "gradient": "from-purple-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 10,

        "rating": 4.8,

        "reviewsCount": 228,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 76",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Bảo Hiểm cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hutech"

    },

    {

        "id": "DOC-1037",

        "code": "SUB859",

        "baseName": "Marketing Quốc Tế (Đề Thi Cuối Kỳ)",

        "category": "Quản trị",

        "icon": "🎓",

        "gradient": "from-indigo-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 100,

        "downloads": "4.3k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 93",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Marketing Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hou"

    },

    {

        "id": "DOC-1038",

        "code": "SUB961",

        "baseName": "Marketing Quốc Tế (Chi Tiết Phụ)",

        "category": "Quản trị",

        "icon": "🔢",

        "gradient": "from-emerald-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 339,

        "downloads": "2.8k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 90",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Marketing Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "bkhn"

    },

    {

        "id": "DOC-1039",

        "code": "SUB584",

        "baseName": "Lập Trình C/C++ (Đề Thi Cuối Kỳ)",

        "category": "Công nghệ",

        "icon": "💡",

        "gradient": "from-purple-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 16,

        "rating": 4.8,

        "reviewsCount": 416,

        "downloads": "1.6k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 25",

            "Chủ đề 3",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Lập Trình C/C++ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "vanlang"

    },

    {

        "id": "DOC-1040",

        "code": "SUB554",

        "baseName": "Lịch Sử Đảng Cộng Sản Việt Nam (Sơ Đồ Tư Duy)",

        "category": "Đại cương",

        "icon": "📊",

        "gradient": "from-cyan-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 21,

        "rating": 4.8,

        "reviewsCount": 346,

        "downloads": "4.4k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 99",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Lịch Sử Đảng Cộng Sản Việt Nam cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ueb"

    },

    {

        "id": "DOC-1041",

        "code": "SUB290",

        "baseName": "Luật Kinh Tế (Đề Thi Cuối Kỳ)",

        "category": "Luật",

        "icon": "📚",

        "gradient": "from-slate-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 6,

        "rating": 4.8,

        "reviewsCount": 430,

        "downloads": "3.8k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Best Seller",

        "tags": [

            "Tag 56",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tmu"

    },

    {

        "id": "DOC-1042",

        "code": "SUB608",

        "baseName": "Nghiệp Vụ Hướng Dẫn (Full Đáp Án)",

        "category": "Du lịch & Khách sạn",

        "icon": "💡",

        "gradient": "from-blue-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 7,

        "rating": 4.8,

        "reviewsCount": 345,

        "downloads": "3.2k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 100",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Nghiệp Vụ Hướng Dẫn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hutech"

    },

    {

        "id": "DOC-1043",

        "code": "SUB400",

        "baseName": "An Toàn Thông Tin (Sơ Đồ Tư Duy)",

        "category": "Công nghệ",

        "icon": "🔬",

        "gradient": "from-emerald-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 17,

        "rating": 4.8,

        "reviewsCount": 284,

        "downloads": "2.2k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 100",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu An Toàn Thông Tin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "eaut"

    },

    {

        "id": "DOC-1044",

        "code": "SUB569",

        "baseName": "Tiếng Nhật N3/N4 (Tóm Tắt Ngắn Gọn)",

        "category": "Ngoại ngữ",

        "icon": "📋",

        "gradient": "from-emerald-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 443,

        "downloads": "3.2k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 23",

            "Chủ đề 3",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "vanlang"

    },

    {

        "id": "DOC-1045",

        "code": "SUB264",

        "baseName": "Quản Trị Khách Sạn (Trắc Nghiệm & Tự Luận)",

        "category": "Du lịch & Khách sạn",

        "icon": "🎓",

        "gradient": "from-blue-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 10,

        "rating": 4.8,

        "reviewsCount": 231,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Best Seller",

        "tags": [

            "Tag 24",

            "Chủ đề 3",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Khách Sạn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hou"

    },

    {

        "id": "DOC-1046",

        "code": "SUB599",

        "baseName": "Luật Thương Mại Quốc Tế (Chi Tiết Phụ)",

        "category": "Luật",

        "icon": "📋",

        "gradient": "from-amber-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 431,

        "downloads": "3.2k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 13",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hou"

    },

    {

        "id": "DOC-1047",

        "code": "SUB777",

        "baseName": "An Toàn Thông Tin (Trắc Nghiệm & Tự Luận)",

        "category": "Công nghệ",

        "icon": "⚖️",

        "gradient": "from-rose-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 15,

        "rating": 4.9,

        "reviewsCount": 220,

        "downloads": "2.8k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 42",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu An Toàn Thông Tin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "phenikaa"

    },

    {

        "id": "DOC-1048",

        "code": "SUB843",

        "baseName": "Giáo Dục Học (Full Đáp Án)",

        "category": "Sư phạm",

        "icon": "🎓",

        "gradient": "from-rose-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 7,

        "rating": 4.9,

        "reviewsCount": 504,

        "downloads": "4.6k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 52",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Giáo Dục Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "vinhuni"

    },

    {

        "id": "DOC-1049",

        "code": "SUB228",

        "baseName": "Tư Tưởng Hồ Chí Minh (Tóm Tắt Ngắn Gọn)",

        "category": "Đại cương",

        "icon": "💻",

        "gradient": "from-purple-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 22,

        "rating": 5,

        "reviewsCount": 251,

        "downloads": "2.7k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 6",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tư Tưởng Hồ Chí Minh cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ulis"

    },

    {

        "id": "DOC-1050",

        "code": "SUB963",

        "baseName": "Lịch Sử Đảng Cộng Sản Việt Nam (Chi Tiết Phụ)",

        "category": "Đại cương",

        "icon": "📚",

        "gradient": "from-slate-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 22,

        "rating": 5,

        "reviewsCount": 281,

        "downloads": "3.3k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 1",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Lịch Sử Đảng Cộng Sản Việt Nam cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ussh"

    },

    {

        "id": "DOC-1051",

        "code": "SUB944",

        "baseName": "Quản Trị Nhà Hàng (Tóm Tắt Ngắn Gọn)",

        "category": "Du lịch & Khách sạn",

        "icon": "🧪",

        "gradient": "from-slate-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 7,

        "rating": 4.9,

        "reviewsCount": 556,

        "downloads": "4.5k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 80",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Nhà Hàng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dnu"

    },

    {

        "id": "DOC-1052",

        "code": "SUB841",

        "baseName": "Tâm Lý Học Sư Phạm (Trắc Nghiệm & Tự Luận)",

        "category": "Sư phạm",

        "icon": "📊",

        "gradient": "from-cyan-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 8,

        "rating": 4.9,

        "reviewsCount": 595,

        "downloads": "1.5k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 75",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tâm Lý Học Sư Phạm cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hnue"

    },

    {

        "id": "DOC-1053",

        "code": "SUB895",

        "baseName": "Luật Kinh Tế (Đề Thi Cuối Kỳ)",

        "category": "Luật",

        "icon": "💰",

        "gradient": "from-slate-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 9,

        "rating": 4.8,

        "reviewsCount": 354,

        "downloads": "4.2k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 25",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dnu"

    },

    {

        "id": "DOC-1054",

        "code": "SUB626",

        "baseName": "Thuế (Tóm Tắt Ngắn Gọn)",

        "category": "Kinh tế",

        "icon": "💰",

        "gradient": "from-blue-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 451,

        "downloads": "3.2k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 53",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Thuế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ba"

    },

    {

        "id": "DOC-1055",

        "code": "SUB268",

        "baseName": "Đánh Giá Trong Giáo Dục (Trắc Nghiệm & Tự Luận)",

        "category": "Sư phạm",

        "icon": "🎯",

        "gradient": "from-cyan-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 364,

        "downloads": "4.4k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 18",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Đánh Giá Trong Giáo Dục cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hnue2"

    },

    {

        "id": "DOC-1056",

        "code": "SUB671",

        "baseName": "Cơ Sở Dữ Liệu (Trắc Nghiệm & Tự Luận)",

        "category": "Công nghệ",

        "icon": "🌍",

        "gradient": "from-rose-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 15,

        "rating": 4.9,

        "reviewsCount": 150,

        "downloads": "1.9k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 2",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Cơ Sở Dữ Liệu cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "duytan"

    },

    {

        "id": "DOC-1057",

        "code": "SUB926",

        "baseName": "Triết Học Mác - Lênin (Trắc Nghiệm & Tự Luận)",

        "category": "Đại cương",

        "icon": "⚖️",

        "gradient": "from-indigo-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 21,

        "rating": 4.9,

        "reviewsCount": 421,

        "downloads": "3.7k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 81",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Triết Học Mác - Lênin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ptit"

    },

    {

        "id": "DOC-1058",

        "code": "SUB926",

        "baseName": "Tâm Lý Học Sư Phạm (Sơ Đồ Tư Duy)",

        "category": "Sư phạm",

        "icon": "📊",

        "gradient": "from-cyan-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 8,

        "rating": 4.9,

        "reviewsCount": 156,

        "downloads": "1.6k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 14",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tâm Lý Học Sư Phạm cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dhsphue"

    },

    {

        "id": "DOC-1059",

        "code": "SUB691",

        "baseName": "Kinh Tế Phát Triển (Đề Thi Cuối Kỳ)",

        "category": "Kinh tế",

        "icon": "💡",

        "gradient": "from-purple-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 533,

        "downloads": "3.8k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 19",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Kinh Tế Phát Triển cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ajc"

    },

    {

        "id": "DOC-1060",

        "code": "SUB580",

        "baseName": "Phương Pháp Giảng Dạy (Đề Thi Cuối Kỳ)",

        "category": "Sư phạm",

        "icon": "✍️",

        "gradient": "from-slate-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 527,

        "downloads": "2.5k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 53",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hcmue"

    },

    {

        "id": "DOC-1061",

        "code": "SUB307",

        "baseName": "Đánh Giá Trong Giáo Dục (Tóm Tắt Ngắn Gọn)",

        "category": "Sư phạm",

        "icon": "⚖️",

        "gradient": "from-cyan-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 8,

        "rating": 4.9,

        "reviewsCount": 162,

        "downloads": "3.7k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 8",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Đánh Giá Trong Giáo Dục cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ued"

    },

    {

        "id": "DOC-1062",

        "code": "SUB469",

        "baseName": "Luật Kinh Tế (Tóm Tắt Ngắn Gọn)",

        "category": "Luật",

        "icon": "⚖️",

        "gradient": "from-amber-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 5,

        "reviewsCount": 594,

        "downloads": "3.5k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Tag 59",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hul"

    },

    {

        "id": "DOC-1063",

        "code": "SUB729",

        "baseName": "Tiếng Nhật N3/N4 (Full Đáp Án)",

        "category": "Ngoại ngữ",

        "icon": "🧠",

        "gradient": "from-cyan-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 10,

        "rating": 4.8,

        "reviewsCount": 513,

        "downloads": "2.0k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 68",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "thanglong"

    },

    {

        "id": "DOC-1064",

        "code": "SUB633",

        "baseName": "Cơ Sở Dữ Liệu (Chi Tiết Phụ)",

        "category": "Công nghệ",

        "icon": "📋",

        "gradient": "from-rose-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 14,

        "rating": 4.9,

        "reviewsCount": 421,

        "downloads": "1.0k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 84",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Cơ Sở Dữ Liệu cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hou"

    },

    {

        "id": "DOC-1065",

        "code": "SUB878",

        "baseName": "Luật Lao Động (Sơ Đồ Tư Duy)",

        "category": "Luật",

        "icon": "🧠",

        "gradient": "from-indigo-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 225,

        "downloads": "4.8k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Best Seller",

        "tags": [

            "Tag 47",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Lao Động cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ba"

    },

    {

        "id": "DOC-1066",

        "code": "SUB242",

        "baseName": "Quản Trị Khách Sạn (Tóm Tắt Ngắn Gọn)",

        "category": "Du lịch & Khách sạn",

        "icon": "💻",

        "gradient": "from-rose-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 7,

        "rating": 4.9,

        "reviewsCount": 352,

        "downloads": "3.3k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 25",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Khách Sạn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hoasen"

    },

    {

        "id": "DOC-1067",

        "code": "SUB275",

        "baseName": "Phương Pháp Giảng Dạy (Tóm Tắt Ngắn Gọn)",

        "category": "Sư phạm",

        "icon": "💻",

        "gradient": "from-purple-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 8,

        "rating": 4.9,

        "reviewsCount": 213,

        "downloads": "1.0k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 29",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dhhp"

    },

    {

        "id": "DOC-1068",

        "code": "SUB436",

        "baseName": "Logic Học (Đề Thi Cuối Kỳ)",

        "category": "Đại cương",

        "icon": "✍️",

        "gradient": "from-rose-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 9,

        "rating": 4.8,

        "reviewsCount": 408,

        "downloads": "4.8k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Tag 25",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Logic Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hlu"

    },

    {

        "id": "DOC-1069",

        "code": "SUB608",

        "baseName": "Cơ Sở Dữ Liệu (Đề Thi Cuối Kỳ)",

        "category": "Công nghệ",

        "icon": "💻",

        "gradient": "from-cyan-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 19,

        "rating": 4.8,

        "reviewsCount": 443,

        "downloads": "4.5k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Best Seller",

        "tags": [

            "Tag 47",

            "Chủ đề 3",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Cơ Sở Dữ Liệu cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dnu"

    },

    {

        "id": "DOC-1070",

        "code": "SUB621",

        "baseName": "Tâm Lý Học Sư Phạm (Trắc Nghiệm & Tự Luận)",

        "category": "Sư phạm",

        "icon": "✍️",

        "gradient": "from-purple-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 8,

        "rating": 5,

        "reviewsCount": 518,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 100",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tâm Lý Học Sư Phạm cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hongduc"

    },

    {

        "id": "DOC-1071",

        "code": "SUB116",

        "baseName": "Tài Chính Tiền Tệ (Tóm Tắt Ngắn Gọn)",

        "category": "Kinh tế",

        "icon": "💡",

        "gradient": "from-cyan-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 9,

        "rating": 4.8,

        "reviewsCount": 202,

        "downloads": "1.2k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Best Seller",

        "tags": [

            "Tag 14",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tài Chính Tiền Tệ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ueh"

    },

    {

        "id": "DOC-1072",

        "code": "SUB406",

        "baseName": "Marketing Quốc Tế (Trắc Nghiệm & Tự Luận)",

        "category": "Quản trị",

        "icon": "📚",

        "gradient": "from-rose-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 481,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Tag 18",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Marketing Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "neu"

    },

    {

        "id": "DOC-1073",

        "code": "SUB114",

        "baseName": "Lịch Sử Đảng Cộng Sản Việt Nam (Tóm Tắt Ngắn Gọn)",

        "category": "Đại cương",

        "icon": "💡",

        "gradient": "from-teal-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 27,

        "rating": 4.9,

        "reviewsCount": 577,

        "downloads": "4.7k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Tag 26",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Lịch Sử Đảng Cộng Sản Việt Nam cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hutech"

    },

    {

        "id": "DOC-1074",

        "code": "SUB106",

        "baseName": "Tư Tưởng Hồ Chí Minh (Tóm Tắt Ngắn Gọn)",

        "category": "Đại cương",

        "icon": "🔢",

        "gradient": "from-teal-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 28,

        "rating": 5,

        "reviewsCount": 247,

        "downloads": "4.0k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Tag 17",

            "Chủ đề 3",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tư Tưởng Hồ Chí Minh cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "vanlang"

    },

    {

        "id": "DOC-1075",

        "code": "SUB118",

        "baseName": "Địa Lý Du Lịch (Full Đáp Án)",

        "category": "Du lịch & Khách sạn",

        "icon": "📊",

        "gradient": "from-indigo-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 7,

        "rating": 4.9,

        "reviewsCount": 146,

        "downloads": "4.8k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Best Seller",

        "tags": [

            "Tag 1",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "neu"

    },

    {

        "id": "DOC-1076",

        "code": "SUB190",

        "baseName": "Logic Học (Tóm Tắt Ngắn Gọn)",

        "category": "Đại cương",

        "icon": "📚",

        "gradient": "from-purple-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 8,

        "rating": 5,

        "reviewsCount": 502,

        "downloads": "4.8k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 31",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Logic Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hoasen"

    },

    {

        "id": "DOC-1077",

        "code": "SUB793",

        "baseName": "Xác Suất Thống Kê (Tóm Tắt Ngắn Gọn)",

        "category": "Đại cương",

        "icon": "🌍",

        "gradient": "from-cyan-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 240,

        "downloads": "2.8k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 7",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Xác Suất Thống Kê cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dhhp"

    },

    {

        "id": "DOC-1078",

        "code": "SUB713",

        "baseName": "Luật Thương Mại Quốc Tế (Full Đáp Án)",

        "category": "Luật",

        "icon": "✍️",

        "gradient": "from-blue-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 299,

        "downloads": "4.9k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 1",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tcnh_hn"

    },

    {

        "id": "DOC-1079",

        "code": "SUB824",

        "baseName": "Tiếng Nhật N3/N4 (Tóm Tắt Ngắn Gọn)",

        "category": "Ngoại ngữ",

        "icon": "📋",

        "gradient": "from-emerald-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 175,

        "downloads": "4.0k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Tag 1",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dnu"

    },

    {

        "id": "DOC-1080",

        "code": "SUB426",

        "baseName": "Tiếng Trung HSK4 (Tóm Tắt Ngắn Gọn)",

        "category": "Ngoại ngữ",

        "icon": "📚",

        "gradient": "from-slate-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 9,

        "rating": 5,

        "reviewsCount": 258,

        "downloads": "4.2k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 47",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Trung HSK4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "neu"

    },

    {

        "id": "DOC-1081",

        "code": "SUB262",

        "baseName": "Thị Trường Chứng Khoán (Full Đáp Án)",

        "category": "Kinh tế",

        "icon": "🎓",

        "gradient": "from-blue-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 519,

        "downloads": "1.2k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 50",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Thị Trường Chứng Khoán cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ueb"

    },

    {

        "id": "DOC-1082",

        "code": "SUB710",

        "baseName": "Quản Trị Học (Full Đáp Án)",

        "category": "Quản trị",

        "icon": "📋",

        "gradient": "from-rose-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 5,

        "rating": 5,

        "reviewsCount": 363,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 54",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ftu"

    },

    {

        "id": "DOC-1083",

        "code": "SUB949",

        "baseName": "Nguyên Lý Kế Toán (Tóm Tắt Ngắn Gọn)",

        "category": "Kinh tế",

        "icon": "✍️",

        "gradient": "from-teal-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 343,

        "downloads": "1.7k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 52",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Nguyên Lý Kế Toán cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ufm"

    },

    {

        "id": "DOC-1084",

        "code": "SUB999",

        "baseName": "Xác Suất Thống Kê (Sơ Đồ Tư Duy)",

        "category": "Đại cương",

        "icon": "🧠",

        "gradient": "from-blue-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 209,

        "downloads": "1.5k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 88",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Xác Suất Thống Kê cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "duytan"

    },

    {

        "id": "DOC-1085",

        "code": "SUB389",

        "baseName": "Luật Lao Động (Chi Tiết Phụ)",

        "category": "Luật",

        "icon": "🔢",

        "gradient": "from-emerald-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 276,

        "downloads": "5.0k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 10",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Lao Động cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hlu"

    },

    {

        "id": "DOC-1086",

        "code": "SUB201",

        "baseName": "Quản Trị Học (Full Đáp Án)",

        "category": "Quản trị",

        "icon": "💡",

        "gradient": "from-purple-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 380,

        "downloads": "3.4k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 29",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tmu"

    },

    {

        "id": "DOC-1087",

        "code": "SUB299",

        "baseName": "Tiếng Anh Thương Mại (Đề Thi Cuối Kỳ)",

        "category": "Ngoại ngữ",

        "icon": "🔬",

        "gradient": "from-slate-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 10,

        "rating": 4.8,

        "reviewsCount": 539,

        "downloads": "3.8k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 37",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Anh Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hufl"

    },

    {

        "id": "DOC-1088",

        "code": "SUB735",

        "baseName": "Xã Hội Học Đại Cương (Tóm Tắt Ngắn Gọn)",

        "category": "Đại cương",

        "icon": "💻",

        "gradient": "from-blue-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 5,

        "rating": 5,

        "reviewsCount": 412,

        "downloads": "2.9k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 88",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Xã Hội Học Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "thanglong"

    },

    {

        "id": "DOC-1089",

        "code": "SUB657",

        "baseName": "Lập Trình Python (Sơ Đồ Tư Duy)",

        "category": "Công nghệ",

        "icon": "🧪",

        "gradient": "from-teal-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 15,

        "rating": 4.8,

        "reviewsCount": 197,

        "downloads": "4.9k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 56",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Lập Trình Python cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dpu"

    },

    {

        "id": "DOC-1090",

        "code": "SUB603",

        "baseName": "Kinh Tế Vĩ Mô 1 & 2 (Tóm Tắt Ngắn Gọn)",

        "category": "Kinh tế",

        "icon": "📝",

        "gradient": "from-rose-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 10,

        "rating": 4.9,

        "reviewsCount": 289,

        "downloads": "1.9k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 1",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Kinh Tế Vĩ Mô 1 & 2 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ueh"

    },

    {

        "id": "DOC-1091",

        "code": "SUB626",

        "baseName": "Tâm Lý Học Đại Cương (Chi Tiết Phụ)",

        "category": "Đại cương",

        "icon": "📝",

        "gradient": "from-slate-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 399,

        "downloads": "4.9k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 15",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tâm Lý Học Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dnu"

    },

    {

        "id": "DOC-1092",

        "code": "SUB434",

        "baseName": "Nghiệp Vụ Hướng Dẫn (Đề Thi Cuối Kỳ)",

        "category": "Du lịch & Khách sạn",

        "icon": "✍️",

        "gradient": "from-cyan-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 6,

        "rating": 4.8,

        "reviewsCount": 577,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 5",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Nghiệp Vụ Hướng Dẫn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ufm"

    },

    {

        "id": "DOC-1093",

        "code": "SUB479",

        "baseName": "Luật Thương Mại Quốc Tế (Tóm Tắt Ngắn Gọn)",

        "category": "Luật",

        "icon": "📝",

        "gradient": "from-slate-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 7,

        "rating": 4.8,

        "reviewsCount": 133,

        "downloads": "4.2k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 40",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "uel"

    },

    {

        "id": "DOC-1094",

        "code": "SUB651",

        "baseName": "Chủ Nghĩa Xã Hội Khoa Học (Tóm Tắt Ngắn Gọn)",

        "category": "Đại cương",

        "icon": "📐",

        "gradient": "from-amber-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 22,

        "rating": 4.8,

        "reviewsCount": 180,

        "downloads": "1.8k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 6",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Chủ Nghĩa Xã Hội Khoa Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tcnh_hn"

    },

    {

        "id": "DOC-1095",

        "code": "SUB658",

        "baseName": "Tiếng Trung HSK4 (Đề Thi Cuối Kỳ)",

        "category": "Ngoại ngữ",

        "icon": "🎓",

        "gradient": "from-cyan-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 9,

        "rating": 4.8,

        "reviewsCount": 372,

        "downloads": "4.0k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 95",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Trung HSK4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ulis"

    },

    {

        "id": "DOC-1096",

        "code": "SUB705",

        "baseName": "Luật Hình Sự (Tóm Tắt Ngắn Gọn)",

        "category": "Luật",

        "icon": "📝",

        "gradient": "from-emerald-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 10,

        "rating": 4.8,

        "reviewsCount": 213,

        "downloads": "1.6k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 48",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Hình Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "neu"

    },

    {

        "id": "DOC-1097",

        "code": "SUB128",

        "baseName": "Luật Hình Sự (Chi Tiết Phụ)",

        "category": "Luật",

        "icon": "🌍",

        "gradient": "from-slate-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 5,

        "rating": 5,

        "reviewsCount": 570,

        "downloads": "4.1k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 95",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Hình Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ftu"

    },

    {

        "id": "DOC-1098",

        "code": "SUB436",

        "baseName": "Kế Toán Quản Trị (Tóm Tắt Ngắn Gọn)",

        "category": "Kinh tế",

        "icon": "🧠",

        "gradient": "from-cyan-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 6,

        "rating": 4.8,

        "reviewsCount": 382,

        "downloads": "3.9k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 84",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Kế Toán Quản Trị cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tcnh_hn"

    },

    {

        "id": "DOC-1099",

        "code": "SUB888",

        "baseName": "Tiếng Hàn TOPIK (Full Đáp Án)",

        "category": "Ngoại ngữ",

        "icon": "📚",

        "gradient": "from-teal-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 7,

        "rating": 4.8,

        "reviewsCount": 238,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Tag 17",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Hàn TOPIK cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ftu"

    },

    {

        "id": "DOC-1100",

        "code": "SUB385",

        "baseName": "Đánh Giá Trong Giáo Dục (Sơ Đồ Tư Duy)",

        "category": "Sư phạm",

        "icon": "📚",

        "gradient": "from-teal-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 8,

        "rating": 4.9,

        "reviewsCount": 215,

        "downloads": "4.2k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 91",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Đánh Giá Trong Giáo Dục cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "vinhuni"

    },

    {

        "id": "DOC-1101",

        "code": "SUB239",

        "baseName": "Triết Học Mác - Lênin (Sơ Đồ Tư Duy)",

        "category": "Đại cương",

        "icon": "📋",

        "gradient": "from-indigo-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 27,

        "rating": 4.9,

        "reviewsCount": 403,

        "downloads": "1.7k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 16",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Triết Học Mác - Lênin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hongduc"

    },

    {

        "id": "DOC-1102",

        "code": "SUB353",

        "baseName": "Kinh Tế Phát Triển (Chi Tiết Phụ)",

        "category": "Kinh tế",

        "icon": "📝",

        "gradient": "from-rose-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 539,

        "downloads": "1.5k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 49",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Kinh Tế Phát Triển cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ufm"

    },

    {

        "id": "DOC-1103",

        "code": "SUB441",

        "baseName": "Luật Kinh Tế (Sơ Đồ Tư Duy)",

        "category": "Luật",

        "icon": "📈",

        "gradient": "from-emerald-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 142,

        "downloads": "2.8k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 30",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tmu"

    },

    {

        "id": "DOC-1104",

        "code": "SUB320",

        "baseName": "Quản Trị Nhà Hàng (Full Đáp Án)",

        "category": "Du lịch & Khách sạn",

        "icon": "✍️",

        "gradient": "from-emerald-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 291,

        "downloads": "2.8k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 61",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Nhà Hàng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tmu"

    },

    {

        "id": "DOC-1105",

        "code": "SUB985",

        "baseName": "Pháp Luật Đại Cương (Tóm Tắt Ngắn Gọn)",

        "category": "Đại cương",

        "icon": "📝",

        "gradient": "from-purple-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 23,

        "rating": 4.9,

        "reviewsCount": 392,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 74",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Pháp Luật Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ntu"

    },

    {

        "id": "DOC-1106",

        "code": "SUB398",

        "baseName": "Mạng Máy Tính (Đề Thi Cuối Kỳ)",

        "category": "Công nghệ",

        "icon": "📚",

        "gradient": "from-blue-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 17,

        "rating": 5,

        "reviewsCount": 181,

        "downloads": "2.0k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 5",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Mạng Máy Tính cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dut"

    },

    {

        "id": "DOC-1107",

        "code": "SUB942",

        "baseName": "Quản Trị Nhà Hàng (Chi Tiết Phụ)",

        "category": "Du lịch & Khách sạn",

        "icon": "💡",

        "gradient": "from-amber-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 505,

        "downloads": "4.9k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 98",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Nhà Hàng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ussh"

    },

    {

        "id": "DOC-1108",

        "code": "SUB785",

        "baseName": "Nghiệp Vụ Hướng Dẫn (Chi Tiết Phụ)",

        "category": "Du lịch & Khách sạn",

        "icon": "🧪",

        "gradient": "from-purple-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 10,

        "rating": 4.9,

        "reviewsCount": 193,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 14",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Nghiệp Vụ Hướng Dẫn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ntu"

    },

    {

        "id": "DOC-1109",

        "code": "SUB171",

        "baseName": "Quản Trị Nhà Hàng (Chi Tiết Phụ)",

        "category": "Du lịch & Khách sạn",

        "icon": "📊",

        "gradient": "from-rose-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 259,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 58",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Nhà Hàng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "vanlang"

    },

    {

        "id": "DOC-1110",

        "code": "SUB906",

        "baseName": "Tâm Lý Học Sư Phạm (Trắc Nghiệm & Tự Luận)",

        "category": "Sư phạm",

        "icon": "📐",

        "gradient": "from-slate-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 129,

        "downloads": "1.2k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 9",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tâm Lý Học Sư Phạm cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hnue"

    },

    {

        "id": "DOC-1111",

        "code": "SUB658",

        "baseName": "Tổng Quan Du Lịch (Tóm Tắt Ngắn Gọn)",

        "category": "Du lịch & Khách sạn",

        "icon": "🎯",

        "gradient": "from-slate-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 179,

        "downloads": "2.5k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 54",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tổng Quan Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hutech"

    },

    {

        "id": "DOC-1112",

        "code": "SUB400",

        "baseName": "Ngân Hàng Thương Mại (Full Đáp Án)",

        "category": "Kinh tế",

        "icon": "🔬",

        "gradient": "from-indigo-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 521,

        "downloads": "4.3k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 42",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Ngân Hàng Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "thanglong"

    },

    {

        "id": "DOC-1113",

        "code": "SUB761",

        "baseName": "Luật Kinh Tế (Chi Tiết Phụ)",

        "category": "Luật",

        "icon": "🎓",

        "gradient": "from-purple-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 6,

        "rating": 5,

        "reviewsCount": 163,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 28",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hou"

    },

    {

        "id": "DOC-1114",

        "code": "SUB724",

        "baseName": "Ngân Hàng Thương Mại (Tóm Tắt Ngắn Gọn)",

        "category": "Kinh tế",

        "icon": "💻",

        "gradient": "from-teal-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 7,

        "rating": 4.8,

        "reviewsCount": 418,

        "downloads": "2.9k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 36",

            "Chủ đề 3",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Ngân Hàng Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hub"

    },

    {

        "id": "DOC-1115",

        "code": "SUB145",

        "baseName": "Tổng Quan Du Lịch (Đề Thi Cuối Kỳ)",

        "category": "Du lịch & Khách sạn",

        "icon": "📚",

        "gradient": "from-amber-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 423,

        "downloads": "3.1k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 50",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tổng Quan Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hou"

    },

    {

        "id": "DOC-1116",

        "code": "SUB972",

        "baseName": "Quản Trị Nhân Lực (Chi Tiết Phụ)",

        "category": "Quản trị",

        "icon": "📈",

        "gradient": "from-cyan-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 517,

        "downloads": "1.6k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 98",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Nhân Lực cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "thanglong"

    },

    {

        "id": "DOC-1117",

        "code": "SUB511",

        "baseName": "Hệ Thống Thông Tin Quản Lý (Đề Thi Cuối Kỳ)",

        "category": "Công nghệ",

        "icon": "🧠",

        "gradient": "from-indigo-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 19,

        "rating": 5,

        "reviewsCount": 438,

        "downloads": "2.7k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 82",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Hệ Thống Thông Tin Quản Lý cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "haui"

    },

    {

        "id": "DOC-1118",

        "code": "SUB449",

        "baseName": "Tiếng Trung HSK4 (Chi Tiết Phụ)",

        "category": "Ngoại ngữ",

        "icon": "📋",

        "gradient": "from-slate-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 248,

        "downloads": "1.1k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 6",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Trung HSK4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dav"

    },

    {

        "id": "DOC-1119",

        "code": "SUB929",

        "baseName": "Đánh Giá Trong Giáo Dục (Sơ Đồ Tư Duy)",

        "category": "Sư phạm",

        "icon": "🔬",

        "gradient": "from-emerald-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 6,

        "rating": 4.8,

        "reviewsCount": 348,

        "downloads": "3.2k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Best Seller",

        "tags": [

            "Tag 6",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Đánh Giá Trong Giáo Dục cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hnue2"

    },

    {

        "id": "DOC-1120",

        "code": "SUB202",

        "baseName": "Tiếng Hàn TOPIK (Sơ Đồ Tư Duy)",

        "category": "Ngoại ngữ",

        "icon": "🎯",

        "gradient": "from-amber-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 108,

        "downloads": "1.1k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 42",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Hàn TOPIK cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ussh"

    },

    {

        "id": "DOC-1121",

        "code": "SUB420",

        "baseName": "Tiếng Hàn TOPIK (Tóm Tắt Ngắn Gọn)",

        "category": "Ngoại ngữ",

        "icon": "📊",

        "gradient": "from-rose-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 5,

        "rating": 5,

        "reviewsCount": 138,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 26",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Hàn TOPIK cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hcmue"

    },

    {

        "id": "DOC-1122",

        "code": "SUB473",

        "baseName": "Tiếng Trung HSK4 (Full Đáp Án)",

        "category": "Ngoại ngữ",

        "icon": "🏛️",

        "gradient": "from-slate-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 353,

        "downloads": "4.0k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 78",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Trung HSK4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "huflit"

    },

    {

        "id": "DOC-1123",

        "code": "SUB170",

        "baseName": "Địa Lý Du Lịch (Tóm Tắt Ngắn Gọn)",

        "category": "Du lịch & Khách sạn",

        "icon": "💻",

        "gradient": "from-teal-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 518,

        "downloads": "2.2k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 27",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dnu"

    },

    {

        "id": "DOC-1124",

        "code": "SUB762",

        "baseName": "Quản Trị Học (Tóm Tắt Ngắn Gọn)",

        "category": "Quản trị",

        "icon": "⚖️",

        "gradient": "from-emerald-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 8,

        "rating": 4.9,

        "reviewsCount": 215,

        "downloads": "2.2k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 24",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dnu"

    },

    {

        "id": "DOC-1125",

        "code": "SUB876",

        "baseName": "Quản Trị Marketing (Chi Tiết Phụ)",

        "category": "Quản trị",

        "icon": "💰",

        "gradient": "from-cyan-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 191,

        "downloads": "2.7k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 8",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Marketing cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hutech"

    },

    {

        "id": "DOC-1126",

        "code": "SUB375",

        "baseName": "Luật Dân Sự (Đề Thi Cuối Kỳ)",

        "category": "Luật",

        "icon": "📚",

        "gradient": "from-slate-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 10,

        "rating": 4.9,

        "reviewsCount": 162,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 57",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Dân Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dnu"

    },

    {

        "id": "DOC-1127",

        "code": "SUB826",

        "baseName": "Tiếng Anh Chuyên Ngành (Sơ Đồ Tư Duy)",

        "category": "Ngoại ngữ",

        "icon": "📊",

        "gradient": "from-rose-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 504,

        "downloads": "3.2k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 79",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Anh Chuyên Ngành cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "vanlang"

    },

    {

        "id": "DOC-1128",

        "code": "SUB208",

        "baseName": "Quản Trị Chiến Lược (Đề Thi Cuối Kỳ)",

        "category": "Quản trị",

        "icon": "✍️",

        "gradient": "from-slate-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 231,

        "downloads": "3.4k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 44",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Chiến Lược cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hou"

    },

    {

        "id": "DOC-1129",

        "code": "SUB631",

        "baseName": "Mạng Máy Tính (Tóm Tắt Ngắn Gọn)",

        "category": "Công nghệ",

        "icon": "📚",

        "gradient": "from-slate-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 16,

        "rating": 4.9,

        "reviewsCount": 487,

        "downloads": "2.2k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 5",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Mạng Máy Tính cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "bkhn"

    },

    {

        "id": "DOC-1130",

        "code": "SUB432",

        "baseName": "An Toàn Thông Tin (Trắc Nghiệm & Tự Luận)",

        "category": "Công nghệ",

        "icon": "🎯",

        "gradient": "from-rose-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 14,

        "rating": 4.9,

        "reviewsCount": 327,

        "downloads": "3.6k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 66",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu An Toàn Thông Tin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "uet"

    },

    {

        "id": "DOC-1131",

        "code": "SUB376",

        "baseName": "Kinh Tế Chính Trị Mác - Lênin (Chi Tiết Phụ)",

        "category": "Đại cương",

        "icon": "💻",

        "gradient": "from-rose-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 22,

        "rating": 4.8,

        "reviewsCount": 412,

        "downloads": "2.9k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 85",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Kinh Tế Chính Trị Mác - Lênin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "neu"

    },

    {

        "id": "DOC-1132",

        "code": "SUB177",

        "baseName": "Tin Học Đại Cương (Chi Tiết Phụ)",

        "category": "Công nghệ",

        "icon": "⚖️",

        "gradient": "from-purple-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 16,

        "rating": 4.9,

        "reviewsCount": 267,

        "downloads": "3.3k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 91",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tin Học Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ptit"

    },

    {

        "id": "DOC-1133",

        "code": "SUB701",

        "baseName": "Giáo Dục Học (Tóm Tắt Ngắn Gọn)",

        "category": "Sư phạm",

        "icon": "✍️",

        "gradient": "from-blue-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 201,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 10",

            "Chủ đề 3",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Giáo Dục Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dhsphue"

    },

    {

        "id": "DOC-1134",

        "code": "SUB841",

        "baseName": "Luật Dân Sự (Sơ Đồ Tư Duy)",

        "category": "Luật",

        "icon": "📐",

        "gradient": "from-rose-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 357,

        "downloads": "1.0k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 59",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Dân Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hul"

    },

    {

        "id": "DOC-1135",

        "code": "SUB555",

        "baseName": "Tiếng Anh Chuyên Ngành (Full Đáp Án)",

        "category": "Ngoại ngữ",

        "icon": "🧪",

        "gradient": "from-teal-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 10,

        "rating": 4.9,

        "reviewsCount": 173,

        "downloads": "2.9k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 60",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Anh Chuyên Ngành cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "thanglong"

    },

    {

        "id": "DOC-1136",

        "code": "SUB775",

        "baseName": "Luật Dân Sự (Full Đáp Án)",

        "category": "Luật",

        "icon": "📈",

        "gradient": "from-amber-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 103,

        "downloads": "3.9k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 84",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Dân Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ba"

    },

    {

        "id": "DOC-1137",

        "code": "SUB703",

        "baseName": "Quản Trị Nhân Lực (Tóm Tắt Ngắn Gọn)",

        "category": "Quản trị",

        "icon": "💻",

        "gradient": "from-rose-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 6,

        "rating": 5,

        "reviewsCount": 257,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 45",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Nhân Lực cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "bkhn"

    },

    {

        "id": "DOC-1138",

        "code": "SUB504",

        "baseName": "Tiếng Nhật N3/N4 (Đề Thi Cuối Kỳ)",

        "category": "Ngoại ngữ",

        "icon": "📝",

        "gradient": "from-indigo-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 7,

        "rating": 4.9,

        "reviewsCount": 394,

        "downloads": "2.5k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 54",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dnu"

    },

    {

        "id": "DOC-1139",

        "code": "SUB596",

        "baseName": "Tiếng Nhật N3/N4 (Tóm Tắt Ngắn Gọn)",

        "category": "Ngoại ngữ",

        "icon": "📈",

        "gradient": "from-amber-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.9,

        "reviewsCount": 284,

        "downloads": "4.7k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 85",

            "Chủ đề 3",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "neu"

    },

    {

        "id": "DOC-1140",

        "code": "SUB284",

        "baseName": "Địa Lý Du Lịch (Sơ Đồ Tư Duy)",

        "category": "Du lịch & Khách sạn",

        "icon": "💡",

        "gradient": "from-cyan-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 223,

        "downloads": "2.6k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 51",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hoasen"

    },

    {

        "id": "DOC-1141",

        "code": "SUB440",

        "baseName": "Địa Lý Du Lịch (Full Đáp Án)",

        "category": "Du lịch & Khách sạn",

        "icon": "📐",

        "gradient": "from-teal-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 320,

        "downloads": "4.5k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 78",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "neu"

    },

    {

        "id": "DOC-1142",

        "code": "SUB356",

        "baseName": "Tiếng Trung HSK4 (Đề Thi Cuối Kỳ)",

        "category": "Ngoại ngữ",

        "icon": "🏛️",

        "gradient": "from-blue-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 8,

        "rating": 5,

        "reviewsCount": 538,

        "downloads": "1.2k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Best Seller",

        "tags": [

            "Tag 71",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Trung HSK4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hufl"

    },

    {

        "id": "DOC-1143",

        "code": "SUB757",

        "baseName": "Kế Toán Tài Chính (Sơ Đồ Tư Duy)",

        "category": "Kinh tế",

        "icon": "⚖️",

        "gradient": "from-slate-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 271,

        "downloads": "4.3k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 18",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Kế Toán Tài Chính cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "due"

    },

    {

        "id": "DOC-1144",

        "code": "SUB441",

        "baseName": "Giáo Dục Học (Trắc Nghiệm & Tự Luận)",

        "category": "Sư phạm",

        "icon": "⚖️",

        "gradient": "from-cyan-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 10,

        "rating": 4.9,

        "reviewsCount": 159,

        "downloads": "2.3k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 60",

            "Chủ đề 3",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Giáo Dục Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hcmue"

    },

    {

        "id": "DOC-1145",

        "code": "SUB309",

        "baseName": "Tổng Quan Du Lịch (Sơ Đồ Tư Duy)",

        "category": "Du lịch & Khách sạn",

        "icon": "📚",

        "gradient": "from-rose-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 5,

        "rating": 4.8,

        "reviewsCount": 320,

        "downloads": "4.0k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 32",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tổng Quan Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ufm"

    },

    {

        "id": "DOC-1146",

        "code": "SUB222",

        "baseName": "Luật Thương Mại Quốc Tế (Tóm Tắt Ngắn Gọn)",

        "category": "Luật",

        "icon": "💡",

        "gradient": "from-purple-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 6,

        "rating": 5,

        "reviewsCount": 332,

        "downloads": "2.7k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 99",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Thương Mại Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tcnh_hn"

    },

    {

        "id": "DOC-1147",

        "code": "SUB213",

        "baseName": "Luật Hình Sự (Đề Thi Cuối Kỳ)",

        "category": "Luật",

        "icon": "💡",

        "gradient": "from-purple-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 7,

        "rating": 4.9,

        "reviewsCount": 430,

        "downloads": "5.0k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 88",

            "Chủ đề 3",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Hình Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hlu"

    },

    {

        "id": "DOC-1148",

        "code": "SUB436",

        "baseName": "Luật Dân Sự (Đề Thi Cuối Kỳ)",

        "category": "Luật",

        "icon": "📚",

        "gradient": "from-slate-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 8,

        "rating": 5,

        "reviewsCount": 387,

        "downloads": "2.2k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 39",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Dân Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "uel"

    },

    {

        "id": "DOC-1149",

        "code": "SUB165",

        "baseName": "Kinh Tế Chính Trị Mác - Lênin (Trắc Nghiệm & Tự Luận)",

        "category": "Đại cương",

        "icon": "🔬",

        "gradient": "from-rose-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 23,

        "rating": 4.9,

        "reviewsCount": 522,

        "downloads": "3.2k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Tag 78",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Kinh Tế Chính Trị Mác - Lênin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "bkhn"

    },

    {

        "id": "DOC-1150",

        "code": "SUB868",

        "baseName": "Nghiệp Vụ Hướng Dẫn (Tóm Tắt Ngắn Gọn)",

        "category": "Du lịch & Khách sạn",

        "icon": "🌍",

        "gradient": "from-blue-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 256,

        "downloads": "3.5k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 100",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Nghiệp Vụ Hướng Dẫn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tmu"

    },

    {

        "id": "DOC-1151",

        "code": "SUB807",

        "baseName": "Tin Học Đại Cương (Đề Thi Cuối Kỳ)",

        "category": "Công nghệ",

        "icon": "🔢",

        "gradient": "from-emerald-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 17,

        "rating": 5,

        "reviewsCount": 553,

        "downloads": "4.6k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 68",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tin Học Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "thanglong"

    },

    {

        "id": "DOC-1152",

        "code": "SUB281",

        "baseName": "Địa Lý Du Lịch (Tóm Tắt Ngắn Gọn)",

        "category": "Du lịch & Khách sạn",

        "icon": "📐",

        "gradient": "from-purple-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 9,

        "rating": 5,

        "reviewsCount": 599,

        "downloads": "4.9k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 62",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ussh"

    },

    {

        "id": "DOC-1153",

        "code": "SUB849",

        "baseName": "Tiếng Anh Thương Mại (Full Đáp Án)",

        "category": "Ngoại ngữ",

        "icon": "📈",

        "gradient": "from-indigo-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 10,

        "rating": 4.8,

        "reviewsCount": 481,

        "downloads": "1.5k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Best Seller",

        "tags": [

            "Tag 7",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Anh Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ulis"

    },

    {

        "id": "DOC-1154",

        "code": "SUB397",

        "baseName": "Tài Chính Tiền Tệ (Sơ Đồ Tư Duy)",

        "category": "Kinh tế",

        "icon": "🔬",

        "gradient": "from-blue-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 453,

        "downloads": "1.2k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 30",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tài Chính Tiền Tệ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hce"

    },

    {

        "id": "DOC-1155",

        "code": "SUB337",

        "baseName": "Luật Kinh Tế (Trắc Nghiệm & Tự Luận)",

        "category": "Luật",

        "icon": "🔬",

        "gradient": "from-cyan-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 6,

        "rating": 5,

        "reviewsCount": 467,

        "downloads": "1.9k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Best Seller",

        "tags": [

            "Tag 37",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "neu"

    },

    {

        "id": "DOC-1156",

        "code": "SUB721",

        "baseName": "Marketing Quốc Tế (Đề Thi Cuối Kỳ)",

        "category": "Quản trị",

        "icon": "📐",

        "gradient": "from-teal-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 7,

        "rating": 4.9,

        "reviewsCount": 162,

        "downloads": "4.1k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 8",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Marketing Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ajc"

    },

    {

        "id": "DOC-1157",

        "code": "SUB320",

        "baseName": "Kinh Tế Vi Mô 1 & 2 (Sơ Đồ Tư Duy)",

        "category": "Kinh tế",

        "icon": "📐",

        "gradient": "from-amber-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 157,

        "downloads": "4.7k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 7",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Kinh Tế Vi Mô 1 & 2 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "neu"

    },

    {

        "id": "DOC-1158",

        "code": "SUB911",

        "baseName": "Nghiệp Vụ Hướng Dẫn (Trắc Nghiệm & Tự Luận)",

        "category": "Du lịch & Khách sạn",

        "icon": "📝",

        "gradient": "from-purple-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 579,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 22",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Nghiệp Vụ Hướng Dẫn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ntu"

    },

    {

        "id": "DOC-1159",

        "code": "SUB771",

        "baseName": "Cơ Sở Dữ Liệu (Chi Tiết Phụ)",

        "category": "Công nghệ",

        "icon": "⚖️",

        "gradient": "from-purple-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 19,

        "rating": 4.9,

        "reviewsCount": 327,

        "downloads": "4.6k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 20",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Cơ Sở Dữ Liệu cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hutech"

    },

    {

        "id": "DOC-1160",

        "code": "SUB380",

        "baseName": "Toán Cao Cấp 1 & 2 (Tóm Tắt Ngắn Gọn)",

        "category": "Đại cương",

        "icon": "📝",

        "gradient": "from-cyan-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 415,

        "downloads": "3.0k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 82",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Toán Cao Cấp 1 & 2 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ftu"

    },

    {

        "id": "DOC-1161",

        "code": "SUB123",

        "baseName": "Kinh Tế Phát Triển (Sơ Đồ Tư Duy)",

        "category": "Kinh tế",

        "icon": "💡",

        "gradient": "from-purple-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 444,

        "downloads": "3.8k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 67",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Kinh Tế Phát Triển cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ftu"

    },

    {

        "id": "DOC-1162",

        "code": "SUB813",

        "baseName": "An Toàn Thông Tin (Tóm Tắt Ngắn Gọn)",

        "category": "Công nghệ",

        "icon": "⚖️",

        "gradient": "from-teal-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 19,

        "rating": 5,

        "reviewsCount": 331,

        "downloads": "1.3k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 57",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu An Toàn Thông Tin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "vanlang"

    },

    {

        "id": "DOC-1163",

        "code": "SUB210",

        "baseName": "Giáo Dục Học (Đề Thi Cuối Kỳ)",

        "category": "Sư phạm",

        "icon": "🔬",

        "gradient": "from-purple-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 574,

        "downloads": "1.3k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 21",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Giáo Dục Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ued"

    },

    {

        "id": "DOC-1164",

        "code": "SUB326",

        "baseName": "Phương Pháp Giảng Dạy (Chi Tiết Phụ)",

        "category": "Sư phạm",

        "icon": "✍️",

        "gradient": "from-blue-950 via-emerald-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 510,

        "downloads": "3.8k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 91",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dhhp"

    },

    {

        "id": "DOC-1165",

        "code": "SUB308",

        "baseName": "Tâm Lý Học Đại Cương (Tóm Tắt Ngắn Gọn)",

        "category": "Đại cương",

        "icon": "📐",

        "gradient": "from-blue-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 182,

        "downloads": "3.1k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Best Seller",

        "tags": [

            "Tag 100",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tâm Lý Học Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tmu"

    },

    {

        "id": "DOC-1166",

        "code": "SUB867",

        "baseName": "Tiếng Anh Chuyên Ngành (Full Đáp Án)",

        "category": "Ngoại ngữ",

        "icon": "🎓",

        "gradient": "from-indigo-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 8,

        "rating": 5,

        "reviewsCount": 348,

        "downloads": "3.8k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Trúng Tủ 98%",

        "tags": [

            "Tag 39",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Anh Chuyên Ngành cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ftu"

    },

    {

        "id": "DOC-1167",

        "code": "SUB577",

        "baseName": "Luật Kinh Tế (Full Đáp Án)",

        "category": "Luật",

        "icon": "📈",

        "gradient": "from-slate-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 9,

        "rating": 4.8,

        "reviewsCount": 196,

        "downloads": "1.7k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 27",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ftu"

    },

    {

        "id": "DOC-1168",

        "code": "SUB639",

        "baseName": "Phương Pháp Giảng Dạy (Trắc Nghiệm & Tự Luận)",

        "category": "Sư phạm",

        "icon": "📐",

        "gradient": "from-slate-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 10,

        "rating": 4.9,

        "reviewsCount": 598,

        "downloads": "4.9k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Best Seller",

        "tags": [

            "Tag 48",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Phương Pháp Giảng Dạy cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hongduc"

    },

    {

        "id": "DOC-1169",

        "code": "SUB411",

        "baseName": "Giáo Dục Học (Full Đáp Án)",

        "category": "Sư phạm",

        "icon": "🧪",

        "gradient": "from-emerald-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 310,

        "downloads": "4.2k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 70",

            "Chủ đề 2",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Giáo Dục Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "vinhuni"

    },

    {

        "id": "DOC-1170",

        "code": "SUB408",

        "baseName": "Quản Trị Khách Sạn (Sơ Đồ Tư Duy)",

        "category": "Du lịch & Khách sạn",

        "icon": "✍️",

        "gradient": "from-indigo-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 314,

        "downloads": "3.3k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 7",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Khách Sạn cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "vanlang"

    },

    {

        "id": "DOC-1171",

        "code": "SUB789",

        "baseName": "Thương Mại Điện Tử (Full Đáp Án)",

        "category": "Quản trị",

        "icon": "🧠",

        "gradient": "from-slate-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 10,

        "rating": 4.9,

        "reviewsCount": 361,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Best Seller",

        "tags": [

            "Tag 93",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Thương Mại Điện Tử cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tmu"

    },

    {

        "id": "DOC-1172",

        "code": "SUB261",

        "baseName": "Địa Lý Du Lịch (Tóm Tắt Ngắn Gọn)",

        "category": "Du lịch & Khách sạn",

        "icon": "🏛️",

        "gradient": "from-emerald-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-emerald-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 490,

        "downloads": "2.7k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 19",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Địa Lý Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hutech"

    },

    {

        "id": "DOC-1173",

        "code": "SUB889",

        "baseName": "Quản Trị Chuỗi Cung Ứng (Tóm Tắt Ngắn Gọn)",

        "category": "Quản trị",

        "icon": "🧪",

        "gradient": "from-blue-950 via-indigo-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 6,

        "rating": 5,

        "reviewsCount": 310,

        "downloads": "2.9k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 29",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Chuỗi Cung Ứng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ueh"

    },

    {

        "id": "DOC-1174",

        "code": "SUB982",

        "baseName": "Marketing Quốc Tế (Full Đáp Án)",

        "category": "Quản trị",

        "icon": "📈",

        "gradient": "from-indigo-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-indigo-300",

        "pages": 7,

        "rating": 4.9,

        "reviewsCount": 128,

        "downloads": "2.6k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Best Seller",

        "tags": [

            "Tag 13",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Marketing Quốc Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ufm"

    },

    {

        "id": "DOC-1175",

        "code": "SUB790",

        "baseName": "Quản Trị Chuỗi Cung Ứng (Tóm Tắt Ngắn Gọn)",

        "category": "Quản trị",

        "icon": "🔢",

        "gradient": "from-slate-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 8,

        "rating": 5,

        "reviewsCount": 271,

        "downloads": "2.9k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 2",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Chuỗi Cung Ứng cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "thanglong"

    },

    {

        "id": "DOC-1176",

        "code": "SUB164",

        "baseName": "Tiếng Anh Thương Mại (Tóm Tắt Ngắn Gọn)",

        "category": "Ngoại ngữ",

        "icon": "📐",

        "gradient": "from-amber-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 167,

        "downloads": "2.2k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 22",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Anh Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dav"

    },

    {

        "id": "DOC-1177",

        "code": "SUB295",

        "baseName": "Tiếng Nhật N3/N4 (Tóm Tắt Ngắn Gọn)",

        "category": "Ngoại ngữ",

        "icon": "📝",

        "gradient": "from-rose-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 10,

        "rating": 4.8,

        "reviewsCount": 240,

        "downloads": "4.6k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 95",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Nhật N3/N4 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ussh"

    },

    {

        "id": "DOC-1178",

        "code": "SUB569",

        "baseName": "Quản Trị Chiến Lược (Đề Thi Cuối Kỳ)",

        "category": "Quản trị",

        "icon": "✍️",

        "gradient": "from-blue-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 5,

        "rating": 5,

        "reviewsCount": 358,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 19",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Quản Trị Chiến Lược cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dnu"

    },

    {

        "id": "DOC-1179",

        "code": "SUB228",

        "baseName": "Pháp Luật Đại Cương (Full Đáp Án)",

        "category": "Đại cương",

        "icon": "⚖️",

        "gradient": "from-amber-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-amber-300",

        "pages": 26,

        "rating": 5,

        "reviewsCount": 424,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 18",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Pháp Luật Đại Cương cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hvtc"

    },

    {

        "id": "DOC-1180",

        "code": "SUB296",

        "baseName": "Toán Cao Cấp 1 & 2 (Đề Thi Cuối Kỳ)",

        "category": "Đại cương",

        "icon": "⚖️",

        "gradient": "from-cyan-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-cyan-300",

        "pages": 10,

        "rating": 5,

        "reviewsCount": 257,

        "downloads": "3.8k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Best Seller",

        "tags": [

            "Tag 68",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Toán Cao Cấp 1 & 2 cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ueh"

    },

    {

        "id": "DOC-1181",

        "code": "SUB610",

        "baseName": "Lập Trình Python (Trắc Nghiệm & Tự Luận)",

        "category": "Công nghệ",

        "icon": "📈",

        "gradient": "from-blue-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 14,

        "rating": 4.8,

        "reviewsCount": 588,

        "downloads": "4.2k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 91",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Lập Trình Python cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "eaut"

    },

    {

        "id": "DOC-1182",

        "code": "SUB559",

        "baseName": "Tổng Quan Du Lịch (Trắc Nghiệm & Tự Luận)",

        "category": "Du lịch & Khách sạn",

        "icon": "🧠",

        "gradient": "from-rose-950 via-cyan-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 6,

        "rating": 4.9,

        "reviewsCount": 103,

        "downloads": "1.5k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 51",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tổng Quan Du Lịch cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hou"

    },

    {

        "id": "DOC-1183",

        "code": "SUB877",

        "baseName": "Luật Hình Sự (Đề Thi Cuối Kỳ)",

        "category": "Luật",

        "icon": "✍️",

        "gradient": "from-purple-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 7,

        "rating": 4.8,

        "reviewsCount": 276,

        "downloads": "4.5k+",

        "price": 50000,

        "originalPrice": 140000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 94",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Hình Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "tmu"

    },

    {

        "id": "DOC-1184",

        "code": "SUB235",

        "baseName": "Tiếng Hàn TOPIK (Chi Tiết Phụ)",

        "category": "Ngoại ngữ",

        "icon": "🔢",

        "gradient": "from-teal-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 8,

        "rating": 4.8,

        "reviewsCount": 152,

        "downloads": "3.3k+",

        "price": 50000,

        "originalPrice": 145000,

        "badge": "Học 1 Lần Nhớ Mãi",

        "tags": [

            "Tag 23",

            "Chủ đề 8",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Hàn TOPIK cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hcmue"

    },

    {

        "id": "DOC-1185",

        "code": "SUB563",

        "baseName": "Giáo Dục Học (Chi Tiết Phụ)",

        "category": "Sư phạm",

        "icon": "📈",

        "gradient": "from-teal-950 via-amber-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 9,

        "rating": 4.9,

        "reviewsCount": 274,

        "downloads": "3.3k+",

        "price": 50000,

        "originalPrice": 150000,

        "badge": "Code & Lời Giải",

        "tags": [

            "Tag 85",

            "Chủ đề 9",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Giáo Dục Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hnue"

    },

    {

        "id": "DOC-1186",

        "code": "SUB109",

        "baseName": "Bảo Hiểm (Đề Thi Cuối Kỳ)",

        "category": "Kinh tế",

        "icon": "🌍",

        "gradient": "from-purple-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-purple-300",

        "pages": 10,

        "rating": 4.9,

        "reviewsCount": 484,

        "downloads": "4.9k+",

        "price": 50000,

        "originalPrice": 155000,

        "badge": "Best Seller",

        "tags": [

            "Tag 92",

            "Chủ đề 7",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Bảo Hiểm cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hutech"

    },

    {

        "id": "DOC-1187",

        "code": "SUB785",

        "baseName": "Kinh Tế Chính Trị Mác - Lênin (Chi Tiết Phụ)",

        "category": "Đại cương",

        "icon": "⚖️",

        "gradient": "from-blue-950 via-blue-950 to-[#0A143D]",

        "accentColor": "text-blue-300",

        "pages": 25,

        "rating": 5,

        "reviewsCount": 286,

        "downloads": "3.8k+",

        "price": 50000,

        "originalPrice": 160000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 93",

            "Chủ đề 4",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Kinh Tế Chính Trị Mác - Lênin cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "ba"

    },

    {

        "id": "DOC-1188",

        "code": "SUB423",

        "baseName": "Chủ Nghĩa Xã Hội Khoa Học (Full Đáp Án)",

        "category": "Đại cương",

        "icon": "🎯",

        "gradient": "from-teal-950 via-rose-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 26,

        "rating": 4.9,

        "reviewsCount": 239,

        "downloads": "2.1k+",

        "price": 50000,

        "originalPrice": 165000,

        "badge": "Đề Mới 2026",

        "tags": [

            "Tag 24",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Chủ Nghĩa Xã Hội Khoa Học cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dav"

    },

    {

        "id": "DOC-1189",

        "code": "SUB931",

        "baseName": "Tiếng Anh Thương Mại (Đề Thi Cuối Kỳ)",

        "category": "Ngoại ngữ",

        "icon": "🔬",

        "gradient": "from-slate-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 7,

        "rating": 5,

        "reviewsCount": 562,

        "downloads": "2.4k+",

        "price": 50000,

        "originalPrice": 170000,

        "badge": "Chuẩn Giáo Trình",

        "tags": [

            "Tag 67",

            "Chủ đề 6",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Tiếng Anh Thương Mại cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "huflit"

    },

    {

        "id": "DOC-1190",

        "code": "SUB261",

        "baseName": "Luật Hình Sự (Tóm Tắt Ngắn Gọn)",

        "category": "Luật",

        "icon": "🔬",

        "gradient": "from-teal-950 via-teal-950 to-[#0A143D]",

        "accentColor": "text-teal-300",

        "pages": 5,

        "rating": 4.9,

        "reviewsCount": 140,

        "downloads": "1.9k+",

        "price": 50000,

        "originalPrice": 120000,

        "badge": "Đầy Đủ Đồ Thị",

        "tags": [

            "Tag 18",

            "Chủ đề 10",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Hình Sự cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "hou"

    },

    {

        "id": "DOC-1191",

        "code": "SUB867",

        "baseName": "Lập Trình C/C++ (Full Đáp Án)",

        "category": "Công nghệ",

        "icon": "✍️",

        "gradient": "from-slate-950 via-purple-950 to-[#0A143D]",

        "accentColor": "text-slate-300",

        "pages": 15,

        "rating": 4.8,

        "reviewsCount": 285,

        "downloads": "1.2k+",

        "price": 50000,

        "originalPrice": 130000,

        "badge": "Có Đáp Án Case",

        "tags": [

            "Tag 10",

            "Chủ đề 1",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Lập Trình C/C++ cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "phenikaa"

    },

    {

        "id": "DOC-1192",

        "code": "SUB482",

        "baseName": "Luật Kinh Tế (Chi Tiết Phụ)",

        "category": "Luật",

        "icon": "💰",

        "gradient": "from-rose-950 via-slate-950 to-[#0A143D]",

        "accentColor": "text-rose-300",

        "pages": 7,

        "rating": 4.9,

        "reviewsCount": 535,

        "downloads": "1.4k+",

        "price": 50000,

        "originalPrice": 135000,

        "badge": "Trúng Tủ 99%",

        "tags": [

            "Tag 62",

            "Chủ đề 5",

            "Cập nhật 2026"

        ],

        "description": "Tài liệu Luật Kinh Tế cực kỳ chi tiết, giúp bạn ôn thi hiệu quả và đạt điểm cao.",

        "university": "dnu"

    }

];



// ==========================================================================

// KHO KHÓA HỌC ONLINE BẢN QUYỀN

// ==========================================================================

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

const COURSES_DATABASE = [
    {
        "id": "ALL-COURSES-399K",
        "code": "DVFULL399",
        "instructor": "TẤT CẢ TRUNG TÂM & THẦY CÔ (EMPIRE · MAPSTUDY · HOCMAI · TENS · YANGDEXIN · GITIHO)",
        "title": "Trọn Bộ Full 90+ Khóa Học Đa Môn (Toán · Văn · Anh · Trung · Lý · Hóa · Sinh · Sử · Địa · Tin MOS · Đại Học · Nghệ Thuật · ĐGNL)",
        "category": "all",
        "subCategory": "lop12_2k9",
        "categories": [
            "all",
            "ngoai_ngu_khxh",
            "khtn_toan_ly_hoa_sinh",
            "tinhoc_daihoc",
            "nghe_thuat",
            "lop12_2k9",
            "lop11_2k10",
            "dgnl_hsa",
            "dgtd_tsa",
            "dgnl_vact_bca"
        ],
        "groupName": "Toàn bộ hệ thống 90+ khóa học",
        "tier": "full_399k",
        "tierLabel": "Gói Full Toàn Hệ Thống (399k)",
        "parentCourseId": "ALL-COURSES-399K",
        "parentSubjectId": "ALL-COURSES-399K",
        "lessons": 1850,
        "duration": "Trọn bộ 90+ khóa học · Video + PDF",
        "level": "Toàn bộ hệ thống 90+ khóa học",
        "rating": 5.0,
        "students": "4.8k+",
        "price": 399000,
        "originalPrice": 2500000,
        "badge": "VIP Full 399K · Tặng App",
        "driveFolderId": "1FaI2FGNRB4ERyEoYsPUQbJP80JcVpU52",
        "extraFolderIds": [
            "1ZmaGDNTMCJqEhWC2oB5vs21WDM__FV7N"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1FaI2FGNRB4ERyEoYsPUQbJP80JcVpU52",
        "defaultCover": "",
        "highlights": [
            "Mở khóa TOÀN BỘ 90+ khóa học tất cả các môn: Toán, Văn, Anh, Tiếng Trung, Lý, Hóa, Sinh, Sử, Địa, Tin MOS, Đại Học, Nghệ Thuật, HSA, TSA, V-ACT, BCA, QDA, VSAT",
            "Tặng kèm App Điệp Viên Study Pro tích hợp AI trợ giảng, kích hoạt sẵn bằng chính Email đăng ký (Khóa bảo mật cố định 1 thiết bị)",
            "Cấp quyền truy cập trực tiếp vào Kho Tổng Google Drive & tự động cập nhật bài giảng mới nhất"
        ],
        "isPackageOnly": true,
        "subTier": "full_399k",
        "tierShortBadge": "TRỌN BỘ FULL APP 399K",
        "summary": "Trọn Bộ Full 90+ Khóa Học Đa Môn (Toán · Văn · Anh · Trung · Lý · Hóa · Sinh · Sử · Địa · Tin MOS · Đại Học · Nghệ Thuật · ĐGNL)",
        "description": "Trọn Bộ Full 90+ Khóa Học Đa Môn (Toán · Văn · Anh · Trung · Lý · Hóa · Sinh · Sử · Địa · Tin MOS · Đại Học · Nghệ Thuật · ĐGNL) do TẤT CẢ TRUNG TÂM & THẦY CÔ (EMPIRE · MAPSTUDY · HOCMAI · TENS · YANGDEXIN · GITIHO) giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-K9-LOP12",
        "code": "DVK9L12",
        "instructor": "TENSCHOOL · MAPSTUDY · HOCMAI · CÔ MAI PHƯƠNG · YANGDEXIN · EMPIRE",
        "title": "Combo Khóa Học THPT Lớp 12 Cho 2K9 (Toán · Văn · Anh · Tiếng Trung · Lý · Hóa · Sinh · Sử · Địa · TopUni 12)",
        "category": "lop12_2k9",
        "subCategory": "khtn_toan_ly_hoa_sinh",
        "categories": [
            "lop12_2k9",
            "khtn_toan_ly_hoa_sinh",
            "ngoai_ngu_khxh"
        ],
        "groupName": "Khối Lớp 12 (2K9)",
        "tier": "course_199k",
        "tierLabel": "Gói Theo Khóa (199k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9",
        "lessons": 680,
        "duration": "Trọn bộ các môn Lớp 12 · Video + PDF",
        "level": "Khối Lớp 12 (2K9)",
        "rating": 5.0,
        "students": "3.2k+",
        "price": 199000,
        "originalPrice": 990000,
        "badge": "Trọn Khóa 199K · Tặng App",
        "driveFolderId": "1Hx3C11lkdM5SKsavO2pqBdH0rEnk2wZo",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
            "1KhQ_bJA5IEjeWjS5fjrn8ZlA7u1p-xbc"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Hx3C11lkdM5SKsavO2pqBdH0rEnk2wZo",
        "defaultCover": "",
        "highlights": [
            "Trọn bộ các môn Lớp 12 (2K9): Toán, Ngữ Văn, Tiếng Anh, Tiếng Trung, Vật Lý, Hóa Học, Sinh Học, Lịch Sử, Địa Lý & TopUni 12",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản đăng nhập bằng Email (Sử dụng cố định trên 1 thiết bị)",
            "Đầy đủ video bài giảng, tài liệu PDF, đề thi thử và lời giải chi tiết lộ trình 2027"
        ],
        "isPackageOnly": true,
        "subTier": "course_199k",
        "tierShortBadge": "MỞ KHÓA KHÓA HỌC 199K",
        "summary": "Combo Khóa Học THPT Lớp 12 Cho 2K9 (Toán · Văn · Anh · Tiếng Trung · Lý · Hóa · Sinh · Sử · Địa · TopUni 12)",
        "description": "Combo Khóa Học THPT Lớp 12 Cho 2K9 (Toán · Văn · Anh · Tiếng Trung · Lý · Hóa · Sinh · Sử · Địa · TopUni 12) do TENSCHOOL · MAPSTUDY · HOCMAI · CÔ MAI PHƯƠNG · YANGDEXIN · EMPIRE giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-NGOAINGU-TRUNG-ANH",
        "code": "DVNN199",
        "instructor": "YANGDEXIN · HANKA · CÔ VŨ MAI PHƯƠNG · HOCMAI · EMPIRE",
        "title": "Combo Ngoại Ngữ & Xã Hội: Tiếng Trung (Hán Ngữ 1–6 · HSK · Khối D04) · Tiếng Anh · Ngữ Văn · Lịch Sử · Địa Lý",
        "category": "ngoai_ngu_khxh",
        "subCategory": "lop12_2k9",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9"
        ],
        "groupName": "Khối Ngoại Ngữ & KHXH",
        "tier": "course_199k",
        "tierLabel": "Gói Theo Khóa (199k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-TRUNG12-2K9",
        "lessons": 420,
        "duration": "Trọn bộ Anh · Trung · Văn · Sử · Địa",
        "level": "Khối Ngoại Ngữ & KHXH",
        "rating": 5.0,
        "students": "2.4k+",
        "price": 199000,
        "originalPrice": 890000,
        "badge": "Trọn Khóa 199K · Tặng App",
        "driveFolderId": "1AvLbPix9Ahk4EMiqMYKJ9pZzxDugD6l6",
        "extraFolderIds": [
            "1NmkphCDWyXoVudrQqC_IIh5D1cUg6asR",
            "1WlZvKRBm4CYRH7yohELZf0G1vcvSOwqe",
            "1DnhTPq6VL79T2nDyqtL13G5dyi_K0Yx3",
            "1Elh6X9_ISZATrvMTdRpGY7spYib-iZqe",
            "1zxzzbWG1Q97O9D5qAHmLNuUQIMPDiBwm"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1AvLbPix9Ahk4EMiqMYKJ9pZzxDugD6l6",
        "defaultCover": "",
        "highlights": [
            "Trọn bộ Tiếng Trung Yangdexin (6 Quyển Hán Ngữ, Bộ đề HSK, Ôn thi ĐH Khối D04), Tiếng Anh Cô Mai Phương, Ngữ Văn, Lịch Sử & Địa Lý",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản đăng nhập bằng Email (Sử dụng cố định trên 1 thiết bị)",
            "Cấp quyền Google Drive trực tiếp đầy đủ slide, video bài giảng, giáo trình và bộ đề luyện thi"
        ],
        "isPackageOnly": true,
        "subTier": "course_199k",
        "tierShortBadge": "MỞ KHÓA KHÓA HỌC 199K",
        "summary": "Combo Ngoại Ngữ & Xã Hội: Tiếng Trung (Hán Ngữ 1–6 · HSK · Khối D04) · Tiếng Anh · Ngữ Văn · Lịch Sử · Địa Lý",
        "description": "Combo Ngoại Ngữ & Xã Hội: Tiếng Trung (Hán Ngữ 1–6 · HSK · Khối D04) · Tiếng Anh · Ngữ Văn · Lịch Sử · Địa Lý do YANGDEXIN · HANKA · CÔ VŨ MAI PHƯƠNG · HOCMAI · EMPIRE giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-THVP-MOS-199K",
        "code": "DVMOS199",
        "instructor": "GITIHO · NIMBUS · LAKITA · HỌC VIỆN TIN HỌC",
        "title": "Combo 30 Khóa Tin Học Văn Phòng & Chứng Chỉ Quốc Tế MOS (Word · Excel · PowerPoint · Access · VBA · Google Tools)",
        "category": "tinhoc_daihoc",
        "subCategory": "lop11_2k10",
        "categories": [
            "tinhoc_daihoc",
            "lop11_2k10"
        ],
        "groupName": "Tin Học Văn Phòng & MOS",
        "tier": "course_199k",
        "tierLabel": "Gói Theo Khóa (199k)",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP",
        "lessons": 350,
        "duration": "Trọn bộ 30 khóa Tin Văn Phòng & MOS",
        "level": "Sinh viên & Người đi làm · Chứng chỉ MOS",
        "rating": 5.0,
        "students": "2.7k+",
        "price": 199000,
        "originalPrice": 890000,
        "badge": "Trọn Khóa 199K · Tặng App",
        "driveFolderId": "1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm",
        "extraFolderIds": [
            "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq",
            "1nC7Q2UXt01SgnkeD518XnlyDQTPXS1ZK"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm",
        "defaultCover": "",
        "highlights": [
            "Mở khóa toàn bộ 30 khóa Tin Học Văn Phòng: MOS Word 2016/2019, MOS Excel, Tuyệt Đỉnh Excel, VBA, PowerPoint, Access & Google Workspace",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản đăng nhập bằng Email (Khóa bảo mật 1 thiết bị)",
            "Kèm bộ file thực hành, Mock Test thi thử MOS và giáo trình PDF từ cơ bản đến nâng cao"
        ],
        "isPackageOnly": true,
        "subTier": "course_199k",
        "tierShortBadge": "MỞ KHÓA KHÓA HỌC 199K",
        "summary": "Combo 30 Khóa Tin Học Văn Phòng & Chứng Chỉ Quốc Tế MOS (Word · Excel · PowerPoint · Access · VBA · Google Tools)",
        "description": "Combo 30 Khóa Tin Học Văn Phòng & Chứng Chỉ Quốc Tế MOS (Word · Excel · PowerPoint · Access · VBA · Google Tools) do GITIHO · NIMBUS · LAKITA · HỌC VIỆN TIN HỌC giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-DAIHOC-HOC-THUAT",
        "code": "DVDH199",
        "instructor": "ĐIỆP VIÊN ACADEMY — BAN GIẢNG HUẤN ĐẠI HỌC & NCKH",
        "title": "Combo Đại Học Điểm A+: Kinh Tế Lượng (EViews, Stata, SPSS) · Triết Học Mác-Lênin · Master BTL & NCKH APA 7 · SQL & Excel",
        "category": "tinhoc_daihoc",
        "subCategory": "all",
        "categories": [
            "tinhoc_daihoc"
        ],
        "groupName": "Khối Đại Học & Nghiên Cứu Khoa Học",
        "tier": "course_199k",
        "tierLabel": "Gói Theo Khóa (199k)",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-DAIHOC-KTL",
        "lessons": 180,
        "duration": "Trọn bộ Đại học & NCKH · Video + File mẫu",
        "level": "Sinh viên Đại học toàn quốc",
        "rating": 5.0,
        "students": "2.2k+",
        "price": 199000,
        "originalPrice": 790000,
        "badge": "Trọn Khóa 199K · Tặng App",
        "driveFolderId": "1ZmaGDNTMCJqEhWC2oB5vs21WDM__FV7N",
        "extraFolderIds": [
            "1xDhl87qUsflx4nQCbLdLs8RDaDQc2Dok",
            "1hJ1J8sadOa5-3FlOHx6GtM8yeIu-62-u",
            "1C08q3lzaWAI6MjGigtAc0H2K0HNGmxQx",
            "1nC7Q2UXt01SgnkeD518XnlyDQTPXS1ZK"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1ZmaGDNTMCJqEhWC2oB5vs21WDM__FV7N",
        "defaultCover": "",
        "highlights": [
            "Trọn bộ các môn đại cương & chuyên ngành Đại học: Kinh Tế Lượng (EViews/Stata/SPSS), Triết Học Mác-Lênin, Viết BTL & NCKH APA 7, SQL & Excel",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản đăng nhập bằng Email (Khóa bảo mật 1 thiết bị)",
            "Cung cấp bộ giáo trình thực hành, sơ đồ tư duy và khung dàn ý chuẩn học thuật"
        ],
        "isPackageOnly": true,
        "subTier": "course_199k",
        "tierShortBadge": "MỞ KHÓA KHÓA HỌC 199K",
        "summary": "Combo Đại Học Điểm A+: Kinh Tế Lượng (EViews, Stata, SPSS) · Triết Học Mác-Lênin · Master BTL & NCKH APA 7 · SQL & Excel",
        "description": "Combo Đại Học Điểm A+: Kinh Tế Lượng (EViews, Stata, SPSS) · Triết Học Mác-Lênin · Master BTL & NCKH APA 7 · SQL & Excel do ĐIỆP VIÊN ACADEMY — BAN GIẢNG HUẤN ĐẠI HỌC & NCKH giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-NGHETHUAT-199K",
        "code": "DVART199",
        "instructor": "HAKETU · THIỆN ORGAN · HIỂN RÂU · PRODUCER & DJ STUDIO",
        "title": "Combo 31 Khóa Nghệ Thuật, Âm Nhạc & Vũ Đạo (Guitar · Piano · Organ · Thanh Nhạc · Ukulele · Sáo Trúc · DJ · Shuffle Dance)",
        "category": "nghe_thuat",
        "subCategory": "all",
        "categories": [
            "nghe_thuat"
        ],
        "groupName": "Khối Nghệ Thuật & Âm Nhạc (31 Khóa)",
        "tier": "course_199k",
        "tierLabel": "Gói Theo Khóa (199k)",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT",
        "lessons": 460,
        "duration": "Trọn bộ 31 khóa Nghệ Thuật · Video HD",
        "level": "Mọi lứa tuổi · Cơ bản đến Nâng cao",
        "rating": 5.0,
        "students": "1.9k+",
        "price": 199000,
        "originalPrice": 890000,
        "badge": "Trọn Khóa 199K · Tặng App",
        "driveFolderId": "1ZfQkutEeGbU5H0XAlK0Vm6xCaDWT-g_B",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1ZfQkutEeGbU5H0XAlK0Vm6xCaDWT-g_B",
        "defaultCover": "",
        "highlights": [
            "Mở khóa toàn bộ 31 khóa học Nghệ Thuật & Âm Nhạc: Guitar Haketu, Fingerstyle, Piano, Organ, Thanh Nhạc, Ukulele, Sáo Trúc, Harmonica, DJ, Beatbox, Cubase & Shuffle Dance",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản đăng nhập bằng Email (Khóa bảo mật 1 thiết bị)",
            "Bài giảng video thực hành từng bước kèm tab nhạc, sheet nhạc và beat luyện tập"
        ],
        "isPackageOnly": true,
        "subTier": "course_199k",
        "tierShortBadge": "MỞ KHÓA KHÓA HỌC 199K",
        "summary": "Combo 31 Khóa Nghệ Thuật, Âm Nhạc & Vũ Đạo (Guitar · Piano · Organ · Thanh Nhạc · Ukulele · Sáo Trúc · DJ · Shuffle Dance)",
        "description": "Combo 31 Khóa Nghệ Thuật, Âm Nhạc & Vũ Đạo (Guitar · Piano · Organ · Thanh Nhạc · Ukulele · Sáo Trúc · DJ · Shuffle Dance) do HAKETU · THIỆN ORGAN · HIỂN RÂU · PRODUCER & DJ STUDIO giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-K10-LOP11",
        "code": "DVK10L11",
        "instructor": "TENSCHOOL · TUYENSINH247 · HOCMAI",
        "title": "Combo Khóa Học THPT Lớp 11 Cho 2K10 (Toán · Lý · Hóa · Tin Học KHMT & Ứng Dụng)",
        "category": "lop11_2k10",
        "subCategory": "khtn_toan_ly_hoa_sinh",
        "categories": [
            "lop11_2k10",
            "khtn_toan_ly_hoa_sinh",
            "tinhoc_daihoc"
        ],
        "groupName": "Khối Lớp 11 (2K10)",
        "tier": "course_199k",
        "tierLabel": "Gói Theo Khóa (199k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-TOAN11-2K10",
        "lessons": 240,
        "duration": "10 Khóa Học Lớp 11 · Video + PDF",
        "level": "Khối Lớp 11 (2K10)",
        "rating": 4.9,
        "students": "1.9k+",
        "price": 199000,
        "originalPrice": 790000,
        "badge": "Trọn Khóa 199K · Tặng App",
        "driveFolderId": "1DQH48jr8YozUnJ3STTlyV-qFzLCAi4G5",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1DQH48jr8YozUnJ3STTlyV-qFzLCAi4G5",
        "defaultCover": "",
        "highlights": [
            "Trọn bộ 10 khóa học Lớp 11 (2K10): Toán 11, Vật Lý 11, Hóa Học 11, Tin Học 11 (Ứng dụng, KHMT & Tin văn phòng)",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản đăng nhập bằng Email (Khóa bảo mật 1 thiết bị)",
            "Bám sát chương trình GDPT mới, định hướng sớm ĐGNL & ĐGTD 2027"
        ],
        "isPackageOnly": true,
        "subTier": "course_199k",
        "tierShortBadge": "MỞ KHÓA KHÓA HỌC 199K",
        "summary": "Combo Khóa Học THPT Lớp 11 Cho 2K10 (Toán · Lý · Hóa · Tin Học KHMT & Ứng Dụng)",
        "description": "Combo Khóa Học THPT Lớp 11 Cho 2K10 (Toán · Lý · Hóa · Tin Học KHMT & Ứng Dụng) do TENSCHOOL · TUYENSINH247 · HOCMAI giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-DGNL-HSA",
        "code": "DVHSA199",
        "instructor": "EMPIRE TEAM · MAPSTUDY · HOCMAI · HSA EDU · TOPUNI",
        "title": "Combo Luyện Thi ĐGNL HSA — ĐHQG Hà Nội 2027 (Định Lượng · Định Tính Ngữ Văn · Khoa Học · Tiếng Anh)",
        "category": "dgnl_hsa",
        "subCategory": "lop12_2k9",
        "categories": [
            "dgnl_hsa",
            "lop12_2k9"
        ],
        "groupName": "Kỳ thi ĐGNL HSA",
        "tier": "course_199k",
        "tierLabel": "Gói Theo Khóa (199k)",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-ITEM-35",
        "lessons": 210,
        "duration": "5 Lộ Trình HSA Toàn Diện · Video + PDF",
        "level": "Kỳ thi ĐGNL HSA",
        "rating": 5.0,
        "students": "2.9k+",
        "price": 199000,
        "originalPrice": 890000,
        "badge": "Trọn Khóa 199K · Tặng App",
        "driveFolderId": "1_tPOqo2Nve07up5SgHpIyhjo6lwoVa9Y",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
            "1JFOWG4aMVK7913LKsin2FzGwy0WVZcj2"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1_tPOqo2Nve07up5SgHpIyhjo6lwoVa9Y",
        "defaultCover": "",
        "highlights": [
            "Bao gồm toàn bộ 5 lộ trình HSA đỉnh nhất: HSA Empire XPS, HSA Mapstudy, HSA Hocmai Giải pháp toàn diện, HSA Edu Tinh Hoa TH01 & TopUni",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản đăng nhập bằng Email (Khóa bảo mật 1 thiết bị)",
            "Đầy đủ 3 phần: Tư duy Định lượng (Toán), Tư duy Định tính (Ngữ Văn) & Khoa học (Lý, Hóa, Sinh, Sử, Địa) / Tiếng Anh"
        ],
        "isPackageOnly": true,
        "subTier": "course_199k",
        "tierShortBadge": "MỞ KHÓA KHÓA HỌC 199K",
        "summary": "Combo Luyện Thi ĐGNL HSA — ĐHQG Hà Nội 2027 (Định Lượng · Định Tính Ngữ Văn · Khoa Học · Tiếng Anh)",
        "description": "Combo Luyện Thi ĐGNL HSA — ĐHQG Hà Nội 2027 (Định Lượng · Định Tính Ngữ Văn · Khoa Học · Tiếng Anh) do EMPIRE TEAM · MAPSTUDY · HOCMAI · HSA EDU · TOPUNI giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-DGTD-TSA",
        "code": "DVTSA199",
        "instructor": "EMPIRE TEAM · TSA BMC · HOCMAI · TUYENSINH247 · TDMU",
        "title": "Combo Luyện Thi ĐGTD TSA — ĐH Bách Khoa Hà Nội 2027 (Tư Duy Toán · Đọc Hiểu · Khoa Học)",
        "category": "dgtd_tsa",
        "subCategory": "lop12_2k9",
        "categories": [
            "dgtd_tsa",
            "lop12_2k9"
        ],
        "groupName": "Kỳ thi ĐGTD TSA",
        "tier": "course_199k",
        "tierLabel": "Gói Theo Khóa (199k)",
        "parentCourseId": "COURSE-DGTD-TSA",
        "parentSubjectId": "COURSE-ITEM-40",
        "lessons": 195,
        "duration": "5 Lộ Trình TSA Bách Khoa · Video + PDF",
        "level": "Kỳ thi ĐGTD TSA",
        "rating": 5.0,
        "students": "2.4k+",
        "price": 199000,
        "originalPrice": 890000,
        "badge": "Trọn Khóa 199K · Tặng App",
        "driveFolderId": "1_sW0V8Q1bKgI0taDc-0hXgAimrmPV_Q4",
        "extraFolderIds": [
            "1KoWxcHRb-OdLFrqwt8jbfD_z2Fx1VlnF"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1_sW0V8Q1bKgI0taDc-0hXgAimrmPV_Q4",
        "defaultCover": "",
        "highlights": [
            "Bao gồm toàn bộ 5 lộ trình ĐGTD TSA ĐH Bách Khoa Hà Nội: Empire 2K9, BMC 2K9, Hocmai TSA, Tuyensinh247 Full SUN & Bổ trợ TDMU",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản đăng nhập bằng Email (Khóa bảo mật 1 thiết bị)",
            "Làm chủ Tư duy Toán học, Tư duy Đọc hiểu và Tư duy Khoa học / Giải quyết vấn đề"
        ],
        "isPackageOnly": true,
        "subTier": "course_199k",
        "tierShortBadge": "MỞ KHÓA KHÓA HỌC 199K",
        "summary": "Combo Luyện Thi ĐGTD TSA — ĐH Bách Khoa Hà Nội 2027 (Tư Duy Toán · Đọc Hiểu · Khoa Học)",
        "description": "Combo Luyện Thi ĐGTD TSA — ĐH Bách Khoa Hà Nội 2027 (Tư Duy Toán · Đọc Hiểu · Khoa Học) do EMPIRE TEAM · TSA BMC · HOCMAI · TUYENSINH247 · TDMU giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-DGNL-VACT",
        "code": "DVVACT199",
        "instructor": "EMPIRE TEAM · MAPSTUDY · HOCMAI",
        "title": "Combo Luyện Thi ĐGNL V-ACT — ĐHQG TP.HCM 2027 (Ngôn Ngữ · Toán Học · Tư Duy Khoa Học)",
        "category": "dgnl_vact_bca",
        "subCategory": "lop12_2k9",
        "categories": [
            "dgnl_vact_bca",
            "lop12_2k9"
        ],
        "groupName": "Kỳ thi ĐGNL V-ACT",
        "tier": "course_199k",
        "tierLabel": "Gói Theo Khóa (199k)",
        "parentCourseId": "COURSE-DGNL-VACT",
        "parentSubjectId": "COURSE-ITEM-45",
        "lessons": 160,
        "duration": "Trọn bộ V-ACT & ĐGNL · Video + PDF",
        "level": "Kỳ thi ĐGNL V-ACT",
        "rating": 4.9,
        "students": "2.1k+",
        "price": 199000,
        "originalPrice": 790000,
        "badge": "Trọn Khóa 199K · Tặng App",
        "driveFolderId": "1xaRruY0asdqqw-fp4c9fy7n5nfxxGqSA",
        "extraFolderIds": [
            "1bz7JkVDWOOk5bKKrRFwyZvwUH2Mb9zj2",
            "12c6aQKTlU3hiJcQD2ThFKbgWIkCzpqv6",
            "1UQFg7cF1zuru0VMWqk4bn8XYd7gQnfIM"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1xaRruY0asdqqw-fp4c9fy7n5nfxxGqSA",
        "defaultCover": "",
        "highlights": [
            "Trọn bộ 3 lộ trình luyện thi ĐGNL ĐHQG TP.HCM (V-ACT 2027): Empire Team XPS, Mapstudy XPS & Hocmai Giải pháp toàn diện",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản đăng nhập bằng Email (Khóa bảo mật 1 thiết bị)",
            "Cấp quyền trực tiếp kho đề thi thử & bài giảng V-ACT cập nhật mới nhất"
        ],
        "isPackageOnly": true,
        "subTier": "course_199k",
        "tierShortBadge": "MỞ KHÓA KHÓA HỌC 199K",
        "summary": "Combo Luyện Thi ĐGNL V-ACT — ĐHQG TP.HCM 2027 (Ngôn Ngữ · Toán Học · Tư Duy Khoa Học)",
        "description": "Combo Luyện Thi ĐGNL V-ACT — ĐHQG TP.HCM 2027 (Ngôn Ngữ · Toán Học · Tư Duy Khoa Học) do EMPIRE TEAM · MAPSTUDY · HOCMAI giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-BCA-QDA-VSAT",
        "code": "DVBCA199",
        "instructor": "EMPIRE TEAM — KHỐI CÔNG AN · QUÂN ĐỘI · VSAT 8 MÔN",
        "title": "Combo Luyện Thi ĐGNL Bộ Công An (BCA) · Quân Đội (QDA) · VSAT 8 Môn (Toán, Văn, Anh, Lý, Hóa, Sinh, Sử, Địa)",
        "category": "dgnl_vact_bca",
        "subCategory": "lop12_2k9",
        "categories": [
            "dgnl_vact_bca",
            "ngoai_ngu_khxh",
            "khtn_toan_ly_hoa_sinh"
        ],
        "groupName": "Kỳ thi BCA · QDA · VSAT",
        "tier": "course_199k",
        "tierLabel": "Gói Theo Khóa (199k)",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-ITEM-48",
        "lessons": 220,
        "duration": "Trọn bộ BCA · QDA · VSAT 8 Môn",
        "level": "Kỳ thi BCA · QDA · VSAT",
        "rating": 5.0,
        "students": "1.8k+",
        "price": 199000,
        "originalPrice": 790000,
        "badge": "Trọn Khóa 199K · Tặng App",
        "driveFolderId": "1xaRruY0asdqqw-fp4c9fy7n5nfxxGqSA",
        "extraFolderIds": [
            "1AhTkg3k1908Md2VmTeIWsrg2dZSJeLAK",
            "1jNymOlAbD1sdzjKk6ijFzW6ZkB-IgvhI",
            "1KhQ_bJA5IEjeWjS5fjrn8ZlA7u1p-xbc"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1xaRruY0asdqqw-fp4c9fy7n5nfxxGqSA",
        "defaultCover": "",
        "highlights": [
            "Trọn bộ 3 kỳ thi chuyên biệt: ĐGNL Bộ Công An (BCA), ĐGNL Quân Đội (QDA Empire) và kỳ thi VSAT đủ 8 môn (Toán, Văn, Anh, Lý, Hóa, Sinh, Sử, Địa)",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản đăng nhập bằng Email (Khóa bảo mật 1 thiết bị)",
            "Hệ thống chuyên đề tự luận + trắc nghiệm sát cấu trúc đề thi tuyển sinh riêng"
        ],
        "isPackageOnly": true,
        "subTier": "course_199k",
        "tierShortBadge": "MỞ KHÓA KHÓA HỌC 199K",
        "summary": "Combo Luyện Thi ĐGNL Bộ Công An (BCA) · Quân Đội (QDA) · VSAT 8 Môn (Toán, Văn, Anh, Lý, Hóa, Sinh, Sử, Địa)",
        "description": "Combo Luyện Thi ĐGNL Bộ Công An (BCA) · Quân Đội (QDA) · VSAT 8 Môn (Toán, Văn, Anh, Lý, Hóa, Sinh, Sử, Địa) do EMPIRE TEAM — KHỐI CÔNG AN · QUÂN ĐỘI · VSAT 8 MÔN giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-TOAN12-2K9",
        "code": "DVT12",
        "instructor": "TENS · MAPSTUDY · PHAN TIẾN · ANH SHIPPER · HOCMAI",
        "title": "Trọn Bộ Môn Toán 12 (2K9) — 7 Khóa Luyện Thi THPTQG 2027",
        "category": "khtn_toan_ly_hoa_sinh",
        "subCategory": "lop12_2k9",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "groupName": "Môn Toán 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9",
        "lessons": 180,
        "duration": "Trọn bộ 7 khóa Toán 12 · Video + PDF",
        "level": "Môn Toán 12 (2K9)",
        "rating": 5.0,
        "students": "2.6k+",
        "price": 69000,
        "originalPrice": 299000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w",
        "extraFolderIds": [
            "1VbW3pT-HmLO6HgpXV_1iih6y7JrFe5Cj"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Toán 12 (2K9) — 7 Khóa Luyện Thi THPTQG 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Toán 12 (2K9) — 7 Khóa Luyện Thi THPTQG 2027",
        "description": "Trọn Bộ Môn Toán 12 (2K9) — 7 Khóa Luyện Thi THPTQG 2027 do TENS · MAPSTUDY · PHAN TIẾN · ANH SHIPPER · HOCMAI giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-VAN12-2K9",
        "code": "DVVAN12",
        "instructor": "HOCMAI TOPUNI · EMPIRE TEAM — BAN GIẢNG HUẤN NGỮ VĂN",
        "title": "Trọn Bộ Môn Ngữ Văn 12 (2K9) — Đọc Hiểu Văn Bản, Tiếng Việt & Nghị Luận Văn Học / Xã Hội",
        "category": "ngoai_ngu_khxh",
        "subCategory": "lop12_2k9",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9",
            "dgnl_hsa",
            "dgnl_vact_bca"
        ],
        "groupName": "Môn Ngữ Văn 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-VAN12-2K9",
        "lessons": 95,
        "duration": "Trọn bộ Ngữ Văn 12 · THPTQG & ĐGNL",
        "level": "Môn Ngữ Văn 12 (2K9)",
        "rating": 5.0,
        "students": "2.2k+",
        "price": 69000,
        "originalPrice": 299000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1DnhTPq6VL79T2nDyqtL13G5dyi_K0Yx3",
        "extraFolderIds": [
            "1t_QJSwaoUKPU5CtVX5yp040SxDCQf7wQ",
            "1Y76w1GLT9CSNGX5q0ER-uLua9eylB-Lz"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1DnhTPq6VL79T2nDyqtL13G5dyi_K0Yx3",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Ngữ Văn 12 (2K9) — Đọc Hiểu Văn Bản, Tiếng Việt & Nghị Luận Văn Học / Xã Hội",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Ngữ Văn 12 (2K9) — Đọc Hiểu Văn Bản, Tiếng Việt & Nghị Luận Văn Học / Xã Hội",
        "description": "Trọn Bộ Môn Ngữ Văn 12 (2K9) — Đọc Hiểu Văn Bản, Tiếng Việt & Nghị Luận Văn Học / Xã Hội do HOCMAI TOPUNI · EMPIRE TEAM — BAN GIẢNG HUẤN NGỮ VĂN giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-ANH12-2K9",
        "code": "DVA12",
        "instructor": "NGOAINGU24H — CÔ VŨ MAI PHƯƠNG · HOCMAI · EMPIRE",
        "title": "Trọn Bộ Môn Tiếng Anh 12 (2K9) — Lộ Trình Pro3M · Pro3MPlus · VIP90 & Nền Tảng Tiếng Anh",
        "category": "ngoai_ngu_khxh",
        "subCategory": "lop12_2k9",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9"
        ],
        "groupName": "Môn Tiếng Anh 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-ANH12-2K9",
        "lessons": 140,
        "duration": "Full Pro3M + Pro3MPlus + VIP90",
        "level": "Môn Tiếng Anh 12 (2K9)",
        "rating": 5.0,
        "students": "3.0k+",
        "price": 69000,
        "originalPrice": 299000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1WlZvKRBm4CYRH7yohELZf0G1vcvSOwqe",
        "extraFolderIds": [
            "1W80wIVEKFn8KMxTzTkfWf-IktCwAtjfL",
            "1N9Ge80PeZiLBts5Udb8h0g0X8-Rtx9mE",
            "1si7gRcqURbnbJMMiGiNwih-OzQhkQJJT"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1WlZvKRBm4CYRH7yohELZf0G1vcvSOwqe",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Tiếng Anh 12 (2K9) — Lộ Trình Pro3M · Pro3MPlus · VIP90 & Nền Tảng Tiếng Anh",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Tiếng Anh 12 (2K9) — Lộ Trình Pro3M · Pro3MPlus · VIP90 & Nền Tảng Tiếng Anh",
        "description": "Trọn Bộ Môn Tiếng Anh 12 (2K9) — Lộ Trình Pro3M · Pro3MPlus · VIP90 & Nền Tảng Tiếng Anh do NGOAINGU24H — CÔ VŨ MAI PHƯƠNG · HOCMAI · EMPIRE giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-TRUNG12-2K9",
        "code": "DVTRUNG12",
        "instructor": "YANGDEXIN · HANKA — HỆ THỐNG ĐÀO TẠO TIẾNG TRUNG",
        "title": "Trọn Bộ Môn Tiếng Trung (Hán Ngữ 6 Quyển · Bộ Đề HSK · Tiếng Trung Chuyên Ngành & Ôn Thi ĐH Khối D04)",
        "category": "ngoai_ngu_khxh",
        "subCategory": "lop12_2k9",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9"
        ],
        "groupName": "Môn Tiếng Trung (HSK & Khối D04)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-TRUNG12-2K9",
        "lessons": 160,
        "duration": "Full 6 Quyển Hán Ngữ + HSK + D04",
        "level": "Môn Tiếng Trung (HSK & Khối D04)",
        "rating": 5.0,
        "students": "1.9k+",
        "price": 69000,
        "originalPrice": 299000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1AvLbPix9Ahk4EMiqMYKJ9pZzxDugD6l6",
        "extraFolderIds": [
            "1NmkphCDWyXoVudrQqC_IIh5D1cUg6asR"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1AvLbPix9Ahk4EMiqMYKJ9pZzxDugD6l6",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Tiếng Trung (Hán Ngữ 6 Quyển · Bộ Đề HSK · Tiếng Trung Chuyên Ngành & Ôn Thi ĐH Khối D04)",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Tiếng Trung (Hán Ngữ 6 Quyển · Bộ Đề HSK · Tiếng Trung Chuyên Ngành & Ôn Thi ĐH Khối D04)",
        "description": "Trọn Bộ Môn Tiếng Trung (Hán Ngữ 6 Quyển · Bộ Đề HSK · Tiếng Trung Chuyên Ngành & Ôn Thi ĐH Khối D04) do YANGDEXIN · HANKA — HỆ THỐNG ĐÀO TẠO TIẾNG TRUNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-SU12-2K9",
        "code": "DVSU12",
        "instructor": "EMPIRE TEAM — BAN GIẢNG HUẤN LỊCH SỬ THPT & ĐGNL",
        "title": "Trọn Bộ Môn Lịch Sử 12 (2K9) — 22 Chuyên Đề Lịch Sử Việt Nam, Thế Giới & Chủ Quyền Biển Đông",
        "category": "ngoai_ngu_khxh",
        "subCategory": "lop12_2k9",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9",
            "dgnl_vact_bca"
        ],
        "groupName": "Môn Lịch Sử 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-SU12-2K9",
        "lessons": 90,
        "duration": "Full 22 chuyên đề Lịch Sử 12",
        "level": "Môn Lịch Sử 12 (2K9)",
        "rating": 5.0,
        "students": "1.8k+",
        "price": 69000,
        "originalPrice": 299000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1Elh6X9_ISZATrvMTdRpGY7spYib-iZqe",
        "extraFolderIds": [
            "1KW3u0aftTGOJdY7zNDJCot7IR4WJUnSF"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Elh6X9_ISZATrvMTdRpGY7spYib-iZqe",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Lịch Sử 12 (2K9) — 22 Chuyên Đề Lịch Sử Việt Nam, Thế Giới & Chủ Quyền Biển Đông",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Lịch Sử 12 (2K9) — 22 Chuyên Đề Lịch Sử Việt Nam, Thế Giới & Chủ Quyền Biển Đông",
        "description": "Trọn Bộ Môn Lịch Sử 12 (2K9) — 22 Chuyên Đề Lịch Sử Việt Nam, Thế Giới & Chủ Quyền Biển Đông do EMPIRE TEAM — BAN GIẢNG HUẤN LỊCH SỬ THPT & ĐGNL giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-DIA12-2K9",
        "code": "DVDIA12",
        "instructor": "EMPIRE TEAM — BAN GIẢNG HUẤN ĐỊA LÝ THPT & ĐGNL",
        "title": "Trọn Bộ Môn Địa Lý 12 (2K9) — Địa Lý Tự Nhiên, Dân Cư, Ngành Kinh Tế & Các Vùng Kinh Tế Việt Nam",
        "category": "ngoai_ngu_khxh",
        "subCategory": "lop12_2k9",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9",
            "dgnl_vact_bca"
        ],
        "groupName": "Môn Địa Lý 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-DIA12-2K9",
        "lessons": 85,
        "duration": "Full chuyên đề Địa Lý 12",
        "level": "Môn Địa Lý 12 (2K9)",
        "rating": 5.0,
        "students": "1.7k+",
        "price": 69000,
        "originalPrice": 299000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1zxzzbWG1Q97O9D5qAHmLNuUQIMPDiBwm",
        "extraFolderIds": [
            "1KW3u0aftTGOJdY7zNDJCot7IR4WJUnSF"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1zxzzbWG1Q97O9D5qAHmLNuUQIMPDiBwm",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Địa Lý 12 (2K9) — Địa Lý Tự Nhiên, Dân Cư, Ngành Kinh Tế & Các Vùng Kinh Tế Việt Nam",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Địa Lý 12 (2K9) — Địa Lý Tự Nhiên, Dân Cư, Ngành Kinh Tế & Các Vùng Kinh Tế Việt Nam",
        "description": "Trọn Bộ Môn Địa Lý 12 (2K9) — Địa Lý Tự Nhiên, Dân Cư, Ngành Kinh Tế & Các Vùng Kinh Tế Việt Nam do EMPIRE TEAM — BAN GIẢNG HUẤN ĐỊA LÝ THPT & ĐGNL giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-SINH12-2K9",
        "code": "DVSINH12",
        "instructor": "HOCMAI TOPUNI · EMPIRE TEAM — BAN GIẢNG HUẤN SINH HỌC",
        "title": "Trọn Bộ Môn Sinh Học 12 (2K9) — Di Truyền Phân Tử, Nhiễm Sắc Thể, Tiến Hóa & Sinh Thái Học",
        "category": "khtn_toan_ly_hoa_sinh",
        "subCategory": "lop12_2k9",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9",
            "dgnl_vact_bca"
        ],
        "groupName": "Môn Sinh Học 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-SINH12-2K9",
        "lessons": 110,
        "duration": "Full chuyên đề Sinh Học 12",
        "level": "Môn Sinh Học 12 (2K9)",
        "rating": 5.0,
        "students": "2.0k+",
        "price": 69000,
        "originalPrice": 299000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1OOZzym1p9C-MrlY43ugcWxoMu2ej1sOi",
        "extraFolderIds": [
            "1ryKQMaBjhkBx9W0qQaELK6_vmVw4fucr",
            "1CTrlYhRiXh7phi2qPwE3l_c2sOCsxS92"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1OOZzym1p9C-MrlY43ugcWxoMu2ej1sOi",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Sinh Học 12 (2K9) — Di Truyền Phân Tử, Nhiễm Sắc Thể, Tiến Hóa & Sinh Thái Học",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Sinh Học 12 (2K9) — Di Truyền Phân Tử, Nhiễm Sắc Thể, Tiến Hóa & Sinh Thái Học",
        "description": "Trọn Bộ Môn Sinh Học 12 (2K9) — Di Truyền Phân Tử, Nhiễm Sắc Thể, Tiến Hóa & Sinh Thái Học do HOCMAI TOPUNI · EMPIRE TEAM — BAN GIẢNG HUẤN SINH HỌC giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-LY12-2K9",
        "code": "DVL12",
        "instructor": "MAPSTUDY · IPCLASS · TENS · SANGSANG · HOCMAI",
        "title": "Trọn Bộ Môn Vật Lý 12 (2K9) — 5 Khóa Luyện Thi THPTQG 2027",
        "category": "khtn_toan_ly_hoa_sinh",
        "subCategory": "lop12_2k9",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "groupName": "Môn Vật Lý 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-LY12-2K9",
        "lessons": 140,
        "duration": "Trọn bộ 5 khóa Lý 12 · Video + PDF",
        "level": "Môn Vật Lý 12 (2K9)",
        "rating": 5.0,
        "students": "2.3k+",
        "price": 69000,
        "originalPrice": 299000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI",
        "extraFolderIds": [
            "1CAshsjgTtSA-QicoM95Z1N-Ghw4vdwwE"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Vật Lý 12 (2K9) — 5 Khóa Luyện Thi THPTQG 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Vật Lý 12 (2K9) — 5 Khóa Luyện Thi THPTQG 2027",
        "description": "Trọn Bộ Môn Vật Lý 12 (2K9) — 5 Khóa Luyện Thi THPTQG 2027 do MAPSTUDY · IPCLASS · TENS · SANGSANG · HOCMAI giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-HOA12-2K9",
        "code": "DVH12",
        "instructor": "TENS · NAP · SANGSANG · THẦY PHẠM THANH TÙNG",
        "title": "Trọn Bộ Môn Hóa Học 12 (2K9) — 4 Khóa Luyện Thi THPTQG 2027",
        "category": "khtn_toan_ly_hoa_sinh",
        "subCategory": "lop12_2k9",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "groupName": "Môn Hóa Học 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-HOA12-2K9",
        "lessons": 130,
        "duration": "Trọn bộ 4 khóa Hóa 12 · Video + PDF",
        "level": "Môn Hóa Học 12 (2K9)",
        "rating": 5.0,
        "students": "2.1k+",
        "price": 69000,
        "originalPrice": 299000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc",
        "extraFolderIds": [
            "1AQ0g_Yght0umoIcBJl826mVIqmZ9uBjA"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Hóa Học 12 (2K9) — 4 Khóa Luyện Thi THPTQG 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Hóa Học 12 (2K9) — 4 Khóa Luyện Thi THPTQG 2027",
        "description": "Trọn Bộ Môn Hóa Học 12 (2K9) — 4 Khóa Luyện Thi THPTQG 2027 do TENS · NAP · SANGSANG · THẦY PHẠM THANH TÙNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-MOS-THVP",
        "code": "DVMOS69",
        "instructor": "GITIHO · NIMBUS · LAKITA · HỌC VIỆN TIN HỌC",
        "title": "Trọn Bộ Môn Tin Học Văn Phòng & Chứng Chỉ Quốc Tế MOS (30 Khóa Word · Excel · PowerPoint · Access · Google Tools)",
        "category": "tinhoc_daihoc",
        "subCategory": "lop11_2k10",
        "categories": [
            "tinhoc_daihoc",
            "lop11_2k10"
        ],
        "groupName": "Môn Tin Học Văn Phòng & MOS",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP",
        "lessons": 280,
        "duration": "Full 30 khóa Tin Văn Phòng & MOS",
        "level": "Môn Tin Học Văn Phòng & MOS",
        "rating": 5.0,
        "students": "2.5k+",
        "price": 69000,
        "originalPrice": 299000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm",
        "extraFolderIds": [
            "1nC7Q2UXt01SgnkeD518XnlyDQTPXS1ZK"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Tin Học Văn Phòng & Chứng Chỉ Quốc Tế MOS (30 Khóa Word · Excel · PowerPoint · Access · Google Tools)",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Tin Học Văn Phòng & Chứng Chỉ Quốc Tế MOS (30 Khóa Word · Excel · PowerPoint · Access · Google Tools)",
        "description": "Trọn Bộ Môn Tin Học Văn Phòng & Chứng Chỉ Quốc Tế MOS (30 Khóa Word · Excel · PowerPoint · Access · Google Tools) do GITIHO · NIMBUS · LAKITA · HỌC VIỆN TIN HỌC giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-TIN11-2K10",
        "code": "DVTIN11",
        "instructor": "TUYENSINH247 — THẦY PHƯƠNG & CÔ DUNG",
        "title": "Trọn Bộ Môn Tin Học 11 (2K10) — Tin Học Ứng Dụng · Khoa Học Máy Tính · Thuật Toán & CSDL",
        "category": "tinhoc_daihoc",
        "subCategory": "lop11_2k10",
        "categories": [
            "tinhoc_daihoc",
            "lop11_2k10"
        ],
        "groupName": "Môn Tin Học 11 (2K10)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-TIN11-2K10",
        "lessons": 65,
        "duration": "Trọn bộ 3 khóa Tin 11",
        "level": "Môn Tin Học 11 (2K10)",
        "rating": 4.9,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq",
        "extraFolderIds": [
            "1MFbfgkctCYu736a4vMTzgvd4gvwmx8YT"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Tin Học 11 (2K10) — Tin Học Ứng Dụng · Khoa Học Máy Tính · Thuật Toán & CSDL",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Tin Học 11 (2K10) — Tin Học Ứng Dụng · Khoa Học Máy Tính · Thuật Toán & CSDL",
        "description": "Trọn Bộ Môn Tin Học 11 (2K10) — Tin Học Ứng Dụng · Khoa Học Máy Tính · Thuật Toán & CSDL do TUYENSINH247 — THẦY PHƯƠNG & CÔ DUNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-DAIHOC-KTL",
        "code": "DVKTL69",
        "instructor": "ĐIỆP VIÊN ACADEMY — BAN GIẢNG HUẤN KINH TẾ LƯỢNG",
        "title": "Môn Kinh Tế Lượng Đại Học Điểm A+ (Thực Hành Hồi Quy OLS Trên EViews · Stata · SPSS)",
        "category": "tinhoc_daihoc",
        "subCategory": "all",
        "categories": [
            "tinhoc_daihoc"
        ],
        "groupName": "Môn Kinh Tế Lượng Đại Học",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-DAIHOC-KTL",
        "lessons": 45,
        "duration": "Full thực hành EViews · Stata · SPSS",
        "level": "Môn Kinh Tế Lượng Đại Học",
        "rating": 5.0,
        "students": "1.9k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1xDhl87qUsflx4nQCbLdLs8RDaDQc2Dok",
        "extraFolderIds": [
            "1QJxChXQQ9WMZQTInw_3Tged3PfHHRZHS"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1xDhl87qUsflx4nQCbLdLs8RDaDQc2Dok",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Môn Kinh Tế Lượng Đại Học Điểm A+ (Thực Hành Hồi Quy OLS Trên EViews · Stata · SPSS)",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Môn Kinh Tế Lượng Đại Học Điểm A+ (Thực Hành Hồi Quy OLS Trên EViews · Stata · SPSS)",
        "description": "Môn Kinh Tế Lượng Đại Học Điểm A+ (Thực Hành Hồi Quy OLS Trên EViews · Stata · SPSS) do ĐIỆP VIÊN ACADEMY — BAN GIẢNG HUẤN KINH TẾ LƯỢNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-TRIETHOC",
        "code": "DVTRIET69",
        "instructor": "ĐIỆP VIÊN ACADEMY — BAN GIẢNG HUẤN LÝ LUẬN CHÍNH TRỊ",
        "title": "Môn Triết Học Mác - Lênin Đại Học Điểm A+ (Sơ Đồ Tư Duy & Đề Cương Trọng Tâm)",
        "category": "tinhoc_daihoc",
        "subCategory": "ngoai_ngu_khxh",
        "categories": [
            "tinhoc_daihoc",
            "ngoai_ngu_khxh"
        ],
        "groupName": "Môn Triết Học Mác - Lênin",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-TRIETHOC",
        "lessons": 40,
        "duration": "Full Sơ đồ tư duy & Đề cương A+",
        "level": "Môn Triết Học Mác - Lênin",
        "rating": 5.0,
        "students": "2.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1hJ1J8sadOa5-3FlOHx6GtM8yeIu-62-u",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1hJ1J8sadOa5-3FlOHx6GtM8yeIu-62-u",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Môn Triết Học Mác - Lênin Đại Học Điểm A+ (Sơ Đồ Tư Duy & Đề Cương Trọng Tâm)",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Môn Triết Học Mác - Lênin Đại Học Điểm A+ (Sơ Đồ Tư Duy & Đề Cương Trọng Tâm)",
        "description": "Môn Triết Học Mác - Lênin Đại Học Điểm A+ (Sơ Đồ Tư Duy & Đề Cương Trọng Tâm) do ĐIỆP VIÊN ACADEMY — BAN GIẢNG HUẤN LÝ LUẬN CHÍNH TRỊ giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-NCKH-APA7",
        "code": "DVNCKH69",
        "instructor": "ĐIỆP VIÊN ACADEMY — BAN HƯỚNG DẪN HỌC THUẬT & NCKH",
        "title": "Môn Phương Pháp Viết Bài Tập Lớn, Tiểu Luận & Nghiên Cứu Khoa Học Chuẩn APA 7",
        "category": "tinhoc_daihoc",
        "subCategory": "all",
        "categories": [
            "tinhoc_daihoc"
        ],
        "groupName": "Môn Viết BTL & NCKH APA 7",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-NCKH-APA7",
        "lessons": 40,
        "duration": "Full Khung dàn ý & Chuẩn trích dẫn APA 7",
        "level": "Môn Viết BTL & NCKH APA 7",
        "rating": 5.0,
        "students": "1.8k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1C08q3lzaWAI6MjGigtAc0H2K0HNGmxQx",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1C08q3lzaWAI6MjGigtAc0H2K0HNGmxQx",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Môn Phương Pháp Viết Bài Tập Lớn, Tiểu Luận & Nghiên Cứu Khoa Học Chuẩn APA 7",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Môn Phương Pháp Viết Bài Tập Lớn, Tiểu Luận & Nghiên Cứu Khoa Học Chuẩn APA 7",
        "description": "Môn Phương Pháp Viết Bài Tập Lớn, Tiểu Luận & Nghiên Cứu Khoa Học Chuẩn APA 7 do ĐIỆP VIÊN ACADEMY — BAN HƯỚNG DẪN HỌC THUẬT & NCKH giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-NGHETHUAT",
        "code": "DVART69",
        "instructor": "HAKETU · THIỆN ORGAN · HIỂN RÂU · PRODUCER STUDIO",
        "title": "Môn Nghệ Thuật, Âm Nhạc & Vũ Đạo (31 Khóa Guitar · Piano · Organ · Thanh Nhạc · Ukulele · Sáo · DJ · Shuffle Dance)",
        "category": "nghe_thuat",
        "subCategory": "all",
        "categories": [
            "nghe_thuat"
        ],
        "groupName": "Môn Nghệ Thuật & Âm Nhạc",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT",
        "lessons": 310,
        "duration": "Trọn bộ 31 khóa Nghệ Thuật",
        "level": "Môn Nghệ Thuật & Âm Nhạc",
        "rating": 5.0,
        "students": "1.9k+",
        "price": 69000,
        "originalPrice": 299000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1ZfQkutEeGbU5H0XAlK0Vm6xCaDWT-g_B",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1ZfQkutEeGbU5H0XAlK0Vm6xCaDWT-g_B",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Môn Nghệ Thuật, Âm Nhạc & Vũ Đạo (31 Khóa Guitar · Piano · Organ · Thanh Nhạc · Ukulele · Sáo · DJ · Shuffle Dance)",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Môn Nghệ Thuật, Âm Nhạc & Vũ Đạo (31 Khóa Guitar · Piano · Organ · Thanh Nhạc · Ukulele · Sáo · DJ · Shuffle Dance)",
        "description": "Môn Nghệ Thuật, Âm Nhạc & Vũ Đạo (31 Khóa Guitar · Piano · Organ · Thanh Nhạc · Ukulele · Sáo · DJ · Shuffle Dance) do HAKETU · THIỆN ORGAN · HIỂN RÂU · PRODUCER STUDIO giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-TOPUNI12-2K9",
        "code": "DVTOP12",
        "instructor": "HOCMAI — HỆ THỐNG TOPUNI NỀN TẢNG 12",
        "title": "Trọn Bộ 7 Khóa Nền Tảng 12 Đa Môn (Toán · Ngữ Văn · Tiếng Anh · Vật Lý · Hóa Học · Sinh Học)",
        "category": "lop12_2k9",
        "subCategory": "khtn_toan_ly_hoa_sinh",
        "categories": [
            "lop12_2k9",
            "khtn_toan_ly_hoa_sinh",
            "ngoai_ngu_khxh"
        ],
        "groupName": "TopUni Lớp 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOPUNI12-2K9",
        "lessons": 160,
        "duration": "Trọn bộ 7 môn Nền Tảng 12",
        "level": "TopUni Lớp 12 (2K9)",
        "rating": 4.9,
        "students": "1.9k+",
        "price": 69000,
        "originalPrice": 299000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ 7 Khóa Nền Tảng 12 Đa Môn (Toán · Ngữ Văn · Tiếng Anh · Vật Lý · Hóa Học · Sinh Học)",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ 7 Khóa Nền Tảng 12 Đa Môn (Toán · Ngữ Văn · Tiếng Anh · Vật Lý · Hóa Học · Sinh Học)",
        "description": "Trọn Bộ 7 Khóa Nền Tảng 12 Đa Môn (Toán · Ngữ Văn · Tiếng Anh · Vật Lý · Hóa Học · Sinh Học) do HOCMAI — HỆ THỐNG TOPUNI NỀN TẢNG 12 giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-TOAN11-2K10",
        "code": "DVT11",
        "instructor": "TENSCHOOL · TUYENSINH247 — THẦY ĐỨC & THẦY QUÂN",
        "title": "Trọn Bộ Môn Toán 11 (2K10) — Lộ Trình Cơ Bản & Nâng Cao 2027",
        "category": "lop11_2k10",
        "subCategory": "khtn_toan_ly_hoa_sinh",
        "categories": [
            "lop11_2k10",
            "khtn_toan_ly_hoa_sinh"
        ],
        "groupName": "Môn Toán 11 (2K10)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-TOAN11-2K10",
        "lessons": 85,
        "duration": "Trọn bộ Toán 11 2K10",
        "level": "Môn Toán 11 (2K10)",
        "rating": 5.0,
        "students": "1.5k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1CbMUKPhYMX12UmVAfsQAkpe8KnciWSlP",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1CbMUKPhYMX12UmVAfsQAkpe8KnciWSlP",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Toán 11 (2K10) — Lộ Trình Cơ Bản & Nâng Cao 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Toán 11 (2K10) — Lộ Trình Cơ Bản & Nâng Cao 2027",
        "description": "Trọn Bộ Môn Toán 11 (2K10) — Lộ Trình Cơ Bản & Nâng Cao 2027 do TENSCHOOL · TUYENSINH247 — THẦY ĐỨC & THẦY QUÂN giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-LY11-2K10",
        "code": "DVL11",
        "instructor": "TUYENSINH247 — THẦY VŨ HOÀNG QUÂN & THẦY LONG",
        "title": "Trọn Bộ Môn Vật Lý 11 (2K10) — Chuyên Đề & Luyện Đề Học Kỳ",
        "category": "lop11_2k10",
        "subCategory": "khtn_toan_ly_hoa_sinh",
        "categories": [
            "lop11_2k10",
            "khtn_toan_ly_hoa_sinh"
        ],
        "groupName": "Môn Vật Lý 11 (2K10)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-LY11-2K10",
        "lessons": 80,
        "duration": "Trọn bộ 3 khóa Lý 11",
        "level": "Môn Vật Lý 11 (2K10)",
        "rating": 4.9,
        "students": "1.3k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "134iDRuiFnuSlRFGC07o0qI8YC-1gMrIL",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/134iDRuiFnuSlRFGC07o0qI8YC-1gMrIL",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Vật Lý 11 (2K10) — Chuyên Đề & Luyện Đề Học Kỳ",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Vật Lý 11 (2K10) — Chuyên Đề & Luyện Đề Học Kỳ",
        "description": "Trọn Bộ Môn Vật Lý 11 (2K10) — Chuyên Đề & Luyện Đề Học Kỳ do TUYENSINH247 — THẦY VŨ HOÀNG QUÂN & THẦY LONG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-SUBJ-HOA11-2K10",
        "code": "DVH11",
        "instructor": "HOCMAI · TUYENSINH247 — CÔ DƯƠNG, CÔ HUỆ & THẦY TÙNG",
        "title": "Trọn Bộ Môn Hóa Học 11 (2K10) — Lớp Tương Tác & Nâng Cao",
        "category": "lop11_2k10",
        "subCategory": "khtn_toan_ly_hoa_sinh",
        "categories": [
            "lop11_2k10",
            "khtn_toan_ly_hoa_sinh"
        ],
        "groupName": "Môn Hóa Học 11 (2K10)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn (69k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-HOA11-2K10",
        "lessons": 75,
        "duration": "Trọn bộ 2 khóa Hóa 11",
        "level": "Môn Hóa Học 11 (2K10)",
        "rating": 4.9,
        "students": "1.2k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Môn 69K · Tặng App",
        "driveFolderId": "1CL2S35nzQS7qkXKck9c_efHX-aS87v-a",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1CL2S35nzQS7qkXKck9c_efHX-aS87v-a",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trọn bộ thư mục môn học: Trọn Bộ Môn Hóa Học 11 (2K10) — Lớp Tương Tác & Nâng Cao",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng, tài liệu PDF và đề thi thử"
        ],
        "isPackageOnly": true,
        "subTier": "bundle_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "summary": "Trọn Bộ Môn Hóa Học 11 (2K10) — Lớp Tương Tác & Nâng Cao",
        "description": "Trọn Bộ Môn Hóa Học 11 (2K10) — Lớp Tương Tác & Nâng Cao do HOCMAI · TUYENSINH247 — CÔ DƯƠNG, CÔ HUỆ & THẦY TÙNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027."
    },
    {
        "id": "COURSE-ITEM-01",
        "code": "DVC01",
        "title": "Khóa Toán 12 (2K9) — Lộ Trình Chinh Phục THPTQG 2027 (Khóa T · E · Đom Đóm)",
        "category": "lop12_2k9",
        "groupName": "Môn Toán 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9",
        "instructor": "TENSCHOOL — THẦY ĐỖ VĂN ĐỨC",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Toán 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1S4DkHAPvliK9ea222q9x3sDbVM2TX3bm",
        "extraFolderIds": [
            "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1S4DkHAPvliK9ea222q9x3sDbVM2TX3bm",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TOÁN THẦY ĐỖ VĂN ĐỨC TENS 2K9",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Toán 12 (2K9) — Lộ Trình Chinh Phục THPTQG 2027 (Khóa T · E · Đom Đóm) do TENSCHOOL — THẦY ĐỖ VĂN ĐỨC giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Toán 12 (2K9) — Lộ Trình Chinh Phục THPTQG 2027 (Khóa T · E · Đom Đóm)",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-55",
        "code": "DVC55",
        "title": "Khóa Ngữ Văn 12 (2K9) — Đọc Hiểu Thơ, Truyện, Ký, Văn Bản Thông Tin & Nghị Luận Văn Học",
        "category": "ngoai_ngu_khxh",
        "subCategory": "lop12_2k9",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9",
            "dgnl_vact_bca"
        ],
        "groupName": "Môn Ngữ Văn 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-VAN12-2K9",
        "instructor": "EMPIRE TEAM — BAN GIẢNG HUẤN NGỮ VĂN",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Ngữ Văn 12 (2K9)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1t_QJSwaoUKPU5CtVX5yp040SxDCQf7wQ",
        "extraFolderIds": [
            "1DnhTPq6VL79T2nDyqtL13G5dyi_K0Yx3"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1t_QJSwaoUKPU5CtVX5yp040SxDCQf7wQ",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Ngữ Văn 12 (2K9) — Đọc Hiểu Thơ, Truyện, Ký, Văn Bản Thông Tin & Nghị Luận Văn Học",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Ngữ Văn 12 (2K9) — Đọc Hiểu Thơ, Truyện, Ký, Văn Bản Thông Tin & Nghị Luận Văn Học do EMPIRE TEAM — BAN GIẢNG HUẤN NGỮ VĂN giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Ngữ Văn 12 (2K9) — Đọc Hiểu Thơ, Truyện, Ký, Văn Bản Thông Tin & Nghị Luận Văn Học",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-17",
        "code": "DVC17",
        "title": "Khóa Tiếng Anh 12 (2K9) — Trọn Bộ Lộ Trình Pro3M · Pro3MPlus · VIP90 2027",
        "category": "lop12_2k9",
        "groupName": "Môn Tiếng Anh 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-ANH12-2K9",
        "instructor": "NGOAINGU24H — CÔ VŨ MAI PHƯƠNG",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tiếng Anh 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1W80wIVEKFn8KMxTzTkfWf-IktCwAtjfL",
        "extraFolderIds": [
            "1WlZvKRBm4CYRH7yohELZf0G1vcvSOwqe"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1W80wIVEKFn8KMxTzTkfWf-IktCwAtjfL",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TIẾNG ANH CÔ MAI PHƯƠNG 2K9 - Trọn Bộ Lộ Trình Pro3m, Pro3mplus, Vip90 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Tiếng Anh 12 (2K9) — Trọn Bộ Lộ Trình Pro3M · Pro3MPlus · VIP90 2027 do NGOAINGU24H — CÔ VŨ MAI PHƯƠNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Tiếng Anh 12 (2K9) — Trọn Bộ Lộ Trình Pro3M · Pro3MPlus · VIP90 2027",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9"
        ],
        "subCategory": "ngoai_ngu_khxh"
    },
    {
        "id": "COURSE-ITEM-51",
        "code": "DVC51",
        "title": "Khóa Tiếng Trung Toàn Diện — Giáo Trình Hán Ngữ 6 Quyển (Quyển 1–6) & Luyện Viết Chữ Hán",
        "category": "ngoai_ngu_khxh",
        "subCategory": "lop12_2k9",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9"
        ],
        "groupName": "Môn Tiếng Trung (HSK & Khối D04)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-TRUNG12-2K9",
        "instructor": "YANGDEXIN — HỆ THỐNG ĐÀO TẠO TIẾNG TRUNG",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tiếng Trung (HSK & Khối D04)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1NmkphCDWyXoVudrQqC_IIh5D1cUg6asR",
        "extraFolderIds": [
            "1AvLbPix9Ahk4EMiqMYKJ9pZzxDugD6l6",
            "11rrA9I_UcBwvUwgbe4USj2IKsx12sW6w"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1NmkphCDWyXoVudrQqC_IIh5D1cUg6asR",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Tiếng Trung Toàn Diện — Giáo Trình Hán Ngữ 6 Quyển (Quyển 1–6) & Luyện Viết Chữ Hán",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Tiếng Trung Toàn Diện — Giáo Trình Hán Ngữ 6 Quyển (Quyển 1–6) & Luyện Viết Chữ Hán do YANGDEXIN — HỆ THỐNG ĐÀO TẠO TIẾNG TRUNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Tiếng Trung Toàn Diện — Giáo Trình Hán Ngữ 6 Quyển (Quyển 1–6) & Luyện Viết Chữ Hán",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-57",
        "code": "DVC57",
        "title": "Khóa Lịch Sử 12 (2K9) — Trọn Bộ 22 Chuyên Đề Lịch Sử Việt Nam, Thế Giới & Chủ Quyền Biển Đông",
        "category": "ngoai_ngu_khxh",
        "subCategory": "lop12_2k9",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9",
            "dgnl_vact_bca"
        ],
        "groupName": "Môn Lịch Sử 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-SU12-2K9",
        "instructor": "EMPIRE TEAM — BAN GIẢNG HUẤN LỊCH SỬ",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Lịch Sử 12 (2K9)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1Elh6X9_ISZATrvMTdRpGY7spYib-iZqe",
        "extraFolderIds": [
            "1KW3u0aftTGOJdY7zNDJCot7IR4WJUnSF"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Elh6X9_ISZATrvMTdRpGY7spYib-iZqe",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Lịch Sử 12 (2K9) — Trọn Bộ 22 Chuyên Đề Lịch Sử Việt Nam, Thế Giới & Chủ Quyền Biển Đông",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Lịch Sử 12 (2K9) — Trọn Bộ 22 Chuyên Đề Lịch Sử Việt Nam, Thế Giới & Chủ Quyền Biển Đông do EMPIRE TEAM — BAN GIẢNG HUẤN LỊCH SỬ giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Lịch Sử 12 (2K9) — Trọn Bộ 22 Chuyên Đề Lịch Sử Việt Nam, Thế Giới & Chủ Quyền Biển Đông",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-58",
        "code": "DVC58",
        "title": "Khóa Địa Lý 12 (2K9) — Địa Lý Tự Nhiên Đại Cương, Dân Cư & Các Vùng Kinh Tế Việt Nam",
        "category": "ngoai_ngu_khxh",
        "subCategory": "lop12_2k9",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9",
            "dgnl_vact_bca"
        ],
        "groupName": "Môn Địa Lý 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-DIA12-2K9",
        "instructor": "EMPIRE TEAM — BAN GIẢNG HUẤN ĐỊA LÝ",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Địa Lý 12 (2K9)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1zxzzbWG1Q97O9D5qAHmLNuUQIMPDiBwm",
        "extraFolderIds": [
            "1KW3u0aftTGOJdY7zNDJCot7IR4WJUnSF"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1zxzzbWG1Q97O9D5qAHmLNuUQIMPDiBwm",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Địa Lý 12 (2K9) — Địa Lý Tự Nhiên Đại Cương, Dân Cư & Các Vùng Kinh Tế Việt Nam",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Địa Lý 12 (2K9) — Địa Lý Tự Nhiên Đại Cương, Dân Cư & Các Vùng Kinh Tế Việt Nam do EMPIRE TEAM — BAN GIẢNG HUẤN ĐỊA LÝ giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Địa Lý 12 (2K9) — Địa Lý Tự Nhiên Đại Cương, Dân Cư & Các Vùng Kinh Tế Việt Nam",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-59",
        "code": "DVC59",
        "title": "Khóa Sinh Học 12 (2K9) — 10 Chuyên Đề Sinh Học Tế Bào, Di Truyền, Tiến Hóa & Sinh Thái Học",
        "category": "khtn_toan_ly_hoa_sinh",
        "subCategory": "lop12_2k9",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9",
            "dgnl_vact_bca"
        ],
        "groupName": "Môn Sinh Học 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-SINH12-2K9",
        "instructor": "EMPIRE TEAM — BAN GIẢNG HUẤN SINH HỌC",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Sinh Học 12 (2K9)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1ryKQMaBjhkBx9W0qQaELK6_vmVw4fucr",
        "extraFolderIds": [
            "1OOZzym1p9C-MrlY43ugcWxoMu2ej1sOi"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1ryKQMaBjhkBx9W0qQaELK6_vmVw4fucr",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Sinh Học 12 (2K9) — 10 Chuyên Đề Sinh Học Tế Bào, Di Truyền, Tiến Hóa & Sinh Thái Học",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Sinh Học 12 (2K9) — 10 Chuyên Đề Sinh Học Tế Bào, Di Truyền, Tiến Hóa & Sinh Thái Học do EMPIRE TEAM — BAN GIẢNG HUẤN SINH HỌC giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Sinh Học 12 (2K9) — 10 Chuyên Đề Sinh Học Tế Bào, Di Truyền, Tiến Hóa & Sinh Thái Học",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-08",
        "code": "DVC08",
        "title": "Khóa Vật Lý 12 (2K9) — Trọn Bộ Lộ Trình IOME Chinh Phục 9+ 2027",
        "category": "lop12_2k9",
        "groupName": "Môn Vật Lý 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-LY12-2K9",
        "instructor": "MAPSTUDY — THẦY VŨ NGỌC ANH",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Vật Lý 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1hXQ_ro2zg7CwHF3Qi3d9KBkoaHn6XxoE",
        "extraFolderIds": [
            "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1hXQ_ro2zg7CwHF3Qi3d9KBkoaHn6XxoE",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: LÝ THẦY VŨ NGỌC ANH 2K9 - Trọn Bộ Lộ Trình IOME 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Vật Lý 12 (2K9) — Trọn Bộ Lộ Trình IOME Chinh Phục 9+ 2027 do MAPSTUDY — THẦY VŨ NGỌC ANH giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Vật Lý 12 (2K9) — Trọn Bộ Lộ Trình IOME Chinh Phục 9+ 2027",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-13",
        "code": "DVC13",
        "title": "Khóa Hóa Học 12 (2K9) — Lộ Trình Toàn Diện Luyện Thi THPTQG 2027",
        "category": "lop12_2k9",
        "groupName": "Môn Hóa Học 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-HOA12-2K9",
        "instructor": "TENSCHOOL — THẦY PHẠM VĂN TRỌNG",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Hóa Học 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1JkWVgk6FWNROK433fzc2Bbs8DXB5X5OM",
        "extraFolderIds": [
            "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1JkWVgk6FWNROK433fzc2Bbs8DXB5X5OM",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: HÓA THẦY PHẠM VĂN TRỌNG 2K9 THPTQG 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Hóa Học 12 (2K9) — Lộ Trình Toàn Diện Luyện Thi THPTQG 2027 do TENSCHOOL — THẦY PHẠM VĂN TRỌNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Hóa Học 12 (2K9) — Lộ Trình Toàn Diện Luyện Thi THPTQG 2027",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-65",
        "code": "DVC65",
        "title": "Khóa Luyện Thi Chứng Chỉ Quốc Tế MOS Word & MOS Excel (2016 · 2019 · 365) Kèm Đề Mock Test",
        "category": "tinhoc_daihoc",
        "subCategory": "lop11_2k10",
        "categories": [
            "tinhoc_daihoc",
            "lop11_2k10"
        ],
        "groupName": "Môn Tin Học Văn Phòng & MOS",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP",
        "instructor": "NIMBUS & HỌC VIỆN MOS — CHỨNG CHỈ QUỐC TẾ",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tin Học Văn Phòng & MOS",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1sB5iPqIkaLJHhLNmPDxOLpA-AZ9KgRHg",
        "extraFolderIds": [
            "1HzXJFbiK77HhjEPxdmeTp9J9NkBbSnxQ",
            "1uQIG5U2FSMiRgvrNDJOPhuca3cty0OVc",
            "1jHc3rPDIe9qqhfRzXNjscKFrZUqdj5y5",
            "1O2qI08NlviBnIoVM44WICYH54ZO2B3a5"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1sB5iPqIkaLJHhLNmPDxOLpA-AZ9KgRHg",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Luyện Thi Chứng Chỉ Quốc Tế MOS Word & MOS Excel (2016 · 2019 · 365) Kèm Đề Mock Test",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Luyện Thi Chứng Chỉ Quốc Tế MOS Word & MOS Excel (2016 · 2019 · 365) Kèm Đề Mock Test do NIMBUS & HỌC VIỆN MOS — CHỨNG CHỈ QUỐC TẾ giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Luyện Thi Chứng Chỉ Quốc Tế MOS Word & MOS Excel (2016 · 2019 · 365) Kèm Đề Mock Test",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-33",
        "code": "DVC33",
        "title": "Khóa Tin Học 11 (2K10) — Định Hướng Khoa Học Máy Tính & Thuật Toán",
        "category": "lop11_2k10",
        "groupName": "Môn Tin Học 11 (2K10)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-TIN11-2K10",
        "instructor": "TUYENSINH247 [S1] — THẦY PHƯƠNG & CÔ DUNG",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tin Học 11 (2K10)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1niGfuKDA1xbAGI2lQpfDxic4s2H8fFip",
        "extraFolderIds": [
            "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1niGfuKDA1xbAGI2lQpfDxic4s2H8fFip",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: [S1] Thầy Phương, cô Dung - Tin 11 - Khoa học máy tính - 2027 Tuyensinh247",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Tin Học 11 (2K10) — Định Hướng Khoa Học Máy Tính & Thuật Toán do TUYENSINH247 [S1] — THẦY PHƯƠNG & CÔ DUNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Tin Học 11 (2K10) — Định Hướng Khoa Học Máy Tính & Thuật Toán",
        "categories": [
            "tinhoc_daihoc",
            "lop11_2k10"
        ],
        "subCategory": "tinhoc_daihoc"
    },
    {
        "id": "COURSE-ITEM-71",
        "code": "DVC71",
        "title": "Khóa Cày Điểm A+ Kinh Tế Lượng — Thực Hành Hồi Quy OLS Trên EViews, Stata & SPSS",
        "category": "tinhoc_daihoc",
        "subCategory": "all",
        "categories": [
            "tinhoc_daihoc"
        ],
        "groupName": "Môn Kinh Tế Lượng Đại Học",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-DAIHOC-KTL",
        "instructor": "ĐIỆP VIÊN ACADEMY — KINH TẾ LƯỢNG ĐẠI HỌC",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Kinh Tế Lượng Đại Học",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1xDhl87qUsflx4nQCbLdLs8RDaDQc2Dok",
        "extraFolderIds": [
            "1ZmaGDNTMCJqEhWC2oB5vs21WDM__FV7N"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1xDhl87qUsflx4nQCbLdLs8RDaDQc2Dok",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Cày Điểm A+ Kinh Tế Lượng — Thực Hành Hồi Quy OLS Trên EViews, Stata & SPSS",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Cày Điểm A+ Kinh Tế Lượng — Thực Hành Hồi Quy OLS Trên EViews, Stata & SPSS do ĐIỆP VIÊN ACADEMY — KINH TẾ LƯỢNG ĐẠI HỌC giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Cày Điểm A+ Kinh Tế Lượng — Thực Hành Hồi Quy OLS Trên EViews, Stata & SPSS",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-72",
        "code": "DVC72",
        "title": "Khóa Đạt A+ Triết Học Mác - Lênin — Hệ Thống Sơ Đồ Tư Duy & Đề Cương Tự Luận Trọng Tâm",
        "category": "tinhoc_daihoc",
        "subCategory": "ngoai_ngu_khxh",
        "categories": [
            "tinhoc_daihoc",
            "ngoai_ngu_khxh"
        ],
        "groupName": "Môn Triết Học Mác - Lênin",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-TRIETHOC",
        "instructor": "ĐIỆP VIÊN ACADEMY — LÝ LUẬN CHÍNH TRỊ ĐẠI HỌC",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Triết Học Mác - Lênin",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1hJ1J8sadOa5-3FlOHx6GtM8yeIu-62-u",
        "extraFolderIds": [
            "1ZmaGDNTMCJqEhWC2oB5vs21WDM__FV7N"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1hJ1J8sadOa5-3FlOHx6GtM8yeIu-62-u",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Đạt A+ Triết Học Mác - Lênin — Hệ Thống Sơ Đồ Tư Duy & Đề Cương Tự Luận Trọng Tâm",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Đạt A+ Triết Học Mác - Lênin — Hệ Thống Sơ Đồ Tư Duy & Đề Cương Tự Luận Trọng Tâm do ĐIỆP VIÊN ACADEMY — LÝ LUẬN CHÍNH TRỊ ĐẠI HỌC giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Đạt A+ Triết Học Mác - Lênin — Hệ Thống Sơ Đồ Tư Duy & Đề Cương Tự Luận Trọng Tâm",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-73",
        "code": "DVC73",
        "title": "Khóa Master Viết Bài Tập Lớn, Tiểu Luận & Nghiên Cứu Khoa Học Chuẩn Trích Dẫn APA 7",
        "category": "tinhoc_daihoc",
        "subCategory": "all",
        "categories": [
            "tinhoc_daihoc"
        ],
        "groupName": "Môn Viết BTL & NCKH APA 7",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-NCKH-APA7",
        "instructor": "ĐIỆP VIÊN ACADEMY — HỌC THUẬT & NCKH",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Viết BTL & NCKH APA 7",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1C08q3lzaWAI6MjGigtAc0H2K0HNGmxQx",
        "extraFolderIds": [
            "1ZmaGDNTMCJqEhWC2oB5vs21WDM__FV7N"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1C08q3lzaWAI6MjGigtAc0H2K0HNGmxQx",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Master Viết Bài Tập Lớn, Tiểu Luận & Nghiên Cứu Khoa Học Chuẩn Trích Dẫn APA 7",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Master Viết Bài Tập Lớn, Tiểu Luận & Nghiên Cứu Khoa Học Chuẩn Trích Dẫn APA 7 do ĐIỆP VIÊN ACADEMY — HỌC THUẬT & NCKH giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Master Viết Bài Tập Lớn, Tiểu Luận & Nghiên Cứu Khoa Học Chuẩn Trích Dẫn APA 7",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-75",
        "code": "DVC75",
        "title": "Khóa Học Đệm Hát Guitar Cơ Bản, Nâng Cao & Fingerstyle Guitar Cùng Haketu",
        "category": "nghe_thuat",
        "subCategory": "all",
        "categories": [
            "nghe_thuat"
        ],
        "groupName": "Môn Nghệ Thuật & Âm Nhạc",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT",
        "instructor": "HAKETU GUITAR — HỌC ĐỆM HÁT & FINGERSTYLE",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Nghệ Thuật & Âm Nhạc",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1AoRvrctJEQm-yj70kSM3La4HBt_35vxD",
        "extraFolderIds": [
            "1GvjM6qVVIt1w4lALVVI2dc9lbBuTLYGp",
            "1xm4in14mBPrAd8UgOHwC7yvkNEGxrb-7",
            "1nv7AkmBfLlJE85fvpqGuSknI2x_k9Qsz",
            "1ZfQkutEeGbU5H0XAlK0Vm6xCaDWT-g_B"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1AoRvrctJEQm-yj70kSM3La4HBt_35vxD",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Học Đệm Hát Guitar Cơ Bản, Nâng Cao & Fingerstyle Guitar Cùng Haketu",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Học Đệm Hát Guitar Cơ Bản, Nâng Cao & Fingerstyle Guitar Cùng Haketu do HAKETU GUITAR — HỌC ĐỆM HÁT & FINGERSTYLE giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Học Đệm Hát Guitar Cơ Bản, Nâng Cao & Fingerstyle Guitar Cùng Haketu",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-77",
        "code": "DVC77",
        "title": "Khóa Đệm Hát Piano Trong 30 Ngày, Piano Quốc Tế Elementary 1 & Đệm Organ Cấp Tốc",
        "category": "nghe_thuat",
        "subCategory": "all",
        "categories": [
            "nghe_thuat"
        ],
        "groupName": "Môn Nghệ Thuật & Âm Nhạc",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT",
        "instructor": "THIỆN ORGAN & PIANO QUỐC TẾ — ĐỆM HÁT PIANO",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Nghệ Thuật & Âm Nhạc",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1xnMNTVEIDuKlDV-8a6AhCkt6W9dD8Niw",
        "extraFolderIds": [
            "1fVzNfcQ2j9XUN5SX2OWXnIl1Zv-H0_4M",
            "1LNpJbhB3fRlPgx7mX5eOwdMGwtUOFU8P",
            "1DOHPFPQZgO5DT3pdeKOvEKHnSa8YRPIw",
            "1xi3N8UeflrYX99c5Wz_6xcZKMt0xAGPo"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1xnMNTVEIDuKlDV-8a6AhCkt6W9dD8Niw",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Đệm Hát Piano Trong 30 Ngày, Piano Quốc Tế Elementary 1 & Đệm Organ Cấp Tốc",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Đệm Hát Piano Trong 30 Ngày, Piano Quốc Tế Elementary 1 & Đệm Organ Cấp Tốc do THIỆN ORGAN & PIANO QUỐC TẾ — ĐỆM HÁT PIANO giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Đệm Hát Piano Trong 30 Ngày, Piano Quốc Tế Elementary 1 & Đệm Organ Cấp Tốc",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-78",
        "code": "DVC78",
        "title": "Khóa Học Thanh Nhạc Cơ Bản, Kỹ Thuật Mở Khẩu Hình Phát Triển Giọng Hát & Hát Karaoke",
        "category": "nghe_thuat",
        "subCategory": "all",
        "categories": [
            "nghe_thuat"
        ],
        "groupName": "Môn Nghệ Thuật & Âm Nhạc",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT",
        "instructor": "HỌC VIỆN THANH NHẠC — LUYỆN GIỌNG & CA HÁT",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Nghệ Thuật & Âm Nhạc",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1jf4qgjDAKaKlHJaFBr8GTEe1Kr4aKFk1",
        "extraFolderIds": [
            "1bCkT2REDxhU9hbC5BLyWGa6U8RH8CZ7m",
            "1nOdncN1gRJxqEligvNt2BQsqb1YCvmf1",
            "1jNY7a1pB08bVvM0_fpHuM9j_Sk8sFBdX"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1jf4qgjDAKaKlHJaFBr8GTEe1Kr4aKFk1",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Học Thanh Nhạc Cơ Bản, Kỹ Thuật Mở Khẩu Hình Phát Triển Giọng Hát & Hát Karaoke",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Học Thanh Nhạc Cơ Bản, Kỹ Thuật Mở Khẩu Hình Phát Triển Giọng Hát & Hát Karaoke do HỌC VIỆN THANH NHẠC — LUYỆN GIỌNG & CA HÁT giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Học Thanh Nhạc Cơ Bản, Kỹ Thuật Mở Khẩu Hình Phát Triển Giọng Hát & Hát Karaoke",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-35",
        "code": "DVC35",
        "title": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) ĐHQG Hà Nội",
        "category": "dgnl_hsa",
        "groupName": "ĐGNL HSA (ĐHQG Hà Nội)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-ITEM-35",
        "instructor": "EMPIRE TEAM — LUYỆN THI ĐGNL HÀ NỘI",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "ĐGNL HSA (ĐHQG Hà Nội)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1oRf9iIynqglvPJhq0Jyf3ILL2lUVKEQy",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1oRf9iIynqglvPJhq0Jyf3ILL2lUVKEQy",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: HSA EMPIRE 2K9 LUYỆN THI ĐGNL HÀ NỘI 2027 - Khoá XPS",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) ĐHQG Hà Nội do EMPIRE TEAM — LUYỆN THI ĐGNL HÀ NỘI giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) ĐHQG Hà Nội",
        "categories": [
            "dgnl_hsa",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-40",
        "code": "DVC40",
        "title": "Khóa ĐGTD TSA 2027 (2K9) — Luyện Thi Đánh Giá Tư Duy ĐH Bách Khoa HN",
        "category": "dgtd_tsa",
        "groupName": "ĐGTD TSA (ĐH Bách Khoa)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGTD-TSA",
        "parentSubjectId": "COURSE-ITEM-40",
        "instructor": "EMPIRE TEAM — LUYỆN THI ĐGTD BÁCH KHOA",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "ĐGTD TSA (ĐH Bách Khoa)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1RPRK-NLUAudeC-65FF_nXbaOKG2aP_CJ",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1RPRK-NLUAudeC-65FF_nXbaOKG2aP_CJ",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TSA - LUYỆN THI ĐÁNH GIÁ TƯ DUY ĐH BÁCH KHOA HN EMPIRE 2K9 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa ĐGTD TSA 2027 (2K9) — Luyện Thi Đánh Giá Tư Duy ĐH Bách Khoa HN do EMPIRE TEAM — LUYỆN THI ĐGTD BÁCH KHOA giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa ĐGTD TSA 2027 (2K9) — Luyện Thi Đánh Giá Tư Duy ĐH Bách Khoa HN",
        "categories": [
            "dgtd_tsa",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-45",
        "code": "DVC45",
        "title": "Khóa ĐGNL V-ACT 2027 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) ĐHQG TP.HCM",
        "category": "dgnl_vact_bca",
        "groupName": "ĐGNL V-ACT (ĐHQG TP.HCM)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGNL-VACT",
        "parentSubjectId": "COURSE-ITEM-45",
        "instructor": "EMPIRE TEAM — LUYỆN THI ĐGNL TP.HCM",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "ĐGNL V-ACT (ĐHQG TP.HCM)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1bz7JkVDWOOk5bKKrRFwyZvwUH2Mb9zj2",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1bz7JkVDWOOk5bKKrRFwyZvwUH2Mb9zj2",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: V-ACT 2K9 EMPIRE TEAM LUYỆN THI ĐGNL TP.HCM 2027 - XPS 2K9 V-ACT 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa ĐGNL V-ACT 2027 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) ĐHQG TP.HCM do EMPIRE TEAM — LUYỆN THI ĐGNL TP.HCM giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa ĐGNL V-ACT 2027 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) ĐHQG TP.HCM",
        "categories": [
            "dgnl_vact_bca",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-48",
        "code": "DVC48",
        "title": "Khóa Luyện Thi Đánh Giá Năng Lực Bộ Công An (BCA 2027) — Tự Luận & Trắc Nghiệm",
        "category": "dgnl_vact_bca",
        "groupName": "Kỳ thi ĐGNL Bộ Công An",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-ITEM-48",
        "instructor": "EMPIRE TEAM — CHUYÊN LUYỆN THI KHỐI CÔNG AN",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Kỳ thi ĐGNL Bộ Công An",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1AhTkg3k1908Md2VmTeIWsrg2dZSJeLAK",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1AhTkg3k1908Md2VmTeIWsrg2dZSJeLAK",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: BCA - LUYỆN THI ĐÁNH GIÁ NĂNG LỰC BỘ CÔNG AN",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Luyện Thi Đánh Giá Năng Lực Bộ Công An (BCA 2027) — Tự Luận & Trắc Nghiệm do EMPIRE TEAM — CHUYÊN LUYỆN THI KHỐI CÔNG AN giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Luyện Thi Đánh Giá Năng Lực Bộ Công An (BCA 2027) — Tự Luận & Trắc Nghiệm",
        "categories": [
            "dgnl_vact_bca",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-49",
        "code": "DVC49",
        "title": "Khóa Luyện Thi Đánh Giá Năng Lực Bộ Quốc Phòng / Quân Đội (QDA 2027)",
        "category": "dgnl_vact_bca",
        "groupName": "Kỳ thi ĐGNL Quân Đội",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-ITEM-49",
        "instructor": "EMPIRE TEAM — CHUYÊN LUYỆN THI KHỐI QUÂN ĐỘI",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Kỳ thi ĐGNL Quân Đội",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1jNymOlAbD1sdzjKk6ijFzW6ZkB-IgvhI",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1jNymOlAbD1sdzjKk6ijFzW6ZkB-IgvhI",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: QDA - LUYỆN THI ĐÁNH GIÁ NĂNG LỰC EMPIRE (QUÂN ĐỘI)",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Luyện Thi Đánh Giá Năng Lực Bộ Quốc Phòng / Quân Đội (QDA 2027) do EMPIRE TEAM — CHUYÊN LUYỆN THI KHỐI QUÂN ĐỘI giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Luyện Thi Đánh Giá Năng Lực Bộ Quốc Phòng / Quân Đội (QDA 2027)",
        "categories": [
            "dgnl_vact_bca",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-50",
        "code": "DVC50",
        "title": "Khóa Luyện Thi Đánh Giá Đầu Vào Đại Học Trên Máy Tính (VSAT 2027)",
        "category": "dgnl_vact_bca",
        "groupName": "Kỳ thi ĐGNL VSAT",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-ITEM-50",
        "instructor": "EMPIRE TEAM — CHUYÊN LUYỆN THI ĐẠI HỌC VSAT",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Kỳ thi ĐGNL VSAT",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1KhQ_bJA5IEjeWjS5fjrn8ZlA7u1p-xbc",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1KhQ_bJA5IEjeWjS5fjrn8ZlA7u1p-xbc",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: VSAT - LUYỆN THI ĐÁNH GIÁ NĂNG LỰC EMPIRE",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Luyện Thi Đánh Giá Đầu Vào Đại Học Trên Máy Tính (VSAT 2027) do EMPIRE TEAM — CHUYÊN LUYỆN THI ĐẠI HỌC VSAT giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Luyện Thi Đánh Giá Đầu Vào Đại Học Trên Máy Tính (VSAT 2027)",
        "categories": [
            "dgnl_vact_bca",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-52",
        "code": "DVC52",
        "title": "Khóa Luyện Thi THPTQG & Đại Học Môn Tiếng Trung Khối D04 — Trọng Tâm Ngữ Pháp & Luyện Đề",
        "category": "ngoai_ngu_khxh",
        "subCategory": "lop12_2k9",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9"
        ],
        "groupName": "Môn Tiếng Trung (HSK & Khối D04)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-TRUNG12-2K9",
        "instructor": "YANGDEXIN — LUYỆN THI ĐẠI HỌC KHỐI D04",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tiếng Trung (HSK & Khối D04)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1gPRIl66qnS55v7bIaE_VL-tGAyO6-7sf",
        "extraFolderIds": [
            "1HWMDgt6YFp_NfQ-y3GdsiATUC1magU6u",
            "1AvLbPix9Ahk4EMiqMYKJ9pZzxDugD6l6"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1gPRIl66qnS55v7bIaE_VL-tGAyO6-7sf",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Luyện Thi THPTQG & Đại Học Môn Tiếng Trung Khối D04 — Trọng Tâm Ngữ Pháp & Luyện Đề",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Luyện Thi THPTQG & Đại Học Môn Tiếng Trung Khối D04 — Trọng Tâm Ngữ Pháp & Luyện Đề do YANGDEXIN — LUYỆN THI ĐẠI HỌC KHỐI D04 giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Luyện Thi THPTQG & Đại Học Môn Tiếng Trung Khối D04 — Trọng Tâm Ngữ Pháp & Luyện Đề",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-02",
        "code": "DVC02",
        "title": "Khóa Toán 12 (2K9) — Lộ Trình Toàn Diện THPTQG 2027 (Khóa I & M)",
        "category": "lop12_2k9",
        "groupName": "Môn Toán 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9",
        "instructor": "MAPSTUDY — TỔ TOÁN THPTQG",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Toán 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1a78wwvHogORJpW2qKWsveK4yMeorJEDg",
        "extraFolderIds": [
            "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1a78wwvHogORJpW2qKWsveK4yMeorJEDg",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TOÁN TỔ TOÁN MAPSTUDY 2K9 THPTQG 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Toán 12 (2K9) — Lộ Trình Toàn Diện THPTQG 2027 (Khóa I & M) do MAPSTUDY — TỔ TOÁN THPTQG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Toán 12 (2K9) — Lộ Trình Toàn Diện THPTQG 2027 (Khóa I & M)",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-03",
        "code": "DVC03",
        "title": "Khóa Toán 12 (2K9) — Xuất Phát Sớm (XPS) Toán 12 SMART 2027",
        "category": "lop12_2k9",
        "groupName": "Môn Toán 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9",
        "instructor": "THẦY NGUYỄN PHAN TIẾN — KHOÁ SMART",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Toán 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "13NIwvnmeb37PpkHI7dmxdZh3of9ewPuF",
        "extraFolderIds": [
            "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/13NIwvnmeb37PpkHI7dmxdZh3of9ewPuF",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TOÁN THẦY NGUYỄN PHAN TIẾN 2K9 - XPS Toán 12 Khoá SMART 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Toán 12 (2K9) — Xuất Phát Sớm (XPS) Toán 12 SMART 2027 do THẦY NGUYỄN PHAN TIẾN — KHOÁ SMART giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Toán 12 (2K9) — Xuất Phát Sớm (XPS) Toán 12 SMART 2027",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-04",
        "code": "DVC04",
        "title": "Khóa Toán 12 (2K9) — Xuất Phát Sớm (XPS) Chinh Phục 9+ Toán 2027",
        "category": "lop12_2k9",
        "groupName": "Môn Toán 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9",
        "instructor": "ANH SHIPPER TOÁN — KHOÁ TRÙM 12A3",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Toán 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1DkG2NQLQ5egWATE7s_HxWheA7twDMCzE",
        "extraFolderIds": [
            "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1DkG2NQLQ5egWATE7s_HxWheA7twDMCzE",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TOÁN ANH SHIPPER TOÁN 2K9 - XPS Khoá Trùm 12A3 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Toán 12 (2K9) — Xuất Phát Sớm (XPS) Chinh Phục 9+ Toán 2027 do ANH SHIPPER TOÁN — KHOÁ TRÙM 12A3 giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Toán 12 (2K9) — Xuất Phát Sớm (XPS) Chinh Phục 9+ Toán 2027",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-05",
        "code": "DVC05",
        "title": "Khóa Nền Tảng 12 Môn Toán 2027 — Bám Sát Chương Trình Mới",
        "category": "lop12_2k9",
        "groupName": "Môn Toán 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9",
        "instructor": "HOCMAI — HỆ THỐNG GIÁO DỤC NỀN TẢNG",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Toán 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "14Vsk6-lsb-Nary5wbDpdWvyKc5pne3Ke",
        "extraFolderIds": [
            "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/14Vsk6-lsb-Nary5wbDpdWvyKc5pne3Ke",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: NỀN TẢNG 12 MÔN TOÁN 2027 HOCMAI",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Nền Tảng 12 Môn Toán 2027 — Bám Sát Chương Trình Mới do HOCMAI — HỆ THỐNG GIÁO DỤC NỀN TẢNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Nền Tảng 12 Môn Toán 2027 — Bám Sát Chương Trình Mới",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-06",
        "code": "DVC06",
        "title": "Khóa Chuyên Đề Toán 12 & Luyện Tư Duy Vận Dụng Cao (TMT)",
        "category": "lop12_2k9",
        "groupName": "Môn Toán 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9",
        "instructor": "TMT EDUCATION — THẦY HUY HƯỚNG NỘI",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Toán 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "104Fz0TA9cLZJy4NAAxPwGCP29IKTlR0g",
        "extraFolderIds": [
            "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/104Fz0TA9cLZJy4NAAxPwGCP29IKTlR0g",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: GIÁO VIÊN HUY HƯỚNG NỘI - 2K8 - TMT2026 - KHÓA CHUYÊN ĐỀ",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Chuyên Đề Toán 12 & Luyện Tư Duy Vận Dụng Cao (TMT) do TMT EDUCATION — THẦY HUY HƯỚNG NỘI giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Chuyên Đề Toán 12 & Luyện Tư Duy Vận Dụng Cao (TMT)",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-07",
        "code": "DVC07",
        "title": "Khóa Chuyên Đề Các Bài Toán Thực Tế & Mô Hình Hóa Toán 12",
        "category": "lop12_2k9",
        "groupName": "Môn Toán 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9",
        "instructor": "TOÁN THỰC TẾ LXO — BAN GIẢNG HUẤN LXO",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Toán 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "14Ab28ONGVYGeJuoT5Ga5Q-R5LyiSCsyB",
        "extraFolderIds": [
            "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/14Ab28ONGVYGeJuoT5Ga5Q-R5LyiSCsyB",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TOÁN LXO - 2K8 - CÁC BUỔI HỌC VỀ TOÁN THỰC TẾ",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Chuyên Đề Các Bài Toán Thực Tế & Mô Hình Hóa Toán 12 do TOÁN THỰC TẾ LXO — BAN GIẢNG HUẤN LXO giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Chuyên Đề Các Bài Toán Thực Tế & Mô Hình Hóa Toán 12",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-09",
        "code": "DVC09",
        "title": "Khóa Vật Lý 12 (2K9) — Xuất Phát Sớm (XPS) Chinh Phục 9+ Vật Lý 12",
        "category": "lop12_2k9",
        "groupName": "Môn Vật Lý 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-LY12-2K9",
        "instructor": "IPCLASS — THẦY THẮNG & THẦY TIẾN",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Vật Lý 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1AT0VRyByh3si-wZPqPbpToyn4I21FOzJ",
        "extraFolderIds": [
            "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1AT0VRyByh3si-wZPqPbpToyn4I21FOzJ",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: LÝ THẦY THẮNG, THẦY TIẾN IPCLASS 2K9 - XPS Chinh phục 9+ Vật lý 12",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Vật Lý 12 (2K9) — Xuất Phát Sớm (XPS) Chinh Phục 9+ Vật Lý 12 do IPCLASS — THẦY THẮNG & THẦY TIẾN giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Vật Lý 12 (2K9) — Xuất Phát Sớm (XPS) Chinh Phục 9+ Vật Lý 12",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-10",
        "code": "DVC10",
        "title": "Khóa Vật Lý 12 (2K9) — Full Lộ Trình Xuất Phát Sớm (XPS) 2027",
        "category": "lop12_2k9",
        "groupName": "Môn Vật Lý 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-LY12-2K9",
        "instructor": "TENSCHOOL — THẦY LÊ TÙNG ƯNG",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Vật Lý 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1oVB8UTCvVOTGrMFKp4HdIt1k8MwolyTq",
        "extraFolderIds": [
            "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1oVB8UTCvVOTGrMFKp4HdIt1k8MwolyTq",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: LÝ THẦY LÊ TÙNG ƯNG TENS 2K9 - Full lộ trình XPS Vật lý 12 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Vật Lý 12 (2K9) — Full Lộ Trình Xuất Phát Sớm (XPS) 2027 do TENSCHOOL — THẦY LÊ TÙNG ƯNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Vật Lý 12 (2K9) — Full Lộ Trình Xuất Phát Sớm (XPS) 2027",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-11",
        "code": "DVC11",
        "title": "Khóa Vật Lý 12 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) Vật Lý 2027",
        "category": "lop12_2k9",
        "groupName": "Môn Vật Lý 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-LY12-2K9",
        "instructor": "SANGSANG EDU — THẦY VŨ TUẤN ANH",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Vật Lý 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1ckMsAluzK_gHMHb-z6VjYZS22MEmKFwg",
        "extraFolderIds": [
            "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1ckMsAluzK_gHMHb-z6VjYZS22MEmKFwg",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: LÝ THẦY VŨ TUẤN ANH SANGSANG 2K9 - XPS Vật lý 12 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Vật Lý 12 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) Vật Lý 2027 do SANGSANG EDU — THẦY VŨ TUẤN ANH giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Vật Lý 12 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) Vật Lý 2027",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-12",
        "code": "DVC12",
        "title": "Khóa Nền Tảng 12 Môn Vật Lý 2027 — Toàn Diện Kiến Thức SGK Mới",
        "category": "lop12_2k9",
        "groupName": "Môn Vật Lý 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-LY12-2K9",
        "instructor": "HOCMAI — HỆ THỐNG GIÁO DỤC NỀN TẢNG",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Vật Lý 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1pXv3a7zgk2H-Jrm1HtgzRKTF1F8Pl_yc",
        "extraFolderIds": [
            "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1pXv3a7zgk2H-Jrm1HtgzRKTF1F8Pl_yc",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Z. NỀN TẢNG 12 MÔN VẬT LÝ 2027 HOCMAI",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Nền Tảng 12 Môn Vật Lý 2027 — Toàn Diện Kiến Thức SGK Mới do HOCMAI — HỆ THỐNG GIÁO DỤC NỀN TẢNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Nền Tảng 12 Môn Vật Lý 2027 — Toàn Diện Kiến Thức SGK Mới",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-14",
        "code": "DVC14",
        "title": "Khóa Hóa Học 12 (2K9) — Trọn Bộ Lộ Trình IOME Hóa Học 2027",
        "category": "lop12_2k9",
        "groupName": "Môn Hóa Học 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-HOA12-2K9",
        "instructor": "NAP EDUCATION — THẦY NGUYỄN ANH PHONG",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Hóa Học 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "17YG-JmPDC6B_0xJtkDNiRiYPZh7oxdNu",
        "extraFolderIds": [
            "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/17YG-JmPDC6B_0xJtkDNiRiYPZh7oxdNu",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: HÓA THẦY NGUYỄN ANH PHONG 2K9 - Trọn Bộ Lộ Trình IOME 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Hóa Học 12 (2K9) — Trọn Bộ Lộ Trình IOME Hóa Học 2027 do NAP EDUCATION — THẦY NGUYỄN ANH PHONG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Hóa Học 12 (2K9) — Trọn Bộ Lộ Trình IOME Hóa Học 2027",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-15",
        "code": "DVC15",
        "title": "Khóa Hóa Học 12 (2K9) — Trọn Bộ Lộ Trình CTG Chinh Phục Hóa 12",
        "category": "lop12_2k9",
        "groupName": "Môn Hóa Học 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-HOA12-2K9",
        "instructor": "SANGSANG EDU — THẦY PHẠM VĂN THUẬN",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Hóa Học 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1nT5OCuM2fsZ99XVkLzEuRoonpPrBxUU1",
        "extraFolderIds": [
            "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1nT5OCuM2fsZ99XVkLzEuRoonpPrBxUU1",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: HOÁ THẦY PHẠM VĂN THUẬN SANGSANG - Trọn Bộ Lộ Trình CTG 2K9",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Hóa Học 12 (2K9) — Trọn Bộ Lộ Trình CTG Chinh Phục Hóa 12 do SANGSANG EDU — THẦY PHẠM VĂN THUẬN giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Hóa Học 12 (2K9) — Trọn Bộ Lộ Trình CTG Chinh Phục Hóa 12",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-16",
        "code": "DVC16",
        "title": "Khóa Hóa Học 12 — Chuyên Đề Trọng Tâm & Luyện Đề Thực Chiến",
        "category": "lop12_2k9",
        "groupName": "Môn Hóa Học 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-HOA12-2K9",
        "instructor": "TYHH — THẦY PHẠM THANH TÙNG",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Hóa Học 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1rvjxRmI_pSmvflpJfl3lUMS_QeOaTFfV",
        "extraFolderIds": [
            "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1rvjxRmI_pSmvflpJfl3lUMS_QeOaTFfV",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: HÓA THẦY PHẠM THANH TÙNG 2K8",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Hóa Học 12 — Chuyên Đề Trọng Tâm & Luyện Đề Thực Chiến do TYHH — THẦY PHẠM THANH TÙNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Hóa Học 12 — Chuyên Đề Trọng Tâm & Luyện Đề Thực Chiến",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-18",
        "code": "DVC18",
        "title": "Khóa TopUni Nền Tảng 12 — Môn Toán Lộ Trình 2027",
        "category": "lop12_2k9",
        "groupName": "TopUni Lớp 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9",
        "instructor": "HOCMAI TOPUNI — BAN GIẢNG HUẤN TOÁN",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "TopUni Lớp 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1sKwBrvFNSAF95XUHmAIRuGUaFYb9fFSu",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1sKwBrvFNSAF95XUHmAIRuGUaFYb9fFSu",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: NỀN TẢNG 12 MÔN TOÁN 2027 HOCMAI",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa TopUni Nền Tảng 12 — Môn Toán Lộ Trình 2027 do HOCMAI TOPUNI — BAN GIẢNG HUẤN TOÁN giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa TopUni Nền Tảng 12 — Môn Toán Lộ Trình 2027",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-19",
        "code": "DVC19",
        "title": "Khóa TopUni Nền Tảng 12 — Môn Toán (Bản Đầy Đủ Chuyên Đề)",
        "category": "lop12_2k9",
        "groupName": "TopUni Lớp 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9",
        "instructor": "HOCMAI TOPUNI — BAN GIẢNG HUẤN TOÁN",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "TopUni Lớp 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1SQ-uZI5-tEh6vAzbcECq3lMBnv-WHoIj",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1SQ-uZI5-tEh6vAzbcECq3lMBnv-WHoIj",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: NỀN TẢNG 12 MÔN TOÁN 2026 HOCMAI",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa TopUni Nền Tảng 12 — Môn Toán (Bản Đầy Đủ Chuyên Đề) do HOCMAI TOPUNI — BAN GIẢNG HUẤN TOÁN giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa TopUni Nền Tảng 12 — Môn Toán (Bản Đầy Đủ Chuyên Đề)",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-20",
        "code": "DVC20",
        "title": "Khóa TopUni Nền Tảng 12 — Môn Ngữ Văn Đọc Hiểu & Nghị Luận",
        "category": "lop12_2k9",
        "groupName": "Môn Ngữ Văn 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-VAN12-2K9",
        "instructor": "HOCMAI TOPUNI — BAN GIẢNG HUẤN NGỮ VĂN",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "TopUni Lớp 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1DnhTPq6VL79T2nDyqtL13G5dyi_K0Yx3",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1DnhTPq6VL79T2nDyqtL13G5dyi_K0Yx3",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: NỀN TẢNG 12 MÔN NGỮ VĂN HOCMAI",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa TopUni Nền Tảng 12 — Môn Ngữ Văn Đọc Hiểu & Nghị Luận do HOCMAI TOPUNI — BAN GIẢNG HUẤN NGỮ VĂN giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa TopUni Nền Tảng 12 — Môn Ngữ Văn Đọc Hiểu & Nghị Luận",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9"
        ],
        "subCategory": "ngoai_ngu_khxh"
    },
    {
        "id": "COURSE-ITEM-21",
        "code": "DVC21",
        "title": "Khóa TopUni Nền Tảng 12 — Môn Tiếng Anh Ngữ Pháp & Từ Vựng",
        "category": "lop12_2k9",
        "groupName": "Môn Tiếng Anh 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-ANH12-2K9",
        "instructor": "HOCMAI TOPUNI — BAN GIẢNG HUẤN TIẾNG ANH",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "TopUni Lớp 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1N9Ge80PeZiLBts5Udb8h0g0X8-Rtx9mE",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1N9Ge80PeZiLBts5Udb8h0g0X8-Rtx9mE",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: NỀN TẢNG 12 MÔN TIẾNG ANH 2026 HOCMAI",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa TopUni Nền Tảng 12 — Môn Tiếng Anh Ngữ Pháp & Từ Vựng do HOCMAI TOPUNI — BAN GIẢNG HUẤN TIẾNG ANH giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa TopUni Nền Tảng 12 — Môn Tiếng Anh Ngữ Pháp & Từ Vựng",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9"
        ],
        "subCategory": "ngoai_ngu_khxh"
    },
    {
        "id": "COURSE-ITEM-22",
        "code": "DVC22",
        "title": "Khóa TopUni Nền Tảng 12 — Môn Vật Lý Chuyên Đề Trọng Tâm",
        "category": "lop12_2k9",
        "groupName": "TopUni Lớp 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-LY12-2K9",
        "instructor": "HOCMAI TOPUNI — BAN GIẢNG HUẤN VẬT LÝ",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "TopUni Lớp 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1rvyHSojdbe__C26Jj4xB5toinNJRZTEc",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1rvyHSojdbe__C26Jj4xB5toinNJRZTEc",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: NỀN TẢNG 12 MÔN VẬT LÝ 2026 HOCMAI",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa TopUni Nền Tảng 12 — Môn Vật Lý Chuyên Đề Trọng Tâm do HOCMAI TOPUNI — BAN GIẢNG HUẤN VẬT LÝ giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa TopUni Nền Tảng 12 — Môn Vật Lý Chuyên Đề Trọng Tâm",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-23",
        "code": "DVC23",
        "title": "Khóa TopUni Nền Tảng 12 — Môn Hóa Học Lý Thuyết & Bài Tập",
        "category": "lop12_2k9",
        "groupName": "TopUni Lớp 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-HOA12-2K9",
        "instructor": "HOCMAI TOPUNI — BAN GIẢNG HUẤN HÓA HỌC",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "TopUni Lớp 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1IgDvAyUK1UN6W5jqXWgPVML1cUS_vA0N",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1IgDvAyUK1UN6W5jqXWgPVML1cUS_vA0N",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: NỀN TẢNG 12 MÔN HÓA HỌC 2026 HOCMAI",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa TopUni Nền Tảng 12 — Môn Hóa Học Lý Thuyết & Bài Tập do HOCMAI TOPUNI — BAN GIẢNG HUẤN HÓA HỌC giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa TopUni Nền Tảng 12 — Môn Hóa Học Lý Thuyết & Bài Tập",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-24",
        "code": "DVC24",
        "title": "Khóa TopUni Nền Tảng 12 — Môn Sinh Học Di Truyền & Sinh Thái",
        "category": "lop12_2k9",
        "groupName": "Môn Sinh Học 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-SINH12-2K9",
        "instructor": "HOCMAI TOPUNI — BAN GIẢNG HUẤN SINH HỌC",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "TopUni Lớp 12 (2K9)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1OOZzym1p9C-MrlY43ugcWxoMu2ej1sOi",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1OOZzym1p9C-MrlY43ugcWxoMu2ej1sOi",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: NỀN TẢNG 12 MÔN SINH HỌC 2026 HOCMAI",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa TopUni Nền Tảng 12 — Môn Sinh Học Di Truyền & Sinh Thái do HOCMAI TOPUNI — BAN GIẢNG HUẤN SINH HỌC giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa TopUni Nền Tảng 12 — Môn Sinh Học Di Truyền & Sinh Thái",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop12_2k9"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-25",
        "code": "DVC25",
        "title": "Khóa Toán 11 (2K10) — Xuất Phát Sớm & Làm Chủ Toán 11 Lộ Trình 2027",
        "category": "lop11_2k10",
        "groupName": "Môn Toán 11 (2K10)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-TOAN11-2K10",
        "instructor": "TENSCHOOL — THẦY ĐỖ VĂN ĐỨC",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Toán 11 (2K10)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1LkFNHipHxp2R3aUVVoC4uGMFxGsBXh1u",
        "extraFolderIds": [
            "1CbMUKPhYMX12UmVAfsQAkpe8KnciWSlP"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1LkFNHipHxp2R3aUVVoC4uGMFxGsBXh1u",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TOÁN 11 2027 THẦY ĐỖ VĂN ĐỨC TENSCHOOL 2K10",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Toán 11 (2K10) — Xuất Phát Sớm & Làm Chủ Toán 11 Lộ Trình 2027 do TENSCHOOL — THẦY ĐỖ VĂN ĐỨC giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Toán 11 (2K10) — Xuất Phát Sớm & Làm Chủ Toán 11 Lộ Trình 2027",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop11_2k10"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-26",
        "code": "DVC26",
        "title": "Khóa Toán 11 (2K10) — Định Hướng Ôn Thi TN THPT, ĐGNL & ĐGTD 2027",
        "category": "lop11_2k10",
        "groupName": "Môn Toán 11 (2K10)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-TOAN11-2K10",
        "instructor": "TUYENSINH247 [S1+] — THẦY QUÂN",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Toán 11 (2K10)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1a1MHroAuK48kOyp_jhfqHc_yJc8pcFdU",
        "extraFolderIds": [
            "1CbMUKPhYMX12UmVAfsQAkpe8KnciWSlP"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1a1MHroAuK48kOyp_jhfqHc_yJc8pcFdU",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: [S1+] Thầy Quân - Định hướng ôn thi TN THPT, ĐGNL, ĐGTD môn Toán cho học sinh lớp 11 - 2027 Tuyensinh247",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Toán 11 (2K10) — Định Hướng Ôn Thi TN THPT, ĐGNL & ĐGTD 2027 do TUYENSINH247 [S1+] — THẦY QUÂN giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Toán 11 (2K10) — Định Hướng Ôn Thi TN THPT, ĐGNL & ĐGTD 2027",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop11_2k10"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-27",
        "code": "DVC27",
        "title": "Khóa Vật Lý 11 (2K10) — Lộ Trình Chuyên Sâu Vật Lý 11 Năm 2027",
        "category": "lop11_2k10",
        "groupName": "Môn Vật Lý 11 (2K10)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-LY11-2K10",
        "instructor": "THẦY VŨ HOÀNG QUÂN — VẬT LÝ 2K10",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Vật Lý 11 (2K10)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1fYdD_xs_0PF63h0KBo384V0iqQ9cCs00",
        "extraFolderIds": [
            "134iDRuiFnuSlRFGC07o0qI8YC-1gMrIL"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1fYdD_xs_0PF63h0KBo384V0iqQ9cCs00",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: LÝ 11 2027 THẦY VŨ HOÀNG QUÂN 2K10",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Vật Lý 11 (2K10) — Lộ Trình Chuyên Sâu Vật Lý 11 Năm 2027 do THẦY VŨ HOÀNG QUÂN — VẬT LÝ 2K10 giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Vật Lý 11 (2K10) — Lộ Trình Chuyên Sâu Vật Lý 11 Năm 2027",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop11_2k10"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-28",
        "code": "DVC28",
        "title": "Khóa Vật Lý 11 (2K10) — Chương Trình Cơ Bản & Nâng Cao 2027",
        "category": "lop11_2k10",
        "groupName": "Môn Vật Lý 11 (2K10)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-LY11-2K10",
        "instructor": "TUYENSINH247 — THẦY LONG VẬT LÝ",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Vật Lý 11 (2K10)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1pMs32OQ3J9N7R9MJ-cT9fI_CNwu2crzC",
        "extraFolderIds": [
            "134iDRuiFnuSlRFGC07o0qI8YC-1gMrIL"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1pMs32OQ3J9N7R9MJ-cT9fI_CNwu2crzC",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Thầy Long - Cơ bản & Nâng cao Vật Lí 11 - 2027 Tuyensinh247",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Vật Lý 11 (2K10) — Chương Trình Cơ Bản & Nâng Cao 2027 do TUYENSINH247 — THẦY LONG VẬT LÝ giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Vật Lý 11 (2K10) — Chương Trình Cơ Bản & Nâng Cao 2027",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop11_2k10"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-29",
        "code": "DVC29",
        "title": "Khóa Luyện Đề Thi Học Kỳ Vật Lý 11 (Có Video & Lời Giải Chi Tiết)",
        "category": "lop11_2k10",
        "groupName": "Môn Vật Lý 11 (2K10)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-LY11-2K10",
        "instructor": "TUYENSINH247 [S+] — BAN GIẢNG HUẤN VẬT LÝ",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Vật Lý 11 (2K10)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1Xqa29h4pGAHp4RNs_i-YpRT_NkEuYzyO",
        "extraFolderIds": [
            "134iDRuiFnuSlRFGC07o0qI8YC-1gMrIL"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Xqa29h4pGAHp4RNs_i-YpRT_NkEuYzyO",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: [S+] Đề thi học kì Vật Lí 11 (Có lời giải chi tiết) - 2027 Tuyensinh247",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Luyện Đề Thi Học Kỳ Vật Lý 11 (Có Video & Lời Giải Chi Tiết) do TUYENSINH247 [S+] — BAN GIẢNG HUẤN VẬT LÝ giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Luyện Đề Thi Học Kỳ Vật Lý 11 (Có Video & Lời Giải Chi Tiết)",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop11_2k10"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-30",
        "code": "DVC30",
        "title": "Khóa Hóa Học 11 (2K10) — Lớp Tương Tác Trực Tuyến Bứt Phá Điểm 9+",
        "category": "lop11_2k10",
        "groupName": "Môn Hóa Học 11 (2K10)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-HOA11-2K10",
        "instructor": "HOCMAI — CÔ DƯƠNG & CÔ HUỆ",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Hóa Học 11 (2K10)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1IMhlEE-CyVyEd9nAn9bgkJMJpih1GZR3",
        "extraFolderIds": [
            "1CL2S35nzQS7qkXKck9c_efHX-aS87v-a"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1IMhlEE-CyVyEd9nAn9bgkJMJpih1GZR3",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: HOÁ 11 2027 LỚP TƯƠNG TÁC CÔ DƯƠNG, CÔ HUỆ HOCMAI 2K10",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Hóa Học 11 (2K10) — Lớp Tương Tác Trực Tuyến Bứt Phá Điểm 9+ do HOCMAI — CÔ DƯƠNG & CÔ HUỆ giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Hóa Học 11 (2K10) — Lớp Tương Tác Trực Tuyến Bứt Phá Điểm 9+",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop11_2k10"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-31",
        "code": "DVC31",
        "title": "Khóa Hóa Học 11 (2K10) — Chương Trình Cơ Bản & Nâng Cao 2027",
        "category": "lop11_2k10",
        "groupName": "Môn Hóa Học 11 (2K10)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-HOA11-2K10",
        "instructor": "TUYENSINH247 — THẦY TÙNG HÓA HỌC",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Hóa Học 11 (2K10)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1yqY8yEuScOXifRPqjuTvAC8yfvPa1XTP",
        "extraFolderIds": [
            "1CL2S35nzQS7qkXKck9c_efHX-aS87v-a"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1yqY8yEuScOXifRPqjuTvAC8yfvPa1XTP",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Thầy Tùng - Hóa 11 - Cơ bản và nâng cao - 2027 Tuyensinh247",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Hóa Học 11 (2K10) — Chương Trình Cơ Bản & Nâng Cao 2027 do TUYENSINH247 — THẦY TÙNG HÓA HỌC giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Hóa Học 11 (2K10) — Chương Trình Cơ Bản & Nâng Cao 2027",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "lop11_2k10"
        ],
        "subCategory": "khtn_toan_ly_hoa_sinh"
    },
    {
        "id": "COURSE-ITEM-32",
        "code": "DVC32",
        "title": "Khóa Tin Học 11 (2K10) — Định Hướng Tin Học Ứng Dụng 2027",
        "category": "lop11_2k10",
        "groupName": "Môn Tin Học 11 (2K10)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-TIN11-2K10",
        "instructor": "TUYENSINH247 [S1] — THẦY PHƯƠNG & CÔ DUNG",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tin Học 11 (2K10)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1dddCKyGFIG3o6NQokc8wMgS8fXArvvrt",
        "extraFolderIds": [
            "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1dddCKyGFIG3o6NQokc8wMgS8fXArvvrt",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: [S1] Thầy Phương, Cô Dung - Tin 11 - Tin học ứng dụng - 2027 Tuyensinh247",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Tin Học 11 (2K10) — Định Hướng Tin Học Ứng Dụng 2027 do TUYENSINH247 [S1] — THẦY PHƯƠNG & CÔ DUNG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Tin Học 11 (2K10) — Định Hướng Tin Học Ứng Dụng 2027",
        "categories": [
            "tinhoc_daihoc",
            "lop11_2k10"
        ],
        "subCategory": "tinhoc_daihoc"
    },
    {
        "id": "COURSE-ITEM-34",
        "code": "DVC34",
        "title": "Khóa Kỹ Năng Tin Học Văn Phòng Thực Chiến (Word · Excel · PowerPoint)",
        "category": "lop11_2k10",
        "groupName": "Môn Tin Học Văn Phòng & MOS",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP",
        "instructor": "HỌC VIỆN TIN HỌC — BAN GIẢNG HUẤN",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tin Học 11 (2K10)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm",
        "extraFolderIds": [
            "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TIN HỌC VĂN PHÒNG",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Kỹ Năng Tin Học Văn Phòng Thực Chiến (Word · Excel · PowerPoint) do HỌC VIỆN TIN HỌC — BAN GIẢNG HUẤN giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Kỹ Năng Tin Học Văn Phòng Thực Chiến (Word · Excel · PowerPoint)",
        "categories": [
            "tinhoc_daihoc",
            "lop11_2k10"
        ],
        "subCategory": "tinhoc_daihoc"
    },
    {
        "id": "COURSE-ITEM-36",
        "code": "DVC36",
        "title": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình XPS Chinh Phục ĐGNL ĐHQG Hà Nội",
        "category": "dgnl_hsa",
        "groupName": "ĐGNL HSA (ĐHQG Hà Nội)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-ITEM-36",
        "instructor": "MAPSTUDY — TỔ CHUYÊN MÔN HSA",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "ĐGNL HSA (ĐHQG Hà Nội)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1kNFMqYTAjNJNW3wl654OGvBdPzmgI_4R",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1kNFMqYTAjNJNW3wl654OGvBdPzmgI_4R",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: HSA MAPSTUDY 2K9 LUYỆN THI ĐGNL HÀ NỘI 2027 - XPS 2K9 HSA 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình XPS Chinh Phục ĐGNL ĐHQG Hà Nội do MAPSTUDY — TỔ CHUYÊN MÔN HSA giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình XPS Chinh Phục ĐGNL ĐHQG Hà Nội",
        "categories": [
            "dgnl_hsa",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-37",
        "code": "DVC37",
        "title": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình Toàn Diện & Phòng Luyện Đề HSA",
        "category": "dgnl_hsa",
        "groupName": "ĐGNL HSA (ĐHQG Hà Nội)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-ITEM-37",
        "instructor": "HOCMAI — GIẢI PHÁP TOÀN DIỆN HSA",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "ĐGNL HSA (ĐHQG Hà Nội)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1OSx2MVNua6QDZhJpV4XXyOhdgdYU4hjY",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1OSx2MVNua6QDZhJpV4XXyOhdgdYU4hjY",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: HSA HOCMAI 2K9 LUYỆN THI ĐGNL HÀ NỘI 2027 - Giải pháp toàn diện HSA, Phòng luyện 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình Toàn Diện & Phòng Luyện Đề HSA do HOCMAI — GIẢI PHÁP TOÀN DIỆN HSA giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình Toàn Diện & Phòng Luyện Đề HSA",
        "categories": [
            "dgnl_hsa",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-38",
        "code": "DVC38",
        "title": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình Tinh Hoa HSA TH01 ĐHQG Hà Nội",
        "category": "dgnl_hsa",
        "groupName": "ĐGNL HSA (ĐHQG Hà Nội)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-ITEM-38",
        "instructor": "HSA EDUCATION — TRUNG TÂM LUYỆN THI HSA",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "ĐGNL HSA (ĐHQG Hà Nội)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1iHYQQznkt6nt0IvvANe_tMzHUQ5pX9y-",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1iHYQQznkt6nt0IvvANe_tMzHUQ5pX9y-",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: HSA 2K9 HSA EDU 2027 - Khoá Tinh hoa HSA TH01",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình Tinh Hoa HSA TH01 ĐHQG Hà Nội do HSA EDUCATION — TRUNG TÂM LUYỆN THI HSA giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình Tinh Hoa HSA TH01 ĐHQG Hà Nội",
        "categories": [
            "dgnl_hsa",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-39",
        "code": "DVC39",
        "title": "Khóa TopUni Nền Tảng Toàn Diện Các Môn Bổ Trợ Kỳ Thi ĐGNL HSA",
        "category": "dgnl_hsa",
        "groupName": "ĐGNL HSA (ĐHQG Hà Nội)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-ITEM-39",
        "instructor": "HOCMAI TOPUNI — HỆ THỐNG BỔ TRỢ ĐGNL",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "ĐGNL HSA (ĐHQG Hà Nội)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TOPUNI NỀN TẢNG HOCMAI CÁC MÔN",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa TopUni Nền Tảng Toàn Diện Các Môn Bổ Trợ Kỳ Thi ĐGNL HSA do HOCMAI TOPUNI — HỆ THỐNG BỔ TRỢ ĐGNL giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa TopUni Nền Tảng Toàn Diện Các Môn Bổ Trợ Kỳ Thi ĐGNL HSA",
        "categories": [
            "dgnl_hsa",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-41",
        "code": "DVC41",
        "title": "Khóa ĐGTD TSA 2027 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) TSA Bách Khoa",
        "category": "dgtd_tsa",
        "groupName": "ĐGTD TSA (ĐH Bách Khoa)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGTD-TSA",
        "parentSubjectId": "COURSE-ITEM-41",
        "instructor": "TSA BMC — TRUNG TÂM LUYỆN THI ĐHBK HÀ NỘI",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "ĐGTD TSA (ĐH Bách Khoa)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1H7u21HeGVXEajKcPM6jr1IHPtNYBIudN",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1H7u21HeGVXEajKcPM6jr1IHPtNYBIudN",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TSA BMC 2K9 LUYỆN THI ĐÁNH GIÁ TƯ DUY ĐHBK HÀ NỘI 2027 - XPS 2K9 TSA 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa ĐGTD TSA 2027 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) TSA Bách Khoa do TSA BMC — TRUNG TÂM LUYỆN THI ĐHBK HÀ NỘI giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa ĐGTD TSA 2027 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) TSA Bách Khoa",
        "categories": [
            "dgtd_tsa",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-42",
        "code": "DVC42",
        "title": "Khóa ĐGTD TSA 2027 (2K9) — Lộ Trình Toàn Diện & Phòng Luyện Đề Bách Khoa",
        "category": "dgtd_tsa",
        "groupName": "ĐGTD TSA (ĐH Bách Khoa)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGTD-TSA",
        "parentSubjectId": "COURSE-ITEM-42",
        "instructor": "HOCMAI — GIẢI PHÁP TOÀN DIỆN TSA",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "ĐGTD TSA (ĐH Bách Khoa)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1OURnZBMt6QGB4AXIaXu23QGQPrqb_5F3",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1OURnZBMt6QGB4AXIaXu23QGQPrqb_5F3",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TSA HOCMAI 2K9 LUYỆN THI ĐÁNH GIÁ TƯ DUY ĐHBK HÀ NỘI 2027 - Giải pháp toàn diện TSA, Phòng luyện 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa ĐGTD TSA 2027 (2K9) — Lộ Trình Toàn Diện & Phòng Luyện Đề Bách Khoa do HOCMAI — GIẢI PHÁP TOÀN DIỆN TSA giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa ĐGTD TSA 2027 (2K9) — Lộ Trình Toàn Diện & Phòng Luyện Đề Bách Khoa",
        "categories": [
            "dgtd_tsa",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-43",
        "code": "DVC43",
        "title": "Khóa ĐGTD TSA 2027 — Full Lộ Trình SUN Chinh Phục ĐH Bách Khoa Hà Nội",
        "category": "dgtd_tsa",
        "groupName": "ĐGTD TSA (ĐH Bách Khoa)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGTD-TSA",
        "parentSubjectId": "COURSE-ITEM-43",
        "instructor": "TUYENSINH247 — HỆ THỐNG LỘ TRÌNH SUN",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "ĐGTD TSA (ĐH Bách Khoa)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1i9cK48wmHQFTPrLjnFheoHZ2Nto3tV2d",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1i9cK48wmHQFTPrLjnFheoHZ2Nto3tV2d",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TSA TUYENSINH247 2027 FULL LỘ TRÌNH SUN",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa ĐGTD TSA 2027 — Full Lộ Trình SUN Chinh Phục ĐH Bách Khoa Hà Nội do TUYENSINH247 — HỆ THỐNG LỘ TRÌNH SUN giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa ĐGTD TSA 2027 — Full Lộ Trình SUN Chinh Phục ĐH Bách Khoa Hà Nội",
        "categories": [
            "dgtd_tsa",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-44",
        "code": "DVC44",
        "title": "Khóa Bổ Trợ Tư Duy Toàn Diện Cho Kỳ Thi TSA · HSA · V-ACT 2027",
        "category": "dgtd_tsa",
        "groupName": "ĐGTD TSA (ĐH Bách Khoa)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGTD-TSA",
        "parentSubjectId": "COURSE-ITEM-44",
        "instructor": "TDMU EDUCATION — BAN GIẢNG HUẤN TƯ DUY",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "ĐGTD TSA (ĐH Bách Khoa)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "10n24IGM9Xylx3TvSJycc9X1ax5BVx-KX",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/10n24IGM9Xylx3TvSJycc9X1ax5BVx-KX",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: TSA BỔ TRỢ TSA - HSA - VACT TDMU 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Bổ Trợ Tư Duy Toàn Diện Cho Kỳ Thi TSA · HSA · V-ACT 2027 do TDMU EDUCATION — BAN GIẢNG HUẤN TƯ DUY giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa Bổ Trợ Tư Duy Toàn Diện Cho Kỳ Thi TSA · HSA · V-ACT 2027",
        "categories": [
            "dgtd_tsa",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-46",
        "code": "DVC46",
        "title": "Khóa ĐGNL V-ACT 2027 (2K9) — Lộ Trình XPS Chinh Phục ĐHQG TP.HCM",
        "category": "dgnl_vact_bca",
        "groupName": "ĐGNL V-ACT (ĐHQG TP.HCM)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGNL-VACT",
        "parentSubjectId": "COURSE-ITEM-46",
        "instructor": "MAPSTUDY — TỔ CHUYÊN MÔN V-ACT",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "ĐGNL V-ACT (ĐHQG TP.HCM)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "12c6aQKTlU3hiJcQD2ThFKbgWIkCzpqv6",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/12c6aQKTlU3hiJcQD2ThFKbgWIkCzpqv6",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: V-ACT MAPSTUDY 2K9 LUYỆN THI ĐÁNH GIÁ NĂNG LỰC TP.HCM 2027 - XPS 2K9 V-ACT 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa ĐGNL V-ACT 2027 (2K9) — Lộ Trình XPS Chinh Phục ĐHQG TP.HCM do MAPSTUDY — TỔ CHUYÊN MÔN V-ACT giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa ĐGNL V-ACT 2027 (2K9) — Lộ Trình XPS Chinh Phục ĐHQG TP.HCM",
        "categories": [
            "dgnl_vact_bca",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-47",
        "code": "DVC47",
        "title": "Khóa ĐGNL V-ACT 2027 (2K9) — Lộ Trình Toàn Diện & Phòng Luyện ĐHQG TP.HCM",
        "category": "dgnl_vact_bca",
        "groupName": "ĐGNL V-ACT (ĐHQG TP.HCM)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGNL-VACT",
        "parentSubjectId": "COURSE-ITEM-47",
        "instructor": "HOCMAI — GIẢI PHÁP TOÀN DIỆN V-ACT",
        "lessons": 45,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "ĐGNL V-ACT (ĐHQG TP.HCM)",
        "rating": 5.0,
        "students": "1.1k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1UQFg7cF1zuru0VMWqk4bn8XYd7gQnfIM",
        "extraFolderIds": [],
        "driveUrl": "https://drive.google.com/drive/folders/1UQFg7cF1zuru0VMWqk4bn8XYd7gQnfIM",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: V-ACT HOCMAI 2K9 LUYỆN THI ĐGNL TP.HCM 2027 - Giải pháp toàn diện V-ACT, Phòng luyện",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa ĐGNL V-ACT 2027 (2K9) — Lộ Trình Toàn Diện & Phòng Luyện ĐHQG TP.HCM do HOCMAI — GIẢI PHÁP TOÀN DIỆN V-ACT giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K",
        "isPackageOnly": false,
        "summary": "Khóa ĐGNL V-ACT 2027 (2K9) — Lộ Trình Toàn Diện & Phòng Luyện ĐHQG TP.HCM",
        "categories": [
            "dgnl_vact_bca",
            "lop12_2k9"
        ],
        "subCategory": "lop12_2k9"
    },
    {
        "id": "COURSE-ITEM-53",
        "code": "DVC53",
        "title": "Khóa Luyện Đề Thi Chứng Chỉ Quốc Tế HSK (HSK 1–6) & Ngữ Pháp Tiếng Trung Thực Chiến",
        "category": "ngoai_ngu_khxh",
        "subCategory": "lop12_2k9",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9"
        ],
        "groupName": "Môn Tiếng Trung (HSK & Khối D04)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-TRUNG12-2K9",
        "instructor": "YANGDEXIN — BỘ ĐỀ CHỨNG CHỈ QUỐC TẾ HSK",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tiếng Trung (HSK & Khối D04)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1YexRng8F1Cie0XvQ7EE_XfnCnnobQDle",
        "extraFolderIds": [
            "1NmkphCDWyXoVudrQqC_IIh5D1cUg6asR"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1YexRng8F1Cie0XvQ7EE_XfnCnnobQDle",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Luyện Đề Thi Chứng Chỉ Quốc Tế HSK (HSK 1–6) & Ngữ Pháp Tiếng Trung Thực Chiến",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Luyện Đề Thi Chứng Chỉ Quốc Tế HSK (HSK 1–6) & Ngữ Pháp Tiếng Trung Thực Chiến do YANGDEXIN — BỘ ĐỀ CHỨNG CHỈ QUỐC TẾ HSK giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Luyện Đề Thi Chứng Chỉ Quốc Tế HSK (HSK 1–6) & Ngữ Pháp Tiếng Trung Thực Chiến",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-54",
        "code": "DVC54",
        "title": "Khóa Tiếng Trung Chuyên Ngành Thương Mại, Giao Tiếp & Giáo Trình Hán Ngữ Bản Mới",
        "category": "ngoai_ngu_khxh",
        "subCategory": "tinhoc_daihoc",
        "categories": [
            "ngoai_ngu_khxh",
            "tinhoc_daihoc"
        ],
        "groupName": "Môn Tiếng Trung (HSK & Khối D04)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-TRUNG12-2K9",
        "instructor": "HANKA EDU & YANGDEXIN — TIẾNG TRUNG CHUYÊN NGÀNH",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tiếng Trung (HSK & Khối D04)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1KsS8slf4Y3J-dLOpHwPoaBEYMA_Xh7B8",
        "extraFolderIds": [
            "1Ow9j1hCrMG2TlVuNFgbDi3zarhr-zeQR",
            "1YpRMjWVBVZug4uryTq6FTMma0TZu0rFq"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1KsS8slf4Y3J-dLOpHwPoaBEYMA_Xh7B8",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Tiếng Trung Chuyên Ngành Thương Mại, Giao Tiếp & Giáo Trình Hán Ngữ Bản Mới",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Tiếng Trung Chuyên Ngành Thương Mại, Giao Tiếp & Giáo Trình Hán Ngữ Bản Mới do HANKA EDU & YANGDEXIN — TIẾNG TRUNG CHUYÊN NGÀNH giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Tiếng Trung Chuyên Ngành Thương Mại, Giao Tiếp & Giáo Trình Hán Ngữ Bản Mới",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-56",
        "code": "DVC56",
        "title": "Khóa Tổng Ôn Ngữ Văn & Tư Duy Định Tính Ngôn Ngữ Luyện Thi HSA · QDA · THPTQG 2027",
        "category": "ngoai_ngu_khxh",
        "subCategory": "dgnl_hsa",
        "categories": [
            "ngoai_ngu_khxh",
            "dgnl_hsa",
            "lop12_2k9"
        ],
        "groupName": "Môn Ngữ Văn 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-SUBJ-VAN12-2K9",
        "instructor": "HOCMAI — BAN GIẢNG HUẤN NGÔN NGỮ & VĂN HỌC",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Ngữ Văn 12 (2K9)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1Y76w1GLT9CSNGX5q0ER-uLua9eylB-Lz",
        "extraFolderIds": [
            "1DnhTPq6VL79T2nDyqtL13G5dyi_K0Yx3"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Y76w1GLT9CSNGX5q0ER-uLua9eylB-Lz",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Tổng Ôn Ngữ Văn & Tư Duy Định Tính Ngôn Ngữ Luyện Thi HSA · QDA · THPTQG 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Tổng Ôn Ngữ Văn & Tư Duy Định Tính Ngôn Ngữ Luyện Thi HSA · QDA · THPTQG 2027 do HOCMAI — BAN GIẢNG HUẤN NGÔN NGỮ & VĂN HỌC giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Tổng Ôn Ngữ Văn & Tư Duy Định Tính Ngôn Ngữ Luyện Thi HSA · QDA · THPTQG 2027",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-60",
        "code": "DVC60",
        "title": "Khóa Tổng Ôn Môn Sinh Học Luyện Thi ĐGNL HSA · QDA & Tốt Nghiệp THPT 2027",
        "category": "khtn_toan_ly_hoa_sinh",
        "subCategory": "dgnl_hsa",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "dgnl_hsa",
            "lop12_2k9"
        ],
        "groupName": "Môn Sinh Học 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-SUBJ-SINH12-2K9",
        "instructor": "HOCMAI — TỔ SINH HỌC ĐGNL & THPTQG",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Sinh Học 12 (2K9)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1CTrlYhRiXh7phi2qPwE3l_c2sOCsxS92",
        "extraFolderIds": [
            "1OOZzym1p9C-MrlY43ugcWxoMu2ej1sOi"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1CTrlYhRiXh7phi2qPwE3l_c2sOCsxS92",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Tổng Ôn Môn Sinh Học Luyện Thi ĐGNL HSA · QDA & Tốt Nghiệp THPT 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Tổng Ôn Môn Sinh Học Luyện Thi ĐGNL HSA · QDA & Tốt Nghiệp THPT 2027 do HOCMAI — TỔ SINH HỌC ĐGNL & THPTQG giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Tổng Ôn Môn Sinh Học Luyện Thi ĐGNL HSA · QDA & Tốt Nghiệp THPT 2027",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-61",
        "code": "DVC61",
        "title": "Khóa Tiếng Anh 12 (2K9) — Chinh Phục Dạng Bài True/False, Nối Câu & Đọc Điền Từ Chuẩn Form 2027",
        "category": "ngoai_ngu_khxh",
        "subCategory": "lop12_2k9",
        "categories": [
            "ngoai_ngu_khxh",
            "lop12_2k9",
            "dgnl_vact_bca"
        ],
        "groupName": "Môn Tiếng Anh 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-ANH12-2K9",
        "instructor": "EMPIRE TEAM — BAN GIẢNG HUẤN TIẾNG ANH",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tiếng Anh 12 (2K9)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1si7gRcqURbnbJMMiGiNwih-OzQhkQJJT",
        "extraFolderIds": [
            "1WlZvKRBm4CYRH7yohELZf0G1vcvSOwqe"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1si7gRcqURbnbJMMiGiNwih-OzQhkQJJT",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Tiếng Anh 12 (2K9) — Chinh Phục Dạng Bài True/False, Nối Câu & Đọc Điền Từ Chuẩn Form 2027",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Tiếng Anh 12 (2K9) — Chinh Phục Dạng Bài True/False, Nối Câu & Đọc Điền Từ Chuẩn Form 2027 do EMPIRE TEAM — BAN GIẢNG HUẤN TIẾNG ANH giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Tiếng Anh 12 (2K9) — Chinh Phục Dạng Bài True/False, Nối Câu & Đọc Điền Từ Chuẩn Form 2027",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-62",
        "code": "DVC62",
        "title": "Khóa Toán Học 12 — Chuyên Đề Hàm Số, Nguyên Hàm Tích Phân & Luyện Thi Đại Học VSAT",
        "category": "khtn_toan_ly_hoa_sinh",
        "subCategory": "dgnl_vact_bca",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "dgnl_vact_bca",
            "lop12_2k9"
        ],
        "groupName": "Môn Toán 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9",
        "instructor": "EMPIRE TEAM — TỔ TOÁN HỌC VSAT",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Toán 12 (2K9)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1VbW3pT-HmLO6HgpXV_1iih6y7JrFe5Cj",
        "extraFolderIds": [
            "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1VbW3pT-HmLO6HgpXV_1iih6y7JrFe5Cj",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Toán Học 12 — Chuyên Đề Hàm Số, Nguyên Hàm Tích Phân & Luyện Thi Đại Học VSAT",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Toán Học 12 — Chuyên Đề Hàm Số, Nguyên Hàm Tích Phân & Luyện Thi Đại Học VSAT do EMPIRE TEAM — TỔ TOÁN HỌC VSAT giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Toán Học 12 — Chuyên Đề Hàm Số, Nguyên Hàm Tích Phân & Luyện Thi Đại Học VSAT",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-63",
        "code": "DVC63",
        "title": "Khóa Vật Lý 12 — Chuyên Đề Cấu Trúc Vật Chất, Nhiệt Động Lực Học & Luyện Thi VSAT",
        "category": "khtn_toan_ly_hoa_sinh",
        "subCategory": "dgnl_vact_bca",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "dgnl_vact_bca",
            "lop12_2k9"
        ],
        "groupName": "Môn Vật Lý 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-SUBJ-LY12-2K9",
        "instructor": "EMPIRE TEAM — TỔ VẬT LÝ VSAT",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Vật Lý 12 (2K9)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1CAshsjgTtSA-QicoM95Z1N-Ghw4vdwwE",
        "extraFolderIds": [
            "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1CAshsjgTtSA-QicoM95Z1N-Ghw4vdwwE",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Vật Lý 12 — Chuyên Đề Cấu Trúc Vật Chất, Nhiệt Động Lực Học & Luyện Thi VSAT",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Vật Lý 12 — Chuyên Đề Cấu Trúc Vật Chất, Nhiệt Động Lực Học & Luyện Thi VSAT do EMPIRE TEAM — TỔ VẬT LÝ VSAT giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Vật Lý 12 — Chuyên Đề Cấu Trúc Vật Chất, Nhiệt Động Lực Học & Luyện Thi VSAT",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-64",
        "code": "DVC64",
        "title": "Khóa Hóa Học 12 — Chuyên Đề Ester, Carbohydrate, Pin Điện Phân & Luyện Thi VSAT",
        "category": "khtn_toan_ly_hoa_sinh",
        "subCategory": "dgnl_vact_bca",
        "categories": [
            "khtn_toan_ly_hoa_sinh",
            "dgnl_vact_bca",
            "lop12_2k9"
        ],
        "groupName": "Môn Hóa Học 12 (2K9)",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-SUBJ-HOA12-2K9",
        "instructor": "EMPIRE TEAM — TỔ HÓA HỌC VSAT",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Hóa Học 12 (2K9)",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1AQ0g_Yght0umoIcBJl826mVIqmZ9uBjA",
        "extraFolderIds": [
            "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1AQ0g_Yght0umoIcBJl826mVIqmZ9uBjA",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Hóa Học 12 — Chuyên Đề Ester, Carbohydrate, Pin Điện Phân & Luyện Thi VSAT",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Hóa Học 12 — Chuyên Đề Ester, Carbohydrate, Pin Điện Phân & Luyện Thi VSAT do EMPIRE TEAM — TỔ HÓA HỌC VSAT giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Hóa Học 12 — Chuyên Đề Ester, Carbohydrate, Pin Điện Phân & Luyện Thi VSAT",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-66",
        "code": "DVC66",
        "title": "Khóa Tuyệt Đỉnh Excel Từ Cơ Bản Đến Nâng Cao, Excel Pivot, Lập Báo Cáo Tài Chính & VBA",
        "category": "tinhoc_daihoc",
        "subCategory": "all",
        "categories": [
            "tinhoc_daihoc"
        ],
        "groupName": "Môn Tin Học Văn Phòng & MOS",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP",
        "instructor": "GITIHO & LAKITA — TUYỆT ĐỈNH EXCEL",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tin Học Văn Phòng & MOS",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1AIoZiaHVooBk7eq2BTjpVmJkPACMfpi4",
        "extraFolderIds": [
            "1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1AIoZiaHVooBk7eq2BTjpVmJkPACMfpi4",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Tuyệt Đỉnh Excel Từ Cơ Bản Đến Nâng Cao, Excel Pivot, Lập Báo Cáo Tài Chính & VBA",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Tuyệt Đỉnh Excel Từ Cơ Bản Đến Nâng Cao, Excel Pivot, Lập Báo Cáo Tài Chính & VBA do GITIHO & LAKITA — TUYỆT ĐỈNH EXCEL giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Tuyệt Đỉnh Excel Từ Cơ Bản Đến Nâng Cao, Excel Pivot, Lập Báo Cáo Tài Chính & VBA",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-67",
        "code": "DVC67",
        "title": "Khóa Tuyệt Đỉnh PowerPoint 2024 Chinh Phục Mọi Ánh Nhìn & Soạn Thảo Văn Bản Word 365 A-Z",
        "category": "tinhoc_daihoc",
        "subCategory": "all",
        "categories": [
            "tinhoc_daihoc"
        ],
        "groupName": "Môn Tin Học Văn Phòng & MOS",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP",
        "instructor": "GITIHO — THIẾT KẾ POWERPOINT & WORD 365",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tin Học Văn Phòng & MOS",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1N8TzciVJHxfG8Sa3qBqOSJraLKXTFDDc",
        "extraFolderIds": [
            "1pijb80HkEwE-APTf5ePbXim4xd2JfPNu",
            "1OZx0HEFLqENfm6qlUbNCgE5sP4-ql_MD",
            "1BcWAeM0zlnWpaZm4NIAWQ_7O8LWRaT6Q"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1N8TzciVJHxfG8Sa3qBqOSJraLKXTFDDc",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Tuyệt Đỉnh PowerPoint 2024 Chinh Phục Mọi Ánh Nhìn & Soạn Thảo Văn Bản Word 365 A-Z",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Tuyệt Đỉnh PowerPoint 2024 Chinh Phục Mọi Ánh Nhìn & Soạn Thảo Văn Bản Word 365 A-Z do GITIHO — THIẾT KẾ POWERPOINT & WORD 365 giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Tuyệt Đỉnh PowerPoint 2024 Chinh Phục Mọi Ánh Nhìn & Soạn Thảo Văn Bản Word 365 A-Z",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-68",
        "code": "DVC68",
        "title": "Khóa Làm Chủ Cơ Sở Dữ Liệu Microsoft Access Từ A-Z & Quản Lý Tiến Độ Dự Án MS Project",
        "category": "tinhoc_daihoc",
        "subCategory": "all",
        "categories": [
            "tinhoc_daihoc"
        ],
        "groupName": "Môn Tin Học Văn Phòng & MOS",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP",
        "instructor": "HỌC VIỆN DỮ LIỆU — MICROSOFT ACCESS & MS PROJECT",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tin Học Văn Phòng & MOS",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "18DklFNnU58J8amuZHsE_7fFIUUTcZVsL",
        "extraFolderIds": [
            "1Pz2ulBxVS93g_8hiDshiunitZLPWI4HA"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/18DklFNnU58J8amuZHsE_7fFIUUTcZVsL",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Làm Chủ Cơ Sở Dữ Liệu Microsoft Access Từ A-Z & Quản Lý Tiến Độ Dự Án MS Project",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Làm Chủ Cơ Sở Dữ Liệu Microsoft Access Từ A-Z & Quản Lý Tiến Độ Dự Án MS Project do HỌC VIỆN DỮ LIỆU — MICROSOFT ACCESS & MS PROJECT giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Làm Chủ Cơ Sở Dữ Liệu Microsoft Access Từ A-Z & Quản Lý Tiến Độ Dự Án MS Project",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-69",
        "code": "DVC69",
        "title": "Khóa Làm Chủ Google Spreadsheets, Google Workspace & Tự Động Hóa Gửi Email Apps Script",
        "category": "tinhoc_daihoc",
        "subCategory": "all",
        "categories": [
            "tinhoc_daihoc"
        ],
        "groupName": "Môn Tin Học Văn Phòng & MOS",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP",
        "instructor": "GOOGLE WORKSPACE & APPS SCRIPT ACADEMY",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Tin Học Văn Phòng & MOS",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1Aj6if850TExQl59BX726KwSkBrKTMFvA",
        "extraFolderIds": [
            "1dy5b31eEjENI_v4zzCSO28FfNfPxjVt_"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Aj6if850TExQl59BX726KwSkBrKTMFvA",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Làm Chủ Google Spreadsheets, Google Workspace & Tự Động Hóa Gửi Email Apps Script",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Làm Chủ Google Spreadsheets, Google Workspace & Tự Động Hóa Gửi Email Apps Script do GOOGLE WORKSPACE & APPS SCRIPT ACADEMY giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Làm Chủ Google Spreadsheets, Google Workspace & Tự Động Hóa Gửi Email Apps Script",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-70",
        "code": "DVC70",
        "title": "Khóa Combo Kỹ Năng Số: Thực Hành Truy Vấn SQL, Hàm Mảng Excel & Phân Tích Dữ Liệu",
        "category": "tinhoc_daihoc",
        "subCategory": "all",
        "categories": [
            "tinhoc_daihoc"
        ],
        "groupName": "Khối Đại Học & Kỹ Năng Số",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP",
        "instructor": "ĐIỆP VIÊN ACADEMY — KỸ NĂNG SỐ & DATA",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Khối Đại Học & Kỹ Năng Số",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1nC7Q2UXt01SgnkeD518XnlyDQTPXS1ZK",
        "extraFolderIds": [
            "1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1nC7Q2UXt01SgnkeD518XnlyDQTPXS1ZK",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Combo Kỹ Năng Số: Thực Hành Truy Vấn SQL, Hàm Mảng Excel & Phân Tích Dữ Liệu",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Combo Kỹ Năng Số: Thực Hành Truy Vấn SQL, Hàm Mảng Excel & Phân Tích Dữ Liệu do ĐIỆP VIÊN ACADEMY — KỸ NĂNG SỐ & DATA giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Combo Kỹ Năng Số: Thực Hành Truy Vấn SQL, Hàm Mảng Excel & Phân Tích Dữ Liệu",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-74",
        "code": "DVC74",
        "title": "Khóa Lý Thuyết Xác Suất Thống Kê Đại Học & Bí Quyết Viết CV Chinh Phục Nhà Tuyển Dụng",
        "category": "tinhoc_daihoc",
        "subCategory": "khtn_toan_ly_hoa_sinh",
        "categories": [
            "tinhoc_daihoc",
            "khtn_toan_ly_hoa_sinh"
        ],
        "groupName": "Môn Xác Suất Thống Kê Đại Học",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-DAIHOC-KTL",
        "instructor": "ĐIỆP VIÊN ACADEMY — TOÁN ĐẠI HỌC & HƯỚNG NGHIỆP",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Xác Suất Thống Kê Đại Học",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1QJxChXQQ9WMZQTInw_3Tged3PfHHRZHS",
        "extraFolderIds": [
            "1DCDFsT5EXtDKj7m_y-w6qR7c_rXgP7NW",
            "16mmqHcys3VeIGmPeD-Hw2lL5koWbPis_"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1QJxChXQQ9WMZQTInw_3Tged3PfHHRZHS",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Lý Thuyết Xác Suất Thống Kê Đại Học & Bí Quyết Viết CV Chinh Phục Nhà Tuyển Dụng",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Lý Thuyết Xác Suất Thống Kê Đại Học & Bí Quyết Viết CV Chinh Phục Nhà Tuyển Dụng do ĐIỆP VIÊN ACADEMY — TOÁN ĐẠI HỌC & HƯỚNG NGHIỆP giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Lý Thuyết Xác Suất Thống Kê Đại Học & Bí Quyết Viết CV Chinh Phục Nhà Tuyển Dụng",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-76",
        "code": "DVC76",
        "title": "Khóa Guitar Đệm Hát Trong 30 Ngày Từ A-Z & Đệm Hát Dòng Nhạc Bolero Nâng Cao",
        "category": "nghe_thuat",
        "subCategory": "all",
        "categories": [
            "nghe_thuat"
        ],
        "groupName": "Môn Nghệ Thuật & Âm Nhạc",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT",
        "instructor": "HỌC VIỆN GUITAR — ĐỆM HÁT 30 NGÀY & BOLERO",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Nghệ Thuật & Âm Nhạc",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1fbnrLKiCLnLX7eVPvrqg_kK56i3Fa3jS",
        "extraFolderIds": [
            "1ImYNmkGbp92_dXSAYq5lZiSVCJdwcFv1",
            "1euJQ8HZbo9rxOd2GrO1q2kIVwNgF6-CQ",
            "1ZfQkutEeGbU5H0XAlK0Vm6xCaDWT-g_B"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1fbnrLKiCLnLX7eVPvrqg_kK56i3Fa3jS",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Guitar Đệm Hát Trong 30 Ngày Từ A-Z & Đệm Hát Dòng Nhạc Bolero Nâng Cao",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Guitar Đệm Hát Trong 30 Ngày Từ A-Z & Đệm Hát Dòng Nhạc Bolero Nâng Cao do HỌC VIỆN GUITAR — ĐỆM HÁT 30 NGÀY & BOLERO giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Guitar Đệm Hát Trong 30 Ngày Từ A-Z & Đệm Hát Dòng Nhạc Bolero Nâng Cao",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-79",
        "code": "DVC79",
        "title": "Khóa Chinh Phục Đàn Ukulele Trong 7 Ngày Cùng Hiển Râu & Giáo Trình Ukulele All-In-One",
        "category": "nghe_thuat",
        "subCategory": "all",
        "categories": [
            "nghe_thuat"
        ],
        "groupName": "Môn Nghệ Thuật & Âm Nhạc",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT",
        "instructor": "HIỂN RÂU — GIÁO TRÌNH UKULELE TOÀN TẬP",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Nghệ Thuật & Âm Nhạc",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1CdKjrgfN8h0fSpadjVBS2uhJe8_4OBnZ",
        "extraFolderIds": [
            "1oXAEpmI_zNgLDAv6tUMDgnQWe7SAPdbp",
            "1R3EJy4TNB_IWQJHIwl1pQuIhZmz5bF3i"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1CdKjrgfN8h0fSpadjVBS2uhJe8_4OBnZ",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Chinh Phục Đàn Ukulele Trong 7 Ngày Cùng Hiển Râu & Giáo Trình Ukulele All-In-One",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Chinh Phục Đàn Ukulele Trong 7 Ngày Cùng Hiển Râu & Giáo Trình Ukulele All-In-One do HIỂN RÂU — GIÁO TRÌNH UKULELE TOÀN TẬP giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Chinh Phục Đàn Ukulele Trong 7 Ngày Cùng Hiển Râu & Giáo Trình Ukulele All-In-One",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-80",
        "code": "DVC80",
        "title": "Khóa Tự Học Thổi Sáo Trúc Trong 21 Ngày & Tự Học Kèn Harmonica Trong 15 Buổi",
        "category": "nghe_thuat",
        "subCategory": "all",
        "categories": [
            "nghe_thuat"
        ],
        "groupName": "Môn Nghệ Thuật & Âm Nhạc",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT",
        "instructor": "NHẠC CỤ DÂN TỘC & HARMONICA — SÁO TRÚC VIỆT NAM",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Nghệ Thuật & Âm Nhạc",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1MvkbnuiufNJT1_Wkl3bqIvKULjOki9Zc",
        "extraFolderIds": [
            "1xaVYzBaILI-mJHqHMLCVUF3ctfM3qz51",
            "1XoEXCi6BmSlMq62RVRfNtPFTdti_DzM1"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1MvkbnuiufNJT1_Wkl3bqIvKULjOki9Zc",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Tự Học Thổi Sáo Trúc Trong 21 Ngày & Tự Học Kèn Harmonica Trong 15 Buổi",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Tự Học Thổi Sáo Trúc Trong 21 Ngày & Tự Học Kèn Harmonica Trong 15 Buổi do NHẠC CỤ DÂN TỘC & HARMONICA — SÁO TRÚC VIỆT NAM giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Tự Học Thổi Sáo Trúc Trong 21 Ngày & Tự Học Kèn Harmonica Trong 15 Buổi",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-81",
        "code": "DVC81",
        "title": "Khóa Học DJ Online (Serato), Beatbox Biểu Diễn & Thu Âm Mix Vocal Trên Cubase / Nuendo",
        "category": "nghe_thuat",
        "subCategory": "all",
        "categories": [
            "nghe_thuat"
        ],
        "groupName": "Môn Nghệ Thuật & Âm Nhạc",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT",
        "instructor": "PRODUCER & DJ STUDIO — CUBASE, SERATO & BEATBOX",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Nghệ Thuật & Âm Nhạc",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1IQqV3bkc5zPShTuwqpX6ufP3mmOyzw2G",
        "extraFolderIds": [
            "18KWHTVMR5G9djqEerfwAmel3tdN-U5sP",
            "1sIURai13bq6OKagRRWZNTdh-VEDYYQEv",
            "15FflBoasTT6otpURG3wbrf2fNygw1_t1",
            "1UmxVqK3Om8HtZDC8EQ_NZ3sw-8wNgV44"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1IQqV3bkc5zPShTuwqpX6ufP3mmOyzw2G",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Học DJ Online (Serato), Beatbox Biểu Diễn & Thu Âm Mix Vocal Trên Cubase / Nuendo",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Học DJ Online (Serato), Beatbox Biểu Diễn & Thu Âm Mix Vocal Trên Cubase / Nuendo do PRODUCER & DJ STUDIO — CUBASE, SERATO & BEATBOX giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Học DJ Online (Serato), Beatbox Biểu Diễn & Thu Âm Mix Vocal Trên Cubase / Nuendo",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    },
    {
        "id": "COURSE-ITEM-82",
        "code": "DVC82",
        "title": "Khóa Học Nhảy Shuffle Dance Cơ Bản Cho Người Mới & Viết Giai Điệu Bài Hát Bằng Nhạc Beat",
        "category": "nghe_thuat",
        "subCategory": "all",
        "categories": [
            "nghe_thuat"
        ],
        "groupName": "Môn Nghệ Thuật & Âm Nhạc",
        "tier": "subject_69k",
        "tierLabel": "Gói Theo Môn / Lộ Trình (69k)",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT",
        "instructor": "VŨ ĐẠO & SÁNG TÁC — SHUFFLE DANCE & VIẾT NHẠC",
        "lessons": 50,
        "duration": "Full lộ trình 2027 · Video + PDF",
        "level": "Môn Nghệ Thuật & Âm Nhạc",
        "rating": 5.0,
        "students": "1.4k+",
        "price": 69000,
        "originalPrice": 250000,
        "badge": "Gói Lẻ 69K · Tặng App",
        "driveFolderId": "1gpSBFQSFIFIHbDzmQd_UrAACh7kgaTBM",
        "extraFolderIds": [
            "1n0BbtwuAy9CLZO7JILRlrZ2pstWKOc3N",
            "1aZMc6Ea-IPT79GkXksxjobZK3191vsYY"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1gpSBFQSFIFIHbDzmQd_UrAACh7kgaTBM",
        "defaultCover": "",
        "highlights": [
            "Mở khóa trực tiếp thư mục khóa học: Khóa Học Nhảy Shuffle Dance Cơ Bản Cho Người Mới & Viết Giai Điệu Bài Hát Bằng Nhạc Beat",
            "Tặng kèm App Điệp Viên Study có sẵn tài khoản là Email đăng ký (Khóa cố định 1 thiết bị)",
            "Học trực tiếp trên App & Google Drive với đầy đủ video bài giảng và tài liệu PDF"
        ],
        "description": "Khóa Học Nhảy Shuffle Dance Cơ Bản Cho Người Mới & Viết Giai Điệu Bài Hát Bằng Nhạc Beat do VŨ ĐẠO & SÁNG TÁC — SHUFFLE DANCE & VIẾT NHẠC giảng dạy. Đầy đủ video bài giảng, tài liệu PDF và đề luyện tập chuẩn cấu trúc 2027.",
        "summary": "Khóa Học Nhảy Shuffle Dance Cơ Bản Cho Người Mới & Viết Giai Điệu Bài Hát Bằng Nhạc Beat",
        "isPackageOnly": false,
        "subTier": "teacher_69k",
        "tierShortBadge": "THEO MÔN 69K"
    }
];

const COURSE_DRIVE_MAP = {
    "ALL-COURSES-399K": {
        "name": "Trọn Bộ Full 90+ Khóa Học Đa Môn (Toán · Văn · Anh · Trung · Lý · Hóa · Sinh · Sử · Địa · Tin MOS · Đại Học · Nghệ Thuật · ĐGNL)",
        "folderId": "1FaI2FGNRB4ERyEoYsPUQbJP80JcVpU52",
        "extraFolderIds": [
            "1ZmaGDNTMCJqEhWC2oB5vs21WDM__FV7N"
        ],
        "price": 399000,
        "tier": "full_399k",
        "parentCourseId": "ALL-COURSES-399K",
        "parentSubjectId": "ALL-COURSES-399K"
    },
    "COURSE-K9-LOP12": {
        "name": "Combo Khóa Học THPT Lớp 12 Cho 2K9 (Toán · Văn · Anh · Tiếng Trung · Lý · Hóa · Sinh · Sử · Địa · TopUni 12)",
        "folderId": "1Hx3C11lkdM5SKsavO2pqBdH0rEnk2wZo",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
            "1KhQ_bJA5IEjeWjS5fjrn8ZlA7u1p-xbc"
        ],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
    },
    "COURSE-NGOAINGU-TRUNG-ANH": {
        "name": "Combo Ngoại Ngữ & Xã Hội: Tiếng Trung (Hán Ngữ 1–6 · HSK · Khối D04) · Tiếng Anh · Ngữ Văn · Lịch Sử · Địa Lý",
        "folderId": "1AvLbPix9Ahk4EMiqMYKJ9pZzxDugD6l6",
        "extraFolderIds": [
            "1NmkphCDWyXoVudrQqC_IIh5D1cUg6asR",
            "1WlZvKRBm4CYRH7yohELZf0G1vcvSOwqe",
            "1DnhTPq6VL79T2nDyqtL13G5dyi_K0Yx3",
            "1Elh6X9_ISZATrvMTdRpGY7spYib-iZqe",
            "1zxzzbWG1Q97O9D5qAHmLNuUQIMPDiBwm"
        ],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-TRUNG12-2K9"
    },
    "COURSE-THVP-MOS-199K": {
        "name": "Combo 30 Khóa Tin Học Văn Phòng & Chứng Chỉ Quốc Tế MOS (Word · Excel · PowerPoint · Access · VBA · Google Tools)",
        "folderId": "1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm",
        "extraFolderIds": [
            "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq",
            "1nC7Q2UXt01SgnkeD518XnlyDQTPXS1ZK"
        ],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP"
    },
    "COURSE-DAIHOC-HOC-THUAT": {
        "name": "Combo Đại Học Điểm A+: Kinh Tế Lượng (EViews, Stata, SPSS) · Triết Học Mác-Lênin · Master BTL & NCKH APA 7 · SQL & Excel",
        "folderId": "1ZmaGDNTMCJqEhWC2oB5vs21WDM__FV7N",
        "extraFolderIds": [
            "1xDhl87qUsflx4nQCbLdLs8RDaDQc2Dok",
            "1hJ1J8sadOa5-3FlOHx6GtM8yeIu-62-u",
            "1C08q3lzaWAI6MjGigtAc0H2K0HNGmxQx",
            "1nC7Q2UXt01SgnkeD518XnlyDQTPXS1ZK"
        ],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-DAIHOC-KTL"
    },
    "COURSE-NGHETHUAT-199K": {
        "name": "Combo 31 Khóa Nghệ Thuật, Âm Nhạc & Vũ Đạo (Guitar · Piano · Organ · Thanh Nhạc · Ukulele · Sáo Trúc · DJ · Shuffle Dance)",
        "folderId": "1ZfQkutEeGbU5H0XAlK0Vm6xCaDWT-g_B",
        "extraFolderIds": [],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT"
    },
    "COURSE-K10-LOP11": {
        "name": "Combo Khóa Học THPT Lớp 11 Cho 2K10 (Toán · Lý · Hóa · Tin Học KHMT & Ứng Dụng)",
        "folderId": "1DQH48jr8YozUnJ3STTlyV-qFzLCAi4G5",
        "extraFolderIds": [],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-TOAN11-2K10"
    },
    "COURSE-DGNL-HSA": {
        "name": "Combo Luyện Thi ĐGNL HSA — ĐHQG Hà Nội 2027 (Định Lượng · Định Tính Ngữ Văn · Khoa Học · Tiếng Anh)",
        "folderId": "1_tPOqo2Nve07up5SgHpIyhjo6lwoVa9Y",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
            "1JFOWG4aMVK7913LKsin2FzGwy0WVZcj2"
        ],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-ITEM-35"
    },
    "COURSE-DGTD-TSA": {
        "name": "Combo Luyện Thi ĐGTD TSA — ĐH Bách Khoa Hà Nội 2027 (Tư Duy Toán · Đọc Hiểu · Khoa Học)",
        "folderId": "1_sW0V8Q1bKgI0taDc-0hXgAimrmPV_Q4",
        "extraFolderIds": [
            "1KoWxcHRb-OdLFrqwt8jbfD_z2Fx1VlnF"
        ],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-DGTD-TSA",
        "parentSubjectId": "COURSE-ITEM-40"
    },
    "COURSE-DGNL-VACT": {
        "name": "Combo Luyện Thi ĐGNL V-ACT — ĐHQG TP.HCM 2027 (Ngôn Ngữ · Toán Học · Tư Duy Khoa Học)",
        "folderId": "1xaRruY0asdqqw-fp4c9fy7n5nfxxGqSA",
        "extraFolderIds": [
            "1bz7JkVDWOOk5bKKrRFwyZvwUH2Mb9zj2",
            "12c6aQKTlU3hiJcQD2ThFKbgWIkCzpqv6",
            "1UQFg7cF1zuru0VMWqk4bn8XYd7gQnfIM"
        ],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-DGNL-VACT",
        "parentSubjectId": "COURSE-ITEM-45"
    },
    "COURSE-BCA-QDA-VSAT": {
        "name": "Combo Luyện Thi ĐGNL Bộ Công An (BCA) · Quân Đội (QDA) · VSAT 8 Môn (Toán, Văn, Anh, Lý, Hóa, Sinh, Sử, Địa)",
        "folderId": "1xaRruY0asdqqw-fp4c9fy7n5nfxxGqSA",
        "extraFolderIds": [
            "1AhTkg3k1908Md2VmTeIWsrg2dZSJeLAK",
            "1jNymOlAbD1sdzjKk6ijFzW6ZkB-IgvhI",
            "1KhQ_bJA5IEjeWjS5fjrn8ZlA7u1p-xbc"
        ],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-ITEM-48"
    },
    "COURSE-SUBJ-TOAN12-2K9": {
        "name": "Trọn Bộ Môn Toán 12 (2K9) — 7 Khóa Luyện Thi THPTQG 2027",
        "folderId": "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w",
        "extraFolderIds": [
            "1VbW3pT-HmLO6HgpXV_1iih6y7JrFe5Cj"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
    },
    "COURSE-SUBJ-VAN12-2K9": {
        "name": "Trọn Bộ Môn Ngữ Văn 12 (2K9) — Đọc Hiểu Văn Bản, Tiếng Việt & Nghị Luận Văn Học / Xã Hội",
        "folderId": "1DnhTPq6VL79T2nDyqtL13G5dyi_K0Yx3",
        "extraFolderIds": [
            "1t_QJSwaoUKPU5CtVX5yp040SxDCQf7wQ",
            "1Y76w1GLT9CSNGX5q0ER-uLua9eylB-Lz"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-VAN12-2K9"
    },
    "COURSE-SUBJ-ANH12-2K9": {
        "name": "Trọn Bộ Môn Tiếng Anh 12 (2K9) — Lộ Trình Pro3M · Pro3MPlus · VIP90 & Nền Tảng Tiếng Anh",
        "folderId": "1WlZvKRBm4CYRH7yohELZf0G1vcvSOwqe",
        "extraFolderIds": [
            "1W80wIVEKFn8KMxTzTkfWf-IktCwAtjfL",
            "1N9Ge80PeZiLBts5Udb8h0g0X8-Rtx9mE",
            "1si7gRcqURbnbJMMiGiNwih-OzQhkQJJT"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-ANH12-2K9"
    },
    "COURSE-SUBJ-TRUNG12-2K9": {
        "name": "Trọn Bộ Môn Tiếng Trung (Hán Ngữ 6 Quyển · Bộ Đề HSK · Tiếng Trung Chuyên Ngành & Ôn Thi ĐH Khối D04)",
        "folderId": "1AvLbPix9Ahk4EMiqMYKJ9pZzxDugD6l6",
        "extraFolderIds": [
            "1NmkphCDWyXoVudrQqC_IIh5D1cUg6asR"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-TRUNG12-2K9"
    },
    "COURSE-SUBJ-SU12-2K9": {
        "name": "Trọn Bộ Môn Lịch Sử 12 (2K9) — 22 Chuyên Đề Lịch Sử Việt Nam, Thế Giới & Chủ Quyền Biển Đông",
        "folderId": "1Elh6X9_ISZATrvMTdRpGY7spYib-iZqe",
        "extraFolderIds": [
            "1KW3u0aftTGOJdY7zNDJCot7IR4WJUnSF"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-SU12-2K9"
    },
    "COURSE-SUBJ-DIA12-2K9": {
        "name": "Trọn Bộ Môn Địa Lý 12 (2K9) — Địa Lý Tự Nhiên, Dân Cư, Ngành Kinh Tế & Các Vùng Kinh Tế Việt Nam",
        "folderId": "1zxzzbWG1Q97O9D5qAHmLNuUQIMPDiBwm",
        "extraFolderIds": [
            "1KW3u0aftTGOJdY7zNDJCot7IR4WJUnSF"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-DIA12-2K9"
    },
    "COURSE-SUBJ-SINH12-2K9": {
        "name": "Trọn Bộ Môn Sinh Học 12 (2K9) — Di Truyền Phân Tử, Nhiễm Sắc Thể, Tiến Hóa & Sinh Thái Học",
        "folderId": "1OOZzym1p9C-MrlY43ugcWxoMu2ej1sOi",
        "extraFolderIds": [
            "1ryKQMaBjhkBx9W0qQaELK6_vmVw4fucr",
            "1CTrlYhRiXh7phi2qPwE3l_c2sOCsxS92"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-SINH12-2K9"
    },
    "COURSE-SUBJ-LY12-2K9": {
        "name": "Trọn Bộ Môn Vật Lý 12 (2K9) — 5 Khóa Luyện Thi THPTQG 2027",
        "folderId": "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI",
        "extraFolderIds": [
            "1CAshsjgTtSA-QicoM95Z1N-Ghw4vdwwE"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-LY12-2K9"
    },
    "COURSE-SUBJ-HOA12-2K9": {
        "name": "Trọn Bộ Môn Hóa Học 12 (2K9) — 4 Khóa Luyện Thi THPTQG 2027",
        "folderId": "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc",
        "extraFolderIds": [
            "1AQ0g_Yght0umoIcBJl826mVIqmZ9uBjA"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-HOA12-2K9"
    },
    "COURSE-SUBJ-MOS-THVP": {
        "name": "Trọn Bộ Môn Tin Học Văn Phòng & Chứng Chỉ Quốc Tế MOS (30 Khóa Word · Excel · PowerPoint · Access · Google Tools)",
        "folderId": "1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm",
        "extraFolderIds": [
            "1nC7Q2UXt01SgnkeD518XnlyDQTPXS1ZK"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP"
    },
    "COURSE-SUBJ-TIN11-2K10": {
        "name": "Trọn Bộ Môn Tin Học 11 (2K10) — Tin Học Ứng Dụng · Khoa Học Máy Tính · Thuật Toán & CSDL",
        "folderId": "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq",
        "extraFolderIds": [
            "1MFbfgkctCYu736a4vMTzgvd4gvwmx8YT"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-TIN11-2K10"
    },
    "COURSE-SUBJ-DAIHOC-KTL": {
        "name": "Môn Kinh Tế Lượng Đại Học Điểm A+ (Thực Hành Hồi Quy OLS Trên EViews · Stata · SPSS)",
        "folderId": "1xDhl87qUsflx4nQCbLdLs8RDaDQc2Dok",
        "extraFolderIds": [
            "1QJxChXQQ9WMZQTInw_3Tged3PfHHRZHS"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-DAIHOC-KTL"
    },
    "COURSE-SUBJ-TRIETHOC": {
        "name": "Môn Triết Học Mác - Lênin Đại Học Điểm A+ (Sơ Đồ Tư Duy & Đề Cương Trọng Tâm)",
        "folderId": "1hJ1J8sadOa5-3FlOHx6GtM8yeIu-62-u",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-TRIETHOC"
    },
    "COURSE-SUBJ-NCKH-APA7": {
        "name": "Môn Phương Pháp Viết Bài Tập Lớn, Tiểu Luận & Nghiên Cứu Khoa Học Chuẩn APA 7",
        "folderId": "1C08q3lzaWAI6MjGigtAc0H2K0HNGmxQx",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-NCKH-APA7"
    },
    "COURSE-SUBJ-NGHETHUAT": {
        "name": "Môn Nghệ Thuật, Âm Nhạc & Vũ Đạo (31 Khóa Guitar · Piano · Organ · Thanh Nhạc · Ukulele · Sáo · DJ · Shuffle Dance)",
        "folderId": "1ZfQkutEeGbU5H0XAlK0Vm6xCaDWT-g_B",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT"
    },
    "COURSE-SUBJ-TOPUNI12-2K9": {
        "name": "Trọn Bộ 7 Khóa Nền Tảng 12 Đa Môn (Toán · Ngữ Văn · Tiếng Anh · Vật Lý · Hóa Học · Sinh Học)",
        "folderId": "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOPUNI12-2K9"
    },
    "COURSE-SUBJ-TOAN11-2K10": {
        "name": "Trọn Bộ Môn Toán 11 (2K10) — Lộ Trình Cơ Bản & Nâng Cao 2027",
        "folderId": "1CbMUKPhYMX12UmVAfsQAkpe8KnciWSlP",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-TOAN11-2K10"
    },
    "COURSE-SUBJ-LY11-2K10": {
        "name": "Trọn Bộ Môn Vật Lý 11 (2K10) — Chuyên Đề & Luyện Đề Học Kỳ",
        "folderId": "134iDRuiFnuSlRFGC07o0qI8YC-1gMrIL",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-LY11-2K10"
    },
    "COURSE-SUBJ-HOA11-2K10": {
        "name": "Trọn Bộ Môn Hóa Học 11 (2K10) — Lớp Tương Tác & Nâng Cao",
        "folderId": "1CL2S35nzQS7qkXKck9c_efHX-aS87v-a",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-HOA11-2K10"
    },
    "COURSE-ITEM-01": {
        "name": "Khóa Toán 12 (2K9) — Lộ Trình Chinh Phục THPTQG 2027 (Khóa T · E · Đom Đóm)",
        "folderId": "1S4DkHAPvliK9ea222q9x3sDbVM2TX3bm",
        "extraFolderIds": [
            "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
    },
    "COURSE-ITEM-55": {
        "name": "Khóa Ngữ Văn 12 (2K9) — Đọc Hiểu Thơ, Truyện, Ký, Văn Bản Thông Tin & Nghị Luận Văn Học",
        "folderId": "1t_QJSwaoUKPU5CtVX5yp040SxDCQf7wQ",
        "extraFolderIds": [
            "1DnhTPq6VL79T2nDyqtL13G5dyi_K0Yx3"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-VAN12-2K9"
    },
    "COURSE-ITEM-17": {
        "name": "Khóa Tiếng Anh 12 (2K9) — Trọn Bộ Lộ Trình Pro3M · Pro3MPlus · VIP90 2027",
        "folderId": "1W80wIVEKFn8KMxTzTkfWf-IktCwAtjfL",
        "extraFolderIds": [
            "1WlZvKRBm4CYRH7yohELZf0G1vcvSOwqe"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-ANH12-2K9"
    },
    "COURSE-ITEM-51": {
        "name": "Khóa Tiếng Trung Toàn Diện — Giáo Trình Hán Ngữ 6 Quyển (Quyển 1–6) & Luyện Viết Chữ Hán",
        "folderId": "1NmkphCDWyXoVudrQqC_IIh5D1cUg6asR",
        "extraFolderIds": [
            "1AvLbPix9Ahk4EMiqMYKJ9pZzxDugD6l6",
            "11rrA9I_UcBwvUwgbe4USj2IKsx12sW6w"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-TRUNG12-2K9"
    },
    "COURSE-ITEM-57": {
        "name": "Khóa Lịch Sử 12 (2K9) — Trọn Bộ 22 Chuyên Đề Lịch Sử Việt Nam, Thế Giới & Chủ Quyền Biển Đông",
        "folderId": "1Elh6X9_ISZATrvMTdRpGY7spYib-iZqe",
        "extraFolderIds": [
            "1KW3u0aftTGOJdY7zNDJCot7IR4WJUnSF"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-SU12-2K9"
    },
    "COURSE-ITEM-58": {
        "name": "Khóa Địa Lý 12 (2K9) — Địa Lý Tự Nhiên Đại Cương, Dân Cư & Các Vùng Kinh Tế Việt Nam",
        "folderId": "1zxzzbWG1Q97O9D5qAHmLNuUQIMPDiBwm",
        "extraFolderIds": [
            "1KW3u0aftTGOJdY7zNDJCot7IR4WJUnSF"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-DIA12-2K9"
    },
    "COURSE-ITEM-59": {
        "name": "Khóa Sinh Học 12 (2K9) — 10 Chuyên Đề Sinh Học Tế Bào, Di Truyền, Tiến Hóa & Sinh Thái Học",
        "folderId": "1ryKQMaBjhkBx9W0qQaELK6_vmVw4fucr",
        "extraFolderIds": [
            "1OOZzym1p9C-MrlY43ugcWxoMu2ej1sOi"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-SINH12-2K9"
    },
    "COURSE-ITEM-08": {
        "name": "Khóa Vật Lý 12 (2K9) — Trọn Bộ Lộ Trình IOME Chinh Phục 9+ 2027",
        "folderId": "1hXQ_ro2zg7CwHF3Qi3d9KBkoaHn6XxoE",
        "extraFolderIds": [
            "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-LY12-2K9"
    },
    "COURSE-ITEM-13": {
        "name": "Khóa Hóa Học 12 (2K9) — Lộ Trình Toàn Diện Luyện Thi THPTQG 2027",
        "folderId": "1JkWVgk6FWNROK433fzc2Bbs8DXB5X5OM",
        "extraFolderIds": [
            "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-HOA12-2K9"
    },
    "COURSE-ITEM-65": {
        "name": "Khóa Luyện Thi Chứng Chỉ Quốc Tế MOS Word & MOS Excel (2016 · 2019 · 365) Kèm Đề Mock Test",
        "folderId": "1sB5iPqIkaLJHhLNmPDxOLpA-AZ9KgRHg",
        "extraFolderIds": [
            "1HzXJFbiK77HhjEPxdmeTp9J9NkBbSnxQ",
            "1uQIG5U2FSMiRgvrNDJOPhuca3cty0OVc",
            "1jHc3rPDIe9qqhfRzXNjscKFrZUqdj5y5",
            "1O2qI08NlviBnIoVM44WICYH54ZO2B3a5"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP"
    },
    "COURSE-ITEM-33": {
        "name": "Khóa Tin Học 11 (2K10) — Định Hướng Khoa Học Máy Tính & Thuật Toán",
        "folderId": "1niGfuKDA1xbAGI2lQpfDxic4s2H8fFip",
        "extraFolderIds": [
            "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-TIN11-2K10"
    },
    "COURSE-ITEM-71": {
        "name": "Khóa Cày Điểm A+ Kinh Tế Lượng — Thực Hành Hồi Quy OLS Trên EViews, Stata & SPSS",
        "folderId": "1xDhl87qUsflx4nQCbLdLs8RDaDQc2Dok",
        "extraFolderIds": [
            "1ZmaGDNTMCJqEhWC2oB5vs21WDM__FV7N"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-DAIHOC-KTL"
    },
    "COURSE-ITEM-72": {
        "name": "Khóa Đạt A+ Triết Học Mác - Lênin — Hệ Thống Sơ Đồ Tư Duy & Đề Cương Tự Luận Trọng Tâm",
        "folderId": "1hJ1J8sadOa5-3FlOHx6GtM8yeIu-62-u",
        "extraFolderIds": [
            "1ZmaGDNTMCJqEhWC2oB5vs21WDM__FV7N"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-TRIETHOC"
    },
    "COURSE-ITEM-73": {
        "name": "Khóa Master Viết Bài Tập Lớn, Tiểu Luận & Nghiên Cứu Khoa Học Chuẩn Trích Dẫn APA 7",
        "folderId": "1C08q3lzaWAI6MjGigtAc0H2K0HNGmxQx",
        "extraFolderIds": [
            "1ZmaGDNTMCJqEhWC2oB5vs21WDM__FV7N"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-NCKH-APA7"
    },
    "COURSE-ITEM-75": {
        "name": "Khóa Học Đệm Hát Guitar Cơ Bản, Nâng Cao & Fingerstyle Guitar Cùng Haketu",
        "folderId": "1AoRvrctJEQm-yj70kSM3La4HBt_35vxD",
        "extraFolderIds": [
            "1GvjM6qVVIt1w4lALVVI2dc9lbBuTLYGp",
            "1xm4in14mBPrAd8UgOHwC7yvkNEGxrb-7",
            "1nv7AkmBfLlJE85fvpqGuSknI2x_k9Qsz",
            "1ZfQkutEeGbU5H0XAlK0Vm6xCaDWT-g_B"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT"
    },
    "COURSE-ITEM-77": {
        "name": "Khóa Đệm Hát Piano Trong 30 Ngày, Piano Quốc Tế Elementary 1 & Đệm Organ Cấp Tốc",
        "folderId": "1xnMNTVEIDuKlDV-8a6AhCkt6W9dD8Niw",
        "extraFolderIds": [
            "1fVzNfcQ2j9XUN5SX2OWXnIl1Zv-H0_4M",
            "1LNpJbhB3fRlPgx7mX5eOwdMGwtUOFU8P",
            "1DOHPFPQZgO5DT3pdeKOvEKHnSa8YRPIw",
            "1xi3N8UeflrYX99c5Wz_6xcZKMt0xAGPo"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT"
    },
    "COURSE-ITEM-78": {
        "name": "Khóa Học Thanh Nhạc Cơ Bản, Kỹ Thuật Mở Khẩu Hình Phát Triển Giọng Hát & Hát Karaoke",
        "folderId": "1jf4qgjDAKaKlHJaFBr8GTEe1Kr4aKFk1",
        "extraFolderIds": [
            "1bCkT2REDxhU9hbC5BLyWGa6U8RH8CZ7m",
            "1nOdncN1gRJxqEligvNt2BQsqb1YCvmf1",
            "1jNY7a1pB08bVvM0_fpHuM9j_Sk8sFBdX"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT"
    },
    "COURSE-ITEM-35": {
        "name": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) ĐHQG Hà Nội",
        "folderId": "1oRf9iIynqglvPJhq0Jyf3ILL2lUVKEQy",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-ITEM-35"
    },
    "COURSE-ITEM-40": {
        "name": "Khóa ĐGTD TSA 2027 (2K9) — Luyện Thi Đánh Giá Tư Duy ĐH Bách Khoa HN",
        "folderId": "1RPRK-NLUAudeC-65FF_nXbaOKG2aP_CJ",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGTD-TSA",
        "parentSubjectId": "COURSE-ITEM-40"
    },
    "COURSE-ITEM-45": {
        "name": "Khóa ĐGNL V-ACT 2027 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) ĐHQG TP.HCM",
        "folderId": "1bz7JkVDWOOk5bKKrRFwyZvwUH2Mb9zj2",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGNL-VACT",
        "parentSubjectId": "COURSE-ITEM-45"
    },
    "COURSE-ITEM-48": {
        "name": "Khóa Luyện Thi Đánh Giá Năng Lực Bộ Công An (BCA 2027) — Tự Luận & Trắc Nghiệm",
        "folderId": "1AhTkg3k1908Md2VmTeIWsrg2dZSJeLAK",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-ITEM-48"
    },
    "COURSE-ITEM-49": {
        "name": "Khóa Luyện Thi Đánh Giá Năng Lực Bộ Quốc Phòng / Quân Đội (QDA 2027)",
        "folderId": "1jNymOlAbD1sdzjKk6ijFzW6ZkB-IgvhI",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-ITEM-49"
    },
    "COURSE-ITEM-50": {
        "name": "Khóa Luyện Thi Đánh Giá Đầu Vào Đại Học Trên Máy Tính (VSAT 2027)",
        "folderId": "1KhQ_bJA5IEjeWjS5fjrn8ZlA7u1p-xbc",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-ITEM-50"
    },
    "COURSE-ITEM-52": {
        "name": "Khóa Luyện Thi THPTQG & Đại Học Môn Tiếng Trung Khối D04 — Trọng Tâm Ngữ Pháp & Luyện Đề",
        "folderId": "1gPRIl66qnS55v7bIaE_VL-tGAyO6-7sf",
        "extraFolderIds": [
            "1HWMDgt6YFp_NfQ-y3GdsiATUC1magU6u",
            "1AvLbPix9Ahk4EMiqMYKJ9pZzxDugD6l6"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-TRUNG12-2K9"
    },
    "COURSE-ITEM-02": {
        "name": "Khóa Toán 12 (2K9) — Lộ Trình Toàn Diện THPTQG 2027 (Khóa I & M)",
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
        "name": "Khóa Toán 12 (2K9) — Xuất Phát Sớm (XPS) Toán 12 SMART 2027",
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
        "name": "Khóa Toán 12 (2K9) — Xuất Phát Sớm (XPS) Chinh Phục 9+ Toán 2027",
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
        "name": "Khóa Nền Tảng 12 Môn Toán 2027 — Bám Sát Chương Trình Mới",
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
        "name": "Khóa Chuyên Đề Toán 12 & Luyện Tư Duy Vận Dụng Cao (TMT)",
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
        "name": "Khóa Chuyên Đề Các Bài Toán Thực Tế & Mô Hình Hóa Toán 12",
        "folderId": "14Ab28ONGVYGeJuoT5Ga5Q-R5LyiSCsyB",
        "extraFolderIds": [
            "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
    },
    "COURSE-ITEM-09": {
        "name": "Khóa Vật Lý 12 (2K9) — Xuất Phát Sớm (XPS) Chinh Phục 9+ Vật Lý 12",
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
        "name": "Khóa Vật Lý 12 (2K9) — Full Lộ Trình Xuất Phát Sớm (XPS) 2027",
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
        "name": "Khóa Vật Lý 12 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) Vật Lý 2027",
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
        "name": "Khóa Nền Tảng 12 Môn Vật Lý 2027 — Toàn Diện Kiến Thức SGK Mới",
        "folderId": "1pXv3a7zgk2H-Jrm1HtgzRKTF1F8Pl_yc",
        "extraFolderIds": [
            "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-LY12-2K9"
    },
    "COURSE-ITEM-14": {
        "name": "Khóa Hóa Học 12 (2K9) — Trọn Bộ Lộ Trình IOME Hóa Học 2027",
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
        "name": "Khóa Hóa Học 12 (2K9) — Trọn Bộ Lộ Trình CTG Chinh Phục Hóa 12",
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
        "name": "Khóa Hóa Học 12 — Chuyên Đề Trọng Tâm & Luyện Đề Thực Chiến",
        "folderId": "1rvjxRmI_pSmvflpJfl3lUMS_QeOaTFfV",
        "extraFolderIds": [
            "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-HOA12-2K9"
    },
    "COURSE-ITEM-18": {
        "name": "Khóa TopUni Nền Tảng 12 — Môn Toán Lộ Trình 2027",
        "folderId": "1sKwBrvFNSAF95XUHmAIRuGUaFYb9fFSu",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
    },
    "COURSE-ITEM-19": {
        "name": "Khóa TopUni Nền Tảng 12 — Môn Toán (Bản Đầy Đủ Chuyên Đề)",
        "folderId": "1SQ-uZI5-tEh6vAzbcECq3lMBnv-WHoIj",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
    },
    "COURSE-ITEM-20": {
        "name": "Khóa TopUni Nền Tảng 12 — Môn Ngữ Văn Đọc Hiểu & Nghị Luận",
        "folderId": "1DnhTPq6VL79T2nDyqtL13G5dyi_K0Yx3",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-VAN12-2K9"
    },
    "COURSE-ITEM-21": {
        "name": "Khóa TopUni Nền Tảng 12 — Môn Tiếng Anh Ngữ Pháp & Từ Vựng",
        "folderId": "1N9Ge80PeZiLBts5Udb8h0g0X8-Rtx9mE",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-ANH12-2K9"
    },
    "COURSE-ITEM-22": {
        "name": "Khóa TopUni Nền Tảng 12 — Môn Vật Lý Chuyên Đề Trọng Tâm",
        "folderId": "1rvyHSojdbe__C26Jj4xB5toinNJRZTEc",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-LY12-2K9"
    },
    "COURSE-ITEM-23": {
        "name": "Khóa TopUni Nền Tảng 12 — Môn Hóa Học Lý Thuyết & Bài Tập",
        "folderId": "1IgDvAyUK1UN6W5jqXWgPVML1cUS_vA0N",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-HOA12-2K9"
    },
    "COURSE-ITEM-24": {
        "name": "Khóa TopUni Nền Tảng 12 — Môn Sinh Học Di Truyền & Sinh Thái",
        "folderId": "1OOZzym1p9C-MrlY43ugcWxoMu2ej1sOi",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-SINH12-2K9"
    },
    "COURSE-ITEM-25": {
        "name": "Khóa Toán 11 (2K10) — Xuất Phát Sớm & Làm Chủ Toán 11 Lộ Trình 2027",
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
        "name": "Khóa Toán 11 (2K10) — Định Hướng Ôn Thi TN THPT, ĐGNL & ĐGTD 2027",
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
        "name": "Khóa Vật Lý 11 (2K10) — Lộ Trình Chuyên Sâu Vật Lý 11 Năm 2027",
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
        "name": "Khóa Vật Lý 11 (2K10) — Chương Trình Cơ Bản & Nâng Cao 2027",
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
        "name": "Khóa Luyện Đề Thi Học Kỳ Vật Lý 11 (Có Video & Lời Giải Chi Tiết)",
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
        "name": "Khóa Hóa Học 11 (2K10) — Lớp Tương Tác Trực Tuyến Bứt Phá Điểm 9+",
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
        "name": "Khóa Hóa Học 11 (2K10) — Chương Trình Cơ Bản & Nâng Cao 2027",
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
        "name": "Khóa Tin Học 11 (2K10) — Định Hướng Tin Học Ứng Dụng 2027",
        "folderId": "1dddCKyGFIG3o6NQokc8wMgS8fXArvvrt",
        "extraFolderIds": [
            "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K10-LOP11",
        "parentSubjectId": "COURSE-SUBJ-TIN11-2K10"
    },
    "COURSE-ITEM-34": {
        "name": "Khóa Kỹ Năng Tin Học Văn Phòng Thực Chiến (Word · Excel · PowerPoint)",
        "folderId": "1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm",
        "extraFolderIds": [
            "1aIVpZ5G5VFo1f6hahC-7HPIn4_cKLtdq"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP"
    },
    "COURSE-ITEM-36": {
        "name": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình XPS Chinh Phục ĐGNL ĐHQG Hà Nội",
        "folderId": "1kNFMqYTAjNJNW3wl654OGvBdPzmgI_4R",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-ITEM-36"
    },
    "COURSE-ITEM-37": {
        "name": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình Toàn Diện & Phòng Luyện Đề HSA",
        "folderId": "1OSx2MVNua6QDZhJpV4XXyOhdgdYU4hjY",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-ITEM-37"
    },
    "COURSE-ITEM-38": {
        "name": "Khóa ĐGNL HSA 2027 (2K9) — Lộ Trình Tinh Hoa HSA TH01 ĐHQG Hà Nội",
        "folderId": "1iHYQQznkt6nt0IvvANe_tMzHUQ5pX9y-",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-ITEM-38"
    },
    "COURSE-ITEM-39": {
        "name": "Khóa TopUni Nền Tảng Toàn Diện Các Môn Bổ Trợ Kỳ Thi ĐGNL HSA",
        "folderId": "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-ITEM-39"
    },
    "COURSE-ITEM-41": {
        "name": "Khóa ĐGTD TSA 2027 (2K9) — Lộ Trình Xuất Phát Sớm (XPS) TSA Bách Khoa",
        "folderId": "1H7u21HeGVXEajKcPM6jr1IHPtNYBIudN",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGTD-TSA",
        "parentSubjectId": "COURSE-ITEM-41"
    },
    "COURSE-ITEM-42": {
        "name": "Khóa ĐGTD TSA 2027 (2K9) — Lộ Trình Toàn Diện & Phòng Luyện Đề Bách Khoa",
        "folderId": "1OURnZBMt6QGB4AXIaXu23QGQPrqb_5F3",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGTD-TSA",
        "parentSubjectId": "COURSE-ITEM-42"
    },
    "COURSE-ITEM-43": {
        "name": "Khóa ĐGTD TSA 2027 — Full Lộ Trình SUN Chinh Phục ĐH Bách Khoa Hà Nội",
        "folderId": "1i9cK48wmHQFTPrLjnFheoHZ2Nto3tV2d",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGTD-TSA",
        "parentSubjectId": "COURSE-ITEM-43"
    },
    "COURSE-ITEM-44": {
        "name": "Khóa Bổ Trợ Tư Duy Toàn Diện Cho Kỳ Thi TSA · HSA · V-ACT 2027",
        "folderId": "10n24IGM9Xylx3TvSJycc9X1ax5BVx-KX",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGTD-TSA",
        "parentSubjectId": "COURSE-ITEM-44"
    },
    "COURSE-ITEM-46": {
        "name": "Khóa ĐGNL V-ACT 2027 (2K9) — Lộ Trình XPS Chinh Phục ĐHQG TP.HCM",
        "folderId": "12c6aQKTlU3hiJcQD2ThFKbgWIkCzpqv6",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGNL-VACT",
        "parentSubjectId": "COURSE-ITEM-46"
    },
    "COURSE-ITEM-47": {
        "name": "Khóa ĐGNL V-ACT 2027 (2K9) — Lộ Trình Toàn Diện & Phòng Luyện ĐHQG TP.HCM",
        "folderId": "1UQFg7cF1zuru0VMWqk4bn8XYd7gQnfIM",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGNL-VACT",
        "parentSubjectId": "COURSE-ITEM-47"
    },
    "COURSE-ITEM-53": {
        "name": "Khóa Luyện Đề Thi Chứng Chỉ Quốc Tế HSK (HSK 1–6) & Ngữ Pháp Tiếng Trung Thực Chiến",
        "folderId": "1YexRng8F1Cie0XvQ7EE_XfnCnnobQDle",
        "extraFolderIds": [
            "1NmkphCDWyXoVudrQqC_IIh5D1cUg6asR"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-TRUNG12-2K9"
    },
    "COURSE-ITEM-54": {
        "name": "Khóa Tiếng Trung Chuyên Ngành Thương Mại, Giao Tiếp & Giáo Trình Hán Ngữ Bản Mới",
        "folderId": "1KsS8slf4Y3J-dLOpHwPoaBEYMA_Xh7B8",
        "extraFolderIds": [
            "1Ow9j1hCrMG2TlVuNFgbDi3zarhr-zeQR",
            "1YpRMjWVBVZug4uryTq6FTMma0TZu0rFq"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-TRUNG12-2K9"
    },
    "COURSE-ITEM-56": {
        "name": "Khóa Tổng Ôn Ngữ Văn & Tư Duy Định Tính Ngôn Ngữ Luyện Thi HSA · QDA · THPTQG 2027",
        "folderId": "1Y76w1GLT9CSNGX5q0ER-uLua9eylB-Lz",
        "extraFolderIds": [
            "1DnhTPq6VL79T2nDyqtL13G5dyi_K0Yx3"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-SUBJ-VAN12-2K9"
    },
    "COURSE-ITEM-60": {
        "name": "Khóa Tổng Ôn Môn Sinh Học Luyện Thi ĐGNL HSA · QDA & Tốt Nghiệp THPT 2027",
        "folderId": "1CTrlYhRiXh7phi2qPwE3l_c2sOCsxS92",
        "extraFolderIds": [
            "1OOZzym1p9C-MrlY43ugcWxoMu2ej1sOi"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-SUBJ-SINH12-2K9"
    },
    "COURSE-ITEM-61": {
        "name": "Khóa Tiếng Anh 12 (2K9) — Chinh Phục Dạng Bài True/False, Nối Câu & Đọc Điền Từ Chuẩn Form 2027",
        "folderId": "1si7gRcqURbnbJMMiGiNwih-OzQhkQJJT",
        "extraFolderIds": [
            "1WlZvKRBm4CYRH7yohELZf0G1vcvSOwqe"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-ANH12-2K9"
    },
    "COURSE-ITEM-62": {
        "name": "Khóa Toán Học 12 — Chuyên Đề Hàm Số, Nguyên Hàm Tích Phân & Luyện Thi Đại Học VSAT",
        "folderId": "1VbW3pT-HmLO6HgpXV_1iih6y7JrFe5Cj",
        "extraFolderIds": [
            "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
    },
    "COURSE-ITEM-63": {
        "name": "Khóa Vật Lý 12 — Chuyên Đề Cấu Trúc Vật Chất, Nhiệt Động Lực Học & Luyện Thi VSAT",
        "folderId": "1CAshsjgTtSA-QicoM95Z1N-Ghw4vdwwE",
        "extraFolderIds": [
            "1tUoB5r_JPu6z4Q1p3Ry4kmZ7Ab25Y-sI"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-SUBJ-LY12-2K9"
    },
    "COURSE-ITEM-64": {
        "name": "Khóa Hóa Học 12 — Chuyên Đề Ester, Carbohydrate, Pin Điện Phân & Luyện Thi VSAT",
        "folderId": "1AQ0g_Yght0umoIcBJl826mVIqmZ9uBjA",
        "extraFolderIds": [
            "1BCfXNH3to1DOwlSZgKPU593dP9UaLRxc"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-SUBJ-HOA12-2K9"
    },
    "COURSE-ITEM-66": {
        "name": "Khóa Tuyệt Đỉnh Excel Từ Cơ Bản Đến Nâng Cao, Excel Pivot, Lập Báo Cáo Tài Chính & VBA",
        "folderId": "1AIoZiaHVooBk7eq2BTjpVmJkPACMfpi4",
        "extraFolderIds": [
            "1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP"
    },
    "COURSE-ITEM-67": {
        "name": "Khóa Tuyệt Đỉnh PowerPoint 2024 Chinh Phục Mọi Ánh Nhìn & Soạn Thảo Văn Bản Word 365 A-Z",
        "folderId": "1N8TzciVJHxfG8Sa3qBqOSJraLKXTFDDc",
        "extraFolderIds": [
            "1pijb80HkEwE-APTf5ePbXim4xd2JfPNu",
            "1OZx0HEFLqENfm6qlUbNCgE5sP4-ql_MD",
            "1BcWAeM0zlnWpaZm4NIAWQ_7O8LWRaT6Q"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP"
    },
    "COURSE-ITEM-68": {
        "name": "Khóa Làm Chủ Cơ Sở Dữ Liệu Microsoft Access Từ A-Z & Quản Lý Tiến Độ Dự Án MS Project",
        "folderId": "18DklFNnU58J8amuZHsE_7fFIUUTcZVsL",
        "extraFolderIds": [
            "1Pz2ulBxVS93g_8hiDshiunitZLPWI4HA"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP"
    },
    "COURSE-ITEM-69": {
        "name": "Khóa Làm Chủ Google Spreadsheets, Google Workspace & Tự Động Hóa Gửi Email Apps Script",
        "folderId": "1Aj6if850TExQl59BX726KwSkBrKTMFvA",
        "extraFolderIds": [
            "1dy5b31eEjENI_v4zzCSO28FfNfPxjVt_"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-THVP-MOS-199K",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP"
    },
    "COURSE-ITEM-70": {
        "name": "Khóa Combo Kỹ Năng Số: Thực Hành Truy Vấn SQL, Hàm Mảng Excel & Phân Tích Dữ Liệu",
        "folderId": "1nC7Q2UXt01SgnkeD518XnlyDQTPXS1ZK",
        "extraFolderIds": [
            "1JWPce0xhjx_dAe5O0pdz_Hma4H8BH3mm"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-MOS-THVP"
    },
    "COURSE-ITEM-74": {
        "name": "Khóa Lý Thuyết Xác Suất Thống Kê Đại Học & Bí Quyết Viết CV Chinh Phục Nhà Tuyển Dụng",
        "folderId": "1QJxChXQQ9WMZQTInw_3Tged3PfHHRZHS",
        "extraFolderIds": [
            "1DCDFsT5EXtDKj7m_y-w6qR7c_rXgP7NW",
            "16mmqHcys3VeIGmPeD-Hw2lL5koWbPis_"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-DAIHOC-KTL"
    },
    "COURSE-ITEM-76": {
        "name": "Khóa Guitar Đệm Hát Trong 30 Ngày Từ A-Z & Đệm Hát Dòng Nhạc Bolero Nâng Cao",
        "folderId": "1fbnrLKiCLnLX7eVPvrqg_kK56i3Fa3jS",
        "extraFolderIds": [
            "1ImYNmkGbp92_dXSAYq5lZiSVCJdwcFv1",
            "1euJQ8HZbo9rxOd2GrO1q2kIVwNgF6-CQ",
            "1ZfQkutEeGbU5H0XAlK0Vm6xCaDWT-g_B"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT"
    },
    "COURSE-ITEM-79": {
        "name": "Khóa Chinh Phục Đàn Ukulele Trong 7 Ngày Cùng Hiển Râu & Giáo Trình Ukulele All-In-One",
        "folderId": "1CdKjrgfN8h0fSpadjVBS2uhJe8_4OBnZ",
        "extraFolderIds": [
            "1oXAEpmI_zNgLDAv6tUMDgnQWe7SAPdbp",
            "1R3EJy4TNB_IWQJHIwl1pQuIhZmz5bF3i"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT"
    },
    "COURSE-ITEM-80": {
        "name": "Khóa Tự Học Thổi Sáo Trúc Trong 21 Ngày & Tự Học Kèn Harmonica Trong 15 Buổi",
        "folderId": "1MvkbnuiufNJT1_Wkl3bqIvKULjOki9Zc",
        "extraFolderIds": [
            "1xaVYzBaILI-mJHqHMLCVUF3ctfM3qz51",
            "1XoEXCi6BmSlMq62RVRfNtPFTdti_DzM1"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT"
    },
    "COURSE-ITEM-81": {
        "name": "Khóa Học DJ Online (Serato), Beatbox Biểu Diễn & Thu Âm Mix Vocal Trên Cubase / Nuendo",
        "folderId": "1IQqV3bkc5zPShTuwqpX6ufP3mmOyzw2G",
        "extraFolderIds": [
            "18KWHTVMR5G9djqEerfwAmel3tdN-U5sP",
            "1sIURai13bq6OKagRRWZNTdh-VEDYYQEv",
            "15FflBoasTT6otpURG3wbrf2fNygw1_t1",
            "1UmxVqK3Om8HtZDC8EQ_NZ3sw-8wNgV44"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT"
    },
    "COURSE-ITEM-82": {
        "name": "Khóa Học Nhảy Shuffle Dance Cơ Bản Cho Người Mới & Viết Giai Điệu Bài Hát Bằng Nhạc Beat",
        "folderId": "1gpSBFQSFIFIHbDzmQd_UrAACh7kgaTBM",
        "extraFolderIds": [
            "1n0BbtwuAy9CLZO7JILRlrZ2pstWKOc3N",
            "1aZMc6Ea-IPT79GkXksxjobZK3191vsYY"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGHETHUAT-199K",
        "parentSubjectId": "COURSE-SUBJ-NGHETHUAT"
    },
    "FULL-COMBO-399K": {
        "name": "Trọn Bộ Full 90+ Khóa Học Đa Môn (Toán · Văn · Anh · Trung · Lý · Hóa · Sinh · Sử · Địa · Tin MOS · Đại Học · Nghệ Thuật · ĐGNL)",
        "folderId": "1FaI2FGNRB4ERyEoYsPUQbJP80JcVpU52",
        "extraFolderIds": [
            "1ZmaGDNTMCJqEhWC2oB5vs21WDM__FV7N"
        ],
        "price": 399000,
        "tier": "full_399k",
        "parentCourseId": "ALL-COURSES-399K",
        "parentSubjectId": "ALL-COURSES-399K"
    },
    "HSA-01": {
        "name": "Combo Luyện Thi ĐGNL HSA — ĐHQG Hà Nội 2027 (Định Lượng · Định Tính Ngữ Văn · Khoa Học · Tiếng Anh)",
        "folderId": "1_tPOqo2Nve07up5SgHpIyhjo6lwoVa9Y",
        "extraFolderIds": [
            "1nd2gPR_MAkYl2e3ffZ7oSDpUs42iSrFJ",
            "1JFOWG4aMVK7913LKsin2FzGwy0WVZcj2"
        ],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-DGNL-HSA",
        "parentSubjectId": "COURSE-ITEM-35"
    },
    "TSA-01": {
        "name": "Combo Luyện Thi ĐGTD TSA — ĐH Bách Khoa Hà Nội 2027 (Tư Duy Toán · Đọc Hiểu · Khoa Học)",
        "folderId": "1_sW0V8Q1bKgI0taDc-0hXgAimrmPV_Q4",
        "extraFolderIds": [
            "1KoWxcHRb-OdLFrqwt8jbfD_z2Fx1VlnF"
        ],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-DGTD-TSA",
        "parentSubjectId": "COURSE-ITEM-40"
    },
    "VACT-01": {
        "name": "Combo Luyện Thi ĐGNL V-ACT — ĐHQG TP.HCM 2027 (Ngôn Ngữ · Toán Học · Tư Duy Khoa Học)",
        "folderId": "1xaRruY0asdqqw-fp4c9fy7n5nfxxGqSA",
        "extraFolderIds": [
            "1bz7JkVDWOOk5bKKrRFwyZvwUH2Mb9zj2",
            "12c6aQKTlU3hiJcQD2ThFKbgWIkCzpqv6",
            "1UQFg7cF1zuru0VMWqk4bn8XYd7gQnfIM"
        ],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-DGNL-VACT",
        "parentSubjectId": "COURSE-ITEM-45"
    },
    "MAC-01": {
        "name": "Môn Triết Học Mác - Lênin Đại Học Điểm A+ (Sơ Đồ Tư Duy & Đề Cương Trọng Tâm)",
        "folderId": "1hJ1J8sadOa5-3FlOHx6GtM8yeIu-62-u",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-TRIETHOC"
    },
    "KT-01": {
        "name": "Môn Kinh Tế Lượng Đại Học Điểm A+ (Thực Hành Hồi Quy OLS Trên EViews · Stata · SPSS)",
        "folderId": "1xDhl87qUsflx4nQCbLdLs8RDaDQc2Dok",
        "extraFolderIds": [
            "1QJxChXQQ9WMZQTInw_3Tged3PfHHRZHS"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-DAIHOC-KTL"
    },
    "TCC-01": {
        "name": "Trọn Bộ Môn Toán 12 (2K9) — 7 Khóa Luyện Thi THPTQG 2027",
        "folderId": "1Q_ToxSfCoPcDDooe8WUx0h1nJS1gf06w",
        "extraFolderIds": [
            "1VbW3pT-HmLO6HgpXV_1iih6y7JrFe5Cj"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-K9-LOP12",
        "parentSubjectId": "COURSE-SUBJ-TOAN12-2K9"
    },
    "LAW-01": {
        "name": "Combo Luyện Thi ĐGNL Bộ Công An (BCA) · Quân Đội (QDA) · VSAT 8 Môn (Toán, Văn, Anh, Lý, Hóa, Sinh, Sử, Địa)",
        "folderId": "1xaRruY0asdqqw-fp4c9fy7n5nfxxGqSA",
        "extraFolderIds": [
            "1AhTkg3k1908Md2VmTeIWsrg2dZSJeLAK",
            "1jNymOlAbD1sdzjKk6ijFzW6ZkB-IgvhI",
            "1KhQ_bJA5IEjeWjS5fjrn8ZlA7u1p-xbc"
        ],
        "price": 199000,
        "tier": "course_199k",
        "parentCourseId": "COURSE-BCA-QDA-VSAT",
        "parentSubjectId": "COURSE-ITEM-48"
    },
    "RES-01": {
        "name": "Môn Phương Pháp Viết Bài Tập Lớn, Tiểu Luận & Nghiên Cứu Khoa Học Chuẩn APA 7",
        "folderId": "1C08q3lzaWAI6MjGigtAc0H2K0HNGmxQx",
        "extraFolderIds": [],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-DAIHOC-HOC-THUAT",
        "parentSubjectId": "COURSE-SUBJ-NCKH-APA7"
    },
    "ENG-01": {
        "name": "Trọn Bộ Môn Tiếng Anh 12 (2K9) — Lộ Trình Pro3M · Pro3MPlus · VIP90 & Nền Tảng Tiếng Anh",
        "folderId": "1WlZvKRBm4CYRH7yohELZf0G1vcvSOwqe",
        "extraFolderIds": [
            "1W80wIVEKFn8KMxTzTkfWf-IktCwAtjfL",
            "1N9Ge80PeZiLBts5Udb8h0g0X8-Rtx9mE",
            "1si7gRcqURbnbJMMiGiNwih-OzQhkQJJT"
        ],
        "price": 69000,
        "tier": "subject_69k",
        "parentCourseId": "COURSE-NGOAINGU-TRUNG-ANH",
        "parentSubjectId": "COURSE-SUBJ-ANH12-2K9"
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
    accountName: "NGO BAO THACH",
    accountNumber: "27384751",
    provider: "Ngân hàng ACB - Chuyển khoản 24/7",
    qrBaseUrl: "https://img.vietqr.io/image/ACB-27384751-compact2.png"
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
    defaultWebhookUrl: "https://script.google.com/macros/s/AKfycbzdPmHlspKtFugSDT53B0Vfmz-kw_6KslTh1FZbCG-RAk9Bm5dg5w2tfepCKGg-FWciVg/exec"
};
