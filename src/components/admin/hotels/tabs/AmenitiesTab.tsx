
import React from "react";
import { Check, X, Wifi, Droplets, Coffee, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NewHotel } from "@/components/admin/hotels/types";

interface AmenitiesTabProps {
  newHotel: NewHotel;
  handleAmenityToggle: (amenity: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const AmenitiesTab = ({
  newHotel,
  handleAmenityToggle,
  onBack,
  onNext
}: AmenitiesTabProps) => {
  const availableAmenities = [
    "WiFi", "Swimming Pool", "Restaurant", "Spa", "Gym", "Bar", 
    "24/7 Room Service", "Parking", "Laundry", "Pet Friendly", 
    "Air Conditioning", "TV", "Breakfast", "Minibar", "Balcony",
    "Ocean View", "Mountain View", "Airport Shuttle", "Concierge Service"
  ];
  
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi": return <Wifi className="h-5 w-5 text-stone-500" />;
      case "Swimming Pool": return <Droplets className="h-5 w-5 text-stone-500" />;
      case "Restaurant": return <Utensils className="h-5 w-5 text-stone-500" />;
      case "Breakfast": return <Coffee className="h-5 w-5 text-stone-500" />;
      default: return <Check className="h-5 w-5 text-stone-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label className="block">Select Amenities</Label>
          <span className="text-sm text-stone-500">
            {newHotel.amenities.length} selected
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {availableAmenities.map((amenity) => (
            <div 
              key={amenity}
              className={`
                relative flex items-center px-3 py-2 rounded-lg border cursor-pointer
                ${newHotel.amenities.includes(amenity) ? 'border-primary bg-primary/5' : 'border-stone-200'}
              `}
              onClick={() => handleAmenityToggle(amenity)}
            >
              <div className="mr-3">
                {getAmenityIcon(amenity)}
              </div>
              <span>{amenity}</span>
              {newHotel.amenities.includes(amenity) && (
                <div className="absolute right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <Check className="text-white w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {newHotel.amenities.length > 0 && (
          <div className="mt-4 p-4 border border-stone-200 rounded-lg bg-stone-50">
            <h4 className="text-sm font-medium mb-2">Selected Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {newHotel.amenities.map((amenity) => (
                <div 
                  key={amenity}
                  className="bg-white px-2 py-1 rounded border border-stone-200 text-sm flex items-center"
                >
                  {amenity}
                  <button 
                    type="button" 
                    onClick={() => handleAmenityToggle(amenity)}
                    className="ml-1.5 text-stone-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between gap-2 mt-4">
        <Button variant="outline" onClick={onBack}>Back: General</Button>
        <Button variant="outline" onClick={onNext}>Next: Gallery</Button>
      </div>
    </div>
  );
};

export default AmenitiesTab;
