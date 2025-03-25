
import React from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

interface HotelFiltersMobileProps {
  activeFilterCount: number;
  clearFilters: () => void;
}

const HotelFiltersMobile: React.FC<HotelFiltersMobileProps> = ({
  activeFilterCount,
  clearFilters,
}) => {
  return (
    <div className="flex items-center gap-2 lg:hidden">
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="flex items-center"
        >
          <X className="h-4 w-4 mr-1" />
          Clear ({activeFilterCount})
        </Button>
      )}
    </div>
  );
};

export default HotelFiltersMobile;
