import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const events = [
    {
        id: 1,
        title: "Taller d'Escalada Inclusiva",
        date: "15",
        month: "FEB",
        year: "2026",
        location: "Rocòdrom Municipal, BCN",
        time: "09:00h - 14:00h",
        status: "Obert"
    },
    {
        id: 2,
        title: "Gala Benèfica Sense Nord",
        date: "20",
        month: "MAR",
        year: "2026",
        location: "Sala Apolo, BCN",
        time: "19:00h - 23:00h",
        status: "Aviat"
    }
];

const EventList = () => {
    return (
        <section id="events" className="py-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-alpine-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-5xl md:text-6xl font-display font-bold text-alpine-950 uppercase mb-6">Properes Fites</h2>
                        <p className="text-xl text-stone-600 font-light">
                            Uneix-te a la cordada. La teva participació és el que ens fa arribar més amunt.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event.id} className="group flex flex-col md:flex-row items-stretch bg-stone-50 border border-stone-200 hover:border-alpine-400 hover:shadow-lg hover:shadow-alpine-100 transition-all duration-300">
                            {/* Date Box */}
                            <div className="bg-white p-6 md:w-32 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-stone-100 group-hover:bg-alpine-50 transition-colors">
                                <span className="text-sm font-bold text-stone-400">{event.year}</span>
                                <span className="text-4xl font-display font-bold text-alpine-600 leading-none my-1">{event.date}</span>
                                <span className="text-sm font-bold text-alpine-900 uppercase tracking-widest">{event.month}</span>
                            </div>

                            {/* Info */}
                            <div className="p-8 flex-grow flex flex-col justify-center">
                                <h3 className="text-2xl font-display font-bold text-stone-800 mb-2 group-hover:text-alpine-800 transition-colors">{event.title}</h3>
                                <div className="flex flex-wrap gap-6 text-sm text-stone-500 font-mono">
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-alpine-500" /> {event.time}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-alpine-500" /> {event.location}
                                    </span>
                                </div>
                            </div>

                            {/* Action */}
                            <div className="p-6 md:w-48 flex items-center justify-center border-t md:border-t-0 md:border-l border-stone-100 bg-white">
                                <button className={`flex items-center gap-2 font-bold uppercase tracking-wider text-sm transition-all ${event.status === 'Obert'
                                    ? 'text-alpine-600 hover:gap-4'
                                    : 'text-stone-300 cursor-not-allowed'
                                    }`}>
                                    {event.status === 'Obert' ? 'Inscriu-te' : 'Properament'}
                                    {event.status === 'Obert' && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventList;
