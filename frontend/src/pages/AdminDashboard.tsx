
// import { useEffect, useState } from 'react';
// import { useFeedbackStore } from '@/store/feedbackStore';
// import Navbar from '@/components/Navbar';
// import SentimentChart from '@/components/dashboard/SentimentChart';
// import RatingsByCategory from '@/components/dashboard/RatingsByCategory';
// import FeedbackTimeline from '@/components/dashboard/FeedbackTimeline';
// import RecentFeedback from '@/components/dashboard/RecentFeedback';
// import FeedbackSummary from '@/components/dashboard/FeedbackSummary';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Link } from 'react-router-dom';
// import { Download, RefreshCw, ArrowLeft } from 'lucide-react';

// const AdminDashboard = () => {
//   const { feedbackList, fetchFeedbackData, isLoading } = useFeedbackStore();
//   const [timeRange, setTimeRange] = useState('all');
//   const [filteredFeedback, setFilteredFeedback] = useState(feedbackList);
  
//   // Load feedback data on component mount
//   useEffect(() => {
//     fetchFeedbackData('hackathon-2023');
//   }, [fetchFeedbackData]);
  
//   // Apply time range filter
//   useEffect(() => {
//     if (timeRange === 'all') {
//       setFilteredFeedback(feedbackList);
//       return;
//     }
    
//     const now = new Date();
//     const cutoffDate = new Date();
    
//     switch (timeRange) {
//       case 'today':
//         cutoffDate.setHours(0, 0, 0, 0);
//         break;
//       case '24h':
//         cutoffDate.setHours(now.getHours() - 24);
//         break;
//       case '7d':
//         cutoffDate.setDate(now.getDate() - 7);
//         break;
//       case '30d':
//         cutoffDate.setDate(now.getDate() - 30);
//         break;
//       default:
//         break;
//     }
    
//     const filtered = feedbackList.filter(
//       (feedback) => new Date(feedback.timestamp) >= cutoffDate
//     );
    
//     setFilteredFeedback(filtered);
//   }, [timeRange, feedbackList]);
  
//   const handleRefresh = () => {
//     fetchFeedbackData('hackathon-2023');
//   };
  
//   const handleExport = () => {
//     // Create CSV content
//     const headers = [
//       'ID', 'Timestamp', 'Reaction', 'Overall Rating', 
//       'Organization Rating', 'Judging Rating', 'Mentorship Rating', 
//       'Facilities Rating', 'Comment', 'Anonymous', 'Attendee Name', 'Attendee Email'
//     ];
    
//     const rows = feedbackList.map(feedback => {
//       const ratings = {
//         overall: feedback.ratings.find(r => r.category === 'overall')?.score || 'N/A',
//         organization: feedback.ratings.find(r => r.category === 'organization')?.score || 'N/A',
//         judging: feedback.ratings.find(r => r.category === 'judging')?.score || 'N/A',
//         mentorship: feedback.ratings.find(r => r.category === 'mentorship')?.score || 'N/A',
//         facilities: feedback.ratings.find(r => r.category === 'facilities')?.score || 'N/A',
//       };
      
//       return [
//         feedback.id,
//         new Date(feedback.timestamp).toLocaleString(),
//         feedback.reaction,
//         ratings.overall,
//         ratings.organization,
//         ratings.judging,
//         ratings.mentorship,
//         ratings.facilities,
//         `"${feedback.comment || ''}"`,
//         feedback.isAnonymous ? 'Yes' : 'No',
//         feedback.attendeeName || 'N/A',
//         feedback.attendeeEmail || 'N/A'
//       ];
//     });
    
//     const csvContent = [
//       headers.join(','),
//       ...rows.map(row => row.join(','))
//     ].join('\n');
    
//     // Create a download link
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.setAttribute('href', url);
//     link.setAttribute('download', `hackathon-feedback-${new Date().toISOString().slice(0, 10)}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

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
//           <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//           <div className="flex items-center gap-2">
//             <Button 
//               variant="outline" 
//               size="sm" 
//               onClick={handleRefresh}
//               disabled={isLoading}
//             >
//               <RefreshCw className="h-4 w-4 mr-1" />
//               Refresh
//             </Button>
//             <Button 
//               variant="outline" 
//               size="sm" 
//               onClick={handleExport}
//             >
//               <Download className="h-4 w-4 mr-1" />
//               Export
//             </Button>
//           </div>
//         </div>
        
//         <div className="mb-6 flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <p className="text-muted-foreground">
//               {filteredFeedback.length} feedback submissions
//             </p>
//           </div>
//           <Select
//             value={timeRange}
//             onValueChange={setTimeRange}
//           >
//             <SelectTrigger className="w-[150px]">
//               <SelectValue placeholder="Select time range" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Time</SelectItem>
//               <SelectItem value="today">Today</SelectItem>
//               <SelectItem value="24h">Last 24 Hours</SelectItem>
//               <SelectItem value="7d">Last 7 Days</SelectItem>
//               <SelectItem value="30d">Last 30 Days</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
        
//         {/* Summary Cards */}
//         <section className="mb-6">
//           <FeedbackSummary />
//         </section>
        
//         {/* Main Charts */}
//         <section className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <SentimentChart />
//           <RatingsByCategory />
//         </section>
        
//         {/* Timeline Chart */}
//         <section className="mb-6">
//           <FeedbackTimeline />
//         </section>
        
//         {/* Recent Feedback */}
//         <section className="mb-6">
//           <RecentFeedback />
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useEffect, useState } from 'react';
import { useFeedbackStore } from '@/store/feedbackStore';
import Navbar from '@/components/Navbar';
import SentimentChart from '@/components/dashboard/SentimentChart';
import RatingsByCategory from '@/components/dashboard/RatingsByCategory';
import FeedbackTimeline from '@/components/dashboard/FeedbackTimeline';
import RecentFeedback from '@/components/dashboard/RecentFeedback';
import FeedbackSummary from '@/components/dashboard/FeedbackSummary';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { Download, RefreshCw, ArrowLeft, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AdminDashboard = () => {
  const { feedbackList, fetchFeedbackData, isLoading } = useFeedbackStore();
  const [timeRange, setTimeRange] = useState('all');
  const [filteredFeedback, setFilteredFeedback] = useState(feedbackList);
  
  // Load feedback data on component mount
  useEffect(() => {
    fetchFeedbackData('hackathon-2023');
  }, [fetchFeedbackData]);
  
  // Apply time range filter
  useEffect(() => {
    if (timeRange === 'all') {
      setFilteredFeedback(feedbackList);
      return;
    }
    
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (timeRange) {
      case 'today':
        cutoffDate.setHours(0, 0, 0, 0);
        break;
      case '24h':
        cutoffDate.setHours(now.getHours() - 24);
        break;
      case '7d':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        cutoffDate.setDate(now.getDate() - 30);
        break;
      default:
        break;
    }
    
    const filtered = feedbackList.filter(
      (feedback) => new Date(feedback.timestamp) >= cutoffDate
    );
    
    setFilteredFeedback(filtered);
  }, [timeRange, feedbackList]);
  
  const handleRefresh = () => {
    fetchFeedbackData('hackathon-2023');
  };
  
  const handleExportCSV = () => {
    // Create CSV content
    const headers = [
      'ID', 'Timestamp', 'Reaction', 'Overall Rating', 
      'Organization Rating', 'Judging Rating', 'Mentorship Rating', 
      'Facilities Rating', 'Comment', 'Anonymous', 'Attendee Name', 'Attendee Email'
    ];
    
    const rows = feedbackList.map(feedback => {
      const ratings = {
        overall: feedback.ratings.find(r => r.category === 'overall')?.score || 'N/A',
        organization: feedback.ratings.find(r => r.category === 'organization')?.score || 'N/A',
        judging: feedback.ratings.find(r => r.category === 'judging')?.score || 'N/A',
        mentorship: feedback.ratings.find(r => r.category === 'mentorship')?.score || 'N/A',
        facilities: feedback.ratings.find(r => r.category === 'facilities')?.score || 'N/A',
      };
      
      return [
        feedback.id,
        new Date(feedback.timestamp).toLocaleString(),
        feedback.reaction,
        ratings.overall,
        ratings.organization,
        ratings.judging,
        ratings.mentorship,
        ratings.facilities,
        `"${feedback.comment || ''}"`,
        feedback.isAnonymous ? 'Yes' : 'No',
        feedback.attendeeName || 'N/A',
        feedback.attendeeEmail || 'N/A'
      ];
    });
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create a download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `hackathon-feedback-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = async () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Get the main content of the dashboard
    const mainContent = document.querySelector('main');
    
    if (mainContent) {
      // Convert the content to canvas
      const canvas = await html2canvas(mainContent, {
        scale: 2, // Increase scale for better quality
        useCORS: true, // Handle cross-origin images
        logging: false // Disable logging
      });
      
      // Get canvas dimensions
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add the image to PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Save the PDF
      pdf.save(`hackathon-feedback-${new Date().toISOString().slice(0, 10)}.pdf`);
    }
  };

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
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportCSV}
            >
              <Download className="h-4 w-4 mr-1" />
              Export CSV
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportPDF}
            >
              <FileText className="h-4 w-4 mr-1" />
              Export PDF
            </Button>
          </div>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground">
              {filteredFeedback.length} feedback submissions
            </p>
          </div>
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Summary Cards */}
        <section className="mb-6">
          <FeedbackSummary />
        </section>
        
        {/* Main Charts */}
        <section className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SentimentChart />
          <RatingsByCategory />
        </section>
        
        {/* Timeline Chart */}
        {/* <section className="mb-6">
          <FeedbackTimeline />
        </section> */}
        
        {/* Recent Feedback */}
        <section className="mb-6">
          <RecentFeedback />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;