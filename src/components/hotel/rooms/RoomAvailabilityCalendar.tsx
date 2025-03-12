
import React, { useState } from 'react';
import { format, addDays, eachDayOfInterval, isSameDay, isBefore, isAfter, addMonths } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RoomAvailabilityCalendarProps {
  roomType: string;
  bookedDates?: { startDate: Date; endDate: Date }[];
}

const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({ 
  roomType,
  bookedDates = []
}) => {
  const today = new Date();
  const [month, setMonth] = useState(today);
  
  // Generate some sample booked dates if none provided
  const sampleBookedDates = bookedDates.length > 0 ? bookedDates : [
    { startDate: addDays(today, 1), endDate: addDays(today, 3) },
    { startDate: addDays(today, 8), endDate: addDays(today, 10) },
    { startDate: addDays(today, 15), endDate: addDays(today, 18) },
    { startDate: addDays(today, 22), endDate: addDays(today, 25) },
  ];

  // Check if a date is booked
  const isDateBooked = (date: Date) => {
    return sampleBookedDates.some(booking => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      return (
        (isSameDay(date, bookingStart) || isAfter(date, bookingStart)) && 
        (isSameDay(date, bookingEnd) || isBefore(date, bookingEnd))
      );
    });
  };
  
  // Get all booked dates as flat array for coloring
  const getAllBookedDates = () => {
    return sampleBookedDates.flatMap(booking => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      return eachDayOfInterval({ start, end });
    });
  };
  
  const bookedDatesList = getAllBookedDates();
  
  // Custom day rendering
  const renderDay = (day: Date) => {
    const isBooked = bookedDatesList.some(bookedDate => isSameDay(day, bookedDate));
    
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center ${
          isBooked ? 'bg-red-50' : 'bg-green-50'
        }`}
      >
        <div className={isBooked ? 'text-red-800' : 'text-green-800'}>
          {format(day, 'd')}
        </div>
        {isBooked && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-400" />
        )}
      </div>
    );
  };
  
  const nextMonth = () => {
    setMonth(addMonths(month, 1));
  };
  
  const prevMonth = () => {
    setMonth(addMonths(month, -1));
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Room Availability</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">{format(month, 'MMMM yyyy')}</div>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex justify-end gap-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-xs text-stone-600">Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span className="text-xs text-stone-600">Booked</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-52">
                  This calendar shows room availability for {roomType}. 
                  Dates in red are already booked.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            captionLayout="buttons-only"
            className="p-0"
            classNames={{
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
            }}
            selected={new Date()}
            disabled={(date) => isBefore(date, new Date())}
            modifiers={{
              booked: bookedDatesList,
            }}
            modifiersClassNames={{
              booked: "bg-red-50 text-red-800 hover:bg-red-100",
            }}
          />
        </div>
      </div>
      
      <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-100">
        <div className="flex gap-2 items-start">
          <CalendarIcon className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-sm text-blue-700">Book in advance!</p>
            <p className="text-xs text-blue-600">
              This {roomType} is in high demand. We recommend booking at least 30 days in advance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAvailabilityCalendar;
