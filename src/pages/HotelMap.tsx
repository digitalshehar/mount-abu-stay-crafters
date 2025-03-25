
import React, { useState } from 'react';
import { useHotels } from '@/hooks/useHotels';
import MapContainer from '@/components/hotels/map/components/MapContainer';
import MapHeader from '@/components/hotels/map/components/MapHeader';
import MapSidebar from '@/components/hotels/map/components/MapSidebar';
import { useMapFunctions } from '@/components/hotels/map/hooks/useMapFunctions';
import { useMapFilters } from '@/components/hotels/map/hooks/useMapFilters';
import MapLoading from '@/components/hotels/map/MapLoading';
import { Sheet, SheetContent } from '@/components/ui/sheet';

const HotelMap = () => {
  const { hotels, loading } = useHotels();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Create simplified versions of these objects for the page
  const mapFilters = useMapFilters();
  const filteredHotels = mapFilters.filterHotels(hotels);
  
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
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                {/* Simplified price range filter */}
              </div>
              
              {/* Star Rating */}
              <div>
                <h3 className="text-sm font-medium mb-2">Star Rating</h3>
                {/* Simplified star rating filter */}
              </div>
              
              {/* Amenities */}
              <div>
                <h3 className="text-sm font-medium mb-2">Amenities</h3>
                {/* Simplified amenities filter */}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HotelMap;
