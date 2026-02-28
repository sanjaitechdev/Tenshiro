const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    const { username, email, password, role, year_of_study, college_name } = req.body;
    try {
        // Check if user exists
        const [existing] = await db.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);
        if (existing.length > 0) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        await db.query(
            'INSERT INTO users (username, email, password_hash, role, year_of_study, college_name) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, hashedPassword, role || 'student', year_of_study, college_name]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Create Token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, username, email, role, year_of_study, college_name, preferred_language FROM users WHERE id = ?', [req.user.id]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(users[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update User Language/Profile
exports.updateLanguage = async (req, res) => {
    const { language } = req.body;
    if (!language) return res.status(400).json({ message: 'Language is required' });

    try {
        await db.query('UPDATE users SET preferred_language = ? WHERE id = ?', [language, req.user.id]);
        res.json({ message: 'Language updated successfully', language });
    } catch (err) {
        console.error('Update Language Error:', err);
        res.status(500).json({ error: 'Failed to update language' });
    }
};

// Google OAuth Callback Handler
exports.googleAuth = async (req, res) => {
    try {
        const user = req.user;

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Redirect to frontend with token
        res.redirect(`http://localhost:5173/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
            id: user.id,
            username: user.username,
            role: user.role
        }))}`);
    } catch (err) {
        console.error('Google Auth Error:', err);
        res.redirect('http://localhost:5173/login?error=auth_failed');
    }
};

// Developer Bypass Login
exports.devLogin = async (req, res) => {
    const { email, username } = req.body;
    const targetEmail = email || 'devuser@example.com';
    const targetName = username || 'Developer User';

    try {
        // Use a test user or create one
        let [users] = await db.query('SELECT * FROM users WHERE email = ?', [targetEmail]);
        let user;

        if (users.length === 0) {
            const [result] = await db.query(
                'INSERT INTO users (username, email, google_id, role) VALUES (?, ?, ?, ?)',
                [targetName, targetEmail, `dev_bypass_${Date.now()}`, 'student']
            );
            const [newUser] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
            user = newUser[0];
        } else {
            user = users[0];
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (err) {
        console.error('Dev Login Error:', err);
        res.status(500).json({ error: 'Dev login failed' });
    }
};
