
import { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useMapFunctions = (hotels: any[]) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [activeInfoWindow, setActiveInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 24.5925, lng: 72.7156 }); // Mount Abu coordinates
  const [mapZoom, setMapZoom] = useState(14);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<any | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Parse URL params for map state (center, zoom, selected hotel)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    // Get center from URL or use default
    const lat = parseFloat(searchParams.get('lat') || '24.5925');
    const lng = parseFloat(searchParams.get('lng') || '72.7156');
    if (!isNaN(lat) && !isNaN(lng)) {
      setMapCenter({ lat, lng });
    }
    
    // Get zoom from URL or use default
    const zoom = parseInt(searchParams.get('zoom') || '14');
    if (!isNaN(zoom)) {
      setMapZoom(zoom);
    }
    
    // Get selected hotel from URL
    const hotelId = searchParams.get('hotel');
    if (hotelId && hotels.length) {
      const hotel = hotels.find(h => h.id.toString() === hotelId);
      if (hotel) {
        setSelectedHotel(hotel);
      }
    }
  }, [location.search, hotels]);

  // Update URL when map state changes
  const updateMapUrl = useCallback((center: google.maps.LatLng, zoom: number, hotelId?: number) => {
    const searchParams = new URLSearchParams(location.search);
    
    // Update center
    if (center) {
      searchParams.set('lat', center.lat().toFixed(6));
      searchParams.set('lng', center.lng().toFixed(6));
    }
    
    // Update zoom
    searchParams.set('zoom', zoom.toString());
    
    // Update selected hotel
    if (hotelId) {
      searchParams.set('hotel', hotelId.toString());
    } else {
      searchParams.delete('hotel');
    }
    
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [location.pathname, location.search, navigate]);

  // Handle map click (close info windows)
  const handleMapClick = useCallback(() => {
    if (activeInfoWindow) {
      activeInfoWindow.close();
      setActiveInfoWindow(null);
    }
    setSelectedHotel(null);
    updateMapUrl(mapRef?.getCenter() as google.maps.LatLng, mapRef?.getZoom() || 14);
  }, [activeInfoWindow, mapRef, updateMapUrl]);

  // Handle map drag end (update URL)
  const handleMapDragEnd = useCallback(() => {
    if (mapRef) {
      const center = mapRef.getCenter();
      const zoom = mapRef.getZoom() || 14;
      updateMapUrl(center as google.maps.LatLng, zoom, selectedHotel?.id);
    }
  }, [mapRef, selectedHotel, updateMapUrl]);

  // Handle map zoom changed (update URL)
  const handleMapZoomChanged = useCallback(() => {
    if (mapRef) {
      const center = mapRef.getCenter();
      const zoom = mapRef.getZoom() || 14;
      updateMapUrl(center as google.maps.LatLng, zoom, selectedHotel?.id);
    }
  }, [mapRef, selectedHotel, updateMapUrl]);

  // Create markers for hotels
  const createMarkers = useCallback(() => {
    if (!mapRef || !hotels.length) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    const newBounds = new google.maps.LatLngBounds();
    const newMarkers: google.maps.Marker[] = [];
    
    hotels.forEach(hotel => {
      if (!hotel.latitude || !hotel.longitude) return;
      
      const position = {
        lat: parseFloat(hotel.latitude),
        lng: parseFloat(hotel.longitude)
      };
      
      // Skip if invalid coordinates
      if (isNaN(position.lat) || isNaN(position.lng)) return;
      
      // Create marker
      const marker = new google.maps.Marker({
        position,
        map: mapRef,
        title: hotel.name,
        icon: {
          url: hotel.featured
            ? '/images/marker-featured.svg'
            : '/images/marker-standard.svg',
          scaledSize: new google.maps.Size(32, 32)
        },
        animation: google.maps.Animation.DROP
      });
      
      // Create info window content
      const contentString = `
        <div class="p-2 max-w-xs">
          <div class="font-bold text-base mb-1">${hotel.name}</div>
          <div class="text-sm mb-1">${hotel.location}</div>
          <div class="text-primary font-semibold">₹${hotel.price_per_night}/night</div>
          <div class="mt-2">
            <a href="/hotel/${hotel.id}" class="text-sm text-blue-600 hover:underline">
              View Details
            </a>
          </div>
        </div>
      `;
      
      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 300
      });
      
      // Add marker click listener
      marker.addListener('click', () => {
        // Close any open info window
        if (activeInfoWindow) {
          activeInfoWindow.close();
        }
        
        // Open new info window
        infoWindow.open(mapRef, marker);
        setActiveInfoWindow(infoWindow);
        setSelectedHotel(hotel);
        
        // Update URL
        updateMapUrl(
          mapRef.getCenter() as google.maps.LatLng,
          mapRef.getZoom() || 14,
          hotel.id
        );
      });
      
      // Extend bounds to include this marker
      newBounds.extend(position);
      newMarkers.push(marker);
    });
    
    setMarkers(newMarkers);
    setBounds(newBounds);
    
    // If there are markers and map is not already fitted to bounds
    if (newMarkers.length > 0 && !mapLoaded) {
      mapRef.fitBounds(newBounds);
      setMapLoaded(true);
    }
  }, [mapRef, hotels, markers, activeInfoWindow, mapLoaded, updateMapUrl]);

  // Handle map load
  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
    
    // Add map event listeners
    map.addListener('click', handleMapClick);
    map.addListener('dragend', handleMapDragEnd);
    map.addListener('zoom_changed', handleMapZoomChanged);
  }, [handleMapClick, handleMapDragEnd, handleMapZoomChanged]);

  // Update markers when hotels or map changes
  useEffect(() => {
    if (mapRef && hotels.length) {
      createMarkers();
    }
  }, [mapRef, hotels, createMarkers]);

  // Focus on selected hotel
  useEffect(() => {
    if (mapRef && selectedHotel && selectedHotel.latitude && selectedHotel.longitude) {
      const position = {
        lat: parseFloat(selectedHotel.latitude),
        lng: parseFloat(selectedHotel.longitude)
      };
      
      if (!isNaN(position.lat) && !isNaN(position.lng)) {
        mapRef.panTo(position);
        
        // Find and click the marker for this hotel
        const marker = markers.find(m => 
          m.getPosition()?.lat() === position.lat &&
          m.getPosition()?.lng() === position.lng
        );
        
        if (marker) {
          google.maps.event.trigger(marker, 'click');
        }
      }
    }
  }, [mapRef, selectedHotel, markers]);

  return {
    mapRef,
    mapCenter,
    mapZoom,
    markers,
    bounds,
    selectedHotel,
    setSelectedHotel,
    onMapLoad,
    handleMapClick,
    handleMapDragEnd,
    handleMapZoomChanged
  };
};
