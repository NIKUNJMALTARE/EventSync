const Team = require('../models/Team');

// Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get team by ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findOne({ id: req.params.id });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new team
exports.addTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add score to a team
exports.addScore = async (req, res) => {
  try {
    const team = await Team.findOne({ id: req.params.id });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const newScore = req.body;
    if (!newScore.categories || newScore.categories.length !== 5) {
      return res.status(400).json({ message: 'Scores must include exactly 5 categories' });
    }

    // Validate score limit
    for (const category of newScore.categories) {
      if (category.score > 20) {
        return res.status(400).json({ message: `Category ${category.name} exceeds max score of 20` });
      }
    }

    // Calculate total score
    newScore.totalScore = newScore.categories.reduce((sum, category) => sum + category.score, 0);
    team.scores.push(newScore);

    // Update combined score
    team.combinedTotalScore = team.scores.reduce((sum, score) => sum + score.totalScore, 0);

    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add feedback to a team
exports.addFeedback = async (req, res) => {
  try {
    const team = await Team.findOne({ id: req.params.id });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    team.feedback.push(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Seed database
exports.seedData = async (req, res) => {
  try {
    const { TEAMS } = require('../utils/teamData');

    for (const team of TEAMS) {
      team.scores.forEach(score => {
        score.totalScore = score.categories.reduce((sum, category) => sum + category.score, 0);
      });

      team.combinedTotalScore = team.scores.reduce((sum, score) => sum + score.totalScore, 0);

      await Team.updateOne({ id: team.id }, team, { upsert: true });
    }

    res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};