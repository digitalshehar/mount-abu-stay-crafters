
import React from 'react';
import { ChevronDown, ChevronUp, Check, Users, Plus, Minus } from 'lucide-react';
import { Room } from '@/components/admin/hotels/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  
  // Default features that are often available in rooms
  const defaultFeatures = [
    'Air conditioning',
    'Free WiFi',
    'Private bathroom',
    'Flat-screen TV',
    'Daily housekeeping'
  ];

  return (
    <div className={cn(
      "border border-stone-200 rounded-lg bg-white overflow-hidden transition-all",
      isExpanded && "shadow-md"
    )}>
      {/* Room header section */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-grow">
          <div className="flex items-start gap-2">
            <h3 className="text-lg font-medium">{room.type}</h3>
            {index === 0 && <Badge className="bg-green-600">Best Deal</Badge>}
          </div>
          
          <div className="flex items-center text-sm text-stone-600 mt-1">
            <Users className="h-4 w-4 mr-1" />
            <span>Max {room.capacity} {room.capacity === 1 ? 'person' : 'people'}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-lg font-bold text-green-700">₹{room.price.toLocaleString()}</div>
          <div className="text-xs text-stone-500">per night</div>
        </div>
      </div>
      
      {/* Expandable section with details */}
      <div 
        className={cn(
          "grid grid-rows-[0fr] transition-all duration-300",
          isExpanded && "grid-rows-[1fr] border-t border-stone-200"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room images */}
            <div>
              <h4 className="font-medium mb-2">Room Photos</h4>
              <div className="aspect-[4/3] rounded-md overflow-hidden bg-stone-100">
                {room.images && room.images.length > 0 ? (
                  <img 
                    src={room.images[0]} 
                    alt={room.type} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400">
                    No image available
                  </div>
                )}
              </div>
            </div>
            
            {/* Room features */}
            <div>
              <h4 className="font-medium mb-2">Room Features</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
                {defaultFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Room selection */}
              <div className="mt-6">
                <h4 className="font-medium mb-2">Select Rooms</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => decreaseRoomCount(room.type)}
                      disabled={roomCount === 0}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-3 min-w-8 text-center">{roomCount}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => increaseRoomCount(room.type)}
                      disabled={roomCount >= room.count}
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Badge variant="outline" className="text-stone-500">
                    {room.count} rooms available
                  </Badge>
                </div>
                
                <Button
                  className="w-full mt-4" 
                  disabled={roomCount === 0}
                  onClick={() => onBookRoom(room.type)}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toggle button */}
      <button
        className="w-full p-2 flex items-center justify-center text-sm text-stone-600 hover:bg-stone-50 border-t border-stone-200"
        onClick={() => toggleRoomDetails(room.type)}
      >
        <span>{isExpanded ? 'Hide details' : 'Show details'}</span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 ml-1" />
        ) : (
          <ChevronDown className="h-4 w-4 ml-1" />
        )}
      </button>
    </div>
  );
};

export default RoomCard;
