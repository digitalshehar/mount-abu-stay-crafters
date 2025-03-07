
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Hotel, FilterOptions, NewHotel } from "@/components/admin/hotels/types";
import { useToast } from "@/components/ui/use-toast";

export const useHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getMaxPrice = () => {
    if (hotels.length === 0) return 10000;
    return Math.max(...hotels.map(hotel => hotel.pricePerNight)) + 1000;
  };

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priceRange: [0, getMaxPrice()] as [number, number],
    starRating: [],
    amenities: [],
    maxPrice: getMaxPrice()
  });

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .order("name");

      if (error) throw error;

      const formattedHotels = data.map((hotel: any) => ({
        id: hotel.id,
        name: hotel.name,
        slug: hotel.slug || hotel.name.toLowerCase().replace(/\s+/g, "-"),
        location: hotel.location,
        stars: hotel.stars,
        pricePerNight: hotel.price_per_night,
        image: hotel.image,
        status: hotel.status,
        description: hotel.description || "",
        amenities: hotel.amenities || [],
        featured: hotel.featured || false,
        reviewCount: hotel.review_count || 0,
        rating: hotel.rating || 0,
        rooms: [],
      }));

      setHotels(formattedHotels);
      setFilteredHotels(formattedHotels);
      
      const maxPrice = Math.max(...formattedHotels.map(hotel => hotel.pricePerNight)) + 1000;
      setFilterOptions(prev => ({
        ...prev,
        priceRange: [prev.priceRange[0], maxPrice] as [number, number],
        maxPrice: maxPrice
      }));
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching hotels",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (hotels: Hotel[]) => {
    if (!hotels.length) return [];
    
    return hotels.filter(hotel => {
      const priceInRange = hotel.pricePerNight >= filterOptions.priceRange[0] && 
                          hotel.pricePerNight <= filterOptions.priceRange[1];
      
      const starMatch = filterOptions.starRating.length === 0 || 
                        filterOptions.starRating.includes(hotel.stars);
      
      const amenitiesMatch = filterOptions.amenities.length === 0 || 
                            filterOptions.amenities.every(amenity => 
                              hotel.amenities.includes(amenity));
      
      return priceInRange && starMatch && amenitiesMatch;
    });
  };

  const applySearchAndFilters = () => {
    let result = [...hotels];
    
    if (searchTerm.trim()) {
      result = result.filter(
        hotel =>
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    result = applyFilters(result);
    
    setFilteredHotels(result);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applySearchAndFilters();
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
    
    setTimeout(() => {
      applySearchAndFilters();
    }, 0);
  };

  const handleClearFilters = () => {
    const resetFilters = {
      priceRange: [0, getMaxPrice()] as [number, number],
      starRating: [],
      amenities: [],
      maxPrice: getMaxPrice()
    };
    
    setFilterOptions(resetFilters);
    
    setTimeout(() => {
      applySearchAndFilters();
    }, 0);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    applySearchAndFilters();
  }, [filterOptions]);

  return {
    hotels,
    filteredHotels,
    searchTerm,
    setSearchTerm,
    loading,
    filterOptions,
    fetchHotels,
    handleSearch,
    handleFilterChange,
    handleClearFilters
  };
};
