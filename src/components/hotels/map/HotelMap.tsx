import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, useLoadScript, MarkerClusterer, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { Hotel } from '@/components/admin/hotels/types';
import { Button } from '@/components/ui/button';
import { Loader2, Map as MapIcon, List, Star } from 'lucide-react';
import ZoneSelector from './ZoneSelector';
import ActiveFilters from '../ActiveFilters';
import FilterSidebar from '../FilterSidebar';
import HotelContent from '../HotelContent';
import MapLoading from './MapLoading';
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
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 15000]);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(null);
  
  // Load Google Maps script with the API key from env variables
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
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
  
  // Calculate filtered hotels based on filters
  const filteredHotels = hotels.filter(hotel => {
    // Search query filter
    if (searchQuery && !hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !hotel.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Star rating filter
    if (selectedStars.length > 0 && !selectedStars.includes(hotel.stars)) {
      return false;
    }
    
    // Price range filter
    if (hotel.pricePerNight < priceRange[0] || hotel.pricePerNight > priceRange[1]) {
      return false;
    }
    
    // Amenities filter
    if (selectedAmenities.length > 0) {
      for (const amenity of selectedAmenities) {
        if (!hotel.amenities.includes(amenity)) {
          return false;
        }
      }
    }
    
    return true;
  });
  
  // Get active filter count
  const activeFilterCount = 
    (searchQuery ? 1 : 0) + 
    selectedStars.length + 
    selectedAmenities.length + 
    (priceRange[0] !== 1000 || priceRange[1] !== 15000 ? 1 : 0);
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStars([]);
    setSelectedAmenities([]);
    setPriceRange([1000, 15000]);
  };
  
  // Handle star filter toggle
  const handleStarFilter = (star: number) => {
    setSelectedStars(prev => 
      prev.includes(star) 
        ? prev.filter(s => s !== star) 
        : [...prev, star]
    );
  };
  
  // Handle amenity filter toggle
  const handleAmenityFilter = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

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
  
  // Handle marker click
  const handleMarkerClick = (hotel: Hotel) => {
    setSelectedMarker(hotel);
    handleHotelSelect(hotel.id);
  };
  
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
  
  // Filter visible hotels based on map bounds
  const visibleHotels = mapBounds && viewMode === 'map'
    ? filteredHotels.filter(hotel => 
        hotel.latitude && 
        hotel.longitude && 
        hotel.latitude >= mapBounds.getSouthWest().lat() && 
        hotel.latitude <= mapBounds.getNorthEast().lat() && 
        hotel.longitude >= mapBounds.getSouthWest().lng() && 
        hotel.longitude <= mapBounds.getNorthEast().lng()
      )
    : filteredHotels;
  
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
        
        <div className="flex items-center space-x-2">
          <Button 
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('map')}
            className="flex items-center"
          >
            <MapIcon className="h-4 w-4 mr-1" />
            Map
          </Button>
          
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('list')}
            className="flex items-center"
          >
            <List className="h-4 w-4 mr-1" />
            List
          </Button>
        </div>
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
            <div className="h-[500px] rounded-lg overflow-hidden shadow-md relative">
              {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
                <div className="absolute inset-0 bg-white bg-opacity-90 z-10 flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-lg font-medium text-red-600 mb-2">Google Maps API Key Missing</div>
                  <p className="text-sm text-stone-600 mb-4">
                    Please add your Google Maps API key to the .env file as VITE_GOOGLE_MAPS_API_KEY.
                  </p>
                </div>
              )}
              
              {isLoading || !isLoaded ? (
                <MapLoading />
              ) : (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mountAbuCenter}
                  zoom={13}
                  options={mapOptions}
                  onLoad={onMapLoad}
                  onBoundsChanged={handleBoundsChanged}
                >
                  <MarkerClusterer>
                    {(clusterer) => (
                      <>
                        {filteredHotels.map(hotel => {
                          if (!hotel.latitude || !hotel.longitude) return null;
                          
                          return (
                            <Marker
                              key={hotel.id}
                              position={{ lat: hotel.latitude, lng: hotel.longitude }}
                              onClick={() => handleMarkerClick(hotel)}
                              clusterer={clusterer}
                              icon={{
                                path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                                fillColor: effectiveSelectedHotelId === hotel.id ? '#0ea5e9' : '#718096',
                                fillOpacity: 1,
                                strokeWeight: 1,
                                strokeColor: '#ffffff',
                                scale: 1.5,
                                anchor: new google.maps.Point(12, 22),
                                labelOrigin: new google.maps.Point(12, 10),
                              }}
                              label={{
                                text: `₹${Math.round(hotel.pricePerNight/100)*100}`,
                                className: `price-label ${effectiveSelectedHotelId === hotel.id ? 'selected' : ''}`,
                                color: effectiveSelectedHotelId === hotel.id ? '#ffffff' : '#1a202c',
                              }}
                            />
                          );
                        })}
                        
                        {selectedMarker && (
                          <InfoWindow
                            position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
                            onCloseClick={() => setSelectedMarker(null)}
                          >
                            <div className="hotel-popup">
                              <img 
                                src={selectedMarker.image} 
                                alt={selectedMarker.name} 
                                className="popup-image w-full h-32 object-cover mb-2 rounded-t"
                              />
                              <div className="popup-content p-3">
                                <h3 className="popup-title text-base font-medium mb-1">{selectedMarker.name}</h3>
                                <div className="popup-rating flex items-center mb-1 text-yellow-500">
                                  {Array.from({ length: Math.floor(selectedMarker.stars) }, (_, i) => (
                                    <Star key={i} className="h-3 w-3 fill-current" />
                                  ))}
                                  <span className="text-xs text-stone-500 ml-1">
                                    {selectedMarker.rating.toFixed(1)} ({selectedMarker.reviewCount} reviews)
                                  </span>
                                </div>
                                <div className="popup-amenities mb-2">
                                  <p className="text-xs text-stone-600 line-clamp-1">
                                    {selectedMarker.amenities.slice(0, 3).join(' • ')}
                                  </p>
                                </div>
                                <div className="popup-price text-sm font-semibold mb-2">₹{selectedMarker.pricePerNight.toLocaleString()} / night</div>
                                <button 
                                  className="popup-button w-full bg-primary text-white text-sm py-1 px-3 rounded hover:bg-primary/90 transition-colors"
                                  onClick={() => navigate(`/hotel/${selectedMarker.slug}`)}
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </InfoWindow>
                        )}
                      </>
                    )}
                  </MarkerClusterer>
                </GoogleMap>
              )}
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
