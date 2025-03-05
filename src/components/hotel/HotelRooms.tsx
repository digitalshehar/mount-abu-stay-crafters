
import React from "react";
import { Users, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Room {
  type: string;
  capacity: number;
  price: number;
  count: number;
}

interface HotelRoomsProps {
  rooms: Room[];
  onSelectRoom?: (room: Room) => void;
}

const HotelRooms: React.FC<HotelRoomsProps> = ({ rooms, onSelectRoom }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Available Rooms</h3>
      <div className="space-y-4">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="p-5 border border-stone-200 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h4 className="font-semibold text-lg">{room.type}</h4>
              <div className="flex items-center text-stone-600 mt-1">
                <Users className="h-4 w-4 mr-1" />
                <span>Up to {room.capacity} guests</span>
              </div>
              {room.count > 0 && (
                <p className="text-sm text-primary mt-1">
                  {room.count} rooms available
                </p>
              )}
            </div>

            <div className="md:text-right mt-2 md:mt-0">
              <div className="text-lg font-semibold">₹{room.price}</div>
              <div className="text-sm text-stone-500">per night</div>
              {onSelectRoom && (
                <Button
                  className="mt-2 md:mt-3 gap-1"
                  onClick={() => onSelectRoom(room)}
                >
                  Select <ChevronsRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}

        {rooms.length === 0 && (
          <div className="p-5 text-center text-stone-500 border border-dashed border-stone-200 rounded-lg">
            No rooms are currently available for this hotel.
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelRooms;
