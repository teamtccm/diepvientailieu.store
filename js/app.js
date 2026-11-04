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
            btn.className = "nav-tab-btn px-4 py-1.5 rounded-full text-[13px] font-extrabold bg-[#FFA000] text-slate-950 shadow-md transition-all duration-200 whitespace-nowrap";
        } else {
            btn.className = "nav-tab-btn px-4 py-1.5 rounded-full text-[13px] font-bold text-white hover:bg-white/10 hover:text-amber-300 transition-all duration-200 whitespace-nowrap";
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
                <span class="${isTop3 ? 'text-red-500 font-black' : 'text-amber-500'} group-hover:text-slate-950 transition-colors">🔥</span>
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
        displayContent.innerHTML = `<span class="text-slate-400 font-medium">🏫 Chọn Trường Của Bạn</span>`;
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
            displayContent.innerHTML = `<span class="text-slate-400 font-medium">🏫 Chọn Trường Của Bạn</span>`;
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
        // No search query: display showcase as user specified
        list = [...DOCUMENTS_DATABASE];
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
                <div class="w-16 h-16 mx-auto bg-blue-50 text-[#0D1677] rounded-full flex items-center justify-center text-3xl mb-4">🔍</div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Chưa tìm thấy đề cương "${state.searchQuery || 'này'}"</h3>
                <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
                    Đừng lo! Điệp Viên Tài Liệu có kho tài liệu riêng đầy đủ mọi môn theo trường ${fallbackBadge}. Bạn hãy nhắn Zalo để nhân viên gửi link Google Drive cho bạn ngay nhé!
                </p>
                <button onclick="openChatModal()" class="inline-flex items-center gap-2 px-6 py-3 bg-[#0D1677] hover:bg-[#1E40AF] text-white font-bold rounded-xl shadow-lg transition">
                    <span>💬 Nhắn Zalo Đặt Lấy Đề Cương Ngay</span>
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

        const fullDocTitle = `ĐỀ CƯƠNG ${doc.baseName.toUpperCase()} — ${docUniBadge}`;
        const iconSymbol = doc.icon || "📚";
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
                            ${doc.isReal ? '<span class="text-[9px] font-extrabold text-amber-300 bg-amber-950/70 border border-amber-400/40 px-2 py-0.5 rounded-full ml-auto">⚡ CÓ SẴN FILE DRIVE</span>' : ''}
                        </div>
                        <h4 class="font-condensed font-black text-lg sm:text-xl text-white tracking-wide uppercase leading-tight line-clamp-2 drop-shadow-md">
                            ${fullDocTitle}
                        </h4>
                        <div class="flex items-center gap-2.5 mt-2.5 text-[10px]">
                            <span class="text-amber-300 font-bold">📄 ${doc.pages} Trang A4</span>
                            <span class="text-emerald-300 font-bold">⭐ ${doc.rating} (${doc.reviewsCount})</span>
                            <span class="text-sky-200 font-bold">⚡ Google Drive</span>
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
                                <span>💬 Hỏi Shop</span>
                            </button>
                            <button onclick="openDocCheckoutModal('${doc.id}', this.dataset.title)" data-title="${fullDocTitle.replace(/'/g, '&#39;').replace(/"/g, '&quot;')}" class="px-3 py-2.5 bg-[#0D1677] hover:bg-[#1E40AF] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1 transition">
                                <span>🛒 Mua Ngay</span>
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
    const doc = (typeof REAL_DOCUMENTS_DATABASE !== 'undefined' ? REAL_DOCUMENTS_DATABASE.find(d => d.id === docId) : null)
             || DOCUMENTS_DATABASE.find(d => d.id === docId);
    if (!doc) return;
    
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
        alert("⚠️ Vui lòng điền đầy đủ Họ tên, Số điện thoại và Email Gmail!");
        return;
    }
    
    if (!email.includes("@")) {
        alert("⚠️ Vui lòng nhập địa chỉ Email chính xác để nhận link Google Drive!");
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
    const fallbackUrl = driveUrl || (state.selectedDoc?.driveId ? `https://drive.google.com/file/d/${state.selectedDoc.driveId}/view` : "");
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
            fbEl.textContent = "⚠️ Chưa nhận được Email biến động số dư từ ngân hàng ACB cho mã #" + orderCode + ". Hệ thống chỉ tự động giao tài liệu sau khi ngân hàng báo tiền về!";
        }
    } catch (e) {
        if (fbEl) {
            fbEl.textContent = "⚠️ Chưa ghi nhận biến động số dư ngân hàng cho mã #" + orderCode + ". Vui lòng kiểm tra lại nội dung chuyển khoản!";
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
        alert("⚠️ Vui lòng điền đầy đủ các thông tin bắt buộc và hạn nộp (Deadline)!");
        return;
    }
    
    const privacyCheckbox = document.getElementById("srvPrivacyCheckbox");
    if (privacyCheckbox && !privacyCheckbox.checked) {
        alert("⚠️ Bạn cần tích xác nhận thông tin chính xác và đồng ý điều khoản trước khi gửi yêu cầu đặt bài!");
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
        if (title) title.textContent = "🎉 Gửi Đơn Thành Công!";
        if (desc) desc.textContent = "Hệ thống đã ghi nhận mã đơn của bạn và phân quyền Google Drive vào Gmail!";
    } else {
        if (title) title.textContent = "🎉 Đã Ghi Nhận Đơn Hàng!";
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
                el.textContent = "✓ Đã copy!";
                setTimeout(() => el.textContent = oldText, 2000);
            }
        } else {
            alert("✓ Đã sao chép: " + text);
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
        alert("✓ Đã lưu cấu hình Google Apps Script Webhook!");
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
   COURSES MODULE: RENDER, FILTER, CHECKOUT
   ========================================================================== */

let activeCourseCategory = "all";
let selectedCourseForCheckout = null;

function renderCourseCategoryTabs() {
    const container = document.getElementById("courseCategoryTabs");
    if (!container || typeof COURSE_CATEGORIES === "undefined") return;

    container.innerHTML = COURSE_CATEGORIES.map(cat => {
        const isActive = cat.id === activeCourseCategory;
        const activeClass = isActive
            ? "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg border-transparent"
            : "bg-white text-slate-700 border-slate-200 hover:border-rose-400 hover:text-rose-700";
        return `<button onclick="filterCoursesByCategory('${cat.id}')" class="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl border-2 transition whitespace-nowrap ${activeClass}">
            ${cat.name}
        </button>`;
    }).join("");
}

function filterCoursesByCategory(categoryId) {
    activeCourseCategory = categoryId;
    renderCourseCategoryTabs();
    renderCourses();
}

function renderCourses() {
    const grid = document.getElementById("coursesGrid");
    if (!grid || typeof COURSES_DATABASE === "undefined") return;

    let courses = COURSES_DATABASE;
    if (activeCourseCategory !== "all") {
        courses = courses.filter(c => c.category === activeCourseCategory);
    }

    // Update count badge
    const badge = document.getElementById("courseCountBadge");
    if (badge) badge.textContent = "200 Khóa Học";

    if (courses.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-20">
                <p class="text-4xl mb-3">📭</p>
                <p class="text-slate-500 font-bold">Chưa có khóa học nào trong danh mục này</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = courses.map(course => {
        const formattedPrice = course.price.toLocaleString("vi-VN");
        const formattedOriginal = course.originalPrice.toLocaleString("vi-VN");
        const stars = "★".repeat(Math.floor(course.rating)) + (course.rating % 1 >= 0.5 ? "½" : "");

        return `
        <div class="group bg-white rounded-2xl border-2 border-slate-100 hover:border-rose-300 shadow-sm hover:shadow-xl transition-all overflow-hidden cursor-pointer" onclick="openCourseCheckoutModal('${course.id}')">
            <!-- Card Header -->
            <div class="bg-gradient-to-br from-[#0B1958] via-[#0D1677] to-[#1a237e] p-5 relative overflow-hidden">
                <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 30% 50%, rgba(255,160,0,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%);"></div>
                <div class="relative z-10">
                    <div class="flex items-start justify-between mb-3">
                        <span class="text-3xl">${course.icon}</span>
                        <span class="px-2.5 py-1 ${course.badgeColor} font-bold text-[10px] rounded-lg uppercase tracking-wider shadow-md">${course.badge}</span>
                    </div>
                    <p class="text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1">${course.categoryName} • ${course.code}</p>
                    <h3 class="text-white font-black text-sm leading-snug line-clamp-2 min-h-[40px]">${course.title}</h3>
                </div>
            </div>

            <!-- Card Body -->
            <div class="p-5">
                <!-- Instructor & Meta -->
                <div class="flex items-center gap-2 mb-3">
                    <div class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-[#0D1677]">👤</div>
                    <div>
                        <p class="text-[11px] font-bold text-slate-800 leading-tight">${course.instructor}</p>
                        <p class="text-[10px] text-slate-400">${course.level}</p>
                    </div>
                </div>

                <!-- Stats Row -->
                <div class="flex items-center gap-3 text-[11px] text-slate-500 mb-3 pb-3 border-b border-slate-100">
                    <span class="text-amber-500 font-bold">${stars} ${course.rating}</span>
                    <span>👥 ${course.studentsCount}</span>
                    <span>📅 ${course.duration.split('+')[0].trim()}</span>
                </div>

                <!-- Highlights -->
                <ul class="space-y-1.5 mb-4">
                    ${course.highlights.slice(0, 3).map(h => `
                        <li class="flex items-start gap-2 text-[11px] text-slate-600 leading-relaxed">
                            <span class="text-emerald-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                            <span class="line-clamp-1">${h}</span>
                        </li>
                    `).join("")}
                </ul>

                <!-- Price & CTA -->
                <div class="flex items-end justify-between">
                    <div>
                        <p class="text-slate-400 text-xs line-through">${formattedOriginal}₫</p>
                        <p class="text-red-600 font-black text-xl">${formattedPrice}₫</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 bg-red-100 text-red-700 font-black text-[10px] rounded-full">-${course.discountPercent}</span>
                        <button class="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-black text-xs rounded-xl shadow-md transition">
                            Đăng Ký
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join("");
}

function openCourseCheckoutModal(courseId) {
    if (typeof COURSES_DATABASE === "undefined") return;
    const course = COURSES_DATABASE.find(c => c.id === courseId);
    if (!course) return;

    selectedCourseForCheckout = course;

    document.getElementById("courseCheckoutTitle").textContent = course.title;
    document.getElementById("courseCheckoutPrice").textContent = course.price.toLocaleString("vi-VN") + "₫";
    document.getElementById("courseCheckoutOriginalPrice").textContent = course.originalPrice.toLocaleString("vi-VN") + "₫";
    document.getElementById("courseCheckoutDiscount").textContent = "-" + course.discountPercent;
    document.getElementById("courseTransferNote").textContent = `KHOAHOC ${course.code} [SĐT của bạn]`;

    // Reset form
    document.getElementById("courseStudentName").value = "";
    document.getElementById("courseStudentPhone").value = "";
    document.getElementById("courseStudentEmail").value = "";

    // Reset to Step 1
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
    const phone = document.getElementById("courseStudentPhone").value.trim();
    const email = document.getElementById("courseStudentEmail").value.trim().toLowerCase();

    if (!name || !phone || !email) {
        alert("⚠️ Vui lòng điền đầy đủ Họ tên, SĐT Zalo và Email!");
        return;
    }

    if (!email.includes("@")) {
        alert("⚠️ Vui lòng nhập địa chỉ Email chính xác!");
        return;
    }

    if (!selectedCourseForCheckout) {
        alert("⚠️ Không tìm thấy thông tin khóa học!");
        return;
    }

    const course = selectedCourseForCheckout;
    const cleanCode = String(course.code || "HSA01").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
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

    const payload = {
        action: "createOrder",
        type: "COURSE_REGISTRATION",
        orderType: "Khóa Học",
        status: "PENDING",
        orderCode: orderCode,
        sku: course.id || course.code,
        itemName: course.title,
        price: course.price,
        name: name,
        phone: phone,
        email: email,
        bank: "ACB",
        stkNhan: "27384751",
        timestamp: new Date().toISOString()
    };

    if (state.webhookUrl) {
        fetch(state.webhookUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => {});
    }
    state.orderHistory.unshift(payload);
    localStorage.setItem("dvtl_orders", JSON.stringify(state.orderHistory.slice(0, 50)));

    // Switch to Step 2
    document.getElementById("courseCheckoutStep1").classList.add("hidden");
    document.getElementById("courseCheckoutStep2").classList.remove("hidden");

    // Start auto-verification polling
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
        const verifyUrl = state.webhookUrl + "?action=verify&orderId=" + encodeURIComponent(orderCode);
        const res = await fetch(verifyUrl, { method: "GET", mode: "cors" });
        const data = await res.json();
        if (data && data.verified === true) {
            onCoursePaymentConfirmed(orderCode, courseTitle, email);
        }
    } catch(e) {}
}

function onCoursePaymentConfirmed(orderCode, courseTitle, email) {
    if (coursePollingInterval) { clearInterval(coursePollingInterval); coursePollingInterval = null; }

    // Switch to Step 3 (Success)
    document.getElementById("courseCheckoutStep2").classList.add("hidden");
    document.getElementById("courseCheckoutStep3").classList.remove("hidden");
    document.getElementById("courseSuccessOrderId").textContent = orderCode;
    document.getElementById("courseSuccessTitle").textContent = courseTitle;
    document.getElementById("courseSuccessEmail").textContent = email;
}

function backToCourseStep1() {
    if (coursePollingInterval) { clearInterval(coursePollingInterval); coursePollingInterval = null; }
    document.getElementById("courseCheckoutStep2").classList.add("hidden");
    document.getElementById("courseCheckoutStep1").classList.remove("hidden");
}


async function syncLiveProductsFromMasterSheet() {
    if (!state.webhookUrl) return;
    try {
        const res = await fetch(state.webhookUrl + "?action=getProducts", { method: "GET", mode: "cors" });
        const liveProducts = await res.json();
        if (!Array.isArray(liveProducts)) return;
        let added = 0;
        const existingByCode = new Set((typeof REAL_DOCUMENTS_DATABASE !== "undefined" ? REAL_DOCUMENTS_DATABASE : []).map(d => String(d.code).toUpperCase()));
        liveProducts.forEach(item => {
            const sku = String(item.sku || "").trim();
            if (!sku) return;
            const existing = (typeof REAL_DOCUMENTS_DATABASE !== "undefined" ? REAL_DOCUMENTS_DATABASE : []).find(d => String(d.code).toUpperCase() === sku.toUpperCase());
            if (existing) {
                if (item.price) existing.price = Number(item.price) || existing.price;
                if (item.driveId) existing.driveId = String(item.driveId).trim();
            } else if (typeof REAL_DOCUMENTS_DATABASE !== "undefined") {
                const rawName = String(item.name || sku).trim();
                const baseName = rawName.replace(/\.(docx?|pdf|xlsx?|pptx?|txt)$/i, "").replace(/^Đề Cương\s*/i, "").trim();
                const newDoc = {
                    id: "doc_live_" + sku.toLowerCase(),
                    code: sku,
                    rawName: rawName,
                    baseName: baseName,
                    category: "kinh_te",
                    icon: "📚",
                    pages: 45,
                    price: Number(item.price) || 50000,
                    originalPrice: 100000,
                    rating: "4.9",
                    reviewsCount: 68,
                    tags: ["Chuẩn Đề Thi 2026", "Có Đáp Án Chi Tiết", "File Google Drive"],
                    isReal: true,
                    driveId: String(item.driveId || "").trim()
                };
                REAL_DOCUMENTS_DATABASE.unshift(newDoc);
                if (typeof DOCUMENTS_DATABASE !== "undefined") DOCUMENTS_DATABASE.unshift(newDoc);
                existingByCode.add(sku.toUpperCase());
                added++;
            }
        });
        if (added > 0) renderDocuments();
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
        lbl.textContent = "Đăng Nhập · Đồng Bộ App";
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
            <div><strong class="text-emerald-900">🎓 Khóa học: ${c}</strong><div class="text-[10px] text-emerald-700">Đã mở khóa trên App Điệp Viên Study & Google Drive</div></div>
            <span class="px-2 py-0.5 bg-emerald-600 text-white font-black text-[10px] rounded">ĐÃ MỞ KHÓA</span>
        </div>`;
    });
    docs.forEach(d => {
        html += `<div class="p-3 bg-blue-50 border border-blue-200 rounded-xl flex justify-between items-center">
            <div><strong class="text-[#0D1677]">📚 ${d.title || d.sku}</strong><div class="text-[10px] text-slate-500">Mã đơn #${d.orderCode}</div></div>
            ${d.driveUrl ? `<a href="${d.driveUrl}" target="_blank" class="px-2.5 py-1 bg-[#0D1677] text-white font-bold text-[10px] rounded-lg">Mở Drive</a>` : `<span class="text-emerald-700 font-bold text-[10px]">PAID_SUCCESS</span>`}
        </div>`;
    });
    list.innerHTML = html;
}

async function submitCustomerSyncWeb() {
    const email = document.getElementById("syncCustEmailInput")?.value.trim().toLowerCase() || "";
    const name = document.getElementById("syncCustNameInput")?.value.trim() || "";
    const phone = document.getElementById("syncCustPhoneInput")?.value.trim() || "";
    const password = document.getElementById("syncCustPassInput")?.value.trim() || "";
    const msgEl = document.getElementById("syncCustomerStatusMsg");

    if (!email || !email.includes("@")) {
        alert("⚠️ Vui lòng nhập đúng địa chỉ Email Gmail của bạn!");
        return;
    }
    if (msgEl) {
        msgEl.classList.remove("hidden");
        msgEl.textContent = "⏳ Đang đồng bộ dữ liệu tài khoản với Trạm Điều Khiển & App Điệp Viên Study...";
    }

    let syncedProfile = {
        email,
        name: name || "Học viên Điệp Viên",
        phone,
        unlockedCourses: [],
        purchasedDocs: [],
        btlOrders: []
    };

    if (state.webhookUrl) {
        try {
            await fetch(state.webhookUrl, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "registerOrLoginCustomer",
                    email,
                    name,
                    phone,
                    password,
                    source: "WEB_DIEPVIEN_STORE"
                })
            });
            const res = await fetch(state.webhookUrl + "?action=getCustomerSync&email=" + encodeURIComponent(email), { method: "GET", mode: "cors" });
            const data = await res.json();
            if (data && data.ok && data.customer) {
                syncedProfile = {
                    ...syncedProfile,
                    ...data.customer,
                    name: data.customer.name || name || syncedProfile.name,
                    phone: data.customer.phone || phone || syncedProfile.phone
                };
            }
        } catch (e) {}
    }

    localStorage.setItem("dvtl_synced_customer", JSON.stringify(syncedProfile));
    applySyncedCustomerToForms();
    renderSyncedCustomerEntitlements(syncedProfile);
    if (msgEl) {
        msgEl.textContent = "✓ Đã đồng bộ thành công! Bạn có thể dùng Gmail này để đăng nhập trên App Điệp Viên Study.";
    }
}

function logoutCustomerSyncWeb() {
    localStorage.removeItem("dvtl_synced_customer");
    applySyncedCustomerToForms();
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

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(applySyncedCustomerToForms, 250);
});
