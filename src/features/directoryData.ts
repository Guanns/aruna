export type Contact = {
    name: string;
    description: string;
    phone: string;
    category: 'Layanan Nasional' | 'Kekerasan & Hukum';
};

export const contacts: Contact[] = [
    {
        name: 'Komnas Perempuan',
        description: 'Layanan pengaduan kekerasan terhadap perempuan.',
        phone: '021-3903963',
        category: 'Kekerasan & Hukum',
    },
    {
        name: 'SAPA 129',
        description: 'Sahabat Perempuan dan Anak oleh KemenPPPA.',
        phone: '129',
        category: 'Kekerasan & Hukum',
    },
    {
        name: 'LBH APIK',
        description: 'Bantuan hukum untuk isu-isu perempuan.',
        phone: '0813-8882-2669',
        category: 'Kekerasan & Hukum',
    },
    {
        name: 'Polisi',
        description: 'Layanan darurat Kepolisian Republik Indonesia.',
        phone: '110',
        category: 'Layanan Nasional',
    },
    {
        name: 'Ambulans',
        description: 'Layanan darurat medis.',
        phone: '119',
        category: 'Layanan Nasional',
    },
    {
        name: 'Pemadam Kebakaran',
        description: 'Layanan darurat kebakaran dan penyelamatan.',
        phone: '113',
        category: 'Layanan Nasional',
    },
];