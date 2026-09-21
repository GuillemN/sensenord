import React, { useState, useEffect } from 'react';
import { Lock, Loader2, Download, Table, Trash2, Plus, RefreshCw, CheckCircle, Search, Filter, ShieldCheck, Mail, Phone, User, FileSpreadsheet, AlertCircle, MessageSquare, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import { getStoredRegistrations, deleteRegistrationFromStorage, saveRegistrationToStorage, exportToCSV, getDeletedRegistrationIds } from '../services/registrationService';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

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

        const deletedSet = new Set(getDeletedRegistrationIds().map(String));

        // 1. Get local storage registrations
        const localList = (Array.isArray(getStoredRegistrations()) ? getStoredRegistrations() : [])
            .filter(item => item && !deletedSet.has(String(item.id)));

        // 2. Fetch remote Google Script if configured
        if (!SCRIPT_URL) {
            setData(localList);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${SCRIPT_URL}?action=read`);
            const result = await response.json();
            if (result && result.status === 'success' && Array.isArray(result.data)) {
                const processedData = result.data
                    .filter(Boolean)
                    .map((item, idx) => {
                        const date = new Date(item.timestamp || item.createdAt);
                        const formattedDate = !isNaN(date.getTime())
                            ? date.toLocaleDateString('ca-ES') + ' ' + date.toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' })
                            : String(item.timestamp || item.createdAt || '-');

                        return {
                            id: String(item.id || `REM-${idx + 1}`),
                            timestamp: formattedDate,
                            createdAt: formattedDate,
                            name: String(item.name || '-'),
                            email: String(item.email || '-'),
                            phone: String(item.phone || '-'),
                            dni: String(item.dni || '-'),
                            level: String(item.level || 'No especificat'),
                            emergencyContact: String(item.emergencyContact || '-'),
                            event: String(item.event || 'Via Ferrada Solidària'),
                            comments: String(item.comments || '-')
                        };
                    })
                    .filter(item => !deletedSet.has(String(item.id)));

                const mergedMap = new Map();
                localList.forEach(item => {
                    if (item && item.id) mergedMap.set(String(item.id), item);
                });
                processedData.forEach(item => {
                    if (item && item.id) mergedMap.set(String(item.id), item);
                });

                setData(Array.from(mergedMap.values()));
            } else {
                setData(localList);
            }
        } catch (err) {
            console.warn('Error connecting to Google Sheets:', err);
            setError('Nota: Mostrant inscripcions des de l\'emmagatzematge local (Google Sheet no connectat o enllaç pendent de desplegar).');
            setData(localList);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            window.addEventListener('sensenord_registration_added', fetchData);
            return () => {
                window.removeEventListener('sensenord_registration_added', fetchData);
            };
        }
    }, [isAuthenticated]);

    const handleDelete = async (id) => {
        if (window.confirm(`Segur que vols eliminar la inscripció ${id}?`)) {
            await deleteRegistrationFromStorage(id);
            fetchData();
        }
    };

    const handleAddTestRegistration = () => {
        const testId = `SN-VF2026-${Math.floor(10000 + Math.random() * 90000)}`;
        const testRecord = {
            id: testId,
            createdAt: new Date().toLocaleString('ca-ES'),
            event: 'Via Ferrada Solidària',
            name: 'Usuari de Prova Admin',
            email: 'prova.admin@sensenord.cat',
            phone: '+34 600 111 222',
            dni: '44555666Z',
            level: 'Intermedi',
            emergencyContact: 'Marta (Mare) - +34 666 555 444',
            comments: 'Té equip propi. Demana informació sobre el pàrquing.'
        };
        saveRegistrationToStorage(testRecord);
        fetchData();
    };

    const handleExport = () => {
        exportToCSV(filteredData);
    };

    const uniqueEvents = ['all', ...new Set((Array.isArray(data) ? data : []).map(item => String(item?.event || '')).filter(Boolean))];

    const stats = (Array.isArray(data) ? data : []).reduce((acc, item) => {
        if (!item || !item.event) return acc;
        const evKey = String(item.event);
        acc[evKey] = (acc[evKey] || 0) + 1;
        return acc;
    }, {});

    const filteredData = (Array.isArray(data) ? data : []).filter(item => {
        if (!item) return false;
        if (!item.name && !item.event) return false;

        const matchesEvent = selectedEvent === 'all' || String(item.event) === selectedEvent;
        const searchLower = String(searchTerm || '').toLowerCase();
        const matchesSearch =
            String(item.name || '').toLowerCase().includes(searchLower) ||
            String(item.email || '').toLowerCase().includes(searchLower) ||
            String(item.dni || '').toLowerCase().includes(searchLower) ||
            String(item.phone || '').toLowerCase().includes(searchLower) ||
            String(item.emergencyContact || '').toLowerCase().includes(searchLower) ||
            String(item.comments || '').toLowerCase().includes(searchLower) ||
            String(item.id || '').toLowerCase().includes(searchLower);

        return matchesEvent && matchesSearch;
    });

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm border border-stone-200"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 bg-alpine-100 text-alpine-700 rounded-2xl flex items-center justify-center shadow-inner">
                            <Lock className="w-7 h-7 text-alpine-800" />
                        </div>
                    </div>
                    <h2 className="text-xl font-display font-bold text-center text-stone-900 mb-2 uppercase tracking-wider">
                        Àrea d'Administració
                    </h2>
                    <p className="text-xs text-center text-stone-500 mb-6">
                        Gestió d'inscripcions i participants de Sense Nord.
                    </p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-stone-600 uppercase mb-1">Contrasenya de control</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Introdueix contrasenya..."
                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-alpine-500 focus:ring-2 focus:ring-alpine-200 outline-none text-sm transition-all"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-alpine-900 hover:bg-alpine-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
                        >
                            Entrar al Panell
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pt-28 pb-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <ShieldCheck className="w-5 h-5 text-emerald-600" />
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                                Gestió Oficial d'Inscripcions
                            </span>
                        </div>
                        <h1 className="text-3xl font-display font-bold text-stone-900">Inscripcions Rebudes</h1>
                        <p className="text-stone-500 text-xs mt-0.5">
                            Llistat complet de participants amb telèfon, DNI, contacte d'emergència i observacions.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        <button
                            onClick={handleExport}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                        >
                            <FileSpreadsheet className="w-4 h-4" />
                            Exportar a CSV (Excel)
                        </button>

                        <button
                            onClick={handleAddTestRegistration}
                            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                            title="Generar inscripció de prova"
                        >
                            <Plus className="w-4 h-4" />
                            Afegir Prova
                        </button>

                        <button
                            onClick={fetchData}
                            disabled={loading}
                            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-alpine-600' : ''}`} />
                            Actualitzar
                        </button>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 relative">
                        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                        <input
                            type="text"
                            placeholder="Cercar per nom, email, DNI, telèfon, emergència o observacions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:border-alpine-500 outline-none transition-all shadow-xs"
                        />
                    </div>

                    <div className="relative">
                        <Filter className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <select
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:border-alpine-500 outline-none cursor-pointer shadow-xs appearance-none"
                        >
                            <option value="all">Tots els esdeveniments</option>
                            {uniqueEvents.filter(e => e !== 'all').map(event => (
                                <option key={event} value={event}>{event}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl shadow-xs border border-stone-200">
                        <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Total Inscripcions</div>
                        <div className="text-3xl font-display font-bold text-alpine-950">{data.length}</div>
                    </div>
                    {Object.entries(stats).map(([event, count]) => (
                        <div key={event} className="bg-white p-5 rounded-2xl shadow-xs border border-stone-200">
                            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 truncate" title={event}>{event}</div>
                            <div className="text-3xl font-display font-bold text-amber-600">{count}</div>
                        </div>
                    ))}
                </div>

                {error && (
                    <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Main Data Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-stone-50 border-b border-stone-200">
                                    <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider min-w-[130px]">Codi / Data</th>
                                    <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider min-w-[160px]">Participant</th>
                                    <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider min-w-[110px]">DNI / NIF</th>
                                    <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider min-w-[170px]">Contacte & Mòbil</th>
                                    <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider min-w-[130px]">Nivell</th>
                                    <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider min-w-[170px]">Contacte d'Emergència</th>
                                    <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider min-w-[200px]">Observacions</th>
                                    <th className="p-4 text-xs font-bold text-stone-500 uppercase tracking-wider text-center">Accions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {filteredData.map((row, i) => (
                                    <tr key={row.id || i} className="hover:bg-stone-50/80 transition-colors">
                                        <td className="p-4 text-xs">
                                            <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block w-max mb-1">
                                                {row.id}
                                            </span>
                                            <span className="text-stone-400 font-mono text-[11px] block">{row.createdAt || row.timestamp}</span>
                                        </td>

                                        <td className="p-4">
                                            <div className="font-bold text-stone-900 text-sm">{row.name}</div>
                                            <span className="text-[11px] text-stone-400 font-mono block mt-0.5">{row.event}</span>
                                        </td>

                                        <td className="p-4 text-xs font-mono font-bold text-stone-800">
                                            <span className="bg-stone-100 px-2 py-1 rounded border border-stone-200 inline-block">
                                                {row.dni || 'N/D'}
                                            </span>
                                        </td>

                                        <td className="p-4 text-xs">
                                            <div className="font-medium text-alpine-800 flex items-center gap-1.5 mb-1" title={row.email}>
                                                <Mail className="w-3.5 h-3.5 text-alpine-600 flex-shrink-0" />
                                                <span className="truncate max-w-[150px]">{row.email}</span>
                                            </div>
                                            <div className="font-mono text-stone-800 font-bold flex items-center gap-1.5 bg-stone-50 px-2 py-0.5 rounded border border-stone-200 w-max">
                                                <Phone className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                                                <span>{row.phone || 'Sense telèfon'}</span>
                                            </div>
                                        </td>

                                        <td className="p-4 text-xs">
                                            <span className="px-2.5 py-1 bg-alpine-50 text-alpine-900 border border-alpine-200 rounded-lg font-semibold inline-block text-[11px]">
                                                {row.level || 'Sense especificar'}
                                            </span>
                                        </td>

                                        <td className="p-4 text-xs">
                                            {row.emergencyContact && String(row.emergencyContact) !== '-' && String(row.emergencyContact) !== 'No especificat' ? (
                                                <div className="flex items-start gap-1.5 bg-amber-50/80 border border-amber-200 text-amber-950 p-2 rounded-xl text-xs font-medium">
                                                    <HeartPulse className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                                                    <span>{String(row.emergencyContact)}</span>
                                                </div>
                                            ) : (
                                                <span className="text-stone-400 italic text-xs">No indicat</span>
                                            )}
                                        </td>

                                        <td className="p-4 text-xs">
                                            {row.comments && String(row.comments) !== '-' && String(row.comments).trim() !== '' ? (
                                                <div className="flex items-start gap-1.5 bg-slate-50 border border-slate-200 text-slate-800 p-2 rounded-xl text-xs max-w-xs">
                                                    <MessageSquare className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                                                    <span className="line-clamp-2" title={String(row.comments)}>{String(row.comments)}</span>
                                                </div>
                                            ) : (
                                                <span className="text-stone-300 italic text-xs">Sense observacions</span>
                                            )}
                                        </td>

                                        <td className="p-4 text-xs text-center">
                                            <button
                                                onClick={() => handleDelete(row.id)}
                                                className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                                title="Eliminar inscripció"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredData.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan="8" className="p-12 text-center text-stone-400 text-sm">
                                            {data.length > 0 ? 'No s\'han trobat inscripcions per als filtres actuals.' : 'Encara no hi ha cap inscripció registrada.'}
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
