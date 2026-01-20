import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll Spy Logic
      const sections = ['hero', 'projects', 'events'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Active when top of section is within upper half of viewport
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inici', href: '/#hero', id: 'hero' },
    { name: 'Projectes', href: '/#projects', id: 'projects' },
    { name: 'Esdeveniments', href: '/#events', id: 'events' },
  ];

  const scrollToSection = (e, id) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-md' : 'py-6 bg-transparent'
      }`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 md:px-12">
        <Link to="/" className="flex items-center gap-2 group">

        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.id)}
              className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 border-b-2 ${activeSection === link.id
                ? (scrolled ? 'text-alpine-600 border-alpine-600' : 'text-white border-white')
                : 'border-transparent ' + (scrolled ? 'text-slate-600 hover:text-alpine-600' : 'text-slate-300 hover:text-white')
                }`}
            >
              {link.name}
            </a>
          ))}
          <span
            className="text-xs font-bold uppercase tracking-widest text-slate-300 border border-slate-300 px-3 py-1 rounded"
            title="Pròximament"
          >
            Botiga
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 transition-colors ${scrolled ? 'text-alpine-950' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X strokeWidth={1.5} className="text-alpine-950" /> : <Menu strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 h-screen z-40"
          >
            <div className="container flex flex-col py-12 gap-8 items-center justify-center h-3/4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-display font-bold uppercase text-alpine-950 hover:text-alpine-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="text-sm text-gray-400 mt-8 font-mono uppercase tracking-widest">
                Botiga (Coming Soon)
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
