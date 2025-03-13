
import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel } from '@/components/admin/hotels/types';
import HotelCard from '@/components/HotelCard';

interface FeaturedHotelsSectionProps {
  title?: string;
  subtitle?: string;
  compareList?: number[];
  onAddToCompare?: (hotelId: number) => void;
  onRemoveFromCompare?: (hotelId: number) => void;
  isInCompare?: (hotelId: number) => boolean;
  limit?: number;
  hotels?: Hotel[]; // Added to support direct hotel data passing
}

const FeaturedHotelsSection: React.FC<FeaturedHotelsSectionProps> = ({
  title = "Featured Hotels in Mount Abu",
  subtitle = "Experience luxury and comfort at our handpicked featured properties",
  compareList = [],
  onAddToCompare,
  onRemoveFromCompare,
  isInCompare = () => false,
  limit = 3,
  hotels = []
}) => {
  if (hotels.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 md:mb-6">{title}</h2>
            <p className="text-sm md:text-base text-muted-foreground">{subtitle}</p>
          </div>
          <Link
            to="/hotels"
            className="mt-4 md:mt-0 px-4 py-2 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors text-sm"
          >
            Browse All Hotels
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {hotels.slice(0, limit).map((hotel) => (
            <HotelCard 
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              slug={hotel.slug}
              location={hotel.location}
              rating={hotel.rating}
              reviewCount={hotel.reviewCount}
              image={hotel.image}
              featured={hotel.featured}
              amenities={hotel.amenities}
              pricePerNight={hotel.pricePerNight}
              compareList={compareList}
              onAddToCompare={onAddToCompare ? () => onAddToCompare(hotel.id) : undefined}
              onRemoveFromCompare={onRemoveFromCompare ? () => onRemoveFromCompare(hotel.id) : undefined}
              isInCompare={isInCompare ? () => isInCompare(hotel.id) : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotelsSection;
