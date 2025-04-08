
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SearchResult } from "./types";
import { debounce } from "./utils/debounce";
import { getRecentSearches } from "./utils/searchStorage";
import { useResponsive } from "@/context/ResponsiveContext";

export const useSearchResults = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);
  const { isMobile } = useResponsive();

  // Load recent searches on initial render
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // The actual search function
  const performSearch = async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Search hotels - limit results on mobile
      const resultsLimit = isMobile ? 3 : 5;

      // Search hotels
      const { data: hotels } = await supabase
        .from("hotels")
        .select("id, name, slug, location, image")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(resultsLimit);

      // Search apartments/homes (hotels with apartment category)
      const { data: homes } = await supabase
        .from("hotels")
        .select("id, name, slug, location, image")
        .contains('categories', ['apartment'])
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(resultsLimit);

      // Search destinations
      const { data: destinations } = await supabase
        .from("destinations")
        .select("id, name, slug, location, image")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(resultsLimit);

      // Search adventures
      const { data: adventures } = await supabase
        .from("adventures")
        .select("id, name, slug, location, image")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(resultsLimit);

      // Search bike rentals
      const { data: bikes } = await supabase
        .from("bike_rentals")
        .select("id, name, image")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(resultsLimit);

      // Search car rentals
      const { data: cars } = await supabase
        .from("car_rentals")
        .select("id, name, image")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(resultsLimit);
        
      // Search early hotels
      const { data: earlyHotels } = await supabase
        .from("early_hotels")
        .select("id, name, location, image")
        .ilike("name", `%${query}%`)
        .order("name")
        .limit(resultsLimit);

      // Combine results
      const combinedResults: SearchResult[] = [
        ...(hotels || []).map(hotel => ({ ...hotel, type: "hotel" as const })),
        ...(homes || []).map(home => ({ ...home, type: "home" as const })),
        ...(destinations || []).map(dest => ({ ...dest, type: "destination" as const })),
        ...(adventures || []).map(adv => ({ ...adv, type: "adventure" as const })),
        ...(bikes || []).map(bike => ({ ...bike, type: "bike" as const })),
        ...(cars || []).map(car => ({ ...car, type: "car" as const })),
        ...(earlyHotels || []).map(earlyHotel => ({ ...earlyHotel, type: "early-hotel" as const }))
      ];

      setResults(combinedResults);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a debounced version of the search function - shorter delay on mobile
  const debounceTime = isMobile ? 200 : 300;
  const debouncedSearch = useCallback(debounce(performSearch, debounceTime), [isMobile]);

  // Handle search query changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Refresh recent searches
  const refreshRecentSearches = () => {
    setRecentSearches(getRecentSearches());
  };

  return {
    searchQuery,
    results,
    isLoading,
    recentSearches,
    handleSearch,
    refreshRecentSearches
  };
};
