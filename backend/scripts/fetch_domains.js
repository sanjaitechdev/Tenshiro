const db = require('../config/db');

async function fetchDomains() {
    try {
        const [domains] = await db.query('SELECT * FROM domains');
        console.log(JSON.stringify(domains, null, 2));
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fetchDomains();
