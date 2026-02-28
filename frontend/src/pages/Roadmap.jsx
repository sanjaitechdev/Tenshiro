import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaCircle, FaExternalLinkAlt, FaRocket, FaLightbulb, FaCode, FaCheck, FaCalendarAlt } from 'react-icons/fa';

import { useLanguage } from '../context/LanguageContext';

const Roadmap = () => {
    const { roleId } = useParams();
    const { t } = useLanguage();
    const [roleData, setRoleData] = useState(null);
    const [roadmap, setRoadmap] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('map'); // 'map' or 'timeline'
    const [generating, setGenerating] = useState(false);
    const [duration, setDuration] = useState('1 Month');
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Role Details for the center hub
                const roleRes = await axios.get(`/api/roles/${roleId}`);
                setRoleData(roleRes.data);

                // Fetch Roadmap data
                const roadmapRes = await axios.get(`/api/roles/${roleId}/roadmap`);
                setRoadmap(roadmapRes.data);
            } catch (err) {
                console.error(err);
                // Fallback for demo if needed
                setRoadmap([
                    {
                        id: 1, title: 'Foundations', description: 'Master the basics',
                        tasks: [{ id: 101, title: 'Core Concepts', description: 'Understand the fundamentals' }]
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };
        if (roleId) fetchData();
    }, [roleId]);

    const handleGenerateAIPlan = async () => {
        setGenerating(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/ai/roadmap',
                { role: roleData.title, duration },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setRoadmap(res.data);
            setViewMode('timeline');
        } catch (err) {
            console.error("AI Generation Failed:", err);
            alert("Could not generate AI plan. Using default roadmap.");
        } finally {
            setGenerating(false);
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div className="loader">{t('roadmap.loadingPath')}</div>
        </div>
    );

    return (
        <div className="roadmap-container" ref={containerRef} style={{
            position: 'relative',
            padding: '4rem 2rem',
            minHeight: '100vh',
            background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
            overflow: 'hidden'
        }}>
            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                @keyframes pulse-glow {
                    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
                    70% { box-shadow: 0 0 0 20px rgba(99, 102, 241, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
                }
                .node-connector {
                    pointer-events: none;
                    z-index: 0;
                }
                .mindmap-node {
                    z-index: 2;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    background: var(--bg-glass);
                    border: 1px solid var(--border);
                    backdrop-filter: blur(12px);
                }
                .mindmap-node:hover {
                    transform: scale(1.05) translateY(-5px);
                    border-color: var(--primary);
                    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
                }
                .hub-node {
                    animation: float 6s ease-in-out infinite, pulse-glow 3s infinite;
                    background: linear-gradient(135deg, var(--primary), var(--accent));
                    color: white;
                    width: 180px;
                    height: 180px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    text-align: center;
                    margin: 0 auto 4rem;
                    position: relative;
                }
                .phase-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 3rem;
                    position: relative;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .task-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.75rem;
                    border-radius: var(--radius-sm);
                    background: rgba(255, 255, 255, 0.03);
                    margin-bottom: 0.5rem;
                    transition: all 0.2s;
                }
                .task-item:hover {
                    background: rgba(255, 255, 255, 0.07);
                    transform: translateX(5px);
                }
                `}
            </style>

            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to={`/roles/${roleId}`} style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    &larr; {t('roles.backTo', { role: roleData?.title || 'Details' })}
                </Link>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* Duration Select */}
                    <div style={{ position: 'relative' }}>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            style={{
                                appearance: 'none',
                                background: 'var(--bg-card)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border)',
                                padding: '0.5rem 2rem 0.5rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 500,
                                outline: 'none'
                            }}
                        >
                            <option value="1 Month">1 Month</option>
                            <option value="2 Months">2 Months</option>
                            <option value="3 Months">3 Months</option>
                            <option value="4 Months">4 Months</option>
                            <option value="6 Months">6 Months</option>
                        </select>
                        <div style={{
                            position: 'absolute',
                            right: '0.75rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            color: 'var(--text-muted)',
                            fontSize: '0.8rem'
                        }}>▼</div>
                    </div>

                    {/* AI Generate Button */}
                    <button
                        onClick={handleGenerateAIPlan}
                        disabled={generating}
                        style={{
                            background: generating ? 'var(--text-muted)' : 'linear-gradient(135deg, #FFD700, #FFA500)',
                            color: 'black',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: generating ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
                        }}
                    >
                        {generating ? t('roadmap.crafting') : <><FaRocket /> {t('roadmap.generateAI')}</>}
                    </button>

                    {/* View Toggle */}
                    <div style={{ background: 'var(--bg-card)', padding: '0.25rem', borderRadius: '12px', display: 'flex', border: '1px solid var(--border)' }}>
                        <button
                            onClick={() => setViewMode('map')}
                            style={{
                                background: viewMode === 'map' ? 'var(--primary)' : 'transparent',
                                color: viewMode === 'map' ? 'white' : 'var(--text-muted)',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                transition: 'all 0.2s',
                                fontWeight: 500
                            }}
                        >
                            <FaRocket /> {t('roadmap.visualMap')}
                        </button>
                        <button
                            onClick={() => setViewMode('timeline')}
                            style={{
                                background: viewMode === 'timeline' ? 'var(--primary)' : 'transparent',
                                color: viewMode === 'timeline' ? 'white' : 'var(--text-muted)',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                transition: 'all 0.2s',
                                fontWeight: 500
                            }}
                        >
                            <FaCalendarAlt /> {t('roadmap.timetable')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Central Hub (Only for Map View) */}
            {
                viewMode === 'map' && (
                    <div className="hub-node card">
                        <FaRocket style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
                        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{roleData?.title || 'Leveling Up'}</h2>
                        <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Master Your Path</p>
                    </div>
                )
            }

            {/* Content Area */}
            {
                viewMode === 'map' ? (
                    // --- VISUAL MINDMAP VIEW ---
                    <div className="phase-grid">
                        {roadmap.map((phase, idx) => (
                            <div key={phase.id} className="mindmap-node card" style={{
                                position: 'relative',
                                marginTop: idx % 2 === 0 ? '0' : '2rem', // Stagger effect
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-15px',
                                    left: '20px',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    padding: '2px 12px',
                                    borderRadius: 'full',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold',
                                    zIndex: 3
                                }}>
                                    PHASE {idx + 1}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '10px',
                                        background: 'rgba(99, 102, 241, 0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--primary)'
                                    }}>
                                        {idx % 2 === 0 ? <FaLightbulb /> : <FaCode />}
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{phase.title}</h3>
                                </div>

                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                    {phase.description}
                                </p>

                                <div className="tasks-container">
                                    {phase.tasks.map(task => (
                                        <div key={task.id} className="task-item">
                                            <div style={{
                                                width: '24px', height: '24px', borderRadius: '50%',
                                                border: '2px solid var(--border)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '0.6rem', color: 'var(--success)'
                                            }}>
                                                {/* Mock completion state */}
                                                {task.id % 3 === 0 && <FaCheck />}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{task.title}</span>
                                                    {task.resource_link && (
                                                        <a href={task.resource_link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                                                            <FaExternalLinkAlt size={10} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Decorative branch line pointing towards center */}
                                <div style={{
                                    position: 'absolute',
                                    width: '2px',
                                    height: '40px',
                                    background: 'linear-gradient(to top, var(--primary), transparent)',
                                    top: '-40px',
                                    left: '50%',
                                    display: window.innerWidth > 768 ? 'block' : 'none'
                                }} />
                            </div>
                        ))}
                    </div>
                ) : (
                    // --- TIMETABLE VIEW ---
                    <div style={{ maxWidth: '900px', margin: '0 auto', background: 'var(--bg-secondary)', borderRadius: '16px', padding: '2rem', border: '1px solid var(--border)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t('roadmap.schedule')}</h2>
                            <p style={{ color: 'var(--text-muted)' }}>A structured {duration} plan to become a {roleData?.title}</p>
                        </div>

                        <div className="timetable-wrapper">
                            {roadmap.map((phase, idx) => (
                                <div key={phase.id} className="timetable-week" style={{ marginBottom: '2rem', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                                    <div style={{
                                        padding: '1rem 1.5rem',
                                        borderBottom: '1px solid var(--border)',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        background: 'rgba(99, 102, 241, 0.05)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                background: 'var(--primary)', color: 'white',
                                                padding: '0 0.5rem', height: '32px', minWidth: '32px', borderRadius: '8px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
                                                fontSize: '0.8rem'
                                            }}>
                                                P{idx + 1}
                                            </div>
                                            <div>
                                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{phase.title}</h3>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{phase.description} • {phase.duration}</span>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500 }}>
                                            {phase.tasks.length} Tasks
                                        </div>
                                    </div>

                                    <div style={{ padding: '0.5rem 0' }}>
                                        {phase.tasks.map((task, tIdx) => (
                                            <div key={task.id} style={{
                                                padding: '0.75rem 1.5rem',
                                                borderBottom: tIdx !== phase.tasks.length - 1 ? '1px solid var(--border-light)' : 'none',
                                                display: 'flex', alignItems: 'center', gap: '1rem',
                                                transition: 'background 0.2s'
                                            }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <div style={{
                                                    minWidth: '60px', fontSize: '0.75rem', color: 'var(--text-muted)',
                                                    fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px'
                                                }}>
                                                    Day {Math.floor(tIdx * 1.5) + 1}-{Math.floor(tIdx * 1.5) + 2}
                                                </div>

                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }} />
                                                        <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{task.title}</span>
                                                    </div>
                                                    <p style={{ margin: '0.25rem 0 0 1.8rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                        {task.description || 'Complete this module to progress.'}
                                                    </p>
                                                    {task.resource_link && (
                                                        <a href={task.resource_link} target="_blank" rel="noopener noreferrer"
                                                            style={{
                                                                padding: '0.4rem 0.8rem', borderRadius: '6px',
                                                                background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)',
                                                                fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500
                                                            }}>
                                                            {t('roadmap.start')}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <button style={{
                                background: 'var(--primary)', color: 'white', border: 'none',
                                padding: '0.75rem 2rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 600,
                                cursor: 'pointer', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                            }}
                                onClick={() => alert("Calendar Sync coming soon!")}>
                                {t('roadmap.syncCalendar')}
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Roadmap;
