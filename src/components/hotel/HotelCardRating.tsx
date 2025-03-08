
import React from "react";
import { Star } from "lucide-react";

interface HotelCardRatingProps {
  rating: number;
  reviewCount: number;
}

const HotelCardRating = ({ rating, reviewCount }: HotelCardRatingProps) => {
  // Default to a minimum display rating of 4.0 if no rating is available
  const displayRating = rating && rating > 0 ? rating.toFixed(1) : "4.0";
  // Default to a minimum review count of 5 if no reviews are available
  const displayReviewCount = reviewCount || 5;
  
  return (
    <div className="flex items-center bg-primary/5 rounded-lg px-2 py-1">
      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-yellow-500 mr-1 flex-shrink-0" />
      <span className="text-xs sm:text-sm font-medium">{displayRating}</span>
      <span className="text-xs text-stone-500 ml-1 truncate">({displayReviewCount})</span>
    </div>
  );
};

export default HotelCardRating;
