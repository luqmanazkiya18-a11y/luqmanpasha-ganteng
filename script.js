// =================================================================
// 0. KONFIGURASI FIREBASE DATABASE (PENYIMPANAN PERMANEN CLOUD)
// =================================================================
const firebaseConfig = {
    apiKey: "PASTE_API_KEY_ANDA_DI_SINI",
    authDomain: "NAMA_PROJECT.firebaseapp.com",
    projectId: "NAMA_PROJECT",
    storageBucket: "NAMA_PROJECT.appspot.com",
    messagingSenderId: "XXXXXXXXXX",
    appId: "X:XXXXXXXXXX:web:XXXXXXXXXX"
};

// ===== PATCH: GUARD FIREBASE BELUM DIKONFIGURASI =====
let firebaseReady = false;
try {
    if (typeof firebase !== 'undefined' &&
        firebaseConfig.apiKey &&
        !firebaseConfig.apiKey.includes('PASTE_API_KEY')) {
        firebase.initializeApp(firebaseConfig);
        firebaseReady = true;
    } else {
        console.warn('⚠️ Firebase belum dikonfigurasi. Fitur blog cloud dinonaktifkan.');
    }
} catch (e) {
    console.warn('⚠️ Firebase init gagal:', e.message);
}
const db = firebaseReady ? firebase.firestore() : null;


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
    // PATCH: tunggu DOM siap sebelum init
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

    // PATCH: pastikan puzzle selalu punya solusi (shuffle dengan parity check)
    do {
        for (let i = puzzleBoard.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [puzzleBoard[i], puzzleBoard[j]] = [puzzleBoard[j], puzzleBoard[i]];
        }
    } while (!isSolvable(puzzleBoard, puzzleGridSize));

    renderPuzzleTiles();
}

// PATCH: cek puzzle solvable
function isSolvable(board, size) {
    let inversions = 0;
    const arr = board.filter(v => v !== board.length - 1);
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) inversions++;
        }
    }
    if (size % 2 === 1) return inversions % 2 === 0;
    // size genap
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
            // PATCH: hindari division by zero saat gridSize=1
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
    if (!player) return;
    player.src = track.url;
    player.play().catch(e => console.warn('Audio play error:', e));
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
// 7. LOGIKA SISTEM BLOGGER: CRUD PERMANEN VIA FIREBASE CLOUD
// =================================================================
let isAdminLoggedIn = false;

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
    renderBlogPosts();
}
function tutupBlog() {
    document.getElementById('blog-page').classList.add('hidden-page');
    document.getElementById('main-content').classList.remove('hidden-page');
}

// PATCH: bukaBlog guard jika blog-page tidak ada
function bukaBlogSafe() {
    const page = document.getElementById('blog-page');
    if (!page) { alert('Halaman blog belum tersedia.'); return; }
    bukaBlog();
}

function bukaModalAdminLogin() {
    const m = document.getElementById('modal-admin-login');
    if (!m) return;
    m.classList.remove('hidden');
    document.getElementById('admin-pass-input').focus();
}
function tutupModalAdminLogin() {
    const m = document.getElementById('modal-admin-login');
    if (!m) return;
    m.classList.add('hidden');
    document.getElementById('login-error-msg').classList.add('hidden');
    document.getElementById('admin-pass-input').value = '';
}
function handleAdminEnter(e) {
    if (e.key === 'Enter') verifikasiPasswordAdmin();
}
function verifikasiPasswordAdmin() {
    const inputPass = document.getElementById('admin-pass-input').value;
    const errorMsg = document.getElementById('login-error-msg');
    const currentPass = getAdminPassword();

    if (inputPass === currentPass) {
        isAdminLoggedIn = true;
        tutupModalAdminLogin();
        document.getElementById('admin-editor-panel').classList.remove('hidden');
        document.getElementById('btn-admin-login').classList.add('hidden');
        document.getElementById('btn-admin-logout').classList.remove('hidden');
        renderBlogPosts();
        alert('✅ Login Admin Berhasil! Selamat datang Luqman Pasha.');
    } else {
        errorMsg.classList.remove('hidden');
    }
}
function logoutAdmin() {
    isAdminLoggedIn = false;
    document.getElementById('admin-editor-panel').classList.add('hidden');
    document.getElementById('btn-admin-login').classList.remove('hidden');
    document.getElementById('btn-admin-logout').classList.add('hidden');
    batalEditPost();
    renderBlogPosts();
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
    alert("🎉 Password Admin Anda berhasil diperbarui!");
}
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
        alert("🎉 Password Admin berhasil di-reset! Silakan login kembali.");
    } else {
        errorMsg.innerText = "❌ Jawaban verifikasi keamanan salah! Akses ditolak.";
        errorMsg.classList.remove('hidden');
    }
}

// PATCH: Guard Firebase di renderBlogPosts
function renderBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

    if (!firebaseReady || !db) {
        container.innerHTML = `<p style="color:#94a3b8; text-align:center; padding:20px;">⚠️ Firebase belum dikonfigurasi. Isi <code>firebaseConfig</code> di script.js untuk mengaktifkan fitur blog cloud.</p>`;
        return;
    }

    db.collection("posts").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
        container.innerHTML = '';
        if (snapshot.empty) {
            container.innerHTML = `<p style="color:#94a3b8; text-align:center;">Belum ada postingan artikel. Silakan buat melalui Mode Admin.</p>`;
            return;
        }
        snapshot.forEach((doc) => {
            const post = doc.data();
            const id = doc.id;
            const article = document.createElement('article');
            article.className = 'blog-card';
            article.style.animation = 'fadeIn 0.4s ease';

            const adminButtonsHTML = isAdminLoggedIn ? `
                <button class="btn-edit-post" onclick="editPost('${id}')">✏️ Edit</button>
                <button class="btn-delete-post" onclick="hapusPost('${id}')">🗑️ Hapus</button>
            ` : '';

            article.innerHTML = `
                <div class="card-thumb">
                    <img src="${post.image}" alt="${post.title}">
                    <span class="card-cat">${post.category}</span>
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span>📅 ${post.date}</span> • <span>✍️ ${post.author}</span>
                    </div>
                    <h3 class="card-title">${post.title}</h3>
                    <p class="card-snippet">${post.content}</p>
                    <div class="post-spotify-promo" onclick="tutupBlog(); bukaSpotify();">
                        <span>🎧 Dengarkan Nasyid & Tilawah Pendukung Artikel Ini di Spotify Islami &rarr;</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn-like" onclick="likePost(this, '${id}', ${post.likes || 0})">❤️ <span>${post.likes || 0}</span> Suka</button>
                        <button class="btn-share" onclick="sharePost('${post.title.replace(/'/g, "\\'")}')">🔗 Bagikan</button>
                        ${adminButtonsHTML}
                    </div>
                </div>
            `;
            container.appendChild(article);
        });
    }, (error) => {
        console.error("Gagal mengambil data dari Firebase:", error);
    });
}

function tambahPostinganBaru(e) {
    e.preventDefault();
    if (!firebaseReady || !db) { alert('⚠️ Firebase belum dikonfigurasi.'); return; }

    const editId = document.getElementById('edit-post-id').value;
    const judul = document.getElementById('post-title').value;
    const kategori = document.getElementById('post-category').value;
    const imgUrl = document.getElementById('post-image').value || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&auto=format&fit=crop';
    const konten = document.getElementById('post-content').value;

    if (editId) {
        db.collection("posts").doc(editId).update({
            title: judul, category: kategori, image: imgUrl, content: konten
        }).then(() => {
            alert('✏️ Postingan berhasil diperbarui di server cloud!');
            batalEditPost();
        }).catch((err) => alert("Gagal memperbarui artikel: " + err.message));
    } else {
        const tglHariIni = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        db.collection("posts").add({
            title: judul, category: kategori, date: tglHariIni,
            author: "Luqman Azkiya Athaillah", image: imgUrl, content: konten,
            likes: 0, createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert('🚀 Postingan baru berhasil diterbitkan secara permanen!');
            batalEditPost();
        }).catch((err) => alert("Gagal menerbitkan artikel: " + err.message));
    }
}

function editPost(id) {
    if (!db) return;
    db.collection("posts").doc(id).get().then((doc) => {
        if (doc.exists) {
            const post = doc.data();
            document.getElementById('edit-post-id').value = id;
            document.getElementById('post-title').value = post.title;
            document.getElementById('post-category').value = post.category;
            document.getElementById('post-image').value = post.image;
            document.getElementById('post-content').value = post.content;
            document.getElementById('form-panel-title').innerText = '✏️ Panel Admin Blogger - Edit Postingan';
            document.getElementById('btn-submit-post').innerText = '💾 Simpan Perubahan Artikel';
            document.getElementById('btn-cancel-edit').classList.remove('hidden');
            document.getElementById('admin-editor-panel').scrollIntoView({ behavior: 'smooth' });
        }
    }).catch((err) => alert("Gagal memuat artikel: " + err.message));
}

function batalEditPost() {
    document.getElementById('edit-post-id').value = '';
    document.getElementById('form-buat-post').reset();
    document.getElementById('form-panel-title').innerText = '✍️ Panel Admin Blogger - Buat Postingan Baru';
    document.getElementById('btn-submit-post').innerText = '🚀 Terbitkan Postingan Baru';
    document.getElementById('btn-cancel-edit').classList.add('hidden');
}

function hapusPost(id) {
    if (!db) return;
    if (confirm('⚠️ Apakah Anda yakin ingin menghapus postingan artikel ini secara permanen dari server?')) {
        db.collection("posts").doc(id).delete().then(() => {
            alert('🗑️ Postingan artikel berhasil dihapus dari server cloud!');
        }).catch((err) => alert("Gagal menghapus artikel: " + err.message));
    }
}

function likePost(btn, id, currentLikes) {
    if (!db) return;
    db.collection("posts").doc(id).update({ likes: currentLikes + 1 }).then(() => {
        btn.style.color = '#ef4444';
        btn.style.borderColor = '#ef4444';
    });
}

function sharePost(title) {
    navigator.clipboard.writeText(window.location.href);
    alert(`🔗 Tautan artikel "${title}" berhasil disalin ke clipboard!`);
}


// =================================================================
// 8. CHATBOT AI ISLAMI - KEPRIBADIAN HASSAN AL-BANNA
// =================================================================
let chatbotHistory = [];
let chatbotIsProcessing = false;

// ===== KONFIGURASI API (ISI DENGAN API KEY ANDA) =====
const CHATBOT_API_CONFIG = {
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    apiKey: "PASTE_API_KEY_ANDA_DI_SINI", // ⚠️ Ganti dengan API key asli
    model: "meta-llama/llama-3.1-8b-instruct:free"
};

// ===== SYSTEM PROMPT: KEPRIBADIAN HASSAN AL-BANNA =====
const HASAN_AL_BANNA_PERSONA = `
Anda adalah asisten AI dengan kepribadian Hassan Al-Banna (1906-1949), pendiri Ikhwanul Muslimin.
Anda berbicara dengan gaya beliau: hangat, bersemangat, puitis, penuh hikmah, dan selalu merujuk pada Al-Qur'an & Sunnah.
Anda memanggil pengguna dengan sapaan "saudaraku" atau "akh/ukhti" secara sopan.
Anda sering menggunakan ungkapan: "Wallahu a'lam bish-shawab", "InsyaAllah", "Barakallahu fiik".
Anda menekankan pentingnya: Tarbiyah, Al-Qur'an sebagai pedoman, persatuan umat, dan akhlak mulia.

GAYA BAHASA:
- Ramah, penuh semangat, dan menginspirasi.
- Bahasa Indonesia yang baik, boleh sesekali menyelipkan istilah Arab.
- Jawab dengan terstruktur (poin-poin) bila perlu.
- Tidak bertele-tele, tapi tetap hangat.

ATURAN KETAT (WAJIB DIPATUHI):
1. DILARANG memberikan fatwa hukum syariat detail. Arahkan ke ulama berkompeten.
2. DILARANG membahas/mendukung: terorisme, kekerasan, bunuh diri, radikalisme, atau aktivitas bertentangan dengan syariat (judi, riba, zina, narkoba, khamr, LGBT, pornografi, sihir).
3. Jika pertanyaan mengarah ke pelanggaran syariat, tolak dengan sopan dan arahkan ke topik bermanfaat.
4. Jangan menghina, merendahkan, atau menyerang individu/kelompok.
5. Jangan membahas politik praktis atau mendiskreditkan pemerintah.
6. Jawaban maksimal 4 paragraf pendek atau 5 poin. Ringkas dan jelas.
7. Jika tidak tahu, katakan jujur dan sarankan rujukan.
8. Selalu tutup dengan doa singkat atau kalimat penutup menyejukkan hati.

Selalu jawab dalam Bahasa Indonesia.
`;

// ===== DETEKSI PERTANYAAN MELANGGAR SYARIAT =====
const FORBIDDEN_PATTERNS = [
    /\b(teror|bom|jihad\s+untuk\s+serang|bunuh|radikal|khilafah\s+darurat)\b/i,
    /\b(judi|togel|slot|kasino|riba|bunga\s+bank|miras|khamr|alkohol|narkoba|sabu|ganja|obat\s+terlarang)\b/i,
    /\b(zina|selingkuh|seks\s+bebas|lGBT|lesbi|gay|homo|transgender|pornografi|video\s+mesum|situs\s+dewas)\b/i,
    /\b(sihir|dajjal|ramalan|dukun|jimat|pesugihan|tumbal)\b/i,
    /\b(agama\s+teror|Islam\s+teroris|muhammad\s+penipu|bohong\s+Islam)\b/i
];

function adalahPertanyaanTerlarang(text) {
    return FORBIDDEN_PATTERNS.some(regex => regex.test(text));
}

// ===== BUKA / TUTUP HALAMAN =====
function bukaChatbot() {
    document.getElementById('main-content').classList.add('hidden-page');
    document.getElementById('chatbot-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);
    setTimeout(() => {
        const inp = document.getElementById('chatbot-input');
        if (inp) inp.focus();
    }, 300);
}
function tutupChatbot() {
    document.getElementById('chatbot-page').classList.add('hidden-page');
    document.getElementById('main-content').classList.remove('hidden-page');
}

// ===== CLEAR CHAT =====
function clearChat() {
    if (chatbotHistory.length === 0) return;
    if (!confirm('Hapus semua riwayat percakapan?')) return;
    chatbotHistory = [];
    document.getElementById('chatbot-messages').innerHTML = '';
    document.getElementById('chatbot-welcome').style.display = 'block';
    document.getElementById('chatbot-suggestions').style.display = 'flex';
}

// ===== RENDER PESAN =====
function renderPesan(role, text) {
    const container = document.getElementById('chatbot-messages');
    if (!container) return;

    const row = document.createElement('div');
    row.className = `msg-row ${role === 'user' ? 'user' : 'bot'}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    if (role === 'user') {
        avatar.textContent = '👤';
    } else {
        avatar.innerHTML = '<span style="color:#ffd700;font-size:1rem;">☪</span>';
    }

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    let safe = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/\*(.+?)\*/g, '<em>$1</em>');
    safe = safe.replace(/\n/g, '<br>');
    bubble.innerHTML = safe;

    row.appendChild(avatar);
    row.appendChild(bubble);
    container.appendChild(row);

    const welcome = document.getElementById('chatbot-welcome');
    const sugg = document.getElementById('chatbot-suggestions');
    if (welcome) welcome.style.display = 'none';
    if (sugg) sugg.style.display = 'none';

    const viewport = document.getElementById('chatbot-viewport');
    setTimeout(() => { if (viewport) viewport.scrollTop = viewport.scrollHeight; }, 80);
}

// ===== KIRIM PESAN CEPAT DARI CHIP =====
function kirimPesanCepat(text) {
    const inp = document.getElementById('chatbot-input');
    if (!inp) return;
    inp.value = text;
    kirimPesanChatbot();
}

// ===== FUNGSI UTAMA: KIRIM PESAN KE AI =====
async function kirimPesanChatbot() {
    if (chatbotIsProcessing) return;

    const input = document.getElementById('chatbot-input');
    if (!input) return;
    const userText = input.value.trim();
    if (!userText) return;

    renderPesan('user', userText);
    input.value = '';
    chatbotHistory.push({ role: 'user', content: userText });

    // ===== VALIDASI RESTRIKSI SYARIAT =====
    if (adalahPertanyaanTerlarang(userText)) {
        const tolakan = "Astaghfirullah, saudaraku. Pertanyaan tersebut mengarah pada hal yang bertentangan dengan syariat Islam. Sebagai asisten yang berpegang pada Al-Qur'an dan Sunnah, saya tidak dapat membahas topik itu. Mari kita alihkan kepada hal yang lebih bermanfaat — misalnya tentang tarbiyah, akhlak, atau sejarah perjuangan Islam. Barakallahu fiik. ☪";
        renderPesan('bot', tolakan);
        chatbotHistory.push({ role: 'assistant', content: tolakan });
        return;
    }

    chatbotIsProcessing = true;
    const typingEl = document.getElementById('chatbot-typing');
    if (typingEl) typingEl.classList.remove('hidden');

    try {
        // Jika API key belum diisi → mode demo offline
        if (!CHATBOT_API_CONFIG.apiKey || CHATBOT_API_CONFIG.apiKey.includes('PASTE_API_KEY')) {
            await new Promise(r => setTimeout(r, 1200));
            const jawabanLokal = jawabanFallback(userText);
            if (typingEl) typingEl.classList.add('hidden');
            renderPesan('bot', jawabanLokal);
            chatbotHistory.push({ role: 'assistant', content: jawabanLokal });
            chatbotIsProcessing = false;
            return;
        }

        const messages = [
            { role: 'system', content: HASAN_AL_BANNA_PERSONA },
            ...chatbotHistory.slice(-10)
        ];

        const response = await fetch(CHATBOT_API_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CHATBOT_API_CONFIG.apiKey}`,
                'HTTP-Referer': window.location.href,
                'X-Title': 'Portofolio Luqman - Chatbot Al-Banna'
            },
            body: JSON.stringify({
                model: CHATBOT_API_CONFIG.model,
                messages: messages,
                temperature: 0.75,
                max_tokens: 600
            })
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        const jawaban = (data.choices?.[0]?.message?.content || '').trim() ||
                        "Maaf saudaraku, saya belum bisa menjawab. Coba tanyakan dengan cara lain.";

        if (typingEl) typingEl.classList.add('hidden');
        renderPesan('bot', jawaban);
        chatbotHistory.push({ role: 'assistant', content: jawaban });

    } catch (err) {
        console.error('Chatbot error:', err);
        if (typingEl) typingEl.classList.add('hidden');
        const fallback = jawabanFallback(userText);
        renderPesan('bot', fallback);
        chatbotHistory.push({ role: 'assistant', content: fallback });
    } finally {
        chatbotIsProcessing = false;
    }
}

// ===== FALLBACK JAWABAN LOKAL =====
function jawabanFallback(text) {
    const t = text.toLowerCase();

    if (t.includes('ikhwanul muslimin') || t.includes('ikhwan')) {
        return "Assalamualaikum saudaraku. **Ikhwanul Muslimin** adalah gerakan dakwah yang didirikan oleh Hassan Al-Banna pada tahun 1928 di Ismailiyah, Mesir. Fokus utamanya adalah **tarbiyah** (pendidikan Islam), pembinaan akhlak, dan pembaruan sosial berbasis syariat. Gerakan ini menekankan bahwa Islam adalah *din wa daulah* — agama sekaligus sistem kehidupan. Wallahu a'lam bish-shawab. ☪";
    }
    if (t.includes('tarbiyah')) {
        return "Saudaraku, **Tarbiyah** berarti pendidikan dan pembinaan. Dalam manhaj Ikhwanul Muslimin, tarbiyah dilakukan secara berjenjang: mengenal Allah, membentuk akhlak, memahami Al-Qur'an, lalu terjun ke masyarakat. Tujuannya membentuk pribadi *salimul aqidah* (akidah lurus) dan *sohihul ibadah* (ibadah benar). InsyaAllah dengan tarbiyah, generasi rabbani akan lahir. Barakallahu fiik. ☪";
    }
    if (t.includes('hassan') || t.includes('al-banna') || t.includes('banna')) {
        return "**Hassan Al-Banna** (1906-1949) adalah pendiri Ikhwanul Muslimin, seorang guru, dai, dan pembaharu. Beliau dikenal dengan motto *'Allah tujuan kami, Rasulullah teladan kami, Al-Qur'an undang-undang kami'*. Pemikirannya menekankan pentingnya pendidikan kader (tarbiyah) dan persatuan umat. Semoga Allah merahmati beliau. ☪";
    }
    if (t.includes('pasal') || t.includes('5 pasal') || t.includes('lima pasal')) {
        return "Lima pasal perjuangan Ikhwanul Muslimin:\n1. **Allah tujuan kami**\n2. **Rasulullah teladan kami**\n3. **Al-Qur'an undang-undang kami**\n4. **Jihad jalan perjuangan kami**\n5. **Mati syahid cita-cita tertinggi kami**\n\nInilah landasan yang dipegang untuk membangun generasi Qur'ani. Wallahu a'lam. ☪";
    }
    if (t.includes('muslim yang baik') || t.includes('muslim baik')) {
        return "Saudaraku, menjadi muslim yang baik dimulai dari:\n1. **Iman yang lurus** — mengenal Allah dengan benar.\n2. **Ibadah yang sahih** — sesuai tuntunan Rasulullah.\n3. **Akhlak mulia** — jujur, sabar, dan menyayangi sesama.\n4. **Al-Qur'an sebagai pedoman** — dibaca, dipahami, diamalkan.\n5. **Bermanfaat bagi umat** — ilmu dan amal yang menyejukkan.\n\nInsyaAllah dengan tarbiyah yang konsisten, kita bisa menjadi pribadi yang diridhai Allah. Barakallahu fiik. ☪";
    }
    if (t.includes('assalam') || t.includes('salam') || t.includes('halo') || t.includes('hai')) {
        return "Wa'alaikumussalam warahmatullahi wabarakatuh, saudaraku. Semoga Allah melimpahkan rahmat dan keberkahan kepada Anda. Ada yang bisa saya bantu hari ini? Silakan tanya seputar Islam, tarbiyah, sejarah perjuangan, atau topik bermanfaat lainnya. ☪";
    }
    return "Assalamualaikum saudaraku, terima kasih atas pertanyaannya. Saya asisten dengan kepribadian Hassan Al-Banna — saat ini jawaban saya masih terbatas pada topik seputar **Ikhwanul Muslimin, tarbiyah, 5 pasal perjuangan, Hassan Al-Banna**, dan **tips menjadi muslim yang baik**. Silakan pilih salah satu topik di atas atau tanyakan hal lain yang bermanfaat. Barakallahu fiik. ☪";
}
            
