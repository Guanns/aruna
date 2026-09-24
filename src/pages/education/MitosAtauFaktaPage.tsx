import React from 'react';
import { ArrowLeft, BookOpen, HelpCircle, Lightbulb, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MitosAtauFaktaPage() {
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
                        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 border border-rose-100">
                            Fitur EmpatiHUB
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
                        Mitos atau Fakta?
                    </h1>
                    <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-2xl">
                        Miskonsepsi yang beredar di masyarakat sering kali menyalahkan korban (*victim blaming*) atau menormalisasi kekerasan. Kenali kebenaran faktual untuk membangun empati yang sehat.
                    </p>
                </header>

                {/* Ringkasan Mitos vs Fakta Utama */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10">
                    {/* Kotak Mitos */}
                    <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 shadow-xs">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 border border-amber-100">
                            <HelpCircle className="w-5 h-5 shrink-0" />
                        </div>
                        <h2 className="text-lg font-bold text-stone-900 mb-2">
                            Miskonsepsi & Stigma Populer
                        </h2>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                            Banyak mitos menganggap kekerasan hanya terjadi pada malam hari di tempat sepi, atau mengaitkan kekerasan dengan pakaian korban. Faktanya, kekerasan dapat terjadi di mana saja oleh orang yang dikenal.
                        </p>
                    </div>

                    {/* Kotak Fakta */}
                    <div className="bg-white border border-teal-200 rounded-2xl p-6 sm:p-7 shadow-xs">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 border border-teal-100">
                            <Lightbulb className="w-5 h-5 shrink-0" />
                        </div>
                        <h2 className="text-lg font-bold text-stone-900 mb-2">
                            Fakta Berbasis Hukum & Psikologi
                        </h2>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                            Tanggung jawab mutlak kekerasan selalu berada pada pelaku, bukan korban. Persetujuan (*consent*) harus diberikan secara sadar, tanpa paksaan, dan dapat ditarik kapan saja.
                        </p>
                    </div>
                </div>

                {/* Area Status Persiapan / Eksplorasi */}
                <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto shadow-xs">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-6 h-6 shrink-0" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mb-2">
                        Kuis Uji Kebenaran Edukatif
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                        Pernyataan interaktif untuk menguji pemahaman mitos vs fakta sedang disiapkan untuk langkah berikutnya. Kamu dapat meninjau modul edukasi lainnya terlebih dahulu.
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
