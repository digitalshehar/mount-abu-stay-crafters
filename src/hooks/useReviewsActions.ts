
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Review } from './useReviewsManagement';

export const useReviewsActions = () => {
  const { toast } = useToast();
  
  const deleteReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: 'Review Deleted',
        description: 'The review has been deleted successfully',
      });
      
      return true;
    } catch (error: any) {
      console.error('Error deleting review:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete review',
        variant: 'destructive',
      });
      return false;
    }
  };
  
  const updateReview = async (id: string, data: Partial<Review>) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: 'Review Updated',
        description: 'The review has been updated successfully',
      });
      
      return true;
    } catch (error: any) {
      console.error('Error updating review:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update review',
        variant: 'destructive',
      });
      return false;
    }
  };
  
  // Add a new function to create a review
  const createReview = async (reviewData: Omit<Review, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([reviewData])
        .select();
      
      if (error) throw error;
      
      toast({
        title: 'Review Submitted',
        description: 'Thank you for your feedback!',
      });
      
      return data?.[0] || null;
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit review',
        variant: 'destructive',
      });
      return null;
    }
  };
  
  return { deleteReview, updateReview, createReview };
};
