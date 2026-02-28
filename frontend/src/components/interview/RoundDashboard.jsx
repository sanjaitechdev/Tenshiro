import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
    FaChevronRight, FaCheckCircle, FaRocket, FaClock, FaBrain,
    FaLightbulb, FaShieldAlt, FaChartLine, FaInfoCircle, FaWalking
} from 'react-icons/fa';
import RoundDetail from './RoundDetail';

const RoundDashboard = ({ selection, onBack }) => {
    const { t } = useLanguage();
    const [selectedRound, setSelectedRound] = useState(null);
    const [prepData, setPrepData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [roadmapType, setRoadmapType] = useState('7-Day Plan');

    // These would normally come from an initial fetch of rounds
    const rounds = [
        { id: 'oa', name: t('interview.rounds.oa'), type: t('interview.types.tech'), difficulty: t('interview.difficulties.medium'), duration: '60 mins', eliminationRate: '60%' },
        { id: 'tech1', name: t('interview.rounds.tech1'), type: t('interview.types.tech'), difficulty: t('interview.difficulties.hard'), duration: '60 mins', eliminationRate: '40%' },
        { id: 'tech2', name: t('interview.rounds.tech2'), type: t('interview.types.tech'), difficulty: t('interview.difficulties.hard'), duration: '60 mins', eliminationRate: '30%' },
        { id: 'hr', name: t('interview.rounds.hr'), type: t('interview.types.behavioral'), difficulty: t('interview.difficulties.easy'), duration: '30 mins', eliminationRate: '10%' },
        { id: 'final', name: t('interview.rounds.final'), type: t('interview.types.mixed'), difficulty: t('interview.difficulties.medium'), duration: '45 mins', eliminationRate: '5%' }
    ];

    // Mock company insights - in real app, fetch from /api/interview/prep-data
    const companyInsights = {
        style: t('interview.insights.styleValue'),
        technicalDepth: t('interview.insights.depthValue'),
        cultureFocus: t('interview.insights.cultureValue'),
        communication: t('interview.insights.commValue'),
        hiringBar: t('interview.insights.barValue')
    };

    const roadmap = {
        "3-Day Crash": [
            t('interview.roadmap.crash.day1'),
            t('interview.roadmap.crash.day2'),
            t('interview.roadmap.crash.day3')
        ],
        "7-Day Plan": [
            t('interview.roadmap.sevennday.day1'),
            t('interview.roadmap.sevennday.day2'),
            t('interview.roadmap.sevennday.day3'),
            t('interview.roadmap.sevennday.day4'),
            t('interview.roadmap.sevennday.day5')
        ],
        "14-Day Deep": [
            t('interview.roadmap.forteennday.week1'),
            t('interview.roadmap.forteennday.week2')
        ],
        "30-Day Complete": [
            t('interview.roadmap.thirtynday.phase1'),
            t('interview.roadmap.thirtynday.phase2'),
            t('interview.roadmap.thirtynday.phase3'),
            t('interview.roadmap.thirtynday.phase4')
        ]
    };

    const handleRoundClick = (round) => {
        setSelectedRound(round);
    };

    if (selectedRound) {
        return <RoundDetail selection={selection} round={selectedRound} onBack={() => setSelectedRound(null)} />;
    }

    return (
        <div className="round-dashboard-premium animate-in">
            <div className="dashboard-grid">
                {/* LEFT: ROUND TIMELINE */}
                <div className="timeline-section">
                    <div className="section-header-elite">
                        <FaChartLine className="header-icon" />
                        <div>
                            <h2>{t('interview.roadmapTitle')}</h2>
                            <p>{t('interview.sequentialPath', { company: selection.company })}</p>
                        </div>
                    </div>

                    <div className="vertical-stepper">
                        {rounds.map((round, index) => (
                            <div key={round.id} className="step-item" onClick={() => handleRoundClick(round)}>
                                <div className="step-count">
                                    <div className="count-circle">{index + 1}</div>
                                    {index !== rounds.length - 1 && <div className="step-line"></div>}
                                </div>
                                <div className="step-card-premium">
                                    <div className="step-main">
                                        <div className="step-info">
                                            <h4>{round.name}</h4>
                                            <span className="step-type">{round.type} • {round.duration}</span>
                                        </div>
                                        <div className={`difficulty-badge-elite ${round.difficulty.toLowerCase()}`}>
                                            {round.difficulty}
                                        </div>
                                    </div>
                                    <div className="step-footer">
                                        <div className="elimination-stat">
                                            <FaShieldAlt /> <span>{round.eliminationRate} {t('interview.eliminationRate')}</span>
                                        </div>
                                        <FaChevronRight className="arrow-icon" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: INSIGHTS & ROADMAP */}
                <div className="insights-sidebar">
                    {/* COMPANY INSIGHTS */}
                    <div className="insight-card-premium">
                        <div className="card-header-minimal">
                            <FaBrain /> <span>{t('interview.companyInsights')}</span>
                        </div>
                        <div className="insight-stats-grid">
                            <div className="insight-stat-item">
                                <label>{t('interview.insights.style')}</label>
                                <p>{companyInsights.style}</p>
                            </div>
                            <div className="insight-stat-item">
                                <label>{t('interview.insights.depth')}</label>
                                <p>{companyInsights.technicalDepth}</p>
                            </div>
                            <div className="insight-stat-item">
                                <label>{t('interview.insights.culture')}</label>
                                <p>{companyInsights.cultureFocus}</p>
                            </div>
                            <div className="insight-stat-item">
                                <label>{t('interview.insights.hiringBar')}</label>
                                <p className="hiring-bar elite">{companyInsights.hiringBar}</p>
                            </div>
                        </div>
                    </div>

                    {/* AI PREP ROADMAP */}
                    <div className="roadmap-card-premium">
                        <div className="card-header-minimal">
                            <FaLightbulb /> <span>{t('interview.aiRoadmap')}</span>
                        </div>
                        <div className="roadmap-tabs">
                            {Object.keys(roadmap).map(type => (
                                <button
                                    key={type}
                                    className={`roadmap-tab-btn ${roadmapType === type ? 'active' : ''}`}
                                    onClick={() => setRoadmapType(type)}
                                >
                                    {type.split(' ')[0]}
                                </button>
                            ))}
                        </div>
                        <div className="roadmap-content">
                            {roadmap[roadmapType].map((item, i) => (
                                <div key={i} className="roadmap-step">
                                    <FaCheckCircle className="check-icon" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* OVERALL PROGRESS */}
                    <div className="progress-card-premium">
                        <div className="progress-info">
                            <div className="progress-text">
                                <h3>{t('interview.prepProgress')}</h3>
                                <p>{t('interview.roundsPrepared', { count: 0, total: rounds.length })}</p>
                            </div>
                            <div className="progress-percentage">0%</div>
                        </div>
                        <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width: '0%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoundDashboard;
