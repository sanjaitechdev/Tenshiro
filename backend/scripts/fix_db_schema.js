require('dotenv').config();
const mysql = require('mysql2/promise');

async function fixSchema() {
    const dbConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true
    };

    console.log('Connecting to database...');
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected!');

        console.log('Checking ai_conversations table...');
        const [columns] = await connection.query('SHOW COLUMNS FROM ai_conversations');
        const columnNames = columns.map(c => c.Field);

        const updates = [];

        if (!columnNames.includes('language')) {
            updates.push("ADD COLUMN language VARCHAR(10) DEFAULT 'en'");
        }
        if (!columnNames.includes('is_voice')) {
            updates.push("ADD COLUMN is_voice BOOLEAN DEFAULT FALSE");
        }
        if (!columnNames.includes('quick_replies')) {
            updates.push("ADD COLUMN quick_replies JSON");
        }

        if (updates.length > 0) {
            console.log('Adding missing columns:', updates.join(', '));
            await connection.query(`ALTER TABLE ai_conversations ${updates.join(', ')}`);
            console.log('Schema updated successfully!');
        } else {
            console.log('Schema is already up to date.');
        }

    } catch (error) {
        console.error('Schema fix failed:', error);
    } finally {
        if (connection) await connection.end();
    }
}

fixSchema();
