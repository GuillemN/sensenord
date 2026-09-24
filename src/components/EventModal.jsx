import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, AlertCircle, Mountain, Mail, Phone, User, ShieldCheck, Ticket, Download, Calendar, MapPin, Sparkles, Utensils, Wine, Trees } from 'lucide-react';
import { saveRegistrationToStorage, sendConfirmationEmail } from '../services/registrationService';

const getEventConfig = (event) => {
    const id = event?.id || '';
    const title = (event?.title || '').toLowerCase();

    if (id === 'botifarrada-2026' || title.includes('botifarrada')) {
        return {
            type: 'botifarrada',
            IconComponent: Utensils,
            infoTitle: `Informació de la ${event?.title || 'Botifarrada Popular'}`,
            infoDescription: event?.description || "Dinar festiu de germanor amb opció vegetariana/vegana i begudes incloses.",
            levelLabel: "Opció de Menú / Dietari *",
            levelOptions: [
                { value: 'Botifarra Tradicional (Carn)', label: 'Menú Tradicional (Botifarra de porc + pa amb tomàquet)' },
                { value: 'Opció Vegetariana / Vegana', label: 'Menú Vegetarià / Vegà' },
                { value: 'Menú Infantil', label: 'Menú Infantil (Fins a 12 anys)' }
            ],
            defaultLevel: 'Botifarra Tradicional (Carn)',
            emergencyLabel: "Contacte o Acompanyants (Opcional)",
            emergencyRequired: false,
            emergencyPlaceholder: "Ex: Venc amb 2 acompanyants / Telèfon de contacte",
            commentsLabel: "Intoleràncies Alimentàries o Al·lèrgies (Opcional)",
            commentsPlaceholder: "Escriu si tens al·lèrgies (celiaquia, lactosa...) o observacions pel dinar...",
            ticketLevelHeading: "Opció de Menú:",
            footerNote: `Les dades s'utilitzaran exclusivament per a la reserva de la ${event?.title || 'Botifarrada Popular'}.`
        };
    }

    if (id === 'tast-vi-2026' || title.includes('hericamps')) {
        return {
            type: 'tast_vi',
            IconComponent: Wine,
            infoTitle: `Informació de l'esdeveniment: ${event?.title || 'Tast de vins amb Hericamps'}`,
            infoDescription: event?.description || "Tast de 3 copes de vi ecològic i d'oli artesanal amb el celler Hericamps.",
            levelLabel: "Preferències de Tast *",
            levelOptions: [
                { value: 'Tast 3 copes de vi Hericamps', label: 'Tast de 3 copes de vi ecològic i explicacions' },
                { value: 'Opcions sense alcohol / Most', label: 'Opció Tast Sense Alcohol / Most' }
            ],
            defaultLevel: 'Tast 3 copes de vi Hericamps',
            emergencyLabel: "Acompanyants o Reserva (Opcional)",
            emergencyRequired: false,
            emergencyPlaceholder: "Ex: Venc en parella / Grup de 3 persones",
            commentsLabel: "Observacions o Al·lèrgies (Opcional)",
            commentsPlaceholder: "Escriu si tens al·lèrgies o consultes pel celler...",
            ticketLevelHeading: "Modalitat de Tast:",
            footerNote: `Les dades s'utilitzaran exclusivament per a la gestió del ${event?.title || 'Tast de vins'}.`
        };
    }

    if (id === 'cata-vins-2026' || title.includes('vins')) {
        return {
            type: 'cata_vins',
            IconComponent: Wine,
            infoTitle: `Informació del ${event?.title || 'Tast de Vins Solidari'}`,
            infoDescription: event?.description || "Cata guiada de 5 vins DO Empordà amb maridatge de formatges i embotits locals.",
            levelLabel: "Preferències de Tast *",
            levelOptions: [
                { value: 'Tast Complet (5 Vins + Maridatge)', label: 'Tast Complet (5 Vins + Maridatge)' },
                { value: 'Maridatge Sense Alcohol', label: 'Maridatge Sense Alcohol (Mosts / Begudes naturals)' },
                { value: 'Aficionat / Sommelier', label: 'Nivell Avançat / Aficionat al vi' }
            ],
            defaultLevel: 'Tast Complet (5 Vins + Maridatge)',
            emergencyLabel: "Reserva de Taula / Acompanyants (Opcional)",
            emergencyRequired: false,
            emergencyPlaceholder: "Ex: Venc en grup amb la família Soler (4 persones)",
            commentsLabel: "Intoleràncies o Preferències Alimentàries (Opcional)",
            commentsPlaceholder: "Escriu si tens intoleràncies (glutens, lactosa...) o necessitats especials...",
            ticketLevelHeading: "Modalitat de Tast:",
            footerNote: `Les dades s'utilitzaran exclusivament per a la reserva de la ${event?.title || 'Cata de Vins Solidària'}.`
        };
    }

    if (id === 'visita-incendi-2026' || title.includes('incendi') || title.includes('gavarres')) {
        return {
            type: 'visita_incendi',
            IconComponent: Trees,
            infoTitle: `Informació de la ${event?.title || 'Visita comentada a l\'incendi de Gavarres'}`,
            infoDescription: event?.description || "Visita comentada amb l'ADF Gavarres Marítima per conèixer l'impacte de l'incendi i la prevenció.",
            levelLabel: "Assistència *",
            levelOptions: [
                { value: 'General / Tots els públics', label: 'General / Assistència lliure' }
            ],
            defaultLevel: 'General / Tots els públics',
            emergencyLabel: "Contacte d'Emergència o Acompanyants (Opcional)",
            emergencyRequired: false,
            emergencyPlaceholder: "Ex: Telèfon d'emergència o acompanyants...",
            commentsLabel: "Observacions (Opcional)",
            commentsPlaceholder: "Escriu qualsevol dubte o observació per a l'ADF Gavarres Marítima...",
            ticketLevelHeading: "Tipus d'assistència:",
            footerNote: `Les dades s'utilitzaran exclusivament per a l'organització de la Visita a l'Incendi de Gavarres.`
        };
    }

    // Default: Via Ferrada / Escalada
    return {
        type: 'via_ferrada',
        IconComponent: Mountain,
        infoTitle: `Informació de la ${event?.title || 'Via Ferrada Solidària'}`,
        infoDescription: event?.description || "Jornada d'escalada i via ferrada solidària. Material tècnic i assegurança inclosos.",
        levelLabel: "Nivell d'Experiència en Vies Ferrades *",
        levelOptions: [
            { value: 'Principiant / Primera vegada', label: "Principiant / Primera vegada (Taller d'iniciació)" },
            { value: 'Intermedi (He fet alguna via ferrada)', label: "Intermedi (He realitzat alguna via ferrada)" },
            { value: 'Avançat / Autònom', label: "Avançat / Autònom" }
        ],
        defaultLevel: 'Principiant / Primera vegada',
        emergencyLabel: "Contacte d'Emergència (Nom i Telèfon) *",
        emergencyRequired: true,
        emergencyPlaceholder: "Ex: Marta Vila (Mare) - +34 666 777 888",
        commentsLabel: "Observacions o Material requerit (opcional)",
        commentsPlaceholder: "Escriu qualsevol informació d'interès per als guies, si portes equip propi...",
        ticketLevelHeading: "Nivell d'escalada:",
        footerNote: `Les dades s'utilitzaran exclusivament per a l'organització i assegurança de la ${event?.title || 'Via Ferrada Solidària'}.`
    };
};

const EventModal = ({ isOpen, onClose, event }) => {
    const config = getEventConfig(event);
    const InfoIcon = config.IconComponent;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dni: '',
        level: config.defaultLevel,
        emergencyContact: '',
        comments: ''
    });

    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [confirmedTicket, setConfirmedTicket] = useState(null);
    const [emailNotice, setEmailNotice] = useState('');

    useEffect(() => {
        if (event) {
            setFormData(prev => ({
                ...prev,
                level: config.defaultLevel
            }));
        }
    }, [event?.id]);

    if (!isOpen || !event) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const prefix = config.type === 'botifarrada' ? 'BOT' : config.type === 'cata_vins' || config.type === 'tast_vi' ? 'VIN' : config.type === 'visita_incendi' ? 'ADF' : 'VF';
        const ticketId = `SN-${prefix}2026-${Math.floor(10000 + Math.random() * 90000)}`;
        const now = new Date();
        const formattedDate = `${now.toLocaleDateString('ca-ES')} ${now.toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' })}`;

        const registrationRecord = {
            id: ticketId,
            createdAt: formattedDate,
            event: event.title,
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            dni: formData.dni.trim() || 'N/D',
            level: formData.level || config.defaultLevel,
            emergencyContact: formData.emergencyContact.trim() || (config.emergencyRequired ? 'No especificat' : '-'),
            comments: formData.comments.trim() || '-'
        };

        // 1. Save locally so it's instantly available in UI
        saveRegistrationToStorage(registrationRecord);

        // 2. Submit to Google Apps Script & Trigger Emails
        const emailResult = await sendConfirmationEmail(registrationRecord);
        setEmailNotice(emailResult.message || `Inscripció i correu processats per a ${formData.email}`);

        setConfirmedTicket(registrationRecord);
        setStatus('success');
    };

    const handlePrintTicket = () => {
        window.print();
    };

    const handleReset = () => {
        setStatus('idle');
        setConfirmedTicket(null);
        setFormData({
            name: '',
            email: '',
            phone: '',
            dni: '',
            level: config.defaultLevel,
            emergencyContact: '',
            comments: ''
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleReset}
                        className="fixed inset-0 bg-stone-950/70 backdrop-blur-md z-50 transition-opacity"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
                    >
                        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[92vh] border border-stone-200">
                            {/* Header */}
                            <div className="p-6 bg-gradient-to-r from-alpine-950 via-alpine-900 to-slate-900 text-white relative">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                                Inscripció Oficial 2026
                                            </span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white uppercase">
                                            {event.title}
                                        </h2>
                                        <p className="text-alpine-200 text-sm mt-1 flex flex-wrap items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4 text-amber-400" />
                                                {event.fullDate || `${event.date} ${event.month} ${event.year}`}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4 text-amber-400" />
                                                {event.location}
                                            </span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleReset}
                                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                                        aria-label="Tancar modal"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Content area */}
                            <div className="p-6 md:p-8 overflow-y-auto">
                                {status === 'success' && confirmedTicket ? (
                                    <div className="py-4 space-y-6">
                                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-2xl flex items-start gap-4">
                                            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                                                <CheckCircle className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-emerald-950">Inscripció Confirmada amb Èxit!</h4>
                                                <p className="text-sm text-emerald-800 mt-0.5">
                                                    Gràcies, <strong>{confirmedTicket.name}</strong>! T'hem reservat la plaça per a <strong>{confirmedTicket.event}</strong>.
                                                </p>
                                                <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-lg">
                                                    <Mail className="w-3.5 h-3.5 text-emerald-700" />
                                                    {emailNotice}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Digital Ticket Pass */}
                                        <div className="border-2 border-dashed border-stone-300 rounded-3xl p-6 bg-stone-50 relative overflow-hidden shadow-inner">
                                            <div className="flex justify-between items-center border-b border-stone-200 pb-4 mb-4">
                                                <div>
                                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Comprovant / Passi d'Accés</span>
                                                    <span className="text-xl font-display font-bold text-alpine-900">{confirmedTicket.event}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Codi Reserva</span>
                                                    <span className="text-sm font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">{confirmedTicket.id}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                                                <div>
                                                    <span className="text-xs font-semibold text-stone-500 block">Participant:</span>
                                                    <span className="font-bold text-stone-800">{confirmedTicket.name}</span>
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold text-stone-500 block">DNI / NIF:</span>
                                                    <span className="font-bold text-stone-800">{confirmedTicket.dni}</span>
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold text-stone-500 block">Correu Electrònic:</span>
                                                    <span className="font-bold text-stone-800">{confirmedTicket.email}</span>
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold text-stone-500 block">Telèfon:</span>
                                                    <span className="font-bold text-stone-800">{confirmedTicket.phone}</span>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <span className="text-xs font-semibold text-stone-500 block">{config.ticketLevelHeading}</span>
                                                    <span className="font-bold text-alpine-700">{confirmedTicket.level}</span>
                                                </div>
                                            </div>

                                            {confirmedTicket.emergencyContact && confirmedTicket.emergencyContact !== '-' && (
                                                <div className="border-t border-stone-200 pt-3 text-xs text-stone-600">
                                                    <strong>Contacte / Acompanyants:</strong> {confirmedTicket.emergencyContact}
                                                </div>
                                            )}

                                            <div className="mt-4 pt-4 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-stone-500">
                                                <div className="flex items-center gap-1.5">
                                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                                    <span>Inscripció oficial registrada a Sense Nord</span>
                                                </div>
                                                <span className="font-mono text-stone-400">{confirmedTicket.createdAt}</span>
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                            <button
                                                onClick={handlePrintTicket}
                                                className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer text-xs"
                                            >
                                                <Download className="w-4 h-4" />
                                                Imprimir / Desar Passi
                                            </button>
                                            <button
                                                onClick={handleReset}
                                                className="py-3 px-6 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl transition-colors cursor-pointer text-xs"
                                            >
                                                Tancar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="bg-amber-50/80 border border-amber-200/80 p-4 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
                                            <InfoIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <span className="font-bold block text-amber-950 text-sm">{config.infoTitle}</span>
                                                {config.infoDescription}
                                            </div>
                                        </div>

                                        {/* Name & DNI */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="md:col-span-2">
                                                <label htmlFor="name" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                                                    Nom i Cognoms *
                                                </label>
                                                <div className="relative">
                                                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-alpine-500 focus:ring-2 focus:ring-alpine-200 outline-none text-sm transition-all"
                                                        placeholder="Ex: Pau Garcia Soler"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="dni" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                                                    DNI / NIF / Passaport *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="dni"
                                                    name="dni"
                                                    required
                                                    value={formData.dni}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-alpine-500 focus:ring-2 focus:ring-alpine-200 outline-none text-sm transition-all uppercase"
                                                    placeholder="12345678X"
                                                />
                                            </div>
                                        </div>

                                        {/* Contact: Email & Phone */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="email" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                                                    Correu Electrònic *
                                                </label>
                                                <div className="relative">
                                                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-alpine-500 focus:ring-2 focus:ring-alpine-200 outline-none text-sm transition-all"
                                                        placeholder="el-teu-correu@exemple.com"
                                                    />
                                                </div>
                                                <span className="text-[11px] text-stone-400 mt-1 block">Rebràs la confirmació i instruccions de la reserva.</span>
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                                                    Telèfon de Mòbil *
                                                </label>
                                                <div className="relative">
                                                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        required
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-alpine-500 focus:ring-2 focus:ring-alpine-200 outline-none text-sm transition-all"
                                                        placeholder="+34 612 345 678"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dynamic Select Field (Level / Menu / Tasting) */}
                                        <div>
                                            <label htmlFor="level" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                                                {config.levelLabel}
                                            </label>
                                            <select
                                                id="level"
                                                name="level"
                                                value={formData.level}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-alpine-500 focus:ring-2 focus:ring-alpine-200 outline-none text-sm transition-all bg-white font-medium"
                                            >
                                                {config.levelOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Dynamic Contact / Emergency Field */}
                                        <div>
                                            <label htmlFor="emergencyContact" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                                                {config.emergencyLabel}
                                            </label>
                                            <input
                                                type="text"
                                                id="emergencyContact"
                                                name="emergencyContact"
                                                required={config.emergencyRequired}
                                                value={formData.emergencyContact}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-alpine-500 focus:ring-2 focus:ring-alpine-200 outline-none text-sm transition-all"
                                                placeholder={config.emergencyPlaceholder}
                                            />
                                        </div>

                                        {/* Dynamic Comments / Allergies Field */}
                                        <div>
                                            <label htmlFor="comments" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                                                {config.commentsLabel}
                                            </label>
                                            <textarea
                                                id="comments"
                                                name="comments"
                                                rows={2}
                                                value={formData.comments}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-alpine-500 focus:ring-2 focus:ring-alpine-200 outline-none text-sm transition-all resize-none"
                                                placeholder={config.commentsPlaceholder}
                                            />
                                        </div>

                                        {status === 'error' && (
                                            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                                Hi ha hagut un error en processar la inscripció. Comprova les dades i torna-ho a provar.
                                            </div>
                                        )}

                                        {/* Submit button */}
                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className={`w-full py-4 mt-2 font-display font-bold uppercase tracking-widest text-white rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${status === 'submitting'
                                                    ? 'bg-stone-400 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-amber-500 to-alpine-600 hover:from-amber-600 hover:to-alpine-700 shadow-amber-900/20 hover:shadow-xl hover:-translate-y-0.5'
                                                }`}
                                        >
                                            {status === 'submitting' ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Processant inscripció...
                                                </>
                                            ) : (
                                                <>
                                                    <Ticket className="w-5 h-5" />
                                                    Confirmar Inscripció i Enviar Correu
                                                </>
                                            )}
                                        </button>
                                        <p className="text-[11px] text-center text-stone-400">
                                            {config.footerNote}
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EventModal;
