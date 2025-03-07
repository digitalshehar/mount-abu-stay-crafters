
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
        return <Wifi className="h-3 w-3 sm:h-4 sm:w-4" />;
      case "breakfast":
        return <Coffee className="h-3 w-3 sm:h-4 sm:w-4" />;
      case "tv":
        return <Tv className="h-3 w-3 sm:h-4 sm:w-4" />;
      case "bathroom":
        return <Bath className="h-3 w-3 sm:h-4 sm:w-4" />;
      default:
        return null;
    }
  };

  // On mobile, show only the first 3 amenities
  const displayAmenities = window.innerWidth < 640 ? amenities.slice(0, 3) : amenities;

  return (
    <div className="flex flex-wrap items-center gap-2 sm:space-x-3 mb-3 sm:mb-5">
      {displayAmenities.map((amenity, index) => (
        <div
          key={index}
          className="flex items-center text-stone-600 bg-stone-50 rounded-full px-2 sm:px-3 py-1 text-xs"
        >
          {renderAmenityIcon(amenity)}
          <span className="ml-1 text-xs">{amenity}</span>
        </div>
      ))}
    </div>
  );
};

export default HotelCardAmenities;
