
import React from "react";
import { Check, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  
  // Desktop filter panel
  const DesktopFilterContent = () => (
    <Card className="shadow-md border-stone-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Filters</CardTitle>
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
      </CardHeader>
      <CardContent className="space-y-6">
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

        <div className="space-y-4 border-t pt-4">
          <h4 className="font-medium text-base">Amenities</h4>
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

  // Mobile filter panel using Sheet component
  const MobileFilterContent = () => {
    // Count selected filters for each category
    const priceChanged = priceRange[0] !== 1000 || priceRange[1] !== 15000;
    const starsCount = selectedStars.length;
    const amenitiesCount = selectedAmenities.length;
    
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          <SheetHeader className="px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              <SheetTitle>Filter Options</SheetTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose} 
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>
          
          <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 10rem)" }}>
            {/* Price Range Filter */}
            <Collapsible className="border-b" defaultOpen={true}>
              <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
                <div className="flex items-center">
                  <span className="font-medium">Price Range</span>
                  {priceChanged && (
                    <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                      Selected
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500">₹{priceRange[0]} - ₹{priceRange[1]}</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
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
              </CollapsibleContent>
            </Collapsible>

            {/* Star Rating Filter */}
            <Collapsible className="border-b" defaultOpen={true}>
              <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
                <div className="flex items-center">
                  <span className="font-medium">Star Rating</span>
                  {starsCount > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                      {starsCount}
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {selectedStars.length > 0 
                    ? `${selectedStars.length} selected` 
                    : 'Any'}
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
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
                        id={`mobile-star-${star}`}
                        checked={selectedStars.includes(star)}
                        onCheckedChange={() => handleStarFilter(star)}
                      />
                      <label
                        htmlFor={`mobile-star-${star}`}
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
              </CollapsibleContent>
            </Collapsible>

            {/* Amenities Filter */}
            <Collapsible className="border-b" defaultOpen={true}>
              <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
                <div className="flex items-center">
                  <span className="font-medium">Amenities</span>
                  {amenitiesCount > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                      {amenitiesCount}
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {selectedAmenities.length > 0 
                    ? `${selectedAmenities.length} selected` 
                    : 'Any'}
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <div className="grid grid-cols-1 gap-2">
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
                        id={`mobile-amenity-${amenity}`}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityFilter(amenity)}
                      />
                      <label
                        htmlFor={`mobile-amenity-${amenity}`}
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
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <SheetFooter className="p-4 border-t">
            <div className="flex gap-3 w-full">
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
                Show Results
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  };

  // Return different content based on device type
  return isMobile ? <MobileFilterContent /> : <DesktopFilterContent />;
};

export default EnhancedFilters;
