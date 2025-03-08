
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HotelSearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const HotelSearchSection = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch 
}: HotelSearchSectionProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold font-display">
          Hotels in Mount Abu
        </h1>
        <p className="text-stone-600 mt-1">
          Find your perfect accommodation for your stay in Mount Abu
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex w-full md:w-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
          <Input
            placeholder="Search hotels or locations..."
            className="pl-10 w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit" className="ml-2">
          Search
        </Button>
      </form>
    </div>
  );
};

export default HotelSearchSection;
