import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BolehAtauJanganPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-900 font-poppins pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-28">
                
                {/* Navigasi Kembali */}
                <div className="mb-6 sm:mb-8">
                    <Link 
                        to="/education/empati-hub" 
                        className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm font-semibold transition-colors"
                        title="Kembali ke EmpatiHUB"
                    >
                        <ArrowLeft className="w-4 h-4 shrink-0" />
                        <span>Kembali ke EmpatiHUB</span>
                    </Link>
                </div>

                {/* Header Konten */}
                <header className="mb-8 sm:mb-10">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                            Fitur EmpatiHUB
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
                        Boleh atau Jangan?
                    </h1>
                    <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-2xl">
                        Pelajari dan uji pemahamanmu dalam membedakan tindakan wajar yang menghargai batasan pasangan (Boleh) serta perilaku manipulatif atau dominasi yang perlu dihindari (Jangan).
                    </p>
                </header>

                {/* Ringkasan Konsep Utama */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10">
                    {/* Kotak Boleh */}
                    <div className="bg-white border border-emerald-200 rounded-2xl p-6 sm:p-7 shadow-xs">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-100">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                        </div>
                        <h2 className="text-lg font-bold text-stone-900 mb-2">
                            Kategori "Boleh" (Sehat & Suportif)
                        </h2>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                            Tindakan yang didasari rasa saling menghargai ruang pribadi, persetujuan sadar (consent), komunikasi terbuka tanpa paksaan, dan dukungan emosional timbal balik.
                        </p>
                    </div>

                    {/* Kotak Jangan */}
                    <div className="bg-white border border-rose-200 rounded-2xl p-6 sm:p-7 shadow-xs">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4 border border-rose-100">
                            <XCircle className="w-5 h-5 shrink-0" />
                        </div>
                        <h2 className="text-lg font-bold text-stone-900 mb-2">
                            Kategori "Jangan" (Red Flag & Manipulatif)
                        </h2>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                            Perilaku yang melanggar privasi (seperti memaksa meminta password), melarang pertemanan, mengancam secara emosional, atau memaksakan kehendak sepihak.
                        </p>
                    </div>
                </div>

                {/* Area Status Persiapan / Eksplorasi */}
                <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto shadow-xs">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-6 h-6 shrink-0" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">
                        Modul Skenario Interaktif
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                        Kumpulan skenario situasi harian sedang disiapkan untuk langkah berikutnya. Kamu dapat meninjau modul edukasi lainnya terlebih dahulu.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link 
                            to="/education/empati-hub" 
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-xl transition-colors whitespace-nowrap"
                        >
                            <span>Daftar Sub-Fitur</span>
                        </Link>
                        <Link 
                            to="/education" 
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-xl transition-colors whitespace-nowrap"
                        >
                            <ShieldCheck className="w-4 h-4 shrink-0" />
                            <span>Kembali ke Edukasi</span>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
