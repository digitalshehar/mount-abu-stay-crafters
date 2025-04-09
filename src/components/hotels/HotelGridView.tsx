
import React from 'react';
import { Hotel } from '@/types';
import HotelListHeader from './content/HotelListHeader';
import HotelContent from './HotelContent';

export interface HotelGridViewProps {
  hotels: Hotel[];
  isLoading: boolean;
  sortBy: string;
  onSortChange: (value: string) => void;
  hasError?: boolean;
  compareList?: number[];
  onAddToCompare?: (id: number) => void;
  onRemoveFromCompare?: (id: number) => void;
  isInCompare?: (id: number) => boolean;
}

const HotelGridView: React.FC<HotelGridViewProps> = ({
  hotels,
  isLoading,
  sortBy,
  onSortChange,
  hasError = false,
  compareList = [],
  onAddToCompare = () => {},
  onRemoveFromCompare = () => {},
  isInCompare = () => false,
}) => {
  // Open filters function (will dispatch a custom event for mobile view)
  const openFilters = () => {
    document.dispatchEvent(new CustomEvent('open-hotel-filters'));
  };

  return (
    <div className="space-y-6">
      <HotelListHeader
        count={hotels.length}
        sortBy={sortBy}
        onSortChange={onSortChange}
        viewMode="grid"
        onViewModeChange={() => {}}
        onOpenFilters={openFilters}
        isLoading={isLoading}
      />

      <HotelContent
        isLoading={isLoading}
        filteredHotels={hotels}
        activeFilterCount={0}
        clearFilters={() => {}}
        compareList={compareList}
        onAddToCompare={onAddToCompare}
        onRemoveFromCompare={onRemoveFromCompare}
        isInCompare={isInCompare}
      />
    </div>
  );
};

export default HotelGridView;
