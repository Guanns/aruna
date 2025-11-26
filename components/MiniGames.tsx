// components/MiniGames.tsx
// VERSI FINAL v3.0: Jar Redesign (No Tooltip), Balanced Stone Logic, Fixed Clouds
// Total Lines: ~650+

"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { ArrowPathIcon, PaperAirplaneIcon, StarIcon, FireIcon } from '@heroicons/react/24/solid';

// --- INJECTED GLOBAL STYLES (ANIMATION ENGINE) ---
const GLOBAL_STYLES = `
  @keyframes floatUpSmooth {
    0% { transform: translateY(100px) scale(0.8); opacity: 0; }
    10% { opacity: 1; }
    100% { transform: translateY(-600px) scale(1.1); opacity: 0; }
  }
  @keyframes floatLantern {
    0% { transform: translateY(0) scale(0.8); opacity: 0; }
    20% { opacity: 1; transform: translateY(-50px) scale(1); }
    100% { transform: translateY(-500px) scale(0.5); opacity: 0; }
  }
  @keyframes bounceIn {
    0% { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); }
  }
  @keyframes fadeUpOut {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-20px); }
  }
  .animate-float-up-smooth { animation: floatUpSmooth 12s linear forwards; }
  .animate-float-lantern { animation: floatLantern 15s ease-in forwards; }
  .animate-bounce-in { animation: bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
  .animate-fade-up-out { animation: fadeUpOut 2s ease-out forwards; }
`;

// --- HELPER: SMART EMOJI DETECTOR ---
const getEmojiBySentiment = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.match(/(marah|kesal|benci|sebal|emosi|gila|anjing|bangsat|parah|tolol)/)) return '😡';
    if (lower.match(/(sedih|nangis|kecewa|sakit|luka|hancur|broken|galau|cry|lelah)/)) return '😢';
    if (lower.match(/(takut|cemas|degdegan|panik|anxiety|overthinking|ovt|takut)/)) return '😰';
    if (lower.match(/(capek|pusing|stress|burnout|muak|lemes|tumbang|bingung)/)) return '🤯';
    if (lower.match(/(senang|bahagia|syukur|alhamdulillah|happy|cinta|sayang|love|suka)/)) return '🥰';
    if (lower.match(/(semangat|bisa|kuat|hebat|keren|mantap|gas)/)) return '🔥';
    if (lower.match(/(tenang|damai|santai|relax|chill|adem)/)) return '🌿';
    return '⭐'; 
};

// ============================================================================
// GAME 1: BREATHING LIGHT
// ============================================================================
export function BreathingGame() {
    const [phase, setPhase] = useState('Inhale');
    const [scale, setScale] = useState(1);
    const [text, setText] = useState('Tarik Napas...');

    useEffect(() => {
        const breathe = () => {
            setPhase('Inhale'); setText('Tarik Napas...'); setScale(1.5);
            setTimeout(() => {
                setPhase('Hold'); setText('Tahan...');
                setTimeout(() => {
                    setPhase('Exhale'); setText('Hembuskan...'); setScale(1);
                }, 4000);
            }, 4000);
        };
        breathe();
        const interval = setInterval(breathe, 12000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center py-10 w-full">
            <div className="relative flex items-center justify-center w-64 h-64">
                <div className="absolute bg-teal-400 rounded-full opacity-30 blur-3xl transition-all duration-[4000ms] ease-in-out" style={{ transform: `scale(${scale})` }}></div>
                <div className="absolute w-40 h-40 bg-gradient-to-br from-teal-300 to-cyan-300 rounded-full shadow-lg flex items-center justify-center transition-all duration-[4000ms] ease-in-out z-10" style={{ transform: `scale(${scale})` }}>
                    <span className="text-white font-bold text-lg animate-pulse">
                        {phase === 'Inhale' ? '🌬️' : phase === 'Hold' ? '😐' : '😌'}
                    </span>
                </div>
                <div className={`absolute border-2 border-teal-100 rounded-full w-64 h-64 transition-all duration-[4000ms] ${phase === 'Inhale' ? 'scale-110 opacity-100' : 'scale-90 opacity-50'}`}></div>
            </div>
            <h3 className="text-2xl font-bold text-[#6B4F4F] mt-8 transition-opacity duration-500">{text}</h3>
        </div>
    );
}

// ============================================================================
// GAME 2: BUBBLE POP
// ============================================================================
export function BubblePopGame() {
    const [bubbles, setBubbles] = useState(Array(25).fill(false));
    const [score, setScore] = useState(0);

    const popBubble = (index: number) => {
        if (!bubbles[index]) {
            const newBubbles = [...bubbles];
            newBubbles[index] = true;
            setBubbles(newBubbles);
            setScore(s => s + 1);
            if (navigator.vibrate) navigator.vibrate(50);
        }
    };

    const resetGame = () => {
        setBubbles(Array(25).fill(false));
        setScore(0);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="mb-6 flex justify-between w-full max-w-xs items-center">
                <div className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-bold">Pop: {score}</div>
                <button onClick={resetGame} className="text-[#6B4F4F] hover:text-orange-500 transition-colors p-2 bg-white rounded-full shadow-sm">
                    <ArrowPathIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="grid grid-cols-5 gap-3 bg-stone-100 p-4 rounded-2xl shadow-inner">
                {bubbles.map((isPopped, idx) => (
                    <button
                        key={idx}
                        onClick={() => popBubble(idx)}
                        className={`w-12 h-12 rounded-full shadow-sm transition-all duration-200 transform active:scale-90 flex items-center justify-center
                            ${isPopped ? 'bg-stone-200 shadow-inner scale-95' : 'bg-gradient-to-br from-orange-300 to-rose-300 hover:brightness-110 shadow-md cursor-pointer'}
                        `}
                    >
                        {isPopped && <span className="text-stone-400 text-xs">pop!</span>}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// GAME 3: MEMORY MATCH
// ============================================================================
const CARD_EMOJIS = ['🌸', '🌊', '🌿', '☀️', '🦋', '🌙', '🍄', '🌵']; 
export function MemoryGame() {
    const [cards, setCards] = useState<{id: number, emoji: string, isFlipped: boolean, isMatched: boolean}[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [isWon, setIsWon] = useState(false);

    useEffect(() => { resetGame(); }, []);

    const resetGame = () => {
        const shuffled = [...CARD_EMOJIS, ...CARD_EMOJIS].sort(() => Math.random() - 0.5).map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));
        setCards(shuffled); setFlippedCards([]); setMoves(0); setIsWon(false);
    };

    const handleCardClick = (index: number) => {
        if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;
        const newCards = [...cards]; newCards[index].isFlipped = true; setCards(newCards);
        const newFlipped = [...flippedCards, index]; setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            const [i1, i2] = newFlipped;
            if (newCards[i1].emoji === newCards[i2].emoji) {
                newCards[i1].isMatched = true; newCards[i2].isMatched = true; setCards(newCards); setFlippedCards([]);
                if (newCards.every(c => c.isMatched)) setIsWon(true);
            } else {
                setTimeout(() => {
                    const resetCards = [...cards]; resetCards[i1].isFlipped = false; resetCards[i2].isFlipped = false;
                    setCards(resetCards); setFlippedCards([]);
                }, 1000);
            }
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="mb-6 flex justify-between w-full max-w-xs items-center">
                <div className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-bold">Langkah: {moves}</div>
                <button onClick={resetGame} className="text-[#6B4F4F] hover:text-purple-500 transition-colors p-2 bg-white rounded-full shadow-sm"><ArrowPathIcon className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-4 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                {cards.map((card, index) => (
                    <button key={index} onClick={() => handleCardClick(index)} className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-2xl transition-all duration-500 transform ${card.isFlipped || card.isMatched ? 'bg-white shadow-inner rotate-0' : 'bg-gradient-to-br from-purple-400 to-indigo-400 shadow-md rotate-180 text-transparent'}`} disabled={isWon}>
                        {(card.isFlipped || card.isMatched) ? card.emoji : '?'}
                    </button>
                ))}
            </div>
            {isWon && <div className="mt-6 animate-bounce font-bold text-purple-600">🎉 Hebat! Fokusmu luar biasa!</div>}
        </div>
    );
}

// ============================================================================
// GAME 4: STRESS POPPER
// ============================================================================
const NEGATIVE_WORDS = ['Cemas', 'Takut', 'Ragu', 'Lelah', 'Stres', 'Marah', 'Sedih', 'Gelisah'];
const POSITIVE_WORDS = ['Tenang', 'Berani', 'Yakin', 'Kuat', 'Damai', 'Sabar', 'Senyum', 'Nyaman'];
type FloatingWord = { id: number; text: string; x: number; y: number; isPopped: boolean; positiveText?: string; };

export function StressPopperGame() {
    const [words, setWords] = useState<FloatingWord[]>([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (words.length < 5) {
                const id = Date.now();
                setWords(prev => [...prev, { id, text: NEGATIVE_WORDS[Math.floor(Math.random() * NEGATIVE_WORDS.length)], x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, isPopped: false }]);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [words]);

    const handlePop = (id: number) => {
        setWords(prev => prev.map(w => w.id === id ? { ...w, isPopped: true, positiveText: POSITIVE_WORDS[Math.floor(Math.random() * POSITIVE_WORDS.length)] } : w));
        setCount(c => c + 1);
        setTimeout(() => { setWords(prev => prev.filter(w => w.id !== id)); }, 1000);
    };

    return (
        <div className="flex flex-col items-center w-full h-[400px] relative">
            <div className="absolute top-0 left-0 z-10 bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-sm font-bold">Ubah Emosi: {count}</div>
            <div className="w-full h-full bg-stone-50/50 rounded-3xl border-2 border-dashed border-stone-200 relative overflow-hidden mt-4">
                {words.map((w) => (
                    <button key={w.id} onClick={() => !w.isPopped && handlePop(w.id)} className={`absolute px-4 py-2 rounded-full font-bold shadow-md transition-all duration-500 transform ${w.isPopped ? 'bg-green-100 text-green-600 scale-110 opacity-0 -translate-y-10' : 'bg-white text-rose-500 hover:bg-rose-50 hover:scale-105 animate-float'}`} style={{ left: `${w.x}%`, top: `${w.y}%` }} disabled={w.isPopped}>
                        {w.isPopped ? w.positiveText : w.text}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// GAME 5: CLOUD THOUGHTS (Awan Pikiran)
// FIX: Key unik & Overflow Hidden
// ============================================================================
type Cloud = { id: string; text: string; x: number; };

const CloudItem = memo(({ text, x }: { text: string, x: number }) => (
    <div 
        className="absolute bottom-[-120px] animate-float-up-smooth flex flex-col items-center justify-center pointer-events-none"
        style={{ left: `${x}%`, zIndex: 10 }}
    >
        <div className="relative w-40 h-28">
            <svg viewBox="0 0 24 24" fill="white" className="w-full h-full drop-shadow-md text-white opacity-90">
                <path d="M18.42 9.24c-.2-.01-.4-.01-.6.01-.95-3.6-4.22-6.25-8.07-6.25-4.32 0-7.9 3.19-8.67 7.36C.47 10.81 0 11.6 0 12.45 0 15.77 2.69 18.46 6 18.46h12.5c3.04 0 5.5-2.46 5.5-5.5 0-2.86-2.18-5.21-4.96-5.46-.04-.13-.08-.25-.12-.37z"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center p-6 pt-8">
                <span className="text-[10px] md:text-xs font-bold text-slate-600 text-center leading-tight break-words w-full line-clamp-2 overflow-hidden">
                    {text}
                </span>
            </div>
        </div>
    </div>
));
CloudItem.displayName = 'CloudItem';

export function CloudThoughtsGame() {
    const [thought, setThought] = useState('');
    const [clouds, setClouds] = useState<Cloud[]>([]);

    const addCloud = () => {
        if (!thought.trim()) return;
        const newId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const newCloud = { id: newId, text: thought, x: Math.random() * 60 + 10 };
        
        setClouds(prev => [...prev, newCloud]);
        setThought('');
        
        setTimeout(() => {
            setClouds(prev => prev.filter(c => c.id !== newId));
        }, 12000);
    };

    return (
        <div className="flex flex-col items-center w-full h-[500px] relative overflow-hidden bg-gradient-to-b from-sky-300 to-sky-50 rounded-[2rem] border-4 border-white shadow-inner">
            <style>{GLOBAL_STYLES}</style>
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden">
                {clouds.map(cloud => <CloudItem key={cloud.id} text={cloud.text} x={cloud.x} />)}
            </div>
            <div className="absolute bottom-6 w-full px-6 z-30">
                <div className="bg-white/95 backdrop-blur-md p-2 rounded-full shadow-xl flex gap-2 ring-2 ring-sky-100">
                    <input 
                        type="text" value={thought} onChange={(e) => setThought(e.target.value)}
                        placeholder="Ketik beban pikiranmu..." 
                        className="flex-1 bg-transparent px-4 outline-none text-sm text-gray-600 placeholder:text-gray-400"
                        onKeyDown={(e) => e.key === 'Enter' && addCloud()}
                        maxLength={40}
                    />
                    <button onClick={addCloud} className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition-all hover:scale-110 shadow-md">
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-[10px] text-center text-sky-700/60 mt-2 font-medium">Tulis bebanmu, lalu biarkan ia terbang hilang.</p>
            </div>
        </div>
    );
}

// ============================================================================
// GAME 6: GRATITUDE JAR (Toples Syukur)
// REVISI: No Tooltip, Floating Toast Notification, Clean Visuals
// ============================================================================
type Star = { id: number; x: number; y: number; rotation: number; emoji: string };

export function GratitudeJarGame() {
    const [text, setText] = useState('');
    const [stars, setStars] = useState<Star[]>([]);
    const [toastMsg, setToastMsg] = useState<string | null>(null);

    const addStar = () => {
        if (!text.trim()) return;
        const emoji = getEmojiBySentiment(text);
        const newStar: Star = {
            id: Date.now(),
            x: Math.random() * 70 + 10, 
            y: 10 + Math.min(stars.length * 3, 85), 
            rotation: Math.random() * 360,
            emoji: emoji
        };
        setStars(prev => [...prev, newStar]);
        
        // Tampilkan pesan sejenak (Toast) lalu hilangkan
        setToastMsg(`"${text}" tersimpan.`);
        setTimeout(() => setToastMsg(null), 3000);
        
        setText('');
    };

    return (
        <div className="flex flex-col items-center w-full relative">
            <style>{GLOBAL_STYLES}</style>
            
            {/* Floating Toast (Pengganti Tooltip) */}
            {toastMsg && (
                <div className="absolute top-10 z-50 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-amber-200 animate-fade-up-out">
                    <p className="text-xs font-bold text-amber-600">{toastMsg}</p>
                </div>
            )}

            <div className="relative w-64 h-80 mb-6 group">
                {/* Jar Glass */}
                <div className="absolute inset-0 border-4 border-white/60 bg-gradient-to-b from-white/5 to-white/20 backdrop-blur-[2px] rounded-b-[4rem] rounded-t-2xl border-t-0 shadow-xl overflow-hidden z-10">
                    {/* Reflection */}
                    <div className="absolute top-4 left-4 w-3 h-40 bg-white/20 rounded-full blur-sm"></div>
                    {/* Stars */}
                    {stars.map(star => (
                        <div 
                            key={star.id}
                            className="absolute text-4xl transition-all duration-500 hover:scale-125 z-20 animate-bounce-in"
                            style={{ left: `${star.x}%`, bottom: `${star.y}%`, transform: `rotate(${star.rotation}deg)` }}
                        >
                            {star.emoji}
                        </div>
                    ))}
                </div>
                <div className="absolute -top-4 left-[-2%] w-[104%] h-6 bg-[#E0C097] rounded-lg shadow-md z-20 border-b-4 border-[#C8A070]"></div>
            </div>

            <div className="w-full max-w-sm space-y-3 relative z-30">
                <input 
                    type="text" value={text} onChange={(e) => setText(e.target.value)}
                    placeholder="Hari ini aku bersyukur karena..." 
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-100 text-sm text-gray-600 shadow-sm"
                    onKeyDown={(e) => e.key === 'Enter' && addStar()}
                />
                <button onClick={addStar} className="w-full bg-amber-400 text-white font-bold py-3 rounded-2xl hover:bg-amber-500 transition-all shadow-lg active:scale-95 flex justify-center items-center gap-2">
                    Simpan Kenangan <StarIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
}

// ============================================================================
// GAME 7: FLOATING LANTERNS (Lentera)
// FIX: Overflow Hidden (No text bleed)
// ============================================================================
type Lantern = { id: number; text: string; left: number; };

export function LanternGame() {
    const [wish, setWish] = useState('');
    const [lanterns, setLanterns] = useState<Lantern[]>([]);

    const releaseLantern = () => {
        if (!wish.trim()) return;
        const newId = Date.now();
        setLanterns(prev => [...prev, { id: newId, text: wish, left: Math.random() * 70 + 15 }]);
        setWish('');
        setTimeout(() => { setLanterns(prev => prev.filter(l => l.id !== newId)); }, 15000);
    };

    return (
        <div className="flex flex-col items-center w-full h-[500px] relative bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 shadow-2xl">
            <style>{GLOBAL_STYLES}</style>
            <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {lanterns.map(l => (
                    <div key={l.id} className="absolute bottom-[-100px] animate-float-lantern flex flex-col items-center" style={{ left: `${l.left}%` }}>
                        <div className="relative text-6xl filter drop-shadow-[0_0_25px_rgba(255,140,0,0.6)] animate-pulse">🏮</div>
                        <span className="mt-2 text-[9px] text-amber-100 bg-black/60 px-2 py-1 rounded border border-white/10 backdrop-blur-sm max-w-[120px] truncate">
                            {l.text}
                        </span>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-6 w-full px-6 z-30">
                <div className="flex gap-2 bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg">
                    <input 
                        type="text" value={wish} onChange={(e) => setWish(e.target.value)}
                        placeholder="Kirim harapanmu..." 
                        className="flex-1 bg-transparent px-4 py-2 text-white placeholder:text-white/40 focus:outline-none text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && releaseLantern()}
                    />
                    <button onClick={releaseLantern} className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-xl font-bold transition-colors shadow-md flex items-center gap-2">
                        <FireIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// GAME 8: STONE STACKING (Batu Zen)
// FIX: Difficulty Menu & Minimum Size Limit (Not Impossible)
// ============================================================================
type Stone = { id: number; width: number; x: number; color: string; placed: boolean };
type Difficulty = 'EASY' | 'NORMAL' | 'HARD' | null;

export function StoneStackingGame() {
    const [difficulty, setDifficulty] = useState<Difficulty>(null);
    const [stack, setStack] = useState<Stone[]>([]);
    const [currentStoneX, setCurrentStoneX] = useState(50);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    
    const requestRef = useRef<number | null>(null);
    const directionRef = useRef(1);
    const speedRef = useRef(1);
    const baseWidthRef = useRef(100); 

    const startGame = (mode: 'EASY' | 'NORMAL' | 'HARD') => {
        setDifficulty(mode);
        let baseWidth = 100;
        let initialSpeed = 0.5;

        if (mode === 'EASY') { baseWidth = 120; initialSpeed = 0.5; }
        if (mode === 'NORMAL') { baseWidth = 90; initialSpeed = 1.0; }
        if (mode === 'HARD') { baseWidth = 70; initialSpeed = 1.5; }

        baseWidthRef.current = baseWidth;
        speedRef.current = initialSpeed;
        
        setStack([{ id: 0, width: baseWidth, x: 50, color: 'bg-stone-800', placed: true }]);
        setCurrentStoneX(50);
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
    };

    const animate = useCallback(() => {
        if (!isPlaying || gameOver) return;
        setCurrentStoneX(prev => {
            let next = prev + (speedRef.current * directionRef.current);
            if (next > 90 || next < 10) {
                directionRef.current *= -1;
                next = prev;
            }
            return next;
        });
        requestRef.current = requestAnimationFrame(animate);
    }, [isPlaying, gameOver]);

    useEffect(() => {
        if (isPlaying && !gameOver) requestRef.current = requestAnimationFrame(animate);
        return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
    }, [isPlaying, gameOver, animate]);

    const placeStone = () => {
        if (gameOver) { setDifficulty(null); return; } 
        
        const topStone = stack[stack.length - 1];
        const diff = Math.abs(currentStoneX - topStone.x);
        const tolerance = (topStone.width / 2) + 5; 

        if (diff > tolerance) {
            setGameOver(true); setIsPlaying(false);
            if (navigator.vibrate) navigator.vibrate(300);
        } else {
            // FIX: Batas Minimum Lebar Batu agar tidak IMPOSSIBLE
            // Easy: min 30px, Normal: min 25px, Hard: min 20px
            const minWidth = difficulty === 'EASY' ? 30 : difficulty === 'NORMAL' ? 25 : 20;
            const shrinkAmount = difficulty === 'HARD' ? 5 : 3;
            
            const calculatedWidth = topStone.width - shrinkAmount;
            const newWidth = Math.max(minWidth, calculatedWidth); // Paksa berhenti mengecil di batas minimum
            
            setStack(p => [...p, { 
                id: Date.now(), 
                width: newWidth, 
                x: currentStoneX, 
                color: ['bg-stone-400', 'bg-stone-500', 'bg-stone-600', 'bg-zinc-500'][score % 4], 
                placed: true 
            }]);
            setScore(s => s + 1);
            speedRef.current += 0.05; 
            if (navigator.vibrate) navigator.vibrate(50);
        }
    };

    // MENU SCREEN
    if (!difficulty) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-[500px] bg-stone-100 rounded-[2rem] border-4 border-stone-200 shadow-inner gap-6 p-8">
                <h3 className="text-2xl font-bold text-stone-600">Pilih Tantangan Batu</h3>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <button onClick={() => startGame('EASY')} className="py-4 bg-green-100 text-green-700 font-bold rounded-xl hover:bg-green-200 transition-all border border-green-200 shadow-sm">
                        EASY (Batu Besar, Lambat)
                    </button>
                    <button onClick={() => startGame('NORMAL')} className="py-4 bg-blue-100 text-blue-700 font-bold rounded-xl hover:bg-blue-200 transition-all border border-blue-200 shadow-sm">
                        NORMAL (Sedang)
                    </button>
                    <button onClick={() => startGame('HARD')} className="py-4 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-all border border-red-200 shadow-sm">
                        HARD (Batu Kecil, Cepat!)
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="flex flex-col items-center justify-end w-full h-[500px] bg-gradient-to-b from-stone-100 to-stone-300 rounded-[2rem] relative cursor-pointer overflow-hidden border-4 border-stone-200 shadow-inner select-none"
            onClick={placeStone}
        >
            <style>{GLOBAL_STYLES}</style>
            <div className="absolute top-6 text-center z-20 w-full pointer-events-none">
                <h3 className={`font-bold text-4xl transition-colors duration-300 ${gameOver ? 'text-red-500 animate-bounce' : 'text-stone-600'}`}>
                    {gameOver ? "YAH JATUH!" : score}
                </h3>
                <p className="text-xs text-stone-500 mt-2 font-bold tracking-widest uppercase bg-white/50 px-3 py-1 rounded-full inline-block">
                    {gameOver ? "Ketuk untuk Menu Utama" : `${difficulty} MODE`}
                </p>
            </div>

            {!gameOver && (
                <div 
                    className="absolute bg-stone-500 shadow-2xl rounded-lg transition-none z-30"
                    style={{
                        width: `${stack[stack.length - 1]?.width || baseWidthRef.current}px`,
                        height: '35px',
                        left: `${currentStoneX}%`,
                        transform: 'translateX(-50%)',
                        top: '120px'
                    }}
                >
                    <div className="w-full h-full bg-white/20 rounded-t-lg"></div>
                </div>
            )}

            <div 
                className="w-full h-full flex flex-col-reverse items-center pb-10 relative transition-transform duration-500"
                style={{ transform: `translateY(${Math.min(stack.length * 25, 250)}px)` }}
            >
                {stack.map((stone, i) => (
                    <div
                        key={stone.id}
                        className={`${stone.color} shadow-lg rounded-sm transition-all duration-300 border-b-2 border-black/10`}
                        style={{
                            width: `${stone.width}px`, 
                            height: '40px',
                            marginBottom: '-5px',
                            transform: `translateX(${stone.x - 50}%)`, 
                            zIndex: i
                        }}
                    />
                ))}
            </div>
        </div>
    );
}