import React from 'react';

type CustomAlertProps = {
    isOpen: boolean;
    title: string;
    message: string;
    icon: string;
    onClose: () => void;
};

export default function CustomAlert({ isOpen, title, message, icon, onClose }: CustomAlertProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[110] p-6 font-poppins">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 w-full max-w-sm text-center border border-stone-200 relative">
                
                <div className="text-5xl mb-4">
                    {icon}
                </div>
                
                <h2 className="text-xl font-bold text-stone-800 mb-2">
                    {title}
                </h2>
                
                <p className="text-stone-500 mb-6 leading-relaxed text-xs">
                    {message}
                </p>
                
                <button
                    onClick={onClose}
                    className="w-full bg-[#c43c27] hover:bg-[#b03420] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-sm text-xs"
                >
                    Mengerti
                </button>
            </div>
        </div>
    );
}