
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
} from '@/components/ui/table';
import { Booking } from '@/hooks/useBookings';
import { ScrollArea } from '@/components/ui/scroll-area';
import BookingDetailsDialog from './dialogs/BookingDetailsDialog';
import BookingTableHeader from './tables/TableHeader';
import BookingRow from './tables/TableRow';
import NoBookingsFound from './tables/NoBookingsFound';
import TableLoading from './tables/TableLoading';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export interface BookingTableProps {
  bookings: Booking[];
  loading: boolean;
  fetchBookings?: () => Promise<void>;
  updateBookingStatus?: (id: string, status: string) => Promise<boolean>;
  updatePaymentStatus?: (id: string, status: string) => Promise<boolean>;
  onStatusChange?: (id: string, status: string) => Promise<boolean>;
  onPaymentStatusChange?: (id: string, status: string) => Promise<boolean>;
  onViewDetails?: (booking: Booking) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  loading,
  fetchBookings,
  updateBookingStatus,
  updatePaymentStatus,
  onStatusChange,
  onPaymentStatusChange,
  onViewDetails,
}) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const handleStatusUpdate = (id: string, status: string) => {
    if (onStatusChange) {
      return onStatusChange(id, status);
    }
    if (updateBookingStatus) {
      return updateBookingStatus(id, status);
    }
    return Promise.resolve(false);
  };

  const handlePaymentUpdate = (id: string, status: string) => {
    if (onPaymentStatusChange) {
      return onPaymentStatusChange(id, status);
    }
    if (updatePaymentStatus) {
      return updatePaymentStatus(id, status);
    }
    return Promise.resolve(false);
  };

  const handleViewDetails = (booking: Booking) => {
    if (onViewDetails) {
      onViewDetails(booking);
    } else {
      setSelectedBooking(booking);
      setDetailsOpen(true);
    }
  };

  const handleRefresh = async () => {
    if (fetchBookings) {
      setRefreshing(true);
      await fetchBookings();
      setRefreshing(false);
      toast({
        title: "Refreshed",
        description: "Booking data has been refreshed",
      });
    }
  };

  // Subscribe to real-time booking updates
  useEffect(() => {
    console.log('Setting up real-time subscription for bookings');
    
    // Set up real-time subscription for new bookings
    const channel = supabase
      .channel('booking-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bookings' },
        (payload) => {
          console.log('New booking received:', payload);
          toast({
            title: "New Booking",
            description: "A new booking has been created",
            variant: "default",
          });
          if (fetchBookings) {
            fetchBookings();
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'bookings' },
        (payload) => {
          console.log('Booking updated:', payload);
          if (fetchBookings) {
            fetchBookings();
          }
        }
      )
      .subscribe();

    // Clean up subscription on unmount
    return () => {
      console.log('Cleaning up booking subscription');
      supabase.removeChannel(channel);
    };
  }, [fetchBookings, toast]);

  if (loading) {
    return <TableLoading />;
  }

  if (bookings.length === 0) {
    return <NoBookingsFound />;
  }

  return (
    <Card className="p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Bookings List</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh} 
          disabled={refreshing || loading}
          className="flex items-center gap-1"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>
      <div className="rounded-md border">
        <ScrollArea className="h-[550px]">
          <Table>
            <BookingTableHeader />
            <TableBody>
              {bookings.map((booking) => (
                <BookingRow 
                  key={booking.id}
                  booking={booking}
                  onViewDetails={handleViewDetails}
                  onStatusChange={handleStatusUpdate}
                  onPaymentStatusChange={handlePaymentUpdate}
                />
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {!onViewDetails && selectedBooking && (
        <BookingDetailsDialog 
          booking={selectedBooking}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onStatusChange={handleStatusUpdate}
          onPaymentStatusChange={handlePaymentUpdate}
        />
      )}
    </Card>
  );
};

export default BookingTable;
