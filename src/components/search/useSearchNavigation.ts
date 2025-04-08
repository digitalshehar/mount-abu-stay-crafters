
import { useNavigate } from "react-router-dom";
import { SearchResult } from "./types";
import { addToRecentSearches } from "./utils/searchStorage";

export const useSearchNavigation = () => {
  const navigate = useNavigate();

  const handleSelect = (result: SearchResult) => {
    // Add to recent searches
    addToRecentSearches(result);
    
    // Navigate based on type
    switch (result.type) {
      case "hotel":
        navigate(`/hotel/${result.slug || result.id}`);
        break;
      case "home":
        navigate(`/hotels?type=apartment&search=${encodeURIComponent(result.name)}`);
        break;
      case "destination":
        navigate(`/destination/${result.slug || result.id}`);
        break;
      case "adventure":
        navigate(`/adventure/${result.slug || result.id}`);
        break;
      case "bike":
        navigate(`/bike-rentals?search=${encodeURIComponent(result.name)}`);
        break;
      case "car":
        navigate(`/rentals/car?search=${encodeURIComponent(result.name)}`);
        break;
    }
  };

  return { handleSelect };
};
