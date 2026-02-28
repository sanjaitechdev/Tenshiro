import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
    FaGraduationCap, FaRocket, FaLightbulb, FaGoogle, FaShieldAlt,
    FaChartLine, FaSearch, FaUserGraduate, FaChevronRight,
    FaGlobe, FaCrosshairs, FaMicrochip, FaRobot, FaBriefcase, FaCheckCircle, FaStar, FaQuoteLeft
} from 'react-icons/fa';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import AccountSelector from '../components/AccountSelector';

const Landing = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isAccountPickerOpen, setIsAccountPickerOpen] = useState(false);
    const { user, login, logout, loginWithToken } = useAuth();
    const navigate = useNavigate();
    const { t } = useLanguage();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/domains');

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const handleGoogleLogin = () => {
        setIsAccountPickerOpen(true);
    };

    const onSelectAccount = async (account) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/dev-login', {
                email: account.email,
                username: account.name
            });
            const { token, user: userData } = res.data;

            if (token && userData) {
                loginWithToken(token, userData);
                navigate('/domains');
            }
        } catch (err) {
            console.error('Dev profile selection failed:', err);
            setIsAccountPickerOpen(false);
        }
    };

    return (
        <div className="landing-page">
            <Navbar onToggleSidebar={() => { }} />

            {/* Animated Background Layers */}
            <div className="bg-layers">
                <div className="grid-overlay" />
                <div className="noise-overlay" />
                <div className="gradient-mesh" />

                {/* Floating Particles/Blobs */}
                <Motion.div
                    animate={{
                        x: mousePos.x * 0.03,
                        y: mousePos.y * 0.03,
                        rotate: 360,
                    }}
                    transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" } }}
                    className="blob blob-gold"
                    style={{ width: '800px', height: '800px', background: 'var(--primary)', top: '-10%', left: '-5%', position: 'absolute', borderRadius: '50%', filter: 'blur(120px)', opacity: '0.1' }}
                />
                <Motion.div
                    animate={{
                        x: mousePos.x * -0.02,
                        y: mousePos.y * -0.02,
                        rotate: -360,
                    }}
                    transition={{ rotate: { duration: 45, repeat: Infinity, ease: "linear" } }}
                    className="blob blob-silver"
                    style={{ width: '600px', height: '600px', background: 'var(--accent)', bottom: '-5%', right: '-5%', position: 'absolute', borderRadius: '50%', filter: 'blur(120px)', opacity: '0.1' }}
                />
            </div>

            <main className="landing-main">
                {/* HERO SECTION */}
                <section id="home" className="hero-section-ultimate">
                    <div className="hero-container">
                        <div className="hero-content-grid">
                            <div className="hero-text-area">
                                <Motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="hero-badge-refined">
                                        <FaMicrochip className="badge-icon" />
                                        <span>{t('landing.heroBadge')}</span>
                                    </div>

                                    <h1 className="hero-headline-strategic">
                                        <span style={{ display: 'block' }}>{t('landing.heroTitle1')}</span>
                                        <span className="text-gold-accent" style={{ display: 'block', color: 'var(--primary)' }}>{t('landing.heroTitle2')}</span>
                                    </h1>

                                    <p className="hero-subtext-strategic">
                                        {t('landing.heroSubtext')}
                                    </p>

                                    <div className="hero-actions-refined">
                                        {/* Buttons removed per user request */}
                                    </div>
                                </Motion.div>
                            </div>

                            <div className="hero-mockup-area">
                                <Motion.div
                                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    className="login-card-advanced"
                                >
                                    <h2>{t('auth.welcome')}</h2>
                                    <form onSubmit={handleLogin} className="login-form-advanced">
                                        <div className="form-group-advanced">
                                            <label>{t('auth.email')}</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={t('auth.emailPlaceholder')}
                                                required
                                            />
                                        </div>
                                        <div className="form-group-advanced">
                                            <label>{t('auth.password')}</label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder={t('auth.passwordPlaceholder')}
                                                required
                                            />
                                        </div>
                                        <div className="forgot-password-advanced">
                                            <Link to="/forgot-password">{t('auth.forgotPassword')}</Link>
                                        </div>
                                        {error && <div className="error-message-advanced">{error}</div>}
                                        <button type="submit" className="login-submit-advanced">
                                            {t('auth.login')}
                                        </button>
                                    </form>
                                    <div className="divider-advanced">
                                        <span>{t('auth.or')}</span>
                                    </div>
                                    <button onClick={handleGoogleLogin} className="google-login-advanced">
                                        <FaGoogle style={{ marginRight: '8px' }} /> {t('auth.loginWithGoogle')}
                                    </button>
                                    <div className="login-footer-advanced">
                                        {t('auth.noAccount')}
                                    </div>
                                </Motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 2 - CORE ENGINE */}
                <section id="platform" className="section-core-engine">
                    <div className="section-header-refined">
                        <h2 className="title-strategic">{t('landing.engineTitle')}</h2>
                    </div>
                    <div className="engine-grid-refined">
                        {[
                            { title: t('landing.engineCard1Title'), icon: <FaCrosshairs />, desc: t('landing.engineCard1Desc') },
                            { title: t('landing.engineCard2Title'), icon: <FaRocket />, desc: t('landing.engineCard2Desc') },
                            { title: t('landing.engineCard3Title'), icon: <FaChartLine />, desc: t('landing.engineCard3Desc') },
                            { title: t('landing.engineCard4Title'), icon: <FaRobot />, desc: t('landing.engineCard4Desc') }
                        ].map((card, i) => (
                            <Motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="glass-card-engine"
                            >
                                <div className="engine-icon-box">{card.icon}</div>
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
                            </Motion.div>
                        ))}
                    </div>
                </section>

                {/* SECTION 3 - HOW IT WORKS */}
                <section id="intelligence" className="section-how-works">
                    <div className="section-header-refined">
                        <h2 className="title-strategic">{t('landing.stepsTitle')}</h2>
                    </div>
                    <div className="horizontal-steps-layout">
                        {[
                            { step: "01", label: t('landing.step1Label'), title: t('landing.step1Title'), text: t('landing.step1Desc') },
                            { step: "02", label: t('landing.step2Label'), title: t('landing.step2Title'), text: t('landing.step2Desc') },
                            { step: "03", label: t('landing.step3Label'), title: t('landing.step3Title'), text: t('landing.step3Desc') }
                        ].map((step, i) => (
                            <div key={i} className="step-horizontal-item">
                                <div className="step-indicator">
                                    <div className="step-circle">{step.step}</div>
                                    {i < 2 && <div className="step-line-connector" />}
                                </div>
                                <div className="step-content-refined">
                                    <span className="step-tag">{step.label}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 4 - PLATFORM POSITIONING */}
                <section id="roadmaps" className="section-pos-os">
                    <div className="section-header-refined">
                        <h2 className="title-strategic">{t('landing.osTitle')}</h2>
                    </div>
                    <div className="os-columns-grid">
                        <div className="os-column">
                            <h3 className="os-label">{t('landing.osLayer1Title')}</h3>
                            <p className="os-desc">{t('landing.osLayer1Desc')}</p>
                        </div>
                        <div className="os-column bordered">
                            <h3 className="os-label">{t('landing.osLayer2Title')}</h3>
                            <p className="os-desc">{t('landing.osLayer2Desc')}</p>
                        </div>
                        <div className="os-column">
                            <h3 className="os-label">{t('landing.osLayer3Title')}</h3>
                            <p className="os-desc">{t('landing.osLayer3Desc')}</p>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA SECTION */}
                <section className="section-ultimate-cta">
                    <div className="cta-gradient-wave">
                        <div className="cta-inner-content">
                            <h2 className="cta-headline-strategic">{t('landing.ctaTitle')}</h2>
                        </div>
                    </div>
                </section>

            </main>

            <footer className="minimal-footer-strategic">
                <div className="footer-top-line" />
                <div className="footer-content">
                    <p>{t('landing.footerText')}</p>
                </div>
            </footer>

            <style>{`
            .landing-page {
                position: relative;
                width: 100%;
                min-height: 100vh;
                background: var(--bg-primary);
                color: var(--text-main);
                overflow-x: hidden;
                display: flex;
                flex-direction: column;
                padding-top: var(--header-height);
                font-family: 'Plus Jakarta Sans', sans-serif;
                transition: background 0.5s ease;
            }

            /* --- BACKGROUND SYSTEM --- */
            .bg-layers { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
            .grid-overlay {
                position: absolute; inset: 0;
                background-image: 
                    linear-gradient(var(--border) 1px, transparent 1px),
                    linear-gradient(90deg, var(--border) 1px, transparent 1px);
                background-size: 60px 60px; opacity: 0.05;
                mask-image: radial-gradient(circle at center, black, transparent 80%);
            }
            .noise-overlay {
                position: absolute; inset: 0; opacity: 0.03;
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            }
            .blob { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.1; }
            .blob-gold { width: 800px; height: 800px; background: var(--primary); top: -10%; left: -5%; }
            .blob-silver { width: 600px; height: 600px; background: var(--accent); bottom: -5%; right: -5%; }

            /* --- LAYOUT --- */
            .landing-main { position: relative; z-index: 10; width: 100%; max-width: 1400px; margin: 0 auto; padding: 0 4rem; }

            /* --- HERO SECTION --- */
            .hero-section-ultimate { 
                min-height: auto; 
                display: flex; 
                align-items: center; 
                padding: 40px 24px 70px;
                margin-top: 0;
            }
            .hero-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 24px;
                width: 100%;
                min-height: 85vh;
                display: grid;
                align-items: center;
            }
            .hero-content-grid { 
                display: grid; 
                grid-template-columns: 1.1fr 0.9fr; 
                gap: 4rem; 
                align-items: center; 
                width: 100%; 
            }

            .hero-badge-refined {
                display: inline-flex; align-items: center; gap: 0.75rem;
                padding: 0.6rem 1.25rem; background: var(--bg-glass);
                border: 1px solid var(--border); border-radius: 100px;
                font-size: 0.85rem; font-weight: 700; color: var(--primary);
                margin-bottom: 18px; box-shadow: var(--shadow);
            }
            .badge-icon { filter: drop-shadow(0 0 8px var(--primary-glow)); }

            .hero-headline-strategic {
                font-size: clamp(2.5rem, 4vw, 3.8rem); line-height: 1.1;
                font-weight: 800; letter-spacing: -0.04em; margin-bottom: 20px;
            }
            .text-neon-glow {
                color: var(--primary);
                filter: drop-shadow(0 0 10px var(--primary-glow));
            }

            .hero-subtext-strategic {
                font-size: 1.15rem; line-height: 1.6; color: var(--text-muted);
                max-width: 550px; margin-bottom: 28px;
            }

            .hero-actions-refined { display: flex; gap: 1.25rem; align-items: center; margin-top: 20px; }
            .btn-cta-primary {
                background: linear-gradient(135deg, var(--primary), var(--accent));
                color: white; padding: 1.1rem 2.5rem; border-radius: 16px;
                font-weight: 800; text-decoration: none; font-size: 1.1rem;
                box-shadow: 0 20px 40px -10px var(--primary-glow);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .btn-cta-primary:hover {
                transform: translateY(-4px);
                box-shadow: 0 25px 50px -12px var(--primary-glow);
            }
            .btn-cta-secondary {
                background: transparent; color: var(--text-main);
                padding: 1.1rem 2.2rem; border-radius: 16px;
                border: 1.5px solid var(--border); font-weight: 800;
                font-size: 1.1rem; cursor: pointer; transition: all 0.3s;
            }
            .btn-cta-secondary:hover { background: var(--bg-glass); border-color: var(--text-main); }

            /* --- LOGIN CARD --- */
            .login-card-advanced {
                background: var(--bg-glass); backdrop-filter: blur(40px);
                border: 1px solid var(--border); border-radius: 28px;
                padding: 3rem 2.5rem; width: 100%; max-width: 420px;
                box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5);
                margin-left: auto;
                margin-top: 0;
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            .login-card-advanced h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -0.03em; text-align: center; }
            .login-form-advanced { display: flex; flex-direction: column; gap: 1.25rem; }
            .form-group-advanced { display: flex; flex-direction: column; gap: 0.6rem; }
            .form-group-advanced label { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }
            .form-group-advanced input {
                padding: 1rem 1.25rem; border-radius: 14px; border: 1.5px solid var(--border);
                background: white; color: #0f172a; font-size: 1rem;
                transition: all 0.3s;
            }
            .form-group-advanced input:focus { border-color: var(--primary); outline: none; background: var(--bg-card); }
            .forgot-password-advanced { text-align: right; margin-top: -0.5rem; }
            .forgot-password-advanced a { font-size: 0.85rem; color: var(--primary); text-decoration: none; font-weight: 600; }
            .login-submit-advanced {
                background: linear-gradient(135deg, var(--primary), var(--accent));
                color: white; padding: 1.1rem; border-radius: 14px; border: none;
                font-size: 1.05rem; font-weight: 800; cursor: pointer;
                box-shadow: 0 20px 40px -10px var(--primary-glow);
                transition: all 0.3s ease;
            }
            .login-submit-advanced:hover { transform: translateY(-2px); box-shadow: 0 25px 50px -12px var(--primary-glow); }
            
            .divider-advanced { position: relative; text-align: center; margin: 0.5rem 0; }
            .divider-advanced::before { content: ''; position: absolute; left: 0; top: 50%; width: 100%; height: 1px; background: var(--border); opacity: 0.5; }
            .divider-advanced span { position: relative; background: var(--bg-primary); padding: 0 1rem; font-size: 0.8rem; font-weight: 700; color: var(--text-low); }
            
            .google-login-advanced {
                display: flex; align-items: center; justify-content: center; gap: 0.75rem;
                padding: 1rem; border-radius: 14px; border: 1.5px solid var(--border);
                background: var(--bg-glass); color: var(--text-main); font-size: 1rem;
                font-weight: 700; cursor: pointer; transition: all 0.3s;
                width: 100%; max-width: 280px; margin: 0 auto;
            }
            .google-login-advanced:hover { background: var(--bg-secondary); border-color: var(--text-main); }
            
            .login-footer-advanced { margin-top: 0.5rem; text-align: center; font-size: 0.9rem; color: var(--text-muted); font-weight: 500; }
            .login-footer-advanced a { color: var(--primary); text-decoration: none; font-weight: 700; }
            .error-message-advanced { color: var(--danger); font-size: 0.85rem; font-weight: 600; text-align: center; background: rgba(239, 68, 68, 0.1); padding: 0.6rem; border-radius: 10px; }

            /* --- SECTIONS COMMON --- */
            .section-header-refined { text-align: center; margin-bottom: 6rem; }
            .title-strategic { font-size: 3.2rem; font-weight: 800; letter-spacing: -0.03em; }

            /* --- SECTION 2: ENGINE --- */
            .section-core-engine { padding: 10rem 0; }
            .engine-grid-refined { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
            .glass-card-engine {
                padding: 3rem 2rem; background: var(--bg-glass); border: 1px solid var(--border); 
                border-radius: 28px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .glass-card-engine:hover { 
                border-color: var(--primary); background: rgba(99, 102, 241, 0.05);
                transform: translateY(-8px);
                box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
            }
            .engine-icon-box { 
                width: 60px; height: 60px; background: var(--primary); 
                border-radius: 16px; display: flex; align-items: center; justify-content: center; 
                color: white; font-size: 1.8rem; margin-bottom: 2rem; 
                box-shadow: 0 10px 20px var(--primary-glow);
            }
            .glass-card-engine h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 1.25rem; letter-spacing: -0.02em; }
            .glass-card-engine p { font-size: 1.05rem; color: var(--text-muted); line-height: 1.6; }

            /* --- SECTION 3: HOW IT WORKS --- */
            .section-how-works { padding: 10rem 0; }
            .horizontal-steps-layout { display: flex; gap: 4rem; position: relative; }
            .step-horizontal-item { flex: 1; display: flex; flex-direction: column; gap: 2rem; }
            .step-indicator { display: flex; align-items: center; gap: 1rem; position: relative; }
            .step-circle { 
                width: 48px; height: 48px; border-radius: 50%; background: var(--primary);
                display: flex; align-items: center; justify-content: center;
                color: white; font-weight: 800; font-size: 1.2rem; position: relative; z-index: 2;
                box-shadow: 0 0 20px var(--primary-glow); font-family: 'Outfit';
            }
            .step-line-connector {
                flex: 1; height: 2px; background: linear-gradient(to right, var(--primary), var(--accent));
                opacity: 0.3; margin-left: 0.5rem;
            }
            .step-content-refined { display: flex; flex-direction: column; gap: 0.75rem; }
            .step-tag { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--primary); letter-spacing: 0.1em; }
            .step-content-refined h3 { font-size: 1.6rem; font-weight: 800; }
            .step-content-refined p { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; }

            /* --- SECTION 4: PLATFORM OS --- */
            .section-pos-os { padding: 10rem 0; }
            .os-columns-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid var(--border); border-radius: 40px; overflow: hidden; background: var(--bg-glass); }
            .os-column { padding: 5rem 3rem; text-align: center; }
            .os-column.bordered { border-left: 1px solid var(--border); border-right: 1px solid var(--border); background: var(--bg-secondary); }
            .os-label { font-size: 1.8rem; font-weight: 800; margin-bottom: 1.5rem; background: linear-gradient(to right, var(--text-main), var(--text-muted)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
            .os-desc { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; max-width: 250px; margin: 0 auto; }

            /* --- FINAL CTA --- */
            .section-ultimate-cta { padding: 12rem 0; }
            .cta-gradient-wave {
                padding: 10rem 4rem; border-radius: 60px;
                background: rgba(212, 175, 55, 0.05);
                border: 1px solid var(--border); text-align: center; backdrop-filter: blur(20px);
                position: relative; overflow: hidden;
            }
            .cta-headline-strategic { font-size: 4rem; font-weight: 800; margin-bottom: 4rem; letter-spacing: -0.04em; }
            .btn-launch-final {
                display: inline-block; padding: 1.5rem 5rem; background: var(--text-main); color: var(--bg-primary);
                text-decoration: none; border-radius: 24px; font-weight: 800; font-size: 1.5rem;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .btn-launch-final:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 40px 80px -20px rgba(0,0,0,0.3); }

            /* --- FOOTER --- */
            .minimal-footer-strategic { padding: 4rem 4rem; }
            .footer-top-line { height: 1px; background: var(--border); margin-bottom: 3rem; }
            .footer-content { color: var(--text-low); font-weight: 600; font-size: 0.9rem; text-align: center; }

            @media (max-width: 992px) {
                .hero-content-grid { 
                    grid-template-columns: 1fr; 
                    text-align: center; 
                    gap: 3rem; 
                }
                .hero-text-area { display: flex; flex-direction: column; align-items: center; }
                .hero-subtext-strategic { margin-left: auto; margin-right: auto; }
                .login-card-advanced { margin: 40px auto 0; }
                .hero-section-ultimate { padding: 4rem 0; }
            }
            @media (max-width: 1200px) {
                .engine-grid-refined { grid-template-columns: repeat(2, 1fr); }
                .horizontal-steps-layout { flex-direction: column; gap: 3rem; }
                .os-columns-grid { grid-template-columns: 1fr; }
                .os-column.bordered { border: none; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
            }
            @media (max-width: 768px) {
                .landing-main { padding: 0 2rem; }
                .hero-headline-strategic { font-size: 2.5rem; }
                .engine-grid-refined { grid-template-columns: 1fr; }
                .cta-headline-strategic { font-size: 2.2rem; }
                .title-strategic { font-size: 2.2rem; }
            }
            `}</style>
            <AccountSelector
                isOpen={isAccountPickerOpen}
                onSelect={onSelectAccount}
                onClose={() => setIsAccountPickerOpen(false)}
            />
        </div>
    );
};

export default Landing;
