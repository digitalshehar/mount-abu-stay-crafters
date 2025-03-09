
import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Loader2 } from 'lucide-react';
import { Booking } from '@/hooks/useBookings';

interface BookingsTableProps {
  bookings: Booking[];
  loading: boolean;
  onUpdateBookingStatus: (id: string, status: string) => Promise<boolean>;
  onUpdatePaymentStatus: (id: string, status: string) => Promise<boolean>;
}

const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  loading,
  onUpdateBookingStatus,
  onUpdatePaymentStatus
}) => {
  const [processingBookingId, setProcessingBookingId] = useState<string | null>(null);

  const handleUpdateBookingStatus = async (id: string, status: string) => {
    setProcessingBookingId(id);
    try {
      await onUpdateBookingStatus(id, status);
    } finally {
      setProcessingBookingId(null);
    }
  };

  const handleUpdatePaymentStatus = async (id: string, status: string) => {
    setProcessingBookingId(id);
    try {
      await onUpdatePaymentStatus(id, status);
    } finally {
      setProcessingBookingId(null);
    }
  };

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'refunded':
        return <Badge className="bg-yellow-500">Refunded</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest Name</TableHead>
            <TableHead>Hotel</TableHead>
            <TableHead>Room Type</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Booking Status</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span>Loading bookings...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8">
                No bookings found.
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.guest_name}</TableCell>
                <TableCell>{booking.hotel_name || 'Unknown Hotel'}</TableCell>
                <TableCell>{booking.room_type}</TableCell>
                <TableCell>
                  {booking.check_in_date ? format(new Date(booking.check_in_date), 'MMM dd, yyyy') : 'N/A'}
                </TableCell>
                <TableCell>
                  {booking.check_out_date ? format(new Date(booking.check_out_date), 'MMM dd, yyyy') : 'N/A'}
                </TableCell>
                <TableCell>₹{booking.total_price.toLocaleString('en-IN')}</TableCell>
                <TableCell>{getBookingStatusBadge(booking.booking_status)}</TableCell>
                <TableCell>{getPaymentStatusBadge(booking.payment_status)}</TableCell>
                <TableCell className="text-right">
                  {processingBookingId === booking.id ? (
                    <Button size="icon" variant="ghost" disabled>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </Button>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => handleUpdateBookingStatus(booking.id, 'confirmed')}>
                          Mark as Confirmed
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleUpdateBookingStatus(booking.id, 'cancelled')}>
                          Mark as Cancelled
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleUpdateBookingStatus(booking.id, 'completed')}>
                          Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => handleUpdatePaymentStatus(booking.id, 'paid')}>
                          Mark as Paid
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleUpdatePaymentStatus(booking.id, 'pending')}>
                          Mark as Payment Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleUpdatePaymentStatus(booking.id, 'refunded')}>
                          Mark as Refunded
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
