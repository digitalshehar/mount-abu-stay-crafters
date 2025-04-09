
import React from 'react';
import { Loader2 } from 'lucide-react';

interface HotelListHeaderProps {
  count: number;
  isLoading?: boolean;
}

const HotelListHeader: React.FC<HotelListHeaderProps> = ({ count, isLoading = false }) => {
  return (
    <div className="flex items-center">
      {isLoading ? (
        <div className="flex items-center text-stone-500">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          <span>Loading hotels...</span>
        </div>
      ) : (
        <h2 className="text-xl font-semibold">
          {count} {count === 1 ? 'Hotel' : 'Hotels'} Found
        </h2>
      )}
    </div>
  );
};

export default HotelListHeader;
