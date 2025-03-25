import React, { useState } from 'react';
import { MapPin, Map as MapIcon, List, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HotelMap from './map/HotelMap';
import FilterSidebar from './FilterSidebar';
import HotelContent from './HotelContent';
import { useHotelFilters } from './useHotelFilters';
import ActiveFilters from './ActiveFilters';
import ZoneSelector from './map/ZoneSelector';
import './map/HotelMapStyles.css';

interface HotelZoneProps {
  hotels: any[];
  isLoading: boolean;
  clearFilters: () => void;
}

const HotelZone: React.FC<HotelZoneProps> = ({ 
  hotels, 
  isLoading,
  clearFilters
}) => {
  const [view, setView] = useState<'list' | 'map'>('map');
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [mapBounds, setMapBounds] = useState<any | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    priceRange,
    setPriceRange,
    selectedStars,
    setSelectedStars,
    selectedAmenities,
    setSelectedAmenities,
    activeFilterCount,
    filteredHotels,
    handleStarFilter,
    handleAmenityFilter,
    commonAmenities
  } = useHotelFilters(hotels || [], "");

  const visibleHotels = mapBounds && view === 'map'
    ? filteredHotels.filter(hotel => 
        hotel.latitude && 
        hotel.longitude && 
        hotel.latitude >= mapBounds.getSouth() && 
        hotel.latitude <= mapBounds.getNorth() && 
        hotel.longitude >= mapBounds.getWest() && 
        hotel.longitude <= mapBounds.getEast()
      )
    : filteredHotels;

  const handleMapMove = (bounds: any) => {
    setMapBounds(bounds);
  };

  const handleZoneSelect = (bounds: any) => {
    setMapBounds(bounds);
    
    if (bounds && hotels.length > 0) {
      const hotelsInZone = hotels.filter(hotel => 
        hotel.latitude && 
        hotel.longitude && 
        hotel.latitude >= bounds.getSouth() && 
        hotel.latitude <= bounds.getNorth() && 
        hotel.longitude >= bounds.getWest() && 
        hotel.longitude <= bounds.getEast()
      );
      
      if (hotelsInZone.length > 0) {
        setSelectedHotelId(hotelsInZone[0].id);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <Tabs defaultValue={view} value={view} onValueChange={(v) => setView(v as 'list' | 'map')} className="w-full sm:w-auto">
          <TabsList className="grid w-full sm:w-auto grid-cols-2">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List View</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Map View</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(true)}
            className="sm:hidden flex items-center gap-2 w-full"
          >
            <Filter className="h-4 w-4" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </Button>
        </div>
      </div>

      <ActiveFilters 
        activeFilterCount={activeFilterCount}
        searchQuery=""
        setSearchQuery={() => {}}
        selectedStars={selectedStars}
        setSelectedStars={setSelectedStars}
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        clearFilters={clearFilters}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:flex flex-col space-y-6">
          <FilterSidebar 
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedStars={selectedStars}
            handleStarFilter={handleStarFilter}
            selectedAmenities={selectedAmenities}
            handleAmenityFilter={handleAmenityFilter}
            clearFilters={clearFilters}
            commonAmenities={commonAmenities}
          />
          
          {view === 'map' && (
            <ZoneSelector onSelectZone={handleZoneSelect} />
          )}
        </div>

        <div className="lg:col-span-3">
          {view === 'list' ? (
            <HotelContent 
              isLoading={isLoading}
              filteredHotels={filteredHotels}
              activeFilterCount={activeFilterCount}
              clearFilters={clearFilters}
            />
          ) : (
            <div className="space-y-6">
              <div className="h-[60vh] rounded-lg overflow-hidden">
                <HotelMap 
                  hotels={filteredHotels}
                  isLoading={isLoading}
                  selectedHotelId={selectedHotelId}
                  setSelectedHotelId={setSelectedHotelId}
                  onMapMove={handleMapMove}
                />
              </div>

              <div className="block lg:hidden mb-4">
                <ZoneSelector onSelectZone={handleZoneSelect} />
              </div>

              <p className="text-stone-600">
                Showing {visibleHotels.length} {visibleHotels.length === 1 ? 'hotel' : 'hotels'} in current map view
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleHotels.slice(0, 6).map(hotel => (
                  <div 
                    key={hotel.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedHotelId === hotel.id ? 'border-primary bg-primary/5' : 'border-stone-200 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedHotelId(hotel.id)}
                  >
                    <div className="flex items-start gap-3">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        className="w-20 h-20 object-cover rounded" 
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-2">{hotel.name}</h3>
                        <div className="flex items-center text-xs text-yellow-500 mt-1">
                          {Array.from({ length: hotel.stars }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                        <div className="flex items-center text-xs text-stone-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" /> {hotel.location}
                        </div>
                        <div className="font-semibold text-sm mt-1">₹{Math.round(hotel.price_per_night)}/night</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {visibleHotels.length > 6 && (
                <div className="text-center">
                  <Button variant="outline" size="sm" onClick={() => setView('list')}>
                    See all {visibleHotels.length} hotels
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelZone;
