
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  SortAsc, 
  SortDesc, 
  Star, 
  DollarSign, 
  MapPin, 
  ThumbsUp 
} from "lucide-react";

interface SortingControlsProps {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string) => void;
  onSortOrderChange: () => void;
  className?: string;
}

const SortingControls: React.FC<SortingControlsProps> = ({ 
  sortBy, 
  sortOrder, 
  onSortChange, 
  onSortOrderChange,
  className
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <div className="flex items-center">
        <span className="text-sm text-stone-600 mr-2 hidden sm:inline">Sort by:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[160px] h-9">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort Options</SelectLabel>
              <SelectItem value="price">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-stone-500" />
                  Price
                </div>
              </SelectItem>
              <SelectItem value="rating">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  Rating
                </div>
              </SelectItem>
              <SelectItem value="popularity">
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-2 text-blue-500" />
                  Popularity
                </div>
              </SelectItem>
              <SelectItem value="distance">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-red-500" />
                  Distance
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onSortOrderChange}
        className="h-9"
      >
        {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
        <span className="ml-2 hidden sm:inline">{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
      </Button>
    </div>
  );
};

export default SortingControls;
