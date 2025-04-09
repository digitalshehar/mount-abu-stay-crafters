
import React from 'react';

interface HotelListHeaderProps {
  count: number;
  isLoading?: boolean;
}

const HotelListHeader: React.FC<HotelListHeaderProps> = ({ count, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse h-6 w-32 bg-stone-200 rounded"></div>
    );
  }

  return (
    <div className="flex items-center">
      <h2 className="text-lg font-semibold">
        {count} {count === 1 ? 'hotel' : 'hotels'} found
      </h2>
    </div>
  );
};

export default HotelListHeader;
