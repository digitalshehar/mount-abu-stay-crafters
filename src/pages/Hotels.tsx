
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { MapPin, Info, Filter, Search, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import HotelSearchSection from "@/components/hotels/HotelSearchSection";
import ActiveFilters from "@/components/hotels/ActiveFilters";
import FilterSidebar from "@/components/hotels/FilterSidebar";
import MobileFilter from "@/components/hotels/MobileFilter";
import HotelContent from "@/components/hotels/HotelContent";
import HotelInfoSections from "@/components/hotels/HotelInfoSections";
import { useHotelFilters } from "@/components/hotels/useHotelFilters";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch hotels from Supabase
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
        
        return data || [];
      } catch (error) {
        console.error("Error in fetchHotels:", error);
        throw error;
      }
    },
  });

  // Use custom hook for filtering
  const {
    priceRange,
    setPriceRange,
    selectedStars,
    setSelectedStars,
    selectedAmenities,
    setSelectedAmenities,
    activeFilterCount,
    filteredHotels,
    handleStarFilter,
    handleAmenityFilter,
    clearFilters,
    commonAmenities,
    toggleFilterDrawer
  } = useHotelFilters(hotels || [], searchQuery);

  // Handle error notifications
  React.useEffect(() => {
    if (error) {
      console.error("Error details:", error);
      toast.error("Failed to load hotels", {
        description: "Please try again or contact support."
      });
    }
  }, [error]);

  // Handle search form submission
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

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow pt-28 pb-16 bg-stone-50">
          <div className="container-custom mb-8">
            {/* Hero section */}
            <div className="relative mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-pattern-dots"></div>
              <div className="relative z-10 px-6 py-12 md:py-16 text-white text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Hotels in Mount Abu
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6 text-blue-100">
                  Find the perfect accommodation for your stay in Rajasthan's only hill station
                </p>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Mount Abu, Rajasthan, India</span>
                  <span className="mx-2">•</span>
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-none">
                    {filteredHotels.length} properties
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <HotelSearchSection 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
              />

              <ActiveFilters 
                activeFilterCount={activeFilterCount}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedStars={selectedStars}
                setSelectedStars={setSelectedStars}
                selectedAmenities={selectedAmenities}
                setSelectedAmenities={setSelectedAmenities}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                clearFilters={clearFilters}
              />

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <FilterSidebar 
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedStars={selectedStars}
                  handleStarFilter={handleStarFilter}
                  selectedAmenities={selectedAmenities}
                  handleAmenityFilter={handleAmenityFilter}
                  clearFilters={clearFilters}
                  commonAmenities={commonAmenities}
                />

                <div className="lg:col-span-3">
                  <MobileFilter 
                    isFilterOpen={isFilterOpen}
                    setIsFilterOpen={setIsFilterOpen}
                    activeFilterCount={activeFilterCount}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedStars={selectedStars}
                    handleStarFilter={handleStarFilter}
                    selectedAmenities={selectedAmenities}
                    handleAmenityFilter={handleAmenityFilter}
                    clearFilters={clearFilters}
                    commonAmenities={commonAmenities}
                  />

                  <HotelContent 
                    isLoading={isLoading}
                    filteredHotels={filteredHotels}
                    activeFilterCount={activeFilterCount}
                    clearFilters={clearFilters}
                  />
                  
                  <Separator className="my-10" />
                  
                  <HotelInfoSections />
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Hotels;
