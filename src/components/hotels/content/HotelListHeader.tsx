
import React from "react";
import { SlidersHorizontal, ArrowUpDown, LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HotelListHeaderProps {
  filteredHotelCount: number;
  isLoading: boolean;
  activeFilterCount: number;
  compareCount: number;
  sortOption: string;
  setSortOption: (value: string) => void;
  onToggleFilter: () => void;
  onToggleCompare: () => void;
  onToggleView?: (view: 'grid' | 'list') => void;
  currentView?: 'grid' | 'list';
}

const HotelListHeader: React.FC<HotelListHeaderProps> = ({
  filteredHotelCount,
  isLoading,
  activeFilterCount,
  compareCount,
  sortOption,
  setSortOption,
  onToggleFilter,
  onToggleCompare,
  onToggleView,
  currentView = 'grid'
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
      <div className="text-stone-700">
        {isLoading ? (
          <span>Finding hotels...</span>
        ) : (
          <span className="font-medium">
            {filteredHotelCount} {filteredHotelCount === 1 ? 'hotel' : 'hotels'} found
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Sort Options */}
        <div className="hidden md:block w-48">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Sort & Filter Button */}
        <div className="md:hidden flex gap-2 w-full">
          <Select value={sortOption} onValueChange={setSortOption} className="flex-1">
            <SelectTrigger className="h-9">
              <ArrowUpDown className="h-3.5 w-3.5 mr-2" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilter}
            className="flex items-center justify-center bg-white"
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            Filter
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 bg-primary text-white">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Desktop View Toggle and Filter Button */}
        <div className="hidden md:flex items-center gap-2">
          {onToggleView && (
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleView('grid')}
                className={`h-9 px-3 rounded-none ${
                  currentView === 'grid' ? 'bg-stone-100' : ''
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleView('list')}
                className={`h-9 px-3 rounded-none ${
                  currentView === 'list' ? 'bg-stone-100' : ''
                }`}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilter}
            className="flex items-center md:hidden lg:flex"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-primary text-white">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
          
          {compareCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleCompare}
              className="flex items-center"
            >
              Compare ({compareCount})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelListHeader;
