const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkDb() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

    try {
        const [databases] = await connection.query('SHOW DATABASES');
        const dbNames = databases.map(db => Object.values(db)[0]);
        console.log('Available Databases:', dbNames);

        if (dbNames.includes(process.env.DB_NAME)) {
            console.log(`PASS: Database "${process.env.DB_NAME}" exists.`);
            await connection.query(`USE ${process.env.DB_NAME}`);
            const [tables] = await connection.query('SHOW TABLES');
            console.log('Tables in database:', tables.map(t => Object.values(t)[0]));
        } else {
            console.log(`FAIL: Database "${process.env.DB_NAME}" DOES NOT exist.`);
        }
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await connection.end();
    }
}

checkDb();
