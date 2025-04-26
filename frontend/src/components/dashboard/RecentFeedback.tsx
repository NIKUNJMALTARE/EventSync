
import { useFeedbackStore } from '@/store/feedbackStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp, Smile, Meh, Frown, Angry } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeedbackReaction } from '@/utils/feedbackData';

const RecentFeedback = () => {
  const { feedbackList } = useFeedbackStore();
  
  // Sort by timestamp, most recent first
  const sortedFeedback = [...feedbackList].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  // Take the first 5 items
  const recentFeedback = sortedFeedback.slice(0, 5);
  
  const reactionIcons: Record<FeedbackReaction, JSX.Element> = {
    excited: <ThumbsUp className="w-5 h-5 text-green-500" />,
    happy: <Smile className="w-5 h-5 text-green-400" />,
    neutral: <Meh className="w-5 h-5 text-blue-400" />,
    disappointed: <Frown className="w-5 h-5 text-orange-400" />,
    frustrated: <Angry className="w-5 h-5 text-red-500" />
  };
  
  const formatDate = (dateString: string | undefined | null): string => {
    if (!dateString) return "Invalid Date"; // Handle null or undefined cases
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; // Handle incorrect date format
  
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Recent Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentFeedback.length > 0 ? (
          <div className="space-y-4">
            {recentFeedback.map((feedback) => {
              const overallRating = feedback.ratings.find(r => r.category === 'overall')?.score || 0;
              
              return (
                <div key={feedback.id} className="border rounded-md p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">
                        {feedback.isAnonymous ? 'Anonymous' : feedback.attendeeName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(feedback.timestamp)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {reactionIcons[feedback.reaction]}
                      <span className="text-sm font-medium">{overallRating}/5</span>
                    </div>
                  </div>
                  
                  {feedback.comment && (
                    <div className="text-sm">
                      {feedback.comment.length > 100 
                        ? `${feedback.comment.substring(0, 100)}...` 
                        : feedback.comment
                      }
                    </div>
                  )}
                </div>
              );
            })}
            
            <Button variant="outline" className="w-full mt-2">
              View All Feedback
            </Button>
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No feedback available yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentFeedback;
