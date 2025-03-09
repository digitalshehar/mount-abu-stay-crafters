
import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface FavoritesButtonProps {
  showFavoritesOnly: boolean;
  onToggleFavoritesFilter: () => void;
}

const FavoritesButton: React.FC<FavoritesButtonProps> = ({
  showFavoritesOnly,
  onToggleFavoritesFilter
}) => {
  const { toast } = useToast();

  const handleToggle = () => {
    onToggleFavoritesFilter();
    
    // Show toast notification when toggling
    toast({
      title: showFavoritesOnly ? "Showing all hotels" : "Showing favorites only",
      description: showFavoritesOnly 
        ? "Displaying all available hotels"
        : "Filtering to show only your favorite hotels",
      duration: 2000,
    });
  };

  return (
    <Button 
      variant={showFavoritesOnly ? "default" : "outline"} 
      size="sm"
      onClick={handleToggle}
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
