
import React from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMedia } from "@/hooks/use-mobile";
import HotelFilters from "./HotelFilters";
import HotelContent from "./HotelContent";
import MobileFilter from "./MobileFilter";
import ActiveFilters from "./ActiveFilters";
import FilterSidebar from "./FilterSidebar";
import { useHotelFilters } from "./useHotelFilters";

const HotelListView = ({ hotels, isLoading }: { hotels: any[]; isLoading: boolean }) => {
  const { isMobile } = useMedia();
  const {
    searchQuery,
    setSearchQuery,
    selectedStars,
    setSelectedStars,
    selectedAmenities,
    setSelectedAmenities,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    handleStarFilter,
    handleAmenityFilter,
    filteredAndSortedHotels,
    clearFilters,
    activeFilterCount,
    commonAmenities,
  } = useHotelFilters(hotels);

  return (
    <div className="container mx-auto py-6 lg:py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Hotels in Mount Abu</h1>
        <Link to="/hotels/map">
          <Button variant="outline" size="sm" className="flex items-center">
            <Map className="mr-2 h-4 w-4" />
            View Map
          </Button>
        </Link>
      </div>

      <HotelFilters
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {isMobile ? (
        <MobileFilter
          selectedStars={selectedStars}
          handleStarFilter={handleStarFilter}
          selectedAmenities={selectedAmenities}
          handleAmenityFilter={handleAmenityFilter}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          commonAmenities={commonAmenities}
        />
      ) : null}

      {activeFilterCount > 0 && (
        <div className="mb-6">
          <ActiveFilters
            activeFilterCount={activeFilterCount}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedStars={selectedStars}
            setSelectedStars={setSelectedStars}
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            clearFilters={clearFilters}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
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

        <HotelContent
          isLoading={isLoading}
          filteredHotels={filteredAndSortedHotels}
          activeFilterCount={activeFilterCount}
          clearFilters={clearFilters}
        />
      </div>
    </div>
  );
};

export default HotelListView;
