const db = require('../config/db');
const bcrypt = require('bcryptjs');

async function createTestUser() {
    try {
        const hashedPassword = await bcrypt.hash('password123', 10);
        const email = 'sqltestuser@example.com';

        // Check if exists
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            console.log('User already exists');
            process.exit(0);
        }

        await db.query(
            'INSERT INTO users (username, email, password_hash, role, year_of_study, college_name) VALUES (?, ?, ?, ?, ?, ?)',
            ['sqltestuser', email, hashedPassword, 'student', 3, 'Test College']
        );
        console.log('User created successfully');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

createTestUser();
