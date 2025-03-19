
import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, HeatmapLayer } from '@react-google-maps/api';
import { Hotel } from '@/components/admin/hotels/types';
import MapMarkers from './MapMarkers';
import { Hotel as IntegrationHotel } from '@/integrations/supabase/custom-types';
import { convertAdminToIntegrationHotels, convertIntegrationToAdminHotels } from '@/utils/hotelTypeAdapter';

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
  compareList?: Hotel[];
  onAddToCompare?: (hotelId: number) => void;
  isInCompare?: (hotelId: number) => boolean;
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
  showHeatmap = false,
  compareList = [],
  onAddToCompare,
  isInCompare = () => false,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [heatmapData, setHeatmapData] = useState<google.maps.LatLng[]>([]);
  
  // Convert AdminHotel to IntegrationHotel for markers
  const integrationHotels = convertAdminToIntegrationHotels(hotels);
  
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

  // Helper function for safely converting types
  const handleMarkerSelect = (hotelIntegration: IntegrationHotel) => {
    // Find the matching admin hotel
    const adminHotel = hotels.find(h => h.id === hotelIntegration.id);
    if (adminHotel) {
      setSelectedMarker(adminHotel);
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      options={options}
      onLoad={handleMapLoad}
      onBoundsChanged={handleBoundsChanged}
    >
      {/* Heatmap layer - Enhanced professional visualization */}
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

      {/* Map Markers Component */}
      <MapMarkers 
        hotels={integrationHotels}
        selectedHotelId={selectedHotelId}
        selectedMarker={selectedMarker ? convertAdminToIntegrationHotels([selectedMarker])[0] : null}
        setSelectedMarker={handleMarkerSelect}
        handleHotelSelect={handleHotelSelect}
        onAddToCompare={onAddToCompare}
        isInCompare={isInCompare}
      />
    </GoogleMap>
  );
};

export default GoogleMapComponent;
