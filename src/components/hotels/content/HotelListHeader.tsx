
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import HotelSorting from '../HotelSorting';
import CompareButton from '../CompareButton';
import { useIsMobile } from "@/hooks/use-mobile";

interface HotelListHeaderProps {
  filteredHotelCount: number;
  isLoading: boolean;
  activeFilterCount: number;
  compareCount: number;
  sortOption: string;
  onToggleFilter: () => void;
  onToggleCompare: () => void;
  setSortOption: (option: string) => void;
}

const HotelListHeader: React.FC<HotelListHeaderProps> = ({
  filteredHotelCount,
  isLoading,
  activeFilterCount,
  compareCount,
  sortOption,
  onToggleFilter,
  onToggleCompare,
  setSortOption
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-wrap justify-between items-center gap-3">
      <div className="flex items-center">
        <h1 className="text-xl sm:text-2xl font-bold">
          Hotels in Mount Abu {!isLoading && `(${filteredHotelCount})`}
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        {isMobile && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilter}
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Button>
        )}
        
        <HotelSorting 
          sortOption={sortOption} 
          setSortOption={setSortOption} 
        />
        
        <CompareButton 
          compareCount={compareCount} 
          onToggleDrawer={onToggleCompare} 
        />
      </div>
    </div>
  );
};

export default HotelListHeader;
