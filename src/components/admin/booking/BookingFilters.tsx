
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookingStatusType, PaymentStatusType } from '@/hooks/useBookings';
import { CalendarIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface BookingFiltersProps {
  searchQuery: string;
  statusFilter: BookingStatusType;
  paymentFilter: PaymentStatusType;
  dateRange: { from: Date | undefined; to: Date | undefined };
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: BookingStatusType) => void;
  setPaymentFilter: (status: PaymentStatusType) => void;
  setDateRange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  exportBookingsToCSV?: () => void;
}

const BookingFilters = ({
  searchQuery,
  statusFilter,
  paymentFilter,
  dateRange,
  setSearchQuery,
  setStatusFilter,
  setPaymentFilter,
  setDateRange,
  exportBookingsToCSV,
}: BookingFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by guest name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Booking Status</Label>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as BookingStatusType)}
          >
            <SelectTrigger id="status">
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
        
        <div className="space-y-2">
          <Label htmlFor="payment">Payment Status</Label>
          <Select
            value={paymentFilter}
            onValueChange={(value) => setPaymentFilter(value as PaymentStatusType)}
          >
            <SelectTrigger id="payment">
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
        
        <div className="space-y-2">
          <Label>Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange.from && !dateRange.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Pick a date range"
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
                onSelect={(value) => 
                  setDateRange({ 
                    from: value?.from, 
                    to: value?.to 
                  })
                }
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        {exportBookingsToCSV && (
          <Button 
            variant="outline"
            onClick={exportBookingsToCSV}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" /> 
            Export CSV
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => {
            setSearchQuery('');
            setStatusFilter('all');
            setPaymentFilter('all');
            setDateRange({ from: undefined, to: undefined });
          }}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default BookingFilters;
