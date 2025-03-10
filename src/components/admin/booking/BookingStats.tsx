
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBookingStats } from '@/hooks/bookingHooks/useBookingStats';
import type { BookingStats as BookingStatsType } from '@/hooks/useBookings';
import { Users, CreditCard, Calendar, BarChart2 } from 'lucide-react';

interface BookingStatsProps {
  bookingStats: BookingStatsType;
}

const BookingStats: React.FC<BookingStatsProps> = ({ bookingStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{bookingStats.totalBookings}</div>
          <p className="text-xs text-muted-foreground">
            All time booking count
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${bookingStats.totalRevenue.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Total booking value
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Booking</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${bookingStats.averageBookingValue.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Average per booking
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {bookingStats.occupancyRate.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Current occupancy
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStats;
