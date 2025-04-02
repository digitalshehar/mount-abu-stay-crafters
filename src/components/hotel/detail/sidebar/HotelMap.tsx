
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import HotelMapDialog from '@/components/hotel/HotelMap';

interface HotelMapProps {
  location: string;
  latitude: number;
  longitude: number;
}

const HotelMap: React.FC<HotelMapProps> = ({ location, latitude, longitude }) => {
  const [showMapDialog, setShowMapDialog] = useState(false);
  
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Location</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm">{location}</span>
            </div>
            
            <div className="bg-slate-100 h-[100px] rounded-md flex items-center justify-center relative cursor-pointer" onClick={() => setShowMapDialog(true)}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
              </div>
              <span className="text-xs absolute bottom-2 right-2 bg-white/80 px-1 py-0.5 rounded text-muted-foreground">
                View Map
              </span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-1 text-xs"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank')}
            >
              <ExternalLink className="h-3 w-3" />
              Open in Google Maps
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showMapDialog && (
        <HotelMapDialog 
          isOpen={showMapDialog}
          onClose={() => setShowMapDialog(false)}
          hotelName={location}
          latitude={latitude}
          longitude={longitude}
        />
      )}
    </>
  );
};

export default HotelMap;
