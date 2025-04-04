
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EarlyHotelHeaderProps {
  onAddClick: () => void;
}

const EarlyHotelHeader: React.FC<EarlyHotelHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-xl font-semibold">Early Hotel Management (Hourly Basis)</h1>
        <p className="text-muted-foreground text-sm">
          Manage hotels that can be booked by the hour for short stays
        </p>
      </div>
      
      <Button onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-2" />
        Add Early Hotel
      </Button>
    </div>
  );
};

export default EarlyHotelHeader;
