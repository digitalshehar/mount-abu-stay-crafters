
import React from 'react';
import { useBookings } from '@/hooks/useBookings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingStats from './BookingStats';
import BookingFilters from './BookingFilters';
import BookingTable from './BookingTable';
import BookingCharts from './BookingCharts';
import { ArrowUpRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BookingManagementDashboard = () => {
  const {
    bookings,
    filteredBookings,
    loading,
    error,
    bookingStats,
    searchQuery,
    statusFilter,
    paymentFilter,
    dateRange,
    setSearchQuery,
    setStatusFilter,
    setPaymentFilter,
    setDateRange,
    updateBookingStatus,
    updatePaymentStatus,
    exportBookingsToCSV,
  } = useBookings();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Booking Management</h2>
          <p className="text-muted-foreground">
            Manage and monitor all hotel bookings in one place.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportBookingsToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <BookingStats stats={bookingStats} />

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Booking Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <BookingFilters
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              paymentFilter={paymentFilter}
              dateRange={dateRange}
              setSearchQuery={setSearchQuery}
              setStatusFilter={setStatusFilter}
              setPaymentFilter={setPaymentFilter}
              setDateRange={setDateRange}
            />
          </CardContent>
        </Card>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Booking List</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <BookingTable 
              bookings={filteredBookings}
              loading={loading}
              updateBookingStatus={updateBookingStatus}
              updatePaymentStatus={updatePaymentStatus}
            />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <BookingCharts bookings={filteredBookings} stats={bookingStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BookingManagementDashboard;
