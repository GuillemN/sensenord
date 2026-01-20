import React from 'react';
import Hero from '../components/Hero';
import ProjectList from '../components/ProjectList';
import EventList from '../components/EventList';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            <ProjectList />
            <EventList />
        </motion.div>
    );
};

export default Home;
