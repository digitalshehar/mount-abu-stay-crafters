
import React from 'react';
import { Hotel } from '@/components/admin/hotels/types';
import GoogleMapComponent from './GoogleMapComponent';
import MapLoading from '../MapLoading';

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
  onMapLoad?: (map: google.maps.Map) => void;
  handleBoundsChanged: () => void;
  showHeatmap: boolean;
  compareList?: number[];
  onAddToCompare?: (hotelId: number) => void;
  isInCompare?: (hotelId: number) => boolean;
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
  handleBoundsChanged,
  showHeatmap,
  compareList,
  onAddToCompare,
  isInCompare,
}) => {
  if (!isLoaded) {
    return <MapLoading />;
  }

  return (
    <div className="relative h-[calc(100vh-250px)] min-h-[500px] rounded-lg overflow-hidden shadow-md">
      <GoogleMapComponent
        mapContainerStyle={mapContainerStyle}
        center={mountAbuCenter}
        zoom={13}
        options={mapOptions}
        hotels={filteredHotels}
        selectedHotelId={selectedHotelId}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        handleHotelSelect={handleHotelSelect}
        onMapLoad={onMapLoad}
        onBoundsChanged={handleBoundsChanged}
        showHeatmap={showHeatmap}
        compareList={compareList}
        onAddToCompare={onAddToCompare}
        isInCompare={isInCompare}
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2">Loading hotel data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
