
import React from 'react';
import { Hotel } from '@/components/admin/hotels/types';
import HotelCard from '@/components/HotelCard';
import HotelListHeader from './HotelListHeader';
import HotelSortOptions from './HotelSortOptions';
import EmptyState from './EmptyState';

interface HotelGridViewProps {
  hotels: Hotel[];
  isLoading?: boolean;
  hasError?: boolean;
  error?: string;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
}

const HotelGridView: React.FC<HotelGridViewProps> = ({
  hotels = [],
  isLoading = false,
  hasError = false,
  error = "",
  sortBy = "recommended",
  onSortChange = () => {},
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <HotelListHeader count={0} isLoading={true} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i}
              className="bg-stone-100 h-[300px] rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-lg">
        <h3 className="text-red-600 font-semibold">Error loading hotels</h3>
        <p className="text-red-500">{error || "Please try again later"}</p>
      </div>
    );
  }

  if (hotels.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <HotelListHeader count={hotels.length} />
        <HotelSortOptions sortBy={sortBy} onSortChange={onSortChange} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCard 
            key={hotel.id} 
            id={hotel.id}
            name={hotel.name}
            slug={hotel.slug}
            location={hotel.location}
            rating={hotel.rating}
            reviewCount={hotel.reviewCount}
            image={hotel.image}
            pricePerNight={hotel.pricePerNight || hotel.price || 0}
            amenities={hotel.amenities || []}
            featured={hotel.featured || false}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelGridView;
