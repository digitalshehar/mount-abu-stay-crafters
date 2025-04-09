
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Grid, List, Map, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HotelListHeaderProps {
  count: number;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: 'grid' | 'list' | 'map';
  onViewModeChange: (mode: 'grid' | 'list' | 'map') => void;
  onOpenFilters: () => void;
  isLoading?: boolean;
}

const HotelListHeader: React.FC<HotelListHeaderProps> = ({ 
  count, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  onOpenFilters,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-between items-center mb-6">
        <div className="animate-pulse h-6 w-32 bg-stone-200 rounded"></div>
        <div className="flex items-center gap-2">
          <div className="animate-pulse h-9 w-32 bg-stone-200 rounded"></div>
          <div className="animate-pulse h-9 w-20 bg-stone-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold">
        {count} {count === 1 ? 'hotel' : 'hotels'} found
      </h2>
      
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2">
          <Select 
            value={sortBy} 
            onValueChange={onSortChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="hidden lg:flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("rounded-none", viewMode === 'grid' && "bg-muted")}
            onClick={() => onViewModeChange('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("rounded-none", viewMode === 'list' && "bg-muted")}
            onClick={() => onViewModeChange('list')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className={cn("rounded-none", viewMode === 'map' && "bg-muted")}
            onClick={() => onViewModeChange('map')}
          >
            <Map className="h-4 w-4" />
          </Button>
        </div>
        
        <Button variant="outline" size="sm" onClick={onOpenFilters} className="sm:ml-2">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </div>
    </div>
  );
};

export default HotelListHeader;
