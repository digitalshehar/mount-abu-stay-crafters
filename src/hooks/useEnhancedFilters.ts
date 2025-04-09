
import { useState, useEffect, useCallback } from 'react';
import { Hotel } from '@/types';

export const useEnhancedFilters = (hotels: Hotel[] = []) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 15000]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('recommended');
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(hotels);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  
  // Extract common amenities from all hotels
  const commonAmenities = Array.from(
    new Set(
      hotels
        .flatMap((hotel) => hotel.amenities || [])
        .filter(Boolean)
    )
  ).sort() as string[];
  
  // Update filtered hotels when filters or hotels change
  useEffect(() => {
    let filtered = [...hotels];
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(hotel =>
        hotel.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hotel.description && hotel.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply star filter
    if (selectedStars.length > 0) {
      filtered = filtered.filter(hotel => selectedStars.includes(hotel.stars || 0));
    }
    
    // Apply price filter
    filtered = filtered.filter(hotel => {
      const price = hotel.pricePerNight || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Apply amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(hotel =>
        hotel.amenities &&
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
    if (searchQuery.trim()) count++;
    if (selectedStars.length > 0) count++;
    if (selectedAmenities.length > 0) count++;
    if (priceRange[0] !== 1000 || priceRange[1] !== 15000) count++;
    setActiveFilterCount(count);
  }, [searchQuery, selectedStars, selectedAmenities, priceRange]);
  
  // Sort hotels based on selected option
  const sortHotels = (hotelsToSort: Hotel[], sortBy: string) => {
    const sorted = [...hotelsToSort];
    
    switch (sortBy) {
      case "price_low":
        return sorted.sort((a, b) => (a.pricePerNight || 0) - (b.pricePerNight || 0));
        
      case "price_high":
        return sorted.sort((a, b) => (b.pricePerNight || 0) - (a.pricePerNight || 0));
        
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
          return (b.rating || 0) - (a.rating || 0);
        });
    }
  };
  
  // Toggle star filter
  const handleStarFilter = useCallback((star: number) => {
    setSelectedStars(prev =>
      prev.includes(star)
        ? prev.filter(s => s !== star)
        : [...prev, star]
    );
  }, []);
  
  // Toggle amenity filter
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
    setPriceRange([1000, 15000]);
    setSelectedStars([]);
    setSelectedAmenities([]);
    setSortOption('recommended');
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
    sortOption,
    setSortOption
  };
};

export default useEnhancedFilters;
