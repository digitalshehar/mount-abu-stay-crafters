import React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Hotel } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";

interface HotelTableRowProps {
  hotel: Hotel;
  row: Row<Hotel>;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onClone: (id: number) => void;
}

// Inside the component, update the handling of favorites
export function HotelTableRow({ hotel, onEdit, onDelete, onClone }: HotelTableRowProps) {
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
        {/* <Checkbox
          id={row.id}
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        /> */}
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
              <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
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
