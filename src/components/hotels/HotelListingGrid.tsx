
import React from "react";
import HotelCard from "@/components/HotelCard";

interface Hotel {
  id: number;
  name: string;
  slug: string;
  location: string;
  stars: number;
  pricePerNight: number;
  image: string;
  status: "active" | "inactive";
  description: string;
  amenities: string[];
  featured: boolean;
  reviewCount: number;
  rating: number;
}

interface HotelListingGridProps {
  hotels: Hotel[];
  isLoading: boolean;
}

const HotelListingGrid: React.FC<HotelListingGridProps> = ({ hotels, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl overflow-hidden shadow-sm p-4 h-80 animate-pulse"
          >
            <div className="h-40 bg-stone-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-stone-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-stone-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-stone-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-stone-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
        <p className="text-stone-500">
          Try adjusting your filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          id={hotel.id}
          name={hotel.name}
          location={hotel.location}
          image={hotel.image}
          price={hotel.pricePerNight}
          rating={hotel.rating}
          reviewCount={hotel.reviewCount}
          amenities={hotel.amenities}
          featured={hotel.featured}
          slug={hotel.slug}
        />
      ))}
    </div>
  );
};

export default HotelListingGrid;
