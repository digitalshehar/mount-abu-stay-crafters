
import React from 'react';
import { format } from 'date-fns';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Booking } from '@/hooks/useBookings';
import BookingStatusSelect from './BookingStatusSelect';
import PaymentStatusSelect from './PaymentStatusSelect';

interface BookingInfoCardProps {
  booking: Booking;
  onStatusChange: (status: string) => void;
  onPaymentStatusChange: (status: string) => void;
}

const BookingInfoCard: React.FC<BookingInfoCardProps> = ({ 
  booking, 
  onStatusChange, 
  onPaymentStatusChange 
}) => {
  const getBookingName = () => {
    if (booking.hotel_name) return booking.hotel_name;
    if (booking.car_name) return `Car: ${booking.car_name}`;
    if (booking.bike_name) return `Bike: ${booking.bike_name}`;
    if (booking.adventure_name) return `Adventure: ${booking.adventure_name}`;
    return 'Unknown Booking';
  };

  return (
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

      <BookingStatusSelect 
        currentStatus={booking.booking_status} 
        onStatusChange={onStatusChange}
      />

      <PaymentStatusSelect
        currentStatus={booking.payment_status}
        onStatusChange={onPaymentStatusChange}
      />
    </CardContent>
  );
};

export default BookingInfoCard;
