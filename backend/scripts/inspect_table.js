require('dotenv').config();
const mysql = require('mysql2/promise');

async function checkSchema() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const [columns] = await connection.query('SHOW COLUMNS FROM ai_conversations');
    console.log('Columns in ai_conversations:');
    columns.forEach(c => console.log(`- ${c.Field} (${c.Type})`));

    await connection.end();
}

checkSchema();
