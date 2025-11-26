import React from 'react';
import Link from 'next/link';
import { 
    ShieldCheckIcon, 
    HeartIcon, 
    EyeSlashIcon,
    ArrowLongRightIcon,
    SparklesIcon
} from '@heroicons/react/24/solid';
import { 
    Cog6ToothIcon, 
    CursorArrowRaysIcon, 
    CheckBadgeIcon,
    PlayCircleIcon
} from '@heroicons/react/24/outline';

import TestimonialSlider from '../components/TestimonialSlider';
import FaqAccordion from '../components/FaqAccordion';
import HeroSlider from '../components/HeroSlider';

export default function HomePage() {
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#c43c27]/10 shadow-sm backdrop-blur-sm mb-6">
                            <SparklesIcon className="w-4 h-4 text-[#c43c27]" />
                            <span className="text-xs font-bold tracking-widest uppercase text-[#c43c27]">Selamat Datang!</span>
                        </div>
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
                                        <ShieldCheckIcon className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 text-gray-900">Panic Button</h3>
                                    <p className="text-gray-600 leading-relaxed mb-8 text-base">
                                        Sinyal darurat instan. Sekali tekan, maka lokasi kamu dan sebuah pesan SOS terkirim ke kontak terpercaya yang sudah kamu setting via WhatsApp!
                                    </p>
                                </div>
                                <Link href="/dashboard" className="inline-flex items-center gap-3 text-[#c43c27] font-bold text-sm tracking-widest uppercase group-hover:gap-5 transition-all">
                                    <span>Coba Sekarang</span>
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-[#c43c27] group-hover:text-white transition-colors">
                                        <ArrowLongRightIcon className="w-4 h-4"/>
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
                                        <HeartIcon className="w-10 h-10" />
                                    </div>
                                    <div className="inline-block px-3 py-1 rounded-lg bg-teal-100 text-teal-700 text-[10px] font-bold uppercase tracking-wider mb-3">
                                        Paling Disukai
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 text-gray-900">Aruna AI</h3>
                                    <p className="text-gray-600 leading-relaxed mb-8 text-base">
                                        Ruang AI yang siap mendengar keluh kesahmu 24/7 tanpa menghakimi, kapanpun kamu butuh!
                                    </p>
                                </div>
                                <Link href="/chat" className="relative z-10 inline-flex items-center gap-3 text-teal-600 font-bold text-sm tracking-widest uppercase group-hover:gap-5 transition-all">
                                    <span>Mulai Curhat</span>
                                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                        <ArrowLongRightIcon className="w-4 h-4"/>
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
                                        <EyeSlashIcon className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4 text-gray-900">Mode Kamuflase</h3>
                                    <p className="text-gray-600 leading-relaxed mb-8 text-base">
                                        Perlindungan privasi mutlak. Samarkan tampilan web ini menjadi kalkulator fungsional agar aman dari mata pelaku kejahatan.
                                    </p>
                                </div>
                                <Link href="/information" className="inline-flex items-center gap-3 text-stone-600 font-bold text-sm tracking-widest uppercase group-hover:gap-5 transition-all">
                                    <span>Pelajari Caranya</span>
                                    <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center group-hover:bg-stone-700 group-hover:text-white transition-colors">
                                        <ArrowLongRightIcon className="w-4 h-4"/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CARA KERJA (Glass Panel) */}
            <section className="py-24 relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Panel Kaca Besar */}
                    <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] p-8 md:p-20 border border-white/50 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#c43c27]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        
                        <div className="flex flex-col md:flex-row gap-16 items-center relative z-10">
                            <div className="md:w-1/2">
                                <div className="flex items-center gap-2 text-[#c43c27] font-bold tracking-widest uppercase text-xs mb-4">
                                    <PlayCircleIcon className="w-5 h-5" />
                                    <span>Mudah & Cepat</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                    Hanya 3 Langkah untuk <span className="font-serif italic text-[#c43c27]">Ketenanganmu</span>
                                </h2>
                                <p className="text-lg opacity-70 mb-10 leading-relaxed">
                                    Dalam situasi darurat, setiap detik berharga. Aruna didesain untuk bekerja secepat kilat tanpa kerumitan.
                                </p>
                                <Link href="/dashboard" className="inline-block bg-[#6B4F4F] text-white px-10 py-4 rounded-full font-bold hover:bg-[#523b3b] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                                    Setup Sekarang
                                </Link>
                            </div>

                            <div className="md:w-1/2 space-y-6">
                                {[
                                    { 
                                        icon: Cog6ToothIcon, 
                                        title: "Atur Kontak Darurat", 
                                        desc: "Masukkan nomor orang terpercayamu (Ayah, Ibu, atau teman). Cukup sekali saja." 
                                    },
                                    { 
                                        icon: CursorArrowRaysIcon, 
                                        title: "Tekan Tombol", 
                                        desc: "Buka aplikasi dan tekan tombol merah besar saat kamu mulai merasa tidak aman." 
                                    },
                                    { 
                                        icon: CheckBadgeIcon, 
                                        title: "Bantuan Datang", 
                                        desc: "Lokasi GPS dan pesan SOS otomatis terbuka di WhatsApp, dan siap untuk dikirim." 
                                    }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6 items-center p-6 rounded-3xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-lg transition-all duration-300 group">
                                        <div className="w-16 h-16 flex-shrink-0 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform text-[#6B4F4F] group-hover:text-[#c43c27]">
                                            <step.icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-1 text-gray-800">{step.title}</h3>
                                            <p className="opacity-60 text-sm">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
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

            {/* 6. FINAL CTA (Luxury Dark Card) */}
            <section className="py-32 px-6 relative z-10">
                <div className="max-w-5xl mx-auto bg-[#6B4F4F] rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-[#6B4F4F]/30 ring-8 ring-[#6B4F4F]/5">
                    {/* Animated Background Effect */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-20 -mt-20 blur-[80px]"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c43c27] opacity-20 rounded-full -mr-20 -mb-20 blur-[80px]"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
                            Kamu tidak sendirian.<br/>Kami ada di sini.
                        </h2>
                        <p className="text-lg md:text-xl opacity-80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                            Bergabunglah dengan ribuan perempuan lainnya yang memilih untuk merasa lebih aman dan berdaya bersama Aruna.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link 
                                href="/dashboard" 
                                className="inline-block bg-white text-[#6B4F4F] font-bold py-5 px-12 text-lg rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all transform hover:-translate-y-1"
                            >
                                Mulai Sekarang (Gratis)
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}