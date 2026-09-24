import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Compass, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SubFeature {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    iconBoxClass: string;
    status: 'available' | 'soon';
    route?: string;
}

const subFeatures: SubFeature[] = [
    {
        id: 'sehari-menjadi-aku',
        title: 'Sehari Menjadi Aku',
        description: 'Simulasi interaktif untuk menyelami sudut pandang dan pengalaman emosional orang lain dalam situasi rentan.',
        icon: Compass,
        iconBoxClass: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
        status: 'soon',
    },
    {
        id: 'boleh-atau-jangan',
        title: 'Boleh atau Jangan?',
        description: 'Uji kepekaan dalam membedakan tindakan yang sehat dan wajar dengan perilaku manipulatif atau pelanggaran batasan.',
        icon: CheckCircle2,
        iconBoxClass: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
        status: 'soon',
    },
    {
        id: 'mitos-atau-fakta',
        title: 'Mitos atau Fakta?',
        description: 'Bongkar berbagai kesalahpahaman umum seputar relasi, persetujuan (consent), dan kekerasan seksual berbasis fakta serta regulasi.',
        icon: HelpCircle,
        iconBoxClass: 'bg-rose-50 text-rose-700 border border-rose-100',
        status: 'soon',
    },
];

export default function EmpatiHubPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-900 font-poppins pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-28">
                
                {/* Header Navigasi & Judul */}
                <header className="mb-10 sm:mb-12">
                    <div className="mb-4">
                        <Link 
                            to="/education" 
                            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm font-semibold transition-colors"
                            title="Kembali ke Menu Edukasi"
                        >
                            <ArrowLeft className="w-4 h-4 shrink-0" />
                            <span>Kembali ke Edukasi</span>
                        </Link>
                    </div>

                    <div className="max-w-2xl">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
                            Aruna EmpatiHUB
                        </h1>
                        <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
                            Ruang interaktif untuk melatih kepekaan, mengenali batasan sehat, dan membedakan mitos dari fakta dalam relasi personal.
                        </p>
                    </div>
                </header>

                {/* Grid 4 Sub-Fitur (2 Kolom Desktop, 1 Kolom Mobile) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {subFeatures.map((item) => {
                        const Icon = item.icon;
                        const isAvailable = item.status === 'available';

                        return (
                            <div 
                                key={item.id}
                                className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between transition-colors"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-3 mb-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.iconBoxClass}`}>
                                            <Icon className="w-6 h-6 shrink-0" />
                                        </div>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md shrink-0 ${
                                            isAvailable 
                                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                                                : 'bg-stone-100 text-stone-600'
                                        }`}>
                                            {isAvailable ? 'Tersedia' : 'Segera Hadir'}
                                        </span>
                                    </div>

                                    <h2 className="text-lg sm:text-xl font-bold text-stone-900 mb-2 leading-snug">
                                        {item.title}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed mb-6">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                                    {isAvailable && item.route ? (
                                        <Link
                                            to={item.route}
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-xl transition-colors whitespace-nowrap"
                                        >
                                            <span>Buka Fitur</span>
                                            <ArrowRight className="w-4 h-4 shrink-0 text-white/80" />
                                        </Link>
                                    ) : (
                                        <div className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-100 text-stone-400 text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-xl cursor-not-allowed whitespace-nowrap">
                                            <Clock className="w-3.5 h-3.5 shrink-0" />
                                            <span>Segera Hadir</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
