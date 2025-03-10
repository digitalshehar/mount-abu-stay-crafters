
import React from 'react';
import { useBookings } from '@/hooks/useBookings';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import BookingManagementDashboard from '@/components/admin/booking/BookingManagementDashboard';

const AdminBookings = () => {
  const {
    bookings,
    filteredBookings,
    loading,
    bookingStats,
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
  
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Bookings Management | Admin Dashboard</title>
      </Helmet>
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Booking Management</h1>
      </div>
      
      <BookingManagementDashboard 
        bookings={filteredBookings}
        bookingStats={bookingStats}
        loading={loading}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        paymentFilter={paymentFilter}
        dateRange={dateRange}
        setSearchQuery={setSearchQuery}
        setStatusFilter={setStatusFilter}
        setPaymentFilter={setPaymentFilter}
        setDateRange={setDateRange}
        exportBookingsToCSV={exportBookingsToCSV}
        onViewDetails={handleViewDetails}
        selectedBooking={selectedBooking}
        detailsOpen={detailsOpen}
        setDetailsOpen={setDetailsOpen}
        onStatusChange={updateBookingStatus}
        onPaymentStatusChange={updatePaymentStatus}
      />
    </div>
  );
};

export default AdminBookings;
