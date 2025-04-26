
import { FEEDBACK_CATEGORIES, getAverageRating } from '@/utils/feedbackData';
import { useFeedbackStore } from '@/store/feedbackStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RatingsByCategory = () => {
  const { feedbackList } = useFeedbackStore();
  
  // Prepare data for chart
  const data = FEEDBACK_CATEGORIES.map(category => ({
    name: category.name,
    score: getAverageRating(feedbackList, category.id),
    fullMark: 5,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Ratings by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        {feedbackList.length > 0 ? (
          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end"
                  height={60}
                  interval={0}
                />
                <YAxis domain={[0, 5]} />
                <Tooltip
                  formatter={(value) => [`${value}/5`, 'Rating']}
                />
                <Bar 
                  dataKey="score" 
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[320px] flex items-center justify-center text-muted-foreground">
            No feedback data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RatingsByCategory;
