
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";

interface HotelCardImageProps {
  image: string;
  name: string;
  featured: boolean;
  hotelSlug: string;
}

const HotelCardImage = ({ image, name, featured, hotelSlug }: HotelCardImageProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`relative overflow-hidden rounded-t-lg ${featured ? "h-full" : "h-40 sm:h-48 md:h-52"}`}>
      {featured && (
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
          <span className="text-xs font-medium bg-primary text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-md">
            Featured
          </span>
        </div>
      )}
      <Link to={`/hotel/${hotelSlug}`} className="block h-full group">
        {!imageError ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 bg-stone-100"
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-100">
            <div className="text-center p-4">
              <ImageOff className="w-10 h-10 mx-auto mb-2 text-stone-400" />
              <span className="text-sm text-stone-500">Image not available</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
    </div>
  );
};

export default HotelCardImage;
