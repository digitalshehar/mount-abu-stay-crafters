
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';
import { Hotel } from '@/components/admin/hotels/types';
import { Button } from '@/components/ui/button';
import { Loader2, Map as MapIcon, List } from 'lucide-react';
import ZoneSelector from './ZoneSelector';
import ActiveFilters from '../ActiveFilters';
import FilterSidebar from '../FilterSidebar';
import HotelContent from '../HotelContent';
import MapLoading from './MapLoading';
import './HotelMapStyles.css';

// Set your mapbox token from environment variable
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [id: number]: mapboxgl.Marker }>({});
  const popupsRef = useRef<{ [id: number]: mapboxgl.Popup }>({});
  const navigate = useNavigate();
  
  // View state (map or list)
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  
  // Filter states
  const [localSelectedHotelId, setLocalSelectedHotelId] = useState<number | null>(selectedHotelId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 15000]);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  
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
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxgl.accessToken || map.current || isLoading) return;
    
    const initializeMap = () => {
      // Mount Abu coordinates
      const mountAbu = {
        lng: 72.7156,
        lat: 24.5927
      };
      
      const newMap = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [mountAbu.lng, mountAbu.lat],
        zoom: 13
      });
      
      newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
      newMap.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      
      newMap.on('load', () => {
        setIsMapInitialized(true);
      });

      // Add move end event for parent components to track bounds
      if (onMapMove) {
        newMap.on('moveend', () => {
          const bounds = newMap.getBounds();
          onMapMove(bounds);
        });
      }
      
      map.current = newMap;
    };
    
    initializeMap();
    
    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [isLoading, onMapMove]);
  
  // Update markers when filtered hotels change or map is initialized
  useEffect(() => {
    if (!map.current || !isMapInitialized) return;
    
    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    Object.values(popupsRef.current).forEach(popup => popup.remove());
    markersRef.current = {};
    popupsRef.current = {};
    
    // Add new markers for filtered hotels
    filteredHotels.forEach(hotel => {
      if (!hotel.latitude || !hotel.longitude) return;
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: true })
        .setHTML(`
          <div class="hotel-popup">
            <img src="${hotel.image}" alt="${hotel.name}" class="popup-image" />
            <div class="popup-content">
              <h3 class="popup-title">${hotel.name}</h3>
              <div class="popup-rating">
                ${Array(Math.floor(hotel.stars)).fill('★').join('')}
              </div>
              <div class="popup-price">₹${hotel.pricePerNight} / night</div>
              <button class="popup-button" data-hotel-id="${hotel.id}">View Details</button>
            </div>
          </div>
        `);
      
      // Add event listener for the View Details button
      popup.on('open', () => {
        const button = document.querySelector(`.popup-button[data-hotel-id="${hotel.id}"]`);
        if (button) {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(`/hotel/${hotel.slug}`);
          });
        }
      });
      
      // Create marker element
      const el = document.createElement('div');
      el.className = 'hotel-marker';
      
      // Create price label
      const priceMarker = document.createElement('div');
      priceMarker.className = `price-marker ${effectiveSelectedHotelId === hotel.id ? 'selected' : ''}`;
      priceMarker.textContent = `₹${Math.round(hotel.pricePerNight / 100) * 100}`;
      el.appendChild(priceMarker);
      
      // Create and add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat([hotel.longitude, hotel.latitude])
        .setPopup(popup)
        .addTo(map.current!);
      
      // Store marker reference
      markersRef.current[hotel.id] = marker;
      popupsRef.current[hotel.id] = popup;
      
      // Add click event to marker
      el.addEventListener('click', () => {
        handleHotelSelect(hotel.id);
        
        // Update all markers to reflect selection
        Object.keys(markersRef.current).forEach(id => {
          const markerEl = markersRef.current[Number(id)].getElement();
          const priceEl = markerEl.querySelector('.price-marker');
          if (priceEl) {
            if (Number(id) === hotel.id) {
              priceEl.classList.add('selected');
            } else {
              priceEl.classList.remove('selected');
            }
          }
        });
      });
    });
  }, [filteredHotels, isMapInitialized, navigate, effectiveSelectedHotelId, setSelectedHotelId]);
  
  // Handle zone selection
  const handleZoneSelect = (bounds: any) => {
    if (!map.current || !bounds) return;
    
    map.current.fitBounds(bounds, {
      padding: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    // Notify parent component about bounds change if callback provided
    if (onMapMove) {
      onMapMove(bounds);
    }
  };
  
  // Common amenities for filter
  const commonAmenities = [
    "WiFi", "Swimming Pool", "Restaurant", "Spa", "Gym", 
    "Breakfast", "Parking", "Air Conditioning"
  ];
  
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
              {!mapboxgl.accessToken && (
                <div className="absolute inset-0 bg-white bg-opacity-90 z-10 flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-lg font-medium text-red-600 mb-2">Mapbox Access Token Missing</div>
                  <p className="text-sm text-stone-600 mb-4">
                    Please add your Mapbox access token to the .env file as VITE_MAPBOX_ACCESS_TOKEN.
                  </p>
                </div>
              )}
              
              {isLoading ? (
                <MapLoading />
              ) : (
                <div ref={mapContainer} className="h-full w-full" />
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
              Showing {filteredHotels.length} hotels in Mount Abu. Use the map to explore hotel locations or switch to list view to see detailed listings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelMap;
