// =================================================================
// 0. KONFIGURASI SUPABASE DATABASE (PENYIMPANAN PERMANEN CLOUD)
// =================================================================
const SUPABASE_URL = "https://wyjdwrwizzxmtwmyrhah.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_0DBqgof5g7HiSw25CyF7iA_9kf778fB";

// ===== PATCH: GUARD SUPABASE BELUM DIKONFIGURASI =====
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
// 1. SISTEM WAKTU REAL-TIME (JAM WIB) — DIPERBAIKI
// =================================================================
function updateJamWIB() {
    const now = new Date();
    // Konversi ke WIB (UTC+7)
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
        display.value = eval(display.value.replace(/×/g, '*').replace(/÷/g, '/'));
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
// 4. LOGIKA KOMPILASI GAME ISLAMI (PUZZLE LOGO & MAPCHART)
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
    } while (!isSolvable(puzzleBoard, puzzleGridSize));

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

let leafletMap = null;
let mapMarkers = [];

function bukaMapChart() {
    document.getElementById('games-page').classList.add('hidden-page');
    document.getElementById('mapchart-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);

    setTimeout(() => {
        if (!leafletMap) {
            leafletMap = L.map('leaflet-map').setView([20, 0], 2);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(leafletMap);

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
    mapMarkers.forEach(m => leafletMap.removeLayer(m));
    mapMarkers = [];
    alert("MapChart berhasil di-reset!");
}


// =================================================================
// 5. LOGIKA PENGECEK ARAH KIBLAT REAL-TIME (GPS & KOMPAS)
// =================================================================
function bukaKiblat() {
    document.getElementById('main-content').classList.add('hidden-page');
    document.getElementById('kiblat-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);
    initQiblaTracker();
}
function tutupKiblat() {
    document.getElementById('kiblat-page').classList.add('hidden-page');
    document.getElementById('main-content').classList.remove('hidden-page');
}
function initQiblaTracker() {
    const statusText = document.getElementById('kiblat-status-text');
    const coordsText = document.getElementById('user-coords');
    const qiblaDegText = document.getElementById('qibla-degree');

    if ('geolocation' in navigator) {
        statusText.textContent = "Mendeteksi lokasi GPS Anda...";
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                coordsText.textContent = `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;

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

                let
