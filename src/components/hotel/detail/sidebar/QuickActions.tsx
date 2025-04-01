
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Heart, Share, Phone, Calendar, CreditCard } from 'lucide-react';
import { toast } from "sonner";

interface QuickActionsProps {
  hotel: any;
  onSelectRooms: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ hotel = {}, onSelectRooms }) => {
  const handleMapView = () => {
    toast.info("Opening map view");
    // Scroll to map section or open map modal
    const mapElement = document.getElementById('hotel-map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShareHotel = () => {
    // Copy URL to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Hotel link copied to clipboard");
    }
  };

  const handleCallHotel = () => {
    const phone = hotel?.contactInfo?.phone;
    if (phone) {
      window.location.href = `tel:${phone}`;
    } else {
      toast.info("Contact number not available");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-stone-200 p-4">
      <h3 className="font-semibold mb-3 text-sm">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center justify-start gap-2"
          onClick={handleMapView}
        >
          <MapPin className="h-4 w-4 text-blue-500" />
          <span>View on Map</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center justify-start gap-2"
          onClick={handleShareHotel}
        >
          <Share className="h-4 w-4 text-green-500" />
          <span>Share Hotel</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center justify-start gap-2"
          onClick={onSelectRooms}
        >
          <Calendar className="h-4 w-4 text-purple-500" />
          <span>Check Rooms</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center justify-start gap-2"
          onClick={handleCallHotel}
        >
          <Phone className="h-4 w-4 text-red-500" />
          <span>Call Hotel</span>
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
