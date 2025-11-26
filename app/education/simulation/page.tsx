// app/education/simulation/page.tsx

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon, EyeIcon } from '@heroicons/react/24/solid';
import ChatSimulator from '../../../components/ChatSimulator';

export default function SimulationPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20">
             
             {/* --- BACKGROUND FX --- */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className="absolute top-[-10%] left-[30%] w-[600px] h-[600px] bg-teal-300/10 rounded-full blur-[100px]"></div>
                 <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-blue-300/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
                
                {/* --- NAVIGATION HEADER --- */}
                <nav className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <Link 
                        href="/education" 
                        className="group flex items-center gap-3 text-[#6B4F4F]/60 hover:text-teal-600 transition-all px-5 py-2.5 rounded-full bg-white/40 hover:bg-white border border-transparent hover:border-teal-200 shadow-sm hover:shadow-md backdrop-blur-sm"
                    >
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform text-teal-500">
                             <ArrowLeftIcon className="w-4 h-4"/>
                        </div>
                        <span className="font-bold text-sm tracking-wide">Kembali</span>
                    </Link>
                    
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-teal-50 to-white border border-teal-200 shadow-sm">
                        <ChatBubbleLeftRightIcon className="w-4 h-4 text-teal-600" />
                        <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Chat Simulator</span>
                    </div>

                    <div className="hidden md:block w-[120px]"></div>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    {/* --- LEFT COLUMN: GUIDE --- */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#6B4F4F]">
                                Latihan Menolak <br/>
                                <span className="font-serif italic text-teal-600">Tanpa Rasa Takut</span>
                            </h1>
                            <p className="text-lg opacity-70 leading-relaxed">
                                Sering bingung cara membalas chat yang bikin nggak nyaman? Di sini kamu bisa berlatih menghadapi situasi sulit dalam lingkungan yang aman.
                            </p>
                        </div>

                        {/* PANDUAN CARD */}
                        <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-8 border border-white/60 shadow-lg">
                            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                                <EyeIcon className="w-6 h-6 text-teal-500" />
                                Cara Menggunakan:
                            </h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Baca Situasi</h4>
                                        <p className="text-sm text-gray-600 mt-1">Bot akan berperan sebagai orang asing. Baca chat-nya baik-baik.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Pilih Responmu</h4>
                                        <p className="text-sm text-gray-600 mt-1">Pilih balasan yang menurutmu paling tepat. Jangan takut salah!</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Pelajari Feedback</h4>
                                        <p className="text-sm text-gray-600 mt-1">Aruna akan memberitahu apakah responmu aman atau berisiko.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl text-sm text-yellow-800 opacity-80">
                            <span className="font-bold">Catatan:</span> Ini hanya simulasi. Dalam dunia nyata, jika merasa terancam, segera blokir dan laporkan.
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: SIMULATOR --- */}
                    <div className="relative">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-teal-400 blur-[60px] opacity-20 rounded-full"></div>
                        <div className="relative z-10">
                             <ChatSimulator />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}