
import React from "react";
import { Check, Coffee, Wifi, Tv, Utensils, Maximize } from "lucide-react";

interface RoomAmenitiesProps {
  roomType: string;
  limit?: number;
}

const RoomAmenities = ({ roomType, limit = 4 }: RoomAmenitiesProps) => {
  const amenities = getRoomAmenities(roomType);
  
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {amenities.slice(0, limit).map((amenity, i) => (
        <div key={i} className="flex items-center text-xs text-stone-500">
          {amenity.icon} {amenity.text}
        </div>
      ))}
    </div>
  );
};

// Helper function to get room type-specific amenities
export const getRoomAmenities = (roomType: string) => {
  const baseAmenities = [
    { icon: <Wifi className="h-3 w-3 mr-1" />, text: 'Free Wi-Fi' },
    { icon: <Tv className="h-3 w-3 mr-1" />, text: 'Flat-screen TV' }
  ];
  
  if (roomType.toLowerCase().includes('standard')) {
    return [
      ...baseAmenities,
      { icon: <Check className="h-3 w-3 mr-1" />, text: 'Queen sized bed' },
      { icon: <Check className="h-3 w-3 mr-1" />, text: 'Garden view' },
      { icon: <Maximize className="h-3 w-3 mr-1" />, text: '24 sqm' },
    ];
  } else if (roomType.toLowerCase().includes('deluxe')) {
    return [
      ...baseAmenities,
      { icon: <Check className="h-3 w-3 mr-1" />, text: 'King sized bed' },
      { icon: <Check className="h-3 w-3 mr-1" />, text: 'Mountain view' },
      { icon: <Coffee className="h-3 w-3 mr-1" />, text: 'Coffee machine' },
      { icon: <Maximize className="h-3 w-3 mr-1" />, text: '32 sqm' },
    ];
  } else if (roomType.toLowerCase().includes('suite')) {
    return [
      ...baseAmenities,
      { icon: <Check className="h-3 w-3 mr-1" />, text: 'King sized bed' },
      { icon: <Check className="h-3 w-3 mr-1" />, text: 'Ocean view' },
      { icon: <Coffee className="h-3 w-3 mr-1" />, text: 'Coffee machine' },
      { icon: <Utensils className="h-3 w-3 mr-1" />, text: 'Kitchenette' },
      { icon: <Maximize className="h-3 w-3 mr-1" />, text: '48 sqm' },
    ];
  } else {
    return [
      ...baseAmenities,
      { icon: <Check className="h-3 w-3 mr-1" />, text: 'Premium amenities' },
      { icon: <Check className="h-3 w-3 mr-1" />, text: 'Scenic view' },
      { icon: <Maximize className="h-3 w-3 mr-1" />, text: '28 sqm' },
    ];
  }
};

export default RoomAmenities;
