
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarRange, Users } from 'lucide-react';
import { Hotel } from '@/types';

interface BookingFormProps {
  hotel: Hotel;
}

const BookingForm: React.FC<BookingFormProps> = ({ hotel }) => {
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  
  // Calculate price based on hotel data
  const price = hotel?.price || 0;
  const formattedPrice = new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR' 
  }).format(price);

  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader className="bg-primary/5 pb-4">
        <CardTitle className="text-xl flex justify-between items-center">
          <span>Book Now</span>
          <span className="text-primary">{formattedPrice}<span className="text-sm font-normal">/night</span></span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Check in/out dates */}
          <div className="flex items-center border rounded-md p-3">
            <CalendarRange className="h-5 w-5 mr-3 text-primary" />
            <div>
              <div className="text-sm font-medium">Check In - Check Out</div>
              <div className="text-sm text-muted-foreground">Select your dates</div>
            </div>
          </div>
          
          {/* Guests selector */}
          <div className="flex items-center border rounded-md p-3">
            <Users className="h-5 w-5 mr-3 text-primary" />
            <div className="flex-grow">
              <div className="text-sm font-medium">Guests</div>
              <div className="text-sm text-muted-foreground">{guests} guests, {rooms} room</div>
            </div>
            <div className="flex gap-2 items-center">
              <Button 
                variant="outline" 
                size="sm"
                className="h-7 w-7 p-0" 
                onClick={() => setGuests(Math.max(1, guests - 1))}
              >-</Button>
              <span className="w-5 text-center">{guests}</span>
              <Button 
                variant="outline" 
                size="sm"
                className="h-7 w-7 p-0" 
                onClick={() => setGuests(guests + 1)}
              >+</Button>
            </div>
          </div>
          
          {/* Price summary */}
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm">{formattedPrice} x 1 night</span>
              <span className="text-sm">{formattedPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Taxes & fees (18%)</span>
              <span className="text-sm">{new Intl.NumberFormat('en-IN', { 
                style: 'currency', 
                currency: 'INR' 
              }).format(price * 0.18)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t mt-2">
              <span>Total</span>
              <span>{new Intl.NumberFormat('en-IN', { 
                style: 'currency', 
                currency: 'INR' 
              }).format(price * 1.18)}</span>
            </div>
          </div>
          
          <Button className="w-full mt-4">Book Now</Button>
          
          <p className="text-xs text-center text-muted-foreground mt-2">
            No payment required today. You'll pay when you stay.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
