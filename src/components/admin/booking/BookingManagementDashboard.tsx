
import React, { useState } from 'react';
import { BookingStats as BookingStatsType, Booking, BookingStatusType, BookingType, PaymentStatusType } from '@/hooks/useBookings';
import { ScrollArea } from '@/components/ui/scroll-area';
import BookingHeader from './dashboard/BookingHeader';
import BookingSummaryCards from './dashboard/BookingSummaryCards';
import BookingStats from './BookingStats';
import BookingFilters from './BookingFilters';
import BookingTabs from './dashboard/BookingTabs';

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
  fetchBookings?: () => Promise<void>;
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
  onPaymentStatusChange,
  fetchBookings
}) => {
  const [activeTab, setActiveTab] = useState('list');
  
  return (
    <ScrollArea className="h-[calc(100vh-100px)]">
      <div className="container mx-auto space-y-8 p-4">
        <BookingHeader 
          exportBookingsToCSV={exportBookingsToCSV} 
          fetchBookings={fetchBookings} 
        />
        
        {/* Booking summary counts */}
        <BookingSummaryCards bookingStats={bookingStats} />

        {/* Stats Cards */}
        <BookingStats bookingStats={bookingStats} />

        {/* Filters */}
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

        {/* Main Content Tabs */}
        <BookingTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          bookings={bookings}
          bookingStats={bookingStats}
          loading={loading}
          onStatusChange={onStatusChange}
          onPaymentStatusChange={onPaymentStatusChange}
          onViewDetails={onViewDetails}
          fetchBookings={fetchBookings}
          selectedBooking={selectedBooking}
          detailsOpen={detailsOpen}
          setDetailsOpen={setDetailsOpen}
        />
      </div>
    </ScrollArea>
  );
};

export default BookingManagementDashboard;
