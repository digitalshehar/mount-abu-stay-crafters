
import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { Hotel } from '@/integrations/supabase/custom-types';
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';

interface MapMarkersProps {
  hotels: Hotel[];
  selectedHotelId: number | null;
  selectedMarker: Hotel | null;
  setSelectedMarker: (hotel: Hotel | null) => void;
  handleHotelSelect: (id: number) => void;
  compareList?: AdminHotel[];
  onAddToCompare?: (hotelId: number) => void;
  isInCompare?: (hotelId: number) => boolean;
}

const MapMarkers: React.FC<MapMarkersProps> = ({
  hotels,
  selectedHotelId,
  selectedMarker,
  setSelectedMarker,
  handleHotelSelect,
  compareList = [],
  onAddToCompare,
  isInCompare = () => false,
}) => {
  return (
    <>
      {/* Map hotel markers */}
      {hotels.map((hotel) => (
        <Marker
          key={hotel.id}
          position={{ 
            lat: hotel.latitude || 0, 
            lng: hotel.longitude || 0
          }}
          onClick={() => setSelectedMarker(hotel)}
          animation={selectedHotelId === hotel.id ? google.maps.Animation.BOUNCE : undefined}
          icon={{
            url: isInCompare(hotel.id) 
              ? "/marker-compare.svg" 
              : (hotel.featured 
                ? "/marker-featured.svg" 
                : "/marker.svg"),
            scaledSize: new google.maps.Size(30, 40)
          }}
        />
      ))}

      {/* InfoWindow for selected marker */}
      {selectedMarker && (
        <InfoWindow
          position={{ 
            lat: selectedMarker.latitude || 0, 
            lng: selectedMarker.longitude || 0
          }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className="max-w-[250px] p-2">
            <h3 className="font-semibold text-gray-800 mb-1">{selectedMarker.name}</h3>
            <p className="text-xs text-gray-600 mb-1">{selectedMarker.location}</p>
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(selectedMarker.stars)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xs">★</span>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                ({selectedMarker.rating || 0})
              </span>
            </div>
            <p className="text-sm font-medium text-green-600 mb-2">
              ₹{selectedMarker.price_per_night}/night
            </p>
            <div className="flex gap-2 mt-2">
              <Button
                onClick={() => handleHotelSelect(selectedMarker.id)}
                className="text-xs px-2 py-1 h-auto"
                size="sm"
              >
                View Details
              </Button>
              
              {onAddToCompare && (
                <Button
                  onClick={() => onAddToCompare(selectedMarker.id)}
                  className="text-xs px-2 py-1 h-auto"
                  variant={isInCompare(selectedMarker.id) ? "secondary" : "outline"}
                  size="sm"
                  disabled={isInCompare(selectedMarker.id)}
                >
                  {isInCompare(selectedMarker.id) ? (
                    <><Check className="h-3 w-3 mr-1" /> In Compare</>
                  ) : (
                    <><Plus className="h-3 w-3 mr-1" /> Compare</>
                  )}
                </Button>
              )}
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MapMarkers;
