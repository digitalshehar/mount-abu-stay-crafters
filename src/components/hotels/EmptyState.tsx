
import React from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onReset?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-stone-50 rounded-lg text-center">
      <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mb-4">
        <Search className="h-8 w-8 text-stone-500" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
      <p className="text-stone-500 max-w-md mb-6">
        We couldn't find any hotels matching your search criteria. Try adjusting your filters or search for another location.
      </p>
      
      {onReset && (
        <Button 
          variant="outline" 
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Reset Filters
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
