// app/live-position/page.tsx
// VERSI FINAL & PASTI: Link Google Maps Resmi (https://www.google.com/maps?q=...)

"use client";

import Link from 'next/link';
import { ArrowLeftIcon, MapPinIcon, BellAlertIcon, PaperAirplaneIcon, StopIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect, useRef } from 'react';
import CustomAlert from '../../components/CustomAlert';

type Status = 'idle' | 'running' | 'waiting_action';

export default function LivePositionPage() {
    const [status, setStatus] = useState<Status>('idle');
    const [intervalMinutes, setIntervalMinutes] = useState(5);
    const [countdown, setCountdown] = useState(0);
    const [alertState, setAlertState] = useState({ isOpen: false, title: '', message: '', icon: '' });
    
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // --- 1. CEK STATUS SAAT KEMBALI (Resume) ---
    useEffect(() => {
        const savedStatus = localStorage.getItem('aruna_live_status') as Status;
        const savedTarget = localStorage.getItem('aruna_live_target');
        const savedInterval = localStorage.getItem('aruna_live_interval');

        if (savedStatus === 'running' && savedTarget) {
            const targetTime = parseInt(savedTarget, 10);
            const remaining = Math.ceil((targetTime - Date.now()) / 1000);

            if (remaining > 0) {
                setStatus('running');
                setCountdown(remaining);
                if (savedInterval) setIntervalMinutes(parseInt(savedInterval));
            } else {
                setStatus('waiting_action');
                setCountdown(0);
            }
        } else if (savedStatus === 'waiting_action') {
            setStatus('waiting_action');
            setCountdown(0);
        }
    }, []);

    // --- 2. LOGIC TIMER ---
    useEffect(() => {
        if (status === 'running') {
            timerRef.current = setInterval(() => {
                setCountdown(() => {
                    const savedTarget = localStorage.getItem('aruna_live_target');
                    if (savedTarget) {
                        const remaining = Math.ceil((parseInt(savedTarget) - Date.now()) / 1000);
                        if (remaining <= 1) {
                            setStatus('waiting_action');
                            localStorage.setItem('aruna_live_status', 'waiting_action');
                            triggerNotification();
                            return 0;
                        }
                        return remaining;
                    }
                    return 0;
                });
            }, 1000);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [status]);

    const triggerNotification = () => {
        if (navigator.vibrate) navigator.vibrate([500, 200, 500]);
    };

    // --- FUNGSI KIRIM LOKASI (CORRECTED LINK) ---
    const sendLocationToWA = () => {
        const savedContact = localStorage.getItem('emergencyContact');
        if (!savedContact) {
            setAlertState({ isOpen: true, title: "Kontak Kosong", message: "Atur kontak darurat dulu ya di Dashboard.", icon: "❌" });
            return;
        }

        const contact = JSON.parse(savedContact);

        if (!navigator.geolocation) {
            setAlertState({ isOpen: true, title: "Error GPS", message: "Browser tidak mendukung GPS.", icon: "📡" });
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            
            // 🔥 FIX FATAL: Gunakan Link Resmi Google Maps (?q=latitude,longitude)
            // Ini akan memaksa Maps membuka pin merah di koordinat tersebut.
            const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

            const message = `[UPDATE LOKASI BERKALA]\nHai ${contact.name}, ini posisi aku sekarang :\n${googleMapsUrl}\n\naku bakal update lagi dalam waktu ${intervalMinutes} menit lagi ya!`;
            
            // Simpan State agar tidak reset saat pindah app
            const nextTarget = Date.now() + (intervalMinutes * 60 * 1000);
            localStorage.setItem('aruna_live_status', 'running');
            localStorage.setItem('aruna_live_target', nextTarget.toString());
            localStorage.setItem('aruna_live_interval', intervalMinutes.toString());

            // Update UI
            setStatus('running');
            setCountdown(intervalMinutes * 60);

            // Buka WhatsApp
            window.location.href = `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`;

        }, () => {
            setAlertState({ isOpen: true, title: "Gagal GPS", message: "Pastikan GPS kamu aktif & memiliki sinyal yang bagus ya.", icon: "📍" });
        }, { enableHighAccuracy: true, timeout: 10000 });
    };

    const handleStart = () => {
        const savedContact = localStorage.getItem('emergencyContact');
        if (!savedContact) {
            setAlertState({ isOpen: true, title: "Kontak Belum Diatur", message: "Atur kontak darurat di menu Panic Button dulu ya.", icon: "🤔" });
            return;
        }
        sendLocationToWA();
    };

    const handleStop = () => {
        localStorage.removeItem('aruna_live_status');
        localStorage.removeItem('aruna_live_target');
        localStorage.removeItem('aruna_live_interval');
        
        setStatus('idle');
        setCountdown(0);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const formatTime = (seconds: number) => {
        if (seconds < 0) return "00:00";
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20">
            <CustomAlert isOpen={alertState.isOpen} title={alertState.title} message={alertState.message} icon={alertState.icon} onClose={() => setAlertState({ ...alertState, isOpen: false })} />

            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-1000
                    ${status === 'running' ? 'bg-green-400/20 animate-pulse' : 
                      status === 'waiting_action' ? 'bg-red-500/30 animate-pulse' : 'bg-blue-200/20'}
                 `}></div>
            </div>

            <div className="max-w-md mx-auto px-6 pt-32 relative z-10">
                <header className="text-center mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#6B4F4F]/60 hover:text-blue-600 mb-6 transition-colors py-2 px-4 rounded-full hover:bg-white/50 border border-transparent hover:border-blue-100">
                        <ArrowLeftIcon className="w-4 h-4"/> Kembali
                    </Link>
                    <h1 className="text-4xl font-bold mb-4 text-[#6B4F4F]">
                        Live <span className={`font-serif italic transition-colors duration-500 ${status !== 'idle' ? 'text-green-600' : 'text-blue-600'}`}>Position</span>
                    </h1>
                </header>

                {/* Radar */}
                <div className="relative mb-12">
                    <div className="flex justify-center items-center h-64 w-64 mx-auto relative">
                        <div className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${status === 'running' ? 'border-green-500/30 animate-ping' : status === 'waiting_action' ? 'border-red-500 animate-ping' : 'border-blue-200'}`}></div>
                        <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-xl z-10 transition-all duration-500
                            ${status === 'running' ? 'bg-green-500 text-white shadow-green-200' : 
                              status === 'waiting_action' ? 'bg-red-500 text-white animate-bounce shadow-red-200' : 
                              'bg-white text-blue-500 shadow-blue-100'}
                        `}>
                            {status === 'waiting_action' ? <BellAlertIcon className="w-12 h-12" /> : <MapPinIcon className="w-12 h-12" />}
                        </div>
                    </div>

                    <div className="text-center mt-6 h-20">
                        {status === 'idle' && <p className="text-sm font-bold uppercase tracking-widest text-blue-400">Status: Standby</p>}
                        {status === 'running' && (
                            <>
                                <div className="text-5xl font-black font-mono text-[#6B4F4F] tracking-widest mb-2">{formatTime(countdown)}</div>
                                <p className="text-xs font-bold text-green-600 animate-pulse">Menunggu update berikutnya...</p>
                            </>
                        )}
                        {status === 'waiting_action' && (
                            <div className="animate-pulse">
                                <p className="text-xl font-bold text-red-600 mb-1">WAKTUNYA UPDATE!</p>
                                <p className="text-sm text-[#6B4F4F]">Klik tombol di bawah untuk kirim lokasi.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/60 shadow-xl">
                    {status === 'idle' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-[#6B4F4F]/60 uppercase tracking-wider mb-4 text-center">Interval Update (Menit)</label>
                                <div className="flex gap-3 justify-center">
                                    {[1, 5, 10, 15].map(min => (
                                        <button key={min} onClick={() => setIntervalMinutes(min)} className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all border-2 ${intervalMinutes === min ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-transparent text-gray-500'}`}>{min}</button>
                                    ))}
                                </div>
                            </div>
                            <button onClick={handleStart} className="w-full py-4 bg-[#6B4F4F] text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-[#5a4242] flex items-center justify-center gap-3"><PaperAirplaneIcon className="w-6 h-6" /> Mulai Tracking</button>
                        </div>
                    )}
                    {status === 'running' && (
                        <div className="space-y-6 text-center">
                            <div className="p-4 bg-green-50 rounded-2xl border border-green-100 text-sm text-green-800"><b>Aman.</b> Timer sedang berjalan.<br/><span className="text-xs opacity-70">Akan tetap jalan walau kamu pindah aplikasi.</span></div>
                            <button onClick={handleStop} className="w-full py-4 bg-red-100 text-red-600 rounded-2xl font-bold text-lg hover:bg-red-200 transition-all"><StopIcon className="w-6 h-6 inline mr-2" /> Hentikan</button>
                        </div>
                    )}
                    {status === 'waiting_action' && (
                        <button onClick={sendLocationToWA} className="w-full py-5 bg-red-600 text-white rounded-2xl font-bold text-xl shadow-xl shadow-red-200 animate-pulse flex items-center justify-center gap-3"><PaperAirplaneIcon className="w-8 h-8" /> KIRIM SEKARANG</button>
                    )}
                </div>
                
                <p className="text-center text-[10px] text-[#6B4F4F]/40 mt-6 px-4 leading-relaxed">*Aruna akan menyimpan status trackingmu agar tidak hilang saat pindah aplikasi.</p>
            </div>
        </div>
    );
}