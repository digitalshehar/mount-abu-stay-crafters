import React, { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Hotel } from '@/integrations/supabase/custom-types';
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import MapHeader from './components/MapHeader';
import MapSidebar from './components/MapSidebar';
import MapLayout from './components/MapLayout';
import CompareHotelsFeature from '../comparison/CompareHotelsFeature';
import { useMapFilters } from './hooks/useMapFilters';
import { useHotelComparison } from '@/hooks/useHotelComparison';
import { useMapState } from './hooks/useMapState';
import { useSelectedHotel } from './hooks/useSelectedHotel';
import { 
  convertAdminToIntegrationHotels, 
  convertIntegrationToAdminHotels 
} from '@/utils/hotelTypeAdapter';
import './HotelMapStyles.css';

const libraries = ['places', 'visualization'] as ("places" | "drawing" | "geometry" | "visualization")[];

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
  streetViewControl: false,
  mapTypeId: 'roadmap' as const,
  styles: [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }, { lightness: 17 }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }, { lightness: 18 }]
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }, { lightness: 16 }]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#dedede" }, { lightness: 21 }]
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
    }
  ],
};

interface HotelMapProps {
  hotels: AdminHotel[];
  isLoading: boolean;
  selectedHotelId?: number | null;
  setSelectedHotelId?: (id: number) => void;
  onMapMove?: (bounds: any) => void;
}

const HotelMap: React.FC<HotelMapProps> = ({ 
  hotels, 
  isLoading, 
  selectedHotelId,
  setSelectedHotelId,
  onMapMove
}) => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  
  const { compareList, addToCompare, removeFromCompare, clearCompare, isInCompare } = useHotelComparison();

  const {
    mapCenter,
    setMapCenter,
    mapZoom,
    setMapZoom,
    showHeatmap,
    setShowHeatmap,
    mapRef,
    onMapLoad,
    handleBoundsChanged,
    handleSelectHotel
  } = useMapState();
  
  const {
    localSelectedHotelId,
    setLocalSelectedHotelId,
    selectedMarker,
    setSelectedMarker,
    handleHotelSelect
  } = useSelectedHotel(hotels, true, setMapCenter, setMapZoom);
  
  const {
    searchQuery,
    setSearchQuery,
    selectedStars,
    setSelectedStars,
    selectedAmenities,
    setSelectedAmenities,
    priceRange,
    setPriceRange,
    setMapBounds,
    activeFilterCount,
    clearFilters,
    handleStarFilter,
    handleAmenityFilter,
    filterHotels,
    getVisibleHotels
  } = useMapFilters();
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
  });

  const handleMapBoundsChanged = () => {
    const bounds = handleBoundsChanged();
    if (bounds && onMapMove) {
      onMapMove(bounds);
    }
  };
  
  const effectiveSelectedHotelId = selectedHotelId !== undefined ? selectedHotelId : localSelectedHotelId;
  
  const convertedHotels: Hotel[] = convertAdminToIntegrationHotels(hotels);
  const filteredHotels = filterHotels(convertedHotels);
  const visibleHotels = getVisibleHotels(filteredHotels, viewMode);
  
  if (loadError) {
    return (
      <div className="container mx-auto py-6 px-4 text-center">
        <div className="bg-red-50 p-6 rounded-lg text-red-600">
          <h3 className="text-lg font-semibold mb-2">Error Loading Google Maps</h3>
          <p>There was an error loading Google Maps. Please check your API key and try again.</p>
          <p className="mt-4 text-sm text-red-500">Error details: {loadError.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6 lg:py-8 px-4">
      <MapHeader 
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeFilterCount={activeFilterCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedStars={selectedStars}
        setSelectedStars={setSelectedStars}
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        clearFilters={clearFilters}
        selectedHotel={selectedMarker}
        hotelsCount={filteredHotels.length}
        onOpenFilter={() => {}}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        <MapSidebar 
          hotels={filteredHotels}
          selectedHotel={selectedMarker}
          onSelectHotel={handleSelectHotel}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedStars={selectedStars}
          handleStarFilter={handleStarFilter}
          selectedAmenities={selectedAmenities}
          handleAmenityFilter={handleAmenityFilter}
          clearFilters={clearFilters}
          commonAmenities={['WiFi', 'Swimming Pool', 'Restaurant', 'Spa', 'Gym']}
        />
        
        <MapLayout 
          viewMode={viewMode}
          isLoading={isLoading}
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          onMapLoad={onMapLoad}
          showHeatmap={showHeatmap}
          setShowHeatmap={setShowHeatmap}
          filteredHotels={filteredHotels}
          visibleHotels={visibleHotels}
          activeFilterCount={activeFilterCount}
          clearFilters={clearFilters}
          compareList={compareList}
          addToCompare={addToCompare}
          removeFromCompare={removeFromCompare}
          isInCompare={isInCompare}
        />
      </div>
      
      <CompareHotelsFeature 
        hotels={convertIntegrationToAdminHotels(convertedHotels)} 
        compareList={compareList}
        onAddToCompare={addToCompare}
        onRemoveFromCompare={removeFromCompare}
        onClearCompare={clearCompare}
      />
    </div>
  );
};

export default HotelMap;
