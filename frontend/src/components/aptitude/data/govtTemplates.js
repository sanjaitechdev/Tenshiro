export const GOVT_TEMPLATES = [
    {
        id: 'upsc_civil_services',
        company: 'UPSC',
        name: 'Civil Services / IAS Format',
        thumbnail: '🏛️',
        atsScore: 75,
        category: 'Administrative',
        layout: {
            fontFamily: "'Times New Roman', serif",
            fontSize: '12pt',
            margins: '1.25in',
            headerStyle: 'classic-underlined',
            sectionOrder: ['personal', 'education', 'achievements', 'experience', 'extra']
        }
    },
    {
        id: 'ssc_cgl_pro',
        company: 'SSC',
        name: 'SSC CGL Professional',
        thumbnail: '📜',
        atsScore: 78,
        category: 'Administrative',
        layout: { fontFamily: 'serif', sectionOrder: ['personal', 'education', 'experience', 'skills', 'achievements'] }
    },
    {
        id: 'tnpsc_state_govt',
        company: 'TNPSC',
        name: 'TNPSC State Govt Format',
        thumbnail: '🏞️',
        atsScore: 72,
        category: 'State Govt',
        layout: { fontFamily: 'serif', sectionOrder: ['personal', 'education', 'experience', 'certifications', 'extra'] }
    },
    {
        id: 'bank_po_ibps',
        company: 'IBPS',
        name: 'Bank PO / IBPS Standard',
        thumbnail: '🏦',
        atsScore: 82,
        category: 'Banking',
        layout: { sectionOrder: ['personal', 'objective', 'education', 'skills', 'experience'] }
    },
    {
        id: 'railway_rrb_tech',
        company: 'Railway',
        name: 'Railway RRB Technical',
        thumbnail: '🚂',
        atsScore: 76,
        category: 'Railway',
        layout: { sectionOrder: ['personal', 'education', 'skills', 'experience', 'certifications'] }
    },
    {
        id: 'defense_army_navy',
        company: 'Defense',
        name: 'Defense / Armed Forces',
        thumbnail: '🎖️',
        atsScore: 80,
        category: 'Defense',
        layout: { sectionOrder: ['personal', 'objective', 'experience', 'achievements', 'education', 'skills'] }
    },
    {
        id: 'police_si_uniformed',
        company: 'Police',
        name: 'Police SI / Uniformed',
        thumbnail: '👮',
        atsScore: 74,
        category: 'Security',
        layout: { sectionOrder: ['personal', 'education', 'experience', 'achievements', 'extra'] }
    },
    {
        id: 'teaching_professors',
        company: 'Education',
        name: 'Teaching / Academic CV',
        thumbnail: '🎓',
        atsScore: 70,
        category: 'Education',
        layout: {
            fontSize: '11pt',
            sectionOrder: ['personal', 'education', 'projects', 'certifications', 'experience', 'achievements']
        }
    },
    {
        id: 'clerk_multitasking',
        company: 'Govt',
        name: 'Clerical / Multitasking',
        thumbnail: '📁',
        atsScore: 72,
        category: 'Administrative',
        layout: { sectionOrder: ['personal', 'education', 'skills', 'experience', 'extra'] }
    },
    {
        id: 'group_1_officer',
        company: 'PSC',
        name: 'Group 1 Gazetted Officer',
        thumbnail: '🦁',
        atsScore: 79,
        category: 'Administrative',
        layout: { sectionOrder: ['personal', 'education', 'experience', 'achievements', 'extra'] }
    },
    {
        id: 'lic_aao_insurance',
        company: 'LIC',
        name: 'LIC AAO / Insurance',
        thumbnail: '⚖️',
        atsScore: 81,
        category: 'Insurance',
        layout: { sectionOrder: ['personal', 'objective', 'education', 'skills', 'experience'] }
    },
    {
        id: 'epfo_assistant',
        company: 'EPFO',
        name: 'EPFO Assistant Format',
        thumbnail: '💼',
        atsScore: 77,
        category: 'Administrative',
        layout: { sectionOrder: ['personal', 'education', 'experience', 'skills', 'achievements'] }
    },
    {
        id: 'postal_dept_ops',
        company: 'Postal',
        name: 'Postal Dept Operations',
        thumbnail: '📮',
        atsScore: 73,
        category: 'Administrative',
        layout: { sectionOrder: ['personal', 'education', 'skills', 'experience', 'extra'] }
    },
    {
        id: 'forest_officer_env',
        company: 'Forest',
        name: 'Forest Officer / Environment',
        thumbnail: '🌳',
        atsScore: 75,
        category: 'Environmental',
        layout: { sectionOrder: ['personal', 'education', 'experience', 'certifications', 'projects'] }
    },
    {
        id: 'revenue_inspector_data',
        company: 'Revenue',
        name: 'Revenue Inspector / VAO',
        thumbnail: '🗺️',
        atsScore: 71,
        category: 'Administrative',
        layout: { sectionOrder: ['personal', 'education', 'experience', 'skills', 'extra'] }
    },
    {
        id: 'aso_central_sect',
        company: 'Central Govt',
        name: 'ASO / Central Secretariat',
        thumbnail: '🏛️',
        atsScore: 80,
        category: 'Administrative',
        layout: { sectionOrder: ['personal', 'education', 'experience', 'skills', 'achievements'] }
    },
    {
        id: 'judicial_legal_clerk',
        company: 'Judicial',
        name: 'Judicial / Legal Services',
        thumbnail: '⚖️',
        atsScore: 74,
        category: 'Legal',
        layout: { sectionOrder: ['personal', 'education', 'certifications', 'experience', 'achievements'] }
    },
    {
        id: 'paramilitary_crp_bsf',
        company: 'Paramilitary',
        name: 'Paramilitary (CRPF/BSF)',
        thumbnail: '🧤',
        atsScore: 76,
        category: 'Defense',
        layout: { sectionOrder: ['personal', 'education', 'experience', 'achievements', 'extra'] }
    },
    {
        id: 'state_psc_civil',
        company: 'State PSC',
        name: 'State Civil Services',
        thumbnail: '🚩',
        atsScore: 77,
        category: 'Administrative',
        layout: { sectionOrder: ['personal', 'education', 'experience', 'achievements', 'extra'] }
    },
    {
        id: 'central_govt_tech',
        company: 'Central Govt',
        name: 'Technical Officer Format',
        thumbnail: '🛠️',
        atsScore: 82,
        category: 'Technical',
        layout: { sectionOrder: ['personal', 'skills', 'projects', 'education', 'experience'] }
    },
    {
        id: 'isro_drdo_scientist',
        company: 'ISRO',
        name: 'Scientific Assistant',
        thumbnail: '🚀',
        atsScore: 85,
        category: 'Technical',
        layout: { sectionOrder: ['personal', 'objective', 'education', 'experience', 'projects', 'skills'] }
    },
    {
        id: 'public_sector_exec',
        company: 'PSU',
        name: 'PSU Management Trainee',
        thumbnail: '🏙️',
        atsScore: 83,
        category: 'Management',
        layout: { sectionOrder: ['personal', 'objective', 'education', 'skills', 'experience', 'achievements'] }
    },
    {
        id: 'nabard_officer',
        company: 'NABARD',
        name: 'NABARD Grade A Format',
        thumbnail: '🌾',
        atsScore: 84,
        category: 'Banking',
        layout: { sectionOrder: ['personal', 'objective', 'education', 'experience', 'skills', 'achievements'] }
    },
    {
        id: 'rbi_grade_b_elite',
        company: 'RBI',
        name: 'RBI Grade B Professional',
        thumbnail: '🦁',
        atsScore: 87,
        category: 'Banking',
        layout: { sectionOrder: ['personal', 'objective', 'experience', 'skills', 'education', 'certifications'] }
    },
    {
        id: 'govt_research_fellow',
        company: 'R&D',
        name: 'JRF / Govt Research',
        thumbnail: '🔬',
        atsScore: 78,
        category: 'Education',
        layout: { sectionOrder: ['personal', 'education', 'projects', 'skills', 'experience'] }
    }
];
