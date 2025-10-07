// features/notes.ts

"use client";

// Tipe data untuk setiap catatan
export type Note = {
  id: number;          // ID unik untuk setiap catatan
  content: string;     // Isi catatan (HTML dari editor)
  createdAt: string;   // ISO string
};

const STORAGE_KEY = "aruna-private-notes";

// Ambil semua catatan dari localStorage
export const getNotes = (): Note[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Note[];
    // Validasi minimal
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

// Tambah catatan baru (di atas)
export const addNote = (content: string): Note[] => {
  const notes = getNotes();
  const newNote: Note = {
    id: Date.now(),
    content,
    createdAt: new Date().toISOString(),
  };
  const updated = [newNote, ...notes];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
};

// Hapus catatan by id
export const deleteNote = (id: number): Note[] => {
  const notes = getNotes();
  const updated = notes.filter(n => n.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
};
