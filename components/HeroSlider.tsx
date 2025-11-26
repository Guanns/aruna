// components/HeroSlider.tsx
// VERSI 7: Elegant & Clean (Glassmorphism Refined)

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const slideData = [
    {
        title: "Ruang Aman Digitalmu",
        description: "Aruna hadir untuk melindungi, mendengar, dan memberdayakan setiap langkahmu.",
        buttonText: "Buka Tools",
        href: "/dashboard"
    },
    {
        title: "Bantuan Dalam Sekejap",
        description: "Panic Button mengirim sinyal darurat dan lokasi terkini ke orang terpercaya dalam satu klik!",
        buttonText: "Coba Panic Button",
        href: "/dashboard"
    },
    {
        title: "Teman Cerita 24/7",
        description: "Tidak ada penghakiman pada ceritamu! Curahkan isi hatimu pada Aruna AI!",
        buttonText: "Mulai Curhat",
        href: "/chat"
    },
    {
        title: "Privasi Tanpa Kompromi",
        description: "Mode Kamuflase menyembunyikan website ini menjadi kalkulator. Rahasiamu aman.",
        buttonText: "Lihat Fitur",
        href: "/information"
    }
];

export default function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slideData.length);
        }, 6000); // Sedikit diperlambat biar lebih rileks (6 detik)
        return () => clearTimeout(timer);
    }, [currentIndex]);

    return (
        <section className="relative w-full h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-[#FFFBF5]">
            
            {/* Background Decoration (Opsional: Menambah kesan elegan) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-40 -left-20 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-20 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="z-10 w-full max-w-4xl px-6 text-center">
                <div className="relative h-[400px] flex items-center justify-center">
                    {slideData.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute w-full transition-all duration-1000 ease-in-out transform
                                ${index === currentIndex 
                                    ? 'opacity-100 translate-y-0 blur-0' 
                                    : 'opacity-0 translate-y-10 blur-sm'
                                }
                            `}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-[#6B4F4F]">
                                {slide.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-[#6B4F4F]/70 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                                {slide.description}
                            </p>
                            
                            <Link 
                                href={slide.href}
                                className="group inline-flex items-center gap-3 bg-[#c43c27] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#a32e1c] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-200"
                            >
                                {slide.buttonText}
                                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Indikator Slide Modern */}
            <div className="absolute bottom-10 z-10 flex gap-3">
                {slideData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 
                            ${index === currentIndex ? 'w-8 bg-[#c43c27]' : 'w-2 bg-[#c43c27]/20 hover:bg-[#c43c27]/40'}
                        `}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}