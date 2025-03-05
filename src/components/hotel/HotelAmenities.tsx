
import React from "react";
import { Check, Wifi, Coffee, Utensils, Waves, DumbbellIcon } from "lucide-react";

interface HotelAmenitiesProps {
  amenities: string[];
}

const HotelAmenities: React.FC<HotelAmenitiesProps> = ({ amenities }) => {
  // Helper function to render amenity icon
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-5 w-5 text-primary" />;
      case "breakfast":
      case "24/7 room service":
        return <Coffee className="h-5 w-5 text-primary" />;
      case "restaurant":
        return <Utensils className="h-5 w-5 text-primary" />;
      case "swimming pool":
        return <Waves className="h-5 w-5 text-primary" />;
      case "gym":
        return <DumbbellIcon className="h-5 w-5 text-primary" />;
      default:
        return <Check className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="p-6 bg-stone-50 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Amenities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2">
            {getAmenityIcon(amenity)}
            <span className="text-stone-700">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelAmenities;
