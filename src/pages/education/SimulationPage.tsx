import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { EyeIcon } from '@heroicons/react/24/outline';
import ChatSimulator from '../../components/ChatSimulator';

export default function SimulationPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-900 font-poppins pb-24">
            <div className="max-w-6xl mx-auto px-5 md:px-8 pt-24 md:pt-28 relative z-10">
                
                {/* Back Button */}
                <div className="mb-6">
                    <Link 
                        to="/education" 
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-stone-900 hover:border-stone-300 transition-colors text-sm font-semibold shadow-xs"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        <span>Kembali ke Edukasi</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* Left Column: Guide */}
                    <div className="lg:col-span-6 space-y-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
                                Latihan Menolak <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Tekanan</span>
                            </h1>
                            <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
                                Sering merasa bingung atau sungkan saat menghadapi chat yang membuat tidak nyaman? Latih ketegasanmu di ruang simulasi percakapan yang aman.
                            </p>
                        </div>

                        {/* Guide Card */}
                        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs">
                            <h3 className="font-bold text-base sm:text-lg text-stone-900 mb-5 flex items-center gap-2">
                                <EyeIcon className="w-5 h-5 text-teal-600" />
                                <span>Petunjuk Penggunaan</span>
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex gap-3.5">
                                    <div className="w-7 h-7 bg-stone-100 text-stone-800 rounded-lg flex items-center justify-center font-bold text-xs shrink-0">1</div>
                                    <div>
                                        <h4 className="font-semibold text-stone-900">Pahami Konteks Skenario</h4>
                                        <p className="text-stone-600 text-xs sm:text-sm mt-0.5">Pilih salah satu skenario interaksi yang ingin kamu latih.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3.5">
                                    <div className="w-7 h-7 bg-stone-100 text-stone-800 rounded-lg flex items-center justify-center font-bold text-xs shrink-0">2</div>
                                    <div>
                                        <h4 className="font-semibold text-stone-900">Pilih Responmu</h4>
                                        <p className="text-stone-600 text-xs sm:text-sm mt-0.5">Tentukan jawaban respon terbaik menurut batasan personalmu.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3.5">
                                    <div className="w-7 h-7 bg-stone-100 text-stone-800 rounded-lg flex items-center justify-center font-bold text-xs shrink-0">3</div>
                                    <div>
                                        <h4 className="font-semibold text-stone-900">Evaluasi Analisis</h4>
                                        <p className="text-stone-600 text-xs sm:text-sm mt-0.5">Simulasi akan memberikan tinjauan objektif terkait tingkat risiko jawabanmu.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600 leading-relaxed">
                            <strong className="text-stone-800">Catatan Privasi:</strong> Seluruh simulasi berlangsung lokal pada browsermu dan tidak merekam identitas pengguna.
                        </div>
                    </div>

                    {/* Right Column: Simulator */}
                    <div className="lg:col-span-6">
                        <ChatSimulator />
                    </div>

                </div>
            </div>
        </div>
    );
}