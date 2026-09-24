import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calculator, Eye, EyeOff, KeyRound, Lock, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SettingsPage() {
    // 1. Kontak Darurat State
    const [emergencyContactName, setEmergencyContactName] = useState<string>('');
    const [emergencyContactPhone, setEmergencyContactPhone] = useState<string>('');

    // 2. Mode Kamuflase (PIN) State
    const [camouflageSecretPin, setCamouflageSecretPin] = useState<string>('');
    const [isCamouflagePinConfigured, setIsCamouflagePinConfigured] = useState<boolean>(false);
    const [isSecretPinVisible, setIsSecretPinVisible] = useState<boolean>(false);

    // 3. Password Mode Ramah State
    const [easyModePassword, setEasyModePassword] = useState<string>('');
    const [isEasyModePasswordConfigured, setIsEasyModePasswordConfigured] = useState<boolean>(false);
    const [isEasyModePasswordVisible, setIsEasyModePasswordVisible] = useState<boolean>(false);

    // Fungsi notifikasi toast statis agar kartu tidak bergeser tata letaknya di mobile
    const showToastNotification = (title: string, icon: 'success' | 'error' | 'info') => {
        Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: false,
            icon: icon,
            title: title,
            background: '#ffffff',
            color: '#292524',
            customClass: {
                popup: 'font-poppins text-xs rounded-xl shadow-md border border-stone-200'
            }
        });
    };

    // Muat data dari localStorage saat halaman pertama kali dibuka
    useEffect(() => {
        // Load Kontak Darurat
        const savedEmergencyContact = localStorage.getItem('emergencyContact');
        if (savedEmergencyContact) {
            try {
                const parsedContact = JSON.parse(savedEmergencyContact);
                setEmergencyContactName(parsedContact.name || '');
                setEmergencyContactPhone(parsedContact.phone || '');
            } catch {
                // Abaikan jika data tidak valid
            }
        }

        // Load PIN Kamuflase
        const savedCamouflagePin = localStorage.getItem('camouflagePin');
        if (savedCamouflagePin) {
            setCamouflageSecretPin(savedCamouflagePin);
            setIsCamouflagePinConfigured(true);
        } else {
            setIsCamouflagePinConfigured(false);
        }

        // Load Password Mode Ramah
        const savedEasyModePassword = localStorage.getItem('easyModePassword');
        if (savedEasyModePassword) {
            setEasyModePassword(savedEasyModePassword);
            setIsEasyModePasswordConfigured(true);
        } else {
            setIsEasyModePasswordConfigured(false);
        }
    }, []);

    // Handler Simpan Kontak Darurat
    const handleSaveEmergencyContact = (event: React.FormEvent) => {
        event.preventDefault();

        const trimmedName = emergencyContactName.trim();
        const trimmedPhone = emergencyContactPhone.trim();

        if (trimmedName.length === 0) {
            showToastNotification('Nama kontak darurat tidak boleh kosong.', 'error');
            return;
        }

        if (!trimmedPhone.startsWith('62') || trimmedPhone.length < 10 || isNaN(Number(trimmedPhone))) {
            showToastNotification('Nomor WhatsApp harus diawali 62 dan minimal 10 digit.', 'error');
            return;
        }

        const contactData = { name: trimmedName, phone: trimmedPhone };
        localStorage.setItem('emergencyContact', JSON.stringify(contactData));
        showToastNotification('Kontak darurat berhasil disimpan!', 'success');
    };

    // Handler Simpan PIN Kamuflase
    const handleSaveCamouflagePin = (event: React.FormEvent) => {
        event.preventDefault();

        const trimmedPin = camouflageSecretPin.trim();

        if (trimmedPin.length < 4 || isNaN(Number(trimmedPin))) {
            showToastNotification('PIN harus berupa angka minimal 4 digit.', 'error');
            return;
        }

        localStorage.setItem('camouflagePin', trimmedPin);
        setIsCamouflagePinConfigured(true);
        showToastNotification('PIN rahasia kamuflase berhasil disimpan!', 'success');
    };

    // Handler Reset PIN Kamuflase
    const handleResetCamouflagePin = () => {
        Swal.fire({
            title: 'Hapus PIN Kamuflase?',
            text: 'Aplikasi tidak lagi terkunci dengan mode kalkulator rahasia.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#c43c27',
            cancelButtonColor: '#78716c',
            confirmButtonText: 'Ya, Hapus PIN',
            cancelButtonText: 'Batal'
        }).then((confirmationResult) => {
            if (confirmationResult.isConfirmed) {
                localStorage.removeItem('camouflagePin');
                setCamouflageSecretPin('');
                setIsCamouflagePinConfigured(false);
                showToastNotification('PIN kamuflase berhasil dihapus.', 'info');
            }
        });
    };

    // Handler Simpan Password Mode Ramah
    const handleSaveEasyModePassword = (event: React.FormEvent) => {
        event.preventDefault();

        const trimmedPassword = easyModePassword.trim();
        if (trimmedPassword.length < 4) {
            showToastNotification('Password harus minimal 4 karakter.', 'error');
            return;
        }

        localStorage.setItem('easyModePassword', trimmedPassword);
        setIsEasyModePasswordConfigured(true);
        showToastNotification('Password Mode Ramah berhasil disimpan!', 'success');
    };

    // Handler Reset Password Mode Ramah
    const handleResetEasyModePassword = () => {
        Swal.fire({
            title: 'Hapus Password Mode Ramah?',
            text: 'Mode Ramah tidak dapat diaktifkan sebelum password baru dibuat.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#c43c27',
            cancelButtonColor: '#78716c',
            confirmButtonText: 'Ya, Hapus Password',
            cancelButtonText: 'Batal'
        }).then((confirmationResult) => {
            if (confirmationResult.isConfirmed) {
                localStorage.removeItem('easyModePassword');
                setEasyModePassword('');
                setIsEasyModePasswordConfigured(false);
                showToastNotification('Password Mode Ramah berhasil dihapus.', 'info');
            }
        });
    };

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-stone-800 font-poppins pt-20 sm:pt-24 pb-16 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                
                {/* Header Halaman */}
                <header className="mb-6 sm:mb-8">
                    <div className="mb-2 sm:mb-2.5">
                        <Link 
                            to="/dashboard" 
                            className="p-1.5 sm:p-2 -ml-1.5 sm:-ml-2 rounded-full hover:bg-stone-200/60 text-stone-600 hover:text-stone-900 transition-colors inline-flex items-center justify-center shrink-0"
                            title="Kembali ke Dashboard"
                        >
                            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Link>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                        Pengaturan
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 sm:mt-1.5 leading-relaxed">
                        Sesuaikan preferensi aksesibilitas, nomor darurat, dan keamanan privasi akun Anda.
                    </p>
                </header>

                <div className="space-y-4 sm:space-y-6">

                    {/* KARTU 1: Kontak Darurat (Panic Button) - Ramping & Pas di Layar */}
                    <section className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 sm:px-6 shadow-xs">
                        <div className="flex items-center sm:items-start gap-3 sm:gap-4 mb-3.5 sm:mb-4">
                            <div className="p-2.5 sm:p-3 bg-stone-100 text-[#c43c27] rounded-xl shrink-0">
                                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h2 className="text-sm sm:text-base font-bold text-stone-900 leading-tight">
                                        Kontak Darurat
                                    </h2>
                                    <span className={`text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${
                                        emergencyContactPhone 
                                            ? 'bg-emerald-100 text-emerald-800' 
                                            : 'bg-amber-100 text-amber-800'
                                    }`}>
                                        {emergencyContactPhone ? 'Tersedia' : 'Belum Diatur'}
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                                    Penerima pesan WhatsApp darurat dan lokasi saat tombol panik ditekan.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSaveEmergencyContact} className="space-y-3 sm:space-y-4">
                            <div>
                                <label htmlFor="emergencyContactName" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                                    Nama Kontak Darurat
                                </label>
                                <input
                                    type="text"
                                    id="emergencyContactName"
                                    value={emergencyContactName}
                                    onChange={(event) => setEmergencyContactName(event.target.value)}
                                    placeholder="Contoh: Ayah / Ibu / Sahabat"
                                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 placeholder:text-stone-400 text-sm focus:outline-none focus:border-stone-500 focus:bg-white transition-colors"
                                />
                            </div>

                            <div>
                                <label htmlFor="emergencyContactPhone" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                                    Nomor WhatsApp (Kode 62)
                                </label>
                                <input
                                    type="tel"
                                    id="emergencyContactPhone"
                                    value={emergencyContactPhone}
                                    onChange={(event) => setEmergencyContactPhone(event.target.value)}
                                    placeholder="Contoh: 6281234567890"
                                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 placeholder:text-stone-400 text-sm font-mono focus:outline-none focus:border-stone-500 focus:bg-white transition-colors"
                                />
                                <p className="text-[11px] sm:text-xs text-stone-500 mt-1">
                                    Gunakan format 62 tanpa angka 0 di depan (contoh: 6281234567890).
                                </p>
                            </div>

                            <div className="pt-1 sm:pt-2">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto bg-[#c43c27] hover:bg-[#b53521] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Simpan Kontak Darurat</span>
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* KARTU 2: Mode Kamuflase (Kalkulator Rahasia) - Ramping & Pas di Layar */}
                    <section className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 sm:px-6 shadow-xs">
                        <div className="flex items-center sm:items-start gap-3 sm:gap-4 mb-3.5 sm:mb-4">
                            <div className="p-2.5 sm:p-3 bg-stone-100 text-stone-800 rounded-xl shrink-0">
                                <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h2 className="text-sm sm:text-base font-bold text-stone-900 leading-tight">
                                        Mode Kamuflase
                                    </h2>
                                    <span className={`text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${
                                        isCamouflagePinConfigured 
                                            ? 'bg-emerald-100 text-emerald-800' 
                                            : 'bg-stone-100 text-stone-600'
                                    }`}>
                                        {isCamouflagePinConfigured ? 'PIN Aktif' : 'Belum Diatur'}
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                                    Kunci aplikasi dengan kalkulator rahasia. Buka kembali dengan PIN dan tombol (=).
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSaveCamouflagePin} className="space-y-3 sm:space-y-4">
                            <div>
                                <label htmlFor="camouflageSecretPin" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                                    PIN Rahasia (Minimal 4 Angka)
                                </label>
                                <div className="relative max-w-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                                        <KeyRound className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <input
                                        type={isSecretPinVisible ? 'text' : 'password'}
                                        id="camouflageSecretPin"
                                        value={camouflageSecretPin}
                                        onChange={(event) => setCamouflageSecretPin(event.target.value)}
                                        placeholder="Contoh: 1234"
                                        maxLength={8}
                                        className="w-full pl-9 pr-9 py-2 sm:pl-10 sm:pr-10 sm:py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 placeholder:text-stone-400 text-sm font-mono tracking-widest focus:outline-none focus:border-stone-500 focus:bg-white transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsSecretPinVisible(!isSecretPinVisible)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
                                        title={isSecretPinVisible ? 'Sembunyikan PIN' : 'Tampilkan PIN'}
                                    >
                                        {isSecretPinVisible ? (
                                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                        ) : (
                                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-[11px] sm:text-xs text-stone-500 mt-1">
                                    Hanya gunakan 4-8 digit karakter angka.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                                <button
                                    type="submit"
                                    className="bg-stone-800 hover:bg-stone-900 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>Simpan PIN Rahasia</span>
                                </button>

                                {isCamouflagePinConfigured && (
                                    <button
                                        type="button"
                                        onClick={handleResetCamouflagePin}
                                        className="text-stone-600 hover:text-rose-700 hover:bg-rose-50 border border-stone-200 font-semibold text-xs sm:text-sm px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl transition-colors text-center"
                                    >
                                        Hapus / Reset PIN
                                    </button>
                                )}
                            </div>
                        </form>
                    </section>

                    {/* KARTU 3: Password Mode Ramah */}
                    <section className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 sm:px-6 shadow-xs">
                        <div className="flex items-center sm:items-start gap-3 sm:gap-4 mb-3.5 sm:mb-4">
                            <div className="p-2.5 sm:p-3 bg-stone-100 text-emerald-700 rounded-xl shrink-0">
                                <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h2 className="text-sm sm:text-base font-bold text-stone-900 leading-tight">
                                        Password Mode Ramah
                                    </h2>
                                    <span className={`text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${
                                        isEasyModePasswordConfigured 
                                            ? 'bg-emerald-100 text-emerald-800' 
                                            : 'bg-stone-100 text-stone-600'
                                    }`}>
                                        {isEasyModePasswordConfigured ? 'Password Aktif' : 'Belum Diatur'}
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                                    Kunci pengaman untuk mengaktifkan dan membuka kembali Mode Ramah.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSaveEasyModePassword} className="space-y-3 sm:space-y-4">
                            <div>
                                <label htmlFor="easyModePasswordInput" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                                    Password Mode Ramah
                                </label>
                                <div className="relative max-w-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                                        <KeyRound className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <input
                                        type={isEasyModePasswordVisible ? 'text' : 'password'}
                                        id="easyModePasswordInput"
                                        value={easyModePassword}
                                        onChange={(event) => setEasyModePassword(event.target.value)}
                                        placeholder="Minimal 4 karakter"
                                        className="w-full pl-9 pr-9 py-2 sm:pl-10 sm:pr-10 sm:py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 placeholder:text-stone-400 text-sm focus:outline-none focus:border-stone-500 focus:bg-white transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsEasyModePasswordVisible(!isEasyModePasswordVisible)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
                                        title={isEasyModePasswordVisible ? 'Sembunyikan Password' : 'Tampilkan Password'}
                                    >
                                        {isEasyModePasswordVisible ? (
                                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                        ) : (
                                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-[11px] sm:text-xs text-stone-500 mt-1">
                                    Gunakan minimal 4 karakter.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                                <button
                                    type="submit"
                                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>Simpan Password</span>
                                </button>

                                {isEasyModePasswordConfigured && (
                                    <button
                                        type="button"
                                        onClick={handleResetEasyModePassword}
                                        className="text-stone-600 hover:text-rose-700 hover:bg-rose-50 border border-stone-200 font-semibold text-xs sm:text-sm px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl transition-colors text-center"
                                    >
                                        Hapus / Reset Password
                                    </button>
                                )}
                            </div>
                        </form>
                    </section>

                </div>
            </div>
        </div>
    );
}