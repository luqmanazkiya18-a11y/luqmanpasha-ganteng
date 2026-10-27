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
// 7. LOGIKA BLOGGER: CRUD ARTIKEL (MEMBUAT, EDIT, HAPUS), KONTROL ADMIN & RESET PASSWORD
// =================================================================
let isAdminLoggedIn = false;

// Data Artikel Default Blogger
let blogPosts = [
    {
        id: 1,
        title: "Membangun Karakter Rabbani di Tengah Era Kebisingan Teknologi",
        category: "Tarbiyah & Pemikiran",
        date: "25 Oktober 2024",
        author: "Luqman Azkiya Athaillah",
        image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&auto=format&fit=crop",
        content: "Di era serba cepat ini, seorang pemuda muslim dituntut memiliki benteng akidah yang kokoh. Pemikiran Islam memberikan fondasi bahwa kemajuan teknologi harus diimbangi dengan kedalaman spiritual...",
        likes: 12
    },
    {
        id: 2,
        title: "Jejak Kejayaan Peradaban Islam dan Spirit Ikhwanul Muslimin",
        category: "Sejarah Peradaban",
        date: "20 Oktober 2024",
        author: "Luqman Azkiya Athaillah",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop",
        content: "Mengenal bagaimana spirit pembaruan sosial yang diusung oleh Hassan al-Banna mampu membawa dampak perubahan besar bagi kesadaran ummat Islam di era modern...",
        likes: 28
    }
];

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

// RENDER ARTIKEL BLOG SAMA TOMBOL EDIT & HAPUS JIKA MODE ADMIN
function renderBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

    container.innerHTML = '';

    blogPosts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'blog-card';
        article.style.animation = 'fadeIn 0.4s ease';

        const adminButtonsHTML = isAdminLoggedIn ? `
            <button class="btn-edit-post" onclick="editPost(${post.id})">✏️ Edit</button>
            <button class="btn-delete-post" onclick="hapusPost(${post.id})">🗑️ Hapus</button>
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
                    <button class="btn-like" onclick="likePost(this, ${post.id})">❤️ <span>${post.likes}</span> Suka</button>
                    <button class="btn-share" onclick="sharePost('${post.title.replace(/'/g, "\\'")}')">🔗 Bagikan</button>
                    ${adminButtonsHTML}
                </div>
            </div>
        `;
        container.appendChild(article);
    });
}

// BUAT BARU ATAU UPDATE (EDIT) POSTINGAN ARTIKEL
function tambahPostinganBaru(e) {
    e.preventDefault();

    const editId = document.getElementById('edit-post-id').value;
    const judul = document.getElementById('post-title').value;
    const kategori = document.getElementById('post-category').value;
    const imgUrl = document.getElementById('post-image').value || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&auto=format&fit=crop';
    const konten = document.getElementById('post-content').value;

    if (editId) {
        // MODE EDIT (UPDATE)
        const index = blogPosts.findIndex(p => p.id === parseInt(editId));
        if (index !== -1) {
            blogPosts[index].title = judul;
            blogPosts[index].category = kategori;
            blogPosts[index].image = imgUrl;
            blogPosts[index].content = konten;
            alert('✏️ Postingan artikel berhasil diperbarui!');
        }
    } else {
        // MODE TAMBAH BARU
        const tglHariIni = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        const newPost = {
            id: Date.now(),
            title: judul,
            category: kategori,
            date: tglHariIni,
            author: "Luqman Azkiya Athaillah",
            image: imgUrl,
            content: konten,
            likes: 0
        };
        blogPosts.unshift(newPost);
        alert('🚀 Postingan artikel baru berhasil diterbitkan!');
    }

    batalEditPost();
    renderBlogPosts();
}

// PERSIAPKAN FORM DENGAN DATA ARTIKEL YANG AKAN DI-EDIT
function editPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;

    document.getElementById('edit-post-id').value = post.id;
    document.getElementById('post-title').value = post.title;
    document.getElementById('post-category').value = post.category;
    document.getElementById('post-image').value = post.image;
    document.getElementById('post-content').value = post.content;

    document.getElementById('form-panel-title').innerText = '✏️ Panel Admin Blogger - Edit Postingan';
    document.getElementById('btn-submit-post').innerText = '💾 Simpan Perubahan Artikel';
    document.getElementById('btn-cancel-edit').classList.remove('hidden');

    document.getElementById('admin-editor-panel').scrollIntoView({ behavior: 'smooth' });
}

// BATALKAN EDIT ARTIKEL (RESET FORM BALIK KE PERTAMA)
function batalEditPost() {
    document.getElementById('edit-post-id').value = '';
    document.getElementById('form-buat-post').reset();
    document.getElementById('form-panel-title').innerText = '✍️ Panel Admin Blogger - Buat Postingan Baru';
    document.getElementById('btn-submit-post').innerText = '🚀 Terbitkan Postingan Baru';
    document.getElementById('btn-cancel-edit').classList.add('hidden');
}

// HAPUS POSTINGAN ARTIKEL (MODE ADMIN)
function hapusPost(id) {
    if (confirm('⚠️ Apakah Anda yakin ingin menghapus postingan artikel ini?')) {
        blogPosts = blogPosts.filter(p => p.id !== id);
        renderBlogPosts();
        alert('🗑️ Postingan artikel berhasil dihapus!');
    }
}

function likePost(btn, postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        const countSpan = btn.querySelector('span');
        countSpan.innerText = post.likes;
        btn.style.color = '#ef4444';
        btn.style.borderColor = '#ef4444';
    }
}

function sharePost(title) {
    navigator.clipboard.writeText(window.location.href);
    alert(`🔗 Tautan artikel "${title}" berhasil disalin ke clipboard!`);
}
