
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookingStatusType, PaymentStatusType } from '@/hooks/useBookings';
import { Card, CardContent } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface BookingFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: BookingStatusType;
  setStatusFilter: (status: BookingStatusType) => void;
  paymentFilter: PaymentStatusType;
  setPaymentFilter: (status: PaymentStatusType) => void;
  dateRange: {from: Date | undefined, to: Date | undefined};
  setDateRange: (range: {from: Date | undefined, to: Date | undefined}) => void;
}

const BookingFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  paymentFilter,
  setPaymentFilter,
  dateRange,
  setDateRange
}: BookingFiltersProps) => {
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPaymentFilter('all');
    setDateRange({ from: undefined, to: undefined });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <div className="mb-2">
              <Label htmlFor="search">Search</Label>
            </div>
            <div className="relative">
              <Input
                id="search"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="status-filter" className="mb-2 block">Booking Status</Label>
            <Select 
              value={statusFilter} 
              onValueChange={(value) => setStatusFilter(value as BookingStatusType)}
            >
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="All statuses" />
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
            <Label htmlFor="payment-filter" className="mb-2 block">Payment Status</Label>
            <Select 
              value={paymentFilter} 
              onValueChange={(value) => setPaymentFilter(value as PaymentStatusType)}
            >
              <SelectTrigger id="payment-filter">
                <SelectValue placeholder="All payment statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payment Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="mb-2 block">Date Range</Label>
            <div className="flex items-center gap-2">
              <DatePicker
                selected={dateRange.from}
                onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                placeholderText="From"
                className="flex-1"
              />
              <span>to</span>
              <DatePicker
                selected={dateRange.to}
                onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                placeholderText="To"
                className="flex-1"
              />
            </div>
          </div>
        </div>
        
        {(searchQuery || statusFilter !== 'all' || paymentFilter !== 'all' || dateRange.from || dateRange.to) && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <p className="text-sm text-muted-foreground">Active filters:</p>
              {searchQuery && (
                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center">
                  Search: {searchQuery}
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-1 hover:text-primary"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center">
                  Status: {statusFilter}
                  <button 
                    onClick={() => setStatusFilter('all')}
                    className="ml-1 hover:text-primary"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {paymentFilter !== 'all' && (
                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center">
                  Payment: {paymentFilter}
                  <button 
                    onClick={() => setPaymentFilter('all')}
                    className="ml-1 hover:text-primary"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {dateRange.from && (
                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center">
                  From: {format(dateRange.from, 'MMM dd, yyyy')}
                  <button 
                    onClick={() => setDateRange({ ...dateRange, from: undefined })}
                    className="ml-1 hover:text-primary"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {dateRange.to && (
                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center">
                  To: {format(dateRange.to, 'MMM dd, yyyy')}
                  <button 
                    onClick={() => setDateRange({ ...dateRange, to: undefined })}
                    className="ml-1 hover:text-primary"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={handleResetFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingFilters;
