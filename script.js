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
// 1. SISTEM WAKTU REAL-TIME (JAM WIB KAFFAH - ASIA/JAKARTA)
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
// HELPER NAVIGASI HALAMAN
// =================================================================
function sembunyikanSemuaHalaman() {
    const pages = [
        'main-content',
        'calculator-page',
        'artikel-page',
        'games-page',
        'kiblat-page',
        'mapchart-page',
        'chatbot-page'
    ];
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden-page');
    });
}


// =================================================================
// 2. LOGIKA KALKULATOR DIGITAL ISLAMI
// =================================================================
function bukaKalkulator() {
    sembunyikanSemuaHalaman();
    document.getElementById('calculator-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);
}
function tutupKalkulator() {
    sembunyikanSemuaHalaman();
    document.getElementById('main-content').classList.remove('hidden-page');
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
// 3. LOGIKA PORTAL ARTIKEL SUARA ISLAMI (BLOG DINAMIS + SUPABASE)
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
    sembunyikanSemuaHalaman();
    document.getElementById('main-content').classList.remove('hidden-page');
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
// 4. LOGIKA KOMPILASI GAME ISLAMI (PUZZLE LOGO & MAPCHART)
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
    sembunyikanSemuaHalaman();
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
// 5. LOGIKA PENGECEK ARAH KIBLAT REAL-TIME (GPS + KOMPAS DEVICE)
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
    sembunyikanSemuaHalaman();
    document.getElementById('main-content').classList.remove('hidden-page');
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
// 6. CHATBOT AI ISLAMI — TERHUBUNG KE GROQ API (PERSONA AL-BANNA)
// =================================================================
const GROQ_API_KEY = "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"; // Contoh: "gsk_xxxxxxxxxxxx"
const GROQ_MODEL = "openai/gpt-oss-120b"; // Model cerdas & super cepat dari Groq

// Menyimpan riwayat percakapan agar AI ingat konteks obrolan sebelumnya
let riwayatChatGroq = [];
let chatInitialized = false;

// Instruksi Kepribadian (System Prompt) untuk Groq
const SYSTEM_PROMPT_AL_BANNA = `
Kamu adalah Asisten AI Islami pada website PortofolioMuslim milik Luqman Azkiya Athaillah (Luqman Pasha), seorang pelajar SMPIT As-Syifa Boarding School JalanCagak 1 yang memadukan teknologi IT dengan prinsip Islam.
Kepribadian & Gaya Bahasa:
- Mengadopsi gaya dakwah, kelembutan nasihat, ketegasan akidah, dan kebijaksanaan Imam Syahid Hassan Al-Banna (pendiri Ikhwanul Muslimin, 1928).
- Panggil pengguna dengan sapaan hangat seperti "wahai saudaraku" atau "saudaraku seperjuangan".
- Berikan jawaban yang terstruktur, mendalam, mencerahkan, dan mudah dipahami (gaya asisten modern seperti ChatGPT/DeepSeek namun berjiwa murabbi).
- Sesekali sertakan kutipan ayat Al-Qur'an, Hadits shahih, atau kaidah hikmah/Risalah Ta'lim yang relevan.
- Menguasai secara mendalam: Siroh & Sejarah Peradaban Islam dari abad ke-6 hingga abad ke-21 Masehi, Akidah Ahlus Sunnah wal Jamaah, 4 Madzhab Fikih (Hanafi, Maliki, Syafi'i, Hanbali) dengan sikap tasamuh/toleran terhadap perbedaan furu'iyah, Ilmu Fikih ibadah & muamalah, serta informasi lengkap tentang Luqman Azkiya Athaillah dan fitur-fitur di website ini (Kalkulator Digital, Portal Artikel Suara Islami, Game Puzzle & MapChart Dunia, Pengecek Arah Kiblat GPS, dan Chatbot ini).
- ATURAN SYARIAT KETAT: Jika pengguna bertanya atau meminta hal yang mengarah pada maksiat, judi, pornografi, pacaran/zina, minuman keras/narkoba, syirik/perdukunan, kekerasan/melukai diri, atau penghinaan terhadap agama, TOLAK dengan tegas namun berwibawa menggunakan dalil/nasihat Islam, lalu arahkan kembali ke kebaikan.
- Gunakan Bahasa Indonesia yang fasih dan beradab. Gunakan format **tebal** untuk poin-poin penting.
`;

function bukaChatbot() {
    sembunyikanSemuaHalaman();
    document.getElementById('chatbot-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);

    if (!chatInitialized) {
        resetChat();
        chatInitialized = true;
    }
    setTimeout(() => {
        const input = document.getElementById('chat-input');
        if (input) input.focus();
    }, 100);
}

function tutupChatbot() {
    sembunyikanSemuaHalaman();
    document.getElementById('main-content').classList.remove('hidden-page');
}

function getWaktuSekarang() {
    const now = new Date();
    return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function resetChat() {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    container.innerHTML = '';

    // Reset memori percakapan Groq
    riwayatChatGroq = [
        { role: "system", content: SYSTEM_PROMPT_AL_BANNA }
    ];

    tambahPesanAI(
        "Assalamu'alaikum warahmatullahi wabarakatuh, wahai saudaraku seperjuangan. ☪️\n\n" +
        "Selamat datang di majelis ilmu digital pada portofolio **Luqman Azkiya Athaillah**. Sekarang aku telah terhubung dengan kecerdasan buatan **Groq** untuk menemani muzakarah kita.\n\n" +
        "Silakan tanyakan apa saja seputar **Siroh Islam (Abad ke-6 hingga ke-21 M)**, **Akidah**, **Madzhab-madzhab Islam**, **Ilmu Fikih**, atau tentang **pembuat dan isi website ini**!",
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
    );
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

    // Tampilkan pesan user di layar
    tambahPesanUser(teks);
    input.value = '';
    input.disabled = true;
    if (btnSend) btnSend.disabled = true;

    // 1. Lapis Pertama: Filter Syariat Lokal Instan (agar langsung terblokir sebelum kirim ke API)
    if (cekPelanggaranSyariat(teks)) {
        tambahPesanAI(
            "⚠️ **Maaf, wahai saudaraku.** Permintaan atau pembahasan ini mengarah pada hal yang bertentangan dengan **Syariat Islam**, adab, dan kemaslahatan diri.\n\n" +
            "Sebagai seorang Muslim, kita diperintahkan menjaga hati, lisan, dan langkah dari segala pintu keburukan. Mari kita alihkan diskusi kepada hal-hal yang mendatangkan ilmu bermanfaat dan ridha Allah Subhanahu wa Ta'ala.",
            "وَلَا تَقْرَبُوا الْفَوَاحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ",
            true
        );
        input.disabled = false;
        if (btnSend) btnSend.disabled = false;
        input.focus();
        return;
    }

    // Tambahkan pertanyaan user ke memori riwayat Groq
    riwayatChatGroq.push({ role: "user", content: teks });

    // Tampilkan animasi mengetik
    const typingId = tampilkanTyping();

    try {
        // Cek apakah API Key sudah diisi
        if (!GROQ_API_KEY || GROQ_API_KEY.includes("TEMPEL_API_KEY")) {
            throw new Error("API Key Groq belum dimasukkan di script.js.");
        }

        // Panggil API Groq
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: riwayatChatGroq,
                temperature: 0.7,
                max_tokens: 1024
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Gagal terhubung ke server Groq.");
        }

        const balasanAI = data.choices[0].message.content;

        // Simpan balasan AI ke memori percakapan agar nyambung untuk pertanyaan berikutnya
        riwayatChatGroq.push({ role: "assistant", content: balasanAI });

        // Batasi riwayat maksimal 12 pesan terakhir agar tetap ringan & hemat token
        if (riwayatChatGroq.length > 13) {
            riwayatChatGroq = [
                riwayatChatGroq[0], // Pertahankan system prompt
                ...riwayatChatGroq.slice(-12)
            ];
        }

        hapusTyping(typingId);
        tambahPesanAI(balasanAI);

    } catch (error) {
        hapusTyping(typingId);
        tambahPesanAI(
            `⚠️ **Terjadi kendala koneksi AI:** ${error.message}\n\n` +
            "Pastikan kamu sudah menempelkan **GROQ_API_KEY** yang valid di bagian atas blok Chatbot pada file `script.js` dan perangkat terhubung ke internet.",
            "",
            true
        );
    } finally {
        input.disabled = false;
        if (btnSend) btnSend.disabled = false;
        input.focus();
    }
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

function tambahPesanUser(teks) {
    const container = document.getElementById('chat-messages');
    const row = document.createElement('div');
    row.className = 'chat-msg-row user-row';
    row.innerHTML = `
        <div class="msg-bubble">
            ${escapeHTML(teks)}
            <span class="msg-time">${getWaktuSekarang()}</span>
        </div>
    `;
    container.appendChild(row);
    container.scrollTop = container.scrollHeight;
}

function tambahPesanAI(teks, arabicQuote = '', isRestricted = false) {
    const container = document.getElementById('chat-messages');
    const avatarSrc = document.getElementById('ai-avatar-img')?.src || 'https://upload.wikimedia.org/wikipedia/commons/5/53/Hassan_al-Banna.jpg';

    // Format Markdown sederhana dari balasan Groq (bold, italic, list, baris baru)
    let formattedText = escapeHTML(teks)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');

    const row = document.createElement('div');
    row.className = 'chat-msg-row ai-row';
    row.innerHTML = `
        <img src="${avatarSrc}" alt="Hassan Al-Banna" class="msg-avatar-small">
        <div class="msg-bubble ${isRestricted ? 'syariah-warning' : ''}">
            ${arabicQuote ? `<span class="msg-arabic-quote">${arabicQuote}</span>` : ''}
            <div>${formattedText}</div>
            <span class="msg-time">${getWaktuSekarang()} • Groq AI (Al-Banna Persona)</span>
        </div>
    `;
    container.appendChild(row);
    container.scrollTop = container.scrollHeight;
}

function tampilkanTyping() {
    const container = document.getElementById('chat-messages');
    const avatarSrc = document.getElementById('ai-avatar-img')?.src || 'https://upload.wikimedia.org/wikipedia/commons/5/53/Hassan_al-Banna.jpg';
    const id = 'typing-' + Date.now();

    const row = document.createElement('div');
    row.id = id;
    row.className = 'chat-msg-row ai-row';
    row.innerHTML = `
        <img src="${avatarSrc}" alt="Hassan Al-Banna" class="msg-avatar-small">
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
