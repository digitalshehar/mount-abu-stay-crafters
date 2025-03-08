
import React from "react";
import { Award, Star } from "lucide-react";

interface HotelCategoryProps {
  stars: number;
  location: string;
}

const HotelCategory = ({ stars, location }: HotelCategoryProps) => {
  return (
    <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
      <div className="flex items-center mb-3">
        <Award className="h-5 w-5 text-amber-500 mr-2" />
        <h3 className="font-medium">Hotel Category</h3>
      </div>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star 
            key={idx} 
            className={`w-5 h-5 ${idx < stars ? "text-amber-500 fill-amber-500" : "text-stone-300"}`} 
          />
        ))}
      </div>
      <p className="text-sm text-stone-500 mt-2">{stars}-star hotel in {location}</p>
    </div>
  );
};

export default HotelCategory;
