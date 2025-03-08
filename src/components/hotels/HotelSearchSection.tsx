
import React, { useState } from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HotelSearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  onOpenFilters?: () => void;
  activeFilterCount?: number;
}

const HotelSearchSection = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch,
  onOpenFilters,
  activeFilterCount = 0
}: HotelSearchSectionProps) => {
  // Add immediate search as user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Optional: You can trigger search automatically after a short delay
    // using debounce for better performance
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div>
        <h1 className="text-2xl font-bold font-display">
          Hotels in Mount Abu
        </h1>
        <p className="text-stone-600 mt-1 text-sm">
          Find your perfect accommodation for your stay in Mount Abu
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <form onSubmit={handleSearch} className="flex w-full">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
            <Input
              placeholder="Search hotels by name, location or amenities..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit" className="ml-2 hidden sm:flex">
            Search
          </Button>
        </form>
        
        {onOpenFilters && (
          <Button 
            variant="outline" 
            className="flex items-center gap-1" 
            onClick={onOpenFilters}
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 rounded-full">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default HotelSearchSection;
