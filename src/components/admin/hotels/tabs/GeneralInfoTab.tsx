
import React from "react";
import { Button } from "@/components/ui/button";
import { NewHotel } from "@/components/admin/hotels/types";
import NameLocationFields from "./general/NameLocationFields";
import PriceRatingFields from "./general/PriceRatingFields";
import ImagePreview from "./general/ImagePreview";
import DescriptionField from "./general/DescriptionField";
import FeaturedToggle from "./general/FeaturedToggle";
import LocationMapSelector from "./general/LocationMapSelector";

interface GeneralInfoTabProps {
  newHotel: NewHotel;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  validationErrors: {[key: string]: string};
  handleImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
}

const GeneralInfoTab = ({
  newHotel,
  handleInputChange,
  validationErrors,
  handleImageUpload,
  onNext
}: GeneralInfoTabProps) => {
  const handleLocationSelect = (location: string) => {
    const syntheticEvent = {
      target: {
        name: "location",
        value: location,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(syntheticEvent);
  };

  const handleMapLocationChange = (latitude: number, longitude: number) => {
    // Create synthetic events for both latitude and longitude
    const latEvent = {
      target: {
        name: "latitude",
        value: latitude,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    const lngEvent = {
      target: {
        name: "longitude",
        value: longitude,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    // Update both values
    handleInputChange(latEvent);
    handleInputChange(lngEvent);
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <NameLocationFields 
          newHotel={newHotel}
          handleInputChange={handleInputChange}
          validationErrors={validationErrors}
          handleLocationSelect={handleLocationSelect}
        />
        
        <PriceRatingFields 
          newHotel={newHotel}
          handleInputChange={handleInputChange}
          validationErrors={validationErrors}
        />
        
        <ImagePreview 
          imageUrl={newHotel.image}
          handleImageChange={handleInputChange}
          handleImageUpload={handleImageUpload}
          validationErrors={validationErrors}
        />
        
        <DescriptionField 
          description={newHotel.description}
          handleInputChange={handleInputChange}
        />
        
        <FeaturedToggle 
          isFeatured={newHotel.featured}
          handleInputChange={handleInputChange}
        />
      </div>

      <div className="mt-6 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Hotel Location on Map</h3>
        <LocationMapSelector
          latitude={newHotel.latitude}
          longitude={newHotel.longitude}
          onLocationChange={handleMapLocationChange}
        />
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onNext}>Next: Amenities</Button>
      </div>
    </div>
  );
};

export default GeneralInfoTab;
