
import { MapPin, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import HotelCardAmenities from "./hotel/HotelCardAmenities";
import HotelCardImage from "./hotel/HotelCardImage";
import HotelCardRating from "./hotel/HotelCardRating";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group ${
        featured
          ? "md:col-span-2 md:grid md:grid-cols-1 md:grid-rows-1 lg:grid-cols-2 lg:gap-6"
          : "flex flex-col"
      }`}
    >
      <div className="relative">
        <HotelCardImage 
          image={image} 
          name={name} 
          featured={featured} 
          hotelSlug={hotelSlug} 
        />
        
        <button 
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10",
            isFavorite 
              ? "bg-red-500 text-white" 
              : "bg-white/80 text-stone-500 hover:bg-white hover:text-red-500"
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </button>
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <Link to={`/hotel/${hotelSlug}`} className="hover:opacity-80 transition-opacity">
            <h3 className="text-base sm:text-lg font-display font-semibold line-clamp-2">{name}</h3>
          </Link>
          <HotelCardRating rating={rating} reviewCount={reviewCount} />
        </div>

        <div className="flex items-center text-stone-500 text-xs sm:text-sm mb-3 sm:mb-4">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> {location}
        </div>

        {/* Amenities */}
        <HotelCardAmenities amenities={amenities.slice(0, 4)} />

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-base sm:text-lg font-semibold">₹{price.toLocaleString()}</span>
              <span className="text-xs sm:text-sm text-stone-500">/night</span>
            </div>
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              Best Available Rate
            </div>
          </div>
          
          <Link
            to={`/hotel/${hotelSlug}`}
            className="flex items-center justify-center w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-primary text-white text-xs sm:text-sm font-medium rounded-lg transition-colors hover:bg-primary/90 group-hover:bg-primary/95"
          >
            View Details
            <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
