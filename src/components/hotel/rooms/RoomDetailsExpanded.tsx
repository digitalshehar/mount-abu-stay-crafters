
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import RoomAvailabilityCalendar from './RoomAvailabilityCalendar';

interface RoomDetailsExpandedProps {
  room: {
    type: string;
    capacity: number;
    price: number;
    count?: number;
    images?: string[];
  };
  onBookRoom?: (roomType: string) => void;
}

const RoomDetailsExpanded: React.FC<RoomDetailsExpandedProps> = ({ room, onBookRoom }) => {
  const roomAmenities = [
    { name: 'Air Conditioning', included: true },
    { name: 'Free WiFi', included: true },
    { name: 'TV', included: true },
    { name: 'Room Service', included: true },
    { name: 'Minibar', included: room.type === 'Deluxe Room' || room.type === 'Suite' },
    { name: 'Coffee Machine', included: room.type === 'Deluxe Room' || room.type === 'Suite' },
    { name: 'Balcony', included: room.type === 'Suite' },
    { name: 'Bathtub', included: room.type === 'Suite' }
  ];

  return (
    <div className="pt-4 pb-3 px-4 bg-stone-50 rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="font-medium text-lg mb-3">Room Details</h4>
          <div className="space-y-4">
            <div>
              <h5 className="text-sm font-medium mb-2">Description</h5>
              <p className="text-sm text-stone-600">
                {room.type === 'Suite' 
                  ? 'Spacious and elegant suite with separate living room, premium amenities, and stunning views.'
                  : room.type === 'Deluxe Room'
                    ? 'Comfortable deluxe room with modern furnishings, extra space, and upgraded amenities.'
                    : 'Cozy standard room with all essential amenities for a comfortable stay.'}
              </p>
            </div>
            
            <div>
              <h5 className="text-sm font-medium mb-2">Amenities</h5>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {roomAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-sm">
                    {amenity.included ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <X className="h-4 w-4 text-stone-300 mr-2" />
                    )}
                    <span className={amenity.included ? "text-stone-700" : "text-stone-400"}>
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium mb-2">Additional Information</h5>
              <ul className="text-sm text-stone-600 space-y-1">
                <li>• Room size: {room.type === 'Suite' ? '55-65' : room.type === 'Deluxe Room' ? '35-40' : '25-30'} sq m</li>
                <li>• Max occupancy: {room.capacity} {room.capacity > 1 ? 'persons' : 'person'}</li>
                <li>• Bed type: {room.type === 'Suite' ? 'King' : room.type === 'Deluxe Room' ? 'Queen' : 'Twin/Double'}</li>
                <li>• Check-in: 2:00 PM, Check-out: 12:00 PM</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <Button 
            onClick={() => onBookRoom && onBookRoom(room.type)}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Book this room
          </Button>
        </div>
        
        <div>
          <RoomAvailabilityCalendar roomType={room.type} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsExpanded;
