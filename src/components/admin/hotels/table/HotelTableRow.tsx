
import React from "react";
import { MoreHorizontal } from "lucide-react"; // Using lucide-react instead of radix icons
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";

// Define a simplified Hotel type since we can't import from @/types
interface Hotel {
  id: number;
  name: string;
  location: string;
  price_per_night: number;
  category: string;
  review_count: number;
  image?: string;
  featured?: boolean;
  status?: string;
}

interface HotelTableRowProps {
  hotel: Hotel;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onClone: (id: number) => void;
  isSelected?: boolean;
  onSelectHotel?: (checked: boolean) => void;
  onToggleStatus?: (id: number) => void;
  onToggleFeatured?: (id: number, featured: boolean) => void;
  onViewHistory?: (id: number) => void;
  onViewAuditLog?: (id: number) => void;
}

export function HotelTableRow({ 
  hotel, 
  onEdit, 
  onDelete, 
  onClone,
  isSelected,
  onSelectHotel,
  onToggleStatus,
  onToggleFeatured,
  onViewHistory,
  onViewAuditLog
}: HotelTableRowProps) {
  const [isCloning, setIsCloning] = React.useState(false);
  
  const { user } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites(user);
  
  const handleClone = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCloning(true);
    try {
      await onClone(hotel.id);
    } finally {
      setIsCloning(false);
    }
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(hotel.id, 'hotel')) {
      removeFromFavorites(hotel.id, 'hotel');
    } else {
      addToFavorites(hotel.id, 'hotel');
    }
  };
  
  return (
    <tr>
      <td className="p-4 align-middle [&:has([data-state=checked])]:bg-muted">
        {onSelectHotel && (
          <Checkbox
            checked={isSelected}
            onCheckedChange={(value) => onSelectHotel(!!value)}
            aria-label="Select row"
          />
        )}
      </td>
      <td>
        <div className="flex items-center space-x-2">
          {hotel.image && (
            <img
              src={hotel.image}
              alt={hotel.name}
              width="50"
              height="50"
              className="rounded-md"
            />
          )}
          <span className="font-medium">{hotel.name}</span>
        </div>
      </td>
      <td>{hotel.location}</td>
      <td>₹{hotel.price_per_night}</td>
      <td>
        <Badge variant="outline">{hotel.category}</Badge>
      </td>
      <td>{hotel.review_count}</td>
      <td className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => onEdit(hotel.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleToggleFavorite}>
              {isFavorite(hotel.id, 'hotel') ? 'Remove from Favorites' : 'Add to Favorites'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleClone} disabled={isCloning}>
              {isCloning ? "Cloning..." : "Clone"}
            </DropdownMenuItem>
            {onToggleStatus && (
              <DropdownMenuItem onClick={() => onToggleStatus(hotel.id)}>
                {hotel.status === 'active' ? 'Deactivate' : 'Activate'}
              </DropdownMenuItem>
            )}
            {onToggleFeatured && (
              <DropdownMenuItem onClick={() => onToggleFeatured(hotel.id, !!hotel.featured)}>
                {hotel.featured ? 'Unmark Featured' : 'Mark as Featured'}
              </DropdownMenuItem>
            )}
            {onViewHistory && (
              <DropdownMenuItem onClick={() => onViewHistory(hotel.id)}>
                View History
              </DropdownMenuItem>
            )}
            {onViewAuditLog && (
              <DropdownMenuItem onClick={() => onViewAuditLog(hotel.id)}>
                View Audit Log
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(hotel.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}

export default HotelTableRow;
