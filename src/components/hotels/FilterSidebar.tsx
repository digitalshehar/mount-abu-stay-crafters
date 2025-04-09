
import React from "react";
import { Check, Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  priceRange,
  setPriceRange,
  selectedStars,
  handleStarFilter,
  selectedAmenities,
  handleAmenityFilter,
  clearFilters,
  commonAmenities
}) => {
  return (
    <Card className="sticky top-28 shadow-md border-stone-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-stone-800">Filters</CardTitle>
          {(selectedStars.length > 0 || selectedAmenities.length > 0 || priceRange[0] !== 1000 || priceRange[1] !== 15000) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-xs text-stone-500 hover:text-primary"
            >
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
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
            <Badge variant="outline" className="px-3 py-1">
              ₹{priceRange[0]}
            </Badge>
            <span className="text-xs text-stone-400">to</span>
            <Badge variant="outline" className="px-3 py-1">
              ₹{priceRange[1]}
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-sm">Star Rating</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div 
                key={star} 
                className={cn(
                  "flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors",
                  selectedStars.includes(star) ? "bg-stone-100" : "hover:bg-stone-50"
                )}
                onClick={() => handleStarFilter(star)}
              >
                <Checkbox
                  id={`star-${star}`}
                  checked={selectedStars.includes(star)}
                  onCheckedChange={() => handleStarFilter(star)}
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
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-sm">Amenities</h4>
          <div className="space-y-2">
            {commonAmenities.map((amenity) => (
              <div 
                key={amenity} 
                className={cn(
                  "flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors",
                  selectedAmenities.includes(amenity) ? "bg-stone-100" : "hover:bg-stone-50"
                )}
                onClick={() => handleAmenityFilter(amenity)}
              >
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={() => handleAmenityFilter(amenity)}
                />
                <label
                  htmlFor={`amenity-${amenity}`}
                  className="flex items-center cursor-pointer flex-1"
                >
                  <span className="text-sm capitalize">{amenity}</span>
                </label>
                {selectedAmenities.includes(amenity) && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
