const pool = require('./config/db');

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        console.log('Database connection successful!');
        console.log('Result:', rows[0].result);

        const [databases] = await pool.query('SHOW DATABASES');
        console.log('Available Databases:', databases.map(db => db.Database).join(', '));

        process.exit(0);
    } catch (err) {
        console.error('Database connection failed!');
        console.error('Error:', err.message);
        process.exit(1);
    }
}

testConnection();
