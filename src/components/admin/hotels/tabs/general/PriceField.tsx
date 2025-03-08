
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewHotel } from "@/components/admin/hotels/types";

interface PriceFieldProps {
  newHotel: NewHotel;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  validationErrors: {[key: string]: string};
}

const PriceField = ({ 
  newHotel, 
  handleInputChange, 
  validationErrors 
}: PriceFieldProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="pricePerNight" className={validationErrors.pricePerNight ? "text-red-500" : ""}>
          Base Price Per Night (₹)*
        </Label>
        {validationErrors.pricePerNight && (
          <span className="text-xs text-red-500">{validationErrors.pricePerNight}</span>
        )}
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
        <Input 
          id="pricePerNight"
          name="pricePerNight"
          type="number"
          value={newHotel.pricePerNight}
          onChange={handleInputChange}
          placeholder="Enter price"
          min="1"
          className={`pl-7 ${validationErrors.pricePerNight ? "border-red-500" : ""}`}
          required
        />
      </div>
    </div>
  );
};

export default PriceField;
