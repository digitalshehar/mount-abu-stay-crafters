
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, ExternalLink, Star } from "lucide-react";

interface Attraction {
  name: string;
  distance: string;
  description?: string;
  image?: string;
  rating?: number;
}

interface NearbyAttractionsProps {
  attractions: Attraction[];
  location: string;
}

const NearbyAttractions: React.FC<NearbyAttractionsProps> = ({ attractions, location }) => {
  const [activeView, setActiveView] = useState<'list' | 'map'>('list');
  
  const defaultImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3";
  
  // Generate Google Maps directions URL
  const getDirectionsUrl = (destination: string) => {
    const encodedOrigin = encodeURIComponent(location);
    const encodedDestination = encodeURIComponent(destination);
    return `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}`;
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Nearby Attractions</CardTitle>
            <CardDescription>Points of interest near {location}</CardDescription>
          </div>
          <Tabs defaultValue={activeView} onValueChange={(value) => setActiveView(value as 'list' | 'map')}>
            <TabsList>
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {activeView === 'list' ? (
          <div className="space-y-4">
            {attractions.map((attraction, index) => (
              <div key={index} className="flex border border-gray-100 rounded-lg overflow-hidden">
                <div className="w-1/3 max-w-[150px] h-36">
                  <img 
                    src={attraction.image || defaultImage} 
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{attraction.name}</h3>
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {attraction.distance}
                    </div>
                  </div>
                  
                  {attraction.rating && (
                    <div className="flex items-center mt-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < attraction.rating! ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-600 mt-1">
                    {attraction.description || `Visit ${attraction.name} during your stay.`}
                  </p>
                  
                  <div className="mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      asChild
                    >
                      <a href={getDirectionsUrl(attraction.name)} target="_blank" rel="noopener noreferrer">
                        <Navigation className="h-3 w-3 mr-1" />
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 h-[400px] flex items-center justify-center">
              <div className="text-center p-4">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <h3 className="font-medium text-lg">Map View</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Explore attractions near {location}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                >
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=attractions+near+${encodeURIComponent(location)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NearbyAttractions;
