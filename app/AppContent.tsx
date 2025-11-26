// app/AppContent.tsx

"use client";

import React from 'react';
import { useCamouflage } from '../context/CamouflageContext';
import Calculator from '../components/Calculator';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AppContent({ children }: { children: React.ReactNode }) {
    const { isCamouflaged } = useCamouflage();

    // Jika mode kamuflase aktif, tampilkan kalkulator SAJA.
    if (isCamouflaged) {
        return <Calculator />;
    }

    // Jika tidak aktif, tampilkan layout web normal (Navbar, Konten, Footer)
    return (
        <div style={{ backgroundColor: '#FFFBF5', color: '#6B4F4F' }} className="min-h-screen">
            <Navbar />
            {/* pt-20 DIHAPUS DARI SINI */}
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}