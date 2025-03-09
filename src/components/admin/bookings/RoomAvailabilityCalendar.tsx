
import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval, addMonths, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RoomAvailabilityCalendarProps {
  bookings: any[];
  hotels: any[];
}

const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({ bookings, hotels }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedHotel, setSelectedHotel] = useState<string>("all");
  
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });
  
  // Generate 30-day view from current date
  const days = eachDayOfInterval({
    start: currentDate,
    end: addDays(currentDate, 29),
  });
  
  // Filter bookings for selected hotel
  const filteredBookings = selectedHotel === "all" 
    ? bookings 
    : bookings.filter(booking => booking.hotel_id === selectedHotel);
  
  // Group bookings by room type
  const bookingsByRoomType = filteredBookings.reduce((acc, booking) => {
    if (!acc[booking.room_type]) {
      acc[booking.room_type] = [];
    }
    acc[booking.room_type].push(booking);
    return acc;
  }, {} as Record<string, any[]>);
  
  // Get unique room types
  const roomTypes = Object.keys(bookingsByRoomType);
  
  // Define booking status colors
  const statusColors = {
    confirmed: "bg-green-200 border-green-500 text-green-800",
    pending: "bg-yellow-200 border-yellow-500 text-yellow-800",
    cancelled: "bg-red-200 border-red-500 text-red-800",
    completed: "bg-blue-200 border-blue-500 text-blue-800",
  };
  
  // Check if a date has bookings for a room type
  const getBookingsForDate = (date: Date, roomType: string) => {
    return bookingsByRoomType[roomType]?.filter(booking => 
      isWithinInterval(date, {
        start: new Date(booking.check_in_date),
        end: new Date(booking.check_out_date)
      })
    ) || [];
  };
  
  const hasBookingOnDate = (date: Date, roomType: string) => {
    return getBookingsForDate(date, roomType).length > 0;
  };
  
  // Get the booking status color class
  const getBookingColorClass = (date: Date, roomType: string) => {
    const bookingsOnDate = getBookingsForDate(date, roomType);
    if (bookingsOnDate.length === 0) return "";
    
    // Use the status of the first booking for simplicity
    const status = bookingsOnDate[0].status.toLowerCase();
    return statusColors[status as keyof typeof statusColors] || "bg-gray-200";
  };
  
  const isCheckInDate = (date: Date, roomType: string) => {
    return bookingsByRoomType[roomType]?.some(booking => 
      isSameDay(date, new Date(booking.check_in_date))
    ) || false;
  };
  
  const isCheckOutDate = (date: Date, roomType: string) => {
    return bookingsByRoomType[roomType]?.some(booking => 
      isSameDay(date, new Date(booking.check_out_date))
    ) || false;
  };
  
  const getTooltipContent = (date: Date, roomType: string) => {
    const bookingsOnDate = getBookingsForDate(date, roomType);
    if (bookingsOnDate.length === 0) return "Available";
    
    return (
      <div>
        {bookingsOnDate.map(booking => (
          <div key={booking.id} className="mb-2">
            <div className="font-bold text-sm">{booking.guest_name}</div>
            <div className="text-xs">
              Check-in: {format(new Date(booking.check_in_date), "MMM d, yyyy")}
            </div>
            <div className="text-xs">
              Check-out: {format(new Date(booking.check_out_date), "MMM d, yyyy")}
            </div>
            <div className="text-xs capitalize">Status: {booking.status}</div>
          </div>
        ))}
      </div>
    );
  };
  
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Room Availability Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">
              {format(currentDate, "MMMM yyyy")}
            </div>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>Filter by hotel:</span>
          </div>
          <Select
            value={selectedHotel}
            onValueChange={setSelectedHotel}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Hotels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hotels</SelectItem>
              {hotels.map(hotel => (
                <SelectItem key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3 mt-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-200 border border-green-500 rounded-sm"></div>
            <span>Confirmed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-200 border border-yellow-500 rounded-sm"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-200 border border-red-500 rounded-sm"></div>
            <span>Cancelled</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-200 border border-blue-500 rounded-sm"></div>
            <span>Completed</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-[150px_repeat(30,_minmax(40px,_1fr))]">
              {/* Header row with dates */}
              <div className="font-semibold text-center py-2">Room Type</div>
              {days.map(day => (
                <div
                  key={day.toString()}
                  className={`text-center py-2 text-xs font-medium ${
                    isSameDay(day, new Date()) ? "bg-blue-50" : ""
                  }`}
                >
                  <div>{format(day, "EEE")}</div>
                  <div>{format(day, "MMM d")}</div>
                </div>
              ))}
              
              <Separator className="col-span-31" />
              
              {/* Generate rows for each room type */}
              {roomTypes.length === 0 ? (
                <div className="col-span-31 py-8 text-center text-muted-foreground">
                  No bookings found for the selected hotel. Try selecting a different hotel or time period.
                </div>
              ) : (
                roomTypes.map(roomType => (
                  <React.Fragment key={roomType}>
                    <div className="font-medium py-3 px-2 truncate" title={roomType}>
                      {roomType}
                    </div>
                    
                    {days.map(day => {
                      const hasBooking = hasBookingOnDate(day, roomType);
                      const colorClass = getBookingColorClass(day, roomType);
                      const isCheckin = isCheckInDate(day, roomType);
                      const isCheckout = isCheckOutDate(day, roomType);
                      
                      return (
                        <TooltipProvider key={day.toString()}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div 
                                className={`
                                  h-12 border m-[1px] relative
                                  ${hasBooking ? colorClass : "hover:bg-blue-50 cursor-pointer"} 
                                  ${isCheckin ? "border-l-2 border-l-blue-600" : ""}
                                  ${isCheckout ? "border-r-2 border-r-blue-600" : ""}
                                `}
                              >
                                {hasBooking && (
                                  <div className="absolute top-1 left-1 right-1 text-[10px] text-center overflow-hidden">
                                    {getBookingsForDate(day, roomType).length > 1 
                                      ? `${getBookingsForDate(day, roomType).length} bookings` 
                                      : getBookingsForDate(day, roomType)[0]?.guest_name?.split(' ')[0]}
                                  </div>
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="p-2 max-w-xs">
                              <div className="font-semibold mb-1">
                                {format(day, "EEEE, MMMM d, yyyy")}
                              </div>
                              <div className="font-medium text-sm mb-1">Room: {roomType}</div>
                              {getTooltipContent(day, roomType)}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                    
                    <Separator className="col-span-31" />
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomAvailabilityCalendar;
