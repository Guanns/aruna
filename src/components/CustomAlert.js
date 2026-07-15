import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function CustomAlert({ isOpen, title, message, icon, onClose }) {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[110] p-6 animate-fade-in", children: _jsxs("div", { className: "bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 w-full max-w-sm text-center border border-white relative transform transition-all scale-100 animate-bounce-in", children: [_jsx("div", { className: "text-6xl mb-6 drop-shadow-sm animate-pulse", children: icon }), _jsx("h2", { className: "text-2xl font-bold text-[#6B4F4F] mb-3", children: title }), _jsx("p", { className: "text-[#6B4F4F]/70 mb-8 leading-relaxed text-sm", children: message }), _jsx("button", { onClick: onClose, className: "w-full bg-[#6B4F4F] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-[#5a4242] hover:shadow-lg transition-all active:scale-95 shadow-md", children: "Mengerti" })] }) }));
}
