import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Globe, Home, Scale, ShieldCheck, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const LAW_CATEGORIES = [
    {
        id: 'domestic',
        title: 'Ranah Domestik / Rumah Tangga',
        subtitle: 'UU No. 23 Tahun 2004 tentang PKDRT',
        shortTitle: 'Ranah Domestik',
        icon: Home,
        laws: [
            { article: 'Pasal 44 UU PKDRT', type: 'Kekerasan Fisik', detail: 'Melarang kekerasan fisik dalam lingkup rumah tangga. Pelaku terancam pidana penjara maksimal 5 tahun (atau hingga 15 tahun jika mengakibatkan luka berat atau kematian).' },
            { article: 'Pasal 45 UU PKDRT', type: 'Kekerasan Psikis', detail: 'Melarang tindakan yang mengakibatkan ketakutan, hilangnya rasa percaya diri, hilangnya kemampuan bertindak, atau penderitaan psikis berat pada korban.' },
            { article: 'Pasal 46 UU PKDRT', type: 'Kekerasan Seksual', detail: 'Melarang pemaksaan hubungan seksual dalam lingkup rumah tangga, baik terhadap istri/suami maupun orang yang menetap di dalam rumah.' },
            { article: 'Pasal 49 UU PKDRT', type: 'Kekerasan Ekonomi (Penelantaran)', detail: 'Melarang penelantaran terhadap orang yang berada di lingkup rumah tangga yang secara hukum wajib ia rawat, beri makan, atau pelihara.' }
        ]
    },
    {
        id: 'children',
        title: 'Korban Anak-Anak (< 18 Tahun)',
        subtitle: 'UU No. 35 Tahun 2014 tentang Perlindungan Anak',
        shortTitle: 'Perlindungan Anak',
        icon: User,
        laws: [
            { article: 'Pasal 76C jo. Pasal 80', type: 'Kekerasan Fisik & Psikis', detail: 'Melarang keras tindakan menempatkan, membiarkan, melakukan, menyuruh, atau turut serta melakukan kekerasan fisik maupun mental terhadap anak.' },
            { article: 'Pasal 76D & 76E jo. Pasal 81 & 82', type: 'Kekerasan Seksual', detail: 'Melarang pemaksaan persetubuhan (pemerkosaan) atau pencabulan terhadap anak dengan ancaman pidana minimal 5 tahun dan maksimal 15 tahun penjara.' },
            { article: 'Pasal 76A', type: 'Kekerasan Verbal (Diskriminasi)', detail: 'Melarang perlakuan diskriminatif terhadap anak yang mengakibatkan kerugian materiil maupun moril serta menghambat perkembangannya.' },
            { article: 'Pasal 76I jo. Pasal 88', type: 'Kekerasan Ekonomi (Eksploitasi)', detail: 'Melarang eksploitasi ekonomi maupun seksual terhadap anak dengan maksud menguntungkan diri sendiri atau menyalahgunakan anak secara paksa.' }
        ]
    },
    {
        id: 'public',
        title: 'Korban Perempuan (Publik & Digital)',
        subtitle: 'Kombinasi UU TPKS, UU ITE, & UU TPPO',
        shortTitle: 'Publik & Digital',
        icon: Globe,
        laws: [
            { article: 'Pasal 5 UU No. 12 Tahun 2022 (UU TPKS)', type: 'Pelecehan Seksual Non-Fisik', detail: 'Pernyataan verbal, gestur intimidatif, atau catcalling seksual yang merendahkan martabat terancam penjara maksimal 9 bulan dan/atau denda.' },
            { article: 'Pasal 6 UU TPKS', type: 'Pelecehan Seksual Fisik', detail: 'Menyentuh atau melecehkan fisik korban secara seksual di ranah publik terancam hukuman hingga 4 tahun (atau 12 tahun jika ada relasi kuasa).' },
            { article: 'Pasal 14 UU TPKS', type: 'Kekerasan Seksual Berbasis Elektronik (KSBE)', detail: 'Melarang penyebaran konten seksual pribadi (revenge porn), perekaman rahasia, atau pemerasan bermuatan seksual melalui media elektronik.' },
            { article: 'Pasal 27A & 29 UU ITE', type: 'Kekerasan Verbal & Psikis Digital', detail: 'Melarang transmisi informasi bermuatan pencemaran nama baik, penghinaan berat, ancaman kekerasan fisik, atau intimidasi pribadi secara online.' },
            { article: 'UU No. 21 Tahun 2007 (UU TPPO)', type: 'Eksploitasi Ekonomi Berat (Perdagangan Orang)', detail: 'Melarang pengiriman, penampungan, atau perekrutan korban dengan modus penipuan atau paksaan untuk tujuan eksploitasi kerja paksa atau seksual.' }
        ]
    }
];

export default function LawPage() {
    const [activeTab, setActiveTab] = useState('domestic');
    const [selectedLaw, setSelectedLaw] = useState<{ article: string; type: string; detail: string } | null>(null);

    const activeCategory = LAW_CATEGORIES.find(c => c.id === activeTab) || LAW_CATEGORIES[0];

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-900 font-poppins pb-24">
            <div className="max-w-6xl mx-auto px-5 md:px-8 pt-24 md:pt-28 relative z-10">
                
                {/* Header with integrated back button */}
                <header className="relative text-center mb-12 max-w-2xl mx-auto">
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
                        Dasar Regulasi & <span className="text-amber-600">Hak Hukum</span>
                    </h1>
                    <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
                        Landasan regulasi konstitusional di Indonesia yang melindungi hak korban kekerasan fisik, psikis, seksual, maupun digital.
                    </p>
                </header>

                {/* Tab Controls */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8 max-w-3xl mx-auto">
                    {LAW_CATEGORIES.map(category => {
                        const IconComponent = category.icon;
                        const isActive = activeTab === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setActiveTab(category.id);
                                    setSelectedLaw(null);
                                }}
                                className={`flex items-center gap-3 py-3 px-4 rounded-xl border text-left transition-colors w-full sm:w-1/3
                                    ${isActive 
                                        ? 'bg-stone-900 border-stone-900 text-white' 
                                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                                    }
                                `}
                            >
                                <div className={`p-2 rounded-lg ${isActive ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600'}`}>
                                    <IconComponent className="w-4 h-4" />
                                </div>
                                <span className="font-semibold text-xs sm:text-sm tracking-tight">{category.shortTitle}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Active Category Header */}
                <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shadow-xs">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-stone-900">{activeCategory.title}</h2>
                        <p className="text-xs sm:text-sm text-stone-500 font-normal mt-0.5">{activeCategory.subtitle}</p>
                    </div>
                </div>

                {/* Law Grid and Detail Column */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* List of Laws */}
                    <div className="lg:col-span-7 space-y-3">
                        <h4 className="font-semibold text-stone-500 text-xs uppercase tracking-wider mb-2 px-1">Daftar Pasal & Regulasi</h4>
                        {activeCategory.laws.map((law, idx) => {
                            const isSelected = selectedLaw?.article === law.article;
                            return (
                                <div key={idx} className="space-y-2">
                                    <div
                                        onClick={() => setSelectedLaw(isSelected ? null : law)}
                                        className={`p-5 rounded-2xl border transition-colors cursor-pointer flex justify-between items-center
                                            ${isSelected 
                                                ? 'bg-stone-900 border-stone-900 text-white shadow-xs' 
                                                : 'bg-white border-stone-200 text-stone-900 hover:border-stone-300 shadow-xs'
                                            }
                                        `}
                                    >
                                        <div className="space-y-1 pr-3">
                                            <h4 className="font-bold text-base tracking-tight">
                                                {law.article}
                                            </h4>
                                            <p className={`text-xs font-semibold ${isSelected ? 'text-stone-300' : 'text-amber-700'}`}>
                                                {law.type}
                                            </p>
                                        </div>
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                                            ${isSelected ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-500'}
                                        `}>
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Mobile Accordion */}
                                    {isSelected && (
                                        <div className="block lg:hidden bg-white border border-stone-200 rounded-2xl p-5 shadow-xs text-xs sm:text-sm text-stone-600 leading-relaxed">
                                            {law.detail}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Detail Panel (Desktop only) */}
                    <div className="hidden lg:block lg:col-span-5">
                        <div className="flex items-center gap-2 mb-3 px-1">
                            <ShieldCheck className="w-4 h-4 text-stone-500" />
                            <h4 className="font-semibold text-stone-500 text-xs uppercase tracking-wider">Uraian Ketentuan</h4>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs min-h-[280px] flex flex-col justify-between">
                            {selectedLaw ? (
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-stone-900">{selectedLaw.article}</h3>
                                        <p className="text-xs font-semibold text-amber-700 mt-1">{selectedLaw.type}</p>
                                    </div>
                                    <div className="h-px bg-stone-100"></div>
                                    <p className="text-sm text-stone-600 font-normal leading-relaxed">
                                        {selectedLaw.detail}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-center my-auto text-stone-400">
                                    <Scale className="w-8 h-8 mb-2 text-stone-300" />
                                    <p className="text-xs font-normal">Pilih salah satu pasal di sebelah kiri untuk membaca uraian hukum lengkap.</p>
                                </div>
                            )}
                            <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-400 font-normal">
                                Sumber Rujukan: Undang-Undang Republik Indonesia
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
