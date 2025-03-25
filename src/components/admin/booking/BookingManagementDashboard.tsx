
import React, { useState } from 'react';
import BookingTable from './BookingTable';
import BookingFilters from './BookingFilters';
import BookingStats from './BookingStats';
import BookingCharts from './BookingCharts';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingDetailsDialog from './dialogs/BookingDetailsDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw, FileDown } from 'lucide-react';
import { Booking, BookingStats as BookingStatsType, BookingStatusType, BookingType, PaymentStatusType } from '@/hooks/useBookings';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    if (fetchBookings) {
      setIsRefreshing(true);
      await fetchBookings();
      setIsRefreshing(false);
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-100px)]">
      <div className="container mx-auto space-y-8 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
            <p className="text-muted-foreground">
              Manage all bookings including hotels, car rentals, bike rentals, and adventures.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh} 
              disabled={isRefreshing}
              className="flex items-center gap-1"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportBookingsToCSV}
              className="flex items-center gap-1"
            >
              <FileDown className="h-4 w-4" />
              <span>Export</span>
            </Button>
            
            <Button 
              variant="default" 
              size="sm"
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Booking</span>
            </Button>
          </div>
        </div>

        {/* Booking summary counts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 border-l-4 border-l-blue-500">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Total Bookings</span>
              <span className="text-2xl font-bold">{bookingStats.totalBookings}</span>
            </div>
          </Card>
          
          <Card className="p-4 border-l-4 border-l-green-500">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Total Revenue</span>
              <span className="text-2xl font-bold">₹{bookingStats.totalRevenue.toLocaleString('en-IN')}</span>
            </div>
          </Card>
          
          <Card className="p-4 border-l-4 border-l-yellow-500">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Avg. Booking Value</span>
              <span className="text-2xl font-bold">₹{Math.round(bookingStats.averageBookingValue).toLocaleString('en-IN')}</span>
            </div>
          </Card>
          
          <Card className="p-4 border-l-4 border-l-purple-500">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Booking Types</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {bookingStats.bookingsByType && Object.entries(bookingStats.bookingsByType).map(([type, count]) => (
                  <Badge key={type} variant="outline" className="text-xs">
                    {type}: {count}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
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
      </div>
    </ScrollArea>
  );
};

export default BookingManagementDashboard;
