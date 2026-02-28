const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
require('dotenv').config();
const db = require('./config/db');

const app = express();

// Initialize Passport
require('./config/passport')(passport);

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

// Routes
const apiRoutes = require('./routes/api');
const aptitudeRoutes = require('./routes/aptitudeRoutes');
app.use('/api', apiRoutes);
app.use('/api/aptitude', aptitudeRoutes);

// Database Connection Test
app.get('/api/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        res.json({ message: 'Database connected', result: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Server is successfully listening on port ' + PORT);
});

// Add a keep-alive interval to prevent process exit if event loop becomes empty
setInterval(() => {
    // console.log('Keep-alive ping...');
}, 60000);

console.log('Server.js reached the end of the file.');

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', err);
    // Don't exit, just log it so we can see what's happening
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Keep the process alive for a bit to ensure log is flushed
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});
