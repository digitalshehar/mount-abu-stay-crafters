
import React, { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterOptions } from "@/components/admin/hotels/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import SearchInput from "./search/SearchInput";
import CurrencySelector, { Currency } from "./search/CurrencySelector";
import LanguageSelector, { Language } from "./search/LanguageSelector";
import FavoritesButton from "./search/FavoritesButton";

interface HotelSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleFilter: () => void;
  onSearch: () => void;
  activeFilters: FilterOptions;
  onClearFilters: () => void;
  showFavoritesOnly?: boolean;
  onToggleFavoritesFilter?: () => void;
}

const CURRENCIES: Currency[] = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
];

const LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
];

const HotelSearchBar: React.FC<HotelSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleFilter,
  onSearch,
  activeFilters,
  onClearFilters,
  showFavoritesOnly = false,
  onToggleFavoritesFilter,
}) => {
  const { user } = useAuth();
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  
  // Count number of active filters
  const getActiveFilterCount = () => {
    let count = 0;
    
    if (activeFilters.starRating.length > 0) count++;
    if (activeFilters.amenities.length > 0) count++;
    if (
      activeFilters.priceRange[0] > 0 ||
      activeFilters.priceRange[1] < activeFilters.maxPrice
    ) {
      count++;
    }
    
    return count;
  };
  
  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="flex flex-wrap gap-3 items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
      <div className="w-full md:w-auto flex items-center flex-1 gap-2">
        <SearchInput 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={onSearch}
        />
        <Button onClick={onSearch}>Search</Button>
      </div>
      
      <div className="flex gap-2 flex-wrap mt-3 md:mt-0">
        {/* Currency Selector */}
        <CurrencySelector 
          currency={currency} 
          setCurrency={setCurrency} 
          currencies={CURRENCIES} 
        />

        {/* Language Selector */}
        <LanguageSelector 
          language={language} 
          setLanguage={setLanguage} 
          languages={LANGUAGES} 
        />

        {/* Favorites Button */}
        {user && onToggleFavoritesFilter && (
          <FavoritesButton 
            showFavoritesOnly={showFavoritesOnly}
            onToggleFavoritesFilter={onToggleFavoritesFilter}
          />
        )}
      
        <Button
          variant="outline"
          onClick={handleFilter}
          className="gap-1 relative"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
        
        {(activeFilterCount > 0 || searchQuery || showFavoritesOnly) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default HotelSearchBar;
