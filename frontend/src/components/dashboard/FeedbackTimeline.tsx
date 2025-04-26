
import { useState } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type TimeInterval = 'hourly' | 'daily' | 'weekly';

const FeedbackTimeline = () => {
  const { feedbackList } = useFeedbackStore();
  const [interval, setInterval] = useState<TimeInterval>('hourly');
  
  if (!feedbackList.length) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Feedback Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No feedback data available
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Sort feedback by timestamp
  const sortedFeedback = [...feedbackList].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  // Group feedback by the selected time interval
  const groupFeedbackByTime = () => {
    const groupedData: Record<string, { count: number, date: Date, avgRating: number }> = {};
    
    sortedFeedback.forEach(feedback => {
      const date = new Date(feedback.timestamp);
      let timeKey: string;
      
      if (interval === 'hourly') {
        timeKey = `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:00`;
      } else if (interval === 'daily') {
        timeKey = `${date.getMonth()+1}/${date.getDate()}`;
      } else { // weekly
        const firstDayOfWeek = new Date(date);
        const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
        firstDayOfWeek.setDate(diff);
        timeKey = `${firstDayOfWeek.getMonth()+1}/${firstDayOfWeek.getDate()}`;
      }
      
      if (!groupedData[timeKey]) {
        groupedData[timeKey] = { count: 0, date, avgRating: 0 };
      }
      
      groupedData[timeKey].count++;
      
      // Calculate average overall rating
      const overallRating = feedback.ratings.find(r => r.category === 'overall')?.score || 0;
      groupedData[timeKey].avgRating = 
        (groupedData[timeKey].avgRating * (groupedData[timeKey].count - 1) + overallRating) / 
        groupedData[timeKey].count;
    });
    
    // Convert to array format for chart
    return Object.entries(groupedData)
      .map(([time, data]) => ({
        time,
        count: data.count,
        avgRating: parseFloat(data.avgRating.toFixed(1)),
        date: data.date,
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };
  
  const timelineData = groupFeedbackByTime();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">
            Feedback Over Time
          </CardTitle>
          <Select
            value={interval}
            onValueChange={(value) => setInterval(value as TimeInterval)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={timelineData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
              <Tooltip />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="count"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                name="Submissions"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="avgRating"
                stackId="2"
                stroke="#ffc658"
                fill="#ffc658"
                name="Avg Rating"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackTimeline;  