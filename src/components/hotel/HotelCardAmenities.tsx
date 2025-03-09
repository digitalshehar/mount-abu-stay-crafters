
import React from "react";
import { Wifi, Coffee, ParkingCircle, Wind, Utensils, Dumbbell, Waves, Snowflake } from "lucide-react";

interface HotelCardAmenitiesProps {
  amenities: string[];
}

const HotelCardAmenities = ({ amenities }: HotelCardAmenitiesProps) => {
  const getAmenityIcon = (amenity: string) => {
    const normalizedAmenity = amenity.toLowerCase();
    
    if (normalizedAmenity.includes('wifi')) return <Wifi className="h-3 w-3" />;
    if (normalizedAmenity.includes('breakfast')) return <Coffee className="h-3 w-3" />;
    if (normalizedAmenity.includes('parking')) return <ParkingCircle className="h-3 w-3" />;
    if (normalizedAmenity.includes('conditioning') || normalizedAmenity.includes('ac')) return <Wind className="h-3 w-3" />;
    if (normalizedAmenity.includes('restaurant')) return <Utensils className="h-3 w-3" />;
    if (normalizedAmenity.includes('gym')) return <Dumbbell className="h-3 w-3" />;
    if (normalizedAmenity.includes('pool') || normalizedAmenity.includes('swimming')) return <Waves className="h-3 w-3" />;
    if (normalizedAmenity.includes('air')) return <Snowflake className="h-3 w-3" />;
    
    // Default icon
    return <div className="h-1 w-1 rounded-full bg-primary" />;
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {amenities.map((amenity, index) => (
          <div 
            key={index} 
            className="flex items-center bg-stone-50 px-2 py-1 rounded text-xs text-stone-700"
          >
            <span className="mr-1">{getAmenityIcon(amenity)}</span>
            {amenity}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelCardAmenities;
