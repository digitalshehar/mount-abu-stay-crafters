
import React from 'react';
import HotelCard from '@/components/HotelCard';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MapSidebarProps {
  hotels: any[];
  selectedHotel: any | null;
  onSelectHotel: (hotel: any) => void;
}

const MapSidebar: React.FC<MapSidebarProps> = ({ hotels, selectedHotel, onSelectHotel }) => {
  return (
    <div className="w-full lg:w-96 bg-white border-l border-gray-200 h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">
          {hotels.length} {hotels.length === 1 ? 'Hotel' : 'Hotels'} in Mount Abu
        </h2>
      </div>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-4 space-y-4">
          {hotels.map(hotel => (
            <div 
              key={hotel.id}
              className={`cursor-pointer transition-all ${
                selectedHotel?.id === hotel.id ? 'ring-2 ring-primary rounded-lg' : ''
              }`}
              onClick={() => onSelectHotel(hotel)}
            >
              <HotelCard 
                id={hotel.id}
                name={hotel.name}
                slug={hotel.slug}
                location={hotel.location}
                rating={hotel.rating}
                reviewCount={hotel.reviewCount}
                image={hotel.image}
                pricePerNight={hotel.price || hotel.pricePerNight}
                featured={hotel.featured}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MapSidebar;
