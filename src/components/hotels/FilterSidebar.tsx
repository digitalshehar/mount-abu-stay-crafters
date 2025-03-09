
import React from "react";
import { Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedStars: number[];
  handleStarFilter: (star: number) => void;
  selectedAmenities: string[];
  handleAmenityFilter: (amenity: string) => void;
  clearFilters: () => void;
  commonAmenities: string[];
}

const FilterSidebar = ({
  priceRange,
  setPriceRange,
  selectedStars,
  handleStarFilter,
  selectedAmenities,
  handleAmenityFilter,
  clearFilters,
  commonAmenities
}: FilterSidebarProps) => {
  // Handle checkbox change without causing refreshes
  const handleStarClick = (e: React.MouseEvent, star: number) => {
    e.preventDefault();
    handleStarFilter(star);
  };

  const handleAmenityClick = (e: React.MouseEvent, amenity: string) => {
    e.preventDefault();
    handleAmenityFilter(amenity);
  };

  return (
    <div className="hidden lg:block bg-white p-5 rounded-lg shadow-sm space-y-6 h-fit sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            clearFilters();
          }}
          className="text-blue-600 h-8 px-2 hover:bg-blue-50"
        >
          Clear All
        </Button>
      </div>

      <Separator />

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
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div 
              key={star} 
              className={cn(
                "flex items-center space-x-2 p-2 rounded cursor-pointer",
                selectedStars.includes(star) ? "bg-blue-50" : "hover:bg-stone-50"
              )}
              onClick={(e) => handleStarClick(e, star)}
            >
              <Checkbox
                id={`star-${star}`}
                checked={selectedStars.includes(star)}
                onCheckedChange={() => handleStarFilter(star)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <label
                htmlFor={`star-${star}`}
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
              <span className="text-xs text-stone-400">
                {selectedStars.includes(star) && "(Selected)"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium text-sm">Amenities</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {commonAmenities.map((amenity) => (
            <div 
              key={amenity} 
              className={cn(
                "flex items-center space-x-2 p-2 rounded cursor-pointer",
                selectedAmenities.includes(amenity) ? "bg-blue-50" : "hover:bg-stone-50"
              )}
              onClick={(e) => handleAmenityClick(e, amenity)}
            >
              <Checkbox
                id={`amenity-${amenity}`}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => handleAmenityFilter(amenity)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <label
                htmlFor={`amenity-${amenity}`}
                className="cursor-pointer flex items-center flex-1"
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
      
      <Separator />
      
      <div className="pt-2">
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;

// Need to import cn
import { cn } from "@/lib/utils";
