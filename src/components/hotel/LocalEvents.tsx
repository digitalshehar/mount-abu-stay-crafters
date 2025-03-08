
import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  image?: string;
}

interface LocalEventsProps {
  events?: Event[];
  startDate?: string;
  endDate?: string;
}

const LocalEvents = ({ events, startDate, endDate }: LocalEventsProps) => {
  // Default events if none provided
  const localEvents = events || [
    {
      id: "1",
      name: "Mount Abu Summer Festival",
      date: "May 15-17, 2023",
      location: "Nakki Lake",
      description: "Annual cultural festival featuring folk dances, music performances, and local crafts.",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3"
    },
    {
      id: "2",
      name: "Heritage Walk Tour",
      date: "Daily, 9:00 AM",
      location: "Starting from City Center",
      description: "Guided tour through the historical sites and architecture of Mount Abu.",
      image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
    },
    {
      id: "3",
      name: "Sunset Point Music Evening",
      date: "Weekends, 5:00 PM",
      location: "Sunset Point",
      description: "Live music performance with breathtaking views of the sunset.",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Local Events & Activities</h2>
      
      {startDate && endDate && (
        <div className="mb-6 bg-blue-50 p-4 rounded-lg flex items-center gap-3 border border-blue-100">
          <Calendar className="h-5 w-5 text-blue-500" />
          <p className="text-sm text-blue-700">
            Showing events during your stay: <span className="font-medium">{startDate}</span> to <span className="font-medium">{endDate}</span>
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {localEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-stone-200">
            {event.image && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{event.name}</h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-stone-600">
                  <span className="font-medium text-stone-700">When:</span> {event.date}
                </p>
                <p className="text-sm text-stone-600">
                  <span className="font-medium text-stone-700">Where:</span> {event.location}
                </p>
                <p className="text-sm text-stone-600 mt-2">{event.description}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">More Info</Button>
                <Button size="sm" className="flex-1">Book Now</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline">View All Local Events</Button>
      </div>
    </div>
  );
};

export default LocalEvents;
