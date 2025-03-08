
import React from "react";
import { Button } from "@/components/ui/button";
import { NewHotel } from "@/components/admin/hotels/types";
import NameLocationFields from "./general/NameLocationFields";
import PriceRatingFields from "./general/PriceRatingFields";
import ImagePreview from "./general/ImagePreview";
import DescriptionField from "./general/DescriptionField";
import FeaturedToggle from "./general/FeaturedToggle";

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
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onNext}>Next: Amenities</Button>
      </div>
    </div>
  );
};

export default GeneralInfoTab;
