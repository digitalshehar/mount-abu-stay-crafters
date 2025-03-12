
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
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ hotels, mapApiKey }) => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const navigate = useNavigate();
  const mapRef = useRef(null);
  
  // Use a default API key if none is provided
  const apiKey = mapApiKey || "AIzaSyDNVFgP4YzgEGn2wxJmCbxn0Uvt6Ygu9L0"; // Default public key for demo
  
  // Calculate map bounds to fit all hotels
  const calculateBounds = () => {
    if (hotels.length === 0 || !mapRef.current) return;
    
    // Access the map instance
    const map = mapRef.current as google.maps.Map;
    
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
    map.fitBounds(bounds);
    
    // Set a minimum zoom level if the map is too zoomed in
    const listener = google.maps.event.addListener(map, 'idle', () => {
      if (map.getZoom() > 15) {
        map.setZoom(15);
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
  
  const handleMarkerClick = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };
  
  const handleInfoWindowClose = () => {
    setSelectedHotel(null);
  };
  
  const handleViewHotel = () => {
    if (selectedHotel) {
      navigate(`/hotel/${selectedHotel.slug}`);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={DEFAULT_CENTER}
        zoom={12}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          zoomControl: true,
        }}
        onLoad={(map) => {
          mapRef.current = map;
          calculateBounds();
        }}
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
        
        {selectedHotel && (
          <InfoWindow
            position={{
              lat: Number(selectedHotel.latitude) || DEFAULT_CENTER.lat,
              lng: Number(selectedHotel.longitude) || DEFAULT_CENTER.lng
            }}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="max-w-[300px] p-2">
              <div className="flex items-start gap-3">
                <img 
                  src={selectedHotel.image} 
                  alt={selectedHotel.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-base">{selectedHotel.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin size={12} className="mr-1" />
                    <span>{selectedHotel.location}</span>
                  </div>
                  <div className="flex items-center text-xs text-amber-500 mt-1">
                    <Star size={12} className="mr-1 fill-amber-500" />
                    <span>{selectedHotel.stars}-Star Hotel</span>
                  </div>
                  <div className="mt-2 text-sm font-medium">
                    ₹{selectedHotel.pricePerNight.toLocaleString()}/night
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
