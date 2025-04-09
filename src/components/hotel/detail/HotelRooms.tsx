
import React, { useState } from 'react';
import { Room } from '@/components/admin/hotels/types';
import RoomCard from '@/components/hotel/rooms/RoomCard';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface HotelRoomsProps {
  rooms: Room[];
  onBookRoom: (roomType: string) => void;
}

const HotelRooms: React.FC<HotelRoomsProps> = ({ rooms = [], onBookRoom }) => {
  const [expandedRoom, setExpandedRoom] = useState<string>('');
  const [roomCounts, setRoomCounts] = useState<Record<string, number>>({});
  const [showAllRooms, setShowAllRooms] = useState(rooms.length <= 3);

  // Toggle room details visibility
  const toggleRoomDetails = (roomType: string) => {
    setExpandedRoom(expandedRoom === roomType ? '' : roomType);
  };

  // Increase room count for booking
  const increaseRoomCount = (roomType: string) => {
    setRoomCounts(prev => ({
      ...prev,
      [roomType]: (prev[roomType] || 0) + 1
    }));
  };

  // Decrease room count for booking
  const decreaseRoomCount = (roomType: string) => {
    setRoomCounts(prev => ({
      ...prev,
      [roomType]: Math.max(0, (prev[roomType] || 0) - 1)
    }));
  };

  // If no rooms are provided, show a message
  if (!rooms || rooms.length === 0) {
    return (
      <div className="bg-slate-50 p-6 rounded-lg text-center">
        <p className="text-slate-600">No rooms available at the moment. Please check back later.</p>
      </div>
    );
  }

  // Default rooms with count property if they don't have it
  const enhancedRooms = rooms.map(room => ({
    ...room,
    count: room.count || 5
  }));

  // Display rooms, limited by showAllRooms state
  const displayedRooms = showAllRooms ? enhancedRooms : enhancedRooms.slice(0, 3);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-display font-semibold">Available Rooms</h2>
        <p className="text-stone-600 mt-1">
          Select from our range of comfortable accommodations
        </p>
      </div>

      <div className="space-y-4">
        {displayedRooms.map((room, index) => (
          <RoomCard
            key={`${room.type}-${index}`}
            room={room}
            index={index}
            expandedRoom={expandedRoom}
            roomCounts={roomCounts}
            toggleRoomDetails={toggleRoomDetails}
            increaseRoomCount={increaseRoomCount}
            decreaseRoomCount={decreaseRoomCount}
            onBookRoom={onBookRoom}
          />
        ))}
      </div>

      {rooms.length > 3 && (
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAllRooms(!showAllRooms)}
            className="flex items-center gap-2"
          >
            {showAllRooms ? (
              <>
                <ChevronUp className="h-4 w-4" />
                <span>Show fewer rooms</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                <span>Show all {rooms.length} rooms</span>
              </>
            )}
          </Button>
        </div>
      )}
      
      <Separator className="my-8" />

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-md">
        <h3 className="font-medium text-blue-800 mb-2">Room Booking Information</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Free cancellation up to 24 hours before check-in</li>
          <li>• Room rates include applicable taxes and fees</li>
          <li>• Special requests are subject to availability upon arrival</li>
          <li>• Photo ID and credit card required at check-in</li>
        </ul>
      </div>
    </div>
  );
};

export default HotelRooms;
