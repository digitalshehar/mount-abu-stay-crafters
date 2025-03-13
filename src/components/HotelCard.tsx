
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import FavoriteButton from './FavoriteButton';
import { MapPin, Star, Plus, Check } from 'lucide-react';

export interface HotelCardProps {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  amenities: string[];
  featured?: boolean;
  slug: string;
  // Compare props
  compareList?: number[];
  onAddToCompare?: () => void;
  onRemoveFromCompare?: () => void;
  isInCompare?: () => boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({
  id,
  name,
  location,
  image,
  rating,
  reviewCount,
  pricePerNight,
  amenities,
  featured = false,
  slug,
  compareList,
  onAddToCompare,
  onRemoveFromCompare,
  isInCompare
}) => {
  // Check if the hotel is in compare list
  const inCompare = isInCompare ? isInCompare() : false;

  // Top 3 amenities to display
  const topAmenities = amenities.slice(0, 3);
  
  return (
    <div className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
      {/* Featured badge */}
      {featured && (
        <Badge className="absolute top-2 left-2 z-10 bg-green-600 hover:bg-green-700">
          Featured
        </Badge>
      )}
      
      {/* Image */}
      <Link to={`/hotels/${slug}`} className="block relative">
        <div className="aspect-video">
          <img 
            src={image || '/placeholder.svg'} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </div>
        
        {/* Rating badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 rounded-full px-2 py-1 text-xs font-medium flex items-center">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-stone-500 ml-1">({reviewCount})</span>
        </div>
        
        {/* Favorite button */}
        <div className="absolute top-3 right-3">
          <FavoriteButton itemId={id} itemType="hotel" />
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-4">
        <Link to={`/hotels/${slug}`} className="block mb-2">
          <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors">{name}</h3>
        </Link>
        
        <div className="flex items-center text-stone-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1 text-stone-400" />
          <span>{location}</span>
        </div>
        
        {/* Amenities */}
        {topAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {topAmenities.map((amenity, index) => (
              <Badge key={index} variant="outline" className="text-xs font-normal">
                {amenity}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Price and compare */}
        <div className="flex justify-between items-end mt-4">
          <div>
            <div className="text-lg font-bold text-green-700">
              ₹{pricePerNight.toLocaleString()}
            </div>
            <div className="text-xs text-stone-500">per night</div>
          </div>
          
          {/* Compare button */}
          {onAddToCompare && onRemoveFromCompare && (
            <Button 
              variant={inCompare ? "secondary" : "outline"} 
              size="sm"
              onClick={inCompare ? onRemoveFromCompare : onAddToCompare}
              className="text-xs"
            >
              {inCompare ? (
                <>
                  <Check className="h-3 w-3 mr-1" /> Comparing
                </>
              ) : (
                <>
                  <Plus className="h-3 w-3 mr-1" /> Compare
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
