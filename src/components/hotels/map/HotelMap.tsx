import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { Hotel } from '@/integrations/supabase/custom-types';
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import MapHeader from './components/MapHeader';
import MapSidebar from './components/MapSidebar';
import MapContainer from './components/MapContainer';
import MapFeaturesManager from './components/MapFeaturesManager';
import MapStats from './components/MapStats';
import HotelContent from '../HotelContent';
import CompareHotelsFeature from '../comparison/CompareHotelsFeature';
import { useMapFilters } from './hooks/useMapFilters';
import { useHotelComparison } from '@/hooks/useHotelComparison';
import { adminToIntegrationHotel, convertAdminToIntegrationHotels } from '@/utils/hotelTypeAdapter';
import './HotelMapStyles.css';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mountAbuCenter = {
  lat: 24.5927,
  lng: 72.7156,
};

const defaultZoom = 13;

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
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef<google.maps.Map | null>(null);
  
  const queryParams = new URLSearchParams(location.search);
  const selectedHotelSlug = queryParams.get('selected');
  
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  
  const [localSelectedHotelId, setLocalSelectedHotelId] = useState<number | null>(selectedHotelId || null);
  const [selectedMarker, setSelectedMarker] = useState<Hotel | null>(null);
  
  const [mapCenter, setMapCenter] = useState(mountAbuCenter);
  const [mapZoom, setMapZoom] = useState(defaultZoom);
  
  const [showHeatmap, setShowHeatmap] = useState(false);

  const { compareList, addToCompare, removeFromCompare, clearCompare, isInCompare } = useHotelComparison();

  const {
    searchQuery,
    setSearchQuery,
    selectedStars,
    setSelectedStars,
    selectedAmenities,
    setSelectedAmenities,
    priceRange,
    setPriceRange,
    mapBounds,
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
  
  useEffect(() => {
    if (selectedHotelSlug && hotels.length > 0) {
      const hotel = hotels.find(h => h.slug === selectedHotelSlug);
      
      if (hotel) {
        const integrationHotel = adminToIntegrationHotel(hotel);
        setSelectedMarker(integrationHotel);
        setLocalSelectedHotelId(hotel.id);
        
        if (mapRef.current && hotel.latitude && hotel.longitude) {
          setMapCenter({
            lat: hotel.latitude,
            lng: hotel.longitude
          });
          setMapZoom(15);
        }
      }
    }
  }, [selectedHotelSlug, hotels, isLoaded]);
  
  const convertedHotels: Hotel[] = convertAdminToIntegrationHotels(hotels);
  
  const filteredHotels = filterHotels(convertedHotels);
  
  const visibleHotels = getVisibleHotels(filteredHotels, viewMode);

  const handleHotelSelect = (id: number) => {
    if (setSelectedHotelId) {
      setSelectedHotelId(id);
    } else {
      setLocalSelectedHotelId(id);
    }
  };

  const effectiveSelectedHotelId = selectedHotelId !== undefined ? selectedHotelId : localSelectedHotelId;
  
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  
  const handleBoundsChanged = () => {
    if (mapRef.current && onMapMove) {
      const bounds = mapRef.current.getBounds();
      if (bounds) {
        setMapBounds(bounds);
        onMapMove({
          getSouth: () => bounds.getSouthWest().lat(),
          getNorth: () => bounds.getNorthEast().lat(),
          getWest: () => bounds.getSouthWest().lng(),
          getEast: () => bounds.getNorthEast().lng(),
        });
      }
    }
  };
  
  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedMarker(hotel);
  };
  
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
              filteredHotels={convertedHotels} 
              activeFilterCount={activeFilterCount}
              clearFilters={clearFilters}
              compareList={compareList}
              onAddToCompare={addToCompare}
              onRemoveFromCompare={removeFromCompare}
              isInCompare={isInCompare}
            />
          )}
          
          <MapStats 
            visibleHotels={visibleHotels}
            showHeatmap={showHeatmap}
            viewMode={viewMode}
          />
        </div>
      </div>
      
      <CompareHotelsFeature 
        hotels={convertedHotels} 
        compareList={compareList}
        onAddToCompare={addToCompare}
        onRemoveFromCompare={removeFromCompare}
        onClearCompare={clearCompare}
      />
    </div>
  );
};

export default HotelMap;
