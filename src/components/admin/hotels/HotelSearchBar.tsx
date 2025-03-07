
import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterOptions } from "./HotelFilterPanel";

interface HotelSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleFilter: () => void;
  onSearch?: (term: string) => void;
  activeFilters?: FilterOptions;
  onClearFilters?: () => void;
}

const HotelSearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  handleFilter,
  onSearch,
  activeFilters,
  onClearFilters
}: HotelSearchBarProps) => {
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (handleFilter) handleFilter();
    }
  };

  // Count active filters
  const getActiveFilterCount = () => {
    if (!activeFilters) return 0;
    
    let count = 0;
    if (activeFilters.starRating.length > 0) count++;
    if (activeFilters.amenities.length > 0) count++;
    if (activeFilters.priceRange[0] > 0 || 
        activeFilters.priceRange[1] < activeFilters.maxPrice) count++;
    
    return count;
  };

  const filterCount = getActiveFilterCount();

  return (
    <div className="p-4 border-b flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
          <Input
            placeholder="Search hotels by name or location..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <Button 
          variant="outline" 
          className="gap-2" 
          onClick={handleFilter}
        >
          <SlidersHorizontal size={16} />
          Filters
          {filterCount > 0 && (
            <Badge variant="secondary" className="ml-1 rounded-full">
              {filterCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active filters display */}
      {filterCount > 0 && activeFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-stone-500">Active filters:</span>
          
          {/* Price range filter */}
          {(activeFilters.priceRange[0] > 0 || 
            activeFilters.priceRange[1] < activeFilters.maxPrice) && (
            <Badge variant="outline" className="text-xs">
              ₹{activeFilters.priceRange[0].toLocaleString()} - 
              ₹{activeFilters.priceRange[1].toLocaleString()}
            </Badge>
          )}
          
          {/* Star rating filter */}
          {activeFilters.starRating.length > 0 && (
            <Badge variant="outline" className="text-xs">
              {activeFilters.starRating.length === 1 
                ? `${activeFilters.starRating[0]} Star` 
                : `${activeFilters.starRating.join(', ')} Stars`}
            </Badge>
          )}
          
          {/* Amenities filter */}
          {activeFilters.amenities.length > 0 && (
            <Badge variant="outline" className="text-xs">
              {activeFilters.amenities.length === 1 
                ? activeFilters.amenities[0] 
                : `${activeFilters.amenities.length} Amenities`}
            </Badge>
          )}
          
          {/* Clear filters button */}
          {onClearFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs text-stone-500 hover:text-stone-700"
              onClick={onClearFilters}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default HotelSearchBar;
