import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/RedFlagQuiz.tsx
import { useState } from 'react';
import { quizQuestions, getResult } from '../features/quizData';
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
export default function RedFlagQuiz() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const handleAnswer = (isYes) => {
        const newAnswers = [...answers, isYes];
        setAnswers(newAnswers);
        if (currentIndex < quizQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
        else {
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
        return (_jsxs("div", { className: "bg-white/60 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-center max-w-2xl mx-auto animate-fade-in", children: [_jsx("div", { className: "mb-6 flex justify-center", children: _jsx("div", { className: `w-20 h-20 rounded-full flex items-center justify-center bg-white shadow-md ${result.color}`, children: result.level === 'safe' ? _jsx(CheckCircleIcon, { className: "w-12 h-12" }) : _jsx(XCircleIcon, { className: "w-12 h-12" }) }) }), _jsx("h2", { className: `text-3xl font-bold mb-4 ${result.color}`, children: result.title }), _jsx("p", { className: "text-lg text-[#6B4F4F]/80 leading-relaxed mb-8", children: result.message }), _jsxs("div", { className: "flex flex-col gap-4", children: [result.level === 'danger' && (_jsx(Link, { to: "/chat", className: "bg-[#c43c27] text-white font-bold py-4 px-8 rounded-xl hover:bg-red-700 transition-all shadow-lg", children: "Ceritakan pada Aruna AI" })), _jsxs("button", { onClick: resetQuiz, className: "flex items-center justify-center gap-2 text-[#6B4F4F] font-bold hover:text-[#c43c27] transition-colors", children: [_jsx(ArrowPathIcon, { className: "w-5 h-5" }), " Coba Lagi"] })] })] }));
    }
    // Render Pertanyaan
    const question = quizQuestions[currentIndex];
    const progress = ((currentIndex) / quizQuestions.length) * 100;
    return (_jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("div", { className: "w-full bg-gray-200 rounded-full h-2.5 mb-8", children: _jsx("div", { className: "bg-[#c43c27] h-2.5 rounded-full transition-all duration-500", style: { width: `${progress}%` } }) }), _jsxs("div", { className: "bg-white/80 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-[2.5rem] shadow-xl min-h-[400px] flex flex-col justify-between relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 right-0 w-40 h-40 bg-rose-100 rounded-bl-full -mr-10 -mt-10 opacity-50" }), _jsxs("div", { className: "relative z-10", children: [_jsxs("span", { className: "text-[#c43c27] font-bold tracking-widest text-xs uppercase mb-2 block", children: ["Pertanyaan ", currentIndex + 1, " dari ", quizQuestions.length] }), _jsx("h3", { className: "text-2xl md:text-3xl font-bold text-[#6B4F4F] mb-4 leading-tight", children: question.text }), _jsxs("p", { className: "text-[#6B4F4F]/60 italic text-sm", children: ["\"", question.description, "\""] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mt-10 relative z-10", children: [_jsxs("button", { onClick: () => handleAnswer(false), className: "py-4 px-6 rounded-2xl border-2 border-green-100 bg-green-50 hover:bg-green-100 text-green-700 font-bold transition-all hover:-translate-y-1 flex flex-col items-center", children: [_jsx("span", { className: "text-2xl mb-1", children: "\uD83D\uDC4B" }), "Nggak Pernah"] }), _jsxs("button", { onClick: () => handleAnswer(true), className: "py-4 px-6 rounded-2xl border-2 border-red-100 bg-red-50 hover:bg-red-100 text-red-700 font-bold transition-all hover:-translate-y-1 flex flex-col items-center", children: [_jsx("span", { className: "text-2xl mb-1", children: "\uD83D\uDEA9" }), "Ya, Pernah"] })] })] })] }));
}
