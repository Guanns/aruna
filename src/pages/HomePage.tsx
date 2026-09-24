import React, { useState, useEffect } from 'react';
import { BadgeCheck, ChevronDown, EyeOff, Heart, MousePointerClick, MoveRight, Settings, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import TestimonialSlider from '../components/TestimonialSlider';
import FaqAccordion from '../components/FaqAccordion';
import HeroSlider from '../components/HeroSlider';

export default function HomePage() {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const isDismissed = localStorage.getItem('aruna_update_dismissed');
        if (isDismissed === 'true') return;

        // Cek tanggal batas: 20 Juli 2026 (akhir hari)
        const deadline = new Date('2026-07-20T23:59:59+07:00').getTime();
        const now = new Date().getTime();
        
        if (now <= deadline) {
            setShowUpdateModal(true);
        }
    }, []);

    const handleCloseModal = () => {
        if (dontShowAgain) {
            localStorage.setItem('aruna_update_dismissed', 'true');
        }
        setShowUpdateModal(false);
    };

    return (
        <div className="w-full bg-[#FFFBF5] text-[#6B4F4F] overflow-hidden relative font-sans">
            
            {/* --- BACKGROUND FX (Latar Belakang "Bernapas") --- */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 {/* Bola merah bergerak pelan */}
                 <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-b from-[#c43c27]/10 to-transparent rounded-full blur-[120px] animate-pulse"></div>
                 {/* Bola teal di bawah */}
                 <div className="absolute bottom-[10%] left-[-20%] w-[600px] h-[600px] bg-gradient-to-t from-teal-500/10 to-transparent rounded-full blur-[100px]"></div>
                 {/* Noise texture halus overlay untuk kesan "kertas" */}
                 <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
            </div>

            {/* 1. HERO SECTION */}
            <HeroSlider />

            {/* 2. FITUR UNGGULAN (THE PREMIUM CARDS) */}
            <section className="py-32 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header Section */}
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Teknologi untuk <span className="font-serif italic text-[#c43c27] decoration-wavy underline decoration-[#c43c27]/20 underline-offset-8">Keamananmu</span>
                        </h2>
                        <p className="text-xl opacity-70 max-w-2xl mx-auto font-light leading-relaxed">
                            Aruna adalah sebuah web app yang menggabungkan keamanan, edukasi, relaksasi dan AI khusus pada satu tempat!
                        </p>
                    </div>

                    {/* --- THE CARDS --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* CARD 1: PANIC BUTTON (Red Accent) */}
                        <div className="group relative h-full">
                            {/* Efek Glow di belakang kartu saat hover */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                            
                            <div className="relative h-full bg-white/80 backdrop-blur-xl border border-white/60 p-10 rounded-[2.5rem] shadow-xl shadow-red-900/5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                                {/* Aksen Lingkaran Halus */}
                                <div className="absolute -right-10 -top-10 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50"></div>
                                
                                <div>
                                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-500">
                                        <ShieldCheck className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 text-gray-900">Panic Button</h3>
                                    <p className="text-gray-600 leading-relaxed mb-8 text-base">
                                        Sinyal darurat instan. Sekali tekan, maka lokasi kamu dan sebuah pesan SOS terkirim ke kontak terpercaya yang sudah kamu setting via WhatsApp!
                                    </p>
                                </div>
                                <Link to="/dashboard" className="inline-flex items-center gap-3 text-[#c43c27] font-bold text-sm tracking-widest uppercase group-hover:gap-5 transition-all">
                                    <span>Coba Sekarang</span>
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-[#c43c27] group-hover:text-white transition-colors">
                                        <MoveRight className="w-4 h-4"/>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* CARD 2: ARUNA AI (Teal Accent - Highlighted) */}
                        <div className="group relative h-full lg:-mt-8 lg:mb-8">
                            {/* Efek Glow Lebih Kuat */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            
                            <div className="relative h-full bg-white/90 backdrop-blur-xl border border-white/80 p-10 rounded-[2.5rem] shadow-2xl shadow-teal-900/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 overflow-hidden ring-1 ring-teal-900/5">
                                {/* Dekorasi Spesial */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-teal-50 rounded-bl-[5rem] -mr-10 -mt-10 transition-transform group-hover:scale-110 z-0"></div>
                                
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-500">
                                        <Heart className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 text-gray-900">Aruna AI</h3>
                                    <p className="text-gray-600 leading-relaxed mb-8 text-base">
                                        Ruang AI yang siap mendengar keluh kesahmu 24/7 tanpa menghakimi, kapanpun kamu butuh!
                                    </p>
                                </div>
                                <Link to="/chat" className="relative z-10 inline-flex items-center gap-3 text-teal-600 font-bold text-sm tracking-widest uppercase group-hover:gap-5 transition-all">
                                    <span>Mulai Curhat</span>
                                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                        <MoveRight className="w-4 h-4"/>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* CARD 3: KAMUFLASE (Dark/Stone Accent) */}
                        <div className="group relative h-full">
                            <div className="absolute -inset-1 bg-gradient-to-r from-stone-400 to-gray-400 rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                            
                            <div className="relative h-full bg-white/80 backdrop-blur-xl border border-white/60 p-10 rounded-[2.5rem] shadow-xl shadow-stone-900/5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                                <div className="absolute -right-10 -top-10 w-64 h-64 bg-gray-100 rounded-full blur-3xl opacity-50"></div>

                                <div>
                                    <div className="w-20 h-20 bg-gradient-to-br from-stone-600 to-gray-700 text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-stone-600/30 group-hover:scale-110 transition-transform duration-500">
                                        <EyeOff className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 text-gray-900">Mode Kamuflase</h3>
                                    <p className="text-gray-600 leading-relaxed mb-8 text-base">
                                        Perlindungan privasi mutlak. Samarkan tampilan web ini menjadi kalkulator fungsional agar aman dari mata pelaku kejahatan.
                                    </p>
                                </div>
                                <Link to="/information" className="inline-flex items-center gap-3 text-stone-600 font-bold text-sm tracking-widest uppercase group-hover:gap-5 transition-all">
                                    <span>Pelajari Caranya</span>
                                    <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center group-hover:bg-stone-700 group-hover:text-white transition-colors">
                                        <MoveRight className="w-4 h-4"/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CARA KERJA (Linear Vertical Timeline) */}
            <section className="py-24 px-6 relative z-10 font-poppins">
                <div className="max-w-3xl mx-auto">
                    
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-stone-900 tracking-tight leading-tight">
                            Hanya 3 Langkah untuk <span className="text-[#c43c27]">Ketenanganmu</span>
                        </h2>
                        <p className="text-sm sm:text-base text-stone-500 max-w-xl mx-auto font-normal leading-relaxed">
                            Dalam situasi darurat, setiap detik berharga. Aruna bekerja cepat tanpa prosedur yang rumit.
                        </p>
                    </div>

                    {/* Timeline Container */}
                    <div className="relative">
                        
                        {/* Connecting Vertical Line */}
                        <div className="absolute left-5 sm:left-6 top-8 bottom-8 w-0.5 bg-stone-200"></div>

                        {/* Steps List */}
                        <div className="space-y-6 sm:space-y-8">
                            {[
                                {
                                    step: "01",
                                    icon: Settings,
                                    iconColor: "text-stone-700",
                                    iconBg: "bg-stone-100",
                                    title: "Atur Kontak Darurat",
                                    desc: "Masukkan nomor orang terpercayamu (Ayah, Ibu, atau sahabat). Konfigurasi ini cukup dilakukan sekali saja saat awal penggunaan."
                                },
                                {
                                    step: "02",
                                    icon: MousePointerClick,
                                    iconColor: "text-[#c43c27]",
                                    iconBg: "bg-red-50",
                                    title: "Tekan Tombol Darurat",
                                    desc: "Buka aplikasi dan tekan tombol merah besar saat kamu mulai merasa tidak aman atau membutuhkan pertolongan segera."
                                },
                                {
                                    step: "03",
                                    icon: BadgeCheck,
                                    iconColor: "text-emerald-700",
                                    iconBg: "bg-emerald-50",
                                    title: "Bantuan Datang",
                                    desc: "Lokasi GPS terkini dan pesan SOS otomatis tersusun dan siap dikirimkan langsung ke kontak darurat melalui WhatsApp."
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
                                    
                                    {/* Number Node Marker */}
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-stone-300 group-hover:border-[#c43c27] text-stone-700 group-hover:text-[#c43c27] font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 z-10 transition-colors shadow-xs">
                                        {item.step}
                                    </div>

                                    {/* Step Card */}
                                    <div className="flex-1 bg-white border border-stone-200/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-stone-300 hover:shadow-sm transition-all">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`p-2 rounded-xl ${item.iconBg} ${item.iconColor} shrink-0`}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-0 sm:pl-11">
                                            {item.desc}
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </section>

            {/* 4. TESTIMONIALS */}
            <section className="py-10 relative z-10">
                <TestimonialSlider />
            </section>

            {/* 5. FAQ */}
            <section className="py-10 relative z-10">
                <FaqAccordion />
            </section>

            {/* 6. FINAL CTA (Aurora Pastel Fresh Floating Bento) */}
            <section className="py-20 md:py-28 px-4 sm:px-6 relative z-10 font-poppins">
                <div className="max-w-5xl mx-auto rounded-[2.5rem] p-10 sm:p-14 md:p-20 text-center relative overflow-hidden bg-gradient-to-br from-rose-100/90 via-purple-100/70 to-amber-100/80 border border-white/80 shadow-[0_20px_50px_rgba(225,29,72,0.07)]">
                    {/* Soft ambient aurora glows */}
                    <div className="absolute -top-24 -left-24 w-80 h-80 bg-rose-300/35 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.2] mb-6">
                            Kamu tidak sendirian.<br />
                            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
                                Kami ada di sini.
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-stone-600 font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
                            Bergabunglah dengan ribuan perempuan lainnya yang memilih untuk merasa lebih aman, terlindungi, dan berdaya bersama Aruna.
                        </p>
                        <div className="flex justify-center">
                            <Link 
                                to="/dashboard" 
                                className="group inline-flex items-center justify-center gap-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-base sm:text-lg py-4 px-9 rounded-full shadow-lg shadow-stone-900/15 hover:shadow-stone-900/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <span>Mulai Sekarang (Gratis)</span>
                                <MoveRight className="w-5 h-5 text-white/80 group-hover:translate-x-1.5 transition-transform duration-200" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Update Modal Overlay */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto animate-fade-in">
                    <div className="bg-white rounded-[2rem] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-stone-100/60 max-w-md w-full my-auto relative z-50 animate-bounce-in overflow-hidden">
                        
                        {/* Gold sparkle decor */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-100/20 rounded-full blur-2xl pointer-events-none"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400"></div>

                        <div className="text-center mb-5">
                            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-amber-600 border border-amber-100/50 shadow-sm">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-black text-gray-800 tracking-tight">Pembaruan Sistem</h2>
                            <p className="text-[11px] text-stone-500 font-light mt-1">
                                Beberapa penambahan fitur baru dan peningkatan rilis Juli 2026:
                            </p>
                        </div>

                        {/* Dropdown Toggle Button */}
                        <button 
                            onClick={() => setShowDetails(!showDetails)}
                            className="w-full flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100/85 rounded-xl border border-stone-200/50 transition-all duration-300 mb-4 group"
                        >
                            <span className="text-xs font-bold text-stone-600">Lihat Rincian Pembaruan</span>
                            <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${showDetails ? 'rotate-180 text-amber-500' : 'group-hover:text-stone-600'}`} />
                        </button>

                        {/* Collapsible Content */}
                        {showDetails && (
                            <div className="space-y-1 mb-4 max-h-[160px] overflow-y-auto pr-1 bg-stone-50/50 p-2.5 rounded-xl border border-stone-100/80 animate-fade-in">
                                {[
                                    "Penambahan menu galeri",
                                    "Penambahan fitur pengaduan langsung melalui SI SAKA",
                                    "Penambahan konten edukasi baru tentang dasar dasar hukum",
                                    "Perbaikan pada fitur Aruna AI",
                                    "Perbaikan logika pada fitur game 'Batu Zen'",
                                    "Perbaikan logika pada fitur jurnal pribadi",
                                    "Mengoptimalkan kecepatan pemuatan halaman",
                                    "Mengatasi glitch visual kecil",
                                    "Penyesuaian UI/UX di berbagai perangkat"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5 p-1 rounded-lg">
                                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100/30">
                                            <BadgeCheck className="w-2.5 h-2.5" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-stone-600 leading-normal">{item}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Interactive "Don't Show Again" Checkbox */}
                        <div 
                            onClick={() => setDontShowAgain(!dontShowAgain)}
                            className="flex items-center gap-2.5 mb-5 cursor-pointer select-none p-1.5 rounded-xl hover:bg-stone-50 transition-colors w-fit group"
                        >
                            <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all duration-300
                                ${dontShowAgain 
                                    ? 'bg-amber-500 border-amber-500 text-white shadow-sm' 
                                    : 'border-stone-300 bg-white group-hover:border-stone-400'
                                }
                            `}>
                                {dontShowAgain && <BadgeCheck className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-xs font-bold text-stone-500">Jangan tunjukkan pembaruan ini lagi</span>
                        </div>

                        <button 
                            onClick={handleCloseModal}
                            className="w-full py-3 bg-[#6B4F4F] text-white rounded-xl font-bold text-sm tracking-wide shadow-md hover:bg-stone-700 active:scale-95 transition-all"
                        >
                            Mengerti & Lanjutkan
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}