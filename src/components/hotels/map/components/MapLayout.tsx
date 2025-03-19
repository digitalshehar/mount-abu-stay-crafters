
import React from 'react';
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import { Hotel } from '@/integrations/supabase/custom-types';
import MapContainer from './MapContainer';
import MapFeaturesManager from './MapFeaturesManager';
import MapStats from './MapStats';
import HotelContent from '../../HotelContent';
import { convertIntegrationToAdminHotels } from '@/utils/hotelTypeAdapter';

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
  isInCompare
}) => {
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
          />
          
          <MapFeaturesManager 
            onUserLocation={() => {}}
            setShowHeatmap={setShowHeatmap}
            showHeatmap={showHeatmap}
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
