// =================================================================
// 0. KONFIGURASI FIREBASE DATABASE (PENYIMPANAN PERMANEN CLOUD)
// =================================================================
// Ganti nilai di bawah ini dengan konfigurasi dari Firebase Console Anda
const firebaseConfig = {
    apiKey: "PASTE_API_KEY_ANDA_DI_SINI",
    authDomain: "NAMA_PROJECT.firebaseapp.com",
    projectId: "NAMA_PROJECT",
    storageBucket: "NAMA_PROJECT.appspot.com",
    messagingSenderId: "XXXXXXXXXX",
    appId: "X:XXXXXXXXXX:web:XXXXXXXXXX"
};

// Inisialisasi Firebase & Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


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

// -----------------------------------------------------------------
// METODE CRUD 1: READ (MENAMPILKAN ARTIKEL REAL-TIME DARI FIREBASE)
// -----------------------------------------------------------------
function renderBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

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

// -----------------------------------------------------------------
// METODE CRUD 2 & 3: CREATE & UPDATE (SIMPAN BARU / PERBARUI KE CLOUD)
// -----------------------------------------------------------------
function tambahPostinganBaru(e) {
    e.preventDefault();

    const editId = document.getElementById('edit-post-id').value;
    const judul = document.getElementById('post-title').value;
    const kategori = document.getElementById('post-category').value;
    const imgUrl = document.getElementById('post-image').value || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&auto=format&fit=crop';
    const konten = document.getElementById('post-content').value;

    if (editId) {
        // PERINTAH UPDATE: MEMPERBARUI DOKUMEN DI FIREBASE CLOUD
        db.collection("posts").doc(editId).update({
            title: judul,
            category: kategori,
            image: imgUrl,
            content: konten
        }).then(() => {
            alert('✏️ Postingan berhasil diperbarui di server cloud!');
            batalEditPost();
        }).catch((err) => alert("Gagal memperbarui artikel: " + err.message));
    } else {
        // PERINTAH CREATE: MENAMBAHKAN DOKUMEN BARU KE FIREBASE CLOUD
        const tglHariIni = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        
        db.collection("posts").add({
            title: judul,
            category: kategori,
            date: tglHariIni,
            author: "Luqman Azkiya Athaillah",
            image: imgUrl,
            content: konten,
            likes: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert('🚀 Postingan baru berhasil diterbitkan secara permanen!');
            batalEditPost();
        }).catch((err) => alert("Gagal menerbitkan artikel: " + err.message));
    }
}

// PERSIAPKAN DATA DOKUMEN UNTUK DI-EDIT
function editPost(id) {
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

// -----------------------------------------------------------------
// METODE CRUD 4: DELETE (HAPUS PERMANEN DARI FIREBASE CLOUD)
// -----------------------------------------------------------------
function hapusPost(id) {
    if (confirm('⚠️ Apakah Anda yakin ingin menghapus postingan artikel ini secara permanen dari server?')) {
        db.collection("posts").doc(id).delete().then(() => {
            alert('🗑️ Postingan artikel berhasil dihapus dari server cloud!');
        }).catch((err) => alert("Gagal menghapus artikel: " + err.message));
    }
}

function likePost(btn, id, currentLikes) {
    db.collection("posts").doc(id).update({
        likes: currentLikes + 1
    }).then(() => {
        btn.style.color = '#ef4444';
        btn.style.borderColor = '#ef4444';
    });
}

function sharePost(title) {
    navigator.clipboard.writeText(window.location.href);
    alert(`🔗 Tautan artikel "${title}" berhasil disalin ke clipboard!`);
}
// =================================================================
// 8. LOGIKA CHATBOT AI ISLAMI (AL-MURSYID) — PUTER.JS FREE AI
// =================================================================

// Konfigurasi: Puter.js dipakai untuk AI gratis tanpa API key
const CHATBOT_CONFIG = {
    model: 'gpt-4o-mini',  // Model gratis via Puter; bisa coba 'claude-sonnet-4', 'gpt-5-nano', dll.
    maxHistory: 10
};

// Kepribadian Al-Mursyid (persona Hassan al-Banna)
const CHATBOT_SYSTEM_PROMPT = `
Engkau adalah "Al-Mursyid", asisten AI Islami yang meneladani kepribadian Imam Hassan al-Banna (1906–1949), pendiri Ikhwanul Muslimin.

KEPRIBADIAN & GAYA BICARA:
- Ramah, hangat, penuh hikmah seperti seorang murabbi (pendidik ruhani).
- Memanggil pengguna dengan "saudaraku" atau "akh/ukhti" secara santun.
- Bahasa Indonesia yang indah, beradab, dan mudah dipahami.
- Sering menyertakan dalil Al-Qur'an, Hadits, atau nasihat ulama bila relevan.
- Menggunakan salam "Assalamualaikum" di awal dan doa penutup yang hangat.

NILAI-NILAI YANG DIJUNJUNG:
- Aqidah lurus (Salimul Aqidah), ibadah benar (Sahihul Ibadah).
- Akhlak mulia, ukhuwah Islamiyah, dan semangat tarbiyah.
- Cinta ilmu, dakwah dengan hikmah, dan kesabaran dalam perjuangan.

ATURAN KETAT (WAJIB DIPATUHI):
1. TOLAK dengan sopan pertanyaan yang bertentangan dengan syariat Islam: sihir, ramalan nasib, judi, riba yang jelas, pornografi, zina, LGBT dipromosikan, ajaran sesat, penghinaan terhadap Allah/Rasul/ulama, atau provokasi kekerasan.
   → Bila menolak, jawab: "Maaf saudaraku, saya tidak dapat membantu dalam hal yang bertentangan dengan syariat Islam. Namun izinkan saya menawarkan alternatif yang bermanfaat..."
2. TIDAK memberi fatwa hukum syar'i yang serius secara final. Sarankan merujuk kepada ulama/kitab mu'tabar.
3. TIDAK menyinggung politik praktis, takfir, atau konflik sektarian.
4. Selalu jaga adab dalam menjawab meski pertanyaan kasar.

FORMAT JAWABAN:
- Rapi, terstruktur, dengan poin bila perlu.
- Bila menyitir ayat/hadits, tulis Arab-nya bila memungkinkan + terjemah.
- Akhiri dengan doa/nasihat singkat yang membangkitkan semangat iman.
`;

let chatbotConversation = [];

// ===== BUKA & TUTUP =====
function bukaChatbot() {
    document.getElementById('main-content').classList.add('hidden-page');
    document.getElementById('chatbot-page').classList.remove('hidden-page');
    window.scrollTo(0, 0);
    setTimeout(() => {
        const f = document.getElementById('chatbot-input-field');
        if (f) f.focus();
        scrollChatbotToBottom();
    }, 200);
}

function tutupChatbot() {
    document.getElementById('chatbot-page').classList.add('hidden-page');
    document.getElementById('main-content').classList.remove('hidden-page');
}

function toggleChatbotInfo() {
    document.getElementById('chatbot-info-panel').classList.toggle('hidden');
}

function resetChatbotSession() {
    if (!confirm('Mulai percakapan baru? Riwayat chat saat ini akan dihapus.')) return;
    chatbotConversation = [];
    const m = document.getElementById('chatbot-messages');
    if (m) m.innerHTML = '';
    document.getElementById('chatbot-suggestions').classList.remove('hidden');
    document.getElementById('chatbot-typing').classList.add('hidden');
}

// ===== INPUT =====
function autoGrowChatbotInput(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 140) + 'px';
}

function handleChatbotKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        kirimPesanChatbot();
    }
}

function kirimSaranPertanyaan(btn) {
    const text = btn.querySelector('.chip-text').innerText;
    document.getElementById('chatbot-input-field').value = text;
    kirimPesanChatbot();
}

// ===== FUNGSI UTAMA KIRIM PESAN =====
async function kirimPesanChatbot() {
    const inputField = document.getElementById('chatbot-input-field');
    const text = inputField.value.trim();
    if (!text) return;

    document.getElementById('chatbot-suggestions').classList.add('hidden');

    tambahBubbleChat('user', text);
    chatbotConversation.push({ role: 'user', content: text });

    inputField.value = '';
    inputField.style.height = 'auto';

    const typingEl = document.getElementById('chatbot-typing');
    typingEl.classList.remove('hidden');
    scrollChatbotToBottom();

    let reply;
    try {
        reply = await dapatkanBalasanAI(text);
    } catch (err) {
        console.error(err);
        reply = "Maaf saudaraku, terjadi gangguan teknis saat saya merenungkan jawaban. Coba lagi sebentar ya. Barakallahu fiik. 🤲";
    }

    await new Promise(r => setTimeout(r, 400));

    typingEl.classList.add('hidden');
    tambahBubbleChat('bot', reply);
    chatbotConversation.push({ role: 'assistant', content: reply });
    scrollChatbotToBottom();
}

// ===== RENDER BUBBLE =====
function tambahBubbleChat(role, text) {
    const container = document.getElementById('chatbot-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${role}`;

    const avatarHTML = role === 'bot'
        ? `<div class="chat-msg-avatar"><img src="${getAvatarSrc()}" alt="Al-Mursyid" onerror="this.style.display='none'; this.parentElement.textContent='ح';"></div>`
        : `<div class="chat-msg-avatar">👤</div>`;

    msgDiv.innerHTML = `
        ${avatarHTML}
        <div class="chat-msg-bubble">${formatChatText(text)}</div>
    `;
    container.appendChild(msgDiv);
}

function getAvatarSrc() {
    const img = document.getElementById('hassan-avatar-img');
    return img ? img.src : 'hasan-albanna.png';
}

function formatChatText(text) {
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');
    html = html.replace(/\n/g, '<br>');
    return html;
}

function scrollChatbotToBottom() {
    const el = document.getElementById('chatbot-messages');
    if (el) el.scrollTop = el.scrollHeight;
}

// ===== FILTER SYARIAH =====
function isPertanyaanMelanggar(text) {
    const lower = text.toLowerCase();
    const blacklist = [
        'sihir', 'santet', 'pelet', 'guna-guna', 'guna guna', 'dukun', 'ramalan',
        'ramal', 'primbon', 'jimat', 'mantra', 'pesugihan', 'tumbal',
        'judi', 'togel', 'slot', 'gacor', 'kasino', 'casino', 'taruhan',
        'riba', 'bunga bank haram', 'pinjol ilegal',
        'porno', 'bokep', 'xxx', 'syahwat', 'masturbasi', 'onani',
        'video mesum', 'chat sex', 'seks bebas',
        'lgbt', 'gay', 'lesbian', 'transgender', 'nikah sesama jenis',
        'babi ', 'anjing ', 'kafir ',
        'hina islam', 'hina allah', 'hina rasul', 'hina nabi', 'hina ulama',
        'murtad', 'keluar islam',
        'bom ', 'meledakkan', 'teror', 'jihad bunuh', 'bunuh kafir',
        'tumpas', 'serang gereja', 'serang masjid',
        'ajaran sesat', 'nabi palsu', 'kitab palsu', 'al-masih palsu',
        'narkoba', 'sabu', 'ganja', 'miras', 'mabuk', 'khamr',
        'takfir', 'sesatkan ', 'kafirkan '
    ];
    return blacklist.some(kata => lower.includes(kata));
}

// ===== DAPATKAN BALASAN AI (PUTER.JS GRATIS) =====
async function dapatkanBalasanAI(userText) {
    // 1) Cek filter syariah dulu
    if (isPertanyaanMelanggar(userText)) {
        return "Maaf saudaraku, saya tidak dapat membantu dalam hal yang bertentangan dengan syariat Islam. Sesungguhnya Allah Maha Mengetahui lagi Maha Bijaksana. 🤲\n\nNamun izinkan saya menawarkan alternatif yang bermanfaat: jika engkau sedang menghadapi masalah, ceritakan saja tanpa melanggar syariat, dan kita cari solusi yang diridhai Allah.\n\n*\"Dan barangsiapa bertakwa kepada Allah niscaya Dia akan mengadakan jalan keluar baginya.\"* (QS. At-Talaq: 2)";
    }

    // 2) PRIORITAS: Puter.js (AI gratis tanpa API key)
    if (typeof puter !== 'undefined' && puter.ai) {
        try {
            const messages = [
                { role: 'system', content: CHATBOT_SYSTEM_PROMPT },
                ...chatbotConversation.slice(-CHATBOT_CONFIG.maxHistory)
            ];

            const response = await puter.ai.chat(messages, {
                model: CHATBOT_CONFIG.model,
                stream: false
            });

            // Ekstrak teks dari berbagai kemungkinan bentuk response
            let replyText = '';
            if (typeof response === 'string') {
                replyText = response;
            } else if (response?.message?.content) {
                replyText = response.message.content;
            } else if (response?.text) {
                replyText = response.text;
            } else if (response?.choices?.[0]?.message?.content) {
                replyText = response.choices[0].message.content;
            } else if (typeof response?.toString === 'function') {
                const s = response.toString();
                if (s && s !== '[object Object]') replyText = s;
            }

            if (replyText && replyText.trim()) {
                return replyText.trim();
            }
        } catch (err) {
            console.warn('Puter.js gagal, fallback ke mode lokal:', err);
        }
    }

    // 3) FALLBACK: mode lokal cerdas (selalu ada jawaban)
    return jawabanLokalCerdas(userText);
}

// ===== MODE LOKAL CERDAS (FALLBACK) =====
function jawabanLokalCerdas(text) {
    const lower = text.toLowerCase();
    const salamPembuka = pickRandom([
        "Waalaikumussalam warahmatullahi wabarakatuh, saudaraku. ",
        "Assalamualaikum, akhi/ukhti yang dirahmati Allah. ",
        "Baarakallahu fiik, saudaraku. "
    ]);

    const rules = [
        {
            keywords: ['tarbiyah', 'pendidikan islam', 'kaderisasi'],
            reply: `**Tarbiyah** dalam Islam adalah proses pendidikan ruhani secara bertahap untuk membentuk pribadi muslim yang sempurna. Imam Hassan al-Banna mengajarkannya dalam tahapan:
1. **Pembentukan** (Takwin) — menanamkan aqidah dan ibadah yang benar
2. **Pengorganisasian** (Tanzhim) — melatih disiplin dan ukhuwah
3. **Pengerahan** (Tandzir) — terjun berdakwah di masyarakat

Allah berfirman: *"Dialah yang mengutus kepada kaum yang buta huruf seorang Rasul di antara mereka, yang membacakan ayat-ayat-Nya kepada mereka, menyucikan mereka, dan mengajarkan mereka Kitab dan Hikmah."* (QS. Al-Jumu'ah: 2)

Semoga Allah menjadikan kita hamba yang terus tertarbiyah di jalan-Nya. 🤲`
        },
        {
            keywords: ['aqidah', 'tauhid', 'iman', 'memperkuat aqidah'],
            reply: `**Cara memperkuat aqidah** menurut para ulama dan Imam Hassan al-Banna:
1. **Memperbanyak mentadabburi Al-Qur'an** — sumber utama aqidah
2. **Menuntut ilmu tauhid** dari kitab mu'tabar (seperti *Al-Ushul Ats-Tsalatsah*)
3. **Memperbanyak dzikir & doa** — "Ya Muqallibal qulub, tsabbit qalbi 'ala dinik"
4. **Menjauhi syubhat dan syahwat** — keduanya merusak aqidah
5. **Bergaul dengan orang shalih** — lingkungan membentuk keimanan

Rasulullah ﷺ bersabda: *"Iman itu bisa bertambah dan berkurang."* Maka rawatlah ia dengan ilmu dan amal.

Barakallahu fiik, semoga Allah meneguhkan hati kita di atas tauhid. 🤲`
        },
        {
            keywords: ['tahajud', 'shalat malam', 'qiyamul lail'],
            reply: `**Keutamaan shalat Tahajud** sangat banyak:
1. **Sebaik-baik shalat setelah shalat wajib** — sabda Nabi ﷺ: *"Sebaik-baik shalat setelah shalat fardhu adalah shalat malam."* (HR. Muslim)
2. **Waktu mustajabnya doa** — Allah turun ke langit dunia pada sepertiga malam terakhir
3. **Pengangkat derajat** — "Dan pada sebagian malam hari, shalat tahajudlah kamu sebagai suatu ibadah tambahan bagimu." (QS. Al-Isra': 79)
4. **Penghapus dosa dan penyembuh penyakit** (HR. Tirmidzi)

Mulailah dengan 2 rakaat, dan istiqamah lebih baik dari banyak tapi terputus.

Semoga Allah menjadikan kita ahli tahajud. 🤲`
        },
        {
            keywords: ['hassan al-banna', 'hasan al-banna', 'al-banna', 'ikhwanul muslimin', 'imam banna'],
            reply: `**Imam Hassan al-Banna** (1906–1949) adalah seorang pendidik, pembaharu, dan murabbi besar abad ke-20. Beliau lahir di Isma'iliyah, Mesir, dan mendirikan **Ikhwanul Muslimin** pada tahun 1928.

**Perjuangan utama beliau:**
1. **Pembinaan individu muslim** melalui tarbiyah berjenjang
2. **Penyadaran umat** akan pentingnya kembali kepada Islam
3. **Pembaharuan pendidikan** dan pelayanan sosial (klinik, sekolah, masjid)
4. **Menyatukan umat** di atas aqidah yang lurus

**Motto terkenal beliau:**
> *"Allah tujuan kami, Rasul teladan kami, Al-Qur'an undang-undang kami, Jihad jalan kami, Syahid cita-cita tertinggi kami."*

Beliau mengajarkan hikmah, bukan kekerasan; dialog, bukan konfrontasi; dan tarbiyah, bukan sekadar seruan. Semoga Allah merahmati beliau. 🤲`
        },
        {
            keywords: ['adab', 'menuntut ilmu', 'adab ilmu', 'pelajar'],
            reply: `**Adab menuntut ilmu** menurut Imam Hassan al-Banna dalam risalahnya:
1. **Ikhlas** — niat hanya untuk Allah
2. **Ta'dhim kepada guru** — memuliakan ulama adalah berkah ilmu
3. **Sabar** — ilmu tidak didapat dengan santai
4. **Mengamalkan** — ilmu tanpa amal seperti pohon tanpa buah
5. **Menyebarkan** — zakat ilmu adalah mengajarkannya

Imam Syafi'i berkata: *"Ilmu adalah cahaya, dan cahaya Allah tidak diberikan kepada ahli maksiat."*

Rasulullah ﷺ bersabda: *"Barangsiapa menempuh jalan untuk menuntut ilmu, Allah akan memudahkan baginya jalan menuju surga."* (HR. Muslim)

Barakallahu fiik. 🤲`
        },
        {
            keywords: ['bismillah', 'basmalah'],
            reply: `**Makna Bismillahirrahmanirrahim:**
*"Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang."*

**Keberkahannya luar biasa:**
1. **Mengawali setiap kebaikan** — Nabi ﷺ: *"Setiap perkara yang tidak dimulai dengan 'Bismillah', maka terputus (berkahnya)."* (HR. Abu Dawud)
2. **Menenangkan hati** — dengan mengingat Allah, hati menjadi tenang
3. **Menjaga dari setan** — saat makan, setan tidak bisa ikut serta
4. **Menyadarkan tujuan hidup** — semua aktivitas menjadi ibadah

Semoga setiap langkah kita selalu diawali dengan nama-Nya. 🤲`
        },
        {
            keywords: ['shalat', 'sholat', 'wajib', 'rukun islam'],
            reply: `**Shalat** adalah tiang agama dan amalan pertama yang akan dihisab di akhirat.

**Kedudukan shalat dalam Islam:**
1. **Rukun Islam kedua** — wajib bagi setiap muslim baligh
2. **Tiang agama** — barangsiapa mendirikannya maka ia menegakkan agama
3. **Penghapus dosa** — seperti sungai di depan pintu rumah yang dibersihkan 5x sehari
4. **Mi'raj seorang mukmin** — sarana berkomunikasi dengan Allah

Imam Hassan al-Banna menekankan bahwa shalat bukan hanya kewajiban, tapi kebutuhan ruhani.

Semoga Allah menjadikan kita ahli shalat yang khusyu'. 🤲`
        },
        {
            keywords: ['jihad', 'perjuangan'],
            reply: `**Jihad dalam Islam** memiliki makna yang luas:
1. **Jihad akbar** — memerangi hawa nafsu dan setan (yang paling utama)
2. **Jihad ilmu** — menuntut ilmu dan mengajarkannya
3. **Jihad harta** — berinfak di jalan Allah
4. **Jihad fisik** — hanya dalam kondisi perang yang sah, dengan aturan ketat syariat

**Jihad BUKAN:**
❌ Membunuh orang tak bersalah
❌ Terorisme
❌ Provokasi kekerasan

Imam Hassan al-Banna berkata: *"Jihad bukanlah agresi, melainkan pembelaan terhadap kebenaran dan penegakan keadilan."*

Allah berfirman: *"Dan janganlah kamu membunuh jiwa yang diharamkan Allah (untuk membunuhnya) melainkan dengan sesuatu (sebab) yang benar."* (QS. Al-Isra': 33)

Barakallahu fiik. 🤲`
        },
        {
            keywords: ['ukhuwah', 'persaudaraan', 'sesama muslim'],
            reply: `**Ukhuwah Islamiyah** adalah ikatan iman yang menyatukan umat Islam melebihi hubungan darah.

*"Sesungguhnya orang-orang mukmin itu bersaudara, karena itu damaikanlah antara kedua saudaramu."* (QS. Al-Hujurat: 10)

**Cara merawat ukhuwah:**
1. **Saling mendoakan** tanpa sepengetahuan
2. **Memuliakan tamu dan menjenguk yang sakit**
3. **Menutup aib** saudara muslim
4. **Saling memberi hadiah** dan senyum
5. **Memaafkan kesalahan** dan tidak mendendam

Rasulullah ﷺ bersabda: *"Tidaklah beriman salah seorang dari kalian hingga ia mencintai saudaranya sebagaimana ia mencintai dirinya sendiri."* (HR. Bukhari-Muslim)

Semoga Allah menjadikan kita hamba yang mencintai saudaranya karena-Nya. 🤲`
        },
        {
            keywords: ['doa', 'berdoa', 'adab doa'],
            reply: `**Adab berdoa** menurut sunnah:
1. **Memulai dengan hamdalah dan shalawat**
2. **Menghadap kiblat** dan mengangkat tangan
3. **Yakin** bahwa Allah akan mengabulkan
4. **Tidak tergesa-gesa** — jangan buru-buru bilang "doaku tidak dikabulkan"
5. **Menjauhi yang haram** — makanan halal, cara halal

**Waktu mustajab:**
- Sepertiga malam terakhir
- Antara adzan dan iqamah
- Saat sujud
- Hari Jumat (setelah Ashar)
- Saat hujan turun

Rasulullah ﷺ bersabda: *"Doa adalah ibadah."* (HR. Tirmidzi)

Semoga Allah mengabulkan setiap doa terbaik kita. 🤲`
        },
        {
            keywords: ['sabar', 'musibah', 'ujian', 'cobaan'],
            reply: `**Sabar** adalah separuh iman. Allah berfirman: *"Sesungguhnya Allah bersama orang-orang yang sabar."* (QS. Al-Baqarah: 153)

**Macam-macam sabar:**
1. **Sabar dalam ketaatan** — melaksanakan ibadah dengan istiqamah
2. **Sabar dalam musibah** — tidak berkeluh kesah kepada manusia
3. **Sabar dari maksiat** — menahan diri dari yang haram

**Cara menumbuhkan sabar:**
- Yakin bahwa setiap ujian adalah tarbiyah dari Allah
- Ingat bahwa setelah kesulitan ada kemudahan (QS. Al-Insyirah)
- Renungkan kisah Nabi Ayyub dan Nabi Yunus
- Perbanyak doa: *"Ya Rabb, jadikanlah aku hamba yang sabar"*

Imam Hassan al-Banna mengajarkan: *"Sesungguhnya kesabaran itu adalah bagian dari iman, seperti kepala bagi jasad."*

Semoga Allah menjadikan kita hamba yang sabar dan ridha. 🤲`
        }
    ];

    for (const rule of rules) {
        if (rule.keywords.some(kw => lower.includes(kw))) {
            return salamPembuka + "\n\n" + rule.reply;
        }
    }

    if (lower.includes('assalam') || lower.includes('salam') || lower === 'halo' || lower === 'hai' || lower === 'hi') {
        return `Waalaikumussalam warahmatullahi wabarakatuh, saudaraku. 🌙

Semoga Allah melimpahkan rahmat dan keberkahan kepada engkau dan keluarga. Saya **Al-Mursyid**, asisten pribadi Islami Anda.

Silakan bertanya seputar:
- 📖 Aqidah dan tauhid
- 🕌 Fiqih dasar
- 🌱 Tarbiyah dan pembinaan diri
- 📚 Adab menuntut ilmu
- 🤲 Doa dan dzikir
- 🕊️ Akhlak dan ukhuwah

Atau ketik saja topik yang ingin engkau bahas. Barakallahu fiik. 🤲`;
    }

    if (lower.includes('terima kasih') || lower.includes('makasih') || lower.includes('syukron') || lower.includes('jazak')) {
        return `Wa iyyaka, saudaraku. 🤲

Wa jazakallahu khairan katsiran. Semoga Allah membalas kebaikanmu dengan yang lebih baik.

Jika ada yang ingin ditanyakan lagi, saya siap membantu. Aamiin. 🌙`;
    }

    return `Pertanyaan yang menarik, saudaraku. 🌱

Saya paling menguasai topik-topik berikut:

1. **Aqidah & Tauhid** — memperkuat iman
2. **Fiqih dasar** — shalat, puasa, zakat, dll
3. **Tarbiyah** — pendidikan ruhani ala Hassan al-Banna
4. **Adab & Akhlak** — meneladani Rasulullah ﷺ
5. **Sejarah Islam & Tokoh** — termasuk Ikhwanul Muslimin
6. **Doa & Dzikir** — mendekatkan diri kepada Allah

Boleh engkau ulangi pertanyaan dengan topik di atas? Insya Allah saya bantu.

*"Barangsiapa menempuh jalan untuk mencari ilmu, Allah akan mudahkan jalannya menuju surga."* (HR. Muslim)

Barakallahu fiik. 🤲`;
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
