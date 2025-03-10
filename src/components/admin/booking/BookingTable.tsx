
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableHead
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Booking } from '@/hooks/useBookings';
import { MoreHorizontal, Ban, CheckCircle2, Trash2, CalendarClock, BadgeCheck, Clock, X, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import TableHeader from './tables/TableHeader';
import TableRow from './tables/TableRow';
import TableLoading from './tables/TableLoading';
import NoBookingsFound from './tables/NoBookingsFound';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface BookingTableProps {
  bookings: Booking[];
  loading: boolean;
  onStatusChange: (id: string, status: string) => Promise<boolean>;
  onPaymentStatusChange: (id: string, status: string) => Promise<boolean>;
  onViewDetails: (booking: Booking) => void;
  fetchBookings?: () => Promise<void>;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  loading,
  onStatusChange,
  onPaymentStatusChange,
  onViewDetails,
  fetchBookings
}) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  const handleDeleteClick = (bookingId: string) => {
    setBookingToDelete(bookingId);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (bookingToDelete) {
      // Delete booking implementation would go here
      console.log('Delete booking:', bookingToDelete);
    }
    setDeleteConfirmOpen(false);
    setBookingToDelete(null);
    
    // Refetch bookings if function is provided
    if (fetchBookings) {
      fetchBookings();
    }
  };

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
    <Card className="overflow-hidden border rounded-md">
      <ScrollArea className="h-[600px] w-full">
        <div className="relative w-full min-w-max">
          <Table>
            <TableHead>
              <TableHeader />
            </TableHead>
            <TableBody>
              {loading ? (
                <TableLoading />
              ) : bookings.length === 0 ? (
                <NoBookingsFound />
              ) : (
                bookings.map((booking) => (
                  <TableRow 
                    key={booking.id}
                    booking={booking}
                    onViewDetails={() => onViewDetails(booking)}
                    onDeleteClick={() => handleDeleteClick(booking.id)}
                    onStatusChange={onStatusChange}
                    onPaymentStatusChange={onPaymentStatusChange}
                    getBookingTypeLabel={getBookingTypeLabel}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this booking. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default BookingTable;
