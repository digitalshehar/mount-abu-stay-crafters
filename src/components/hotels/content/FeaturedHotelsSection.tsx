
import React from "react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import HotelCard from "@/components/HotelCard";

interface FeaturedHotelsSectionProps {
  hotels: any[];
}

const FeaturedHotelsSection = ({ hotels }: FeaturedHotelsSectionProps) => {
  return (
    <>
      <div className="mb-4 flex items-center">
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 mr-2">
          <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
          Featured
        </Badge>
        <h3 className="text-lg font-semibold">Recommended Properties</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            image={hotel.image}
            price={hotel.price_per_night}
            location={hotel.location}
            rating={hotel.rating || 0}
            reviewCount={hotel.review_count || 0}
            amenities={hotel.amenities || []}
            featured={hotel.featured}
            slug={hotel.slug}
          />
        ))}
      </div>
    </>
  );
};

export default FeaturedHotelsSection;
