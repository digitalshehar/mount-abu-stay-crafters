
import { useState, useEffect, useMemo } from "react";
import { Hotel as AdminHotel } from "@/components/admin/hotels/types";
import { Hotel } from "@/integrations/supabase/custom-types";

export const useHotelFilters = (hotels: (AdminHotel | Hotel)[], searchQuery: string) => {
  console.log("useHotelFilters called with", hotels.length, "hotels");
  
  // Default price range
  const maxPrice = useMemo(() => {
    return hotels.length > 0
      ? Math.max(...hotels.map(hotel => hotel.pricePerNight || 0)) + 1000
      : 10000;
  }, [hotels]);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Reset price range when maxPrice changes
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  // Extract common amenities from all hotels
  const commonAmenities = useMemo(() => {
    console.log("Computing common amenities");
    if (hotels.length === 0) return [];
    
    const amenitiesMap: Record<string, number> = {};
    
    hotels.forEach(hotel => {
      const hotelAmenities = hotel.amenities || [];
      if (Array.isArray(hotelAmenities)) {
        hotelAmenities.forEach(amenity => {
          amenitiesMap[amenity] = (amenitiesMap[amenity] || 0) + 1;
        });
      }
    });
    
    // Sort amenities by frequency
    return Object.entries(amenitiesMap)
      .sort((a, b) => b[1] - a[1])
      .map(([amenity]) => amenity)
      .slice(0, 10); // Take top 10 amenities
  }, [hotels]);

  // Handle star rating filter
  const handleStarFilter = (star: number) => {
    setSelectedStars(prev => {
      if (prev.includes(star)) {
        return prev.filter(s => s !== star);
      } else {
        return [...prev, star];
      }
    });
  };

  // Handle amenity filter
  const handleAmenityFilter = (amenity: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(a => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedStars([]);
    setSelectedAmenities([]);
    setPriceRange([0, maxPrice]);
  };

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedStars.length > 0) count++;
    if (selectedAmenities.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++;
    return count;
  }, [selectedStars, selectedAmenities, priceRange, maxPrice]);

  // Filter hotels based on criteria
  const filteredHotels = useMemo(() => {
    console.log("Filtering hotels with criteria:", {
      searchQuery,
      priceRange,
      selectedStars,
      selectedAmenities
    });
    
    if (!hotels || hotels.length === 0) {
      console.log("No hotels to filter");
      return [];
    }
    
    return hotels.filter(hotel => {
      // Filter by search query
      if (searchQuery && !hotel.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by price range
      const price = hotel.pricePerNight || 0;
      if (price < priceRange[0] || price > priceRange[1]) {
        return false;
      }
      
      // Filter by star rating
      if (selectedStars.length > 0 && !selectedStars.includes(hotel.stars)) {
        return false;
      }
      
      // Filter by amenities
      if (selectedAmenities.length > 0) {
        const hotelAmenities = hotel.amenities || [];
        if (!Array.isArray(hotelAmenities)) return false;
        
        for (const amenity of selectedAmenities) {
          if (!hotelAmenities.includes(amenity)) {
            return false;
          }
        }
      }
      
      return true;
    });
  }, [hotels, searchQuery, priceRange, selectedStars, selectedAmenities]);

  console.log("useHotelFilters returning", filteredHotels.length, "filtered hotels");

  return {
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
  };
};
