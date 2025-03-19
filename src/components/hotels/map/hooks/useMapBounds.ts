
import { useState } from 'react';

export const useMapBounds = () => {
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  
  return {
    mapBounds,
    setMapBounds
  };
};
