
import React, { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

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
  
  useEffect(() => {
    if (!isOpen || !mapRef.current) return;
    
    // Create a simple placeholder map with hotel location marker
    const mapElement = mapRef.current;
    mapElement.innerHTML = '';
    
    const mapContainer = document.createElement('div');
    mapContainer.className = 'w-full h-full bg-stone-100 rounded-lg flex items-center justify-center relative';
    
    const mapImage = document.createElement('img');
    mapImage.src = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x400&markers=color:red%7C${latitude},${longitude}&key=AIzaSyAyz-GXUEh5ivQGLhAF0BQQXhH7y7kJwpM`;
    mapImage.alt = `Map showing location of ${hotelName}`;
    mapImage.className = 'w-full h-full object-cover rounded-lg';
    mapImage.onerror = () => {
      mapImage.style.display = 'none';
      mapFallback.style.display = 'flex';
    };
    
    const mapFallback = document.createElement('div');
    mapFallback.className = 'absolute inset-0 flex-col bg-stone-100 rounded-lg items-center justify-center text-center p-4 hidden';
    mapFallback.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-3 text-stone-400">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
      <p class="text-lg font-semibold text-stone-600">${hotelName}</p>
      <p class="text-sm text-stone-500">Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}</p>
    `;
    
    mapContainer.appendChild(mapImage);
    mapContainer.appendChild(mapFallback);
    mapElement.appendChild(mapContainer);
    
  }, [isOpen, hotelName, latitude, longitude]);
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl p-0">
        <DialogTitle className="px-6 py-4 border-b">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HotelMap;
