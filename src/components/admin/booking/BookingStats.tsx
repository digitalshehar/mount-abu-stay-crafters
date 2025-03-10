
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingStats as BookingStatsType } from '@/hooks/useBookings';
import { Users, Calendar, IndianRupee, Percent } from 'lucide-react';

export interface BookingStatsProps {
  bookingStats: BookingStatsType;
}

const BookingStats: React.FC<BookingStatsProps> = ({ bookingStats }) => {
  const { totalBookings, totalRevenue, averageBookingValue, occupancyRate } = bookingStats;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBookings}</div>
          <p className="text-xs text-muted-foreground">All-time bookings</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <p className="text-xs text-muted-foreground">From all bookings</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Value</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{averageBookingValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          <p className="text-xs text-muted-foreground">Per booking</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{occupancyRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">Current period</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStats;
