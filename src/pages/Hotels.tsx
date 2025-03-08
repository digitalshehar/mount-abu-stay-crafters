
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
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

  // Common amenities for filter
  const commonAmenities = [
    "Wifi",
    "Breakfast",
    "TV",
    "Bathroom",
    "Parking",
    "Pool",
    "Air Conditioning",
    "Restaurant",
    "Gym",
    "Spa",
  ];

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
    clearFilters
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

        <main className="flex-grow pt-28 pb-16">
          <div className="container-custom">
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
