
import { Link } from 'react-router-dom';
import { Team } from '@/utils/teamData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AnimatedNumber from './AnimatedNumber';

interface TeamCardProps {
  team: Team;
  roundFilter: string;
}

const TeamCard = ({ team, roundFilter }: TeamCardProps) => {
  // Get the team's score for the selected round
  const roundScores = team.scores.filter(score => score.round === roundFilter);
  const hasScoreForRound = roundScores.length > 0;
  
  // Calculate average score for the round if there are multiple judges
  const roundScore = hasScoreForRound
    ? Math.round(roundScores.reduce((sum, score) => sum + score.totalScore, 0) / roundScores.length)
    : 0;
  
  // Get the initials for the avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Link to={`/teams/${team.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:border-primary hover:shadow-md">
        <CardHeader className="p-0">
          <div className="h-48 overflow-hidden relative">
            {team.imageUrl ? (
              <img 
                src={team.imageUrl} 
                alt={team.projectName} 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
              />
            ) : (
              <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h3 className="text-white font-bold truncate">{team.projectName}</h3>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="bg-background/50 text-sm font-medium">
              Team {team.name}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 h-10">
            {team.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex -space-x-2">
            {team.members.slice(0, 3).map((member) => (
              <Avatar key={member.id} className="border-2 border-background w-8 h-8">
                <AvatarFallback className="text-xs">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
            ))}
            {team.members.length > 3 && (
              <Avatar className="border-2 border-background bg-muted w-8 h-8">
                <AvatarFallback className="text-xs">
                  +{team.members.length - 3}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasScoreForRound ? (
              <>
                <span className="text-xs text-muted-foreground">Score:</span>
                <span className="font-bold text-lg">
                  <AnimatedNumber value={roundScore} /> 
                  <span className="text-muted-foreground text-xs font-normal">/100</span>
                </span>
              </>
            ) : (
              <span className="text-xs text-muted-foreground">No scores yet</span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TeamCard;
