import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCamouflage } from './context/CamouflageContext';
import Calculator from './components/Calculator';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
export default function AppContent({ children }) {
    const { isCamouflaged } = useCamouflage();
    // Jika mode kamuflase aktif, tampilkan kalkulator SAJA.
    if (isCamouflaged) {
        return _jsx(Calculator, {});
    }
    // Jika tidak aktif, tampilkan layout web normal (Navbar, Konten, Footer)
    return (_jsxs("div", { style: { backgroundColor: '#FFFBF5', color: '#6B4F4F' }, className: "min-h-screen", children: [_jsx(Navbar, {}), _jsx("main", { children: children }), _jsx(Footer, {})] }));
}
