"use client";

import React from 'react';

type CustomAlertProps = {
    isOpen: boolean;
    title: string;
    message: string;
    icon: string;
    onClose: () => void;
};

export default function CustomAlert({ isOpen, title, message, icon, onClose }: CustomAlertProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-11/12 max-w-sm text-center">
                <div className="text-6xl mb-4">{icon}</div>
                <h2 className="text-2xl font-bold text-stone-800 mb-2">{title}</h2>
                <p className="text-stone-600 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full bg-[#6B4F4F] text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all active:scale-95"
                >
                    Oke, Mengerti
                </button>
            </div>
        </div>
    );
}