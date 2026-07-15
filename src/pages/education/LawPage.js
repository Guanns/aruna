import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ScaleIcon, ChevronRightIcon, ShieldCheckIcon, SparklesIcon, HomeIcon, UserIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
const LAW_CATEGORIES = [
    {
        id: 'domestic',
        title: 'Ranah Domestik / Rumah Tangga',
        subtitle: 'UU No. 23 Tahun 2004 tentang PKDRT',
        shortTitle: 'Ranah Domestik',
        icon: HomeIcon,
        color: 'from-indigo-600 to-blue-500',
        bg: 'bg-indigo-50/50',
        border: 'border-indigo-100',
        textColor: 'text-indigo-900',
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
        icon: UserIcon,
        color: 'from-amber-600 to-orange-500',
        bg: 'bg-amber-50/50',
        border: 'border-amber-100',
        textColor: 'text-amber-900',
        laws: [
            { article: 'Pasal 76C jo. Pasal 80', type: 'Kekerasan Fisik & Psikis', detail: 'Melarang keras tindakan menempatkan, membiarkan, melakukan, menyuruh, atau turut serta melakukan kekerasan fisik maupun mental terhadap anak.' },
            { article: 'Pasal 76D & 76E jo. Pasal 81 & 82', type: 'Kekerasan Seksual', detail: 'Melarang pemaksaan persetubuhan (pemerkosaan) atau pencabulan terhadap anak dengan ancaman pidana minimal 5 tahun and maksimal 15 tahun penjara.' },
            { article: 'Pasal 76A', type: 'Kekerasan Verbal (Diskriminasi)', detail: 'Melarang perlakuan diskriminatif terhadap anak yang mengakibatkan kerugian materiil maupun moril serta menghambat perkembangannya.' },
            { article: 'Pasal 76I jo. Pasal 88', type: 'Kekerasan Ekonomi (Eksploitasi)', detail: 'Melarang eksploitasi ekonomi maupun seksual terhadap anak dengan maksud menguntungkan diri sendiri atau menyalahgunakan anak secara paksa.' }
        ]
    },
    {
        id: 'public',
        title: 'Korban Perempuan (Publik & Digital)',
        subtitle: 'Kombinasi UU TPKS, UU ITE, & UU TPPO',
        shortTitle: 'Publik & Digital',
        icon: GlobeAltIcon,
        color: 'from-teal-600 to-emerald-500',
        bg: 'bg-teal-50/50',
        border: 'border-teal-100',
        textColor: 'text-teal-900',
        laws: [
            { article: 'Pasal 5 UU No. 12 Tahun 2022 (UU TPKS)', type: 'Pelecehan Seksual Non-Fisik', detail: 'Pernyataan verbal, gestur miring, atau catcalling seksual yang merendahkan martabat terancam penjara maksimal 9 bulan dan/atau denda.' },
            { article: 'Pasal 6 UU TPKS', type: 'Pelecehan Seksual Fisik', detail: 'Menyentuh atau melecehkan fisik korban secara seksual di ranah publik terancam hukuman hingga 4 tahun (atau 12 tahun jika ada relasi kuasa).' },
            { article: 'Pasal 14 UU TPKS', type: 'Kekerasan Seksual Berbasis Elektronik (KSBE)', detail: 'Melarang penyebaran konten seksual pribadi (revenge porn), perekaman rahasia, atau pemerasan bermuatan seksual melalui media elektronik.' },
            { article: 'Pasal 27A & 29 UU ITE', type: 'Kekerasan Verbal & Psikis Digital', detail: 'Melarang transmisi informasi bermuatan pencemaran nama baik, penghinaan berat, ancaman kekerasan fisik, atau intimidasi pribadi secara online.' },
            { article: 'UU No. 21 Tahun 2007 (UU TPPO)', type: 'Eksploitasi Ekonomi Berat (Perdagangan Orang)', detail: 'Melarang pengiriman, penampungan, atau perekrutan korban dengan modus penipuan atau paksaan untuk tujuan eksploitasi kerja paksa atau seksual.' }
        ]
    }
];
export default function LawPage() {
    const [activeTab, setActiveTab] = useState('domestic');
    const [selectedLaw, setSelectedLaw] = useState(null);
    const activeCategory = LAW_CATEGORIES.find(c => c.id === activeTab) || LAW_CATEGORIES[0];
    return (_jsxs("div", { className: "w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-24", children: [_jsx(Link, { to: "/education", className: "fixed top-6 left-6 z-50 w-11 h-11 bg-white/80 hover:bg-white backdrop-blur-md rounded-xl flex items-center justify-center shadow-md border border-stone-200/50 text-[#6B4F4F] transition-all hover:scale-105 active:scale-95 group", title: "Kembali ke Edukasi", children: _jsx(ArrowLeftIcon, { className: "w-5 h-5 group-hover:-translate-x-0.5 transition-transform" }) }), _jsxs("div", { className: "fixed inset-0 pointer-events-none z-0 overflow-hidden", children: [_jsx("div", { className: "absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-150/15 rounded-full blur-[120px] animate-pulse", style: { animationDuration: '9s' } }), _jsx("div", { className: "absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-teal-150/15 rounded-full blur-[100px]", style: { animationDuration: '11s' } }), _jsx("div", { className: "absolute inset-0 opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" })] }), _jsxs("div", { className: "max-w-5xl mx-auto px-6 pt-32 relative z-10", children: [_jsxs("header", { className: "text-center mb-16 max-w-2xl mx-auto", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-md border border-indigo-100/50", children: _jsx(ScaleIcon, { className: "w-8 h-8" }) }) }), _jsxs("h1", { className: "text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight", children: ["Dasar Hukum ", _jsx("span", { className: "font-serif italic text-indigo-600", children: "Aruna" })] }), _jsx("p", { className: "text-sm md:text-base opacity-70 leading-relaxed font-light", children: "Landasan regulasi konstitusional di Indonesia yang melindungi korban kekerasan seksual, fisik, psikis, maupun verbal di berbagai ranah kehidupan." })] }), _jsx("div", { className: "flex flex-col sm:flex-row justify-center gap-4 mb-10 max-w-4xl mx-auto", children: LAW_CATEGORIES.map(category => {
                            const IconComponent = category.icon;
                            return (_jsxs("button", { onClick: () => {
                                    setActiveTab(category.id);
                                    setSelectedLaw(null);
                                }, className: `flex items-center gap-3.5 py-3 px-4.5 rounded-2xl border text-left transition-all duration-300 w-full sm:w-1/3 shadow-sm hover:shadow-md hover:-translate-y-0.5
                                    ${activeTab === category.id
                                    ? `bg-white border-indigo-200 ring-2 ring-indigo-50/50 scale-[1.01]`
                                    : 'bg-white/40 border-stone-200/50 hover:bg-white/80'}
                                `, children: [_jsx("div", { className: `p-2.5 rounded-xl transition-colors ${activeTab === category.id ? 'bg-indigo-50/80 text-indigo-600' : 'bg-stone-100/80 text-stone-400'}`, children: _jsx(IconComponent, { className: "w-5 h-5" }) }), _jsx("span", { className: "font-bold text-sm tracking-tight text-gray-800", children: category.shortTitle })] }, category.id));
                        }) }), _jsx("div", { className: "max-w-5xl mx-auto mb-10 p-6 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm", children: _jsxs("div", { children: [_jsx("h2", { className: "text-xl md:text-2xl font-bold text-gray-800 tracking-tight", children: activeCategory.title }), _jsx("p", { className: "text-xs font-semibold text-indigo-600 mt-1", children: activeCategory.subtitle })] }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [_jsxs("div", { className: "lg:col-span-7 space-y-4", children: [_jsx("h4", { className: "font-bold text-gray-500 text-xs uppercase tracking-wider mb-4 px-2", children: "Daftar Regulasi" }), activeCategory.laws.map((law, idx) => {
                                        const isSelected = (selectedLaw === null || selectedLaw === void 0 ? void 0 : selectedLaw.article) === law.article;
                                        return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { onClick: () => setSelectedLaw(isSelected ? null : law), className: `p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer group flex justify-between items-center
                                            ${isSelected
                                                        ? 'bg-white border-indigo-200 shadow-md ring-1 ring-indigo-50/50'
                                                        : 'bg-white/50 border-white hover:bg-white hover:shadow-md hover:border-indigo-100'}
                                        `, children: [_jsxs("div", { className: "space-y-1.5 pr-4", children: [_jsx("h4", { className: "font-bold text-lg text-gray-800 tracking-tight", children: law.article }), _jsx("p", { className: "text-xs font-semibold text-indigo-600", children: law.type })] }), _jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all
                                            ${isSelected ? 'bg-indigo-600 text-white rotate-90' : 'bg-stone-100 text-stone-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'}
                                        `, children: _jsx(ChevronRightIcon, { className: "w-4 h-4" }) })] }), isSelected && (_jsx("div", { className: "block lg:hidden bg-gradient-to-br from-white to-indigo-50/20 rounded-[2rem] p-6 shadow-inner border border-indigo-50/50 animate-fade-in space-y-4 mx-2", children: _jsx("p", { className: "text-sm text-stone-600 font-light leading-relaxed", children: law.detail }) }))] }, idx));
                                    })] }), _jsxs("div", { className: "hidden lg:block lg:col-span-5", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4 px-2", children: [_jsx(ShieldCheckIcon, { className: "w-5 h-5 text-[#6B4F4F]/60" }), _jsx("h4", { className: "font-bold text-gray-700 text-sm uppercase tracking-wider", children: "Penjelasan Detail" })] }), _jsxs("div", { className: "bg-gradient-to-br from-white to-indigo-50/30 rounded-[2.5rem] p-8 shadow-md border border-white/80 min-h-[300px] flex flex-col justify-between relative overflow-hidden", children: [_jsx("div", { className: "absolute right-0 top-0 w-24 h-24 bg-indigo-100/10 rounded-full blur-xl pointer-events-none" }), selectedLaw ? (_jsxs("div", { className: "space-y-6 animate-fade-in", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-bold text-gray-800 tracking-tight", children: selectedLaw.article }), _jsx("p", { className: "text-sm font-semibold text-indigo-600 mt-1", children: selectedLaw.type })] }), _jsx("div", { className: "h-px bg-indigo-100/60" }), _jsx("p", { className: "text-sm md:text-base text-stone-600 font-light leading-relaxed", children: selectedLaw.detail })] })) : (_jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center my-auto opacity-60", children: [_jsx(SparklesIcon, { className: "w-10 h-10 text-indigo-400 mb-4 animate-bounce" }), _jsx("p", { className: "text-sm font-medium text-stone-400", children: "Pilih salah satu pasal di samping untuk melihat rincian dasar hukum." })] })), _jsx("div", { className: "mt-8 flex items-center gap-2 text-[10px] font-extrabold text-stone-400 uppercase tracking-widest pt-4 border-t border-indigo-100/30", children: _jsx("span", { children: "Sumber Kontitusi: NKRI" }) })] })] })] })] })] }));
}
