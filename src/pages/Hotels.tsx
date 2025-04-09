
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
import HotelsTabs from "@/components/hotels/HotelsTabs";
import { Hotel as AdminHotel } from "@/components/admin/hotels/types";
import { useHotelFilters } from "@/hooks/useHotelFilters";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Hotels = () => {
  console.log("Rendering Hotels component");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeView, setActiveView] = useState<string>("classic");

  const { data: hotels, isLoading, error } = useQuery({
    queryKey: ["hotels"],
    queryFn: async () => {
      console.log("Fetching hotels from Supabase");
      try {
        const { data, error } = await supabase
          .from("hotels")
          .select("*")
          .eq("status", "active");
        
        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
        
        console.log("Hotels data received:", data?.length || 0, "hotels");
        
        // If no data is returned, use an empty array
        if (!data || data.length === 0) {
          console.log("No hotels found in database, using empty array");
          return [];
        }
        
        const adminHotels: AdminHotel[] = data.map(hotel => ({
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

  // Ensure hotels is always an array, even when undefined or null
  const safeHotels = hotels || [];
  console.log("Hotels data after processing:", safeHotels.length, "hotels");

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
    commonAmenities
  } = useHotelFilters(safeHotels, searchQuery);

  // Display a toast message when there's an error
  useEffect(() => {
    if (error) {
      console.error("Error details:", error);
      toast.error("Failed to load hotels", {
        description: "Please try again or contact support."
      });
    }
  }, [error]);

  // Close filter drawer when orientation changes on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isFilterOpen) {
        setIsFilterOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFilterOpen]);

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

  console.log("Rendering Hotels page with:", {
    isLoading,
    hasError: !!error,
    hotelsCount: safeHotels.length,
    filteredHotelsCount: filteredHotels?.length || 0
  });

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow pt-20 md:pt-28 pb-16 bg-stone-50">
          <div className="container-custom mb-8">
            <HotelsHeader hotelsCount={safeHotels.length || 0} />

            <div className="flex flex-col space-y-6">
              <HotelSearchSection 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
              />

              <HotelsTabs 
                activeView={activeView}
                setActiveView={setActiveView}
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
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                isLoading={isLoading}
                filteredHotels={filteredHotels || []}
                hotels={safeHotels}
                handleStarFilter={handleStarFilter}
                handleAmenityFilter={handleAmenityFilter}
                commonAmenities={commonAmenities}
              />
              
              <Separator className="my-10" />
              
              <HotelInfoSections />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Hotels;
