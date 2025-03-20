
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
  heatmapSettings?: {
    heatmapRadius: number;
    setHeatmapRadius: (radius: number) => void;
    heatmapIntensity: number;
    setHeatmapIntensity: (intensity: number) => void;
    heatmapColorScheme: string;
    setHeatmapColorScheme: (scheme: string) => void;
    weightByPopularity: boolean;
    setWeightByPopularity: (useWeight: boolean) => void;
    colorSchemes: { id: string; name: string }[];
  };
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
  isSearching = false,
  heatmapSettings
}) => {
  // Default heatmap settings if not provided
  const defaultHeatmapRadius = 20;
  const defaultHeatmapIntensity = 0.7;
  const defaultHeatmapColorScheme = 'default';
  const defaultWeightByPopularity = true;
  
  // Use provided settings or defaults
  const radius = heatmapSettings?.heatmapRadius || defaultHeatmapRadius;
  const intensity = heatmapSettings?.heatmapIntensity || defaultHeatmapIntensity;
  const colorScheme = heatmapSettings?.heatmapColorScheme || defaultHeatmapColorScheme;
  const weightByPopularity = heatmapSettings?.weightByPopularity || defaultWeightByPopularity;
  
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
              radius={radius}
              opacity={intensity}
              colorScheme={colorScheme}
              weightByPopularity={weightByPopularity}
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
          
          {heatmapSettings ? (
            <HeatmapControls 
              showHeatmap={showHeatmap}
              setShowHeatmap={setShowHeatmap}
              dataPoints={adminFilteredHotels.length}
              heatmapRadius={heatmapSettings.heatmapRadius}
              setHeatmapRadius={heatmapSettings.setHeatmapRadius}
              heatmapIntensity={heatmapSettings.heatmapIntensity}
              setHeatmapIntensity={heatmapSettings.setHeatmapIntensity}
              heatmapColorScheme={heatmapSettings.heatmapColorScheme}
              setHeatmapColorScheme={heatmapSettings.setHeatmapColorScheme}
              weightByPopularity={heatmapSettings.weightByPopularity}
              setWeightByPopularity={heatmapSettings.setWeightByPopularity}
              colorSchemes={heatmapSettings.colorSchemes}
            />
          ) : (
            <HeatmapControls 
              showHeatmap={showHeatmap}
              setShowHeatmap={setShowHeatmap}
              dataPoints={adminFilteredHotels.length}
              heatmapRadius={defaultHeatmapRadius}
              setHeatmapRadius={() => {}}
              heatmapIntensity={defaultHeatmapIntensity}
              setHeatmapIntensity={() => {}}
              heatmapColorScheme={defaultHeatmapColorScheme}
              setHeatmapColorScheme={() => {}}
              weightByPopularity={defaultWeightByPopularity}
              setWeightByPopularity={() => {}}
              colorSchemes={[]}
            />
          )}
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
