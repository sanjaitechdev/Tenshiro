require('dotenv').config();
const mysql = require('mysql2/promise');

async function checkSchema() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const [tables] = await connection.query('SHOW TABLES');
    console.log('Tables in database:');
    for (const t of tables) {
        const tableName = Object.values(t)[0];
        const [[{ count }]] = await connection.query(`SELECT COUNT(*) as count FROM \`${tableName}\``);
        console.log(`- ${tableName} (${count} rows)`);
    }

    await connection.end();
}

checkSchema();
