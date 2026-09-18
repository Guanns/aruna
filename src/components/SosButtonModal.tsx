// src/components/SosButtonModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { XMarkIcon, BellAlertIcon, SpeakerWaveIcon, SpeakerXMarkIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';

type SosButtonModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function SosButtonModal({ isOpen, onClose }: SosButtonModalProps) {
    const [isSosActive, setIsSosActive] = useState(false);

    // Audio Context References for programmatically generating siren
    const audioCtxRef = useRef<AudioContext | null>(null);
    const osc1Ref = useRef<OscillatorNode | null>(null);
    const osc2Ref = useRef<OscillatorNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);
    const lfoRef = useRef<OscillatorNode | null>(null);

    // Stop sound when component unmounts
    useEffect(() => {
        return () => {
            stopSiren();
        };
    }, []);

    const startSiren = () => {
        if (audioCtxRef.current) return;

        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContextClass();
            audioCtxRef.current = ctx;

            // Master Gain node to prevent clipping (0.4 volume)
            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0.4, ctx.currentTime);
            masterGain.connect(ctx.destination);
            gainRef.current = masterGain;

            // Oscillator 1: Sawtooth wave for a harsh alarm tone
            const osc1 = ctx.createOscillator();
            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(440, ctx.currentTime);
            osc1.connect(masterGain);
            osc1Ref.current = osc1;

            // Oscillator 2: Square wave detuned for a chorus ambulance effect
            const osc2 = ctx.createOscillator();
            osc2.type = 'square';
            osc2.frequency.setValueAtTime(444, ctx.currentTime);
            
            const osc2Gain = ctx.createGain();
            osc2Gain.gain.setValueAtTime(0.25, ctx.currentTime);
            osc2.connect(osc2Gain);
            osc2Gain.connect(masterGain);
            osc2Ref.current = osc2;

            // LFO: Sinewave to sweep frequency up and down (wailing siren effect)
            const lfo = ctx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.setValueAtTime(1.5, ctx.currentTime); // sweep speed (1.5 Hz)
            lfoRef.current = lfo;

            // LFO depth
            const lfoGain = ctx.createGain();
            lfoGain.gain.setValueAtTime(180, ctx.currentTime); // sweeps frequency by 180 Hz

            // Connect LFO to oscillator frequencies
            lfo.connect(lfoGain);
            lfoGain.connect(osc1.frequency);
            lfoGain.connect(osc2.frequency);

            // Start all generators
            osc1.start(0);
            osc2.start(0);
            lfo.start(0);
        } catch (e) {
            console.error('[SOS Sound Error] Web Audio API failed to load:', e);
        }
    };

    const stopSiren = () => {
        try {
            if (osc1Ref.current) {
                osc1Ref.current.stop();
                osc1Ref.current.disconnect();
                osc1Ref.current = null;
            }
            if (osc2Ref.current) {
                osc2Ref.current.stop();
                osc2Ref.current.disconnect();
                osc2Ref.current = null;
            }
            if (lfoRef.current) {
                lfoRef.current.stop();
                lfoRef.current.disconnect();
                lfoRef.current = null;
            }
            if (gainRef.current) {
                gainRef.current.disconnect();
                gainRef.current = null;
            }
            if (audioCtxRef.current) {
                if (audioCtxRef.current.state !== 'closed') {
                    audioCtxRef.current.close();
                }
                audioCtxRef.current = null;
            }
        } catch (e) {
            console.error('Error stopping siren:', e);
        }
    };

    const handleToggleSos = () => {
        if (!isSosActive) {
            setIsSosActive(true);
            startSiren();
            
            Swal.fire({
                icon: 'warning',
                title: '🚨 SIRINE DARURAT AKTIF!',
                text: 'Suara alarm sirine darurat berfrekuensi tinggi telah dinyalakan untuk memicu kepanikan pelaku!',
                confirmButtonText: 'Saya Mengerti',
                confirmButtonColor: '#dc2626',
                timer: 4000,
                timerProgressBar: true
            });
        } else {
            setIsSosActive(false);
            stopSiren();
            Swal.fire({
                icon: 'info',
                title: 'Alarm Dinonaktifkan',
                text: 'Sirine darurat SOS telah dimatikan.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#4b5563',
                timer: 2000
            });
        }
    };

    const handleClose = () => {
        setIsSosActive(false);
        stopSiren();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4 md:p-6 overflow-y-auto font-poppins">
            <div className={`my-auto bg-white rounded-3xl shadow-2xl w-full max-w-md md:max-w-xl p-6 sm:p-8 border relative overflow-hidden transition-all duration-300 z-10 ${
                isSosActive ? 'border-red-500 ring-2 ring-red-500/20' : 'border-stone-200'
            }`}>
                {/* Close Button */}
                <button 
                    onClick={handleClose} 
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors z-10"
                    title="Tutup Modal"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
 
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-2">
                    {/* Left Column (Header, info, buttons) */}
                    <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
                        {/* Header info */}
                        <div className="text-center md:text-left">
                            <h2 className="text-xl sm:text-2xl font-bold text-stone-800 tracking-tight">
                                Tombol Alarm SOS
                            </h2>
                            <p className="text-xs text-stone-500 mt-1.5 max-w-sm mx-auto md:mx-0 leading-relaxed">
                                Picu suara keras di lokasi sekitar untuk memanggil bantuan warga terdekat.
                            </p>
                        </div>
 
                        {/* Instruction alert box */}
                        <div className="bg-red-50/70 border border-red-200/60 rounded-2xl p-3.5 text-left flex items-start gap-2.5">
                            <InformationCircleIcon className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                            <div className="text-xs text-red-800 leading-relaxed font-normal">
                                <span className="font-semibold block text-red-950 mb-0.5">Informasi Alarm:</span>
                                Fitur ini membunyikan sirine frekuensi tinggi melalui peramban. Pastikan volume speaker menyala.
                            </div>
                        </div>
 
                        {/* Bottom buttons */}
                        <div className="flex gap-3 pt-1">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold text-xs transition-colors"
                            >
                                Tutup
                            </button>
                            {isSosActive && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSosActive(false);
                                        stopSiren();
                                    }}
                                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-xs transition-colors shadow-sm"
                                >
                                    Matikan Alarm
                                </button>
                            )}
                        </div>
                    </div>
 
                    {/* Right Column (SOS Button) */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-stone-200/80 pt-5 md:pt-0 md:pl-6">
                        <div className="flex flex-col items-center justify-center relative min-h-[160px] w-full">
                            <button
                                type="button"
                                onClick={handleToggleSos}
                                className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg transition-all duration-200 cursor-pointer ${
                                    isSosActive 
                                        ? 'bg-red-600 ring-4 ring-red-300' 
                                        : 'bg-[#c43c27] hover:bg-[#b53521]'
                                }`}
                            >
                                {isSosActive ? (
                                    <>
                                        <SpeakerWaveIcon className="w-8 h-8 mb-1 text-white" />
                                        <span className="text-lg tracking-wider font-bold">SOS ON</span>
                                        <span className="text-[9px] uppercase font-medium tracking-widest opacity-80">Matikan</span>
                                    </>
                                ) : (
                                    <>
                                        <SpeakerXMarkIcon className="w-8 h-8 mb-1 text-white/90" />
                                        <span className="text-xl tracking-wider font-bold">SOS</span>
                                        <span className="text-[9px] uppercase font-medium tracking-widest opacity-80">Nyalakan</span>
                                    </>
                                )}
                            </button>
 
                            <p className={`text-[11px] font-semibold mt-4 transition-colors tracking-wide text-center max-w-[150px] leading-relaxed ${
                                isSosActive ? 'text-red-600' : 'text-stone-400'
                            }`}>
                                {isSosActive ? 'Alarm Darurat Menyala' : 'Ketuk untuk membunyikan sirine'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

