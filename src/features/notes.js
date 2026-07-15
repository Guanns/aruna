const STORAGE_KEY = "aruna-private-notes";
// Ambil semua catatan dari localStorage
export const getNotes = () => {
    if (typeof window === "undefined")
        return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw)
            return [];
        const parsed = JSON.parse(raw);
        // Validasi minimal
        if (!Array.isArray(parsed))
            return [];
        return parsed;
    }
    catch (_a) {
        return [];
    }
};
// Tambah catatan baru (di atas)
export const addNote = (content, mood) => {
    const notes = getNotes();
    const newNote = {
        id: Date.now(),
        content,
        createdAt: new Date().toISOString(),
        mood,
    };
    const updated = [newNote, ...notes];
    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    return updated;
};
// Hapus catatan by id
export const deleteNote = (id) => {
    const notes = getNotes();
    const updated = notes.filter(n => n.id !== id);
    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    return updated;
};
