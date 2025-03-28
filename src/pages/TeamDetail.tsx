import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUNDS, SCORE_CATEGORIES } from '@/utils/teamData';
import { fetchTeamById } from '@/utils/api';
import Navbar from '@/components/Navbar';
import ScoreCard from '@/components/ScoreCard';
import FeedbackCard from '@/components/FeedbackCard';
import RoundTabs from '@/components/RoundTabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Check, Users, Award } from 'lucide-react';
import AnimatedNumber from '@/components/AnimatedNumber';
import { useToast } from '@/hooks/use-toast';

interface CategoryAverage {
  total: number;
  count: number;
}

const TeamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeRound, setActiveRound] = useState(ROUNDS[0]);
  const [activeTab, setActiveTab] = useState('scores');
  const { toast } = useToast();
  
  useEffect(() => {
    const getTeam = async () => {
      if (id) {
        setLoading(true);
        try {
          const teamData = await fetchTeamById(id);
          setTeam(teamData);
        } catch (error) {
          console.error(`Failed to fetch team ${id}:`, error);
          toast({
            title: 'Error',
            description: 'Failed to load team data. Please try again.',
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      }
    };
    
    getTeam();
  }, [id, toast]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 md:px-6 pt-24 pb-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-40 bg-muted rounded"></div>
            <div className="h-12 w-full bg-muted rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-64 bg-muted rounded"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!team) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 md:px-6 pt-24 pb-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Team Not Found</h2>
          <p className="text-muted-foreground mb-8">The team you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/teams">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Teams
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const roundScores = team.scores.filter((score: any) => score.round === activeRound);
  const roundFeedback = team.feedback.filter((feedback: any) => feedback.round === activeRound);
  
  const categoryAverages: Record<string, CategoryAverage> = team.scores
    .filter((score: any) => score.round === activeRound)
    .reduce((acc: Record<string, CategoryAverage>, score: any) => {
      score.categories.forEach((category: any) => {
        if (!acc[category.name]) {
          acc[category.name] = { total: 0, count: 0 };
        }
        acc[category.name].total += category.score;
        acc[category.name].count += 1;
      });
      return acc;
    }, {});
  
  const roundAverageScore = roundScores.length
    ? Math.round(roundScores.reduce((sum: number, score: any) => sum + score.totalScore, 0) / roundScores.length)
    : 0;
    
  const averageCategories = Object.entries(categoryAverages).map(([name, { total, count }]) => ({
    name,
    score: Math.round(total / count),
    maxScore: 20
  }));
  
  const averageScoreCard = roundScores.length > 1 ? {
    judgeName: `${roundScores.length} Judges (Average)`,
    round: activeRound,
    categories: averageCategories,
    totalScore: roundAverageScore,
    timestamp: new Date().toISOString(),
    teamId: team.id,
    judgeId: 'average'
  } : null;
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 pt-24 pb-16">
        <Button variant="ghost" asChild className="mb-6 -ml-3">
          <Link to="/teams">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Teams
          </Link>
        </Button>
        
        <div className="space-y-6 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Badge variant="outline" className="mb-2">Team {team.name}</Badge>
              <h1 className="text-3xl font-bold">{team.projectName}</h1>
            </div>
            {roundScores.length > 0 && (
              <div className="glass-card px-6 py-3 rounded-full">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Average Score:</span>
                  <span className="text-3xl font-bold">
                    <AnimatedNumber value={roundAverageScore} />
                  </span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
              </div>
            )}
          </div>
          
          <p className="text-muted-foreground max-w-3xl">{team.description}</p>
          
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-sm font-medium">Team Members</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {team.members.map((member: any) => (
              <div 
                key={member.id} 
                className="flex items-center gap-2 bg-secondary/50 rounded-full pl-1 pr-3 py-1"
              >
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{member.name}</span>
                <span className="text-xs text-muted-foreground">({member.role})</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <RoundTabs activeRound={activeRound} onRoundChange={setActiveRound} />
        </div>
        
        <div className="mb-6">
          <Tabs defaultValue="scores" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="scores">Scores</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
            
            <TabsContent value="scores" className="mt-6">
              {roundScores.length > 0 ? (
                <div className="space-y-8">
                  {roundScores.length > 1 && averageScoreCard && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-medium">Panel Score (Average)</h3>
                      </div>
                      <ScoreCard score={averageScoreCard} showAverageIndicator={true} />
                    </div>
                  )}
                  
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-medium">Individual Judge Scores</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {roundScores.map((score: any, index: number) => (
                        <ScoreCard key={index} score={score} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground">No scores available for this round yet.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="feedback" className="mt-6">
              {roundFeedback.length > 0 ? (
                <div className="space-y-4">
                  {roundFeedback.map((feedback: any, index: number) => (
                    <FeedbackCard key={index} feedback={feedback} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground">No feedback available for this round yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {activeTab === 'scores' && roundScores.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-medium mb-4">Category Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(categoryAverages).map(([category, { total, count }]) => {
                const average = Math.round(total / count);
                const percentage = (average / 20) * 100;
                
                return (
                  <div key={category} className="glass-card p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">{category}</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-bold">{average}</span>
                      <span className="text-xs text-muted-foreground">/20</span>
                    </div>
                    <div className="score-bar">
                      <div 
                        className={`score-bar-fill ${
                          percentage >= 80 ? 'bg-green-500' :
                          percentage >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamDetail;
