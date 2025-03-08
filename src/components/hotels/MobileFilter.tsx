
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

// Define the interface directly here rather than importing it
interface MobileFilterProps {
  isOpen: boolean;
  onClose: () => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedStars: number[];
  handleStarFilter: (star: number) => void;
  selectedAmenities: string[];
  handleAmenityFilter: (amenity: string) => void;
  clearFilters: () => void;
  commonAmenities: string[];
}

const MobileFilter = ({
  isOpen,
  onClose,
  priceRange,
  setPriceRange,
  selectedStars,
  handleStarFilter,
  selectedAmenities,
  handleAmenityFilter,
  clearFilters,
  commonAmenities
}: MobileFilterProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
      <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-white flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Filters</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h4 className="font-medium mb-3">Price Range (₹)</h4>
            <Slider
              value={priceRange}
              min={1000}
              max={15000}
              step={500}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="my-6"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm bg-stone-100 px-2 py-1 rounded">
                ₹{priceRange[0]}
              </span>
              <span className="text-sm bg-stone-100 px-2 py-1 rounded">
                ₹{priceRange[1]}
              </span>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-3">Star Rating</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-star-${star}`}
                    checked={selectedStars.includes(star)}
                    onCheckedChange={() => handleStarFilter(star)}
                  />
                  <label
                    htmlFor={`mobile-star-${star}`}
                    className="flex items-center cursor-pointer"
                  >
                    <div className="flex">
                      {Array.from({ length: star }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-3">Amenities</h4>
            <div className="space-y-2">
              {commonAmenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-amenity-${amenity}`}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityFilter(amenity)}
                  />
                  <label
                    htmlFor={`mobile-amenity-${amenity}`}
                    className="cursor-pointer text-sm"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t flex gap-2">
          <Button variant="outline" className="flex-1" onClick={clearFilters}>
            Clear
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilter;
