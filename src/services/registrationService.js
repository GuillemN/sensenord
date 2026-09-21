import emailjs from '@emailjs/browser';

const STORAGE_KEY = 'sensenord_registrations_v1';

// Seed mock initial registrations if empty
const DEFAULT_REGISTRATIONS = [
    {
        id: 'SN-VF2026-1001',
        createdAt: '2026-10-01 10:15:00',
        event: 'Via Ferrada Solidària',
        name: 'Marc Soler i Vila',
        email: 'marc.soler@exemple.cat',
        phone: '+34 654 321 987',
        dni: '43215678X',
        level: 'Intermedi',
        emergencyContact: 'Laura Vila (+34 666 333 222)',
        comments: 'Porto el meu propi casc i arnés.'
    },
    {
        id: 'SN-VF2026-1002',
        createdAt: '2026-10-02 16:40:00',
        event: 'Via Ferrada Solidària',
        name: 'Elena Pujol Claverol',
        email: 'elena.pujol@exemple.cat',
        phone: '+34 612 987 654',
        dni: '38765432Z',
        level: 'Principiant / Primera vegada',
        emergencyContact: 'Jordi Pujol (+34 611 999 888)',
        comments: 'Necessitaré lloguer/préstec de material tècnic.'
    }
];

export const getStoredRegistrations = () => {
    try {
        const item = localStorage.getItem(STORAGE_KEY);
        if (!item) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_REGISTRATIONS));
            return DEFAULT_REGISTRATIONS;
        }
        const parsed = JSON.parse(item);
        return Array.isArray(parsed) ? parsed : DEFAULT_REGISTRATIONS;
    } catch (e) {
        console.error('Error reading local storage registrations:', e);
        return DEFAULT_REGISTRATIONS;
    }
};

export const saveRegistrationToStorage = (data) => {
    try {
        const current = getStoredRegistrations();
        const updated = [data, ...current];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('sensenord_registration_added'));
        return true;
    } catch (e) {
        console.error('Error saving registration locally:', e);
        return false;
    }
};

export const deleteRegistrationFromStorage = (id) => {
    try {
        const current = getStoredRegistrations();
        const updated = current.filter(item => item && item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('sensenord_registration_added'));
        return true;
    } catch (e) {
        console.error('Error deleting registration:', e);
        return false;
    }
};

export const generateEmailInstructionsText = (registration) => {
    return `Hola ${registration.name}!

Gràcies per inscriure't a la Via Ferrada Solidària 2026 organitzada per Sense Nord!

📌 DETALLS DE LA TEVA RESERVA:
• Codi de Reserva: ${registration.id}
• Data: Dissabte, 10 d'Octubre de 2026
• Hora de trobada: 09:00h (Preguem puntualitat)
• Ubicació: Cala del Molí / Sant Feliu de Guíxols (Costa Brava)
• Nivell registrat: ${registration.level}
• DNI / NIF: ${registration.dni}

🎒 INSTRUCCIONS I QUÈ HAS DE PORTAR:
1. Calçat: Sabatilles d'esport amb bona sola de goma o botes de muntanya/aproximació.
2. Roba: Roba còmoda de muntanya/esport transpirable adaptada a la intempèrie.
3. Hidratació i Nutrició: Mínim 1,5 Litres d'aigua per persona i petits snacks (barretes, fruita seca).
4. Protecció Solar: Crema solar, gorra i ulleres de sol.
5. Material Tècnic: Casc, arnés i disipador oficials inclosos per a tots els participants.

Si tens qualsevol dubte o canvi de darrera hora, pots respondre directament a aquest correu.

Ens veiem ben aviat a la roca!
Equip de Sense Nord Solidari`;
};

export const sendConfirmationEmail = async (registration) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY;
    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    const instructions = generateEmailInstructionsText(registration);

    // 1. Send via EmailJS if credentials are set
    if (serviceId && templateId && publicKey) {
        try {
            const templateParams = {
                to_name: registration.name,
                to_email: registration.email,
                event_name: registration.event,
                ticket_code: registration.id,
                date: '10 d\'Octubre de 2026 (09:00h)',
                location: 'Cala del Molí / Sant Feliu de Guíxols',
                phone: registration.phone,
                level: registration.level,
                instructions: instructions
            };

            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            return { success: true, mode: 'emailjs', message: `Correu d'instruccions enviat a ${registration.email}` };
        } catch (error) {
            console.warn('EmailJS error:', error);
        }
    }

    // 2. Send via Web3Forms if key configured
    if (web3formsKey) {
        try {
            await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: web3formsKey,
                    subject: `Confirmació d'Inscripció i Instruccions: ${registration.event} (${registration.id})`,
                    from_name: 'Sense Nord Solidari',
                    to_email: registration.email,
                    name: registration.name,
                    email: registration.email,
                    phone: registration.phone,
                    dni: registration.dni,
                    message: instructions
                })
            });
            return { success: true, mode: 'web3forms', message: `Correu d'instruccions enviat a ${registration.email}` };
        } catch (err) {
            console.warn('Web3Forms error:', err);
        }
    }

    // 3. Send via Google Apps Script (Sends both Admin notification & Participant email with instructions)
    if (scriptUrl) {
        try {
            await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(registration)
            });
            return { success: true, mode: 'google_script', message: `Inscripció registrada i notificació enviada` };
        } catch (err) {
            console.warn('Google Script email error:', err);
        }
    }

    return {
        success: true,
        mode: 'simulated',
        message: `Correu registrat amb instruccions per a ${registration.email}`
    };
};

export const exportToCSV = (dataList) => {
    if (!Array.isArray(dataList) || dataList.length === 0) return;

    const headers = ['Codi Inscripció', 'Data/Hora', 'Esdeveniment', 'Nom i Cognoms', 'Email', 'Telèfon', 'DNI/NIF', 'Nivell', 'Contacte Emergència', 'Comentaris'];

    const csvRows = [];
    csvRows.push(headers.join(';'));

    dataList.forEach(item => {
        if (!item) return;
        const row = [
            `"${String(item.id || '-').replace(/"/g, '""')}"`,
            `"${String(item.createdAt || item.timestamp || '-').replace(/"/g, '""')}"`,
            `"${String(item.event || '-').replace(/"/g, '""')}"`,
            `"${String(item.name || '-').replace(/"/g, '""')}"`,
            `"${String(item.email || '-').replace(/"/g, '""')}"`,
            `"${String(item.phone || '-').replace(/"/g, '""')}"`,
            `"${String(item.dni || '-').replace(/"/g, '""')}"`,
            `"${String(item.level || '-').replace(/"/g, '""')}"`,
            `"${String(item.emergencyContact || '-').replace(/"/g, '""')}"`,
            `"${String(item.comments || '-').replace(/"/g, '""')}"`
        ];
        csvRows.push(row.join(';'));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Inscripcions_ViaFerrada_SenseNord_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
