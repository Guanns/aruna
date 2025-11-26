// app/dashboard/page.tsx
// VERSI FIX: iPad Optimized & Active Status Visible Everywhere

"use client";

import React, { useState, useEffect } from 'react';
import {
    ShieldCheckIcon, PhoneIcon, BellAlertIcon, BookOpenIcon,
    MapPinIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon,
    CalculatorIcon, ArrowRightIcon, HeartIcon, SparklesIcon,
    KeyIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { triggerPanicButton } from '../../features/panicButton';
import CustomAlert from '../../components/CustomAlert';
import SettingsModal from '../../components/SettingsModal';
import CamouflageSettingsModal from '../../components/CamouflageSettingsModal';
import { useCamouflage } from '../../context/CamouflageContext';

// Tipe Data
type EmergencyContact = {
    name: string;
    phone: string;
};

export default function DashboardPage() {
    const [greeting, setGreeting] = useState('');
    const [dateString, setDateString] = useState('');
    const [alertState, setAlertState] = useState({ isOpen: false, title: '', message: '', icon: '' });
    const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const { setIsCamouflaged } = useCamouflage();
    const [isCamouflageModalOpen, setIsCamouflageModalOpen] = useState(false);

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 11) setGreeting('Selamat Pagi');
        else if (currentHour < 15) setGreeting('Selamat Siang');
        else if (currentHour < 19) setGreeting('Selamat Sore');
        else setGreeting('Selamat Malam');

        const date = new Date();
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
        setDateString(date.toLocaleDateString('id-ID', options));
    }, []);

    // --- LOGIC FITUR ---
    const openEmergencySettings = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        const savedContact = localStorage.getItem('emergencyContact');
        if (savedContact) {
            const { name, phone } = JSON.parse(savedContact);
            setContactName(name);
            setContactPhone(phone);
        } else {
            setContactName('');
            setContactPhone('');
        }
        setIsEmergencyModalOpen(true);
    };

    const onPanicButtonClick = () => {
        const savedContact = localStorage.getItem('emergencyContact');
        if (savedContact) {
            const contact: EmergencyContact = JSON.parse(savedContact);
            triggerPanicButton(contact, {
                onStart: () => setAlertState({ isOpen: true, title: 'Mendeteksi Lokasi...', message: `Mempersiapkan pesan darurat untuk ${contact.name}.`, icon: '📍' }),
                onError: (errorMessage) => setAlertState({ isOpen: true, title: 'Gagal Terkirim', message: errorMessage, icon: '😥' }),
            });
        } else {
            openEmergencySettings();
        }
    };

    const handleSaveEmergencyContact = () => {
        if (!contactPhone.startsWith('62') || contactPhone.length < 10) {
            setAlertState({ isOpen: true, title: "Yah, Inputmu Tidak Valid Nih", message: "Nomor HP harus diawali 62 (contoh: 62812...).", icon: "🤔" });
            return;
        }
        const contact: EmergencyContact = { name: contactName, phone: contactPhone };
        localStorage.setItem('emergencyContact', JSON.stringify(contact));
        setIsEmergencyModalOpen(false);
        setAlertState({ isOpen: true, title: "Yeay, Berhasil Disimpan", message: `Kontak darurat (${contactName}) telah diperbarui.`, icon: "✅" });
    };

    const openCamouflageSettings = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIsCamouflageModalOpen(true);
    };

    const onCamouflageClick = () => {
        const savedPin = localStorage.getItem('camouflagePin');
        if (savedPin) {
            setIsCamouflaged(true);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'PIN Belum Diatur',
                text: 'Atur PIN rahasia dulu yuk sebelum mengaktifkan mode ini.',
                confirmButtonText: 'Atur Sekarang',
                confirmButtonColor: '#374151'
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsCamouflageModalOpen(true);
                }
            });
        }
    };

    return (
        <div className="w-full min-h-screen pb-20 pt-24 bg-[#FDF6F0] text-[#5D4037] font-sans overflow-x-hidden selection:bg-[#c43c27] selection:text-white">
            
            {/* --- BACKGROUND SIMPLE & CLEAN --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                 <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-rose-200/30 rounded-full blur-[80px]"></div>
                 <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-teal-200/30 rounded-full blur-[80px]"></div>
            </div>

            {/* CONTAINER */}
            <div className="max-w-4xl mx-auto px-5 md:px-8 relative z-10">
                
                {/* --- MODALS --- */}
                <CustomAlert isOpen={alertState.isOpen} title={alertState.title} message={alertState.message} icon={alertState.icon} onClose={() => setAlertState({ ...alertState, isOpen: false })} />
                <SettingsModal isOpen={isEmergencyModalOpen} contactName={contactName} contactPhone={contactPhone} onNameChange={setContactName} onPhoneChange={setContactPhone} onClose={() => setIsEmergencyModalOpen(false)} onSave={handleSaveEmergencyContact} />
                <CamouflageSettingsModal isOpen={isCamouflageModalOpen} onClose={() => setIsCamouflageModalOpen(false)} />

                {/* --- HEADER --- */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                    <div className="flex-1">
                        <p className="text-xs font-bold text-[#5D4037]/60 uppercase tracking-widest mb-1.5">{dateString}</p>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#5D4037] leading-tight">
                            {greeting}, <span className="text-[#c43c27]">Cantik!</span>
                        </h1>
                    </div>
                    
                    {/* Badge Status (Visible on ALL Devices now) */}
                    <div className="self-start sm:self-center bg-white/60 px-3 py-1.5 rounded-full border border-white/50 shadow-sm backdrop-blur-sm flex items-center gap-2">
                        <div className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </div>
                        <span className="text-[10px] font-bold text-[#5D4037]/70 uppercase tracking-wide"> Aruna Online</span>
                    </div>
                </div>

                {/* --- BENTO GRID --- */}
                {/* PERUBAHAN UTAMA DI SINI: lg:grid-cols-4. 
                    Artinya di Tablet (md) dia tetap 2 kolom (biar gede), 
                    baru di Laptop/PC (lg) dia jadi 4 kolom. */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    
                    {/* 1. PANIC BUTTON (Main Focus) */}
                    <div 
                        onClick={onPanicButtonClick}
                        className="col-span-2 lg:col-span-2 row-span-2 relative overflow-hidden rounded-3xl cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#E63946] to-[#F77F00]"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20"></div>
                        
                        <div className="relative p-6 h-full flex flex-col justify-between text-white">
                            <div className="flex justify-between items-start">
                                <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/20">
                                    <BellAlertIcon className="w-6 h-6 text-white" />
                                </div>
                                <button onClick={openEmergencySettings} className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/10 transition-colors">
                                    <Cog6ToothIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-1">Panic Button</h2>
                                <p className="text-xs text-white/90 mb-4 font-medium leading-relaxed">
                                    Kirim SOS & Lokasi ke kontak darurat.
                                </p>
                                <div className="bg-white text-[#c43c27] py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm">
                                    <span>TEKAN SEKARANG</span>
                                    <ArrowRightIcon className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. LIVE POSITION */}
                    <Link href="/live-position" className="col-span-2 lg:col-span-2 bg-white/60 backdrop-blur-lg border border-white/60 rounded-3xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all group min-h-[100px]">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                                <MapPinIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">Live Position</h3>
                                <p className="text-xs text-gray-500">Bagikan lokasi real-time.</p>
                            </div>
                        </div>
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm group-hover:text-blue-600 transition-colors">
                            <ArrowRightIcon className="w-4 h-4" />
                        </div>
                    </Link>

                    {/* 3. ARUNA AI (Small Square) */}
                    <Link href="/chat" className="col-span-1 bg-white/60 backdrop-blur-lg border border-white/60 rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group h-40 lg:h-auto min-h-[160px]">
                        <div className="p-3 bg-teal-100 text-teal-600 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                            <ChatBubbleLeftRightIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Aruna AI</h3>
                            <p className="text-[10px] text-gray-500">Teman cerita.</p>
                        </div>
                    </Link>

                    {/* 4. JURNAL (Small Square) */}
                    <Link href="/notes" className="col-span-1 bg-white/60 backdrop-blur-lg border border-white/60 rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group h-40 lg:h-auto min-h-[160px]">
                        <div className="p-3 bg-yellow-100 text-yellow-600 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                            <BookOpenIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Jurnal</h3>
                            <p className="text-[10px] text-gray-500">Catatan hati.</p>
                        </div>
                    </Link>

                    {/* 5. QUICK TOOLS (Baris Rapi) */}
                    <div className="col-span-2 lg:col-span-4 bg-white/50 backdrop-blur-md border border-white/50 rounded-3xl p-4 shadow-sm">
                        <div className="grid grid-cols-3 divide-x divide-gray-200/50">
                            
                            <Link href="/directory" className="flex flex-col items-center justify-center gap-2 hover:opacity-70 transition-opacity">
                                <div className="p-2 bg-orange-100 rounded-xl text-orange-600">
                                    <PhoneIcon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold text-gray-600">Kontak</span>
                            </Link>

                            <Link href="/audit" className="flex flex-col items-center justify-center gap-2 hover:opacity-70 transition-opacity">
                                <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                                    <ShieldCheckIcon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold text-gray-600">Audit</span>
                            </Link>

                            <Link href="/information" className="flex-1 flex flex-col items-center justify-center gap-2 hover:opacity-70 transition-opacity">
                                <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
                                    <SparklesIcon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold text-gray-600">Panduan</span>
                            </Link>

                        </div>
                    </div>

                    {/* 6. CAMOUFLAGE (Full Width) */}
                    <div className="col-span-2 lg:col-span-4">
                        <div 
                            onClick={onCamouflageClick}
                            className="w-full bg-[#2D2D2D] text-white rounded-3xl p-4 flex items-center justify-between cursor-pointer shadow-md hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-xl text-white/80">
                                    <CalculatorIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Mode Kamuflase</h3>
                                    <p className="text-[10px] text-white/50">Sembunyikan app ini.</p>
                                </div>
                            </div>
                            <button 
                                onClick={openCamouflageSettings} 
                                className="p-2 text-white/40 hover:text-white bg-white/5 rounded-full transition-colors"
                            >
                                <KeyIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer Quote */}
                <p className="text-center text-[10px] text-[#5D4037]/40 mt-10 italic flex items-center justify-center gap-1">
                    <HeartIcon className="w-3 h-3" /> You are safe here.
                </p>

            </div>
        </div>
    );
}