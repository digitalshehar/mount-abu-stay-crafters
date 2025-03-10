
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableHeader as UITableHeader } from '@/components/ui/table';
import { Booking } from '@/hooks/useBookings';
import BookingRow from './tables/TableRow';
import BookingTableHeader from './tables/TableHeader';
import TableLoading from './tables/TableLoading';
import NoBookingsFound from './tables/NoBookingsFound';

interface BookingTableProps {
  bookings: Booking[];
  loading: boolean;
  onStatusChange?: (id: string, status: string) => Promise<boolean>;
  onPaymentStatusChange?: (id: string, status: string) => Promise<boolean>;
  onViewDetails?: (booking: Booking) => void;
  fetchBookings?: () => Promise<void>;
  onDeleteClick?: (id: string) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  loading,
  onStatusChange,
  onPaymentStatusChange,
  onViewDetails,
  fetchBookings,
  onDeleteClick
}) => {
  const getBookingTypeLabel = (type: string) => {
    switch (type) {
      case 'hotel': return 'Hotel';
      case 'car': return 'Car';
      case 'bike': return 'Bike';
      case 'adventure': return 'Adventure';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-2">
      <div className="rounded-md border">
        <ScrollArea className="h-[600px]">
          <Table>
            <UITableHeader>
              <BookingTableHeader />
            </UITableHeader>
            <TableBody>
              {loading ? (
                <TableLoading />
              ) : bookings.length === 0 ? (
                <NoBookingsFound />
              ) : (
                bookings.map((booking) => (
                  <BookingRow
                    key={booking.id}
                    booking={booking}
                    onViewDetails={() => onViewDetails && onViewDetails(booking)}
                    onDeleteClick={onDeleteClick ? () => onDeleteClick(booking.id) : undefined}
                    onStatusChange={onStatusChange || (() => Promise.resolve(false))}
                    onPaymentStatusChange={onPaymentStatusChange || (() => Promise.resolve(false))}
                    getBookingTypeLabel={getBookingTypeLabel}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <div className="text-xs text-muted-foreground text-center">
        {!loading && (
          <p>Showing {bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
        )}
      </div>
    </div>
  );
};

export default BookingTable;
