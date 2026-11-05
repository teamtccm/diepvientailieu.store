
function getSemanticSvgIconJs(iconKey) {
    const k = String(iconKey || "").trim();
    const map = {
        "🧠": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/></svg>`,
        "brain": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/></svg>`,
        "💰": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1"/><path d="M12 6v2m0 8v2"/></svg>`,
        "coin": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1"/><path d="M12 6v2m0 8v2"/></svg>`,
        "📊": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
        "📈": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
        "chart": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
        "💻": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="12" x="3" y="4" rx="2" ry="2"/><line x1="2" x2="22" y1="20" y2="20"/></svg>`,
        "laptop": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="12" x="3" y="4" rx="2" ry="2"/><line x1="2" x2="22" y1="20" y2="20"/></svg>`,
        "⚖️": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
        "⚖": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
        "scale": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
        "🎓": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/><path d="M22 10v6"/></svg>`,
        "grad": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/><path d="M22 10v6"/></svg>`,
        "🏛️": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/><path d="M8 14v3"/><path d="M12 14v3"/><path d="M16 14v3"/></svg>`,
        "🏛": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/><path d="M8 14v3"/><path d="M12 14v3"/><path d="M16 14v3"/></svg>`,
        "uni": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/><path d="M8 14v3"/><path d="M12 14v3"/><path d="M16 14v3"/></svg>`,
        "⚡": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
        "bolt": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
        "🎯": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
        "target": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
        "✍️": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
        "📝": `<svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
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

    webhookUrl: ((localStorage.getItem("dvtl_webhook_url") && !localStorage.getItem("dvtl_webhook_url").includes("AKfycbwJgYaG")) ? localStorage.getItem("dvtl_webhook_url") : (typeof APP_CONFIG !== 'undefined' ? APP_CONFIG.defaultWebhookUrl : "")),

    orderHistory: JSON.parse(localStorage.getItem("dvtl_orders") || "[]")

};



// DOM Ready

document.addEventListener("DOMContentLoaded", () => {

    initTheme();

    initSearchDropdowns();

    initHotSearches();

    initEventListeners();

    initServiceCalculator();

    renderDocuments();

    syncLiveProductsFromMasterSheet();

    renderRecentOrdersTicker();

    initLiveProofStream();

    

    // Check URL Hash

    const hash = window.location.hash.replace("#", "");

    if (["home", "docs", "courses", "service", "pricing", "guarantee_feedback", "faq"].includes(hash)) {

        switchView(hash);

    } else {

        switchView("home");

    }

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



const NAV_VIEWS = ["home", "docs", "service", "courses", "pricing", "guarantee_feedback", "faq"];



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

                ${isSelected ? '<span class="text-xs text-sky-600 dark:text-sky-400 font-bold">✓</span>' : ''}

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

        if (chevron) chevron.textContent = "▲";

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

    if (chevron) chevron.textContent = "▼";

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

    if (!str) return '';

    str = str.toLowerCase();

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



function renderDocuments() {

    const container = document.getElementById("docGridContainer");

    const countLabel = document.getElementById("docCountBadge");

    if (!container) return;

    

    const docs = filterDocuments();

    if (countLabel) {

        if (!state.searchQuery && (!state.activeCategory || state.activeCategory === 'all') && !state.selectedUniversity) {

            countLabel.textContent = "600+ Đề Cương";

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

    

    const isDark = state.theme === "dark";

    const selectedUni = state.selectedUniversity ? UNIVERSITIES.find(u => u.id === state.selectedUniversity) : null;



    container.innerHTML = docs.map((doc, index) => {

        // DYNAMIC UNIVERSITY & LOGO ADAPTATION:

        // Adapt to selected school ONLY IF the school legitimately offers that discipline!

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

        const docUniColor = (docUniInfo && docUniInfo.color) ? docUniInfo.color : '#0D1677';

        const docUniHasLogo = docUniInfo && UNIVERSITIES_WITH_LOGOS.has(docUniInfo.id);

        const docUniLogo = docUniInfo ? `images/logos/${docUniInfo.id}.png` : 'images/favicon_badge.png';



        const cleanDocBaseUpper = String(doc.baseName || "").replace(/^(bộ\s+)?đề\s+cương\s+/i, "").trim().toUpperCase();

        const fullDocTitle = `ĐỀ CƯƠNG ${cleanDocBaseUpper} — ${docUniBadge}`;

        const iconSymbol = getSemanticSvgIconJs(doc.icon);

        const mascotBadge = "images/favicon_badge.png";

        const discountPercent = (doc.originalPrice && doc.originalPrice > doc.price) 

            ? Math.round((1 - (doc.price / doc.originalPrice)) * 100) 

            : 50;

        

        return `

            <div class="clean-card hover-lift overflow-hidden flex flex-col justify-between transition-all duration-300 border-2 border-slate-200 dark:border-white/10 shadow-sm hover:shadow-2xl rounded-[24px]">

                

                <!-- REDESIGNED HIGH-RESOLUTION PROFESSIONAL COVER BANNER -->

                <div class="relative p-5 text-white flex flex-col justify-between min-h-[245px] select-none rounded-t-[22px] overflow-hidden" style="background: linear-gradient(160deg, #0B1958 0%, #071135 60%, #0D1677 100%);">

                    

                    <!-- Top Bar: Crisp Rounded Squircle Brand Badge & School Pill -->

                    <div class="flex justify-between items-center z-10">

                        <div class="flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded-xl border border-white/20 backdrop-blur-md shadow-sm">

                            <img src="${mascotBadge}" alt="Logo" class="w-5 h-5 object-contain" loading="lazy">

                            <span class="font-black text-[10px] tracking-wider uppercase text-amber-300">ĐIỆP VIÊN TÀI LIỆU</span>

                        </div>

                        <div class="flex items-center gap-1.5">

                            <div class="w-7 h-7 rounded-md bg-white p-0.5 shadow-md border border-white/20 flex items-center justify-center overflow-hidden flex-shrink-0">

                                ${docUniHasLogo ? `

                                <img src="${docUniLogo}" 

                                     alt="${docUniBadge}" 

                                     class="w-full h-full object-contain"

                                     loading="lazy"

                                     onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">

                                <div class="w-full h-full rounded flex items-center justify-center bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 font-black text-xs" style="display:none">

                                    ?

                                </div>

                                ` : `

                                <div class="w-full h-full rounded flex items-center justify-center bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 font-black text-xs">

                                    ?

                                </div>

                                `}

                            </div>

                            <span class="px-2.5 py-1 bg-[#FFA000] text-slate-950 font-black text-[10px] rounded-lg shadow-md uppercase tracking-wider border border-amber-300">

                                ${docUniBadge}

                            </span>

                        </div>

                    </div>



                    <!-- Center Title with High-Contrast Typography -->

                    <div class="relative my-3 z-10">

                        <div class="flex items-center gap-1.5 mb-1.5">

                            <span class="text-base">${iconSymbol}</span>

                            <span class="text-[10px] font-bold text-sky-300 bg-black/50 px-2 py-0.5 rounded border border-white/15">#${doc.code}</span>

                            ${doc.isReal ? '<span class="text-[9px] font-extrabold text-amber-300 bg-amber-950/70 border border-amber-400/40 px-2 py-0.5 rounded-full ml-auto"><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> CÓ SẴN FILE DRIVE</span>' : ''}

                        </div>

                        <h4 class="font-condensed font-black text-lg sm:text-xl text-white tracking-wide uppercase leading-tight line-clamp-2 drop-shadow-md">

                            ${fullDocTitle}

                        </h4>

                        <div class="flex items-center gap-2.5 mt-2.5 text-[10px]">

                            <span class="text-amber-300 font-bold"><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg> ${doc.pages} Trang A4</span>

                            <span class="text-emerald-300 font-bold"><svg class="inline-block w-3.5 h-3.5 shrink-0 align-[-1px]" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${doc.rating} (${doc.reviewsCount})</span>

                            <span class="text-sky-200 font-bold"><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Google Drive</span>

                        </div>

                    </div>



                    <!-- Bottom Bar: Verified Badge + Website -->

                    <div class="relative z-10 flex items-center justify-between pt-2.5 border-t border-white/20">

                        <span class="text-[10px] font-black text-amber-400 uppercase tracking-wide flex items-center gap-1">

                            <span>★</span> CHUẨN ĐỀ THI ${docUniBadge} 2026

                        </span>

                        <span class="text-[10px] font-mono text-sky-200">

                            diepvientailieu.store

                        </span>

                    </div>

                </div>



                <!-- CARD BODY -->

                <div class="p-5 flex-1 flex flex-col justify-between bg-white dark:bg-[#0A143D]">

                    <div>

                        <!-- Feature Chips -->

                        <div class="flex flex-wrap gap-1.5 mb-4">

                            ${doc.tags.map(t => `<span class="text-[10px] font-semibold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-white/10">${t}</span>`).join('')}

                        </div>

                    </div>



                    <!-- Price & Actions -->

                    <div class="pt-3 border-t border-slate-100 dark:border-white/10">

                        <div class="flex items-baseline justify-between mb-3">

                            <div>

                                <span class="text-2xl font-black text-[#0D1677] dark:text-amber-400 font-condensed tracking-wider">${doc.price.toLocaleString('vi-VN')}đ</span>

                                <span class="text-xs text-slate-400 line-through ml-1.5">${doc.originalPrice.toLocaleString('vi-VN')}đ</span>

                            </div>

                            <span class="text-[10px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">

                                TIẾT KIỆM ${discountPercent}%

                            </span>

                        </div>



                        <div class="grid grid-cols-2 gap-2">

                            <button onclick="window.open('https://m.me/diepvientailieu','_blank')" class="px-3 py-2.5 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition">

                                <span><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Hỏi Shop</span>

                            </button>

                            <button onclick="openDocCheckoutModal('${doc.id}', this.dataset.title)" data-title="${fullDocTitle.replace(/'/g, '&#39;').replace(/"/g, '&quot;')}" class="px-3 py-2.5 bg-[#0D1677] hover:bg-[#1E40AF] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1 transition">

                                <span><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg> Mua Ngay</span>

                            </button>

                        </div>

                    </div>

                </div>



            </div>

        `;

    }).join('');

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

            doc = {

                ...doc,

                code: matchedReal.code,

                driveId: matchedReal.driveId,

                driveType: matchedReal.driveType || "file",

                isReal: true

            };

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

    

    const docDisplayName = customTitle || `Đề Cương ${doc.baseName} (${uniInfo.code})`;

    

    state.selectedDoc = {

        ...doc,

        name: docDisplayName,

        school: uniInfo.code

    };

    

    const modal = document.getElementById("docCheckoutModal");

    if (!modal) return;

    

    document.getElementById("checkoutDocName").textContent = docDisplayName;

    document.getElementById("checkoutDocCode").textContent = `#${doc.code} · ${doc.pages} Trang A4`;

    document.getElementById("checkoutDocPrice").textContent = `${doc.price.toLocaleString('vi-VN')} VNĐ`;

    

    const cleanDocCode = String(doc.code || "TL").replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    const orderCode = `DC${cleanDocCode}${Math.floor(100 + Math.random() * 900)}`;

    document.getElementById("checkoutOrderCode").textContent = orderCode;

    document.getElementById("checkoutMemoCode").textContent = orderCode;

    

    // Hiển thị số tiền

    const payAmountEl = document.getElementById("checkoutPayAmount");

    if (payAmountEl) payAmountEl.textContent = `${doc.price.toLocaleString('vi-VN')} VNĐ`;

    

    // Lấy tài khoản ACTIVE từ backend để hiển thị QR

    layTaiKhoanVaHienQR(doc.price, orderCode);

    

    document.getElementById("checkoutNameInput").value = "";

    document.getElementById("checkoutPhoneInput").value = "";

    document.getElementById("checkoutEmailInput").value = "";

    

    document.getElementById("docCheckoutStep1").classList.remove("hidden");

    document.getElementById("docCheckoutStep2").classList.add("hidden");

    document.getElementById("docCheckoutStep3").classList.add("hidden");

    

    modal.classList.remove("hidden");

    document.body.style.overflow = "hidden";

}



// Biến lưu tài khoản đang dùng cho đơn hiện tại

let currentActiveAccount = null;



async function layTaiKhoanVaHienQR(amount, orderCode) {

    try {

        const res = await fetch(state.webhookUrl + "?action=getActiveAccount", { method: "GET", mode: "cors" });

        const acc = await res.json();

        if (acc && !acc.error) {

            currentActiveAccount = acc;

            // Cập nhật hiển thị

            const bankEl = document.getElementById("checkoutBankName");

            const stkEl = document.getElementById("checkoutSTK");

            const ctkEl = document.getElementById("checkoutCTK");

            const qrImg = document.getElementById("docQrImage");

            if (bankEl) bankEl.textContent = acc.bankName;

            if (stkEl) stkEl.textContent = acc.accountNumber;

            if (ctkEl) ctkEl.textContent = acc.accountName;

            if (qrImg) qrImg.src = `https://img.vietqr.io/image/${acc.bankCode}-${acc.accountNumber}-compact2.png?amount=${amount}&addInfo=${orderCode}&accountName=${encodeURIComponent(acc.accountName)}`;

        }

    } catch(e) {

        // Fallback: dùng PAYMENT_INFO mặc định

        const qrImg = document.getElementById("docQrImage");

        if (qrImg) qrImg.src = `${PAYMENT_INFO.qrBaseUrl}?amount=${amount}&addInfo=${orderCode}&accountName=${encodeURIComponent(PAYMENT_INFO.accountName)}`;

        currentActiveAccount = { bankName: PAYMENT_INFO.bankName, bankCode: PAYMENT_INFO.bankCode, accountNumber: PAYMENT_INFO.accountNumber, accountName: PAYMENT_INFO.accountName };

    }

}



function closeDocCheckoutModal() {

    if (docPollingInterval) { clearInterval(docPollingInterval); docPollingInterval = null; }

    const modal = document.getElementById("docCheckoutModal");

    if (modal) modal.classList.add("hidden");

    document.body.style.overflow = "auto";

}



function goToDocPaymentStep(e) {

    e.preventDefault();

    

    const name = document.getElementById("checkoutNameInput").value.trim();

    const phone = document.getElementById("checkoutPhoneInput").value.trim();

    const email = document.getElementById("checkoutEmailInput").value.trim();

    

    if (!name || !phone || !email) {

        alert("️ Vui lòng điền đầy đủ Họ tên, Số điện thoại và Email Gmail!");

        return;

    }

    

    if (!email.includes("@")) {

        alert("️ Vui lòng nhập địa chỉ Email chính xác để nhận link Google Drive!");

        return;

    }

    

    // Send order info to webhook immediately

    const orderCode = document.getElementById("checkoutOrderCode").textContent;

    const payload = {

        action: "createOrder",

        orderCode: orderCode,

        name: name,

        email: email,

        phone: phone,

        sku: state.selectedDoc?.code || "",

        itemName: state.selectedDoc?.name || "",

        price: state.selectedDoc?.price || 0,

        bank: currentActiveAccount ? currentActiveAccount.bankName : "ACB",

        orderType: "Mua File",

        school: state.selectedDoc?.school || (state.selectedUniversity ? (UNIVERSITIES.find(u => u.id === state.selectedUniversity)?.code) : "Toàn quốc"),

        stkNhan: currentActiveAccount ? currentActiveAccount.accountNumber : "",

        driveId: state.selectedDoc?.driveId || ""

    };

    saveOrderToLocal(payload);

    try { sendWebhookData(payload); } catch(e) {}

    

    // Switch to Step 2 (QR Payment)

    document.getElementById("docCheckoutStep1").classList.add("hidden");

    document.getElementById("docCheckoutStep2").classList.remove("hidden");

    

    // Start auto-verification polling

    startDocPaymentPolling(orderCode, email);

}



let docPollingInterval = null;

function startDocPaymentPolling(orderCode, email) {

    if (docPollingInterval) clearInterval(docPollingInterval);

    let elapsed = 0;

    const timerEl = document.getElementById("docPaymentTimer");

    

    docPollingInterval = setInterval(() => {

        elapsed += 5;

        const mins = Math.floor(elapsed / 60);

        const secs = elapsed % 60;

        if (timerEl) timerEl.textContent = `Đã chờ: ${mins}:${secs.toString().padStart(2,'0')}`;

        

        // Poll verification endpoint

        checkDocPaymentStatus(orderCode, email);

    }, 5000);

}



async function checkDocPaymentStatus(orderCode, email) {

    if (!state.webhookUrl) return;

    try {

        const verifyUrl = state.webhookUrl + "?action=verify&orderId=" + encodeURIComponent(orderCode);

        const res = await fetch(verifyUrl, { method: "GET", mode: "cors" });

        const data = await res.json();

        if (data && data.verified === true) {

            onDocPaymentConfirmed(orderCode, email, data.driveUrl || "");

        }

    } catch(e) {

        // Silently retry on next interval

    }

}



function onDocPaymentConfirmed(orderCode, email, driveUrl = "") {

    if (docPollingInterval) { clearInterval(docPollingInterval); docPollingInterval = null; }

    

    // Switch to Step 3 (Success)

    document.getElementById("docCheckoutStep2").classList.add("hidden");

    document.getElementById("docCheckoutStep3").classList.remove("hidden");

    document.getElementById("docSuccessOrderId").textContent = orderCode;

    document.getElementById("docSuccessEmail").textContent = email;



    const driveBtn = document.getElementById("docSuccessDriveBtn");

    const fallbackUrl = driveUrl || (state.selectedDoc?.driveId ? (state.selectedDoc?.driveType === "folder" ? `https://drive.google.com/drive/folders/${state.selectedDoc.driveId}` : `https://drive.google.com/file/d/${state.selectedDoc.driveId}/view`) : "");

    if (driveBtn) {

        if (fallbackUrl) {

            driveBtn.href = fallbackUrl;

            driveBtn.classList.remove("hidden");

        } else {

            driveBtn.classList.add("hidden");

        }

    }

}



async function confirmDocManualPayment() {

    const orderCode = document.getElementById("checkoutOrderCode")?.textContent || "";

    const email = document.getElementById("checkoutEmailInput")?.value || "";

    const fbEl = document.getElementById("docVerifyFeedbackMsg");

    if (fbEl) {

        fbEl.classList.remove("hidden");

        fbEl.textContent = "⏳ Đang đối soát Email biến động số dư ngân hàng ACB cho mã đơn #" + orderCode + "...";

    }

    if (!state.webhookUrl) return;

    try {

        const verifyUrl = state.webhookUrl + "?action=verify&orderId=" + encodeURIComponent(orderCode);

        const res = await fetch(verifyUrl, { method: "GET", mode: "cors" });

        const data = await res.json();

        if (data && data.verified === true) {

            onDocPaymentConfirmed(orderCode, email, data.driveUrl || "");

        } else if (fbEl) {

            fbEl.textContent = "️ Chưa nhận được Email biến động số dư từ ngân hàng ACB cho mã #" + orderCode + ". Hệ thống chỉ tự động giao tài liệu sau khi ngân hàng báo tiền về!";

        }

    } catch (e) {

        if (fbEl) {

            fbEl.textContent = "️ Chưa ghi nhận biến động số dư ngân hàng cho mã #" + orderCode + ". Vui lòng kiểm tra lại nội dung chuyển khoản!";

        }

    }

}



function backToDocStep1() {

    if (docPollingInterval) { clearInterval(docPollingInterval); docPollingInterval = null; }

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

    

    const name = document.getElementById("srvNameInput").value.trim();

    const phone = document.getElementById("srvPhoneInput").value.trim();

    const email = document.getElementById("srvEmailInput").value.trim();

    const studentId = document.getElementById("srvStudentIdInput").value.trim();

    const school = document.getElementById("srvSchoolInput").value.trim();

    const faculty = document.getElementById("srvFacultyInput").value.trim();

    const subject = document.getElementById("srvSubjectInput").value.trim();

    const topic = document.getElementById("srvTopicInput").value.trim();

    const type = document.getElementById("srvTypeSelect").value;

    const pages = document.getElementById("srvPagesInput").value;

    const deadline = document.getElementById("srvDeadlineInput").value;

    const depositCode = document.getElementById("srvDepositCode").textContent;

    const depositAmount = document.getElementById("calcDepositEst").textContent;

    const totalEst = document.getElementById("calcTotalEst").textContent;

    

    if (!name || !phone || !email || !deadline || !topic) {

        alert("️ Vui lòng điền đầy đủ các thông tin bắt buộc và hạn nộp (Deadline)!");

        return;

    }

    

    const privacyCheckbox = document.getElementById("srvPrivacyCheckbox");

    if (privacyCheckbox && !privacyCheckbox.checked) {

        alert("️ Bạn cần tích xác nhận thông tin chính xác và đồng ý điều khoản trước khi gửi yêu cầu đặt bài!");

        privacyCheckbox.focus();

        return;

    }

    

    const btnSubmit = document.getElementById("btnSubmitServiceOrder");

    btnSubmit.disabled = true;

    btnSubmit.innerHTML = `<span class="inline-block animate-spin mr-2">⏳</span> Đang gửi hồ sơ đặt bài...`;

    

    const payload = {

        type: "SERVICE_ORDER",

        orderId: depositCode,

        timestamp: new Date().toISOString(),

        paymentMethod: "MOMO_QR",

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

    

    btnSubmit.disabled = false;

    btnSubmit.innerHTML = `<span>GỬI YÊU CẦU ĐẶT BÀI</span>`;

    

    openSuccessModal("SERVICE", payload);

}



/* ==========================================================================

   5. FAQ INTERACTIVE MODAL

   ========================================================================== */



function openFaqDetailModal(faqIndex) {

    const faq = FAQ_DATABASE[faqIndex];

    if (!faq) return;

    

    const modal = document.getElementById("faqDetailModal");

    const qElem = document.getElementById("faqModalQuestion");

    const aElem = document.getElementById("faqModalAnswer");

    

    if (qElem) qElem.textContent = faq.question;

    if (aElem) aElem.innerHTML = faq.answer.replace(/\n\n/g, '<br><br>');

    

    if (modal) {

        modal.classList.remove("hidden");

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

        console.log("Mock Webhook Dispatch:", payload);

        return { status: "MOCK_SUCCESS", message: "Đã lưu vào bộ nhớ cục bộ" };

    }

    

    return fetch(state.webhookUrl, {

        method: "POST",

        mode: "no-cors",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(payload)

    });

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



function openSuccessModal(type, orderData) {

    const modal = document.getElementById("successModal");

    if (!modal) return;

    

    const title = document.getElementById("successModalTitle");

    const desc = document.getElementById("successModalDesc");

    const orderId = document.getElementById("successOrderId");

    const customerMail = document.getElementById("successCustomerEmail");

    

    if (orderId) orderId.textContent = orderData.orderId;

    if (customerMail) customerMail.textContent = orderData.customer.email;

    

    if (type === "DOC") {

        if (title) title.textContent = "Gửi Đơn Thành Công!";

        if (desc) desc.textContent = "Hệ thống đã ghi nhận mã đơn của bạn và phân quyền Google Drive vào Gmail!";

    } else {

        if (title) title.textContent = "Đã Ghi Nhận Đơn Hàng!";

        if (desc) desc.textContent = "Hồ sơ đề bài của bạn đã được chuyển tới Nhân viên học thuật. Nhân viên sẽ liên hệ Zalo & gửi email xác nhận trong vòng 15-30 phút!";

    }

    

    modal.classList.remove("hidden");

}



function closeSuccessModal() {

    const modal = document.getElementById("successModal");

    if (modal) modal.classList.add("hidden");

}



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

    "all": "Tất cả",

    "lop12_2k9": "Lớp 12 (2K9)",

    "lop11_2k10": "Lớp 11 (2K10)",

    "dgnl_hsa": "ĐGNL HSA",

    "dgtd_tsa": "ĐGTD TSA",

    "dgnl_vact_bca": "V-ACT / BCA / QDA / VSAT"

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



function renderCourseCategoryTabs() {

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

    const cust = getSyncedCustomerLocal();

    if (!cust || !Array.isArray(cust.unlockedCourses)) return false;

    const expanded = expandWebUnlockedCourses(cust.unlockedCourses);

    return expanded.includes("ALL-COURSES-399K") || expanded.includes("__ALL_COURSES_399K__") || expanded.includes(String(courseId || "").toUpperCase());

}



function renderSingleCourseCardHtml(course) {
    const unlocked = isWebCourseUnlocked(course.id);
    const customCovers = getWebCourseCustomCovers();
    const coverUrl = customCovers[course.id] || course.defaultCover || "";
    const centerTeacherText = course.instructor || "Điệp Viên Study";
    const courseTitleText = course.title || "";
    const footerCategoryText = course.groupName || course.level || course.categoryName || "Khóa Học 2027";
    const durationText = (course.duration || "Full lộ trình 2027 · Video + PDF") + (unlocked ? " · Đã mở khóa" : "");

    return `
        <article itemscope itemtype="https://schema.org/Course" onclick="handleWebCourseCardClick('${course.id}')" class="rounded-[18px] overflow-hidden flex flex-col bg-white/95 dark:bg-[#0A143D] border ${unlocked ? 'border-emerald-400/80 dark:border-emerald-500/70' : 'border-slate-200/90 dark:border-white/10 hover:border-blue-600/45 dark:hover:border-sky-400/50'} shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            
            <!-- 16:9 COVER IMAGE BOX (IDENTICAL TO APP dvs-course-cover-box) -->
            <div class="aspect-video w-full relative bg-gradient-to-br from-slate-900/[0.06] to-blue-600/[0.08] dark:from-slate-800/45 dark:to-blue-500/15 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-center overflow-hidden">
                ${coverUrl ? `
                    <img itemprop="image" src="${coverUrl}" alt="${courseTitleText}" class="w-full h-full object-cover block" loading="lazy">
                ` : `
                    <div class="flex flex-col items-center justify-center gap-1.5 text-slate-500 dark:text-slate-300 text-xs font-semibold select-none">
                        <span class="text-[11px] font-extrabold tracking-wider px-2.5 py-1 rounded-md bg-slate-900/[0.06] dark:bg-white/10 border border-dashed border-slate-400/60 dark:border-white/25">KHUNG ẢNH 16:9</span>
                    </div>
                `}
                <button type="button" onclick="triggerWebCourseCoverUpload(event, '${course.id}')" class="absolute bottom-2.5 right-2.5 z-10 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-900/75 hover:bg-blue-600 text-white border border-white/25 backdrop-blur-md transition">
                    ${coverUrl ? "Đổi ảnh" : "Chèn ảnh"}
                </button>
            </div>

            <!-- CARD BODY (TOP = TRUNG TÂM DẠY + TÊN THẦY CÔ NỔI BẬT, BELOW = TÊN KHÓA HỌC) -->
            <div class="p-4 flex flex-col flex-1 gap-1.5">
                <h3 itemprop="provider" class="text-[15px] font-black text-[#0D1677] dark:text-amber-400 leading-snug tracking-tight truncate m-0 uppercase" title="${centerTeacherText}">
                    ${centerTeacherText}
                </h3>
                <h4 itemprop="name" class="text-[13.5px] font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2 m-0" title="${courseTitleText}">
                    ${courseTitleText}
                </h4>

                <div class="flex items-center justify-between gap-2.5 pt-2.5 mt-auto border-t border-slate-200/70 dark:border-white/10">
                    <div class="flex flex-col gap-0.5 min-w-0">
                        <strong itemprop="educationalLevel" class="text-[12px] font-bold text-slate-700 dark:text-slate-200 truncate">${footerCategoryText}</strong>
                        <small class="text-[11px] text-slate-500 dark:text-slate-400 truncate">${durationText}</small>
                    </div>
                    <button type="button" onclick="event.stopPropagation(); handleWebCourseCardClick('${course.id}')" class="h-8 px-3.5 rounded-full text-xs font-bold text-white shadow flex items-center gap-1.5 flex-shrink-0 transition hover:opacity-95" style="background: ${unlocked ? 'linear-gradient(135deg, #059669 0%, #0d9488 100%)' : 'linear-gradient(135deg, #0d1677 0%, #1e3a8a 100%)'};">
                        ${!unlocked ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>' : ''}
                        <span>Vào học</span>
                    </button>
                </div>
            </div>

        </article>
    `;
}

function renderCourses() {

    const grid = document.getElementById("coursesGrid");

    if (!grid || typeof COURSES_DATABASE === "undefined") return;



    const searchQ = (document.getElementById("courseSearchInput")?.value || "").trim().toLowerCase();

    const searchNorm = typeof removeVietnameseTones === "function" ? removeVietnameseTones(searchQ) : searchQ;



    const visibleCatalogCourses = COURSES_DATABASE.filter(c => !c.isPackageOnly);



    let courses = visibleCatalogCourses.filter(c => {

        if (activeCourseCategory !== "all") {

            const matchCat = (c.category === activeCourseCategory) || (c.subCategory === activeCourseCategory);

            if (!matchCat) return false;

        }

        if (searchQ) {

            const hay = [c.title, c.instructor, c.level, c.code, c.groupName || "", c.description || "", c.summary || ""].join(" ").toLowerCase();

            const hayNorm = typeof removeVietnameseTones === "function" ? removeVietnameseTones(hay) : hay;

            return hay.includes(searchQ) || hayNorm.includes(searchNorm);

        }

        return true;

    });



    const badge = document.getElementById("courseCountBadge");

    if (badge) {

        badge.textContent = (activeCourseCategory === "all" && !searchQ)

            ? `${visibleCatalogCourses.length} Khóa Học Bản Quyền`

            : `${courses.length} Khóa Học Phù Hợp`;

    }



    if (courses.length === 0) {

        grid.innerHTML = `

            <div class="col-span-full py-16 text-center bg-white dark:bg-[#0A143D] rounded-3xl border border-dashed border-slate-300 dark:border-white/10 p-8 shadow-sm">

                <div class="w-16 h-16 mx-auto bg-blue-50 text-[#0D1677] rounded-full flex items-center justify-center text-3xl mb-4"><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div>

                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Chưa tìm thấy khóa học phù hợp từ khóa này</h3>

                <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6">

                    Bạn hãy thử chọn lại danh mục hoặc tìm từ khóa khác nhé!

                </p>

                <button onclick="filterCoursesByCategory('all');" class="inline-flex items-center gap-2 px-6 py-3 bg-[#0D1677] hover:bg-[#1E40AF] text-white font-bold rounded-xl shadow-lg transition">

                    <span><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg> Xem Toàn Bộ 50 Khóa Học</span>

                </button>

            </div>

        `;

        return;

    }



    grid.innerHTML = courses.map(renderSingleCourseCardHtml).join("");

}



function handleWebCourseCardClick(courseId) {

    if (isWebCourseUnlocked(courseId)) {

        const course = COURSES_DATABASE.find(c => c.id === courseId);

        if (course && course.driveUrl) {

            window.open(course.driveUrl, "_blank", "noopener,noreferrer");

            return;

        }

    }

    openCourseCheckoutModal(courseId);

}



let baseClickedCourseForCheckout = null;



function resolveCheckoutTierOptions(clickedCourse) {

    const fullCourse = COURSES_DATABASE.find(c => c.id === "ALL-COURSES-399K") || clickedCourse;

    // Mua theo môn (69k): mở khóa môn học thuộc khóa đang chọn

    const subj69k = {

        ...clickedCourse,

        price: 69000,

        originalPrice: 200000,

        discountPercent: "66%",

        tier: "subject_69k"

    };

    // Mua khóa học (199k): mở khóa chính khóa học đó

    const course199k = {

        ...clickedCourse,

        price: 199000,

        originalPrice: 600000,

        discountPercent: "67%",

        tier: "course_199k"

    };

    // Trọn bộ (399k): mở khóa Full cả App (tất cả 50 khóa học)

    const full399k = {

        ...fullCourse,

        id: "ALL-COURSES-399K",

        code: "FULL399K",

        title: "Mở Khóa Trọn Bộ Full Cả App Điệp Viên Study (Tất Cả 50 Khóa Học)",

        price: 399000,

        originalPrice: 2500000,

        discountPercent: "84%",

        tier: "full_399k"

    };



    return {

        subject_69k: subj69k,

        course_199k: course199k,

        full_399k: full399k

    };

}



function selectCourseCheckoutTier(tierKey) {

    if (!baseClickedCourseForCheckout) return;

    const tiers = resolveCheckoutTierOptions(baseClickedCourseForCheckout);

    const chosen = tiers[tierKey] || tiers.course_199k;

    selectedCourseForCheckout = chosen;



    document.getElementById("courseCheckoutTitle").textContent = chosen.title;

    document.getElementById("courseCheckoutPrice").textContent = chosen.price.toLocaleString("vi-VN") + "đ";

    document.getElementById("courseCheckoutOriginalPrice").textContent = chosen.originalPrice.toLocaleString("vi-VN") + "đ";

    document.getElementById("courseCheckoutDiscount").textContent = "TIẾT KIỆM " + chosen.discountPercent;



    const listEl = document.getElementById("courseTierOptionsList");

    if (listEl) {

        const items = [

            {

                key: "subject_69k",

                label: "Gói 1 · Mở Khóa Theo Môn",

                price: "69.000đ",

                title: baseClickedCourseForCheckout.title,

                sub: "Mở khóa môn học đang chọn + Tặng App Điệp Viên Study (1 máy)"

            },

            {

                key: "course_199k",

                label: "Gói 2 · Mua Khóa Học Này (Khuyên Dùng)",

                price: "199.000đ",

                title: baseClickedCourseForCheckout.title,

                sub: "Mở khóa trọn vẹn khóa học này trên App & Google Drive + Tặng App (1 máy)"

            },

            {

                key: "full_399k",

                label: "Gói 3 · Trọn Bộ Mở Khóa Full Cả App (VIP)",

                price: "399.000đ",

                title: "Mở Khóa Full Cả App Điệp Viên Study (Toàn Bộ 50 Khóa Học)",

                sub: "Mở khóa TẤT CẢ 50 Khóa học (2K9 + 2K10 + HSA + TSA + V-ACT + BCA + QDA + VSAT) trên toàn bộ App & Web (1 máy)"

            }

        ];

        listEl.innerHTML = items.map(it => {

            const active = chosen.tier === it.key;

            return `

            <div onclick="selectCourseCheckoutTier('${it.key}')" class="p-3 rounded-xl border-2 cursor-pointer transition flex items-start justify-between gap-2 ${active ? 'border-[#0D1677] dark:border-amber-400 bg-blue-50/70 dark:bg-white/10 shadow-sm' : 'border-slate-200 dark:border-white/10 hover:border-blue-300 bg-white dark:bg-[#060E2C]'}">

                <div class="min-w-0">

                    <div class="flex items-center gap-1.5">

                        <span class="w-4 h-4 rounded-full border-2 flex items-center justify-center text-[10px] font-black ${active ? 'border-[#0D1677] bg-[#0D1677] text-white' : 'border-slate-300'}">${active ? '✓' : ''}</span>

                        <span class="text-xs font-black text-slate-900 dark:text-white">${it.label}</span>

                    </div>

                    <p class="text-[11px] font-bold text-[#0D1677] dark:text-amber-400 truncate mt-0.5 pl-5">${it.title}</p>

                    <p class="text-[10px] text-slate-500 dark:text-slate-400 pl-5">${it.sub}</p>

                </div>

                <span class="text-sm font-black ${active ? 'text-[#0D1677] dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'} whitespace-nowrap">${it.price}</span>

            </div>`;

        }).join("");

    }

}



function openCourseCheckoutModal(courseId) {

    if (typeof COURSES_DATABASE === "undefined") return;

    const course = COURSES_DATABASE.find(c => c.id === courseId) || COURSES_DATABASE[0];

    if (!course) return;



    baseClickedCourseForCheckout = course;

    selectCourseCheckoutTier("course_199k");



    const cust = getSyncedCustomerLocal();

    document.getElementById("courseStudentName").value = cust?.name || "";

    document.getElementById("courseStudentPhone").value = (cust?.phone || "").replace(/\[.*\]/g, "").trim();

    document.getElementById("courseStudentEmail").value = cust?.email || "";



    document.getElementById("courseCheckoutStep1").classList.remove("hidden");

    document.getElementById("courseCheckoutStep2").classList.add("hidden");

    document.getElementById("courseCheckoutStep3").classList.add("hidden");



    const modal = document.getElementById("courseCheckoutModal");

    modal.classList.remove("hidden");

    modal.classList.add("flex");

}



function closeCourseCheckoutModal() {

    if (coursePollingInterval) { clearInterval(coursePollingInterval); coursePollingInterval = null; }

    const modal = document.getElementById("courseCheckoutModal");

    modal.classList.add("hidden");

    modal.classList.remove("flex");

    selectedCourseForCheckout = null;

}



function goToCoursePaymentStep() {

    const name = document.getElementById("courseStudentName").value.trim();

    const rawPhone = document.getElementById("courseStudentPhone").value.trim();

    const email = document.getElementById("courseStudentEmail").value.trim().toLowerCase();



    if (!name || !rawPhone || !email) {

        alert("️ Vui lòng điền đầy đủ Họ tên, SĐT Zalo và Email!");

        return;

    }



    if (!email.includes("@")) {

        alert("️ Vui lòng nhập địa chỉ Email chính xác!");

        return;

    }



    if (!selectedCourseForCheckout) {

        alert("️ Không tìm thấy thông tin khóa học!");

        return;

    }



    const course = selectedCourseForCheckout;

    const cleanCode = String(course.code || "KHOAHOC").replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    const orderCode = `DV${cleanCode}${Math.floor(100 + Math.random() * 900)}`;

    const cleanName = removeVietnameseTones(name).replace(/[^a-zA-Z0-9 ]/g, " ").toUpperCase().trim().slice(0, 18);

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

        qrImg.src = `https://img.vietqr.io/image/ACB-27384751-compact2.png?amount=${course.price}&addInfo=${encodeURIComponent(transferMemo)}&accountName=NGO%20BAO%20THACH`;

    }



    const webDevId = getWebDeviceId();

    const phoneWithDeviceLock = `${rawPhone} [WB:${webDevId}]`;



    const payload = {

        action: "createOrder",

        type: "COURSE_REGISTRATION",

        orderType: "Khóa Học",

        status: "PENDING",

        orderCode: orderCode,

        sku: course.id,

        itemName: course.title,

        price: course.price,

        amount: course.price,

        name: name,

        phone: phoneWithDeviceLock,

        email: email,

        deviceId: webDevId,

        bank: "ACB",

        stkNhan: "27384751",

        timestamp: new Date().toISOString()

    };



    if (state.webhookUrl) {

        fetch(state.webhookUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => {});

    }

    state.orderHistory.unshift(payload);

    localStorage.setItem("dvtl_orders", JSON.stringify(state.orderHistory.slice(0, 50)));



    document.getElementById("courseCheckoutStep1").classList.add("hidden");

    document.getElementById("courseCheckoutStep2").classList.remove("hidden");



    startCoursePaymentPolling(orderCode, course.title, email);

}



let coursePollingInterval = null;

function startCoursePaymentPolling(orderCode, courseTitle, email) {

    if (coursePollingInterval) clearInterval(coursePollingInterval);

    let elapsed = 0;

    const timerEl = document.getElementById("coursePaymentTimer");



    coursePollingInterval = setInterval(() => {

        elapsed += 5;

        const mins = Math.floor(elapsed / 60);

        const secs = elapsed % 60;

        if (timerEl) timerEl.textContent = `Đã chờ: ${mins}:${secs.toString().padStart(2,'0')}`;



        checkCoursePaymentStatus(orderCode, courseTitle, email);

    }, 5000);

}



async function checkCoursePaymentStatus(orderCode, courseTitle, email) {

    if (!state.webhookUrl) return;

    try {

        const verifyUrl = state.webhookUrl + "?action=verify&orderId=" + encodeURIComponent(orderCode) + "&deviceId=" + encodeURIComponent(getWebDeviceId());

        const res = await fetch(verifyUrl, { method: "GET", mode: "cors" });

        const data = await res.json();

        if (data && (data.verified === true || data.paid === true)) {

            onCoursePaymentConfirmed(orderCode, courseTitle, email);

        }

    } catch(e) {}

}



function onCoursePaymentConfirmed(orderCode, courseTitle, email) {

    if (coursePollingInterval) { clearInterval(coursePollingInterval); coursePollingInterval = null; }



    const course = selectedCourseForCheckout || COURSES_DATABASE[0];

    const name = document.getElementById("courseStudentName")?.value.trim() || "Học Viên Điệp Viên";

    const rawPhone = (document.getElementById("courseStudentPhone")?.value.trim() || "").replace(/\[.*\]/g, "").trim();



    // Cấp quyền trực tiếp thêm qua Webhook Kho Phát File (đảm bảo cả folder chính và extraFolderIds như 11. Khoá HSA/TSA 399K đều được mở ngay lập tức)

    const warehouseWebhook = "https://script.google.com/macros/s/AKfycbyaKudQDpHOtFWrNV5dr39hoFCqFXl2MVJRKhWY93i1nV95WAvw4HdXxIW-UA-7XjEjvA/exec";

    if (course && email) {

        const fIds = [course.driveFolderId, ...(course.extraFolderIds || [])].filter(Boolean);

        fIds.forEach((fid, idx) => {

            fetch(warehouseWebhook, {

                method: "POST",

                mode: "no-cors",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({

                    email: email,

                    name: name,

                    orderCode: orderCode,

                    itemName: course.title + " (Tặng kèm App Điệp Viên Study — 1 Máy)",

                    orderType: "Khóa Học Bản Quyền (Tặng App 1 Máy)",

                    fileId: fid,

                    fileLink: course.driveUrl

                })

            }).catch(() => {});

        });

    }



    // Lưu trạng thái mở khóa vào localStorage đồng bộ

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

    applySyncedCustomerToForms();

    renderCourses();



    document.getElementById("courseCheckoutStep2").classList.add("hidden");

    document.getElementById("courseCheckoutStep3").classList.remove("hidden");

    document.getElementById("courseSuccessOrderId").textContent = orderCode;

    document.getElementById("courseSuccessTitle").textContent = courseTitle;

    document.getElementById("courseSuccessEmail").textContent = email;

    const appEmailEl = document.getElementById("courseSuccessAppEmail");

    if (appEmailEl) appEmailEl.textContent = email;

    const driveLinkEl = document.getElementById("courseSuccessDriveLink");

    if (driveLinkEl && course && course.driveUrl) {

        driveLinkEl.href = course.driveUrl;

    }

}



function backToCourseStep1() {

    if (coursePollingInterval) { clearInterval(coursePollingInterval); coursePollingInterval = null; }

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



async function syncLiveProductsFromMasterSheet() {

    if (!state.webhookUrl) return;

    try {

        const res = await fetch(state.webhookUrl + "?action=getProducts", { method: "GET", mode: "cors" });

        const liveProducts = await res.json();

        if (!Array.isArray(liveProducts)) return;

        let changed = 0;



        liveProducts.forEach((item, idx) => {

            const sku = String(item.sku || "").trim();

            const rawName = String(item.name || "").trim();

            if (!sku || !rawName) return;

            const skuUpper = sku.toUpperCase();

            // Bỏ qua các dòng Khóa học hoặc file hệ thống

            if (skuUpper.startsWith("COURSE-") || skuUpper === "ALL-COURSES-399K" || /^DC_\d{4}$/.test(skuUpper)) return;

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

                if (item.price) existing.price = Number(item.price) || existing.price;

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



        renderDocuments();

    } catch (e) {}

}





/* ==========================================================================

   9. ĐỒNG BỘ TÀI KHOẢN KHÁCH HÀNG WEB (DIEPVIEN.STORE) <-> APP (ĐIỆP VIÊN STUDY)

      & ĐỐI SOÁT BẮT BUỘC TỪ EMAIL BIẾN ĐỘNG SỐ DƯ NGÂN HÀNG

   ========================================================================== */



function getSyncedCustomerLocal() {

    try {

        return JSON.parse(localStorage.getItem("dvtl_synced_customer") || "null");

    } catch (e) {

        return null;

    }

}



function applySyncedCustomerToForms() {

    const cust = getSyncedCustomerLocal();

    const lbl = document.getElementById("headerAccountSyncLabel");

    if (cust && cust.email) {

        if (lbl) lbl.textContent = (cust.name || cust.email) + " · Đã Đồng Bộ App";

        const ids = [

            ["checkoutNameInput", cust.name],

            ["checkoutPhoneInput", cust.phone],

            ["checkoutEmailInput", cust.email],

            ["courseStudentName", cust.name],

            ["courseStudentPhone", cust.phone],

            ["courseStudentEmail", cust.email],

            ["srvNameInput", cust.name],

            ["srvPhoneInput", cust.phone],

            ["srvEmailInput", cust.email]

        ];

        ids.forEach(([id, val]) => {

            const el = document.getElementById(id);

            if (el && val && !el.value) el.value = val;

        });

    } else if (lbl) {

        lbl.textContent = "Đăng Nhập";

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

        list.innerHTML = `<div class="p-3 bg-slate-50 rounded-xl text-slate-500 text-center">Chưa có khóa học hoặc đề cương nào ở trạng thái PAID_SUCCESS (Xác thực biến động số dư ngân hàng).</div>`;

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

            <div><strong class="text-[#0D1677]"><svg class="inline-block w-4 h-4 shrink-0 align-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h6"/><path d="M9 11h4"/></svg> ${d.title || d.sku}</strong><div class="text-[10px] text-slate-500">Mã đơn #${d.orderCode}</div></div>

            ${d.driveUrl ? `<a href="${d.driveUrl}" target="_blank" class="px-2.5 py-1 bg-[#0D1677] text-white font-bold text-[10px] rounded-lg">Mở Drive</a>` : `<span class="text-emerald-700 font-bold text-[10px]">PAID_SUCCESS</span>`}

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

    if (state.webhookUrl) {
        try {
            const res = await fetch(state.webhookUrl + "?action=getCustomerSync&email=" + encodeURIComponent(email) + "&deviceId=" + encodeURIComponent(myWebDevId), { method: "GET", mode: "cors" });
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
                if (expandedCourses.length > 0 && !wbMatch) {
                    const hwTag = hwMatch ? ` [HW:${hwMatch[1]}]` : "";
                    const lockedPhoneStr = `${cleanPhone} [WB:${myWebDevId}]${hwTag}`.trim();
                    fetch(state.webhookUrl, {
                        method: "POST",
                        mode: "no-cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            action: "registerOrLoginCustomer",
                            email,
                            name: syncedProfile.name,
                            phone: lockedPhoneStr,
                            password,
                            source: "WEB_DEVICE_LOCKED_1_MACHINE"
                        })
                    }).catch(() => {});
                }
            }
        } catch (e) {}
    }

    localStorage.setItem("dvtl_synced_customer", JSON.stringify(syncedProfile));
    localStorage.setItem("dvtl_app_otp_verified_email", email);
    localStorage.setItem("dvtl_app_otp_verified_name", syncedProfile.name);
    applySyncedCustomerToForms();
    updateVerifiedAppDownloadUI();
    renderSyncedCustomerEntitlements(syncedProfile);
    renderCourses();

    // Khi khách đăng nhập xong -> Tự động tải APP Diep Vien study về máy cho khách!
    startDirectFileDownload("DiepVienStudy_Setup.exe");

    if (msgEl) {
        msgEl.innerHTML = `Đã đăng nhập thành công tài khoản <strong>${syncedProfile.name}</strong> (${email}) và đang tự động tải <strong>APP Diep Vien study</strong> về máy! <a href="DiepVienStudy_Setup.exe" download="DiepVienStudy_Setup.exe" class="underline font-black text-[#0D1677] dark:text-amber-300 ml-1">Bấm vào đây nếu trình duyệt chưa tự tải</a>.`;
    }
}

function logoutCustomerSyncWeb() {
    localStorage.removeItem("dvtl_synced_customer");
    localStorage.removeItem("dvtl_app_otp_verified_email");
    localStorage.removeItem("dvtl_app_otp_verified_name");
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
    const noteEl = document.getElementById("courseTransferNote");
    const orderCode = (noteEl?.dataset?.orderCode || noteEl?.textContent || "").split(" ")[0].trim();
    const email = document.getElementById("courseStudentEmail")?.value.trim() || "";
    const statusText = document.getElementById("courseWaitingStatusText");
    if (statusText) statusText.textContent = "Đang đối soát Email biến động số dư ngân hàng ACB cho mã #" + orderCode + "...";
    if (!state.webhookUrl || !orderCode) return;
    try {
        const verifyUrl = state.webhookUrl + "?action=verify&orderId=" + encodeURIComponent(orderCode);
        const res = await fetch(verifyUrl, { method: "GET", mode: "cors" });
        const data = await res.json();
        if (data && data.verified === true) {
            onCoursePaymentConfirmed(orderCode, selectedCourseForCheckout.title, email);
        } else if (statusText) {
            statusText.textContent = "Chưa nhận được Email biến động số dư ngân hàng cho mã #" + orderCode + ". Vui lòng hoàn tất chuyển khoản!";
        }
    } catch (e) {
        if (statusText) {
            statusText.textContent = "Chưa ghi nhận biến động số dư ngân hàng cho mã #" + orderCode + ". Hệ thống đang tiếp tục quét tự động...";
        }
    }
}

/* ==========================================================================
   10. APP DIEP VIEN STUDY — SHOWCASE & MANDATORY USERNAME + EMAIL GATE BEFORE DOWNLOAD
   ========================================================================== */

function getVerifiedAppOtpEmailLocal() {
    try {
        return (localStorage.getItem("dvtl_app_otp_verified_email") || "").trim().toLowerCase();
    } catch (_) {
        return "";
    }
}

function getVerifiedAppOtpNameLocal() {
    try {
        return (localStorage.getItem("dvtl_app_otp_verified_name") || "").trim();
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
    const btnWinExe = document.getElementById("btnDirectDownloadWinExe");
    const btnMacZip = document.getElementById("btnDirectDownloadMacZip");
    const badge = document.getElementById("appGateLockBadge");
    const hint = document.getElementById("appGateStatusHint");

    const nameVal = (nameInp?.value || "").trim();
    const emailVal = (emailInp?.value || "").trim().toLowerCase();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    const isReady = nameVal.length >= 2 && emailValid;

    [btnWinExe, btnMacZip].forEach(btn => {
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
            badge.textContent = "Đã mở khóa tải App";
            badge.className = "px-2 py-0.5 rounded-full text-[9.5px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300";
        } else {
            badge.textContent = "Điền để mở khóa tải";
            badge.className = "px-2 py-0.5 rounded-full text-[9.5px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300";
        }
    }

    return isReady;
}

// Upgrade onDocPaymentConfirmed to always grant Google Drive access & show direct Drive button
function onDocPaymentConfirmed(orderCode, email, driveUrl = "") {
    if (typeof docPollingInterval !== "undefined" && docPollingInterval) {
        clearInterval(docPollingInterval);
        docPollingInterval = null;
    }

    document.getElementById("docCheckoutStep2")?.classList.add("hidden");
    document.getElementById("docCheckoutStep3")?.classList.remove("hidden");
    const ordEl = document.getElementById("docSuccessOrderId");
    const emEl = document.getElementById("docSuccessEmail");
    if (ordEl) ordEl.textContent = orderCode;
    if (emEl) emEl.textContent = email;

    const doc = state.selectedDoc || {};
    const custName = document.getElementById("checkoutNameInput")?.value.trim() || "Sinh Viên";
    const resolvedDriveId = doc.driveId || "1bDThoRGY_IadvZDlUq0eyYmopMlEuSTT";
    const fallbackUrl = driveUrl || (doc.driveId ? (doc.driveType === "folder" ? `https://drive.google.com/drive/folders/${doc.driveId}` : `https://drive.google.com/file/d/${doc.driveId}/view`) : "https://drive.google.com/drive/folders/1bDThoRGY_IadvZDlUq0eyYmopMlEuSTT");

    const warehouseWebhook = "https://script.google.com/macros/s/AKfycbyaKudQDpHOtFWrNV5dr39hoFCqFXl2MVJRKhWY93i1nV95WAvw4HdXxIW-UA-7XjEjvA/exec";
    if (email) {
        fetch(warehouseWebhook, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
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

    const driveBtn = document.getElementById("docSuccessDriveBtn");
    if (driveBtn) {
        driveBtn.href = fallbackUrl;
        driveBtn.classList.remove("hidden");
    }
}

// Upgrade openSuccessModal so BTL Service orders also show the 10% Deposit VietQR immediately
function openSuccessModal(type, orderData) {
    const modal = document.getElementById("successModal");
    if (!modal) return;

    const title = document.getElementById("successModalTitle");
    const desc = document.getElementById("successModalDesc");
    const orderId = document.getElementById("successOrderId");
    const customerMail = document.getElementById("successCustomerEmail");

    if (orderId) orderId.textContent = orderData.orderId || "";
    if (customerMail) customerMail.textContent = orderData?.customer?.email || "";

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
        const memo = String(orderData?.orderId || "COCBTL").trim();
        const qrSrc = `https://img.vietqr.io/image/ACB-27384751-compact2.png?amount=${depAmount}&addInfo=${encodeURIComponent(memo)}&accountName=NGO%20BAO%20THACH`;
        if (title) title.textContent = "Đã Ghi Nhận Đơn Đặt Làm Bài!";
        if (desc) desc.textContent = "Quét mã VietQR bên dưới để đặt cọc 10% khởi động bài viết (ACB · 27384751 · NGO BAO THACH):";
        if (qrBox) {
            qrBox.classList.remove("hidden");
            qrBox.innerHTML = `
                <img id="serviceDepositQrImg" src="${qrSrc}" alt="VietQR Đặt Cọc 10% BTL" class="w-44 h-44 mx-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm mb-2 object-contain">
                <div class="text-xs font-black text-[#0D1677] dark:text-amber-400">Số tiền cọc (10%): ${depAmount.toLocaleString("vi-VN")} VNĐ</div>
                <div class="text-[11px] font-mono text-slate-600 dark:text-slate-300 mt-0.5">Nội dung CK: <strong>${memo}</strong></div>
            `;
        }
    }

    modal.classList.remove("hidden");
}

function startDirectFileDownload(hrefUrl, downloadFilename = "DiepVienStudy_Setup.exe") {
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

    localStorage.setItem("dvtl_app_otp_verified_name", nameVal);
    localStorage.setItem("dvtl_app_otp_verified_email", emailVal);

    const prev = getSyncedCustomerLocal() || {};
    const synced = {
        ...prev,
        name: nameVal,
        email: emailVal,
        unlockedCourses: prev.unlockedCourses || [],
        purchasedDocs: prev.purchasedDocs || [],
        btlOrders: prev.btlOrders || []
    };
    localStorage.setItem("dvtl_synced_customer", JSON.stringify(synced));
    applySyncedCustomerToForms();

    const webhook = (state && state.webhookUrl) ? state.webhookUrl : APP_CONFIG.defaultWebhookUrl;
    if (webhook) {
        fetch(webhook, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "registerOrLoginCustomer",
                email: emailVal,
                name: nameVal,
                phone: prev.phone || "",
                source: "WEB_APP_DOWNLOAD_GATE"
            })
        }).catch(() => {});
    }

    const links = (typeof APP_DOWNLOAD_LINKS !== "undefined" && APP_DOWNLOAD_LINKS) ? APP_DOWNLOAD_LINKS : {};
    if (targetPlatform === "macos") {
        const macUrl = links.macos_zip_direct_url || "https://drive.google.com/uc?export=download&id=1WMGpwANae4qOCM9hQ8FTI5poZwVfP2lf";
        window.open(macUrl, "_blank", "noopener,noreferrer");
    } else if (targetPlatform === "windows") {
        const winUrl = links.windows_zip_direct_url || "https://drive.google.com/uc?export=download&id=1hh3zp7-X3leDex77Rf76W9BeiJzEUZkf";
        window.open(winUrl, "_blank", "noopener,noreferrer");
    } else {
        startDirectFileDownload("DiepVienStudy_Setup.exe", "DiepVienStudy_Setup.exe");
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

    if (nameInp && !nameInp.value) nameInp.value = verifiedName || cust?.name || "";
    if (emailInp && !emailInp.value) emailInp.value = verifiedEmail || cust?.email || "";

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
    }, 250);
});
