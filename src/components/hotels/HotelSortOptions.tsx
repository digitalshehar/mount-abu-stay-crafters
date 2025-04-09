
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Grid, List } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HotelSortOptionsProps {
  sortOrder: string;
  setSortOrder: (order: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  resultsCount: number;
}

const HotelSortOptions: React.FC<HotelSortOptionsProps> = ({
  sortOrder,
  setSortOrder,
  viewMode,
  setViewMode,
  resultsCount,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 space-y-4 sm:space-y-0">
      <p className="text-stone-500">
        <span className="font-medium text-stone-800">{resultsCount}</span>{" "}
        {resultsCount === 1 ? "hotel" : "hotels"} found
      </p>

      <div className="flex space-x-4 items-center">
        <div className="flex items-center space-x-2">
          <ArrowUpDown size={16} className="text-stone-500" />
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="rating_desc">Highest Rated</SelectItem>
              <SelectItem value="name_asc">Name: A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-md flex">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="rounded-none border-r"
          >
            <Grid size={16} />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="rounded-none"
          >
            <List size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelSortOptions;
