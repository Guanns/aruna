import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlossaryFeature from '../../components/GlossaryFeature';

export default function GlossaryPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-900 font-poppins pb-24">
            <div className="max-w-6xl mx-auto px-5 md:px-8 pt-24 md:pt-28 relative z-10">
                
                {/* Header with integrated back button */}
                <header className="relative text-center mb-10 md:mb-12 max-w-2xl mx-auto">
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
                        Kamus Bahasa <span className="text-indigo-600">Gen Z</span>
                    </h1>
                    <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
                        Pelajari definisi istilah psikologi hubungan dan fenomena modern agar kamu lebih memahami situasi serta dapat menentukan batasan yang sehat.
                    </p>
                </header>

                {/* Main Glossary */}
                <GlossaryFeature />

            </div>
        </div>
    );
}