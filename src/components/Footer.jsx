import React from 'react';
import { Instagram, Mail, Mountain, ArrowUp } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-alpine-950 text-white pt-20 pb-10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid md:grid-cols-4 gap-12 mb-16 border-b border-alpine-800 pb-16">
                    <div className="col-span-1 md:col-span-2">
                        <p className="text-slate-400 max-w-sm mb-8 font-light leading-relaxed">
                            Més que una marca, una filosofia. Grimpant per un món més just i solidari, pas a pas, cim a cim.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/xaviimoron/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded bg-alpine-900 flex items-center justify-center text-slate-400 hover:bg-alpine-600 hover:text-white transition-all">
                                <Instagram className="w-5 h-5" strokeWidth={1.5} />
                            </a>
                            <a href="mailto:xavimoron@gmail.com" className="w-10 h-10 rounded bg-alpine-900 flex items-center justify-center text-slate-400 hover:bg-alpine-600 hover:text-white transition-all">
                                <Mail className="w-5 h-5" strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-mono text-alpine-400 text-sm font-bold uppercase tracking-widest mb-6">Explora</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li>
                                <a
                                    href="#hero"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <ArrowUp className="w-3 h-3 rotate-45" /> Inici
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#projects"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <ArrowUp className="w-3 h-3 rotate-45" /> Projectes
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#events"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <ArrowUp className="w-3 h-3 rotate-45" /> Agenda
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-mono text-alpine-400 text-sm font-bold uppercase tracking-widest mb-6">Contacte</h4>
                        <ul className="space-y-4 text-slate-400 text-sm font-light">
                            <li>Barcelona, Catalunya</li>
                            <li>xavimoron@gmail.com</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} Sense Nord. All rights reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacitat</a>
                        <a href="#" className="hover:text-white transition-colors">Termes</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
