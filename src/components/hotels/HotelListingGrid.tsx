
import React from 'react';
import HotelCard from '@/components/HotelCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface HotelListingGridProps {
  hotels: any[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
  compareList?: number[];
  onAddToCompare?: (hotelId: number) => void;
  onRemoveFromCompare?: (hotelId: number) => void;
  isInCompare?: (hotelId: number) => boolean;
}

const HotelListingGrid: React.FC<HotelListingGridProps> = ({
  hotels,
  loading = false,
  hasMore = false,
  onLoadMore,
  loadingMore = false,
  compareList = [],
  onAddToCompare,
  onRemoveFromCompare,
  isInCompare,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-muted-foreground">No hotels found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            location={hotel.location}
            image={hotel.image}
            pricePerNight={hotel.price}
            rating={hotel.rating}
            reviewCount={hotel.reviewCount}
            amenities={hotel.amenities}
            featured={hotel.featured}
            slug={hotel.slug}
            compareList={compareList}
            onAddToCompare={onAddToCompare}
            onRemoveFromCompare={onRemoveFromCompare}
            isInCompare={isInCompare}
          />
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={onLoadMore} 
            disabled={loadingMore}
            className="min-w-[150px]"
          >
            {loadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </>
            ) : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default HotelListingGrid;
