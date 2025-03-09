
import React from "react";
import { Map, Bookmark, Share2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import HtmlRedirectButton from "../HtmlRedirectButton";
import { useNavigate } from "react-router-dom";
import { FavoriteButton } from "@/components/FavoriteButton";

interface HotelActionButtonsProps {
  hotel: {
    slug: string;
    name: string;
    id: string;
    latitude?: number;
    longitude?: number;
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onViewGallery: () => void;
}

const HotelActionButtons = ({ 
  hotel, 
  isFavorite,
  onToggleFavorite,
  onViewGallery
}: HotelActionButtonsProps) => {
  const navigate = useNavigate();
  
  const handleShareHotel = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: hotel?.name || "Hotel Details",
          text: `Check out ${hotel?.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleViewOnMap = () => {
    // Fixed navigation to the correct map page URL with the hotel slug as a query parameter
    navigate(`/hotels/map?selected=${hotel.slug}`);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={handleViewOnMap}
      >
        <Map className="h-4 w-4" />
        <span>View on Map</span>
      </Button>
      
      {/* Replace the save button with the FavoriteButton component */}
      <FavoriteButton 
        itemId={parseInt(hotel.id)}
        itemType="hotel"
        variant="outline"
        size="sm"
        className={`flex items-center gap-2 ${isFavorite ? 'text-rose-500 border-rose-200' : ''}`}
      />
      
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={handleShareHotel}
      >
        <Share2 className="h-4 w-4" />
        <span>Share</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={onViewGallery}
      >
        <Camera className="h-4 w-4" />
        <span>All Photos</span>
      </Button>

      <HtmlRedirectButton 
        hotelSlug={hotel.slug} 
      />
    </div>
  );
};

export default HotelActionButtons;
