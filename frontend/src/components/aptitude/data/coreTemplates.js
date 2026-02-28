export const CORE_TEMPLATES = [
    {
        id: 'lt_eng_pro',
        company: 'L&T',
        name: 'L&T Heavy Engineering',
        thumbnail: '🏗️',
        atsScore: 89,
        category: 'EPC',
        layout: {
            fontFamily: 'serif',
            headerStyle: 'formal-boxed',
            sectionOrder: ['personal', 'education', 'experience', 'skills', 'projects', 'achievements']
        }
    },
    {
        id: 'tata_steel_get',
        company: 'Tata Steel',
        name: 'GET Official Format',
        thumbnail: '⛓️',
        atsScore: 91,
        category: 'Manufacturing',
        layout: { sectionOrder: ['personal', 'objective', 'education', 'skills', 'experience', 'achievements'] }
    },
    {
        id: 'bosch_auto',
        company: 'Bosch',
        name: 'Automotive Systems',
        thumbnail: '🚗',
        atsScore: 90,
        category: 'Automobile',
        layout: { sectionOrder: ['personal', 'skills', 'experience', 'projects', 'education', 'certifications'] }
    },
    {
        id: 'mech_design_eng',
        company: 'Engineering',
        name: 'Mechanical Design Engineer',
        thumbnail: '⚙️',
        atsScore: 88,
        category: 'Mechanical',
        layout: { sectionOrder: ['personal', 'skills', 'projects', 'experience', 'education'] }
    },
    {
        id: 'civil_site_eng',
        company: 'Construction',
        name: 'Civil Site Engineer',
        thumbnail: '🧱',
        atsScore: 87,
        category: 'Civil',
        layout: { sectionOrder: ['personal', 'education', 'experience', 'skills', 'projects', 'achievements'] }
    },
    {
        id: 'eee_power_systems',
        company: 'Electrical',
        name: 'EEE Power Systems',
        thumbnail: '⚡',
        atsScore: 89,
        category: 'EEE',
        layout: { sectionOrder: ['personal', 'skills', 'experience', 'projects', 'education'] }
    },
    {
        id: 'ece_embedded_vlsi',
        company: 'Electronics',
        name: 'ECE Embedded & VLSI',
        thumbnail: '📟',
        atsScore: 91,
        category: 'ECE',
        layout: { sectionOrder: ['personal', 'skills', 'projects', 'experience', 'education', 'certifications'] }
    },
    {
        id: 'production_planning',
        company: 'Manufacturing',
        name: 'Production & Planning',
        thumbnail: '🏭',
        atsScore: 86,
        category: 'Production',
        layout: { sectionOrder: ['personal', 'objective', 'experience', 'education', 'skills'] }
    },
    {
        id: 'auto_design_cad',
        company: 'Automobile',
        name: 'Automotive CAD Designer',
        thumbnail: '🏎️',
        atsScore: 88,
        category: 'Automobile',
        layout: { sectionOrder: ['personal', 'skills', 'projects', 'education', 'experience'] }
    },
    {
        id: 'quality_control_qa',
        company: 'Industry',
        name: 'Quality Control & QA',
        thumbnail: '⚖️',
        atsScore: 85,
        category: 'Quality',
        layout: { sectionOrder: ['personal', 'objective', 'experience', 'skills', 'education', 'certifications'] }
    },
    {
        id: 'psu_standard_biodeata',
        company: 'PSU',
        name: 'Standard PSU Format',
        thumbnail: '🇮🇳',
        atsScore: 80,
        category: 'Government',
        layout: {
            fontFamily: 'serif',
            headerStyle: 'classic-underlined',
            sectionOrder: ['personal', 'education', 'experience', 'achievements', 'skills']
        }
    },
    {
        id: 'rn_d_scientist_eng',
        company: 'Research',
        name: 'R&D / Scientist',
        thumbnail: '🧪',
        atsScore: 92,
        category: 'R&D',
        layout: { sectionOrder: ['personal', 'objective', 'education', 'projects', 'skills', 'experience'] }
    },
    {
        id: 'plant_maintenance_eng',
        company: 'Industry',
        name: 'Plant Maintenance',
        thumbnail: '🔧',
        atsScore: 84,
        category: 'Maintenance',
        layout: { sectionOrder: ['personal', 'experience', 'skills', 'education', 'certifications'] }
    },
    {
        id: 'structural_eng_pro',
        company: 'Civil',
        name: 'Structural Engineer Pro',
        thumbnail: '🏢',
        atsScore: 89,
        category: 'Civil',
        layout: { sectionOrder: ['personal', 'skills', 'projects', 'experience', 'education'] }
    },
    {
        id: 'field_eng_ops',
        company: 'Operations',
        name: 'Field Engineer Ops',
        thumbnail: '📍',
        atsScore: 83,
        category: 'Operations',
        layout: { sectionOrder: ['personal', 'experience', 'education', 'skills', 'achievements'] }
    },
    {
        id: 'oil_gas_petro',
        company: 'Energy',
        name: 'Oil & Gas Specialist',
        thumbnail: '🛢️',
        atsScore: 88,
        category: 'Energy',
        layout: { sectionOrder: ['personal', 'skills', 'experience', 'certifications', 'education'] }
    },
    {
        id: 'renewable_solar_wind',
        company: 'Energy',
        name: 'Renewable Systems',
        thumbnail: '☀️',
        atsScore: 90,
        category: 'Energy',
        layout: { sectionOrder: ['personal', 'objective', 'projects', 'skills', 'experience', 'education'] }
    },
    {
        id: 'industrial_safety_hse',
        company: 'Safety',
        name: 'Industrial Safety (HSE)',
        thumbnail: '🦺',
        atsScore: 85,
        category: 'Safety',
        layout: { sectionOrder: ['personal', 'certifications', 'experience', 'education', 'skills'] }
    },
    {
        id: 'embedded_systems_firmware',
        company: 'Electronics',
        name: 'Embedded & Firmware',
        thumbnail: '🔌',
        atsScore: 91,
        category: 'ECE',
        layout: { sectionOrder: ['personal', 'skills', 'projects', 'experience', 'education'] }
    },
    {
        id: 'automation_plc_scada',
        company: 'Automation',
        name: 'PLC & SCADA Expert',
        thumbnail: '📟',
        atsScore: 89,
        category: 'Automation',
        layout: { sectionOrder: ['personal', 'skills', 'experience', 'projects', 'education'] }
    },
    {
        id: 'robotics_mechatronics',
        company: 'Tech',
        name: 'Robotics Specialist',
        thumbnail: '🤖',
        atsScore: 93,
        category: 'Robotics',
        layout: { sectionOrder: ['personal', 'skills', 'projects', 'experience', 'education'] }
    },
    {
        id: 'manufacturing_excellence',
        company: 'Industry',
        name: 'Manufacturing Excellence',
        thumbnail: '📐',
        atsScore: 87,
        category: 'Manufacturing',
        layout: { sectionOrder: ['personal', 'experience', 'skills', 'education', 'achievements'] }
    },
    {
        id: 'tool_design_mold',
        company: 'Mechanical',
        name: 'Tool & Die Design',
        thumbnail: '🔨',
        atsScore: 86,
        category: 'Mechanical',
        layout: { sectionOrder: ['personal', 'projects', 'skills', 'experience', 'education'] }
    },
    {
        id: 'project_eng_lead',
        company: 'Management',
        name: 'Project Engineer Lead',
        thumbnail: '📋',
        atsScore: 88,
        category: 'Management',
        layout: { sectionOrder: ['personal', 'objective', 'experience', 'projects', 'education', 'skills'] }
    },
    {
        id: 'hvac_systems_eng',
        company: 'Engineering',
        name: 'HVAC Systems Specialist',
        thumbnail: '❄️',
        atsScore: 85,
        category: 'Mechanical',
        layout: { sectionOrder: ['personal', 'skills', 'experience', 'education', 'certifications'] }
    }
];
