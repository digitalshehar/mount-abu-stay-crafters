
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HotelSortOptionsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const HotelSortOptions: React.FC<HotelSortOptionsProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-stone-500 whitespace-nowrap">Sort by:</span>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recommended">Recommended</SelectItem>
          <SelectItem value="price_low">Price: Low to High</SelectItem>
          <SelectItem value="price_high">Price: High to Low</SelectItem>
          <SelectItem value="rating">Highest Rating</SelectItem>
          <SelectItem value="popularity">Most Popular</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HotelSortOptions;
