
import React, { useState, useCallback, useEffect } from "react";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewHotel } from "@/components/admin/hotels/types";

interface LocationMapProps {
  newHotel: NewHotel;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LocationMap = ({ newHotel, handleInputChange }: LocationMapProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Use latitude/longitude from newHotel or default
  const [latitude, setLatitude] = useState<number | undefined>(
    newHotel.latitude !== undefined ? 
    Number(newHotel.latitude) : 
    undefined
  );
  
  const [longitude, setLongitude] = useState<number | undefined>(
    newHotel.longitude !== undefined ? 
    Number(newHotel.longitude) : 
    undefined
  );

  useEffect(() => {
    // Update local state when newHotel changes
    if (newHotel.latitude !== undefined) {
      setLatitude(Number(newHotel.latitude));
    }
    if (newHotel.longitude !== undefined) {
      setLongitude(Number(newHotel.longitude));
    }
  }, [newHotel.latitude, newHotel.longitude]);

  const handleLocationSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    setShowResults(true);
    
    try {
      // For demo purposes, we'll just simulate a search
      // In a real app, you'd use a geocoding service like Google Maps, Mapbox, etc.
      setTimeout(() => {
        const mockResults = [
          { 
            id: 1, 
            name: `${searchQuery} City Center`, 
            address: `123 Main St, ${searchQuery}`, 
            lat: 12.9716 + Math.random(), 
            lng: 77.5946 + Math.random() 
          },
          { 
            id: 2, 
            name: `${searchQuery} Downtown`, 
            address: `456 Park Ave, ${searchQuery}`, 
            lat: 12.9716 + Math.random(), 
            lng: 77.5946 + Math.random() 
          },
          { 
            id: 3, 
            name: `${searchQuery} Airport Area`, 
            address: `789 Airport Rd, ${searchQuery}`, 
            lat: 12.9716 + Math.random(), 
            lng: 77.5946 + Math.random() 
          }
        ];
        
        setSearchResults(mockResults);
        setSearching(false);
      }, 1000);
    } catch (error) {
      console.error("Error searching locations:", error);
      setSearching(false);
    }
  }, [searchQuery]);

  const handleSelectLocation = (location: any) => {
    // Update the form with the selected location
    const latEvent = {
      target: {
        name: "latitude",
        value: location.lat
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    const lngEvent = {
      target: {
        name: "longitude",
        value: location.lng
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(latEvent);
    handleInputChange(lngEvent);
    
    // Update local state
    setLatitude(location.lat);
    setLongitude(location.lng);
    
    // Close results
    setShowResults(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="locationMap">Map Location</Label>
        <div className="mt-2 p-4 border rounded-md bg-gray-50">
          <div className="flex gap-2 mb-4">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a location..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleLocationSearch();
                }
              }}
            />
            <Button 
              variant="outline" 
              onClick={handleLocationSearch}
              disabled={searching}
              type="button"
            >
              <Search size={16} className="mr-1" />
              {searching ? "Searching..." : "Search"}
            </Button>
          </div>
          
          {showResults && searchResults.length > 0 && (
            <div className="mb-4 p-2 border rounded bg-white max-h-60 overflow-y-auto">
              {searchResults.map(result => (
                <div 
                  key={result.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                  onClick={() => handleSelectLocation(result)}
                >
                  <div className="font-medium">{result.name}</div>
                  <div className="text-sm text-gray-500">{result.address}</div>
                </div>
              ))}
            </div>
          )}
          
          <div className="bg-gray-200 rounded-md h-48 flex items-center justify-center relative">
            {(latitude && longitude) ? (
              <div className="text-center">
                <div className="mb-1 font-semibold">Selected Location</div>
                <div className="text-sm">
                  Lat: {latitude.toFixed(6)}, Lng: {longitude.toFixed(6)}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <MapPin size={32} className="mx-auto mb-2" />
                <p>Search and select a location to display on the map</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                name="latitude"
                value={latitude !== undefined ? latitude : ''}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : undefined;
                  setLatitude(value);
                  handleInputChange(e);
                }}
                placeholder="Latitude"
                type="number"
                step="0.000001"
              />
            </div>
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                name="longitude"
                value={longitude !== undefined ? longitude : ''}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : undefined;
                  setLongitude(value);
                  handleInputChange(e);
                }}
                placeholder="Longitude"
                type="number"
                step="0.000001"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
