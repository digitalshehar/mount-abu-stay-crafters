
import React from "react";
import { SlidersHorizontal, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

interface MobileFilterProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
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
  activeFilterCount,
  priceRange,
  setPriceRange,
  selectedStars,
  handleStarFilter,
  selectedAmenities,
  handleAmenityFilter,
  clearFilters,
  commonAmenities
}: MobileFilterProps) => {
  return (
    <div className="lg:hidden mb-4">
      <Button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        variant="outline"
        className="w-full gap-2"
      >
        <SlidersHorizontal size={16} />
        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
      </Button>

      {isFilterOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Filters</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFilterOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>

          <Separator className="mb-6" />

          <div className="mb-6">
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

          <Separator className="mb-6" />

          <div className="mb-6">
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

          <Separator className="mb-6" />

          <div className="mb-6">
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
                    className="cursor-pointer"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button
              variant="outline"
              className="w-1/2"
              onClick={clearFilters}
            >
              Clear All
            </Button>
            <Button
              className="w-1/2"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFilter;
