
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Filter, CalendarIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Hotel } from '@/components/admin/hotels/types';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface CalendarDay {
  date: Date;
  bookings: number;
  availableRooms: number;
  occupancyRate: number;
  events?: string[];
}

interface BookingData {
  id: string;
  hotel_id: number;
  room_type: string;
  check_in_date: string;
  check_out_date: string;
  guest_name: string;
  number_of_guests: number;
}

const RoomAvailabilityCalendar: React.FC = () => {
  const [calendarData, setCalendarData] = useState<Record<string, CalendarDay>>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [monthOffset, setMonthOffset] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { toast } = useToast();

  // Fetch hotels data
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data, error } = await supabase.from('hotels').select('*');
        if (error) throw error;
        
        // Convert the fetched data to match the Hotel type
        const hotelData = data.map(hotel => ({
          ...hotel,
          id: hotel.id,
          pricePerNight: hotel.price_per_night,
          rooms: [],
          reviewCount: hotel.review_count || 0,
          rating: hotel.rating || 0,
          // Set any other required fields to default values
          stars: hotel.stars || 3,
          status: hotel.status || 'active',
          amenities: hotel.amenities || [],
          categories: hotel.categories || [],
          featured: hotel.featured || false
        })) as Hotel[];
        
        setHotels(hotelData);
        
        // Set the first hotel as the default selected hotel
        if (hotelData.length > 0 && !selectedHotel) {
          setSelectedHotel(hotelData[0].id);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
        toast({
          title: 'Error',
          description: 'Failed to load hotels data',
          variant: 'destructive',
        });
      }
    };

    fetchHotels();
  }, []);

  // Fetch bookings for the selected hotel
  useEffect(() => {
    if (selectedHotel) {
      const fetchBookings = async () => {
        try {
          const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('hotel_id', selectedHotel);
          
          if (error) throw error;
          setBookings(data as BookingData[]);
          
          // Generate calendar data
          generateCalendarData(data as BookingData[]);
        } catch (error) {
          console.error('Error fetching bookings:', error);
          toast({
            title: 'Error',
            description: 'Failed to load booking data',
            variant: 'destructive',
          });
        }
      };

      fetchBookings();
    }
  }, [selectedHotel]);

  // Generate calendar data
  const generateCalendarData = (bookingData: BookingData[]) => {
    const calendarMap: Record<string, CalendarDay> = {};
    
    // Get the selected hotel
    const hotel = hotels.find(h => h.id === selectedHotel);
    if (!hotel) return;
    
    // Calculate total number of rooms
    const totalRooms = hotel.rooms.reduce((sum, room) => sum + room.count, 0);
    
    // Get current month and year
    const now = new Date();
    const currentMonthDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
    setCurrentMonth(currentMonthDate);
    
    // Generate dates for the month
    const daysInMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0).getDate();
    
    // Initialize all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), day);
      const dateString = format(date, 'yyyy-MM-dd');
      
      calendarMap[dateString] = {
        date: date,
        bookings: 0,
        availableRooms: totalRooms,
        occupancyRate: 0,
        events: []
      };
    }
    
    // Add booking information
    bookingData.forEach(booking => {
      const checkIn = new Date(booking.check_in_date);
      const checkOut = new Date(booking.check_out_date);
      
      // For each day in the booking
      const currentDate = new Date(checkIn);
      while (currentDate <= checkOut) {
        const dateString = format(currentDate, 'yyyy-MM-dd');
        
        // If this date is in the current month
        if (calendarMap[dateString]) {
          calendarMap[dateString].bookings += 1;
          calendarMap[dateString].availableRooms -= 1;
          calendarMap[dateString].occupancyRate = Math.min(
            100,
            ((totalRooms - calendarMap[dateString].availableRooms) / totalRooms) * 100
          );
          
          // Add event
          if (!calendarMap[dateString].events) {
            calendarMap[dateString].events = [];
          }
          calendarMap[dateString].events?.push(`${booking.guest_name} - ${booking.room_type}`);
        }
        
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    
    setCalendarData(calendarMap);
  };

  // Handle month navigation
  const handlePreviousMonth = () => {
    setMonthOffset(prev => prev - 1);
  };

  const handleNextMonth = () => {
    setMonthOffset(prev => prev + 1);
  };

  // Handle hotel change
  const handleHotelChange = (value: string) => {
    setSelectedHotel(Number(value));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const dayVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } }
  };

  // Custom day renderer for Calendar
  const renderDay = (day: Date, selectedDays: Date[], dayProps: any) => {
    // Format date to use as key in calendarData
    const dateString = format(day, 'yyyy-MM-dd');
    const dayData = calendarData[dateString];
    
    if (!dayData) {
      return <div className="p-2">{day.getDate()}</div>;
    }
    
    // Determine color based on occupancy rate
    let bgColor = 'bg-green-100';
    if (dayData.occupancyRate > 70) {
      bgColor = 'bg-red-100';
    } else if (dayData.occupancyRate > 30) {
      bgColor = 'bg-yellow-100';
    }
    
    return (
      <motion.div
        key={dateString}
        variants={dayVariants}
        initial="hidden"
        animate="visible"
        className={`h-full w-full flex flex-col items-center justify-center ${bgColor} rounded-md p-1`}
      >
        <div className="font-medium">{day.getDate()}</div>
        <div className="text-xs text-stone-600">{dayData.bookings}/{dayData.bookings + dayData.availableRooms}</div>
      </motion.div>
    );
  };

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  // Get details for the selected date
  const selectedDateDetails = selectedDate
    ? calendarData[format(selectedDate, 'yyyy-MM-dd')]
    : null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">Room Availability Calendar</CardTitle>
          <div className="flex space-x-2 items-center">
            <Select value={selectedHotel?.toString()} onValueChange={handleHotelChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Hotel" />
              </SelectTrigger>
              <SelectContent>
                {hotels.map((hotel) => (
                  <SelectItem key={hotel.id} value={hotel.id.toString()}>
                    {hotel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h3 className="font-medium">Filter Options</h3>
                  {/* Filter options here */}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between mb-2">
              <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <h3 className="text-lg font-semibold">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <Button variant="outline" size="sm" onClick={handleNextMonth}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-md p-1">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  month={currentMonth}
                  className="rounded-md border"
                  components={{
                    Day: ({ date, day, ...props }) => renderDay(date, [selectedDate].filter(Boolean) as Date[], props)
                  }}
                />
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md">
                      {selectedDate ? (
                        <>Selected Date: {format(selectedDate, 'MMMM d, yyyy')}</>
                      ) : (
                        <>Select a date to view details</>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDateDetails ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-blue-50 p-3 rounded-md">
                            <p className="text-sm text-blue-600">Bookings</p>
                            <p className="text-xl font-bold">{selectedDateDetails.bookings}</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-md">
                            <p className="text-sm text-green-600">Available</p>
                            <p className="text-xl font-bold">{selectedDateDetails.availableRooms}</p>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-md">
                            <p className="text-sm text-purple-600">Occupancy</p>
                            <p className="text-xl font-bold">{selectedDateDetails.occupancyRate.toFixed(0)}%</p>
                          </div>
                        </div>

                        {selectedDateDetails.events && selectedDateDetails.events.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Bookings on this date:</h4>
                            <ul className="space-y-1">
                              {selectedDateDetails.events.map((event, index) => (
                                <li key={index} className="text-sm bg-stone-50 p-2 rounded">
                                  {event}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40">
                        <CalendarIcon className="h-12 w-12 text-stone-300 mb-2" />
                        <p className="text-stone-500">Select a date to view details</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RoomAvailabilityCalendar;
