
import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Hotel } from "@/components/admin/hotels/types";
import { supabase } from "@/integrations/supabase/client";
import { Booking } from "@/hooks/useBookings";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RoomOccupancy {
  id: string;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  guestName: string;
  bookingId: string;
}

interface OccupancyByDate {
  [date: string]: {
    total: number;
    occupied: number;
    roomTypes: {
      [roomType: string]: {
        total: number;
        occupied: number;
        occupancies: RoomOccupancy[];
      };
    };
  };
}

// Extending the DayProps interface to include the day property
interface CustomDayProps {
  date: Date;
  day?: number; // Making day optional to avoid TypeScript errors
  selected?: boolean;
  disabled?: boolean;
}

interface RoomAvailabilityCalendarProps {
  hotels?: Hotel[];
  selectedHotelId?: number | null;
  onSelectHotel?: (hotelId: number) => void;
}

const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({ 
  hotels = [], 
  selectedHotelId = null,
  onSelectHotel = () => {}
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [occupancyData, setOccupancyData] = useState<OccupancyByDate>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedHotel, setSelectedHotel] = useState<number | null>(selectedHotelId);

  useEffect(() => {
    if (selectedHotel) {
      fetchBookingsForHotel(selectedHotel);
    }
  }, [selectedHotel]);

  useEffect(() => {
    if (selectedHotelId && selectedHotelId !== selectedHotel) {
      setSelectedHotel(selectedHotelId);
    }
  }, [selectedHotelId]);

  const fetchBookingsForHotel = async (hotelId: number) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('hotel_id', hotelId);

      if (error) {
        console.error('Error fetching bookings:', error);
        return;
      }

      const formattedBookings = data as Booking[];
      setBookings(formattedBookings);
      
      // Process bookings into occupancy data
      processBookingsData(formattedBookings);
    } catch (error) {
      console.error('Error in fetchBookingsForHotel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const processBookingsData = (bookingData: Booking[]) => {
    const occupancy: OccupancyByDate = {};
    
    // For each booking, mark the dates as occupied
    bookingData.forEach(booking => {
      const checkIn = new Date(booking.check_in_date);
      const checkOut = new Date(booking.check_out_date);
      
      // Create a room occupancy object
      const roomOccupancy: RoomOccupancy = {
        id: `${booking.id}-${booking.room_type}`,
        roomType: booking.room_type,
        checkIn,
        checkOut,
        guestName: booking.guest_name,
        bookingId: booking.id
      };
      
      // For each day of the booking, update the occupancy
      let currentDate = new Date(checkIn);
      while (currentDate <= checkOut) {
        const dateStr = format(currentDate, 'yyyy-MM-dd');
        
        // Initialize date entry if it doesn't exist
        if (!occupancy[dateStr]) {
          occupancy[dateStr] = {
            total: 0,
            occupied: 0,
            roomTypes: {}
          };
        }
        
        // Initialize room type entry if it doesn't exist
        if (!occupancy[dateStr].roomTypes[booking.room_type]) {
          occupancy[dateStr].roomTypes[booking.room_type] = {
            total: 0,
            occupied: 0,
            occupancies: []
          };
        }
        
        // Update occupancy for this room type
        occupancy[dateStr].roomTypes[booking.room_type].occupied += 1;
        occupancy[dateStr].roomTypes[booking.room_type].occupancies.push(roomOccupancy);
        
        // Update total occupancy for this date
        occupancy[dateStr].occupied += 1;
        
        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    
    // Set room totals (assuming we have this data, otherwise use a placeholder)
    // In a real application, this would come from the hotel's room inventory
    const roomTypes = [...new Set(bookingData.map(b => b.room_type))];
    const datesInOccupancy = Object.keys(occupancy);
    
    datesInOccupancy.forEach(dateStr => {
      // Set default total rooms (this is a placeholder)
      occupancy[dateStr].total = 50; // Total rooms in hotel (placeholder)
      
      roomTypes.forEach(roomType => {
        if (!occupancy[dateStr].roomTypes[roomType]) {
          occupancy[dateStr].roomTypes[roomType] = {
            total: 0,
            occupied: 0,
            occupancies: []
          };
        }
        
        // Set room type totals (placeholders)
        switch (roomType) {
          case 'Standard':
            occupancy[dateStr].roomTypes[roomType].total = 20;
            break;
          case 'Deluxe':
            occupancy[dateStr].roomTypes[roomType].total = 15;
            break;
          case 'Suite':
            occupancy[dateStr].roomTypes[roomType].total = 10;
            break;
          default:
            occupancy[dateStr].roomTypes[roomType].total = 5;
        }
      });
    });
    
    setOccupancyData(occupancy);
  };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const handleHotelChange = (hotelId: string) => {
    const id = parseInt(hotelId, 10);
    setSelectedHotel(id);
    if (onSelectHotel) {
      onSelectHotel(id);
    }
  };

  const renderDayContent = (day: CustomDayProps) => {
    if (!day.date) return null;

    const dateStr = format(day.date, 'yyyy-MM-dd');
    const dateData = occupancyData[dateStr];
    
    if (!dateData) {
      return (
        <div className="h-full flex flex-col items-center">
          <span className="text-sm">{day.date.getDate()}</span>
        </div>
      );
    }
    
    const occupancyPercentage = dateData.total > 0 
      ? Math.round((dateData.occupied / dateData.total) * 100) 
      : 0;
    
    let bgColor = 'bg-green-100';
    if (occupancyPercentage > 70) bgColor = 'bg-yellow-100';
    if (occupancyPercentage > 90) bgColor = 'bg-red-100';
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`h-full flex flex-col items-center p-1 ${bgColor} rounded-sm`}>
              <span className="text-sm font-medium">{day.date.getDate()}</span>
              <Badge variant="outline" className="text-xs mt-1">
                {dateData.occupied}/{dateData.total}
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent className="w-64 p-0">
            <div className="p-2 bg-white rounded-md shadow-lg">
              <h4 className="font-semibold mb-1">{format(day.date, 'PPP')}</h4>
              <p className="text-sm mb-2">
                {occupancyPercentage}% occupancy ({dateData.occupied}/{dateData.total} rooms)
              </p>
              <div className="space-y-1">
                {Object.entries(dateData.roomTypes).map(([roomType, data]) => (
                  <div key={roomType} className="flex justify-between text-xs">
                    <span>{roomType}:</span>
                    <span>{data.occupied}/{data.total} rooms</span>
                  </div>
                ))}
              </div>
              {dateData.occupied > 0 && (
                <div className="mt-2 pt-2 border-t text-xs">
                  <p className="font-medium">Bookings:</p>
                  <ul className="mt-1 space-y-1">
                    {Object.values(dateData.roomTypes).flatMap(roomTypeData => 
                      roomTypeData.occupancies.map(occ => (
                        <li key={occ.id}>
                          {occ.guestName} - {occ.roomType}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Room Availability</CardTitle>
          <div className="flex items-center space-x-2">
            <Select 
              value={selectedHotel?.toString() || ""}
              onValueChange={handleHotelChange}
            >
              <SelectTrigger className="w-[180px]">
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-medium">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <Button variant="outline" size="sm" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="rounded-md border bg-stone-50">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            month={currentMonth}
            className="rounded-md"
            components={{
              Day: ({ date, selected, ...props }) => (
                <div
                  className={`h-12 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 ${
                    isSameDay(date, new Date()) ? 'bg-gray-100' : ''
                  }`}
                  {...props}
                >
                  {renderDayContent({ date, selected })}
                </div>
              )
            }}
          />
        </div>
        
        <div className="flex items-center justify-between mt-4 text-xs text-stone-500">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-100"></div>
            <span>Low occupancy (&lt;70%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-100"></div>
            <span>Medium occupancy (70-90%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-100"></div>
            <span>High occupancy (&gt;90%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomAvailabilityCalendar;
