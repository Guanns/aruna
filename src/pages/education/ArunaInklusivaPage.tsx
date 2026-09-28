import React, { useState, useRef } from 'react';
import { 
    ArrowLeft, 
    ChevronUp,
    CheckCircle2 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface PilarTujuan {
    nomor: string;
    title: string;
    description: string;
    image: string;
    altText: string;
}

const PILAR_TUJUAN: PilarTujuan[] = [
    {
        nomor: '01',
        title: 'MENGENAL',
        description: 'Mengenal keberagaman disabilitas dan memahami bahwa setiap individu memiliki kebutuhan serta kemampuan yang beragam.',
        image: encodeURI('/dokumentasi/Foto Abk/foto abk 4.jpeg'),
        altText: 'Dokumentasi mengenal keberagaman ABK',
    },
    {
        nomor: '02',
        title: 'MEMAHAMI',
        description: 'Membangun pemahaman yang benar dan mengurangi stigma maupun kesalahpahaman tentang disabilitas.',
        image: encodeURI('/dokumentasi/Foto Abk/foto abk 5.jpeg'),
        altText: 'Dokumentasi interaksi dan pemahaman bersama',
    },
    {
        nomor: '03',
        title: 'MENGHARGAI',
        description: 'Membangun empati dan belajar berinteraksi dengan cara yang tepat serta menghormati kemandirian setiap individu.',
        image: encodeURI('/dokumentasi/Foto Abk/foto abk 6.jpeg'),
        altText: 'Dokumentasi saling menghargai dan kemandirian',
    },
    {
        nomor: '04',
        title: 'MELINDUNGI',
        description: 'Mendorong lingkungan yang aman dan bebas dari bullying, diskriminasi, serta perlakuan yang merendahkan.',
        image: encodeURI('/dokumentasi/Foto Abk/foto abk 7.jpeg'),
        altText: 'Dokumentasi lingkungan inklusif dan aman',
    },
];

const PROGRAM_GOALS: string[] = [
    'Meningkatkan pemahaman generasi muda tentang disabilitas dan inklusivitas.',
    'Membangun empati agar peserta dapat melihat perbedaan tanpa stigma dan prasangka.',
    'Mendorong sikap inklusif dalam berkomunikasi dan berinteraksi sehari-hari.',
    'Mengidentifikasi hambatan yang dapat membuat lingkungan sekolah kurang ramah atau sulit diakses.',
    'Mendorong aksi nyata melalui solusi sederhana yang dapat diterapkan bersama.',
];

export default function ArunaInklusivaPage() {
    const navigate = useNavigate();

    // Ref untuk gestur swipe sentuh layar & elemen indikator
    const touchStartY = useRef<number | null>(null);
    const pullIndicatorRef = useRef<HTMLDivElement | null>(null);

    // State untuk efek interaktif ikon ketarik (rubber-band pull) dan transisi halaman
    const [pullDistance, setPullDistance] = useState<number>(0);
    const [isPulling, setIsPulling] = useState<boolean>(false);
    const [isPageTransitioning, setIsPageTransitioning] = useState<boolean>(false);

    // Fungsi transisi halus berpindah ke halaman Aruna Aksi Inklusi
    const handleTriggerNavigation = () => {
        if (isPageTransitioning) return;
        setIsPageTransitioning(true);
        setTimeout(() => {
            navigate('/education/aksi-inklusi');
        }, 320);
    };

    // Handler Gestur Sentuh Tarik dari Bawah ke Atas (Aktif jika di bawah halaman atau menyentuh indikator)
    const handleTouchStart = (event: React.TouchEvent) => {
        if (isPageTransitioning) return;

        // Periksa apakah posisi scroll pengguna sudah sampai di paling bawah halaman
        const scrollBottomPosition = window.innerHeight + window.scrollY;
        const totalDocumentHeight = document.documentElement.scrollHeight;
        const isScrolledToBottom = scrollBottomPosition >= totalDocumentHeight - 50;

        // Atau jika titik awal sentuhan berada di area indikator tarik bawah
        const isTouchTargetIndicator = 
            pullIndicatorRef.current !== null && 
            pullIndicatorRef.current.contains(event.target as Node);

        if (isScrolledToBottom || isTouchTargetIndicator) {
            touchStartY.current = event.touches[0].clientY;
            setIsPulling(true);
        } else {
            touchStartY.current = null;
            setIsPulling(false);
            setPullDistance(0);
        }
    };

    const handleTouchMove = (event: React.TouchEvent) => {
        if (touchStartY.current === null || isPageTransitioning) return;
        const currentTouchY = event.touches[0].clientY;
        const deltaTouchY = touchStartY.current - currentTouchY;

        // Hanya hitung tarikan ketika digeser ke atas
        if (deltaTouchY > 0) {
            // Berikan resistensi fisik elastis (rubber-band)
            const elasticPull = Math.min(deltaTouchY * 0.55, 80);
            setPullDistance(elasticPull);
        } else {
            setPullDistance(0);
        }
    };

    const handleTouchEnd = () => {
        if (touchStartY.current === null) return;
        
        // Jika tarikan melampaui batas 45px, buka halaman Aruna Aksi Inklusi
        if (pullDistance > 45 && !isPageTransitioning) {
            handleTriggerNavigation();
        }
        
        // Reset animasi dengan transisi halus
        setIsPulling(false);
        setPullDistance(0);
        touchStartY.current = null;
    };

    return (
        <div 
            className={`w-full min-h-screen bg-[#FFFBF5] text-stone-900 font-poppins pb-12 sm:pb-16 transition-all duration-300 ease-out ${
                isPageTransitioning ? '-translate-y-12 opacity-0' : 'translate-y-0 opacity-100'
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-28">
                
                {/* Navigasi Kembali */}
                <div className="mb-6">
                    <Link 
                        to="/education" 
                        className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-semibold transition-colors"
                        title="Kembali ke Menu Edukasi"
                    >
                        <ArrowLeft className="w-4 h-4 shrink-0" />
                        <span>Kembali ke Edukasi</span>
                    </Link>
                </div>

                {/* 1. HERO & KATA SAMBUTAN (Bebas badge pill di atas heading) */}
                <header className="mb-12 sm:mb-16">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                        ARUNA INKLUSIVA
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-stone-600 font-normal leading-relaxed mt-2 max-w-3xl">
                        Ruang Aman untuk Memahami, Menghargai, dan Merangkul Perbedaan
                    </p>

                    {/* Sambutan & Foto Dokumentasi Kolase */}
                    <div className="mt-8 bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-xs">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                            
                            {/* Teks Sambutan */}
                            <div className="lg:col-span-7 space-y-4">
                                <p className="text-base sm:text-lg font-bold text-stone-900">
                                    Halo #SahabatARUNA!
                                </p>
                                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                                    Setiap orang memiliki cara yang berbeda dalam belajar, berkomunikasi, bergerak, dan menjalani kehidupan. Perbedaan adalah bagian dari keberagaman manusia.
                                </p>
                                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                                    Maka dari itu, <span className="font-semibold text-stone-900">ARUNA Inklusiva</span> hadir sebagai ruang edukasi untuk mengenal disabilitas, keberagaman kebutuhan, dan pentingnya lingkungan yang inklusif. Di sini, kita belajar melihat seseorang bukan dari keterbatasannya, tetapi dari potensi, impian, pengalaman, dan hak yang dimilikinya.
                                </p>
                            </div>

                            {/* Kolase Foto Dokumentasi ABK di Bagian Sambutan (Pola 2 + 1 Asli, Tajam & Presisi) */}
                            <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3 items-center">
                                {/* Kolom Kiri: 2 foto ditumpuk vertikal */}
                                <div className="space-y-2.5 sm:space-y-3">
                                    <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200/90 bg-stone-100 shadow-xs">
                                        <img 
                                            src={encodeURI('/dokumentasi/Foto Abk/foto abk 1.jpeg')} 
                                            alt="Dokumentasi Sahabat ARUNA 1" 
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200/90 bg-stone-100 shadow-xs">
                                        <img 
                                            src={encodeURI('/dokumentasi/Foto Abk/foto abk 2.jpeg')} 
                                            alt="Dokumentasi Sahabat ARUNA 2" 
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                {/* Kolom Kanan: 1 foto portrait penuh */}
                                <div>
                                    <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200/90 bg-stone-100 shadow-xs">
                                        <img 
                                            src={encodeURI('/dokumentasi/Foto Abk/foto abk 3.jpeg')} 
                                            alt="Dokumentasi Sahabat ARUNA 3" 
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </header>

                {/* 2. TUJUAN ARUNA INKLUSIVA (4 Pilar Bersih & Elegan) */}
                <section className="mb-14 sm:mb-16">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
                        TUJUAN ARUNA INKLUSIVA
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 font-normal mt-1.5 mb-6 max-w-2xl leading-relaxed">
                        Empat pilar utama dalam membangun kesadaran, empati, dan perlindungan nyata bagi semua teman.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {PILAR_TUJUAN.map((pilarItem) => (
                            <div 
                                key={pilarItem.nomor}
                                className="bg-white border border-stone-200/90 hover:border-stone-300 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between transition-colors"
                            >
                                <div>
                                    {/* Foto Dokumentasi Pilar */}
                                    <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 border-b border-stone-200/80">
                                        <img 
                                            src={pilarItem.image} 
                                            alt={pilarItem.altText} 
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Konten Teks Pilar */}
                                    <div className="p-4 sm:p-5">
                                        <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight mb-2">
                                            {pilarItem.nomor}. {pilarItem.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                                            {pilarItem.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. PROGRAM INTI: ARUNA AKSI INKLUSI! */}
                <section className="mb-14 sm:mb-16">
                    <div className="bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-xs">
                        
                        {/* Header Program (Bebas badge pill di atas heading) */}
                        <div className="mb-8 border-b border-stone-100 pb-6">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
                                ARUNA AKSI INKLUSI
                            </h2>
                            <p className="text-xs sm:text-sm font-semibold text-stone-600 mt-1 tracking-wide">
                                From Education, to Action!
                            </p>
                            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mt-3 max-w-3xl">
                                Merupakan program edukasi dan aksi yang mengajak generasi muda memahami keberagaman, mengenali hambatan di lingkungan sekitar, dan ikut menciptakan perubahan yang lebih inklusif.
                            </p>
                        </div>

                        {/* Tujuan Program (Full Width, Bersih & Terstruktur) */}
                        <div className="bg-stone-50/80 border border-stone-200/80 rounded-2xl p-5 sm:p-6 mb-6">
                            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-stone-700 shrink-0" />
                                <span>Tujuan Program</span>
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                {PROGRAM_GOALS.map((goal, index) => (
                                    <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700 leading-relaxed bg-white border border-stone-200/70 p-3 sm:p-3.5 rounded-xl">
                                        <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                            {index + 1}
                                        </span>
                                        <span>{goal}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Penutup Program */}
                        <div className="pt-4 border-t border-stone-100 text-center">
                            <p className="text-xs sm:text-sm font-semibold text-stone-800 leading-relaxed max-w-2xl mx-auto">
                                Dengan demikian, <span className="text-stone-950 font-bold">ARUNA AKSI INKLUSI</span> tidak berhenti pada edukasi, tetapi membawa pengetahuan menjadi kepedulian dan kepedulian menjadi tindakan nyata!
                            </p>
                        </div>

                    </div>
                </section>

                {/* 4. Indikator Tarik ke Atas untuk Berpindah Halaman ke Aruna Aksi Inklusi */}
                <div 
                    ref={pullIndicatorRef}
                    onClick={handleTriggerNavigation}
                    className="pt-6 pb-12 flex flex-col items-center justify-center cursor-pointer select-none group"
                    aria-label="Tarik ke atas atau sentuh untuk membuka Aruna Aksi Inklusi"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            handleTriggerNavigation();
                        }
                    }}
                >
                    <div 
                        style={{
                            transform: `translateY(-${pullDistance}px)`,
                            transition: isPulling ? 'none' : 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        }}
                        className="flex flex-col items-center gap-2"
                    >
                        {/* Garis tarikan elastis yang melebar saat ditarik */}
                        <div 
                            className="h-1 rounded-full bg-stone-300 group-hover:bg-stone-500 transition-all duration-150"
                            style={{
                                width: `${Math.min(36 + pullDistance * 0.45, 68)}px`,
                            }}
                        />

                        {/* Ikon lingkaran yang ketarik ke atas */}
                        <div 
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                                pullDistance > 45 || isPageTransitioning
                                    ? 'bg-stone-950 text-white' 
                                    : 'bg-stone-900 text-white group-hover:bg-stone-800'
                            }`}
                        >
                            <ChevronUp 
                                className="w-6 h-6 transition-transform" 
                                style={{
                                    transform: `translateY(-${Math.min(pullDistance * 0.15, 6)}px)`
                                }}
                            />
                        </div>

                        {/* Teks petunjuk ringkas & dinamis */}
                        <span className="text-xs font-semibold text-stone-600 group-hover:text-stone-950 transition-colors">
                            {isPageTransitioning
                                ? 'Membuka Aruna Aksi Inklusi...'
                                : pullDistance > 45 
                                    ? 'Lepaskan untuk berpindah halaman' 
                                    : 'Tarik ke atas untuk Aruna Aksi Inklusi'}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}
