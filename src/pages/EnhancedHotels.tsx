
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import HotelSearchSection from "@/components/hotels/HotelSearchSection";
import HotelInfoSections from "@/components/hotels/HotelInfoSections";
import HotelsHeader from "@/components/hotels/HotelsHeader";
import { Hotel as AdminHotel } from "@/components/admin/hotels/types";
import { useEnhancedFilters } from "@/hooks/useEnhancedFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import EnhancedFilters from "@/components/hotels/EnhancedFilters";
import { HotelCompareDrawer } from "@/components/hotels/comparison/HotelCompareDrawer";
import HotelGrid from "@/components/hotels/content/HotelGrid";
import HotelSkeletonList from "@/components/hotels/content/HotelSkeletonList";
import NoHotelsFound from "@/components/hotels/content/NoHotelsFound";
import HotelListHeader from "@/components/hotels/content/HotelListHeader";
import FilterTags from "@/components/hotels/content/FilterTags";

const defaultPriceRange = [1000, 15000];

const EnhancedHotels = () => {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [compareList, setCompareList] = useState<number[]>([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);

  const { data: hotels, isLoading, error } = useQuery({
    queryKey: ["hotels"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("hotels")
          .select("*")
          .eq("status", "active");
        
        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
        
        const adminHotels: AdminHotel[] = (data || []).map(hotel => ({
          id: hotel.id,
          name: hotel.name,
          slug: hotel.slug || '',
          location: hotel.location,
          stars: hotel.stars,
          pricePerNight: hotel.price_per_night,
          image: hotel.image,
          status: hotel.status === 'active' ? 'active' : 'inactive',
          description: hotel.description || '',
          amenities: hotel.amenities || [],
          reviewCount: hotel.review_count || 0,
          rating: hotel.rating || 0,
          featured: hotel.featured || false,
          rooms: [],
          categories: hotel.categories || [],
          gallery: hotel.gallery || [],
          latitude: hotel.latitude,
          longitude: hotel.longitude
        }));
        
        return adminHotels;
      } catch (error) {
        console.error("Error in fetchHotels:", error);
        throw error;
      }
    },
  });

  const {
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    selectedStars,
    setSelectedStars,
    selectedAmenities,
    setSelectedAmenities,
    isFilterOpen,
    setIsFilterOpen,
    toggleFilterDrawer,
    sortOption,
    setSortOption,
    filteredHotels,
    activeFilterCount,
    commonAmenities,
    handleStarFilter,
    handleAmenityFilter,
    clearFilters
  } = useEnhancedFilters(hotels || [], initialSearch);

  useEffect(() => {
    if (error) {
      console.error("Error details:", error);
      toast.error("Failed to load hotels", {
        description: "Please try again or contact support."
      });
    }
  }, [error]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(prev => {
      if (searchQuery) {
        prev.set("search", searchQuery);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  };

  const handleAddToCompare = (id: number) => {
    if (compareList.length >= 3) {
      toast.warning("You can compare up to 3 hotels at a time");
      return;
    }
    setCompareList(prev => [...prev, id]);
    toast.success("Added to comparison");
  };

  const handleRemoveFromCompare = (id: number) => {
    setCompareList(prev => prev.filter(item => item !== id));
    toast.info("Removed from comparison");
  };

  const isInCompare = (id: number) => compareList.includes(id);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow pt-20 md:pt-28 pb-16 bg-stone-50">
          <div className="container-custom mb-8">
            <HotelsHeader hotelsCount={hotels?.length || 0} />

            <div className="flex flex-col space-y-6">
              <HotelSearchSection 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
              />

              <div className={`grid grid-cols-1 ${isMobile ? '' : 'lg:grid-cols-[280px_1fr]'} gap-6`}>
                {/* Filters section - visible on desktop */}
                {!isMobile && (
                  <div className="hidden lg:block">
                    <EnhancedFilters 
                      isOpen={isFilterOpen}
                      onClose={() => setIsFilterOpen(false)}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      selectedStars={selectedStars}
                      handleStarFilter={handleStarFilter}
                      selectedAmenities={selectedAmenities}
                      handleAmenityFilter={handleAmenityFilter}
                      clearFilters={clearFilters}
                      commonAmenities={commonAmenities}
                      applyFilters={() => {}}
                    />
                  </div>
                )}

                {/* Hotels content section */}
                <div className="space-y-4">
                  <HotelListHeader
                    filteredHotelCount={filteredHotels.length}
                    isLoading={isLoading}
                    activeFilterCount={activeFilterCount}
                    compareCount={compareList.length}
                    sortOption={sortOption}
                    onToggleFilter={() => setIsFilterOpen(true)}
                    onToggleCompare={() => setIsCompareDrawerOpen(true)}
                    setSortOption={setSortOption}
                  />

                  {/* Active filters display */}
                  <FilterTags
                    selectedStars={selectedStars}
                    selectedAmenities={selectedAmenities}
                    priceRange={priceRange}
                    defaultPriceRange={defaultPriceRange}
                    onClearFilters={clearFilters}
                  />

                  {isLoading ? (
                    <HotelSkeletonList count={6} />
                  ) : filteredHotels.length === 0 ? (
                    <NoHotelsFound clearFilters={clearFilters} />
                  ) : (
                    <HotelGrid 
                      hotels={filteredHotels} 
                      compareList={compareList}
                      onAddToCompare={handleAddToCompare}
                      onRemoveFromCompare={handleRemoveFromCompare}
                      isInCompare={isInCompare}
                    />
                  )}
                </div>
              </div>
              
              <Separator className="my-10" />
              
              <HotelInfoSections />
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Mobile filters */}
      <EnhancedFilters
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedStars={selectedStars}
        handleStarFilter={handleStarFilter}
        selectedAmenities={selectedAmenities}
        handleAmenityFilter={handleAmenityFilter}
        clearFilters={clearFilters}
        commonAmenities={commonAmenities}
        applyFilters={() => {}}
      />

      {/* Hotel comparison drawer */}
      <HotelCompareDrawer
        open={isCompareDrawerOpen}
        onOpenChange={setIsCompareDrawerOpen}
        compareList={compareList}
        hotels={hotels || []}
        onRemove={handleRemoveFromCompare}
      />
    </>
  );
};

export default EnhancedHotels;
