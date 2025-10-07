// app/AppContent.tsx

"use client";

import React from 'react';
import { useCamouflage } from '../context/CamouflageContext';
import Calculator from '../components/Calculator';

export default function AppContent({ children }: { children: React.ReactNode }) {
    const { isCamouflaged } = useCamouflage();

    // Jika mode kamuflase aktif, tampilkan kalkulator. Jika tidak, tampilkan aplikasi.
    return isCamouflaged ? <Calculator /> : <>{children}</>;
}