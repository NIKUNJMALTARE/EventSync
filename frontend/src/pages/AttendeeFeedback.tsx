
// import { useEffect } from 'react';
// import { useFeedbackStore } from '@/store/feedbackStore';
// import FeedbackForm from '@/components/feedback/FeedbackForm';
// import Navbar from '@/components/Navbar';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';
// import { useParams } from 'react-router-dom';

// const { eventId } = useParams<{ eventId: string }>();
// const AttendeeFeedback = () => {
//   const { fetchFeedbackData } = useFeedbackStore();
  
//   // Load feedback data on component mount
//   useEffect(() => {
//     fetchFeedbackData('hackathon-2023');
//   }, [fetchFeedbackData]);
  
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
      
//       <main className="pt-24 pb-16 container px-4 md:px-6">
//         <div className="flex justify-between items-center mb-8">
//           <Button variant="ghost" asChild>
//             <Link to="/" className="flex items-center gap-1">
//               <ArrowLeft className="h-4 w-4" /> Back to Home
//             </Link>
//           </Button>
//         </div>
        
//         <section className="mb-16 text-center space-y-4 max-w-3xl mx-auto">
//           <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
//             Share Your Hackathon Experience
//           </h1>
//           <p className="text-muted-foreground">
//             Your feedback helps us create better hackathons. Tell us about your experience and help us improve future events.
//           </p>
//         </section>
        
//         <section className="max-w-4xl mx-auto">
//         <FeedbackForm eventId={eventId || "default-event-id"} />

//         </section>
//       </main>
      
//       <footer className="py-6 border-t">
//         <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
//           <p className="text-sm text-muted-foreground">
//             Thank you for participating in the hackathon!
//           </p>
//           <div className="flex items-center gap-4">
//             <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
//               Home
//             </Link>
//             <Link to="/teams" className="text-sm text-muted-foreground hover:text-foreground">
//               Teams
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default AttendeeFeedback;

import { useEffect } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AttendeeFeedback = () => {
  const { eventId } = useParams<{ eventId: string }>(); // ✅ Move inside the component
  const { fetchFeedbackData } = useFeedbackStore();
  
  useEffect(() => {
    fetchFeedbackData(eventId || 'default-event-id');
  }, [fetchFeedbackData, eventId]); // ✅ Include eventId in dependency array
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 container px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
        
        <section className="mb-16 text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Share Your Hackathon Experience
          </h1>
          <p className="text-muted-foreground">
            Your feedback helps us create better hackathons. Tell us about your experience and help us improve future events.
          </p>
        </section>
        
        <section className="max-w-4xl mx-auto">
          <FeedbackForm eventId={eventId || "default-event-id"} />
        </section>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            Thank you for participating in the hackathon!
          </p>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link to="/teams" className="text-sm text-muted-foreground hover:text-foreground">
              Teams
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AttendeeFeedback;

// import type { AttendeeFeedback } from '@/utils/feedbackData';
// import { FEEDBACK_CATEGORIES, FeedbackReaction } from '@/utils/feedbackData';
// import { useFeedbackStore } from '@/store/feedbackStore';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Separator } from '@/components/ui/separator';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Smile, ThumbsUp, Frown, Meh, Angry, User } from 'lucide-react';

// interface AttendeeFeedbackProps {
//   eventId: string;
//   teamId?: string;
// }

// const reactionIcons: Record<FeedbackReaction, JSX.Element> = {
//   excited: <ThumbsUp className="text-green-500 w-6 h-6" />,
//   happy: <Smile className="text-blue-500 w-6 h-6" />,
//   neutral: <Meh className="text-gray-500 w-6 h-6" />,
//   disappointed: <Frown className="text-yellow-500 w-6 h-6" />,
//   frustrated: <Angry className="text-red-500 w-6 h-6" />,
// };

// const AttendeeFeedback = ({ eventId, teamId }: AttendeeFeedbackProps) => {
//   const { feedbackList, isLoading } = useFeedbackStore();

//   const filteredFeedback = feedbackList.filter(
//     feedback => feedback.eventId === eventId && (!teamId || feedback.teamId === teamId)
//   );

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">Attendee Feedback</h2>
//       {isLoading ? (
//         <div className="space-y-4">
//           {[...Array(3)].map((_, i) => (
//             <Skeleton key={i} className="h-20 w-full rounded-lg" />
//           ))}
//         </div>
//       ) : filteredFeedback.length === 0 ? (
//         <p className="text-gray-500">No feedback available for this event yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {filteredFeedback.map(feedback => (
//             <Card key={feedback.id} className="w-full">
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <Avatar className="w-10 h-10">
//                     <AvatarFallback>{feedback.isAnonymous ? <User className="w-6 h-6" /> : feedback.attendeeName?.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <CardTitle className="text-lg font-semibold">
//                       {feedback.isAnonymous ? 'Anonymous' : feedback.attendeeName}
//                     </CardTitle>
//                     <CardDescription className="text-sm text-gray-500">
//                       {new Date(feedback.timestamp).toLocaleString()}
//                     </CardDescription>
//                   </div>
//                 </div>
//                 {reactionIcons[feedback.reaction]}
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 {feedback.ratings.map(rating => {
//                   const category = FEEDBACK_CATEGORIES.find(cat => cat.id === rating.category);
//                   return (
//                     <div key={rating.category} className="flex justify-between text-sm">
//                       <span className="text-gray-600">{category?.name}</span>
//                       <span className="font-semibold">{rating.score}/5</span>
//                     </div>
//                   );
//                 })}

//                 {feedback.comment && (
//                   <>
//                     <Separator />
//                     <p className="text-gray-700 italic">"{feedback.comment}"</p>
//                   </>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AttendeeFeedback;