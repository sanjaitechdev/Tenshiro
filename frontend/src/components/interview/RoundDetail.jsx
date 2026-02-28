import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    FaArrowLeft, FaInfoCircle, FaBullseye, FaBookOpen, FaCode,
    FaLink, FaLightbulb, FaCheckCircle, FaRocket, FaRedo,
    FaArrowRight, FaTimesCircle, FaCheck, FaExclamationTriangle
} from 'react-icons/fa';

const RoundDetail = ({ selection, round, onBack }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const sections = [
        { id: 'overview', name: `A) ${t('interview.roundOverview')}`, icon: <FaInfoCircle /> },
        { id: 'focus', name: `B) ${t('interview.companyFocus')}`, icon: <FaBullseye /> },
        { id: 'learning', name: `C) ${t('interview.learningSection')}`, icon: <FaBookOpen /> },
        { id: 'practice', name: `D) ${t('interview.practiceSection')}`, icon: <FaCode /> },
        { id: 'resources', name: `E) ${t('interview.resourcesSection')}`, icon: <FaLink /> },
        { id: 'strategy', name: `F) ${t('interview.strategySection')}`, icon: <FaLightbulb /> },
        { id: 'assessment', name: `G) ${t('interview.miniAssessment')}`, icon: <FaCheckCircle /> }
    ];
    const [activeSection, setActiveSection] = useState('overview');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [readinessScore, setReadinessScore] = useState(null);

    useEffect(() => {
        const fetchPrepData = async () => {
            setLoading(true);
            try {
                const res = await axios.post('/api/interview/prep-data', {
                    ...selection,
                    round: round.name
                });
                setData(res.data);
            } catch (err) {
                console.error("Prep data fetch error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPrepData();
    }, [selection, round]);

    const handleSimulate = () => {
        navigate('/interview', {
            state: {
                company: selection.company,
                role: selection.role,
                type: round.name
            }
        });
    };

    if (loading) return (
        <div className="detail-loading-overlay">
            <div className="spinner-elite"></div>
            <p>{t('interview.analyzingRound', { round: round.name })}</p>
        </div>
    );
    if (!data) return (
        <div className="detail-error">
            {t('interview.failedLoadData')} <button onClick={onBack}>{t('interview.goBack')}</button>
        </div>
    );

    return (
        <div className="round-detail-premium animate-in">
            <div className="detail-layout">
                {/* STICKY SIDE NAV */}
                <aside className="detail-sidebar-sticky">
                    <button className="back-to-dashboard" onClick={onBack}>
                        <FaArrowLeft /> {t('interview.exitDashboard')}
                    </button>

                    <div className="sidebar-round-info-premium">
                        <span className="round-label-small">{round.type} {t('interview.roundLabel')}</span>
                        <h3>{round.name}</h3>
                        <div className={`diff-tag-premium ${data.overview.difficulty.toLowerCase()}`}>
                            {data.overview.difficulty} {t('interview.difficultyLabel')}
                        </div>
                    </div>

                    <nav className="detail-nav-elite">
                        {sections.map(s => (
                            <button
                                key={s.id}
                                className={`nav-item-btn ${activeSection === s.id ? 'active' : ''}`}
                                onClick={() => setActiveSection(s.id)}
                            >
                                {s.icon} <span>{s.name}</span>
                            </button>
                        ))}
                    </nav>

                    <button className="simulate-round-btn-sidebar" onClick={handleSimulate}>
                        {t('interview.simulateRound')} <FaRocket />
                    </button>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="detail-main-content">
                    <div className="content-card-premium animate-slide-up">
                        {/* A) OVERVIEW */}
                        {activeSection === 'overview' && (
                            <div className="section-content-elite">
                                <h2 className="content-title"><FaInfoCircle /> {t('interview.roundOverview')}</h2>
                                <p className="section-intro">{t('interview.overviewIntro')}</p>
                                <div className="overview-grid-deep">
                                    <div className="overview-box-premium">
                                        <h4>{t('interview.strategicPurpose')}</h4>
                                        <p>{data.overview.purpose}</p>
                                    </div>
                                    <div className="overview-box-premium">
                                        <h4>{t('interview.interviewerFocus')}</h4>
                                        <p>{data.overview.evaluates}</p>
                                    </div>
                                    <div className="overview-box-premium">
                                        <h4>{t('interview.expectationTitle')}</h4>
                                        <p>{data.overview.expectations}</p>
                                    </div>
                                    <div className="overview-box-premium box-warning">
                                        <h4><FaExclamationTriangle /> {t('interview.commonElimination')}</h4>
                                        <ul>
                                            {data.overview.eliminationReasons.map((r, i) => <li key={i}>{r}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* B) COMPANY FOCUS */}
                        {activeSection === 'focus' && (
                            <div className="section-content-elite">
                                <h2 className="content-title"><FaBullseye /> {t('interview.companyFocusTitle')}</h2>
                                <p className="section-intro">
                                    {t('interview.focusIntro', { company: data.company, role: data.role })}
                                </p>
                                <div className="focus-pills-container">
                                    {data.focusAreas.map((area, i) => (
                                        <div key={i} className="focus-pill-premium">
                                            <FaCheckCircle className="pill-check" />
                                            <span>{area}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="insight-note-box-premium">
                                    <FaLightbulb />
                                    <span>{t('interview.weightageNote', { weight: data.overview.weightage })}</span>
                                </div>
                            </div>
                        )}

                        {/* C) LEARNING SECTION */}
                        {activeSection === 'learning' && (
                            <div className="section-content-elite">
                                <h2 className="content-title"><FaBookOpen /> {t('interview.learningSection')}</h2>
                                <p className="section-intro">{t('interview.learningIntro')}</p>
                                <div className="learning-grid-tri">
                                    <div className="learning-card-premium">
                                        <h4>{t('interview.coreConcepts')}</h4>
                                        <ul>{data.learningTopics.core.map((item, i) => <li key={i}>{item}</li>)}</ul>
                                    </div>
                                    <div className="learning-card-premium">
                                        <h4>{t('interview.advancedTopics')}</h4>
                                        <ul>{data.learningTopics.advanced.map((item, i) => <li key={i}>{item}</li>)}</ul>
                                    </div>
                                    <div className="learning-card-premium">
                                        <h4>{t('interview.scenarioPatterns')}</h4>
                                        <ul>{data.learningTopics.scenarios.map((item, i) => <li key={i}>{item}</li>)}</ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* D) PRACTICE SECTION */}
                        {activeSection === 'practice' && (
                            <div className="section-content-elite">
                                <h2 className="content-title"><FaCode /> {t('interview.practiceSection')}</h2>
                                <p className="section-intro">{t('interview.practiceIntro')}</p>
                                <div className="practice-blocks">
                                    <div className="practice-block">
                                        <h4>{t('interview.technicalProblemSolving')}</h4>
                                        <div className="q-list-premium">
                                            {data.practiceQuestions.coding.map((q, i) => <div key={i} className="q-card-item">{q}</div>)}
                                        </div>
                                    </div>
                                    <div className="practice-block">
                                        <h4>{t('interview.behavioralHandling')}</h4>
                                        <div className="q-list-premium">
                                            {data.practiceQuestions.behavioral.map((q, i) => <div key={i} className="q-card-item behavioral">{q}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* E) RESOURCES SECTION */}
                        {activeSection === 'resources' && (
                            <div className="section-content-elite">
                                <h2 className="content-title"><FaLink /> {t('interview.resourcesSection')}</h2>
                                <p className="section-intro">{t('interview.resourcesIntro')}</p>
                                <div className="resource-links-grid">
                                    {data.resources.map((res, i) => (
                                        <a key={i} href={res.link} target="_blank" rel="noreferrer" className="resource-card-link">
                                            <div className="res-icon"><FaBookOpen /></div>
                                            <div className="res-info">
                                                <span>{res.title}</span>
                                                <small>{t('interview.strategicResource', { company: data.company })}</small>
                                            </div>
                                            <FaArrowRight className="arrow-link" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* F) STRATEGY SECTION */}
                        {activeSection === 'strategy' && (
                            <div className="section-content-elite">
                                <h2 className="content-title"><FaLightbulb /> {t('interview.strategySection')}</h2>
                                <p className="section-intro">{t('interview.strategyIntro')}</p>
                                <div className="strategy-grid-dual">
                                    <div className="strategy-card-inner">
                                        <h4>{t('interview.technicalDelivery')}</h4>
                                        <p>{data.strategyTips.technical}</p>
                                    </div>
                                    <div className="strategy-card-inner">
                                        <h4>{t('interview.explanationFramework')}</h4>
                                        <p>{data.strategyTips.explanation}</p>
                                    </div>
                                    <div className="strategy-card-inner">
                                        <h4>{t('interview.visualizationStrategy')}</h4>
                                        <p>{data.strategyTips.whiteboard}</p>
                                    </div>
                                    <div className="strategy-card-inner">
                                        <h4>{t('interview.interpersonalPresence')}</h4>
                                        <p>{data.strategyTips.confidence}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* G) MINI ASSESSMENT */}
                        {activeSection === 'assessment' && (
                            <div className="section-content-elite">
                                <h2 className="content-title"><FaCheckCircle /> {t('interview.miniAssessment')}</h2>
                                {readinessScore === null ? (
                                    <div className="assessment-intro">
                                        <p>{t('interview.assessmentIntro')}</p>
                                        <div className="quiz-container-mock">
                                            {data.readinessTest.map((q, i) => (
                                                <div key={i} className="quiz-question-card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
                                                    <p>Q{i + 1}: {q.q}</p>
                                                    <div className="quiz-options-mock">
                                                        {q.options.map((opt, oi) => <div key={oi} className="opt-mock">{opt}</div>)}
                                                    </div>
                                                </div>
                                            ))}
                                            <button className="calculate-score-btn" onClick={() => setReadinessScore(80)}>
                                                {t('interview.unlockScore')}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="readiness-result-panel animate-slide-up">
                                        <div className="score-circle-large">
                                            <span className="score-num">{readinessScore}%</span>
                                            <span className="score-label">{t('interview.roundReady')}</span>
                                        </div>
                                        <div className="readiness-feedback">
                                            <h3>{t('interview.exceptionalPrep')}</h3>
                                            <p>{t('interview.assessmentFeedback', { round: round.name })}</p>
                                            <button className="back-to-dashboard" style={{ width: 'auto', marginInline: 'auto' }} onClick={() => setReadinessScore(null)}>
                                                <FaRedo /> {t('interview.retakeAssessment')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RoundDetail;
