import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/shop';
import { ShoppingBag, ArrowRight, AlertCircle, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Shop = () => {
    // State to hold quantity for each product: { [id]: number }
    const [quantities, setQuantities] = useState({});

    const updateQuantity = (id, delta) => {
        setQuantities(prev => {
            const current = prev[id] || 1;
            const newQty = Math.max(1, current + delta);
            return { ...prev, [id]: newQty };
        });
    };

    const getQty = (id) => quantities[id] || 1;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 min-h-screen bg-stone-50"
        >
            {/* Header */}
            <section className="bg-white border-b border-stone-100 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-6 uppercase">
                            La Botiga <span className="text-alpine-600">Solidària</span>
                        </h1>
                        <p className="text-xl text-stone-600 font-light leading-relaxed">
                            Cada compra és una aportació directa als nostres projectes.
                            Equipa't amb sentit i ajuda'ns a seguir sumant metres i causes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                whileHover={{ y: -5 }}
                                className="group bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                            >
                                {/* Image Area */}
                                {product.stock ? (
                                    <Link to={`/checkout?product=${product.id}&qty=${getQty(product.id)}`}>
                                        <div className="h-64 bg-stone-100 relative overflow-hidden flex items-center justify-center cursor-pointer">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Overlay gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="h-64 bg-stone-100 relative overflow-hidden flex items-center justify-center grayscale opacity-80">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}


                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="mb-4">
                                        {product.stock ? (
                                            <Link to={`/checkout?product=${product.id}&qty=${getQty(product.id)}`}>
                                                <h3 className="text-2xl font-display font-bold text-stone-900 mb-2 uppercase group-hover:text-alpine-700 transition-colors cursor-pointer">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                        ) : (
                                            <h3 className="text-2xl font-display font-bold text-stone-500 mb-2 uppercase">
                                                {product.name}
                                            </h3>
                                        )}

                                        <p className="text-stone-600 text-sm leading-relaxed mb-4">
                                            {product.description}
                                        </p>

                                        {/* Features tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {product.features.map((feature, idx) => (
                                                <span key={idx} className="text-xs font-bold uppercase tracking-wider text-stone-400 bg-stone-50 px-2 py-1 rounded-sm border border-stone-100">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-stone-100">
                                        {product.stock ? (
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-end justify-between">
                                                    <div>
                                                        <span className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Preu Total</span>
                                                        <span className="text-3xl font-display font-bold text-alpine-600">
                                                            {(product.price * getQty(product.id)).toFixed(2)}€
                                                        </span>
                                                        {getQty(product.id) > 1 && (
                                                            <span className="block text-xs text-stone-400">({product.price}€ / ut)</span>
                                                        )}
                                                    </div>

                                                    {/* Qty Selector on Card */}
                                                    <div className="flex items-center bg-stone-50 rounded-lg border border-stone-200">
                                                        <button
                                                            onClick={() => updateQuantity(product.id, -1)}
                                                            className="p-2 hover:text-alpine-600 transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-8 text-center font-bold text-sm">{getQty(product.id)}</span>
                                                        <button
                                                            onClick={() => updateQuantity(product.id, 1)}
                                                            className="p-2 hover:text-alpine-600 transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <Link
                                                    to={`/checkout?product=${product.id}&qty=${getQty(product.id)}`}
                                                    className="w-full bg-stone-900 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-alpine-600 transition-colors flex items-center justify-center gap-2 text-center"
                                                >
                                                    Comprar Ara <ArrowRight size={16} />
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Preu</span>
                                                    <span className="text-3xl font-display font-bold text-stone-400">{product.price.toFixed(2)}€</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-orange-500 font-bold uppercase text-xs tracking-widest border border-orange-100 bg-orange-50 px-4 py-3 rounded-lg">
                                                    <AlertCircle size={16} /> Esgotat
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Info Banner */}
            <section className="bg-stone-900 py-16 px-6 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <ShoppingBag className="mx-auto mb-6 text-alpine-500" size={48} strokeWidth={1} />
                    <h2 className="text-3xl font-display font-bold uppercase mb-4">Com funciona la compra?</h2>
                    <p className="text-stone-400 mb-8 max-w-2xl mx-auto">
                        De moment funcionem sota comanda. Selecciona el que t'agrada, omple les teves dades i ens posarem en contacte amb tu per gestionar el pagament i l'enviament.
                    </p>
                </div>
            </section>
        </motion.div>
    );
};

export default Shop;
