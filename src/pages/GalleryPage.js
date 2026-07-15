import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/solid';
// List 15 Dokumentasi Foto
const GALLERY_IMAGES = [
    { src: '/dokumentasi/foto 1.jpeg', title: 'Pendiri Aruna', desc: 'Momen kebersamaan para pendiri hebat di balik terciptanya platform ruang aman Aruna.' },
    { src: '/dokumentasi/foto 2.jpeg', title: 'Dokumentasi Penghargaan Aruna', desc: 'Apresiasi dan penghargaan atas dedikasi Aruna dalam melindungi perempuan dan anak.' },
    { src: '/dokumentasi/foto 3.jpeg', title: 'Ruang Aman Aruna', desc: 'Suasana ruang konseling dan edukasi yang nyaman bagi siapa saja yang membutuhkan perlindungan.' },
    { src: '/dokumentasi/foto 4.jpeg', title: 'Sosialisasi SMAN 1 Bontang', desc: 'Penyuluhan interaktif mengenai pentingnya menjaga boundaries dan kesehatan mental di sekolah.' },
    { src: '/dokumentasi/foto 5.jpeg', title: 'Sahabat Aruna', desc: 'Komunitas kerelawanan perempuan muda Aruna yang siap berkolaborasi menebar dampak positif.' },
    { src: '/dokumentasi/foto 6.jpeg', title: 'Sahabat Aruna', desc: 'Sesi diskusi santai dan sharing session antar anggota Sahabat Aruna.' },
    { src: '/dokumentasi/foto 7.jpeg', title: 'Sahabat Aruna', desc: 'Kolaborasi hangat bersama relawan dalam merencanakan program perlindungan perempuan.' },
    { src: '/dokumentasi/foto 8.jpeg', title: 'Sahabat Aruna', desc: 'Foto bersama perwakilan Sahabat Aruna.' },
    { src: '/dokumentasi/foto 9.jpeg', title: 'Sosialisasi SMPN 8 Bontang', desc: 'Edukasi literasi digital dan keamanan anak bagi siswa SMPN 8 Bontang.' },
    { src: '/dokumentasi/foto 10.jpeg', title: 'Pengenalan Aruna melalui metode Poster', desc: 'Kreativitas penyampaian informasi dan edukasi anti-kekerasan seksual melalui media poster visual.' },
    { src: '/dokumentasi/foto 11.jpeg', title: 'Pengenalan Website Aruna', desc: 'Demonstrasi fitur-fitur website Aruna sebagai platform perlindungan digital perempuan.' },
    { src: '/dokumentasi/foto 12.jpeg', title: 'Pengenalan Website Aruna', desc: 'Panduan praktis penggunaan fitur panic button dan chat AI di website Aruna.' },
    { src: '/dokumentasi/foto 13.jpeg', title: 'Sosialisasi menggunakan Flash Card', desc: 'Metode belajar menyenangkan bagi anak-anak tentang pengenalan hak dan batasan diri.' },
    { src: '/dokumentasi/foto 14.jpeg', title: 'Pengenalan Website Aruna', desc: 'Presentasi detail sistem keamanan data pengguna pada platform terenkripsi Aruna.' },
    { src: '/dokumentasi/foto 15.jpeg', title: 'Sosialisasi SDN Muhammadiyah 1 Kota Bontang', desc: 'Edukasi dini tentang perlindungan diri dan cara melaporkan tindakan mencurigakan sejak usia dini.' }
];
// Featured Slides untuk Auto Slider (Top 5 Foto)
const FEATURED_SLIDES = GALLERY_IMAGES.slice(0, 5);
export default function GalleryPage() {
    const [sliderIndex, setSliderIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const autoPlayRef = useRef(null);
    // Audio Player State & Refs
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [hasBeenManuallyPaused, setHasBeenManuallyPaused] = useState(false);
    // Auto Slider Interval (4 Detik)
    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, []);
    // Initialize Audio Player
    useEffect(() => {
        audioRef.current = new Audio('/audio/PHOTOGRAPH.mp3.mpeg');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.35; // Comfortable volume level
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);
    // Scroll listener for auto-play trigger
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setHasScrolled(true);
                if (audioRef.current && !isPlaying && !hasBeenManuallyPaused) {
                    audioRef.current.play()
                        .then(() => {
                        setIsPlaying(true);
                    })
                        .catch(err => {
                        console.log("Autoplay waiting for user interaction:", err);
                    });
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isPlaying, hasBeenManuallyPaused]);
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
                setHasBeenManuallyPaused(true);
            }
            else {
                audioRef.current.play()
                    .then(() => {
                    setIsPlaying(true);
                    setHasBeenManuallyPaused(false);
                })
                    .catch(err => console.log(err));
            }
        }
    };
    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayRef.current = setInterval(() => {
            setSliderIndex(prev => (prev + 1) % FEATURED_SLIDES.length);
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
        setSliderIndex(prev => (prev + 1) % FEATURED_SLIDES.length);
        startAutoPlay();
    };
    const prevSlide = () => {
        stopAutoPlay();
        setSliderIndex(prev => (prev - 1 + FEATURED_SLIDES.length) % FEATURED_SLIDES.length);
        startAutoPlay();
    };
    // Lightbox Navigation
    const nextLightbox = (e) => {
        e === null || e === void 0 ? void 0 : e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length);
        }
    };
    const prevLightbox = (e) => {
        e === null || e === void 0 ? void 0 : e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
        }
    };
    return (_jsxs("div", { className: "w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-24 select-none", children: [_jsx(Link, { to: "/", className: "fixed top-6 left-6 z-50 w-11 h-11 bg-white/80 hover:bg-white backdrop-blur-md rounded-xl flex items-center justify-center shadow-md border border-stone-200/50 text-[#6B4F4F] transition-all hover:scale-105 active:scale-95 group", title: "Kembali ke Beranda", children: _jsx(ArrowLeftIcon, { className: "w-5 h-5 group-hover:-translate-x-0.5 transition-transform" }) }), _jsxs("div", { className: "fixed inset-0 pointer-events-none z-0 overflow-hidden", children: [_jsx("div", { className: "absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-rose-200/10 rounded-full blur-[120px] animate-pulse", style: { animationDuration: '8s' } }), _jsx("div", { className: "absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-amber-200/10 rounded-full blur-[100px] animate-pulse", style: { animationDuration: '12s' } }), _jsx("div", { className: "absolute inset-0 opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" })] }), _jsxs("div", { className: "max-w-7xl mx-auto px-6 pt-32 relative z-10", children: [_jsxs("header", { className: "text-center mb-16 max-w-2xl mx-auto", children: [_jsxs("h1", { className: "text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight", children: ["Galeri ", _jsx("span", { className: "font-serif italic text-[#c43c27]", children: "Aruna" })] }), _jsx("p", { className: "text-sm md:text-base opacity-70 leading-relaxed font-light", children: "Dokumentasi seluruh perjalanan Aruna dalam mengedukasi, melindungi, dan mendampingi perempuan serta anak Indonesia untuk membangun ruang hidup yang aman." })] }), _jsxs("section", { className: "mb-20 relative group", children: [_jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-rose-200 to-amber-200 rounded-[2.5rem] blur opacity-15 group-hover:opacity-25 transition duration-500" }), _jsxs("div", { className: "relative bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-white/60 aspect-[16/9] md:aspect-[21/9] max-h-[480px]", children: [_jsx("div", { className: "w-full h-full flex transition-transform duration-700 ease-in-out", style: { transform: `translateX(-${sliderIndex * 100}%)` }, children: FEATURED_SLIDES.map((slide, idx) => (_jsx("div", { className: "w-full h-full flex-shrink-0 relative", children: _jsx("img", { src: slide.src, alt: slide.title, className: "w-full h-full object-cover select-none", loading: "eager" }) }, idx))) }), _jsx("button", { onClick: prevSlide, className: "absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/30 hover:bg-white/90 text-white hover:text-[#6B4F4F] rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-md focus:outline-none", title: "Sebelumnya", children: _jsx(ChevronLeftIcon, { className: "w-6 h-6" }) }), _jsx("button", { onClick: nextSlide, className: "absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/30 hover:bg-white/90 text-white hover:text-[#6B4F4F] rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-md focus:outline-none", title: "Berikutnya", children: _jsx(ChevronRightIcon, { className: "w-6 h-6" }) }), _jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20", children: FEATURED_SLIDES.map((_, idx) => (_jsx("button", { onClick: () => {
                                                stopAutoPlay();
                                                setSliderIndex(idx);
                                                startAutoPlay();
                                            }, className: `h-2 rounded-full transition-all duration-300 ${sliderIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/50'}`, title: `Ke Slide ${idx + 1}` }, idx))) })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold text-[#6B4F4F] mb-8 border-b border-[#6B4F4F]/10 pb-4", children: "Seluruh Galeri Dokumentasi" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: GALLERY_IMAGES.map((img, idx) => (_jsxs("div", { onClick: () => setLightboxIndex(idx), className: "group bg-white/60 backdrop-blur-md rounded-[2rem] p-3 border border-white/60 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer", children: [_jsxs("div", { className: "rounded-[1.5rem] overflow-hidden aspect-[4/3] relative", children: [_jsx("img", { src: img.src, alt: img.title, className: "w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105", loading: "lazy" }), _jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center", children: _jsx("div", { className: "w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md", children: _jsx(SparklesIcon, { className: "w-5 h-5 text-[#c43c27]" }) }) })] }), _jsxs("div", { className: "mt-4 px-2 pb-2", children: [_jsx("h3", { className: "font-bold text-gray-800 text-sm tracking-tight mb-1 group-hover:text-[#c43c27] transition-colors", children: img.title }), _jsx("p", { className: "text-[10px] text-gray-400 font-medium tracking-wide truncate", children: img.desc })] })] }, idx))) })] })] }), lightboxIndex !== null && (_jsxs("div", { onClick: () => setLightboxIndex(null), className: "fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in", children: [_jsx("button", { onClick: () => setLightboxIndex(null), className: "absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors focus:outline-none z-[110]", title: "Tutup", children: _jsx(XMarkIcon, { className: "w-8 h-8" }) }), _jsx("button", { onClick: prevLightbox, className: "absolute left-4 md:left-8 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors focus:outline-none z-[110]", title: "Sebelumnya", children: _jsx(ChevronLeftIcon, { className: "w-8 h-8" }) }), _jsxs("div", { onClick: (e) => e.stopPropagation(), className: "max-w-5xl w-full max-h-[80vh] flex flex-col items-center justify-center relative animate-zoom-in", children: [_jsx("img", { src: GALLERY_IMAGES[lightboxIndex].src, alt: GALLERY_IMAGES[lightboxIndex].title, className: "max-w-full max-h-[70vh] rounded-3xl object-contain shadow-2xl border border-white/10" }), _jsxs("div", { className: "text-center mt-6 text-white max-w-xl px-4", children: [_jsx("h3", { className: "text-xl font-bold mb-2 tracking-tight", children: GALLERY_IMAGES[lightboxIndex].title }), _jsx("p", { className: "text-xs md:text-sm text-stone-300 font-light leading-relaxed", children: GALLERY_IMAGES[lightboxIndex].desc })] })] }), _jsx("button", { onClick: nextLightbox, className: "absolute right-4 md:right-8 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors focus:outline-none z-[110]", title: "Berikutnya", children: _jsx(ChevronRightIcon, { className: "w-8 h-8" }) })] })), hasScrolled && (_jsx("button", { onClick: togglePlay, className: "fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-stone-200/50 text-[#c43c27] transition-all hover:scale-105 active:scale-95 group focus:outline-none", title: isPlaying ? "Mute Backsound" : "Play Backsound", children: isPlaying ? (_jsxs("div", { className: "flex items-end gap-[2px] h-4", children: [_jsx("span", { className: "w-[3px] bg-[#c43c27] rounded-full animate-eq-bar-1 h-3" }), _jsx("span", { className: "w-[3px] bg-[#c43c27] rounded-full animate-eq-bar-2 h-4" }), _jsx("span", { className: "w-[3px] bg-[#c43c27] rounded-full animate-eq-bar-3 h-2" }), _jsx("span", { className: "w-[3px] bg-[#c43c27] rounded-full animate-eq-bar-4 h-3.5" })] })) : (_jsx("svg", { className: "w-5 h-5 fill-current text-stone-500", viewBox: "0 0 24 24", children: _jsx("path", { d: "M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.5c-1.105 0-2 .895-2 2v5c0 1.105.895 2 2 2h2.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" }) })) })), _jsx("style", { children: `
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
            ` })] }));
}
