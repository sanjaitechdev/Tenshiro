const db = require('../config/db');

// Utility for AI Blueprint (Logic mirrored from frontend but executed server-side for persistence)
const generateBlueprint = (res, td) => {
    const weak = Object.entries(td || {}).filter(([, d]) => d.correct / d.total < 0.5).map(([t]) => t);
    const next = res.pct >= 75 ? 'Hard' : res.pct >= 50 ? 'Medium' : 'Easy';
    return {
        headline: res.pct >= 80 ? 'Optimize & Scale ⚡' : res.pct >= 60 ? 'Build Consistency 📈' : 'Foundation First 🧱',
        weak,
        next,
        plan: [
            `Day 1-2: Revise ${weak[0] || 'all basics'} + formula sheet`,
            `Day 3-4: ${next} level practice (20 Qs)`,
            `Day 5-6: Company pattern mock`,
            `Day 7: Review error log`
        ]
    };
};

const aptitudeController = {
    // 1. Fetch Questions (Adaptive / Practice / Mock)
    getQuestions: async (req, res) => {
        try {
            const { category, topic, difficulty, count = 10, isAdaptive = false, type = 'practice' } = req.query;

            let questions = [];

            if (type === 'mock' || !category || category === 'All') {
                // Full Mock: 15 per category = 60 total
                const cats = ['quantitative', 'logical', 'verbal', 'di'];
                const perCat = Math.ceil(parseInt(count) / cats.length);
                for (const cat of cats) {
                    const [rows] = await db.query(
                        'SELECT * FROM apt_questions WHERE category = ? ORDER BY RAND() LIMIT ?',
                        [cat, perCat]
                    );
                    questions.push(...rows);
                }
            } else {
                // Practice: filter by category + optional difficulty
                let qry = 'SELECT * FROM apt_questions WHERE category = ?';
                let params = [category];
                if (topic) { qry += ' AND topic = ?'; params.push(topic); }
                if (difficulty && difficulty !== 'Adaptive') { qry += ' AND difficulty = ?'; params.push(difficulty); }
                qry += ' ORDER BY RAND() LIMIT ?';
                params.push(parseInt(count));
                [questions] = await db.query(qry, params);

                // Fallback 1: ignore topic if too few
                if (questions.length < parseInt(count) && topic) {
                    let qry2 = 'SELECT * FROM apt_questions WHERE category = ?';
                    let p2 = [category];
                    if (difficulty && difficulty !== 'Adaptive') { qry2 += ' AND difficulty = ?'; p2.push(difficulty); }
                    qry2 += ' ORDER BY RAND() LIMIT ?';
                    p2.push(parseInt(count));
                    [questions] = await db.query(qry2, p2);
                }

                // Fallback 2: ignore difficulty if still too few
                if (questions.length === 0) {
                    const [rows] = await db.query(
                        'SELECT * FROM apt_questions WHERE category = ? ORDER BY RAND() LIMIT ?',
                        [category, parseInt(count)]
                    );
                    questions = rows;
                }
            }

            res.json(questions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },


    // 2. Start Test Session (Server-Synced Timer)
    startSession: async (req, res) => {
        try {
            const userId = req.user.id;
            const { config, questions } = req.body;

            const startTime = new Date();
            const durationMinutes = config.duration || (questions.length * 1); // 1 min per question default
            const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

            // Clear any old session
            await db.query('DELETE FROM apt_active_sessions WHERE user_id = ?', [userId]);

            // Save new session
            await db.query(
                'INSERT INTO apt_active_sessions (user_id, test_config, questions, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
                [userId, JSON.stringify(config), JSON.stringify(questions), startTime, endTime]
            );

            res.json({ startTime, endTime, questions });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 3. Sync/Heartbeat (Browser Refresh Survival)
    syncSession: async (req, res) => {
        try {
            const userId = req.user.id;
            const [rows] = await db.query('SELECT * FROM apt_active_sessions WHERE user_id = ?', [userId]);

            if (rows.length === 0) return res.status(404).json({ error: 'No active session' });

            const session = rows[0];
            const now = new Date();

            if (now > new Date(session.end_time)) {
                return res.json({ expired: true, session });
            }

            res.json(session);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 4. Submit Test (Result Analytics)
    submitTest: async (req, res) => {
        try {
            const userId = req.user.id;
            const { result } = req.body; // { category, difficulty, timeUsed, answers }

            // 1. Fetch Active Session to verify questions and answers
            const [sessions] = await db.query('SELECT * FROM apt_active_sessions WHERE user_id = ?', [userId]);
            if (sessions.length === 0) return res.status(404).json({ error: 'No active session found' });

            const session = sessions[0];
            const questions = JSON.parse(session.questions);
            const userAnswers = result.ans || {};

            let score = 0;
            let totalMarks = 0;
            let correctCount = 0;
            const topicBreakdown = {};

            questions.forEach((q, i) => {
                const qMarks = q.marks || 1;
                const qNeg = q.negative_marks || 0;
                totalMarks += qMarks;

                if (!topicBreakdown[q.topic]) topicBreakdown[q.topic] = { correct: 0, total: 0, score: 0 };
                topicBreakdown[q.topic].total++;

                if (userAnswers[i] === q.answer) {
                    score += qMarks;
                    correctCount++;
                    topicBreakdown[q.topic].correct++;
                    topicBreakdown[q.topic].score += qMarks;
                } else if (userAnswers[i] !== undefined && userAnswers[i] !== null) {
                    score -= qNeg;
                    topicBreakdown[q.topic].score -= qNeg;
                }
            });

            const pct = Math.max(0, Math.round((score / totalMarks) * 100));
            const blueprint = generateBlueprint({ pct }, topicBreakdown);

            // 2. Save Attempt
            await db.query(
                `INSERT INTO apt_test_attempts 
                (user_id, category, difficulty, score, total_questions, percentage, time_used, topic_breakdown, blueprint, mistakes_count) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    userId, result.category, result.difficulty, score, questions.length,
                    pct, result.timeUsed, JSON.stringify(topicBreakdown),
                    JSON.stringify(blueprint), result.sillyMistakes || 0
                ]
            );

            // 3. Update User Stats & Streak
            const [currentStats] = await db.query('SELECT * FROM apt_user_progress WHERE user_id = ?', [userId]);
            let newStreak = 1;
            if (currentStats.length > 0) {
                const lastDate = currentStats[0].last_practice_date ? new Date(currentStats[0].last_practice_date) : null;
                const today = new Date();

                if (lastDate) {
                    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
                    if (diffDays === 1) newStreak = currentStats[0].streak + 1;
                    else if (diffDays === 0) newStreak = currentStats[0].streak;
                }
            }

            // Readiness Score: Weighted average of attempts (last 5)
            const [lastAttempts] = await db.query('SELECT percentage FROM apt_test_attempts WHERE user_id = ? ORDER BY date DESC LIMIT 5', [userId]);
            const avgPct = lastAttempts.reduce((s, a) => s + parseFloat(a.percentage), 0) / (lastAttempts.length || 1);
            const readiness = Math.min(100, (avgPct * 0.7) + (newStreak * 2));

            await db.query(
                `INSERT INTO apt_user_progress (user_id, readiness_score, streak, last_practice_date) 
                VALUES (?, ?, ?, CURDATE()) 
                ON DUPLICATE KEY UPDATE readiness_score = ?, streak = ?, last_practice_date = CURDATE()`,
                [userId, readiness, newStreak, readiness, newStreak]
            );

            // 4. Clear Session
            await db.query('DELETE FROM apt_active_sessions WHERE user_id = ?', [userId]);

            res.json({ success: true, score, totalMarks, pct, blueprint });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 5. Learn Mode Content
    getConcepts: async (req, res) => {
        try {
            const { category } = req.query;
            const [concepts] = await db.query('SELECT * FROM apt_concepts WHERE category = ?', [category]);
            res.json(concepts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 6. Resource Library
    getResources: async (req, res) => {
        try {
            const { category } = req.query;
            let query = 'SELECT * FROM apt_resources';
            let params = [];
            if (category && category !== 'All') {
                query += ' WHERE category = ?';
                params.push(category);
            }
            const [resources] = await db.query(query, params);
            res.json(resources);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // 7. Global Stats & Leaderboard
    getDashboardStats: async (req, res) => {
        try {
            const userId = req.user.id;
            const [progress] = await db.query('SELECT * FROM apt_user_progress WHERE user_id = ?', [userId]);
            const [attempts] = await db.query('SELECT * FROM apt_test_attempts WHERE user_id = ? ORDER BY date DESC LIMIT 10', [userId]);

            res.json({
                progress: progress[0] || { readiness_score: 0, streak: 0 },
                history: attempts
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = aptitudeController;
