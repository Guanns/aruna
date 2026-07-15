import { jsx as _jsx } from "react/jsx-runtime";
// context/CamouflageContext.tsx
import { createContext, useState, useContext, useEffect } from 'react';
const CamouflageContext = createContext(undefined);
export const CamouflageProvider = ({ children }) => {
    const [isCamouflaged, setCamouflaged] = useState(false);
    useEffect(() => {
        const camouflageStatus = sessionStorage.getItem('isCamouflaged');
        if (camouflageStatus === 'true') {
            setCamouflaged(true);
        }
    }, []);
    const handleSetCamouflaged = (status) => {
        setCamouflaged(status);
        sessionStorage.setItem('isCamouflaged', String(status));
    };
    return (_jsx(CamouflageContext.Provider, { value: { isCamouflaged, setIsCamouflaged: handleSetCamouflaged }, children: children }));
};
export const useCamouflage = () => {
    const context = useContext(CamouflageContext);
    if (context === undefined) {
        throw new Error('useCamouflage must be used within a CamouflageProvider');
    }
    return context;
};
