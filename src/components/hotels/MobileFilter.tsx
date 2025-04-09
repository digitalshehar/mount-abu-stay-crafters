
import React from "react";
import { X, Star, Check, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MobileFilterProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
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
  priceRange,
  setPriceRange,
  selectedStars,
  handleStarFilter,
  selectedAmenities,
  handleAmenityFilter,
  clearFilters,
  commonAmenities
}: MobileFilterProps) => {
  // Count selected filters for each category
  const priceChanged = priceRange[0] !== 1000 || priceRange[1] !== 15000;
  const starsCount = selectedStars.length;
  const amenitiesCount = selectedAmenities.length;
  
  return (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <SheetHeader className="px-4 py-3 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Options
            </SheetTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsFilterOpen(false)} 
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 10rem)" }}>
          {/* Price Range Filter */}
          <Collapsible className="border-b">
            <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
              <div className="flex items-center">
                <span className="font-medium">Price Range</span>
                {priceChanged && (
                  <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                    Selected
                  </Badge>
                )}
              </div>
              <ChevronRight className="h-5 w-5 transform transition-transform ui-open:rotate-90" />
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
          <Collapsible className="border-b">
            <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
              <div className="flex items-center">
                <span className="font-medium">Star Rating</span>
                {starsCount > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                    {starsCount}
                  </Badge>
                )}
              </div>
              <ChevronRight className="h-5 w-5 transform transition-transform ui-open:rotate-90" />
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
          <Collapsible className="border-b">
            <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
              <div className="flex items-center">
                <span className="font-medium">Amenities</span>
                {amenitiesCount > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                    {amenitiesCount}
                  </Badge>
                )}
              </div>
              <ChevronRight className="h-5 w-5 transform transition-transform ui-open:rotate-90" />
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
              onClick={() => setIsFilterOpen(false)} 
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

export default MobileFilter;
