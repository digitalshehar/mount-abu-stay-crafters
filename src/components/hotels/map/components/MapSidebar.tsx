
import React from 'react';
import FilterSidebar from '../../FilterSidebar';
import ZoneSelector from '../ZoneSelector';

interface MapSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedStars: number[];
  handleStarFilter: (star: number) => void;
  selectedAmenities: string[];
  handleAmenityFilter: (amenity: string) => void;
  clearFilters: () => void;
  commonAmenities: string[];
  onSelectZone: (bounds: any) => void;
}

const MapSidebar: React.FC<MapSidebarProps> = ({
  priceRange,
  setPriceRange,
  selectedStars,
  handleStarFilter,
  selectedAmenities,
  handleAmenityFilter,
  clearFilters,
  commonAmenities,
  onSelectZone
}) => {
  return (
    <div>
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
      
      <div className="mt-6">
        <ZoneSelector onSelectZone={onSelectZone} />
      </div>
    </div>
  );
};

export default MapSidebar;
