
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import HotelCardAmenities from "./hotel/HotelCardAmenities";
import HotelCardImage from "./hotel/HotelCardImage";
import HotelCardRating from "./hotel/HotelCardRating";

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
  // Generate a slug from the hotel name if not provided
  const hotelSlug = slug || name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group ${
        featured
          ? "md:col-span-2 md:grid md:grid-cols-1 md:grid-rows-1 lg:grid-cols-2 lg:gap-6"
          : "flex flex-col"
      }`}
    >
      <HotelCardImage 
        image={image} 
        name={name} 
        featured={featured} 
        hotelSlug={hotelSlug} 
      />

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

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-base sm:text-lg font-semibold">₹{price}</span>
            <span className="text-xs sm:text-sm text-stone-500">/night</span>
          </div>
          <Link
            to={`/hotel/${hotelSlug}`}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-white text-xs sm:text-sm font-medium rounded-lg transition-colors hover:bg-primary/90"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
