
import React from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

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
    <div className="flex items-center gap-2 lg:hidden mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={openFilters}
        className="flex items-center w-full justify-center"
      >
        <SlidersHorizontal className="h-4 w-4 mr-1" />
        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
      </Button>
      
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="flex items-center"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
};

export default HotelFiltersMobile;
