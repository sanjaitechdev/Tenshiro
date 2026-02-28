import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import { FaMicrophone, FaClock, FaArrowRight } from 'react-icons/fa';

const InterviewEngine = ({ config, onComplete, onCancel }) => {
    const { t } = useLanguage();
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [timeLeft, setTimeLeft] = useState(180); // 3 mins
    const [loading, setLoading] = useState(true);
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const timerRef = useRef(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.post('/api/interview/generate', config, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setQuestions(res.data.questions);
                setLoading(false);
                startTimer();
            } catch (err) {
                console.error("Failed to fetch questions", err);
                setLoading(false);
            }
        };
        fetchQuestions();

        return () => clearInterval(timerRef.current);
    }, [config]);

    const startTimer = () => {
        clearInterval(timerRef.current);
        setTimeLeft(180);
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleNext = async () => {
        const newAnswers = [...answers];
        newAnswers[currentIdx] = currentAnswer;
        setAnswers(newAnswers);

        if (currentIdx < questions.length - 1) {
            setCurrentIdx(currentIdx + 1);
            setCurrentAnswer('');
            startTimer();
        } else {
            // End Interview - Analyze
            setAnalyzing(true);
            try {
                const token = localStorage.getItem('token');
                const res = await axios.post('/api/interview/analyze', {
                    questions,
                    answers: newAnswers,
                    config
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                onComplete(res.data);
            } catch (err) {
                console.error("Analysis failed", err);
                setAnalyzing(false);
            }
        }
    };

    const toggleVoiceMode = () => {
        setIsVoiceMode(!isVoiceMode);
        if (!isVoiceMode) {
            // Simulate speech-to-text
            setCurrentAnswer("Simulated voice answer: I believe " + config.role + " requires a mix of technical depth and strategic thinking. For example, in my last project, I implemented a scalable architecture using " + (config.company === 'Amazon' ? 'AWS' : 'modern frameworks') + "...");
        }
    };

    if (loading) return (
        <div className="engine-loading">
            <div className="spinner"></div>
            <h3>{t('interview.generating')}</h3>
        </div>
    );

    if (analyzing) return (
        <div className="engine-loading">
            <div className="spinner"></div>
            <h3>{t('interview.analyzing')}</h3>
            <p>{t('interview.evaluatingDesc')}</p>
        </div>
    );

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="interview-engine animate-in">
            <div className="engine-layout">
                <div className="question-card">
                    <span className="question-number">
                        {t('interview.questionCount', { current: currentIdx + 1, total: questions.length })}
                    </span>
                    <h2 className="question-text">{questions[currentIdx]}</h2>
                </div>

                <div className="answer-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700 }}>{t('interview.yourAnswer')}</span>
                        <div
                            className={`voice-toggle ${isVoiceMode ? 'active' : ''}`}
                            onClick={toggleVoiceMode}
                        >
                            <FaMicrophone /> {isVoiceMode ? t('interview.voiceMode') : t('interview.textMode')}
                        </div>
                    </div>
                    <textarea
                        className="answer-area"
                        placeholder={isVoiceMode ? t('interview.voicePlaceholder') : t('interview.typePlaceholder')}
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        disabled={isVoiceMode}
                    ></textarea>
                </div>

                <div className="engine-footer">
                    <div className={`timer-box ${timeLeft <= 30 ? 'warning' : ''}`}>
                        <FaClock /> {formatTime(timeLeft)}
                    </div>

                    <div className="progress-container">
                        <div className="progress-label">
                            <span>{t('interview.progress')}</span>
                            <span>{Math.round(((currentIdx + 1) / questions.length) * 100)}%</span>
                        </div>
                        <div className="progress-bar-bg">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <button
                        className="btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem' }}
                        onClick={handleNext}
                    >
                        {currentIdx === questions.length - 1 ? t('interview.finish') : t('interview.next')} <FaArrowRight />
                    </button>
                </div>
            </div>

            <button className="btn-outline" onClick={onCancel} style={{ marginTop: '2rem' }}>
                {t('interview.quit')}
            </button>
        </div>
    );
};

export default InterviewEngine;
