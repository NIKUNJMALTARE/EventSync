const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  teamId: { type: String, default: null },
  ratings: [
    {
      category: { type: String, required: true },
      score: { type: Number, required: true, min: 1, max: 5 },
    },
  ],
  reaction: { 
    type: String, 
    enum: ['excited', 'happy', 'neutral', 'disappointed', 'frustrated'], 
    required: true 
  },
  comment: { type: String, default: '' },
  isAnonymous: { type: Boolean, default: false },
  attendeeName: { type: String, default: null },
  attendeeEmail: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
