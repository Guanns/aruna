// components/Calculator.tsx

"use client";

import React, { useState } from 'react';
import { useCamouflage } from '../context/CamouflageContext';

export default function Calculator() {
    const { setIsCamouflaged } = useCamouflage();
    const [display, setDisplay] = useState('0');
    const [firstOperand, setFirstOperand] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

    const handleNumberClick = (num: string) => {
        if (waitingForSecondOperand) {
            setDisplay(num);
            setWaitingForSecondOperand(false);
        } else {
            if (display.length >= 9) return;
            setDisplay(display === '0' ? num : display + num);
        }
    };
    
    const handleDecimalClick = () => {
        if (waitingForSecondOperand) {
            setDisplay('0.');
            setWaitingForSecondOperand(false);
            return;
        };
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const handleOperatorClick = (nextOperator: string) => {
        const inputValue = parseFloat(display);

        if (operator && !waitingForSecondOperand) {
            const result = calculate(firstOperand!, inputValue, operator);
            const resultString = String(result).slice(0, 10);
            setDisplay(resultString);
            setFirstOperand(result);
        } else {
            setFirstOperand(inputValue);
        }
        
        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (first: number, second: number, op: string): number => {
        switch (op) {
            case '+': return first + second;
            case '-': return first - second;
            case '*': return first * second;
            case '/': return first / second;
            default: return second;
        }
    };

    const handleEqualsClick = () => {
        const secretPin = localStorage.getItem('camouflagePin');
        if (secretPin && display === secretPin) {
            setIsCamouflaged(false);
            handleClear();
            return;
        }

        if (!operator || firstOperand === null) return;
        
        const secondOperand = parseFloat(display);
        const result = calculate(firstOperand, secondOperand, operator);
        const resultString = String(result).slice(0, 10);
        
        setDisplay(resultString);
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };
    
    const handleClear = () => {
        setDisplay('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };

    const handleToggleSign = () => {
        setDisplay(String(parseFloat(display) * -1));
    };

    const handlePercentage = () => {
        setDisplay(String(parseFloat(display) / 100));
    };
    
    const buttons = [
        { label: 'AC', type: 'function' }, { label: '±', type: 'function' }, { label: '%', type: 'function' }, { label: '/', type: 'operator' },
        { label: '7', type: 'number' }, { label: '8', type: 'number' }, { label: '9', type: 'number' }, { label: '*', type: 'operator' },
        { label: '4', type: 'number' }, { label: '5', type: 'number' }, { label: '6', type: 'number' }, { label: '-', type: 'operator' },
        { label: '1', type: 'number' }, { label: '2', type: 'number' }, { label: '3', type: 'number' }, { label: '+', type: 'operator' },
        { label: '0', type: 'number' }, { label: '.', type: 'number' }, { label: '=', type: 'operator' },
    ];

    const getButtonAction = (btn: {label: string, type: string}) => {
        if (btn.type === 'number' && btn.label !== '.') return () => handleNumberClick(btn.label);
        if (btn.label === '.') return handleDecimalClick;
        if (btn.type === 'operator' && btn.label !== '=') return () => handleOperatorClick(btn.label);
        if (btn.label === '=') return handleEqualsClick;
        if (btn.label === 'AC') return handleClear;
        if (btn.label === '±') return handleToggleSign;
        if (btn.label === '%') return handlePercentage;
        return () => {};
    };

    return (
        <div className="w-full h-screen bg-black flex items-end">
            <div className="w-full max-w-md mx-auto p-4 space-y-4">
                <div className="text-white text-8xl font-thin text-right break-all pb-4">
                    {display}
                </div>
                <div className="grid grid-cols-4 gap-3">
                    {buttons.map((btn) => {
                        const isZero = btn.label === '0';
                        const isSelectedOperator = operator === btn.label && waitingForSecondOperand && btn.label !== '=';
                        return (
                            <button
                                key={btn.label}
                                onClick={getButtonAction(btn)}
                                className={`
                                    text-4xl rounded-full aspect-square transition-all duration-200
                                    active:scale-95
                                    ${btn.type === 'function' ? 'bg-gray-400 text-black hover:bg-gray-500' : ''}
                                    ${btn.type === 'number' ? 'bg-gray-800 text-white hover:bg-gray-700' : ''}
                                    ${btn.type === 'operator' && !isSelectedOperator ? 'bg-amber-500 text-white hover:bg-amber-600' : ''}
                                    ${isSelectedOperator ? 'bg-white text-amber-500' : ''}
                                    ${isZero ? 'col-span-2 text-left pl-10' : ''}
                                `}
                                style={isZero ? {aspectRatio: 'auto'} : {}}
                            >
                                {btn.label === '*' ? '×' : btn.label === '/' ? '÷' : btn.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}