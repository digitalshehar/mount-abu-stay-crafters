
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface NoHotelsFoundProps {
  clearFilters: () => void;
}

const NoHotelsFound = ({ clearFilters }: NoHotelsFoundProps) => {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 text-center shadow-sm">
      <div className="flex justify-center mb-4">
        <Search className="h-10 w-10 text-stone-300" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">No hotels found</h3>
      <p className="text-stone-600 mb-4 text-sm sm:text-base">
        Try adjusting your filters or search criteria.
      </p>
      <Button onClick={clearFilters} className="w-full sm:w-auto">Clear Filters</Button>
    </div>
  );
};

export default NoHotelsFound;
