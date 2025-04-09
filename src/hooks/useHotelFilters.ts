
import { useState, useEffect, useMemo } from "react";
import { Hotel as AdminHotel } from "@/components/admin/hotels/types";
import { Hotel } from "@/integrations/supabase/custom-types";

type HotelType = AdminHotel | Hotel;

interface FilterCriteria {
  searchQuery: string;
  priceRange: [number, number];
  selectedStars: number[];
  selectedAmenities: string[];
}

export const useHotelFilters = (hotels: HotelType[], initialSearch: string = "") => {
  console.log("useHotelFilters called with", hotels.length, "hotels");
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  
  // Default price range
  const maxPrice = useMemo(() => {
    return hotels.length > 0
      ? Math.max(...hotels.map(hotel => {
          // Handle both types of price fields
          const price = 'pricePerNight' in hotel 
            ? hotel.pricePerNight 
            : hotel.price_per_night || 0;
          return price;
        })) + 1000
      : 10000;
  }, [hotels]);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<HotelType[]>(hotels);

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
    setSearchQuery("");
  };

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedStars.length > 0) count++;
    if (selectedAmenities.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++;
    if (searchQuery) count++;
    return count;
  }, [selectedStars, selectedAmenities, priceRange, maxPrice, searchQuery]);

  // Apply filters function
  const applyFilters = (criteria: FilterCriteria) => {
    console.log("Applying filters with criteria:", criteria);
    
    if (!hotels || hotels.length === 0) {
      console.log("No hotels to filter");
      setFilteredHotels([]);
      return;
    }
    
    const filtered = hotels.filter(hotel => {
      // Filter by search query
      if (criteria.searchQuery && !hotel.name.toLowerCase().includes(criteria.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by price range
      const price = 'pricePerNight' in hotel 
        ? hotel.pricePerNight 
        : hotel.price_per_night || 0;
      
      if (price < criteria.priceRange[0] || price > criteria.priceRange[1]) {
        return false;
      }
      
      // Filter by star rating
      if (criteria.selectedStars.length > 0 && !criteria.selectedStars.includes(hotel.stars)) {
        return false;
      }
      
      // Filter by amenities
      if (criteria.selectedAmenities.length > 0) {
        const hotelAmenities = hotel.amenities || [];
        if (!Array.isArray(hotelAmenities)) return false;
        
        for (const amenity of criteria.selectedAmenities) {
          if (!hotelAmenities.includes(amenity)) {
            return false;
          }
        }
      }
      
      return true;
    });
    
    console.log(`Filtering complete: ${filtered.length} hotels match criteria`);
    setFilteredHotels(filtered);
  };

  // Initial filter application
  useEffect(() => {
    setFilteredHotels(hotels);
  }, [hotels]);

  // Apply filters when filter state changes
  useEffect(() => {
    applyFilters({
      searchQuery,
      priceRange,
      selectedStars,
      selectedAmenities
    });
  }, [searchQuery, priceRange, selectedStars, selectedAmenities, hotels]);

  // Reset filters function
  const resetFilters = () => {
    clearFilters();
    setFilteredHotels(hotels);
  };

  return {
    searchQuery,
    setSearchQuery,
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
    applyFilters,
    resetFilters
  };
};
