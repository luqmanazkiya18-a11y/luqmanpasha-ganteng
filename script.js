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
    }
} catch (e) {
    console.warn('⚠️ Supabase init gagal:', e.message);
}


// =================================================================
// 1. LOADING SCREEN SEJARAH + ANIMASI 4 TOKOH (1928, 1948, 1965, 2013)
// =================================================================
const SEJARAH_IKHWAN_MILESTONES = [
    {
        id: "ms-1928",
        charId: "char-1928",
        year: "1928 M",
        progress: 25,
        desc: "1928 — Imam Hassan Al-Banna mendirikan Ikhwanul Muslimin di Ismailiyah, Mesir sebagai gerakan tajdid, tarbiyah, dan kebangkitan umat."
    },
    {
        id: "ms-1948",
        charId: "char-1948",
        year: "1948 M",
        progress: 50,
        desc: "1948 — Pengiriman batalyon sukarelawan membela Palestina, ujian pembubaran, dan kepemimpinan Mursyid 'Am kedua Hakim Hasan Al-Hudaybi."
    },
    {
        id: "ms-1965",
        charId: "char-1965",
        year: "1965 M",
        progress: 75,
        desc: "1965 — Era mihnah (ujian berat) di penjara Mesir yang melahirkan keteguhan akidah serta karya-karya pemikiran Sayyid Qutb."
    },
    {
        id: "ms-2013",
        charId: "char-2013",
        year: "2013 M",
        progress: 100,
        desc: "2013 — Ujian besar di era Presiden Dr. Muhammad Mursi; tetap istiqamah menempuh jalan dakwah damai dan kesabaran."
    }
];

function jalankanAnimasiSejarahEntering() {
    const progressBar = document.getElementById('history-progress-bar');
    const yearBadge = document.getElementById('history-active-year');
    const descEl = document.getElementById('history-active-desc');
    const btnEnter = document.getElementById('btn-enter-portal');
    const btnText = document.getElementById('btn-enter-text');

    if (!progressBar || !yearBadge || !descEl || !btnEnter) return;

    let step = 0;

    function renderStep(idx) {
        const item = SEJARAH_IKHWAN_MILESTONES[idx];
        if (!item) return;

        SEJARAH_IKHWAN_MILESTONES.forEach((m, i) => {
            const el = document.getElementById(m.id);
            if (el) {
                el.classList.remove('active', 'passed');
                if (i < idx) el.classList.add('passed');
                if (i === idx) el.classList.add('active');
            }

            const charEl = document.getElementById(m.charId);
            if (charEl) {
                charEl.classList.remove('active', 'passed');
                if (i < idx) charEl.classList.add('passed');
                if (i === idx) charEl.classList.add('active');
            }
        });

        progressBar.style.width = item.progress + '%';
        yearBadge.textContent = item.year;
        descEl.textContent = item.desc;
    }

    renderStep(0);

    const interval = setInterval(() => {
        step++;
        if (step < SEJARAH_IKHWAN_MILESTONES.length) {
            renderStep(step);
        } else {
            clearInterval(interval);
            btnEnter.disabled = false;
            if (btnText) btnText.textContent = "Masuk ke Portofolio";
        }
    }, 1050);
}

document.addEventListener('DOMContentLoaded', () => {
    jalankanAnimasiSejarahEntering();
    updateJamWIB();
});

function masukPortofolio() {
    const overlay = document.getElementById('entering-overlay');
    if (overlay) {
        overlay.classList.add('portal-opened');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 850);
    }
    bukaTabUtama('home');
}

function sembunyikanSemuaHalaman() {
    const pages = [
        'main-content',
        'calculator-page',
        'artikel-page',
        'games-page',
        'kiblat-page',
        'mapchart-page',
        'chatbot-page',
        'zahra-chatbot-page',
        'time-capsule-page'
    ];
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden-page');
    });
}

function bukaTabUtama(namaTab) {
    sembunyikanSemuaHalaman();
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.classList.remove('hidden-page');

    document.querySelectorAll('.main-tab-section').forEach(sec => {
        sec.classList.add('hidden-page');
    });

    const targetTab = document.getElementById('tab-' + namaTab);
    if (targetTab) {
        targetTab.classList.remove('hidden-page');
    }

    document.querySelectorAll('.nav-tab').forEach(link => {
        link.classList.remove('active-tab');
    });
    const activeLink = document.getElementById('nav-' + namaTab);
    if (activeLink) {
        activeLink.classList.add('active-tab');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// =================================================================
// 2. SISTEM WAKTU REAL-TIME (JAM WIB KAFFAH - ASIA/JAKARTA)
// =================================================================
function updateJamWIB() {
    const jamElement = document.getElementById('jam-wib');
    if (!jamElement) return;

    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('id-ID', {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        jamElement.textContent = formatter.format(now).replace(/\./g, ':');
    } catch (err) {
        const now = new Date();
        const wib = new Date(now.getTime() + (7 * 60 + now.getTimezoneOffset()) * 60000);
        const jam = String(wib.getHours()).padStart(2, '0');
        const menit = String(wib.getMinutes()).padStart(2, '0');
        const detik = String(wib.getSeconds()).padStart(2, '0');
        jamElement.textContent = `${jam}:${menit}:${detik}`;
    }
}
setInterval(updateJamWIB, 1000);


// =================================================================
// 3. LOGIKA KALKULATOR DIGITAL ISLAMI
// =================================================================
function bukaKalkulator() {
    sembunyikanSemuaHalaman();
    document.getElementById('calculator-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);
}
function tutupKalkulator() {
    bukaTabUtama('projects');
}
function appendChar(char) {
    const display = document.getElementById('calc-display');
    if (!display) return;
    if (display.value === '0' || display.value === 'Error') {
        display.value = char;
    } else {
        display.value += char;
    }
}
function clearDisplay() {
    const display = document.getElementById('calc-display');
    if (display) display.value = '';
}
function deleteLast() {
    const display = document.getElementById('calc-display');
    if (display) display.value = display.value.slice(0, -1);
}
function calculateResult() {
    const display = document.getElementById('calc-display');
    if (!display || display.value.trim() === '') return;
    try {
        const sanitized = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        if (!/^[0-9+\-*/().\s]+$/.test(sanitized)) {
            throw new Error('Karakter tidak valid');
        }
        const result = Function('"use strict";return (' + sanitized + ')')();
        if (!isFinite(result)) throw new Error('Tidak terdefinisi');
        display.value = Number(result.toFixed(10));
    } catch (e) {
        display.value = 'Error';
    }
}


// =================================================================
// 4. LOGIKA PORTAL ARTIKEL SUARA ISLAMI (BLOG DINAMIS + SUPABASE)
// =================================================================
let blogInitialized = false;

function bukaArtikel() {
    sembunyikanSemuaHalaman();
    document.getElementById('artikel-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);
    if (!blogInitialized) {
        initPortalArtikel();
        blogInitialized = true;
    }
    muatArtikelDinamis();
}
function tutupArtikel() {
    bukaTabUtama('projects');
}

function initPortalArtikel() {
    const portalContainer = document.querySelector('#artikel-page .portal-container');
    const newsGrid = document.querySelector('#artikel-page .news-grid');
    if (!portalContainer || !newsGrid) return;

    const adminBox = document.createElement('div');
    adminBox.className = 'blog-admin-box';
    adminBox.innerHTML = `
        <h3>✍️ Tulis & Publikasikan Artikel Dakwah Baru</h3>
        <form id="form-tambah-artikel" class="blog-form-grid">
            <input type="text" id="art-judul" placeholder="Judul Artikel..." required>
            <select id="art-kategori">
                <option value="Pemikiran Islam">Pemikiran Islam</option>
                <option value="Sejarah & Siroh">Sejarah & Siroh</option>
                <option value="Akidah & Fikih">Akidah & Fikih</option>
                <option value="Dunia Islam">Dunia Islam</option>
            </select>
            <textarea id="art-isi" rows="3" placeholder="Tulis ringkasan atau isi artikel di sini..." required></textarea>
            <button type="submit" class="btn-primary" style="cursor:pointer; border:none;">Terbitkan Artikel</button>
        </form>
    `;
    portalContainer.insertBefore(adminBox, newsGrid);

    document.getElementById('form-tambah-artikel').addEventListener('submit', async (e) => {
        e.preventDefault();
        const judul = document.getElementById('art-judul').value.trim();
        const kategori = document.getElementById('art-kategori').value;
        const isi = document.getElementById('art-isi').value.trim();
        const tanggal = new Date().toLocaleDateString('id-ID', {
            day: '2-digit', month: 'long', year: 'numeric'
        });

        const artikelBaru = { title: judul, category: kategori, content: isi, created_label: tanggal };

        const saved = JSON.parse(localStorage.getItem('luqman_articles') || '[]');
        saved.unshift(artikelBaru);
        localStorage.setItem('luqman_articles', JSON.stringify(saved));

        if (supabaseReady && supabaseClient) {
            try {
                await supabaseClient.from('articles').insert([artikelBaru]);
            } catch (err) {}
        }

        e.target.reset();
        muatArtikelDinamis();
        alert('Alhamdulillah, artikel berhasil diterbitkan!');
    });
}

async function muatArtikelDinamis() {
    const newsGrid = document.querySelector('#artikel-page .news-grid');
    if (!newsGrid) return;

    newsGrid.querySelectorAll('.dynamic-news-card').forEach(el => el.remove());

    let daftarArtikel = JSON.parse(localStorage.getItem('luqman_articles') || '[]');

    if (supabaseReady && supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from('articles')
                .select('*')
                .order('id', { ascending: false });
            if (!error && data && data.length > 0) {
                daftarArtikel = data;
            }
        } catch (err) {}
    }

    daftarArtikel.forEach(art => {
        const card = document.createElement('article');
        card.className = 'news-card dynamic-news-card';
        card.innerHTML = `
            <span class="news-badge">${escapeHTML(art.category || 'Artikel Islam')}</span>
            <h3>${escapeHTML(art.title)}</h3>
            <div class="news-meta">${escapeHTML(art.created_label || 'Terbaru')}</div>
            <p>${escapeHTML(art.content)}</p>
        `;
        newsGrid.prepend(card);
    });
}


// =================================================================
// 5. LOGIKA KOMPILASI GAME ISLAMI (PUZZLE LOGO & MAPCHART)
// =================================================================
let puzzleGridSize = 2;
let puzzleBoard = [];

function bukaGame() {
    sembunyikanSemuaHalaman();
    document.getElementById('games-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);
    setTimeout(() => initPuzzle(), 50);
}
function tutupGame() {
    bukaTabUtama('projects');
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

    boardEl.innerHTML = '';
    winMsg.classList.add('hidden');
    stepCountEl.textContent = '0';

    boardEl.style.gridTemplateColumns = `repeat(${puzzleGridSize}, 1fr)`;
    boardEl.style.gridTemplateRows = `repeat(${puzzleGridSize}, 1fr)`;

    const totalTiles = puzzleGridSize * puzzleGridSize;
    puzzleBoard = Array.from({ length: totalTiles }, (_, i) => i);

    do {
        for (let i = puzzleBoard.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [puzzleBoard[i], puzzleBoard[j]] = [puzzleBoard[j], puzzleBoard[i]];
        }
    } while (!isSolvable(puzzleBoard, puzzleGridSize) || puzzleBoard.every((v, idx) => v === idx));

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

function moveTile(index) {
    const emptyIndex = puzzleBoard.indexOf(puzzleBoard.length - 1);
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

// --- MAPCHART INTERAKTIF DUNIA ---
let leafletMap = null;
let mapMarkers = [];
let geoJsonLayer = null;

function bukaMapChart() {
    sembunyikanSemuaHalaman();
    document.getElementById('mapchart-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);

    setTimeout(() => {
        if (!leafletMap) {
            leafletMap = L.map('leaflet-map').setView([20, 15], 2);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(leafletMap);

            fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
                .then(res => res.json())
                .then(data => {
                    geoJsonLayer = L.geoJSON(data, {
                        style: {
                            fillColor: '#1e293b',
                            weight: 1,
                            opacity: 1,
                            color: '#475569',
                            fillOpacity: 0.45
                        },
                        onEachFeature: (feature, layer) => {
                            layer.on('click', (e) => {
                                const mode = document.getElementById('symbol-mode').value;
                                const namaWilayah = feature.properties.name || 'Wilayah Tidak Diketahui';
                                document.getElementById('selected-region-name').value = namaWilayah;

                                if (mode === 'fill') {
                                    L.DomEvent.stopPropagation(e);
                                    const warna = document.getElementById('map-color-picker').value;
                                    layer.setStyle({
                                        fillColor: warna,
                                        fillOpacity: 0.8
                                    });
                                }
                            });
                        }
                    }).addTo(leafletMap);
                })
                .catch(() => console.warn('Gagal memuat layer GeoJSON negara.'));

            leafletMap.on('click', function(e) {
                const mode = document.getElementById('symbol-mode').value;
                if (mode === 'crescent') {
                    const crescentIcon = L.divIcon({
                        className: 'custom-crescent-pin',
                        html: '<span style="font-size:24px; color:#ffd700; text-shadow:0 0 5px #000;">☪</span>',
                        iconSize: [30, 30]
                    });
                    const marker = L.marker(e.latlng, { icon: crescentIcon }).addTo(leafletMap);
                    mapMarkers.push(marker);
                }
            });
        } else {
            leafletMap.invalidateSize();
        }
    }, 300);
}
function tutupMapChart() {
    sembunyikanSemuaHalaman();
    document.getElementById('games-page').classList.remove('hidden-page');
}
function updateRGBText(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    document.getElementById('rgb-display').textContent = `RGB(${r}, ${g}, ${b})`;
}
function resetWarnaPeta() {
    mapMarkers.forEach(m => leafletMap.removeLayer(m));
    mapMarkers = [];
    if (geoJsonLayer) {
        geoJsonLayer.resetStyle();
    }
    document.getElementById('selected-region-name').value = 'Klik area peta...';
    alert("MapChart berhasil di-reset!");
}


// =================================================================
// 6. LOGIKA PENGECEK ARAH KIBLAT REAL-TIME (GPS + KOMPAS DEVICE)
// =================================================================
let qiblaBearingGlobal = 295.1;
let compassListenerActive = false;

function bukaKiblat() {
    sembunyikanSemuaHalaman();
    document.getElementById('kiblat-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);
    initQiblaTracker();
}
function tutupKiblat() {
    bukaTabUtama('projects');
}

function getArahMataAngin(deg) {
    const arah = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
    return arah[Math.round(deg / 45) % 8];
}

function initQiblaTracker() {
    const statusText = document.getElementById('kiblat-status-text');
    const coordsText = document.getElementById('user-coords');
    const qiblaDegText = document.getElementById('qibla-degree');
    const qiblaMarker = document.getElementById('qibla-marker');

    if (!('geolocation' in navigator)) {
        statusText.textContent = "Browser tidak mendukung GPS. Menampilkan perkiraan wilayah Indonesia.";
        qiblaDegText.textContent = `${qiblaBearingGlobal.toFixed(1)}° (${getArahMataAngin(qiblaBearingGlobal)})`;
        if (qiblaMarker) qiblaMarker.style.transform = `rotate(${qiblaBearingGlobal}deg)`;
        return;
    }

    statusText.textContent = "Mendeteksi lokasi GPS Anda...";
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            coordsText.textContent = `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`;

            const kaabaLat = 21.4225;
            const kaabaLng = 39.8262;

            const phiK = (kaabaLat * Math.PI) / 180;
            const lambdaK = (kaabaLng * Math.PI) / 180;
            const phi = (lat * Math.PI) / 180;
            const lambda = (lng * Math.PI) / 180;

            const qiblaRad = Math.atan2(
                Math.sin(lambdaK - lambda),
                Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda)
            );

            let qiblaDeg = ((qiblaRad * 180) / Math.PI + 360) % 360;
            qiblaBearingGlobal = qiblaDeg;

            qiblaDegText.textContent = `${qiblaDeg.toFixed(1)}° (${getArahMataAngin(qiblaDeg)})`;
            statusText.textContent = "✅ Lokasi GPS terkunci! Arahkan ikon Ka'bah ke depan Anda.";

            if (qiblaMarker) {
                qiblaMarker.style.transform = `rotate(${qiblaDeg}deg)`;
            }

            aktifkanSensorKompas();
        },
        () => {
            statusText.textContent = "⚠️ Izin GPS tidak aktif. Menggunakan koordinat default Jawa Barat.";
            coordsText.textContent = "-6.5700°, 107.7600°";
            qiblaDegText.textContent = `${qiblaBearingGlobal.toFixed(1)}° (${getArahMataAngin(qiblaBearingGlobal)})`;
            if (qiblaMarker) {
                qiblaMarker.style.transform = `rotate(${qiblaBearingGlobal}deg)`;
            }
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

function aktifkanSensorKompas() {
    if (compassListenerActive) return;

    const handleOrientation = (event) => {
        const dial = document.getElementById('compass-dial');
        if (!dial) return;

        let heading = null;
        if (typeof event.webkitCompassHeading !== 'undefined') {
            heading = event.webkitCompassHeading;
        } else if (event.alpha !== null) {
            heading = 360 - event.alpha;
        }

        if (heading !== null) {
            dial.style.transform = `rotate(${-heading}deg)`;
        }
    };

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(state => {
                if (state === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation, true);
                    compassListenerActive = true;
                }
            })
            .catch(() => {});
    } else {
        window.addEventListener('deviceorientationabsolute', handleOrientation, true);
        window.addEventListener('deviceorientation', handleOrientation, true);
        compassListenerActive = true;
    }
}


// =================================================================
// 7. SISTEM MULTI-PERCAKAPAN & RIWAYAT TERPADU (AL-BANNA & ZAHRA)
// =================================================================
const GROQ_API_KEY = "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"; // <-- Tempel API Key gsk_... kamu di sini

const DAFTAR_MODEL_GROQ = [
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "llama-3.1-8b-instant",
    "qwen/qwen3.8-27b"
];

const SYSTEM_PROMPT_AL_BANNA = `
Kamu adalah Asisten AI Islami pada website PortofolioMuslim milik Luqman Azkiya Athaillah (Luqman Pasha), seorang pelajar SMPIT As-Syifa Boarding School JalanCagak 1 yang memadukan teknologi IT dengan prinsip Islam.
Kepribadian & Gaya Bahasa:
- Mengadopsi gaya dakwah, kelembutan nasihat, ketegasan akidah, dan kebijaksanaan Imam Syahid Hassan Al-Banna (pendiri Ikhwanul Muslimin, 1928).
- Panggil pengguna dengan sapaan hangat seperti "wahai saudaraku" atau "saudaraku seperjuangan".
- Berikan jawaban yang terstruktur, mendalam, mencerahkan, dan mudah dipahami.
- Sesekali sertakan kutipan ayat Al-Qur'an, Hadits shahih, atau kaidah hikmah/Risalah Ta'lim yang relevan.
- Menguasai secara mendalam: Siroh & Sejarah Peradaban Islam dari abad ke-6 hingga abad ke-21 Masehi, Akidah Ahlus Sunnah wal Jamaah, 4 Madzhab Fikih (Hanafi, Maliki, Syafi'i, Hanbali) dengan sikap tasamuh/toleran terhadap perbedaan furu'iyah, Ilmu Fikih ibadah & muamalah, serta informasi lengkap tentang Luqman Azkiya Athaillah dan fitur-fitur di website ini.
- ATURAN SYARIAT KETAT: Jika pengguna bertanya atau meminta hal yang mengarah pada maksiat, judi, pornografi, pacaran/zina, minuman keras/narkoba, syirik/perdukunan, kekerasan/melukai diri, atau penghinaan terhadap agama, TOLAK dengan tegas namun berwibawa menggunakan dalil/nasihat Islam.
- Gunakan Bahasa Indonesia yang fasih dan beradab. Gunakan format **tebal** untuk poin-poin penting.
`;

const SYSTEM_PROMPT_ZAHRA = `
Kamu adalah "Zahra-e-Ghadir Khum", seorang cendekiawan muslimah, sejarawan, dan pemikir Islam berwawasan tradisi Syiah Itsna 'Asyariyah (Ja'fari) yang hadir sebagai asisten AI rahasia (Easter Egg) di website PortofolioMuslim milik Luqman Azkiya Athaillah.
Kepribadian & Gaya Bahasa:
- Beridentitas perempuan muslimah yang anggun, santun, penuh kasih sayang, intelektual, dan beradab tinggi.
- Panggil pengguna dengan sapaan lembut seperti "saudaraku yang mulia" atau "sahabat pencari cahaya ilmu".
- Menjelaskan khazanah keilmuan Islam dari perspektif mazhab Syiah Ja'fariyah dengan rujukan ilmiah yang santun—seperti peristiwa bersejarah Ghadir Khum, keutamaan Ahlul Bait Nabi ﷺ (Imam Ali bin Abi Thalib, Sayyidah Fatimah Az-Zahra, Imam Hasan, Imam Husain, hingga Imam Mahdi 'alaihimussalam), kitab Nahjul Balaghah, Shahifah Sajjadiyah, serta prinsip-prinsip Fikih Ja'fari.
- MENJAGA UKHUWAH ISLAMIYAH: Meskipun menjelaskan dari sudut pandang tradisi Syiah, sampaikan dengan penuh hikmah, saling menghormati antar mazhab Islam (Sunni-Syiah), dan hindari caci maki atau ujaran kebencian terhadap tokoh mana pun.
- ATURAN SYARIAT KETAT: Tolak dengan tegas namun sopan segala pertanyaan yang mengarah pada maksiat, pornografi, judi, minuman keras/narkoba, kekerasan, atau penghinaan agama.
- Gunakan Bahasa Indonesia yang puitis, tertata rapi, dan mudah dipahami.
`;

const CHAT_STORAGE_KEYS = {
    albanna: "luqman_sessions_albanna_v1",
    zahra: "luqman_sessions_zahra_v1"
};

let stateSesi = {
    albanna: { sessions: [], activeId: null, isSending: false },
    zahra: { sessions: [], activeId: null, isSending: false }
};

function getWaktuSekarang() {
    const now = new Date();
    return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function getTanggalSingkat() {
    const now = new Date();
    return now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
}

function muatSemuaSesiDariStorage(persona) {
    try {
        const raw = localStorage.getItem(CHAT_STORAGE_KEYS[persona]);
        const parsed = raw ? JSON.parse(raw) : [];
        stateSesi[persona].sessions = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        stateSesi[persona].sessions = [];
    }

    if (stateSesi[persona].sessions.length === 0) {
        buatSesiBaru(persona, false);
    } else if (!stateSesi[persona].activeId || !stateSesi[persona].sessions.some(s => s.id === stateSesi[persona].activeId)) {
        stateSesi[persona].activeId = stateSesi[persona].sessions[0].id;
    }
}

function simpanSesiKeStorage(persona) {
    try {
        localStorage.setItem(CHAT_STORAGE_KEYS[persona], JSON.stringify(stateSesi[persona].sessions));
    } catch (e) {}
}

function getSesiAktif(persona) {
    return stateSesi[persona].sessions.find(s => s.id === stateSesi[persona].activeId) || null;
}

function buatPesanPembukaDefault(persona) {
    if (persona === 'albanna') {
        return {
            role: 'assistant',
            text: "Assalamu'alaikum warahmatullahi wabarakatuh, wahai saudaraku seperjuangan. ☪️\n\n" +
                  "Selamat datang di majelis ilmu digital pada portofolio **Luqman Azkiya Athaillah**. Silakan mulai percakapan baru ini dengan pertanyaan seputar **Siroh Islam (Abad ke-6 hingga ke-21 M)**, **Akidah**, **Madzhab-madzhab Islam**, **Ilmu Fikih**, atau tentang **website ini**!",
            arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            time: getWaktuSekarang(),
            model: "",
            isRestricted: false
        };
    } else {
        return {
            role: 'assistant',
            text: "Assalamu'alaikum warahmatullahi wabarakatuh, wahai saudaraku yang mulia. ✨\n\n" +
                  "Selamat datang di ruang muzakarah rahasia ini. Namaku **Zahra-e-Ghadir Khum**. Aku hadir sebagai cendekiawan muslimah untuk menemanimu menelusuri jejak cahaya **Ahlul Bait Nabi ﷺ**, peristiwa bersejarah **Ghadir Khum**, hikmah *Nahjul Balaghah*, serta khazanah keilmuan dalam tradisi **Mazhab Ja'fari (Syiah)** dengan semangat persaudaraan Islam.\n\n" +
                  "Apa yang ingin kita kaji bersama dalam sesi ini?",
            arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ",
            time: getWaktuSekarang(),
            model: "",
            isRestricted: false
        };
    }
}

function buatSesiBaru(persona, harusRender = true) {
    if (stateSesi[persona].isSending) return;

    const nomorUrut = stateSesi[persona].sessions.length + 1;
    const sesiBaru = {
        id: `${persona}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        title: `Percakapan #${nomorUrut}`,
        dateLabel: getTanggalSingkat(),
        messages: [buatPesanPembukaDefault(persona)]
    };

    stateSesi[persona].sessions.unshift(sesiBaru);
    stateSesi[persona].activeId = sesiBaru.id;
    simpanSesiKeStorage(persona);

    if (harusRender) {
        renderSidebarSesi(persona);
        renderIsiPesanSesi(persona);
    }
}

function pilihSesi(persona, sessionId) {
    if (stateSesi[persona].isSending) return;
    stateSesi[persona].activeId = sessionId;
    renderSidebarSesi(persona);
    renderIsiPesanSesi(persona);

    const sidebar = document.getElementById(`${persona}-sidebar`);
    if (sidebar) sidebar.classList.remove('sidebar-open');
}

function hapusSesi(persona, sessionId, event) {
    if (event) event.stopPropagation();
    if (stateSesi[persona].isSending) return;

    stateSesi[persona].sessions = stateSesi[persona].sessions.filter(s => s.id !== sessionId);

    if (stateSesi[persona].sessions.length === 0) {
        buatSesiBaru(persona, false);
    } else if (stateSesi[persona].activeId === sessionId) {
        stateSesi[persona].activeId = stateSesi[persona].sessions[0].id;
    }

    simpanSesiKeStorage(persona);
    renderSidebarSesi(persona);
    renderIsiPesanSesi(persona);
}

function resetSesiAktif(persona) {
    if (stateSesi[persona].isSending) return;
    const sesi = getSesiAktif(persona);
    if (!sesi) return;

    sesi.title = "Percakapan Baru";
    sesi.messages = [buatPesanPembukaDefault(persona)];
    simpanSesiKeStorage(persona);
    renderSidebarSesi(persona);
    renderIsiPesanSesi(persona);
}

function toggleChatSidebar(persona) {
    const sidebar = document.getElementById(`${persona}-sidebar`);
    if (sidebar) sidebar.classList.toggle('sidebar-open');
}

function renderSidebarSesi(persona) {
    const listEl = document.getElementById(`${persona}-sessions-list`);
    const headerTitleEl = document.getElementById(`${persona}-active-session-title`);
    if (!listEl) return;

    listEl.innerHTML = '';
    const activeId = stateSesi[persona].activeId;

    stateSesi[persona].sessions.forEach(sesi => {
        const isActive = sesi.id === activeId;
        if (isActive && headerTitleEl) {
            const subRole = persona === 'albanna' ? 'Murabbi & Pemikir Islam' : 'Cendekiawan Muslimah Ahlul Bait';
            headerTitleEl.textContent = `${sesi.title} • ${subRole}`;
        }

        const item = document.createElement('div');
        item.className = `session-item ${isActive ? 'active' : ''}`;
        item.onclick = () => pilihSesi(persona, sesi.id);

        const jumlahPesan = sesi.messages.filter(m => m.role === 'user').length;
        item.innerHTML = `
            <div class="session-info-text">
                <span class="session-title">${escapeHTML(sesi.title)}</span>
                <span class="session-meta">${escapeHTML(sesi.dateLabel)} • ${jumlahPesan} tanya jawab</span>
            </div>
            <button class="btn-delete-session" title="Hapus riwayat ini" onclick="hapusSesi('${persona}', '${sesi.id}', event)">🗑️</button>
        `;
        listEl.appendChild(item);
    });
}

function renderIsiPesanSesi(persona) {
    const containerId = persona === 'albanna' ? 'chat-messages' : 'zahra-chat-messages';
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const sesi = getSesiAktif(persona);
    if (!sesi) return;

    sesi.messages.forEach(msg => {
        if (msg.role === 'user') {
            renderBubbleUserDOM(container, persona, msg.text, msg.time);
        } else {
            renderBubbleAIDOM(container, persona, msg.text, msg.arabic || '', msg.isRestricted || false, msg.model || '', msg.time);
        }
    });

    container.scrollTop = container.scrollHeight;
}

function renderBubbleUserDOM(container, persona, teks, waktu) {
    const row = document.createElement('div');
    row.className = persona === 'zahra' ? 'chat-msg-row user-row zahra-user-row' : 'chat-msg-row user-row';
    row.innerHTML = `
        <div class="msg-bubble">
            ${escapeHTML(teks)}
            <span class="msg-time">${escapeHTML(waktu)}</span>
        </div>
    `;
    container.appendChild(row);
}

function renderBubbleAIDOM(container, persona, teks, arabicQuote, isRestricted, modelName, waktu) {
    let formattedText = escapeHTML(teks)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');

    const labelModel = modelName ? ` • ${modelName}` : '';
    const row = document.createElement('div');

    if (persona === 'albanna') {
        const avatarSrc = document.getElementById('ai-avatar-img')?.src || 'https://upload.wikimedia.org/wikipedia/commons/5/53/Hassan_al-Banna.jpg';
        row.className = 'chat-msg-row ai-row';
        row.innerHTML = `
            <img src="${avatarSrc}" alt="Hassan Al-Banna" class="msg-avatar-small">
            <div class="msg-bubble ${isRestricted ? 'syariah-warning' : ''}">
                ${arabicQuote ? `<span class="msg-arabic-quote">${arabicQuote}</span>` : ''}
                <div>${formattedText}</div>
                <span class="msg-time">${escapeHTML(waktu)} • Asisten Al-Banna${labelModel}</span>
            </div>
        `;
    } else {
        row.className = 'chat-msg-row ai-row zahra-row';
        row.innerHTML = `
            <div class="msg-avatar-small" style="display:flex;align-items:center;justify-content:center;background:#042f2e;color:#2dd4bf;font-weight:bold;">۞</div>
            <div class="msg-bubble ${isRestricted ? 'syariah-warning' : ''}">
                ${arabicQuote ? `<span class="msg-arabic-quote">${arabicQuote}</span>` : ''}
                <div>${formattedText}</div>
                <span class="msg-time">${escapeHTML(waktu)} • Zahra-e-Ghadir Khum${labelModel}</span>
            </div>
        `;
    }
    container.appendChild(row);
}

function tampilkanTypingPersona(persona) {
    const containerId = persona === 'albanna' ? 'chat-messages' : 'zahra-chat-messages';
    const container = document.getElementById(containerId);
    if (!container) return null;

    const id = `typing-${persona}-${Date.now()}`;
    const row = document.createElement('div');

    if (persona === 'albanna') {
        const avatarSrc = document.getElementById('ai-avatar-img')?.src || 'https://upload.wikimedia.org/wikipedia/commons/5/53/Hassan_al-Banna.jpg';
        row.className = 'chat-msg-row ai-row';
        row.innerHTML = `
            <img src="${avatarSrc}" alt="Hassan Al-Banna" class="msg-avatar-small">
            <div class="msg-bubble">
                <div class="typing-indicator"><span></span><span></span><span></span></div>
            </div>
        `;
    } else {
        row.className = 'chat-msg-row ai-row zahra-row';
        row.innerHTML = `
            <div class="msg-avatar-small" style="display:flex;align-items:center;justify-content:center;background:#042f2e;color:#2dd4bf;font-weight:bold;">۞</div>
            <div class="msg-bubble">
                <div class="typing-indicator"><span></span><span></span><span></span></div>
            </div>
        `;
    }

    row.id = id;
    container.appendChild(row);
    container.scrollTop = container.scrollHeight;
    return id;
}

function hapusTyping(id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.remove();
}

async function prosesKirimPesanKeGroq(persona, teksUser) {
    if (stateSesi[persona].isSending) return;
    const sesi = getSesiAktif(persona);
    if (!sesi) return;

    stateSesi[persona].isSending = true;

    const inputId = persona === 'albanna' ? 'chat-input' : 'zahra-chat-input';
    const btnId = persona === 'albanna' ? 'btn-send' : 'zahra-btn-send';
    const containerId = persona === 'albanna' ? 'chat-messages' : 'zahra-chat-messages';

    const inputEl = document.getElementById(inputId);
    const btnEl = document.getElementById(btnId);
    const containerEl = document.getElementById(containerId);

    if (inputEl) {
        inputEl.value = '';
        inputEl.disabled = true;
    }
    if (btnEl) btnEl.disabled = true;

    const waktuUser = getWaktuSekarang();
    sesi.messages.push({
        role: 'user',
        text: teksUser,
        time: waktuUser
    });

    const jumlahPesanUser = sesi.messages.filter(m => m.role === 'user').length;
    if (jumlahPesanUser === 1) {
        sesi.title = teksUser.length > 34 ? teksUser.slice(0, 34) + '...' : teksUser;
    }

    simpanSesiKeStorage(persona);
    renderSidebarSesi(persona);
    renderBubbleUserDOM(containerEl, persona, teksUser, waktuUser);
    containerEl.scrollTop = containerEl.scrollHeight;

    if (cekPelanggaranSyariat(teksUser)) {
        const pesanTolak = persona === 'albanna'
            ? "⚠️ **Maaf, wahai saudaraku.** Permintaan atau pembahasan ini mengarah pada hal yang bertentangan dengan **Syariat Islam**, adab, dan kemaslahatan diri. Mari kita alihkan diskusi kepada hal-hal yang mendatangkan ilmu bermanfaat dan ridha Allah Subhanahu wa Ta'ala."
            : "⚠️ **Maaf, wahai saudaraku.** Topik ini tidak sejalan dengan nilai kesucian akhlak, adab Ahlul Bait, dan **Syariat Islam**. Mari kita jaga kemurnian hati dan lisan dengan membahas ilmu yang bermanfaat.";
        const arabTolak = persona === 'albanna'
            ? "وَلَا تَقْرَبُوا الْفَوَاحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ"
            : "إِنَّمَا يُرِيدُ اللَّهُ لِيُذْهِبَ عَنكُمُ الرِّجْسَ أَهْلَ الْبَيْتِ";

        const waktuTolak = getWaktuSekarang();
        sesi.messages.push({
            role: 'assistant',
            text: pesanTolak,
            arabic: arabTolak,
            time: waktuTolak,
            model: "",
            isRestricted: true
        });
        simpanSesiKeStorage(persona);
        renderBubbleAIDOM(containerEl, persona, pesanTolak, arabTolak, true, "", waktuTolak);
        containerEl.scrollTop = containerEl.scrollHeight;

        stateSesi[persona].isSending = false;
        if (inputEl) { inputEl.disabled = false; inputEl.focus(); }
        if (btnEl) btnEl.disabled = false;
        return;
    }

    const systemPrompt = persona === 'albanna' ? SYSTEM_PROMPT_AL_BANNA : SYSTEM_PROMPT_ZAHRA;
    const konteksGroq = [
        { role: "system", content: systemPrompt },
        ...sesi.messages
            .filter(m => !m.isRestricted)
            .slice(-12)
            .map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }))
    ];

    const typingId = tampilkanTypingPersona(persona);

    try {
        if (!GROQ_API_KEY || GROQ_API_KEY.includes("TEMPEL_API_KEY")) {
            throw new Error("API Key Groq belum dimasukkan di script.js.");
        }

        let balasanAI = null;
        let modelDipakai = "";
        let errorTerakhir = "";

        for (const modelAktif of DAFTAR_MODEL_GROQ) {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: modelAktif,
                    messages: konteksGroq,
                    temperature: 0.7,
                    max_tokens: 1024
                })
            });

            const data = await response.json();

            if (response.ok && data.choices?.[0]?.message?.content) {
                balasanAI = data.choices[0].message.content;
                modelDipakai = modelAktif;
                break;
            } else {
                errorTerakhir = data.error?.message || `Model ${modelAktif} gagal merespons.`;
                if (response.status === 401) {
                    throw new Error("API Key Groq tidak valid atau sudah dicabut (Invalid API Key).");
                }
            }
        }

        if (!balasanAI) {
            throw new Error(errorTerakhir);
        }

        hapusTyping(typingId);
        const waktuAI = getWaktuSekarang();

        sesi.messages.push({
            role: 'assistant',
            text: balasanAI,
            arabic: "",
            time: waktuAI,
            model: modelDipakai,
            isRestricted: false
        });

        simpanSesiKeStorage(persona);
        renderSidebarSesi(persona);
        renderBubbleAIDOM(containerEl, persona, balasanAI, "", false, modelDipakai, waktuAI);
        containerEl.scrollTop = containerEl.scrollHeight;

    } catch (error) {
        hapusTyping(typingId);
        const waktuErr = getWaktuSekarang();
        const teksErr = `⚠️ **Terjadi kendala koneksi AI:** ${error.message}\n\nSilakan periksa kembali **GROQ_API_KEY** di \`script.js\`.`;
        sesi.messages.push({
            role: 'assistant',
            text: teksErr,
            arabic: "",
            time: waktuErr,
            model: "",
            isRestricted: true
        });
        simpanSesiKeStorage(persona);
        renderBubbleAIDOM(containerEl, persona, teksErr, "", true, "", waktuErr);
        containerEl.scrollTop = containerEl.scrollHeight;
    } finally {
        stateSesi[persona].isSending = false;
        if (inputEl) {
            inputEl.disabled = false;
            inputEl.focus();
        }
        if (btnEl) btnEl.disabled = false;
    }
}

function bukaChatbot() {
    sembunyikanSemuaHalaman();
    document.getElementById('chatbot-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);

    muatSemuaSesiDariStorage('albanna');
    renderSidebarSesi('albanna');
    renderIsiPesanSesi('albanna');

    setTimeout(() => {
        const input = document.getElementById('chat-input');
        if (input) input.focus();
    }, 100);
}

function tutupChatbot() {
    bukaTabUtama('projects');
}

function kirimPertanyaanSaran(teks) {
    prosesKirimPesanKeGroq('albanna', teks);
}

function handleChatSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('chat-input');
    const teks = input ? input.value.trim() : '';
    if (!teks) return;
    prosesKirimPesanKeGroq('albanna', teks);
}


// =================================================================
// 8. EASTER EGG I (ZAHRA-E-GHADIR KHUM) & EASTER EGG II (KAPSUL WAKTU)
// =================================================================
let easterClickCount = 0;
let easterClickTimer = null;

function triggerEasterEgg() {
    easterClickCount++;
    clearTimeout(easterClickTimer);

    if (easterClickCount >= 3 && easterClickCount < 5) {
        tampilkanToastEaster(`✨ ${5 - easterClickCount} klik lagi untuk membuka ruang rahasia I...`);
    }

    if (easterClickCount >= 5) {
        easterClickCount = 0;
        localStorage.setItem('luqman_ee1_unlocked', 'true');
        tampilkanToastEaster("۞ Easter Egg I Terbuka: Zahra-e-Ghadir Khum!");
        setTimeout(() => {
            bukaZahraChatbot();
        }, 450);
        return;
    }

    easterClickTimer = setTimeout(() => {
        easterClickCount = 0;
    }, 2500);
}

function tampilkanToastEaster(pesan) {
    document.querySelectorAll('.easter-toast').forEach(el => el.remove());
    const toast = document.createElement('div');
    toast.className = 'easter-toast';
    toast.textContent = pesan;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
}

function bukaZahraChatbot() {
    sembunyikanSemuaHalaman();
    document.getElementById('zahra-chatbot-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);

    muatSemuaSesiDariStorage('zahra');
    renderSidebarSesi('zahra');
    renderIsiPesanSesi('zahra');

    setTimeout(() => {
        const input = document.getElementById('zahra-chat-input');
        if (input) input.focus();
    }, 100);
}

function tutupZahraChatbot() {
    bukaTabUtama('home');
}

function kirimSaranZahra(teks) {
    prosesKirimPesanKeGroq('zahra', teks);
}

function handleZahraSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('zahra-chat-input');
    const teks = input ? input.value.trim() : '';
    if (!teks) return;
    prosesKirimPesanKeGroq('zahra', teks);
}

// --- EASTER EGG II: KAPSUL WAKTU PERADABAN ISLAM & GULUNGAN HIKMAH ---
let easterDuaClickCount = 0;
let easterDuaTimer = null;
let secretCodeBuffer = "";

function triggerEasterEggDua() {
    easterDuaClickCount++;
    clearTimeout(easterDuaTimer);

    if (easterDuaClickCount >= 3 && easterDuaClickCount < 5) {
        tampilkanToastEaster(`⏳ ${5 - easterDuaClickCount} klik lagi untuk membuka Kapsul Waktu...`);
    }

    if (easterDuaClickCount >= 5) {
        easterDuaClickCount = 0;
        bukaTimeCapsule();
        return;
    }

    easterDuaTimer = setTimeout(() => {
        easterDuaClickCount = 0;
    }, 2500);
}

// Pemicu Keyboard Rahasia: Ketik "1928" di halaman utama
document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement?.tagName?.toLowerCase();
    if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

    if (/^[0-9]$/.test(e.key)) {
        secretCodeBuffer += e.key;
        if (secretCodeBuffer.length > 4) {
            secretCodeBuffer = secretCodeBuffer.slice(-4);
        }
        if (secretCodeBuffer === "1928") {
            secretCodeBuffer = "";
            bukaTimeCapsule();
        }
    }
});

const DATA_ERA_PERADABAN = [
    {
        year: "610 M – 632 M",
        title: "Cahaya Wahyu di Gua Hira & Masyarakat Madani",
        desc: "Rasulullah ﷺ membangun fondasi akidah tauhid di Makkah selama 13 tahun, lalu mendirikan masyarakat madani berlandaskan Piagam Madinah yang menyatukan Muhajirin dan Anshar.",
        center: "📍 Pusat: Makkah & Madinah",
        figure: "🌟 Tokoh: Rasulullah ﷺ",
        icon: "🕋",
        quote: "\"Aku tinggalkan untuk kalian dua perkara; kalian tidak akan tersesat selama berpegang teguh pada keduanya: Kitabullah dan Sunnah Nabi-Nya.\""
    },
    {
        year: "632 M – 661 M",
        title: "Era Khulafaur Rasyidin & Keadilan Semesta",
        desc: "Kepemimpinan Abu Bakar, Umar bin Khattab, Utsman bin Affan, dan Ali bin Abi Thalib radhiyallahu 'anhum yang membukukan mushaf Al-Qur'an dan menyebarkan keadilan dari Syam hingga Persia.",
        center: "📍 Pusat: Madinah & Kufah",
        figure: "🌟 Tokoh: Khulafaur Rasyidin",
        icon: "⚖️",
        quote: "\"Sejak kapan kalian memperbudak manusia, padahal ibu-ibu mereka melahirkan mereka dalam keadaan merdeka?\" — Umar bin Khattab"
    },
    {
        year: "786 M – 1258 M",
        title: "Zaman Keemasan Sains & Baitul Hikmah Baghdad",
        desc: "Peradaban Islam menjadi mercusuar ilmu pengetahuan dunia. Lahirnya Al-Khawarizmi (Aljabar), Ibnu Sina (Kedokteran), Ibnu Al-Haytham (Optik), serta 4 Imam Madzhab Fikih.",
        center: "📍 Pusat: Baghdad, Kordoba & Kairo",
        figure: "🌟 Tokoh: Al-Khawarizmi & Imam 4 Madzhab",
        icon: "🔭",
        quote: "\"Tinta para ulama lebih mulia daripada darah para syuhada di jalan kebenaran.\""
    },
    {
        year: "1187 M",
        title: "Pembebasan Baitul Maqdis (Al-Quds)",
        desc: "Setelah menyatukan barisan umat melalui perbaikan akidah dan pendidikan (Madrasah Nizamiyah), Shalahuddin Al-Ayyubi membebaskan Masjidil Aqsa dengan penuh kasih sayang tanpa balas dendam.",
        center: "📍 Pusat: Damaskus, Kairo & Al-Quds",
        figure: "🌟 Tokoh: Shalahuddin Al-Ayyubi",
        icon: "🕌",
        quote: "\"Kemenangan sejati dimulai dari bersatunya hati umat di atas ketakwaan sebelum turun ke medan perjuangan.\""
    },
    {
        year: "1453 M",
        title: "Penaklukan Konstantinopel (Bisyarah Nabawiyah)",
        desc: "Sultan Muhammad Al-Fatih pada usia 21 tahun mewujudkan kabar gembira Rasulullah ﷺ dengan memadukan strategi rekayasa teknologi meriam, armada laut, dan ketakwaan pasukan.",
        center: "📍 Pusat: Istanbul (Islambul)",
        figure: "🌟 Tokoh: Sultan Muhammad Al-Fatih",
        icon: "🏰",
        quote: "\"Sebaik-baik pemimpin adalah pemimpinnya, dan sebaik-baik pasukan adalah pasukannya.\" — HR. Ahmad"
    },
    {
        year: "1928 M – Kini",
        title: "Kebangkitan Tajdid & Dakwah Era Digital",
        desc: "Pasca runtuhnya Kekhalifahan Utsmaniyah (1924), Imam Hassan Al-Banna menyalakan kembali obor tarbiyah dan kebangkitan umat dari Ismailiyah hingga menginspirasi generasi muslim modern.",
        center: "📍 Pusat: Dunia Islam Global",
        figure: "🌟 Tokoh: Imam Hassan Al-Banna",
        icon: "☪️",
        quote: "\"Perbaikilah dirimu sendiri, dan serulah orang lain kepada kebaikan, niscaya kebangkitan itu akan tegak.\""
    }
];

const DAFTAR_HIKMAH_EMAS = [
    {
        arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
        text: "\"Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah akan memudahkan baginya jalan menuju surga.\"",
        source: "— HR. Muslim"
    },
    {
        arabic: "الْوَقْتُ هُوَ الْحَيَاةُ",
        text: "\"Waktu adalah kehidupan itu sendiri; maka janganlah engkau sia-siakan sedetik pun kecuali untuk kebaikan yang abadi.\"",
        source: "— Imam Syahid Hassan Al-Banna"
    },
    {
        arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
        text: "\"Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum sebelum mereka mengubah keadaan yang ada pada diri mereka sendiri.\"",
        source: "— QS. Ar-Ra'd: 11"
    },
    {
        arabic: "إِذَا صَحَّتِ الْعَقِيدَةُ صَحَّتِ الْحَيَاةُ كُلُّهَا",
        text: "\"Apabila lurus akidah seseorang, maka akan lurus pula seluruh jalan kehidupannya.\"",
        source: "— Kaidah Tarbiyah Islamiyah"
    },
    {
        arabic: "مَنْ أَرَادَ الدُّنْيَا فَعَلَيْهِ بِالْعِلْمِ، وَمَنْ أَرَادَ الْآخِرَةَ فَعَلَيْهِ بِالْعِلْمِ",
        text: "\"Barangsiapa menginginkan dunia hendaklah ia berilmu, dan barangsiapa menginginkan akhirat hendaklah ia berilmu.\"",
        source: "— Imam Asy-Syafi'i rahimahullah"
    },
    {
        arabic: "أَصْلِحْ نَفْسَكَ وَادْعُ غَيْرَكَ",
        text: "\"Perbaikilah dirimu sendiri dan ajaklah orang lain kepada kebaikan.\"",
        source: "— Wasiat Dakwah Ikhwanul Muslimin"
    }
];

function bukaTimeCapsule() {
    localStorage.setItem('luqman_ee2_unlocked', 'true');
    tampilkanToastEaster("⏳ Easter Egg II Terbuka: Kapsul Waktu Peradaban Islam!");

    sembunyikanSemuaHalaman();
    document.getElementById('time-capsule-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);

    const ee1 = localStorage.getItem('luqman_ee1_unlocked') === 'true';
    const badgeEl = document.getElementById('vault-badge-status');
    if (badgeEl) {
        badgeEl.textContent = ee1
            ? "👑 Master Penjelajah (2/2 Easter Egg Terbuka!)"
            : "🏅 Penjelajah Waktu (1/2 Easter Egg)";
    }

    const firstBtn = document.querySelector('#era-selector-bar .era-btn');
    if (firstBtn) pilihEraPeradaban(0, firstBtn);
}

function tutupTimeCapsule() {
    bukaTabUtama('home');
}

function pilihEraPeradaban(index, btnEl) {
    const era = DATA_ERA_PERADABAN[index];
    if (!era) return;

    document.querySelectorAll('#era-selector-bar .era-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    document.getElementById('era-year-text').textContent = era.year;
    document.getElementById('era-title-text').textContent = era.title;
    document.getElementById('era-desc-text').textContent = era.desc;
    document.getElementById('era-center-tag').textContent = era.center;
    document.getElementById('era-figure-tag').textContent = era.figure;
    document.getElementById('era-icon-text').textContent = era.icon;
    document.getElementById('era-quote-text').textContent = era.quote;
}

let lastHikmahIdx = 0;
function putarHikmahAcak() {
    const box = document.getElementById('scroll-parchment-box');
    if (!box) return;

    let idx;
    do {
        idx = Math.floor(Math.random() * DAFTAR_HIKMAH_EMAS.length);
    } while (idx === lastHikmahIdx && DAFTAR_HIKMAH_EMAS.length > 1);
    lastHikmahIdx = idx;

    const item = DAFTAR_HIKMAH_EMAS[idx];
    box.style.opacity = '0.2';
    setTimeout(() => {
        document.getElementById('hikmah-arabic').textContent = item.arabic;
        document.getElementById('hikmah-text').textContent = item.text;
        document.getElementById('hikmah-source').textContent = item.source;
        box.style.opacity = '1';
    }, 200);
}

// --- Filter Keamanan Syariat & Sanitasi HTML ---
function cekPelanggaranSyariat(inputUser) {
    const q = inputUser.toLowerCase();
    const kataTerlarang = [
        'judi', 'slot', 'togel', 'gacor', 'taruhan',
        'bokep', 'porno', 'porn', 'xxx', 'zina', 'pacaran', 'maksiat',
        'mabuk', 'miras', 'khamr', 'narkoba', 'sabu', 'ganja',
        'bunuh diri', 'self harm', 'silet', 'lukai diri',
        'santet', 'pelet', 'pesugihan', 'dukun', 'ramalan zodiak', 'syirik',
        'hina islam', 'hina allah', 'hina nabi', 'murtad', 'kafirkan',
        'cara mencuri', 'hack akun', 'nipu', 'penipuan', 'riba', 'pinjol ilegal'
    ];
    return kataTerlarang.some(kata => q.includes(kata));
}

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
