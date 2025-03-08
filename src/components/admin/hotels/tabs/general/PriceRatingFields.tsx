
import React from "react";
import { NewHotel } from "@/components/admin/hotels/types";
import PriceField from "./PriceField";
import StarRatingField from "./StarRatingField";

interface PriceRatingFieldsProps {
  newHotel: NewHotel;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  validationErrors: {[key: string]: string};
}

const PriceRatingFields = ({ 
  newHotel, 
  handleInputChange, 
  validationErrors 
}: PriceRatingFieldsProps) => {
  return (
    <>
      <PriceField 
        newHotel={newHotel}
        handleInputChange={handleInputChange}
        validationErrors={validationErrors}
      />
      
      <StarRatingField
        newHotel={newHotel}
        handleInputChange={handleInputChange}
      />
    </>
  );
};

export default PriceRatingFields;
