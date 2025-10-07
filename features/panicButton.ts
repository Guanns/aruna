type EmergencyContact = {
    name: string;
    phone: string;
};

type PanicButtonCallbacks = {
    onStart: () => void;
    onError: (message: string) => void;
};

export const triggerPanicButton = (contact: EmergencyContact, callbacks: PanicButtonCallbacks) => {
    callbacks.onStart();

    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const message = `*TOLONG! SAYA DALAM BAHAYA.*\n\nIni adalah pesan darurat dari aplikasi Aruna.\nLokasi saya saat ini:\nhttps://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
                
                const whatsappUrl = `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            },
            (error) => {
                console.error("Error mendapatkan lokasi: ", error);
                callbacks.onError("Gagal mendapatkan lokasi. Pastikan izin lokasi telah diberikan dan coba lagi.");
            },
            options
        );
    } else {
        callbacks.onError("Maaf, browser Anda tidak mendukung fitur lokasi.");
    }
};