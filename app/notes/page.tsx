// app/notes/page.tsx
// VERSI FIX: Action Buttons Visible on Mobile

"use client";

import Link from 'next/link';
import { 
    ArrowLeftIcon, 
    BookOpenIcon, 
    PlusIcon, 
    TrashIcon, 
    DocumentArrowDownIcon, 
    ShareIcon,
    PencilSquareIcon,
    CalendarDaysIcon
} from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import Swal from 'sweetalert2';
import { Note, getNotes, addNote, deleteNote } from '../../features/notes';
import NoteViewModal from '../../components/NoteViewModal';

// --- COMPONENT: EDITOR TOOLBAR ---
const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;
    return (
        <div className="flex items-center gap-2 p-2 bg-stone-50/80 border-b border-stone-100 backdrop-blur-sm rounded-t-3xl overflow-x-auto custom-scrollbar">
            <div className="flex bg-white rounded-full p-1 shadow-sm border border-stone-100">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={`w-8 h-8 rounded-full font-bold transition-colors ${editor.isActive('bold') ? 'bg-teal-500 text-white' : 'text-stone-500 hover:bg-stone-100'}`}>B</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`w-8 h-8 rounded-full italic transition-colors ${editor.isActive('italic') ? 'bg-teal-500 text-white' : 'text-stone-500 hover:bg-stone-100'}`}>I</button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`w-8 h-8 rounded-full underline transition-colors ${editor.isActive('underline') ? 'bg-teal-500 text-white' : 'text-stone-500 hover:bg-stone-100'}`}>U</button>
            </div>
            
            <div className="h-6 w-px bg-stone-300 mx-1"></div>

            <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()} className={`p-1.5 rounded-full transition-colors ${editor.isActive('highlight') ? 'bg-yellow-200 text-yellow-800' : 'text-stone-500 hover:bg-yellow-100'}`} title="Highlight">
                <div className="w-5 h-5 bg-yellow-300 rounded-full border-2 border-white shadow-sm"></div>
            </button>
            
            <div className="flex items-center gap-1 bg-white rounded-full p-1 pl-2 shadow-sm border border-stone-100">
                <span className="text-[10px] font-bold text-stone-400 uppercase">Warna</span>
                <input 
                    type="color" 
                    onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()} 
                    value={editor.getAttributes('textStyle').color || '#000000'} 
                    className="w-6 h-6 rounded-full cursor-pointer border-none p-0 bg-transparent"
                />
            </div>
        </div>
    );
};

const formatHtmlAsText = (note: Note) => {
    const title = `CATATAN PRIBADI ARUNA`;
    const date = new Date(note.createdAt).toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    const header = `${title}\nTanggal: ${date}\n========================================\n\n`;
    const content = note.content.replace(/<[^>]+>/g, '\n'); // Simple strip tags
    return header + content.trim();
};

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

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
                class: 'prose prose-stone max-w-none p-6 focus:outline-none min-h-[150px] text-[#6B4F4F] text-lg leading-relaxed font-serif placeholder:text-stone-300',
                placeholder: 'Tulis apa yang kamu rasakan hari ini...',
            },
        },
        immediatelyRender: false,
    });
    
    const handleOpenModal = (note: Note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedNote(null);
    };

    const handleAddNote = () => {
        if (!editor || editor.isEmpty) { 
            Swal.fire('Kosong?', 'Tulis sesuatu dulu ya sebelum disimpan.', 'question');
            return; 
        }
        const newNotes = addNote(editor.getHTML());
        setNotes(newNotes);
        editor.commands.clearContent();

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

    const handleDeleteNote = (id: number) => {
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

    const handleExportTxt = (noteId: number) => {
        const note = notes.find(n => n.id === noteId);
        if (!note) return;
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

    const handleShareWhatsApp = (noteId: number) => {
        const note = notes.find(n => n.id === noteId);
        if (!note) return;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = note.content;
        const plainText = tempDiv.innerText;
        const message = `*Catatan dari Aruna:*\n\n${plainText}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    
    const createPreview = (htmlContent: string) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const plainText = tempDiv.innerText || "";
        return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
    };

    return (
        <div className="w-full min-h-screen bg-[#FFFBF5] text-[#6B4F4F] relative overflow-hidden font-sans pb-20">
            <NoteViewModal isOpen={isModalOpen} note={selectedNote} onClose={handleCloseModal} />
            
            {/* --- BACKGROUND FX --- */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-yellow-200/20 rounded-full blur-[100px]"></div>
                 <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-[100px]"></div>
                 <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
            </div>

            <div className="max-w-5xl mx-auto px-6 pt-32 relative z-10">
                
                {/* --- HEADER --- */}
                <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#6B4F4F]/60 hover:text-[#c43c27] mb-4 transition-colors">
                            <ArrowLeftIcon className="w-4 h-4"/> Kembali ke Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold mb-2 text-[#6B4F4F]">
                            Jurnal <span className="font-serif italic text-yellow-600">Pribadi</span>
                        </h1>
                        <p className="text-lg opacity-70 font-light">
                            Ruang aman untuk mencatat perasaan, kejadian, atau sekadar melepas beban pikiran.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="w-16 h-16 bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm border border-white/60">
                            <BookOpenIcon className="w-8 h-8 text-yellow-600" />
                        </div>
                    </div>
                </header>

                {/* --- EDITOR CARD --- */}
                <div className="mb-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/60 relative overflow-hidden group focus-within:shadow-2xl focus-within:border-yellow-200 transition-all duration-500">
                     <EditorToolbar editor={editor} />
                     
                     <div className="relative">
                        <EditorContent editor={editor} />
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-red-100/50 pointer-events-none hidden md:block"></div>
                     </div>

                     <div className="p-4 bg-stone-50/50 border-t border-stone-100 flex justify-between items-center backdrop-blur-sm">
                         <span className="text-xs text-stone-400 font-medium pl-2">
                            {editor?.storage.characterCount?.characters() || 0} Karakter
                         </span>
                         <button 
                            onClick={handleAddNote} 
                            className="flex items-center gap-2 py-2.5 px-6 bg-[#6B4F4F] text-white font-bold rounded-full hover:bg-[#5a4242] transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            <PlusIcon className="w-5 h-5"/>
                            Simpan Tulisan
                        </button>
                     </div>
                </div>
                
                {/* --- NOTES GRID --- */}
                {notes.length > 0 ? (
                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <CalendarDaysIcon className="w-6 h-6 text-teal-600"/>
                            Riwayat Tulisan
                        </h3>
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {notes.map(note => (
                                <div key={note.id} className="break-inside-avoid group bg-white/70 hover:bg-white backdrop-blur-sm rounded-[2rem] p-6 shadow-sm hover:shadow-xl border border-white/50 hover:border-teal-100 transition-all duration-300 cursor-pointer relative overflow-hidden" onClick={() => handleOpenModal(note)}>
                                    
                                    {/* Date Badge */}
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                                            {new Date(note.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                        <span className="text-[10px] text-stone-400">
                                            {new Date(note.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>

                                    {/* Content Preview */}
                                    <div className="prose prose-sm max-w-none mb-6 text-[#6B4F4F]/80 font-serif leading-relaxed line-clamp-4">
                                        {createPreview(note.content)}
                                    </div>

                                    {/* ACTION BUTTONS */}
                                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100/50 transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                                        <button onClick={(e) => {e.stopPropagation(); handleShareWhatsApp(note.id)}} className="p-2 text-stone-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors" title="Share WA">
                                            <ShareIcon className="w-4 h-4"/>
                                        </button>
                                        <button onClick={(e) => {e.stopPropagation(); handleExportTxt(note.id)}} className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Download TXT">
                                            <DocumentArrowDownIcon className="w-4 h-4"/>
                                        </button>
                                        <button onClick={(e) => {e.stopPropagation(); handleDeleteNote(note.id)}} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Hapus">
                                            <TrashIcon className="w-4 h-4"/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 opacity-40">
                        <PencilSquareIcon className="w-16 h-16 mx-auto mb-4 text-stone-300"/>
                        <p className="text-lg">Belum ada catatan. Mulai tulis ceritamu hari ini.</p>
                    </div>
                )}
            </div>
        </div>
    );
}