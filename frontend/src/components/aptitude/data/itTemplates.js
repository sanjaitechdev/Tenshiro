export const IT_TEMPLATES = [
    {
        id: 'amazon_sde',
        company: 'Amazon',
        name: 'Amazon SDE Format',
        thumbnail: '🟠',
        atsScore: 94,
        category: 'FAANG',
        tags: ['Customer Obsession', 'Leadership Principles'],
        layout: {
            fontFamily: "'Inter', sans-serif",
            fontSize: '10pt',
            lineHeight: '1.4',
            margins: '0.75in',
            sectionSpacing: '18pt',
            headerStyle: 'modern-centered',
            sectionOrder: ['personal', 'objective', 'skills', 'experience', 'projects', 'education', 'achievements']
        }
    },
    {
        id: 'google_eng',
        company: 'Google',
        name: 'Google Engineering',
        thumbnail: '⚪',
        atsScore: 95,
        category: 'FAANG',
        tags: ['Impact', 'Algorithm Focus'],
        layout: {
            fontFamily: "'Roboto', sans-serif",
            fontSize: '10pt',
            lineHeight: '1.2',
            margins: '0.5in',
            sectionSpacing: '15pt',
            headerStyle: 'left-aligned',
            sectionOrder: ['personal', 'experience', 'projects', 'skills', 'education', 'certifications']
        }
    },
    {
        id: 'ms_professional',
        company: 'Microsoft',
        name: 'Microsoft Modern',
        thumbnail: '🟦',
        atsScore: 92,
        category: 'FAANG',
        tags: ['Cloud Native', 'Standard'],
        layout: {
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: '11pt',
            margins: '1in',
            sectionOrder: ['personal', 'objective', 'skills', 'experience', 'projects', 'education']
        }
    },
    {
        id: 'tcs_nqt',
        company: 'TCS',
        name: 'TCS NQT Standard',
        thumbnail: '🏢',
        atsScore: 88,
        category: 'Service MNC',
        layout: {
            fontFamily: 'serif',
            fontSize: '11pt',
            margins: '1in',
            headerStyle: 'formal-boxed',
            sectionOrder: ['personal', 'education', 'skills', 'experience', 'projects', 'achievements']
        }
    },
    {
        id: 'infosys_power',
        company: 'Infosys',
        name: 'Infosys Power Programmer',
        thumbnail: '🔷',
        atsScore: 89,
        category: 'Service MNC',
        layout: { sectionOrder: ['personal', 'skills', 'projects', 'experience', 'education'] }
    },
    {
        id: 'wipro_turbo',
        company: 'Wipro',
        name: 'Wipro Turbo Format',
        thumbnail: '🟢',
        atsScore: 86,
        category: 'Service MNC',
        layout: { sectionOrder: ['personal', 'objective', 'education', 'skills', 'experience'] }
    },
    {
        id: 'zoho_creative',
        company: 'Zoho',
        name: 'Zoho Creative Dev',
        thumbnail: '🟥',
        atsScore: 90,
        category: 'Product Based',
        layout: {
            fontFamily: "'Outfit', sans-serif",
            headerStyle: 'modern-pill',
            sectionOrder: ['personal', 'projects', 'skills', 'experience', 'education']
        }
    },
    {
        id: 'freshworks_saas',
        company: 'Freshworks',
        name: 'SaaS Product Format',
        thumbnail: '🌿',
        atsScore: 91,
        category: 'Product Based',
        layout: { sectionOrder: ['personal', 'objective', 'experience', 'projects', 'skills', 'education'] }
    },
    {
        id: 'accenture_tech',
        company: 'Accenture',
        name: 'Accenture Strategy & Tech',
        thumbnail: '🟣',
        atsScore: 87,
        category: 'Consulting',
        layout: { sectionOrder: ['personal', 'objective', 'experience', 'skills', 'projects', 'education', 'certifications'] }
    },
    {
        id: 'capgemini_eng',
        company: 'Capgemini',
        name: 'Capgemini Engineering',
        thumbnail: '🔹',
        atsScore: 85,
        category: 'Service MNC',
        layout: { sectionOrder: ['personal', 'education', 'skills', 'experience', 'projects'] }
    },
    {
        id: 'cognizant_fse',
        company: 'Cognizant',
        name: 'Cognizant FSE Format',
        thumbnail: '💠',
        atsScore: 88,
        category: 'Service MNC',
        layout: { sectionOrder: ['personal', 'skills', 'education', 'experience', 'projects', 'certifications'] }
    },
    {
        id: 'ibm_hybrid',
        company: 'IBM',
        name: 'IBM Hybrid Cloud',
        thumbnail: '🏛️',
        atsScore: 90,
        category: 'Tech Enterprise',
        layout: { sectionOrder: ['personal', 'objective', 'skills', 'experience', 'projects', 'certifications', 'education'] }
    },
    {
        id: 'oracle_dba',
        company: 'Oracle',
        name: 'Oracle DB Expert',
        thumbnail: '🔴',
        atsScore: 89,
        category: 'Tech Enterprise',
        layout: { sectionOrder: ['personal', 'skills', 'experience', 'education', 'certifications', 'achievements'] }
    },
    {
        id: 'deloitte_tech',
        company: 'Deloitte',
        name: 'Deloitte USI Tech',
        thumbnail: '🟢',
        atsScore: 87,
        category: 'Consulting',
        layout: { sectionOrder: ['personal', 'objective', 'experience', 'skills', 'projects', 'education'] }
    },
    {
        id: 'startup_lean',
        company: 'Startup',
        name: 'Startup Lean Format',
        thumbnail: '🚀',
        atsScore: 93,
        category: 'Startup',
        layout: {
            fontFamily: "'Inter', sans-serif",
            headerStyle: 'modern-centered',
            sectionOrder: ['personal', 'projects', 'experience', 'skills', 'education']
        }
    },
    {
        id: 'faang_minimal',
        company: 'FAANG',
        name: 'FAANG Minimalist',
        thumbnail: '💎',
        atsScore: 96,
        category: 'FAANG',
        layout: {
            fontSize: '10pt',
            margins: '0.4in',
            sectionOrder: ['personal', 'experience', 'education', 'projects', 'skills']
        }
    },
    {
        id: 'product_exec',
        company: 'Product',
        name: 'Product Executive',
        thumbnail: '📦',
        atsScore: 92,
        category: 'Product Based',
        layout: { sectionOrder: ['personal', 'objective', 'experience', 'skills', 'projects', 'education'] }
    },
    {
        id: 'ats_one_col',
        company: 'ATS',
        name: 'ATS Standard One-Column',
        thumbnail: '📋',
        atsScore: 99,
        category: 'Standard',
        layout: {
            fontFamily: 'serif',
            headerStyle: 'simple-bold',
            sectionOrder: ['personal', 'experience', 'education', 'skills', 'projects']
        }
    },
    {
        id: 'two_col_modern',
        company: 'Modern',
        name: 'Two-Column Modern',
        thumbnail: '🌗',
        atsScore: 82,
        category: 'Creative',
        layout: {
            headerStyle: 'two-column',
            sectionOrder: ['personal', 'objective', 'skills', 'experience', 'projects', 'education']
        }
    },
    {
        id: 'portfolio_dev',
        company: 'Portfolio',
        name: 'Portfolio Centric',
        thumbnail: '🎨',
        atsScore: 80,
        category: 'Creative',
        layout: { sectionOrder: ['personal', 'projects', 'skills', 'experience', 'education'] }
    },
    {
        id: 'github_focused',
        company: 'GitHub',
        name: 'Open Source / GitHub',
        thumbnail: '🐙',
        atsScore: 88,
        category: 'Creative',
        layout: { sectionOrder: ['personal', 'projects', 'skills', 'experience', 'education', 'achievements'] }
    },
    {
        id: 'ai_ml_specialist',
        company: 'Tech',
        name: 'AI / ML Specialist',
        thumbnail: '🧠',
        atsScore: 91,
        category: 'Specialized',
        layout: { sectionOrder: ['personal', 'skills', 'projects', 'experience', 'education', 'certifications'] }
    },
    {
        id: 'data_analyst_pro',
        company: 'Analytics',
        name: 'Data Analyst Pro',
        thumbnail: '📊',
        atsScore: 90,
        category: 'Specialized',
        layout: { sectionOrder: ['personal', 'objective', 'skills', 'experience', 'projects', 'education'] }
    },
    {
        id: 'cloud_engineer_exp',
        company: 'Cloud',
        name: 'Cloud Infrastructure',
        thumbnail: '☁️',
        atsScore: 92,
        category: 'Specialized',
        layout: { sectionOrder: ['personal', 'skills', 'experience', 'certifications', 'projects', 'education'] }
    },
    {
        id: 'devops_certified',
        company: 'DevOps',
        name: 'DevOps Certified',
        thumbnail: '♾️',
        atsScore: 91,
        category: 'Specialized',
        layout: { sectionOrder: ['personal', 'objective', 'skills', 'experience', 'projects', 'certifications', 'education'] }
    },
    {
        id: 'cybersec_pro',
        company: 'Security',
        name: 'Cyber Security Expert',
        thumbnail: '🛡️',
        atsScore: 89,
        category: 'Specialized',
        layout: { sectionOrder: ['personal', 'skills', 'experience', 'certifications', 'projects', 'education'] }
    }
];
