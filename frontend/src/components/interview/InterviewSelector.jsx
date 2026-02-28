import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const InterviewSelector = ({ onStart }) => {
    const { t } = useLanguage();
    const [config, setConfig] = useState({
        company: 'TCS',
        role: 'Frontend Developer',
        type: 'HR Round'
    });

    const companies = ['TCS', 'Infosys', 'Amazon', 'Microsoft', 'L&T', 'SSC', 'Bank PO'];
    const roles = [
        { label: t('interview.options.roles.frontend'), value: 'Frontend Developer' },
        { label: t('interview.options.roles.backend'), value: 'Backend Developer' },
        { label: t('interview.options.roles.fullstack'), value: 'Full Stack' },
        { label: t('interview.options.roles.core'), value: 'Core Engineer' },
        { label: t('interview.options.roles.govt'), value: 'Government Aspirant' }
    ];
    const types = [
        { label: t('interview.options.types.hr'), value: 'HR Round' },
        { label: t('interview.options.types.tech'), value: 'Technical Round' },
        { label: t('interview.options.types.mixed'), value: 'Mixed Round' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="interview-selector animate-in">
            <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>{t('interview.configureTitle')}</h2>
            <div className="selector-grid">
                <div className="input-group">
                    <label>{t('interview.targetCompany')}</label>
                    <select
                        name="company"
                        className="custom-select"
                        value={config.company}
                        onChange={handleChange}
                    >
                        {companies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="input-group">
                    <label>{t('interview.jobRole')}</label>
                    <select
                        name="role"
                        className="custom-select"
                        value={config.role}
                        onChange={handleChange}
                    >
                        {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                </div>
                <div className="input-group">
                    <label>{t('interview.interviewType')}</label>
                    <select
                        name="type"
                        className="custom-select"
                        value={config.type}
                        onChange={handleChange}
                    >
                        {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                </div>
            </div>

            <div className="selector-footer">
                <button
                    className="btn-primary start-btn"
                    onClick={() => onStart(config)}
                >
                    {t('interview.startProfessional')}
                </button>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {t('interview.aiDisclaimer')}
                </p>
            </div>
        </div>
    );
};

export default InterviewSelector;
