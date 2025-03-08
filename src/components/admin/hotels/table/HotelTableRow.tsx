
import React from "react";
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
import {
  Copy,
  Edit,
  MoreHorizontal,
  Star,
  StarOff,
  Clock,
  Trash,
  Eye,
  History,
} from "lucide-react";
import { Hotel } from "../types";
import { Badge } from "@/components/ui/badge";

interface HotelTableRowProps {
  hotel: Hotel;
  isSelected: boolean;
  onSelectHotel: (checked: boolean) => void;
  onDeleteHotel?: (id: number) => void;
  onToggleStatus?: (id: number) => void;
  onToggleFeatured?: (id: number, isFeatured: boolean) => void;
  onViewHistory?: (id: number) => void;
  onViewAuditLog?: (id: number) => void;
  onClone?: (hotel: Hotel) => void;
  onDelete?: (id: number) => void;
  onToggleSelect?: (id: number) => void;
}

const HotelTableRow = ({
  hotel,
  isSelected,
  onSelectHotel,
  onDeleteHotel,
  onToggleStatus,
  onToggleFeatured,
  onViewHistory,
  onViewAuditLog,
  onClone,
}: HotelTableRowProps) => {
  const {
    id,
    name,
    location,
    stars,
    pricePerNight,
    status,
    image,
    featured,
  } = hotel;

  // Format the price in INR format
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(pricePerNight);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="p-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelectHotel(!!checked)}
        />
      </td>
      <td className="p-3">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={name}
            className="w-10 h-10 rounded-md object-cover border border-gray-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/40x40/f3f4f6/6b7280?text=Image";
            }}
          />
          <div>
            <p className="font-medium text-gray-800">{name}</p>
            <p className="text-xs text-gray-500">{location}</p>
          </div>
        </div>
      </td>
      <td className="p-3">
        <div className="flex items-center">
          {Array.from({ length: stars }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-amber-400 fill-amber-400"
              strokeWidth={0}
            />
          ))}
          {Array.from({ length: 5 - stars }).map((_, i) => (
            <Star
              key={i + stars}
              className="w-4 h-4 text-gray-200 fill-gray-200"
              strokeWidth={0}
            />
          ))}
        </div>
      </td>
      <td className="p-3 font-medium">{formattedPrice}</td>
      <td className="p-3">
        <Badge
          variant={status === "active" ? "outline" : "secondary"}
          className={
            status === "active"
              ? "bg-green-50 text-green-700 hover:bg-green-50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-100"
          }
        >
          {status === "active" ? "Active" : "Inactive"}
        </Badge>
      </td>
      <td className="p-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggleFeatured && onToggleFeatured(id, featured)}
          className={featured ? "text-amber-500" : "text-gray-400"}
        >
          {featured ? (
            <Star className="h-5 w-5 fill-amber-500" />
          ) : (
            <StarOff className="h-5 w-5" />
          )}
        </Button>
      </td>
      <td className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => console.log("Edit hotel", id)}
              className="cursor-pointer"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onToggleStatus && onToggleStatus(id)}
              className="cursor-pointer"
            >
              <Clock className="h-4 w-4 mr-2" />
              {status === "active" ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onViewHistory && onViewHistory(id)}
              className="cursor-pointer"
            >
              <History className="h-4 w-4 mr-2" />
              View History
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onViewAuditLog && onViewAuditLog(id)}
              className="cursor-pointer"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Audit Log
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onClone && onClone(hotel)}
              className="cursor-pointer"
            >
              <Copy className="h-4 w-4 mr-2" />
              Clone
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDeleteHotel && onDeleteHotel(id)}
              className="cursor-pointer text-red-600"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default HotelTableRow;
