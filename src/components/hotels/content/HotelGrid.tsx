
import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import HotelCard from "@/components/HotelCard";
import { Hotel } from "@/types";

interface HotelGridProps {
  hotels: Hotel[];
  compareList: number[];
  onAddToCompare: (id: number) => void;
  onRemoveFromCompare: (id: number) => void;
  isInCompare: (id: number) => boolean;
}

const HotelGrid: React.FC<HotelGridProps> = ({
  hotels,
  compareList,
  onAddToCompare,
  onRemoveFromCompare,
  isInCompare
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="relative group">
          <HotelCard
            id={hotel.id as number}
            name={hotel.name}
            slug={hotel.slug}
            location={hotel.location}
            rating={hotel.rating || 0}
            reviewCount={hotel.reviewCount || 0}
            image={hotel.image}
            pricePerNight={hotel.pricePerNight || 0}
            featured={hotel.featured || false}
            amenities={hotel.amenities || []}
          />
          
          {/* Compare button (visible on hover) */}
          <Button
            variant={isInCompare(hotel.id as number) ? "default" : "secondary"}
            size="sm"
            className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${
              isInCompare(hotel.id as number) ? "bg-primary" : "bg-white/80 hover:bg-white"
            }`}
            onClick={() => 
              isInCompare(hotel.id as number)
                ? onRemoveFromCompare(hotel.id as number)
                : onAddToCompare(hotel.id as number)
            }
          >
            <Heart
              className={`h-4 w-4 mr-1 ${
                isInCompare(hotel.id as number) ? "fill-white" : ""
              }`}
            />
            {isInCompare(hotel.id as number) ? "Added" : "Compare"}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default HotelGrid;
