import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Calendar, Sparkles } from 'lucide-react';

const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    const scrollToEvents = (e) => {
        e.preventDefault();
        const element = document.getElementById('events');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToProjects = (e) => {
        e.preventDefault();
        const element = document.getElementById('projects');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0 select-none"
            >
                <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2600&auto=format&fit=crop"
                    alt="Mont Blanc Snowy Peaks"
                    className="w-full h-full object-cover brightness-[0.75] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-alpine-950 via-alpine-900/40 to-black/30" />
            </motion.div>

            <motion.div
                style={{ opacity }}
                className="container relative z-10 px-6 text-center text-white mt-12"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Featured Event Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 backdrop-blur-md mb-6 shadow-lg animate-pulse">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                            🔥 10 d'Octubre de 2026 • Sant Feliu de Guíxols
                        </span>
                    </div>

                    <div className="mb-8 flex justify-center w-full">
                        <img
                            src="/logo.png"
                            alt="Sense Nord"
                            className="w-full max-w-3xl h-auto brightness-0 invert drop-shadow-[0_0_25px_rgba(0,0,0,0.6)] opacity-100 object-contain"
                        />
                    </div>
                    
                    <p className="font-sans text-xl md:text-2xl font-light text-slate-100 max-w-2xl mx-auto leading-relaxed opacity-100 mb-10 drop-shadow-lg">
                        Escalada, alpinisme i solidaritat. <br className="hidden md:block" />
                        Fent camí cap a un món més elevat.
                    </p>

                    {/* Navigation Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="#events"
                            onClick={scrollToEvents}
                            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-display font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 via-amber-600 to-alpine-600 hover:from-amber-600 hover:to-alpine-700 rounded-2xl shadow-xl shadow-amber-500/20 border border-amber-300/40 transition-all duration-300 hover:scale-105"
                        >
                            <Calendar className="w-5 h-5 mr-2.5 text-amber-200 group-hover:scale-110 transition-transform duration-300" />
                            <span>Veure Esdeveniments</span>
                        </a>
                        <a
                            href="#projects"
                            onClick={scrollToProjects}
                            className="w-full sm:w-auto px-7 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-alpine-950 text-white font-display font-bold text-base uppercase tracking-wider transition-all duration-300 rounded-2xl"
                        >
                            Veure Projectes
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.a
                href="#events"
                onClick={scrollToEvents}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 cursor-pointer hover:text-white transition-colors z-20"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                aria-label="Scroll down"
            >
                <ArrowDown className="w-8 h-8 drop-shadow-md" strokeWidth={1.5} />
            </motion.a>
        </section>
    );
};

export default Hero;
