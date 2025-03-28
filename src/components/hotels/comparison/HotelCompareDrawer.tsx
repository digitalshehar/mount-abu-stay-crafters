
import React from "react";
import { X, ArrowRight, Home } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Hotel } from "@/components/admin/hotels/types";

interface HotelCompareDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  compareList: number[];
  hotels: Hotel[];
  onRemove: (id: number) => void;
}

export const HotelCompareDrawer: React.FC<HotelCompareDrawerProps> = ({
  open,
  onOpenChange,
  compareList,
  hotels,
  onRemove,
}) => {
  // Get the full hotel objects from IDs
  const hotelsToCompare = compareList
    .map(id => hotels.find(hotel => hotel.id === id))
    .filter(Boolean) as Hotel[];

  // Get all unique amenities from compared hotels
  const allAmenities = new Set<string>();
  hotelsToCompare.forEach(hotel => {
    if (hotel.amenities && Array.isArray(hotel.amenities)) {
      hotel.amenities.forEach((amenity: string) => {
        allAmenities.add(amenity);
      });
    }
  });

  if (compareList.length === 0) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] sm:h-[80vh]">
        <SheetHeader className="flex-row justify-between items-center pb-4">
          <SheetTitle>Compare Hotels ({hotelsToCompare.length})</SheetTitle>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>

        <div className="overflow-auto h-full pb-16">
          {/* Basic info comparison */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {hotelsToCompare.map(hotel => (
              <div key={hotel.id} className="relative bg-white rounded-lg shadow p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => onRemove(hotel.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                
                <div className="aspect-video relative mb-3">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
                
                <h3 className="font-semibold text-base mb-1">{hotel.name}</h3>
                <div className="flex items-center text-sm text-stone-600 mb-2">
                  <Home className="h-3 w-3 mr-1" />
                  <span className="truncate">{hotel.location}</span>
                </div>
                
                <div className="flex items-center mb-3">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <svg 
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-lg font-bold text-primary">₹{hotel.pricePerNight}</span>
                    <span className="text-xs text-stone-500">/night</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">{hotel.rating}</span>
                    <span className="text-xs text-stone-500 ml-1">({hotel.reviewCount})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          {/* Amenities comparison */}
          <h3 className="text-lg font-medium mb-4">Amenities Comparison</h3>
          <div className="overflow-x-auto pb-4">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left py-2 px-3 font-medium text-stone-500 w-[200px]">Amenity</th>
                  {hotelsToCompare.map(hotel => (
                    <th key={hotel.id} className="text-center py-2 px-3 font-medium text-stone-500">
                      {hotel.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from(allAmenities).sort().map(amenity => (
                  <tr key={amenity} className="border-t">
                    <td className="py-2 px-3 capitalize text-stone-700">{amenity}</td>
                    {hotelsToCompare.map(hotel => {
                      const hasAmenity = hotel.amenities?.some(
                        a => a.toLowerCase() === amenity.toLowerCase()
                      );
                      return (
                        <td key={hotel.id} className="text-center py-2 px-3">
                          {hasAmenity ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-stone-100 text-stone-400 rounded-full">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
