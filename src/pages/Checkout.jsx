import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/shop';
import { ArrowLeft, CheckCircle, Send } from 'lucide-react';

const Checkout = () => {
    const [searchParams] = useSearchParams();
    const productId = parseInt(searchParams.get('product'));
    const initialQty = parseInt(searchParams.get('qty')) || 1;

    const [product, setProduct] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    // State for products WITHOUT sizes
    const [quantity, setQuantity] = useState(initialQty);

    // State for products WITH sizes
    const [sizeQuantities, setSizeQuantities] = useState({});

    // ... rest of state ...
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: ''
    });

    useEffect(() => {
        if (productId) {
            const found = products.find(p => p.id === productId);
            setProduct(found);

            // Initialize size quantities if product has sizes
            if (found && found.sizes && found.sizes.length > 0) {
                const initialSizes = {};
                found.sizes.forEach(size => {
                    initialSizes[size] = 0;
                });
                // Default the incoming URL quantity to the first available size
                initialSizes[found.sizes[0]] = initialQty;
                setSizeQuantities(initialSizes);
            }
        }
    }, [productId, initialQty]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const updateSizeQty = (size, delta) => {
        setSizeQuantities(prev => {
            const current = prev[size] || 0;
            const newQty = Math.max(0, current + delta);
            return { ...prev, [size]: newQty };
        });
    };

    const getTotalQty = () => {
        if (product?.sizes) {
            return Object.values(sizeQuantities).reduce((a, b) => a + b, 0);
        }
        return quantity;
    };

    const getSizeBreakdownString = () => {
        if (!product?.sizes) return '';
        return Object.entries(sizeQuantities)
            .filter(([_, qty]) => qty > 0)
            .map(([size, qty]) => `${qty}x ${size}`)
            .join(', ');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const totalQty = getTotalQty();
        if (totalQty === 0) {
            alert("Si us plau, selecciona com a mínim 1 unitat.");
            return;
        }

        // Prepare data for Netlify
        const formPayload = new URLSearchParams();
        formPayload.append('form-name', 'checkout');
        formPayload.append('product_name', product.name);
        formPayload.append('product_price', product.price);
        formPayload.append('quantity', totalQty);

        // Add size breakdown if applicable
        if (product.sizes) {
            formPayload.append('size', getSizeBreakdownString());
        }

        formPayload.append('name', formData.name);
        formPayload.append('email', formData.email);
        formPayload.append('address', formData.address);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formPayload.toString(),
        })
            .then(() => setSubmitted(true))
            .catch((error) => alert("Hi ha hagut un error enviant la comanda. Si us plau, torna-ho a provar o contacta amb nosaltres."));
    };

    if (!product && !submitted) {
        return (
            <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-display font-bold mb-4">Producte no trobat</h2>
                <Link to="/shop" className="text-alpine-600 underline">Tornar a la botiga</Link>
            </div>
        );
    }

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center max-w-lg mx-auto"
            >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                </div>
                <h2 className="text-4xl font-display font-bold mb-4 uppercase text-stone-900">Sol·licitud Rebuda!</h2>
                <p className="text-stone-600 mb-8 text-lg">
                    Gràcies pel teu interès. Hem rebut la teva comanda:<br />
                    <strong className="text-stone-900">{getTotalQty()}x {product?.name}</strong>
                    {product?.sizes && (
                        <div className="mt-2 text-sm text-stone-500 bg-stone-50 p-3 rounded-lg inline-block">
                            {getSizeBreakdownString()}
                        </div>
                    )}
                </p>
                <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 text-sm text-stone-500 mb-8">
                    <p>Rebràs un correu a <strong>{formData.email}</strong> amb les instruccions de pagament.</p>
                </div>
                <Link to="/shop" className="bg-stone-900 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-stone-700 transition-colors">
                    Tornar a la Botiga
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 min-h-screen bg-stone-50 md:py-32"
        >
            <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Product Summary */}
                <div>
                    <Link to="/shop" className="inline-flex items-center text-stone-400 hover:text-stone-900 mb-8 transition-colors text-sm font-bold uppercase tracking-widest">
                        <ArrowLeft size={16} className="mr-2" /> Tornar enrere
                    </Link>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 sticky top-32">
                        <span className="block text-xs font-bold text-alpine-600 uppercase tracking-widest mb-2">Estàs demanant</span>
                        <h1 className="text-3xl font-display font-bold text-stone-900 mb-4">{product.name}</h1>
                        <div className="text-4xl font-display font-bold text-stone-900 mb-6">{(product.price * getTotalQty()).toFixed(2)}€</div>

                        <div className="aspect-video bg-stone-100 rounded-lg mb-6 overflow-hidden shadow-sm">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>

                        <ul className="space-y-3">
                            {product.features.map((f, i) => (
                                <li key={i} className="flex items-center text-sm text-stone-600">
                                    <span className="w-1.5 h-1.5 bg-alpine-400 rounded-full mr-3"></span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-stone-100 h-fit">
                    <h2 className="text-2xl font-display font-bold uppercase mb-6 text-stone-900 border-b border-stone-100 pb-4">
                        Les teves dades
                    </h2>
                    <form onSubmit={handleSubmit} name="checkout" method="POST" data-netlify="true">
                        <input type="hidden" name="form-name" value="checkout" />
                        <input type="hidden" name="product_name" value={product.name} />
                        <input type="hidden" name="product_price" value={product.price} />
                        <input type="hidden" name="size" value={getSizeBreakdownString()} />
                        <input type="hidden" name="quantity" value={getTotalQty()} />

                        {/* Dynamic Size/Quantity Selector */}
                        {product.sizes ? (
                            <div className="space-y-4 bg-stone-50 p-6 rounded-lg border border-stone-200 mb-6">
                                <label className="text-xs font-bold uppercase tracking-widest text-stone-900 block mb-2">Distribueix les unitats per talla</label>
                                {product.sizes.map((size) => (
                                    <div key={size} className="flex items-center justify-between border-b last:border-0 border-stone-200 pb-3 last:pb-0">
                                        <span className="font-bold text-stone-700 w-12">{size}</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => updateSizeQty(size, -1)}
                                                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${sizeQuantities[size] > 0 ? 'border-stone-300 hover:bg-stone-200 text-stone-600' : 'border-stone-100 text-stone-300 cursor-not-allowed'}`}
                                            >
                                                -
                                            </button>
                                            <span className={`w-6 text-center font-bold ${sizeQuantities[size] > 0 ? 'text-alpine-600' : 'text-stone-300'}`}>
                                                {sizeQuantities[size] || 0}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => updateSizeQty(size, 1)}
                                                className="w-8 h-8 rounded-full border border-stone-300 bg-white hover:bg-stone-100 flex items-center justify-center text-stone-600 font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="text-right pt-2 text-xs font-bold uppercase tracking-widest text-alpine-600">
                                    Total: {getTotalQty()} ut.
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-1 mb-6">
                                <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Quantitat</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-stone-600"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-bold font-display w-8 text-center">{quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-stone-600"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-1 mb-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Nom Complet</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-alpine-500/20 focus:border-alpine-500 transition-all font-sans"
                                placeholder="El teu nom"
                            />
                        </div>

                        <div className="space-y-1 mb-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Correu Electrònic</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-alpine-500/20 focus:border-alpine-500 transition-all font-sans"
                                placeholder="exemple@correu.com"
                            />
                        </div>

                        <div className="space-y-1 mb-6">
                            <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Adreça d'enviament</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                rows="3"
                                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-alpine-500/20 focus:border-alpine-500 transition-all font-sans resize-none"
                                placeholder="Carrer, Número, Ciutat, Codi Postal..."
                            ></textarea>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-alpine-600 text-white font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-alpine-700 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-alpine-600/20"
                            >
                                Sol·licitar Comanda <Send size={18} />
                            </button>
                            <p className="text-center text-xs text-stone-400 mt-4 leading-normal">
                                En fer clic, rebràs les instruccions de pagament al teu correu. Informació processada segurament via Netlify.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default Checkout;
