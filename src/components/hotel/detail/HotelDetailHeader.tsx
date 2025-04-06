
import React from "react";
import { ChevronRight, Star, MapPin, Badge as BadgeIcon, Award, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface HotelDetailHeaderProps {
  name: string;
  location: string;
  stars: number;
  featured: boolean;
  rating?: number;
  reviewCount?: number;
}

const HotelDetailHeader = ({ 
  name, 
  location, 
  stars, 
  featured, 
  rating, 
  reviewCount 
}: HotelDetailHeaderProps) => {
  return (
    <>
      <div className="bg-white border-b border-stone-200">
        <div className="container-custom py-3">
          <div className="flex items-center text-sm text-stone-500">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link to="/hotels" className="hover:text-primary">Hotels</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link to={`/hotels?location=${encodeURIComponent(location)}`} className="hover:text-primary">{location}</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-stone-700 truncate">{name}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white border-b border-stone-200 py-5">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold">{name}</h1>
              <div className="flex flex-wrap items-center mt-2 text-sm gap-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-primary mr-1" />
                  <span className="text-stone-600">{location}</span>
                </div>
                
                <span className="text-stone-300">•</span>
                
                <div className="flex items-center">
                  <Building className="h-4 w-4 text-primary mr-1" />
                  <span className="text-stone-600">{stars}-Star Hotel</span>
                </div>
                
                {rating && reviewCount && (
                  <>
                    <span className="text-stone-300">•</span>
                    <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-xs">
                      <Star className="h-3 w-3 text-amber-500 mr-1" fill="currentColor" />
                      <span>{rating.toFixed(1)}</span>
                      <span className="text-stone-500 ml-1">({reviewCount})</span>
                    </div>
                  </>
                )}
                
                {featured && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Award className="h-3 w-3 mr-1" /> Featured
                  </Badge>
                )}
              </div>
            </div>

            <div className="hidden md:block">
              <Badge 
                variant="outline" 
                className="bg-green-50 text-green-700 border-green-200 px-3 py-1.5"
              >
                <BadgeIcon className="h-3.5 w-3.5 mr-1" />
                Best Price Guaranteed
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelDetailHeader;
