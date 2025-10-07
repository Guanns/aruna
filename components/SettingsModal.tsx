"use client";

import React from 'react';
import { UserIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

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
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm space-y-4 border-t-4 border-[#c43c27]">
                <div className="text-center">
                    <h2 className="text-xl font-bold">Atur Kontak Darurat</h2>
                    <p className="text-sm opacity-70 mt-1">Anda perlu mengatur ini sekali saja.</p>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Nama Kontak</label>
                    <div className="relative">
                        <UserIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={contactName}
                            onChange={(e) => onNameChange(e.target.value)}
                            placeholder="Contoh: Ayah, Ibu"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffb53d]"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Nomor WhatsApp</label>
                    <div className="relative">
                        <DevicePhoneMobileIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={contactPhone}
                            onChange={(e) => onPhoneChange(e.target.value)}
                            placeholder="6281234567890"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffb53d]"
                        />
                    </div>
                </div>
                <div className="flex gap-3 pt-2">
                    <button onClick={onClose} className="w-full bg-gray-200 font-bold py-3 rounded-lg">Batal</button>
                    <button onClick={onSave} className="w-full bg-[#c43c27] text-white font-bold py-3 rounded-lg">Simpan</button>
                </div>
            </div>
        </div>
    );
}