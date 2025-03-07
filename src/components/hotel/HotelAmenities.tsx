
import React from "react";
import { Wifi, Coffee, Tv, Bath, Utensils, Dumbbell, Snowflake, Car } from "lucide-react";

interface HotelAmenitiesProps {
  amenities: string[];
}

const HotelAmenities = ({ amenities }: HotelAmenitiesProps) => {
  const renderAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "breakfast":
        return <Coffee className="h-4 w-4" />;
      case "tv":
        return <Tv className="h-4 w-4" />;
      case "bathroom":
        return <Bath className="h-4 w-4" />;
      case "restaurant":
        return <Utensils className="h-4 w-4" />;
      case "gym":
        return <Dumbbell className="h-4 w-4" />;
      case "air conditioning":
        return <Snowflake className="h-4 w-4" />;
      case "parking":
        return <Car className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
        {amenities.map((amenity: string, index: number) => (
          <div key={index} className="flex items-center space-x-2 text-stone-600">
            {renderAmenityIcon(amenity)}
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelAmenities;
