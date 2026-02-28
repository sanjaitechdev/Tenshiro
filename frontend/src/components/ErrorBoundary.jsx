import React from 'react';

/**
 * ErrorBoundary — catches runtime React errors and shows a recovery UI
 * instead of a white blank screen. Wrap any component tree with this.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('[ErrorBoundary] Caught error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', minHeight: '60vh', padding: '4rem 2rem',
                    textAlign: 'center', fontFamily: 'Outfit, sans-serif'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>⚠️</div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--text-main, #111)' }}>
                        Something went wrong
                    </h2>
                    <p style={{ color: 'var(--text-muted, #666)', marginBottom: '2rem', maxWidth: 400, lineHeight: 1.6 }}>
                        An unexpected error occurred. Please reload the page to continue.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '0.85rem 2.5rem', borderRadius: 16, border: 'none',
                            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                            color: '#fff', fontWeight: 800, fontSize: '1rem',
                            cursor: 'pointer', boxShadow: '0 8px 20px rgba(99,102,241,0.3)'
                        }}
                    >
                        Reload Page
                    </button>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <pre style={{ marginTop: '2rem', padding: '1rem', background: '#fee2e2', borderRadius: 8, fontSize: '0.75rem', color: '#dc2626', maxWidth: 600, overflow: 'auto', textAlign: 'left' }}>
                            {this.state.error.toString()}
                        </pre>
                    )}
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
