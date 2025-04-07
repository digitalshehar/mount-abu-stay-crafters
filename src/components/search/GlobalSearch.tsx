
import React, { useState, useEffect } from "react";
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandInput, 
  CommandList 
} from "@/components/ui/command";
import { GlobalSearchProps } from "./types";
import { useSearchResults } from "./useSearchResults";
import { useSearchNavigation } from "./useSearchNavigation";
import SearchResultGroups from "./SearchResultGroups";

export function GlobalSearch({ open = false, setOpen }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(open);
  const { searchQuery, results, isLoading, handleSearch } = useSearchResults();
  const { handleSelect } = useSearchNavigation();

  // Update internal state when props change
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  // Set up keyboard shortcut (Ctrl+K) to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
        if (setOpen) setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  // Handle dialog open state change
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (setOpen) setOpen(open);
  };

  // Group results by type
  const groupedResults = results.reduce<Record<string, typeof results>>((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {});

  // Handle search result selection and close dialog
  const handleResultSelect = (result: typeof results[0]) => {
    setIsOpen(false);
    if (setOpen) setOpen(false);
    handleSelect(result);
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={handleOpenChange}>
      <CommandInput 
        placeholder="Search hotels, homes, activities..." 
        value={searchQuery}
        onValueChange={handleSearch}
      />
      <CommandList>
        <CommandEmpty>
          {isLoading ? (
            <div className="p-4 text-center text-sm">
              Searching...
            </div>
          ) : (
            <div className="p-4 text-center text-sm">
              No results found.
            </div>
          )}
        </CommandEmpty>
        
        <SearchResultGroups 
          groupedResults={groupedResults} 
          onSelect={handleResultSelect} 
        />
      </CommandList>
    </CommandDialog>
  );
}
