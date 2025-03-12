
import { useState, useRef, useCallback } from 'react';
import { Hotel } from '@/components/admin/hotels/types';

export function useMapState() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Hotel | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [mapZoom, setMapZoom] = useState(14);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ 
    lat: 24.5926, 
    lng: 72.7156 
  });
  const mapRef = useRef<google.maps.Map | null>(null);
  
  // Handle map load
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    // Listen for zoom changes
    map.addListener('zoom_changed', () => {
      setMapZoom(map.getZoom() || 14);
    });
    
    // Listen for center changes
    map.addListener('center_changed', () => {
      const center = map.getCenter();
      if (center) {
        setMapCenter({ 
          lat: center.lat(), 
          lng: center.lng() 
        });
      }
    });
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
          console.error("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
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
  
  // Reset map to default view
  const resetMapView = useCallback(() => {
    if (!mapRef.current) return;
    
    // Default center is Mount Abu
    const defaultCenter = { lat: 24.5926, lng: 72.7156 };
    mapRef.current.setCenter(defaultCenter);
    mapRef.current.setZoom(14);
    setMapCenter(defaultCenter);
    setMapZoom(14);
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
    mapZoom,
    mapCenter,
    onMapLoad,
    handleUserLocation,
    handleZoneSelect,
    resetMapView
  };
}
