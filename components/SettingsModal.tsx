// components/SettingsModal.tsx
// VERSI FINAL: Glassy & Elegant

"use client";

import React from 'react';
import { UserIcon, DevicePhoneMobileIcon, XMarkIcon } from '@heroicons/react/24/solid';

type SettingsModalProps = {
    isOpen: boolean;
    contactName: string;
    contactPhone: string;
    onNameChange: (name: string) => void;
    onPhoneChange: (phone: string) => void;
    onClose: () => void;
    onSave: () => void;
};

export default function SettingsModal({
    isOpen,
    contactName,
    contactPhone,
    onNameChange,
    onPhoneChange,
    onClose,
    onSave
}: SettingsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl w-full max-w-sm p-8 border border-white/60 relative overflow-hidden">
                
                {/* Dekorasi Header */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 to-orange-400"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <XMarkIcon className="w-6 h-6" />
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-500 shadow-sm border border-red-100">
                        <UserIcon className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Kontak Darurat</h2>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        Orang ini akan menerima pesan & lokasimu saat Panic Button ditekan.
                    </p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Nama Panggilan</label>
                        <div className="relative group">
                            <UserIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                            <input
                                value={contactName}
                                onChange={(e) => onNameChange(e.target.value)}
                                placeholder="Misal: Papa, Ibu, Ayang"
                                className="w-full py-3.5 pl-12 pr-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-700"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Nomor WhatsApp</label>
                        <div className="relative group">
                            <DevicePhoneMobileIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                            <input
                                type="tel"
                                value={contactPhone}
                                onChange={(e) => onPhoneChange(e.target.value)}
                                placeholder="6281234567890"
                                className="w-full py-3.5 pl-12 pr-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-700 font-mono"
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 text-center">
                            *Wajib pakai kode negara (62) tanpa tanda (+).
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button 
                        onClick={onClose} 
                        className="flex-1 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={onSave} 
                        className="flex-1 py-3.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-red-200 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}