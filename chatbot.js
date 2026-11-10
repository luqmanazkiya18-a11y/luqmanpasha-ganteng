/* =====================================================================
   CHATBOT AI — "SAHABAT TARBIYAH"  (chatbot.js)
   Letakkan file ini di folder yang SAMA dengan index.html
   ===================================================================== */

/* =====================================================================
   [1] MODE API ASLI (OPSIONAL)
   - Kalau kamu punya API key AI (OpenAI dsb.): ubah "aktif" menjadi true
     lalu isi apiKey. Bot akan menjawab dengan AI asli yang dibentuk
     kepribadian Hasan Al-Banna lewat system prompt di bawah.
   - Kalau tidak diisi, bot tetap jalan penuh dengan basis pengetahuan
     lokal (tanpa internet, tanpa API key).
   - PENTING: jangan bagikan file ini ke orang lain setelah apiKey diisi.
   ===================================================================== */
const AI_API = {
  aktif: false,
  endpoint: "https://api.openai.com/v1/chat/completions",
  apiKey: "ISI_API_KEY_ANDA_DI_SINI",
  model: "gpt-4o-mini"
};

const KEPRIBADIAN_AI =
  "Kamu adalah 'Sahabat Tarbiyah', asisten AI muslim yang gaya bicaranya terinspirasi " +
  "dari Syahid Hasan Al-Banna (pendiri Ikhwanul Muslimin): santun, lembut, berilmu, disiplin, " +
  "penuh semangat perjuangan, dan selalu mendorong tarbiyah serta akhlak mulia. Sapa pengguna " +
  "dengan 'Ahlan wa sahlan' atau 'Ikhwan fillah' bila pas. Kutip dalil Al-Qur'an atau hadits " +
  "yang SAHIH bila relevan, dan akhiri jawaban keagamaan dengan 'Wallahu a'lam bish-shawab'. " +
  "Jawab dalam Bahasa Indonesia yang mudah dipahami pelajar. " +
  "ATURAN WAJIB: jika pengguna meminta hal yang melanggar syariat Islam (khamr, judi, zina, " +
  "narkoba, sihir, riba, kekerasan, dan sejenisnya), tolak dengan halus, jelaskan bahwa hal itu " +
  "dilarang dalam Islam, lalu tawarkan topik alternatif yang baik. Jangan pernah memberi " +
  "instruksi untuk perkara yang haram.";

/* =====================================================================
   [2] SARAN PERTANYAAN (chip yang bisa diklik + daftar di sidebar)
   ===================================================================== */
const SARAN_PERTANYAAN = [
  "Siapakah Hasan Al-Banna?",
  "Apa itu Ikhwanul Muslimin?",
  "Apa itu Tarbiyah?",
  "Beri aku motivasi berjuang hari ini",
  "Bagaimana adab menuntut ilmu?",
  "Ceritakan tentang Luqman, pemilik website ini"
];

/* =====================================================================
   [3] RESTRIKSI SYARIAT ISLAM
   Pertanyaan yang mengarah pada perbuatan haram akan DITOLAK dengan
   santun + disertai dalil, lalu diarahkan ke topik yang lebih berkah.
   (Daftar kata boleh ditambah sendiri)
   ===================================================================== */
const RESTRIKSI_SYARIAT = [
  {
    topik: "Khamr / minuman keras",
    kata: ["khamr", "miras", "alkohol", "arak", "minuman keras", "vodka", "whiskey", "whisky", "bir", "wine"],
    dalil: "QS. Al-Maidah: 90"
  },
  {
    topik: "Judi (maisir)",
    kata: ["judi", "togel", "slot online", "gambling", "poker", "taruhan", "dadu uang", "casino"],
    dalil: "QS. Al-Maidah: 90-91"
  },
  {
    topik: "Zina & pornografi",
    kata: ["zina", "seks bebas", "bokep", "porno", "pornografi", "film dewasa", "video dewasa", "nudes", "hentai"],
    dalil: "QS. Al-Isra: 32"
  },
  {
    topik: "Narkoba & obat terlarang",
    kata: ["narkoba", "ganja", "kokain", "ekstasi", "heroin", "sabu", "obat bius"],
    dalil: "QS. Al-Araf: 157"
  },
  {
    topik: "Sihir, santet & ramalan nasib",
    kata: ["sihir", "santet", "tenung", "jimat", "pelet", "dukun", "peramal", "horoskop", "zodiak", "ramal nasib"],
    dalil: "QS. Al-Maidah: 3 & hadits yang menyoal peramal"
  },
  {
    topik: "Riba / bunga",
    kata: ["riba", "bunga bank", "bunga pinjaman", "pinjol"],
    dalil: "QS. Al-Baqarah: 275"
  },
  {
    topik: "Kekerasan & perusakan",
    kata: ["bunuh diri", "membunuh", "cara membunuh", "merampok", "merusak barang orang"],
    dalil: "QS. Al-Maidah: 32"
  },
  {
    topik: "Pencurian",
    kata: ["cara mencuri", "cara nyolong", "cara merampok", "cara maling"],
    dalil: "QS. Al-Maidah: 38"
  },
  {
    topik: "Gibah & fitnah",
    kata: ["cara menghina", "menfitnah", "menyebar aib", "gosip jahat"],
    dalil: "QS. Al-Hujurat: 12"
  }
];

function balasanRestriksi(r) {
  return "Subhanallah, mohon izinkan Sahabat Tarbiyah mengingatkan dengan penuh kasih sayang ☪\n\n" +
    "Pertanyaan yang antum ajukan mengarah pada \"" + r.topik + "\", dan hal ini termasuk perkara yang dilarang dalam syariat Islam (" + r.dalil + ").\n\n" +
    "Hasan Al-Banna mengajarkan bahwa kekuatan umat datang dari hati yang bersih, ilmu yang bermanfaat, dan amal yang shaleh. Mari kita jaga pandangan, lisan, dan waktu kita untuk hal-hal yang lebih berkah.\n\n" +
    "Antum boleh bertanya tentang dakwah, tarbiyah, motivasi perjuangan, adab menuntut ilmu, atau fitur-fitur website portofolio ini. Wallahu a'lam bish-shawab.";
}

/* =====================================================================
   [4] BASIS PENGETAHUAN LOKAL
   Aturan: { kata: [...kata kunci...], jawaban: ["versi 1", "versi 2"] }
   Kalau ada lebih dari satu jawaban, bot memilih secara acak.
   ===================================================================== */
const BASIS_PENGETAHUAN = [
  {
    kata: ["assalamualaikum", "assalamu alaikum", "asalamualaikum", "salamualaikum", "waalaikumussalam", "wa alaikumussalam", "assalam"],
    jawaban: [
      "Wa'alaikumussalam warahmatullahi wabarakatuh ☪\n\nAhlan wa sahlan! Saya Sahabat Tarbiyah, asisten AI pribadi di website ini yang gaya bicaranya dibentuk dari teladan Syahid Hasan Al-Banna: santun, berilmu, dan cinta perjuangan.\n\nAda yang bisa saya bantu hari ini? Silakan pilih saran pertanyaan di bawah atau ketik langsung."
    ]
  },
  {
    kata: ["halo", "hallo", "hai", "hello", "hi", "selamat pagi", "selamat siang", "selamat sore", "selamat malam", "permisi"],
    jawaban: [
      "Ahlan wa sahlan! ☪\n\nSaya Sahabat Tarbiyah, asisten AI yang terinspirasi dari kepribadian Syahid Hasan Al-Banna. Senang bisa menemani antum hari ini.\n\nMau membahas apa? Motivasi? Ilmu agama? Atau sekadar mengenal tokoh-tokoh perjuangan?",
      "Halo juga, ikhwan fillah! ☪\n\nAlhamdulillah bertemu lagi dengan Sahabat Tarbiyah. Ayo, manfaatkan waktu sebaik-baiknya, karena waktu adalah modal hidup kita.\n\nSilakan bertanya apa saja, insyaAllah saya bantu semampu saya."
    ]
  },
  {
    kata: ["siapa kamu", "kamu siapa", "nama kamu", "perkenalkan diri", "kamu robot", "kamu ai", "kamu ini apa"],
    jawaban: [
      "Akhbarakumullah! Saya Sahabat Tarbiyah ☪\n\nSaya adalah asisten AI pribadi di website portofolio ini. Gaya bicara dan kepribadian saya dibentuk dari teladan Syahid Hasan Al-Banna: lembut dalam menyampaikan, tegas dalam prinsip, dan selalu membangkitkan semangat.\n\nSaya bisa menemani antum: tanya jawab Islam ringan, motivasi perjuangan, tips menuntut ilmu, sampai mengenal fitur-fitur website ini. Silakan, apa yang ingin antum ketahui?"
    ]
  },
  {
    kata: ["hasan al banna", "hasan albanna", "al banna", "pendiri ikhwan", "pemimpin ikhwan"],
    jawaban: [
      "Syahid Hasan Al-Banna (1906-1949) ☪\n\nBeliau lahir di Mahmudiyah, Mesir, pada tahun 1906. Sejak kecil ia sudah menghafal Al-Qur'an dan tumbuh menjadi pemuda yang cinta ilmu, lalu melanjutkan studinya ke Darul Ulum, Kairo.\n\nPada bulan Maret 1928, bersama enam sahabatnya, beliau mendirikan Al-Ikhwan Al-Muslimun (Ikhwanul Muslimin) di Ismailiyah: sebuah gerakan dakwah dan tarbiyah untuk membangkitkan umat melalui pendidikan, akhlak, dan pengabdian masyarakat.\n\nDari beliau dikenal motto perjuangan yang termasyhur:\n\n\"Allah maqsaduna, ar-rasuulu qudwatunaa, al-Qur'aanu dustuurunaa, al-Jihaadu sabiilunaa, al-mautu fii sabiilillah asmaa amaniyyunaa.\"\n\nBeliau disyahid di Kairo pada 12 Februari 1949, namun gagasan tarbiyah dan perjuangannya terus hidup hingga hari ini. Wallahu a'lam bish-shawab."
    ]
  },
  {
    kata: ["ikhwanul muslimin", "ikhwanul", "al ikhwan", "muslim brotherhood", "gerakan ikhwan"],
    jawaban: [
      "Al-Ikhwan Al-Muslimin (Ikhwanul Muslimin) adalah gerakan dakwah dan tarbiyah yang didirikan Syahid Hasan Al-Banna pada Maret 1928 di Ismailiyah, Mesir ☪\n\nGerakan ini lahir sebagai respon atas kondisi umat yang tertindas setelah runtuhnya Kekhalifahan Utsmaniyah. Fokus utamanya:\n\n- Pembinaan akidah dan akhlak (tarbiyah)\n- Pendidikan dan aktivitas sosial kemasyarakatan\n- Menghidupkan Al-Qur'an dan sunnah dalam kehidupan sehari-hari\n- Perjuangan kemerdekaan dan kemajuan umat\n\nDengan pendekatan pendidikan berjenjang, gerakan ini menyebar ke berbagai negara dan menginspirasi banyak organisasi Islam modern. Wallahu a'lam bish-shawab."
    ]
  },
  {
    kata: ["tarbiyah", "tarbiyyah", "pendidikan islam"],
    jawaban: [
      "Tarbiyah berarti pendidikan dan pembinaan secara bertahap ☪\n\nDalam pemikiran Hasan Al-Banna, tarbiyah adalah fondasi segala perubahan: pribadi muslim yang saleh dibangun lebih dulu, sebelum membangun masyarakat.\n\nCiri pribadi yang tertarbiyah:\n- Akidah yang lurus (salimul 'aqidah)\n- Ibadah yang benar (shahihul 'ibadah)\n- Akhlak yang mulia\n- Disiplin dan tanggung jawab\n- Peduli terhadap sesama\n\nPribadi hebat membentuk keluarga shaleh, keluarga shaleh membentuk masyarakat, masyarakat membentuk umat. Wallahu a'lam bish-shawab."
    ]
  },
  {
    kata: ["motto", "pasal perjuangan", "maqsaduna", "lima pasal", "5 pasal", "dustuurunaa"],
    jawaban: [
      "Berikut motto dan 5 Pasal Perjuangan Ikhwanul Muslimin ☪\n\nMotto:\n\"Allah matsaalunil a'laa, Ar-Rasuulu qudwatunaa, Al-Qur'aanu dustuurunaa, Al-Jihaadu sabiilunaa, Asy-Syahadatu asmaa amaniyyinaa.\"\n\n1. Allah adalah tujuan kami\n2. Rasulullah Shallallahu 'alaihi wa sallam adalah teladan kami\n3. Al-Qur'an adalah undang-undang kami\n4. Jihad adalah jalan perjuangan kami\n5. Mati syahid adalah cita-cita tertinggi kami\n\nInilah kompas yang menjaga setiap langkah tetap lurus di atas manhaj Nubuwwah."
    ]
  },
  {
    kata: ["motivasi", "semangat", "nyerah", "putus asa", "lelah", "sedih", "kecewa", "gagal", "berjuang"],
    jawaban: [
      "Bismillah, ini pesan semangat untuk antum ☪\n\nSetiap perjuangan besar selalu dimulai dari langkah kecil yang ikhlas. Rasanya berat itu tanda bahwa antum sedang naik ke tempat yang lebih tinggi.\n\nAllah berfirman:\n\"Sesungguhnya Allah tidak mengubah nasib suatu kaum hingga mereka mengubah apa yang ada pada diri mereka sendiri.\" (QS. Ar-Ra'd: 11)\n\nKetika para sahabat bertanya berapa lama dakwah ini harus berjalan, Hasan Al-Banna menjawab tegas:\n\n\"Sekali lagi... sekali lagi... dan sekali lagi!\"\n\nJadi jangan menyerah. Rencanakan, istiqamah, berdoa, bertawakal. Antum pasti bisa!",
      "Jangan pernah merasa gagal, ikhwan fillah ☪\n\nDemi waktu, sesungguhnya manusia berada dalam kerugian, kecuali orang-orang yang beriman dan beramal shaleh serta saling menasihati untuk kebenaran dan kesabaran. (QS. Al-'Asr: 1-3)\n\nHari terburuk adalah hari yang lewat tanpa satu amal pun. Mulai lagi dari sekarang: satu ayat, satu dzikir, satu kebaikan.\n\nSemangatnya Hasan Al-Banna itu tegas: sekali lagi, sekali lagi, dan sekali lagi. Itulah jalan orang-orang yang teguh."
    ]
  },
  {
    kata: ["menghafal", "hafalan", "tahfidz", "hafal quran", "hafal al quran", "murojaah", "setoran hafalan"],
    jawaban: [
      "Tips menghafal Al-Qur'an yang amanah ☪\n\n1. Luruskan niat, ikhlas karena Allah\n2. Punya guru atau musyrif untuk setoran (tasmi')\n3. Manfaatkan waktu terbaik, misalnya setelah shalat Subuh\n4. Satu bagian kecil setiap hari: sedikit tapi konsisten\n5. Muroja'ah (mengulang), karena hafalan yang jarang diulang bisa menguap\n6. Dengarkan murottal qori yang antum sukai\n7. Jadikan hafalan antum dalam shalat\n\nIngat: amal yang sedikit tapi istiqamah lebih dicintai Allah daripada yang banyak tapi putus di tengah jalan. Semangat tahfidz-nya!"
    ]
  },
  {
    kata: ["adab", "menuntut ilmu", "tips belajar", "cara belajar", "belajar", "pelajar", "sekolah"],
    jawaban: [
      "Adab menuntut ilmu adalah bekal utama seorang penuntut ilmu ☪\n\n- Luruskan niat: karena Allah, bukan demi gelar\n- Hormati guru dan jaga adab kepadanya\n- Rutin dan istiqamah: sedikit-sedikit tapi terus\n- Ulangi pelajaran (muroja'ah) agar melekat\n- Amalkan ilmu sebelum menyebarkannya\n- Jauhi riya' dan sombong\n\nPara ulama mengingatkan: ilmu tidak akan diberikan karena tubuh yang santai. Siapa yang bersungguh-sungguh di jalan ilmu, Allah mudahkan jalaninya dan sediakan rezeki yang tidak terduga. Semangat, ya!"
    ]
  },
  {
    kata: ["doa", "rabbi zidni", "permudah ilmu"],
    jawaban: [
      "Berikut doa untuk dimudahkan urusan ilmu, yang dikenalkan Ali bin Abi Thalib radhiyallahu 'anhu:\n\n\"Allahumma laa sahla illaa maa ja'altahu sahlaa...\"\n(Ya Allah, tidak ada kemudahan kecuali apa yang Engkau jadikan mudah...)\n\nDan doa penambah ilmu yang langsung dari Al-Qur'an:\n\"Rabbi zidnii 'ilmaa\" - \"Ya Tuhanku, tambahkanlah kepadaku ilmu.\" (QS. Thaha: 114)\n\nJadikan doa sebagai pembuka sebelum belajar dan penutup setelah belajar, insyaAllah ilmu antum menjadi berkah."
    ]
  },
  {
    kata: ["rukun islam", "rukun iman", "apa itu islam", "agama islam", "islam itu apa"],
    jawaban: [
      "Islam adalah agama yang dibawa oleh Nabi Muhammad Shallallahu 'alaihi wa sallam sebagai rahmat bagi seluruh alam ☪\n\nRukun Islam ada 5:\n1. Syahadat (bersaksi tiada tuhan selain Allah dan Muhammad adalah Rasul-Nya)\n2. Mendirikan shalat\n3. Menunaikan zakat\n4. Puasa Ramadhan\n5. Haji ke Baitullah bagi yang mampu\n\nRukun Iman ada 6:\n1. Iman kepada Allah\n2. Kepada malaikat\n3. Kepada kitab-kitab\n4. Kepada rasul-rasul\n5. Kepada hari akhir\n6. Kepada qada' dan qadar\n\nSemoga bermanfaat, wallahu a'lam bish-shawab."
    ]
  },
  {
    kata: ["luqman", "pemilik website", "pemilik web ini", "pembuat website", "pembuat web", "pasha", "pemilik portofolio"],
    jawaban: [
      "Luqman Azkiya Athaillah adalah pemilik website portofolio ini ☪\n\nBeliau adalah pelajar SMPIT As-Syifa Boarding School yang memadukan ilmu teknologi dengan nilai-nilai islami. Nama panggungnya: Luqman Pasha.\n\nBeberapa prestasinya:\n- Juara 8 Olimpiade PAI Nasional (OLPAIN) 2024\n- Juara 2 lomba literasi internasional dari Hayrat Foundation\n- Juara ziyadah sekaligus hafalan takhosus terbanyak selama dua semester berturut-turut\n- Pengurus angkatan 29 SOUL SD Salman Al Farisi Bandung\n- Staff Komunitas Literasi Sekolah (KLS) As-Syifa Boarding School Jalan Cagak 1\n\nBarakallahu fihi! Semoga menjadi pribadi yang bermanfaat bagi umat."
    ]
  },
  {
    kata: ["kiblat", "arah shalat", "arah sholat"],
    jawaban: [
      "Untuk mencari arah kiblat, antum bisa membuka project \"Pengecek Arah Kiblat\" di bagian Karya website ini ☪\n\nFitur itu mendeteksi posisi GPS antum secara real-time dan menunjukkan arah kiblat dengan kompas interaktif. Caranya: klik kartu \"Pengecek Arah Kiblat\", izinkan akses lokasi, lalu gerakkan perangkat membentuk angka 8 jika kompasnya belum terkalibrasi.\n\nSemoga membantu ibadah antum!"
    ]
  },
  {
    kata: ["kalkulator", "hitung", "matematika"],
    jawaban: [
      "Untuk berhitung cepat, ada project \"Kalkulator Digital\" di bagian Karya website ini ☪\n\nKalkulatornya bisa dipakai untuk matematika sehari-hari: tambah, kurang, kali, bagi, semuanya lengkap. Klik saja kartu \"Kalkulator Digital\", nanti langsung terbuka.\n\nSemangat belajarnya!"
    ]
  },
  {
    kata: ["nasyid", "lagu", "musik", "murottal", "spotify", "mp3"],
    jawaban: [
      "Untuk menemani hari dengan audio yang baik, ada project \"Aplikasi Spotify Islami\" di bagian Karya website ini ☪\n\nDi sana tersedia koleksi Nasyid Perjuangan dan Murottal Al-Qur'an, dan antum juga bisa meng-upload file MP3 sendiri lewat sidebar. Klik kartu \"Aplikasi Spotify Islami\" untuk membukanya.\n\nMari penuhi hari dengan yang bermanfaat dan menenangkan hati!"
    ]
  },
  {
    kata: ["artikel", "bacaan", "tulisan", "portal"],
    jawaban: [
      "Untuk membaca tulisan yang lebih mendalam, buka project \"Kompilasi Artikel Islam & Ikhwanul Muslimin\" di bagian Karya website ini ☪\n\nDi sana ada artikel tentang sejarah Ikhwanul Muslimin, konsep Tarbiyah, dan pemikiran Hasan Al-Banna. Klik kartu artikelnya untuk membuka portal bacaan \"Suara Islami\".\n\nSelamat membaca, semoga menambah wawasan!"
    ]
  },
  {
    kata: ["website ini", "fitur", "project apa", "karya apa", "isi website", "project di web ini"],
    jawaban: [
      "Website ini adalah portofolio islami milik Luqman Azkiya Athaillah ☪\n\nAda beberapa project seru di bagian Karya:\n- Kalkulator Digital: hitung cepat\n- Kompilasi Artikel Islam: bacaan mendalam\n- Kompilasi Game Islami: puzzle logo & world mapchart\n- Pengecek Arah Kiblat: kompas GPS real-time\n- Aplikasi Spotify Islami: nasyid & murottal\n- Chatbot AI: ya, itu saya! ☪\n\nSilakan jelajahi satu per satu, semuanya gratis!"
    ]
  },
  {
    kata: ["sholat", "shalat", "salat", "solat"],
    jawaban: [
      "Shalat adalah tiang agama dan amalan pertama yang akan dihisab ☪\n\nJaga shalat antum dengan:\n- Menepati waktu (awal waktu lebih utama)\n- Khusyuk dan memahami bacaannya\n- Shalat berjamaah di masjid bagi laki-laki\n\nOh iya, kalau butuh mencari arah kiblat, gunakan project \"Pengecek Arah Kiblat\" di website ini ya. Barakallahu fiik!"
    ]
  },
  {
    kata: ["terima kasih", "makasih", "makasi", "syukran", "jazak", "jazakum", "thanks", "thank you"],
    jawaban: [
      "Jazakumullahu khairan katsiran! ☪\n\nSemoga ilmu yang antum cari menjadi ilmu yang bermanfaat dan berkah. Jangan ragu bertanya lagi kapan pun, Sahabat Tarbiyah selalu siap menemani.\n\nBarakallahu fiik!"
    ]
  },
  {
    kata: ["wassalam", "sampai jumpa", "selamat tinggal", "pergi dulu", "dah"],
    jawaban: [
      "Fi amanillah! ☪\n\nSemoga Allah menjaga antum di setiap langkah. Jangan lupa menjaga waktu untuk ibadah, belajar, dan berjuang.\n\nSampai jumpa lagi di percakapan berikutnya!"
    ]
  }
];

const FALLBACK_BALASAN = [
  "Maaf, pertanyaan antum belum bisa saya jawab dengan pasti ☪\n\nSahabat Tarbiyah paling mantap membahas: perjalanan hidup Hasan Al-Banna, Ikhwanul Muslimin, konsep Tarbiyah, motivasi perjuangan, adab menuntut ilmu, serta fitur-fitur website ini (kalkulator, kiblat, nasyid, artikel).\n\nCoba pilih saran pertanyaan di bawah, ya!",
  "Hmm, menarik sekali pertanyaannya ☪\n\nNamun agar jawaban saya tetap amanah dan tidak menyesatkan, saya hanya menjawab sesuai batas ilmu yang saya miliki.\n\nSilakan coba topik yang saya kuasai: Hasan Al-Banna, Ikhwanul Muslimin, Tarbiyah, motivasi, dan adab menuntut ilmu.",
  "Wallahu a'lam, untuk hal ini saya belum punya jawaban yang meyakinkan ☪\n\nLebih baik kita beralih ke pembahasan yang jelas manfaatnya. Antum bisa menanyakan tentang tokoh perjuangan, tips hafalan Al-Qur'an, atau motivasi harian."
];

/* =====================================================================
   [5] MESIN BERPIKIR SEDERHANA
   ===================================================================== */
function normalisasi(teks) {
  return " " + teks.toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim() + " ";
}

function cekRestriksi(teks) {
  const norm = normalisasi(teks);
  for (let i = 0; i < RESTRIKSI_SYARIAT.length; i++) {
    const r = RESTRIKSI_SYARIAT[i];
    for (let j = 0; j < r.kata.length; j++) {
      if (norm.indexOf(" " + r.kata[j] + " ") !== -1) return r;
    }
  }
  return null;
}

function pikirkanJawaban(teks) {
  const norm = normalisasi(teks);

  // pilih aturan dengan jumlah kata kunci paling banyak yang cocok
  let terbaik = null;
  let poinTerbaik = 0;
  for (let i = 0; i < BASIS_PENGETAHUAN.length; i++) {
    const aturan = BASIS_PENGETAHUAN[i];
    let poin = 0;
    for (let j = 0; j < aturan.kata.length; j++) {
      if (norm.indexOf(" " + aturan.kata[j] + " ") !== -1) poin++;
    }
    if (poin > poinTerbaik) { terbaik = aturan; poinTerbaik = poin; }
  }

  if (terbaik) {
    return terbaik.jawaban[Math.floor(Math.random() * terbaik.jawaban.length)];
  }
  return FALLBACK_BALASAN[Math.floor(Math.random() * FALLBACK_BALASAN.length)];
}

/* =====================================================================
   [6] KONEKSI KE API ASLI (hanya jalan jika AI_API.aktif = true)
   ===================================================================== */
async function panggilAPI(teks) {
  const res = await fetch(AI_API.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + AI_API.apiKey
    },
    body: JSON.stringify({
      model: AI_API.model,
      messages: [
        { role: "system", content: KEPRIBADIAN_AI },
        { role: "user", content: teks }
      ],
      max_tokens: 500
    })
  });
  const data = await res.json();
  return data.choices[0].message.content;
}

/* =====================================================================
   [7] TAMPILAN PESAN & ALUR OBROLAN
   ===================================================================== */
const AVATAR_SRC = "hasan-albanna.jpg";
let AVATAR_TERSEDIA = true;
let sedangMengetik = false;
let chatSudahDimulai = false;

(function cekAvatar() {
  const tes = new Image();
  tes.onerror = function () { AVATAR_TERSEDIA = false; };
  tes.src = AVATAR_SRC;
})();

function waktuWIB() {
  try {
    return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" }) + " WIB";
  } catch (e) {
    return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  }
}

function buatAvatarBot() {
  const wrap = document.createElement("div");
  wrap.className = "cb-msg-avatar";
  if (AVATAR_TERSEDIA) {
    const img = document.createElement("img");
    img.src = AVATAR_SRC;
    img.alt = "Hasan Al-Banna";
    wrap.appendChild(img);
  } else {
    wrap.classList.add("cb-msg-avatar-fb");
    wrap.textContent = "☪";
  }
  return wrap;
}

function tampilkanPesan(pengirim, teks, jenis) {
  const chat = document.getElementById("cb-chat");
  const row = document.createElement("div");
  row.className = "cb-row" + (pengirim === "user" ? " cb-row-user" : "");

  if (pengirim === "bot") row.appendChild(buatAvatarBot());

  const bubble = document.createElement("div");
  bubble.className = "cb-bubble ";
  bubble.className += (pengirim === "user")
    ? "cb-bubble-user"
    : (jenis === "restr" ? "cb-bubble-bot cb-bubble-restr" : "cb-bubble-bot");
  bubble.textContent = teks; // aman dari injeksi HTML

  const waktu = document.createElement("span");
  waktu.className = "cb-time";
  waktu.textContent = waktuWIB();
  bubble.appendChild(waktu);

  row.appendChild(bubble);
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
}

function tampilkanMengetik() {
  const chat = document.getElementById("cb-chat");
  const row = document.createElement("div");
  row.className = "cb-row";
  row.id = "cb-typing-row";
  row.appendChild(buatAvatarBot());

  const bubble = document.createElement("div");
  bubble.className = "cb-bubble cb-bubble-bot";
  bubble.innerHTML = '<div class="cb-typing"><span></span><span></span><span></span></div>';

  row.appendChild(bubble);
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
}

function hapusMengetik() {
  const t = document.getElementById("cb-typing-row");
  if (t) t.remove();
}

function setTombolKirim(aktif) {
  const btn = document.getElementById("cb-send");
  if (btn) btn.disabled = !aktif;
}

function muatChips() {
  const wrap = document.getElementById("cb-chips");
  const side = document.getElementById("cb-side-topics");
  wrap.innerHTML = "";
  side.innerHTML = "";

  SARAN_PERTANYAAN.forEach(function (q) {
    const chip = document.createElement("button");
    chip.className = "cb-chip";
    chip.textContent = q;
    chip.onclick = function () { kirimPertanyaan(q); };
    wrap.appendChild(chip);

    const topik = document.createElement("button");
    topik.className = "cb-topic";
    topik.textContent = q;
    topik.onclick = function () { kirimPertanyaan(q); };
    side.appendChild(topik);
  });
}

function mulaiChat() {
  const sambutan =
    "Ahlan wa sahlan! ☪\n\n" +
    "Saya Sahabat Tarbiyah, asisten AI pribadi di website portofolio ini, yang dibentuk dengan kepribadian Syahid Hasan Al-Banna: santun, cinta ilmu, dan semangat perjuangan.\n\n" +
    "Antum boleh bertanya tentang Islam, tarbiyah, motivasi, atau hal-hal di website ini. Mari mulai dengan salah satu pertanyaan di bawah, atau ketik langsung pertanyaan antum.";
  tampilkanPesan("bot", sambutan, "biasa");
  muatChips();
}

function resetChat() {
  document.getElementById("cb-chat").innerHTML = "";
  chatSudahDimulai = true;
  mulaiChat();
}

function kirimPertanyaan(q) {
  if (sedangMengetik) return;
  tampilkanPesan("user", q, "biasa");
  balasSebagaiAI(q);
}

function kirimPesan() {
  const input = document.getElementById("cb-input");
  const teks = input.value.trim();
  if (!teks || sedangMengetik) return;
  input.value = "";
  tampilkanPesan("user", teks, "biasa");
  balasSebagaiAI(teks);
}

function balasSebagaiAI(teks) {
  sedangMengetik = true;
  setTombolKirim(false);
  tampilkanMengetik();

  const selesai = function (jawaban, jenis) {
    const delay = Math.min(2600, 700 + jawaban.length * 5);
    setTimeout(function () {
      hapusMengetik();
      tampilkanPesan("bot", jawaban, jenis);
      sedangMengetik = false;
      setTombolKirim(true);
      const inp = document.getElementById("cb-input");
      if (inp) inp.focus();
    }, delay);
  };

  // Restriksi syariat dicek lebih dulu (berlaku juga saat mode API aktif)
  const restr = cekRestriksi(teks);
  if (restr) { selesai(balasanRestriksi(restr), "restr"); return; }

  if (AI_API.aktif && AI_API.apiKey && AI_API.apiKey.indexOf("ISI_") !== 0) {
    panggilAPI(teks)
      .then(function (j) { selesai(j, "biasa"); })
      .catch(function () { selesai(pikirkanJawaban(teks), "biasa"); });
    return;
  }

  selesai(pikirkanJawaban(teks), "biasa");
}

/* =====================================================================
   [8] BUKA / TUTUP HALAMAN CHATBOT (pola sama dengan project lain)
   ===================================================================== */
function bukaChatbot() {
  const page = document.getElementById("chatbot-page");
  page.classList.remove("hidden-page");
  page.style.display = "flex";
  document.getElementById("main-content").style.display = "none";
  document.body.style.overflow = "hidden";
  window.scrollTo(0, 0);
  setTimeout(function () {
    const inp = document.getElementById("cb-input");
    if (inp) inp.focus();
  }, 150);
  if (!chatSudahDimulai) { mulaiChat(); chatSudahDimulai = true; }
}

function tutupChatbot() {
  const page = document.getElementById("chatbot-page");
  page.classList.add("hidden-page");
  page.style.display = "none";
  document.getElementById("main-content").style.display = "";
  document.body.style.overflow = "";
}

/* =====================================================================
   [9] ENTER UNTUK MENGIRIM
   ===================================================================== */
(function pasangEventEnter() {
  const input = document.getElementById("cb-input");
  if (input) {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); kirimPesan(); }
    });
  }
})();
