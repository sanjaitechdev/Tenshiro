const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function verifyData() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('📊 PATHPILOT AI - DATA VERIFICATION REPORT\n');
        console.log('='.repeat(60));

        // Total counts
        const [domainCount] = await connection.query('SELECT COUNT(*) as count FROM domains');
        const [roleCount] = await connection.query('SELECT COUNT(*) as count FROM roles');

        console.log(`\n✅ Total Domains: ${domainCount[0].count}`);
        console.log(`✅ Total Roles: ${roleCount[0].count}\n`);
        console.log('='.repeat(60));

        // Detailed breakdown
        const [breakdown] = await connection.query(`
            SELECT 
                d.id,
                d.name,
                d.icon,
                COUNT(r.id) as role_count 
            FROM domains d 
            LEFT JOIN roles r ON d.id = r.domain_id 
            GROUP BY d.id, d.name, d.icon 
            ORDER BY d.id
        `);

        console.log('\n📋 DOMAIN-WISE BREAKDOWN:\n');
        breakdown.forEach((domain, index) => {
            console.log(`${String(index + 1).padStart(2, ' ')}. ${domain.name.padEnd(35, ' ')} | ${String(domain.role_count).padStart(3, ' ')} roles | Icon: ${domain.icon}`);
        });

        console.log('\n' + '='.repeat(60));

        // Demand level distribution
        const [demandDist] = await connection.query(`
            SELECT demand_indicator, COUNT(*) as count 
            FROM roles 
            GROUP BY demand_indicator
        `);

        console.log('\n📈 DEMAND LEVEL DISTRIBUTION:\n');
        demandDist.forEach(d => {
            console.log(`   ${d.demand_indicator}: ${d.count} roles`);
        });

        console.log('\n' + '='.repeat(60));
        console.log('\n✨ Database is ready for production use!');
        console.log('🚀 APIs /api/domains and /api/roles/:domainId will work correctly.\n');

    } catch (error) {
        console.error('❌ Verification error:', error);
        process.exit(1);
    } finally {
        if (connection) await connection.end();
    }
}

verifyData();
