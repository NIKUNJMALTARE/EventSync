
import { create } from 'zustand';
import { fetchFeedback, submitFeedback } from '@/utils/api';
import { AttendeeFeedback, FeedbackRating, FeedbackReaction } from '@/utils/feedbackData';

interface FeedbackState {
  feedbackList: AttendeeFeedback[];
  isLoading: boolean;
  error: string | null;
  currentEventId: string;
  fetchFeedbackData: (eventId: string) => Promise<void>;
  submitNewFeedback: (feedback: Omit<AttendeeFeedback, 'id' | 'timestamp'>) => Promise<void>;
}

export const useFeedbackStore = create<FeedbackState>((set, get) => ({
  feedbackList: [],
  isLoading: false,
  error: null,
  currentEventId: 'hackathon-2023',
  
  fetchFeedbackData: async (eventId: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchFeedback(eventId);
      set({ 
        feedbackList: data,
        currentEventId: eventId,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error in fetchFeedbackData:', error);
      set({ 
        error: 'Failed to load feedback data',
        isLoading: false 
      });
    }
  },
  
  submitNewFeedback: async (feedback) => {
    set({ isLoading: true, error: null });
    try {
      const newFeedback = await submitFeedback(feedback);
      set(state => ({ 
        feedbackList: [...state.feedbackList, newFeedback],
        isLoading: false 
      }));
    } catch (error) {
      console.error('Error in submitNewFeedback:', error);
      set({ 
        error: 'Failed to submit feedback',
        isLoading: false 
      });
    }
  }
}));
