
import React from 'react';
import { Hotel } from '@/components/admin/hotels/types';
import { MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HotelMapViewProps {
  hotels: Hotel[];
  onToggleMap: () => void;
}

const HotelMapView: React.FC<HotelMapViewProps> = ({ hotels, onToggleMap }) => {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <Button 
          size="sm" 
          variant="secondary" 
          className="flex items-center gap-1" 
          onClick={onToggleMap}
        >
          <X className="h-4 w-4" />
          Close Map
        </Button>
      </div>
      
      <div className="h-[600px] bg-stone-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
          <h3 className="text-lg font-semibold mb-1">Map View</h3>
          <p className="text-stone-500 max-w-md px-4">
            Map integration will display {hotels.length} hotels in Mount Abu.
          </p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {hotels.slice(0, 3).map(hotel => (
          <div key={hotel.id} className="bg-white p-3 rounded-md border border-stone-200 flex items-center gap-3">
            <div className="w-16 h-16 bg-stone-100 rounded overflow-hidden flex-shrink-0">
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{hotel.name}</h4>
              <p className="text-xs text-stone-500 truncate">{hotel.location}</p>
              <p className="text-xs font-medium text-primary mt-1">₹{hotel.pricePerNight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelMapView;
