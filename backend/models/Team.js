const mongoose = require('mongoose');

const ScoreCategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Presentation", "Functionality"
  score: { type: Number, required: true, min: 0, max: 20 }, // Each category max 20
  maxScore: { type: Number, default: 20 }
});

const TeamScoreSchema = new mongoose.Schema({
  judgeName: { type: String, required: true },
  round: { type: String, required: true },
  categories: [ScoreCategorySchema], // List of 5 categories
  totalScore: { 
    type: Number, 
    required: true,
    default: function () {
      return this.categories.reduce((sum, category) => sum + category.score, 0);
    }
  }, // Sum of category scores (max 100)
  timestamp: { type: Date, default: Date.now }
});

const FeedbackSchema = new mongoose.Schema({
  judgeName: { type: String, required: true },
  round: { type: String, required: true },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const MemberSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true }
});

const TeamSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  members: [MemberSchema],
  scores: [TeamScoreSchema],
  feedback: [FeedbackSchema],
  combinedTotalScore: { 
    type: Number, 
    default: 0 
  } // Sum of total scores from all rounds
});

// Pre-save middleware to update combined total score
TeamSchema.pre('save', function (next) {
  this.combinedTotalScore = this.scores.reduce((sum, score) => sum + score.totalScore, 0);
  next();
});

module.exports = mongoose.model('Team', TeamSchema);
