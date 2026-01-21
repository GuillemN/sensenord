import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const formData = new FormData(form);

        try {
            await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString(),
            });
            navigate('/success');
        } catch (error) {
            console.error('Submission error:', error);
            alert("Hi ha hagut un error en enviar el missatge. Si us plau, torna-ho a provar.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    alt="Muntanya de fons"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-alpine-950/40 backdrop-blur-[1px]"></div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white uppercase mb-6 drop-shadow-lg">Contacte</h1>
                    <p className="text-xl text-stone-200 font-light max-w-2xl mx-auto drop-shadow-md">
                        Tens algun dubte o proposta? Vull saber-ne més. Escriu-me i parlem.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 shadow-xl border border-stone-100 items-start">

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-2xl font-display font-bold text-alpine-900 uppercase mb-8">Informació</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-alpine-100 p-3 rounded-full text-alpine-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-stone-800 uppercase text-sm tracking-wider mb-1">Ubicació</h4>
                                    <p className="text-stone-600">Barcelona, Catalunya</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-alpine-100 p-3 rounded-full text-alpine-600">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-stone-800 uppercase text-sm tracking-wider mb-1">Email</h4>
                                    <a href="mailto:guillemnaba@gmail.com" className="text-stone-600 hover:text-alpine-600 transition-colors">guillemnaba@gmail.com</a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-stone-50 border border-stone-200">
                            <p className="text-stone-500 text-sm italic">
                                "La muntanya no és només un repte físic, és una escola de vida."
                            </p>
                        </div>
                    </div>

                    {/* Netlify Form */}
                    <div>
                        <h3 className="text-2xl font-display font-bold text-alpine-900 uppercase mb-8">Envia un missatge</h3>

                        <form
                            name="contact"
                            method="POST"
                            data-netlify="true"
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <input type="hidden" name="form-name" value="contact" />

                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-stone-500 uppercase tracking-wider mb-2">Nom</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full bg-stone-50 border border-stone-200 p-3 text-stone-800 focus:outline-none focus:border-alpine-500 transition-colors"
                                    placeholder="El teu nom"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-stone-500 uppercase tracking-wider mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full bg-stone-50 border border-stone-200 p-3 text-stone-800 focus:outline-none focus:border-alpine-500 transition-colors"
                                    placeholder="el-teu@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-stone-500 uppercase tracking-wider mb-2">Missatge</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows="4"
                                    className="w-full bg-stone-50 border border-stone-200 p-3 text-stone-800 focus:outline-none focus:border-alpine-500 transition-colors resize-none"
                                    placeholder="Explica'm la teva idea..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-alpine-600 text-white font-bold py-4 uppercase tracking-widest hover:bg-alpine-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>Enviant <Loader2 className="w-4 h-4 animate-spin" /></>
                                ) : (
                                    <>Enviar Missatge <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
