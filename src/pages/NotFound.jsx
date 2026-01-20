import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, ArrowLeft, CloudFog } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-6"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative mb-8"
            >
                <div className="relative">
                    <Mountain className="w-40 h-40 text-stone-200" strokeWidth={1} />
                    <CloudFog className="absolute bottom-0 -right-4 w-24 h-24 text-alpine-200/80 animate-pulse" strokeWidth={1.5} />
                </div>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-display font-bold text-alpine-900">404</span>
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-6xl font-display font-bold text-alpine-950 uppercase mb-4"
            >
                T'has perdut a la boira?
            </motion.h1>
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-stone-500 max-w-md mx-auto mb-12 font-light text-lg"
            >
                Sembla que t'has desviat del camí marcat. Aquesta ruta no apareix als nostres mapes topogràfics.
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-alpine-900 text-white font-display font-bold uppercase tracking-widest hover:bg-alpine-800 transition-colors shadow-lg hover:-translate-y-1 duration-300">
                    <ArrowLeft className="w-4 h-4" /> Tornar al Camp Base
                </Link>
            </motion.div>
        </motion.section>
    );
};

export default NotFound;
