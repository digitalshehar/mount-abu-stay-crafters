
import React, { useState } from "react";
import { HelpCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NewHotel } from "@/components/admin/hotels/types";

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
  const [previewImage, setPreviewImage] = useState<string | null>(newHotel.image || null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleInputChange(e);
    
    if (value.trim()) {
      setPreviewImage(value);
    } else {
      setPreviewImage(null);
    }
  };
  
  const handleLocationSelect = (location: string) => {
    const syntheticEvent = {
      target: {
        name: "location",
        value: location,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(syntheticEvent);
  };
  
  const locationSuggestions = [
    "Mumbai", "Delhi", "Bangalore", "Goa", "Jaipur", 
    "Chennai", "Kolkata", "Hyderabad", "Udaipur", "Kochi"
  ];

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
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
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="pricePerNight" className={validationErrors.pricePerNight ? "text-red-500" : ""}>
              Base Price Per Night (₹)*
            </Label>
            {validationErrors.pricePerNight && (
              <span className="text-xs text-red-500">{validationErrors.pricePerNight}</span>
            )}
          </div>
          <Input 
            id="pricePerNight"
            name="pricePerNight"
            type="number"
            value={newHotel.pricePerNight}
            onChange={handleInputChange}
            placeholder="Enter price"
            min="1"
            className={validationErrors.pricePerNight ? "border-red-500" : ""}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="stars">Star Rating*</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-stone-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">Star rating affects pricing expectations and search filters.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <select
            id="stars"
            name="stars"
            value={newHotel.stars}
            onChange={handleInputChange}
            className="w-full rounded-md border border-stone-200 px-3 py-2"
            required
          >
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="image" className={validationErrors.image ? "text-red-500" : ""}>
              Main Image URL*
            </Label>
            {validationErrors.image && (
              <span className="text-xs text-red-500">{validationErrors.image}</span>
            )}
          </div>
          <div className="flex space-x-2">
            <Input 
              id="image"
              name="image"
              value={newHotel.image}
              onChange={handleImageChange}
              placeholder="Enter image URL"
              className={`flex-1 ${validationErrors.image ? "border-red-500" : ""}`}
              required
            />
            {handleImageUpload && (
              <div className="relative">
                <Input
                  type="file"
                  id="image-upload"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  accept="image/*"
                />
                <Button type="button" variant="outline" className="h-10">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            )}
          </div>
          
          {(previewImage || newHotel.image) && (
            <div className="mt-2 relative">
              <div className="h-[150px] rounded-md overflow-hidden border border-stone-200">
                <img 
                  src={previewImage || newHotel.image} 
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description"
            name="description"
            value={newHotel.description}
            onChange={handleInputChange}
            placeholder="Enter hotel description"
            rows={4}
          />
          {newHotel.description && (
            <div className="flex justify-between text-xs text-stone-500">
              <span>{newHotel.description.length} characters</span>
              <span>{250 - newHotel.description.length} characters remaining</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1 md:col-span-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={newHotel.featured}
              onChange={handleInputChange}
              className="h-4 w-4"
            />
            <Label htmlFor="featured">Feature this hotel on the homepage</Label>
          </div>
          <p className="text-xs text-stone-500 ml-6">Featured hotels receive more visibility and appear in special sections.</p>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onNext}>Next: Amenities</Button>
      </div>
    </div>
  );
};

export default GeneralInfoTab;
