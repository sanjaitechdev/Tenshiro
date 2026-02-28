const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');
const dataController = require('../controllers/dataController');
const aiController = require('../controllers/aiController');
const interviewController = require('../controllers/interviewController');

// Auth Routes
router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);
router.post('/auth/dev-login', userController.devLogin);
router.get('/auth/user', auth, userController.getProfile);
router.put('/auth/update-language', auth, userController.updateLanguage);

// Google OAuth Routes
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false
    })
);

router.get('/auth/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: 'http://localhost:5173/login?error=auth_failed'
    }),
    userController.googleAuth
);

// Data Routes
router.get('/domains', auth, dataController.getDomains);
router.get('/domains/:domainId/roles', auth, dataController.getRolesByDomain);
router.get('/roles/:id', auth, dataController.getRoleDetails);
router.get('/roles/:id/study-plan', auth, dataController.getStudyPlan); // New
router.get('/roadmap/:roleId', auth, dataController.getRoadmap);

// Jobs & Internships Routes
router.get('/jobs', auth, dataController.getAllJobs);
router.get('/jobs/role/:roleId', auth, dataController.getJobsByRole);
router.get('/applications', auth, dataController.getUserApplications);
router.post('/applications', auth, dataController.trackApplication);
router.put('/applications/:id', auth, dataController.updateApplicationStage);

// AI Routes
router.post('/ai/chat', auth, aiController.chat);
router.post('/ai/premium-overview', auth, aiController.getPremiumOverview);
router.get('/ai/chat-history', auth, aiController.getChatHistory); // New
router.post('/ai/course-recommendation', auth, aiController.courseRecommendation); // New
router.post('/ai/project-suggestion', auth, aiController.projectSuggestion); // New
router.post('/ai/job-recommendation', auth, aiController.jobRecommendation); // New
router.post('/ai/placement-guidance', auth, aiController.placementGuidance); // New
router.post('/ai/roadmap', auth, aiController.generateRoadmap); // New
router.post('/ai/translate', auth, aiController.translate); // New

// Interview Intelligence Routes
router.post('/interview/generate', auth, interviewController.generateQuestions);
router.post('/interview/analyze', auth, interviewController.analyzeInterview);
router.post('/interview/prep-data', auth, interviewController.getPrepData);
router.get('/interview/history', auth, interviewController.getHistory);

module.exports = router;
