
import { MapPin, ArrowRight, Heart, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface HotelCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  location: string;
  rating: number;
  reviewCount: number;
  amenities: string[];
  featured?: boolean;
  slug?: string;
}

const HotelCard = ({
  id,
  name,
  image,
  price,
  location,
  rating,
  reviewCount,
  amenities,
  featured = false,
  slug,
}: HotelCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const hotelSlug = slug || name.toLowerCase().replace(/\s+/g, '-');
  
  // Calculate discount for display purposes (just for UI)
  const originalPrice = Math.round(price * 1.2);
  const discountPercent = Math.round((1 - price / originalPrice) * 100);

  // Prevent click propagation on favorite button
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="relative">
        {/* Hotel image */}
        <Link to={`/hotel/${hotelSlug}`} className="block relative pb-[56.25%] overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </Link>
        
        {/* Favorite button */}
        <button 
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10",
            isFavorite 
              ? "bg-red-500 text-white" 
              : "bg-white/80 text-stone-500 hover:bg-white hover:text-red-500"
          )}
          onClick={handleFavoriteClick}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </button>
        
        {/* Featured badge */}
        {featured && (
          <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
            Featured
          </Badge>
        )}
        
        {/* Discount badge */}
        <Badge className="absolute left-0 bottom-4 bg-red-500 text-white rounded-r-lg rounded-l-none font-semibold px-2">
          {discountPercent}% OFF
        </Badge>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {/* Hotel name and rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link to={`/hotel/${hotelSlug}`} className="hover:text-blue-600 transition-colors">
            <h3 className="text-base font-medium line-clamp-2">{name}</h3>
          </Link>
          
          <div className="flex items-center bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold whitespace-nowrap">
            <span>{rating.toFixed(1)}</span>
            <Star className="h-3 w-3 ml-1 fill-current" />
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-stone-500 text-xs mb-2">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" /> 
          <span className="truncate">{location}</span>
        </div>

        {/* Amenities */}
        <div className="mt-2 mb-auto">
          <div className="grid grid-cols-2 gap-1">
            {amenities.slice(0, 4).map((amenity, index) => (
              <div key={index} className="flex items-center text-xs text-stone-500">
                <Check className="h-3 w-3 mr-1 text-green-500" />
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="text-xs text-stone-500 mt-2 mb-3">
          {reviewCount} reviews
        </div>
        
        {/* Price and CTA */}
        <div className="mt-auto">
          <div className="flex items-baseline mb-2">
            <span className="text-xs text-stone-500 line-through mr-1">₹{originalPrice.toLocaleString()}</span>
            <span className="text-lg font-semibold text-blue-600">₹{price.toLocaleString()}</span>
            <span className="text-xs text-stone-500 ml-1">/night</span>
          </div>
          
          <Link
            to={`/hotel/${hotelSlug}`}
            className="flex items-center justify-center w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors"
          >
            View Deal
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
