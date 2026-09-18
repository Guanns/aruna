import React, { useState } from 'react';
import { 
    SparklesIcon, MusicalNoteIcon, PuzzlePieceIcon, 
    FaceSmileIcon, CloudIcon, StarIcon, 
    FireIcon, Square3Stack3DIcon, ArrowLeftIcon 
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { 
    BreathingGame, BubblePopGame, MemoryGame, 
    StressPopperGame, CloudThoughtsGame, GratitudeJarGame, 
    LanternGame, StoneStackingGame 
} from '../components/MiniGames';

type GameItem = {
    id: string;
    icon: React.ElementType;
    title: string;
    subtitle: string;
    iconColor: string;
    iconBg: string;
    activeCardBg: string;
    activeBorder: string;
    activePillBg: string;
};

const GAMES: GameItem[] = [
    { 
        id: 'breathe', 
        icon: SparklesIcon, 
        title: 'Bernafas', 
        subtitle: 'Pernapasan 4-4-4',
        iconColor: 'text-teal-600',
        iconBg: 'bg-teal-50',
        activeCardBg: 'bg-teal-50/70',
        activeBorder: 'border-teal-400 ring-2 ring-teal-200/50',
        activePillBg: 'bg-teal-100/80 border-teal-400',
    },
    { 
        id: 'bubble', 
        icon: MusicalNoteIcon, 
        title: 'Bubble Pop', 
        subtitle: 'Pecahkan stresmu',
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-50',
        activeCardBg: 'bg-amber-50/70',
        activeBorder: 'border-amber-400 ring-2 ring-amber-200/50',
        activePillBg: 'bg-amber-100/80 border-amber-400',
    },
    { 
        id: 'stone', 
        icon: Square3Stack3DIcon, 
        title: 'Batu Zen', 
        subtitle: 'Latihan fokus',
        iconColor: 'text-stone-700',
        iconBg: 'bg-stone-100',
        activeCardBg: 'bg-stone-100/80',
        activeBorder: 'border-stone-400 ring-2 ring-stone-200/50',
        activePillBg: 'bg-stone-200/80 border-stone-400',
    },
    { 
        id: 'jar', 
        icon: StarIcon, 
        title: 'The Jar', 
        subtitle: 'Koleksi rasa syukur',
        iconColor: 'text-yellow-600',
        iconBg: 'bg-yellow-50',
        activeCardBg: 'bg-yellow-50/70',
        activeBorder: 'border-yellow-400 ring-2 ring-yellow-200/50',
        activePillBg: 'bg-yellow-100/80 border-yellow-400',
    },
    { 
        id: 'cloud', 
        icon: CloudIcon, 
        title: 'The Cloud', 
        subtitle: 'Lepaskan bebanmu',
        iconColor: 'text-sky-600',
        iconBg: 'bg-sky-50',
        activeCardBg: 'bg-sky-50/70',
        activeBorder: 'border-sky-400 ring-2 ring-sky-200/50',
        activePillBg: 'bg-sky-100/80 border-sky-400',
    },
    { 
        id: 'lantern', 
        icon: FireIcon, 
        title: 'Lentera', 
        subtitle: 'Terbangkan harapanmu',
        iconColor: 'text-rose-600',
        iconBg: 'bg-rose-50',
        activeCardBg: 'bg-rose-50/70',
        activeBorder: 'border-rose-400 ring-2 ring-rose-200/50',
        activePillBg: 'bg-rose-100/80 border-rose-400',
    },
    { 
        id: 'memory', 
        icon: PuzzlePieceIcon, 
        title: 'Fokus', 
        subtitle: 'Memory match',
        iconColor: 'text-purple-600',
        iconBg: 'bg-purple-50',
        activeCardBg: 'bg-purple-50/70',
        activeBorder: 'border-purple-400 ring-2 ring-purple-200/50',
        activePillBg: 'bg-purple-100/80 border-purple-400',
    },
    { 
        id: 'stress', 
        icon: FaceSmileIcon, 
        title: 'Stress Popper', 
        subtitle: 'Ubah kata negatif',
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-50',
        activeCardBg: 'bg-emerald-50/70',
        activeBorder: 'border-emerald-400 ring-2 ring-emerald-200/50',
        activePillBg: 'bg-emerald-100/80 border-emerald-400',
    },
];

export default function RelaxPage() {
    const [activeTab, setActiveTab] = useState('breathe');
    const currentGame = GAMES.find(g => g.id === activeTab) || GAMES[0];

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-800 font-poppins pb-24 pt-24 md:pt-28 relative overflow-x-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                
                {/* Header Navigation & Title */}
                <div className="mb-6 md:mb-8">
                    <Link 
                        to="/dashboard" 
                        className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-semibold py-2 px-3.5 rounded-xl hover:bg-stone-100 transition-colors w-fit group mb-4 border border-stone-200/80 bg-white shadow-xs"
                    >
                        <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                        <span>Kembali ke Dashboard</span>
                    </Link>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
                        Ruang Healing
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1.5 leading-relaxed max-w-xl">
                        Istirahatkan pikiranmu sejenak. Pilih aktivitas santai yang paling nyaman untukmu hari ini.
                    </p>
                </div>

                {/* Mobile Horizontal Pills (< lg) */}
                <div className="lg:hidden mb-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                        {GAMES.map((game) => {
                            const isActive = activeTab === game.id;
                            const Icon = game.icon;
                            return (
                                <button
                                    key={game.id}
                                    type="button"
                                    onClick={() => setActiveTab(game.id)}
                                    className={`inline-flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer border ${
                                        isActive 
                                            ? `${game.activePillBg} text-stone-900 shadow-xs font-bold` 
                                            : 'bg-white text-stone-700 border-stone-200/80 hover:border-stone-300'
                                    }`}
                                >
                                    <Icon className={`w-4 h-4 ${game.iconColor}`} />
                                    <span className="text-stone-900">{game.title}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
                    
                    {/* 1. Main Game Canvas (2/3 width on desktop) */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-6 md:p-8 shadow-sm relative min-h-[540px] md:min-h-[580px] flex flex-col justify-between">
                            {/* Inner Canvas Top Bar */}
                            <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 rounded-xl ${currentGame.iconBg} ${currentGame.iconColor}`}>
                                        <currentGame.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-base sm:text-lg font-bold text-stone-900">
                                            {currentGame.title}
                                        </h2>
                                        <p className="text-xs text-stone-500">
                                            {currentGame.subtitle}
                                        </p>
                                    </div>
                                </div>
                                <span className="hidden sm:inline-flex text-[11px] font-semibold text-stone-500 bg-stone-50 border border-stone-200/70 py-1 px-3 rounded-full">
                                    Aktivitas Relaksasi
                                </span>
                            </div>

                            {/* Active Game Component */}
                            <div className="flex-1 flex items-center justify-center w-full my-auto">
                                {activeTab === 'breathe' && <BreathingGame />}
                                {activeTab === 'bubble' && <BubblePopGame />}
                                {activeTab === 'stone' && <StoneStackingGame />}
                                {activeTab === 'jar' && <GratitudeJarGame />}
                                {activeTab === 'cloud' && <CloudThoughtsGame />}
                                {activeTab === 'lantern' && <LanternGame />}
                                {activeTab === 'memory' && <MemoryGame />}
                                {activeTab === 'stress' && <StressPopperGame />}
                            </div>

                            {/* Footer hint */}
                            <div className="mt-4 pt-3 border-t border-stone-100 text-center">
                                <p className="text-[11px] text-stone-400">
                                    Aktivitas interaktif ini didesain untuk meredakan kecemasan dan stres ringan secara mandiri.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 2. Desktop Bento Sidebar Menu (1/3 width on desktop) */}
                    <div className="hidden lg:block lg:w-1/3">
                        <div className="mb-3 px-1">
                            <h2 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                                Pilihan Aktivitas
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            {GAMES.map((game) => {
                                const isActive = activeTab === game.id;
                                const Icon = game.icon;
                                return (
                                    <button
                                        key={game.id}
                                        type="button"
                                        onClick={() => setActiveTab(game.id)}
                                        className={`p-4 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between min-h-[115px] cursor-pointer group ${
                                            isActive 
                                                ? `${game.activeCardBg} ${game.activeBorder} shadow-sm` 
                                                : 'bg-white hover:bg-stone-50/80 border-stone-200/80 hover:border-stone-300'
                                        }`}
                                    >
                                        <div className={`p-2 rounded-xl w-fit mb-3 transition-colors ${game.iconBg} ${game.iconColor}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm tracking-tight text-stone-900">
                                                {game.title}
                                            </h3>
                                            <p className="text-[11px] font-medium text-stone-500 mt-0.5 leading-snug">
                                                {game.subtitle}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}