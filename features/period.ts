// features/period.ts
// VERSI FINAL: Robust Date Calculation & Phases

"use client";

export type PeriodData = {
    lastPeriodDate: string; // Format YYYY-MM-DD
    cycleLength: number;    // Default 28
    periodLength: number;   // Default 5
};

const STORAGE_KEY = "aruna_period_data";

export const savePeriodData = (data: PeriodData) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
};

export const getPeriodData = (): PeriodData | null => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
};

// Helper: Hitung selisih hari tanpa jam (Pure Date)
const diffDays = (date1: Date, date2: Date) => {
    // Set jam ke 00:00:00 untuk akurasi hari
    const d1 = new Date(date1.setHours(0, 0, 0, 0));
    const d2 = new Date(date2.setHours(0, 0, 0, 0));
    return Math.ceil((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
};

export const calculateCycle = (data: PeriodData) => {
    const today = new Date();
    const lastDate = new Date(data.lastPeriodDate);
    
    // 1. Hitung Hari Ke-berapa dalam siklus saat ini
    // Menggunakan modulo agar siklus terus berlanjut meski user lupa input bulan baru
    const daysSinceLast = diffDays(today, lastDate);
    const dayInCycle = (daysSinceLast % data.cycleLength) + 1;

    // 2. Hitung Haid Berikutnya
    const nextPeriodDate = new Date(lastDate);
    // Tambahkan siklus sebanyak (jumlah siklus yang sudah lewat + 1)
    const cyclesPassed = Math.floor(daysSinceLast / data.cycleLength);
    nextPeriodDate.setDate(lastDate.getDate() + (data.cycleLength * (cyclesPassed + 1)));
    
    const daysLeft = diffDays(nextPeriodDate, today);

    // 3. Tentukan Fase & Tips
    let phase = "";
    let mood = "";
    let desc = "";

    // Logika Fase Medis
    if (dayInCycle <= data.periodLength) {
        phase = "Menstruasi";
        mood = "🩸 Recharge";
        desc = "Tubuhmu sedang meluruh. Wajar kalau lemas. Minum air hangat & istirahat ya.";
    } else if (dayInCycle <= data.cycleLength - 14) {
        phase = "Folikuler";
        mood = "✨ Glowing";
        desc = "Estrogen naik! Energimu lagi bagus-bagusnya buat produktif & sosialisasi.";
    } else if (dayInCycle === data.cycleLength - 13) { // Sekitar hari ke-14 (untuk siklus 28)
        phase = "Ovulasi";
        mood = "🥚 Super Power";
        desc = "Puncak kesuburan. Kamu mungkin merasa lebih percaya diri & menarik hari ini.";
    } else {
        phase = "Luteal (PMS)";
        mood = "🍫 Sensitive";
        desc = "Progesteron dominan. Kalau tiba-tiba sedih atau lapar terus, itu valid kok.";
    }

    return {
        nextDate: nextPeriodDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' }),
        daysLeft,
        dayInCycle,
        phase,
        mood,
        desc
    };
};