
import React from "react";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NewHotel } from "@/components/admin/hotels/types";

interface StarRatingFieldProps {
  newHotel: NewHotel;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const StarRatingField = ({ 
  newHotel, 
  handleInputChange
}: StarRatingFieldProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <Label htmlFor="stars">Star Rating*</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-stone-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-[200px] text-xs">Star rating affects pricing expectations and search filters.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <select
        id="stars"
        name="stars"
        value={newHotel.stars}
        onChange={handleInputChange}
        className="w-full rounded-md border border-stone-200 px-3 py-2"
        required
      >
        <option value={1}>1 Star</option>
        <option value={2}>2 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={5}>5 Stars</option>
      </select>
    </div>
  );
};

export default StarRatingField;
