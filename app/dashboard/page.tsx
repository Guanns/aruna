// app/dashboard/page.tsx
// VERSI FINAL LAYOUT: Jurnal Full Width di Tablet/PC

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
import { getPeriodData, calculateCycle } from '../../features/period';
import CustomAlert from '../../components/CustomAlert';
import SettingsModal from '../../components/SettingsModal';
import CamouflageSettingsModal from '../../components/CamouflageSettingsModal';
import { useCamouflage } from '../../context/CamouflageContext';

type EmergencyContact = { name: string; phone: string; };

export default function DashboardPage() {
    const [greeting, setGreeting] = useState('');
    const [dateString, setDateString] = useState('');
    const [alertState, setAlertState] = useState({ isOpen: false, title: '', message: '', icon: '' });
    const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    
    // Haid State
    const [periodInfo, setPeriodInfo] = useState<{days: number, phase: string} | null>(null);

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

        const pData = getPeriodData();
        if (pData) {
            const info = calculateCycle(pData);
            setPeriodInfo({ days: info.daysLeft, phase: info.phase });
        }
    }, []);

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
            setAlertState({ isOpen: true, title: "Input Tidak Valid", message: "Nomor HP harus diawali 62 (contoh: 62812...).", icon: "🤔" });
            return;
        }
        const contact: EmergencyContact = { name: contactName, phone: contactPhone };
        localStorage.setItem('emergencyContact', JSON.stringify(contact));
        setIsEmergencyModalOpen(false);
        setAlertState({ isOpen: true, title: "Berhasil Disimpan", message: `Kontak darurat (${contactName}) telah diperbarui.`, icon: "✅" });
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
        <div className="w-full min-h-screen pb-24 pt-28 bg-[#F9F5F2] text-[#5D4037] font-sans overflow-x-hidden">
            
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0">
                 <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[100px]"></div>
                 <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                
                {/* Modals */}
                <CustomAlert isOpen={alertState.isOpen} title={alertState.title} message={alertState.message} icon={alertState.icon} onClose={() => setAlertState({ ...alertState, isOpen: false })} />
                <SettingsModal isOpen={isEmergencyModalOpen} contactName={contactName} contactPhone={contactPhone} onNameChange={setContactName} onPhoneChange={setContactPhone} onClose={() => setIsEmergencyModalOpen(false)} onSave={handleSaveEmergencyContact} />
                <CamouflageSettingsModal isOpen={isCamouflageModalOpen} onClose={() => setIsCamouflageModalOpen(false)} />

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <p className="text-xs font-bold text-[#5D4037]/50 uppercase tracking-widest mb-2">{dateString}</p>
                        <h1 className="text-3xl md:text-5xl font-bold text-[#5D4037]">
                            {greeting}, <span className="text-[#c43c27]">Cantik!</span>
                        </h1>
                    </div>
                    <div className="bg-white/60 px-4 py-2 rounded-full border border-white shadow-sm backdrop-blur-sm flex items-center gap-2 w-fit">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-bold text-[#5D4037]/70 uppercase tracking-wide">Aruna Online</span>
                    </div>
                </header>

                {/* --- BENTO GRID SYSTEM --- */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    
                    {/* 1. PANIC BUTTON (2x2) */}
                    <div 
                        onClick={onPanicButtonClick}
                        className="col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-[#E63946] to-[#F77F00] rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden cursor-pointer group shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98]"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20"></div>
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
                        
                        <div className="relative h-full flex flex-col justify-between text-white z-10">
                            <div className="flex justify-between items-start">
                                <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-inner">
                                    <BellAlertIcon className="w-8 h-8 text-white animate-pulse" />
                                </div>
                                <button onClick={openEmergencySettings} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/10 transition-colors">
                                    <Cog6ToothIcon className="w-6 h-6" />
                                </button>
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">Panic Button</h2>
                                <p className="text-sm text-white/90 mb-6 font-medium leading-relaxed opacity-90">
                                    Tekan saat darurat. Lokasi & Sinyal SOS terkirim otomatis.
                                </p>
                                <div className="w-full bg-white text-[#c43c27] py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg group-hover:scale-[1.02] transition-transform">
                                    <span>TEKAN BANTUAN</span>
                                    <ArrowRightIcon className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. LIVE POSITION (2x1 Wide) */}
                    <Link href="/live-position" className="col-span-2 lg:col-span-2 bg-white border border-white/60 rounded-[2.5rem] p-6 flex items-center justify-between shadow-sm hover:shadow-lg transition-all group relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-24 h-full bg-blue-50/50 -skew-x-12 translate-x-8"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                                    <MapPinIcon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">Live Position</h3>
                            </div>
                            <p className="text-xs text-gray-500">Bagikan lokasi real-time.</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform relative z-10">
                            <ArrowRightIcon className="w-5 h-5" />
                        </div>
                    </Link>

                    {/* 3. SIKLUS HAID (Small - 1x1) */}
                    <Link href="/period" className="col-span-1 bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 rounded-[2.5rem] p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group min-h-[160px]">
                        <div className="flex justify-between items-start">
                            <div className="p-2.5 bg-white text-rose-500 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                                <HeartIcon className="w-6 h-6" />
                            </div>
                            {periodInfo && (
                                <span className="text-[10px] font-bold bg-white/60 px-2 py-1 rounded-lg text-rose-700 backdrop-blur-sm">
                                    {periodInfo.days > 0 ? `${periodInfo.days} Hari` : 'Haid'}
                                </span>
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-rose-900 text-sm mb-1">Siklus Haid</h3>
                            <p className="text-[10px] text-rose-700/70 leading-tight">
                                {periodInfo ? `Fase: ${periodInfo.phase}` : 'Ketuk untuk atur siklus.'}
                            </p>
                        </div>
                    </Link>

                    {/* 4. ARUNA AI (Small - 1x1) */}
                    <Link href="/chat" className="col-span-1 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 rounded-[2.5rem] p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group min-h-[160px]">
                        <div className="p-2.5 bg-white text-teal-600 rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                            <ChatBubbleLeftRightIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-teal-900 text-sm">Aruna AI</h3>
                            <p className="text-[10px] text-gray-500">Teman cerita.</p>
                        </div>
                    </Link>

                    {/* 5. JURNAL (FIX: Full Width di Desktop agar tidak bolong) */}
                    <Link href="/notes" className="col-span-2 lg:col-span-4 bg-white border border-white/60 rounded-[2.5rem] p-6 flex items-center justify-between shadow-sm hover:shadow-lg transition-all group relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-full bg-yellow-50/50 -skew-x-12 translate-x-8"></div>
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-2xl">
                                <BookOpenIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">Jurnal Pribadi</h3>
                                <p className="text-xs text-gray-500">Catatan hatimu hari ini.</p>
                            </div>
                        </div>
                        <ArrowRightIcon className="w-5 h-5 text-gray-300 group-hover:text-yellow-600 transition-colors relative z-10"/>
                    </Link>

                    {/* 6. UTILITIES (Full Width Bar) */}
                    <div className="col-span-2 lg:col-span-4 bg-white/60 backdrop-blur-md border border-white/60 rounded-[2rem] p-2 shadow-sm flex divide-x divide-gray-200/50">
                        <Link href="/directory" className="flex-1 py-3 flex flex-col items-center gap-1 hover:bg-white rounded-2xl transition-all group">
                            <PhoneIcon className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold text-gray-600">Kontak</span>
                        </Link>
                        <Link href="/audit" className="flex-1 py-3 flex flex-col items-center gap-1 hover:bg-white rounded-2xl transition-all group">
                            <ShieldCheckIcon className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold text-gray-600">Audit</span>
                        </Link>
                        <Link href="/information" className="flex-1 py-3 flex flex-col items-center gap-1 hover:bg-white rounded-2xl transition-all group">
                            <SparklesIcon className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold text-gray-600">Panduan</span>
                        </Link>
                    </div>

                    {/* 7. CAMOUFLAGE (Full Width) */}
                    <div className="col-span-2 lg:col-span-4">
                        <div 
                            onClick={onCamouflageClick}
                            className="w-full bg-[#2D2D2D] text-white rounded-[2rem] p-4 flex items-center justify-between cursor-pointer shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
                        >
                            <div className="flex items-center gap-3 pl-2 relative z-10">
                                <div className="p-2 bg-white/10 rounded-xl">
                                    <CalculatorIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Mode Kamuflase</h3>
                                    <p className="text-[10px] text-white/50">Sembunyikan app ini.</p>
                                </div>
                            </div>
                            <button 
                                onClick={openCamouflageSettings} 
                                className="p-2 text-white/40 hover:text-white bg-white/5 rounded-full transition-colors relative z-10"
                            >
                                <KeyIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer Quote */}
                <div className="mt-12 text-center">
                     <p className="text-xs text-[#5D4037]/40 italic flex items-center justify-center gap-2">
                        <HeartIcon className="w-3 h-3" /> You are safe here.
                    </p>
                </div>

            </div>
        </div>
    );
}