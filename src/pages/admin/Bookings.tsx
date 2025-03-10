
import React, { useState } from 'react';
import { useBookings } from '@/hooks/useBookings';
import BookingsTable from '@/components/admin/BookingsTable';
import BookingAnalytics from '@/components/admin/BookingAnalytics';
import RoomAvailabilityCalendar from '@/components/admin/RoomAvailabilityCalendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Search, Download, RefreshCcw, BarChart3, Calendar, ListFilter
} from 'lucide-react';
import { motion } from 'framer-motion';

const BookingsPage = () => {
  const { 
    bookings, 
    loading, 
    fetchBookings,
    updateBookingStatus,
    updatePaymentStatus,
    filteredBookings,
    bookingStats,
    exportBookingsToCSV,
    setSearchQuery,
    setStatusFilter,
    setPaymentFilter,
    setDateRange,
    searchQuery,
    statusFilter,
    paymentFilter,
    dateRange
  } = useBookings();
  
  const [activeTab, setActiveTab] = useState("bookings");
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  const handleRefresh = () => {
    fetchBookings();
  };
  
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle>Bookings Management</CardTitle>
                <CardDescription>
                  View and manage all bookings
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="bookings">
                      <ListFilter className="h-4 w-4 mr-2" />
                      Bookings
                    </TabsTrigger>
                    <TabsTrigger value="analytics">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger value="availability">
                      <Calendar className="h-4 w-4 mr-2" />
                      Availability
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" onClick={exportBookingsToCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TabsContent value="bookings" className="mt-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search by name, email, or hotel..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                  className="ml-2"
                >
                  <ListFilter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              
              {isFilterExpanded && (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label className="text-sm font-medium mb-1 block">Booking Status</label>
                    <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Booking Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Payment Status</label>
                    <Select value={paymentFilter} onValueChange={(value) => setPaymentFilter(value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Payment Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Payments</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Date Range</label>
                    <DatePickerWithRange 
                      date={dateRange}
                      setDate={setDateRange}
                    />
                  </div>
                </motion.div>
              )}

              <BookingsTable 
                bookings={filteredBookings}
                loading={loading}
                onUpdateBookingStatus={updateBookingStatus}
                onUpdatePaymentStatus={updatePaymentStatus}
              />
              
              <div className="text-sm text-muted-foreground mt-4">
                Showing {filteredBookings.length} of {bookings.length} bookings
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0">
              <BookingAnalytics stats={bookingStats} />
            </TabsContent>
            
            <TabsContent value="availability" className="mt-0">
              <RoomAvailabilityCalendar />
            </TabsContent>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BookingsPage;
