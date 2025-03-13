
import React, { useState } from "react";
import { Room } from "@/components/admin/hotels/types";
import RoomCard from "./rooms/RoomCard";

interface HotelRoomsProps {
  rooms: Room[];
  onBookRoom: (roomType: string) => void;
}

const HotelRooms = ({ rooms, onBookRoom }: HotelRoomsProps) => {
  const [expandedRoom, setExpandedRoom] = useState<string>("");
  const [roomCounts, setRoomCounts] = useState<Record<string, number>>({});

  // Toggle room details expansion
  const toggleRoomDetails = (roomType: string) => {
    setExpandedRoom(expandedRoom === roomType ? "" : roomType);
  };

  // Increase room count
  const increaseRoomCount = (roomType: string) => {
    setRoomCounts(prev => ({
      ...prev,
      [roomType]: (prev[roomType] || 0) + 1
    }));
  };

  // Decrease room count
  const decreaseRoomCount = (roomType: string) => {
    if (roomCounts[roomType] && roomCounts[roomType] > 0) {
      setRoomCounts(prev => ({
        ...prev,
        [roomType]: prev[roomType] - 1
      }));
    }
  };

  // Sort rooms by price (lowest to highest)
  const sortedRooms = [...rooms].sort((a, b) => a.price - b.price);

  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Available Rooms</h2>
      <div className="space-y-4">
        {sortedRooms.length > 0 ? (
          sortedRooms.map((room, index) => (
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
          ))
        ) : (
          <div className="border border-stone-200 rounded-lg p-6 text-center">
            <p className="text-stone-500">No rooms are currently available for this hotel.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelRooms;
