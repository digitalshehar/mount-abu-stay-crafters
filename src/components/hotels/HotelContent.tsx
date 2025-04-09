
import React from "react";
import { Hotel } from "@/types";
import { normalizeHotels } from "@/utils/hotelTypeAdapter";
import NoHotelsFound from "./content/NoHotelsFound";
import HotelGrid from "./content/HotelGrid";
import HotelFiltersMobile from "./content/HotelFiltersMobile";

export interface HotelContentProps {
  isLoading: boolean;
  filteredHotels: any[];
  activeFilterCount: number;
  clearFilters: () => void;
  compareList?: number[];
  onAddToCompare?: (id: number) => void;
  onRemoveFromCompare?: (id: number) => void;
  isInCompare?: (id: number) => boolean;
}

const HotelContent: React.FC<HotelContentProps> = ({
  isLoading,
  filteredHotels,
  activeFilterCount,
  clearFilters,
  compareList = [],
  onAddToCompare = () => {},
  onRemoveFromCompare = () => {},
  isInCompare = () => false
}) => {
  // Add a state or function for openFilters
  const openFilters = () => {
    // This is a placeholder function that would typically 
    // set some state or trigger a modal/drawer to open
    document.dispatchEvent(new CustomEvent('open-hotel-filters'));
  };

  // Normalize hotels to ensure they match the expected Hotel type
  const normalizedHotels = normalizeHotels(filteredHotels || []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">
          Hotels in Mount Abu {!isLoading && `(${filteredHotels.length})`}
        </h1>
        
        <HotelFiltersMobile 
          activeFilterCount={activeFilterCount}
          clearFilters={clearFilters}
          openFilters={openFilters}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index} 
              className="animate-pulse bg-white rounded-xl shadow-sm overflow-hidden h-[280px]"
            >
              <div className="h-40 bg-stone-200"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-stone-200 rounded w-3/4"></div>
                <div className="h-4 bg-stone-200 rounded w-1/2"></div>
                <div className="h-8 bg-stone-200 rounded w-full mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : normalizedHotels.length === 0 ? (
        <NoHotelsFound clearFilters={clearFilters} />
      ) : (
        <HotelGrid 
          hotels={normalizedHotels} 
          compareList={compareList}
          onAddToCompare={onAddToCompare}
          onRemoveFromCompare={onRemoveFromCompare}
          isInCompare={isInCompare}
        />
      )}
    </div>
  );
};

export default HotelContent;
