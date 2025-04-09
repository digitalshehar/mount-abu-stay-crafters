
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ListFilter, Grid } from 'lucide-react';

interface HotelViewToggleProps {
  viewMode: string;
  onChange: (value: string) => void;
}

const HotelViewToggle: React.FC<HotelViewToggleProps> = ({ viewMode, onChange }) => {
  return (
    <ToggleGroup type="single" value={viewMode} onValueChange={(value) => {
      if (value) onChange(value);
    }}>
      <ToggleGroupItem value="list" aria-label="List view">
        <ListFilter className="h-4 w-4 mr-2" />
        List
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <Grid className="h-4 w-4 mr-2" />
        Grid
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default HotelViewToggle;
