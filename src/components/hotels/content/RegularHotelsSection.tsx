
import React from "react";
import HotelCard from "@/components/HotelCard";

interface RegularHotelsSectionProps {
  hotels: any[];
}

const RegularHotelsSection = ({ hotels }: RegularHotelsSectionProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">All Properties</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            featured={false}
            slug={hotel.slug}
          />
        ))}
      </div>
    </>
  );
};

export default RegularHotelsSection;
