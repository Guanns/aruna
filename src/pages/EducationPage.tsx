import React from 'react';
import { Link } from 'react-router-dom';
import { 
    BookOpenIcon, 
    ArrowLeftIcon,
    ScaleIcon,
    ChatBubbleLeftRightIcon,
    ShieldExclamationIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

const articles = [
    {
        slug: 'mengenal-gaslighting',
        title: 'Mengenal Apa Itu Gaslighting dan Cara Menghadapinya',
        snippet: 'Gaslighting adalah bentuk manipulasi psikologis yang membuat seseorang meragukan kewarasan mereka sendiri. Pelajari pola dan langkah mengatasinya.',
        category: 'Kesehatan Mental',
        categoryColor: 'text-purple-700 bg-purple-50',
    },
    {
        slug: 'kekerasan-dalam-pacaran',
        title: 'Tanda-Tanda Kekerasan dalam Pacaran (KDP)',
        snippet: 'Kekerasan bukan hanya fisik. Kenali tanda-tanda kekerasan emosional, digital, dan finansial yang sering terabaikan sejak dini.',
        category: 'Relasi Sehat',
        categoryColor: 'text-rose-700 bg-rose-50',
    },
    {
        slug: 'menjaga-privasi-digital',
        title: 'Panduan Praktis Menjaga Privasi di Media Sosial',
        snippet: 'Akunmu adalah ruang pribadimu. Pelajari langkah praktis untuk mengamankan media sosial dan aplikasi perpesanan dari penguntit.',
        category: 'Keamanan Digital',
        categoryColor: 'text-teal-700 bg-teal-50',
    },
    {
        slug: 'membangun-batasan-sehat',
        title: 'Pentingnya Membangun Batasan (Boundaries)',
        snippet: 'Mengatakan tidak bukan berarti egois. Membangun batasan yang sehat adalah bentuk penghargaan tertinggi terhadap integritas diri sendiri.',
        category: 'Pengembangan Diri',
        categoryColor: 'text-amber-800 bg-amber-50',
    }
];

const educationModules = [
    {
        to: '/education/quiz',
        titlePrefix: 'Deteksi ',
        titleGradient: 'Red Flag Hubungan',
        gradientClass: 'from-rose-600 to-pink-600',
        description: 'Evaluasi kesehatan hubunganmu melalui instrumen kuis terarah untuk mengenali pola manipulasi, dominasi, atau tanda bahaya sejak awal.',
        actionText: 'Mulai Deteksi',
        icon: ShieldExclamationIcon,
        iconBox: 'bg-rose-50 text-rose-600 border border-rose-100',
    },
    {
        to: '/education/glossary',
        titlePrefix: 'Kamus Bahasa ',
        titleGradient: 'Gen Z',
        gradientClass: 'from-indigo-600 via-purple-600 to-pink-600',
        description: 'Pahami makna istilah penting seputar relasi modern, manipulasi psikologis, dan kesetaraan seperti Love Bombing, Gaslighting, dan boundaries.',
        actionText: 'Buka Kamus',
        icon: BookOpenIcon,
        iconBox: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    },
    {
        to: '/education/simulation',
        titlePrefix: 'Simulasi Menolak ',
        titleGradient: 'Tekanan',
        gradientClass: 'from-teal-600 to-emerald-600',
        description: 'Latihan interaktif menolak ajakan yang membuat tidak nyaman atau memaksa dalam situasi simulasi percakapan nyata yang aman.',
        actionText: 'Mulai Latihan',
        icon: ChatBubbleLeftRightIcon,
        iconBox: 'bg-teal-50 text-teal-600 border border-teal-100',
    },
    {
        to: '/education/law',
        titlePrefix: 'Dasar Regulasi & ',
        titleGradient: 'Hak Hukum',
        gradientClass: 'from-amber-600 to-orange-600',
        description: 'Pelajari instrumen undang-undang perlindungan hukum di Indonesia (UU TPKS, PKDRT, Perlindungan Anak, dan ITE) untuk membela hakmu.',
        actionText: 'Pelajari Regulasi',
        icon: ScaleIcon,
        iconBox: 'bg-amber-50 text-amber-700 border border-amber-100',
    }
];

export default function EducationPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-900 font-poppins pb-24">
            <div className="max-w-6xl mx-auto px-5 md:px-8 pt-24 md:pt-28">
                
                {/* Back Button */}
                <div className="mb-6">
                    <Link 
                        to="/dashboard" 
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-stone-900 hover:border-stone-300 transition-colors text-sm font-semibold shadow-xs"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        <span>Kembali ke Dashboard</span>
                    </Link>
                </div>

                {/* Hero Header */}
                <header className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
                        Edukasi & <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 bg-clip-text text-transparent">Perlindungan Diri</span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-stone-600 font-normal leading-relaxed">
                        Kumpulan modul interaktif dan panduan komprehensif untuk memahami batasan personal, keamanan digital, serta hak perlindungan hukum.
                    </p>
                </header>

                {/* Modern Bento Grid (2x2) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {educationModules.map((mod) => {
                        const Icon = mod.icon;
                        return (
                            <div 
                                key={mod.to}
                                className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-5">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${mod.iconBox}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2.5">
                                        {mod.titlePrefix}
                                        <span className={`bg-gradient-to-r ${mod.gradientClass} bg-clip-text text-transparent`}>
                                            {mod.titleGradient}
                                        </span>
                                    </h2>
                                    <p className="text-sm text-stone-600 font-normal leading-relaxed mb-6">
                                        {mod.description}
                                    </p>
                                </div>
                                
                                <div className="pt-2">
                                    <Link
                                        to={mod.to}
                                        className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-colors"
                                    >
                                        <span>{mod.actionText}</span>
                                        <ArrowRightIcon className="w-4 h-4 text-white/80" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Section: Artikel & Wawasan */}
                <div className="border-t border-stone-200/80 pt-12">
                    <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                            Artikel & <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">Wawasan</span>
                        </h2>
                        <p className="text-sm text-stone-600 font-normal">
                            Panduan praktis menjaga privasi, kesehatan mental, dan batasan personal.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        {articles.map((article) => (
                            <div 
                                key={article.slug}
                                className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between"
                            >
                                <div>
                                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md mb-3 ${article.categoryColor}`}>
                                        {article.category}
                                    </span>
                                    <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2.5 leading-snug">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-stone-600 font-normal leading-relaxed mb-6">
                                        {article.snippet}
                                    </p>
                                </div>
                                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700">
                                    <span>Panduan Singkat</span>
                                    <span className="text-stone-400 font-normal">Aruna Edu</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}