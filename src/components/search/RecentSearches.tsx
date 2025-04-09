
import React from "react";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Clock, X } from "lucide-react";
import { SearchResult } from "./types";
import SearchResultIcon from "./SearchResultIcon";
import { clearRecentSearches } from "./utils/searchStorage";

interface RecentSearchesProps {
  recentSearches: SearchResult[];
  onSelect: (result: SearchResult) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ 
  recentSearches, 
  onSelect 
}) => {
  if (recentSearches.length === 0) return null;
  
  return (
    <CommandGroup heading="Recent Searches" className="relative">
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          clearRecentSearches();
        }}
        className="absolute right-2 top-1 text-xs text-muted-foreground hover:text-foreground flex items-center"
      >
        <X className="h-3 w-3 mr-1" />
        Clear
      </button>
      
      {recentSearches.map((result) => (
        <CommandItem
          key={`recent-${result.type}-${result.id}`}
          onSelect={() => onSelect(result)}
          className="flex items-center"
        >
          <div className="flex items-center mr-2">
            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
            <SearchResultIcon type={result.type} className="h-4 w-4" />
          </div>
          <div>
            <div>{result.name}</div>
            {result.location && (
              <div className="text-xs text-muted-foreground">{result.location}</div>
            )}
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

export default RecentSearches;
