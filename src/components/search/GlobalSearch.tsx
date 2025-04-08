
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
import RecentSearches from "./RecentSearches";
import { useResponsive } from "@/context/ResponsiveContext";

export function GlobalSearch({ open = false, setOpen }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(open);
  const { 
    searchQuery, 
    results, 
    isLoading, 
    recentSearches,
    handleSearch,
    refreshRecentSearches
  } = useSearchResults();
  const { handleSelect } = useSearchNavigation();
  const { isMobile } = useResponsive();

  // Update internal state when props change
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  // Set up keyboard shortcut (Ctrl+K) to open search (on desktop only)
  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) return;
    
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
        if (setOpen) setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen, isMobile]);

  // Handle dialog open state change
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (setOpen) setOpen(open);
    
    // Refresh recent searches when opening the dialog
    if (open) {
      refreshRecentSearches();
    }
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

  // Apply mobile-specific styling
  const mobileClass = isMobile ? "w-full h-[90vh] rounded-t-xl" : "";

  return (
    <CommandDialog 
      open={isOpen} 
      onOpenChange={handleOpenChange}
      className={mobileClass}
    >
      <CommandInput 
        placeholder="Search hotels, homes, activities..." 
        value={searchQuery}
        onValueChange={handleSearch}
        className={isMobile ? "text-base p-4" : ""}
      />
      <CommandList className={isMobile ? "max-h-[75vh]" : ""}>
        <CommandEmpty>
          {isLoading ? (
            <div className="p-4 text-center text-sm">
              Searching...
            </div>
          ) : searchQuery.length > 0 ? (
            <div className="p-4 text-center text-sm">
              No results found.
            </div>
          ) : null}
        </CommandEmpty>
        
        {/* Show recent searches when there's no query */}
        {!searchQuery && recentSearches.length > 0 && (
          <RecentSearches 
            recentSearches={recentSearches} 
            onSelect={handleResultSelect} 
          />
        )}
        
        {/* Show search results when there is a query */}
        {searchQuery.length > 0 && (
          <SearchResultGroups 
            groupedResults={groupedResults} 
            onSelect={handleResultSelect} 
          />
        )}
      </CommandList>
    </CommandDialog>
  );
}
