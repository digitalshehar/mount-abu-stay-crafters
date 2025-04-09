
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HotelSortOptionsProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const HotelSortOptions: React.FC<HotelSortOptionsProps> = ({
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-stone-500">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-stone-300 rounded py-1 px-2 text-sm bg-white pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="recommended">Recommended</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Rating</option>
        <option value="reviews">Most Reviews</option>
      </select>
      <div className="relative inline-block">
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default HotelSortOptions;
