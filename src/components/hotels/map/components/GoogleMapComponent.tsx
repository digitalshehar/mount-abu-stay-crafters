
import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader, HeatmapLayer } from '@react-google-maps/api';
import { Hotel } from '@/components/admin/hotels/types';

export interface GoogleMapComponentProps {
  mapContainerStyle: any;
  center: { lat: number; lng: number };
  zoom: number;
  options: any;
  hotels: Hotel[];
  selectedHotelId: number | null;
  selectedMarker: Hotel | null;
  setSelectedMarker: (hotel: Hotel | null) => void;
  handleHotelSelect: (id: number) => void;
  onBoundsChanged?: () => void;
  onMapLoad?: (map: google.maps.Map) => void;
  showHeatmap?: boolean;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  mapContainerStyle,
  center,
  zoom,
  options,
  hotels,
  selectedHotelId,
  selectedMarker,
  setSelectedMarker,
  handleHotelSelect,
  onBoundsChanged,
  onMapLoad,
  showHeatmap = false
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [heatmapData, setHeatmapData] = useState<google.maps.LatLng[]>([]);
  
  // Create heatmap data points from hotel locations
  useEffect(() => {
    if (hotels.length > 0) {
      const points = hotels
        .filter(hotel => hotel.latitude && hotel.longitude)
        .map(hotel => {
          // Create weighted points based on hotel price or rating
          const weight = hotel.featured ? 2 : 1; // Featured hotels have more weight
          return {
            location: new google.maps.LatLng(hotel.latitude || 0, hotel.longitude || 0),
            weight
          };
        });
      
      setHeatmapData(points.map(p => p.location));
    }
  }, [hotels]);
  
  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    if (onMapLoad) onMapLoad(mapInstance);
  }, [onMapLoad]);

  const handleBoundsChanged = useCallback(() => {
    if (onBoundsChanged) onBoundsChanged();
  }, [onBoundsChanged]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      options={options}
      onLoad={handleMapLoad}
      onBoundsChanged={handleBoundsChanged}
    >
      {/* Heatmap layer */}
      {showHeatmap && heatmapData.length > 0 && (
        <HeatmapLayer
          data={heatmapData}
          options={{
            radius: 20,
            opacity: 0.7,
            gradient: [
              'rgba(0, 255, 255, 0)',
              'rgba(0, 255, 255, 1)',
              'rgba(0, 191, 255, 1)',
              'rgba(0, 127, 255, 1)',
              'rgba(0, 63, 255, 1)',
              'rgba(0, 0, 255, 1)',
              'rgba(0, 0, 223, 1)',
              'rgba(0, 0, 191, 1)',
              'rgba(0, 0, 159, 1)',
              'rgba(0, 0, 127, 1)',
              'rgba(63, 0, 91, 1)',
              'rgba(127, 0, 63, 1)',
              'rgba(191, 0, 31, 1)',
              'rgba(255, 0, 0, 1)'
            ]
          }}
        />
      )}

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
            url: hotel.featured 
              ? "/marker-featured.svg" 
              : "/marker.svg",
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
              ₹{selectedMarker.pricePerNight}/night
            </p>
            <button
              onClick={() => handleHotelSelect(selectedMarker.id)}
              className="text-xs bg-blue-600 text-white px-2 py-1 rounded w-full hover:bg-blue-700 transition-colors"
            >
              View Details
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
