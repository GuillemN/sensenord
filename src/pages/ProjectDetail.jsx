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

        // Load Instagram embed script
        const scriptId = 'instagram-embed-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = '//www.instagram.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
        } else {
            // If script is already loaded, re-process the embeds
            if (window.instgrm) {
                window.instgrm.Embeds.process();
            }
        }
    }, [project]);

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

                        <div dangerouslySetInnerHTML={{ __html: project.fullContent || `<p>${project.description}</p>` }} />
                    </div>
                </motion.div>
            </div>
        </motion.article>
    );
};

export default ProjectDetail;
