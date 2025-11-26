// components/RedFlagQuiz.tsx

"use client";

import React, { useState } from 'react';
import { quizQuestions, getResult } from '../features/quizData';
import { ArrowRightIcon, ArrowPathIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function RedFlagQuiz() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (isYes: boolean) => {
        const newAnswers = [...answers, isYes];
        setAnswers(newAnswers);

        if (currentIndex < quizQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setCurrentIndex(0);
        setAnswers([]);
        setShowResult(false);
    };

    // Render Hasil
    if (showResult) {
        const yesCount = answers.filter(a => a).length;
        const result = getResult(yesCount);

        return (
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-center max-w-2xl mx-auto animate-fade-in">
                <div className="mb-6 flex justify-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-white shadow-md ${result.color}`}>
                        {result.level === 'safe' ? <CheckCircleIcon className="w-12 h-12"/> : <XCircleIcon className="w-12 h-12"/>}
                    </div>
                </div>
                <h2 className={`text-3xl font-bold mb-4 ${result.color}`}>{result.title}</h2>
                <p className="text-lg text-[#6B4F4F]/80 leading-relaxed mb-8">
                    {result.message}
                </p>
                
                <div className="flex flex-col gap-4">
                    {result.level === 'danger' && (
                        <Link href="/chat" className="bg-[#c43c27] text-white font-bold py-4 px-8 rounded-xl hover:bg-red-700 transition-all shadow-lg">
                            Ceritakan pada Aruna AI
                        </Link>
                    )}
                    <button onClick={resetQuiz} className="flex items-center justify-center gap-2 text-[#6B4F4F] font-bold hover:text-[#c43c27] transition-colors">
                        <ArrowPathIcon className="w-5 h-5"/> Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    // Render Pertanyaan
    const question = quizQuestions[currentIndex];
    const progress = ((currentIndex) / quizQuestions.length) * 100;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                <div className="bg-[#c43c27] h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-[2.5rem] shadow-xl min-h-[400px] flex flex-col justify-between relative overflow-hidden">
                 {/* Dekorasi latar */}
                 <div className="absolute top-0 right-0 w-40 h-40 bg-rose-100 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
                
                <div className="relative z-10">
                    <span className="text-[#c43c27] font-bold tracking-widest text-xs uppercase mb-2 block">Pertanyaan {currentIndex + 1} dari {quizQuestions.length}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#6B4F4F] mb-4 leading-tight">
                        {question.text}
                    </h3>
                    <p className="text-[#6B4F4F]/60 italic text-sm">
                        "{question.description}"
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-10 relative z-10">
                    <button 
                        onClick={() => handleAnswer(false)}
                        className="py-4 px-6 rounded-2xl border-2 border-green-100 bg-green-50 hover:bg-green-100 text-green-700 font-bold transition-all hover:-translate-y-1 flex flex-col items-center"
                    >
                        <span className="text-2xl mb-1">👋</span>
                        Nggak Pernah
                    </button>
                    <button 
                        onClick={() => handleAnswer(true)}
                        className="py-4 px-6 rounded-2xl border-2 border-red-100 bg-red-50 hover:bg-red-100 text-red-700 font-bold transition-all hover:-translate-y-1 flex flex-col items-center"
                    >
                        <span className="text-2xl mb-1">🚩</span>
                        Ya, Pernah
                    </button>
                </div>
            </div>
        </div>
    );
}