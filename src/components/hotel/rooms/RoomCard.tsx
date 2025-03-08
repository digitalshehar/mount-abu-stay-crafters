
import React from "react";
import { Check, Coffee, Wifi, Tv, Utensils, Users, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RoomAmenities from "./RoomAmenities";
import RoomPriceDisplay from "./RoomPriceDisplay";
import RoomCountSelector from "./RoomCountSelector";
import RoomDetailsExpanded from "./RoomDetailsExpanded";

interface RoomCardProps {
  room: {
    type: string;
    capacity: number;
    price: number;
    count?: number;
    images?: string[];
  };
  index: number;
  expandedRoom: string | null;
  roomCounts: Record<string, number>;
  toggleRoomDetails: (roomType: string) => void;
  increaseRoomCount: (roomType: string) => void;
  decreaseRoomCount: (roomType: string) => void;
  onBookRoom?: (roomType: string) => void;
}

const RoomCard = ({
  room,
  index,
  expandedRoom,
  roomCounts,
  toggleRoomDetails,
  increaseRoomCount,
  decreaseRoomCount,
  onBookRoom,
}: RoomCardProps) => {
  return (
    <div className="border border-stone-200 rounded-lg overflow-hidden">
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
          
          <RoomAmenities roomType={room.type} />
          
          <Button 
            variant="link" 
            className="px-0 text-sm h-auto mt-2"
            onClick={() => toggleRoomDetails(room.type)}
          >
            {expandedRoom === room.type ? 'Hide details' : 'Show more details'}
          </Button>
        </div>
        
        <div className="flex flex-col justify-between min-w-[160px] text-right">
          <RoomPriceDisplay price={room.price} />
          
          <div className="mt-3">
            <RoomCountSelector 
              roomType={room.type}
              count={roomCounts[room.type] || 1}
              onIncrease={increaseRoomCount}
              onDecrease={decreaseRoomCount}
            />
            
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
        <RoomDetailsExpanded roomType={room.type} capacity={room.capacity} />
      )}
    </div>
  );
};

export default RoomCard;
