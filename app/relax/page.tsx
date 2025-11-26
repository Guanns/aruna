// app/relax/page.tsx
// VERSI FINAL: Bento Grid Menu & Precision Layout

"use client";

import React, { useState } from 'react';
import { 
    SparklesIcon, MusicalNoteIcon, PuzzlePieceIcon, 
    FaceSmileIcon, CloudIcon, StarIcon, 
    FireIcon, Square3Stack3DIcon, ArrowLeftIcon 
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { 
    BreathingGame, BubblePopGame, MemoryGame, 
    StressPopperGame, CloudThoughtsGame, GratitudeJarGame, 
    LanternGame, StoneStackingGame 
} from '../../components/MiniGames';

// Interface untuk Props BentoItem agar type-safe
type BentoItemProps = {
    id: string;
    icon: React.ElementType;
    title: string;
    subtitle: string;
    activeTab: string;
    setActiveTab: (id: string) => void;
    color: string;
};

// Component Menu Item Bento
const BentoItem = ({ id, icon: Icon, title, subtitle, activeTab, setActiveTab, color }: BentoItemProps) => {
    const isActive = activeTab === id;
    
    // Mapping warna dinamis
    const activeClasses = {
        teal: 'bg-teal-600 text-white border-teal-600 ring-teal-200',
        orange: 'bg-orange-500 text-white border-orange-500 ring-orange-200',
        purple: 'bg-purple-600 text-white border-purple-600 ring-purple-200',
        rose: 'bg-rose-500 text-white border-rose-500 ring-rose-200',
        sky: 'bg-sky-500 text-white border-sky-500 ring-sky-200',
        amber: 'bg-amber-500 text-white border-amber-500 ring-amber-200',
        slate: 'bg-slate-700 text-white border-slate-700 ring-slate-200',
        stone: 'bg-stone-600 text-white border-stone-600 ring-stone-200',
    }[color] || 'bg-gray-500 text-white';

    const inactiveClasses = `bg-white hover:bg-${color}-50 border-white hover:border-${color}-200 text-gray-600`;

    return (
        <button 
            onClick={() => setActiveTab(id)}
            className={`relative p-4 rounded-2xl text-left transition-all duration-300 border-2 shadow-sm flex flex-col justify-between min-h-[100px] group
                ${isActive ? `${activeClasses} scale-[1.02] ring-4 ring-opacity-30 shadow-lg` : `${inactiveClasses} hover:-translate-y-1`}
            `}
        >
            <div className={`p-2.5 rounded-xl w-fit mb-2 transition-colors
                ${isActive ? 'bg-white/20' : `bg-${color}-100 text-${color}-600`}
            `}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className={`font-bold text-sm md:text-base ${isActive ? 'text-white' : 'text-gray-800'}`}>
                    {title}
                </h3>
                <p className={`text-[10px] md:text-xs font-medium mt-0.5 ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                    {subtitle}
                </p>
            </div>
        </button>
    );
};

export default function RelaxPage() {
    const [activeTab, setActiveTab] = useState('breathe');

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20 selection:bg-teal-200">
             
             {/* --- BACKGROUND FX --- */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className="absolute top-[-10%] left-[50%] w-[700px] h-[700px] bg-teal-300/20 rounded-full blur-[120px] animate-pulse"></div>
                 <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-rose-300/20 rounded-full blur-[100px]"></div>
                 <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
            </div>

            <div className="max-w-6xl mx-auto px-5 md:px-8 pt-28 relative z-10">
                
                {/* --- HEADER --- */}
                <header className="text-center mb-10">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#6B4F4F]/60 hover:text-teal-600 mb-6 transition-colors py-2 px-4 rounded-full hover:bg-white/50 border border-transparent hover:border-teal-100">
                        <ArrowLeftIcon className="w-4 h-4"/> Kembali ke Dashboard
                    </Link>
                    
                    <h1 className="text-3xl md:text-5xl font-bold mb-3 text-[#6B4F4F] tracking-tight">
                        Ruang <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Healing</span>
                    </h1>
                    <p className="text-sm md:text-base opacity-70 max-w-xl mx-auto font-light leading-relaxed">
                        Istirahatkan pikiranmu sejenak yuk. Pilih metode healing-mu hari ini!
                    </p>
                </header>

                {/* --- LAYOUT GRID --- */}
                <div className="flex flex-col-reverse lg:flex-row gap-8">
                    
                    {/* 1. GAME AREA (Utama) */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white/60 p-2 shadow-2xl relative overflow-hidden min-h-[600px] flex items-center justify-center transition-all duration-500 ring-1 ring-white/50">
                            
                            {/* Inner Container */}
                            <div className="relative z-10 w-full h-full bg-white/50 rounded-[2.5rem] p-6 md:p-10 flex items-center justify-center overflow-hidden border border-white/40">
                                {activeTab === 'breathe' && <BreathingGame />}
                                {activeTab === 'bubble' && <BubblePopGame />}
                                {activeTab === 'memory' && <MemoryGame />}
                                {activeTab === 'stress' && <StressPopperGame />}
                                {activeTab === 'cloud' && <CloudThoughtsGame />}
                                {activeTab === 'jar' && <GratitudeJarGame />}
                                {activeTab === 'lantern' && <LanternGame />}
                                {activeTab === 'stone' && <StoneStackingGame />}
                            </div>

                        </div>
                        <p className="text-center text-[10px] text-[#6B4F4F]/40 mt-4 font-medium uppercase tracking-widest">
                            *Setiap aktivitas didesain untuk meredakan kecemasan ringan.
                        </p>
                    </div>

                    {/* 2. MENU BENTO GRID (Pilihan) */}
                    <div className="w-full lg:w-1/3">
                        <h3 className="text-lg font-bold text-[#6B4F4F] mb-4 px-2 flex items-center gap-2">
                            <SparklesIcon className="w-5 h-5 text-teal-500" /> 
                            Pilih Aktivitas
                        </h3>
                        
                        {/* Grid: 2 Kolom di HP, 2 Kolom di PC (karena sidebar kecil) */}
                        <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar pb-4">
                            <BentoItem id="breathe" icon={SparklesIcon} title="Bernafas" subtitle="pernapasan 4-4-4" activeTab={activeTab} setActiveTab={setActiveTab} color="teal" />
                            <BentoItem id="bubble" icon={MusicalNoteIcon} title="Bubble Pop" subtitle="Pecahkan stresmu" activeTab={activeTab} setActiveTab={setActiveTab} color="orange" />
                            <BentoItem id="stone" icon={Square3Stack3DIcon} title="Batu Zen" subtitle="Latihan fokus yuk" activeTab={activeTab} setActiveTab={setActiveTab} color="stone" />
                            <BentoItem id="jar" icon={StarIcon} title="The Jar" subtitle="Koleksi emosimu" activeTab={activeTab} setActiveTab={setActiveTab} color="amber" />
                            <BentoItem id="cloud" icon={CloudIcon} title="The Cloud" subtitle="Lepaskan semua bebanmu" activeTab={activeTab} setActiveTab={setActiveTab} color="sky" />
                            <BentoItem id="lantern" icon={FireIcon} title="Lentera" subtitle="Terbangkan harapanmu" activeTab={activeTab} setActiveTab={setActiveTab} color="slate" />
                            <BentoItem id="memory" icon={PuzzlePieceIcon} title="Fokus" subtitle="Memory match" activeTab={activeTab} setActiveTab={setActiveTab} color="purple" />
                            <BentoItem id="stress" icon={FaceSmileIcon} title="Destroy the bad thing" subtitle="Ubah hal negatif" activeTab={activeTab} setActiveTab={setActiveTab} color="rose" />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}