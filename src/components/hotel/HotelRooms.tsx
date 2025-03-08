
import React from "react";
import { Check, Coffee, Wifi, Tv, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Room {
  type: string;
  capacity: number;
  price: number;
}

interface HotelRoomsProps {
  rooms: Room[];
}

const HotelRooms = ({ rooms }: HotelRoomsProps) => {
  // Get room type-specific amenities
  const getRoomAmenities = (roomType: string) => {
    const baseAmenities = [
      { icon: <Wifi className="h-3 w-3 mr-1" />, text: 'Free Wi-Fi' },
      { icon: <Tv className="h-3 w-3 mr-1" />, text: 'Flat-screen TV' }
    ];
    
    if (roomType === 'Standard') {
      return [
        ...baseAmenities,
        { icon: <Check className="h-3 w-3 mr-1" />, text: 'Queen sized bed' },
        { icon: <Check className="h-3 w-3 mr-1" />, text: 'Garden view' },
      ];
    } else if (roomType === 'Deluxe') {
      return [
        ...baseAmenities,
        { icon: <Check className="h-3 w-3 mr-1" />, text: 'King sized bed' },
        { icon: <Check className="h-3 w-3 mr-1" />, text: 'Mountain view' },
        { icon: <Coffee className="h-3 w-3 mr-1" />, text: 'Coffee machine' },
      ];
    } else if (roomType === 'Suite') {
      return [
        ...baseAmenities,
        { icon: <Check className="h-3 w-3 mr-1" />, text: 'King sized bed' },
        { icon: <Check className="h-3 w-3 mr-1" />, text: 'Ocean view' },
        { icon: <Coffee className="h-3 w-3 mr-1" />, text: 'Coffee machine' },
        { icon: <Utensils className="h-3 w-3 mr-1" />, text: 'Kitchenette' },
      ];
    } else {
      return [
        ...baseAmenities,
        { icon: <Check className="h-3 w-3 mr-1" />, text: 'Premium amenities' },
        { icon: <Check className="h-3 w-3 mr-1" />, text: 'Scenic view' },
      ];
    }
  };
  
  // Get background color based on room type
  const getRoomBackground = (roomType: string) => {
    if (roomType === 'Standard') return 'bg-white';
    if (roomType === 'Deluxe') return 'bg-white';
    if (roomType === 'Suite') return 'bg-stone-50';
    if (roomType === 'Family') return 'bg-stone-50';
    return 'bg-white';
  };

  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Available Rooms</h2>
      <div className="space-y-6">
        {rooms.map((room: Room, index: number) => (
          <div 
            key={index} 
            className={`${getRoomBackground(room.type)} p-6 rounded-lg shadow-md border border-stone-100 flex flex-col md:flex-row justify-between transition-all hover:shadow-lg`}
          >
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-lg">{room.type}</h3>
              <p className="text-stone-500">Max {room.capacity} guests</p>
              <ul className="mt-3 text-sm text-stone-600 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                {getRoomAmenities(room.type).map((amenity, i) => (
                  <li key={i} className="flex items-center text-stone-600">
                    {amenity.icon} {amenity.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-right flex flex-col items-end justify-between">
              <div>
                <div className="text-lg font-semibold">₹{room.price}<span className="text-sm font-normal">/night</span></div>
                <div className="text-xs text-green-600 mb-2">Breakfast included</div>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelRooms;
