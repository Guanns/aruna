// features/panicButton.ts
// VERSI FIX: Koordinat Akurat (Google Maps Standard)
export const triggerPanicButton = (contact, callbacks) => {
    callbacks.onStart();
    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: true, // Paksa GPS akurasi tinggi
            timeout: 15000, // Waktu tunggu diperlama (15dtk) biar dapat satelit
            maximumAge: 0, // Jangan pakai cache lokasi lama
        };
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            // FIX: Format URL yang benar
            const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            const message = `*TOLONGIN AKU!*\n\n${contact.name}!! aku dalam bahaya\n\nLokasi terbaru aku disini : ${googleMapsUrl}\n\ntolong ajuin pengaduan darurat secepatnya melalui link Pengaduan SAKA https://bit.ly/SI-SAKA !!!\n\n(teks ini dikirim otomatis melalui website Aruna)`;
            // FIX MOBILE: Gunakan location.href agar langsung membuka aplikasi WA
            const whatsappUrl = `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`;
            window.location.href = whatsappUrl;
            // Fallback (Jaga-jaga)
            setTimeout(() => {
                callbacks.onError("Jika WhatsApp tidak terbuka, silakan tekan tombol manual.");
            }, 2000);
        }, (error) => {
            console.error("Error mendapatkan lokasi: ", error);
            let msg = "Gagal mendapatkan lokasi.";
            if (error.code === 1)
                msg = "Izin lokasi ditolak. Mohon aktifkan GPS di pengaturan HP.";
            else if (error.code === 2)
                msg = "Sinyal GPS lemah. Coba bergeser ke area terbuka.";
            else if (error.code === 3)
                msg = "Waktu habis mencari lokasi. Coba lagi.";
            callbacks.onError(msg);
        }, options);
    }
    else {
        callbacks.onError("Browser Anda tidak mendukung fitur lokasi.");
    }
};
