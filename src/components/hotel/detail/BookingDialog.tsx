
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookingForm, { BookingFormValues } from "@/components/BookingForm";

interface BookingDialogProps {
  hotel: {
    name: string;
    id?: number;
  };
  selectedRoom: string | null;
  isLoading: boolean;
  onSubmit: (data: BookingFormValues) => void;
  onClose: () => void;
}

export const BookingDialog = ({ 
  hotel, 
  selectedRoom, 
  isLoading, 
  onSubmit, 
  onClose 
}: BookingDialogProps) => {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Complete Your Hotel Booking</DialogTitle>
        <DialogDescription>
          {selectedRoom 
            ? `Please provide your details to book the ${selectedRoom} room at ${hotel.name}.`
            : `Please provide your details to confirm your stay at ${hotel.name}.`}
        </DialogDescription>
      </DialogHeader>
      
      <BookingForm 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        bookingType="hotel" 
      />
    </DialogContent>
  );
};

export const BookingSuccessDialog = ({ 
  hotel, 
  selectedRoom, 
  onClose, 
  onBookTransport,
  bookingReference = "UNKNOWN",
  checkInDate,
  checkOutDate,
  guestName,
  guestEmail,
  totalPrice,
}: { 
  hotel: any; 
  selectedRoom: string | null; 
  onClose: () => void; 
  onBookTransport: () => void;
  bookingReference?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guestName?: string;
  guestEmail?: string;
  totalPrice?: number;
}) => {
  // Format dates if they exist
  const formattedCheckIn = checkInDate 
    ? new Date(checkInDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Not specified';
    
  const formattedCheckOut = checkOutDate
    ? new Date(checkOutDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Not specified';
    
  // Format price if it exists
  const formattedPrice = totalPrice
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(totalPrice)
    : 'Not specified';

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle className="text-green-600 flex items-center">
          <Check className="mr-2 h-6 w-6" />
          Booking Confirmed!
        </DialogTitle>
        <DialogDescription>
          Your booking at {hotel.name} has been successfully confirmed.
        </DialogDescription>
      </DialogHeader>
      
      <div className="bg-green-50 p-4 rounded-md border border-green-100 mb-4">
        <h4 className="font-medium text-green-800 mb-2">Booking Details</h4>
        <div className="space-y-2 text-sm text-green-700">
          <p><span className="font-medium">Hotel:</span> {hotel.name}</p>
          {selectedRoom && <p><span className="font-medium">Room Type:</span> {selectedRoom}</p>}
          <p><span className="font-medium">Confirmation #:</span> {bookingReference}</p>
          <p><span className="font-medium">Guest:</span> {guestName || 'Not specified'}</p>
          <p><span className="font-medium">Check-in:</span> {formattedCheckIn}</p>
          <p><span className="font-medium">Check-out:</span> {formattedCheckOut}</p>
          <p><span className="font-medium">Total:</span> {formattedPrice}</p>
          <p><span className="font-medium">Status:</span> Confirmed</p>
          <p><span className="font-medium">Payment:</span> Pending</p>
        </div>
      </div>
      
      <p className="text-sm text-stone-600 mb-4">
        A confirmation email has been sent to {guestEmail || 'your email address'} with all the details of your booking.
        Your invoice includes all applicable taxes and fees.
      </p>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button onClick={onBookTransport}>
          Book Transportation
        </Button>
      </div>
    </DialogContent>
  );
};
