import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// app/dashboard/page.tsx
// VERSI FINAL LAYOUT: Jurnal Full Width di Tablet/PC
import { useState, useEffect } from 'react';
import { ShieldCheckIcon, PhoneIcon, BellAlertIcon, BookOpenIcon, MapPinIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon, CalculatorIcon, ArrowRightIcon, HeartIcon, SparklesIcon, KeyIcon, MegaphoneIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { triggerPanicButton } from '../features/panicButton';
import { getPeriodData, calculateCycle } from '../features/period';
import CustomAlert from '../components/CustomAlert';
import SettingsModal from '../components/SettingsModal';
import CamouflageSettingsModal from '../components/CamouflageSettingsModal';
import { useCamouflage } from '../context/CamouflageContext';
export default function DashboardPage() {
    const [greeting, setGreeting] = useState('');
    const [dateString, setDateString] = useState('');
    const [alertState, setAlertState] = useState({ isOpen: false, title: '', message: '', icon: '' });
    const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [hasEmergencyContact, setHasEmergencyContact] = useState(false);
    // Haid State
    const [periodInfo, setPeriodInfo] = useState(null);
    const { setIsCamouflaged } = useCamouflage();
    const [isCamouflageModalOpen, setIsCamouflageModalOpen] = useState(false);
    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 11)
            setGreeting('Selamat Pagi');
        else if (currentHour < 15)
            setGreeting('Selamat Siang');
        else if (currentHour < 19)
            setGreeting('Selamat Sore');
        else
            setGreeting('Selamat Malam');
        const date = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'short' };
        setDateString(date.toLocaleDateString('id-ID', options));
        const pData = getPeriodData();
        if (pData) {
            const info = calculateCycle(pData);
            setPeriodInfo({ days: info.daysLeft, phase: info.phase });
        }
        const savedContact = localStorage.getItem('emergencyContact');
        setHasEmergencyContact(!!savedContact);
    }, []);
    const openEmergencySettings = (e) => {
        e === null || e === void 0 ? void 0 : e.stopPropagation();
        const savedContact = localStorage.getItem('emergencyContact');
        if (savedContact) {
            const { name, phone } = JSON.parse(savedContact);
            setContactName(name);
            setContactPhone(phone);
        }
        else {
            setContactName('');
            setContactPhone('');
        }
        setIsEmergencyModalOpen(true);
    };
    const onPanicButtonClick = () => {
        const savedContact = localStorage.getItem('emergencyContact');
        if (savedContact) {
            const contact = JSON.parse(savedContact);
            triggerPanicButton(contact, {
                onStart: () => setAlertState({ isOpen: true, title: 'Mendeteksi Lokasi...', message: `Mempersiapkan pesan darurat untuk ${contact.name}.`, icon: '📍' }),
                onError: (errorMessage) => setAlertState({ isOpen: true, title: 'Gagal Terkirim', message: errorMessage, icon: '😥' }),
            });
        }
        else {
            openEmergencySettings();
        }
    };
    const handleSaveEmergencyContact = () => {
        if (!contactPhone.startsWith('62') || contactPhone.length < 10) {
            setAlertState({ isOpen: true, title: "Input Tidak Valid", message: "Nomor HP harus diawali 62 (contoh: 62812...).", icon: "🤔" });
            return;
        }
        const contact = { name: contactName, phone: contactPhone };
        localStorage.setItem('emergencyContact', JSON.stringify(contact));
        setHasEmergencyContact(true);
        setIsEmergencyModalOpen(false);
        setAlertState({ isOpen: true, title: "Berhasil Disimpan", message: `Kontak darurat (${contactName}) telah diperbarui.`, icon: "✅" });
    };
    const openCamouflageSettings = (e) => {
        e === null || e === void 0 ? void 0 : e.stopPropagation();
        setIsCamouflageModalOpen(true);
    };
    const onCamouflageClick = () => {
        const savedPin = localStorage.getItem('camouflagePin');
        if (savedPin) {
            setIsCamouflaged(true);
        }
        else {
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
    return (_jsxs("div", { className: "w-full min-h-screen pb-24 pt-28 bg-[#F9F5F2] text-[#5D4037] font-sans overflow-x-hidden relative", children: [_jsxs("div", { className: "fixed inset-0 pointer-events-none z-0 overflow-hidden", children: [_jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-100/35 rounded-full blur-[130px] animate-pulse", style: { animationDuration: '8s' } }), _jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-[130px] animate-pulse", style: { animationDuration: '10s' } }), _jsx("div", { className: "absolute inset-0 opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" })] }), _jsxs("div", { className: "max-w-5xl mx-auto px-6 relative z-10", children: [_jsx(CustomAlert, { isOpen: alertState.isOpen, title: alertState.title, message: alertState.message, icon: alertState.icon, onClose: () => setAlertState(Object.assign(Object.assign({}, alertState), { isOpen: false })) }), _jsx(SettingsModal, { isOpen: isEmergencyModalOpen, contactName: contactName, contactPhone: contactPhone, onNameChange: setContactName, onPhoneChange: setContactPhone, onClose: () => setIsEmergencyModalOpen(false), onSave: handleSaveEmergencyContact }), _jsx(CamouflageSettingsModal, { isOpen: isCamouflageModalOpen, onClose: () => setIsCamouflageModalOpen(false) }), _jsx("header", { className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-[#5D4037]/10 pb-8", children: _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#c43c27]" }), _jsx("p", { className: "text-xs font-bold text-[#5D4037]/50 uppercase tracking-widest", children: dateString })] }), _jsxs("h1", { className: "text-4xl md:text-5xl font-extrabold text-[#5D4037] tracking-tight leading-tight", children: [greeting, ", ", _jsxs("span", { className: "font-serif italic text-[#c43c27] relative inline-block", children: ["Cantik!", _jsx("span", { className: "absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-[#c43c27]/40 to-transparent rounded-full" })] })] })] }) }), _jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6", children: [_jsxs("div", { onClick: onPanicButtonClick, className: "col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-[#b83c2a] via-[#c94f3b] to-[#d86653] rounded-[2.5rem] p-8 relative overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl hover:shadow-[#b83c2a]/15 transition-all duration-500 hover:-translate-y-1 active:scale-[0.99]", children: [_jsx("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-15" }), _jsx("div", { className: "absolute -right-6 -top-6 w-44 h-44 bg-white/10 rounded-full blur-2xl" }), _jsx("div", { className: "absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black/10 to-transparent" }), _jsxs("div", { className: "relative h-full flex flex-col justify-between text-white z-10 min-h-[300px] lg:min-h-full", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: "bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shadow-inner group-hover:scale-105 transition-transform duration-500", children: _jsx(BellAlertIcon, { className: "w-8 h-8 text-white animate-pulse" }) }), _jsx("button", { onClick: (e) => {
                                                            e.stopPropagation();
                                                            openEmergencySettings(e);
                                                        }, className: "p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 hover:rotate-45", children: _jsx(Cog6ToothIcon, { className: "w-5 h-5 text-white" }) })] }), _jsxs("div", { className: "mt-8", children: [_jsx("h2", { className: "text-3xl font-extrabold mb-3 tracking-tight", children: "Panic Button" }), _jsx("p", { className: "text-sm text-white/85 mb-8 font-medium leading-relaxed opacity-90", children: "Tekan saat darurat. Lokasi & Sinyal SOS akan dikirimkan otomatis ke kontak terpercaya." }), _jsxs("div", { className: "w-full bg-white text-[#b83c2a] py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg group-hover:bg-[#FFFBF5] transition-all duration-300", children: [_jsx("span", { className: "tracking-wider", children: "TEKAN BANTUAN" }), _jsx(ArrowRightIcon, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })] })] })] })] }), _jsxs(Link, { to: "/live-position", className: "col-span-2 lg:col-span-2 bg-white/70 backdrop-blur-md border border-white/80 rounded-[2.5rem] p-8 flex items-center justify-between shadow-sm hover:shadow-xl hover:shadow-[#6B4F4F]/5 transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden", children: [_jsx("div", { className: "absolute right-0 top-0 w-32 h-full bg-blue-50/30 -skew-x-12 translate-x-8 transition-transform group-hover:translate-x-4 duration-500" }), _jsxs("div", { className: "relative z-10 flex items-center gap-5", children: [_jsx("div", { className: "p-4 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100/50 shadow-inner group-hover:scale-105 transition-transform duration-500", children: _jsx(MapPinIcon, { className: "w-7 h-7" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-gray-800 tracking-tight mb-1", children: "Live Position" }), _jsx("p", { className: "text-xs text-gray-500/90 font-medium", children: "Bagikan lokasi real-time." })] })] }), _jsx("div", { className: "w-11 h-11 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md group-hover:bg-blue-700 group-hover:scale-110 transition-all duration-300 relative z-10", children: _jsx(ArrowRightIcon, { className: "w-5 h-5 transition-transform group-hover:translate-x-0.5" }) })] }), _jsxs(Link, { to: "/period", className: "col-span-1 bg-gradient-to-br from-[#FFF5F6] to-[#FFE5E8] border border-rose-100/60 rounded-[2.5rem] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-[#c43c27]/5 transition-all duration-500 hover:-translate-y-1 group min-h-[180px]", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx(HeartIcon, { className: "w-8 h-8 text-rose-500 group-hover:scale-110 transition-transform duration-500" }), periodInfo && (_jsxs("div", { className: "text-right", children: [_jsx("span", { className: "text-2xl font-black text-rose-950 tracking-tight", children: periodInfo.days > 0 ? periodInfo.days : 'Haid' }), periodInfo.days > 0 && (_jsx("span", { className: "text-[9px] font-extrabold text-rose-700 block uppercase tracking-wider", children: "Hari" }))] }))] }), _jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "font-extrabold text-rose-900 text-base mb-1", children: "Siklus Haid" }), _jsx("p", { className: "text-xs text-rose-700/80 font-medium leading-snug", children: periodInfo ? `Fase: ${periodInfo.phase}` : 'Ketuk untuk atur siklus.' })] })] }), _jsxs(Link, { to: "/chat", className: "col-span-1 bg-gradient-to-br from-[#F0F9F6] to-[#DDF1EB] border border-teal-100/60 rounded-[2.5rem] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-500 hover:-translate-y-1 group min-h-[180px]", children: [_jsx(ChatBubbleLeftRightIcon, { className: "w-8 h-8 text-teal-600 group-hover:scale-110 transition-transform duration-500" }), _jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "font-extrabold text-teal-900 text-base mb-1", children: "Aruna AI" }), _jsx("p", { className: "text-xs text-teal-700/80 font-medium leading-snug", children: "Teman cerita setiamu." })] })] }), _jsxs(Link, { to: "/notes", className: "col-span-2 lg:col-span-2 bg-gradient-to-br from-[#FFFDF9] to-[#F7F2EB] border border-[#EBE3D5] rounded-[2.5rem] p-6 md:p-8 flex items-center justify-between shadow-sm hover:shadow-xl hover:shadow-[#6B4F4F]/5 transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden", children: [_jsx("div", { className: "absolute right-0 top-0 w-24 h-full bg-amber-50/20 -skew-x-12 translate-x-8 transition-transform group-hover:translate-x-4 duration-500" }), _jsxs("div", { className: "relative z-10 flex items-center gap-4", children: [_jsx(BookOpenIcon, { className: "w-8 h-8 text-amber-600 group-hover:scale-110 transition-transform duration-500" }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-gray-800 tracking-tight mb-1", children: "Jurnal Pribadi" }), _jsx("p", { className: "text-xs text-gray-500/90 font-medium", children: "Catatan hatimu hari ini." })] })] }), _jsx("div", { className: "w-10 h-10 bg-white text-amber-700 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 shadow-sm border border-amber-100/30 group-hover:scale-110", children: _jsx(ArrowRightIcon, { className: "w-5 h-5 transition-transform group-hover:translate-x-0.5" }) })] }), _jsxs("div", { onClick: onCamouflageClick, className: "col-span-2 lg:col-span-2 bg-gradient-to-br from-[#2D2825] to-[#1E1917] text-white border border-[#3E3835]/50 rounded-[2.5rem] p-6 md:p-8 flex items-center justify-between cursor-pointer shadow-lg hover:shadow-xl hover:shadow-[#1E1917]/10 transition-all duration-500 hover:-translate-y-0.5 group relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10" }), _jsxs("div", { className: "flex items-center gap-4 pl-2 relative z-10", children: [_jsx(CalculatorIcon, { className: "w-8 h-8 text-orange-200 group-hover:scale-110 transition-transform duration-500" }), _jsxs("div", { children: [_jsx("h3", { className: "font-extrabold text-lg tracking-tight text-white mb-1", children: "Mode Kamuflase" }), _jsx("p", { className: "text-xs text-white/50 font-medium", children: "Sembunyikan aplikasi ini." })] })] }), _jsx("button", { onClick: (e) => {
                                            e.stopPropagation();
                                            openCamouflageSettings(e);
                                        }, className: "p-3 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/5 transition-all duration-300 relative z-10 hover:scale-105 animate-pulse", children: _jsx(KeyIcon, { className: "w-4 h-4" }) })] }), _jsxs(Link, { to: "/directory", className: "col-span-1 bg-gradient-to-br from-[#FFFBF5] to-[#FFF5E6] border border-[#F4E3D3] rounded-[2.5rem] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-orange-900/5 transition-all duration-500 hover:-translate-y-1 group min-h-[170px]", children: [_jsx(PhoneIcon, { className: "w-8 h-8 text-orange-600 group-hover:scale-110 transition-transform duration-500" }), _jsxs("div", { children: [_jsx("h3", { className: "font-extrabold text-orange-950 text-base mb-1", children: "Kontak" }), _jsx("p", { className: "text-xs text-orange-800/80 font-medium leading-snug", children: "Panggilan darurat." })] })] }), _jsxs(Link, { to: "/audit", className: "col-span-1 bg-gradient-to-br from-[#F5F5FF] to-[#EBEBFF] border border-[#D9D9FF] rounded-[2.5rem] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-500 hover:-translate-y-1 group min-h-[170px]", children: [_jsx(ShieldCheckIcon, { className: "w-8 h-8 text-indigo-600 group-hover:scale-110 transition-transform duration-500" }), _jsxs("div", { children: [_jsx("h3", { className: "font-extrabold text-indigo-950 text-base mb-1", children: "Audit" }), _jsx("p", { className: "text-xs text-indigo-800/80 font-medium leading-snug", children: "Cek kesiapan fisik." })] })] }), _jsxs(Link, { to: "/information", className: "col-span-1 bg-gradient-to-br from-[#FAF5FF] to-[#F3EBFF] border border-[#ECD9FF] rounded-[2.5rem] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-500 hover:-translate-y-1 group min-h-[170px]", children: [_jsx(SparklesIcon, { className: "w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform duration-500" }), _jsxs("div", { children: [_jsx("h3", { className: "font-extrabold text-purple-950 text-base mb-1", children: "Panduan" }), _jsx("p", { className: "text-xs text-purple-800/80 font-medium leading-snug", children: "Panduan keselamatan." })] })] }), _jsxs("div", { onClick: () => openEmergencySettings(), className: `col-span-1 border rounded-[2.5rem] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer group min-h-[170px] ${hasEmergencyContact
                                    ? 'bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border-green-200 hover:shadow-green-900/5'
                                    : 'bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border-amber-200 hover:shadow-amber-900/5'}`, children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx(ShieldCheckIcon, { className: `w-8 h-8 group-hover:scale-110 transition-transform duration-500 ${hasEmergencyContact ? 'text-green-600' : 'text-amber-600'}` }), _jsxs("span", { className: "relative flex h-2 w-2 mt-1 mr-1", children: [_jsx("span", { className: `animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hasEmergencyContact ? 'bg-green-400' : 'bg-amber-400'}` }), _jsx("span", { className: `relative inline-flex rounded-full h-2 w-2 ${hasEmergencyContact ? 'bg-green-500' : 'bg-amber-500'}` })] })] }), _jsxs("div", { children: [_jsx("h3", { className: `font-extrabold text-base mb-1 ${hasEmergencyContact ? 'text-green-950' : 'text-amber-950'}`, children: hasEmergencyContact ? 'Siaga Aktif' : 'Belum Siaga' }), _jsx("p", { className: `text-xs font-medium leading-snug ${hasEmergencyContact ? 'text-green-800/80' : 'text-amber-800/80'}`, children: hasEmergencyContact ? 'Kontak SOS siap.' : 'Atur kontak SOS.' })] })] }), _jsxs("a", { href: "https://bit.ly/SI-SAKA", target: "_blank", rel: "noopener noreferrer", className: "col-span-2 lg:col-span-4 bg-gradient-to-br from-[#FFF5F0] to-[#FFEBE0] border border-orange-100/60 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-xl hover:shadow-orange-950/5 transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden cursor-pointer", children: [_jsx("div", { className: "absolute right-0 top-0 w-32 h-full bg-orange-50/20 -skew-x-12 translate-x-8 transition-transform group-hover:translate-x-4 duration-500" }), _jsxs("div", { className: "relative z-10 flex items-center gap-4", children: [_jsx("div", { className: "p-4 bg-white text-orange-600 rounded-2xl border border-orange-100/50 shadow-inner group-hover:scale-105 transition-transform duration-500", children: _jsx(MegaphoneIcon, { className: "w-7 h-7" }) }), _jsxs("div", { children: [_jsx("span", { className: "text-[10px] font-extrabold bg-orange-100 text-orange-700 px-2.5 py-1 rounded-lg uppercase tracking-wider", children: "Direct Link" }), _jsx("h3", { className: "text-xl font-bold text-gray-800 tracking-tight mt-1.5 mb-1", children: "Pengaduan SAKA" }), _jsx("p", { className: "text-xs text-gray-500/90 font-medium", children: "Layanan aduan kekerasan seksual secara langsung dan terenkripsi." })] })] }), _jsx("div", { className: "mt-4 md:mt-0 w-11 h-11 bg-white text-orange-700 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 shadow-sm border border-orange-100/30 group-hover:scale-110", children: _jsx(ArrowRightIcon, { className: "w-5 h-5 transition-transform group-hover:translate-x-0.5" }) })] })] }), _jsx("div", { className: "mt-16 text-center", children: _jsxs("p", { className: "text-xs text-[#5D4037]/45 italic flex items-center justify-center gap-2", children: [_jsx(HeartIcon, { className: "w-3.5 h-3.5 text-[#c43c27] animate-pulse" }), " You are safe here."] }) })] })] }));
}
