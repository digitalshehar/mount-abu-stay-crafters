
import React from 'react';
import { Booking } from '@/hooks/useBookings';
import { format } from 'date-fns';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BookingStatusSelect from './BookingStatusSelect';
import PaymentStatusSelect from './PaymentStatusSelect';

export interface BookingInfoCardProps {
  booking: Booking;
  onStatusChange?: (id: string, status: string) => Promise<boolean>;
  onPaymentStatusChange?: (id: string, status: string) => Promise<boolean>;
}

const BookingInfoCard: React.FC<BookingInfoCardProps> = ({
  booking,
  onStatusChange,
  onPaymentStatusChange,
}) => {
  // Format dates
  const formattedCheckIn = format(new Date(booking.check_in_date), 'MMM dd, yyyy');
  const formattedCheckOut = format(new Date(booking.check_out_date), 'MMM dd, yyyy');
  
  // Format price
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(booking.total_price);

  const getServiceName = () => {
    if (booking.hotel_name) return booking.hotel_name;
    if (booking.car_name) return booking.car_name;
    if (booking.bike_name) return booking.bike_name;
    if (booking.adventure_name) return booking.adventure_name;
    return 'Unknown';
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-lg">Booking Information</CardTitle>
        {booking.booking_reference && (
          <CardDescription>
            Reference: <Badge variant="outline" className="ml-1">{booking.booking_reference}</Badge>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Service</h4>
            <p className="text-sm font-medium">{getServiceName()}</p>
          </div>
          {booking.room_type && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Room Type</h4>
              <p className="text-sm font-medium">{booking.room_type}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Check In</h4>
            <p className="text-sm font-medium">{formattedCheckIn}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Check Out</h4>
            <p className="text-sm font-medium">{formattedCheckOut}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Guests</h4>
            <p className="text-sm font-medium">{booking.number_of_guests}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Total Price</h4>
            <p className="text-sm font-medium">{formattedPrice}</p>
          </div>
        </div>

        {booking.base_price && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Base Price</h4>
              <p className="text-sm font-medium">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(booking.base_price)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Tax</h4>
              <p className="text-sm font-medium">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(booking.tax_amount || 0)}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4 pt-4">
          {onStatusChange && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Booking Status</h4>
              <BookingStatusSelect 
                id={booking.id} 
                currentStatus={booking.booking_status} 
                onStatusChange={onStatusChange} 
              />
            </div>
          )}
          
          {onPaymentStatusChange && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Payment Status</h4>
              <PaymentStatusSelect 
                id={booking.id} 
                currentStatus={booking.payment_status} 
                onStatusChange={onPaymentStatusChange} 
              />
            </div>
          )}
        </div>
      </CardContent>
    </>
  );
};

export default BookingInfoCard;
