const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });

async function checkRole() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [roles] = await connection.query('SELECT * FROM roles WHERE id = 2');
        if (roles.length > 0) {
            const r = roles[0];
            console.log('--- DETAILS ---');
            console.log('id type:', typeof r.id, r.id);
            console.log('title type:', typeof r.title, r.title);
            console.log('description type:', typeof r.description, r.description ? 'HAS_VALUE' : 'NULL/EMPTY');
            console.log('salary_mid type:', typeof r.salary_mid, r.salary_mid);
            console.log('future_growth type:', typeof r.future_growth, r.future_growth);
            console.log('domain_id type:', typeof r.domain_id, r.domain_id);
            console.log('domain_name type:', typeof r.domain_name, r.domain_name); // Check if this exists

            if (r.future_growth) {
                console.log('future_growth value:', r.future_growth);
            }
        } else {
            console.log('Role not found');
        }

        await connection.end();
    } catch (err) {
        console.error('Error:', err);
    }
}

checkRole();
