
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HotelGrid from "@/components/hotels/content/HotelGrid";
import HotelSkeletonList from "@/components/hotels/content/HotelSkeletonList";
import NoHotelsFound from "@/components/hotels/content/NoHotelsFound";

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

  const sortOptions = [
    { label: "Recommended", value: "recommended" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
    { label: "Rating", value: "rating" }
  ];

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
                  <div className="flex flex-wrap justify-between items-center gap-3">
                    <div className="flex items-center">
                      <h1 className="text-xl sm:text-2xl font-bold">
                        Hotels in Mount Abu {!isLoading && `(${filteredHotels.length})`}
                      </h1>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isMobile && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsFilterOpen(true)}
                          className="flex items-center gap-1"
                        >
                          <Filter className="h-4 w-4" />
                          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                        </Button>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ArrowUpDown className="h-4 w-4" />
                            Sort
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {sortOptions.map(option => (
                            <DropdownMenuItem
                              key={option.value}
                              onClick={() => setSortOption(option.value)}
                              className={sortOption === option.value ? "bg-stone-100" : ""}
                            >
                              {option.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      {compareList.length > 0 && (
                        <Button
                          size="sm"
                          onClick={() => setIsCompareDrawerOpen(true)}
                        >
                          Compare ({compareList.length})
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Active filters display */}
                  {activeFilterCount > 0 && (
                    <div className="flex flex-wrap items-center gap-2 py-2">
                      {selectedStars.length > 0 && (
                        <div className="text-sm bg-stone-100 px-3 py-1 rounded-full">
                          Stars: {selectedStars.join(', ')}
                        </div>
                      )}
                      {selectedAmenities.length > 0 && (
                        <div className="text-sm bg-stone-100 px-3 py-1 rounded-full">
                          Amenities: {selectedAmenities.length}
                        </div>
                      )}
                      {(priceRange[0] !== 1000 || priceRange[1] !== 15000) && (
                        <div className="text-sm bg-stone-100 px-3 py-1 rounded-full">
                          Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                        </div>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        className="text-xs text-stone-500 hover:text-primary"
                      >
                        Clear all
                      </Button>
                    </div>
                  )}

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
