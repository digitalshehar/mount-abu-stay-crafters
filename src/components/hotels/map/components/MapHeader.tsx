
import React from 'react';
import { ArrowLeft, List, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MapHeaderProps {
  selectedHotel: any | null;
  hotelsCount: number;
  onOpenFilter: () => void;
}

const MapHeader: React.FC<MapHeaderProps> = ({ selectedHotel, hotelsCount, onOpenFilter }) => {
  return (
    <div className="bg-white p-4 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link to="/hotels">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        
        {selectedHotel ? (
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-primary mr-2" />
            <h1 className="text-lg font-medium">{selectedHotel.name}</h1>
          </div>
        ) : (
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-primary mr-2" />
            <h1 className="text-lg font-medium">Map View</h1>
            <span className="ml-2 text-sm text-muted-foreground">
              {hotelsCount} {hotelsCount === 1 ? 'hotel' : 'hotels'} found
            </span>
          </div>
        )}
      </div>
      
      <Button variant="outline" size="sm" onClick={onOpenFilter}>
        <List className="h-4 w-4 mr-2" />
        Filters
      </Button>
    </div>
  );
};

export default MapHeader;
