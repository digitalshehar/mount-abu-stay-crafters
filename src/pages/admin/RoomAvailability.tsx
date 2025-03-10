
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Download, RefreshCcw } from 'lucide-react';
import { addMonths, format, isSameDay, startOfMonth } from 'date-fns';

// Sample data
const hotels = [
  { id: 1, name: 'The Grand Resort' },
  { id: 2, name: 'Mountain Retreat' },
  { id: 3, name: 'Lakeside Hotel' },
  { id: 4, name: 'Sunset View' },
];

const roomTypes = [
  { id: 1, name: 'Deluxe Room', availabilityData: {} },
  { id: 2, name: 'Standard Room', availabilityData: {} },
  { id: 3, name: 'Suite', availabilityData: {} },
];

// Generate random availability data
const generateAvailabilityData = () => {
  const today = new Date();
  const data: Record<string, { available: number; booked: number; maintenance: number }> = {};
  
  // Generate data for next 60 days
  for (let i = 0; i < 60; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    const dateString = format(date, 'yyyy-MM-dd');
    
    // Random values
    const total = Math.floor(Math.random() * 15) + 5; // 5-20 rooms
    const booked = Math.floor(Math.random() * (total - 1)) + 1;
    const maintenance = Math.floor(Math.random() * (total - booked)) || 0;
    const available = total - booked - maintenance;
    
    data[dateString] = { available, booked, maintenance };
  }
  
  return data;
};

// Generate data for each room type
roomTypes.forEach(room => {
  room.availabilityData = generateAvailabilityData();
});

const RoomAvailability = () => {
  const [selectedHotel, setSelectedHotel] = useState<string>(hotels[0].id.toString());
  const [selectedRoomType, setSelectedRoomType] = useState<string>(roomTypes[0].id.toString());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  
  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(prevMonth.getMonth() - 1);
      return newMonth;
    });
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(prevMonth.getMonth() + 1);
      return newMonth;
    });
  };
  
  const getDayAvailability = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const roomType = roomTypes.find(r => r.id.toString() === selectedRoomType);
    if (!roomType) return null;
    
    return roomType.availabilityData[dateString] || null;
  };
  
  // Custom day render function for the calendar
  const renderDay = (day: Date) => {
    const availability = getDayAvailability(day);
    
    if (!availability) return <div className="h-10 w-10 flex items-center justify-center">{day.getDate()}</div>;
    
    const { available, booked, maintenance } = availability;
    let bgColor = 'bg-green-100 dark:bg-green-900/30';
    let textColor = 'text-green-800 dark:text-green-400';
    
    if (available === 0) {
      bgColor = 'bg-red-100 dark:bg-red-900/30';
      textColor = 'text-red-800 dark:text-red-400';
    } else if (available < 3) {
      bgColor = 'bg-yellow-100 dark:bg-yellow-900/30';
      textColor = 'text-yellow-800 dark:text-yellow-400';
    }
    
    return (
      <div className={`h-14 w-full p-1 ${bgColor} rounded-md flex flex-col`}>
        <div className="flex justify-between w-full">
          <span className="text-xs">{day.getDate()}</span>
          <span className={`text-xs font-semibold ${textColor}`}>{available}</span>
        </div>
        {booked > 0 && (
          <div className="text-[10px] text-muted-foreground">
            Booked: {booked}
          </div>
        )}
      </div>
    );
  };

  // Generate dates for the calendar view
  const generateCalendarDates = () => {
    const startDate = startOfMonth(currentMonth);
    const endDate = addMonths(startDate, 1);
    const dates: Date[] = [];
    
    let currentDate = new Date(startDate);
    while (currentDate < endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  return (
    <div className="container mx-auto p-6 max-w-[1200px]">
      <Card className="mb-6 shadow-md animate-fade-in">
        <CardHeader className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle>Room Availability Calendar</CardTitle>
            <p className="text-sm text-muted-foreground">
              Monitor and manage room availability across your properties
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">Hotel</label>
              <Select value={selectedHotel} onValueChange={setSelectedHotel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hotel" />
                </SelectTrigger>
                <SelectContent>
                  {hotels.map(hotel => (
                    <SelectItem key={hotel.id} value={hotel.id.toString()}>
                      {hotel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Room Type</label>
              <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map(room => (
                    <SelectItem key={room.id} value={room.id.toString()}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Tabs value={view} onValueChange={(value) => setView(value as 'calendar' | 'list')} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="mt-6">
            <Tabs value={view} className="w-full">
              <TabsContent value="calendar" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-medium">{format(currentMonth, 'MMMM yyyy')}</h3>
                  <Button variant="outline" size="sm" onClick={goToNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDates().map((date, index) => {
                    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
                    
                    // Add empty cells for days before the first of the month
                    if (date.getDate() === 1) {
                      const emptyCells = [];
                      for (let i = 0; i < firstDay; i++) {
                        emptyCells.push(
                          <div key={`empty-${i}`} className="h-14"></div>
                        );
                      }
                      return [
                        ...emptyCells,
                        <div key={date.toISOString()} className="p-0.5">
                          {renderDay(date)}
                        </div>
                      ];
                    }
                    
                    return (
                      <div key={date.toISOString()} className="p-0.5">
                        {renderDay(date)}
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Limited (less than 3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-sm">Fully Booked</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="mt-0">
                <div className="border rounded-md">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                    <div>Date</div>
                    <div>Available</div>
                    <div>Booked</div>
                    <div>Maintenance</div>
                  </div>
                  
                  <div className="divide-y">
                    {generateCalendarDates().map(date => {
                      const availability = getDayAvailability(date);
                      if (!availability) return null;
                      
                      const { available, booked, maintenance } = availability;
                      
                      let rowClass = '';
                      if (available === 0) {
                        rowClass = 'bg-red-50 dark:bg-red-900/10';
                      } else if (available < 3) {
                        rowClass = 'bg-yellow-50 dark:bg-yellow-900/10';
                      }
                      
                      return (
                        <div 
                          key={date.toISOString()}
                          className={`grid grid-cols-4 gap-4 p-4 ${rowClass} hover:bg-muted/50 transition-colors`}
                        >
                          <div>{format(date, 'EEEE, MMM dd')}</div>
                          <div>{available}</div>
                          <div>{booked}</div>
                          <div>{maintenance}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomAvailability;
