import React, { useState, useEffect } from 'react';
import { ArrowRight, BellRing, BookOpen, Calculator, Eye, Heart, KeyRound, Languages, Lock, MapPin, Megaphone, MessagesSquare, Phone, Settings, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { triggerPanicButton } from '../features/panicButton';
import { getPeriodData, calculateCycle } from '../features/period';
import CustomAlert from '../components/CustomAlert';
import SettingsModal from '../components/SettingsModal';
import CamouflageSettingsModal from '../components/CamouflageSettingsModal';
import SosButtonModal from '../components/SosButtonModal';
import EasyModeModal from '../components/EasyModeModal';
import { useCamouflage } from '../context/CamouflageContext';

type EmergencyContact = { name: string; phone: string; };

export default function DashboardPage() {
    const navigate = useNavigate();
    const [greeting, setGreeting] = useState('');
    const [dateString, setDateString] = useState('');
    const [alertState, setAlertState] = useState({ isOpen: false, title: '', message: '', icon: '' });
    const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [hasEmergencyContact, setHasEmergencyContact] = useState(false);
    const [savedContactInfo, setSavedContactInfo] = useState<EmergencyContact | null>(null);
    const [isSosModalOpen, setIsSosModalOpen] = useState(false);
    
    // Easy Mode (Ramah Disabilitas) State dari localStorage
    const [isEasyMode, setIsEasyMode] = useState<boolean>(() => {
        return localStorage.getItem('isEasyMode') === 'true';
    });
    const [isEasyModeModalOpen, setIsEasyModeModalOpen] = useState(false);
    
    // Haid State
    const [periodInfo, setPeriodInfo] = useState<{days: number, phase: string} | null>(null);

    const { setIsCamouflaged } = useCamouflage();
    const [isCamouflageModalOpen, setIsCamouflageModalOpen] = useState(false);

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 11) setGreeting('Selamat Pagi');
        else if (currentHour < 15) setGreeting('Selamat Siang');
        else if (currentHour < 19) setGreeting('Selamat Sore');
        else setGreeting('Selamat Malam');

        const date = new Date();
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
        setDateString(date.toLocaleDateString('id-ID', options));

        const pData = getPeriodData();
        if (pData) {
            const info = calculateCycle(pData);
            setPeriodInfo({ days: info.daysLeft, phase: info.phase });
        }

        const savedContact = localStorage.getItem('emergencyContact');
        setHasEmergencyContact(!!savedContact);
        if (savedContact) {
            setSavedContactInfo(JSON.parse(savedContact));
        }

        const handleStorageChange = () => {
            setIsEasyMode(localStorage.getItem('isEasyMode') === 'true');
        };
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('focus', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('focus', handleStorageChange);
        };
    }, []);

    const handleEasyModeCardClick = () => {
        if (isEasyMode) {
            // Mode sedang aktif: buka modal untuk memasukkan password dan membuka kunci
            setIsEasyModeModalOpen(true);
        } else {
            // Ingin mengaktifkan mode ramah: cek apakah password sudah disetel di Pengaturan
            const savedPassword = localStorage.getItem('easyModePassword');
            if (!savedPassword) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Password Belum Diatur',
                    text: 'Atur password Mode Ramah di Pengaturan terlebih dahulu untuk mengaktifkan fitur ini.',
                    showCancelButton: true,
                    confirmButtonText: 'Buka Pengaturan',
                    cancelButtonText: 'Batal',
                    confirmButtonColor: '#059669',
                    cancelButtonColor: '#78716c',
                    customClass: {
                        popup: 'font-poppins text-xs sm:text-sm rounded-2xl shadow-lg border border-stone-200'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/settings');
                    }
                });
                return;
            }

            // Password tersedia, langsung aktifkan Mode Ramah
            localStorage.setItem('isEasyMode', 'true');
            setIsEasyMode(true);
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 2000,
                icon: 'success',
                title: 'Mode Ramah Diaktifkan',
                background: '#ffffff',
                color: '#292524',
                customClass: {
                    popup: 'font-poppins text-xs rounded-xl shadow-md border border-stone-200'
                }
            });
        }
    };

    const handleUnlockEasyMode = () => {
        localStorage.setItem('isEasyMode', 'false');
        setIsEasyMode(false);
        setIsEasyModeModalOpen(false);
        Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            icon: 'info',
            title: 'Mode Ramah Dinonaktifkan',
            background: '#ffffff',
            color: '#292524',
            customClass: {
                popup: 'font-poppins text-xs rounded-xl shadow-md border border-stone-200'
            }
        });
    };

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
                onError: (errorMessage) => setAlertState({ isOpen: true, title: 'Gagal Terkirim', message: errorMessage, icon: '😥' }),
            });
        } else {
            openEmergencySettings();
        }
    };

    const handleSaveEmergencyContact = () => {
        if (!contactPhone.startsWith('62') || contactPhone.length < 10) {
            setAlertState({ isOpen: true, title: "Input Tidak Valid", message: "Nomor HP harus diawali 62 (contoh: 62812...).", icon: "🤔" });
            return;
        }
        const contact: EmergencyContact = { name: contactName, phone: contactPhone };
        localStorage.setItem('emergencyContact', JSON.stringify(contact));
        setHasEmergencyContact(true);
        setSavedContactInfo(contact);
        setIsEmergencyModalOpen(false);
        setAlertState({ isOpen: true, title: "Berhasil Disimpan", message: `Kontak darurat (${contactName}) telah diperbarui.`, icon: "✅" });
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
                title: 'PIN Belum Diatur',
                text: 'Atur PIN rahasia dulu yuk sebelum mengaktifkan mode ini.',
                confirmButtonText: 'Atur Sekarang',
                confirmButtonColor: '#374151'
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsCamouflageModalOpen(true);
                }
            });
        }
    };

    return (
        <div className="w-full min-h-screen pb-24 pt-28 bg-[#FFFBF5] text-stone-800 font-poppins overflow-x-hidden relative">
            
            {/* Modals */}
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
            <SosButtonModal 
                isOpen={isSosModalOpen} 
                onClose={() => setIsSosModalOpen(false)} 
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
                
                {/* Header with Greeting */}
                <header className="mb-8 md:mb-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-[#c43c27]"></span>
                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{dateString}</p>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 tracking-tight">
                        {greeting}, <span className="text-[#c43c27]">Cantik!</span>
                    </h1>
                </header>

                {isEasyMode ? (
                    /* MODE RAMAH: Desain Vertikal 1 1 (Single column, no bento) */
                    <div className="flex flex-col gap-3.5 sm:gap-4">
                        {/* 1. PANIC BUTTON */}
                        <div 
                            onClick={onPanicButtonClick}
                            className="w-full bg-[#c43c27] hover:bg-[#b53521] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs transition-colors cursor-pointer group"
                        >
                            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                                <div className="p-3 bg-white/20 text-white rounded-2xl shrink-0">
                                    <BellRing className="w-7 h-7 sm:w-8 sm:h-8" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                                            Panic Button
                                        </h2>
                                        <button 
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openEmergencySettings(e);
                                            }} 
                                            className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors ml-1"
                                            title="Pengaturan Kontak Darurat"
                                        >
                                            <Settings className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed mt-0.5">
                                        Sekali sentuh untuk kirim lokasi GPS & pesan darurat otomatis ke WhatsApp kontak terpercaya.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto px-5 py-3 bg-white text-[#c43c27] rounded-xl sm:rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs group-hover:bg-stone-50 transition-colors shrink-0">
                                <span>BANTUAN SEKARANG</span>
                                <ArrowRight className="w-4 h-4 shrink-0" />
                            </div>
                        </div>

                        {/* 2. ARUNA TRANSLATOR (Tools Komunikasi Ramah ABK) */}
                        <Link 
                            to="/tools/translator"
                            className="w-full bg-amber-50/90 hover:bg-amber-100/80 border-2 border-amber-300 hover:border-amber-400 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xs transition-colors group cursor-pointer"
                        >
                            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                                <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl shrink-0">
                                    <Languages className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">Aruna Translator</h3>
                                        <span className="px-2 py-0.5 bg-amber-600 text-white rounded-md font-bold text-[10px] tracking-wider">
                                            TOOLS
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                                        Papan kartu kata cepat & suara bantuan bicara untuk mengekspresikan kondisi fisik, emosi, atau minta tolong.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0">
                                <span>Buka Translator</span>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            </div>
                        </Link>

                        {/* 3. SOS SIRENE */}
                        <div 
                            onClick={() => setIsSosModalOpen(true)}
                            className="w-full bg-red-50/90 hover:bg-red-100/80 border-2 border-red-300 hover:border-red-400 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xs transition-colors cursor-pointer group"
                        >
                            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                                <div className="p-3 bg-red-100 text-red-600 rounded-2xl shrink-0">
                                    <Volume2 className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">SOS Sirene</h3>
                                        <span className="px-2 py-0.5 bg-red-600 text-white rounded-md font-bold text-[10px] tracking-wider">
                                            SOS
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                                        Alarm suara keras untuk menarik perhatian sekitar saat keadaan terancam.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0">
                                <span>Bunyikan Sirene</span>
                                <Volume2 className="w-3.5 h-3.5 shrink-0" />
                            </div>
                        </div>

                        {/* 4. LIVE POSITION */}
                        <Link 
                            to="/live-position" 
                            className="w-full bg-sky-50/90 hover:bg-sky-100/80 border-2 border-sky-300 hover:border-sky-400 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xs transition-colors group cursor-pointer"
                        >
                            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                                <div className="p-3 bg-sky-100 text-sky-600 rounded-2xl shrink-0">
                                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">Live Position</h3>
                                    <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                                        Bagikan lokasi real-time dan pantau rute perjalanan aman bersama kerabat.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0">
                                <span>Buka Peta</span>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            </div>
                        </Link>

                        {/* 5. ARUNA AI */}
                        <Link 
                            to="/chat" 
                            className="w-full bg-teal-50/90 hover:bg-teal-100/80 border-2 border-teal-300 hover:border-teal-400 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xs transition-colors group cursor-pointer"
                        >
                            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                                <div className="p-3 bg-teal-100 text-teal-700 rounded-2xl shrink-0">
                                    <MessagesSquare className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">Aruna AI</h3>
                                    <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                                        Teman curhat dan konsultasi psikologis yang aman, privat, dan suportif.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0">
                                <span>Mulai Curhat</span>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            </div>
                        </Link>

                        {/* 6. JURNAL PRIBADI */}
                        <Link 
                            to="/notes" 
                            className="w-full bg-amber-50/90 hover:bg-amber-100/80 border-2 border-amber-300 hover:border-amber-400 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xs transition-colors group cursor-pointer"
                        >
                            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                                <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl shrink-0">
                                    <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">Jurnal Pribadi</h3>
                                    <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                                        Catatan harian privat dan terenkripsi aman di penyimpanan perangkat.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0">
                                <span>Buka Jurnal</span>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            </div>
                        </Link>

                        {/* 7. STATUS KEAMANAN */}
                        <div 
                            onClick={() => openEmergencySettings()}
                            className={`w-full ${
                                hasEmergencyContact 
                                    ? 'bg-emerald-50/90 hover:bg-emerald-100/80 border-emerald-300 hover:border-emerald-400' 
                                    : 'bg-amber-50/90 hover:bg-amber-100/80 border-amber-300 hover:border-amber-400'
                            } border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xs transition-colors cursor-pointer group`}
                        >
                            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                                <div className={`p-3 rounded-2xl shrink-0 ${
                                    hasEmergencyContact ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                } border-0`}>
                                    <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">Status Keamanan</h3>
                                        <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${
                                            hasEmergencyContact ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                        }`}>
                                            {hasEmergencyContact ? 'Siaga' : 'Perlu Kontak'}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                                        {hasEmergencyContact && savedContactInfo 
                                            ? `Kontak darurat: ${savedContactInfo.name} (${savedContactInfo.phone})` 
                                            : 'Belum ada kontak darurat. Ketuk untuk mengatur kontak terpercaya.'}
                                    </p>
                                </div>
                            </div>
                            <div className={`w-full sm:w-auto px-4 py-2.5 ${
                                hasEmergencyContact ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-amber-700 hover:bg-amber-800'
                            } text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0`}>
                                <span>Kelola Kontak</span>
                                <Settings className="w-3.5 h-3.5 shrink-0" />
                            </div>
                        </div>

                        {/* 8. KONTAK BANTUAN */}
                        <Link 
                            to="/directory" 
                            className="w-full bg-orange-50/90 hover:bg-orange-100/80 border-2 border-orange-300 hover:border-orange-400 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xs transition-colors group cursor-pointer"
                        >
                            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                                <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl shrink-0">
                                    <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">Kontak Bantuan</h3>
                                    <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                                        Direktori panggilan darurat, rumah sakit, kantor polisi, dan hotline 24 jam.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0">
                                <span>Lihat Kontak</span>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            </div>
                        </Link>

                        {/* 9. MODE RAMAH (Buka Kunci) */}
                        <div 
                            onClick={handleEasyModeCardClick}
                            className="w-full bg-emerald-50/90 hover:bg-emerald-100/70 border-2 border-emerald-300 hover:border-emerald-400 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xs transition-colors group cursor-pointer"
                        >
                            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl shrink-0">
                                    <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">Mode Ramah</h3>
                                        <span className="px-2 py-0.5 bg-emerald-700 text-white rounded-md font-bold text-[10px] tracking-wider flex items-center gap-1.5">
                                            <span>Aktif</span>
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                                        Mode ramah aktif. Terkunci dengan proteksi password.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0">
                                <span>Buka Kunci</span>
                                <Lock className="w-3.5 h-3.5 shrink-0" />
                            </div>
                        </div>

                        {/* 10. PENGADUAN LANGSUNG SAKA */}
                        <a 
                            href="https://bit.ly/SI-SAKA" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-amber-50/90 hover:bg-amber-50 border border-amber-200/90 hover:border-amber-300 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xs transition-colors group cursor-pointer"
                        >
                            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                                <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl shrink-0">
                                    <Megaphone className="w-6 h-6 sm:w-7 sm:h-7" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">Pengaduan Langsung SAKA</h3>
                                    <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">Layanan aduan kekerasan seksual langsung, cepat, dan rahasia.</p>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto px-4 py-2.5 bg-[#c43c27] hover:bg-[#b53521] text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0">
                                <span>Buka Layanan Aduan</span>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            </div>
                        </a>
                    </div>
                ) : (
                    /* MODE NORMAL: 12 Fitur Bento Standar */
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                        
                        {/* 1. PANIC BUTTON (The Only Hero Card: 2 Cols Mobile, 2 Cols Desktop) */}
                        <div 
                            onClick={onPanicButtonClick}
                            className="col-span-2 md:col-span-2 lg:col-span-2 bg-[#c43c27] hover:bg-[#b53521] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between shadow-xs transition-colors cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-3 sm:mb-4">
                                <div className="p-2.5 sm:p-3 bg-white/20 text-white rounded-xl sm:rounded-2xl">
                                    <BellRing className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <button 
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openEmergencySettings(e);
                                    }} 
                                    className="p-2 sm:p-2.5 bg-white/20 hover:bg-white/30 rounded-lg sm:rounded-xl transition-colors"
                                    title="Pengaturan Kontak Darurat"
                                >
                                    <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </button>
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-2xl font-bold tracking-tight mb-1 text-white">
                                    Panic Button
                                </h2>
                                <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                                    Sekali sentuh untuk kirim lokasi GPS & pesan darurat otomatis ke WhatsApp kontak terpercaya.
                                </p>
                                <div className="w-full bg-white text-[#c43c27] py-2.5 sm:py-3 text-xs sm:text-sm font-bold px-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 shadow-xs group-hover:bg-stone-50 transition-colors">
                                    <span>BANTUAN SEKARANG</span>
                                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                                </div>
                            </div>
                        </div>

                        {/* 2. SOS SIRENE (Row 1 Col 3 Desktop, Row 2 Col 1 Mobile) */}
                        <div 
                            onClick={() => setIsSosModalOpen(true)}
                            className="col-span-1 md:col-span-1 lg:col-span-1 bg-red-50/80 hover:bg-red-50 border border-red-200/80 hover:border-red-300 p-3.5 sm:p-4 min-h-[145px] sm:min-h-[155px] rounded-2xl flex flex-col justify-between shadow-xs transition-colors cursor-pointer group"
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 bg-red-100 text-red-600 rounded-xl shrink-0">
                                    <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <span className="px-2 py-0.5 bg-red-600 text-white rounded-md font-bold text-[10px] tracking-wider">
                                    SOS
                                </span>
                            </div>
                            <div className="mt-2">
                                <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">SOS Sirene</h3>
                                <p className="text-xs text-stone-600 mt-0.5 leading-tight line-clamp-1">Alarm suara keras sekitar</p>
                            </div>
                        </div>

                        {/* 3. LIVE POSITION (Row 1 Col 4 Desktop, Row 2 Col 2 Mobile) */}
                        <Link 
                            to="/live-position" 
                            className="col-span-1 md:col-span-1 lg:col-span-1 bg-sky-50/80 hover:bg-sky-50 border border-sky-200/80 hover:border-sky-300 p-3.5 sm:p-4 min-h-[145px] sm:min-h-[155px] rounded-2xl flex flex-col justify-between shadow-xs transition-colors group"
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 bg-sky-100 text-sky-600 rounded-xl shrink-0">
                                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-sky-100/80 group-hover:bg-sky-600 group-hover:text-white text-sky-600 rounded-full flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </div>
                            </div>
                            <div className="mt-2">
                                <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">Live Position</h3>
                                <p className="text-xs text-stone-600 mt-0.5 leading-tight line-clamp-1">Bagikan rute perjalanan</p>
                            </div>
                        </Link>

                        {/* 4. STATUS KEAMANAN (Row 2 Col 1 Desktop, Row 3 Col 1 Mobile) */}
                        <div 
                            onClick={() => openEmergencySettings()}
                            className={`col-span-1 md:col-span-1 lg:col-span-1 ${
                                hasEmergencyContact ? 'bg-emerald-50/80 hover:bg-emerald-50 border-emerald-200/80 hover:border-emerald-300' : 'bg-amber-50/80 hover:bg-amber-50 border-amber-200/80 hover:border-amber-300'
                            } border rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs transition-colors cursor-pointer group min-h-[145px] sm:min-h-[155px]`}
                        >
                            <div className="flex justify-between items-start">
                                <div className={`p-2.5 rounded-xl shrink-0 ${
                                    hasEmergencyContact ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] tracking-wide ${
                                    hasEmergencyContact ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                }`}>
                                    {hasEmergencyContact ? 'Siaga' : 'Atur'}
                                </span>
                            </div>
                            <div className="mt-2">
                                <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">Status Keamanan</h3>
                                <p className="text-xs text-stone-600 mt-0.5 leading-tight line-clamp-1">
                                    {hasEmergencyContact && savedContactInfo ? savedContactInfo.name : 'Atur kontak darurat'}
                                </p>
                            </div>
                        </div>

                        {/* 5. MODE KAMUFLASE (Row 2 Col 2 Desktop, Row 3 Col 2 Mobile) */}
                        <div 
                            onClick={onCamouflageClick}
                            className="col-span-1 md:col-span-1 lg:col-span-1 bg-violet-50/80 hover:bg-violet-50 border border-violet-200/80 hover:border-violet-300 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs transition-colors cursor-pointer group min-h-[145px] sm:min-h-[155px]"
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 bg-violet-100 text-violet-700 rounded-xl shrink-0">
                                    <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <button 
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openCamouflageSettings(e);
                                    }} 
                                    className="p-1.5 text-violet-600 hover:text-violet-900 bg-violet-100 hover:bg-violet-200 rounded-lg transition-colors"
                                    title="Pengaturan PIN Kamuflase"
                                >
                                    <KeyRound className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="mt-2">
                                <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">Mode Kamuflase</h3>
                                <p className="text-xs text-stone-600 mt-0.5 leading-tight line-clamp-1">Kalkulator rahasia</p>
                            </div>
                        </div>

                        {/* 6. ARUNA AI (Row 2 Col 3 Desktop, Row 4 Col 1 Mobile) */}
                        <Link 
                            to="/chat" 
                            className="col-span-1 md:col-span-1 lg:col-span-1 bg-teal-50/80 hover:bg-teal-50 border border-teal-200/80 hover:border-teal-300 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs transition-colors group min-h-[145px] sm:min-h-[155px]"
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 bg-teal-100 text-teal-700 rounded-xl shrink-0">
                                    <MessagesSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-teal-100/80 group-hover:bg-teal-700 group-hover:text-white text-teal-700 rounded-full flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </div>
                            </div>
                            <div className="mt-2">
                                <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">Aruna AI</h3>
                                <p className="text-xs text-stone-600 mt-0.5 leading-tight line-clamp-1">Teman curhat aman</p>
                            </div>
                        </Link>

                        {/* 7. SIKLUS HAID (Row 2 Col 4 Desktop, Row 4 Col 2 Mobile) */}
                        <Link 
                            to="/period" 
                            className="col-span-1 md:col-span-1 lg:col-span-1 bg-rose-50/80 hover:bg-rose-50 border border-rose-200/80 hover:border-rose-300 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs transition-colors group min-h-[145px] sm:min-h-[155px]"
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl shrink-0">
                                    <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                {periodInfo && (
                                    <div className="text-right">
                                        <span className="text-base sm:text-lg font-bold text-rose-700 tracking-tight leading-none block">
                                            {periodInfo.days > 0 ? periodInfo.days : 'Haid'}
                                        </span>
                                        {periodInfo.days > 0 && (
                                            <span className="text-[9px] font-semibold text-rose-500 uppercase">Hari</span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="mt-2">
                                <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">Siklus Haid</h3>
                                <p className="text-xs text-stone-600 mt-0.5 leading-tight line-clamp-1">
                                    {periodInfo ? `Fase: ${periodInfo.phase}` : 'Ketuk atur siklus'}
                                </p>
                            </div>
                        </Link>

                        {/* 8. JURNAL PRIBADI (Row 3 Col 1 Desktop, Row 5 Col 1 Mobile) */}
                        <Link 
                            to="/notes" 
                            className="col-span-1 md:col-span-1 lg:col-span-1 bg-amber-50/80 hover:bg-amber-50 border border-amber-200/80 hover:border-amber-300 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs transition-colors group min-h-[145px] sm:min-h-[155px]"
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl shrink-0">
                                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-amber-100/80 group-hover:bg-amber-700 group-hover:text-white text-amber-700 rounded-full flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </div>
                            </div>
                            <div className="mt-2">
                                <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">Jurnal Pribadi</h3>
                                <p className="text-xs text-stone-600 mt-0.5 leading-tight line-clamp-1">Catatan harian privat</p>
                            </div>
                        </Link>

                        {/* 9. KONTAK BANTUAN (Row 3 Col 2 Desktop, Row 5 Col 2 Mobile) */}
                        <Link 
                            to="/directory" 
                            className="col-span-1 md:col-span-1 lg:col-span-1 bg-orange-50/80 hover:bg-orange-50 border border-orange-200/80 hover:border-orange-300 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs transition-colors group min-h-[145px] sm:min-h-[155px]"
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl shrink-0">
                                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-orange-100/80 group-hover:bg-orange-600 group-hover:text-white text-orange-600 rounded-full flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </div>
                            </div>
                            <div className="mt-2">
                                <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">Kontak Bantuan</h3>
                                <p className="text-xs text-stone-600 mt-0.5 leading-tight line-clamp-1">Layanan darurat 24/7</p>
                            </div>
                        </Link>

                        {/* 10. AUDIT KEAMANAN (Row 3 Col 3 Desktop, Row 6 Col 1 Mobile) */}
                        <Link 
                            to="/audit" 
                            className="col-span-1 md:col-span-1 lg:col-span-1 bg-indigo-50/80 hover:bg-indigo-50 border border-indigo-200/80 hover:border-indigo-300 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs transition-colors group min-h-[145px] sm:min-h-[155px]"
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl shrink-0">
                                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-indigo-100/80 group-hover:bg-indigo-700 group-hover:text-white text-indigo-700 rounded-full flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </div>
                            </div>
                            <div className="mt-2">
                                <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">Audit Keamanan</h3>
                                <p className="text-xs text-stone-600 mt-0.5 leading-tight line-clamp-1">Periksa risiko keamanan perangkat & akun</p>
                            </div>
                        </Link>

                        {/* 11. PANDUAN AMAN (Row 3 Col 4 Desktop, Row 6 Col 2 Mobile) */}
                        <Link 
                            to="/information" 
                            className="col-span-1 md:col-span-1 lg:col-span-1 bg-purple-50/80 hover:bg-purple-50 border border-purple-200/80 hover:border-purple-300 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs transition-colors group min-h-[145px] sm:min-h-[155px]"
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl shrink-0">
                                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-purple-100/80 group-hover:bg-purple-700 group-hover:text-white text-purple-700 rounded-full flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </div>
                            </div>
                            <div className="mt-2">
                                <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">Panduan Aman</h3>
                                <p className="text-xs text-stone-600 mt-0.5 leading-tight line-clamp-1">Tips & panduan hadapi kekerasan</p>
                            </div>
                        </Link>

                        {/* 12. MODE RAMAH (Row 4 Cols 1-4 Desktop, Row 7 Cols 1-2 Mobile) */}
                        <div 
                            onClick={handleEasyModeCardClick}
                            className="col-span-2 md:col-span-2 lg:col-span-4 bg-emerald-50/90 hover:bg-emerald-100/70 border-2 border-emerald-300 hover:border-emerald-400 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xs transition-colors group cursor-pointer"
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="p-2.5 sm:p-3 bg-emerald-100 text-emerald-700 rounded-xl sm:rounded-2xl shrink-0 w-fit">
                                    <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-stone-900 leading-snug">Mode Ramah</h3>
                                    <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                                        Aksesibilitas tampilan dengan teks lebih besar dan navigasi ringkas.
                                    </p>
                                </div>
                            </div>
                            <div className="px-3.5 py-2.5 sm:px-4 sm:py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0 w-full sm:w-fit">
                                <span>Aktifkan Mode</span>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            </div>
                        </div>

                        {/* 13. PENGADUAN LANGSUNG SAKA (Row 5 Cols 1-4 Desktop, Row 8 Cols 1-2 Mobile) */}
                        <a 
                            href="https://bit.ly/SI-SAKA" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="col-span-2 md:col-span-2 lg:col-span-4 bg-amber-50/90 hover:bg-amber-50 border border-amber-200/90 hover:border-amber-300 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-xs transition-colors group cursor-pointer"
                        >
                            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                                <div className="p-2.5 sm:p-3 bg-amber-100 text-amber-700 rounded-xl sm:rounded-2xl shrink-0 w-fit">
                                    <Megaphone className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-stone-900 leading-snug">Pengaduan Langsung SAKA</h3>
                                    <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed line-clamp-2 sm:line-clamp-none">Layanan aduan kekerasan seksual langsung, cepat, dan rahasia.</p>
                                </div>
                            </div>
                            <div className="px-3.5 py-2.5 sm:px-4 sm:py-2.5 bg-[#c43c27] hover:bg-[#b53521] text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0 w-full sm:w-fit">
                                <span>Buka Layanan Aduan</span>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                            </div>
                        </a>

                    </div>
                )}
            </div>

            {/* Modal Buka Kunci Mode Ramah */}
            <EasyModeModal
                isOpen={isEasyModeModalOpen}
                onClose={() => setIsEasyModeModalOpen(false)}
                onUnlock={handleUnlockEasyMode}
            />
        </div>
    );
}