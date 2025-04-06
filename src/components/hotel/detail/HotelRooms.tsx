
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BedDouble, Users } from 'lucide-react';

interface Room {
  type: string;
  price: number;
  capacity: number;
}

interface HotelRoomsProps {
  rooms: Room[];
  onBookRoom: (room: Room) => void;
}

const HotelRooms: React.FC<HotelRoomsProps> = ({ rooms, onBookRoom }) => {
  // Placeholder features for each room type
  const getRoomFeatures = (type: string): string[] => {
    const commonFeatures = ['Free WiFi', 'Air Conditioning', 'Flat-screen TV'];
    
    switch (type.toLowerCase()) {
      case 'deluxe':
        return [...commonFeatures, 'Mini Bar', 'Premium Toiletries', 'City View'];
      case 'suite':
        return [...commonFeatures, 'Living Area', 'Jacuzzi Bath', 'Panoramic View', '24h Room Service'];
      case 'executive':
        return [...commonFeatures, 'Work Desk', 'Espresso Machine', 'Welcome Drinks'];
      default:
        return [...commonFeatures, 'Daily Housekeeping', 'Tea/Coffee Maker'];
    }
  };

  // If no rooms are provided, show a message
  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-md">
        <h3 className="text-lg font-medium text-gray-500">No rooms available at the moment</h3>
        <p className="mt-2 text-sm text-gray-400">Please check back later or contact the hotel directly.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {rooms.map((room, index) => (
        <div 
          key={index} 
          className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 md:col-span-2">
              <h3 className="text-xl font-semibold mb-2">{room.type} Room</h3>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Users className="h-4 w-4 mr-1" />
                <span>Up to {room.capacity} {room.capacity > 1 ? 'guests' : 'guest'}</span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <BedDouble className="h-4 w-4 mr-1" />
                <span>{room.capacity > 1 ? 'Large Bed' : 'Single Bed'}</span>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Room Amenities:</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {getRoomFeatures(room.type).map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 flex flex-col justify-between">
              <div>
                <div className="text-gray-500 text-sm mb-1">Price per night</div>
                <div className="text-2xl font-bold text-primary">₹{room.price.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mb-4">+Taxes & Fees</div>
              </div>
              
              <Button 
                onClick={() => onBookRoom(room)} 
                className="w-full"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelRooms;
