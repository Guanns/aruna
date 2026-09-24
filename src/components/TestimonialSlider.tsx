import { Quote } from 'lucide-react';
import React from 'react';

type Testimonial = {
    name: string;
    role: string;
    initials: string;
    quote: string;
};

const testimonials: Testimonial[] = [
    {
        name: 'Sarah',
        role: 'Pengguna Panic Button',
        initials: 'S',
        quote: 'Aruna benar-benar jadi penyelamat. Fitur Panic Button-nya sangat mudah diakses saat aku merasa tidak aman di perjalanan. Aku merasa jauh lebih tenang sekarang.'
    },
    {
        name: 'Dina',
        role: 'Pengguna Aruna AI',
        initials: 'D',
        quote: 'Aku suka Aruna AI. Kadang aku hanya butuh didengar tanpa dihakimi, dan Aruna selalu siap menemani dengan respon empatik kapanpun dibutuhkan.'
    },
    {
        name: 'Rian',
        role: 'Pengguna Mode Kamuflase',
        initials: 'R',
        quote: 'Mode Kamuflase itu jenius. Catatan pribadi dan kontak darurat tersimpan aman di balik tampilan kalkulator fungsional tanpa menimbulkan kecurigaan siapapun.'
    },
    {
        name: 'Gita',
        role: 'Pengguna Live Position',
        initials: 'G',
        quote: 'Fitur Live Position sangat membantu saat lembur pulang malam. Orang rumah bisa memantau perjalananku secara langsung sampai benar-benar tiba dengan aman.'
    },
    {
        name: 'Nadia',
        role: 'Pengguna Pelacak Siklus',
        initials: 'N',
        quote: 'Suka sekali dengan tampilan siklus haid yang simpel, bersih, dan privat. Membantu mempersiapkan diri setiap bulan tanpa ada iklan yang mengganggu.'
    },
    {
        name: 'Maya',
        role: 'Ibu Rumah Tangga',
        initials: 'M',
        quote: 'Sebagai seorang ibu muda, rasa aman adalah prioritas utama. Aruna memberikan ketenangan pikiran yang luar biasa dan benar-benar memikirkan kebutuhan perempuan.'
    }
];

export default function TestimonialSlider() {
    // Duplicate testimonials for a seamless continuous marquee loop
    const marqueeList = [...testimonials, ...testimonials];

    return (
        <div className="w-full py-16 relative overflow-hidden font-poppins">
            <style>{`
                @keyframes testimonialMarquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-smooth {
                    display: flex;
                    width: max-content;
                    animation: testimonialMarquee 40s linear infinite;
                }
                .animate-marquee-smooth:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
                    Apa Kata Mereka Tentang Aruna?
                </h2>
            </div>
            
            <div className="relative w-full overflow-hidden">
                {/* Left & Right Soft Fade Gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#FFFBF5] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#FFFBF5] to-transparent z-10 pointer-events-none"></div>

                {/* Infinite Marquee Track */}
                <div className="animate-marquee-smooth flex gap-5 py-3 px-4">
                    {marqueeList.map((item, index) => (
                        <div 
                            key={index} 
                            className="w-[290px] sm:w-[340px] md:w-[370px] bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs hover:border-stone-300 hover:shadow-sm transition-all shrink-0 flex flex-col justify-between"
                        >
                            <div>
                                {/* Double quote accent */}
                                <div className="mb-3 text-stone-300">
                                    <Quote className="w-5 h-5 fill-stone-300 text-stone-300" />
                                </div>
                                <p className="text-stone-700 text-sm leading-relaxed font-normal">
                                    &quot;{item.quote}&quot;
                                </p>
                            </div>

                            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-stone-100">
                                <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0 border border-stone-200/60">
                                    {item.initials}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-stone-900 leading-tight">
                                        {item.name}
                                    </h4>
                                    <p className="text-xs text-stone-500 mt-0.5">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}