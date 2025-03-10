
import { supabase } from '@/integrations/supabase/client';
import { Booking } from '@/hooks/useBookings';

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
      'number_of_guests',
      'booking_type'
    ];
    
    const missingFields = requiredFields.filter(field => !bookingData[field as keyof Booking]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Generate booking reference
    const bookingReference = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // Add the tax information to the booking data
    const bookingWithTax = {
      ...bookingData,
      total_price: totalWithTax,
      base_price: basePrice,
      tax_amount: tax,
      booking_status: bookingData.booking_status || 'confirmed',
      payment_status: bookingData.payment_status || 'pending',
      created_at: new Date().toISOString(),
      booking_reference: bookingReference
    };
    
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingWithTax as any)
      .select()
      .single();

    if (error) {
      console.error('Error adding booking:', error);
      return { success: false, error: error.message, data: null };
    }

    // Send confirmation email
    try {
      await sendBookingConfirmationEmail({
        ...data,
        booking_reference: bookingReference
      });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the booking if the email fails
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
      .update({ booking_status: status } as any)
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
      .update({ payment_status: status } as any)
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

// New function to send booking confirmation email
export const sendBookingConfirmationEmail = async (booking: Booking) => {
  try {
    const response = await supabase.functions.invoke('send-booking-confirmation', {
      body: { booking }
    });
    
    if (!response.data?.success) {
      throw new Error(response.data?.error || 'Failed to send confirmation email');
    }
    
    return true;
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    return false;
  }
};
