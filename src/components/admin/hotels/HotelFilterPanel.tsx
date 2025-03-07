
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, X } from "lucide-react";

export interface FilterOptions {
  priceRange: [number, number];
  starRating: number[];
  amenities: string[];
  maxPrice: number;
}

interface HotelFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const AMENITIES_OPTIONS = [
  "Wi-Fi", "Swimming Pool", "Gym", "Restaurant", 
  "Spa", "Room Service", "Parking", "Bar", 
  "Conference Room", "Pet Friendly"
];

const HotelFilterPanel = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters
}: HotelFilterPanelProps) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: [value[0], value[1]] as [number, number]
    });
  };

  // Handle star rating toggle
  const handleStarRatingToggle = (star: number) => {
    if (filters.starRating.includes(star)) {
      setFilters({
        ...filters,
        starRating: filters.starRating.filter(s => s !== star)
      });
    } else {
      setFilters({
        ...filters,
        starRating: [...filters.starRating, star].sort()
      });
    }
  };

  // Handle amenity toggle
  const handleAmenityToggle = (amenity: string) => {
    if (filters.amenities.includes(amenity)) {
      setFilters({
        ...filters,
        amenities: filters.amenities.filter(a => a !== amenity)
      });
    } else {
      setFilters({
        ...filters,
        amenities: [...filters.amenities, amenity]
      });
    }
  };

  // Apply filters
  const applyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  // Reset filters
  const resetFilters = () => {
    const resetFilters: FilterOptions = {
      priceRange: [0, currentFilters.maxPrice] as [number, number],
      starRating: [],
      amenities: [],
      maxPrice: currentFilters.maxPrice
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Filter Hotels</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Price Range Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Price Range</h3>
            <Slider 
              min={0} 
              max={filters.maxPrice}
              step={100}
              value={[filters.priceRange[0], filters.priceRange[1]]} 
              onValueChange={handlePriceChange}
              className="py-4"
            />
            <div className="flex justify-between text-sm">
              <span>₹{filters.priceRange[0].toLocaleString()}</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          <Separator />

          {/* Star Rating Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Star Rating</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Button
                  key={star}
                  variant={filters.starRating.includes(star) ? "default" : "outline"}
                  size="sm"
                  className={filters.starRating.includes(star) ? "bg-amber-500 hover:bg-amber-600" : ""}
                  onClick={() => handleStarRatingToggle(star)}
                >
                  {star} <Star size={14} className="ml-1" />
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Amenities Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {AMENITIES_OPTIONS.map(amenity => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`amenity-${amenity}`} 
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityToggle(amenity)}
                  />
                  <label 
                    htmlFor={`amenity-${amenity}`} 
                    className="text-sm cursor-pointer"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex gap-2 justify-end">
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
          <Button onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelFilterPanel;
