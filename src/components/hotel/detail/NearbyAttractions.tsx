
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const openGoogleMaps = (attractionName: string) => {
    const query = encodeURIComponent(`${attractionName} near ${location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nearby Attractions</CardTitle>
        <CardDescription>Popular places around {location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {attractions.length === 0 ? (
            <p className="text-muted-foreground">No nearby attractions found</p>
          ) : (
            attractions.map((attraction, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-3 border rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="w-16 h-16 bg-slate-200 rounded-md overflow-hidden flex-shrink-0">
                  {attraction.image ? (
                    <img 
                      src={attraction.image} 
                      alt={attraction.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-slate-400" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{attraction.name}</h3>
                    <span className="text-sm text-muted-foreground">{attraction.distance}</span>
                  </div>
                  
                  {attraction.rating && (
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                      <span className="text-xs ml-1">{attraction.rating}</span>
                    </div>
                  )}
                  
                  {attraction.description && (
                    <p className="text-sm text-muted-foreground mt-1">{attraction.description}</p>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 p-0 h-auto text-primary"
                    onClick={() => openGoogleMaps(attraction.name)}
                  >
                    <Map className="h-3 w-3 mr-1" />
                    <span className="text-xs">View on Map</span>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-6">
          <Button variant="outline" className="w-full" onClick={() => openGoogleMaps('attractions')}>
            Explore More Attractions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NearbyAttractions;
