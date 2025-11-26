// app/contact/page.tsx

import React from 'react';

export default function ContactPage() {
     const pageStyle = {
      backgroundColor: '#FFFBF5',
      color: '#6B4F4F'
    };
    return (
        <div style={pageStyle} className="w-full min-h-[70vh] p-6 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold">Hubungi Kami</h1>
                    <p className="text-lg opacity-80 mt-2">Kami di sini untuk mendengar.</p>
                </header>
                <main className="prose prose-lg max-w-none mx-auto opacity-80">
                    <p>Konten untuk halaman 'Kontak' akan segera hadir. Kami akan menyediakan formulir kontak atau alamat email yang dapat dihubungi untuk pertanyaan atau dukungan.</p>
                </main>
            </div>
        </div>
    );
}