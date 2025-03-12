
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Booking } from '@/hooks/useBookings';
import { formatPrice } from '@/utils/bookingUtils';

interface BookingStatsChartProps {
  bookings: Booking[];
  title?: string;
  description?: string;
  height?: number;
}

const BookingStatsChart: React.FC<BookingStatsChartProps> = ({ 
  bookings, 
  title = "Booking Statistics", 
  description = "Monthly revenue breakdown by booking type",
  height = 300
}) => {
  const chartData = useMemo(() => {
    // Group bookings by month
    const monthlyData: Record<string, any> = {};
    
    bookings.forEach(booking => {
      const date = new Date(booking.created_at);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          month: monthYear,
          hotel: 0,
          car: 0,
          bike: 0,
          adventure: 0,
          total: 0
        };
      }
      
      // Add booking price to the respective category
      const type = booking.booking_type || 'hotel';
      monthlyData[monthYear][type] += booking.total_price;
      monthlyData[monthYear].total += booking.total_price;
    });
    
    // Convert to array and sort by date
    return Object.values(monthlyData).sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });
  }, [bookings]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip 
              formatter={(value: number) => formatPrice(value)}
              labelFormatter={(label) => `Revenue for ${label}`}
            />
            <Legend />
            <Bar dataKey="hotel" name="Hotel Bookings" fill="#8884d8" />
            <Bar dataKey="car" name="Car Rentals" fill="#82ca9d" />
            <Bar dataKey="bike" name="Bike Rentals" fill="#ffc658" />
            <Bar dataKey="adventure" name="Adventure Tours" fill="#ff8042" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BookingStatsChart;
