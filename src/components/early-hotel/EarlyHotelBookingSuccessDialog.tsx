
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipboardCopy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface EarlyHotelBookingSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bookingReference: string;
  bookingDetails: {
    guestName: string;
    guestEmail: string;
    totalPrice: number;
  };
}

const EarlyHotelBookingSuccessDialog: React.FC<EarlyHotelBookingSuccessDialogProps> = ({
  isOpen,
  onClose,
  bookingReference,
  bookingDetails
}) => {
  const handleCopyReference = () => {
    navigator.clipboard.writeText(bookingReference);
    toast.success("Booking reference copied to clipboard");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-green-600">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Booking Confirmed!
          </DialogTitle>
          <DialogDescription>
            Your hourly stay has been successfully booked
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium text-green-800">Booking Reference</div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleCopyReference}
                className="h-8 w-8"
              >
                <ClipboardCopy className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xl font-mono tracking-wide">{bookingReference}</div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Guest Name</div>
              <div className="font-medium">{bookingDetails.guestName}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{bookingDetails.guestEmail}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Total Amount</div>
              <div className="font-medium">₹{bookingDetails.totalPrice}</div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              Please show your booking reference at the hotel reception desk. Payment will be collected at the hotel.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EarlyHotelBookingSuccessDialog;
