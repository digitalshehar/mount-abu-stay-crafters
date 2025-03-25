
import React from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import HotelInfoBanner from "./content/HotelInfoBanner";
import HotelSkeletonList from "./content/HotelSkeletonList";
import FeaturedHotelsSection from "./content/FeaturedHotelsSection";
import RegularHotelsSection from "./content/RegularHotelsSection";
import NoHotelsFound from "./content/NoHotelsFound";
import { useHotelComparison } from "@/hooks/useHotelComparison";

interface HotelContentProps {
  isLoading: boolean;
  filteredHotels: any[];
  activeFilterCount: number;
  clearFilters: () => void;
  compareList?: number[];
  onAddToCompare?: (id: number) => void;
  onRemoveFromCompare?: (id: number) => void;
  isInCompare?: (id: number) => boolean;
}

const HotelContent = ({
  isLoading,
  filteredHotels,
  activeFilterCount,
  clearFilters,
  compareList = [],
  onAddToCompare,
  onRemoveFromCompare,
  isInCompare
}: HotelContentProps) => {
  // Get hotel comparison functionality if not provided
  const comparison = useHotelComparison();
  
  // Use provided comparison functions or defaults from the hook
  const finalCompareList = compareList.length > 0 ? compareList : comparison.compareList.map(hotel => hotel.id);
  const finalAddToCompare = onAddToCompare || comparison.addToCompare;
  const finalRemoveFromCompare = onRemoveFromCompare || comparison.removeFromCompare;
  const finalIsInCompare = isInCompare || comparison.isInCompare;
  
  // Separate featured hotels
  const featuredHotels = filteredHotels.filter(hotel => hotel.featured);
  const regularHotels = filteredHotels.filter(hotel => !hotel.featured);

  return (
    <>
      <HotelInfoBanner />

      {isLoading ? (
        <HotelSkeletonList />
      ) : filteredHotels && filteredHotels.length > 0 ? (
        <>
          <p className="text-stone-600 mb-6">
            Showing {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'} {activeFilterCount > 0 ? 'matching your filters' : 'in Mount Abu'}
          </p>
          
          {featuredHotels.length > 0 && (
            <FeaturedHotelsSection 
              title="Featured Hotels" 
              subtitle="Our handpicked premium accommodations"
              hotels={featuredHotels} 
              compareList={finalCompareList}
              onAddToCompare={finalAddToCompare}
              onRemoveFromCompare={finalRemoveFromCompare}
              isInCompare={finalIsInCompare}
            />
          )}
          
          {featuredHotels.length > 0 && regularHotels.length > 0 && 
            <Separator className="my-6" />
          }
          
          {regularHotels.length > 0 && (
            <RegularHotelsSection 
              title="All Hotels"
              subtitle="Explore all accommodations in Mount Abu"
              hotels={regularHotels}
              compareList={finalCompareList}
              onAddToCompare={finalAddToCompare}
              onRemoveFromCompare={finalRemoveFromCompare}
              isInCompare={finalIsInCompare}
            />
          )}
        </>
      ) : (
        <NoHotelsFound clearFilters={clearFilters} />
      )}
    </>
  );
};

export default HotelContent;
