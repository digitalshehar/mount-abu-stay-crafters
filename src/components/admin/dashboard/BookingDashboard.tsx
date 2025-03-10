
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookings } from '@/hooks/useBookings';
import BookingStatCards from './BookingStatCards';
import BookingCharts from './BookingCharts';
import BookingTable from './BookingTable';
import BookingFilters from './BookingFilters';

const BookingDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { 
    bookings, 
    filteredBookings, 
    bookingStats, 
    loading, 
    exportBookingsToCSV,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    dateRange,
    setDateRange,
    updateBookingStatus,
    updatePaymentStatus
  } = useBookings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Booking Dashboard</h2>
        <button 
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          onClick={exportBookingsToCSV}
        >
          Export Bookings
        </button>
      </div>

      <BookingFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <BookingStatCards stats={bookingStats} />
          <BookingCharts stats={bookingStats} />
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Booking Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <BookingCharts stats={bookingStats} detailed />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings">
          <BookingTable 
            bookings={filteredBookings}
            isLoading={loading}
            updateBookingStatus={updateBookingStatus}
            updatePaymentStatus={updatePaymentStatus}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingDashboard;
