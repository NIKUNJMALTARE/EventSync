
import { TeamScore, ScoreCategory } from '@/utils/teamData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ScoreCardProps {
  score: TeamScore;
  showAverageIndicator?: boolean;
}

const ScoreCard = ({ score, showAverageIndicator = false }: ScoreCardProps) => {
  const { judgeName, round, categories, totalScore, timestamp } = score;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Define color based on score
  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="w-full overflow-hidden animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">{round}</CardTitle>
            {showAverageIndicator && (
              <Badge variant="outline" className="text-xs bg-primary/10">
                Average Score
              </Badge>
            )}
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold">{totalScore}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Judge: {judgeName}</span>
          <span>{formatDate(timestamp)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category: ScoreCategory) => (
            <div key={category.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{category.name}</span>
                <span className="font-medium">
                  {category.score}/{category.maxScore}
                </span>
              </div>
              <div className="score-bar">
                <div 
                  className={cn(
                    "score-bar-fill",
                    getScoreColor(category.score, category.maxScore)
                  )}
                  style={{ width: `${(category.score / category.maxScore) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {score.feedback && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm font-medium mb-1">Feedback:</p>
            <p className="text-sm text-muted-foreground">{score.feedback}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
