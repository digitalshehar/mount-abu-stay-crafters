
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
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import BookingInfoCard from './BookingInfoCard';
import GuestInfoCard from './GuestInfoCard';

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
  const handleStatusChange = async (id: string, status: string) => {
    if (onStatusChange) {
      return await onStatusChange(id, status);
    } else if (updateBookingStatus) {
      return await updateBookingStatus(id, status);
    }
    return false;
  };

  const handlePaymentStatusChange = async (id: string, status: string) => {
    if (onPaymentStatusChange) {
      return await onPaymentStatusChange(id, status);
    } else if (updatePaymentStatus) {
      return await updatePaymentStatus(id, status);
    }
    return false;
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
            <BookingInfoCard 
              booking={booking} 
              onStatusChange={handleStatusChange}
              onPaymentStatusChange={handlePaymentStatusChange}
            />
          </Card>

          {/* Right column - guest details */}
          <Card>
            <GuestInfoCard booking={booking} />
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
