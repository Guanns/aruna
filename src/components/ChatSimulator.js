import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/ChatSimulator.tsx
// VERSI FINAL: SUPPORT 9 SCENARIOS + FIXED TYPES
import { useState, useEffect, useRef } from 'react';
import { scenarios } from '../features/chatSimData';
import { UserIcon, ArrowPathIcon, ArrowLeftIcon, ShieldCheckIcon, FireIcon, BanknotesIcon, EyeSlashIcon, LockClosedIcon, SpeakerXMarkIcon, UserGroupIcon, ExclamationTriangleIcon, NoSymbolIcon } from '@heroicons/react/24/solid';
export default function ChatSimulator() {
    var _a;
    const [activeScenario, setActiveScenario] = useState(null);
    const [history, setHistory] = useState([]);
    const [currentNode, setCurrentNode] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const chatEndRef = useRef(null);
    const startScenario = (scenario) => {
        setActiveScenario(scenario);
        setHistory([scenario.startNode]);
        setCurrentNode(scenario.startNode);
        setFeedback(null);
    };
    const quitScenario = () => {
        setActiveScenario(null);
        setHistory([]);
        setCurrentNode(null);
        setFeedback(null);
    };
    useEffect(() => {
        var _a;
        (_a = chatEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    }, [history, isTyping, feedback]);
    const handleChoice = (choice) => {
        if (!activeScenario)
            return;
        const userResponse = {
            id: 'user_response',
            sender: 'user',
            message: choice.text
        };
        setHistory(prev => [...prev, userResponse]);
        if (choice.feedback) {
            setFeedback({ text: choice.feedback, type: choice.type });
        }
        setIsTyping(true);
        setTimeout(() => {
            const nextNode = activeScenario.nodes[choice.nextNodeId];
            setHistory(prev => [...prev, nextNode]);
            setCurrentNode(nextNode);
            setIsTyping(false);
        }, 1500);
    };
    const resetSim = () => {
        if (activeScenario)
            startScenario(activeScenario);
    };
    // HELPER ICON BARU UNTUK 9 SKENARIO
    const getIcon = (id) => {
        switch (id) {
            case 'pap': return _jsx(ShieldCheckIcon, { className: "w-6 h-6 text-purple-500" });
            case 'stranger': return _jsx(EyeSlashIcon, { className: "w-6 h-6 text-gray-600" }); // Stalker
            case 'posesif': return _jsx(FireIcon, { className: "w-6 h-6 text-orange-500" });
            case 'pass': return _jsx(LockClosedIcon, { className: "w-6 h-6 text-blue-500" }); // Password
            case 'silent': return _jsx(SpeakerXMarkIcon, { className: "w-6 h-6 text-stone-400" }); // Silent
            case 'friend': return _jsx(UserGroupIcon, { className: "w-6 h-6 text-yellow-500" }); // Friend
            case 'money': return _jsx(BanknotesIcon, { className: "w-6 h-6 text-green-500" });
            case 'gaslight': return _jsx(ExclamationTriangleIcon, { className: "w-6 h-6 text-red-600" }); // Bahaya
            case 'coercion': return _jsx(NoSymbolIcon, { className: "w-6 h-6 text-rose-600" }); // Consent
            default: return _jsx(ShieldCheckIcon, { className: "w-6 h-6 text-gray-400" });
        }
    };
    // --- MENU MODE ---
    if (!activeScenario) {
        return (_jsxs("div", { className: "max-w-lg mx-auto bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 h-[600px] flex flex-col p-8", children: [_jsx("h3", { className: "text-2xl font-bold text-[#6B4F4F] mb-2", children: "Pilih Skenario" }), _jsx("p", { className: "text-sm opacity-60 mb-6", children: "Latih responmu dalam berbagai situasi sulit." }), _jsx("div", { className: "space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1", children: scenarios.map((scene) => (_jsxs("button", { onClick: () => startScenario(scene), className: "w-full bg-white p-5 rounded-3xl border border-stone-100 hover:border-teal-200 hover:shadow-lg transition-all text-left group relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 w-1 h-full bg-teal-500 transform scale-y-0 group-hover:scale-y-100 transition-transform" }), _jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("div", { className: "p-3 bg-stone-50 rounded-2xl group-hover:bg-teal-50 transition-colors", children: getIcon(scene.id) }), _jsx("span", { className: `text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-widest border
                                    ${scene.difficulty === 'Easy' ? 'bg-green-50 text-green-600 border-green-100' :
                                            scene.difficulty === 'Medium' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                scene.difficulty === 'Hard' ? 'bg-red-50 text-red-600 border-red-100' :
                                                    'bg-purple-50 text-purple-600 border-purple-100'} // Expert
                                `, children: scene.difficulty })] }), _jsx("h4", { className: "font-bold text-[#6B4F4F] text-lg mb-1", children: scene.title }), _jsx("p", { className: "text-xs text-[#6B4F4F]/60 leading-relaxed line-clamp-2", children: scene.description })] }, scene.id))) })] }));
    }
    // --- CHAT MODE ---
    return (_jsxs("div", { className: "max-w-lg mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[600px] animate-fade-in", children: [_jsxs("div", { className: "bg-slate-50 p-4 border-b flex items-center gap-3 relative z-10", children: [_jsx("button", { onClick: quitScenario, className: "p-2 hover:bg-slate-200 rounded-full transition-colors mr-1", children: _jsx(ArrowLeftIcon, { className: "w-5 h-5 text-slate-600" }) }), _jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-inner", children: _jsx(UserIcon, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-sm text-gray-800", children: ['stranger'].includes(activeScenario.id) ? 'Orang Asing' :
                                    ['friend'].includes(activeScenario.id) ? 'Teman' : 'Pasangan' }), _jsxs("p", { className: "text-[10px] text-green-600 font-bold uppercase tracking-widest flex items-center gap-1", children: [_jsx("span", { className: "w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" }), " Online"] })] })] }), _jsxs("div", { className: "flex-1 bg-[#e5ddd5]/20 p-4 overflow-y-auto space-y-4 custom-scrollbar", children: [history.map((msg, idx) => (_jsx("div", { className: `flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`, children: _jsx("div", { className: `max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm relative
                            ${msg.sender === 'user'
                                ? 'bg-[#dcf8c6] text-gray-800 rounded-tr-none'
                                : 'bg-white text-gray-800 rounded-tl-none'}
                        `, children: msg.message }) }, idx))), isTyping && (_jsx("div", { className: "flex justify-start animate-pulse", children: _jsxs("div", { className: "bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-gray-400 text-xs italic flex items-center gap-1", children: [_jsx("span", { children: "mengetik" }), _jsx("span", { className: "animate-bounce", children: "." }), _jsx("span", { className: "animate-bounce delay-75", children: "." }), _jsx("span", { className: "animate-bounce delay-150", children: "." })] }) })), _jsx("div", { ref: chatEndRef })] }), feedback && (_jsxs("div", { className: `mx-4 mb-2 p-3 rounded-xl text-sm border-l-4 animate-bounce-in shadow-md
                    ${feedback.type === 'good' ? 'bg-green-50 border-green-500 text-green-800' :
                    feedback.type === 'risky' ? 'bg-red-50 border-red-500 text-red-800' :
                        'bg-orange-50 border-orange-500 text-orange-800'}
                `, children: [_jsx("p", { className: "font-bold flex items-center gap-2 mb-1 text-xs uppercase tracking-wider", children: feedback.type === 'good' ? '✨ Pilihan Cerdas' : feedback.type === 'risky' ? '⚠️ Berisiko' : '🤔 Hati-hati' }), _jsx("p", { className: "opacity-90 leading-snug", children: feedback.text })] })), _jsx("div", { className: "p-4 bg-white border-t pb-6", children: (currentNode === null || currentNode === void 0 ? void 0 : currentNode.isEnding) ? (_jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: quitScenario, className: "flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors text-sm", children: "Menu Utama" }), _jsxs("button", { onClick: resetSim, className: "flex-1 py-3 bg-[#6B4F4F] text-white rounded-xl font-bold hover:bg-[#5a4242] transition-colors flex items-center justify-center gap-2 text-sm shadow-lg", children: [_jsx(ArrowPathIcon, { className: "w-4 h-4" }), " Coba Lagi"] })] })) : (_jsx("div", { className: "grid gap-2", children: (_a = currentNode === null || currentNode === void 0 ? void 0 : currentNode.choices) === null || _a === void 0 ? void 0 : _a.map((choice, idx) => (_jsx("button", { onClick: () => handleChoice(choice), disabled: isTyping, className: "w-full py-3.5 px-5 bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-200 rounded-2xl text-left text-sm text-gray-700 transition-all disabled:opacity-50 active:scale-98", children: choice.text }, idx))) })) })] }));
}
