
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewHotel } from "@/components/admin/hotels/types";

interface NameLocationFieldsProps {
  newHotel: NewHotel;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationErrors: {[key: string]: string};
  handleLocationSelect: (location: string) => void;
}

const NameLocationFields = ({ 
  newHotel, 
  handleInputChange, 
  validationErrors,
  handleLocationSelect
}: NameLocationFieldsProps) => {
  const locationSuggestions = [
    "Mumbai", "Delhi", "Bangalore", "Goa", "Jaipur", 
    "Chennai", "Kolkata", "Hyderabad", "Udaipur", "Kochi"
  ];

  return (
    <>
      <div className="space-y-2 md:col-span-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="name" className={validationErrors.name ? "text-red-500" : ""}>
            Hotel Name*
          </Label>
          {validationErrors.name && (
            <span className="text-xs text-red-500">{validationErrors.name}</span>
          )}
        </div>
        <Input 
          id="name"
          name="name"
          value={newHotel.name}
          onChange={handleInputChange}
          placeholder="Enter hotel name"
          className={validationErrors.name ? "border-red-500" : ""}
          required
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="location" className={validationErrors.location ? "text-red-500" : ""}>
            Location*
          </Label>
          {validationErrors.location && (
            <span className="text-xs text-red-500">{validationErrors.location}</span>
          )}
        </div>
        <div className="relative">
          <Input 
            id="location"
            name="location"
            value={newHotel.location}
            onChange={handleInputChange}
            placeholder="Enter location"
            className={validationErrors.location ? "border-red-500" : ""}
            required
          />
          {newHotel.location === "" && (
            <div className="mt-1">
              <div className="text-xs text-stone-500 mb-1">Popular locations:</div>
              <div className="flex flex-wrap gap-1">
                {locationSuggestions.slice(0, 5).map((location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => handleLocationSelect(location)}
                    className="px-2 py-1 text-xs bg-stone-100 rounded hover:bg-stone-200"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NameLocationFields;
