
import React from 'react';
import GoogleMapComponent from './GoogleMapComponent';
import MapLoading from '../MapLoading';
import { Hotel } from '@/components/admin/hotels/types';

interface MapContainerProps {
  isLoading: boolean;
  isLoaded: boolean;
  mapContainerStyle: any;
  mountAbuCenter: { lat: number; lng: number };
  mapOptions: any;
  filteredHotels: Hotel[];
  selectedHotelId: number | null;
  selectedMarker: Hotel | null;
  setSelectedMarker: (hotel: Hotel | null) => void;
  handleHotelSelect: (id: number) => void;
  onMapLoad: (map: google.maps.Map) => void;
  handleBoundsChanged: () => void;
}

const MapContainer: React.FC<MapContainerProps> = ({
  isLoading,
  isLoaded,
  mapContainerStyle,
  mountAbuCenter,
  mapOptions,
  filteredHotels,
  selectedHotelId,
  selectedMarker,
  setSelectedMarker,
  handleHotelSelect,
  onMapLoad,
  handleBoundsChanged
}) => {
  return (
    <div className="h-[500px] rounded-lg overflow-hidden shadow-md relative">
      {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
        <div className="absolute inset-0 bg-white bg-opacity-90 z-10 flex flex-col items-center justify-center p-6 text-center">
          <div className="text-lg font-medium text-red-600 mb-2">Google Maps API Key Missing</div>
          <p className="text-sm text-stone-600 mb-4">
            Please add your Google Maps API key to the .env file as VITE_GOOGLE_MAPS_API_KEY.
          </p>
        </div>
      )}
      
      {isLoading || !isLoaded ? (
        <MapLoading />
      ) : (
        <GoogleMapComponent 
          isLoaded={isLoaded}
          mapContainerStyle={mapContainerStyle}
          center={mountAbuCenter}
          zoom={13}
          options={mapOptions}
          hotels={filteredHotels}
          selectedHotelId={selectedHotelId}
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          handleHotelSelect={handleHotelSelect}
          onBoundsChanged={handleBoundsChanged}
          onMapLoad={onMapLoad}
        />
      )}
    </div>
  );
};

export default MapContainer;
