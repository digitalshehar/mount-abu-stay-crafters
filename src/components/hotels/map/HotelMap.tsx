
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map, Marker, Popup } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { StarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MapLoading from './MapLoading';

// Define the Hotel type for markers
interface HotelMapProps {
  hotels: any[];
  selectedHotelId: number | null;
  setSelectedHotelId: (id: number | null) => void;
  center?: [number, number];
  zoom?: number;
  onMapMove?: (bounds: mapboxgl.LngLatBounds) => void;
}

// Configure Mapbox
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2w1eXB5em01MDI2aTNkcGR0YWczeHB1YSJ9.ra5ncza3_0dXaOU5g8EiVQ';

const HotelMap: React.FC<HotelMapProps> = ({ 
  hotels, 
  selectedHotelId, 
  setSelectedHotelId,
  center = [72.7156, 24.5927], // Mount Abu coordinates
  zoom = 13,
  onMapMove
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const markersRef = useRef<{ [id: number]: Marker }>({});
  const [popupInfo, setPopupInfo] = useState<{ id: number, lngLat: [number, number] } | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const navigate = useNavigate();

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainer.current) return;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center,
      zoom,
      scrollZoom: true,
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true
    }), 'top-right');

    // Add attribution in bottom-left
    map.current.addControl(new mapboxgl.AttributionControl({
      compact: true
    }), 'bottom-left');

    // Handle map load event
    map.current.on('load', () => {
      setMapLoaded(true);
    });

    // Handle map move events to update visible hotels
    if (onMapMove) {
      map.current.on('moveend', () => {
        if (map.current) {
          const bounds = map.current.getBounds();
          onMapMove(bounds);
        }
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add markers for hotels
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    hotels.forEach(hotel => {
      if (!hotel.latitude || !hotel.longitude) return;

      // Create marker element
      const el = document.createElement('div');
      el.className = 'hotel-marker';
      el.innerHTML = `<div class="price-marker ${hotel.id === selectedHotelId ? 'selected' : ''}">₹${Math.round(hotel.price_per_night)}</div>`;
      
      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat([hotel.longitude, hotel.latitude])
        .addTo(map.current!);
        
      // Add click event to marker
      el.addEventListener('click', () => {
        setSelectedHotelId(hotel.id);
        setPopupInfo({ id: hotel.id, lngLat: [hotel.longitude, hotel.latitude] });
      });
      
      // Store marker for future reference
      markersRef.current[hotel.id] = marker;
    });

  }, [hotels, selectedHotelId, mapLoaded]);

  // Show popup for selected hotel
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Remove any existing popups
    const popups = document.getElementsByClassName('mapboxgl-popup');
    while(popups[0]) {
      popups[0].remove();
    }
    
    // If a hotel is selected, show a popup
    if (selectedHotelId && popupInfo && popupInfo.id === selectedHotelId) {
      const selectedHotel = hotels.find(h => h.id === selectedHotelId);
      if (!selectedHotel) return;
      
      // Create popup
      const popup = new mapboxgl.Popup({ closeButton: false, offset: 25 })
        .setLngLat(popupInfo.lngLat)
        .setHTML(`
          <div class="hotel-popup">
            <img src="${selectedHotel.image}" alt="${selectedHotel.name}" class="popup-image" />
            <div class="popup-content">
              <h3 class="popup-title">${selectedHotel.name}</h3>
              <div class="popup-rating">
                ${Array(selectedHotel.stars).fill(0).map(() => '★').join('')}
              </div>
              <div class="popup-price">₹${Math.round(selectedHotel.price_per_night)}/night</div>
              <button class="popup-button">View Details</button>
            </div>
          </div>
        `)
        .addTo(map.current);
        
      // Add click event to the "View Details" button
      const button = document.querySelector('.popup-button');
      if (button) {
        button.addEventListener('click', () => {
          navigate(`/hotel/${selectedHotel.slug}`);
        });
      }
    }
  }, [selectedHotelId, popupInfo, hotels, mapLoaded]);

  // Fly to selected hotel
  useEffect(() => {
    if (!map.current || !selectedHotelId || !mapLoaded) return;
    
    const selectedHotel = hotels.find(h => h.id === selectedHotelId);
    if (!selectedHotel || !selectedHotel.latitude || !selectedHotel.longitude) return;
    
    map.current.flyTo({
      center: [selectedHotel.longitude, selectedHotel.latitude],
      zoom: 15,
      duration: 1000
    });
  }, [selectedHotelId, mapLoaded]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-stone-200 shadow-sm">
      {!mapLoaded && <MapLoading />}
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default HotelMap;
