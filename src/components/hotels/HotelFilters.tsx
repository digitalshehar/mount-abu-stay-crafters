
import React from 'react';
import { 
  Slider, 
  Checkbox, 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Separator 
} from '@/components/ui';
import { StarIcon, RefreshCw } from 'lucide-react';

interface HotelFiltersProps {
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  selectedStars: number[];
  setSelectedStars: React.Dispatch<React.SetStateAction<number[]>>;
  selectedAmenities: string[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<string[]>>;
  availableAmenities: string[];
  onReset: () => void;
}

const HotelFilters: React.FC<HotelFiltersProps> = ({
  priceRange,
  setPriceRange,
  selectedStars,
  setSelectedStars,
  selectedAmenities,
  setSelectedAmenities,
  availableAmenities,
  onReset
}) => {
  // Handle star rating toggle
  const handleStarToggle = (star: number) => {
    setSelectedStars(prev => {
      if (prev.includes(star)) {
        return prev.filter(s => s !== star);
      } else {
        return [...prev, star];
      }
    });
  };

  // Handle amenity toggle
  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(a => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Filters</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onReset}
              className="h-8 px-2 text-primary-600 hover:text-primary-800"
            >
              <RefreshCw className="mr-1 h-3.5 w-3.5" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <Slider
              defaultValue={priceRange}
              max={10000}
              step={100}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="mt-6"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm">₹{priceRange[0]}</span>
              <span className="text-sm">₹{priceRange[1]}</span>
            </div>
          </div>
          
          <Separator />
          
          {/* Star Rating */}
          <div>
            <h3 className="font-medium mb-3">Star Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="flex items-center">
                  <Checkbox
                    id={`star-${star}`}
                    checked={selectedStars.includes(star)}
                    onCheckedChange={() => handleStarToggle(star)}
                  />
                  <label 
                    htmlFor={`star-${star}`}
                    className="ml-2 text-sm flex items-center cursor-pointer"
                  >
                    {Array.from({ length: star }).map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-amber-400 fill-current" />
                    ))}
                    {Array.from({ length: 5 - star }).map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-stone-300" />
                    ))}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Amenities */}
          <div>
            <h3 className="font-medium mb-3">Amenities</h3>
            <div className="space-y-2">
              {availableAmenities.map(amenity => (
                <div key={amenity} className="flex items-center">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityToggle(amenity)}
                  />
                  <label 
                    htmlFor={`amenity-${amenity}`}
                    className="ml-2 text-sm cursor-pointer"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelFilters;
