
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Hotel, FilterOptions } from "@/components/admin/hotels/types";

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

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("hotels")
        .select("*, rooms(*)");

      if (error) throw error;

      if (data) {
        // Transform data to match the Hotel type
        const mappedHotels: Hotel[] = data.map(item => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          location: item.location,
          stars: item.stars,
          pricePerNight: item.price_per_night,
          image: item.image,
          status: item.status,
          description: item.description || "",
          amenities: item.amenities || [],
          featured: item.featured || false,
          reviewCount: item.review_count || 0,
          rating: item.rating || 0,
          gallery: item.gallery || [],
          categories: item.categories || [],
          rooms: item.rooms?.map((room: any) => ({
            type: room.type,
            capacity: room.capacity,
            price: room.price,
            count: room.count
          })) || []
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
    if (!searchTerm.trim()) {
      setFilteredHotels(hotels);
      return;
    }

    const filtered = hotels.filter(hotel => 
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredHotels(filtered);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);

    let filtered = [...hotels];

    // Filter by price range
    filtered = filtered.filter(
      hotel => hotel.pricePerNight >= newFilters.priceRange[0] && 
               hotel.pricePerNight <= newFilters.priceRange[1]
    );

    // Filter by star rating if any selected
    if (newFilters.starRating.length > 0) {
      filtered = filtered.filter(hotel => 
        newFilters.starRating.includes(hotel.stars)
      );
    }

    // Filter by amenities if any selected
    if (newFilters.amenities.length > 0) {
      filtered = filtered.filter(hotel => 
        newFilters.amenities.every(amenity => 
          hotel.amenities.includes(amenity)
        )
      );
    }

    setFilteredHotels(filtered);
  };

  const handleClearFilters = () => {
    setFilterOptions({
      priceRange: [0, 50000],
      starRating: [],
      amenities: [],
      maxPrice: 50000
    });
    setFilteredHotels(hotels);
  };

  return {
    hotels,
    filteredHotels,
    loading,
    searchTerm,
    setSearchTerm,
    filterOptions,
    fetchHotels,
    handleSearch,
    handleFilterChange,
    handleClearFilters
  };
};
