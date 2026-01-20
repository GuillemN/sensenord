import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Trophy, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectItem = ({ project, index, isDragging }) => {
    const handleClick = (e) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div className="min-w-[85vw] md:min-w-[500px] lg:min-w-[600px] snap-center">
            <Link
                to={`/project/${project.id}`}
                className="block h-full group"
                onClick={handleClick}
                draggable="false"
            >
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="flex flex-col h-full bg-white border border-stone-200 hover:border-alpine-500 transition-colors duration-300 select-none"
                >
                    <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter saturate-50 group-hover:saturate-100 pointer-events-none"
                        />
                        <div className="absolute bottom-4 left-4">
                            <span className="bg-alpine-900 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                                {project.year}
                            </span>
                        </div>
                    </div>

                    <div className="p-8 flex-grow flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-3xl font-display font-bold uppercase text-stone-800 group-hover:text-alpine-700 transition-colors leading-none">
                                {project.title}
                            </h3>
                        </div>

                        <div className="flex items-center gap-6 mb-6 text-sm font-mono text-stone-500 border-b border-stone-100 pb-4">
                            <span className="flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-alpine-500" />
                                {project.category}
                            </span>
                            <span className="w-px h-4 bg-stone-300"></span>
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-alpine-500" />
                                {project.stat}
                            </span>
                        </div>

                        <p className="text-stone-600 text-lg leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                </motion.div>
            </Link>
        </div>
    );
};

const ProjectList = () => {
    const scrollRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Drag state
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftState, setScrollLeftState] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
            setScrollProgress(isNaN(progress) ? 0 : Math.min(100, Math.max(0, progress)));
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // buffer of 10px
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -600 : 600;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') scroll('left');
        if (e.key === 'ArrowRight') scroll('right');
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeftState(scrollRef.current.scrollLeft);
        setDragDistance(0);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        // If snap behavior was disabled during drag, it will re-enable 
        // automatically when the class is added back
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll-fast multiplier
        setDragDistance(Math.abs(walk));
        scrollRef.current.scrollLeft = scrollLeftState - walk;
    };

    return (
        <section id="projects" className="py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
                    <div>
                        <span className="font-mono text-alpine-600 text-sm font-bold tracking-widest uppercase block mb-2">Expedicions & Accions</span>
                        <h2 className="text-5xl md:text-6xl font-display font-bold text-stone-900 uppercase">Projectes</h2>
                    </div>

                    <div className="flex gap-4 self-end">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`p-3 border rounded-full transition-all duration-300 ${canScrollLeft
                                ? 'border-stone-300 hover:border-alpine-600 hover:text-alpine-600 cursor-pointer'
                                : 'border-stone-200 text-stone-300 cursor-not-allowed'
                                }`}
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`p-3 border rounded-full transition-all duration-300 ${canScrollRight
                                ? 'border-stone-300 hover:border-alpine-600 hover:text-alpine-600 cursor-pointer'
                                : 'border-stone-200 text-stone-300 cursor-not-allowed'
                                }`}
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative">
                {/* Left Gradient Overlay - Shows when scrolling right is possible */}
                <div
                    className={`absolute left-0 top-0 bottom-12 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'
                        }`}
                />

                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    onKeyDown={handleKeyDown}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    tabIndex={0}
                    className={`flex overflow-x-auto gap-8 pb-12 no-scrollbar px-6 w-full outline-none focus:ring-2 focus:ring-alpine-500/20 rounded-xl transition-all ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab snap-x snap-mandatory'
                        }`}
                >
                    {projects.map((project, index) => (
                        <ProjectItem
                            key={project.id}
                            project={project}
                            index={index}
                            isDragging={dragDistance > 5} // Logic to prevent click if dragged more than 5px
                        />
                    ))}
                </div>

                {/* Right Gradient Overlay - Shows when scrolling left is possible */}
                <div
                    className={`absolute right-0 top-0 bottom-12 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'
                        }`}
                />
            </div>

            {/* Progress Bar */}
            <div className="container mx-auto px-6 max-w-7xl mt-4">
                <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-alpine-600 transition-all duration-300 ease-out"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProjectList;
