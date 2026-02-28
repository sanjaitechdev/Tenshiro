const { OpenAI } = require('openai');
const db = require('../config/db');

let groq;
try {
    if (process.env.GROQ_API_KEY) {
        groq = new OpenAI({
            apiKey: process.env.GROQ_API_KEY,
            baseURL: "https://api.groq.com/openai/v1",
        });
    }
} catch (e) {
    console.warn("Groq API Key missing or invalid in Interview Controller.");
}

const getMockQuestions = (company, role, type) => {
    const questions = {
        'HR Round': [
            "Tell me about yourself and your background.",
            "Why do you want to join " + company + "?",
            "What are your greatest strengths and weaknesses?",
            "Describe a challenging situation at work/college and how you handled it.",
            "Where do you see yourself in 5 years?"
        ],
        'Technical Round': [
            "Explain the technical architecture of your most recent project.",
            "How do you handle state management in a large-scale " + role + " application?",
            "What are some common performance bottlenecks in " + role + " and how do you optimize them?",
            "Explain the difference between various data structures you frequently use.",
            "Live coding/logic question: How would you design a scalable system for " + company + "?"
        ],
        'Mixed Round': [
            "Tell me about a technical challenge you solved at your previous stint.",
            "How do you stay updated with the latest trends in " + role + "?",
            "Why " + role + " at " + company + "?",
            "Explain a complex technical concept to a non-technical stakeholder.",
            "What is your approach to teamwork and conflict resolution in a fast-paced environment?"
        ]
    };

    const companySpecific = {
        'Amazon': "Explain how you have demonstrated one of our Leadership Principles in your past projects.",
        'TCS': "Are you comfortable with the service agreement and potential relocation?",
        'L&T': "What are the core engineering principles you follow while designing systems?",
        'SSC': "Describe a situation where you had to make a quick decision under pressure for a public service task.",
        'Bank PO': "Explain the difference between RTGS and NEFT in simple terms."
    };

    let base = questions[type] || questions['Mixed Round'];
    let finalQuestions = [...base];

    if (companySpecific[company]) {
        finalQuestions[1] = companySpecific[company];
    }

    return finalQuestions;
};

exports.generateQuestions = async (req, res) => {
    const { company, role, type } = req.body;
    if (!company || !role || !type) return res.status(400).json({ message: 'Missing parameters' });

    try {
        if (groq) {
            const systemPrompt = `You are an elite Interviewer for ${company}. Generate 5 dynamic, high-quality interview questions for a ${role} position, focusing on a ${type}.
            
            Company Context intelligence:
            - Amazon: Focus on Leadership Principles.
            - Microsoft: Technical depth + product thinking.
            - TCS/Infosys: Fundamentals + stability + adaptability.
            - L&T: Engineering basics + process discipline.
            - Government/Bank: Situation-based + domain awareness.
            
            Return STRICTLY a JSON array of 5 strings.`;

            const completion = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: systemPrompt }],
                response_format: { type: "json_object" }
            });

            const data = JSON.parse(completion.choices[0].message.content);
            const questions = data.questions || data; // Handle different JSON structures
            return res.json({ questions: Array.isArray(questions) ? questions : Object.values(questions) });
        }

        res.json({ questions: getMockQuestions(company, role, type) });
    } catch (err) {
        console.error("Interview Question Generation Error:", err);
        res.json({ questions: getMockQuestions(company, role, type) });
    }
};

exports.analyzeInterview = async (req, res) => {
    const { questions, answers, config } = req.body;
    const userId = req.user.id;

    if (!answers || answers.length === 0) return res.status(400).json({ message: 'No answers provided' });

    try {
        let feedback;

        if (groq) {
            const systemPrompt = `Analyze the following interview performance for a ${config.role} role at ${config.company} (${config.type}).
            
            Questions and User Answers:
            ${questions.map((q, i) => `Q: ${q}\nA: ${answers[i] || 'No answer'}`).join('\n\n')}
            
            Provide:
            1. Scores (0-100) for: Overall, Confidence, Technical Depth, Communication, Company Fit.
            2. 3 Strengths.
            3. 3 Weaknesses.
            4. 3 Improvement Suggestions.
            5. Recommended Resources.
            
            Weightage: Relevance 40%, Clarity 20%, Depth 20%, Structure 20%.
            
            Return STRICTLY a JSON object.`;

            const completion = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: systemPrompt }],
                response_format: { type: "json_object" }
            });

            feedback = JSON.parse(completion.choices[0].message.content);
        } else {
            // Basic Demo Logic implementation
            const overallScore = Math.floor(Math.random() * 30) + 65; // 65-95
            feedback = {
                scores: {
                    overall: overallScore,
                    confidence: Math.floor(Math.random() * 20) + 70,
                    technicalDepth: Math.floor(Math.random() * 20) + 60,
                    communication: Math.floor(Math.random() * 20) + 75,
                    companyFit: Math.floor(Math.random() * 20) + 80
                },
                strengths: ["Clear articulated background", "Structured explanation of projects", "Active listening approach"],
                weaknesses: ["Could go deeper into technical trade-offs", "Slight hesitation in complex logic", "Need more company-specific references"],
                suggestions: ["Practice live coding scenarios", "Memorize key leadership principles", "Work on summarizing complex tasks"],
                resources: ["Cracking the Coding Interview", company + " Official Engineering Blog", "LeetCode Medium/Hard sets"]
            };
        }

        // Save to History (Mock Table: user_interview_history)
        // For demo, we check if table exists or just skip DB part if not ready
        try {
            await db.query(
                'INSERT INTO user_interview_history (user_id, company, role, type, score, feedback, date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
                [userId, config.company, config.role, config.type, feedback.scores.overall, JSON.stringify(feedback)]
            ).catch(e => console.warn("Interview History Table might not exist, skipping DB save."));
        } catch (dbErr) { }

        res.json(feedback);
    } catch (err) {
        console.error("Interview Analysis Error:", err);
        res.status(500).json({ message: 'Analysis failed' });
    }
};

exports.getHistory = async (req, res) => {
    const userId = req.user.id;
    try {
        const [history] = await db.query(
            'SELECT * FROM user_interview_history WHERE user_id = ? ORDER BY date DESC',
            [userId]
        );
        res.json(history);
    } catch (err) {
        // Return dummy history for demo if table doesn't exist
        res.json([
            { id: 1, company: 'Google', role: 'SDE', type: 'Technical', score: 85, date: '2024-05-15' },
            { id: 2, company: 'Amazon', role: 'Frontend', type: 'HR', score: 92, date: '2024-05-10' }
        ]);
    }
};

exports.getPrepData = async (req, res) => {
    const { sector, role, company, round } = req.body;

    try {
        const mockRounds = [
            { id: 'oa', name: 'Online Assessment', type: 'Technical', difficulty: 'Medium', duration: '60 mins' },
            { id: 'tech1', name: 'Technical Round 1', type: 'Technical', difficulty: 'Hard', duration: '45-60 mins' },
            { id: 'tech2', name: 'Technical Round 2', type: 'Technical', difficulty: 'Hard', duration: '60 mins' },
            { id: 'hr', name: 'HR Round', type: 'Behavioral', difficulty: 'Easy', duration: '30 mins' },
            { id: 'final', name: 'Final Discussion', type: 'Mixed', difficulty: 'Medium', duration: '45 mins' }
        ];

        const prepData = {
            company,
            role,
            roundName: round,
            rounds: mockRounds,

            // A) Round Overview
            overview: {
                purpose: `To evaluate candidate's core ${role} competencies and problem-solving framework at ${company}.`,
                evaluates: "Logic, architectural depth, code quality, and cultural alignment.",
                expectations: "Strong grasp of fundamentals, ability to handle edge cases, and clear articulation of thoughts.",
                eliminationReasons: ["Weak technical foundation", "Lack of scalability awareness", "Poor communication of logic", "Inability to handle ambiguity"],
                difficulty: "High",
                weightage: "40%"
            },

            // B) Company-Specific Focus
            focusAreas: [
                `${role} Performance Optimization`,
                "Microservices Architecture & Communication",
                "High-Availability System Design",
                "Real-Time Data Consistency",
                `Cultural values specific to ${company}`
            ],

            // C) Learning Section
            learningTopics: {
                core: ["Data Structures & Algorithms", "Language Fundamentals", "Design Patterns"],
                advanced: ["System Design (LLD/HLD)", "Concurrency & Parallelism", "Security Best Practices"],
                patterns: ["Observer Pattern", "Strategy Pattern", "Circuit Breaker"],
                scenarios: [`Scaling a service at ${company} scale`, "Handling massive peak traffic", "Database sharding strategies"]
            },

            // D) Practice Section
            practiceQuestions: {
                standard: ["How do you handle N+1 query problems?", "Explain eventual consistency vs strong consistency."],
                coding: ["Implement an LRU Cache", "Design a Rate Limiter"],
                behavioral: ["Tell me about a time you handled a production outage.", "How do you resolve conflict with a team member?"],
                caseStudy: [`Design a high-concurrency system for ${company}'s core product.`]
            },

            // E) Resources Section
            resources: [
                { title: "System Design Primer", link: "https://github.com/donnemartin/system-design-primer" },
                { title: `Interviewing at ${company} (Official Blog)`, link: "#" },
                { title: "Advanced React Patterns", link: "https://reactpatterns.com" },
                { title: "Behavioral Prep (STAR Method)", link: "#" }
            ],

            // F) Strategy Section
            strategyTips: {
                technical: "Start with a brute-force approach, then optimize. Explain time/space complexity upfront.",
                explanation: "Use the 'Think-Aloud' protocol. Never stop talking for more than 30 seconds.",
                whiteboard: "Identify requirements clearly. Draw components first, then define connections.",
                communication: "Be articulate. If you don't know something, explain how you would find out.",
                confidence: "Maintain eye contact and smile. Treat it as a collaboration, not an exam."
            },

            // G) Mini Assessment
            readinessTest: [
                { q: "What does the C in CAP theorem stand for?", options: ["Consistency", "Caching", "Complexity", "Concurrency"], correct: 0 },
                { q: "Which is better for write-heavy systems?", options: ["Read-optimized DB", "Write-optimized DB"], correct: 1 },
                { q: "What is 2+2?", options: ["3", "4", "5", "6"], correct: 1 },
                { q: "React is a...", options: ["Library", "Framework", "OS"], correct: 0 },
                { q: "Node.js runs on...", options: ["V8", "SpiderMonkey", "JVM"], correct: 0 }
            ],

            // Step 3: AI Roadmaps
            roadmap: {
                "3-Day Crash": ["Day 1: Technical Core & Previous Questions", "Day 2: Mock Simulation & Problem Solving", "Day 3: Company Culture & Final Revision"],
                "7-Day Plan": ["Day 1-2: Fundamentals Deep Dive", "Day 3-4: System Design & Coding DS", "Day 5: Behavioral & Fitment", "Day 6: Mock Interviews", "Day 7: Strategy & Confidence"],
                "14-Day Deep": ["Week 1: Foundations & Mastery", "Week 2: Advanced Scenarios & Real-World Case Studies"],
                "30-Day Complete": ["Phase 1: Concepts", "Phase 2: Depth", "Phase 3: Speed", "Phase 4: Simulation"]
            },

            // Step 4: Company Insights
            companyInsights: {
                style: "Aggressive & Depth-Focused",
                technicalDepth: "Very High - Probing for edge cases",
                cultureFocus: "High - Leadership principles are key",
                communication: "Clear, structured, and logical",
                hiringBar: "Elite"
            }
        };

        res.json(prepData);
    } catch (err) {
        console.error("Interview Prep Data Error:", err);
        res.status(500).json({ error: "Failed to fetch preparation data" });
    }
};
