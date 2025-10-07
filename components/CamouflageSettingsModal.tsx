// components/CamouflageSettingsModal.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
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
            if (existingPin) {
                setPin(existingPin);
            } else {
                setPin('');
            }
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (pin.length < 4 || isNaN(Number(pin))) {
             Swal.fire({
                icon: 'error',
                title: 'PIN Tidak Valid',
                text: 'PIN harus terdiri dari minimal 4 angka.',
            });
            return;
        }
        localStorage.setItem('camouflagePin', pin);
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: `PIN rahasia Anda (${pin}) telah disimpan.`,
        });
        onClose();
    };

    const handleReset = () => {
        Swal.fire({
            title: 'Anda yakin ingin mereset PIN?',
            text: "Anda harus membuat PIN baru setelah ini.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, reset!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('camouflagePin');
                setPin('');
                Swal.fire(
                    'Berhasil Direset!',
                    'PIN Anda telah dihapus. Silakan buat yang baru.',
                    'success'
                );
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm space-y-4 border-t-4 border-gray-700">
                <div className="text-center">
                    <h2 className="text-xl font-bold">Atur PIN Kamuflase</h2>
                    <p className="text-sm opacity-70 mt-1">PIN ini digunakan untuk kembali dari mode kalkulator.</p>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">PIN Rahasia (Hanya Angka)</label>
                    <div className="relative">
                        <KeyIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type={isPinVisible ? 'text' : 'password'}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Minimal 4 angka"
                            className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        {/* Tombol melihat/menyembunyikan PIN */}
                        <button 
                            onClick={() => setIsPinVisible(!isPinVisible)} 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                            title={isPinVisible ? 'Sembunyikan PIN' : 'Lihat PIN'}
                        >
                            {isPinVisible ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Tombol Reset PIN */}
                <button
                    onClick={handleReset}
                    className="w-full text-sm text-red-600 font-semibold hover:underline"
                >
                    Lupa atau ingin reset PIN?
                </button>

                <div className="flex gap-3 pt-2">
                    <button onClick={onClose} className="w-full bg-gray-200 font-bold py-3 rounded-lg">Batal</button>
                    <button onClick={handleSave} className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg">Simpan</button>
                </div>
            </div>
        </div>
    );
}