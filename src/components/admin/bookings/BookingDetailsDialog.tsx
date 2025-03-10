
import React from "react";
import { format } from "date-fns";
import { Booking } from "@/hooks/useBookings";
import { Calendar, Clock, MapPin, User, Mail, Phone, Users, CreditCard, ClipboardCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface BookingDetailsDialogProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string) => void;
  onUpdatePaymentStatus: (id: string, status: string) => void;
}

const BookingDetailsDialog = ({
  booking,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdatePaymentStatus,
}: BookingDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex justify-between">
            <Badge className="bg-blue-100 text-blue-800">{booking.booking_status}</Badge>
            <Badge className="bg-yellow-100 text-yellow-800">{booking.payment_status}</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">Guest</p>
              <div className="flex gap-2 items-center">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{booking.guest_name}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{booking.guest_email}</span>
              </div>
              {booking.guest_phone && (
                <div className="flex gap-2 items-center">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{booking.guest_phone}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Hotel Info</p>
              <div className="flex gap-2 items-center">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{booking.hotel_name || `Hotel ID: ${booking.hotel_id}`}</span>
              </div>
              <div className="flex gap-2 items-center">
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{booking.room_type}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{booking.number_of_guests} guests</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Dates</p>
            <div className="flex gap-2 items-center">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Check-in: {format(new Date(booking.check_in_date), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Check-out: {format(new Date(booking.check_out_date), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Booked on: {format(new Date(booking.created_at), 'MMM dd, yyyy HH:mm')}
              </span>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Payment</p>
            <div className="flex gap-2 items-center">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="font-bold">₹{Number(booking.total_price).toLocaleString('en-IN')}</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Booking Status</p>
              <Select 
                defaultValue={booking.booking_status}
                onValueChange={(value) => onUpdateStatus(booking.id, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Payment Status</p>
              <Select 
                defaultValue={booking.payment_status}
                onValueChange={(value) => onUpdatePaymentStatus(booking.id, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsDialog;
