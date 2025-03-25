
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingTable from '../BookingTable';
import BookingCharts from '../BookingCharts';
import BookingDetailsDialog from '../dialogs/BookingDetailsDialog';
import { Booking, BookingStats } from '@/hooks/useBookings';

interface BookingTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookings: Booking[];
  bookingStats: BookingStats;
  loading: boolean;
  onStatusChange: (id: string, status: string) => Promise<boolean>;
  onPaymentStatusChange: (id: string, status: string) => Promise<boolean>;
  onViewDetails: (booking: Booking) => void;
  fetchBookings?: () => Promise<void>;
  selectedBooking: Booking | null;
  detailsOpen: boolean;
  setDetailsOpen: (open: boolean) => void;
}

const BookingTabs: React.FC<BookingTabsProps> = ({
  activeTab,
  setActiveTab,
  bookings,
  bookingStats,
  loading,
  onStatusChange,
  onPaymentStatusChange,
  onViewDetails,
  fetchBookings,
  selectedBooking,
  detailsOpen,
  setDetailsOpen
}) => {
  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="list">Booking List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <BookingTable 
            bookings={bookings}
            loading={loading}
            onStatusChange={onStatusChange}
            onPaymentStatusChange={onPaymentStatusChange}
            onViewDetails={onViewDetails}
            fetchBookings={fetchBookings}
            onDeleteClick={(id) => console.log(`Delete booking: ${id}`)}
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
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onStatusChange={onStatusChange}
          onPaymentStatusChange={onPaymentStatusChange}
        />
      )}
    </>
  );
};

export default BookingTabs;
