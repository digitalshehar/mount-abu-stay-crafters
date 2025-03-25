
import React from "react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
            <a href="/" className="hover:text-primary">Home</a>
            <ChevronRight className="h-3 w-3 mx-2" />
            <a href="/hotels" className="hover:text-primary">Hotels</a>
            <ChevronRight className="h-3 w-3 mx-2" />
            <a href={`/hotels?location=${encodeURIComponent(location)}`} className="hover:text-primary">{location}</a>
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
              <div className="flex items-center mt-2 text-sm">
                <div className="flex">
                  {Array.from({ length: stars }).map((_, idx) => (
                    <span key={idx} className="text-yellow-500">★</span>
                  ))}
                </div>
                <span className="mx-2">•</span>
                <span>{location}</span>
                {rating && reviewCount && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="text-yellow-500">{rating.toFixed(1)}</span>
                    <span className="ml-1 text-stone-500">({reviewCount} reviews)</span>
                  </>
                )}
                {featured && (
                  <>
                    <span className="mx-2">•</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Featured
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelDetailHeader;
