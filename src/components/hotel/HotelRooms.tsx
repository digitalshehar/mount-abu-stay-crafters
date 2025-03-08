
import React, { useState } from "react";
import { Check, Coffee, Wifi, Tv, Utensils, Users, Maximize, Calendar, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Room {
  type: string;
  capacity: number;
  price: number;
  count?: number;
  images?: string[];
}

interface HotelRoomsProps {
  rooms: Room[];
  onBookRoom?: (roomType: string) => void;
}

const HotelRooms = ({ rooms, onBookRoom }: HotelRoomsProps) => {
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null);
  const [roomCounts, setRoomCounts] = useState<Record<string, number>>(
    rooms.reduce((acc, room) => ({ ...acc, [room.type]: 1 }), {})
  );
  
  // Toggle room details
  const toggleRoomDetails = (roomType: string) => {
    setExpandedRoom(expandedRoom === roomType ? null : roomType);
  };
  
  // Increase room count
  const increaseRoomCount = (roomType: string) => {
    setRoomCounts(prev => ({
      ...prev,
      [roomType]: Math.min((prev[roomType] || 1) + 1, 5)
    }));
  };
  
  // Decrease room count
  const decreaseRoomCount = (roomType: string) => {
    setRoomCounts(prev => ({
      ...prev,
      [roomType]: Math.max((prev[roomType] || 1) - 1, 1)
    }));
  };
  
  // Get room type-specific amenities
  const getRoomAmenities = (roomType: string) => {
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
  
  // Sort rooms by price (lowest first)
  const sortedRooms = [...rooms].sort((a, b) => a.price - b.price);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Available Rooms</h2>
        <div className="flex items-center gap-2 text-sm text-stone-500">
          <Calendar className="h-4 w-4" />
          <span>
            Availability for: <span className="font-medium text-stone-700">Tonight</span>
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedRooms.map((room: Room, index: number) => (
          <div 
            key={index} 
            className="border border-stone-200 rounded-lg overflow-hidden"
          >
            {/* Room Header */}
            <div className="bg-white p-5 flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex-grow">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{room.type}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Best Seller
                    </Badge>
                    {index === 0 && (
                      <Badge className="bg-green-500">Best Value</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-stone-600 mb-3">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Max {room.capacity} guests</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize className="h-4 w-4 mr-1" />
                    <span>{room.type.includes('Suite') ? '48' : room.type.includes('Deluxe') ? '32' : '24'} sqm</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {getRoomAmenities(room.type).slice(0, 4).map((amenity, i) => (
                    <div key={i} className="flex items-center text-xs text-stone-500">
                      {amenity.icon} {amenity.text}
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="link" 
                  className="px-0 text-sm h-auto mt-2"
                  onClick={() => toggleRoomDetails(room.type)}
                >
                  {expandedRoom === room.type ? 'Hide details' : 'Show more details'}
                </Button>
              </div>
              
              <div className="flex flex-col justify-between min-w-[160px] text-right">
                <div>
                  <p className="text-green-600 text-sm font-medium">Limited time offer</p>
                  <div className="my-1">
                    {room.price < 3000 && (
                      <p className="line-through text-stone-400 text-sm">₹{(room.price * 1.2).toFixed(0)}</p>
                    )}
                    <p className="text-xl font-bold">₹{room.price}</p>
                  </div>
                  <p className="text-xs text-stone-500">per night</p>
                </div>
                
                <div className="mt-3">
                  <div className="mb-2 flex items-center justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => decreaseRoomCount(room.type)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-5 text-center">{roomCounts[room.type] || 1}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => increaseRoomCount(room.type)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => onBookRoom && onBookRoom(room.type)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Expanded Room Details */}
            {expandedRoom === room.type && (
              <div className="bg-stone-50 border-t border-stone-200 p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h4 className="font-medium mb-3">Room Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Room Size</p>
                        <p className="text-sm text-stone-600">{room.type.includes('Suite') ? '48' : room.type.includes('Deluxe') ? '32' : '24'} square meters</p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Bed Type</p>
                        <p className="text-sm text-stone-600">
                          {room.type.includes('Suite') || room.type.includes('Deluxe') 
                            ? 'King-size bed' 
                            : 'Queen-size bed'}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">View</p>
                        <p className="text-sm text-stone-600">
                          {room.type.includes('Suite') 
                            ? 'Lake view' 
                            : room.type.includes('Deluxe') 
                              ? 'Mountain view' 
                              : 'Garden view'}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Occupancy</p>
                        <p className="text-sm text-stone-600">Maximum {room.capacity} guests</p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div>
                      <h4 className="font-medium mb-3">Room Amenities</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
                        {getRoomAmenities(room.type).concat([
                          { icon: <Check className="h-3 w-3 mr-1" />, text: 'Air conditioning' },
                          { icon: <Check className="h-3 w-3 mr-1" />, text: 'Private bathroom' },
                          { icon: <Check className="h-3 w-3 mr-1" />, text: 'Safe deposit box' },
                          { icon: <Check className="h-3 w-3 mr-1" />, text: 'Mini fridge' },
                          { icon: <Check className="h-3 w-3 mr-1" />, text: 'Room service' },
                          { icon: <Check className="h-3 w-3 mr-1" />, text: 'Daily housekeeping' },
                        ]).map((amenity, i) => (
                          <div key={i} className="flex items-center text-sm text-stone-600">
                            {amenity.icon} {amenity.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Room Policies</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium">Cancellation Policy</p>
                        <p className="text-stone-600">Free cancellation before 48 hours of check-in. One night charge after that.</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">Payment</p>
                        <p className="text-stone-600">No prepayment needed – pay at the property</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">Meals</p>
                        <p className="text-green-600">Breakfast included in the price</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelRooms;
