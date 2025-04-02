
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Review } from './useReviewsManagement';

export const useReviewsData = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchReviews();
  }, []);
  
  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get all reviews with user and item details
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (email:username),
          hotels:item_id (name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching reviews:', error);
        setError(error.message);
        toast({
          title: 'Error',
          description: 'Failed to load reviews data',
          variant: 'destructive',
        });
        return;
      }
      
      // Format and enhance the reviews data
      const formattedReviews = data.map((review: any) => ({
        ...review,
        user_email: review.profiles?.email || 'Unknown User',
        item_name: review.hotels?.name || 'Unknown Item',
      }));
      
      setReviews(formattedReviews);
    } catch (error: any) {
      console.error('Error in fetchReviews:', error);
      setError(error.message);
      toast({
        title: 'Error',
        description: error.message || 'An error occurred while fetching reviews',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return { reviews, setReviews, loading, error, fetchReviews };
};
