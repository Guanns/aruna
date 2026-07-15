import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// app/notes/page.tsx
// VERSI FIX: Action Buttons Visible on Mobile
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, BookOpenIcon, PlusIcon, TrashIcon, DocumentArrowDownIcon, ShareIcon, PencilSquareIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import Swal from 'sweetalert2';
import { getNotes, addNote, deleteNote } from '../features/notes';
import NoteViewModal from '../components/NoteViewModal';
// --- COMPONENT: EDITOR TOOLBAR ---
const EditorToolbar = ({ editor }) => {
    if (!editor)
        return null;
    return (_jsxs("div", { className: "flex items-center gap-2 p-2 bg-stone-50/80 border-b border-stone-100 backdrop-blur-sm rounded-t-3xl overflow-x-auto custom-scrollbar", children: [_jsxs("div", { className: "flex bg-white rounded-full p-1 shadow-sm border border-stone-100", children: [_jsx("button", { onClick: () => editor.chain().focus().toggleBold().run(), className: `w-8 h-8 rounded-full font-bold transition-colors ${editor.isActive('bold') ? 'bg-teal-500 text-white' : 'text-stone-500 hover:bg-stone-100'}`, children: "B" }), _jsx("button", { onClick: () => editor.chain().focus().toggleItalic().run(), className: `w-8 h-8 rounded-full italic transition-colors ${editor.isActive('italic') ? 'bg-teal-500 text-white' : 'text-stone-500 hover:bg-stone-100'}`, children: "I" }), _jsx("button", { onClick: () => editor.chain().focus().toggleUnderline().run(), className: `w-8 h-8 rounded-full underline transition-colors ${editor.isActive('underline') ? 'bg-teal-500 text-white' : 'text-stone-500 hover:bg-stone-100'}`, children: "U" })] }), _jsx("div", { className: "h-6 w-px bg-stone-300 mx-1" }), _jsx("button", { onClick: () => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run(), className: `p-1.5 rounded-full transition-colors ${editor.isActive('highlight') ? 'bg-yellow-200 text-yellow-800' : 'text-stone-500 hover:bg-yellow-100'}`, title: "Highlight", children: _jsx("div", { className: "w-5 h-5 bg-yellow-300 rounded-full border-2 border-white shadow-sm" }) }), _jsxs("div", { className: "flex items-center gap-1 bg-white rounded-full p-1 pl-2 shadow-sm border border-stone-100", children: [_jsx("span", { className: "text-[10px] font-bold text-stone-400 uppercase", children: "Warna" }), _jsx("input", { type: "color", onInput: event => editor.chain().focus().setColor(event.target.value).run(), value: editor.getAttributes('textStyle').color || '#000000', className: "w-6 h-6 rounded-full cursor-pointer border-none p-0 bg-transparent" })] })] }));
};
const MOODS = [
    { emoji: '😊', label: 'Senang' },
    { emoji: '😌', label: 'Tenang' },
    { emoji: '😢', label: 'Sedih' },
    { emoji: '😰', label: 'Cemas' },
    { emoji: '😴', label: 'Lelah' },
    { emoji: '😡', label: 'Kesal' }
];
const formatHtmlAsText = (note) => {
    const title = `CATATAN PRIBADI ARUNA`;
    const date = new Date(note.createdAt).toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    const header = `${title}\nTanggal: ${date}\n========================================\n\n`;
    const content = note.content.replace(/<[^>]+>/g, '\n'); // Simple strip tags
    return header + content.trim();
};
export default function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [selectedMood, setSelectedMood] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeMoodFilter, setActiveMoodFilter] = useState('');
    const [charCount, setCharCount] = useState(0);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setNotes(getNotes());
        }
    }, []);
    const editor = useEditor({
        extensions: [StarterKit, Highlight.configure({ multicolor: true }), TextStyle, Color, Underline],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-stone max-w-none p-6 focus:outline-none min-h-[180px] text-[#6B4F4F] text-lg leading-relaxed font-serif placeholder:text-stone-300',
                placeholder: 'Tulis apa yang kamu rasakan hari ini...',
            },
        },
        onUpdate({ editor }) {
            setCharCount(editor.getText().length);
        },
        immediatelyRender: false,
    });
    const handleOpenModal = (note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedNote(null);
    };
    const handleAddNote = () => {
        if (!editor || editor.isEmpty) {
            Swal.fire({
                title: 'Jurnal Kosong?',
                text: 'Tulis sesuatu dulu ya sebelum disimpan.',
                icon: 'question',
                confirmButtonColor: '#6B4F4F'
            });
            return;
        }
        const newNotes = addNote(editor.getHTML(), selectedMood);
        setNotes(newNotes);
        editor.commands.clearContent();
        setSelectedMood('');
        setCharCount(0);
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Tersimpan di Jurnal',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });
    };
    const handleDeleteNote = (id) => {
        Swal.fire({
            title: 'Hapus halaman ini?',
            text: "Kenangan ini akan hilang selamanya.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal',
            background: '#FFFBF5',
            color: '#6B4F4F'
        }).then((result) => {
            if (result.isConfirmed) {
                const newNotes = deleteNote(id);
                setNotes(newNotes);
                Swal.fire({
                    title: 'Terhapus',
                    icon: 'success',
                    timer: 1000,
                    showConfirmButton: false
                });
            }
        });
    };
    const handleExportTxt = (noteId) => {
        const note = notes.find(n => n.id === noteId);
        if (!note)
            return;
        const formattedText = formatHtmlAsText(note);
        const blob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Jurnal-Aruna-${new Date(note.createdAt).toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    const handleShareWhatsApp = (noteId) => {
        const note = notes.find(n => n.id === noteId);
        if (!note)
            return;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = note.content;
        const plainText = tempDiv.innerText;
        const message = `*Catatan dari Aruna:*\n\n${plainText}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    const createPreview = (htmlContent) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const plainText = tempDiv.innerText || "";
        return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
    };
    const filteredNotes = notes.filter(note => {
        const textContent = note.content.replace(/<[^>]+>/g, '').toLowerCase();
        const matchesQuery = textContent.includes(searchQuery.toLowerCase());
        const matchesMood = activeMoodFilter ? note.mood === activeMoodFilter : true;
        return matchesQuery && matchesMood;
    });
    return (_jsxs("div", { className: "w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20", children: [_jsx(NoteViewModal, { isOpen: isModalOpen, note: selectedNote, onClose: handleCloseModal }), _jsx(Link, { to: "/dashboard", className: "fixed top-6 left-6 z-50 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-md rounded-xl flex items-center justify-center shadow-md border border-stone-200/50 text-[#6B4F4F] transition-all hover:scale-105 active:scale-95 group", title: "Kembali ke Dashboard", children: _jsx(ArrowLeftIcon, { className: "w-5 h-5 group-hover:-translate-x-0.5 transition-transform" }) }), _jsxs("div", { className: "fixed inset-0 pointer-events-none z-0 overflow-hidden", children: [_jsx("div", { className: "absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-yellow-250/15 rounded-full blur-[120px] animate-pulse" }), _jsx("div", { className: "absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-teal-250/15 rounded-full blur-[100px] animate-pulse" }), _jsx("div", { className: "absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" })] }), _jsxs("div", { className: "max-w-5xl mx-auto px-6 pt-32 relative z-10", children: [_jsxs("header", { className: "flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-[#6B4F4F]/10 pb-8", children: [_jsxs("div", { children: [_jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-2 text-[#6B4F4F]/60 hover:text-[#c43c27] mb-4 transition-colors font-bold text-sm", children: [_jsx(ArrowLeftIcon, { className: "w-4 h-4" }), " Kembali ke Dashboard"] }), _jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-[#6B4F4F] tracking-tight", children: ["Jurnal ", _jsx("span", { className: "font-serif italic text-yellow-600", children: "Pribadi" })] }), _jsx("p", { className: "text-lg opacity-85 font-light leading-relaxed max-w-2xl", children: "Ruang aman untuk mencatat perasaan, kejadian, atau sekadar melepas beban pikiran secara bebas." })] }), _jsx("div", { className: "hidden md:block", children: _jsx("div", { className: "w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md border border-white/80", children: _jsx(BookOpenIcon, { className: "w-8 h-8 text-yellow-600" }) }) })] }), _jsxs("div", { className: "mb-14 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/60 relative overflow-hidden group focus-within:shadow-2xl focus-within:border-yellow-200/80 transition-all duration-500", children: [_jsx(EditorToolbar, { editor: editor }), _jsxs("div", { className: "relative", children: [_jsx(EditorContent, { editor: editor }), _jsx("div", { className: "absolute left-6 top-0 bottom-0 w-px bg-red-100/50 pointer-events-none hidden md:block" })] }), _jsxs("div", { className: "px-6 py-4 bg-white/40 border-t border-stone-100/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsx("span", { className: "text-xs font-bold text-stone-500 uppercase tracking-wide", children: "Bagaimana perasaanmu hari ini?" }), _jsx("div", { className: "flex flex-wrap gap-2", children: MOODS.map(mood => (_jsxs("button", { type: "button", onClick: () => setSelectedMood(selectedMood === mood.emoji ? '' : mood.emoji), className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-300 select-none ${selectedMood === mood.emoji
                                                ? 'bg-[#6B4F4F] text-white border-[#6B4F4F] shadow-sm scale-105'
                                                : 'bg-white/80 text-stone-600 border-stone-200 hover:bg-stone-50'}`, children: [_jsx("span", { className: "text-sm", children: mood.emoji }), _jsx("span", { children: mood.label })] }, mood.emoji))) })] }), _jsxs("div", { className: "p-4 bg-stone-50/50 border-t border-stone-100 flex justify-between items-center backdrop-blur-sm", children: [_jsxs("span", { className: "text-xs text-stone-400 font-medium pl-2", children: [charCount, " Karakter"] }), _jsxs("button", { onClick: handleAddNote, className: "flex items-center gap-2 py-2.5 px-6 bg-[#6B4F4F] text-white font-bold rounded-full hover:bg-[#5a4242] transition-all shadow-md hover:shadow-lg active:scale-95", children: [_jsx(PlusIcon, { className: "w-5 h-5" }), "Simpan Tulisan"] })] })] }), _jsxs("div", { className: "mb-10 bg-white/60 backdrop-blur-md rounded-3xl p-5 border border-white/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsx("div", { className: "relative flex-1 max-w-md w-full", children: _jsx("input", { type: "text", placeholder: "Cari kata kunci di catatan...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full bg-stone-50/50 outline-none text-[#6B4F4F] placeholder:text-stone-400 text-sm py-3 px-5 rounded-full border border-stone-200/50 focus:border-[#6B4F4F]/40 focus:bg-white transition-all duration-300" }) }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("span", { className: "text-xs font-bold text-[#6B4F4F]/60 uppercase tracking-wider mr-1", children: "Filter Mood:" }), _jsx("button", { onClick: () => setActiveMoodFilter(''), className: `px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${!activeMoodFilter
                                            ? 'bg-[#6B4F4F] text-white border-[#6B4F4F] shadow-sm'
                                            : 'bg-white/80 text-stone-600 border-stone-200 hover:bg-stone-50'}`, children: "Semua" }), MOODS.map(mood => (_jsxs("button", { onClick: () => setActiveMoodFilter(activeMoodFilter === mood.emoji ? '' : mood.emoji), className: `flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${activeMoodFilter === mood.emoji
                                            ? 'bg-[#6B4F4F] text-white border-[#6B4F4F] shadow-sm'
                                            : 'bg-white/80 text-stone-600 border-stone-200 hover:bg-stone-50'}`, children: [_jsx("span", { children: mood.emoji }), _jsx("span", { className: "hidden sm:inline", children: mood.label })] }, mood.emoji)))] })] }), filteredNotes.length > 0 ? (_jsxs("div", { children: [_jsxs("h3", { className: "text-2xl font-bold mb-6 flex items-center gap-2", children: [_jsx(CalendarDaysIcon, { className: "w-6 h-6 text-[#6B4F4F]/70" }), "Riwayat Jurnal (", filteredNotes.length, ")"] }), _jsx("div", { className: "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6", children: filteredNotes.map(note => (_jsxs("div", { className: "break-inside-avoid group bg-white/70 hover:bg-white backdrop-blur-sm rounded-[2rem] p-6 shadow-sm hover:shadow-xl border border-white/50 hover:border-yellow-200/50 transition-all duration-500 cursor-pointer relative overflow-hidden", onClick: () => handleOpenModal(note), children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-[#6B4F4F] bg-[#6B4F4F]/5 px-3 py-1 rounded-full border border-[#6B4F4F]/10", children: new Date(note.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }), note.mood && (_jsx("span", { className: "text-base bg-stone-50 border border-stone-100 px-2 py-0.5 rounded-full select-none", title: `Mood: ${note.mood}`, children: note.mood }))] }), _jsx("span", { className: "text-[10px] text-stone-400 font-semibold", children: new Date(note.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) })] }), _jsx("div", { className: "prose prose-sm max-w-none mb-6 text-[#6B4F4F]/85 font-serif leading-relaxed line-clamp-4", children: createPreview(note.content) }), _jsxs("div", { className: "flex items-center justify-end gap-2 pt-4 border-t border-stone-100/50 transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100", children: [_jsx("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        handleShareWhatsApp(note.id);
                                                    }, className: "p-2 text-stone-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors", title: "Bagikan ke WhatsApp", children: _jsx(ShareIcon, { className: "w-4 h-4" }) }), _jsx("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        handleExportTxt(note.id);
                                                    }, className: "p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors", title: "Unduh sebagai TXT", children: _jsx(DocumentArrowDownIcon, { className: "w-4 h-4" }) }), _jsx("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        handleDeleteNote(note.id);
                                                    }, className: "p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors", title: "Hapus Catatan", children: _jsx(TrashIcon, { className: "w-4 h-4" }) })] })] }, note.id))) })] })) : (_jsxs("div", { className: "text-center py-20 bg-white/30 rounded-3xl border border-dashed border-stone-300/60 p-8", children: [_jsx(PencilSquareIcon, { className: "w-16 h-16 mx-auto mb-4 text-stone-300" }), _jsx("p", { className: "text-lg text-stone-500 font-medium", children: "Catatan tidak ditemukan atau belum ada tulisan." }), _jsx("p", { className: "text-sm text-stone-400", children: "Mulailah menulis cerita barumu hari ini pada editor di atas!" })] }))] })] }));
}
