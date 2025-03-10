
import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  CreditCard, 
  Filter, 
  RefreshCw, 
  FilePlus, 
  PlusCircle, 
  Search,
  Menu,
  DownloadCloud
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  useBookings, 
  BookingStatusType, 
  PaymentStatusType 
} from "@/hooks/useBookings";
import { DateRange } from "react-day-picker";
import { format, subDays } from "date-fns";
import BookingsTable from "@/components/admin/BookingsTable";
import BookingAnalytics from "@/components/admin/BookingAnalytics";
import RoomAvailabilityCalendar from "@/components/admin/RoomAvailabilityCalendar";
import { useHotels } from "@/hooks/useHotels";
import { DateRangePicker } from "@/components/ui/date-range-picker";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { 
    bookings, 
    filteredBookings, 
    loading, 
    error, 
    fetchBookings,
    setSearchQuery,
    setStatusFilter,
    setPaymentFilter,
    setHotelFilter,
    setDateRange,
    searchQuery,
    statusFilter,
    paymentFilter,
    dateRange,
    updateBookingStatus,
    updatePaymentStatus,
    bookingStats,
    exportBookingsToCSV
  } = useBookings();
  
  const { hotels, loading: hotelsLoading } = useHotels();
  
  // Default date range for last 30 days
  useEffect(() => {
    if (!dateRange.from) {
      setDateRange({
        from: subDays(new Date(), 30),
        to: new Date()
      });
    }
  }, []);
  
  const handleRefresh = () => {
    fetchBookings();
  };
  
  const handleExport = () => {
    exportBookingsToCSV();
  };
  
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPaymentFilter('all');
    setHotelFilter(null);
    setDateRange({
      from: subDays(new Date(), 30),
      to: new Date()
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Booking Management</h1>
          <p className="text-muted-foreground">Manage hotel bookings and view availability</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={handleExport} variant="outline" size="sm">
            <DownloadCloud className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Booking
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <CreditCard className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <Calendar className="mr-2 h-4 w-4" />
            Bookings
          </TabsTrigger>
          <TabsTrigger value="availability">
            <Calendar className="mr-2 h-4 w-4" />
            Availability
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bookingStats.totalBookings}</div>
                <p className="text-xs text-muted-foreground">
                  All time bookings in system
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{bookingStats.totalRevenue.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-muted-foreground">
                  From all bookings
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Booking Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{bookingStats.averageBookingValue.toLocaleString('en-IN', { 
                    maximumFractionDigits: 0 
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Per booking
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Confirmed Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {bookingStats.bookingsByStatus.confirmed || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Active confirmed bookings
                </p>
              </CardContent>
            </Card>
          </div>
          
          <BookingAnalytics bookingStats={bookingStats} />
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest 5 bookings in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <BookingsTable 
                bookings={bookings.slice(0, 5)}
                loading={loading}
                error={error}
                updateBookingStatus={updateBookingStatus}
                updatePaymentStatus={updatePaymentStatus}
                isCompact={true}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>All Bookings</CardTitle>
                  <CardDescription>
                    {filteredBookings.length} bookings found
                  </CardDescription>
                </div>
                <div className="flex md:items-center gap-2 flex-col md:flex-row">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="md:hidden"
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search bookings..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block md:w-64 space-y-4`}>
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Date Range</h3>
                    <DateRangePicker
                      value={dateRange}
                      onChange={setDateRange}
                    />
                  </div>
                  
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Booking Status</h3>
                    <Select 
                      value={statusFilter} 
                      onValueChange={(value: BookingStatusType) => setStatusFilter(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
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
                    <h3 className="mb-2 text-sm font-medium">Payment Status</h3>
                    <Select 
                      value={paymentFilter} 
                      onValueChange={(value: PaymentStatusType) => setPaymentFilter(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by payment" />
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
                    <h3 className="mb-2 text-sm font-medium">Hotel</h3>
                    <Select 
                      value={hotelFilter?.toString() || "null"} 
                      onValueChange={(value) => setHotelFilter(value === "null" ? null : parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by hotel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="null">All Hotels</SelectItem>
                        {hotels.map(hotel => (
                          <SelectItem key={hotel.id} value={hotel.id.toString()}>
                            {hotel.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={handleResetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
                
                <div className="flex-1">
                  <BookingsTable 
                    bookings={filteredBookings}
                    loading={loading}
                    error={error}
                    updateBookingStatus={updateBookingStatus}
                    updatePaymentStatus={updatePaymentStatus}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Room Availability Calendar</CardTitle>
              <CardDescription>View and manage room availability for your hotels</CardDescription>
            </CardHeader>
            <CardContent>
              <RoomAvailabilityCalendar 
                hotels={hotels}
                selectedHotelId={hotelFilter}
                onSelectHotel={(hotelId) => setHotelFilter(hotelId)}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookings;
