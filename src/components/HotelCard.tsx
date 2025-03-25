
import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Star } from 'lucide-react';
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
}) => {
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
      
      <FavoriteButton 
        itemId={id}
        itemType="hotel"
      />
    </div>
  );
};

export default HotelCard;
