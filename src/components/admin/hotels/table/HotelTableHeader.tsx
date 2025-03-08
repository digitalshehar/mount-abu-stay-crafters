
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface HotelTableHeaderProps {
  selectAll: boolean;
  onSelectAll: () => void;
}

const HotelTableHeader = ({ selectAll, onSelectAll }: HotelTableHeaderProps) => {
  return (
    <thead>
      <tr className="text-left text-xs text-stone-500 border-b">
        <th className="px-2 py-3 font-medium">
          <Checkbox 
            checked={selectAll} 
            onCheckedChange={onSelectAll} 
            aria-label="Select all hotels"
          />
        </th>
        <th className="px-6 py-3 font-medium">Hotel</th>
        <th className="px-6 py-3 font-medium">Stars</th>
        <th className="px-6 py-3 font-medium">Price</th>
        <th className="px-6 py-3 font-medium">Status</th>
        <th className="px-6 py-3 font-medium">Featured</th>
        <th className="px-6 py-3 font-medium">Actions</th>
      </tr>
    </thead>
  );
};

export default HotelTableHeader;
