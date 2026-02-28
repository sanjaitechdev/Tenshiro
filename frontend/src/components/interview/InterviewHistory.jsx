import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';
import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    ResponsiveContainer
} from 'recharts';
import {
    FaArrowLeft, FaBuilding, FaCalendarAlt
} from 'react-icons/fa';

const InterviewHistory = ({ onBack }) => {
    const { t, language } = useLanguage();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/interview/history', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setHistory(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch history", err);
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const chartData = history.slice().reverse().map(h => ({
        date: new Date(h.date).toLocaleDateString(language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US', { month: 'short', day: 'numeric' }),
        score: h.score || h.scores?.overall || 0
    }));

    if (loading) return <div className="spinner"></div>;

    return (
        <div className="interview-history animate-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <button className="btn-outline" onClick={onBack} style={{ padding: '0.6rem 1rem' }}>
                    <FaArrowLeft /> {t('interview.back')}
                </button>
                <h2 style={{ margin: 0 }}>{t('interview.historyAnalytics')}</h2>
            </div>

            {history.length > 0 ? (
                <>
                    <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: '3rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>{t('interview.improvementTrend')}</h3>
                        <div style={{ width: '100%', height: '200px' }}>
                            <ResponsiveContainer>
                                <LineChart data={chartData}>
                                    <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis hide domain={[0, 100]} />
                                    <Tooltip
                                        contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                                        labelStyle={{ color: 'var(--text-main)', fontWeight: 700 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="var(--primary)"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: 'var(--primary)' }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="history-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {history.map((item) => (
                            <div key={item.id} style={{
                                display: 'grid',
                                gridTemplateColumns: 'auto 1fr auto auto',
                                alignItems: 'center',
                                gap: '1.5rem',
                                padding: '1.25rem 2rem',
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-md)',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }} className="history-item-hover">
                                <div style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                                    <FaBuilding />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{item.company}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.role} • {item.type}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <FaCalendarAlt /> {new Date(item.date).toLocaleDateString(language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US')}
                                    </div>
                                </div>
                                <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                                    <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>{item.score || item.scores?.overall}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '2px' }}>/100</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>{t('interview.noHistory')}</p>
                </div>
            )}
        </div>
    );
};

export default InterviewHistory;
