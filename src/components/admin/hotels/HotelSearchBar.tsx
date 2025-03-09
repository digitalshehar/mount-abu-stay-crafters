
import React, { useState } from "react";
import { Search, Filter, X, Heart, Globe, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterOptions } from "@/components/admin/hotels/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const CURRENCIES = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
];

const LANGUAGES = [
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

  // Handle input change without submitting immediately on mobile
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      onSearch();
    }
  };

  const handleClearSearch = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default actions
    setSearchQuery('');
    onSearch();
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
      <div className="w-full md:w-auto flex items-center flex-1 gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search hotels by name or location..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="pl-10 w-full"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={handleClearSearch}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <Button onClick={onSearch}>Search</Button>
      </div>
      
      <div className="flex gap-2 flex-wrap mt-3 md:mt-0">
        {/* Currency Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <span>{currency.symbol}</span>
              <span className="hidden sm:inline-block">{currency.code}</span>
              <ChevronsUpDown className="h-3.5 w-3.5 ml-1 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {CURRENCIES.map((curr) => (
              <DropdownMenuItem 
                key={curr.code}
                onClick={() => setCurrency(curr)}
                className="cursor-pointer"
              >
                <span className="font-medium mr-2">{curr.symbol}</span>
                <span>{curr.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Globe className="h-3.5 w-3.5" />
              <span className="hidden sm:inline-block">{language.code.toUpperCase()}</span>
              <ChevronsUpDown className="h-3.5 w-3.5 ml-1 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem 
                key={lang.code}
                onClick={() => setLanguage(lang)}
                className="cursor-pointer"
              >
                <span className="font-medium mr-2">{lang.code.toUpperCase()}</span>
                <span>{lang.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {user && onToggleFavoritesFilter && (
          <Button 
            variant={showFavoritesOnly ? "default" : "outline"} 
            size="sm"
            onClick={onToggleFavoritesFilter}
            className={cn(
              "gap-1",
              showFavoritesOnly && "bg-red-100 hover:bg-red-200 text-red-800 border-red-200"
            )}
          >
            <Heart className={cn("h-4 w-4", showFavoritesOnly && "fill-red-500")} />
            {showFavoritesOnly ? "Showing Favorites" : "Show Favorites"}
          </Button>
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
