
import { useState, useCallback } from 'react';

export const useFilterState = () => {
  // Search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Star rating filter
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  
  // Amenities filter
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  // Price range filter
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  
  // Handle star filter selection
  const handleStarFilter = useCallback((star: number) => {
    setSelectedStars(prev => {
      if (prev.includes(star)) {
        return prev.filter(s => s !== star);
      } else {
        return [...prev, star];
      }
    });
  }, []);
  
  // Handle amenity filter selection
  const handleAmenityFilter = useCallback((amenity: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(a => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  }, []);
  
  return {
    searchQuery,
    setSearchQuery,
    selectedStars,
    setSelectedStars,
    selectedAmenities,
    setSelectedAmenities,
    priceRange,
    setPriceRange,
    handleStarFilter,
    handleAmenityFilter
  };
};
