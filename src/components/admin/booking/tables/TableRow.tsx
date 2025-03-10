
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Booking } from '@/hooks/useBookings';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface BookingRowProps {
  booking: Booking;
  onViewDetails: (booking: Booking) => void;
  onDeleteClick?: (id: string) => void;
  onStatusChange?: (id: string, status: string) => Promise<boolean>;
  onPaymentStatusChange?: (id: string, status: string) => Promise<boolean>;
  getBookingTypeLabel?: (type: string) => string;
}

const BookingRow: React.FC<BookingRowProps> = ({
  booking,
  onViewDetails,
  onDeleteClick,
  onStatusChange,
  onPaymentStatusChange,
  getBookingTypeLabel,
}) => {
  const statusVariants: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-800 hover:bg-green-200',
    pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    cancelled: 'bg-red-100 text-red-800 hover:bg-red-200',
    completed: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  };

  const paymentVariants: Record<string, string> = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    refunded: 'bg-purple-100 text-purple-800',
    failed: 'bg-red-100 text-red-800',
  };

  const formatId = (id: string) => {
    if (id.length > 8) {
      return id.substring(0, 8) + '...';
    }
    return id;
  };

  const getServiceName = () => {
    if (booking.hotel_name) return booking.hotel_name;
    if (booking.car_name) return booking.car_name;
    if (booking.bike_name) return booking.bike_name;
    if (booking.adventure_name) return booking.adventure_name;
    return 'Unknown';
  };

  const handleMarkAsPaid = async () => {
    if (onPaymentStatusChange) {
      await onPaymentStatusChange(booking.id, 'paid');
    }
  };

  const handleCompleteBooking = async () => {
    if (onStatusChange) {
      await onStatusChange(booking.id, 'completed');
    }
  };

  const handleCancelBooking = async () => {
    if (onStatusChange) {
      await onStatusChange(booking.id, 'cancelled');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <TableRow className="hover:bg-muted/30">
      <TableCell className="font-mono text-xs">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>{formatId(booking.id)}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{booking.id}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <div className="font-medium">{booking.guest_name}</div>
        <div className="text-xs text-muted-foreground">{booking.guest_email}</div>
      </TableCell>
      <TableCell>
        {getBookingTypeLabel ? getBookingTypeLabel(booking.booking_type) : booking.booking_type}
      </TableCell>
      <TableCell>{getServiceName()}</TableCell>
      <TableCell>{format(new Date(booking.check_in_date), 'MMM dd, yyyy')}</TableCell>
      <TableCell>{format(new Date(booking.check_out_date), 'MMM dd, yyyy')}</TableCell>
      <TableCell>{formatCurrency(booking.total_price)}</TableCell>
      <TableCell>
        <Badge 
          variant="outline" 
          className={`${statusVariants[booking.booking_status] || ''}`}
        >
          {booking.booking_status}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge 
          variant="outline"
          className={`${paymentVariants[booking.payment_status] || ''}`}
        >
          {booking.payment_status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Booking Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onViewDetails(booking)}>
              <Eye className="w-4 h-4 mr-2" /> View Details
            </DropdownMenuItem>
            {onPaymentStatusChange && (
              <DropdownMenuItem onClick={() => onPaymentStatusChange(booking.id, 'paid')}>
                <CheckCircle className="w-4 h-4 mr-2" /> Mark as Paid
              </DropdownMenuItem>
            )}
            {onStatusChange && (
              <DropdownMenuItem onClick={() => onStatusChange(booking.id, 'completed')}>
                <CheckCircle className="w-4 h-4 mr-2" /> Complete Booking
              </DropdownMenuItem>
            )}
            {onStatusChange && (
              <DropdownMenuItem onClick={() => onStatusChange(booking.id, 'cancelled')}>
                <XCircle className="w-4 h-4 mr-2" /> Cancel Booking
              </DropdownMenuItem>
            )}
            {onDeleteClick && (
              <DropdownMenuItem onClick={() => onDeleteClick(booking.id)} className="text-destructive">
                <XCircle className="w-4 h-4 mr-2" /> Delete Booking
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default BookingRow;
