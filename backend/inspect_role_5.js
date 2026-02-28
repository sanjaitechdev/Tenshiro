const mysql = require('mysql2/promise');
require('dotenv').config({ path: './.env' });

async function checkRole() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [roles] = await connection.query('SELECT * FROM roles WHERE id = 5');
        if (roles.length > 0) {
            console.log(JSON.stringify(roles[0], null, 2));
        } else {
            console.log('Role not found');
        }

        await connection.end();
    } catch (err) {
        console.error('Error:', err);
    }
}

checkRole();
