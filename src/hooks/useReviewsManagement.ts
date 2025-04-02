
import { useState, useEffect } from 'react';
import { useReviewsData } from '@/hooks/useReviewsData';
import { useReviewsFilters } from '@/hooks/useReviewsFilters';
import { useReviewsActions } from '@/hooks/useReviewsActions';

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
  const { reviews, loading, error, fetchReviews } = useReviewsData();
  const { 
    filteredReviews, 
    searchQuery, 
    setSearchQuery, 
    itemTypeFilter, 
    setItemTypeFilter, 
    ratingFilter, 
    setRatingFilter 
  } = useReviewsFilters(reviews);
  
  const { deleteReview, updateReview } = useReviewsActions();
  
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
