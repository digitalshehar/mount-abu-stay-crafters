
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface UpcomingEventsProps {
  location: string;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ location }) => {
  // Mock upcoming events data
  const events = [
    {
      id: 1,
      name: "Mount Abu Summer Festival",
      date: "May 15 - May 17, 2025",
      distance: "1.5 km"
    },
    {
      id: 2,
      name: "Winter Music Carnival",
      date: "December 21, 2025",
      distance: "0.8 km"
    },
    {
      id: 3,
      name: "Adhar Devi Fair",
      date: "August 9, 2025",
      distance: "3.2 km"
    }
  ];
  
  if (!location) return null;
  
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Upcoming Events</h3>
        <button className="text-blue-600 text-xs flex items-center">
          View all
          <ArrowRight className="h-3 w-3 ml-1" />
        </button>
      </div>
      
      <div className="space-y-3">
        {events.map(event => (
          <div key={event.id} className="border-b border-stone-100 pb-2 last:border-0 last:pb-0">
            <div className="flex items-start">
              <Calendar className="h-4 w-4 mt-0.5 text-blue-500 mr-2 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium">{event.name}</h4>
                <p className="text-xs text-stone-500 mt-0.5">{event.date}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                    {event.distance} from hotel
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="outline" size="sm" className="w-full mt-3 text-sm">
        Explore Local Events
      </Button>
    </div>
  );
};

export default UpcomingEvents;
