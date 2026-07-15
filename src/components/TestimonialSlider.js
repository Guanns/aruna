import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/TestimonialSlider.tsx
// VERSI REDESIGN: Clean Cards & Smooth Height
import { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
const testimonials = [
    {
        name: 'Sarah',
        role: 'Pengguna Panic Button',
        quote: 'Aruna benar-benar jadi penyelamat. Fitur Panic Button-nya sangat mudah diakses saat aku merasa tidak aman di perjalanan. Aku merasa lebih tenang sekarang.'
    },
    {
        name: 'Dina',
        role: 'Pengguna Aruna AI',
        quote: 'Aku suka Aruna AI. Kadang aku hanya butuh didengar tanpa dihakimi, dan Aruna AI selalu ada. Rasanya seperti punya teman yang suportif 24/7.'
    },
    {
        name: 'Rian',
        role: 'Pengguna Mode Kamuflase',
        quote: 'Mode Kamuflase itu jenius. Aku bisa menyimpan catatan pribadiku dengan aman tanpa ada yang curiga. Fitur ini sangat penting untuk privasi.'
    },
    {
        name: 'Maya',
        role: 'Ibu Rumah Tangga',
        quote: 'Sebagai seorang ibu muda, keamanan adalah prioritas utama. Aruna memberikan ketenangan pikiran yang luar biasa. Aplikasi ini benar-benar memikirkan detail kebutuhan perempuan.'
    }
];
export default function TestimonialSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const [currentHeight, setCurrentHeight] = useState('auto');
    useEffect(() => {
        if (containerRef.current) {
            const activeSlide = containerRef.current.querySelector('.testimonial-slide.opacity-100');
            if (activeSlide) {
                const timer = setTimeout(() => {
                    setCurrentHeight(`${activeSlide.offsetHeight}px`);
                }, 50);
                return () => clearTimeout(timer);
            }
        }
    }, [currentIndex]);
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === testimonials.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    return (_jsxs("div", { className: "w-full max-w-4xl mx-auto py-16 px-6", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B4F4F]", children: "Cerita Mereka" }), _jsxs("div", { className: "relative bg-white rounded-3xl shadow-xl shadow-[#6B4F4F]/5 p-8 md:p-12 border border-[#6B4F4F]/5", children: [_jsx("div", { className: "absolute top-4 left-8 text-9xl font-serif text-[#c43c27]/5 select-none pointer-events-none", children: "\u201C" }), _jsx("div", { ref: containerRef, className: "relative overflow-hidden transition-all duration-500 ease-in-out", style: { height: currentHeight }, children: testimonials.map((testimonial, index) => (_jsxs("div", { className: `testimonial-slide absolute w-full left-0 top-0 transition-all duration-700 ease-in-out flex flex-col justify-center items-center text-center 
                                ${index === currentIndex ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-10 absolute'}`, children: [_jsxs("p", { className: "text-xl md:text-2xl font-light leading-relaxed text-[#6B4F4F] italic relative z-10", children: ["\"", testimonial.quote, "\""] }), _jsxs("div", { className: "mt-8", children: [_jsx("h4", { className: "font-bold text-lg text-[#6B4F4F]", children: testimonial.name }), _jsx("p", { className: "text-sm text-[#6B4F4F]/60", children: testimonial.role })] })] }, index))) }), _jsxs("div", { className: "flex justify-center gap-4 mt-8 z-20 relative", children: [_jsx("button", { onClick: goToPrevious, className: "p-3 rounded-full bg-stone-50 text-[#6B4F4F] hover:bg-[#c43c27] hover:text-white transition-all duration-300", "aria-label": "Previous", children: _jsx(ChevronLeftIcon, { className: "w-5 h-5" }) }), _jsx("button", { onClick: goToNext, className: "p-3 rounded-full bg-stone-50 text-[#6B4F4F] hover:bg-[#c43c27] hover:text-white transition-all duration-300", "aria-label": "Next", children: _jsx(ChevronRightIcon, { className: "w-5 h-5" }) })] })] })] }));
}
