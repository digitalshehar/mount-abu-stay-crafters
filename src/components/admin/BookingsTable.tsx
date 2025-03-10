
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
import { 
  MoreHorizontal, 
  Loader2, 
  Calendar, 
  Check, 
  Clock, 
  XCircle, 
  AlertTriangle,
  CreditCard,
  Ban,
  RefreshCcw,
  DollarSign
} from 'lucide-react';
import { Booking } from '@/hooks/useBookings';
import { motion } from 'framer-motion';

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
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            <Check className="h-3 w-3" />
            <span>Confirmed</span>
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            <span>Cancelled</span>
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Pending</span>
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-blue-500 flex items-center gap-1">
            <Check className="h-3 w-3" />
            <span>Completed</span>
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            <span>Paid</span>
          </Badge>
        );
      case 'refunded':
        return (
          <Badge className="bg-yellow-500 flex items-center gap-1">
            <RefreshCcw className="h-3 w-3" />
            <span>Refunded</span>
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <CreditCard className="h-3 w-3" />
            <span>Pending</span>
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <Ban className="h-3 w-3" />
            <span>Failed</span>
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest Name</TableHead>
            <TableHead>Hotel</TableHead>
            <TableHead>Room Type</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Check In</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Check Out</span>
              </div>
            </TableHead>
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
                <div className="flex flex-col items-center justify-center gap-2">
                  <AlertTriangle className="h-8 w-8 text-amber-500" />
                  <p>No bookings found.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking, index) => (
              <motion.tr 
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b transition-colors hover:bg-muted/50"
              >
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
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Mark as Confirmed
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleUpdateBookingStatus(booking.id, 'cancelled')}>
                          <XCircle className="h-4 w-4 mr-2 text-red-500" />
                          Mark as Cancelled
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleUpdateBookingStatus(booking.id, 'completed')}>
                          <Check className="h-4 w-4 mr-2 text-blue-500" />
                          Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => handleUpdatePaymentStatus(booking.id, 'paid')}>
                          <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                          Mark as Paid
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleUpdatePaymentStatus(booking.id, 'pending')}>
                          <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                          Mark as Payment Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleUpdatePaymentStatus(booking.id, 'refunded')}>
                          <RefreshCcw className="h-4 w-4 mr-2 text-blue-500" />
                          Mark as Refunded
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
