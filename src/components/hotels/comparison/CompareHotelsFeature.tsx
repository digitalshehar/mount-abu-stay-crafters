
import React, { useState, useEffect } from 'react';
import { X, Plus, Star, Check, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Hotel } from '@/components/admin/hotels/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CompareHotelsFeatureProps {
  hotels: Hotel[];
  compareList: number[];
  onAddToCompare: (hotelId: number) => void;
  onRemoveFromCompare: (hotelId: number) => void;
  onClearCompare: () => void;
}

const CompareHotelsFeature: React.FC<CompareHotelsFeatureProps> = ({
  hotels,
  compareList,
  onAddToCompare,
  onRemoveFromCompare,
  onClearCompare
}) => {
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [hotelsToCompare, setHotelsToCompare] = useState<Hotel[]>([]);

  // Update hotels to compare when compareList changes
  useEffect(() => {
    const selectedHotels = hotels.filter(hotel => compareList.includes(hotel.id));
    setHotelsToCompare(selectedHotels);
  }, [compareList, hotels]);

  // List of common amenities to compare
  const commonAmenities = [
    "WiFi", "Swimming Pool", "Restaurant", "Spa", "Gym", 
    "Breakfast", "Parking", "Air Conditioning", "Room Service"
  ];

  // Check if a hotel has a specific amenity
  const hasAmenity = (hotel: Hotel, amenity: string) => {
    return hotel.amenities?.includes(amenity) || false;
  };

  // Format price with INR symbol
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  // Render the comparison button that appears in the UI
  const renderCompareButton = () => {
    if (compareList.length === 0) return null;

    return (
      <div className="fixed bottom-4 right-4 z-20">
        <Button
          onClick={() => setIsCompareOpen(true)}
          className="rounded-full shadow-lg"
        >
          Compare {compareList.length} Hotels
        </Button>
      </div>
    );
  };

  // Render a selected hotel in the comparison table
  const renderComparisonHotel = (hotel: Hotel) => (
    <div key={hotel.id} className="min-w-[250px] max-w-[300px] flex-1 border-r border-gray-200 last:border-r-0">
      <div className="relative h-40 bg-gray-100">
        <img
          src={hotel.image || '/placeholder.svg'}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => onRemoveFromCompare(hotel.id)}
          className="absolute top-2 right-2 p-1 bg-white rounded-full text-gray-600 hover:text-red-500"
          aria-label={`Remove ${hotel.name} from comparison`}
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{hotel.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{hotel.location}</p>
        
        <div className="flex items-center mb-2">
          {[...Array(hotel.stars)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        
        <p className="font-bold text-green-700">{formatPrice(hotel.pricePerNight)}</p>
      </div>
    </div>
  );

  // Render an empty slot in the comparison table
  const renderEmptySlot = () => (
    <div className="min-w-[250px] max-w-[300px] flex-1 border-r border-gray-200 last:border-r-0 bg-gray-50">
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        <div className="text-center p-4">
          <Plus className="mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500">Add a hotel to compare</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-center text-gray-400">Select a hotel to compare</p>
      </div>
    </div>
  );

  return (
    <>
      {renderCompareButton()}
      
      <Dialog open={isCompareOpen} onOpenChange={setIsCompareOpen}>
        <DialogContent className="max-w-[90vw] w-auto max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Hotel Comparison</DialogTitle>
            <DialogDescription>
              Compare features and amenities across different hotels
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {/* Header row with hotel cards */}
              <div className="flex border-b border-gray-200">
                <div className="min-w-[200px] p-4 bg-gray-50 font-medium">
                  Hotel Details
                  {compareList.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearCompare}
                      className="text-xs text-red-500 mt-2"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                
                {hotelsToCompare.map(hotel => renderComparisonHotel(hotel))}
                
                {/* Empty slots */}
                {[...Array(Math.max(0, 3 - hotelsToCompare.length))].map((_, i) => (
                  <React.Fragment key={`empty-${i}`}>
                    {renderEmptySlot()}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Basic Information */}
              <div className="flex border-b border-gray-200">
                <div className="min-w-[200px] p-4 bg-gray-50 font-medium">
                  Star Rating
                </div>
                
                {hotelsToCompare.map(hotel => (
                  <div key={`stars-${hotel.id}`} className="min-w-[250px] max-w-[300px] flex-1 p-4 border-r border-gray-200 last:border-r-0">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < hotel.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
                
                {[...Array(Math.max(0, 3 - hotelsToCompare.length))].map((_, i) => (
                  <div key={`empty-stars-${i}`} className="min-w-[250px] max-w-[300px] flex-1 p-4 border-r border-gray-200 last:border-r-0">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-gray-300" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Price */}
              <div className="flex border-b border-gray-200">
                <div className="min-w-[200px] p-4 bg-gray-50 font-medium">
                  Price per Night
                </div>
                
                {hotelsToCompare.map(hotel => (
                  <div key={`price-${hotel.id}`} className="min-w-[250px] max-w-[300px] flex-1 p-4 border-r border-gray-200 last:border-r-0">
                    <p className="font-bold text-green-700">{formatPrice(hotel.pricePerNight)}</p>
                  </div>
                ))}
                
                {[...Array(Math.max(0, 3 - hotelsToCompare.length))].map((_, i) => (
                  <div key={`empty-price-${i}`} className="min-w-[250px] max-w-[300px] flex-1 p-4 border-r border-gray-200 last:border-r-0">
                    <p className="text-gray-300">—</p>
                  </div>
                ))}
              </div>
              
              {/* Location */}
              <div className="flex border-b border-gray-200">
                <div className="min-w-[200px] p-4 bg-gray-50 font-medium">
                  Location
                </div>
                
                {hotelsToCompare.map(hotel => (
                  <div key={`location-${hotel.id}`} className="min-w-[250px] max-w-[300px] flex-1 p-4 border-r border-gray-200 last:border-r-0">
                    <p>{hotel.location}</p>
                  </div>
                ))}
                
                {[...Array(Math.max(0, 3 - hotelsToCompare.length))].map((_, i) => (
                  <div key={`empty-location-${i}`} className="min-w-[250px] max-w-[300px] flex-1 p-4 border-r border-gray-200 last:border-r-0">
                    <p className="text-gray-300">—</p>
                  </div>
                ))}
              </div>
              
              {/* Amenities Header */}
              <div className="flex border-b border-gray-200">
                <div className="min-w-[200px] p-4 bg-gray-50 font-medium">
                  Amenities
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="inline ml-1 w-4 h-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Common amenities offered by hotels</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                {[...Array(3)].map((_, i) => (
                  <div key={`amenities-header-${i}`} className="min-w-[250px] max-w-[300px] flex-1 p-4 border-r border-gray-200 last:border-r-0">
                    {i < hotelsToCompare.length ? (
                      <p className="font-medium">{hotelsToCompare[i].name} Amenities</p>
                    ) : (
                      <p className="text-gray-300">—</p>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Amenities Rows */}
              {commonAmenities.map(amenity => (
                <div key={amenity} className="flex border-b border-gray-200">
                  <div className="min-w-[200px] p-4 bg-gray-50">
                    {amenity}
                  </div>
                  
                  {hotelsToCompare.map(hotel => (
                    <div key={`${hotel.id}-${amenity}`} className="min-w-[250px] max-w-[300px] flex-1 p-4 border-r border-gray-200 last:border-r-0">
                      {hasAmenity(hotel, amenity) ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  ))}
                  
                  {[...Array(Math.max(0, 3 - hotelsToCompare.length))].map((_, i) => (
                    <div key={`empty-${amenity}-${i}`} className="min-w-[250px] max-w-[300px] flex-1 p-4 border-r border-gray-200 last:border-r-0">
                      <span className="text-gray-300">—</span>
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Footer with Book Now buttons */}
              <div className="flex border-b border-gray-200">
                <div className="min-w-[200px] p-4 bg-gray-50">
                  Actions
                </div>
                
                {hotelsToCompare.map(hotel => (
                  <div key={`action-${hotel.id}`} className="min-w-[250px] max-w-[300px] flex-1 p-4 border-r border-gray-200 last:border-r-0">
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        setIsCompareOpen(false);
                        window.location.href = `/hotels/${hotel.slug}`;
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
                
                {[...Array(Math.max(0, 3 - hotelsToCompare.length))].map((_, i) => (
                  <div key={`empty-action-${i}`} className="min-w-[250px] max-w-[300px] flex-1 p-4 border-r border-gray-200 last:border-r-0">
                    <Button disabled className="w-full">View Details</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CompareHotelsFeature;
