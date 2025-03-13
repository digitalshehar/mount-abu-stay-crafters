
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Music, Users, Flag, Calendar as CalendarIcon, MapPin } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: Date;
  type: 'festival' | 'cultural' | 'sports';
  location: string;
  description: string;
  image?: string;
}

// Improved events data with images and better descriptions
const eventsData: Event[] = [
  {
    id: 1,
    title: 'Winter Festival',
    date: new Date(new Date().getFullYear(), 11, 25), // December 25
    type: 'festival',
    location: 'Nakki Lake',
    description: 'Annual winter celebration with music, dance performances, local crafts exhibition, and traditional Rajasthani folk art displays.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    title: 'Mount Abu Classical Music Concert',
    date: new Date(new Date().getFullYear(), 11, 15), // December 15
    type: 'cultural',
    location: 'Dilwara Auditorium',
    description: 'Classical music performance by renowned Indian artists featuring sitar, tabla, and vocal performances in the serene environment of Mount Abu.',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    title: 'Aravalli Marathon',
    date: new Date(new Date().getFullYear(), 11, 10), // December 10
    type: 'sports',
    location: 'Starting from Sunset Point',
    description: 'Annual marathon through the scenic routes of Mount Abu featuring 5K, 10K, and half marathon options. Experience running through the hills of Rajasthan.',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    title: 'Adhar Devi Festival',
    date: new Date(new Date().getFullYear() + 1, 0, 14), // January 14 next year
    type: 'festival',
    location: 'Adhar Devi Temple',
    description: 'Religious celebrations and local fair at the historic Adhar Devi Temple, featuring devotional music, prayers, and traditional food stalls.',
    image: 'https://images.unsplash.com/photo-1577372970039-2ac95c059606?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  },
  {
    id: 5,
    title: 'Mount Abu Photography Exhibition',
    date: new Date(new Date().getFullYear() + 1, 0, 5), // January 5 next year
    type: 'cultural',
    location: 'Art Gallery',
    description: 'Exhibition showcasing photographs of Mount Abu\'s landscapes, wildlife, and cultural heritage by local and national photographers.',
    image: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  },
  {
    id: 6,
    title: 'Republic Day Celebrations',
    date: new Date(new Date().getFullYear() + 1, 0, 26), // January 26 next year
    type: 'festival',
    location: 'Central Ground',
    description: 'Flag hoisting, parade, and cultural performances celebrating Republic Day with special programs highlighting the heritage of Rajasthan.',
    image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  },
  {
    id: 7,
    title: 'Yoga and Wellness Retreat',
    date: new Date(new Date().getFullYear(), 10, 5), // Current month + 5 days
    type: 'cultural',
    location: 'Peace Park',
    description: 'A three-day wellness retreat featuring yoga sessions, meditation workshops, and ayurvedic health consultations in the tranquil setting of Mount Abu.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  },
  {
    id: 8,
    title: 'Tribal Arts Festival',
    date: new Date(new Date().getFullYear(), 10, 18), // Current month + 18 days
    type: 'festival',
    location: 'Community Center',
    description: 'Celebration of indigenous tribal arts, crafts, and cultural performances showcasing the rich heritage of the Aravalli region tribes.',
    image: 'https://images.unsplash.com/photo-1551723876-b8bd7a2b468c?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  }
];

const EventsCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Get events for the selected date
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return eventsData.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Highlight dates with events
  const isDayWithEvent = (day: Date) => {
    return eventsData.some(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };
  
  const selectedEvents = getEventsForDate(selectedDate);
  
  const getEventIcon = (type: string) => {
    switch(type) {
      case 'festival':
        return <Flag className="h-4 w-4" />;
      case 'cultural':
        return <Music className="h-4 w-4" />;
      case 'sports':
        return <Users className="h-4 w-4" />;
      default:
        return <Flag className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'festival':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cultural':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'sports':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>Upcoming Events & Festivals</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                event: (date) => isDayWithEvent(date),
              }}
              modifiersClassNames={{
                event: "bg-primary/20 font-bold text-primary",
              }}
              disabled={{ before: new Date(new Date().setDate(new Date().getDate() - 1)) }}
            />
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 text-primary" />
              {selectedDate ? (
                <>Events on {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</>
              ) : (
                <>Select a date to see events</>
              )}
            </h3>
            
            {selectedEvents.length === 0 ? (
              <div className="text-sm text-gray-500 py-8 text-center border rounded-md bg-gray-50">
                <p>No events scheduled for this date.</p>
                <p className="mt-1 text-xs text-primary">Try selecting a different date!</p>
              </div>
            ) : (
              <ScrollArea className="h-[220px]">
                {selectedEvents.map(event => (
                  <div key={event.id} className="mb-3 border rounded-md overflow-hidden bg-white">
                    {event.image && (
                      <div className="h-32 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <Badge variant="outline" className={`flex items-center gap-1 ${getTypeColor(event.type)}`}>
                          {getEventIcon(event.type)}
                          <span className="text-xs capitalize">{event.type}</span>
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </p>
                      <p className="text-xs mt-2 line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsCalendar;
