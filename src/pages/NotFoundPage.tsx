import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionMarkCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function NotFoundPage() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] flex flex-col items-center justify-center relative overflow-hidden font-sans px-6">
            {/* Background FX */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-200/10 rounded-full blur-[120px]"></div>
                 <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-teal-200/10 rounded-full blur-[120px]"></div>
                 <div className="absolute inset-0 opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
            </div>

            <div className="max-w-md w-full text-center relative z-10 bg-white/60 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/60 shadow-xl">
                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-rose-100/50">
                    <QuestionMarkCircleIcon className="w-10 h-10 animate-pulse" />
                </div>
                <h1 className="text-4xl font-extrabold mb-2 tracking-tight">404</h1>
                <h2 className="text-xl font-bold mb-4">Halaman Tidak Ditemukan</h2>
                <p className="text-sm text-stone-500 mb-8 leading-relaxed">
                    Sepertinya Anda tersesat atau halaman yang Anda cari telah dipindahkan. Mari kembali ke jalan yang aman.
                </p>
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 bg-[#6B4F4F] text-white py-3.5 px-8 rounded-full font-bold shadow-md hover:bg-[#5a4242] transition-all hover:scale-102 active:scale-95"
                >
                    <ArrowLeftIcon className="w-4 h-4"/>
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
