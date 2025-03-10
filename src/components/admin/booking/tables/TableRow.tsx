
import React from 'react';
import { TableCell, TableRow as UITableRow } from '@/components/ui/table';
import { Booking } from '@/hooks/useBookings';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Eye, CalendarCheck, CreditCard, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-3.5 w-3.5 mr-1" />;
      case 'pending': return <Clock className="h-3.5 w-3.5 mr-1" />;
      case 'cancelled': return <XCircle className="h-3.5 w-3.5 mr-1" />;
      case 'completed': return <CalendarCheck className="h-3.5 w-3.5 mr-1" />;
      default: return <AlertCircle className="h-3.5 w-3.5 mr-1" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'refunded': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-3.5 w-3.5 mr-1" />;
      case 'pending': return <Clock className="h-3.5 w-3.5 mr-1" />;
      case 'refunded': return <CreditCard className="h-3.5 w-3.5 mr-1" />;
      case 'failed': return <XCircle className="h-3.5 w-3.5 mr-1" />;
      default: return <AlertCircle className="h-3.5 w-3.5 mr-1" />;
    }
  };

  const getBookingTypeColor = (type: string) => {
    switch (type) {
      case 'hotel': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'car': return 'bg-green-100 text-green-800 border-green-200';
      case 'bike': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'adventure': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBookingTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel': return '🏨';
      case 'car': return '🚗';
      case 'bike': return '🏍️';
      case 'adventure': return '🏕️';
      default: return '📅';
    }
  };

  const getBookingName = (booking: Booking) => {
    if (booking.hotel_name) return booking.hotel_name;
    if (booking.car_name) return `Car: ${booking.car_name}`;
    if (booking.bike_name) return `Bike: ${booking.bike_name}`;
    if (booking.adventure_name) return `Adventure: ${booking.adventure_name}`;
    return 'Unknown Booking';
  };

  // Calculate how recent this booking is for highlighting (within 30 minutes)
  const isRecentBooking = () => {
    const creationTime = new Date(booking.created_at).getTime();
    const now = new Date().getTime();
    const timeDiffMinutes = (now - creationTime) / (1000 * 60);
    return timeDiffMinutes < 30;
  };

  return (
    <UITableRow className={`${isRecentBooking() ? 'bg-yellow-50' : ''} transition-colors`}>
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className={getBookingTypeColor(booking.booking_type)}>
                <span className="mr-1">{getBookingTypeIcon(booking.booking_type)}</span>
                {booking.booking_type}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{booking.booking_type.charAt(0).toUpperCase() + booking.booking_type.slice(1)} booking</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <span className="font-medium truncate max-w-[150px] block">{getBookingName(booking)}</span>
      </TableCell>
      <TableCell>{format(new Date(booking.check_in_date), 'MMM dd, yyyy')}</TableCell>
      <TableCell>{format(new Date(booking.check_out_date), 'MMM dd, yyyy')}</TableCell>
      <TableCell className="font-medium">₹{booking.total_price.toLocaleString('en-IN')}</TableCell>
      <TableCell>
        <Badge variant="outline" className={`flex items-center gap-0.5 ${getStatusColor(booking.booking_status)}`}>
          {getStatusIcon(booking.booking_status)}
          {booking.booking_status}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={`flex items-center gap-0.5 ${getPaymentStatusColor(booking.payment_status)}`}>
          {getPaymentIcon(booking.payment_status)}
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
          <DropdownMenuContent align="end" className="w-[220px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onViewDetails(booking)} className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onStatusChange(booking.id, 'confirmed')} className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Mark as Confirmed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(booking.id, 'completed')} className="flex items-center">
              <CalendarCheck className="mr-2 h-4 w-4 text-blue-600" />
              Mark as Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(booking.id, 'cancelled')} className="flex items-center">
              <XCircle className="mr-2 h-4 w-4 text-red-600" />
              Mark as Cancelled
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Payment Status</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onPaymentStatusChange(booking.id, 'paid')} className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Mark as Paid
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPaymentStatusChange(booking.id, 'pending')} className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-yellow-600" />
              Mark as Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPaymentStatusChange(booking.id, 'refunded')} className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4 text-purple-600" />
              Mark as Refunded
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </UITableRow>
  );
};

export default BookingRow;
