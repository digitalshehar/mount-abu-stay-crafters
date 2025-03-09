
import React from 'react';
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UpcomingEventsProps {
  hotel: any;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ hotel }) => {
  const navigate = useNavigate();
  
  const handleViewAllEvents = () => {
    navigate(`/hotel/${hotel.slug}?tab=events`);
  };

  return (
    <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <CalendarDays className="h-5 w-5 text-primary mr-2" />
        <h3 className="font-semibold text-lg">Upcoming Events</h3>
      </div>
      <div className="space-y-3">
        <div className="bg-stone-50 rounded-md p-3 border border-stone-100">
          <p className="font-medium">Summer Festival</p>
          <p className="text-xs text-stone-500 mt-1">May 15-17 • 1.2 km away</p>
        </div>
        <div className="bg-stone-50 rounded-md p-3 border border-stone-100">
          <p className="font-medium">Crafts Fair</p>
          <p className="text-xs text-stone-500 mt-1">Jun 5-7 • 2.5 km away</p>
        </div>
        <Button 
          variant="link" 
          className="w-full text-sm"
          onClick={handleViewAllEvents}
        >
          View all events →
        </Button>
      </div>
    </div>
  );
};

export default UpcomingEvents;
