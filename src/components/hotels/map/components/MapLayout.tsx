
import React, { useState } from 'react';
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import { Hotel } from '@/integrations/supabase/custom-types';
import MapContainer from './MapContainer';
import MapFeaturesManager from './MapFeaturesManager';
import MapStats from './MapStats';
import MapSearch from './MapSearch';
import HotelContent from '../../HotelContent';
import { convertIntegrationToAdminHotels } from '@/utils/hotelTypeAdapter';
import HeatmapControls from './HeatmapControls';
import HeatmapLayer from './HeatmapLayer';

interface MapLayoutProps {
  viewMode: 'map' | 'list';
  isLoading: boolean;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  onMapLoad: (map: google.maps.Map) => void;
  showHeatmap: boolean;
  setShowHeatmap: (show: boolean) => void;
  filteredHotels: Hotel[];
  visibleHotels: Hotel[];
  activeFilterCount: number;
  clearFilters: () => void;
  compareList: AdminHotel[];
  addToCompare: (id: number) => void;
  removeFromCompare: (id: number) => void;
  isInCompare: (id: number) => boolean;
  mapSearchQuery?: string;
  setMapSearchQuery?: (query: string) => void;
  handleMapSearch?: (query: string, hotels: Hotel[]) => Hotel[];
  isSearching?: boolean;
}

const MapLayout: React.FC<MapLayoutProps> = ({
  viewMode,
  isLoading,
  mapCenter,
  mapZoom,
  onMapLoad,
  showHeatmap,
  setShowHeatmap,
  filteredHotels,
  visibleHotels,
  activeFilterCount,
  clearFilters,
  compareList,
  addToCompare,
  removeFromCompare,
  isInCompare,
  mapSearchQuery = '',
  setMapSearchQuery = () => {},
  handleMapSearch = () => [],
  isSearching = false
}) => {
  // Heatmap customization state
  const [heatmapRadius, setHeatmapRadius] = useState(20);
  const [heatmapIntensity, setHeatmapIntensity] = useState(0.7);
  const [heatmapColorScheme, setHeatmapColorScheme] = useState('default');
  
  // Convert hotels to admin format for components that expect that type
  const adminFilteredHotels = convertIntegrationToAdminHotels(filteredHotels);
  const adminVisibleHotels = convertIntegrationToAdminHotels(visibleHotels);
  
  return (
    <div className="space-y-6">
      {viewMode === 'map' ? (
        <div className="relative">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            onLoad={onMapLoad}
          >
            <HeatmapLayer 
              hotels={adminFilteredHotels}
              visible={showHeatmap}
              radius={heatmapRadius}
              opacity={heatmapIntensity}
              colorScheme={heatmapColorScheme}
            />
          </MapContainer>
          
          <MapSearch 
            onSearch={handleMapSearch}
            isSearching={isSearching}
            hotels={filteredHotels}
            searchQuery={mapSearchQuery}
            setSearchQuery={setMapSearchQuery}
          />
          
          <MapFeaturesManager 
            onUserLocation={() => {}}
            setShowHeatmap={setShowHeatmap}
            showHeatmap={showHeatmap}
          />
          
          <HeatmapControls 
            showHeatmap={showHeatmap}
            setShowHeatmap={setShowHeatmap}
            dataPoints={adminFilteredHotels.length}
            heatmapRadius={heatmapRadius}
            setHeatmapRadius={setHeatmapRadius}
            heatmapIntensity={heatmapIntensity}
            setHeatmapIntensity={setHeatmapIntensity}
            heatmapColorScheme={heatmapColorScheme}
            setHeatmapColorScheme={setHeatmapColorScheme}
          />
        </div>
      ) : (
        <HotelContent 
          isLoading={isLoading}
          filteredHotels={adminFilteredHotels} 
          activeFilterCount={activeFilterCount}
          clearFilters={clearFilters}
          compareList={compareList}
          onAddToCompare={addToCompare}
          onRemoveFromCompare={removeFromCompare}
          isInCompare={isInCompare}
        />
      )}
      
      <MapStats 
        visibleHotels={adminVisibleHotels}
        showHeatmap={showHeatmap}
        viewMode={viewMode}
      />
    </div>
  );
};

export default MapLayout;
