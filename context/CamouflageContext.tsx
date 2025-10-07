// context/CamouflageContext.tsx

"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type CamouflageContextType = {
    isCamouflaged: boolean;
    setIsCamouflaged: (isCamouflaged: boolean) => void;
};

const CamouflageContext = createContext<CamouflageContextType | undefined>(undefined);

export const CamouflageProvider = ({ children }: { children: ReactNode }) => {
    const [isCamouflaged, setCamouflaged] = useState(false);

    useEffect(() => {
        const camouflageStatus = sessionStorage.getItem('isCamouflaged');
        if (camouflageStatus === 'true') {
            setCamouflaged(true);
        }
    }, []);

    const handleSetCamouflaged = (status: boolean) => {
        setCamouflaged(status);
        sessionStorage.setItem('isCamouflaged', String(status)); 
    };

    return (
        <CamouflageContext.Provider value={{ isCamouflaged, setIsCamouflaged: handleSetCamouflaged }}>
            {children}
        </CamouflageContext.Provider>
    );
};

export const useCamouflage = () => {
    const context = useContext(CamouflageContext);
    if (context === undefined) {
        throw new Error('useCamouflage must be used within a CamouflageProvider');
    }
    return context;
};