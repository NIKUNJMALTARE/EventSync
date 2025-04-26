
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
}

export interface JudgeFeedback {
  judgeId: string;
  judgeName: string;
  teamId: string;
  round: string;
  comment: string;
  timestamp: string;
}

export interface TeamScore {
  teamId: string;
  round: string;
  judgeId: string;
  judgeName: string;
  categories: ScoreCategory[];
  totalScore: number;
  feedback?: string;
  timestamp: string;
}

export interface Team {
  id: string;
  name: string;
  projectName: string;
  description: string;
  members: TeamMember[];
  scores: TeamScore[];
  feedback: JudgeFeedback[];
  imageUrl?: string;
}

export const ROUNDS = [
  'Mentor Round 1',
  'Mentor Round 2',
  'Jury Round 1',
  'Final Jury Round'
];

export const SCORE_CATEGORIES = [
  { name: 'Feasibility', maxScore: 20 },
  { name: 'Originality', maxScore: 20 },
  { name: 'Completeness', maxScore: 20 },
  { name: 'Functionality', maxScore: 20 },
  { name: 'Presentation', maxScore: 20 }
];

export const TEAMS: Team[] = [
  {
    id: '1',
    name: 'Quantum Coders',
    projectName: 'EcoTrack',
    description: 'A sustainable living tracker that helps users reduce their carbon footprint through daily challenges and metrics.',
    members: [
      { id: '1', name: 'Alex Johnson', role: 'Frontend Developer' },
      { id: '2', name: 'Sarah Kim', role: 'Backend Developer' },
      { id: '3', name: 'Marcus Chen', role: 'UI/UX Designer' }
    ],
    scores: [
      {
        teamId: '1',
        round: 'Mentor Round 1',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 18, maxScore: 20 },
          { name: 'Originality', score: 16, maxScore: 20 },
          { name: 'Completeness', score: 14, maxScore: 20 },
          { name: 'Functionality', score: 17, maxScore: 20 },
          { name: 'Presentation', score: 15, maxScore: 20 }
        ],
        totalScore: 80,
        feedback: 'Great concept with solid implementation. Could improve on the completeness of features.',
        timestamp: '2023-11-15T10:30:00Z'
      },
      {
        teamId: '1',
        round: 'Mentor Round 2',
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        categories: [
          { name: 'Feasibility', score: 19, maxScore: 20 },
          { name: 'Originality', score: 17, maxScore: 20 },
          { name: 'Completeness', score: 16, maxScore: 20 },
          { name: 'Functionality', score: 18, maxScore: 20 },
          { name: 'Presentation', score: 17, maxScore: 20 }
        ],
        totalScore: 87,
        feedback: 'Significant improvement since last round. The user flow is much more intuitive now.',
        timestamp: '2023-11-16T14:20:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        teamId: '1',
        round: 'Mentor Round 1',
        comment: 'The idea is innovative and addresses a real need. Work on improving the data visualization to make the impact more apparent to users.',
        timestamp: '2023-11-15T10:35:00Z'
      },
      {
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        teamId: '1',
        round: 'Mentor Round 2',
        comment: 'Excellent progress! Your implementation of the suggested changes has greatly improved the user experience. Consider adding more gamification elements to increase engagement.',
        timestamp: '2023-11-16T14:25:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'ByteBusters',
    projectName: 'HealthPulse',
    description: 'A health monitoring platform that uses wearable data to provide personalized wellness recommendations.',
    members: [
      { id: '4', name: 'Jamie Rivera', role: 'Full Stack Developer' },
      { id: '5', name: 'Priya Patel', role: 'Data Scientist' },
      { id: '6', name: 'David Wong', role: 'Hardware Engineer' }
    ],
    scores: [
      {
        teamId: '2',
        round: 'Mentor Round 1',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 17, maxScore: 20 },
          { name: 'Originality', score: 19, maxScore: 20 },
          { name: 'Completeness', score: 13, maxScore: 20 },
          { name: 'Functionality', score: 16, maxScore: 20 },
          { name: 'Presentation', score: 18, maxScore: 20 }
        ],
        totalScore: 83,
        feedback: 'Highly original concept with great presentation. Need to work on backend completeness.',
        timestamp: '2023-11-15T11:45:00Z'
      },
      {
        teamId: '2',
        round: 'Mentor Round 2',
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        categories: [
          { name: 'Feasibility', score: 18, maxScore: 20 },
          { name: 'Originality', score: 19, maxScore: 20 },
          { name: 'Completeness', score: 15, maxScore: 20 },
          { name: 'Functionality', score: 17, maxScore: 20 },
          { name: 'Presentation', score: 19, maxScore: 20 }
        ],
        totalScore: 88,
        feedback: 'Impressive improvements in functionality. The data analysis features are particularly strong.',
        timestamp: '2023-11-16T15:30:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        teamId: '2',
        round: 'Mentor Round 1',
        comment: 'Your approach to health data is innovative. Focus on completing the core functionality before adding additional features.',
        timestamp: '2023-11-15T11:50:00Z'
      },
      {
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        teamId: '2',
        round: 'Mentor Round 2',
        comment: 'The algorithm for health recommendations is quite sophisticated. Consider adding more user customization options and improve the mobile responsiveness.',
        timestamp: '2023-11-16T15:35:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'TechTitans',
    projectName: 'SmartCity',
    description: 'An integrated urban management solution using IoT sensors to optimize traffic, waste management, and energy consumption.',
    members: [
      { id: '7', name: 'Tyler Scott', role: 'IoT Specialist' },
      { id: '8', name: 'Zoe Anderson', role: 'Backend Developer' },
      { id: '9', name: 'Rafael Gomez', role: 'Frontend Developer' }
    ],
    scores: [
      {
        teamId: '3',
        round: 'Mentor Round 1',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 16, maxScore: 20 },
          { name: 'Originality', score: 18, maxScore: 20 },
          { name: 'Completeness', score: 15, maxScore: 20 },
          { name: 'Functionality', score: 15, maxScore: 20 },
          { name: 'Presentation', score: 17, maxScore: 20 }
        ],
        totalScore: 81,
        feedback: 'Ambitious project with good technical foundation. Consider narrowing the scope for better implementation.',
        timestamp: '2023-11-15T13:15:00Z'
      },
      {
        teamId: '3',
        round: 'Mentor Round 2',
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        categories: [
          { name: 'Feasibility', score: 17, maxScore: 20 },
          { name: 'Originality', score: 18, maxScore: 20 },
          { name: 'Completeness', score: 17, maxScore: 20 },
          { name: 'Functionality', score: 16, maxScore: 20 },
          { name: 'Presentation', score: 18, maxScore: 20 }
        ],
        totalScore: 86,
        feedback: 'The team has successfully focused their concept and improved the core functionality.',
        timestamp: '2023-11-16T16:45:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        teamId: '3',
        round: 'Mentor Round 1',
        comment: 'Your vision for smart city integration is impressive, but try to focus on one or two key aspects first to demonstrate the concept more effectively.',
        timestamp: '2023-11-15T13:20:00Z'
      },
      {
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        teamId: '3',
        round: 'Mentor Round 2',
        comment: 'The traffic management module is particularly well-implemented. The UI is intuitive and the backend is handling the complex data processing efficiently.',
        timestamp: '2023-11-16T16:50:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7c5e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'CodeCrafters',
    projectName: 'LearnLoop',
    description: 'An adaptive learning platform that personalizes educational content based on student performance and learning style.',
    members: [
      { id: '10', name: 'Emma Thompson', role: 'Frontend Developer' },
      { id: '11', name: 'Jordan Lee', role: 'Machine Learning Engineer' },
      { id: '12', name: 'Carlos Rodriguez', role: 'Educational Content Designer' }
    ],
    scores: [
      {
        teamId: '4',
        round: 'Mentor Round 1',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 19, maxScore: 20 },
          { name: 'Originality', score: 17, maxScore: 20 },
          { name: 'Completeness', score: 16, maxScore: 20 },
          { name: 'Functionality', score: 18, maxScore: 20 },
          { name: 'Presentation', score: 16, maxScore: 20 }
        ],
        totalScore: 86,
        feedback: 'Well-executed concept with strong technical implementation. The adaptation algorithms are impressive.',
        timestamp: '2023-11-15T14:30:00Z'
      },
      {
        teamId: '4',
        round: 'Mentor Round 2',
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        categories: [
          { name: 'Feasibility', score: 19, maxScore: 20 },
          { name: 'Originality', score: 17, maxScore: 20 },
          { name: 'Completeness', score: 18, maxScore: 20 },
          { name: 'Functionality', score: 19, maxScore: 20 },
          { name: 'Presentation', score: 17, maxScore: 20 }
        ],
        totalScore: 90,
        feedback: 'Exceptional progress with improved content adaptation and user interface.',
        timestamp: '2023-11-16T17:15:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        teamId: '4',
        round: 'Mentor Round 1',
        comment: 'The ML algorithms for content adaptation are well-implemented. Consider adding more immediate feedback mechanisms for learners.',
        timestamp: '2023-11-15T14:35:00Z'
      },
      {
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        teamId: '4',
        round: 'Mentor Round 2',
        comment: 'The progress tracking and visualization tools are excellent. The platform now provides a comprehensive learning experience with strong feedback loops.',
        timestamp: '2023-11-16T17:20:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'DevDynamos',
    projectName: 'GreenCommute',
    description: 'A sustainable transportation app that helps users find eco-friendly commuting options and tracks environmental impact.',
    members: [
      { id: '13', name: 'Naomi Clark', role: 'UI/UX Designer' },
      { id: '14', name: 'Raj Mehta', role: 'Backend Developer' },
      { id: '15', name: 'Sophie Liu', role: 'Mobile Developer' }
    ],
    scores: [
      {
        teamId: '5',
        round: 'Mentor Round 1',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 18, maxScore: 20 },
          { name: 'Originality', score: 15, maxScore: 20 },
          { name: 'Completeness', score: 14, maxScore: 20 },
          { name: 'Functionality', score: 16, maxScore: 20 },
          { name: 'Presentation', score: 19, maxScore: 20 }
        ],
        totalScore: 82,
        feedback: 'Beautiful presentation and strong feasibility. Could use more innovative features to differentiate.',
        timestamp: '2023-11-15T15:45:00Z'
      },
      {
        teamId: '5',
        round: 'Mentor Round 2',
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        categories: [
          { name: 'Feasibility', score: 18, maxScore: 20 },
          { name: 'Originality', score: 16, maxScore: 20 },
          { name: 'Completeness', score: 17, maxScore: 20 },
          { name: 'Functionality', score: 17, maxScore: 20 },
          { name: 'Presentation', score: 19, maxScore: 20 }
        ],
        totalScore: 87,
        feedback: 'The team has added several unique features that enhance the user experience and environmental impact.',
        timestamp: '2023-11-16T18:30:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        teamId: '5',
        round: 'Mentor Round 1',
        comment: 'The UI design is exceptional and the concept is highly feasible. Consider adding more gamification elements to increase user engagement and retention.',
        timestamp: '2023-11-15T15:50:00Z'
      },
      {
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        teamId: '5',
        round: 'Mentor Round 2',
        comment: 'The carbon footprint calculator is now much more comprehensive. The community features and challenges add a social dimension that strengthens the app.',
        timestamp: '2023-11-16T18:35:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'AlphaInnovate',
    projectName: 'ElderCare',
    description: 'A smart home system designed specifically for elderly care, monitoring health metrics and daily activities.',
    members: [
      { id: '16', name: 'Oliver Matthews', role: 'IoT Developer' },
      { id: '17', name: 'Lily Zhang', role: 'Healthcare Specialist' },
      { id: '18', name: 'Daniel Brown', role: 'UI/UX Designer' }
    ],
    scores: [
      {
        teamId: '6',
        round: 'Mentor Round 1',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 17, maxScore: 20 },
          { name: 'Originality', score: 16, maxScore: 20 },
          { name: 'Completeness', score: 13, maxScore: 20 },
          { name: 'Functionality', score: 15, maxScore: 20 },
          { name: 'Presentation', score: 16, maxScore: 20 }
        ],
        totalScore: 77,
        feedback: 'Great idea with social impact. Work on implementation details and technology integration.',
        timestamp: '2023-11-15T09:30:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        teamId: '6',
        round: 'Mentor Round 1',
        comment: 'The eldercare focus is noble and much needed. Think more about data privacy concerns and how to make the interface extremely simple for elderly users.',
        timestamp: '2023-11-15T09:35:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b4123a21?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '7',
    name: 'NexusTeam',
    projectName: 'FarmSmart',
    description: 'Precision agriculture system using drones and sensors to optimize crop yields and resource usage.',
    members: [
      { id: '19', name: 'Aisha Patel', role: 'Agricultural Engineer' },
      { id: '20', name: 'James Wilson', role: 'Drone Specialist' },
      { id: '21', name: 'Eva Chen', role: 'Data Scientist' }
    ],
    scores: [
      {
        teamId: '7',
        round: 'Mentor Round 1',
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        categories: [
          { name: 'Feasibility', score: 16, maxScore: 20 },
          { name: 'Originality', score: 17, maxScore: 20 },
          { name: 'Completeness', score: 14, maxScore: 20 },
          { name: 'Functionality', score: 15, maxScore: 20 },
          { name: 'Presentation', score: 18, maxScore: 20 }
        ],
        totalScore: 80,
        feedback: 'Excellent societal impact with good presentation. Technical implementation needs more work.',
        timestamp: '2023-11-15T10:15:00Z'
      },
      {
        teamId: '7',
        round: 'Mentor Round 2',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 17, maxScore: 20 },
          { name: 'Originality', score: 17, maxScore: 20 },
          { name: 'Completeness', score: 16, maxScore: 20 },
          { name: 'Functionality', score: 16, maxScore: 20 },
          { name: 'Presentation', score: 18, maxScore: 20 }
        ],
        totalScore: 84,
        feedback: 'Clear improvement in technical implementation. The drone control interface is now much more intuitive.',
        timestamp: '2023-11-16T13:30:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        teamId: '7',
        round: 'Mentor Round 1',
        comment: 'Your approach to agricultural optimization is refreshing. Focus on making the system affordable for small farmers as well.',
        timestamp: '2023-11-15T10:20:00Z'
      },
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        teamId: '7',
        round: 'Mentor Round 2',
        comment: 'The data visualization for crop health is excellent. Consider adding offline functionality for areas with poor internet connectivity.',
        timestamp: '2023-11-16T13:35:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-855736e8c9ff?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '8',
    name: 'InfiniteLoop',
    projectName: 'RecycleRight',
    description: 'AI-powered app that identifies recyclable materials through image recognition and provides proper disposal instructions.',
    members: [
      { id: '22', name: 'Thomas Green', role: 'AI Specialist' },
      { id: '23', name: 'Maria Rodriguez', role: 'Environmental Scientist' },
      { id: '24', name: 'Kevin Wu', role: 'Mobile Developer' }
    ],
    scores: [
      {
        teamId: '8',
        round: 'Mentor Round 1',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 18, maxScore: 20 },
          { name: 'Originality', score: 15, maxScore: 20 },
          { name: 'Completeness', score: 12, maxScore: 20 },
          { name: 'Functionality', score: 14, maxScore: 20 },
          { name: 'Presentation', score: 17, maxScore: 20 }
        ],
        totalScore: 76,
        feedback: 'Practical idea with environmental impact. AI model needs work for better accuracy.',
        timestamp: '2023-11-15T11:00:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        teamId: '8',
        round: 'Mentor Round 1',
        comment: 'The concept addresses a real need for better recycling guidance. Train your AI model on more diverse materials and lighting conditions.',
        timestamp: '2023-11-15T11:05:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '9',
    name: 'DigitalNomads',
    projectName: 'WorkWanderer',
    description: 'Platform connecting remote workers with workspaces and communities around the world.',
    members: [
      { id: '25', name: 'Nina Johnson', role: 'Frontend Developer' },
      { id: '26', name: 'David Kim', role: 'Backend Developer' },
      { id: '27', name: 'Elena Martinez', role: 'UX Researcher' }
    ],
    scores: [
      {
        teamId: '9',
        round: 'Mentor Round 1',
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        categories: [
          { name: 'Feasibility', score: 19, maxScore: 20 },
          { name: 'Originality', score: 14, maxScore: 20 },
          { name: 'Completeness', score: 15, maxScore: 20 },
          { name: 'Functionality', score: 16, maxScore: 20 },
          { name: 'Presentation', score: 17, maxScore: 20 }
        ],
        totalScore: 81,
        feedback: 'Very feasible business model. Need to differentiate more from existing platforms.',
        timestamp: '2023-11-15T12:15:00Z'
      },
      {
        teamId: '9',
        round: 'Mentor Round 2',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 19, maxScore: 20 },
          { name: 'Originality', score: 16, maxScore: 20 },
          { name: 'Completeness', score: 17, maxScore: 20 },
          { name: 'Functionality', score: 17, maxScore: 20 },
          { name: 'Presentation', score: 18, maxScore: 20 }
        ],
        totalScore: 87,
        feedback: 'Excellent improvements in uniqueness. The community matching feature is especially promising.',
        timestamp: '2023-11-16T14:45:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j2',
        judgeName: 'Prof. James Wilson',
        teamId: '9',
        round: 'Mentor Round 1',
        comment: 'The platform has potential but needs unique features to stand out. Consider focusing on niche communities or specific types of remote workers.',
        timestamp: '2023-11-15T12:20:00Z'
      },
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        teamId: '9',
        round: 'Mentor Round 2',
        comment: 'The addition of skill-sharing and local event integration greatly enhances the value proposition. The UI is also much cleaner now.',
        timestamp: '2023-11-16T14:50:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '10',
    name: 'BlueWave',
    projectName: 'OceanGuardian',
    description: 'Autonomous marine drones for ocean cleanup and wildlife monitoring.',
    members: [
      { id: '28', name: 'Ryan Carter', role: 'Robotics Engineer' },
      { id: '29', name: 'Sophia Lee', role: 'Marine Biologist' },
      { id: '30', name: 'Michael Thompson', role: 'Control Systems Engineer' }
    ],
    scores: [
      {
        teamId: '10',
        round: 'Mentor Round 1',
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        categories: [
          { name: 'Feasibility', score: 15, maxScore: 20 },
          { name: 'Originality', score: 19, maxScore: 20 },
          { name: 'Completeness', score: 13, maxScore: 20 },
          { name: 'Functionality', score: 14, maxScore: 20 },
          { name: 'Presentation', score: 18, maxScore: 20 }
        ],
        totalScore: 79,
        feedback: 'Highly innovative with excellent presentation. Technical challenges remain significant.',
        timestamp: '2023-11-15T13:45:00Z'
      }
    ],
    feedback: [
      {
        judgeId: 'j1',
        judgeName: 'Dr. Emily Parker',
        teamId: '10',
        round: 'Mentor Round 1',
        comment: 'The ocean cleanup concept is ambitious and necessary. Focus on power efficiency and durability in marine environments as your key technical challenges.',
        timestamp: '2023-11-15T13:50:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '11',
    name: 'MindMasters',
    projectName: 'MentalBoost',
    description: 'Mental health app combining CBT techniques, meditation, and AI-guided therapy sessions.',
    members: [
      { id: '31', name: 'Jessica Patel', role: 'Psychology Specialist' },
      { id: '32', name: 'Andrew Wilson', role: 'ML Engineer' },
      { id: '33', name: 'Maya Johnson', role: 'Frontend Developer' }
    ],
    scores: [],
    feedback: [],
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '12',
    name: 'VisionQuest',
    projectName: 'ARNavigate',
    description: 'Augmented reality navigation system for indoor spaces like malls, airports, and museums.',
    members: [
      { id: '34', name: 'Tyler Roberts', role: 'AR Developer' },
      { id: '35', name: 'Hannah Kim', role: '3D Modeler' },
      { id: '36', name: 'Carlos Mendez', role: 'Backend Developer' }
    ],
    scores: [],
    feedback: [],
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '13',
    name: 'DataDynamos',
    projectName: 'FoodTrace',
    description: 'Blockchain-based food supply chain tracking for transparency and safety.',
    members: [
      { id: '37', name: 'Laura Chen', role: 'Blockchain Developer' },
      { id: '38', name: 'Raj Sharma', role: 'Supply Chain Specialist' },
      { id: '39', name: 'Sam Williams', role: 'UI/UX Designer' }
    ],
    scores: [],
    feedback: [],
    imageUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '14',
    name: 'EcoEnthusiasts',
    projectName: 'SolarShare',
    description: 'Peer-to-peer marketplace for sharing excess solar energy in local communities.',
    members: [
      { id: '40', name: 'Omar Hassan', role: 'Energy Systems Engineer' },
      { id: '41', name: 'Tara Wilson', role: 'Smart Grid Specialist' },
      { id: '42', name: 'Jin Lee', role: 'Full Stack Developer' }
    ],
    scores: [],
    feedback: [],
    imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '15',
    name: 'FutureMakers',
    projectName: 'KidCode',
    description: 'Gamified coding education platform designed specifically for elementary school students.',
    members: [
      { id: '43', name: 'Rebecca Thompson', role: 'Education Specialist' },
      { id: '44', name: 'Jason Park', role: 'Game Developer' },
      { id: '45', name: 'Olivia Martinez', role: 'Child UI Expert' }
    ],
    scores: [],
    feedback: [],
    imageUrl: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '16',
    name: 'HealthHackers',
    projectName: 'VitalTrack',
    description: 'Wearable health monitor with predictive analytics for early disease detection.',
    members: [
      { id: '46', name: 'Dr. Ahmed Khan', role: 'Medical Doctor' },
      { id: '47', name: 'Linda Chen', role: 'Biomedical Engineer' },
      { id: '48', name: 'Eric Johnson', role: 'Data Scientist' }
    ],
    scores: [],
    feedback: [],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '17',
    name: 'SecureSolutions',
    projectName: 'CyberShield',
    description: 'Cybersecurity platform for small businesses using AI to detect and prevent threats.',
    members: [
      { id: '49', name: 'Marcus Stevens', role: 'Security Specialist' },
      { id: '50', name: 'Priya Sharma', role: 'AI Engineer' },
      { id: '51', name: 'Alex Turner', role: 'Frontend Developer' }
    ],
    scores: [],
    feedback: [],
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '18',
    name: 'UrbanInnovators',
    projectName: 'ParkShare',
    description: 'Platform for renting out private parking spaces during unused hours.',
    members: [
      { id: '52', name: 'Natalie Wong', role: 'Urban Planner' },
      { id: '53', name: 'Derek Johnson', role: 'Mobile Developer' },
      { id: '54', name: 'Zoe Garcia', role: 'Business Strategist' }
    ],
    scores: [],
    feedback: [],
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '19',
    name: 'SoundWave',
    projectName: 'AudioLearning',
    description: 'Audio-based educational platform for learning while commuting or exercising.',
    members: [
      { id: '55', name: 'Chris Zhang', role: 'Audio Engineer' },
      { id: '56', name: 'Fatima Ali', role: 'Content Creator' },
      { id: '57', name: 'Ben Lewis', role: 'Mobile Developer' }
    ],
    scores: [],
    feedback: [],
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '20',
    name: 'GreenGrowth',
    projectName: 'VerticalFarm',
    description: 'IoT-controlled vertical farming system for urban food production.',
    members: [
      { id: '58', name: 'Emma Collins', role: 'Agricultural Engineer' },
      { id: '59', name: 'Jamal Hassan', role: 'IoT Specialist' },
      { id: '60', name: 'Sophie Taylor', role: 'Sustainability Expert' }
    ],
    scores: [],
    feedback: [],
    imageUrl: 'https://images.unsplash.com/photo-1601704447973-fe6b9ebb2458?q=80&w=1000&auto=format&fit=crop'
  }
];

export const getTeamRoundScore = (team: Team, round: string): number => {
  const roundScores = team.scores.filter(score => score.round === round);
  if (roundScores.length === 0) return 0;
  
  const total = roundScores.reduce((sum, score) => sum + score.totalScore, 0);
  return Math.round(total / roundScores.length);
};

export const getLeaderboardByRound = (round: string): Team[] => {
  return [...TEAMS].sort((a, b) => {
    const scoreA = getTeamRoundScore(a, round);
    const scoreB = getTeamRoundScore(b, round);
    return scoreB - scoreA;
  });
};

export const getTeamById = (id: string): Team | undefined => {
  return TEAMS.find(team => team.id === id);
};
