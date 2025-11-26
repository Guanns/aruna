// components/FaqAccordion.tsx
// VERSI REDESIGN: Seamless List & Soft Colors

"use client";

import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const faqs = [
    {
        question: 'Apakah data saya benar-benar aman?',
        answer: 'Keamanan adalah prioritas #1 kami. Aruna tidak menyimpan percakapan atau catatan Anda di server. Semua data Catatan Pribadi disimpan secara lokal di perangkat (browser) Anda. Mode Kamuflase juga memastikan tidak ada yang tahu Anda menggunakan aplikasi ini.'
    },
    {
        question: 'Bagaimana cara kerja Panic Button?',
        answer: 'Sangat sederhana. Setelah Anda mengatur kontak darurat, cukup tekan tombol merah besar di aplikasi. Kami akan otomatis membuka WhatsApp dengan pesan darurat berisi lokasi GPS terkini Anda, siap dikirim.'
    },
    {
        question: 'Apakah Aruna AI adalah manusia?',
        answer: 'Bukan. Aruna AI adalah kecerdasan buatan yang dilatih khusus untuk memberikan dukungan emosional, validasi, dan menjadi pendengar yang baik. Namun, ia bukan pengganti psikolog profesional.'
    },
    {
        question: 'Apakah aplikasi ini gratis selamanya?',
        answer: 'Ya, 100%. Misi kami adalah kemanusiaan. Kami percaya keamanan dan dukungan emosional adalah hak dasar setiap perempuan dan anak, bukan barang mewah.'
    }
];

export default function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-3xl mx-auto py-16 px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#6B4F4F]">
                Sering Ditanyakan
            </h2>
            <p className="text-center text-[#6B4F4F]/60 mb-12">
                Kami rangkum jawaban untuk pertanyaan populermu.
            </p>

            <div className="space-y-4">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div 
                            key={index} 
                            className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-transparent
                                ${isOpen ? 'shadow-lg shadow-[#6B4F4F]/5 border-[#6B4F4F]/5' : 'shadow-sm hover:shadow-md'}
                            `}
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center text-left p-6 md:p-8"
                            >
                                <span className={`font-bold text-lg md:text-xl transition-colors ${isOpen ? 'text-[#c43c27]' : 'text-[#6B4F4F]'}`}>
                                    {faq.question}
                                </span>
                                <span className={`ml-4 p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#c43c27] text-white rotate-180' : 'bg-stone-100 text-[#6B4F4F]'}`}>
                                    {isOpen ? <MinusIcon className="w-5 h-5"/> : <PlusIcon className="w-5 h-5"/>}
                                </span>
                            </button>
                            
                            <div
                                className={`grid transition-all duration-500 ease-in-out ${
                                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <div className="p-6 md:p-8 pt-0 text-[#6B4F4F]/70 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}