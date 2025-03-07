
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash, Check, Star } from "lucide-react";

interface BulkActionsBarProps {
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkToggleStatus: () => void;
  onBulkToggleFeatured: () => void;
}

const BulkActionsBar = ({ 
  selectedCount, 
  onBulkDelete, 
  onBulkToggleStatus, 
  onBulkToggleFeatured 
}: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;
  
  return (
    <div className="p-2 bg-stone-50 border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{selectedCount} selected</span>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onBulkDelete}
          className="text-red-500 border-red-200 hover:bg-red-50"
        >
          <Trash className="h-4 w-4 mr-1" /> Delete
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onBulkToggleStatus}
        >
          <Check className="h-4 w-4 mr-1" /> Toggle Status
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onBulkToggleFeatured}
        >
          <Star className="h-4 w-4 mr-1" /> Toggle Featured
        </Button>
      </div>
    </div>
  );
};

export default BulkActionsBar;
