import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// app/information/page.tsx
// VERSI FINAL FIX: Precision Layout & Horizontal Scroll Tabs
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ChevronDownIcon, BookOpenIcon, LightBulbIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
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
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [openId, setOpenId] = useState(null);
    // Filter Logic
    const filteredTutorials = activeCategory === 'Semua'
        ? tutorials
        : tutorials.filter(t => t.category === activeCategory);
    const toggleAccordion = (id) => {
        setOpenId(openId === id ? null : id);
    };
    // Helper Style
    const getThemeClasses = (theme, isOpen) => {
        const base = "transition-all duration-300 border";
        if (isOpen) {
            switch (theme) {
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
    return (_jsxs("div", { className: "w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20", children: [_jsx(Link, { to: "/dashboard", className: "fixed top-6 left-6 z-50 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-md rounded-xl flex items-center justify-center shadow-md border border-stone-200/50 text-[#6B4F4F] transition-all hover:scale-105 active:scale-95 group", title: "Kembali ke Dashboard", children: _jsx(ArrowLeftIcon, { className: "w-5 h-5 group-hover:-translate-x-0.5 transition-transform" }) }), _jsxs("div", { className: "fixed inset-0 pointer-events-none z-0 overflow-hidden", children: [_jsx("div", { className: "absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[100px]" }), _jsx("div", { className: "absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-pink-200/20 rounded-full blur-[100px]" }), _jsx("div", { className: "absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" })] }), _jsxs("div", { className: "max-w-3xl mx-auto px-6 pt-36 relative z-10", children: [_jsxs("header", { className: "text-center mb-12", children: [_jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-2 text-[#6B4F4F]/60 hover:text-purple-600 mb-8 transition-colors py-2 px-4 rounded-full hover:bg-white/50 border border-transparent hover:border-purple-100", children: [_jsx(ArrowLeftIcon, { className: "w-4 h-4" }), " Kembali ke Dashboard"] }), _jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 shadow-md border border-purple-200/50", children: _jsx(BookOpenIcon, { className: "w-12 h-12" }) }) }), _jsxs("h1", { className: "text-4xl md:text-5xl font-bold mb-4 text-[#6B4F4F] tracking-tight", children: ["Pusat ", _jsx("span", { className: "font-serif italic text-purple-600", children: "Bantuan" })] }), _jsx("p", { className: "text-lg opacity-70 max-w-lg mx-auto font-light leading-relaxed", children: "Bingung cara pakai fitur Aruna? Tenang, kami sudah siapkan panduan lengkapnya di sini." })] }), _jsx("div", { className: "flex md:flex-wrap md:justify-center gap-3 mb-12 overflow-x-auto pb-4 custom-scrollbar snap-x", children: ['Semua', 'Darurat', 'Wellness', 'Privasi'].map((cat) => (_jsxs("button", { onClick: () => setActiveCategory(cat), className: `px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border flex items-center gap-2.5 whitespace-nowrap snap-center
                                ${activeCategory === cat
                                ? 'bg-[#6B4F4F] text-white border-[#6B4F4F] shadow-md transform -translate-y-0.5'
                                : 'bg-white text-[#6B4F4F]/70 border-gray-100 hover:bg-white hover:border-gray-200 hover:text-[#6B4F4F] hover:shadow-sm'}
                            `, children: [cat === 'Darurat' && _jsx("span", { className: "text-base", children: "\uD83D\uDEA8" }), cat === 'Wellness' && _jsx("span", { className: "text-base", children: "\uD83C\uDF3B" }), cat === 'Privasi' && _jsx("span", { className: "text-base", children: "\uD83D\uDEE1\uFE0F" }), _jsx("span", { children: cat })] }, cat))) }), _jsx("div", { className: "space-y-5", children: filteredTutorials.map((item) => {
                            const isOpen = openId === item.id;
                            return (_jsxs("div", { className: `rounded-[1.5rem] overflow-hidden ${getThemeClasses(item.theme, isOpen)}`, children: [_jsxs("button", { onClick: () => toggleAccordion(item.id), className: "w-full flex justify-between items-center text-left p-6 focus:outline-none", children: [_jsxs("div", { className: "flex items-center gap-5", children: [_jsx("div", { className: `w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-white border border-gray-100 shadow-sm shrink-0`, children: item.icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-lg text-gray-800 leading-tight", children: item.title }), _jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1 block", children: item.category })] })] }), _jsx("div", { className: `w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gray-100 rotate-180 text-gray-600' : 'bg-white shadow-sm text-gray-300'}`, children: _jsx(ChevronDownIcon, { className: "w-5 h-5" }) })] }), _jsx("div", { className: `grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`, children: _jsx("div", { className: "overflow-hidden", children: _jsxs("div", { className: "px-6 pb-8 pt-0 pl-6 md:pl-[5.5rem]", children: [_jsx("div", { className: "h-px w-full bg-gray-100 mb-6" }), _jsx("div", { className: "prose prose-sm max-w-none text-gray-600 leading-relaxed", dangerouslySetInnerHTML: { __html: item.content } })] }) }) })] }, item.id));
                        }) }), filteredTutorials.length === 0 && (_jsxs("div", { className: "text-center py-20 opacity-50 flex flex-col items-center justify-center", children: [_jsx("div", { className: "bg-gray-100 p-4 rounded-full mb-4", children: _jsx(LightBulbIcon, { className: "w-8 h-8 text-gray-400" }) }), _jsx("p", { className: "font-medium", children: "Belum ada panduan di kategori ini." })] }))] })] }));
}
