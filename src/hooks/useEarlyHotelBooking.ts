
import { useState } from 'react';
import { EarlyHotel } from '@/components/admin/hotels/types/earlyHotel';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface BookingFormValues {
  fullName: string;
  email: string;
  phone: string;
}

export const useEarlyHotelBooking = (hotel: EarlyHotel | null) => {
  const { user } = useAuth();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [selectedHours, setSelectedHours] = useState(hotel?.min_hours || 3);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [bookingDetails, setBookingDetails] = useState<any>({});
  
  // Guest information state
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  
  const generateBookingReference = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'EH-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  const calculateTotalPrice = (hotel: EarlyHotel | null, hours: number) => {
    if (!hotel) return 0;
    
    const basePrice = hotel.hourly_rate * hours;
    const tax = Math.round(basePrice * 0.18); // 18% tax
    
    return basePrice + tax;
  };
  
  const handleInitiateBooking = () => {
    if (hotel && selectedHours >= hotel.min_hours && selectedHours <= hotel.max_hours) {
      // Pre-fill user information if logged in
      if (user) {
        setGuestName(user.user_metadata?.full_name || '');
        setGuestEmail(user.email || '');
      }
      
      setShowBookingForm(true);
    } else {
      toast.error('Please select a valid number of hours for your stay');
    }
  };
  
  const handleBookingSubmit = async (data: BookingFormValues) => {
    if (!hotel) {
      toast.error('Hotel information is missing');
      return;
    }
    
    // Validate inputs
    if (!data.fullName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!data.email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    
    setIsBookingLoading(true);
    
    try {
      // Generate booking reference
      const reference = generateBookingReference();
      
      // Calculate check-in and check-out times (for demonstration)
      const now = new Date();
      const checkInDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Tomorrow
      const checkOutDate = new Date(checkInDate.getTime() + selectedHours * 60 * 60 * 1000);
      
      // Calculate total price
      const totalPrice = calculateTotalPrice(hotel, selectedHours);
      
      // Create booking object
      const bookingData = {
        hotel_id: hotel.id,
        hotel_name: hotel.name,
        user_id: user?.id,
        guest_name: data.fullName,
        guest_email: data.email,
        guest_phone: data.phone,
        hours_booked: selectedHours,
        hourly_rate: hotel.hourly_rate,
        total_price: totalPrice,
        booking_reference: reference,
        check_in_time: checkInDate.toISOString(),
        check_out_time: checkOutDate.toISOString(),
        booking_status: 'confirmed',
        payment_status: 'pending',
        created_at: new Date().toISOString()
      };
      
      // In a real application, you would save this to your database
      // For demo purposes, we'll just simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Store booking details for the success screen
      setBookingReference(reference);
      setBookingDetails({
        hotelName: hotel.name,
        checkInDate: checkInDate.toLocaleDateString(),
        checkInTime: checkInDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        checkOutDate: checkOutDate.toLocaleDateString(),
        checkOutTime: checkOutDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hoursBooked: selectedHours,
        hourlyRate: hotel.hourly_rate,
        totalPrice: totalPrice,
        guestName: data.fullName,
        guestEmail: data.email
      });
      
      // Close booking form and show success
      setShowBookingForm(false);
      setShowBookingSuccess(true);
      
      toast.success('Booking confirmed! Check your email for details');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('There was a problem creating your booking. Please try again.');
    } finally {
      setIsBookingLoading(false);
    }
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
