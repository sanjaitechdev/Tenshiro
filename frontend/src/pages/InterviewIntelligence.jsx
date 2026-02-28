import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FaArrowLeft, FaHistory, FaLightbulb, FaBuilding } from 'react-icons/fa';

// Components
import InterviewSelector from '../components/interview/InterviewSelector';
import InterviewEngine from '../components/interview/InterviewEngine';
import InterviewFeedback from '../components/interview/InterviewFeedback';
import InterviewHistory from '../components/interview/InterviewHistory';

import './InterviewIntelligence.css';

const InterviewIntelligence = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const [view, setView] = useState('selector'); // 'selector', 'engine', 'feedback', 'history', 'prep'
    const [config, setConfig] = useState({ company: '', role: '', type: '' });
    const [results, setResults] = useState(null);

    useEffect(() => {
        if (location.state && location.state.company) {
            setConfig(location.state);
            setView('engine');
        }
    }, [location]);

    const handleBack = () => {
        if (view === 'selector') {
            navigate(-1);
        } else {
            setView('selector');
        }
    };

    const startInterview = (config) => {
        setConfig(config);
        setView('engine');
    };

    const completeInterview = (data) => {
        setResults(data);
        setView('feedback');
    };

    return (
        <div className="interview-page">
            <header className="interview-header">
                <div className="header-content">
                    <button className="back-btn-header" onClick={handleBack}>
                        <FaArrowLeft /> {t('interview.back')}
                    </button>
                    <div>
                        <h1>{t('interview.title')}</h1>
                        <p className="subtitle">{t('interview.subtitle')}</p>
                    </div>
                </div>
                <div className="header-actions">
                    <button
                        className={`action-btn ${view === 'history' ? 'active' : ''}`}
                        onClick={() => setView('history')}
                    >
                        <FaHistory /> {t('interview.history')}
                    </button>
                    <button
                        className={`action-btn ${view === 'prep' ? 'active' : ''}`}
                        onClick={() => setView('prep')}
                    >
                        <FaLightbulb /> {t('interview.prepMode')}
                    </button>
                </div>
            </header>

            <main className="interview-container">
                {view === 'selector' && (
                    <InterviewSelector onStart={startInterview} />
                )}
                {view === 'engine' && (
                    <InterviewEngine config={config} onComplete={completeInterview} onCancel={() => setView('selector')} />
                )}
                {view === 'feedback' && (
                    <InterviewFeedback results={results} onRestart={() => setView('selector')} />
                )}
                {view === 'history' && (
                    <InterviewHistory onBack={() => setView('selector')} />
                )}
                {view === 'prep' && (
                    <div className="prep-mode-layout animate-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2>{t('interview.prep.modeTitle')}</h2>
                            <button onClick={() => setView('selector')} className="btn-outline">{t('interview.backSimulator')}</button>
                        </div>

                        <div className="prep-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            <div className="prep-card card">
                                <h3><FaBuilding /> {t('interview.guides')}</h3>
                                <div className="guide-list" style={{ marginTop: '1rem' }}>
                                    {['Amazon Leadership Principles', 'TCS Ninja/Digital Prep', 'Microsoft System Design Guide', 'Bank PO Awareness'].map(g => (
                                        <div key={g} style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>{g}</span>
                                            <button className="btn-sm" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>{t('interview.view')}</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="prep-card card">
                                <h3><FaLightbulb /> {t('interview.askedTopics')}</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                                    {[
                                        t('interview.prep.topics.systemDesign'),
                                        t('interview.prep.topics.behavioral'),
                                        t('interview.prep.topics.dsa'),
                                        t('interview.prep.topics.os'),
                                        t('interview.prep.topics.banking'),
                                        t('interview.prep.topics.architecture')
                                    ].map(t => (
                                        <span key={t} style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="sample-questions card" style={{ marginTop: '2rem' }}>
                            <h3>{t('interview.questionBank')}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>{t('interview.bankDesc')}</p>
                            <button className="btn-primary" style={{ marginTop: '1rem' }}>{t('interview.exploreBank')}</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default InterviewIntelligence;
