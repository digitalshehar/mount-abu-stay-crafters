
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hotel } from '@/integrations/supabase/custom-types';
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import { adminToIntegrationHotel } from '@/utils/hotelTypeAdapter';

export const useSelectedHotel = (
  hotels: AdminHotel[], 
  isLoaded: boolean,
  setMapCenter: (center: { lat: number; lng: number }) => void,
  setMapZoom: (zoom: number) => void
) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedHotelSlug = queryParams.get('selected');
  
  const [localSelectedHotelId, setLocalSelectedHotelId] = useState<number | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Hotel | null>(null);
  
  // Find hotel by slug in URL and center map on it
  useEffect(() => {
    if (selectedHotelSlug && hotels.length > 0) {
      const hotel = hotels.find(h => h.slug === selectedHotelSlug);
      
      if (hotel) {
        const integrationHotel = adminToIntegrationHotel(hotel);
        setSelectedMarker(integrationHotel);
        setLocalSelectedHotelId(hotel.id);
        
        if (hotel.latitude && hotel.longitude) {
          setMapCenter({
            lat: hotel.latitude,
            lng: hotel.longitude
          });
          setMapZoom(15);
        }
      }
    }
  }, [selectedHotelSlug, hotels, isLoaded, setMapCenter, setMapZoom]);
  
  const handleHotelSelect = (id: number) => {
    setLocalSelectedHotelId(id);
  };
  
  return {
    selectedHotelSlug,
    localSelectedHotelId,
    setLocalSelectedHotelId,
    selectedMarker,
    setSelectedMarker,
    handleHotelSelect
  };
};
