const db = require('../config/db');

// Get All Domains
exports.getDomains = async (req, res) => {
    try {
        const [domains] = await db.query('SELECT * FROM domains');
        res.json(domains);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Roles by Domain
exports.getRolesByDomain = async (req, res) => {
    try {
        const [roles] = await db.query('SELECT * FROM roles WHERE domain_id = ?', [req.params.domainId]);
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Role Details
// Get Role Details
exports.getRoleDetails = async (req, res) => {
    try {
        const [roles] = await db.query('SELECT * FROM roles WHERE id = ?', [req.params.id]);
        if (roles.length === 0) return res.status(404).json({ message: 'Role not found' });

        const role = roles[0];

        // Mock Future Growth Data (until DB schema is updated)
        role.future_growth = {
            growth_rate: "High (+22%)",
            ai_impact: "Low Risk (Creative/Complex)",
            top_industries: ["Tech", "Finance", "Healthcare"],
            description: role.future_growth || "This role is projected to have strong demand as industries digitize." // Fallback to existing string if any
        };

        res.json(role);
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Roadmap for Role
exports.getRoadmap = async (req, res) => {
    try {
        const [phases] = await db.query('SELECT * FROM roadmap_phases WHERE role_id = ? ORDER BY phase_order', [req.params.roleId]);

        if (phases.length === 0) {
            // Fetch Role Title for fallback
            const [roles] = await db.query('SELECT title FROM roles WHERE id = ?', [req.params.roleId]);
            const roleTitle = roles.length ? roles[0].title : 'Role';

            // Return Dynamic Fallback instead of empty array
            return res.json([
                {
                    id: 'f1', title: 'Phase 1: Foundations', description: `Master the core concepts of ${roleTitle}`,
                    tasks: [
                        { id: 't1', title: `Intro to ${roleTitle}`, description: 'Understand the basics and industry landscape', duration: 'Week 1' },
                        { id: 't2', title: 'Core Terminology', description: 'Learn key terms and definitions', duration: 'Week 2' }
                    ]
                },
                {
                    id: 'f2', title: 'Phase 2: Advanced Skills', description: 'Deep dive into technical skills',
                    tasks: [
                        { id: 't3', title: 'Advanced Tools', description: `Master the tools used by expert ${roleTitle}s`, duration: 'Week 3' },
                        { id: 't4', title: 'Practical Application', description: 'Apply knowledge to real-world scenarios', duration: 'Week 4' }
                    ]
                }
            ]);
        }

        // Fetch tasks for each phase
        const roadmap = await Promise.all(phases.map(async (phase) => {
            const [tasks] = await db.query('SELECT * FROM roadmap_tasks WHERE phase_id = ?', [phase.id]);
            return { ...phase, tasks };
        }));

        res.json(roadmap);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Generate Study Plan (Weekly breakdown of roadmap)
exports.getStudyPlan = async (req, res) => {
    try {
        // Fetch phases and tasks
        const [phases] = await db.query('SELECT * FROM roadmap_phases WHERE role_id = ? ORDER BY phase_order', [req.params.id]);

        const studyPlan = await Promise.all(phases.map(async (phase, index) => {
            const [tasks] = await db.query('SELECT * FROM roadmap_tasks WHERE phase_id = ?', [phase.id]);
            return {
                week: index + 1,
                focus: phase.title,
                tasks: tasks.map(t => t.title),
                goal: phase.description
            };
        }));

        res.json(studyPlan);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// ==================== JOBS & INTERNSHIPS ====================

// Get All Jobs and Internships
exports.getAllJobs = async (req, res) => {
    try {
        const [jobs] = await db.query(`
            SELECT j.*, r.title as role_title 
            FROM jobs_internships j 
            LEFT JOIN roles r ON j.role_id = r.id 
            ORDER BY j.posted_date DESC
        `);
        res.json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Jobs by Role
exports.getJobsByRole = async (req, res) => {
    try {
        const [jobs] = await db.query(`
            SELECT j.*, r.title as role_title 
            FROM jobs_internships j 
            LEFT JOIN roles r ON j.role_id = r.id 
            WHERE j.role_id = ? 
            ORDER BY j.posted_date DESC
        `, [req.params.roleId]);
        res.json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get User's Job Applications
exports.getUserApplications = async (req, res) => {
    try {
        const [applications] = await db.query(`
            SELECT a.*, j.title, j.company, j.type, j.location, j.salary_range, 
                   j.portal_name, j.portal_link, r.title as role_title
            FROM user_job_applications a
            JOIN jobs_internships j ON a.job_id = j.id
            LEFT JOIN roles r ON j.role_id = r.id
            WHERE a.user_id = ?
            ORDER BY a.updated_at DESC
        `, [req.user.id]);
        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Track New Application
exports.trackApplication = async (req, res) => {
    try {
        const { job_id, stage, notes } = req.body;
        const applied_date = stage === 'applied' ? new Date() : null;

        await db.query(`
            INSERT INTO user_job_applications (user_id, job_id, stage, applied_date, notes)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE stage = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
        `, [req.user.id, job_id, stage, applied_date, notes, stage, notes]);

        res.json({ message: 'Application tracked successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update Application Stage
exports.updateApplicationStage = async (req, res) => {
    try {
        const { stage, notes } = req.body;
        const applied_date = stage === 'applied' ? new Date() : null;

        await db.query(`
            UPDATE user_job_applications 
            SET stage = ?, notes = ?, applied_date = COALESCE(applied_date, ?), updated_at = CURRENT_TIMESTAMP
            WHERE id = ? AND user_id = ?
        `, [stage, notes, applied_date, req.params.id, req.user.id]);

        res.json({ message: 'Application updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
