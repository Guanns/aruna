// app/chat/page.tsx

"use client";

import Link from 'next/link';
import { ArrowLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI, ChatSession, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

type Message = {
    role: 'user' | 'model';
    text: string;
};

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

const MODEL_NAME = "gemini-2.5-flash-lite";

const persona = `Kamu adalah "Aruna", teman AI yang penuh empati dan suportif. Tugasmu adalah menjadi ruang aman bagi pengguna untuk bercerita. Gunakan bahasa Indonesia yang hangat, ramah, dan mudah dimengerti. Berikan respons yang menenangkan dan validasi perasaan mereka. JANGAN memberikan nasihat medis atau hukum. Fokuslah untuk menjadi pendengar yang baik. Respons harus singkat, menenangkan, dan penuh perasaan.`;

export default function ChatPage() {
    const [chatSession, setChatSession] = useState<ChatSession | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: 'Hai kamuu 🤍 Welcome to Aruna AI! Your soft space to breathe, feel, and just be you 🌞 Aku tau banget kadang dunia terasa berat buat kamu, sedangkan kamu udah cape banget buat berjuang sendirian. Tapi heyyy.. kamu udah hebat banget bisa sampai di titik ini. 😸 You dont have to be okay all the time and its okay to feel everything. Di sini, kamu aman, didengar, dan nggak akan ada yang bisa judge kamu disini! Take your time, cerita boleh… nangis juga boleh. Aku di sini buat kamu🌻' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = async () => {
            try {
                const genAI = new GoogleGenerativeAI(API_KEY);
                const chat = genAI.getGenerativeModel({ model: MODEL_NAME })
                    .startChat({
                        history: [
                            { role: "user", parts: [{ text: persona }] },
                            { role: "model", parts: [{ text: "Tentu, saya mengerti peranku. Saya siap menjadi Aruna." }] }
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
                setMessages(prev => [...prev, { role: 'model', text: 'Oops! Gagal terhubung dengan AI. Periksa kembali API Key kamu ya.'}])
            }
        };
        initChat();
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading || !chatSession) return;

        const newUserMessage: Message = { role: 'user', text: input };
        const currentInput = input;

        setMessages(prev => [...prev, newUserMessage, { role: 'model', text: '' }]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chatSession.sendMessageStream(currentInput);

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                setMessages(prev => {
                    const lastMessageIndex = prev.length - 1;
                    const updatedMessages = [...prev];
                    updatedMessages[lastMessageIndex].text += chunkText;
                    return updatedMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => {
                const lastMessageIndex = prev.length - 1;
                const updatedMessages = [...prev];
                updatedMessages[lastMessageIndex].text = "Oops, ada sedikit gangguan. Coba lagi ya.";
                return updatedMessages;
            });
        }

        setIsLoading(false);
    };

    const pageStyle = {
      backgroundColor: '#FEFBF6',
      color: '#5C5470'
    };

    return (
        <div className="w-full h-screen flex flex-col" style={pageStyle}>
            <header className="bg-white/80 backdrop-blur-sm p-4 border-b border-gray-200 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/" className="text-gray-400 hover:text-gray-700">
                    <ArrowLeftIcon className="w-6 h-6" />
                </Link>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl shadow-sm">🌸</div>
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-gray-800">Aruna AI</h1>
                        <p className={`text-sm font-semibold ${isLoading ? 'text-gray-400' : 'text-green-500'}`}>
                            {isLoading ? 'sedang mengetik...' : 'Online'}
                        </p>
                    </div>
                </div>
            </header>

            <main className="flex-grow p-4 space-y-6 overflow-y-auto" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c8b4' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}>
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-10 h-10 ${msg.role === 'user' ? 'bg-orange-100 text-orange-500' : 'bg-pink-100 text-pink-500'} rounded-full flex items-center justify-center font-bold text-lg shadow-sm flex-shrink-0`}>
                            {msg.role === 'user' ? 'Y' : 'A'}
                        </div>
                        <div className={`p-4 rounded-2xl max-w-sm md:max-w-md lg:max-w-lg whitespace-pre-wrap shadow-md ${
                            msg.role === 'user' 
                            ? 'bg-blue-500 text-white rounded-tr-none' 
                            : 'bg-white text-gray-800 rounded-tl-none'
                        }`}>
                            {msg.text}
                            {isLoading && msg.role === 'model' && index === messages.length - 1 && <span className="inline-block w-2 h-4 bg-gray-600 animate-pulse ml-1"></span>}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </main>

            <footer className="p-4 bg-white/90 border-t border-gray-200 sticky bottom-0 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ketik ceritamu di sini..."
                        className="w-full p-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 transition-all transform hover:scale-110 active:scale-95" disabled={isLoading}>
                        <PaperAirplaneIcon className="w-6 h-6" />
                    </button>
                </div>
            </footer>
        </div>
    );
}