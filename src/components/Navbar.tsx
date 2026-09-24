// components/Navbar.tsx
// VERSI UPDATE: Menu 'Kontak' diganti jadi 'Games'import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();
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
        { name: 'Galeri', href: '/gallery' },
        { name: 'Pengaturan', href: '/settings' },
    ];

    return (
        <>
            <nav className={`fixed w-full top-0 left-0 z-[60] transition-all duration-500 ease-in-out ${navClasses}`}>
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    <div className="flex justify-between items-center">
                        
                        {/* LOGO */}
                        <Link to="/" className="flex items-center gap-2.5 group relative z-[60]" onClick={() => setIsOpen(false)}>
                            <img 
                                src="/logo/logo.jpeg" 
                                alt="Aruna Logo" 
                                className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:opacity-90 transition-opacity"
                            />
                            <span className="text-2xl font-bold tracking-tight text-[#6B4F4F]">
                                Aruna
                            </span>
                        </Link>

                        {/* DESKTOP MENU (Lega & Memiliki Ruang Bernapas) */}
                        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
                            <div className="flex items-center gap-1 xl:gap-2">
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.name} 
                                        to={link.href} 
                                        className="text-sm font-semibold text-[#6B4F4F] hover:text-[#c43c27] px-3.5 py-2 rounded-xl hover:bg-stone-200/40 transition-colors relative group tracking-wide"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-0.5 left-3.5 right-3.5 h-0.5 bg-[#c43c27] transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
                                    </Link>
                                ))}
                            </div>

                            {/* Pemisah Halus & Tombol Buka Tools */}
                            <div className="pl-5 xl:pl-6 border-l border-stone-300/70">
                                <Link 
                                    to="/dashboard" 
                                    className="bg-[#6B4F4F] hover:bg-[#583f3f] text-white font-bold text-sm py-2.5 px-6 rounded-full shadow-xs transition-colors flex items-center gap-2"
                                >
                                    Buka Tools
                                </Link>
                            </div>
                        </div>

                        {/* MOBILE TOGGLE BUTTON */}
                        <div className="lg:hidden relative z-[60]">
                            <button 
                                onClick={() => setIsOpen(!isOpen)} 
                                className="p-2 text-[#6B4F4F] hover:bg-[#6B4F4F]/5 rounded-full transition-colors"
                            >
                                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
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

                <div className="flex flex-col items-center space-y-4 sm:space-y-6 relative z-10 w-full px-6 max-h-[85vh] overflow-y-auto">
                    {navLinks.map((link, index) => (
                        <Link 
                            key={link.name} 
                            to={link.href} 
                            className={`text-3xl md:text-4xl font-serif italic text-[#6B4F4F] hover:text-[#c43c27] py-1 px-4 rounded-2xl hover:bg-[#6B4F4F]/5 transition-all duration-500 transform
                                ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                            `}
                            style={{ transitionDelay: `${index * 80}ms` }}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Mobile Action Button */}
                    <div 
                        className={`pt-4 w-full max-w-xs transition-all duration-700 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        <Link 
                            to="/dashboard" 
                            className="flex items-center justify-center gap-3 bg-[#c43c27] text-white font-bold py-4 px-8 rounded-full shadow-md hover:bg-[#b53521] transition-colors w-full text-base sm:text-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Buka Tools
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div className={`absolute bottom-6 sm:bottom-10 text-[#6B4F4F]/40 text-xs tracking-widest uppercase transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    Aruna Safety App &copy; 2025
                </div>
            </div>
        </>
    );
}