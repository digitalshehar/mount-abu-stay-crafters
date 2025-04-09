
import { useState, useCallback, useEffect } from 'react';
import { Hotel } from '@/types';

interface FilterOptions {
  searchQuery: string;
  priceRange: number[];
  selectedStars: number[];
  selectedAmenities: string[];
}

export const useHotelFilters = (hotels: any[]) => {
  const [filteredHotels, setFilteredHotels] = useState<any[]>(hotels);
  const [commonAmenities, setCommonAmenities] = useState<string[]>([]);
  
  // Extract common amenities from all hotels
  useEffect(() => {
    if (hotels && hotels.length > 0) {
      // Create a Set of all amenities that appear in at least 2 hotels
      const amenitiesCounts = new Map<string, number>();
      
      // Count occurrences of each amenity
      hotels.forEach(hotel => {
        if (hotel.amenities && Array.isArray(hotel.amenities)) {
          hotel.amenities.forEach((amenity: string) => {
            amenitiesCounts.set(amenity, (amenitiesCounts.get(amenity) || 0) + 1);
          });
        }
      });
      
      // Filter amenities that appear in at least 2 hotels
      const commonAmenitiesList = Array.from(amenitiesCounts.entries())
        .filter(([_, count]) => count >= 2)
        .map(([amenity]) => amenity);
      
      setCommonAmenities(commonAmenitiesList);
    }
  }, [hotels]);
  
  // Reset filtered hotels when original hotels change
  useEffect(() => {
    setFilteredHotels(hotels);
  }, [hotels]);
  
  // Apply filters
  const applyFilters = useCallback((options: FilterOptions) => {
    const { searchQuery, priceRange, selectedStars, selectedAmenities } = options;
    
    const filtered = hotels.filter(hotel => {
      // Search query filter
      const searchMatch = !searchQuery || 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hotel.description && hotel.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Price range filter
      const pricePerNight = hotel.pricePerNight || hotel.price || hotel.price_per_night || 0;
      const priceMatch = !priceRange || (
        pricePerNight >= priceRange[0] && 
        pricePerNight <= priceRange[1]
      );
      
      // Star rating filter
      const starMatch = !selectedStars.length || 
        selectedStars.includes(hotel.stars);
      
      // Amenities filter
      const amenitiesMatch = !selectedAmenities.length || 
        (hotel.amenities && 
          selectedAmenities.every(amenity => 
            hotel.amenities.includes(amenity)
          )
        );
      
      return searchMatch && priceMatch && starMatch && amenitiesMatch;
    });
    
    setFilteredHotels(filtered);
  }, [hotels]);
  
  // Reset filters
  const resetFilters = useCallback(() => {
    setFilteredHotels(hotels);
  }, [hotels]);
  
  return {
    filteredHotels,
    commonAmenities,
    applyFilters,
    resetFilters
  };
};
