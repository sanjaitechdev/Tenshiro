import React from 'react';
import ResumeEngine from '../components/aptitude/ResumeEngine';

const ResumePage = () => {
    return (
        <div className="resume-page-container" style={{
            minHeight: '100vh',
            background: 'var(--bg-color)',
            backgroundImage: `
                radial-gradient(at 0% 0%, var(--glow-primary, transparent) 0px, transparent 50%),
                radial-gradient(at 50% 0%, rgba(99, 102, 241, 0.05) 0px, transparent 50%)
            `,
            padding: '2rem'
        }}>
            <style>{`
                .resume-page-container {
                    animation: fadeIn 0.5s ease;
                }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>

            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <ResumeEngine />
            </div>
        </div>
    );
};

export default ResumePage;
