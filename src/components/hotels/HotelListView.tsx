
import React from "react";
import HotelContent from "./HotelContent";
import FilterSidebar from "./FilterSidebar";
import { useHotelFilters } from "@/hooks/useHotelFilters";

interface HotelListViewProps {
  hotels: any[];
  isLoading: boolean;
}

const HotelListView = ({ hotels, isLoading }: HotelListViewProps) => {
  const {
    priceRange,
    setPriceRange,
    selectedStars,
    setSelectedStars,
    selectedAmenities,
    setSelectedAmenities,
    activeFilterCount,
    filteredHotels,
    handleStarFilter,
    handleAmenityFilter,
    clearFilters,
    commonAmenities,
  } = useHotelFilters(hotels, "");

  return (
    <div className="container mx-auto py-6 lg:py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <div className="hidden lg:block">
          <FilterSidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedStars={selectedStars}
            handleStarFilter={handleStarFilter}
            selectedAmenities={selectedAmenities}
            handleAmenityFilter={handleAmenityFilter}
            clearFilters={clearFilters}
            commonAmenities={commonAmenities}
          />
        </div>

        <HotelContent
          isLoading={isLoading}
          filteredHotels={filteredHotels}
          activeFilterCount={activeFilterCount}
          clearFilters={clearFilters}
        />
      </div>
    </div>
  );
};

export default HotelListView;
