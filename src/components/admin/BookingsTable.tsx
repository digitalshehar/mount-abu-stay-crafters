
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
import { MoreHorizontal, Loader2, Eye } from 'lucide-react';
import { Booking } from '@/hooks/useBookings';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

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
        return <Badge className="bg-green-500 hover:bg-green-600 transition-colors">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="transition-colors">Cancelled</Badge>;
      case 'pending':
        return <Badge variant="outline" className="animate-pulse">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500 hover:bg-blue-600 transition-colors">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500 hover:bg-green-600 transition-colors">Paid</Badge>;
      case 'refunded':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 transition-colors">Refunded</Badge>;
      case 'pending':
        return <Badge variant="outline" className="animate-pulse">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive" className="transition-colors">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailsOpen(true);
  };

  return (
    <>
      <div className="rounded-md border animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest Name</TableHead>
              <TableHead>Hotel</TableHead>
              <TableHead className="hidden md:table-cell">Room Type</TableHead>
              <TableHead className="hidden md:table-cell">Check In</TableHead>
              <TableHead className="hidden md:table-cell">Check Out</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Booking Status</TableHead>
              <TableHead className="hidden md:table-cell">Payment Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(5).fill(0).map((_, index) => (
                <TableRow key={index} className="animate-pulse">
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 ml-auto rounded-full" /></TableCell>
                </TableRow>
              ))
            ) : bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 animate-fade-in">
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking, index) => (
                <TableRow key={booking.id} className={`animate-fade-in transition-all hover:bg-accent/50`} style={{ animationDelay: `${index * 50}ms` }}>
                  <TableCell className="font-medium">{booking.guest_name}</TableCell>
                  <TableCell>{booking.hotel_name || 'Unknown Hotel'}</TableCell>
                  <TableCell className="hidden md:table-cell">{booking.room_type}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {booking.check_in_date ? format(new Date(booking.check_in_date), 'MMM dd, yyyy') : 'N/A'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {booking.check_out_date ? format(new Date(booking.check_out_date), 'MMM dd, yyyy') : 'N/A'}
                  </TableCell>
                  <TableCell>₹{booking.total_price.toLocaleString('en-IN')}</TableCell>
                  <TableCell>{getBookingStatusBadge(booking.booking_status)}</TableCell>
                  <TableCell className="hidden md:table-cell">{getPaymentStatusBadge(booking.payment_status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => handleViewDetails(booking)}
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
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
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Booking ID</p>
                  <p className="font-medium">{selectedBooking.id.substring(0, 8)}...</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">{format(new Date(selectedBooking.created_at), 'MMM dd, yyyy')}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Guest Information</p>
                <div className="bg-accent/50 p-3 rounded-md">
                  <p className="font-semibold">{selectedBooking.guest_name}</p>
                  <p className="text-sm">{selectedBooking.guest_email}</p>
                  <p className="text-sm">{selectedBooking.guest_phone || 'No phone provided'}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Stay Details</p>
                <div className="bg-accent/50 p-3 rounded-md">
                  <p><span className="font-semibold">Hotel:</span> {selectedBooking.hotel_name}</p>
                  <p><span className="font-semibold">Room Type:</span> {selectedBooking.room_type}</p>
                  <p><span className="font-semibold">Check In:</span> {format(new Date(selectedBooking.check_in_date), 'MMM dd, yyyy')}</p>
                  <p><span className="font-semibold">Check Out:</span> {format(new Date(selectedBooking.check_out_date), 'MMM dd, yyyy')}</p>
                  <p><span className="font-semibold">Guests:</span> {selectedBooking.number_of_guests}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Information</p>
                <div className="bg-accent/50 p-3 rounded-md">
                  <div className="flex justify-between">
                    <p className="font-semibold">Total Amount:</p>
                    <p className="font-semibold">₹{selectedBooking.total_price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p>Payment Status:</p>
                    <div>{getPaymentStatusBadge(selectedBooking.payment_status)}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Booking Status</p>
                  <div className="mt-1">{getBookingStatusBadge(selectedBooking.booking_status)}</div>
                </div>
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingsTable;
