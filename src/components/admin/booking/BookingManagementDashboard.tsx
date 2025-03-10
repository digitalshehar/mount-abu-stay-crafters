
import React from 'react';
import BookingTable from './BookingTable';
import BookingFilters from './BookingFilters';
import BookingStats from './BookingStats';
import BookingCharts from './BookingCharts';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingDetailsDialog from './BookingDetailsDialog';
import { Booking, BookingStats as BookingStatsType, BookingStatusType, BookingType, PaymentStatusType } from '@/hooks/useBookings';

export interface BookingManagementDashboardProps {
  bookings: Booking[];
  bookingStats: BookingStatsType;
  loading: boolean;
  searchQuery: string;
  statusFilter: BookingStatusType;
  paymentFilter: PaymentStatusType;
  bookingType?: BookingType;
  dateRange: { from: Date | undefined; to: Date | undefined };
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: BookingStatusType) => void;
  setPaymentFilter: (status: PaymentStatusType) => void;
  setBookingType?: (type: BookingType) => void;
  setDateRange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  exportBookingsToCSV: () => void;
  onViewDetails: (booking: Booking) => void;
  selectedBooking: Booking | null;
  detailsOpen: boolean;
  setDetailsOpen: (open: boolean) => void;
  onStatusChange: (id: string, status: string) => Promise<boolean>;
  onPaymentStatusChange: (id: string, status: string) => Promise<boolean>;
}

const BookingManagementDashboard: React.FC<BookingManagementDashboardProps> = ({
  bookings,
  bookingStats,
  loading,
  searchQuery,
  statusFilter,
  paymentFilter,
  bookingType = 'all',
  dateRange,
  setSearchQuery,
  setStatusFilter,
  setPaymentFilter,
  setBookingType,
  setDateRange,
  exportBookingsToCSV,
  onViewDetails,
  selectedBooking,
  detailsOpen,
  setDetailsOpen,
  onStatusChange,
  onPaymentStatusChange
}) => {
  return (
    <div className="container mx-auto space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
        <p className="text-muted-foreground">
          Manage all bookings including hotels, car rentals, bike rentals, and adventures.
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
          bookingType={bookingType}
          dateRange={dateRange}
          setSearchQuery={setSearchQuery}
          setStatusFilter={setStatusFilter}
          setPaymentFilter={setPaymentFilter}
          setBookingType={setBookingType}
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
            bookings={bookings}
            loading={loading}
            onStatusChange={onStatusChange}
            onPaymentStatusChange={onPaymentStatusChange}
            onViewDetails={onViewDetails}
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
    </div>
  );
};

export default BookingManagementDashboard;
