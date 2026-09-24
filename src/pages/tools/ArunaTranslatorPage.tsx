import React, { useState, useEffect } from 'react';
import { 
    ArrowLeft, 
    Volume2, 
    VolumeX, 
    Maximize2, 
    X, 
    Search, 
    ShieldAlert, 
    Activity, 
    Utensils, 
    Smile, 
    MessageSquare, 
    Languages, 
    Copy, 
    Check, 
    Lock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface PhraseItem {
    id: string;
    text: string;
    category: 'help' | 'medical' | 'needs' | 'emotions' | 'social';
    label: string;
}

interface CategoryTheme {
    cardBg: string;
    cardBorder: string;
    cardBorderHover: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    speakBtnBg: string;
    pillActive: string;
    pillInactive: string;
    dotColor: string;
    fullscreenAccent: string;
    fullscreenBtn: string;
}

const CATEGORIES = [
    { id: 'all', label: 'Semua Kategori', icon: Languages },
    { id: 'help', label: '🚨 Minta Tolong', icon: ShieldAlert },
    { id: 'needs', label: '🍽️ Kebutuhan Dasar', icon: Utensils },
    { id: 'medical', label: '🩺 Sakit', icon: Activity },
    { id: 'emotions', label: '😊 Emosi', icon: Smile },
    { id: 'social', label: '💬 Bantuan Bicara', icon: MessageSquare },
] as const;

// Palet warna tematik per kategori: Minta Tolong = Merah, Lapar/Minum = Biru, Sakit = Amber, Emosi = Emerald, Bicara = Ungu
const CATEGORY_THEMES: Record<PhraseItem['category'], CategoryTheme> = {
    help: {
        cardBg: 'bg-red-50/50 hover:bg-red-50/80',
        cardBorder: 'border-red-400',
        cardBorderHover: 'hover:border-red-500',
        badgeBg: 'bg-red-100',
        badgeText: 'text-red-800',
        badgeBorder: 'border-red-300',
        speakBtnBg: 'bg-red-600 hover:bg-red-700 text-white',
        pillActive: 'bg-red-600 text-white border-red-600',
        pillInactive: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
        dotColor: 'bg-red-500',
        fullscreenAccent: 'text-red-400',
        fullscreenBtn: 'bg-red-600 hover:bg-red-500 text-white',
    },
    needs: {
        cardBg: 'bg-blue-50/50 hover:bg-blue-50/80',
        cardBorder: 'border-blue-400',
        cardBorderHover: 'hover:border-blue-500',
        badgeBg: 'bg-blue-100',
        badgeText: 'text-blue-800',
        badgeBorder: 'border-blue-300',
        speakBtnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
        pillActive: 'bg-blue-600 text-white border-blue-600',
        pillInactive: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
        dotColor: 'bg-blue-500',
        fullscreenAccent: 'text-blue-400',
        fullscreenBtn: 'bg-blue-600 hover:bg-blue-500 text-white',
    },
    medical: {
        cardBg: 'bg-amber-50/50 hover:bg-amber-50/80',
        cardBorder: 'border-amber-400',
        cardBorderHover: 'hover:border-amber-500',
        badgeBg: 'bg-amber-100',
        badgeText: 'text-amber-800',
        badgeBorder: 'border-amber-300',
        speakBtnBg: 'bg-amber-600 hover:bg-amber-700 text-white',
        pillActive: 'bg-amber-600 text-white border-amber-600',
        pillInactive: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100',
        dotColor: 'bg-amber-500',
        fullscreenAccent: 'text-amber-400',
        fullscreenBtn: 'bg-amber-500 hover:bg-amber-400 text-stone-950',
    },
    emotions: {
        cardBg: 'bg-emerald-50/50 hover:bg-emerald-50/80',
        cardBorder: 'border-emerald-400',
        cardBorderHover: 'hover:border-emerald-500',
        badgeBg: 'bg-emerald-100',
        badgeText: 'text-emerald-800',
        badgeBorder: 'border-emerald-300',
        speakBtnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        pillActive: 'bg-emerald-600 text-white border-emerald-600',
        pillInactive: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100',
        dotColor: 'bg-emerald-500',
        fullscreenAccent: 'text-emerald-400',
        fullscreenBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    },
    social: {
        cardBg: 'bg-purple-50/50 hover:bg-purple-50/80',
        cardBorder: 'border-purple-400',
        cardBorderHover: 'hover:border-purple-500',
        badgeBg: 'bg-purple-100',
        badgeText: 'text-purple-800',
        badgeBorder: 'border-purple-300',
        speakBtnBg: 'bg-purple-600 hover:bg-purple-700 text-white',
        pillActive: 'bg-purple-600 text-white border-purple-600',
        pillInactive: 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100',
        dotColor: 'bg-purple-500',
        fullscreenAccent: 'text-purple-400',
        fullscreenBtn: 'bg-purple-600 hover:bg-purple-500 text-white',
    },
};

const PRESET_PHRASES: PhraseItem[] = [
    // 🚨 Minta Tolong & Keamanan (Border Merah)
    { id: 'h1', category: 'help', label: 'Butuh Bantuan', text: 'Tolong bantu saya sekarang, saya butuh pertolongan.' },
    { id: 'h2', category: 'help', label: 'Merasa Terancam', text: 'Saya merasa tidak aman, tolong dampingi saya.' },
    { id: 'h3', category: 'help', label: 'Kontak Darurat', text: 'Tolong hubungi keluarga atau nomor darurat saya.' },
    { id: 'h4', category: 'help', label: 'Tersesat', text: 'Saya tersesat dan bingung, tolong tunjukkan jalan yang aman.' },
    { id: 'h5', category: 'help', label: 'Ruang Pribadi', text: 'Tolong jangan menyentuh saya, saya butuh ruang pribadi.' },
    { id: 'h6', category: 'help', label: 'Panggil Petugas', text: 'Tolong panggilkan petugas keamanan terdekat.' },
    { id: 'h7', category: 'help', label: 'Barang Hilang', text: 'Barang saya tertinggal atau hilang, tolong bantu mencarinya.' },

    // 🍽️ Lapar, Minum & Kebutuhan Pokok (Border Biru)
    { id: 'n1', category: 'needs', label: 'Butuh Minum', text: 'Saya sangat haus, boleh tolong bantu ambilkan air minum?' },
    { id: 'n2', category: 'needs', label: 'Lapar & Makan', text: 'Saya lapar dan ingin makan makanan yang aman.' },
    { id: 'n3', category: 'needs', label: 'Cari Toilet', text: 'Bisa tolong tunjukkan di mana toilet atau kamar mandi terdekat?' },
    { id: 'n4', category: 'needs', label: 'Kepanasan', text: 'Tempat ini terlalu panas bagi saya, saya butuh tempat yang lebih sejuk.' },
    { id: 'n5', category: 'needs', label: 'Kedinginan', text: 'Saya kedinginan, tolong bantu saya mencari tempat atau pakaian hangat.' },
    { id: 'n6', category: 'needs', label: 'Buka Wadah', text: 'Bisa tolong bantu saya membukakan kemasan atau botol ini?' },
    { id: 'n7', category: 'needs', label: 'Isi Daya Ponsel', text: 'Baterai ponsel saya hampir habis, bolehkah saya menumpang mengisi daya?' },

    // 🩺 Sakit & Kondisi Fisik (Border Amber / Oranye)
    { id: 'm1', category: 'medical', label: 'Tidak Enak Badan', text: 'Saya sedang merasa sakit dan tidak enak badan, tolong bantu saya duduk.' },
    { id: 'm2', category: 'medical', label: 'Pusing Berat', text: 'Kepala saya sangat pusing dan pandangan saya berkunang-kunang.' },
    { id: 'm3', category: 'medical', label: 'Sakit Perut', text: 'Perut saya sakit sekali, saya butuh tempat untuk beristirahat.' },
    { id: 'm4', category: 'medical', label: 'Sesak Napas', text: 'Dada saya sesak, saya kesulitan bernapas dengan nyaman.' },
    { id: 'm5', category: 'medical', label: 'Butuh Obat', text: 'Saya butuh minum obat yang tersimpan di dalam tas saya.' },
    { id: 'm6', category: 'medical', label: 'Tubuh Lemas', text: 'Tubuh saya gemetar dan sangat lemas, boleh tolong carikan air hangat?' },
    { id: 'm7', category: 'medical', label: 'Alergi', text: 'Saya memiliki riwayat alergi, tolong jangan berikan makanan atau minuman sembarangan.' },

    // 😊 Emosi & Rasa Nyaman (Border Hijau Emerald)
    { id: 'e1', category: 'emotions', label: 'Senang & Nyaman', text: 'Saya merasa sangat senang, aman, dan nyaman saat ini.' },
    { id: 'e2', category: 'emotions', label: 'Serangan Panik', text: 'Saya sedang mengalami cemas berlebih atau panik, mohon beri saya waktu tenang.' },
    { id: 'e3', category: 'emotions', label: 'Terlalu Bising', text: 'Suara di tempat ini terlalu bising, telinga saya terasa sakit.' },
    { id: 'e4', category: 'emotions', label: 'Silau', text: 'Cahaya di sini terlalu terang dan menyilaukan mata saya.' },
    { id: 'e5', category: 'emotions', label: 'Sedih & Lelah', text: 'Saya merasa sedih dan sangat lelah, butuh waktu sendiri beberapa saat.' },
    { id: 'e6', category: 'emotions', label: 'Terima Kasih', text: 'Terima kasih banyak atas kebaikan, kesabaran, dan pengertian Anda.' },

    // 💬 Komunikasi & Bantuan Bicara (Border Ungu)
    { id: 's1', category: 'social', label: 'Sulit Bicara', text: 'Saya kesulitan berbicara langsung, tolong baca tulisan di kartu ini.' },
    { id: 's2', category: 'social', label: 'Setuju / Ya', text: 'Ya, saya setuju dan bersedia.' },
    { id: 's3', category: 'social', label: 'Menolak / Tidak', text: 'Tidak, saya tidak mau atau tidak setuju dengan hal ini.' },
    { id: 's4', category: 'social', label: 'Bicara Lebih Pelan', text: 'Bisa tolong berbicara lebih pelan dan jelas satu per satu?' },
    { id: 's5', category: 'social', label: 'Butuh Waktu Pikir', text: 'Tolong beri saya waktu sebentar untuk memproses dan merespons.' },
    { id: 's6', category: 'social', label: 'Tolong Tuliskan', text: 'Bisa tolong tuliskan apa yang Anda katakan di kertas atau ponsel?' },
    { id: 's7', category: 'social', label: 'Permisi', text: 'Permisi, bolehkah saya meminta bantuan Anda sebentar saja?' },
];

export default function ArunaTranslatorPage() {
    const navigate = useNavigate();

    // Pastikan user memiliki Mode Ramah aktif
    const [isEasyMode, setIsEasyMode] = useState<boolean>(() => {
        return localStorage.getItem('isEasyMode') === 'true';
    });

    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [customText, setCustomText] = useState<string>('');
    const [fullscreenItem, setFullscreenItem] = useState<{ text: string; category?: PhraseItem['category'] } | null>(null);
    const [speakingText, setSpeakingText] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Pantau perubahan local storage mode ramah
    useEffect(() => {
        const checkMode = () => {
            setIsEasyMode(localStorage.getItem('isEasyMode') === 'true');
        };
        window.addEventListener('storage', checkMode);
        return () => window.removeEventListener('storage', checkMode);
    }, []);

    // Hentikan suara jika keluar halaman
    useEffect(() => {
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Fitur Bicara (Text-to-Speech Native)
    const handleSpeak = (text: string) => {
        if (!('speechSynthesis' in window)) {
            alert('Perangkat Anda tidak mendukung fitur pembaca suara.');
            return;
        }

        if (speakingText === text) {
            window.speechSynthesis.cancel();
            setSpeakingText(null);
            return;
        }

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 0.88; // Sedikit lebih perlahan agar pelafalan jelas
        utterance.pitch = 1.0;

        utterance.onstart = () => setSpeakingText(text);
        utterance.onend = () => setSpeakingText(null);
        utterance.onerror = () => setSpeakingText(null);

        window.speechSynthesis.speak(utterance);
    };

    const handleStopSpeech = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setSpeakingText(null);
        }
    };

    const handleCopy = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1800);
    };

    // Filter daftar frasa
    const filteredPhrases = PRESET_PHRASES.filter((item) => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = 
            item.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.label.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Guard: Jika Mode Ramah tidak aktif
    if (!isEasyMode) {
        return (
            <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-900 font-poppins pt-24 md:pt-28 pb-20 px-4 sm:px-6">
                <div className="max-w-md mx-auto bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 text-center shadow-xs">
                    <div className="w-16 h-16 bg-amber-50 text-amber-700 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 bg-amber-100 text-amber-800 rounded-md">
                        Fitur Eksklusif Mode Ramah
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold text-stone-900 mt-3 mb-2">
                        Akses Dibatasi
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                        Aruna Translator dirancang khusus sebagai alat bantu komunikasi dan bicara bagi teman-teman ABK saat Mode Ramah aktif.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-3 px-5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4 shrink-0" />
                        <span>Kembali ke Dashboard</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-900 font-poppins pt-24 md:pt-28 pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                
                {/* Header Halaman */}
                <header className="mb-6 sm:mb-8">
                    <div className="mb-3">
                        <Link 
                            to="/dashboard"
                            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-semibold transition-colors"
                            title="Kembali ke Dashboard"
                        >
                            <ArrowLeft className="w-4 h-4 shrink-0" />
                            <span>Kembali ke Dashboard</span>
                        </Link>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                                    Aruna Translator
                                </h1>
                            </div>
                            <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                                Suara bantuan bicara untuk mengekspresikan kondisi fisik, emosi, lapar, atau minta tolong..
                            </p>
                        </div>
                    </div>
                </header>

                {/* Input Bebas Mandiri (Custom Speech / Card) */}
                <section className="bg-white border-2 border-stone-300 rounded-2xl p-4 sm:p-5 shadow-xs mb-6">
                    <label htmlFor="custom-speech-input" className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                        Ketik kalimat yang ingin kamu sampaikan
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                        <input
                            id="custom-speech-input"
                            type="text"
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && customText.trim()) {
                                    handleSpeak(customText.trim());
                                }
                            }}
                            placeholder="Ketik kalimat kamu disini"
                            className="flex-1 bg-stone-50 border border-stone-300 focus:border-stone-800 focus:bg-white text-stone-900 text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                        />
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                onClick={() => {
                                    if (customText.trim()) {
                                        setFullscreenItem({ text: customText.trim() });
                                    }
                                }}
                                disabled={!customText.trim()}
                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 disabled:hover:bg-stone-100 text-stone-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
                                title="Tampilkan Layar Penuh"
                            >
                                <Maximize2 className="w-4 h-4 shrink-0" />
                                <span>Layar Penuh</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (customText.trim()) {
                                        handleSpeak(customText.trim());
                                    }
                                }}
                                disabled={!customText.trim()}
                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:hover:bg-amber-600 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shadow-xs"
                                title="Bunyikan Suara"
                            >
                                {speakingText === customText.trim() ? (
                                    <>
                                        <VolumeX className="w-4 h-4 shrink-0 text-white" />
                                        <span>Berhenti</span>
                                    </>
                                ) : (
                                    <>
                                        <Volume2 className="w-4 h-4 shrink-0 text-white" />
                                        <span>Bicarakan</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Filter & Pencarian */}
                <div className="space-y-3 mb-6">
                    {/* Kotak Pencarian */}
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari kata atau situasi (Sakit, Tolong, Bantu)  "
                            className="w-full bg-white border border-stone-200 pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500 transition-colors"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600"
                                title="Hapus Pencarian"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Kategori Tabs Berwarna Tematik (Pills) */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
                        {CATEGORIES.map((cat) => {
                            const isSelected = selectedCategory === cat.id;

                            if (cat.id === 'all') {
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors border ${
                                            isSelected
                                                ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                                                : 'bg-white hover:bg-stone-100 text-stone-600 border-stone-200'
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                );
                            }

                            const theme = CATEGORY_THEMES[cat.id as PhraseItem['category']];
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors border ${
                                        isSelected ? `${theme.pillActive} shadow-xs` : theme.pillInactive
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Daftar Kartu Kata Berwarna Tematik (Mode Ramah: Desain 1 Kolom Bersih) */}
                <div className="space-y-3">
                    {filteredPhrases.length === 0 ? (
                        <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center">
                            <p className="text-sm font-semibold text-stone-700 mb-1">
                                Tidak ada kartu yang cocok
                            </p>
                            <p className="text-xs text-stone-500 mb-4">
                                Coba cari dengan kata kunci lain atau gunakan kolom tulis pesan di atas.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors"
                            >
                                Reset Filter
                            </button>
                        </div>
                    ) : (
                        filteredPhrases.map((item) => {
                            const isSpeakingThis = speakingText === item.text;
                            const isCopiedThis = copiedId === item.id;
                            const theme = CATEGORY_THEMES[item.category];

                            return (
                                <div
                                    key={item.id}
                                    className={`border-2 ${theme.cardBorder} ${theme.cardBorderHover} ${theme.cardBg} rounded-2xl p-4 sm:p-5 shadow-xs transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                                                {item.label}
                                            </span>
                                            {isSpeakingThis && (
                                                <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${theme.badgeText} ${theme.badgeBg} border ${theme.badgeBorder} px-2 py-0.5 rounded-md animate-pulse`}>
                                                    <Volume2 className="w-3 h-3" />
                                                    <span>Sedang Berbicara...</span>
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                                            {item.text}
                                        </p>
                                    </div>

                                    {/* Aksi Interaktif */}
                                    <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200/60">
                                        {/* Tombol Salin */}
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(item.id, item.text)}
                                            className="p-2.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-xl transition-colors shadow-xs"
                                            title="Salin Kalimat"
                                        >
                                            {isCopiedThis ? (
                                                <Check className="w-4 h-4 text-emerald-600" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </button>

                                        {/* Tombol Tampilkan Layar Penuh (Untuk ditunjukkan ke orang lain) */}
                                        <button
                                            type="button"
                                            onClick={() => setFullscreenItem({ text: item.text, category: item.category })}
                                            className="px-3.5 py-2.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
                                            title="Tampilkan Layar Penuh untuk Ditunjukkan ke Orang Lain"
                                        >
                                            <Maximize2 className="w-4 h-4 shrink-0" />
                                            <span>Tunjukkan</span>
                                        </button>

                                        {/* Tombol Suara Bicara Berwarna Kategori */}
                                        <button
                                            type="button"
                                            onClick={() => handleSpeak(item.text)}
                                            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs ${
                                                isSpeakingThis
                                                    ? 'bg-stone-900 hover:bg-stone-800 text-white'
                                                    : theme.speakBtnBg
                                            }`}
                                            title={isSpeakingThis ? 'Hentikan Suara' : 'Bunyikan Suara Kalimat'}
                                        >
                                            {isSpeakingThis ? (
                                                <>
                                                    <VolumeX className="w-4 h-4 shrink-0" />
                                                    <span>Berhenti</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Volume2 className="w-4 h-4 shrink-0" />
                                                    <span>Bicara</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

            </div>

            {/* MODAL TAMPILAN KARTU LAYAR PENUH (Untuk diperlihatkan langsung ke lawan bicara / orang lain) */}
            {fullscreenItem && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 bg-stone-950/95 flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-200 text-white"
                >
                    {/* Header Modal */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className={`w-3.5 h-3.5 rounded-full ${
                                fullscreenItem.category ? CATEGORY_THEMES[fullscreenItem.category].dotColor : 'bg-amber-400'
                            }`} />
                            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-stone-300">
                                Kartu Bantuan Komunikasi ABK
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                handleStopSpeech();
                                setFullscreenItem(null);
                            }}
                            className="p-2.5 bg-stone-800 hover:bg-stone-700 text-white rounded-xl transition-colors"
                            title="Tutup Tampilan Penuh"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Konten Teks Besar (Sangat mudah dibaca oleh lawan bicara) */}
                    <div className="my-auto py-10 max-w-3xl mx-auto w-full text-center">
                        <p className={`text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight ${
                            fullscreenItem.category ? CATEGORY_THEMES[fullscreenItem.category].fullscreenAccent : 'text-amber-300'
                        }`}>
                            "{fullscreenItem.text}"
                        </p>
                    </div>

                    {/* Tombol Kontrol Bawah */}
                    <div className="max-w-md mx-auto w-full flex flex-col sm:flex-row items-center gap-3">
                        <button
                            type="button"
                            onClick={() => handleSpeak(fullscreenItem.text)}
                            className={`w-full py-3.5 px-6 font-bold rounded-2xl text-base sm:text-lg flex items-center justify-center gap-2 transition-colors shadow-lg ${
                                fullscreenItem.category ? CATEGORY_THEMES[fullscreenItem.category].fullscreenBtn : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                            }`}
                        >
                            {speakingText === fullscreenItem.text ? (
                                <>
                                    <VolumeX className="w-5 h-5 shrink-0" />
                                    <span>Hentikan Suara</span>
                                </>
                            ) : (
                                <>
                                    <Volume2 className="w-5 h-5 shrink-0" />
                                    <span>Bunyikan Suara Keras</span>
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                handleStopSpeech();
                                setFullscreenItem(null);
                            }}
                            className="w-full sm:w-auto py-3.5 px-6 bg-stone-800 hover:bg-stone-700 text-white font-semibold rounded-2xl text-sm sm:text-base transition-colors whitespace-nowrap"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
