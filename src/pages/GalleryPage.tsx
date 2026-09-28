import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles, VolumeX, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GalleryImage {
    src: string;
    title: string;
    desc: string;
    category: 'Edukasi Sekolah' | 'Masyarakat & Media' | 'Sahabat Aruna' | 'Aruna Inklusiva';
}

// Seluruh Koleksi 45 Foto Dokumentasi Perjalanan Aruna
const GALLERY_IMAGES: GalleryImage[] = [
    // --- Kategori: Sahabat Aruna & Founder ---
    { 
        src: encodeURI('/dokumentasi/foto 1.jpeg'), 
        title: 'Pendiri Aruna', 
        desc: 'Momen kebersamaan para pendiri hebat di balik terciptanya platform ruang aman Aruna.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/foto 2.jpeg'), 
        title: 'Penghargaan Aruna', 
        desc: 'Apresiasi dan penghargaan atas dedikasi Aruna dalam melindungi perempuan dan anak.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/foto 3.jpeg'), 
        title: 'Ruang Aman Aruna', 
        desc: 'Suasana ruang konseling dan edukasi yang nyaman bagi siapa saja yang membutuhkan perlindungan.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/foto 5.jpeg'), 
        title: 'Sahabat Aruna', 
        desc: 'Komunitas kerelawanan perempuan muda Aruna yang siap berkolaborasi menebar dampak positif.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/foto 6.jpeg'), 
        title: 'Diskusi Sahabat Aruna', 
        desc: 'Sesi diskusi santai dan sharing session antar anggota Sahabat Aruna.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/foto 7.jpeg'), 
        title: 'Kolaborasi Relawan Aruna', 
        desc: 'Kolaborasi hangat bersama relawan dalam merencanakan program perlindungan perempuan.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/foto 8.jpeg'), 
        title: 'Foto Bersama Sahabat Aruna', 
        desc: 'Dokumentasi kebersamaan perwakilan Sahabat Aruna.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/foto bersama aruna.jpeg'), 
        title: 'Foto Bersama Tim & Sahabat Aruna', 
        desc: 'Kebersamaan seluruh tim inisiator dan relawan Sahabat Aruna dalam mengemban misi kemanusiaan.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/foto bersama aruna 2.jpeg'), 
        title: 'Dokumentasi Komunitas Aruna', 
        desc: 'Keseruan dan sinergi hangat komunitas relawan Aruna lintas program.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/Sahabat aruna smp 5.jpeg'), 
        title: 'Aksi Sahabat Aruna SMPN 5', 
        desc: 'Pemberdayaan rekan sebaya Sahabat Aruna di lingkungan SMPN 5 Kota Bontang.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/Sahabat aruna smp 5 2.jpeg'), 
        title: 'Pendampingan Sahabat Aruna SMPN 5', 
        desc: 'Diskusi aktif bersama siswa dan pengurus Sahabat Aruna mengenai kesehatan mental remaja.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/Sahabat aruna smp 5 3.jpeg'), 
        title: 'Dokumentasi Sahabat Aruna SMPN 5', 
        desc: 'Momen kebersamaan tim Sahabat Aruna setelah menyelesaikan sesi sosialisasi.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/Sahabat aruna smp 5 4.jpeg'), 
        title: 'Sesi Berbagi Sahabat Aruna SMPN 5', 
        desc: 'Ruang aman bagi para pelajar untuk saling bertukar cerita dan saling menguatkan.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/Sahabat aruna smp 5 5.jpeg'), 
        title: 'Gerakan Anti-Bullying SMPN 5', 
        desc: 'Deklarasi bersama mewujudkan lingkungan sekolah ramah anak dan bebas perundungan.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/Sosialisasi ke masyarakat 4.jpeg'), 
        title: 'Duta Sahabat Aruna', 
        desc: 'Aksi siswi duta Sahabat Aruna dalam membagikan media edukasi dan mengenalkan fitur perlindungan aplikasi Aruna.',
        category: 'Sahabat Aruna'
    },

    // --- Kategori: Edukasi Sekolah ---
    { 
        src: encodeURI('/dokumentasi/foto 4.jpeg'), 
        title: 'Sosialisasi SMAN 1 Bontang', 
        desc: 'Penyuluhan interaktif mengenai pentingnya menjaga boundaries dan kesehatan mental di sekolah.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/Aruna SMA.jpeg'), 
        title: 'Sosialisasi Pelajar SMA', 
        desc: 'Penyuluhan komprehensif bagi pelajar tingkat SMA tentang pencegahan kekerasan seksual dan relasi sehat.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/Aruna SMA 2.jpeg'), 
        title: 'Diskusi Interaktif Siswa SMA', 
        desc: 'Tanya jawab hangat bersama siswa SMA seputar batasan diri, consent, dan perlindungan privasi digital.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/foto 9.jpeg'), 
        title: 'Sosialisasi SMPN 8 Bontang', 
        desc: 'Edukasi literasi digital dan keamanan anak bagi siswa SMPN 8 Bontang.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/Aruna smp.jpeg'), 
        title: 'Edukasi Ramah Remaja SMP', 
        desc: 'Penyampaian materi anti-bullying dan kesehatan mental bagi remaja SMP dengan metode ramah anak.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/Aruna smp 2.jpeg'), 
        title: 'Sesi Belajar Partisipatif SMP', 
        desc: 'Murid-murid antusias mengikuti modul edukasi perlindungan diri dan mengenali hak pribadi.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/Aruna smp 3.jpeg'), 
        title: 'Penguatan Karakter Positif SMP', 
        desc: 'Membangun budaya saling menghargai dan empati antarteman di lingkungan kelas.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/Aruna Smp 4.jpeg'), 
        title: 'Foto Bersama Pendidik & Murid SMP', 
        desc: 'Sinergi positif antara dewan guru sekolah dan tim Aruna dalam mewujudkan ruang belajar aman.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/Aruna smp 5.jpeg'), 
        title: 'Aksi Kreatif Siswa SMP', 
        desc: 'Ekspresi siswa dalam mengkampanyekan ruang sekolah yang inklusif dan bebas kekerasan.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/foto 10.jpeg'), 
        title: 'Pengenalan Aruna melalui Poster', 
        desc: 'Kreativitas penyampaian informasi dan edukasi anti-kekerasan seksual melalui media poster visual.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/foto 11.jpeg'), 
        title: 'Pengenalan Website Aruna', 
        desc: 'Demonstrasi fitur-fitur website Aruna sebagai platform perlindungan digital perempuan dan anak.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/foto 12.jpeg'), 
        title: 'Edukasi Fitur Proteksi Aruna', 
        desc: 'Panduan praktis penggunaan fitur panic button dan chat AI di website Aruna.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/foto 13.jpeg'), 
        title: 'Sosialisasi Flash Card', 
        desc: 'Metode belajar menyenangkan bagi anak-anak tentang pengenalan hak dan batasan diri.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/foto 14.jpeg'), 
        title: 'Presentasi Platform Aruna', 
        desc: 'Presentasi detail sistem keamanan data pengguna pada platform terenkripsi Aruna.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/foto 15.jpeg'), 
        title: 'Sosialisasi SDN Muhammadiyah 1', 
        desc: 'Edukasi dini tentang perlindungan diri dan cara melapor sejak usia dini.',
        category: 'Edukasi Sekolah'
    },

    // --- Kategori: Masyarakat & Media ---
    { 
        src: encodeURI('/dokumentasi/Praja TV.jpeg'), 
        title: 'Wawancara Khusus Praja TV', 
        desc: 'Dialog publik di Praja TV mengenai pentingnya ruang aman bagi perempuan dan anak.',
        category: 'Masyarakat & Media'
    },
    { 
        src: encodeURI('/dokumentasi/Praja TV 2.jpeg'), 
        title: 'Studio Talkshow Praja TV', 
        desc: 'Penyebarluasan visi misi Aruna melalui media penyiaran Praja TV kepada masyarakat luas.',
        category: 'Masyarakat & Media'
    },
    { 
        src: encodeURI('/dokumentasi/Sosialisasi ke masyarakat 1.jpeg'), 
        title: 'Sosialisasi Warga Masyarakat', 
        desc: 'Edukasi langsung kepada warga mengenai hak perlindungan perempuan dan anak di ruang publik.',
        category: 'Masyarakat & Media'
    },
    { 
        src: encodeURI('/dokumentasi/Sosialisasi ke masyarakat 2.jpeg'), 
        title: 'Dialog Interaktif Komunitas Warga', 
        desc: 'Diskusi terbuka bersama para orang tua dan tokoh masyarakat sekitar.',
        category: 'Masyarakat & Media'
    },
    { 
        src: encodeURI('/dokumentasi/Sosialisasi ke masyarakat 3.jpeg'), 
        title: 'Penguatan Kesadaran Lingkungan', 
        desc: 'Mengajak warga bersama-sama menjaga keamanan anak dari ancaman kekerasan lingkungan sekitar.',
        category: 'Masyarakat & Media'
    },

    // --- Kategori: Aruna Inklusiva (Sahabat Disabilitas & ABK) ---
    { 
        src: encodeURI('/dokumentasi/foto bersama abk 3.jpeg'), 
        title: 'Momen Inklusi Sahabat ABK', 
        desc: 'Kebersamaan hangat dan edukatif bersama anak-anak berkebutuhan khusus.',
        category: 'Aruna Inklusiva'
    },
    { 
        src: encodeURI('/dokumentasi/foto bersama abk 4.jpeg'), 
        title: 'Senyum Bahagia Sahabat Inklusi', 
        desc: 'Aktivitas interaktif yang ceria dan merangkul keberagaman teman berkebutuhan khusus.',
        category: 'Aruna Inklusiva'
    },
    { 
        src: encodeURI('/dokumentasi/Foto Abk/foto abk 1.jpeg'), 
        title: 'Interaksi Hangat Inklusiva', 
        desc: 'Membangun kedekatan emosional dan komunikasi ramah bersama sahabat ABK.',
        category: 'Aruna Inklusiva'
    },
    { 
        src: encodeURI('/dokumentasi/Foto Abk/foto abk 2.jpeg'), 
        title: 'Pendampingan Sahabat ABK', 
        desc: 'Sesi kebersamaan yang penuh kepedulian dan kebahagiaan bersama anak-anak istimewa.',
        category: 'Aruna Inklusiva'
    },
    { 
        src: encodeURI('/dokumentasi/Foto Abk/foto abk 3.jpeg'), 
        title: 'Cerita & Potensi Sahabat ABK', 
        desc: 'Melihat potensi dan impian luar biasa yang dimiliki setiap anak tanpa diskriminasi.',
        category: 'Aruna Inklusiva'
    },
    { 
        src: encodeURI('/dokumentasi/Foto Abk/foto abk 4.jpeg'), 
        title: 'Ragam Bahasa Inklusi', 
        desc: 'Mengenal keberagaman komunikasi dan bahasa isyarat alami bersama teman inklusi.',
        category: 'Aruna Inklusiva'
    },
    { 
        src: encodeURI('/dokumentasi/Foto Abk/foto abk 5.jpeg'), 
        title: 'Belajar Bersama Tanpa Batas', 
        desc: 'Menciptakan ruang belajar yang setara, nyaman, dan saling mendukung bagi semua.',
        category: 'Aruna Inklusiva'
    },
    { 
        src: encodeURI('/dokumentasi/Foto Abk/foto abk 6.jpeg'), 
        title: 'Kemandirian & Rasa Percaya Diri', 
        desc: 'Mendorong kemandirian dan rasa percaya diri sahabat disabilitas dalam beraktivitas.',
        category: 'Aruna Inklusiva'
    },
    { 
        src: encodeURI('/dokumentasi/Foto Abk/foto abk 7.jpeg'), 
        title: 'Lingkungan Sekolah Ramah Inklusi', 
        desc: 'Mewujudkan sekolah yang aman dari perundungan dan diskriminasi bagi siswa disabilitas.',
        category: 'Aruna Inklusiva'
    },
    { 
        src: encodeURI('/dokumentasi/Foto Abk/foto abk 8.jpeg'), 
        title: 'Kebersamaan Sahabat ARUNA Inklusiva', 
        desc: 'Momen manis persahabatan yang tulus tanpa memandang perbedaan fisik maupun sensorik.',
        category: 'Aruna Inklusiva'
    }
];

// Featured Slides Terpilih untuk Auto Slider (Top 5 Representasi Tiap Pilar Utama)
const FEATURED_SLIDES: GalleryImage[] = [
    { 
        src: encodeURI('/dokumentasi/foto 1.jpeg'), 
        title: 'Pendiri Aruna', 
        desc: 'Momen kebersamaan para pendiri hebat di balik terciptanya platform ruang aman Aruna.',
        category: 'Sahabat Aruna'
    },
    { 
        src: encodeURI('/dokumentasi/Aruna SMA.jpeg'), 
        title: 'Sosialisasi Pelajar SMA', 
        desc: 'Penyuluhan komprehensif bagi pelajar tingkat SMA tentang pencegahan kekerasan dan boundaries.',
        category: 'Edukasi Sekolah'
    },
    { 
        src: encodeURI('/dokumentasi/Praja TV.jpeg'), 
        title: 'Wawancara Khusus Praja TV', 
        desc: 'Dialog publik di Praja TV mengenai pentingnya ruang aman bagi perempuan dan anak.',
        category: 'Masyarakat & Media'
    },
    { 
        src: encodeURI('/dokumentasi/Sosialisasi ke masyarakat 1.jpeg'), 
        title: 'Sosialisasi Warga Masyarakat', 
        desc: 'Edukasi langsung kepada warga mengenai hak perlindungan perempuan dan anak di ruang publik.',
        category: 'Masyarakat & Media'
    },
    { 
        src: encodeURI('/dokumentasi/foto bersama abk 4.jpeg'), 
        title: 'Senyum Bahagia Sahabat Inklusi', 
        desc: 'Aktivitas interaktif yang ceria dan merangkul keberagaman teman berkebutuhan khusus.',
        category: 'Aruna Inklusiva'
    }
];

const CATEGORIES = [
    'Semua', 
    'Edukasi Sekolah', 
    'Masyarakat & Media', 
    'Sahabat Aruna', 
    'Aruna Inklusiva'
] as const;

export default function GalleryPage() {
    const [sliderIndex, setSliderIndex] = useState<number>(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    
    // Audio Player State & Refs
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [hasScrolled, setHasScrolled] = useState<boolean>(false);
    const [hasBeenManuallyPaused, setHasBeenManuallyPaused] = useState<boolean>(false);

    // Filter Foto Sesuai Kategori yang Aktif
    const filteredImages = activeCategory === 'Semua' 
        ? GALLERY_IMAGES 
        : GALLERY_IMAGES.filter(imageItem => imageItem.category === activeCategory);

    // Auto Slider Interval (4 Detik)
    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, []);

    // Inisialisasi Audio Player
    useEffect(() => {
        audioRef.current = new Audio('/audio/PHOTOGRAPH.mp3.mpeg');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.35;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Scroll listener untuk pemicu auto-play audio
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setHasScrolled(true);
                if (audioRef.current && !isPlaying && !hasBeenManuallyPaused) {
                    audioRef.current.play()
                        .then(() => {
                            setIsPlaying(true);
                        })
                        .catch((error) => {
                            console.log("Autoplay menunggu interaksi pengguna:", error);
                        });
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isPlaying, hasBeenManuallyPaused]);

    // Aksesibilitas Keyboard untuk Lightbox (Escape, ArrowLeft, ArrowRight)
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (event.key === 'Escape') setLightboxIndex(null);
            if (event.key === 'ArrowRight') nextLightbox();
            if (event.key === 'ArrowLeft') prevLightbox();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
                setHasBeenManuallyPaused(true);
            } else {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        setHasBeenManuallyPaused(false);
                    })
                    .catch((error) => console.log(error));
            }
        }
    };

    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayRef.current = setInterval(() => {
            setSliderIndex(prevIndex => (prevIndex + 1) % FEATURED_SLIDES.length);
        }, 4000);
    };

    const stopAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    };

    const nextSlide = () => {
        stopAutoPlay();
        setSliderIndex(prevIndex => (prevIndex + 1) % FEATURED_SLIDES.length);
        startAutoPlay();
    };

    const prevSlide = () => {
        stopAutoPlay();
        setSliderIndex(prevIndex => (prevIndex - 1 + FEATURED_SLIDES.length) % FEATURED_SLIDES.length);
        startAutoPlay();
    };

    // Navigasi Lightbox (Menjelajahi seluruh foto galeri tanpa terpengaruh filter)
    const nextLightbox = (event?: React.MouseEvent) => {
        event?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length);
        }
    };

    const prevLightbox = (event?: React.MouseEvent) => {
        event?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
        }
    };

    const handleOpenLightbox = (imageItem: GalleryImage) => {
        const originalIndex = GALLERY_IMAGES.findIndex(original => original.src === imageItem.src);
        setLightboxIndex(originalIndex >= 0 ? originalIndex : 0);
    };

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-poppins pb-24 select-none">

            {/* --- BACKGROUND FX --- */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-rose-200/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-amber-200/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s' }}></div>
                <div className="absolute inset-0 opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 relative z-10">

                {/* --- HEADER --- */}
                <header className="relative text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
                    <div className="absolute left-0 top-0 sm:top-1 z-10">
                        <Link 
                            to="/" 
                            className="p-2 -ml-2 rounded-full hover:bg-stone-200/60 text-[#6B4F4F] transition-colors inline-flex items-center justify-center shrink-0 min-h-[44px] min-w-[44px]"
                            title="Kembali ke Beranda"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-[#6B4F4F] px-8 sm:px-12 mb-2">
                        Galeri <span className="italic text-[#c43c27]">Aruna</span>
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base opacity-75 leading-relaxed font-normal">
                        Dokumentasi seluruh perjalanan Aruna dalam mengedukasi, melindungi, dan mendampingi perempuan serta anak Indonesia untuk membangun ruang hidup yang aman dan inklusif.
                    </p>
                </header>

                {/* --- AUTO SLIDER / CAROUSEL --- */}
                <section className="mb-14 sm:mb-16 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-200 to-amber-200 rounded-[2rem] sm:rounded-[2.5rem] blur opacity-15 group-hover:opacity-25 transition duration-500"></div>
                    <div className="relative bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl overflow-hidden border border-white/60 aspect-[16/9] md:aspect-[21/9] max-h-[480px]">

                        {/* Slide Container */}
                        <div
                            className="w-full h-full flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
                        >
                            {FEATURED_SLIDES.map((slide, slideIndex) => (
                                <div key={slideIndex} className="w-full h-full flex-shrink-0 relative">
                                    <img
                                        src={slide.src}
                                        alt={slide.title}
                                        className="w-full h-full object-cover select-none"
                                        loading="eager"
                                    />
                                    {/* Caption Overlay pada Slider */}
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-4 sm:p-6 text-white">
                                        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#c43c27] bg-white/90 px-2 py-0.5 rounded-md inline-block mb-1">
                                            {slide.category}
                                        </span>
                                        <h3 className="text-base sm:text-xl font-bold leading-snug drop-shadow-xs">
                                            {slide.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-stone-200 line-clamp-1 font-light drop-shadow-xs">
                                            {slide.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            type="button"
                            onClick={prevSlide}
                            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-white/40 hover:bg-white/90 text-stone-900 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-md focus:outline-none min-h-[44px] min-w-[44px]"
                            title="Sebelumnya"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                        <button
                            type="button"
                            onClick={nextSlide}
                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-white/40 hover:bg-white/90 text-stone-900 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-md focus:outline-none min-h-[44px] min-w-[44px]"
                            title="Berikutnya"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* Dot Indicators */}
                        <div className="absolute bottom-3 right-4 flex gap-1.5 z-20">
                            {FEATURED_SLIDES.map((_, slideIndex) => (
                                <button
                                    key={slideIndex}
                                    type="button"
                                    onClick={() => {
                                        stopAutoPlay();
                                        setSliderIndex(slideIndex);
                                        startAutoPlay();
                                    }}
                                    className={`h-2 rounded-full transition-all duration-300 ${sliderIndex === slideIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                                    title={`Ke Slide ${slideIndex + 1}`}
                                />
                            ))}
                        </div>

                    </div>
                </section>

                {/* --- MASONRY / GRID GALLERY DOKUMENTASI --- */}
                <section>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-[#6B4F4F]/10 pb-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#6B4F4F]">
                            Seluruh Galeri Dokumentasi
                        </h2>
                        <span className="text-xs sm:text-sm text-stone-500 font-medium">
                            Menampilkan {filteredImages.length} dari {GALLERY_IMAGES.length} foto
                        </span>
                    </div>

                    {/* Filter Kategori Sederhana */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
                        {CATEGORIES.map(categoryItem => (
                            <button
                                key={categoryItem}
                                type="button"
                                onClick={() => setActiveCategory(categoryItem)}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border min-h-[40px] ${
                                    activeCategory === categoryItem
                                        ? 'bg-[#c43c27] text-white border-[#c43c27] shadow-sm'
                                        : 'bg-white/80 hover:bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                                }`}
                            >
                                {categoryItem} {categoryItem === 'Semua' ? `(${GALLERY_IMAGES.length})` : `(${GALLERY_IMAGES.filter(img => img.category === categoryItem).length})`}
                            </button>
                        ))}
                    </div>

                    {/* Grid Foto Dokumentasi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                        {filteredImages.map((imageItem, itemIndex) => (
                            <div
                                key={itemIndex}
                                onClick={() => handleOpenLightbox(imageItem)}
                                className="group bg-white/70 backdrop-blur-md rounded-[1.75rem] p-3 border border-stone-200/70 shadow-xs hover:shadow-xl hover:bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                            >
                                <div>
                                    <div className="rounded-[1.25rem] overflow-hidden aspect-[4/3] relative bg-stone-100">
                                        <img
                                            src={imageItem.src}
                                            alt={imageItem.title}
                                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-md">
                                                <Sparkles className="w-5 h-5 text-[#c43c27]" />
                                            </div>
                                        </div>

                                        {/* Kategori Badge di sudut foto */}
                                        <div className="absolute top-2.5 left-2.5">
                                            <span className="text-[10px] font-semibold bg-stone-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-md shadow-xs">
                                                {imageItem.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-3.5 px-1.5 pb-1">
                                        <h3 className="font-bold text-stone-800 text-sm tracking-tight mb-1 group-hover:text-[#c43c27] transition-colors leading-snug">
                                            {imageItem.title}
                                        </h3>
                                        <p className="text-xs text-stone-500 font-normal leading-relaxed line-clamp-2">
                                            {imageItem.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* --- LIGHTBOX MODAL --- */}
            {lightboxIndex !== null && (
                <div
                    onClick={() => setLightboxIndex(null)}
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                >
                    <button
                        type="button"
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors focus:outline-none z-[110] min-h-[44px] min-w-[44px] flex items-center justify-center"
                        title="Tutup"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Left Arrow */}
                    <button
                        type="button"
                        onClick={prevLightbox}
                        className="absolute left-3 md:left-8 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors focus:outline-none z-[110] min-h-[44px] min-w-[44px] flex items-center justify-center"
                        title="Sebelumnya"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    {/* High-Res Image Container */}
                    <div
                        onClick={(event) => event.stopPropagation()}
                        className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center relative px-2"
                    >
                        <img
                            src={GALLERY_IMAGES[lightboxIndex].src}
                            alt={GALLERY_IMAGES[lightboxIndex].title}
                            className="max-w-full max-h-[68vh] rounded-2xl object-contain shadow-2xl border border-white/10"
                        />
                        <div className="text-center mt-4 text-white max-w-xl px-4">
                            <span className="text-[11px] font-semibold text-[#c43c27] bg-white/90 px-2.5 py-0.5 rounded-md inline-block mb-1.5">
                                {GALLERY_IMAGES[lightboxIndex].category} ({lightboxIndex + 1} dari {GALLERY_IMAGES.length})
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold mb-1 tracking-tight">
                                {GALLERY_IMAGES[lightboxIndex].title}
                            </h3>
                            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                                {GALLERY_IMAGES[lightboxIndex].desc}
                            </p>
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        type="button"
                        onClick={nextLightbox}
                        className="absolute right-3 md:right-8 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors focus:outline-none z-[110] min-h-[44px] min-w-[44px] flex items-center justify-center"
                        title="Berikutnya"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </div>
            )}

            {/* Floating Music Control */}
            {hasScrolled && (
                <button 
                    type="button"
                    onClick={togglePlay}
                    className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-stone-200/50 text-[#c43c27] transition-all hover:scale-105 active:scale-95 group focus:outline-none"
                    title={isPlaying ? "Mute Backsound" : "Play Backsound"}
                >
                    {isPlaying ? (
                        <div className="flex items-end gap-[2px] h-4">
                            <span className="w-[3px] bg-[#c43c27] rounded-full animate-eq-bar-1 h-3"></span>
                            <span className="w-[3px] bg-[#c43c27] rounded-full animate-eq-bar-2 h-4"></span>
                            <span className="w-[3px] bg-[#c43c27] rounded-full animate-eq-bar-3 h-2"></span>
                            <span className="w-[3px] bg-[#c43c27] rounded-full animate-eq-bar-4 h-3.5"></span>
                        </div>
                    ) : (
                        <VolumeX className="w-5 h-5 text-stone-500" />
                    )}
                </button>
            )}

            <style>{`
                @keyframes eq-bar-1 {
                    0%, 100% { height: 6px; }
                    50% { height: 16px; }
                }
                @keyframes eq-bar-2 {
                    0%, 100% { height: 14px; }
                    50% { height: 6px; }
                }
                @keyframes eq-bar-3 {
                    0%, 100% { height: 8px; }
                    50% { height: 14px; }
                }
                @keyframes eq-bar-4 {
                    0%, 100% { height: 12px; }
                    50% { height: 4px; }
                }
                .animate-eq-bar-1 { animation: eq-bar-1 0.8s ease-in-out infinite; }
                .animate-eq-bar-2 { animation: eq-bar-2 0.7s ease-in-out infinite; }
                .animate-eq-bar-3 { animation: eq-bar-3 0.9s ease-in-out infinite; }
                .animate-eq-bar-4 { animation: eq-bar-4 0.6s ease-in-out infinite; }
            `}</style>

        </div>
    );
}
