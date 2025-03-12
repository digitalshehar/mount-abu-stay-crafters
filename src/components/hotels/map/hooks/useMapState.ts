
import { useState, useRef, useCallback } from 'react';
import { Hotel } from '@/components/admin/hotels/types';

export function useMapState() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Hotel | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  
  // Handle map load
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  
  // Handle user location
  const handleUserLocation = useCallback(() => {
    if (navigator.geolocation && mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          mapRef.current?.setCenter(pos);
          mapRef.current?.setZoom(14);
          
          // Create a marker for user location
          new google.maps.Marker({
            position: pos,
            map: mapRef.current,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
            title: "Your Location",
          });
        },
        () => {
          alert("Error: The Geolocation service failed.");
        }
      );
    } else {
      alert("Error: Your browser doesn't support geolocation.");
    }
  }, []);
  
  // Handle zone selection
  const handleZoneSelect = useCallback((bounds: any) => {
    if (!mapRef.current || !bounds) return;
    
    const newBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(bounds.getSouth(), bounds.getWest()),
      new google.maps.LatLng(bounds.getNorth(), bounds.getEast())
    );
    
    mapRef.current.fitBounds(newBounds, {
      top: 50, bottom: 50, left: 50, right: 50
    });
  }, []);
  
  return {
    viewMode,
    setViewMode,
    selectedHotelId,
    setSelectedHotelId,
    selectedMarker,
    setSelectedMarker,
    showHeatmap,
    setShowHeatmap,
    mapRef,
    onMapLoad,
    handleUserLocation,
    handleZoneSelect
  };
}
