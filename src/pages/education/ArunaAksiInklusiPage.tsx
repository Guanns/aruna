import React, { useState, useEffect } from 'react';
import { 
    ArrowLeft, 
    ChevronLeft, 
    Search, 
    BookOpen, 
    Languages, 
    X,
    Sparkles
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// RAGAM JENIS DISABILITAS
interface DisabilityType {
    id: string;
    title: string;
    description: string;
    characteristics: string;
    friendlyEtiquette: string;
    assistiveTools: string;
}

const RAGAM_DISABILITAS: DisabilityType[] = [
    {
        id: 'fisik',
        title: 'Disabilitas Fisik & Motorik',
        description: 'Terganggunya fungsi gerak tubuh akibat kondisi bawaan, kelumpuhan, cerebral palsy, amputasi, atau cedera fisik.',
        characteristics: 'Mengalami keterbatasan dalam mobilitas fisik, koordinasi gerak motorik, atau kekuatan otot saat beraktivitas.',
        friendlyEtiquette: 'Tanyakan terlebih dahulu sebelum membantu mendorong kursi roda. Jangan menyandarkan tangan atau memindahkan alat bantu gerak tanpa izin.',
        assistiveTools: 'Kursi roda, kruk tangan, walker, alat prostesis, serta jalur ramp landai pengganti tangga.'
    },
    {
        id: 'netra',
        title: 'Disabilitas Sensorik Netra',
        description: 'Gangguan fungsi penglihatan, baik bergradasi sebagian (low vision) hingga kehilangan penglihatan total (blind).',
        characteristics: 'Memahami lingkungan sekitar secara optimal melalui indra pendengaran, sentuhan raba, dan ingatan orientasi ruang.',
        friendlyEtiquette: 'Perkenalkan nama Anda saat mendekat atau menyapa. Berbicaralah langsung dengan suara wajar dan hindari menarik tangan secara mendadak.',
        assistiveTools: 'Tongkat putih pemandu (white cane), buku berhuruf Braille, dan aplikasi pembaca layar (screen reader) di gawai.'
    },
    {
        id: 'tuli',
        title: 'Disabilitas Sensorik Tuli & Wicara',
        description: 'Hambatan atau kehilangan fungsi indra pendengaran serta keterbatasan komunikasi secara lisan verbal.',
        characteristics: 'Mengandalkan komunikasi visual melalui bahasa isyarat alami, ekspresi gerak wajah, artikulasi bibir, dan catatan teks tertulis.',
        friendlyEtiquette: 'Tatap wajah saat berbicara, pastikan pencahayaan cukup, berbicaralah dengan tempo wajar, atau gunakan aplikasi catatan di telepon pintar.',
        assistiveTools: 'Bahasa Isyarat Indonesia (BISINDO), alat bantu dengar (hearing aid), dan takarir visual (closed captions).'
    },
    {
        id: 'intelektual',
        title: 'Disabilitas Intelektual',
        description: 'Keterbatasan dalam fungsi kognitif dan keterampilan adaptif sehari-hari (contoh: Down Syndrome).',
        characteristics: 'Membutuhkan waktu lebih untuk mencerna konsep abstrak, instruksi yang terlalu cepat, atau perubahan rutinitas mendadak.',
        friendlyEtiquette: 'Gunakan kalimat yang ringkas, jelas, dan ramah. Berikan waktu jeda yang cukup untuk merespons tanpa memotong pembicaraan.',
        assistiveTools: 'Instruksi bergambar (visual schedule), kartu petunjuk langkah kegiatan, dan modul belajar bertahap.'
    },
    {
        id: 'mental',
        title: 'Disabilitas Mental & Psikososial',
        description: 'Terganggunya fungsi pikir, kestabilan suasana hati, atau perilaku (contoh: depresi klinis, kecemasan berlebih, bipolar).',
        characteristics: 'Dapat mengalami fluktuasi emosi, rasa lelah psikologis, atau sensasi panik pada situasi sosial tertentu.',
        friendlyEtiquette: 'Dengarkan dengan penuh empati tanpa menghakimi atau meremehkan perasaan mereka, dan berikan ruang tenang yang aman.',
        assistiveTools: 'Dukungan konseling berkala, teknik relaksasi mandiri, dan lingkungan pertemanan yang bebas perundungan.'
    },
    {
        id: 'perkembangan',
        title: 'Disabilitas Perkembangan & Neurodivergen',
        description: 'Variasi alami dalam perkembangan sistem saraf dan pemrosesan informasi (contoh: Autisme/ASD, ADHD, Disleksia).',
        characteristics: 'Memiliki pola fokus mendalam, cara komunikasi khas, serta kepekaan tinggi terhadap suara bising atau pencahayaan silau.',
        friendlyEtiquette: 'Hargai stimming (gerakan menenangkan diri) dan hindari memaksa kontak mata langsung jika membuat mereka merasa tidak nyaman.',
        assistiveTools: 'Peredam suara (noise-cancelling headphones), kartu komunikasi AAC, dan lingkungan belajar ramah sensori.'
    }
];

// KAMUS BAHASA MENGENAI PARA ABK (Glosarium Interaktif)
interface GlossaryTerm {
    term: string;
    meaning: string;
    example: string;
    category: 'Istilah' | 'Komunikasi' | 'Etika';
}

const KAMUS_ABK: GlossaryTerm[] = [
    {
        term: 'Neurodivergent',
        meaning: 'Variasi alami dalam fungsi neurologis dan cara kerja otak seseorang, seperti pada individu autistik, ADHD, disleksia, dan sindrom Tourette.',
        example: 'Ali adalah seorang neurodivergent yang memiliki kepekaan visual dan daya ingat analitis sangat tinggi.',
        category: 'Istilah',
    },
    {
        term: 'Non-Verbal',
        meaning: 'Kondisi di mana seseorang tidak berkomunikasi secara lisan dengan kata-kata, melainkan menggunakan kartu komunikasi visual (AAC), tulisan, atau gestur.',
        example: 'Teman kita berkomunikasi secara non-verbal menggunakan papan gambar atau aplikasi gawai komunikasi.',
        category: 'Komunikasi',
    },
    {
        term: 'Sensory Overload',
        meaning: 'Kondisi kewalahan saat otak menerima terlalu banyak rangsangan indra sekaligus (suara bising mendadak, lampu terlalu silau, atau kerumunan padat).',
        example: 'Saat ruang kelas terlalu gaduh, ia membutuhkan waktu sejenak di pojok tenang untuk meredakan sensory overload.',
        category: 'Istilah',
    },
    {
        term: 'BISINDO (Bahasa Isyarat Indonesia)',
        meaning: 'Bahasa isyarat alami yang berkembang secara kultural di kalangan komunitas Tuli di Indonesia untuk berkomunikasi visual secara ekspresif.',
        example: 'Mempelajari dasar BISINDO membantu kita berinteraksi langsung dan menjalin persahabatan akrab dengan teman Tuli.',
        category: 'Komunikasi',
    },
    {
        term: 'Person-First Language',
        meaning: 'Prinsip berbahasa yang mendahulukan penyebutan orang sebelum kondisinya untuk menegaskan rasa hormat dan martabat kemanusiaan.',
        example: 'Gunakan frasa "penyandang disabilitas" atau "anak berkebutuhan khusus", bukan kata yang bernada merendahkan.',
        category: 'Etika',
    },
    {
        term: 'Stimming (Self-Stimulation)',
        meaning: 'Gerakan atau suara berulang (seperti mengetuk meja perlahan atau mengepakkan tangan) yang dilakukan untuk meregulasi diri dan menenangkan emosi.',
        example: 'Jangan melarang atau menertawakan stimming karena itu cara alami mereka meredakan ketegangan pikiran.',
        category: 'Etika',
    },
    {
        term: 'Braille',
        meaning: 'Sistem tulisan dan cetakan sentuh menggunakan kombinasi titik-titik timbul yang dibaca dengan ujung jari oleh penyandang disabilitas netra.',
        example: 'Buku pelajaran di perpustakaan sekolah kini mulai dilengkapi versi huruf Braille.',
        category: 'Komunikasi',
    },
    {
        term: 'Aksesibilitas',
        meaning: 'Kemudahan dan keterjangkauan yang disediakan agar bangunan, informasi, dan teknologi dapat diakses dan digunakan secara mandiri oleh semua orang.',
        example: 'Adanya jalur ramp landai di samping tangga adalah wujud nyata pemenuhan aksesibilitas fisik di sekolah.',
        category: 'Istilah',
    },
    {
        term: 'AAC (Augmentative and Alternative Communication)',
        meaning: 'Metode komunikasi alternatif berupa simbol, gambar, papan kata, atau perangkat digital untuk membantu individu yang memiliki kesulitan berbicara lisan.',
        example: 'Guru pendamping menggunakan buku simbol AAC untuk mempermudah murid mengekspresikan keinginannya.',
        category: 'Komunikasi',
    },
    {
        term: 'Tongkat Putih Pemandu (White Cane)',
        meaning: 'Alat bantu mobilitas mandiri berwarna putih yang digunakan teman netra untuk mendeteksi kontur jalan, undakan, dan rintangan di depan mereka.',
        example: 'Ketika melihat teman dengan tongkat putih melangkah, berikan ruang jalan yang bersih dari hambatan barang.',
        category: 'Etika',
    },
    {
        term: 'Sensory-Friendly Space',
        meaning: 'Area atau ruangan yang dirancang khusus dengan pencahayaan lembut dan peredam kebisingan guna memberikan rasa aman bagi individu neurodivergen.',
        example: 'Sekolah menyediakan ruang istirahat ramah sensori untuk meredakan kelelahan mental murid.',
        category: 'Istilah',
    }
];

export default function ArunaAksiInklusiPage() {
    const location = useLocation();
    const [selectedMenu, setSelectedMenu] = useState<'none' | 'disabilitas' | 'kamus'>('none');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<'Semua' | 'Istilah' | 'Komunikasi' | 'Etika'>('Semua');

    // Scroll ke atas setiap kali menu berganti
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [selectedMenu]);

    // Filter istilah kamus berdasarkan teks pencarian dan kategori
    const filteredTerms = KAMUS_ABK.filter((termItem) => {
        const matchesQuery = 
            termItem.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            termItem.meaning.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Semua' || termItem.category === selectedCategory;
        return matchesQuery && matchesCategory;
    });

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-900 font-poppins pb-16 sm:pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-28">
                
                {/* Navigasi Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
                    {selectedMenu !== 'none' ? (
                        <button
                            type="button"
                            onClick={() => setSelectedMenu('none')}
                            className="inline-flex items-center gap-2 text-stone-700 hover:text-stone-950 text-xs sm:text-sm font-semibold transition-colors bg-white border border-stone-200/90 hover:border-stone-300 px-3.5 py-2 rounded-xl shadow-xs"
                        >
                            <ChevronLeft className="w-4 h-4 shrink-0" />
                            <span>Kembali ke Pilihan Menu</span>
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link 
                                to="/education/inklusiva" 
                                className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-semibold transition-colors"
                                title="Kembali ke Aruna Inklusiva"
                            >
                                <ArrowLeft className="w-4 h-4 shrink-0" />
                                <span>Aruna Inklusiva</span>
                            </Link>
                            <span className="text-stone-300">/</span>
                            <Link 
                                to="/education" 
                                className="text-stone-500 hover:text-stone-800 text-xs sm:text-sm font-normal transition-colors"
                            >
                                Edukasi
                            </Link>
                        </div>
                    )}
                </div>

                {/* TAMPILAN 1: DUA MENU LINGKARAN BESAR */}
                {selectedMenu === 'none' && (
                    <div>
                        {/* Header Halaman Bebas Badge Pill di Atas Heading */}
                        <header className="mb-10 sm:mb-12">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                                ARUNA AKSI INKLUSI
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg text-stone-600 font-normal leading-relaxed mt-2 max-w-3xl">
                                Ruang Edukasi & Aksi Nyata untuk Memahami Ragam Disabilitas serta Bahasa Inklusif Ramah Sahabat ABK
                            </p>
                        </header>

                        {/* Kartu Container Menu Lingkaran */}
                        <div className="bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-xs text-center">
                            <h2 className="text-base sm:text-xl font-bold text-stone-900 mb-2">
                                Pilih Fitur Pembelajaran
                            </h2>
                            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-10 sm:mb-12 leading-relaxed">
                                Pilih salah satu lingkaran di bawah untuk menjelajahi modul karakteristik disabilitas atau membuka kamus istilah interaktif:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 max-w-2xl mx-auto py-2">
                                
                                {/* LINGKARAN 1: RAGAM DISABILITAS */}
                                <div 
                                    onClick={() => setSelectedMenu('disabilitas')}
                                    className="w-48 h-48 sm:w-60 sm:h-60 mx-auto rounded-full bg-[#FFFBF5] border-4 border-stone-800 hover:border-stone-950 p-5 sm:p-7 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' || event.key === ' ') {
                                            setSelectedMenu('disabilitas');
                                        }
                                    }}
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-stone-100 group-hover:bg-stone-900 group-hover:text-white text-stone-900 flex items-center justify-center mb-3 transition-colors">
                                        <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </div>
                                    <h3 className="text-sm sm:text-base font-extrabold text-stone-900 group-hover:text-stone-950 mb-1 leading-tight">
                                        Ragam Disabilitas
                                    </h3>
                                    <p className="text-[11px] sm:text-xs text-stone-600 leading-tight">
                                        Karakteristik & Etika Interaksi
                                    </p>
                                </div>

                                {/* LINGKARAN 2: KAMUS BAHASA ABK */}
                                <div 
                                    onClick={() => setSelectedMenu('kamus')}
                                    className="w-48 h-48 sm:w-60 sm:h-60 mx-auto rounded-full bg-[#FFFBF5] border-4 border-stone-800 hover:border-stone-950 p-5 sm:p-7 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' || event.key === ' ') {
                                            setSelectedMenu('kamus');
                                        }
                                    }}
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-stone-100 group-hover:bg-stone-900 group-hover:text-white text-stone-900 flex items-center justify-center mb-3 transition-colors">
                                        <Languages className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </div>
                                    <h3 className="text-sm sm:text-base font-extrabold text-stone-900 group-hover:text-stone-950 mb-1 leading-tight">
                                        Kamus Bahasa ABK
                                    </h3>
                                    <p className="text-[11px] sm:text-xs text-stone-600 leading-tight">
                                        Glosarium Istilah & Etika
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {/* TAMPILAN 2: DETAIL RAGAM JENIS DISABILITAS */}
                {selectedMenu === 'disabilitas' && (
                    <div>
                        <header className="mb-8">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
                                Ragam Jenis Disabilitas
                            </h2>
                            <p className="text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed mt-1.5 max-w-3xl">
                                Mengenal berbagai ragam disabilitas, karakteristik, cara berinteraksi secara santun, dan alat bantu yang digunakan:
                            </p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            {RAGAM_DISABILITAS.map((disability) => (
                                <div 
                                    key={disability.id}
                                    className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-colors hover:border-stone-300"
                                >
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-2">
                                            {disability.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
                                            {disability.description}
                                        </p>
                                        
                                        <div className="space-y-2.5 text-xs text-stone-700">
                                            <div>
                                                <span className="font-bold text-stone-900">Karakteristik: </span>
                                                <span className="leading-relaxed">{disability.characteristics}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-stone-900">Etika Interaksi: </span>
                                                <span className="leading-relaxed">{disability.friendlyEtiquette}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 pt-3.5 border-t border-stone-100 bg-stone-50/80 p-3 rounded-xl text-xs text-stone-700">
                                        <span className="font-bold text-stone-900">Alat Bantu: </span>
                                        <span className="text-stone-600">{disability.assistiveTools}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAMPILAN 3: KAMUS BAHASA MENGENAI PARA ABK */}
                {selectedMenu === 'kamus' && (
                    <div>
                        <header className="mb-6">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
                                Kamus Bahasa Mengenai Para ABK
                            </h2>
                            <p className="text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed mt-1.5 max-w-3xl mb-5">
                                Glosarium istilah, bahasa komunikasi, dan etika berinteraksi ramah dengan teman berkebutuhan khusus:
                            </p>

                            {/* Kotak Pencarian Istilah */}
                            <div className="relative mb-3">
                                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                                <input 
                                    type="text"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Cari istilah..."
                                    className="w-full bg-white border border-stone-300 pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 transition-colors min-h-[44px]"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-stone-400 hover:text-stone-600"
                                        title="Hapus pencarian"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Filter Kategori Glosarium */}
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                                {(['Semua', 'Istilah', 'Komunikasi', 'Etika'] as const).map((categoryName) => (
                                    <button
                                        key={categoryName}
                                        type="button"
                                        onClick={() => setSelectedCategory(categoryName)}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border min-h-[38px] ${
                                            selectedCategory === categoryName
                                                ? 'bg-stone-900 text-white border-stone-900'
                                                : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                                        }`}
                                    >
                                        {categoryName}
                                    </button>
                                ))}
                            </div>
                        </header>

                        {/* Daftar Kartu Istilah */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                            {filteredTerms.length === 0 ? (
                                <div className="col-span-full bg-white border border-stone-200 rounded-2xl p-8 text-center text-xs sm:text-sm text-stone-600">
                                    Istilah "{searchTerm}" tidak ditemukan. Coba gunakan kata kunci lainnya.
                                </div>
                            ) : (
                                filteredTerms.map((termItem, index) => (
                                    <div 
                                        key={index}
                                        className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-colors hover:border-stone-300"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-2">
                                                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                                                    {termItem.term}
                                                </h3>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                                                    {termItem.category}
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-3">
                                                {termItem.meaning}
                                            </p>
                                        </div>

                                        <div className="pt-2.5 border-t border-stone-100 text-[11px] sm:text-xs text-stone-600 leading-relaxed bg-stone-50/80 p-2.5 rounded-xl">
                                            <span className="font-bold text-stone-900">Contoh: </span>
                                            "{termItem.example}"
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
