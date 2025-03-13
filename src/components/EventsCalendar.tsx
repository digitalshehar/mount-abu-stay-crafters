
import React, { useState } from 'react';
import { Calendar, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  location: string;
  image?: string;
  category: 'festival' | 'cultural' | 'religious' | 'sports' | 'other';
}

const EventsCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Mount Abu events data
  const events: Event[] = [
    {
      id: 1,
      name: "Summer Festival",
      date: "2023-05-15",
      description: "The vibrant Summer Festival features traditional Rajasthani dance, music performances, and cultural competitions celebrating the region's heritage.",
      location: "Nakki Lake, Mount Abu",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      category: 'festival'
    },
    {
      id: 2,
      name: "Winter Festival",
      date: "2023-12-29",
      description: "A three-day extravaganza showcasing folk dances, music concerts, and a colorful procession through Mount Abu's streets.",
      location: "Polo Ground, Mount Abu",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      category: 'festival'
    },
    {
      id: 3,
      name: "Adhar Devi Fair",
      date: "2023-09-10",
      description: "Religious fair at the famous Adhar Devi temple, drawing devotees from across Rajasthan who climb 365 steps to seek blessings.",
      location: "Adhar Devi Temple",
      image: "https://images.unsplash.com/photo-1627557256068-0b2f516c0f6d?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      category: 'religious'
    },
    {
      id: 4,
      name: "Mount Abu Trekking Festival",
      date: "2023-10-12",
      description: "Adventure event featuring guided treks through the Mount Abu Wildlife Sanctuary with professional mountaineers.",
      location: "Mount Abu Wildlife Sanctuary",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      category: 'sports'
    },
    {
      id: 5,
      name: "Nakki Lake Cultural Evening",
      date: "2023-11-05",
      description: "Evening of traditional Rajasthani folk music and dance performances against the backdrop of the serene Nakki Lake.",
      location: "Nakki Lake Musical Fountain",
      image: "https://images.unsplash.com/photo-1601794590530-93b57767e259?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      category: 'cultural'
    },
    {
      id: 6,
      name: "Mahashivratri Celebration",
      date: "2024-03-08",
      description: "Special prayers, rituals, and procession at the ancient Achaleshwar Mahadev Temple to honor Lord Shiva.",
      location: "Achaleshwar Mahadev Temple",
      image: "https://images.unsplash.com/photo-1518330023775-2f56201ebcdd?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      category: 'religious'
    }
  ];
  
  // Get upcoming events (sorted by date)
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter(event => new Date(event.date) >= new Date()); // Only future events
  
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
  };
  
  // Get the category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'festival':
        return 'bg-purple-100 text-purple-800';
      case 'cultural':
        return 'bg-blue-100 text-blue-800';
      case 'religious':
        return 'bg-orange-100 text-orange-800';
      case 'sports':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-stone-100 text-stone-800';
    }
  };
  
  return (
    <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-display font-semibold">Upcoming Events & Festivals</h3>
          <p className="text-stone-600 text-sm">
            Don't miss these exciting events happening in Mount Abu
          </p>
        </div>
        <CalendarIcon className="h-5 w-5 text-stone-400" />
      </div>
      
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={handlePrevMonth}
          className="p-1 rounded-full hover:bg-stone-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h4 className="font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </h4>
        <button 
          onClick={handleNextMonth}
          className="p-1 rounded-full hover:bg-stone-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      {/* Events list */}
      <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <div 
              key={event.id}
              className="flex gap-3 p-3 border border-stone-100 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
              onClick={() => handleSelectEvent(event)}
            >
              {event.image && (
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={event.image} 
                    alt={event.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
              )}
              <div>
                <div className="flex items-start justify-between">
                  <h5 className="font-medium text-sm">{event.name}</h5>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  {format(new Date(event.date), 'MMMM d, yyyy')}
                </p>
                <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                  {event.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-stone-300 mb-2" />
            <p className="text-stone-500">No upcoming events for this period</p>
          </div>
        )}
      </div>
      
      {/* View all events link */}
      <div className="mt-4 text-center">
        <a href="#" className="text-primary text-sm font-medium hover:underline">
          View All Events
        </a>
      </div>
      
      {/* Event details modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {selectedEvent.image && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">{selectedEvent.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(selectedEvent.category)}`}>
                  {selectedEvent.category}
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-stone-600 mb-2">
                  <span className="font-medium">Date:</span> {format(new Date(selectedEvent.date), 'MMMM d, yyyy')}
                </p>
                <p className="text-sm text-stone-600">
                  <span className="font-medium">Location:</span> {selectedEvent.location}
                </p>
              </div>
              
              <p className="text-sm text-stone-700 mb-6">
                {selectedEvent.description}
              </p>
              
              <div className="flex justify-end gap-2">
                <button 
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded-md hover:bg-stone-200"
                  onClick={() => setSelectedEvent(null)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsCalendar;
