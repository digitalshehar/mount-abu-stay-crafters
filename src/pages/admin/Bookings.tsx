
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBookings, BookingStatusType, PaymentStatusType } from '@/hooks/useBookings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Download, 
  Search, 
  Filter, 
  CalendarIcon, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock 
} from 'lucide-react';
import { format } from 'date-fns';
import BookingAnalytics from '@/components/admin/BookingAnalytics';
import RoomAvailabilityCalendar from '@/components/admin/RoomAvailabilityCalendar';
import type { DateRange } from 'react-day-picker';

const Bookings = () => {
  const { 
    bookings, 
    filteredBookings, 
    bookingStats, 
    loading, 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter, 
    paymentFilter, 
    setPaymentFilter,
    dateRange,
    setDateRange,
    exportBookingsToCSV
  } = useBookings();
  
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Animation variants
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  
  // Function to get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="w-3 h-3 mr-1" /> Confirmed
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <XCircle className="w-3 h-3 mr-1" /> Cancelled
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200">
            <AlertCircle className="w-3 h-3 mr-1" /> {status}
          </Badge>
        );
    }
  };
  
  // Function to get payment badge styling
  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            Pending
          </Badge>
        );
      case 'refunded':
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            Refunded
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Failed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200">
            {status}
          </Badge>
        );
    }
  };
  
  // Handler for date range changes
  const handleDateRangeChange = (range: DateRange | undefined) => {
    // Convert the DateRange to the format expected by useBookings
    const newRange = range ? {
      from: range.from ? range.from : undefined,
      to: range.to ? range.to : undefined
    } : { from: undefined, to: undefined };
    
    setDateRange(newRange);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="bookings" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">Bookings Management</CardTitle>
              <Button onClick={exportBookingsToCSV}>
                <Download className="w-4 h-4 mr-2" /> Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500" />
                    <Input
                      placeholder="Search bookings..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {/* Filters */}
                  <div className="flex gap-2">
                    <Select 
                      value={statusFilter} 
                      onValueChange={(value) => setStatusFilter(value as BookingStatusType)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={paymentFilter} 
                      onValueChange={(value) => setPaymentFilter(value as PaymentStatusType)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Payment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Payments</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="h-10 border-dashed">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                              </>
                            ) : (
                              format(dateRange.from, "LLL dd")
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
                          defaultMonth={dateRange.from}
                          selected={{ 
                            from: dateRange.from, 
                            to: dateRange.to
                          }}
                          onSelect={handleDateRangeChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                {/* Bookings table */}
                <motion.div 
                  variants={tableVariants}
                  initial="hidden"
                  animate="visible"
                  className="rounded-md border"
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Booking ID</TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead>Hotel</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                          <TableRow key={index}>
                            <TableCell colSpan={9} className="h-16">
                              <div className="w-full h-4 bg-slate-100 rounded animate-pulse"></div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : filteredBookings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <div className="rounded-full w-12 h-12 bg-slate-100 flex items-center justify-center mb-2">
                                <Search className="h-6 w-6 text-slate-400" />
                              </div>
                              <p className="text-slate-500">No bookings found</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBookings.map((booking, index) => (
                          <motion.tr key={booking.id} variants={rowVariants}>
                            <TableCell className="font-medium">{booking.id.substring(0, 8)}...</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{booking.guest_name}</div>
                                <div className="text-xs text-slate-500">{booking.guest_email}</div>
                              </div>
                            </TableCell>
                            <TableCell>{booking.hotel_name || `Hotel #${booking.hotel_id}`}</TableCell>
                            <TableCell>{new Date(booking.check_in_date).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(booking.check_out_date).toLocaleDateString()}</TableCell>
                            <TableCell>{getStatusBadge(booking.booking_status)}</TableCell>
                            <TableCell>{getPaymentBadge(booking.payment_status)}</TableCell>
                            <TableCell className="text-right font-medium">
                              ₹{booking.total_price.toLocaleString('en-IN')}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </motion.tr>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <BookingAnalytics bookingStats={bookingStats} />
        </TabsContent>
        
        <TabsContent value="calendar">
          <RoomAvailabilityCalendar />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookings;
