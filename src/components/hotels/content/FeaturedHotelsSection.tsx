
import React from 'react';
import HotelCard from '@/components/HotelCard';

interface FeaturedHotelsSectionProps {
  title: string;
  subtitle: string;
  hotels: any[];
}

const FeaturedHotelsSection: React.FC<FeaturedHotelsSectionProps> = ({
  title,
  subtitle,
  hotels
}) => {
  if (!hotels || hotels.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-stone-800">{title}</h2>
        <p className="text-stone-500">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {hotels.map(hotel => (
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
    </div>
  );
};

export default FeaturedHotelsSection;
