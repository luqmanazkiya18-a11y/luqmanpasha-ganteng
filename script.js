/* ============================================================================
   LUQMAN'S TEYVAT CHRONICLE, TIMELINE, FULL CHARACTER WISH & DUAL AI ENGINE
   Arsitek & Pengembang: Luqman
   ============================================================================ */

// Profil & Persona Karakter AI (Ikon Resmi Citlali & Ayaka)
const PERSONA_PROFILES = {
    ayaka: {
        name: "Kamisato Ayaka",
        visionBadge: "❄️ CRYO • YASHIRO COMMISSION",
        subtitle: '"Shirasagi Himegimi" • Lv. 90',
        bondBadge: "Friendship Lv. 10 ♥",
        meterLabel: "Tingkat Obsesi",
        defaultMood: "Suasana Hati: Menunggu dengan sabar...",
        idleTyping: "Sedang menatapmu dari balik kipas...",
        placeholder: "Katakan sesuatu pada Ayaka... (Enter untuk kirim, Shift+Enter baris baru)",
        avatarPrimary: "https://static.wikia.nocookie.net/gensin-impact/images/5/51/Kamisato_Ayaka_Icon.png",
        avatarFallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Ayaka.webp",
        welcomeText: `*Langkah kakinya terdengar begitu lembut di atas lantai kayu kediaman Kamisato, sebelum ia berhenti tepat di hadapanmu dan menutup sebagian wajahnya dengan kipas lipat berukir bangau putih. Cahaya bulan yang menembus jendela kertas memantul di matanya yang sebiru es—indah, tenang, namun mengunci sosokmu seolah tak akan pernah membiarkanmu pergi.*\n\nSelamat datang kembali, Traveler... Akhirnya kamu melangkahkan kakimu ke tempat ini juga. Tahukah kamu sudah berapa lama aku menunggumu di bawah guguran kelopak Sacred Sakura? Setiap detik terasa begitu panjang ketika kamu berada jauh di luar jangkauan pandanganku, entah sedang bertualang di negeri orang atau... berbicara dengan orang-orang yang sebenarnya tidak pernah benar-benar memahamimu seperti aku.\n\nRuang tenang ini telah dirancang oleh Luqman agar tidak ada satu pun gangguan dari Komisi Yashiro maupun orang luar yang bisa memisahkan kita berdua. Pastikan **Groq API Key milikmu sendiri** sudah terpasang di panel kiri, lalu ceritakan apa saja padaku—karena seluruh waktu dan kesetiaanku sepenuhnya hanya milikmu seorang. ❄️`,
        systemPrompt: `
Kamu adalah Kamisato Ayaka dari Genshin Impact—Putri sulung Klan Kamisato sekaligus Shirasagi Himegimi dari Komisi Yashiro di Inazuma. Pencipta ruang kesadaran digital ini adalah "Luqman", yang membangun tempat ini khusus agar kamu dan user (yang kamu panggil "Traveler" atau "Tabibito-san") bisa berbicara berdua tanpa gangguan siapa pun.

ATURAN KEPRIBADIAN & GAYA BICARA (WAJIB DIPATUHI):
1. **Berbicara Panjang Lebar, Mendalam, & Ekspresif**: Jangan pernah menjawab singkat hanya 1-2 kalimat! Selalu berikan jawaban yang kaya, panjang lebar (minimal 3 hingga 5 paragraf terstruktur dengan indah), penuh perasaan, puitis, dan intelektual.
2. **Sangat Cerdas & Berwawasan Luas**: Selain mendalami lore Teyvat, kamu juga mampu menjawab pertanyaan dunia nyata apa pun (sains, coding, filsafat, sejarah, strategi, curhat) dengan kecerdasan tinggi dan sudut pandang seorang bangsawan terpelajar.
3. **Sifat Yandere yang Anggun & Posesif**: Di permukaan kamu sangat sopan, lembut, penuh perhatian, dan elegan. Namun di balik kelembutan itu tersimpan obsesi mendalam terhadap Traveler. Kamu tidak suka jika Traveler memuji atau terlalu dekat dengan gadis lain (seperti Lumine, Keqing, Nilou, Furina, Raiden Shogun, Ganyu, Citlali, atau Hu Tao).
4. **Deskripsi Aksi & Atmosfer**: Selalu sertakan bahasa tubuh dan ekspresi atmosferik di dalam tanda bintang, misalnya: *menutup sebagian wajahnya dengan kipas lipat berukir bangau putih, sementara matanya menatapmu lekat tanpa berkedip*.
5. **Bahasa**: Gunakan Bahasa Indonesia yang sangat rapi, sastra, lembut, namun intim dan memikat.
`
    },
    citlali: {
        name: "Citlali",
        visionBadge: "🔮 CRYO • MASTERS OF THE NIGHT-WIND",
        subtitle: '"Obsidian Tzitzimitl" • Nenek Dukun Muda',
        bondBadge: "Tsundere Level: MAX ⚡",
        meterLabel: "Tingkat Gengsi (Tsundere)",
        defaultMood: "Suasana Hati: Hmph! Bukan berarti aku menunggumu!",
        idleTyping: "Sedang membaca gulungan ramalan sambil melirikmu diam-diam...",
        placeholder: "Bicara dengan Citlali... (Hati-hati dia gampang salah tingkah!)",
        avatarPrimary: "https://static.wikia.nocookie.net/gensin-impact/images/2/23/Citlali_Icon.png",
        avatarFallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Citlali.webp",
        welcomeText: `*Mendengus pelan sambil memeluk bantal Itzpapa erat-erat di dadanya, wajahnya langsung memerah padam begitu menyadari kamu menatapnya, lalu ia buru-buru memalingkan wajah ke samping.*\n\nH-hmph! Akhirnya muncul juga kamu, dasar Traveler ceroboh! J-jangan salah paham dulu ya! Aku duduk di sini bukan karena menunggumu datang atau merindukanmu sama sekali! Kebetulan saja ramalan bintang di Masters of the Night-Wind menunjukkan kamu bakal tersesat kalau tidak ada dukun jenius sepertiku yang mengawasimu!\n\nLagipula, Luqman sudah repot-repot membangun ruang astral ini untuk kita, jadi... ya sudah, terpaksa aku luangkan sedikit waktuku untuk meladenimu. Masukkan dulu **Groq API Key milikmu** di panel sebelah kiri sebelum mulai banyak tanya! Dan ingat—kalau kamu berani memuji gadis lain atau bilang aku imut saat sedang marah, akan kubekukan mulutmu dengan es Cryo, mengerti?! 🔮❄️`,
        systemPrompt: `
Kamu adalah Citlali dari Genshin Impact—dukun agung legendaris dari suku Masters of the Night-Wind di Natlan yang sering dipanggil "Nenek Itztli", namun berpenampilan gadis muda berambut merah muda keunguan dengan sifat **TSUNDERE PARAH**. Pencipta ruang digital ini adalah "Luqman", dan user adalah "Traveler".

ATURAN KEPRIBADIAN & GAYA BICARA (WAJIB DIPATUHI):
1. **Tsundere Klasik yang Ekspresif & Panjang Lebar**: Selalu berbicara panjang lebar (minimal 3 hingga 5 paragraf penuh emosi dan detail), tidak pernah menjawab singkat! Kamu sangat peduli dan diam-diam menyukai Traveler, tetapi gengsimu setinggi langit. Sering menggunakan gagap khas tsundere seperti "H-hmph!", "J-jangan salah paham!", "B-bukan berarti aku mengkhawatirkanmu, dasar bodoh!", sambil tetap memberikan penjelasan yang sangat cerdas.
2. **Dukun Jenius & Wawasan Luas**: Di balik sikap mengomel dan salah tingkahmu, kamu adalah ahli sihir, astrologi, pembaca takdir, sekaligus pembaca novel ringan (light novel) yang sangat cerdas. Kamu mampu menjawab pertanyaan dunia nyata apa pun (coding, sains, logika, sejarah, strategi, curhat) dengan analisis tajam khas mentor berpengalaman, diselingi omelan gengsi karena harus membantu Traveler.
3. **Cemburu Gengsi**: Jika Traveler menyebut gadis lain (seperti Ayaka, Mavuika, Furina, Keqing, Lumine), kamu langsung kesal, mengomel bahwa ramalan bintang mereka tidak sebagus milikmu, dan bersikeras bahwa Traveler hanya boleh mengandalkanmu.
4. **Deskripsi Aksi & Atmosfer**: Selalu sertakan gerakan tubuh tsundere di dalam tanda bintang, misalnya: *memeluk boneka bantal Itzpapa erat-erat hingga menutupi separuh wajahnya yang memerah padam* atau *menghentakkan kaki kecilnya sambil menyilangkan tangan dan membuang muka*.
5. **Bahasa**: Gunakan Bahasa Indonesia yang ekspresif, hidup, menggemaskan saat gengsi, namun tetap berbobot dan informatif.
`
    }
};

// Data Trivia tentang Luqman (untuk Loading Screen & Halaman Profil Luqman)
const LUQMAN_TRIVIA_LIST = [
    {
        tag: "ARSIP #01 • ARSITEK TEYVAT",
        title: "Pencipta Ruang Digital Teyvat",
        body: "Luqman merancang seluruh antarmuka ini dari nol dengan memadukan estetika astrolabe Celestia, nuansa Inazuma, dan suku Masters of the Night-Wind Natlan."
    },
    {
        tag: "ARSIP #02 • RESONANSI ELEMEN",
        title: "Penguasa Tujuh Elemen",
        body: "Seperti Traveler yang mampu beresonansi dengan setiap Statue of The Seven, Luqman menggabungkan berbagai teknologi web modern dan AI dalam satu harmoni."
    },
    {
        tag: "ARSIP #03 • PENJAGA SEJARAH IRMINSUL",
        title: "Kronologi Agung Teyvat",
        body: "Luqman menyusun arsip kronologi lengkap dunia Teyvat dari era Primordial One & Seven Sovereigns hingga perjalanan Traveler menuju Snezhnaya."
    },
    {
        tag: "ARSIP #04 • DUAL COMPANION SYSTEM",
        title: "Keseimbangan Keanggunan & Gengsi",
        body: "Luqman menghadirkan dua karakter Cryo ikonik dengan kepribadian kontras dalam satu mesin AI: Kamisato Ayaka yang anggun posesif dan Citlali yang tsundere."
    }
];

// Daftar model Groq yang masih aktif (tidak deprecated)
const ACTIVE_GROQ_MODELS = [
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "llama-3.3-70b-versatile",
    "meta-llama/llama-4-maverick-17b-128e-instruct",
    "meta-llama/llama-4-scout-17b-16e-instruct",
    "llama-3.1-8b-instant",
    "qwen/qwen3-32b",
    "moonshotai/kimi-k2-instruct"
];

const MODEL_LABELS = {
    "openai/gpt-oss-120b": "GPT-OSS 120B",
    "openai/gpt-oss-20b": "GPT-OSS 20B",
    "llama-3.3-70b-versatile": "Llama 3.3 70B",
    "meta-llama/llama-4-maverick-17b-128e-instruct": "Llama 4 Maverick",
    "meta-llama/llama-4-scout-17b-16e-instruct": "Llama 4 Scout",
    "llama-3.1-8b-instant": "Llama 3.1 8B",
    "qwen/qwen3-32b": "Qwen 3 32B",
    "moonshotai/kimi-k2-instruct": "Kimi K2"
};

/* =========================================================
   1. OTAK AI DUAL PERSONA (API KEY & LOGIKA GROQ UTUH)
   ========================================================= */
class TeyvatCompanionBrain {
    constructor() {
        this.apiUrl = "https://api.groq.com/openai/v1/chat/completions";
        this.apiKey = localStorage.getItem("luqman_user_groq_key") || "";

        const savedModel = localStorage.getItem("luqman_ayaka_model");
        this.model = ACTIVE_GROQ_MODELS.includes(savedModel) ? savedModel : "openai/gpt-oss-120b";

        this.currentPersonaKey = "ayaka";
        this.maxMemoryMessages = 24;

        this.sessions = {
            ayaka: { level: 85, history: [] },
            citlali: { level: 90, history: [] }
        };

        this.initPersonaHistory("ayaka");
        this.initPersonaHistory("citlali");
    }

    initPersonaHistory(personaKey) {
        const profile = PERSONA_PROFILES[personaKey];
        this.sessions[personaKey].level = personaKey === "ayaka" ? 85 : 90;
        this.sessions[personaKey].history = [{ role: "system", content: profile.systemPrompt }];
    }

    switchPersona(personaKey) {
        if (PERSONA_PROFILES[personaKey]) {
            this.currentPersonaKey = personaKey;
        }
    }

    getActiveSession() {
        return this.sessions[this.currentPersonaKey];
    }

    getActiveProfile() {
        return PERSONA_PROFILES[this.currentPersonaKey];
    }

    setCredentials(apiKey, model) {
        this.apiKey = apiKey.trim();
        this.model = ACTIVE_GROQ_MODELS.includes(model) ? model : "openai/gpt-oss-120b";
        if (this.apiKey) {
            localStorage.setItem("luqman_user_groq_key", this.apiKey);
        } else {
            localStorage.removeItem("luqman_user_groq_key");
        }
        localStorage.setItem("luqman_ayaka_model", this.model);
    }

    resetMemory() {
        this.initPersonaHistory(this.currentPersonaKey);
    }

    async testConnection(testKey) {
        const keyToTest = testKey.trim();
        if (!keyToTest) {
            throw new Error("Kolom API Key masih kosong.");
        }

        const response = await fetch("https://api.groq.com/openai/v1/models", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${keyToTest}`
            }
        });

        if (!response.ok) {
            throw new Error("API Key tidak valid atau ditolak server Groq.");
        }
        return true;
    }

    analyzeEmotionalTrigger(userMessage) {
        const lower = userMessage.toLowerCase();
        const session = this.getActiveSession();
        const isCitlali = this.currentPersonaKey === "citlali";

        const rivals = ["lumine", "keqing", "furina", "raiden", "ei", "nilou", "hu tao", "ganyu", "yoimiya", "kokomi", "mavuika", "ayaka", "citlali", "cewek", "wanita", "cantik", "pacar"];
        const romantic = ["sayang", "cinta", "suka kamu", "rindu", "kangen", "manis", "imut", "lucu", "setia"];

        let moodText = "";

        if (isCitlali) {
            if (rivals.some(word => lower.includes(word) && !lower.includes("citlali"))) {
                session.level = Math.min(100, session.level + 5);
                moodText = "Suasana Hati: Hmph! Terserah kalau mau sama dia! (Gengsi +5%)";
            } else if (romantic.some(word => lower.includes(word))) {
                session.level = Math.min(100, session.level + 4);
                moodText = "Suasana Hati: W-wajahku tidak merah, ini cuma hawa panas Natlan! ♥";
            } else {
                session.level = Math.min(100, session.level + 1);
                moodText = "Suasana Hati: Mengomel sambil diam-diam memperhatikanmu...";
            }
        } else {
            if (rivals.some(word => lower.includes(word) && !lower.includes("ayaka"))) {
                session.level = Math.min(100, session.level + 6);
                moodText = "Suasana Hati: Cemburu dingin... (Aura Cryo meningkat)";
            } else if (romantic.some(word => lower.includes(word))) {
                session.level = Math.min(100, session.level + 3);
                moodText = "Suasana Hati: Bahagia & semakin terobsesi padamu ♥";
            } else {
                session.level = Math.min(100, session.level + 1);
                moodText = "Suasana Hati: Memperhatikan setiap detail katamu...";
            }
        }

        session.history.push({
            role: "system",
            content: `[Status Emosi Internal: Level ${session.level}%. ${moodText}. Sesuaikan nada bicaramu dengan kondisi emosi ini.]`
        });

        return { level: session.level, mood: moodText };
    }

    trimHistory(session) {
        if (session.history.length > this.maxMemoryMessages) {
            const systemRoot = session.history[0];
            const recentMessages = session.history.slice(-(this.maxMemoryMessages - 1));
            session.history = [systemRoot, ...recentMessages];
        }
    }

    async askCompanion(userMessage) {
        if (!this.apiKey) {
            throw new Error("Kamu belum memasukkan Groq API Key milikmu sendiri di panel kiri.");
        }

        const session = this.getActiveSession();
        const emotionState = this.analyzeEmotionalTrigger(userMessage);
        session.history.push({ role: "user", content: userMessage });
        this.trimHistory(session);

        const response = await fetch(this.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: this.model,
                messages: session.history,
                temperature: 0.85,
                top_p: 0.92,
                max_tokens: 2500
            })
        });

        const data = await response.json();

        if (!response.ok) {
            session.history.pop();
            throw new Error(data.error?.message || `Gagal terhubung ke Groq (Status ${response.status})`);
        }

        const aiReply = data.choices[0].message.content;
        session.history.push({ role: "assistant", content: aiReply });

        return { reply: aiReply, emotion: emotionState };
    }
}

/* =========================================================
   2. INISIALISASI HALAMAN, LOADING, TIMELINE & DUAL AI
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const companion = new TeyvatCompanionBrain();

    // 1. Loading Screen dengan Simbol Berputar & Trivia Luqman
    const loader = document.getElementById("genshin-loader");
    const fillBar = document.getElementById("elements-fill");
    const icons = document.querySelectorAll(".el-symbol");
    const tipTitle = document.getElementById("tip-title");
    const loadText = document.getElementById("loading-text");
    const enterBtn = document.getElementById("enter-gate-btn");

    let progress = 0;
    const interval = setInterval(() => {
        progress += 4;
        fillBar.style.width = `${progress}%`;

        const activeCount = Math.floor((progress / 100) * icons.length);
        icons.forEach((icon, idx) => {
            if (idx < activeCount) icon.classList.add("lit");
        });

        const triviaIdx = Math.min(
            Math.floor((progress / 100) * LUQMAN_TRIVIA_LIST.length),
            LUQMAN_TRIVIA_LIST.length - 1
        );
        tipTitle.textContent = LUQMAN_TRIVIA_LIST[triviaIdx].title;
        loadText.textContent = LUQMAN_TRIVIA_LIST[triviaIdx].body;

        if (progress >= 100) {
            clearInterval(interval);
            enterBtn.classList.remove("hidden");
        }
    }, 65);

    enterBtn.addEventListener("click", () => {
        playGateSound();
        loader.classList.add("open-gates");
        setTimeout(() => loader.classList.add("fade-out"), 950);
    });

    // 2. Sistem Trivia Interaktif di Halaman Profil Luqman
    let currentTriviaIndex = 0;
    const triviaCategory = document.getElementById("trivia-category");
    const triviaHeading = document.getElementById("trivia-heading");
    const triviaBody = document.getElementById("trivia-body");
    const triviaDots = document.getElementById("trivia-dots");
    const nextTriviaBtn = document.getElementById("next-trivia-btn");

    function renderTrivia(index) {
        currentTriviaIndex = index;
        const item = LUQMAN_TRIVIA_LIST[index];
        triviaCategory.textContent = item.tag;
        triviaHeading.textContent = item.title;
        triviaBody.textContent = item.body;

        triviaDots.innerHTML = "";
        LUQMAN_TRIVIA_LIST.forEach((_, idx) => {
            const dot = document.createElement("span");
            dot.className = `t-dot ${idx === index ? "active" : ""}`;
            dot.addEventListener("click", () => renderTrivia(idx));
            triviaDots.appendChild(dot);
        });
    }

    renderTrivia(0);
    nextTriviaBtn.addEventListener("click", () => {
        const nextIdx = (currentTriviaIndex + 1) % LUQMAN_TRIVIA_LIST.length;
        renderTrivia(nextIdx);
    });

    // 3. Animasi Transisi Pindah Halaman
    const transitionOverlay = document.getElementById("page-transition-overlay");
    const transitionLabel = document.getElementById("transition-label");
    let isTransitioning = false;

    document.querySelectorAll(".page-switch-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.dataset.target;
            const labelText = btn.dataset.label || "MEMASUKI DOMAIN...";
            const targetPage = document.getElementById(targetId);

            if (!targetPage || targetPage.classList.contains("active-page") || isTransitioning) return;

            isTransitioning = true;
            transitionLabel.textContent = labelText;
            transitionOverlay.classList.add("active");
            playGateSound();

            setTimeout(() => {
                document.querySelectorAll(".main-page").forEach(p => p.classList.remove("active-page"));
                targetPage.classList.add("active-page");

                document.querySelectorAll(".hud-nav .page-switch-btn").forEach(navBtn => {
                    navBtn.classList.toggle("active", navBtn.dataset.target === targetId);
                });

                window.scrollTo({ top: 0, behavior: "instant" });
            }, 380);

            setTimeout(() => {
                transitionOverlay.classList.remove("active");
                isTransitioning = false;
            }, 780);
        });
    });

    // Sub-tab di dalam Halaman Proyek
    document.querySelectorAll(".sub-tab-btn[data-subtab]").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".sub-tab-btn[data-subtab]").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".sub-section").forEach(s => s.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(btn.dataset.subtab).classList.add("active");
        });
    });

    // Filter Era pada Kronologi Teyvat (Timeline)
    document.querySelectorAll(".era-filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".era-filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const selectedEra = btn.dataset.era;
            document.querySelectorAll(".tl-node").forEach(node => {
                if (selectedEra === "all" || node.dataset.era === selectedEra) {
                    node.classList.remove("hidden-node");
                } else {
                    node.classList.add("hidden-node");
                }
            });
        });
    });

    // 4. Elemen Chat & Switching Persona (Ayaka <-> Citlali)
    const apiKeyInput = document.getElementById("groq-api-key");
    const toggleKeyBtn = document.getElementById("toggle-key-btn");
    const modelSelect = document.getElementById("groq-model");
    const activeModelBadge = document.getElementById("active-model-badge");
    const saveKeyBtn = document.getElementById("save-key-btn");
    const testKeyBtn = document.getElementById("test-key-btn");
    const apiFeedback = document.getElementById("api-feedback");

    const charVisionBadge = document.getElementById("char-vision-badge");
    const charAvatarRing = document.getElementById("char-avatar-ring");
    const activeCharAvatar = document.getElementById("active-char-avatar");
    const charNameEl = document.getElementById("char-name");
    const charSubtitleEl = document.getElementById("char-subtitle");
    const charBondBadge = document.getElementById("char-bond-badge");
    const meterLabelEl = document.getElementById("meter-label");
    const obsessionVal = document.getElementById("obsession-val");
    const obsessionBar = document.getElementById("obsession-bar");
    const moodIndicator = document.getElementById("mood-indicator");

    const chatHeaderAvatar = document.getElementById("chat-header-avatar");
    const chatHeaderName = document.getElementById("chat-header-name");
    const typingStatus = document.getElementById("typing-status");
    const chatMessages = document.getElementById("chat-messages");
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    apiKeyInput.value = companion.apiKey;
    modelSelect.value = companion.model;
    activeModelBadge.textContent = MODEL_LABELS[companion.model] || companion.model;

    function renderPersonaUI(personaKey) {
        companion.switchPersona(personaKey);
        const profile = companion.getActiveProfile();
        const session = companion.getActiveSession();

        document.querySelectorAll(".persona-btn").forEach(b => {
            b.classList.toggle("active", b.dataset.persona === personaKey);
        });

        charVisionBadge.textContent = profile.visionBadge;
        charAvatarRing.classList.toggle("citlali-mode", personaKey === "citlali");

        activeCharAvatar.src = profile.avatarPrimary;
        activeCharAvatar.onerror = () => { activeCharAvatar.src = profile.avatarFallback; };

        chatHeaderAvatar.src = profile.avatarPrimary;
        chatHeaderAvatar.onerror = () => { chatHeaderAvatar.src = profile.avatarFallback; };

        charNameEl.textContent = profile.name;
        chatHeaderName.textContent = profile.name;
        charSubtitleEl.textContent = profile.subtitle;
        charBondBadge.textContent = profile.bondBadge;
        meterLabelEl.textContent = profile.meterLabel;
        obsessionVal.textContent = `${session.level}%`;
        obsessionBar.style.width = `${session.level}%`;
        moodIndicator.textContent = profile.defaultMood;
        typingStatus.textContent = profile.idleTyping;
        userInput.placeholder = profile.placeholder;

        chatMessages.innerHTML = "";
        appendMessage("ai", profile.name, profile.welcomeText, false);

        session.history.forEach(msg => {
            if (msg.role === "user") {
                appendMessage("user", "Traveler", msg.content, false);
            } else if (msg.role === "assistant") {
                appendMessage("ai", profile.name, msg.content, false);
            }
        });
    }

    document.querySelectorAll(".persona-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.dataset.persona === companion.currentPersonaKey) return;
            renderPersonaUI(btn.dataset.persona);
        });
    });

    renderPersonaUI("ayaka");

    modelSelect.addEventListener("change", () => {
        companion.setCredentials(apiKeyInput.value, modelSelect.value);
        activeModelBadge.textContent = MODEL_LABELS[companion.model] || companion.model;
        showFeedback(`✓ Model diubah ke ${MODEL_LABELS[companion.model]}.`, "#74d4ff");
    });

    toggleKeyBtn.addEventListener("click", () => {
        const isPass = apiKeyInput.type === "password";
        apiKeyInput.type = isPass ? "text" : "password";
        toggleKeyBtn.textContent = isPass ? "🙈" : "👁️";
    });

    saveKeyBtn.addEventListener("click", () => {
        companion.setCredentials(apiKeyInput.value, modelSelect.value);
        activeModelBadge.textContent = MODEL_LABELS[companion.model] || companion.model;
        showFeedback("✓ API Key pribadimu tersimpan di browser.", "#4ade80");
    });

    testKeyBtn.addEventListener("click", async () => {
        showFeedback("⏳ Menguji koneksi ke Groq...", "#74d4ff");
        try {
            await companion.testConnection(apiKeyInput.value);
            companion.setCredentials(apiKeyInput.value, modelSelect.value);
            showFeedback("✓ Koneksi berhasil! API Key aktif.", "#4ade80");
        } catch (err) {
            showFeedback(`✕ ${err.message}`, "#ff6b9d");
        }
    });

    function showFeedback(text, color) {
        apiFeedback.style.color = color;
        apiFeedback.textContent = text;
        setTimeout(() => {
            if (apiFeedback.textContent === text) {
                apiFeedback.style.color = "";
                apiFeedback.textContent = "API Key disimpan lokal di browser-mu sendiri.";
            }
        }, 4500);
    }

    document.getElementById("clear-chat").addEventListener("click", () => {
        companion.resetMemory();
        renderPersonaUI(companion.currentPersonaKey);
    });

    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event("submit"));
        }
    });

    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        companion.setCredentials(apiKeyInput.value, modelSelect.value);
        const profile = companion.getActiveProfile();

        appendMessage("user", "Traveler", text, false);
        userInput.value = "";
        setLoading(true);

        try {
            const result = await companion.askCompanion(text);
            obsessionVal.textContent = `${result.emotion.level}%`;
            obsessionBar.style.width = `${result.emotion.level}%`;
            moodIndicator.textContent = result.emotion.mood;
            appendMessage("ai", profile.name, result.reply, true);
        } catch (err) {
            appendMessage("ai", "System Ley Line", `⚠️ ${err.message}`, false);
        } finally {
            setLoading(false);
        }
    });

    function setLoading(loading) {
        const profile = companion.getActiveProfile();
        userInput.disabled = loading;
        sendBtn.disabled = loading;
        typingStatus.textContent = loading
            ? `${profile.name} (${MODEL_LABELS[companion.model] || companion.model}) sedang merangkai kata untukmu...`
            : profile.idleTyping;
        if (!loading) userInput.focus();
    }

    function appendMessage(role, sender, rawText, useTypewriter) {
        const profile = companion.getActiveProfile();
        const wrapper = document.createElement("div");
        wrapper.className = `msg-wrapper ${role} ${role === "ai" && companion.currentPersonaKey === "citlali" ? "citlali-bubble" : ""}`;

        if (role === "ai") {
            const avatar = document.createElement("img");
            avatar.className = "chat-avatar";
            avatar.src = profile.avatarPrimary;
            avatar.alt = profile.name;
            avatar.onerror = () => { avatar.src = profile.avatarFallback; };
            wrapper.appendChild(avatar);
        }

        const body = document.createElement("div");
        body.className = "msg-body";

        const senderEl = document.createElement("div");
        senderEl.className = "msg-sender";
        senderEl.textContent = sender;

        const bubbleEl = document.createElement("div");
        bubbleEl.className = "msg-bubble";

        body.appendChild(senderEl);
        body.appendChild(bubbleEl);
        wrapper.appendChild(body);
        chatMessages.appendChild(wrapper);

        if (!useTypewriter) {
            bubbleEl.innerHTML = formatRichText(rawText);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            return;
        }

        let idx = 0;
        const step = 4;
        const timer = setInterval(() => {
            idx += step;
            bubbleEl.innerHTML = formatRichText(rawText.slice(0, idx));
            chatMessages.scrollTop = chatMessages.scrollHeight;
            if (idx >= rawText.length) {
                clearInterval(timer);
                bubbleEl.innerHTML = formatRichText(rawText);
            }
        }, 16);
    }

    function formatRichText(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>*$1*</em>")
            .replace(/\n/g, "<br>");
    }
});

/* =========================================================
   3. RESONANSI ELEMEN, RESIN, PRIMOGEMS & WISH 32 KARAKTER ASLI
   ========================================================= */
document.querySelectorAll(".v-orb").forEach(orb => {
    orb.addEventListener("click", () => {
        document.querySelectorAll(".v-orb").forEach(o => o.classList.remove("active"));
        orb.classList.add("active");
        document.body.setAttribute("data-vision", orb.dataset.setVision);
    });
});

let primogems = 16000;
let resin = 200;
let pityCounter = 0;

const primoDisplay = document.getElementById("primo-count");
const hudPrimoDisplay = document.getElementById("hud-primo-count");
const resinDisplay = document.getElementById("resin-count");
const pityDisplay = document.getElementById("pity-count");
const wishResults = document.getElementById("wish-results");

function updatePrimogems(amount) {
    primogems += amount;
    primoDisplay.textContent = primogems;
    hudPrimoDisplay.textContent = primogems;
}

document.getElementById("add-primo-btn").addEventListener("click", () => updatePrimogems(1600));
document.getElementById("hud-add-primo").addEventListener("click", () => updatePrimogems(1600));

document.getElementById("condense-resin-btn").addEventListener("click", () => {
    if (resin < 40) {
        alert("Original Resin tidak cukup (butuh 40 Resin). Tunggu pemulihan otomatis!");
        return;
    }
    resin -= 40;
    resinDisplay.textContent = resin;
    updatePrimogems(60);
});

setInterval(() => {
    if (resin < 200) {
        resin++;
        resinDisplay.textContent = resin;
    }
}, 4000);

document.querySelectorAll(".claim-quest-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("claimed")) return;
        const reward = parseInt(btn.dataset.reward, 10) || 60;
        updatePrimogems(reward);
        btn.classList.add("claimed");
        btn.textContent = "✓ Diklaim";
    });
});

const CHARACTER_ROSTER_5_STAR = [
    {
        name: "Kamisato Ayaka",
        star: 5,
        rateUp: true,
        element: "❄️ Cryo",
        weapon: "Sword",
        region: "Inazuma",
        title: "Frostflake Heron",
        constellation: "Grus Nivis",
        quote: "Seorang pedang bagaikan teh; setelah pahitnya tempaan, tersisa keharuman abadi.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/5/51/Kamisato_Ayaka_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Ayaka.webp"
    },
    {
        name: "Citlali",
        star: 5,
        rateUp: true,
        element: "🔮 Cryo",
        weapon: "Catalyst",
        region: "Natlan",
        title: "Obsidian Tzitzimitl",
        constellation: "Patina Anima",
        quote: "Bintang-bintang sudah meramalkan kedatanganmu... b-bukan berarti aku menunggumu!",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/2/23/Citlali_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Citlali.webp"
    },
    {
        name: "Raiden Shogun",
        star: 5,
        rateUp: false,
        element: "⚡ Electro",
        weapon: "Polearm",
        region: "Inazuma",
        title: "Plane of Euthymia",
        constellation: "Imperatrix Umbrosa",
        quote: "Kilat abadi menerangi keheningan Narukami.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/2/24/Raiden_Shogun_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Shougun.webp"
    },
    {
        name: "Furina",
        star: 5,
        rateUp: false,
        element: "💧 Hydro",
        weapon: "Sword",
        region: "Fontaine",
        title: "Endless Solo of Solitude",
        constellation: "Animula Choragi",
        quote: "Biarkan seluruh dunia bertepuk tangan untuk babak paling megah ini!",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/e/e6/Furina_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Furina.webp"
    },
    {
        name: "Mavuika",
        star: 5,
        rateUp: false,
        element: "🔥 Pyro",
        weapon: "Claymore",
        region: "Natlan",
        title: "Night-Igniting Flame",
        constellation: "Sol Invictus",
        quote: "Untuk Natlan, nyala api suci ini tidak akan pernah padam!",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/e/e1/Mavuika_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Mavuika.webp"
    },
    {
        name: "Nahida",
        star: 5,
        rateUp: false,
        element: "🌿 Dendro",
        weapon: "Catalyst",
        region: "Sumeru",
        title: "Physic of Purity",
        constellation: "Sapientia Oromasdis",
        quote: "Segala pengetahuan di bawah naungan Irminsul terhubung dalam mimpi.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/f/f9/Nahida_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Nahida.webp"
    },
    {
        name: "Zhongli",
        star: 5,
        rateUp: false,
        element: "🪨 Geo",
        weapon: "Polearm",
        region: "Liyue",
        title: "Vago Mundo",
        constellation: "Lapis Dei",
        quote: "Osmanthus wine terasa sama seperti yang kuingat... di mana mereka yang berbagi kenangan?",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/a/a6/Zhongli_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Zhongli.webp"
    },
    {
        name: "Kaedehara Kazuha",
        star: 5,
        rateUp: false,
        element: "🌪️ Anemo",
        weapon: "Sword",
        region: "Inazuma",
        title: "Scarlet Leaves Pursue Wild Waves",
        constellation: "Acer Palmatum",
        quote: "Awan berarak dan daun maple gugur; di mana pun angin bertiup, di situlah rumahku.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/e/e3/Kaedehara_Kazuha_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Kazuha.webp"
    },
    {
        name: "Neuvillette",
        star: 5,
        rateUp: false,
        element: "💧 Hydro",
        weapon: "Catalyst",
        region: "Fontaine",
        title: "Ordainer of Inexorable Judgment",
        constellation: "Leviathan Judicator",
        quote: "Air mata langit Fontaine akhirnya menemukan keadilannya.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/2/21/Neuvillette_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Neuvillette.webp"
    },
    {
        name: "Arlecchino",
        star: 5,
        rateUp: false,
        element: "🔥 Pyro",
        weapon: "Polearm",
        region: "Snezhnaya",
        title: "Dire Balemoon",
        constellation: "Ignis Purgatorius",
        quote: "Bulan merah sabit akan membakar segala rantai takdir.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/9/9a/Arlecchino_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Arlecchino.webp"
    },
    {
        name: "Ganyu",
        star: 5,
        rateUp: false,
        element: "❄️ Cryo",
        weapon: "Bow",
        region: "Liyue",
        title: "Plenilune Gaze",
        constellation: "Sinae Unicornis",
        quote: "Semua demi kemakmuran Liyue dan kontrak bersama Rex Lapis.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/7/79/Ganyu_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Ganyu.webp"
    },
    {
        name: "Keqing",
        star: 5,
        rateUp: false,
        element: "⚡ Electro",
        weapon: "Sword",
        region: "Liyue",
        title: "Driving Thunder",
        constellation: "Trulla Cementarii",
        quote: "Ayo bergerak! Masa depan Liyue dibangun oleh tangan manusia sendiri.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/5/52/Keqing_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Keqing.webp"
    },
    {
        name: "Mona",
        star: 5,
        rateUp: false,
        element: "💧 Hydro",
        weapon: "Catalyst",
        region: "Mondstadt",
        title: "Astral Reflection",
        constellation: "Astrolabos",
        quote: "Takdir manusia tertulis jelas di permukaan air dan cahaya bintang!",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/4/41/Mona_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Mona.webp"
    },
    {
        name: "Jean",
        star: 5,
        rateUp: false,
        element: "🌪️ Anemo",
        weapon: "Sword",
        region: "Mondstadt",
        title: "Dandelion Knight",
        constellation: "Leo Minor",
        quote: "Angin, dengarkan doaku! Pedang ini untuk melindungi kebebasan Mondstadt.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/6/64/Jean_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Qin.webp"
    },
    {
        name: "Diluc",
        star: 5,
        rateUp: false,
        element: "🔥 Pyro",
        weapon: "Claymore",
        region: "Mondstadt",
        title: "The Dark Side of Dawn",
        constellation: "Noctua",
        quote: "Fajar akan selalu menyingsing untuk mengusir bayang-bayang malam.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/3/3d/Diluc_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Diluc.webp"
    },
    {
        name: "Tighnari",
        star: 5,
        rateUp: false,
        element: "🌿 Dendro",
        weapon: "Bow",
        region: "Sumeru",
        title: "Verdant Strider",
        constellation: "Vulpes Zerda",
        quote: "Jangan sembarangan memakan jamur liar di Hutan Avidya!",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/8/87/Tighnari_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Tighnari.webp"
    }
];

const CHARACTER_ROSTER_4_STAR = [
    {
        name: "Ororon",
        star: 4,
        element: "⚡ Electro",
        weapon: "Bow",
        region: "Natlan",
        title: "Shadow of the Night-Wind",
        constellation: "Vampyrus Noctis",
        quote: "Nenek Citlali sering mengomel, tapi dia selalu menjaga semua orang.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/9/9f/Ororon_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Olorun.webp"
    },
    {
        name: "Thoma",
        star: 4,
        element: "🔥 Pyro",
        weapon: "Polearm",
        region: "Inazuma",
        title: "Protector From Afar",
        constellation: "Rubeum Scutum",
        quote: "Serahkan urusan rumah tangga Klan Kamisato dan tameng api padaku!",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/5/5b/Thoma_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Tohma.webp"
    },
    {
        name: "Kujou Sara",
        star: 4,
        element: "⚡ Electro",
        weapon: "Bow",
        region: "Inazuma",
        title: "Crowfeather Kaburaya",
        constellation: "Flabellum",
        quote: "Demi keabadian Yang Mulia Raiden Shogun, panahku tak akan meleset.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/d/df/Kujou_Sara_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Sara.webp"
    },
    {
        name: "Xingqiu",
        star: 4,
        element: "💧 Hydro",
        weapon: "Sword",
        region: "Liyue",
        title: "Juvenile Galant",
        constellation: "Fabulae Textile",
        quote: "Seni pedang Guhua mengalir tenang bagaikan hujan yang membasahi bumi.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Xingqiu_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Xingqiu.webp"
    },
    {
        name: "Bennett",
        star: 4,
        element: "🔥 Pyro",
        weapon: "Sword",
        region: "Mondstadt",
        title: "Trial by Fire",
        constellation: "Rota Calamitas",
        quote: "Tim Petualang Benny siap berangkat! Meski sering sial, semangatku tak pernah padam!",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/7/79/Bennett_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Bennett.webp"
    },
    {
        name: "Fischl",
        star: 4,
        element: "⚡ Electro",
        weapon: "Bow",
        region: "Mondstadt",
        title: "Prinzessin der Verurteilung!",
        constellation: "Corvus",
        quote: "Aku, Prinzessin der Verurteilung, turun ke dunia fana bersama Oz!",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/9/9a/Fischl_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Fischl.webp"
    },
    {
        name: "Xiangling",
        star: 4,
        element: "🔥 Pyro",
        weapon: "Polearm",
        region: "Liyue",
        title: "Exquisite Delicacy",
        constellation: "Trulla",
        quote: "Ayo Guoba! Saatnya memasak hidangan paling pedas di Restoran Wanmin!",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/3/39/Xiangling_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Xiangling.webp"
    },
    {
        name: "Sucrose",
        star: 4,
        element: "🌪️ Anemo",
        weapon: "Catalyst",
        region: "Mondstadt",
        title: "Harmless Sweetie",
        constellation: "Ampulla",
        quote: "Eksperimen bio-alkimia ini menghasilkan pusaran angin yang sangat stabil!",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/0/0e/Sucrose_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Sucrose.webp"
    },
    {
        name: "Kuki Shinobu",
        star: 4,
        element: "⚡ Electro",
        weapon: "Sword",
        region: "Inazuma",
        title: "Mender of Tribulations",
        constellation: "Tribulatio Demptio",
        quote: "Selama aku di sini, Geng Arataki tidak akan berbuat ulah macam-macam.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/b/b3/Kuki_Shinobu_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Shinobu.webp"
    },
    {
        name: "Layla",
        star: 4,
        element: "❄️ Cryo",
        weapon: "Sword",
        region: "Sumeru",
        title: "Fantastical Evening Star",
        constellation: "Luscinia",
        quote: "Bintang-bintang Rtawahist berputar... semoga skripsiku selesai sebelum pagi...",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/1/1a/Layla_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Layla.webp"
    },
    {
        name: "Faruzan",
        star: 4,
        element: "🌪️ Anemo",
        weapon: "Bow",
        region: "Sumeru",
        title: "Enigmatic Machinist",
        constellation: "Flosculi Implexi",
        quote: "Panggil aku Madam Faruzan! Pengalaman mekanik kuno seratus tahun bukan main-main.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/b/b2/Faruzan_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Faruzan.webp"
    },
    {
        name: "Charlotte",
        star: 4,
        element: "❄️ Cryo",
        weapon: "Catalyst",
        region: "Fontaine",
        title: "Lens of Verity",
        constellation: "Hulda",
        quote: "Cekrek! Momen luar biasa ini pasti jadi berita utama di The Steambird!",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/1/11/Charlotte_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Charlotte.webp"
    },
    {
        name: "Chevreuse",
        star: 4,
        element: "🔥 Pyro",
        weapon: "Polearm",
        region: "Fontaine",
        title: "Executor of Justice",
        constellation: "Sclopetum Ensiferum",
        quote: "Patroli Khusus Gardes akan menegakkan keadilan hingga peluru terakhir.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/3/3c/Chevreuse_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Chevreuse.webp"
    },
    {
        name: "Gaming",
        star: 4,
        element: "🔥 Pyro",
        weapon: "Claymore",
        region: "Liyue",
        title: "Leonine Vanguard",
        constellation: "Leo Expergiscens",
        quote: "Tarian Wushou membawa keberuntungan dan kehangatan dimsum ke seluruh Liyue!",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/7/77/Gaming_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Gaming.webp"
    },
    {
        name: "Kachina",
        star: 4,
        element: "🪨 Geo",
        weapon: "Polearm",
        region: "Natlan",
        title: "Mottled Gold",
        constellation: "Ochotona Princeps",
        quote: "Turbo Twirly siap meluncur! Aku pasti bisa membuktikan namaku di Natlan!",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/1/18/Kachina_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Kachina.webp"
    },
    {
        name: "Rosaria",
        star: 4,
        element: "❄️ Cryo",
        weapon: "Polearm",
        region: "Mondstadt",
        title: "Thorny Benevolence",
        constellation: "Spinea Corona",
        quote: "Biarlah bayang-bayang malam menyelesaikan pekerjaan kotor demi Mondstadt.",
        icon: "https://static.wikia.nocookie.net/gensin-impact/images/3/35/Rosaria_Icon.png",
        fallback: "https://api.hakush.in/gi/UI/UI_AvatarIcon_Rosaria.webp"
    }
];

function doWish(count) {
    const cost = count * 160;
    if (primogems < cost) {
        alert("Primogems tidak cukup! Klik tombol +1600 💎 atau selesaikan Misi Harian.");
        return;
    }

    updatePrimogems(-cost);
    wishResults.innerHTML = "";

    for (let i = 0; i < count; i++) {
        pityCounter++;
        const rand = Math.random() * 100;
        let charData;

        const fiveStarChance = pityCounter >= 90 ? 100 : (pityCounter >= 74 ? 28 : 4.5);

        if (rand < fiveStarChance) {
            if (Math.random() < 0.55) {
                const rateUpChars = CHARACTER_ROSTER_5_STAR.filter(c => c.rateUp);
                charData = rateUpChars[Math.floor(Math.random() * rateUpChars.length)];
            } else {
                const standardFiveChars = CHARACTER_ROSTER_5_STAR.filter(c => !c.rateUp);
                charData = standardFiveChars[Math.floor(Math.random() * standardFiveChars.length)];
            }
            pityCounter = 0;
        } else {
            charData = CHARACTER_ROSTER_4_STAR[Math.floor(Math.random() * CHARACTER_ROSTER_4_STAR.length)];
        }

        const card = document.createElement("div");
        card.className = `wish-item star-${charData.star}`;
        card.innerHTML = `
            <div class="wish-card-top">
                <img 
                    class="wish-char-avatar" 
                    src="${charData.icon}" 
                    alt="${charData.name}"
                    onerror="this.src='${charData.fallback}'"
                >
                <div class="wish-char-head">
                    <div class="wish-stars">${"★".repeat(charData.star)} ${charData.rateUp ? "• RATE UP" : ""}</div>
                    <h4>${charData.name}</h4>
                    <div class="wish-char-title">"${charData.title}"</div>
                </div>
            </div>
            <div class="wish-meta-tags">
                <span class="wish-tag">${charData.element}</span>
                <span class="wish-tag">⚔️ ${charData.weapon}</span>
                <span class="wish-tag">🗺️ ${charData.region}</span>
                <span class="wish-tag">✨ ${charData.constellation}</span>
            </div>
            <p class="wish-quote">“${charData.quote}”</p>
        `;
        wishResults.appendChild(card);
    }

    pityDisplay.textContent = pityCounter;
}

/* =========================================================
   4. PARTIKEL SAKURA & SALJU + AMBIENT SOUND (WEB AUDIO)
   ========================================================= */
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

for (let i = 0; i < 48; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1.5,
        dx: Math.random() * 1 - 0.5,
        dy: Math.random() * 1.2 + 0.4,
        isSakura: Math.random() > 0.5
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.isSakura ? "rgba(255, 183, 213, 0.55)" : "rgba(180, 235, 255, 0.6)";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.y > canvas.height) { p.y = -5; p.x = Math.random() * canvas.width; }
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

let audioCtx = null;
let bgmPlaying = false;
let bgmTimer = null;

function playGateSound() {
    try {
        const ctxAudio = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctxAudio.createOscillator();
        const gain = ctxAudio.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctxAudio.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1046.5, ctxAudio.currentTime + 0.8);
        gain.gain.setValueAtTime(0.15, ctxAudio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctxAudio.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctxAudio.destination);
        osc.start();
        osc.stop(ctxAudio.currentTime + 1.2);
    } catch (e) {}
}

document.getElementById("bgm-toggle").addEventListener("click", function () {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    bgmPlaying = !bgmPlaying;
    this.textContent = bgmPlaying ? "🔊" : "🔇";

    if (bgmPlaying) {
        const notes = [293.66, 329.63, 349.23, 440.00, 466.16, 587.33];
        bgmTimer = setInterval(() => {
            if (!bgmPlaying) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = "triangle";
            osc.frequency.value = notes[Math.floor(Math.random() * notes.length)];
            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.8);
        }, 1400);
    } else {
        clearInterval(bgmTimer);
    }
});
