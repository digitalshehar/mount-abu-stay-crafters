
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hotel } from '@/components/admin/hotels/types';

interface HotelMapViewProps {
  hotels: Hotel[];
  onToggleMap: () => void;
}

const HotelMapView: React.FC<HotelMapViewProps> = ({ hotels, onToggleMap }) => {
  // This is a placeholder component
  // In a real application, you would integrate with Google Maps or similar
  return (
    <div className="relative rounded-lg bg-stone-200 h-[600px] flex items-center justify-center">
      <Button 
        variant="outline" 
        size="sm" 
        className="absolute top-4 right-4 bg-white" 
        onClick={onToggleMap}
      >
        <X className="h-4 w-4 mr-1" /> Close Map
      </Button>
      
      <div className="text-center p-6">
        <h3 className="text-lg font-medium mb-2">Hotel Map View</h3>
        <p className="text-stone-500 mb-4">Map integration would be displayed here</p>
        <div className="text-sm text-stone-600">
          Showing {hotels.length} hotels in Mount Abu
        </div>
      </div>
    </div>
  );
};

export default HotelMapView;
