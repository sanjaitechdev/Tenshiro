import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    FaCode, FaBuilding, FaChartLine, FaCogs, FaPalette, FaBriefcase,
    FaRobot, FaArrowRight, FaHeartbeat, FaGavel, FaGlobe,
    FaDraftingCompass, FaSearch, FaFilter, FaLayerGroup, FaBolt, FaUsers, FaMapMarkedAlt, FaBrain
} from 'react-icons/fa';
import { motion as Motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
    'code': <FaCode />,
    'building': <FaBuilding />,
    'chart-line': <FaChartLine />,
    'cogs': <FaCogs />,
    'palette': <FaPalette />,
    'briefcase': <FaBriefcase />,
    'robot': <FaRobot />,
    'heartbeat': <FaHeartbeat />,
    'gavel': <FaGavel />,
    'globe': <FaGlobe />,
    'drafting-compass': <FaDraftingCompass />
};

const impactStatements = {
    'IT & Software': "Build scalable systems, AI applications, and digital platforms shaping the future economy.",
    'Government & Competitive Exams': "Secure leadership roles in civil services, banking, defense, and public administration.",
    'Commerce & Finance': "Master capital markets, analytics, and financial strategy for global impact.",
    'Core Engineering': "Design infrastructure, manufacturing systems, and high-performance hardware.",
    'Arts & Humanities': "Drive culture, communication, and behavioral insights across industries.",
    'Management & MBA': "Lead operations, growth strategy, and enterprise transformation."
};

const getDomainCategory = (name) => {
    const tech = ['IT & Software', 'Core Engineering', 'AI & Data Science', 'Cybersecurity'];
    const business = ['Commerce & Finance', 'Management & MBA', 'Marketing', 'Entrepreneurship'];
    const creative = ['Arts & Humanities', 'Design', 'Media', 'Fine Arts'];
    const social = ['Government & Competitive Exams', 'Law', 'Public Health', 'Education'];

    if (tech.includes(name)) return 'Technology';
    if (business.includes(name)) return 'Business';
    if (creative.includes(name)) return 'Creative';
    if (social.includes(name)) return 'Social';
    return 'Other';
};

const Domains = () => {
    const { t } = useLanguage();
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [growthFilter] = useState('All');

    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const res = await axios.get('/api/domains');
                // Ensure data has inferred properties for elite UI
                const enrichedData = res.data.map(d => ({
                    ...d,
                    category: getDomainCategory(d.name),
                    growthLevel: d.name.includes('IT') || d.name.includes('AI') ? 'High Demand' :
                        d.name.includes('Gov') ? 'Competitive' :
                            d.name.includes('Art') ? 'Emerging' : 'Stable'
                }));
                setDomains(enrichedData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDomains();
    }, []);

    const filteredDomains = domains.filter(domain => {
        const matchesSearch = domain.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || domain.category === selectedCategory;
        const matchesGrowth = growthFilter === 'All' || (domain.growthLevel || 'Stable') === growthFilter;
        return matchesSearch && matchesCategory && matchesGrowth;
    });

    if (loading) return (
        <div className="discovery-loader">
            <Motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="loader-spinner"
            />
        </div>
    );

    return (
        <div className="domains-discovery-page">
            <div className="discovery-bg-elements">
                <div className="discovery-blob blob-1" />
                <div className="discovery-blob blob-2" />
            </div>

            {/* HERO HEADER SECTION (Minimal) */}
            <header className="discovery-header-minimal">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hero-inner-minimal"
                >
                    <div className="hero-badge">
                        <FaLayerGroup />
                        <span>{t('domains.badge')}</span>
                    </div>
                    <h1 dangerouslySetInnerHTML={{ __html: t('domains.title') }}></h1>
                    <p>
                        {t('domains.subtitle')}
                    </p>
                </Motion.div>
            </header>

            {/* SEARCH BAR (No Filters) */}
            <div className="filter-system-container">
                <div className="search-bar-standalone">
                    <div className="search-box-premium">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder={t('domains.searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* DOMAIN CARDS GRID */}
            <div className="domain-grid-premium">
                {filteredDomains.map((domain, index) => (
                    <Motion.div
                        key={domain.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -6 }}
                        className="domain-card-elite"
                    >
                        <div className="card-gradient-border" />
                        <div className="card-top-content">
                            <div className="domain-icon-wrapper">
                                {iconMap[domain.icon] || <FaBriefcase />}
                            </div>
                            <div className="growth-badge-small" data-type={domain.growthLevel || 'High Demand'}>
                                <FaBolt className="bolt-icon" />
                                {t('domains.demand', { level: domain.growthLevel || 'High Demand' })}
                            </div>
                        </div>

                        <div className="card-body-elite">
                            <h3>{domain.name}</h3>
                            <p className="impact-statement">
                                {t(`domains.impact.${domain.name.toLowerCase().includes('it') ? 'it' :
                                    domain.name.toLowerCase().includes('gov') ? 'gov' :
                                        domain.name.toLowerCase().includes('fin') || domain.name.toLowerCase().includes('comm') ? 'finance' :
                                            domain.name.toLowerCase().includes('eng') ? 'core' :
                                                domain.name.toLowerCase().includes('art') ? 'arts' :
                                                    domain.name.toLowerCase().includes('manag') ? 'management' : 'it'}`, { defaultValue: impactStatements[domain.name] || domain.description.split('.')[0] + '.' })}
                            </p>
                        </div>

                        <div className="card-footer-elite">
                            <Link to={`/domains/${domain.id}`} className="explore-link-minimal">
                                <span>{t('domains.explorePathways')}</span>
                                <FaArrowRight />
                            </Link>
                        </div>
                    </Motion.div>
                ))}
            </div>

            {/* STATS STRIP SECTION */}
            <section className="premium-stats-strip">
                <div className="stats-grid-horizontal">
                    <div className="stat-card-minimal">
                        <FaMapMarkedAlt className="stat-icon" />
                        <div className="stat-info">
                            <h4>120+</h4>
                            <p>{t('domains.stats.roles')}</p>
                        </div>
                    </div>
                    <div className="stat-card-minimal">
                        <FaBolt className="stat-icon" />
                        <div className="stat-info">
                            <h4>45+</h4>
                            <p>{t('domains.stats.roadmaps')}</p>
                        </div>
                    </div>
                    <div className="stat-card-minimal">
                        <FaLayerGroup className="stat-icon" />
                        <div className="stat-info">
                            <h4>10+</h4>
                            <p>{t('domains.stats.highGrowth')}</p>
                        </div>
                    </div>
                    <div className="stat-card-minimal highlight">
                        <FaBrain className="stat-icon" />
                        <div className="stat-info">
                            <h4>{t('domains.stats.aiPowered')}</h4>
                            <p>{t('domains.stats.personalized')}</p>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                .domains-discovery-page {
                    position: relative;
                    padding: 20px 0 60px;
                    min-height: 100vh;
                    z-index: 1;
                }

                .discovery-bg-elements { position: fixed; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; }
                .discovery-blob { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.1; }
                .blob-1 { width: 500px; height: 500px; background: var(--primary); top: -100px; right: -100px; }
                .blob-2 { width: 400px; height: 400px; background: var(--accent); bottom: -50px; left: -100px; }

                /* HERO SECTION - MINIMAL */
                .discovery-header-minimal {
                    margin-bottom: 25px;
                    padding: 0 0 5px; /* Removed top padding to move badge up */
                }
                .hero-inner-minimal { max-width: 1200px; padding: 0 40px; }
                .hero-badge {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 5px 12px; background: rgba(99, 102, 241, 0.1);
                    border-radius: 100px; color: var(--primary); font-size: 0.8rem;
                    font-weight: 700; margin-bottom: 12px;
                    margin-top: -10px; /* Pulling badge up */
                }
                .discovery-header-minimal h1 { font-size: 2.8rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 10px; }
                .discovery-header-minimal p { 
                    font-size: 1.1rem; color: var(--text-muted); line-height: 1.5;
                    white-space: nowrap; /* Force single line */
                    border-left: 2px solid var(--primary);
                    padding-left: 15px;
                    background: linear-gradient(90deg, rgba(99, 102, 241, 0.05), transparent);
                    display: inline-block;
                }

                /* SEARCH BAR - STANDALONE */
                .filter-system-container { margin-bottom: 25px; max-width: 1200px; margin-left: auto; margin-right: auto; padding: 0 20px; }
                .search-bar-standalone {
                    display: flex; align-items: center;
                    background: var(--bg-glass); backdrop-filter: blur(20px);
                    padding: 10px 20px; border-radius: 18px;
                    border: 1px solid var(--border); box-shadow: var(--shadow);
                    max-width: 550px;
                }
                .search-box-premium {
                    flex: 1; display: flex; align-items: center; gap: 10px;
                    padding: 2px 10px; background: transparent;
                }
                .search-box-premium input {
                    background: transparent; border: none; color: var(--text-main);
                    font-size: 1rem; width: 100%; outline: none;
                    padding: 6px 0;
                }
                .search-icon { color: var(--primary); font-size: 1.1rem; }

                /* GRID & CARDS */
                .domain-grid-premium {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
                    gap: 24px;
                    margin-bottom: 60px;
                    max-width: 1200px;
                    margin-left: auto;
                    margin-right: auto;
                    padding: 0 20px;
                }
                .domain-card-elite {
                    position: relative;
                    background: var(--bg-glass); backdrop-filter: blur(30px);
                    border: 1px solid var(--border); border-radius: 24px;
                    padding: 30px; display: flex; flex-direction: column; gap: 20px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                }
                .domain-card-elite:hover {
                    box-shadow: 0 30px 60px -15px rgba(0,0,0,0.1);
                    border-color: var(--primary);
                }
                .card-gradient-border {
                    position: absolute; top: 0; left: 0; width: 100%; height: 3px;
                    background: linear-gradient(to right, var(--primary), var(--accent));
                    opacity: 0.8;
                }
                .card-top-content { display: flex; justify-content: space-between; align-items: flex-start; }
                .domain-icon-wrapper {
                    width: 50px; height: 50px; border-radius: 16px;
                    background: linear-gradient(135deg, var(--primary), var(--accent));
                    display: flex; align-items: center; justify-content: center;
                    color: white; font-size: 1.4rem; box-shadow: 0 10px 20px -5px var(--primary-glow);
                }
                .growth-badge-small {
                    padding: 6px 12px; border-radius: 100px;
                    font-size: 0.75rem; font-weight: 800; text-transform: uppercase;
                    display: flex; align-items: center; gap: 6px;
                }
                .growth-badge-small[data-type="High Demand"] { background: rgba(16, 185, 129, 0.1); color: #10b981; }
                .growth-badge-small[data-type="Emerging"] { background: rgba(6, 182, 212, 0.1); color: #06b6d4; }
                .growth-badge-small[data-type="Competitive"] { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
                .growth-badge-small[data-type="Stable"] { background: rgba(99, 102, 241, 0.1); color: #6366f1; }

                .card-body-elite h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.02em; }
                .impact-statement { font-size: 1.05rem; color: var(--text-muted); line-height: 1.5; font-weight: 500; }

                .card-footer-elite { margin-top: auto; padding-top: 10px; }
                .explore-link-minimal {
                    display: flex; align-items: center; gap: 10px;
                    color: var(--primary); font-weight: 700; text-decoration: none;
                    font-size: 0.95rem; transition: transform 0.3s;
                }
                .explore-link-minimal:hover { transform: translateX(5px); }

                /* STATS STRIP */
                .premium-stats-strip { margin-top: 60px; padding: 40px; background: var(--bg-glass); border: 1px solid var(--border); border-radius: 40px; max-width: 1200px; margin-left: auto; margin-right: auto; padding: 40px 20px; }
                .stats-grid-horizontal { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
                .stat-card-minimal { display: flex; align-items: center; gap: 16px; padding: 10px; }
                .stat-icon { font-size: 1.8rem; color: var(--text-low); opacity: 0.5; }
                .stat-info h4 { font-size: 1.5rem; font-weight: 800; line-height: 1; }
                .stat-info p { font-size: 0.85rem; font-weight: 600; color: var(--text-muted); margin-top: 4px; }
                .stat-card-minimal.highlight .stat-icon { color: var(--primary); opacity: 1; }
                .stat-card-minimal.highlight h4 { color: var(--primary); }

                .discovery-loader { min-height: 400px; display: flex; align-items: center; justify-content: center; }
                .loader-spinner { width: 50px; height: 50px; border: 4px solid var(--border); border-top-color: var(--primary); border-radius: 50%; }

                /* Text Gradient */
                .text-gradient {
                    background: linear-gradient(to right, var(--primary), var(--accent));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                @media (max-width: 992px) {
                    .domain-grid-premium { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
                    .stats-grid-horizontal { grid-template-columns: repeat(2, 1fr); }
                    .filter-bar-advanced { flex-direction: column; align-items: stretch; }
                    .search-box-premium, .filter-group { width: 100%; }
                    .discovery-hero h1 { font-size: 2.2rem; }
                    .hero-inner { padding: 0 24px; }
                    .premium-stats-strip { padding: 30px 20px; }
                }

                @media (max-width: 600px) {
                    .discovery-hero h1 { font-size: 1.8rem; }
                    .discovery-hero p { font-size: 1rem; }
                    .domain-grid-premium { grid-template-columns: 1fr; }
                    .stats-grid-horizontal { grid-template-columns: 1fr; }
                    .filter-bar-advanced { padding: 10px 15px; }
                    .search-box-premium { padding: 8px 15px; }
                    .select-wrapper { padding: 8px 15px; }
                }
            `}</style>
        </div>
    );
};

export default Domains;
