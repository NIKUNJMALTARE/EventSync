import axios from 'axios';
import { Team, TeamScore, JudgeFeedback } from './teamData';
import { MOCK_TEAMS } from './mockData';

const API_URL = 'http://localhost:5000/api';

// Helper function to check if API is available
const isApiAvailable = async (): Promise<boolean> => {
  try {
    await axios.get(`${API_URL}/health`, { timeout: 2000 });
    return true;
  } catch (error) {
    console.log('API not available, using mock data');
    return false;
  }
};

export const fetchTeams = async (): Promise<Team[]> => {
  try {
    // Check if API is available
    const apiAvailable = await isApiAvailable();
    
    if (apiAvailable) {
      const response = await axios.get(`${API_URL}/teams`);
      return response.data;
    } else {
      // Return mock data if API is unavailable
      console.log('Using mock teams data');
      return MOCK_TEAMS;
    }
  } catch (error) {
    console.error('Error fetching teams:', error);
    // Fall back to mock data on error
    console.log('Falling back to mock teams data');
    return MOCK_TEAMS;
  }
};

export const fetchTeamById = async (id: string): Promise<Team> => {
  try {
    const apiAvailable = await isApiAvailable();
    
    if (apiAvailable) {
      const response = await axios.get(`${API_URL}/teams/${id}`);
      return response.data;
    } else {
      // Return mock team if API is unavailable
      const team = MOCK_TEAMS.find(t => t.id === id);
      if (!team) throw new Error(`Team with ID ${id} not found`);
      return team;
    }
  } catch (error) {
    console.error(`Error fetching team ${id}:`, error);
    // Find team in mock data
    const team = MOCK_TEAMS.find(t => t.id === id);
    if (!team) throw new Error(`Team with ID ${id} not found`);
    return team;
  }
};

export const addScore = async (teamId: string, score: Omit<TeamScore, 'teamId'>): Promise<Team> => {
  try {
    const apiAvailable = await isApiAvailable();
    
    if (apiAvailable) {
      const scoreWithTeamId = {
        ...score,
        teamId
      };
      const response = await axios.post(`${API_URL}/teams/${teamId}/scores`, scoreWithTeamId);
      return response.data;
    } else {
      // Mock adding score to local data
      const teamIndex = MOCK_TEAMS.findIndex(t => t.id === teamId);
      if (teamIndex === -1) throw new Error(`Team with ID ${teamId} not found`);
      
      const updatedTeam = { ...MOCK_TEAMS[teamIndex] };
      updatedTeam.scores.push({ ...score, teamId });
      
      MOCK_TEAMS[teamIndex] = updatedTeam;
      return updatedTeam;
    }
  } catch (error) {
    console.error('Error adding score:', error);
    throw error;
  }
};

export const addFeedback = async (teamId: string, feedback: Omit<JudgeFeedback, 'teamId'>): Promise<Team> => {
  try {
    const apiAvailable = await isApiAvailable();
    
    if (apiAvailable) {
      const feedbackWithTeamId = {
        ...feedback,
        teamId
      };
      const response = await axios.post(`${API_URL}/teams/${teamId}/feedback`, feedbackWithTeamId);
      return response.data;
    } else {
      // Mock adding feedback to local data
      const teamIndex = MOCK_TEAMS.findIndex(t => t.id === teamId);
      if (teamIndex === -1) throw new Error(`Team with ID ${teamId} not found`);
      
      const updatedTeam = { ...MOCK_TEAMS[teamIndex] };
      updatedTeam.feedback.push({ ...feedback, teamId });
      
      MOCK_TEAMS[teamIndex] = updatedTeam;
      return updatedTeam;
    }
  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error;
  }
};

export const seedDatabase = async (): Promise<void> => {
  try {
    const apiAvailable = await isApiAvailable();
    
    if (apiAvailable) {
      await axios.post(`${API_URL}/seed`);
      console.log('Database seeded successfully');
    } else {
      console.log('API unavailable, cannot seed database');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
