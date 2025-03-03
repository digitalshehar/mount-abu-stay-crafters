
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HotelSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HotelSearchBar = ({ searchQuery, setSearchQuery }: HotelSearchBarProps) => {
  return (
    <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
        <Input
          placeholder="Search hotels by name or location..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button variant="outline" className="gap-2">
        <Filter size={16} />
        Filters
      </Button>
    </div>
  );
};

export default HotelSearchBar;
