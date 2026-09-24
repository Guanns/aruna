import React from 'react';
import { ArrowLeft } from 'lucide-react';
import RedFlagQuiz from '../../components/RedFlagQuiz';
import { Link } from 'react-router-dom';

export default function QuizPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-900 font-poppins pb-24">
            <div className="max-w-4xl mx-auto px-5 md:px-6 pt-24 md:pt-28 relative z-10">
                
                {/* Header with integrated back button */}
                <header className="relative text-center mb-10 max-w-2xl mx-auto">
                    <div className="absolute left-0 top-0 sm:top-1 z-10">
                        <Link 
                            to="/education" 
                            className="p-2 -ml-2 rounded-full hover:bg-stone-200/60 text-stone-700 hover:text-stone-900 transition-colors inline-flex items-center justify-center shrink-0"
                            title="Kembali ke Edukasi"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight px-10 sm:px-14 mb-4">
                        Deteksi <span className="text-[#c43c27]">Red Flag Hubungan</span>
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