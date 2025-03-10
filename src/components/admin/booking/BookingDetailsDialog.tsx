
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Booking } from '@/hooks/useBookings';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

export interface BookingDetailsDialogProps {
  booking: Booking;
  open?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  updateBookingStatus?: (id: string, status: string) => Promise<boolean>;
  updatePaymentStatus?: (id: string, status: string) => Promise<boolean>;
  onStatusChange?: (id: string, status: string) => Promise<boolean>;
  onPaymentStatusChange?: (id: string, status: string) => Promise<boolean>;
}

const BookingDetailsDialog: React.FC<BookingDetailsDialogProps> = ({
  booking,
  open,
  onClose,
  onOpenChange,
  updateBookingStatus,
  updatePaymentStatus,
  onStatusChange,
  onPaymentStatusChange
}) => {
  const handleStatusChange = async (status: string) => {
    if (onStatusChange) {
      await onStatusChange(booking.id, status);
    } else if (updateBookingStatus) {
      await updateBookingStatus(booking.id, status);
    }
  };

  const handlePaymentStatusChange = async (status: string) => {
    if (onPaymentStatusChange) {
      await onPaymentStatusChange(booking.id, status);
    } else if (updatePaymentStatus) {
      await updatePaymentStatus(booking.id, status);
    }
  };

  const getBookingName = () => {
    if (booking.hotel_name) return booking.hotel_name;
    if (booking.car_name) return `Car: ${booking.car_name}`;
    if (booking.bike_name) return `Bike: ${booking.bike_name}`;
    if (booking.adventure_name) return `Adventure: ${booking.adventure_name}`;
    return 'Unknown Booking';
  };

  const getBookingTypeLabel = (type: string) => {
    switch (type) {
      case 'hotel': return 'Hotel Stay';
      case 'car': return 'Car Rental';
      case 'bike': return 'Bike Rental';
      case 'adventure': return 'Adventure Tour';
      default: return 'Booking';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Booking Details 
            <Badge variant="secondary" className="ml-2">{getBookingTypeLabel(booking.booking_type)}</Badge>
          </DialogTitle>
          <DialogDescription>
            Booking reference: {booking.id}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left column - booking details */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{getBookingName()}</h3>
                {booking.room_type && <p className="text-muted-foreground">{booking.room_type}</p>}
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-x-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Check In</Label>
                    <p>{format(new Date(booking.check_in_date), 'MMM dd, yyyy')}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Check Out</Label>
                    <p>{format(new Date(booking.check_out_date), 'MMM dd, yyyy')}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Guests</Label>
                <p>{booking.number_of_guests} {booking.number_of_guests === 1 ? 'person' : 'people'}</p>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Total Price</Label>
                <p className="text-lg font-bold">₹{booking.total_price.toLocaleString('en-IN')}</p>
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Booking Status</Label>
                <Select defaultValue={booking.booking_status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Booking Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Payment Status</Label>
                <Select defaultValue={booking.payment_status} onValueChange={handlePaymentStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Right column - guest details */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Guest Information</h3>
                <Separator className="my-2" />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Name</Label>
                <p>{booking.guest_name}</p>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <p>{booking.guest_email}</p>
              </div>

              {booking.guest_phone && (
                <div>
                  <Label className="text-xs text-muted-foreground">Phone Number</Label>
                  <p>{booking.guest_phone}</p>
                </div>
              )}

              <div>
                <Label className="text-xs text-muted-foreground">Booking Date</Label>
                <p>{format(new Date(booking.created_at), 'MMMM dd, yyyy')}</p>
              </div>

              <div className="pt-4">
                <Label className="text-xs text-muted-foreground">Additional Actions</Label>
                <div className="flex flex-col gap-2 mt-2">
                  <Button variant="outline" onClick={() => window.open(`mailto:${booking.guest_email}`)}>
                    Contact Guest
                  </Button>
                  {/* Add more action buttons here if needed */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {onClose && (
          <div className="flex justify-end mt-4">
            <Button onClick={onClose}>Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsDialog;
