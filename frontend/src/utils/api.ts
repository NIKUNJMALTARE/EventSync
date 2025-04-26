
import axios from 'axios';
import { AttendeeFeedback, SAMPLE_FEEDBACK } from './feedbackData';
import { Team } from './teamData';

const API_URL = 'http://localhost:5000/api';

// Configure axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Teams API
export const fetchTeams = async (): Promise<Team[]> => {
  try {
    const response = await api.get('/teams');
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const fetchTeamById = async (id: string): Promise<Team> => {
  try {
    const response = await api.get(`/teams/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching team ${id}:`, error);
    throw error;
  }
};

// Feedback API
export const fetchFeedback = async (eventId: string): Promise<AttendeeFeedback[]> => {
  try {
    const response = await api.get('/feedback/all'); // Match backend route
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};


export const submitFeedback = async (feedback: Omit<AttendeeFeedback, 'id' | 'timestamp'>): Promise<AttendeeFeedback> => {
  try {
    // For demo purposes, we'll simulate an API response
    // In production, this would be:
     const response = await api.post('/feedback/submit', feedback);
     return response.data;
    
    const newFeedback: AttendeeFeedback = {
      ...feedback,
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toISOString(),
    };
    
    // In a real application, we would update the database
    // For demo, we'll just log it
    console.log('Submitted feedback:', newFeedback);
    
    return newFeedback;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

// Judge Score API
export const addScore = async (teamId: string, scoreData: any): Promise<void> => {
  try {
    // For demo purposes, we'll simulate an API response
    // In production, this would be:
     await api.post(`/teams/${teamId}/scores`, scoreData);
    
    console.log(`Added score for team ${teamId}:`, scoreData);
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error adding score:', error);
    throw error;
  }
};

// Judge Feedback API
export const addFeedback = async (teamId: string, feedbackData: any): Promise<void> => {
  try {
    // For demo purposes, we'll simulate an API response
    // In production, this would be:
     await api.post(`/teams/${teamId}/feedback`, feedbackData);
    
    console.log(`Added feedback for team ${teamId}:`, feedbackData);
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error;
  }
};
