
import { supabase } from '@/integrations/supabase/client';
import { Booking, BookingType } from '@/hooks/useBookings';
import { v4 as uuidv4 } from 'uuid';

// Generate a booking reference like "BK-XXXX-XXXX"
const generateBookingReference = () => {
  const uniqueId = uuidv4().toUpperCase().replace(/-/g, '').substring(0, 8);
  return `BK-${uniqueId.substring(0, 4)}-${uniqueId.substring(4, 8)}`;
};

export const addBooking = async (bookingData: Partial<Booking>, refetchCallback: () => Promise<void>) => {
  try {
    console.log('Adding new booking:', bookingData);
    
    // Calculate tax (10% of total price)
    const basePrice = bookingData.total_price || 0;
    const tax = basePrice * 0.1; // 10% tax
    const totalWithTax = basePrice + tax;
    
    // Ensure number_of_guests is not optional to avoid type errors
    const numGuests = bookingData.number_of_guests || 1;
    
    // Ensure required fields
    const requiredFields = [
      'guest_name', 
      'guest_email', 
      'check_in_date', 
      'check_out_date'
    ];
    
    const missingFields = requiredFields.filter(field => !bookingData[field as keyof Booking]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Generate booking reference
    const bookingReference = generateBookingReference();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    // Create database object - only include fields that exist in the DB schema
    const dbBookingData = {
      hotel_id: bookingData.hotel_id,
      guest_name: bookingData.guest_name!,
      guest_email: bookingData.guest_email!,
      guest_phone: bookingData.guest_phone || null,
      check_in_date: bookingData.check_in_date!,
      check_out_date: bookingData.check_out_date!,
      number_of_guests: numGuests,
      room_type: bookingData.room_type || 'Standard Room',
      total_price: totalWithTax,
      base_price: basePrice,
      tax_amount: tax,
      booking_status: bookingData.booking_status || 'confirmed',
      payment_status: bookingData.payment_status || 'pending',
      booking_reference: bookingReference,
      user_id: user?.id || null // Add authenticated user ID if available
    };
    
    // Store the booking_type in a variable since it's not part of the database schema
    const bookingType = bookingData.booking_type || 'hotel';
    
    const { data, error } = await supabase
      .from('bookings')
      .insert(dbBookingData)
      .select()
      .single();

    if (error) {
      console.error('Error adding booking:', error);
      return { success: false, error: error.message, data: null };
    }

    // Add the booking_type and other frontend-only fields back to the response data
    const responseData = {
      ...data,
      booking_type: bookingType,
      booking_reference: bookingReference
    };

    // Send booking confirmation email
    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          booking: responseData
        })
      });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
    }

    // Refresh bookings after adding a new one
    if (refetchCallback) {
      await refetchCallback();
    }
    
    return { success: true, error: null, data: responseData };
  } catch (error: any) {
    console.error('Error in addBooking:', error);
    return { success: false, error: error.message, data: null };
  }
};

export const updateBookingStatus = async (id: string, status: string) => {
  try {
    const { error } = await supabase
      .from('bookings')
      .update({ booking_status: status })
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating booking status:', error);
    return false;
  }
};

export const updatePaymentStatus = async (id: string, status: string) => {
  try {
    const { error } = await supabase
      .from('bookings')
      .update({ payment_status: status })
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating payment status:', error);
    return false;
  }
};

export const deleteBooking = async (id: string) => {
  try {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
};
