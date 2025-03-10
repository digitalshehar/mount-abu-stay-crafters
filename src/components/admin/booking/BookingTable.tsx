
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Booking } from '@/hooks/useBookings';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import BookingDetailsDialog from './BookingDetailsDialog';

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingTypeColor = (type: string) => {
    switch (type) {
      case 'hotel':
        return 'bg-blue-100 text-blue-800';
      case 'car':
        return 'bg-green-100 text-green-800';
      case 'bike':
        return 'bg-orange-100 text-orange-800';
      case 'adventure':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingName = (booking: Booking) => {
    if (booking.hotel_name) return booking.hotel_name;
    if (booking.car_name) return `Car: ${booking.car_name}`;
    if (booking.bike_name) return `Bike: ${booking.bike_name}`;
    if (booking.adventure_name) return `Adventure: ${booking.adventure_name}`;
    return 'Unknown Booking';
  };

  if (loading) {
    return <div className="text-center py-8">Loading bookings...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <h3 className="text-lg font-semibold">No bookings found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="h-[600px]">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {typeof booking.id === 'string' && booking.id.length > 8 
                      ? booking.id.substring(0, 8) + '...'
                      : booking.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{booking.guest_name}</span>
                      <span className="text-xs text-muted-foreground">{booking.guest_email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getBookingTypeColor(booking.booking_type)}>
                      {booking.booking_type}
                    </Badge>
                  </TableCell>
                  <TableCell>{getBookingName(booking)}</TableCell>
                  <TableCell>{format(new Date(booking.check_in_date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{format(new Date(booking.check_out_date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>₹{booking.total_price.toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(booking.booking_status)}>
                      {booking.booking_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPaymentStatusColor(booking.payment_status)}>
                      {booking.payment_status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(booking)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, 'confirmed')}>
                          Mark as Confirmed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, 'completed')}>
                          Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, 'cancelled')}>
                          Mark as Cancelled
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Payment Status</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handlePaymentUpdate(booking.id, 'paid')}>
                          Mark as Paid
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePaymentUpdate(booking.id, 'pending')}>
                          Mark as Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePaymentUpdate(booking.id, 'refunded')}>
                          Mark as Refunded
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
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
