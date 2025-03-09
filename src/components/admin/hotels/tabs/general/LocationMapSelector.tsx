
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Locate } from "lucide-react";
import { GoogleMap, Marker } from '@react-google-maps/api';

interface LocationMapSelectorProps {
  latitude: number | undefined;
  longitude: number | undefined;
  onLocationChange: (lat: number, lng: number) => void;
}

const LocationMapSelector: React.FC<LocationMapSelectorProps> = ({
  latitude,
  longitude,
  onLocationChange
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
    latitude && longitude ? { lat: latitude, lng: longitude } : null
  );
  
  // Default center (will be used if no coordinates are provided)
  const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Center of India
  
  const mapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true,
  };
  
  useEffect(() => {
    // Check if the Google Maps script is already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
    } else {
      // Load Google Maps script
      const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      if (!googleMapsApiKey) {
        console.error("Google Maps API Key is missing");
        return;
      }
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);
  
  useEffect(() => {
    if (latitude && longitude) {
      setMarkerPosition({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude]);
  
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarkerPosition({ lat, lng });
      onLocationChange(lat, lng);
    }
  };
  
  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    
    // If we have marker position, center and zoom the map on it
    if (markerPosition) {
      map.setCenter(markerPosition);
      map.setZoom(15);
    }
  };
  
  const handleUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          setMarkerPosition({ lat, lng });
          onLocationChange(lat, lng);
          
          if (mapRef.current) {
            mapRef.current.setCenter({ lat, lng });
            mapRef.current.setZoom(15);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };
  
  const updateLatitude = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lat = parseFloat(e.target.value);
    if (!isNaN(lat)) {
      setMarkerPosition(prev => prev ? { ...prev, lat } : { lat, lng: 0 });
      onLocationChange(lat, longitude || 0);
    }
  };
  
  const updateLongitude = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lng = parseFloat(e.target.value);
    if (!isNaN(lng)) {
      setMarkerPosition(prev => prev ? { ...prev, lng } : { lat: 0, lng });
      onLocationChange(latitude || 0, lng);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="latitude" className="text-sm font-medium">Latitude</label>
          <Input
            id="latitude"
            type="number"
            step="0.000001"
            value={latitude || ''}
            onChange={updateLatitude}
            placeholder="Latitude"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="longitude" className="text-sm font-medium">Longitude</label>
          <Input
            id="longitude"
            type="number"
            step="0.000001"
            value={longitude || ''}
            onChange={updateLongitude}
            placeholder="Longitude"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={handleUserLocation}
          className="flex items-center gap-1"
        >
          <Locate className="h-4 w-4" />
          Use My Location
        </Button>
      </div>
      
      <div className="relative h-[300px] w-full rounded border border-input overflow-hidden">
        {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
          <div className="absolute inset-0 bg-white bg-opacity-90 z-10 flex flex-col items-center justify-center p-6 text-center">
            <div className="text-lg font-medium text-red-600 mb-2">Google Maps API Key Missing</div>
            <p className="text-sm text-stone-600 mb-4">
              Please add your Google Maps API key to the .env file as VITE_GOOGLE_MAPS_API_KEY.
            </p>
          </div>
        )}
        
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={markerPosition || defaultCenter}
            zoom={markerPosition ? 15 : 5}
            options={mapOptions}
            onClick={handleMapClick}
            onLoad={handleMapLoad}
          >
            {markerPosition && (
              <Marker
                position={markerPosition}
                draggable={true}
                onDragEnd={(e) => {
                  if (e.latLng) {
                    const lat = e.latLng.lat();
                    const lng = e.latLng.lng();
                    setMarkerPosition({ lat, lng });
                    onLocationChange(lat, lng);
                  }
                }}
              />
            )}
          </GoogleMap>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-stone-100">
            <div className="text-center">
              <MapPin className="mx-auto h-8 w-8 text-stone-400 mb-2" />
              <div className="text-sm text-stone-500">Loading map...</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-xs text-stone-500">
        Click on the map to set the hotel location or drag the marker to adjust the position.
      </div>
    </div>
  );
};

export default LocationMapSelector;
