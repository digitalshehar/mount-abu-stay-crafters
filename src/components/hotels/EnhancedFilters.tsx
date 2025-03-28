
import React from "react";
import { Check, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";

interface FilterProps {
  isOpen: boolean;
  onClose: () => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedStars: number[];
  handleStarFilter: (star: number) => void;
  selectedAmenities: string[];
  handleAmenityFilter: (amenity: string) => void;
  clearFilters: () => void;
  commonAmenities: string[];
  applyFilters: () => void;
}

const EnhancedFilters = ({
  isOpen,
  onClose,
  priceRange,
  setPriceRange,
  selectedStars,
  handleStarFilter,
  selectedAmenities,
  handleAmenityFilter,
  clearFilters,
  commonAmenities,
  applyFilters
}: FilterProps) => {
  const isMobile = useIsMobile();
  
  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium text-base">Price Range (₹)</h4>
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

      <div className="space-y-4 border-t pt-4">
        <h4 className="font-medium text-base">Star Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div 
              key={star} 
              className={cn(
                "flex items-center space-x-2 p-2 rounded cursor-pointer",
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

      <div className="space-y-4 border-t pt-4">
        <h4 className="font-medium text-base">Amenities</h4>
        <div className="space-y-2">
          {commonAmenities.map((amenity) => (
            <div 
              key={amenity} 
              className={cn(
                "flex items-center space-x-2 p-2 rounded cursor-pointer",
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
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Filter Hotels</SheetTitle>
            </SheetHeader>
            <div className="px-4 py-6 overflow-auto max-h-[calc(100vh-10rem)]">
              <FilterContent />
            </div>
            <SheetFooter className="p-4 border-t flex gap-2">
              <Button 
                variant="outline" 
                onClick={clearFilters} 
                className="flex-1"
              >
                Clear All
              </Button>
              <Button 
                onClick={() => {
                  applyFilters();
                  onClose();
                }} 
                className="flex-1"
              >
                Apply Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Filters</h3>
            {(selectedStars.length > 0 || selectedAmenities.length > 0 || 
              priceRange[0] !== 1000 || priceRange[1] !== 15000) && (
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
          <FilterContent />
        </div>
      )}
    </>
  );
};

export default EnhancedFilters;
