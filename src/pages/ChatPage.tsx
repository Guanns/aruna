// app/chat/page.tsx
// VERSI FIX: API Key Otomatis & Font Jelas (Mudah Dibaca)import { Link } from 'react-router-dom';
import { ArrowLeftIcon, PaperAirplaneIcon, SparklesIcon, FaceSmileIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI, ChatSession, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// --- KONFIGURASI ---
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""; 

const MODEL_NAME = "gemini-2.5-flash-lite";

// Pesan Pembuka
const WELCOME_MESSAGE = "Hai kamuu 🤍\n\nWelcome to Aruna AI! Your soft space to breathe, feel, and just be you 🌞\n\nAku tau banget kadang dunia terasa berat buat kamu, sedangkan kamu udah cape banget buat berjuang sendirian. Tapi heyyy.. kamu udah hebat banget bisa sampai di titik ini. 😸\n\nYou dont have to be okay all the time and its okay to feel everything. Di sini, kamu aman, didengar, dan nggak akan ada yang bisa judge kamu disini!\n\nTake your time, cerita boleh… nangis juga boleh. Aku di sini buat kamu 🌻";

// Karakter AI
const PERSONA = `Kamu adalah "Aruna", teman AI yang penuh empati, suportif, dan hangat. 
Tugasmu adalah menjadi ruang aman bagi pengguna untuk bercerita. 
Gunakan bahasa Indonesia yang kasual, akrab (seperti sahabat), dan menenangkan. 
Validasi perasaan mereka. JANGAN memberikan nasihat medis atau hukum yang kaku. 
Fokuslah untuk menjadi pendengar yang baik. 
Gunakan emoji secukupnya untuk mengekspresikan kehangatan.`;

type Message = {
    role: 'user' | 'model';
    text: string;
};

export default function ChatPage() {
    const [chatSession, setChatSession] = useState<ChatSession | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: WELCOME_MESSAGE }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // 1. Inisialisasi Chat
    useEffect(() => {
        const initChat = async () => {
            if (!API_KEY) {
                console.error("[Aruna AI] VITE_GEMINI_API_KEY tidak ditemukan di environment variables!");
                return;
            }
            console.log("[Aruna AI] Inisialisasi dengan API Key:", API_KEY.substring(0, 8) + "...");
            try {
                const genAI = new GoogleGenerativeAI(API_KEY);
                const chat = genAI.getGenerativeModel({ model: MODEL_NAME })
                    .startChat({
                        history: [
                            { role: "user", parts: [{ text: PERSONA }] },
                            { role: "model", parts: [{ text: "Mengerti. Aku Aruna, sahabatmu yang siap mendengar." }] }
                        ],
                        safetySettings: [
                            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
                            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
                            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                        ],
                    });
                setChatSession(chat);
                console.log("[Aruna AI] Chat session berhasil dibuat.");
            } catch (error) {
                console.error("[Aruna AI] Gagal inisialisasi:", error);
            }
        };
        initChat();
    }, []);

    // 2. Smart Auto Scroll (Fixed: scroll only container to prevent body viewport shift)
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    // 3. Handle Kirim Pesan
    const handleSend = async () => {
        if (input.trim() === '' || isLoading || !chatSession) return;

        const newUserMessage: Message = { role: 'user', text: input };
        const currentInput = input;

        setMessages(prev => [...prev, newUserMessage, { role: 'model', text: '' }]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chatSession.sendMessageStream(currentInput);
            let fullText = '';
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullText += chunkText;
                setMessages(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1].text = fullText;
                    return newHistory;
                });
            }
        } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : String(error);
            console.error("[Aruna AI] Error kirim pesan:", errMsg);
            setMessages(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1].text = "Sinyal hatiku terputus sebentar... Coba cerita lagi ya? 🍂\n\n_(Error: " + errMsg + ")_";
                return newHistory;
            });
        }
        setIsLoading(false);
    };

    return (
        <div className="w-full h-screen flex flex-col bg-[#FFFBF5] relative overflow-hidden font-sans">
            
            {/* --- CLEAN BACKGROUND --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                 <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-teal-150/15 rounded-full blur-[130px] animate-pulse" style={{animationDuration: '10s'}}></div>
                 <div className="absolute bottom-[-10%] left-[-15%] w-[700px] h-[700px] bg-rose-150/15 rounded-full blur-[120px] animate-pulse" style={{animationDuration: '15s'}}></div>
                 <div className="absolute inset-0 opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
            </div>

            {/* --- HEADER --- */}
            <header className="px-6 py-5 flex items-center justify-between z-30 sticky top-0 bg-[#FFFBF5]/90 backdrop-blur-md border-b border-stone-200/40 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link 
                        to="/dashboard" 
                        className="group w-10 h-10 flex items-center justify-center text-[#6B4F4F]/60 hover:text-[#c43c27] transition-all bg-white rounded-xl border border-stone-200/50 shadow-sm"
                    >
                        <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </Link>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-stone-200/50">
                                <SparklesIcon className="w-5 h-5 text-teal-600 animate-pulse" />
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
                        </div>
                        <div>
                            <h1 className="font-bold text-base text-[#6B4F4F] tracking-tight">
                                Aruna AI
                            </h1>
                            <p className="text-[10px] text-green-600 font-bold tracking-wide">Online • Selalu Ada</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- CHAT AREA --- */}
            <main 
                ref={chatContainerRef}
                className="flex-grow px-6 pb-36 pt-6 overflow-y-auto z-10 custom-scrollbar scroll-smooth"
            >
                <div className="max-w-3xl mx-auto flex flex-col gap-6">
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                        >
                            {/* Bubble */}
                            <div className={`px-5.5 py-4 text-sm leading-6 shadow-sm border max-w-[85%] sm:max-w-[75%]
                                ${msg.role === 'user' 
                                    ? 'bg-gradient-to-br from-[#6B4F4F] to-[#5c4040] text-white rounded-[2rem] rounded-tr-sm border-transparent' 
                                    : 'bg-white/95 backdrop-blur-md text-[#6B4F4F] rounded-[2rem] rounded-tl-sm border-stone-200/55'}
                            `}>
                                <div className="whitespace-pre-wrap font-normal tracking-wide">
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isLoading && (
                        <div className="flex justify-start w-full">
                            <div className="bg-white/70 px-5.5 py-4 rounded-[2rem] rounded-tl-none flex gap-1.5 items-center border border-stone-200/40 w-fit shadow-sm">
                                <span className="w-1.5 h-1.5 bg-[#6B4F4F]/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-1.5 h-1.5 bg-[#6B4F4F]/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-1.5 h-1.5 bg-[#6B4F4F]/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* --- INPUT AREA --- */}
            <footer className="fixed bottom-0 left-0 w-full p-4 sm:p-6 z-30 bg-gradient-to-t from-[#FFFBF5] via-[#FFFBF5]/90 to-transparent">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xl p-2 pl-4 rounded-[2.25rem] shadow-md border border-stone-200/60 focus-within:border-[#6B4F4F]/30 focus-within:shadow-lg transition-all duration-300">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Tulis ceritamu di sini..."
                            className="flex-1 bg-transparent py-2.5 focus:outline-none text-[#6B4F4F] placeholder:text-stone-400 font-medium tracking-wide text-sm resize-none max-h-32 custom-scrollbar"
                            rows={1}
                            disabled={isLoading}
                            style={{ minHeight: '44px' }}
                        />
                        
                        <button 
                            onClick={() => handleSend()}
                            disabled={isLoading || input.trim() === ''}
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300
                                ${input.trim() === '' 
                                    ? 'bg-transparent text-stone-300 cursor-not-allowed' 
                                    : 'bg-[#6B4F4F] text-white hover:bg-[#5c4040] hover:scale-105 shadow-sm active:scale-95'}
                            `}
                            title="Kirim Pesan"
                        >
                            <PaperAirplaneIcon className="w-4.5 h-4.5 -ml-0.5 mt-0.5" />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}