
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useHotelFilters } from "@/hooks/useHotelFilters";
import { Breadcrumb } from "@/components/Breadcrumb";
import HotelFilters from "@/components/hotels/HotelFilters";
import HotelListView from "@/components/hotels/HotelListView";
import HotelGridView from "@/components/hotels/HotelGridView";
import HotelViewToggle from "@/components/hotels/HotelViewToggle";
import HotelMapView from "@/components/hotels/HotelMapView";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import PageHeader from "@/components/PageHeader";
import { Hotel } from "@/types";

// Extended HotelType with database fields
interface HotelType extends Hotel {
  price_per_night?: number;
  status: "active" | "inactive";
}

const Hotels = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [showMap, setShowMap] = useState(false);

  // Get search params from URL
  const searchParams = new URLSearchParams(search);
  const locationParam = searchParams.get("location") || "";
  const checkInParam = searchParams.get("check_in") || "";
  const checkOutParam = searchParams.get("check_out") || "";
  const guestsParam = searchParams.get("guests") || "2";

  // Local filter state
  const [searchQuery, setSearchQuery] = useState(locationParam);
  const [priceRange, setPriceRange] = useState([0, 8500]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommended");

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Use the hotel filters hook
  const { filteredHotels, commonAmenities, applyFilters, resetFilters } = useHotelFilters(hotels);

  // Initial hotels fetch from Supabase
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        console.info('Rendering Hotels component');
        
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .eq('status', 'active');
          
        if (error) {
          throw error;
        }
        
        // Augment hotel data with rooms
        const hotelsWithRooms = await Promise.all(data.map(async (hotel) => {
          // Fetch rooms for each hotel
          const { data: roomsData, error: roomsError } = await supabase
            .from('rooms')
            .select('*')
            .eq('hotel_id', hotel.id);
            
          if (roomsError) {
            console.error(`Error fetching rooms for hotel ${hotel.id}:`, roomsError);
            return {
              ...hotel,
              rooms: []
            };
          }
          
          return {
            ...hotel,
            pricePerNight: hotel.price_per_night,
            rooms: roomsData || []
          };
        }));
        
        console.info('Hotels data after processing:', hotelsWithRooms.length, 'hotels');
        setHotels(hotelsWithRooms);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setHasError(true);
        toast.error("Failed to load hotels. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHotels();
  }, []);

  // Apply filters when filter state changes
  useEffect(() => {
    applyFilters({
      searchQuery: debouncedSearchQuery,
      priceRange,
      selectedStars,
      selectedAmenities
    });
  }, [debouncedSearchQuery, priceRange, selectedStars, selectedAmenities, applyFilters]);

  // Handle reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 8500]);
    setSelectedStars([]);
    setSelectedAmenities([]);
    resetFilters();
    toast.info("Filters have been reset");
  };

  // Log key information for debugging
  console.info('Rendering Hotels page with:', {
    isLoading,
    hasError,
    hotelsCount: hotels.length,
    filteredHotelsCount: filteredHotels.length
  });

  // Function to map HotelType to Hotel
  const mapToHotelType = (hotels: HotelType[]): Hotel[] => {
    return hotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      slug: hotel.slug,
      location: hotel.location,
      description: hotel.description,
      price: hotel.price_per_night,
      pricePerNight: hotel.pricePerNight || hotel.price_per_night,
      stars: hotel.stars,
      rating: hotel.rating,
      reviewCount: hotel.reviewCount || 0,
      image: hotel.image,
      rooms: hotel.rooms || [],
      amenities: hotel.amenities,
      status: hotel.status
    }));
  };

  return (
    <>
      <ScrollToTop />
      <div className="bg-stone-50 pb-12">
        <PageHeader
          title="Hotels in Mount Abu"
          description="Find and book the best hotels in Mount Abu, Rajasthan."
          breadcrumb={
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Hotels', href: '/hotels', active: true }
              ]}
            />
          }
        />
        
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <HotelFilters
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedStars={selectedStars}
                setSelectedStars={setSelectedStars}
                selectedAmenities={selectedAmenities}
                setSelectedAmenities={setSelectedAmenities}
                availableAmenities={commonAmenities}
                onReset={handleResetFilters}
              />
              
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowMap(!showMap)}
                >
                  {showMap ? 'Hide Map' : 'Show Map'}
                </Button>
              </div>
            </aside>
            
            <main className="flex-1">
              {showMap ? (
                <HotelMapView 
                  hotels={mapToHotelType(filteredHotels)} 
                  onToggleMap={() => setShowMap(false)} 
                />
              ) : (
                <>
                  <div className="mb-5 flex justify-between items-center">
                    <HotelViewToggle 
                      viewMode={viewMode} 
                      onChange={setViewMode} 
                    />
                    
                    <input
                      type="text"
                      placeholder="Search hotels..."
                      className="border border-stone-300 rounded-md px-3 py-1.5 text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {viewMode === 'list' ? (
                    <HotelListView
                      hotels={mapToHotelType(filteredHotels)}
                      isLoading={isLoading}
                      hasError={hasError}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                    />
                  ) : (
                    <HotelGridView
                      hotels={mapToHotelType(filteredHotels)}
                      isLoading={isLoading}
                      hasError={hasError}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                    />
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hotels;
