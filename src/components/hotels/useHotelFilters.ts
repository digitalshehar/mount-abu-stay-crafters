
import { useState, useEffect, useCallback } from "react";

export const useHotelFilters = (
  hotels: any[],
  searchQuery: string
) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 15000]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [filteredHotels, setFilteredHotels] = useState(hotels || []);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get common amenities from all hotels for filter options
  const commonAmenities = Array.from(
    new Set(
      hotels
        ?.flatMap((hotel) => hotel.amenities || [])
        .filter(Boolean)
    )
  ).sort() as string[];

  // Update filtered hotels when filters change
  useEffect(() => {
    if (!hotels) return;

    const filtered = hotels.filter((hotel) => {
      const matchesSearch =
        searchQuery === "" ||
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (hotel.amenities && Array.isArray(hotel.amenities) && 
          hotel.amenities.some((amenity: string) => 
            amenity.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      const matchesStars =
        selectedStars.length === 0 || selectedStars.includes(hotel.stars);

      const matchesPrice =
        hotel.price_per_night >= priceRange[0] && hotel.price_per_night <= priceRange[1];

      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((amenity) => 
          hotel.amenities && Array.isArray(hotel.amenities) && 
          hotel.amenities.some(hotelAmenity => 
            hotelAmenity.toLowerCase() === amenity.toLowerCase()
          )
        );

      return matchesSearch && matchesStars && matchesPrice && matchesAmenities;
    });

    setFilteredHotels(filtered);
  }, [hotels, searchQuery, selectedStars, selectedAmenities, priceRange]);

  // Update active filter count
  useEffect(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedStars.length > 0) count++;
    if (selectedAmenities.length > 0) count++;
    if (priceRange[0] !== 1000 || priceRange[1] !== 15000) count++;
    setActiveFilterCount(count);
  }, [searchQuery, selectedStars, selectedAmenities, priceRange]);

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
    setPriceRange([1000, 15000]);
    setSelectedStars([]);
    setSelectedAmenities([]);
  }, []);

  const toggleFilterDrawer = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  return {
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
    toggleFilterDrawer,
    setIsFilterOpen
  };
};
