
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Booking, BookingStats } from '@/hooks/useBookings';
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, Legend, CartesianGrid, Sector } from 'recharts';

interface BookingChartsProps {
  bookings: Booking[];
  stats: BookingStats;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const BookingCharts: React.FC<BookingChartsProps> = ({ bookings, stats }) => {
  // Transform data for status pie chart
  const statusData = Object.entries(stats.bookingsByStatus).map(([name, value]) => ({
    name,
    value,
  }));

  // Transform data for hotel bar chart
  const hotelData = Object.entries(stats.bookingsByHotel)
    .map(([name, value]) => ({
      name: name.length > 15 ? name.substring(0, 15) + '...' : name,
      value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Transform data for room type distribution
  const roomTypeData = Object.entries(stats.bookingsByRoomType).map(([name, value]) => ({
    name,
    value,
  }));

  // Transform data for monthly revenue
  const revenueData = Object.entries(stats.revenueByMonth)
    .map(([month, revenue]) => {
      const date = new Date(month);
      return {
        name: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        revenue,
      };
    })
    .sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Status Distribution</CardTitle>
            <CardDescription>Distribution of bookings by status</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} Bookings`, 'Count']}
                    labelFormatter={(name) => `Status: ${name}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Hotels</CardTitle>
            <CardDescription>Top 5 hotels by booking count</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {hotelData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hotelData} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366F1" name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Room Type Distribution</CardTitle>
            <CardDescription>Bookings by room type</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {roomTypeData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roomTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {roomTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} Bookings`, 'Count']}
                    labelFormatter={(name) => `Room Type: ${name}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue trends over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `₹${value >= 1000 ? `${(value/1000).toFixed(0)}K` : value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#6366F1" 
                    activeDot={{ r: 8 }} 
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingCharts;
