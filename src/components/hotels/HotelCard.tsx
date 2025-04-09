
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { StarIcon, MapPin } from 'lucide-react';
import { Hotel } from '@/components/admin/hotels/types';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const {
    id,
    name,
    slug,
    location,
    rating,
    reviewCount,
    image,
    pricePerNight,
    amenities = [],
    featured = false
  } = hotel;

  // Create a valid slug for the hotel
  const validSlug = slug || name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden border border-stone-200 hover:shadow-md transition-shadow">
      <div className="w-full md:w-1/3 relative">
        <img 
          src={image} 
          alt={name}
          className="h-48 md:h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        {featured && (
          <Badge className="absolute top-2 left-2 bg-primary">
            Featured
          </Badge>
        )}
      </div>
      
      <div className="w-full md:w-2/3 p-4 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1 line-clamp-1">{name}</h3>
          
          <div className="flex items-center text-sm text-stone-500 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <StarIcon className="h-4 w-4 text-amber-400 fill-current" />
              <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
            </div>
            <span className="mx-1 text-stone-300">•</span>
            <span className="text-sm text-stone-500">{reviewCount} reviews</span>
          </div>
          
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {amenities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{amenities.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
          <div>
            <span className="text-lg font-bold text-primary">₹{pricePerNight}</span>
            <span className="text-sm text-stone-500">/night</span>
          </div>
          
          <Link 
            to={`/hotel/${validSlug}`}
            className="text-sm text-primary hover:underline font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
