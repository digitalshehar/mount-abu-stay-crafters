
import React from "react";
import { Link } from "react-router-dom";
import { Hotel } from "@/components/admin/hotels/types";
import HotelCard from "./HotelCard";
import HotelListHeader from "./HotelListHeader";
import HotelSortOptions from "./HotelSortOptions";
import EmptyState from "./EmptyState";

interface HotelListViewProps {
  hotels: Hotel[];
  isLoading?: boolean;
  hasError?: boolean;
  error?: string;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
}

const HotelListView = ({
  hotels = [],
  isLoading = false,
  hasError = false,
  error = "",
  sortBy = "recommended",
  onSortChange = () => {},
}: HotelListViewProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <HotelListHeader 
          count={0} 
          isLoading={true} 
        />
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="bg-stone-100 h-[200px] rounded-lg"
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
      
      <div className="space-y-6">
        {hotels.map((hotel) => (
          <HotelCard 
            key={hotel.id} 
            hotel={{
              ...hotel,
              pricePerNight: hotel.pricePerNight || hotel.price || 0,
              reviewCount: hotel.reviewCount || 0,
              rooms: hotel.rooms || []
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default HotelListView;
