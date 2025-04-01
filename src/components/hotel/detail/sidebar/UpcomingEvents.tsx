
import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface UpcomingEventsProps {
  location?: string;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ location = 'Mount Abu' }) => {
  // Mock data for upcoming events
  const events = [
    {
      name: "Mount Abu Summer Festival",
      date: "May 15-17, 2025",
      distance: "1.5 km",
      url: "https://www.rajasthantourism.gov.in/mount-abu-summer-festival.html"
    },
    {
      name: "Adhar Devi Fair",
      date: "June 5-7, 2025",
      distance: "3 km",
      url: "#"
    }
  ];
  
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-4">
      <h3 className="font-semibold mb-3">Upcoming Events in {location}</h3>
      
      {events.length > 0 ? (
        <div className="space-y-3">
          {events.map((event, index) => (
            <div key={index} className="border-b border-stone-100 last:border-0 pb-2 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium">{event.name}</h4>
                  <div className="flex items-center text-xs text-stone-500 mt-0.5">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{event.date}</span>
                  </div>
                </div>
                <span className="text-xs text-stone-500">{event.distance}</span>
              </div>
              {event.url !== "#" && (
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto text-blue-600 text-xs flex items-center mt-1"
                  asChild
                >
                  <a href={event.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    More info
                  </a>
                </Button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-stone-500">No upcoming events at this time.</p>
      )}
    </div>
  );
};

export default UpcomingEvents;
