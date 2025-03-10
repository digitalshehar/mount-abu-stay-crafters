
import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { Hotel } from '@/components/admin/hotels/types';
import { formatCurrency } from '@/utils/hotel';

interface GoogleMapComponentProps {
  isLoaded: boolean;
  mapContainerStyle: any;
  center: { lat: number; lng: number };
  zoom: number;
  options: any;
  hotels: Hotel[];
  selectedHotelId: number | null;
  selectedMarker: Hotel | null;
  setSelectedMarker: (hotel: Hotel | null) => void;
  handleHotelSelect: (id: number) => void;
  onMapLoad?: (map: google.maps.Map) => void;
  onBoundsChanged?: () => void;
  showHeatmap?: boolean;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  isLoaded,
  mapContainerStyle,
  center,
  zoom,
  options,
  hotels,
  selectedHotelId,
  selectedMarker,
  setSelectedMarker,
  handleHotelSelect,
  onMapLoad,
  onBoundsChanged,
  showHeatmap = false
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [heatmap, setHeatmap] = useState<google.maps.visualization.HeatmapLayer | null>(null);

  // Map load handler
  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    if (onMapLoad) {
      onMapLoad(map);
    }
  };

  // Effect for heatmap visualization
  useEffect(() => {
    if (isLoaded && mapRef.current && hotels.length > 0 && showHeatmap) {
      try {
        // Check if visualization library is available
        if (typeof google !== 'undefined' && google.maps && google.maps.visualization) {
          // Remove existing heatmap if it exists
          if (heatmap) {
            heatmap.setMap(null);
          }
          
          // Prepare heatmap data points from hotel prices and locations
          const heatmapData = hotels
            .filter(hotel => hotel.latitude && hotel.longitude)
            .map(hotel => {
              // Higher priced hotels get more "weight" in the heatmap
              const weight = Math.min(hotel.pricePerNight / 5000, 1);
              return {
                location: new google.maps.LatLng(hotel.latitude!, hotel.longitude!),
                weight
              };
            });

          if (heatmapData.length > 0) {
            // Create new heatmap
            const newHeatmap = new google.maps.visualization.HeatmapLayer({
              data: heatmapData,
              map: showHeatmap ? mapRef.current : null,
              radius: 20,
              opacity: 0.7,
            });
            setHeatmap(newHeatmap);
          }
        } else {
          console.warn('Google Maps Visualization library not loaded');
        }
      } catch (error) {
        console.error("Error creating heatmap:", error);
      }
    } else if (heatmap && (!showHeatmap || !isLoaded)) {
      // Hide heatmap when toggled off
      heatmap.setMap(null);
    }
  }, [isLoaded, hotels, showHeatmap, heatmap]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      options={options}
      onLoad={handleMapLoad}
      onBoundsChanged={onBoundsChanged}
    >
      {/* Hotel Markers */}
      {hotels.map(hotel => {
        if (!hotel.latitude || !hotel.longitude) return null;
        
        const isSelected = selectedHotelId === hotel.id;
        const isInfoOpen = selectedMarker && selectedMarker.id === hotel.id;
        
        return (
          <MarkerF
            key={hotel.id}
            position={{ lat: hotel.latitude, lng: hotel.longitude }}
            onClick={() => {
              handleHotelSelect(hotel.id);
              setSelectedMarker(hotel);
            }}
            icon={{
              path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
              fillColor: isSelected ? '#2563eb' : '#1e293b',
              fillOpacity: 1,
              strokeColor: '#fff',
              strokeWeight: 2,
              scale: 1.2,
              labelOrigin: new google.maps.Point(0, -30)
            }}
            label={{
              text: formatCurrency(hotel.pricePerNight),
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            {isInfoOpen && (
              <InfoWindowF
                position={{ lat: hotel.latitude, lng: hotel.longitude }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="p-1 max-w-[200px]">
                  <div className="text-sm font-semibold mb-1">{hotel.name}</div>
                  <div className="text-xs text-stone-600 mb-1">{hotel.location}</div>
                  <div className="flex items-center mb-1">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={`text-xs ${i < hotel.stars ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                      ))}
                    </div>
                    <span className="text-xs text-stone-500 ml-1">({hotel.stars}-star)</span>
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {formatCurrency(hotel.pricePerNight)}/night
                  </div>
                </div>
              </InfoWindowF>
            )}
          </MarkerF>
        );
      })}
    </GoogleMap>
  ) : (
    <div>Loading Map...</div>
  );
};

export default GoogleMapComponent;
