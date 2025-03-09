
import React from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DestinationInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DestinationInput: React.FC<DestinationInputProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center h-full">
      <MapPin className="h-5 w-5 text-blue-500 mr-2" />
      <div className="flex-grow">
        <label htmlFor="search-location" className="block text-xs text-stone-500 mb-1">
          Destination
        </label>
        <Input
          id="search-location"
          type="text"
          placeholder="Mount Abu, Rajasthan"
          value={searchQuery}
          onChange={handleQueryChange}
          className="border-none shadow-none focus-visible:ring-0 p-0 h-auto text-base"
        />
      </div>
    </div>
  );
};

export default DestinationInput;
