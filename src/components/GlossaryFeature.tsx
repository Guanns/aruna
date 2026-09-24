import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { glossaryTerms } from '../features/glossaryData';

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
    const getCategoryStyle = (cat: string) => {
        switch(cat) {
            case 'Toxic Relationship': return 'text-rose-700 bg-rose-50';
            case 'Gen Z': return 'text-purple-700 bg-purple-50';
            case 'Dating World': return 'text-pink-700 bg-pink-50';
            case 'Mental Health': return 'text-teal-700 bg-teal-50';
            default: return 'text-stone-700 bg-stone-100';
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto font-poppins">
            
            {/* Search & Filter Bar */}
            <div className="mb-10 space-y-4">
                {/* Search Input */}
                <div className="relative max-w-xl mx-auto">
                    <div className="bg-white border border-stone-200 rounded-xl shadow-xs flex items-center px-4 py-3">
                        <Search className="w-5 h-5 text-stone-400 shrink-0" />
                        <input 
                            type="text"
                            placeholder="Cari istilah atau definisi disini..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full ml-3 outline-none text-stone-900 placeholder:text-stone-400 text-sm font-normal bg-transparent"
                        />
                    </div>
                </div>

                {/* Category Filter Chips */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors border
                                ${activeCategory === cat 
                                    ? 'bg-stone-900 text-white border-stone-900' 
                                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                                }
                            `}
                        >
                            {cat === 'All' ? 'Semua Istilah' : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Terms Grid */}
            {filteredTerms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredTerms.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between"
                        >
                            <div>
                                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md mb-3 ${getCategoryStyle(item.category)}`}>
                                    {item.category}
                                </span>

                                <h3 className="text-xl font-bold text-stone-900 mb-2 leading-snug">
                                    {item.term}
                                </h3>

                                <p className="text-stone-600 leading-relaxed text-sm mb-4 font-normal">
                                    {item.definition}
                                </p>
                            </div>

                            {/* Example Box */}
                            <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 text-xs text-stone-600 mt-2">
                                <span className="font-semibold block mb-1 text-stone-500">Contoh:</span>
                                &quot;{item.example}&quot;
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-stone-500">
                    <p className="text-lg font-semibold text-stone-700 mb-1">Istilah tidak ditemukan</p>
                    <p className="text-sm">Coba cari dengan kata kunci lain atau pilih kategori Semua Istilah.</p>
                </div>
            )}
        </div>
    );
}