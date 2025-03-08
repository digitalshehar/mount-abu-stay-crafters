
import React from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoomCountSelectorProps {
  roomType: string;
  count: number;
  onIncrease: (roomType: string) => void;
  onDecrease: (roomType: string) => void;
}

const RoomCountSelector = ({ 
  roomType, 
  count, 
  onIncrease, 
  onDecrease 
}: RoomCountSelectorProps) => {
  return (
    <div className="mb-2 flex items-center justify-end gap-2">
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8"
        onClick={() => onDecrease(roomType)}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-5 text-center">{count}</span>
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8"
        onClick={() => onIncrease(roomType)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default RoomCountSelector;
