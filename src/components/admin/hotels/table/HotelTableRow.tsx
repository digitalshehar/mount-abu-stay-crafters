
import React from "react";
import { Hotel } from "../types";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Star, 
  MoreHorizontal, 
  Trash, 
  Power, 
  Copy, 
  ArrowUpDown,
  History,
  FileText
} from "lucide-react";

interface HotelTableRowProps {
  hotel: Hotel;
  onDelete: () => void;
  onToggleStatus: () => void;
  onToggleFeatured: () => void;
  onClone: () => void;
  onViewHistory: () => void;
  onViewAuditLog: () => void;
  isSelected: boolean;
  onSelectHotel: (checked: boolean) => void;
}

const HotelTableRow: React.FC<HotelTableRowProps> = ({
  hotel,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
  onClone,
  onViewHistory,
  onViewAuditLog,
  isSelected,
  onSelectHotel,
}) => {
  return (
    <tr>
      <td className="whitespace-nowrap pl-4 pr-3 py-3 text-sm">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelectHotel}
          aria-label="Select hotel"
        />
      </td>
      <td className="whitespace-nowrap pl-4 pr-3 py-3">
        <div className="flex items-center">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="h-10 w-10 rounded-md object-cover mr-3"
          />
          <div>
            <div className="font-medium text-sm">{hotel.name}</div>
            <div className="text-gray-500 text-xs">{hotel.location}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3 text-sm">
        <div className="flex items-center">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <Star key={i} fill="currentColor" className="h-4 w-4 text-yellow-400" />
          ))}
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3 text-sm">
        <div className="text-sm font-medium">${hotel.pricePerNight}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-3 text-sm">
        <Badge
          variant={hotel.status === "active" ? "default" : "secondary"}
          className="capitalize"
        >
          {hotel.status}
        </Badge>
      </td>
      <td className="whitespace-nowrap px-3 py-3 text-sm">
        <Badge
          variant={hotel.featured ? "outline" : "secondary"}
          className={hotel.featured ? "border-purple-500 text-purple-500" : ""}
        >
          {hotel.featured ? "Featured" : "Regular"}
        </Badge>
      </td>
      <td className="whitespace-nowrap pl-3 pr-4 py-3 text-right text-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              aria-label="Open menu"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onToggleStatus}>
              <Power className="mr-2 h-4 w-4" />
              {hotel.status === "active" ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onToggleFeatured}>
              <ArrowUpDown className="mr-2 h-4 w-4" />
              {hotel.featured ? "Unfeature" : "Feature"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onClone}>
              <Copy className="mr-2 h-4 w-4" />
              Clone
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={onViewHistory}>
              <History className="mr-2 h-4 w-4" />
              View History
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onViewAuditLog}>
              <FileText className="mr-2 h-4 w-4" />
              View Audit Log
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={onDelete} className="text-red-500">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default HotelTableRow;
