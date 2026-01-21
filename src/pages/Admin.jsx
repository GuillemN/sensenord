import React, { useState, useEffect } from 'react';
import { Lock, Loader2, Download, Table } from 'lucide-react';
import { motion } from 'framer-motion';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Simple client-side check. In a real app, use Auth0 or Firebase.
    const CORRECT_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'alpina2026';
    const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            setIsAuthenticated(true);
            fetchData();
        } else {
            alert('Contrasenya incorrecta');
        }
    };

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        if (!SCRIPT_URL) {
            // Mock data for demo
            setTimeout(() => {
                setData([
                    { timestamp: '15/02/2026 10:30', name: 'Joan Garcia', email: 'joan@exemple.com', phone: '666111222', event: "Taller d'Escalada", comments: '-' },
                    { timestamp: '15/02/2026 11:15', name: 'Anna Martí', email: 'anna@exemple.com', phone: '376333444', event: "Gala Benèfica", comments: 'Vegetariana' },
                ]);
                setLoading(false);
            }, 1000);
            return;
        }

        try {
            const response = await fetch(`${SCRIPT_URL}?action=read`);
            const result = await response.json();
            if (result.status === 'success') {
                const processedData = result.data.map(item => {
                    // Try to parse date, fallback to original string if invalid
                    const date = new Date(item.timestamp);
                    const formattedDate = !isNaN(date.getTime())
                        ? date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
                        : item.timestamp || '-';

                    return { ...item, timestamp: formattedDate };
                });
                setData(processedData);
            } else {
                throw new Error('Error fetching data');
            }
        } catch (err) {
            setError('Error connectant amb Google Sheets. Comprova la URL.');
        } finally {
            setLoading(false);
        }
    };

    // Extract unique events for the filter
    const uniqueEvents = ['all', ...new Set(data.map(item => item.event).filter(Boolean))];

    const filteredData = data.filter(item => {
        // Filter out empty rows (junk data)
        if (!item.name && !item.event) return false;

        const matchesEvent = selectedEvent === 'all' || item.event === selectedEvent;
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = (item.name || '').toLowerCase().includes(searchLower) ||
            (item.email || '').toLowerCase().includes(searchLower);

        return matchesEvent && matchesSearch;
    });

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 bg-alpine-100 rounded-full flex items-center justify-center">
                            <Lock className="w-6 h-6 text-alpine-600" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-center text-stone-800 mb-6 uppercase tracking-widest">Àrea de Gestió</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contrasenya..."
                            className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-alpine-500 outline-none"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="w-full bg-alpine-900 text-white font-bold py-3 rounded-lg hover:bg-alpine-800 transition-colors"
                        >
                            Entrar
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-display font-bold text-stone-900">Inscripcions Rebudes</h1>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Buscar per nom o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 px-4 py-2 border border-stone-200 rounded-lg text-sm font-medium text-stone-700 bg-white focus:border-alpine-500 outline-none transition-all"
                        />

                        <select
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className="px-4 py-2 border border-stone-200 rounded-lg text-sm font-medium text-stone-700 bg-white focus:border-alpine-500 outline-none cursor-pointer"
                        >
                            <option value="all">Tots els esdeveniments</option>
                            {uniqueEvents.filter(e => e !== 'all').map(event => (
                                <option key={event} value={event}>{event}</option>
                            ))}
                        </select>

                        <button
                            onClick={fetchData}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm font-bold text-stone-600 hover:bg-stone-50 transition-colors"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                            Actualitzar
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-100 text-red-800 rounded-lg mb-6 max-w-2xl">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-stone-50 border-b border-stone-200">
                                    <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Data</th>
                                    <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Nom</th>
                                    <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Contacte</th>
                                    <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Esdeveniment</th>
                                    <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Notes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {filteredData.map((row, i) => (
                                    <tr key={i} className="hover:bg-stone-50 transition-colors">
                                        <td className="p-4 text-sm text-stone-600 font-mono">{row.timestamp}</td>
                                        <td className="p-4 text-sm font-bold text-stone-800">{row.name}</td>
                                        <td className="p-4 text-sm text-stone-600">
                                            <div>{row.email}</div>
                                            <div className="text-stone-400 text-xs">{row.phone}</div>
                                        </td>
                                        <td className="p-4 text-sm text-alpine-700 font-medium">{row.event}</td>
                                        <td className="p-4 text-sm text-stone-500 italic max-w-xs truncate" title={row.comments}>
                                            {row.comments || '-'}
                                        </td>
                                    </tr>
                                ))}
                                {filteredData.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center text-stone-400">
                                            {data.length > 0 ? 'No hi ha inscripcions per a aquest filtre.' : 'Encara no hi ha inscripcions.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
