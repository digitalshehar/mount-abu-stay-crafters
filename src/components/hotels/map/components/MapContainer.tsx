
import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MapLoading from '../MapLoading';

interface MapContainerProps {
  center: { lat: number; lng: number };
  zoom: number;
  onLoad: (map: google.maps.Map) => void;
  children?: React.ReactNode;
  isLoading?: boolean;
  isLoaded?: boolean;
  mapContainerStyle?: { width: string; height: string };
  mountAbuCenter?: { lat: number; lng: number };
  mapOptions?: any;
  filteredHotels?: any[];
  selectedHotelId?: number | null;
  selectedMarker?: any;
  setSelectedMarker?: (hotel: any) => void;
  handleHotelSelect?: (id: number) => void;
  handleBoundsChanged?: () => void;
  showHeatmap?: boolean;
  compareList?: number[];
  onAddToCompare?: (id: number) => void;
  isInCompare?: (id: number) => boolean;
}

// Map styles for a cleaner look
const mapStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  }
];

const defaultMapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 160px)',
  minHeight: '600px'
};

const MapContainer: React.FC<MapContainerProps> = ({ 
  center, 
  zoom, 
  onLoad, 
  children,
  mapContainerStyle = defaultMapContainerStyle,
  isLoading,
  isLoaded: explicitIsLoaded,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  // Use explicit isLoaded prop if provided, otherwise use the hook's isLoaded
  const mapIsLoaded = explicitIsLoaded !== undefined ? explicitIsLoaded : isLoaded;

  if (!mapIsLoaded || isLoading) {
    return <MapLoading />;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      options={{
        styles: mapStyles,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        }
      }}
    >
      {children}
    </GoogleMap>
  );
};

export default MapContainer;
