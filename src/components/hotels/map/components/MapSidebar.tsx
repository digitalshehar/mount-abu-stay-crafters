
import React from 'react';
import HotelCard from '@/components/HotelCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Hotel } from '@/integrations/supabase/custom-types';

interface MapSidebarProps {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  onSelectHotel: (hotel: Hotel) => void;
  // Filter props
  priceRange?: [number, number];
  setPriceRange?: (range: [number, number]) => void;
  selectedStars?: number[];
  handleStarFilter?: (star: number) => void;
  selectedAmenities?: string[];
  handleAmenityFilter?: (amenity: string) => void;
  clearFilters?: () => void;
  commonAmenities?: string[];
  onSelectZone?: (bounds: any) => void;
}

const MapSidebar = ({ 
  hotels, 
  selectedHotel, 
  onSelectHotel,
  priceRange,
  setPriceRange,
  selectedStars,
  handleStarFilter,
  selectedAmenities,
  handleAmenityFilter,
  clearFilters,
  commonAmenities,
  onSelectZone
}: MapSidebarProps) => {
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
                id={hotel.id}
                name={hotel.name}
                slug={hotel.slug}
                location={hotel.location}
                rating={hotel.rating || 0}
                reviewCount={hotel.review_count || 0}
                image={hotel.image}
                pricePerNight={hotel.price_per_night}
                featured={hotel.featured || false}
                amenities={hotel.amenities || []}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MapSidebar;
