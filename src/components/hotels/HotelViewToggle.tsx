
import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface HotelViewToggleProps {
  viewMode: string;
  onChange: (value: string) => void;
}

const HotelViewToggle: React.FC<HotelViewToggleProps> = ({ viewMode, onChange }) => {
  return (
    <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && onChange(value)}>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default HotelViewToggle;
