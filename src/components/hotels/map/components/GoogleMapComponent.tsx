
import React, { useRef, useCallback } from 'react';
import { GoogleMap, MarkerClusterer, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Hotel } from '@/components/admin/hotels/types';

interface GoogleMapComponentProps {
  isLoaded: boolean;
  mapContainerStyle: any;
  center: { lat: number; lng: number };
  zoom: number;
  options: any;
  hotels: Hotel[];
  selectedHotelId: number | null;
  selectedMarker: Hotel | null;
  setSelectedMarker: (hotel: Hotel | null) => void;
  handleHotelSelect: (id: number) => void;
  onBoundsChanged: () => void;
  onMapLoad: (map: google.maps.Map) => void;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  isLoaded,
  mapContainerStyle,
  center,
  zoom,
  options,
  hotels,
  selectedHotelId,
  selectedMarker,
  setSelectedMarker,
  handleHotelSelect,
  onBoundsChanged,
  onMapLoad
}) => {
  const navigate = useNavigate();

  const handleMarkerClick = (hotel: Hotel) => {
    setSelectedMarker(hotel);
    handleHotelSelect(hotel.id);
  };

  if (!isLoaded) return null;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      options={options}
      onLoad={onMapLoad}
      onBoundsChanged={onBoundsChanged}
    >
      <MarkerClusterer>
        {(clusterer) => (
          <>
            {hotels.map(hotel => {
              if (!hotel.latitude || !hotel.longitude) return null;
              
              return (
                <Marker
                  key={hotel.id}
                  position={{ lat: hotel.latitude, lng: hotel.longitude }}
                  onClick={() => handleMarkerClick(hotel)}
                  clusterer={clusterer}
                  icon={{
                    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                    fillColor: selectedHotelId === hotel.id ? '#0ea5e9' : '#718096',
                    fillOpacity: 1,
                    strokeWeight: 1,
                    strokeColor: '#ffffff',
                    scale: 1.5,
                    anchor: new google.maps.Point(12, 22),
                    labelOrigin: new google.maps.Point(12, 10),
                  }}
                  label={{
                    text: `₹${Math.round(hotel.pricePerNight/100)*100}`,
                    className: `price-label ${selectedHotelId === hotel.id ? 'selected' : ''}`,
                    color: selectedHotelId === hotel.id ? '#ffffff' : '#1a202c',
                  }}
                />
              );
            })}
            
            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="hotel-popup">
                  <img 
                    src={selectedMarker.image} 
                    alt={selectedMarker.name} 
                    className="popup-image w-full h-32 object-cover mb-2 rounded-t"
                  />
                  <div className="popup-content p-3">
                    <h3 className="popup-title text-base font-medium mb-1">{selectedMarker.name}</h3>
                    <div className="popup-rating flex items-center mb-1 text-yellow-500">
                      {Array.from({ length: Math.floor(selectedMarker.stars) }, (_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                      <span className="text-xs text-stone-500 ml-1">
                        {selectedMarker.rating.toFixed(1)} ({selectedMarker.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="popup-amenities mb-2">
                      <p className="text-xs text-stone-600 line-clamp-1">
                        {selectedMarker.amenities.slice(0, 3).join(' • ')}
                      </p>
                    </div>
                    <div className="popup-price text-sm font-semibold mb-2">₹{selectedMarker.pricePerNight.toLocaleString()} / night</div>
                    <button 
                      className="popup-button w-full bg-primary text-white text-sm py-1 px-3 rounded hover:bg-primary/90 transition-colors"
                      onClick={() => navigate(`/hotel/${selectedMarker.slug}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </InfoWindow>
            )}
          </>
        )}
      </MarkerClusterer>
    </GoogleMap>
  );
};

export default GoogleMapComponent;
