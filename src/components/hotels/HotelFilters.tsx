
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Filter, RefreshCw } from 'lucide-react';

interface HotelFiltersProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedStars: number[];
  setSelectedStars: (stars: number[]) => void;
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
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
  const handleStarChange = (star: number) => {
    if (selectedStars.includes(star)) {
      setSelectedStars(selectedStars.filter(s => s !== star));
    } else {
      setSelectedStars([...selectedStars, star]);
    }
  };
  
  const handleAmenityChange = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h2>
        <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-sm">
          <RefreshCw className="h-3 w-3 mr-1" />
          Reset
        </Button>
      </div>
      
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            defaultValue={priceRange}
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-6"
          />
          <div className="flex items-center justify-between text-sm mt-2">
            <div>₹{priceRange[0]}</div>
            <div>₹{priceRange[1]}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm">Star Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[5, 4, 3, 2, 1].map(star => (
            <div key={star} className="flex items-center space-x-2">
              <Checkbox
                id={`star-${star}`}
                checked={selectedStars.includes(star)}
                onCheckedChange={() => handleStarChange(star)}
              />
              <label
                htmlFor={`star-${star}`}
                className="flex items-center cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <div className="flex">
                  {Array.from({ length: star }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm">Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {availableAmenities.sort().map(amenity => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => handleAmenityChange(amenity)}
              />
              <label
                htmlFor={`amenity-${amenity}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {amenity}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelFilters;
