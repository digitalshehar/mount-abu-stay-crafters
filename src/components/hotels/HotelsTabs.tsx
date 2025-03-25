
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { List, SlidersHorizontal, X } from "lucide-react";
import HotelListView from "@/components/hotels/HotelListView";
import MobileFilter from "@/components/hotels/MobileFilter";
import { Hotel } from "@/components/admin/hotels/types";

interface HotelsTabsProps {
  activeView: string;
  setActiveView: (view: string) => void;
  activeFilterCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStars: number[];
  setSelectedStars: React.Dispatch<React.SetStateAction<number[]>>;
  selectedAmenities: string[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<string[]>>;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  clearFilters: () => void;
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  filteredHotels: Hotel[];
  hotels: Hotel[];
  handleStarFilter: (star: number) => void;
  handleAmenityFilter: (amenity: string) => void;
  commonAmenities: string[];
}

const HotelsTabs: React.FC<HotelsTabsProps> = ({
  activeView,
  setActiveView,
  activeFilterCount,
  searchQuery,
  setSearchQuery,
  selectedStars,
  setSelectedStars,
  selectedAmenities,
  setSelectedAmenities,
  priceRange,
  setPriceRange,
  clearFilters,
  isFilterOpen,
  setIsFilterOpen,
  isLoading,
  filteredHotels,
  hotels,
  handleStarFilter,
  handleAmenityFilter,
  commonAmenities,
}) => {
  return (
    <Tabs defaultValue="classic" value={activeView} onValueChange={setActiveView}>
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="classic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <List className="w-4 h-4 mr-2" />
            List View
          </TabsTrigger>
        </TabsList>
        
        {activeFilterCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear filters ({activeFilterCount})
          </Button>
        )}
      </div>

      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center w-full justify-center"
        >
          <SlidersHorizontal className="h-4 w-4 mr-1" />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
      </div>

      <MobileFilter
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedStars={selectedStars}
        handleStarFilter={handleStarFilter}
        selectedAmenities={selectedAmenities}
        handleAmenityFilter={handleAmenityFilter}
        clearFilters={clearFilters}
        commonAmenities={commonAmenities}
      />

      <TabsContent value="classic" className="mt-0">
        <div className="w-full">
          <HotelListView hotels={filteredHotels} isLoading={isLoading} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default HotelsTabs;
