// app/audit/page.tsx
// VERSI FINAL: Digital Fortress (Fixed Spacing & Premium UI)

"use client";

import Link from 'next/link';
import { 
    ArrowLeftIcon, 
    ShieldCheckIcon, 
    ChevronDownIcon, 
    CheckCircleIcon 
} from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
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
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20">
            
            {/* --- BACKGROUND FX --- */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-[120px] animate-pulse"></div>
                 <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px]"></div>
                 <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
            </div>

            <div className="max-w-3xl mx-auto px-6 pt-32 relative z-10">
                
                {/* --- HEADER --- */}
                <header className="text-center mb-16">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#6B4F4F]/60 hover:text-indigo-600 mb-10 transition-colors py-2 px-4 rounded-full hover:bg-white/50 border border-transparent hover:border-indigo-100">
                        <ArrowLeftIcon className="w-4 h-4"/> Kembali ke Dashboard
                    </Link>
                    
                    <div className="relative inline-block mb-6 group">
                        <div className="absolute -inset-4 bg-indigo-100 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <div className="relative w-20 h-20 bg-gradient-to-br from-white to-indigo-50 rounded-[2rem] flex items-center justify-center shadow-lg border border-white rotate-3 group-hover:rotate-6 transition-transform duration-500">
                            <ShieldCheckIcon className="w-10 h-10 text-indigo-500 drop-shadow-sm" />
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#6B4F4F] tracking-tight">
                        Benteng <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Digital</span>
                    </h1>
                    <p className="text-lg opacity-70 max-w-xl mx-auto font-light leading-relaxed">
                        Perkuat pertahanan akunmu satu per satu. Mencegah lebih baik daripada mengobati.
                    </p>
                </header>

                {/* --- SCORE CARD --- */}
                <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-1 shadow-xl border border-white/60 mb-12 relative overflow-hidden ring-1 ring-indigo-50">
                    <div className="bg-white/80 rounded-[2.2rem] p-8 relative overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                            <div className="text-center md:text-left">
                                <h3 className="text-xl font-bold text-gray-800">Status Keamanan</h3>
                                <p className="text-sm text-gray-500 mt-1">Selesaikan semua misi di bawah.</p>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <div className="relative w-32 h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                    <div 
                                        className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-1000 ease-out relative"
                                        style={{ width: `${totalProgress}%` }}
                                    >
                                        <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-shimmer"></div>
                                    </div>
                                </div>
                                <div className="text-3xl font-black text-indigo-600 w-16 text-right font-mono">
                                    {totalProgress}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- PLATFORM CARDS --- */}
                <div className="space-y-6">
                    {platforms.map((platform) => {
                        const isOpen = openPlatform === platform.name;
                        const platTotal = platform.steps.length;
                        const platDone = platform.steps.filter(s => checkedItems[s.id]).length;
                        const isComplete = platDone === platTotal;

                        return (
                            <div 
                                key={platform.name} 
                                className={`group rounded-[2rem] transition-all duration-500 overflow-hidden border
                                    ${isOpen 
                                        ? 'bg-white shadow-2xl border-white ring-1 ring-indigo-50 scale-[1.02]' 
                                        : 'bg-white/40 backdrop-blur-sm hover:bg-white/80 border-white/50 hover:shadow-lg'}
                                `}
                            >
                                <button
                                    onClick={() => setOpenPlatform(isOpen ? null : platform.name)}
                                    className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/50 transition-colors ${platform.bg}`}>
                                            {platform.icon}
                                        </div>
                                        <div>
                                            <h2 className={`text-xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${platform.color} transition-all`}>
                                                {platform.name}
                                            </h2>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs font-bold bg-white px-2 py-0.5 rounded-md border border-gray-100 text-gray-500 shadow-sm">
                                                    {platDone}/{platTotal}
                                                </span>
                                                {isComplete && (
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md border border-green-100">
                                                        <CheckCircleIcon className="w-3 h-3"/> SELESAI
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-indigo-50 text-indigo-600 rotate-180' : 'bg-white shadow-sm text-gray-400'}`}>
                                        <ChevronDownIcon className="w-5 h-5"/>
                                    </div>
                                </button>

                                <div 
                                    className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-6 pb-8 pt-2 space-y-3">
                                            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>
                                            
                                            {platform.steps.map((step) => (
                                                <label 
                                                    key={step.id} 
                                                    className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300 group/item
                                                        ${checkedItems[step.id] 
                                                            ? 'bg-green-50/30 border-green-100' 
                                                            : 'bg-white border-gray-100 hover:border-indigo-200 hover:shadow-md'}
                                                    `}
                                                >
                                                    <div className="relative flex items-center pt-1">
                                                        <input
                                                            type="checkbox"
                                                            className="peer sr-only"
                                                            checked={!!checkedItems[step.id]}
                                                            onChange={() => handleCheck(step.id)}
                                                        />
                                                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm
                                                            ${checkedItems[step.id] 
                                                                ? 'bg-green-500 border-green-500 scale-110' 
                                                                : 'border-gray-300 bg-white group-hover/item:border-indigo-300'}
                                                        `}>
                                                            <CheckCircleIcon className={`w-4 h-4 text-white transition-transform duration-300 ${checkedItems[step.id] ? 'scale-100' : 'scale-0'}`} />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex-1">
                                                        <h4 className={`font-bold text-sm transition-colors ${checkedItems[step.id] ? 'text-green-800 line-through opacity-60' : 'text-gray-800'}`}>
                                                            {step.text}
                                                        </h4>
                                                        <p className={`text-xs mt-1 leading-relaxed transition-colors ${checkedItems[step.id] ? 'text-green-700/50' : 'text-gray-500'}`}>
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