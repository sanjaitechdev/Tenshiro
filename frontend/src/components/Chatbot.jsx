import { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaRobot, FaPaperPlane, FaTimes, FaExpandAlt, FaVolumeUp, FaBolt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loadP, getKPIs, mkBlueprint } from './aptitude/AptUtils';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Kairos AI initialized. Systems ready for strategic guidance.", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isVoice, setIsVoice] = useState(false);
    const [quickReplies, setQuickReplies] = useState(['Am I ready for TCS?', 'Show weak topics', 'Career Roadmap']);

    const messagesEndRef = useRef(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isOpen]);

    // Handle AI actions (navigation, etc)
    const handleAction = useCallback((action) => {
        if (!action) return;
        const targetMap = {
            'tcs_mock': '/aptitude', // In reality, we might pass state to start specific mock
            'aptitude_practice': '/aptitude',
            'progress_dashboard': '/aptitude',
            'resources': '/aptitude',
            'jobs': '/jobs'
        };

        if (action.action === 'navigate' && targetMap[action.target]) {
            navigate(targetMap[action.target]);
            // Optional: Close chatbot or show success message
        }
    }, [navigate]);

    const handleSend = async (val) => {
        const text = val || input;
        if (!text.trim()) return;

        const userMessage = { text, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Collect context
            const perf = loadP();
            const kpis = getKPIs(perf);
            const blueprint = perf.attempts?.length ? mkBlueprint(perf.attempts[perf.attempts.length - 1], {}) : null;

            const context = {
                aptitude: { kpis, weak: blueprint?.weak || [] },
                page: location.pathname,
                appliedJobs: [] // To be integrated if jobs context available
            };

            const res = await axios.post('/api/ai/chat', {
                message: text,
                isVoice,
                context
            });

            const aiMessage = { text: res.data.response, sender: 'ai' };
            setMessages((prev) => [...prev, aiMessage]);
            setQuickReplies(res.data.quickReplies || []);

            if (res.data.action) {
                handleAction(res.data.action);
            }
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, { text: "Protocol error. Strategic synchronization lost.", sender: 'ai' }]);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 2000 }}>
            {isOpen ? (
                <div style={{
                    width: '380px',
                    height: '580px',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 24,
                    boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4)',
                    overflow: 'hidden',
                    animation: 'fadeInUp 0.3s ease-out'
                }}>
                    {/* Header */}
                    <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ padding: 8, background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: 10, color: 'white' }}>
                                <FaBolt fontSize="1rem" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: 0.5 }}>Kairos AI</div>
                                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>STRATEGIC SYSTEMS ACTIVE</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button onClick={() => setIsVoice(!isVoice)} style={{ background: 'none', border: 'none', color: isVoice ? '#6366f1' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.2s' }}>
                                <FaVolumeUp />
                            </button>
                            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="custom-scroll">
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                background: msg.sender === 'user' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'rgba(255, 255, 255, 0.04)',
                                border: msg.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                                color: msg.sender === 'user' ? 'white' : 'rgba(255,255,255,0.9)',
                                padding: '0.85rem 1rem',
                                borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '4px 20px 20px 20px',
                                maxWidth: '85%',
                                fontSize: '0.86rem',
                                lineHeight: 1.5,
                                fontWeight: 500,
                                boxShadow: msg.sender === 'user' ? '0 4px 12px rgba(99, 102, 241, 0.2)' : 'none'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && <div style={{ alignSelf: 'flex-start', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: 1 }}>ANALYZING...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    <div style={{ padding: '0 1.25rem', display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12 }}>
                        {quickReplies.map((qr, i) => (
                            <button key={i} onClick={() => handleSend(qr)} style={{
                                padding: '0.5rem 0.85rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 12,
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s'
                            }} onMouseEnter={e => e.currentTarget.style.borderColor = '#6366f1'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
                                {qr}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Consulting Kairos..."
                                style={{ flex: 1, padding: '0.8rem 1.1rem', borderRadius: 14, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: '0.85rem', outline: 'none' }}
                            />
                            <button type="submit" disabled={loading} style={{
                                width: 44,
                                height: 44,
                                borderRadius: 12,
                                border: 'none',
                                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                            }}>
                                <FaPaperPlane fontSize="0.9rem" />
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '24px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #624d4dff, #a855f7)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '1.8rem',
                        boxShadow: '0 12px 32px rgba(99, 102, 241, 0.5)',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
                >
                    <FaBolt />
                    <div style={{ position: 'absolute', top: -5, right: -5, width: 14, height: 14, background: '#10b981', borderRadius: '50%', border: '3px solid var(--bg-dark)' }} />
                </button>
            )}
        </div>
    );
};

export default Chatbot;
