import React from 'react';
import RedFlagQuiz from '../../components/RedFlagQuiz';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function QuizPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-900 font-poppins pb-24">
            <div className="max-w-4xl mx-auto px-5 md:px-6 pt-24 md:pt-28 relative z-10">
                
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

                {/* Header without extra text above */}
                <header className="text-center mb-10 max-w-2xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
                        Deteksi <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Red Flag Hubungan</span>
                    </h1>
                    <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
                        Kadang tanda bahaya tidak disadari sejak awal. Jawab beberapa pertanyaan singkat ini secara objektif untuk melihat dinamika hubunganmu.
                    </p>
                    <p className="text-xs text-stone-400 mt-2 font-normal">
                        *Jawabanmu bersifat privat dan tidak disimpan di server mana pun.
                    </p>
                </header>

                {/* Quiz Card */}
                <div className="relative z-10">
                    <RedFlagQuiz />
                </div>

            </div>
        </div>
    );
}