
import React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ActiveFiltersProps {
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

const ActiveFilters = ({
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
}: ActiveFiltersProps) => {
  if (activeFilterCount === 0) {
    return null;
  }

  return (
    <div className="bg-stone-50 p-4 rounded-lg flex flex-col sm:flex-row flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-stone-600 mr-2">Active filters:</span>
      
      <div className="flex flex-wrap gap-2">
        {searchQuery && (
          <Badge variant="outline" className="flex items-center gap-1 bg-white">
            Search: {searchQuery}
            <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
          </Badge>
        )}
        
        {selectedStars.length > 0 && (
          <Badge variant="outline" className="flex items-center gap-1 bg-white">
            Stars: {selectedStars.sort().join(", ")}
            <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedStars([])} />
          </Badge>
        )}
        
        {selectedAmenities.map(amenity => (
          <Badge key={amenity} variant="outline" className="flex items-center gap-1 bg-white">
            {amenity}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => setSelectedAmenities(selectedAmenities.filter(a => a !== amenity))} 
            />
          </Badge>
        ))}
        
        {(priceRange[0] !== 1000 || priceRange[1] !== 15000) && (
          <Badge variant="outline" className="flex items-center gap-1 bg-white">
            Price: ₹{priceRange[0]} - ₹{priceRange[1]}
            <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([1000, 15000])} />
          </Badge>
        )}
      </div>
      
      <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
        Clear all filters
      </Button>
    </div>
  );
};

export default ActiveFilters;
