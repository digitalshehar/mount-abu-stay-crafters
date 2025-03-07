
import React from "react";
import { Check } from "lucide-react";
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
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Available Rooms</h2>
      <div className="space-y-4">
        {rooms.map((room: Room, index: number) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">{room.type}</h3>
              <p className="text-stone-500">Max {room.capacity} guests</p>
              <ul className="mt-2 text-sm text-stone-600">
                <li className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500" /> {room.type === 'Deluxe' ? 'King sized bed' : 'Queen sized bed'}</li>
                <li className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500" /> {room.type === 'Deluxe' ? 'Mountain view' : 'Garden view'}</li>
                <li className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500" /> {room.type === 'Deluxe' ? 'Premium amenities' : 'Standard amenities'}</li>
              </ul>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">₹{room.price}<span className="text-sm font-normal">/night</span></div>
              <div className="text-xs text-green-600 mb-2">Breakfast included</div>
              <Button size="sm" variant="outline" className="text-xs">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelRooms;
