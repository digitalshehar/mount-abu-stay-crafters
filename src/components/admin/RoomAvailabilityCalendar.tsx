
import React, { useEffect, useState } from 'react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Booking } from '@/hooks/useBookings';
import { Skeleton } from '@/components/ui/skeleton';
import { Hotel } from '@/components/admin/hotels/types';
import { motion } from 'framer-motion';

interface RoomAvailabilityCalendarProps {
  className?: string;
}

interface RoomAvailability {
  date: Date;
  rooms: {
    [roomType: string]: {
      booked: number;
      total: number;
      bookingIds: string[];
    };
  };
}

const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({ className }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotelId, setSelectedHotelId] = useState<string>('');
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availabilityData, setAvailabilityData] = useState<RoomAvailability[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch hotels
  useEffect(() => {
    const fetchHotels = async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('status', 'active');
      
      if (error) {
        console.error('Error fetching hotels:', error);
        return;
      }
      
      setHotels(data || []);
      if (data && data.length > 0) {
        setSelectedHotelId(data[0].id.toString());
      }
    };
    
    fetchHotels();
  }, []);

  // Fetch room types and bookings when hotel is selected
  useEffect(() => {
    if (!selectedHotelId) return;
    
    const fetchRoomData = async () => {
      setLoading(true);
      
      // Fetch rooms for the selected hotel
      const { data: roomsData, error: roomsError } = await supabase
        .from('rooms')
        .select('*')
        .eq('hotel_id', selectedHotelId);
      
      if (roomsError) {
        console.error('Error fetching rooms:', roomsError);
        setLoading(false);
        return;
      }
      
      // Extract unique room types
      const types = roomsData?.map(room => room.type) || [];
      const uniqueTypes = [...new Set(types)];
      setRoomTypes(uniqueTypes);
      
      // Fetch bookings for the selected hotel
      const startDate = format(startOfMonth(date), 'yyyy-MM-dd');
      const endDate = format(endOfMonth(date), 'yyyy-MM-dd');
      
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('hotel_id', selectedHotelId)
        .or(`check_in_date.gte.${startDate},check_out_date.gte.${startDate}`)
        .lt('check_in_date', endDate);
      
      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        setLoading(false);
        return;
      }
      
      setBookings(bookingsData || []);
      
      // Calculate availability for each day of the month
      calculateAvailability(roomsData || [], bookingsData || []);
      setLoading(false);
    };
    
    fetchRoomData();
  }, [selectedHotelId, date]);
  
  const calculateAvailability = (rooms: any[], bookings: Booking[]) => {
    // Get all days in the current month
    const monthDays = eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date)
    });
    
    // Create a room inventory by type
    const roomInventory: { [key: string]: number } = {};
    rooms.forEach(room => {
      roomInventory[room.type] = (roomInventory[room.type] || 0) + (room.count || 0);
    });
    
    // Initialize availability data
    const availability: RoomAvailability[] = monthDays.map(day => ({
      date: day,
      rooms: Object.keys(roomInventory).reduce((acc, roomType) => {
        acc[roomType] = { booked: 0, total: roomInventory[roomType], bookingIds: [] };
        return acc;
      }, {} as RoomAvailability['rooms'])
    }));
    
    // Calculate bookings for each day
    bookings.forEach(booking => {
      const checkIn = parseISO(booking.check_in_date);
      const checkOut = parseISO(booking.check_out_date);
      
      // For each day between check-in and check-out
      const stayDays = eachDayOfInterval({ start: checkIn, end: addDays(checkOut, -1) });
      
      stayDays.forEach(stayDay => {
        // Find the day in our availability array
        const dayData = availability.find(d => isSameDay(d.date, stayDay));
        if (dayData && dayData.rooms[booking.room_type]) {
          dayData.rooms[booking.room_type].booked += 1;
          dayData.rooms[booking.room_type].bookingIds.push(booking.id);
        }
      });
    });
    
    setAvailabilityData(availability);
  };
  
  const renderDay = (day: Date) => {
    const dayData = availabilityData.find(d => isSameDay(d.date, day));
    
    if (!dayData) return null;
    
    // Find the most booked room type for this day (for color coding)
    let maxOccupancyRate = 0;
    Object.values(dayData.rooms).forEach(room => {
      const rate = room.total > 0 ? room.booked / room.total : 0;
      if (rate > maxOccupancyRate) maxOccupancyRate = rate;
    });
    
    // Determine color based on occupancy rate
    let bgColor = 'bg-green-100';
    if (maxOccupancyRate >= 0.8) bgColor = 'bg-red-100';
    else if (maxOccupancyRate >= 0.5) bgColor = 'bg-yellow-100';
    
    return (
      <div className={`h-full w-full p-1 ${bgColor} rounded-md`}>
        <div className="text-center">{format(day, 'd')}</div>
      </div>
    );
  };
  
  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Room Availability Calendar</CardTitle>
          <CardDescription>View and manage room availability</CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="w-full sm:w-1/2">
              <label className="text-sm font-medium mb-1 block">Select Hotel</label>
              <Select 
                value={selectedHotelId.toString()} 
                onValueChange={setSelectedHotelId}
                disabled={loading || hotels.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a hotel" />
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
          
          <div className="flex items-center mt-4 gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded bg-green-100 mr-2"></div>
              <span className="text-sm">Low Occupancy (&lt;50%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded bg-yellow-100 mr-2"></div>
              <span className="text-sm">Medium Occupancy (50-80%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded bg-red-100 mr-2"></div>
              <span className="text-sm">High Occupancy (&gt;80%)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-[400px] w-full" />
            </div>
          ) : (
            <Calendar
              mode="single"
              selected={date}
              onSelect={(day) => day && setDate(day)}
              month={date}
              onMonthChange={setDate}
              className="rounded-md border"
              components={{
                Day: ({ day, ...props }) => (
                  <div {...props}>
                    {renderDay(day)}
                  </div>
                ),
              }}
            />
          )}
          
          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-lg">Room Availability For {format(date, 'MMMM d, yyyy')}</h3>
            
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <div className="space-y-2">
                {roomTypes.map(roomType => {
                  const dayData = availabilityData.find(d => isSameDay(d.date, date));
                  if (!dayData) return null;
                  
                  const roomData = dayData.rooms[roomType];
                  if (!roomData) return null;
                  
                  const availableRooms = roomData.total - roomData.booked;
                  const occupancyRate = roomData.total > 0 ? (roomData.booked / roomData.total) * 100 : 0;
                  
                  let statusColor = 'bg-green-500';
                  if (occupancyRate >= 80) statusColor = 'bg-red-500';
                  else if (occupancyRate >= 50) statusColor = 'bg-yellow-500';
                  
                  return (
                    <div key={roomType} className="flex items-center justify-between border p-3 rounded-md">
                      <div>
                        <h4 className="font-medium">{roomType}</h4>
                        <div className="text-sm text-gray-500">
                          {availableRooms} of {roomData.total} available
                        </div>
                      </div>
                      <Badge className={statusColor}>
                        {occupancyRate.toFixed(0)}% Occupied
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RoomAvailabilityCalendar;
