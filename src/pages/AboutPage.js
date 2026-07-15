import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// app/about/page.tsx
// VERSI FINAL FIX: Clean Codeimport React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ShieldCheckIcon, SparklesIcon, GiftIcon, LightBulbIcon, CodeBracketIcon, RocketLaunchIcon, EyeIcon, ArrowLeftIcon, } from '@heroicons/react/24/solid';
// Data Timeline
const timelineData = [
    {
        icon: LightBulbIcon,
        year: "2025",
        title: "Ide Awal",
        description: "Bermula dari keresahan melihat minimnya keamanan pada perempuan. Kami bermimpi menciptakan sahabat virtual bagi perempuan di seluruh Indonesia."
    },
    {
        icon: CodeBracketIcon,
        year: "2025",
        title: "Pengembangan",
        description: "Riset mendalam bersama Simpatisan yang peduli pada hak perempuan dan pakar dari senior software engineer. Dengan membangun tools keamanan yang disertai Enkripsi Lokal."
    },
    {
        icon: RocketLaunchIcon,
        year: "2025",
        title: "Peluncuran",
        description: "Aruna lahir. Aplikasi pertama yang menggabungkan keamanan dan dukungan emosional dalam satu wadah."
    }
];
// Data Nilai
const values = [
    {
        icon: HeartIcon,
        color: "text-red-500",
        bg: "bg-red-100",
        title: "Empati Radikal",
        desc: "Perasaanmu valid dan Kami akan selalu mendengar tanpa menghakimi."
    },
    {
        icon: ShieldCheckIcon,
        color: "text-teal-500",
        bg: "bg-teal-100",
        title: "Privasi Mutlak",
        desc: "Datamu milikmu. Kami tidak akan pernah mengintip privasimu."
    },
    {
        icon: SparklesIcon,
        color: "text-orange-500",
        bg: "bg-orange-100",
        title: "Pemberdayaan",
        desc: "Memberimu alat untuk siap melawan dan menyelamatkan diri"
    },
    {
        icon: GiftIcon,
        color: "text-purple-500",
        bg: "bg-purple-100",
        title: "Selalu Gratis",
        desc: "Keamanan adalah hak asasi dari seluruh perempuan."
    }
];
export default function AboutPage() {
    return (_jsxs("div", { className: "w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] overflow-hidden relative font-sans pb-20", children: [_jsx(Link, { to: "/", className: "fixed top-6 left-6 z-50 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-md rounded-xl flex items-center justify-center shadow-md border border-stone-200/50 text-[#6B4F4F] transition-all hover:scale-105 active:scale-95 group", title: "Kembali", children: _jsx(ArrowLeftIcon, { className: "w-5 h-5 group-hover:-translate-x-0.5 transition-transform" }) }), _jsxs("div", { className: "fixed inset-0 pointer-events-none z-0 overflow-hidden", children: [_jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-[#c43c27]/5 rounded-full blur-[120px] animate-pulse" }), _jsx("div", { className: "absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[100px]" }), _jsx("div", { className: "absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" })] }), _jsxs("div", { className: "max-w-5xl mx-auto px-5 md:px-6 relative z-10 pt-28 md:pt-32", children: [_jsxs("header", { className: "text-center mb-20 md:mb-24", children: [_jsxs("h1", { className: "text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight tracking-tight", children: ["Membangun ", _jsx("span", { className: "font-serif italic text-[#c43c27]", children: "Ruang Aman" }), _jsx("br", {}), "Digital Bersama."] }), _jsx("p", { className: "text-lg md:text-xl lg:text-2xl opacity-70 max-w-3xl mx-auto font-light leading-relaxed px-2", children: "Aruna bukan sekadar aplikasi. Ini adalah surat cinta untuk keamanan dan kesejahteraan mental perempuan & anak Indonesia." })] }), _jsxs("section", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24 md:mb-32", children: [_jsxs("div", { className: "group relative", children: [_jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-br from-teal-300 to-teal-100 rounded-[2rem] md:rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500" }), _jsxs("div", { className: "relative h-full bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/50 shadow-lg hover:-translate-y-1 transition-transform duration-500", children: [_jsx("div", { className: "w-14 h-14 md:w-16 md:h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-inner", children: _jsx(EyeIcon, { className: "w-7 h-7 md:w-8 md:h-8" }) }), _jsx("h2", { className: "text-2xl md:text-3xl font-bold mb-3 md:mb-4 font-serif italic text-teal-900", children: " Apa Visi Kami ?" }), _jsx("p", { className: "text-base md:text-lg opacity-80 leading-relaxed", children: "Menciptakan dunia digital yang aman dan suportif, di mana setiap perempuan dan anak dapat berekspresi dan berkembang tanpa rasa takut akan ancaman." })] })] }), _jsxs("div", { className: "group relative", children: [_jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-br from-red-300 to-red-100 rounded-[2rem] md:rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500" }), _jsxs("div", { className: "relative h-full bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/50 shadow-lg hover:-translate-y-1 transition-transform duration-500", children: [_jsx("div", { className: "w-14 h-14 md:w-16 md:h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-inner", children: _jsx(ShieldCheckIcon, { className: "w-7 h-7 md:w-8 md:h-8" }) }), _jsx("h2", { className: "text-2xl md:text-3xl font-bold mb-3 md:mb-4 font-serif italic text-red-900", children: "Apa Misi Kami ?" }), _jsx("p", { className: "text-base md:text-lg opacity-80 leading-relaxed", children: "Menyediakan alat keamanan yang mudah diakses, kuat, dan penuh empati. Melindungi privasi, fisik, dan mental pengguna dalam satu genggaman." })] })] })] }), _jsxs("section", { className: "mb-24 md:mb-32", children: [_jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16", children: ["Nilai yang Kami ", _jsx("span", { className: "font-serif italic text-[#c43c27]", children: "Pegang Teguh" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6", children: values.map((val, idx) => (_jsxs("div", { className: "bg-white/40 backdrop-blur-md p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/40 hover:bg-white/60 transition-colors shadow-sm group text-center md:text-left", children: [_jsx("div", { className: `w-12 h-12 md:w-14 md:h-14 ${val.bg} ${val.color} rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform`, children: _jsx(val.icon, { className: "w-6 h-6 md:w-7 md:h-7" }) }), _jsx("h3", { className: "text-lg md:text-xl font-bold mb-2", children: val.title }), _jsx("p", { className: "text-sm opacity-70 leading-relaxed", children: val.desc })] }, idx))) })] }), _jsx("section", { className: "mb-20 md:mb-24", children: _jsxs("div", { className: "max-w-3xl mx-auto", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16", children: "Perjalanan Aruna" }), _jsx("div", { className: "relative space-y-8 md:space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-[#c43c27] before:via-[#c43c27]/20 before:to-transparent md:before:mx-auto md:before:translate-x-0", children: timelineData.map((item, index) => (_jsxs("div", { className: "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group", children: [_jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-full bg-[#c43c27] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ring-4 ring-[#FFFBF5] z-10", children: _jsx(item.icon, { className: "w-5 h-5" }) }), _jsxs("div", { className: "w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/80 backdrop-blur-xl p-5 md:p-6 rounded-[1.5rem] md:rounded-3xl border border-white/50 shadow-sm hover:shadow-md transition-all", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "font-bold text-lg", children: item.title }), _jsx("span", { className: "text-[10px] md:text-xs font-bold bg-[#c43c27]/10 text-[#c43c27] px-2 py-1 rounded-lg", children: item.year })] }), _jsx("p", { className: "text-sm opacity-70 leading-relaxed", children: item.description })] })] }, index))) })] }) })] })] }));
}
