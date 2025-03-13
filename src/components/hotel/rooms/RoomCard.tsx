
import React from "react";
import { ChevronDown, ChevronUp, Wifi, Coffee, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Room } from "@/components/admin/hotels/types";

// Room Price Display Component
interface RoomPriceDisplayProps {
  price: number;
  roomCount: number;
}

const RoomPriceDisplay: React.FC<RoomPriceDisplayProps> = ({ price, roomCount }) => {
  const totalPrice = price * roomCount;
  
  return (
    <div className="text-right">
      <div className="text-2xl font-bold text-primary">
        ₹{totalPrice.toLocaleString()}
      </div>
      <div className="text-sm text-stone-500">
        ₹{price.toLocaleString()} × {roomCount} {roomCount === 1 ? 'room' : 'rooms'}
      </div>
    </div>
  );
};

// Room Count Selector Component
interface RoomCountSelectorProps {
  roomCount: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const RoomCountSelector: React.FC<RoomCountSelectorProps> = ({ 
  roomCount,
  onDecrease,
  onIncrease
}) => {
  return (
    <div className="flex items-center border rounded-lg overflow-hidden">
      <button
        className="p-2 bg-stone-50 hover:bg-stone-100 transition-colors disabled:opacity-50"
        onClick={onDecrease}
        disabled={roomCount <= 0}
      >
        <ChevronDown className="h-4 w-4" />
      </button>
      <div className="px-4 py-1 font-medium">
        {roomCount}
      </div>
      <button
        className="p-2 bg-stone-50 hover:bg-stone-100 transition-colors"
        onClick={onIncrease}
      >
        <ChevronUp className="h-4 w-4" />
      </button>
    </div>
  );
};

// Room Details Expanded Component
interface RoomDetailsExpandedProps {
  room: Room;
  roomType: string;
  amenities: string[];
  description: string;
}

const RoomDetailsExpanded: React.FC<RoomDetailsExpandedProps> = ({ 
  room,
  roomType,
  amenities,
  description
}) => {
  return (
    <div className="mt-4 pt-4 border-t border-stone-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Room Details</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-stone-400" />
              <span>Max Occupancy: {room.capacity} {room.capacity === 1 ? 'guest' : 'guests'}</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-stone-400" />
              <span>Room Type: {roomType}</span>
            </li>
          </ul>
          
          <h4 className="font-medium mt-4 mb-2">Room Description</h4>
          <p className="text-sm text-stone-600">{description}</p>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Amenities</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {amenities.map((amenity, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <span>{amenity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Main Room Card Component
export interface RoomCardProps {
  room: Room;
  index: number;
  expandedRoom: string;
  roomCounts: Record<string, number>;
  toggleRoomDetails: (roomType: string) => void;
  increaseRoomCount: (roomType: string) => void;
  decreaseRoomCount: (roomType: string) => void;
  onBookRoom: (roomType: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  index,
  expandedRoom,
  roomCounts,
  toggleRoomDetails,
  increaseRoomCount,
  decreaseRoomCount,
  onBookRoom
}) => {
  const isExpanded = expandedRoom === room.type;
  const roomCount = roomCounts[room.type] || 0;
  
  // Sample amenities and description for room types
  const getRoomAmenities = (roomType: string) => {
    const baseAmenities = ["Free Wi-Fi", "AC", "TV", "Private Bathroom"];
    
    switch (roomType.toLowerCase()) {
      case "deluxe":
        return [...baseAmenities, "Mini Bar", "Coffee Maker", "Premium View", "Bathtub"];
      case "standard":
        return [...baseAmenities, "Coffee Maker"];
      case "suite":
        return [...baseAmenities, "Mini Bar", "Coffee Maker", "Lounge Area", "Bathtub", "Premium View", "Dining Area"];
      default:
        return baseAmenities;
    }
  };
  
  const getRoomDescription = (roomType: string) => {
    switch (roomType.toLowerCase()) {
      case "deluxe":
        return "Spacious deluxe room with modern amenities, premium mountain views, and elegant decor for a comfortable stay.";
      case "standard":
        return "Comfortable standard room with all the essential amenities for a pleasant and relaxed stay.";
      case "suite":
        return "Luxurious suite featuring a separate lounge area, premium furnishings, and panoramic views of Mount Abu's scenic landscape.";
      default:
        return "Comfortable room with all necessary amenities for a pleasant stay.";
    }
  };
  
  return (
    <div 
      className={`p-4 border ${isExpanded ? 'border-primary/30 bg-primary/5' : 'border-stone-200'} rounded-lg transition-colors`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{room.type} Room</h3>
          <div className="text-sm text-stone-500 flex items-center gap-2 mt-1">
            <Users className="h-4 w-4" />
            <span>Up to {room.capacity} {room.capacity === 1 ? 'guest' : 'guests'}</span>
          </div>
        </div>
        
        <RoomPriceDisplay price={room.price} roomCount={roomCount} />
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleRoomDetails(room.type)}
          className="text-xs"
        >
          {isExpanded ? 'Hide Details' : 'Show Details'}
          <ChevronDown className={`ml-2 h-4 w-4 ${isExpanded ? 'rotate-180' : ''} transition-transform`} />
        </Button>
        
        <div className="flex items-center gap-4">
          <RoomCountSelector 
            roomCount={roomCount}
            onDecrease={() => decreaseRoomCount(room.type)}
            onIncrease={() => increaseRoomCount(room.type)}
          />
          
          <Button
            variant="default"
            size="sm"
            onClick={() => onBookRoom(room.type)}
            disabled={roomCount === 0}
            className="whitespace-nowrap"
          >
            Book Now
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <RoomDetailsExpanded 
          room={room}
          roomType={room.type}
          amenities={getRoomAmenities(room.type)}
          description={getRoomDescription(room.type)}
        />
      )}
    </div>
  );
};

export default RoomCard;
