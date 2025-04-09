
import React from "react";
import { CommandItem } from "@/components/ui/command";
import { SearchResult } from "./types";
import SearchResultIcon from "./SearchResultIcon";

interface SearchResultItemProps {
  result: SearchResult;
  onSelect: (result: SearchResult) => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result, onSelect }) => {
  return (
    <CommandItem
      key={`${result.type}-${result.id}`}
      onSelect={() => onSelect(result)}
      className="flex items-center"
    >
      <SearchResultIcon type={result.type} />
      <div>
        <div>{result.name}</div>
        {result.location && (
          <div className="text-xs text-muted-foreground">{result.location}</div>
        )}
      </div>
    </CommandItem>
  );
};

export default SearchResultItem;
