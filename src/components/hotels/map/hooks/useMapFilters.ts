
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
  
  // Map search state
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Hotel[]>([]);
  
  // Handle map bounds
  const { mapBounds, setMapBounds } = useMapBounds();
  
  // Calculate active filter count
  const activeFilterCount = useMemo(() => (
    (searchQuery ? 1 : 0) + 
    (mapSearchQuery ? 1 : 0) +
    selectedStars.length + 
    selectedAmenities.length + 
    (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0)
  ), [searchQuery, mapSearchQuery, selectedStars, selectedAmenities, priceRange]);
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setMapSearchQuery('');
    setSelectedStars([]);
    setSelectedAmenities([]);
    setPriceRange([0, 20000]);
    setSearchResults([]);
  }, [setSearchQuery, setSelectedStars, setSelectedAmenities, setPriceRange]);
  
  // Handle map search
  const handleMapSearch = useCallback((query: string, hotels: Hotel[]) => {
    setMapSearchQuery(query);
    setIsSearching(true);
    
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const results = hotels.filter(hotel => 
      hotel.name.toLowerCase().includes(lowercaseQuery) ||
      hotel.location.toLowerCase().includes(lowercaseQuery) ||
      (hotel.amenities && hotel.amenities.some(amenity => 
        amenity.toLowerCase().includes(lowercaseQuery)
      ))
    );
    
    setSearchResults(results);
    setIsSearching(false);
    
    return results;
  }, []);
  
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
      
      // Filter by map search query results
      if (mapSearchQuery && searchResults.length > 0) {
        if (!searchResults.some(result => result.id === hotel.id)) {
          return false;
        }
      }
      
      return true;
    });
  }, [searchQuery, selectedStars, selectedAmenities, priceRange, mapSearchQuery, searchResults]);
  
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
    mapSearchQuery,
    setMapSearchQuery,
    handleMapSearch,
    isSearching,
    searchResults,
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
