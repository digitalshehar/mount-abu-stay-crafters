
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Check } from "lucide-react";

interface PriceOverviewProps {
  hotel: any;
  onSelectRooms: () => void;
}

const PriceOverview: React.FC<PriceOverviewProps> = ({ hotel, onSelectRooms }) => {
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Price Overview</h3>
        <Badge className="bg-green-500">Best value</Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-stone-600">Room rates from</span>
          <span className="font-semibold text-xl">₹{hotel.price}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-stone-500">+ ₹{Math.round(hotel.price * 0.18)} taxes & fees</span>
          <span className="text-stone-500">per night</span>
        </div>
        
        <Button 
          className="w-full gap-2 mt-2" 
          onClick={onSelectRooms}
        >
          <Calendar className="h-4 w-4" />
          Select Rooms
        </Button>
        
        <p className="text-xs text-green-600 flex items-center justify-center mt-2">
          <Check className="h-3 w-3 mr-1" />
          Free cancellation on most rooms
        </p>
      </div>
    </div>
  );
};

export default PriceOverview;
