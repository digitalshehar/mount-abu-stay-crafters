
import React from "react";
import { Button } from "@/components/ui/button";

interface NoHotelsFoundProps {
  clearFilters: () => void;
}

const NoHotelsFound = ({ clearFilters }: NoHotelsFoundProps) => {
  return (
    <div className="bg-white rounded-xl p-8 text-center shadow-sm">
      <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
      <p className="text-stone-600 mb-4">
        Try adjusting your filters or search criteria.
      </p>
      <Button onClick={clearFilters}>Clear Filters</Button>
    </div>
  );
};

export default NoHotelsFound;
