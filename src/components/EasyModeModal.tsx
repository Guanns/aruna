import React, { useState } from 'react';
import { Eye, EyeOff, KeyRound, Lock, X } from 'lucide-react';

interface EasyModeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUnlock: () => void;
}

export default function EasyModeModal({
    isOpen,
    onClose,
    onUnlock,
}: EasyModeModalProps) {
    const [passwordInput, setPasswordInput] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    if (!isOpen) return null;

    const handleClose = () => {
        setPasswordInput('');
        setErrorMessage('');
        setIsPasswordVisible(false);
        onClose();
    };

    const handleUnlockSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const savedPassword = localStorage.getItem('easyModePassword');

        if (!passwordInput.trim()) {
            setErrorMessage('Masukkan password terlebih dahulu.');
            return;
        }

        if (passwordInput === savedPassword) {
            setErrorMessage('');
            setPasswordInput('');
            onUnlock();
            handleClose();
        } else {
            setErrorMessage('Password salah. Silakan coba lagi.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4 font-poppins">
            <div className="my-auto bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 sm:p-7 border border-stone-200 relative overflow-hidden transition-all duration-300">
                
                {/* Tombol Tutup Modal */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors z-10"
                    title="Tutup Modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header Modal */}
                <div className="text-center mb-6 pt-2">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-100">
                        <Lock className="w-7 h-7" />
                    </div>
                    <h2 className="text-xl font-bold text-stone-900 leading-tight">
                        Buka Kunci Mode Ramah
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        Masukkan password untuk kembali ke tampilan normal.
                    </p>
                </div>

                <form onSubmit={handleUnlockSubmit} className="space-y-4">
                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                                <KeyRound className="w-4 h-4" />
                            </div>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                value={passwordInput}
                                onChange={(e) => {
                                    setPasswordInput(e.target.value);
                                    if (errorMessage) setErrorMessage('');
                                }}
                                placeholder="Masukkan password"
                                autoFocus
                                className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
                                title={isPasswordVisible ? 'Sembunyikan' : 'Tampilkan'}
                            >
                                {isPasswordVisible ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errorMessage && (
                            <p className="text-xs text-rose-600 font-medium mt-1.5 ml-1">
                                {errorMessage}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2.5 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
                        >
                            Buka Kunci
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
