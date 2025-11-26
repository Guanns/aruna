// app/directory/page.tsx
// VERSI FINAL: Emergency Hub & Support Directory

"use client";

import Link from 'next/link';
import { 
    ArrowLeftIcon, 
    PhoneIcon, 
    BuildingLibraryIcon, 
    MegaphoneIcon,
    ShieldExclamationIcon,
    TruckIcon,
    HeartIcon,
    ClipboardDocumentCheckIcon
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { contacts } from '../../features/directoryData'; 

export default function DirectoryPage() {
    const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

    const nationalServices = contacts.filter(c => c.category === 'Layanan Nasional');
    const violenceServices = contacts.filter(c => c.category === 'Kekerasan & Hukum');

    const handleCopy = (phone: string, id: string) => {
        navigator.clipboard.writeText(phone);
        setCopiedIndex(id);
        
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        });
        Toast.fire({
            icon: 'success',
            title: 'Nomor disalin'
        });

        setTimeout(() => setCopiedIndex(null), 2000);
    };

    // Helper untuk Icon Kategori
    const getIcon = (name: string) => {
        if (name.includes('Polisi')) return <ShieldExclamationIcon className="w-6 h-6"/>;
        if (name.includes('Ambulans')) return <HeartIcon className="w-6 h-6"/>;
        if (name.includes('Pemadam')) return <TruckIcon className="w-6 h-6"/>;
        if (name.includes('Komnas')) return <MegaphoneIcon className="w-6 h-6"/>;
        return <BuildingLibraryIcon className="w-6 h-6"/>;
    };

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20">
            
            {/* --- BACKGROUND FX --- */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className="absolute top-[-10%] right-[30%] w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[100px]"></div>
                 <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-red-200/20 rounded-full blur-[100px]"></div>
                 <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
            </div>

            <div className="max-w-3xl mx-auto px-6 pt-32 relative z-10">
                
                {/* --- HEADER --- */}
                <header className="mb-12 text-center">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#6B4F4F]/60 hover:text-[#c43c27] mb-8 transition-colors">
                        <ArrowLeftIcon className="w-4 h-4"/> Kembali ke Dashboard
                    </Link>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#6B4F4F]">
                        Direktori <span className="font-serif italic text-[#c43c27]">Bantuan</span>
                    </h1>
                    <p className="text-lg opacity-70 max-w-xl mx-auto font-light leading-relaxed">
                        Jangan ragu untuk meminta pertolongan. Berikut adalah kontak resmi yang siap membantumu 24/7.
                    </p>
                </header>

                {/* --- SECTION 1: DARURAT NASIONAL (PRIORITAS) --- */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                            <ShieldExclamationIcon className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-[#6B4F4F]">Darurat Nasional</h2>
                    </div>

                    <div className="grid gap-4">
                        {nationalServices.map((contact, idx) => (
                            <div 
                                key={idx} 
                                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-rose-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                                        {getIcon(contact.name)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{contact.name}</h3>
                                        <p className="text-sm text-gray-500 leading-tight">{contact.description}</p>
                                        <div className="mt-2 inline-block sm:hidden bg-rose-50 text-rose-700 text-xs font-bold px-2 py-1 rounded-md border border-rose-100">
                                            {contact.phone}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button 
                                        onClick={() => handleCopy(contact.phone, `nat-${idx}`)}
                                        className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-400 transition-colors border border-gray-100"
                                        title="Salin Nomor"
                                    >
                                        {copiedIndex === `nat-${idx}` ? <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-500"/> : <span className="font-mono text-sm font-bold">{contact.phone}</span>}
                                    </button>
                                    <a 
                                        href={`tel:${contact.phone}`} 
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-rose-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-rose-600 transition-all shadow-md hover:shadow-rose-200 active:scale-95"
                                    >
                                        <PhoneIcon className="w-5 h-5" />
                                        <span className="sm:hidden">Panggil</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- SECTION 2: LAYANAN KHUSUS (SUPPORT) --- */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                            <BuildingLibraryIcon className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-[#6B4F4F]">Layanan Hukum & Konseling</h2>
                    </div>

                    <div className="grid gap-4">
                        {violenceServices.map((contact, idx) => (
                            <div 
                                key={idx} 
                                className="group bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-indigo-100/50 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0 group-hover:scale-110 transition-transform">
                                        {getIcon(contact.name)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{contact.name}</h3>
                                        <p className="text-sm text-gray-500 leading-tight">{contact.description}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button 
                                        onClick={() => handleCopy(contact.phone, `vio-${idx}`)}
                                        className="p-3 rounded-xl bg-white hover:bg-gray-50 text-gray-500 transition-colors border border-gray-100 flex items-center gap-2"
                                        title="Salin Nomor"
                                    >
                                        {copiedIndex === `vio-${idx}` ? <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-500"/> : <span className="font-mono text-sm">{contact.phone}</span>}
                                    </button>
                                    <a 
                                        href={`tel:${contact.phone}`} 
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-600 transition-all shadow-md hover:shadow-indigo-200 active:scale-95"
                                    >
                                        <PhoneIcon className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- FOOTER NOTE --- */}
                <div className="text-center p-6 bg-yellow-50/50 rounded-3xl border border-yellow-100 text-sm text-yellow-800/70 leading-relaxed">
                    <p>
                        <span className="font-bold">💡 Info:</span> Jika kamu berada dalam bahaya langsung yang mengancam nyawa, segera hubungi <b>Polisi (110)</b> atau lari ke tempat ramai terdekat.
                    </p>
                </div>

            </div>
        </div>
    );
}