
import React, { useState } from "react";
import { Edit, Eye, Trash, Star, Check, X, Copy, Tag, Calendar, CheckSquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Hotel } from "@/components/admin/hotels/types";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HotelListProps {
  hotels: Hotel[];
  filteredHotels: Hotel[];
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onToggleFeatured: (id: number, currentValue: boolean) => void;
  onClone?: (hotel: Hotel) => void;
  onBulkAction?: (actionType: string, hotelIds: number[]) => void;
  isLoading?: boolean;
}

const HotelList = ({ 
  hotels, 
  filteredHotels, 
  onDelete, 
  onToggleStatus, 
  onToggleFeatured,
  onClone,
  onBulkAction,
  isLoading = false 
}: HotelListProps) => {
  const navigate = useNavigate();
  const [selectedHotels, setSelectedHotels] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const handleView = (slug: string) => {
    navigate(`/hotel/${slug}`);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(filteredHotels.map(hotel => hotel.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectHotel = (id: number) => {
    if (selectedHotels.includes(id)) {
      setSelectedHotels(selectedHotels.filter(hotelId => hotelId !== id));
      if (selectAll) setSelectAll(false);
    } else {
      setSelectedHotels([...selectedHotels, id]);
      if (selectedHotels.length + 1 === filteredHotels.length) {
        setSelectAll(true);
      }
    }
  };

  const handleBulkAction = (actionType: string) => {
    if (selectedHotels.length > 0 && onBulkAction) {
      onBulkAction(actionType, selectedHotels);
      // Reset selections after action
      setSelectedHotels([]);
      setSelectAll(false);
    }
  };

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
      {selectedHotels.length > 0 && (
        <div className="p-2 bg-stone-50 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{selectedHotels.length} selected</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleBulkAction('delete')}
              className="text-red-500 border-red-200 hover:bg-red-50"
            >
              <Trash className="h-4 w-4 mr-1" /> Delete
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleBulkAction('toggleStatus')}
            >
              <Check className="h-4 w-4 mr-1" /> Toggle Status
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleBulkAction('toggleFeatured')}
            >
              <Star className="h-4 w-4 mr-1" /> Toggle Featured
            </Button>
          </div>
        </div>
      )}
      
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-stone-500 border-b">
            <th className="px-2 py-3 font-medium">
              <Checkbox 
                checked={selectAll} 
                onCheckedChange={handleSelectAll} 
                aria-label="Select all hotels"
              />
            </th>
            <th className="px-6 py-3 font-medium">Image</th>
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">Location</th>
            <th className="px-6 py-3 font-medium">Price</th>
            <th className="px-6 py-3 font-medium">Rating</th>
            <th className="px-6 py-3 font-medium">Categories</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Featured</th>
            <th className="px-6 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHotels.map((hotel) => (
            <tr key={hotel.id} className="border-b border-stone-100 hover:bg-stone-50">
              <td className="px-2 py-4">
                <Checkbox 
                  checked={selectedHotels.includes(hotel.id)} 
                  onCheckedChange={() => handleSelectHotel(hotel.id)} 
                  aria-label={`Select ${hotel.name}`}
                />
              </td>
              <td className="px-6 py-4">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-16 h-12 object-cover rounded"
                />
              </td>
              <td className="px-6 py-4 font-medium">
                {hotel.name}
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
                <div className="flex flex-wrap gap-1">
                  {hotel.categories && hotel.categories.length > 0 ? (
                    hotel.categories.map((category, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {category}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-stone-400">No categories</span>
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
                <Button 
                  variant={hotel.featured ? "default" : "outline"} 
                  size="sm"
                  className={hotel.featured ? "bg-amber-500 hover:bg-amber-600" : ""}
                  onClick={() => onToggleFeatured(hotel.id, hotel.featured)}
                >
                  <Star size={14} className={`mr-1 ${hotel.featured ? "fill-white" : ""}`} />
                  {hotel.featured ? 'Featured' : 'Feature'}
                </Button>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleView(hotel.slug)}>
                        <Eye size={14} className="mr-2 text-blue-500" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit size={14} className="mr-2 text-amber-500" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onToggleStatus(hotel.id)}>
                        {hotel.status === 'active' ? 
                          <X size={14} className="mr-2 text-amber-500" /> : 
                          <Check size={14} className="mr-2 text-green-500" />}
                        {hotel.status === 'active' ? 'Deactivate' : 'Activate'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onClone && onClone(hotel)}>
                        <Copy size={14} className="mr-2 text-violet-500" /> Clone
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(hotel.id)}
                        className="text-red-500 focus:text-red-500 focus:bg-red-50"
                      >
                        <Trash size={14} className="mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
          {filteredHotels.length === 0 && !isLoading && (
            <tr>
              <td colSpan={10} className="px-6 py-8 text-center text-stone-500">
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
