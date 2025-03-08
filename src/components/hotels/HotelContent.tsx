
import React from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import HotelCard from "@/components/HotelCard";

interface HotelContentProps {
  isLoading: boolean;
  filteredHotels: any[];
  activeFilterCount: number;
  clearFilters: () => void;
}

const HotelContent = ({
  isLoading,
  filteredHotels,
  activeFilterCount,
  clearFilters,
}: HotelContentProps) => {
  return (
    <>
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start">
        <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-blue-700 mb-1">About Mount Abu Hotels</h3>
          <p className="text-sm text-blue-600">
            Mount Abu offers a range of accommodations from luxurious resorts to budget-friendly hotels. 
            Most hotels are located near Nakki Lake and offer beautiful views of the surrounding Aravalli Hills.
            The high season runs from October to March with peak rates, while the monsoon season (July-September) 
            offers lush landscapes at lower prices.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
            >
              <div className="h-52 bg-stone-200"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-stone-200 rounded w-3/4"></div>
                <div className="h-4 bg-stone-200 rounded w-1/2"></div>
                <div className="flex space-x-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-6 bg-stone-200 rounded w-16"
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-stone-200 rounded w-24"></div>
                  <div className="h-10 bg-stone-200 rounded w-28"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredHotels && filteredHotels.length > 0 ? (
        <>
          <p className="text-stone-600 mb-6">
            Showing {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'} {activeFilterCount > 0 ? 'matching your filters' : 'in Mount Abu'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHotels.map((hotel) => (
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
      ) : (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
          <p className="text-stone-600 mb-4">
            Try adjusting your filters or search criteria.
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      )}
    </>
  );
};

export default HotelContent;
