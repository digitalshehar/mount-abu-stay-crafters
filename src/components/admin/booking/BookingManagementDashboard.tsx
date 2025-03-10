
import React, { useState } from 'react';
import { useBookings } from '@/hooks/useBookings';
import BookingTable from './BookingTable';
import BookingFilters from './BookingFilters';
import BookingStats from './BookingStats';
import BookingCharts from './BookingCharts';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingDetailsDialog from './BookingDetailsDialog';

const BookingManagementDashboard: React.FC = () => {
  const {
    filteredBookings,
    bookingStats,
    loading,
    updateBookingStatus,
    updatePaymentStatus,
    searchQuery,
    statusFilter,
    paymentFilter,
    dateRange,
    setSearchQuery,
    setStatusFilter,
    setPaymentFilter,
    setDateRange,
    exportBookingsToCSV
  } = useBookings();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
        <p className="text-muted-foreground">
          Manage all hotel bookings, update statuses, and analyze booking data.
        </p>
      </div>

      {/* Stats Cards */}
      <BookingStats bookingStats={bookingStats} />

      {/* Filters */}
      <Card className="p-4">
        <BookingFilters 
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          paymentFilter={paymentFilter}
          dateRange={dateRange}
          setSearchQuery={setSearchQuery}
          setStatusFilter={setStatusFilter}
          setPaymentFilter={setPaymentFilter}
          setDateRange={setDateRange}
          exportBookingsToCSV={exportBookingsToCSV}
        />
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Booking List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <BookingTable 
            bookings={filteredBookings}
            loading={loading}
            onStatusChange={updateBookingStatus}
            onPaymentStatusChange={updatePaymentStatus}
            onViewDetails={handleViewDetails}
          />
        </TabsContent>
        <TabsContent value="analytics">
          <BookingCharts bookingStats={bookingStats} />
        </TabsContent>
      </Tabs>

      {/* Details Dialog */}
      {selectedBooking && (
        <BookingDetailsDialog
          booking={selectedBooking}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          onStatusChange={updateBookingStatus}
          onPaymentStatusChange={updatePaymentStatus}
        />
      )}
    </div>
  );
};

export default BookingManagementDashboard;
