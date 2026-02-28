const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function runMigration() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true
    });

    try {
        console.log('📦 Running Jobs & Internships schema migration...');
        const schemaSQL = await fs.readFile(path.join(__dirname, '../database/schema_jobs.sql'), 'utf8');
        await connection.query(schemaSQL);
        console.log('✅ Schema created successfully!');

        console.log('📦 Seeding Jobs & Internships data...');
        const seedSQL = await fs.readFile(path.join(__dirname, '../database/seed_jobs.sql'), 'utf8');
        await connection.query(seedSQL);
        console.log('✅ Data seeded successfully!');

        console.log('\n🎉 Jobs & Internships feature is ready!');
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        throw error;
    } finally {
        await connection.end();
    }
}

runMigration().catch(console.error);
