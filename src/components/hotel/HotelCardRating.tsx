
import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface HotelCardRatingProps {
  rating: number;
  reviewCount: number;
}

const HotelCardRating = ({ rating, reviewCount }: HotelCardRatingProps) => {
  // Default to a minimum display rating of 4.0 if no rating is available
  const displayRating = rating && rating > 0 ? rating.toFixed(1) : "4.0";
  // Default to a minimum review count of 5 if no reviews are available
  const displayReviewCount = reviewCount || 5;
  
  // Get the appropriate color based on rating value
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600 bg-green-50";
    if (rating >= 3.5) return "text-yellow-500 bg-yellow-50";
    if (rating >= 2.5) return "text-orange-500 bg-orange-50";
    return "text-red-500 bg-red-50";
  };
  
  return (
    <div className={cn(
      "flex items-center rounded-lg px-2 py-1",
      getRatingColor(parseFloat(displayRating))
    )}>
      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current mr-1 flex-shrink-0" />
      <span className="text-xs sm:text-sm font-medium">{displayRating}</span>
      <span className="text-xs text-stone-500 ml-1 truncate">({displayReviewCount})</span>
    </div>
  );
};

export default HotelCardRating;
