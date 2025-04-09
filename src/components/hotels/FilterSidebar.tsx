
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface FilterSidebarProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedStars: number[];
  handleStarFilter: (star: number) => void;
  selectedAmenities: string[];
  handleAmenityFilter: (amenity: string) => void;
  commonAmenities: string[];
  clearFilters: () => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  onClose?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  priceRange,
  setPriceRange,
  selectedStars,
  handleStarFilter,
  selectedAmenities,
  handleAmenityFilter,
  commonAmenities,
  clearFilters,
  sortOption,
  setSortOption,
  onClose
}) => {
  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Sort By Options */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Sort By</h4>
        <RadioGroup value={sortOption} onValueChange={setSortOption}>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="recommended" id="recommended" />
            <Label htmlFor="recommended">Recommended</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="price_low" id="price_low" />
            <Label htmlFor="price_low">Price: Low to High</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="price_high" id="price_high" />
            <Label htmlFor="price_high">Price: High to Low</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="rating" id="rating" />
            <Label htmlFor="rating">Highest Rating</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="name" id="name" />
            <Label htmlFor="name">Name</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator className="my-4" />

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="px-2">
          <Slider
            value={[priceRange[0], priceRange[1]]}
            min={0}
            max={20000}
            step={500}
            onValueChange={handlePriceChange}
            className="mb-2"
          />
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">₹{priceRange[0]}</span>
            <span className="text-sm text-gray-500">₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Star Rating */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Star Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center">
              <Checkbox
                id={`star-${star}`}
                checked={selectedStars.includes(star)}
                onCheckedChange={() => handleStarFilter(star)}
              />
              <label
                htmlFor={`star-${star}`}
                className="ml-2 text-sm font-medium cursor-pointer"
              >
                {star} Stars
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Amenities */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Amenities</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {commonAmenities.map((amenity) => (
            <div key={amenity} className="flex items-center">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => handleAmenityFilter(amenity)}
              />
              <label
                htmlFor={`amenity-${amenity}`}
                className="ml-2 text-sm font-medium cursor-pointer"
              >
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={clearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
