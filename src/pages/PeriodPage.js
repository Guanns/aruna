import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// app/period/page.tsx
// VERSI FINAL FIX: Type Safe & Escaped Characters
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, Cog6ToothIcon, CalendarDaysIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { getPeriodData, savePeriodData, calculateCycle } from '../features/period';
import Swal from 'sweetalert2';
export default function PeriodPage() {
    const [mode, setMode] = useState('LOADING');
    const [step, setStep] = useState(1);
    // Data State
    const [lastDate, setLastDate] = useState('');
    const [cycleLen, setCycleLen] = useState(28);
    const [periodLen, setPeriodLen] = useState(5);
    // FIX: Gunakan tipe CycleInfo, bukan any
    const [info, setInfo] = useState(null);
    // Load Data on Mount
    useEffect(() => {
        const saved = getPeriodData();
        if (saved) {
            setLastDate(saved.lastPeriodDate);
            setCycleLen(saved.cycleLength);
            setPeriodLen(saved.periodLength);
            setInfo(calculateCycle(saved));
            setMode('DASHBOARD');
        }
        else {
            setMode('SETUP');
        }
    }, []);
    const handleNextStep = () => {
        if (step === 1 && !lastDate) {
            Swal.fire({ toast: true, position: 'top', icon: 'warning', title: 'Isi tanggal dulu ya cantik!', showConfirmButton: false, timer: 1500 });
            return;
        }
        if (step < 3) {
            setStep(step + 1);
        }
        else {
            finishSetup();
        }
    };
    const finishSetup = () => {
        const newData = {
            lastPeriodDate: lastDate,
            cycleLength: cycleLen,
            periodLength: periodLen
        };
        savePeriodData(newData);
        setInfo(calculateCycle(newData));
        setMode('DASHBOARD');
        Swal.fire({ toast: true, position: 'top', icon: 'success', title: 'Siklus tersimpan!', showConfirmButton: false, timer: 1500 });
    };
    const resetSetup = () => {
        setStep(1);
        setMode('SETUP');
    };
    // --- SETUP WIZARD UI ---
    const renderSetup = () => (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[70vh] animate-fade-in-up", children: [_jsx("div", { className: "flex gap-2.5 mb-8", children: [1, 2, 3].map(i => (_jsx("div", { className: `h-2.5 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-rose-500' : 'w-2.5 bg-rose-200'}` }, i))) }), _jsxs("div", { className: "bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-white w-full max-w-md text-center relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300" }), step === 1 && (_jsxs("div", { className: "animate-slide-in", children: [_jsx("div", { className: "w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner border border-rose-100/50", children: "\uD83D\uDDD3\uFE0F" }), _jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-2", children: "Kapan haid terakhirmu dimulai?" }), _jsx("p", { className: "text-xs text-gray-400 mb-8 font-medium", children: "Pilih hari pertama pendarahan siklus terakhirmu." }), _jsx("div", { className: "relative", children: _jsx("input", { type: "date", value: lastDate, onChange: (e) => setLastDate(e.target.value), className: "w-full p-4.5 rounded-2xl bg-stone-50 border border-stone-200 text-center font-bold text-gray-700 text-base focus:border-rose-400 focus:bg-white outline-none transition-all duration-300" }) })] })), step === 2 && (_jsxs("div", { className: "animate-slide-in", children: [_jsx("div", { className: "w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner border border-rose-100/50", children: "\uD83D\uDD04" }), _jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-2", children: "Berapa lama siklusmu?" }), _jsx("p", { className: "text-xs text-gray-400 mb-8 font-medium", children: "Jarak hari pertama haid ke haid berikutnya. Rata-rata 28 hari." }), _jsxs("div", { className: "flex items-center justify-center gap-6 mb-4", children: [_jsx("button", { onClick: () => setCycleLen(c => Math.max(21, c - 1)), className: "w-12 h-12 rounded-full bg-rose-50 text-rose-600 font-extrabold text-xl hover:bg-rose-100 hover:scale-105 active:scale-95 transition-all shadow-sm border border-rose-100/40", children: "-" }), _jsx("span", { className: "text-5xl font-black text-rose-500 w-24 tracking-tight", children: cycleLen }), _jsx("button", { onClick: () => setCycleLen(c => Math.min(45, c + 1)), className: "w-12 h-12 rounded-full bg-rose-50 text-rose-600 font-extrabold text-xl hover:bg-rose-100 hover:scale-105 active:scale-95 transition-all shadow-sm border border-rose-100/40", children: "+" })] }), _jsx("p", { className: "text-[10px] font-extrabold text-rose-400 uppercase tracking-widest", children: "HARI" })] })), step === 3 && (_jsxs("div", { className: "animate-slide-in", children: [_jsx("div", { className: "w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner border border-rose-100/50", children: "\uD83E\uDE78" }), _jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-2", children: "Biasanya berapa hari?" }), _jsx("p", { className: "text-xs text-gray-400 mb-8 font-medium", children: "Durasi pendarahan haid berlangsung." }), _jsxs("div", { className: "flex items-center justify-center gap-6 mb-4", children: [_jsx("button", { onClick: () => setPeriodLen(c => Math.max(2, c - 1)), className: "w-12 h-12 rounded-full bg-rose-50 text-rose-600 font-extrabold text-xl hover:bg-rose-100 hover:scale-105 active:scale-95 transition-all shadow-sm border border-rose-100/40", children: "-" }), _jsx("span", { className: "text-5xl font-black text-rose-500 w-24 tracking-tight", children: periodLen }), _jsx("button", { onClick: () => setPeriodLen(c => Math.min(10, c + 1)), className: "w-12 h-12 rounded-full bg-rose-50 text-rose-600 font-extrabold text-xl hover:bg-rose-100 hover:scale-105 active:scale-95 transition-all shadow-sm border border-rose-100/40", children: "+" })] }), _jsx("p", { className: "text-[10px] font-extrabold text-rose-400 uppercase tracking-widest", children: "HARI" })] })), _jsx("div", { className: "mt-10 flex justify-end", children: _jsxs("button", { onClick: handleNextStep, className: "flex items-center gap-2 bg-[#6B4F4F] text-white px-8 py-3.5 rounded-full font-bold shadow-md hover:bg-[#5a4242] hover:shadow-lg hover:scale-102 active:scale-95 transition-all", children: [_jsx("span", { children: step === 3 ? "Selesai" : "Lanjut" }), _jsx(ArrowRightIcon, { className: "w-4 h-4" })] }) })] })] }));
    // --- DASHBOARD UI ---
    const renderDashboard = () => (_jsxs("div", { className: "animate-fade-in-up max-w-md mx-auto w-full", children: [_jsxs("header", { className: "flex items-center justify-between mb-10", children: [_jsx(Link, { to: "/dashboard", className: "p-3 bg-white/70 rounded-2xl hover:bg-white hover:scale-105 active:scale-95 transition-all text-[#6B4F4F] shadow-sm border border-stone-100", children: _jsx(ArrowLeftIcon, { className: "w-5 h-5" }) }), _jsx("h1", { className: "text-lg font-bold text-[#6B4F4F] tracking-wide", children: "Siklus Aruna" }), _jsx("button", { onClick: resetSetup, className: "p-3 bg-white/70 rounded-2xl hover:bg-white hover:scale-105 active:scale-95 transition-all text-[#6B4F4F] shadow-sm border border-stone-100", title: "Edit Siklus", children: _jsx(Cog6ToothIcon, { className: "w-5 h-5" }) })] }), info && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-gradient-to-b from-[#e06977] via-[#c94d5b] to-[#b03442] rounded-[3rem] p-8 text-white shadow-xl shadow-rose-950/5 relative overflow-hidden text-center border border-white/20", children: [_jsx("div", { className: "absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]" }), _jsx("div", { className: "absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-xl" }), _jsx("div", { className: "absolute -left-6 -bottom-6 w-32 h-32 bg-black/10 rounded-full blur-xl" }), _jsx("p", { className: "text-xs font-bold opacity-90 mb-1 uppercase tracking-widest", children: "Haid Berikutnya" }), _jsxs("div", { className: "relative py-6", children: [_jsx("h2", { className: "text-7xl font-black tracking-tighter drop-shadow-md", children: info.daysLeft }), _jsx("p", { className: "text-sm font-bold mt-2 opacity-90 uppercase tracking-wider", children: "Hari Lagi" })] }), _jsxs("div", { className: "inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4.5 py-2 rounded-full text-xs font-bold border border-white/15 shadow-sm", children: [_jsx(CalendarDaysIcon, { className: "w-4 h-4 text-rose-200" }), _jsx("span", { children: info.nextDate })] })] }), _jsxs("div", { className: "bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-sm border border-white", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("div", { className: `w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner border
                                ${info.phase === 'Menstruasi' ? 'bg-rose-50 text-rose-600 border-rose-100/50' :
                                            info.phase === 'Ovulasi' ? 'bg-purple-50 text-purple-600 border-purple-100/50' :
                                                info.phase === 'Folikuler' ? 'bg-green-50 text-green-600 border-green-100/50' :
                                                    'bg-amber-50 text-amber-600 border-amber-100/50'}
                            `, children: info.phase === 'Menstruasi' ? '🩸' : info.phase === 'Ovulasi' ? '🥚' : info.phase === 'Folikuler' ? '✨' : '🍫' }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-wider", children: "Fase Saat Ini" }), _jsx("h3", { className: "text-xl font-bold text-gray-800 tracking-tight", children: info.phase })] })] }), _jsx("div", { className: "bg-stone-50 p-4 rounded-2xl border border-stone-100", children: _jsxs("p", { className: "text-xs text-gray-600 leading-relaxed font-medium italic", children: ["\"", info.desc, "\""] }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-white/70 p-5 rounded-[2.25rem] border border-white shadow-sm flex flex-col items-center text-center justify-center min-h-[120px]", children: [_jsx("span", { className: "text-3.5xl mb-2 select-none", children: "\uD83E\uDDD6\u200D\u2640\uFE0F" }), _jsx("span", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5", children: "Kondisi Tubuh" }), _jsx("span", { className: "text-sm font-bold text-gray-700", children: info.mood })] }), _jsxs("div", { className: "bg-white/70 p-5 rounded-[2.25rem] border border-white shadow-sm flex flex-col items-center text-center justify-center min-h-[120px]", children: [_jsx("span", { className: "text-3.5xl mb-2 select-none", children: "\uD83E\uDD64" }), _jsx("span", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5", children: "Saran Aktivitas" }), _jsx("span", { className: "text-sm font-bold text-gray-700", children: info.phase === 'Menstruasi' ? 'Minum Air Hangat' :
                                            info.phase === 'Folikuler' ? 'Aktivitas Padat' :
                                                info.phase === 'Ovulasi' ? 'Olahraga Kardio' : 'Kurangi Kafein' })] })] })] }))] }));
    return (_jsxs("div", { className: "w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20", children: [_jsx(Link, { to: "/dashboard", className: "fixed top-6 left-6 z-50 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-md rounded-xl flex items-center justify-center shadow-md border border-stone-200/50 text-[#6B4F4F] transition-all hover:scale-105 active:scale-95 group", title: "Kembali ke Dashboard", children: _jsx(ArrowLeftIcon, { className: "w-5 h-5 group-hover:-translate-x-0.5 transition-transform" }) }), _jsxs("div", { className: "fixed inset-0 pointer-events-none z-0 overflow-hidden", children: [_jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-100/35 rounded-full blur-[130px] animate-pulse", style: { animationDuration: '8s' } }), _jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FFF5E6]/40 rounded-full blur-[130px] animate-pulse", style: { animationDuration: '10s' } }), _jsx("div", { className: "absolute inset-0 opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" })] }), _jsx("div", { className: "max-w-2xl mx-auto px-6 pt-28 relative z-10", children: mode === 'LOADING' ? _jsx("div", { className: "text-center mt-20 text-sm font-bold text-stone-400", children: "Loading..." }) :
                    mode === 'SETUP' ? renderSetup() : renderDashboard() })] }));
}
