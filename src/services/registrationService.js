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

const DELETED_KEY = 'sensenord_deleted_ids_v1';

export const getDeletedRegistrationIds = () => {
    try {
        const item = localStorage.getItem(DELETED_KEY);
        if (!item) return [];
        const parsed = JSON.parse(item);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
};

export const deleteRegistrationFromStorage = async (id) => {
    try {
        const targetIdStr = String(id);
        const current = getStoredRegistrations();
        const updated = current.filter(item => item && String(item.id) !== targetIdStr);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        const deletedList = getDeletedRegistrationIds();
        if (!deletedList.includes(targetIdStr)) {
            deletedList.push(targetIdStr);
            localStorage.setItem(DELETED_KEY, JSON.stringify(deletedList));
        }

        const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
        if (scriptUrl) {
            try {
                await fetch(`${scriptUrl}?action=delete&id=${encodeURIComponent(targetIdStr)}`, {
                    method: 'POST',
                    mode: 'no-cors'
                });
            } catch (err) {
                console.warn('Google Script delete notification error:', err);
            }
        }

        window.dispatchEvent(new Event('sensenord_registration_added'));
        return true;
    } catch (e) {
        console.error('Error deleting registration:', e);
        return false;
    }
};

export const generateEmailInstructionsText = (registration) => {
    const eventName = (registration.event || '').toLowerCase();
    const name = registration.name || 'Participant';

    if (eventName.includes('botifarrada')) {
        return `Hola ${name}!

Gràcies per reservar el teu tiquet per a la ${registration.event} organitzada per Sense Nord!

📌 DETALLS DE LA TEVA RESERVA:
• Codi de Reserva: ${registration.id}
• Esdeveniment: ${registration.event}
• Opció de Menú: ${registration.level}
• DNI / NIF: ${registration.dni}
• Telèfon: ${registration.phone}
• Observacions / Al·lèrgies: ${registration.comments || 'Cap'}

🎒 INFORMACIÓ IMPORTANT:
1. Presenta aquest codi de reserva (${registration.id}) a la taula d'accés per recollir els tiquets de dinar i beguda.
2. L'activitat comença a les 13:00h. Preguem arribar amb temps.
3. Gaudirem de dinar de germanor, opció vegetariana, begudes i música en directe.

Si tens qualsevol dubte, pots respondre directament a aquest correu.

Ens veiem ben aviat a la taula!
Equip de Sense Nord Solidari`;
    }

    if (eventName.includes('cata')) {
        return `Hola ${name}!

Gràcies per inscriure't a la ${registration.event} organitzada per Sense Nord!

📌 DETALLS DE LA TEVA RESERVA:
• Codi de Reserva: ${registration.id}
• Esdeveniment: ${registration.event}
• Modalitat de Tast: ${registration.level}
• DNI / NIF: ${registration.dni}
• Telèfon: ${registration.phone}
• Observacions / Intoleràncies: ${registration.comments || 'Cap'}

🎒 INFORMACIÓ IMPORTANT:
1. Presenta aquest codi de reserva (${registration.id}) a la recepció del tast.
2. L'activitat comença puntualment a les 18:00h.
3. El tast inclou 5 vins de la DO Empordà i maridatge complet de productes de la terra.

Si tens qualsevol dubte, pots respondre directament a aquest correu.

Ens veiem ben aviat al tast!
Equip de Sense Nord Solidari`;
    }

    if (eventName.includes('hericamps') || (eventName.includes('tast') && !eventName.includes('empordà'))) {
        return `Hola ${name}!

Heu reservat el tast de vins amb Hericamps!

Hericamps és un celler familiar, ecològic i de mínima intervenció de La Figuera, al Priorat. Treballen les seves pròpies vinyes, també a Celrà, i realitzen ells mateixos totes les feines durant l’any.

A través dels seus vins i olis artesanals contribueixen a mantenir vius el poble, la comarca, la pagesia i l’entorn natural. 🌱🍇

Durant l’activitat tastareu 3 copes de vi, acompanyades d’explicacions sobre els vins, el procés d’elaboració i la feina que hi ha darrere de cada ampolla.

Més que un tast de vins, serà també un espai de divulgació per conèixer de primera mà la feina dels pagesos, la realitat de la pagesia i la importància de mantenir viu el territori. 🌾

📌 DETALLS DE LA RESERVA:
• Codi de Reserva: ${registration.id}
• Horari: 12:00
• Preu: 8€
• DNI / NIF: ${registration.dni}

Ens veiem al tast!

Equip de Sense Nord`;
    }

    if (eventName.includes('incendi') || eventName.includes('gavarres')) {
        return `Hola ${name}!

Us heu inscrit a la Visita comentada a l'incendi de les Gavarres! 🌲🔥🚶‍♂️

Moltes gràcies per sumar-vos a aquesta activitat de conscienciació i divulgació organitzada conjuntament amb l'ADF Gavarres Marítima.

📌 DETALLS DE LA VOSTRA RESERVA:
• Codi de Reserva: ${registration.id}
• Horari: De 9:00h a 12:00h
• Punt de trobada: Aparcament de Romanyà de la Selva
• Recorregut: Anirem a la zona de l'incendi a tocar de la urbanització Vall Repòs i Mas Artigues.
• DNI / NIF: ${registration.dni}

A través d'aquesta visita parlarem de l'incendi, el seu impacte, les tasques de recuperació del bosc i les mesures clau de prevenció d'incendis forestals.

🎒 RECORDATORI IMPORTANT:
• Portar calçat adequat per caminar per muntanya/bosc.
• Portar aigua i protecció solar.

⚠️ Les places són limitades. Si finalment no podeu venir, us agrairem molt que ens aviseu com més aviat millor, perquè una altra persona pugui aprofitar la vostra plaça i participar en aquesta iniciativa solidària.

Per a qualsevol dubte o consulta, podeu respondre directament a aquest correu.

Moltes gràcies per la vostra implicació, per aportar el vostre granet de sorra i cuidar les Gavarres! 🌿🤍

Equip de Sense Nord & ADF Gavarres Marítima`;
    }

    // Default: Via Ferrada Solidària
    return `Hola ${name}!

Us heu apuntat a la Via Ferrada Solidària! 🧗‍♂️🌲

Recordeu que es tracta d’una activitat física. Si no heu fet mai una via ferrada o teniu alguna dificultat física, és important que ho comuniqueu en el moment de fer la inscripció.

⚠️ Les places són limitades. Si finalment no podeu venir, us agrairem molt que ens aviseu com més aviat millor, perquè una altra persona pugui aprofitar la vostra plaça i participar en aquesta iniciativa solidària.

Recordeu que és una activitat sense ànim de lucre i de taquilla inversa: cadascú aporta el que vulgui, el que cregui i el que pugui. Tot el que es recapti anirà destinat a l’ADF Gavarres Marítima, per contribuir a la recuperació, repoblació i cura dels nostres boscos després dels incendis.

📌 DETALLS DE LA TEVA RESERVA:
• Codi de Reserva: ${registration.id}
• Data: Dissabte, 10 d'Octubre de 2026 (09:00h)
• Ubicació: Cala del Molí / Sant Feliu de Guíxols
• Nivell registrat: ${registration.level}
• DNI / NIF: ${registration.dni}
• Contacte d'emergència: ${registration.emergencyContact}

Per a qualsevol dubte, podeu respondre aquest correu o contactar directament amb @aventuraexperiencesfg per Instagram.

Moltes gràcies per participar, aportar el vostre granet de sorra i cuidar les Gavarres! 🤍🌲

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
