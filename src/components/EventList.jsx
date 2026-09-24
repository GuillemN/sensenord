import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight, Users, Sparkles, ShieldCheck } from 'lucide-react';
import EventModal from './EventModal';
import { INITIAL_EVENTS, VIA_FERRADA_EVENT } from '../data/eventsData';
import { getStoredRegistrations } from '../services/registrationService';

const EventList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [registrationCounts, setRegistrationCounts] = useState({});

    const updateCounts = () => {
        const localData = getStoredRegistrations();
        const counts = {};
        localData.forEach(item => {
            const evTitle = item.event;
            if (evTitle) {
                counts[evTitle] = (counts[evTitle] || 0) + 1;
            }
        });
        setRegistrationCounts(counts);
    };

    useEffect(() => {
        updateCounts();
        window.addEventListener('sensenord_registration_added', updateCounts);
        return () => {
            window.removeEventListener('sensenord_registration_added', updateCounts);
        };
    }, []);

    const handleRegister = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    return (
        <section id="events" className="py-24 bg-stone-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-alpine-100 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/3" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-alpine-100 text-alpine-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-alpine-600" />
                            Agenda d'Activitats 2026
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-alpine-950 uppercase">Propers Esdeveniments</h2>
                        <p className="text-lg text-stone-600 font-light mt-2">
                            Participa en les nostres jornades d'escalada, gastronomia i solidaritat.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {INITIAL_EVENTS.map((event) => {
                        const count = registrationCounts[event.title] || 0;
                        const isHighlight = event.id === VIA_FERRADA_EVENT.id;

                        return (
                            <div
                                key={event.id}
                                className={`group flex flex-col md:flex-row items-stretch bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isHighlight
                                        ? 'border-amber-400 shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/20'
                                        : 'border-stone-200 hover:border-alpine-400 hover:shadow-lg'
                                    }`}
                            >
                                {/* Date Box */}
                                <div className={`p-6 md:w-36 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r transition-colors ${isHighlight
                                        ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-white border-amber-600'
                                        : 'bg-stone-50 border-stone-100 group-hover:bg-alpine-50'
                                    }`}>
                                    <span className={`text-xs font-bold uppercase tracking-widest ${isHighlight ? 'text-amber-100' : 'text-stone-400'}`}>{event.year}</span>
                                    <span className={`text-5xl font-display font-bold leading-none my-1 ${isHighlight ? 'text-white' : 'text-alpine-600'}`}>{event.date}</span>
                                    <span className={`text-xs font-bold uppercase tracking-widest ${isHighlight ? 'text-amber-100' : 'text-alpine-950'}`}>{event.month}</span>
                                </div>

                                {/* Info */}
                                <div className="p-6 md:p-8 flex-grow flex flex-col justify-center">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        {isHighlight && (
                                            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-md text-[11px] font-bold uppercase tracking-wider">
                                                ★ Esdeveniment Destacat
                                            </span>
                                        )}
                                        {event.limitedSpots && (
                                            <span className="px-2.5 py-0.5 bg-red-100 text-red-800 border border-red-200 rounded-md text-[11px] font-bold uppercase tracking-wider">
                                                ⚠️ Places Limitades
                                            </span>
                                        )}
                                        <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest">{event.subtitle}</span>
                                    </div>

                                    <h3 className="text-2xl font-display font-bold text-stone-900 mb-2 group-hover:text-alpine-800 transition-colors">
                                        {event.title}
                                    </h3>

                                    <p className="text-sm text-stone-600 mb-3 line-clamp-2">
                                        {event.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 font-mono mb-1">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-alpine-500" /> {event.time}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4 text-alpine-500" /> {event.location}
                                        </span>
                                        {event.price && (
                                            <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                                Preu: {event.price}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="p-6 md:w-56 flex flex-col items-center justify-center gap-3 border-t md:border-t-0 md:border-l border-stone-100 bg-stone-50/50">
                                    <button
                                        onClick={() => handleRegister(event)}
                                        disabled={event.status !== 'Obert'}
                                        className={`w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${event.status === 'Obert'
                                                ? isHighlight
                                                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20 hover:scale-105'
                                                    : 'bg-alpine-600 hover:bg-alpine-700 text-white hover:scale-105'
                                                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {event.status === 'Obert' ? 'Inscriu-te ara' : 'Properament'}
                                        {event.status === 'Obert' && <ArrowRight className="w-4 h-4" />}
                                    </button>

                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 bg-white border border-stone-200 px-3 py-1 rounded-full shadow-2xs">
                                        <Users className="w-3.5 h-3.5 text-alpine-600" />
                                        <span>{count} inscrits</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={selectedEvent}
            />
        </section>
    );
};

export default EventList;
