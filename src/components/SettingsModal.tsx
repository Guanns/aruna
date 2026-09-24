import React from 'react';
import { Smartphone, User, X } from 'lucide-react';

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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 font-poppins">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 sm:p-8 border border-stone-200 relative overflow-hidden">
                
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
                    title="Tutup"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#c43c27]">
                        <User className="w-7 h-7" />
                    </div>
                    <h2 className="text-xl font-bold text-stone-800">Kontak Darurat</h2>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        Orang ini akan menerima pesan & lokasi GPS saat Panic Button ditekan.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5 ml-1">Nama Panggilan</label>
                        <div className="relative group">
                            <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#c43c27] transition-colors" />
                            <input
                                value={contactName}
                                onChange={(e) => onNameChange(e.target.value)}
                                placeholder="Misal: Papa, Ibu, Sahabat"
                                className="w-full py-3 pl-11 pr-4 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#c43c27] focus:ring-2 focus:ring-[#c43c27]/10 transition-all font-medium text-stone-800 text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5 ml-1">Nomor WhatsApp</label>
                        <div className="relative group">
                            <Smartphone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#c43c27] transition-colors" />
                            <input
                                type="tel"
                                value={contactPhone}
                                onChange={(e) => onPhoneChange(e.target.value)}
                                placeholder="6281234567890"
                                className="w-full py-3 pl-11 pr-4 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#c43c27] focus:ring-2 focus:ring-[#c43c27]/10 transition-all font-medium text-stone-800 text-sm font-mono"
                            />
                        </div>
                        <p className="text-[11px] text-stone-400 mt-1.5 ml-1">
                            *Wajib gunakan format 62 (contoh: 628123456789).
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button 
                        onClick={onClose} 
                        className="flex-1 py-3 rounded-xl font-semibold text-xs text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={onSave} 
                        className="flex-1 py-3 bg-[#c43c27] hover:bg-[#b03420] text-white rounded-xl font-semibold text-xs shadow-sm transition-all"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}