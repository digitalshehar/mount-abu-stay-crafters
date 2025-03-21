
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
}

const HotelContent = ({
  isLoading,
  filteredHotels,
  activeFilterCount,
  clearFilters,
}: HotelContentProps) => {
  // Get hotel comparison functionality
  const { compareList, addToCompare, removeFromCompare, isInCompare } = useHotelComparison();
  
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
              compareList={[]}
              onAddToCompare={addToCompare}
              onRemoveFromCompare={removeFromCompare}
              isInCompare={isInCompare}
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
              compareList={[]}
              onAddToCompare={addToCompare}
              onRemoveFromCompare={removeFromCompare}
              isInCompare={isInCompare}
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
