require('dotenv').config();
const mysql = require('mysql2/promise');

async function checkConversations() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const [rows] = await connection.query('SELECT * FROM ai_conversations ORDER BY created_at DESC LIMIT 5');
    console.log('Last 5 conversations:');
    rows.forEach(r => {
        console.log(`[${r.sender}] ${r.message} (${r.created_at})`);
        if (r.quick_replies) console.log(`  QR: ${r.quick_replies}`);
    });

    await connection.end();
}

checkConversations();
