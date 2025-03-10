
import React, { useState } from "react";
import BookingDashboardHeader from "@/components/admin/bookings/BookingDashboardHeader";
import BookingAnalytics from "@/components/admin/bookings/BookingAnalytics";
import BookingTable from "@/components/admin/bookings/BookingTable";
import BookingFilterPanel from "@/components/admin/bookings/BookingFilterPanel";
import { useBookings } from "@/hooks/useBookings";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const BookingManagement = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    status: [],
    dateRange: null,
    hotelId: null,
    paymentStatus: []
  });
  
  const { 
    bookings, 
    loading, 
    fetchBookings, 
    updateBookingStatus, 
    updatePaymentStatus 
  } = useBookings();

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    const success = await updateBookingStatus(bookingId, status);
    if (success) {
      toast({
        title: "Status Updated",
        description: `Booking status has been changed to ${status}`,
      });
    }
  };

  const handleUpdatePaymentStatus = async (bookingId: string, status: string) => {
    const success = await updatePaymentStatus(bookingId, status);
    if (success) {
      toast({
        title: "Payment Status Updated",
        description: `Payment status has been changed to ${status}`,
      });
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilterOptions(newFilters);
    // Apply filters to data
  };

  const filteredBookings = bookings; // In a real implementation, this would be filtered

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6">
      <BookingDashboardHeader 
        onFilterOpen={() => setFilterOpen(true)} 
        bookingsCount={bookings.length}
        onRefresh={fetchBookings}
      />
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card className="p-6">
          <BookingAnalytics bookings={bookings} />
        </Card>
      </div>
      
      <BookingTable 
        bookings={filteredBookings} 
        loading={loading}
        onUpdateStatus={handleUpdateStatus}
        onUpdatePaymentStatus={handleUpdatePaymentStatus} 
      />
      
      <BookingFilterPanel 
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        currentFilters={filterOptions}
        onApplyFilters={handleFilterChange} 
      />
    </div>
  );
};

export default BookingManagement;
