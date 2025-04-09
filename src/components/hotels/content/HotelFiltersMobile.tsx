
import React from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X, Filter, Badge as BadgeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HotelFiltersMobileProps {
  activeFilterCount: number;
  clearFilters: () => void;
  openFilters: () => void;
}

const HotelFiltersMobile: React.FC<HotelFiltersMobileProps> = ({
  activeFilterCount,
  clearFilters,
  openFilters,
}) => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-stone-100 py-3 px-4 lg:hidden mb-4">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={openFilters}
          className="flex items-center flex-1 justify-center bg-white shadow-sm"
        >
          <Filter className="h-4 w-4 mr-2" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2 bg-primary text-white">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => {}}
          className="flex items-center justify-center bg-white shadow-sm"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          <span>Sort</span>
        </Button>
        
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default HotelFiltersMobile;
