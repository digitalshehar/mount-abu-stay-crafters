
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend 
} from 'recharts';
import { BookingStats } from '@/hooks/useBookings';

// Define colors for the charts
const CHART_COLORS = {
  primary: '#4f46e5',
  secondary: '#10b981',
  accent: '#f59e0b',
  muted: '#6b7280',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6'
};

// Color palette for pie charts
const PIE_COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#84cc16'];

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
  occupancyRate: 0
} }) => {
  // Transform data for charts
  const bookingStatusData = Object.entries(bookingStats.bookingsByStatus || {}).map(([name, value]) => ({
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
              <CardHeader>
                <CardTitle>Booking Status Distribution</CardTitle>
                <CardDescription>
                  Breakdown of bookings by status
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bookingStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill={CHART_COLORS.primary}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {bookingStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => [`${value} bookings`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Room Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Room Type Distribution</CardTitle>
                <CardDescription>
                  Bookings by room type
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bookingsByRoomTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill={CHART_COLORS.secondary}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {bookingsByRoomTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => [`${value} bookings`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          {/* Monthly Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
              <CardDescription>
                Revenue generated over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueByMonthData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" angle={-45} textAnchor="end" height={60} />
                  <YAxis
                    tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                  />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill={CHART_COLORS.primary} name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution" className="space-y-4">
          {/* Top Hotels by Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Top Properties by Bookings</CardTitle>
              <CardDescription>
                Most booked properties
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={bookingsByHotelData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 100,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip />
                  <Bar dataKey="value" fill={CHART_COLORS.accent} name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingCharts;
