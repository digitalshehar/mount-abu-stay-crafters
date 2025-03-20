
import React, { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Hotel } from '@/integrations/supabase/custom-types';
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import MapHeader from './components/MapHeader';
import MapSidebar from './components/MapSidebar';
import MapLayout from './components/MapLayout';
import { useMapFilters } from './hooks/useMapFilters';
import { useHotelComparison } from '@/hooks/useHotelComparison';
import { useMapState } from './hooks/useMapState';
import { useSelectedHotel } from './hooks/useSelectedHotel';
import { useHeatmapSettings } from './hooks/useHeatmapSettings';
import { 
  convertAdminToIntegrationHotels, 
  convertIntegrationToAdminHotels 
} from '@/utils/hotelTypeAdapter';
import './HotelMapStyles.css';
import CompareHotelsWrapped from './components/CompareHotelsWrapped';

const libraries = ['places', 'visualization'] as ("places" | "drawing" | "geometry" | "visualization")[];

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
  
  // Hotel comparison state
  const { 
    compareList, 
    addToCompare, 
    removeFromCompare, 
    clearCompare, 
    isInCompare 
  } = useHotelComparison();

  // Map state management
  const {
    mapCenter,
    setMapCenter,
    mapZoom,
    setMapZoom,
    onMapLoad,
    handleBoundsChanged,
  } = useMapState();
  
  // Heatmap settings
  const heatmapSettings = useHeatmapSettings();
  
  // Selected hotel state
  const {
    localSelectedHotelId,
    setLocalSelectedHotelId,
    selectedMarker,
    setSelectedMarker,
    handleHotelSelect
  } = useSelectedHotel(hotels, true, setMapCenter, setMapZoom);
  
  // Map filters
  const {
    searchQuery,
    setSearchQuery,
    mapSearchQuery,
    setMapSearchQuery,
    handleMapSearch,
    isSearching,
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
  
  // Load Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
  });

  // Handle map bounds changes
  const handleMapBoundsChanged = () => {
    const bounds = handleBoundsChanged();
    if (bounds && onMapMove) {
      onMapMove(bounds);
    }
  };
  
  // Determine the active selected hotel ID
  const effectiveSelectedHotelId = selectedHotelId !== undefined ? selectedHotelId : localSelectedHotelId;
  
  // Filter and convert hotels
  const convertedHotels: Hotel[] = convertAdminToIntegrationHotels(hotels);
  const filteredHotels = filterHotels(convertedHotels);
  const visibleHotels = getVisibleHotels(filteredHotels, viewMode);
  
  // Handle errors loading Google Maps
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
          onSelectHotel={(hotel) => handleHotelSelect(hotel.id)}
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
          showHeatmap={heatmapSettings.showHeatmap}
          setShowHeatmap={heatmapSettings.setShowHeatmap}
          filteredHotels={filteredHotels}
          visibleHotels={visibleHotels}
          activeFilterCount={activeFilterCount}
          clearFilters={clearFilters}
          compareList={compareList}
          addToCompare={addToCompare}
          removeFromCompare={removeFromCompare}
          isInCompare={isInCompare}
          mapSearchQuery={mapSearchQuery}
          setMapSearchQuery={setMapSearchQuery}
          handleMapSearch={handleMapSearch}
          isSearching={isSearching}
          heatmapSettings={heatmapSettings}
        />
      </div>
      
      <CompareHotelsWrapped 
        hotels={convertIntegrationToAdminHotels(filteredHotels)}
        compareList={compareList}
        onAddToCompare={addToCompare}
        onRemoveFromCompare={removeFromCompare}
        onClearCompare={clearCompare}
      />
    </div>
  );
};

export default HotelMap;
