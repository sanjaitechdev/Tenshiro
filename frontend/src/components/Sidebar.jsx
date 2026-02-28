import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { FaCompass, FaHome, FaBriefcase, FaBrain, FaFileAlt, FaChartBar, FaUserCircle, FaMicrophone, FaBookOpen, FaRobot } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    // Only show sidebar on dashboard pages
    if (['/login', '/register', '/'].includes(location.pathname)) return null;

    const menuItems = [
        { path: '/domains', icon: <FaCompass />, label: t('navbar.domains') },
        { path: '/jobs-internships', icon: <FaBriefcase />, label: t('sidebar.jobs') },
        { path: '/aptitude', icon: <FaBrain />, label: t('sidebar.aptitude') },
        { path: '/resume', icon: <FaFileAlt />, label: t('sidebar.resume') },
        { path: '/interview', icon: <FaMicrophone />, label: t('sidebar.interview') },
        { path: '/interview-prep', icon: <FaBookOpen />, label: t('sidebar.interviewPrep') },
        { path: '/ai-assistant', icon: <FaRobot />, label: "AI Interview Assistant" },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 40,
                        backdropFilter: 'blur(4px)',
                        transition: 'opacity 0.3s ease'
                    }}
                />
            )}

            <aside className={`sidebar ${isOpen ? 'open' : ''}`} style={{
                width: 'var(--sidebar-width)',
                height: 'calc(100vh - var(--header-height))',
                borderRight: '1px solid var(--border)',
                padding: '1.5rem 0.75rem',
                backgroundColor: 'var(--bg-surface)',
                position: 'fixed',
                top: 'var(--header-height)',
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {/* User Profile Section */}
                    {user && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 0.85rem',
                            marginBottom: '1rem',
                            background: 'var(--bg-secondary)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)'
                        }}>
                            <FaUserCircle style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    {user.username}
                                </span>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t('sidebar.proMember')}</span>
                            </div>
                        </div>
                    )}

                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose} // Close sidebar on nav
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.65rem',
                                padding: '0.65rem 0.85rem',
                                borderRadius: 'var(--radius-md)',
                                textDecoration: 'none',
                                color: isActive(item.path) ? 'white' : 'var(--text-muted)',
                                backgroundColor: isActive(item.path) ? 'var(--primary)' : 'transparent',
                                fontWeight: 600,
                                transition: 'all 0.2s'
                            }}
                        >
                            <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>

                <div style={{
                    padding: '0.75rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border)'
                }}>
                    <p>© 2024 Tenshiro</p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
