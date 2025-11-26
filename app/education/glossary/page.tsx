// app/education/glossary/page.tsx
// VERSI FIX: Padding Top Ditambah (pt-32) biar aman dari Navbar

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import GlossaryFeature from '../../../components/GlossaryFeature';

export default function GlossaryPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20">
             
             {/* --- BACKGROUND FX --- */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className="absolute top-[-10%] right-[20%] w-[600px] h-[600px] bg-purple-300/10 rounded-full blur-[100px]"></div>
                 <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-300/10 rounded-full blur-[100px]"></div>
                 <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
            </div>

            {/* PERBAIKAN DI SINI: pt-10 diubah jadi pt-32 */}
            <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
                
                {/* --- NAVIGATION HEADER --- */}
                <nav className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <Link 
                        href="/education" 
                        className="group flex items-center gap-3 text-[#6B4F4F]/60 hover:text-indigo-600 transition-all px-5 py-2.5 rounded-full bg-white/40 hover:bg-white border border-transparent hover:border-indigo-200 shadow-sm hover:shadow-md backdrop-blur-sm"
                    >
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform text-indigo-500">
                             <ArrowLeftIcon className="w-4 h-4"/>
                        </div>
                        <span className="font-bold text-sm tracking-wide">Kembali</span>
                    </Link>
                    
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-50 to-white border border-purple-200 shadow-sm">
                        <BookOpenIcon className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-bold text-purple-700 uppercase tracking-widest">Aruna Dictionary</span>
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block w-[120px]"></div>
                </nav>
                
                {/* --- MAIN CONTENT (Glass Card) --- */}
                <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 p-8 md:p-16 shadow-2xl relative overflow-hidden">
                     <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#6B4F4F]">
                            Kamus Bahasa <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Gen Z</span>
                        </h1>
                        <p className="text-lg opacity-70 max-w-2xl mx-auto font-light leading-relaxed">
                            Jangan sampai <i>FOMO</i>! Pelajari istilah-istilah kekinian dan psikologi hubungan biar kamu makin paham situasi dan nggak akan salah langkah.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <GlossaryFeature />
                    </div>
                </div>
            </div>
        </div>
    );
}