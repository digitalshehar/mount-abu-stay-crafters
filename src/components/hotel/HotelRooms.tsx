
import React, { useState } from "react";
import RoomHeader from "./rooms/RoomHeader";
import RoomCard from "./rooms/RoomCard";

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
  
  // Sort rooms by price (lowest first)
  const sortedRooms = [...rooms].sort((a, b) => a.price - b.price);

  return (
    <div>
      <RoomHeader />
      
      <div className="space-y-4">
        {sortedRooms.map((room: Room, index: number) => (
          <RoomCard
            key={index}
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
    </div>
  );
};

export default HotelRooms;
