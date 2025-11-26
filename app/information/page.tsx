// app/information/page.tsx
// VERSI FINAL FIX: Precision Layout & Horizontal Scroll Tabs

"use client";

import Link from 'next/link';
import { 
    ArrowLeftIcon, 
    ChevronDownIcon, 
    BookOpenIcon,
    LightBulbIcon
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';

// Tipe Kategori
type Category = 'Semua' | 'Darurat' | 'Wellness' | 'Privasi';

// Data Tutorial
const tutorials = [
    {
        id: 1,
        category: 'Darurat',
        icon: '🚨',
        title: 'Tombol Panik (Panic Button)',
        theme: 'rose',
        content: `
            <p class="font-bold text-lg mb-2 text-rose-700">Fungsi Utama</p>
            <p class="mb-4 text-gray-600">Fitur penyelamat nyawa. Sekali tekan, Aruna mengirim sinyal SOS + Lokasi GPS ke WhatsApp kontak daruratmu.</p>
            <div class="bg-rose-50 p-4 rounded-xl border border-rose-100">
                <p class="font-bold text-rose-800 mb-2 text-sm uppercase tracking-wide">Langkah Penggunaan:</p>
                <ol class="list-decimal list-inside space-y-2 text-gray-700 text-sm">
                    <li>Klik ikon <b>Gerigi (⚙️)</b> di kartu Panic Button pada Dashboard.</li>
                    <li>Masukkan Nama & Nomor WA orang terpercaya (Wajib kode negara, misal 62812...).</li>
                    <li>Saat bahaya, tekan tombol merah besar <b>Panic Button</b>.</li>
                    <li>WhatsApp akan terbuka otomatis. Tekan <b>Send</b>.</li>
                </ol>
            </div>
        `
    },
    {
        id: 2,
        category: 'Darurat',
        icon: '📍',
        title: 'Live Position',
        theme: 'blue',
        content: `
            <p class="font-bold text-lg mb-2 text-blue-700">Fungsi Utama</p>
            <p class="mb-4 text-gray-600">Memantau perjalananmu. Aruna akan mengirim update lokasi secara berkala (otomatis) ke kontak darurat.</p>
            <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p class="font-bold text-blue-800 mb-2 text-sm uppercase tracking-wide">Cara Pakai:</p>
                <ol class="list-decimal list-inside space-y-2 text-gray-700 text-sm">
                    <li>Buka menu <b>Live Position</b>.</li>
                    <li>Pilih interval waktu (misal: setiap 5 menit).</li>
                    <li>Klik <b>Mulai Bagikan</b>. Timer akan berjalan.</li>
                    <li>Jangan tutup tab ini agar pengiriman lokasi tetap berjalan lancar.</li>
                </ol>
            </div>
        `
    },
    {
        id: 3,
        category: 'Darurat',
        icon: '📞',
        title: 'Direktori Bantuan',
        theme: 'orange',
        content: `
            <p class="font-bold text-lg mb-2 text-orange-700">Fungsi Utama</p>
            <p class="mb-4 text-gray-600">Daftar nomor penting (Polisi, Ambulans, Komnas Perempuan) yang bisa dihubungi langsung.</p>
            <div class="bg-orange-50 p-4 rounded-xl border border-orange-100">
                <p class="font-bold text-orange-800 mb-2 text-sm uppercase tracking-wide">Fitur:</p>
                <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm">
                    <li>Klik tombol <b>Panggil</b> untuk menelepon langsung.</li>
                    <li>Klik nomor telepon untuk menyalin (Copy) ke clipboard.</li>
                </ul>
            </div>
        `
    },
    {
        id: 4,
        category: 'Wellness',
        icon: '🤗',
        title: 'Aruna AI',
        theme: 'teal',
        content: `
            <p class="font-bold text-lg mb-2 text-teal-700">Fungsi Utama</p>
            <p class="mb-4 text-gray-600">Teman curhat virtual yang selalu ada 24/7. Mendengarkan tanpa menghakimi, memberikan validasi emosional.</p>
            <div class="bg-teal-50 p-4 rounded-xl border border-teal-100">
                <p class="font-bold text-teal-800 mb-2 text-sm uppercase tracking-wide">Tips Curhat:</p>
                <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm">
                    <li>Ceritakan apa saja: sedih, marah, atau bingung.</li>
                    <li>Gunakan fitur ini untuk menenangkan diri saat panik.</li>
                    <li><b>Catatan:</b> AI bukan pengganti psikolog profesional.</li>
                </ul>
            </div>
        `
    },
    {
        id: 5,
        category: 'Wellness',
        icon: '📝',
        title: 'Catatan Pribadi',
        theme: 'yellow',
        content: `
            <p class="font-bold text-lg mb-2 text-yellow-700">Fungsi Utama</p>
            <p class="mb-4 text-gray-600">Jurnal digital rahasia. Data tersimpan di browsermu sendiri, server kami tidak bisa membacanya.</p>
            <div class="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                <p class="font-bold text-yellow-800 mb-2 text-sm uppercase tracking-wide">Fitur Keren:</p>
                <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm">
                    <li>Editor teks lengkap (Bold, Italic, Highlight).</li>
                    <li>Download catatan sebagai file <b>.txt</b>.</li>
                    <li>Hapus catatan secara permanen kapan saja.</li>
                </ul>
            </div>
        `
    },
    {
        id: 6,
        category: 'Privasi',
        icon: '🧮',
        title: 'Mode Kamuflase',
        theme: 'gray',
        content: `
            <p class="font-bold text-lg mb-2 text-gray-700">Fungsi Utama</p>
            <p class="mb-4 text-gray-600">Menyamarkan aplikasi Aruna menjadi Kalkulator yang berfungsi normal. Agar tidak ada yang curiga.</p>
            <div class="bg-gray-100 p-4 rounded-xl border border-gray-200">
                <p class="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">Cara Keluar Mode:</p>
                <ol class="list-decimal list-inside space-y-2 text-gray-700 text-sm">
                    <li>Atur <b>PIN Rahasia</b> (4 digit) di pengaturan awal.</li>
                    <li>Saat di tampilan kalkulator, ketik PIN kamu.</li>
                    <li>Tekan tombol <b>Sama Dengan (=)</b>.</li>
                    <li>Tampilan akan kembali ke Aruna Dashboard.</li>
                </ol>
            </div>
        `
    },
    {
        id: 7,
        category: 'Privasi',
        icon: '🛡️',
        title: 'Audit Privasi',
        theme: 'indigo',
        content: `
            <p class="font-bold text-lg mb-2 text-indigo-700">Fungsi Utama</p>
            <p class="mb-4 text-gray-600">Ceklis keamanan untuk mengamankan akun media sosialmu (IG, TikTok, WA) dari penguntit.</p>
            <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <p class="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Cara Pakai:</p>
                <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm">
                    <li>Pilih platform (misal: Instagram).</li>
                    <li>Ikuti langkah-langkah yang disarankan.</li>
                    <li>Centang kotak jika sudah dilakukan untuk melihat skor keamananmu naik!</li>
                </ul>
            </div>
        `
    }
];

export default function PusatInformasiPage() {
    const [activeCategory, setActiveCategory] = useState<Category>('Semua');
    const [openId, setOpenId] = useState<number | null>(null);

    // Filter Logic
    const filteredTutorials = activeCategory === 'Semua' 
        ? tutorials 
        : tutorials.filter(t => t.category === activeCategory);

    const toggleAccordion = (id: number) => {
        setOpenId(openId === id ? null : id);
    };
    
    // Helper Style
    const getThemeClasses = (theme: string, isOpen: boolean) => {
        const base = "transition-all duration-300 border";
        if (isOpen) {
            switch(theme) {
                case 'rose': return `${base} bg-white border-rose-200 shadow-lg shadow-rose-100`;
                case 'blue': return `${base} bg-white border-blue-200 shadow-lg shadow-blue-100`;
                case 'teal': return `${base} bg-white border-teal-200 shadow-lg shadow-teal-100`;
                case 'yellow': return `${base} bg-white border-yellow-200 shadow-lg shadow-yellow-100`;
                case 'indigo': return `${base} bg-white border-indigo-200 shadow-lg shadow-indigo-100`;
                default: return `${base} bg-white border-gray-200 shadow-lg`;
            }
        }
        return `${base} bg-white/60 hover:bg-white border-white/60 hover:border-gray-200 shadow-sm hover:shadow-md`;
    };

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20">
            
            {/* --- BACKGROUND FX --- */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[100px]"></div>
                 <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-pink-200/20 rounded-full blur-[100px]"></div>
                 <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
            </div>

            <div className="max-w-3xl mx-auto px-6 pt-36 relative z-10">
                
                {/* --- HEADER --- */}
                <header className="text-center mb-12">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#6B4F4F]/60 hover:text-purple-600 mb-8 transition-colors py-2 px-4 rounded-full hover:bg-white/50 border border-transparent hover:border-purple-100">
                        <ArrowLeftIcon className="w-4 h-4"/> Kembali ke Dashboard
                    </Link>
                    
                    <div className="flex justify-center mb-6">
                        <div className="p-5 bg-purple-100 rounded-[1.5rem] text-purple-600 shadow-sm rotate-3 hover:rotate-0 transition-transform duration-300">
                            <BookOpenIcon className="w-10 h-10" />
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#6B4F4F] tracking-tight">
                        Pusat <span className="font-serif italic text-purple-600">Bantuan</span>
                    </h1>
                    <p className="text-lg opacity-70 max-w-lg mx-auto font-light leading-relaxed">
                        Bingung cara pakai fitur Aruna? Tenang, kami sudah siapkan panduan lengkapnya di sini.
                    </p>
                </header>

                {/* --- TABS CATEGORY (Horizontal Scroll on Mobile) --- */}
                {/* Perbaikan Presisi: Menggunakan overflow-x-auto agar tidak menumpuk di mobile */}
                <div className="flex md:flex-wrap md:justify-center gap-3 mb-12 overflow-x-auto pb-4 custom-scrollbar snap-x">
                    {['Semua', 'Darurat', 'Wellness', 'Privasi'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat as Category)}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border flex items-center gap-2.5 whitespace-nowrap snap-center
                                ${activeCategory === cat 
                                    ? 'bg-[#6B4F4F] text-white border-[#6B4F4F] shadow-md transform -translate-y-0.5' 
                                    : 'bg-white text-[#6B4F4F]/70 border-gray-100 hover:bg-white hover:border-gray-200 hover:text-[#6B4F4F] hover:shadow-sm'
                                }
                            `}
                        >
                            {cat === 'Darurat' && <span className="text-base">🚨</span>}
                            {cat === 'Wellness' && <span className="text-base">🌻</span>}
                            {cat === 'Privasi' && <span className="text-base">🛡️</span>}
                            <span>{cat}</span>
                        </button>
                    ))}
                </div>

                {/* --- TUTORIAL CARDS --- */}
                <div className="space-y-5">
                    {filteredTutorials.map((item) => {
                        const isOpen = openId === item.id;
                        
                        return (
                            <div 
                                key={item.id} 
                                className={`rounded-[1.5rem] overflow-hidden ${getThemeClasses(item.theme, isOpen)}`}
                            >
                                <button
                                    onClick={() => toggleAccordion(item.id)}
                                    className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-white border border-gray-100 shadow-sm shrink-0`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800 leading-tight">{item.title}</h3>
                                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1 block">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gray-100 rotate-180 text-gray-600' : 'bg-white shadow-sm text-gray-300'}`}>
                                        <ChevronDownIcon className="w-5 h-5" />
                                    </div>
                                </button>
                                
                                <div 
                                    className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-6 pb-8 pt-0 pl-6 md:pl-[5.5rem]">
                                            <div className="h-px w-full bg-gray-100 mb-6"></div>
                                            <div 
                                                className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: item.content }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredTutorials.length === 0 && (
                    <div className="text-center py-20 opacity-50 flex flex-col items-center justify-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <LightBulbIcon className="w-8 h-8 text-gray-400"/>
                        </div>
                        <p className="font-medium">Belum ada panduan di kategori ini.</p>
                    </div>
                )}

            </div>
        </div>
    );
}