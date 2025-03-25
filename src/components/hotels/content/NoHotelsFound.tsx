
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw } from 'lucide-react';

interface NoHotelsFoundProps {
  clearFilters: () => void;
}

const NoHotelsFound: React.FC<NoHotelsFoundProps> = ({ clearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-stone-100 p-4 mb-4">
        <Search className="h-8 w-8 text-stone-500" />
      </div>
      <h3 className="text-xl font-semibold text-stone-800 mb-2">No hotels found</h3>
      <p className="text-stone-600 max-w-md mb-6">
        We couldn't find any hotels matching your current filters. Try adjusting your search criteria or clearing filters.
      </p>
      <Button onClick={clearFilters} className="flex items-center">
        <RefreshCw className="h-4 w-4 mr-2" />
        Clear all filters
      </Button>
    </div>
  );
};

export default NoHotelsFound;
