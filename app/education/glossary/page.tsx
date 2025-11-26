// app/education/page.tsx
// VERSI REDESIGN 2: Mobile Precision + No Images (Text Focus)

import React from 'react';
import Link from 'next/link';
import { 
    BookOpenIcon, 
    ArrowLongRightIcon,
    MagnifyingGlassIcon,
    LanguageIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/solid';
import { 
    PlayCircleIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

// --- DATA ARTIKEL (Gambar dihapus) ---
const articles = [
    {
        slug: 'mengenal-gaslighting',
        title: 'Mengenal Apa Itu Gaslighting dan Cara Menghadapinya',
        snippet: 'Gaslighting adalah bentuk manipulasi psikologis yang membuat seseorang meragukan kewarasan mereka sendiri. Pelajari pola-polanya.',
        category: 'Mental Health',
        color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
    {
        slug: 'kekerasan-dalam-pacaran',
        title: 'Tanda-Tanda Kekerasan dalam Pacaran (KDP)',
        snippet: 'Kekerasan bukan hanya fisik. Kenali tanda-tanda kekerasan emosional, digital, dan finansial yang sering terabaikan sejak dini.',
        category: 'Relationship',
        color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
    {
        slug: 'menjaga-privasi-digital',
        title: 'Panduan Praktis Menjaga Privasi di Media Sosial',
        snippet: 'Akunmu adalah rumahmu. Pelajari langkah-langkah praktis untuk mengamankan Instagram, TikTok, dan WhatsApp dari penguntit.',
        category: 'Digital Safety',
        color: 'text-teal-600 bg-teal-50 border-teal-100',
    },
    {
        slug: 'membangun-batasan-sehat',
        title: 'Pentingnya Membangun Batasan (Boundaries)',
        snippet: 'Mengatakan "tidak" bukan berarti egois. Membangun batasan yang sehat adalah bentuk penghargaan tertinggi terhadap diri sendiri.',
        category: 'Self Care',
        color: 'text-orange-600 bg-orange-50 border-orange-100',
    }
];

export default function EducationPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20">
             
             {/* --- BACKGROUND FX (Atmospheric) --- */}
             <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-300/10 rounded-full blur-[120px] animate-pulse"></div>
                 <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-orange-300/10 rounded-full blur-[100px]"></div>
                 <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
            </div>

            {/* PADDING ADJUSTMENT: pt-28 on mobile, pt-32 on desktop */}
            <div className="max-w-7xl mx-auto px-5 md:px-6 pt-28 md:pt-32 relative z-10">
                
                {/* --- HERO HEADER --- */}
                <header className="text-center mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white/60 border border-teal-200/50 shadow-sm backdrop-blur-md mb-6 md:mb-8">
                        <BookOpenIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-teal-600" />
                        <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-teal-700">Aruna Knowledge Hub</span>
                    </div>
                    {/* TYPOGRAPHY FIX: Scaled down for mobile */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight tracking-tight text-[#6B4F4F]">
                        Edukasi untuk <span className="font-serif italic text-teal-600 block md:inline">Pemberdayaan.</span>
                    </h1>
                    <p className="text-base md:text-xl opacity-70 max-w-2xl mx-auto font-light leading-relaxed px-2">
                        Kumpulan panduan, artikel, dan tools interaktif untuk membekalimu dengan pengetahuan tentang keamanan dan kesehatan mental!
                    </p>
                    
                    {/* Search Bar Placeholder */}
                    <div className="mt-8 md:mt-10 max-w-md mx-auto relative group px-2">
                        <div className="absolute inset-0 bg-teal-200 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-white rounded-full shadow-sm border border-stone-200 flex items-center p-1.5 pl-5">
                            <MagnifyingGlassIcon className="w-5 h-5 text-stone-400 mr-2 shrink-0" />
                            <input 
                                type="text" 
                                placeholder="Cari topik (misal : gaslighting)..." 
                                className="w-full bg-transparent outline-none text-[#6B4F4F] placeholder:text-stone-400 text-sm py-2"
                                disabled
                            />
                            <button className="bg-[#6B4F4F] text-white rounded-full px-5 py-2.5 text-sm font-bold hover:bg-teal-700 transition-colors shrink-0">
                                Cari
                            </button>
                        </div>
                    </div>
                </header>
                
                {/* --- FEATURED 1: QUIZ BANNER --- */}
                <div className="mb-8 md:mb-12 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-orange-400 to-rose-400 rounded-[2rem] md:rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
                    {/* CARD PADDING: Reduced to p-6 on mobile */}
                    <div className="relative bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-xl overflow-hidden border border-white/50">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-rose-100/50 to-transparent rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 text-center md:text-left">
                            <div className="md:w-2/3">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                    <span className="flex h-3 w-3 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                                    </span>
                                    <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-rose-600">Interactive Tool</span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold mb-3 text-[#6B4F4F]">
                                    Red Flag Detector <span className="text-2xl md:text-4xl align-middle">🚩</span>
                                </h2>
                                <p className="text-sm md:text-lg text-[#6B4F4F]/70 leading-relaxed font-light max-w-xl mx-auto md:mx-0">
                                    Apakah hubunganmu sehat? Kadang cinta membuat kita buta pada tanda bahaya. Ikuti kuis singkat ini untuk mengetahuinya!
                                </p>
                            </div>
                            <div className="md:w-1/3 flex justify-center md:justify-end w-full">
                                <Link 
                                    href="/education/quiz" 
                                    className="group/btn relative inline-flex items-center justify-center gap-3 bg-[#6B4F4F] text-white font-bold py-4 px-8 md:py-5 md:px-10 rounded-full overflow-hidden shadow-lg transition-all hover:scale-105 hover:shadow-rose-900/20 w-full md:w-auto"
                                >
                                    <span className="relative z-10">Mulai Deteksi</span>
                                    <PlayCircleIcon className="w-6 h-6 relative z-10 group-hover/btn:rotate-12 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FEATURED 2: GLOSSARY BANNER (Premium Holographic) --- */}
                <div className="mb-8 md:mb-12 relative group">
                     <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-[2rem] md:rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                     
                     <div className="relative bg-white/80 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-xl overflow-hidden border border-indigo-100/50">
                        <div className="absolute top-[-50%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-[-50%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left">
                            <div className="flex-1">
                                <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-3">
                                    <div className="p-1.5 md:p-2 bg-indigo-100 rounded-lg">
                                        <LanguageIcon className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                                    </div>
                                    <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-indigo-600">Kamus</span>
                                </div>
                                
                                <h2 className="text-2xl md:text-4xl font-bold mb-3 text-[#6B4F4F]">
                                    Kamus Bahasa <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Gen Z</span>
                                </h2>
                                
                                <p className="text-sm md:text-lg text-[#6B4F4F]/70 font-light leading-relaxed max-w-xl mx-auto md:mx-0">
                                    Bingung dengan istilah <i>&quot;Love Bombing&quot;</i>, <i>&quot;Gaslighting&quot;</i>, atau bahasa gaul seperti <i>&quot;Rizz&quot;</i>? Cek artinya di sini biar makin <i>relate</i> dan paham!
                                </p>
                            </div>

                            <div className="flex-shrink-0 w-full md:w-auto">
                                <Link 
                                    href="/education/glossary" 
                                    className="inline-flex items-center justify-center gap-3 bg-white text-indigo-600 border border-indigo-100 font-bold py-4 px-8 rounded-full shadow-sm hover:shadow-lg hover:bg-indigo-50 transition-all transform hover:-translate-y-1 w-full md:w-auto"
                                >
                                    <span>Buka Kamus</span>
                                    <ArrowRightIcon className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                     </div>
                </div>

                {/* --- FEATURED 3: CHAT SIMULATOR BANNER --- */}
                <div className="mb-16 md:mb-24 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-[2rem] md:rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-xl overflow-hidden border border-teal-100/50">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left">
                            <div className="flex-1">
                                <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-3">
                                    <div className="p-1.5 md:p-2 bg-teal-50 rounded-lg border border-teal-100">
                                        <ShieldCheckIcon className="w-4 h-4 md:w-5 md:h-5 text-teal-600" />
                                    </div>
                                     <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-teal-600">Training</span>
                                </div>
                                <h2 className="text-xl md:text-3xl font-bold mb-3 text-[#6B4F4F]">
                                    Latih diri kamu agar tau bagaimana caranya untuk menolak 💬
                                </h2>
                                <p className="opacity-90 font-light max-w-xl text-sm md:text-lg mx-auto md:mx-0">
                                    Gimana cara nolak cowok yang maksa minta foto (PAP)? Latih keberanianmu di simulasi chat ini.
                                </p>
                            </div>
                            
                            <Link 
                                href="/education/simulation" 
                                className="bg-[#6B4F4F] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-teal-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap w-full md:w-auto"
                            >
                                Mulai Simulasi <ArrowRightIcon className="w-5 h-5"/>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* --- SECTION HEADER: ARTICLES --- */}
                <div className="flex items-center justify-between mb-8 md:mb-12 px-2 border-b border-[#6B4F4F]/10 pb-4">
                    <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-[#6B4F4F]">
                        <span className="w-1.5 h-6 md:w-2 md:h-8 bg-teal-500 rounded-full"></span>
                        Artikel Terbaru
                    </h3>
                    <Link href="#" className="text-xs md:text-sm font-bold text-teal-600 hover:underline">
                        Lihat Semua &rarr;
                    </Link>
                </div>

                {/* --- GRID ARTIKEL (LAYOUT REVISED: TEXT ONLY) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
                    {articles.map((article) => (
                        <Link 
                            key={article.slug} 
                            href={`/education/${article.slug}`} 
                            // LAYOUT FIX: Removed flex-row, added relative for decoration
                            className="group flex flex-col bg-white/60 backdrop-blur-lg rounded-[1.5rem] md:rounded-[2rem] border border-white/60 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden h-full relative"
                        >
                            {/* Konten: Full Width & Adjusted Padding */}
                            <div className="w-full p-6 md:p-8 flex flex-col justify-between h-full relative z-10">
                                {/* Decoration: Subtle gradient blob */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
                                
                                <div>
                                    <div className="mb-3 md:mb-4 flex flex-wrap gap-2">
                                        <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border ${article.color}`}>
                                            {article.category}
                                        </span>
                                    </div>
                                    <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-[#6B4F4F] group-hover:text-teal-700 transition-colors leading-snug">
                                        {article.title}
                                    </h3>
                                    <p className="text-[#6B4F4F]/70 text-xs md:text-sm leading-relaxed mb-6 font-light line-clamp-3">
                                        {article.snippet}
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-2 text-[#6B4F4F] font-bold text-xs md:text-sm tracking-wide group-hover:gap-4 transition-all mt-auto">
                                    <span className="group-hover:underline decoration-teal-500 decoration-2 underline-offset-4">BACA ARTIKEL</span>
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                        <ArrowLongRightIcon className="w-4 h-4"/>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                
            </div>
        </div>
    );
}