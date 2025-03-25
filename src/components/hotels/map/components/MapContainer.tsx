
import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MapLoading from '../MapLoading';

interface MapContainerProps {
  center: { lat: number; lng: number };
  zoom: number;
  onLoad: (map: google.maps.Map) => void;
  children?: React.ReactNode;
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

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 160px)',
  minHeight: '600px'
};

const MapContainer: React.FC<MapContainerProps> = ({ center, zoom, onLoad, children }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  if (!isLoaded) {
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
