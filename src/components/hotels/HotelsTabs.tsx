
import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActiveFilters from './ActiveFilters';
import FilterSidebar from './FilterSidebar';
import MobileFilter from './MobileFilter';
import HotelContent from './HotelContent';
import HotelZone from './HotelZone';
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';

interface HotelsTabsProps {
  activeView: string;
  setActiveView: (view: string) => void;
  activeFilterCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStars: number[];
  setSelectedStars: (stars: number[]) => void;
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  clearFilters: () => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  isLoading: boolean;
  filteredHotels: AdminHotel[];
  hotels: AdminHotel[];
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
  commonAmenities
}) => {
  return (
    <Tabs 
      value={activeView} 
      onValueChange={setActiveView}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="classic" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Classic View</span>
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Hotel Zone</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="classic" className="mt-0">
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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

          <div className="lg:col-span-3">
            <MobileFilter 
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              activeFilterCount={activeFilterCount}
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
              filteredHotels={filteredHotels}
              activeFilterCount={activeFilterCount}
              clearFilters={clearFilters}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="map" className="mt-0">
        <HotelZone 
          hotels={hotels}
          isLoading={isLoading}
          clearFilters={clearFilters}
        />
      </TabsContent>
    </Tabs>
  );
};

export default HotelsTabs;
