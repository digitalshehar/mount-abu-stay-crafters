
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface HotelFiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  starRating: number[];
  setStarRating: (stars: number[]) => void;
  amenities: string[];
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
  resetFilters: () => void;
}

const HotelFilters: React.FC<HotelFiltersProps> = ({
  priceRange,
  setPriceRange,
  starRating,
  setStarRating,
  amenities,
  selectedAmenities,
  setSelectedAmenities,
  resetFilters,
}) => {
  const handleStarRatingChange = (star: number) => {
    setStarRating(
      starRating.includes(star)
        ? starRating.filter((s) => s !== star)
        : [...starRating, star]
    );
  };

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(
      selectedAmenities.includes(amenity)
        ? selectedAmenities.filter((a) => a !== amenity)
        : [...selectedAmenities, amenity]
    );
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-sm">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="w-full"
        >
          Reset Filters
        </Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Price Range</h4>
        <Slider
          defaultValue={[priceRange[0], priceRange[1]]}
          max={10000}
          step={500}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          className="my-6"
        />
        <div className="flex items-center justify-between">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Star Rating</h4>
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center space-x-2">
            <Checkbox
              id={`star-${star}`}
              checked={starRating.includes(star)}
              onCheckedChange={() => handleStarRatingChange(star)}
            />
            <Label htmlFor={`star-${star}`} className="cursor-pointer">
              {star} Stars
            </Label>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Amenities</h4>
        {amenities.map((amenity) => (
          <div key={amenity} className="flex items-center space-x-2">
            <Checkbox
              id={`amenity-${amenity}`}
              checked={selectedAmenities.includes(amenity)}
              onCheckedChange={() => handleAmenityChange(amenity)}
            />
            <Label htmlFor={`amenity-${amenity}`} className="cursor-pointer">
              {amenity}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelFilters;
