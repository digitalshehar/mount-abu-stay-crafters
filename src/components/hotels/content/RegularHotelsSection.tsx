
import React from 'react';
import HotelCard from '@/components/HotelCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Hotel } from '@/integrations/supabase/custom-types';

interface RegularHotelsSectionProps {
  title: string;
  subtitle: string;
  hotels: Hotel[];
  limit?: number;
}

const RegularHotelsSection: React.FC<RegularHotelsSectionProps> = ({
  title,
  subtitle,
  hotels,
  limit = 6
}) => {
  const displayHotels = limit ? hotels.slice(0, limit) : hotels;

  if (!hotels || hotels.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-stone-800">{title}</h2>
          <p className="text-stone-500">{subtitle}</p>
        </div>
        {hotels.length > limit && (
          <Button variant="ghost" className="gap-2">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {displayHotels.map(hotel => (
          <HotelCard
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            slug={hotel.slug}
            location={hotel.location}
            rating={hotel.rating || 0}
            reviewCount={hotel.review_count || 0}
            image={hotel.image}
            featured={hotel.featured}
            amenities={hotel.amenities || []}
            pricePerNight={hotel.price_per_night || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default RegularHotelsSection;
