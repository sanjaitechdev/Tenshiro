const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkUser() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const email = 'sanjaibtechit.official@gmail.com';
        const [users] = await connection.query('SELECT id, username, email, password_hash, google_id FROM users WHERE email = ?', [email]);

        if (users.length > 0) {
            console.log('User found:');
            console.log(JSON.stringify(users[0], null, 2));
            console.log('Has password hash:', !!users[0].password_hash);
            console.log('Has google id:', !!users[0].google_id);
        } else {
            console.log('User NOT found in database.');
            const [allUsers] = await connection.query('SELECT email FROM users');
            console.log('All available emails:', allUsers.map(u => u.email));
        }

        await connection.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

checkUser();
