
import React from "react";
import { Search, Filter, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterOptions } from "@/components/admin/hotels/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface HotelSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleFilter: () => void;
  onSearch: () => void;
  activeFilters: FilterOptions;
  onClearFilters: () => void;
  showFavoritesOnly?: boolean;
  onToggleFavoritesFilter?: () => void;
}

const HotelSearchBar: React.FC<HotelSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleFilter,
  onSearch,
  activeFilters,
  onClearFilters,
  showFavoritesOnly = false,
  onToggleFavoritesFilter
}) => {
  const { user } = useAuth();
  
  // Count number of active filters
  const getActiveFilterCount = () => {
    let count = 0;
    
    if (activeFilters.starRating.length > 0) count++;
    if (activeFilters.amenities.length > 0) count++;
    if (
      activeFilters.priceRange[0] > 0 ||
      activeFilters.priceRange[1] < activeFilters.maxPrice
    ) {
      count++;
    }
    
    return count;
  };
  
  const activeFilterCount = getActiveFilterCount();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
      <div className="w-full md:w-auto flex items-center flex-1 gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search hotels by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 w-full"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => {
                setSearchQuery('');
                onSearch();
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <Button onClick={onSearch}>Search</Button>
      </div>
      
      <div className="flex gap-2 flex-wrap mt-3 md:mt-0">
        {user && onToggleFavoritesFilter && (
          <Button 
            variant={showFavoritesOnly ? "default" : "outline"} 
            size="sm"
            onClick={onToggleFavoritesFilter}
            className={cn(
              "gap-1",
              showFavoritesOnly && "bg-red-100 hover:bg-red-200 text-red-800 border-red-200"
            )}
          >
            <Heart className={cn("h-4 w-4", showFavoritesOnly && "fill-red-500")} />
            {showFavoritesOnly ? "Showing Favorites" : "Show Favorites"}
          </Button>
        )}
      
        <Button
          variant="outline"
          onClick={handleFilter}
          className="gap-1 relative"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
        
        {(activeFilterCount > 0 || searchQuery || showFavoritesOnly) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default HotelSearchBar;
