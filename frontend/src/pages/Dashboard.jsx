import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FaChartPie, FaCheckCircle, FaRocket } from 'react-icons/fa';

const Dashboard = () => {
    const { user } = useAuth();
    const { t } = useLanguage();

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {t('dashboard.welcome')} <span style={{ color: 'var(--primary)' }}>{user?.username}</span>
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>{t('dashboard.welcomeSub')}</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {/* Employability Score */}
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        border: '8px solid var(--primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem', fontWeight: 'bold'
                    }}>
                        45%
                    </div>
                    <div>
                        <h3>{t('dashboard.employability')}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{t('dashboard.employabilitySub')}</p>
                    </div>
                </div>

                {/* Next Move */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>
                        <FaRocket />
                        <h3>{t('dashboard.nextMove')}</h3>
                    </div>
                    <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>Complete "React Basics"</p>
                    <button className="btn btn-primary" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>{t('dashboard.startNow')}</button>
                </div>

                {/* Stats */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--success)' }}>
                        <FaChartPie />
                        <h3>{t('dashboard.stats')}</h3>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>{t('dashboard.tasksCompleted')}</span>
                        <strong>12/40</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{t('dashboard.projectsBuilt')}</span>
                        <strong>2</strong>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3>{t('dashboard.recentActivity')}</h3>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                    {[1, 2, 3].map((item) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                            <FaCheckCircle style={{ color: 'var(--success)' }} />
                            <span dangerouslySetInnerHTML={{ __html: t('dashboard.completedModule', { module: 'JavaScript ES6' }) }}></span>
                            <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('dashboard.daysAgo', { count: 2 })}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
