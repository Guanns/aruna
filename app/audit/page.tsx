// app/audit-privasi/page.tsx

"use client";

import Link from 'next/link';
import { ArrowLeftIcon, ShieldCheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

type AuditStep = {
    id: string;
    text: string;
    details: string;
};

const platforms = [
    {
        name: 'Instagram',
        icon: '📸',
        theme: {
            bg: 'bg-gradient-to-br from-pink-400 to-orange-400',
            text: 'text-white',
            accent: 'text-pink-600',
            ring: 'focus:ring-pink-500',
            progressBg: 'bg-pink-200',
            progressFill: 'bg-gradient-to-r from-pink-500 to-orange-500',
        },
        steps: [
            { id: 'ig1', text: 'Bentengi dengan Akun Privat', details: 'Hanya teman yang bisa melihat petualanganmu.' },
            { id: 'ig2', text: 'Razia Daftar Pengikut', details: 'Keluarkan pengikut misterius yang tidak dikenal.' },
            { id: 'ig3', text: 'Gunakan Geng "Teman Dekat"', details: 'Bagikan Story khusus untuk orang-orang terpercaya.' },
            { id: 'ig4', text: 'Cek Aktivitas Login Misterius', details: 'Pastikan hanya kamu yang punya akses ke akunmu.' },
            { id: 'ig5', text: 'Pasang Kunci Ganda (2FA)', details: 'Ini adalah gembok terkuat untuk akunmu!' },
        ]
    },
    {
        name: 'TikTok',
        icon: '🎵',
        theme: {
            bg: 'bg-gradient-to-br from-teal-400 to-cyan-400',
            text: 'text-white',
            accent: 'text-teal-600',
            ring: 'focus:ring-teal-500',
            progressBg: 'bg-teal-200',
            progressFill: 'bg-gradient-to-r from-teal-500 to-cyan-500',
        },
        steps: [
            { id: 'tk1', text: 'Aktifkan Mode Privat', details: 'Hanya pengikut setiamu yang bisa nonton videomu.' },
            { id: 'tk2', text: 'Filter Komentar & DM', details: 'Hanya teman yang boleh berkomentar atau kirim pesan.' },
            { id: 'tk3', text: 'Gembok Fitur Unduh Video', details: 'Jaga karyamu agar tidak diunduh sembarangan.' },
            { id: 'tk4', text: 'Usir Perangkat Asing', details: 'Periksa & keluarkan login yang tidak kamu kenali.' },
            { id: 'tk5', text: 'Nyalakan Verifikasi 2 Langkah', details: 'Benteng pertahanan lapis kedua untuk akunmu.' },
        ]
    },
    {
        name: 'WhatsApp',
        icon: '💬',
        theme: {
            bg: 'bg-gradient-to-br from-green-400 to-emerald-400',
            text: 'text-white',
            accent: 'text-green-600',
            ring: 'focus:ring-green-500',
            progressBg: 'bg-green-200',
            progressFill: 'bg-gradient-to-r from-green-500 to-emerald-500',
        },
        steps: [
            { id: 'wa1', text: 'Sembunyikan "Last Seen" & Foto Profil', details: 'Atur agar hanya teman yang bisa melihatnya.' },
            { id: 'wa2', text: 'Pasang PIN Verifikasi Dua Langkah', details: 'Kunci rahasia agar nomormu tidak dibajak.' },
            { id: 'wa3', text: 'Tolak Undangan Grup Otomatis', details: 'Hanya teman yang bisa menambahkanmu ke grup.' },
            { id: 'wa4', text: 'Matikan Centang Biru', details: 'Baca pesan dengan tenang tanpa tekanan.' },
        ]
    }
];

export default function AuditPrivasiPage() {
    const [openPlatform, setOpenPlatform] = useState<string | null>(platforms[0].name);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const handleCheck = (id: string) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const pageStyle = {
      backgroundColor: '#FFFBF5',
      color: '#6B4F4F'
    };

    return (
        <div className="w-full min-h-screen p-6 sm:p-8" style={pageStyle}>
            <div className="max-w-2xl mx-auto">
                <header className="mb-8">
                    <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-800 group transition-colors w-fit">
                        <ArrowLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold">Kembali</span>
                    </Link>
                </header>

                <main>
                    <div className="text-center mb-10">
                        <div className="inline-block p-4 bg-indigo-100 rounded-2xl animate-bounce">
                             <ShieldCheckIcon className="w-10 h-10 text-indigo-600"/>
                        </div>
                        <h1 className="text-3xl font-bold mt-4">Misi Pengamanan Akun</h1>
                        <p className="mt-1 opacity-70">Yuk, beres-beres rumah digitalmu biar makin aman & nyaman!</p>
                    </div>

                    <div className="space-y-5">
                        {platforms.map(platform => {
                            const isOpen = openPlatform === platform.name;
                            const progress = (Object.keys(checkedItems).filter(key => platform.steps.some(step => step.id === key) && checkedItems[key]).length / platform.steps.length) * 100;

                            return (
                                <div key={platform.name} className="rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-500">
                                    {/* --- Card Header --- */}
                                    <button
                                        onClick={() => setOpenPlatform(isOpen ? null : platform.name)}
                                        className={`w-full p-5 text-left ${platform.theme.bg} ${platform.theme.text}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className="text-4xl">{platform.icon}</div>
                                                <div>
                                                    <h2 className="text-xl font-bold">{platform.name}</h2>
                                                    <p className="text-sm opacity-80">Misi Keamanan Digital</p>
                                                </div>
                                            </div>
                                            <ChevronDownIcon className={`w-7 h-7 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                        </div>
                                        {/* Progress Bar Card Header */}
                                        <div className="mt-4">
                                            <div className={`w-full ${platform.theme.progressBg} rounded-full h-3`}>
                                                <div className={`${platform.theme.progressFill} h-3 rounded-full transition-all duration-500`} style={{ width: `${progress}%` }}></div>
                                            </div>
                                        </div>
                                    </button>

                                    {/* --- Accordion Content (Checklist) --- */}
                                    <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                            <div className="p-6 bg-white space-y-5">
                                                {platform.steps.map(step => (
                                                    <label key={step.id} htmlFor={step.id} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                                                        <input
                                                            type="checkbox"
                                                            id={step.id}
                                                            checked={!!checkedItems[step.id]}
                                                            onChange={() => handleCheck(step.id)}
                                                            className={`mt-1 h-6 w-6 rounded-md border-gray-300 ${platform.theme.accent} ${platform.theme.ring} cursor-pointer`}
                                                        />
                                                        <div>
                                                            <p className={`font-bold transition-colors ${checkedItems[step.id] ? 'line-through text-gray-400' : 'text-gray-800'}`}>{step.text}</p>
                                                            <p className="text-sm text-gray-500">{step.details}</p>
                                                        </div>
                                                    </label>
                                                ))}
                                                {progress === 100 && (
                                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                                        <p className="font-bold text-green-600">🎉 Hore! Misi Selesai! Akun {platform.name}-mu sekarang jauh lebih aman!</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
}