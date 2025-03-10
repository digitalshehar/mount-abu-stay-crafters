
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Review {
  id: string;
  user_id: string;
  item_id: number;
  item_type: string;
  rating: number;
  comment?: string;
  created_at: string;
  user_email?: string;
  item_name?: string;
}

export const useReviewsManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [itemTypeFilter, setItemTypeFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  
  useEffect(() => {
    fetchReviews();
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = [...reviews];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(review => 
        review.comment?.toLowerCase().includes(query) ||
        review.user_email?.toLowerCase().includes(query) ||
        review.item_name?.toLowerCase().includes(query)
      );
    }
    
    // Apply item type filter
    if (itemTypeFilter !== 'all') {
      result = result.filter(review => review.item_type === itemTypeFilter);
    }
    
    // Apply rating filter
    if (ratingFilter !== null) {
      result = result.filter(review => review.rating === ratingFilter);
    }
    
    setFilteredReviews(result);
  }, [reviews, searchQuery, itemTypeFilter, ratingFilter]);
  
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
      setFilteredReviews(formattedReviews);
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
  
  const deleteReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setReviews(prevReviews => prevReviews.filter(review => review.id !== id));
      
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
      
      // Update local state
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review.id === id ? { ...review, ...data } : review
        )
      );
      
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
  
  // Get review statistics
  const getReviewStats = () => {
    const stats = {
      totalReviews: reviews.length,
      averageRating: 0,
      ratingDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      },
      byItemType: {} as Record<string, number>
    };
    
    // Calculate statistics
    if (reviews.length > 0) {
      // Average rating
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      stats.averageRating = totalRating / reviews.length;
      
      // Distribution by rating
      reviews.forEach(review => {
        if (review.rating >= 1 && review.rating <= 5) {
          stats.ratingDistribution[review.rating as keyof typeof stats.ratingDistribution]++;
        }
      });
      
      // Count by item type
      reviews.forEach(review => {
        stats.byItemType[review.item_type] = (stats.byItemType[review.item_type] || 0) + 1;
      });
    }
    
    return stats;
  };
  
  return {
    reviews,
    filteredReviews,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    itemTypeFilter,
    setItemTypeFilter,
    ratingFilter,
    setRatingFilter,
    fetchReviews,
    deleteReview,
    updateReview,
    getReviewStats
  };
};
