
import React from "react";
import { Star, MapPin } from "lucide-react";

interface HotelDetailHeaderProps {
  name: string;
  location: string;
  stars: number;
  rating: number;
  reviewCount: number;
}

const HotelDetailHeader: React.FC<HotelDetailHeaderProps> = ({
  name,
  location,
  stars,
  rating,
  reviewCount,
}) => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl md:text-4xl font-display font-bold">{name}</h1>
      
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center text-stone-600">
          <MapPin className="h-4 w-4 mr-1 text-primary" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < stars ? "text-yellow-500" : "text-stone-300"
              }`}
              fill={i < stars ? "currentColor" : "none"}
            />
          ))}
        </div>
        
        {rating > 0 && (
          <div className="flex items-center bg-primary/5 rounded-lg px-2 py-1">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="text-xs text-stone-500 ml-1">
              ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetailHeader;
