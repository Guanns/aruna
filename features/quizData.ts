// features/quizData.ts

export type Question = {
    id: number;
    text: string;
    description: string; // Penjelasan singkat konteks
};

export type ResultLevel = {
    level: 'safe' | 'warning' | 'danger';
    title: string;
    message: string;
    color: string;
};

export const quizQuestions: Question[] = [
    {
        id: 1,
        text: "Apakah pasanganmu sering membuatmu merasa bersalah atas kesalahan yang tidak kamu lakukan?",
        description: "Ini bisa jadi tanda manipulasi atau gaslighting."
    },
    {
        id: 2,
        text: "Apakah dia membatasi interaksimu dengan teman atau keluarga?",
        description: "Isolasi sosial adalah cara untuk mengontrol korban."
    },
    {
        id: 3,
        text: "Apakah kamu merasa harus 'berjalan di atas cangkang telur' (takut salah bicara) saat bersamanya?",
        description: "Rasa takut konstan bukanlah tanda hubungan yang sehat."
    },
    {
        id: 4,
        text: "Apakah dia pernah memaksamu melakukan aktivitas seksual yang tidak kamu inginkan?",
        description: "Tidak berarti tidak. Paksaan adalah kekerasan."
    },
    {
        id: 5,
        text: "Apakah dia sering mengecek HP atau memintamu memberikan password akun sosmedmu?",
        description: "Privasi adalah hak mutlak, bukan rahasia yang harus dibongkar."
    },
    {
        id: 6,
        text: "Apakah dia meremehkan pencapaian atau impianmu?",
        description: "Pasangan sehat seharusnya menjadi pendukung terbesarmu."
    },
    {
        id: 7,
        text: "Apakah dia memiliki perubahan suasana hati yang ekstrem dan cepat (sangat manis lalu tiba-tiba meledak)?",
        description: "Siklus kekerasan sering dimulai dengan fase 'bulan madu' lalu ketegangan."
    }
];

export const getResult = (yesCount: number): ResultLevel => {
    if (yesCount === 0) {
        return {
            level: 'safe',
            title: "Yeay Hubunganmu Sehat 💚",
            message: "Tampaknya hubunganmu berjalan dengan saling menghargai dan percaya. Pertahankan komunikasi yang baik ini ya!",
            color: "text-teal-600"
        };
    } else if (yesCount <= 3) {
        return {
            level: 'warning',
            title: "Waspada Ya ⚠️",
            message: "Ada beberapa perilaku yang perlu diperhatikan nih. Coba komunikasikan batasanmu dengan tegas. Jangan abaikan instingmu ya!",
            color: "text-orange-500"
        };
    } else {
        return {
            level: 'danger',
            title: "Red Flag Terdeteksi 🚩",
            message: "Hubunganmu menunjukkan tanda-tanda dominasi dan kontrol yang tidak sehat. Kamu tidak sendirian, pertimbangkan untuk mencari bantuan profesional atau curhat ke orang terpercaya!",
            color: "text-red-600"
        };
    }
};