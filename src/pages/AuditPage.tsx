import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronDown, ShieldCheck } from 'lucide-react';
import Swal from 'sweetalert2';

// --- DATA PLATFORM ---
const platforms = [
    {
        name: 'Instagram',
        icon: '📸',
        color: 'from-pink-500 to-rose-500',
        bg: 'bg-pink-50/50',
        border: 'border-pink-200',
        shadow: 'shadow-pink-500/10',
        steps: [
            { id: 'ig1', text: 'Gembok Akun (Private)', details: 'Settings > Privacy > Private Account. Hanya teman yang bisa melihat kontenmu.' },
            { id: 'ig2', text: 'Razia Followers', details: 'Cek pengikutmu. Hapus akun asing atau mencurigakan.' },
            { id: 'ig3', text: 'Gunakan Close Friends', details: 'Posting hal pribadi hanya untuk lingkaran terdekat.' },
            { id: 'ig4', text: 'Cek Login Activity', details: 'Settings > Security > Login Activity. Logout perangkat asing.' },
            { id: 'ig5', text: 'Nyalakan 2FA', details: 'Wajib! Gunakan aplikasi autentikator atau SMS.' },
        ]
    },
    {
        name: 'TikTok',
        icon: '🎵',
        color: 'from-cyan-500 to-blue-500',
        bg: 'bg-cyan-50/50',
        border: 'border-cyan-200',
        shadow: 'shadow-cyan-500/10',
        steps: [
            { id: 'tk1', text: 'Akun Privat', details: 'Profile > Settings > Privacy > Private Account.' },
            { id: 'tk2', text: 'Batasi DM', details: 'Set Direct Messages ke "Friends" atau "No One".' },
            { id: 'tk3', text: 'Matikan Unduhan', details: 'Agar videomu tidak mudah dicuri orang lain.' },
            { id: 'tk4', text: 'Kelola Perangkat', details: 'Security > Manage Devices. Hapus sesi login aneh.' },
            { id: 'tk5', text: 'Verifikasi 2 Langkah', details: 'Lapisan keamanan ekstra untuk akunmu.' },
        ]
    },
    {
        name: 'WhatsApp',
        icon: '💬',
        color: 'from-emerald-500 to-teal-500',
        bg: 'bg-emerald-50/50',
        border: 'border-emerald-200',
        shadow: 'shadow-emerald-500/10',
        steps: [
            { id: 'wa1', text: 'Sembunyikan Privasi', details: 'Set Last Seen, Profile Photo, About ke "My Contacts".' },
            { id: 'wa2', text: 'PIN Verifikasi Dua Langkah', details: 'Settings > Account > Two-Step Verification. Kunci nomormu.' },
            { id: 'wa3', text: 'Kunci Biometrik', details: 'Privacy > Fingerprint Lock. Agar chat tidak diintip.' },
            { id: 'wa4', text: 'Privasi Grup', details: 'Set siapa yang bisa add ke grup: "My Contacts Except..."' },
        ]
    }
];

export default function AuditPrivasiPage() {
    const [openPlatform, setOpenPlatform] = useState<string | null>(platforms[0].name);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [totalProgress, setTotalProgress] = useState(0);

    useEffect(() => {
        const totalSteps = platforms.reduce((acc, p) => acc + p.steps.length, 0);
        const completedSteps = Object.values(checkedItems).filter(Boolean).length;
        setTotalProgress(Math.round((completedSteps / totalSteps) * 100));
    }, [checkedItems]);

    const handleCheck = (id: string) => {
        setCheckedItems(prev => {
            const newState = { ...prev, [id]: !prev[id] };
            return newState;
        });
    };

    useEffect(() => {
        if (totalProgress === 100) {
            Swal.fire({
                title: 'Benteng Aman! 🛡️',
                text: 'Luar biasa! Akun digitalmu sekarang jauh lebih aman.',
                icon: 'success',
                confirmButtonColor: '#10B981',
                background: '#FFFBF5',
                color: '#6B4F4F'
            });
        }
    }, [totalProgress]);

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-x-hidden font-sans pb-20">
            {/* --- BACKGROUND FX --- */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-[120px]"></div>
                 <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 relative z-10">
                
                {/* --- HEADER --- */}
                <header className="relative text-center mb-8 sm:mb-12">
                    <div className="absolute left-0 top-0 z-10">
                        <Link 
                            to="/dashboard" 
                            className="p-2 -ml-2 rounded-full hover:bg-stone-200/60 text-[#6B4F4F] transition-colors inline-flex items-center justify-center shrink-0"
                            title="Kembali ke Dashboard"
                        >
                            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Link>
                    </div>

                    <div className="relative inline-block mb-4 sm:mb-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-indigo-100">
                             <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
                        </div>
                    </div>
                    
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#6B4F4F] tracking-tight mb-2 sm:mb-3">
                        Benteng <span className="font-serif italic text-indigo-600">Digital</span>
                    </h1>
                    <p className="text-xs sm:text-base opacity-75 max-w-xl mx-auto font-light leading-relaxed px-2">
                        Perkuat pertahanan akunmu satu per satu. Mencegah lebih baik daripada mengobati.
                    </p>
                </header>

                {/* --- SCORE CARD --- */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-stone-200 mb-8 sm:mb-10 relative">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                        <div className="text-center sm:text-left">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-stone-900">Status Keamanan</h3>
                            <p className="text-xs sm:text-sm text-stone-500 mt-0.5 sm:mt-1">Selesaikan semua langkah panduan di bawah.</p>
                        </div>
                        
                        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
                            <div className="relative flex-1 sm:w-36 md:w-48 h-3.5 sm:h-4 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                                <div 
                                    className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                                    style={{ width: `${totalProgress}%` }}
                                />
                            </div>
                            <div className="text-xl sm:text-2xl font-black text-indigo-700 w-12 sm:w-14 text-right font-mono shrink-0">
                                {totalProgress}%
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- PLATFORM CARDS --- */}
                <div className="space-y-4 sm:space-y-5">
                    {platforms.map((platform) => {
                        const isOpen = openPlatform === platform.name;
                        const platTotal = platform.steps.length;
                        const platDone = platform.steps.filter(s => checkedItems[s.id]).length;
                        const isComplete = platDone === platTotal;

                        return (
                            <div 
                                key={platform.name} 
                                className={`rounded-2xl sm:rounded-3xl transition-all duration-300 overflow-hidden border ${
                                    isOpen 
                                        ? 'bg-white shadow-md border-indigo-200 ring-1 ring-indigo-100' 
                                        : 'bg-white/80 hover:bg-white border-stone-200 shadow-xs'
                                }`}
                            >
                                <button
                                    onClick={() => setOpenPlatform(isOpen ? null : platform.name)}
                                    className="w-full p-4 sm:p-5 md:p-6 flex items-center justify-between text-left focus:outline-none"
                                >
                                    <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shrink-0 border border-stone-200/60 ${platform.bg}`}>
                                            {platform.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <h2 className="text-base sm:text-lg md:text-xl font-bold text-stone-900 truncate">
                                                {platform.name}
                                            </h2>
                                            <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 flex-wrap">
                                                <span className="text-[10px] sm:text-xs font-bold bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200 text-stone-600">
                                                    {platDone}/{platTotal}
                                                </span>
                                                {isComplete && (
                                                    <span className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                                        <CheckCircle2 className="w-3 h-3"/> SELESAI
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 ml-2 transition-transform duration-300 ${isOpen ? 'bg-indigo-50 text-indigo-700 rotate-180' : 'bg-stone-100 text-stone-500'}`}>
                                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5"/>
                                    </div>
                                </button>

                                <div 
                                    className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 space-y-2.5 sm:space-y-3">
                                            <div className="h-px w-full bg-stone-200 mb-3 sm:mb-4"></div>
                                            
                                            {platform.steps.map((step) => (
                                                <label 
                                                    key={step.id} 
                                                    className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border cursor-pointer transition-colors ${
                                                        checkedItems[step.id] 
                                                            ? 'bg-emerald-50/60 border-emerald-200' 
                                                            : 'bg-stone-50/60 hover:bg-stone-50 border-stone-200'
                                                    }`}
                                                >
                                                    <div className="relative flex items-center pt-0.5">
                                                        <input
                                                            type="checkbox"
                                                            className="peer sr-only"
                                                            checked={!!checkedItems[step.id]}
                                                            onChange={() => handleCheck(step.id)}
                                                        />
                                                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg border-2 flex items-center justify-center transition-all ${
                                                            checkedItems[step.id] 
                                                                ? 'bg-emerald-600 border-emerald-600 scale-105' 
                                                                : 'border-stone-300 bg-white'
                                                        }`}>
                                                            <CheckCircle2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transition-transform duration-200 ${checkedItems[step.id] ? 'scale-100' : 'scale-0'}`} />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className={`font-bold text-xs sm:text-sm leading-snug transition-colors ${checkedItems[step.id] ? 'text-emerald-900 line-through opacity-60' : 'text-stone-900'}`}>
                                                            {step.text}
                                                        </h4>
                                                        <p className={`text-[11px] sm:text-xs mt-0.5 sm:mt-1 leading-relaxed transition-colors ${checkedItems[step.id] ? 'text-emerald-800/60' : 'text-stone-500'}`}>
                                                            {step.details}
                                                        </p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}