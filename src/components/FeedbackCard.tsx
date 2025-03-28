
import { JudgeFeedback } from '@/utils/teamData';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

interface FeedbackCardProps {
  feedback: JudgeFeedback;
}

const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  const { judgeName, round, comment, timestamp } = feedback;
  
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

  return (
    <Card className="w-full overflow-hidden animate-scale-in">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="space-y-2 w-full">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm">{judgeName}</h4>
              <span className="text-xs text-muted-foreground">{round}</span>
            </div>
            <p className="text-sm">{comment}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="py-3 text-xs text-muted-foreground border-t">
        {formatDate(timestamp)}
      </CardFooter>
    </Card>
  );
};

export default FeedbackCard;
