
import { countReactions } from '@/utils/feedbackData';
import { useFeedbackStore } from '@/store/feedbackStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp, Smile, Meh, Frown, Angry } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#22c55e', '#10b981', '#6366f1', '#f59e0b', '#ef4444'];

const SentimentChart = () => {
  const { feedbackList } = useFeedbackStore();
  
  // Count the reactions
  const reactionCounts = countReactions(feedbackList);
  
  // Prepare data for the chart
  const data = [
    { name: 'Excited', value: reactionCounts.excited, icon: <ThumbsUp className="w-4 h-4" /> },
    { name: 'Happy', value: reactionCounts.happy, icon: <Smile className="w-4 h-4" /> },
    { name: 'Neutral', value: reactionCounts.neutral, icon: <Meh className="w-4 h-4" /> },
    { name: 'Disappointed', value: reactionCounts.disappointed, icon: <Frown className="w-4 h-4" /> },
    { name: 'Frustrated', value: reactionCounts.frustrated, icon: <Angry className="w-4 h-4" /> }
  ];
  
  // Filter out zero-value entries for cleaner chart
  const chartData = data.filter(item => item.value > 0);
  
  // Custom renderer for the Legend
  const renderLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <ul className="flex flex-wrap justify-center gap-4 text-sm mt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span>{entry.value}</span>
            <span className="ml-1 text-muted-foreground">({data.find(d => d.name === entry.value)?.value || 0})</span>
          </li>
        ))}
      </ul>
    );
  };
  
  // Calculate sentiment score (weighted average)
  // Excited = 2, Happy = 1, Neutral = 0, Disappointed = -1, Frustrated = -2
  const weights = { excited: 2, happy: 1, neutral: 0, disappointed: -1, frustrated: -2 };
  const totalResponses = Object.values(reactionCounts).reduce((a, b) => a + b, 0);
  const weightedSum = Object.entries(reactionCounts).reduce(
    (sum, [reaction, count]) => sum + weights[reaction as keyof typeof weights] * count, 
    0
  );
  const sentimentScore = totalResponses ? (weightedSum / totalResponses).toFixed(1) : 'N/A';
  
  // Determine the sentiment label
  let sentimentLabel = 'Neutral';
  let sentimentColor = 'text-muted-foreground';
  
  if (totalResponses) {
    const score = parseFloat(sentimentScore);
    if (score >= 1.5) {
      sentimentLabel = 'Very Positive';
      sentimentColor = 'text-green-500';
    } else if (score >= 0.5) {
      sentimentLabel = 'Positive';
      sentimentColor = 'text-green-400';
    } else if (score > -0.5) {
      sentimentLabel = 'Neutral';
      sentimentColor = 'text-blue-400';
    } else if (score > -1.5) {
      sentimentLabel = 'Negative';
      sentimentColor = 'text-orange-400';
    } else {
      sentimentLabel = 'Very Negative';
      sentimentColor = 'text-red-500';
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Sentiment Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-2">
          <div className="text-sm text-muted-foreground">
            Based on {totalResponses} responses
          </div>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="text-2xl font-bold">{sentimentScore}</span>
            <span className={`text-sm font-medium ${sentimentColor}`}>
              {sentimentLabel}
            </span>
          </div>
        </div>
        
        {chartData.length > 0 ? (
          <div className="w-full h-[240px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend content={renderLegend} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[240px] flex items-center justify-center text-muted-foreground">
            No feedback data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SentimentChart;
