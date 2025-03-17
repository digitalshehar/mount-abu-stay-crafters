
import { useState, useCallback } from 'react';
import { Hotel } from '@/integrations/supabase/custom-types';

export const useMapFilters = () => {
  // Search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Star rating filter
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  
  // Amenities filter
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  // Price range filter
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  
  // Map bounds for filtering
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  
  // Calculate active filter count
  const activeFilterCount = (
    (searchQuery ? 1 : 0) + 
    selectedStars.length + 
    selectedAmenities.length + 
    (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0)
  );
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedStars([]);
    setSelectedAmenities([]);
    setPriceRange([0, 20000]);
  }, []);
  
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
      
      // Filter by map bounds if applicable
      if (mapBounds && hotel.latitude && hotel.longitude) {
        const hotelLatLng = new google.maps.LatLng(hotel.latitude, hotel.longitude);
        if (!mapBounds.contains(hotelLatLng)) {
          return false;
        }
      }
      
      return true;
    });
  }, [searchQuery, selectedStars, selectedAmenities, priceRange, mapBounds]);
  
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
