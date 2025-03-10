
import React, { useState, useEffect } from 'react';
import { useBookings } from '@/hooks/useBookings';
import BookingsTable from '@/components/admin/BookingsTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Search, Download, RefreshCcw, CalendarIcon, FilterX } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

const BookingsPage = () => {
  const { 
    bookings, 
    loading, 
    fetchBookings,
    updateBookingStatus,
    updatePaymentStatus
  } = useBookings();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  
  // Apply filters when bookings or filter values change
  useEffect(() => {
    let result = [...bookings];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(booking => 
        booking.guest_name.toLowerCase().includes(query) ||
        booking.guest_email.toLowerCase().includes(query) ||
        booking.hotel_name?.toLowerCase().includes(query) ||
        booking.room_type.toLowerCase().includes(query)
      );
    }
    
    // Apply booking status filter
    if (statusFilter !== 'all') {
      result = result.filter(booking => booking.booking_status === statusFilter);
    }
    
    // Apply payment status filter
    if (paymentFilter !== 'all') {
      result = result.filter(booking => booking.payment_status === paymentFilter);
    }
    
    // Apply date range filter
    if (dateRange?.from) {
      const from = new Date(dateRange.from);
      from.setHours(0, 0, 0, 0);
      
      result = result.filter(booking => {
        const checkIn = new Date(booking.check_in_date);
        if (dateRange.to) {
          const to = new Date(dateRange.to);
          to.setHours(23, 59, 59, 999);
          return checkIn >= from && checkIn <= to;
        }
        return checkIn >= from;
      });
    }
    
    setFilteredBookings(result);
  }, [bookings, searchQuery, statusFilter, paymentFilter, dateRange]);

  const handleRefresh = () => {
    fetchBookings();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPaymentFilter('all');
    setDateRange(undefined);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = [
      'Guest Name',
      'Email',
      'Hotel',
      'Room Type',
      'Check In',
      'Check Out',
      'Guests',
      'Total Price',
      'Booking Status',
      'Payment Status',
      'Created At'
    ].join(',');
    
    const rows = filteredBookings.map(booking => [
      booking.guest_name,
      booking.guest_email,
      booking.hotel_name || 'Unknown Hotel',
      booking.room_type,
      booking.check_in_date,
      booking.check_out_date,
      booking.number_of_guests,
      booking.total_price,
      booking.booking_status,
      booking.payment_status,
      booking.created_at
    ].join(','));
    
    const csvContent = [headers, ...rows].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bookings_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-6 max-w-[1600px]">
      <Card className="mb-6 shadow-md">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Booking Management</CardTitle>
              <CardDescription>
                View and manage all bookings
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search by name, email, or hotel..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full md:w-[180px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
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
            
            <div className="w-full md:w-[180px]">
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
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
            
            <div className="w-full md:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !dateRange?.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Date Range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={clearFilters}
                title="Clear all filters"
                disabled={!searchQuery && statusFilter === 'all' && paymentFilter === 'all' && !dateRange?.from}
              >
                <FilterX className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <BookingsTable 
            bookings={filteredBookings}
            loading={loading}
            onUpdateBookingStatus={updateBookingStatus}
            onUpdatePaymentStatus={updatePaymentStatus}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsPage;
