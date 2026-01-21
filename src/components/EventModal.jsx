import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const EventModal = ({ isOpen, onClose, event }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        comments: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    if (!isOpen || !event) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        // TODO: Replace with real Google Apps Script URL later
        const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

        if (!SCRIPT_URL) {
            // Mock success for UI testing if no URL provided
            setTimeout(() => {
                setStatus('success');
            }, 1500);
            return;
        }

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'register',
                    event: event.title,
                    data: formData
                })
            });
            setStatus('success');
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                        onClick={onClose}
                        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
                    >
                        <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]">
                            {/* Header */}
                            <div className="p-6 bg-stone-50 border-b border-stone-100 flex justify-between items-start">
                                <div>
                                    <h3 className="text-sm font-bold text-alpine-600 uppercase tracking-widest mb-1">Inscripció</h3>
                                    <h2 className="text-2xl font-display font-bold text-stone-900">{event.title}</h2>
                                    <p className="text-stone-500 text-sm mt-1">{event.date} {event.month} {event.year} • {event.time}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 overflow-y-auto">
                                {status === 'success' ? (
                                    <div className="py-12 flex flex-col items-center text-center">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-stone-800 mb-2">Inscripció Rebuda!</h3>
                                        <p className="text-stone-600 max-w-xs mx-auto">
                                            Gràcies per apuntar-te. Ens posarem en contacte amb tu aviat amb més detalls.
                                        </p>
                                        <button
                                            onClick={onClose}
                                            className="mt-8 px-6 py-2 bg-stone-100 font-bold text-stone-600 rounded-lg hover:bg-stone-200 transition-colors"
                                        >
                                            Tancar
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-bold text-stone-700 mb-1">Nom complet</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-alpine-500 focus:ring-2 focus:ring-alpine-200 outline-none transition-all"
                                                placeholder="Ex: Maria Vila"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-bold text-stone-700 mb-1">Correu electrònic</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-alpine-500 focus:ring-2 focus:ring-alpine-200 outline-none transition-all"
                                                    placeholder="maria@exemple.com"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-bold text-stone-700 mb-1">Telèfon</label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-alpine-500 focus:ring-2 focus:ring-alpine-200 outline-none transition-all"
                                                    placeholder="+376 123 456"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="comments" className="block text-sm font-bold text-stone-700 mb-1">Comentaris (opcional)</label>
                                            <textarea
                                                id="comments"
                                                name="comments"
                                                rows={3}
                                                value={formData.comments}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-alpine-500 focus:ring-2 focus:ring-alpine-200 outline-none transition-all resize-none"
                                                placeholder="Tens alguna al·lèrgia o necessitat especial?"
                                            />
                                        </div>

                                        {status === 'error' && (
                                            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                Hi ha hagut un error. Torna-ho a provar.
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className={`w-full py-4 mt-4 font-bold uppercase tracking-widest text-white rounded-lg transition-all flex items-center justify-center gap-2 ${status === 'submitting'
                                                ? 'bg-stone-400 cursor-not-allowed'
                                                : 'bg-alpine-600 hover:bg-alpine-500 shadow-lg hover:shadow-xl hover:-translate-y-px'
                                                }`}
                                        >
                                            {status === 'submitting' ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Enviant...
                                                </>
                                            ) : (
                                                'Confirmar Inscripció'
                                            )}
                                        </button>
                                        <p className="text-xs text-center text-stone-400 mt-2">
                                            Les teves dades es tractaran amb confidencialitat per gestionar l'esdeveniment.
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
