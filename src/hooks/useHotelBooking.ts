
import { useState } from "react";
import { toast } from "sonner";
import { BookingFormValues } from "@/components/BookingForm";
import { useBookings } from "@/hooks/useBookings";
import { BookingType } from "@/hooks/useBookings";

export const useHotelBooking = (hotel: any) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState<string>("");
  const [bookingDetails, setBookingDetails] = useState<{
    guestName: string;
    guestEmail: string;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
  }>({
    guestName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    totalPrice: 0
  });
  const { addBooking } = useBookings();

  const handleInitiateBooking = (roomType?: string) => {
    setSelectedRoom(roomType || null);
    setShowBookingForm(true);
  };

  const calculateTotalPrice = (roomType: string | null) => {
    if (!hotel) return 0;
    
    // Find the base price for the selected room type or use hotel's default price
    let basePrice = hotel.price_per_night || 0;
    if (roomType && hotel.rooms) {
      const selectedRoomData = hotel.rooms.find((room: any) => room.type === roomType);
      if (selectedRoomData) {
        basePrice = selectedRoomData.price;
      }
    }
    
    return basePrice;
  };

  const handleBookingSubmit = async (data: BookingFormValues) => {
    if (!hotel) return;
    
    setIsBookingLoading(true);
    
    try {
      // Calculate base price
      const basePrice = calculateTotalPrice(selectedRoom);
      
      // Set default dates (today and tomorrow)
      const checkInDate = new Date();
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + 1);
      
      // Create booking data
      const bookingData = {
        hotel_id: hotel.id,
        hotel_name: hotel.name,
        room_type: selectedRoom || 'Standard Room',
        check_in_date: checkInDate.toISOString(),
        check_out_date: checkOutDate.toISOString(),
        guest_name: data.fullName,
        guest_email: data.email,
        guest_phone: data.phone,
        number_of_guests: 2, // Default to 2 guests
        total_price: basePrice, // Service will add tax and generate reference
        booking_status: 'confirmed',
        payment_status: 'pending',
        booking_type: 'hotel' as BookingType // Explicitly set booking type
      };
      
      // Add the booking
      const result = await addBooking(bookingData);
      
      if (result) {
        // Store booking details for success dialog
        setBookingReference(result.booking_reference || '');
        setBookingDetails({
          guestName: data.fullName,
          guestEmail: data.email,
          checkInDate: checkInDate.toISOString(),
          checkOutDate: checkOutDate.toISOString(),
          totalPrice: result.total_price || basePrice
        });
        
        setShowBookingForm(false);
        setShowBookingSuccess(true);
        
        toast.success("Booking successful!", {
          description: `Your booking at ${hotel.name} has been confirmed. A confirmation email has been sent to ${data.email}.`
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Booking failed", {
        description: "There was an error processing your booking. Please try again."
      });
    } finally {
      setIsBookingLoading(false);
    }
  };

  return {
    showBookingForm,
    setShowBookingForm,
    isBookingLoading,
    selectedRoom,
    showBookingSuccess,
    setShowBookingSuccess,
    bookingReference,
    bookingDetails,
    handleInitiateBooking,
    handleBookingSubmit
  };
};
