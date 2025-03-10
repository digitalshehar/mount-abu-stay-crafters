
import { supabase } from '@/integrations/supabase/client';
import { Booking, BookingType } from '@/hooks/useBookings';
import { v4 as uuidv4 } from 'uuid';

// Generate a booking reference like "BK-XXXX-XXXX"
export const generateBookingReference = () => {
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
    
    // Generate booking reference
    const bookingReference = generateBookingReference();
    
    // Add the tax information to the booking data
    const bookingWithTax = {
      ...bookingData,
      booking_type: bookingData.booking_type || 'hotel' as BookingType,
      total_price: totalWithTax,
      base_price: basePrice,
      tax_amount: tax,
      booking_status: bookingData.booking_status || 'confirmed',
      payment_status: bookingData.payment_status || 'pending',
      booking_reference: bookingReference,
      created_at: new Date().toISOString(),
      check_in_date: bookingData.check_in_date,
      check_out_date: bookingData.check_out_date,
      guest_name: bookingData.guest_name,
      guest_email: bookingData.guest_email
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

    // Send email notification to guest
    sendBookingConfirmationEmail(data);

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

// Send email confirmation to guest
export const sendBookingConfirmationEmail = async (booking: Booking) => {
  try {
    // For now, just log that we would send an email - in production, 
    // this would call Supabase Edge Function or third-party email service
    console.log('Sending booking confirmation email to:', booking.guest_email);
    console.log('Booking details:', {
      reference: booking.booking_reference || booking.id,
      guestName: booking.guest_name,
      checkIn: booking.check_in_date,
      checkOut: booking.check_out_date,
      amount: booking.total_price,
      status: booking.booking_status
    });
    
    return true;
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    return false;
  }
};

