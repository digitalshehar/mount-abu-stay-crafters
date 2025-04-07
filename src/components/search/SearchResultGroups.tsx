
import React from "react";
import { CommandGroup } from "@/components/ui/command";
import { SearchResult } from "./types";
import SearchResultItem from "./SearchResultItem";

interface SearchResultGroupsProps {
  groupedResults: Record<string, SearchResult[]>;
  onSelect: (result: SearchResult) => void;
}

export const getGroupLabel = (type: string): string => {
  switch (type) {
    case "hotel":
      return "Hotels";
    case "home":
      return "Homes & Apartments";
    case "destination":
      return "Destinations";
    case "adventure":
      return "Activities";
    case "bike":
      return "Bike Rentals";
    case "car":
      return "Car Rentals";
    default:
      return "Results";
  }
};

const SearchResultGroups: React.FC<SearchResultGroupsProps> = ({ groupedResults, onSelect }) => {
  return (
    <>
      {Object.entries(groupedResults).map(([type, items]) => (
        <CommandGroup key={type} heading={getGroupLabel(type)}>
          {items.map((result) => (
            <SearchResultItem 
              key={`${result.type}-${result.id}`}
              result={result} 
              onSelect={onSelect} 
            />
          ))}
        </CommandGroup>
      ))}
    </>
  );
};

export default SearchResultGroups;
