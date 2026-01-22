import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Heart, Users } from 'lucide-react';

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 pb-12 min-h-screen relative"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/mountains.png"
                    alt="Muntanya i bosc"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-alpine-950/40 backdrop-blur-[1px]"></div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white uppercase mb-6 drop-shadow-lg">Qui Som</h1>
                    <p className="text-xl text-stone-200 font-light max-w-2xl mx-auto drop-shadow-md">
                        Més que una marca, som una filosofia de vida. Grimpant per un món més just i solidari.
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-white p-8 md:p-12 shadow-xl border border-stone-100 space-y-12">

                    {/* Mission */}
                    <section>
                        <h2 className="text-3xl font-display font-bold text-alpine-900 uppercase mb-6 border-l-4 border-alpine-500 pl-4">La Nostra Missió</h2>
                        <p className="text-lg text-stone-600 leading-relaxed mb-6">
                            Sense Nord va néixer amb un objectiu clar: utilitzar la nostra passió per la natura i l'aventura com a motor de canvi social. Volem trencar barreres, tant físiques com mentals, i demostrar que amb esforç i equip, cap cim és impossible.
                        </p>
                    </section>

                    {/* Values Grid */}
                    <section className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-stone-50 rounded-lg">
                            <div className="bg-alpine-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-alpine-600">
                                <Mountain className="w-8 h-8" />
                            </div>
                            <h3 className="font-display font-bold text-lg uppercase mb-2">Aventura</h3>
                            <p className="text-sm text-stone-500">Busquem reptes que ens posin a prova i ens connectin amb l'entorn.</p>
                        </div>
                        <div className="text-center p-6 bg-stone-50 rounded-lg">
                            <div className="bg-alpine-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-alpine-600">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="font-display font-bold text-lg uppercase mb-2">Solidaritat</h3>
                            <p className="text-sm text-stone-500">Cada passa compta. Els nostres projectes tenen sempre un rerefons social.</p>
                        </div>
                        <div className="text-center p-6 bg-stone-50 rounded-lg">
                            <div className="bg-alpine-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-alpine-600">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="font-display font-bold text-lg uppercase mb-2">Comunitat</h3>
                            <p className="text-sm text-stone-500">No caminem sols. Creiem en la força del grup i la inclusió.</p>
                        </div>
                    </section>

                    {/* Origin Story */}
                    <section>
                        <h2 className="text-3xl font-display font-bold text-alpine-900 uppercase mb-6 border-l-4 border-alpine-500 pl-4">Origen</h2>
                        <p className="text-lg text-stone-600 leading-relaxed">
                            Tot va començar amb un repte personal: unir el mar i la muntanya en una sola línia. De Tossa de Mar al Mont Blanc. Aquest viatge de 30 dies no només va ser una fita esportiva, sinó la llavor que va fer germinar Sense Nord.
                        </p>
                    </section>

                    {/* Founder/Team Placeholder */}
                    <section className="bg-alpine-900 text-white p-8 -mx-8 -mb-12 mt-12 md:rounded-b-lg">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-32 h-32 bg-stone-200 rounded-full overflow-hidden shrink-0 border-4 border-white/20">
                                {/* Placeholder for Xavi's image if available later */}
                                <div className="w-full h-full flex items-center justify-center text-stone-400 font-bold bg-stone-800">XM</div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-display font-bold uppercase mb-2">Xavi Morón</h3>
                                <p className="text-alpine-200 uppercase tracking-widest text-sm font-bold mb-4">Fundador & Aventurer</p>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
