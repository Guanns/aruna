import React from 'react';
import { ArrowLeft, ArrowRight, BookOpen, HeartHandshake, MessagesSquare, Scale, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
    {
        slug: 'mengenal-gaslighting',
        title: 'Mengenal Apa Itu Gaslighting dan Cara Menghadapinya',
        snippet: 'Gaslighting adalah bentuk manipulasi psikologis yang membuat seseorang meragukan kewarasan mereka sendiri. Pelajari pola dan langkah mengatasinya.',
        category: 'Kesehatan Mental',
        categoryColor: 'text-purple-700 bg-purple-50 border border-purple-100',
    },
    {
        slug: 'kekerasan-dalam-pacaran',
        title: 'Tanda-Tanda Kekerasan dalam Pacaran (KDP)',
        snippet: 'Kekerasan bukan hanya fisik. Kenali tanda-tanda kekerasan emosional, digital, dan finansial yang sering terabaikan sejak dini.',
        category: 'Relasi Sehat',
        categoryColor: 'text-rose-700 bg-rose-50 border border-rose-100',
    },
    {
        slug: 'menjaga-privasi-digital',
        title: 'Panduan Praktis Menjaga Privasi di Media Sosial',
        snippet: 'Akunmu adalah ruang pribadimu. Pelajari langkah praktis untuk mengamankan media sosial dan aplikasi perpesanan dari penguntit.',
        category: 'Keamanan Digital',
        categoryColor: 'text-teal-700 bg-teal-50 border border-teal-100',
    },
    {
        slug: 'membangun-batasan-sehat',
        title: 'Pentingnya Membangun Batasan (Boundaries)',
        snippet: 'Mengatakan tidak bukan berarti egois. Membangun batasan yang sehat adalah bentuk penghargaan tertinggi terhadap integritas diri sendiri.',
        category: 'Pengembangan Diri',
        categoryColor: 'text-amber-800 bg-amber-50 border border-amber-100',
    }
];

const educationModules = [
    {
        to: '/education/empati-hub',
        title: 'Aruna EmpatiHUB',
        badge: 'Modul Unggulan',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-100',
        description: 'Pusat eksplorasi empati interaktif untuk mengenali batasan sehat, membedakan mitos dari fakta, dan memahami ragam sudut pandang.',
        actionText: 'Masuk EmpatiHUB',
        icon: HeartHandshake,
        iconBox: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    },
    {
        to: '/education/quiz',
        title: 'Deteksi Red Flag Hubungan',
        badge: 'Kuis Evaluasi',
        badgeClass: 'bg-rose-50 text-rose-800 border-rose-100',
        description: 'Evaluasi kesehatan hubunganmu melalui instrumen kuis terarah untuk mengenali pola manipulasi, dominasi, atau tanda bahaya sejak awal.',
        actionText: 'Mulai Deteksi',
        icon: ShieldAlert,
        iconBox: 'bg-rose-50 text-rose-600 border border-rose-100',
    },
    {
        to: '/education/glossary',
        title: 'Kamus Bahasa Gen Z',
        badge: 'Glosarium Istilah',
        badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-100',
        description: 'Pahami makna istilah penting seputar relasi modern, manipulasi psikologis, dan kesetaraan seperti Love Bombing, Gaslighting, dan boundaries.',
        actionText: 'Buka Kamus',
        icon: BookOpen,
        iconBox: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    },
    {
        to: '/education/simulation',
        title: 'Simulasi Menolak Tekanan',
        badge: 'Latihan Interaktif',
        badgeClass: 'bg-teal-50 text-teal-800 border-teal-100',
        description: 'Latihan interaktif menolak ajakan yang membuat tidak nyaman atau memaksa dalam situasi simulasi percakapan nyata yang aman.',
        actionText: 'Mulai Latihan',
        icon: MessagesSquare,
        iconBox: 'bg-teal-50 text-teal-600 border border-teal-100',
    },
    {
        to: '/education/law',
        title: 'Dasar Regulasi & Hak Hukum',
        badge: 'Panduan Regulasi',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-100',
        description: 'Pelajari instrumen undang-undang perlindungan hukum di Indonesia (UU TPKS, PKDRT, Perlindungan Anak, dan ITE) untuk membela hakmu.',
        actionText: 'Pelajari Regulasi',
        icon: Scale,
        iconBox: 'bg-amber-50 text-amber-700 border border-amber-100',
    }
];

export default function EducationPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-900 font-poppins pb-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-28">
                
                {/* Header Navigasi & Judul */}
                <header className="mb-10 sm:mb-12">
                    <div className="mb-4">
                        <Link 
                            to="/" 
                            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm font-semibold transition-colors"
                            title="Kembali ke Beranda"
                        >
                            <ArrowLeft className="w-4 h-4 shrink-0" />
                            <span>Kembali ke Beranda</span>
                        </Link>
                    </div>

                    <div className="max-w-3xl">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight mb-3">
                            Edukasi & <span className="text-[#c43c27]">Perlindungan Diri</span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-stone-600 font-normal leading-relaxed">
                            Kumpulan modul interaktif dan panduan komprehensif untuk memahami batasan personal, keamanan digital, serta hak perlindungan hukum.
                        </p>
                    </div>
                </header>

                {/* Grid Modul Edukasi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-16">
                    {educationModules.map((mod) => {
                        const Icon = mod.icon;
                        return (
                            <div 
                                key={mod.to}
                                className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 md:p-8 shadow-xs flex flex-col justify-between transition-colors"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-3 mb-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${mod.iconBox}`}>
                                            <Icon className="w-6 h-6 shrink-0" />
                                        </div>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border shrink-0 ${mod.badgeClass}`}>
                                            {mod.badge}
                                        </span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 leading-snug">
                                        {mod.title}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed mb-6">
                                        {mod.description}
                                    </p>
                                </div>
                                
                                <div className="pt-2 border-t border-stone-100 flex items-center justify-start">
                                    <Link
                                        to={mod.to}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl transition-colors whitespace-nowrap"
                                    >
                                        <span>{mod.actionText}</span>
                                        <ArrowRight className="w-4 h-4 shrink-0 text-white/80" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Section: Artikel & Wawasan */}
                <div className="border-t border-stone-200/80 pt-10 sm:pt-12">
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-900 mb-1.5">
                            Artikel & <span className="text-[#c43c27]">Wawasan</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-stone-600 font-normal">
                            Panduan praktis menjaga privasi, kesehatan mental, dan batasan personal.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        {articles.map((article) => (
                            <div 
                                key={article.slug}
                                className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between transition-colors"
                            >
                                <div>
                                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md mb-3 ${article.categoryColor}`}>
                                        {article.category}
                                    </span>
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-stone-900 mb-2 leading-snug">
                                        {article.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed mb-6">
                                        {article.snippet}
                                    </p>
                                </div>
                                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700">
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