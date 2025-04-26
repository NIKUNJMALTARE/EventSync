// const Feedback = require('../models/feedback.model');

// // Submit new feedback
// exports.submitFeedback = async (req, res) => {
//   try {
//     const { eventId, teamId, ratings, reaction, comment, isAnonymous, attendeeName, attendeeEmail } = req.body;

//     // Validate input
//     if (!eventId || !ratings || !reaction) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // If not anonymous, name and email are required
//     if (!isAnonymous && (!attendeeName || !attendeeEmail)) {
//       return res.status(400).json({ error: 'Name and email are required for non-anonymous feedback' });
//     }

//     // Save to database
//     const newFeedback = new Feedback({
//       eventId,
//       teamId: teamId || null,
//       ratings,
//       reaction,
//       comment,
//       isAnonymous,
//       attendeeName: isAnonymous ? null : attendeeName,
//       attendeeEmail: isAnonymous ? null : attendeeEmail
//     });

//     await newFeedback.save();
//     res.status(201).json({ message: 'Feedback submitted successfully' });

//   } catch (error) {
//     console.error('Error submitting feedback:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Get feedback for an event
// exports.getEventFeedback = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     if (!eventId) return res.status(400).json({ error: 'Event ID is required' });

//     const feedback = await Feedback.find({ eventId });
//     res.status(200).json(feedback);

//   } catch (error) {
//     console.error('Error fetching feedback:', error);
//     res.status(500).json({ error: 'Internal Server Error' })}
// };

// // Get feedback for a specific team in an event
// exports.getTeamFeedback = async (req, res) => {
//   try {
//     const { eventId, teamId } = req.params;
//     if (!eventId || !teamId) return res.status(400).json({ error: 'Event ID and Team ID are required' });

//     const feedback = await Feedback.find({ eventId, teamId });
//     res.status(200).json(feedback);

//   } catch (error) {
//     console.error('Error fetching team feedback:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const Feedback = require('../models/feedback.model');

// // ✅ Submit new feedback
// exports.submitFeedback = async (req, res) => {
//   try {
//     const { eventId, teamId, ratings, reaction, comment, isAnonymous, attendeeName, attendeeEmail } = req.body;

//     // Validate input
//     if (!eventId || !ratings || !reaction) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // If not anonymous, name and email are required
//     if (!isAnonymous && (!attendeeName || !attendeeEmail)) {
//       return res.status(400).json({ error: 'Name and email are required for non-anonymous feedback' });
//     }

//     // Save to database
//     const newFeedback = new Feedback({
//       eventId,
//       teamId: teamId || null,
//       ratings,
//       reaction,
//       comment,
//       isAnonymous,
//       attendeeName: isAnonymous ? null : attendeeName,
//       attendeeEmail: isAnonymous ? null : attendeeEmail
//     });

//     await newFeedback.save();
//     res.status(201).json({ message: 'Feedback submitted successfully' });

//   } catch (error) {
//     console.error('Error submitting feedback:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// // ✅ Get ALL feedback (NEW FUNCTION)
// exports.getAllFeedback = async (req, res) => {
//   try {
//     const feedback = await Feedback.find(); // Get all feedback without any filter
//     res.status(200).json(feedback);
//   } catch (error) {
//     console.error('Error fetching all feedback:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// // ✅ Get feedback for a specific event
// exports.getEventFeedback = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     if (!eventId) return res.status(400).json({ error: 'Event ID is required' });

//     const feedback = await Feedback.find({ eventId });
//     res.status(200).json(feedback);

//   } catch (error) {
//     console.error('Error fetching feedback:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// // ✅ Get feedback for a specific team in an event
// exports.getTeamFeedback = async (req, res) => {
//   try {
//     const { eventId, teamId } = req.params;
//     if (!eventId || !teamId) return res.status(400).json({ error: 'Event ID and Team ID are required' });

//     const feedback = await Feedback.find({ eventId, teamId });
//     res.status(200).json(feedback);

//   } catch (error) {
//     console.error('Error fetching team feedback:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const { v4: uuidv4 } = require('uuid'); // Import UUID
const Feedback = require('../models/feedback.model');

// ✅ Submit new feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { eventId, teamId, ratings, reaction, comment, isAnonymous, attendeeName, attendeeEmail } = req.body;

    // Validate input
    if (!eventId || !ratings || !reaction) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // If not anonymous, name and email are required
    if (!isAnonymous && (!attendeeName || !attendeeEmail)) {
      return res.status(400).json({ error: 'Name and email are required for non-anonymous feedback' });
    }

    // Generate unique ID
    const feedbackId = uuidv4();

    // Save to database
    const newFeedback = new Feedback({
      id: feedbackId, // Assigning the UUID
      eventId,
      teamId: teamId || null,
      ratings,
      reaction,
      comment,
      isAnonymous,
      attendeeName: isAnonymous ? null : attendeeName,
      attendeeEmail: isAnonymous ? null : attendeeEmail
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', id: feedbackId });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Get ALL feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching all feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Get feedback for a specific event
exports.getEventFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) return res.status(400).json({ error: 'Event ID is required' });

    const feedback = await Feedback.find({ eventId });
    res.status(200).json(feedback);

  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Get feedback for a specific team in an event
exports.getTeamFeedback = async (req, res) => {
  try {
    const { eventId, teamId } = req.params;
    if (!eventId || !teamId) return res.status(400).json({ error: 'Event ID and Team ID are required' });

    const feedback = await Feedback.find({ eventId, teamId });
    res.status(200).json(feedback);

  } catch (error) {
    console.error('Error fetching team feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};