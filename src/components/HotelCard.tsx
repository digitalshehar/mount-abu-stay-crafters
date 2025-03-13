import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { FavoriteButton } from '@/components/FavoriteButton';

export interface HotelCardProps {
  id: number;
  name: string;
  slug: string;
  location: string;
  rating: number;
  reviewCount: number;
  image: string;
  pricePerNight: number;
  featured?: boolean;
  amenities?: string[];
  compareList?: number[];
  onAddToCompare?: (hotelId: number) => void;
  onRemoveFromCompare?: (hotelId: number) => void;
  isInCompare?: (hotelId: number) => boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({
  id,
  name,
  slug,
  location,
  rating,
  reviewCount,
  image,
  pricePerNight,
  featured = false,
  amenities = [],
  compareList = [],
  onAddToCompare,
  onRemoveFromCompare,
  isInCompare,
}) => {
  const isCompareEnabled = typeof onAddToCompare === 'function' && 
                           typeof onRemoveFromCompare === 'function' &&
                           typeof isInCompare === 'function';
  
  const inCompareList = isCompareEnabled ? isInCompare(id) : false;

  return (
    <div className="relative rounded-lg shadow-md overflow-hidden bg-white">
      <Link to={`/hotel/${slug}`}>
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover"
          />
          {featured && (
            <Badge className="absolute top-2 left-2 z-10">Featured</Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-stone-800 line-clamp-1">{name}</h3>
          <div className="flex items-center text-sm text-stone-500">
            <BadgeCheck className="h-4 w-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center mt-2">
            <Star className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="font-medium text-stone-700">{rating}</span>
            <span className="text-stone-500 ml-1">({reviewCount} reviews)</span>
          </div>
          <div className="mt-2">
            <span className="text-xl font-bold text-primary">₹{pricePerNight}</span>
            <span className="text-stone-500">/night</span>
          </div>
        </div>
      </Link>
      
      {isCompareEnabled && (
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              inCompareList ? onRemoveFromCompare(id) : onAddToCompare(id);
            }}
            className={cn(
              "p-2 rounded-full transition-colors",
              inCompareList ? "bg-red-500 text-white hover:bg-red-700" : "bg-stone-100 text-stone-500 hover:bg-stone-200"
            )}
          >
            {inCompareList ? 'Remove' : 'Compare'}
          </button>
        </div>
      )}

      <FavoriteButton 
        itemId={id}
        itemType="hotel"
      />
    </div>
  );
};

export default HotelCard;
