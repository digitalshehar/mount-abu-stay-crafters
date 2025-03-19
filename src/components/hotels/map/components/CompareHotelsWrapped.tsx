
import React from 'react';
import { Hotel } from '@/components/admin/hotels/types';
import CompareHotelsFeature from '@/components/hotels/comparison/CompareHotelsFeature';

interface CompareHotelsWrappedProps {
  hotels: Hotel[];
  compareList: Hotel[];
  onAddToCompare: (id: number) => void;
  onRemoveFromCompare: (id: number) => void;
  onClearCompare: () => void;
}

const CompareHotelsWrapped: React.FC<CompareHotelsWrappedProps> = ({
  hotels,
  compareList,
  onAddToCompare,
  onRemoveFromCompare,
  onClearCompare
}) => {
  return (
    <CompareHotelsFeature
      hotels={hotels}
      compareList={compareList}
      onAddToCompare={onAddToCompare}
      onRemoveFromCompare={onRemoveFromCompare}
      onClearCompare={onClearCompare}
    />
  );
};

export default CompareHotelsWrapped;
