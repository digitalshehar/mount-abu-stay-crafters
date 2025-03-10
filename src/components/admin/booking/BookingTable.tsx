
import React, { useState } from 'react';
import {
  Table,
  TableBody,
} from '@/components/ui/table';
import { Booking } from '@/hooks/useBookings';
import { ScrollArea } from '@/components/ui/scroll-area';
import BookingDetailsDialog from './dialogs/BookingDetailsDialog';
import TableHeader from './tables/TableHeader';
import BookingRow from './tables/TableRow';
import NoBookingsFound from './tables/NoBookingsFound';
import TableLoading from './tables/TableLoading';

export interface BookingTableProps {
  bookings: Booking[];
  loading: boolean;
  updateBookingStatus?: (id: string, status: string) => Promise<boolean>;
  updatePaymentStatus?: (id: string, status: string) => Promise<boolean>;
  onStatusChange?: (id: string, status: string) => Promise<boolean>;
  onPaymentStatusChange?: (id: string, status: string) => Promise<boolean>;
  onViewDetails?: (booking: Booking) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  loading,
  updateBookingStatus,
  updatePaymentStatus,
  onStatusChange,
  onPaymentStatusChange,
  onViewDetails,
}) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

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

  if (loading) {
    return <TableLoading />;
  }

  if (bookings.length === 0) {
    return <NoBookingsFound />;
  }

  return (
    <>
      <ScrollArea className="h-[600px]">
        <div className="rounded-md border">
          <Table>
            <TableHeader />
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
        </div>
      </ScrollArea>

      {!onViewDetails && selectedBooking && (
        <BookingDetailsDialog 
          booking={selectedBooking}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onStatusChange={handleStatusUpdate}
          onPaymentStatusChange={handlePaymentUpdate}
        />
      )}
    </>
  );
};

export default BookingTable;
