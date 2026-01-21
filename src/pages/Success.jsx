import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen relative flex items-center justify-center pt-20 pb-12 px-6"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/mountains.png"
                    alt="Muntanya de fons"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-alpine-950/40 backdrop-blur-[1px]"></div>
            </div>

            <div className="relative z-10 max-w-lg w-full bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-stone-100 text-center">
                <div className="mx-auto bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 text-emerald-600">
                    <CheckCircle className="w-10 h-10" />
                </div>

                <h1 className="text-3xl md:text-4xl font-display font-bold text-alpine-900 uppercase mb-4">Missatge Enviat!</h1>

                <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                    Gràcies per contactar amb mi. He rebut el teu missatge correctament i et respondré el més aviat possible.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-alpine-600 text-white font-bold py-3 px-8 rounded-full hover:bg-alpine-800 transition-colors uppercase tracking-wider text-sm"
                >
                    <Home className="w-4 h-4" /> Tornar a l'inici
                </Link>
            </div>
        </motion.div>
    );
};

export default Success;
