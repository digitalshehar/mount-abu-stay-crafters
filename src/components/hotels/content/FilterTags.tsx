
import React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FilterTagsProps {
  selectedStars: number[];
  selectedAmenities: string[];
  priceRange: [number, number];
  defaultPriceRange: [number, number]; // For comparison
  onClearFilters: () => void;
}

const FilterTags: React.FC<FilterTagsProps> = ({
  selectedStars,
  selectedAmenities,
  priceRange,
  defaultPriceRange,
  onClearFilters
}) => {
  // Check if any filters are applied
  const hasActiveFilters = 
    selectedStars.length > 0 || 
    selectedAmenities.length > 0 || 
    priceRange[0] !== defaultPriceRange[0] || 
    priceRange[1] !== defaultPriceRange[1];
  
  if (!hasActiveFilters) return null;
  
  return (
    <div className="flex flex-wrap items-center gap-2 pb-3">
      {/* Price Range Tag */}
      {(priceRange[0] !== defaultPriceRange[0] || priceRange[1] !== defaultPriceRange[1]) && (
        <Badge variant="secondary" className="px-3 py-1.5 bg-stone-100 text-stone-700 rounded-full">
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </Badge>
      )}
      
      {/* Star Rating Tags */}
      {selectedStars.map(star => (
        <Badge 
          key={`star-${star}`}
          variant="secondary" 
          className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full"
        >
          {star} Star
        </Badge>
      ))}
      
      {/* Amenities Tags */}
      {selectedAmenities.map(amenity => (
        <Badge 
          key={`amenity-${amenity}`}
          variant="secondary" 
          className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full"
        >
          {amenity}
        </Badge>
      ))}
      
      {/* Clear All Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClearFilters} 
        className="text-xs text-stone-500 hover:text-primary flex items-center gap-1 h-6 pl-2"
      >
        <X className="h-3 w-3" />
        Clear all
      </Button>
    </div>
  );
};

export default FilterTags;
