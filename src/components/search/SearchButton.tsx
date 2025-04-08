
import React, { useState } from "react";
import { Search } from "lucide-react";
import { GlobalSearch } from "./GlobalSearch";
import { useResponsive } from "@/context/ResponsiveContext";
import MobileSearchButton from "./MobileSearchButton";

const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const { isMobile } = useResponsive();

  // Use MobileSearchButton for mobile devices
  if (isMobile) {
    return <MobileSearchButton />;
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-input bg-background text-sm hover:bg-accent hover:text-accent-foreground"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <GlobalSearch open={open} setOpen={setOpen} />
    </>
  );
};

export default SearchButton;
