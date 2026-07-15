import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/MiniGames.tsx
// VERSI FINAL v3.0: Jar Redesign (No Tooltip), Balanced Stone Logic, Fixed Clouds
// Total Lines: ~650+
import { useState, useEffect, useRef, useCallback, memo } from 'react';
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
  @keyframes stoneDrop {
    from { bottom: var(--start-bottom); }
    to { bottom: var(--target-bottom); }
  }
  @keyframes stoneMissDrop {
    from { bottom: var(--start-bottom); transform: translateX(-50%) rotate(0deg); opacity: 1; }
    to { bottom: -150px; transform: translateX(-50%) rotate(25deg); opacity: 0; }
  }
  .animate-float-up-smooth { animation: floatUpSmooth 12s linear forwards; }
  .animate-float-lantern { animation: floatLantern 15s ease-in forwards; }
  .animate-bounce-in { animation: bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
  .animate-fade-up-out { animation: fadeUpOut 2s ease-out forwards; }
  .animate-stone-drop { animation: stoneDrop 350ms cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards; }
  .animate-stone-miss-drop { animation: stoneMissDrop 550ms cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards; }
`;
// --- HELPER: SMART EMOJI DETECTOR ---
const getEmojiBySentiment = (text) => {
    const lower = text.toLowerCase();
    if (lower.match(/(marah|kesal|benci|sebal|emosi|gila|anjing|bangsat|parah|tolol)/))
        return '😡';
    if (lower.match(/(sedih|nangis|kecewa|sakit|luka|hancur|broken|galau|cry|lelah)/))
        return '😢';
    if (lower.match(/(takut|cemas|degdegan|panik|anxiety|overthinking|ovt|takut)/))
        return '😰';
    if (lower.match(/(capek|pusing|stress|burnout|muak|lemes|tumbang|bingung)/))
        return '🤯';
    if (lower.match(/(senang|bahagia|syukur|alhamdulillah|happy|cinta|sayang|love|suka)/))
        return '🥰';
    if (lower.match(/(semangat|bisa|kuat|hebat|keren|mantap|gas)/))
        return '🔥';
    if (lower.match(/(tenang|damai|santai|relax|chill|adem)/))
        return '🌿';
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
            setPhase('Inhale');
            setText('Tarik Napas...');
            setScale(1.5);
            setTimeout(() => {
                setPhase('Hold');
                setText('Tahan...');
                setTimeout(() => {
                    setPhase('Exhale');
                    setText('Hembuskan...');
                    setScale(1);
                }, 4000);
            }, 4000);
        };
        breathe();
        const interval = setInterval(breathe, 12000);
        return () => clearInterval(interval);
    }, []);
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-10 w-full", children: [_jsxs("div", { className: "relative flex items-center justify-center w-64 h-64", children: [_jsx("div", { className: "absolute bg-teal-400 rounded-full opacity-30 blur-3xl transition-all duration-[4000ms] ease-in-out", style: { transform: `scale(${scale})` } }), _jsx("div", { className: "absolute w-40 h-40 bg-gradient-to-br from-teal-300 to-cyan-300 rounded-full shadow-lg flex items-center justify-center transition-all duration-[4000ms] ease-in-out z-10", style: { transform: `scale(${scale})` }, children: _jsx("span", { className: "text-white font-bold text-lg animate-pulse", children: phase === 'Inhale' ? '🌬️' : phase === 'Hold' ? '😐' : '😌' }) }), _jsx("div", { className: `absolute border-2 border-teal-100 rounded-full w-64 h-64 transition-all duration-[4000ms] ${phase === 'Inhale' ? 'scale-110 opacity-100' : 'scale-90 opacity-50'}` })] }), _jsx("h3", { className: "text-2xl font-bold text-[#6B4F4F] mt-8 transition-opacity duration-500", children: text })] }));
}
// ============================================================================
// GAME 2: BUBBLE POP
// ============================================================================
export function BubblePopGame() {
    const [bubbles, setBubbles] = useState(Array(25).fill(false));
    const [score, setScore] = useState(0);
    const popBubble = (index) => {
        if (!bubbles[index]) {
            const newBubbles = [...bubbles];
            newBubbles[index] = true;
            setBubbles(newBubbles);
            setScore(s => s + 1);
            if (navigator.vibrate)
                navigator.vibrate(50);
        }
    };
    const resetGame = () => {
        setBubbles(Array(25).fill(false));
        setScore(0);
    };
    return (_jsxs("div", { className: "flex flex-col items-center w-full", children: [_jsxs("div", { className: "mb-6 flex justify-between w-full max-w-xs items-center", children: [_jsxs("div", { className: "bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-bold", children: ["Pop: ", score] }), _jsx("button", { onClick: resetGame, className: "text-[#6B4F4F] hover:text-orange-500 transition-colors p-2 bg-white rounded-full shadow-sm", children: _jsx(ArrowPathIcon, { className: "w-5 h-5" }) })] }), _jsx("div", { className: "grid grid-cols-5 gap-3 bg-stone-100 p-4 rounded-2xl shadow-inner", children: bubbles.map((isPopped, idx) => (_jsx("button", { onClick: () => popBubble(idx), className: `w-12 h-12 rounded-full shadow-sm transition-all duration-200 transform active:scale-90 flex items-center justify-center
                            ${isPopped ? 'bg-stone-200 shadow-inner scale-95' : 'bg-gradient-to-br from-orange-300 to-rose-300 hover:brightness-110 shadow-md cursor-pointer'}
                        `, children: isPopped && _jsx("span", { className: "text-stone-400 text-xs", children: "pop!" }) }, idx))) })] }));
}
// ============================================================================
// GAME 3: MEMORY MATCH
// ============================================================================
const CARD_EMOJIS = ['🌸', '🌊', '🌿', '☀️', '🦋', '🌙', '🍄', '🌵'];
export function MemoryGame() {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [isWon, setIsWon] = useState(false);
    useEffect(() => { resetGame(); }, []);
    const resetGame = () => {
        const shuffled = [...CARD_EMOJIS, ...CARD_EMOJIS].sort(() => Math.random() - 0.5).map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));
        setCards(shuffled);
        setFlippedCards([]);
        setMoves(0);
        setIsWon(false);
    };
    const handleCardClick = (index) => {
        if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched)
            return;
        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);
        const newFlipped = [...flippedCards, index];
        setFlippedCards(newFlipped);
        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            const [i1, i2] = newFlipped;
            if (newCards[i1].emoji === newCards[i2].emoji) {
                newCards[i1].isMatched = true;
                newCards[i2].isMatched = true;
                setCards(newCards);
                setFlippedCards([]);
                if (newCards.every(c => c.isMatched))
                    setIsWon(true);
            }
            else {
                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[i1].isFlipped = false;
                    resetCards[i2].isFlipped = false;
                    setCards(resetCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };
    return (_jsxs("div", { className: "flex flex-col items-center w-full", children: [_jsxs("div", { className: "mb-6 flex justify-between w-full max-w-xs items-center", children: [_jsxs("div", { className: "bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-bold", children: ["Langkah: ", moves] }), _jsx("button", { onClick: resetGame, className: "text-[#6B4F4F] hover:text-purple-500 transition-colors p-2 bg-white rounded-full shadow-sm", children: _jsx(ArrowPathIcon, { className: "w-5 h-5" }) })] }), _jsx("div", { className: "grid grid-cols-4 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-100", children: cards.map((card, index) => (_jsx("button", { onClick: () => handleCardClick(index), className: `w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-2xl transition-all duration-500 transform ${card.isFlipped || card.isMatched ? 'bg-white shadow-inner rotate-0' : 'bg-gradient-to-br from-purple-400 to-indigo-400 shadow-md rotate-180 text-transparent'}`, disabled: isWon, children: (card.isFlipped || card.isMatched) ? card.emoji : '?' }, index))) }), isWon && _jsx("div", { className: "mt-6 animate-bounce font-bold text-purple-600", children: "\uD83C\uDF89 Hebat! Fokusmu luar biasa!" })] }));
}
// ============================================================================
// GAME 4: STRESS POPPER
// ============================================================================
const NEGATIVE_WORDS = ['Cemas', 'Takut', 'Ragu', 'Lelah', 'Stres', 'Marah', 'Sedih', 'Gelisah'];
const POSITIVE_WORDS = ['Tenang', 'Berani', 'Yakin', 'Kuat', 'Damai', 'Sabar', 'Senyum', 'Nyaman'];
export function StressPopperGame() {
    const [words, setWords] = useState([]);
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
    const handlePop = (id) => {
        setWords(prev => prev.map(w => w.id === id ? Object.assign(Object.assign({}, w), { isPopped: true, positiveText: POSITIVE_WORDS[Math.floor(Math.random() * POSITIVE_WORDS.length)] }) : w));
        setCount(c => c + 1);
        setTimeout(() => { setWords(prev => prev.filter(w => w.id !== id)); }, 1000);
    };
    return (_jsxs("div", { className: "flex flex-col items-center w-full h-[400px] relative", children: [_jsxs("div", { className: "absolute top-0 left-0 z-10 bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-sm font-bold", children: ["Ubah Emosi: ", count] }), _jsx("div", { className: "w-full h-full bg-stone-50/50 rounded-3xl border-2 border-dashed border-stone-200 relative overflow-hidden mt-4", children: words.map((w) => (_jsx("button", { onClick: () => !w.isPopped && handlePop(w.id), className: `absolute px-4 py-2 rounded-full font-bold shadow-md transition-all duration-500 transform ${w.isPopped ? 'bg-green-100 text-green-600 scale-110 opacity-0 -translate-y-10' : 'bg-white text-rose-500 hover:bg-rose-50 hover:scale-105 animate-float'}`, style: { left: `${w.x}%`, top: `${w.y}%` }, disabled: w.isPopped, children: w.isPopped ? w.positiveText : w.text }, w.id))) })] }));
}
const CloudItem = memo(({ text, x }) => (_jsx("div", { className: "absolute bottom-[-120px] animate-float-up-smooth flex flex-col items-center justify-center pointer-events-none", style: { left: `${x}%`, zIndex: 10 }, children: _jsxs("div", { className: "relative w-40 h-28", children: [_jsx("svg", { viewBox: "0 0 24 24", fill: "white", className: "w-full h-full drop-shadow-md text-white opacity-90", children: _jsx("path", { d: "M18.42 9.24c-.2-.01-.4-.01-.6.01-.95-3.6-4.22-6.25-8.07-6.25-4.32 0-7.9 3.19-8.67 7.36C.47 10.81 0 11.6 0 12.45 0 15.77 2.69 18.46 6 18.46h12.5c3.04 0 5.5-2.46 5.5-5.5 0-2.86-2.18-5.21-4.96-5.46-.04-.13-.08-.25-.12-.37z" }) }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center p-6 pt-8", children: _jsx("span", { className: "text-[10px] md:text-xs font-bold text-slate-600 text-center leading-tight break-words w-full line-clamp-2 overflow-hidden", children: text }) })] }) })));
CloudItem.displayName = 'CloudItem';
export function CloudThoughtsGame() {
    const [thought, setThought] = useState('');
    const [clouds, setClouds] = useState([]);
    const addCloud = () => {
        if (!thought.trim())
            return;
        const newId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const newCloud = { id: newId, text: thought, x: Math.random() * 60 + 10 };
        setClouds(prev => [...prev, newCloud]);
        setThought('');
        setTimeout(() => {
            setClouds(prev => prev.filter(c => c.id !== newId));
        }, 12000);
    };
    return (_jsxs("div", { className: "flex flex-col items-center w-full h-[500px] relative overflow-hidden bg-gradient-to-b from-sky-300 to-sky-50 rounded-[2rem] border-4 border-white shadow-inner", children: [_jsx("style", { children: GLOBAL_STYLES }), _jsx("div", { className: "absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden", children: clouds.map(cloud => _jsx(CloudItem, { text: cloud.text, x: cloud.x }, cloud.id)) }), _jsxs("div", { className: "absolute bottom-6 w-full px-6 z-30", children: [_jsxs("div", { className: "bg-white/95 backdrop-blur-md p-2 rounded-full shadow-xl flex gap-2 ring-2 ring-sky-100", children: [_jsx("input", { type: "text", value: thought, onChange: (e) => setThought(e.target.value), placeholder: "Ketik beban pikiranmu...", className: "flex-1 bg-transparent px-4 outline-none text-sm text-gray-600 placeholder:text-gray-400", onKeyDown: (e) => e.key === 'Enter' && addCloud(), maxLength: 40 }), _jsx("button", { onClick: addCloud, className: "bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition-all hover:scale-110 shadow-md", children: _jsx(PaperAirplaneIcon, { className: "w-5 h-5" }) })] }), _jsx("p", { className: "text-[10px] text-center text-sky-700/60 mt-2 font-medium", children: "Tulis bebanmu, lalu biarkan ia terbang hilang." })] })] }));
}
export function GratitudeJarGame() {
    const [text, setText] = useState('');
    const [stars, setStars] = useState([]);
    const [toastMsg, setToastMsg] = useState(null);
    const addStar = () => {
        if (!text.trim())
            return;
        const emoji = getEmojiBySentiment(text);
        const newStar = {
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
    return (_jsxs("div", { className: "flex flex-col items-center w-full relative", children: [_jsx("style", { children: GLOBAL_STYLES }), toastMsg && (_jsx("div", { className: "absolute top-10 z-50 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-amber-200 animate-fade-up-out", children: _jsx("p", { className: "text-xs font-bold text-amber-600", children: toastMsg }) })), _jsxs("div", { className: "relative w-64 h-80 mb-6 group", children: [_jsxs("div", { className: "absolute inset-0 border-4 border-white/60 bg-gradient-to-b from-white/5 to-white/20 backdrop-blur-[2px] rounded-b-[4rem] rounded-t-2xl border-t-0 shadow-xl overflow-hidden z-10", children: [_jsx("div", { className: "absolute top-4 left-4 w-3 h-40 bg-white/20 rounded-full blur-sm" }), stars.map(star => (_jsx("div", { className: "absolute text-4xl transition-all duration-500 hover:scale-125 z-20 animate-bounce-in", style: { left: `${star.x}%`, bottom: `${star.y}%`, transform: `rotate(${star.rotation}deg)` }, children: star.emoji }, star.id)))] }), _jsx("div", { className: "absolute -top-4 left-[-2%] w-[104%] h-6 bg-[#E0C097] rounded-lg shadow-md z-20 border-b-4 border-[#C8A070]" })] }), _jsxs("div", { className: "w-full max-w-sm space-y-3 relative z-30", children: [_jsx("input", { type: "text", value: text, onChange: (e) => setText(e.target.value), placeholder: "Hari ini aku bersyukur karena...", className: "w-full px-5 py-4 rounded-2xl bg-white border border-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-100 text-sm text-gray-600 shadow-sm", onKeyDown: (e) => e.key === 'Enter' && addStar() }), _jsxs("button", { onClick: addStar, className: "w-full bg-amber-400 text-white font-bold py-3 rounded-2xl hover:bg-amber-500 transition-all shadow-lg active:scale-95 flex justify-center items-center gap-2", children: ["Simpan Kenangan ", _jsx(StarIcon, { className: "w-5 h-5" })] })] })] }));
}
export function LanternGame() {
    const [wish, setWish] = useState('');
    const [lanterns, setLanterns] = useState([]);
    const releaseLantern = () => {
        if (!wish.trim())
            return;
        const newId = Date.now();
        setLanterns(prev => [...prev, { id: newId, text: wish, left: Math.random() * 70 + 15 }]);
        setWish('');
        setTimeout(() => { setLanterns(prev => prev.filter(l => l.id !== newId)); }, 15000);
    };
    return (_jsxs("div", { className: "flex flex-col items-center w-full h-[500px] relative bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 shadow-2xl", children: [_jsx("style", { children: GLOBAL_STYLES }), _jsx("div", { className: "absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" }), _jsx("div", { className: "absolute inset-0 w-full h-full pointer-events-none z-10", children: lanterns.map(l => (_jsxs("div", { className: "absolute bottom-[-100px] animate-float-lantern flex flex-col items-center", style: { left: `${l.left}%` }, children: [_jsx("div", { className: "relative text-6xl filter drop-shadow-[0_0_25px_rgba(255,140,0,0.6)] animate-pulse", children: "\uD83C\uDFEE" }), _jsx("span", { className: "mt-2 text-[9px] text-amber-100 bg-black/60 px-2 py-1 rounded border border-white/10 backdrop-blur-sm max-w-[120px] truncate", children: l.text })] }, l.id))) }), _jsx("div", { className: "absolute bottom-6 w-full px-6 z-30", children: _jsxs("div", { className: "flex gap-2 bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg", children: [_jsx("input", { type: "text", value: wish, onChange: (e) => setWish(e.target.value), placeholder: "Kirim harapanmu...", className: "flex-1 bg-transparent px-4 py-2 text-white placeholder:text-white/40 focus:outline-none text-sm", onKeyDown: (e) => e.key === 'Enter' && releaseLantern() }), _jsx("button", { onClick: releaseLantern, className: "bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-xl font-bold transition-colors shadow-md flex items-center gap-2", children: _jsx(FireIcon, { className: "w-4 h-4" }) })] }) })] }));
}
export function StoneStackingGame() {
    var _a;
    const [difficulty, setDifficulty] = useState(null);
    const [stack, setStack] = useState([]);
    const [currentStoneX, setCurrentStoneX] = useState(50);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    // Animation falling states
    const [isFalling, setIsFalling] = useState(false);
    const [fallingStone, setFallingStone] = useState(null);
    const requestRef = useRef(null);
    const directionRef = useRef(1);
    const speedRef = useRef(1);
    const baseWidthRef = useRef(100);
    const startGame = (mode) => {
        setDifficulty(mode);
        let baseWidth = 100;
        let initialSpeed = 0.5;
        if (mode === 'EASY') {
            baseWidth = 120;
            initialSpeed = 0.5;
        }
        if (mode === 'NORMAL') {
            baseWidth = 90;
            initialSpeed = 1.0;
        }
        if (mode === 'HARD') {
            baseWidth = 70;
            initialSpeed = 1.5;
        }
        baseWidthRef.current = baseWidth;
        speedRef.current = initialSpeed;
        setStack([{ id: 0, width: baseWidth, x: 50, color: 'bg-stone-800', placed: true }]);
        setCurrentStoneX(50);
        setScore(0);
        setGameOver(false);
        setIsFalling(false);
        setFallingStone(null);
        setIsPlaying(true);
    };
    const animate = useCallback(() => {
        if (!isPlaying || gameOver || isFalling)
            return;
        setCurrentStoneX(prev => {
            let next = prev + (speedRef.current * directionRef.current);
            if (next > 90 || next < 10) {
                directionRef.current *= -1;
                next = prev;
            }
            return next;
        });
        requestRef.current = requestAnimationFrame(animate);
    }, [isPlaying, gameOver, isFalling]);
    useEffect(() => {
        if (isPlaying && !gameOver)
            requestRef.current = requestAnimationFrame(animate);
        return () => { if (requestRef.current)
            cancelAnimationFrame(requestRef.current); };
    }, [isPlaying, gameOver, animate]);
    const placeStone = (e) => {
        if (gameOver) {
            setDifficulty(null);
            return;
        }
        if (isFalling)
            return; // Prevent clicking while stone is falling
        const containerWidth = e.currentTarget.clientWidth || 400;
        const topStone = stack[stack.length - 1];
        const diffPx = (Math.abs(currentStoneX - topStone.x) / 100) * containerWidth;
        const tolerancePx = topStone.width / 2;
        const translateY = Math.min(stack.length * 25, 250);
        const startBottom = 500 - 120 - 35 + translateY;
        if (diffPx > tolerancePx) {
            // Miss drop (Falls off screen)
            setIsFalling(true);
            setFallingStone({
                width: topStone.width - 3,
                x: currentStoneX,
                color: 'bg-stone-500',
                startBottom,
                targetBottom: -150,
                isMiss: true
            });
            if (navigator.vibrate)
                navigator.vibrate(300);
            setTimeout(() => {
                setGameOver(true);
                setIsPlaying(false);
                setIsFalling(false);
                setFallingStone(null);
            }, 550);
        }
        else {
            // Successful placement
            const minWidth = difficulty === 'EASY' ? 30 : difficulty === 'NORMAL' ? 25 : 20;
            const shrinkAmount = difficulty === 'HARD' ? 5 : 3;
            const calculatedWidth = topStone.width - shrinkAmount;
            const newWidth = Math.max(minWidth, calculatedWidth);
            const stoneColor = ['bg-stone-400', 'bg-stone-500', 'bg-stone-600', 'bg-zinc-500'][score % 4];
            const targetBottom = (stack.length * 35) + 40;
            setIsFalling(true);
            setFallingStone({
                width: newWidth,
                x: currentStoneX,
                color: stoneColor,
                startBottom,
                targetBottom,
                isMiss: false
            });
            if (navigator.vibrate)
                navigator.vibrate(50);
            setTimeout(() => {
                setStack(p => [...p, {
                        id: Date.now(),
                        width: newWidth,
                        x: currentStoneX,
                        color: stoneColor,
                        placed: true
                    }]);
                setScore(s => s + 1);
                speedRef.current += 0.05;
                setIsFalling(false);
                setFallingStone(null);
            }, 350);
        }
    };
    // MENU SCREEN
    if (!difficulty) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center w-full h-[500px] bg-stone-100 rounded-[2rem] border-4 border-stone-200 shadow-inner gap-6 p-8", children: [_jsx("h3", { className: "text-2xl font-bold text-stone-600", children: "Pilih Tingkat Kesulitan" }), _jsxs("div", { className: "flex flex-col gap-3 w-full max-w-xs", children: [_jsx("button", { onClick: () => startGame('EASY'), className: "py-4 bg-green-100 text-green-700 font-bold rounded-xl hover:bg-green-200 transition-all border border-green-200 shadow-sm", children: "EASY (Batu Besar, Lambat)" }), _jsx("button", { onClick: () => startGame('NORMAL'), className: "py-4 bg-blue-100 text-blue-700 font-bold rounded-xl hover:bg-blue-200 transition-all border border-blue-200 shadow-sm", children: "NORMAL (Sedang)" }), _jsx("button", { onClick: () => startGame('HARD'), className: "py-4 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-all border border-red-200 shadow-sm", children: "HARD (Batu Akan Terkikis, Cepat!)" })] })] }));
    }
    return (_jsxs("div", { className: "flex flex-col items-center justify-end w-full h-[500px] bg-gradient-to-b from-stone-100 to-stone-300 rounded-[2rem] relative cursor-pointer overflow-hidden border-4 border-stone-200 shadow-inner select-none", onClick: placeStone, children: [_jsx("style", { children: GLOBAL_STYLES }), _jsxs("div", { className: "absolute top-6 text-center z-20 w-full pointer-events-none", children: [_jsx("h3", { className: `font-bold text-4xl transition-colors duration-300 ${gameOver ? 'text-red-500 animate-bounce' : 'text-stone-600'}`, children: gameOver ? "YAH JATUH!" : score }), _jsx("p", { className: "text-xs text-stone-500 mt-2 font-bold tracking-widest uppercase bg-white/50 px-3 py-1 rounded-full inline-block", children: gameOver ? "Ketuk untuk Menu Utama" : `${difficulty} MODE` })] }), !gameOver && !isFalling && (_jsx("div", { className: "absolute bg-stone-500 shadow-2xl rounded-lg transition-none z-30", style: {
                    width: `${((_a = stack[stack.length - 1]) === null || _a === void 0 ? void 0 : _a.width) || baseWidthRef.current}px`,
                    height: '35px',
                    left: `${currentStoneX}%`,
                    transform: 'translateX(-50%)',
                    top: '120px'
                }, children: _jsx("div", { className: "w-full h-full bg-white/20 rounded-t-lg" }) })), _jsxs("div", { className: "w-full h-full relative transition-transform duration-500", style: { transform: `translateY(${Math.min(stack.length * 25, 250)}px)` }, children: [isFalling && fallingStone && (_jsx("div", { className: `${fallingStone.color} shadow-lg rounded-sm border-b-2 border-black/10 absolute ${fallingStone.isMiss ? 'animate-stone-miss-drop' : 'animate-stone-drop'}`, style: {
                            '--start-bottom': `${fallingStone.startBottom}px`,
                            '--target-bottom': `${fallingStone.targetBottom}px`,
                            width: `${fallingStone.width}px`,
                            height: '40px',
                            left: `${fallingStone.x}%`,
                            transform: 'translateX(-50%)',
                            zIndex: 50
                        } })), stack.map((stone, i) => (_jsx("div", { className: `${stone.color} shadow-lg rounded-sm border-b-2 border-black/10 absolute`, style: {
                            width: `${stone.width}px`,
                            height: '40px',
                            left: `${stone.x}%`,
                            transform: 'translateX(-50%)',
                            bottom: `${(i * 35) + 40}px`,
                            zIndex: i
                        } }, stone.id)))] })] }));
}
