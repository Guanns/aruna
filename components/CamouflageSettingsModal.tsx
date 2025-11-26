// components/CamouflageSettingsModal.tsx
// VERSI FINAL: Secure Glassy Look

"use client";

import React, { useState, useEffect } from 'react';
import { KeyIcon, EyeIcon, EyeSlashIcon, XMarkIcon, CalculatorIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CamouflageSettingsModal({ isOpen, onClose }: ModalProps) {
    const [pin, setPin] = useState('');
    const [isPinVisible, setIsPinVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const existingPin = localStorage.getItem('camouflagePin');
            setPin(existingPin || '');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (pin.length < 4 || isNaN(Number(pin))) {
             Swal.fire({ icon: 'error', title: 'PIN Tidak Valid', text: 'Minimal 4 angka ya!', confirmButtonColor: '#374151' });
            return;
        }
        localStorage.setItem('camouflagePin', pin);
        Swal.fire({ icon: 'success', title: 'Aman Terkendali', text: 'PIN rahasia berhasil disimpan.', confirmButtonColor: '#374151' });
        onClose();
    };

    const handleReset = () => {
        Swal.fire({
            title: 'Hapus PIN?',
            text: "Mode kamuflase akan dinonaktifkan.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Ya, Hapus'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('camouflagePin');
                setPin('');
                Swal.fire('Terhapus', 'PIN sudah dihapus.', 'success');
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in">
            <div className="bg-[#1a1a1a] text-white rounded-[2.5rem] shadow-2xl w-full max-w-sm p-8 border border-gray-700 relative overflow-hidden">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors">
                    <XMarkIcon className="w-6 h-6" />
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-200 shadow-inner ring-1 ring-gray-700">
                        <CalculatorIcon className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold">PIN Kamuflase</h2>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                        Masukkan PIN ini di kalkulator lalu tekan (=) untuk kembali ke Aruna.
                    </p>
                </div>

                <div className="space-y-2 mb-6">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">PIN Rahasia (Angka)</label>
                    <div className="relative group">
                        <KeyIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
                        <input
                            type={isPinVisible ? 'text' : 'password'}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Minimal 4 digit"
                            className="w-full py-3.5 pl-12 pr-12 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-600 transition-all font-mono text-lg tracking-widest text-center placeholder:tracking-normal placeholder:text-sm"
                        />
                        <button 
                            onClick={() => setIsPinVisible(!isPinVisible)} 
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                            {isPinVisible ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleReset}
                    className="w-full text-xs text-red-400 hover:text-red-300 font-medium mb-6 hover:underline transition-colors"
                >
                    Hapus / Reset PIN
                </button>

                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3.5 rounded-xl font-bold text-gray-400 hover:bg-gray-800 transition-colors">
                        Batal
                    </button>
                    <button onClick={handleSave} className="flex-1 py-3.5 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg hover:scale-[1.02] active:scale-95">
                        Set PIN
                    </button>
                </div>
            </div>
        </div>
    );
}