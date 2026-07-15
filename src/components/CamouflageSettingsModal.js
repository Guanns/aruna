import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/CamouflageSettingsModal.tsx
// VERSI FINAL: Secure Glassy Look
import { useState, useEffect } from 'react';
import { KeyIcon, EyeIcon, EyeSlashIcon, XMarkIcon, CalculatorIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
export default function CamouflageSettingsModal({ isOpen, onClose }) {
    const [pin, setPin] = useState('');
    const [isPinVisible, setIsPinVisible] = useState(false);
    useEffect(() => {
        if (isOpen) {
            const existingPin = localStorage.getItem('camouflagePin');
            setPin(existingPin || '');
        }
    }, [isOpen]);
    if (!isOpen)
        return null;
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
    return (_jsx("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in", children: _jsxs("div", { className: "bg-[#1a1a1a] text-white rounded-[2.5rem] shadow-2xl w-full max-w-sm p-8 border border-gray-700 relative overflow-hidden", children: [_jsx("button", { onClick: onClose, className: "absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors", children: _jsx(XMarkIcon, { className: "w-6 h-6" }) }), _jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-200 shadow-inner ring-1 ring-gray-700", children: _jsx(CalculatorIcon, { className: "w-8 h-8" }) }), _jsx("h2", { className: "text-2xl font-bold", children: "PIN Kamuflase" }), _jsx("p", { className: "text-sm text-gray-400 mt-2 leading-relaxed", children: "Masukkan PIN ini di kalkulator lalu tekan (=) untuk kembali ke Aruna." })] }), _jsxs("div", { className: "space-y-2 mb-6", children: [_jsx("label", { className: "block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1", children: "PIN Rahasia (Angka)" }), _jsxs("div", { className: "relative group", children: [_jsx(KeyIcon, { className: "w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" }), _jsx("input", { type: isPinVisible ? 'text' : 'password', value: pin, onChange: (e) => setPin(e.target.value), placeholder: "Minimal 4 digit", className: "w-full py-3.5 pl-12 pr-12 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-600 transition-all font-mono text-lg tracking-widest text-center placeholder:tracking-normal placeholder:text-sm" }), _jsx("button", { onClick: () => setIsPinVisible(!isPinVisible), className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors", children: isPinVisible ? _jsx(EyeSlashIcon, { className: "w-5 h-5" }) : _jsx(EyeIcon, { className: "w-5 h-5" }) })] })] }), _jsx("button", { onClick: handleReset, className: "w-full text-xs text-red-400 hover:text-red-300 font-medium mb-6 hover:underline transition-colors", children: "Hapus / Reset PIN" }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: onClose, className: "flex-1 py-3.5 rounded-xl font-bold text-gray-400 hover:bg-gray-800 transition-colors", children: "Batal" }), _jsx("button", { onClick: handleSave, className: "flex-1 py-3.5 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg hover:scale-[1.02] active:scale-95", children: "Set PIN" })] })] }) }));
}
