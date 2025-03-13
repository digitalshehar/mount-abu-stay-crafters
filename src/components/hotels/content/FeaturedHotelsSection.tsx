
import React from "react";
import { Hotel } from "@/components/admin/hotels/types";

interface FeaturedHotelsSectionProps {
  hotels: Hotel[];
  compareList?: number[];
  onAddToCompare?: (hotelId: number) => void;
  onRemoveFromCompare?: (hotelId: number) => void;
  isInCompare?: (hotelId: number) => boolean;
}

const FeaturedHotelsSection = ({ 
  hotels,
  compareList = [],
  onAddToCompare = () => {},
  onRemoveFromCompare = () => {},
  isInCompare = () => false
}: FeaturedHotelsSectionProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Featured Hotels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotels.map((hotel) => (
          <div 
            key={hotel.id} 
            className="bg-white rounded-lg shadow-sm border border-stone-100 overflow-hidden flex flex-col md:flex-row"
          >
            <img 
              src={hotel.image} 
              alt={hotel.name} 
              className="w-full md:w-40 h-40 object-cover"
            />
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <p className="text-sm text-stone-500">{hotel.location}</p>
                </div>
                {hotel.rating > 0 && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {hotel.rating.toFixed(1)}★
                  </span>
                )}
              </div>
              <p className="text-sm mt-2 line-clamp-2">{hotel.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-semibold">₹{hotel.pricePerNight}/night</span>
                <button className="text-blue-600 text-sm">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedHotelsSection;
