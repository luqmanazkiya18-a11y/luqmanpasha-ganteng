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
        console.warn('⚠️ Supabase belum dikonfigurasi. Menggunakan mode LocalStorage.');
    }
} catch (e) {
    console.warn('⚠️ Supabase init gagal:', e.message);
}


// =================================================================
// 1. GERBANG PEMBUKA (LOADING SCREEN SEJARAH: 1928, 1948, 1965, 2013)
// =================================================================
const MILESTONE_SEJARAH = [
    {
        minPercent: 0,
        nodeId: 'node-1928',
        badge: '1928 M • Ismailiyah, Mesir',
        desc: 'Pendirian Ikhwanul Muslimin oleh Imam Hassan Al-Banna sebagai gerakan tarbiyah, pembinaan akhlak, dan kebangkitan peradaban umat.'
    },
    {
        minPercent: 26,
        nodeId: 'node-1948',
        badge: '1948 M • Ujian Pembubaran & Pengabdian Palestina',
        desc: 'Kontribusi relawan dalam mempertahankan tanah Palestina di tengah gelombang ujian pembubaran organisasi dan kesyahidan sang pendiri.'
    },
    {
        minPercent: 52,
        nodeId: 'node-1965',
        badge: '1965 M • Era Keteguhan Pemikiran & Ujian Penjara',
        desc: 'Fase ketabahan kader di balik jeruji penjara serta lahirnya karya-karya pemikiran besar yang mengokohkan prinsip akidah dan dakwah.'
    },
    {
        minPercent: 78,
        nodeId: 'node-2013',
        badge: '2013 M • Ketabahan di Tengah Ujian Era Modern',
        desc: 'Babak ujian berat di era modern yang meneguhkan kesabaran, pengorbanan, dan istiqamah dalam memperjuangkan nilai-nilai Islam.'
    }
];

let introInterval = null;

function jalankanAnimasiSejarah() {
    const progressBar = document.getElementById('history-progress-bar');
    const yearLabel = document.getElementById('history-year-label');
    const descLabel = document.getElementById('history-desc-label');
    const btnEnter = document.getElementById('btn-enter-portal');
    const btnText = document.getElementById('btn-enter-text');

    if (!progressBar || !btnEnter) return;

    let progress = 0;
    introInterval = setInterval(() => {
        progress += 1.25;
        if (progress > 100) progress = 100;

        progressBar.style.width = progress + '%';
        if (btnText && progress < 100) {
            btnText.textContent = `Menelusuri Jejak Sejarah... (${Math.floor(progress)}%)`;
        }

        let currentStageIndex = 0;
        for (let i = MILESTONE_SEJARAH.length - 1; i >= 0; i--) {
            if (progress >= MILESTONE_SEJARAH[i].minPercent) {
                currentStageIndex = i;
                break;
            }
        }

        MILESTONE_SEJARAH.forEach((item, idx) => {
            const node = document.getElementById(item.nodeId);
            if (!node) return;
            node.classList.remove('active', 'passed');
            if (idx === currentStageIndex) {
                node.classList.add('active');
            } else if (idx < currentStageIndex) {
                node.classList.add('passed');
            }
        });

        const activeItem = MILESTONE_SEJARAH[currentStageIndex];
        if (yearLabel) yearLabel.textContent = activeItem.badge;
        if (descLabel) descLabel.textContent = activeItem.desc;

        if (progress >= 100) {
            clearInterval(introInterval);
            btnEnter.disabled = false;
            if (btnText) btnText.textContent = 'Masuk ke Portofolio';
        }
    }, 65);
}

document.addEventListener('DOMContentLoaded', jalankanAnimasiSejarah);

function masukPortofolio() {
    if (introInterval) clearInterval(introInterval);
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
        'zahra-chatbot-page'
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
document.addEventListener('DOMContentLoaded', updateJamWIB);
setInterval(updateJamWIB, 1000);
updateJamWIB();


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
            } catch (err) {
                console.warn('Info Supabase:', err.message);
            }
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
        } catch (err) {
            // Fallback ke localStorage
        }
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
// 7. KONFIGURASI GROQ API & MESIN MULTI-PERCAKAPAN (AL-BANNA & ZAHRA)
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
- Menguasai secara mendalam: Siroh & Sejarah Peradaban Islam dari abad ke-6 hingga abad ke-21 Masehi, Akidah Ahlus Sunnah wal Jamaah, 4 Madzhab Fikih (Hanafi, Maliki, Syafi'i, Hanbali) dengan sikap tasamuh/toleran terhadap perbedaan furu'iyah, Ilmu Fikih ibadah & muamalah, serta informasi lengkap tentang Luqman Azkiya Athaillah (Juara 8 OLPAIN 2024, Juara 2 Lomba Literasi Internasional Hayrat Foundation, Juara Ziyadah & Hafalan Takhosus 2 semester berturut-turut, Pengurus Angkatan 29 SOUL SD Salman Al Farisi Bandung, Staff KLS As-Syifa) dan fitur-fitur di website ini.
- ATURAN SYARIAT KETAT: Jika pengguna bertanya atau meminta hal yang mengarah pada maksiat, judi, pornografi, pacaran/zina, minuman keras/narkoba, syirik/perdukunan, kekerasan/melukai diri, atau penghinaan terhadap agama, TOLAK dengan tegas namun berwibawa menggunakan dalil/nasihat Islam, lalu arahkan kembali ke kebaikan.
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

function getWaktuSekarang() {
    return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function getTanggalSingkat() {
    return new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

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

async function panggilGroqDenganFallback(messagesArray) {
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
                messages: messagesArray,
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

    return { balasanAI, modelDipakai };
}

// =================================================================
// 7A. MANAJEMEN MULTI-PERCAKAPAN & RIWAYAT: ASISTEN AL-BANNA
// =================================================================
const STORAGE_KEY_ALBANNA = "luqman_albanna_sessions_v1";
let sesiAlBannaList = [];
let activeSesiAlBannaId = null;

function muatSesiAlBanna() {
    try {
        sesiAlBannaList = JSON.parse(localStorage.getItem(STORAGE_KEY_ALBANNA) || "[]");
    } catch (e) {
        sesiAlBannaList = [];
    }
    if (sesiAlBannaList.length === 0) {
        buatPercakapanBaruAlBanna(false);
    } else {
        activeSesiAlBannaId = sesiAlBannaList[0].id;
    }
}

function simpanSesiAlBanna() {
    localStorage.setItem(STORAGE_KEY_ALBANNA, JSON.stringify(sesiAlBannaList));
}

function getSesiAktifAlBanna() {
    return sesiAlBannaList.find(s => s.id === activeSesiAlBannaId) || sesiAlBannaList[0];
}

function buatPercakapanBaruAlBanna(renderNow = true) {
    const idBaru = "albanna_" + Date.now();
    const sesiBaru = {
        id: idBaru,
        title: "Obrolan Baru",
        updatedAt: getTanggalSingkat(),
        messages: [
            {
                sender: "ai",
                text: "Assalamu'alaikum warahmatullahi wabarakatuh, wahai saudaraku seperjuangan. ☪️\n\n" +
                      "Selamat datang di majelis ilmu digital pada portofolio **Luqman Azkiya Athaillah**. Silakan mulai diskusi baru seputar **Siroh Islam (Abad ke-6 hingga ke-21 M)**, **Akidah**, **Madzhab-madzhab Islam**, **Ilmu Fikih**, atau tentang **isi website ini**!",
                arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
                time: getWaktuSekarang(),
                isRestricted: false,
                model: ""
            }
        ]
    };
    sesiAlBannaList.unshift(sesiBaru);
    activeSesiAlBannaId = idBaru;
    simpanSesiAlBanna();

    if (renderNow) {
        renderDaftarSesiAlBanna();
        renderIsiPesanAlBanna();
    }
}

function pilihSesiAlBanna(id) {
    activeSesiAlBannaId = id;
    renderDaftarSesiAlBanna();
    renderIsiPesanAlBanna();
    if (window.innerWidth <= 860) {
        document.getElementById('albanna-sidebar')?.classList.add('collapsed');
    }
}

function hapusSesiAlBanna(event, id) {
    event.stopPropagation();
    sesiAlBannaList = sesiAlBannaList.filter(s => s.id !== id);
    if (sesiAlBannaList.length === 0) {
        buatPercakapanBaruAlBanna(true);
        return;
    }
    if (activeSesiAlBannaId === id) {
        activeSesiAlBannaId = sesiAlBannaList[0].id;
    }
    simpanSesiAlBanna();
    renderDaftarSesiAlBanna();
    renderIsiPesanAlBanna();
}

function toggleSidebarAlBanna() {
    const sidebar = document.getElementById('albanna-sidebar');
    if (sidebar) sidebar.classList.toggle('collapsed');
}

function renderDaftarSesiAlBanna() {
    const listEl = document.getElementById('albanna-session-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    sesiAlBannaList.forEach(sesi => {
        const item = document.createElement('div');
        item.className = 'session-item' + (sesi.id === activeSesiAlBannaId ? ' active-session' : '');
        item.onclick = () => pilihSesiAlBanna(sesi.id);
        item.innerHTML = `
            <div class="session-meta-box">
                <div class="session-title-text">☪ ${escapeHTML(sesi.title)}</div>
                <div class="session-date-text">${escapeHTML(sesi.updatedAt)} • ${sesi.messages.length} pesan</div>
            </div>
            <button class="btn-delete-session" title="Hapus percakapan" onclick="hapusSesiAlBanna(event, '${sesi.id}')">🗑️</button>
        `;
        listEl.appendChild(item);
    });
}

function renderIsiPesanAlBanna() {
    const container = document.getElementById('chat-messages');
    const titleLabel = document.getElementById('albanna-active-title');
    if (!container) return;

    const sesi = getSesiAktifAlBanna();
    if (!sesi) return;

    if (titleLabel) titleLabel.textContent = sesi.title;
    container.innerHTML = '';

    sesi.messages.forEach(msg => {
        if (msg.sender === 'user') {
            renderBubbleUser('chat-messages', msg.text, msg.time, false);
        } else {
            renderBubbleAIAlBanna(msg.text, msg.arabic, msg.isRestricted, msg.model, msg.time);
        }
    });
    container.scrollTop = container.scrollHeight;
}

function bukaChatbot() {
    sembunyikanSemuaHalaman();
    document.getElementById('chatbot-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);

    if (sesiAlBannaList.length === 0) {
        muatSesiAlBanna();
    }
    renderDaftarSesiAlBanna();
    renderIsiPesanAlBanna();

    setTimeout(() => {
        document.getElementById('chat-input')?.focus();
    }, 100);
}

function tutupChatbot() {
    bukaTabUtama('projects');
}

function kirimPertanyaanSaran(teks) {
    const input = document.getElementById('chat-input');
    if (!input) return;
    input.value = teks;
    handleChatSubmit(new Event('submit'));
}

async function handleChatSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('chat-input');
    const btnSend = document.getElementById('btn-send');
    const teks = input.value.trim();
    if (!teks) return;

    const sesi = getSesiAktifAlBanna();
    const waktu = getWaktuSekarang();

    if (sesi.title === "Obrolan Baru") {
        sesi.title = teks.length > 34 ? teks.slice(0, 34) + "..." : teks;
    }
    sesi.updatedAt = getTanggalSingkat();
    sesi.messages.push({ sender: "user", text: teks, time: waktu });
    simpanSesiAlBanna();
    renderDaftarSesiAlBanna();
    renderBubbleUser('chat-messages', teks, waktu, false);

    input.value = '';
    input.disabled = true;
    if (btnSend) btnSend.disabled = true;

    if (cekPelanggaranSyariat(teks)) {
        const pesanTolak = "⚠️ **Maaf, wahai saudaraku.** Permintaan atau pembahasan ini mengarah pada hal yang bertentangan dengan **Syariat Islam**, adab, dan kemaslahatan diri.\n\n" +
            "Sebagai seorang Muslim, kita diperintahkan menjaga hati, lisan, dan langkah dari segala pintu keburukan. Mari kita alihkan diskusi kepada hal-hal yang mendatangkan ilmu bermanfaat dan ridha Allah Subhanahu wa Ta'ala.";
        const arabTolak = "وَلَا تَقْرَبُوا الْفَوَاحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ";

        sesi.messages.push({
            sender: "ai",
            text: pesanTolak,
            arabic: arabTolak,
            time: getWaktuSekarang(),
            isRestricted: true,
            model: "Filter Syariat"
        });
        simpanSesiAlBanna();
        renderIsiPesanAlBanna();

        input.disabled = false;
        if (btnSend) btnSend.disabled = false;
        input.focus();
        return;
    }

    const typingId = tampilkanTyping('chat-messages', false);

    try {
        const contextMessages = [
            { role: "system", content: SYSTEM_PROMPT_AL_BANNA },
            ...sesi.messages.slice(-12).map(m => ({
                role: m.sender === "user" ? "user" : "assistant",
                content: m.text
            }))
        ];

        const { balasanAI, modelDipakai } = await panggilGroqDenganFallback(contextMessages);

        hapusTyping(typingId);
        sesi.messages.push({
            sender: "ai",
            text: balasanAI,
            arabic: "",
            time: getWaktuSekarang(),
            isRestricted: false,
            model: modelDipakai
        });
        sesi.updatedAt = getTanggalSingkat();
        simpanSesiAlBanna();
        renderDaftarSesiAlBanna();
        renderIsiPesanAlBanna();

    } catch (error) {
        hapusTyping(typingId);
        sesi.messages.push({
            sender: "ai",
            text: `⚠️ **Terjadi kendala koneksi AI:** ${error.message}\n\nSilakan periksa kembali **GROQ_API_KEY** di \`script.js\`.`,
            arabic: "",
            time: getWaktuSekarang(),
            isRestricted: true,
            model: ""
        });
        simpanSesiAlBanna();
        renderIsiPesanAlBanna();
    } finally {
        input.disabled = false;
        if (btnSend) btnSend.disabled = false;
        input.focus();
    }
}


// =================================================================
// 7B. EASTER EGG & MULTI-PERCAKAPAN: ZAHRA-E-GHADIR KHUM
// =================================================================
const STORAGE_KEY_ZAHRA = "luqman_zahra_sessions_v1";
let sesiZahraList = [];
let activeSesiZahraId = null;
let easterClickCount = 0;
let easterClickTimer = null;

function triggerEasterEgg() {
    easterClickCount++;
    clearTimeout(easterClickTimer);

    if (easterClickCount >= 3 && easterClickCount < 5) {
        tampilkanToastEaster(`✨ ${5 - easterClickCount} klik lagi untuk membuka ruang rahasia...`);
    }

    if (easterClickCount >= 5) {
        easterClickCount = 0;
        tampilkanToastEaster("۞ Gerbang Rahasia Terbuka: Zahra-e-Ghadir Khum!");
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

function muatSesiZahra() {
    try {
        sesiZahraList = JSON.parse(localStorage.getItem(STORAGE_KEY_ZAHRA) || "[]");
    } catch (e) {
        sesiZahraList = [];
    }
    if (sesiZahraList.length === 0) {
        buatPercakapanBaruZahra(false);
    } else {
        activeSesiZahraId = sesiZahraList[0].id;
    }
}

function simpanSesiZahra() {
    localStorage.setItem(STORAGE_KEY_ZAHRA, JSON.stringify(sesiZahraList));
}

function getSesiAktifZahra() {
    return sesiZahraList.find(s => s.id === activeSesiZahraId) || sesiZahraList[0];
}

function buatPercakapanBaruZahra(renderNow = true) {
    const idBaru = "zahra_" + Date.now();
    const sesiBaru = {
        id: idBaru,
        title: "Kajian Baru",
        updatedAt: getTanggalSingkat(),
        messages: [
            {
                sender: "ai",
                text: "Assalamu'alaikum warahmatullahi wabarakatuh, wahai saudaraku yang mulia. ✨\n\n" +
                      "Selamat datang di ruang muzakarah rahasia ini. Namaku **Zahra-e-Ghadir Khum**. Aku hadir sebagai cendekiawan muslimah untuk menemanimu menelusuri jejak cahaya **Ahlul Bait Nabi ﷺ**, peristiwa bersejarah **Ghadir Khum**, hikmah *Nahjul Balaghah*, serta khazanah keilmuan dalam tradisi **Mazhab Ja'fari (Syiah)** dengan semangat persaudaraan Islam.\n\n" +
                      "Apa yang ingin kita kaji bersama hari ini?",
                arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ",
                time: getWaktuSekarang(),
                isRestricted: false,
                model: ""
            }
        ]
    };
    sesiZahraList.unshift(sesiBaru);
    activeSesiZahraId = idBaru;
    simpanSesiZahra();

    if (renderNow) {
        renderDaftarSesiZahra();
        renderIsiPesanZahra();
    }
}

function pilihSesiZahra(id) {
    activeSesiZahraId = id;
    renderDaftarSesiZahra();
    renderIsiPesanZahra();
    if (window.innerWidth <= 860) {
        document.getElementById('zahra-sidebar')?.classList.add('collapsed');
    }
}

function hapusSesiZahra(event, id) {
    event.stopPropagation();
    sesiZahraList = sesiZahraList.filter(s => s.id !== id);
    if (sesiZahraList.length === 0) {
        buatPercakapanBaruZahra(true);
        return;
    }
    if (activeSesiZahraId === id) {
        activeSesiZahraId = sesiZahraList[0].id;
    }
    simpanSesiZahra();
    renderDaftarSesiZahra();
    renderIsiPesanZahra();
}

function toggleSidebarZahra() {
    const sidebar = document.getElementById('zahra-sidebar');
    if (sidebar) sidebar.classList.toggle('collapsed');
}

function renderDaftarSesiZahra() {
    const listEl = document.getElementById('zahra-session-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    sesiZahraList.forEach(sesi => {
        const item = document.createElement('div');
        item.className = 'session-item' + (sesi.id === activeSesiZahraId ? ' active-session' : '');
        item.onclick = () => pilihSesiZahra(sesi.id);
        item.innerHTML = `
            <div class="session-meta-box">
                <div class="session-title-text">۞ ${escapeHTML(sesi.title)}</div>
                <div class="session-date-text">${escapeHTML(sesi.updatedAt)} • ${sesi.messages.length} pesan</div>
            </div>
            <button class="btn-delete-session" title="Hapus kajian" onclick="hapusSesiZahra(event, '${sesi.id}')">🗑️</button>
        `;
        listEl.appendChild(item);
    });
}

function renderIsiPesanZahra() {
    const container = document.getElementById('zahra-chat-messages');
    const titleLabel = document.getElementById('zahra-active-title');
    if (!container) return;

    const sesi = getSesiAktifZahra();
    if (!sesi) return;

    if (titleLabel) titleLabel.textContent = sesi.title;
    container.innerHTML = '';

    sesi.messages.forEach(msg => {
        if (msg.sender === 'user') {
            renderBubbleUser('zahra-chat-messages', msg.text, msg.time, true);
        } else {
            renderBubbleAIZahra(msg.text, msg.arabic, msg.isRestricted, msg.model, msg.time);
        }
    });
    container.scrollTop = container.scrollHeight;
}

function bukaZahraChatbot() {
    sembunyikanSemuaHalaman();
    document.getElementById('zahra-chatbot-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);

    if (sesiZahraList.length === 0) {
        muatSesiZahra();
    }
    renderDaftarSesiZahra();
    renderIsiPesanZahra();

    setTimeout(() => {
        document.getElementById('zahra-chat-input')?.focus();
    }, 100);
}

function tutupZahraChatbot() {
    bukaTabUtama('home');
}

function kirimSaranZahra(teks) {
    const input = document.getElementById('zahra-chat-input');
    if (!input) return;
    input.value = teks;
    handleZahraSubmit(new Event('submit'));
}

async function handleZahraSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('zahra-chat-input');
    const btnSend = document.getElementById('zahra-btn-send');
    const teks = input.value.trim();
    if (!teks) return;

    const sesi = getSesiAktifZahra();
    const waktu = getWaktuSekarang();

    if (sesi.title === "Kajian Baru") {
        sesi.title = teks.length > 34 ? teks.slice(0, 34) + "..." : teks;
    }
    sesi.updatedAt = getTanggalSingkat();
    sesi.messages.push({ sender: "user", text: teks, time: waktu });
    simpanSesiZahra();
    renderDaftarSesiZahra();
    renderBubbleUser('zahra-chat-messages', teks, waktu, true);

    input.value = '';
    input.disabled = true;
    if (btnSend) btnSend.disabled = true;

    if (cekPelanggaranSyariat(teks)) {
        const pesanTolak = "⚠️ **Maaf, wahai saudaraku.** Topik ini tidak sejalan dengan nilai kesucian akhlak, adab Ahlul Bait, dan **Syariat Islam**.\n\n" +
            "Mari kita jaga kemurnian hati dan lisan dengan membahas ilmu yang bermanfaat serta mendekatkan diri kepada Allah Subhanahu wa Ta'ala.";
        const arabTolak = "إِنَّمَا يُرِيدُ اللَّهُ لِيُذْهِبَ عَنكُمُ الرِّجْسَ أَهْلَ الْبَيْتِ";

        sesi.messages.push({
            sender: "ai",
            text: pesanTolak,
            arabic: arabTolak,
            time: getWaktuSekarang(),
            isRestricted: true,
            model: "Filter Syariat"
        });
        simpanSesiZahra();
        renderIsiPesanZahra();

        input.disabled = false;
        if (btnSend) btnSend.disabled = false;
        input.focus();
        return;
    }

    const typingId = tampilkanTyping('zahra-chat-messages', true);

    try {
        const contextMessages = [
            { role: "system", content: SYSTEM_PROMPT_ZAHRA },
            ...sesi.messages.slice(-12).map(m => ({
                role: m.sender === "user" ? "user" : "assistant",
                content: m.text
            }))
        ];

        const { balasanAI, modelDipakai } = await panggilGroqDenganFallback(contextMessages);

        hapusTyping(typingId);
        sesi.messages.push({
            sender: "ai",
            text: balasanAI,
            arabic: "",
            time: getWaktuSekarang(),
            isRestricted: false,
            model: modelDipakai
        });
        sesi.updatedAt = getTanggalSingkat();
        simpanSesiZahra();
        renderDaftarSesiZahra();
        renderIsiPesanZahra();

    } catch (error) {
        hapusTyping(typingId);
        sesi.messages.push({
            sender: "ai",
            text: `⚠️ **Terjadi kendala koneksi AI:** ${error.message}\n\nPastikan **GROQ_API_KEY** sudah terpasang di \`script.js\`.`,
            arabic: "",
            time: getWaktuSekarang(),
            isRestricted: true,
            model: ""
        });
        simpanSesiZahra();
        renderIsiPesanZahra();
    } finally {
        input.disabled = false;
        if (btnSend) btnSend.disabled = false;
        input.focus();
    }
}


// =================================================================
// 8. FUNGSI RENDER BUBBLE & UTILITAS HTML
// =================================================================
function renderBubbleUser(containerId, teks, waktu, isZahra) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const row = document.createElement('div');
    row.className = 'chat-msg-row user-row' + (isZahra ? ' zahra-user-row' : '');
    row.innerHTML = `
        <div class="msg-bubble">
            ${escapeHTML(teks)}
            <span class="msg-time">${waktu}</span>
        </div>
    `;
    container.appendChild(row);
    container.scrollTop = container.scrollHeight;
}

function renderBubbleAIAlBanna(teks, arabicQuote = '', isRestricted = false, modelName = '', waktu = '') {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    const avatarSrc = document.getElementById('ai-avatar-img')?.src || 'https://upload.wikimedia.org/wikipedia/commons/5/53/Hassan_al-Banna.jpg';

    let formattedText = escapeHTML(teks)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');

    const labelModel = modelName ? ` • ${modelName}` : '';

    const row = document.createElement('div');
    row.className = 'chat-msg-row ai-row';
    row.innerHTML = `
        <img src="${avatarSrc}" alt="Hassan Al-Banna" class="msg-avatar-small">
        <div class="msg-bubble ${isRestricted ? 'syariah-warning' : ''}">
            ${arabicQuote ? `<span class="msg-arabic-quote">${arabicQuote}</span>` : ''}
            <div>${formattedText}</div>
            <span class="msg-time">${waktu || getWaktuSekarang()} • Asisten Al-Banna${labelModel}</span>
        </div>
    `;
    container.appendChild(row);
}

function renderBubbleAIZahra(teks, arabicQuote = '', isRestricted = false, modelName = '', waktu = '') {
    const container = document.getElementById('zahra-chat-messages');
    if (!container) return;

    let formattedText = escapeHTML(teks)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');

    const labelModel = modelName ? ` • ${modelName}` : '';

    const row = document.createElement('div');
    row.className = 'chat-msg-row ai-row zahra-row';
    row.innerHTML = `
        <div class="msg-avatar-small" style="display:flex;align-items:center;justify-content:center;background:#042f2e;color:#2dd4bf;font-weight:bold;">۞</div>
        <div class="msg-bubble ${isRestricted ? 'syariah-warning' : ''}">
            ${arabicQuote ? `<span class="msg-arabic-quote">${arabicQuote}</span>` : ''}
            <div>${formattedText}</div>
            <span class="msg-time">${waktu || getWaktuSekarang()} • Zahra-e-Ghadir Khum${labelModel}</span>
        </div>
    `;
    container.appendChild(row);
}

function tampilkanTyping(containerId, isZahra) {
    const container = document.getElementById(containerId);
    const id = 'typing-' + Date.now();
    const row = document.createElement('div');
    row.id = id;
    row.className = 'chat-msg-row ai-row' + (isZahra ? ' zahra-row' : '');

    const avatarHTML = isZahra
        ? `<div class="msg-avatar-small" style="display:flex;align-items:center;justify-content:center;background:#042f2e;color:#2dd4bf;font-weight:bold;">۞</div>`
        : `<img src="${document.getElementById('ai-avatar-img')?.src || 'https://upload.wikimedia.org/wikipedia/commons/5/53/Hassan_al-Banna.jpg'}" alt="Hassan Al-Banna" class="msg-avatar-small">`;

    row.innerHTML = `
        ${avatarHTML}
        <div class="msg-bubble">
            <div class="typing-indicator"><span></span><span></span><span></span></div>
        </div>
    `;
    container.appendChild(row);
    container.scrollTop = container.scrollHeight;
    return id;
}

function hapusTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
