
import React from 'react';
import { Booking } from '@/hooks/useBookings';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';

interface GuestInfoCardProps {
  booking: Booking;
}

const GuestInfoCard: React.FC<GuestInfoCardProps> = ({ booking }) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-lg">Guest Information</CardTitle>
        <CardDescription>Details of the booking guest</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h4>
          <p className="text-sm font-medium">{booking.guest_name}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Email Address</h4>
          <p className="text-sm font-medium break-all">{booking.guest_email}</p>
        </div>
        
        {booking.guest_phone && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h4>
            <p className="text-sm font-medium">{booking.guest_phone}</p>
          </div>
        )}
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Booking Created</h4>
          <p className="text-sm font-medium">
            {format(new Date(booking.created_at), 'MMMM dd, yyyy')}
          </p>
        </div>
      </CardContent>
    </>
  );
};

export default GuestInfoCard;
