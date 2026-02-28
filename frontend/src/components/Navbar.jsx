import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { FaGraduationCap, FaUserCircle, FaBars, FaSun, FaMoon, FaGlobe } from 'react-icons/fa';

const Navbar = ({ onToggleSidebar }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { t, language, setLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar" style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 3rem',
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 100,
            backgroundColor: 'var(--bg-glass)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border)',
            boxShadow: '0 4px 20px -5px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {user && (
                    <button
                        className="btn-icon mobile-only"
                        onClick={onToggleSidebar}
                        style={{
                            background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1.25rem', cursor: 'pointer',
                            display: 'none' // Hidden by default, shown in media query
                        }}
                    >
                        <FaBars />
                    </button>
                )}

                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', color: 'var(--text-main)', fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-0.03em' }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', padding: '0.5rem', borderRadius: '12px', display: 'flex', boxShadow: '0 4px 12px var(--primary-glow)' }}>
                        <FaGraduationCap size={22} color="white" />
                    </div>
                    <span className="text-gradient" style={{ filter: 'drop-shadow(0 0 10px var(--primary-glow))' }}>Tenshiro</span>
                </Link>
            </div>

            <div style={{ display: "none" }} className="nav-center landing-only">
                <a href="#home" className="nav-link-premium">{t('navbar.dashboard')}</a>
                <a href="#platform" className="nav-link-premium">{t('navbar.domains')}</a>
                <a href="#intelligence" className="nav-link-premium">{t('roles.guidance')}</a>
                <a href="#roadmaps" className="nav-link-premium">{t('roles.roadmap')}</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <button
                    onClick={toggleTheme}
                    className="btn-icon"
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                >
                    {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
                </button>

                <div className="lang-switcher-container">
                    <FaGlobe size={14} className="globe-icon" />
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="lang-select-premium"
                    >
                        <option value="en">English</option>
                        <option value="ta">தமிழ்</option>
                        <option value="hi">हिन्दी</option>
                    </select>
                </div>

                {user ? (
                    <button onClick={handleLogout} className="btn-nav-outline" style={{ cursor: 'pointer', background: 'transparent' }}>
                        {t('navbar.logout')}
                    </button>
                ) : (
                    <Link to="/register" className="btn-nav-gradient">
                        {t('auth.register')}
                    </Link>
                )}
            </div>

            <style>{`
                .nav-link-premium {
                    color: var(--text-low);
                    text-decoration: none;
                    font-size: 0.95rem;
                    font-weight: 600;
                    position: relative;
                    transition: color 0.3s;
                }
                .nav-link-premium:hover { color: var(--text-high); }
                .nav-link-premium::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: var(--primary);
                    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .nav-link-premium:hover::after { width: 100%; }

                .lang-switcher-container {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border);
                    padding: 0 0.75rem;
                    border-radius: 12px;
                    transition: all 0.3s;
                }
                .lang-switcher-container:hover {
                    border-color: var(--primary);
                    box-shadow: 0 0 10px var(--primary-glow);
                }
                .globe-icon { color: var(--text-muted); }
                .lang-select-premium {
                    background: transparent;
                    border: none;
                    color: var(--text-main);
                    padding: 0.6rem 0;
                    font-weight: 600;
                    font-size: 0.85rem;
                    cursor: pointer;
                    outline: none;
                }
                .lang-select-premium option {
                    background: var(--bg-secondary);
                    color: var(--text-main);
                }

                .btn-nav-outline {
                    border: 1.5px solid var(--primary);
                    color: var(--primary);
                    padding: 0.6rem 1.5rem;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.9rem;
                    transition: all 0.3s;
                }
                .btn-nav-outline:hover {
                    background: var(--primary);
                    color: white;
                    box-shadow: 0 5px 15px var(--primary-glow);
                }

                .btn-nav-gradient {
                    background: linear-gradient(135deg, var(--primary), var(--accent));
                    color: white;
                    padding: 0.6rem 1.7rem;
                    border-radius: 100px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.9rem;
                    box-shadow: 0 10px 20px -5px var(--primary-glow);
                    transition: all 0.3s;
                }
                .btn-nav-gradient:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px -5px rgba(99, 102, 241, 0.5);
                }

                @media (max-width: 900px) {
                    .nav-center { display: none !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
