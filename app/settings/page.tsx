"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        const savedContact = localStorage.getItem('emergencyContact');
        if (savedContact) {
            const { name, phone } = JSON.parse(savedContact);
            setName(name);
            setPhone(phone);
        }
    }, []);

    const handleSave = () => {
        if (!phone.startsWith('62') || phone.length < 10) {
            setSaveStatus('Nomor HP harus diawali 62 dan valid.');
            setTimeout(() => setSaveStatus(''), 3000);
            return;
        }

        const contact = { name, phone };
        localStorage.setItem('emergencyContact', JSON.stringify(contact));
        setSaveStatus('Kontak darurat berhasil disimpan!');
        setTimeout(() => setSaveStatus(''), 3000);
    };

    const pageStyle = {
      backgroundColor: '#FFFBF5',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23D4CFC7' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      color: '#6B4F4F'
    };

    return (
        <div className="w-full min-h-screen p-6 sm:p-8" style={pageStyle}>
            <div className="max-w-md mx-auto">
                <header className="mb-8 flex items-center gap-4">
                    <Link href="/" className="text-gray-500 hover:text-gray-800 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Pengaturan Kontak Darurat</h1>
                        <p className="text-sm opacity-70">Kontak ini akan dihubungi saat Anda menekan Panic Button.</p>
                    </div>
                </header>

                <main className="bg-white p-6 rounded-2xl shadow-lg space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold mb-1">Nama Kontak</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Contoh: Ayah, Ibu, Sahabat"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffb53d]"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-bold mb-1">Nomor WhatsApp</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Contoh: 6281234567890"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffb53d]"
                        />
                        <p className="text-xs text-gray-500 mt-1">Gunakan format 62 (kode negara) tanpa 0 di depan.</p>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full bg-[#c43c27] text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-200 active:scale-95"
                    >
                        Simpan Kontak
                    </button>

                    {saveStatus && (
                        <p className="text-center text-sm font-semibold text-green-700 mt-4">{saveStatus}</p>
                    )}
                </main>
            </div>
        </div>
    );
}