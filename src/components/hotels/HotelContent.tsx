
import React from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import HotelInfoBanner from "./content/HotelInfoBanner";
import HotelSkeletonList from "./content/HotelSkeletonList";
import FeaturedHotelsSection from "./content/FeaturedHotelsSection";
import RegularHotelsSection from "./content/RegularHotelsSection";
import NoHotelsFound from "./content/NoHotelsFound";

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
  clearFilters
}: HotelContentProps) => {
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
