
import React, { useState } from "react";
import BookingDashboardHeader from "@/components/admin/bookings/BookingDashboardHeader";
import BookingAnalytics from "@/components/admin/bookings/BookingAnalytics";
import BookingTable from "@/components/admin/bookings/BookingTable";
import BookingFilterPanel from "@/components/admin/bookings/BookingFilterPanel";
import RoomAvailabilityCalendar from "@/components/admin/bookings/RoomAvailabilityCalendar";
import { useBookings } from "@/hooks/useBookings";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BookingManagement = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    status: [],
    dateRange: null,
    hotelId: null,
    paymentStatus: []
  });
  
  const [activeTab, setActiveTab] = useState<"list" | "calendar">("list");
  
  const { 
    bookings, 
    loading, 
    fetchBookings, 
    updateBookingStatus, 
    updatePaymentStatus 
  } = useBookings();

  // Fetch hotels for the calendar view
  const { data: hotels = [] } = useQuery({
    queryKey: ["hotels"],
    queryFn: async () => {
      const { data, error } = await supabase.from("hotels").select("id,name");
      if (error) throw error;
      return data || [];
    }
  });

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    const success = await updateBookingStatus(bookingId, status);
    if (success) {
      toast.success(`Booking status has been changed to ${status}`);
    }
  };

  const handleUpdatePaymentStatus = async (bookingId: string, status: string) => {
    const success = await updatePaymentStatus(bookingId, status);
    if (success) {
      toast.success(`Payment status has been changed to ${status}`);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilterOptions(newFilters);
    // Apply filters to data
  };

  const filteredBookings = bookings; // In a real implementation, this would be filtered

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "list" | "calendar")}>
        <BookingDashboardHeader 
          onFilterOpen={() => setFilterOpen(true)} 
          bookingsCount={bookings.length}
          onRefresh={fetchBookings}
          onCalendarView={() => setActiveTab(activeTab === "list" ? "calendar" : "list")}
          bookings={bookings}
        />
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          <Card className="p-6">
            <BookingAnalytics bookings={bookings} />
          </Card>
        </div>
        
        <TabsList className="mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-0">
          <BookingTable 
            bookings={filteredBookings} 
            loading={loading}
            onUpdateStatus={handleUpdateStatus}
            onUpdatePaymentStatus={handleUpdatePaymentStatus} 
          />
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-0">
          <RoomAvailabilityCalendar 
            bookings={bookings}
            hotels={hotels}
          />
        </TabsContent>
      </Tabs>
      
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
