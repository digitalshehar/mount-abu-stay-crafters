
import React from "react";
import { Hotel as AdminHotel } from "@/components/admin/hotels/types";
import { Hotel } from "@/integrations/supabase/custom-types";
import HotelCard from "@/components/HotelCard";

interface HotelGridProps {
  hotels: AdminHotel[] | Hotel[];
  compareList?: number[];
  onAddToCompare?: (id: number) => void;
  onRemoveFromCompare?: (id: number) => void;
  isInCompare?: (id: number) => boolean;
}

const HotelGrid: React.FC<HotelGridProps> = ({
  hotels,
  compareList = [],
  onAddToCompare = () => {},
  onRemoveFromCompare = () => {},
  isInCompare = () => false
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {hotels.map((hotel) => {
        // Handle both AdminHotel and Hotel types
        const hotelId = hotel.id;
        const hotelName = hotel.name;
        // Ensure hotel slug is always defined
        const hotelSlug = hotel.slug || (typeof hotel.name === 'string' ? hotel.name.toLowerCase().replace(/\s+/g, '-') : '');
        const hotelLocation = hotel.location;
        const hotelRating = 'rating' in hotel ? hotel.rating || 0 : 0;
        const hotelReviewCount = 
          'reviewCount' in hotel ? hotel.reviewCount || 0 : 
          'review_count' in hotel ? hotel.review_count || 0 : 0;
        const hotelImage = hotel.image;
        const hotelFeatured = 'featured' in hotel ? hotel.featured || false : false;
        const hotelAmenities = 'amenities' in hotel ? hotel.amenities || [] : [];
        const hotelPrice = 
          'pricePerNight' in hotel ? hotel.pricePerNight || 0 : 
          'price_per_night' in hotel ? hotel.price_per_night || 0 : 0;

        return (
          <HotelCard
            key={hotelId}
            id={hotelId}
            name={hotelName}
            slug={hotelSlug}
            location={hotelLocation}
            rating={hotelRating}
            reviewCount={hotelReviewCount}
            image={hotelImage}
            featured={hotelFeatured}
            amenities={hotelAmenities}
            pricePerNight={hotelPrice}
            isInCompare={isInCompare(hotelId)}
            onAddToCompare={() => onAddToCompare(hotelId)}
            onRemoveFromCompare={() => onRemoveFromCompare(hotelId)}
          />
        );
      })}
    </div>
  );
};

export default HotelGrid;
