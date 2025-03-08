
import { useState } from "react";
import { toast } from "sonner";
import { BookingFormValues } from "@/components/BookingForm";

export const useHotelBooking = (hotel: any) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  const handleInitiateBooking = (roomType?: string) => {
    setSelectedRoom(roomType || null);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (data: BookingFormValues) => {
    setIsBookingLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBookingLoading(false);
      setShowBookingForm(false);
      setShowBookingSuccess(true);
      
      toast.success("Booking successful!", {
        description: `Your booking at ${hotel?.name} has been confirmed. Check your email for details.`
      });
    }, 1500);
  };

  return {
    showBookingForm,
    setShowBookingForm,
    isBookingLoading,
    selectedRoom,
    showBookingSuccess,
    setShowBookingSuccess,
    handleInitiateBooking,
    handleBookingSubmit
  };
};
