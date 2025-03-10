
import React from 'react';
import { format } from 'date-fns';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Booking } from '@/hooks/useBookings';

interface GuestInfoCardProps {
  booking: Booking;
}

const GuestInfoCard: React.FC<GuestInfoCardProps> = ({ booking }) => {
  return (
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
        </div>
      </div>
    </CardContent>
  );
};

export default GuestInfoCard;
