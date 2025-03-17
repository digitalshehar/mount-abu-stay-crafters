
import React, { useState } from 'react';
import { useHotels } from '@/hooks/useHotels';
import MapContainer from '@/components/hotels/map/components/MapContainer';
import MapHeader from '@/components/hotels/map/components/MapHeader';
import MapSidebar from '@/components/hotels/map/components/MapSidebar';
import { useMapFunctions } from '@/components/hotels/map/hooks/useMapFunctions';
import { useMapFilters } from '@/components/hotels/map/hooks/useMapFilters';
import HotelFilters from '@/components/hotels/HotelFilters';
import MapLoading from '@/components/hotels/map/MapLoading';
import { Sheet, SheetContent } from '@/components/ui/sheet';

const HotelMap = () => {
  const { hotels, loading } = useHotels();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { filters, filterOptions, handleFilterChange, handleClearFilters, filteredHotels } = 
    useMapFilters(hotels, "");
  
  const {
    mapCenter,
    mapZoom,
    selectedHotel,
    setSelectedHotel,
    onMapLoad
  } = useMapFunctions(filteredHotels);

  if (loading) {
    return <MapLoading />;
  }

  return (
    <div className="h-screen flex flex-col">
      <MapHeader 
        selectedHotel={selectedHotel}
        hotelsCount={filteredHotels.length}
        onOpenFilter={() => setIsFilterOpen(true)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            onLoad={onMapLoad}
          />
        </div>
        
        <div className="hidden lg:block">
          <MapSidebar 
            hotels={filteredHotels}
            selectedHotel={selectedHotel}
            onSelectHotel={setSelectedHotel}
          />
        </div>
      </div>
      
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="left" className="w-full sm:max-w-md">
          <HotelFilters 
            filters={filters}
            filterOptions={filterOptions}
            handleFilterChange={handleFilterChange}
            handleClearFilters={handleClearFilters}
            activeFilterCount={Object.values(filters).flat().length}
            filtersApplied={Object.values(filters).some(v => v.length > 0)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HotelMap;
