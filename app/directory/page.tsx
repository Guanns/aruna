"use client";

import Link from 'next/link';
import { ArrowLeftIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { contacts, Contact } from '../../features/directoryData'; 

export default function DirectoryPage() {
    const pageStyle = {
      backgroundColor: '#FFFBF5',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23D4CFC7' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      color: '#6B4F4F'
    };

    const nationalServices = contacts.filter(c => c.category === 'Layanan Nasional');
    const violenceServices = contacts.filter(c => c.category === 'Kekerasan & Hukum');

    const ContactCard = ({ contact }: { contact: Contact }) => (
        <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-gray-200/80">
            <div>
                <h3 className="font-bold text-base">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.description}</p>
            </div>
            <a href={`tel:${contact.phone}`} className="flex items-center gap-2 bg-green-600 text-white font-bold text-sm py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                <PhoneIcon className="w-4 h-4" />
                Panggil
            </a>
        </div>
    );

    return (
        <div className="w-full min-h-screen p-6 sm:p-8" style={pageStyle}>
            <div className="max-w-2xl mx-auto">
                <header className="mb-8 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-800 group transition-colors">
                        <ArrowLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold">Kembali</span>
                    </Link>
                </header>

                <main>
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold">Direktori Bantuan</h1>
                        <p className="mt-1 opacity-70">Daftar kontak penting yang bisa kamu hubungin.</p>
                    </div>

                    {/* Bagian Layanan Kekerasan & Hukum */}
                    <section className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Layanan Kekerasan & Bantuan Hukum</h2>
                        <div className="space-y-3">
                            {violenceServices.map(contact => <ContactCard key={contact.name} contact={contact} />)}
                        </div>
                    </section>

                    {/* Bagian Layanan Nasional */}
                    <section>
                        <h2 className="text-xl font-bold mb-4">Layanan Darurat Nasional</h2>
                        <div className="space-y-3">
                             {nationalServices.map(contact => <ContactCard key={contact.name} contact={contact} />)}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}