
import React from 'react';
import { Hotel } from '@/types';
import { MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface HotelMapViewProps {
  hotels: Hotel[];
  onToggleMap: () => void;
}

const HotelMapView: React.FC<HotelMapViewProps> = ({ hotels, onToggleMap }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-sm overflow-hidden h-[70vh]">
      <div className="absolute top-4 right-4 z-10">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onToggleMap}
          className="bg-white"
        >
          <X className="h-4 w-4 mr-2" />
          Close Map
        </Button>
      </div>
      
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Map View</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            The map view is currently in development. We're working on implementing 
            an interactive map to help you find hotels based on location.
          </p>
          <p className="text-sm text-primary mt-4">
            {hotels.length} hotels available in Mount Abu
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelMapView;
