
import React from 'react';
import MapControls from './MapControls';
import ActiveFilters from '../../ActiveFilters';

interface MapHeaderProps {
  viewMode: 'map' | 'list';
  setViewMode: (mode: 'map' | 'list') => void;
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
}

const MapHeader: React.FC<MapHeaderProps> = ({
  viewMode,
  setViewMode,
  activeFilterCount,
  searchQuery,
  setSearchQuery,
  selectedStars,
  setSelectedStars,
  selectedAmenities,
  setSelectedAmenities,
  priceRange,
  setPriceRange,
  clearFilters
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Hotels in Mount Abu</h1>
        <MapControls viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      
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
    </>
  );
};

export default MapHeader;
