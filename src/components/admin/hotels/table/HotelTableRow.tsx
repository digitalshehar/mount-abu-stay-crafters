import React from "react";
import { 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Clock, 
  Copy, 
  BarChart3, 
  Power, 
  Star,
  Heart
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Hotel } from "@/components/admin/hotels/types";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

export interface HotelTableRowProps {
  hotel: Hotel;
  onDeleteHotel: () => void;
  onEditHotel: () => void;
  onToggleStatus: () => void;
  onToggleFeatured: () => void;
  onClone: () => void;
  onViewHistory: () => void;
  onViewAuditLog: () => void;
  isSelected: boolean;
  onSelectHotel: (checked: boolean) => void;
}

const HotelTableRow = ({
  hotel,
  onDeleteHotel,
  onEditHotel,
  onToggleStatus,
  onToggleFeatured,
  onClone,
  onViewHistory,
  onViewAuditLog,
  isSelected,
  onSelectHotel
}: HotelTableRowProps) => {
  const { user } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite, getFavoriteId } = useFavorites(user);
  
  const isHotelFavorite = isFavorite(hotel.id, 'hotel');
  
  const handleToggleFavorite = async () => {
    if (isHotelFavorite) {
      const favoriteId = getFavoriteId(hotel.id, 'hotel');
      if (favoriteId) {
        await removeFromFavorites(hotel.id, 'hotel');
      }
    } else {
      await addToFavorites(hotel.id, 'hotel');
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="pl-4 py-4 text-center">
        <Checkbox 
          checked={isSelected}
          onCheckedChange={onSelectHotel}
        />
      </td>
      
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
            {hotel.image ? (
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500">
                No img
              </div>
            )}
          </div>
          <div>
            <div className="font-medium">{hotel.name}</div>
            <div className="text-xs text-gray-500">{hotel.location}</div>
          </div>
        </div>
      </td>
      
      <td className="p-4">
        <div className="flex items-center">
          {Array.from({ length: hotel.stars }).map((_, index) => (
            <Star key={index} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </td>
      
      <td className="p-4">
        <div className="font-medium">₹{hotel.pricePerNight.toLocaleString('en-IN')}</div>
      </td>
      
      <td className="p-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          hotel.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {hotel.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </td>
      
      <td className="p-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          hotel.featured ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {hotel.featured ? 'Featured' : 'Standard'}
        </span>
      </td>
      
      <td className="p-4">
        <div className="flex items-center justify-end gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "h-8 w-8 p-0",
              isHotelFavorite && "text-red-500 hover:text-red-600"
            )}
            onClick={handleToggleFavorite}
          >
            <Heart className={cn("h-4 w-4", isHotelFavorite && "fill-red-500")} />
            <span className="sr-only">
              {isHotelFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </span>
          </Button>
          
          <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={onToggleStatus}>
            <Power className="h-4 w-4" />
            <span className="sr-only">Toggle Status</span>
          </Button>
          
          <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={onEditHotel}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit Hotel</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={onEditHotel}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Hotel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggleFeatured}>
                <Star className="mr-2 h-4 w-4" />
                {hotel.featured ? 'Remove from Featured' : 'Mark as Featured'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleToggleFavorite}>
                <Heart className={cn("mr-2 h-4 w-4", isHotelFavorite && "fill-red-500")} />
                {isHotelFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onClone}>
                <Copy className="mr-2 h-4 w-4" />
                Clone Hotel
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onViewHistory}>
                <Clock className="mr-2 h-4 w-4" />
                View History
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onViewAuditLog}>
                <BarChart3 className="mr-2 h-4 w-4" />
                View Audit Log
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={onDeleteHotel}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Hotel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
};

export default HotelTableRow;
