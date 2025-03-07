
import React from "react";
import { Wifi, Coffee, Tv, Bath } from "lucide-react";

interface HotelCardAmenitiesProps {
  amenities: string[];
}

const HotelCardAmenities = ({ amenities }: HotelCardAmenitiesProps) => {
  // Function to render amenity icon
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
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center space-x-3 mb-5">
      {amenities.map((amenity, index) => (
        <div
          key={index}
          className="flex items-center text-stone-600 bg-stone-50 rounded-full px-3 py-1 text-xs"
        >
          {renderAmenityIcon(amenity)}
          <span className="ml-1">{amenity}</span>
        </div>
      ))}
    </div>
  );
};

export default HotelCardAmenities;
