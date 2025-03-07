
import React from "react";
import { Star } from "lucide-react";

interface HotelCardRatingProps {
  rating: number;
  reviewCount: number;
}

const HotelCardRating = ({ rating, reviewCount }: HotelCardRatingProps) => {
  return (
    <div className="flex items-center bg-primary/5 rounded-lg px-2 py-1">
      <Star className="h-4 w-4 text-yellow-500 mr-1" />
      <span className="text-sm font-medium">{rating}</span>
      <span className="text-xs text-stone-500 ml-1">({reviewCount})</span>
    </div>
  );
};

export default HotelCardRating;
