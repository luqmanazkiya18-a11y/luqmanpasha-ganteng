// =================================================================
// 1. SISTEM WAKTU REAL-TIME (JAM WIB)
// =================================================================
function updateJamWIB() {
    const now = new Date();
    const jamElement = document.getElementById('jam-wib');
    if (jamElement) {
        const jam = String(now.getHours()).padStart(2, '0');
        const menit = String(now.getMinutes()).padStart(2, '0');
        const detik = String(now.getSeconds()).padStart(2, '0');
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

function clearDisplay() {
    document.getElementById('calc-display').value = '';
}

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
    initPuzzle();
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
    if (!boardEl) return;

    boardEl.innerHTML = '';
    winMsg.classList.add('hidden');
    stepCountEl.textContent = '0';

    boardEl.style.gridTemplateColumns = `repeat(${puzzleGridSize}, 1fr)`;
    boardEl.style.gridTemplateRows = `repeat(${puzzleGridSize}, 1fr)`;

    const totalTiles = puzzleGridSize * puzzleGridSize;
    puzzleBoard = Array.from({ length: totalTiles }, (_, i) => i);
    
    for (let i = puzzleBoard.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [puzzleBoard[i], puzzleBoard[j]] = [puzzleBoard[j], puzzleBoard[i]];
    }

    renderPuzzleTiles();
}

function renderPuzzleTiles() {
    const boardEl = document.getElementById('puzzle-board');
    boardEl.innerHTML = '';
    const logoSelect = document.getElementById('puzzle-image-select').value;
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
            tile.style.backgroundPosition = `${(col / (puzzleGridSize - 1)) * 100}% ${(row / (puzzleGridSize - 1)) * 100}%`;
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
                
                let qiblaDeg = (qiblaRad * 180) / Math.PI;
                if (qiblaDeg < 0) qiblaDeg += 360;

                qiblaDegText.textContent = `${Math.round(qiblaDeg)}°`;
                document.getElementById('qibla-marker').style.transform = `rotate(${qiblaDeg}deg)`;
                statusText.textContent = "Arah Kiblat Berhasil Ditemukan!";
            },
            (err) => {
                statusText.textContent = "Gagal mengakses GPS. Izinkan lokasi di browser Anda.";
            }
        );
    } else {
        statusText.textContent = "Browser Anda tidak mendukung Geolocation.";
    }
}


// =================================================================
// 6. LOGIKA SPOTIFY ISLAMI PLAYER (AUDIO MP3 & UPLOAD)
// =================================================================
let tracksData = [
    { title: "Ya Syahid - Sayyid Quthb", artist: "Nasyid Perjuangan", album: "Perjuangan", duration: "03:45", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=100&auto=format&fit=crop" },
    { title: "At-Tarbiyah - Hassan Al-Banna", artist: "Munasyid Perjuangan", album: "Gelora Islam", duration: "04:12", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&auto=format&fit=crop" },
    { title: "Surah Ar-Rahman", artist: "Mishary Rashid Alafasy", album: "Murottal Al-Qur'an", duration: "15:30", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=100&auto=format&fit=crop" }
];

function bukaSpotify() {
    document.getElementById('main-content').classList.add('hidden-page');
    document.getElementById('spotify-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);
    renderTracklist();
}

function tutupSpotify() {
    document.getElementById('spotify-page').classList.add('hidden-page');
    document.getElementById('main-content').classList.remove('hidden-page');
}

function renderTracklist() {
    const listEl = document.getElementById('dynamic-tracklist');
    const countEl = document.getElementById('total-track-count');
    if (!listEl) return;

    listEl.innerHTML = '';
    countEl.textContent = tracksData.length;

    tracksData.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'track-row';
        item.innerHTML = `
            <span class="col-num">${index + 1}</span>
            <span class="col-title">${track.title}</span>
            <span class="col-album">${track.album}</span>
            <span class="col-time">${track.duration}</span>
        `;
        item.onclick = () => playAudio(track);
        listEl.appendChild(item);
    });
}

function playAudio(track) {
    const player = document.getElementById('spotify-audio-player');
    const songTitle = document.getElementById('current-song');
    const songArtist = document.getElementById('current-artist');
    const songCover = document.getElementById('current-cover');

    player.src = track.url;
    player.play();

    songTitle.textContent = track.title;
    songArtist.textContent = track.artist;
    songCover.src = track.cover;
}

function uploadMP3Baru(input) {
    const file = input.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file);
        const newTrack = {
            title: file.name.replace('.mp3', ''),
            artist: 'Upload Lokal (Anda)',
            album: 'Koleksi Saya',
            duration: 'MP3 File',
            url: objectURL,
            cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&auto=format&fit=crop'
        };
        tracksData.unshift(newTrack);
        renderTracklist();
        playAudio(newTrack);
        alert('🎵 Berhasil menambahkan dan memutar lagu MP3 Anda!');
    }
}

function tambahURLMP3() {
    const urlInput = document.getElementById('custom-mp3-url');
    if (urlInput.value.trim() !== '') {
        const newTrack = {
            title: 'Lagu dari Link URL',
            artist: 'Audio Web',
            album: 'Streaming Link',
            duration: 'MP3 Link',
            url: urlInput.value.trim(),
            cover: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=100&auto=format&fit=crop'
        };
        tracksData.unshift(newTrack);
        renderTracklist();
        playAudio(newTrack);
        urlInput.value = '';
    }
}

function pilihArtis(artisName) {
    alert(`Menampilkan daftar audio dari: ${artisName}`);
}


// =================================================================
// 7. LOGIKA BLOGGER, KONTROL ADMIN & FITUR LUPA / RESET PASSWORD
// =================================================================
function getAdminPassword() {
    return localStorage.getItem('admin_blog_password') || 'luqman123';
}

function setAdminPassword(newPassword) {
    localStorage.setItem('admin_blog_password', newPassword);
}

function bukaBlog() {
    document.getElementById('main-content').classList.add('hidden-page');
    document.getElementById('blog-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);
}

function tutupBlog() {
    document.getElementById('blog-page').classList.add('hidden-page');
    document.getElementById('main-content').classList.remove('hidden-page');
}

function bukaModalAdminLogin() {
    document.getElementById('modal-admin-login').classList.remove('hidden');
    document.getElementById('admin-pass-input').focus();
}

function tutupModalAdminLogin() {
    document.getElementById('modal-admin-login').classList.add('hidden');
    document.getElementById('login-error-msg').classList.add('hidden');
    document.getElementById('admin-pass-input').value = '';
}

function handleAdminEnter(e) {
    if (e.key === 'Enter') {
        verifikasiPasswordAdmin();
    }
}

function verifikasiPasswordAdmin() {
    const inputPass = document.getElementById('admin-pass-input').value;
    const errorMsg = document.getElementById('login-error-msg');
    const currentPass = getAdminPassword();

    if (inputPass === currentPass) {
        tutupModalAdminLogin();
        document.getElementById('admin-editor-panel').classList.remove('hidden');
        document.getElementById('btn-admin-login').classList.add('hidden');
        document.getElementById('btn-admin-logout').classList.remove('hidden');
        alert('✅ Login Admin Berhasil! Selamat datang Luqman Pasha.');
    } else {
        errorMsg.classList.remove('hidden');
    }
}

function logoutAdmin() {
    document.getElementById('admin-editor-panel').classList.add('hidden');
    document.getElementById('btn-admin-login').classList.remove('hidden');
    document.getElementById('btn-admin-logout').classList.add('hidden');
    alert('🔒 Anda telah keluar dari Mode Admin.');
}

function bukaModalGantiPassword() {
    document.getElementById('modal-ganti-password').classList.remove('hidden');
}

function tutupModalGantiPassword() {
    document.getElementById('modal-ganti-password').classList.add('hidden');
    document.getElementById('change-pass-error').classList.add('hidden');
    document.getElementById('pass-lama-input').value = '';
    document.getElementById('pass-baru-input').value = '';
    document.getElementById('pass-konfirmasi-input').value = '';
}

function simpanPasswordBaru() {
    const passLama = document.getElementById('pass-lama-input').value;
    const passBaru = document.getElementById('pass-baru-input').value;
    const passKonfirmasi = document.getElementById('pass-konfirmasi-input').value;
    const errorMsg = document.getElementById('change-pass-error');
    const currentPass = getAdminPassword();

    if (passLama !== currentPass) {
        errorMsg.innerText = "❌ Password lama yang Anda masukkan salah!";
        errorMsg.classList.remove('hidden');
        return;
    }

    if (passBaru === "" || passBaru !== passKonfirmasi) {
        errorMsg.innerText = "❌ Password baru dan konfirmasi tidak cocok atau kosong!";
        errorMsg.classList.remove('hidden');
        return;
    }

    setAdminPassword(passBaru);
    tutupModalGantiPassword();
    alert("🎉 Password Admin Anda berhasil diperbarui! Gunakan password baru ini untuk login berikutnya.");
}

// LOGIKA KHUSUS RESET / LUPA PASSWORD
function bukaModalResetPassword() {
    tutupModalAdminLogin();
    document.getElementById('modal-reset-password').classList.remove('hidden');
}

function tutupModalResetPassword() {
    document.getElementById('modal-reset-password').classList.add('hidden');
    document.getElementById('reset-pass-error').classList.add('hidden');
    document.getElementById('security-answer-1').value = '';
    document.getElementById('security-answer-2').value = '';
    document.getElementById('reset-pass-baru').value = '';
}

function prosesResetPassword() {
    const ans1 = document.getElementById('security-answer-1').value.toLowerCase().trim();
    const ans2 = document.getElementById('security-answer-2').value.toLowerCase().trim();
    const passBaru = document.getElementById('reset-pass-baru').value;
    const errorMsg = document.getElementById('reset-pass-error');

    // Kunci Jawaban Verifikasi Keamanan (Berdasarkan profil Luqman Azkiya Athaillah / Luqman Pasha & SMPIT As-Syifa)
    const validAns1 = ans1.includes('luqman');
    const validAns2 = ans2.includes('syifa') || ans2.includes('assyifa') || ans2.includes('as-syifa');

    if (validAns1 && validAns2) {
        if (passBaru === "") {
            errorMsg.innerText = "❌ Masukkan password baru yang valid!";
            errorMsg.classList.remove('hidden');
            return;
        }

        setAdminPassword(passBaru);
        tutupModalResetPassword();
        alert("🎉 Password Admin berhasil di-reset! Silakan login kembali dengan password baru Anda.");
    } else {
        errorMsg.innerText = "❌ Jawaban verifikasi keamanan salah! Akses reset ditolak.";
        errorMsg.classList.remove('hidden');
    }
}

function tambahPostinganBaru(e) {
    e.preventDefault();

    const judul = document.getElementById('post-title').value;
    const kategori = document.getElementById('post-category').value;
    const imgUrl = document.getElementById('post-image').value || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&auto=format&fit=crop';
    const konten = document.getElementById('post-content').value;

    const container = document.getElementById('blog-posts-container');
    const tglHariIni = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const newPostHTML = `
        <article class="blog-card" style="animation: fadeIn 0.5s ease;">
            <div class="card-thumb">
                <img src="${imgUrl}" alt="${judul}">
                <span class="card-cat">${kategori}</span>
            </div>
            <div class="card-content">
                <div class="card-meta">
                    <span>📅 ${tglHariIni}</span> • <span>✍️ Luqman Azkiya Athaillah</span>
                </div>
                <h3 class="card-title">${judul}</h3>
                <p class="card-snippet">${konten}</p>
                
                <div class="post-spotify-promo" onclick="tutupBlog(); bukaSpotify();">
                    <span>🎧 Dengarkan Nasyid & Tilawah Pendukung Artikel Ini di Spotify Islami &rarr;</span>
                </div>

                <div class="card-actions">
                    <button class="btn-like" onclick="likePost(this)">❤️ <span>0</span> Suka</button>
                    <button class="btn-share" onclick="sharePost('${judul}')">🔗 Bagikan</button>
                </div>
            </div>
        </article>
    `;

    container.insertAdjacentHTML('afterbegin', newPostHTML);
    document.getElementById('form-buat-post').reset();
    alert('🚀 Postingan artikel baru berhasil diterbitkan!');
}

function likePost(btn) {
    const countSpan = btn.querySelector('span');
    let count = parseInt(countSpan.innerText);
    count++;
    countSpan.innerText = count;
    btn.style.color = '#ef4444';
    btn.style.borderColor = '#ef4444';
}

function sharePost(title) {
    navigator.clipboard.writeText(window.location.href);
    alert(`🔗 Tautan artikel "${title}" berhasil disalin ke clipboard!`);
}
