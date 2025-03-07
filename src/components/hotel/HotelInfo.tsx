
import React from "react";
import { Star, MapPin } from "lucide-react";

interface HotelInfoProps {
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  stars: number;
  description: string;
}

const HotelInfo = ({ name, location, rating, reviewCount, stars, description }: HotelInfoProps) => {
  return (
    <div>
      <div className="flex items-center text-white gap-4">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{location}</span>
        </div>
        <div className="flex items-center bg-white/20 px-2 py-1 rounded-lg">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span>{rating}</span>
          <span className="text-sm ml-1">({reviewCount} reviews)</span>
        </div>
        <div className="flex items-center">
          {Array.from({ length: stars }).map((_, idx) => (
            <Star key={idx} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-2xl font-display font-semibold mb-4">About this hotel</h2>
        <p className="text-stone-600 leading-relaxed mb-6">{description}</p>
        <p className="text-stone-600 leading-relaxed">
          Located in the heart of Mount Abu, {name} offers a perfect blend of luxury and comfort. 
          With stunning views of the surrounding Aravalli hills and easy access to major attractions, 
          our hotel is the ideal choice for both leisure and business travelers. We pride ourselves on 
          exceptional service and attention to detail, ensuring a memorable stay for all our guests.
        </p>
      </div>
    </div>
  );
};

export default HotelInfo;
