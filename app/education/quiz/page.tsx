// app/education/quiz/page.tsx
// VERSI FIX: Padding Top Ditambah (pt-32) biar gak ketabrak Navbar

import React from 'react';
import RedFlagQuiz from '../../../components/RedFlagQuiz';
import Link from 'next/link';
import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/solid';

export default function QuizPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20">
             
             {/* --- BACKGROUND FX --- */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-[120px] animate-pulse"></div>
                 <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-orange-300/10 rounded-full blur-[80px]"></div>
                 <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
            </div>

            {/* PERBAIKAN DI SINI: pt-10 diubah jadi pt-32 */}
            <div className="max-w-5xl mx-auto px-6 pt-32 relative z-10">
                
                {/* --- NAVIGATION HEADER --- */}
                <nav className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <Link 
                        href="/education" 
                        className="group flex items-center gap-3 text-[#6B4F4F]/60 hover:text-[#c43c27] transition-all px-5 py-2.5 rounded-full bg-white/40 hover:bg-white border border-transparent hover:border-[#c43c27]/10 shadow-sm hover:shadow-md backdrop-blur-sm"
                    >
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform text-[#c43c27]">
                             <ArrowLeftIcon className="w-4 h-4"/>
                        </div>
                        <span className="font-bold text-sm tracking-wide">Kembali</span>
                    </Link>

                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-rose-50 to-white border border-rose-200 shadow-sm">
                        <SparklesIcon className="w-4 h-4 text-rose-500" />
                        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Interactive Check</span>
                    </div>
                    
                    {/* Spacer */}
                    <div className="hidden md:block w-[120px]"></div>
                </nav>

                {/* --- MAIN CONTENT (Glass Card) --- */}
                <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 p-8 md:p-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#6B4F4F]">
                            Sehatkah <span className="font-serif italic text-rose-500">Hubunganmu?</span>
                        </h1>
                        <p className="text-lg opacity-70 font-light leading-relaxed">
                            Kadang tanda bahaya (*red flags*) tersamarkan oleh rasa sayang. Jawab pertanyaan singkat ini untuk melihat pola hubunganmu lebih jelas.
                            <br/><span className="text-sm font-bold text-rose-500 mt-2 block">*Tenang, jawabanmu tidak kami simpan.*</span>
                        </p>
                    </div>

                    <div className="relative z-10">
                        <RedFlagQuiz />
                    </div>
                </div>

            </div>
        </div>
    );
}