// components/RedFlagQuiz.tsx
import React, { useState } from 'react';
import { Check, CheckCircle2, RotateCcw, X, XCircle } from 'lucide-react';
import { quizQuestions, getResult } from '../features/quizData';
import { Link } from 'react-router-dom';

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
            <div className="bg-white border border-stone-200 p-8 md:p-12 rounded-2xl shadow-xs text-center max-w-2xl mx-auto font-poppins">
                <div className="mb-6 flex justify-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-stone-50 ${result.color}`}>
                        {result.level === 'safe' ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                    </div>
                </div>
                <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${result.color}`}>{result.title}</h2>
                <p className="text-base text-stone-600 leading-relaxed mb-8 font-normal">
                    {result.message}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {result.level === 'danger' && (
                        <Link to="/chat" className="bg-rose-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-rose-700 transition-colors shadow-xs">
                            Konsultasi dengan Aruna AI
                        </Link>
                    )}
                    <button onClick={resetQuiz} className="inline-flex items-center justify-center gap-2 text-stone-700 font-semibold py-3 px-6 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors">
                        <RotateCcw className="w-4 h-4" /> Ulangi Kuis
                    </button>
                </div>
            </div>
        );
    }

    // Render Pertanyaan
    const question = quizQuestions[currentIndex];
    const progress = ((currentIndex + 1) / quizQuestions.length) * 100;

    return (
        <div className="max-w-2xl mx-auto font-poppins">
            {/* Progress Bar */}
            <div className="w-full bg-stone-200 rounded-full h-2 mb-6">
                <div className="bg-rose-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="bg-white border border-stone-200 p-6 sm:p-10 rounded-2xl shadow-xs min-h-[380px] flex flex-col justify-between">
                <div>
                    <span className="text-rose-600 font-semibold text-xs mb-2 block">
                        Pertanyaan {currentIndex + 1} dari {quizQuestions.length}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-3 leading-snug">
                        {question.text}
                    </h3>
                    <p className="text-stone-500 text-sm font-normal leading-relaxed">
                        &quot;{question.description}&quot;
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <button
                        onClick={() => handleAnswer(false)}
                        className="py-4 px-5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 font-semibold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                        <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Tidak Pernah</span>
                    </button>
                    <button
                        onClick={() => handleAnswer(true)}
                        className="py-4 px-5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                        <X className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>Ya, Pernah</span>
                    </button>
                </div>
            </div>
        </div>
    );
}