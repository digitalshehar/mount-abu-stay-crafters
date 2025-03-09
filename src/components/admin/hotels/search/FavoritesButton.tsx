
import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FavoritesButtonProps {
  showFavoritesOnly: boolean;
  onToggleFavoritesFilter: () => void;
}

const FavoritesButton: React.FC<FavoritesButtonProps> = ({
  showFavoritesOnly,
  onToggleFavoritesFilter
}) => {
  return (
    <Button 
      variant={showFavoritesOnly ? "default" : "outline"} 
      size="sm"
      onClick={onToggleFavoritesFilter}
      className={cn(
        "gap-1",
        showFavoritesOnly && "bg-red-100 hover:bg-red-200 text-red-800 border-red-200"
      )}
    >
      <Heart className={cn("h-4 w-4", showFavoritesOnly && "fill-red-500")} />
      {showFavoritesOnly ? "Showing Favorites" : "Show Favorites"}
    </Button>
  );
};

export default FavoritesButton;
