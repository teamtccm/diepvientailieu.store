try { if (localStorage.getItem("dvtl_web_banners_v10_purged") !== "1") { localStorage.removeItem("dvtl_web_course_custom_covers"); localStorage.removeItem("dvs_course_custom_covers"); localStorage.setItem("dvtl_web_banners_v10_purged", "1"); } } catch(_) {}

function getSemanticSvgIconJs(iconKey) {
    const k = String(iconKey || "").trim();
    const map = {
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/></svg>`,
        "brain": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/></svg>`,
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1"/><path d="M12 6v2m0 8v2"/></svg>`,
        "coin": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1"/><path d="M12 6v2m0 8v2"/></svg>`,
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
        "chart": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="12" x="3" y="4" rx="2" ry="2"/><line x1="2" x2="22" y1="20" y2="20"/></svg>`,
        "laptop": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="12" x="3" y="4" rx="2" ry="2"/><line x1="2" x2="22" y1="20" y2="20"/></svg>`,
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
        "scale": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/><path d="M22 10v6"/></svg>`,
        "grad": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/><path d="M22 10v6"/></svg>`,
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/><path d="M8 14v3"/><path d="M12 14v3"/><path d="M16 14v3"/></svg>`,
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/><path d="M8 14v3"/><path d="M12 14v3"/><path d="M16 14v3"/></svg>`,
        "uni": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/><path d="M8 14v3"/><path d="M12 14v3"/><path d="M16 14v3"/></svg>`,
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
        "bolt": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
        "target": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
        "": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
        "pen": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`
    };
    return map[k] || `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h6"/><path d="M9 11h4"/></svg>`;
}

/**

 * APP LOGIC FOR ĐIỆP VIÊN TÀI LIỆU WEB APPLICATION (HOT SEARCH & HIGH-END VISUAL DESIGN)

 */



// Application State

const state = {

    currentView: "home",

    selectedUniversity: "",

    selectedFaculty: "",

    activeCategory: "all",

    searchQuery: "",

    theme: localStorage.getItem("theme") || "light",

    

    // Document Checkout Modal

    selectedDoc: null,

    

    // Service Order Form

    serviceType: "btl",

    servicePages: 15,

    serviceDeadline: "",

    serviceBasePrice: 32000,

    

    // Settings

    webhookUrl: ((null /* Unified v8.0 Webhook */ && !null /* Unified v8.0 Webhook */.includes("AKfycbwJgYaG")) ? null /* Unified v8.0 Webhook */ : (typeof APP_CONFIG !== 'undefined' ? APP_CONFIG.defaultWebhookUrl : "")),

    orderHistory: JSON.parse(localStorage.getItem("dvtl_orders") || "[]")

};



// DOM Ready

document.addEventListener("DOMContentLoaded", () => {

    initTheme();

    initSearchDropdowns();

    initHotSearches();

    initEventListeners();

    initServiceCalculator();

    hydrateCachedLiveProductsSync();

    renderRecentOrdersTicker();

    initLiveProofStream();

    // Check URL Hash (Hỗ trợ deep-link trực tiếp từ Facebook/Meta: #docs, #service, #courses...)
    const hash = window.location.hash.replace("#", "").split("?")[0];
    if (["home", "docs", "courses", "service", "pricing", "guarantee_feedback", "faq"].includes(hash)) {
        switchView(hash);
    } else {
        switchView("home");
    }

    // Đồng bộ ngầm danh mục mới nhất sau khi giao diện đã hiển thị mượt mà
    setTimeout(() => syncLiveProductsFromMasterSheet(), 350);

});



// Lock strictly to Light Mode

function initTheme() {

    document.documentElement.classList.remove("dark");

    localStorage.setItem("theme", "light");

    state.theme = "light";

}



/* ==========================================================================

   1. TABBED SPA VIEW SWITCHER

   ========================================================================== */



function switchView(viewName) {
    state.currentView = viewName;

    window.location.hash = viewName;

    

    const allViews = [

        "viewHome", 

        "viewDocs", 

        "viewCourses",

        "viewService", 

        "viewPricing", 

        "viewGuaranteeFeedback", 

        "viewFaq"

    ];

    

    allViews.forEach(id => {

        const elem = document.getElementById(id);

        if (elem) elem.classList.add("hidden");

    });

    

    let targetId = "viewHome";

    if (viewName === "docs") targetId = "viewDocs";

    else if (viewName === "courses") targetId = "viewCourses";

    else if (viewName === "service") targetId = "viewService";

    else if (viewName === "pricing") targetId = "viewPricing";

    else if (viewName === "guarantee_feedback") targetId = "viewGuaranteeFeedback";

    else if (viewName === "faq") targetId = "viewFaq";

    

    const targetElem = document.getElementById(targetId);

    if (targetElem) {

        targetElem.classList.remove("hidden");

        targetElem.classList.add("animate-fadeIn");

    }

    

    // Highlight Nav Button (Clean Rounded Pill Style)

    document.querySelectorAll(".nav-tab-btn").forEach(btn => {

        if (btn.dataset.view === viewName) {

            btn.className = "nav-tab-btn px-2.5 py-1.5 rounded-full text-[12px] font-extrabold bg-[#FFA000] text-slate-950 shadow-md transition-all duration-200 whitespace-nowrap";

        } else {

            btn.className = "nav-tab-btn px-2.5 py-1.5 rounded-full text-[12px] font-bold text-white hover:bg-white/10 hover:text-amber-300 transition-all duration-200 whitespace-nowrap";

        }

    });

    

    if (viewName === "docs") {

        renderDocuments();

    } else if (viewName === "courses") {

        renderCourseCategoryTabs();

        renderCourses();

    } else if (viewName === "service") {

        initServiceFormPrefill();

    }

    

    window.scrollTo({ top: 0, behavior: "smooth" });

}



const NAV_VIEWS = ["home", "docs", "service", "pricing", "guarantee_feedback", "faq"];



function navigateNavTab(direction) {

    let currIdx = NAV_VIEWS.indexOf(state.currentView);

    if (currIdx === -1) currIdx = 0;

    let nextIdx = (currIdx + direction + NAV_VIEWS.length) % NAV_VIEWS.length;

    switchView(NAV_VIEWS[nextIdx]);

}



/* ==========================================================================

   2. HOT SEARCH & SEARCH ENGINE CHO KHO ĐỀ CƯƠNG

   ========================================================================== */



function initHotSearches() {

    renderHotSearches(HOT_SEARCH_KEYWORDS);

}



function renderHotSearches(list) {

    const container = document.getElementById("hotSearchOptions");

    if (!container) return;

    const items = list || HOT_SEARCH_KEYWORDS;



    container.innerHTML = items.map((kw, index) => {

        const cleanTerm = kw.replace(/\s*\([^)]*\)/g, '').trim();

        const isTop3 = index < 3;

        return `

            <button type="button" 

                    onclick="selectHotSearch('${kw.replace(/'/g, "\\'")}', '${cleanTerm.replace(/'/g, "\\'")}')" 

                    class="group flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-[#FFA000] hover:text-slate-950 dark:bg-white/10 dark:hover:bg-amber-400 dark:hover:text-slate-950 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-200 dark:border-white/10 transition-all shadow-sm hover:shadow active:scale-95 text-left cursor-pointer">

                <span class="${isTop3 ? 'text-red-500 font-black' : 'text-amber-500'} group-hover:text-slate-950 transition-colors"><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg></span>

                <span>${kw}</span>

            </button>

        `;

    }).join('');

}



function filterHotSearches(query) {

    const q = (query || "").trim();

    if (!q) {

        renderHotSearches(HOT_SEARCH_KEYWORDS);

        return;

    }

    const qNorm = removeVietnameseTones(q);

    const filtered = HOT_SEARCH_KEYWORDS.filter(kw => {

        return kw.toLowerCase().includes(q.toLowerCase()) || 

               removeVietnameseTones(kw).includes(qNorm);

    });

    if (filtered.length > 0) {

        renderHotSearches(filtered);

    } else {

        const container = document.getElementById("hotSearchOptions");

        if (container) {

            container.innerHTML = `

                <div class="w-full py-2 text-center text-xs text-slate-400">

                    Nhấn phím <b>Enter</b> hoặc bấm nút <b>Tìm</b> để tra cứu "<b>${q}</b>"

                </div>

            `;

        }

    }

}



function openHotSearchDropdown() {

    closeUniDropdown();

    const dropdown = document.getElementById("hotSearchDropdown");

    if (!dropdown) return;

    dropdown.classList.remove("hidden");

}



function closeHotSearchDropdown(e) {

    if (e && e.stopPropagation) e.stopPropagation();

    const dropdown = document.getElementById("hotSearchDropdown");

    if (dropdown) dropdown.classList.add("hidden");

}



function selectHotSearch(keyword, cleanTerm) {

    const term = cleanTerm || keyword.replace(/\s*\([^)]*\)/g, '').trim();

    const searchInput = document.getElementById("searchKeywordInput");

    const clearBtn = document.getElementById("searchKeywordClearBtn");

    if (searchInput) {

        searchInput.value = term;

    }

    if (clearBtn) clearBtn.classList.remove("hidden");

    state.searchQuery = term;

    closeHotSearchDropdown();

    executeDocSearch();

}



function clearSearchKeyword(e) {

    if (e) e.stopPropagation();

    const searchInput = document.getElementById("searchKeywordInput");

    const clearBtn = document.getElementById("searchKeywordClearBtn");

    if (searchInput) {

        searchInput.value = "";

        searchInput.focus();

    }

    if (clearBtn) clearBtn.classList.add("hidden");

    state.searchQuery = "";

    executeDocSearch();

    filterHotSearches("");

    openHotSearchDropdown();

}



function initSearchDropdowns() {

    initUniCombobox();



    // Populate Faculties (Kinh tế, Sư phạm, Du lịch, Công nghệ, Tâm lý, Luật...)

    const facultySelect = document.getElementById("searchFacultySelect");

    if (facultySelect) {

        facultySelect.innerHTML = STANDARD_FACULTIES.map(f => `<option value="${f}">${f}</option>`).join('');

        facultySelect.addEventListener("change", (e) => {

            state.selectedFaculty = e.target.value;

            executeDocSearch();

        });

    }



    // Close dropdowns when clicking outside

    document.addEventListener("click", (e) => {

        const uniWrapper = document.getElementById("uniComboboxWrapper");

        if (uniWrapper && !uniWrapper.contains(e.target)) {

            closeUniDropdown();

        }

        const searchWrapper = document.getElementById("searchKeywordWrapper");

        if (searchWrapper && !searchWrapper.contains(e.target)) {

            closeHotSearchDropdown();

        }

    });

}



function initUniCombobox() {

    renderUniOptions(UNIVERSITIES);

    updateUniDisplay();

}



const UNIVERSITIES_WITH_LOGOS = new Set([

    'agu', 'apd', 'ba', 'bav', 'bkhn', 'dav', 'dhhp', 'dlu', 'dnpu', 'dnu', 'dpu', 'due', 'duytan',

    'eaut', 'fbu', 'ftu', 'giadinh', 'hce', 'hcmuc', 'hcmue', 'hdu', 'hlu', 'hoasen', 'hongduc', 'hou',

    'huflit', 'humg', 'hunre', 'hutech', 'hvtc', 'aof', 'iuh', 'kinhbac', 'mku', 'ncu', 'neu',

    'niem', 'ntt', 'ntu', 'ou', 'pdu', 'phenikaa', 'ptit', 'qnu', 'sgu', 'siu',

    'tcnh_hn', 'tdmu', 'tdu', 'thanglong', 'thanhdong', 'tlu', 'tmu', 'tnu', 'tvu', 'ueb',

    'ued', 'ueh', 'uel', 'uet', 'ufm', 'ukh', 'ulis', 'ulsa', 'ulsa2', 'ussh',

    'utt', 'vanlang', 'vhu', 'vinhuni', 'vnua'

]);



function renderUniOptions(list) {

    const container = document.getElementById("uniOptionsList");

    if (!container) return;



    if (!list || list.length === 0) {

        container.innerHTML = `

            <div class="p-3 text-center text-slate-400 text-xs">

                Không tìm thấy trường nào phù hợp

            </div>

        `;

        return;

    }



    // Always sort universities having logos first; schools without logos at the bottom

    const sortedList = [...list].sort((a, b) => {

        const aHas = UNIVERSITIES_WITH_LOGOS.has(a.id);

        const bHas = UNIVERSITIES_WITH_LOGOS.has(b.id);

        if (aHas !== bHas) return bHas ? 1 : -1;

        return 0;

    });



    let html = '';



    for (const u of sortedList) {

        const isSelected = state.selectedUniversity === u.id;

        const hasLogo = UNIVERSITIES_WITH_LOGOS.has(u.id);

        const logoSrc = `images/logos/${u.id}.png`;



        const logoHtml = hasLogo

            ? `<img src="${logoSrc}" alt="${u.code}" class="w-full h-full object-contain" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">

               <span class="w-full h-full flex items-center justify-center bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 font-black text-xs rounded" style="display:none">?</span>`

            : `<span class="w-full h-full flex items-center justify-center bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 font-black text-xs rounded">?</span>`;



        html += `

            <div onclick="selectUniversity('${u.id}')" class="flex items-center gap-2.5 px-3 py-2 hover:bg-sky-50 dark:hover:bg-white/10 cursor-pointer rounded-xl transition ${isSelected ? 'bg-sky-100/70 dark:bg-sky-900/40 text-[#0D1677] dark:text-sky-300 font-bold' : 'text-slate-700 dark:text-slate-200'}">

                <div class="w-6 h-6 rounded bg-white p-0.5 shadow-sm border border-slate-200 dark:border-white/20 flex items-center justify-center overflow-hidden flex-shrink-0">

                    ${logoHtml}

                </div>

                <span class="px-1.5 py-0.5 bg-slate-200 dark:bg-white/15 text-slate-900 dark:text-white font-mono font-bold text-[10px] rounded">

                    ${u.code}

                </span>

                <span class="truncate text-xs flex-1">${u.name}</span>

                ${isSelected ? '<span class="text-xs text-sky-600 dark:text-sky-400 font-bold"></span>' : ''}

            </div>

        `;

    }



    container.innerHTML = html;

}



function toggleUniDropdown(e) {

    if (e) e.stopPropagation();

    closeHotSearchDropdown();

    const menu = document.getElementById("uniDropdownMenu");

    const chevron = document.getElementById("uniDropdownChevron");

    if (!menu) return;



    const isHidden = menu.classList.contains("hidden");

    if (isHidden) {

        menu.classList.remove("hidden");

        if (chevron) chevron.textContent = "";

        const filterInput = document.getElementById("uniFilterInput");

        if (filterInput) {

            filterInput.value = "";

            renderUniOptions(UNIVERSITIES);

            setTimeout(() => filterInput.focus(), 50);

        }

    } else {

        closeUniDropdown();

    }

}



function closeUniDropdown() {

    const menu = document.getElementById("uniDropdownMenu");

    const chevron = document.getElementById("uniDropdownChevron");

    if (menu) menu.classList.add("hidden");

    if (chevron) chevron.textContent = "";

}



function filterUniList(query) {

    const raw = (query || "").trim().toLowerCase();

    const rawNorm = removeVietnameseTones(raw);



    if (!raw) {

        renderUniOptions(UNIVERSITIES);

        return;

    }



    const filtered = UNIVERSITIES.filter(u => {

        const codeLower = u.code.toLowerCase();

        const nameNorm = removeVietnameseTones(u.name);

        const fullNameNorm = removeVietnameseTones(u.fullName || "");

        const aliases = (u.aliases || []).join(" ").toLowerCase();

        const aliasesNorm = removeVietnameseTones(aliases);

        return codeLower.includes(raw) || nameNorm.includes(rawNorm) || fullNameNorm.includes(rawNorm) || aliases.includes(raw) || aliasesNorm.includes(rawNorm);

    });



    renderUniOptions(filtered);

}



function selectUniversity(uniId) {

    state.selectedUniversity = uniId;

    const hiddenSelect = document.getElementById("searchUniSelect");

    if (hiddenSelect) hiddenSelect.value = uniId;



    updateUniDisplay();

    closeUniDropdown();

    executeDocSearch();

}



function selectUniFromMarquee(uniId) {

    switchView('docs');

    selectUniversity(uniId);

    const viewDocs = document.getElementById("viewDocs");

    if (viewDocs) {

        viewDocs.scrollIntoView({ behavior: "smooth" });

    }

}



function clearUniSelection(e) {

    if (e) e.stopPropagation();

    state.selectedUniversity = "";

    const hiddenSelect = document.getElementById("searchUniSelect");

    if (hiddenSelect) hiddenSelect.value = "";



    updateUniDisplay();

    closeUniDropdown();

    executeDocSearch();

}



function updateUniDisplay() {

    const displayContent = document.getElementById("uniDisplayContent");

    const clearBtn = document.getElementById("uniClearBtn");

    if (!displayContent) return;



    if (!state.selectedUniversity) {

        displayContent.innerHTML = `<span class="text-slate-400 font-medium"><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/><path d="M8 14v3"/><path d="M12 14v3"/><path d="M16 14v3"/></svg> Chọn Trường Của Bạn</span>`;

        if (clearBtn) clearBtn.classList.add("hidden");

    } else {

        const u = UNIVERSITIES.find(item => item.id === state.selectedUniversity);

        if (u) {

            const hasLogo = UNIVERSITIES_WITH_LOGOS.has(u.id);

            const logoSrc = `images/logos/${u.id}.png`;

            const logoHtml = hasLogo

                ? `<img src="${logoSrc}" alt="${u.code}" class="w-full h-full object-contain" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">

                   <span class="w-full h-full flex items-center justify-center bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 font-black text-xs rounded" style="display:none">?</span>`

                : `<span class="w-full h-full flex items-center justify-center bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 font-black text-xs rounded">?</span>`;



            displayContent.innerHTML = `

                <div class="w-6 h-6 rounded bg-white p-0.5 shadow-sm border border-slate-200 dark:border-white/20 flex items-center justify-center overflow-hidden flex-shrink-0">

                    ${logoHtml}

                </div>

                <span class="px-2 py-0.5 bg-[#FFA000] text-slate-950 font-black text-[10px] rounded shadow-sm">${u.code}</span>

                <span class="text-slate-900 dark:text-white font-bold truncate text-xs sm:text-sm">${u.name}</span>

            `;

            if (clearBtn) clearBtn.classList.remove("hidden");

        } else {

            displayContent.innerHTML = `<span class="text-slate-400 font-medium"><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/><path d="M8 14v3"/><path d="M12 14v3"/><path d="M16 14v3"/></svg> Chọn Trường Của Bạn</span>`;

            if (clearBtn) clearBtn.classList.add("hidden");

        }

    }

}



function executeDocSearch() {

    const keywordInput = document.getElementById("searchKeywordInput");

    if (keywordInput) {

        state.searchQuery = keywordInput.value.trim();

    }

    renderDocuments();

}



function removeVietnameseTones(str) {
    if (str === null || str === undefined) return '';
    str = String(str).toLowerCase();

    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");

    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");

    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");

    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");

    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");

    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");

    str = str.replace(/đ/g, "d");

    str = str.replace(/[^a-z0-9\s]/g, " ");

    return str.replace(/\s+/g, " ").trim();

}



function getWordInitials(str) {

    if (!str) return '';

    const clean = removeVietnameseTones(str)

        .replace(/\b(de|cuong|mon|hoc|phan|on|tap|bai|tap)\b/g, '')

        .trim();

    const words = clean.split(/\s+/).filter(w => w.length > 0);

    return words.map(w => w[0]).join('').toLowerCase();

}



function scoreDocMatch(d, qLower, qNorm, qClean) {

    const codeLower = (d.code || "").toLowerCase();

    const baseNorm = removeVietnameseTones(d.baseName || "");

    const initials = getWordInitials(d.baseName || "");



    // 1. Exact SKU / code match (e.g. 'ktl', 'tcc', 'pldc')

    if (codeLower === qLower || codeLower === qClean) return 100;

    // 2. Exact acronym match (e.g. initials of 'Kinh Tế Lượng' is 'ktl')

    if (initials === qClean || initials === qLower) return 90;

    // 3. Exact full name match

    if (baseNorm === qNorm || baseNorm === qClean) return 85;

    // 4. Starts with name

    if (baseNorm.startsWith(qNorm) || baseNorm.startsWith(qClean)) return 70;

    // 5. Code contains query

    if (codeLower.includes(qLower) || codeLower.includes(qClean)) return 60;

    // 6. Name contains query

    if (baseNorm.includes(qNorm) || baseNorm.includes(qClean)) return 50;

    if (d.baseName.toLowerCase().includes(qLower)) return 50;

    // 7. Substring of initials (min 2 chars)

    if (qClean.length >= 2 && initials.includes(qClean)) return 40;

    // 8. Keyword clean match (strip 'mon', 'hoc', 'de', 'cuong')

    const qKeywords = qNorm.replace(/\b(de|cuong|mon|hoc|phan|on|tap)\b/g, "").replace(/\s+/g, " ").trim();

    const baseKeywords = baseNorm.replace(/\b(de|cuong|mon|hoc|phan|on|tap)\b/g, "").replace(/\s+/g, " ").trim();

    if (qKeywords.length >= 2 && (baseNorm.includes(qKeywords) || baseKeywords.includes(qKeywords) || qKeywords.includes(baseKeywords))) {

        return 45;

    }

    // 9. Multi-word overlap

    const qWords = qNorm.split(/\s+/).filter(w => w.length > 2 && !["mon","hoc","phan"].includes(w));

    if (qWords.length > 0 && qWords.every(w => baseNorm.includes(w))) {

        return 40;

    }

    // 10. Category or tags match

    if (d.category && removeVietnameseTones(d.category).includes(qNorm)) return 30;

    const tagStr = (d.tags || []).join(" ").toLowerCase();

    if (tagStr.includes(qLower)) return 25;

    return 0;

}



function filterDocuments() {

    let list = [];

    const rawQ = (state.searchQuery || "").trim();

    const hasSearch = rawQ.length > 0;

    

    if (hasSearch) {

        let qLower = rawQ.toLowerCase();

        let qNorm = removeVietnameseTones(rawQ);



        // Auto-detect if user typed a university code in the search query (e.g. 'TCC BKHN' or 'KTL AOF' or 'KTL NEU')

        if (!state.selectedUniversity) {

            for (const u of UNIVERSITIES) {

                const searchCodes = [u.code, ...(u.aliases || [])];

                let matched = false;

                for (const sc of searchCodes) {

                    if (!sc || sc.length < 2) continue;

                    const escaped = sc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                    const codeRegex = new RegExp(`(^|\\s)${escaped}(\\s|$)`, 'i');

                    if (codeRegex.test(qLower)) {

                        state.selectedUniversity = u.id;

                        if (typeof document !== 'undefined') {

                            const uniSelect = document.getElementById("searchUniSelect");

                            if (uniSelect) uniSelect.value = u.id;

                            updateUniDisplay();

                        }

                        qLower = qLower.replace(codeRegex, ' ').trim();

                        qNorm = removeVietnameseTones(qLower);

                        matched = true;

                        break;

                    }

                }

                if (matched) break;

            }

        }



        const qClean = qNorm.replace(/\b(de|cuong|mon|hoc|phan)\b/g, '').trim();



        // 1. Search in REAL_DOCUMENTS_DATABASE first!

        const realScored = [];

        if (typeof REAL_DOCUMENTS_DATABASE !== 'undefined') {

            REAL_DOCUMENTS_DATABASE.forEach(d => {

                const s = scoreDocMatch(d, qLower, qNorm, qClean);

                if (s > 0) realScored.push({ doc: d, score: s });

            });

            realScored.sort((a, b) => b.score - a.score);

        }



        // 2. Also search in DOCUMENTS_DATABASE (showcase items)

        const displayScored = [];

        DOCUMENTS_DATABASE.forEach(d => {

            const s = scoreDocMatch(d, qLower, qNorm, qClean);

            if (s > 0) displayScored.push({ doc: d, score: s });

        });

        displayScored.sort((a, b) => b.score - a.score);



        // Prioritize real documents

        if (realScored.length > 0) {

            list = realScored.map(item => item.doc);

        } else {

            list = displayScored.map(item => item.doc);

        }



        // When university is selected, prioritize courses matching its disciplines

        if (state.selectedUniversity && state.selectedUniversity !== 'all') {

            const selectedUni = UNIVERSITIES.find(u => u.id === state.selectedUniversity);

            if (selectedUni && typeof getUniAllowedDisciplines === 'function') {

                const allowed = getUniAllowedDisciplines(selectedUni.id, selectedUni.name);

                const uniFiltered = list.filter(d => allowed.has(getDocDiscipline(d)));

                if (uniFiltered.length > 0) {

                    list = uniFiltered;

                }

            }

        }

    } else {

        // No search query: display all real outlines from REAL_DOCUMENTS_DATABASE + showcase items (deduplicated)

        const combined = [];

        const seenKeys = new Set();

        const addUniqueDoc = (d) => {

            if (!d) return;

            const skuU = String(d.code || "").trim().toUpperCase();

            if (skuU.startsWith("COURSE-") || skuU === "ALL-COURSES-399K" || /^DC_\d{4}$/.test(skuU)) return;

            const normTitle = removeVietnameseTones(d.baseName || "").replace(/\b(de|cuong|mon|hoc|phan|on|tap)\b/g, "").replace(/\s+/g, " ").trim();

            const key = (d.driveId ? "ID:" + d.driveId : "") || normTitle || skuU;

            if (normTitle && seenKeys.has(normTitle)) return;

            if (key && seenKeys.has(key)) return;

            if (normTitle) seenKeys.add(normTitle);

            if (key) seenKeys.add(key);

            combined.push(d);

        };

        if (typeof REAL_DOCUMENTS_DATABASE !== "undefined") {

            // Put newly synced live outlines (doc_live_*) first, then all real outlines

            REAL_DOCUMENTS_DATABASE.filter(d => String(d.id || "").startsWith("doc_live_")).forEach(addUniqueDoc);

            REAL_DOCUMENTS_DATABASE.forEach(addUniqueDoc);

        }

        if (typeof DOCUMENTS_DATABASE !== "undefined") {

            DOCUMENTS_DATABASE.forEach(addUniqueDoc);

        }

        list = combined;

        if (state.selectedUniversity && state.selectedUniversity !== 'all') {

            const selectedUni = UNIVERSITIES.find(u => u.id === state.selectedUniversity);

            if (selectedUni && typeof getUniAllowedDisciplines === 'function') {

                const allowed = getUniAllowedDisciplines(selectedUni.id, selectedUni.name);

                list = list.filter(d => allowed.has(getDocDiscipline(d)));

            } else {

                list = list.filter(d => d.university === state.selectedUniversity);

            }

        }

    }

    

    // Category tab filter

    if (state.activeCategory && state.activeCategory !== "all") {

        list = list.filter(d => d.category === state.activeCategory);

    }

    

    return list;

}



const DOC_RENDER_BATCH_SIZE = 24;
let currentDocRenderLimit = DOC_RENDER_BATCH_SIZE;
let currentFilteredDocsCache = [];
let docScrollObserver = null;

function getNaturalWebDocStats(doc, index = 0) {
    const seedStr = `${doc.id || ""}|${doc.code || ""}|${doc.baseName || ""}|${index}`;
    let h = 2166136261 >>> 0;
    for (let i = 0; i < seedStr.length; i++) {
        h ^= seedStr.charCodeAt(i);
        h = Math.imul(h, 16777619) >>> 0;
    }
    const pagesPool = [20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 44, 46, 48, 52];
    const ratingsPool = ["4.7", "4.8", "4.9", "4.6", "4.8", "4.9", "4.7", "4.8", "4.6", "4.9", "4.7", "5.0"];
    const origPool = [95000, 100000, 110000, 115000, 120000, 125000, 130000, 135000, 140000, 150000];
    const tagPairsPool = [
        ["Tóm Tắt Trọng Tâm", "Câu Hỏi & Đáp Án"],
        ["Trắc Nghiệm Ôn Thi", "Đề Thi Các Năm"],
        ["Lý Thuyết Cốt Lõi", "Bài Tập & Lời Giải"],
        ["Tự Luận & Vấn Đáp", "Bám Sát Đề Cuối Kỳ"],
        ["Công Thức & Dạng Bài", "Giải Nhanh Chi Tiết"],
        ["Ngân Hàng Câu Hỏi", "Chuẩn Đề Thi Mới"]
    ];
    const pages = (doc.pages && doc.pages !== 42 && doc.pages >= 16) ? doc.pages : pagesPool[h % pagesPool.length];
    const rating = (doc.rating && String(doc.rating) !== "5" && String(doc.rating) !== "5.0") ? String(doc.rating) : ratingsPool[(h >>> 4) % ratingsPool.length];
    const reviewsCount = (doc.reviewsCount && doc.reviewsCount !== 128 && doc.reviewsCount <= 220) ? doc.reviewsCount : (34 + ((h >>> 8) % 155));
    const originalPrice = (doc.originalPrice && doc.originalPrice !== 120000 && doc.originalPrice !== 160000) ? doc.originalPrice : origPool[(h >>> 13) % origPool.length];
    const tags = tagPairsPool[(h >>> 17) % tagPairsPool.length];
    const price = doc.price || 50000;
    const discountPercent = Math.round((1 - (price / originalPrice)) * 100);
    return { pages, rating, reviewsCount, originalPrice, price, discountPercent, tags };
}

function buildSingleDocumentCardHtml(doc, index, selectedUni) {
    const docDisc = typeof getDocDiscipline === 'function' ? getDocDiscipline(doc) : "DAI_CUONG";
    let docUniInfo = null;
    if (selectedUni && typeof getUniAllowedDisciplines === 'function' && getUniAllowedDisciplines(selectedUni.id, selectedUni.name).has(docDisc)) {
        docUniInfo = selectedUni;
    } else if (doc.university) {
        docUniInfo = UNIVERSITIES.find(u => u.id === doc.university) || UNIVERSITIES[0];
    } else {
        docUniInfo = UNIVERSITIES[index % UNIVERSITIES.length];
    }

    const docUniBadge = docUniInfo ? docUniInfo.code : "TOÀN QUỐC";
    const docUniHasLogo = docUniInfo && UNIVERSITIES_WITH_LOGOS.has(docUniInfo.id);
    const docUniLogo = docUniInfo ? `images/logos/${docUniInfo.id}.png` : 'images/favicon_badge.png';

    const cleanDocBaseUpper = String(doc.baseName || "").replace(/^(bộ\s+)?đề\s+cương\s+/i, "").trim().toUpperCase();
    const fullDocTitle = `ĐỀ CƯƠNG ${cleanDocBaseUpper} — ${docUniBadge}`;
    const iconSymbol = getSemanticSvgIconJs(doc.icon);
    const mascotBadge = "images/favicon_badge.png";
    const nat = getNaturalWebDocStats(doc, index);

    return `
        <div class="clean-card hover-lift overflow-hidden flex flex-col justify-start h-full transition-all duration-300 border-2 border-slate-200 dark:border-white/10 shadow-sm hover:shadow-2xl rounded-[22px]">
            <div class="relative p-4 text-white flex flex-col justify-between h-[204px] min-h-[204px] max-h-[204px] shrink-0 select-none rounded-t-[20px] overflow-hidden" style="background: linear-gradient(160deg, #0B1958 0%, #071135 60%, #0D1677 100%);">
                <div class="flex justify-between items-center z-10">
                    <div class="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-xl border border-white/20 backdrop-blur-md shadow-sm">
                        <img src="${mascotBadge}" alt="Logo" class="w-4 h-4 object-contain" loading="lazy" decoding="async">
                        <span class="font-black text-[9.5px] tracking-wider uppercase text-amber-300">ĐIỆP VIÊN TÀI LIỆU</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <div class="w-7 h-7 rounded-md bg-white p-0.5 shadow-md border border-white/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                            ${docUniHasLogo ? `
                            <img src="${docUniLogo}"
                                 alt="${docUniBadge}"
                                 class="w-full h-full object-contain"
                                 loading="lazy"
                                 decoding="async"
                                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                            <div class="w-full h-full rounded flex items-center justify-center bg-amber-50 text-amber-600 font-black text-xs" style="display:none">${docUniBadge.slice(0,2)}</div>
                            ` : `
                            <div class="w-full h-full rounded flex items-center justify-center bg-amber-50 text-amber-600 font-black text-xs">${docUniBadge.slice(0,2)}</div>
                            `}
                        </div>
                        <span class="px-2.5 py-1 bg-[#FFA000] text-slate-950 font-black text-[10px] rounded-lg shadow-md uppercase tracking-wider border border-amber-300">
                            ${docUniBadge}
                        </span>
                    </div>
                </div>

                <div class="relative my-2.5 z-10">
                    <div class="flex items-center gap-1.5 mb-1.5">
                        <span class="text-[10px] font-bold text-sky-300 bg-black/50 px-2.5 py-0.5 rounded-md border border-white/15 tracking-wider">#${doc.code}</span>
                        ${doc.isReal ? '<span class="text-[9px] font-extrabold text-amber-300 bg-amber-950/70 border border-amber-400/40 px-2.5 py-0.5 rounded-full ml-auto tracking-wide"> CÓ SẴN FILE DRIVE</span>' : ''}
                    </div>
                    <h4 class="font-condensed font-black text-base sm:text-[17px] text-white tracking-wide uppercase leading-[1.28] h-[44px] min-h-[44px] max-h-[44px] line-clamp-2 overflow-hidden drop-shadow-md">
                        ${fullDocTitle}
                    </h4>
                    <div class="flex items-center gap-2.5 mt-1.5 text-[10px]">
                        <span class="text-amber-300 font-bold"><svg class="inline-block w-3.5 h-3.5 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg> ${nat.pages} Trang A4</span>
                        <span class="text-emerald-300 font-bold inline-flex items-center gap-1"><svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${nat.rating} (${nat.reviewsCount})</span>
                        <span class="text-sky-200 font-bold">Google Drive</span>
                    </div>
                </div>

                <div class="relative z-10 flex items-center justify-between pt-2 border-t border-white/20">
                    <span class="text-[9.5px] font-black text-amber-400 uppercase tracking-wide flex items-center gap-1">
                        <span></span> CHUẨN ĐỀ THI ${docUniBadge} 2026
                    </span>
                    <span class="text-[9.5px] font-mono text-sky-200">
                        diepvientailieu.store
                    </span>
                </div>
            </div>

            <div class="p-3.5 bg-white dark:bg-[#0A143D] flex-1 flex flex-col justify-between gap-2.5">
                <div class="grid grid-cols-2 gap-1.5 w-full">
                    ${nat.tags.slice(0, 2).map(t => `<span class="text-[10px] font-bold bg-slate-100/90 dark:bg-white/10 text-slate-700 dark:text-slate-200 px-1.5 py-1.5 rounded-lg border border-slate-200/90 dark:border-white/10 text-center whitespace-nowrap overflow-hidden" title="${t}">${t}</span>`).join('')}
                </div>

                <div class="pt-2 border-t border-slate-100 dark:border-white/10">
                    <div class="flex items-baseline justify-between mb-2.5">
                        <div>
                            <span class="text-xl font-black text-[#0D1677] dark:text-amber-400 font-condensed tracking-wider">${nat.price.toLocaleString('vi-VN')}đ</span>
                            <span class="text-xs text-slate-400 line-through ml-1.5">${nat.originalPrice.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <span class="text-[9.5px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                            TIẾT KIỆM ${nat.discountPercent}%
                        </span>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="window.open('https://m.me/diepvientailieu','_blank')" class="px-3 py-2 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition">
                            <span>Hỏi Shop</span>
                        </button>
                        <button onclick="openDocCheckoutModal('${doc.id}', this.dataset.title)" data-title="${fullDocTitle.replace(/'/g, '&#39;').replace(/"/g, '&quot;')}" class="px-3 py-2 bg-[#0D1677] hover:bg-[#1E40AF] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1 transition">
                            <span>Mua Ngay</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadMoreDocumentsBatch() {
    const container = document.getElementById("docGridContainer");
    if (!container || currentDocRenderLimit >= currentFilteredDocsCache.length) return;

    const oldFooter = document.getElementById("docLoadMoreFooter");
    if (oldFooter) oldFooter.remove();

    const selectedUni = state.selectedUniversity ? UNIVERSITIES.find(u => u.id === state.selectedUniversity) : null;
    const nextEnd = Math.min(currentDocRenderLimit + DOC_RENDER_BATCH_SIZE, currentFilteredDocsCache.length);
    const slice = currentFilteredDocsCache.slice(currentDocRenderLimit, nextEnd);
    const fragmentHtml = slice.map((doc, i) => buildSingleDocumentCardHtml(doc, currentDocRenderLimit + i, selectedUni)).join('');
    currentDocRenderLimit = nextEnd;

    container.insertAdjacentHTML("beforeend", fragmentHtml);
    appendDocLoadMoreSentinelIfNeeded(container);
}

function appendDocLoadMoreSentinelIfNeeded(container) {
    if (docScrollObserver) {
        docScrollObserver.disconnect();
        docScrollObserver = null;
    }
    const remaining = currentFilteredDocsCache.length - currentDocRenderLimit;
    if (remaining <= 0) return;

    const footerHtml = `
        <div id="docLoadMoreFooter" class="col-span-full py-6 flex flex-col items-center justify-center">
            <button type="button" onclick="loadMoreDocumentsBatch()" class="px-6 py-3 bg-white dark:bg-[#0A143D] hover:bg-[#0D1677] hover:text-white text-[#0D1677] dark:text-amber-300 font-extrabold text-xs sm:text-sm rounded-2xl border-2 border-[#0D1677]/20 shadow-sm transition-all">
                Xem thêm đề cương (Còn ${remaining} tài liệu trong kho) ↓
            </button>
        </div>
    `;
    container.insertAdjacentHTML("beforeend", footerHtml);

    const footerEl = document.getElementById("docLoadMoreFooter");
    if (footerEl && typeof IntersectionObserver !== "undefined") {
        docScrollObserver = new IntersectionObserver((entries) => {
            if (entries.some(e => e.isIntersecting)) {
                loadMoreDocumentsBatch();
            }
        }, { rootMargin: "320px" });
        docScrollObserver.observe(footerEl);
    }
}

function renderDocuments(preserveScrollLimit = false) {
    const container = document.getElementById("docGridContainer");
    const countLabel = document.getElementById("docCountBadge");
    if (!container) return;

    const docs = filterDocuments();
    currentFilteredDocsCache = docs;
    if (!preserveScrollLimit) {
        currentDocRenderLimit = DOC_RENDER_BATCH_SIZE;
    }

    if (countLabel) {
        if (!state.searchQuery && (!state.activeCategory || state.activeCategory === 'all') && !state.selectedUniversity) {
            countLabel.textContent = `${Math.max(600, docs.length)}+ Đề Cương`;
        } else {
            countLabel.textContent = `${docs.length} Đề Cương`;
        }
    }

    if (docs.length === 0) {
        const fallbackBadge = UNIVERSITIES.find(u => u.id === state.selectedUniversity)?.code || "ĐẠI CƯƠNG TOÀN QUỐC";
        container.innerHTML = `
            <div class="col-span-full py-16 text-center bg-white dark:bg-[#0A143D] rounded-3xl border border-dashed border-slate-300 dark:border-white/10 p-8 shadow-sm">
                <div class="w-16 h-16 mx-auto bg-blue-50 text-[#0D1677] rounded-full flex items-center justify-center text-3xl mb-4"><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Chưa tìm thấy đề cương "${state.searchQuery || 'này'}"</h3>
                <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
                    Đừng lo! Điệp Viên Tài Liệu có kho tài liệu riêng đầy đủ mọi môn theo trường ${fallbackBadge}. Bạn hãy nhắn Zalo để nhân viên gửi link Google Drive cho bạn ngay nhé!
                </p>
                <button onclick="openChatModal()" class="inline-flex items-center gap-2 px-6 py-3 bg-[#0D1677] hover:bg-[#1E40AF] text-white font-bold rounded-xl shadow-lg transition">
                    <span><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Nhắn Zalo Đặt Lấy Đề Cương Ngay</span>
                </button>
            </div>
        `;
        return;
    }

    const selectedUni = state.selectedUniversity ? UNIVERSITIES.find(u => u.id === state.selectedUniversity) : null;
    const initialSlice = docs.slice(0, currentDocRenderLimit);
    container.innerHTML = initialSlice.map((doc, index) => buildSingleDocumentCardHtml(doc, index, selectedUni)).join('');
    appendDocLoadMoreSentinelIfNeeded(container);
}

function setDocCategory(cat) {

    state.activeCategory = cat;

    

    document.querySelectorAll(".cat-tab-btn").forEach(btn => {

        if (btn.dataset.cat === cat) {

            btn.className = "cat-tab-btn px-4 py-2 bg-[#0D1677] text-white font-bold text-xs rounded-xl shadow transition whitespace-nowrap";

        } else {

            btn.className = "cat-tab-btn px-4 py-2 bg-white dark:bg-[#0A143D] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 font-bold text-xs rounded-xl transition whitespace-nowrap";

        }

    });

    

    renderDocuments();

}



/* ==========================================================================

   3. CHECKOUT CHO ĐỀ CƯƠNG (MOMO QR INTEGRATED)

   ========================================================================== */



function syncDocCheckoutGoogleUi() {
    const cust = (typeof getSyncedCustomerLocal === "function" ? getSyncedCustomerLocal() : null) || {};
    const savedEmail = (cust.email || "").trim().toLowerCase();
    const savedName = (cust.name || "").trim();
    const savedPhone = (cust.phone || "").replace(/\[.*\]/g, "").trim();

    const bannerEl = document.getElementById("docGoogleLoggedBanner");
    const emailWrapEl = document.getElementById("docEmailInputWrap");
    const savedTxtEl = document.getElementById("docSavedAccountText");
    const emailInputEl = document.getElementById("checkoutEmailInput");
    const phoneInputEl = document.getElementById("checkoutPhoneInput");

    if (emailInputEl && savedEmail && !emailInputEl.value) emailInputEl.value = savedEmail;
    if (phoneInputEl && savedPhone && !phoneInputEl.value) phoneInputEl.value = savedPhone;

    if (savedEmail && savedEmail.includes("@")) {
        if (bannerEl) bannerEl.classList.remove("hidden");
        if (emailWrapEl) emailWrapEl.classList.add("hidden");
        if (savedTxtEl) savedTxtEl.textContent = savedName ? `${savedName} (${savedEmail})` : savedEmail;
        if (emailInputEl) emailInputEl.value = savedEmail;
    } else {
        if (bannerEl) bannerEl.classList.add("hidden");
        if (emailWrapEl) emailWrapEl.classList.remove("hidden");
    }
}

function onDocCheckoutContactInput() {
    const emailVal = (document.getElementById("checkoutEmailInput")?.value || "").trim().toLowerCase();
    const phoneVal = (document.getElementById("checkoutPhoneInput")?.value || "").replace(/\[.*\]/g, "").trim();
    try {
        if (phoneVal) localStorage.setItem("dvs_cust_phone", phoneVal);
        if (emailVal && emailVal.includes("@")) localStorage.setItem("dvtl_guest_checkout_email", emailVal);
    } catch (_) {}
    const cust = (typeof getSyncedCustomerLocal === "function" ? getSyncedCustomerLocal() : null) || {};
    if (isCustomerGoogleLoggedIn(cust) && phoneVal.length >= 9) {
        saveCustomerProfileEverywhere({ name: cust.name, phone: phoneVal, email: cust.email, verifiedByGoogle: true, source: "WEB_DOC_QR_INPUT" });
    }
}

function openDocCheckoutModal(docId, customTitle = null) {
    let doc = (typeof REAL_DOCUMENTS_DATABASE !== 'undefined' ? REAL_DOCUMENTS_DATABASE.find(d => d.id === docId) : null)
           || DOCUMENTS_DATABASE.find(d => d.id === docId);
    if (!doc) return;

    if (!doc.driveId && typeof REAL_DOCUMENTS_DATABASE !== 'undefined') {
        const codeU = String(doc.code || "").trim().toUpperCase();
        const strippedCode = codeU.replace(/\d+$/, "");
        const normBase = removeVietnameseTones(doc.baseName || "").replace(/\b(de|cuong|mon|hoc|phan|on|tap|ung|dung|full)\b/g, "").replace(/\s+/g, " ").trim();
        const matchedReal = REAL_DOCUMENTS_DATABASE.find(r => {
            const rCode = String(r.code || "").trim().toUpperCase();
            const rNorm = removeVietnameseTones(r.baseName || "").replace(/\b(de|cuong|mon|hoc|phan|on|tap)\b/g, "").replace(/\s+/g, " ").trim();
            return rCode === codeU || (strippedCode.length >= 2 && rCode === strippedCode) || (normBase.length >= 4 && (rNorm.includes(normBase) || normBase.includes(rNorm)));
        });
        if (matchedReal) {
            doc = { ...doc, code: matchedReal.code, driveId: matchedReal.driveId, driveType: matchedReal.driveType || "file", isReal: true };
        }
    }

    let uniInfo = null;
    const docDisc = typeof getDocDiscipline === 'function' ? getDocDiscipline(doc) : "DAI_CUONG";
    if (state.selectedUniversity) {
        const u = UNIVERSITIES.find(item => item.id === state.selectedUniversity);
        if (u && typeof getUniAllowedDisciplines === 'function' && getUniAllowedDisciplines(u.id, u.name).has(docDisc)) {
            uniInfo = u;
        }
    }
    if (!uniInfo && doc.university) {
        uniInfo = UNIVERSITIES.find(u => u.id === doc.university);
    }
    if (!uniInfo) uniInfo = UNIVERSITIES[0];

    const nat = typeof getNaturalWebDocStats === "function" ? getNaturalWebDocStats(doc, 0) : { pages: doc.pages || 28, price: doc.price || 50000 };
    const docDisplayName = customTitle || `Đề Cương ${doc.baseName} (${uniInfo.code})`;

    state.selectedDoc = {
        ...doc,
        pages: nat.pages,
        name: docDisplayName,
        school: uniInfo.code
    };

    const modal = document.getElementById("docCheckoutModal");
    if (!modal) return;

    document.getElementById("checkoutDocName").textContent = docDisplayName;
    document.getElementById("checkoutDocCode").textContent = `#${doc.code} · ${nat.pages} Trang A4`;
    document.getElementById("checkoutDocPrice").textContent = `${(doc.price || 50000).toLocaleString('vi-VN')} VNĐ`;

    const cleanDocCode = String(doc.code || "TL").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    const orderCode = `DC${cleanDocCode}${Math.floor(100 + Math.random() * 900)}`;
    document.getElementById("checkoutOrderCode").textContent = orderCode;
    document.getElementById("checkoutMemoCode").textContent = orderCode;

    const payAmountEl = document.getElementById("checkoutPayAmount");
    if (payAmountEl) payAmountEl.textContent = `${(doc.price || 50000).toLocaleString('vi-VN')} VNĐ`;

    syncDocCheckoutGoogleUi();
    layTaiKhoanVaHienQR(doc.price || 50000, orderCode);

    const cust = getSyncedCustomerLocal() || {};
    const savedEmail = (cust.email || "").trim().toLowerCase();
    const savedPhone = (cust.phone || "").replace(/\[.*\]/g, "").trim();
    const savedName = (cust.name || "").trim() || (savedEmail ? savedEmail.split("@")[0] : "Khách Hàng");

    const savedDigitsPhone = savedPhone.replace(/\D+/g, "");
    if (savedEmail.includes("@") && /^0\d{9,10}$/.test(savedDigitsPhone)) {
        const payload = {
            action: "createOrder",
            silent: "1",
            orderCode: orderCode,
            transferMemo: orderCode,
            name: savedName,
            email: savedEmail,
            phone: savedPhone,
            deviceId: getWebDeviceId(),
            sku: doc.code || "",
            itemName: docDisplayName,
            price: doc.price || 50000,
            bank: currentActiveAccount ? currentActiveAccount.bankName : "ACB",
            orderType: "Mua File",
            school: uniInfo.code,
            stkNhan: currentActiveAccount ? currentActiveAccount.accountNumber : "27820961",
            driveId: doc.driveId || ""
        };
        saveOrderToLocal(payload);
        try { sendWebhookData(payload); } catch(e) {}
    }

    const step1El = document.getElementById("docCheckoutStep1");
    if (step1El) step1El.classList.add("hidden");
    document.getElementById("docCheckoutStep2").classList.remove("hidden");
    document.getElementById("docCheckoutStep3").classList.add("hidden");

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    startDocPaymentPolling(orderCode, savedEmail);
}

let currentActiveAccount = null;

function getInstantCachedBankAccount() {
    if (currentActiveAccount && currentActiveAccount.accountNumber) return currentActiveAccount;
    try {
        const raw = localStorage.getItem("dvtl_active_bank_cache_v9");
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.accountNumber && parsed.bankCode) {
                currentActiveAccount = parsed;
                return parsed;
            }
        }
    } catch (_) {}
    currentActiveAccount = {
        bankName: (typeof PAYMENT_INFO !== "undefined" && PAYMENT_INFO.bankName) ? PAYMENT_INFO.bankName : "ACB",
        bankCode: (typeof PAYMENT_INFO !== "undefined" && PAYMENT_INFO.bankCode) ? PAYMENT_INFO.bankCode : "ACB",
        accountNumber: (typeof PAYMENT_INFO !== "undefined" && PAYMENT_INFO.accountNumber) ? PAYMENT_INFO.accountNumber : "27820961",
        accountName: (typeof PAYMENT_INFO !== "undefined" && PAYMENT_INFO.accountName) ? PAYMENT_INFO.accountName : "TRINH DUC THINH",
        cachedAt: 0
    };
    return currentActiveAccount;
}

function applyBankInfoToDocQrDom(acc, amount, encodedMemo) {
    const bankEl = document.getElementById("checkoutBankName");
    const stkEl = document.getElementById("checkoutSTK");
    const ctkEl = document.getElementById("checkoutCTK");
    const qrImg = document.getElementById("docQrImage");
    if (bankEl) bankEl.textContent = acc.bankName;
    if (stkEl) stkEl.textContent = acc.accountNumber;
    if (ctkEl) ctkEl.textContent = acc.accountName;
    if (qrImg) {
        const targetSrc = `https://img.vietqr.io/image/${acc.bankCode}-${acc.accountNumber}-compact2.png?amount=${amount}&addInfo=${encodedMemo}&accountName=${encodeURIComponent(acc.accountName)}`;
        if (qrImg.src !== targetSrc) qrImg.src = targetSrc;
    }
}

async function layTaiKhoanVaHienQR(amount, orderMemo) {
    const encodedMemo = encodeURIComponent(orderMemo || "");
    // Hiển thị mã QR NGAY LẬP TỨC trong 0ms từ bộ nhớ đệm!
    const instantAcc = getInstantCachedBankAccount();
    applyBankInfoToDocQrDom(instantAcc, amount, encodedMemo);

    // Chỉ kiểm tra cập nhật STK ngầm nếu cache đã quá 20 phút
    if (instantAcc.cachedAt && (Date.now() - instantAcc.cachedAt < 20 * 60 * 1000)) {
        return;
    }
    try {
        const res = await fetch(state.webhookUrl + "?action=getActiveAccount", { method: "GET", mode: "cors" });
        const acc = await res.json();
        if (acc && acc.accountNumber && !acc.error) {
            const freshAcc = {
                bankName: acc.bankName || "ACB",
                bankCode: acc.bankCode || "ACB",
                accountNumber: acc.accountNumber || "27820961",
                accountName: acc.accountName || "TRINH DUC THINH",
                cachedAt: Date.now()
            };
            const stkChanged = (freshAcc.accountNumber !== instantAcc.accountNumber || freshAcc.bankCode !== instantAcc.bankCode);
            currentActiveAccount = freshAcc;
            try { localStorage.setItem("dvtl_active_bank_cache_v9", JSON.stringify(freshAcc)); } catch (_) {}
            if (stkChanged) {
                applyBankInfoToDocQrDom(freshAcc, amount, encodedMemo);
            }
        }
    } catch (e) {}
}

function closeDocCheckoutModal() {
    if (docPollingInterval) { clearInterval(docPollingInterval); docPollingInterval = null; }
    if (window._docTimerInterval) { clearInterval(window._docTimerInterval); window._docTimerInterval = null; }
    const modal = document.getElementById("docCheckoutModal");
    if (modal) modal.classList.add("hidden");
    document.body.style.overflow = "auto";
}

function goToDocPaymentStep(e) {
    if (e && e.preventDefault) e.preventDefault();

    const cust = getSyncedCustomerLocal() || {};
    const nameEl = document.getElementById("checkoutNameInput");
    const rawPhone = (document.getElementById("checkoutPhoneInput")?.value || "").trim();
    const email = (document.getElementById("checkoutEmailInput")?.value || "").trim().toLowerCase();
    const phone = rawPhone.replace(/\[.*\]/g, "").trim();
    const name = (nameEl?.value || cust.name || "").trim() || (email ? email.split("@")[0] : "Khách Hàng");

    if (!phone || !email) {
        alert("Vui lòng nhập Email Gmail và số điện thoại Zalo để nhận hỗ trợ!");
        return;
    }

    if (!email.includes("@")) {
        alert("Vui lòng nhập địa chỉ Email chính xác để nhận link Google Drive!");
        return;
    }

    // Lưu Email & SĐT khách hàng để tự động điền cho các lần mua sau trên Web & App
    saveCustomerProfileEverywhere({ name, phone, email, source: "WEB_DOC_CHECKOUT" });

    const orderCode = document.getElementById("checkoutOrderCode").textContent.split(" ")[0].trim();
    const fullMemo = orderCode;
    document.getElementById("checkoutMemoCode").textContent = fullMemo;
    const savedTxt = document.getElementById("docSavedAccountText");
    if (savedTxt) savedTxt.textContent = `${phone} · ${email}`;
    layTaiKhoanVaHienQR(state.selectedDoc?.price || 50000, fullMemo);

    const payload = {
        action: "createOrder",
        orderCode: orderCode,
        transferMemo: fullMemo,
        name: name,
        email: email,
        phone: phone,
        sku: state.selectedDoc?.code || "",
        itemName: state.selectedDoc?.name || "",
        price: state.selectedDoc?.price || 0,
        bank: currentActiveAccount ? currentActiveAccount.bankName : "ACB",
        orderType: "Mua File",
        school: state.selectedDoc?.school || (state.selectedUniversity ? (UNIVERSITIES.find(u => u.id === state.selectedUniversity)?.code) : "Toàn quốc"),
        stkNhan: currentActiveAccount ? currentActiveAccount.accountNumber : "27820961",
        driveId: state.selectedDoc?.driveId || "",
        deviceId: getWebDeviceId()
    };
    saveOrderToLocal(payload);
    try { sendWebhookData(payload); } catch(e) {}

    document.getElementById("docCheckoutStep1").classList.add("hidden");
    document.getElementById("docCheckoutStep2").classList.remove("hidden");

    startDocPaymentPolling(orderCode, email);
}

let docPollingInterval = null;
let isDocVerifyInFlight = false;

function buildDocVerifyUrl(orderCode, email) {
    const cleanCode = String(orderCode || "").trim().split(" ")[0];
    const cust = typeof getSyncedCustomerLocal === "function" ? (getSyncedCustomerLocal() || {}) : {};
    const nameVal = (document.getElementById("checkoutNameInput")?.value || cust.name || "Khách Hàng").trim();
    const phoneVal = (document.getElementById("checkoutPhoneInput")?.value || cust.phone || "").replace(/\[.*\]/g, "").trim();
    const emailVal = (email || document.getElementById("checkoutEmailInput")?.value || cust.email || "").trim().toLowerCase();
    const skuVal = state.selectedDoc?.code || "";
    const itemNameVal = state.selectedDoc?.name || "";
    const amountVal = String(state.selectedDoc?.price || 50000);
    const driveIdVal = state.selectedDoc?.driveId || "";
    const devVal = typeof getWebDeviceId === "function" ? getWebDeviceId() : "";
    const params = new URLSearchParams({
        action: "verify",
        orderId: cleanCode,
        orderType: "Mua File",
        email: emailVal,
        name: nameVal,
        phone: phoneVal,
        sku: skuVal,
        itemName: itemNameVal,
        amount: amountVal,
        driveId: driveIdVal,
        deviceId: devVal
    });
    return `${state.webhookUrl}?${params.toString()}`;
}

function startDocPaymentPolling(orderCode, email) {
    if (docPollingInterval) clearInterval(docPollingInterval);
    isDocVerifyInFlight = false;
    let elapsed = 0;
    const timerEl = document.getElementById("docPaymentTimer");

    setTimeout(() => checkDocPaymentStatus(orderCode, email, false), 1500);

    const docDeadline = Date.now() + 15 * 60 * 1000;
    if (window._docTimerInterval) clearInterval(window._docTimerInterval);
    const updateDocTimer = () => {
        const remainSec = Math.max(0, Math.ceil((docDeadline - Date.now()) / 1000));
        const mins = Math.floor(remainSec / 60);
        const secs = remainSec % 60;
        if (timerEl) timerEl.textContent = `Thời gian giữ mã thanh toán: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
    updateDocTimer();
    window._docTimerInterval = setInterval(updateDocTimer, 1000);

    docPollingInterval = setInterval(() => {
        checkDocPaymentStatus(orderCode, email, false);
    }, 4000);
}

async function checkDocPaymentStatus(orderCode, email, isManual = false) {
    if (!state.webhookUrl || !orderCode) return;
    if (!isManual && isDocVerifyInFlight) return;
    isDocVerifyInFlight = true;
    try {
        const cleanCode = String(orderCode).trim().split(" ")[0];
        const verifyUrl = buildDocVerifyUrl(cleanCode, email);
        const res = await fetch(verifyUrl, { method: "GET", mode: "cors", cache: "no-store" });
        const data = await res.json();
        if (data && (data.verified === true || data.paid === true)) {
            onDocPaymentConfirmed(cleanCode, email || data.email || "", data.driveUrl || "");
            return true;
        }
    } catch (e) {
        // Silently retry on next interval
    } finally {
        isDocVerifyInFlight = false;
    }
    return false;
}

async function confirmDocManualPayment() {
    const cust = (typeof getSyncedCustomerLocal === "function" ? getSyncedCustomerLocal() : null) || {};
    const orderCode = (document.getElementById("checkoutOrderCode")?.textContent || "").trim().split(" ")[0];
    const emailInputEl = document.getElementById("checkoutEmailInput");
    const phoneInputEl = document.getElementById("checkoutPhoneInput");
    const email = (emailInputEl?.value || cust.email || "").trim().toLowerCase();
    const rawPhone = (phoneInputEl?.value || cust.phone || "").replace(/\[.*\]/g, "").trim();
    const digitsPhone = rawPhone.replace(/\D/g, "");
    const fbEl = document.getElementById("docVerifyFeedbackMsg");

    const hasGoogleLogged = Boolean(cust.email && cust.email.includes("@"));
    const finalEmail = (hasGoogleLogged ? cust.email : email).trim().toLowerCase();

    if (!finalEmail || !finalEmail.includes("@")) {
        if (fbEl) {
            fbEl.classList.remove("hidden");
            fbEl.textContent = "Vui lòng nhập Email Gmail để hệ thống phân phát tài liệu Google Drive!";
        }
        if (emailInputEl) emailInputEl.focus();
        alert("Vui lòng nhập Email Gmail để hệ thống phân phát tài liệu Google Drive!");
        return;
    }

    if (!/^0\d{9,10}$/.test(digitsPhone)) {
        if (fbEl) {
            fbEl.classList.remove("hidden");
            fbEl.textContent = "Bắt buộc nhập đúng số điện thoại Zalo (10 chữ số bắt đầu bằng số 0) để hoàn thành giao dịch!";
        }
        if (phoneInputEl) phoneInputEl.focus();
        alert("Bắt buộc nhập đúng số điện thoại Zalo (10 chữ số bắt đầu bằng số 0) để hoàn thành giao dịch!");
        return;
    }

    const name = (cust.name || "").trim() || finalEmail.split("@")[0];
    saveCustomerProfileEverywhere({ name, phone: digitsPhone, email: finalEmail, source: "WEB_DOC_CONFIRM" });

    const payload = {
        action: "createOrder",
        silent: "1",
        orderCode: orderCode,
        transferMemo: orderCode,
        name: name,
        email: finalEmail,
        phone: digitsPhone,
        sku: state.selectedDoc?.code || "",
        itemName: state.selectedDoc?.name || "",
        price: state.selectedDoc?.price || 50000,
        bank: currentActiveAccount ? currentActiveAccount.bankName : "ACB",
        orderType: "Mua File",
        school: state.selectedDoc?.school || "Toàn quốc",
        stkNhan: currentActiveAccount ? currentActiveAccount.accountNumber : "27820961",
        driveId: state.selectedDoc?.driveId || "",
        deviceId: getWebDeviceId()
    };
    saveOrderToLocal(payload);
    try { sendWebhookData(payload); } catch(e) {}

    if (fbEl) {
        fbEl.classList.remove("hidden");
        fbEl.textContent = " Đang đối soát giao dịch ngân hàng ACB & mở khóa Google Drive cho mã đơn #" + orderCode + "...";
    }
    if (!state.webhookUrl || !orderCode) return;
    try {
        const verifyUrl = buildDocVerifyUrl(orderCode, finalEmail) + '&manual=1';
        const res = await fetch(verifyUrl, { method: "GET", mode: "cors", cache: "no-store" });
        const data = await res.json();
        if (data && (data.verified === true || data.paid === true)) {
            onDocPaymentConfirmed(orderCode, email || data.email || "", data.driveUrl || "");
        } else if (fbEl) {
            fbEl.textContent = " Hệ thống đang chờ xác nhận chuyển khoản từ ngân hàng ACB cho mã #" + orderCode + " (" + email + " · " + rawPhone + "). Ngay khi tiền về sẽ tự động mở file Google Drive!";
        }
    } catch (e) {
        if (fbEl) {
            fbEl.textContent = " Đang kết nối máy chủ đối soát ACB cho mã #" + orderCode + ". Vui lòng đợi vài giây...";
        }
    }
}

function backToDocStep1() {

    if (docPollingInterval) { clearInterval(docPollingInterval); docPollingInterval = null; }
    if (window._docTimerInterval) { clearInterval(window._docTimerInterval); window._docTimerInterval = null; }

    document.getElementById("docCheckoutStep2").classList.add("hidden");

    document.getElementById("docCheckoutStep1").classList.remove("hidden");

}



/* ==========================================================================

   4. NHÁNH 2: THUÊ LÀM BTL / TIỂU LUẬN / BÁO CÁO

   ========================================================================== */



function initServiceCalculator() {

    const typeSelect = document.getElementById("srvTypeSelect");

    const pagesInput = document.getElementById("srvPagesInput");

    

    if (!typeSelect || !pagesInput) return;

    

    const updateCalc = () => {

        const type = typeSelect.value;

        const pages = parseInt(pagesInput.value) || 10;

        

        let pricePerP = 32000;

        if (type === "btl") pricePerP = 32000;

        else if (type === "tieu_luan") pricePerP = 22000;

        else if (type === "bao_cao") pricePerP = 45000;

        

        const totalEst = pages * pricePerP;

        const depositEst = Math.max(50000, Math.round(totalEst * 0.1));

        

        document.getElementById("calcPricePerP").textContent = `${pricePerP.toLocaleString('vi-VN')}đ / trang`;

        document.getElementById("calcTotalEst").textContent = `${totalEst.toLocaleString('vi-VN')} VNĐ`;

        document.getElementById("calcDepositEst").textContent = `${depositEst.toLocaleString('vi-VN')} VNĐ`;

        

        const cleanType = String(type || "BTL").replace(/[^A-Za-z0-9]/g, "").toUpperCase();

        const depositOrderCode = `COC${cleanType}${Math.floor(1000 + Math.random() * 9000)}`;

        document.getElementById("srvDepositCode").textContent = depositOrderCode;

    };

    

    typeSelect.addEventListener("change", updateCalc);

    pagesInput.addEventListener("input", updateCalc);

    

    const deadlineInput = document.getElementById("srvDeadlineInput");

    if (deadlineInput) {

        deadlineInput.addEventListener("change", (e) => {

            const val = e.target.value;

            if (!val) return;

            const chosenDate = new Date(val).getTime();

            const now = new Date().getTime();

            const diffHours = (chosenDate - now) / (1000 * 60 * 60);

            

            const urgentAlert = document.getElementById("srvUrgentAlert");

            if (diffHours > 0 && diffHours <= 24) {

                if (urgentAlert) urgentAlert.classList.remove("hidden");

            } else {

                if (urgentAlert) urgentAlert.classList.add("hidden");

            }

        });

    }

    

    updateCalc();

}



function initServiceFormPrefill() {

    if (state.selectedUniversity) {

        const uni = UNIVERSITIES.find(u => u.id === state.selectedUniversity);

        const schoolInput = document.getElementById("srvSchoolInput");

        if (schoolInput && uni) schoolInput.value = `${uni.code} - ${uni.name}`;

    }

    if (state.selectedFaculty) {

        const facultyInput = document.getElementById("srvFacultyInput");

        if (facultyInput) facultyInput.value = state.selectedFaculty;

    }

}



async function submitServiceOrder(e) {
    e.preventDefault();

    const cust = getSyncedCustomerLocal() || {};
    const name = (document.getElementById("srvNameInput").value.trim()) || cust.name || "";
    const rawPhone = (document.getElementById("srvPhoneInput").value.trim()) || cust.phone || "";
    const phone = rawPhone.replace(/\[.*\]/g, "").trim();
    const email = (document.getElementById("srvEmailInput").value.trim().toLowerCase()) || cust.email || "";
    const studentId = document.getElementById("srvStudentIdInput").value.trim();
    const school = document.getElementById("srvSchoolInput").value.trim();
    const faculty = document.getElementById("srvFacultyInput").value.trim();
    const subject = document.getElementById("srvSubjectInput").value.trim();
    const topic = document.getElementById("srvTopicInput").value.trim();
    const type = document.getElementById("srvTypeSelect").value;
    const pages = document.getElementById("srvPagesInput").value;
    const deadline = document.getElementById("srvDeadlineInput").value;
    const depositCode = document.getElementById("srvDepositCode").textContent.split(" ")[0].trim();
    const depositAmount = document.getElementById("calcDepositEst").textContent;
    const totalEst = document.getElementById("calcTotalEst").textContent;

    if (!name || !email || !deadline || !topic) {
        alert("Vui lòng điền đầy đủ Họ tên, Email, Tên đề tài và Hạn nộp (Deadline)!");
        return;
    }

    const privacyCheckbox = document.getElementById("srvPrivacyCheckbox");
    if (privacyCheckbox && !privacyCheckbox.checked) {
        alert("Bạn cần tích xác nhận thông tin chính xác và đồng ý điều khoản trước khi gửi yêu cầu đặt bài!");
        privacyCheckbox.focus();
        return;
    }

    // Lưu thông tin khách hàng ngay trên hệ thống để các lần sau không cần điền lại
    saveCustomerProfileEverywhere({ name, phone: rawPhone, email, source: "WEB_BTL_ORDER" });

    const btnSubmit = document.getElementById("btnSubmitServiceOrder");
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `<span class="inline-block animate-spin mr-2">↻</span> Đang gửi hồ sơ đặt bài...`;

    const cleanName = removeVietnameseTones(name).replace(/[^a-zA-Z0-9 ]/g, " ").toUpperCase().trim().slice(0, 18);
    const fullDepositMemo = `${depositCode} ${cleanName}`.trim();

    // Đọc file yêu cầu BTL khách đính kèm (nếu có) để đẩy thẳng lên Google Drive & dán link vào Sheet Tổng
    const attachments = [];
    try {
        const fileInp = document.getElementById("srvSupplementFile");
        const pickedFiles = fileInp && fileInp.files ? Array.from(fileInp.files).slice(0, 3) : [];
        for (const f of pickedFiles) {
            if (f.size > 10 * 1024 * 1024) continue;
            const b64 = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(String(reader.result || ""));
                reader.onerror = () => resolve("");
                reader.readAsDataURL(f);
            });
            if (b64) {
                attachments.push({ name: f.name, mimeType: f.type || "application/octet-stream", base64: b64 });
            }
        }
    } catch (_) {}

    const remainCode = depositCode.startsWith("COC") ? ("TT" + depositCode.slice(3)) : ("TT" + depositCode);
    const totalNum = Number(String(totalEst).replace(/[^0-9]/g, "")) || 0;
    const depNum = Number(String(depositAmount).replace(/[^0-9]/g, "")) || 50000;
    const remainNum = Math.max(0, totalNum - depNum);

    const payload = {
        type: "SERVICE_ORDER",
        orderId: depositCode,
        transferMemo: fullDepositMemo,
        remainCode: remainCode,
        remainAmt: remainNum,
        timestamp: new Date().toISOString(),
        paymentMethod: "ACB_VIETQR",
        attachments: attachments,
        customer: {
            name: name,
            phone: phone,
            email: email,
            studentId: studentId,
            school: school,
            faculty: faculty
        },
        assignment: {
            type: type,
            subject: subject,
            topic: topic,
            pages: pages,
            deadline: deadline,
            totalEst: totalEst,
            depositAmount: depositAmount
        }
    };

    saveOrderToLocal(payload);

    try {
        await sendWebhookData(payload);
    } catch (err) {
        console.warn("Webhook dispatched:", err);
    }

    // Gửi thêm email mời khách dùng miễn phí các tính năng AI trên App Điệp Viên Study
    sendAppInviteEmailAfterPurchase({
        email: email,
        name: name,
        orderCode: depositCode,
        itemName: `Đặt làm ${subject || topic}`
    });

    btnSubmit.disabled = false;
    btnSubmit.innerHTML = `<span>GỬI YÊU CẦU ĐẶT BÀI</span>`;

    openSuccessModal("SERVICE", payload);
}



/* ==========================================================================

   5. FAQ INTERACTIVE MODAL

   ========================================================================== */



function toggleFaqAccordion(faqIndex, ev) {
    if (ev) ev.stopPropagation();
    const ansBox = document.getElementById(`faqInlineAns_${faqIndex}`);
    const btnTxt = document.getElementById(`faqBtnLabel_${faqIndex}`);
    const chev = document.getElementById(`faqChevron_${faqIndex}`);
    if (ansBox) {
        const isHidden = ansBox.classList.contains("hidden");
        ansBox.classList.toggle("hidden", !isHidden);
        if (btnTxt) btnTxt.textContent = isHidden ? "Thu gọn giải đáp" : "Xem giải đáp chi tiết";
        if (chev) chev.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
    }
}

function openFaqDetailModal(faqIndex, ev) {
    if (ev) ev.stopPropagation();
    toggleFaqAccordion(faqIndex);
    const faq = (typeof FAQ_DATABASE !== "undefined") ? FAQ_DATABASE[faqIndex] : null;
    if (!faq) return;

    const modal = document.getElementById("faqDetailModal");
    const qElem = document.getElementById("faqModalQuestion");
    const aElem = document.getElementById("faqModalAnswer");

    if (qElem) qElem.textContent = faq.question;
    if (aElem) aElem.innerHTML = String(faq.answer || "").replace(/\n\n/g, "<br><br>").replace(/\n/g, "<br>");

    if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.body.style.overflow = "hidden";
    }
}



function closeFaqDetailModal() {

    const modal = document.getElementById("faqDetailModal");

    if (modal) modal.classList.add("hidden");

    document.body.style.overflow = "auto";

}



/* ==========================================================================

   6. LIVE SOCIAL PROOF STREAM

   ========================================================================== */



let proofIndex = 0;

function initLiveProofStream() {

    const toast = document.getElementById("liveProofToast");

    if (!toast) return;

    

    const showNextProof = () => {

        const item = RECENT_PURCHASES_STREAM[proofIndex % RECENT_PURCHASES_STREAM.length];

        proofIndex++;

        

        document.getElementById("toastCustomerName").textContent = item.name;

        document.getElementById("toastSchoolBadge").textContent = item.school;

        document.getElementById("toastItemName").textContent = item.item;

        document.getElementById("toastTimeAgo").textContent = item.time;

        

        toast.classList.add("toast-visible");

        

        setTimeout(() => {

            toast.classList.remove("toast-visible");

        }, 4500);

    };

    

    setTimeout(showNextProof, 2000);

    setInterval(showNextProof, 8500);

}



function dismissLiveProofToast() {

    const toast = document.getElementById("liveProofToast");

    if (toast) toast.classList.remove("toast-visible");

}



/* ==========================================================================

   7. WEBHOOK & PERSISTENCE

   ========================================================================== */



async function sendWebhookData(payload) {
    if (!state.webhookUrl || state.webhookUrl.includes("SAMPLE_WEBHOOK_URL")) {
        return { status: "MOCK_SUCCESS", message: "Đã lưu vào bộ nhớ cục bộ" };
    }
    try {
        const res = await fetch(state.webhookUrl, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload)
        });
        return await res.json().catch(() => ({ ok: true }));
    } catch (e) {
        try {
            if (payload && payload.action === "createOrder") {
                const q = new URLSearchParams({
                    action: "createOrder",
                    orderCode: payload.orderCode || payload.orderId || "",
                    orderType: payload.orderType || "Mua File",
                    name: payload.name || "Khách Hàng",
                    email: payload.email || "",
                    phone: payload.phone || "",
                    deviceId: payload.deviceId || "",
                    sku: payload.sku || "",
                    itemName: payload.itemName || "",
                    amount: String(payload.amount || payload.price || 50000),
                    driveId: payload.driveId || ""
                });
                fetch(`${state.webhookUrl}?${q.toString()}`, { method: "GET", mode: "no-cors" }).catch(() => {});
            }
        } catch (_) {}
        return fetch(state.webhookUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload)
        });
    }
}



function saveOrderToLocal(order) {

    state.orderHistory.unshift(order);

    if (state.orderHistory.length > 50) state.orderHistory.pop();

    localStorage.setItem("dvtl_orders", JSON.stringify(state.orderHistory));

    renderRecentOrdersTicker();

}



function renderRecentOrdersTicker() {

    const ticker = document.getElementById("recentOrdersTicker");

    if (!ticker) return;

    

    const sampleNames = ["Nguyễn Văn H***", "Trần Thị M***", "Lê Hoàng N***", "Phạm Thu T***", "Vũ Đức A***"];

    const sampleSchools = ["NEU", "FTU", "TMU", "AOF", "BKHN", "DAV", "UEH"];

    const sampleActions = ["vừa mua Đề Cương Kinh Tế Lượng", "vừa đặt viết BTL Quản Trị Học", "vừa nhận link Drive Triết Học", "vừa cọc Báo Cáo Thực Tập"];

    

    let tickerHtml = "";

    for (let i = 0; i < 6; i++) {

        const name = sampleNames[i % sampleNames.length];

        const school = sampleSchools[i % sampleSchools.length];

        const action = sampleActions[i % sampleActions.length];

        const timeAgo = `${Math.floor(Math.random() * 12) + 2} phút trước`;

        

        tickerHtml += `

            <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/15 mx-2 whitespace-nowrap">

                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>

                <strong>${name} (${school})</strong>

                <span class="text-slate-300">${action}</span>

                <span class="text-[10px] text-[#FFA000]">· ${timeAgo}</span>

            </div>

        `;

    }

    ticker.innerHTML = tickerHtml;

}



/* ==========================================================================

   8. MODALS & UTILITIES

   ========================================================================== */



// openSuccessModal & closeSuccessModal defined in Section 10 with live VietQR polling



function openChatModal(context = "") {

    window.open("https://zalo.me/0792453169", "_blank");

}



function copyToClipboard(text, elemId = null) {

    navigator.clipboard.writeText(text).then(() => {

        if (elemId) {

            const el = document.getElementById(elemId);

            if (el) {

                const oldText = el.textContent;

                el.textContent = "Đã copy!";

                setTimeout(() => el.textContent = oldText, 2000);

            }

        } else {

            alert("Đã sao chép: " + text);

        }

    });

}



function openSettingsModal() {

    const modal = document.getElementById("settingsModal");

    const input = document.getElementById("webhookUrlInput");

    if (input) input.value = state.webhookUrl;

    if (modal) modal.classList.remove("hidden");

}



function closeSettingsModal() {

    const modal = document.getElementById("settingsModal");

    if (modal) modal.classList.add("hidden");

}



function saveSettings() {

    const input = document.getElementById("webhookUrlInput");

    if (input) {

        state.webhookUrl = input.value.trim();

        localStorage.setItem("dvtl_webhook_url", state.webhookUrl);

        alert("Đã lưu cấu hình Google Apps Script Webhook!");

        closeSettingsModal();

    }

}



function initEventListeners() {

    const searchInput = document.getElementById("searchKeywordInput");

    if (searchInput) {

        searchInput.addEventListener("focus", () => {

            openHotSearchDropdown();

            filterHotSearches(searchInput.value);

        });



        searchInput.addEventListener("click", (e) => {

            e.stopPropagation();

            openHotSearchDropdown();

            filterHotSearches(searchInput.value);

        });



        searchInput.addEventListener("input", () => {

            const val = searchInput.value;

            const clearBtn = document.getElementById("searchKeywordClearBtn");

            if (clearBtn) {

                if (val.trim()) clearBtn.classList.remove("hidden");

                else clearBtn.classList.add("hidden");

            }

            openHotSearchDropdown();

            filterHotSearches(val);

            executeDocSearch();

        });



        searchInput.addEventListener("keydown", (e) => {

            if (e.key === "Enter") {

                closeHotSearchDropdown();

                executeDocSearch();

            } else if (e.key === "Escape") {

                closeHotSearchDropdown();

            }

        });

    }



    // Điều hướng chuyển tab menu bằng phím mũi tên trái / phải (ArrowLeft / ArrowRight)

    document.addEventListener("keydown", (e) => {

        // Không bắt phím khi người dùng đang nhập liệu trong form / ô tìm kiếm

        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";

        if (["input", "textarea", "select"].includes(activeTag) || (document.activeElement && document.activeElement.isContentEditable)) {

            return;

        }



        // Bỏ qua nếu có modal đang mở

        const settingsModal = document.getElementById("settingsModal");

        if (settingsModal && !settingsModal.classList.contains("hidden")) return;

        const courseModal = document.getElementById("courseCheckoutModal");

        if (courseModal && !courseModal.classList.contains("hidden")) return;



        if (e.key === "ArrowLeft") {

            e.preventDefault();

            navigateNavTab(-1);

        } else if (e.key === "ArrowRight") {

            e.preventDefault();

            navigateNavTab(1);

        }

    });

}



/* ==========================================================================

   COURSES MODULE: RENDER, FILTER, CHECKOUT (ĐỒNG BỘ 100% GIAO DIỆN APP ĐIỆP VIÊN STUDY)

   ========================================================================== */



let activeCourseCategory = "all";

let activeCourseTierFilter = "all";

let selectedCourseForCheckout = null;

let pendingWebCoverCourseId = null;



const WEB_COURSE_TAB_LABELS = {
    "all": "Tất cả (82+ Khóa)",
    "ngoai_ngu_khxh": "Văn · Sử · Địa · Anh · Trung",
    "khtn_toan_ly_hoa_sinh": "Toán · Lý · Hóa · Sinh",
    "tin_hoc_mos_dai_hoc": "Tin MOS · Kinh Tế Lượng · ĐH",
    "nghe_thuat_am_nhac": "Guitar · Piano · Nghệ Thuật",
    "dgnl_hsa": "ĐGNL HSA",
    "dgtd_tsa": "ĐGTD TSA",
    "dgnl_vact_bca": "V-ACT · BCA · QDA · VSAT",
    "lop12_2k9": "Lớp 12 (2K9)",
    "lop11_2k10": "Lớp 11 (2K10)"
};



function getWebCourseCustomCovers() {

    try {

        const raw = localStorage.getItem("dvs_course_custom_covers");

        return raw ? JSON.parse(raw) : {};

    } catch (_) {

        return {};

    }

}



function triggerWebCourseCoverUpload(event, courseId) {

    if (event) event.stopPropagation();

    pendingWebCoverCourseId = courseId;

    const inp = document.getElementById("webCourseCoverInput");

    if (inp) {

        inp.value = "";

        inp.click();

    }

}



function handleWebCourseCoverChange(event) {

    const file = event?.target?.files?.[0];

    const targetId = pendingWebCoverCourseId;

    if (!file || !targetId) return;

    const reader = new FileReader();

    reader.onload = () => {

        const dataUrl = typeof reader.result === "string" ? reader.result : "";

        if (!dataUrl) return;

        const next = { ...getWebCourseCustomCovers(), [targetId]: dataUrl };

        try {

            localStorage.setItem("dvs_course_custom_covers", JSON.stringify(next));

        } catch (_) {}

        renderCourses();

    };

    reader.readAsDataURL(file);

}



let _webCourseComboboxesInited = false;
function renderCourseCategoryTabs() {
    if (!_webCourseComboboxesInited && typeof initWebCourseComboboxes === "function") {
        _webCourseComboboxesInited = true;
        try { initWebCourseComboboxes(); } catch (_) {}
    } else {
        try { if (typeof renderWebSubjTrigger === "function") renderWebSubjTrigger(); } catch (_) {}
        try { if (typeof renderWebProgTrigger === "function") renderWebProgTrigger(); } catch (_) {}
    }

    const container = document.getElementById("courseCategoryTabs");

    if (!container || typeof COURSE_CATEGORIES === "undefined") return;



    container.innerHTML = COURSE_CATEGORIES.filter(cat => cat.id !== "combo_full").map(cat => {

        const isActive = cat.id === activeCourseCategory;

        const label = WEB_COURSE_TAB_LABELS[cat.id] || cat.name;

        const activeClass = isActive

            ? "bg-[#0D1677] text-white shadow-sm"

            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10";

        return `<button type="button" onclick="filterCoursesByCategory('${cat.id}')" class="px-3 py-1.5 text-xs font-bold rounded-lg transition whitespace-nowrap ${activeClass}">

            ${label}

        </button>`;

    }).join("");

}



function filterCoursesByCategory(categoryId) {
    activeCourseCategory = categoryId;
    if (categoryId === "all") {
        activeWebCourseSubject = "ALL";
        activeWebCourseProgram = "ALL";
    } else {
        activeWebCourseProgram = categoryId;
    }
    const subjSel = document.getElementById("courseSubjectSelect");
    if (subjSel && categoryId === "all") subjSel.value = "ALL";
    const progSel = document.getElementById("courseProgramSelect");
    if (progSel) {
        if (categoryId === "all") {
            progSel.value = "ALL";
        } else {
            const opt = progSel.querySelector(`option[value*="${categoryId}"]`);
            if (opt) progSel.value = opt.value;
        }
    }
    renderCourseCategoryTabs();
    renderCourses();
}



function getWebDeviceId() {

    let devId = localStorage.getItem("dvtl_web_device_id");

    if (!devId) {

        const raw = [

            navigator.userAgent || "",

            navigator.language || "",

            screen.width + "x" + screen.height,

            Intl.DateTimeFormat().resolvedOptions().timeZone || ""

        ].join("|");

        let h = 2166136261;

        for (let i = 0; i < raw.length; i++) {

            h ^= raw.charCodeAt(i);

            h = Math.imul(h, 16777619);

        }

        const rand = Math.random().toString(36).substring(2, 6).toUpperCase();

        devId = "DVS-WB-" + (h >>> 0).toString(16).toUpperCase().padStart(8, "0") + rand;

        localStorage.setItem("dvtl_web_device_id", devId);

    }

    return devId;

}



function expandWebUnlockedCourses(rawList) {

    const set = new Set((rawList || []).map(x => String(x || "").trim().toUpperCase()).filter(Boolean));

    if (set.has("ALL-COURSES-399K") || set.has("COURSE-FULL-399K") || set.has("FULL-COMBO-399K") || set.has("__ALL_COURSES_399K__")) {

        set.add("ALL-COURSES-399K");

        set.add("__ALL_COURSES_399K__");

        if (typeof COURSES_DATABASE !== "undefined") {

            COURSES_DATABASE.forEach(c => set.add(c.id.toUpperCase()));

        }

        return Array.from(set);

    }

    const initial = Array.from(set);

    if (typeof COURSES_DATABASE !== "undefined") {

        initial.forEach(k => {

            COURSES_DATABASE.forEach(c => {

                if (String(c.parentCourseId || "").toUpperCase() === k || String(c.parentSubjectId || "").toUpperCase() === k) {

                    set.add(c.id.toUpperCase());

                }

            });

        });

    }

    return Array.from(set);

}



function isWebCourseUnlocked(courseId) {
    const _admCust = typeof getSyncedCustomerLocal === "function" ? (getSyncedCustomerLocal() || {}) : {};
    if (_admCust.isAdmin || _admCust.email === "diepvientailieu@gmail.com" ) return true;

    const cust = getSyncedCustomerLocal();

    if (!cust || !Array.isArray(cust.unlockedCourses)) return false;

    const expanded = expandWebUnlockedCourses(cust.unlockedCourses);

    return expanded.includes("ALL-COURSES-399K") || expanded.includes("__ALL_COURSES_399K__") || expanded.includes(String(courseId || "").toUpperCase());

}



function openCourseCheckoutModalByTier(tier) {
    if (typeof COURSES_DATABASE === "undefined") return;
    if (tier === "full_399k") {
        window._isGenericTierCheckout = false;
        window._isGenericTierCheckoutTriggered = false;
        openCourseCheckoutModal("ALL-COURSES-399K");
    } else if (tier === "subject_69k") {
        window._isGenericTierCheckout = true;
        window._isGenericTierCheckoutTriggered = true;
        const firstSubj = COURSES_DATABASE.find(c => c.tier === "subject_69k" || String(c.id).startsWith("K69-")) || COURSES_DATABASE[0];
        openCourseCheckoutModal(firstSubj ? firstSubj.id : "K69-TOAN-DUC");
    } else {
        window._isGenericTierCheckout = true;
        window._isGenericTierCheckoutTriggered = true;
        const first199 = COURSES_DATABASE.find(c => !c.isPackageOnly && (c.tier === "course_199k" || String(c.id).startsWith("C199-"))) || COURSES_DATABASE[1] || COURSES_DATABASE[0];
        openCourseCheckoutModal(first199 ? first199.id : "C199-KHTN1");
    }
}

let activeWebCourseSubject = "ALL";
let activeWebCourseProgram = "ALL";


/* ==========================================================================
   DVS SEARCHABLE CUSTOM COMBOBOX SYSTEM (100% IDENTICAL TO DESKTOP APP)
   ========================================================================== */

const DVS_WEB_SUBJECT_OPTIONS = [
  { id: "ALL", badge: "TẤT CẢ", name: "Tất cả các môn học (37 khóa)", iconKey: "all" },
  { id: "TOAN", badge: "TOÁN HỌC", name: "Môn Toán (Đỗ Văn Đức · Nguyễn Phan Tiến · Shiper · MapStudy)", iconKey: "toan" },
  { id: "LY", badge: "VẬT LÝ", name: "Môn Vật Lý (Chu Văn Biên · Thắng Tiến IPClass · Lê Tùng Ưng)", iconKey: "ly" },
  { id: "HOA", badge: "HÓA HỌC", name: "Môn Hóa Học (Phạm Văn Trọng · Vũ Khắc Ngọc · Tống Thị Son)", iconKey: "hoa" },
  { id: "SINH", badge: "SINH HỌC", name: "Môn Sinh Học (Phan Khắc Nghệ · Ánh Dương)", iconKey: "sinh" },
  { id: "VAN", badge: "NGỮ VĂN", name: "Môn Ngữ Văn (Cô Sương Mai · HocMai Nền Tảng)", iconKey: "van" },
  { id: "ANH", badge: "TIẾNG ANH", name: "Môn Tiếng Anh (Vũ Mai Phương · Phạm Liễu · HocMai)", iconKey: "anh" },
  { id: "SU", badge: "LỊCH SỬ", name: "Môn Lịch Sử (Cô Lan Hương · Cô Hương Sen)", iconKey: "su" },
  { id: "DIA", badge: "ĐỊA LÝ", name: "Môn Địa Lý (Thầy Đàm Thanh Tùng · Thầy Tài)", iconKey: "dia" },
  { id: "HSA", badge: "ĐGNL HSA", name: "ĐGNL HSA ĐHQG Hà Nội (HocMai · MapStudy · Empire · HSA Edu)", iconKey: "hsa_tsa" },
  { id: "TSA", badge: "ĐGTD TSA", name: "ĐGTD TSA Bách Khoa (BMC · HocMai)", iconKey: "hsa_tsa" },
  { id: "VACT", badge: "ĐGNL V-ACT", name: "ĐGNL V-ACT ĐHQG TP.HCM (HocMai · Empire · MapStudy)", iconKey: "vact_bca" }
];

const DVS_WEB_PROGRAM_OPTIONS = [
  { id: "ALL", badge: "TẤT CẢ", name: "Tất cả các khóa học & kỳ thi (37 khóa)", iconKey: "all" },
  { id: "PROG:khtn", badge: "COMBO KHTN", name: "Combo Khối Tự Nhiên KHTN (Toán · Lý · Hóa · Sinh)", iconKey: "toan" },
  { id: "PROG:khxh", badge: "COMBO KHXH", name: "Combo Khối Xã Hội KHXH (Văn · Sử · Địa · Anh)", iconKey: "van" },
  { id: "PROG:dgnl_hsa", badge: "ĐGNL HSA", name: "Khóa Luyện Thi ĐGNL HSA — ĐHQG Hà Nội (5 khóa)", iconKey: "hsa_tsa" },
  { id: "PROG:dgtd_tsa", badge: "ĐGTD TSA", name: "Khóa Luyện Thi ĐGTD TSA — ĐH Bách Khoa Hà Nội (3 khóa)", iconKey: "hsa_tsa" },
  { id: "PROG:vact", badge: "ĐGNL V-ACT", name: "Khóa Luyện Thi ĐGNL V-ACT — ĐHQG TP.HCM (4 khóa)", iconKey: "vact_bca" },
  { id: "PROG:thptqg", badge: "THPTQG 12", name: "Khóa Luyện Thi Tốt Nghiệp THPT 2K9 (Toán, Lý, Hóa, Sinh, Văn, Anh, Sử, Địa)", iconKey: "dai_hoc" },
  { id: "PROG:single_69k", badge: "KHÓA LẺ 69K", name: "Khóa Lẻ 69K Từng Thầy Cô (Toán, Lý, Hóa, Sinh, Văn, Anh, Sử, Địa)", iconKey: "all" },
  { id: "PROG:combo_199k", badge: "COMBO 199K", name: "Combo 199K Khối KHTN, KHXH & Kỳ Thi ĐGNL / ĐGTD (7 khóa)", iconKey: "hsa_tsa" }
];

function getDvsIconThemeByKey(iconKey) {
  switch (iconKey) {
    case "toan": return { color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE", pillBg: "#DBEAFE", pillColor: "#1E40AF" };
    case "van": return { color: "#BE123C", bg: "#FFF1F2", border: "#FECDD3", pillBg: "#FFE4E6", pillColor: "#9F1239" };
    case "anh": return { color: "#0284C7", bg: "#F0F9FF", border: "#BAE6FD", pillBg: "#E0F2FE", pillColor: "#075985" };
    case "ly": return { color: "#D97706", bg: "#FFFBEB", border: "#FDE68A", pillBg: "#FEF3C7", pillColor: "#92400E" };
    case "hoa": return { color: "#059669", bg: "#ECFDF5", border: "#A7F3D0", pillBg: "#D1FAE5", pillColor: "#065F46" };
    case "sinh": return { color: "#16A34A", bg: "#F0FDF4", border: "#BBF7D0", pillBg: "#DCFCE7", pillColor: "#166534" };
    case "su": return { color: "#B45309", bg: "#FFF7ED", border: "#FED7AA", pillBg: "#FFEDD5", pillColor: "#9A3412" };
    case "dia": return { color: "#0891B2", bg: "#ECFEFF", border: "#A5F3FC", pillBg: "#CFFAFE", pillColor: "#155E75" };
    case "trung": return { color: "#DC2626", bg: "#FEF2F2", border: "#FECACA", pillBg: "#FEE2E2", pillColor: "#991B1B" };
    case "hsa_tsa": return { color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE", pillBg: "#EDE9FE", pillColor: "#5B21B6" };
    case "vact_bca": return { color: "#0F766E", bg: "#F0FDFA", border: "#99F6E4", pillBg: "#CCFBF1", pillColor: "#115E59" };
    case "tin_mos": return { color: "#4338CA", bg: "#EEF2FF", border: "#C7D2FE", pillBg: "#E0E7FF", pillColor: "#3730A3" };
    case "dai_hoc": return { color: "#0D1677", bg: "#EFF6FF", border: "#BFDBFE", pillBg: "#DBEAFE", pillColor: "#1E3A8A" };
    case "nghe_thuat": return { color: "#DB2777", bg: "#FDF2F8", border: "#FBCFE8", pillBg: "#FCE7F3", pillColor: "#9D174D" };
    default: return { color: "#0D1677", bg: "#F8FAFC", border: "#CBD5E1", pillBg: "#E2E8F0", pillColor: "#0F172A" };
  }
}

function renderDvsSubjectCourseSvgHtml(iconKey, size = 15) {
  const p = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;
  switch (iconKey) {
    case "toan":
      return `<svg ${p}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="11" x2="10" y2="11"/><line x1="14" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="10" y2="15"/><line x1="14" y1="15" x2="16" y2="15"/></svg>`;
    case "van":
      return `<svg ${p}><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>`;
    case "anh":
      return `<svg ${p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
    case "ly":
      return `<svg ${p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
    case "hoa":
      return `<svg ${p}><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>`;
    case "sinh":
      return `<svg ${p}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`;
    case "su":
      return `<svg ${p}><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`;
    case "dia":
      return `<svg ${p}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`;
    case "trung":
      return `<svg ${p}><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`;
    case "hsa_tsa":
      return `<svg ${p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;
    case "vact_bca":
      return `<svg ${p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`;
    case "tin_mos":
      return `<svg ${p}><rect width="18" height="12" x="3" y="4" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`;
    case "dai_hoc":
      return `<svg ${p}><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/></svg>`;
    case "nghe_thuat":
      return `<svg ${p}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
    default:
      return `<svg ${p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`;
  }
}

let webSubjDropdownOpen = false;
let webProgDropdownOpen = false;
let webSubjSearchQuery = "";
let webProgSearchQuery = "";

function renderWebSubjTrigger() {
  const left = document.getElementById("webSubjTriggerLeft");
  const clearBtn = document.getElementById("webSubjClearBtn");
  const chevron = document.getElementById("webSubjChevron");
  if (!left) return;

  const item = DVS_WEB_SUBJECT_OPTIONS.find(s => s.id === activeWebCourseSubject) || DVS_WEB_SUBJECT_OPTIONS[0];
  const th = getDvsIconThemeByKey(item.iconKey);

  left.innerHTML = `
    <span class="dvs-uni-icon-box" style="color: ${th.color};">
      ${renderDvsSubjectCourseSvgHtml(item.iconKey, 14)}
    </span>
    <span class="dvs-uni-code-pill" style="background: ${th.pillBg}; color: ${th.pillColor};">
      ${item.badge}
    </span>
    <span class="dvs-uni-name-text">
      ${item.name}
    </span>
  `;

  if (clearBtn) {
    if (activeWebCourseSubject !== "ALL") {
      clearBtn.classList.remove("hidden");
    } else {
      clearBtn.classList.add("hidden");
    }
  }
  if (chevron) {
    chevron.textContent = webSubjDropdownOpen ? "" : "";
  }
}

function renderWebSubjOptions(q = "") {
  const list = document.getElementById("webSubjOptionsList");
  if (!list) return;

  const qNorm = (typeof removeVietnameseTones === "function" ? removeVietnameseTones(q) : q).toLowerCase().trim();
  const filtered = DVS_WEB_SUBJECT_OPTIONS.filter(opt => {
    if (!qNorm) return true;
    const hay = `${opt.badge} ${opt.name} ${opt.id}`.toLowerCase();
    const hayNorm = typeof removeVietnameseTones === "function" ? removeVietnameseTones(hay) : hay;
    return hay.includes(qNorm) || hayNorm.includes(qNorm);
  });

  if (filtered.length === 0) {
    list.innerHTML = `<div class="p-3 text-center text-xs text-slate-400 font-medium">Không tìm thấy môn học phù hợp</div>`;
    return;
  }

  list.innerHTML = filtered.map(opt => {
    const isSel = opt.id === activeWebCourseSubject;
    const th = getDvsIconThemeByKey(opt.iconKey);
    return `
      <div class="dvs-uni-option-row ${isSel ? 'selected' : ''}" onclick="selectWebSubj('${opt.id}')">
        <span class="dvs-uni-icon-box" style="color: ${th.color};">
          ${renderDvsSubjectCourseSvgHtml(opt.iconKey, 14)}
        </span>
        <span class="dvs-uni-code-pill" style="background: ${th.pillBg}; color: ${th.pillColor};">
          ${opt.badge}
        </span>
        <span class="dvs-uni-name-text">
          ${opt.name}
        </span>
        ${isSel ? '<span class="dvs-uni-check"></span>' : ''}
      </div>
    `;
  }).join("");
}

function toggleWebSubjDropdown(e) {
  if (e) e.stopPropagation();
  webSubjDropdownOpen = !webSubjDropdownOpen;
  webProgDropdownOpen = false;

  const panel = document.getElementById("webSubjDropdownPanel");
  const progPanel = document.getElementById("webProgDropdownPanel");
  if (progPanel) progPanel.classList.add("hidden");

  if (panel) {
    if (webSubjDropdownOpen) {
      panel.classList.remove("hidden");
      renderWebSubjOptions(webSubjSearchQuery);
      setTimeout(() => {
        const inp = document.getElementById("webSubjFilterInput");
        if (inp) inp.focus();
      }, 50);
    } else {
      panel.classList.add("hidden");
    }
  }
  renderWebSubjTrigger();
  renderWebProgTrigger();
}

function handleWebSubjSearch(val) {
  webSubjSearchQuery = val || "";
  renderWebSubjOptions(webSubjSearchQuery);
}

function selectWebSubj(id) {
  activeWebCourseSubject = id || "ALL";
  webSubjDropdownOpen = false;
  webSubjSearchQuery = "";
  const panel = document.getElementById("webSubjDropdownPanel");
  if (panel) panel.classList.add("hidden");
  const inp = document.getElementById("webSubjFilterInput");
  if (inp) inp.value = "";

  renderWebSubjTrigger();
  renderCourses();
}

function clearWebSubjFilter(e) {
  if (e) e.stopPropagation();
  selectWebSubj("ALL");
}

function renderWebProgTrigger() {
  const left = document.getElementById("webProgTriggerLeft");
  const clearBtn = document.getElementById("webProgClearBtn");
  const chevron = document.getElementById("webProgChevron");
  if (!left) return;

  const item = DVS_WEB_PROGRAM_OPTIONS.find(p => p.id === activeWebCourseProgram) || DVS_WEB_PROGRAM_OPTIONS[0];
  const th = getDvsIconThemeByKey(item.iconKey);

  left.innerHTML = `
    <span class="dvs-uni-icon-box" style="color: ${th.color};">
      ${renderDvsSubjectCourseSvgHtml(item.iconKey, 14)}
    </span>
    <span class="dvs-uni-code-pill" style="background: ${th.pillBg}; color: ${th.pillColor};">
      ${item.badge}
    </span>
    <span class="dvs-uni-name-text">
      ${item.name}
    </span>
  `;

  if (clearBtn) {
    if (activeWebCourseProgram !== "ALL") {
      clearBtn.classList.remove("hidden");
    } else {
      clearBtn.classList.add("hidden");
    }
  }
  if (chevron) {
    chevron.textContent = webProgDropdownOpen ? "" : "";
  }
}

function renderWebProgOptions(q = "") {
  const list = document.getElementById("webProgOptionsList");
  if (!list) return;

  const qNorm = (typeof removeVietnameseTones === "function" ? removeVietnameseTones(q) : q).toLowerCase().trim();
  const filtered = DVS_WEB_PROGRAM_OPTIONS.filter(opt => {
    if (!qNorm) return true;
    const hay = `${opt.badge} ${opt.name} ${opt.id}`.toLowerCase();
    const hayNorm = typeof removeVietnameseTones === "function" ? removeVietnameseTones(hay) : hay;
    return hay.includes(qNorm) || hayNorm.includes(qNorm);
  });

  if (filtered.length === 0) {
    list.innerHTML = `<div class="p-3 text-center text-xs text-slate-400 font-medium">Không tìm thấy khóa học phù hợp</div>`;
    return;
  }

  list.innerHTML = filtered.map(opt => {
    const isSel = opt.id === activeWebCourseProgram;
    const th = getDvsIconThemeByKey(opt.iconKey);
    return `
      <div class="dvs-uni-option-row ${isSel ? 'selected' : ''}" onclick="selectWebProg('${opt.id}')">
        <span class="dvs-uni-icon-box" style="color: ${th.color};">
          ${renderDvsSubjectCourseSvgHtml(opt.iconKey, 14)}
        </span>
        <span class="dvs-uni-code-pill" style="background: ${th.pillBg}; color: ${th.pillColor};">
          ${opt.badge}
        </span>
        <span class="dvs-uni-name-text">
          ${opt.name}
        </span>
        ${isSel ? '<span class="dvs-uni-check"></span>' : ''}
      </div>
    `;
  }).join("");
}

function toggleWebProgDropdown(e) {
  if (e) e.stopPropagation();
  webProgDropdownOpen = !webProgDropdownOpen;
  webSubjDropdownOpen = false;

  const panel = document.getElementById("webProgDropdownPanel");
  const subjPanel = document.getElementById("webSubjDropdownPanel");
  if (subjPanel) subjPanel.classList.add("hidden");

  if (panel) {
    if (webProgDropdownOpen) {
      panel.classList.remove("hidden");
      renderWebProgOptions(webProgSearchQuery);
      setTimeout(() => {
        const inp = document.getElementById("webProgFilterInput");
        if (inp) inp.focus();
      }, 50);
    } else {
      panel.classList.add("hidden");
    }
  }
  renderWebProgTrigger();
  renderWebSubjTrigger();
}

function handleWebProgSearch(val) {
  webProgSearchQuery = val || "";
  renderWebProgOptions(webProgSearchQuery);
}

function selectWebProg(id) {
  activeWebCourseProgram = id || "ALL";
  webProgDropdownOpen = false;
  webProgSearchQuery = "";
  const panel = document.getElementById("webProgDropdownPanel");
  if (panel) panel.classList.add("hidden");
  const inp = document.getElementById("webProgFilterInput");
  if (inp) inp.value = "";

  renderWebProgTrigger();
  renderCourses();
}

function clearWebProgFilter(e) {
  if (e) e.stopPropagation();
  selectWebProg("ALL");
}

function initWebCourseComboboxes() {
  renderWebSubjTrigger();
  renderWebProgTrigger();

  // Close dropdowns on outside click
  document.addEventListener("click", (e) => {
    const subjWrap = document.getElementById("webSubjComboboxContainer");
    const progWrap = document.getElementById("webProgComboboxContainer");

    if (subjWrap && !subjWrap.contains(e.target) && webSubjDropdownOpen) {
      webSubjDropdownOpen = false;
      const panel = document.getElementById("webSubjDropdownPanel");
      if (panel) panel.classList.add("hidden");
      renderWebSubjTrigger();
    }
    if (progWrap && !progWrap.contains(e.target) && webProgDropdownOpen) {
      webProgDropdownOpen = false;
      const panel = document.getElementById("webProgDropdownPanel");
      if (panel) panel.classList.add("hidden");
      renderWebProgTrigger();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (webSubjDropdownOpen) {
        webSubjDropdownOpen = false;
        const panel = document.getElementById("webSubjDropdownPanel");
        if (panel) panel.classList.add("hidden");
        renderWebSubjTrigger();
      }
      if (webProgDropdownOpen) {
        webProgDropdownOpen = false;
        const panel = document.getElementById("webProgDropdownPanel");
        if (panel) panel.classList.add("hidden");
        renderWebProgTrigger();
      }
    }
  });
}

function doesCourseMatchSubject(course, subj) {
    if (!subj || subj === "ALL") return true;
    const t = `${course.id} ${course.title} ${course.instructor} ${course.groupName || ""} ${course.categoryLabel || ""}`.toLowerCase();
    switch (subj) {
        case "TOAN": return t.includes("toán") || t.includes("toan");
        case "VAN": return t.includes("văn") || t.includes("van");
        case "ANH": return t.includes("tiếng anh") || t.includes("anh12") || t.includes("anh");
        case "LY": return t.includes("vật lý") || t.includes("ly12") || t.includes("vật lí") || t.includes("ly");
        case "HOA": return t.includes("hóa") || t.includes("hoa12");
        case "SINH": return t.includes("sinh") || t.includes("sinh12");
        case "SU": return t.includes("lịch sử") || t.includes("su12") || t.includes("sử");
        case "DIA": return t.includes("địa") || t.includes("dia12");
        case "HSA": return t.includes("hsa");
        case "TSA": return t.includes("tsa");
        case "VACT": return t.includes("v-act") || t.includes("vact");
        default: return true;
    }
}

function doesCourseMatchProgram(course, prog) {
    if (!prog || prog === "ALL") return true;
    const p = prog.replace("PROG:", "");
    const t = `${course.id} ${course.title} ${course.instructor} ${course.groupName || ""} ${course.tier || ""}`.toLowerCase();
    if (p === "khtn") return t.includes("khtn");
    if (p === "khxh") return t.includes("khxh");
    if (p === "dgnl_hsa") return t.includes("hsa");
    if (p === "dgtd_tsa") return t.includes("tsa");
    if (p === "vact") return t.includes("v-act") || t.includes("vact");
    if (p === "thptqg") return t.includes("2k9") || t.includes("thpt") || t.includes("12");
    if (p === "single_69k") return course.tier === "subject_69k" || String(course.id).startsWith("K69-");
    if (p === "combo_199k") return course.tier === "course_199k" || String(course.id).startsWith("C199-");
    return true;
}
function doesCourseMatchProgram(course, prog) {
    if (!prog || prog === "ALL") return true;
    const p = prog.replace("PROG:", "");
    if (course.category === p || course.subCategory === p) return true;
    if (Array.isArray(course.categories) && course.categories.includes(p)) return true;
    const t = `${course.id} ${course.title} ${course.instructor}`.toLowerCase();
    if (p === "lop12_2k9") return t.includes("12") || t.includes("2k9");
    if (p === "lop11_2k10") return t.includes("11") || t.includes("2k10");
    if (p === "dgnl_hsa") return t.includes("hsa");
    if (p === "dgtd_tsa") return t.includes("tsa");
    if (p === "vact") return t.includes("v-act") || t.includes("vact");
    if (p === "bca") return t.includes("bca");
    if (p === "qda") return t.includes("qda") || t.includes("quân đội");
    if (p === "vsat") return t.includes("vsat");
    if (p === "mos") return t.includes("mos") || t.includes("tin học");
    if (p === "daihoc") return t.includes("đại học") || t.includes("kinh tế lượng") || t.includes("triết");
    if (p === "nghe_thuat") return t.includes("nghệ thuật") || t.includes("guitar") || t.includes("piano");
    return true;
}

function getWebCourseVisualMeta(c) {
    if (!c) return { badge: "KHÓA HỌC", iconKey: "all", pillBg: "#DBEAFE", pillColor: "#1E40AF" };
    const text = `${c.id || ""} ${c.title || ""} ${c.groupName || ""} ${c.instructor || ""} ${c.category || ""} ${c.subCategory || ""}`.toLowerCase();
    
    if (text.includes("tiếng trung") || text.includes("hán ngữ") || text.includes("hsk") || text.includes("yangdexin") || text.includes("d04")) {
        return { badge: "TIẾNG TRUNG", iconKey: "trung", pillBg: "#FEE2E2", pillColor: "#991B1B" };
    }
    if (text.includes("lịch sử") || text.includes("lichsu") || text.includes("cô sen") || text.includes("lan hương")) {
        return { badge: "LỊCH SỬ", iconKey: "su", pillBg: "#FFEDD5", pillColor: "#9A3412" };
    }
    if (text.includes("địa lý") || text.includes("địa lí") || text.includes("dialy") || text.includes("thầy tùng") || text.includes("thầy tài")) {
        return { badge: "ĐỊA LÝ", iconKey: "dia", pillBg: "#CFFAFE", pillColor: "#155E75" };
    }
    if (text.includes("ngữ văn") || text.includes("nguvan") || text.includes("văn học")) {
        return { badge: text.includes("11") ? "VĂN 11" : "NGỮ VĂN 12", iconKey: "van", pillBg: "#FFE4E6", pillColor: "#9F1239" };
    }
    if (text.includes("sinh học") || text.includes("sinh12") || text.includes("sinh 12")) {
        return { badge: "SINH HỌC 12", iconKey: "sinh", pillBg: "#DCFCE7", pillColor: "#166534" };
    }
    if (text.includes("hóa học") || text.includes("hoa12") || text.includes("phạm văn trọng") || text.includes("nap")) {
        return { badge: text.includes("11") ? "HÓA 11" : "HÓA HỌC 12", iconKey: "hoa", pillBg: "#D1FAE5", pillColor: "#065F46" };
    }
    if (text.includes("vật lý") || text.includes("ly12") || text.includes("vũ ngọc anh") || text.includes("chu văn biên") || text.includes("tùng ưng") || text.includes("tuấn anh")) {
        return { badge: text.includes("11") ? "VẬT LÝ 11" : "VẬT LÝ 12", iconKey: "ly", pillBg: "#FEF3C7", pillColor: "#92400E" };
    }
    if (text.includes("toán 12") || text.includes("toan12") || text.includes("đỗ văn đức") || (text.includes("môn toán") && text.includes("12"))) {
        return { badge: "TOÁN 12", iconKey: "toan", pillBg: "#DBEAFE", pillColor: "#1E40AF" };
    }
    if (text.includes("toán 11") || text.includes("toan11")) {
        return { badge: "TOÁN 11", iconKey: "toan", pillBg: "#DBEAFE", pillColor: "#1E40AF" };
    }
    if (text.includes("tiếng anh") || text.includes("anh12") || text.includes("vũ mai phương") || text.includes("pro3m")) {
        return { badge: "TIẾNG ANH 12", iconKey: "anh", pillBg: "#E0F2FE", pillColor: "#075985" };
    }
    if (text.includes("hsa") || text.includes("đgnl")) {
        return { badge: "ĐGNL HSA", iconKey: "hsa_tsa", pillBg: "#EDE9FE", pillColor: "#5B21B6" };
    }
    if (text.includes("tsa") || text.includes("đgtd")) {
        return { badge: "ĐGTD TSA", iconKey: "hsa_tsa", pillBg: "#EDE9FE", pillColor: "#5B21B6" };
    }
    if (text.includes("kinh tế lượng") || text.includes("triết học") || text.includes("tiểu luận") || text.includes("apa 7") || text.includes("đại học")) {
        return { badge: "ĐẠI HỌC · BTL", iconKey: "dai_hoc", pillBg: "#EEF2FF", pillColor: "#4338CA" };
    }
    if (text.includes("mos") || text.includes("excel") || text.includes("word") || text.includes("access") || text.includes("văn phòng")) {
        return { badge: "MOS · THVP", iconKey: "tin_mos", pillBg: "#E0E7FF", pillColor: "#3730A3" };
    }
    if (text.includes("guitar") || text.includes("piano") || text.includes("thanh nhạc") || text.includes("sáo") || text.includes("nghệ thuật")) {
        return { badge: "NGHỆ THUẬT", iconKey: "nghe_thuat", pillBg: "#FCE7F3", pillColor: "#9D174D" };
    }
    return { badge: "KHÓA HỌC", iconKey: "all", pillBg: "#F1F5F9", pillColor: "#334155" };
}

function renderSingleCourseCardHtml(course) {
    const unlocked = isWebCourseUnlocked(course.id);
    const customCovers = getWebCourseCustomCovers();
    const coverUrl = customCovers[course.id] || course.defaultCover || "";
    const isComboCard = Boolean(
        String(course.id || "").startsWith("C199-") ||
        course.id === "ALL-COURSES-399K" ||
        course.tier === "course_199k" ||
        course.tier === "full_399k"
    );
    const mainHeadingText = isComboCard ? (course.title || course.instructor || "Combo Khóa Học") : (course.instructor || "Điệp Viên Study");
    const subDetailText = isComboCard ? (course.instructor || "Lộ trình ôn thi toàn diện") : (course.title || "");
    const footerCategoryText = course.groupName || course.level || course.categoryName || "Khóa Học 2027";
    const durationText = (course.duration || "Full lộ trình 2027 · Video + PDF") + (unlocked ? " · Đã mở khóa" : "");
    const meta = getWebCourseVisualMeta(course);
    const th = getDvsIconThemeByKey(meta.iconKey);

    const COMBO_MULTI_TAGS = {
        "C199-KHTN1": [
            { badge: "TOÁN 12", iconKey: "toan", pillBg: "#DBEAFE", pillColor: "#1E40AF", border: "#BFDBFE" },
            { badge: "VẬT LÝ 12", iconKey: "ly", pillBg: "#FEF3C7", pillColor: "#92400E", border: "#FDE68A" },
            { badge: "SINH HỌC 12", iconKey: "sinh", pillBg: "#DCFCE7", pillColor: "#166534", border: "#BBF7D0" }
        ],
        "C199-KHTN2": [
            { badge: "TOÁN 12", iconKey: "toan", pillBg: "#DBEAFE", pillColor: "#1E40AF", border: "#BFDBFE" },
            { badge: "VẬT LÝ 12", iconKey: "ly", pillBg: "#FEF3C7", pillColor: "#92400E", border: "#FDE68A" },
            { badge: "TIẾNG ANH", iconKey: "anh", pillBg: "#EDE9FE", pillColor: "#5B21B6", border: "#DDD6FE" }
        ],
        "C199-KHXH1": [
            { badge: "NGỮ VĂN 12", iconKey: "van", pillBg: "#FFE4E6", pillColor: "#9F1239", border: "#FECDD3" },
            { badge: "LỊCH SỬ", iconKey: "su", pillBg: "#FFEDD5", pillColor: "#9A3412", border: "#FED7AA" },
            { badge: "ĐỊA LÝ", iconKey: "dia", pillBg: "#CFFAFE", pillColor: "#155E75", border: "#A5F3FC" }
        ],
        "C199-KHXH2": [
            { badge: "TOÁN 12", iconKey: "toan", pillBg: "#DBEAFE", pillColor: "#1E40AF", border: "#BFDBFE" },
            { badge: "NGỮ VĂN 12", iconKey: "van", pillBg: "#FFE4E6", pillColor: "#9F1239", border: "#FECDD3" },
            { badge: "TIẾNG ANH", iconKey: "anh", pillBg: "#EDE9FE", pillColor: "#5B21B6", border: "#DDD6FE" }
        ]
    };
    const tagList = COMBO_MULTI_TAGS[course.id] || [{ badge: meta.badge, iconKey: meta.iconKey, pillBg: meta.pillBg || "#DBEAFE", pillColor: meta.pillColor || "#1E40AF", border: meta.border || "#BFDBFE" }];

    const badgesHtml = tagList.map(t => `
        <span class="inline-flex items-center gap-1 text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs border" style="background: ${t.pillBg}; color: ${t.pillColor}; border-color: ${t.border};">
            ${typeof renderDvsSubjectCourseSvgHtml === "function" ? renderDvsSubjectCourseSvgHtml(t.iconKey, 11) : ''}
            <span>${t.badge}</span>
        </span>
    `).join("");

    return `
        <article itemscope itemtype="https://schema.org/Course" onclick="handleWebCourseCardClick('${course.id}')" class="group rounded-2xl overflow-hidden flex flex-col bg-white dark:bg-[#0A143D] border ${unlocked ? 'border-emerald-400/80 dark:border-emerald-500/70 shadow-emerald-500/10' : 'border-slate-200/90 dark:border-white/10 hover:border-[#0D1677]/60 dark:hover:border-sky-400/60'} shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            
            <!-- 16:9 COVER IMAGE BOX (IDENTICAL TO APP dvs-course-cover-box) -->
            <div class="aspect-video w-full relative bg-gradient-to-br from-slate-900/[0.06] to-blue-600/[0.08] dark:from-slate-800/45 dark:to-blue-500/15 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-center overflow-hidden">
                ${coverUrl ? `
                    <img itemprop="image" src="${coverUrl}" alt="${mainHeadingText}" referrerpolicy="no-referrer" class="w-full h-full object-cover block group-hover:scale-[1.02] transition-transform duration-300" loading="lazy" onerror="if(this.dataset.fb && this.src!==this.dataset.fb){this.src=this.dataset.fb;return;} this.onerror=null; this.parentElement.innerHTML='<div class=\'flex flex-col items-center justify-center gap-1.5 text-slate-500 dark:text-slate-300 text-xs font-semibold select-none\'><span class=\'text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md bg-slate-900/[0.06] dark:bg-white/10 border border-dashed border-slate-400/60 dark:border-white/25\'>KHUNG ẢNH 16:9</span></div>';" data-fb="${course.fallbackCover || ''}">
                ` : `
                    <div class="flex flex-col items-center justify-center gap-1.5 text-slate-500 dark:text-slate-300 text-xs font-semibold select-none">
                        <span class="text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md bg-slate-900/[0.06] dark:bg-white/10 border border-dashed border-slate-400/60 dark:border-white/25">KHUNG ẢNH 16:9</span>
                    </div>
                `}
                
            </div>

            <!-- CARD BODY -->
            <div class="p-4 flex flex-col flex-1 gap-1.5">
                <div class="flex flex-wrap items-center gap-1.5 mb-0.5">
                    ${badgesHtml}
                </div>

                <h3 itemprop="name" class="text-[14.5px] font-black text-[#0D1677] dark:text-amber-400 leading-snug tracking-tight truncate m-0 uppercase" title="${mainHeadingText}">
                    ${mainHeadingText}
                </h3>
                <h4 itemprop="provider" class="text-[12.5px] font-semibold text-slate-600 dark:text-slate-300 leading-snug line-clamp-2 m-0 min-h-[34px]" title="${subDetailText}">
                    ${subDetailText}
                </h4>

                <div class="flex items-center justify-between gap-2.5 pt-3 mt-auto border-t border-slate-200/70 dark:border-white/10">
                    <div class="flex flex-col gap-0.5 min-w-0">
                        <strong itemprop="educationalLevel" class="text-[12px] font-bold text-slate-700 dark:text-slate-200 truncate">${footerCategoryText}</strong>
                        <small class="text-[11px] text-slate-500 dark:text-slate-400 truncate">${durationText}</small>
                    </div>
                    <button type="button" onclick="event.stopPropagation(); handleWebCourseCardClick('${course.id}')" class="h-8 px-3.5 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1.5 flex-shrink-0 transition hover:opacity-95" style="background: ${unlocked ? 'linear-gradient(135deg, #059669 0%, #0d9488 100%)' : 'linear-gradient(135deg, #0d1677 0%, #1e3a8a 100%)'};">
                        ${!unlocked ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>' : ''}
                        <span>Vào học</span>
                    </button>
                </div>
            </div>

        </article>
    `;
}

function clearWebCourseSearchInput() {
    const inp = document.getElementById("courseSearchInput");
    if (inp) {
        inp.value = "";
        inp.focus();
    }
    renderCourses();
}

function renderCourses() {
    const grid = document.getElementById("coursesGrid");
    if (!grid || typeof COURSES_DATABASE === "undefined") return;

    const rawVal = document.getElementById("courseSearchInput")?.value || "";
    const searchQ = rawVal.trim().toLowerCase();
    const clearBtn = document.getElementById("courseSearchClearBtn");
    if (clearBtn) {
        clearBtn.classList.toggle("hidden", !searchQ);
    }
    const searchNorm = typeof removeVietnameseTones === "function" ? removeVietnameseTones(searchQ) : searchQ;

    const visibleCatalogCourses = COURSES_DATABASE.filter(c => !c.isPackageOnly);

    let courses = visibleCatalogCourses.filter(c => {
        // Filter by subject
        if (activeWebCourseSubject && activeWebCourseSubject !== "ALL") {
            if (!doesCourseMatchSubject(c, activeWebCourseSubject)) return false;
        }

        // Filter by program
        if (activeWebCourseProgram && activeWebCourseProgram !== "ALL") {
            if (!doesCourseMatchProgram(c, activeWebCourseProgram)) return false;
        }

        // Filter by search text
        if (searchQ) {
            const hay = [c.title, c.instructor, c.level, c.code, c.groupName || "", c.categoryLabel || "", c.description || "", c.summary || ""].join(" ").toLowerCase();
            const hayNorm = typeof removeVietnameseTones === "function" ? removeVietnameseTones(hay) : hay;
            return hay.includes(searchQ) || hayNorm.includes(searchNorm);
        }

        return true;
    });

    const badge = document.getElementById("courseCountBadge");
    if (badge) {
        badge.textContent = (activeWebCourseSubject === "ALL" && activeWebCourseProgram === "ALL" && !searchQ)
            ? `${visibleCatalogCourses.length}+ Khóa Học Bản Quyền`
            : `${courses.length} Khóa Học Phù Hợp`;
    }

    if (courses.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-16 text-center bg-white dark:bg-[#0A143D] rounded-3xl border border-dashed border-slate-300 dark:border-white/10 p-8 shadow-sm">
                <div class="w-16 h-16 mx-auto bg-blue-50 text-[#0D1677] rounded-full flex items-center justify-center text-3xl mb-4"><svg class="inline-block w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Chưa tìm thấy khóa học phù hợp với bộ lọc này</h3>
                <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
                    Bạn hãy thử bấm "Tất cả" hoặc tìm kiếm theo từ khóa môn học khác nhé!
                </p>
                <button onclick="quickFilterWebCourse('ALL', 'ALL', '');" class="inline-flex items-center gap-2 px-6 py-3 bg-[#0D1677] hover:bg-[#1E40AF] text-white font-bold rounded-xl shadow-lg transition">
                    <span>Xem Toàn Bộ Khóa Học</span>
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = courses.map(renderSingleCourseCardHtml).join("");
}

function isWebAdminEmail(email) {
    const e = String(email || "").trim().toLowerCase();
    return e === "diepvientailieu@gmail.com" ;
}

function handleWebCourseCardClick(courseId) {
    const cust = getSyncedCustomerLocal() || {};
    if (isWebAdminEmail(cust.email) || isWebCourseUnlocked(courseId)) {
        const course = COURSES_DATABASE.find(c => c.id === courseId);
        if (course && course.driveUrl) {
            const authQ = cust.email ? `?authuser=${encodeURIComponent(cust.email)}` : "";
            window.open(course.driveUrl + authQ, "_blank", "noopener,noreferrer");
            return;
        }
    }
    openCourseCheckoutModal(courseId);
}



let baseClickedCourseForCheckout = null;
let activeCourseCheckoutTierKey = "course_199k";
let selectedSubject69kId = "";
let selectedCourse199kId = "";
let courseTargetDropdownOpen = false;
let courseTargetSearchQuery = "";

function getSubject69kCatalogList() {
    const db = typeof COURSES_DATABASE !== "undefined" ? COURSES_DATABASE : [];
    return db.filter(c => c.tier === "subject_69k" || String(c.id).startsWith("K69-"));
}

function getCourse199kCatalogList() {
    const db = typeof COURSES_DATABASE !== "undefined" ? COURSES_DATABASE : [];
    return db.filter(c => c.tier === "course_199k" || String(c.id).startsWith("C199-"));
}

function getCourseVisualMeta(c) {
    if (!c) return { badge: "KHÓA HỌC", cleanTitle: "Khóa Học Ôn Thi", colorClass: "text-[#0D1677] bg-blue-50", svg: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/></svg>' };
    const text = `${c.id || ""} ${c.title || ""} ${c.groupName || ""} ${c.category || ""}`.toLowerCase();

    let badge = "KHÓA HỌC";
    let colorClass = "text-[#0D1677] bg-blue-50 border-blue-200";
    let svg = '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/></svg>';

    if (text.includes("tiếng trung") || text.includes("hán ngữ") || text.includes("hsk") || text.includes("yangdexin") || text.includes("d04")) {
        badge = "TIẾNG TRUNG";
        colorClass = "text-red-700 bg-red-50 border-red-200";
    } else if (text.includes("lịch sử") || text.includes("lichsu")) {
        badge = "LỊCH SỬ";
        colorClass = "text-amber-800 bg-amber-50 border-amber-200";
    } else if (text.includes("địa lý") || text.includes("địa lí") || text.includes("dialy")) {
        badge = "ĐỊA LÝ";
        colorClass = "text-teal-700 bg-teal-50 border-teal-200";
    } else if (text.includes("ngữ văn") || text.includes("nguvan") || text.includes("văn học")) {
        badge = "NGỮ VĂN";
        colorClass = "text-rose-700 bg-rose-50 border-rose-200";
    } else if (text.includes("sinh học") || text.includes("sinh12")) {
        badge = "SINH HỌC";
        colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
    } else if (text.includes("kinh tế lượng") || text.includes("eviews") || text.includes("stata") || text.includes("spss")) {
        badge = "KINH TẾ LƯỢNG";
        colorClass = "text-indigo-700 bg-indigo-50 border-indigo-200";
    } else if (text.includes("triết học") || text.includes("mác - lênin")) {
        badge = "TRIẾT HỌC";
        colorClass = "text-purple-700 bg-purple-50 border-purple-200";
    } else if (text.includes("nghiên cứu khoa học") || text.includes("tiểu luận") || text.includes("apa 7") || text.includes("xác suất")) {
        badge = "ĐẠI HỌC · BTL";
        colorClass = "text-blue-800 bg-blue-50 border-blue-200";
    } else if (text.includes("guitar") || text.includes("piano") || text.includes("thanh nhạc") || text.includes("ukulele") || text.includes("sáo trúc") || text.includes("dj") || text.includes("nhảy") || text.includes("nghệ thuật")) {
        badge = "NGHỆ THUẬT";
        colorClass = "text-pink-700 bg-pink-50 border-pink-200";
    } else if (text.includes("mos") || text.includes("excel") || text.includes("word") || text.includes("powerpoint") || text.includes("access") || text.includes("google sheets") || text.includes("văn phòng")) {
        badge = "MOS · THVP";
        colorClass = "text-sky-700 bg-sky-50 border-sky-200";
    } else if (text.includes("toán 12") || text.includes("toan12") || (text.includes("môn toán") && text.includes("12"))) {
        badge = "TOÁN 12";
        colorClass = "text-blue-700 bg-blue-50 border-blue-200";
        svg = '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>';
    } else if (text.includes("vật lý 12") || text.includes("ly12") || (text.includes("vật lý") && text.includes("12"))) {
        badge = "VẬT LÝ 12";
        colorClass = "text-amber-700 bg-amber-50 border-amber-200";
        svg = '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)"/></svg>';
    } else if (text.includes("hóa học 12") || text.includes("hoa12") || (text.includes("hóa") && text.includes("12"))) {
        badge = "HÓA 12";
        colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
        svg = '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><line x1="5.52" x2="18.48" y1="16" y2="16"/></svg>';
    } else if (text.includes("tiếng anh 12") || text.includes("anh12") || text.includes("mai phương") || (text.includes("tiếng anh") && text.includes("12"))) {
        badge = "ANH 12";
        colorClass = "text-purple-700 bg-purple-50 border-purple-200";
        svg = '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
    } else if (text.includes("ngữ văn")) {
        badge = "VĂN 12";
        colorClass = "text-rose-700 bg-rose-50 border-rose-200";
    } else if (text.includes("sinh học")) {
        badge = "SINH 12";
        colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
    } else if (text.includes("topuni")) {
        badge = "TOPUNI 12";
        colorClass = "text-indigo-700 bg-indigo-50 border-indigo-200";
    } else if (text.includes("toán 11") || text.includes("toan11")) {
        badge = "TOÁN 11";
        colorClass = "text-blue-700 bg-blue-50 border-blue-200";
    } else if (text.includes("vật lý 11") || text.includes("ly11")) {
        badge = "LÝ 11";
        colorClass = "text-amber-700 bg-amber-50 border-amber-200";
    } else if (text.includes("hóa học 11") || text.includes("hoa11")) {
        badge = "HÓA 11";
        colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
    } else if (text.includes("tin học") || text.includes("lập trình") || text.includes("tin11")) {
        badge = "TIN HỌC";
        colorClass = "text-sky-700 bg-sky-50 border-sky-200";
    } else if (text.includes("hsa")) {
        badge = "HSA";
        colorClass = "text-red-700 bg-red-50 border-red-200";
    } else if (text.includes("tsa")) {
        badge = "TSA";
        colorClass = "text-amber-800 bg-amber-50 border-amber-200";
    } else if (text.includes("v-act") || text.includes("vact")) {
        badge = "V-ACT";
        colorClass = "text-blue-800 bg-blue-50 border-blue-200";
    } else if (text.includes("công an") || text.includes("bca")) {
        badge = "BCA";
        colorClass = "text-emerald-800 bg-emerald-50 border-emerald-200";
    } else if (text.includes("quân đội") || text.includes("qda")) {
        badge = "QDA";
        colorClass = "text-emerald-800 bg-emerald-50 border-emerald-200";
    } else if (text.includes("vsat")) {
        badge = "VSAT";
        colorClass = "text-purple-800 bg-purple-50 border-purple-200";
    } else if (text.includes("lớp 12")) {
        badge = "COMBO 12";
    } else if (text.includes("lớp 11")) {
        badge = "COMBO 11";
    }

    // Build clean, concise 1-line title (Teacher/Unit + Short Course Name)
    let rawInst = String(c.instructor || "").trim();
    let shortTeacher = rawInst;
    if (rawInst.includes("—")) {
        const parts = rawInst.split("—").map(s => s.trim());
        // Prefer the Teacher name part (e.g. "THẦY ĐỖ VĂN ĐỨC (TENSCHOOL)")
        if (parts[1] && (parts[1].startsWith("THẦY") || parts[1].startsWith("CÔ"))) {
            shortTeacher = `${parts[1]} (${parts[0]})`;
        } else {
            shortTeacher = parts[0];
        }
    }
    const toNiceCase = (str) => str.toLowerCase().split(/(\s+|\(|\)|-)/).map(tok => {
        if (!tok || /^(\s+|\(|\)|-)$/.test(tok)) return tok;
        const up = tok.toUpperCase();
        if (up === "TENSCHOOL") return "TenSchool";
        if (up === "MAPSTUDY") return "MapStudy";
        if (up === "HOCMAI") return "HocMai";
        if (["HSA","TSA","V-ACT","BCA","QDA","VSAT","THPTQG","2K9","2K10","SGK","VIP90","PRO3M","IOME","XPS","TMT","LXO","NAP","TYHH","BMC","TDMU","IPCLASS"].includes(up)) return up;
        return tok.charAt(0).toUpperCase() + tok.slice(1);
    }).join("");

    let cleanTitle = String(c.title || "").trim();
    if (cleanTitle.includes("—")) {
        const tParts = cleanTitle.split("—").map(s => s.trim());
        if (String(c.id).startsWith("COURSE-SUBJ-")) {
            cleanTitle = `${tParts[0]} (${tParts[1] || "Trọn bộ"})`;
        } else {
            cleanTitle = (tParts.slice(1).join(" · ") || tParts[0])
                .replace(/^Lộ Trình Chinh Phục THPTQG 2027\s*/i, "")
                .replace(/^Lộ Trình Toàn Diện THPTQG 2027\s*/i, "Lộ Trình Toàn Diện ")
                .replace(/^Xuất Phát Sớm \(XPS\)\s*/i, "XPS ")
                .replace(/^Trọn Bộ Lộ Trình\s*/i, "Lộ Trình ")
                .replace(/^Full Lộ Trình Xuất Phát Sớm \(XPS\)/i, "Full Lộ Trình XPS");
            if (cleanTitle.startsWith("(") && cleanTitle.endsWith(")")) {
                cleanTitle = cleanTitle.slice(1, -1);
            }
        }
    }

    const displayLine = String(c.id).startsWith("COURSE-SUBJ-")
        ? cleanTitle
        : (shortTeacher ? `${toNiceCase(shortTeacher)} — ${cleanTitle}` : cleanTitle);

    return {
        badge,
        cleanTitle: displayLine,
        colorClass,
        svg
    };
}

function renderCourseTargetOptionsHtml(list, chosenId) {
    if (!list || list.length === 0) {
        return `<div class="p-3 text-center text-slate-400 text-xs">Không tìm thấy môn hoặc khóa học phù hợp</div>`;
    }
    return list.map(item => {
        const isSelected = item.id === chosenId;
        const meta = getCourseVisualMeta(item);
        return `
            <div onclick="onChangeCourseCheckoutTarget('${item.id}')" class="flex items-center gap-2.5 px-3 py-2 hover:bg-sky-50 dark:hover:bg-white/10 cursor-pointer rounded-xl transition ${isSelected ? 'bg-sky-100/70 dark:bg-sky-900/40 text-[#0D1677] dark:text-sky-300 font-bold' : 'text-slate-700 dark:text-slate-200'}">
                <div class="w-6 h-6 rounded border p-0.5 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 ${meta.colorClass}">
                    ${meta.svg}
                </div>
                <span class="px-1.5 py-0.5 bg-slate-200 dark:bg-white/15 text-slate-900 dark:text-white font-mono font-bold text-[10px] rounded flex-shrink-0">
                    ${meta.badge}
                </span>
                <span class="truncate text-xs flex-1">${meta.cleanTitle}</span>
                ${isSelected ? '<span class="text-xs text-sky-600 dark:text-sky-400 font-bold"></span>' : ''}
            </div>
        `;
    }).join("");
}

function toggleCourseTargetDropdown(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById("courseTargetDropdownMenu");
    const chevron = document.getElementById("courseTargetDropdownChevron");
    if (!menu) return;
    const isHidden = menu.classList.contains("hidden");
    if (isHidden) {
        courseTargetDropdownOpen = true;
        menu.classList.remove("hidden");
        if (chevron) chevron.textContent = "";
        const inp = document.getElementById("courseTargetFilterInput");
        if (inp) {
            inp.value = "";
            filterCourseTargetList("");
            setTimeout(() => inp.focus(), 40);
        }
    } else {
        closeCourseTargetDropdown();
    }
}

function closeCourseTargetDropdown() {
    courseTargetDropdownOpen = false;
    const menu = document.getElementById("courseTargetDropdownMenu");
    const chevron = document.getElementById("courseTargetDropdownChevron");
    if (menu) menu.classList.add("hidden");
    if (chevron) chevron.textContent = "";
}

function filterCourseTargetList(query) {
    courseTargetSearchQuery = (query || "").trim();
    const raw = courseTargetSearchQuery.toLowerCase();
    const rawNorm = typeof removeVietnameseTones === "function" ? removeVietnameseTones(raw) : raw;
    const list = activeCourseCheckoutTierKey === "subject_69k" ? getSubject69kCatalogList() : getCourse199kCatalogList();
    const chosenId = selectedCourseForCheckout?.id || "";

    const container = document.getElementById("courseTargetOptionsList");
    if (!container) return;

    if (!raw) {
        container.innerHTML = renderCourseTargetOptionsHtml(list, chosenId);
        return;
    }

    const filtered = list.filter(c => {
        const meta = getCourseVisualMeta(c);
        const hay = `${meta.badge} ${meta.cleanTitle} ${c.title || ""} ${c.instructor || ""} ${c.code || ""}`.toLowerCase();
        const hayNorm = typeof removeVietnameseTones === "function" ? removeVietnameseTones(hay) : hay;
        return hay.includes(raw) || hayNorm.includes(rawNorm);
    });
    container.innerHTML = renderCourseTargetOptionsHtml(filtered, chosenId);
}

function onChangeCourseCheckoutTarget(targetId) {
    if (!targetId) return;
    const found = (typeof COURSES_DATABASE !== "undefined" ? COURSES_DATABASE : []).find(c => c.id === targetId);
    if (!found) return;
    if (activeCourseCheckoutTierKey === "subject_69k") {
        selectedSubject69kId = found.id;
    } else if (activeCourseCheckoutTierKey === "course_199k") {
        selectedCourse199kId = found.id;
    }
    closeCourseTargetDropdown();
    selectCourseCheckoutTier(activeCourseCheckoutTierKey);
}

function selectCourseCheckoutTier(tierKey) {
    activeCourseCheckoutTierKey = tierKey || "course_199k";
    const subjList = getSubject69kCatalogList();
    const courseList = getCourse199kCatalogList();

    if (!selectedSubject69kId) {
        selectedSubject69kId = baseClickedCourseForCheckout?.parentSubjectId
            || (subjList.some(x => x.id === baseClickedCourseForCheckout?.id) ? baseClickedCourseForCheckout.id : (subjList[0]?.id || ""));
    }
    if (!selectedCourse199kId) {
        selectedCourse199kId = (courseList.some(x => x.id === baseClickedCourseForCheckout?.id) ? baseClickedCourseForCheckout.id : (courseList[0]?.id || ""));
    }

    let chosenBase = baseClickedCourseForCheckout || COURSES_DATABASE[0];
    if (activeCourseCheckoutTierKey === "subject_69k") {
        chosenBase = (COURSES_DATABASE.find(c => c.id === selectedSubject69kId)) || baseClickedCourseForCheckout || subjList[0] || COURSES_DATABASE[0];
    } else if (activeCourseCheckoutTierKey === "course_199k") {
        chosenBase = (COURSES_DATABASE.find(c => c.id === selectedCourse199kId)) || baseClickedCourseForCheckout || courseList[0] || COURSES_DATABASE[0];
    }

    const fullCourse = COURSES_DATABASE.find(c => c.id === "ALL-COURSES-399K") || chosenBase;
    let chosen;
    if (activeCourseCheckoutTierKey === "subject_69k") {
        chosen = {
            ...chosenBase,
            price: 69000,
            originalPrice: 200000,
            discountPercent: "66%",
            tier: "subject_69k"
        };
    } else if (activeCourseCheckoutTierKey === "full_399k") {
        chosen = {
            ...fullCourse,
            id: "ALL-COURSES-399K",
            code: "FULL399K",
            title: "Full Tất Cả Khóa Học & Luyện Đề THPTQG · HSA · TSA · V-ACT",
            price: 399000,
            originalPrice: 2500000,
            discountPercent: "84%",
            tier: "full_399k"
        };
    } else {
        chosen = {
            ...chosenBase,
            price: 199000,
            originalPrice: 600000,
            discountPercent: "67%",
            tier: "course_199k"
        };
    }

    selectedCourseForCheckout = chosen;

    const titleEl = document.getElementById("courseCheckoutTitle");
    const priceEl = document.getElementById("courseCheckoutPrice");
    const origEl = document.getElementById("courseCheckoutOriginalPrice");
    const discEl = document.getElementById("courseCheckoutDiscount");
    if (titleEl) titleEl.textContent = chosen.title;
    if (priceEl) priceEl.textContent = chosen.price.toLocaleString("vi-VN") + "đ";
    if (origEl) origEl.textContent = chosen.originalPrice.toLocaleString("vi-VN") + "đ";
    if (discEl) discEl.textContent = "TIẾT KIỆM " + chosen.discountPercent;

    const listEl = document.getElementById("courseTierOptionsList");
    if (listEl) {
        const tierBoxEl = document.getElementById("courseTierSelectorBox");
        if (!window._isGenericTierCheckout || activeCourseCheckoutTierKey === "full_399k") {
            if (tierBoxEl) tierBoxEl.classList.add("hidden");
            listEl.innerHTML = "";
        } else {
            if (tierBoxEl) tierBoxEl.classList.remove("hidden");
            let pickerHtml = "";
            if (activeCourseCheckoutTierKey === "subject_69k") {
                const activeList = subjList;
                const chosenMeta = getCourseVisualMeta(chosen);
                pickerHtml = `
                    <div class="mt-1 relative" id="courseTargetComboboxWrapper">
                        <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Chọn 1 Môn / Thầy Cô bạn cần mở khóa (69.000đ):
                        </label>
                        <select id="courseCheckoutTargetSelect" class="hidden" onchange="onChangeCourseCheckoutTarget(this.value)">
                            <option value="${chosen.id}" selected>${chosen.title}</option>
                        </select>
                        <div id="courseTargetSelectedDisplay" onclick="toggleCourseTargetDropdown(event)" class="w-full bg-slate-50 dark:bg-[#060E2C] border-2 border-slate-200 dark:border-white/15 hover:border-sky-400 dark:hover:border-sky-500 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-100 transition cursor-pointer flex items-center justify-between shadow-sm">
                            <div class="flex items-center gap-2 min-w-0 flex-1 pr-2">
                                <div class="w-6 h-6 rounded border p-0.5 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 ${chosenMeta.colorClass}">
                                    ${chosenMeta.svg}
                                </div>
                                <span class="px-1.5 py-0.5 bg-slate-200 dark:bg-white/15 text-slate-900 dark:text-white font-mono font-bold text-[10px] rounded flex-shrink-0">
                                    ${chosenMeta.badge}
                                </span>
                                <span class="truncate text-xs font-bold text-slate-800 dark:text-white">${chosenMeta.cleanTitle}</span>
                            </div>
                            <div class="flex items-center gap-1.5 flex-shrink-0 text-slate-400">
                                <span class="text-[10px] font-bold text-[#0D1677] dark:text-amber-300 bg-blue-50 dark:bg-white/10 px-1.5 py-0.5 rounded border border-blue-200 dark:border-white/15">Đổi</span>
                                <span id="courseTargetDropdownChevron" class="text-[10px] text-slate-400 transition-transform"></span>
                            </div>
                        </div>
                        <div id="courseTargetDropdownMenu" class="hidden mt-1.5 bg-white dark:bg-[#060E2C] border-2 border-sky-400 dark:border-sky-600 rounded-2xl shadow-2xl z-50 overflow-hidden">
                            <div class="p-2 border-b border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-[#0A143D]">
                                <input type="text" id="courseTargetFilterInput" oninput="filterCourseTargetList(this.value)" onclick="event.stopPropagation()" placeholder="Gõ tên môn hoặc thầy cô..." class="w-full bg-white dark:bg-[#03081E] border-2 border-[#0D1677] dark:border-sky-500 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 outline-none shadow-inner">
                            </div>
                            <div id="courseTargetOptionsList" class="max-h-56 overflow-y-auto p-1 divide-y divide-slate-100 dark:divide-white/5 text-xs">
                                ${renderCourseTargetOptionsHtml(activeList, chosen.id)}
                            </div>
                        </div>
                    </div>
                `;
            } else if (activeCourseCheckoutTierKey === "course_199k") {
                const activeList = courseList;
                const chosenMeta = getCourseVisualMeta(chosen);
                pickerHtml = `
                    <div class="mt-1 relative" id="courseTargetComboboxWrapper">
                        <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Chọn Khóa ĐGNL hoặc Combo Ban bạn cần mở khóa (199.000đ):
                        </label>
                        <select id="courseCheckoutTargetSelect" class="hidden" onchange="onChangeCourseCheckoutTarget(this.value)">
                            <option value="${chosen.id}" selected>${chosen.title}</option>
                        </select>
                        <div id="courseTargetSelectedDisplay" onclick="toggleCourseTargetDropdown(event)" class="w-full bg-slate-50 dark:bg-[#060E2C] border-2 border-slate-200 dark:border-white/15 hover:border-sky-400 dark:hover:border-sky-500 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-100 transition cursor-pointer flex items-center justify-between shadow-sm">
                            <div class="flex items-center gap-2 min-w-0 flex-1 pr-2">
                                <div class="w-6 h-6 rounded border p-0.5 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 ${chosenMeta.colorClass}">
                                    ${chosenMeta.svg}
                                </div>
                                <span class="px-1.5 py-0.5 bg-slate-200 dark:bg-white/15 text-slate-900 dark:text-white font-mono font-bold text-[10px] rounded flex-shrink-0">
                                    ${chosenMeta.badge}
                                </span>
                                <span class="truncate text-xs font-bold text-slate-800 dark:text-white">${chosenMeta.cleanTitle}</span>
                            </div>
                            <div class="flex items-center gap-1.5 flex-shrink-0 text-slate-400">
                                <span class="text-[10px] font-bold text-[#0D1677] dark:text-amber-300 bg-blue-50 dark:bg-white/10 px-1.5 py-0.5 rounded border border-blue-200 dark:border-white/15">Đổi</span>
                                <span id="courseTargetDropdownChevron" class="text-[10px] text-slate-400 transition-transform"></span>
                            </div>
                        </div>
                        <div id="courseTargetDropdownMenu" class="hidden mt-1.5 bg-white dark:bg-[#060E2C] border-2 border-sky-400 dark:border-sky-600 rounded-2xl shadow-2xl z-50 overflow-hidden">
                            <div class="p-2 border-b border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-[#0A143D]">
                                <input type="text" id="courseTargetFilterInput" oninput="filterCourseTargetList(this.value)" onclick="event.stopPropagation()" placeholder="Gõ tên khóa hoặc combo..." class="w-full bg-white dark:bg-[#03081E] border-2 border-[#0D1677] dark:border-sky-500 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 outline-none shadow-inner">
                            </div>
                            <div id="courseTargetOptionsList" class="max-h-56 overflow-y-auto p-1 divide-y divide-slate-100 dark:divide-white/5 text-xs">
                                ${renderCourseTargetOptionsHtml(activeList, chosen.id)}
                            </div>
                        </div>
                    </div>
                `;
            } else {
                pickerHtml = `
                    <div class="mt-1 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-[11px] font-bold text-emerald-900 dark:text-emerald-200">
                        Đã chọn <strong>Gói VIP Full Trọn Bộ 37 Khóa Học (399.000đ)</strong>: Mở khóa toàn bộ 37 Khóa học & Combo Luyện Thi 2027 trên Google Drive & Hệ thống học tập.
                    </div>
                `;
            }
            listEl.innerHTML = pickerHtml;
        }
    }

    // Nếu đang ở Bước 2 (khách đã đăng nhập nên hiện sẵn QR), khi khách đổi gói 69K / 199K / 399K hoặc đổi môn -> cập nhật lại mã QR và mã giao dịch ngay lập tức!
    const step2El = document.getElementById("courseCheckoutStep2");
    if (step2El && !step2El.classList.contains("hidden")) {
        goToCoursePaymentStep(true);
    }
}

function syncCourseCheckoutGoogleUi() {
    const cust = (typeof getSyncedCustomerLocal === "function" ? getSyncedCustomerLocal() : null) || {};
    const savedEmail = (cust.email || "").trim().toLowerCase();
    const savedName = (cust.name || "").trim();
    const savedPhone = (cust.phone || "").replace(/\[.*\]/g, "").trim();

    const bannerEl = document.getElementById("courseSavedAccountBanner");
    const emailWrapEl = document.getElementById("courseEmailInputWrap");
    const savedTxtEl = document.getElementById("courseSavedAccountText");
    const emailInputEl = document.getElementById("courseStudentEmail");
    const phoneInputEl = document.getElementById("courseStudentPhone");
    const nameInputEl = document.getElementById("courseStudentName");

    if (nameInputEl && savedName) nameInputEl.value = savedName;
    if (emailInputEl && savedEmail && !emailInputEl.value) emailInputEl.value = savedEmail;
    if (phoneInputEl && savedPhone && !phoneInputEl.value) phoneInputEl.value = savedPhone;

    if (savedEmail && savedEmail.includes("@")) {
        if (bannerEl) bannerEl.classList.remove("hidden");
        if (emailWrapEl) emailWrapEl.classList.add("hidden");
        if (savedTxtEl) savedTxtEl.textContent = savedName ? `${savedName} (${savedEmail})` : savedEmail;
        if (emailInputEl) emailInputEl.value = savedEmail;
    } else {
        if (bannerEl) bannerEl.classList.add("hidden");
        if (emailWrapEl) emailWrapEl.classList.remove("hidden");
    }
}

function onCourseCheckoutContactInput() {
    const emailVal = (document.getElementById("courseStudentEmail")?.value || "").trim().toLowerCase();
    const phoneVal = (document.getElementById("courseStudentPhone")?.value || "").replace(/\[.*\]/g, "").trim();
    try {
        if (phoneVal) localStorage.setItem("dvs_cust_phone", phoneVal);
        if (emailVal && emailVal.includes("@")) localStorage.setItem("dvtl_guest_checkout_email", emailVal);
    } catch (_) {}
    const cust = (typeof getSyncedCustomerLocal === "function" ? getSyncedCustomerLocal() : null) || {};
    if (isCustomerGoogleLoggedIn(cust) && phoneVal.length >= 9) {
        saveCustomerProfileEverywhere({ name: cust.name, phone: phoneVal, email: cust.email, verifiedByGoogle: true, source: "WEB_COURSE_QR_INPUT" });
    }
}

function openCourseCheckoutModal(courseId) {
    if (typeof COURSES_DATABASE === "undefined") return;
    const course = COURSES_DATABASE.find(c => c.id === courseId) || COURSES_DATABASE.find(c => !c.isPackageOnly) || COURSES_DATABASE[0];
    if (!course) return;

    if (!window._isGenericTierCheckoutTriggered) {
        window._isGenericTierCheckout = false;
    }
    window._isGenericTierCheckoutTriggered = false;

    baseClickedCourseForCheckout = course;
    selectedCourse199kId = (course.tier === "course_199k" || String(course.id).startsWith("C199-")) ? course.id : "C199-HSA";
    selectedSubject69kId = (course.tier === "subject_69k" || String(course.id).startsWith("K69-")) ? course.id : (course.parentSubjectId || "K69-TOAN-DUC");

    const topHdr = document.getElementById("courseCheckoutTopHeader");
    if (topHdr) topHdr.classList.remove("hidden");
    const step1El = document.getElementById("courseCheckoutStep1");
    if (step1El) step1El.classList.add("hidden");
    document.getElementById("courseCheckoutStep2").classList.remove("hidden");
    document.getElementById("courseCheckoutStep3").classList.add("hidden");

    syncCourseCheckoutGoogleUi();

    if (course.id === "ALL-COURSES-399K" || course.tier === "full_399k") {
        selectCourseCheckoutTier("full_399k");
    } else if (course.tier === "subject_69k" || String(course.id).startsWith("K69-")) {
        selectCourseCheckoutTier("subject_69k");
    } else {
        selectCourseCheckoutTier("course_199k");
    }

    const modal = document.getElementById("courseCheckoutModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    goToCoursePaymentStep(true);
}

function closeCourseCheckoutModal() {
    if (coursePollingInterval) { clearInterval(coursePollingInterval); coursePollingInterval = null; }
    if (window._courseTimerInterval) { clearInterval(window._courseTimerInterval); window._courseTimerInterval = null; }
    const modal = document.getElementById("courseCheckoutModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    selectedCourseForCheckout = null;
}

function goToCoursePaymentStep(isAutoFromSavedProfile = false) {
    if (!selectedCourseForCheckout) return;
    syncCourseCheckoutGoogleUi();

    const cust = getSyncedCustomerLocal() || {};
    const email = ((document.getElementById("courseStudentEmail")?.value || "").trim() || cust.email || "").toLowerCase();
    const rawPhone = ((document.getElementById("courseStudentPhone")?.value || "").trim() || cust.phone || "").replace(/\[.*\]/g, "").trim();
    const name = (cust.name || "").trim() || (email.includes("@") ? email.split("@")[0] : "HOC VIEN");

    const course = selectedCourseForCheckout;
    const tierPrefix = Number(course.price || 0) >= 300000 ? "KH399" : (Number(course.price || 0) >= 100000 ? "KH199" : "KH69");
    const cleanCode = String(course.code || "KH").replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 6);
    const orderCode = `${tierPrefix}${cleanCode}${Math.floor(100 + Math.random() * 900)}`;
    const cleanName = removeVietnameseTones(name).replace(/[^a-zA-Z0-9 ]/g, " ").toUpperCase().trim().slice(0, 16);
    const transferMemo = `${orderCode} ${cleanName}`.trim();

    const noteEl = document.getElementById("courseTransferNote");
    if (noteEl) {
        noteEl.textContent = transferMemo;
        noteEl.dataset.orderCode = orderCode;
    }
    const amtEl = document.getElementById("coursePayAmount");
    if (amtEl) amtEl.textContent = `${course.price.toLocaleString("vi-VN")} VNĐ`;
    const qrImg = document.getElementById("courseQrImage");
    if (qrImg) {
        qrImg.src = `https://img.vietqr.io/image/ACB-27820961-compact2.png?amount=${course.price}&addInfo=${encodeURIComponent(transferMemo)}&accountName=TRINH%20DUC%20THINH`;
    }

    const initDigitsPhone = rawPhone.replace(/\D+/g, "");
    if (email.includes("@") && /^0\d{9,10}$/.test(initDigitsPhone)) {
        const payload = {
            action: "createOrder",
            silent: "1",
            type: "COURSE_REGISTRATION",
            orderType: "Khóa Học",
            status: "PENDING",
            orderCode: orderCode,
            transferMemo: transferMemo,
            sku: course.id,
            itemName: course.title,
            price: course.price,
            amount: course.price,
            driveId: course.driveFolderId || "",
            name: name,
            phone: rawPhone,
            email: email,
            deviceId: getWebDeviceId(),
            bank: "ACB",
            stkNhan: "27820961",
            timestamp: new Date().toISOString()
        };
        try { sendWebhookData(payload); } catch (e) {}
        state.orderHistory.unshift(payload);
        localStorage.setItem("dvtl_orders", JSON.stringify(state.orderHistory.slice(0, 50)));
    }

    const step1El = document.getElementById("courseCheckoutStep1");
    if (step1El) step1El.classList.add("hidden");
    document.getElementById("courseCheckoutStep2").classList.remove("hidden");

    startCoursePaymentPolling(orderCode, course.title, email);
}

let coursePollingInterval = null;
let isCourseVerifyInFlight = false;

function buildCourseVerifyUrl(orderCode, email) {
    const cleanCode = String(orderCode || "").trim().split(" ")[0];
    const course = selectedCourseForCheckout || (typeof COURSES_DATABASE !== "undefined" ? COURSES_DATABASE[0] : {}) || {};
    const cust = typeof getSyncedCustomerLocal === "function" ? (getSyncedCustomerLocal() || {}) : {};
    const nameVal = (document.getElementById("courseStudentName")?.value || cust.name || "Học Viên Điệp Viên").trim();
    const phoneVal = (document.getElementById("courseStudentPhone")?.value || cust.phone || "").replace(/\[.*\]/g, "").trim();
    const emailVal = (email || document.getElementById("courseStudentEmail")?.value || cust.email || "").trim().toLowerCase();
    const params = new URLSearchParams({
        action: "verify",
        orderId: cleanCode,
        orderType: "Khóa Học",
        email: emailVal,
        name: nameVal,
        phone: phoneVal,
        sku: course.id || "",
        itemName: course.title || "",
        amount: String(course.price || 199000),
        driveId: course.driveFolderId || "",
        deviceId: typeof getWebDeviceId === "function" ? getWebDeviceId() : ""
    });
    return `${state.webhookUrl}?${params.toString()}`;
}

function startCoursePaymentPolling(orderCode, courseTitle, email) {
    if (coursePollingInterval) clearInterval(coursePollingInterval);
    isCourseVerifyInFlight = false;
    let elapsed = 0;
    const timerEl = document.getElementById("coursePaymentTimer");

    setTimeout(() => checkCoursePaymentStatus(orderCode, courseTitle, email, false), 1500);

    const courseDeadline = Date.now() + 15 * 60 * 1000;
    if (window._courseTimerInterval) clearInterval(window._courseTimerInterval);
    const updateCourseTimer = () => {
        const remainSec = Math.max(0, Math.ceil((courseDeadline - Date.now()) / 1000));
        const mins = Math.floor(remainSec / 60);
        const secs = remainSec % 60;
        if (timerEl) timerEl.textContent = `Thời gian giữ mã thanh toán: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
    updateCourseTimer();
    window._courseTimerInterval = setInterval(updateCourseTimer, 1000);

    coursePollingInterval = setInterval(() => {
        checkCoursePaymentStatus(orderCode, courseTitle, email, false);
    }, 4000);
}

async function checkCoursePaymentStatus(orderCode, courseTitle, email, isManual = false) {
    if (!state.webhookUrl || !orderCode) return;
    if (!isManual && isCourseVerifyInFlight) return;
    isCourseVerifyInFlight = true;
    try {
        const verifyUrl = buildCourseVerifyUrl(orderCode, email) + '&manual=1';
        const res = await fetch(verifyUrl, { method: "GET", mode: "cors", cache: "no-store" });
        const data = await res.json();
        if (data && (data.verified === true || data.paid === true)) {
            onCoursePaymentConfirmed(orderCode, courseTitle, email || data.email || "", data.driveUrl || "");
        }
    } catch (e) {
    } finally {
        isCourseVerifyInFlight = false;
    }
}

function onCoursePaymentConfirmed(orderCode, courseTitle, email, serverDriveUrl = "") {
    if (coursePollingInterval) { clearInterval(coursePollingInterval); coursePollingInterval = null; }
    if (window._courseTimerInterval) { clearInterval(window._courseTimerInterval); window._courseTimerInterval = null; }

    const course = selectedCourseForCheckout || COURSES_DATABASE[0];
    const cust = getSyncedCustomerLocal() || {};
    const name = document.getElementById("courseStudentName")?.value.trim() || cust.name || "Học Viên Điệp Viên";
    const rawPhone = (document.getElementById("courseStudentPhone")?.value.trim() || cust.phone || "").replace(/\[.*\]/g, "").trim();
    const resolvedDriveUrl = serverDriveUrl || (course && course.driveUrl) || "https://drive.google.com/drive/folders/1_1RwRFjIYJO0BmmJEEqVV-4-GNOkLcNQ";

    // Gửi 1 yêu cầu đồng bộ duy nhất tới Kho Phát File (cấp quyền song song cả folder chính + extraFolderIds, chống trùng mail 100%)
    // Quyền Google Drive & Email bàn giao đã được GAS chính chủ cấp tự động ngay khi khớp biến động ACB

    const prev = getSyncedCustomerLocal() || {};
    const unlockedList = expandWebUnlockedCourses([...(prev.unlockedCourses || []), course ? course.id : ""]);
    const updatedCust = {
        ...prev,
        email: email,
        name: name,
        phone: rawPhone,
        boundDeviceId: getWebDeviceId(),
        unlockedCourses: unlockedList
    };
    localStorage.setItem("dvtl_synced_customer", JSON.stringify(updatedCust));
    saveCustomerProfileEverywhere({ name, phone: rawPhone, email, source: "WEB_COURSE_PAID" });
    if (state.currentView === "courses") renderCourses();

    const topHdr = document.getElementById("courseCheckoutTopHeader");
    if (topHdr) topHdr.classList.add("hidden");
    document.getElementById("courseCheckoutStep1").classList.add("hidden");
    document.getElementById("courseCheckoutStep2").classList.add("hidden");
    document.getElementById("courseCheckoutStep3").classList.remove("hidden");
    document.getElementById("courseSuccessOrderId").textContent = orderCode;
    document.getElementById("courseSuccessTitle").textContent = courseTitle;
    document.getElementById("courseSuccessEmail").textContent = email;
    const appEmailEl = document.getElementById("courseSuccessAppEmail");
    if (appEmailEl) appEmailEl.textContent = email;
    const driveLinkEl = document.getElementById("courseSuccessDriveLink");
    if (driveLinkEl) {
        driveLinkEl.href = resolvedDriveUrl;
    }
}

function backToCourseStep1() {
    if (coursePollingInterval) { clearInterval(coursePollingInterval); coursePollingInterval = null; }
    if (window._courseTimerInterval) { clearInterval(window._courseTimerInterval); window._courseTimerInterval = null; }
    document.getElementById("courseCheckoutStep2").classList.add("hidden");
    document.getElementById("courseCheckoutStep1").classList.remove("hidden");
}

function mapDisciplineToCategoryAndIcon(rawName) {

    const disc = typeof getDocDiscipline === "function" ? getDocDiscipline({ baseName: rawName, rawName: rawName }) : "DAI_CUONG";

    switch (disc) {

        case "DAI_CUONG": return { category: "Các Môn Đại Cương", icon: "brain" };

        case "TAI_CHINH": return { category: "Tài Chính - Ngân Hàng", icon: "coin" };

        case "QUAN_TRI":  return { category: "Marketing & Quản Trị", icon: "chart" };

        case "CONG_NGHE": return { category: "Công Nghệ & Kỹ Thuật", icon: "laptop" };

        case "LUAT":

        case "SU_PHAM":

        case "NGOAI_NGU":

        case "DU_LICH":

        default:          return { category: "Luật & Xã Hội", icon: "scale" };

    }

}



function mergeLiveProductsArrayIntoCatalog(liveProducts) {
    if (!Array.isArray(liveProducts)) return 0;
    let changed = 0;

    liveProducts.forEach((item) => {
        const sku = String(item.sku || "").trim();
        const rawName = String(item.name || "").trim();
        if (!sku || !rawName) return;
        const skuUpper = sku.toUpperCase();
        if (skuUpper.startsWith("COURSE-") || skuUpper.startsWith("SUBJ-") || skuUpper === "ALL-COURSES-399K" || /^DC_\d{4}$/.test(skuUpper)) return;
        if (/\.(txt|json)$/i.test(rawName) || rawName.includes("Danh Sách Đề Cương Kiểm Tra")) return;

        const driveId = String(item.driveId || "").trim();
        const driveType = item.driveType === "folder" ? "folder" : "file";
        const normItem = removeVietnameseTones(rawName).replace(/\b(bo|de|cuong|mon|hoc|phan|on|tap|docx|pdf)\b/g, "").replace(/\s+/g, " ").trim();

        const existing = (typeof REAL_DOCUMENTS_DATABASE !== "undefined" ? REAL_DOCUMENTS_DATABASE : []).find(d => {
            if (driveId && d.driveId && String(d.driveId).trim() === driveId) return true;
            if (String(d.code || "").trim().toUpperCase() === skuUpper) return true;
            const normD = removeVietnameseTones(d.baseName || d.rawName || "").replace(/\b(bo|de|cuong|mon|hoc|phan|on|tap|docx|pdf)\b/g, "").replace(/\s+/g, " ").trim();
            return normItem.length >= 4 && normD === normItem;
        });

        if (existing) {
            if (item.price && Number(item.price) !== existing.price) {
                existing.price = Number(item.price) || existing.price;
                changed++;
            }
            if (driveId && existing.driveId !== driveId) {
                existing.driveId = driveId;
                changed++;
            }
            existing.driveType = driveType;
            existing.isReal = true;
        } else if (typeof REAL_DOCUMENTS_DATABASE !== "undefined") {
            let cleanBase = rawName.replace(/\.(docx?|pdf|xlsx?|pptx?|txt)$/i, "").trim();
            if (!/^(bộ\s+)?đề\s+cương/i.test(cleanBase)) {
                cleanBase = "Đề Cương " + cleanBase;
            }
            const catInfo = mapDisciplineToCategoryAndIcon(cleanBase);
            const newDoc = {
                id: "doc_live_" + sku.toLowerCase().replace(/[^a-z0-9]/g, "_"),
                code: sku,
                rawName: rawName,
                baseName: cleanBase,
                category: catInfo.category,
                icon: catInfo.icon,
                gradient: "from-blue-900 via-indigo-950 to-[#0A143D]",
                accentColor: "text-amber-300",
                pages: 42,
                price: Number(item.price) || 50000,
                originalPrice: 120000,
                rating: 5.0,
                reviewsCount: 128,
                downloads: "1.8k+",
                badge: "Mới Cập Nhật",
                tags: ["Trọng Tâm Ôn Thi", "Bài Tập & Lời Giải", "Chuẩn Bản Quyền"],
                description: "Đầy đủ kiến thức trọng tâm, sơ đồ tóm tắt, dạng bài tập điển hình và hướng dẫn giải bám sát ngân hàng đề thi.",
                isReal: true,
                driveId: driveId,
                driveType: driveType,
                university: "neu"
            };
            REAL_DOCUMENTS_DATABASE.unshift(newDoc);
            if (typeof DOCUMENTS_DATABASE !== "undefined") {
                DOCUMENTS_DATABASE.unshift(newDoc);
            }
            changed++;
        }
    });

    return changed;
}

function hydrateCachedLiveProductsSync() {
    try {
        const raw = localStorage.getItem("dvtl_live_products_cache_v7");
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.items)) {
            mergeLiveProductsArrayIntoCatalog(parsed.items);
        }
    } catch (_) {}
}

async function syncLiveProductsFromMasterSheet() {
    if (!state.webhookUrl) return;
    try {
        const rawCache = localStorage.getItem("dvtl_live_products_cache_v7");
        if (rawCache) {
            const parsedCache = JSON.parse(rawCache);
            // Nếu vừa đồng bộ trong 5 phút gần nhất thì không cần gọi lại API
            if (parsedCache && parsedCache.ts && (Date.now() - parsedCache.ts < 5 * 60 * 1000)) {
                return;
            }
        }
    } catch (_) {}

    try {
        const res = await fetch(state.webhookUrl + "?action=getProducts", { method: "GET", mode: "cors" });
        const liveProducts = await res.json();
        if (!Array.isArray(liveProducts)) return;
        try {
            localStorage.setItem("dvtl_live_products_cache_v7", JSON.stringify({ ts: Date.now(), items: liveProducts }));
        } catch (_) {}

        const changed = mergeLiveProductsArrayIntoCatalog(liveProducts);
        if (changed > 0 && state.currentView === "docs") {
            renderDocuments(true);
        }
    } catch (e) {}
}

/* ==========================================================================

   9. ĐỒNG BỘ TÀI KHOẢN KHÁCH HÀNG WEB (DIEPVIEN.STORE) <-> APP (ĐIỆP VIÊN STUDY)

      & ĐỐI SOÁT BẮT BUỘC TỪ EMAIL BIẾN ĐỘNG SỐ DƯ NGÂN HÀNG

   ========================================================================== */



function getSyncedCustomerLocal() {
    try {
        const raw = JSON.parse(localStorage.getItem("dvtl_synced_customer") || "null") || {};
        const otpName = (localStorage.getItem("dvtl_app_otp_verified_name") || "").trim();
        const otpEmail = (localStorage.getItem("dvtl_app_otp_verified_email") || "").trim().toLowerCase();
        const dvsName = (localStorage.getItem("dvs_cust_name") || "").trim();
        const dvsPhone = (localStorage.getItem("dvs_cust_phone") || "").trim();
        const dvsEmail = (localStorage.getItem("dvs_cust_email") || "").trim().toLowerCase();

        const merged = {
            ...raw,
            name: (raw.name || otpName || dvsName || "").trim(),
            email: (raw.email || otpEmail || dvsEmail || "").trim().toLowerCase(),
            phone: String(raw.phone || dvsPhone || "").replace(/\[.*\]/g, "").trim(),
            unlockedCourses: Array.isArray(raw.unlockedCourses) ? raw.unlockedCourses : [],
            purchasedDocs: Array.isArray(raw.purchasedDocs) ? raw.purchasedDocs : [],
            btlOrders: Array.isArray(raw.btlOrders) ? raw.btlOrders : []
        };
        if (!merged.name && !merged.email) return null;
        return merged;
    } catch (e) {
        return null;
    }
}

function isCustomerGoogleLoggedIn(custObj) {
    const c = custObj || (typeof getSyncedCustomerLocal === "function" ? getSyncedCustomerLocal() : null);
    return Boolean(c && c.verifiedByGoogle === true && c.email && String(c.email).includes("@"));
}

function saveCustomerProfileEverywhere(payload = {}) {
    const {
        name = "",
        phone = "",
        email = "",
        picture,
        verifiedByGoogle,
        isAdmin,
        unlockedCourses,
        purchasedDocs,
        btlOrders,
        source = "WEB_AUTO_SYNC"
    } = payload;
    const prev = getSyncedCustomerLocal() || {};
    const cleanName = (name || prev.name || "").trim();
    const cleanEmail = (email || prev.email || "").trim().toLowerCase();
    const cleanPhone = String(phone || prev.phone || "").replace(/\[.*\]/g, "").trim();

    if (!cleanName && !cleanEmail) return prev;

    const sameEmailAsPrev = Boolean(prev.email && cleanEmail && prev.email.toLowerCase() === cleanEmail);
    const nextVerifiedByGoogle = verifiedByGoogle === true || (sameEmailAsPrev && prev.verifiedByGoogle === true);

    const updated = {
        ...prev,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        picture: picture !== undefined ? picture : (sameEmailAsPrev ? (prev.picture || "") : ""),
        verifiedByGoogle: nextVerifiedByGoogle,
        isAdmin: isAdmin !== undefined ? Boolean(isAdmin) : Boolean(nextVerifiedByGoogle && ["diepvientailieu@gmail.com"].includes(cleanEmail)),
        unlockedCourses: Array.isArray(unlockedCourses) ? unlockedCourses : (sameEmailAsPrev ? (prev.unlockedCourses || []) : []),
        purchasedDocs: Array.isArray(purchasedDocs) ? purchasedDocs : (sameEmailAsPrev ? (prev.purchasedDocs || []) : []),
        btlOrders: Array.isArray(btlOrders) ? btlOrders : (sameEmailAsPrev ? (prev.btlOrders || []) : [])
    };

    try {
        localStorage.setItem("dvtl_synced_customer", JSON.stringify(updated));
        if (cleanName) {
            localStorage.setItem("dvtl_app_otp_verified_name", cleanName);
            localStorage.setItem("dvs_cust_name", cleanName);
        }
        if (cleanEmail) {
            localStorage.setItem("dvtl_app_otp_verified_email", cleanEmail);
            localStorage.setItem("dvs_cust_email", cleanEmail);
        }
        if (cleanPhone) {
            localStorage.setItem("dvs_cust_phone", cleanPhone);
        }
    } catch (_) {}

    applySyncedCustomerToForms();
    updateVerifiedAppDownloadUI();

    const webhook = (state && state.webhookUrl) ? state.webhookUrl : (typeof APP_CONFIG !== "undefined" ? APP_CONFIG.defaultWebhookUrl : "");
    if (webhook && cleanEmail.includes("@")) {
        fetch(webhook, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                action: "registerOrLoginCustomer",
                email: cleanEmail,
                name: cleanName,
                phone: cleanPhone,
                deviceId: typeof getWebDeviceId === "function" ? getWebDeviceId() : "",
                source: source
            })
        }).catch(() => {});
    }

    return updated;
}

function sendAppInviteEmailAfterPurchase({ email = "", name = "", orderCode = "", itemName = "" } = {}) {
    const cleanEmail = String(email || "").trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) return;
    const cust = getSyncedCustomerLocal() || {};
    const cleanName = (name || cust.name || "Bạn").trim();
    const payloads = [
        state?.webhookUrl,
        "https://script.google.com/macros/s/AKfycbxMOdsNkhY8-5xQtZ_86STf781VdFJbRsLkK6n8qRF4ENqreMsl4CdELYn-85wHcqvx/exec"
    ].filter(Boolean);

    payloads.forEach(url => {
        fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                action: "send_app_invite",
                email: cleanEmail,
                name: cleanName,
                orderCode: orderCode || "DVTL",
                itemName: itemName || "Tài liệu & Khóa học Điệp Viên Study"
            })
        }).catch(() => {});
    });
}

function applySyncedCustomerToForms() {
    const cust = getSyncedCustomerLocal();
    const lbl = document.getElementById("headerAccountSyncLabel");
    if (cust && (cust.email || cust.name)) {
        if (lbl) lbl.textContent = (cust.name || cust.email) + " · Đã Lưu TK";
        const ids = [
            ["checkoutNameInput", cust.name],
            ["checkoutPhoneInput", cust.phone],
            ["checkoutEmailInput", cust.email],
            ["courseStudentName", cust.name],
            ["courseStudentPhone", cust.phone],
            ["courseStudentEmail", cust.email],
            ["srvNameInput", cust.name],
            ["srvPhoneInput", cust.phone],
            ["srvEmailInput", cust.email],
            ["appOtpNameInput", cust.name],
            ["appOtpEmailInput", cust.email],
            ["syncCustNameInput", cust.name],
            ["syncCustEmailInput", cust.email],
            ["syncCustPhoneInput", cust.phone]
        ];
        ids.forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (el && val) el.value = val;
        });
    } else if (lbl) {
        lbl.textContent = "Đăng nhập / Đăng ký";
    }
}

function openCustomerSyncModal() {
    const modal = document.getElementById("customerSyncModal");
    if (!modal) return;
    const cust = getSyncedCustomerLocal();
    if (cust) {
        document.getElementById("syncCustEmailInput").value = cust.email || "";
        document.getElementById("syncCustNameInput").value = cust.name || "";
        document.getElementById("syncCustPhoneInput").value = cust.phone || "";
        renderSyncedCustomerEntitlements(cust);
    }
    modal.classList.remove("hidden");
}

function closeCustomerSyncModal() {
    const modal = document.getElementById("customerSyncModal");
    if (modal) modal.classList.add("hidden");
}

function renderSyncedCustomerEntitlements(cust) {
    const box = document.getElementById("syncCustomerEntitlementsBox");
    const list = document.getElementById("syncCustomerItemsList");
    if (!box || !list) return;
    box.classList.remove("hidden");
    const courses = cust.unlockedCourses || [];
    const docs = cust.purchasedDocs || [];
    const btls = cust.btlOrders || [];
    if (courses.length === 0 && docs.length === 0 && btls.length === 0) {
        list.innerHTML = `<div class="p-3 bg-slate-50 rounded-xl text-slate-500 text-center">Tài khoản của bạn đã được lưu tự động cho mọi giao dịch tiếp theo (không cần điền lại thông tin lần 2).</div>`;
        return;
    }
    let html = "";
    courses.forEach(c => {
        html += `<div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex justify-between items-center">
            <div><strong class="text-emerald-900"><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/><path d="M22 10v6"/></svg> Khóa học: ${c}</strong><div class="text-[10px] text-emerald-700">Đã mở khóa trên App Điệp Viên Study & Google Drive</div></div>
            <span class="px-2 py-0.5 bg-emerald-600 text-white font-black text-[10px] rounded">ĐÃ MỞ KHÓA</span>
        </div>`;
    });
    docs.forEach(d => {
        html += `<div class="p-3 bg-blue-50 border border-blue-200 rounded-xl flex justify-between items-center">
            <div><strong class="text-[#0D1677]"><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h6"/><path d="M9 11h4"/></svg> ${d.title || d.name || d.sku}</strong><div class="text-[10px] text-slate-500">Mã đơn #${d.orderCode}</div></div>
            ${d.driveUrl ? `<a href="${d.driveUrl}" target="_blank" class="px-2.5 py-1 bg-[#0D1677] text-white font-bold text-[10px] rounded-lg">Mở Drive</a>` : `<span class="text-emerald-700 font-bold text-[10px]">PAID_SUCCESS</span>`}
        </div>`;
    });
    btls.forEach(b => {
        const remAmt = Number(b.remainAmt || 0);
        const remCode = b.remainCode || (String(b.orderCode || "").startsWith("COC") ? ("TT" + String(b.orderCode).slice(3)) : ("TT" + b.orderCode));
        const remQr = b.remainQrUrl || (remAmt > 0 ? `https://img.vietqr.io/image/ACB-27820961-compact2.png?amount=${remAmt}&addInfo=${encodeURIComponent(remCode)}&accountName=TRINH%20DUC%20THINH` : "");
        const stUp = String(b.status || "").toUpperCase();
        const canPayRemain = remAmt > 0 && (stUp === "ĐÃ CỌC" || stUp === "ĐANG LÀM");
        html += `<div class="p-3 bg-amber-50 border border-amber-200 rounded-xl flex flex-col gap-2">
            <div class="flex justify-between items-center gap-2">
                <div><strong class="text-slate-900"> BTL: ${b.topic || b.orderCode}</strong><div class="text-[10px] text-slate-600">Mã #${b.orderCode} · Hạn nộp: ${b.deadline || "Theo yêu cầu"} · Trạng thái: <b>${b.status || "ĐÃ CỌC"}</b></div></div>
                ${b.driveUrl ? `<a href="${b.driveUrl}" target="_blank" class="px-2.5 py-1 bg-emerald-600 text-white font-bold text-[10px] rounded-lg whitespace-nowrap">Mở BTL Drive</a>` : `<span class="text-amber-700 font-bold text-[10px] whitespace-nowrap">${b.status || "ĐANG LÀM"}</span>`}
            </div>
            ${canPayRemain ? `<div class="flex items-center justify-between gap-2 pt-1.5 border-t border-amber-200/70">
                <span class="text-[10.5px] font-bold text-slate-700">Còn lại: <b class="text-rose-600">${remAmt.toLocaleString("vi-VN")} đ</b> (CK: <code>${remCode}</code>)</span>
                <a href="${remQr}" target="_blank" class="px-2.5 py-1 bg-[#0D1677] text-white font-extrabold text-[10px] rounded-lg whitespace-nowrap hover:bg-[#1E40AF]">Mở QR Thanh Toán Đủ</a>
            </div>` : ""}
        </div>`;
    });
    list.innerHTML = html;
}

async function submitCustomerSyncWeb() {
    const email = document.getElementById("syncCustEmailInput")?.value.trim().toLowerCase() || "";
    const name = document.getElementById("syncCustNameInput")?.value.trim() || "";
    const phone = (document.getElementById("syncCustPhoneInput")?.value.trim() || "").replace(/\[.*\]/g, "").trim();
    const password = document.getElementById("syncCustPassInput")?.value.trim() || "";
    const msgEl = document.getElementById("syncCustomerStatusMsg");

    if (!name || name.length < 2) {
        alert("Vui lòng nhập Tên đăng nhập của bạn trước khi đăng nhập!");
        document.getElementById("syncCustNameInput")?.focus();
        return;
    }
    if (!email || !email.includes("@")) {
        alert("Vui lòng nhập đúng địa chỉ Email của bạn!");
        document.getElementById("syncCustEmailInput")?.focus();
        return;
    }
    const myWebDevId = getWebDeviceId();
    if (msgEl) {
        msgEl.classList.remove("hidden");
        msgEl.textContent = "Đang đồng bộ tài khoản & chuẩn bị tải APP Diep Vien study...";
    }

    let syncedProfile = {
        email,
        name,
        phone,
        unlockedCourses: [],
        purchasedDocs: [],
        btlOrders: []
    };

    if (email === "diepvientailieu@gmail.com" || email === "admin@diepvientailieu.store") {
        const validAdminPass = ["0792453169", "dvtl@2026", "admin123", ""];
        const passCheck = (password || phone || "").trim().toLowerCase();
        if (validAdminPass.includes(passCheck)) {
            syncedProfile.name = name || "Admin Điệp Viên Tài Liệu";
            syncedProfile.phone = phone || "0792453169";
            syncedProfile.isAdmin = true;
            syncedProfile.unlockedCourses = ["ALL-COURSES-399K", ...(typeof COURSES_DATABASE !== "undefined" ? COURSES_DATABASE.map(c => c.id) : [])];
        }
    }
    if (state.webhookUrl && !syncedProfile.isAdmin) {
        try {
            const res = await fetch(state.webhookUrl + "?action=getCustomerSync&email=" + encodeURIComponent(email) + "&phone=" + encodeURIComponent(phone || password) + "&deviceId=" + encodeURIComponent(myWebDevId), { method: "GET", mode: "cors" });
            const data = await res.json();
            if (data && data.deviceLocked) {
                if (msgEl) {
                    msgEl.textContent = data.message || "Tài khoản Email này đã được kích hoạt cố định trên 1 thiết bị duy nhất. Không thể đăng nhập trên máy thứ 2!";
                }
                alert(data.message || "Tài khoản Email này đã được kích hoạt cố định trên 1 thiết bị duy nhất. Không thể chia sẻ sang máy thứ 2!");
                return;
            }
            if (data && data.ok && data.customer) {
                const rawServerPhone = String(data.customer.phone || "");
                const wbMatch = rawServerPhone.match(/\[WB:([A-Za-z0-9\-_]+)\]/);
                const hwMatch = rawServerPhone.match(/\[HW:([A-Za-z0-9\-_]+)\]/);
                if (wbMatch && wbMatch[1] && wbMatch[1] !== myWebDevId) {
                    const lockMsg = `CẢNH BÁO BẢO MẬT: Tài khoản Email [${email}] đã được khóa cố định trên 1 thiết bị trình duyệt khác (${wbMatch[1]}). Không thể đăng nhập hoặc chia sẻ chung sang máy thứ 2!`;
                    if (msgEl) msgEl.textContent = lockMsg;
                    alert(lockMsg);
                    return;
                }
                const cleanPhone = rawServerPhone.replace(/\[.*\]/g, "").trim() || phone;
                const expandedCourses = expandWebUnlockedCourses(data.customer.unlockedCourses || []);
                syncedProfile = {
                    ...syncedProfile,
                    ...data.customer,
                    name: name || data.customer.name || syncedProfile.name,
                    phone: cleanPhone,
                    unlockedCourses: expandedCourses
                };
            }
        } catch (e) {}
    }

    localStorage.setItem("dvtl_synced_customer", JSON.stringify(syncedProfile));
    saveCustomerProfileEverywhere({
        name: syncedProfile.name,
        phone: syncedProfile.phone,
        email: syncedProfile.email,
        source: "WEB_LOGIN_SYNC"
    });
    renderSyncedCustomerEntitlements(syncedProfile);
    renderCourses();

    // Khi khách đăng nhập xong -> Tự động tải bộ cài Desktop APP Điệp Viên Study (Phương án A - GitHub Release CDN trực tiếp)
    const isMacClient = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || "");
    if (isMacClient) {
        startDirectFileDownload("https://github.com/teamtccm/diepvientailieu.store/releases/download/v16.5.0/Diep-Vien-Study-macOS.zip", "Diep-Vien-Study-macOS.zip");
    } else {
        startDirectFileDownload("https://github.com/teamtccm/diepvientailieu.store/releases/download/v16.5.0/Diep-Vien-Study-Windows.zip", "Diep-Vien-Study-Windows.zip");
    }

    if (msgEl) {
        msgEl.innerHTML = `Đã lưu tài khoản <strong>${syncedProfile.name}</strong> (${email}) cho mọi giao dịch tự động tiếp theo và đang tải <strong>Diep Vien Study</strong>! <a href="Huong_Dan_Cai_Dat.pdf" target="_blank" download="Hướng dẫn cài đặt.pdf" class="underline font-black text-[#0D1677] dark:text-amber-300 ml-1">Xem Hướng Dẫn Cài Đặt (PDF)</a>.`;
    }
}

function logoutCustomerSyncWeb() {
    localStorage.removeItem("dvtl_synced_customer");
    localStorage.removeItem("dvtl_app_otp_verified_email");
    localStorage.removeItem("dvtl_app_otp_verified_name");
    localStorage.removeItem("dvs_cust_name");
    localStorage.removeItem("dvs_cust_phone");
    localStorage.removeItem("dvs_cust_email");
    applySyncedCustomerToForms();
    updateVerifiedAppDownloadUI();
    const box = document.getElementById("syncCustomerEntitlementsBox");
    if (box) box.classList.add("hidden");
    const msgEl = document.getElementById("syncCustomerStatusMsg");
    if (msgEl) {
        msgEl.classList.remove("hidden");
        msgEl.textContent = "Đã đăng xuất tài khoản đồng bộ.";
    }
}

async function verifyCourseBankPaymentNow() {
    if (!selectedCourseForCheckout) return;
    const cust = (typeof getSyncedCustomerLocal === "function" ? getSyncedCustomerLocal() : null) || {};
    const noteEl = document.getElementById("courseTransferNote");
    const orderCode = (noteEl?.dataset?.orderCode || noteEl?.textContent || "").split(" ")[0].trim();
    const emailInputEl = document.getElementById("courseStudentEmail");
    const phoneInputEl = document.getElementById("courseStudentPhone");
    const email = (emailInputEl?.value || cust.email || "").trim().toLowerCase();
    const rawPhone = (phoneInputEl?.value || cust.phone || "").replace(/\[.*\]/g, "").trim();
    const digitsPhone = rawPhone.replace(/\D/g, "");
    const statusText = document.getElementById("courseWaitingStatusText");

    const hasGoogleLogged = Boolean(cust.email && cust.email.includes("@"));
    const finalEmail = (hasGoogleLogged ? cust.email : email).trim().toLowerCase();

    if (!finalEmail || !finalEmail.includes("@")) {
        if (statusText) statusText.textContent = "Vui lòng nhập Email Gmail để hệ thống phân phát quyền truy cập khóa học Google Drive!";
        if (emailInputEl) emailInputEl.focus();
        alert("Vui lòng nhập Email Gmail để hệ thống phân phát quyền truy cập khóa học Google Drive!");
        return;
    }

    if (!/^0\d{9,10}$/.test(digitsPhone)) {
        if (statusText) statusText.textContent = "Bắt buộc nhập đúng số điện thoại Zalo (10 chữ số bắt đầu bằng số 0) để hoàn thành giao dịch!";
        if (phoneInputEl) phoneInputEl.focus();
        alert("Bắt buộc nhập đúng số điện thoại Zalo (10 chữ số bắt đầu bằng số 0) để hoàn thành giao dịch!");
        return;
    }

    const name = (cust.name || "").trim() || finalEmail.split("@")[0];
    saveCustomerProfileEverywhere({ name, phone: digitsPhone, email: finalEmail, source: "WEB_COURSE_CONFIRM" });

    const course = selectedCourseForCheckout;
    const payload = {
        action: "createOrder",
        type: "COURSE_REGISTRATION",
        orderType: "Khóa Học",
        status: "PENDING",
        orderCode: orderCode,
        transferMemo: noteEl?.textContent || orderCode,
        sku: course.id,
        itemName: course.title,
        price: course.price,
        amount: course.price,
        driveId: course.driveFolderId || "",
        name: name,
        phone: rawPhone,
        email: email,
        deviceId: getWebDeviceId(),
        bank: "ACB",
        stkNhan: "27820961",
        timestamp: new Date().toISOString()
    };
    try { sendWebhookData(payload); } catch (e) {}

    if (statusText) statusText.textContent = " Đang đối soát giao dịch ngân hàng ACB & kích hoạt khóa học cho mã #" + orderCode + "...";
    if (!state.webhookUrl || !orderCode) return;
    try {
        const verifyUrl = buildCourseVerifyUrl(orderCode, email) + '&manual=1';
        const res = await fetch(verifyUrl, { method: "GET", mode: "cors", cache: "no-store" });
        const data = await res.json();
        if (data && (data.verified === true || data.paid === true)) {
            onCoursePaymentConfirmed(orderCode, selectedCourseForCheckout.title, email || data.email || "", data.driveUrl || "");
        } else if (statusText) {
            statusText.textContent = " Hệ thống đang chờ xác nhận chuyển khoản ACB cho mã #" + orderCode + " (" + email + " · " + rawPhone + "). Ngay khi tiền về sẽ tự động mở khóa!";
        }
    } catch (e) {
        if (statusText) {
            statusText.textContent = " Đang kết nối máy chủ đối soát ngân hàng ACB cho mã #" + orderCode + ". Vui lòng thử lại sau vài giây!";
        }
    }
}

/* ==========================================================================
   10. APP DIEP VIEN STUDY — SHOWCASE & MANDATORY USERNAME + EMAIL GATE BEFORE DOWNLOAD
   ========================================================================== */

function getVerifiedAppOtpEmailLocal() {
    try {
        const cust = JSON.parse(localStorage.getItem("dvtl_synced_customer") || "null") || {};
        return (localStorage.getItem("dvtl_app_otp_verified_email") || cust.email || localStorage.getItem("dvs_cust_email") || "").trim().toLowerCase();
    } catch (_) {
        return "";
    }
}

function getVerifiedAppOtpNameLocal() {
    try {
        const cust = JSON.parse(localStorage.getItem("dvtl_synced_customer") || "null") || {};
        return (localStorage.getItem("dvtl_app_otp_verified_name") || cust.name || localStorage.getItem("dvs_cust_name") || "").trim();
    } catch (_) {
        return "";
    }
}

function isAppOtpVerifiedLocal() {
    const em = getVerifiedAppOtpEmailLocal();
    const nm = getVerifiedAppOtpNameLocal();
    return Boolean(em && em.includes("@") && nm.length >= 2);
}

function updateVerifiedAppDownloadUI() {
    const hdrLabel = document.getElementById("headerDownloadAppLabel");
    if (hdrLabel) {
        hdrLabel.textContent = "APP Diep Vien study";
    }
    validateAppDownloadGate();
}

function validateAppDownloadGate() {
    const nameInp = document.getElementById("appOtpNameInput");
    const emailInp = document.getElementById("appOtpEmailInput");
    const btnPwa = document.getElementById("btnInstantLaunchPwaApp");
    const btnWinExe = document.getElementById("btnDirectDownloadWinExe");
    const btnMacZip = document.getElementById("btnDirectDownloadMacZip");
    const badge = document.getElementById("appGateLockBadge");

    const nameVal = (nameInp?.value || "").trim();
    const emailVal = (emailInp?.value || "").trim().toLowerCase();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    const isReady = nameVal.length >= 2 && emailValid;

    [btnPwa, btnWinExe, btnMacZip].forEach(btn => {
        if (!btn) return;
        btn.disabled = !isReady;
        if (isReady) {
            btn.classList.remove("opacity-45", "cursor-not-allowed");
            btn.classList.add("opacity-100", "cursor-pointer");
        } else {
            btn.classList.add("opacity-45", "cursor-not-allowed");
            btn.classList.remove("opacity-100", "cursor-pointer");
        }
    });

    if (badge) {
        if (isReady) {
            badge.textContent = "Đã mở khóa tải App · Đã lưu TK";
            badge.className = "px-2 py-0.5 rounded-full text-[9.5px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300";
        } else {
            badge.textContent = "Điền để mở khóa tải";
            badge.className = "px-2 py-0.5 rounded-full text-[9.5px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300";
        }
    }

    return isReady;
}

// Upgrade onDocPaymentConfirmed to always grant Google Drive access, save customer profile, & send second App invite email
function onDocPaymentConfirmed(orderCode, email, driveUrl = "") {
    if (typeof docPollingInterval !== "undefined" && docPollingInterval) {
        clearInterval(docPollingInterval);
        docPollingInterval = null;
    }

    document.getElementById("docCheckoutStep1")?.classList.add("hidden");
    document.getElementById("docCheckoutStep2")?.classList.add("hidden");
    document.getElementById("docCheckoutStep3")?.classList.remove("hidden");
    const ordEl = document.getElementById("docSuccessOrderId");
    const emEl = document.getElementById("docSuccessEmail");
    if (ordEl) ordEl.textContent = orderCode;
    if (emEl) emEl.textContent = email;

    const doc = state.selectedDoc || {};
    const cust = getSyncedCustomerLocal() || {};
    const custName = document.getElementById("checkoutNameInput")?.value.trim() || cust.name || "Sinh Viên";
    const resolvedDriveId = doc.driveId || "1zPRnfdMbaaYWSKK8PZdZIuooOanjWynp";
    const fallbackUrl = driveUrl || (doc.driveId ? (doc.driveType === "folder" ? `https://drive.google.com/drive/folders/${doc.driveId}` : `https://drive.google.com/file/d/${doc.driveId}/view`) : "https://drive.google.com/drive/folders/1zPRnfdMbaaYWSKK8PZdZIuooOanjWynp");

    const warehouseWebhook = "https://script.google.com/macros/s/AKfycbxMOdsNkhY8-5xQtZ_86STf781VdFJbRsLkK6n8qRF4ENqreMsl4CdELYn-85wHcqvx/exec";
    if (email) {
        fetch(warehouseWebhook, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                email: email,
                name: custName,
                orderCode: orderCode,
                itemName: doc.name || doc.baseName || "Đề Cương Ôn Thi 50K",
                orderType: "Mua Đề Cương 50K",
                fileId: resolvedDriveId,
                fileLink: fallbackUrl
            })
        }).catch(() => {});
    }

    // Kho Phát File đã tự động gửi Email bàn giao + Email mời dùng App trong 1 luồng duy nhất (chống trùng mail)

    const prev = getSyncedCustomerLocal() || {};
    const prevDocs = Array.isArray(prev.purchasedDocs) ? prev.purchasedDocs : [];
    const updatedCust = {
        ...prev,
        email: email || prev.email || "",
        name: custName || prev.name || "",
        purchasedDocs: [
            {
                orderCode,
                sku: doc.code || "DC",
                name: doc.name || doc.baseName || "Đề Cương 50K",
                driveUrl: fallbackUrl
            },
            ...prevDocs.filter(x => x.orderCode !== orderCode)
        ]
    };
    localStorage.setItem("dvtl_synced_customer", JSON.stringify(updatedCust));
    saveCustomerProfileEverywhere({ name: custName, email, source: "WEB_DOC_PAID" });

    const driveBtn = document.getElementById("docSuccessDriveBtn");
    if (driveBtn) {
        driveBtn.href = fallbackUrl;
        driveBtn.classList.remove("hidden");
    }
}

let servicePollingInterval = null;
let currentServiceOrderData = null;
let isServiceVerifyInFlight = false;

function closeSuccessModal() {
    if (servicePollingInterval) {
        clearInterval(servicePollingInterval);
        servicePollingInterval = null;
    }
    const modal = document.getElementById("successModal");
    if (modal) modal.classList.add("hidden");
}

function openSuccessModal(type, orderData) {
    const modal = document.getElementById("successModal");
    if (!modal) return;
    currentServiceOrderData = orderData || null;

    const title = document.getElementById("successModalTitle");
    const desc = document.getElementById("successModalDesc");
    const orderId = document.getElementById("successOrderId");
    const customerMail = document.getElementById("successCustomerEmail");

    const cleanOrderId = String(orderData?.orderId || "").trim().split(" ")[0];
    const custEmail = String(orderData?.customer?.email || getSyncedCustomerLocal()?.email || "").trim().toLowerCase();

    if (orderId) orderId.textContent = cleanOrderId;
    if (customerMail) customerMail.textContent = custEmail;

    let qrBox = document.getElementById("serviceDepositQrBox");
    if (!qrBox && desc && desc.parentElement) {
        qrBox = document.createElement("div");
        qrBox.id = "serviceDepositQrBox";
        qrBox.className = "hidden mb-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#060E2C] border border-amber-400/60 text-center";
        desc.insertAdjacentElement("afterend", qrBox);
    }

    if (type === "DOC") {
        if (title) title.textContent = "Gửi Đơn Thành Công!";
        if (desc) desc.textContent = "Hệ thống đã ghi nhận mã đơn của bạn và phân quyền Google Drive vào Gmail!";
        if (qrBox) qrBox.classList.add("hidden");
    } else {
        const rawDep = String(orderData?.assignment?.depositAmount || "50000").replace(/\D/g, "");
        const depAmount = Number(rawDep) || 50000;
        const custName = orderData?.customer?.name || getSyncedCustomerLocal()?.name || "";
        const cleanName = removeVietnameseTones(custName).replace(/[^a-zA-Z0-9 ]/g, " ").toUpperCase().trim().slice(0, 18);
        const memo = orderData?.transferMemo || `${cleanOrderId || "COCBTL"} ${cleanName}`.trim();
        const qrSrc = `https://img.vietqr.io/image/ACB-27820961-compact2.png?amount=${depAmount}&addInfo=${encodeURIComponent(memo)}&accountName=TRINH%20DUC%20THINH`;
        if (title) title.textContent = "Đã Ghi Nhận Đơn Đặt Làm Bài!";
        if (desc) desc.textContent = "Quét mã VietQR bên dưới để đặt cọc 10% khởi động bài viết (ACB · 27820961 · TRINH DUC THINH):";
        if (qrBox) {
            qrBox.classList.remove("hidden");
            qrBox.innerHTML = `
                <img id="serviceDepositQrImg" src="${qrSrc}" alt="VietQR Đặt Cọc 10% BTL" class="w-44 h-44 mx-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm mb-2 object-contain">
                <div class="text-xs font-black text-[#0D1677] dark:text-amber-400">Số tiền cọc (10%): ${depAmount.toLocaleString("vi-VN")} VNĐ</div>
                <div class="text-[11px] font-mono text-slate-600 dark:text-slate-300 mt-0.5">Nội dung CK: <strong>${memo}</strong></div>
                <div id="serviceVerifyStatusText" class="text-[11px] text-amber-700 dark:text-amber-300 font-bold mt-2"> Đang tự động quét biến động số dư ACB & đối soát hạn nộp (Deadline)...</div>
                <button type="button" onclick="checkServicePaymentStatus('${cleanOrderId}', '${custEmail}', true)" class="mt-2.5 w-full py-2 px-3 bg-[#0D1677] hover:bg-[#1E40AF] text-white font-bold text-xs rounded-xl shadow transition">
                     Tôi Đã Chuyển Khoản Cọc — Kiểm Tra & Nhận Bản Check Ngay
                </button>
            `;
        }
        startServicePaymentPolling(cleanOrderId, custEmail);
    }

    modal.classList.remove("hidden");
}

function startServicePaymentPolling(orderCode, email) {
    if (servicePollingInterval) clearInterval(servicePollingInterval);
    if (!orderCode) return;
    setTimeout(() => checkServicePaymentStatus(orderCode, email, false), 2000);
    servicePollingInterval = setInterval(() => {
        checkServicePaymentStatus(orderCode, email, false);
    }, 5000);
}

async function checkServicePaymentStatus(orderCode, email, isManual = false) {
    if (!state.webhookUrl || !orderCode) return;
    if (!isManual && isServiceVerifyInFlight) return;
    isServiceVerifyInFlight = true;
    const stEl = document.getElementById("serviceVerifyStatusText");
    if (isManual && stEl) {
        stEl.textContent = " Đang kiểm tra biến động số dư ngân hàng ACB cho mã #" + orderCode + "...";
    }
    try {
        const verifyUrl = `${state.webhookUrl}?action=verify&orderType=btl&orderId=${encodeURIComponent(orderCode)}&email=${encodeURIComponent(email || "")}${isManual ? "&manual=1" : ""}`;
        const res = await fetch(verifyUrl, { method: "GET", mode: "cors", cache: "no-store" });
        const data = await res.json();
        if (data && (data.verified === true || data.paid === true)) {
            if (servicePollingInterval && data.btlDelivered === true) {
                clearInterval(servicePollingInterval);
                servicePollingInterval = null;
            }
            const title = document.getElementById("successModalTitle");
            const desc = document.getElementById("successModalDesc");
            const qrBox = document.getElementById("serviceDepositQrBox");
            const previewUrl = data.previewDriveUrl || "https://drive.google.com/drive/folders/1J5GxIOQocD0FeISMyaS980pRrs_Qu0qr";
            const fullUrl = data.fullDriveUrl || data.driveUrl || "";
            const deadlineStr = data.deadline || currentServiceOrderData?.assignment?.deadline || "Theo đúng hạn nộp";

            if (data.btlDelivered === true && fullUrl) {
                if (title) title.textContent = " Đã Tự Động Bàn Giao Bài Tập Lớn (BTL)!";
                if (desc) desc.textContent = "Bài Tập Lớn / Tiểu Luận của bạn đã hoàn tất và được cấp quyền Google Drive trực tiếp cho Email của bạn!";
                if (qrBox) {
                    qrBox.innerHTML = `
                        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 rounded-xl text-left space-y-2">
                            <div class="text-xs font-black text-emerald-800 dark:text-emerald-300"> ĐÃ BÀN GIAO BTL ĐÚNG HẠN (${deadlineStr})</div>
                            <div class="text-[11px] text-slate-600 dark:text-slate-300">Quyền truy cập Google Drive đã được mở tự động cho <strong>${email}</strong>.</div>
                            <a href="${fullUrl}" target="_blank" rel="noopener noreferrer" class="block w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl text-center shadow">
                                 MỞ FILE BÀI TẬP LỚN HOÀN CHỈNH (GOOGLE DRIVE)
                            </a>
                            <a href="${previewUrl}" target="_blank" rel="noopener noreferrer" class="block w-full py-2 px-3 bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white font-bold text-[11px] rounded-xl text-center">
                                 Mở Kho Bản Xem Trước / Đề Cương BTL
                            </a>
                        </div>
                    `;
                }
            } else {
                if (title) title.textContent = " Đã Xác Nhận Đặt Cọc 10% BTL!";
                if (desc) desc.textContent = "Hệ thống đã nhận cọc 10% qua ACB, gửi bản xem trước qua Email và hẹn giờ tự động bàn giao bản Full đúng Deadline!";
                if (qrBox) {
                    qrBox.innerHTML = `
                        <div class="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 rounded-xl text-left space-y-2">
                            <div class="text-xs font-black text-emerald-800 dark:text-emerald-300"> ĐÃ XÁC NHẬN CỌC #${orderCode}</div>
                            <div class="text-[11px] text-slate-700 dark:text-slate-200"> Hạn tự động bàn giao BTL hoàn chỉnh: <strong>${deadlineStr}</strong></div>
                            <a href="${previewUrl}" target="_blank" rel="noopener noreferrer" class="block w-full py-2.5 px-3 bg-[#0D1677] hover:bg-[#1E40AF] text-white font-black text-xs rounded-xl text-center shadow">
                                 MỞ BẢN XEM TRƯỚC / ĐỀ CƯƠNG BTL (GOOGLE DRIVE)
                            </a>
                            ${fullUrl ? `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer" class="block w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl text-center shadow"> MỞ FILE BTL HOÀN CHỈNH (GOOGLE DRIVE)</a>` : ""}
                        </div>
                    `;
                }
            }

            // Lưu đơn BTL vào hồ sơ đồng bộ của khách hàng
            const prev = getSyncedCustomerLocal() || {};
            const prevBtls = Array.isArray(prev.btlOrders) ? prev.btlOrders : [];
            const updatedCust = {
                ...prev,
                btlOrders: [
                    {
                        orderCode,
                        topic: data.topic || currentServiceOrderData?.assignment?.topic || "Bài Tập Lớn",
                        deadline: deadlineStr,
                        status: data.status || (data.btlDelivered ? "ĐÃ GIAO BÀI" : "ĐÃ CỌC"),
                        driveUrl: fullUrl || previewUrl
                    },
                    ...prevBtls.filter(x => x.orderCode !== orderCode)
                ]
            };
            localStorage.setItem("dvtl_synced_customer", JSON.stringify(updatedCust));
        } else if (isManual && stEl) {
            stEl.textContent = " Chưa nhận được Email biến động số dư từ ngân hàng ACB cho mã #" + orderCode + ". Hệ thống sẽ tự động cập nhật ngay khi tiền về!";
        }
    } catch (e) {
        if (isManual && stEl) {
            stEl.textContent = " Đang kết nối máy chủ đối soát ACB. Hệ thống vẫn đang quét tự động mỗi 5 giây...";
        }
    } finally {
        isServiceVerifyInFlight = false;
    }
}

// Tự động kiểm tra thanh toán ngay lập tức khi khách hàng chuyển từ App Ngân Hàng quay lại trình duyệt
if (typeof window !== "undefined") {
    const triggerActivePaymentChecksOnFocus = () => {
        try {
            const docStep2 = document.getElementById("docCheckoutStep2");
            if (docStep2 && !docStep2.classList.contains("hidden")) {
                const ord = (document.getElementById("checkoutOrderCode")?.textContent || "").trim().split(" ")[0];
                const em = (document.getElementById("checkoutEmailInput")?.value || "").trim().toLowerCase();
                if (ord) checkDocPaymentStatus(ord, em, false);
            }
            const courseStep2 = document.getElementById("courseCheckoutStep2");
            if (courseStep2 && !courseStep2.classList.contains("hidden") && selectedCourseForCheckout) {
                const noteEl = document.getElementById("courseTransferNote");
                const ord = (noteEl?.dataset?.orderCode || noteEl?.textContent || "").split(" ")[0].trim();
                const em = (document.getElementById("courseStudentEmail")?.value || "").trim().toLowerCase();
                if (ord) checkCoursePaymentStatus(ord, selectedCourseForCheckout.title, em, false);
            }
            const srvModal = document.getElementById("successModal");
            if (srvModal && !srvModal.classList.contains("hidden") && servicePollingInterval) {
                const ord = (document.getElementById("successOrderId")?.textContent || "").trim().split(" ")[0];
                const em = (document.getElementById("successCustomerEmail")?.textContent || "").trim().toLowerCase();
                if (ord) checkServicePaymentStatus(ord, em, false);
            }
        } catch (_) {}
    };
    window.addEventListener("focus", triggerActivePaymentChecksOnFocus);
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") triggerActivePaymentChecksOnFocus();
    });
}

function startDirectFileDownload(hrefUrl, downloadFilename = "Diep Vien Study (Windows).zip") {
    try {
        const a = document.createElement("a");
        a.href = hrefUrl;
        if (downloadFilename) a.setAttribute("download", downloadFilename);
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => a.remove(), 1200);
    } catch (_) {
        window.open(hrefUrl, "_blank", "noopener,noreferrer");
    }
}

function handleGatedAppDownload(targetPlatform = "exe") {
    if (!validateAppDownloadGate()) {
        alert("Vui lòng điền đầy đủ Tên đăng nhập và Email trước khi tải APP Diep Vien study!");
        return;
    }

    const nameVal = (document.getElementById("appOtpNameInput")?.value || "").trim();
    const emailVal = (document.getElementById("appOtpEmailInput")?.value || "").trim().toLowerCase();

    saveCustomerProfileEverywhere({
        name: nameVal,
        email: emailVal,
        source: "WEB_APP_DOWNLOAD_GATE"
    });

    if (targetPlatform === "macos") {
        startDirectFileDownload("https://github.com/teamtccm/diepvientailieu.store/releases/download/v16.5.0/Diep-Vien-Study-macOS.zip", "Diep-Vien-Study-macOS.zip");
    } else {
        startDirectFileDownload("https://github.com/teamtccm/diepvientailieu.store/releases/download/v16.5.0/Diep-Vien-Study-Windows.zip", "Diep-Vien-Study-Windows.zip");
    }
}

function openAppDownloadModal() {
    const modal = document.getElementById("appDownloadOtpModal");
    if (!modal) return;

    const cust = getSyncedCustomerLocal();
    const verifiedEmail = getVerifiedAppOtpEmailLocal();
    const verifiedName = getVerifiedAppOtpNameLocal();
    const nameInp = document.getElementById("appOtpNameInput");
    const emailInp = document.getElementById("appOtpEmailInput");

    if (nameInp) nameInp.value = verifiedName || cust?.name || nameInp.value || "";
    if (emailInp) emailInp.value = verifiedEmail || cust?.email || emailInp.value || "";

    validateAppDownloadGate();

    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closeAppDownloadModal() {
    const modal = document.getElementById("appDownloadOtpModal");
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

function triggerDirectAppDownload(platform = "windows") {
    handleGatedAppDownload(platform);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        applySyncedCustomerToForms();
        updateVerifiedAppDownloadUI();
    }, 200);
});



// ============================================================================
// === V10.4: ĐĂNG NHẬP 1 CHẠM BẰNG TÀI KHOẢN GOOGLE (WEB + BRIDGE CHO APP) ===
// ============================================================================
const DVTL_GOOGLE_CLIENT_ID = "963881331331-d22ei0lqfvvqfa4hqjafftcrfhaghs0l.apps.googleusercontent.com";
let _dvtlGoogleGsiInited = false;
let _dvtlAppBridgeCallbackUrl = "";

function dvtlDecodeJwtPayload(jwt) {
    try {
        const part = String(jwt || "").split(".")[1] || "";
        const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
        const jsonStr = decodeURIComponent(atob(b64).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
        return JSON.parse(jsonStr);
    } catch (_) { return null; }
}

function dvtlRenderGoogleSignedBadge(cust) {
    const badge = document.getElementById("dvtlGoogleSignedBadge");
    if (!badge) return;
    if (cust && cust.email) {
        badge.classList.remove("hidden");
        const av = document.getElementById("dvtlGoogleAvatar");
        const nm = document.getElementById("dvtlGoogleName");
        const em = document.getElementById("dvtlGoogleEmail");
        if (nm) nm.textContent = cust.name || cust.email.split("@")[0];
        if (em) em.textContent = cust.email;
        if (av && cust.picture) { av.src = cust.picture; av.classList.remove("hidden"); }
    } else {
        badge.classList.add("hidden");
    }
}

async function handleDvtlGoogleCredential(response) {
    const idToken = response && response.credential;
    if (!idToken) return;

    // 1) Nếu đang ở chế độ Bridge đăng nhập cho App Desktop -> chuyển thẳng id_token về 127.0.0.1!
    if (_dvtlAppBridgeCallbackUrl && /^http:\/\/127\.0\.0\.1:\d+\/api\/auth\/google\/callback/.test(_dvtlAppBridgeCallbackUrl)) {
        const st = document.getElementById("dvtlAppBridgeStatus");
        if (st) st.textContent = " Đã xác thực Google! Đang chuyển về App Điệp Viên Study...";
        window.location.href = _dvtlAppBridgeCallbackUrl + "?id_token=" + encodeURIComponent(idToken);
        return;
    }

    // 2) Đăng nhập trực tiếp trên Website -> Xác thực với GAS + Lưu session + Mở khóa!
    const msgEl = document.getElementById("dvtlGoogleStatusMsg");
    if (msgEl) {
        msgEl.className = "mt-2 text-[11px] font-bold text-center text-blue-600";
        msgEl.textContent = "Đang xác thực tài khoản Google với hệ thống...";
        msgEl.classList.remove("hidden");
    }

    const decoded = dvtlDecodeJwtPayload(idToken) || {};
    let verifiedCust = {
        email: String(decoded.email || "").trim().toLowerCase(),
        name: String(decoded.name || (decoded.email || "").split("@")[0]).trim(),
        picture: String(decoded.picture || "").trim(),
        phone: (getSyncedCustomerLocal() && getSyncedCustomerLocal().phone) || "",
        verifiedByGoogle: true,
        isAdmin: ["diepvientailieu@gmail.com"].includes(String(decoded.email || "").trim().toLowerCase()),
        unlockedCourses: [],
        purchasedDocs: [],
        btlOrders: []
    };

    try {
        const apiUrl = (typeof GAS_WEBAPP_URL !== "undefined" ? GAS_WEBAPP_URL : (window.APPS_SCRIPT_URL || ""));
        if (apiUrl) {
            const r = await fetch(apiUrl + "?action=verifyGoogleLogin&idToken=" + encodeURIComponent(idToken));
            const data = await r.json();
            if (data && data.ok && data.customer) {
                verifiedCust = Object.assign(verifiedCust, data.customer);
            }
        }
    } catch (e) { console.warn("GAS verifyGoogleLogin fallback:", e); }

    if (typeof saveCustomerProfileEverywhere === "function") {
        saveCustomerProfileEverywhere(verifiedCust);
    } else {
        try { localStorage.setItem("dvtl_synced_customer", JSON.stringify(verifiedCust)); } catch (_) {}
    }
    if (typeof applySyncedCustomerToForms === "function") applySyncedCustomerToForms(verifiedCust);
    if (typeof renderSyncedCustomerEntitlements === "function") renderSyncedCustomerEntitlements(verifiedCust);
    dvtlRenderGoogleSignedBadge(verifiedCust);

    const lbl = document.getElementById("headerAccountSyncLabel");
    if (lbl && verifiedCust.email) lbl.textContent = verifiedCust.name || verifiedCust.email.split("@")[0];

    if (msgEl) {
        msgEl.className = "mt-2 text-[11px] font-bold text-center text-emerald-600";
        msgEl.textContent = " Đăng nhập Google thành công (" + verifiedCust.email + ")!";
    }
}

function initDvtlGoogleSignIn(retryCount) {
    const tries = retryCount || 0;
    if (!(window.google && window.google.accounts && window.google.accounts.id)) {
        if (tries < 25) setTimeout(() => initDvtlGoogleSignIn(tries + 1), 350);
        return;
    }
    if (!_dvtlGoogleGsiInited) {
        window.google.accounts.id.initialize({
            client_id: DVTL_GOOGLE_CLIENT_ID,
            callback: handleDvtlGoogleCredential,
            auto_select: false,
            ux_mode: "popup"
        });
        _dvtlGoogleGsiInited = true;
    }
    const webWrap = document.getElementById("dvtlGoogleBtnWrap");
    if (webWrap && !webWrap.dataset.rendered) {
        webWrap.innerHTML = "";
        window.google.accounts.id.renderButton(webWrap, {
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "pill",
            logo_alignment: "left",
            width: 310,
            locale: "vi"
        });
        webWrap.dataset.rendered = "1";
    }
    // Check if opened from Desktop App for Google Sign-In bridge
    const params = new URLSearchParams(window.location.search);
    if (params.get("app_google_auth") === "1") {
        const cb = params.get("cb") || "";
        if (/^http:\/\/127\.0\.0\.1:\d+\/api\/auth\/google\/callback/.test(cb)) {
            _dvtlAppBridgeCallbackUrl = cb;
            const ov = document.getElementById("dvtlAppGoogleBridgeOverlay");
            if (ov) ov.classList.remove("hidden");
            const bridgeWrap = document.getElementById("dvtlAppBridgeGoogleBtn");
            if (bridgeWrap && !bridgeWrap.dataset.rendered) {
                bridgeWrap.innerHTML = "";
                window.google.accounts.id.renderButton(bridgeWrap, {
                    theme: "filled_blue",
                    size: "large",
                    text: "continue_with",
                    shape: "pill",
                    width: 310,
                    locale: "vi"
                });
                bridgeWrap.dataset.rendered = "1";
            }
            const st = document.getElementById("dvtlAppBridgeStatus");
            if (st) st.textContent = "Bấm nút Google phía trên để xác thực 1 chạm cho App.";
            try { window.google.accounts.id.prompt(); } catch (_) {}
        }
    }
    const cur = (typeof getSyncedCustomerLocal === "function") ? getSyncedCustomerLocal() : null;
    if (cur) dvtlRenderGoogleSignedBadge(cur);
}

// Hook into openCustomerSyncModal so Google button is always rendered cleanly
if (typeof openCustomerSyncModal === "function") {
    const _origOpenSyncModal = openCustomerSyncModal;
    window.openCustomerSyncModal = function() {
        _origOpenSyncModal.apply(this, arguments);
        initDvtlGoogleSignIn(0);
        const cur = (typeof getSyncedCustomerLocal === "function") ? getSyncedCustomerLocal() : null;
        dvtlRenderGoogleSignedBadge(cur);
    };
    openCustomerSyncModal = window.openCustomerSyncModal;
}
document.addEventListener("DOMContentLoaded", () => initDvtlGoogleSignIn(0));



// ============================================================================
// === V10.5: BẤM ĐĂNG NHẬP/ĐĂNG KÝ -> GOOGLE NGAY + HIỆN LOGO & TÊN GOOGLE ===
// ============================================================================
const DVTL_GOOGLE_G_ICON_HTML = `<svg class="w-4 h-4 shrink-0" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`;
let _dvtlGoogleTokenClient = null;

function dvtlRefreshHeaderGoogleBtn(cust) {
    const iconWrap = document.getElementById("headerAccountSyncIcon");
    const lbl = document.getElementById("headerAccountSyncLabel");
    const btn = document.getElementById("headerAccountSyncBtn");
    const logoutBtn = document.getElementById("dvtlGoogleLogoutBtn");
    if (cust && cust.email) {
        const displayName = (cust.name && cust.name.trim()) ? cust.name.trim() : cust.email.split("@")[0];
        if (lbl) lbl.textContent = displayName;
        if (iconWrap) {
            if (cust.picture) {
                iconWrap.innerHTML = `<span class="relative inline-flex items-center justify-center"><img src="${cust.picture}" alt="" referrerpolicy="no-referrer" class="w-5 h-5 rounded-full object-cover border border-white/90 shadow-sm"><span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-white flex items-center justify-center shadow">${DVTL_GOOGLE_G_ICON_HTML.replace('w-4 h-4', 'w-2.5 h-2.5')}</span></span>`;
            } else {
                iconWrap.innerHTML = `<span class="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">${DVTL_GOOGLE_G_ICON_HTML.replace('w-4 h-4', 'w-3.5 h-3.5')}</span>`;
            }
        }
        if (btn) {
            btn.className = "inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-[11px] rounded-full shadow-md border border-white/80 transition whitespace-nowrap max-w-[185px]";
            btn.title = displayName + " (" + cust.email + ")";
        }
        if (logoutBtn) logoutBtn.classList.remove("hidden");
    } else {
        if (lbl) lbl.textContent = "Đăng nhập / Đăng ký";
        if (iconWrap) {
            iconWrap.innerHTML = `<span class="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">${DVTL_GOOGLE_G_ICON_HTML.replace('w-4 h-4', 'w-3.5 h-3.5')}</span>`;
        }
        if (btn) {
            btn.className = "inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FFA000] hover:bg-amber-400 text-slate-950 font-black text-[11px] rounded-full shadow-md transition whitespace-nowrap";
            btn.title = "Đăng nhập nhanh bằng tài khoản Google";
        }
        if (logoutBtn) logoutBtn.classList.add("hidden");
    }
}

async function dvtlCompleteGoogleLogin(profileObj, serverQuery) {
    let verifiedCust = Object.assign({
        email: "",
        name: "",
        picture: "",
        phone: (getSyncedCustomerLocal() && getSyncedCustomerLocal().phone) || "",
        verifiedByGoogle: true,
        isAdmin: false,
        unlockedCourses: [],
        purchasedDocs: [],
        btlOrders: []
    }, profileObj || {});

    verifiedCust.email = String(verifiedCust.email || "").trim().toLowerCase();
    verifiedCust.isAdmin = ["diepvientailieu@gmail.com"].includes(verifiedCust.email);

    try {
        const apiUrl = (typeof GAS_WEBAPP_URL !== "undefined" ? GAS_WEBAPP_URL : (window.APPS_SCRIPT_URL || ""));
        if (apiUrl && serverQuery) {
            const r = await fetch(apiUrl + "?action=verifyGoogleLogin&" + serverQuery);
            const data = await r.json();
            if (data && data.ok && data.customer) {
                verifiedCust = Object.assign(verifiedCust, data.customer);
            }
        }
    } catch (e) { console.warn("GAS verifyGoogleLogin note:", e); }

    if (typeof saveCustomerProfileEverywhere === "function") {
        saveCustomerProfileEverywhere(verifiedCust);
    } else {
        try { localStorage.setItem("dvtl_synced_customer", JSON.stringify(verifiedCust)); } catch (_) {}
    }
    if (typeof applySyncedCustomerToForms === "function") applySyncedCustomerToForms(verifiedCust);
    if (typeof renderSyncedCustomerEntitlements === "function") renderSyncedCustomerEntitlements(verifiedCust);
    if (typeof dvtlRenderGoogleSignedBadge === "function") dvtlRenderGoogleSignedBadge(verifiedCust);
    dvtlRefreshHeaderGoogleBtn(verifiedCust);

    const msgEl = document.getElementById("dvtlGoogleStatusMsg");
    if (msgEl) {
        msgEl.className = "mt-2 text-[11px] font-bold text-center text-emerald-600";
        msgEl.textContent = " Đã đăng nhập Google: " + (verifiedCust.name || verifiedCust.email);
        msgEl.classList.remove("hidden");
    }
}

async function handleDvtlGoogleAccessToken(tokenResp) {
    if (!tokenResp || !tokenResp.access_token) return;
    const accessToken = tokenResp.access_token;

    // App bridge support if opened with ?app_google_auth=1
    if (_dvtlAppBridgeCallbackUrl && /^http:\/\/127\.0\.0\.1:\d+\/api\/auth\/google\/callback/.test(_dvtlAppBridgeCallbackUrl)) {
        const st = document.getElementById("dvtlAppBridgeStatus");
        if (st) st.textContent = " Đã xác thực Google! Đang chuyển về App Điệp Viên Study...";
        window.location.href = _dvtlAppBridgeCallbackUrl + "?access_token=" + encodeURIComponent(accessToken);
        return;
    }

    try {
        const uRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { "Authorization": "Bearer " + accessToken }
        });
        const uInfo = await uRes.json();
        if (uInfo && uInfo.email) {
            await dvtlCompleteGoogleLogin({
                email: uInfo.email,
                name: uInfo.name || uInfo.given_name || uInfo.email.split("@")[0],
                picture: uInfo.picture || ""
            }, "accessToken=" + encodeURIComponent(accessToken));
        }
    } catch (err) {
        console.error("Google userinfo error:", err);
    }
}

function triggerDirectGoogleLoginPopup() {
    if (window.google && window.google.accounts && window.google.accounts.oauth2) {
        try {
            if (!_dvtlGoogleTokenClient) {
                _dvtlGoogleTokenClient = window.google.accounts.oauth2.initTokenClient({
                    client_id: DVTL_GOOGLE_CLIENT_ID,
                    scope: "openid email profile",
                    callback: handleDvtlGoogleAccessToken
                });
            }
            _dvtlGoogleTokenClient.requestAccessToken({ prompt: "select_account" });
            return true;
        } catch (e) {
            console.warn("OAuth2 token client fallback:", e);
        }
    }
    return false;
}

window.handleHeaderAuthClick = function() {
    const cur = (typeof getSyncedCustomerLocal === "function") ? getSyncedCustomerLocal() : null;
    if (cur && cur.email) {
        // Đã đăng nhập -> mở thẻ thông tin tài khoản Google + khóa học đã mua + nút Đăng xuất
        if (typeof openCustomerSyncModal === "function") openCustomerSyncModal();
        dvtlRefreshHeaderGoogleBtn(cur);
        return;
    }
    // Chưa đăng nhập -> Mở thẳng cửa sổ chọn tài khoản Google luôn!
    const opened = triggerDirectGoogleLoginPopup();
    if (!opened && typeof openCustomerSyncModal === "function") {
        openCustomerSyncModal();
    }
};

window.dvtlLogoutGoogleWeb = function() {
    try {
        if (typeof logoutCustomerSyncWeb === "function") logoutCustomerSyncWeb();
        localStorage.removeItem("dvtl_synced_customer");
        localStorage.removeItem("dvtl_cust_profile");
        localStorage.removeItem("dvs_cust_email");
        localStorage.removeItem("dvs_google_user");
    } catch (_) {}
    dvtlRefreshHeaderGoogleBtn(null);
    if (typeof dvtlRenderGoogleSignedBadge === "function") dvtlRenderGoogleSignedBadge(null);
    if (typeof closeCustomerSyncModal === "function") closeCustomerSyncModal();
};

// Override handleDvtlGoogleCredential so GIS button also updates header avatar/name cleanly
const _prevHandleCredV104 = (typeof handleDvtlGoogleCredential === "function") ? handleDvtlGoogleCredential : null;
handleDvtlGoogleCredential = async function(response) {
    if (_prevHandleCredV104) await _prevHandleCredV104(response);
    const cur = (typeof getSyncedCustomerLocal === "function") ? getSyncedCustomerLocal() : null;
    dvtlRefreshHeaderGoogleBtn(cur);
};

document.addEventListener("DOMContentLoaded", () => {
    const cur = (typeof getSyncedCustomerLocal === "function") ? getSyncedCustomerLocal() : null;
    dvtlRefreshHeaderGoogleBtn(cur);
});


/* ============================================================================
   v10.6: STRUCTURED COURSE STUDY HUB & GOOGLE CHECKOUT SYNC
   ============================================================================ */
window.triggerGoogleSignInForCheckout = function(mode) {
    const opened = typeof triggerDirectGoogleLoginPopup === "function" ? triggerDirectGoogleLoginPopup() : false;
    if (!opened && typeof openCustomerSyncModal === "function") {
        openCustomerSyncModal();
    }
};

function getWebCourseStructuredUnits(course) {
    if (!course || typeof COURSES_DATABASE === "undefined") return [];
    const findC = (id) => COURSES_DATABASE.find(x => x.id === id);
    const mapIds = {
        "C199-KHTN1": ["K69-TOAN-DUC", "K69-LY-BIEN", "K69-SINH-NGHE"],
        "C199-KHTN2": ["K69-TOAN-TIEN", "K69-LY-TIEN", "K69-ANH-MP"],
        "C199-KHXH1": ["K69-VAN-SM", "K69-SU-HUONG", "K69-DIA-TUNG"],
        "C199-KHXH2": ["K69-TOAN-SHIPPER", "K69-VAN-SM", "K69-ANH-MP"],
        "C199-HSA": ["K69-HSA-HOCMAI", "K69-HSA-MAP", "K69-HSA-EMPIRE", "K69-HSA-EDU"],
        "C199-TSA": ["K69-TSA-BMC", "K69-TSA-HOCMAI"],
        "C199-VACT": ["K69-VACT-HOCMAI", "K69-VACT-EMPIRE", "K69-VACT-MAP"]
    };
    if (course.id === "ALL-COURSES-399K") {
        return COURSES_DATABASE.filter(c => c.id !== "ALL-COURSES-399K" && !c.isPackageOnly);
    }
    const subIds = mapIds[course.id];
    if (subIds && subIds.length) {
        return subIds.map(findC).filter(Boolean);
    }
    return [course];
}

window.openWebCourseStudyHubModal = function(courseId) {
    if (typeof COURSES_DATABASE === "undefined") return;
    const course = COURSES_DATABASE.find(c => c.id === courseId) || COURSES_DATABASE[0];
    if (!course) return;
    const cust = (typeof getSyncedCustomerLocal === "function" ? getSyncedCustomerLocal() : null) || {};
    const authQ = cust.email ? `?authuser=${encodeURIComponent(cust.email)}` : "";
    const units = getWebCourseStructuredUnits(course);
    const mainDriveUrl = (course.driveUrl || `https://drive.google.com/drive/folders/${course.driveFolderId}`) + authQ;

    let modal = document.getElementById("webCourseStudyHubModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "webCourseStudyHubModal";
        modal.className = "fixed inset-0 z-[110] hidden items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto";
        modal.onclick = function(ev) { if (ev.target === modal) closeWebCourseStudyHubModal(); };
        document.body.appendChild(modal);
    }

    const unitsHtml = units.map((u, idx) => {
        const meta = typeof getCourseVisualMeta === "function" ? getCourseVisualMeta(u) : { badge: "MÔN HỌC", colorClass: "text-[#0D1677] bg-blue-50" };
        const uUrl = (u.driveUrl || `https://drive.google.com/drive/folders/${u.driveFolderId}`) + authQ;
        return `
            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#060E2C] border border-slate-200 dark:border-white/15 flex flex-col justify-between gap-2.5 hover:border-[#0D1677] transition">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-1">
                        <span class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-blue-100 dark:bg-blue-950 text-[#0D1677] dark:text-amber-300">
                            Học phần ${idx + 1} · ${meta.badge}
                        </span>
                        <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400"> Đã mở khóa</span>
                    </div>
                    <h4 class="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug">${u.title}</h4>
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-semibold">${u.instructor || ""}</p>
                </div>
                <div class="flex items-center gap-2 pt-2 border-t border-slate-200/70 dark:border-white/10">
                    <a href="${uUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 px-3 bg-[#0D1677] hover:bg-[#1E40AF] text-white font-black text-[11px] rounded-xl text-center shadow-sm transition">
                         Mở Thư Mục Học Phần
                    </a>
                </div>
            </div>
        `;
    }).join("");

    modal.innerHTML = `
        <div class="bg-white dark:bg-[#0A143D] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/15 w-full max-w-2xl max-h-[92vh] overflow-y-auto p-5 sm:p-6 relative" onclick="event.stopPropagation()">
            <button onclick="closeWebCourseStudyHubModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-red-100 text-slate-600 dark:text-slate-300 hover:text-red-600 font-black flex items-center justify-center transition">&times;</button>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-slate-200 dark:border-white/10 pr-8">
                <img src="${course.coverImage || course.defaultCover || 'images/banners/combo_khtn.png'}" alt="${course.title}" class="w-full sm:w-36 aspect-video object-cover rounded-xl border border-slate-200 shrink-0">
                <div class="space-y-1">
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase">
                         Đã kích hoạt quyền truy cập khóa học
                    </div>
                    <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white font-condensed uppercase leading-snug">${course.title}</h3>
                    <p class="text-xs text-slate-500 dark:text-slate-300 font-semibold">${course.instructor || ""}</p>
                </div>
            </div>

            <div class="mt-4">
                <div class="flex items-center justify-between gap-2 mb-2.5">
                    <h4 class="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                         Cấu Trúc Các Môn & Chuyên Đề Trong Khóa Của Bạn (${units.length} thư mục)
                    </h4>
                    <a href="${mainDriveUrl}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-black text-xs shadow-sm transition whitespace-nowrap flex-shrink-0 inline-flex items-center justify-center">
                         Mở Drive Khóa Học
                    </a>
                </div>
                <div class="grid sm:grid-cols-2 gap-3 max-h-[52vh] overflow-y-auto pr-1">
                    ${unitsHtml}
                </div>
            </div>
        </div>
    `;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
};

window.closeWebCourseStudyHubModal = function() {
    const modal = document.getElementById("webCourseStudyHubModal");
    if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }
};

window.openWebCourseStudyHubFromSuccess = function() {
    const cid = selectedCourseForCheckout ? selectedCourseForCheckout.id : "C199-HSA";
    closeCourseCheckoutModal();
    openWebCourseStudyHubModal(cid);
};

// Override handleWebCourseCardClick so unlocked courses open the structured Study Hub modal!
handleWebCourseCardClick = function(courseId) {
    const cust = getSyncedCustomerLocal() || {};
    if (isWebAdminEmail(cust.email) || isWebCourseUnlocked(courseId)) {
        openWebCourseStudyHubModal(courseId);
        return;
    }
    openCourseCheckoutModal(courseId);
};

// Hook into dvtlRefreshHeaderGoogleBtn so whenever Google login finishes, open checkout modals sync immediately
const _origRefreshHdrV106 = typeof dvtlRefreshHeaderGoogleBtn === "function" ? dvtlRefreshHeaderGoogleBtn : null;
dvtlRefreshHeaderGoogleBtn = function(cust) {
    if (_origRefreshHdrV106) _origRefreshHdrV106(cust);
    try { syncDocCheckoutGoogleUi(); } catch (_) {}
    try { syncCourseCheckoutGoogleUi(); } catch (_) {}
};



// [v10.8 STRICT AUTH, CHECKOUT VALIDATION & DUAL-END DRIVE ACCESS]
(function() {
    window.isWebCourseUnlocked = function(courseId) {
        const cust = (typeof getSyncedCustomerLocal === "function" ? getSyncedCustomerLocal() : null);
        if (!cust || !isCustomerGoogleLoggedIn(cust)) return false;
        const em = String(cust.email || "").trim().toLowerCase();
        if (cust.isAdmin || em === "diepvientailieu@gmail.com" ) return true;
        if (!Array.isArray(cust.unlockedCourses) || cust.unlockedCourses.length === 0) return false;
        const expanded = expandWebUnlockedCourses(cust.unlockedCourses);
        const target = String(courseId || "").toUpperCase();
        return expanded.includes("ALL-COURSES-399K") || expanded.includes("__ALL_COURSES_399K__") || expanded.includes(target);
    };

    window.syncDocCheckoutGoogleUi = function() {
        const cust = (typeof getSyncedCustomerLocal === "function" ? getSyncedCustomerLocal() : null) || {};
        const loggedIn = isCustomerGoogleLoggedIn(cust);
        const savedEmail = loggedIn ? String(cust.email || "").trim().toLowerCase() : "";
        const savedName = loggedIn ? String(cust.name || "").trim() : "";
        const savedPhone = String(cust.phone || localStorage.getItem("dvs_cust_phone") || "").replace(/\[.*\]/g, "").trim();

        const bannerEl = document.getElementById("docGoogleLoggedBanner");
        const emailWrapEl = document.getElementById("docEmailInputWrap");
        const savedTxtEl = document.getElementById("docSavedAccountText");
        const emailInputEl = document.getElementById("checkoutEmailInput");
        const phoneInputEl = document.getElementById("checkoutPhoneInput");

        if (phoneInputEl && savedPhone && !phoneInputEl.value) phoneInputEl.value = savedPhone;

        if (loggedIn && savedEmail) {
            if (bannerEl) bannerEl.classList.remove("hidden");
            if (emailWrapEl) emailWrapEl.classList.add("hidden");
            if (savedTxtEl) savedTxtEl.textContent = savedName ? `${savedName} (${savedEmail})` : savedEmail;
            if (emailInputEl) emailInputEl.value = savedEmail;
        } else {
            if (bannerEl) bannerEl.classList.add("hidden");
            if (emailWrapEl) emailWrapEl.classList.remove("hidden");
            if (emailInputEl && emailInputEl.value === String(cust.email || "").trim().toLowerCase() && !loggedIn) {
                emailInputEl.value = "";
            }
        }
    };

    window.syncCourseCheckoutGoogleUi = function() {
        const cust = (typeof getSyncedCustomerLocal === "function" ? getSyncedCustomerLocal() : null) || {};
        const loggedIn = isCustomerGoogleLoggedIn(cust);
        const savedEmail = loggedIn ? String(cust.email || "").trim().toLowerCase() : "";
        const savedName = loggedIn ? String(cust.name || "").trim() : "";
        const savedPhone = String(cust.phone || localStorage.getItem("dvs_cust_phone") || "").replace(/\[.*\]/g, "").trim();

        const bannerEl = document.getElementById("courseSavedAccountBanner");
        const emailWrapEl = document.getElementById("courseEmailInputWrap");
        const savedTxtEl = document.getElementById("courseSavedAccountText");
        const emailInputEl = document.getElementById("courseStudentEmail");
        const phoneInputEl = document.getElementById("courseStudentPhone");
        const nameInputEl = document.getElementById("courseStudentName");

        if (nameInputEl && savedName) nameInputEl.value = savedName;
        if (phoneInputEl && savedPhone && !phoneInputEl.value) phoneInputEl.value = savedPhone;

        if (loggedIn && savedEmail) {
            if (bannerEl) bannerEl.classList.remove("hidden");
            if (emailWrapEl) emailWrapEl.classList.add("hidden");
            if (savedTxtEl) savedTxtEl.textContent = savedName ? `${savedName} (${savedEmail})` : savedEmail;
            if (emailInputEl) emailInputEl.value = savedEmail;
        } else {
            if (bannerEl) bannerEl.classList.add("hidden");
            if (emailWrapEl) emailWrapEl.classList.remove("hidden");
            if (emailInputEl && emailInputEl.value === String(cust.email || "").trim().toLowerCase() && !loggedIn) {
                emailInputEl.value = "";
            }
        }
    };

    window.adjustCheckoutFormForAuthState = function(modalType) {
        if (modalType === "doc" || !modalType) window.syncDocCheckoutGoogleUi();
        if (modalType === "course" || !modalType) window.syncCourseCheckoutGoogleUi();
    };

    const _origHeaderAuth = window.handleHeaderAuthClick;
    window.handleHeaderAuthClick = function() {
        const cur = (typeof getSyncedCustomerLocal === "function") ? getSyncedCustomerLocal() : null;
        if (isCustomerGoogleLoggedIn(cur)) {
            if (typeof openCustomerSyncModal === "function") openCustomerSyncModal();
            if (typeof dvtlRefreshHeaderGoogleBtn === "function") dvtlRefreshHeaderGoogleBtn(cur);
            return;
        }
        const opened = typeof triggerDirectGoogleLoginPopup === "function" ? triggerDirectGoogleLoginPopup() : false;
        if (!opened && typeof openCustomerSyncModal === "function") {
            openCustomerSyncModal();
        }
    };

    const _origRefreshBtn = window.dvtlRefreshHeaderGoogleBtn;
    if (typeof _origRefreshBtn === "function") {
        window.dvtlRefreshHeaderGoogleBtn = function(custArg) {
            const c = custArg || (typeof getSyncedCustomerLocal === "function" ? getSyncedCustomerLocal() : null);
            return _origRefreshBtn(isCustomerGoogleLoggedIn(c) ? c : null);
        };
    }

    const origOpenDoc = window.openDocCheckoutModal;
    if (typeof origOpenDoc === "function") {
        window.openDocCheckoutModal = function() {
            const res = origOpenDoc.apply(this, arguments);
            window.syncDocCheckoutGoogleUi();
            return res;
        };
    }

    const origOpenCourse = window.openCourseCheckoutModal;
    if (typeof origOpenCourse === "function") {
        window.openCourseCheckoutModal = function() {
            const res = origOpenCourse.apply(this, arguments);
            window.syncCourseCheckoutGoogleUi();
            return res;
        };
    }
})();


// [v13.0 MAIL-DRIVE-WEB SYNC & COVER CACHE PURGE]
(function() {
    try {
        if (localStorage.getItem("dvtl_covers_v13_0_purged") !== "1") {
            localStorage.removeItem("dvtl_web_course_covers");
            localStorage.removeItem("dvs_course_custom_covers");
            localStorage.setItem("dvtl_covers_v13_0_purged", "1");
        }
    } catch (_) {}

    // Auto-reverify Google Drive & Master Sheet entitlements on page load for logged-in Gmail
    async function syncWebEntitlementsWithDrive() {
        const cust = (typeof getSyncedCustomerLocal === "function") ? getSyncedCustomerLocal() : null;
        if (!cust || !isCustomerGoogleLoggedIn(cust) || !cust.email) return;
        const em = String(cust.email).trim().toLowerCase();
        if (em === "diepvientailieu@gmail.com") {
            cust.isAdmin = true;
            localStorage.setItem("dvtl_synced_customer", JSON.stringify(cust));
            if (typeof state !== "undefined" && state.currentView === "courses" && typeof renderCourses === "function") renderCourses();
            return;
        }
        if (typeof state === "undefined" || !state.webhookUrl) return;
        try {
            const devId = typeof getWebDeviceId === "function" ? getWebDeviceId() : "";
            const url = `${state.webhookUrl}?action=getCustomerSync&email=${encodeURIComponent(em)}&deviceId=${encodeURIComponent(devId)}&_t=${Date.now()}`;
            const res = await fetch(url, { method: "GET", mode: "cors", cache: "no-store" });
            const d = await res.json();
            if (d && d.customer) {
                const srvCourses = Array.isArray(d.customer.unlockedCourses) ? d.customer.unlockedCourses : [];
                const updated = {
                    ...cust,
                    unlockedCourses: typeof expandWebUnlockedCourses === "function" ? expandWebUnlockedCourses(srvCourses) : srvCourses,
                    driveVerifiedAt: Date.now()
                };
                localStorage.setItem("dvtl_synced_customer", JSON.stringify(updated));
                if (state.currentView === "courses" && typeof renderCourses === "function") renderCourses();
            }
        } catch (_) {}
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => setTimeout(syncWebEntitlementsWithDrive, 600));
    } else {
        setTimeout(syncWebEntitlementsWithDrive, 600);
    }
})();


// [v14.0 STRICT DIGITS-ONLY PHONE INPUT & SILENT LEAD CAPTURE]
(function() {
    const PHONE_IDS = ["courseStudentPhone", "checkoutPhoneInput", "srvPhoneInput"];
    let _leadSaveTimer = null;

    function enforceDigitsOnly(el) {
        if (!el) return;
        const cleaned = String(el.value || "").replace(/\D+/g, "").slice(0, 11);
        if (el.value !== cleaned) {
            el.value = cleaned;
        }
    }

    function scheduleSilentLeadCapture() {
        if (_leadSaveTimer) clearTimeout(_leadSaveTimer);
        _leadSaveTimer = setTimeout(() => {
            try {
                const cust = (typeof getSyncedCustomerLocal === "function" ? getSyncedCustomerLocal() : null) || {};
                const courseOpen = !document.getElementById("courseCheckoutModal")?.classList.contains("hidden");
                const docOpen = !document.getElementById("docCheckoutModal")?.classList.contains("hidden");
                if (courseOpen && typeof selectedCourseForCheckout !== "undefined" && selectedCourseForCheckout) {
                    const em = (cust.email || document.getElementById("courseStudentEmail")?.value || "").trim().toLowerCase();
                    const ph = (document.getElementById("courseStudentPhone")?.value || "").replace(/\D+/g, "");
                    const ordCode = (document.getElementById("courseTransferNote")?.dataset?.orderCode || document.getElementById("courseTransferNote")?.textContent || "").split(" ")[0].trim();
                    if (em.includes("@") && /^0\d{9,10}$/.test(ph) && ordCode) {
                        sendWebhookData({
                            action: "createOrder",
                            silent: "1",
                            orderType: "Khóa Học",
                            orderCode: ordCode,
                            sku: selectedCourseForCheckout.id,
                            itemName: selectedCourseForCheckout.title,
                            price: selectedCourseForCheckout.price,
                            amount: selectedCourseForCheckout.price,
                            driveId: selectedCourseForCheckout.driveFolderId || "",
                            name: cust.name || em.split("@")[0],
                            phone: ph,
                            email: em,
                            deviceId: typeof getWebDeviceId === "function" ? getWebDeviceId() : ""
                        });
                    }
                } else if (docOpen && typeof state !== "undefined" && state.selectedDoc) {
                    const em = (cust.email || document.getElementById("checkoutEmailInput")?.value || "").trim().toLowerCase();
                    const ph = (document.getElementById("checkoutPhoneInput")?.value || "").replace(/\D+/g, "");
                    const ordCode = (document.getElementById("checkoutOrderCode")?.textContent || "").trim().split(" ")[0];
                    if (em.includes("@") && /^0\d{9,10}$/.test(ph) && ordCode) {
                        sendWebhookData({
                            action: "createOrder",
                            silent: "1",
                            orderType: "Mua Đề Cương",
                            orderCode: ordCode,
                            sku: state.selectedDoc.code || "",
                            itemName: state.selectedDoc.name || "",
                            price: state.selectedDoc.price || 50000,
                            amount: state.selectedDoc.price || 50000,
                            driveId: state.selectedDoc.driveId || "",
                            name: cust.name || em.split("@")[0],
                            phone: ph,
                            email: em,
                            deviceId: typeof getWebDeviceId === "function" ? getWebDeviceId() : ""
                        });
                    }
                }
            } catch (_) {}
        }, 800);
    }

    document.addEventListener("input", function(ev) {
        const t = ev.target;
        if (!t || !t.id) return;
        if (PHONE_IDS.includes(t.id)) {
            enforceDigitsOnly(t);
            scheduleSilentLeadCapture();
        } else if (t.id === "courseStudentEmail" || t.id === "checkoutEmailInput") {
            scheduleSilentLeadCapture();
        }
    }, true);

    document.addEventListener("keydown", function(ev) {
        const t = ev.target;
        if (!t || !PHONE_IDS.includes(t.id)) return;
        if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
        const allowed = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Home", "End", "Enter"];
        if (allowed.includes(ev.key)) return;
        if (!/^[0-9]$/.test(ev.key)) {
            ev.preventDefault();
        }
    }, true);
})();


/* ==========================================================================
   FACULTY / KHỐI NGÀNH COMBOBOX FOR KHO ĐỀ CƯƠNG
   ========================================================================== */

const WEB_FACULTIES_CATALOG = [
  { id: "", badge: "TẤT CẢ", name: "-- Tất Cả Các Khoa / Khối Ngành --", iconKey: "all" },
  { id: "DAI_CUONG", badge: "ĐẠI CƯƠNG", name: "Khối Đại Cương & Lý Luận Chính Trị", iconKey: "dai_hoc" },
  { id: "QUAN_TRI", badge: "KINH TẾ", name: "Khoa / Khối Kinh Tế & Quản Trị", iconKey: "toan" },
  { id: "TAI_CHINH", badge: "TÀI CHÍNH", name: "Khoa / Khối Tài Chính - Ngân Hàng - Kế Toán", iconKey: "hoa" },
  { id: "CONG_NGHE", badge: "CÔNG NGHỆ", name: "Khoa / Khối Công Nghệ & Kỹ Thuật", iconKey: "ly" },
  { id: "LUAT", badge: "LUẬT", name: "Khoa / Khối Luật & Pháp Lý", iconKey: "van" },
  { id: "NGOAI_NGU", badge: "NGOẠI NGỮ", name: "Khoa / Khối Ngoại Ngữ & Ngôn Ngữ Học", iconKey: "anh" },
  { id: "DU_LICH", badge: "DU LỊCH", name: "Khoa / Khối Du Lịch & Khách Sạn", iconKey: "dia" },
  { id: "SU_PHAM", badge: "SƯ PHẠM", name: "Khoa / Khối Sư Phạm & Giáo Dục", iconKey: "su" },
  { id: "XA_HOI", badge: "TÂM LÝ", name: "Khoa / Khối Tâm Lý & Xã Hội", iconKey: "sinh" }
];

let selectedFacultyCode = "";
let facultyDropdownOpen = false;

function toggleFacultyDropdown(e) {
  if (e) e.stopPropagation();
  closeUniDropdown();
  closeHotSearchDropdown();

  const menu = document.getElementById("facultyDropdownMenu");
  const chevron = document.getElementById("facultyDropdownChevron");
  if (!menu) return;

  facultyDropdownOpen = !facultyDropdownOpen;
  if (facultyDropdownOpen) {
    menu.classList.remove("hidden");
    if (chevron) chevron.textContent = "▲";
    renderFacultyOptions(WEB_FACULTIES_CATALOG);
    setTimeout(() => {
      const inp = document.getElementById("facultySearchInput");
      if (inp) {
        inp.value = "";
        inp.focus();
      }
    }, 50);
  } else {
    closeFacultyDropdown();
  }
}

function closeFacultyDropdown() {
  facultyDropdownOpen = false;
  const menu = document.getElementById("facultyDropdownMenu");
  const chevron = document.getElementById("facultyDropdownChevron");
  if (menu) menu.classList.add("hidden");
  if (chevron) chevron.textContent = "▼";
}

function handleFacultySearchInput(val) {
  const qNorm = (typeof removeVietnameseTones === "function" ? removeVietnameseTones(val) : val).toLowerCase().trim();
  const filtered = WEB_FACULTIES_CATALOG.filter(f => {
    if (!qNorm) return true;
    const hay = `${f.badge} ${f.name} ${f.id}`.toLowerCase();
    const hayNorm = typeof removeVietnameseTones === "function" ? removeVietnameseTones(hay) : hay;
    return hay.includes(qNorm) || hayNorm.includes(qNorm);
  });
  renderFacultyOptions(filtered);
}

function renderFacultyOptions(list) {
  const container = document.getElementById("facultyOptionsList");
  if (!container) return;

  if (!list || list.length === 0) {
    container.innerHTML = `<div class="p-3 text-center text-xs text-slate-400 font-medium">Không tìm thấy khoa / khối ngành phù hợp</div>`;
    return;
  }

  container.innerHTML = list.map(item => {
    const isSel = item.id === selectedFacultyCode;
    const th = typeof getDvsIconThemeByKey === "function" ? getDvsIconThemeByKey(item.iconKey || "all") : { color: "#0D1677", bg: "#EFF6FF", pillBg: "#DBEAFE", pillColor: "#1E40AF" };
    return `
      <div id="facultyOption_${item.id || 'ALL'}" class="dvs-uni-option-row ${isSel ? 'selected' : ''}" onclick="selectFaculty('${item.id}')">
        <span class="dvs-uni-icon-box" style="color: ${th.color};">
          ${typeof renderDvsSubjectCourseSvgHtml === "function" ? renderDvsSubjectCourseSvgHtml(item.iconKey || "all", 14) : ''}
        </span>
        <span class="dvs-uni-code-pill" style="background: ${th.pillBg}; color: ${th.pillColor};">
          ${item.badge}
        </span>
        <span class="dvs-uni-name-text">
          ${item.name}
        </span>
        ${isSel ? '<span class="dvs-uni-check">✓</span>' : ''}
      </div>
    `;
  }).join("");
}

function selectFaculty(facId) {
  selectedFacultyCode = facId || "";
  const found = WEB_FACULTIES_CATALOG.find(f => f.id === selectedFacultyCode) || WEB_FACULTIES_CATALOG[0];

  const labelEl = document.getElementById("facultySelectedLabel");
  const clearBtn = document.getElementById("facultyClearBtn");
  const hiddenSelect = document.getElementById("searchFacultySelect");

  if (labelEl) labelEl.textContent = found.name;
  if (clearBtn) clearBtn.classList.toggle("hidden", !selectedFacultyCode);
  if (hiddenSelect) hiddenSelect.value = found.name;

  if (typeof state !== "undefined") {
    state.selectedFaculty = found.id ? found.name : "";
    if (typeof executeDocSearch === "function") executeDocSearch();
  }

  closeFacultyDropdown();
}

function clearFacultySelection(e) {
  if (e) e.stopPropagation();
  selectFaculty("");
}
