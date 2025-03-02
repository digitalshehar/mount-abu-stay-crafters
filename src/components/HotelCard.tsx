
import { Star, MapPin, Wifi, Coffee, Tv, Bath } from "lucide-react";
import { Link } from "react-router-dom";

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
}: HotelCardProps) => {
  // Function to render amenity icon
  const renderAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "breakfast":
        return <Coffee className="h-4 w-4" />;
      case "tv":
        return <Tv className="h-4 w-4" />;
      case "bathroom":
        return <Bath className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group ${
        featured
          ? "md:col-span-2 md:grid md:grid-cols-2 md:gap-6"
          : "flex flex-col"
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "h-full" : "h-52"}`}>
        {featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="text-xs font-medium bg-primary text-white px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
        <Link to={`/hotel/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <Link to={`/hotel/${id}`} className="hover:opacity-80 transition-opacity">
            <h3 className="text-lg font-display font-semibold">{name}</h3>
          </Link>
          <div className="flex items-center bg-primary/5 rounded-lg px-2 py-1">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-stone-500 ml-1">({reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center text-stone-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" /> {location}
        </div>

        {/* Amenities */}
        <div className="flex items-center space-x-3 mb-5">
          {amenities.slice(0, 4).map((amenity, index) => (
            <div
              key={index}
              className="flex items-center text-stone-600 bg-stone-50 rounded-full px-3 py-1 text-xs"
            >
              {renderAmenityIcon(amenity)}
              <span className="ml-1">{amenity}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">₹{price}</span>
            <span className="text-stone-500 text-sm">/night</span>
          </div>
          <Link
            to={`/hotel/${id}`}
            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg transition-colors hover:bg-primary/90"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
