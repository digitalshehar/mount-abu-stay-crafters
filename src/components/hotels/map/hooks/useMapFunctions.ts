
import { useState, useCallback } from 'react';
import { Hotel } from '@/integrations/supabase/custom-types';

// Mount Abu center coordinates
const DEFAULT_CENTER = {
  lat: 24.5927,
  lng: 72.7156,
};

// Default zoom level
const DEFAULT_ZOOM = 13;

export const useMapFunctions = (hotels: Hotel[]) => {
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  
  // Handle map load
  const onMapLoad = useCallback((map: google.maps.Map) => {
    // Initialize map features or set default behaviors
    console.log('Map loaded');
  }, []);
  
  return {
    mapCenter,
    setMapCenter,
    mapZoom,
    setMapZoom,
    selectedHotel,
    setSelectedHotel,
    onMapLoad
  };
};
