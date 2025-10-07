// app/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import {
    ShieldCheckIcon, PhoneIcon, BellAlertIcon, BookOpenIcon,
    MapPinIcon, KeyIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon,
    CalculatorIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { triggerPanicButton } from '../features/panicButton';
import CustomAlert from '../components/CustomAlert';
import SettingsModal from '../components/SettingsModal';
import CamouflageSettingsModal from '../components/CamouflageSettingsModal';
import { useCamouflage } from '../context/CamouflageContext';

// Tipe Data
type Feature = {
    name: string;
    description: string;
    icon: React.ElementType;
    borderColor: string;
    iconBgColor: string;
    buttonColor: string;
    action?: (e?: React.MouseEvent) => void;
    href?: string;
};

type EmergencyContact = {
    name: string;
    phone: string;
};

export default function HomePage() {
    const [greeting, setGreeting] = useState('');
    const [alertState, setAlertState] = useState({ isOpen: false, title: '', message: '', icon: '' });
    const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const { setIsCamouflaged } = useCamouflage();
    const [isCamouflageModalOpen, setIsCamouflageModalOpen] = useState(false);

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 11) setGreeting('Selamat Pagi');
        else if (currentHour < 15) setGreeting('Selamat Siang');
        else if (currentHour < 19) setGreeting('Selamat Sore');
        else setGreeting('Selamat Malam');
    }, []);
    
    const openEmergencySettings = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        const savedContact = localStorage.getItem('emergencyContact');
        if (savedContact) {
            const { name, phone } = JSON.parse(savedContact);
            setContactName(name);
            setContactPhone(phone);
        } else {
            setContactName('');
            setContactPhone('');
        }
        setIsEmergencyModalOpen(true);
    };
    
    const onPanicButtonClick = () => {
        const savedContact = localStorage.getItem('emergencyContact');
        if (savedContact) {
            const contact: EmergencyContact = JSON.parse(savedContact);
            triggerPanicButton(contact, {
                onStart: () => setAlertState({ isOpen: true, title: 'Mendeteksi Lokasi...', message: `Mempersiapkan pesan darurat untuk ${contact.name}.`, icon: '📍' }),
                onError: (errorMessage) => setAlertState({ isOpen: true, title: 'Yahh gagal', message: errorMessage, icon: '😥' }),
            });
        } else {
            openEmergencySettings();
        }
    };

    const handleSaveEmergencyContact = () => {
        if (!contactPhone.startsWith('62') || contactPhone.length < 10) {
            setAlertState({isOpen: true, title: "Yah, input Salah", message: "Nomor HP harus diawali 62 dan valid.", icon: "🤔"});
            return;
        }
        const contact: EmergencyContact = { name: contactName, phone: contactPhone };
        localStorage.setItem('emergencyContact', JSON.stringify(contact));
        setIsEmergencyModalOpen(false);
        setAlertState({isOpen: true, title: "Yeay, berhasil!", message: `Kontak darurat (${contactName}) berhasil diperbarui!`, icon: "✅"});
    };

    const openCamouflageSettings = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIsCamouflageModalOpen(true);
    };

    const onCamouflageClick = () => {
        const savedPin = localStorage.getItem('camouflagePin');
        if (savedPin) {
            setIsCamouflaged(true);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'PIN Belum Diatur nih!',
                text: 'tolong atur PIN rahasia kamu terlebih dahulu untuk mengaktifkan fitur ini yaa.',
                confirmButtonText: 'Atur Sekarang yuk',
            }).then((result) => {
                if(result.isConfirmed) {
                    setIsCamouflageModalOpen(true);
                }
            });
        }
    };

    // Daftar semua fitur
    const features: Feature[] = [
        { name: 'Panic Button', description: 'Kirim sinyal darurat ke kontak terpercaya kamu disini.', icon: BellAlertIcon, borderColor: 'border-[#c43c27]', iconBgColor: 'bg-red-100', buttonColor: 'bg-red-600 hover:bg-red-700', action: onPanicButtonClick },
        { name: 'Direktori Bantuan', description: 'Daftar kontak penting (Komnas, LBH, Polisi).', icon: PhoneIcon, borderColor: 'border-[#ffb53d]', iconBgColor: 'bg-orange-100', buttonColor: 'bg-orange-500 hover:bg-orange-600', href: '/directory' },
        { name: 'Live Position', description: 'Bagikan lokasi kamu secara berkala ke kontak darurat.', icon: MapPinIcon, borderColor: 'border-blue-400', iconBgColor: 'bg-blue-100', buttonColor: 'bg-blue-600 hover:bg-blue-700', href: '/live-position' },
        { name: 'Aruna AI', description: 'Curhat ke AI Aruna yang selalu siap mendengarkan yuk.', icon: ChatBubbleLeftRightIcon, borderColor: 'border-teal-400', iconBgColor: 'bg-teal-100', buttonColor: 'bg-teal-600 hover:bg-teal-700', href: '/chat' },
        { name: 'Catatan Pribadi', description: 'Ruang untuk kamu mencatat kejadian kejadian penting.', icon: KeyIcon, borderColor: 'border-yellow-400', iconBgColor: 'bg-yellow-100', buttonColor: 'bg-yellow-600 hover:bg-yellow-700', href: '/notes' },
        { name: 'Pusat Informasi', description: 'Panduan penggunaan aplikasi & info lainnya disini.', icon: BookOpenIcon, borderColor: 'border-purple-400', iconBgColor: 'bg-purple-100', buttonColor: 'bg-purple-600 hover:bg-purple-700', href: '/information' },
        { name: 'Audit Privasi Digital', description: 'Amankan akun media sosial kamu sekarang yuk.', icon: ShieldCheckIcon, borderColor: 'border-indigo-400', iconBgColor: 'bg-indigo-100', buttonColor: 'bg-indigo-600 hover:bg-indigo-700', href: '/audit' },
        { name: 'Camouflage Mode', description: 'Ubah tampilan website menjadi mode penyamaran.', icon: CalculatorIcon, borderColor: 'border-gray-600', iconBgColor: 'bg-gray-200', buttonColor: 'bg-gray-800 hover:bg-gray-900', action: onCamouflageClick },
    ];

    const pageStyle = {
      backgroundColor: '#FFFBF5',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23D4CFC7' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      color: '#6B4F4F'
    };

    return (
        <div className="w-full min-h-screen p-6 sm:p-8" style={pageStyle}>
            <CustomAlert
                isOpen={alertState.isOpen}
                title={alertState.title}
                message={alertState.message}
                icon={alertState.icon}
                onClose={() => setAlertState({ ...alertState, isOpen: false })}
            />
            <SettingsModal
                isOpen={isEmergencyModalOpen}
                contactName={contactName}
                contactPhone={contactPhone}
                onNameChange={setContactName}
                onPhoneChange={setContactPhone}
                onClose={() => setIsEmergencyModalOpen(false)}
                onSave={handleSaveEmergencyContact}
            />
            <CamouflageSettingsModal
                isOpen={isCamouflageModalOpen}
                onClose={() => setIsCamouflageModalOpen(false)}
            />
            
            <header className="max-w-5xl mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold">Hai, {greeting}</h1>
                    <p className="mt-2 text-base sm:text-lg opacity-80">Selamat datang di Aruna! disini kamu tidak perlu menjadi kuat setiap saat. Kamu boleh merasa, kamu boleh bercerita, dan yang terpenting, kamu akan selalu didengar! 🤍</p>
                </div>
            </header>
            
            <main className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 mt-10">
                {features.map((feature) => {
                    const cardContent = (
                        <>
                            <div>
                                <div className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${feature.iconBgColor}`}>
                                    <feature.icon className="w-7 h-7 text-gray-800 opacity-80" />
                                </div>
                                <h2 className="text-base font-bold mb-1">{feature.name}</h2>
                                <p className="text-sm opacity-70 leading-relaxed">{feature.description}</p>
                            </div>
                            <div className={`mt-4 w-full text-white font-bold py-2 px-4 rounded-lg text-sm text-center transition-colors duration-300 ${feature.buttonColor}`}>
                                Buka
                            </div>
                        </>
                    );

                    const cardClassName = `relative group bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between border-t-4 h-full cursor-pointer ${feature.borderColor}`;

                    const settingsButton = (onClick: (e: React.MouseEvent) => void, title: string) => (
                         <button 
                            onClick={onClick}
                            className="absolute top-2 right-2 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors z-10"
                            title={title}
                        >
                            <Cog6ToothIcon className="w-6 h-6" />
                        </button>
                    );

                    if (feature.href) {
                        return (
                             <Link href={feature.href} key={feature.name} className={cardClassName}>
                                {cardContent}
                            </Link>
                        );
                    }
                    
                    return (
                        <div key={feature.name} className={cardClassName} onClick={feature.action}>
                            {feature.name === 'Panic Button' && settingsButton(openEmergencySettings, "Ubah Kontak Darurat")}
                            {feature.name === 'Camouflage Mode' && settingsButton(openCamouflageSettings, "Atur PIN Kamuflase")}
                            {cardContent}
                        </div>
                    );
                })}
            </main>
        </div>
    );
}