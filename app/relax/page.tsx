// app/relax/page.tsx

"use client";

import React, { useState } from 'react';
import { 
    SparklesIcon, MusicalNoteIcon, PuzzlePieceIcon, 
    FaceSmileIcon, CloudIcon, StarIcon, 
    FireIcon, Square3Stack3DIcon 
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { 
    BreathingGame, BubblePopGame, MemoryGame, 
    StressPopperGame, CloudThoughtsGame, GratitudeJarGame, 
    LanternGame, StoneStackingGame 
} from '../../components/MiniGames';

// Menu Item Component untuk mempersingkat kode
const MenuItem = ({ id, icon: Icon, title, subtitle, activeTab, setActiveTab, color }: any) => (
    <button 
        onClick={() => setActiveTab(id)}
        className={`p-3 md:p-4 rounded-2xl text-left transition-all flex items-center gap-3 md:gap-4 shadow-sm border w-full
            ${activeTab === id 
                ? `bg-${color}-600 text-white border-${color}-600` 
                : `bg-white border-white hover:border-${color}-100 hover:bg-${color}-50`}
        `}
    >
        <div className={`p-2 md:p-3 rounded-full shrink-0 ${activeTab === id ? `bg-${color}-500 text-white` : `bg-${color}-50 text-${color}-600`}`}>
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="min-w-0">
            <h3 className={`font-bold text-sm md:text-base truncate ${activeTab === id ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
            <p className={`text-[10px] md:text-xs truncate ${activeTab === id ? `text-${color}-100` : 'text-gray-400'}`}>{subtitle}</p>
        </div>
    </button>
);

export default function RelaxPage() {
    const [activeTab, setActiveTab] = useState('breathe');

    // Background color based on active tab
    const getBgColor = () => {
        switch(activeTab) {
            case 'breathe': return 'bg-teal-400';
            case 'bubble': return 'bg-orange-400';
            case 'memory': return 'bg-purple-400';
            case 'stress': return 'bg-rose-400';
            case 'cloud': return 'bg-sky-400';
            case 'jar': return 'bg-amber-400';
            case 'lantern': return 'bg-slate-600'; // Darker for night mode
            case 'stone': return 'bg-stone-400';
            default: return 'bg-teal-400';
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20">
             
             {/* --- BACKGROUND FX --- */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className={`absolute top-[-10%] left-[50%] w-[700px] h-[700px] rounded-full blur-[120px] animate-pulse opacity-20 transition-colors duration-1000 ${getBgColor()}`}></div>
                 <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-stone-200/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-6xl mx-auto px-5 md:px-8 pt-28 relative z-10">
                
                {/* --- HEADER --- */}
                <header className="text-center mb-10">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#6B4F4F]/60 hover:text-teal-600 mb-6 transition-colors py-2 px-4 rounded-full hover:bg-white/50 border border-transparent hover:border-teal-100">
                        <ArrowLeftIcon className="w-4 h-4"/> Kembali ke Dashboard
                    </Link>
                    
                    <h1 className="text-3xl md:text-5xl font-bold mb-3 text-[#6B4F4F]">
                        Ruang <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Tenang</span>
                    </h1>
                    <p className="text-sm md:text-lg opacity-70 max-w-xl mx-auto font-light">
                        Istirahatkan pikiran sejenak. Pilih aktivitas yang memanggil hatimu.
                    </p>
                </header>

                {/* --- MAIN LAYOUT --- */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    
                    {/* SIDEBAR MENU (Grid on Mobile, Sidebar on Desktop) */}
                    <div className="w-full lg:w-1/3">
                        <div className="grid grid-cols-2 gap-3 max-h-[400px] lg:max-h-none overflow-y-auto pr-1 custom-scrollbar">
                            <MenuItem id="breathe" icon={SparklesIcon} title="Bernapas" subtitle="Relaksasi 4-4-4" activeTab={activeTab} setActiveTab={setActiveTab} color="teal" />
                            <MenuItem id="bubble" icon={MusicalNoteIcon} title="Bubble Pop" subtitle="Pecahkan stres" activeTab={activeTab} setActiveTab={setActiveTab} color="orange" />
                            <MenuItem id="memory" icon={PuzzlePieceIcon} title="Fokus" subtitle="Memory match" activeTab={activeTab} setActiveTab={setActiveTab} color="purple" />
                            <MenuItem id="stress" icon={FaceSmileIcon} title="Hapus Emosi" subtitle="Ubah negatif" activeTab={activeTab} setActiveTab={setActiveTab} color="rose" />
                            
                            {/* NEW GAMES */}
                            <MenuItem id="cloud" icon={CloudIcon} title="Awan Pikiran" subtitle="Lepaskan beban" activeTab={activeTab} setActiveTab={setActiveTab} color="sky" />
                            <MenuItem id="jar" icon={StarIcon} title="The Jar" subtitle="Koleksi Emosi" activeTab={activeTab} setActiveTab={setActiveTab} color="amber" />
                            <MenuItem id="lantern" icon={FireIcon} title="Lentera" subtitle="Terbangkan harap" activeTab={activeTab} setActiveTab={setActiveTab} color="orange" />
                            <MenuItem id="stone" icon={Square3Stack3DIcon} title="Batu Zen" subtitle="Latih Fokus" activeTab={activeTab} setActiveTab={setActiveTab} color="stone" />
                        </div>
                    </div>

                    {/* GAME AREA */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 p-2 shadow-2xl relative overflow-hidden min-h-[500px] flex items-center justify-center transition-all duration-500">
                            
                            {/* Dynamic Inner Tint */}
                            <div className={`absolute inset-0 opacity-10 transition-colors duration-1000 pointer-events-none ${getBgColor()}`}></div>

                            <div className="relative z-10 w-full h-full bg-white/40 rounded-[2rem] p-4 md:p-8 flex items-center justify-center overflow-hidden">
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
                        
                        <p className="text-center text-xs text-[#6B4F4F]/40 mt-4">
                            *Semua aktivitas ini didesain untuk menurunkan kecemasan (anxiety) ringan.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}