// components/CustomAlert.tsx
// VERSI FINAL: Modern Alert

"use client";

import React from 'react';

type CustomAlertProps = {
    isOpen: boolean;
    title: string;
    message: string;
    icon: string;
    onClose: () => void;
};

export default function CustomAlert({ isOpen, title, message, icon, onClose }: CustomAlertProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[110] p-6 animate-fade-in">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 w-full max-w-sm text-center border border-white relative transform transition-all scale-100 animate-bounce-in">
                
                <div className="text-6xl mb-6 drop-shadow-sm animate-pulse">
                    {icon}
                </div>
                
                <h2 className="text-2xl font-bold text-[#6B4F4F] mb-3">
                    {title}
                </h2>
                
                <p className="text-[#6B4F4F]/70 mb-8 leading-relaxed text-sm">
                    {message}
                </p>
                
                <button
                    onClick={onClose}
                    className="w-full bg-[#6B4F4F] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-[#5a4242] hover:shadow-lg transition-all active:scale-95 shadow-md"
                >
                    Mengerti
                </button>
            </div>
        </div>
    );
}