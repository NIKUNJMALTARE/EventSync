
import { useFeedbackStore } from '@/store/feedbackStore';
import { Card, CardContent } from '@/components/ui/card';
import { Users, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { FeedbackReaction } from '@/utils/feedbackData';

const FeedbackSummary = () => {
  const { feedbackList } = useFeedbackStore();
  
  // Calculate summary statistics
  const totalFeedback = feedbackList.length;
  
  // Count positive and negative reactions
  const positiveReactions = feedbackList.filter(
    f => ['excited', 'happy'].includes(f.reaction as string)
  ).length;
  
  const negativeReactions = feedbackList.filter(
    f => ['disappointed', 'frustrated'].includes(f.reaction as string)
  ).length;
  
  // Count comments
  const commentsCount = feedbackList.filter(f => f.comment && f.comment.trim().length > 0).length;
  
  // Create summary cards
  const summaryItems = [
    {
      title: 'Total Responses',
      value: totalFeedback,
      icon: <Users className="w-4 h-4" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Positive Feedback',
      value: positiveReactions,
      percentage: totalFeedback ? Math.round((positiveReactions / totalFeedback) * 100) : 0,
      icon: <ThumbsUp className="w-4 h-4" />,
      color: 'bg-green-500',
    },
    {
      title: 'Negative Feedback',
      value: negativeReactions,
      percentage: totalFeedback ? Math.round((negativeReactions / totalFeedback) * 100) : 0,
      icon: <ThumbsDown className="w-4 h-4" />,
      color: 'bg-red-500',
    },
    {
      title: 'Comments Received',
      value: commentsCount,
      percentage: totalFeedback ? Math.round((commentsCount / totalFeedback) * 100) : 0,
      icon: <MessageSquare className="w-4 h-4" />,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryItems.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className={`p-2 rounded-full ${item.color} text-white`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {item.title}
              </p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold">{item.value}</h3>
                {item.percentage !== undefined && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({item.percentage}%)
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeedbackSummary;
