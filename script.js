// =================================================================
// 0. KONFIGURASI SUPABASE DATABASE (PENYIMPANAN PERMANEN CLOUD)
// =================================================================
const SUPABASE_URL = "https://wyjdwrwizzxmtwmyrhah.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_0DBqgof5g7HiSw25CyF7iA_9kf778fB";

let supabaseReady = false;
let supabaseClient = null;

try {
    if (typeof window.supabase !== 'undefined' &&
        SUPABASE_URL &&
        !SUPABASE_URL.includes('NAMA_PROJECT') &&
        SUPABASE_ANON_KEY &&
        !SUPABASE_ANON_KEY.includes('PASTE_SUPABASE')) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        supabaseReady = true;
    } else {
        console.warn('⚠️ Supabase belum dikonfigurasi. Fitur blog cloud dinonaktifkan.');
    }
} catch (e) {
    console.warn('⚠️ Supabase init gagal:', e.message);
}


// =================================================================
// 1. SISTEM WAKTU REAL-TIME (JAM WIB)
// =================================================================
function updateJamWIB() {
    const now = new Date();
    const wib = new Date(now.getTime() + (7 * 60 + now.getTimezoneOffset()) * 60000);
    const jamElement = document.getElementById('jam-wib');
    if (jamElement) {
        const jam = String(wib.getHours()).padStart(2, '0');
        const menit = String(wib.getMinutes()).padStart(2, '0');
        const detik = String(wib.getSeconds()).padStart(2, '0');
        jamElement.textContent = `${jam}:${menit}:${detik}`;
    }
}
setInterval(updateJamWIB, 1000);
updateJamWIB();


// =================================================================
// 2. LOGIKA KALKULATOR DIGITAL ISLAMI
// =================================================================
function bukaKalkulator() {
    document.getElementById('main-content').classList.add('hidden-page');
    document.getElementById('calculator-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);
}
function tutupKalkulator() {
    document.getElementById('calculator-page').classList.add('hidden-page');
    document.getElementById('main-content').classList.remove('hidden-page');
}
function appendChar(char) {
    const display = document.getElementById('calc-display');
    if (display.value === '0' || display.value === 'Error') {
        display.value = char;
    } else {
        display.value += char;
    }
}
function clearDisplay() { document.getElementById('calc-display').value = ''; }
function deleteLast() {
    const display = document.getElementById('calc-display');
    display.value = display.value.slice(0, -1);
}
function calculateResult() {
    const display = document.getElementById('calc-display');
    try {
        if (display.value.trim() === '') return;
        const sanitized = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        if (/^[0-9+\-*/.() ]+$/.test(sanitized)) {
            display.value = Function('"use strict";return (' + sanitized + ')')();
        } else {
            display.value = 'Error';
        }
    } catch (e) {
        display.value = 'Error';
    }
}


// =================================================================
// 3. LOGIKA PORTAL ARTIKEL SUARA ISLAMI
// =================================================================
function bukaArtikel() {
    document.getElementById('main-content').classList.add('hidden-page');
    document.getElementById('artikel-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);
}
function tutupArtikel() {
    document.getElementById('artikel-page').classList.add('hidden-page');
    document.getElementById('main-content').classList.remove('hidden-page');
}


// =================================================================
// 4. LOGIKA KOMPILASI GAME ISLAMI (PUZZLE LOGO & MAPCHART PROVINSI)
// =================================================================
let puzzleGridSize = 2;
let puzzleBoard = [];

function bukaGame() {
    document.getElementById('main-content').classList.add('hidden-page');
    document.getElementById('games-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);
    setTimeout(() => initPuzzle(), 50);
}

function tutupGame() {
    document.getElementById('games-page').classList.add('hidden-page');
    document.getElementById('main-content').classList.remove('hidden-page');
}

function setDifficulty(size, btn) {
    puzzleGridSize = size;
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    initPuzzle();
}

function initPuzzle() {
    const boardEl = document.getElementById('puzzle-board');
    const winMsg = document.getElementById('puzzle-win-msg');
    const stepCountEl = document.getElementById('step-count');
    if (!boardEl || !winMsg || !stepCountEl) return;

    boardEl.innerHTML = '';luqman
    const totalTiles = puzzleGridSize * puzzleGridSize;
    puzzleBoard = Array.from({ length: totalTiles }, (_, i) => i);

    do {
        for (let i = puzzleBoard.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [puzzleBoard[i], puzzleBoard[j]] = [puzzleBoard[j], puzzleBoard[i]];
        }
    } while (!isSolvable(puzzleBoard, puzzleGridSize) || puzzleBoard.every((v, i) => v === i));

    renderPuzzleTiles();
}

function isSolvable(board, size) {
    let inversions = 0;
    const arr = board.filter(v => v !== board.length - 1);
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) inversions++;
        }
    }
    if (size % 2 === 1) return inversions % 2 === 0;
    const emptyRowFromBottom = size - Math.floor(board.indexOf(board.length - 1) / size);
    return (inversions + emptyRowFromBottom) % 2 === 1;
}

function renderPuzzleTiles() {
    const boardEl = document.getElementById('puzzle-board');
    const logoSelectEl = document.getElementById('puzzle-image-select');
    if (!boardEl) return;
    boardEl.innerHTML = '';

    const logoSelect = logoSelectEl ? logoSelectEl.value : 'im';
    const bgImg = logoSelect === 'im'
        ? 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Muslim_Brotherhood_Emblem.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Hizb_ut-Tahrir_logo.svg';

    puzzleBoard.forEach((tileIndex, i) => {
        const tile = document.createElement('div');
        tile.className = 'puzzle-tile';

        if (tileIndex === puzzleBoard.length - 1) {
            tile.classList.add('empty-tile');
        } else {
            const row = Math.floor(tileIndex / puzzleGridSize);
            const col = tileIndex % puzzleGridSize;
            tile.style.backgroundImage = `url('${bgImg}')`;
            tile.style.backgroundSize = `${puzzleGridSize * 100}% ${puzzleGridSize * 100}%`;
            const denom = puzzleGridSize > 1 ? (puzzleGridSize - 1) : 1;
            tile.style.backgroundPosition = `${(col / denom) * 100}% ${(row / denom) * 100}%`;
            tile.onclick = () => moveTile(i);
        }
        boardEl.appendChild(tile);
    });
}
uzzleBoard.length - 1);
    const row = Math.floor(index / puzzleGridSize);
    const col = index % puzzleGridSize;
    const emptyRow = Math.floor(emptyIndex / puzzleGridSize);
    const emptyCol = emptyIndex % puzzleGridSize;

    const isAdjacent = (Math.abs(row - emptyRow) + Math.abs(col - emptyCol)) === 1;
    if (isAdjacent) {
        [puzzleBoard[index], puzzleBoard[emptyIndex]] = [puzzleBoard[emptyIndex], puzzleBoard[index]];
        const stepCountEl = document.getElementById('step-count');
        stepCountEl.textContent = parseInt(stepCountEl.textContent) + 1;
        renderPuzzleTiles();
        checkPuzzleWin();
    }
}

function checkPuzzleWin() {
    const isWin = puzzleBoard.every((val, idx) => val === idx);
    if (isWin) {
        document.getElementById('puzzle-win-msg').classList.remove('hidden');
    }
}

// =================================================================
// MAPCHART INTERAKTIF DUNIA (TINGKAT PROVINSI & NEGARA ASLI)
// =================================================================
let leafletMap = null;
let geoJsonLayer = null;
let mapMarkers = [];
let coloredRegions = {}; // Menyimpan { "ID_WILAYAH": { name: "Jawa Barat (Indonesia)", color: "#10b981" } }
let currentMapLevel = 'provinces';

const GEOJSON_SOURCES = {
    provinces: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson',
    countries: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
};

function bukaMapChart() {
    document.getElementById('games-page').classList.add('hidden-page');
    document.getElementById('mapchart-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);

    setTimeout(() => {
        if (!leafletMap) {
            leafletMap = L.map('leaflet-map', {
                center: [-2.5, 118], // Fokus awal ke Indonesia agar langsung terlihat provinsinya
                zoom: 4,
                minZoom: 2,
                maxZoom: 9,
                worldCopyJump: true,
                preferCanvas: true // Performa super cepat untuk ribuan poligon provinsi dunia
            });
            loadGeoJsonLevel(currentMapLevel);
        } else {
            leafletMap.invalidateSize();
        }
    }, 250);
}

function gantiLevelPeta(level) {
    currentMapLevel = level;
    coloredRegions = {};
    renderMapLegend();
    loadGeoJsonLevel(level);
}

function loadGeoJsonLevel(level) {
    const statusInput = document.getElementById('selected-region-name');
    if (statusInput) {
        statusInput.value = level === 'provinces'
            ? "Memuat 4.500+ poligon provinsi dunia..."
            : "Memuat poligon negara dunia...";
    }

    if (geoJsonLayer) {
        leafletMap.removeLayer(geoJsonLayer);
        geoJsonLayer = null;
    }

    fetch(GEOJSON_SOURCES[level])
        .then(res => {
            if (!res.ok) throw new Error("Gagal mengambil data peta");
            return res.json();
        })
        .then(data => {
            if (statusInput) {
                statusInput.value = level === 'provinces'
                    ? "Siap! Klik provinsi manapun (misal: Jawa Barat)"
                    : "Siap! Klik negara manapun";
            }

            geoJsonLayer = L.geoJSON(data, {
                style: function () {
                    return {
                        fillColor: '#334155', // Warna dasar daratan
                        weight: level === 'provinces' ? 0.7 : 1,
                        opacity: 1,
                        color: '#0f172a',     // Garis batas antar provinsi/negara
                        fillOpacity: 0.92
                    };
                },
                onEachFeature: function (feature, layer) {
                    const props = feature.properties || {};
                    let regionName = "";
                    let regionId = "";

                    if (level === 'provinces') {
                        const provName = props.name || props.name_en || "Provinsi";
                        const countryName = props.admin || props.geonunit || "";
                        regionName = countryName ? `${provName} (${countryName})` : provName;
                        regionId = props.adm1_code || `${provName}_${countryName}`;
                    } else {
                        regionName = props.name || "Negara";
                        regionId = feature.id || regionName;
                    }

                    // Tooltip nama provinsi/negara saat kursor diarahkan
                    layer.bindTooltip(regionName, {
                        sticky: true,
                        className: 'country-tooltip'
                    });

                    // Sorot batas poligon saat hover
                    layer.on('mouseover', function () {
                        if (statusInput) statusInput.value = regionName;
                        this.setStyle({
                            weight: 2,
                            color: '#ffd700'
                        });
                        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                            this.bringToFront();
                        }
                    });

                    layer.on('mouseout', function () {
                        const saved = coloredRegions[regionId];
                        this.setStyle({
                            fillColor: saved ? saved.color : '#334155',
                            weight: level === 'provinces' ? 0.7 : 1,
                            color: '#0f172a',
                            fillOpacity: saved ? 0.96 : 0.92
                        });
                    });

                    // Klik poligon untuk mengisi warna penuh sesuai bentuk provinsi/negara
                    layer.on('click', function (e) {
                        const mode = document.getElementById('symbol-mode').value;
                        const selectedColor = document.getElementById('map-color-picker').value;

                        if (mode === 'fill') {
                            coloredRegions[regionId] = { name: regionName, color: selectedColor };
                            this.setStyle({
                                fillColor: selectedColor,
                                fillOpacity: 0.96
                            });
                            renderMapLegend();
                        } else if (mode === 'erase') {
                            delete coloredRegions[regionId];
                            this.setStyle({
                                fillColor: '#334155',
                                fillOpacity: 0.92
                            });
                            renderMapLegend();
                        } else if (mode === 'crescent') {
                            const crescentIcon = L.divIcon({
                                className: 'custom-crescent-pin',
                                html: '<span style="font-size:22px; color:#ffd700; text-shadow:0 0 6px #000;">☪</span>',
                                iconSize: [26, 26],
                                iconAnchor: [13, 13]
                            });
                            const marker = L.marker(e.latlng, { icon: crescentIcon }).addTo(leafletMap);
                            marker.bindPopup(`<strong>☪ ${regionName}</strong>`);
                            mapMarkers.push(marker);
                        }
                    });
                }
            }).addTo(leafletMap);
        })
        .catch(() => {
            // Cadangan otomatis ke peta negara jika jaringan lambat memuat file provinsi besar
            if (level === 'provinces') {
                if (statusInput) statusInput.value = "Mengalihkan ke peta negara...";
                const levelSelect = document.getElementById('map-level-select');
                if (levelSelect) levelSelect.value = 'countries';
                currentMapLevel = 'countries';
                loadGeoJsonLevel('countries');
            } else if (statusInput) {
                statusInput.value = "Gagal memuat data peta (periksa internet).";
            }
        });
}

function renderMapLegend() {
    const legendContainer = document.getElementById('map-legend-list');
    if (!legendContainer) return;

    const colorGroups = {};
    Object.values(coloredRegions).forEach(item => {
        if (!colorGroups[item.color]) colorGroups[item.color] = [];
        colorGroups[item.color].push(item.name);
    });

    const colors = Object.keys(colorGroups);
    if (colors.length === 0) {
        legendContainer.innerHTML = `<p style="font-size:0.78rem; color:#64748b;">Klik provinsi/wilayah pada peta untuk mewarnai bentuk aslinya.</p>`;
        return;
    }

    legendContainer.innerHTML = colors.map(color => {
        const listWilayah = colorGroups[color].join(', ');
        return `
            <div class="legend-item">
                <span class="legend-color-box" style="background:${color};"></span>
                <span><strong>${colorGroups[color].length} Wilayah:</strong> ${listWilayah}</span>
            </div>
        `;
    }).join('');
}

function tutupMapChart() {
    document.getElementById('mapchart-page').classList.add('hidden-page');
    document.getElementById('games-page').classList.remove('hidden-page');
}

function updateRGBText(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    document.getElementById('rgb-display').textContent = `RGB(${r}, ${g}, ${b})`;
}

function resetWarnaPeta() {
    coloredRegions = {};
    if (geoJsonLayer) {
        geoJsonLayer.eachLayer(layer => {
            layer.setStyle({
                fillColor: '#334155',
                weight: currentMapLevel === 'provinces' ? 0.7 : 1,
                color: '#0f172a',
                fillOpacity: 0.92
            });
        });
    }
    if (leafletMap) {
        mapMarkers.forEach(m => leafletMap.removeLayer(m));
    }
    mapMarkers = [];
    renderMapLegend();
}


// =================================================================
// 6. LOGIKA CHATBOT AI ISLAMI (KEPRIBADIAN HASSAN AL-BANNA)
// =================================================================
const HASSAN_ALBANNA_AVATAR = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Hassan_al-Banna.jpg/440px-Hassan_al-Banna.jpg";

const SYARIAH_BLOCKED_KEYWORDS = [
    'judi', 'slot', 'togel', 'gacor', 'taruhan', 'casino', 'poker', 'sabung ayam',
    'porn', 'bokep', 'zina', 'mesum', 'telanjang', 'seks bebas', 'pacaran', 'maksiat',
    'mabuk', 'miras', 'khamr', 'alkohol', 'narkoba', 'sabu', 'ganja', 'ekstasi',
    'riba', 'pinjol ilegal', 'pesugihan', 'santet', 'dukun', 'pelet', 'syirik', 'ramalan zodiak',
    'bunuh diri', 'melukai diri', 'bom', 'teror', 'mencuri', 'hack akun', 'carding', 'menipu'
];

function bukaChatbot() {
    const pagesToHide = ['main-content', 'calculator-page', 'artikel-page', 'games-page', 'kiblat-page', 'mapchart-page'];
    pagesToHide.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden-page');
    });

    const chatPage = document.getElementById('chatbot-page');
    if (chatPage) {
        chatPage.classList.remove('hidden-page');
        window.scrollTo(0, 0);
        const input = document.getElementById('chat-user-input');
        if (input) setTimeout(() => input.focus(), 100);
    }
}

function tutupChatbot() {
    const chatPage = document.getElementById('chatbot-page');
    if (chatPage) chatPage.classList.add('hidden-page');
    const mainPage = document.getElementById('main-content');
    if (mainPage) mainPage.classList.remove('hidden-page');
}

function toggleChatSidebar() {
    const sidebar = document.getElementById('chat-sidebar');
    if (sidebar) sidebar.classList.toggle('open');
}

function resetChatSession() {
    const messagesContainer = document.getElementById('chat-messages');
    const welcomeScreen = document.getElementById('chat-welcome');
    if (!messagesContainer) return;

    Array.from(messagesContainer.children).forEach(node => {
        if (node.id !== 'chat-welcome') {
            node.remove();
        }
    });

    if (welcomeScreen) {
        welcomeScreen.style.display = 'block';
    }
}

function handleChatKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleChatSubmit(event);
    }
}

function kirimPertanyaanSaran(pertanyaan) {
    const input = document.getElementById('chat-user-input');
    if (!input) return;
    input.value = pertanyaan;
    handleChatSubmit(new Event('submit'));
}

function sanitizeHTML(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function handleChatSubmit(event) {
    if (event) event.preventDefault();

    const inputEl = document.getElementById('chat-user-input');
    const messagesContainer = document.getElementById('chat-messages');
    const welcomeScreen = document.getElementById('chat-welcome');
    if (!inputEl || !messagesContainer) return;

    const userText = inputEl.value.trim();
    if (!userText) return;

    if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
    }

    renderChatBubble('user', userText, false, []);
    inputEl.value = '';
    inputEl.style.height = 'auto';

    const typingId = 'typing-' + Date.now();
    const typingRow = document.createElement('div');
    typingRow.id = typingId;
    typingRow.className = 'chat-row ai-row';
    typingRow.innerHTML = `
        <div class="chat-avatar">
            <img src="${HASSAN_ALBANNA_AVATAR}" alt="Hassan Al-Banna" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/1/1b/Muslim_Brotherhood_Emblem.svg'">
        </div>
        <div class="chat-bubble">
            <div class="bubble-header"><span>☪ Imam Hassan Al-Banna AI</span></div>
            <div style="color:#94a3b8; font-style:italic;">Sedang merangkai hikmah dan jawaban...</div>
        </div>
    `;
    messagesContainer.appendChild(typingRow);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();

        const responseObj = getHassanAlBannaReply(userText);
        renderChatBubble('ai', responseObj.reply, responseObj.isRestricted, responseObj.suggestions || []);
    }, 550);
}

function renderChatBubble(sender, content, isRestricted, suggestions) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const row = document.createElement('div');
    row.className = `chat-row ${sender === 'user' ? 'user-row' : 'ai-row'} ${isRestricted ? 'restricted-row' : ''}`;

    if (sender === 'user') {
        row.innerHTML = `<div class="chat-bubble">${sanitizeHTML(content)}</div>`;
    } else {
        let suggestionsHTML = '';
        if (suggestions && suggestions.length > 0) {
            const buttons = suggestions
                .map(q => `<button type="button" class="ai-chip-btn" onclick="kirimPertanyaanSaran('${q.replace(/'/g, "\\'")}')">☪ ${q}</button>`)
                .join('');
            suggestionsHTML = `
                <div class="ai-followup-box">
                    <span class="ai-followup-label">Pertanyaan lanjutan yang disarankan:</span>
                    <div class="ai-followup-chips">${buttons}</div>
                </div>
            `;
        }

        row.innerHTML = `
            <div class="chat-avatar">
                <img src="${HASSAN_ALBANNA_AVATAR}" alt="Hassan Al-Banna" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/1/1b/Muslim_Brotherhood_Emblem.svg'">
            </div>
            <div class="chat-bubble">
                <div class="bubble-header">
                    <span>☪ Imam Hassan Al-Banna AI</span>
                </div>
                <div>${content}</div>
                ${suggestionsHTML}
            </div>
        `;
    }

    messagesContainer.appendChild(row);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getHassanAlBannaReply(rawInput) {
    const text = rawInput.toLowerCase();

    // 1. FILTER SYARIAT ISLAM
    const melanggarSyariat = SYARIAH_BLOCKED_KEYWORDS.some(keyword => text.includes(keyword));
    if (melanggarSyariat) {
        return {
            isRestricted: true,
            reply: `<strong>Astaghfirullahal 'Adzim.</strong><br><br>
            Wahai saudaraku, mohon maaf. Saya tidak dapat menjawab atau membantu permintaan yang mengarah pada perkara yang melanggar <strong>Syariat Islam</strong>, kemaksiatan, ataupun mudarat.<br><br>
            Ingatlah prinsip perjuangan kita: <em>"Al-Qur'an adalah undang-undang kami"</em>. Mari kita gunakan akal dan teknologi ini untuk kebaikan serta ridha Allah SWT.`,
            suggestions: [
                "Bagaimana cara menjaga hati dari maksiat?",
                "Jelaskan hakikat Akidah yang lurus (Salimul Aqidah)",
                "Apa saja karya di website Luqman Azkiya Athaillah?"
            ]
        };
    }

    // 2. INFORMASI ISI WEBSITE & PROFIL LUQMAN AZKIYA ATHAILLAH
    if (text.includes('website') || text.includes('web ini') || text.includes('luqman') || text.includes('portofolio') || text.includes('karya') || text.includes('fitur')) {
        return {
            isRestricted: false,
            reply: `Website <strong>PortofolioMuslim</strong> ini adalah karya digital milik <strong>Luqman Azkiya Athaillah</strong> (nama panggung: <em>Luqman Pasha</em>), seorang pelajar berprestasi di <strong>SMPIT As-Syifa Boarding School</strong> yang memadukan teknologi IT dengan prinsip Islam.<br><br>
            <strong>Prestasi Luqman di Website Ini:</strong><br>
            • Juara 8 Olimpiade PAI Nasional (OLPAIN) 2024.<br>
            • Juara 2 Lomba Literasi Internasional oleh Hayrat Foundation.<br>
            • Juara Ziyadah & Hafalan Terbanyak Takhosus dua semester berturut-turut.<br>
            • Pengurus Angkatan 29 SOUL SD Salman Al Farisi Bandung & Staff Komunitas Literasi Sekolah (KLS) As-Syifa.<br><br>
            <strong>5 Fitur Karya Utama di Website Ini:</strong><br>
            1. <strong>Kalkulator Digital Islami</strong> — Perhitungan matematika cepat.<br>
            2. <strong>Suara Islami (Kompilasi Artikel)</strong> — Tulisan seputar pemikiran Islam & Ikhwanul Muslimin.<br>
            3. <strong>LuqmanGames</strong> — Game Puzzle Logo Gerakan Islam & World MapChart Builder poligon negara asli.<br>
            4. <strong>Pengecek Arah Kiblat Real-Time</strong> — Kompas GPS menuju Ka'bah.<br>
            5. <strong>Asisten AI Islami (Al-Banna AI)</strong> — Chatbot edukasi berlandaskan syariat.`,
            suggestions: [
                "Ceritakan sirah dakwah Rasulullah di Makkah dan Madinah",
                "Apa saja cabang utama dalam Akidah Islamiyah?",
                "Jelaskan makna 5 Pasal Perjuangan Ikhwanul Muslimin!"
            ]
        };
    }

    // 3. SIRAH NABAWIYAH & SEJARAH ISLAM
    if (text.includes('sirah') || text.includes('rasulullah') || text.includes('nabi') || text.includes('hijrah') || text.includes('sahabat') || text.includes('badar') || text.includes('darul arqam')) {
        return {
            isRestricted: false,
            reply: `Mempelajari <strong>Sirah Nabawiyah</strong> bukan sekadar membaca sejarah masa lalu, melainkan mengambil manhaj (metode) perjuangan untuk masa kini.<br><br>
            <strong>Fase Utama Sirah Rasulullah SAW:</strong><br>
            1. <strong>Fase Makkah (13 Tahun — Pembinaan Akidah):</strong> Rasulullah SAW menanamkan tauhid yang kokoh di Darul Arqam, menempa mental para sahabat seperti Abu Bakar, Umar, Utsman, Ali, Bilal, dan Mush'ab bin Umair menghadapi boikot dan siksaan Quraisy.<br>
            2. <strong>Hijrah ke Madinah (Membangun Masyarakat):</strong> Nabi mempersaudarakan kaum Muhajirin dan Anshar, membangun Masjid Nabawi sebagai pusat peradaban, dan menyusun Piagam Madinah.<br>
            3. <strong>Perjuangan & Fathu Makkah:</strong> Kemenangan di Perang Badar dengan 313 pasukan mukmin yang ikhlas membuktikan bahwa kemenangan datang dari pertolongan Allah dan kesatuan hati umat.`,
            suggestions: [
                "Apa pelajaran utama dari kisah Hijrah Nabi ke Madinah?",
                "Bagaimana strategi tarbiyah Rasulullah di Darul Arqam?",
                "Jelaskan hubungan Sirah dengan Akidah seorang Muslim"
            ]
        };
    }

    // 4. AKIDAH ISLAMIYAH & TAUHID
    if (text.includes('akidah') || text.includes('aqidah') || text.includes('tauhid') || text.includes('iman') || text.includes('salimul aqidah')) {
        return {
            isRestricted: false,
            reply: `Dalam risalah <em>Al-'Aqa'id</em>, saya selalu menekankan bahwa <strong>Akidah yang lurus (Salimul Aqidah)</strong> adalah fondasi utama seluruh amal. Tanpa akidah yang benar, amal sebesar gunung pun tidak bernilai di sisi Allah.<br><br>
            <strong>Pilar Utama Akidah Islamiyah:</strong><br>
            1. <strong>Tauhid Rububiyah:</strong> Meyakini hanya Allah satu-satunya Pencipta, Pemilik, dan Pengatur alam semesta.<br>
            2. <strong>Tauhid Uluhiyah:</strong> Memurnikan seluruh bentuk ibadah, doa, tawakal, dan ketaatan hanya kepada Allah SWT semata.<br>
            3. <strong>Tauhid Asma wa Sifat:</strong> Mengimani nama-nama dan sifat-sifat Allah yang mulia sesuai Al-Qur'an dan As-Sunnah tanpa menyerupakan-Nya dengan makhluk.<br>
            4. <strong>Rukun Iman yang Enam:</strong> Iman kepada Allah, Malaikat, Kitab-kitab-Nya, Rasul-rasul-Nya, Hari Akhir, serta Qadha dan Qadar.`,
            suggestions: [
                "Apa saja pembatal keislaman dan syirik yang harus dihindari?",
                "Bagaimana cara memperkuat iman di era fitnah digital?",
                "Apa saja 10 Muwashafat (karakter) Muslim ideal dalam Tarbiyah?"
            ]
        };
    }

    // 5. 5 PASAL PERJUANGAN
    if (text.includes('5 pasal') || text.includes('semboyan') || text.includes('motto')) {
        return {
            isRestricted: false,
            reply: `Assalamualaikum warahmatullah, saudaraku. Lima Pasal Perjuangan (<em>Al-Ghayah wal Wasilah</em>) adalah kompas hidup bagi setiap Muslim yang berjuang di jalan dakwah:<br><br>
1. <strong>Allahu Ghayatuna</strong> (Allah adalah tujuan kami) — Segala ikhtiar kita semata-mata mengharap ridha-Nya.<br>
2. <strong>Ar-Rasulu Qudwatuna</strong> (Rasulullah adalah teladan kami) — Menjadikan akhlak dan sunnah Nabi SAW sebagai panutan utama.<br>
3. <strong>Al-Qur'anu Dusturuna</strong> (Al-Qur'an adalah undang-undang kami) — Menjadikan wahyu Ilahi sebagai pedoman dalam seluruh aspek kehidupan.<br>
4. <strong>Al-Jihadu Sabiluna</strong> (Jihad adalah jalan kami) — Bersungguh-sungguh mengerahkan tenaga, pikiran, dan harta demi kebenaran.<br>
5. <strong>Asy-Syahadatu Asma Amaniyyina</strong> (Mati syahid adalah cita-cita tertinggi kami) — Keikhlasan berkorban di jalan Allah.`,
            suggestions: [
                "Bagaimana penerapan 'Al-Qur'anu Dusturuna' bagi pelajar?",
                "Ceritakan Sirah perjuangan Rasulullah SAW",
                "Apa saja fitur karya di website PortofolioMuslim ini?"
            ]
        };
    }

    // 6. 10 MUWASHAFAT / TARBIYAH
    if (text.includes('10 muwashafat') || text.includes('karakter') || text.includes('tarbiyah') || text.includes('muslim ideal')) {
        return {
            isRestricted: false,
            reply: `Dalam manhaj <strong>Tarbiyah Islamiyah</strong>, kebangkitan peradaban dimulai dari perbaikan pribadi (<em>Ishlahun Nafs</em>). Sepuluh karakter Muslim ideal yang harus kita tempa adalah:<br><br>
1. <strong>Salimul Aqidah</strong> (Akidah yang bersih dan lurus)<br>
2. <strong>Shahihul Ibadah</strong> (Ibadah yang benar sesuai sunnah)<br>
3. <strong>Matinul Khuluq</strong> (Akhlak yang kokoh dan mulia)<br>
4. <strong>Qadirun 'alal Kasbi</strong> (Mampu bekerja dan mandiri secara ekonomi)<br>
5. <strong>Mutsaqqaful Fikri</strong> (Berwawasan luas dan cerdas)<br>
6. <strong>Qawiyyul Jismi</strong> (Jasmani yang sehat dan kuat)<br>
7. <strong>Mujahidun linafsihi</strong> (Bersungguh-sungguh mengendalikan hawa nafsu)<br>
8. <strong>Munazhzhamun fi Syu'unihi</strong> (Teratur dan disiplin dalam segala urusannya)<br>
9. <strong>Harishun 'ala Waqtihi</strong> (Sangat menghargai dan menjaga waktunya)<br>
10. <strong>Nafi'un lighairihi</strong> (Bermanfaat bagi sesama dan umat).`,
            suggestions: [
                "Jelaskan secara mendalam tentang Salimul Aqidah!",
                "Bagaimana cara menjadi Mutsaqqaful Fikri di bidang IT?",
                "Ceritakan sejarah berdirinya gerakan di Ismailiyah 1928"
            ]
        };
    }

    // 7. SEJARAH ISMAILIYAH 1928
    if (text.includes('ismailiyah') || text.includes('1928') || text.includes('sejarah')) {
        return {
            isRestricted: false,
            reply: `Pada bulan Dzulqa'dah 1347 H bertepatan dengan <strong>Maret 1928 M</strong> di kota Ismailiyah, Mesir, enam orang pekerja datang dengan hati yang tulus dan gelisah melihat kondisi umat Islam pasca keruntuhan Khilafah.<br><br>
            Kami berbaiat untuk bekerja dan berdakwah demi kejayaan Islam, membangun masjid, madrasah, serta menanamkan kesadaran bahwa Islam adalah sistem hidup yang menyeluruh (<em>Al-Islam Dinun wa Daulatun</em>).`,
            suggestions: [
                "Apa isi utama dari 5 Pasal Perjuangan?",
                "Bagaimana Sirah Nabi menginspirasi kebangkitan umat?",
                "Siapa pembuat website portofolio ini?"
            ]
        };
    }

    // 8. PEMUDA, HAFALAN QURAN & NASIHAT
    if (text.includes('pemuda') || text.includes('digital') || text.includes('istiqamah')) {
        return {
            isRestricted: false,
            reply: `Wahai pemuda Islam! Ketahuilah bahwa dalam setiap kebangkitan umat, <strong>pemuda adalah rahasia kekuatannya</strong>, dan dalam setiap fikrah, pemuda adalah pengibar panjinya.<br><br>
            Di era digital saat ini, jadilah generasi yang unggul dalam teknologi dan literasi—seperti ikhtiar saudara <strong>Luqman Azkiya Athaillah</strong>—namun hatinya tetap terpaut pada masjid dan Al-Qur'an.`,
            suggestions: [
                "Tips menghafal Al-Qur'an dengan konsisten",
                "Siapa saja pemuda teladan dalam Sirah Nabawiyah?",
                "Apa saja karya digital yang ada di website ini?"
            ]
        };
    }

    if (text.includes('hafal') || text.includes('quran') || text.includes("qur'an")) {
        return {
            isRestricted: false,
            reply: `Al-Qur'an adalah cahaya hati dan sumber kekuatan jiwa seorang mukmin. Untuk menjaga hafalan dan ziyadah Al-Qur'an:<br><br>
- Perbarui niat setiap hari agar Allah memakaikan mahkota cahaya kepada kedua orang tua kita di akhirat.<br>
- Manfaatkan waktu fajar dan setelah subuh ketika pikiran masih jernih.<br>
- Jauhi maksiat mata dan telinga, karena ilmu Allah adalah cahaya yang tidak diberikan kepada pelaku maksiat.`,
            suggestions: [
                "Jelaskan pilar utama Akidah Islamiyah",
                "Ceritakan Sirah Nabawiyah fase Makkah",
                "Berikan nasihat penguat iman hari ini"
            ]
        };
    }

    if (text.includes('nasihat') || text.includes('motivasi') || text.includes('dinun wa daulatun') || text.includes('peradaban')) {
        return {
            isRestricted: false,
            reply: `Saudaraku tercinta, renungkanlah kalimat ini:<br><br>
            <em>"Tegakkanlah daulah Islam di dalam hatimu, niscaya ia akan tegak di atas bumimu."</em><br><br>
            Islam adalah agama yang paripurna (<em>Al-Islam Dinun wa Daulatun</em>)—mengatur ibadah, akidah, akhlak, pendidikan, serta kemajuan teknologi demi kemaslahatan umat.`,
            suggestions: [
                "Apa saja 10 karakter Muslim ideal dalam Tarbiyah?",
                "Jelaskan Sirah Hijrah Rasulullah ke Madinah",
                "Apa saja fitur yang tersedia di website ini?"
            ]
        };
    }

    // 9. JAWABAN DEFAULT DENGAN SUGGESTED QUESTIONS (SIRAH, AKIDAH, ISI WEB)
    return {
        isRestricted: false,
        reply: `Assalamualaikum warahmatullahi wabarakatuh, wahai saudaraku.<br><br>
        Terima kasih atas pertanyaanmu mengenai <em>"${sanitizeHTML(rawInput)}"</em>. Dalam pandangan Islam yang menyeluruh, setiap langkah, ilmu, dan karya yang kita bangun haruslah berlandaskan <strong>Akidah yang lurus</strong>, meneladani <strong>Sirah Rasulullah SAW</strong>, dan membawa manfaat bagi umat.<br><br>
        Silakan pilih salah satu topik di bawah ini atau ajukan pertanyaan spesifik seputar Sirah, Akidah, maupun isi website portofolio ini:`,
        suggestions: [
            "Ceritakan ringkasan Sirah Nabawiyah & perjuangan Rasulullah",
            "Jelaskan pilar utama Akidah Islamiyah (Tauhid)",
            "Apa saja fitur dan profil pembuat website ini?"
        ]
    };
}
