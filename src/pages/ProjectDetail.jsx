import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowLeft, Calendar, MapPin, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return <div className="h-screen flex items-center justify-center">Projecte no trobat.</div>;
    }

    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-50 min-h-screen pb-20"
        >
            {/* Header Image */}
            <div className="relative h-[60vh] md:h-[70vh]">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white container mx-auto max-w-4xl">
                    <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 uppercase tracking-widest text-xs font-bold transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Tornar a l'inici
                    </Link>
                    <div className="flex items-center gap-4 text-white font-mono text-sm font-bold uppercase tracking-widest mb-4">
                        <span>{project.category}</span>
                        <span>•</span>
                        <span>{project.year}</span>
                    </div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase leading-none mb-4 text-white"
                    >
                        {project.title}
                    </motion.h1>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 max-w-3xl -mt-10 relative z-10">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-8 md:p-12 shadow-xl border border-stone-100"
                >
                    <div className="prose prose-lg prose-stone max-w-none font-sans text-stone-600 prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-alpine-950 prose-a:text-alpine-600 hover:prose-a:text-alpine-800">
                        {/* We verify content is safe or use a parser. For now, we render raw HTML if needed or just text. 
                             Since fullContent contains JSX-like strings in valid JS, we need to handle it.
                             Ideally we would use a markdown parser. For this demo, I will conditionally render the JSX structure.
                         */}

                        {project.id === 1 ? (
                            <>
                                <p className="lead text-xl font-light mb-8 text-stone-900">Un viatge èpic des de la sorra del Mediterrani fins al cim més alt d'Europa occidental. 30 dies de superació, connexió amb la natura i solidaritat.</p>

                                <h3 className="text-2xl font-bold mb-4 font-display uppercase text-alpine-950 mt-12">El Repte</h3>
                                <p className="mb-6">Caminar des del nivell del mar (0m) fins als 4.809m del Mont Blanc és més que una fita física; és un símbol de com, pas a pas, podem assolir qualsevol cim que ens proposem. Aquesta travessa va unir dues de les nostres grans passions: el mar i la muntanya.</p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 not-prose">
                                    <div className="bg-stone-50 p-6 border border-stone-200 text-center">
                                        <span className="block text-4xl font-display font-bold text-alpine-600 mb-2">30</span>
                                        <span className="text-sm uppercase tracking-widest text-stone-500 font-bold">Dies de travessa</span>
                                    </div>
                                    <div className="bg-stone-50 p-6 border border-stone-200 text-center">
                                        <span className="block text-4xl font-display font-bold text-alpine-600 mb-2">938</span>
                                        <span className="text-sm uppercase tracking-widest text-stone-500 font-bold">Kilòmetres</span>
                                    </div>
                                    <div className="bg-stone-50 p-6 border border-stone-200 text-center">
                                        <span className="block text-4xl font-display font-bold text-alpine-600 mb-2">1.3M</span>
                                        <span className="text-sm uppercase tracking-widest text-stone-500 font-bold">Passes</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-4 font-display uppercase text-alpine-950">La Ruta</h3>
                                <p className="mb-6">El camí va començar a la platja Gran de Tossa de Mar. Creuant les Gavarres, el Montseny, i endinsant-nos als Pirineus. Després, la llarga travessa pel sud de França fins a arribar als Alps. Cada etapa va ser una descoberta: nous paisatges, noves persones i nous reptes interns.</p>

                                <p>Aquest projecte ha estat possible gràcies al suport de tots els col·laboradors i patrocinadors que han cregut en la causa de Sense Nord.</p>
                            </>
                        ) : (
                            <p>{project.description}</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.article>
    );
};

export default ProjectDetail;
