
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingStats } from '@/hooks/useBookings';
import StatusDistributionChart from './charts/StatusDistributionChart';
import MonthlyRevenueChart from './charts/MonthlyRevenueChart';
import PropertiesChart from './charts/PropertiesChart';

export interface BookingChartsProps {
  bookingStats?: BookingStats;
  bookings?: any[];
}

const BookingCharts: React.FC<BookingChartsProps> = ({ bookingStats = {
  totalBookings: 0,
  totalRevenue: 0,
  averageBookingValue: 0,
  bookingsByStatus: {},
  bookingsByHotel: {},
  bookingsByRoomType: {},
  revenueByMonth: {},
  occupancyRate: 0,
  bookingsByType: {}
} }) => {
  // Transform data for charts
  const bookingStatusData = Object.entries(bookingStats.bookingsByStatus || {}).map(([name, value]) => ({
    name,
    value
  }));

  const bookingTypeData = Object.entries(bookingStats.bookingsByType || {}).map(([name, value]) => ({
    name,
    value
  }));

  const revenueByMonthData = Object.entries(bookingStats.revenueByMonth || {}).map(([month, value]) => {
    // Format month for display (YYYY-MM to MMM YYYY)
    const dateObj = new Date(month);
    const formattedMonth = dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return {
      month: formattedMonth,
      revenue: value
    };
  }).sort((a, b) => {
    // Sort by date (assumes month is in format "MMM YYYY")
    return new Date(a.month).getTime() - new Date(b.month).getTime();
  });

  const bookingsByHotelData = Object.entries(bookingStats.bookingsByHotel || {})
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5 hotels

  const bookingsByRoomTypeData = Object.entries(bookingStats.bookingsByRoomType || {})
    .map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Booking Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="distribution">Booking Distribution</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Booking Status Distribution */}
            <Card>
              <StatusDistributionChart 
                data={bookingStatusData}
                title="Booking Status Distribution"
                description="Breakdown of bookings by status"
              />
            </Card>
            
            {/* Booking Type Distribution */}
            <Card>
              <StatusDistributionChart 
                data={bookingTypeData}
                title="Booking Type Distribution"
                description="Bookings by type (hotel, car, etc.)"
              />
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          {/* Monthly Revenue Trend */}
          <Card>
            <MonthlyRevenueChart data={revenueByMonthData} />
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution" className="space-y-4">
          {/* Top Hotels by Bookings */}
          <Card>
            <PropertiesChart data={bookingsByHotelData} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingCharts;
