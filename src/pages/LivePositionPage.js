import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// app/live-position/page.tsx
// VERSI FINAL & PASTI: Link Google Maps Resmi (https://www.google.com/maps?q=...)
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, MapPinIcon, BellAlertIcon, PaperAirplaneIcon, StopIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef } from 'react';
import CustomAlert from '../components/CustomAlert';
export default function LivePositionPage() {
    const [status, setStatus] = useState('idle');
    const [intervalMinutes, setIntervalMinutes] = useState(5);
    const [countdown, setCountdown] = useState(0);
    const [alertState, setAlertState] = useState({ isOpen: false, title: '', message: '', icon: '' });
    const timerRef = useRef(null);
    // --- 1. CEK STATUS SAAT KEMBALI (Resume) ---
    useEffect(() => {
        const savedStatus = localStorage.getItem('aruna_live_status');
        const savedTarget = localStorage.getItem('aruna_live_target');
        const savedInterval = localStorage.getItem('aruna_live_interval');
        if (savedStatus === 'running' && savedTarget) {
            const targetTime = parseInt(savedTarget, 10);
            const remaining = Math.ceil((targetTime - Date.now()) / 1000);
            if (remaining > 0) {
                setStatus('running');
                setCountdown(remaining);
                if (savedInterval)
                    setIntervalMinutes(parseInt(savedInterval));
            }
            else {
                setStatus('waiting_action');
                setCountdown(0);
            }
        }
        else if (savedStatus === 'waiting_action') {
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
        return () => { if (timerRef.current)
            clearInterval(timerRef.current); };
    }, [status]);
    const triggerNotification = () => {
        if (navigator.vibrate)
            navigator.vibrate([500, 200, 500]);
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
        if (timerRef.current)
            clearInterval(timerRef.current);
    };
    const formatTime = (seconds) => {
        if (seconds < 0)
            return "00:00";
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };
    return (_jsxs("div", { className: "w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20", children: [_jsx(CustomAlert, { isOpen: alertState.isOpen, title: alertState.title, message: alertState.message, icon: alertState.icon, onClose: () => setAlertState(Object.assign(Object.assign({}, alertState), { isOpen: false })) }), _jsx(Link, { to: "/dashboard", className: "fixed top-6 left-6 z-50 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-md rounded-xl flex items-center justify-center shadow-md border border-stone-200/50 text-[#6B4F4F] transition-all hover:scale-105 active:scale-95 group", title: "Kembali ke Dashboard", children: _jsx(ArrowLeftIcon, { className: "w-5 h-5 group-hover:-translate-x-0.5 transition-transform" }) }), _jsx("div", { className: "fixed inset-0 pointer-events-none z-0 overflow-hidden", children: _jsx("div", { className: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-1000
                    ${status === 'running' ? 'bg-green-400/20 animate-pulse' :
                        status === 'waiting_action' ? 'bg-red-500/30 animate-pulse' : 'bg-blue-200/20'}
                 ` }) }), _jsxs("div", { className: "max-w-md mx-auto px-6 pt-32 relative z-10", children: [_jsxs("header", { className: "text-center mb-8", children: [_jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-2 text-[#6B4F4F]/60 hover:text-blue-600 mb-6 transition-colors py-2 px-4 rounded-full hover:bg-white/50 border border-transparent hover:border-blue-100", children: [_jsx(ArrowLeftIcon, { className: "w-4 h-4" }), " Kembali"] }), _jsxs("h1", { className: "text-4xl font-bold mb-4 text-[#6B4F4F]", children: ["Live ", _jsx("span", { className: `font-serif italic transition-colors duration-500 ${status !== 'idle' ? 'text-green-600' : 'text-blue-600'}`, children: "Position" })] })] }), _jsxs("div", { className: "relative mb-12", children: [_jsxs("div", { className: "flex justify-center items-center h-64 w-64 mx-auto relative", children: [_jsx("div", { className: `absolute inset-0 rounded-full border-2 transition-all duration-1000 ${status === 'running' ? 'border-green-500/30 animate-ping' : status === 'waiting_action' ? 'border-red-500 animate-ping' : 'border-blue-200'}` }), _jsx("div", { className: `w-32 h-32 rounded-full flex items-center justify-center shadow-xl z-10 transition-all duration-500
                            ${status === 'running' ? 'bg-green-500 text-white shadow-green-200' :
                                            status === 'waiting_action' ? 'bg-red-500 text-white animate-bounce shadow-red-200' :
                                                'bg-white text-blue-500 shadow-blue-100'}
                        `, children: status === 'waiting_action' ? _jsx(BellAlertIcon, { className: "w-12 h-12" }) : _jsx(MapPinIcon, { className: "w-12 h-12" }) })] }), _jsxs("div", { className: "text-center mt-6 h-20", children: [status === 'idle' && _jsx("p", { className: "text-sm font-bold uppercase tracking-widest text-blue-400", children: "Status: Standby" }), status === 'running' && (_jsxs(_Fragment, { children: [_jsx("div", { className: "text-5xl font-black font-mono text-[#6B4F4F] tracking-widest mb-2", children: formatTime(countdown) }), _jsx("p", { className: "text-xs font-bold text-green-600 animate-pulse", children: "Menunggu update berikutnya..." })] })), status === 'waiting_action' && (_jsxs("div", { className: "animate-pulse", children: [_jsx("p", { className: "text-xl font-bold text-red-600 mb-1", children: "WAKTUNYA UPDATE!" }), _jsx("p", { className: "text-sm text-[#6B4F4F]", children: "Klik tombol di bawah untuk kirim lokasi." })] }))] })] }), _jsxs("div", { className: "bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/60 shadow-xl", children: [status === 'idle' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold text-[#6B4F4F]/60 uppercase tracking-wider mb-4 text-center", children: "Interval Update (Menit)" }), _jsx("div", { className: "flex gap-3 justify-center", children: [1, 5, 10, 15].map(min => (_jsx("button", { onClick: () => setIntervalMinutes(min), className: `flex-1 py-3 rounded-2xl font-bold text-sm transition-all border-2 ${intervalMinutes === min ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-transparent text-gray-500'}`, children: min }, min))) })] }), _jsxs("button", { onClick: handleStart, className: "w-full py-4 bg-[#6B4F4F] text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-[#5a4242] flex items-center justify-center gap-3", children: [_jsx(PaperAirplaneIcon, { className: "w-6 h-6" }), " Mulai Tracking"] })] })), status === 'running' && (_jsxs("div", { className: "space-y-6 text-center", children: [_jsxs("div", { className: "p-4 bg-green-50 rounded-2xl border border-green-100 text-sm text-green-800", children: [_jsx("b", { children: "Aman." }), " Timer sedang berjalan.", _jsx("br", {}), _jsx("span", { className: "text-xs opacity-70", children: "Akan tetap jalan walau kamu pindah aplikasi." })] }), _jsxs("button", { onClick: handleStop, className: "w-full py-4 bg-red-100 text-red-600 rounded-2xl font-bold text-lg hover:bg-red-200 transition-all", children: [_jsx(StopIcon, { className: "w-6 h-6 inline mr-2" }), " Hentikan"] })] })), status === 'waiting_action' && (_jsxs("button", { onClick: sendLocationToWA, className: "w-full py-5 bg-red-600 text-white rounded-2xl font-bold text-xl shadow-xl shadow-red-200 animate-pulse flex items-center justify-center gap-3", children: [_jsx(PaperAirplaneIcon, { className: "w-8 h-8" }), " KIRIM SEKARANG"] }))] }), _jsx("p", { className: "text-center text-[10px] text-[#6B4F4F]/40 mt-6 px-4 leading-relaxed", children: "*Aruna akan menyimpan status trackingmu agar tidak hilang saat pindah aplikasi." })] })] }));
}
