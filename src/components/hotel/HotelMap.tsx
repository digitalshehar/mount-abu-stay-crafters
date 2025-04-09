
import React, { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X, Map as MapIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HotelMapProps {
  isOpen: boolean;
  onClose: () => void;
  hotelName: string;
  latitude: number;
  longitude: number;
}

const HotelMap: React.FC<HotelMapProps> = ({ 
  isOpen, 
  onClose, 
  hotelName,
  latitude,
  longitude
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false);
  
  useEffect(() => {
    if (!isOpen || !mapRef.current || mapInitialized.current) return;
    
    // Create a simple placeholder map with hotel location marker
    const mapElement = mapRef.current;
    mapElement.innerHTML = '';
    
    const mapContainer = document.createElement('div');
    mapContainer.className = 'w-full h-full bg-stone-100 rounded-lg flex items-center justify-center relative';
    
    // Check if Google Maps API key is available in environment variables
    const hasGoogleMapsApiKey = !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (hasGoogleMapsApiKey) {
      const mapImage = document.createElement('img');
      mapImage.src = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x400&markers=color:red%7C${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
      mapImage.alt = `Map showing location of ${hotelName}`;
      mapImage.className = 'w-full h-full object-cover rounded-lg';
      mapImage.onerror = () => {
        mapImage.style.display = 'none';
        showFallbackMap();
      };
      
      mapContainer.appendChild(mapImage);
    } else {
      showFallbackMap();
    }
    
    function showFallbackMap() {
      const fallbackMap = document.createElement('div');
      fallbackMap.className = 'absolute inset-0 flex flex-col bg-stone-100 rounded-lg items-center justify-center text-center p-4';
      fallbackMap.innerHTML = `
        <div class="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-stone-800 mb-1">${hotelName}</h3>
        <p class="text-sm text-stone-600 mb-4">Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}</p>
        <p class="text-xs text-stone-500 max-w-sm">Map display is currently unavailable. Please check back later or contact our support team for directions.</p>
      `;
      
      mapContainer.appendChild(fallbackMap);
    }
    
    mapElement.appendChild(mapContainer);
    mapInitialized.current = true;
    
    return () => {
      mapInitialized.current = false;
    };
  }, [isOpen, hotelName, latitude, longitude]);
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl p-0">
        <DialogTitle className="px-6 py-4 border-b flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary" />
          {hotelName} - Location Map
        </DialogTitle>
        <DialogClose className="absolute right-4 top-4">
          <X className="h-4 w-4" />
        </DialogClose>
        
        <div className="p-6">
          <div ref={mapRef} className="h-[400px] w-full rounded-lg"></div>
          
          <div className="mt-4 space-y-2">
            <h3 className="font-medium">Address</h3>
            <p className="text-sm text-stone-600">{hotelName}</p>
            <p className="text-sm text-stone-600">Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
            
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank')}
                className="flex items-center"
              >
                <MapIcon className="h-4 w-4 mr-1" />
                Open in Google Maps
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HotelMap;
