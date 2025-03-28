import { useState, useEffect, useCallback, useMemo } from "react";

export const useEnhancedFilters = (
  hotels: any[],
  initialSearchQuery: string = ""
) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 15000]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>("recommended");
  
  // Get common amenities from all hotels
  const commonAmenities = useMemo(() => {
    const allAmenities = new Set<string>();
    
    hotels?.forEach(hotel => {
      if (hotel.amenities && Array.isArray(hotel.amenities)) {
        hotel.amenities.forEach((amenity: string) => {
          allAmenities.add(amenity);
        });
      }
    });
    
    return Array.from(allAmenities).sort();
  }, [hotels]);
  
  // Filter hotels based on criteria
  const filteredHotels = useMemo(() => {
    if (!hotels) return [];
    
    let filtered = [...hotels];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(hotel => 
        hotel.name?.toLowerCase().includes(query) || 
        hotel.location?.toLowerCase().includes(query) ||
        (hotel.amenities && Array.isArray(hotel.amenities) && 
          hotel.amenities.some((amenity: string) => 
            amenity.toLowerCase().includes(query)
          ))
      );
    }
    
    // Apply star filter
    if (selectedStars.length > 0) {
      filtered = filtered.filter(hotel => 
        selectedStars.includes(hotel.stars)
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(hotel => 
      (hotel.pricePerNight || hotel.price_per_night) >= priceRange[0] && 
      (hotel.pricePerNight || hotel.price_per_night) <= priceRange[1]
    );
    
    // Apply amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(hotel => {
        if (!hotel.amenities || !Array.isArray(hotel.amenities)) return false;
        
        return selectedAmenities.every(amenity => 
          hotel.amenities.some((hotelAmenity: string) => 
            hotelAmenity.toLowerCase() === amenity.toLowerCase()
          )
        );
      });
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => 
          (a.pricePerNight || a.price_per_night) - (b.pricePerNight || b.price_per_night)
        );
        break;
      case "price-high":
        filtered.sort((a, b) => 
          (b.pricePerNight || b.price_per_night) - (a.pricePerNight || a.price_per_night)
        );
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "recommended":
      default:
        // Keep default sorting or implement a recommendation algorithm
        break;
    }
    
    return filtered;
  }, [hotels, searchQuery, selectedStars, priceRange, selectedAmenities, sortOption]);
  
  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedStars.length > 0) count++;
    if (selectedAmenities.length > 0) count++;
    if (priceRange[0] !== 1000 || priceRange[1] !== 15000) count++;
    return count;
  }, [searchQuery, selectedStars, selectedAmenities, priceRange]);
  
  // Handle star filter selection/deselection
  const handleStarFilter = useCallback((star: number) => {
    setSelectedStars(prev => 
      prev.includes(star) 
        ? prev.filter(s => s !== star) 
        : [...prev, star]
    );
  }, []);
  
  // Handle amenity filter selection/deselection
  const handleAmenityFilter = useCallback((amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  }, []);
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    setPriceRange([1000, 15000]);
    setSelectedStars([]);
    setSelectedAmenities([]);
    setSearchQuery("");
  }, []);
  
  // Open/close filter drawer on mobile
  const toggleFilterDrawer = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);
  
  return {
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
  };
};
