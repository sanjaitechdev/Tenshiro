import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import {
    FaMicrophone, FaStop, FaPaperPlane, FaVolumeUp,
    FaVolumeMute, FaRobot, FaUser, FaEraser
} from 'react-icons/fa';
import axios from 'axios';

const AIChatAssistant = () => {
    const { t, language } = useLanguage();
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am Kairos, your AI Interview Assistant. How can I help you today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [mute, setMute] = useState(false);
    const scrollRef = useRef(null);

    // Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = useRef(null);

    useEffect(() => {
        if (SpeechRecognition) {
            recognition.current = new SpeechRecognition();
            recognition.current.continuous = false;
            recognition.current.interimResults = false;
            recognition.current.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';

            recognition.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
                handleSend(transcript);
            };

            recognition.current.onerror = () => setIsListening(false);
            recognition.current.onend = () => setIsListening(false);
        }
    }, [language, SpeechRecognition]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const toggleListening = () => {
        if (isListening) {
            recognition.current?.stop();
        } else {
            setInput('');
            recognition.current?.start();
            setIsListening(true);
        }
    };

    const speak = (text) => {
        if (mute || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const handleSend = async (textOverride) => {
        const text = textOverride || input;
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        try {
            const response = await axios.post('http://localhost:5005/api/ai/chat', {
                message: text,
                language: language,
                context: 'interview-prep'
            });

            const aiText = response.data.response;
            const aiMsg = { id: Date.now() + 1, text: aiText, sender: 'ai' };
            setMessages(prev => [...prev, aiMsg]);
            setIsThinking(false);
            speak(aiText);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            const errorMsg = { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting to my brain right now.", sender: 'ai' };
            setMessages(prev => [...prev, errorMsg]);
            setIsThinking(false);
        }
    };

    return (
        <div className="ai-assistant-page" style={{ height: 'calc(100vh - var(--header-height) - 40px)', padding: '1rem' }}>
            <div className="chat-interface elite-card" style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Header */}
                <div className="chat-header" style={{
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--bg-secondary)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="ai-avatar pulse" style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--primary-gradient)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white'
                        }}>
                            <FaRobot />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Kairos AI</h3>
                            <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● Online</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setMute(!mute)} className="icon-btn">
                            {mute ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>
                        <button onClick={() => setMessages([messages[0]])} className="icon-btn">
                            <FaEraser />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="messages-container" style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    {messages.map((msg) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={msg.id}
                            style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '80%',
                                display: 'flex',
                                gap: '0.5rem',
                                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                            }}
                        >
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: msg.sender === 'user' ? 'var(--bg-secondary)' : 'var(--primary-gradient)',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem',
                                border: '1px solid var(--border)', flexShrink: 0
                            }}>
                                {msg.sender === 'user' ? <FaUser /> : <FaRobot color="white" />}
                            </div>
                            <div style={{
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                background: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-secondary)',
                                color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
                                fontSize: '0.95rem',
                                border: '1px solid var(--border)',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                    {isThinking && (
                        <div className="thinking-bubble" style={{ alignSelf: 'flex-start', display: 'flex', gap: '0.5rem' }}>
                            <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>

                {/* Input Area */}
                <div className="chat-input-area" style={{
                    padding: '1.5rem',
                    borderTop: '1px solid var(--border)',
                    background: 'var(--bg-secondary)'
                }}>
                    <div className="input-wrapper" style={{
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'center',
                        background: 'var(--bg-surface)',
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow-inner)'
                    }}>
                        <button
                            className={`voice-btn ${isListening ? 'listening' : ''}`}
                            onClick={toggleListening}
                            style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                border: 'none', background: isListening ? '#ef4444' : 'var(--bg-secondary)',
                                color: isListening ? 'white' : 'var(--primary)',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                cursor: 'pointer', transition: 'all 0.3s'
                            }}
                        >
                            {isListening ? <FaStop /> : <FaMicrophone />}
                        </button>
                        <input
                            type="text"
                            placeholder={isListening ? "Listening..." : "Ask me anything about your interview..."}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            style={{
                                flex: 1, border: 'none', background: 'transparent',
                                color: 'var(--text-main)', outline: 'none', padding: '0.5rem'
                            }}
                        />
                        <button
                            className="send-btn"
                            onClick={() => handleSend()}
                            disabled={!input.trim()}
                            style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                border: 'none', background: input.trim() ? 'var(--primary)' : 'var(--bg-secondary)',
                                color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                cursor: input.trim() ? 'pointer' : 'default', transition: 'all 0.3s'
                            }}
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .dot { width: 8px; height: 8px; background: var(--primary); border-radius: 50%; opacity: 0.6; animation: dance 1s infinite alternate; }
                .dot:nth-child(2) { animation-delay: 0.2s; }
                .dot:nth-child(3) { animation-delay: 0.4s; }
                @keyframes dance { from { transform: translateY(0); } to { transform: translateY(-5px); } }
                .voice-btn.listening { animation: pulse-red 1.5s infinite; }
                @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
                .pulse { animation: pulse-primary 2s infinite; }
                @keyframes pulse-primary { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }
            `}</style>
        </div>
    );
};

export default AIChatAssistant;
