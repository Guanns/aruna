"use client";

import Link from 'next/link';
import { ArrowLeftIcon, MapPinIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import CustomAlert from '../../components/CustomAlert';
import { startLivePosition, stopLivePosition } from '../../features/livePosition';

type Status = 'idle' | 'active';

export default function LivePositionPage() {
    const [status, setStatus] = useState<Status>('idle');
    const [interval, setInterval] = useState(5);
    const [countdown, setCountdown] = useState(0);
    const [alertState, setAlertState] = useState({ isOpen: false, title: '', message: '', icon: '' });

    useEffect(() => {
        let timer: number;
        if (status === 'active') {
            timer = window.setInterval(() => {
                setCountdown(prev => (prev <= 1 ? interval * 60 : prev - 1));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [status, interval]);

    const handleStart = () => {
        const savedContact = localStorage.getItem('emergencyContact');
        if (!savedContact) {
            setAlertState({ isOpen: true, title: "Kontak Belum Diatur", message: "Harap atur kontak darurat di kartu Panic Button pada halaman utama.", icon: "🤔" });
            return;
        }
        const contact = JSON.parse(savedContact);

        startLivePosition(contact, interval, 
            () => {
                setStatus('active');
                setCountdown(interval * 60);
            },
            (errorMessage) => {
                setAlertState({ isOpen: true, title: "Gagal Memulai", message: errorMessage, icon: "😥" });
            }
        );
    };

    const handleStop = () => {
        stopLivePosition();
        setStatus('idle');
        setAlertState({ isOpen: true, title: "Berhasil Dihentikan", message: "Live Position telah berhenti.", icon: "✅" });
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const pageStyle = {
      backgroundColor: '#FFFBF5',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23D4CFC7' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      color: '#6B4F4F'
    };

    return (
        <div className="w-full min-h-screen p-6 sm:p-8" style={pageStyle}>
            <CustomAlert isOpen={alertState.isOpen} title={alertState.title} message={alertState.message} icon={alertState.icon} onClose={() => setAlertState({ ...alertState, isOpen: false })} />
            <div className="max-w-md mx-auto">
                <header className="mb-8">
                    <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-800 group transition-colors w-fit">
                        <ArrowLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold">Kembali</span>
                    </Link>
                </header>

                <main>
                    <div className="text-center mb-8">
                        <div className="inline-block p-4 bg-blue-100 rounded-2xl">
                            <MapPinIcon className="w-10 h-10 text-blue-600 animate-pulse" />
                        </div>
                        <h1 className="text-3xl font-bold mt-4">Live Position</h1>
                        <p className="mt-1 opacity-70 max-w-sm mx-auto">Bagikan lokasi Anda secara berkala ke kontak darurat saat merasa tidak aman.</p>
                    </div>
                    
                    {status === 'idle' ? (
                        <>
                            <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-blue-400">
                                <h2 className="font-bold text-center text-lg mb-3">Pilih Interval Waktu</h2>
                                <div className="flex gap-3">
                                    {[5, 10, 15].map(min => (
                                        <button key={min} onClick={() => setInterval(min)} className={`w-full p-3 rounded-lg font-bold text-lg transition-colors ${interval === min ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                            {min} Menit
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button onClick={handleStart} className="w-full p-4 mt-6 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-transform active:scale-95">
                                Mulai Bagikan Posisi
                            </button>
                        </>
                    ) : (
                        <div className="text-center bg-white p-6 rounded-2xl shadow-lg border-t-4 border-blue-400">
                            <p className="font-bold text-green-600 animate-pulse">BERBAGI POSISI AKTIF</p>
                            <p className="text-sm opacity-70 mt-1">Lokasi akan dikirim setiap {interval} menit.</p>
                            <p className="text-6xl font-mono font-bold my-4">{formatTime(countdown)}</p>
                            <p className="text-sm opacity-70">Waktu mundur ke pengiriman berikutnya.</p>
                            <button onClick={handleStop} className="w-full p-3 mt-6 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700">
                                Hentikan
                            </button>
                        </div>
                    )}

                    <div className="mt-8 bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm">
                        <h3 className="font-bold flex items-center gap-2 mb-2"><ShieldCheckIcon className="w-5 h-5 text-yellow-600" /> Praktik Penggunaan Terbaik</h3>
                        <p className="opacity-80">Gunakan fitur ini saat Anda merasa was-was dalam perjalanan, seperti saat di taksi, berjalan sendirian di malam hari, atau bertemu orang baru.</p>
                    </div>
                </main>
            </div>
        </div>
    );
}