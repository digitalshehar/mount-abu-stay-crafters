
import React from 'react';
import { HotelCard } from '@/components/HotelCard';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Hotel {
  id: number;
  name: string;
  location: string;
  image: string;
  price_per_night: number;
  rating?: number;
  stars: number;
  [key: string]: any;
}

interface MapSidebarProps {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  onSelectHotel: (hotel: Hotel) => void;
}

const MapSidebar = ({ hotels, selectedHotel, onSelectHotel }: MapSidebarProps) => {
  return (
    <div className="w-full lg:w-96 bg-white border-l border-gray-200 h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">
          {hotels.length} {hotels.length === 1 ? 'Hotel' : 'Hotels'} in Mount Abu
        </h2>
      </div>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-4 space-y-4">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className={`cursor-pointer transition-all ${
                selectedHotel?.id === hotel.id ? 'ring-2 ring-primary rounded-lg' : ''
              }`}
              onClick={() => onSelectHotel(hotel)}
            >
              <HotelCard
                hotel={hotel}
                variant="compact"
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MapSidebar;
