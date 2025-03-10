
import { supabase } from '@/integrations/supabase/client';
import { Booking, BookingType } from '@/hooks/useBookings';

export const addBooking = async (bookingData: Partial<Booking>, refetchCallback?: () => Promise<void>) => {
  try {
    console.log('Adding new booking:', bookingData);
    
    // Calculate tax (10% of total price)
    const basePrice = bookingData.total_price || 0;
    const tax = basePrice * 0.1; // 10% tax
    const totalWithTax = basePrice + tax;
    
    // Generate booking reference
    const bookingReference = generateBookingReference(bookingData.booking_type || 'hotel');
    
    // Ensure required fields
    const requiredFields = [
      'guest_name', 
      'guest_email', 
      'check_in_date', 
      'check_out_date', 
      'number_of_guests'
    ];
    
    const missingFields = requiredFields.filter(field => !bookingData[field as keyof Booking]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Add the tax information to the booking data
    const bookingWithTax = {
      ...bookingData,
      booking_type: bookingData.booking_type || 'hotel', // Set default booking type
      total_price: totalWithTax,
      base_price: basePrice,
      tax_amount: tax,
      booking_status: bookingData.booking_status || 'confirmed',
      payment_status: bookingData.payment_status || 'pending',
      booking_reference: bookingReference,
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingWithTax)
      .select()
      .single();

    if (error) {
      console.error('Error adding booking:', error);
      return { success: false, error: error.message, data: null };
    }

    // Send confirmation email
    try {
      await sendBookingConfirmationEmail(data);
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Continue despite email error - booking was still created
    }

    // Refresh bookings after adding a new one
    if (refetchCallback) {
      refetchCallback();
    }
    
    return { success: true, error: null, data };
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

// Helper function to generate a booking reference
const generateBookingReference = (bookingType: string): string => {
  const prefix = bookingType.substring(0, 2).toUpperCase();
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}${timestamp}${random}`;
};

// Function to send confirmation email using the Supabase Edge Function
const sendBookingConfirmationEmail = async (booking: Booking) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-booking-confirmation', {
      body: { booking }
    });
    
    if (error) {
      throw error;
    }
    
    console.log("Email confirmation sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error);
    throw error;
  }
};
