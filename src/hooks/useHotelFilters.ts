
import { useState, useMemo, useCallback } from 'react';
import { Hotel } from '@/components/admin/hotels/types';

export const useHotelFilters = (hotels: Hotel[], initialSearch: string = '') => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  
  // Get all unique amenities from the hotels
  const commonAmenities = useMemo(() => {
    const amenitiesMap = new Map<string, number>();
    
    hotels.forEach(hotel => {
      if (hotel.amenities) {
        hotel.amenities.forEach(amenity => {
          const count = amenitiesMap.get(amenity) || 0;
          amenitiesMap.set(amenity, count + 1);
        });
      }
    });
    
    // Sort by popularity (count)
    return Array.from(amenitiesMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([amenity]) => amenity)
      .slice(0, 10); // Take the 10 most common
  }, [hotels]);
  
  // Handler for star rating filter
  const handleStarFilter = useCallback((star: number) => {
    setSelectedStars(prev => 
      prev.includes(star) 
        ? prev.filter(s => s !== star) 
        : [...prev, star]
    );
  }, []);
  
  // Handler for amenity filter
  const handleAmenityFilter = useCallback((amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  }, []);
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedStars([]);
    setSelectedAmenities([]);
    setPriceRange([0, 10000]);
  }, []);
  
  // Toggle filter drawer (for mobile)
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilterDrawer = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);
  
  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    count += selectedStars.length;
    count += selectedAmenities.length;
    if (priceRange[0] > 0 || priceRange[1] < 10000) count++;
    return count;
  }, [searchQuery, selectedStars, selectedAmenities, priceRange]);
  
  // Filter hotels based on selected criteria
  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel => {
      // Filter by search query
      const matchesSearch = !searchQuery || 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hotel.description && hotel.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Filter by star rating
      const matchesStars = selectedStars.length === 0 || selectedStars.includes(hotel.stars);
      
      // Filter by amenities
      const matchesAmenities = selectedAmenities.length === 0 || 
        selectedAmenities.every(amenity => hotel.amenities && hotel.amenities.includes(amenity));
      
      // Filter by price range
      const matchesPrice = hotel.pricePerNight >= priceRange[0] && hotel.pricePerNight <= priceRange[1];
      
      return matchesSearch && matchesStars && matchesAmenities && matchesPrice;
    });
  }, [hotels, searchQuery, selectedStars, selectedAmenities, priceRange]);
  
  return {
    searchQuery,
    setSearchQuery,
    selectedStars,
    setSelectedStars,
    selectedAmenities,
    setSelectedAmenities,
    priceRange,
    setPriceRange,
    activeFilterCount,
    filteredHotels,
    handleStarFilter,
    handleAmenityFilter,
    clearFilters,
    commonAmenities,
    isFilterOpen,
    setIsFilterOpen,
    toggleFilterDrawer
  };
};
