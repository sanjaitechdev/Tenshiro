import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaPaperPlane, FaMicrophone, FaStop, FaTimes, FaMinus, FaVolumeUp, FaGlobe } from 'react-icons/fa';
import '../styles/chatbot.css';

const ChatBot = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [language, setLanguage] = useState('en');
    const [isSpeaking, setIsSpeaking] = useState(false);

    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);
    const synthesisRef = useRef(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInputMessage(transcript);
                setIsRecording(false);
            };

            recognition.onerror = () => {
                setIsRecording(false);
            };

            recognition.onend = () => {
                setIsRecording(false);
            };

            recognitionRef.current = recognition;
        }

        // Initialize Speech Synthesis
        if ('speechSynthesis' in window) {
            synthesisRef.current = window.speechSynthesis;
        }

        // Load chat history
        loadChatHistory();
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadChatHistory = async () => {
        if (!user) return; // Skip history for guests
        try {
            const res = await axios.get('/api/ai/chat-history?limit=20');
            const formattedMessages = res.data.map(msg => ({
                text: msg.message,
                sender: msg.sender,
                timestamp: new Date(msg.created_at),
                quickReplies: msg.quick_replies ? JSON.parse(msg.quick_replies) : [],
                language: msg.language
            }));
            setMessages(formattedMessages);
        } catch (err) {
            console.error('Failed to load chat history:', err);
        }
    };

    const sendMessage = async (text = inputMessage) => {
        if (!text.trim()) return;

        const userMessage = {
            text,
            sender: 'user',
            timestamp: new Date(),
            language
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        try {
            // Guest Handling
            if (!user) {
                setTimeout(() => {
                    const guestResponse = {
                        text: "I am in Guest Mode. Please log in to save your chat history and access full features.",
                        sender: 'ai',
                        timestamp: new Date(),
                        quickReplies: ["Log In", "Tell me features", "Demo Chat"]
                    };
                    setMessages(prev => [...prev, guestResponse]);
                    setIsTyping(false);
                }, 1000);
                return;
            }

            const res = await axios.post('/api/ai/chat', {
                message: text,
                language,
                isVoice: false
            });

            const aiMessage = {
                text: res.data.response,
                sender: 'ai',
                timestamp: new Date(),
                quickReplies: res.data.quickReplies || [],
                language: res.data.language
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            console.error('Chat error:', err);
            setMessages(prev => [...prev, {
                text: 'Sorry, I encountered an error. Please try again.',
                sender: 'ai',
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const toggleRecording = () => {
        if (!recognitionRef.current) {
            alert('Voice recognition not supported in your browser');
            return;
        }

        if (isRecording) {
            recognitionRef.current.stop();
        } else {
            const langCodes = { en: 'en-US', ta: 'ta-IN', hi: 'hi-IN' };
            recognitionRef.current.lang = langCodes[language] || 'en-US';
            recognitionRef.current.start();
            setIsRecording(true);
        }
    };

    const speakText = (text) => {
        if (!synthesisRef.current) return;

        // Stop any ongoing speech
        synthesisRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        synthesisRef.current.speak(utterance);
    };

    const stopSpeaking = () => {
        if (synthesisRef.current) {
            synthesisRef.current.cancel();
            setIsSpeaking(false);
        }
    };

    const formatTime = (date) => {
        const now = new Date();
        const diff = Math.floor((now - date) / 1000); // seconds

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const languageNames = {
        en: 'English',
        ta: 'தமிழ்',
        hi: 'हिंदी'
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button className="chat-fab" onClick={() => setIsOpen(true)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor" />
                    </svg>
                    <span className="chat-badge">AI</span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className={`chat-window ${isMinimized ? 'minimized' : ''}`}>
                    {/* Header */}
                    <div className="chat-header">
                        <div className="chat-header-info">
                            <div className="chat-avatar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor" />
                                </svg>
                            </div>
                            <div>
                                <h3>CareerNavigator AI</h3>
                                <span className="chat-status">Online</span>
                            </div>
                        </div>
                        <div className="chat-header-actions">
                            {/* Language Selector */}
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="language-selector"
                                title="Select Language"
                            >
                                <option value="en">🇬🇧 EN</option>
                                <option value="ta">🇮🇳 TA</option>
                                <option value="hi">🇮🇳 HI</option>
                            </select>
                            <button onClick={() => setIsMinimized(!isMinimized)} className="chat-icon-btn">
                                <FaMinus />
                            </button>
                            <button onClick={() => setIsOpen(false)} className="chat-icon-btn">
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    {/* Messages Container */}
                    {!isMinimized && (
                        <>
                            <div className="chat-messages">
                                {messages.length === 0 && (
                                    <div className="chat-welcome">
                                        <div className="welcome-icon">👋</div>
                                        <h4>Welcome to CareerNavigator AI!</h4>
                                        <p>I'm here to help you with your career journey. Ask me anything!</p>
                                    </div>
                                )}

                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`message-wrapper ${msg.sender}`}>
                                        <div className={`message ${msg.sender}`}>
                                            <div className="message-content">{msg.text}</div>
                                            <div className="message-meta">
                                                <span className="message-time">{formatTime(msg.timestamp)}</span>
                                                {msg.sender === 'ai' && (
                                                    <button
                                                        className="speak-btn"
                                                        onClick={() => isSpeaking ? stopSpeaking() : speakText(msg.text)}
                                                        title={isSpeaking ? 'Stop' : 'Listen'}
                                                    >
                                                        <FaVolumeUp />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Quick Replies */}
                                        {msg.sender === 'ai' && msg.quickReplies && msg.quickReplies.length > 0 && idx === messages.length - 1 && (
                                            <div className="quick-replies">
                                                {msg.quickReplies.map((reply, i) => (
                                                    <button
                                                        key={i}
                                                        className="quick-reply-chip"
                                                        onClick={() => sendMessage(reply)}
                                                    >
                                                        {reply}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Typing Indicator */}
                                {isTyping && (
                                    <div className="message-wrapper ai">
                                        <div className="message ai typing">
                                            <div className="typing-dots">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="chat-input-container">
                                <div className="chat-input-wrapper">
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                        placeholder={`Type your message in ${languageNames[language]}...`}
                                        className="chat-input"
                                        disabled={isRecording}
                                    />
                                    <button
                                        className={`voice-btn ${isRecording ? 'recording' : ''}`}
                                        onClick={toggleRecording}
                                        title={isRecording ? 'Stop Recording' : 'Voice Input'}
                                    >
                                        {isRecording ? <FaStop /> : <FaMicrophone />}
                                    </button>
                                    <button
                                        className="send-btn"
                                        onClick={() => sendMessage()}
                                        disabled={!inputMessage.trim() || isRecording}
                                    >
                                        <FaPaperPlane />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default ChatBot;
