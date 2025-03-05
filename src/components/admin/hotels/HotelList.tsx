
import React from "react";
import { Edit, Eye, Trash, Star, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HotelListProps {
  hotels: any[];
  filteredHotels: any[];
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  isLoading?: boolean;
}

const HotelList = ({ hotels, filteredHotels, onDelete, onToggleStatus, isLoading = false }: HotelListProps) => {
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-6 bg-stone-200 rounded w-48 mb-4"></div>
          <div className="h-4 bg-stone-200 rounded w-64"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-stone-500 border-b">
            <th className="px-6 py-3 font-medium">Image</th>
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">Location</th>
            <th className="px-6 py-3 font-medium">Price</th>
            <th className="px-6 py-3 font-medium">Rating</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHotels.map((hotel) => (
            <tr key={hotel.id} className="border-b border-stone-100 hover:bg-stone-50">
              <td className="px-6 py-4">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-16 h-12 object-cover rounded"
                />
              </td>
              <td className="px-6 py-4 font-medium">
                {hotel.name}
                {hotel.featured && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                    Featured
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-stone-600">{hotel.location}</td>
              <td className="px-6 py-4">₹{hotel.pricePerNight.toLocaleString()}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="ml-1">{hotel.stars}</span>
                  {hotel.rating > 0 && (
                    <span className="ml-2 text-sm text-stone-500">
                      ({hotel.rating} from {hotel.reviewCount} reviews)
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  hotel.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-800'
                }`}>
                  {hotel.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title={hotel.status === 'active' ? 'Deactivate' : 'Activate'}
                    onClick={() => onToggleStatus(hotel.id)}
                  >
                    {hotel.status === 'active' ? 
                      <X size={16} className="text-amber-500" /> : 
                      <Check size={16} className="text-green-500" />
                    }
                  </Button>
                  <Button variant="ghost" size="icon" title="View">
                    <Eye size={16} className="text-blue-500" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Edit">
                    <Edit size={16} className="text-amber-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Delete"
                    onClick={() => onDelete(hotel.id)}
                  >
                    <Trash size={16} className="text-red-500" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {filteredHotels.length === 0 && !isLoading && (
            <tr>
              <td colSpan={7} className="px-6 py-8 text-center text-stone-500">
                No hotels found. Try a different search or add a new hotel.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HotelList;
