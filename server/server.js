const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Team = require('./models/Team');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://laveshvyas20:HYfPIVV7timUKqPN@cluster0.frfboac.mongodb.net/HackathonDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Health check route
app.get('/api/health', (req, res) => {
  res.send('Healthy');
});

// Get all teams
app.get('/api/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get team by ID
app.get('/api/teams/:id', async (req, res) => {
  try {
    const team = await Team.findOne({ id: req.params.id });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new team
app.post('/api/teams', async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add score to a team
app.post('/api/teams/:id/scores', async (req, res) => {
  try {
    const team = await Team.findOne({ id: req.params.id });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const newScore = req.body;
    if (!newScore.categories || newScore.categories.length !== 5) {
      return res.status(400).json({ message: 'Scores must include exactly 5 categories' });
    }

    // Ensure each category has a max of 20
    for (const category of newScore.categories) {
      if (category.score > 20) {
        return res.status(400).json({ message: `Category ${category.name} exceeds max score of 20` });
      }
    }

    // Calculate total score for the round
    newScore.totalScore = newScore.categories.reduce((sum, category) => sum + category.score, 0);

    // Add the new score entry
    team.scores.push(newScore);

    // Update combined total score
    team.combinedTotalScore = team.scores.reduce((sum, score) => sum + score.totalScore, 0);

    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add feedback to a team
app.post('/api/teams/:id/feedback', async (req, res) => {
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
});

// Seed initial data
app.post('/api/seed', async (req, res) => {
  try {
    // Import data from src/utils/teamData.js
    const { TEAMS } = require('../src/utils/teamData');

    for (const team of TEAMS) {
      // Ensure totalScore and combinedTotalScore are calculated
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
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
