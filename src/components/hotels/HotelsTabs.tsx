
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HotelGridView from './HotelGridView';
import HotelListView from './HotelListView';
import HotelMapView from './HotelMapView';
import { Hotel } from '@/types';
import { convertIntegrationToAdminHotels } from '@/utils/hotelTypeAdapter';
import { useHotelComparison } from '@/hooks/useHotelComparison';

interface HotelsTabsProps {
  hotels: Hotel[];
  isLoading: boolean;
  activeFilterCount: number;
  clearFilters: () => void;
}

const HotelsTabs: React.FC<HotelsTabsProps> = ({
  hotels,
  isLoading,
  activeFilterCount,
  clearFilters
}) => {
  const [activeTab, setActiveTab] = useState('grid');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const { 
    compareList, 
    addToCompare, 
    removeFromCompare, 
    isInCompare,
    clearCompareList,
    compareHotels,
    isCompareVisible,
    setIsCompareVisible
  } = useHotelComparison();
  
  // Convert hotels to admin format for the components that expect them
  const adminHotels = convertIntegrationToAdminHotels(hotels);

  useEffect(() => {
    // Set viewMode based on activeTab for consistency
    if (activeTab === 'grid' || activeTab === 'list' || activeTab === 'map') {
      setViewMode(activeTab as 'grid' | 'list' | 'map');
    }
  }, [activeTab]);

  return (
    <div className="w-full">
      <Tabs 
        defaultValue="grid" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="grid" data-testid="grid-view-tab">
              Grid View
            </TabsTrigger>
            <TabsTrigger value="list" data-testid="list-view-tab">
              List View
            </TabsTrigger>
            <TabsTrigger value="map" data-testid="map-view-tab">
              Map View
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-0">
          <HotelGridView 
            hotels={adminHotels} 
            isLoading={isLoading}
            activeFilterCount={activeFilterCount}
            clearFilters={clearFilters}
            compareList={compareList}
            onAddToCompare={addToCompare}
            onRemoveFromCompare={removeFromCompare}
            isInCompare={isInCompare}
          />
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          <HotelListView 
            hotels={adminHotels} 
            isLoading={isLoading}
            activeFilterCount={activeFilterCount}
            clearFilters={clearFilters}
            compareList={compareList}
            onAddToCompare={addToCompare}
            onRemoveFromCompare={removeFromCompare}
            isInCompare={isInCompare}
          />
        </TabsContent>

        <TabsContent value="map" className="mt-0">
          <HotelMapView 
            hotels={adminHotels}
            isLoading={isLoading}
            activeFilterCount={activeFilterCount}
            clearFilters={clearFilters}
            compareList={compareList}
            onAddToCompare={addToCompare}
            onRemoveFromCompare={removeFromCompare}
            isInCompare={isInCompare}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HotelsTabs;
