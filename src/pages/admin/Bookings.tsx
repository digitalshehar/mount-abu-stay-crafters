
import React, { useState } from 'react';
import { useBookings } from '@/hooks/useBookings';
import { HelmetProvider, Helmet } from 'react-helmet-async';
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
      <HelmetProvider>
        <Helmet>
          <title>Bookings Management | Admin Dashboard</title>
        </Helmet>
      </HelmetProvider>
      
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
