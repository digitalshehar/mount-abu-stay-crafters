
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { EarlyHotel } from "@/components/admin/hotels/types/earlyHotel";
import { BookingFormValues } from '@/hooks/useEarlyHotelBooking';

interface EarlyHotelBookingDialogProps {
  hotel: EarlyHotel | null;
  isOpen: boolean;
  onClose: () => void;
  selectedHours: number;
  totalPrice: number;
  isLoading: boolean;
  guestName: string;
  setGuestName: (name: string) => void;
  guestEmail: string;
  setGuestEmail: (email: string) => void;
  guestPhone: string;
  setGuestPhone: (phone: string) => void;
  onSubmit: (data: BookingFormValues) => void;
}

const EarlyHotelBookingDialog: React.FC<EarlyHotelBookingDialogProps> = ({
  hotel,
  isOpen,
  onClose,
  selectedHours,
  totalPrice,
  isLoading,
  guestName,
  setGuestName,
  guestEmail,
  setGuestEmail,
  guestPhone,
  setGuestPhone,
  onSubmit
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      fullName: guestName,
      email: guestEmail,
      phone: guestPhone
    });
  };

  if (!hotel) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book Your Stay at {hotel.name}</DialogTitle>
          <DialogDescription>
            Complete your booking details for {selectedHours} hours stay
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={guestName} 
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={guestEmail} 
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (optional)</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={guestPhone} 
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between font-medium mb-2">
              <span>Stay Duration:</span>
              <span>{selectedHours} hours</span>
            </div>
            
            <div className="flex justify-between font-medium mb-2">
              <span>Price:</span>
              <span>₹{hotel.hourly_rate * selectedHours}</span>
            </div>
            
            <div className="flex justify-between font-medium mb-2">
              <span>Taxes & Fees:</span>
              <span>₹{Math.round(hotel.hourly_rate * selectedHours * 0.18)}</span>
            </div>
            
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Booking'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EarlyHotelBookingDialog;
