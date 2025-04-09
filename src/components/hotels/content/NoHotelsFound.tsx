
import React from "react";
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoHotelsFoundProps {
  clearFilters: () => void;
}

const NoHotelsFound: React.FC<NoHotelsFoundProps> = ({ clearFilters }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
        <Search className="h-8 w-8 text-stone-400" />
      </div>
      <h3 className="text-xl font-semibold text-stone-800">No hotels found</h3>
      <p className="text-stone-500 max-w-md">
        We couldn't find any hotels matching your filter criteria. Try adjusting your filters or clear them to see all available hotels.
      </p>
      <Button 
        onClick={clearFilters} 
        variant="default" 
        className="mt-2 flex items-center"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Clear All Filters
      </Button>
    </div>
  );
};

export default NoHotelsFound;
