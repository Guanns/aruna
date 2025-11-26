// components/Footer.tsx
// VERSI FINAL: Modern, Clean, Bontang-Based & Instagram Only

import React from 'react';
import Link from 'next/link';
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

// Component Ikon Instagram
const InstagramIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

export default function Footer() {
    // Data Navigasi (Update: Kontak -> Games)
    const navigation = {
        main: [
            { name: 'Beranda', href: '/' },
            { name: 'Tentang Kami', href: '/about' },
            { name: 'Edukasi', href: '/education' },
            { name: 'Games', href: '/relax' }, // Updated
        ],
        features: [
            { name: 'Panic Button', href: '/dashboard' },
            { name: 'Aruna AI', href: '/chat' },
            { name: 'Jurnal', href: '/notes' },
            { name: 'Kamuflase', href: '/information' },
        ]
    };

    return (
        <footer className="bg-[#FFFBF5] pt-20 pb-10 border-t border-[#6B4F4F]/5 relative overflow-hidden font-sans">
            
            {/* Dekorasi Background Halus */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c43c27]/20 to-transparent"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-100/30 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
                    
                    {/* KOLOM 1: BRAND & VISI (Lebar: 5) */}
                    <div className="md:col-span-5 space-y-6">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#c43c27] to-[#a02815] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                                A
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-[#6B4F4F]">
                                Aruna
                            </span>
                        </Link>
                        <p className="text-[#6B4F4F]/70 leading-relaxed font-light pr-4 text-sm md:text-base">
                            Ruang aman digital untuk perempuan Indonesia. Kami hadir untuk mendengar, melindungi, dan memberdayakanmu lewat satu aplikasi.
                        </p>
                        
                        {/* INSTAGRAM ONLY BUTTON */}
                        <div className="pt-2">
                            <a 
                                href="https://instagram.com/shinewitharuna" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#6B4F4F]/10 text-[#6B4F4F] hover:text-[#c43c27] hover:border-[#c43c27]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="p-1.5 bg-rose-50 rounded-full text-[#c43c27] group-hover:scale-110 transition-transform">
                                    <InstagramIcon className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[10px] font-bold text-[#6B4F4F]/50 uppercase tracking-wider">Follow Kami</span>
                                    <span className="text-sm font-bold">@shinewitharuna</span>
                                </div>
                                <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2 opacity-30 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>

                    {/* KOLOM 2: NAVIGASI (Lebar: 3) */}
                    <div className="md:col-span-3 md:col-start-7">
                        <h4 className="font-bold text-base text-[#6B4F4F] mb-6 flex items-center gap-2">
                            <SparklesIcon className="w-4 h-4 text-[#c43c27]" />
                            Eksplorasi
                        </h4>
                        <ul className="space-y-3">
                            {navigation.main.map((item) => (
                                <li key={item.name}>
                                    <Link 
                                        href={item.href} 
                                        className="text-[#6B4F4F]/70 hover:text-[#c43c27] transition-colors duration-300 text-sm font-medium inline-block hover:translate-x-1"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* KOLOM 3: LOKASI (Lebar: 4) */}
                    <div className="md:col-span-3">
                        <h4 className="font-bold text-base text-[#6B4F4F] mb-6 flex items-center gap-2">
                            <MapPinIcon className="w-4 h-4 text-[#c43c27]" />
                            Basis Kami
                        </h4>
                        
                        <div className="bg-white/60 p-5 rounded-3xl border border-[#6B4F4F]/10 flex items-start gap-4 hover:bg-white hover:shadow-md transition-all duration-300 cursor-default">
                            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0 text-[#c43c27]">
                                <MapPinIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-[#6B4F4F] text-sm">Bontang</p>
                                <p className="text-[#6B4F4F]/60 text-xs mt-1 leading-relaxed">
                                    Kalimantan Timur,<br/>Indonesia
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COPYRIGHT SECTION */}
                <div className="border-t border-[#6B4F4F]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[#6B4F4F]/50 font-medium text-center md:text-left">
                        &copy; {new Date().getFullYear()} Aruna. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-1.5 text-sm text-[#6B4F4F]/60 font-medium bg-white/50 px-4 py-2 rounded-full border border-[#6B4F4F]/5">
                        <span>Dibuat dengan</span>
                        <HeartIcon className="w-4 h-4 text-[#c43c27] animate-pulse" />
                        <span>Untuk Perempuan Indonesia</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}