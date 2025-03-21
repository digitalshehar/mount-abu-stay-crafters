
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Hotel } from '@/components/admin/hotels/types';

interface HotelMapProps {
  hotels: Hotel[];
  isLoading: boolean;
  center: {
    lat: number;
    lng: number;
    name?: string;
  };
}

const HotelMap: React.FC<HotelMapProps> = ({ hotels, isLoading, center }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 w-full bg-stone-100 rounded-lg">
        <div className="animate-pulse text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 w-full bg-stone-100 rounded-lg">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No hotels to display on map</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-stone-100 rounded-lg p-6 h-[500px] flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Map View Coming Soon</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're working on integrating an interactive map to show all {hotels.length} hotels in Mount Abu. 
            Check back soon for this feature!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.slice(0, 6).map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">{hotel.name}</h4>
                  <p className="text-sm text-muted-foreground">{hotel.location}</p>
                  <p className="text-sm mt-1">₹{hotel.pricePerNight} per night</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotelMap;
