
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Team, getLeaderboardByRound } from '@/utils/teamData';
import AnimatedNumber from './AnimatedNumber';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardProps {
  round: string;
}

const Leaderboard = ({ round }: LeaderboardProps) => {
  const [leaderboard, setLeaderboard] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setLeaderboard(getLeaderboardByRound(round));
      setLoading(false);
    }, 300);
  }, [round]);
  
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-secondary/60 h-16 rounded-lg"></div>
        ))}
      </div>
    );
  }
  
  if (leaderboard.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">No scores available for this round yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="text-left font-medium py-3 px-4 w-12">Rank</th>
              <th className="text-left font-medium py-3 px-4">Team</th>
              <th className="text-center font-medium py-3 px-4">Feasibility</th>
              <th className="text-center font-medium py-3 px-4">Originality</th>
              <th className="text-center font-medium py-3 px-4">Completeness</th>
              <th className="text-center font-medium py-3 px-4">Functionality</th>
              <th className="text-center font-medium py-3 px-4">Presentation</th>
              <th className="text-center font-medium py-3 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((team, index) => {
              const roundScores = team.scores.filter(score => score.round === round);
              const hasScoreForRound = roundScores.length > 0;
              
              // Calculate average scores for each category
              const categoryScores = hasScoreForRound
                ? team.scores[0].categories.map(cat => {
                    const scores = roundScores.map(score => 
                      score.categories.find(c => c.name === cat.name)?.score || 0
                    );
                    return {
                      name: cat.name,
                      average: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
                    };
                  })
                : [];
                
              // Calculate total average score
              const totalScore = hasScoreForRound
                ? Math.round(roundScores.reduce((sum, score) => sum + score.totalScore, 0) / roundScores.length)
                : 0;
              
              const rowClass = index % 2 === 0 ? 'bg-background' : 'bg-muted/20';
              const rankClass = index < 3 ? 'font-bold' : '';
              
              return (
                <tr key={team.id} className={`${rowClass} hover:bg-muted/30 transition-colors`}>
                  <td className={`py-3 px-4 ${rankClass}`}>
                    {index < 3 ? (
                      <div className={cn(
                        "flex items-center justify-center rounded-full w-6 h-6 text-xs",
                        index === 0 ? "bg-amber-500/20 text-amber-600" :
                        index === 1 ? "bg-gray-400/20 text-gray-600" :
                        "bg-amber-700/20 text-amber-800"
                      )}>
                        {index + 1}
                      </div>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <Link to={`/teams/${team.id}`} className="hover:underline">
                      <div>
                        <div className="font-medium">{team.name}</div>
                        <div className="text-xs text-muted-foreground">{team.projectName}</div>
                      </div>
                    </Link>
                  </td>
                  {hasScoreForRound ? (
                    categoryScores.map(cat => (
                      <td key={cat.name} className="py-3 px-4 text-center">
                        <AnimatedNumber value={cat.average} className="font-medium" />
                      </td>
                    ))
                  ) : (
                    <>
                      <td className="py-3 px-4 text-center text-muted-foreground">-</td>
                      <td className="py-3 px-4 text-center text-muted-foreground">-</td>
                      <td className="py-3 px-4 text-center text-muted-foreground">-</td>
                      <td className="py-3 px-4 text-center text-muted-foreground">-</td>
                      <td className="py-3 px-4 text-center text-muted-foreground">-</td>
                    </>
                  )}
                  <td className="py-3 px-4 text-center">
                    {hasScoreForRound ? (
                      <div className="font-bold">
                        <AnimatedNumber value={totalScore} />
                        <span className="text-xs text-muted-foreground font-normal">/100</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
