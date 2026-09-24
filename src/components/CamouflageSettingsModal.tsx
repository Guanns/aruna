import React, { useState, useEffect } from 'react';
import { Calculator, Eye, EyeOff, KeyRound, X } from 'lucide-react';
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 font-poppins">
            <div className="bg-stone-900 text-white rounded-3xl shadow-xl w-full max-w-sm p-6 sm:p-8 border border-stone-800 relative overflow-hidden">
                
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
                    title="Tutup"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-stone-800 rounded-2xl flex items-center justify-center mx-auto mb-3 text-stone-200 border border-stone-700">
                        <Calculator className="w-7 h-7" />
                    </div>
                    <h2 className="text-xl font-bold">PIN Kamuflase</h2>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                        Masukkan PIN ini di kalkulator lalu tekan (=) untuk kembali ke Aruna.
                    </p>
                </div>

                <div className="space-y-2 mb-5">
                    <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider ml-1">PIN Rahasia (Angka)</label>
                    <div className="relative group">
                        <KeyRound className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-white transition-colors" />
                        <input
                            type={isPinVisible ? 'text' : 'password'}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Minimal 4 digit"
                            className="w-full py-3 pl-11 pr-11 bg-stone-800 border border-stone-700 rounded-xl focus:outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-600 transition-all font-mono text-base tracking-widest text-center placeholder:tracking-normal placeholder:text-xs"
                        />
                        <button 
                            type="button"
                            onClick={() => setIsPinVisible(!isPinVisible)} 
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition-colors"
                        >
                            {isPinVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleReset}
                    className="w-full text-xs text-red-400 hover:text-red-300 font-medium mb-6 hover:underline transition-colors block text-center"
                >
                    Hapus / Reset PIN
                </button>

                <div className="flex gap-3">
                    <button 
                        type="button"
                        onClick={onClose} 
                        className="flex-1 py-3 rounded-xl font-semibold text-xs text-stone-400 hover:bg-stone-800 transition-colors"
                    >
                        Batal
                    </button>
                    <button 
                        type="button"
                        onClick={handleSave} 
                        className="flex-1 py-3 bg-white text-stone-900 rounded-xl font-semibold text-xs hover:bg-stone-100 transition-colors shadow-sm"
                    >
                        Simpan PIN
                    </button>
                </div>
            </div>
        </div>
    );
}