import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/GlossaryFeature.tsx
import { useState } from 'react';
import { glossaryTerms } from '../features/glossaryData';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
export default function GlossaryFeature() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    // Ambil kategori unik
    const categories = ['All', ...Array.from(new Set(glossaryTerms.map(item => item.category)))];
    // Logic Filter
    const filteredTerms = glossaryTerms.filter(item => {
        const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) ||
            item.definition.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });
    // Helper warna kategori
    const getCategoryColor = (cat) => {
        switch (cat) {
            case 'Toxic Relationship': return 'bg-red-100 text-red-700 border-red-200';
            case 'Gen Z': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'Dating World': return 'bg-pink-100 text-pink-700 border-pink-200';
            case 'Mental Health': return 'bg-teal-100 text-teal-700 border-teal-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };
    return (_jsxs("div", { className: "w-full max-w-6xl mx-auto", children: [_jsxs("div", { className: "mb-12 space-y-6", children: [_jsxs("div", { className: "relative group", children: [_jsx("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500" }), _jsxs("div", { className: "relative bg-white rounded-full shadow-sm flex items-center p-4", children: [_jsx(MagnifyingGlassIcon, { className: "w-6 h-6 text-gray-400 ml-2" }), _jsx("input", { type: "text", placeholder: "Cari istilah... (misal : Gaslighting, FOMO)", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full ml-4 outline-none text-[#6B4F4F] placeholder:text-gray-400 font-medium bg-transparent" })] })] }), _jsx("div", { className: "flex flex-wrap gap-3 justify-center", children: categories.map(cat => (_jsx("button", { onClick: () => setActiveCategory(cat), className: `px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border
                                ${activeCategory === cat
                                ? 'bg-[#6B4F4F] text-white border-[#6B4F4F] shadow-lg transform scale-105'
                                : 'bg-white/60 text-[#6B4F4F]/70 border-transparent hover:bg-white hover:shadow-md'}
                            `, children: cat }, cat))) })] }), filteredTerms.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredTerms.map((item) => (_jsxs("div", { className: "group bg-white/60 backdrop-blur-md rounded-[2rem] p-8 border border-white/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden", children: [_jsx("div", { className: `absolute top-0 right-0 w-32 h-32 rounded-bl-[4rem] opacity-20 transition-transform group-hover:scale-150 duration-700 pointer-events-none
                                ${item.category === 'Toxic Relationship' ? 'bg-red-400' :
                                item.category === 'Gen Z' ? 'bg-purple-400' :
                                    item.category === 'Dating World' ? 'bg-pink-400' : 'bg-teal-400'}
                            ` }), _jsx("div", { className: "mb-4", children: _jsx("span", { className: `inline-block text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${getCategoryColor(item.category)}`, children: item.category }) }), _jsx("h3", { className: "text-2xl font-bold text-[#6B4F4F] mb-3 group-hover:text-[#c43c27] transition-colors", children: item.term }), _jsx("p", { className: "text-[#6B4F4F]/80 leading-relaxed text-sm mb-6 flex-grow", children: item.definition }), _jsxs("div", { className: "bg-white/50 rounded-xl p-4 border border-white/60 text-xs italic text-[#6B4F4F]/70 mt-auto", children: [_jsx("span", { className: "font-bold block not-italic mb-1 opacity-50 uppercase text-[10px]", children: "Contoh:" }), "\"", item.example, "\""] })] }, item.id))) })) : (_jsxs("div", { className: "text-center py-20 opacity-50", children: [_jsx("p", { className: "text-xl font-bold", children: "Yah, istilahnya nggak ketemu.. \uD83E\uDD72" }), _jsx("p", { children: "Coba cari kata kunci lain ya." })] }))] }));
}
