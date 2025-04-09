
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import HotelListHeader from './HotelListHeader';
import HotelSortOptions from './HotelSortOptions';
import EmptyState from './EmptyState';
import { Hotel } from '@/types';

interface HotelListViewProps {
  hotels: Hotel[];
  isLoading?: boolean;
  hasError?: boolean;
  error?: string;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const HotelListView: React.FC<HotelListViewProps> = ({
  hotels = [],
  isLoading = false,
  hasError = false,
  error = '',
  sortBy = 'recommended',
  onSortChange = () => {}
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <HotelListHeader count={0} isLoading={true} />
        
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-stone-100 h-[200px] rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (hasError) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-lg">
        <h3 className="text-red-600 font-semibold">Error loading hotels</h3>
        <p className="text-red-500">{error || 'Please try again later'}</p>
      </div>
    );
  }
  
  if (hotels.length === 0) {
    return <EmptyState />;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <HotelListHeader count={hotels.length} />
        <HotelSortOptions sortBy={sortBy} onSortChange={onSortChange} />
      </div>
      
      <div className="space-y-6">
        {hotels.map((hotel) => (
          <div 
            key={hotel.id} 
            className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/3 lg:w-1/4 relative">
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  className="h-48 sm:h-full w-full object-cover"
                />
                {hotel.featured && (
                  <div className="absolute top-2 left-2 bg-primary/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-auto">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{hotel.name}</h3>
                      <div className="flex items-center text-stone-500 text-sm mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{hotel.location}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center bg-stone-50 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                        <span className="font-medium">{hotel.rating?.toFixed(1) || '4.0'}</span>
                      </div>
                      <div className="text-xs text-stone-500 mt-1">
                        {hotel.reviewCount || 0} reviews
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    {Array.from({ length: hotel.stars || 3 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-stone-600 my-3 line-clamp-2 text-sm">
                    {hotel.description || 'A comfortable stay in Mount Abu with modern amenities and excellent service.'}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mt-3">
                    {(hotel.amenities || []).slice(0, 6).map((amenity, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-stone-600">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                  <div>
                    <span className="text-lg font-semibold text-primary">₹{hotel.pricePerNight || hotel.price}</span>
                    <span className="text-xs text-stone-500">/night</span>
                    <p className="text-xs text-stone-500">Includes taxes & fees</p>
                  </div>
                  
                  <Button asChild>
                    <Link to={`/hotel/${hotel.slug}`}>
                      View Details <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelListView;
