const express = require('express');
const router = express.Router();
const aptitudeController = require('../controllers/aptitudeController');
const auth = require('../middleware/auth');

// Question & Learn Routes
router.get('/questions', auth, aptitudeController.getQuestions);
router.get('/concepts', auth, aptitudeController.getConcepts);
router.get('/resources', auth, aptitudeController.getResources);

// Session Management (Real-time and Sync)
router.post('/session/start', auth, aptitudeController.startSession);
router.get('/session/sync', auth, aptitudeController.syncSession);

// Results & Analytics
router.post('/submit', auth, aptitudeController.submitTest);
router.get('/stats', auth, aptitudeController.getDashboardStats);

module.exports = router;
