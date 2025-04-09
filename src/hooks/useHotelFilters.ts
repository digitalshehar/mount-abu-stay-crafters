
import { useState, useCallback } from 'react';
import { Hotel } from '@/components/admin/hotels/types';

interface FilterParams {
  searchQuery: string;
  priceRange: [number, number];
  selectedStars: number[];
  selectedAmenities: string[];
}

export const useHotelFilters = (initialHotels: Hotel[] = []) => {
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(initialHotels);
  
  // Extract unique amenities from all hotels
  const commonAmenities = Array.from(
    new Set(
      initialHotels.flatMap(hotel => hotel.amenities || [])
    )
  ).sort();

  // Apply filters
  const applyFilters = useCallback(
    ({ searchQuery, priceRange, selectedStars, selectedAmenities }: FilterParams) => {
      let filtered = [...initialHotels];

      // Filter by search query
      if (searchQuery.trim()) {
        const search = searchQuery.toLowerCase();
        filtered = filtered.filter(
          hotel =>
            hotel.name.toLowerCase().includes(search) ||
            hotel.location.toLowerCase().includes(search)
        );
      }

      // Filter by price range
      if (priceRange.length === 2) {
        filtered = filtered.filter(
          hotel => {
            const price = hotel.pricePerNight || 0;
            return price >= priceRange[0] && price <= priceRange[1];
          }
        );
      }

      // Filter by star rating
      if (selectedStars.length > 0) {
        filtered = filtered.filter(hotel => selectedStars.includes(hotel.stars));
      }

      // Filter by amenities
      if (selectedAmenities.length > 0) {
        filtered = filtered.filter(hotel =>
          selectedAmenities.every(amenity => hotel.amenities?.includes(amenity))
        );
      }

      setFilteredHotels(filtered);
    },
    [initialHotels]
  );

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilteredHotels(initialHotels);
  }, [initialHotels]);

  return {
    filteredHotels,
    commonAmenities,
    applyFilters,
    resetFilters
  };
};
