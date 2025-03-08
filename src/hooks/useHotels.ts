
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Hotel, FilterOptions } from "@/components/admin/hotels/types";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";

export const useHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priceRange: [0, 50000],
    starRating: [],
    amenities: [],
    maxPrice: 50000
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { user } = useAuth();
  const { favorites, loading: favoritesLoading } = useFavorites(user);

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (!favoritesLoading) {
      applyFilters();
    }
  }, [showFavoritesOnly, favorites, favoritesLoading]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("hotels")
        .select("*, rooms(*)");

      if (error) throw error;

      if (data) {
        // Transform data to match the Hotel type
        const mappedHotels: Hotel[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          location: item.location,
          stars: item.stars,
          pricePerNight: item.price_per_night,
          image: item.image,
          status: item.status as "active" | "inactive",
          description: item.description || "",
          amenities: item.amenities || [],
          featured: item.featured || false,
          reviewCount: item.review_count || 0,
          rating: item.rating || 0,
          // Ensure gallery is an array regardless of what comes from the database
          gallery: Array.isArray(item.gallery) ? item.gallery : [],
          categories: item.categories || [],
          rooms: item.rooms?.map((room: any) => ({
            type: room.type,
            capacity: room.capacity,
            price: room.price,
            count: room.count
          })) || [],
          seasonalPricing: []
        }));

        setHotels(mappedHotels);
        setFilteredHotels(mappedHotels);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    applyFilters();
  };

  const applyFilters = () => {
    let filtered = [...hotels];

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(hotel => 
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      hotel => hotel.pricePerNight >= filterOptions.priceRange[0] && 
               hotel.pricePerNight <= filterOptions.priceRange[1]
    );

    // Filter by star rating if any selected
    if (filterOptions.starRating.length > 0) {
      filtered = filtered.filter(hotel => 
        filterOptions.starRating.includes(hotel.stars)
      );
    }

    // Filter by amenities if any selected
    if (filterOptions.amenities.length > 0) {
      filtered = filtered.filter(hotel => 
        filterOptions.amenities.every(amenity => 
          hotel.amenities.includes(amenity)
        )
      );
    }

    // Filter by favorites
    if (showFavoritesOnly && user) {
      const favoriteHotelIds = favorites
        .filter(fav => fav.item_type === 'hotel')
        .map(fav => fav.item_id);
      
      filtered = filtered.filter(hotel => 
        favoriteHotelIds.includes(hotel.id)
      );
    }

    setFilteredHotels(filtered);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
    setTimeout(() => applyFilters(), 0);
  };

  const handleClearFilters = () => {
    setFilterOptions({
      priceRange: [0, 50000],
      starRating: [],
      amenities: [],
      maxPrice: 50000
    });
    setSearchTerm("");
    setShowFavoritesOnly(false);
    setFilteredHotels(hotels);
  };

  const toggleFavoritesFilter = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  return {
    hotels,
    filteredHotels,
    loading,
    searchTerm,
    setSearchTerm,
    filterOptions,
    showFavoritesOnly,
    fetchHotels,
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    toggleFavoritesFilter
  };
};
