
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import EmptyState from './EmptyState';
import HotelListHeader from './HotelListHeader';
import HotelSortOptions from './HotelSortOptions';
import { Hotel } from '@/types';

interface HotelGridViewProps {
  hotels: Hotel[];
  isLoading?: boolean;
  hasError?: boolean;
  error?: string;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const HotelGridView: React.FC<HotelGridViewProps> = ({
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-stone-100 h-[300px] rounded-lg"></div>
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                  <span className="text-xs font-medium">{hotel.rating?.toFixed(1) || '4.0'}</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold truncate">{hotel.name}</h3>
              <div className="flex items-center text-stone-500 text-sm mt-1">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{hotel.location}</span>
              </div>
              
              <div className="flex items-center mt-2">
                {Array.from({ length: hotel.stars || 3 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              
              <div className="mt-3 space-y-1">
                <div className="text-sm text-stone-600 line-clamp-2">
                  {hotel.description?.substring(0, 100) || 'A comfortable stay in Mount Abu with modern amenities and excellent service.'}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
              <div>
                <span className="text-lg font-semibold text-primary">₹{hotel.pricePerNight || hotel.price}</span>
                <span className="text-xs text-stone-500">/night</span>
              </div>
              
              <Button asChild>
                <Link to={`/hotel/${hotel.slug}`}>
                  View <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotelGridView;
