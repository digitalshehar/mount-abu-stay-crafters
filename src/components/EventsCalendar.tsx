
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Music, Users, Flag } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: Date;
  type: 'festival' | 'cultural' | 'sports';
  location: string;
  description: string;
}

// Sample events data
const eventsData: Event[] = [
  {
    id: 1,
    title: 'Winter Festival',
    date: new Date(2023, 11, 25), // December 25, 2023
    type: 'festival',
    location: 'Nakki Lake',
    description: 'Annual winter celebration with music, dance, and local crafts exhibition.'
  },
  {
    id: 2,
    title: 'Mount Abu Classical Music Concert',
    date: new Date(2023, 11, 15), // December 15, 2023
    type: 'cultural',
    location: 'Dilwara Auditorium',
    description: 'Classical music performance by renowned Indian artists.'
  },
  {
    id: 3,
    title: 'Aravalli Marathon',
    date: new Date(2023, 11, 10), // December 10, 2023
    type: 'sports',
    location: 'Starting from Sunset Point',
    description: 'Annual marathon through the scenic routes of Mount Abu.'
  },
  {
    id: 4,
    title: 'Adhar Devi Festival',
    date: new Date(2024, 0, 14), // January 14, 2024
    type: 'festival',
    location: 'Adhar Devi Temple',
    description: 'Religious celebrations and local fair at the temple.'
  },
  {
    id: 5,
    title: 'Mount Abu Photography Exhibition',
    date: new Date(2024, 0, 5), // January 5, 2024
    type: 'cultural',
    location: 'Art Gallery',
    description: 'Exhibition showcasing photographs of Mount Abu\'s landscapes and wildlife.'
  },
  {
    id: 6,
    title: 'Republic Day Celebrations',
    date: new Date(2024, 0, 26), // January 26, 2024
    type: 'festival',
    location: 'Central Ground',
    description: 'Flag hoisting, parade, and cultural performances celebrating Republic Day.'
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
              disabled={{ before: new Date(2023, 10, 1) }}
            />
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">
              {selectedDate ? (
                <>Events on {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</>
              ) : (
                <>Select a date to see events</>
              )}
            </h3>
            
            {selectedEvents.length === 0 ? (
              <p className="text-sm text-gray-500 py-4">No events scheduled for this date.</p>
            ) : (
              <ScrollArea className="h-[220px]">
                {selectedEvents.map(event => (
                  <div key={event.id} className="mb-3 p-3 border rounded-md bg-gray-50">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getEventIcon(event.type)}
                        <span className="text-xs capitalize">{event.type}</span>
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                    <p className="text-xs mt-2">{event.description}</p>
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
