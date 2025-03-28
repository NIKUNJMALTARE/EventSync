
import { Team } from './teamData';

// Mock teams data to use when backend is unavailable
export const MOCK_TEAMS: Team[] = [
  {
    id: 'team1',
    name: 'Alpha Team',
    projectName: 'Smart Home Assistant',
    description: 'An AI-powered home assistant that learns from user behavior and automates daily tasks.',
    imageUrl: '/placeholder.svg',
    members: [
      { id: 'member1', name: 'John Smith', role: 'Team Lead' },
      { id: 'member2', name: 'Sarah Johnson', role: 'UX Designer' },
      { id: 'member3', name: 'Michael Chen', role: 'Backend Developer' }
    ],
    scores: [
      {
        teamId: 'team1',
        judgeId: 'judge1',
        judgeName: 'Alex Rodriguez',
        round: 'Round 1',
        categories: [
          { name: 'Feasibility', score: 18, maxScore: 20 },
          { name: 'Originality', score: 16, maxScore: 20 },
          { name: 'Completeness', score: 14, maxScore: 20 },
          { name: 'Functionality', score: 17, maxScore: 20 },
          { name: 'Presentation', score: 15, maxScore: 20 }
        ],
        totalScore: 80,
        timestamp: '2023-06-01T10:15:00Z'
      },
      {
        teamId: 'team1',
        judgeId: 'judge2',
        judgeName: 'Emily Davis',
        round: 'Round 2',
        categories: [
          { name: 'Feasibility', score: 19, maxScore: 20 },
          { name: 'Originality', score: 17, maxScore: 20 },
          { name: 'Completeness', score: 16, maxScore: 20 },
          { name: 'Functionality', score: 18, maxScore: 20 },
          { name: 'Presentation', score: 16, maxScore: 20 }
        ],
        totalScore: 86,
        timestamp: '2023-06-15T14:30:00Z'
      }
    ],
    feedback: [
      {
        teamId: 'team1',
        judgeId: 'judge1',
        judgeName: 'Alex Rodriguez',
        round: 'Round 1',
        comment: 'Great concept and execution. Consider improving the user interface for better accessibility.',
        timestamp: '2023-06-01T10:20:00Z'
      }
    ]
  },
  {
    id: 'team2',
    name: 'Beta Squad',
    projectName: 'EcoTrack',
    description: 'A mobile application that helps users track and reduce their carbon footprint through daily activities.',
    imageUrl: '/placeholder.svg',
    members: [
      { id: 'member4', name: 'Jessica Wong', role: 'Project Manager' },
      { id: 'member5', name: 'David Patel', role: 'Frontend Developer' },
      { id: 'member6', name: 'Emma Garcia', role: 'Data Scientist' }
    ],
    scores: [
      {
        teamId: 'team2',
        judgeId: 'judge1',
        judgeName: 'Alex Rodriguez',
        round: 'Round 1',
        categories: [
          { name: 'Feasibility', score: 17, maxScore: 20 },
          { name: 'Originality', score: 19, maxScore: 20 },
          { name: 'Completeness', score: 13, maxScore: 20 },
          { name: 'Functionality', score: 15, maxScore: 20 },
          { name: 'Presentation', score: 18, maxScore: 20 }
        ],
        totalScore: 82,
        timestamp: '2023-06-01T11:45:00Z'
      }
    ],
    feedback: [
      {
        teamId: 'team2',
        judgeId: 'judge1',
        judgeName: 'Alex Rodriguez',
        round: 'Round 1',
        comment: 'Innovative solution to an important problem. The data visualization could be more intuitive.',
        timestamp: '2023-06-01T11:50:00Z'
      }
    ]
  },
  {
    id: 'team3',
    name: 'Gamma Group',
    projectName: 'MedConnect',
    description: 'A telehealth platform connecting patients with healthcare providers for remote consultations and follow-ups.',
    imageUrl: '/placeholder.svg',
    members: [
      { id: 'member7', name: 'Robert Kim', role: 'Full Stack Developer' },
      { id: 'member8', name: 'Lisa Nguyen', role: 'UI Designer' },
      { id: 'member9', name: 'James Wilson', role: 'Healthcare Specialist' }
    ],
    scores: [
      {
        teamId: 'team3',
        judgeId: 'judge2',
        judgeName: 'Emily Davis',
        round: 'Round 1',
        categories: [
          { name: 'Feasibility', score: 16, maxScore: 20 },
          { name: 'Originality', score: 15, maxScore: 20 },
          { name: 'Completeness', score: 18, maxScore: 20 },
          { name: 'Functionality', score: 19, maxScore: 20 },
          { name: 'Presentation', score: 17, maxScore: 20 }
        ],
        totalScore: 85,
        timestamp: '2023-06-01T13:20:00Z'
      }
    ],
    feedback: [
      {
        teamId: 'team3',
        judgeId: 'judge2',
        judgeName: 'Emily Davis',
        round: 'Round 1',
        comment: 'Well-executed project addressing a clear need. Security implementations are particularly strong.',
        timestamp: '2023-06-01T13:25:00Z'
      }
    ]
  }
];
