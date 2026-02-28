const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' }); // Adjusted path to backend root

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
            console.log('FULL ROLE DATA:');
            console.log(JSON.stringify(roles[0], null, 2));

            console.log('\n--- TYPES ---');
            console.log('Type of description:', typeof roles[0].description);
            console.log('Type of salary_mid:', typeof roles[0].salary_mid);
            console.log('Type of future_growth:', typeof roles[0].future_growth);
            console.log('Value of future_growth:', roles[0].future_growth);
        } else {
            console.log('Role not found');
        }

        await connection.end();
    } catch (err) {
        console.error('Error:', err);
    }
}

checkRole();
