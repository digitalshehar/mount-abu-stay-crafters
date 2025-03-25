
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import HotelCard from '@/components/HotelCard';

interface RegularHotelsSectionProps {
  title: string;
  subtitle: string;
  hotels: any[];
}

const RegularHotelsSection: React.FC<RegularHotelsSectionProps> = ({
  title,
  subtitle,
  hotels
}) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  if (!hotels || hotels.length === 0) return null;

  const visibleHotels = hotels.slice(0, visibleCount);
  const hasMore = visibleCount < hotels.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 6, hotels.length));
      setIsLoadingMore(false);
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-stone-800">{title}</h2>
        <p className="text-stone-500">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {visibleHotels.map(hotel => (
          <HotelCard
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            slug={hotel.slug}
            location={hotel.location}
            rating={hotel.rating || 0}
            reviewCount={hotel.reviewCount || hotel.review_count || 0}
            image={hotel.image}
            featured={hotel.featured}
            amenities={hotel.amenities || []}
            pricePerNight={hotel.pricePerNight || hotel.price_per_night || 0}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleLoadMore} 
            disabled={isLoadingMore}
            className="min-w-[150px]"
          >
            {isLoadingMore ? (
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

export default RegularHotelsSection;
