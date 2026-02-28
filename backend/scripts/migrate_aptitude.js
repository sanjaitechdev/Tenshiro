const db = require('../config/db');

const migrate = async () => {
    try {
        console.log('Starting Aptitude Schema Migration...');

        const addColumn = async (table, column, definition) => {
            const [rows] = await db.query(`
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = ? AND COLUMN_NAME = ? AND TABLE_SCHEMA = DATABASE()
            `, [table, column]);

            if (rows.length === 0) {
                await db.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
                console.log(`✔ Added ${column} to ${table}`);
            } else {
                console.log(`ℹ ${column} already exists in ${table}`);
            }
        };

        // 1. Update apt_questions table
        await addColumn('apt_questions', 'marks', 'INT DEFAULT 1');
        await addColumn('apt_questions', 'negative_marks', 'DECIMAL(5,2) DEFAULT 0.00');
        await addColumn('apt_questions', 'section', 'VARCHAR(50)');

        // 2. Add description to apt_concepts
        await addColumn('apt_concepts', 'description', 'TEXT');

        // 3. Ensure apt_user_progress has all fields
        await db.query(`
            ALTER TABLE apt_user_progress 
            MODIFY COLUMN readiness_score DECIMAL(5,2) DEFAULT 0.00
        `);
        console.log('✔ Verified apt_user_progress readiness_score');

        console.log('Migration completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
};

migrate();
