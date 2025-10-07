// app/information/page.tsx

"use client";

import Link from 'next/link';
import { ArrowLeftIcon, ChevronDownIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

const tutorials = [
    {
        icon: '🚨',
        title: 'Tombol Panik (Panic Button)',
        color: 'bg-red-100 text-red-800',
        content: `
            <p class="font-bold text-lg mb-2">Apa itu Tombol Panik?</p>
            <p class="mb-4">Ini adalah fitur darurat utama Anda. Saat ditekan, Aruna akan secara otomatis mengirim pesan berisi permintaan tolong dan lokasi Anda saat ini ke kontak darurat yang sudah Anda atur.</p>
            <p class="font-bold text-lg mb-2">Cara Menggunakan:</p>
            <ol class="list-decimal list-inside space-y-2">
                <li><b>Atur Kontak Darurat:</b> Ini langkah paling penting! Di halaman utama, klik ikon gerigi (⚙️) pada kartu "Panic Button" untuk menyimpan nama dan nomor WhatsApp kontak terpercaya Anda.</li>
                <li><b>Tekan Tombol:</b> Saat dalam keadaan darurat, cukup buka aplikasi dan tekan kartu "Panic Button".</li>
                <li><b>Kirim Pesan:</b> Aplikasi akan otomatis membuka WhatsApp dengan pesan darurat yang sudah siap kirim ke kontak Anda. Cukup tekan "Send".</li>
            </ol>
        `
    },
    {
        icon: '📍',
        title: 'Live Position',
        color: 'bg-blue-100 text-blue-800',
        content: `
            <p class="font-bold text-lg mb-2">Apa itu Live Position?</p>
            <p class="mb-4">Fitur ini berguna saat Anda merasa was-was dalam perjalanan. Aruna akan mengirimkan update lokasi Anda secara berkala (misalnya setiap 5 atau 10 menit) ke kontak darurat.</p>
            <p class="font-bold text-lg mb-2">Cara Menggunakan:</p>
            <ol class="list-decimal list-inside space-y-2">
                <li>Buka fitur "Live Position" dari halaman utama.</li>
                <li>Pilih interval waktu pengiriman (misalnya setiap 5, 10, atau 15 menit).</li>
                <li>Tekan tombol "Mulai Bagikan Posisi". Pesan pertama akan langsung dikirim.</li>
                <li>Aplikasi akan menampilkan hitung mundur ke pengiriman lokasi berikutnya. Anda bisa menghentikannya kapan saja.</li>
            </ol>
        `
    },
    {
        icon: '🤗',
        title: 'Aruna AI',
        color: 'bg-teal-100 text-teal-800',
        content: `
            <p class="font-bold text-lg mb-2">Siapa Aruna AI?</p>
            <p class="mb-4">Aruna AI adalah teman curhat virtual Anda. Ia dirancang untuk menjadi pendengar yang baik, penuh empati, dan memberikan dukungan emosional. Ini adalah ruang aman untuk Anda bercerita tanpa dihakimi.</p>
            <p class="font-bold text-lg mb-2">Cara Berinteraksi:</p>
            <ol class="list-decimal list-inside space-y-2">
                <li>Buka fitur "Aruna AI" dari halaman utama.</li>
                <li>Ketik apa pun yang Anda rasakan di kolom chat, lalu tekan kirim.</li>
                <li>Aruna akan merespons dengan hangat. Percakapan Anda akan diingat selama sesi tersebut, jadi Anda bisa bercerita secara natural.</li>
                <li class="mt-2 text-sm"><b>Penting:</b> Aruna AI bukan psikolog atau ahli hukum. Ia hadir untuk memberikan dukungan emosional, bukan nasihat profesional.</li>
            </ol>
        `
    },
    {
        icon: '📝',
        title: 'Catatan Pribadi',
        color: 'bg-yellow-100 text-yellow-800',
        content: `
            <p class="font-bold text-lg mb-2">Apa itu Catatan Pribadi?</p>
            <p class="mb-4">Ini adalah jurnal digital pribadi Anda yang aman. Semua catatan disimpan di perangkat Anda sendiri (browser) dan tidak dikirim ke mana pun. Gunakan fitur ini untuk mencatat perasaan, kejadian, atau sebagai bukti.</p>
            <p class="font-bold text-lg mb-2">Cara Menggunakan:</p>
            <ol class="list-decimal list-inside space-y-2">
                <li>Buka fitur "Catatan Pribadi".</li>
                <li>Gunakan editor teks untuk menulis catatan Anda. Anda bisa membuat teks tebal, miring, dan format lainnya.</li>
                <li>Tekan "Simpan Catatan". Catatan Anda akan muncul di bawahnya.</li>
                <li>Anda bisa membuka, mengunduh sebagai file .txt, atau menghapus setiap catatan.</li>
            </ol>
        `
    },
     {
        icon: '📞',
        title: 'Direktori Bantuan',
        color: 'bg-orange-100 text-orange-800',
        content: `
            <p class="font-bold text-lg mb-2">Apa itu Direktori Bantuan?</p>
            <p class="mb-4">Fitur ini berisi daftar kontak-kontak penting yang sudah terverifikasi, seperti layanan darurat nasional dan lembaga bantuan hukum khusus perempuan dan anak.</p>
            <p class="font-bold text-lg mb-2">Cara Menggunakan:</p>
            <ol class="list-decimal list-inside space-y-2">
                <li>Buka fitur "Direktori Bantuan" dari halaman utama.</li>
                <li>Lihat daftar kontak yang tersedia, yang sudah dikelompokkan berdasarkan kategori.</li>
                <li>Tekan tombol "Panggil" di sebelah kontak yang Anda butuhkan untuk langsung melakukan panggilan telepon.</li>
            </ol>
        `
    },
    {
        icon: '🧮',
        title: 'Mode Kamuflase',
        color: 'bg-gray-200 text-gray-800',
        content: `
            <p class="font-bold text-lg mb-2">Apa itu Mode Kamuflase?</p>
            <p class="mb-4">Ini adalah fitur privasi canggih yang mengubah seluruh tampilan aplikasi menjadi kalkulator yang berfungsi normal. Orang lain yang membuka aplikasi tidak akan tahu bahwa ini adalah Aruna.</p>
            <p class="font-bold text-lg mb-2">Cara Menggunakan:</p>
            <ol class="list-decimal list-inside space-y-2">
                <li><b>Atur PIN Rahasia:</b> Langkah pertama dan terpenting. Di halaman utama, klik ikon gerigi (⚙️) pada kartu "Camouflage Mode" untuk mengatur PIN rahasia Anda (minimal 4 angka).</li>
                <li><b>Aktifkan Mode:</b> Tekan kartu "Camouflage Mode" di halaman utama. Tampilan akan langsung berubah menjadi kalkulator.</li>
                <li><b>Kembali ke Aruna:</b> Untuk keluar dari mode kalkulator, cukup ketikkan PIN rahasia yang sudah Anda atur, lalu tekan tombol sama dengan (=). Tampilan Aruna akan kembali seperti semula.</li>
            </ol>
        `
    }
];

export default function PusatInformasiPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    const pageStyle = {
      backgroundColor: '#FFFBF5',
      color: '#6B4F4F'
    };

    return (
        <div className="w-full min-h-screen p-6 sm:p-8" style={pageStyle}>
            <div className="max-w-2xl mx-auto">
                <header className="mb-8">
                    <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-800 group transition-colors w-fit">
                        <ArrowLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold">Kembali</span>
                    </Link>
                </header>

                <main>
                    <div className="text-center mb-10">
                        <div className="inline-block p-4 bg-purple-100 rounded-2xl">
                             <BookOpenIcon className="w-10 h-10 text-purple-600"/>
                        </div>
                        <h1 className="text-3xl font-bold mt-4">Pusat Informasi</h1>
                        <p className="mt-1 opacity-70">Punya pertanyaan? Cari tahu cara kerja setiap fitur di sini!</p>
                    </div>

                    <div className="space-y-4">
                        {tutorials.map((item, index) => (
                            <div key={index} className={`rounded-xl border overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-lg' : 'shadow-sm'}`}>
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className={`w-full flex justify-between items-center text-left p-5 font-bold ${item.color}`}
                                >
                                    <span className="flex items-center gap-4 text-lg">
                                        <span className="text-2xl">{item.icon}</span>
                                        {item.title}
                                    </span>
                                    <ChevronDownIcon className={`w-6 h-6 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`transition-all duration-500 ease-in-out grid ${openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <div 
                                            className="p-5 bg-white prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: item.content }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}