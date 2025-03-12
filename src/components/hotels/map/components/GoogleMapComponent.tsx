
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Hotel } from '@/components/admin/hotels/types';
import { Clock, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Default center for Mount Abu
const DEFAULT_CENTER = {
  lat: 24.5927,
  lng: 72.7156
};

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '8px'
};

interface GoogleMapComponentProps {
  hotels: Hotel[];
  mapApiKey?: string;
  mapContainerStyle?: any;
  center?: { lat: number; lng: number };
  zoom?: number;
  options?: any;
  selectedHotelId?: number | null;
  selectedMarker?: Hotel | null;
  setSelectedMarker?: (hotel: Hotel | null) => void;
  handleHotelSelect?: (id: number) => void;
  onMapLoad?: (map: google.maps.Map) => void;
  onBoundsChanged?: () => void;
  showHeatmap?: boolean;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ 
  hotels, 
  mapApiKey,
  mapContainerStyle: customContainerStyle = containerStyle,
  center = DEFAULT_CENTER,
  zoom = 12,
  options = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
    zoomControl: true,
  },
  selectedHotelId = null,
  selectedMarker = null,
  setSelectedMarker = () => {},
  handleHotelSelect = () => {},
  onMapLoad = () => {},
  onBoundsChanged = () => {},
  showHeatmap = false
}) => {
  const [localSelectedHotel, setLocalSelectedHotel] = useState<Hotel | null>(selectedMarker);
  const navigate = useNavigate();
  const mapRef = useRef<google.maps.Map | null>(null);
  
  // Use a default API key if none is provided
  const apiKey = mapApiKey || "AIzaSyDNVFgP4YzgEGn2wxJmCbxn0Uvt6Ygu9L0"; // Default public key for demo
  
  // Calculate map bounds to fit all hotels
  const calculateBounds = () => {
    if (hotels.length === 0 || !mapRef.current) return;
    
    // Create a new bounds object
    const bounds = new google.maps.LatLngBounds();
    
    // Add each hotel location to the bounds
    hotels.forEach(hotel => {
      if (hotel.latitude && hotel.longitude) {
        bounds.extend(new google.maps.LatLng(
          Number(hotel.latitude),
          Number(hotel.longitude)
        ));
      }
    });
    
    // Adjust map to fit all markers
    mapRef.current.fitBounds(bounds);
    
    // Set a minimum zoom level if the map is too zoomed in
    const listener = google.maps.event.addListener(mapRef.current, 'idle', () => {
      if (mapRef.current && mapRef.current.getZoom() > 15) {
        mapRef.current.setZoom(15);
      }
      google.maps.event.removeListener(listener);
    });
  };
  
  useEffect(() => {
    // When hotels change, recalculate bounds
    if (hotels.length > 0 && mapRef.current) {
      calculateBounds();
    }
  }, [hotels]);
  
  useEffect(() => {
    // Sync selected marker from props to local state
    setLocalSelectedHotel(selectedMarker);
  }, [selectedMarker]);
  
  const handleMarkerClick = (hotel: Hotel) => {
    setLocalSelectedHotel(hotel);
    setSelectedMarker(hotel);
  };
  
  const handleInfoWindowClose = () => {
    setLocalSelectedHotel(null);
    setSelectedMarker(null);
  };
  
  const handleViewHotel = () => {
    if (localSelectedHotel) {
      navigate(`/hotel/${localSelectedHotel.slug}`);
    }
  };

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    calculateBounds();
    onMapLoad(map);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={customContainerStyle}
        center={center}
        zoom={zoom}
        options={options}
        onLoad={handleMapLoad}
        onBoundsChanged={onBoundsChanged}
      >
        {hotels.map((hotel) => (
          <Marker
            key={hotel.id}
            position={{
              lat: Number(hotel.latitude) || DEFAULT_CENTER.lat,
              lng: Number(hotel.longitude) || DEFAULT_CENTER.lng
            }}
            onClick={() => handleMarkerClick(hotel)}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new google.maps.Size(40, 40)
            }}
          />
        ))}
        
        {localSelectedHotel && (
          <InfoWindow
            position={{
              lat: Number(localSelectedHotel.latitude) || DEFAULT_CENTER.lat,
              lng: Number(localSelectedHotel.longitude) || DEFAULT_CENTER.lng
            }}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="max-w-[300px] p-2">
              <div className="flex items-start gap-3">
                <img 
                  src={localSelectedHotel.image} 
                  alt={localSelectedHotel.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-base">{localSelectedHotel.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin size={12} className="mr-1" />
                    <span>{localSelectedHotel.location}</span>
                  </div>
                  <div className="flex items-center text-xs text-amber-500 mt-1">
                    <Star size={12} className="mr-1 fill-amber-500" />
                    <span>{localSelectedHotel.stars}-Star Hotel</span>
                  </div>
                  <div className="mt-2 text-sm font-medium">
                    ₹{localSelectedHotel.pricePerNight?.toLocaleString() || 'Price unavailable'}/night
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                className="w-full mt-3"
                onClick={handleViewHotel}
              >
                View Hotel
              </Button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
