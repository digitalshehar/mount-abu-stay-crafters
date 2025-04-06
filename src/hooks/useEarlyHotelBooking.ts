
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { EarlyHotel } from "@/components/admin/hotels/types/earlyHotel";
import { useAuth } from "@/context/AuthContext";
import { v4 as uuidv4 } from "uuid";

export interface BookingFormValues {
  fullName: string;
  email: string;
  phone?: string;
}

export const useEarlyHotelBooking = (hotel: EarlyHotel | null) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [selectedHours, setSelectedHours] = useState(1);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState<string>("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [bookingDetails, setBookingDetails] = useState<{
    guestName: string;
    guestEmail: string;
    totalPrice: number;
  }>({
    guestName: "",
    guestEmail: "",
    totalPrice: 0
  });
  
  const { user } = useAuth();

  // Calculate the total price based on hourly rate and selected hours
  const calculateTotalPrice = (hotel: EarlyHotel | null, hours: number) => {
    if (!hotel) return 0;
    return hotel.hourly_rate * hours;
  };

  // Handle booking submission
  const handleBookingSubmit = async (data: BookingFormValues) => {
    if (!hotel || !user) {
      toast.error("Unable to complete booking. Please try again.");
      return;
    }
    
    if (!data.fullName.trim() || !data.email.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsBookingLoading(true);
    
    try {
      // Generate a unique booking reference
      const reference = `EH${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
      const totalPrice = calculateTotalPrice(hotel, selectedHours);
      
      // Get current date for check-in
      const checkInDate = new Date();
      
      // Get check-out date (current date + selectedHours hours)
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setHours(checkOutDate.getHours() + selectedHours);
      
      // Create booking data
      const bookingData = {
        id: uuidv4(),
        user_id: user.id,
        hotel_id: hotel.id,
        hotel_name: hotel.name,
        room_type: 'Hourly Stay',
        check_in_date: checkInDate.toISOString(),
        check_out_date: checkOutDate.toISOString(),
        guest_name: data.fullName,
        guest_email: data.email,
        guest_phone: data.phone || '',
        number_of_guests: 1,
        base_price: hotel.hourly_rate,
        total_price: totalPrice,
        tax_amount: totalPrice * 0.1, // 10% tax
        booking_reference: reference,
        booking_status: 'confirmed',
        payment_status: 'pending',
        created_at: new Date().toISOString()
      };
      
      // Insert booking into database
      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);
      
      if (error) {
        throw error;
      }
      
      // Update booking details for success modal
      setBookingReference(reference);
      setBookingDetails({
        guestName: data.fullName,
        guestEmail: data.email,
        totalPrice: totalPrice
      });
      
      // Close booking form and show success message
      setShowBookingForm(false);
      setShowBookingSuccess(true);
      
      toast.success("Booking confirmed!", {
        description: `Your booking for ${hotel.name} has been confirmed.`
      });
      
    } catch (error: any) {
      console.error("Error during booking:", error);
      toast.error("Booking failed", {
        description: error.message || "There was an error processing your booking. Please try again."
      });
    } finally {
      setIsBookingLoading(false);
    }
  };

  const handleInitiateBooking = () => {
    if (hotel && hotel.min_hours) {
      setSelectedHours(hotel.min_hours);
    }
    setShowBookingForm(true);
  };

  return {
    showBookingForm,
    setShowBookingForm,
    isBookingLoading,
    selectedHours,
    setSelectedHours,
    showBookingSuccess,
    setShowBookingSuccess,
    bookingReference,
    bookingDetails,
    guestName,
    setGuestName,
    guestEmail,
    setGuestEmail,
    guestPhone,
    setGuestPhone,
    handleInitiateBooking,
    handleBookingSubmit,
    calculateTotalPrice
  };
};
