import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { XMarkIcon } from '@heroicons/react/24/solid';
export default function NoteViewModal({ isOpen, note, onClose }) {
    if (!isOpen || !note) {
        return null;
    }
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in", children: _jsxs("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col", children: [_jsxs("header", { className: "p-4 border-b flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("h2", { className: "font-bold text-lg text-gray-800", children: ["Catatan pada ", new Date(note.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })] }), note.mood && (_jsx("span", { className: "text-xl px-2 py-0.5 bg-stone-50 border border-stone-100 rounded-full select-none", title: "Suasana Hati", children: note.mood }))] }), _jsx("button", { onClick: onClose, className: "p-2 text-gray-400 hover:bg-gray-100 rounded-full", children: _jsx(XMarkIcon, { className: "w-6 h-6" }) })] }), _jsx("main", { className: "p-6 overflow-y-auto", children: _jsx("div", { className: "prose prose-sm sm:prose-base max-w-none", dangerouslySetInnerHTML: { __html: note.content } }) })] }) }));
}
