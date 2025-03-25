
import React from "react";
import { X, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface MobileFilterProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  activeFilterCount: number;
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
  isFilterOpen,
  setIsFilterOpen,
  priceRange,
  setPriceRange,
  selectedStars,
  handleStarFilter,
  selectedAmenities,
  handleAmenityFilter,
  clearFilters,
  commonAmenities
}: MobileFilterProps) => {
  if (!isFilterOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
      <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-white flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white">
          <h3 className="font-semibold">Filters</h3>
          <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)} className="h-8 w-8 text-white hover:bg-blue-700">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Price Range (₹)</h4>
            <Slider
              value={priceRange}
              min={1000}
              max={15000}
              step={500}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="my-6"
            />
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="px-3 py-1 border-blue-200 text-blue-600">
                ₹{priceRange[0]}
              </Badge>
              <span className="text-xs text-stone-400">to</span>
              <Badge variant="outline" className="px-3 py-1 border-blue-200 text-blue-600">
                ₹{priceRange[1]}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium text-sm">Star Rating</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div 
                  key={star} 
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded cursor-pointer",
                    selectedStars.includes(star) ? "bg-blue-50" : "hover:bg-stone-50"
                  )}
                  onClick={() => handleStarFilter(star)}
                >
                  <Checkbox
                    id={`mobile-star-${star}`}
                    checked={selectedStars.includes(star)}
                    onCheckedChange={() => handleStarFilter(star)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label
                    htmlFor={`mobile-star-${star}`}
                    className="flex items-center cursor-pointer flex-1"
                  >
                    <div className="flex">
                      {Array.from({ length: star }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">{star} Star</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium text-sm">Amenities</h4>
            <div className="space-y-2">
              {commonAmenities.map((amenity) => (
                <div 
                  key={amenity} 
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded cursor-pointer",
                    selectedAmenities.includes(amenity) ? "bg-blue-50" : "hover:bg-stone-50"
                  )}
                  onClick={() => handleAmenityFilter(amenity)}
                >
                  <Checkbox
                    id={`mobile-amenity-${amenity}`}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityFilter(amenity)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label
                    htmlFor={`mobile-amenity-${amenity}`}
                    className="flex items-center cursor-pointer flex-1"
                  >
                    <span className="text-sm">{amenity}</span>
                  </label>
                  {selectedAmenities.includes(amenity) && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t flex gap-2">
          <Button variant="outline" className="flex-1" onClick={clearFilters}>
            Clear
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setIsFilterOpen(false)}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilter;
