// app/chat/page.tsx
// VERSI FIX: API Key Otomatis & Font Jelas (Mudah Dibaca)

"use client";

import Link from 'next/link';
import { ArrowLeftIcon, PaperAirplaneIcon, SparklesIcon, FaceSmileIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI, ChatSession, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// --- KONFIGURASI ---
// API Key langsung saya masukkan di sini supaya tidak error lagi.
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyBSD9GIOFdi44WOnGWmPkE1J9UHnd0bp74"; 

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
    const chatEndRef = useRef<HTMLDivElement>(null);

    // 1. Inisialisasi Chat
    useEffect(() => {
        const initChat = async () => {
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
            } catch (error) {
                console.error("Gagal inisialisasi AI:", error);
            }
        };
        initChat();
    }, []);

    // 2. Smart Auto Scroll
    useEffect(() => {
        if (messages.length > 1) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1].text = "Sinyal hatiku terputus sebentar... Coba cerita lagi ya? 🍂";
                return newHistory;
            });
        }
        setIsLoading(false);
    };

    return (
        <div className="w-full h-screen flex flex-col bg-[#FFFBF5] relative overflow-hidden font-sans">
            
            {/* --- CLEAN BACKGROUND --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                 <div className="absolute top-[-50%] right-[-20%] w-[1000px] h-[1000px] bg-teal-50/60 rounded-full blur-[120px] animate-pulse" style={{animationDuration: '10s'}}></div>
                 <div className="absolute bottom-[-20%] left-[-20%] w-[800px] h-[800px] bg-rose-50/60 rounded-full blur-[120px] animate-pulse" style={{animationDuration: '15s'}}></div>
                 <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')] mix-blend-multiply"></div>
            </div>

            {/* --- HEADER --- */}
            <header className="px-6 py-6 flex items-center gap-6 z-30 sticky top-0 bg-gradient-to-b from-[#FFFBF5] via-[#FFFBF5]/95 to-transparent backdrop-blur-sm">
                <Link 
                    href="/dashboard" 
                    className="group w-10 h-10 flex items-center justify-center text-[#6B4F4F]/60 hover:text-[#c43c27] transition-colors bg-white/50 rounded-full border border-white/50"
                >
                    <ArrowLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </Link>
                
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100">
                            <SparklesIcon className="w-5 h-5 text-teal-500" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-[#FFFBF5]"></span>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl text-[#6B4F4F] tracking-tight">
                            Aruna AI
                        </h1>
                        <p className="text-xs text-[#6B4F4F]/50 font-medium">Selalu ada untukmu</p>
                    </div>
                </div>
            </header>

            {/* --- CHAT AREA --- */}
            <main className="flex-grow px-6 pb-32 pt-4 overflow-y-auto z-10 custom-scrollbar scroll-smooth">
                <div className="max-w-3xl mx-auto flex flex-col gap-6">
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`flex gap-4 w-full ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in-up`}
                        >
                            {/* Bubble */}
                            <div className={`relative px-6 py-5 text-[15px] leading-7 shadow-sm border
                                ${msg.role === 'user' 
                                    ? 'bg-[#6B4F4F] text-white rounded-[2rem] rounded-tr-sm border-transparent' 
                                    : 'bg-white/90 backdrop-blur-xl text-[#6B4F4F] rounded-[2rem] rounded-tl-sm border-white/60'}
                            `}>
                                {/* FONT DIPERBAIKI: Tidak lagi italic/serif, melainkan sans-serif yang bersih */}
                                <div className="whitespace-pre-wrap font-normal tracking-wide">
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isLoading && (
                        <div className="flex gap-4 w-full">
                            <div className="bg-white/60 px-5 py-4 rounded-[2rem] rounded-tl-none flex gap-1.5 items-center border border-white/30 w-fit">
                                <span className="w-2 h-2 bg-[#6B4F4F]/40 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-[#6B4F4F]/40 rounded-full animate-bounce delay-100"></span>
                                <span className="w-2 h-2 bg-[#6B4F4F]/40 rounded-full animate-bounce delay-200"></span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            </main>

            {/* --- INPUT AREA --- */}
            <footer className="fixed bottom-0 left-0 w-full p-6 z-30">
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF5] via-[#FFFBF5] to-transparent h-full -z-10"></div>
                
                <div className="max-w-3xl mx-auto">
                    <div className="relative flex items-end gap-2 bg-white/90 backdrop-blur-2xl p-2 pl-4 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white ring-1 ring-[#6B4F4F]/5 transition-all focus-within:shadow-[0_8px_40px_rgba(20,184,166,0.1)]">
                        
                        <div className="pb-3 text-[#6B4F4F]/30 hover:text-teal-600 transition-colors cursor-pointer">
                            <FaceSmileIcon className="w-6 h-6" />
                        </div>
                        
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Tulis ceritamu..."
                            className="flex-1 bg-transparent py-3 focus:outline-none text-[#6B4F4F] placeholder:text-[#6B4F4F]/30 font-medium tracking-wide text-base resize-none max-h-32 custom-scrollbar"
                            rows={1}
                            disabled={isLoading}
                            style={{ minHeight: '50px' }}
                        />
                        
                        <button 
                            onClick={() => handleSend()}
                            disabled={isLoading || input.trim() === ''}
                            className={`w-12 h-12 rounded-full transition-all duration-500 flex items-center justify-center mb-1
                                ${input.trim() === '' 
                                    ? 'bg-transparent text-stone-300 cursor-not-allowed' 
                                    : 'bg-[#6B4F4F] text-white hover:scale-105 shadow-md'}
                            `}
                        >
                            <PaperAirplaneIcon className="w-5 h-5 -ml-0.5 mt-0.5" />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}