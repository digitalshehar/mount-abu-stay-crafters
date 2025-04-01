
import React from 'react';
import { Button } from "@/components/ui/button";

interface FilterTagsProps {
  selectedStars: number[];
  selectedAmenities: string[];
  priceRange: number[];
  defaultPriceRange: number[];
  onClearFilters: () => void;
}

const FilterTags: React.FC<FilterTagsProps> = ({
  selectedStars,
  selectedAmenities,
  priceRange,
  defaultPriceRange,
  onClearFilters
}) => {
  const showFilterTags = selectedStars.length > 0 || 
                          selectedAmenities.length > 0 || 
                          priceRange[0] !== defaultPriceRange[0] || 
                          priceRange[1] !== defaultPriceRange[1];
  
  if (!showFilterTags) return null;
  
  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      {selectedStars.length > 0 && (
        <div className="text-sm bg-stone-100 px-3 py-1 rounded-full">
          Stars: {selectedStars.join(', ')}
        </div>
      )}
      
      {selectedAmenities.length > 0 && (
        <div className="text-sm bg-stone-100 px-3 py-1 rounded-full">
          Amenities: {selectedAmenities.length}
        </div>
      )}
      
      {(priceRange[0] !== defaultPriceRange[0] || priceRange[1] !== defaultPriceRange[1]) && (
        <div className="text-sm bg-stone-100 px-3 py-1 rounded-full">
          Price: ₹{priceRange[0]} - ₹{priceRange[1]}
        </div>
      )}
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClearFilters}
        className="text-xs text-stone-500 hover:text-primary"
      >
        Clear all
      </Button>
    </div>
  );
};

export default FilterTags;
