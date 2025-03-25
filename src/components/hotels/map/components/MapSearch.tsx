
import React, { useState, useCallback } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Hotel } from '@/integrations/supabase/custom-types';

interface MapSearchProps {
  onSearch: (query: string, hotels: Hotel[]) => Hotel[];
  isSearching: boolean;
  hotels: Hotel[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({ 
  onSearch, 
  isSearching, 
  hotels,
  searchQuery,
  setSearchQuery
}) => {
  const [inputValue, setInputValue] = useState(searchQuery);
  
  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue, hotels);
  }, [inputValue, onSearch, hotels]);
  
  const clearSearch = useCallback(() => {
    setInputValue('');
    setSearchQuery('');
    onSearch('', hotels);
  }, [setSearchQuery, onSearch, hotels]);
  
  return (
    <div className="absolute top-4 left-4 z-10 w-64 lg:w-80">
      <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
        <Input
          type="text"
          placeholder="Search hotels on map..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
        />
        {inputValue && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={clearSearch}
            className="h-8 w-8 mr-1"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button 
          type="submit" 
          variant="ghost" 
          size="icon"
          disabled={isSearching}
          className="h-10 w-10 bg-primary/5 mr-1 rounded-r-lg"
        >
          {isSearching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default MapSearch;
