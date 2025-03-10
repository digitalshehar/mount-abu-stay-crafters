
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingStats } from '@/hooks/useBookings';
import { CreditCard, Calendar, Users, BarChart3 } from 'lucide-react';

interface BookingStatCardsProps {
  stats: BookingStats;
}

const BookingStatCards = ({ stats }: BookingStatCardsProps) => {
  // Calculate month-over-month change (placeholder for demonstration)
  const revenueChange = "+12.5%";
  const bookingsChange = "+8.2%";
  const guestChange = "+5.4%";
  const roomChange = "-2.3%";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
          <p className="text-xs text-muted-foreground">{revenueChange} from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBookings}</div>
          <p className="text-xs text-muted-foreground">{bookingsChange} from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Booking Value</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{stats.averageBookingValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          <p className="text-xs text-muted-foreground">{guestChange} from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.occupancyRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">{roomChange} from last month</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStatCards;
