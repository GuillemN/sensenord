import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReload = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[60vh] bg-stone-50 flex items-center justify-center p-6">
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-200 max-w-md w-full text-center space-y-4">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-stone-900 font-display">Hi ha hagut un error en carregar la pàgina</h2>
                        <p className="text-xs text-stone-500 bg-stone-100 p-3 rounded-xl font-mono text-left overflow-auto max-h-24">
                            {this.state.error?.toString() || 'Error desconegut'}
                        </p>
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={this.handleReload}
                                className="flex-1 py-3 px-4 bg-alpine-900 hover:bg-alpine-800 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Tornar a carregar
                            </button>
                            <a
                                href="/"
                                className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                            >
                                <Home className="w-4 h-4" />
                                Inici
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
