
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { Hotel } from '@/components/admin/hotels/types';
import ZoneSelector from './ZoneSelector';
import ActiveFilters from '../ActiveFilters';
import FilterSidebar from '../FilterSidebar';
import HotelContent from '../HotelContent';
import MapControls from './components/MapControls';
import MapContainer from './components/MapContainer';
import MapFeatures from './components/MapFeatures';
import { useMapFilters } from './hooks/useMapFilters';
import './HotelMapStyles.css';

// Define map container styles
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// Mount Abu center coordinates
const mountAbuCenter = {
  lat: 24.5927,
  lng: 72.7156,
};

// Map options
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

// Define libraries array statically to prevent unnecessary reloads
const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = ['places'];

interface HotelMapProps {
  hotels: Hotel[];
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
  
  // Get the selected hotel slug from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const selectedHotelSlug = queryParams.get('selected');
  
  // View state (map or list)
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  
  // State for selected hotel and info window
  const [localSelectedHotelId, setLocalSelectedHotelId] = useState<number | null>(selectedHotelId || null);
  const [selectedMarker, setSelectedMarker] = useState<Hotel | null>(null);
  
  // Map feature states
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showLandmarks, setShowLandmarks] = useState(false);
  const [showTraffic, setShowTraffic] = useState(false);
  
  // Filter states and handlers from custom hook
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
  
  // Load Google Maps script with the API key from env variables
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });
  
  // Set selected hotel based on URL parameter
  useEffect(() => {
    if (selectedHotelSlug && hotels.length > 0) {
      const hotel = hotels.find(h => h.slug === selectedHotelSlug);
      if (hotel) {
        setSelectedMarker(hotel);
        setLocalSelectedHotelId(hotel.id);
        
        // If the map is loaded, center on the selected hotel
        if (mapRef.current && hotel.latitude && hotel.longitude) {
          mapRef.current.panTo({ lat: hotel.latitude, lng: hotel.longitude });
          mapRef.current.setZoom(15);
        }
      }
    }
  }, [selectedHotelSlug, hotels, isLoaded]);
  
  // Calculate filtered hotels
  const filteredHotels = filterHotels(hotels);
  
  // Get visible hotels
  const visibleHotels = getVisibleHotels(filteredHotels, viewMode);

  // Use local or external selectedHotelId depending on props
  const handleHotelSelect = (id: number) => {
    if (setSelectedHotelId) {
      setSelectedHotelId(id);
    } else {
      setLocalSelectedHotelId(id);
    }
  };

  // Get effective selected hotel ID
  const effectiveSelectedHotelId = selectedHotelId !== undefined ? selectedHotelId : localSelectedHotelId;
  
  // Handle map load
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  
  // Handle map bounds change
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
  
  // Handle zone selection
  const handleZoneSelect = (bounds: any) => {
    if (!mapRef.current || !bounds) return;
    
    const newBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(bounds.getSouth(), bounds.getWest()),
      new google.maps.LatLng(bounds.getNorth(), bounds.getEast())
    );
    
    mapRef.current.fitBounds(newBounds, {
      top: 50, bottom: 50, left: 50, right: 50
    });
    
    // Notify parent component about bounds change if callback provided
    if (onMapMove) {
      onMapMove(bounds);
    }
  };

  // Handle user location
  const handleUserLocation = () => {
    if (navigator.geolocation && mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          mapRef.current?.setCenter(pos);
          mapRef.current?.setZoom(14);
          
          // Create a marker for user location
          new google.maps.Marker({
            position: pos,
            map: mapRef.current,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
            title: "Your Location",
          });
        },
        () => {
          alert("Error: The Geolocation service failed.");
        }
      );
    } else {
      alert("Error: Your browser doesn't support geolocation.");
    }
  };
  
  // Common amenities for filter
  const commonAmenities = [
    "WiFi", "Swimming Pool", "Restaurant", "Spa", "Gym", 
    "Breakfast", "Parking", "Air Conditioning"
  ];
  
  // Handle rendering errors
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Hotels in Mount Abu</h1>
        
        <MapControls viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      
      {activeFilterCount > 0 && (
        <div className="mb-6">
          <ActiveFilters 
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
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        <div>
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
          
          <div className="mt-6">
            <ZoneSelector onSelectZone={handleZoneSelect} />
          </div>
        </div>
        
        <div className="space-y-6">
          {viewMode === 'map' ? (
            <div className="relative">
              <MapContainer
                isLoading={isLoading}
                isLoaded={isLoaded}
                mapContainerStyle={mapContainerStyle}
                mountAbuCenter={mountAbuCenter}
                mapOptions={{
                  ...mapOptions,
                  // Add dynamic map options
                  showTraffic,
                }}
                filteredHotels={filteredHotels}
                selectedHotelId={effectiveSelectedHotelId}
                selectedMarker={selectedMarker}
                setSelectedMarker={setSelectedMarker}
                handleHotelSelect={handleHotelSelect}
                onMapLoad={onMapLoad}
                handleBoundsChanged={handleBoundsChanged}
                showHeatmap={showHeatmap}
              />
              
              <MapFeatures 
                onToggleHeatmap={() => setShowHeatmap(!showHeatmap)}
                onToggleLandmarks={() => setShowLandmarks(!showLandmarks)}
                onToggleTraffic={() => setShowTraffic(!showTraffic)}
                onUserLocation={handleUserLocation}
              />
            </div>
          ) : (
            <HotelContent 
              isLoading={isLoading}
              filteredHotels={filteredHotels}
              activeFilterCount={activeFilterCount}
              clearFilters={clearFilters}
            />
          )}
          
          <div className="bg-stone-50 p-4 rounded-lg">
            <p className="text-sm text-stone-600">
              Showing {visibleHotels.length} hotels in Mount Abu. Use the map to explore hotel locations or switch to list view to see detailed listings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelMap;
