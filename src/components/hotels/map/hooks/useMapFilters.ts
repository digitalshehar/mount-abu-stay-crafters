
import { useState, useCallback } from 'react';
import { Hotel } from '@/components/admin/hotels/types';

export const useMapFilters = () => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 15000]);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  
  // Get active filter count
  const activeFilterCount = 
    (searchQuery ? 1 : 0) + 
    selectedStars.length + 
    selectedAmenities.length + 
    (priceRange[0] !== 1000 || priceRange[1] !== 15000 ? 1 : 0);
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStars([]);
    setSelectedAmenities([]);
    setPriceRange([1000, 15000]);
  };
  
  // Handle star filter toggle
  const handleStarFilter = (star: number) => {
    setSelectedStars(prev => 
      prev.includes(star) 
        ? prev.filter(s => s !== star) 
        : [...prev, star]
    );
  };
  
  // Handle amenity filter toggle
  const handleAmenityFilter = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  // Calculate filtered hotels based on filters
  const filterHotels = useCallback((hotels: Hotel[]) => {
    return hotels.filter(hotel => {
      // Search query filter
      if (searchQuery && !hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !hotel.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Star rating filter
      if (selectedStars.length > 0 && !selectedStars.includes(hotel.stars)) {
        return false;
      }
      
      // Price range filter
      if (hotel.pricePerNight < priceRange[0] || hotel.pricePerNight > priceRange[1]) {
        return false;
      }
      
      // Amenities filter
      if (selectedAmenities.length > 0) {
        for (const amenity of selectedAmenities) {
          if (!hotel.amenities.includes(amenity)) {
            return false;
          }
        }
      }
      
      return true;
    });
  }, [searchQuery, selectedStars, priceRange, selectedAmenities]);

  // Filter visible hotels based on map bounds
  const getVisibleHotels = useCallback((filteredHotels: Hotel[], viewMode: 'map' | 'list') => {
    return mapBounds && viewMode === 'map'
      ? filteredHotels.filter(hotel => 
          hotel.latitude && 
          hotel.longitude && 
          hotel.latitude >= mapBounds.getSouthWest().lat() && 
          hotel.latitude <= mapBounds.getNorthEast().lat() && 
          hotel.longitude >= mapBounds.getSouthWest().lng() && 
          hotel.longitude <= mapBounds.getNorthEast().lng()
        )
      : filteredHotels;
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
