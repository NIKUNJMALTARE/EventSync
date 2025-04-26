const express = require('express');
const {
  getAllTeams,
  getTeamById,
  addTeam,
  addScore,
  addFeedback,
  seedData
} = require('../controllers/teamController');

const router = express.Router();

router.get('/teams', getAllTeams);
router.get('/teams/:id', getTeamById);
router.post('/teams', addTeam);
router.post('/teams/:id/scores', addScore);
router.post('/teams/:id/feedback', addFeedback);
router.post('/seed', seedData);

module.exports = router;
