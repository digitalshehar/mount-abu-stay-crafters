
import { useState, useCallback, useMemo } from 'react';
import { Hotel } from '@/integrations/supabase/custom-types';
import { useMapBounds } from './useMapBounds';
import { useFilterState } from './useFilterState';

export const useMapFilters = () => {
  // Use more focused hooks for state management
  const { 
    searchQuery, setSearchQuery,
    selectedStars, setSelectedStars,
    selectedAmenities, setSelectedAmenities,
    priceRange, setPriceRange,
    handleStarFilter,
    handleAmenityFilter
  } = useFilterState();
  
  // Handle map bounds
  const { mapBounds, setMapBounds } = useMapBounds();
  
  // Calculate active filter count
  const activeFilterCount = useMemo(() => (
    (searchQuery ? 1 : 0) + 
    selectedStars.length + 
    selectedAmenities.length + 
    (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0)
  ), [searchQuery, selectedStars, selectedAmenities, priceRange]);
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedStars([]);
    setSelectedAmenities([]);
    setPriceRange([0, 20000]);
  }, [setSearchQuery, setSelectedStars, setSelectedAmenities, setPriceRange]);
  
  // Filter hotels based on criteria
  const filterHotels = useCallback((hotels: Hotel[]): Hotel[] => {
    return hotels.filter(hotel => {
      // Filter by search query
      if (searchQuery && 
          !hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !hotel.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by star rating
      if (selectedStars.length > 0 && !selectedStars.includes(hotel.stars)) {
        return false;
      }
      
      // Filter by amenities
      if (selectedAmenities.length > 0) {
        const hotelAmenities = hotel.amenities || [];
        if (!selectedAmenities.every(amenity => hotelAmenities.includes(amenity))) {
          return false;
        }
      }
      
      // Filter by price range
      if (hotel.price_per_night < priceRange[0] || hotel.price_per_night > priceRange[1]) {
        return false;
      }
      
      return true;
    });
  }, [searchQuery, selectedStars, selectedAmenities, priceRange]);
  
  // Get visible hotels based on view mode and filters
  const getVisibleHotels = useCallback((hotels: Hotel[], viewMode: 'map' | 'list'): Hotel[] => {
    if (viewMode === 'map' && mapBounds) {
      return hotels.filter(hotel => {
        if (!hotel.latitude || !hotel.longitude) return false;
        
        const hotelLatLng = new google.maps.LatLng(hotel.latitude, hotel.longitude);
        return mapBounds.contains(hotelLatLng);
      });
    }
    
    return hotels;
  }, [mapBounds]);
  
  return {
    searchQuery,
    setSearchQuery,
    selectedStars,
    setSelectedStars,
    selectedAmenities,
    setSelectedAmenities,
    priceRange,
    setPriceRange,
    mapBounds,
    setMapBounds,
    activeFilterCount,
    clearFilters,
    handleStarFilter,
    handleAmenityFilter,
    filterHotels,
    getVisibleHotels
  };
};
