
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Hotel } from "@/components/admin/hotels/types";
import { Edit, Eye, Trash, Star, Check, X, Copy, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HotelTableRowProps {
  hotel: Hotel;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onView: (slug: string) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onToggleFeatured: (id: number, currentValue: boolean) => void;
  onClone?: (hotel: Hotel) => void;
}

const HotelTableRow = ({ 
  hotel, 
  isSelected, 
  onSelect, 
  onView, 
  onDelete, 
  onToggleStatus, 
  onToggleFeatured,
  onClone
}: HotelTableRowProps) => {
  return (
    <tr className="border-b border-stone-100 hover:bg-stone-50">
      <td className="px-2 py-4">
        <Checkbox 
          checked={isSelected} 
          onCheckedChange={() => onSelect(hotel.id)} 
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
              <DropdownMenuItem onClick={() => onView(hotel.slug)}>
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
  );
};

export default HotelTableRow;
