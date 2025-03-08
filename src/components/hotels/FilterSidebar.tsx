
import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

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
  return (
    <div className="hidden lg:block bg-white p-6 rounded-xl shadow-sm space-y-6 h-fit">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-stone-500 h-8 px-2"
        >
          Clear All
        </Button>
      </div>

      <Separator />

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
                id={`star-${star}`}
                checked={selectedStars.includes(star)}
                onCheckedChange={() => handleStarFilter(star)}
              />
              <label
                htmlFor={`star-${star}`}
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
                id={`amenity-${amenity}`}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => handleAmenityFilter(amenity)}
              />
              <label
                htmlFor={`amenity-${amenity}`}
                className="cursor-pointer"
              >
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
