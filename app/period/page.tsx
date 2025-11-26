// app/period/page.tsx
// VERSI UX REVOLUTION: Conversational Setup & Glassy Dashboard

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    ArrowLeftIcon, HeartIcon, SparklesIcon, 
    Cog6ToothIcon, CalendarDaysIcon, CheckCircleIcon,
    ArrowRightIcon
} from '@heroicons/react/24/solid';
import { PeriodData, getPeriodData, savePeriodData, calculateCycle } from '../../features/period';
import Swal from 'sweetalert2';

export default function PeriodPage() {
    const [mode, setMode] = useState<'LOADING' | 'SETUP' | 'DASHBOARD'>('LOADING');
    const [step, setStep] = useState(1); // Setup Wizard Step (1-3)
    
    // Data State
    const [lastDate, setLastDate] = useState('');
    const [cycleLen, setCycleLen] = useState(28);
    const [periodLen, setPeriodLen] = useState(5);
    const [info, setInfo] = useState<any>(null);

    // Load Data on Mount
    useEffect(() => {
        const saved = getPeriodData();
        if (saved) {
            setLastDate(saved.lastPeriodDate);
            setCycleLen(saved.cycleLength);
            setPeriodLen(saved.periodLength);
            setInfo(calculateCycle(saved));
            setMode('DASHBOARD');
        } else {
            setMode('SETUP');
        }
    }, []);

    const handleNextStep = () => {
        if (step === 1 && !lastDate) {
            Swal.fire({ toast: true, position: 'top', icon: 'warning', title: 'Isi tanggal dulu ya!', showConfirmButton: false, timer: 1500 });
            return;
        }
        if (step < 3) {
            setStep(step + 1);
        } else {
            finishSetup();
        }
    };

    const finishSetup = () => {
        const newData: PeriodData = {
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
    const renderSetup = () => (
        <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in-up">
            {/* Progress Dots */}
            <div className="flex gap-2 mb-10">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`w-3 h-3 rounded-full transition-all ${step === i ? 'bg-rose-500 scale-125' : 'bg-rose-200'}`} />
                ))}
            </div>

            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white w-full max-w-md text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-300 to-pink-300"></div>
                
                {/* Step 1: Tanggal */}
                {step === 1 && (
                    <div className="animate-slide-in">
                        <span className="text-4xl mb-4 block">🗓️</span>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Kapan haid terakhirmu dimulai?</h2>
                        <p className="text-sm text-gray-500 mb-8">Pilih hari pertama kamu dapet ya.</p>
                        <input 
                            type="date" 
                            value={lastDate}
                            onChange={(e) => setLastDate(e.target.value)}
                            className="w-full p-4 rounded-2xl bg-rose-50 border-2 border-rose-100 text-center font-bold text-gray-700 text-lg focus:border-rose-400 outline-none transition-all"
                        />
                    </div>
                )}

                {/* Step 2: Siklus */}
                {step === 2 && (
                    <div className="animate-slide-in">
                        <span className="text-4xl mb-4 block">🔄</span>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Berapa lama siklusmu?</h2>
                        <p className="text-sm text-gray-500 mb-8">Jarak dari hari pertama haid ke haid berikutnya. Rata-rata 28 hari.</p>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <button onClick={() => setCycleLen(c => Math.max(21, c-1))} className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-bold text-xl hover:bg-rose-200">-</button>
                            <span className="text-5xl font-black text-rose-500 w-24">{cycleLen}</span>
                            <button onClick={() => setCycleLen(c => Math.min(45, c+1))} className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-bold text-xl hover:bg-rose-200">+</button>
                        </div>
                        <p className="text-xs font-bold text-rose-400 uppercase tracking-widest">HARI</p>
                    </div>
                )}

                {/* Step 3: Durasi */}
                {step === 3 && (
                    <div className="animate-slide-in">
                        <span className="text-4xl mb-4 block">🩸</span>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Biasanya berapa hari?</h2>
                        <p className="text-sm text-gray-500 mb-8">Lama pendarahan berlangsung.</p>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <button onClick={() => setPeriodLen(c => Math.max(2, c-1))} className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-bold text-xl hover:bg-rose-200">-</button>
                            <span className="text-5xl font-black text-rose-500 w-24">{periodLen}</span>
                            <button onClick={() => setPeriodLen(c => Math.min(10, c+1))} className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-bold text-xl hover:bg-rose-200">+</button>
                        </div>
                        <p className="text-xs font-bold text-rose-400 uppercase tracking-widest">HARI</p>
                    </div>
                )}

                <div className="mt-10 flex justify-end">
                    <button 
                        onClick={handleNextStep} 
                        className="flex items-center gap-2 bg-rose-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-rose-600 hover:scale-105 transition-all"
                    >
                        {step === 3 ? "Selesai" : "Lanjut"} <ArrowRightIcon className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
    );

    // --- DASHBOARD UI ---
    const renderDashboard = () => (
        <div className="animate-fade-in-up max-w-md mx-auto w-full">
            <header className="flex items-center justify-between mb-10">
                <Link href="/dashboard" className="p-3 bg-white/60 rounded-full hover:bg-white transition-all text-[#6B4F4F] shadow-sm">
                    <ArrowLeftIcon className="w-5 h-5" />
                </Link>
                <h1 className="text-xl font-bold text-[#6B4F4F] tracking-wide">Haid Tracker</h1>
                <button onClick={resetSetup} className="p-3 bg-white/60 rounded-full hover:bg-white transition-all text-[#6B4F4F] shadow-sm" title="Edit Siklus">
                    <Cog6ToothIcon className="w-5 h-5" />
                </button>
            </header>

            {info && (
                <div className="space-y-6">
                    {/* BIG CIRCLE CARD */}
                    <div className="bg-gradient-to-b from-rose-400 to-pink-500 rounded-[3rem] p-8 text-white shadow-2xl shadow-rose-200 relative overflow-hidden text-center border-4 border-white/20">
                        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
                        
                        <p className="text-sm font-medium opacity-90 mb-1 uppercase tracking-widest">Haid Berikutnya</p>
                        <div className="relative py-6">
                            <h2 className="text-6xl font-black drop-shadow-sm">{info.daysLeft}</h2>
                            <p className="text-lg font-medium mt-1">Hari Lagi</p>
                        </div>
                        
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/20">
                            <CalendarDaysIcon className="w-4 h-4" /> {info.nextDate}
                        </div>
                    </div>

                    {/* PHASE INFO */}
                    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-lg border border-white">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner
                                ${info.phase === 'Menstruasi' ? 'bg-rose-100 text-rose-600' : 
                                  info.phase === 'Ovulasi' ? 'bg-purple-100 text-purple-600' : 'bg-teal-100 text-teal-600'}
                            `}>
                                {info.phase === 'Menstruasi' ? '🩸' : info.phase === 'Ovulasi' ? '🥚' : '✨'}
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Fase Saat Ini</p>
                                <h3 className="text-xl font-bold text-gray-800">{info.phase}</h3>
                            </div>
                        </div>
                        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                            <p className="text-sm text-gray-600 leading-relaxed italic">
                                "{info.desc}"
                            </p>
                        </div>
                    </div>

                    {/* MOOD & TIP */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/70 p-5 rounded-[2rem] border border-white shadow-sm flex flex-col items-center text-center justify-center">
                            <span className="text-3xl mb-2">🧖‍♀️</span>
                            <span className="text-xs font-bold text-gray-400 uppercase">Mood</span>
                            <span className="text-sm font-bold text-gray-700">{info.mood}</span>
                        </div>
                        <div className="bg-white/70 p-5 rounded-[2rem] border border-white shadow-sm flex flex-col items-center text-center justify-center">
                            <span className="text-3xl mb-2">🥤</span>
                            <span className="text-xs font-bold text-gray-400 uppercase">Saran</span>
                            <span className="text-sm font-bold text-gray-700">Minum Air</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20">
            {/* Background FX */}
            <div className="fixed inset-0 pointer-events-none z-0">
                 <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-[100px] animate-pulse"></div>
                 <div className="absolute bottom-[10%] left-[-20%] w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-[80px]"></div>
            </div>

            <div className="max-w-2xl mx-auto px-6 pt-28 relative z-10">
                {mode === 'LOADING' ? <div className="text-center mt-20">Loading...</div> :
                 mode === 'SETUP' ? renderSetup() : renderDashboard()
                }
            </div>
        </div>
    );
}