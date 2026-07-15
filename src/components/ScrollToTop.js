import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export default function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        // Snap instantly to the top (0, 0) on every route navigation change
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}
