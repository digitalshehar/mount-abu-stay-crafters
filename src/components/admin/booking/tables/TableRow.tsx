
import React from 'react';
import { TableCell, TableRow as UITableRow } from '@/components/ui/table';
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
import { Button } from '@/components/ui/button';

interface BookingRowProps {
  booking: Booking;
  onViewDetails: (booking: Booking) => void;
  onStatusChange: (id: string, status: string) => Promise<boolean>;
  onPaymentStatusChange: (id: string, status: string) => Promise<boolean>;
}

const BookingRow: React.FC<BookingRowProps> = ({
  booking,
  onViewDetails,
  onStatusChange,
  onPaymentStatusChange
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingTypeColor = (type: string) => {
    switch (type) {
      case 'hotel': return 'bg-blue-100 text-blue-800';
      case 'car': return 'bg-green-100 text-green-800';
      case 'bike': return 'bg-orange-100 text-orange-800';
      case 'adventure': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingName = (booking: Booking) => {
    if (booking.hotel_name) return booking.hotel_name;
    if (booking.car_name) return `Car: ${booking.car_name}`;
    if (booking.bike_name) return `Bike: ${booking.bike_name}`;
    if (booking.adventure_name) return `Adventure: ${booking.adventure_name}`;
    return 'Unknown Booking';
  };

  return (
    <UITableRow>
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
            <DropdownMenuItem onClick={() => onViewDetails(booking)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onStatusChange(booking.id, 'confirmed')}>
              Mark as Confirmed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(booking.id, 'completed')}>
              Mark as Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(booking.id, 'cancelled')}>
              Mark as Cancelled
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Payment Status</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onPaymentStatusChange(booking.id, 'paid')}>
              Mark as Paid
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPaymentStatusChange(booking.id, 'pending')}>
              Mark as Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPaymentStatusChange(booking.id, 'refunded')}>
              Mark as Refunded
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </UITableRow>
  );
};

export default BookingRow;
