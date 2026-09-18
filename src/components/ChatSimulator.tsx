// components/ChatSimulator.tsx
import React, { useState, useEffect, useRef } from 'react';
import { scenarios, Scenario, DialogueNode, Choice } from '../features/chatSimData';
import { 
    UserIcon, ArrowPathIcon, ArrowLeftIcon,
    ShieldCheckIcon, FireIcon, LockClosedIcon,
    EyeSlashIcon, NoSymbolIcon
} from '@heroicons/react/24/solid';

export default function ChatSimulator() {
    const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
    const [history, setHistory] = useState<DialogueNode[]>([]);
    const [currentNode, setCurrentNode] = useState<DialogueNode | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [feedback, setFeedback] = useState<{text: string, type: string} | null>(null);
    
    const simulatorRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = (smooth = true) => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: smooth ? 'smooth' : 'auto'
            });
        }
        chatEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'nearest' });
    };

    const startScenario = (scenario: Scenario) => {
        setActiveScenario(scenario);
        setHistory([scenario.startNode]);
        setCurrentNode(scenario.startNode);
        setFeedback(null);
        setTimeout(() => {
            scrollToBottom(false);
        }, 60);
    };

    const quitScenario = () => {
        setActiveScenario(null);
        setHistory([]);
        setCurrentNode(null);
        setFeedback(null);
    };

    useEffect(() => {
        scrollToBottom(true);
        const timer = setTimeout(() => {
            scrollToBottom(true);
        }, 100);
        return () => clearTimeout(timer);
    }, [history, isTyping, feedback]);

    const handleChoice = (choice: Choice) => {
        if (!activeScenario) return;

        const userResponse: DialogueNode = {
            id: 'user_response',
            sender: 'user',
            message: choice.text
        };
        setHistory(prev => [...prev, userResponse]);
        
        if (choice.feedback) {
            setFeedback({ text: choice.feedback, type: choice.type });
        }

        // Auto-scroll chat container to bottom immediately when option is clicked
        setTimeout(() => {
            scrollToBottom(true);
            if (window.innerWidth < 1024 && simulatorRef.current) {
                simulatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 50);

        setIsTyping(true);
        setTimeout(() => {
            const nextNode = activeScenario.nodes[choice.nextNodeId];
            setHistory(prev => [...prev, nextNode]);
            setCurrentNode(nextNode);
            setIsTyping(false);
            setTimeout(() => {
                scrollToBottom(true);
            }, 60);
        }, 1200);
    };

    const resetSim = () => {
        if (activeScenario) startScenario(activeScenario);
    };

    const getIcon = (id: string) => {
        switch (id) {
            case 'pap': return <ShieldCheckIcon className="w-5 h-5 text-purple-600"/>;
            case 'stranger': return <EyeSlashIcon className="w-5 h-5 text-stone-600"/>;
            case 'posesif': return <FireIcon className="w-5 h-5 text-orange-600"/>;
            case 'pass': return <LockClosedIcon className="w-5 h-5 text-blue-600"/>;
            case 'coercion': return <NoSymbolIcon className="w-5 h-5 text-rose-600"/>;
            default: return <ShieldCheckIcon className="w-5 h-5 text-stone-500"/>;
        }
    };

    // --- MENU MODE ---
    if (!activeScenario) {
        return (
            <div ref={simulatorRef} className="bg-white rounded-2xl border border-stone-200 shadow-xs h-[580px] flex flex-col p-6 sm:p-7 font-poppins">
                <div className="mb-5">
                    <h3 className="text-xl font-bold text-stone-900 mb-1">
                        Pilih <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Skenario Latihan</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 font-normal">Pilih situasi percakapan yang ingin kamu evaluasi.</p>
                </div>
                
                <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                    {scenarios.map((scene) => (
                        <button 
                            key={scene.id}
                            onClick={() => startScenario(scene)}
                            className="w-full bg-white p-4 rounded-xl border border-stone-200 hover:border-stone-300 text-left transition-colors"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="p-2 bg-stone-50 rounded-lg">
                                    {getIcon(scene.id)}
                                </div>
                                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md
                                    ${scene.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' : 
                                      scene.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' : 
                                      scene.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700' :
                                      'bg-purple-50 text-purple-700'}
                                `}>
                                    {scene.difficulty}
                                </span>
                            </div>
                            <h4 className="font-bold text-stone-900 text-base mb-1">{scene.title}</h4>
                            <p className="text-xs text-stone-600 font-normal leading-relaxed line-clamp-2">
                                {scene.description}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // --- CHAT MODE ---
    return (
        <div ref={simulatorRef} className="bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col h-[580px] font-poppins overflow-hidden">
            
            {/* Header */}
            <div className="bg-stone-50 px-4 py-3 border-b border-stone-200 flex items-center gap-3">
                <button 
                    onClick={quitScenario} 
                    className="p-1.5 hover:bg-stone-200 text-stone-600 rounded-lg transition-colors"
                    title="Kembali ke Daftar Skenario"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                </button>
                <div className="w-8 h-8 rounded-full bg-stone-300 flex items-center justify-center text-white shrink-0">
                    <UserIcon className="w-4 h-4" />
                </div>
                <div>
                    <h3 className="font-bold text-xs sm:text-sm text-stone-900">
                        {['stranger'].includes(activeScenario.id) ? 'Orang Asing' : 
                         ['friend'].includes(activeScenario.id) ? 'Teman' : 'Pasangan'}
                    </h3>
                    <p className="text-[10px] text-emerald-600 font-medium">Online</p>
                </div>
            </div>

            {/* Chat Messages */}
            <div 
                ref={chatContainerRef} 
                className="flex-1 bg-stone-50/50 p-4 overflow-y-auto space-y-3 scroll-smooth"
            >
                {history.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed border
                            ${msg.sender === 'user' 
                                ? 'bg-emerald-600 text-white rounded-tr-xs border-emerald-600' 
                                : 'bg-white text-stone-900 rounded-tl-xs border-stone-200 shadow-xs'}
                        `}>
                            {msg.message}
                        </div>
                    </div>
                ))}
                
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-2xl rounded-tl-xs border border-stone-200 shadow-xs text-stone-400 text-xs italic">
                            Sedang mengetik...
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Feedback Alert */}
            {feedback && (
                <div className={`mx-4 mb-2 p-3 rounded-xl text-xs sm:text-sm border
                    ${feedback.type === 'good' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 
                      feedback.type === 'risky' ? 'bg-rose-50 border-rose-200 text-rose-900' : 
                      'bg-amber-50 border-amber-200 text-amber-900'}
                `}>
                    <p className="font-bold mb-1 text-xs">
                        {feedback.type === 'good' ? 'Keputusan Aman' : feedback.type === 'risky' ? 'Tindakan Berisiko' : 'Perlu Diwaspadai'}
                    </p>
                    <p className="leading-relaxed font-normal">{feedback.text}</p>
                </div>
            )}

            {/* Choice Buttons */}
            <div className="p-4 bg-white border-t border-stone-200">
                {currentNode?.isEnding ? (
                    <div className="flex gap-2.5">
                        <button 
                            onClick={quitScenario} 
                            className="flex-1 py-2.5 bg-stone-100 text-stone-700 rounded-xl font-semibold hover:bg-stone-200 transition-colors text-xs sm:text-sm"
                        >
                            Ganti Skenario
                        </button>
                        <button 
                            onClick={resetSim} 
                            className="flex-1 py-2.5 bg-stone-900 text-white rounded-xl font-semibold hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm"
                        >
                            <ArrowPathIcon className="w-3.5 h-3.5" /> Ulangi Skenario
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-2">
                        {currentNode?.choices?.map((choice, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleChoice(choice)}
                                disabled={isTyping}
                                className="w-full py-3 px-4 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl text-left text-xs sm:text-sm text-stone-800 font-medium transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                {choice.text}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}