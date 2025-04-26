// const express = require('express');
// const router = express.Router();
// const feedbackController = require('../controllers/feedback.controller');

// // Submit feedback
// router.post('/submit', feedbackController.submitFeedback);

// // Get all feedback for an event
// router.get('/feedback', feedbackController.getEventFeedback);

// // Get all feedback for a specific team in an event
// router.get('/event/:eventId/team/:teamId', feedbackController.getTeamFeedback);

// module.exports = router;

const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');

// Submit feedback
router.post('/submit', feedbackController.submitFeedback);

// Get all feedback
router.get('/all', feedbackController.getAllFeedback);

// Get all feedback for a specific event
router.get('/feedback/:eventId', feedbackController.getEventFeedback);

// Get all feedback for a specific team in an event
router.get('/event/:eventId/team/:teamId', feedbackController.getTeamFeedback);

module.exports = router;