"use client";

let locationInterval: NodeJS.Timeout | null = null;

type EmergencyContact = {
    name: string;
    phone: string;
};

const sendLocationUpdate = (contact: EmergencyContact) => {
    if (!navigator.geolocation) {
        console.error("Geolocation tidak didukung.");
        return;
    }

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const message = `Tolong aku ${contact.name}, ini update lokasi terbaruku dari aplikasi Aruna.

Lokasiku saat ini :
maps.google.com?q=${latitude},${longitude}`;

        const whatsappUrl = `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
};

export const startLivePosition = (
    contact: EmergencyContact,
    intervalMinutes: number,
    onStart: () => void,
    onError: (message: string) => void
) => {
    if (!navigator.geolocation) {
        onError("Browser Anda tidak mendukung fitur lokasi.");
        return;
    }
    
    sendLocationUpdate(contact);
    onStart();

    const intervalMilliseconds = intervalMinutes * 60 * 1000;
    locationInterval = setInterval(() => {
        sendLocationUpdate(contact);
    }, intervalMilliseconds);
};

export const stopLivePosition = () => {
    if (locationInterval) {
        clearInterval(locationInterval);
        locationInterval = null;
    }
};