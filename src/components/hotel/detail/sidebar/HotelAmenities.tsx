
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, Coffee, Tv, Bath, UtensilsCrossed, Car, Wind, DoorOpen, Snowflake } from 'lucide-react';

interface HotelAmenitiesProps {
  amenities: string[];
}

const HotelAmenities: React.FC<HotelAmenitiesProps> = ({ amenities = [] }) => {
  // Map of amenity names to icons
  const amenityIcons: Record<string, React.ReactNode> = {
    "WiFi": <Wifi className="h-4 w-4" />,
    "Breakfast": <Coffee className="h-4 w-4" />,
    "TV": <Tv className="h-4 w-4" />,
    "Bathroom": <Bath className="h-4 w-4" />,
    "Restaurant": <UtensilsCrossed className="h-4 w-4" />,
    "Parking": <Car className="h-4 w-4" />,
    "AC": <Wind className="h-4 w-4" />,
    "Room Service": <DoorOpen className="h-4 w-4" />,
    "Air Conditioning": <Snowflake className="h-4 w-4" />
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Amenities</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-2 gap-2">
          {amenities.map((amenity, index) => (
            <div key={`${amenity}-${index}`} className="flex items-center">
              <span className="w-5 h-5 mr-2 flex items-center justify-center text-primary">
                {amenityIcons[amenity] || "•"}
              </span>
              <span className="text-sm">{amenity}</span>
            </div>
          ))}
          
          {amenities.length === 0 && (
            <p className="text-sm text-muted-foreground col-span-2">No amenities listed</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelAmenities;
