// features/chatSimData.ts
// VERSI FINAL: 9 SKENARIO KOMPLEKS

export type Choice = {
    text: string;
    nextNodeId: string;
    feedback?: string; 
    type: 'good' | 'risky' | 'neutral';
};

export type DialogueNode = {
    id: string;
    sender: 'bot' | 'user';
    message: string;
    choices?: Choice[];
    isEnding?: boolean;
};

export type Scenario = {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
    startNode: DialogueNode;
    nodes: Record<string, DialogueNode>;
};

// ==========================================
// SKENARIO 1: TOLAK PAP (Easy)
// ==========================================
const sc1: Record<string, DialogueNode> = {
    'start': {
        id: 'start',
        sender: 'bot',
        message: "Hai cantik... sepi nih di kosan. Kirimin pap dong, kangen nih 😉",
        choices: [
            { text: "Ih apaan sih, gila ya lo?", nextNodeId: 'risky_1', type: 'risky', feedback: "Marah itu wajar, tapi hati-hati. Agresi bisa memancing pelaku untuk makin mengintimidasi." },
            { text: "Maaf, aku nggak nyaman kirim foto begitu.", nextNodeId: 'good_1', type: 'good', feedback: "Bagus! Ini 'Boundary Setting'. Tegas, singkat, dan jelas tanpa emosi." }
        ]
    },
    'risky_1': { id: 'risky_1', sender: 'bot', message: "Dih, gitu aja ngegas. Sombong amat jadi cewek. Awas ya lo!", isEnding: true },
    'good_1': {
        id: 'good_1',
        sender: 'bot',
        message: "Yaelah, dikit doang pelit amat. Sekali aja deh janji gak disebar. Plisss sayang?",
        choices: [
            { text: "Nggak bisa. Hargai keputusanku atau aku block.", nextNodeId: 'good_ending', type: 'good', feedback: "Sempurna. Memberikan konsekuensi logis (block) adalah tanda ketegasan." },
            { text: "Ya udah deh, tapi janji hapus ya?", nextNodeId: 'bad_ending', type: 'risky', feedback: "Jangan percaya janji pelaku. Sekali terkirim, kendali hilang dari tanganmu." }
        ]
    },
    'good_ending': { id: 'good_ending', sender: 'bot', message: "(Dia diam dan tidak membalas lagi).", isEnding: true },
    'bad_ending': { id: 'bad_ending', sender: 'bot', message: "Nah gitu dong cantik... (Foto terkirim. Risiko penyebaran tinggi).", isEnding: true }
};

// ==========================================
// SKENARIO 2: PACAR POSESIF (Medium)
// ==========================================
const sc2: Record<string, DialogueNode> = {
    'start': {
        id: 'start',
        sender: 'bot',
        message: "Kamu dimana? Kok chat aku dari tadi nggak dibales? 😠",
        choices: [
            { text: "Lagi nongkrong sama temen-temen nih.", nextNodeId: 'neutral_1', type: 'neutral', feedback: "Jujur itu baik, tapi lihat bagaimana reaksinya terhadap kehidupan sosialmu." },
            { text: "Maaf banget sayang, tadi hp di tas.", nextNodeId: 'apology', type: 'risky', feedback: "Jangan terlalu sering minta maaf jika kamu tidak salah. Itu memberi dia power." }
        ]
    },
    'apology': {
        id: 'apology',
        sender: 'bot',
        message: "Alasan terus. Kamu pasti lagi sama cowok lain kan? Share live location SEKARANG.",
        choices: [
            { text: "Oke bentar aku share loc...", nextNodeId: 'bad_ending', type: 'risky', feedback: "Menuruti tuntutan irasional hanya akan membuatnya makin menuntut di masa depan." },
            { text: "Aku lagi sama teman cewek kok. Tolong percaya sama aku.", nextNodeId: 'assertive', type: 'good', feedback: "Membangun kepercayaan itu penting, bukan pengawasan 24 jam." }
        ]
    },
    'neutral_1': {
        id: 'neutral_1',
        sender: 'bot',
        message: "Temen siapa? Cowok? Pulang sekarang. Aku nggak suka kamu main sama mereka.",
        choices: [
            { text: "Mereka cuma temen SMA kok. Jangan mulai deh.", nextNodeId: 'argument', type: 'neutral', feedback: "Mencoba membela diri wajar, tapi hati-hati jika dia mulai playing victim." },
            { text: "Aku berhak punya waktu sama teman-temanku. Kita bahas nanti pas aku pulang.", nextNodeId: 'good_ending', type: 'good', feedback: "Hebat! Kamu menetapkan batasan waktu dan hak pribadimu dengan tenang." }
        ]
    },
    'argument': { id: 'argument', sender: 'bot', message: "Oh jadi kamu lebih milih mereka daripada aku? Yaudah kita putus aja kalau gitu!", isEnding: true },
    'bad_ending': { id: 'bad_ending', sender: 'bot', message: "(Kamu mengirim lokasi). Bagus. Jangan kemana-mana sampai aku jemput. (Kamu kehilangan kebebasanmu).", isEnding: true },
    'good_ending': { id: 'good_ending', sender: 'bot', message: "Serah lu deh. (Dia marah, tapi kamu berhasil mempertahankan hakmu untuk bersosialisasi).", isEnding: true }
};

// ==========================================
// SKENARIO 3: FINANCIAL ABUSE (Hard)
// ==========================================
const sc3: Record<string, DialogueNode> = {
    'start': {
        id: 'start',
        sender: 'bot',
        message: "Yang, transferin 500rb dong. Motor aku mogok nih, urgent banget. Nanti aku ganti pas gajian.",
        choices: [
            { text: "Waduh, aku lagi nggak ada uang lebih nih.", nextNodeId: 'guilt_trip', type: 'good', feedback: "Menolak dengan alasan kondisi finansial adalah hakmu." },
            { text: "Boleh, pake aja dulu.", nextNodeId: 'bad_ending_1', type: 'risky', feedback: "Jika ini sering terjadi dan uang tak pernah kembali, ini bentuk eksploitasi finansial." }
        ]
    },
    'guilt_trip': {
        id: 'guilt_trip',
        sender: 'bot',
        message: "Masa sama pacar sendiri itungan sih? Katanya sayang? Aku lagi susah loh ini.",
        choices: [
            { text: "Bukan itungan, tapi emang uangku pas-pasan buat bulanan.", nextNodeId: 'good_ending', type: 'good', feedback: "Pertahankan argumenmu. 'Sayang' tidak berarti harus mengorbankan kestabilan finansialmu." },
            { text: "Yaudah iya aku transfer, jangan marah ya.", nextNodeId: 'bad_ending_2', type: 'risky', feedback: "Ini manipulasi emosi (Guilt Tripping). Dia menggunakan rasa bersalahmu untuk dapat uang." }
        ]
    },
    'bad_ending_1': { id: 'bad_ending_1', sender: 'bot', message: "Makasih sayang. (Sebulan kemudian, uang itu tak pernah diganti dan dia minta lagi).", isEnding: true },
    'bad_ending_2': { id: 'bad_ending_2', sender: 'bot', message: "Nah gitu dong. Kan enak kalau nurut. (Pola ini akan terus berulang).", isEnding: true },
    'good_ending': { id: 'good_ending', sender: 'bot', message: "Pelit banget sih lo jadi orang. (Dia marah karena manipulasinya gagal, tapi uangmu selamat).", isEnding: true }
};

// ==========================================
// SKENARIO 4: STRANGER DANGER / STALKING (Easy)
// ==========================================
const sc4: Record<string, DialogueNode> = {
    'start': {
        id: 'start',
        sender: 'bot',
        message: "Hai, aku liat profil IG kamu. Kita ternyata satu kampus ya? Ketemuan yuk di taman belakang sekarang.",
        choices: [
            { text: "Maaf, ini siapa ya?", nextNodeId: 'pushy', type: 'neutral', feedback: "Wajar bertanya, tapi jangan beri info pribadi apapun." },
            { text: "Nggak bisa, aku sibuk.", nextNodeId: 'good_ending', type: 'good', feedback: "Tolak dengan tegas orang asing yang mengajak bertemu mendadak." }
        ]
    },
    'pushy': {
        id: 'pushy',
        sender: 'bot',
        message: "Aku Anton. Udahlah ayo sini bentar doang kok, jangan sombong napa.",
        choices: [
            { text: "Oke deh aku kesana.", nextNodeId: 'bad_ending', type: 'risky', feedback: "BAHAYA. Jangan pernah menemui orang asing di tempat sepi sendirian." },
            { text: "Gak kenal. Jangan ganggu atau aku lapor satpam.", nextNodeId: 'good_ending_block', type: 'good', feedback: "Ancaman lapor otoritas seringkali efektif mengusir stalker." }
        ]
    },
    'bad_ending': { id: 'bad_ending', sender: 'bot', message: "(Kamu berjalan ke tempat sepi menemui orang asing. Risiko keamanan sangat tinggi!)", isEnding: true },
    'good_ending': { id: 'good_ending', sender: 'bot', message: "Yaelah jual mahal amat.", isEnding: true },
    'good_ending_block': { id: 'good_ending_block', sender: 'bot', message: "(Dia takut dan memblokirmu duluan).", isEnding: true }
};

// ==========================================
// SKENARIO 5: GASLIGHTING / DARVO (Expert)
// ==========================================
const sc5: Record<string, DialogueNode> = {
    'start': {
        id: 'start',
        sender: 'bot',
        message: "(Kamu menemukan bukti dia chat mesra dengan orang lain). Apa? Kamu buka-buka HP aku?!",
        choices: [
            { text: "Maaf, aku cuma nggak sengaja liat notif...", nextNodeId: 'darvo_attack', type: 'risky', feedback: "Jangan minta maaf saat kamu menemukan bukti kesalahan dia. Dia mengalihkan fokus." },
            { text: "Jangan alihkan topik. Siapa 'Sayang' di chat itu?", nextNodeId: 'denial', type: 'good', feedback: "Bagus! Tetap fokus pada isu utama (perselingkuhan), bukan pada isu hp." }
        ]
    },
    'darvo_attack': {
        id: 'darvo_attack',
        sender: 'bot',
        message: "Kamu tuh parnoan banget! Gak sopan tau gak privasi orang diganggu! Kamu gak percaya sama aku?!",
        choices: [
            { text: "Iya maafin aku... aku salah.", nextNodeId: 'bad_ending', type: 'risky', feedback: "Ini DARVO (Deny, Attack, Reverse Victim & Offender). Kamu jadi merasa bersalah padahal dia pelakunya." },
            { text: "Kepercayaan itu dijaga. Chat itu bukti kamu ngerusak kepercayaan.", nextNodeId: 'good_ending', type: 'good', feedback: "Kamu tidak termakan manipulasinya." }
        ]
    },
    'denial': {
        id: 'denial',
        sender: 'bot',
        message: "Itu sepupu aku! Kamu tuh cemburuan berlebihan, sakit jiwa tau gak.",
        choices: [
            { text: "Masa sih sepupu panggil sayang?", nextNodeId: 'good_ending', type: 'good', feedback: "Gunakan logika. Jangan biarkan dia mendefinisikan realitasmu." }
        ]
    },
    'bad_ending': { id: 'bad_ending', sender: 'bot', message: "Awas kalo diulangin lagi. Pikirin kesalahan kamu.", isEnding: true },
    'good_ending': { id: 'good_ending', sender: 'bot', message: "Terserah! Kamu emang gak bisa dikasih tau. (Dia pergi karena manipulasinya gagal).", isEnding: true }
};

// ==========================================
// SKENARIO 6: COERCION / PAKSAAN SEKSUAL (Expert)
// ==========================================
const sc6: Record<string, DialogueNode> = {
    'start': {
        id: 'start',
        sender: 'bot',
        message: "Sayang, temen-temen aku semua udah 'ngelakuin' sama pacarnya. Masa kita belum? Kamu gak sayang aku ya?",
        choices: [
            { text: "Aku belum siap. Tolong hargai itu.", nextNodeId: 'pressure', type: 'good', feedback: "Tidak adalah tidak. Kesiapanmu adalah prioritas." },
            { text: "Sayang sih, tapi...", nextNodeId: 'guilt', type: 'neutral', feedback: "Ragu-ragu memberi celah dia untuk menekan lebih jauh." }
        ]
    },
    'pressure': {
        id: 'pressure',
        sender: 'bot',
        message: "Kalo sayang harusnya mau dong buktiin. Jangan-jangan kamu gak serius sama aku? Kalo gak mau, kita putus aja.",
        choices: [
            { text: "Kalau syarat pacaran adalah seks, kita putus aja.", nextNodeId: 'good_ending', type: 'good', feedback: "Sangat berani! Ini membuktikan kamu menghargai dirimu lebih dari hubungan toxic." },
            { text: "Jangan putus dong... yaudah deh.", nextNodeId: 'bad_ending', type: 'risky', feedback: "Ini 'Sexual Coercion'. Consent yang didapat dari ancaman bukanlah consent." }
        ]
    },
    'guilt': {
        id: 'guilt',
        sender: 'bot',
        message: "Tuh kan, kamu egois. Aku lagi butuh banget, bantuin aku dong sekali aja.",
        choices: [
            { text: "Badan aku punya aku. Aku bilang enggak.", nextNodeId: 'good_ending', type: 'good', feedback: "Tegas. Tubuhmu otoritasmu." }
        ]
    },
    'bad_ending': { id: 'bad_ending', sender: 'bot', message: "Nah gitu dong, nanti kamu juga suka. (Terjadilah aktivitas seksual tanpa persetujuan penuh).", isEnding: true },
    'good_ending': { id: 'good_ending', sender: 'bot', message: "Oke fine! Cari aja cowok lain yang alim! (Kamu selamat dari paksaan).", isEnding: true }
};

// ==========================================
// SKENARIO 7: MINTA PASSWORD (Medium)
// ==========================================
const sc7: Record<string, DialogueNode> = {
    'start': {
        id: 'start',
        sender: 'bot',
        message: "Bagi password IG sama WA kamu dong. Biar adil, kan aku udah kasih password aku ke kamu.",
        choices: [
            { text: "Aku nggak minta password kamu kok. Itu privasi.", nextNodeId: 'trust_issue', type: 'good', feedback: "Benar. Privasi digital adalah hak, bukan tanda ketidaksetiaan." },
            { text: "Nih password aku: rahasia123.", nextNodeId: 'bad_ending', type: 'risky', feedback: "Memberi password menghilangkan ruang aman pribadimu." }
        ]
    },
    'trust_issue': {
        id: 'trust_issue',
        sender: 'bot',
        message: "Kalo gak ada yang disembunyiin, kenapa takut? Pasti ada chat cowok lain ya?",
        choices: [
            { text: "Ini soal prinsip privasi, bukan selingkuh.", nextNodeId: 'good_ending', type: 'good', feedback: "Pertahankan argumen prinsip." },
            { text: "Enggak ada kok! Yaudah nih aku kasih biar kamu percaya.", nextNodeId: 'bad_ending', type: 'risky', feedback: "Membuktikan kejujuran tidak harus dengan melanggar privasi sendiri." }
        ]
    },
    'bad_ending': { id: 'bad_ending', sender: 'bot', message: "Oke login. Awas kalo aku nemu yang aneh-aneh. (Dia mulai mengontrol siapa yang boleh kamu chat).", isEnding: true },
    'good_ending': { id: 'good_ending', sender: 'bot', message: "Gak asik lo. Rahasia-rahasiaan mulu. (Dia kesal, tapi privasimu aman).", isEnding: true }
};

// ==========================================
// SKENARIO 8: SILENT TREATMENT (Medium)
// ==========================================
const sc8: Record<string, DialogueNode> = {
    'start': {
        id: 'start',
        sender: 'bot',
        message: "(Dia sudah mendiamkanmu selama 3 hari tanpa alasan jelas).",
        choices: [
            { text: "Sayang aku salah apa? Maafin aku dong, jangan diem aja.", nextNodeId: 'begging', type: 'risky', feedback: "Mengemis perhatian saat didiamkan hanya memuaskan ego pelakunya." },
            { text: "Aku perhatiin kamu butuh waktu sendiri. Kabarin kalau udah siap ngobrol ya.", nextNodeId: 'secure', type: 'good', feedback: "Ini respon 'Secure'. Kamu tidak terpancing emosi dan tetap membuka pintu komunikasi sehat." }
        ]
    },
    'begging': {
        id: 'begging',
        sender: 'bot',
        message: "(Read doang).",
        choices: [
            { text: "Jawab dong pliss... aku gak bisa diginiin.", nextNodeId: 'bad_ending', type: 'risky', feedback: "Ini siksaan emosional. Semakin kamu mengejar, semakin dia merasa berkuasa." },
            { text: "Oke, kayaknya kamu belum mau ngomong. Aku fokus kegiatanku dulu ya.", nextNodeId: 'good_ending', type: 'good', feedback: "Ambil kembali kontrol emosimu." }
        ]
    },
    'secure': {
        id: 'secure',
        sender: 'bot',
        message: "Pikir aja sendiri kesalahan kamu apa!",
        choices: [
            { text: "Aku nggak bisa baca pikiran. Kita bahas kalau kamu udah mau ngomong jelas.", nextNodeId: 'good_ending', type: 'good', feedback: "Komunikasi sehat butuh kejelasan, bukan tebak-tebakan." }
        ]
    },
    'bad_ending': { id: 'bad_ending', sender: 'bot', message: "(Dia terus mendiamkanmu sampai kamu merasa depresi dan bersalah).", isEnding: true },
    'good_ending': { id: 'good_ending', sender: 'bot', message: "(Dia sadar taktik diamnya tidak mempan memanipulasimu).", isEnding: true }
};

// ==========================================
// SKENARIO 9: TEMAN TIDAK MENDUKUNG (Hard)
// ==========================================
const sc9: Record<string, DialogueNode> = {
    'start': {
        id: 'start',
        sender: 'bot',
        message: "Halah, cowok kamu tuh baik banget tau. Mungkin kamunya aja yang terlalu baperan kali sampe bilang dia abusive.",
        choices: [
            { text: "Mungkin ya... aku yang salah.", nextNodeId: 'doubt', type: 'risky', feedback: "Jangan biarkan orang lain mendefinisikan pengalaman lukamu." },
            { text: "Aku yang jalanin hubungannya, aku tau apa yang aku rasain sakit.", nextNodeId: 'validate', type: 'good', feedback: "Validasi perasaanmu sendiri meski orang lain tidak." }
        ]
    },
    'doubt': {
        id: 'doubt',
        sender: 'bot',
        message: "Iya lah. Bersyukur dapet dia. Jangan banyak nuntut.",
        isEnding: true
    },
    'validate': {
        id: 'validate',
        sender: 'bot',
        message: "Yaudah sih terserah. Aku cuma ngingetin.",
        choices: [
            { text: "Makasih concern-nya, tapi aku butuh dukungan sekarang, bukan penilaian.", nextNodeId: 'good_ending', type: 'good', feedback: "Mengkomunikasikan kebutuhan emosional kepada teman itu penting." }
        ]
    },
    'good_ending': { id: 'good_ending', sender: 'bot', message: "Oke sorry deh. Cerita lagi gih.", isEnding: true }
};

// --- EXPORT LIST ---
export const scenarios: Scenario[] = [
    { id: 'pap', title: "Tolak Permintaan PAP", description: "Menolak permintaan foto intim tanpa rasa takut.", difficulty: 'Easy', startNode: sc1['start'], nodes: sc1 },
    { id: 'stranger', title: "Kenalan Agresif", description: "Menghadapi orang asing/stalker yang memaksa bertemu.", difficulty: 'Easy', startNode: sc4['start'], nodes: sc4 },
    { id: 'posesif', title: "Pacar Posesif", description: "Mempertahankan hak bersosialisasi dari pacar pengekang.", difficulty: 'Medium', startNode: sc2['start'], nodes: sc2 },
    { id: 'pass', title: "Minta Password", description: "Menjaga privasi digital dari pasangan yang insecure.", difficulty: 'Medium', startNode: sc7['start'], nodes: sc7 },
    { id: 'silent', title: "Silent Treatment", description: "Menghadapi pasangan yang mendiamkanmu sebagai hukuman.", difficulty: 'Medium', startNode: sc8['start'], nodes: sc8 },
    { id: 'friend', title: "Teman Invalidasi", description: "Menghadapi teman yang tidak percaya ceritamu.", difficulty: 'Medium', startNode: sc9['start'], nodes: sc9 },
    { id: 'money', title: "Pinjam Duit (Financial)", description: "Mendeteksi tanda-tanda eksploitasi keuangan.", difficulty: 'Hard', startNode: sc3['start'], nodes: sc3 },
    { id: 'gaslight', title: "Gaslighting & DARVO", description: "Melawan manipulasi tingkat tinggi pemutarbalik fakta.", difficulty: 'Expert', startNode: sc5['start'], nodes: sc5 },
    { id: 'coercion', title: "Paksaan Halus (Seksual)", description: "Mempertahankan consent dari tekanan manipulatif.", difficulty: 'Expert', startNode: sc6['start'], nodes: sc6 },
];