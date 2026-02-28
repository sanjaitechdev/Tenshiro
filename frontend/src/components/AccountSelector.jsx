import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaPlus } from 'react-icons/fa';

const AccountSelector = ({ isOpen, onSelect, onClose }) => {
    const accounts = [
        { name: 'Sanjai Dev', email: 'sanjaiwebdev@gmail.com', avatar: null },
        { name: 'Developer User', email: 'devuser@example.com', avatar: null },
        { name: 'Test Student', email: 'test.student@univ.edu', avatar: null }
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed', inset: 0, zIndex: 2000,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)'
            }}>
                <Motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    style={{
                        width: '100%', maxWidth: '400px',
                        background: 'var(--bg-card, #fff)',
                        borderRadius: '12px', overflow: 'hidden',
                        boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
                        padding: '2.5rem 1.5rem',
                        textAlign: 'center',
                        color: 'var(--text-main, #333)'
                    }}
                >
                    {/* Google Logo Simulation */}
                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <svg width="75" height="24" viewBox="0 0 75 24">
                            <path fill="#4285F4" d="M12.2 4.4v4.3h7c-.3 2.1-2.4 6.2-7 6.2-4 0-7.3-3.3-7.3-7.4S8.2 0 12.2 0c2.3 0 3.8 1 4.7 1.8l3.4-3.3C18.1-1.3 15.4-2.8 12.2-2.8 5.5-2.8 0 2.7 0 9.5s5.5 12.3 12.2 12.3c7 0 11.6-4.9 11.6-11.8 0-.8-.1-1.4-.2-2l-11.4-.1v.1z" />
                            <text x="28" y="18" fill="var(--text-main)" style={{ font: 'bold 18px Arial' }}>Sign in</text>
                        </svg>
                    </div>

                    <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.5rem' }}>Choose an account</h2>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted, #666)', marginBottom: '2rem' }}>to continue to CareerNavigator</p>

                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                        {accounts.map((acc, i) => (
                            <button
                                key={i}
                                onClick={() => onSelect(acc)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '0.75rem 1rem', border: 'none', background: 'none',
                                    borderBottom: '1px solid var(--border, #eee)',
                                    cursor: 'pointer', width: '100%', transition: 'background 0.2s'
                                }}
                                className="acc-item"
                                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                            >
                                <div style={{ fontSize: '1.5rem', color: '#4285F4' }}>
                                    <FaUserCircle />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{acc.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{acc.email}</div>
                                </div>
                            </button>
                        ))}

                        <button
                            onClick={onClose}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '1rem',
                                padding: '1rem', border: 'none', background: 'none',
                                cursor: 'pointer', width: '100%', color: '#4285F4', fontWeight: 500
                            }}
                        >
                            <FaPlus style={{ fontSize: '0.8rem' }} />
                            <span>Use another account</span>
                        </button>
                    </div>

                    <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <p>To continue, Google will share your name, email address, language preference, and profile picture with CareerNavigator.</p>
                    </div>
                </Motion.div>
            </div>
        </AnimatePresence >
    );
};

export default AccountSelector;
