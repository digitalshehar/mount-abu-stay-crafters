
import { useState, useEffect, useCallback } from "react";
import { Hotel } from "@/types";

export const useHotelFilters = (
  hotels: any[],
  initialSearchQuery: string = ""
) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 15000]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [filteredHotels, setFilteredHotels] = useState(hotels || []);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("recommended");

  // Get common amenities from all hotels for filter options
  const commonAmenities = Array.from(
    new Set(
      hotels
        ?.flatMap((hotel) => hotel.amenities || [])
        .filter(Boolean)
    )
  ).sort() as string[];

  // Update filtered hotels when filters or hotels change
  useEffect(() => {
    if (!hotels || hotels.length === 0) return;
    
    let filtered = [...hotels];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(hotel =>
        hotel.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hotel.description && hotel.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (hotel.amenities && Array.isArray(hotel.amenities) &&
          hotel.amenities.some((amenity: string) =>
            amenity.toLowerCase().includes(searchQuery.toLowerCase())
          ))
      );
    }
    
    // Apply star filter
    if (selectedStars.length > 0) {
      filtered = filtered.filter(hotel => selectedStars.includes(hotel.stars));
    }
    
    // Apply price filter
    filtered = filtered.filter(hotel => {
      const price = hotel.pricePerNight || hotel.price || hotel.price_per_night || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Apply amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(hotel =>
        hotel.amenities && Array.isArray(hotel.amenities) &&
        selectedAmenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }
    
    // Apply sorting
    filtered = sortHotels(filtered, sortOption);
    
    setFilteredHotels(filtered);
  }, [hotels, searchQuery, selectedStars, selectedAmenities, priceRange, sortOption]);

  // Update active filter count
  useEffect(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedStars.length > 0) count++;
    if (selectedAmenities.length > 0) count++;
    if (priceRange[0] !== 1000 || priceRange[1] !== 15000) count++;
    setActiveFilterCount(count);
  }, [searchQuery, selectedStars, selectedAmenities, priceRange]);

  // Sort hotels based on selected option
  const sortHotels = (hotelsToSort: any[], sortBy: string) => {
    const sorted = [...hotelsToSort];
    
    switch (sortBy) {
      case "price_low":
        return sorted.sort((a, b) => {
          const priceA = a.pricePerNight || a.price || a.price_per_night || 0;
          const priceB = b.pricePerNight || b.price || b.price_per_night || 0;
          return priceA - priceB;
        });
        
      case "price_high":
        return sorted.sort((a, b) => {
          const priceA = a.pricePerNight || a.price || a.price_per_night || 0;
          const priceB = b.pricePerNight || b.price || b.price_per_night || 0;
          return priceB - priceA;
        });
        
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        
      case "name":
        return sorted.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        
      case "recommended":
      default:
        // Sort by a combination of rating and featured status
        return sorted.sort((a, b) => {
          // Featured hotels first
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          
          // Then by rating
          const ratingDiff = (b.rating || 0) - (a.rating || 0);
          if (ratingDiff !== 0) return ratingDiff;
          
          // If ratings are equal, sort by price
          const priceA = a.pricePerNight || a.price || a.price_per_night || 0;
          const priceB = b.pricePerNight || b.price || b.price_per_night || 0;
          return priceA - priceB;
        });
    }
  };

  const handleStarFilter = useCallback((star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star)
        ? prev.filter((s) => s !== star)
        : [...prev, star]
    );
  }, []);

  const handleAmenityFilter = useCallback((amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setPriceRange([1000, 15000]);
    setSelectedStars([]);
    setSelectedAmenities([]);
  }, []);

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
    activeFilterCount,
    filteredHotels,
    handleStarFilter,
    handleAmenityFilter,
    clearFilters,
    commonAmenities,
    isFilterOpen,
    setIsFilterOpen,
    toggleFilterDrawer,
    sortOption,
    setSortOption
  };
};
