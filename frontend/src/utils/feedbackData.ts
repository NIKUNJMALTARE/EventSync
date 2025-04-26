
export type FeedbackRating = {
  category: string;
  score: number;
  maxScore: number;
};

export type FeedbackReaction = 'excited' | 'happy' | 'neutral' | 'disappointed' | 'frustrated';

export type AttendeeFeedback = {
  id: string;
  eventId: string; // Hackathon event ID
  teamId?: string; // Optional team ID if feedback is about a specific team
  timestamp: string;
  ratings: FeedbackRating[];
  reaction: FeedbackReaction;
  comment?: string;
  isAnonymous: boolean;
  attendeeName?: string;
  attendeeEmail?: string;
};

export type FeedbackCategory = {
  id: string;
  name: string;
  description: string;
};

export const FEEDBACK_CATEGORIES: FeedbackCategory[] = [
  { id: 'overall', name: 'Overall Experience', description: 'Your general impression of the hackathon' },
  { id: 'organization', name: 'Organization', description: 'How well was the event organized' },
  { id: 'judging', name: 'Judging Process', description: 'Fairness and clarity of the judging process' },
  { id: 'mentorship', name: 'Mentorship', description: 'Quality of mentoring and support' },
  { id: 'facilities', name: 'Facilities & Resources', description: 'Venue, equipment, and amenities' }
];

// Sample feedback data for testing
export const SAMPLE_FEEDBACK: AttendeeFeedback[] = [
  {
    id: '1',
    eventId: 'hackathon-2023',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    ratings: [
      { category: 'overall', score: 4, maxScore: 5 },
      { category: 'organization', score: 5, maxScore: 5 },
      { category: 'judging', score: 3, maxScore: 5 },
      { category: 'mentorship', score: 4, maxScore: 5 },
      { category: 'facilities', score: 5, maxScore: 5 }
    ],
    reaction: 'happy',
    comment: 'Great experience overall! The judging criteria could have been clearer.',
    isAnonymous: false,
    attendeeName: 'Alex Johnson',
    attendeeEmail: 'alex@example.com'
  },
  {
    id: '2',
    eventId: 'hackathon-2023',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    ratings: [
      { category: 'overall', score: 5, maxScore: 5 },
      { category: 'organization', score: 4, maxScore: 5 },
      { category: 'judging', score: 5, maxScore: 5 },
      { category: 'mentorship', score: 5, maxScore: 5 },
      { category: 'facilities', score: 3, maxScore: 5 }
    ],
    reaction: 'excited',
    comment: 'Fantastic event! Learned so much and met amazing people. The Wi-Fi was a bit spotty though.',
    isAnonymous: false,
    attendeeName: 'Priya Sharma',
    attendeeEmail: 'priya@example.com'
  },
  {
    id: '3',
    eventId: 'hackathon-2023',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    ratings: [
      { category: 'overall', score: 2, maxScore: 5 },
      { category: 'organization', score: 3, maxScore: 5 },
      { category: 'judging', score: 2, maxScore: 5 },
      { category: 'mentorship', score: 3, maxScore: 5 },
      { category: 'facilities', score: 4, maxScore: 5 }
    ],
    reaction: 'disappointed',
    comment: 'The schedule was confusing and kept changing. Mentors were hard to find when needed.',
    isAnonymous: true
  },
  {
    id: '4',
    eventId: 'hackathon-2023',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    ratings: [
      { category: 'overall', score: 4, maxScore: 5 },
      { category: 'organization', score: 4, maxScore: 5 },
      { category: 'judging', score: 4, maxScore: 5 },
      { category: 'mentorship', score: 2, maxScore: 5 },
      { category: 'facilities', score: 5, maxScore: 5 }
    ],
    reaction: 'neutral',
    comment: 'Good event, but needed more technical mentors who understand blockchain development.',
    isAnonymous: false,
    attendeeName: 'Carlos Rodriguez',
    attendeeEmail: 'carlos@example.com'
  },
  {
    id: '5',
    eventId: 'hackathon-2023',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
    ratings: [
      { category: 'overall', score: 5, maxScore: 5 },
      { category: 'organization', score: 5, maxScore: 5 },
      { category: 'judging', score: 5, maxScore: 5 },
      { category: 'mentorship', score: 5, maxScore: 5 },
      { category: 'facilities', score: 4, maxScore: 5 }
    ],
    reaction: 'excited',
    comment: 'Best hackathon I\'ve attended! Incredibly well organized and the judges gave fantastic feedback.',
    isAnonymous: false,
    attendeeName: 'Emma Wilson',
    attendeeEmail: 'emma@example.com'
  }
];

// Utility function to get feedback by eventId
export const getFeedbackByEventId = (eventId: string): AttendeeFeedback[] => {
  return SAMPLE_FEEDBACK.filter(feedback => feedback.eventId === eventId);
};

// Utility function to calculate average rating for a category
export const getAverageRating = (feedbackList: AttendeeFeedback[], category: string): number => {
  const ratings = feedbackList
    .map(feedback => feedback.ratings.find(r => r.category === category))
    .filter(rating => rating !== undefined) as FeedbackRating[];
  
  if (ratings.length === 0) return 0;
  
  const sum = ratings.reduce((acc, rating) => acc + rating.score, 0);
  return parseFloat((sum / ratings.length).toFixed(1));
};

// Utility function to count reactions
export const countReactions = (feedbackList: AttendeeFeedback[]): Record<FeedbackReaction, number> => {
  const counts: Record<FeedbackReaction, number> = {
    excited: 0,
    happy: 0,
    neutral: 0,
    disappointed: 0,
    frustrated: 0
  };
  
  feedbackList.forEach(feedback => {
    counts[feedback.reaction]++;
  });
  
  return counts;
};
