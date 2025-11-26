// features/glossaryData.ts

export type GlossaryTerm = {
    id: string;
    term: string;
    definition: string;
    example: string; // Contoh penggunaan kalimat
    category: 'Gen Z' | 'Toxic Relationship' | 'Dating World' | 'Mental Health';
};

export const glossaryTerms: GlossaryTerm[] = [
    // --- TOXIC RELATIONSHIP ---
    {
        id: 'gaslighting',
        term: 'Gaslighting',
        definition: 'Manipulasi psikologis di mana pelaku membuat korban mempertanyakan ingatan, persepsi, atau kewarasannya sendiri.',
        example: '"Kamu tuh terlalu sensitif, aku nggak pernah bilang gitu kok!" (Padahal dia jelas-jelas bilang).',
        category: 'Toxic Relationship'
    },
    {
        id: 'love-bombing',
        term: 'Love Bombing',
        definition: 'Memberikan perhatian, hadiah, dan kasih sayang berlebihan di awal hubungan untuk memanipulasi dan mengontrol korban.',
        example: 'Baru kenal seminggu tapi udah bilang "Kamu belahan jiwaku"',
        category: 'Toxic Relationship'
    },
    {
        id: 'breadcrumbing',
        term: 'Breadcrumbing',
        definition: 'Memberi "remah-remah" perhatian (chat sesekali, like story) cuma buat jaga korban tetap tertarik, tapi nggak niat serius.',
        example: 'Dia ngilang seminggu, tiba-tiba reply story "Cantik bgt", terus ngilang lagi.',
        category: 'Dating World'
    },
    {
        id: 'ghosting',
        term: 'Ghosting',
        definition: 'Memutus komunikasi secara tiba-tiba tanpa penjelasan apapun.',
        example: 'Lagi asik chat tiap hari, eh tiba-tiba dia block WA dan IG tanpa alasan.',
        category: 'Dating World'
    },
    {
        id: 'darvo',
        term: 'DARVO',
        definition: 'Singkatan dari Deny, Attack, and Reverse Victim and Offender. Taktik pelaku kekerasan untuk memutarbalikkan fakta seolah dia yang jadi korban.',
        example: 'Kamu yang dipukul, tapi dia yang nangis dan bilang kamu yang bikin dia emosi.',
        category: 'Toxic Relationship'
    },
    
    // --- GEN Z ---
    {
        id: 'fomo',
        term: 'FOMO',
        definition: 'Fear Of Missing Out. Rasa cemas takut ketinggalan tren atau momen seru yang lagi dialami orang lain.',
        example: 'Liat story orang nonton konser semua, jadi FOMO banget nih.',
        category: 'Gen Z'
    },
    {
        id: 'jomo',
        term: 'JOMO',
        definition: 'Joy Of Missing Out. Kebalikan FOMO; merasa senang dan tenang nggak ikutan keramaian/tren.',
        example: 'Malam minggu di rumah aja yuk maskeran sambil nonton Netflix, JOMO banget rasanya.',
        category: 'Gen Z'
    },
    {
        id: 'red-flag',
        term: 'Red Flag 🚩',
        definition: 'Tanda bahaya atau peringatan dalam diri seseorang yang menunjukkan dia mungkin tidak cocok atau berbahaya.',
        example: 'Dia kasar sama pelayan restoran? Wah, red flag banget dtuh.',
        category: 'Dating World'
    },
    {
        id: 'beige-flag',
        term: 'Beige Flag',
        definition: 'Kebiasaan pasangan yang nggak toxic, tapi aneh atau membosankan. Belum tentu bahaya, tapi bikin mikir.',
        example: 'Dia kalau makan bubur nggak diaduk dan nggak pake kerupuk. Beige flag banget.',
        category: 'Gen Z'
    },
    {
        id: 'rizz',
        term: 'Rizz',
        definition: 'Karisma. Kemampuan seseorang untuk menarik perhatian atau menggoda orang lain (Cha-rizz-ma).',
        example: 'Gila, rizz-nya dia nggak main-main, tatapannya bikin salting.',
        category: 'Gen Z'
    },
    {
        id: 'salty',
        term: 'Salty',
        definition: 'Perasaan kesal, pahit, atau tersinggung karena sesuatu (biasanya hal sepele).',
        example: 'Jangan salty gitu dong kalo kalah main game.',
        category: 'Gen Z'
    },
    {
        id: 'pick-me',
        term: 'Pick Me',
        definition: 'Seseorang yang berusaha keras tampil "beda" dari gender-nya demi mendapat validasi lawan jenis.',
        example: '"Aku sih nggak suka drama kayak cewek lain." Hadeh, pick me girl banget.',
        category: 'Gen Z'
    },
    {
        id: 'situationship',
        term: 'Situationship',
        definition: 'Hubungan romantis yang tidak jelas statusnya. Lebih dari teman, tapi bukan pacar.',
        example: 'Udah jalan 6 bulan tapi nggak jadian. Terjebak situationship nih.',
        category: 'Dating World'
    },
    {
        id: 'ick',
        term: 'The Ick',
        definition: 'Perasaan ilfeel (ilang feeling) tiba-tiba karena hal kecil yang dilakukan gebetan.',
        example: 'Pas liat dia lari ngejar bus tapi kesandung, tiba-tiba dapet the ick.',
        category: 'Gen Z'
    },

    // --- MENTAL HEALTH ---
    {
        id: 'burnout',
        term: 'Burnout',
        definition: 'Kelelahan fisik, emosional, dan mental yang parah akibat stres berkepanjangan.',
        example: 'Kerja keras tiap hari, akhirnya burnout dan nggak bisa ngapa-ngapain seminggu.',
        category: 'Mental Health'
    },
    {
        id: 'imposter',
        term: 'Imposter Syndrome',
        definition: 'Perasaan tidak pantas atas pencapaian sendiri dan takut dianggap penipu, padahal sebenarnya kompeten.',
        example: 'Dapet promosi kerja tapi ngerasa cuma karena hoki, bukan karena pinter. Dasar imposter syndrome.',
        category: 'Mental Health'
    },
    {
        id: 'ovt',
        term: 'OVT (Overthinking)',
        definition: 'Memikirkan sesuatu secara berlebihan dan berulang-ulang, biasanya hal negatif yang belum tentu terjadi.',
        example: 'Jam 2 pagi belum tidur gara-gara OVT mikirin chat dia yang singkat banget.',
        category: 'Mental Health'
    }
];