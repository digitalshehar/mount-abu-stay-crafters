
import React, { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Plus, Minus } from "lucide-react";

interface LocationMapProps {
  location: string;
  handleLocationChange: (location: string) => void;
  latitude?: number;
  longitude?: number;
  handleCoordinatesChange?: (lat: number, lng: number) => void;
}

// Sample locations with coordinates for demonstration
const popularLocations = [
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Delhi", lat: 28.6139, lng: 77.2090 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Goa", lat: 15.2993, lng: 74.1240 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 }
];

const LocationMap = ({ 
  location, 
  handleLocationChange,
  latitude = 22.4359, // Mount Abu default
  longitude = 72.7151, // Mount Abu default
  handleCoordinatesChange 
}: LocationMapProps) => {
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(location);
  const [suggestions, setSuggestions] = useState<typeof popularLocations>([]);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const marker = useRef<any>(null);
  
  useEffect(() => {
    // This is where we would load an actual map API
    // For now, we're just simulating the map loading
    setTimeout(() => {
      setMapApiLoaded(true);
    }, 1000);
  }, []);
  
  useEffect(() => {
    // Filter locations as user types
    if (searchQuery) {
      const filtered = popularLocations.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);
  
  const handleLocationSelect = (locationName: string, lat?: number, lng?: number) => {
    handleLocationChange(locationName);
    setSearchQuery(locationName);
    setSuggestions([]);
    
    if (lat && lng && handleCoordinatesChange) {
      handleCoordinatesChange(lat, lng);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Label htmlFor="location">Hotel Location</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input 
              id="location"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a location"
            />
          </div>
          
          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full max-w-md bg-white border border-gray-200 rounded-md shadow-lg">
              <ul className="py-1 overflow-auto max-h-48">
                {suggestions.map((loc, idx) => (
                  <li 
                    key={idx}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => handleLocationSelect(loc.name, loc.lat, loc.lng)}
                  >
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{loc.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex-none mt-auto">
          <Button 
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleLocationSelect(searchQuery)}
            className="h-10"
          >
            Confirm Location
          </Button>
        </div>
      </div>
      
      <div 
        ref={mapContainer} 
        className="h-[300px] rounded-md bg-gray-100 border relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://maps.googleapis.com/maps/api/staticmap?center=Mount+Abu,India&zoom=13&size=600x300&maptype=roadmap&key=DEMO_KEY)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {!mapApiLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm">Loading map...</p>
            </div>
          </div>
        )}
        
        {/* Map Controls */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Button size="icon" variant="secondary" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8">
            <Minus className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Map Pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-bounce">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>
      
      <div className="bg-muted/50 p-3 rounded-md text-sm">
        <p className="font-medium mb-2">Selected Location: {location}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="latitude" className="text-xs">Latitude</Label>
            <Input 
              id="latitude"
              value={latitude}
              onChange={(e) => handleCoordinatesChange && handleCoordinatesChange(parseFloat(e.target.value), longitude)}
              size="sm"
              className="h-8 text-xs"
            />
          </div>
          <div>
            <Label htmlFor="longitude" className="text-xs">Longitude</Label>
            <Input 
              id="longitude"
              value={longitude}
              onChange={(e) => handleCoordinatesChange && handleCoordinatesChange(latitude, parseFloat(e.target.value))}
              size="sm"
              className="h-8 text-xs"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Tip: Drag the pin on the map or enter coordinates manually to set the exact hotel location.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label>Nearby Attractions</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="attraction-restaurant"
              className="rounded text-primary focus:ring-primary"
            />
            <label htmlFor="attraction-restaurant" className="text-sm">Restaurants</label>
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="attraction-shopping"
              className="rounded text-primary focus:ring-primary"
            />
            <label htmlFor="attraction-shopping" className="text-sm">Shopping</label>
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="attraction-landmarks"
              className="rounded text-primary focus:ring-primary"
            />
            <label htmlFor="attraction-landmarks" className="text-sm">Landmarks</label>
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="attraction-transport"
              className="rounded text-primary focus:ring-primary"
            />
            <label htmlFor="attraction-transport" className="text-sm">Transport</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
