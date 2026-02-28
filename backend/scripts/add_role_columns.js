const db = require('../config/db');

async function addColumns() {
    try {
        // Add salary_mid
        try {
            await db.query('ALTER TABLE roles ADD COLUMN salary_mid VARCHAR(100)');
            console.log("Added salary_mid column");
        } catch (e) {
            if (e.code !== 'ER_DUP_FIELDNAME') console.log("salary_mid already exists or error:", e.message);
        }

        // Add future_growth
        try {
            await db.query('ALTER TABLE roles ADD COLUMN future_growth TEXT');
            console.log("Added future_growth column");
        } catch (e) {
            if (e.code !== 'ER_DUP_FIELDNAME') console.log("future_growth already exists or error:", e.message);
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

addColumns();
