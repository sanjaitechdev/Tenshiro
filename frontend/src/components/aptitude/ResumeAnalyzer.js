import { COMPANY_RESUME_KEYWORDS } from './resumeTemplates';

export const analyzeResume = (data, company) => {
    // Flatten all data into a searchable string
    const text = JSON.stringify(data).toLowerCase();
    const keywords = COMPANY_RESUME_KEYWORDS[company] || COMPANY_RESUME_KEYWORDS['Amazon'] || []; // Fallback to Amazon if company not found

    const matched = keywords.filter(k => text.includes(k.toLowerCase()));
    const missing = keywords.filter(k => !text.includes(k.toLowerCase()));

    // Production Scoring System (Total: 100)
    let score = 0;

    // 1. Structural Integrity (30 pts)
    if (data.personal?.name && data.personal?.email) score += 5;
    if (data.personal?.linkedin || data.personal?.github) score += 5;
    if (data.objective && data.objective.length > 80) score += 5;
    if (data.experience?.length > 0) score += 5;
    if (data.education?.length > 0) score += 5;
    if (data.skills && data.skills.split(',').length >= 5) score += 5;

    // 2. Keyword Density (40 pts)
    const keywordMatchRatio = matched.length / Math.max(1, keywords.length);
    score += Math.round(keywordMatchRatio * 40);

    // 3. Quantification & Impact (20 pts)
    // Check for numbers, percentages, and dollar signs in descriptions
    const impactRegex = /\d%|\d\+?|\$\d|achieved|improved|delivered|reduced/gi;
    const impactCount = (text.match(impactRegex) || []).length;
    score += Math.min(20, impactCount * 4);

    // 4. Recruiter Optimization (10 pts)
    if (data.projects?.length >= 2) score += 5;
    if (data.certifications?.length >= 1) score += 5;

    return {
        score: Math.min(100, score),
        matched,
        missing,
        suggestions: getDetailedSuggestions(data, missing, company, score)
    };
};

const getDetailedSuggestions = (data, missing, company, currentScore) => {
    const suggestions = [];

    if (currentScore < 70) {
        suggestions.push("🛡️ Priority: Your overall score is low. Focus on filling out all sections completely.");
    }

    if (missing.length > 0) {
        suggestions.push(`🎯 Target Alignment: Integrate high-impact keywords like "${missing.slice(0, 3).join(', ')}" to bypass ${company}'s ATS filters.`);
    }

    if (data.experience?.some(exp => exp.desc.length < 50)) {
        suggestions.push("📝 Content Depth: Your work experience descriptions are too short. Aim for 3-5 bullet points per role.");
    }

    if (!/\d%|\d\+/.test(JSON.stringify(data.projects))) {
        suggestions.push("📊 Missing Metrics: Quantify your project achievements (e.g., 'Increased efficiency by 20%').");
    }

    if (!data.personal.linkedin) {
        suggestions.push("🌐 Social Proof: Add your LinkedIn profile to increase recruiter trust by up to 71%.");
    }

    if (data.skills.split(',').length < 8) {
        suggestions.push("🛠️ Skill Gap: List at least 8-10 technical and soft skills to improve searchability.");
    }

    return suggestions;
};
