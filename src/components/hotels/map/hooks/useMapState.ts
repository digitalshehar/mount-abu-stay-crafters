
import { useState, useRef, useCallback } from 'react';
import { Hotel } from '@/integrations/supabase/custom-types';

// Default map settings
const mountAbuCenter = {
  lat: 24.5927,
  lng: 72.7156,
};

const defaultZoom = 13;

export const useMapState = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Hotel | null>(null);
  const [mapCenter, setMapCenter] = useState(mountAbuCenter);
  const [mapZoom, setMapZoom] = useState(defaultZoom);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  
  const handleBoundsChanged = useCallback(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      if (bounds) {
        setMapBounds(bounds);
        return {
          getSouth: () => bounds.getSouthWest().lat(),
          getNorth: () => bounds.getNorthEast().lat(),
          getWest: () => bounds.getSouthWest().lng(),
          getEast: () => bounds.getNorthEast().lng(),
        };
      }
    }
    return null;
  }, []);
  
  const handleSelectHotel = useCallback((hotel: Hotel) => {
    setSelectedMarker(hotel);
  }, []);

  return {
    mapRef,
    selectedMarker,
    setSelectedMarker,
    mapCenter,
    setMapCenter,
    mapZoom,
    setMapZoom,
    showHeatmap,
    setShowHeatmap,
    mapBounds,
    setMapBounds,
    onMapLoad,
    handleBoundsChanged,
    handleSelectHotel
  };
};
