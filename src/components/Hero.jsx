import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

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
                <div className="absolute inset-0 bg-gradient-to-t from-alpine-950 via-alpine-900/20 to-transparent opacity-60" />
            </motion.div>

            <motion.div
                style={{ opacity }}
                className="container relative z-10 px-6 text-center text-white mt-16"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >

                    <div className="mb-12 flex justify-center w-full">
                        <img
                            src="/logo.png"
                            alt="Sense Nord"
                            className="w-full max-w-4xl h-auto brightness-0 invert drop-shadow-[0_0_25px_rgba(0,0,0,0.6)] opacity-100 object-contain"
                        />
                    </div>
                    <p className="font-sans text-xl md:text-2xl font-light text-slate-100 max-w-2xl mx-auto leading-relaxed opacity-100 mb-12 drop-shadow-lg">
                        Escalada, alpinisme i solidaritat. <br className="hidden md:block" />
                        Fent camí cap a un món més elevat.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <a
                            href="#projects"
                            onClick={scrollToProjects}
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white hover:text-alpine-950 text-white font-display font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 shadow-lg"
                        >
                            Veure Projectes
                        </a>
                        <a
                            href="#events"
                            className="px-8 py-4 bg-alpine-600/90 hover:bg-alpine-500 text-white font-display font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-alpine-900/40"
                        >
                            Agenda 2026
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.a
                href="#projects"
                onClick={scrollToProjects}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 cursor-pointer hover:text-white transition-colors z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                aria-label="Scroll down"
            >
                <ArrowDown className="w-10 h-10 drop-shadow-md" strokeWidth={1.5} />
            </motion.a>
        </section>
    );
};

export default Hero;
