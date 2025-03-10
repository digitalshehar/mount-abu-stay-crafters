
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Booking } from '@/hooks/useBookings';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Check, Clock, CreditCard, Users, X } from 'lucide-react';

interface BookingDetailsDialogProps {
  booking: Booking | null;
  onClose: () => void;
  updateBookingStatus: (id: string, status: string) => Promise<boolean>;
  updatePaymentStatus: (id: string, status: string) => Promise<boolean>;
}

const BookingDetailsDialog: React.FC<BookingDetailsDialogProps> = ({
  booking,
  onClose,
  updateBookingStatus,
  updatePaymentStatus,
}) => {
  if (!booking) return null;

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

  const handleStatusUpdate = async (status: string) => {
    const success = await updateBookingStatus(booking.id, status);
    if (success) {
      onClose();
    }
  };

  const handlePaymentUpdate = async (status: string) => {
    const success = await updatePaymentStatus(booking.id, status);
    if (success) {
      onClose();
    }
  };

  const getDuration = () => {
    const checkIn = new Date(booking.check_in_date);
    const checkOut = new Date(booking.check_out_date);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Dialog open={!!booking} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] overflow-auto pr-4">
          <div className="space-y-6 py-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Booking #{booking.id.substring(0, 8)}...
              </h3>
              <div className="flex space-x-2">
                <Badge variant="outline" className={getStatusColor(booking.booking_status)}>
                  {booking.booking_status}
                </Badge>
                <Badge variant="outline" className={getPaymentStatusColor(booking.payment_status)}>
                  {booking.payment_status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Guest Information</h4>
                  <div className="border rounded-md p-3 space-y-2">
                    <div>
                      <Label className="text-xs">Name</Label>
                      <p className="font-medium">{booking.guest_name}</p>
                    </div>
                    <div>
                      <Label className="text-xs">Email</Label>
                      <p className="font-medium">{booking.guest_email}</p>
                    </div>
                    {booking.guest_phone && (
                      <div>
                        <Label className="text-xs">Phone</Label>
                        <p className="font-medium">{booking.guest_phone}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Stay Details</h4>
                  <div className="border rounded-md p-3 space-y-2">
                    <div>
                      <Label className="text-xs">Hotel</Label>
                      <p className="font-medium">{booking.hotel_name || 'Unknown Hotel'}</p>
                    </div>
                    <div>
                      <Label className="text-xs">Room Type</Label>
                      <p className="font-medium">{booking.room_type}</p>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <Label className="text-xs mr-2">Guests:</Label>
                      <p className="font-medium">{booking.number_of_guests}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Booking Dates</h4>
                  <div className="border rounded-md p-3 space-y-2">
                    <div>
                      <Label className="text-xs">Check In</Label>
                      <p className="font-medium">
                        {format(new Date(booking.check_in_date), 'EEEE, MMMM dd, yyyy')}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs">Check Out</Label>
                      <p className="font-medium">
                        {format(new Date(booking.check_out_date), 'EEEE, MMMM dd, yyyy')}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <Label className="text-xs mr-2">Duration:</Label>
                      <p className="font-medium">{getDuration()} nights</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Payment Information</h4>
                  <div className="border rounded-md p-3 space-y-2">
                    <div>
                      <Label className="text-xs">Total Amount</Label>
                      <p className="text-lg font-bold">₹{booking.total_price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-1" />
                      <Label className="text-xs mr-2">Payment Status:</Label>
                      <Badge variant="outline" className={getPaymentStatusColor(booking.payment_status)}>
                        {booking.payment_status}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-xs">Booking Date</Label>
                      <p className="font-medium">
                        {format(new Date(booking.created_at), 'MMMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <div className="flex-1 space-y-2">
              <h4 className="text-sm font-medium">Update Booking Status</h4>
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => handleStatusUpdate('confirmed')}
                >
                  <Check className="h-3 w-3 mr-1" /> Confirm
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => handleStatusUpdate('completed')}
                >
                  <Check className="h-3 w-3 mr-1" /> Complete
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => handleStatusUpdate('cancelled')}
                >
                  <X className="h-3 w-3 mr-1" /> Cancel
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <h4 className="text-sm font-medium">Update Payment Status</h4>
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => handlePaymentUpdate('paid')}
                >
                  <Check className="h-3 w-3 mr-1" /> Paid
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => handlePaymentUpdate('pending')}
                >
                  <Clock className="h-3 w-3 mr-1" /> Pending
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => handlePaymentUpdate('refunded')}
                >
                  <CreditCard className="h-3 w-3 mr-1" /> Refund
                </Button>
              </div>
            </div>
          </div>
          
          <Button className="w-full sm:w-auto" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsDialog;
