
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, Coffee, Tv, Bath, Wind, Utensils } from 'lucide-react';

export interface RoomDetailsExpandedProps {
  roomType: string;
  capacity: number;
  description?: string;
  amenities?: string[];
  price?: number;
  onSelect?: () => void;
}

const RoomDetailsExpanded: React.FC<RoomDetailsExpandedProps> = ({
  roomType,
  capacity,
  description = "Spacious and comfortable room with modern amenities.",
  amenities = ["Free WiFi", "TV", "Air conditioning", "Private bathroom", "Breakfast included"],
  price = 5000,
  onSelect
}) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-1">{roomType}</h3>
      <p className="text-sm text-gray-600 mb-3">Accommodates up to {capacity} {capacity === 1 ? 'person' : 'people'}</p>
      
      <p className="text-sm mb-4">{description}</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Room Amenities</h4>
        <div className="grid grid-cols-2 gap-2">
          {amenities.includes('Free WiFi') && (
            <div className="flex items-center text-sm">
              <Wifi className="h-4 w-4 mr-2 text-gray-500" />
              <span>Free WiFi</span>
            </div>
          )}
          {amenities.includes('Breakfast included') && (
            <div className="flex items-center text-sm">
              <Coffee className="h-4 w-4 mr-2 text-gray-500" />
              <span>Breakfast</span>
            </div>
          )}
          {amenities.includes('TV') && (
            <div className="flex items-center text-sm">
              <Tv className="h-4 w-4 mr-2 text-gray-500" />
              <span>Flat-screen TV</span>
            </div>
          )}
          {amenities.includes('Private bathroom') && (
            <div className="flex items-center text-sm">
              <Bath className="h-4 w-4 mr-2 text-gray-500" />
              <span>Private bathroom</span>
            </div>
          )}
          {amenities.includes('Air conditioning') && (
            <div className="flex items-center text-sm">
              <Wind className="h-4 w-4 mr-2 text-gray-500" />
              <span>Air conditioning</span>
            </div>
          )}
          {amenities.includes('Room service') && (
            <div className="flex items-center text-sm">
              <Utensils className="h-4 w-4 mr-2 text-gray-500" />
              <span>Room service</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <span className="text-lg font-bold">₹{price}</span>
          <span className="text-sm text-gray-600 ml-1">per night</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Sample badges for room status */}
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Available
          </Badge>
          
          <Button size="sm" onClick={onSelect}>
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsExpanded;
