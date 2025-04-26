
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ROUNDS } from '@/utils/teamData';
// import { fetchTeams } from '@/utils/api';
// import Navbar from '@/components/Navbar';
// import RoundTabs from '@/components/RoundTabs';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, Trophy, MessageSquare, BarChart } from 'lucide-react';
// import AnimatedNumber from '@/components/AnimatedNumber';
// import { useToast } from '@/hooks/use-toast';
// import { useQuery } from '@tanstack/react-query';

// const Index = () => {
//   const [activeRound, setActiveRound] = useState(ROUNDS[0]);
//   const { toast } = useToast();
  
//   // Get cumulative score up to current round
//   const getCumulativeScore = (team, currentRound) => {
//     const roundIndex = ROUNDS.indexOf(currentRound);
//     let totalScore = 0;
    
//     for (let i = 0; i <= roundIndex; i++) {
//       const roundName = ROUNDS[i];
//       const roundScores = team.scores.filter(score => score.round === roundName);
//       if (roundScores.length > 0) {
//         const roundAverage = Math.round(
//           roundScores.reduce((sum, score) => sum + score.totalScore, 0) / roundScores.length
//         );
//         totalScore += roundAverage;
//       }
//     }
    
//     return totalScore;
//   };
  
//   // Fetch teams data using React Query
//   const { data: teams = [], isLoading } = useQuery({
//     queryKey: ['teams'],
//     queryFn: async () => {
//       try {
//         return await fetchTeams();
//       } catch (error) {
//         console.error('Failed to fetch teams:', error);
//         toast({
//           title: 'Error',
//           description: 'Failed to load teams data. Using fallback data.',
//           variant: 'destructive',
//         });
//         throw error;
//       }
//     },
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
  
//   // Sort teams by score to get the leaderboard
//   const getLeaderboard = () => {
//     return [...teams].sort((a, b) => {
//       const aScore = getCumulativeScore(a, activeRound);
//       const bScore = getCumulativeScore(b, activeRound);
//       return bScore - aScore;
//     });
//   };
  
//   const leaderboard = getLeaderboard();

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
      
//       <main className="pt-24 pb-16 container px-4 md:px-6">
//         {/* Hero section */}
//         <section className="mb-16 text-center space-y-4 animate-fade-up">
//           <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
//             Hackathon LeaderBoard
//           </h1>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Track team progress, judge scores, and feedback across all rounds to ensure
//             a fair and transparent hackathon experience.
//           </p>
//           <div className="flex flex-wrap gap-4 justify-center pt-4">
//             <Button asChild>
//               <Link to="/teams">
//                 View All Teams <ArrowRight className="ml-2 h-4 w-4" />
//               </Link>
//             </Button>
//             <Button variant="outline" asChild>
//               <Link to="/judge-panel">
//                 Judge Panel
//               </Link>
//             </Button>
//           </div>
//         </section>
        
//         {/* Quick Actions */}
//         <section className="mb-12">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <Link to="/attendee-feedback">
//               <div className="border rounded-lg p-6 hover:border-primary hover:bg-secondary/20 transition-all">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="p-2 rounded-full bg-primary/10">
//                     <MessageSquare className="h-5 w-5 text-primary" />
//                   </div>
//                   <h3 className="font-medium">Submit Feedback</h3>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   Share your experience and help us improve future hackathons.
//                 </p>
//               </div>
//             </Link>
            
//             <Link to="/admin-dashboard">
//               <div className="border rounded-lg p-6 hover:border-primary hover:bg-secondary/20 transition-all">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="p-2 rounded-full bg-primary/10">
//                     <BarChart className="h-5 w-5 text-primary" />
//                   </div>
//                   <h3 className="font-medium">Analytics Dashboard</h3>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   View feedback analytics and insights from all participants.
//                 </p>
//               </div>
//             </Link>
            
//             <Link to="/teams">
//               <div className="border rounded-lg p-6 hover:border-primary hover:bg-secondary/20 transition-all">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="p-2 rounded-full bg-primary/10">
//                     <Trophy className="h-5 w-5 text-primary" />
//                   </div>
//                   <h3 className="font-medium">Team Scores</h3>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   Browse all teams and see detailed scoring breakdowns.
//                 </p>
//               </div>
//             </Link>
//           </div>
//         </section>
        
//         {/* Rounds and Leaderboard */}
//         <section className="mb-16">
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <Trophy className="h-5 w-5 text-primary" />
//                 <h2 className="text-2xl font-bold">Leaderboard</h2>
//               </div>
//               <RoundTabs activeRound={activeRound} onRoundChange={setActiveRound} />
//             </div>
            
//             <div className="rounded-lg border overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead>
//                     <tr className="bg-muted/50 border-b">
//                       <th className="text-left font-medium py-3 px-4 w-12">Rank</th>
//                       <th className="text-left font-medium py-3 px-4">Team</th>
//                       <th className="text-center font-medium py-3 px-4">Feasibility</th>
//                       <th className="text-center font-medium py-3 px-4">Originality</th>
//                       <th className="text-center font-medium py-3 px-4">Completeness</th>
//                       <th className="text-center font-medium py-3 px-4">Functionality</th>
//                       <th className="text-center font-medium py-3 px-4">Presentation</th>
//                       <th className="text-center font-medium py-3 px-4">Round Score</th>
//                       <th className="text-center font-medium py-3 px-4">Total Score</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {isLoading ? (
//                       // Loading state
//                       Array(5).fill(0).map((_, index) => (
//                         <tr key={`loading-${index}`} className="animate-pulse">
//                           <td className="py-3 px-4"><div className="h-6 bg-muted rounded"></div></td>
//                           <td className="py-3 px-4"><div className="h-6 bg-muted rounded"></div></td>
//                           <td className="py-3 px-4"><div className="h-6 bg-muted rounded"></div></td>
//                           <td className="py-3 px-4"><div className="h-6 bg-muted rounded"></div></td>
//                           <td className="py-3 px-4"><div className="h-6 bg-muted rounded"></div></td>
//                           <td className="py-3 px-4"><div className="h-6 bg-muted rounded"></div></td>
//                           <td className="py-3 px-4"><div className="h-6 bg-muted rounded"></div></td>
//                           <td className="py-3 px-4"><div className="h-6 bg-muted rounded"></div></td>
//                           <td className="py-3 px-4"><div className="h-6 bg-muted rounded"></div></td>
//                         </tr>
//                       ))
//                     ) : leaderboard.length > 0 ? (
//                       leaderboard.map((team, index) => {
//                         const roundScores = team.scores.filter(score => score.round === activeRound);
//                         const hasScoreForRound = roundScores.length > 0;
                        
//                         // Calculate average scores for each category
//                         const categoryScores = hasScoreForRound
//                           ? team.scores[0].categories.map(cat => {
//                               const scores = roundScores.map(score => 
//                                 score.categories.find(c => c.name === cat.name)?.score || 0
//                               );
//                               return {
//                                 name: cat.name,
//                                 average: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
//                               };
//                             })
//                           : [];
                          
//                         // Calculate total average score for this round
//                         const roundScore = hasScoreForRound
//                           ? Math.round(roundScores.reduce((sum, score) => sum + score.totalScore, 0) / roundScores.length)
//                           : 0;
                        
//                         // Calculate cumulative score up to this round
//                         const cumulativeScore = getCumulativeScore(team, activeRound);
                        
//                         // Calculate max possible score based on rounds completed
//                         const roundIndex = ROUNDS.indexOf(activeRound);
//                         const maxPossibleScore = (roundIndex + 1) * 100;
                        
//                         const rowClass = index % 2 === 0 ? 'bg-background' : 'bg-muted/20';
//                         const rankClass = index < 3 ? 'font-bold' : '';
                        
//                         return (
//                           <tr key={team.id} className={`${rowClass} hover:bg-muted/30 transition-colors`}>
//                             <td className={`py-3 px-4 ${rankClass}`}>
//                               {index < 3 ? (
//                                 <div className="flex items-center justify-center rounded-full w-6 h-6 text-xs bg-primary/10 text-primary">
//                                   {index + 1}
//                                 </div>
//                               ) : (
//                                 <span>{index + 1}</span>
//                               )}
//                             </td>
//                             <td className="py-3 px-4">
//                               <Link to={`/teams/${team.id}`} className="hover:underline">
//                                 <div>
//                                   <div className="font-medium">{team.name}</div>
//                                   <div className="text-xs text-muted-foreground">{team.projectName}</div>
//                                 </div>
//                               </Link>
//                             </td>
//                             {hasScoreForRound ? (
//                               categoryScores.map(cat => (
//                                 <td key={cat.name} className="py-3 px-4 text-center">
//                                   <AnimatedNumber value={cat.average} className="font-medium" />
//                                 </td>
//                               ))
//                             ) : (
//                               <>
//                                 <td className="py-3 px-4 text-center text-muted-foreground">-</td>
//                                 <td className="py-3 px-4 text-center text-muted-foreground">-</td>
//                                 <td className="py-3 px-4 text-center text-muted-foreground">-</td>
//                                 <td className="py-3 px-4 text-center text-muted-foreground">-</td>
//                                 <td className="py-3 px-4 text-center text-muted-foreground">-</td>
//                               </>
//                             )}
//                             <td className="py-3 px-4 text-center">
//                               {hasScoreForRound ? (
//                                 <div className="font-medium">
//                                   <AnimatedNumber value={roundScore} />
//                                   <span className="text-xs text-muted-foreground">/100</span>
//                                 </div>
//                               ) : (
//                                 <span className="text-muted-foreground">-</span>
//                               )}
//                             </td>
//                             <td className="py-3 px-4 text-center">
//                               {cumulativeScore > 0 ? (
//                                 <div className="font-bold">
//                                   <AnimatedNumber value={cumulativeScore} />
//                                   <span className="text-xs text-muted-foreground font-normal">/{maxPossibleScore}</span>
//                                 </div>
//                               ) : (
//                                 <span className="text-muted-foreground">-</span>
//                               )}
//                             </td>
//                           </tr>
//                         );
//                       })
//                     ) : (
//                       <tr>
//                         <td colSpan={9} className="text-center py-6 text-muted-foreground">
//                           No teams data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </section>
        
//         {/* How it works */}
//         <section className="py-8 max-w-4xl mx-auto">
//           <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="glass-card p-6 rounded-lg text-center">
//               <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-lg font-bold text-primary">1</span>
//               </div>
//               <h3 className="text-lg font-medium mb-2">Judging Rounds</h3>
//               <p className="text-sm text-muted-foreground">
//                 Teams are evaluated across multiple rounds by different judges.
//               </p>
//             </div>
            
//             <div className="glass-card p-6 rounded-lg text-center">
//               <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-lg font-bold text-primary">2</span>
//               </div>
//               <h3 className="text-lg font-medium m-2">Attendee Feedback</h3>
//               <p className="text-sm text-muted-foreground">
//                 Participants share their experience to help improve future events.
//               </p>
//             </div>
            
//             <div className="glass-card p-6 rounded-lg text-center">
//               <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-lg font-bold text-primary">3</span>
//               </div>
//               <h3 className="text-lg font-medium mb-2">Insights & Analytics</h3>
//               <p className="text-sm text-muted-foreground">
//                 Organizers analyze feedback and scores to make data-driven decisions.
//               </p>
//             </div>
//           </div>
//         </section>
//       </main>
      
//       <footer className="py-6 border-t">
//         <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
//           <p className="text-sm text-muted-foreground">
//             © 2023 HackJudge. All rights reserved.
//           </p>
//           <div className="flex items-center gap-4">
//             <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
//               Home
//             </Link>
//             <Link to="/teams" className="text-sm text-muted-foreground hover:text-foreground">
//               Teams
//             </Link>
//             <Link to="/attendee-feedback" className="text-sm text-muted-foreground hover:text-foreground">
//               Submit Feedback
//             </Link>
//             <Link to="/admin-dashboard" className="text-sm text-muted-foreground hover:text-foreground">
//               Admin Dashboard
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Index;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUNDS } from '@/utils/teamData';
import { fetchTeams } from '@/utils/api';
import Navbar from '@/components/Navbar';
import RoundTabs from '@/components/RoundTabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, MessageSquare, BarChart } from 'lucide-react';
import AnimatedNumber from '@/components/AnimatedNumber';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

const Index = () => {
  const [activeRound, setActiveRound] = useState(ROUNDS[0]);
  const { toast } = useToast();
  
  // Get cumulative score up to current round
  const getCumulativeScore = (team, currentRound) => {
    const roundIndex = ROUNDS.indexOf(currentRound);
    let totalScore = 0;
    
    for (let i = 0; i <= roundIndex; i++) {
      const roundName = ROUNDS[i];
      const roundScores = team.scores.filter(score => score.round === roundName);
      if (roundScores.length > 0) {
        const roundAverage = Math.round(
          roundScores.reduce((sum, score) => sum + score.totalScore, 0) / roundScores.length
        );
        totalScore += roundAverage;
      }
    }
    
    return totalScore;
  };
  
  // Fetch teams data using React Query
  const { data: teams = [], isLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      try {
        return await fetchTeams();
      } catch (error) {
        console.error('Failed to fetch teams:', error);
        toast({
          title: 'Error',
          description: 'Failed to load teams data. Using fallback data.',
          variant: 'destructive',
        });
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Sort teams by score to get the leaderboard
  const getLeaderboard = () => {
    return [...teams].sort((a, b) => {
      const aScore = getCumulativeScore(a, activeRound);
      const bScore = getCumulativeScore(b, activeRound);
      return bScore - aScore;
    });
  };
  
  const leaderboard = getLeaderboard();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-5 container px-4 md:px-6">
        {/* Hero section */}
        <section className="mb-14 p-16 text-center space-y-6 animate-fade-up bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-400 p-8 rounded-2xl shadow-lg">
  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
    Hackathon Leaderboard
  </h1>
  <p className="text-gray-100 max-w-2xl mx-auto text-lg">
    Track team progress, judge scores, and feedback across all rounds to ensure
    a fair and transparent hackathon experience.
  </p>
  <div className="flex flex-wrap gap-4 justify-center pt-6">
    <Button asChild className="bg-white text-blue-600 hover:bg-gray-100">
      <Link to="/teams">
        View All Teams <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
    <Button variant="outline" asChild className="border-white text-blue-600 hover:bg-gray-100 hover:text-blue-600">
      <Link to="/judge-panel">
        Judge Panel
      </Link>
    </Button>
  </div>
</section>


        
        {/* Quick Actions */}
        <section className="mb-12">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Link to="/attendee-feedback">
      <div className="border rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition-all hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-full bg-blue-100">
            <MessageSquare className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg text-gray-800">Submit Feedback</h3>
        </div>
        <p className="text-sm text-gray-600">
          Share your experience and help us improve hackathons.
        </p>
      </div>
    </Link>

    <Link to="/admin-dashboard">
      <div className="border rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition-all hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-full bg-green-100">
            <BarChart className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-lg text-gray-800">Analytics Dashboard</h3>
        </div>
        <p className="text-sm text-gray-600">
          View feedback analytics and insights from all participants.
        </p>
      </div>
    </Link>

    <Link to="/teams">
      <div className="border rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition-all hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-full bg-yellow-100">
            <Trophy className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="font-semibold text-lg text-gray-800">Team Scores</h3>
        </div>
        <p className="text-sm text-gray-600">
          Browse all teams and see detailed scoring breakdowns.
        </p>
      </div>
    </Link>
  </div>
</section>


        
        {/* Rounds and Leaderboard */}
        <section className="mb-12 pt-8">
  <div className="space-y-6">
    <div >
      <div className="flex items-center space-x-2 pb-5 justify-center">
        <Trophy className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold text-gray-800 text-center ">Leaderboard</h2>
      </div>
      <RoundTabs activeRound={activeRound} onRoundChange={setActiveRound} />
    </div>

    <div className="rounded-lg border bg-white shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left font-medium">Rank</th>
              <th className="py-3 px-4 text-left font-medium">Team</th>
              <th className="py-3 px-4 text-center font-medium">Feasibility</th>
              <th className="py-3 px-4 text-center font-medium">Originality</th>
              <th className="py-3 px-4 text-center font-medium">Completeness</th>
              <th className="py-3 px-4 text-center font-medium">Functionality</th>
              <th className="py-3 px-4 text-center font-medium">Presentation</th>
              <th className="py-3 px-4 text-center font-medium">Round Score</th>
              <th className="py-3 px-4 text-center font-medium">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array(5).fill(0).map((_, index) => (
                <tr key={`loading-${index}`} className="animate-pulse bg-gray-50">
                  {Array(9).fill(0).map((_, idx) => (
                    <td key={idx} className="py-3 px-4">
                      <div className="h-6 bg-gray-300 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : leaderboard.length > 0 ? (
              leaderboard.map((team, index) => {
                const roundScores = team.scores.filter(score => score.round === activeRound);
                const hasScoreForRound = roundScores.length > 0;

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
                  
                const roundScore = hasScoreForRound
                  ? Math.round(roundScores.reduce((sum, score) => sum + score.totalScore, 0) / roundScores.length)
                  : 0;

                const cumulativeScore = getCumulativeScore(team, activeRound);
                const roundIndex = ROUNDS.indexOf(activeRound);
                const maxPossibleScore = (roundIndex + 1) * 100;

                const rowClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                const rankBadge = index < 3 ? `bg-primary text-white px-2 py-1 rounded-full` : '';

                return (
                  <tr key={team.id} className={`${rowClass} hover:bg-gray-100 transition`}>
                    <td className="py-3 px-4 font-semibold">
                      <span className={`${rankBadge} inline-block w-8 text-center`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link to={`/teams/${team.id}`} className="hover:underline text-gray-800">
                        <div className="font-medium">{team.name}</div>
                        <div className="text-xs text-gray-500">{team.projectName}</div>
                      </Link>
                    </td>
                    {hasScoreForRound ? (
                      categoryScores.map(cat => (
                        <td key={cat.name} className="py-3 px-4 text-center">
                          <span className="font-medium">{cat.average}</span>
                        </td>
                      ))
                    ) : (
                      Array(5).fill('-').map((_, i) => (
                        <td key={i} className="py-3 px-4 text-center text-gray-400">-</td>
                      ))
                    )}
                    <td className="py-3 px-4 text-center font-semibold">
                      {hasScoreForRound ? `${roundScore}/100` : '-'}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold">
                      {cumulativeScore > 0 ? `${cumulativeScore}/${maxPossibleScore}` : '-'}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  No teams data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

        
        {/* How it works */}
        <section className="py-12 max-w-5xl mx-auto">
  <h2 className="text-3xl font-extrabold mb-10 text-center">How It Works</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      {
        step: "1",
        title: "Judging Rounds",
        description: "Teams are evaluated across multiple rounds by different judges.",
      },
      {
        step: "2",
        title: "Attendee Feedback",
        description: "Participants share their experience to help improve future events.",
      },
      {
        step: "3",
        title: "Insights & Analytics",
        description: "Organizers analyze feedback and scores to make data-driven decisions.",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="glass-card p-8 rounded-xl text-center transition-transform transform hover:scale-105 hover:shadow-lg"
      >
        <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-xl font-extrabold text-primary">{item.step}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
        <p className="text-base text-muted-foreground">{item.description}</p>
      </div>
    ))}
  </div>
</section>

      </main>
      
      <footer className="py-8 bg-neutral-900 text-foreground border-t border-neutral-700">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
    <p className="text-sm font-medium text-gray-400">
      © 2023 <span className="text-white font-semibold">HackJudge</span>. All rights reserved.
    </p>
    <div className="flex items-center gap-6">
      {[
        { name: "Home", path: "/" },
        { name: "Teams", path: "/teams" },
        { name: "Submit Feedback", path: "/attendee-feedback" },
        { name: "Admin Dashboard", path: "/admin-dashboard" },
      ].map((link, index) => (
        <Link
          key={index}
          to={link.path}
          className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300"
        >
          {link.name}
        </Link>
      ))}
    </div>
  </div>
  <div className="mt-4 flex justify-center gap-4 text-xl">
    {[
      { icon: "fab fa-facebook", link: "#" },
      { icon: "fab fa-twitter", link: "#" },
      { icon: "fab fa-linkedin", link: "#" },
      { icon: "fab fa-instagram", link: "#" },
    ].map((social, index) => (
      <a
        key={index}
        href={social.link}
        className="text-gray-400 hover:text-white transition-colors duration-300"
        aria-label={social.icon.split(" ")[1]}
      >
        <i className={social.icon}></i>
      </a>
    ))}
  </div>
</footer>

    </div>
  );
};

export default Index;