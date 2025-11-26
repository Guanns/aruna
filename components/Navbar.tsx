// components/Navbar.tsx
// VERSI UPDATE: Menu 'Kontak' diganti jadi 'Games'

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isHomepage = pathname === '/';
    const [isScrolled, setIsScrolled] = useState(false);

    // Mencegah scroll pada body saat menu terbuka
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Logic Style Navbar
    const navClasses = isHomepage
        ? isScrolled || isOpen
            ? 'bg-white/80 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
        : 'bg-[#FFFBF5]/90 backdrop-blur-md shadow-sm border-b border-[#6B4F4F]/5 py-4';

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Tentang Kami', href: '/about' },
        { name: 'Edukasi', href: '/education' },
        { name: 'Games', href: '/relax' }, // UPDATE: Kontak -> Games (Link ke Ruang Tenang)
    ];

    return (
        <>
            <nav className={`fixed w-full top-0 left-0 z-[60] transition-all duration-500 ease-in-out ${navClasses}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center">
                        
                        {/* LOGO */}
                        <Link href="/" className="flex items-center gap-2 group relative z-[60]" onClick={() => setIsOpen(false)}>
                            <div className="w-10 h-10 bg-gradient-to-br from-[#c43c27] to-[#a02815] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                                A
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-[#6B4F4F]">
                                Aruna
                            </span>
                        </Link>

                        {/* DESKTOP MENU */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    href={link.href} 
                                    className="text-sm font-medium text-[#6B4F4F] hover:text-[#c43c27] transition-colors relative group tracking-wide"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c43c27] transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                            <Link 
                                href="/dashboard" 
                                className="bg-[#6B4F4F] text-white font-bold text-sm py-3 px-6 rounded-full hover:shadow-lg hover:shadow-[#6B4F4F]/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                            >
                                Buka Tools
                            </Link>
                        </div>

                        {/* MOBILE TOGGLE BUTTON */}
                        <div className="md:hidden relative z-[60]">
                            <button 
                                onClick={() => setIsOpen(!isOpen)} 
                                className="p-2 text-[#6B4F4F] hover:bg-[#6B4F4F]/5 rounded-full transition-colors"
                            >
                                {isOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- MOBILE MENU OVERLAY (FULL SCREEN) --- */}
            <div 
                className={`fixed inset-0 z-[55] bg-[#FFFBF5]/95 backdrop-blur-2xl flex flex-col justify-center items-center transition-all duration-500 ease-in-out
                    ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
                `}
            >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#c43c27]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

                <div className="flex flex-col items-center space-y-8 relative z-10 w-full px-6">
                    {navLinks.map((link, index) => (
                        <Link 
                            key={link.name} 
                            href={link.href} 
                            className={`text-3xl md:text-4xl font-serif italic text-[#6B4F4F] hover:text-[#c43c27] transition-all duration-500 transform
                                ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                            `}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Mobile Action Button */}
                    <div 
                        className={`mt-8 w-full max-w-xs transition-all duration-700 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        <Link 
                            href="/dashboard" 
                            className="flex items-center justify-center gap-3 bg-[#c43c27] text-white font-bold py-5 px-8 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all w-full text-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Buka Tools
                            <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div className={`absolute bottom-10 text-[#6B4F4F]/40 text-xs tracking-widest uppercase transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    Aruna Safety App &copy; 2025
                </div>
            </div>
        </>
    );
}