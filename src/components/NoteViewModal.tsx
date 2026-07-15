// components/NoteViewModal.tsximport React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Note } from '../features/notes';

type NoteViewModalProps = {
    isOpen: boolean;
    note: Note | null;
    onClose: () => void;
};

export default function NoteViewModal({ isOpen, note, onClose }: NoteViewModalProps) {
    if (!isOpen || !note) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                <header className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <h2 className="font-bold text-lg text-gray-800">
                            Catatan pada {new Date(note.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </h2>
                        {note.mood && (
                            <span className="text-xl px-2 py-0.5 bg-stone-50 border border-stone-100 rounded-full select-none" title="Suasana Hati">
                                {note.mood}
                            </span>
                        )}
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </header>
                
                <main className="p-6 overflow-y-auto">
                    <div 
                        className="prose prose-sm sm:prose-base max-w-none" 
                        dangerouslySetInnerHTML={{ __html: note.content }} 
                    />
                </main>
            </div>
        </div>
    );
}