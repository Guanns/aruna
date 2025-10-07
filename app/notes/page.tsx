// app/notes/page.tsx

"use client";

import Link from 'next/link';
import { ArrowLeftIcon, BookOpenIcon, PlusIcon, TrashIcon, DocumentArrowDownIcon, ShareIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Note, getNotes, addNote, deleteNote } from '../../features/notes';
import Underline from '@tiptap/extension-underline';
import NoteViewModal from '../../components/NoteViewModal';
import Swal from 'sweetalert2'; // <-- Impor SweetAlert2

// Komponen EditorToolbar tidak perlu diubah
const EditorToolbar = ({ editor }: { editor: any }) => {
    if (!editor) return null;
    return (
        <div className="flex items-center gap-1 flex-wrap p-2 bg-gray-50 rounded-t-lg border-b">
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-teal-500 text-white p-2 rounded font-bold' : 'p-2 rounded hover:bg-gray-200 font-bold'}>B</button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-teal-500 text-white p-2 rounded italic' : 'p-2 rounded hover:bg-gray-200 italic'}>I</button>
            <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-teal-500 text-white p-2 rounded underline' : 'p-2 rounded hover:bg-gray-200 underline'}>U</button>
            <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()} className={editor.isActive('highlight') ? 'bg-yellow-300 p-2 rounded' : 'p-2 rounded hover:bg-gray-200'}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
            <input type="color" onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()} value={editor.getAttributes('textStyle').color || '#000000'} className="w-8 h-8"/>
        </div>
    );
};

const formatHtmlAsText = (note: Note) => {
    const title = `CATATAN PRIBADI ARUNA`;
    const date = new Date(note.createdAt).toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    const header = `${title}\nTanggal: ${date}\n========================================\n\n`;
    let content = note.content;
    content = content.replace(/<br\s*\/?>/gi, '\n');
    content = content.replace(/<\/p>/gi, '\n\n');
    content = content.replace(/<\/li>/gi, '\n');
    content = content.replace(/<h1>(.*?)<\/h1>/gi, '=== $1 ===\n');
    content = content.replace(/<h2>(.*?)<\/h2>/gi, '--- $1 ---\n');
    content = content.replace(/<h3>(.*?)<\/h3>/gi, '-- $1 --\n');
    content = content.replace(/<li>/gi, '* ');
    content = content.replace(/<strong>(.*?)<\/strong>/gi, '*$1*');
    content = content.replace(/<em>(.*?)<\/em>/gi, '_$1_');
    content = content.replace(/<u>(.*?)<\/u>/gi, '_$1_');
    content = content.replace(/<mark.*?>(.*?)<\/mark>/gi, '[$1]');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const plainText = tempDiv.textContent || "";
    return header + plainText.trim();
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
                class: 'prose prose-sm sm:prose-base max-w-none p-4 focus:outline-none min-h-[100px]',
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

    // --- FUNGSI MENYIMPAN CATATAN DIPERBARUI ---
    const handleAddNote = () => {
        if (!editor || editor.isEmpty) { return; }
        const newNotes = addNote(editor.getHTML());
        setNotes(newNotes);
        editor.commands.clearContent();

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Catatan berhasil disimpan!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        });
    };

    // --- FUNGSI MENGHAPUS CATATAN DIPERBARUI ---
    const handleDeleteNote = (id: number) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Catatan yang dihapus tidak dapat dikembalikan.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                const newNotes = deleteNote(id);
                setNotes(newNotes);
                Swal.fire(
                    'Dihapus!',
                    'Catatan Anda telah berhasil dihapus.',
                    'success'
                );
            }
        });
    };

    // --- FUNGSI MENGUNDUH TXT DIPERBARUI ---
    const handleExportTxt = (noteId: number) => {
        const note = notes.find(n => n.id === noteId);
        if (!note) return;

        const formattedText = formatHtmlAsText(note);

        const blob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `catatan-aruna-${noteId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'Unduhan dimulai...',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        });
    };

    const handleShareWhatsApp = (noteId: number) => {
        const note = notes.find(n => n.id === noteId);
        if (!note) return;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = note.content;
        const plainText = tempDiv.innerText;
        const adminWhatsappNumber = "6285822621031";
        const message = `hai kakk, saya ingin berbagi catatan pribadi dari aplikasi Aruna untuk konsultasi nih :\n\n---\n${plainText}\n---\n\nTerima kasih kakk.`;
        const whatsappUrl = `https://wa.me/${adminWhatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    
    const createPreview = (htmlContent: string) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const plainText = tempDiv.innerText || "";
        return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
    };

    const pageStyle = {
      backgroundColor: '#FEFBF6',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c8b4' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      color: '#5C5470'
    };

    return (
        <div className="w-full min-h-screen p-6 sm:p-8" style={pageStyle}>
            <NoteViewModal isOpen={isModalOpen} note={selectedNote} onClose={handleCloseModal} />
            
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-800 group transition-colors w-fit">
                        <ArrowLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold">Kembali</span>
                    </Link>
                </header>

                <main>
                    <div className="text-center mb-8">
                        <div className="inline-block p-4 bg-yellow-100 rounded-2xl">
                             <BookOpenIcon className="w-10 h-10 text-yellow-600"/>
                        </div>
                        <h1 className="text-3xl font-bold mt-4">Catatan Pribadi</h1>
                        <p className="mt-1 opacity-70 max-w-sm mx-auto">Ruang aman untuk mencatat pikiran dan perasaanmu. Hanya kamu yang bisa melihat ini.</p>
                    </div>

                    <div className="mb-12 bg-white rounded-xl shadow-lg border">
                         <EditorToolbar editor={editor} />
                         <EditorContent editor={editor} />
                         <div className="p-2 border-t flex justify-end">
                             <button onClick={handleAddNote} className="flex items-center gap-2 p-2 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors">
                                <PlusIcon className="w-5 h-5"/>
                                Simpan Catatan
                            </button>
                         </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {notes.map(note => (
                            <div key={note.id} className="bg-white p-5 rounded-lg shadow-md flex flex-col justify-between h-full">
                                <div>
                                    <p className="text-sm text-gray-600 leading-relaxed h-24 overflow-hidden">
                                        {createPreview(note.content)}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-3">
                                        {new Date(note.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <button onClick={() => handleOpenModal(note)} className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-teal-600 transition-colors">
                                        Buka Catatan
                                    </button>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleShareWhatsApp(note.id)} title="Bagikan ke WhatsApp" className="p-1.5 text-gray-400 hover:text-green-500">
                                            <ShareIcon className="w-5 h-5"/>
                                        </button>
                                        <button onClick={() => handleExportTxt(note.id)} title="Unduh sebagai Teks (.txt)" className="p-1.5 text-gray-400 hover:text-blue-500">
                                            <DocumentArrowDownIcon className="w-5 h-5"/>
                                        </button>
                                         <button onClick={() => handleDeleteNote(note.id)} title="Hapus Catatan" className="p-1.5 text-gray-400 hover:text-red-500">
                                            <TrashIcon className="w-5 h-5"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}