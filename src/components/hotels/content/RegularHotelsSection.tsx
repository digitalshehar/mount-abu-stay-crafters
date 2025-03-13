
import React from "react";
import { Hotel } from "@/components/admin/hotels/types";

interface RegularHotelsSectionProps {
  hotels: Hotel[];
  compareList?: number[];
  onAddToCompare?: (hotelId: number) => void;
  onRemoveFromCompare?: (hotelId: number) => void;
  isInCompare?: (hotelId: number) => boolean;
}

const RegularHotelsSection = ({ 
  hotels,
  compareList = [],
  onAddToCompare = () => {},
  onRemoveFromCompare = () => {},
  isInCompare = () => false
}: RegularHotelsSectionProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hotels in Mount Abu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-sm border border-stone-100 overflow-hidden">
            <img 
              src={hotel.image} 
              alt={hotel.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{hotel.name}</h3>
              <p className="text-sm text-stone-500">{hotel.location}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-semibold">₹{hotel.pricePerNight}/night</span>
                {hotel.rating > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {hotel.rating.toFixed(1)}★
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegularHotelsSection;
