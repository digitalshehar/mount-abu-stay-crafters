
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingStats } from '@/hooks/useBookings';
import { Calendar, CreditCard, Users, Hotel, TrendingUp } from 'lucide-react';

interface BookingStatsProps {
  stats: BookingStats;
}

const BookingStats: React.FC<BookingStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Hotel className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBookings}</div>
          <p className="text-xs text-muted-foreground">
            {Object.keys(stats.bookingsByStatus).length > 0 && 
              `${stats.bookingsByStatus.confirmed || 0} confirmed`}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
          <p className="text-xs text-muted-foreground">
            Avg. ₹{stats.averageBookingValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })} per booking
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.occupancyRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            Based on confirmed bookings
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold truncate" title={Object.keys(stats.bookingsByHotel).reduce((a, b) => stats.bookingsByHotel[a] > stats.bookingsByHotel[b] ? a : b, '')}>
            {Object.keys(stats.bookingsByHotel).length > 0 
              ? Object.keys(stats.bookingsByHotel).reduce((a, b) => stats.bookingsByHotel[a] > stats.bookingsByHotel[b] ? a : b, '').substring(0, 15)
              : 'None'}
          </div>
          <p className="text-xs text-muted-foreground">Most booked hotel</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStats;
