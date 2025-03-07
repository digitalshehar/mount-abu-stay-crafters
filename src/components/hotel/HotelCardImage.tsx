
import React from "react";
import { Link } from "react-router-dom";

interface HotelCardImageProps {
  image: string;
  name: string;
  featured: boolean;
  hotelSlug: string;
}

const HotelCardImage = ({ image, name, featured, hotelSlug }: HotelCardImageProps) => {
  return (
    <div className={`relative overflow-hidden ${featured ? "h-full" : "h-40 sm:h-48 md:h-52"}`}>
      {featured && (
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
          <span className="text-xs font-medium bg-primary text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full">
            Featured
          </span>
        </div>
      )}
      <Link to={`/hotel/${hotelSlug}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
    </div>
  );
};

export default HotelCardImage;
