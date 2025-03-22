
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookingStats } from '@/hooks/useBookings';

interface BookingSummaryCardsProps {
  bookingStats: BookingStats;
}

const BookingSummaryCards: React.FC<BookingSummaryCardsProps> = ({ bookingStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 border-l-4 border-l-blue-500">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Total Bookings</span>
          <span className="text-2xl font-bold">{bookingStats.totalBookings}</span>
        </div>
      </Card>
      
      <Card className="p-4 border-l-4 border-l-green-500">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Total Revenue</span>
          <span className="text-2xl font-bold">₹{bookingStats.totalRevenue.toLocaleString('en-IN')}</span>
        </div>
      </Card>
      
      <Card className="p-4 border-l-4 border-l-yellow-500">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Avg. Booking Value</span>
          <span className="text-2xl font-bold">₹{Math.round(bookingStats.averageBookingValue).toLocaleString('en-IN')}</span>
        </div>
      </Card>
      
      <Card className="p-4 border-l-4 border-l-purple-500">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Booking Types</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {bookingStats.bookingsByType && Object.entries(bookingStats.bookingsByType).map(([type, count]) => (
              <Badge key={type} variant="outline" className="text-xs">
                {type}: {count}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookingSummaryCards;
