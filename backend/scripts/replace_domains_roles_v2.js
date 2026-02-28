const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function replaceDomainRoleData() {
    let connection;
    try {
        console.log('🔄 Connecting to database...');
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            multipleStatements: true
        });

        console.log('✅ Connected to database.');

        // Read the v2 seed file
        console.log('📖 Reading v2 seed file...');
        const seedPath = path.join(__dirname, '../database/seed_domains_roles_v2.sql');
        const seedSql = fs.readFileSync(seedPath, 'utf8');

        // Execute the seed file
        console.log('🗑️  Clearing old data and inserting NEW v2 domains and roles...');
        await connection.query(seedSql);

        console.log('✅ Data replacement (v2) completed successfully!');

        // Verify the data
        console.log('\n📊 Verification:');
        const [domains] = await connection.query('SELECT COUNT(*) as count FROM domains');
        const [roles] = await connection.query('SELECT COUNT(*) as count FROM roles');

        console.log(`   - Total Domains: ${domains[0].count}`);
        console.log(`   - Total Roles: ${roles[0].count}`);

        // Show domain breakdown
        console.log('\n📋 Domain Breakdown:');
        const [domainList] = await connection.query(`
            SELECT d.name, COUNT(r.id) as role_count 
            FROM domains d 
            LEFT JOIN roles r ON d.id = r.domain_id 
            GROUP BY d.id, d.name 
            ORDER BY d.id
        `);

        domainList.forEach(domain => {
            console.log(`   - ${domain.name}: ${domain.role_count} roles`);
        });

        console.log('\n✨ Database update complete! Your PathPilot AI now has fresh v2 domain and role data.');

    } catch (error) {
        console.error('❌ Error replacing v2 domain/role data:', error);
        process.exit(1);
    } finally {
        if (connection) await connection.end();
    }
}

replaceDomainRoleData();
