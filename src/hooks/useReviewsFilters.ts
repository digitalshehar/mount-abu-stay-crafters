
import { useState, useEffect } from 'react';
import { Review } from './useReviewsManagement';

export const useReviewsFilters = (reviews: Review[]) => {
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemTypeFilter, setItemTypeFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  
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
  
  return { 
    filteredReviews, 
    searchQuery, 
    setSearchQuery, 
    itemTypeFilter, 
    setItemTypeFilter, 
    ratingFilter, 
    setRatingFilter 
  };
};
