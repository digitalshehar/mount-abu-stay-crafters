
import React, { useMemo } from "react";
import { format, subDays, differenceInDays } from "date-fns";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Line, 
  LineChart, 
  Tooltip, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Booking } from "@/hooks/useBookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BookingAnalyticsProps {
  bookings: Booking[];
}

const BookingAnalytics = ({ bookings }: BookingAnalyticsProps) => {
  const today = new Date();
  
  // Calculate booking metrics
  const metrics = useMemo(() => {
    // Prepare data for the past 30 days
    const bookingsByDate: Record<string, { date: string; count: number; revenue: number }> = {};
    const past30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(today, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      return { date, dateStr };
    });
    
    // Initialize the record with the past 30 days
    past30Days.forEach(({ dateStr }) => {
      bookingsByDate[dateStr] = { date: dateStr, count: 0, revenue: 0 };
    });
    
    // Count bookings for each date
    bookings.forEach(booking => {
      const createdDate = format(new Date(booking.created_at), 'yyyy-MM-dd');
      // Only include if within the past 30 days
      if (bookingsByDate[createdDate]) {
        bookingsByDate[createdDate].count += 1;
        bookingsByDate[createdDate].revenue += Number(booking.total_price);
      }
    });
    
    // Convert to array sorted by date
    const bookingTrends = Object.values(bookingsByDate)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(item => ({
        ...item,
        date: format(new Date(item.date), 'MMM dd'), // Format for display
      }));
    
    // Calculate total revenue by hotel
    const revenueByHotel: Record<string, number> = {};
    bookings.forEach(booking => {
      const hotelName = booking.hotel_name || `Hotel ID: ${booking.hotel_id}`;
      revenueByHotel[hotelName] = (revenueByHotel[hotelName] || 0) + Number(booking.total_price);
    });
    
    const hotelRevenue = Object.entries(revenueByHotel)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue);
      
    // Get room type distribution
    const roomTypes: Record<string, number> = {};
    bookings.forEach(booking => {
      roomTypes[booking.room_type] = (roomTypes[booking.room_type] || 0) + 1;
    });
    
    const roomTypeData = Object.entries(roomTypes)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);

    return {
      bookingTrends,
      hotelRevenue,
      roomTypeData,
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((sum, b) => sum + Number(b.total_price), 0),
      avgBookingValue: bookings.length 
        ? bookings.reduce((sum, b) => sum + Number(b.total_price), 0) / bookings.length 
        : 0
    };
  }, [bookings, today]);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalBookings}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{metrics.totalRevenue.toLocaleString('en-IN')}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Booking Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{metrics.avgBookingValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="trends">
        <TabsList className="mb-4">
          <TabsTrigger value="trends">Booking Trends</TabsTrigger>
          <TabsTrigger value="hotels">Hotel Performance</TabsTrigger>
          <TabsTrigger value="rooms">Room Types</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Booking Trends (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metrics.bookingTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="count" 
                      name="Bookings" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="revenue" 
                      name="Revenue (₹)" 
                      stroke="#82ca9d" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hotels">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Hotel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics.hotelRevenue} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue (₹)" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rooms">
          <Card>
            <CardHeader>
              <CardTitle>Bookings by Room Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics.roomTypeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Bookings" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingAnalytics;
